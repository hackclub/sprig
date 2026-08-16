/*
@title: Pixel Pier
@description: A cozy fishing game for the Sprig
@author: Hugo Haaxman
@tags: ['fishing']
@addedOn: 2026-07-07
*/

// sleep function
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

let gameOver = 0

const player = "p"
const rod = "r"
const bobber = "b"
const line = "l"
const floor = "f"
const sea = "s"
const wave = "w"

// The 3 different fish types
const fishMinnow = "1"
const fishSalmon = "2"
const fishGoldCarp = "3"

// The enemy
const enemy = "x"

const upTune = tune`
141.50943396226415: D4^141.50943396226415,
4386.792452830189`

const downTune = tune`
141.50943396226415: C4^141.50943396226415,
4386.792452830189`

const endTune = tune`
142.85714285714286: G5-142.85714285714286,
142.85714285714286: F5-142.85714285714286,
142.85714285714286: E5-142.85714285714286,
142.85714285714286: B4-142.85714285714286,
142.85714285714286: C5-142.85714285714286,
142.85714285714286: A4-142.85714285714286,
142.85714285714286: G4-142.85714285714286,
142.85714285714286: D4-142.85714285714286,
142.85714285714286: E4-142.85714285714286,
142.85714285714286: C4-142.85714285714286,
3000`

const catchTune = tune`
61.47540983606557: F4-61.47540983606557,
61.47540983606557: A4-61.47540983606557,
61.47540983606557: C5-61.47540983606557,
61.47540983606557: E5-61.47540983606557,
1721.311475409836`

setLegend(
  [ fishMinnow, bitmap`
................
................
................
................
.....FFFF.......
.F.FFFFFFFF.....
.FFFFFFFF0FF....
.F.FFFFFFFF.....
.....FFFF.......
................
................
................
................
................
................
................`],
  [ fishSalmon, bitmap`
................
................
................
.......8888.....
.8...88888888...
.88.88888888888.
.888888888888H88
.88.88888888888.
.8...88888888...
.......8888.....
................
................
................
................
................
................`],
  [ fishGoldCarp, bitmap`
................
................
................
................
.......666......
.6...6666666....
.66..666666666..
.66666666666660.
.666666666666666
.66666666666660.
.66..666666666..
.6...6666666....
.......666......
................
................
................`],
[ "x", bitmap`
................
................
................
.....CCCC.......
....CLLLLC......
....CLLLLC......
....CCCCCC......
....C3333C......
....C3333C......
....C3113C......
....C2222C......
....C2222C......
....C2222C......
.....CCCC.......
................
................`],
    [ rod, bitmap`
................
................
...C............
..C.C...........
.C...C..........
C.....C.........
.......C........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........`],
  [ bobber, bitmap`
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......3........
......333.......
......323.......
......333.......
................
................
................
................
................
................`],
  [ line, bitmap`
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........`],
  [ sea, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ floor, bitmap`
CCCCCCCCCCCCCCCC
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999
CCCCCCCCCCCCCCCC
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ wave, bitmap`
................
................
................
................
................
................
................
................
................
................
................
..777777.....777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ player, bitmap`
................
......3333......
.....333333.....
.....9..9.9.....
.....9..9.9.....
.....9....9.....
......9999.....C
.....33333....C.
.....333323..C..
.....3333223C...
.....333332C3...
.....3333333....
.....333333.....
......3333......
......333339....
......333339....` ]
)

setSolids([ floor ])

let level = 0
const levels = [
  map`
p.......
fffffwww
ssssssss
ssssssss
ssssssss
ssssssss
ssssssss`
]

function spawnFish() {
  const fishTypes = [fishMinnow, fishSalmon, fishGoldCarp, enemy]
  const randomType = fishTypes[Math.floor(Math.random() * fishTypes.length)]
  const randomY = Math.floor(Math.random() * 5) + 2 
  const tileSprites = getTile(0, randomY)
  const hasFish = tileSprites.some(s => s.type === fishMinnow || s.type === fishSalmon || s.type === fishGoldCarp || s.type === enemy)

  if (!hasFish) {
    if (gameOver == 0) {
      addSprite(0, randomY, randomType)
    }
  }
}

async function game() {
  setMap(levels[level])
  
  const p = getFirst(player)
  
  for (let i = 0; i < 4; i++) {
    p.x += 1;
    await sleep(400);
  }

  // give fisher his rod
  addSprite(p.x+1, p.y, rod)
  
  // place bobber
  addSprite(p.x + 1, p.y + 1, bobber) 

  let score = 0
  
  addText("Score: 0", { x: 1, y: 0, color: color`7` })
  
  function checkCollision(fish) {
  const b = getFirst(bobber);
  if (b && fish.x === b.x && fish.y === b.y) {
    // Patch: Check if the collision object is the enemy
    if (fish.type === enemy) {
      addText("GAME OVER", { x: 5, y: 5, color: color`3` });
      addText("Score: " + score , { x: 5, y: 7, color: color`3` });
      gameOver = 1
      playTune(endTune);
      const allFish = [...getAll(fishMinnow), ...getAll(fishSalmon), ...getAll(fishGoldCarp), ...getAll(enemy)];
      allFish.forEach(fish => fish.remove());
      getAll(line).forEach(l => l.remove())
      b.remove(); 
      return;
    }
    
    score += 1;
    addText("Score: " + score, { x: 1, y: 0, color: color`7` })
    playTune(catchTune);
    fish.remove();
  }
}

  let spawnInterval = 2000;
  const minSpawnInterval = 600;
  const spawnDecay = 0.96;

  let moveInterval = 500;
  const minMoveInterval = 150;
  const moveDecay = 0.997;

  function fishSpawnLoop() {
    spawnFish();
    
    const allFish = [...getAll(fishMinnow), ...getAll(fishSalmon), ...getAll(fishGoldCarp), ...getAll(enemy)];
    allFish.forEach(fish => checkCollision(fish));

    spawnInterval = Math.max(minSpawnInterval, spawnInterval * spawnDecay);
    setTimeout(fishSpawnLoop, spawnInterval);
  }
  
  function fishMoveLoop() {
    const allFish = [
      ...getAll(fishMinnow),
      ...getAll(fishSalmon),
      ...getAll(fishGoldCarp),
      ...getAll(enemy)
    ];

    allFish.forEach(fish => {
      if (fish.x == 7) {
        fish.remove();
      } else {
        fish.x += 1;
        checkCollision(fish); // Catch fish moving into the bobber
      }
    });

    // reduce wait time until it hits the cap
    moveInterval = Math.max(minMoveInterval, moveInterval * moveDecay);
    setTimeout(fishMoveLoop, moveInterval);
  }

  // Kick off both loops
  fishSpawnLoop();
  fishMoveLoop();

  setPushables({
    [ player ]: []
  })
  
  onInput("s", () => {
    const b = getFirst(bobber)
    
    if (b && b.y < 6) { 
      b.y += 1
      playTune(downTune);
      const allFish = [...getAll(fishMinnow), ...getAll(fishSalmon), ...getAll(fishGoldCarp), ...getAll(enemy)];
      allFish.forEach(fish => checkCollision(fish));
    }
  })
  
  onInput("w", () => {
    const b = getFirst(bobber)
    const p = getFirst(player)
    
    if (b && b.y > p.y + 1) {
      b.y -= 1
      playTune(upTune);
      const allFish = [...getAll(fishMinnow), ...getAll(fishSalmon), ...getAll(fishGoldCarp), ...getAll(enemy)];
      allFish.forEach(fish => checkCollision(fish));
    }
  })
  
  // add lines between bobber and rod on move
  afterInput(() => {
    const r = getFirst(rod)
    const b = getFirst(bobber)
    
    if (!r || !b) return
  
    // remove all lines
    getAll(line).forEach(l => l.remove())
  
    // add new lines between
    let currentY = r.y + 1
    while (currentY < b.y) {
      addSprite(r.x, currentY, line)
      currentY += 1
    }
  })
}

game()
