#ifndef SPRIG_HAL_HAL_H
#define SPRIG_HAL_HAL_H

#include <pico/audio.h>
#include "pico/stdlib.h"

typedef struct {
    unsigned int has_screen : 1;
    unsigned int has_speaker : 1;

    unsigned int has_button_wsad : 1;
    unsigned int has_buttons_ijkl : 1;

    unsigned int has_led_l : 1;
    unsigned int has_led_r: 1;
} Sprig_Features;

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
} Sprig_Button;

typedef struct {
    uint16_t hw_rev; // 2 byte hw rev – MSB should be 1 for unofficial revs?
    uint64_t flash_time[10]; // seconds since epoch that board was flashed
    char pcb_color;        // might be fun – represented as a spade color character?
    char serial[11];       // serial number (ex: BN1-034)
    char description[32];  // human-readable free-text about the board?
} Sprig_Data;

void hw_init();

Sprig_Features get_features();

Sprig_Data get_sprig_data();

int get_button(Sprig_Button button);

/**
 * Set power level for left white LED
 * @param level led level from [0, 65535]
 */
void set_led_l(uint16_t level);

/**
 * Set power level for left white LED
 * @param level led level from [0, 65535]
 */
void set_led_r(uint16_t level);

typedef uint16_t Color;

/**
 * Write a pixel to the screen- [something abt this being sequential]
 * @param color 16bit 5-6-5 RGB color
 */
void write_pixel(Color color);

void fill_start();
void fill_end();

struct audio_buffer *get_audio_buffer(bool block);

void push_audio_buffer(audio_buffer_t *buffer);

#endif //SPRIG_HAL_HAL_H