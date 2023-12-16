from bs4 import BeautifulSoup
import os
import sys

def extract_similarity_percentage(html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
        file_name_tag = soup.select_one("#textright > div > h4")
        if file_name_tag:
            percentage = file_name_tag.find("span", class_="text-secondary small").text.strip("()%")
            return percentage
        else:
            return None

def process_html_files(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            file_path = os.path.join(directory, filename)
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