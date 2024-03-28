add_library(FatFs_SPI INTERFACE)
target_sources(FatFs_SPI INTERFACE
        ff15/source/ffsystem.c
        ff15/source/ffunicode.c
        ff15/source/ff.c
        sd_driver/sd_spi.c
        sd_driver/demo_logging.c
#    ${CMAKE_CURRENT_LIST_DIR}/sd_driver/hw_config.c
        sd_driver/spi.c
        sd_driver/sd_card.c
        sd_driver/crc.c
        src/glue.c
        src/f_util.c
        src/ff_stdio.c
        src/my_debug.c
        src/rtc.c
)
target_include_directories(FatFs_SPI INTERFACE
        ff15/source
        sd_driver
        include
)
target_link_libraries(FatFs_SPI INTERFACE
        hardware_spi
        hardware_dma
        hardware_rtc
        pico_stdlib
)
