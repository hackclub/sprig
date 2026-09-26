/*
 @title: Maze Escape
 @description: Navigate the maze to reach the goal!
*/

// Define sprite keys
const player = "p";
const wall = "w";
const goal = "g";

// Define graphics (bitmaps) for each sprite
setLegend(
  [
    player,
    bitmap`
................
................
....00000000....
....0......0....
....0.0000.0....
....0.0..0.0....
....0.0..0.0....
....0.0000.0....
....0......0....
....00000000....
................
................
................
................
................
................`
  ],
  [
    wall,
    bitmap`
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
0000000000000000`
  ],
  [
    goal,
    bitmap`
................
...3333333333...
...3........3...
...3.333333.3...
...3.3....3.3...
...3.3.33.3.3...
...3.3.33.3.3...
...3.3....3.3...
...3.333333.3...
...3........3...
...3333333333...
................
................
................
................
................`
  ]
);

// Prevent player and walls from walking into/through each other
setSolids([player, wall]);

// Set up the maze map (w = Wall, p = Player start, g = Goal, . = Empty space)
const level = map`
wwwwwwwwwwwwwwww
wp.......w.....w
w.wwwwww.w.www.w
w.w....w.w...w.w
w.w.ww.w.www.w.w
w...ww.w.....w.w
wwwwww.wwwwwww.w
w..............w
w.wwwww.wwwwww.w
w.w...w.w......w
w.w.w.w.w.wwww.w
w...w.w...w..w.w
wwwww.wwwww.ww.w
w...........w.gw
wwwwwwwwwwwwwwww`;

setMap(level);

// Player Movement Controls
onInput("w", () => { getFirst(player).y -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });

// Win Condition Logic
afterInput(() => {
  const p = getFirst(player);
  const g = getFirst(goal);

  // Check if player reaches the goal tile
  if (p.x === g.x && p.y === g.y) {
    addText("YOU WIN!", { x: 4, y: 7, color: color`3` });
  }
});


