/*
@title: A_Really_One_Sided_Duel
@author: Saatwik Das
@tags: ['endless']
@addedOn: 2022-12-28
*/


//You have been hired as the final effort of your country to defend against the incoming forces.
//However, you have no more allies, and there is a meteor shower warning. I wouldn't worry about that though.

//(Optional below. You'll learn as you play)
//The level wraps around, you can only have one projectile on the feild, 
//the enemy respawns after you hit them, 
//enemy projectiles dissappear after you hit the enemy, 
//the enemy moves once their projectiles hit the ground, 
//enemy projectiles that hit the ground lower your life,
//anything that hits the player is an instant loss,
//and HP only goes down after the enemy moves.
//Good Luck!




const player = "p";
const obstacle = "o";
const enemy = "e";
const aProjectile = "a";
const gProjectile = "g";
const menuLine = "l";
const aModePlayer = "r";
const trophy = "t";


setLegend(
  [obstacle, bitmap`
.......66.......
........6.......
.....66.6.6.....
....66.66.66....
....666666.6....
...6699999966...
...69999999966..
..669999999996..
..669933339996..
..699333333996..
..699333333996..
...69333333996..
...69333333996..
...6993333996...
....66999996....
.....666666.....`],
  [player, bitmap`
................
................
................
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.000.0.....
....0.....0.....
.....00000......
.......0........
.....00000......
.......0........
.......0........
......0.0.......
.....0...0......`],
  [enemy, bitmap`
...0000000000...
...0..0..0..0...
...0...00...0...
...0..0..0..0...
...0........0...
...0........0...
...0..0000..0...
...0.0....0.0...
...0000000000...
.......0........
.....00000......
.......0........
.......0........
......000.......
.....00.00......
.....0...0......`],
  [aProjectile, bitmap`
......L.L.L.....
......L.L.L.....
......L.L.L.....
................
.....3333333....
.....3....33....
.....3....33....
.....3....33....
.....3....33....
.....3....33....
.....3....33....
.....3....33....
.....33..333....
......33333.....
.......333......
........3.......`],
  [gProjectile, bitmap`
.......D........
......DDD.......
.....DDDDD......
....DDD..DD.....
....DD....D.....
....DD....D.....
....DD....D.....
....DD....D.....
....DD....D.....
....DD....D.....
....DD....D.....
....DDDDDDD.....
................
.....L.L.L......
.....L.L.L......
.....L.L.L......`],
  [menuLine, bitmap`
0000000000000000
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
  [aModePlayer, bitmap`
................
................
................
................
........00000...
.0...0.0.....0..
..0..0.0.0.0.0..
...00000.0...0..
..0..0.0.0.0.0..
.0...0.0.....0..
........00000...
................
................
................
................
................`],
  [trophy, bitmap`
................
...6666666666...
....66666666....
.66666666666666.
.6..66666666..6.
.6..66666666..6.
.6..66666666..6.
.6..66666666..6.
..666666666666..
....66666666....
.....666666.....
......6666......
......6666......
......6666......
.....666666.....
....66666666....`]
)

//Initial Menu
setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`)
addText("DUEL!!", {
      x: 7,
      y: 1,
      color: color`6`
  });
  addText("You get a point\nwhen you hit\nyour enemy.", {
      x: 1,
      y: 3,
      color: color`4`
  });
addText("\nGet 10 points\nto win!\n\n", {
      x: 1,
      y: 5,
      color: color`9`
  });
  addText("You can only\nshoot in attack\nmode,but you\ncan't move in\nattack mode.\n\n", {
      x: 1,
      y: 8,
      color: color`3`
  });
  
  addText("Press \"l\"\nfor controls", {
      x: 1,
      y: 14,
      color: color`7`
  });
// Create Global Variables
var gameRunning = false; 
var speed = 300;
var score = 0;
var menu = true;
var life = 10;
var control = false;
var count = 0;
var win = false;
var endCheck = false;
var despawnCount = 0;

// START - PLAYER MOVEMENT CONTROLS

onInput("l", () => {
  if (menu == true && !gameRunning) {
    clearText();
    menu = false;
    control = true;
    setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
    addText("CONTROLS", {
      x: 5,
      y: 1,
      color: color`6`
  });
    addText("Use \"a\" and \"d\"\nto move", {
      x: 1,
      y: 3,
      color: color`4`
  });
    addText("\nPress \"w\" to go\ninto attack mode\nPress \"s\" to revert", {
      x: 1,
      y: 5,
      color: color`9`
  });
    addText("\n\nPress \"j\" to shoot\nwhen in attack mode", {
      x: 1,
      y: 8,
      color: color`3`
  });
    addText("\nPress \"l\"\nto go back", {
      x: 1,
      y: 12,
      color: color`7`
  });
    addText("Press \"k\" to start", {
      x: 1,
      y: 15,
      color: color`D`
    });
  }else if(control == true && !gameRunning || !gameRunning){
    menu = true;
    control = false;
    clearText();
    setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`)
addText("DUEL!!", {
      x: 7,
      y: 1,
      color: color`6`
  });
  addText("You get a point\nwhen you hit\nyour enemy.", {
      x: 1,
      y: 3,
      color: color`4`
  });
addText("\nGet 10 points\nto win!\n\n", {
      x: 1,
      y: 5,
      color: color`9`
  });
  addText("You can only\nshoot in attack\nmode,but you\ncan't move in\nattack mode.\n\n", {
      x: 1,
      y: 8,
      color: color`3`
  });
  
  addText("Press \"l\"\nfor controls", {
      x: 1,
      y: 14,
      color: color`7`
  });
  }
});

onInput("a", () => {
  let p = getFirst(player)
  if(getAll(player)!=0 && gameRunning && p.x == 0){
    p.x = width()-1;
  } else if (gameRunning && getAll(player)!=0) {
    getFirst(player).x -= 1;
  } else if (win && getAll(player)!=0) {
    getFirst(player).x -= 1;
  }
  
  if (checkHit()) {
    lose();
  }
});

onInput("d", () => {
  let p = getFirst(player)
  if(getAll(player)!=0 && gameRunning && p.x == width()-1) {
    p.x = 0;
  }else if (gameRunning && getAll(player)!=0) {
    getFirst(player).x += 1;
  }else if (win && getAll(player)!=0) {
    getFirst(player).x += 1;
  }
  if (checkHit()) {
    lose();
  }
});

onInput("j", () => {
  if ((gameRunning || win) && getAll(gProjectile) == 0 && getAll(player)==0) {
    let obstacles = getAll(obstacle);
    let p = getFirst(aModePlayer);
    let x = p.x;
    let y = 6;
    addSprite(x,y,gProjectile);
    count += 1;
  }else if(getAll(gProjectile) != 0 && getAll(aModePlayer) !=0){
    let gP = getFirst(gProjectile);
    gP.remove();
    let p = getFirst(aModePlayer);
    let x = p.x;
    let y = 6;
    addSprite(x,y,gProjectile);
    count += 1;
  }
});

onInput("k", () => {
  if (!gameRunning) {
    clearText();
    endCheck = false;
    menu = false
    control = false;
    win = false;
    score = 0;
    life = 10;
    count = 0;
    setMap(map`
.........
.........
.........
.........
.........
.........
.........
....p....
lllllllll`);
    gameRunning = true;
    gameLoop();
  }
});

onInput("w", () => {
  let p = getFirst(player);
  if (gameRunning && getAll(player)!=0) {
    let x = p.x;
    let y = p.y;
    p.remove();
    addSprite(x,y,aModePlayer);
  }else if(win){
    p.y-=1
  }
});

onInput("s", () => {
  let p = getFirst(player);
  if (gameRunning  && getAll(aModePlayer)!=0) {
    let ap = getFirst(aModePlayer);
    let x = ap.x;
    let y = ap.y;
    ap.remove();
    addSprite(x,y,player);
  }else if(win){
    p.y+=1
  }
});


// END - PLAYER MOVEMENT CONTROLS

// Put obstacle in a random position

function spawnObstacle() {
  let check = Math.floor(Math.random()*5)
  if(check != 3){
    let x = Math.floor(Math.random() * width());
    let y = 1; 
    addSprite(x, y, obstacle);
  }
}

// Make obstacles move
function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

// Make obstacles disappear
function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == height()-2) {
     obstacles[i].remove();
   }
  }
}

// See if the either mode of the player was hit
function checkHit() {
  if(getAll(player) != 0 && !win){
    let obstacles = getAll(obstacle);
    let eP = getFirst(aProjectile);
    let p = getFirst(player);
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
        return true;
      }
    }
    if(getAll(aProjectile) != 0 ){
      if(eP.x == p.x && eP.y == p.y){
        return true;
      }
    }
  }
  return false;
}
function checkAttackModeHit(){
  if(getAll(aModePlayer) != 0){
    let obstacles = getAll(obstacle);
    let eP = getFirst(aProjectile);
    let p = getFirst(aModePlayer);
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
        return true;
      }
    }
    if(getAll(aProjectile) != 0 ){
      if(eP.x == p.x && eP.y == p.y){
        return true;
      }
    }
  }
  return false;
}
//Lose Function
function lose(){
  let misses = count-score;
  clearInterval(gameLoop);
  gameRunning = false;
  clearText();
  setMap(map`
..........
..oooooo..
..........
.e......e.
.a......a.
..........
..........
..........`)
  addText("Game Over!", {
      x: 5,
      y: 5,
      color: color`3`
  });
  addText(`\nHP: ${life}`, {
        x: 5,
        y: 6,
        color: color`9`
    });
  addText(`\nScore: ${score}`, {
        x: 5,
        y: 7,
        color: color`9`
    });
  addText(`\nMisses: ${misses}`, {
        x: 5,
        y: 8,
        color: color`9`
    });
  addText("\nPress \"k\"", {
      x: 5,
      y: 10,
      color: color`4`
  });
  addText("\nto Retry", {
      x: 5,
      y: 11,
      color: color`4`
  });
  addText("\n\n\nPress \"l\" to go \nback to the menu", {
      x: 2,
      y: 11,
      color: color`7`
  });
}
//Spawns enemy and bullet. Removes enemy and bullet as well

function enemyGen(){
  let x = Math.floor(Math.random() * width());
  let y = 0;
  let obstacles = getAll(obstacle);
  if(endCheck == false){
  if(getAll(aProjectile) == 0){
    addSprite(x,y,aProjectile);
    addSprite(x,y,enemy)
  }
  let eP = getFirst(aProjectile);
  let e = getFirst(enemy);
  for (let i = 0; i < obstacles.length; i++) {
    if(eP.x == obstacles[i].x && eP.y == obstacles[i].y){
      obstacles[i].remove();
    }
  }
  eP.y+=1;
  if(eP.y==8){
    eP.remove();
    //e.remove();
    endCheck = true;
  }
  }
}
function despawnEnemy(){
  if(getAll(aProjectile) == 0){
    despawnCount++;
    let ap = getFirst(aProjectile);
    let e = getFirst(enemy);
    if(endCheck == true && despawnCount%2 ==0){
      let x = Math.floor(Math.random() * width());
      let y = 0;
      endCheck = false;
      e.remove();
      addSprite(x,y,aProjectile);
      addSprite(x,y,enemy)
      life-=1;
    }
  }
}

//Moves player projectile
function moveProjectile(){
  if(getAll(gProjectile) != 0){
    let gP = getFirst(gProjectile);
    gP.y-=2;
  }
  if(getAll(gProjectile) != 0 && getAll(enemy)!=0){
    let p = getFirst(gProjectile);
    let eP = getFirst(aProjectile);
    let e = getFirst(enemy);
    if (e.x == p.x && e.y == p.y) {
      if(getAll(aProjectile)!=0){
        eP.remove();
      }
      endCheck = false;
      e.remove();
      score+=1;
    }
  }
}

//removes player projectile
function removeProjectile(){
  if(getAll(gProjectile) != 0){
    let gP = getFirst(gProjectile);
    if(gP.y==0){
      gP.remove();
    }
  }
}

function checkScore(){
  if(getAll(gProjectile)!=0 && getAll(enemy)!=0 && getAll(aProjectile)!=0){
    let p = getFirst(gProjectile);
    let e = getFirst(enemy);
    let eP = getFirst(aProjectile)

    if (e.x == p.x && e.y == p.y) {
      endCheck =false;
      e.remove();
      eP.remove();
      score+=1;
    }
  }
}



function checkWin(){
  if(score==10){
    win = true;
    
    setMap(map`
...........
...........
...........
...........
...........
.....p.....
....gtg....
....ttt....
...ttttt...`)
    let misses = count-score;
    clearInterval(gameLoop);
    gameRunning = false;
    clearText();
    addText("You Win!!!", {
        x: 5,
        y: 3,
        color: color`D`
    });
    addText(`HP: ${life}`, {
        x: 5,
        y: 4,
        color: color`5`
    });
    addText(`Misses: ${misses}`, {
        x: 5,
        y: 5,
        color: color`9`
    });
    addText("Press \"k\"", {
        x: 5,
        y: 7,
        color: color`4`
    });
    addText("to Play Again", {
        x: 3,
        y: 8,
        color: color`4`
    });
    if(life == 10 && misses == 0){
      setMap(map`
.....p.....
...........
...........
...........
...........
...gotog...
..gotttog..
.gotttttog.
gotttttttog`)
      addText("Perfect Score", {
        x: 3,
        y: 3,
        color: color`6`
    });
    }
  }
}
function gameLoop() {
  if(gameRunning){
    clearText();
    addText(`Score: ${score}`, {x: 9, y: 15,color: color`6`})
    addText(`HP: ${life}`, {x: 2, y: 15,color: color`5`})
    checkScore();
    despawnEnemy();
    enemyGen();
    despawnObstacles();
    moveObstacles();
    spawnObstacle();
    removeProjectile();
    moveProjectile();
    checkWin();
    if(life == 0){
      lose();
    }
    if (checkHit() || checkAttackModeHit()) {
      lose();
    }
  }
  if (gameRunning) {
    setTimeout(gameLoop, speed);
  }
}

