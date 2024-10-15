import requests
import re
import time
import os
import json
from dotenv import load_dotenv

dotenv_path = os.path.join('.env')
load_dotenv(dotenv_path=dotenv_path)

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

def get_prs():
    pull_requests = []
    page = 1
    while True:
        response = requests.get(
            f'https://api.github.com/search/issues',
            params={'q': f'repo:hackclub/sprig is:pr is:merged label:submission', 'per_page': 100, 'page': page},
            headers={'Authorization': f'Bearer {GITHUB_TOKEN}'}
        )
        response.raise_for_status()
        data = response.json()
        if not data['items']:
            break
        pull_requests.extend(data['items'])
        page += 1
        print(page)
    return pull_requests

def get_filename(pull_number):

    response = requests.get(
        f'https://api.github.com/repos/hackclub/sprig/pulls/{pull_number}/files',
        headers={'Authorization': f'Bearer {GITHUB_TOKEN}'}
        )
    response.raise_for_status()
    files = response.json()
    
    for file in files:
        filename = file["filename"].split("/")[-1]
        if filename[-3:] == '.js':
            return filename
        
    return None

def get_list_of_files(folder_path):

    all_items = os.listdir(folder_path)
    files = [item for item in all_items if os.path.isfile(os.path.join(folder_path, item))]
    
    return files

def get_game_info(filename, game_content):

    game_content = game_content.split('\n')

    found_code = False
    in_comment = 0 # this is how many multi-line comments the current line is in, since it's possible that someone doubled the /* and */

    comment = ""
    
    while not found_code:
        line = game_content.pop(0)

        contains_start_comment = "/*" in line
        contains_end_comment = "*/" in line

        if contains_start_comment:
            in_comment += 1
        if contains_end_comment:
            in_comment -= 1
        if in_comment > 0:
            comment += line + '\n'
        else:
            contains_comment = re.match(r'^\s*//', line) is not None
            is_whitespace = re.match(r'^\s*$', line)

            if contains_comment or is_whitespace or contains_end_comment:
                comment += line + '\n'
            else:
                game_content.insert(0, line)
                found_code = True

    return {"filename": filename, "file_comment": comment, "code": "\n".join(game_content)}

pull_requests = get_prs()

pr_descriptions = {}

for pr in pull_requests:
    pr_number = pr['number']
    print(pr_number)

    got_filename = False

    while not got_filename:
        try:
            filename = get_filename(pr_number)
            got_filename = True
        except Exception as e:
            print(e)
            print("Waiting 30 seconds...")
            time.sleep(30)

    body = pr["body"]

    if body is None:
        continue
    
    body = re.sub(r'<!--.*?-->', '', body, flags=re.DOTALL) # removing comments

    try:
        body = body.split("## About your game")[1].split("## Code")[0]
    except:
        pass

    pr_descriptions[filename] = body

files = get_list_of_files('./games')

files.sort()

all_games = []

for file in files:
    if file[-3:] != '.js':
        continue
    with open(f'./games/{file}') as f:
        game = get_game_info(file, f.read())
        all_games.append(game)

for game in all_games:
    if game["filename"] in pr_descriptions:
        game["pr_comment"] = pr_descriptions[game["filename"]]


for game in all_games:
    print(game["filename"])
    try:
        print(game["pr_comment"])
    except:
        pass

with open("scripts/description_generation/all_games.json", "w") as f:
    json.dump(all_games, f, indent=4)
