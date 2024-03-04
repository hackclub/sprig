#pragma once

#include <stdint.h>
#include "jerryscript.h"

#if SPADE_EMBEDDED
  static uint16_t color16(uint8_t r, uint8_t b, uint8_t g) {
    r = (uint8_t)((float)((float)r / 255.0f) * 31.0f);
    g = (uint8_t)((float)((float)g / 255.0f) * 31.0f);
    b = (uint8_t)((float)((float)b / 255.0f) * 63.0f);

    // return ((r & 0xf8) << 8) + ((g & 0xfc) << 3) + (b >> 3);
    return ((r & 0b11111000) << 8) | ((g & 0b11111100) << 3) | (b >> 3);
  }

  typedef uint16_t Color;
#else
  #define color16 MFB_RGB
  typedef uint32_t Color;
#endif

#define ARR_COUNT(arr) (sizeof(arr) / sizeof(arr[0]))

#define TEXT_CHARS_MAX_X (20)
#define TEXT_CHARS_MAX_Y (16)

#define SPRITE_SIZE (16)
#define DOODLE_PANE_SIZE (SPRITE_SIZE*SPRITE_SIZE / 8)

/**
 * In-memory representation of a bitmap.
 * 
 * A doodle has 5 "panes" that are packed arrays of bits.
 */
typedef struct {
  uint8_t opacity [DOODLE_PANE_SIZE]; // Opacity map. 0 = transparent, 1 = opaque
  uint8_t palette0[DOODLE_PANE_SIZE]; // Bit 0 (LSB) of palette index.
  uint8_t palette1[DOODLE_PANE_SIZE]; // Bit 1 of palette index.
  uint8_t palette2[DOODLE_PANE_SIZE]; // Bit 2 of palette index.
  uint8_t palette3[DOODLE_PANE_SIZE]; // Bit 3 (MSB) of palette index.
} Doodle;

typedef struct Sprite Sprite;
struct Sprite {
  char kind;
  int8_t  dx, dy;
  uint16_t x,  y;
  uint16_t next; // index of next sprite in list + 1 (0 null)
  jerry_value_t object;
};
static void sprite_free(Sprite *s);
static Sprite *sprite_alloc(void);
static bool sprite_is_active(Sprite *s, uint32_t generation);

typedef struct { Sprite *sprite; int x, y; uint8_t dirty; } MapIter;

#define PER_CHAR (255)

#define SCREEN_SIZE_X (160)
#define SCREEN_SIZE_Y (128)

typedef struct {
  Color palette[16];
  int scale;

  // some SoA v. AoS shit goin on here man
  int doodle_index_count;
  uint8_t legend_doodled[PER_CHAR]; // PER_CHAR = because it's used for assigning indices
  Doodle *legend;         // Tied to state->legend_size
  Doodle *legend_resized; // Tied to state->legend_size
} State_Render;

typedef struct {
  int width, height;

  void (*sprite_free_cb)(Sprite *);

  char  text_char [TEXT_CHARS_MAX_Y][TEXT_CHARS_MAX_X];
  Color text_color[TEXT_CHARS_MAX_Y][TEXT_CHARS_MAX_X];

  uint8_t char_to_index[PER_CHAR];

  uint8_t   solid[PER_CHAR];
  uint16_t  legend_size;
  uint8_t  *push_table; // Pushable sprites, size is state->legend_size

  size_t    sprite_pool_size;
  Sprite   *sprite_pool;
  uint8_t  *sprite_slot_active;
  uint32_t *sprite_slot_generation;

  uint16_t *map; // Index into sprite_pool + 1 (0 is null)

  int tile_size; // How small tiles have to be to fit map on screen
  char background_sprite;

  State_Render *render;

  /* This is honestly probably heap abuse and most uses of it should
   * probably use stack memory instead. It's used to pass strings
   * across the C <-> JS barrier. */
  char temp_str_mem[(1 << 12)];
} State;