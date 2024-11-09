#!/usr/bin/env sh

cd ~/sprig/firmware/c_scaffold

mkdir -p build
cd build

cmake ..
cmake --build .

cd ..

cp build/c_scaffold.uf2 ~/firmware.uf2
cp ~/firmware.uf2 firmware.uf2
cp build/c_scaffold.elf ~/firmware.elf
