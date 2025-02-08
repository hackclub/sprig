/*
@title: mr gold
@author: BoKi
@tags: []
@addedOn: 2024-00-00
*/

//defining sprites
const player = "p";
const gold = "g";
const house = "h";

// bitmap assigning
setLegend(
  [ player, bitmap`
...66666666666..
...60000000006..
...60FFFFFFF06..
...60FFFFFFF06..
...60F0FFF0F06..
...60FFF6FFF06..
...60FFFFFFF06..
...60FF333FF06..
...60FFFFFFF06..
...60000000006..
...66600000666..
.....6006006....
.....6006006....
.....6666666....
................
................` ],
  [ gold, bitmap`
................
................
................
................
................
........00......
.......0660.....
......06660.....
.....06660......
....06660.......
....0660........
.....00.........
................
................
................
................` ],
  [ house, bitmap`
.11.1...........
1.11.1..........
.11111..........
..1.111.........
....LLL.........
....LLL.........
....LLL.........
...CCCCCCCCCC...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
...C66CCCC66C...
...C66CCCC66C...
...CCCCCLLCCC...
...CCCCCL1CCC...
...CCCCCLLCCC...`]
);

// game levels
let level = 0
const levels = [
  map`
.........
...g.....
......h..
.........
...g.....
.p....g..
.........`,
  map`
...h.....
......g..
.g.......
......p..
.........
....g....
.........`,
  map`
.........
..g......
..g......
..g...p..
.......g.
.........
......h..`,
  map`
.........
.....g...
.......g.
.........
.......g.
..p......
..h...g..`,
  map`
......p.h
.g.......
.......g.
.........
.......g.
..g......
.........`,
  map`
.........
....ggg..
.....g...
..g..gp..
.......g.
hg.......
.........`,
  map`
.........
gg.g.gggg
g.gg.gg..
gg..g.ggg
g.g.g.g..
gg..g.ggg
....p....`];

// setting solids
setSolids([player, gold]);

// setting map to current level
const currentLevel = levels[level];
setMap(currentLevel);

// player can push gold
setPushables({
  [player]: [gold] 
});


// player movement
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () =>  {
  getFirst(player).y -= 1
})

onInput("d", () => {  
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

let levelSwitching = false; // Prevents multiple level skips

afterInput(() => {
  if (levelSwitching) return; // stop if already switching levels

  let golds = getAll(gold);

  // remove gold when it reaches a house
  for (let g of golds) {
    let houseAtSamePosition = getTile(g.x, g.y).some(obj => obj.type === house);
    
    if (houseAtSamePosition) {
      g.remove();
    }
  }

  // check if tere was gold in the level originally
  let currentMapString = levels[level].trim().split("\n").join("");
  let levelHadGold = currentMapString.includes("g");

  // If the level had gold and now all gold is removed, trigger level change
  if (levelHadGold && getAll(gold).length === 0) {
    levelSwitching = true; 

    setTimeout(() => {
      if (level < levels.length - 1) {
        level++; // move to the next level
        setMap(levels[level]); // load the new level
        levelSwitching = false; // allow new inputs

        // show "Well Done!"
        if (level === levels.length - 1) {
          addText("Well Done!", { y: 8, color: color`C` });
        }
      }
    }, 1000); // 1-second delay before switching level
  }
});