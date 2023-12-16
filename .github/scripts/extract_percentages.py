from bs4 import BeautifulSoup
import os
import sys

def extract_similarity_percentage(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
        file_name_tag = soup.select_one("#textright > div > h4")
        if file_name_tag:
            percentage_text = file_name_tag.find("span", class_="text-secondary small").text.strip("()%")
            return int(percentage_text)
        else:
            return None

def process_html_files(directory, threshold=10):
    results = {}
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
            percentage = extract_similarity_percentage(file_path)
            if percentage is not None:
                results[filename.replace('.html', '.js')] = percentage

    filtered_sorted_results = sorted(
        ((file, percent) for file, percent in results.items() if percent >= threshold),
        key=lambda x: x[1], reverse=True
    )

    for file, percent in filtered_sorted_results:
        print(f"{file}: {percent}%")

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_percentages.py <saved_dir_path>")
        sys.exit(1)

    saved_dir_path = sys.argv[1]
    process_html_files(saved_dir_path)

if __name__ == "__main__":
    main()