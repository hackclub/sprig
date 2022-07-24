#define WASM_EXPORT __attribute__((visibility("default")))
#include <stdint.h>

/* --- begin random wasm bs --- */
extern void putchar(char c);
extern void putint(int i);
extern unsigned char __heap_base;
#define PAGE_SIZE (1 << 16)
/* --- end random wasm bs --- */

/* i lied its all random wasm bs */

static float fabsf(float x) { return (x < 0) ? -x : x; }
static float signf(float f) {
  if (f < 0) return -1;
  if (f > 0) return 1;
  return 0;
}

#define TEXT_CHARS_MAX_X (20)
#define TEXT_CHARS_MAX_Y (16)
typedef struct {
  uint8_t r, g, b;
  int x, y;
  char content[TEXT_CHARS_MAX_X];
} Text;

#define SPRITE_SIZE (16)
typedef struct {
  uint8_t pixels[SPRITE_SIZE][SPRITE_SIZE][4];
} Doodle;

typedef struct Sprite Sprite;
struct Sprite {
  Sprite *next;
  int x, y;
  char kind;
};
static void map_free(Sprite *s);
static Sprite *map_alloc(void);

typedef struct { Sprite *sprite; int x, y; } MapIter;

#define PER_CHAR (255)
#define MAP_SIZE_X (100)
#define MAP_SIZE_Y (100)
typedef struct {
  int width, height;

  Text texts[TEXT_CHARS_MAX_Y*TEXT_CHARS_MAX_X];

  Doodle legend[PER_CHAR];
  uint8_t solid[PER_CHAR];
  uint8_t push_table[PER_CHAR][PER_CHAR];

  Sprite sprite_pool[(1 << 10)];
  int sprite_pool_head;
  /* points into sprite_pool */
  Sprite *map[MAP_SIZE_X][MAP_SIZE_Y];

  uint8_t temp_str_mem[(1 << 12)];
  MapIter temp_MapIter_mem;
} State;
static State *state = 0;

WASM_EXPORT void init(int bytes) {
  int mem_needed = sizeof(State)/PAGE_SIZE;

  int delta = mem_needed - __builtin_wasm_memory_size(0) + 2;
  if (delta > 0) __builtin_wasm_memory_grow(0, delta);
  state = (void *)&__heap_base;

  putchar('h');
  putchar('i');
}

WASM_EXPORT uint8_t *temp_str_mem(void) {
  __builtin_memset(&state->temp_str_mem, 0, sizeof(state->temp_str_mem));
  return state->temp_str_mem;
}

WASM_EXPORT MapIter *temp_MapIter_mem(void) {
  __builtin_memset(&state->temp_MapIter_mem, 0, sizeof(state->temp_MapIter_mem));
  return &state->temp_MapIter_mem;
}

static Sprite *map_alloc(void) {
  return state->sprite_pool + state->sprite_pool_head++;
}
static void map_free(Sprite *s) {
  // TODO: generational indexing
}

/* removes the canonical reference to this sprite from the spatial grid.
   it is your responsibility to subsequently free the sprite. */
static void map_pluck(Sprite *s) {
  Sprite *top = state->map[s->x][s->y];
  // assert(top != 0);

  if (top == s) {
    state->map[s->x][s->y] = s->next;
    return;
  }

  for (Sprite *t = top; t->next; t = t->next) {
    if (t->next == s) {
      t->next = s->next;
      return;
    }
  }

  state->map[s->x][s->y] = 0;
}

/* pushes pointer to sprite onto top of spritestack at the sprite's x and y.

   caller's responsibility to ensure the sprite
   is not already pointed to on the map somewhere,
   e.g. called map_pluck beforehand (or this is a fresh sprite)
   (unless they're into that!?!) */
static void map_plop(Sprite *s) {
  s->next = state->map[s->x][s->y];
  state->map[s->x][s->y] = s;
}


WASM_EXPORT Sprite *map_add(int x, int y, char kind) {
  Sprite *s = map_alloc();
  *s = (Sprite) { .x = x, .y = y, .kind = kind };
  map_plop(s);
  return s;
}

WASM_EXPORT void map_set(char *str) {
  __builtin_memset(&state->map, 0, sizeof(state->map));

  int tx = 0, ty = 0;
  do {
    switch (*str) {
      case '\n': ty++, tx = 0; break;
      case  '.': tx++;         break;
      case '\0':               break;
      default: {
        state->map[tx][ty] = map_alloc();
        *state->map[tx][ty] = (Sprite) { .x = tx, .y = ty, .kind = *str };
        tx++;
      } break;
    }
  } while (*str++);
  state->width = tx;
  state->height = ty+1;
}

WASM_EXPORT int map_width(void) { return state->width; }
WASM_EXPORT int map_height(void) { return state->height; }

WASM_EXPORT Sprite *map_get_first(char kind) {
  for (int y = 0; y < state->height; y++)
    for (int x = 0; x < state->width; x++) {
      if (!state->map[x][y]) continue;

      if (state->map[x][y]->kind == kind)
        return state->map[x][y];
    }
  return 0;
}

WASM_EXPORT uint8_t map_get_grid(MapIter *m) {
  if (m->sprite && m->sprite->next) {
    m->sprite = m->sprite->next;
    return 1;
  }

  while (1) {
    m->x++;
    if (m->x >= state->width) {
      m->x = 0;
      m->y++;
      if (m->y >= state->height) return 0;
    }

    if (state->map[m->x][m->y]) {
      m->sprite = state->map[m->x][m->y];
      return 1;
    }
  }
}

/* you could easily do this in JS, but I suspect there is a
 * great perf benefit to avoiding all of the calls back and forth
 */
WASM_EXPORT uint8_t map_get_all(MapIter *m, char kind) {
  while (map_get_grid(m))
    if (m->sprite->kind == kind)
      return 1;
  return 0;
}

WASM_EXPORT uint8_t map_tiles_with(MapIter *m, char *kinds) {
  char kinds_needed[255] = {0};
  int kinds_len = 0;
  for (; *kinds; kinds++) {
    int c = (int)*kinds;
    
    /* filters out duplicates! */
    if (kinds_needed[c] != 0) continue;

    kinds_len++;
    kinds_needed[c] = 1;
  }

  while (1) {
    m->x++;
    if (m->x >= state->width) {
      m->x = 0;
      m->y++;
      if (m->y >= state->height) return 0;
    }

    if (state->map[m->x][m->y]) {
      int kinds_found = 0;

      for (Sprite *s = state->map[m->x][m->y]; s; s = s->next)
        kinds_found += kinds_needed[(int)s->kind];

      if (kinds_found == kinds_len) {
        m->sprite = state->map[m->x][m->y];
        return 1;
      }
    }
  }
}

WASM_EXPORT void MapIter_position(MapIter *m, int x, int y) {
  m->x = x;
  m->y = y;
}

WASM_EXPORT void map_remove(Sprite *s) {
  map_pluck(s);
  map_free(s);
}

/* removes all of the sprites at a given location */
WASM_EXPORT void map_drill(int x, int y) {
  Sprite *top = state->map[x][y];
  for (; top; top = top->next) {
    map_free(top);
  }
  state->map[x][y] = 0;
}


/* move a sprite by one unit along the specified axis
   returns how much it was moved on that axis (may be 0 if path obstructed) */
WASM_EXPORT int map_move(Sprite *s, int big_dx, int big_dy) {
  int dx = signf(big_dx);
  int dy = signf(big_dy);

  /* expected input: x and y aren't both 0, either x or y is non-zero (not both) */
  if (dx == 0 && dy == 0) return 0;

  int prog = 0;
  int goal = (fabsf(big_dx) > fabsf(big_dy)) ? big_dx : big_dy;

  while (prog != goal) {
    if (state->solid[(int)s->kind]) {
      int x = s->x+dx;
      int y = s->y+dy;

      /* no moving off of the map! */
      if (x < 0) return prog;
      if (y < 0) return prog;
      if (x >= state->width) return prog;
      if (y >= state->height) return prog;

      /* no moving into a solid! */
      Sprite *n = state->map[x][y];

      for (; n; n = n->next)
        if (state->solid[(int)n->kind]) {
          /* unless you can push them out of the way ig */
          if (state->push_table[(int)s->kind][(int)n->kind]) {
            if (map_move(n, dx, dy) == 0)
              return prog;
          }
          else
            return prog;
        }
    }

    map_pluck(s);
    s->x += dx;
    s->y += dy;
    map_plop(s);
    prog += (fabsf(dx) > fabsf(dy)) ? dx : dy;
  }

  return prog;
}

WASM_EXPORT int sprite_get_x(Sprite *s) { return s->x; }
WASM_EXPORT int sprite_get_y(Sprite *s) { return s->y; }
WASM_EXPORT char sprite_get_kind(Sprite *s) { return s->kind; }
WASM_EXPORT void sprite_set_kind(Sprite *s, char kind) { s->kind = kind; }

WASM_EXPORT void solids_push(char c) {
  state->solid[(int)c] = 1;
}
WASM_EXPORT void solids_clear(void) {
  __builtin_memset(&state->solid, 0, sizeof(state->solid));
}

WASM_EXPORT void push_table_set(char pusher, char pushes) {
  state->push_table[(int)pusher][(int)pushes] = 1;
}
WASM_EXPORT void push_table_clear(void) {
  __builtin_memset(&state->push_table, 0, sizeof(state->push_table));
}

#if 0
void text_add(char *str, int x, int y, uint32_t color);
Sprite *sprite_add(int x, int y, char kind);
Sprite *sprite_next(Sprite *s);
int sprite_get_x(Sprite *s);
int sprite_get_y(Sprite *s);
char sprite_get_kind(Sprite *s);
void sprite_set_x(Sprite *s, int x);
void sprite_set_y(Sprite *s, int y);
void sprite_set_kind(Sprite *s, char kind);

void spritestack_clear(int x, int y);

void solids_push(char c);
void solids_clear();

// setPushables, 

setBackground

map: _makeTag(text => text),
bitmap: _makeTag(text => text),
tune: _makeTag(text => text),
#endif
