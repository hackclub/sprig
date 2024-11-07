/*
@title: yet_another_platformer
@author: gicorada
@tags: ['platformer']
@addedOn: 2024
*/

// define the sprites in our game
const player = "p";
const block = "b";
const goal = "g";

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
.....0000000....
....00.....0....
....0......0....
....0..5.5.0....
....0......0....
....0......0....
....0.....00....
....0000000.....
....0...........
....0...........
....0...........
....00..........
....0.0.........
....0.0.........`],
  [block, bitmap`
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
  [goal, bitmap`
................
................
................
................
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
....00000000....
.....000000.....
......0000......
.......00.......
................
................
................`]
);

// create game levels
let level = 0;
const levels = [
  map`
...............
...............
...............
...........g...
...........b...
........bb.....
.....bb........
...............
...b...........
p.bb...........`,
  map`
...............
...............
...............
...bbbbbbbbbb..
..b.b.........b
....b..........
b...b.......bb.
.b..b......b...
..bpb......bg..
bbbbbbbbbbbbbbb`,
  map`
...............
...............
...............
...............
......b........
.....b.bbbbbb.b
....b.........b
...b....bbbbbbb
..b....b.......
pbg...b........`,
  map`
...............
p..............
...............
...............
...............
...............
...............
.bbbbbbbbbb....
...b...........
.bbg...........`,
  map`
g..............
bbbbbbb........
.........b.....
........bb.....
.......bb......
......bb.......
.....bb........
....bb.........
...bb..........
.pbb...........`,
  map`
bbbbbbbbbbbbbb.
..............g
.bbbbbbbbbbbbbb
...............
bbbbbbbbbbbbbb.
...............
.bbbbbbbbbbbbbb
...............
bbbbbbbbbbbbbb.
p..............`,
  map`
....................
bbb.b.b..b..b..b.b.b
.b..b.b.b.b.bb.b.bb.
.b..bbb.bbb.b.bb.bb.
.b..b.b.b.b.b..b.b.b
....................
..b.b..bbb..b..b.b..
..b.b.b...b.b..b.b..
...b..b...b.b.pb....
...b...bbb...bb..b..
....................`

];

const melody = tune`
300: C5-300 + A4~300,
300: B4~300 + D5-300,
300: C5~300 + E5-300,
8700`

const melodyWin = tune`
300: F5~300,
300: F5~300,
300: G5^300,
300: G5^300,
300: A5-300,
300: A5-300,
300: B5/300,
300: B5/300,
300: B5^300,
300: B5^300,
6600`


// set the map displayed to the current level
const currentLevel = levels[level];
addText("level 1 - start", { y: 2, x: 1, color: color`3` });
setMap(currentLevel);

setSolids([player, block]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// gravity and jump variables
let isJumping = false;
const gravity = 1;
const jumpHeight = 3;
let jumpVelocity = 0;

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  if (!isJumping && isOnGround()) {
    startJump();
  }
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    setMap(currentLevel);
    isJumping = false;
    jumpVelocity = 0;
  }
});

// start the jump
const startJump = () => {
  isJumping = true;
  jumpVelocity = jumpHeight-1;
};

// check if player is on the ground
const isOnGround = () => {
  const playerSprite = getFirst(player);
  return getAll(block).some(block =>
    block.x === playerSprite.x && block.y === playerSprite.y + 1
  ) || playerSprite.y + 1=== height();
};

const updatePhysics = async () => {
  const playerSprite = getFirst(player);

  if (isJumping && !getAll(block).some(block =>
    block.x === playerSprite.x && block.y === playerSprite.y - 1
  )) {
    playerSprite.y -= jumpVelocity;
    jumpVelocity -= gravity;
    
    if (jumpVelocity <= 0) {
      isJumping = false;
      jumpVelocity = 0;
    }
  } else {
    if (!isOnGround()) {
      playerSprite.y += gravity;
    }
  }

  if (isOnGround()) {
    jumpVelocity = 0;
    isJumping = false;
  }
};


const checkGoal = () => {
  const p = getFirst(player);
  const g = getFirst(goal);

  if (g && g.x === p.x && g.y === p.y) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      clearText();
      if(level != 6) {
        addText(`level ${level+1}`, { y: 2, x: 1, color: color`3` });
        playTune(melody)
      } else {
        playTune(melodyWin)
      }
      if(level === 3) {
        addText("Stuck? Press j", { y: 9, x: 5, color: color`3` });
      }
      setMap(currentLevel);
      isJumping = false;
      jumpVelocity = 0;
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
}



const gameLoop = async () => {
  while (true) {
    await updatePhysics();
    if (isOnGround()) {
      isJumping = false;
      jumpVelocity = 0;
    }
    checkGoal();
    await wait(75);
  }
};

gameLoop();

afterInput(() => {

});

