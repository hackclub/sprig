import re, json

# Test if the necessery tags exist
def test_metadata(game):
    game_lines = []
    found = {"title": False, "author": False, "img": False, "tags": False, "addedOn": False}
    occurences = {"title": 0, "author": 0, "img": 0, "tags": 0, "addedOn": 0}

    # Read game
    with open(f"./games/{game}.js") as f:
        game_lines = f.readlines()
    
    # Check if tags exist
    for i, l in enumerate(game_lines):
        if re.findall("@title: (.+)", l):
            found["title"] = True
            occurences["title"] = len(re.findall("@title: (.+)", l))
        if re.findall("@author: (.+)", l):
            found["author"] = True
            occurences["author"] = len(re.findall("@author: (.+)", l))
        if re.findall("@img: (.+)", l):
            found["img"] = True
            occurences["img"] = len(re.findall("@img: (.+)", l))
        if re.findall("@tags: (.+)", l):
            found["tags"] = True
            occurences["tags"] = len(re.findall("@tags: (.+)", l))
        if re.findall("@addedOn: (.+)", l):
            found["addedOn"] = True
            occurences["addedOn"] = len(re.findall("@addedOn: (.+)", l))
    
    # Return & print the results
    print(f"[TEST] {game}: {found} ({occurences})")
    return found

# Replace the game meta
def embed_metadata(game_metadata, test_results):
    game_lines = []
    with open(f"./games/{game_metadata["filename"]}.js") as f:
        game_lines = f.readlines()
    
    if (test_results["title"] == False and test_results["author"] == False and test_results["img"] == False and test_results["tags"] == False and test_results["addedOn"] == False):
        game_lines.insert(0, "*/\n\n")
        game_lines.insert(0, "@addedOn: " + game_metadata["addedOn"] + "\n")
        game_lines.insert(0, "@img: " + (game_metadata["img"] if game_metadata["img"] else "\"\"") + "\n")
        game_lines.insert(0, "@tags: " + str(game_metadata["tags"]) + "\n")
        game_lines.insert(0, "@author: " + game_metadata["author"] + "\n")
        game_lines.insert(0, "@title: " + game_metadata["title"] + "\n")
        game_lines.insert(0, "/*\n")

        print(f"[EMBED] {game_metadata["filename"]}: All Metadata Embed")
    elif (test_results["title"] == True and test_results["author"] == True and test_results["img"] == True and test_results["tags"] == True and test_results["addedOn"] == True):
        print(f"[EMBED] {game_metadata["filename"]}: No Metadata Embed")
    else:
        if(test_results["addedOn"] == False): game_lines.insert(1, "@addedOn: " + game_metadata["addedOn"] + "\n")
        if(test_results["img"] == False): game_lines.insert(1, "@img: " + (game_metadata["img"] if game_metadata["img"] else "\"\"") + "\n")
        if(test_results["tags"] == False): game_lines.insert(1, "@tags: " + str(game_metadata["tags"]) + "\n")
        if(test_results["author"] == False): game_lines.insert(1, "@author: " + game_metadata["author"] + "\n")
        if(test_results["title"] == False): game_lines.insert(1, "@title: " + game_metadata["title"] + "\n")

        print(f"[EMBED] {game_metadata["filename"]}: Some Metadata Embed")
        
    with open(f"./games/{game_metadata["filename"]}.js", "w") as f:
        f.writelines(game_lines)

with open("./games/metadata.json") as f:
    metadata = json.load(f)
    for game_metadata in metadata:
        test_results = test_metadata(game_metadata["filename"])
        embed_metadata(game_metadata, test_results)