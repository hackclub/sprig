import subprocess
import glob

trimmed_files = glob.glob('temp/*.js')
result = subprocess.run(['compare50', *trimmed_files, 'sprig/games/'], capture_output=True, text=True)

print(result.stdout)