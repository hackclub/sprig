#pragma once

#include "jerryscript.h"

static void *jerry_calloc(size_t count, size_t size) {
  void *ptr = jerry_heap_alloc(count * size);
  memset(ptr, 0, count * size);
  return ptr;
}

static void *jerry_realloc(void *old_ptr, size_t old_size, size_t new_size) {
  dbgf("realloc %zu -> %zu\n", old_size, new_size);
  void *new_ptr = jerry_heap_alloc(new_size);
  if (new_ptr == 0) {
    dbg("oof got back null rip");
    return 0;
  }

  memset(new_ptr, 0, new_size);
  dbg("zeroin that mf out");

  if (old_ptr) {
    dbg("doing shit with the old ptr");
    memcpy(new_ptr, old_ptr, (old_size < new_size) ? old_size : new_size);
    jerry_heap_free(old_ptr, old_size);
  }

  dbg("returning new ptr");
  return new_ptr;
}

