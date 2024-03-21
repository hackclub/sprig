/* ff_stdio.c
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
#include <limits.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "my_debug.h"
//
#include "f_util.h"
#include "ff_stdio.h"

#define TRACE_PRINTF(fmt, args...) {}
//#define TRACE_PRINTF printf

static BYTE posix2mode(const char *pcMode) {
    if (0 == strcmp("r", pcMode)) return FA_READ;
    if (0 == strcmp("r+", pcMode)) return FA_READ | FA_WRITE;
    if (0 == strcmp("w", pcMode)) return FA_CREATE_ALWAYS | FA_WRITE;
    if (0 == strcmp("w+", pcMode)) return FA_CREATE_ALWAYS | FA_WRITE | FA_READ;
    if (0 == strcmp("a", pcMode)) return FA_OPEN_APPEND | FA_WRITE;
    if (0 == strcmp("a+", pcMode)) return FA_OPEN_APPEND | FA_WRITE | FA_READ;
    if (0 == strcmp("wx", pcMode)) return FA_CREATE_NEW | FA_WRITE;
    if (0 == strcmp("w+x", pcMode)) return FA_CREATE_NEW | FA_WRITE | FA_READ;
    return 0;
}

int fresult2errno(FRESULT fr) {
    switch (fr) {
        case FR_OK:
            return 0;
        case FR_DISK_ERR:
            return EIO;
        case FR_INT_ERR:
            return EIO;
        case FR_NOT_READY:
            return EIO;
        case FR_NO_FILE:
            return ENOENT;
        case FR_NO_PATH:
            return ENOENT;
        case FR_INVALID_NAME:
            return ENAMETOOLONG;
        case FR_DENIED:
            return EACCES;
        case FR_EXIST:
            return EEXIST;
        case FR_INVALID_OBJECT:
            return EIO;
        case FR_WRITE_PROTECTED:
            return EACCES;
        case FR_INVALID_DRIVE:
            return ENOENT;
        case FR_NOT_ENABLED:
            return ENOENT;
        case FR_NO_FILESYSTEM:
            return ENOENT;
        case FR_MKFS_ABORTED:
            return EIO;
        case FR_TIMEOUT:
            return EIO;
        case FR_LOCKED:
            return EACCES;
        case FR_NOT_ENOUGH_CORE:
            return ENOMEM;
        case FR_TOO_MANY_OPEN_FILES:
            return ENFILE;
        case FR_INVALID_PARAMETER:
            return ENOSYS;
        default:
            return -1;
    }
}

FF_FILE *ff_fopen(const char *pcFile, const char *pcMode) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_open (FIL* fp, const TCHAR* path, BYTE mode);
    // /* Open or create a file */ FRESULT f_open (
    //  FIL* fp,           /* [OUT] Pointer to the file object structure */
    //  const TCHAR* path, /* [IN] File name */
    //  BYTE mode          /* [IN] Mode flags */
    //);
    FIL *fp = malloc(sizeof(FIL));
    if (!fp) {
        errno = ENOMEM;
        return NULL;
    }
    FRESULT fr = f_open(fp, pcFile, posix2mode(pcMode));
    errno = fresult2errno(fr);
    if (FR_OK != fr) {
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
        free(fp);
        fp = 0;
    }
    return fp;
}
int ff_fclose(FF_FILE *pxStream) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_close (
    //  FIL* fp     /* [IN] Pointer to the file object */
    //);
    FRESULT fr = f_close(pxStream);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    free(pxStream);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
// Populates an ff_stat_struct with information about a file.
int ff_stat(const char *pcFileName, FF_Stat_t *pxStatBuffer) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_stat (
    //  const TCHAR* path,  /* [IN] Object name */
    //  FILINFO* fno        /* [OUT] FILINFO structure */
    //);
    myASSERT(pxStatBuffer);
    FILINFO filinfo;
    FRESULT fr = f_stat(pcFileName, &filinfo);
    pxStatBuffer->st_size = filinfo.fsize;
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
size_t ff_fwrite(const void *pvBuffer, size_t xSize, size_t xItems,
                 FF_FILE *pxStream) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_write (
    //  FIL* fp,          /* [IN] Pointer to the file object structure */
    //  const void* buff, /* [IN] Pointer to the data to be written */
    //  UINT btw,         /* [IN] Number of bytes to write */
    //  UINT* bw          /* [OUT] Pointer to the variable to return number of
    //  bytes written */
    //);
    UINT bw = 0;
    FRESULT fr = f_write(pxStream, pvBuffer, xSize * xItems, &bw);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    return bw / xSize;
}
size_t ff_fread(void *pvBuffer, size_t xSize, size_t xItems,
                FF_FILE *pxStream) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_read (
    //  FIL* fp,     /* [IN] File object */
    //  void* buff,  /* [OUT] Buffer to store read data */
    //  UINT btr,    /* [IN] Number of bytes to read */
    //  UINT* br     /* [OUT] Number of bytes read */
    //);
    UINT br = 0;
    FRESULT fr = f_read(pxStream, pvBuffer, xSize * xItems, &br);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    return br / xSize;
}
int ff_chdir(const char *pcDirectoryName) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_chdir (
    //  const TCHAR* path /* [IN] Path name */
    //);
    FRESULT fr = f_chdir(pcDirectoryName);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
char *ff_getcwd(char *pcBuffer, size_t xBufferLength) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_getcwd (
    //  TCHAR* buff, /* [OUT] Buffer to return path name */
    //  UINT len     /* [IN] The length of the buffer */
    //);
    char buf[xBufferLength];
    FRESULT fr = f_getcwd(buf, xBufferLength);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    // If the current working directory name was successfully written to
    // pcBuffer then pcBuffer is returned. Otherwise NULL is returned.
    if (FR_OK == fr) {
        if ('/' != buf[0]) {
            // Strip off drive prefix:
            char *p = strchr(buf, ':');
            if (p)
                ++p;
            else
                p = buf;
            strncpy(pcBuffer, p, xBufferLength);
        }
        return pcBuffer;
    } else {
        return NULL;
    }
}
int ff_mkdir(const char *pcDirectoryName) {
    TRACE_PRINTF("%s(pxStream=%s)\n", __func__, pcDirectoryName);
    FRESULT fr = f_mkdir(pcDirectoryName);
    if (FR_OK != fr && FR_EXIST != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    if (FR_OK == fr || FR_EXIST == fr)
        return 0;
    else
        return -1;
}
int ff_fputc(int iChar, FF_FILE *pxStream) {
    // TRACE_PRINTF("%s(iChar=%c,pxStream=%p)\n", __func__, iChar, pxStream);
    // FRESULT f_write (
    //  FIL* fp,          /* [IN] Pointer to the file object structure */
    //  const void* buff, /* [IN] Pointer to the data to be written */
    //  UINT btw,         /* [IN] Number of bytes to write */
    //  UINT* bw          /* [OUT] Pointer to the variable to return number of
    //  bytes written */
    //);
    UINT bw = 0;
    uint8_t buff[1];
    buff[0] = iChar;
    FRESULT fr = f_write(pxStream, buff, 1, &bw);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    // On success the byte written to the file is returned. If any other value
    // is returned then the byte was not written to the file and the task's
    // errno will be set to indicate the reason.
    if (1 == bw)
        return iChar;
    else {
        return -1;
    }
}
int ff_fgetc(FF_FILE *pxStream) {
    // TRACE_PRINTF("%s(pxStream=%p)\n", __func__, pxStream);
    // FRESULT f_read (
    //  FIL* fp,     /* [IN] File object */
    //  void* buff,  /* [OUT] Buffer to store read data */
    //  UINT btr,    /* [IN] Number of bytes to read */
    //  UINT* br     /* [OUT] Number of bytes read */
    //);
    uint8_t buff[1] = {0};
    UINT br;
    FRESULT fr = f_read(pxStream, buff, 1, &br);
    if (FR_OK != fr)
        TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    // On success the byte read from the file system is returned. If a byte
    // could not be read from the file because the read position is already at
    // the end of the file then FF_EOF is returned.
    if (1 == br)
        return buff[0];
    else
        return FF_EOF;
}
int ff_rmdir(const char *pcDirectory) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_unlink (
    //  const TCHAR* path  /* [IN] Object name */
    //);
    FRESULT fr = f_unlink(pcDirectory);
    // If the directory was removed successfully then zero is returned. If the
    // directory could not be removed then -1 is returned and the task's errno
    // is set to indicate the reason.
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
int ff_remove(const char *pcPath) {
    TRACE_PRINTF("%s\n", __func__);
    FRESULT fr = f_unlink(pcPath);
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
long ff_ftell(FF_FILE *pxStream) {
    TRACE_PRINTF("%s\n", __func__);
    // FSIZE_t f_tell (
    //  FIL* fp   /* [IN] File object */
    //);
    FSIZE_t pos = f_tell(pxStream);
    myASSERT(pos < LONG_MAX);
    return pos;
}
int ff_fseek(FF_FILE *pxStream, int iOffset, int iWhence) {
    TRACE_PRINTF("%s\n", __func__);
    FRESULT fr = -1;
    switch (iWhence) {
        case FF_SEEK_CUR:  // The current file position.
            if ((int)f_tell(pxStream) + iOffset < 0) return -1;
            fr = f_lseek(pxStream, f_tell(pxStream) + iOffset);
            break;
        case FF_SEEK_END:  // The end of the file.
            if ((int)f_size(pxStream) + iOffset < 0) return -1;
            fr = f_lseek(pxStream, f_size(pxStream) + iOffset);
            break;
        case FF_SEEK_SET:  // The beginning of the file.
            if (iOffset < 0) return -1;
            fr = f_lseek(pxStream, iOffset);
            break;
        default:
            myASSERT(!"Bad iWhence");
    }
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
int ff_findfirst(const char *pcDirectory, FF_FindData_t *pxFindData) {
    TRACE_PRINTF("%s(%s)\n", __func__, pcDirectory);
    // FRESULT f_findfirst (
    //  DIR* dp,              /* [OUT] Poninter to the directory object */
    //  FILINFO* fno,         /* [OUT] Pointer to the file information structure
    //  */ const TCHAR* path,    /* [IN] Pointer to the directory name to be
    //  opened */ const TCHAR* pattern  /* [IN] Pointer to the matching pattern
    //  string */
    //);
    char buf1[ffconfigMAX_FILENAME] = {0};
    if (pcDirectory[0]) {
        FRESULT fr = f_getcwd(buf1, sizeof buf1);
        errno = fresult2errno(fr);
        if (FR_OK != fr) return -1;
        fr = f_chdir(pcDirectory);
        errno = fresult2errno(fr);
        if (FR_OK != fr) return -1;
    }
    char buf2[ffconfigMAX_FILENAME] = {0};
    FRESULT fr = f_getcwd(buf2, sizeof buf2);
    TRACE_PRINTF("%s: f_findfirst(path=%s)\n", __func__, buf2);
    fr = f_findfirst(&pxFindData->dir, &pxFindData->fileinfo, buf2, "*");
    errno = fresult2errno(fr);
    pxFindData->pcFileName = pxFindData->fileinfo.fname;
    pxFindData->ulFileSize = pxFindData->fileinfo.fsize;
    TRACE_PRINTF("%s: fname=%s\n", __func__, pxFindData->fileinfo.fname);
    if (pcDirectory[0]) {
        FRESULT fr2 = f_chdir(buf1);
        errno = fresult2errno(fr2);
        if (FR_OK != fr2) return -1;
    }
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
int ff_findnext(FF_FindData_t *pxFindData) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_findnext (
    //  DIR* dp,              /* [IN] Poninter to the directory object */
    //  FILINFO* fno          /* [OUT] Pointer to the file information structure
    //  */
    //);
    FRESULT fr = f_findnext(&pxFindData->dir, &pxFindData->fileinfo);
    errno = fresult2errno(fr);
    pxFindData->pcFileName = pxFindData->fileinfo.fname;
    pxFindData->ulFileSize = pxFindData->fileinfo.fsize;
    TRACE_PRINTF("%s: fname=%s\n", __func__, pxFindData->fileinfo.fname);
    if (FR_OK == fr && pxFindData->fileinfo.fname[0]) {
        return 0;
    } else {
        return -1;
    }
}
FF_FILE *ff_truncate(const char *pcFileName, long lTruncateSize) {
    TRACE_PRINTF("%s\n", __func__);
    FIL *fp = malloc(sizeof(FIL));
    if (!fp) {
        errno = ENOMEM;
        return NULL;
    }
    FRESULT fr = f_open(fp, pcFileName, FA_OPEN_APPEND | FA_WRITE);
    if (FR_OK != fr)
        printf("%s: f_open error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    errno = fresult2errno(fr);
    if (FR_OK != fr) return NULL;
    while (f_tell(fp) < (FSIZE_t)lTruncateSize) {
        UINT bw = 0;
        char c = 0;
        fr = f_write(fp, &c, 1, &bw);
        if (FR_OK != fr)
            TRACE_PRINTF("%s error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
        errno = fresult2errno(fr);
        if (1 != bw) return NULL;
    }
    fr = f_lseek(fp, lTruncateSize);
    errno = fresult2errno(fr);
    if (FR_OK != fr)
        printf("%s: f_lseek error: %s (%d)\n", __func__, FRESULT_str(fr), fr);
    if (FR_OK != fr) return NULL;
    fr = f_truncate(fp);
    if (FR_OK != fr)
        printf("%s: f_truncate error: %s (%d)\n", __func__, FRESULT_str(fr),
               fr);
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return fp;
    else
        return NULL;
}
int ff_seteof(FF_FILE *pxStream) {
    TRACE_PRINTF("%s\n", __func__);
    FRESULT fr = f_truncate(pxStream);
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return FF_EOF;
}
int ff_rename(const char *pcOldName, const char *pcNewName,
              int bDeleteIfExists) {
    TRACE_PRINTF("%s\n", __func__);
    // FRESULT f_rename (
    //  const TCHAR* old_name, /* [IN] Old object name */
    //  const TCHAR* new_name  /* [IN] New object name */
    //);
    // Any object with this path name except old_name must not be exist, or the
    // function fails with FR_EXIST.
    if (bDeleteIfExists) f_unlink(pcNewName);
    FRESULT fr = f_rename(pcOldName, pcNewName);
    errno = fresult2errno(fr);
    if (FR_OK == fr)
        return 0;
    else
        return -1;
}
char *ff_fgets(char *pcBuffer, size_t xCount, FF_FILE *pxStream) {
    TRACE_PRINTF("%s\n", __func__);
    TCHAR *p = f_gets(pcBuffer, xCount, pxStream);
    // On success a pointer to pcBuffer is returned. If there is a read error
    // then NULL is returned and the task's errno is set to indicate the reason.
    if (p == pcBuffer)
        return pcBuffer;
    else {
        errno = EIO;
        return NULL;
    }
}
