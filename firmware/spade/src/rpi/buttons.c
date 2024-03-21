#include "hardware/gpio.h"
#include "pico/multicore.h"
#include "buttons.h"

uint button_pins[] = {5, 7, 6, 8, 12, 14, 13, 15};
static ButtonState button_states[ARR_LEN(button_pins)] = {0};

bool button_history_read(ButtonState *bs, int i)
{
	// We want to store bools compactly so we have to do some bit twiddling.
	int q = 1 << (i % 8);
	return !!(bs->history[i / 8] & q);
}

void button_history_write(ButtonState *bs, int i, bool value)
{
	if (value)
		bs->history[i / 8] |= 1 << (i % 8);
	else
		bs->history[i / 8] &= ~(1 << (i % 8));
}

void button_init(void)
{
	for (int i = 0; i < ARR_LEN(button_pins); i++)
	{
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
void button_poll(void)
{
	for (int i = 0; i < ARR_LEN(button_pins); i++)
	{
		ButtonState *bs = button_states + i;

		bs->ring_i = (bs->ring_i + 1) % BUTTON_RINGBUFFER_HISTORY_LEN; // Incrememnt ringbuffer index
		button_history_write(bs, bs->ring_i, gpio_get(button_pins[i]));

		// up is true if more than 5/6 are true
		int up = 0;
		for (int i = 0; i < BUTTON_RINGBUFFER_HISTORY_LEN; i++)
		{
			up += button_history_read(bs, i);
		}
		up = up > ((BUTTON_RINGBUFFER_HISTORY_LEN * 5) / 6); // Here we convert to a bool

		if (up != bs->last_state)
		{
			bs->last_state = up;
			if (!up)
			{
				// Send the keypress to the main core
				multicore_fifo_push_blocking(button_pins[i]);
			}
		}
	}
}

// Entry point for the second core that polls the buttons.
void button_handler(void)
{
	button_init();

	while (1)
	{
		button_poll();
	}
}
