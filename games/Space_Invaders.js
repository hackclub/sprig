/*
@title: OG Space Invaders
@author: Atharva Malik
@tags: ['real-time','action']
@addedOn: 2024-07-11

Controls:
[W]: Shoot
[A]: Move Left
[S]: Move Right

[J]: Navigate the UI
*/

const player = "p"
const cEnemy = "c"
const rEnemy = "r"
const eEnemy = "e"
const bullet = "b"
const eBullet = "q"

let numOfEnemies = 35;
let gameOver = false;
let gameHasStarted = false;
let lost = false;

setLegend(
  [ player, bitmap`
................
........0.......
.......0.0......
.......0.0......
......0.5.0.....
......05550.....
....000.5.000...
...003..9..300..
..00...343...00.
..06..33933..60.
..06.3334333.60.
..0..0009000..0.
..09.0.040.0.90.
..0.0..090..0.0.
..00...040...00.
........0.......` ],
  [ cEnemy, bitmap`
....44444444....
...4444444444...
..444244442444..
.44444444444444.
4444444444444444
.444444444444444
....44222244....
....44222244....
..444422224444..
..444422224444..
......4444......
......4444......
................
................
................
................` ],
  [ rEnemy, bitmap`
666..........666
..66........66..
...66......66...
..666666666666..
..666666666666..
.66626666662666.
6666666666666666
.66666666666666.
..666666666666..
..666666666666..
..666......666..
..6..........6..
..6..........6..
................
................
................` ],
  [ eEnemy, bitmap`
................
................
................
................
....33333333....
...3333333333...
..333233332333..
..333323323333..
..333333333333..
...3333333333...
..33...33...33..
...33......33...
................
................
................
................` ],
  [ bullet, bitmap`
.......666......
.......666......
.......666......
.......666......
.......666......
.......666......
.......666......
.......666......
................
................
................
................
................
................
................
................` ],
  [ eBullet, bitmap`
................
................
................
................
................
................
................
................
.......333......
.......333......
.......333......
.......333......
.......333......
.......333......
.......333......
.......333......`]
)

let level = 1
const levels = [
  map`
.....
.....
.....
..p..`,
  map`
ccccccc
ccccccc
ccccccc
ccccccc
ccccccc
.......
.......
...p...`,
  map`
rrrrrrr
rrrrrrr
ccccccc
ccccccc
ccccccc
.......
.......
...p...`,
  map`
eeeeeee
rrrrrrr
rrrrrrr
ccccccc
ccccccc
.......
.......
...p...`,
]

function shoot(xLoc){
  addSprite(xLoc, getFirst(player).y, bullet);
}

function eShoot(xLoc, yLoc){
  addSprite(xLoc, yLoc, eBullet);
}

function shootUpdate(){
  if (getAll(bullet).length > 0) {
    for (let proj of getAll(bullet)){
      proj.y -= 1;
      if (getTile(proj.x, proj.y).length > 1) {
        let a = getTile(proj.x, proj.y)[0]['_type']
        let b = getTile(proj.x, proj.y)[1]['_type']
        for (let letter of ["c", "r", "e"]){
          if (a == letter || b == letter)
            numOfEnemies--;
        }
        for (let stuff of getTile(proj.x, proj.y)){
          stuff.remove();
        }
        proj.remove();
        return;
      }
      if (proj.y == 0){proj.remove();}
    }
  }
}

function enemyShootUpdate(){
  if (getAll(eBullet).length > 0) {
    for (let proj of getAll(eBullet)){
      proj.y += 1;
      if (getTile(proj.x, proj.y).length > 1) {
        let a = getTile(proj.x, proj.y)[0]['_type']
        let b = getTile(proj.x, proj.y)[1]['_type']
        if (a == "p" || b == "p"){
          proj.remove();
          lost = true;
        }
        return;
      }
      if (proj.y == 7){proj.remove();}
    }
  }
}

function isGameOver(){
  if (lost){
    setLevel(0, "You lost!", 'Press J to restart');
    gameOver = false;
    gameHasStarted = false;
    lost = false;
  }
  if (numOfEnemies<=0){
    numOfEnemies = 35;
    gameOver = true;
  }
  if (gameOver){
    level++;
    if (level == levels.length){
      level = 1;
      setLevel(0, "You beat the game!", 'Press J to restart');
    }else
      setLevel(0, "You finished level" + (level-1).toString(), 'Press J to continue');
    gameOver = false;
    gameHasStarted = false;
  }
}

function resetGame(){
  if (gameOver){
    level++;
    if (level == levels.length){
      level = 1;
      setLevel(0, "You beat the game!", 'Press J to restart');
    }else
      setLevel(0, "You finished level" + (level-1).toString(), 'Press J to continue');
    gameOver = false;
    gameHasStarted = false;
  }
}

function randint(max) {
  return Math.floor(Math.random() * max);
}

function enemyShoot(){
  for (let enemy of getAll(cEnemy)){
    if (randint(1000) > 990){
      eShoot(enemy.x, enemy.y)
    }
  }
  for (let enemy of getAll(rEnemy)){
    if (randint(1000) > 975){
      eShoot(enemy.x, enemy.y)
    }
  }
  for (let enemy of getAll(eEnemy)){
    if (randint(1000) > 950){
      eShoot(enemy.x, enemy.y)
    }
  }
}

function gameUpdateFun(){
  
}

function setLevel(l, text1, text2){
  clearText();
  setMap(levels[l])
  if (text1!=""){
    addText(text1, {
      x: 1,
      y: 1,
      color: color`3`
    })
  }
  if (text2!=""){
    addText(text2, {
      x: 1,
      y: 4,
      color: color`7`
    })
  }
}

setLevel(0, `Press "J" to start!`, ``)

let shootUpdateInt = setInterval(shootUpdate, 200);
let enemyShootInt = setInterval(enemyShoot, 200);
let enemyShootUpdateInt = setInterval(enemyShootUpdate, 200);
let gameUpdate = setInterval(isGameOver, 10);

onInput("w", () => {
  if (gameHasStarted)
    shoot(getFirst(player).x);
})
onInput("a", () => {
  if (gameHasStarted)
    getFirst(player).x -= 1
})
onInput("d", () => {
  if (gameHasStarted)
    getFirst(player).x += 1
})
onInput("j", () => {
  if(!gameHasStarted){
    gameHasStarted = true;
    setLevel(level, "", "");
  }
  if (gameOver){
    resetGame()
  }
})
