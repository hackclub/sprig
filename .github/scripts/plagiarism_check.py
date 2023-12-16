import sys
import subprocess
import os
import glob

def run_compare50(single_file, directory, output_base_dir):
    try:
        directory_abs = os.path.abspath(directory)
        output_base_dir_abs = os.path.abspath(output_base_dir)

        all_js_files = glob.glob(os.path.join(directory_abs, "*.js"))

        for file in all_js_files:
            if file == single_file:
                continue

            output_dir_name = os.path.basename(file).replace('.js', '')
            output_dir = os.path.join(output_base_dir_abs, output_dir_name)
            
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
            print(f"Compare50 results for {file} are saved in {output_dir}")

    except subprocess.CalledProcessError as e:
        print("Error in running Compare50:", e)
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 4:
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_base_dir>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_base_dir = sys.argv[3]

    run_compare50(single_file, directory, output_base_dir)

if __name__ == "__main__":
    main()