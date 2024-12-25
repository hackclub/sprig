import os

def get_list_of_files(folder_path):

    all_items = os.listdir(folder_path)
    files = [item for item in all_items if os.path.isfile(os.path.join(folder_path, item))]
    
    return files


files = get_list_of_files("games/")

no_description = []

for file in files:
    with open("games/" + file, "r") as file:
        content = file.read()

    if "@description" not in content:
        no_description.append(file.name)
        print(file.name)

print(len(no_description))