/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dodgy Day
@author: Neelesh Chevuri
@tags: []
@addedOn: 2024-06-09
*/

const player = 'p'
const vBomb = 'b'
const hBomb = 'h'
const heart = 'e'
const tBomb = 't'
const rBomb = 'r'
const dBomb = 'd'
const difuse1 = 'f'
const difuse2 = 'g'
const difuse3 = 'o'
const difuse4 = 'j'
const difuse5 = 'k'
const difuse6 = 'l'

setLegend(
  [player, bitmap`
......0000......
.....000000.....
.....000000.....
.....000000.....
.....000000.....
......0000......
.......00.......
.....000000.....
....0.0000.0....
....0.0000.0....
......0000......
......0000......
......0..0......
......0..0......
......0..0......
......0..0......`],
  [vBomb, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`],
  [hBomb, bitmap`
................
................
.....HHHHHH.....
...HHHHHHHHHH...
...HHHHHHHHHH...
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
...HHHHHHHHHH...
...HHHHHHHHHH...
.....HHHHHH.....
................
................`],
  [heart, bitmap`
...........99...
..99......9999..
.99999...99999..
.999999.9999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.9999999999999..
..999999999999..
...9999999999...
....99999999....
......99999.....
........99......
................`],
  [tBomb, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [dBomb, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`],
  [rBomb, bitmap`
................
................
.....HHHHHH.....
...HHHHHHHHHH...
...HHHHHHHHHH...
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
...HHHHHHHHHH...
...HHHHHHHHHH...
.....HHHHHH.....
................
................`],
  [difuse1, bitmap`
................
................
.....777777.....
...7777777777...
...7777777777...
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
...7777777777...
...7777777777...
.....777777.....
................
................`],
  [difuse2, bitmap`
................
................
.....777777.....
...7777777777...
...7777777777...
..777777777777..
..777737737777..
..777773377777..
..777773377777..
..777737737777..
..777777777777..
...7777777777...
...7777777777...
.....777777.....
................
................`],
  [difuse3, bitmap`
................
................
.....777777.....
...7777777777...
...7777777777...
..777377773777..
..777733337777..
..777733337777..
..777733337777..
..777733337777..
..777377773777..
...7777777777...
...7777777777...
.....777777.....
................
................`],
  [difuse4, bitmap`
................
................
.....777777.....
...7777777777...
...7377777737...
..777333333777..
..777333333777..
..777333333777..
..777333333777..
..777333333777..
..777333333777..
...7377777737...
...7777777777...
.....777777.....
................
................`],
  [difuse5, bitmap`
................
................
.....777777.....
...3777777773...
...7333333337...
..773333333377..
..773333333377..
..773333333377..
..773333333377..
..773333333377..
..773333333377..
...7333333337...
...3777777773...
.....777777.....
................
................`],
  [difuse6, bitmap`
................
................
.....777777.....
...3333333333...
...3333333333...
..733333333337..
..733333333337..
..733333333337..
..733333333337..
..733333333337..
..733333333337..
...3333333333...
...3333333333...
.....777777.....
................
................`]
)

setSolids([player, heart])

let level = 0

var timeSecs = 0;
var health = 3;

const levels = [
  map`
eee..........h.
..........b....
...............
........r......
...............
...............
..d............
h..............
...............
.........f.....
......b......p.
...............`
]

setMap(levels[level])

setPushables({
  [player]: []
})

// Movement Input
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {

})

// Random Number Gen
function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt(max) {
  const typedArray = new Uint32Array(1);
  crypto.getRandomValues(typedArray);
  const res = typedArray % (max + 1);

  return res;
}

// player died
function PlayerOver() {
  playerObj.remove();
  addText("GAME OVER\nScore: " + timeSecs, {
    x: 5,
    y: 12,
    color: color`5`
  });
  // gameOver = true;
  clearInterval(gameInterval);
  clearInterval(bombInterval);
  clearInterval(timeInterval);
}

// New Spawn Logic
function SpawnBombNew(type) {
  if (type == vBomb) {
    let x = playerObj.x + getRandomInt(2) - 1 //getRndInt(-1,1);
    if (x < 0)
      x = 0;
    if (x > width() - 1)
      x = width() - 1;
    addSprite(x, 0, tBomb);
  } else if (type == hBomb) {
    let y = playerObj.y + getRandomInt(2) - 1 //getRndInt(-1,1);
    if (y < 0)
      y = 0;
    if (y > height() - 1)
      y = height() - 1;
    addSprite(0, y, tBomb);
  } else if (type == dBomb) {
    let x = playerObj.x + getRandomInt(2) - 1 //getRndInt(-1,1);
    if (x < 0)
      x = 0;
    if (x > width() - 1)
      x = width() - 1;
    addSprite(x, height() - 1, tBomb);
  } else if (type == rBomb) {
    let y = playerObj.y + getRandomInt(2) - 1 //getRndInt(-1,1);
    if (y < 0)
      y = 0;
    if (y > height() - 1)
      y = height() - 1;
    addSprite(width() - 1, y, tBomb);
  }
}

// difuse logic
function DifuseLogic() {
  var d1 = getAll(difuse1);
  var d2 = getAll(difuse2);
  var d3 = getAll(difuse3);
  var d4 = getAll(difuse4);
  var d5 = getAll(difuse5);
  var d6 = getAll(difuse6);

  let cnt = d1.length + d2.length + d3.length + d4.length + d5.length + d6.length;
  // spawn if none
  if (cnt == 0) {
    let x = getRndInt(playerObj.x-5, playerObj.x+5);
    let y = getRndInt(playerObj.y-5, playerObj.y+5);
    if (x < 0)
      x = 0;
    if (x > width()-1)
      x = width()-1;
    if (y < 1)
      y = 1;
    if (y > height()-1)
      y = height()-1;
    addSprite(x, y, difuse1);
  }
  
  // difuse progression
  d1.forEach(d1s => {
    d1s.type = difuse2;
  });
  d2.forEach(d2s => {
    d2s.type = difuse3;
  });
  d3.forEach(d3s => {
    d3s.type = difuse4;
  });
  d4.forEach(d4s => {
    d4s.type = difuse5;
  });
  d5.forEach(d5s => {
    d5s.type = difuse6;
  });
  d6.forEach(d6s => {
    health = 0;
  });

}

// Bomb Logic New
function BombLogicNew() {
  var vBombSprites = getAll(vBomb);
  var hBombSprites = getAll(hBomb);
  var rBombSprites = getAll(rBomb);
  var dBombSprites = getAll(dBomb);
  var tBombSprites = getAll(tBomb);


  // temp bombs
  tBombSprites.forEach(tBSprite => {
    let x = tBSprite.x;
    let y = tBSprite.y;

    let typ = hBomb;
    if (y == 0)
      typ = vBomb;
    else if (y == height() - 1)
      typ = dBomb;

    if (x == width() - 1)
      typ = rBomb;

    tBSprite.remove();
    addSprite(x, y, typ);
  });

  // vertical bombs
  vBombSprites.forEach(vBSprite => {
    if (vBSprite.y == height() - 1) {
      // Spawn New Bomb
      SpawnBombNew(vBomb);
      vBSprite.remove()
      IncreaseSpeed();
    }
    vBSprite.y += 1;
  });

  dBombSprites.forEach(dBSprite => {
    if (dBSprite.y == 0) {
      // Spawn New Bomb
      SpawnBombNew(dBomb);
      dBSprite.remove()
      IncreaseSpeed();
    }
    dBSprite.y -= 1;
  });

  // Horizontal bombs
  hBombSprites.forEach(hBSprite => {
    if (hBSprite.x == width() - 1) {
      // Spawn New Bomb
      SpawnBombNew(hBomb);
      hBSprite.remove();
      IncreaseSpeed();
    }
    hBSprite.x += 1
  });

  rBombSprites.forEach(rBSprite => {
    if (rBSprite.x == 0) {
      // Spawn New Bomb
      SpawnBombNew(rBomb);
      rBSprite.remove();
      IncreaseSpeed();
    }
    rBSprite.x -= 1
  });
}


// Increase speed
function IncreaseSpeed() {
  clearInterval(bombInterval);
  let bombDelay = 800 - timeSecs * 10;
  if (bombDelay < 200)
    bombDelay = 200;
  bombInterval = setInterval(BombLogicNew, bombDelay);
}

var hit = false;
// Main Game Loop
const playerObj = getFirst(player);

function GameLoop() {

  if (health <= 0)
    PlayerOver();
  
  var playerTile = getTile(playerObj.x, playerObj.y);
  // loop through the sprites at the tile
  if (playerTile.length < 2) {
    hit = false;
  }
  if (!hit) {
    playerTile.forEach(sprite => {
      if (sprite.type === vBomb || sprite.type === hBomb || sprite.type === dBomb || sprite.type === rBomb) {
        hit = true;
        health--;
        UpdateHearts();
      } else if (sprite.type === difuse1 || sprite.type === difuse2 || sprite.type === difuse3 || sprite.type === difuse4 || sprite.type === difuse5 || sprite.type === difuse6) {
        sprite.remove();
      }
    });
  }
}

function UpdateHearts() {
  if (health == 2) {
    getAll(heart)[0].remove();
  } else if (health == 1) {
    getAll(heart)[0].remove();
  } else if (health <= 0) {
    getAll(heart)[0].remove();
    PlayerOver();
  }
}

// Time increase, used for difficulty later
function UpdateTime() {
  timeSecs++;
}

// Run the logic loops periodically

const difuseInterval = setInterval(DifuseLogic, 1000);

const gameInterval = setInterval(GameLoop, 50);

var bombInterval = setInterval(BombLogicNew, 800);

const timeInterval = setInterval(UpdateTime, 1000);