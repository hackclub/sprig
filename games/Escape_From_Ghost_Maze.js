/*
@title: escape from ghost maze
@author: Jlee123
@tags: ['puzzle']
@addedOn: 2024-05-10
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const player = "p"
const grass = "r"
const talisman = "t"
const goal = "g"
const box = "b"
const chaser = "e"
const fakegoal = "f"


setLegend(
  [player, bitmap`
................
................
.......00.......
......0..0......
.....0....0.....
.....0....0.....
......0..0......
.......00.......
.....00000......
....0..0..0.....
....0..0..0.....
....0.0000......
.....0...0......
.....0...0......
.....0...0......
.....0...0......`],
  [talisman, bitmap`
................
................
.....666666.....
.....663336.....
.....636666.....
.....666366.....
.....663366.....
.....666666.....
.....636636.....
.....666366.....
.....663666.....
.....663366.....
.....636636.....
.....666666.....
................
................`],
  [goal, bitmap`
................
................
.....CCCCCC.....
....CCCCCCCC....
...CCCCLLCCCC...
...CCLLCCLLCC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCC66CLC...
...CLCCC66CLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...`],
  [box, bitmap`
11111L11111L1111
11111L11111L1111
11111L11111L1111
LLLLLLLLLLLLLLLL
L11111L11111L111
L11111L11111L111
L11111L11111L111
LLLLLLLLLLLLLLLL
11111L11111L1111
11111L11111L1111
11111L11111L1111
LLLLLLLLLLLLLLLL
L11111L11111L111
L11111L11111L111
L11111L11111L111
LLLLLLLLLLLLLLLL`],
  [chaser, bitmap`
................
................
.....222222.....
.....222222.....
....22222222....
....22022022....
....22022022....
....22222222....
...2222222222...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
..222222222222..
..222022220222..
.....0....0.....`],
  [fakegoal, bitmap`
................
................
.....CCCCCC.....
....CCCCCCCC....
...CCCCLLCCCC...
...CCLLCCLLCC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCC36CLC...
...CLCCC33CLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...
...CLCCCCCCLC...`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)


setSolids([player, talisman, box, fakegoal])
setPushables({
  [player]: [talisman, player]
})

let difficulty = "m"
var start = false
var stun = 0
let level = 0
var interval = 500
const levels = [
  map`
.....
.....
.....
.....`,
  map`
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
...............
e...p..t......g`,
  map`
g.b.
b.b.
....
bb.b
....
.bbb
.b..
.bb.
....
b.b.
.t..
b.bb
b...
p.bb
....
..b.
.beb`,
  map`
bbbbbbbbbbbbbbb
....bb....b...g
.b.....b.bbbb.b
.bbbbbbb..bb..b
...b...bb...b.b
...b.bbbbbb.b..
.b.b......b.bb.
.bbb.bbb..b.b..
.....b...b.....
.bbbtbbb.b.b.bb
...b...b.b.b.bb
.b.b.bbb...b.bf
pbbb..eb.bbb...`,
  map`
beb...b....b...
b.b.t.b....b.t.
b.b.b.b.b.fb.b.
b.b.b.b.b..b.b.
b.b.b.b.b..b.b.
bpb.b.b.b..b.b.
b.b.b.b.b.gb.b.
b.b.b.b.b..b.b.
b.b.b.b.b..b.b.
b.b.b.b.bfb..b.
b.b.b.b.bbb..b.
b.b.b.b.....b..
b...b.bbbbbbb.b
b...b..........`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbb
.........................
e...p...................g
bbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbb
......................
e....p...............g
bbbbbbbbbbbbbbbbbbbbbb`,
  map`
.............e...............
.............................
...bbbbbbbbbbbbbbbbbbbbbbb...
bbb.......................bbb
f............p..............g
bbbbbbbbbbbbbbbbbbbbbbbbbbbbb
...b...b...b...b...b...b...b.
...b...b...b...b...b...b...b.
...b...b...b...b...b...b...b.`,
  map`
...........
...........
...........
...........
...........
.....p.....
rrrrrrrrrrr`
]

addText("Escape maze \nfrom spooky ghost \n\npress k for \nregular gameplay \n\n\npress l for \nsore fingers", {
  x: 1,
  y: 3,
  color: color`0`
});

setMap(levels[level])

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("k", () => {
  interval = 500
  level = 1
  clearText();
  setMap(levels[level])
  begin()
})

onInput("l", () => {
  interval = 300
  level = 1
  clearText();
  setMap(levels[level])
  begin()
})

afterInput(() => {
  start = true
})

function begin() {
  clearInterval(game);
  game = setInterval(chase, interval)
}

function chase() {
  if (start == true) {
    if (getFirst(player).x == getFirst(goal).x && getFirst(player).y == getFirst(goal).y) {
      level += 1
      setMap(levels[level])
      start = false
      stun = 0
    }
    if (stun <= 0) {
      if (getFirst(player).x > getFirst(chaser).x) {
        getFirst(chaser).x += 1
      } else if (getFirst(player).x < getFirst(chaser).x) {
        getFirst(chaser).x -= 1
      }
      if (getFirst(player).y < getFirst(chaser).y) {
        getFirst(chaser).y -= 1
      } else if (getFirst(player).y > getFirst(chaser).y) {
        getFirst(chaser).y += 1
      }
    } else {
      stun -= 1
    }
    if (getFirst(player).x == getFirst(chaser).x && getFirst(player).y == getFirst(chaser).y) {
      setMap(levels[level])
      start = false
      stun = 0
    }
    if (getFirst(talisman).x == getFirst(chaser).x && getFirst(talisman).y == getFirst(chaser).y) {
      getFirst(talisman).remove()
      stun = 3
    }
  }
  if (level == 8) {
    clearInterval()
    addText("You escaped \nthe maze!\n\nNow enjoy \nyour life\nOr restart by\npressing k or l", {
      x: 1,
      y: 3,
      color: color`0`
    });
  }
}
var game = setInterval(chase, interval)
