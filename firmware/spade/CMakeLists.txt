cmake_minimum_required(VERSION 3.24)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)

if (NOT SPADE_TARGET)
  set(SPADE_TARGET pc)
endif()

# would be nice if this could be in rp2/CMakeLists.txt, but
# has to be before project() because it makes rpi asm
# compilation work, and project() has to be top level
if (SPADE_TARGET STREQUAL "rpi")
  # Slow QSPI flash clock: divider 4 instead of 2 (67.5 MHz at 270 MHz sysclk
  # instead of 135 MHz). Clone Pico flash chips are rated 104-133 MHz and fail
  # marginally at div 2 under overclock. Must be set before pico_sdk_init so
  # the boot_stage2 build sees it.
  add_compile_definitions(PICO_FLASH_SPI_CLKDIV=4)
  include(src/rpi/pico_sdk_import.cmake)
  include(src/rpi/pico_extras_import.cmake)
endif()

project(spade C CXX)
add_subdirectory("src/")