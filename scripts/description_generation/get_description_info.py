import requests
import re
import time
import os
import json
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
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

with open("scripts/all_games.json", "w") as f:
    json.dump(all_games, f, indent=4)


# https://api.github.com/repos/hackclub/sprig/pulls/2074/files

# Battleship.js 
# Battleship is a strategic naval warfare game where players take turns to strategically place and attack each other's ships on a grid. 
# The game involves placing ships horizontally or vertically on the grid and trying to sink all of the opponent's ships. 
# Players use the cursor to navigate the grid and confirm their ship positions or attacks with specific keys.
# 
# battle_bots.js 
# This game called "Battle Bots" is a multiplayer game where players control their characters using different keys. 
# The objective is to push each other into red squares to score points while avoiding them. 
# The game features an infinite duel between the two players with strategic movement and obstacle navigation.
#
# santas_workshop.js 
# In "Santa's Workshop," players control an elf tasked with moving presents to designated locations in a Sokoban-style puzzle game. 
# The game features various obstacles such as walls and shootable targets to interact with, adding challenge and strategy to the gameplay. 
# With multiple levels to solve, players must navigate through each puzzle to progress and help Santa prepare for the holiday season.
# 
# Cheese_Terminator.js 
# "Cheese Terminator" is a sokoban-style game that originated as a cult classic from Microsoft Poland, where players had the chance to experience the quirky gameplay through surveys. 
# The port, "Cheese Terminator: Reloaded," was later developed for Windows Phone, gaining popularity among fans. 
# Experience this puzzle game's challenges and humor as you navigate through levels to solve cheese-related puzzles.
# 
# Arcade-Treasure.js 
# Treasure Quest is an exciting adventure and puzzle game where players must navigate through obstacles and solve puzzles to reach the treasure. 
# Players need to be cautious of enemies lurking around, adding an element of challenge to the gameplay. 
# With a focus on exploration and strategic thinking, Treasure Quest offers a thrilling experience for those seeking adventure and brain-teasing puzzles.
# 
# Stop.js 
# "Stop" is a puzzle game where players navigate through levels using directional controls. 
# The game features various obstacles such as spikes, jewels, boxes, and corrupted tiles that challenge the player. 
# By strategically moving the player character, the goal is to reach waypoints while avoiding hazards and completing objectives.
# 
# 13_medium_sokoban_puzzles.js 
# This game is a collection of 13 medium Sokoban puzzles where the objective is to push the red-brown boxes onto the black goals. Players control a character represented by the letter 'p' to move the boxes strategically. The game challenges players to think critically and plan their moves efficiently to solve each level.
# 
# 15_puzzle.js 
# This is a 15 puzzle game where the player needs to arrange numbered tiles in ascending order within a 4x4 grid by shifting them around using the WASD keys. The goal is to move the squares next to the empty square strategically to achieve the correct numerical sequence. The game tests the player's problem-solving skills and spatial reasoning in a challenging and interactive way.
# 
# 1930.js 
# 1930 is a strategy game where the player controls characters to kill Java aliens and send Blobs to the next level. Moving or jumping affects all characters simultaneously, with spikes posing a threat to both types. The objective is to unlock the portal to the next level by eliminating all Java aliens while navigating through challenging obstacles.
# 
# 2048.js 
# 2048 is a classic puzzle game where players combine numbered tiles on a grid to create a tile with the number 2048. Players can move the tiles in four directions to merge matching numbers and strategically fill the board. The goal is to reach the 2048 tile while preventing the board from getting completely filled.
# 
# 2048_Alphabet_Edition.js 
# 2048 Alphabet Edition is a strategic game where players combine alphabet tiles to create higher-value tiles, aiming to reach the letter "L" to win. It offers a fresh twist on the classic 2048 gameplay, adding a new layer of challenge and excitement. With intuitive controls using the letters A, W, D, and S, players must strategize and plan their moves carefully to achieve victory.
# 
# 256.js 
# "256" is a classic puzzle game where players combine numbered tiles to reach the ultimate goal of getting to tile "256". By strategically moving the tiles in different directions, players aim to merge matching numbers and achieve higher scores. The game challenges players to think ahead and optimize their moves to reach the highest numbered tile possible before running out of available moves.
# 
#
# 2D_life.js 
# 3.5
# 2D Life is a classic simulation sandbox game that allows players to create and modify cell patterns based on predefined rules. 
# Players can toggle cells, start or stop the simulation, and observe how cells evolve over time. 
# The game features hackable outcomes where players can customize the rules for cell birth and survival to create unique scenarios within the simulation.
#
# 4o
# 2D Life is a sandbox simulation game inspired by Conway's Game of Life, where players can create and observe cellular automata evolving on a grid. 
# By setting initial conditions and modifying the rules, users can explore various patterns and behaviors as the simulation progresses. 
# It offers a classic, hackable experience for those interested in studying complex systems and cellular automaton dynamics.