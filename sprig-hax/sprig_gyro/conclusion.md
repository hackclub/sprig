# final deliverable
the final deliverable of this project is a working micropython-based [spryg](https://github.com/dedfishy/spryg/) game which connects an extern MPU6050 module to the sprig through the exposed pads. This result can be trivially replicated by following the installation instructions in the spryg repository, and subsequently loading the game.py file included here. the MPU6050 board is attached through i2c, taking advantage of pins GP0 & GP1 for SDA and SCL respectively. 

A productionizable feature to pull from this work may be to implement UART or I2C directly into spade. this could allow modifications like this hack to be integrated directly into sprig games, and be even easier to replicate / develop for. 

