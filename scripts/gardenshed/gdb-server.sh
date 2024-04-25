#!/bin/bash

sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "bindto 0.0.0.0" -c "program ./spade.elf verify reset"
