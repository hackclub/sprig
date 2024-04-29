import json, re

if __name__ == "__main__":
    with open("./games/metadata.json") as f:
        metadata = json.load(f)