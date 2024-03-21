/* ff_stdio.h
Copyright 2021 Carl John Kugler III

Licensed under the Apache License, Version 2.0 (the License); you may not use 
this file except in compliance with the License. You may obtain a copy of the 
License at

   http://www.apache.org/licenses/LICENSE-2.0 
Unless required by applicable law or agreed to in writing, software distributed 
under the License is distributed on an AS IS BASIS, WITHOUT WARRANTIES OR 
CONDITIONS OF ANY KIND, either express or implied. See the License for the 
specific language governing permissions and limitations under the License.
*/
// For compatibility with FreeRTOS+FAT API
#include <errno.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>
//
#include "ff.h"
//
#include "my_debug.h"

#define BaseType_t int
#define FF_FILE FIL

#define ff_rewind f_rewind
#define pvPortMalloc malloc
#define vPortFree free
#define ffconfigMAX_FILENAME 250
#define configASSERT myASSERT
#define FF_PRINTF printf
#define pdFREERTOS_ERRNO_NONE 0
#define FF_EOF (-1)
#define FF_SEEK_SET 0
#define FF_SEEK_CUR 1
#define FF_SEEK_END 2
#define pdFALSE 0
#define pdTRUE 1
#define ff_filelength f_size
#define ff_feof f_eof

typedef struct FF_STAT {
    uint32_t st_size; /* Size of the object in number of bytes. */
    // uint16_t st_mode;			/* The mode (attribute bits) of this
    // file or directory. */
} FF_Stat_t;

typedef struct {
    DIR dir;
    FILINFO fileinfo;    
    const char *pcFileName;
    uint32_t ulFileSize;
    //uint8_t ucAttributes;
} FF_FindData_t;

FF_FILE *ff_fopen(const char *pcFile, const char *pcMode);
int ff_fclose(FF_FILE *pxStream);
int ff_stat(const char *pcFileName, FF_Stat_t *pxStatBuffer);
size_t ff_fwrite(const void *pvBuffer, size_t xSize, size_t xItems,
                 FF_FILE *pxStream);
size_t ff_fread(void *pvBuffer, size_t xSize, size_t xItems, FF_FILE *pxStream);
int ff_chdir(const char *pcDirectoryName);
char *ff_getcwd(char *pcBuffer, size_t xBufferLength);
int ff_mkdir(const char *pcPath);
int ff_fputc(int iChar, FF_FILE *pxStream);
int ff_fgetc(FF_FILE *pxStream);
int ff_rmdir(const char *pcDirectory);
int ff_remove(const char *pcPath);
long ff_ftell(FF_FILE *pxStream);
int ff_fseek(FF_FILE *pxStream, int iOffset, int iWhence);
int ff_findfirst(const char *pcDirectory, FF_FindData_t *pxFindData);
int ff_findnext( FF_FindData_t *pxFindData );
FF_FILE *ff_truncate( const char * pcFileName, long lTruncateSize );
int ff_seteof( FF_FILE *pxStream );
int ff_rename( const char *pcOldName, const char *pcNewName, int bDeleteIfExists );
char *ff_fgets(char *pcBuffer, size_t xCount, FF_FILE *pxStream);
