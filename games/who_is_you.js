/*
I suck at level design so feel free to make your own.
Water and sink currently has no effect however I intend to add it soon.
No audio sorry.

@title: Who is you
@author: MeZackari
@tags: []
@addedOn: 2025-03-07
*/

let errored = false
let positions = [0, 0, 0, 0, 0]
var objects = ["-", "-", "f", "-", "-"]
const attributes = ["y", "m", "3", "5", "6"]
const words = ["-", "1", "7", "4", "2", "8"]
const existing = ["-", "b", "w", "r", "f", "s"]
const wordList = ["1", "2", "i", "y", "4", "3", "m", "8", "7", "6", "5"]
let i = 0
let l = 0
let iterate = 0
let pos = 5
let isWord = false

const baba = "b"
const title = "t"
const ground = "g"
const wall = "w"
const flag = "f"
const rock = "r"
const babaWord = "1"
const is = "i"
const you = "y"
const flagWord = "2"
const win = "3"
const rockWord = "4"
const move = "m"
const particles = "p"
const danger = "d"
const spike = "s"
const blank = "-"
const stop = "5"
const death = "6"
const wallWord = "7"
const spikeWord = "8"
const sink = "9"
const water = "W"
const waterWord = "0"

let hint = false

setLegend(
  [particles, bitmap`
................
...........6....
..........666...
...........6....
................
...6............
..666...........
...6............
...........6....
.....6....666...
....666....6....
.....6..........
................
................
................
................`],
  [danger, bitmap`
33.33.3333.33.33
3..............3
................
3..............3
3..............3
................
3..............3
3..............3
3..............3
3..............3
................
3..............3
3..............3
................
3..............3
33.33.3333.33.33`],
  [baba, bitmap`
................
................
................
................
................
..........1111..
..222222222101..
..222222222111..
..222222222111..
.2222222222111..
..222222222.....
...1.1.1.1......
...1.1.1.1......
................
................
................`],
  [is, bitmap`
................
................
................
................
..HHHHH...HHHH..
....H....H......
....H....H......
....H.....HHH...
....H........H..
....H........H..
....H........H..
..HHHHH..HHHH...
................
................
................
................`],
  [title, bitmap`
0000000000000000
0000008008800000
0880080808080080
0808080808800808
0880088808080808
0808080808800888
0880000000000808
0000088808880000
0000008008000000
0000088808880000
0000000000080000
8080000008880000
8080880000000000
0808008080080000
0808008080080000
0800880008800000`],
  [ground, bitmap`
0000000000000000
000LLLLLLLLL0000
00LLLLLLLLLLL000
0LLLLLLL0LLLLL00
0LLLLLLLL0LLLLL0
0LLLLLLLL0LLLLL0
0LLLLLLLL0LLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLL0LLLLLLL0
0LLLLLLL00LLLLL0
0LLLLLLLL00LLLL0
00LLLLLLLLLLLL00
000LLLLLLLLLL000
0000000000000000`],
  [flag, bitmap`
................
.........6......
.......666......
.....66666......
....666666......
...6666666......
....666666......
.....66666......
.......666......
.........6......
.........6......
.........6......
.........6......
........666.....
.......66666....
................`],
  [rock, bitmap`
................
.........LLL....
......LLLFFFL...
....LLFFFFFFFL..
...LCFFFFFFFFFL.
..LFFCFFFFFFFCL.
..LFFFCFFFFFCFF.
.LFFFFFCFFFCFFF.
.FFFFFFFCCCFFFF.
.CFFFFFFCFFFFFC.
.CCFFFFFCFFFCCC.
.CCCCCCFCFCCCCC.
.CCCCCCCCCCCCCL.
.LCCCCCCCCCCCL..
..LCCCCCCCCCCL..
...LCCCCCCLLL...`],
  [babaWord, bitmap`
................
................
................
................
................
.88...8..88...8.
.8.8.8.8.8.8.8.8
.88..8.8.88..8.8
.8.8.888.8.8.888
.88..8.8.88..8.8
................
................
................
................
................
................`],
  [you, bitmap`
................
................
................
................
................
..8.8..88..8..8.
..8.8.8..8.8..8.
..8.8.8..8.8..8.
...8..8..8.8..8.
...8..8..8.8..8.
...8...88...88..
................
................
................
................
................`],
  [flagWord, bitmap`
................
................
................
................
................
.666.6...6...66.
.6...6..6.6.6..6
.666.6..6.6.6...
.6...6..6.6.6.66
.6...6..666.6..6
.6...66.6.6..66.
................
................
................
................
................`],
  [win, bitmap`
................
................
................
................
................
.6...6.666.6...6
.6.6.6..6..66..6
.6.6.6..6..6.6.6
.6.6.6..6..6.6.6
.6.6.6..6..6..66
..6.6..666.6...6
................
................
................
................
................`],
  [rockWord, bitmap`
................
................
................
................
................
FF...F...FF.F.F.
F.F.F.F.F...FF..
FF..F.F.F...F.F.
F.F.F.F.F...F.F.
F.F..F...FF.F.F.
................
................
................
................
................
................`],
  [move, bitmap`
................
................
................
................
................
FF.FF..F..F.F.FF
F.F.F.F.F.F.F.F.
F.F.F.F.F.F.F.FF
F.F.F.F.F.F.F.F.
F...F..F...F..FF
................
................
................
................
................
................`],
  [spike, bitmap`
................
................
................
................
................
................
................
................
................
................
....L...L...L...
...L2L.L2L.L2L..
.L.222.222.222..
.2L222.222.222L.
L22222222222222L
2222222222222222`],
  [stop, bitmap`
................
................
................
.999.999.99..999
.9....9.9..9.9.9
.9....9.9..9.999
.999..9.9..9.9..
...9..9.9..9.9..
...9..9.9..9.9..
.999..9..99..9..
................
................
................
................
................
................`],
  [blank, bitmap``],
  [death, bitmap`
................
................
..C..C.CCC.C..C.
..C..C..C..C..C.
..C.C...C..C..C.
..CC....C..C..C.
..CC....C..C..C.
..C.C...C..C..C.
..C..C..C..C..C.
..C..C..C..C..C.
..C..C..C..C..C.
..C..C.CCC.CC.CC
................
................
................
................`],
  [wallWord, bitmap`
................
................
.9...9..9..9..9.
.9...9.9.9.9..9.
.9...9.9.9.9..9.
.9...9.9.9.9..9.
.9...9.9.9.9..9.
.9...9.999.9..9.
.9...9.9.9.9..9.
.9...9.9.9.9..9.
.9.9.9.9.9.9..9.
.99.99.9.9.99.99
................
................
................
................`],
  [spikeWord, bitmap`
................
................
................
..22..22..222.2.
.2..2.2.2..2..2.
.2....22...2..22
.2....2....2..22
..22..2....2..2.
....2.2....2..2.
.2..2.2....2..2.
..22..2...222.2.
................
................
................
................
................`],
  [wall, bitmap`
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
  [water, bitmap`
7777777777777777
7777777775777777
7777777555557777
7555577555555555
7777555577775555
7777775777777777
7777777777777777
7555577755555555
7777555577777777
7777777777777777
7777777775555557
7555555557777777
7755555557777777
7557777755555555
7777755557777777
7777557777777777`],
  [sink, bitmap`
................
................
................
555.555.55.5.5.5
5....5..55.5.5.5
555..5..55.5.55.
..5..5..5.55.5.5
..5..5..5.55.5.5
555.555.5.55.5.5
................
................
................
................
................
................
................`],
  [waterWord, bitmap`
................
................
................
................
5.5.5..5.555....
5.5.5.5.5.5.55..
5.5.5.555.5.5...
5.5.5.5.5.5.55..
.5.5..5.5.5.5...
............55..
.............55.
.............5.5
.............55.
.............5.5
.............5.5
................`]
)

setBackground(ground)
setSolids([line("move"), line("stop"), line("push"), babaWord, is, you, flagWord, win, rockWord, move])

let level = 0
const levels = [
  map`
t`,
  map`
...............
...............
..wwwwwwwwwww..
..2i3..r..4im..
.......r.......
...b...r...f...
.......r.......
.......r.......
..1iy..r..7i5..
..wwwwwwwwwww..
...............
...............`,
  map`
............1iy
.....wwwwwwwwww
.....w.........
.2wwww.........
.iwf.r.........
.3wwww.........
.....wwwwwwwwww
......w........
......w........
......w....7i5.
......w..b.....
4im...w........`,
  map`
............4iy
.....ffffffffff
.....f.........
.7ffff.........
.ifw.b.........
.3ffff.........
.....ffffffffff
......f........
......f........
......f....2i5.
......f..r.....
1im...f........`,
  map`
4imr.r.r.r...rr
...r..rr...rr.r
fr.r.r..r.r...r
..r.f.r....r.rr
r.b..rr.rr..r..
.r.rr.r..r4ww.r
..f..r.r..7i5w.
...r.rr..r.wwr.
.r.2i3wwwwwwwr.
wwwiwww.....www
..w6w...1iy....
..www..........`,
  map`
wwwwsw.........
w2r3sw.........
w4r6sw....1iy..
w7r5sw.........
s8i6swwwwwwwwww
w......fffffffw
w......fffffffw
w......fffffffw
w..b...fffffffw
w......fffffffw
w......fffffffw
wwwwwwwwwwwwwww`
]

setMap(levels[level])

setTimeout(() => {
  level += 1
  setMap(levels[level])
  sentence()
}, 3000)

sentence()

setPushables({
  [line("y")]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [line("m")]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [babaWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [flagWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [win]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [is]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [you]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [rockWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [move]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [death]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [wallWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [stop]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
  [spikeWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord]
})

onInput("j", () => {
  setMap(levels[level])
})

onInput("k", () => {
  if (hint == true) {
    hint = false
  } else {
    hint = true
  }
})

onInput("s", () => {
  getAll(line("y")).forEach(sprite => {
    sprite.y += 1
  })
})
onInput("w", () => {
  getAll(line("y")).forEach(sprite => {
    sprite.y -= 1
  })
})
onInput("d", () => {
  getAll(line("y")).forEach(sprite => {
    sprite.x += 1
  })
})
onInput("a", () => {
  getAll(line("y")).forEach(sprite => {
    sprite.x -= 1
  })
})

function line(word) {
  i = 0
  for (let x of attributes) {
    i += 1
    if (x == word) {
      iterate = objects[i - 1]
    }
  }
  return iterate
}

function sentence() {
  positions = [0, 0, 0, 0, 0]
  //across
  getAll(is).forEach(sprite => {
    isWordX = false
    erroredX = false
    posX = 0
    positionX = 0
    objectX = getTile(sprite.x - 1, sprite.y)
    definitionX = getTile(sprite.x + 1, sprite.y)
    i = 0
    try {
      for (let x of wordList) {
        if (x == definitionX[0].type) {
          isWordX = true
        }
      }
      if (isWordX == true) {
        for (let x of attributes) {
          if (x == definitionX[0].type) {
            posX = i
            change = true
          }
          i += 1
        }
      }
      l = 0
      for (let x of words) {
        if (x == objectX[0].type) {
          positionX = l
        }
        l += 1
      }
    } catch (err) {
      erroredX = true
    }
    if (erroredX == false && isWordX == true) {
      positions[posX] = 1
      objects[posX] = existing[positionX]
    }
  })
  //down
  getAll(is).forEach(sprite => {
    isWord = false
    errored = false
    pos = 0
    position = 0
    objecty = sprite.y - 1
    definitiony = sprite.y + 1
    object = getTile(sprite.x, sprite.y - 1)
    definition = getTile(sprite.x, sprite.y + 1)
    i = 0
    try {
      for (let x of wordList) {
        if (x == definition[0].type) {
          isWord = true
        }
      }
      if (isWord == true) {
        for (let x of attributes) {
          if (x == definition[0].type) {
            pos = i
            change = true
          }
          i += 1
        }
      }
      l = 0
      for (let x of words) {
        if (x == object[0].type) {
          position = l
        }
        l += 1
      }
    } catch (err) {
      errored = true
    }
    if (errored == false && isWord == true) {
      positions[pos] = 1
      objects[pos] = existing[position]
    }
  })
  for (let i = 0; i < 5; i++) {
    if (positions[i] != 1) {
      objects[i] = "-"
    }
  }
  if (objects[1] == objects[3]) {
    objects[1] = "-"
  }
}

afterInput(() => {
  sentence()

  setPushables({
    [line("y")]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [line("m")]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [babaWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [flagWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [win]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [is]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [you]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [rockWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [move]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [death]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [wallWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [stop]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord],
    [spikeWord]: [line("m"), line("y"), babaWord, flagWord, win, is, you, rockWord, move, death, wallWord, stop, spikeWord]
  })

  setSolids([line("y"), line("5"), line("m"), flagWord, babaWord, is, you, win, rockWord, move, death, wallWord, stop])

  if (hint == true) {
    getAll(line("w")).forEach(sprite => {
      addSprite(sprite.x, sprite.y, particles)
    })
    getAll(line("6")).forEach(sprite => {
      addSprite(sprite.x, sprite.y, danger)
    })
  }

  getAll(line("y")).forEach(user => {
    getAll(line("6")).forEach(kill => {
      if (user.y == kill.y && user.x == kill.x) {
        setMap(levels[level])
      }
    })
  })

  getAll(line("y")).forEach(user => {
    getAll(line("3")).forEach(victory => {
      if (user.y == victory.y && user.x == victory.x) {
        level += 1
        setMap(levels[level])
      }
    })
  })

  sentence()

  console.log("you:", objects[0])
  console.log("move:", objects[1])
  console.log("win:", objects[2])
  console.log("stop:", objects[3])
  console.log("kill:", objects[4])
  console.log("")
})
