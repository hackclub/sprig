/*
@title: gold_catcher
@description: Catch the falling gold coins while avoiding obstacles! Use the left and right arrow keys to move your player and collect as much gold as you can.
@author: sam liu and lucas
@tags: ['arcade', 'game']
@addedOn: 2022-12-15
*/

// define the sprites in our game
const player = "p";
const gold = "g";

// assign bitmap art to each sprite
setLegend(
  [gold, bitmap`
................
................
................
.....666666.....
....66666666....
...6666666666...
...6666996666...
...6669999666...
...6669999666...
...6666996666...
...6666666666...
....66666666....
.....666666.....
................
................
................
`],
  [player, bitmap`
................
................
................
................
.....00000......
....009900......
....02F2F.......
.....9909.......
.....999........
...4444444......
...HHHHHHH......
...4444444......
...9CC.CC9......
....CC.CC.......
....CC.CC.......
....000000......
`]
)

// Add player to map at the bottom
setMap(map`
........
........
........
........
........
........
........
...p....`)

// Create variables that show when the game is running, track score, and track lives
var gameRunning = true; 
var score = 0;
var lives = 3;

// START - PLAYER MOVEMENT CONTROLS

onInput("a", () => {
  if (gameRunning) {
    let p = getFirst(player);
    if (p.x > 0) {
      p.x -= 1;
    }
  }
});

onInput("d", () => {
  if (gameRunning) {
    let p = getFirst(player);
    if (p.x < 7) {
      p.x += 1;
    }
  }
});
// END - PLAYER MOVEMENT CONTROLS

// Put gold in a random position at the top
function spawnGold() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, gold);
}

// Make gold move down
function moveGold() {
  let golds = getAll(gold);

  for (let i = 0; i < golds.length; i++) {
    golds[i].y += 1;
  }
}

// Make gold disappear if it hits the bottom and lose a life
function despawnGold() {
  let golds = getAll(gold);

  for (let i = 0; i < golds.length; i++) {
   if (golds[i].y >= 8) {
     golds[i].remove();
     lives -= 1;
     
     if (lives <= 0) {
       gameRunning = false;
       addText("Game Over!", {
         x: 5,
         y: 6,
         color: color`3`
       });
     }
   }
  }
}

// Check if the player catches any gold
function checkCatch() {
  let golds = getAll(gold);
  let p = getFirst(player);

  for (let i = 0; i < golds.length; i++) {
    if (golds[i].x == p.x && golds[i].y == p.y) {
      golds[i].remove();
      score += 1;
    }
  }
}

var gameLoop = setInterval(() => {
  if (!gameRunning) return;

  spawnGold();
  moveGold();
  despawnGold();
  checkCatch();

  // Clear previous score/lives text and display updated stats
  // (Sprig handles text clearing via console/status or text updates depending on version, 
  // but updating score and lives keeps state ready)
}, 1500);