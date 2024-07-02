// Goal of the game is to break buildings
// Controlls are "a" to go left, "d" to go right, and "i" to break buildings
// You must be facing and right beside the block you want to break

let isKeyDown = {};
const monkeyRight = "m"
const monkeyLeft = "l"
const monkeyAttackLeft = "8"
const monkeyAttackRight = "9"

const ground = "g"
const building1 = "1"
const building2 = "2"
const building3 = "3"

let isAttacking = false
let player = monkeyRight
let isFacingRight = true
let brokenBuildingCount = 0
let buildingCountText = {}
let countdown = 60
let countdownInterval

const checkBlock = () => {
  const playerSprite = getFirst(player);
  let nextX = playerSprite.x + (isFacingRight ? 1 : -1)
  const nextTile = getTile(nextX, playerSprite.y)

  nextTile.forEach(sprite => {
    if (sprite.type === building1) {
      sprite.type = building2
    }
  })
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const breakBuilding = (block) => {
  if (block) {
    const y = block.y;
    block.remove();
    respawnBuilding(block.x, y);
    brokenBuildingCount++;
    buildingCountText = addText(`Buildings Broken: ${brokenBuildingCount}`, {
      x: 0,
      y: 3,
      size: 25
    });
  } else {
    console.log("Error: Attempting to break a non-existing building.");
  }
} 

const checkBrokenBuildings = () => {
  getAll(building2).forEach(block => {
    if (block.type === building2) {
      const adjacentTileRight = getTile(block.x + 1, block.y);
      const adjacentTileLeft = getTile(block.x - 1, block.y);
      if (adjacentTileRight.some(sprite => sprite.type === monkeyAttackRight) ||
          adjacentTileLeft.some(sprite => sprite.type === monkeyAttackLeft)) {
        breakBuilding(block);
      }
    }
  });
}

const respawnBuilding = (y) => {
  let newX = getRandomInt(24);
  const maxAttempts = 100;
  let loopCount = 0;

  // Limit newX within the bounds of the game map
  while (getTile(newX, y).length > 0 && loopCount < maxAttempts) {
    newX = getRandomInt(24);
    loopCount++;
  }

  // Check if newX is within the bounds, then add the sprite while keeping the y coordinate constant
  if (loopCount < maxAttempts) {
    const boundedX = Math.min(Math.max(newX, 0), width() - 1);
    if (getTile(boundedX, y).length === 0) {
      addSprite(boundedX, 5, building1);
    } else {
      console.log("Sprite cannot be placed out of bounds.");
    }
  } else {
    console.log("Unable to respawn building after 100 attempts.");
  }
} 

const changeBlockToBuilding3 = (block) => {
  block.type = building3;
}
setLegend(
  [monkeyRight, bitmap`
  ......0000000...
  0....0CCCCCCC0..
  C0..0CCCCCCCCC0.
  0C0.0C00CFFFFF0.
  0C0.00FFCF00FF0.
  0C0.00FFCF00FF0.
  0C0.0C00CFFFFF00
  0C0.0CCCFFFFFFF0
  0C0.0CCFFFFFFFF0
  0C0.0CC0000FF000
  0CC00CC0CC0FFFF0
  .0CC0CC0CC0FFF0.
  ..000CC0000CC0..
  ....0CCCCCCCC0..
  ....0C000000C0..
  ....000....000..`],
  [monkeyLeft, bitmap`
...0000000......
..0CCCCCCC0....0
.0CCCCCCCCC0..0C
.0FFFFFC00C0.0C0
.0FF00FCFF00.0C0
.0FF00FCFF00.0C0
00FFFFFC00C0.0C0
0FFFFFFFCCC0.0C0
0FFFFFFFFCC0.0C0
000FF0000CC0.0C0
0FFFF0CC0CC00CC0
.0FFF0CC0CC0CC0.
..0CC0000CC000..
..0CCCCCCCC0....
..0C000000C0....
..000....000....`],
  [monkeyAttackRight,  bitmap`
  ....0000000.....
  ...0CCCCCCC0....
  ..0CCCCCCCCC0...
  0.0C00CFFFFF0...
  0.00FFCF00FF0...
  0.00FFCF00FF0000
  0.0C00CFFFFF00C0
  0.0CCCFFFFFFF0C0
  0.0CCFFFFFFFF000
  0.0CC0000FF000..
  C00CC0CC0FFFF0..
  CC0CC0CC0FFF0...
  000CC0000CC0....
  ..0CCCCCCCC0....
  ..0C000000C0....
  ..000....000....`],
  [monkeyAttackLeft,  bitmap`
.....0000000....
....0CCCCCCC0...
...0CCCCCCCCC0..
...0FFFFFC00C0.0
...0FF00FCFF00.0
0000FF00FCFF00.0
0C00FFFFFC00C0.0
0C0FFFFFFFCCC0.0
000FFFFFFFFCC0.0
..000FF0000CC0.0
..0FFFF0CC0CC00C
...0FFF0CC0CC0CC
....0CC0000CC000
....0CCCCCCCC0..
....0C000000C0..
....000....000..`],
  [ground, bitmap`
0000000000000000
0000000000000000
0C00000C0000000C
0CC00CCCC0CC0CC0
CCCC0CCCC00CCCCC
CCCC0CCCCCCCCCCC
CC0CCCCCCCCCC0CC
CCCCCCCCCC0CCCC0
0CCCCC0CCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCC0CCCC0C
CCC0CCCCCCCCCCCC
CCCCC0CCCCCCCCCC
CCCCCCCCCCCCC0CC
CC0CCCCCCC0CCCCC
CCCCCC0CCCCCCCC0`],
  [building1, bitmap`
  
.....111111.....
....1LLLLLL1....
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...`],
  [building2, bitmap`
................
....L...........
...1L...........
...1L......L....
...1LL....7L1...
...1LL7.7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...`],
  [building3, bitmap`
................
................
................
................
................
................
1...............
LL..............
L0..............
LLL.............
L00L0...........
LLLLLLL.........
L00L00L00..0....
LLLLLLLLL.LL....
LLLLLLLLLLLLL.L.
1111111111111.LL`],
)

setSolids([monkeyRight, monkeyLeft, ground, building1, building2, monkeyAttackRight, monkeyAttackLeft])
let level = 0
const levels = [
  map`
........................
........................
........................
........................
........................
m....1..................
gggggggggggggggggggggggg`
]

setMap(levels[level])
  
onInput("d", () => {
  getFirst(player).x += 1
  getFirst(player).type = monkeyRight
  player = monkeyRight
  isFacingRight = true
})

onInput("a", () => {
  getFirst(player).x -= 1
  getFirst(player).type = monkeyLeft
  player = monkeyLeft
  isFacingRight = false
})

onInput("i", () => {
  const playerSprite = getFirst(player);
  if (playerSprite && playerSprite.x !== undefined && playerSprite.y !== undefined) {
    if (isFacingRight) {
      playerSprite.type = monkeyAttackRight;
      player = monkeyAttackRight;
    } else {
      playerSprite.type = monkeyAttackLeft;
      player = monkeyAttackLeft;
    }
  
    checkBlock();

    const nextX = playerSprite.x + (isFacingRight ? 1 : -1)
    const nextTile = getTile(nextX, playerSprite.y);

    nextTile.forEach(sprite => {
      if (sprite.type === building2) {
        changeBlockToBuilding3(sprite);
        breakBuilding(sprite);
      }
    })
  }
})

afterInput(() => {
  checkBrokenBuildings();
});
