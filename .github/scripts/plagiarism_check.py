import sys
import subprocess
import os

def run_compare50(single_file, directory, output_dir):
    try:
        
        duplicate_file_path = os.path.join(directory, os.path.basename(single_file))

        if os.path.isfile(duplicate_file_path):
            os.remove(duplicate_file_path)

        command = [
            "compare50",
            single_file,
            f"{directory}/*",
            "--output", output_dir,
            "--verbose",
            "--max-file-size", str(1024 * 1024 * 100)
        ]

        print("Running Compare50 command:", " ".join(command))
        
        subprocess.run(command, check=True)

        print(f"Compare50 results are saved in {output_dir}")

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

    if not os.path.isfile(single_file):
        print(f"File not found: {single_file}")
        sys.exit(1)

    if not os.path.isdir(directory):
        print(f"Directory not found: {directory}")
        sys.exit(1)

    run_compare50(single_file, directory, output_dir)

if __name__ == "__main__":
    main()