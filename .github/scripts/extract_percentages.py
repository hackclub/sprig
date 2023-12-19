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

def process_html_files(directory, threshold=10):
    results = {}
    log("Processing HTML files for plagiarism results...")
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
            percentage = extract_similarity_percentage(file_path)
            if percentage is not None:
                results[filename.replace('.html', '.js')] = percentage
                log(f"Extracted {percentage}% similarity from {filename}")

    filtered_sorted_results = sorted(
        ((file, percent) for file, percent in results.items() if percent >= threshold),
        key=lambda x: x[1], reverse=True
    )

    with open('plagiarism_results.txt', 'w') as output_file:
        log("Writing results to plagiarism_results.txt")
        output_file.write("Filtered and Sorted Results (Above Threshold):\n")
        for file, percent in filtered_sorted_results:
            line = f"{file}: {percent}%\n"
            output_file.write(line)
            log(line.strip())
        if not filtered_sorted_results:
            output_file.write("No results exceeding threshold.\n")
            log("No results exceeding threshold.")

def main():
    if len(sys.argv) != 2:
        log("Incorrect number of arguments provided.")
        print("Usage: python extract_percentages.py <saved_dir_path>")
        sys.exit(1)

    saved_dir_path = sys.argv[1]
    log(f"Received saved directory path: {saved_dir_path}")
    process_html_files(saved_dir_path)
    log("Extraction of plagiarism percentages completed.")

if __name__ == "__main__":
    main()