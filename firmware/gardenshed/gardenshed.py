import argparse
import subprocess
import os


def runscript(script):
    firmware = "spade"  
    current_dir = os.path.dirname(os.path.realpath(__file__)) # Grabs path to gardenshed directory
    bash_script_path_gardenshed = os.path.join(current_dir, script) #Grabs path to script 
    os.chdir(os.path.join(current_dir, "..", firmware)) #changes directory to firmware we are operating on
    subprocess.run(["bash", os.path.join("..", "gardenshed", script)]) #


#argparse arg definitions
parser = argparse.ArgumentParser()
parser.add_argument("command",type=str, help="build, log, restart, enable-gdb, start-debugger")
parser.add_argument("-f","--flash", help="flash device before/after completing action",action="store_true")


#argparse arg interpreting
args = parser.parse_args()
override = False

match args:

    case "build":
        override = True    

    case "log":
        pass

    case "restart":
        pass

    case "enable-gdb": 
        args.flash = False

    case "start-debugger":  
        pass

<<<<<<< HEAD
    case _:
        print("Unknown command!!")

=======
>>>>>>> Sheepy3-shellscriptchanges
if args.flash:

    if not override:
        runscript("reflash.sh")
    
    runscript(args.command+".sh")

    if override:
        runscript("reflash.sh")                
else:
    runscript(args.command+".sh")
    



 

