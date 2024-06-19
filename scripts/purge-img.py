import json, re

def load_file(metadata):
    with open(f'./games/{metadata["filename"]}.js') as f:
        return f.readlines()

def find_img(lines):
    for i, l in enumerate(lines):
        if len(re.findall('@img: (.+)', l)) > 0:
            return i

def write_file(metadata, lines):
    with open(f'./games/{metadata["filename"]}.js', 'w') as f:
        f.writelines(lines)

if __name__ == '__main__':
    with open('./games/metadata.json') as f:
        metadata = json.load(f)
        for game_metadata in metadata:
            data = load_file(game_metadata)
            data.pop(find_img(data))
            write_file(game_metadata, data)