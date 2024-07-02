import os
import shutil
import subprocess
import uuid
from datetime import datetime
import multiprocessing

def log(message):
    """Log message with a timestamp."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def run_compare50(args):
    """Run the compare50 command on a single file against another."""
    single_file, file, output_dir_base, saved_dir_base = args
    unique_output_dir = os.path.join(output_dir_base, uuid.uuid4().hex)

    if os.path.exists(unique_output_dir):
        shutil.rmtree(unique_output_dir)
    os.makedirs(unique_output_dir, exist_ok=True)

    command = [
        "compare50",
        single_file,
        file,
        "--output", unique_output_dir,
        "--max-file-size", str(1024 * 1024 * 100),
        "--passes", "text"
    ]

    log(f"Running command: {' '.join(command)}")
    try:
        result = subprocess.run(command, check=True, text=True, capture_output=True)
        log("Compare50 command executed successfully.")
    except subprocess.CalledProcessError as e:
        log(f"Error in running Compare50: {e.stderr}")
    except Exception as e:
        log(f"An unexpected error occurred: {e}")
    finally:
        shutil.rmtree(unique_output_dir)

def main(single_file, directory, output_dir_base, saved_dir_base):
    """Main function to process all JavaScript files in a directory using multiprocessing."""
    log("Starting plagiarism check...")
    all_js_files = [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.js')]
    
    tasks = [(single_file, file, output_dir_base, saved_dir_base) for file in all_js_files if file != single_file]

    with multiprocessing.Pool(processes=multiprocessing.cpu_count()) as pool:
        pool.map(run_compare50, tasks)

    log("Plagiarism check completed.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 5:
        log("Incorrect number of arguments provided.")
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir_base> <saved_dir_base>")
        sys.exit(1)

    main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])