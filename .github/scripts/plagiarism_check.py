import sys
import subprocess
import os
import glob
import shutil

def run_compare50(single_file, directory, output_dir, saved_dir_base):
    try:
        directory_abs = os.path.abspath(directory)

        all_js_files = glob.glob(os.path.join(directory_abs, "*.js"))
        counter = 1

        for file in all_js_files:
            if os.path.abspath(file) == os.path.abspath(single_file):
                continue

            command = [
                "compare50",
                single_file,
                file,
                "--output", output_dir,
                "--verbose",
                "--max-file-size", str(1024 * 1024 * 100)
            ]

            print("Running Compare50 command:", " ".join(command))
            subprocess.run(command, check=True)

            saved_dir = os.path.join(saved_dir_base, str(counter))
            if not os.path.exists(saved_dir):
                os.makedirs(saved_dir)
            if os.path.exists(output_dir):
                shutil.move(output_dir, saved_dir)
                print(f"Compare50 results for {file} are saved in {saved_dir}")
                counter += 1

            if os.path.exists(output_dir):
                shutil.rmtree(output_dir)

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