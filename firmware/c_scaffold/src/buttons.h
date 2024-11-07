#ifndef C_SCAFFOLD_BUTTONS_H
#define C_SCAFFOLD_BUTTONS_H

/**
 * We store a 64-boolean ringbuffer of polled button states for a primitive
 * sort of debouncing. The button counts as pressed if more than 5/6th of
 * the ringbuffer is true.
 *
 * (gpio_set_input_hysteresis_enabled was too slow.)
 */
#include "HAL.h"
#include "pico/util/queue.h"
#include "pico/multicore.h"

#define HISTORY_LEN (64)

typedef struct {
    uint8_t history[HISTORY_LEN / 8];
    uint8_t last_state;
    uint8_t ring_i;
} ButtonState;

ButtonState button_states[8] = {0};

bool button_history_read(ButtonState *bs, int i) {
    // We want to store bools compactly so we have to do some bit twiddling.
    int q = 1 << (i % 8);
    return !!(bs->history[i / 8] & q);
}

void button_history_write(ButtonState *bs, int i, bool value) {
    if (value)
        bs->history[i / 8] |= 1 << (i % 8);
    else
        bs->history[i / 8] &= ~(1 << (i % 8));
}

/**
 * Poll the buttons and push any keypresses to the main core.
 *
 * (Should be run in a loop on a non-primary core.)
 */
void button_poll(void) {
    for (;;) {
        for (int i = 0; i < 8; i++) {
            ButtonState *bs = button_states + i;

            bs->ring_i = (bs->ring_i + 1) % HISTORY_LEN; // Incrememnt ringbuffer index
            button_history_write(bs, bs->ring_i, get_button( (Sprig_Button) i));

            // up is true if more than 5/6 are true
            int up = 0;
            for (int i = 0; i < HISTORY_LEN; i++) {
                up += button_history_read(bs, i);
            }
            up = up > ((HISTORY_LEN * 5) / 6); // Here we convert to a bool

            if (up != bs->last_state) {
                bs->last_state = up;
                if (!up) {
                    // Send the keypress to the main core
                    multicore_fifo_push_blocking(i);
                }
            }
        }
    }
}

Sprig_Button get_button_press() {
    if (!multicore_fifo_rvalid()) return Button_None;
    return (Sprig_Button) multicore_fifo_pop_blocking();
}

void init_button_handler() {
    // Start a core to listen for keypresses.
    multicore_reset_core1();
    multicore_launch_core1(button_poll);

    /* We get a bunch of fake keypresses at startup, so we need to
     * drain them from the FIFO queue. */
    sleep_ms(50);
    while (multicore_fifo_rvalid()) multicore_fifo_pop_blocking();
}

#endif //C_SCAFFOLD_BUTTONS_H
