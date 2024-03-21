#ifndef BUTTONS_H
#define BUTTONS_H

#include "constants.h"
/**
 * We store a ringbuffer of polled button states for a primitive
 * sort of debouncing. The button counts as pressed if more than 5/6th of
 * the ringbuffer is true.
 *
 * (gpio_set_input_hysteresis_enabled was too slow.)
 */
typedef struct
{
	uint8_t history[BUTTON_RINGBUFFER_HISTORY_LEN / 8];
	uint8_t last_state;
	uint8_t ring_i;
} ButtonState;

extern bool button_history_read(ButtonState *bs, int i);
extern void button_init(void);
extern void button_poll(void);
extern void button_handler(void);

#endif //BUTTONS_H