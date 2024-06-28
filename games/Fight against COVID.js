/*
@title: Fight against COVID
@author: Swaraj Singh
*/

const player = "p";
const covid = "c";
const bullet = "b";

setLegend(
  [ player, bitmap`
................
................
...000..........
...060..........
..0660..........
..06660.........
..03630.........
..06660055557...
..03630.55557...
..03330055......
.066660.55......
.06660..........
..000...........
..0.0...........
.00.00..........
................` ],
  [ covid, bitmap`
................
................
................
.D4....4D...D4..
..DD...D4..4D...
..4D4..DD.4D....
...D4D.D.4D..4..
...4.DDDDDD4DDD4
..DD4D4DD4DD4...
.4D..DD4DDD.....
D4...DDDD.DD4...
....4D.4D4.DD4..
...4DD.4DD..4D..
..4DD....D...D4.
..D4....4D......
................`],
  [ bullet, bitmap`
................
................
................
................
................
.......7........
...777777.......
...7333337......
...73444337.....
...7333337......
...777777.......
.......7........
................
................
................
................`]
);

setSolids([player])

let level = 0
const levels = [
  map`
........
........
........
........
p.......`
]

setMap(levels[level])

setPushables({
  [player]: []
})

var gameRunning = true;
var score = 0;

function SpawnBullet() {
  let x = 0;
  let y = getFirst(player).y;
  addSprite(x, y, bullet);
}

function SpawnCovid() {
  let x = 7;
  let y = Math.floor(Math.random() * 5);
  let spawn = Math.floor(Math.random() * 4);
  if (spawn == 1) {
    addSprite(x, y, covid);
  }
}

function RemoveCovid() {
  let covids = getAll(covid);
  for (let i = 0; i < covids.length; i++){
    if (covids[i].x == 0) {
      covids[i].remove();
      }
  }
}

function RemoveBullet() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++){
    if (bullets[i].x == 7) {
      bullets[i].remove();
      }
  }
}

function KillCovid() {
  let bullets = getAll(bullet);
  let covids = getAll(covid);
  for (let i = 0; i < bullets.length; i++){
    for (let j = 0; j < covids.length; j++){
      if (bullets[i].x == covids[j].x && bullets[i].y == covids[j].y){
        clearTile(bullets[i].x, bullets[i].y);
        score += 1;
      }
      
    }
    
  }
}

function MoveBullets() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++){
    bullets[i].x += 1;
  }
}

function MoveCovids() {
  let covids = getAll(covid);
  for (let i = 0; i < covids.length; i++){
    covids[i].x -= 1;
  }
}

function Infected() {
  let covids = getAll(covid);
  let playerSprite = getFirst(player);
  
  for (let i = 0; i < covids.length; i++){
    if (playerSprite.x === covids[i].x && playerSprite.y === covids[i].y){
      gameRunning = false;
    }
  }
}

function updateScore() {
  
}
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("i", () => {
  SpawnBullet()
})

afterInput(() => {
  
})

var gameLoop = setInterval(() => {
  // Step 4 - Add all game functions
  Infected()
  SpawnCovid()
  RemoveCovid()
  RemoveBullet()
  KillCovid()
  clearText()
  addText("Score: " + score,{
    x: 1,
    y: 2,
    color: color`0`
  } )
  MoveCovids()
  MoveBullets()

  if (gameRunning == false) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }

}, 300);


