#include "shared/sprig_engine/script.h"
#include "hardware/flash.h"
#include <stdlib.h>
static void core1_entry(void);

typedef enum {
    Location_FLASH
    // TODO: will add SD
    // TODO: swap games into SD if flash overfilled
} Game_Location;

typedef struct {
    char name[128];
    Game_Location location;
    uint8_t slot;
    uint32_t size_b;
} Game;

Game current_game = (Game) {};
int slot = 0;

// rationale: half engine, half games?
// NOTE: this has to be a multiple of 4096 (FLASH_SECTOR_SIZE)
#define SLOT_SIZE (100 * 1024)
#define MAX_SLOTS 7
#define FLASH_TARGET_START (800*1024)
#define FLASH_TARGET_OFFSET(slot_i) (FLASH_TARGET_START + slot_i * SLOT_SIZE)

#define GAME_SLOTS(bytes) (bytes / (SLOT_SIZE - FLASH_PAGE_SIZE) + 1)

#define METADATA_ENTRY_SIZE (256) // you can program up to one page at a time. (256 bytes).
#define METADATA_SIZE (17 * METADATA_ENTRY_SIZE) // first entry is for version
#define METADATA_MAX_ENTRIES (METADATA_SIZE / METADATA_ENTRY_SIZE - 1)
#define METADATA_CONTENTS ((const Game *) XIP_BASE + FLASH_TARGET_START - METADATA_SIZE + METADATA_ENTRY_SIZE)
#define METADATA_OFFSET ((const Game*) FLASH_TARGET_START - METADATA_SIZE + METADATA_ENTRY_SIZE)

#define FLASH_VERSION ((const char *) XIP_BASE + FLASH_TARGET_START - METADATA_SIZE)

#define FLASH_TARGET_CONTENTS(slot_i) ((const uint8_t *) (XIP_BASE + FLASH_TARGET_OFFSET(slot_i)))

// sprig magic is a good idea, even with metadata, to make consolidation / knowing which blocks are filled easier
// we might want to occasionally do a parity check between the metadata and flash.
uint16_t SPRIG_MAGIC[6] = { 1337, 42, 69, 420, 420, 1337 };

static const char *save_read() {
    if (memcmp(&SPRIG_MAGIC, FLASH_TARGET_CONTENTS(slot), sizeof(SPRIG_MAGIC)) != 0) {
    puts("no magic :(");
    return NULL;
  }

  // add a page to get what's after the magic
    const char *save = FLASH_TARGET_CONTENTS(slot) + FLASH_PAGE_SIZE;
  return save;
}

static void erase_user_portion_of_flash_this_is_dangerous() {
    flash_range_erase((uint32_t) FLASH_TARGET_OFFSET(0) - METADATA_SIZE + METADATA_ENTRY_SIZE, SLOT_SIZE * MAX_SLOTS + METADATA_SIZE - METADATA_ENTRY_SIZE);
}

// save versions != spade versions
// increment in the value returned means different scheme for saving games
static int get_save_version(const char* version) {
    if (strcmp(version, "1.1.0") == 0) return 2;

    // flash version isn't stored
    return 1;
}

static int update_save_version() {
    int version = get_save_version(FLASH_VERSION);
    if (version == get_save_version(SPADE_VERSION)) return 0;

    switch (version) { // recursive if need to update multiple versions.
        case 1:
            // TODO: add flash metadata for first game, store save version
            return 1;
        default:
            return 0;
    }

}

// returns len of games. games should be pointer to array of games (Game**)
static int get_games(Game** games, int games_len) {
    int games_i = 0;

    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {

        if (memcmp(&METADATA_CONTENTS[i], &(Game) {0}, sizeof(Game)) == 0)
            continue;

        if (games_len <= ++games_i) {
            games_len *= 2;
            *games = realloc(*games, games_len * sizeof(Game));
        }

        (*games)[games_i] = METADATA_CONTENTS[i];
    }

    return games_i;
}

static int get_available_game_slots() {
    int available_metadata_slots = 0;
    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {
        if (memcmp(&METADATA_CONTENTS[i], &(Game){}, sizeof(Game)) == 0)
            available_metadata_slots++;
    }

    int available_flash_slots = 0;
    for (int i = 0; i < MAX_SLOTS; i++) {
        if (memcmp(FLASH_TARGET_CONTENTS(i), &SPRIG_MAGIC, sizeof(SPRIG_MAGIC)) == 0)
            available_flash_slots++;
    }

    // minimum of both
    return available_flash_slots < available_metadata_slots ? available_flash_slots : available_metadata_slots;
}

static int get_available_flash_slots_at_end() {
    int available_slots = 0;

    int highest_slot = 0;
    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {
        if (memcmp(&METADATA_CONTENTS[i], &(Game){}, sizeof(Game)) != 0) {
            if (METADATA_CONTENTS[i].slot > highest_slot)
                highest_slot = METADATA_CONTENTS[i].slot;
        }
    }
    highest_slot++;

    while (highest_slot++ < MAX_SLOTS) {
        available_slots++;
    }

    return available_slots;
}

static int get_last_open_flash_slot() {
    int highest_slot = 0;
    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {
        if (memcmp(&METADATA_CONTENTS[i], &(Game){}, sizeof(Game)) != 0) {
            if (METADATA_CONTENTS[i].slot > highest_slot)
                highest_slot = METADATA_CONTENTS[i].slot;
        }
    }
    highest_slot++;
    return highest_slot;
}

static int get_last_open_metadata_slot() {
    int highest_slot = 0;

    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {
        if (memcmp(&METADATA_CONTENTS[i], &(Game){}, sizeof(Game)) != 0)
            highest_slot = i;
    }
    highest_slot++;

    if (highest_slot < METADATA_MAX_ENTRIES)
        return highest_slot;
    else {
        return -1; // no slots at end; should consolidate slots.
    }
}

static void set_game(Game aGame) {
    // this is fine for now.
    // in future, include logic to swap games in SD to flash
    current_game = aGame;
    slot = aGame.slot;
}

static int delete_game(Game aGame) {
    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {
        if (memcmp(&METADATA_CONTENTS[i], &(Game){0}, sizeof(Game)) != 0) { // there is metadata
            if (METADATA_CONTENTS[i].slot == aGame.slot && METADATA_CONTENTS[i].location == aGame.location) {
                flash_range_erase((uint32_t) &METADATA_OFFSET[i], METADATA_ENTRY_SIZE);
                for (int sl = 0; sl < aGame.size_b / SLOT_SIZE + 1; sl++) {
                    flash_range_erase((uint32_t) FLASH_TARGET_OFFSET(sl), sizeof(SPRIG_MAGIC));
                }
                return 1;
            }
        }
    }
    return 0;
}

void consolidate_metadata() {
    int last_contiguious_element = 0;

    for (int i = 0; i < METADATA_MAX_ENTRIES; i++) {
        if (memcmp(&METADATA_CONTENTS[i], &(Game) {0}, sizeof(Game)) == 0) {
            if (memcmp(&METADATA_CONTENTS[i+1], &(Game) {0}, sizeof(Game)) != 0) { // metadata empty in current, not next
                flash_range_program((uint32_t) &METADATA_OFFSET[i], (const uint8_t *) &METADATA_CONTENTS[i + 1], METADATA_ENTRY_SIZE);
                flash_range_erase((uint32_t) &METADATA_OFFSET[i + 1], METADATA_ENTRY_SIZE);
                i = last_contiguious_element;
            }
        } else {
            last_contiguious_element = i;
        }
    }
}

void consolidate_flash_games() {
    int last_contiguous_game = 0;

    for (int i = 0; i < MAX_SLOTS; i++) {
        if (memcmp(&SPRIG_MAGIC, FLASH_TARGET_CONTENTS(i), sizeof(SPRIG_MAGIC)) != 0) {
            if (memcmp(&SPRIG_MAGIC, FLASH_TARGET_CONTENTS(i+1), sizeof(SPRIG_MAGIC)) == 0) {
                // no magic in i, magic in i+1; shift over
                flash_range_program((uint32_t) FLASH_TARGET_OFFSET(i), FLASH_TARGET_CONTENTS(i+1), SLOT_SIZE);
                flash_range_erase((uint32_t) FLASH_TARGET_OFFSET(i+1), sizeof(SPRIG_MAGIC));

                for (int metadata_i = 0; metadata_i < METADATA_MAX_ENTRIES; metadata_i++) {
                    if (memcmp(&METADATA_CONTENTS[metadata_i], &(Game){0}, sizeof(Game)) != 0) {
                        if (METADATA_CONTENTS[metadata_i].slot == i+1) {
                            Game game_new = METADATA_CONTENTS[metadata_i];
                            game_new.slot = i;
                            flash_range_program((uint32_t) &METADATA_OFFSET[metadata_i], (const uint8_t *) &game_new, METADATA_ENTRY_SIZE);
                        }
                    }
                }

                i = last_contiguous_game;
            }
        } else {
            last_contiguous_game = i;
        }
    }
}

// aGame should be pre-inited with size_b and name! slot and location will be ignored.
// TODO: move internal details into a different struct?
static int new_game(Game aGame) {
    if (get_available_game_slots() > 0) {

    }
    return 0;
}

typedef enum {
  UplProg_Header,
  UplProg_Body,
} UplProg;
static struct {
  UplProg prog;
  uint32_t len, len_i;
  char buf[256];
  int page;
  char name[128];
  uint8_t name_i;
} upl_state = {0};

static void upl_flush_buf(void) {
    puts("wtf?? 6");

    uint32_t interrupts = save_and_disable_interrupts();
  flash_range_program(FLASH_TARGET_OFFSET(slot) + (upl_state.page++) * 256,
                      (void *)upl_state.buf,
                      256);
  restore_interrupts(interrupts);
  memset(upl_state.buf, 0, sizeof(upl_state.buf));
  printf("wrote page (%d/%d)\n",
         upl_state.page,
         (upl_state.len/(FLASH_PAGE_SIZE + 1)));
}

static int upl_stdin_read(void) {
    memset(&upl_state, 0, sizeof(upl_state));

    int timeout = 1000; // 1ms; we're already in upload mode
  for (;;) {
    int c = getchar_timeout_us(timeout);
    if (c == PICO_ERROR_TIMEOUT) return 0;

    switch (upl_state.prog) {
      case UplProg_Header: {
          puts("wahoo header");
          if (upl_state.name_i < sizeof(upl_state.name) / sizeof(char)) // read game
          {
              ((char *) (&upl_state.name))[upl_state.name_i++] = c;
              puts(upl_state.name);
          }
          else {
              ((char *) (&upl_state.len))[upl_state.len_i++] = c;
              if (upl_state.len_i >= sizeof(uint32_t)) {
                  printf("ok reading %lu chars\n", upl_state.len);
                  upl_state.prog = UplProg_Body;
                  upl_state.len_i = 0;
                  upl_state.page = 1; // skip first, that's for magic

                  {
                      Game game;
                      strcpy(game.name, upl_state.name);
                      game.size_b = upl_state.len;
                      game.location = Location_FLASH;


                      // not enough slots
                      if (get_available_game_slots() < GAME_SLOTS(upl_state.len)) {
                          puts("no available game slots!");
                          return 0; // ERROR!
                      } else if (get_available_flash_slots_at_end() < GAME_SLOTS(upl_state.len)) {
                          consolidate_flash_games();
                          game.slot = get_last_open_flash_slot();
                      } else {
                          game.slot = get_last_open_flash_slot();
                      }

                      slot = game.slot;

                      // add to metadata
                      if (get_last_open_metadata_slot() == -1) {
                          consolidate_metadata();
                      }

                      int metadata_i = get_last_open_metadata_slot();
                      memcpy((void *) &METADATA_CONTENTS[metadata_i], &game, sizeof(Game));

                      printf("metadata_i: %d,\n"
                             "slot: %d\n"
                             "size_b: %lu", metadata_i, slot, game.size_b);
                  }

                  uint32_t char_len = upl_state.len +
                                 sizeof(engine_script); // sizeof script includes the null term, we still need to remove from script
                  upl_state.len = char_len;
                  // one to round up, one for magic
                  uint32_t page_len = (char_len / FLASH_PAGE_SIZE + 2) * FLASH_PAGE_SIZE;
                  uint32_t sector_len = (page_len / FLASH_SECTOR_SIZE + 1) * FLASH_SECTOR_SIZE;

                  // irqs on other core?
                  multicore_reset_core1();

                  uint32_t interrupts = save_and_disable_interrupts();
                  flash_range_erase(FLASH_TARGET_OFFSET(slot), sector_len);
                  restore_interrupts(interrupts);

                  for (int i = 0; i < sizeof(engine_script) - 1; i++) {
                      upl_state.buf[upl_state.len_i++ % FLASH_PAGE_SIZE] = engine_script[i];
                      if (upl_state.len_i % FLASH_PAGE_SIZE == 0) {
                          puts("flushin buf (wit da code!)");
                          upl_flush_buf();
                      }
                  }

                  puts("cleared flash");
              }
          }
      } break;
      case UplProg_Body: {

          // printf("upl char (%d/%d)\n", upl_state.len_i, upl_state.len);
        upl_state.buf[upl_state.len_i++ % FLASH_PAGE_SIZE] = c;

        if (upl_state.len_i % FLASH_PAGE_SIZE == 0) {
          puts("flushin buf");
          upl_flush_buf();
        }

          if (upl_state.len_i == upl_state.len - 1) {
          upl_flush_buf();

          uint32_t interrupts = save_and_disable_interrupts();
          flash_range_program(FLASH_TARGET_OFFSET(slot), (void *)SPRIG_MAGIC, FLASH_PAGE_SIZE);
          restore_interrupts(interrupts);

          // printf("read in %d chars\n", upl_state.len);
          puts("ALL_GOOD");
          memset(&upl_state, 0, sizeof(upl_state));

          multicore_launch_core1(core1_entry);

          return 1;
        }
      } break;
    }
  }
  puts("end of upl_stdin_read");
}
