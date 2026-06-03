/*
@title: dungeon_crawler
@description: A top-down dungeon crawler. Fight enemies, find the exit key, and escape each floor!
@author: generated
@tags: ['dungeon', 'rpg', 'action']
*/

const player  = "p";
const wall    = "w";
const floor   = "f";
const enemy   = "e";
const key     = "k";
const exit    = "x";
const heart   = "h";
const sword   = "s";

setLegend(

  [ player, bitmap`
................
................
....LLLLLL......
...L3333333L....
...L323L323L....
...L333333LL....
....L33333L.....
...LLLLLLLL.....
..L33333333L....
..L3.33333.L....
..LL3333333LL...
....L3...3L.....
...LL.....LL....
..LL.......LL...
................
................`],

  [ wall, bitmap`
1111111111111111
1111111111111111
1144441144441111
1144441144441111
1111111111111111
1111111111111111
1444411444411111
1444411444411111
1111111111111111
1111111111111111
1144441144441111
1144441144441111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [ floor, bitmap`
................
................
................
................
................
......6.........
................
.........6......
................
................
....6...........
................
................
................
................
................`],

  [ enemy, bitmap`
................
................
....55555555....
...5333333335...
...5323.3235....
...53333333 5...
...5.33333.35...
....533333355...
....55555555....
...5..5..5..5...
...5..5..5..5...
....55....55....
................
................
................
................`],

  [ key, bitmap`
................
................
......777.......
.....7...7......
.....7...7......
......777.......
.......7........
.......7........
......777.......
................
................
................
................
................
................
................`],

  [ exit, bitmap`
................
....44444444....
...4........4...
...4........4...
...4..4444..4...
...4..4..4..4...
...4..4..4..4...
...4..4444..4...
...4........4...
...4...44...4...
...4...44...4...
...4........4...
....44444444....
................
................
................`],

  [ heart, bitmap`
................
................
...22..22.......
..2222222.......
..2222222.......
...22222........
....222.........
.....2..........
................
................
................
................
................
................
................
................`],

  [ sword, bitmap`
................
.........3......
........3.......
.......3........
......3.........
.....3..........
....3...........
...333..........
..3.3...........
.3..3...........
....3...........
................
................
................
................
................`],

);

let level      = 0;
let hp         = 3;
let hasKey     = false;
let hasSword   = false;
let score      = 0;
let movesSinceAttack = 0;

const levels = [

  map`
wwwwwwww
wf.f..fw
w.p..e.w
wf....fw
w..f...w
w...s..w
wf.....w
w....k.w
w......w
w.....xw
wwwwwwww`,

  map`
wwwwwwwwww
wf.......w
w..p..e..w
w.wwwww..w
w.w....f.w
w.w.ee...w
w.wf...h.w
w.wwww...w
w......k.w
wf..e....w
w.......xw
wwwwwwwwww`,

  map`
wwwwwwwwwwww
wf....f....w
w..p.......w
w.www.www..w
w.w.f.f.w..w
w.w.e.e.w..w
w.w.....wf.w
w.wwwwwww..w
w..........w
wf.e..e...fw
w.....s....w
w...k......w
w.........xw
wwwwwwwwwwww`,

];

function updateHUD() {
  clearText("");
  const hpStr    = "HP:" + hp;
  const keyStr   = hasKey  ? " KEY" : "";
  const swdStr   = hasSword ? " SWD" : "";
  const scStr    = " SC:" + score;
  addText(hpStr + keyStr + swdStr + scStr, { x: 1, y: 0, color: color`3` });
}

function loadLevel(n) {
  hasKey   = false;
  hasSword = false;
  movesSinceAttack = 0;
  if (n < levels.length) {
    setMap(levels[n]);
    setSolids([ player, wall, enemy ]);
    setPushables({ [player]: [] });
    updateHUD();
  } else {
    clearText("");
    addText("YOU WIN!", { x: 3, y: 4, color: color`7` });
    addText("Score:" + score, { x: 2, y: 6, color: color`3` });
  }
}

loadLevel(level);
function tryMove(dx, dy) {
  if (hp <= 0) return;
  const p  = getFirst(player);
  if (!p) return;
  const nx = p.x + dx;
  const ny = p.y + dy;
  const targets = getAll().filter(s => s.x === nx && s.y === ny);

  for (const t of targets) {
    if (t.type === enemy) {
      if (hasSword) {
        t.remove();
        score += 10;
        updateHUD();
      } else {
        hp -= 1;
        score = Math.max(0, score - 2);
        updateHUD();
        if (hp <= 0) {
          clearText("");
          addText("GAME OVER", { x: 2, y: 4, color: color`2` });
          addText("Score:" + score, { x: 2, y: 6, color: color`3` });
        }
      }
      return; 
    }

    if (t.type === key) {
      hasKey = true;
      t.remove();
      score += 20;
      updateHUD();
    }

    if (t.type === sword) {
      hasSword = true;
      t.remove();
      score += 5;
      updateHUD();
    }

    if (t.type === heart) {
      hp = Math.min(hp + 1, 5);
      t.remove();
      score += 5;
      updateHUD();
    }

    if (t.type === exit) {
      if (hasKey) {
        score += 50;
        level += 1;
        loadLevel(level);
        return;
      } else {
        clearText("");
        addText("Need key!", { x: 1, y: 0, color: color`2` });
      }
    }
  }

  p.x += dx;
  p.y += dy;

  score += 1;
  movesSinceAttack++;

  if (movesSinceAttack >= 2) {
    movesSinceAttack = 0;
    moveEnemies();
  }

  updateHUD();
}

function moveEnemies() {
  const p = getFirst(player);
  if (!p) return;

  const enemies = getAll(enemy);
  for (const e of enemies) {
    const dx = p.x - e.x;
    const dy = p.y - e.y;
    let stepX = 0, stepY = 0;
    if (Math.abs(dx) >= Math.abs(dy)) {
      stepX = dx > 0 ? 1 : -1;
    } else {
      stepY = dy > 0 ? 1 : -1;
    }

    const nx = e.x + stepX;
    const ny = e.y + stepY;
    const blocked = getAll().filter(s =>
      s.x === nx && s.y === ny && (s.type === wall || s.type === enemy)
    );
    if (blocked.length > 0) continue;
    if (nx === p.x && ny === p.y) {
      hp -= 1;
      score = Math.max(0, score - 2);
      if (hp <= 0) {
        clearText("");
        addText("GAME OVER", { x: 2, y: 4, color: color`2` });
        addText("Score:" + score, { x: 2, y: 6, color: color`3` });
        return;
      }
    } else {
      e.x = nx;
      e.y = ny;
    }
  }
  updateHUD();
}

onInput("w", () => tryMove( 0, -1));
onInput("s", () => tryMove( 0,  1));
onInput("a", () => tryMove(-1,  0));
onInput("d", () => tryMove( 1,  0));

onInput("j", () => {
  hp = 3;
  score = Math.max(0, score - 10);
  loadLevel(level);
});

onInput("i", () => {
  clearText("");
  addText("WASD=move", { x: 1, y: 2, color: color`3` });
  addText("J=restart", { x: 1, y: 4, color: color`3` });
  addText("Get KEY->EXIT", { x: 0, y: 6, color: color`7` });
});