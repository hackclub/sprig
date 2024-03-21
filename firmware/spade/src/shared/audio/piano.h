#ifndef PIANO_H
#define PIANO_H

#include <stdint.h>

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))

typedef enum {
  Sound_Sine,
  Sound_Triangle,
  Sound_Sawtooth,
  Sound_Square,
  Sound_COUNT,
} Sound;

float strtof(const char *restrict nptr, char **restrict endptr);

// gaps in your audio? increase this
#define SAMPLES_PER_BUFFER (256*8)
#define SAMPLES_PER_SECOND 24000

typedef struct {
  void (*song_free)(void *);
  int (*song_chars)(void *p, char *buf, int buf_len);
} PianoOpts;

extern void piano_init(PianoOpts);
extern void piano_fill_sample_buf(int16_t *samples, int size);
extern int piano_queue_song(void *, double times);
extern int piano_unqueue_song(void *p);
extern int piano_is_song_queued(void *p);

#endif //PIANO_H