/*
@title: Coin Chase
@description: Collect every coin before the red blob catches you. WASD moves, J restarts.
@author: you
@tags: ['puzzle']
@addedOn: 2024-01-01
*/

const player = "p";
const enemy = "e";
const coin = "c";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
.....000000.....
....04444440....
...0444444440...
...0441144440...
...0444444440...
...0444444440...
....04444440....
.....000000.....
................
................
................
................
................
................` ],
  [ enemy, bitmap`
................
................
.....000000.....
....03333330....
...0333333330...
...0331133330...
...0333333330...
...0333333330...
....03333330....
.....000000.....
................
................
................
................
................
................` ],
  [ coin, bitmap`
................
................
......0000......
.....066660.....
....06666660....
....06666660....
....06666660....
....06666660....
.....066660.....
......0000......
................
................
................
................
................
................` ],
  [ wall, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ]
);

setSolids([ player, wall ]);

const level = map`
wwwwwwwwww
wp.......w
w.w.ww.c.w
w.c...w..w
w.ww.....w
w..e...c.w
w.c...w..w
wwwwwwwwww`;

let won = false;
let lost = false;
let turns = 0;

function isWall(x, y) {
  return getTile(x, y).some(t => t.type === wall);
}

function collectCoin() {
  const p = getFirst(player);
  getTile(p.x, p.y).forEach(t => {
    if (t.type === coin) t.remove();
  });
}

function moveEnemy() {
  const e = getFirst(enemy);
  const p = getFirst(player);
  const dx = Math.sign(p.x - e.x);
  const dy = Math.sign(p.y - e.y);

  if (dx !== 0 && !isWall(e.x + dx, e.y)) {
    e.x += dx;
  } else if (dy !== 0 && !isWall(e.x, e.y + dy)) {
    e.y += dy;
  }
}

function showStatus() {
  clearText();
  if (won) {
    addText("you win! J to play again", { x: 1, y: 9, color: color`4` });
  } else if (lost) {
    addText("caught! J to retry", { x: 1, y: 9, color: color`3` });
  } else {
    addText("coins left: " + tilesWith(coin).length, { x: 1, y: 9, color: color`6` });
  }
}

function restart() {
  setMap(level);
  won = false;
  lost = false;
  turns = 0;
  showStatus();
}

onInput("w", () => {
  if (!won && !lost) getFirst(player).y -= 1;
});

onInput("s", () => {
  if (!won && !lost) getFirst(player).y += 1;
});

onInput("a", () => {
  if (!won && !lost) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (!won && !lost) getFirst(player).x += 1;
});

onInput("j", () => {
  restart();
});

afterInput(() => {
  if (won || lost) return;

  turns++;
  collectCoin();

  if (tilesWith(coin).length === 0) {
    won = true;
    showStatus();
    return;
  }

  if (turns % 2 === 0) moveEnemy();

  if (tilesWith(player, enemy).length > 0) {
    lost = true;
  }

  showStatus();
});

restart();