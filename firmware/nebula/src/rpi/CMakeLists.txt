pico_sdk_init()
add_definitions(-DNEBULA_EMBEDDED -DNEBULA_AUDIO -DPICO_NO_BI_PROGRAM_BUILD_DATE)
set(DCMAKE_BUILD_TYPE Release)
target_compile_definitions(nebula PRIVATE
  # compile time configuration of I2S
  PICO_AUDIO_I2S_MONO_INPUT=1
  USE_AUDIO_I2S=1
  PICO_AUDIO_I2S_DATA_PIN=9
  PICO_AUDIO_I2S_CLOCK_PIN_BASE=10
  # PICO_DEFAULT_UART=0
  # PICO_DEFAULT_UART_TX_PIN=28
  # PICO_DEFAULT_UART_RX_PIN=29
)

target_link_libraries(nebula PRIVATE
  pico_stdlib
  pico_audio_i2s
  pico_multicore
  hardware_spi
  hardware_timer
  hardware_pwm
  hardware_adc
)

pico_enable_stdio_usb(nebula 1)
pico_enable_stdio_uart(nebula 0)

# create map/bin/hex file etc.
pico_add_extra_outputs(nebula)