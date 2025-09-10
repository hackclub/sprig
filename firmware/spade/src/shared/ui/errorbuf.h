#pragma once

#include "shared/sprig_engine/base_engine.h"

extern char errorbuf[512];     // Buffer for error messages (frequently abused for printing anything)
extern Color errorbuf_color;   // Color for error messages
static void fatal_error(void); // Call to handle fatal errors
