#!/bin/bash
#broken in gardenshed
set -e

echo Building firmware...
./build-with-docker.sh
echo Building firmware done!
echo

echo "Flashing device..."
./reflash.sh
echo "Flashing device done!"
echo

