//Michael Qu, Period 5, 5/7/25

const player = "p";
const obstacle = "o";
const sky = "s";
const ammo = "a";
const bullet = "b";
const heart = "h";
const enemy = "e";
const laser = "l";
const trim = "t";
const nuke = "n";
const dead = "d";
const enemy2= "q";
const laser2 = "z";

setLegend(
  [enemy,bitmap`
......HHHH......
.....HHH88H.....
....HHHHH88H....
...HHHHHHH8HH...
...HHHHHHHHHH...
...HHHHHHHHHH...
..LLLLLLLLLLLL..
.11111111111111.
LDLLDLLLLLLDLLDL
.LL1111111111LL.
..LLL111111LLL..
....LLLLLLLL....
................
.....DDDDDD.....
................
......DDDD......` ],
  [enemy2,bitmap`
................
.......44.......
.......HH.......
......8DD8......
.....8DDDD8.....
....8DDDDDD8....
..HHHHHHHHHHHH..
.88888888888888.
LLLLLLLLLLLLLLLL
6DDDDDDDDDDDDDD6
.6DD6DD66DD6DD6.
...DDDDDDDDDD...
..4..HHHHHH..4..
......4HH4......
................
................` ],
  [laser,bitmap`
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......` ],
  [laser2,bitmap`
................
................
................
................
................
................
................
3333333333333333
3333333333333333
................
................
................
................
................
................
................` ],
  [dead,bitmap`
......3..33.....
....3.33.33..33.
..33.339333933..
...33339999333..
..33999966933...
..39996666933...
333996666699933.
.39966666669933.
.3396666666933..
..399666666933..
.33996666669993.
33339966999933..
..33399999933...
..3..333933333..
....33333333....
...3....33..3...` ],
  [ammo,bitmap`
6666666666666666
6.......0......6
6......070.....6
6..00.07770.0..6
6.077007770070.6
6077770000077706
6000000555000006
6055550555055506
6055550555055506
6055550555055506
6055550555055506
6055550555055506
6055550555055506
6055550555055506
6055550555055506
6666666666666666`],
  [nuke,bitmap`
4444444444444444
4466666666666644
4660000660000664
4600000660000064
4600006666000064
4600066006600064
4600060000600064
4666660000666664
4666666006666664
4666666666666664
4666660000666664
4666600000066664
4666000000006664
4666600000066664
4466666666666644
4444444444444444`],
  [obstacle, bitmap`
......333.......
.....339333.....
....33999933....
...339966993....
...3966666993...
...36LLLLL6933..
..33LL1LLLLL93..
..3LL11LLLLLL3..
..LLL1LLLL11L3..
..LLLLLLLLL1LL..
..LLLLLLLLL1LL..
..LL1LLLLLLLLL..
...L11LLLLLLLL..
...L11LLL1LLLL..
...LLLLL1LLLL...
....LLLLLLL.....`],
  [bullet, bitmap`
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........
......77........`],
  [heart, bitmap`
................
.33333....33333.
3388833..3388833
3388883333888833
3888888338888883
3888HH8888HH8883
388HHHH88HHHH883
388HHHHHHHHHH883
3388HHHHHHHHH833
.388HHHHHHHH883.
.3388HHHHHH8833.
..3888HHHH8883..
..33888HH88833..
...3388888833...
....33388333....
......3333......`],
  [player, bitmap`
.......LL.......
.......11.......
......1771......
......L77L......
.....0L55L0.....
.9..L0LLLL0L..9.
.0..L0L11L0L..0.
.L1LL0L11L0LL1L.
.11L00LLLL00L11.
L11L00L00L00L11L
L1LL00L22L00LL1L
.L1LL02..20LL1L.
L1LLL2....2LLL1L
L11L2......2L11L
L2002......2002L
..33........33..`],
  [sky, bitmap`
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
  [trim, bitmap`
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115
5111111111111115`]
  
);

setSolids([player, trim]) //player cant go thru border

let count = 0; //counter for speed up and score
let ammoCount = 0;
let heartCount = 0; //lives
let level = 0;

const levels = [
  map`
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts
stsssssssssssts`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addSprite(6,15,player)

//shoot function
onInput("i", () => {
  if (!gameRunning || ammoCount <= 0) return;

  let p = getFirst(player);
  if (p.y > 0) {
    addSprite(p.x, p.y - 1, bullet);
    ammoCount--;
  }
});

onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y -= 1;
  }
});

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});


onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});

function spawnAmmo() {
  //ten percetn chance to spawn
  if (Math.random() < 0.1) {
    let x = Math.floor(Math.random() * 11) + 2; //spawn from 2 12 inclusive
    let y = 0;
    if (isEmpty(x, y)) {
      addSprite(x, y, ammo);
    }
  }
}

function spawnHeart(){
  if (Math.random() < 0.1){
    if (Math.random() < 0.1){
      let x = Math.floor(Math.random() * 11) + 2;
      let y = 0;
      if (isEmpty(x, y)) {
      addSprite(x, y, heart);
      }
    }
  }
}

function spawnNuke(){
  if (Math.random() < 0.1){
    if (Math.random() < 0.1){
      let x = Math.floor(Math.random() * 11) + 2;
      let y = 0;
      if (isEmpty(x, y)) {
      addSprite(x, y, nuke);
      }
    }
  }
}

function spawnObstacle() {
  let x = Math.floor(Math.random() * 11) + 2;
  let y = 0;
  if (isEmpty(x, y)) {
    addSprite(x, y, obstacle);
  }
}

function spawnEnemy(){
  if (count > 60 && Math.random() < 0.1){
    if (Math.random() < 0.3){
      if (Math.random() < 0.5){
        let x = Math.floor(Math.random() * 11) + 2;
        let y = 5;
        addSprite(x, y, enemy);
      }
    }
  }
  //shoot function for enemies
  if (count%8 == 0){
    let e = getAll(enemy);
    if (e.length >0){
      for (let i = 0; i < e.length; i++){
        addSprite(e[i].x, e[i].y + 1, laser);
      }
    }
  }
}

function spawnEnemy2(){
  if (count > 300 && Math.random() < 0.1){
    if (Math.random() < 0.3){
      if (Math.random() < 0.5){
        let y = Math.floor(Math.random() * 18);
        addSprite(0, y, enemy2);
        
        let sprites = getTile(0, y);
        for (let i = 0; i < sprites.length; i++) {
          if (sprites[i].type === enemy2) {
            sprites[i].spawnTime = count; //assign 'instance var' to enemy
            break;
          }
        }
      }
    }
  }
  //shoot function for enemy2
  let e = getAll(enemy2);
  if (e.length >0){
    for (let i = 0; i < e.length; i++) {
      if (count - e[i].spawnTime > 50){ 
        e[i].remove(); //remove if spawntime reached
      }
      else{
        if (count%7 == 0){
          addSprite(e[i].x + 1, e[i].y, laser2); //shift right
        }
      }
    }
  }

}


function isEmpty(x, y) {
  return getTile(x, y).length == 1; //true if only background sprite at that locationa
}

function moveBullets() {
  let bullets = getAll(bullet);

  for (let i = 0; i < bullets.length; i++) {
    let b = bullets[i];

    let above = getTile(b.x, b.y - 1); //check for obstacles or enemies above
    for (let j = 0; j < above.length; j++) {
      if (above[j].type == obstacle || above[j].type == enemy) {
        above[j].remove();
        b.remove();
        addSprite(b.x,b.y, dead);
        continue;
      }
    }

    b.y--;//move up

    if (b.y < 0) {
      b.remove(); //remove if offscreen
      continue;
    }

    let below = getTile(b.x, b.y+1); //check again for edge cases
    for (let j = 0; j < below.length; j++) {
      if (below[j].type == obstacle ) {
        below[j].remove();
        addSprite(below[j].x,below[j].y, dead);
        b.remove();
        break;
      }
    }

    if (b.y == 0){
      b.remove();
    }
  }
}


function moveObstacles() {
  let obstacles = getAll(obstacle);
  let ammoDrops = getAll(ammo);
  let hearts = getAll(heart);
  let lasers = getAll(laser);
  let nukes = getAll(nuke);
  let deads = getAll(dead);
  let lasers2 = getAll(laser2);
  
  //shifts obstacles down
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
  //shift ammo down
  for (let i = 0; i < ammoDrops.length; i++) {
    ammoDrops[i].y += 1;
  }
  //shift heart down
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].y += 1;
  }
  //shift laser down
  for (let i = 0; i < lasers.length; i++) {
    lasers[i].y += 1;
  }
  //shift laser2 right
  for (let i = 0; i < lasers2.length; i++) {
    lasers2[i].x += 1; 
  }
  //shift nuke down
  for (let i = 0; i < nukes.length; i++) {
    nukes[i].y += 1;
  }
  
}
// spawnObstacle();
// moveObstacles(); testing
// moveObstacles();

function despawnObstacles() {
  let obstacles = getAll(obstacle);
  let ammoDrops = getAll(ammo);
  let hearts = getAll(heart);
  let lasers = getAll(laser);
  let nukes = getAll(nuke);
  let deads = getAll(dead);
  let lasers2 = getAll(laser2);
  
  //despawn obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == 17) {
      obstacles[i].remove();
    }
  }
  //despawn ammo
  for (let i = 0; i < ammoDrops.length; i++) {
    if (ammoDrops[i].y == 17) {
      ammoDrops[i].remove();
    }
  }
  //despawn hearts
  for (let i = 0; i < hearts.length; i++) {
    if (hearts[i].y == 17) {
      hearts[i].remove();
    }
  }
  //despawn lasers
  for (let i = 0; i < lasers.length; i++) {
    if (lasers[i].y == 17) {
      lasers[i].remove();
    }
  }
  //despawn laser2
  for (let i = 0; i < lasers2.length; i++) {
    if (lasers2[i].x == 14) {
      lasers2[i].remove();
    }
  }
  //despawn nukes
  for (let i = 0; i < nukes.length; i++) {
    if (nukes[i].y == 17) {
      nukes[i].remove();
    }
  }
  //despawn dead animations
  for (let i = 0; i < deads.length; i++) {
    deads[i].remove();
  }
  
}
//check contacts with sprites
function checkHit() {
  let obstacles = getAll(obstacle);
  let ammoDrops = getAll(ammo);
  let hearts = getAll(heart);
  let p = getFirst(player);
  let lasers = getAll(laser);
  let enemies = getAll(enemy);
  let nukes = getAll(nuke);
  let lasers2= getAll(laser2);
  
 //obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      obstacles[i].remove();
      heartCount--;
      if (heartCount < 0){
        return true;
      }
    }
  }
  //ammo
  for (let i = 0; i < ammoDrops.length; i++) {
    if (ammoDrops[i].x == p.x && ammoDrops[i].y == p.y) {//pickup ammo
      ammoDrops[i].remove();
      if (ammoCount < 10){ //cap ammo count at 10
        ammoCount++; 
      }
    }
  }
  //heart
  for (let i = 0; i < hearts.length; i++) {
    if (hearts[i].x == p.x && hearts[i].y == p.y) {//pickup hearts
      hearts[i].remove();
      if (heartCount < 1){ //capped at 1
        heartCount++; 
      }
    }
  }
  
  //laser
  for (let i = 0; i < lasers.length; i++) {
    if (lasers[i].x == p.x && lasers[i].y == p.y) {
      lasers[i].remove();
      heartCount--;
      if (heartCount < 0){
        return true;
      }
    }
  }
  //laser2
  for (let i = 0; i < lasers2.length; i++) {
    if (lasers2[i].x == p.x && lasers2[i].y == p.y) {
      lasers2[i].remove();
      heartCount--;
      if (heartCount < 0){
        return true;
      }
    }
  }
  //enemies
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x == p.x && enemies[i].y == p.y) {
      enemies[i].remove();
      heartCount--;
      if (heartCount < 0){
        return true;
      }
    }
  }
  //nukes
  for (let i = 0; i < nukes.length; i++) {
    if (nukes[i].x == p.x && nukes[i].y == p.y) {
      nukes[i].remove();
      explosion();
    }
  }
 
  return false;
}

function explosion(){ //clears all obstacles and enemies on board
  for (let i = 0; i < height(); i++){ //iterate row by row
    for (let j = 0; j < width(); j++){ //iterate col by col
      let cur = getTile(j,i);
      for (let k = 0; k< cur.length; k++){
        if (cur[k].type == obstacle || cur[k].type == enemy || cur[k].type == enemy2){
          cur[k].remove();
          addSprite(j,i, dead);
        }
      }
      
    }
    
  }
}

function updateDisplay(){
  clearText(); //remove prev text
  addText(" " + ammoCount, {x: 16, y: 13, color: color`6`});
  addText(" " + count, {x: 15, y: 15, color: color`1`});
  addText(" " + heartCount, {x: 16, y: 11, color: color`3`});

  
  
  
}

var gameRunning = true;
function gameTick() { //replaced gameloop
  despawnObstacles();
  moveObstacles();
  moveBullets();
  spawnObstacle();
  spawnAmmo();
  spawnHeart();
  spawnNuke();
  spawnEnemy();
  spawnEnemy2();
  updateDisplay();
  count++;

  if (count == 20) {
    clearInterval(gameLoop);
    gameLoop = setInterval(gameTick, 300); //increase speed
  }

  if (count == 60) {
    clearInterval(gameLoop);
    gameLoop = setInterval(gameTick, 200); //increase speed
  }
  if (count == 300) {
    clearInterval(gameLoop);
    gameLoop = setInterval(gameTick, 150); //increase speed
  }
  if (count == 600) {
    clearInterval(gameLoop);
    gameLoop = setInterval(gameTick, 100); //increase speed
  }
  
  

  if (checkHit()) {
    let p = getFirst(player);
    addSprite(p.x, p.y, dead);
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Score: " + count, {x: 5, y: 8, color: color`3`});
    
  }
}

let gameLoop = setInterval(gameTick, 500); 