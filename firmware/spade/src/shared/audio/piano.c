// piano ties together our sample table, our note reader, and pico's audio buffer pool

#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <math.h>

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))

typedef enum {
  Sound_Sine,
  Sound_Triangle,
  Sound_Sawtooth,
  Sound_Square,
  Sound_COUNT,
} Sound;

#include "piano.h"
#include "parse_tune/parse_tune.h"

#define TABLE_LEN 2048

typedef struct {
  uint32_t step;
  Sound sound;
  uint32_t pos;
} Note;
static Note i2snote_sound(int freq, Sound sound) {
  return (Note) {
    .sound = sound,
    .step = (int) (((float) freq * TABLE_LEN) / SAMPLES_PER_SECOND * 0x10000),
  };
}

typedef struct {
  uint8_t active;
  double times;

  NoteReadState nrs;
  void *char_source;

  int samples_into_note;
  Note notes[5];
  int notes_len;
  int sample_duration;
} Song;

#define SONG_COUNT 4
const float sound_weights[Sound_COUNT] = {
  [Sound_Sine]     = 1.00f,
  [Sound_Triangle] = 0.7f,
  [Sound_Square]   = 0.2f,
  [Sound_Sawtooth] = 0.2f
};
static struct {
  int16_t sample_table[Sound_COUNT][TABLE_LEN];

  Song song[SONG_COUNT];

  PianoOpts opts;
} piano_state = {0};

/**
 * char_source is a type erased jerry_value_t (well, doesn't matter what as long as
 * opts.song_chars and opts.song_free work on it)
 */
int piano_queue_song(void *char_source, double times) {
  for (int ci = 0; ci < SONG_COUNT; ci++) {
    Song *song = piano_state.song + ci;
    if (!song->active) {
      song->active = 1;
      song->times = times;
      song->char_source = char_source;
      return 1;
    }
  }
  return 0;
}

static void piano_chan_free(Song *song) {
  if (song->char_source) piano_state.opts.song_free(song->char_source);
  memset(song, 0, sizeof(Song));
  song->active = 0; // just to make sure >:)
}

int piano_unqueue_song(void *p) {
  for (int ci = 0; ci < SONG_COUNT; ci++) {
    Song *song = piano_state.song + ci;

    if (song->char_source == p) {
      piano_chan_free(song);
      return 1;
    }
  }

  return 0;
}

int piano_is_song_queued(void *p) {
  for (int ci = 0; ci < SONG_COUNT; ci++) {
    Song *song = piano_state.song + ci;

    if (song->char_source == p) return 1;
  }

  return 0;
}

void piano_init(PianoOpts opts) {
  piano_state.opts = opts;

  // fill sample table
  for (int i = 0; i < TABLE_LEN; i++) {
    float t = (float)i / (float)(TABLE_LEN + 1);
    float soundf[Sound_COUNT] = {
      [Sound_Sine]     = sinf(i * 2 * (float) (M_PI / TABLE_LEN)),
      [Sound_Triangle] = (1.0f - 2.0f * 2.0f * fabsf(0.5f - t)),
      [Sound_Sawtooth] = (1.0f - 2.0f * fmodf(t, 1.0f)),
      [Sound_Square]   = (fmodf(t, 1.0f) > 0.5f) ? 1.0f : -1.0f
    };

    for (int s = 0; s < Sound_COUNT; s++)
      piano_state.sample_table[s][i] = (int)(soundf[s] * sound_weights[s] * 32767);
  }
}

static int32_t piano_compute_sample(Song *song) {
  if (!song->active) return 0;

  song->samples_into_note++;
  if (song->samples_into_note >= song->sample_duration) {
    song->samples_into_note = 0;

    // clear out all old notes, we got new data
    memset(&song->notes, 0, sizeof(song->notes));
    song->notes_len = 0;

    // pull the song into this buf so we can read next chord
    char char_source[2048] = {0};
    if (!piano_state.opts.song_chars(song->char_source, char_source, 2048)) {
      puts("song exceeds 2k chars, not playing");
      return 0;
    }

    while (1) {
      if (!tune_parse(&song->nrs, char_source)) {
        // Song ended!

        song->nrs = (NoteReadState) {0};
        song->times -= 1.0;
        if (song->times <= 0.0)
          piano_chan_free(song);

        return 0;
      }

      NrsRet *nrs_ret = &song->nrs.ret;
      if (nrs_ret->kind != NrsRetKind_None) {
        song->sample_duration = (SAMPLES_PER_SECOND / 1000) * nrs_ret->duration;

        // TODO: handle chords (multiple notes per pause)
        if (nrs_ret->kind == NrsRetKind_Sound) {
          if (song->notes_len < ARR_LEN(song->notes)) {
            song->notes[song->notes_len++] = i2snote_sound(
              nrs_ret->sound.freq,
              nrs_ret->sound.sound
            );
          } else {
            puts("wow too many notes");
          }
        }
        if (nrs_ret->kind == NrsRetKind_Pause) {
          // chords (and pauses) always end with pauses (unless something goes *horribly* wrong)
          break;
        }
      }
    }
  }

  int32_t ret = 0;
  for (int i = 0; i < song->notes_len; i++) {
    Note *note = song->notes + i;
    ret += piano_state.sample_table[note->sound][note->pos >> 16u];

    note->pos += note->step;

    // wrap 'round
    const int32_t pos_max = 0x10000 * TABLE_LEN;
    if (note->pos >= pos_max) note->pos -= pos_max;
  }
  return ret;
}

int32_t remap(int32_t x, int32_t in_min, int32_t in_max, int32_t out_min, int32_t out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

int32_t clamp(int32_t x, int32_t min, int32_t max) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

void piano_fill_sample_buf(int16_t *samples, int size) {
  // fill buffer
  for (int i = 0; i < size; i++) {
    int32_t sum = 0;
    int8_t sample_count = 0;
    for (int ci = 0; ci < SONG_COUNT; ci++) {
      Song *song = piano_state.song + ci;
      if (!song->active) continue;
      sum += piano_compute_sample(song);
      sample_count += song->notes_len;
    }

    if (sample_count != 0) {
      samples[i] = sum/sample_count/2;
    } else {
      samples[i] = 0;
    }
  }
}
