/**
 * Driver for the Raspberry Pi audio system. All actual sound generation code is in shared/audio/piano.c.
 */

#include "shared/audio/audio.h"
#include "shared/audio/piano.h"

#include "hardware/clocks.h"
#include "hardware/structs/clocks.h"
#include "pico/audio_i2s.h"	
#include "pico/binary_info.h"
#include "shared/audio/piano.c"
#include "shared/audio/parse_tune.c"
#include "shared/audio/tone_map.c"

bi_decl(bi_3pins_with_names(PICO_AUDIO_I2S_DATA_PIN, "I2S DIN", PICO_AUDIO_I2S_CLOCK_PIN_BASE, "I2S BCK", PICO_AUDIO_I2S_CLOCK_PIN_BASE + 1, "I2S LRCK"));

static struct audio_buffer_pool *audio_buffer_pool_init()
{

	static audio_format_t audio_format = {
		.format = AUDIO_BUFFER_FORMAT_PCM_S16,
		.sample_freq = SAMPLES_PER_SECOND,
		.channel_count = 1,
	};

	static struct audio_buffer_format producer_format = {
		.format = &audio_format,
		.sample_stride = 2};

	struct audio_buffer_pool *producer_pool = audio_new_producer_pool(&producer_format, 3,
																	  SAMPLES_PER_BUFFER); // todo correct size
	bool __unused ok;
	const struct audio_format *output_format;

	struct audio_i2s_config config = {
		.data_pin = PICO_AUDIO_I2S_DATA_PIN,
		.clock_pin_base = PICO_AUDIO_I2S_CLOCK_PIN_BASE,
		.dma_channel = 0,
		.pio_sm = 0,
	};

	output_format = audio_i2s_setup(&audio_format, &config);
	if (!output_format)
	{
		panic("PicoAudio: Unable to open audio device.\n");
	}

	ok = audio_i2s_connect(producer_pool);
	assert(ok);
	audio_i2s_set_enabled(true);

	return producer_pool;
}

struct audio_buffer_pool *audio_bufpool;

void audio_init(void)
{
	audio_bufpool = audio_buffer_pool_init();
}

void audio_try_push_samples(void)
{
	struct audio_buffer *buffer = take_audio_buffer(audio_bufpool, false);
	if (buffer == NULL)
		return;

	piano_fill_sample_buf((int16_t *)buffer->buffer->bytes, buffer->max_sample_count);
	buffer->sample_count = buffer->max_sample_count;

	// send to PIO DMA
	give_audio_buffer(audio_bufpool, buffer);
}
