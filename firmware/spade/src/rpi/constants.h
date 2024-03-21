#ifndef CONSTANTS_H
#define CONSTANTS_H

#include "shared/sprig_engine/script.h"

// Enable or disable debugging
#define DEBUG 1

// The offset in bytes into the persistent flash memory to store game data - NOTE, must be multiple of FLASH_SECTOR_SIZE
#define FLASH_TARGET_OFFSET (800 * 1024) // spade has 2mb flash - half engine, half games?

// The size of the ringbuffered used for button debouncing
#define BUTTON_RINGBUFFER_HISTORY_LEN (64)

// Array length helper
#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))

// Set to false to enable debug prints for development (this is janky)
#if DEBUG
	#define dbg puts
	#define dbgf printf
#else
	#define dbg(...) ;
	#define dbgf(...) ;
#endif

/* Misc Debugging */
#define yell puts
#define CHKFREE(x) \
	if (x != null) \
	{              \
		free(x);   \
		x = null;  \
	}

#endif // CONSTANTS_H