const p = "p"; // Player
const w = "w"; // Wall
const c = "c"; // Crate
const s = "s"; // Socket
const f = "f"; // Full (Crate on Socket)

setLegend(
  [p, bitmap`
  .....
  ..0..
  .000.
  .0.0.
  .....`],
  [w, bitmap`
  00000
  05550
  05.50
  05550
  00000`],
  [c, bitmap`
  .....
  .555.
  .545.
  .555.
  .....`],
  [s, bitmap`
  .....
  ..7..
  .7.7.
  ..7..
  .....`],
  [f, bitmap`
  .....
  .333.
  .373.
  .333.
  .....`]
);

// 'f' is solid and pushable just like 'c'
setSolids([p, w, c, f]);
setPushables({ [p]: [c, f] });

const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w..s...p...c...w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.s..........s.w
w..w...p....w..w
w..c........c..w
w..w........w..w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..wwwww.......w
w..w...s....c..w
w..w...w....w..w
w..s...c....p..w
w..w...w.......w
wwwwwwwwwwwwwwww`
];

let lv = 0;
let steps = 0;
let state = "menu";

function showMenu() {
  state = "menu";
  clearText();
  setMap(map`................`);
  addText("POWER PUSH", {x: 4, y: 2, color: color`5`});
  addText("W: START", {x: 5, y: 4, color: color`7`});
  addText("J: RESET", {x: 5, y: 5, color: color`7`});
}

function startLevel() {
  state = "play";
  steps = 0;
  clearText();
  // Simple transition: clear the map for a frame before loading
  setMap(map`................`);
  setTimeout(() => {
    setMap(levels[lv]);
  }, 50);
}

showMenu();

const move = (dx, dy) => {
  if (state !== "play") return;
  const player = getFirst(p);
  if (!player) return;
  
  const oldX = player.x;
  const oldY = player.y;
  
  player.x += dx;
  player.y += dy;
  
  if (player.x !== oldX || player.y !== oldY) steps++;
};

// Inputs
onInput("w", () => state === "menu" ? startLevel() : move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

// J to Reset Level
onInput("j", () => {
  if (state === "play") startLevel();
});

// K to Skip Level (Dev Hack)
onInput("k", () => {
  if (state === "play") {
    lv++;
    if (lv < levels.length) startLevel();
    else winGame();
  }
});

onInput("i", () => {
  if (state === "win") {
    lv = 0;
    showMenu();
  }
});

function winGame() {
  state = "win";
  clearText();
  setMap(map`................`);
  addText("ALL LEVELS CLEAN", {x: 1, y: 3, color: color`3`});
  addText("PRESS I", {x: 5, y: 5, color: color`7`});
}

afterInput(() => {
  if (state !== "play") return;

  const sockets = getAll(s);
  const crates = getAll(c);
  const full = getAll(f);

  // 1. Logic: If a Crate (c) is on a Socket (s), turn it into Full (f)
  // Note: We check tiles at the same position
  crates.forEach(crate => {
    sockets.forEach(socket => {
      if (crate.x === socket.x && crate.y === socket.y) {
        const x = crate.x;
        const y = crate.y;
        crate.remove();
        // We don't remove the socket so the 'f' can move off it later
        // But in Sprig, we'll just spawn an 'f'
        addSprite(x, y, f);
      }
    });
  });

  // 2. Logic: If a Full (f) moves OFF a socket, turn it back to Crate (c)
  full.forEach(fCrate => {
    let onSocket = false;
    sockets.forEach(socket => {
      if (fCrate.x === socket.x && fCrate.y === socket.y) onSocket = true;
    });
    
    if (!onSocket) {
      const x = fCrate.x;
      const y = fCrate.y;
      fCrate.remove();
      addSprite(x, y, c);
    }
  });

  // HUD Update
  clearText();
  const goalsLeft = sockets.length - getAll(f).length;
  addText(`L:${lv + 1} S:${steps} GOAL:${goalsLeft}`, {x: 0, y: 0, color: color`5` });

  // Win Condition
  if (goalsLeft === 0 && sockets.length > 0) {
    lv++;
    if (lv < levels.length) {
      startLevel();
    } else {
      winGame();
    }
  }
});