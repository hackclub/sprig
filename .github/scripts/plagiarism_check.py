import sys
import subprocess
import os
import glob
import shutil

def run_compare50(single_file, directory, output_dir, saved_dir_base):
    try:
        if not os.path.exists(saved_dir_base):
            os.makedirs(saved_dir_base)

        all_js_files = glob.glob(os.path.join(directory, "*.js"))
        total_files = len(all_js_files)
        current_file_number = 0

        for file in all_js_files:
            current_file_number += 1
            if os.path.abspath(file) == os.path.abspath(single_file):
                continue

            print(f"Processing file {current_file_number} of {total_files}: {file}")
            if os.path.exists(output_dir):
                shutil.rmtree(output_dir)
            
            command = [
                "compare50",
                single_file,
                file,
                "--output", output_dir,
                "--max-file-size", str(1024 * 1024 * 100),
                "--passes", "text"
            ]

            subprocess.run(command, check=True)

            match_file = os.path.join(output_dir, "match_1.html")

            if os.path.exists(match_file):
                new_filename = os.path.basename(file).replace('.js', '.html')
                saved_file_path = os.path.join(saved_dir_base, new_filename)
                print(f"Moving {match_file} to {saved_file_path}")
                shutil.move(match_file, saved_file_path)

    except subprocess.CalledProcessError as e:
        print("Error in running Compare50:", e)
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 5:
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir> <saved_dir_base>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_dir = sys.argv[3]
    saved_dir_base = sys.argv[4]

    run_compare50(single_file, directory, output_dir, saved_dir_base)

if __name__ == "__main__":
    main()