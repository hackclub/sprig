/*
@title: Glacial Slide
@author: Rudra
@tags: ['puzzle']
@description: Slide across the slippery ice rooms to reach the fish across 7 levels.
@addedOn: 2026-11-10
*/

const player = bitmap`
................
.....0000.......
....033330......
...03303377.....
...033333777....
...04444400.....
..044444440.....
..0033333300....
.00333333330....
.00311333330....
.00111333330....
..0111333300....
...00033300.....
.....077700.....
....777777......
................
`;

const wall = bitmap`
.333333333333...
38888888888883..
383388889988880.
383388899998880.
388888999888880.
388889988888880.
.0888998888880..
.0888888888880..
.0888833888880..
.0888338889980..
.0888888899990..
.0888888999880..
.0998888998880..
.0999988888880..
..000000000000..
................
`;

const goal = bitmap`
................
........777.....
.....7777777....
....770777777...
...77777777777..
..7777747777777.
..7777444777.777
...77774777...77
....7777777...77
.....7777777.777
.......7777777..
.........777....
....88..........
...8888.........
....88..........
................
`;

const mud = bitmap`
................
................
.....111........
...1111111.1....
..11011111111...
.1100111101111..
.1111111001111..
..111111111111..
...1111111111...
.1..11111111....
.....11111......
.......11.......
................
................
................
................
`;

const cracked = bitmap`
8888888888888888
8333333333333338
83..0...0....338
83...0..0.....38
83....0.0..0..38
83.....00.0...38
83.0000000000.38
83.....00.....38
83....0..0....38
83...0....00..38
83..0.......0.38
83.0.........038
83............38
8333333333333338
8888888888888888
0000000000000000
`;

const hole = bitmap`
................
...0000000......
..099999990.....
.09900000990....
.090000000990...
09000000000990..
09000000000090..
09000000000090..
09900000000990..
.099000000990...
..09990009990...
...099999990....
....0000000.....
................
................
................
`;

const sfxSlide = tune`
320: c4-25
`;

const sfxMud = tune`
200: f2-60
`;

const sfxCrack = tune`
220: e3-50, c3-70
`;

const sfxWin = tune`
150: c4-80, e4-80, g4-80, c5-260
`;

setLegend(
  ["p", player],
  ["w", wall],
  ["g", goal],
  ["m", mud],
  ["c", cracked],
  ["h", hole]
);

const levels = [
  map`
wwwwwwww
wp....ww
w..w...w
w......w
w...w..w
w......w
w...g..w
wwwwwwww
`,

  map`
wwwwwwww
wp...w.w
w.w....w
w...m..w
ww.....w
w.w..w.w
w....g.w
wwwwwwww
`,

  map`
wwwwwwww
wp...w.w
w..c..ww
ww....gw
w......w
w.....ww
w.w....w
wwwwwwww
`,

  map`
wwwwwwww
wp.....w
w......w
w...m..w
ww....ww
wwg....w
w...w..w
wwwwwwww
`,

  map`
wwwwwwww
wp.w...w
w.m.m..w
ww...www
w...m..w
w.w....w
w..w.g.w
wwwwwwww
`,

  map`
wwwwwwww
wp.....w
w...c..w
ww.gw..w
w......w
w......w
w..w...w
wwwwwwww
`,

  map`
wwwwwwww
wp.w..ww
w.w..c.w
w...mw.w
ww..w..w
w.w....w
w..w..gw
wwwwwwww
`
];

let stage = 0;
let sliding = false;

function isSolid(x, y) {
  const cell = getTile(x, y);
  for (let i = 0; i < cell.length; i++) {
    const t = cell[i].type;
    if (t === "w" || t === "h") return true;
  }
  return false;
}

function stepSlide(dx, dy) {
  if (stage >= levels.length || sliding) return;

  const hero = getFirst("p");
  if (!hero) return;

  sliding = true;
  let stepsTaken = 0;

  while (!isSolid(hero.x + dx, hero.y + dy)) {
    const underfoot = getTile(hero.x, hero.y).find(t => t.type === "c");
    if (underfoot) {
      underfoot.remove();
      addSprite(hero.x, hero.y, "h");
      playTune(sfxCrack);
    }

    hero.x += dx;
    hero.y += dy;
    stepsTaken++;

    const here = getTile(hero.x, hero.y);

    if (here.some(t => t.type === "m")) {
      playTune(sfxMud);
      break;
    }

    if (here.some(t => t.type === "g")) break;
  }

  if (stepsTaken > 0) {
    playTune(sfxSlide);

    if (getTile(hero.x, hero.y).some(t => t.type === "g")) {
      stage++;
      if (stage < levels.length) {
        setMap(levels[stage]);
      } else {
        playTune(sfxWin);
        addText("YOU WIN!", { y: 4 });
      }
    }
  }

  sliding = false;
}

onInput("w", () => stepSlide(0, -1));
onInput("s", () => stepSlide(0, 1));
onInput("a", () => stepSlide(-1, 0));
onInput("d", () => stepSlide(1, 0));
onInput("j", () => {
  if (stage < levels.length) setMap(levels[stage]);
});

setMap(levels[stage]);