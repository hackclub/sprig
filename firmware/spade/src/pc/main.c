#include <MiniFB.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdint.h>
#include "shared/sprig_engine/script.h"

#ifdef SPADE_AUDIO
  #include "audio.c"
#endif

/**
 * SPADE_AUTOMATED isn't really used anymore, but we're keeping around the
 * ifdefs just in case it comes in handy in the future.
 * 
 * It disables keyboard input and adds some debugging prints for the sake
 * of automated testing.
 */
// #define SPADE_AUTOMATED
#ifdef SPADE_AUTOMATED
  #define puts(...) ;
  #define printf(...) ;
#endif

// Set to false to enable debug prints for development (this is janky)
#if true
  #define dbg(...) ;
  #define dbgf(...) ;
#else
  #define dbgf printf
  #define dbg puts
#endif

// Debugging shortcut
#define yell puts

// Other imports
#include "shared/sprig_engine/base_engine.c"
#include "shared/sprig_engine/module_native.c"
#include "shared/js_runtime/jerryxx.c"
#include "shared/js_runtime/jerry_mem.h"
#include "jerryscript.h"

// Externs for shared/ui/errorbuf.h
char errorbuf[512] = "";
Color errorbuf_color; // Initialized in main()
static void fatal_error(void) { abort(); }
#include "shared/ui/errorbuf.h"

#define SPADE_WIN_SIZE_X (SCREEN_SIZE_X)
#define SPADE_WIN_SIZE_Y (SCREEN_SIZE_Y + 3*8)
#define SPADE_WIN_SCALE (2)

#ifdef SPADE_AUTOMATED
// Print the map as ascii for debugging
static void print_map(void) {
  // find max on Z axis
  int z_size = 0;
  {
    for (int x = 0; x < state->width; x++)
      for (int y = 0; y < state->height; y++) {
        Sprite *s = get_sprite(state->map[(y * state->width) + x]);
        int sprite_stack_len = 0;
        while (s) {
          sprite_stack_len++;
          s = get_sprite(s->next);
        }

        if (sprite_stack_len > z_size)
          z_size = sprite_stack_len;
      }
  }

  const int stride = z_size*(state->width+1);

  // +1 is for newlines
  int mapstr_len = stride * state->height;
  char *mapstr = malloc(1 + mapstr_len);
  mapstr[mapstr_len] = 0;
  memset(mapstr, '.', mapstr_len);

  // insert newlines
  int w = state->width, h = state->height;
  for (int y = 0; y < h; y++) {
    mapstr[(y+1)*stride - 1] = '\n';
    for (int z = 1; z < z_size; z++)
      mapstr[y*stride + z*(state->width+1) - 1] = '|';
  }

  for (int z = 0; z < z_size; z++) {
    for (int x = 0; x < state->width; x++)
      for (int y = 0; y < state->height; y++) {
        int str_i = stride*y + (z*(state->width+1)) + x;
        int map_i = (state->width+0)*y + x;
        Sprite *s = get_sprite(state->map[map_i]);

        int sprite_z = 0;
        while (s) sprite_z++, s = get_sprite(s->next);

        s = get_sprite(state->map[map_i]);
        while(s) {
          sprite_z--;
          if (sprite_z == z) {
            mapstr[str_i] = s->kind;
            break;
          }
          s = get_sprite(s->next);
        }
      }
  }

#undef puts
  puts(mapstr);
#define puts(...) ;
  free(mapstr);
  fflush(stdout);
}

// Read keyboard inputs from stdin
static void simulated_keyboard(void) {
  char key = getchar();
       if (key == 'w') spade_call_press( 5); // map_move(map_get_first('p'),  0, -1);
  else if (key == 's') spade_call_press( 7); // map_move(map_get_first('p'),  0,  1);
  else if (key == 'a') spade_call_press( 6); // map_move(map_get_first('p'),  1,  0);
  else if (key == 'd') spade_call_press( 8); // map_move(map_get_first('p'), -1,  0);
  else if (key == 'i') spade_call_press(12); // map_move(map_get_first('p'),  0, -1);
  else if (key == 'k') spade_call_press(14); // map_move(map_get_first('p'),  0,  1);
  else if (key == 'j') spade_call_press(13); // map_move(map_get_first('p'),  1,  0);
  else if (key == 'l') spade_call_press(15); // map_move(map_get_first('p'), -1,  0);
  else return;

  print_map();
}
#else
// Window keyboard input handler
static void keyboard(struct mfb_window *window, mfb_key key, mfb_key_mod mod, bool isPressed) {
  (void) window;
  if (!isPressed) return;

  if (key == KB_KEY_ESCAPE
#ifdef __APPLE__
      || (key == KB_KEY_Q && (mod & KB_MOD_SUPER) != 0)
#endif
     ) {
    mfb_close(window);
  }

  if (key == KB_KEY_W) spade_call_press( 5); // map_move(map_get_first('p'),  0, -1);
  if (key == KB_KEY_S) spade_call_press( 7); // map_move(map_get_first('p'),  0,  1);
  if (key == KB_KEY_A) spade_call_press( 6); // map_move(map_get_first('p'),  1,  0);
  if (key == KB_KEY_D) spade_call_press( 8); // map_move(map_get_first('p'), -1,  0);
  if (key == KB_KEY_I) spade_call_press(12); // map_move(map_get_first('p'),  0, -1);
  if (key == KB_KEY_K) spade_call_press(14); // map_move(map_get_first('p'),  0,  1);
  if (key == KB_KEY_J) spade_call_press(13); // map_move(map_get_first('p'),  1,  0);
  if (key == KB_KEY_L) spade_call_press(15); // map_move(map_get_first('p'), -1,  0);
}
#endif

// Render a character to screen (used only for stats display)
static void render_char(Color *screen, char c, Color color, int sx, int sy) {
  for (int y = 0; y < 8; y++) {
    uint8_t bits = font_pixels[c*8 + y];
    for (int x = 0; x < 8; x++)
      if ((bits >> (7-x)) & 1) {
        screen[(sy+y)*160 + sx+x] = color;
      }
  }
}

// Render debug stats (memory usage, bitmap count, etc.)
void render_stats(Color *screen) {
  static int peak_bitmap_count = 0;
  static int peak_sprite_count = 0;

  /**
   * 20 * 8 is the max number of characters we can fit on the screen
   * 
   * +1 on mem size because sprintf might write an extra null term, doesn't matter for others
   * bc their buffers should never be filled (given max lengths below)
   * 
   * format with assumed max lengths:
   *
   * --------------------
   * mem: 1000kB (1000kB)
   * bitmaps: 100 (100)
   * sprites: 100 (100)
   * maps: 100 (100)
   */

  char mem[20 * 8 + 1] = "";
  char bitmaps[20 * 8] = "";
  char sprites[20 * 8] = "";

  Color mem_color = color16(255, 255, 255);
  jerry_heap_stats_t stats = {0};
  if (jerry_get_memory_stats(&stats)) {
    sprintf(mem, "mem: %lukB (%lukB)", stats.allocated_bytes / 1000, stats.peak_allocated_bytes / 1000);
    if (stats.peak_allocated_bytes > 200000) mem_color = color16(255, 255, 0); // yellow
    if (stats.allocated_bytes > 200000) mem_color = color16(255, 0, 0); // red
  }

  int bitmap_count = state->render->doodle_index_count;
  if (bitmap_count > peak_bitmap_count) peak_bitmap_count = bitmap_count;
  sprintf(bitmaps, "bitmaps: %d (%d)", bitmap_count, peak_bitmap_count);

  int sprite_count = 0;
  for (int i = 0; i < state->sprite_pool_size; i++)
    sprite_count += state->sprite_slot_active[i];
  if (sprite_count > peak_sprite_count) peak_sprite_count = sprite_count;
  sprintf(sprites, "sprites: %d (%d)", sprite_count, peak_sprite_count);

  // Draw!
  for (int i = 0; i < 20 * 8; i++) {
    if (mem[i] != '\0') render_char(screen, mem[i], mem_color, i*8, SCREEN_SIZE_Y);
    if (bitmaps[i] != '\0') render_char(screen, bitmaps[i], color16(255, 255, 255), i*8, SCREEN_SIZE_Y + 8);
    if (sprites[i] != '\0') render_char(screen, sprites[i], color16(255, 255, 255), i*8, SCREEN_SIZE_Y + 16);
  }
}

// Run the provided JS code. Copies from file, which can be safely freed after.
static void js_init(char *file, int file_size) {
  // Concatenate the engine script and the user script
  char *combined = calloc(sizeof(engine_script) - 1 + file_size, 1);
  strcpy(combined, engine_script);
  strcpy(combined + sizeof(engine_script) - 1, file);

  js_run(combined, 0);
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
    int read = jerry_string_to_char_buffer(jvt, (jerry_char_t *)buf, (jerry_size_t)buf_len);
    return read;
  }
#endif

// The screen! This will be non-null before we render.
Color *write_pixel_screen = NULL;

// Screen offset. We're simulating the RPI screen, which is written
// in top to bottom, left to right order without coordinates.
int write_pixel_offset = 0;

// Write a pixel! Must be called in top to bottom, left to right order.
static void write_pixel(Color c) {
  // Transform write_pixel_offset into x and y coordinates.
  int x = write_pixel_offset / SCREEN_SIZE_Y;
  int y = write_pixel_offset % SCREEN_SIZE_Y;
  
  write_pixel_screen[y * SCREEN_SIZE_X + x] = c;
  write_pixel_offset++;
}

// Read a file to a buffer. Also populates size argument with the file size.
char *read_in_script(char *path, int *size) {
  FILE *script = fopen(path, "r");
  if (script == NULL) perror("couldn't open file arg"), abort();

  fseek(script, 0, SEEK_END);
  int file_size = ftell(script);
  rewind(script);

  char *chars = calloc(file_size, 1);
  if (fread(chars, file_size, 1, script) != 1)
    perror("couldn't read chars"), abort();
  if (size) *size = file_size;
  return chars;
}

int main(int argc, char *argv[])  {
  // Make errors red
  errorbuf_color = color16(255, 0, 0);
  
  // Make a window
  struct mfb_window *window = mfb_open_ex("spade", SPADE_WIN_SIZE_X * SPADE_WIN_SCALE, SPADE_WIN_SIZE_Y * SPADE_WIN_SCALE, 0);
  if (!window) {
    yell("failed to open window");
    return 1;
  }

  // Seed the C random number generator with the current time
  union { double d; unsigned u; } now = { .d = jerry_port_get_current_time() };
  srand(now.u);
  
  // Initialize the JS engine
  jerry_init(JERRY_INIT_MEM_STATS);
  init(sprite_free_jerry_object);

  // First argument to this program is path to JS code to run
  {
    int script_len = 0;
    char *script = read_in_script(argv[1], &script_len);
    js_init(script, script_len); // <- run the code!
    free(script);
  }
  
  #ifdef SPADE_AUTOMATED
    print_map();
  #else
    // Not run if automated (we take input from stdin in the event loop instead of the window)
    mfb_set_keyboard_callback(window, keyboard);
  #endif

  Color screen[SPADE_WIN_SIZE_X * SPADE_WIN_SIZE_Y] = {0};
  write_pixel_screen = screen;

  #ifdef SPADE_AUDIO
    // Initialize audio
    piano_init((PianoOpts) {
      .song_free = piano_jerry_song_free,
      .song_chars = piano_jerry_song_chars,
    });
    audio_init();
  #endif

  // Current time for timer handling (see frame_cb in shared/sprig_engine/engine.js)
  struct mfb_timer *lastframe = mfb_timer_create();
  mfb_timer_now(lastframe);

  // Event loop!
  do {
    // Run async code
    js_promises();

    // setInterval/setTimeout impl
    spade_call_frame(1000.0f * mfb_timer_delta(lastframe));
    mfb_timer_now(lastframe);

    // Audio
    #ifdef SPADE_AUDIO
      audio_try_push_samples();
    #endif

    // Render
    memset(screen, 0, sizeof(screen)); // Clear screen
    write_pixel_offset = 0;            // Reset screen offset
    render_errorbuf();    // Render errorbuf to game text
    render(write_pixel);  // Render game
    render_stats(screen); // Render debug stats

    // If automated, read keypresses from stdin
    #ifdef SPADE_AUTOMATED
      simulated_keyboard();
    #endif

    // Update the window with new screen buffer
    uint8_t ok = mfb_update_ex(window, screen, SPADE_WIN_SIZE_X, SPADE_WIN_SIZE_Y) == STATE_OK;
    if (!ok) {
      window = 0x0;
      break;
    }
  } while(mfb_wait_sync(window));

  return 0;
}
