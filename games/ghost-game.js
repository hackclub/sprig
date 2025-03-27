// Ghost Hunter cu fantome si bombe
// Jucătorul trebuie să prindă fantome și să evite bombele, având 3 vieți

setMap(map`
........
........
........
........
........
........
........
........
`);

setLegend(
  ["h", bitmap`
................
.22.............
................
..00000000......
..00000000......
..00....00......
..00....00......
....000000......
....000000......
..00000000......
..00000000......
..00..00........
..00..00........
................
................
................`],
  ["g", bitmap`
................
................
................
................
...777777.......
...777777.......
.77..LL..77.....
.77..LL..77.....
.7777777777.....
.7777777777.....
...77..7777.....
...77..7777.....
.7777..77.......
.7777..77.......
...7777..77.....
...7777..77.....`],
  ["b", bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33333333....
....33333333....
.....333333.....
......3333......
.......33.......
.......33.......
......3333......
.....333333.....
......3333......
.......33.......
................`]
);

const player = { x: 3, y: 7, sprite: "h" };
let entity = null;
let entityTimer = 3; // Reducem timpul în care entitățile dispar
let entityCooldown = 0; // Reducem intervalul dintre aparițiile entităților
let score = 0;
let lives = 3;
let gameOver = false;
let occupiedLocations = [];

let scoreText = addText("Score: " + score, { x: 0, y: 0, color: color`white` });
let livesText = addText("Lives: " + lives, { x: 0, y: 1, color: color`red` });

let previousScore = score;
let previousLives = lives;

function updateText() {
  if (score !== previousScore) {
    clearText(scoreText); // Șterge textul anterior doar dacă scorul s-a schimbat
    scoreText = addText("Score: " + score, { x: 0, y: 0, color: color`white` }); // Adaugă scorul actualizat
    previousScore = score; // Salvează scorul actual
  }

  if (lives !== previousLives) {
    clearText(livesText); // Șterge textul anterior doar dacă viețile s-au schimbat
    livesText = addText("Lives: " + lives, { x: 0, y: 1, color: color`red` }); // Adaugă viețile actualizate
    previousLives = lives; // Salvează numărul de vieți actual
  }
}

function drawPlayer() {
  if (!gameOver && player.x >= 0 && player.x < 8 && player.y >= 0 && player.y < 8) {
    addSprite(player.x, player.y, player.sprite);
  }
}

drawPlayer();

onInput("w", () => { if (player.y > 0 && !gameOver) { clearTile(player.x, player.y); player.y--; drawPlayer(); checkCollision(); } });
onInput("a", () => { if (player.x > 0 && !gameOver) { clearTile(player.x, player.y); player.x--; drawPlayer(); checkCollision(); } });
onInput("s", () => { if (player.y < 7 && !gameOver) { clearTile(player.x, player.y); player.y++; drawPlayer(); checkCollision(); } });
onInput("d", () => { if (player.x < 7 && !gameOver) { clearTile(player.x, player.y); player.x++; drawPlayer(); checkCollision(); } });

function spawnEntity() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 8);
    y = Math.floor(Math.random() * 8);
  } while ((x === player.x && y === player.y) || occupiedLocations.some(loc => loc.x === x && loc.y === y));
  
  let isBomb = Math.random() < 0.3; // 30% șansă să fie bombă
  entity = { x: x, y: y, type: isBomb ? "b" : "g", scored: false };
  occupiedLocations.push({ x: x, y: y });

  // Reducerea timpilor pentru un joc mai greu
  if (!gameOver) {
    entityTimer = 2;  // Entitățile vor dispărea mult mai repede
    entityCooldown = 0;  // Entitățile vor apărea imediat una după alta
  } else {
    entityTimer = 6;  // La final, revenim la valori mai mari pentru entități
    entityCooldown = 2;  // La final, revenim la valori mai mari
  }
}

function updateEntity() {
  if (entity != null) {
    entityTimer--;
    if (entityTimer <= 0) {
      clearTile(entity.x, entity.y);
      occupiedLocations = occupiedLocations.filter(loc => loc.x !== entity.x || loc.y !== entity.y);
      entity = null;
    }
  }
}

function drawEntity() {
  if (entity != null && entity.x >= 0 && entity.x < 8 && entity.y >= 0 && entity.y < 8) {
    addSprite(entity.x, entity.y, entity.type);
  }
}

function checkCollision() {
  if (entity != null && player.x === entity.x && player.y === entity.y) {
    clearTile(entity.x, entity.y);
    occupiedLocations = occupiedLocations.filter(loc => loc.x !== entity.x || loc.y !== entity.y);
    
    if (entity.type === "g") {
      score++;
    } else {
      lives--;
    }
    entity = null;
    updateText();
    
    if (lives <= 0) {
      gameOver = true;
      addText("GAME OVER", { x: 3, y: 4, color: color`red` }); // Plasează textul "GAME OVER" în mijlocul ecranului
    }
  }
}

setInterval(() => {
  if (!gameOver) {
    if (entity != null) {
      clearTile(entity.x, entity.y);
      updateEntity();
    } else {
      if (entityCooldown > 0) {
        entityCooldown--;
      } else {
        spawnEntity();
      }
    }
    drawPlayer();
    drawEntity();
    checkCollision();
  }
}, 500);  // Reducem intervalul pentru a face jocul mai rapid
