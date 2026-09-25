/*
@title: MicroMania
@author: DotDvn
@description: Collect three chips in five seconds while dodging a chasing glitch. Clear five rounds with three lives.
@tags: ['arcade', 'action']
@addedOn: 2026-09-25
*/

const hero = "p", chip = "c", glitch = "e", wall = "w", floor = "f";

setLegend(
  [hero, bitmap`
................
.....000000.....
....08888880....
...0888888880...
...0828822880...
...0888888880...
....00000000....
...0888888880...
..088888888880..
..088888888880..
..088888888880..
...0888888880...
....00....00....
....00....00....
................
................`],
  [chip, bitmap`
................
.......5........
......555.......
.....55555......
....5555555.....
...555255555....
..55555555555...
...555555555....
....5555555.....
.....55555......
......555.......
.......5........
................
................
................
................`],
  [glitch, bitmap`
................
................
....333333......
...33333333.....
..3300330033....
..3302332033....
..3333333333....
...33333333.....
..3333333333....
..33.3333.33....
...333..333.....
..33......33....
................
................
................
................`],
  [wall, bitmap`
1111111111111111
1188888888888811
1188888888888811
1111111111111111
1111111111111111
1188888888888811
1188888888888811
1111111111111111
1111111111111111
1188888888888811
1188888888888811
1111111111111111
1111111111111111
1188888888888811
1188888888888811
1111111111111111`],
  [floor, bitmap`
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
0000000000000000`]
);
setBackground(floor);
setSolids([hero, wall]);

const blank = map`
..........
..........
..........
..........
..........
..........
..........
..........
`;
const rooms = [
  map`
..........
..........
wwwwwwwwww
w...c....w
w..pcc...w
w......e.w
w........w
wwwwwwwwww
`,
  map`
..........
..........
wwwwwwwwww
w.cc.....w
w.cp.....w
w......e.w
w........w
wwwwwwwwww
`,
  map`
..........
..........
wwwwwwwwww
w..cc....w
w..pc....w
w......e.w
w........w
wwwwwwwwww
`
];

let score = 0, lives = 3, seconds = 5, mode = "menu";

function screen(title, line) {
  setMap(blank);
  clearText();
  addText("MICROMANIA", { x: 4, y: 2, color: color`5` });
  addText(title, { x: 5, y: 5, color: color`2` });
  addText(line, { x: 4, y: 8, color: color`8` });
  addText("BY DOTDVN", { x: 5, y: 12, color: color`2` });
}

function hud() {
  clearText();
  addText("MICROMANIA", { x: 4, y: 0, color: color`5` });
  addText(`S${score}/5  L${lives}  ${seconds}s`, {
    x: 4, y: 2, color: color`2`
  });
}

function round() {
  seconds = 5;
  setMap(rooms[score % rooms.length]);
  hud();
}

function hit() {
  lives--;
  if (lives === 0) {
    mode = "over";
    screen("GAME OVER", "J TO REPLAY");
  } else round();
}

function collect() {
  const p = getFirst(hero);
  for (const c of getAll(chip)) {
    if (c.x === p.x && c.y === p.y) c.remove();
  }
  if (getAll(chip).length === 0) {
    score++;
    if (score === 5) {
      mode = "win";
      screen("YOU WIN!", "J TO REPLAY");
    } else round();
  }
}

function move(dx, dy) {
  if (mode !== "play") return;
  const p = getFirst(hero);
  p.x += dx;
  p.y += dy;
}
onInput("w", () => move(0, -1));
onInput("a", () => move(-1, 0));
onInput("s", () => move(0, 1));
onInput("d", () => move(1, 0));
onInput("j", () => {
  score = 0; lives = 3; mode = "play"; round();
});

afterInput(() => {
  if (mode !== "play") return;
  if (tilesWith(hero, glitch).length) hit();
  else collect();
});

setInterval(() => {
  if (mode !== "play") return;
  seconds--;
  if (seconds === 0) return hit();

  const p = getFirst(hero), e = getFirst(glitch);
  if (e.x > p.x) e.x--;
  else if (e.x < p.x) e.x++;
  else if (e.y > p.y) e.y--;
  else if (e.y < p.y) e.y++;

  if (tilesWith(hero, glitch).length) hit();
  else hud();
}, 1000);

screen("GET 3 CHIPS", "J TO START");
