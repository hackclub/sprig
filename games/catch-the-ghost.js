/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: catch the ghost
@author: vladutzu
@tags: []
@addedOn: 2025-03-26
*/

// Ghost Hunter pentru consola Sprig
// Jucătorul trebuie să vâneze fantome într-un conac întunecat

// Definire hartă (8x8)
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

// Definire sprite-uri
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
...7777..77.....`]
);

const player = { x: 3, y: 7, sprite: "h" };
let ghost = null;
let ghostTimer = 12; // Fantoma dispare după 12 ticks (~6 sec)
let ghostCooldown = 5; // Timp înainte de apariția unei noi fantome
let score = 0;

// Listă de locuri deja ocupate de fantome
let occupiedLocations = [];

// Inițializare text pentru scor în colțul din stânga sus
let scoreText = addText("Score: " + score, { x: 0, y: 0, color: color`white` });

function updateScore() {
  // Șterge textul anterior
  clearText(scoreText);

  // Creează și adaugă din nou textul cu scorul actualizat
  scoreText = addText("Score: " + score, { x: 0, y: 0, color: color`white` });
}

updateScore();

function drawPlayer() {
  if (player.x >= 0 && player.x < 8 && player.y >= 0 && player.y < 8) {
    clearTile(player.x, player.y);
    addSprite(player.x, player.y, player.sprite);
  }
}

function drawGhost() {
  if (ghost != null) {
    if (ghost.x >= 0 && ghost.x < 8 && ghost.y >= 0 && ghost.y < 8) {
      addSprite(ghost.x, ghost.y, "g");
    }
  }
}

drawPlayer();

onInput("w", () => {
  if (player.y > 0) {
    clearTile(player.x, player.y);
    player.y--;
    drawPlayer();
  }
});
onInput("a", () => {
  if (player.x > 0) {
    clearTile(player.x, player.y);
    player.x--;
    drawPlayer();
  }
});
onInput("s", () => {
  if (player.y < 7) {
    clearTile(player.x, player.y);
    player.y++;
    drawPlayer();
  }
});
onInput("d", () => {
  if (player.x < 7) {
    clearTile(player.x, player.y);
    player.x++;
    drawPlayer();
  }
});

function spawnGhost() {
  // Generăm un loc aleator care nu este deja ocupat de o altă fantomă
  let x, y;
  do {
    x = Math.floor(Math.random() * 8);
    y = Math.floor(Math.random() * 8);
  } while (occupiedLocations.some(location => location.x === x && location.y === y));

  ghost = { x: x, y: y, scored: false };
  occupiedLocations.push({ x: x, y: y }); // Marcam locul ca ocupat
  ghostTimer = 12;
  ghostCooldown = 5;
}

function updateGhost() {
  if (ghost != null) {
    ghostTimer--;
    if (ghostTimer <= 0) {
      clearTile(ghost.x, ghost.y);
      occupiedLocations = occupiedLocations.filter(location => location.x !== ghost.x || location.y !== ghost.y); // Eliberăm locul
      ghost = null;
    }
  }
}

function checkCollision() {
  if (ghost != null && player.x === ghost.x && player.y === ghost.y && !ghost.scored) {
    clearTile(ghost.x, ghost.y);
    occupiedLocations = occupiedLocations.filter(location => location.x !== ghost.x || location.y !== ghost.y); // Eliberăm locul
    ghost = null;
    score++; // Crește scorul când fantoma este prinsă
    updateScore(); // Actualizează afișajul scorului
  }
}

// Loop-ul jocului: se execută la fiecare 500ms
setInterval(() => {
  if (ghost != null) {
    clearTile(ghost.x, ghost.y);
    updateGhost();
  } else {
    if (ghostCooldown > 0) {
      ghostCooldown--;
    } else {
      spawnGhost();
    }
  }
  drawPlayer();
  drawGhost();
  checkCollision();
}, 500);
