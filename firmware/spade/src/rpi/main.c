#include "pico/stdlib.h"
#include "hardware/pwm.h"
#include "hardware/spi.h"
#include "hardware/timer.h"
#include "hardware/watchdog.h"
#include "hardware/adc.h"
#include "pico/util/queue.h"
#include "pico/multicore.h"
#include "jerryscript.h"

#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include "shared/version.h"

// Set to false to enable debug prints for development (this is janky)
#if true
  #define dbg puts
  #define dbgf printf
#else
  #define dbg(...) ;
  #define dbgf(...) ;
#endif

// Debugging shortcut
#define yell puts

#ifdef SPADE_AUDIO
  #include "audio.c"
#endif

// More firmware stuiff
#include "ST7735_TFT.h"
#include "upload.h"

// Other imports
#include "shared/sprig_engine/base_engine.c"
#include "shared/sprig_engine/module_native.c"
#include "shared/js_runtime/jerry_mem.h"
#include "shared/js_runtime/jerryxx.c"
#include "shared/js_runtime/js.h"

// screen is 20 characters wide
#define SCREEN_WIDTH_CHARS 20
#define SCREEN_HEIGHT_LINES 10

// Externs for shared/ui/errorbuf.h
char errorbuf[512] = "";
Color errorbuf_color; // Initialized in main()
static void fatal_error() {
  // On fatal error, start an infinite loop rendering the errorbuf.
  errorbuf_color = color16(255, 0, 0); // Make sure it's red
  while (1) {
    text_clear();
    render_errorbuf();
    st7735_fill_start();
    render(st7735_fill_send);
    st7735_fill_finish();
  }
}
#include "shared/ui/errorbuf.h"

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))

/**
 * We store a 64-boolean ringbuffer of polled button states for a primitive
 * sort of debouncing. The button counts as pressed if more than 5/6th of
 * the ringbuffer is true.
 * 
 * (gpio_set_input_hysteresis_enabled was too slow.)
 */
#define HISTORY_LEN (64)
typedef struct {
  uint8_t history[HISTORY_LEN/8];
  uint8_t last_state;
  uint8_t ring_i;
} ButtonState;
// W, S, A, D, I, K, J, L
uint button_pins[] = {  5,  7,  6,  8, 12, 14, 13, 15 };
static ButtonState button_states[ARR_LEN(button_pins)] = {0};

typedef enum {
    Button_W,
    Button_S,
    Button_A,
    Button_D,
    Button_I,
    Button_K,
    Button_J,
    Button_L,
    Button_None
} Button;

static bool button_history_read(ButtonState *bs, int i) {
  // We want to store bools compactly so we have to do some bit twiddling.
  int q = 1 << (i % 8);
  return !!(bs->history[i/8] & q);
}
static void button_history_write(ButtonState *bs, int i, bool value) {
  if (value)
    bs->history[i/8] |=   1 << (i % 8) ;
  else
    bs->history[i/8] &= ~(1 << (i % 8));
}

static void button_init(void) {
  for (int i = 0; i < ARR_LEN(button_pins); i++) {
    ButtonState *bs = button_states + i;
    gpio_set_dir(button_pins[i], GPIO_IN);
    gpio_pull_up(button_pins[i]);
  }
}

/**
 * Poll the buttons and push any keypresses to the main core.
 * 
 * (Should be run in a loop on a non-primary core.)
 */
static void button_poll(void) {
  for (int i = 0; i < ARR_LEN(button_pins); i++) {
    ButtonState *bs = button_states + i;

    bs->ring_i = (bs->ring_i + 1) % HISTORY_LEN; // Incrememnt ringbuffer index
    button_history_write(bs, bs->ring_i, gpio_get(button_pins[i]));

    // up is true if more than 5/6 are true
    int up = 0;
    for (int i = 0; i < HISTORY_LEN; i++) {
      up += button_history_read(bs, i);
    }
    up = up > ((HISTORY_LEN*5)/6); // Here we convert to a bool

    if (up != bs->last_state) {
      bs->last_state = up;
      if (!up) {
        // Send the keypress to the main core
        multicore_fifo_push_blocking(button_pins[i]); 
      }
    }
  }
}

// Turn on the power lights and dim them with PWM.
static void power_lights() {
  // left white light
  const int pin_num_0 = 28;
  gpio_set_function(pin_num_0, GPIO_FUNC_PWM);
  uint slice_num_0 = pwm_gpio_to_slice_num(pin_num_0);
  pwm_set_enabled(slice_num_0, true);
  pwm_set_gpio_level(pin_num_0, 65535/8);

  // right blue light
  // const pin_num_1 = 4;
  // gpio_set_function(pin_num_1, GPIO_FUNC_PWM);
  // uint slice_num_1 = pwm_gpio_to_slice_num(pin_num_1);
  // pwm_set_enabled(slice_num_1, true);
  // pwm_set_gpio_level(pin_num_1, 65535/4);
}

// Entry point for the second core that polls the buttons.
static void core1_entry(void) {
  button_init();

  while (1) {
    button_poll();
  }
}

/**
 * Seed the random number generator with entropy from
 * random electricity as well as temperature readings.
 */
static void rng_init(void) {
  adc_init();
  uint32_t seed = 0;

  // Read some random electricity
  for (int i = 0; i < 4; i++) {
    adc_select_input(4);
    sleep_ms(1);
    seed ^= adc_read();
  }

  // Read some temperature data
  adc_set_temp_sensor_enabled(true);
  adc_select_input(4);
  sleep_ms(1);
  seed ^= adc_read();
  adc_set_temp_sensor_enabled(false);

  srand(seed);
}

char serial_commands[][128] = {
        "UPLOAD",
        "VERSION",
        {1, 2, 3, 4, '\0'} // null terminator so strlen() returns 4
};

// returns which command is being sent from serial, or -1 for none
static int read_command() {
	// each index keeps track of how many characters we've matched to each command
    int serial_command_indexes[] = {0, 0, 0};

    int timeout = 0;

    for (;;) {
        int c = getchar_timeout_us(timeout);
        if (c == PICO_ERROR_TIMEOUT) return -1;

        timeout = 100;

        int moved = 0;

        for (int i = 0; i < ARR_LEN(serial_commands); i++) {
            if (strlen(serial_commands[i]) > serial_command_indexes[i]
                && serial_commands[i][serial_command_indexes[i]] == c) {
                serial_command_indexes[i]++;
                moved = 1;
            }
            if (strlen(serial_commands[i]) == serial_command_indexes[i]) {
                return i;
            }
        }
        if (!moved) return -1;
    }
}

// Wait for a game to be uploaded.
static int load_new_scripts(void) {
    int current_command = read_command();

    switch (current_command) {
        case 0: // upload
            return upl_stdin_read();
        case 1: // version
            printf("SPADE:%sEND", SPADE_VERSION);
            return 0;
        case 2: // legacy (1,2,3,4)
            puts("legacy detected");
            return 0;
        default:
            return 0;
    }

}

/**
 * Implementations for PianoOpts (see src/shared/audio/piano.h)
 * 
 * p (the song object) is type erased because that's an implementation detail
 * for us. It's actually a jerry_value_t, not a void pointer, so we gotta cast.
 */
#ifdef SPADE_AUDIO
  void piano_jerry_song_free(void *p) {
    jerry_value_t jvt = (jerry_value_t)p;
    jerry_release_value(jvt);
  }

  int piano_jerry_song_chars(void *p, char *buf, int buf_len) {
    jerry_value_t jvt = (jerry_value_t)p;
    int read = jerry_string_to_char_buffer(jvt, (jerry_char_t *)buf, (jerry_size_t) buf_len);
    return read;
  }
#endif

typedef enum {
  NEW_SLOT,
  GAME_MENU,
  DELETE_CONFIRM,
  RUN_GAME
  } Welcome_Screen;

  int count_digits(uint32_t number) {
      if (number < 10) return 1;
      if (number < 100) return 2;
      if (number < 1000) return 3;
      if (number < 10000) return 4;
      if (number < 100000) return 5;
      if (number < 1000000) return 6;
      if (number < 10000000) return 7;
      if (number < 100000000) return 8;
      if (number < 1000000000) return 9;
      return 10;
  }

  static Button get_button_press() {
      if (!multicore_fifo_rvalid()) return Button_None;

      switch (multicore_fifo_pop_blocking()) {
          case 5:
              return Button_W;
          case 7:
              return Button_S;
          case 6:
              return Button_A;
          case 8:
              return Button_D;
          case 12:
              return Button_I;
          case 14:
              return Button_K;
          case 13:
              return Button_J;
          case 15:
              return Button_L;
      }
  }

typedef struct {
    Welcome_Screen screen;
    int games_len;
    int games_i;
    Game* games;
} Welcome_State;

  const char delete_confirm_screen[] = "                    \n"
                                      "                    \n"
                                      "                    \n"
                                      "                    \n"
                                      "                    \n"
                                      " Do you really      \n"
                                      " want to delete     \n"
                                      " this game?         \n"
                                      "                    \n"
                                      "                    \n"
                                      " W: confirm         \n"
                                      " S: exit            \n"
                                      "                    \n"
                                      "                    \n"
                                      " sprig.hackclub.com \n";

  const char upload_game_screen[] = "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    " Please upload      \n"
                                    " a game.            \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    "                    \n"
                                    " sprig.hackclub.com \n";

void render_game_menu_screen(char *buffer, Welcome_State welcome_state) {
    // padding to be written after game num & size
    char game_padding[] = "                    ";
    char size_padding[] = "                    ";

    game_padding[
            SCREEN_WIDTH_CHARS
            - count_digits(welcome_state.games_i + 1)
            - count_digits(welcome_state.games_len)
            - 8 // 7 chars used for " Game: " + account for slash
    ] = '\0';

    size_padding[
            SCREEN_WIDTH_CHARS
            - count_digits(GAME_SLOTS(welcome_state.games[welcome_state.games_i].size_b))
            - count_digits(MAX_SLOTS)
            - 8 // 7 chars used for " Size: " + account for slash
    ] = '\0';

    // 6lines, for game name
    char game_split_lines[] = {
            "                    \n"
            "                    \n"
            "                    \n"
            "                    \n"
            "                    \n"
            "                    \n"
    };

    // buffer of 3 chars at beginning, subtract from total width
    int chars_per_line = SCREEN_WIDTH_CHARS - 3;
    unsigned int lines_used = strlen(welcome_state.games[welcome_state.games_i].name) / chars_per_line + 1;
    for (int i = 0; i < lines_used; i++) {
        // write to game_split_lines, segmented per line,
        // +1 for the newline, +1 to get next open char
        char *write_dest = &game_split_lines[i * (SCREEN_WIDTH_CHARS + 1) + 1];

        // read from the game name, segmented by chars_per_line
        char *game_line = &welcome_state.games[welcome_state.games_i].name[i * chars_per_line];

        // write length is chars_per_line except if the last segment of game name is less than that
        unsigned int write_length = chars_per_line;
        if (strlen(welcome_state.games[welcome_state.games_i].name) - i * write_length < write_length) {
            write_length = strlen(welcome_state.games[welcome_state.games_i].name) - i * chars_per_line;
        }

        memcpy(write_dest, game_line, write_length);
    }


    sprintf(buffer,
            "                    \n"
            "                    \n"
            "%s"
            "                    \n"
            " Game: %d/%d%s\n"
            " Size: %lu/%d%s\n"
            "                    \n"
            " W: PLAY            \n"
            " S: DELETE          \n"
            " <-  A , D  ->      \n",
            game_split_lines,
            welcome_state.games_i + 1, welcome_state.games_len, game_padding,
            GAME_SLOTS(welcome_state.games[welcome_state.games_i].size_b), MAX_SLOTS, size_padding);
}

void update_welcome_state(Welcome_State* welcome_state) {
    welcome_state->games_len = get_games(&welcome_state->games);

    if (welcome_state->games_i >= welcome_state->games_len && welcome_state->games_i != 0) {
        welcome_state->games_i = welcome_state->games_len - 1;
    }

    if (welcome_state->screen == DELETE_CONFIRM) {
        // no-op
    } else if (welcome_state->games_len == 0) {
        welcome_state->screen = NEW_SLOT;
    } else {
        welcome_state->screen = GAME_MENU;
        set_game(welcome_state->games[welcome_state->games_i]);
    }

    Button button_pressed = get_button_press();

    if (welcome_state->screen == GAME_MENU)
        switch (button_pressed) {
            case Button_A:
                if (welcome_state->games_i > 0) welcome_state->games_i--;
                break;
            case Button_D:
                if (welcome_state->games_i < welcome_state->games_len - 1) welcome_state->games_i++;
                break;
            case Button_S:
                welcome_state->screen = DELETE_CONFIRM;
                break;
            case Button_W:
                welcome_state->screen = RUN_GAME;
                break;
            default:
                break;
        }
    else if (welcome_state->screen == DELETE_CONFIRM)
        switch (button_pressed) {
            case Button_S:
                welcome_state->screen = GAME_MENU;
                break;
            case Button_W:
                delete_game(welcome_state->games[welcome_state->games_i]);
                welcome_state->screen = GAME_MENU;
                update_welcome_state(welcome_state);
                break;
            default:
                break;
        }
}

int main() {
    timer_hw->dbgpause = 0;

  // Overclock the RP2040!
  set_sys_clock_khz(270000, true);

  errorbuf_color = color16(0, 255, 255); // cyan

  power_lights();   // Turn on the power lights
  stdio_init_all(); // Init serial port
  st7735_init();    // Init display
  rng_init();       // Init RNG

  // Init JerryScript
  jerry_init(JERRY_INIT_MEM_STATS);
  init(sprite_free_jerry_object); // TODO: document

    // Start a core to listen for keypresses.
    multicore_reset_core1();

    update_save_version(); // init here to avoid irqs on other core

    multicore_launch_core1(core1_entry);

    /**
       * We get a bunch of fake keypresses at startup, so we need to
       * drain them from the FIFO queue.
       *
       * What really needs to be done here is to have button_init
       * record when it starts so that we can ignore keypresses after
       * that timestamp.
       */
    sleep_ms(50);
    while (multicore_fifo_rvalid()) multicore_fifo_pop_blocking();

    Welcome_State welcome_state = {
            .screen = NEW_SLOT,
            .games = malloc(METADATA_MAX_ENTRIES * sizeof(Game)), // leaks but it's fine since lifetime=program
            .games_len = 0,
            .games_i = 0
    };

    for (;;) {
        update_welcome_state(&welcome_state);

        if (welcome_state.screen == RUN_GAME)
            break;
        else if (welcome_state.screen == NEW_SLOT)
            strcpy(errorbuf, upload_game_screen);
        else if (welcome_state.screen == GAME_MENU)
            render_game_menu_screen(errorbuf, welcome_state);
        else if (welcome_state.screen == DELETE_CONFIRM)
            strcpy(errorbuf, delete_confirm_screen);

        render_errorbuf();
        st7735_fill_start();
        render(st7735_fill_send);
        st7735_fill_finish();

        load_new_scripts();
    }

  // Wow, we can actually run a game now!

  // Clear the errorbuf and make it red
  memset(errorbuf, 0, sizeof(errorbuf));
  errorbuf_color = color16(255, 0, 0);
  text_clear();

  // Drain any remaining keypresses
  while (multicore_fifo_rvalid()) multicore_fifo_pop_blocking();

  // Run the code!
  js_run(save_read(), !welcome_state.games[welcome_state.games_i].is_legacy);

  #ifdef SPADE_AUDIO
    // Initialize audio
    piano_init((PianoOpts) {
      .song_free = piano_jerry_song_free,
      .song_chars = piano_jerry_song_chars,
    });
    audio_init();
  #endif

  // Current time for timer handling (see frame_cb in shared/sprig_engine/engine.js)
  absolute_time_t last = get_absolute_time();
  dbg("okay launching game loop");

  // Event loop!
  while (1) {
    // Handle any new button presses
    while (multicore_fifo_rvalid()) {
      spade_call_press(multicore_fifo_pop_blocking());
    }

    // Run async code
    js_promises();

    // setTimeout/setInterval impl
    absolute_time_t now = get_absolute_time();
    int elapsed = us_to_ms(absolute_time_diff_us(last, now));
    last = now;
    spade_call_frame(elapsed);

    #ifdef SPADE_AUDIO
      // Get any audio to the speaker
      audio_try_push_samples();
    #endif

    // Break if they're trying to upload a new game
    if (load_new_scripts()) break;

    // Render
    render_errorbuf();
    st7735_fill_start();
    render(st7735_fill_send);
    st7735_fill_finish();
  }

  /**
   * User uploaded a new game mid-game. We're gonna try to reboot here,
   * but just in case it doesn't work, we'll print a message nicely
   * asking them to reboot. They'll never know there was a bug!
   * 
   * (Unless they read this code. Which is encouraged. shhhhhhhhhhh~)
   */

  errorbuf_color = color16(50, 205, 50); // lime green
  strcpy(errorbuf, "                    \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   "    PLEASE REBOOT   \n"
                   "     YOUR SPRIG     \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   "                    \n"
                   " sprig.hackclub.com \n");
  render_errorbuf();
  st7735_fill_start();
  render(st7735_fill_send);
  st7735_fill_finish();

  /**
   * Watchdog is a mechanism designed to catch infinite loops. It will
   * automatically reboot the device if another function, watchdog_update()
   * is not called rapidly enough.
   * 
   * Enabling watchdog with a timeout of 0 will cause the Pico to reboot
   * right away.
   */
  watchdog_enable(0, false);
  while (1) {}
}
