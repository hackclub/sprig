cd ~/spade
./src/pc/jerry/refresh.sh

touch game.js

mkdir -p src/build
./tools/cstringify.py ./src/shared/sprig_engine/engine.js > ./src/shared/sprig_engine/build/engine.min.js.cstring

cmake --preset=rpi
cmake --build --preset=rpi

cp rpi_build/src/spade.uf2 ~/spade
cp rpi_build/src/spade.elf ~/spade
