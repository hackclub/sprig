/*
@title: Marble Run
@author: @KrishanuIyengar
@tags: ['puzzle']
@addedOn: 2024-05-28
@img: ""
*/


const player = "p"
const obstacle = "o"
const freeSpace = "f"
const finishSpace = "i"
const border = "b"
const up = "u"
const down = "d"
const left = "l"
const right = "r"
const obstacle2 = "w"

let tiltY = 0
let tiltX = 0

setLegend(
  [ player, bitmap`
2222222222222222
2222555555552222
2225555555555222
2255555555555522
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2255555555555522
2225555555555222
2222555555552222
2222222222222222` ],
  [ obstacle, bitmap`
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
  [ obstacle2, bitmap`
3333333333333333
3777777777777773
37CCCCCCCCCCCC73
37C6666666666C73
37C6222222226C73
37C62HHHHHH26C73
37C62H9999H26C73
37C62H9449H26C73
37C62H9449H26C73
37C62H9999H26C73
37C62HHHHHH26C73
37C6222222226C73
37C6666666666C73
37CCCCCCCCCCCC73
3777777777777773
3333333333333333`],
  [ finishSpace, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222220422222222
2222220442222222
2222220444222222
2222220444422222
2222220444222222
2222220442222222
2222220422222222
2222220222222222
2222220222222222
2222220222222222
2222220222222222
2222220222222222`],
  [ border, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [ up, bitmap`
.......66.......
......6666......
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....` ],
  [ right, bitmap`
................
................
.........66.....
.........666....
.........6666...
66666666666666..
666666666666666.
6666666666666666
6666666666666666
666666666666666.
66666666666666..
.........6666...
.........666....
.........66.....
................
................` ],
  [ down, bitmap`
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
......6666......
.......66.......` ],
  [ left, bitmap`
................
................
.....66.........
....666.........
...6666.........
..66666666666666
.666666666666666
6666666666666666
6666666666666666
.666666666666666
..66666666666666
...6666.........
....666.........
.....66.........
................
................`],
  [ freeSpace, bitmap`
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
2222222222222222`],
)

setSolids([player, obstacle, border])

let level = 0
const levels = [
  map`
fffffffffff
fbbbbbbbbbf
fbpffofffbf
fboofoooobf
fbooffffobf
fboofwffobf
fboofffwobf
fboofwffobf
fboofffiobf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbwwwwwwwbf
fbwffffiwbf
fbwfofofwbf
fbwfpoffwbf
fbwfofofwbf
fbwfffffwbf
fbwwwwwwwbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbffwfofobf
fbfiffffobf
fbfowowfwbf
fbfwwffffbf
fbfwffwfwbf
fbwfwfowobf
fbofofffpbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbfffffffbf
fbfofofwfbf
fbffwffffbf
fbwfofoofbf
fbffoffffbf
fbofofooobf
fbpfoffiobf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbfofwfffbf
fbfffwfwfbf
fbfwfffwfbf
fbfwwfwwfbf
fbfwwwwwibf
fbffwfffwbf
fbwfffwfpbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbfffffffbf
fbfwwwwffbf
fbfwpfwofbf
fbfwwfwwfbf
fbffwffwfbf
fbfffwfwibf
fbfffffwfbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbiwwfffwbf
fbfwwfofwbf
fbfwwfofwbf
fbfwwpofwbf
fbfwwwofwbf
fbfwwwofwbf
fbffffffwbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fboffffffbf
fbopwwfwfbf
fbowfwwwfbf
fbowwifwfbf
fbwowffwfbf
fboowffwfbf
fboooffffbf
fbbbbbbbbbf
fffffffffff`,
]

const youWin = map`
ffffffffffffffffffffffffffffffffffffffffff
ffofffoffoooffofffofffofffffofooofoffffoff
fffofoffofffofofffofffoffoffoffoffoofffoff
ffffofffofffofofffofffoffoffoffoffofoffoff
ffffofffofffofofffofffoffoffoffoffoffofoff
ffffofffofffofofffofffoffoffoffoffofffooff
ffffoffffooofffooofffffoofooffooofoffffoff
ffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffff`


setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  // getFirst(player).y -= 1
  tiltY = -1
  tiltX = 0
})

onInput("a", () => {
  // getFirst(player).x -= 1
  tiltX = -1
  tiltY = 0
})

onInput("s", () => {
  // getFirst(player).y += 1
  tiltY = 1
  tiltX = 0
})

onInput("d", () => {
  // getFirst(player).x += 1
  tiltX = 1
    tiltY = 0
})

setInterval(() => {

if (tilesWith(obstacle2, player).length >= 1) {
    tiltX = 0 
    tiltY = 0
    level = level
    setMap(levels[level])
}

if (tilesWith(finishSpace, player).length >= 1) {
    tiltX = 0 
    tiltY = 0
    level = level + 1
    if (level >= levels.length) {
    setMap(youWin)
    } else {
    setMap(levels[level])
    }
  } else {

getFirst(player).x += tiltX
getFirst(player).y += tiltY

}
  
  
}, 600)

afterInput(() => {

  clearTile(10,5)
  clearTile(0,5)
  clearTile(5,0)
  clearTile(5,10)

  if (tiltX > 0 ) {
    addSprite(10, 5, right)
  }

  if (tiltX < 0) {
    addSprite(0, 5, left)
  }

  if (tiltY > 0 ) {
        addSprite(5, 10, down)

  }

  if (tiltY < 0) {
        addSprite(5, 0, up)    
  }
})

