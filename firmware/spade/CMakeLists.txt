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
  include(src/rpi/pico_sdk_import.cmake)
  include(src/rpi/pico_extras_import.cmake)
endif()

project(spade C CXX)
add_subdirectory("src/")