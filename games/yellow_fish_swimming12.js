/*
@title: yellowman12
@author: cheter
@tags: []
@addedOn: 2024-12-13
*/

const player = "p"
const box = "b"
const goal = "g"
const playera = "a"
const shark = "s"
const aqua = "a"
const kelp = "k"

setLegend(
  [player, bitmap`
................
................
................
...666..........
...66666........
...6666666......
.66666666666....
.666666660666...
.996666666666...
...66666669.....
...6666699......
...66669........
...9999.........
................
................
................`],
  [box, bitmap`
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
   [shark, bitmap`
..........0.....
.........00.....
........010.....
.......0110.....
...0000111000...
..0111111111L0.0
.0111101111L1L0L
03232111111L1L10
02323111111L1L10
.01111111111L101
..0111111111L0.0
...0000011100...
.......01110....
........010.....
.........0......
................`],
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [playera, bitmap`
................
................
...6666.........
...666666.......
...666666666....
...666666666....
.6666666606666..
.6666600066663..
.6666606666666..
...666666666....
...66666........
...666..........
................
................
................
................`],
  [aqua, bitmap`
2775777777777577
7777727777777777
7777777727775777
7777777777777777
7727577777777277
7777777777727777
7777777727777777
7777777777777777
5777277777775777
7777777775777757
7777777577777777
7777777777727777
7577277777777577
7777777727757777
7777777777277777
7777277777777777`],
  [kelp, bitmap`
.........D......
.........D......
.........D......
.........D......
.........D......
D........D......
DD......D......D
..DD....D....DDD
...DD...D...DD..
....DD..D.DDD...
D....DD.D.D.....
.DDD..D.D.D...DD
...DDDDDDDDDDD..
......DDDDD.....
......DDDDD.....
......DDDDD.....`]
)
levels = [map`
..............g
..............g
..............g
p.............g
..............g
..............g
..............g`]

level = 0
levelCount = 0;
speed=650
setMap(levels[level])

setPushables({
  [player]: []
})

setSolids([player, kelp])

setBackground(aqua)

function spawnkelp() {
    randomnumber = Math.floor(Math.random() * 3)+4
    for (let i = 0; i < randomnumber; i++) {
    randomykelp = Math.floor(Math.random() * height())
    randomxkelp = Math.floor(Math.random() * (width() - 2))
    addSprite(randomxkelp, randomykelp, kelp)
    }
}

spawnkelp()
function sharkfunc() {
  randomy = Math.floor(Math.random() * height())
  randomx = Math.floor(Math.random() * 3)+1
  addSprite(width()-randomx, randomy, shark)
  sharks = getAll(shark)
  for (let i = 0; i < sharks.length; i++) {
    if (tilesWith(player, shark).length > 0) {
      setMap(levels[level])
      levelCount = 0;
      clearText();
      spawnkelp()
    speed=650
    }
    
    if (sharks[i].x<1) {
        clearTile(sharks[i].x, sharks[i].y)
    }
    if (sharks[i].x>0) {
      sharks[i].x-=1
    }
    
    if (tilesWith(player, shark).length > 0) {
      setMap(levels[level])
      levelCount = 0;
      clearText();
      spawnkelp()
    speed=650
    }
  }
  clearText()
  addText("level: " + levelCount, {x: 6, y: 1, color: color`9`})
  setTimeout(() => {
    sharkfunc()
  }, speed)
}

setTimeout(() => {
  sharkfunc()
}, speed)
onInput("s", () => {
  getFirst(player).y += 1
  if (tilesWith(player, shark).length > 0) {
    setMap(levels[level])
    levelCount = 0;
    spawnkelp()
    speed=650
  }
})
onInput("w", () => {
  getFirst(player).y -= 1
  if (tilesWith(player, shark).length > 0) {
    setMap(levels[level])
    levelCount = 0;
    spawnkelp()
    speed=650
  }
})

onInput("d", () => {
  getFirst(player).x += 1
  if (tilesWith(player, shark).length > 0) {
    setMap(levels[level])
    levelCount = 0;
    spawnkelp()
    speed=650
  }
})

afterInput(() => {
  if (tilesWith(player, goal).length > 0) {
    setMap(levels[level])
    levelCount++;
    spawnkelp()
    if (speed>100) {
      speed-=60
    }
  }
  if (tilesWith(player, shark).length > 0) {
    setMap(levels[level])
    levelCount = 0;
    spawnkelp()
    speed=650
  }
})
