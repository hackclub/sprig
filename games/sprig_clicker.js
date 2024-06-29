/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig Clicker
@author: xriiitox (Josh Baron)
@tags: []
@addedOn: 2024-06-29
*/

const player = "p"
const bg = "b"
const sprig = "s"
const calmSoil = "c"

let clickCounter = 0
let sprigTeleportLimit = 10
let sprigsPerClick = 1
let sprigs = 0

//upgrade levels 
let soilLv = 0
let fertLv = 0
let scytheLv = 0
let multLv = 0
  
setLegend(
  [ bg, bitmap`
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
0000000000000000` ],
  [ player, bitmap`
4444........4444
444..........444
44............44
4..............4
................
................
................
................
................
................
................
................
4..............4
44............44
444..........444
4444........4444` ],
  [ sprig, bitmap`
................
................
......DDDD......
......D..D......
DD.DD.D..D.DD.DD
D.DD.DDDDDD.DD.D
.D..DDDDDDDD..D.
..DDDDDDDDDDDD..
....DDDDDDDD....
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......` ],
  [ calmSoil, bitmap`
CCCC......CCCC..
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.C22C222C2CC222C
.C2CC2C2C2CC2C2C
.C2CC222C2CC2C2C
.C22C2C2C22C2C2C
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC.......CCCCC` ]
)
setSolids([])

setBackground(bg)

let level = 0
const levels = [
  map`
.........
.........
....p....
....s....
.........
.........
.........
.........`, // main clicking screen
  map`
........p
.........
.........
......c..
.........
.........
.........
.........` // shop
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addText("press i for shop", {

    x: 0,
    y: 15,
    color: color`2`
  
})

// movement
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

//functional keys

onInput("i", () => {
  //open shop if main screen, else back to main screen
  level = level === 0 ? 1 : 0
  setMap(levels[level])
  clearText()
  if (level === 0) {
    addText("press i for shop", {
      x: 0,
      y: 15,
      color: color`2`})
  }
  if (level === 1) {
    // add text for upgrades
    addText("\"calning soil\": lv " + soilLv + "\nless clicks before\nsprig moves", {
      x: 0,
      y: 3,
      color: color`2`
    })
  }
})

onInput("l", () => {
  if ( level === 0 && 
      getFirst(player).x === getFirst(sprig).x &&
       getFirst(player).y === getFirst(sprig).y ) {

    sprigs += sprigsPerClick

    clickCounter++
    
    if (clickCounter === sprigTeleportLimit) {

      getFirst(sprig).x = Math.floor(Math.random() * 9);
      getFirst(sprig).y = Math.floor(Math.random() * 8);
      clickCounter = 0
      
    }
    
  }

  // upgrade checking
  if (level === 1) {

    //switch ()
    
  }
  
})


afterInput(() => {
  addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })
})