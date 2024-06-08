/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Amazing
@author: Dilon
@tags: []
@img: ""
@addedOn: 2024-06-07

Mechanics inspired by Maze_Runner3 by Charlie
*/

const player = "p"
const box = "b"
const coin = "g"
const boxWhite = "w"

setLegend(
  [ player, bitmap`
................
................
................
................
...66666666.....
...66666666.....
...60066006.....
...66666666.....
...60666606.....
...60066006.....
...66000066.....
...66666666.....
................
................
................
................` ],
  [ box, bitmap`
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
  [coin, bitmap`
  ....00000000....
  ...0222222660...
  ..026666666660..
  .0266622FF666F0.
  026662266FF666F0
  0266626666F666F0
  0266626666F666F0
  0266626666F666F0
  0266626666F666F0
  0266626666F666F0
  0266626666F666F0
  026662266FF666F0
  .0266622FF666F0.
  ..0666666666F0..
  ...066FFFFFF0...
  ....00000000....`],
  [ boxWhite, bitmap `
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
  ................
  ................
  ................
  ................
  ................
  ................`]
)

setSolids([ box, boxWhite, player ])

let level = 0
const levels = [
  map`
pbbb
....
b.bb
b..g`,
  map `
p.bbb..
.bb.bbb
.b.....
.bb.b.b
.b..b..
...bb..
bbb.b.g`, 
  map `
p......b.
bbbbbb.b.
.b.......
....bbbbb
..b......
bbb.b.bbb
..b.b..b.
..b.b.bb.
..b.b...g`, 
  map `
p...bb
.bb..b
..bb..
b..bb.
bb..b.
bbb.bg`, 
  map `
pbbb.b..b...b............
.bbb.b..b...b.bbbbbbbbbbb
........bbb.b..b.........
bbb.bbb........b..bbbbbb.
.........b.bbb.b.bb....b.
.bbbbb..bb.....bbbbbb..b.
.....b.bbb.b...b.......b.
.bbb.b.b.....b.b...bbbbbb
.....b.b..bbbb.b..bb...b.
..bbbb...bbb.b....b......
...b.b.b..b...b.b.b.bbb..
.b.b...b..b...b...b.b.b..
.b.b...b..b..bbbbbb.b.b..
.b.bbbbbb.bb......b.b.b..
...b.b..b.....b.....b.b..
bbb..b..bbbbb.b.bbbbbbb..
b.b.bbb.b...bbbbb.b...b..
bbb.........b.b...b.bbbb.
..b.b.bbbbb...b.b.b......
..b.bbb......bb...b..bbbb
..b...bbb.bbbbb......b...
bbb.b.b.b..b....bbbbbb.b.
..b.b...b..w...bb......b.
....b...b..b..bbb..bbbbbb
bbbbbb.b..bbb...........g` 
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

afterInput(() => {
  const won = tilesWith(coin, player).length;
  
  if (won) {
    level++;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      level = 0;
      setMap(levels[level])
    }
  }
  }
);
