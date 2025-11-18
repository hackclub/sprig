#pragma once
static char engine_script[] = 
  #ifdef SPADE_EMBEDDED
    #include "build/engine.min.js.cstring"
  #else
    #include "build/engine.js.cstring"
  #endif
;