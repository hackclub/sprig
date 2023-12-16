import sys
import subprocess
import os
import glob

def run_compare50(single_file, directory, output_dir):
    try:
        directory_abs = os.path.abspath(directory)
        output_dir_abs = os.path.abspath(output_dir)

        if os.path.isabs(single_file):
            single_file_abs = single_file
        else:
            single_file_abs = os.path.join(directory_abs, single_file)

        if not os.path.isfile(single_file_abs):
            print(f"{single_file_abs} not found")
            sys.exit(1)

        all_js_files = glob.glob(os.path.join(directory_abs, "*.js"))
        js_files_to_compare = [f for f in all_js_files if f != single_file_abs]

        command = [
            "compare50",
            single_file_abs,
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