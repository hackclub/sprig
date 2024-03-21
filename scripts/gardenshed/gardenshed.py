import argparse
import subprocess
import os


def runscript(script):
    firmwaredir = "spade"  
    current_dir = os.path.dirname(os.path.realpath(__file__)) # Grabs path to gardenshed directory
    bash_script_path_gardenshed = os.path.join(current_dir, script) #Grabs path to script 
    os.chdir(os.path.join(current_dir,"..", "..","firmware",firmwaredir)) #changes directory to firmware we are operating on
    subprocess.run(["bash", os.path.join("..","..","scripts", "gardenshed", script)]) #


#argparse arg definitions
parser = argparse.ArgumentParser()
parser.add_argument("command",type=str, help="build, flash, log, restart, gdb-server, gdb-client")


#argparse arg interpreting
args = parser.parse_args()

runscript(args.command+".sh") 



 

