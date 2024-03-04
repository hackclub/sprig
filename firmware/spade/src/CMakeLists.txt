set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wno-void-pointer-to-int-cast -Wno-int-to-void-pointer-cast -Wno-pointer-sign -Werror=implicit-function-declaration")

add_executable(spade "${SPADE_TARGET}/main.c")
include("${SPADE_TARGET}/CMakeLists.txt")

target_link_libraries(spade
  PRIVATE
  "${CMAKE_CURRENT_SOURCE_DIR}/${SPADE_TARGET}/jerry/lib/libjerry-core.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/${SPADE_TARGET}/jerry/lib/libjerry-ext.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/${SPADE_TARGET}/jerry/lib/libjerry-port-default.a"
)
include_directories(${SPADE_TARGET}/jerry/include)
include_directories(./)
