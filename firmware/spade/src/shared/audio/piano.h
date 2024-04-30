#pragma once

#include <stdint.h>

float strtof(const char *restrict nptr, char **restrict endptr);

// gaps in your audio? increase this
#define SAMPLES_PER_BUFFER (256*8)
#define SAMPLES_PER_SECOND 24000

typedef struct {
  void (*song_free)(void *);
  int (*song_chars)(void *p, char *buf, int buf_len);
} PianoOpts;

void piano_init(PianoOpts);
void piano_fill_sample_buf(int16_t *samples, int size);

int  piano_queue_song(void *, double times);
int  piano_unqueue_song(void *p);
int  piano_is_song_queued(void *p);
