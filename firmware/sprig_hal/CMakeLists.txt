cmake_minimum_required(VERSION 3.27)
project(sprig_hal C CXX ASM)

set(CMAKE_C_STANDARD 11)

if (NOT PICO_SDK_PATH)
    set(PICO_SDK_PATH "~/raspberrypi/pico-sdk")
endif ()

if (NOT PICO_EXTRAS_PATH)
    set(PICO_EXTRAS_PATH "~/raspberrypi/pico-extras")
endif ()

include(pico_sdk_import.cmake)
include(pico_extras_import.cmake)

pico_sdk_init()
add_definitions(-DPICO_NO_BI_PROGRAM_BUILD_DATE) # don't add build date into the build

add_library(sprig_hal STATIC src/HAL.c)

# expose stuff in /include but don't expose stuff in /src
target_include_directories(sprig_hal PUBLIC ${PROJECT_SOURCE_DIR}/include)
target_include_directories(sprig_hal PRIVATE ${PROJECT_SOURCE_DIR}/src)

target_compile_definitions(sprig_hal PUBLIC
        # compile time configuration of I2S
        PICO_AUDIO_I2S_MONO_INPUT=1

        PICO_AUDIO_I2S_DATA_PIN=9
        PICO_AUDIO_I2S_CLOCK_PIN_BASE=10
)

target_link_libraries(sprig_hal PUBLIC
        pico_stdlib
        pico_audio_i2s
        pico_multicore
        hardware_spi
        hardware_timer
        hardware_pwm
        hardware_adc
)

pico_enable_stdio_usb(sprig_hal 1)
pico_enable_stdio_uart(sprig_hal 0)
