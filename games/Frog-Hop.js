/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Frog Hop
@author: Joshua
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const ground = "g"
const dirt = "d"
const crown = "c"
const sky = "s"

const green = "1"
const lime = "2"
const yellow = "3"
const white = "4"
const black = "5"

let dead = false
let jumping = false
let right = false
let left = false

setLegend(
  [ player, bitmap`
................
......0000......
......0LL0......
......0LL0......
.....066660.....
....DD0LL0DD....
...D22D00D22D...
...D024DD420D...
..D4D444444D4D..
..D44D4444D44D..
.D4444DDDD4444D.
.D444444334444D.
..D4444444444D..
...DDD4444DDD...
...D44DDDD44D...
....DD....DD....` ],
  [ ground, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDCDDDDDDDDDDD
DCDDCCDDDCDDDCDD
DCCCCCCCCCCCCCCD
CCCCCCCCCCCCCCCC
CCCCCCCCCCC1CCCC
CC1CCCCCCCCCCCCC
CCCCCC1CCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC1CCC
CCC1CCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC1CCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC1CCC
CCCCCCCCCCCCCCCC
CCCCCCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCC1CCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC1CCC
CCCCCCCCCCCCCCCC
CCC1CCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ crown, bitmap`
.......6........
.6.....6.....6..
..6.........6...
.......66.......
.....6.66.6.....
..6.66.66.66.6..
..6.66.66.66.6..
6.666666666666.6
..666666666666..
..666666666666..
................
................
...6...6....6...
..6....6.....6..
................
................` ],
  [ sky, bitmap`
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
7777777777777777` ],
  [ green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ lime, bitmap`
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
4444444444444444` ],
  [ yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ white, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ black, bitmap`
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
)

setBackground(sky)
setSolids([player, ground, dirt])

addText("Press W to jump up", {
  x: 1, 
  y: 1, 
  color: color`2`
})

addText("(A + W for left)", {
  x: 1, 
  y: 2, 
  color: color`2`
})

addText("(D + W for right)", {
  x: 1, 
  y: 3, 
  color: color`2`
})

let level = 1
const levels = [
  map`
..3...3..3...3..
...3....p...3...
.....3.33.3.....
3.3.33.33.33.3.3
..333333333333..
..331133331133..
...1451441541...
.3.1452112541.3.
c.121222222121.c
..122122221221..
.12222122122221.
.12222111122221.
..122222222221..
...1112222111...
...1221111221...
....11....11....`,
  map`
...........
...........
...........
...........
.p.......c.
ggggggggggg
ddddddddddd`,
  map`
.........
.........
.........
.........
.pc......
ggggggggg
ddddddddd`,
  map`
...c.....
.........
.....g...
.....dg..
.p.ggddg.
gggdddddg
ddddddddd`,
  map`
.........
.........
........c
........g
........d
.....gggd
......ddd
..gg..ddd
p.dd..ddd
ggddddddd`,
  map`
gggc......1
dddg......1
dd......g..
...pg...d..
...gdg..d..
...dddg.d..
1..dddd....
11.ddddg...
11.ddddd..1`,
  map`
ggg...gg...
........c..
..g...gg...
g.d.ggd..g.
p.d......dg
ggd....ggdd
ddd.gggdddd
dddgddddddd`,
  map`
ggg.....gggg
ddd.p...dddd
ddd.g....ddd
dddg..g...dd
d.....d.....
d.....dg...g
d....gddg..d
d.gggd.....d
d.....c..g.d
.........ddd
..gggggggddd
ggdddddddddd`,
  map`
........g..c..
...........g..
.......ggg....
.p.gggg......g
.g.......g...d
gd.gggg..dgggd
dd.ddddg.ddddd
ddgddddd.ddddd
ddddddddgddddd`,
  map`
gggg..........gg.
........g.g.ggddd
.ggg...pd.d.ddddd
...d..ggd........
gg.dggddd.d...cdd
dd.dddddddd.ddddd
ddgdddddddddddddd`,
  map`
dddddddddddd
......p.....
.dd.dddddd.d
.d.......d.d
.dddd.dd.d.d
......dddd.d
.d.dd.d....d
.d..d.dddd.d
dd..ddd.d.dd
.d..d...d.d.
.dd.d...d.d.
..d.ddddddd.
d.d....c....
d.d.dddddddd
d.d......d..
d.dddddddd..`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

function changeLevel() {
  if (levels[level + 1]) {
    level += 1
    setMap(levels[level])
  }
}

function fall() {
  
  if (getFirst(player)) {
    let xValue = getFirst(player).x
    let yValue = getFirst(player).y + 1
    let tiles = getTile(xValue, yValue)

    let groundUnder = false
  
    if (tiles.length == 1) {
      if (tiles[0].type == "g") {
        groundUnder = true
      }
    }
  
    if (groundUnder) {
      jumping = false
    } else {
      getFirst(player).y += 1
      jumping = false
      setTimeout(fall, 100)
    }

    
    
  } 

  AfterMove()
}

onInput("w", () => {
  if (!jumping) {
    jumping = true

    getFirst(player).y -= 1
    getFirst(player).y -= 1

    if (right == true) {
      getFirst(player).x += 1
      getFirst(player).x += 1
      right = false
    }
  
    if (left == true) {
      getFirst(player).x -= 1
      getFirst(player).x -= 1
      left = false
    }
    
    setTimeout(fall, 100)
    AfterMove()
  }
})

onInput("a", () => {
  right = false
  left = true
})

onInput("d", () => {
  left = false
  right = true
})

function AfterMove() {
  let CROWN_X = getFirst(crown).x
  let CROWN_Y = getFirst(crown).y
  
  let tiles = getTile(CROWN_X, CROWN_Y)
  if (tiles.length == 2) { 
    clearText()
    setMap(levels[0])
    setTimeout(changeLevel, 500)
  }
}

afterInput(() => {
  
})