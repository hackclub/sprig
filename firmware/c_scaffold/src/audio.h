//
// Created by Cheru Berhanu on 10/7/24.
//

#ifndef C_SCAFFOLD_AUDIO_H
#define C_SCAFFOLD_AUDIO_H

#include <math.h>
#include "HAL.h"

#define SINE_WAVE_TABLE_LEN 2048

int16_t sine_wave_table[SINE_WAVE_TABLE_LEN];

void init_sine_wave_table() {
    for (int i = 0; i < SINE_WAVE_TABLE_LEN; i++) {
        sine_wave_table[i] = 32767 * cosf(i * 2 * (float) (M_PI / SINE_WAVE_TABLE_LEN));
    }
}

void play_sine_wave(uint32_t step, uint32_t volume) {
    struct audio_buffer *buffer = get_audio_buffer(false);
    if (buffer == NULL) return;

    uint32_t pos_max = 0x10000 * SINE_WAVE_TABLE_LEN;
    uint32_t pos = 0;

    int16_t *samples = (int16_t *) buffer->buffer->bytes;
    for (uint i = 0; i < buffer->max_sample_count; i++) {
        samples[i] = (volume * sine_wave_table[pos >> 16u]) >> 8u;
        pos += step;
        if (pos >= pos_max) pos -= pos_max;
    }
    buffer->sample_count = buffer->max_sample_count;
    push_audio_buffer(buffer);
}

#endif //C_SCAFFOLD_AUDIO_H
