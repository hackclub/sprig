/*
@title: Neon Escape
@description: Collect all crystals and avoid the red hazards!
@author: Custom
@tags: ['arcade', 'puzzle']
@addedOn: 2026-06-06
*/

const player = "p";
const wall = "w";
const coin = "c";
const hazard = "h";

setLegend(
  [ player, bitmap`
    ................
    ......0000......
    .....033330.....
    ....03999930....
    ....03900930....
    ...0390330930...
    ...0390330930...
    ...039999930....
    ....03333330....
    .....000000.....
    ....00....00....
    ...0........0...
    ..0..........0..
    ................
    ................
    ................`
  ],
  [ wall, bitmap`
    3333333333333333
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3..............3
    3333333333333333`
  ],
  [ coin, bitmap`
    ................
    ................
    .....7777.......
    ....777777......
    ...77777777.....
    ....777777......
    .....7777.......
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................`
  ],
  [ hazard, bitmap`
    ................
    .....2......2...
    ......2....2....
    .......2..2.....
    ........22......
    .......2..2.....
    ......2....2....
    .....2......2...
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................`
  ]
);

const levels = [
  map`
    wwwwwwwwwwwwwwwww
    wp....c........hw
    w...wwwwwww...www
    w...w.....c.....w
    w...w.w.w.www...w
    wc....w.h...c...w
    w...www.w.www...w
    w...c...c.......w
    wwwwwwwwwwwwwwwww
  `,
  map`
    wwwwwwwwwwwwwwwww
    wpc...h...c....hw
    w.wwwww.wwwww.www
    w.w.....c.....w.w
    w.w.w.wwwww.w.w.w
    w.c.w...h...w.c.w
    w.w.w.wwwww.w.w.w
    w...c.........pcw
    wwwwwwwwwwwwwwwww
  `,
  map`
    wwwwwwwwwwwwwwwww
    wp.c.h.c.h.c.p.hw
    w.www.w.w.w.ww.hw
    w.c...w...w....cw
    w.www.w.w.w.ww.ww
    w.c...h...h....cw
    w.wwwwwwwwwwwww.w
    wpc...........pcw
    wwwwwwwwwwwwwwwww
  `,
  map`
    wwwwwwwwwwwwwwwww
    wph...c...c...hpw
    w.w.wwwww.wwwww.w
    w.c.w...c...c.w.w
    w.w.w.w.w.w.w.w.w
    w.c.w.c.h.c.w.c.w
    w.w.w.w.w.w.w.w.w
    wpc...c...c...pcw
    wwwwwwwwwwwwwwwww
  `
];

let currentLevel = 0;
setMap(levels[currentLevel]);
setSolids([player, wall, hazard]);

onInput("w", () => {
  const p = getFirst(player);
  const target = getTile(p.x, p.y - 1);
  if (!target.some(s => s.type === wall)) p.y -= 1;
});

onInput("s", () => {
  const p = getFirst(player);
  const target = getTile(p.x, p.y + 1);
  if (!target.some(s => s.type === wall)) p.y += 1;
});

onInput("a", () => {
  const p = getFirst(player);
  const target = getTile(p.x - 1, p.y);
  if (!target.some(s => s.type === wall)) p.x -= 1;
});

onInput("d", () => {
  const p = getFirst(player);
  const target = getTile(p.x + 1, p.y);
  if (!target.some(s => s.type === wall)) p.x += 1;
});

afterInput(() => {
  const p = getFirst(player);
  
  const tileItems = getTile(p.x, p.y);
  if (tileItems.some(s => s.type === hazard)) {
    addText("Ouch! Resetting...", { x: 3, y: 3, color: color`2` });
    setTimeout(() => {
      clearText();
      setMap(levels[currentLevel]);
    }, 500);
    return;
  }

  tileItems.forEach(s => {
    if (s.type === coin) {
      s.remove();
    }
  });

  if (getAll(coin).length === 0) {
    currentLevel++;
    if (currentLevel < levels.length) {
      addText("Level Complete!", { x: 4, y: 4, color: color`7` });
      setTimeout(() => {
        clearText();
        setMap(levels[currentLevel]);
      }, 1000);
    } else {
      addText("YOU WIN!", { x: 5, y: 4, color: color`5` });
    }
  }
});