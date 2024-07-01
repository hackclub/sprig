import sys
import subprocess
import os
import glob
import shutil
import time
from multiprocessing import Pool

def log(message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def run_compare50(file_tuple):
    single_file, file, base_output_dir, saved_dir_base = file_tuple
    try:
        if os.path.abspath(file) == os.path.abspath(single_file):
            log(f"Skipping comparison for the same file: {file}")
            return

        log(f"Processing file: {file}")
        output_dir = os.path.join(base_output_dir, os.path.basename(file).replace('.js', ''))
        if os.path.exists(output_dir):
            shutil.rmtree(output_dir)
            log(f"Cleaned existing output directory: {output_dir}")

        os.makedirs(output_dir, exist_ok=True)
        command = [
            "compare50",
            f'"{single_file}"',
            f'"{file}"',
            "--output", f'"{output_dir}"',
            "--max-file-size", str(1024 * 1024 * 100),
            "--passes", "text"
        ]

        command_str = ' '.join(command)
        log(f"Running command: {command_str}")
        subprocess.run(command_str, shell=True, check=True)
        log("Compare50 command executed successfully.")

        match_file = os.path.join(output_dir, "match_1.html")

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

def main():
    if len(sys.argv) != 5:
        log("Incorrect number of arguments provided.")
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir> <saved_dir_base>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    base_output_dir = sys.argv[3]
    saved_dir_base = sys.argv[4]

    log(f"Starting plagiarism check with the following arguments:")
    log(f"Single file: {single_file}")
    log(f"Directory: {directory}")
    log(f"Output directory: {base_output_dir}")
    log(f"Saved directory base: {saved_dir_base}")

    if not os.path.exists(saved_dir_base):
        os.makedirs(saved_dir_base)
        log("Created base directory for saved files.")

    all_js_files = glob.glob(os.path.join(directory, "*.js"))

    file_tuples = [(single_file, file, base_output_dir, saved_dir_base) for file in all_js_files]

    log(f"Total files to process: {len(all_js_files)}")
    with Pool(processes=os.cpu_count()) as pool:
        pool.map(run_compare50, file_tuples)

    log("Plagiarism check completed.")
    log(f"Listing files in saved directory ({saved_dir_base}):")
    for f in os.listdir(saved_dir_base):
        log(f)

if __name__ == "__main__":
    main()