cd ~/spade
touch game.js

timeout 10s ./tools/jsdev.sh
cmake --preset=rpi
cmake --build --preset=rpi

cp rpi_build/src/spade.uf2 ~/spade
cp rpi_build/src/spade.elf ~/spade
