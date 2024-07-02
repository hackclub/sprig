import sys
import subprocess
import os
import glob
import shutil
import time
import multiprocessing
import uuid

def log(message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def run_compare50(args):
    single_file, file, output_dir_base, saved_dir_base = args
    unique_output_dir = os.path.join(output_dir_base, uuid.uuid4().hex)
    
    if os.path.abspath(file) == os.path.abspath(single_file):
        log(f"Skipping comparison for the same file: {file}")
        return

    log(f"Processing file: {file}")
    if not os.path.exists(unique_output_dir):
        os.makedirs(unique_output_dir, exist_ok=True)
    command = [
        "compare50",
        f'"{single_file}"',
        f'"{file}"',
        "--output", f'"{unique_output_dir}"',
        "--max-file-size", str(1024 * 1024 * 100),
        "--passes", "text"
    ]

    command_str = ' '.join(command)
    log(f"Running command: {command_str}")
    try:
        subprocess.run(command_str, shell=True, check=True)
        log("Compare50 command executed successfully.")
        match_file = os.path.join(unique_output_dir, "match_1.html")
        if os.path.exists(match_file):
            new_filename = os.path.basename(file).replace('.js', '.html')
            saved_file_path = os.path.join(saved_dir_base, new_filename)
            log(f"Match found. Moving {match_file} to {saved_file_path}")
            shutil.move(match_file, saved_file_path)
        else:
            log(f"No match found for file: {file}")
    except subprocess.CalledProcessError as e:
        log(f"Error in running Compare50: {e}")
    except Exception as e:
        log(f"An error occurred: {e}")
    finally:
        shutil.rmtree(unique_output_dir)

def main():
    if len(sys.argv) != 5:
        log("Incorrect number of arguments provided.")
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir_base> <saved_dir_base>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_dir_base = sys.argv[3]
    saved_dir_base = sys.argv[4]

    log(f"Starting plagiarism check with the following arguments:")
    log(f"Single file: {single_file}")
    log(f"Directory: {directory}")
    log(f"Output directory base: {output_dir_base}")
    log(f"Saved directory base: {saved_dir_base}") 
    all_js_files = glob.glob(os.path.join(directory, "*.js"))
    for f in all_js_files:
        log(f)

    with multiprocessing.Pool(processes=multiprocessing.cpu_count()) as pool:
        tasks = [(single_file, file, output_dir_base, saved_dir_base) for file in all_js_files]
        pool.map(run_compare50, tasks)

    log("Plagiarism check completed.")

if __name__ == "__main__":
    main()