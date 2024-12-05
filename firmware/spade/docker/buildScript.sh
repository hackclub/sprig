#!/usr/bin/env sh

cd ~/sprig/firmware/spade
./src/pc/jerry/refresh.sh

cd ~/sprig/firmware/spade
./src/rpi/jerry/refresh.sh

touch game.js

mkdir -p src/build
mkdir -p src/shared/sprig_engine/build
./tools/cstringify.py ./src/shared/sprig_engine/engine.js > ./src/shared/sprig_engine/build/engine.min.js.cstring

cmake --preset=rpi
cmake --build --preset=rpi

cp rpi_build/src/spade.uf2 ~/firmware.uf2
cp ~/firmware.uf2 firmware.uf2
cp rpi_build/src/spade.elf ~/firmware.elf
cp ~/firmware.elf firmware.elf