import sys
import subprocess
import os
import glob

def run_compare50(single_filename, directory, output_dir):
    try:
        directory_abs = os.path.abspath(directory)
        output_dir_abs = os.path.abspath(output_dir)

        all_js_files = glob.glob(os.path.join(directory_abs, "*.js"))
        js_files_to_compare = [f for f in all_js_files if os.path.basename(f) != single_filename]

        if not js_files_to_compare:
            print("No JavaScript files to compare.")
            sys.exit(0)

        command = [
            "compare50",
            os.path.join(directory_abs, single_filename),
            *js_files_to_compare,
            "--output", output_dir_abs,
            "--verbose",
            "--max-file-size", str(1024 * 1024 * 100)
        ]

        print("Running Compare50 command:", " ".join(command))
        subprocess.run(command, check=True)
        print(f"Compare50 results are saved in {output_dir_abs}")

    except subprocess.CalledProcessError as e:
        print("Error in running Compare50:", e)
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 4:
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_dir = sys.argv[3]

    run_compare50(single_file, directory, output_dir)

if __name__ == "__main__":
    main()