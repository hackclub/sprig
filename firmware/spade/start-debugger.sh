#!/bin/bash
a=`uname`
if [[ "$a" == "Linux" ]]; then
	 /usr/bin/gdb-multiarch -ex 'target remote :3333' ./spade.elf 
else
	 /opt/homebrew/bin/arm-none-eabi-gdb -ex 'target remote :3333' ./spade.elf 
fi



