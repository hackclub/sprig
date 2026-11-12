/*
@title: Molibra game
@author: MOHAMED
@description: Collecting crystals and avoiding hazards is the big challenge and the main difficulty
@tags: ['puzzle', 'retro']
@addedOn: 2026-11-12
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
    w...c..........cw
    wwwwwwwwwwwwwwwww
  `,
  map`
    wwwwwwwwwwwwwwwww
    wp.c.h.c.h.c.c.hw
    w.www.w.w.w.ww.hw
    w.c...w...w....cw
    w.www.w.w.w.ww.ww
    w.c...h...h....cw
    w.wwwwwwwwwwwww.w
    w.c...........c.w
    wwwwwwwwwwwwwwwww
  `,
  map`
    wwwwwwwwwwwwwwwww
    wph...c...c...h.w
    w.w.wwwww.wwwww.w
    w.c.w...c...c.w.w
    w.w.w.w.w.w.w.w.w
    w.c.w.c.h.c.w.c.w
    w.w.w.w.w.w.w.w.w
    w.c...c...c...c.w
    wwwwwwwwwwwwwwwww
  `,
  map`
    wwwwwwwwwwwwwwwww
    wp.h.c.h.c.h.c.hw
    w.w.w.w.w.w.w.w.w
    wc.h.c.h.c.h.c.cw
    w.w.w.w.w.w.w.w.w
    wc.h.c.h.c.h.c.cw
    w.w.w.w.w.w.w.w.w
    w.c...c...c...c.w
    wwwwwwwwwwwwwwwww
  `
];

let currentLevel = 0;
let isBusy = false;

setMap(levels[currentLevel]);
setSolids([player, wall]);

onInput("w", () => {
  if (isBusy) return;
  const p = getFirst(player);
  if (!p) return;
  const target = getTile(p.x, p.y - 1);
  if (target && !target.some(s => s.type === wall)) {
    p.y -= 1;
  }
});

onInput("s", () => {
  if (isBusy) return;
  const p = getFirst(player);
  if (!p) return;
  const target = getTile(p.x, p.y + 1);
  if (target && !target.some(s => s.type === wall)) {
    p.y += 1;
  }
});

onInput("a", () => {
  if (isBusy) return;
  const p = getFirst(player);
  if (!p) return;
  const target = getTile(p.x - 1, p.y);
  if (target && !target.some(s => s.type === wall)) {
    p.x -= 1;
  }
});

onInput("d", () => {
  if (isBusy) return;
  const p = getFirst(player);
  if (!p) return;
  const target = getTile(p.x + 1, p.y);
  if (target && !target.some(s => s.type === wall)) {
    p.x += 1;
  }
});

afterInput(() => {
  if (isBusy) return;
  const p = getFirst(player);
  if (!p) return;

  const tileItems = getTile(p.x, p.y);

  if (tileItems.some(s => s.type === hazard)) {
    isBusy = true;
    addText("Ouch! Resetting...", { y: 4, color: color`2` });
    setTimeout(() => {
      clearText();
      setMap(levels[currentLevel]);
      isBusy = false;
    }, 450);
    return;
  }

  tileItems.forEach(s => {
    if (s.type === coin) {
      s.remove();
    }
  });

  if (getAll(coin).length === 0) {
    isBusy = true;
    currentLevel++;
    if (currentLevel < levels.length) {
      addText(`Level ${currentLevel + 1}!`, { y: 4, color: color`7` });
      setTimeout(() => {
        clearText();
        setMap(levels[currentLevel]);
        isBusy = false;
      }, 700);
    } else {
      addText("YOU ESCAPED! YOU WIN!", { y: 4, color: color`3` });
    }
  }
});
