/*
@title: fight_big_parma
@author: jakempock
@tags: []
@addedOn: 2023-03-13
*/

const parmas = ["9", "8", "7", "6"];
const lazers = ["l", "h"];
const beams = ["a", "b", "c", "d", "o"]; // n e s w omni
const barriers = ["4", "3", "2", "1"];
const focus = "f";

const beamHorz = bitmap`
................
................
................
................
................
................
8888888888888888
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
................
................
................
................
................
................`;

const beamVert = bitmap`
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......`;

setLegend(
  [ focus, bitmap`
7777777777777777
75577......77557
7557........7557
77757......75777
77.77......77.77
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
77.77......77.77
77757......75777
7557........7557
75577......77557
7777777777777777`],
  [ beams[0], beamVert ],
  [ beams[1], beamHorz ],
  [ beams[2], beamVert ],
  [ beams[3], beamHorz ],
  [ beams[4], bitmap`
................
................
................
................
.......HH.......
.....HHHHHH.....
.....H8888H.....
....HH8888HH....
....HH8888HH....
.....H8888H.....
.....HHHHHH.....
.......HH.......
................
................
................
................` ],
  [ parmas[0], bitmap`
................
................
................
................
.....999999.....
..999666666999..
.96666666666669.
.99666666666699.
.96999999999969.
.96006666660069.
.96660066006669.
.96666666666669.
..990666666099..
....99999999....
................
................` ],
  [ parmas[1], bitmap`
................
................
................
................
.....99999......
..999666669.....
.96666666669....
.99666666669....
.969999999999...
.96000666600099.
.96666666666669.
.96666666666669.
..990666666099..
....99999999....
................
................` ],
  [ parmas[2], bitmap`
................
................
................
................
.....999........
..9996669.......
.96666669.......
.99666669.......
.96999999.......
.96660669.......
.960066669......
.966666669......
..99066669......
....99999.......
................
................` ],
  [ parmas[3], bitmap`
................
................
................
................
................
..99............
.96699..........
.996669.........
.969999.........
.9666069........
.9660669........
.9606669........
..99069.........
....999.........
................
................` ],
  [ barriers[0], bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD44444444DDDD
DDDDD444444DDDDD
DD4DDD4444DDD4DD
DD44DDD44DDD44DD
DD444DDDDDD444DD
DD4444D44D4444DD
DD4444D44D4444DD
DD444DDDDDD444DD
DD44DDD44DDD44DD
DD4DDD4444DDD4DD
DDDDD444444DDDDD
DDDD44444444DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ barriers[1], bitmap`
4444444444444444
4444444444444444
4444666666664444
4444466666644444
4464446666444644
4466444664446644
4466644444466644
4466664664666644
4466664664666644
4466644444466644
4466444664446644
4464446666444644
4444466666644444
4444666666664444
4444444444444444
4444444444444444` ],
  [ barriers[2], bitmap`
6666666666666666
6666666666666666
6666999999996666
6666699999966666
6696669999666966
6699666996669966
6699966666699966
6699996996999966
6699996996999966
6699966666699966
6699666996669966
6696669999666966
6666699999966666
6666999999996666
6666666666666666
6666666666666666` ],
  [ barriers[3], bitmap`
9999999999999999
9999999999999999
9999333333339999
9999933333399999
9939993333999399
9933999339993399
9933399999933399
9933339339333399
9933339339333399
9933399999933399
9933999339993399
9939993333999399
9999933333399999
9999333333339999
9999999999999999
9999999999999999` ],
  [ lazers[0], bitmap`
................
.....CCCCCC.....
......CCCC......
.......FF.......
.......FF.......
.C....CCCC....C.
.CC..CCCCCC..CC.
.CCFFCCH8CCFFCC.
.CCFFCC8HCCFFCC.
.CC..CCCCCC..CC.
.C....CCCC....C.
.......FF.......
.......FF.......
......CCCC......
.....CCCCCC.....
................` ],
  [ lazers[1], bitmap`
................
.....FFFFFF.....
...FF666666FF...
..F6666666666F..
..F6222662226F..
.F66202FF20266F.
.F66222FF22266F.
.F666FFH8FF666F.
.F666FF8HFF666F.
.F66222FF22266F.
.F66202FF20266F.
..F6222662226F..
..F6666666666F..
...FF666666FF...
.....FFFFFF.....
................` ],
  [ "#", bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ]
);

setBackground("#");

const solids = barriers.concat(parmas).concat(lazers);
setSolids(solids);

/* const startingLevel = map`
...............
...............
...............
...............
...............
...............
...............`;
setMap(startingLevel); */
let level = 0;
const levels = [
  map`
..........
..........
..........
.....l....
....f.....
..........
..........
..........`
];

const currentLevel = levels[level];
setMap(currentLevel);

let money = 100;

function showMoney() {
  addText("Money: " + money, { x: 0, y: 0, color: color`2` });
}
showMoney();

function checkSubMoney(m, f) {
  if (money >= m) {
    money -= m;
    f();
  }
}

onInput("w", () => {
  getFirst(focus).y -= 1;
});

onInput("a", () => {
  getFirst(focus).x -= 1;
});

onInput("s", () => {
  getFirst(focus).y += 1;
});

onInput("d", () => {
  getFirst(focus).x += 1;
});

let mode = 0; // 0 = normal mode, 1 = buy menu mode

let introOn = true;

onInput("i", () => {
  introOn = false;
  switch (mode) {
    case 0:
      mode = 1;
      clearText();
      addText("you is want to buy?", { x: 1, y: 0, color: color`2`});
      addText("i: lazer $10", { x: 1, y: 1, color: color`1`});
      addText("j: barrier $5", { x: 1, y: 2, color: color`1`});
      addText("k: homer $5", { x: 1, y: 3, color: color`1`});
      break;
    case 1:
      mode = 0;
      clearText();
      showMoney();
      const fx = getFirst(focus).x;
      const fy = getFirst(focus).y;
      if (!getTile(fx, fy).some((s) => solids.includes(s.type))) {
        checkSubMoney(10, () => addSprite(fx, fy, lazers[0]));
      }
      break;
  }
});

onInput("j", () => {
  introOn = false;
  switch (mode) {
    case 1:
      mode = 0;
      clearText();
      showMoney();
      const fx = getFirst(focus).x;
      const fy = getFirst(focus).y;
      const tile = getTile(fx, fy);
      const tileBarriers = tile.filter((s) => barriers.includes(s.type));
      if (tileBarriers.length > 0) {
        for (const b of tileBarriers) {
            fixBarrier(b);
            break;
        }
      } else if (!tile.some((s) => solids.includes(s.type))) {
        checkSubMoney(10, () => addSprite(fx, fy, barriers[0]));
      }
      break;
  }
});

onInput("k", () => {
  introOn = false;
  const fx = getFirst(focus).x;
  const fy = getFirst(focus).y;
  switch (mode) {
    case 0:
      const tileSprites = getTile(fx, fy);
      for (const p of tileSprites) {
        if (parmas.includes(p.type)) {
          damageParma(p);
        } else if (lazers.includes(p.type)) {
          money += 3;
          p.remove();
        } else if (barriers.includes(p.type)) {
          money += 1;
          p.remove();
        }
      }
      break;
    case 1:
      mode = 0;
      clearText();
      showMoney();
      if (!getTile(fx, fy).some((s) => solids.includes(s.type))) {
        checkSubMoney(5, () => addSprite(fx, fy, lazers[1]));
      }
      break;
  }
});

function clearIfBorder(s) {
  if (s.x <= 0 || s.y <= 0 || s.x >= width() - 1 || s.y >= height() - 1) {
    s.remove();
  }
}

let borderLocus = [];
for (let x = 0; x < width(); x++) {
  borderLocus.push({ x: x, y: 0});
  borderLocus.push({ x: x, y: height() - 1 });
}
for (let y = 1; y < height() - 1; y++) {
  borderLocus.push({ x: 0, y: y });
  borderLocus.push({ x: width() - 1, y: y });
}

function damageParma(p) {
  switch (p.type) {
    case "9": p.type = "8"; break;
    case "8": p.type = "7"; break;
    case "7": p.type = "6"; break;
    case "6": p.remove(); money += 5; break;
  }
}

function fixBarrier(p) {
  let cost;
  switch (p.type) {
    case "1": cost = 4; break;
    case "2": cost = 3; break;
    case "3": cost = 2; break;
  }
  checkSubMoney(cost, () => p.type = "4");
}

function damageAllParmas(b) {
  for (const p of getAll(parmas[3])) {
    if (p.x === b.x && p.y === b.y) {
      p.remove();
      money += 5;
    }
  }
  for (const p of getAll(parmas[2])) {
    if (p.x === b.x && p.y === b.y) {
      p.type = parmas[3];
    }
  }
  for (const p of getAll(parmas[1])) {
    if (p.x === b.x && p.y === b.y) {
      p.type = parmas[2];
    }
  }
  for (const p of getAll(parmas[0])) {
    if (p.x === b.x && p.y === b.y) {
      p.type = parmas[1];
    }
  }
}

function damageAllBarriers(b) {
  for (const p of getAll(barriers[3])) {
    if (p.x === b.x && p.y === b.y) {
      p.remove();
    }
  }
  for (const p of getAll(barriers[2])) {
    if (p.x === b.x && p.y === b.y) {
      p.type = barriers[3];
    }
  }
  for (const p of getAll(barriers[1])) {
    if (p.x === b.x && p.y === b.y) {
      p.type = barriers[2];
    }
  }
  for (const p of getAll(barriers[0])) {
    if (p.x === b.x && p.y === b.y) {
      p.type = barriers[1];
    }
  }
}
let tickCounter = 0;

addText("objective:\nkeep the lazers\nalive\ni: buy menu\nk: kill\n(enemy or tower)", { x: 0, color: color`2` });

let spawnsPSec = 0.1;
const gameLoop = setInterval(() => {
  if (getAll(lazers[0]).length + getAll(lazers[1]).length == 0) {
    clearInterval(gameLoop);
    clearText();
    addText("You lose!\nscore: ", { color: color`2` });
    addText("" + tickCounter / 10, { y: 3, color: color`2` });
    mode = 69; // disable input
    return;
  }
  tickCounter++;

  if (mode === 0 && !introOn) {
    clearText();
    showMoney();
  }

  const allParmas = parmas.flatMap((p) => getAll(p));
  if (tickCounter % 8 === 0) {
    for (const p of allParmas) {
      let lowestDist = 99999;
      let targetLazer;
      for (const l of getAll(lazers[0]).concat(getAll(lazers[1]))) {
        let dist = Math.abs(l.x - p.x) + Math.abs(l.y - p.y);
        if (dist < lowestDist) {
          lowestDist = dist;
          targetLazer = l;
        }
      }
      if (lowestDist !== 99999) {
        let dx = Math.sign(targetLazer.x - p.x);
        let dy = Math.sign(targetLazer.y - p.y);
        let np = { x: p.x, y: p.y }; // can't move it in because its a solid
        if (Math.random() < 0.5) {
          np.x += dx;
          if (dx === 0 || dy === 0) {
            np.y += dy;
          }
        } else {
          np.y += dy;
          if (dx === 0 || dy === 0) {
            np.x += dx;
          }
        }
        if (np.x === targetLazer.x && np.y === targetLazer.y) {
          targetLazer.remove();
        }
        if (tickCounter % 3 === 0) damageAllBarriers(np);
        p.x = np.x; p.y = np.y;
      } else if (tickCounter % 3 === 0) damageAllBarriers(p);
    }
  }

  getAll(beams[0]).forEach((s) => {
    if (s.y <= 0) s.remove();
    s.y -= 1;
    damageAllParmas(s);
  });
  getAll(beams[1]).forEach((s) => {
    if (s.x >= width() - 1) s.remove();
    s.x += 1;
    damageAllParmas(s);
  });
  getAll(beams[2]).forEach((s) => {
    if (s.y >= height() - 1) s.remove();
    s.y += 1;
    damageAllParmas(s);
  });
  getAll(beams[3]).forEach((s) => {
    if (s.x <= 0) s.remove();
    s.x -= 1;
    damageAllParmas(s);
  });
  if (tickCounter % 3 == 0) {
    getAll(beams[4]).forEach((s) => {
      if (allParmas.length == 0) {
        s.remove();
        return;
      }
      // identical to parma logic
      // TODO factor out
      let lowestDist = 99999;
      let targetParma;
      for (const l of allParmas) {
        let dist = Math.abs(l.x - s.x) + Math.abs(l.y - s.y);
        if (dist < lowestDist) {
          lowestDist = dist;
          targetParma = l;
        }
      }
      if (lowestDist !== 99999) {
        let dx = Math.sign(targetParma.x - s.x);
        let dy = Math.sign(targetParma.y - s.y);
        if (Math.random() < 0.5) {
          s.x += dx;
          if (dx === 0 || dy === 0) {
            s.y += dy;
          }
        } else {
          s.y += dy;
          if (dx === 0 || dy === 0) {
            s.x += dx;
          }
        }
        if (s.x === targetParma.x && s.y === targetParma.y) {
          damageParma(targetParma);
          s.remove();
        }
      }
    });
  }

  if (tickCounter % 8 === 0) {
    getAll(lazers[0]).forEach((s) => {
      addSprite(s.x, s.y, beams[0]);
      addSprite(s.x, s.y, beams[1]);
      addSprite(s.x, s.y, beams[2]);
      addSprite(s.x, s.y, beams[3]);
    });
  }
  if (tickCounter % 13 === 0 && allParmas.length > 0) {
    getAll(lazers[1]).forEach((s) => addSprite(s.x, s.y, beams[4]));
  }

  if (tickCounter % 100 === 0) {
    spawnsPSec += 0.07;
  }
  if (Math.random() < spawnsPSec / 10) {
    const openBorders = borderLocus
      .filter((c) => !getAll(c.x, c.y).some((s) => parmas.includes(s.type)));
    if (openBorders.length >= 1) {
      let coords = borderLocus[Math.floor(Math.random() * borderLocus.length)];
      addSprite(coords.x, coords.y, parmas[0]);
    }
  }
}, 100);
