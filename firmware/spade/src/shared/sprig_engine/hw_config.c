/* hw_config.c
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
/*   
This file should be tailored to match the hardware design.

See 
https://github.com/carlk3/no-OS-FatFS-SD-SDIO-SPI-RPi-Pico/tree/main#customizing-for-the-hardware-configuration
*/

#include "hw_config.h"

/* Configuration of RP2040 hardware SPI object */
static spi_t spi = {  
    .hw_inst = spi0,  // RP2040 SPI component
    .sck_gpio = 18,    // GPIO number (not Pico pin number)
    .mosi_gpio = 19,
    .miso_gpio = 16,
    .baud_rate = 12 * 1000 * 1000   // Actual frequency: 10416666.
};

/* Configuration of the SD Card socket object */
static sd_card_t sd_card = {   
    /* "pcName" is the FatFs "logical drive" identifier.
    (See http://elm-chan.org/fsw/ff/doc/filename.html#vol) */
    .pcName = "0:",
    .spi = &spi,
    .ss_gpio = 21
};

/* ********************************************************************** */

size_t sd_get_num() { return 1; }

sd_card_t *sd_get_by_num(size_t num) {
    if (0 == num) {
        return &sd_card;
    } else {
        return NULL;
    }
}

size_t spi_get_num() { return 1; }
spi_t *spi_get_by_num(size_t num) {
    if (0 == num) {
        return &spi;
    } else {
        return NULL;
    }
}