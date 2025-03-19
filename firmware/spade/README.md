# Spade - an implementation of Sprig engine

This repo is a C implementation of the Sprig engine you can find in the "engine" folder of the repo [hackclub/sprig](https://github.com/hackclub/sprig).

We reimplemented the engine in C to run on the Raspberry Pi Pico powering the Sprig hardware.

However, on-device debugging is hard, so the engine can also be compiled to run on your computer and render to a minifb window.

## Building

### Using Docker

#### Prerequisites:
 - Working Linux/MacOS system with Docker environment
 - Dependencies commands:
   - docker

#### Building
 - Clone the repository
 - Change into the spade directory and change code as desired
 - Run `python3 gardenshed.py build`
   
this will produce the ``./firmware.uf2`` file which you can flash to your sprig. 

### Manual
Prerequisites:

- A working Python 3 environment.
- The ability to run Bash scripts.
- A C build environment, preferably Clang. On Windows, GCC won't work and you must use Clang. Make sure CMake and Make are both working.
- Entr and uglifyjs installed to use jsdev.sh.

Set up your build environment. All folders need to be in your home directory (for now), although they can be symlinked if you prefer.

Clone Spade:

```sh
cd ~
git clone https://github.com/hackclub/spade.git
cd spade
```

Install JerryScript:

```sh
mkdir ~/jerryscript_build
cd ~/jerryscript_build
git clone https://github.com/jerryscript-project/jerryscript.git
cd jerryscript
git checkout 8ba0d1b6ee5a065a42f3b306771ad8e3c0d819bc # version 2.4.0

cd ~/spade
./src/pc/jerry/refresh.sh
```

Download the Pico SDK:

```sh
mkdir ~/raspberrypi
cd ~/raspberrypi
git clone -b 1.3.1 https://github.com/raspberrypi/pico-sdk.git
git clone https://github.com/raspberrypi/pico-extras.git
cd pico-sdk
git submodule update --init
cd ../pico-extras
git submodule update --init
```

### Engine CStrings

For compiling on both PC and Pico you'll need to convert engine.js to a .cstring file (a custom format that lets us easily embed strings in our code). Make sure to create a game.js file as well (`touch game.js`), even though it is only used for the desktop build.

Run `./tools/jsdev.sh` to minify and update the engine. Keep it running to auto-update.

### Pico Build

```sh
cmake --preset=rpi
# then...
cmake --build --preset=rpi
```

A UF2 file will be outputted to `rpi_build/src/spade.uf2`. On macOS, with a Pico plugged in and in BOOTSEL mode, you can transfer from the CLI with `cp ./rpi_build/src/spade.uf2 /Volumes/RPI-RP2`.

### PC Build

```sh
cmake --preset=pc
# then...
cmake --build --preset=pc
./pc_build/src/spade ./game.min.js
```

The audio emulator is written for CoreAudio and audio will be muted on non-macOS systems.

If you get an error about a missing Pico SDK, run the following and try again:

```sh
export PICO_SDK_PATH=~/raspberrypi/pico-sdk
export PICO_EXTRAS_PATH=~/raspberrypi/pico-extras
```

## Project Structure

Spade uses CMake to build its binaries across platforms, although it's only tested to work on macOS.

Shared code, including rendering, JavaScript execution, and Sprig engine code is available in `src/shared/`. The platform-specific harness code for the PC and Pico editions are in `src/pc/` and `src/rpi/`, respectively.

Files in these folders are mixed header and C files. The header files (should) provide definitions for functions and globals, while the C files actually define the functions. All of the required C files are included in `src/pc/main.c` and `src/rpi/main.c` so that all the required function definitions are built, and then all other code can reference them with headers ([jumbo builds](https://en.wikipedia.org/wiki/Unity_build)).

The shared code is generally split into four parts with associated folders:

- Audio: code for parsing tune text and synthesizing sound.
- JS Runtime: our wrapper around JerryScript, including event handling.
- Sprig Engine: the native implementation of the Sprig engine functions.
- UI: some shared helpers, like Sprig's 8-bit font and errorbuf (a shared global buffer for rendering error information and diagnostic text).

The code in this repo can be uncommented or chaotic in some locations. Make a GitHub Issue or ask on the [Hack Club Slack](https://hackclub.com/slack/) if you have any questions about anything!
