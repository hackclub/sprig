/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: JumperWho
@author: CreativeDragon1
@tags: []
@addedOn: 2024-09-03
*/

const player = "p"
const block = "b"
const pipe_open = "a"
const acid = "c"
const finish_space = "i"
const heart = "h"
const heart_line = "l"
const support_line ="z"
const block_hang="x"
const dead_support ="y"
const block_chain ="t"
const holder="o"
let player_y = 1
let hearts = 0
const blue="h"

setLegend(
  [player, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6660006666000666
6660006666000666
6660006666000666
6666666666666666
6666666666666666
6666666666666666
6666006666666666
6666600000066666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [block, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCC999CCCCCCC
CCCCC99999CCCCCC
CCCCC997799CCCCC
9CCC99777799CCC9
99CC9777777CCCC9
79CC777777CCCCC9
79CC77777CCCCCC7
79CC7777CC99CCC7
79CC777CC997CCC7
79CC77CC9977CCC7
79CC7CC99777CCC7
79CCCC997777CCC7
79CCC9977777CCC7`],
  [block_hang, bitmap`
C00CCCCCCCCCC00C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9CCCCCCCCCCCCCCC
9999CCCCCCCCCCC7
7779999CCCCCC777
7777779999977777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [block_chain, bitmap`
7077077777707707
7711777777771177
7177177777717717
7L77L777777L77L7
7077077777707707
7711777777771177
7177177777717717
7L77L777777L77L7
7077077777707707
7711777777771177
7177177777717717
7L77L777777L77L7
7077077777707707
7711777777771177
7177177777717717
7L77L777777L77L7`],
  [finish_space, bitmap`
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
4444444444444444`],
  [blue, bitmap`
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
7777777777777777`],
  [acid, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [heart, bitmap`
7777777777777777
7777777777777777
7777777777777777
7700000770000077
7003330000333007
7032223003333307
7023333333333307
7033333333333307
7003333333333007
7700333333330077
7770033333300777
7777003333007777
7777700330077777
7777770000777777
7777777777777777
7777777777777777`],
  [heart_line, bitmap`
7777777777777777
7777777777777777
7777777777777777
7700000770000077
7007770000777007
7077777007777707
7077777777777707
7077777777777707
7007777777777007
7700777777770077
7770077777700777
7777007777007777
7777700770077777
7777770000777777
7777777777777777
7777777777777777`],
  [support_line, bitmap`
79CCC7777777CCC7
79CCCC777777CCC7
79CCCCC77777CCC7
79CC79CC7777CCC7
79CC799CC777CCC7
79CC7799CC77CCC7
79CC77799CC7CCC7
79CC777799CCCCC7
79CC7777799CCCC7
79CC77777CCCCCC7
79CC7777CC99CCC7
79CC777CC997CCC7
79CC77CC9977CCC7
79CC7CC99777CCC7
79CCCC997777CCC7
79CCC9977777CCC7`],
  [dead_support, bitmap`
79CCC7777777CCC7
79CCCC777777CCC7
79CC9CC77777CCC7
79CC99CC7777CCC7
79CC799CC777CCC7
79CC7799CC77CCC7
79CC77799CC7CCC7
79CC777799CCCCC7
49CC4444499CCCC4
49CC44444CCCCCC4
49CC4444CC99CCC4
49CC444CC994CCC4
49CC44CC9944CCC4
49CC4CC99444CCC4
49CCCC994444CCC4
49CCC9944444CCC4`],
  [holder, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7799999999999977
79CCCCCCCCCCCCC7
79CCCCCCCCCCCCC7
79CCCCCCCCCCCCC7
779CCCCCCCCCCC77
771L39666693L177
7710339669330177
7710733993370177
7177073333707717
7L77L773377L77L7`]
)

setSolids([player, block])

let level = 0
let playerX = 0
let playerY = 0

const levels = [
  map`
...ohohohhh
hhhthththhh
phhthththhi
bbhxhxhxhbb
zzhhhhhhhzz
yycccccccyy`,
  map`
............
............
............
.....b..b..i
p..b..b.zbbb
bb......zzzz
yyccccccyyyy`,
  map`
.............
............i
...b.b.b.b.bb
.b...........
...bb........
......b.b....
p.........b..
bbb.b.......b
bbb...b.bb.b.
bbbcccccccccc`
]

const youWin = map`
..........................
.i......i...iiiii.i.....i.
.i...i..i.....i...ii....i.
.ii..i..i.....i...i.i...i.
..i.ii.i......i...i..i..i.
..i.iiii......i...i...i.i.
..iii.ii......i...i....ii.
...i...i....iiiii.i.....i.
..........................`
const youlose = map`
...............................
.i......iiiii....iiiii.iiiiiii.
.i.....i.....i..i.........i....
.i....i.......i.i.........i....
.i....i.......i.i.........i....
.i....i.......i.ii........i....
.i....i.......i...i.......i....
.i....i.......i....ii.....i....
.i....i.......i......i....i....
.i....i.......i......i....i....
.i....i.......i......i....i....
.i....i.......i.i....i....i....
.i.....i.....i...i..i.....i....
.iiiii..iiiii.....ii......i....
...............................`
setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
  //setTimeout(function(){
  //getFirst(player).y += 1
  //})
})

onInput("d", () => {
  getFirst(player).x += 1
  setTimeout(function() {
    getFirst(player).y += 1
  }, 300)
})

afterInput(() => {
  if (getFirst(player).y + 1 == getAll(pipe_open).y) {
    getFirst(player).y += 1
  }
})


function heart_load() {
  if (hearts == 0) {
    addSprite(0,0, heart)
    addSprite(1,0, heart)
    addSprite(2,0, heart)
  }
  if (hearts == 1) {
      addSprite(2, 0, heart_line)
      addSprite(0,0, heart)
      addSprite(1,0, heart)
    }
    if (hearts == 2) {
      addSprite(2, 0, heart_line)
      addSprite(0,0, heart)
      addSprite(1,0, heart_line)
    }
    if (hearts == 3) {
      addSprite(2, 0, heart_line)
      addSprite(0,0, heart_line)
      addSprite(1,0, heart_line)
      setMap(youlose)
    }
}
addSprite(0,0, heart)
addSprite(1,0, heart)
addSprite(2,0, heart)

setInterval(() => {
  getFirst(player).y += player_y
  if (tilesWith(acid, player).length >= 1){
    level = level
    setMap(levels[level])
    hearts += 1
    heart_load()
  }  
  if (tilesWith(dead_support, player).length >= 1){
    level = level
    setMap(levels[level])
    hearts += 1
    heart_load()
  }
}, 800)

setInterval(() => {
  if (tilesWith(finish_space, player).length >= 1) {
    getFirst(player).x = 0
    getFirst(player).y = 0
    level = level + 1
    if (level >= levels.length) {
      setMap(youWin)
    } else {
      setMap(levels[level])
      heart_load()
    }
  }
}, 5)

