import os
import sys
import time
from bs4 import BeautifulSoup

def log(message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def process_moss_results(html_file, threshold=50):
    log("Processing MOSS results for plagiarism...")
    
    high_plagiarism_detected = False
    high_plagiarism_files = []

    try:
        with open(html_file, 'r', encoding='utf-8') as file:
            soup = BeautifulSoup(file, 'html.parser')
            links = soup.find_all('a')

            for link in links:
                text = link.text
                if 'matches' in text:
                    parts = text.split()
                    percentage = int(parts[-1].strip('%'))
                    
                    if percentage >= threshold:
                        high_plagiarism_detected = True
                        high_plagiarism_files.append(f"{text}")

    except Exception as e:
        log(f"Error processing MOSS results: {e}")
        return False, []

    return high_plagiarism_detected, high_plagiarism_files

def write_to_markdown(file_path, lines):
    with open(file_path, 'w') as md_file:
        for line in lines:
            md_file.write(line + '\n')
    log(f"Markdown file written to {file_path}")

def main():
    if len(sys.argv) != 2:
        log("Incorrect number of arguments provided.")
        print("Usage: python extract_percentages.py <saved_dir_path>")
        sys.exit(1)

    saved_dir_path = sys.argv[1]
    html_file = os.path.join(saved_dir_path, 'moss_result.html')
    
    if not os.path.exists(html_file):
        log(f"HTML file {html_file} not found.")
        sys.exit(1)

    high_plagiarism_detected, high_plagiarism_files = process_moss_results(html_file)

    markdown_lines = ["# Plagiarism Report"]
    if high_plagiarism_detected:
        log("High plagiarism percentages detected.")
        markdown_lines.append("## Game overlap report:")
        markdown_lines.extend(high_plagiarism_files)
        write_to_markdown("plagiarism-report.md", markdown_lines)
        sys.exit(1)
    else:
        log("No high plagiarism percentages detected.")
    log("Plagiarism report generation completed.")

if __name__ == "__main__":
    main()