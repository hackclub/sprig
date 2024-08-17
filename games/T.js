/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Enhanced Maze Game
@author: Your Name
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const wall = "w";
const goal = "g";
const block = "b";

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ goal, bitmap`
................
................
................
.......222......
......2..2......
.....2....2.....
....2......2....
....22222222....
.........2......
.........2......
.........2......
.........2......
.........2......
.........2......
.........2......
................`],
  [ block, bitmap`
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
3333333333333333`]
);

setSolids([player, wall, block]);

let level = 0;
let startTime = Date.now();
let gameDuration = 60000; // 1 minute in milliseconds

const levels = [
  map`
p.w.w.
..b..g
.wwww.
....w.
..w...
..w...`,
  map`
p.w.w.w
..b..g.
.wwww..
..b..w.
..ww.w.
.b...w.
....g..`,
  map`
p....w..
..b.w...
.wwww..g
..b..w..
....w.w.
.b...w..
....g...`,
  map`
p.w..w..
..b..w..
.wwww.w.
..b..w..
....w.w.
.b...w..
....g..g`,
  map`
p...w..w
..b.w.w.
.wwww..g
..b..w..
....w.w.
.b...w..
....g.w.`
];

setMap(levels[level]);

setPushables({
  [player]: [block]
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const playerPosition = getFirst(player);

  // Check if the player reached the goal
  if (getTile(playerPosition.x, playerPosition.y).some(obj => obj.type === goal)) {
    level += 1;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      let currentTime = Date.now();
      let elapsedTime = currentTime - startTime;

      if (elapsedTime < gameDuration) {
        // Loop the levels to ensure minimum gameplay time
        level = 0;
        setMap(levels[level]);
      } else {
        addText("You Win!", { y: 4, color: [0, 255, 0] });
      }
    }
  }
});