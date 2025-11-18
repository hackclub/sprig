# sprighax proposal No.1 : gyro something [insert snappy name here]

### objective

Create a game that can be controlled with rotational movement of the console.

### abstract

### game plan

Build a module that can be connected to the sprig which hosts the gyroscope (I already have a MPU6050 GY521 breakout board) which will be connected through i2c to the sprigs breakout pads or SAO connector.
I will be programming the project in micropython, spade, or raw arduino.

First goal: get gyro to interface with sprig hardware
First goal would be to get something to draw to the screen, and then have whatever is being drawn be effected by the gyroscope. By 2/16/24 have achieved drawing an off-black square on a cool tone tinted off-white background which moves with the gyroscope  
- micropython: probably has a lot of documention, as well as being easiest to write.
~~- [display](https://github.com/boochow/MicroPython-ST7735) (general micropython library for display)~~ did not end up using
- [spryg](https://github.com/dedfishy/spryg/) micropython library for connecting sprig to display (and also maybe audio)

**Second goal**: get gyroscope to interface with a game 
Second goal would be to create some sort of game which takes advantage of the gyroscope module and is playable on the sprig device
-spade: interface directly with a sprig game: communication protocols, gpio control, would necessitate custom firmware. 
  ~~- attempt to interface raw module with spade (necessitates module specific firmware on the sprig)~~
  - attempt to interface through exposed connection (module specific firmware lives on the module instead) 


I need to find a mpu library which is compatible with my breakout board and initialize the i2c connection 
- [for micropython](https://github.com/TimHanewich/MicroPython-Collection/tree/master/MPU6050)

### materials
- sprig
- gyro breakout board
- wire
- second microcontroller (xiao?)
- daughterboard which hosts gyro breakout and second microcontroller
- hopes and dreams
- 
