/*
Match-3 Game with a Twist

@title: Drop 3
@author: Aarav Garg
*/

const blue = "b"
const green = "g"
const yellow = "y"
const pink = "p"
const violet = "v"

const empty = "e"
const white = "w"
const tile = "t"

var pulses = 0

setLegend(
  [ blue, bitmap`
................
................
.....555555.....
...5555555555...
...5562555555...
..556255555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
...5555555555...
.....555555.....
................
................` ],
  [ green, bitmap`
................
................
.....444444.....
...4444444444...
...4462444444...
..446244444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
...4444444444...
...4444444444...
.....444444.....
................
................`],
  [ yellow, bitmap`
................
................
.....666666.....
...6666666666...
...6622666666...
..662266666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
...6666666666...
.....666666.....
................
................`],
  [ pink, bitmap`
................
................
.....888888.....
...8888888888...
...8862888888...
..886288888888..
..888888888888..
..888888888888..
..888888888888..
..888888888888..
..888888888888..
...8888888888...
...8888888888...
.....888888.....
................
................`],
  [ violet, bitmap`
................
................
.....HHHHHH.....
...HHHHHHHHHH...
...HH62HHHHHH...
..HH62HHHHHHHH..
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
  [ tile, bitmap`
6000000000000006
0021111111111100
0221111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0011111111111100
6000000000000006`],
  [ empty, bitmap`
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
2222222222222222`]
)

setSolids([])
setBackground(tile)

let level = 0
const levels = [
  map`
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee
ee.....ee`,
]

setMap(levels[level])

setPushables({
  [ blue ]: []
})

/* get three random tiles */

function random(min,max) {
 return Math.floor((Math.random())*(max-min+1))+min;
}

var tile1 = ["b", "g", "y", "p", "v"][random(0, 4)]
var tile2 = ["b", "g", "y", "p", "v"][random(0, 4)]
var tile3 = ["b", "g", "y", "p", "v"][random(0, 4)]

addSprite(4, 0, tile1)
addSprite(4, 1, tile2)
addSprite(4, 2, tile3)

activeCounter = 0
topY = 0
topX = 4

score = 0

onInput("w", () => {
  let tmp = getTile(topX, topY+1)[0]
  getTile(topX, topY)[0].y += 1
  getTile(topX, topY+2)[0].y -= 2
  tmp.y += 1
})

/* move tiles horizontally */
onInput("a", () => {
  /* if the next tiles are empty */
  if (getTile(topX-1, topY+2).length == 0 && topX > 2) {
    getTile(topX, topY)[0].x -= 1
    getTile(topX, topY+1)[0].x -= 1
    getTile(topX, topY+2)[0].x -= 1
    topX -= 1
  }
})

onInput("d", () => {
  /* if the next tiles are empty */
  if (getTile(topX+1, topY+2).length == 0 && topX < 6) {
    getTile(topX, topY)[0].x += 1
    getTile(topX, topY+1)[0].x += 1
    getTile(topX, topY+2)[0].x += 1
    topX += 1
  }
})

var timer = setInterval(dropTheBalls, 500);

function scan() {
  console.log("scan envoked")
  for (let i = 0; i < 9; i++) {
      for (let j = 2; j < 7; j++) {
        if (getTile(j, i).length > 0 && getTile(j, i+1).length > 0 && getTile(j, i+2).length > 0)
        {
          if ((getTile(j, i)[0].type == getTile(j, i+1)[0].type &&  getTile(j, i+1)[0].type == getTile(j, i+2)[0].type))
          {
            /* if collison, remove all three */
            clearTile(j, i)
            clearTile(j, i+1)
            clearTile(j, i+2)

            /* make tiles drop */
            var a = j
            var b = i
            while(getTile(a, b-1).length > 0) {
              getTile(a, b-1)[0].y += 3
              b -= 1
            }

            score += 1
            clearText()
            addText(`${score}`, {
              x: 1,
              y: 2,
              color: color`2`
            })
            
            scan()
          }
        }
      }
    }

    for (let i = 0; i < 12; i++) {
      for (let j = 2; j < 7; j++) {
        if (getTile(j, i).length > 0 && getTile(j+1, i).length > 0 && getTile(j+2, i).length > 0) {
          if (getTile(j, i)[0].type == getTile(j+1, i)[0].type && getTile(j+1, i)[0].type == getTile(j+2, i)[0].type) {
            clearTile(j, i)
            clearTile(j+1, i)
            clearTile(j+2, i)

            var a = i
            while (getTile(j, a-1).length > 0) { getTile(j, a-1)[0].y += 1; a-= 1 }

            a = i
            while (getTile(j+1, a-1).length > 0) { getTile(j+1, a-1)[0].y += 1; a -= 1 }

            a = i
            while (getTile(j+2, a-1).length > 0) { getTile(j+2, a-1)[0].y += 1; a -= 1 }

            score += 1
            clearText()
            addText(`${score}`, {
              x: 1,
              y: 2,
              color: color`2`
            })
            
            scan()
          }
        }
      }
    }
}

function dropTheBalls() {
  
  if (getTile(topX, topY + 3).length == 0 && topY < 8) {
    getTile(topX, topY+2)[0].y += 1
    getTile(topX, topY+1)[0].y += 1
    getTile(topX, topY)[0].y += 1
    topY += 1
  }

  else {
    /* scan */
    scan()
    
    /* new set */
    pulses = 0
    tile1 = ["b", "g", "y", "p", "v"][random(0, 4)]
    tile2 = ["b", "g", "y", "p", "v"][random(0, 4)]
    tile3 = ["b", "g", "y", "p", "v"][random(0, 4)]
    addSprite(4, 0, tile1)
    addSprite(4, 1, tile2)
    addSprite(4, 2, tile3)
    activeCounter = 0
    topY = 0
    topX = 4
  }
}

addText(`${score}`, {
  x: 1,
  y: 2,
  color: color`2`
})

afterInput(() => {
  
})