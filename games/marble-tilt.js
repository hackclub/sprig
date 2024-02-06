/*
@title: Marble Tilt 
@author: @jdogcoder (Jasper Mayone)
@tags: []
@img: "https://cloud-pfh6jdg27-hack-club-bot.vercel.app/0image__1_.png"
@addedOn: 2024-00-00
*/

/*
Inspired by @zrl https://hackclub.slack.com/archives/C017YL1NMU0/p1703037794693659?thread_ts=1702945706.881899&cid=C017YL1NMU0

Marble Tilt! Avoid the lava and get your marble to the green square! (v2 will hopefully look better)

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
const lava = "w"

let tiltY = 0
let tiltX = 0

setLegend(
  [ player, bitmap`
2222222222222222
2222HHHHHHHH2222
222HHHHHHHHHH222
22HHHHHHHHHHHH22
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
22HHHHHHHHHHHH22
222HHHHHHHHHH222
2222HHHHHHHH2222
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
  [ lava, bitmap`
9999999999999999
9333333333333339
9399999999999939
9393333333333939
9393999999993939
9393933333393939
9393939999393939
9393939339393939
9393939339393939
9393939999393939
9393933333393939
9393999999993939
9393333333333939
9399999999999939
9333333333333339
9999999999999999`],
  [ finishSpace, bitmap`
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
DDDDDDDDDDDDDDDD`],
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
.......33.......
......3333......
.....332233.....
....33222233....
...3322222233...
..332222222233..
..333332233333..
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....` ],
  [ right, bitmap`
................
................
.........33.....
.........333....
.........3233...
33333333332233..
333333333322233.
2222222222222233
2222222222222233
333333333322233.
33333333332233..
.........3233...
.........333....
.........33.....
................
................` ],
  [ down, bitmap`
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
.....332233.....
..333332233333..
..332222222233..
...3322222233...
....33222233....
.....332233.....
......3333......
.......33.......` ],
  [ left, bitmap`
................
................
.....33.........
....333.........
...3323.........
..33223333333333
.332223333333333
3322222222222222
3322222222222222
.332223333333333
..33223333333333
...3323.........
....333.........
.....33.........
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
fbpffffffbf
fboooofwfbf
fboooofffbf
fbfffffffbf
fbfoooooobf
fbfoooooobf
fbfffffifbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbffwffffbf
fboffffifbf
fbffoofffbf
fbfooooffbf
fbpooooffbf
fbfofwfffbf
fbfffffofbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbffwfofobf
fbfiofofobf
fbfoofofobf
fbfooffffbf
fbffffofwbf
fbofofooobf
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
fbfffofffbf
fbfofofofbf
fbfofffofbf
fbfoofoofbf
fbfoowooibf
fbffofffobf
fbofffofpbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbfffffffbf
fbfooooffbf
fbfopfoffbf
fbfoofoofbf
fbffoffofbf
fbfffofoibf
fbfffffwfbf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbioofffobf
fbfoofofobf
fbfwofofobf
fbfwopofobf
fbfwooofobf
fbfwwwwfobf
fbffffffobf
fbbbbbbbbbf
fffffffffff`,
  map`
fffffffffff
fbbbbbbbbbf
fbfffffffbf
fbfpoffofbf
fbfofowofbf
fbfooifofbf
fbwfoffofbf
fbffoffofbf
fbfffffffbf
fbbbbbbbbbf
fffffffffff`,
]

// FIXME: Add W 
const youWin = map`
fffffffffffffffffffffffffff
fffffffffffffiiiiififffffif
fffffffffffffffifffiiffffif
fffffffffffffffifffififffif
fffffffffffffffifffiffiffif
fffffffffffffffifffifffifif
fffffffffffffffifffiffffiif
fffffffffffffiiiiififffffif
fffffffffffffffffffffffffff`

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

if (tilesWith(lava, player).length >= 1) {
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

