set -e

cd ~/jerryscript_build
rm -rf example-*

python3 jerryscript/tools/build.py \
  --builddir=$(pwd)/example_build \
  --cmake-param="-DCMAKE_INSTALL_PREFIX=$(pwd)/example_install/" \
  --cmake-param="-G Unix Makefiles" \
  --mem-heap=350 \
  --debug \
  --clean \
  --error-messages=ON \
  --mem-stats=ON \
  --line-info=ON \
  --jerry-cmdline=OFF
make -C $(pwd)/example_build install\

cd ~/sprig/firmware/spade/src/pc/jerry
cp -r ~/jerryscript_build/example_build/lib ./
rm -rf include
cp -r ~/jerryscript_build/example_install/include ./
