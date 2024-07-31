#include "pico/stdlib.h"
#include "hardware/pwm.h"
#include "hardware/spi.h"
#include "hardware/timer.h"
#include "hardware/watchdog.h"
#include "hardware/adc.h"
#include "pico/util/queue.h"
#include "pico/multicore.h"

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

#include "display.c"


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
uint button_pins[] = {  5,  7,  6,  8, 12, 14, 13, 15 };
static ButtonState button_states[ARR_LEN(button_pins)] = {0};

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


/**
 * Implementations for PianoOpts (see src/shared/audio/piano.h)
 * 
 * p (the song object) is type erased because that's an implementation detail
 * for us. It's actually a jerry_value_t, not a void pointer, so we gotta cast.
 */

int main() {
    timer_hw->dbgpause = 0;

  // Overclock the RP2040!
  //set_sys_clock_khz(270000, true);

  power_lights();   // Turn on the power lights
  stdio_init_all(); // Init serial port
  rng_init();       // Init RNG

  // Initialize the display (call this once at the start)
  st7735_init();

  // Set up for drawing (set column and row addresses)
  st7735_fill_start();

  display_clear();

  strncpy(text_overlay, "NEBULANEBULANEBULANEBULANEBULANEBULANEBULANEBULANEBULANEBULANEBULANEBULA", 72);

  render_text_overlay();
  render();

  // Finish drawing
  st7735_fill_finish();

  // Start a core to listen for keypresses.
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

  // Event loop!
  while (1) {
    // Handle any new button presses
    while (multicore_fifo_rvalid()) {
      printf("%d\n", multicore_fifo_pop_blocking());
    }

  }
}