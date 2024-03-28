/* spi.c
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

#include <assert.h>
#include <stdbool.h>
//
#include "pico/stdlib.h"
#include "pico/mutex.h"
#include "pico/sem.h"
//
#include "my_debug.h"
#include "hw_config.h"
//
#include "spi.h"

static bool irqChannel1 = false;
static bool irqShared = true;

static void in_spi_irq_handler(const uint DMA_IRQ_num, io_rw_32 *dma_hw_ints_p) {
    for (size_t i = 0; i < spi_get_num(); ++i) {
        spi_t *spi_p = spi_get_by_num(i);
        if (DMA_IRQ_num == spi_p->DMA_IRQ_num)  {
            // Is the SPI's channel requesting interrupt?
            if (*dma_hw_ints_p & (1 << spi_p->rx_dma)) {
                *dma_hw_ints_p = 1 << spi_p->rx_dma;  // Clear it.
                assert(!dma_channel_is_busy(spi_p->rx_dma));
                assert(!sem_available(&spi_p->sem));
                bool ok = sem_release(&spi_p->sem);
                assert(ok);
            }
        }
    }
}
static void __not_in_flash_func(spi_irq_handler_0)() {
    in_spi_irq_handler(DMA_IRQ_0, &dma_hw->ints0);
}
static void __not_in_flash_func(spi_irq_handler_1)() {
    in_spi_irq_handler(DMA_IRQ_1, &dma_hw->ints1);
}

void set_spi_dma_irq_channel(bool useChannel1, bool shared) {
    irqChannel1 = useChannel1;
    irqShared = shared;
}

// SPI Transfer: Read & Write (simultaneously) on SPI bus
//   If the data that will be received is not important, pass NULL as rx.
//   If the data that will be transmitted is not important,
//     pass NULL as tx and then the SPI_FILL_CHAR is sent out as each data
//     element.
bool spi_transfer(spi_t *spi_p, const uint8_t *tx, uint8_t *rx, size_t length) {
    // assert(512 == length || 1 == length);
    assert(tx || rx);
    // assert(!(tx && rx));

    // tx write increment is already false
    if (tx) {
        channel_config_set_read_increment(&spi_p->tx_dma_cfg, true);
    } else {
        static const uint8_t dummy = SPI_FILL_CHAR;
        tx = &dummy;
        channel_config_set_read_increment(&spi_p->tx_dma_cfg, false);
    }

    // rx read increment is already false
    if (rx) {
        channel_config_set_write_increment(&spi_p->rx_dma_cfg, true);
    } else {
        static uint8_t dummy = 0xA5;
        rx = &dummy;
        channel_config_set_write_increment(&spi_p->rx_dma_cfg, false);
    }

    dma_channel_configure(spi_p->tx_dma, &spi_p->tx_dma_cfg,
                          &spi_get_hw(spi_p->hw_inst)->dr,  // write address
                          tx,                              // read address
                          length,  // element count (each element is of
                                   // size transfer_data_size)
                          false);  // start
    dma_channel_configure(spi_p->rx_dma, &spi_p->rx_dma_cfg,
                          rx,                              // write address
                          &spi_get_hw(spi_p->hw_inst)->dr,  // read address
                          length,  // element count (each element is of
                                   // size transfer_data_size)
                          false);  // start

    switch (spi_p->DMA_IRQ_num) {
        case DMA_IRQ_0:
            assert(!dma_channel_get_irq0_status(spi_p->rx_dma));
            break;
        case DMA_IRQ_1:
            assert(!dma_channel_get_irq1_status(spi_p->rx_dma));
            break;
        default:
            assert(false);
    }
    sem_reset(&spi_p->sem, 0);

    // start them exactly simultaneously to avoid races (in extreme cases
    // the FIFO could overflow)
    dma_start_channel_mask((1u << spi_p->tx_dma) | (1u << spi_p->rx_dma));

    /* Wait until master completes transfer or time out has occured. */
    uint32_t timeOut = 1000; /* Timeout 1 sec */
    bool rc = sem_acquire_timeout_ms(
        &spi_p->sem, timeOut);  // Wait for notification from ISR
    if (!rc) {
        // If the timeout is reached the function will return false
        DBG_PRINTF("Notification wait timed out in %s\n", __FUNCTION__);
        return false;
    }
    // Shouldn't be necessary:
    dma_channel_wait_for_finish_blocking(spi_p->tx_dma);
    dma_channel_wait_for_finish_blocking(spi_p->rx_dma);

    assert(!sem_available(&spi_p->sem));
    assert(!dma_channel_is_busy(spi_p->tx_dma));
    assert(!dma_channel_is_busy(spi_p->rx_dma));

    return true;
}

void spi_lock(spi_t *spi_p) {
    assert(mutex_is_initialized(&spi_p->mutex));
    mutex_enter_blocking(&spi_p->mutex);
}
void spi_unlock(spi_t *spi_p) {
    assert(mutex_is_initialized(&spi_p->mutex));
    mutex_exit(&spi_p->mutex);
}

bool my_spi_init(spi_t *spi_p) {
    auto_init_mutex(my_spi_init_mutex);
    mutex_enter_blocking(&my_spi_init_mutex);
    if (!spi_p->initialized) {
        //// The SPI may be shared (using multiple SSs); protect it
        //spi_p->mutex = xSemaphoreCreateRecursiveMutex();
        //xSemaphoreTakeRecursive(spi_p->mutex, portMAX_DELAY);
        if (!mutex_is_initialized(&spi_p->mutex)) mutex_init(&spi_p->mutex);
        spi_lock(spi_p);

        // Default:
        if (!spi_p->baud_rate)
            spi_p->baud_rate = 10 * 1000 * 1000;
        // For the IRQ notification:
        sem_init(&spi_p->sem, 0, 1);

        /* Configure component */
        // Enable SPI at 100 kHz and connect to GPIOs
        spi_init(spi_p->hw_inst, 100 * 1000);
        spi_set_format(spi_p->hw_inst, 8, SPI_CPOL_0, SPI_CPHA_0, SPI_MSB_FIRST);

        gpio_set_function(spi_p->miso_gpio, GPIO_FUNC_SPI);
        gpio_set_function(spi_p->mosi_gpio, GPIO_FUNC_SPI);
        gpio_set_function(spi_p->sck_gpio, GPIO_FUNC_SPI);
        // ss_gpio is initialized in sd_init_driver()

        // Slew rate limiting levels for GPIO outputs.
        // enum gpio_slew_rate { GPIO_SLEW_RATE_SLOW = 0, GPIO_SLEW_RATE_FAST = 1 }
        // void gpio_set_slew_rate (uint gpio,enum gpio_slew_rate slew)
        // Default appears to be GPIO_SLEW_RATE_SLOW.

        // Drive strength levels for GPIO outputs.
        // enum gpio_drive_strength { GPIO_DRIVE_STRENGTH_2MA = 0, GPIO_DRIVE_STRENGTH_4MA = 1, GPIO_DRIVE_STRENGTH_8MA = 2,
        // GPIO_DRIVE_STRENGTH_12MA = 3 }
        // enum gpio_drive_strength gpio_get_drive_strength (uint gpio)
        if (spi_p->set_drive_strength) {
            gpio_set_drive_strength(spi_p->mosi_gpio, spi_p->mosi_gpio_drive_strength);
            gpio_set_drive_strength(spi_p->sck_gpio, spi_p->sck_gpio_drive_strength);
        }

        // SD cards' DO MUST be pulled up.
        gpio_pull_up(spi_p->miso_gpio);

        // Grab some unused dma channels
        spi_p->tx_dma = dma_claim_unused_channel(true);
        spi_p->rx_dma = dma_claim_unused_channel(true);

        spi_p->tx_dma_cfg = dma_channel_get_default_config(spi_p->tx_dma);
        spi_p->rx_dma_cfg = dma_channel_get_default_config(spi_p->rx_dma);
        channel_config_set_transfer_data_size(&spi_p->tx_dma_cfg, DMA_SIZE_8);
        channel_config_set_transfer_data_size(&spi_p->rx_dma_cfg, DMA_SIZE_8);

        // We set the outbound DMA to transfer from a memory buffer to the SPI
        // transmit FIFO paced by the SPI TX FIFO DREQ The default is for the
        // read address to increment every element (in this case 1 byte -
        // DMA_SIZE_8) and for the write address to remain unchanged.
        channel_config_set_dreq(&spi_p->tx_dma_cfg, spi_get_index(spi_p->hw_inst)
                                                       ? DREQ_SPI1_TX
                                                       : DREQ_SPI0_TX);
        channel_config_set_write_increment(&spi_p->tx_dma_cfg, false);

        // We set the inbound DMA to transfer from the SPI receive FIFO to a
        // memory buffer paced by the SPI RX FIFO DREQ We coinfigure the read
        // address to remain unchanged for each element, but the write address
        // to increment (so data is written throughout the buffer)
        channel_config_set_dreq(&spi_p->rx_dma_cfg, spi_get_index(spi_p->hw_inst)
                                                       ? DREQ_SPI1_RX
                                                       : DREQ_SPI0_RX);
        channel_config_set_read_increment(&spi_p->rx_dma_cfg, false);

        /* Theory: we only need an interrupt on rx complete,
        since if rx is complete, tx must also be complete. */

        /* Configure the processor to run dma_handler() when DMA IRQ 0/1 is asserted */

        spi_p->DMA_IRQ_num = irqChannel1 ? DMA_IRQ_1 : DMA_IRQ_0;

        // Tell the DMA to raise IRQ line 0/1 when the channel finishes a block        
        static void (*spi_irq_handler_p)();
        switch (spi_p->DMA_IRQ_num) {
        case DMA_IRQ_0:
            spi_irq_handler_p = spi_irq_handler_0;
            dma_channel_set_irq0_enabled(spi_p->rx_dma, true);
            dma_channel_set_irq0_enabled(spi_p->tx_dma, false);
        break;
        case DMA_IRQ_1:
            spi_irq_handler_p = spi_irq_handler_1;
            dma_channel_set_irq1_enabled(spi_p->rx_dma, true);
            dma_channel_set_irq1_enabled(spi_p->tx_dma, false);
        break;
        default:
            assert(false);
        }
        if (irqShared) {
            irq_add_shared_handler(
                spi_p->DMA_IRQ_num, *spi_irq_handler_p,
                PICO_SHARED_IRQ_HANDLER_DEFAULT_ORDER_PRIORITY);
        } else {
            irq_set_exclusive_handler(spi_p->DMA_IRQ_num, *spi_irq_handler_p);
        }
        irq_set_enabled(spi_p->DMA_IRQ_num, true);
        LED_INIT();
        spi_p->initialized = true;
        spi_unlock(spi_p);
    }
    mutex_exit(&my_spi_init_mutex);
    return true;
}

/* [] END OF FILE */
