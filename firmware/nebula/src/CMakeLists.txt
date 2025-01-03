set(CMAKE_BUILD_TYPE Release)
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wno-void-pointer-to-int-cast -Wno-int-to-void-pointer-cast -Wno-pointer-sign -Werror=implicit-function-declaration")

add_executable(nebula "${NEBULA_TARGET}/main.c")
include("${NEBULA_TARGET}/CMakeLists.txt")

include_directories(./)

pico_enable_stdio_usb(${PROJECT_NAME} 1)
pico_enable_stdio_uart(${PROJECT_NAME} 1)

file(READ version.json VERSION_JSON)

string(JSON VERSION GET ${VERSION_JSON} version)

message("version: ${VERSION}")

configure_file(
        "${CMAKE_CURRENT_SOURCE_DIR}/shared/version.h.in"
        "${CMAKE_CURRENT_SOURCE_DIR}/shared/version.h"
)