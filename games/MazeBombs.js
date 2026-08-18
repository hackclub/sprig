/*
@title: MazeBombs
@author: Bidoul44
@description: Navigate a maze while avoiding bombs to reach the exit
@tags: ['maze', 'puzzle','2players']
@addedOn: 2026-07-21
*/

// ============================================================
// 2 PLAYER LAB — Jeu de labyrinthe compétitif (Sprig / Hack Club)
// ============================================================
// Contrôles :
//   Joueur 1 : W A S D
//   Joueur 2 : I J K L
// Menu : W = 1 joueur (vs bot) | I = 2 joueurs
// Fin de partie : appuyer sur n'importe quelle touche de
// déplacement relance une nouvelle partie (Sprig n'a pas de
// touche "R" dédiée, seulement w a s d i j k l).
// ============================================================


// ============================================================
// CONFIGURATION
// ============================================================
const CELLS_X = 7;                 // largeur du labyrinthe en "cellules"
const CELLS_Y = 7;                 // hauteur du labyrinthe en "cellules"
const MAP_W = CELLS_X * 2 + 1;     // largeur réelle de la grille (15)
const MAP_H = CELLS_Y * 2 + 1;     // hauteur réelle de la grille (15)
const BOT_DIFFICULTY = "hard";     // "hard" = BFS optimal | "easy" = aléatoire
const BOT_SPEED = 1000; // le bot joue toutes les 1 seconde
let gameMode = null;               // "solo" ou "duo"
let gameState = "MENU";            // "MENU" | "PLAYING" | "GAMEOVER"
let mazeGrid = [];                 // grille logique : 1 = sol, 0 = mur
let centerPos = { x: 0, y: 0 };
let botPath = [];                  // chemin restant que le bot doit suivre
let winner = null;                 // "J1" | "J2" | "BOT"

const bomb = "b";
const explosion = "e";

const BOMB_COOLDOWN = 5000; // 5 secondes
const BOMB_TIMER = 2000;    // explosion après 2 secondes
let gameTime = 0;
let lastBombTime = 0;
let activeBombs = [];

const background = "b";
// ============================================================
// SPRITES
// ============================================================
const wall    = "w";
const floor   = "f";
const player1 = "p";
const player2 = "q";
const bot     = "r";
const centerT = "c";
function createMenuMap() {
  setMap(map`
  .....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
`)
}
setLegend(
  [ wall, bitmap`
6666666666666666
6.66.66.66.66.66
6666666666666666
.66.66.66.66.66.
6666666666666666
6.66.66.66.66.66
6666666666666666
.66.66.66.66.66.
6666666666666666
6.66.66.66.66.66
6666666666666666
.66.66.66.66.66.
6666666666666666
66.66.66.66.66.6
6666666666666666
.66.66.66.66.66.` ],


  [ floor, bitmap`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........` ],

  [ player1, bitmap`
..CCCCCC........
.CCCCCCCC.......
CCCCCCCCCC......
CCCCCCCCCC......
CCCC00CCCC......
CCCCCCCCCC......
CCCCCCCCCC......
CCCCCCCCCC......
.CCCCCCCC.......
..CCCCCC........
................
................
................
................
................
................` ],

  [ player2, bitmap`
..555555..
.55555555.
5555555555
5555555555
5555005555
5555555555
5555555555
5555555555
.55555555.
..555555..` ],

  [ bot, bitmap`
..333333..
.33333333.
3333333333
3333333333
3333003333
3333333333
3333333333
3333333333
.33333333.
..333333..` ],
[bomb, bitmap`
................
................
.....0000.......
....000000......
...00000000.....
...00000000.....
....000000......
.....0000.......
................
................
................
................
................
................
................
................`],
[explosion, bitmap`
................
................
....333333......
...33333333.....
..3333333333....
...33333333.....
....333333......
................
................
................
................
................
................
................
................
................`],

  [ centerT, bitmap`
....44....
...4444...
..444444..
.44444444.
4444444444
4444444444
.44444444.
..444444..
...4444...
....44....` ]
);

setBackground(floor);
setSolids([ wall ]);

// Sons (facultatif) : clique sur "tune" dans l'éditeur Sprig pour
// dessiner une mélodie. Les variables sont prêtes à l'emploi.
const moveSound = tune`
C4 .
`;
const winSound = tune`
C4 E4 G4 C5
`;


// ============================================================
// GENERATION LABYRINTHE (Recursive Backtracking)
// ============================================================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function generateMaze(cellsX, cellsY) {
  const w = cellsX * 2 + 1;
  const h = cellsY * 2 + 1;

  const grid = [];
  for (let y = 0; y < h; y++) grid.push(new Array(w).fill(0));

  const visited = [];
  for (let cy = 0; cy < cellsY; cy++) visited.push(new Array(cellsX).fill(false));

  function carve(cx, cy) {
    visited[cy][cx] = true;
    grid[cy * 2 + 1][cx * 2 + 1] = 1;

    const dirs = shuffle([[0, -1], [0, 1], [-1, 0], [1, 0]]);
    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx >= 0 && nx < cellsX && ny >= 0 && ny < cellsY && !visited[ny][nx]) {
        grid[cy * 2 + 1 + dy][cx * 2 + 1 + dx] = 1; // casse le mur entre les deux cellules
        carve(nx, ny);
      }
    }
  }

  carve(0, 0);
  return grid;
}

function mazeToMapString(grid) {
  const rows = [];
  for (let y = 0; y < grid.length; y++) {
    let row = "";
    for (let x = 0; x < grid[y].length; x++) {
      row += grid[y][x] === 1 ? "." : wall;
    }
    rows.push(row);
  }
  return rows.join("\n");
}


// ============================================================
// PLACEMENT JOUEURS
// ============================================================
const P1_START = { x: 1, y: 1 };
const P2_START = { x: MAP_W - 2, y: MAP_H - 2 };

function placeEntities() {
  centerPos = {
    x: Math.floor(CELLS_X / 2) * 2 + 1,
    y: Math.floor(CELLS_Y / 2) * 2 + 1
  };

  addSprite(P1_START.x, P1_START.y, player1);

  if (gameMode === "duo") {
    addSprite(P2_START.x, P2_START.y, player2);
  } else {
    addSprite(P2_START.x, P2_START.y, bot);
    botPath = BOT_DIFFICULTY === "hard"
      ? bfsPath(mazeGrid, P2_START, centerPos)
      : [];
  }

  addSprite(centerPos.x, centerPos.y, centerT);
}

function startGame(mode) {
  activeBombs = [];
  gameMode = mode;
  gameState = "PLAYING";
  winner = null;

  mazeGrid = generateMaze(CELLS_X, CELLS_Y);
  const mapString = mazeToMapString(mazeGrid);
  setMap(map`${mapString}`);

  placeEntities();

  clearText();
  addText(mode === "duo" ? "   J1           J2" : "   J1          BOT", {
    x: 0, y: 0, color: color`0`
  });
}


// ============================================================
// CONTROLES
// ============================================================
function isFloor(x, y) {
  return mazeGrid[y] !== undefined && mazeGrid[y][x] === 1;
}

function tryMove(sprite, dx, dy) {
  const nx = sprite.x + dx;
  const ny = sprite.y + dy;
  if (!isFloor(nx, ny)) return; // case = mur -> ne bouge pas
  sprite.x = nx;
  sprite.y = ny;
  playTune(moveSound);
}

function handleMenuInput(key) {
  if (key === "w") startGame("solo");
  if (key === "i") startGame("duo");
}

function handleRestartInput() {
  gameState = "MENU";
  clearText();
  showMenu();
}

// Joueur 1 : W A S D
onInput("w", () => {
  if (gameState === "MENU") return handleMenuInput("w");
  if (gameState === "GAMEOVER") return handleRestartInput();
  tryMove(getFirst(player1), 0, -1);
});
onInput("a", () => {
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameState !== "PLAYING") return;
  tryMove(getFirst(player1), -1, 0);
});
onInput("s", () => {
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameState !== "PLAYING") return;
  tryMove(getFirst(player1), 0, 1);
});
onInput("d", () => {
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameState !== "PLAYING") return;
  tryMove(getFirst(player1), 1, 0);
});

// Joueur 2 : I J K L
onInput("i", () => {
  if (gameState === "MENU") return handleMenuInput("i");
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameMode === "duo") tryMove(getFirst(player2), 0, -1);
});
onInput("j", () => {
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameState === "PLAYING" && gameMode === "duo") tryMove(getFirst(player2), -1, 0);
});
onInput("k", () => {
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameState === "PLAYING" && gameMode === "duo") tryMove(getFirst(player2), 0, 1);
});
onInput("l", () => {
  if (gameState === "GAMEOVER") return handleRestartInput();
  if (gameState === "PLAYING" && gameMode === "duo") tryMove(getFirst(player2), 1, 0);
});


// ============================================================
// IA BOT
// ============================================================
function bfsPath(grid, start, goal) {
  const h = grid.length;
  const w = grid[0].length;
  const visited = grid.map(row => row.map(() => false));
  const prev = {};
  const key = (x, y) => x + "," + y;

  const queue = [start];
  visited[start.y][start.x] = true;
  let qi = 0;

  while (qi < queue.length) {
    const cur = queue[qi++];
    if (cur.x === goal.x && cur.y === goal.y) break;

    const neighbors = [
      { x: cur.x + 1, y: cur.y },
      { x: cur.x - 1, y: cur.y },
      { x: cur.x, y: cur.y + 1 },
      { x: cur.x, y: cur.y - 1 }
    ];

    for (const n of neighbors) {
      if (n.x >= 0 && n.x < w && n.y >= 0 && n.y < h &&
          grid[n.y][n.x] === 1 && !visited[n.y][n.x]) {
        visited[n.y][n.x] = true;
        prev[key(n.x, n.y)] = cur;
        queue.push(n);
      }
    }
  }

  if (!visited[goal.y] || !visited[goal.y][goal.x]) return [];

  const path = [];
  let cur = goal;
  while (!(cur.x === start.x && cur.y === start.y)) {
    path.push(cur);
    cur = prev[key(cur.x, cur.y)];
  }
  path.reverse();
  return path;
}

function botRandomStep(sprite) {
  const dirs = shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]);
  for (const [dx, dy] of dirs) {
    if (isFloor(sprite.x + dx, sprite.y + dy)) {
      sprite.x += dx;
      sprite.y += dy;
      return;
    }
  }
}

function moveBot() {
  const botSprite = getFirst(bot);
  if (!botSprite) return;

  if (BOT_DIFFICULTY === "hard") {
    const next = botPath.shift();
    if (next) {
      botSprite.x = next.x;
      botSprite.y = next.y;
    }
  } else {
    botRandomStep(botSprite);
  }
}
setInterval(() => {

  if(
    gameState === "PLAYING" &&
    gameMode === "solo"
  ){

    moveBot();

    const who = checkWin();

    if(who){
      endGame(who);
    }

  }

}, BOT_SPEED);

// ============================================================
// VICTOIRE
// ============================================================
function checkWin() {
  const p1 = getFirst(player1);
  if (p1 && p1.x === centerPos.x && p1.y === centerPos.y) {
    return "J1";
  }
  if (gameMode === "duo") {
    const p2 = getFirst(player2);
    if (p2 && p2.x === centerPos.x && p2.y === centerPos.y) return "J2";
  } else {
    const b = getFirst(bot);
    if (b && b.x === centerPos.x && b.y === centerPos.y) return "BOT";
  }
  return null;
}

function endGame(who) {
  gameState = "GAMEOVER";
  winner = who;
  playTune(winSound);

  clearText();
  const label = who === "J1" ? "  JOUEUR 1 GAGNE !"
              : who === "J2" ? "  JOUEUR 2 GAGNE !"
              : "  LE BOT GAGNE !";
  addText(label, { x: 1, y: 6, color: color`0` });
  addText("    Appuie sur", { x: 0, y: 8, color: color`1` });
  addText("    une touche", { x: 0, y: 9, color: color`1` });
  addText("   pour rejouer", { x: 2, y: 10, color: color`1` });
}

afterInput(() => {

  if (gameState !== "PLAYING") return;


  const who = checkWin();

  if (who) {
    endGame(who);
  }

});

afterInput(() => {

  if(gameState !== "PLAYING") return;


  gameTime += 500;


  if(gameTime >= BOMB_COOLDOWN){

      placeBomb(getFirst(player1));

      if(gameMode === "duo"){
          placeBomb(getFirst(player2));
      }
      else{
          placeBomb(getFirst(bot));
      }

      gameTime = 0;
  }


});

function placeBomb(player){

    if(!player) return;


    addSprite(
        player.x,
        player.y,
        bomb
    );


    activeBombs.push({

        x:player.x,
        y:player.y,
        timer:BOMB_TIMER

    });



}

function explodeBomb(b) {

  const directions = [
    [0,0],
    [1,0],
    [-1,0],
    [0,1],
    [0,-1]
  ];


  for (const [dx,dy] of directions) {

    let x = b.x + dx;
    let y = b.y + dy;


    // Si on sort de la carte
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H)
      continue;


    // Détruire les murs
    let tile = getTile(x,y);

    for (let sprite of tile) {

      if (sprite.type === wall) {

        sprite.remove();
        mazeGrid[y][x] = 1;
      }

    }

    // Ajouter la flamme
    addSprite(x,y,explosion);


    // Vérifier les joueurs touchés
    killPlayer(x,y);


    // Faire disparaître l'explosion après 300ms
    setTimeout(() => {

      let explosionTile = getTile(x,y);

      for (let sprite of explosionTile) {

        if (sprite.type === explosion) {

          sprite.remove();

        }

      }

    },900);


}

}
function updateBombs() {

  for (let i = activeBombs.length - 1; i >= 0; i--) {

    let b = activeBombs[i];

    b.timer -= 500;


    // La bombe explose
    if (b.timer <= 0) {

      explodeBomb(b);


      // enlever le sprite bombe
      let tile = getTile(b.x, b.y);

      for (let sprite of tile) {

        if (sprite.type === bomb) {
          sprite.remove();
        }

      }


      // retirer de la liste
      activeBombs.splice(i, 1);

    }

  }

}
setInterval(() => {

    if(gameState==="PLAYING"){

        updateBombs();

    }

},500);
function killPlayer(x,y){

  let p1 = getFirst(player1);
  let p2 = getFirst(player2);
  let b = getFirst(bot);


  if(p1 && p1.x === x && p1.y === y){

    if(gameMode === "duo")
      endGame("J2");
    else
      endGame("BOT");

  }


  if(p2 && p2.x === x && p2.y === y){

    endGame("J1");

  }


  if(b && b.x === x && b.y === y){

    endGame("J1");

  }

}
// ============================================================
// RESTART / MENU
// ============================================================
function showMenu() {
  clearText();
  addText("Labyrinthe bombs", { x: 2, y: 2, color: color`0` });
  addText("  W = 1 joueur (bot)", { x: 0, y: 5, color: color`1` });
  addText("  I = 2 joueurs", { x: 1, y: 6, color: color`1` });
}

// Écran de départ au lancement du jeu
createMenuMap();
showMenu();