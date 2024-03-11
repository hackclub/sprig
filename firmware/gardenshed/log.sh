#!/bin/bash

pkill SCREEN
screen /dev/`ls /dev/ | grep usb | tail -n 1` 115200
