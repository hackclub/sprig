/*
@title: Jet Squadron Defense
@description: Side-scrolling jet game with bombers behind the player.
*/

const jet = "j";
const bomber = "B";
const enemy = "e";
const bullet = "b";
const empty = ".";
const background = "n";
const life = "l";

// ====== LEGEND ======
setLegend(
  [background, bitmap`................
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
................`],

  [jet, bitmap`
.LLL.....0000...
L111LLLLL00000L.
L11111111111111L
.L111L1L1111111L
..LLL1111LLLLLL6
....L111L.......
....LLLL........
................
................
................
................
................
................
................
................
................`],

  [bomber, bitmap`
.DDDDDDDDDD000..
DLLLLLLLLLL0000.
DDDDDDDDDDDDDDDD
.DDLLLLLLLLLLLLD
..DD111111DDDDD.
....11111.......
....1111........
....111.........
................
................
................
................
................
................
................
................`],

  [enemy, bitmap`
..............LL
.............L3L
..LL000LLLLLL33L
.LL000333363633L
LL3333333636333L
.LLLLLLLLLLLLLLL
.......LL33333L.
.........LL333L.
..........LLLLL.
................
................
................
................
................
................
................`],

  [bullet, bitmap`
......3LL.......
......L03L......
......L03L......
......3LL.......
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
................`],

  [life, bitmap`
................
...333....333...
..33333..33333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................`]
);

// ====== VARIABLES ======
let gameState = "menu";
let score = 0;
let lives = 3;
let gameOver = false;

let playerX = 1;
let playerY = 5;

let bullets = [];
let enemies = [];
let bombers = [];
let maxBullets = 1;
let bulletSpeed = 0.5;
let enemySpeed = 0.2;

let ticks = 0;
let totalEnemies = 20;

// ====== MAP ======
function createMap() {
  return map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
`;
}
let currentMap = createMap();
setMap(currentMap);

// ====== BOMBERS ======
for (let i = 0; i < 3; i++) {
  bombers.push({ x: 0, y: 2 + i*2 });
}

// ====== INPUT ======
onInput("w", () => { if(playerY>0) playerY--; updateGame(); });
onInput("s", () => { if(playerY<9) playerY++; updateGame(); });
onInput("a", () => { if(playerX>0) playerX--; updateGame(); });
onInput("d", () => { if(playerX<3) playerX++; updateGame(); }); // player stays on left side
onInput("j", () => { if(gameState==="menu"||gameOver){ resetGame(); gameState="playing"; } });
onInput("k", () => { 
  if(bullets.length < maxBullets && !gameOver) bullets.push({ x: playerX+1, y: playerY });
});

// ====== UPDATE ======
function updateGame() {
  if(gameState==="menu") return;
  ticks++;

  let mapArray = Array(10).fill(null).map(()=>Array(10).fill(empty));

  // ===== BULLETS =====
  bullets = bullets.filter(b=>{
    b.x += bulletSpeed;
    if(b.x <= 9){
      mapArray[Math.floor(b.y)][Math.floor(b.x)] = bullet;
      return true;
    }
    return false;
  });

  // ===== ENEMIES =====
  enemies = enemies.filter(e=>{
    e.x -= enemySpeed;
    if(e.x < 0){
      lives--;
      if(lives <= 0) gameOver = true;
      return false;
    } else {
      mapArray[Math.floor(e.y)][Math.floor(e.x)] = enemy;
      return true;
    }
  });

  // Spawn enemies
  if(ticks % 50 === 0 && enemies.length < totalEnemies){
    let y = Math.floor(Math.random()*8);
    enemies.push({ x: 9, y: y });
  }

  // ===== BOMBERS =====
  bombers.forEach(B=>{
    if(B.x < playerX-1) B.x += 0.05; // slowly move right behind player
    mapArray[B.y][Math.floor(B.x)] = bomber;
  });

  // ===== COLLISIONS BULLET vs ENEMY =====
  for(let bi=bullets.length-1; bi>=0; bi--){
    let b = bullets[bi];
    for(let ei=enemies.length-1; ei>=0; ei--){
      let e = enemies[ei];
      if(Math.floor(b.y)===Math.floor(e.y) && Math.floor(b.x)===Math.floor(e.x)){
        bullets.splice(bi,1);
        enemies.splice(ei,1);
        score+=10;
        return;
      }
    }
  }

  // ===== COLLISIONS ENEMY vs PLAYER =====
  for(let i=enemies.length-1;i>=0;i--){
    let e = enemies[i];
    if(Math.floor(e.y)===playerY && Math.floor(e.x)===playerX){
      enemies.splice(i,1);
      lives--;
      if(lives<=0) gameOver=true;
    }
  }

  // ===== COLLISIONS ENEMY vs BOMBERS =====
  for(let ei=enemies.length-1; ei>=0; ei--){
    for(let bi=0; bi<bombers.length; bi++){
      let B = bombers[bi];
      let e = enemies[ei];
      if(Math.floor(e.y)===B.y && Math.floor(e.x)===Math.floor(B.x)){
        enemies.splice(ei,1);
        score-=5;
      }
    }
  }

  // ===== PLACE PLAYER =====
  mapArray[playerY][playerX] = jet;

  // ===== DISPLAY LIVES =====
  for(let i=0;i<lives;i++) mapArray[0][i+7] = life;

  currentMap = mapArray.map(r=>r.join('')).join('\n');
  setMap(currentMap);

  clearText();
  addText(`Score: ${score}`, {y: 15, color: color`7`});
  if(gameOver){
    addText("GAME OVER!", {y:7, color: color`3`});
    addText("Press 'j' to restart", {y:9, color: color`H`});
  }
}

// ===== RESET GAME =====
function resetGame(){
  bullets = [];
  enemies = [];
  bombers = [];
  score=0;
  lives=3;
  gameOver=false;
  playerX=1;
  playerY=5;
  ticks=0;
  bombers=[];
  for (let i = 0; i < 3; i++) bombers.push({ x:0, y:2+i*2 });
}

// ===== MENU =====
function drawMenu(){
  clearText();
  addText("Jet Squadron Defense", {y:4, color: color`7`});
  addText("Press 'j' to play", {y:6, color: color`H`});
}
drawMenu();

// ===== RUN LOOP =====
setInterval(updateGame, 100);
