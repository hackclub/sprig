#pragma once

#include "jerryscript.h"
#include "jerryxx.h"
#include "shared/sprig_engine/module_native.h"
#include "shared/sprig_engine/base_engine.h"
#include "shared/sprig_engine/script.h"

JERRYXX_FUN(console_log) {
  jerryxx_print_value(JERRYXX_GET_ARG(0));
  return jerry_create_undefined();
}
static struct {
  jerry_value_t press_cb, frame_cb;
} spade_state = {0};

static void parse_and_run_code(const jerry_char_t *tag, const jerry_char_t *code, jerry_length_t code_len) {
  jerry_value_t parsed_code = jerry_parse (
      (jerry_char_t *)tag, strlen(tag),
      code, strlen(code),
      JERRY_PARSE_STRICT_MODE
    );

    if (jerry_value_is_error (parsed_code)) {
      yell("couldn't parse code :-O! error in:");
      yell(tag);
      jerryxx_print_error(parsed_code, 1);
      fatal_error();
    }
    jerry_value_t ret_value = jerry_run (parsed_code);

    if (jerry_value_is_error (ret_value)) {
      yell("couldn't run code :-(! error in:");
      yell(tag);
      jerryxx_print_error(ret_value, 1);
      fatal_error();
    }

    jerry_release_value (ret_value);
    jerry_release_value (parsed_code);
}
static void js_run(const jerry_char_t *game_code, uint8_t include_engine) {

  // add shit to global scope
  {
    jerry_value_t global_object = jerry_get_global_object ();

    // add the "console" module to the JavaScript global object
    {
      jerry_value_t console_obj = jerry_create_object ();

      jerryxx_set_property_function(console_obj, "log", console_log);
      jerryxx_set_property_function(console_obj, "error", console_log);

      jerry_value_t prop_console = jerry_create_string ((const jerry_char_t *) "console");
      jerry_release_value(jerry_set_property(global_object, prop_console, console_obj));
      jerry_release_value (prop_console);

      // Release all jerry_value_t-s
      jerry_release_value (console_obj);
    }

    // add the "native" module to the JavaScript global object
    {
      jerry_value_t native_obj = jerry_create_object ();

      module_native_init(native_obj);

      jerry_value_t prop_native = jerry_create_string ((const jerry_char_t *) "native");
      jerry_release_value(jerry_set_property(global_object, prop_native, native_obj));
      jerry_release_value (prop_native);

      // Release all jerry_value_t-s
      jerry_release_value (native_obj);
    }

    jerry_release_value(global_object);
  }

  State_Render *sr = state->render;
  dbgf("state->push_table     = %lu\n", state->push_table  );
  dbgf("   sr->legend         = %lu\n", sr->legend         );
  dbgf("   sr->legend_resized = %lu\n", sr->legend_resized );

  if(include_engine){
    parse_and_run_code("engine", engine_script, sizeof(engine_script)-1);
  }


  puts("bouta run some code");
  // Execute the parsed source code in the Global scope
  parse_and_run_code("game", game_code, strlen(game_code));
  
  // Cleanup engine
  // jerry_cleanup ();
}

static void js_promises(void) {
  static int aborted = 0;
  if (aborted) return;

  jerry_value_t job_value;
  while (true) {
    job_value = jerry_run_all_enqueued_jobs();

    if (jerry_value_is_error(job_value)) {
      yell("couldn't run job :(");
      jerryxx_print_error(job_value, 1);

      if (jerry_value_is_abort(job_value)) {
        aborted = 1;
        yell("everyone died, can never run js again");
        return;
      }
    }
    else
      break;
  }
}

static void spade_call_press(int pin) {
  if (!spade_state.press_cb) return;

  jerry_value_t this_value = jerry_create_undefined();
  jerry_value_t args[] = { jerry_create_number(pin) };

  jerry_value_t res = jerry_call_function(
    spade_state.press_cb,
    jerry_create_undefined(),
    args,
    1
  );

  if (jerry_value_is_error (res)) {
    yell("couldn't call press_cb :(");
    jerryxx_print_error(res, 1);
    // abort();
  }

  jerry_release_value(res);

  jerry_release_value(args[0]);
  jerry_release_value(this_value);
}
static void spade_call_frame(double dt) {
  if (!spade_state.frame_cb) return;

  jerry_value_t this_value = jerry_create_undefined();
  jerry_value_t args[] = { jerry_create_number(dt) };

  jerry_value_t res = jerry_call_function(
    spade_state.frame_cb,
    jerry_create_undefined(),
    args,
    1
  );
  if (jerry_value_is_error (res)) {
    yell("couldn't call frame_cb :(");
    jerryxx_print_error(res, 1);
    // abort();
  }
  jerry_release_value(res);

  jerry_release_value(args[0]);
  jerry_release_value(this_value);
}
