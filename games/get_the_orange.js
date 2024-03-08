/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p";
const orange = "o";
const wall = "w";
const apple = "a";
const goal = "g";

setLegend(
  [ player, bitmap`
................
................
...CC.......CC..
..CCCCCCCCCCCCC.
..CCCCCCCCCCCCC.
...CCCCCCCCCCC..
...CCC0CCC0CCC..
...CCCCCCCCCCC..
...CC0CCCCC0CC..
...CCC00000CCC..
...CCCCCC33CCC..
....CCCCC33CC...
.....CCCCCCC....
................
................
................` ],
  [ orange, bitmap `
................
................
........4.......
.......4........
.....9999.......
....909099......
....999999......
....099909......
....900099......
.....9999.......
................
................
................
................
................
................`],
  [wall, bitmap `
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
0000000000000000`],
  [goal, bitmap `
................
................
................
................
.....DDDDDD.....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
.....DDDDDD.....
................
................
................
................`]
)

setSolids([player, orange, wall])

let level = 0
const levels = [
  map`
p..
..o
..g`,
  map`
p..w
wwow
gw..
....
..ww`,
  map`
wwwwww
p..w.w
...w..
ww...w
w...gw
w.o..w
www...`,
  map`
p.w..
..wo.
w....
.....
.g.ww`
];
const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [orange]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
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

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, orange).length;

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
      addText("you win!", { y: 4, color: color`8` });
    }
  }
});

