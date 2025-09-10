target_link_libraries(spade PRIVATE -fno-omit-frame-pointer -fsanitize=undefined)

if (APPLE)
  add_definitions(-DSPADE_AUDIO)

  find_library(COREAUDIO_LIBRARY NAMES CoreAudio)
  find_library(AUDIOUNIT_LIBRARY NAMES AudioUnit)
  target_link_libraries(spade PRIVATE ${COREAUDIO_LIBRARY} ${AUDIOUNIT_LIBRARY})
else()
  message(WARNING "Spade audio is only supported on macOS, audio will be muted")
endif()

include(FetchContent)
FetchContent_Declare(
  minifb
  GIT_REPOSITORY https://github.com/emoon/minifb
  GIT_TAG        19b1a867762f92ea9f28c0195ef51f60d329aaa7
)
FetchContent_MakeAvailable(minifb)
target_link_libraries(spade PRIVATE minifb)

set(CMAKE_CXX_CLANG_TIDY
  clang-tidy-11;
  -format-style='file';
  -header-filter=${CMAKE_CURRENT_SOURCE_DIR};
)
