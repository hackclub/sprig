/* spi.h
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

#pragma once

#include <stdbool.h>
//
// Pico includes
#include "hardware/dma.h"
#include "hardware/gpio.h"
#include "hardware/irq.h"
#include "hardware/spi.h"
#include "pico/mutex.h"
#include "pico/sem.h"
#include "pico/types.h"

#define SPI_FILL_CHAR (0xFF)

// "Class" representing SPIs
typedef struct {
    // SPI HW
    spi_inst_t *hw_inst;
    uint miso_gpio;  // SPI MISO GPIO number (not pin number)
    uint mosi_gpio;
    uint sck_gpio;
    uint baud_rate;
    uint DMA_IRQ_num; // DMA_IRQ_0 or DMA_IRQ_1

    // Drive strength levels for GPIO outputs.
    // enum gpio_drive_strength { GPIO_DRIVE_STRENGTH_2MA = 0, GPIO_DRIVE_STRENGTH_4MA = 1, GPIO_DRIVE_STRENGTH_8MA = 2,
    // GPIO_DRIVE_STRENGTH_12MA = 3 }
    bool set_drive_strength;
    enum gpio_drive_strength mosi_gpio_drive_strength;
    enum gpio_drive_strength sck_gpio_drive_strength;

    // State variables:
    uint tx_dma;
    uint rx_dma;
    dma_channel_config tx_dma_cfg;
    dma_channel_config rx_dma_cfg;
    irq_handler_t dma_isr; // Ignored: no longer used
    bool initialized;  
    semaphore_t sem;
    mutex_t mutex;    
} spi_t;

#ifdef __cplusplus
extern "C" {
#endif
  
bool __not_in_flash_func(spi_transfer)(spi_t *pSPI, const uint8_t *tx, uint8_t *rx, size_t length);  
void spi_lock(spi_t *pSPI);
void spi_unlock(spi_t *pSPI);
bool my_spi_init(spi_t *pSPI);
void set_spi_dma_irq_channel(bool useChannel1, bool shared);

#ifdef __cplusplus
}
#endif

/* 
This uses the Pico LED to show SD card activity.
You can use it to get a rough idea of utilization.
Warning: Pico W uses GPIO 25 for SPI communication to the CYW43439.

You can enable this by putting something like
    add_compile_definitions(USE_LED=1)
in CMakeLists.txt, for example.
*/
#if !defined(NO_PICO_LED) && defined(USE_LED) && USE_LED && defined(PICO_DEFAULT_LED_PIN)
#  define LED_INIT()                     \
    {                                    \
        gpio_init(PICO_DEFAULT_LED_PIN);              \
        gpio_set_dir(PICO_DEFAULT_LED_PIN, GPIO_OUT); \
    }
#  define LED_ON() gpio_put(PICO_DEFAULT_LED_PIN, 1)
#  define LED_OFF() gpio_put(PICO_DEFAULT_LED_PIN, 0)
#else
#  define LED_ON()
#  define LED_OFF()
#  define LED_INIT()
#endif

/* [] END OF FILE */
