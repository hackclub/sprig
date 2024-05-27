#include "shared/sprig_engine/script.h"
#include "hardware/flash.h"
static void core1_entry(void);

// rationale: half engine, half games?
// NOTE: this has to be a multiple of 4096 (FLASH_SECTOR_SIZE)
#define FLASH_TARGET_OFFSET (800 * 1024)

const uint8_t *flash_target_contents = (const uint8_t *) (XIP_BASE + FLASH_TARGET_OFFSET);

uint16_t SPRIG_MAGIC[FLASH_PAGE_SIZE/2] = { 1337, 42, 69, 420, 420, 1337 };

static const char *save_read(void) {
  if (memcmp(&SPRIG_MAGIC, flash_target_contents, sizeof(SPRIG_MAGIC)) != 0) {
    puts("no magic :(");
    return NULL;
  }

  // add a page to get what's after the magic
  const char *save = flash_target_contents + FLASH_PAGE_SIZE;
  return save;
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
} upl_state = {0};

static void upl_flush_buf(void) {
  uint32_t interrupts = save_and_disable_interrupts();
  flash_range_program(FLASH_TARGET_OFFSET + (upl_state.page++) * 256,
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
          flash_range_erase(FLASH_TARGET_OFFSET, sector_len);
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
          flash_range_program(FLASH_TARGET_OFFSET, (void *)SPRIG_MAGIC, FLASH_PAGE_SIZE);
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
