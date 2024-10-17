#!/usr/bin/env python3

import argparse
import shutil
import subprocess
import os

deps = ["docker", "openocd"]

# build
build = """
docker build ./docker
docker run --security-opt label:disable --rm --volume "$(pwd)/../../":/root/sprig "$(docker images | awk '{print $3}' | awk 'NR==2')"
"""

# gdb
gdb_server = """
docker build ./docker
docker run -it --security-opt label:disable --network host --rm --volume "$(pwd)/../../":/root/sprig $(docker images | awk '{print $3}' | awk 'NR==2') /bin/sh -c "/opt/buildScript.sh; /usr/bin/gdb-multiarch -ex 'target remote :3333' /root/firmware.elf"
"""

gdb_client = """
sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "set USE_CORE 0" -c "program ./firmware.elf verify reset" 
"""

# log
log = """
a=`uname`
if [[ "$a" == "Linux" ]]; then
    pkill screen
    screen /dev/`ls /dev/ | grep ttyACM | tail -n 1` 115200 
else
    pkill SCREEN
     screen /dev/`ls /dev/ | grep usb | tail -n 1` 115200
fi
"""

# flash
flash = """
sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "program ./firmware.elf verify reset exit"
"""

# restart
restart = """
sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "init;reset;exit"
"""


def run_cmd(cmd):
	current_dir = os.path.dirname(__file__)
	os.chdir(current_dir)
	subprocess.run(["bash", "-c", cmd])


for cmd in deps:
	if shutil.which(cmd) is None:
		raise Exception("Missing dependency: " + cmd)

parser = argparse.ArgumentParser()
parser.add_argument("command", type=str, help="build, flash, log, restart, gdb-server, gdb-client")

command = parser.parse_args().command

commands = {
	"build": build,
	"flash": flash,
	"log": log,
	"restart": restart,
	"gdb-server": gdb_server,
	"gdb-client": gdb_client,
}

run_cmd(commands[command])
