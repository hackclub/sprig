import os
from openai import OpenAI
import json
from dotenv import load_dotenv

dotenv_path = os.path.join('.env')
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=OPENAI_API_KEY)

def get_description(game, client):

    pr_comment = None

    if "pr_comment" in game:
        pr_comment = game["pr_comment"]

    prompt = f"""
    Please write a short description (3 sentences or less, no line breaks) for this game. This is spoken to someone looking for information about the theme and type of game, not a player. Do not add information about the controls. DO NOT make up more information than you have - it's better to write a short description.

    The most useful information is in the comments the author wrote - they a good source of information about the game.

    Below is the comment that the author wrote in the code:
    {game["file_comment"]}

    Below is the comment that the author wrote in their pull request:
    {pr_comment}

    Below is the code for the game:
    {game["code"]}
    """

    max_length = 100000

    if len(prompt) > max_length:
        prompt = prompt[:max_length]

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[  
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return completion.choices[0].message.content

with open("scripts/description_generation/all_games.json", "r") as f:
    all_games = json.load(f)

for i in range(len(all_games)):
    description = get_description(all_games[i], client)
    all_games[i]["description"] = description
    all_games[i]["reviewed"] = False

    print(all_games[i]["filename"], all_games[i]["description"])

with open("scripts/description_generation/all_games.json", "w") as f:
    json.dump(all_games, f)