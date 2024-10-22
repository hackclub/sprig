#include "pico/stdlib.h"
#include "hardware/timer.h"
#include <stdio.h>
#include "HAL.h"

#include "buttons.h"
#include "text_rendering.h"
#include "audio.h"

char text_lines[TEXT_CHARS_MAX_Y][TEXT_CHARS_MAX_X];

int main() {
    timer_hw->dbgpause = 0;

    // Overclock the RP2040!
    set_sys_clock_khz(270000, true);

    stdio_init_all(); // Init serial port

    hw_init(); // init HAL

    init_button_handler(); // init button handling on second core

    init_sine_wave_table(); // init sine wave used in audio

    // write to the text buffer
    format_text(text_lines,
                "\nwahoo!\n\n"
                "I -> make brighter\n"
                "K -> make dimmer\n\n"
                "D -> toggle sound\n"
                "W -> higher pitch\n"
                "S -> lower pitch");

    double dimmer = 1.0; // variable that we use to control dimming

    bool sound_on = 0;

    uint32_t sine_wave_step = 0x200000;

    for (;;) {
        // get latest button press; if it's I, make screen brighter, & if it's K, make it dimmer
        Sprig_Button current = get_button_press();
        if (current == Button_I && dimmer < 1.0f) dimmer += 0.1f;
        if (current == Button_K && dimmer > 0) dimmer -= 0.1f;
        // toggle sound
        if (current == Button_D) sound_on = !sound_on;

        // increase & lower pitch
        if (current == Button_S && sine_wave_step) sine_wave_step -= 0x80000;
        if (current == Button_W && sine_wave_step < 0x400000) sine_wave_step += 0x80000;

        if (sound_on) play_sine_wave(sine_wave_step, 255);

        // print the button pressed to the serial console
        printf("Button %d", current);

        // start sending pixels in order one-by-one
        fill_start();
        for (int x = 0; x < SCREEN_SIZE_X; x++) {
            for (int y = 0; y < SCREEN_SIZE_Y; y++) {

               // gradient generated based on pixel position
               // red is dependent on x, green is dependent on y
                Color rainbowPixel = color16(
                        (uint8_t) ((double)x/(double)SCREEN_SIZE_X*256 * dimmer),
                        (uint8_t) ((double)y*2 * dimmer),
                        0);

                // if there is text at the pixel, write the text color,
                // otherwise write rainbowPixel (text goes over rainbow)
                write_pixel(
                        text_is_filled(text_lines, x, y) ? color16(0, 255, 255) : rainbowPixel);
            }
        }
        // end the screen write sequence & refresh screen
        fill_end();
    }
}