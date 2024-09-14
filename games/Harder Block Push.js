/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Harder Block Push
@author: Game
@tags: []
@addedOn: 2024-9-14
*/

const player = "p"
const blocks = "b"
const goal = "g"
const goalsfx = tune`
120: A4^120 + A5^120 + E5^120,
120: A4^120 + A5^120 + E5^120,
120: A4^120 + A5^120 + E5^120,
120: A4^120 + A5^120 + E5^120,
120: A4^120 + A5^120 + E5^120,
120: A4^120 + A5^120 + E5^120,
3120`

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
................`]
)

setSolids([blocks, player])

let level = 0
const levels = [
  map`
...........
..b....b...
.bbb...b...
..b........
.....b...b.
.b...p..b..
....b...b..
........gb.
.b.....b...
..b...b....
...........`,
  map`
..........p
.b.b.b.b.b.
...........
.b.b...b.b.
.....b.....
.b..bgb..b.
.....b.....
.b.b...b.b.
...........
.b.b.b.b.b.
...........`,
  map`7`
]

const levelsgoalposx = [
  8,
  5,
  10
];

const levelsgoalposy = [
  7,
  5,
  5
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
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
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

    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You somehow win!", { y: 4, color: color`3` });
    }
  }
})