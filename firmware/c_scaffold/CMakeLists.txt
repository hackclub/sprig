cmake_minimum_required(VERSION 3.24)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)

if (NOT PICO_SDK_PATH)
    set(PICO_SDK_PATH "~/raspberrypi/pico-sdk")
endif ()

if (NOT PICO_EXTRAS_PATH)
    set(PICO_EXTRAS_PATH "~/raspberrypi/pico-extras")
endif ()

include(cmake/pico_sdk_import.cmake)
include(cmake/pico_extras_import.cmake)

project(c_scaffold C CXX)

set(CMAKE_BUILD_TYPE Release)
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wno-void-pointer-to-int-cast -Wno-int-to-void-pointer-cast -Wno-pointer-sign -Werror=implicit-function-declaration")

add_executable(${PROJECT_NAME} "src/main.c")

target_include_directories(${PROJECT_NAME} PRIVATE "src/")

pico_sdk_init()
add_definitions(
        -DSAMPLES_PER_BUFFER=\(256*6\)
        -DBUFFER_COUNT=3
)

pico_enable_stdio_usb(${PROJECT_NAME} 1)
pico_enable_stdio_uart(${PROJECT_NAME} 1)

add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../sprig_hal sprig_hal)

target_link_libraries(${PROJECT_NAME} PRIVATE
        pico_stdlib
        pico_multicore
        hardware_spi
        hardware_timer
        hardware_pwm
        hardware_adc
        sprig_hal
)

# create map/bin/hex file etc.
pico_add_extra_outputs(${PROJECT_NAME})

