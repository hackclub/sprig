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
   - chcon (Linux only)

#### Building
 - Clone the repository
 - Change into the spade directory and change code as desired
 - Run `build-with-docker.sh`
   
this will produce the ``./spade.uf2`` file which you can flash to your sprig. 

### Manual
Prerequisites:

- A working Python 3 environment.
- The ability to run Bash scripts.
- A C build environment, preferably Clang. On Windows, GCC won't work and you must use Clang. Make sure CMake and Make are both working.
- Entr and uglifyjs installed to use jsdev.sh.
- libbsd if compiling for PC

Set up your build environment. All folders need to be in your home directory (for now), although they can be symlinked if you prefer.

Clone Spade (recursive is needed for the dependency on `no-OS-FatFS-SD-SPI-RPi-Pico`, the library used for SD cards):

```sh
cd ~
git clone --recursive https://github.com/hackclub/spade.git
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
git clone https://github.com/raspberrypi/pico-sdk.git
git clone https://github.com/raspberrypi/pico-extras.git
cd pico-sdk
# Jank fix due to a couple bugs in pico sdk with spade
git checkout 7070d230c0cdf1add83fa86b6832b47b2da47788
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

#### Debugging on the Pico with a probe
On device debugging is hard, but it's less hard with a [Raspberry Pi Debug Probe](https://www.raspberrypi.com/products/debug-probe/)! Without a debug probe, the most debugging you can do is logging to stdout and viewing it on a serial monitor such as `picocom` (if you'd like to do that, `picocom -b 115200 /dev/ttyACM0` is the command that's worked for me on Linux. Exit with Ctrl+A Ctrl+Q). However, with a debug probe, you can harness the full power of [gdb](https://sourceware.org/gdb/) to debug spade. Setup is a bit complicated though, so here's some instructions:

1. Get a debug probe! You can see where to buy them at the [official product page](https://www.raspberrypi.com/products/debug-probe/)
2. Connect your Sprig to the probe. Detailed instructions can be found at the [Raspberry Pi docs](https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html), but in short you'll need to connect the 3-wire JST connector to the debug port on your Pico, and connect the other 3-wire connector to TX, RX, and GND on your Pico. These three terminals are broken out on the back of the Sprig (GP0, GP1, and GND respectively), but the design makes it hard to connect without soldering wires directly onto it. A different way to do it is to lift your Pico slightly out of it's terminal, and either wrap wires around the headers, or stick breadboard jumper cables right next to the header you need to connect. You can then connect the other end of the wire directly to the probe, or connect them to a breadboard and then connect the included cables with the debug probe to the breadboard as well. Once you have the Pico connected to the debug probe, connect both the debug probe and the Pico to your computer with USB cables, and that's it! Ask in the Slack if you have any questions.
3. Continue with the instructions on the Raspberry Pi docs by installing tools. You'll need OpenOCD and GDB.

That's it for setup! You can now use OpenOCD to either flash new firmware to your Sprig or use it in server mode to use GDB.
To just flash new firmware to your Sprig, first build spade, and then `cd` to `rpi_build/src` and run the following command (these commands are for Linux, but shouldn't differ too much for MacOS or Windows):
```sh
sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "program spade.elf verify reset exit"
```
Note that the ELF file is used here, not the UF2.

Using GDB is much more powerful, though. First, build spade as Debug to make sure you get all the debug symbols:
```sh
cmake -DCMAKE_BUILD_TYPE=Debug --preset=rpi
cmake --build --DCMAKE_BUILD_TYPE=Debug --preset=rpi
```
Next, use one terminal window to run OpenOCD in server mode:
```sh
sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000"
```
Then, use a different terminal in the `rpi_build/src` directory to launch GDB:
```sh
gdb spade.elf
```
This will launch GDB, and prompt you with some introductory docs - press `c` and then enter to enter the GDB console.
Then, run the following commands in GDB to get started:
```sh
target extended-remote :3333 # This attaches GDB to your running OpenOCD server - it should be the first command of each GDB session
load # This flashes your latest build of spade to the Sprig - only run it when you have a new build
monitor reset init # Resets the Sprig
continue # Starts the program
```
With GDB now running, you can now do all of the things that GDB supports, such as setting breakpoints, inspecting stack traces, and analyzing memory!
You can exit GDB with Ctrl+D, and stop the OpenOCD server with Ctrl+C. If you have any questions, ask in the Slack!

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

Spade uses CMake to build its binaries across platforms. It works best on MacOS and Linux, although Windows builds can work.

Shared code, including rendering, JavaScript execution, and Sprig engine code is available in `src/shared/`. The platform-specific harness code for the PC and Pico editions are in `src/pc/` and `src/rpi/`, respectively.

Files in these folders are mixed header and C files. The header files (should) provide definitions for functions and globals, while the C files actually define the functions. All of the required C files are included in `src/pc/main.c` and `src/rpi/main.c` so that all the required function definitions are built, and then all other code can reference them with headers ([jumbo builds](https://en.wikipedia.org/wiki/Unity_build)).

The shared code is generally split into four parts with associated folders:

- Audio: code for parsing tune text and synthesizing sound.
- JS Runtime: our wrapper around JerryScript, including event handling.
- Sprig Engine: the native implementation of the Sprig engine functions.
- UI: some shared helpers, like Sprig's 8-bit font and errorbuf (a shared global buffer for rendering error information and diagnostic text).

The code in this repo can be uncommented or chaotic in some locations. Make a GitHub Issue or ask on the [Hack Club Slack](https://hackclub.com/slack/) if you have any questions about anything!
