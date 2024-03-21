#ifndef PARSE_TUNE
#define PARSE_TUNE

#include "tone_map.h"
#include "piano.h"

typedef enum {
  NrsRetKind_None,
  NrsRetKind_Pause,
  NrsRetKind_Sound,
} NrsRetKind;

typedef struct {
  NrsRetKind kind;
  float duration;

  struct { // if NoteKind_Sound:
    int freq;
    Sound sound;
  } sound;
} NrsRet;

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))
typedef struct {
  uint8_t open;

  float to_wait;

  NrsRet ret;

  int i;
  // char *str; // iterated through
} NoteReadState;

extern uint8_t note_read(NoteReadState *nrs, char *char_source);
extern uint8_t tune_parse(NoteReadState *nrs, char *char_source);

#endif //PARSE_TUNE