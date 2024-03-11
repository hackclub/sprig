import argparse
import subprocess
import os

def runscript(script):
    firmware = "spade"  
    current_dir = os.path.dirname(os.path.realpath(__file__)) # Grabs path to gardenshed directory
    bash_script_path_gardenshed = os.path.join(current_dir, script)
    os.chdir(os.path.join(current_dir, "..", firmware))
    subprocess.run(["bash", os.path.join("..", "gardenshed", script)])

parser = argparse.ArgumentParser()
parser.add_argument("command",type=str, help="log, enable-gdb,")
parser.add_argument("-f","--flash", help="flash device after completing action",action="store_true")

args = parser.parse_args()

#print(args.echo)

runscript(args.command+".sh")

if args.flash:
    runscript("reflash.sh")




 

