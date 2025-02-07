/*
@title: chickenwwwwwww
@author: riyaad
@tags: ['endless', 'retro', 'adventure', 'survival']
@addedOn: 2025-01-22
*/

const chicken = "f"
const car = "c"
const road = "r"
const sidewalk = "s"
const house = "h"
setLegend(
  [ chicken, bitmap`
................
................
................
................
......666.......
.....66666......
.....60666......
..999666666.....
.9996666666.....
....66666666....
....66666666....
....6606606.....
......0..0......
.....00.00......
................
................` ],
  [ car, bitmap`
................
................
................
................
.......55555....
......5575775...
.....55775775...
....5577757755..
..5555555555555.
555555555555555.
6550005555500055
5550105555501055
...000.....000..
................
................
................` ],
  [ road, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0666006666006660
0666006666006660
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ sidewalk, bitmap`
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
LLLLLLLLLLLLLLLL` ],
  [ house, bitmap`
................
.......CC.......
.......CC.......
.......CC.......
.....333C33.....
....33333333....
...3333333333...
..333333333333..
...CCCCCCCCCC...
...CCCCCCCCCC...
...C777CCCCCC...
...C777CCCCCC...
...C777CC000C...
...CCCCCC000C...
...CCCCCC600C...
...CCCCCC000C...` ],
)

setSolids([chicken, house])
setBackground(sidewalk)

let dead;
let moved = true
let score = 0
function spawn() {
  dead = false;
  clearText()
  addText("0", {x:0, color: color`5`})
  setMap(map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
......f......`)
  for(let y = 0;y < height() - 1;y++)generateRow(y)
  loop()
}
spawn()

function loop() {
  if(dead) return;
  moved = false;
  getAll(car).forEach(c=>{
    if(c.x == 0) c.remove()
    else c.x--
  })
  if(tilesWith(chicken, car).length > 0) {
    addText("You died!", {color: color`3`})
    dead = true;
    moved = true;
  }
  const newCar = ~~(Math.random() * height())
  const tile = getTile(width()-1, newCar);
  if(tile.length == 1 && tile[0].type == road) addSprite(width() - 1, newCar, car)
  setTimeout(loop, 250)
}

function generateRow(y) {
  if(Math.random() < 0.5) {
    for(let x = 0;x < width();x++) addSprite(x, y, road)
  } else if(Math.random() < 0.4) {
    for(let x = 0;x < width();x++) {
      if(Math.random() < 0.5) addSprite(x, y, house)
    }
  }
}

onInput("w", () => {
  if(moved) return;
  if(--getFirst(chicken).y < height() - 2) {
    getAll().forEach(s=>{
      if(s.y == height() - 1) s.remove()
      else s.y++
    })
    generateRow(0)
    score++
  }
})

onInput("s", () => {
  if(moved) return;
  getFirst(chicken).y++
  score--
})

onInput("a", () => {
  if(moved) return;
  getFirst(chicken).x--
})

onInput("d", () => {
  if(moved) return;
  getFirst(chicken).x++
})

afterInput(() => {
  if(dead == true) spawn()
  moved = true;
  if(tilesWith(chicken, car).length > 0) {
    addText("You died!", {color: color`3`})
    dead = true;
  } else {
    clearText()
    addText(""+score, {x:0, color: color`5`})
  }
})
