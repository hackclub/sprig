#!/bin/bash

pngcrush

if [ $? -ne 0 ]; then
	echo "no pngcrush, install with your package manager"
	exit 1
fi

pngcrush -q -rem alla -brute $1 $(basename $2 .h).png
xxd -i $(basename $2 .h).png > $2