import os
import re
import sys

def extract_similarity_percentage(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        content = file.read()
        match = re.search(r'<h4 class="file_name">.*? \((\d+)%\)</span></h4>', content)
        if match:
            return match.group(1)
        else:
            print(f"No match found in {html_file}")
            return None

def process_html_files(directory):
    print(f"Processing HTML files in {directory}")
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
            print(f"Checking {file_path}")
            percentage = extract_similarity_percentage(file_path)
            if percentage:
                print(f"{filename.replace('.html', '.js')}: {percentage}%")

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_percentages.py <saved_dir_path>")
        sys.exit(1)

    saved_dir_path = sys.argv[1]
    process_html_files(saved_dir_path)

if __name__ == "__main__":
    main()