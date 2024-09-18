/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Flood
@author: TheTruePickle 
@tags: []
@addedOn: 2024-09-18
*/

const player = "p"
const ship = "s"
const water = "w"
const wall = "l"
const fakeWater = "n"
const bg = "b"
const shipIsNotRemoved = true
var currentLevel = -1
var running = false
var interval = null
setLegend(
  [player, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000`],
  [ship, bitmap`
................
....33333333....
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
................`],
  [water, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [fakeWater, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [bg, bitmap`
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
0000000000000000`]
)

setSolids([])
let level = -1
const levels = [
  map`
................
................
................
................
.......p........
................
............s...
.......w........
................
................
................
................
................
................
................
................`,
  map`
...............s
................
................
.s..........p...
................
.w..............
................
................
....w...........
................
................
................
.........ww.....
..........ww....
...........w....
................`,
  map`
................
................
.s..............
................
............s...
................
................
.w..............
................
................
................
................
.............s..
.w......w.......
................
p...............`,
  map`
wwww............w
wwww.............
www.............s
ww...............
w................
w................
w...........s....
w............s...
w................
ww...............
ww...............
ww............s.l
www..............
wwww..........l..
pwwwww.......l..w`,
  map`
w...........lwls
.w...s......l.l.
..w.........l.l.
...w........l.l.
....w.......lsl.
.....w......lsl.
......w.....l.l.
.......w........
........w.......
.........w......
..........w.....
...........w....
..s.........w...
.............w..
..............w.
p..............w`,
  map`
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
................
................
................
................
................
.......p........
................
................
................
................
................
................
......ssssss....`,
  map `
...........s...w
................
................
................
..........s.....
.............s..
................
.......p........
................
................
..........s.....
............s...
.......s........
................
................
...........s....`,
  map `
wwwww..........l
wwww...........s
www.............
ww..............
w...............
................
................
........p.......
............s...
..............s.
................
................
s..s...s........
............s...
................
.......s........`,
  map `
..............ww
.s.l...........w
...........l....
......s......l..
l.l.............
........l.......
.....ls.........
........pll..l.l
...s.........ls.
....l....s......
l..........l....
....s...........
.s......l.......
................
.l.l.....l.s....
w...............`,
  map`
w.w..........w.w
.w......lll...w.
w.w.......ll.w.w
...l.......l....
.l...s.s..s.l...
ll..s......s.l..
l..s........s.l.
l......ss......l
.l.............l
.l....p........l
..ll..........ll
....l..ssl.lll..
....ll...l......
w.w...l..lll.w.w
.w.......lll..w.
w.w.......l..w.w`
]
const mainMenu = map `
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.ww
wwbbbbbwbwbwbbbwwwwwwwwwwwwwwwwbw.w
wwwwbwwwbwbwbwwwwwwwwwwwwwwwwwww.ww
wwwwbwwwbbbwbbbwwwwwwwwwwwwwwwwwwww
wwwwbwwwbwbwbwwwwwwwwwwwwwwwwwww.ww
wwwwbwwwbwbwbbbwwwwwwwwwwwwwwww.w.w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwbww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwbbbbwbwwwwbbbbwbbbbwbbbwwwwwwwwww
wwbwwwwbwwwwbwwbwbwwbwbwwbwwwwwwwww
wwbbwwwbwwwwbwwbwbwwbwbwwbwwwwwwwww
wwbwwwwbwwwwbwwbwbwwbwbwwbwwwwwwwww
wwbwwwwbbbbwbbbbwbbbbwbbbwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwww.....wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwww.wwwwwwwwwwwwwwwwwwwww
wwwwwbbwwwwww.www...wwwwwwwwwwwwwww
wwwwwbbwwwwww.www.w.wwwwwwwwwwwwwww
wwwwwwwwwwwww.www...wwwwwwwwwwwwwww
wwbbwwww..wwwwwwwwwwwwwwwwwwwwwwwww
wwbbwwww..www...ww.wwwwwwwwwww.wwww
wwwwwwwwwwwww.wwww.wwwwwwwwwww.wwww
wwwwwbbwwwwww...w...w...w...w...www
wwwwwbbwwwwwwww.ww.ww.w.w.wwww.wwww
wwwwwwwwwwwww...wwwww...w.wwww.wwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
const lostMenu = map`
wswwsw
w.ww.w
wwwwww
......
.wwww.`
const explainyThing = map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbsbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bwwwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bwwwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bwwwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
blllbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
blllbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
blllbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bb.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
b.blbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bb.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
b.b.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bb.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`

function setMain() {
  setMap(mainMenu)
  addText("Rules", { x: 10, y: 1, color: color`2` })
  addText("Return", { x: 10, y: 3, color: color`2` })
}

function isGameOver() {
  if (getAll(water).length == 0) {
    level++
    if (interval != null) {
      clearInterval(interval)
      running = false
    }
    if (level == 10) {
      level = -1
      setMain()
    }
    else
    {
      setMap(levels[level])
    }
  }
  if (getAll(ship).length <= level) {
    if (interval != null) {
      clearInterval(interval)
      running = false
    }
    console.log(level)
    level = -2
    setMap(lostMenu)
  }
}

function setIfClear(x, y, type) {
  if (getAll(ship) != 0 && getTile(x, y).length != 0) {
    if (getTile(x, y)[0].type == ship) {
      clearTile(x, y)
    }
  }
  if (0 <= x && x < width() && 0 <= y && y < height() && getTile(x, y).length == 0) {
    addSprite(x, y, type)
  }
}

function updateWater() {
  const waterArray = getAll(water)
  for (let i = 0; i < waterArray.length; i++) {
    const currentWater = waterArray[i]
    const x = currentWater.x
    const y = currentWater.y
    setIfClear(x + 1, y, water)
    setIfClear(x - 1, y, water)
    setIfClear(x, y + 1, water)
    setIfClear(x, y - 1, water)
    clearTile(x, y)
    addSprite(x, y, fakeWater)
  }
}

function gameUpdate(playerSprite, addWall) {
  if (addWall) {
    const x = playerSprite.x
    const y = playerSprite.y
    if (getTile(x, y).length != 1) {
      return;
    }
    clearTile(x, y)
    addSprite(x, y, wall)
    updateWater()
    addSprite(x, y, player)
  } else {
    updateWater()
  }
  isGameOver()
}

function endMap() {
  running = true
  interval = setInterval(() => {
    gameUpdate(getFirst(player), false)
  }, 200)
}
setMain()
onInput("l", () => {
  if (level >= 0) {
    gameUpdate(getFirst(player), true)
  } else if (level == -2) {
    level++
    setMain()
  } else if (level == -1) {
    level++
    clearText()
    setMap(levels[level])
  }
});
onInput("i", () => {
  if (level < 0) return;
  getFirst(player).remove()
  if (!running) {
    endMap()
  }
});
onInput("w", () => {
  if (level < 0 || getAll(player).length == 0) return;
  getFirst(player).y -= 1
});
onInput("s", () => {
  if (level < 0 || getAll(player).length == 0) return;
  getFirst(player).y += 1
});
onInput("a", () => {
  if (level < 0 || getAll(player).length == 0) return;
  getFirst(player).x -= 1
});
onInput("d", () => {
  if (level < 0 || getAll(player).length == 0) return;
  getFirst(player).x += 1
});
onInput("j", () => {
  currentLevel = level
  level = -3
  setMap(explainyThing)
  addText("Rules:protect ships", { x: 1, y: 1, color: color`2` })
  addText("Water moves every\ntime you place a \nwall", { x: 3, y: 3, color: color`2` })
  addText("Walls block water", { x: 3, y: 7, color: color`2` })
  addText("To place a wall", { x: 3, y: 9, color: color`2` })
  addText("To autocomplete\nthe level\n", { x: 3, y: 11, color: color`2` })
});
onInput("k", () => {
  if (level != -3) return;
  level = currentLevel
  clearText()
  if (level < 0) {
    level = -1
    setMain()
  } else {
    setMap(levels[level])
  }
});

