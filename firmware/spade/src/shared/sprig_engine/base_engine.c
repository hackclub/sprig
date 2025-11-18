#include <stdint.h>
#include "jerryscript.h"

#include "shared/ui/errorbuf.h"
#include "shared/ui/font.h"
#include "shared/js_runtime/jerry_mem.h"
#include "base_engine.h"

static State *state = NULL;

// Get the sign of an integer. Returns -1 if negative, 1 if positive, 0 if 0.
static int sign(int i) {
  return (i > 0) - (i < 0);
}

// Converte color id into palette index.
static uint8_t char_to_palette_index(char c) {
  switch (c) {
    case '0': return  0;
    case 'L': return  1;
    case '1': return  2;
    case '2': return  3;
    case '3': return  4;
    case 'C': return  5;
    case '7': return  6;
    case '5': return  7;
    case '6': return  8;
    case 'F': return  9;
    case '4': return 10;
    case 'D': return 11;
    case '8': return 12;
    case 'H': return 13;
    case '9': return 14;
    case '.': return 15;
    default: return 0; /* lmfao (anything to quiet the voices.)
                                (i meant clang warnings. same thing) */
  }
}

/**
 * Lots of getter/setters for bitpacked boolean arrays. See: doodles and push tables.
 * 
 * Memory is precious!
 */

static void doodle_pane_set_bit(uint8_t *pane, int x, int y) {
  int i = y*SPRITE_SIZE + x;
  pane[i/8] |= 1 << (i % 8);
}
static bool doodle_pane_read(uint8_t *pane, int x, int y) {
  int i = y*SPRITE_SIZE + x;
  int q = 1 << (i % 8);
  return !!(pane[i/8] & q);
}

static void push_table_set_bit(char x_char, char y_char) {
  int x = state->char_to_index[(int) x_char];
  int y = state->char_to_index[(int) y_char];

  int i = y*state->legend_size + x;
  state->push_table[i/8] |= 1 << (i % 8);
}
static bool push_table_read(char x_char, char y_char) {
  int x = state->char_to_index[(int) x_char];
  int y = state->char_to_index[(int) y_char];

  int i = y*state->legend_size + x;
  int q = 1 << (i % 8);
  return !!(state->push_table[i/8] & q);
}

// Sprite index to sprite pointer or NULL if index is 0.
static Sprite *get_sprite(uint16_t i) {
  if (i == 0) return NULL;
  return state->sprite_pool + i - 1;
}

// Expand the sprite pool! Preserves current sprites.
static void sprite_pool_realloc(int size) {
  dbg("reallocating the sprite pool!");
  size_t start_size = state->sprite_pool_size;

  #define realloc_n(arr, os, ns) jerry_realloc((arr), sizeof((arr)[0]) * os, sizeof((arr)[0]) * ns);
  state->sprite_slot_active     = realloc_n(state->sprite_slot_active    , start_size, size);
  state->sprite_slot_generation = realloc_n(state->sprite_slot_generation, start_size, size);
  state->sprite_pool            = realloc_n(state->sprite_pool           , start_size, size);
  #undef realloc_n

  int worked = state->sprite_slot_active     &&
               state->sprite_slot_generation &&
               state->sprite_pool             ;
  // dbg("let's see if it worked ...");
  // dbgf("state->sprite_slot_active     = %lu\n", state->sprite_slot_active    );
  // dbgf("state->sprite_slot_generation = %lu\n", state->sprite_slot_generation);
  // dbgf("state->sprite_pool            = %lu\n", state->sprite_pool           );

  if (!worked) {
    snprintf(
      errorbuf, sizeof(errorbuf),
      "%lu sprites (%lu bytes!) is too many to fit on the pico!",
      state->sprite_pool_size,
      state->sprite_pool_size * sizeof(Sprite)
    );
    fatal_error();
  }

  // great, we were able to allocate enough memory
  state->sprite_pool_size = size;
}

// Expand the bitmap pool! Preserves current bitmaps.
static void legend_doodles_realloc(int size) {
  size_t start_size = state->legend_size;

  size_t push_table_bytes_old = start_size * start_size / 8;
  size_t push_table_bytes_new =       size *       size / 8;
  state->push_table = jerry_realloc(state->push_table,
                                    push_table_bytes_old,
                                    push_table_bytes_new);

  State_Render *sr = state->render;
  #define realloc_n(arr, os, ns) jerry_realloc((arr),                 \
                                             sizeof((arr)[0]) * os, \
                                             sizeof((arr)[0]) * ns);
  sr->legend         = realloc_n(sr->legend        , start_size, size);
  sr->legend_resized = realloc_n(sr->legend_resized, start_size, size);
  #undef realloc_n

  int worked = state->push_table  &&
               sr->legend         &&
               sr->legend_resized  ;

  dbgf("state->push_table     = %lu\n", state->push_table  );
  dbgf("   sr->legend         = %lu\n", sr->legend         );
  dbgf("   sr->legend_resized = %lu\n", sr->legend_resized );

  if (!worked) {
    snprintf(
      errorbuf, sizeof(errorbuf),
      "%d bitmaps (%lu bytes!) is too many to fit on the pico!",
      state->legend_size,
      state->legend_size * sizeof(Doodle) * 2 + push_table_bytes_new
    );
    fatal_error();
  }

  // great, we were able to allocate enough memory
  state->legend_size = size;
}

// Add some text to the screen.
static void text_add(char *str, char palette_index, int x, int y) {
  int x_initial = x;
  for (; *str; str++) {
    if (*str == '\n' || x >= (SCREEN_SIZE_X / 8)) {
      y++;
      x = x_initial;
      if (*str == '\n') continue;
    }
    if (y >= (SCREEN_SIZE_Y / 8)) break;
    state->text_char [y][x] = *str;
    state->text_color[y][x] = state->render->palette[char_to_palette_index(palette_index)];
    x++;
  }
}

// Clear all text.
static void text_clear(void) {
  memset(state->text_char , 0, sizeof(state->text_char ));
  memset(state->text_color, 0, sizeof(state->text_color));
}

// Initialize the engine.
static void init(void (*sprite_free_cb)(Sprite *)) {
  static State _state = {0};
  state = &_state;

  static State_Render _state_render = {0};
  state->render = &_state_render;

  state->sprite_free_cb = sprite_free_cb;

  // -- error handling for when state is dynamically allocated -- 
  // if (state->render == 0) {
  //   state->render = malloc(sizeof(State_Render));
  //   printf("sizeof(State_Render) = %d, addr: %d\n", sizeof(State_Render), (unsigned int)state->render);
  // }
  // if (state->render == 0) yell("couldn't alloc state");

  memset(state->render, 0, sizeof(State_Render));

  sprite_pool_realloc(512);
  legend_doodles_realloc(50);

  // Fill the palette
  state->render->palette[char_to_palette_index('0')] = color16(  0,   0,   0);
  state->render->palette[char_to_palette_index('L')] = color16( 73,  80,  87);
  state->render->palette[char_to_palette_index('1')] = color16(145, 151, 156);
  state->render->palette[char_to_palette_index('2')] = color16(248, 249, 250);
  state->render->palette[char_to_palette_index('3')] = color16(235,  44,  71);
  state->render->palette[char_to_palette_index('C')] = color16(139,  65,  46);
  state->render->palette[char_to_palette_index('7')] = color16( 25, 177, 248);
  state->render->palette[char_to_palette_index('5')] = color16( 19,  21, 224);
  state->render->palette[char_to_palette_index('6')] = color16(254, 230,  16);
  state->render->palette[char_to_palette_index('F')] = color16(149, 140,  50);
  state->render->palette[char_to_palette_index('4')] = color16( 45, 225,  62);
  state->render->palette[char_to_palette_index('D')] = color16( 29, 148,  16);
  state->render->palette[char_to_palette_index('8')] = color16(245, 109, 187);
  state->render->palette[char_to_palette_index('H')] = color16(170,  58, 197);
  state->render->palette[char_to_palette_index('9')] = color16(245, 113,  23);
  state->render->palette[char_to_palette_index('.')] = color16(  0,   0,   0);
}

/*
 * Zeroes and returns a reference to temp str memory. Used to pass
 * strings between C and JS land. (JANK ALERT!)
 */
static char *temp_str_mem(void) {
  memset(&state->temp_str_mem, 0, sizeof(state->temp_str_mem));
  return state->temp_str_mem;
}

/**
 * Resizes all the legend items to fit on screen.
 * 
 * Call this when the map changes size, or when the legend changes.
 */
static void render_resize_legend(void) {
  memset(state->render->legend_resized, 0, sizeof(Doodle) * state->legend_size);

  // how big do our tiles need to be to fit them all snugly on screen?
  float min_tile_x = SCREEN_SIZE_X / state->width;
  float min_tile_y = SCREEN_SIZE_Y / state->height;
  state->tile_size = (min_tile_x < min_tile_y) ? min_tile_x : min_tile_y;
  if (state->tile_size > 16)
    state->tile_size = 16;

  for (int c = 0; c < PER_CHAR; c++) {
    if (!state->render->legend_doodled[c]) continue;
    int i = state->char_to_index[c];

    Doodle *rd = state->render->legend_resized + i;
    Doodle *od = state->render->legend + i;

    for (int y = 0; y < 16; y++)
      for (int x = 0; x < 16; x++) {
        int rx = (float) x / 16.0f * state->tile_size;
        int ry = (float) y / 16.0f * state->tile_size;

        if (!doodle_pane_read(od->opacity, x, y)) continue;
                                                  doodle_pane_set_bit(rd->opacity , rx, ry);
        if (doodle_pane_read(od->palette0, x, y)) doodle_pane_set_bit(rd->palette0, rx, ry);
        if (doodle_pane_read(od->palette1, x, y)) doodle_pane_set_bit(rd->palette1, rx, ry);
        if (doodle_pane_read(od->palette2, x, y)) doodle_pane_set_bit(rd->palette2, rx, ry);
        if (doodle_pane_read(od->palette3, x, y)) doodle_pane_set_bit(rd->palette3, rx, ry);
      }
  }
}

// Self-explanatory... sets the background sprite.
static void render_set_background(char kind) {
  state->background_sprite = kind;
}

// Bounds of the game area on the screen.
typedef struct { int x, y, width, height, scale; } BoundsRect;

// Render a pixel! X and Y are screen-space, not game-space.
static Color render_pixel(BoundsRect *game, int x, int y) {
  int cx = x / 8;
  int cy = y / 8;
  char c = state->text_char[cy][cx];
  if (c) {
    int px = x % 8;
    int py = y % 8;
    uint8_t bits = font_pixels[c*8 + py];
    if ((bits >> (7-px)) & 1)
      return state->text_color[cy][cx];
  }

  if (game->scale == 0) return color16(0, 0, 0);

  x = (x - game->x) / game->scale;
  y = (y - game->y) / game->scale;
  if (x <  0           ) return color16(0, 0, 0);
  if (y <  0           ) return color16(0, 0, 0);
  if (x >= game->width ) return color16(0, 0, 0);
  if (y >= game->height) return color16(0, 0, 0);

  if (state->tile_size == 0) return color16(0, 0, 0);
  int tx = x / state->tile_size;
  int ty = y / state->tile_size;
  if (tx >= state->width ) return color16(0, 0, 0);
  if (ty >= state->height) return color16(0, 0, 0);

  Sprite *s = get_sprite(state->map[ty*state->width + tx]);
  while (1) {
    char sprite = (s == 0) ? state->background_sprite : s->kind;
    if (sprite == 0) return color16(255, 255, 255);
    Doodle *d = state->render->legend_resized + state->char_to_index[sprite];

    int px = x % state->tile_size;
    int py = y % state->tile_size;
    if (!doodle_pane_read(d->opacity, px, py)) {
      if (s) {
        s = get_sprite(s->next);
        continue;
      }
      return color16(255, 255, 255);
    };
    return state->render->palette[
      (doodle_pane_read(d->palette0, px, py) << 0) |
      (doodle_pane_read(d->palette1, px, py) << 1) |
      (doodle_pane_read(d->palette2, px, py) << 2) |
      (doodle_pane_read(d->palette3, px, py) << 3)
    ];
  }
}

// Calculate bounds of the game area on the screen.
static void render_calc_bounds(BoundsRect *rect) {
  if (!(state->width && state->height)) {
    *rect = (BoundsRect){0};
    return;
  }

  int scale;
  {
    int scale_x = SCREEN_SIZE_X/(state->width*16);
    int scale_y = SCREEN_SIZE_Y/(state->height*16);

    scale = (scale_x < scale_y) ? scale_x : scale_y;
    if (scale < 1) scale = 1;

    state->render->scale = scale;
  }
  rect->scale = scale;
  int size = state->tile_size*scale;

  rect->width = state->width*size;
  rect->height = state->height*size;

  rect->x = (SCREEN_SIZE_X - rect->width)/2;
  rect->y = (SCREEN_SIZE_Y - rect->height)/2;
}

// write_pixel will be run in top to bottom, left to right order
static void render(void (*write_pixel)(Color c)) {
  BoundsRect rect = {0};
  render_calc_bounds(&rect);

  for (int x = 0; x < 160; x++)
    for (int y = 0; y < 128; y++)
      write_pixel(render_pixel(&rect, x, y));
}

static Sprite *sprite_alloc(void) {
  for (int i = 0; i < state->sprite_pool_size; i++) {
    if (state->sprite_slot_active[i] == 0) {
      state->sprite_slot_active[i] = 1;
      return state->sprite_pool + i;
    }
  }

  sprite_pool_realloc(state->sprite_pool_size * 1.2f);
  return sprite_alloc();
}
static void sprite_free(Sprite *s) {
  if (state->sprite_free_cb) state->sprite_free_cb(s);

  memset(s, 0, sizeof(Sprite));
  size_t i = s - state->sprite_pool;
  state->sprite_slot_active    [i] = 0;
  state->sprite_slot_generation[i]++;
}
static bool sprite_is_active(Sprite *s, uint32_t generation) {
  if (s == NULL) return 0;
  size_t i = s - state->sprite_pool;
  return state->sprite_slot_generation[i] == generation;
}
static uint32_t sprite_generation(Sprite *s) {
  size_t i = s - state->sprite_pool;
  return state->sprite_slot_generation[i];
}

/* removes the canonical reference to this sprite from the spatial grid.
 * it is your responsibility to subsequently free the sprite. */
static void sprite_pluck_from_map(Sprite *s) {
  Sprite *top = get_sprite(state->map[s->x + s->y * state->width]);
  // assert(top != 0);

  if (top == s) {
    state->map[s->x + s->y * state->width] = s->next;
    return;
  }

  for (Sprite *t = top; t->next; t = get_sprite(t->next)) {
    if (get_sprite(t->next) == s) {
      t->next = s->next;
      return;
    }
  }

  state->map[s->x + s->y * state->width] = 0;
}

/**
 * inserts pointer to sprite into the spritestack at this x and y,
 * such that rendering z-order is preserved
 * (as expressed in order of legend_doodle_set calls)
 * 
 * see sprite_pluck_from_map about caller's responsibility
 */
static void sprite_plop_into_map(Sprite *sprite) {
  Sprite *top = get_sprite(state->map[sprite->x + sprite->y * state->width]);

  // we want the sprite with the lowest z-order on the top.

  #define Z_ORDER(sprite) (state->char_to_index[(int)(sprite)->kind])
  if (top == 0 || Z_ORDER(top) >= Z_ORDER(sprite)) {
    sprite->next = state->map[sprite->x + sprite->y * state->width];
    state->map[sprite->x + sprite->y * state->width] = sprite - state->sprite_pool + 1;
    // dbg("top's me, early ret");
    return;
  }

  Sprite *insert_after = top;
  while (insert_after->next && Z_ORDER(get_sprite(insert_after->next)) < Z_ORDER(sprite))
    insert_after = get_sprite(insert_after->next);
  #undef Z_ORDER

  sprite->next = insert_after->next;
  insert_after->next = sprite - state->sprite_pool + 1;
}

static Sprite *map_add(int x, int y, char kind) {
  if (x < 0 || x >= state->width ) return 0;
  if (y < 0 || y >= state->height) return 0;

  Sprite *s = sprite_alloc();
  if (s == 0) return 0;
  
  *s = (Sprite) { .x = x, .y = y, .kind = kind };
  // dbg("assigned to that mf");
  sprite_plop_into_map(s);
  // dbg("stuck 'em on map, returning now");
  return s;
}

static void map_set(char *str) {
  dbg("wormed ya way down into base_engine.c");

  // figure out how big of an allocation we need to make,  if any
  int tx = 0, ty = 0;
  char *str_dup = str;
  do {
    switch (*str_dup) {
      case  ' ': continue;
      case '\0':               break;
      case '\n': ty++, tx = 0; break;
      default: tx++;           break;
    }
  } while (*str_dup++);
  int old_map_size = state->width * state->height * sizeof(Sprite *);
  state->width = tx;
  state->height = ty+1;
  dbg("parsed, found dims");

  if (!state->width || !state->height) return;

  // free stuff so we can create new ones
  if (state->map != NULL)
    jerry_heap_free(state->map, old_map_size);
  for (int i = 0; i < state->sprite_pool_size; i++)
    sprite_free(state->sprite_pool + i);
  dbg("freed some sprites, maybe a map");

  state->map = jerry_calloc(state->width * state->height, sizeof(Sprite*));
  if (state->map == NULL) {
    yell("AAAAAAAAA (map too big)");
    snprintf(errorbuf, sizeof(errorbuf), "map too big to fit in memory (%dx%d)", state->width, state->height);
    fatal_error();
  }

  dbg("so we got us a map, time to alloc sprites");

  tx = 0, ty = 0;
  do {
    switch (*str) {
      case  ' ': continue;
      case '\n': ty++, tx = 0; break;
      case  '.': tx++;         break;
      case '\0':               break;
      default: {
        Sprite *s = sprite_alloc();
        dbg("alloced us a sprite");

        *s = (Sprite) { .x = tx, .y = ty, .kind = *str };
        dbg("filled in some fields");

        state->map[tx + ty * state->width] = s - state->sprite_pool + 1;
        dbg("put 'em on the map");

        tx++;
      } break;
    }
  } while (*str++);

  dbg("alrighty, lemme resize a legend");

  render_resize_legend();
}

static int map_width(void) { return state->width; }
static int map_height(void) { return state->height; }

static Sprite *map_get_first(char kind) {
  for (int y = 0; y < state->height; y++)
    for (int x = 0; x < state->width; x++) {
      Sprite *top = get_sprite(state->map[x + y * state->width]);
      for (; top; top = get_sprite(top->next))
        if (top->kind == kind)
          return top;
    }
  return 0;
}

static uint8_t map_get_grid(MapIter *m) {
  if (m->sprite && m->sprite->next) {
    m->sprite = get_sprite(m->sprite->next);
    return 1;
  }

  while (1) {
    if (!m->dirty)
      m->dirty = 1;
    else {
      m->x++;
      if (m->x >= state->width) {
        m->x = 0;
        m->y++;
        if (m->y >= state->height) return 0;
      }
    }

    if (state->map[m->x + m->y * state->width]) {
      m->sprite = get_sprite(state->map[m->x + m->y * state->width]);
      return 1;
    }
  }
}

/* you could easily do this in JS, but I suspect there is a
 * great perf benefit to avoiding all of the calls back and forth
 */
static uint8_t map_get_all(MapIter *m, char kind) {
  while (map_get_grid(m))
    if (m->sprite->kind == kind)
      return 1;
  return 0;
}

static uint8_t map_tiles_with(MapIter *m, char *kinds) {
  char kinds_needed[255] = {0};
  int kinds_len = 0;
  for (; *kinds; kinds++) {
    int c = (int)*kinds;
    
    // filters out duplicates!
    if (kinds_needed[c] != 0) continue;

    kinds_len++;
    kinds_needed[c] = 1;
  }

  while (1) {
    if (!m->dirty)
      m->dirty = 1;
    else {
      m->x++;
      if (m->x >= state->width) {
        m->x = 0;
        m->y++;
        if (m->y >= state->height) return 0;
      }
    }

    if (state->map[m->x + m->y * state->width]) {
      uint8_t kinds_seen[255] = {0};
      int kinds_found = 0;

      for (Sprite *s = get_sprite(state->map[m->x + m->y * state->width]);
           s;
           s = get_sprite(s->next)
      ) {
        kinds_found += kinds_needed[(int)s->kind] && !kinds_seen[(int)s->kind];
        kinds_seen[(int)s->kind] = 1;
      }

      if (kinds_found == kinds_len) {
        m->sprite = get_sprite(state->map[m->x + m->y * state->width]);
        return 1;
      }
    }
  }
}

static void map_remove(Sprite *s) {
  sprite_pluck_from_map(s);
  sprite_free(s);
}

// removes all of the sprites at a given location
static void map_drill(int x, int y) {
  if (x < 0 || x >= state->width ) return;
  if (y < 0 || y >= state->height) return;

  Sprite *top = get_sprite(state->map[x + y * state->width]);
  for (; top; top = get_sprite(top->next)) {
    sprite_free(top);
  }
  state->map[x + y * state->width] = 0;
}


/* move a sprite by one unit along the specified axis
 * returns how much it was moved on that axis (may be 0 if path obstructed) */
static int _map_move(Sprite *s, int big_dx, int big_dy) {
  int dx = sign(big_dx);
  int dy = sign(big_dy);

  // expected input: x and y aren't both 0, either x or y is non-zero (not both)
  if (dx == 0 && dy == 0) return 0;

  int prog = 0;
  int goal = (abs(big_dx) > abs(big_dy)) ? big_dx : big_dy;

  while (prog != goal) {
    int x = s->x+dx;
    int y = s->y+dy;

    // no moving off of the map!
    if (x < 0) return prog;
    if (y < 0) return prog;
    if (x >= state->width) return prog;
    if (y >= state->height) return prog;

    if (state->solid[(int)s->kind]) {
      // no moving into a solid!
      Sprite *n = get_sprite(state->map[x + y * state->width]);

      for (; n; n = get_sprite(n->next))
        if (state->solid[(int)n->kind]) {
          // unless you can push them out of the way ig
          if (push_table_read(s->kind, n->kind)) {
            if (_map_move(n, dx, dy) == 0)
              return prog;
          }
          else
            return prog;
        }
    }

    sprite_pluck_from_map(s);
    s->x += dx;
    s->y += dy;
    sprite_plop_into_map(s);
    prog += (abs(dx) > abs(dy)) ? dx : dy;
  }

  return prog;
}

static void map_move(Sprite *s, int big_dx, int big_dy) {
  int moved = _map_move(s, big_dx, big_dy);
  if (big_dx != 0) s->dx = moved;
  else             s->dy = moved;
}

static void map_clear_deltas(void) {
  for (int y = 0; y < state->height; y++)
    for (int x = 0; x < state->width; x++) {
      Sprite *top = get_sprite(state->map[x + y * state->width]);

      for (; top; top = get_sprite(top->next))
        top->dx = top->dy = 0;
    }
}

static void solids_push(char c) {
  state->solid[(int)c] = 1;
}
static void solids_clear(void) {
  memset(&state->solid, 0, sizeof(state->solid));
}

static void legend_doodle_set(char kind, char *str) {

  int index = state->char_to_index[(int)kind];

  // we don't want to increment if index 0 has already been assigned and this is it
  if (index == 0 && !state->render->legend_doodled[(int)kind]) {
    if (state->render->doodle_index_count >= state->legend_size)
      legend_doodles_realloc(state->legend_size * 1.2f);
    index = state->render->doodle_index_count++;
  }
  state->char_to_index[(int)kind] = index;

  state->render->legend_doodled[(int)kind] = 1;
  Doodle *d = state->render->legend + index;
  dbgf("bouta write to %lu + %d\n", state->render->legend, index);

  int px = 0, py = 0;
  do {
    switch (*str) {
      case '\n': py++, px = 0; break;
      case  '.': px++;         break;
      case '\0':               break;
      default: {
        int pi = char_to_palette_index(*str);
        if (pi & (1 << 0)) doodle_pane_set_bit(d->palette0, px, py);
        if (pi & (1 << 1)) doodle_pane_set_bit(d->palette1, px, py);
        if (pi & (1 << 2)) doodle_pane_set_bit(d->palette2, px, py);
        if (pi & (1 << 3)) doodle_pane_set_bit(d->palette3, px, py);
        doodle_pane_set_bit(d->opacity, px, py);
        px++;
      } break;
    }
  } while (*str++);
}
static void legend_clear(void) {
  state->render->doodle_index_count = 0;
  memset(state->render->legend, 0, sizeof(Doodle) * state->legend_size);
  memset(state->render->legend_resized, 0, sizeof(Doodle) * state->legend_size);
  memset(&state->render->legend_doodled, 0, sizeof(state->render->legend_doodled));
  memset(&state->char_to_index, 0, sizeof(state->char_to_index));
}
static void legend_prepare(void) {
  if (state->width && state->height)
    render_resize_legend();
}

static void push_table_set(char pusher, char pushes) {
  push_table_set_bit(pusher, pushes);
}
static void push_table_clear(void) {
  memset(state->push_table, 0, state->legend_size*state->legend_size/8);
}

// Render errorbuf to game text.
static void render_errorbuf(void) {
  int y = 0;
  int x = 0;
  for (int i = 0; i < sizeof(errorbuf); i++) {
    if (errorbuf[i] == '\0') break;
    if (errorbuf[i] == '\n' || x >= (SCREEN_SIZE_X / 8)) {
      y++;
      x = 0;
      if (errorbuf[i] == '\n') continue;
    }
    if (y >= (SCREEN_SIZE_Y / 8)) break;
    state->text_color[y][x] = errorbuf_color;
    state->text_char [y][x] = errorbuf[i];
    x++;
  }
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
