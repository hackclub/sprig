import subprocess
import glob

trimmed_files = glob.glob('temp/*.js')
print("Files to compare:", trimmed_files)

try:
    result = subprocess.run(['compare50', *trimmed_files, 'sprig/games/'], capture_output=True, text=True, timeout=600)
    print(result.stdout)
    if result.stderr:
        print("Error:", result.stderr)
except subprocess.TimeoutExpired:
    print("compare50 took too long to run and was terminated.")