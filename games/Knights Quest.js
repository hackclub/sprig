const player = "p";
const wall = "w";
const key = "k";
const door = "d";
const guard = "g";
const floor = "f";

setLegend(
  [player, bitmap`
....3333....
...366663...
..36666663..
..36666663..
..36666663..
..36666663..
...366663...
....3333....
.....33.....
....3333....
...366663...
..36666663..
..36666663..
...366663...
....3333....
............`],

  [wall, bitmap`
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
LLLLLLLLLLLLLLLL`],

  [key, bitmap`
................
....0000........
...055550.......
..05555550......
..05555550......
..05555550......
...055550.......
....0000........
................
................
................
................
................
................
................
................`],

  [door, bitmap`
3333333333333333
3............... 
3.333333333333.. 
3.3.........3.3. 
3.3.3333333.3.3. 
3.3.3.....3.3.3. 
3.3.3.333.3.3.3. 
3.3.3.3..3.3.3.3 
3.3.3.3..3.3.3.3 
3.3.3.333.3.3.3. 
3.3.3.....3.3.3. 
3.3.3333333.3.3. 
3.3.........3.3. 
3.333333333333.. 
3............... 
3333333333333333`],

  [guard, bitmap`
................
..99999999999...
.9999111199999..
.9911111111999..
.9911199911999..
.9911199911999..
.9911111111999..
.9999111199999..
..99999999999...
.....99999......
....9999999.....
...999999999....
...999999999....
....9999999.....
.....99999......
................`],

  [floor, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
);

setBackground(floor);

// 30 characters wide!
setMap(map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffw
wffwffkfgfffffffffffffffffffw
wffwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wffffffffffpffffffffffffffffw
wffwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffgkffffffffffffffffw
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffd
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffw
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`);

let keysLeft = 2;
let gameOver = false;

// 🕹️ Input
onInput("w", () => movePlayer("up"));
onInput("s", () => movePlayer("down"));
onInput("a", () => movePlayer("left"));
onInput("d", () => movePlayer("right"));

function movePlayer(direction) {
  if (gameOver) return;

  const playerSprite = getFirst(player);
  const next = getNextFrom(playerSprite.x, playerSprite.y, direction);
  const tileContents = getTile(next.x, next.y).map(o => o.type);

  if (tileContents.includes(wall)) return;

  if (tileContents.includes(key)) {
    clearTile(next.x, next.y);
    keysLeft--;
  }

  if (tileContents.includes(door)) {
    if (keysLeft === 0) {
      endGame(true);
    }
    return; // can't open door unless all keys collected
  }

  if (tileContents.includes(guard)) {
    endGame(false);
    return;
  }

  playerSprite.x = next.x;
  playerSprite.y = next.y;
}

// 👮‍♂️ Guard AI
setInterval(() => {
  if (gameOver) return;
  const playerSprite = getFirst(player);

  getAll(guard).forEach(g => {
    const dx = playerSprite.x - g.x;
    const dy = playerSprite.y - g.y;

    let dir = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? "right" : "left")
      : (dy > 0 ? "down" : "up");

    const target = getNextFrom(g.x, g.y, dir);
    const contents = getTile(target.x, target.y).map(o => o.type);

    if (contents.includes(wall) || contents.includes(guard)) return;

    g.x = target.x;
    g.y = target.y;

    if (g.x === playerSprite.x && g.y === playerSprite.y) {
      endGame(false);
    }
  });
}, 500);

function getNextFrom(x, y, dir) {
  if (dir === "up") return { x: x, y: y - 1 };
  if (dir === "down") return { x: x, y: y + 1 };
  if (dir === "left") return { x: x - 1, y: y };
  if (dir === "right") return { x: x + 1, y: y };
}

function endGame(won) {
  gameOver = true;
  addText(won ? "YOU WON!" : "YOU LOST!", {
    y: 7,
    color: won ? color`9` : color`3`
  });
}
