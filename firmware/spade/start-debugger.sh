#!/bin/bash

/opt/homebrew/bin/arm-none-eabi-gdb -ex 'target remote :3333' ./spade.elf 
