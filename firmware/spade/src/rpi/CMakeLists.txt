pico_sdk_init()
add_definitions(-DSPADE_EMBEDDED -DSPADE_AUDIO)
set(DCMAKE_BUILD_TYPE Release)
target_compile_definitions(spade PRIVATE
        # compile time configuration of I2S
        PICO_AUDIO_I2S_MONO_INPUT=1
        USE_AUDIO_I2S=1
        PICO_AUDIO_I2S_DATA_PIN=9
        PICO_AUDIO_I2S_CLOCK_PIN_BASE=10
        # PICO_DEFAULT_UART=0
        # PICO_DEFAULT_UART_TX_PIN=28
        # PICO_DEFAULT_UART_RX_PIN=29
)

pico_enable_stdio_usb(${PROJECT_NAME} 1)
pico_enable_stdio_uart(${PROJECT_NAME} 1)

add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../../sprig_hal sprig_hal)

target_link_libraries(spade PRIVATE
        pico_stdlib
        pico_audio_i2s
        pico_multicore
        hardware_spi
        hardware_timer
        hardware_pwm
        hardware_adc
        sprig_hal
)

add_compile_definitions(PICO_HEAP_SIZE=16384)

pico_enable_stdio_usb(spade 1)
pico_enable_stdio_uart(spade 0)

# create map/bin/hex file etc.
pico_add_extra_outputs(spade)

