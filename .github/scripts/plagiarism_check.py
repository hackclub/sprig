import sys
import subprocess
import os
import time

def log(message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def run_moss(single_file, directory, output_dir, saved_dir_base):
    try:
        if not os.path.exists(saved_dir_base):
            os.makedirs(saved_dir_base)
            log("Created base directory for saved files.")
        
        all_js_files = [single_file] + [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.js') and f != os.path.basename(single_file)]
        total_files = len(all_js_files)
        
        moss_command = ['./moss.pl', '-l', 'javascript'] + all_js_files
        
        log(f"Running MOSS command: {' '.join(moss_command)}")
        
        result = subprocess.run(moss_command, capture_output=True, text=True)
        
        if result.returncode != 0:
            log(f"Error in running MOSS: {result.stderr}")
            sys.exit(1)
        
        log(f"MOSS output:\n{result.stdout}")
        
        with open(os.path.join(saved_dir_base, 'moss_result.html'), 'w') as file:
            file.write(result.stdout)
        
        log(f"Saved MOSS result to {os.path.join(saved_dir_base, 'moss_result.html')}")

    except Exception as e:
        log(f"An error occurred: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) != 5:
        log("Incorrect number of arguments provided.")
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir> <saved_dir_base>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_dir = sys.argv[3]
    saved_dir_base = sys.argv[4]

    log(f"Starting plagiarism check with the following arguments:")
    log(f"Single file: {single_file}")
    log(f"Directory: {directory}")
    log(f"Output directory: {output_dir}")
    log(f"Saved directory base: {saved_dir_base}")

    run_moss(single_file, directory, output_dir, saved_dir_base)
    log("Plagiarism check completed.")

if __name__ == "__main__":
    main()