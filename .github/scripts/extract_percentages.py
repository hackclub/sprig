from bs4 import BeautifulSoup
import os
import sys
import time

def log(message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def extract_similarity_percentage(html_file):
    try:
        with open(html_file, 'r', encoding='utf-8') as file:
            soup = BeautifulSoup(file, 'html.parser')
            file_name_tag = soup.select_one("#textright > div > h4")
            if file_name_tag:
                percentage_text = file_name_tag.find("span", class_="text-secondary small").text.strip("()%")
                return int(percentage_text)
            else:
                return None
    except Exception as e:
        log(f"Error processing file {html_file}: {e}")
        return None

def process_html_files(directory, threshold=50):
    log("Processing HTML files for plagiarism results...")
    high_plagiarism_detected = False
    high_plagiarism_files = []
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
            percentage = extract_similarity_percentage(file_path)
            if percentage is not None and percentage >= threshold:
                log(f"High plagiarism detected - {filename.replace('.html', '.js')}: {percentage}%")
                high_plagiarism_files.append(filename.replace('.html', '.js') + ": " + str(percentage) + "%")
                high_plagiarism_detected = True
    return high_plagiarism_detected, high_plagiarism_files

def write_to_markdown(file_path, lines):
    with open(file_path, 'w') as md_file:
        for line in lines:
            md_file.write(line + '\n')

def main():
    if len(sys.argv) != 2:
        log("Incorrect number of arguments provided.")
        print("Usage: python extract_percentages.py <saved_dir_path>")
        sys.exit(1)

    saved_dir_path = sys.argv[1]
    high_plagiarism_detected, high_plagiarism_files = process_html_files(saved_dir_path)

    markdown_lines = ["# Plagiarism Report"]
    if high_plagiarism_detected:
        log("High plagiarism percentages detected.")
        markdown_lines.append("## High plagiarism percentages detected in the following files:")
        markdown_lines.extend(high_plagiarism_files)
        write_to_markdown("plagiarism-report.md", markdown_lines)
        sys.exit(1)
    else:
        log("No high plagiarism percentages detected.")
        markdown_lines.append("No high plagiarism percentages detected.")
        write_to_markdown("plagiarism-report.md", markdown_lines)

if __name__ == "__main__":
    main()