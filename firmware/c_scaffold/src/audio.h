#ifndef C_SCAFFOLD_AUDIO_H
#define C_SCAFFOLD_AUDIO_H

#include <math.h>
#include "HAL.h"

#define SINE_WAVE_TABLE_LEN 2048

int16_t sine_wave_table[SINE_WAVE_TABLE_LEN];

// precalculate a sine wave and store it in sine_wave_table
void init_sine_wave_table() {
    for (int i = 0; i < SINE_WAVE_TABLE_LEN; i++) {
        sine_wave_table[i] = 32767 * cosf(i * 2 * (float) (M_PI / SINE_WAVE_TABLE_LEN));
    }
}

void play_sine_wave(uint32_t step, uint32_t volume) {
	// get a free audio buffer from the pool
    struct audio_buffer *buffer = get_audio_buffer(false);
    if (buffer == NULL) return; // if there aren't free buffers, return early

    uint32_t pos_max = 0x10000 * SINE_WAVE_TABLE_LEN;
    uint32_t pos = 0;

    int16_t *samples = (int16_t *) buffer->buffer->bytes; // reference to buffer bytes
    for (uint i = 0; i < buffer->max_sample_count; i++) {
		// sample the sine wave at position pos, and write to buffer
        samples[i] = (volume * sine_wave_table[pos >> 16u]) >> 8u;
		
		// increment pos; if step is larger, it'll move faster thru the sine wave, and pitch is higher
        pos += step;
        if (pos >= pos_max) pos -= pos_max; // wrap back around if past end of wave
    }
    buffer->sample_count = buffer->max_sample_count;
    push_audio_buffer(buffer); // push filled buffer into the pool
}

#endif //C_SCAFFOLD_AUDIO_H
