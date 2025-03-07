const chicken = "k"
const car = "c"
const road = "r"
const sidewalk = "s"
const house = "h"
setLegend(
  [ chicken, bitmap`
.........333....
.........33331..
..........33211.
.........122020.
.........122221.
..1111.111222999
.1122111222221..
11212222222221..
12221222222221..
11122112222221..
..11222222221...
....11222211....
.....911119.....
.....9....9.....
....9.9..9.9....
................` ],
  [ car, bitmap`
................
................
................
................
......55555.....
.....77557775...
....777557775...
...77755577755..
.655555555555555
.555555555555555
.550005555000555
...020....020...
...000....000...
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
0222002222002220
0222002222002220
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ sidewalk, bitmap`
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
1111111111111111` ],
  [ house, bitmap`
................
................
..........L1....
......33331L....
.....33333L1....
....3333333L....
...3333333333...
..333333333333..
...9999999999...
...9999999999...
...9999997779...
...9999997779...
...9000997779...
...9000999999...
...9006999999...
...9000999999...` ],
)

setSolids([chicken, house])
setBackground(sidewalk)

let dead;
let moved = true
let score = 0
function spawn() {
  dead = false;
  clearText()
  addText("0", {x:0, color: color`3`})
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
......k......`)
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
    addText("You failed!", {color: color`9`})
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
