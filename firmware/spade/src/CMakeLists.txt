
set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wno-void-pointer-to-int-cast -Wno-int-to-void-pointer-cast -Wno-pointer-sign -Werror=implicit-function-declaration")

if (SPADE_TARGET STREQUAL "rpi")
  add_executable(spade "${SPADE_TARGET}/main.c" "${CMAKE_CURRENT_LIST_DIR}/shared/sprig_engine/hw_config.c")
else()
  add_executable(spade "${SPADE_TARGET}/main.c")
endif()

target_link_libraries(spade
  PRIVATE
  "${CMAKE_CURRENT_SOURCE_DIR}/${SPADE_TARGET}/jerry/lib/libjerry-core.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/${SPADE_TARGET}/jerry/lib/libjerry-ext.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/${SPADE_TARGET}/jerry/lib/libjerry-port-default.a"
)
include("${SPADE_TARGET}/CMakeLists.txt")
include_directories(${SPADE_TARGET}/jerry/include)
include_directories(./)

pico_enable_stdio_usb(${PROJECT_NAME} 1)
pico_enable_stdio_uart(${PROJECT_NAME} 1)
