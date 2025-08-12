/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Mazey
@author: Dekoder-py
@tags: []
@addedOn: 2025-07-10
@description: Fun Maze Game!
*/

const player = "p"
const wall = "w"
const block = "b"
const confetti = "c"
const string = "s"

const door = "d"
const key = "k"


setLegend(
  [ player, bitmap`
................
................
......444.......
.....D343D......
......444..4....
.......4...4....
....47777744....
....4.777.......
....4.777.......
......777.......
......555.......
......5.5.......
......5.5.......
......1.1.......
.....00.00......
................` ],
  [ wall, bitmap`
4444DDDDDDDDDDDD
4..4.D....D.DD.D
44.4.D..DDD..D.D
44...D...DD..D.D
44444DDD.DD.44.D
4...4....D.44D.D
4DDDD4DDDD.4.D.D
4..4.4....44...D
4DD4.4..D44D..DD
4D.4D.4.44.DD.DD
4D.DD.44DDD...DD
4D4.DDD44.DD..DD
4D444..DDD.DD.DD
4DDD...D.D...DDD
4..DDD.D...DDD.D
444444444444444D` ],
  [ block, bitmap`
CCCCCCCCCCCCCCCC
C11111111111111C
C11CC1LLLL1CC11C
C1CC11111L11C11C
C1C1111111111C1C
C11111CCCCC1111C
C1LL1CCCCCCC111C
C1L11CCCCCCC111C
C1111CCCCCCC111C
C1111CCCCCCCL11C
C11111CCCCC1L11C
C1C111111111L11C
C1CC1111LL1LLCCC
C11CCC111L11C11C
C11111111111111C
CCCCCCCCCCCCCCCC` ],
  [ confetti, bitmap`
............H...
....6....3..H...
...6..7..3.H....
...6..7..3.H....
...6..7..3H.....
..6...7..3H..4..
666.8.7773H..4..
66..8....3...4..
....8....3...4..
..5.8...H.3..4..
..5.8..H..3..4..
..5.8......3.4..
..5.8.......34..
...5.8......43..
....5888..44.3..
....55...4....3.`],
  [ string, bitmap`
L..............L
L..............L
L..............L
L..............L
.L.............L
.L............L.
.LL..........LL.
..L..........L..
...L........LL..
....LLLLLLLLL...
................
................
................
................
................
................`],
  [ door, bitmap`
................
................
................
...CCCCCCCC.....
...CCCFCF9C.....
...CFF9CCC9.....
...CCCCCCCC.....
...CCCCCCCC.....
...CC9CC66C.....
...CCFCC66C.....
...CCCCC66C.....
...CCCCCCCC.....
...CFCCCCCC.....
...C9FCCCF9.....
...CCCCCCCC.....
...CCCCCCCC.....`],
  [ key, bitmap`
................
................
................
................
................
................
.CCC............
.C.C6666666666..
.C.C...6F..6.6..
.CCC...6..F6.6..
.......F...6F...
..........6F....
................
................
................
................` ],

)

setSolids([player, wall, block])

let hasKey = false

function levelCheck() {
 const p = getFirst(player)
  if (tilesWith(player, key).length) {
    hasKey = true
    clearTile(p.x, p.y)
    addSprite(p.x, p.y, player)
  }
  if (tilesWith(player, door).length && hasKey) {
    level++
    loadLevel()
  }
}


function loadLevel(){
   hasKey = false
  setMap(levels[level])
}

let level = 0
const levels = [
  map`
wwwww
.wwwk
.....
.www.
pwww.
wwwwd`,
  map `
wwwpw
....w
.w.ww
kw...
wwww.
d....`,
  map `
d..wp
w.ww.
w....
wwbww
w...w
k...w`,
  map `
cscsc
scscs
.....
.....
.....
....p`
]

setMap(levels[level])

setPushables({
  [ player ]: [ block ]
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("j", () => {
  setMap(levels[level])
})


afterInput(() => {
  levelCheck()
})
