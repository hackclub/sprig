/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Untitled chicken game
@author: 
@tags: []
@addedOn: 2024-00-00
*/
const seagull = "f"
const automobile = "c"
const road = "r"
const footpath = "s"
const office= "h"
setLegend(
  [ seagull, bitmap`
................
................
................
................
.....00000......
....0222220.....
...022222220....
...020220220....
...022922220....
...022222220....
...0222222220...
...0222222200...
...022222220....
....0000000.....
.....9...9......
................` ],
  [ automobile, bitmap`
................
................
................
................
......000000....
.....0072770....
..0000772770000.
.06222222222220.
.02222202202290.
.02LLL2222LLL20.
.00L1L0000L1L00.
...LLL....LLL...
................
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
  [ footpath, bitmap`
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
  [ office, bitmap`
................
...LLLLLLLLL....
...L6L6L6L6L....
...LLLLLLLLL....
...L6L6L6L6L....
...LLLLLLLLL....
...L6L6L6L6L....
...LLLLLLLLL....
...L6L6L6L6L....
...LLLLLLLLL....
...L6L6L6L6L....
...LLLLLLLLL....
...L6L6L6L6L....
...LLLLLLLLL....
...L6L66L6LL....
...LLL66LLLL....` ],

)

setSolids([seagull, office])
setBackground(footpath)

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
  getAll(automobile).forEach(c=>{
    if(c.x == 0) c.remove()
    else c.x--
  })
  if(tilesWith(seagull, automobile).length > 0) {
    addText("You died!", {color: color`3`})
    dead = true;
    moved = true;
  }
  const newautomobile = ~~(Math.random() * height())
  const tile = getTile(width()-1, newautomobile);
  if(tile.length == 1 && tile[0].type == road) addSprite(width() - 1, newautomobile, automobile)
  setTimeout(loop, 250)
}

function generateRow(y) {
  if(Math.random() < 0.5) {
    for(let x = 0;x < width();x++) addSprite(x, y, road)
  } else if(Math.random() < 0.4) {
    for(let x = 0;x < width();x++) {
      if(Math.random() < 0.5) addSprite(x, y, office)
    }
  }
}

onInput("w", () => {
  if(moved) return;
  if(--getFirst(seagull).y < height() - 2) {
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
  getFirst(seagull).y++
  score--
})

onInput("a", () => {
  if(moved) return;
  getFirst(seagull).x--
})

onInput("d", () => {
  if(moved) return;
  getFirst(seagull).x++
})

afterInput(() => {
  if(dead == true) spawn()
  moved = true;
  if(tilesWith(seagull, automobile).length > 0) {
    addText("You died!", {color: color`3`})
    dead = true;
  } else {
    clearText()
    addText(""+score, {x:0, color: color`5`})
  }
})
