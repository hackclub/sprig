#ifndef UPLOAD_H
#define UPLOAD_H

#include "constants.h"

typedef enum
{
	UplProg_StartSeq,
	UplProg_Header,
	UplProg_Body,
} UplProg;

static struct
{
	UplProg prog;
	uint32_t len, len_i;
	char buf[256];
	int page;
} upl_state = {0};

// Function predeclarations
extern void core1_entry(void);
extern const char *save_read(void);
extern void upl_flush_buf(void);
extern int upl_stdin_read(void);

#endif // UPLOAD_H