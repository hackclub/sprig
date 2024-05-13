cd ~/jerryscript_build
rm -rf example-*

# CMAKE_ASM_COMPILER=arm-none-eabi-gcc
# CMAKE_C_COMPILER=arm-none-eabi-gcc
# CMAKE_CXX_COMPILER=arm-none-eabi-g++
# CMAKE_LINKER=arm-none-eabi-ld
# CMAKE_OBJCOPY=arm-none-eabi-objcopy

  # --debug \
python3 jerryscript/tools/build.py \
  --toolchain=cmake/toolchain-pico.cmake \
  --builddir=$(pwd)/example_build \
  --cmake-param="-DCMAKE_INSTALL_PREFIX=$(pwd)/example_install/" \
  --mem-heap=190 \
  --clean \
  --lto=OFF \
  --error-messages=ON \
  --mem-stats=ON \
  --line-info=ON \
  --jerry-cmdline=OFF
make -C $(pwd)/example_build install\

cd ~/spade/src/rpi/jerry
cp ~/jerryscript_build/example_build/lib/* lib/
# cp ~/jerryscript_build/example_install/include
rm -rf include
# cp ~/jerryscript_build/example_install/include ./
cp -r ~/jerryscript_build/example_install/include ./
