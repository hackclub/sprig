#include "shared/sprig_engine/script.h"
#include "hardware/flash.h"
static void core1_entry(void);

// do not modify outside of wrapper functions!
uint8_t slot = 0;

// rationale: half engine, half games?
// NOTE: this has to be a multiple of 4096 (FLASH_SECTOR_SIZE)
#define SLOT_SIZE (100 * 1024)
#define MAX_SLOTS 8
#define FLASH_TARGET_OFFSET(slot_num) (800 * 1024) + slot_num * SLOT_SIZE

#define FLASH_TARGET_CONTENTS(slot_num) ((const uint8_t *) (XIP_BASE + FLASH_TARGET_OFFSET(slot_num)))

uint16_t SPRIG_MAGIC[] = { 1337, 42, 69, 420, 420, 1337 };

static const char *save_read(void) {
    if (memcmp(&SPRIG_MAGIC, FLASH_TARGET_CONTENTS(slot), sizeof(SPRIG_MAGIC)) != 0) {
    puts("no magic :(");
    return NULL;
  }

  // add a page to get what's after the magic
    const char *save = FLASH_TARGET_CONTENTS(slot) + FLASH_PAGE_SIZE;
  return save;
}

void set_game(uint8_t aSlot) {
    slot = aSlot;
}

typedef struct {
 //   char[100] name;
    uint8_t slot;
} Game;

uint8_t get_games(Game* games) {
    int games_i = 0;
    for (int i = 0; i < MAX_SLOTS; i++) {
        if (memcmp(FLASH_TARGET_OFFSET(slot), &SPRIG_MAGIC, sizeof SPRIG_MAGIC) == 0) { // there is a game
            games[games_i++] = (Game) {
                    //.name = (*char)(FLASH_TARGET_OFFSET(slot) + sizeof SPRIG_MAGIC),
                    .slot = i
            };
        }
    }
    return games_i; // legnth of array
}

void delete_game(uint8_t slot) {
    flash_range_erase(FLASH_TARGET_OFFSET(slot), FLASH_PAGE_SIZE);
}

uint16_t get_slots_remaining() {

}

typedef enum {
  UplProg_StartSeq,
  UplProg_Header,
  UplProg_Body,
} UplProg;
static struct {
  UplProg prog;
  uint32_t len, len_i;
  char buf[256];
  int page;
} upl_state = {0};

static void upl_flush_buf(void) {
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
  int timeout = 0;
  while (1) {
    int c = getchar_timeout_us(timeout);
    if (c == PICO_ERROR_TIMEOUT) return 0;

    timeout = 100; // we in upload mode now

    switch (upl_state.prog) {
      case UplProg_StartSeq: {
          if (c != upl_state.len_i) {
              upl_state.len_i = 0;
          }

        if (c == upl_state.len_i) {
          upl_state.len_i++;

          if (upl_state.len_i == 5) {
            puts("found startup seq!");
            memset(&upl_state, 0, sizeof(upl_state));
            upl_state.prog = UplProg_Header;
          }
        }
      } break;
      case UplProg_Header: {
        ((char *)(&upl_state.len))[upl_state.len_i++] = c;
        if (upl_state.len_i >= sizeof(uint32_t)) {
          printf("ok reading %d chars\n", upl_state.len);
          upl_state.prog = UplProg_Body;
          upl_state.len_i = 0;
          upl_state.page = 1; // skip first, that's for magic

          int char_len = upl_state.len + sizeof (engine_script); // sizeof script includes the null term, we still need to remove from script
          upl_state.len = char_len;
          // one to round up, one for magic
          int page_len   = (char_len/FLASH_PAGE_SIZE   + 2) * FLASH_PAGE_SIZE  ;
          int sector_len = (page_len/FLASH_SECTOR_SIZE + 1) * FLASH_SECTOR_SIZE;

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
