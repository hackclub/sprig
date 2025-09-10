#include "tone_map.h"

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

static uint8_t note_read(NoteReadState *nrs, char *char_source) {
  char *endptr = NULL;
  char *str = char_source + nrs->i;

  // if (*str == 0) return 0;

  if (!nrs->open) {
    nrs->to_wait = strtof(str, &endptr);
    if (endptr) {
      str = endptr;

      // if there's more than just a pause, we open for notes
      if (*str == ':') {
        str++; // consume the colon!
        nrs->open = 1;
        goto THERES_MORE;
      }

      // if it's a comma and newline we eat that shit (and stay closed)
      if (*str == ',') {
        str += 2;
        goto THERES_MORE; // where there's a comma in this spec, there's more
      }

      #if 0
      this and a line up at the top of this function are commented out,
      because i think ignoring the final duration is something we actually
      want to do!
      if (*str == '\0') {
        // this is fucked up because 1 has meant "there's more" but
        goto THERES_MORE;
      }
      #endif

      // just filter out empty lines between notes i guess
      if (*str == '\n') str++;
    }
  }
  else {
    // go ahead and eat a comma + close, if we can
    if (*str == ',') {
      nrs->open = 0;

      // we eat commas and newlines
      str += 2;

      goto THERES_MORE;
    }

    while (1) {
      if (*str == ' ') { str++; continue; }
      if (*str == '+') { str++; continue; }
      if (*str ==   0) { nrs->open = 0; break; }
      if (*str == '\n') { str++; continue; } // ignore newlines, as a newline is not a note (i think)
      if (*str <= 'Z' && *str >= 'A') { *str ^= 32; } // convert uppercase notes from new sprig editor to lowercase
      if (*str <= 'z' && *str >= 'a') {

        char note[4] = {0};
        int freq = 0;
        {
          int note_len = 0;
          while (isalnum((int)*str) || *str == '#')
            note[note_len++] = *str++;
          freq = tone_map[fnv1_hash(note, note_len) % ARR_LEN(tone_map)];
        }

        char shape = *str++;

        endptr = NULL;
        float duration = strtof(str, &endptr);
        if (endptr) str = endptr;

        {
          Sound sound = Sound_Sine;
          {
                 if (shape == '~') sound = Sound_Sine;
            else if (shape == '-') sound = Sound_Square;
            else if (shape == '^') sound = Sound_Triangle;
            else if (shape == '/') sound = Sound_Sawtooth;
            // else                   dbg("unknown shape");
          }
          nrs->ret = (NrsRet) {
            .kind = NrsRetKind_Sound,
            .duration = duration,

            .sound.freq  = freq ,
            .sound.sound = sound,
          };
        }

        goto THERES_MORE;
      }
      break;
    }
  }

  nrs->i = str - char_source;
  return 0;

  THERES_MORE:
  nrs->i = str - char_source;
  return 1;
}

static uint8_t tune_parse(NoteReadState *nrs, char *char_source) {
  bzero(&nrs->ret, sizeof(NrsRet));

  if (note_read(nrs, char_source)) {
    if (!nrs->open) {
      // okay, we've read a whole note, we can finish this note! ...
      nrs->ret = (NrsRet) {
        .kind = NrsRetKind_Pause,
        .duration = nrs->to_wait,
      };
    }
    return 1;
  }
  if (char_source[nrs->i] == '\0') return 0;

  return 1;
}
