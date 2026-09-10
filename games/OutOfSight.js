/*
@title: Out Of Sight
@description: Puzzle stealth game with an endless arcade mode
@author: Danxo
@tags: ['stealth', 'puzzle', 'arcade']
@addedOn: 2026-09-10
*/

const player = "p";
const playerLeft = "P";
const wall = "w";
const door = "d";
const box = "b";
const pc = "n";
const woodBox = "q";
const background = "g";
const enemy = "e";
const enemyLeft = "E";
const vision = "v";
const profile = "y";
const t1 = "1"; const t2 = "2"; const t3 = "3"; const t4 = "8"; // Topo
const b1 = "4"; const b2 = "5"; const b3 = "6"; const b4 = "9"; // Baixo

// ====== EFEITOS SONOROS E MÚSICA ======
const floorUpSFX = tune`
100: G5^100 + F5~100 + E4/100,
100: E5^100 + D5~100 + C4/100,
100: A5^100 + G5~100 + F4/100,
2900`;

const spottedSFX = tune`
100: A5^100,
100: F5^100,
100: C5^100,
2900`;

const takedownSFX = tune`
80: F5-80,
80: E5-80 + G5~80,
80: B5/80,
2320`;

const bgmMusic = tune`150: A5^150, 150: A5^150, 150: C5150, 150: A5^150, 150: D5^150, 150: A5^150, 150: C5^150, 150: G5^150`;

setLegend(
  [player, bitmap`
................
......0000......
....00DDD0......
...00DDDDD0.....
...00DDD8D0.....
...0D0D8800.....
...0D00800......
...0DD8D0.......
....0D8DD0......
.....0D8000.....
.....0DD8D0.....
....08DD0D0.....
....088D000.....
....08080.......
..00D00D000.....
..0DD00DDD0.....`],

  [t1, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002222222000222
0002222222000222
0000000000000000
0022000022002200
0022000022002200
0222000222022200
0220000220022000
2220002220222000
2222222200222222
2222222200222222`],

  [t2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0022200222220000
0022200222220000
0000000000000000
0022000022000000
0022000022000000
0222000222000002
0220000220000002
2220002220000022
2200002200000022
2200002200000022`],

  [t3, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0222222200022222
0222222200022222
0000000000000000
2200002200222220
2200002200222220
2200022202220000
2000022002200000
2000222022200000
2222220022000000
2222220022000000`],

  [t4, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000222022200000
0000222022200000
0000222022200000
0000000000000000
0000000000000000
0000022222000000
0000022222000000
0000022222000000
0000002220000000
0000002220000000`],

  [b1, bitmap`
2222222222222222
2DDDDDDDDDDDDDDD
2DDDDDDDDDDDDDDD
2DDDDD00000000DD
2DDDDD00000000DD
2DDDDDDDDDDDDDDD
2DDDD00000000DD0
2DDDD00000000DD0
2DDDDDDDDD000D00
2DDDDDDDDD00DD00
2DDDDDDDD000D000
2DDD0000000DD00D
2DDD0000000DD00D
2DDDDDDDDDDDDDDD
2DDDDDDDDDDDDDDD
2222222222222222`],

  [b2, bitmap`
2222222222222222
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
00DD00000000DDD0
00DD00000000DDD0
DDDD00DDDDDDDD00
0DD000DDDDDDDD00
0DD00DD0000DDD00
0D000DD0000DD000
DD00DDDDD00DD00D
D000DDDD00DD000D
D000000000DD00DD
D00000000DDD00DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
2222222222222222`],

  [b3, bitmap`
2222222222222222
DDDDDDDDDDDDDDD2
DDDDDDDDDDDDDDD2
0DD00D000000DDD2
0DD00D000000DDD2
0D000DDDDDDDDDD2
DD00DDD00DDDDDD2
0000DDD00DDDDDD2
0000DD000DDDDDD2
D00DDD00DDDDDDD2
000DD000DDDDDDD2
00DDD00DDDDDDDD2
00DDD00DDDDDDDD2
DDDDDDDDDDDDDDD2
DDDDDDDDDDDDDDD2
2222222222222222`],

  [b4, bitmap`
0000002220000000
0000022222000000
0000022222000000
0000022222000000
0000022222000000
0000222022200000
0000222022200000
0000222022200000
0000000000000000
0000000000000000
0002220002220000
0002220002220000
0002220002220000
0000000000000000
0000000000000000
0000000000000000`],

  [playerLeft, bitmap`
................
.....0000.......
.....0DDD00.....
....0DDDDD00....
....0D8DDD00....
....0088D0D0....
.....00800D0....
......0D8DD0....
.....0DD8D0.....
....0008D0......
....0D8DD0......
....0D0DD80.....
....000D880.....
......08080.....
....000D00D00...
....0DDD00DD0...`],

  [wall, bitmap`
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
0000000000000000`],

  [profile, bitmap`
0000000000000000
0222222222222220
0200000000000020
02000DDDDDDD0020
0200DDDDDDDDD020
020DDDDDDDDDD020
0200DDDDD8HDD020
020DDDH88888D020
020DD8008800D020
020DD02D88H20020
0200D888888DD020
020DDDH888HD0020
0200DDDD0DDD0020
0200000000000020
0222222222222220
0000000000000000`],

  [door, bitmap`
0000000000000000
00DDDDDDDDDDDD00
00D0000000000D00
00DDDDDDDDDDDD00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00
00D0000000000D00`],

  [box, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0DDDDDDDDDDDDDD0
0D000000000000D0
0DDDDDDDDDDDDDD0
0D000000000000D0
0DDDDDDDDDDDDDD0
0D000000000000D0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0`],

  [pc, bitmap`
...0000000000...
...0444444440...
...0444444440...
...0444444440...
0000444444440000
0000DDDDDDDD0000
0000D4D4D4D40000
00004D4D4D4D0000
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DD0000000000DD0
0DDDDDDDDDDDDDD0
0DDDDD0000DDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0`],

  [woodBox, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0CCCCCCCCCCCCCC0
0CFCCFFFFFFCCFC0
0CFCCCCCCCCCCFC0
0CFCCFFCCFFCCFC0
0CFCCCCFFCCCCFC0
0CFCCFFCCFFCCFC0
0CFCCCCCCCCCCFC0
0CFCCFFFFFFCCFC0
0CCCCCCCCCCCCCC0`],

  [background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],

  [enemy, bitmap`
................
......0000......
.....0555000....
.....0555550....
.....0888000....
.....08880......
.....00800......
.....0550.......
.....0550.......
.....058000.....
.....055850.....
....0555050.....
....0555000.....
....05050.......
..005005000.....
..055005550.....`],

  [enemyLeft, bitmap`
................
....0000........
..0005550.......
..0555550.......
..0008880.......
....08880.......
....00800.......
.....0550.......
.....0550.......
...000850.......
...058550.......
...0505550......
...0005550......
.....05050......
...000500500....
...055500550....`],

  [vision, bitmap`
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2
2.2.2.2.2.2.2.2.
.2.2.2.2.2.2.2.2`]
);

setBackground([background]);

// ====== CONTROLES DE ESTADO ======
let gameMode = "MENU"; // Estados: MENU, PUZZLE, ARCADE, VICTORY
let level = 0;
let moves = 0;
let gameOver = false;
let score = 0;
let turns = 0;

const arcadeMap = map`
wwwwwwwwww
w.q....q.w
w...bb...w
w........w
w...p....w
w...bb...w
w.q....q.w
wwwwwwwwww`;

const levels = [{
    mapa: map`
wwwwwwdwww
w.....p..w
w.b..bbb.w
w...e....w
w.bbbb.w.w
w......b.w
w...e....w
wywwwwwwww`,
    configInimigos: [
      { id: 1, sprite: enemy, dirX: 1, dirY: 0, sightDistance: 2, path: [{ dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }], stepIndex: 0 },
      { id: 2, sprite: enemy, dirX: -1, dirY: 0, sightDistance: 2, path: [{ dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }], stepIndex: 0 }
    ]
  },
  {
    mapa: map`
wwwwwwwwdw
w....www.w
w....wwwpw
w.e.ewww.w
w.q..www.w
w..bbbbb.w
w.....q..w
wywwwwwwww`,
    configInimigos: [
      { id: 3, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }], stepIndex: 0 },
      { id: 4, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }], stepIndex: 0 }
    ]
  },
  {
    mapa: map`
wwwwwwwwdw
wbbb.....w
w.......pw
w....e...w
w.q..e...w
w........w
w....q...w
wywwwwwwww`,
    configInimigos: [
      { id: 3, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }], stepIndex: 0 },
      { id: 4, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }], stepIndex: 0 }
    ]
  },
  {
    mapa: map`
wwwwwwwwdw
we....n..w
w.ww.....w
w.bb.....w
w.q......w
w.......pw
w....q...w
wywwwwwwww`,
    configInimigos: [
      { id: 5, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }], stepIndex: 1 },
    ]
  },
  {
    mapa: map`
wwwwwwwwdw
w.p......w
w........w
w.bbe....w
w.....b..w
w..n.en..w
w........w
wywwwwwwww`,
    configInimigos: [
      { id: 6, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }], stepIndex: 0 },
      { id: 7, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }], stepIndex: 0 },
    ]
  },
  {
    mapa: map`
wwwwwwwwdw
w........w
w.n...ww.w
w...e.wb.w
wpww..b..w
w.bb.en..w
w........w
wywwwwwwww`,
    configInimigos: [
      { id: 8, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }], stepIndex: 0 },
      { id: 9, sprite: enemy, dirX: 0, dirY: 1, sightDistance: 2, path: [{ dx: 0, dy: 1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: 0, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }, { dx: 0, dy: 1 }], stepIndex: 0 },
    ]
  }
];

let enemies = [];

setSolids([wall, woodBox, box, profile, player, playerLeft, pc]);
setPushables({
  [player]: [woodBox],
  [playerLeft]: [woodBox]
});

function updateVision() {
  getAll(vision).forEach(s => s.remove());

  enemies.forEach(e => {
    const sprite = e.spriteInstance;
    if (!sprite) return;

    for (let i = 1; i <= e.sightDistance; i++) {
      const vx = sprite.x + (e.dirX * i);
      const vy = sprite.y + (e.dirY * i);

      const tile = getTile(vx, vy);
      if (tile.some(s => s.type === wall || s.type === box || s.type === woodBox)) break;

      addSprite(vx, vy, vision);
    }
  });
}

function updateEnemies() {
  if (gameOver) return;

  const todosSprites = getAll(enemy);

  enemies.forEach((e, index) => {
    if (!e.spriteInstance && todosSprites[index]) {
      e.spriteInstance = todosSprites[index];
    }
  });

  enemies.forEach(e => {
    const sprite = e.spriteInstance;
    if (!sprite) return;

    const currentStep = e.path[e.stepIndex];

    const nextX = sprite.x + currentStep.dx;
    const nextY = sprite.y + currentStep.dy;

    const alvo = getTile(nextX, nextY);
    const bateu = alvo.some(s => s.type === wall || s.type === box || s.type === woodBox || s.type === door);

    if (bateu) {
      e.path = e.path.map(passo => ({ dx: -passo.dx, dy: -passo.dy }));
      e.stepIndex = 0; 
      e.dirX = -e.dirX;
      e.dirY = -e.dirY;
    } else {
      sprite.x = nextX;
      sprite.y = nextY;

      if (currentStep.dx !== 0 || currentStep.dy !== 0) {
        e.dirX = currentStep.dx;
        e.dirY = currentStep.dy;
      }
      e.stepIndex = (e.stepIndex + 1) % e.path.length;
    }
  });

  updateVision();
}

function spawnEnemy() {
  let validPoints = [];
  for (let x = 1; x <= 8; x++) {
    for (let y = 1; y <= 6; y++) {
      if (x === 1 || x === 8 || y === 1 || y === 6) {
        const tile = getTile(x, y);
        if (tile.length === 0 || tile.every(s => s.type === background)) {
          validPoints.push({ x, y });
        }
      }
    }
  }

  if (validPoints.length > 0) {
    const pt = validPoints[Math.floor(Math.random() * validPoints.length)];
    let dx = pt.x < 5 ? 1 : -1;
    let dy = 0;

    let path = [{ dx: dx, dy: 0 }, { dx: dx, dy: 0 }, { dx: -dx, dy: 0 }, { dx: -dx, dy: 0 }];
    let newEnemy = {
      id: Math.random(),
      sprite: enemy,
      dirX: dx,
      dirY: dy,
      sightDistance: 3, 
      path: path,
      stepIndex: 0
    };

    enemies.push(newEnemy);
    addSprite(pt.x, pt.y, enemy);
  }
}

function getPlayerSprite() {
  return getFirst(player) || getFirst(playerLeft);
}

function getDoorSprite() {
  return getFirst(door);
}

function checkGameState() {
  if (gameOver || gameMode === "MENU" || gameMode === "VICTORY") return;

  const p = getPlayerSprite();
  if (!p) return;

  const playerTile = getTile(p.x, p.y);

  // TELA E LÓGICA DE GAME OVER
  const isSeen = playerTile.some(s => s.type === vision);
  if (isSeen) {
    gameOver = true;
    playTune(spottedSFX);
    clearText();
    addText("SPOTTED!", { x: 6, y: 4, color: color`2` });
    if (gameMode === "ARCADE") {
      addText("Final Score: " + score, { x: 3, y: 6, color: color`3` });
    }
    addText("I: Restart Level", { x: 2, y: 8, color: color`2` });
    return;
  }

  const enemySprite = playerTile.find(s => s.type === enemy || s.type === enemyLeft);
  if (enemySprite) {
    enemySprite.remove();
    enemies = enemies.filter(e => e.spriteInstance !== enemySprite);
    getAll(vision).forEach(s => s.remove());
    updateVision();
    playTune(takedownSFX);

    if (gameMode === "ARCADE") {
      score += 1;
      clearText();
      addText("score: " + score, { x: 4, y: 14, color: color`2` });
      addText("takedown!", { x: 3, y: 0, color: color`3` });
    } else {
      addText("takedown!", { x: 3, y: 0, color: color`3` });
    }
  }

  if (gameMode === "PUZZLE") {
    const d = getDoorSprite();
    if (d && p.x === d.x && p.y === d.y && getAll(enemy).length === 0 && getAll(enemyLeft).length === 0) {
      level += 1;
      playTune(floorUpSFX);
      
      if (level >= 6) {
        gameMode = "VICTORY";
      }
      updateLevel();
    }
  }
}

function updateLevel() {
  moves = 0;
  gameOver = false;
  clearText();

  if (gameMode === "MENU") {
    setMap(map`
bwwwddwwwb
wwwwwwwwww
www1238www
www4569www
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
bwwwwwwwwb`);
    addText("L/A: Puzzle", { x: 5, y: 10, color: color`2` });
    addText("K/B: Arcade", { x: 5, y: 12, color: color`2` });
    return;
  }

  if (gameMode === "VICTORY") {
    setMap(map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`);
    addText("You completed", { x: 4, y: 2, color: color`4` });
    addText("the game", { x: 6, y: 4, color: color`4` });
    addText("Try arcade mode", { x: 3, y: 8, color: color`3` });
    addText("K/B: Main Menu", { x: 4, y: 12, color: color`4` });
    return;
  }

  if (gameMode === "PUZZLE") {
    setMap(levels[level].mapa);
    enemies = JSON.parse(JSON.stringify(levels[level].configInimigos));
    addText("floor " + level, { x: 4, y: 14, color: color`2` });
  } else if (gameMode === "ARCADE") {
    setMap(arcadeMap);
    enemies = [];
    score = 0;
    turns = 0;
    addText("score: " + score, { x: 4, y: 14, color: color`2` });
  }

  enemies.forEach(e => { e.spriteInstance = null; });
}

// Inicializa o jogo
// Toca a música em loop no jogo
updateLevel();
updateVision();

// ====== CONTROLES ======
onInput("w", () => {
  if (gameOver || gameMode === "MENU" || gameMode === "VICTORY") return;
  const p = getPlayerSprite();
  if (p) p.y -= 1;
});

onInput("a", () => {
  if (gameOver || gameMode === "MENU" || gameMode === "VICTORY") return;
  const p = getPlayerSprite();
  if (p) {
    p.x -= 1;
    p.remove();
    addSprite(p.x, p.y, playerLeft);
  }
});

onInput("s", () => {
  if (gameOver || gameMode === "MENU" || gameMode === "VICTORY") return;
  const p = getPlayerSprite();
  if (p) p.y += 1;
});

onInput("d", () => {
  if (gameOver || gameMode === "MENU" || gameMode === "VICTORY") return;
  const p = getPlayerSprite();
  if (p) {
    p.x += 1;
    p.remove();
    addSprite(p.x, p.y, player);
  }
});

// Botão L (A no console física) -> MODO PUZZLE
onInput("l", () => {
  if (gameMode === "MENU") {
    gameMode = "PUZZLE";
    level = 0;
    updateLevel();
    updateVision();
  }
});

// Botão K (B no console físico) -> MODO ARCADE / MENU
onInput("k", () => {
  if (gameMode === "MENU") {
    gameMode = "ARCADE";
    updateLevel();
    updateVision();
  } else if (gameMode === "VICTORY") {
    gameMode = "MENU";
    updateLevel();
  }
});

// Botão I (X no console físico) -> REINICIAR GAME OVER
onInput("i", () => {
  if (gameOver) {
    updateLevel();
    updateVision();
  }
});

afterInput(() => {
  if (gameMode === "MENU" || gameMode === "VICTORY") return;
  
  moves += 1;
  if (moves == 1) {
    clearText();
    if (gameMode === "ARCADE") addText("score: " + score, { x: 4, y: 14, color: color`2` });
    moves = 0;
  }

  if (gameMode === "ARCADE" && !gameOver) {
    turns += 1;
    if (turns % 5 === 0) { 
      spawnEnemy();
    }
  }

  checkGameState();
  updateEnemies();
  checkGameState();
});