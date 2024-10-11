#include <pico/printf.h>
#include "pico/audio_i2s.h"
#include "../include/HAL.h"
#include "ST7735_TFT.h"
#include "hardware/adc.h"
#include "hardware/pwm.h"

void __attribute__((noreturn)) hw_unsupported(const char *hw) {
    panic("Unsupported hardware: %s", hw);
}

static Sprig_Features features;
static Sprig_Data data;

void init_features() {
    if (data.hw_rev == 1) {
        features = (Sprig_Features) {
                .has_button_wsad = 1,
                .has_buttons_ijkl = 1,

                .has_led_l = 1,
                .has_led_r = 1,

                .has_screen = 1,
                .has_speaker = 1
        };
    } else {
	// hw_rev = 0, so data is probably empry
        hw_unsupported("floating pin is not floating");
        features = (Sprig_Features) {};
    }
}

void init_eeprom_data() { // TODO: check if floating pin is floating
    data = (Sprig_Data) {
            .hw_rev = 1
    };
}

Sprig_Features get_features() {
    return features;
}

/*struct sprig_eeprom {
    char magic[3];         // SPR
    unsigned char version; // version of this structure in case it needs to change
    unsigned short hw_rev; // 2 byte hw rev – MSB should be 1 for unofficial revs?
    // that makes sure they're not intertwined
    char pcb_color;        // might be fun – represented as a spade color character?
    uint64_t flash_time[10]; // seconds since epoch that board was flashed
    char description[32];  // human-readable free-text about the board?
    // "green sprig from run G236407"?
    // "prototype of new LCD"? could be cool to have
    // ...either additional useful fields or easter eggs
};*/

Sprig_Data get_sprig_data() {
    return data;
}

// W, S, A, D, I, K, J, L
uint button_pins[] = {5, 7, 6, 8, 12, 14, 13, 15};

void init_button(Sprig_Button button) {
    gpio_set_dir(button_pins[button], GPIO_IN);
    gpio_pull_up(button_pins[button]);
}

int get_button(Sprig_Button button) {
    if (!features.has_button_wsad &&
        (button == Button_W || button == Button_A || button == Button_S || button == Button_D))
        hw_unsupported("wsad buttons");

    if (!features.has_buttons_ijkl &&
        (button == Button_I || button == Button_J || button == Button_K || button == Button_L))
        hw_unsupported("ikjl buttons");

    if (button == Button_None) return 0;

    return gpio_get(button_pins[button]);
}

int pin_num_led_l() {
    return 28;
}

void init_led_l() {
    const int pin_num = pin_num_led_l();
    gpio_set_function(pin_num, GPIO_FUNC_PWM);
    uint slice_num_0 = pwm_gpio_to_slice_num(pin_num);
    pwm_set_enabled(slice_num_0, true);
    set_led_l(65535 / 8);
}

void set_led_l(uint16_t level) {
    if (!features.has_led_l) hw_unsupported("left led");

    int pin_num = pin_num_led_l();
    pwm_set_gpio_level(pin_num, level);
}

int pin_num_led_r() {
    return 4;
}

void init_led_r() {
    int pin_num = pin_num_led_r();
    gpio_set_function(pin_num, GPIO_FUNC_PWM);
    uint slice_num_0 = pwm_gpio_to_slice_num(pin_num);
    pwm_set_enabled(slice_num_0, true);
    set_led_l(65535 / 8);
}

void set_led_r(uint16_t level) {
    if (!features.has_led_r) hw_unsupported("right led");

    int pin_num = pin_num_led_l();
    pwm_set_gpio_level(pin_num, level);
}

void write_pixel(Color color) {
    if (!features.has_screen) hw_unsupported("screen");

    st7735_fill_send(color);
}

void fill_start() {
    if (!features.has_screen) hw_unsupported("screen");

    st7735_fill_start();
}

void fill_end() {
    if (!features.has_screen) hw_unsupported("screen");

    st7735_fill_finish();
}

void init_screen() {
    st7735_init();
}

struct audio_buffer_pool *audio_buffer_pool_init() {
    static audio_format_t audio_format = {
            .format = AUDIO_BUFFER_FORMAT_PCM_S16,
            .sample_freq = 24000,
            .channel_count = 1,
    };

    static struct audio_buffer_format producer_format = {
            .format = &audio_format,
            .sample_stride = 2
    };

// number of samples for each buffer that is read (24000 per second)
#ifndef SAMPLES_PER_BUFFER
#define SAMPLES_PER_BUFFER (256*8)
#endif

// number of seperate buffers to be rotated through
#ifndef BUFFER_COUNT
#define BUFFER_COUNT 3
#endif

    struct audio_buffer_pool *producer_pool = audio_new_producer_pool(&producer_format, BUFFER_COUNT,
                                                                      SAMPLES_PER_BUFFER);
    bool __unused ok;
    const struct audio_format *output_format;

    // i2s stuff
    struct audio_i2s_config config = {
            .data_pin = PICO_AUDIO_I2S_DATA_PIN,
            .clock_pin_base = PICO_AUDIO_I2S_CLOCK_PIN_BASE,
            .dma_channel = 0,
            .pio_sm = 0,
    };

    output_format = audio_i2s_setup(&audio_format, &config);
    if (!output_format) {
        panic("PicoAudio: Unable to open audio device.\n");
    }

    // connect i2s interface to audio buffers
    ok = audio_i2s_connect(producer_pool);
    assert(ok);
    audio_i2s_set_enabled(true);
	
    return producer_pool;
}

// pool of audio buffers that are read by the i2s speaker
static struct audio_buffer_pool *audio_bufpool;

void audio_init() {
    audio_bufpool = audio_buffer_pool_init();
}

audio_buffer_t *get_audio_buffer(bool block) {
    if (!features.has_speaker) hw_unsupported("speaker");

    return take_audio_buffer(audio_bufpool, block);
}

void push_audio_buffer(audio_buffer_t *buffer) {
    if (!features.has_speaker) hw_unsupported("speaker");

    give_audio_buffer(audio_bufpool, buffer);
}

/**
* Seed the random number generator with entropy from
* random electricity as well as temperature readings.
*/
void rng_init() {
    adc_init();
    uint32_t seed = 0;

    // Read some random electricity
    for (int i = 0; i < 4; i++) {
        adc_select_input(4);
        sleep_ms(1);
        seed ^= adc_read();
    }

    // Read some temperature data
    adc_set_temp_sensor_enabled(true);
    adc_select_input(4);
    sleep_ms(1);
    seed ^= adc_read();
    adc_set_temp_sensor_enabled(false);

    srand(seed);
}

void hw_init() {
    init_eeprom_data();
    init_features();

    rng_init();

    if (features.has_button_wsad) {
        init_button(Button_W);
        init_button(Button_A);
        init_button(Button_S);
        init_button(Button_D);
    }

    if (features.has_buttons_ijkl) {
        init_button(Button_I);
        init_button(Button_J);
        init_button(Button_K);
        init_button(Button_L);
    }

    if (features.has_screen)
        init_screen();

    if (features.has_led_l)
        init_led_l();

    if (features.has_led_r)
        init_led_r();

    if (features.has_speaker)
        audio_init();
}
