import sys
import subprocess
import os
import glob
import shutil
import time

def log(message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def run_compare50(directory, output_dir, saved_dir_base):
    try:
        if not os.path.exists(saved_dir_base):
            os.makedirs(saved_dir_base)
            log("Created base directory for saved files.")

        all_js_files = glob.glob(os.path.join(directory, "*.js"))
        total_files = len(all_js_files)
        current_file_number = 0

        log(f"Total files to compare: {total_files}")

        for file in all_js_files:
            current_file_number += 1
            log(f"Processing file {current_file_number} of {total_files}: {file}")

            for compare_file in all_js_files:
                if os.path.abspath(file) == os.path.abspath(compare_file):
                    log(f"Skipping comparison for the same file: {compare_file}")
                    continue

                log(f"Comparing {file} with {compare_file}")
                if os.path.exists(output_dir):
                    shutil.rmtree(output_dir)
                    log(f"Cleaned existing output directory: {output_dir}")

                command = [
                    "compare50",
                    file,
                    compare_file,
                    "--output", output_dir,
                    "--max-file-size", str(1024 * 1024 * 100),
                    "--passes", "text"
                ]

                log(f"Running command: {' '.join(command)}")
                subprocess.run(command, check=True)
                log("Compare50 command executed successfully.")

                match_file = os.path.join(output_dir, "match_1.html")

                if os.path.exists(match_file):
                    new_filename = f"{os.path.basename(file).replace('.js', '')}_vs_{os.path.basename(compare_file).replace('.js', '')}.html"
                    saved_file_path = os.path.join(saved_dir_base, new_filename)
                    log(f"Match found. Moving {match_file} to {saved_file_path}")
                    shutil.move(match_file, saved_file_path)
                else:
                    log(f"No match found for file: {file} compared with {compare_file}")

    except subprocess.CalledProcessError as e:
        log(f"Error in running Compare50: {e}")
    except Exception as e:
        log(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 5:
        log("Incorrect number of arguments provided.")
        print("Usage: python plagiarism_check.py <games_directory> <batch_directory> <output_dir> <saved_dir_base>")
        sys.exit(1)

    games_directory = sys.argv[1]
    batch_directory = sys.argv[2]
    output_dir = sys.argv[3]
    saved_dir_base = sys.argv[4]

    log(f"Starting plagiarism check with the following arguments:")
    log(f"Games directory: {games_directory}")
    log(f"Batch directory: {batch_directory}")
    log(f"Output directory: {output_dir}")
    log(f"Saved directory base: {saved_dir_base}")

    run_compare50(batch_directory, output_dir, saved_dir_base)
    log("Plagiarism check completed.")

if __name__ == "__main__":
    main()