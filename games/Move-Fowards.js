/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: untitled
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"

setLegend(
  [ player, bitmap`
.......0........
......030.......
.....03330......
.....03330......
.....03300......
.....03330......
.....03330......
......030.......
......030.......
......030.......
......030.......
......030.......
......030.......
......030.......
......030.......
......00000.....` ],
  [ wall, bitmap`
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
  [ goal, bitmap`
4444444444444444
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4444444444444444` ],
)

setSolids([player, wall])

// Create a tune:
const melody = tune`
500: C4~500 + E5^500,
500: C4~500 + E5^500,
500: D4~500 + F5^500,
500: E4~500 + G5^500,
500: D4~500 + F5^500,
1500,
500: C4~500 + E5^500,
500: C4~500 + E5^500,
500: D4~500 + D5^500,
500: E4~500 + C5^500,
500: F4~500 + B4^500,
500: E4~500 + C5^500,
500: D4~500 + D5^500,
500,
500: C4~500 + E5^500,
500: C4~500 + E5^500,
500: D4~500 + F5^500,
500: E4~500 + G5^500,
500: D4~500 + F5^500,
1500,
500: C4~500 + E5^500,
500: D4~500 + D5^500,
500: C4~500 + E5^500,
500: D4~500 + D5^500,
500: E4~500 + C5^500,
500: D4~500 + D5^500,
500: C4~500 + E5^500,
500`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)


let level = 0
const levels = [
  map`
pw
.g`,
  map`
www
p..
wwg`,
  map`
pwwg
....
w..w
.ww.`,
  map`
pw...
...wg
w..ww
.w...
..w..`,
  map`
....w.
..w...
p...wg
ww..ww
..w...
...w..`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => { // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 1, color: color`7` });
    }
  }
});