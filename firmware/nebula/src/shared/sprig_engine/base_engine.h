#pragma once

#include <stdint.h>

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
#define SCREEN_SIZE_X (160)
#define SCREEN_SIZE_Y (128)