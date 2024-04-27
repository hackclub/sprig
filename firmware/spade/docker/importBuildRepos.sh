mkdir ~/jerryscript_build
cd ~/jerryscript_build
git clone https://github.com/hackclub/jerryscript-pico.git jerryscript
cd jerryscript

mkdir ~/raspberrypi
cd ~/raspberrypi
git clone -b 1.3.1 https://github.com/raspberrypi/pico-sdk.git
git clone https://github.com/raspberrypi/pico-extras.git
cd pico-sdk
git checkout 7070d230c0cdf1add83fa86b6832b47b2da47788
git submodule update --init
cd ../pico-extras
git submodule update --init
