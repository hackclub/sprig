/* glue.c
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
/*-----------------------------------------------------------------------*/
/* Low level disk I/O module SKELETON for FatFs     (C)ChaN, 2019        */
/*-----------------------------------------------------------------------*/
/* If a working storage control module is available, it should be        */
/* attached to the FatFs via a glue function rather than modifying it.   */
/* This is an example of glue functions to attach various exsisting      */
/* storage control modules to the FatFs module with a defined API.       */
/*-----------------------------------------------------------------------*/
#include <stdio.h>
//
#include "ff.h" /* Obtains integer types */
//
#include "diskio.h" /* Declarations of disk functions */
//
#include "hw_config.h"
#include "my_debug.h"
#include "sd_card.h"

#define TRACE_PRINTF(fmt, args...)
//#define TRACE_PRINTF printf  // task_printf

/*-----------------------------------------------------------------------*/
/* Get Drive Status                                                      */
/*-----------------------------------------------------------------------*/

DSTATUS disk_status(BYTE pdrv /* Physical drive nmuber to identify the drive */
) {
    TRACE_PRINTF(">>> %s\n", __FUNCTION__);
    sd_card_t *p_sd = sd_get_by_num(pdrv);
    if (!p_sd) return RES_PARERR;
    sd_card_detect(p_sd);   // Fast: just a GPIO read
    return p_sd->m_Status;  // See http://elm-chan.org/fsw/ff/doc/dstat.html
}

/*-----------------------------------------------------------------------*/
/* Inidialize a Drive                                                    */
/*-----------------------------------------------------------------------*/

DSTATUS disk_initialize(
    BYTE pdrv /* Physical drive nmuber to identify the drive */
) {
    TRACE_PRINTF(">>> %s\n", __FUNCTION__);

    bool rc = sd_init_driver();
    if (!rc) return RES_NOTRDY;

    sd_card_t *p_sd = sd_get_by_num(pdrv);
    if (!p_sd) return RES_PARERR;
    // See http://elm-chan.org/fsw/ff/doc/dstat.html
    return p_sd->init(p_sd);  
}

static int sdrc2dresult(int sd_rc) {
    switch (sd_rc) {
        case SD_BLOCK_DEVICE_ERROR_NONE:
            return RES_OK;
        case SD_BLOCK_DEVICE_ERROR_UNUSABLE:
        case SD_BLOCK_DEVICE_ERROR_NO_RESPONSE:
        case SD_BLOCK_DEVICE_ERROR_NO_INIT:
        case SD_BLOCK_DEVICE_ERROR_NO_DEVICE:
            return RES_NOTRDY;
        case SD_BLOCK_DEVICE_ERROR_PARAMETER:
        case SD_BLOCK_DEVICE_ERROR_UNSUPPORTED:
            return RES_PARERR;
        case SD_BLOCK_DEVICE_ERROR_WRITE_PROTECTED:
            return RES_WRPRT;
        case SD_BLOCK_DEVICE_ERROR_CRC:
        case SD_BLOCK_DEVICE_ERROR_WOULD_BLOCK:
        case SD_BLOCK_DEVICE_ERROR_ERASE:
        case SD_BLOCK_DEVICE_ERROR_WRITE:
        default:
            return RES_ERROR;
    }
}

/*-----------------------------------------------------------------------*/
/* Read Sector(s)                                                        */
/*-----------------------------------------------------------------------*/

DRESULT disk_read(BYTE pdrv,  /* Physical drive nmuber to identify the drive */
                  BYTE *buff, /* Data buffer to store read data */
                  LBA_t sector, /* Start sector in LBA */
                  UINT count    /* Number of sectors to read */
) {
    TRACE_PRINTF(">>> %s\n", __FUNCTION__);
    sd_card_t *p_sd = sd_get_by_num(pdrv);
    if (!p_sd) return RES_PARERR;
    int rc = p_sd->read_blocks(p_sd, buff, sector, count);
    return sdrc2dresult(rc);
}

/*-----------------------------------------------------------------------*/
/* Write Sector(s)                                                       */
/*-----------------------------------------------------------------------*/

#if FF_FS_READONLY == 0

DRESULT disk_write(BYTE pdrv, /* Physical drive nmuber to identify the drive */
                   const BYTE *buff, /* Data to be written */
                   LBA_t sector,     /* Start sector in LBA */
                   UINT count        /* Number of sectors to write */
) {
    TRACE_PRINTF(">>> %s\n", __FUNCTION__);
    sd_card_t *p_sd = sd_get_by_num(pdrv);
    if (!p_sd) return RES_PARERR;
    int rc = p_sd->write_blocks(p_sd, buff, sector, count);
    return sdrc2dresult(rc);
}

#endif

/*-----------------------------------------------------------------------*/
/* Miscellaneous Functions                                               */
/*-----------------------------------------------------------------------*/

DRESULT disk_ioctl(BYTE pdrv, /* Physical drive nmuber (0..) */
                   BYTE cmd,  /* Control code */
                   void *buff /* Buffer to send/receive control data */
) {
    TRACE_PRINTF(">>> %s\n", __FUNCTION__);
    sd_card_t *p_sd = sd_get_by_num(pdrv);
    if (!p_sd) return RES_PARERR;
    switch (cmd) {
        case GET_SECTOR_COUNT: {  // Retrieves number of available sectors, the
                                  // largest allowable LBA + 1, on the drive
                                  // into the LBA_t variable pointed by buff.
                                  // This command is used by f_mkfs and f_fdisk
                                  // function to determine the size of
                                  // volume/partition to be created. It is
                                  // required when FF_USE_MKFS == 1.
            static LBA_t n;
            n = sd_sectors(p_sd);
            *(LBA_t *)buff = n;
            if (!n) return RES_ERROR;
            return RES_OK;
        }
        case GET_BLOCK_SIZE: {  // Retrieves erase block size of the flash
                                // memory media in unit of sector into the DWORD
                                // variable pointed by buff. The allowable value
                                // is 1 to 32768 in power of 2. Return 1 if the
                                // erase block size is unknown or non flash
                                // memory media. This command is used by only
                                // f_mkfs function and it attempts to align data
                                // area on the erase block boundary. It is
                                // required when FF_USE_MKFS == 1.
            static DWORD bs = 1;
            *(DWORD *)buff = bs;
            return RES_OK;
        }
        case CTRL_SYNC:
            return RES_OK;
        default:
            return RES_PARERR;
    }
}
