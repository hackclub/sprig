#!/bin/bash

dependencies=("docker" "echo" "whoami" "grep")

for dep in "${dependencies[@]}"; do
    if ! command -v $dep > /dev/null; then
        printf "%s not found, please install %s\n" "$dep" "$dep"
        exit 1
    fi
done

echo "Dependencies found successfully"

echo "Cleaning up previous build artifacts..."
if [ -d rpi_build ]; then
	rm -rf rpi_build
fi
if [ -f spade.elf ]; then
	rm -f spade.elf
fi
if [ -f spade.uf2 ]; then
	rm -f spade.uf2
fi
if [ -f dockerBuildLog.txt ]; then
	rm -f dockerBuildLog.txt
fi

# Ensure user in docker group if on linux
if id -nG $(whoami) | grep -qw "docker"; then
    echo User in docker group, continuing
else
    if [[ $OSTYPE != *"linux"* ]]; then
        echo "Platform is not linux, skipping docker group check"
    else
        echo User $(whoami) not in the docker group. Please add user $(whoami) to the docker group and try again
        exit 1
    fi
fi


case $1 in
    "--log") docker build ./docker | tee dockerBuildLog.txt
             docker run -it --security-opt label:disable --rm --volume `pwd`:/root/spade $(docker images | awk '{print $3}' | awk 'NR==2') | tee -a dockerBuildLog.txt ;;
    *) docker build ./docker
       docker run -it --security-opt label:disable --rm --volume `pwd`:/root/spade $(docker images | awk '{print $3}' | awk 'NR==2') ;;
esac