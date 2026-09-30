/*
With heavy inspiration from the 1990s SEGA Columns game, the sprite bitmaps are all my own work.
The main Clotho music intro was copied from here: https://flat.io/score/5e3896ce2d79c57e8c594428-columns-clotho-for-piano

* w = switch jewel order
* a = move jewels left
* s = move jewels right
* d = move jewels down faster

* l = start/pause button

I'm sorry if my first Sprig game ever is bad, I just like these SEGA days a bunch
(Used 30 FPS to be conservative, but you can change it.)

@title: columns
@description: A (simpler, I attempted to make it as complex as possible) port of the 1990 SEGA Columns game onto the Sprig console!
@author: JustAnEric / Eric Muzyk
@tags: ['columns', 'fall', 'jewel', 'gem', 'puzzle']
@addedOn: 2026-09-30
*/

const FPS = 30;

const wall = "w";
const yellowJewel = "y";
const orangeJewel = "o";
const greenJewel = "g";
const purpleJewel = "p";
const redJewel = "r";
const blueJewel = "b";
const tile = "t";
const bgTile = "z";
const jewelPool = [yellowJewel, orangeJewel, greenJewel, purpleJewel, redJewel, blueJewel];

const introMelody = tune`
250: A4^250,
250: E4~250,
250: C5^250,
250: E4~250,
250: B4^250,
250: E4~250,
250: A4^250,
250: E4~250,
250: G4^250,
250: E4~250,
250: B4^250,
250: E4~250,
250: A4^250,
250: E4~250,
250: G4^250,
250: E4~250,
250: G4^250,
250: D4~250,
250: B4^250,
250: D4~250,
250: A4^250,
250: D4~250,
250: G4^250,
250: D4~250,
250: F4^250,
250: D4~250,
250: G4^250,
250: D4~250,
250: A4^250,
250: D4~250,
250: G4^250,
250: D4~250`;
const blockCollision = tune`
500: C4/500,
15500`;
const beepButtonSound = tune`
500: C5-500,
15500`;
const musicOrder = introMelody;

setLegend(
  [ yellowJewel, bitmap`
................
.00000000000000.
0116666666666660
0111116666777660
0111116667777760
0611116677777760
0661166677777760
0666666777777760
0666666777777760
0666667777777760
0611117777777760
0111117777777760
0111111777777760
0666666677777760
.00000000000000.
................` ],
  [ orangeJewel, bitmap`
................
.....000000.....
...0077777700...
..077117777770..
.07711116777770.
0771116667777770
0771166677777770
0771666777777770
0777667777777770
0777777777777770
.07777777777770.
..077777777770..
...0077777700...
.....000000.....
................
................` ],
  [ greenJewel, bitmap`
................
..000000000000..
.04441144444440.
0444111144444440
0441111114444440
0411111444444440
0411144444444440
0411444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
.04444444444440.
..000000000000..
................
................` ],
  [ purpleJewel, bitmap`
................
....00000000....
..008811888800..
.08811111888880.
0881111111888880
0811118811188880
0811188881118880
0881888888118880
0888888888818880
0888888888888880
.08888888888880.
..008888888800..
....00000000....
................
................
................` ],
  [ redJewel, bitmap`
................
.....000000.....
...0033113300...
..033111113330..
.03311111113330.
0331111331113330
0331113333113330
0331133333333330
0333333333333330
0333333333333330
.03333333333330.
..033333333330..
...0033333300...
.....000000.....
................
................` ],
  [ blueJewel, bitmap`
................
.00000000000000.
0551155555555550
0511111555555550
0511111155555550
0511511115555550
0511551111555550
0555555111555550
0555555511555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
.00000000000000.
................` ],
  [ tile, bitmap`
0000000000000000
0111111111111110
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0100000000000010
0111111111111110
0000000000000000` ],
  [ bgTile, bitmap`
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
0000000000000000` ],
  [ wall, bitmap`
0000000000000000
0333333333333330
0300000000000030
0303333333333030
0303000000003030
0303033333303030
0303030000303030
0303030330303030
0303030330303030
0303030000303030
0303033333303030
0303000000003030
0303333333333030
0300000000000030
0333333333333330
0000000000000000` ]
);

// 16x16 grid map framing a 6-wide x 13-high
const boardMap = map`
................
${`...w${'t'.repeat(6)}w.....\n`.repeat(13)}...wwwwwwww.....
................`;

setSolids([
  wall
])

let score = 0;
let boardRows = Array(13).fill(null).map(() => Array(6).fill(""));
let activePiece = null; // { x: 2, y: 0, jewels: [red, green, blue] }
let isGameOver = false;
let isGamePaused = false;

setMap(boardMap)
setBackground(bgTile);

// play it until the catastrophic death of the player:
let playback = playTune(musicOrder, Infinity);

const triggerGameOver = () => {
  isGameOver = true;
  activePiece = null;
  playback.end();
  clearText();
  let boardMap = map`
${`................\n`.repeat(16)}`;
  setMap(boardMap);
  addText("GAME OVER", { x: 4, y: 7, color: color`3` });
};

const canMoveTo = (targetX, currentY) => {
  if (targetX < 0 || targetX >= 6) return false; // outside of board bounds
  for (let i = 0; i < 3; i++) {
    const checkY = currentY + i;
    if (checkY >= 0 && checkY < 13) {
      if (boardRows[checkY][targetX] !== "") return false;
    }
  }
  return true;
}

const anyMatches = () => {
  const allm = Array(13).fill(null).map(() => Array(6).fill(false));
  let isAnyM = false;
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 6; c++) {
      const jewel = boardRows[r][c];
      if (!jewel) continue;
      for (const [dr,dc] of dirs) {
        const r1 = r + dr, c1 = c + dc;
        const r2 = r + dr * 2, c2 = c + dc * 2;
        if (r2 >= 0 && r2 < 13 && c2 >= 0 && c2 < 6 && boardRows[r1][c1] === jewel && boardRows[r2][c2] === jewel) {
          allm[r][c] = true;
          allm[r1][c1] = true;
          allm[r2][c2] = true;
          isAnyM = true;
        }
      }
    }
  }
  return{matched:allm,hasMatches:isAnyM};
}

const applyGravityAndClear = (matched) => {
  let clearedCount = 0;
  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 6; c++) {
      if (matched[r][c]) {
        boardRows[r][c]="";
        clearedCount++;
      }
    }
  }
  for (let c = 0; c < 6; c++) {
    let emptyRow = 12;
    for (let r = 12; r >= 0; r--) {
      if (boardRows[r][c] !== "") {
        const jewel = boardRows[r][c];
        boardRows[r][c]="";
        boardRows[emptyRow][c] = jewel;
        emptyRow--;
      }
    }
  }
  return clearedCount;
}

const processMatches = () => {
  let m = anyMatches();

  while (m.hasMatches) {
    const cleared = applyGravityAndClear(m.matched);
    score += cleared * 10;
    m = anyMatches();
  }
} // note to self anything to get the lines of code down


onInput("a", () => {
  if (!activePiece || isGameOver) return;
  if (canMoveTo(activePiece.x - 1, activePiece.y)) activePiece.x -= 1;
});

onInput("d", () => {
  if (!activePiece || isGameOver) return;
  if (canMoveTo(activePiece.x + 1, activePiece.y)) activePiece.x += 1;
});

onInput("w", () => {
  if (!activePiece || isGameOver) return;
  const g = activePiece.jewels;
  activePiece.jewels = [g[2], g[0], g[1]]; // shuffle
});

onInput("s", () => {
  if (!activePiece || isGameOver) return;
  const nextY = activePiece.y + 1;
  const bottomJewelY = nextY + 2;
  if (bottomJewelY<13 && boardRows[bottomJewelY][activePiece.x]==="") activePiece.y = nextY;
});

onInput("l", () => {
  // check game state
  if (isGameOver) {
    boardRows = Array(13).fill(null).map(() => Array(6).fill(""));
    isGameOver = false;
    activePiece = null;
    playback = playTune(musicOrder, Infinity);
  } else {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {
      playback.end();
    } else {
      playback = playTune(musicOrder, Infinity);
    }
  }
  playTune(beepButtonSound);
});

const spawnPiece = () => {
  const spawnX = 2;
  if (boardRows[0][spawnX] !== "" || boardRows[1][spawnX] !== "" || boardRows[2][spawnX] !== "") {
    triggerGameOver();
    return;
  }
  activePiece = {
    x: 2, y: 0,
    jewels: [
      jewelPool[Math.floor(Math.random() * jewelPool.length)],
      jewelPool[Math.floor(Math.random() * jewelPool.length)],
      jewelPool[Math.floor(Math.random() * jewelPool.length)]
    ]
  };
};

const renderGame = () => {
  if (isGameOver) {
    clearText();
    const emptyMap = map`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`;
    setMap(emptyMap);
    addText("GAME OVER", { x: 5, y: 7, color: color`3` });
    addText("Retry? -> L", { x: 4, y: 8, color: color`4` });
    addText(`Your score -> ${score}`, { x: 2, y: 9, color: color`5` });
    return;
  } else if (isGamePaused) {
    clearText();
    const emptyMap = map`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`;
    setMap(emptyMap);
    addText("GAME PAUSED", { x: 5, y: 7, color: color`5` });
    addText("Continue -> L", { x: 4, y: 8, color: color`4` });
    return;
  };
  
  clearText();
  let boardMap = map`
................
`;
  if (!activePiece) spawnPiece();
  for (let r = 0; r < boardRows.length; r++) {
    let col = "";
    for (let c = 0; c < boardRows[r].length; c++) {
      let ct = boardRows[r][c];
      if (activePiece && c === activePiece.x && r >= activePiece.y && r < activePiece.y + 3) ct = activePiece.jewels[r - activePiece.y];
      col += ct || 't';
    }
    boardMap += `...w${col}w.....\n`;
  }
  boardMap += `...wwwwwwww.....\n................`;
  setMap(boardMap);

  addText(`${score}`, { x: 14, y: 2, color: color`3` });
}

setInterval(renderGame, 1000 / FPS);
setInterval(() => {
  if (!activePiece) return;
  if (isGamePaused) return;
  const nextY = activePiece.y + 1;
  const bottomJewelY = nextY + 2;
  if (bottomJewelY >= 13 || boardRows[bottomJewelY][activePiece.x] !== "") {
    boardRows[activePiece.y][activePiece.x] = activePiece.jewels[0];
    boardRows[activePiece.y + 1][activePiece.x] = activePiece.jewels[1];
    boardRows[activePiece.y + 2][activePiece.x] = activePiece.jewels[2];
    activePiece = null;
    playTune(blockCollision);
    processMatches();
    return;
  }
  activePiece.y = nextY;
}, 500);
