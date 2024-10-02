import os
from openai import OpenAI
import json
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=OPENAI_API_KEY)

def get_description(game, client):

    pr_comment = None

    if "pr_comment" in game:
        pr_comment = game["pr_comment"]

    prompt = f"""
    Please write a short description (3 sentences or less, no line breaks) for this game. This is spoken to someone looking for information about the theme and type of game, not a player. Do not add information about the controls. DO NOT make up more information than you have.

    Below is the comment that the author wrote in the code:
    {game["file_comment"]}

    Below is the comment that the author wrote in their pull request:
    {pr_comment}

    If the comment doesn't have a description, please write a description based on the code.
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

with open("scripts/all_games.json", "r") as f:
    all_games = json.load(f)

all_descriptions = {}

for game in all_games:
    description = get_description(game, client)
    all_descriptions[game["filename"]] = description

    print(game["filename"], description)

with open("scripts/descriptions.json", "w") as f:
    json.dump(all_descriptions, f)