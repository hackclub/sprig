#!/bin/bash

dependencies=("docker" "echo" "whoami" "grep")

for dep in "${dependencies[@]}"; do
    if ! command -v $dep > /dev/null; then
        printf "%s not found, please install %s\n" "$dep" "$dep"
        exit 1
    fi
done

echo "Dependencies found successfully"

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

IP=$(docker network inspect bridge -f '{{range .IPAM.Config}}{{.Gateway}}{{end}}')

case $1 in
    "--log") docker build ./docker | tee dockerBuildLog.txt
             docker run -it --security-opt label:disable --rm --volume `pwd`:/root/spade $(docker images | awk '{print $3}' | awk 'NR==2') /usr/bin/gdb-multiarch -ex "target remote $IP:3333" /root/spade/spade.elf | tee -a dockerBuildLog.txt ;;
    *) docker build ./docker
       docker run -it --security-opt label:disable --rm --volume `pwd`:/root/spade $(docker images | awk '{print $3}' | awk 'NR==2') /usr/bin/gdb-multiarch -ex "target remote $IP:3333" /root/spade/spade.elf ;;
esac
