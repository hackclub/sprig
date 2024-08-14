/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Lost king
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const box = "b"
const goal = "g"
const boxWhite = "w"
const red = "r"

setLegend(
  [ player, bitmap`
................
................
................
.........00.....
........0200....
.........00.....
.......77777..0.
.......7525700..
......072527..0.
...0.0.75257....
....00.77777....
........0..0....
........0..0....
.......00.00....
................
................` ],
  [ box, bitmap`
0000000000000000
0111111111111LL0
01L1111111111LL0
01LL111111111LL0
0111112121111110
01LL1111111211L0
0111111111111110
01111L1121111110
01L111111111L100
01L11112111111L0
01111111111111L0
01L11111211L11L0
01111111111111L0
01011L1111111100
00L0000000LLLL00
0000000000000000` ],
  [ goal, bitmap`
................
................
................
................
...66......66...
..6236....6326..
...66..33..66...
...66..33..66...
...6666666666...
...66222222666..
..622666666226..
...62282282266..
...2666666662...
...6........6...
................
................` ],
  [ boxWhite, bitmap `
44444D44444444D4
44D44D4444444DD4
44444D444444D4D4
44444D44444D44D4
44D44D4444D444D4
44444D444D4444D4
44444D44DD4444D4
44444D4D4444D4D4
4D444DD4444444D4
44444D444D4444D4
4444D444DD4444D4
44444444DD44D444
44D4444444444444
44444D44444D4444
444444D4444444D4
4444444444444444`], 
  [ red, bitmap `
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ]
)

setSolids([ box, boxWhite, player ])

let level = 0
const levels = [
  map`
g.b....
.....b.
.b.bbb.
bbb....
b..bbb.
b....b.
b.b....
p.bbbbb`,
  map `
pbbbbbbbbbb
.b.....b.b.
.bb.bbbb.b.
....bb...b.
b.b.bb.b...
b.b.b..bbb.
b.b.b..b.b.
b.bbb.bb.b.
b.....b..b.
bbbbb.b..b.
....b....bg`, 
  map `
...........g
.bbbbbbbbbbb
.b.........b
.b.bbb.....b
.b.b..bbbb.b
.........b.b
.bbbbbbbbb.b
.b.bbb.....b
..b....bbbbb
bb.bb.bbb...
.b..b.b.....
.b..b.b.b...
.b..b...b...
.bbbb.bbbbbb
p...........`, 
  map `
pbbbbbbbb......
.b......bb..bb.
.bgb.b.b.bb..b.
.bbb.....b.b.b.
.b..b.b..b...b.
.bb......b..bb.
.bb...b..bb..b.
.b.b.b..b....b.
.b.......b.bbb.
.bb.b........b.
.b....bb.b...b.
.b.b.b..b....b.
.bbbbbbbbbbbbb.
...............`,
  map `
.bpb..b...
b..b..b.b.
b.b...b.b.
b.b.b.bbb.
b.b.b...b.
b.b.b.b.b.
b...bbb.b.
bbbb.....g`, 
  map `
.b...b...b...b...b...b...
pb.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
.b.b.b.b.b.b.b.b.b.b.b.b.
...b...b...b...b...b...bg`, 
  ]
setMap(levels[level])

setPushables({
  [ player ]: []
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
/*
afterInput(() => {
  const checkIfWon = tilesWith(goal, player).length;
  if(checkIfWon === 0) {
    addText("you win!");
});
*/
afterInput(() => {
  // count the number of tiles with goals and boxes
  const goalNum = tilesWith(goal, player).length;

  if (goalNum === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
  }
);