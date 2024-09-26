/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Harder Block Push
@author: Game
@tags: ["sokoban-style", "hard", "advanced"]
@addedOn: 2024-09-14
*/

const player = "p"
const blocks = "b"
const goal = "g"
const wall = "w"
const goalsfx = tune`
121.95121951219512: G4-121.95121951219512 + B5~121.95121951219512,
121.95121951219512: E5-121.95121951219512 + G5^121.95121951219512 + B5~121.95121951219512,
121.95121951219512: F5-121.95121951219512 + G5^121.95121951219512 + B5~121.95121951219512,
121.95121951219512: E5-121.95121951219512 + G5^121.95121951219512 + B5~121.95121951219512,
121.95121951219512: B5~121.95121951219512,
121.95121951219512: G5-121.95121951219512 + B5~121.95121951219512,
3170.7317073170734`

setLegend(
  [player, bitmap`
..00000..00000..
..00000..00000..
....0......0....
....00000000....
.....000000.....
00...020020...00
00...020020...00
0000000000000000
00...000000...00
00...022220...00
.....000000.....
....00000000....
....0......0....
....0......0....
..00000..00000..
..00000..00000..`],
  [blocks, bitmap`
................
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
................`],
  [goal, bitmap`
................
...4444444444...
..444444444444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [wall, bitmap`
................
...0000000000...
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
...0000000000...
................`]
)

setSolids([blocks, player, wall])

let level = 0
const levels = [
  map`
........w..
..b...wbw..
.bbb...b...
..b........
.....b...b.
.b...pw.b.w
....bww.b..
......w.gb.
.bw....bw..
..b...b....
...........`,
  map`
....w.....p
.b.b.b.b.b.
w.........w
.b.b...b.b.
...w.b.w...
.b..bgb..b.
w..w.b.w..w
.b.b...b.b.
...........
.b.b.b.b.b.
..w...w...w`,
  map`
.....w.....
....bbb....
.....b.....
.....g.....
....wbw....
.bwbbpbbwb.
....wbw....
...b.b.b...
..b..w..b..
.b...b...b.
...........`,
]

const levelsgoalposx = [
  8,
  5,
  5
];

const levelsgoalposy = [
  7,
  5,
  3
];


setMap(levels[level])

setPushables({
  [player]: [blocks]
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  console.log(tilesWith(blocks, goal))
  console.log(getTile(levelsgoalposx[level], levelsgoalposy[level]))
  if (tilesWith(goal, blocks).length >= 1) {
    clearTile(levelsgoalposx[level], levelsgoalposy[level])
    addSprite(levelsgoalposx[level], levelsgoalposy[level], goal)
    playTune(goalsfx)
  }
  if (getAll(blocks).length <= 0) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You somehow win!", { y: 4, color: color`7` });
    }
  }
})

