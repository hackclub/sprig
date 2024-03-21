/* sd_card.h
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

// Note: The model used here is one FatFS per SD card. 
// Multiple partitions on a card are not supported.

#pragma once

#include <stdint.h>
//
#include "hardware/gpio.h"
#include "pico/mutex.h"
//
#include "../ff15/source/ff.h"
//
#include "spi.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct sd_card_t sd_card_t;

// "Class" representing SD Cards
struct sd_card_t {
    const char *pcName;
    spi_t *spi;
    // Slave select is here instead of in spi_t because multiple SDs can share an SPI.
    uint ss_gpio;                   // Slave select for this SD card
    bool use_card_detect;
    uint card_detect_gpio;    // Card detect; ignored if !use_card_detect
    uint card_detected_true;  // Varies with card socket; ignored if !use_card_detect
    // Drive strength levels for GPIO outputs.
    // enum gpio_drive_strength { GPIO_DRIVE_STRENGTH_2MA = 0, GPIO_DRIVE_STRENGTH_4MA = 1, GPIO_DRIVE_STRENGTH_8MA = 2,
    // GPIO_DRIVE_STRENGTH_12MA = 3 }
    bool set_drive_strength;
    enum gpio_drive_strength ss_gpio_drive_strength;

    // Following fields are used to keep track of the state of the card:
    int m_Status;                                    // Card status
    uint64_t sectors;                                // Assigned dynamically
    int card_type;                                   // Assigned dynamically
    mutex_t mutex;
    FATFS fatfs;
    bool mounted;

    int (*init)(sd_card_t *sd_card_p);
    int (*write_blocks)(sd_card_t *sd_card_p, const uint8_t *buffer,
                    uint64_t ulSectorNumber, uint32_t blockCnt);
    int (*read_blocks)(sd_card_t *sd_card_p, uint8_t *buffer, uint64_t ulSectorNumber,
                    uint32_t ulSectorCount);

    // Useful when use_card_detect is false - call periodically to check for presence of SD card
    // Returns true if and only if SD card was sensed on the bus
    bool (*sd_test_com)(sd_card_t *sd_card_p);
};

#define SD_BLOCK_DEVICE_ERROR_NONE 0
#define SD_BLOCK_DEVICE_ERROR_WOULD_BLOCK -5001 /*!< operation would block */
#define SD_BLOCK_DEVICE_ERROR_UNSUPPORTED -5002 /*!< unsupported operation */
#define SD_BLOCK_DEVICE_ERROR_PARAMETER -5003   /*!< invalid parameter */
#define SD_BLOCK_DEVICE_ERROR_NO_INIT -5004     /*!< uninitialized */
#define SD_BLOCK_DEVICE_ERROR_NO_DEVICE -5005   /*!< device is missing or not connected */
#define SD_BLOCK_DEVICE_ERROR_WRITE_PROTECTED -5006 /*!< write protected */
#define SD_BLOCK_DEVICE_ERROR_UNUSABLE -5007    /*!< unusable card */
#define SD_BLOCK_DEVICE_ERROR_NO_RESPONSE -5008 /*!< No response from device */
#define SD_BLOCK_DEVICE_ERROR_CRC -5009    /*!< CRC error */
#define SD_BLOCK_DEVICE_ERROR_ERASE -5010 /*!< Erase error: reset/sequence */
#define SD_BLOCK_DEVICE_ERROR_WRITE -5011 /*!< SPI Write error: !SPI_DATA_ACCEPTED */

///* Disk Status Bits (DSTATUS) */
// See diskio.h.
//enum {
//    STA_NOINIT = 0x01, /* Drive not initialized */
//    STA_NODISK = 0x02, /* No medium in the drive */
//    STA_PROTECT = 0x04 /* Write protected */
//};

bool sd_card_detect(sd_card_t *pSD);
uint64_t sd_sectors(sd_card_t *pSD);

bool sd_init_driver();
bool sd_card_detect(sd_card_t *sd_card_p);

#ifdef __cplusplus
}
#endif

/* [] END OF FILE */
