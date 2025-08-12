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


let coinCollected = false


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

)

setSolids([player, wall, block])



function levelCheck() {
  if (level == 0) {
  if (getFirst(player).y == 5 && getFirst(player).x == 4) {
    level = 1
    setMap(levels[level])
    coinCollected = false
    
  }
} else if (level == 1) {
    if (getFirst(player).x == 0 && getFirst(player).y == 5) {
      level = 2
      setMap(levels[level])
    }
} else if (level == 2) {
    if (getFirst(player).x == 0 && getFirst(player).y == 0) {
      level = 3
      setMap(levels[3])
      addText("You Won!", {
        x: 6,
        y: 6,
        color: color`7`
    })
    }
  }  
}



let level = 0
const levels = [
  map`
wwwww
.www.
.....
.www.
pwww.
wwww.`,
  map `
wwwpw
....w
.w.ww
.w...
wwww.
.....`,
  map `
...wp
w.ww.
w....
wwbww
w...w
....w`,
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

