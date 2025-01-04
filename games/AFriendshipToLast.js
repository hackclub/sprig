/*
@title: Friendship!!! <3
@author: ncase ( original ), jacker
@tags: ['strategy']
@addedOn: 2022-07-27

Instructions:

Vera Vertical can only move up & down.
Horace Horizontal can only move left & right.
They can push each other.
They can't get to the goals... unless they work together!
Welcome...
to FRIENDSHIP!!!
*/

const vera = "v";
const horace = "h";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ vera, bitmap`
.......00.......
......0330......
.....033330.....
....03333330....
....033333330...
...0302330230...
..033003300330..
.03333333333330.
0000000000000000
0333333333333330
.03333333333330.
..003333333330..
....033333300...
.....033330.....
......0030......
........0.......`],
  [ horace, bitmap`
.......00.......
......0500......
.....055050.....
....05550550....
....055505550...
...0502505020...
..055005050050..
.05555550555550.
0555555505555550
0555555505555550
.05555550555550.
..005555055550..
....055505500...
.....055050.....
......0000......
........0.......`],
  [ box, bitmap`
................
................
................
...CCCCCCCCC....
...CH888888C....
...CH888888C....
...CH888888C....
...CH888888C....
...CH888888C....
...CH888888C....
...CHHHHHHHC....
...CCCCCCCCC....
................
................
................
................`],
  [ goal, bitmap`
................
................
................
...2020202020...
...0........2...
...2........0...
...0........2...
...2........0...
...0........2...
...2........0...
...0........2...
...2........0...
...0202020202...
................
................
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
1111111111111111`]
);

let level = 0;
const levels = [
  map`
wwwwwwwwww
w........w
w...v....w
w........w
w........w
w...h....w
w........w
w........w
w..g..g..w
wwwwwwwwww`,
  map`
wwwwwwwwwwww
w..........w
w....v.....w
w..........w
w..........w
w....b.....w
w..........w
w........h.w
w...g.....gw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w..........w
w....v.....w
w..........w
w..........w
w....b.....w
w..........w
w....h.....w
w..g.....g.w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w..........w
w.v........w
w..........w
w....b.....w
w..........w
w..........w
w......h...w
w.....g..g.w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w.b...........w
w......v....b.w
w.............w
w.............w
w.b......b....w
w.............w
w....h........w
w...g.....g..bw
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w.............w
w.....v.......w
w.............w
w......b......w
w.............w
w.............w
w.........h...w
w.g.........g.w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..............w
w.v............w
w..............w
w.....b........w
w..............w
w..........h...w
w..............w
w...g.......g..w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..............w
w......v.......w
w..............w
w..............w
w....b.........w
w..............w
w..........h...w
w...g.....g....w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w.............w
w......v......w
w.............w
w........b....w
w.............w
w.............w
w....h........w
w.g.........g.w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w..g.................w
w...............b....w
w....................w
w.........v..........w
w....................w
w....................w
w.................h..w
w...........g........w
wwwwwwwwwwwwwwwwwwwwww`,
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
  getFirst(vera).y -= 1;
});

onInput("s", () => {
  getFirst(vera).y += 1;
});

onInput("a", () => {
  getFirst(horace).x -= 1;
});

onInput("d", () => {
  getFirst(horace).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    setMap(currentLevel);
  }
});

setSolids([ vera, horace, box, wall ]);

setPushables({
  [ vera ]: [ box, vera, horace ],
  [ horace ]: [ box, horace, vera ]
});

afterInput(() => {

  const numGoals = tilesWith(goal).length;

  const goalsCoveredByVera = tilesWith(goal, vera).length;
  const goalsCoveredByHorace = tilesWith(goal, horace).length;
  const goalsCoveredByBoxes = tilesWith(goal, box).length;
  const goalsCovered = goalsCoveredByVera + goalsCoveredByHorace + goalsCoveredByBoxes;

  if (goalsCovered === numGoals) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4 });
    }
  }
});
