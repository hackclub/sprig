/*
@title: dino-square
@author: Efe-Cal
@addedOn: 06-21-2025
*/

const player = "p"

const block = "b"

setLegend(
  [player, bitmap`
................
................
.....0000.......
.....0..0.......
.....0..0.......
......00........
.....0000.......
....0.00.0......
...0..00..0.....
......00........
......00........
.....0000.......
.....0..0.......
.....0..0.......
.....0..0.......
.....0..0.......`],
  [block, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD......DDDDD
DDDD........DDDD
DDD..........DDD
DDD..........DDD
DDD..........DDD
DDD..........DDD
DDD..........DDD
DDD..........DDD
DDDD........DDDD
DDDDD......DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
)


let level = 0
const levels = [map`
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...p..b....b....b..`]

setMap(levels[level])

setPushables({
  [player]: []
})

function jump(h, d) {

  if (getFirst(player).y == height() - 1) {
    getFirst(player).y -= h
    setTimeout(() => {
      getFirst(player).y += h
    }, d)
  }
  if (getFirst(player).x == width() - 1) {
    getFirst(player).x -= h
    setTimeout(() => {
      getFirst(player).x += h
    }, d)
  }
  if (getFirst(player).y == 0) {
    getFirst(player).y += h
    setTimeout(() => {
      getFirst(player).y -= h
    }, d)
  }
  if (getFirst(player).x == 0) {
    getFirst(player).x += h
    setTimeout(() => {
      getFirst(player).x -= h
    }, d)
  }
}


onInput("w", () => { jump(1, 1000) })
onInput("s", () => { jump(2, 1500) })
let floor = 0

const gameLoop = () => {

  // movement 
  if (getFirst(player).x < width() - 1 && floor == 0) {
    getFirst(player).x += 1
    if (getFirst(player).x == width() - 1) floor = 1
  } else if (0 < getFirst(player).y && floor == 1) {
    getFirst(player).y -= 1
    if (getFirst(player).y == 0) floor = 2
  } else if (0 < getFirst(player).x && floor == 2) {
    getFirst(player).x -= 1
    if (getFirst(player).x == 0) floor = 3
  } else if (height() - 1 > getFirst(player).y && floor == 3) {
    getFirst(player).y += 1
    if (getFirst(player).y == height() - 1) floor = 0
  }


  // Game Over
  if (tilesWith(player, block).length != 0) {
    console.log("Game Over");
    clearText();
    addText("Game Over", {
      x: 5,
      y: 5,
      color: color`3`
    });
  } else {
    setTimeout(() => { gameLoop() }, 500)
  }
}


function checkSpritesInRange_({ x, y }) {

  // Check neighboring tiles for sprites
  var neighborSprites = [];

  const neighbors = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 }
  ];

  neighbors.forEach(neighbor => {
    if (!(neighbor.x > width() || neighbor.y > height() || neighbor.x < 0 || neighbor.y < 0)) {
      console.log(neighbor.x, neighbor.y)
      let sprites = []
      sprites = getTile(neighbor.x, neighbor.y);
      console.log(neighborSprites.length)
      neighborSprites.push(...sprites);
    }
  });

  return neighborSprites.length > 0;
}

function checkSpritesInRange({ x, y }) {
  const neighbors = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 }
  ];
  getAll(block).forEach(b => {
    neighbors.forEach(n => {
      if (n.x == b.x && n.y == b.y) {
        return true;
      }
    })
  })
}

function blockGen0() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      let blocks = getAll(block)
      let y, minus_x

      do {
        y = Math.floor(Math.random() * height())
        minus_x = (Math.random() < 0.75 ? 0 : 1) + 1
      } while (checkSpritesInRange({ "x": width() - minus_x, "y": y }))
      addSprite(width() - minus_x, y, block)
    }, 2500 * i)
  }
}

function blockGen1() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      let blocks = getAll(block)
      let x, plus_y
      do {
        x = Math.floor(Math.random() * width())
        plus_y = (Math.random() < 0.25 ? 1 : 0)
      } while (checkSpritesInRange({ "x": x, "y": plus_y }))
      addSprite(x, plus_y, block)
    }, 2500 * i)
  }
}

function blockGen2() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      let blocks = getAll(block)
      let x, y
      do {
        x = (Math.random() < 0.25 ? 1 : 0)
        y = Math.floor(Math.random() * height())
      } while (checkSpritesInRange({ "x": x, "y": y }))
      addSprite(x, y, block)
    }, 2500 * i)
  }
}

function clearAll(type) {
  getAll(type).forEach(sprite => {
    sprite.remove()
  })
}

function blockGen3() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      let blocks = getAll(block)
      let x, minus_y
      do {
        x = Math.floor(Math.random() * width())
        minus_y = (Math.random() < 0.75 ? 1 : 0) + 1
      } while (checkSpritesInRange({ "x": x, "y": height() - minus_y }))
      addSprite(x, height() - minus_y, block)
    }, 2500 * i)
  }
  setTimeout(() => { clearAll(block) }, 15000)
}

const blockGen = () => {

  function wait(_floor) {
    if (floor == _floor) {
      switch (_floor) {
        case 0:
          blockGen0()
          break;
        case 1:
          blockGen1()
          break;
        case 2:
          blockGen2()
          break;
        case 3:
          blockGen3()
          break;
      }
    } else {
      setTimeout(() => { wait(_floor) }, 100)
    }
  }

  function work() {
    wait(0)
    wait(1)
    wait(2)
    wait(3)
  }
  work()
  for (let i = 1; i < 100; i++) {
    setTimeout(() => { clearAll(block);
      work() }, (width() + height()) * 2 * 500 * i)
  }

}

gameLoop()
setTimeout(blockGen, 3000)