/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Helix
@description: medical robot avoid the virus and run to gain the bag
@author: Mohamad Ali Ahmed
@tags: ['robot', 'medical']
@addedOn: 2025-07-11
*/

const player = "p";
const hospitalBag = "h"; 
const wall = "w";
const virus = "v";

const spaceMelody = tune`
184.04907975460122: D4^184.04907975460122,
184.04907975460122: D5^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G5^184.04907975460122,
184.04907975460122: E4^184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: A4^184.04907975460122,
184.04907975460122: A5^184.04907975460122,
184.04907975460122: F4^184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: F5^184.04907975460122,
184.04907975460122: B4^184.04907975460122,
184.04907975460122: G5^184.04907975460122,
184.04907975460122: A4^184.04907975460122,
184.04907975460122: D4^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G5^184.04907975460122,
184.04907975460122: B4^184.04907975460122,
184.04907975460122: B5^184.04907975460122,
184.04907975460122: A4^184.04907975460122,
184.04907975460122: A5^184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: G5^184.04907975460122,
184.04907975460122: F4^184.04907975460122,
184.04907975460122: D5^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: F5^184.04907975460122,
184.04907975460122: A4^184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: F4^184.04907975460122,
184.04907975460122: D4^184.04907975460122`;

setLegend(
  [ player, bitmap`
....6666........
...000000.......
..00777700......
.6075555706.....
660750057066....
660755557066....
..00777700......
...600006.......
....6666........
...66..66.......
..6.6..6.6......
22..6..6..22....
................
................
................
................`],
  [ hospitalBag, bitmap`
.6...........6..
..66666666666...
..67777777776...
..67772627776...
..67720002776...
..67760306776...
..67720002776...
..67772627776...
..67777777776...
..66666666666...
.6...........6..
................
................
................
................
................`],
  [ virus, bitmap`
..3.3......3.3..
.3.3.3....3.3.3.
..3.3.3333.3.3..
....33633633....
...3004334003...
...3036336303...
...3033333303...
..3.00344300.3..
.3.3.3.66.3.3.3.
..3.3..44..3.3..
................
................
................
................
................
................`],
  [ wall, bitmap`
    0000000000000000
    0777777777777770
    0700000000000070
    0705555555550070
    0705000000050070
    0705000000050070
    0705000000050070
    0705555555550070
    0700000000000070
    0777777777777770
    0000000000000000
    0000000000000000
  `]
);

setSolids([wall]);

let score = 0;
let lives = 3;
let timeLeft = 60;
let gameOver = false;

const levels = [
  map`
    wwwwwwwwww
    w.p......w
    w........w
    w........w
    w....h...w
    w........w
    w...v....w
    wwwwwwwwww`
];

setMap(levels[0]);

playTune(spaceMelody, Infinity);

function checkGameState() {
  if (gameOver) return;

  let p = getFirst(player);
  let h = getFirst(hospitalBag);
  let v = getFirst(virus);
  if (!p) return;

  if (h && p.x === h.x && p.y === h.y) {
    score += 10;
    h.x = Math.floor(Math.random() * 7) + 1;
    h.y = Math.floor(Math.random() * 5) + 1;
    console.log("Score Gained: " + score);

    if (score >= 100) {
      gameOver = true;
      clearText();
      addText("VICTORY!", { y: 3, color: color`green` });
    }
  }

  if (v && p.x === v.x && p.y === v.y) {
    lives -= 1;
    v.x = Math.floor(Math.random() * 7) + 1;
    v.y = Math.floor(Math.random() * 5) + 1;
    console.log("Lives Remaining: " + lives);

    if (lives <= 0) {
      gameOver = true;
      p.remove();
      clearText();
      addText("GAME OVER", { y: 3, color: color`red` });
    }
  }
}

setInterval(() => {
  if (gameOver) return;
  timeLeft -= 1;

  if (timeLeft <= 0) {
    gameOver = true;
    clearText();
    addText("TIME UP!", { y: 3, color: color`red` });
  }
}, 1000);

setInterval(() => {
  if (gameOver) return;
  let v = getFirst(virus);
  let p = getFirst(player);
  if (!v || !p) return;

  let nextX = v.x;
  let nextY = v.y;

  if (v.x < p.x) nextX += 1;
  else if (v.x > p.x) nextX -= 1;
  if (v.y < p.y) nextY += 1;
  else if (v.y > p.y) nextY -= 1;

  let tiles = getTile(nextX, nextY);
  let isWall = tiles.some(t => t.type === wall);
  if (!isWall) {
    v.x = nextX;
    v.y = nextY;
  }
  checkGameState();
}, 500);

onInput("w", () => { let p = getFirst(player); if (p && !gameOver) { p.y -= 1; checkGameState(); } });
onInput("s", () => { let p = getFirst(player); if (p && !gameOver) { p.y += 1; checkGameState(); } });
onInput("a", () => { let p = getFirst(player); if (p && !gameOver) { p.x -= 1; checkGameState(); } });
onInput("d", () => { let p = getFirst(player); if (p && !gameOver) { p.x += 1; checkGameState(); } });