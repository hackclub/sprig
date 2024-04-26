#!/bin/bash

sudo openocd -c "set USE_CORE 0" -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "program ./spade.elf verify reset" 
