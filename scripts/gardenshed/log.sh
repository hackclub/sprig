#!/bin/bash
a=`uname`
if [[ "$a" == "Linux" ]]; then
    pkill screen
	 screen /dev/`ls /dev/ | grep ttyACM | tail -n 1` 115200 
else
    pkill SCREEN
	 screen /dev/`ls /dev/ | grep usb | tail -n 1` 115200
fi
