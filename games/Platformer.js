/*
@title: Platformer
@author: Kirin
@tags: ['platformer']
@addedOn: 2024-10-31
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const lava = "l";
const cracked_box = "c";
const walkTune = tune`
37.5: D5/37.5 + C5/37.5,
37.5: G5/37.5 + E5/37.5 + F5/37.5 + D5/37.5 + C5/37.5,
37.5: F4/37.5 + E4/37.5 + D4/37.5 + C4/37.5 + B5/37.5,
37.5: B4/37.5 + A4/37.5 + G4/37.5 + C4/37.5 + D4/37.5,
37.5: A5/37.5 + G5/37.5 + F5/37.5 + E5/37.5 + D5/37.5,
37.5: G5/37.5 + A5/37.5 + D5/37.5 + E5/37.5 + F5/37.5,
37.5: E4-37.5,
37.5: E4-37.5,
37.5: E4-37.5,
37.5: E4-37.5 + G5-37.5 + F5-37.5,
37.5: D4-37.5 + A5-37.5 + G5-37.5 + F5-37.5 + E5-37.5,
37.5: E4-37.5 + D4-37.5 + F5-37.5 + E5-37.5,
37.5: E4-37.5 + F4-37.5 + F5-37.5 + G5-37.5 + E5-37.5,
37.5: E4-37.5 + G5-37.5 + A5-37.5 + D5-37.5 + E5-37.5,
37.5: D4-37.5 + E4-37.5 + A5-37.5 + G5-37.5 + F5-37.5,
37.5: D4-37.5 + F5-37.5,
37.5: A4-37.5 + G4-37.5 + F4-37.5 + E4-37.5 + D4-37.5,
37.5: E5~37.5,
37.5: D5~37.5 + E5~37.5,
37.5: G4~37.5 + E4~37.5 + D5~37.5,
37.5: G5~37.5 + F5~37.5 + D5~37.5,
37.5: A5~37.5 + F5~37.5 + G5~37.5 + D5~37.5,
37.5: G5~37.5 + F5~37.5 + E5~37.5 + D5~37.5,
37.5: G5~37.5 + A5~37.5 + D5~37.5,
37.5: G4~37.5 + D5~37.5,
37.5: D5~37.5,
37.5: C4~37.5 + D4~37.5 + E4~37.5,
37.5: C4^37.5 + F5^37.5 + E5^37.5 + D5^37.5,
37.5: G4^37.5 + F4^37.5 + E4^37.5 + D4^37.5 + A5^37.5,
37.5: D4^37.5 + E4^37.5 + A4^37.5 + A5^37.5 + F5^37.5,
37.5: A4^37.5 + G4^37.5 + F4^37.5 + A5^37.5 + D5^37.5,
37.5: F4^37.5 + E4^37.5 + D4^37.5 + E5^37.5 + F5^37.5`;
const jumpTune = tune`
412.5,
37.5: C4-37.5,
37.5: D4-37.5 + C4-37.5,
37.5: E4-37.5 + D4-37.5 + C4-37.5,
37.5: F4-37.5 + E4-37.5 + D4-37.5 + C4-37.5,
37.5: C4-37.5 + D4-37.5 + E4-37.5 + F4-37.5 + G4-37.5,
37.5: F4-37.5 + E4-37.5 + D4-37.5 + C4-37.5,
37.5: E4-37.5 + D4-37.5 + C4-37.5,
37.5: D4-37.5 + C4-37.5,
37.5: C4-37.5,
450`;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ cracked_box, bitmap`
................
................
................
...8888C888888..
...8....8....8..
...8....8....8..
.............C..
...8....8....8..
...88C88.88888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8.......
....8C88.88888..
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ lava, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
....
...g
pb..`,
  map`
p..
...
.bg`,
  map`
p..g
....
...b
..b.`,
  map`
p..b
..bb
.b..
b..g`,
  map`
...
.p.
...`,
  map`
p.w.
bww.
.b..
..bg`,
  map`
p......
......g
b.b.b.w
lllllll
lllllll`,
  map`
.......w....
p......b...g
b.b.b.b.b..b
lllllllbllbl
lllllllllbll
llllllllblll`,
  map`
.............
p...........g
c.c.c.c.c.c.w
lllllllllllll
lllllllllllll`,
  map`
.............w............g
p............b............c
c.c.c.c.c.c.c.c.c..c.c.c.c.
lllllllllllllclcllclllclcll
llllllllllllllcllllllllclll`,
  map`
p
g`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, cracked_box ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

addText("How to play:\nW - jump\nA - move left\nS - move down\nD - move right\nGoal:\nget to each goal\n(the green thing\n) in every level\nthere cannot be a \nbox to the left of\n the goal\n\nClick K to play", { x: 2, y: 1, color: color`5` });

onInput("k", () => {
    clearText();
});

async function isOverSprite(sprite, targetSpriteType) {
  try {
    if ((getFirst(sprite).y < getFirst(targetSpriteType).y) && (getFirst(sprite).x == getFirst(targetSpriteType).x)) {
      await new Promise(r => setTimeout(r, 450));
      clearTile(getFirst(targetSpriteType).x, getFirst(targetSpriteType).y);
    }
  }
  catch {
    {}
  }
}

// Define the specific x-coordinate to check
let groundY = 2; // Change this to the desired y-coordinate

// Function to check if the player is on the ground or on top of a box
function isOnGround(sprite) {
    const below = getTile(sprite.x, sprite.y + 1);
    if (level == 5) {
      groundY = 3;
    }
    else if (level == 3) {
      groundY = 3;
    }
    else if (level == 2) {
      groundY = 3;
    }
    else if (level == 6) {
      groundY = 4;
    }
    else if (level == 7) {
      groundY = 5;
    }
    else if (level == 8) {
      groundY = 5;
    }
    else if (level == 9) {
      groundY = 5;
    }
    else {
      groundY = 2;
    }
    return sprite.y === groundY || below.some(tile => tile.type === box || tile.type == cracked_box);
}

// Apply gravity to the player
function applyGravity() {
    const playerSprite = getFirst(player);
    if (!isOnGround(playerSprite)) {
        playerSprite.y += 1;
    }
}

// Call applyGravity function continuously
let gravityInterval = setInterval(applyGravity, 100);

// inputs for player movement control
onInput("w", () => {
    const playerSprite = getFirst(player);
    if (isOnGround(playerSprite)) {
        playerSprite.y -= 1; // Move up
        playTune(jumpTune);
        
        // Temporarily disable gravity
        clearInterval(gravityInterval);
        
        setTimeout(() => {
            gravityInterval = setInterval(applyGravity, 100);
        }, 300);
    }
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(walkTune);
});

onInput("s", () => {
    getFirst(player).y += 1; // positive y is downwards
    playTune(walkTune);
});

onInput("d", () => {
    getFirst(player).x += 1;
    playTune(walkTune);
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  if (tilesWith(lava, player).length > 0) {
    setMap(levels[0]);
    level = 0;
  }
  
  isOverSprite(player, cracked_box)
    
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and players
  const numberCovered = tilesWith(goal, player).length;
  if (level == 5) {
      addText("For this level yo\nu need to get a b\nox to the goal.", { x: 2, y: 1, color: color`9` });
      // count the number of tiles with goals
      const targetNumber = tilesWith(goal).length;
      
      // count the number of tiles with goals and boxes
      const numberCovered = tilesWith(goal, box).length;
      // if the number of goals is the same as the number of goals covered
      // all goals are covered and we can go to the next level
      if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;
    
        const currentLevel = levels[level];
    
        // make sure the level exists and if so set the map
        // otherwise, we have finished the last level, there is no level
        // after the last level
        if (currentLevel !== undefined) {
          setMap(currentLevel);
        }
      }
  }
  else {
    clearText()
  }

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
