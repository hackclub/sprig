/*
@title: Bert Blaster
@author: Waterbyte
@tags: ['endless']
@addedOn: 2022-11-05
*/

const grass1 = "a";
const grass2 = "b";
const player = "c";
const enemy = "d";
const obstacle = "e";
const dirt1 = "f";
const dirt2 = "g";
const heaven1 = "h";
const heaven2 = "i";
const bullet = "j";

const gamebeat = tune`
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871,
48.38709677419355: f5~48.38709677419355,
96.7741935483871`;

const singleMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`;
const mapWidth = 10;

setMap(singleMap);

setLegend(
  [
    player,
    bitmap`
................
.....88888......
....2333333.....
...232888888....
...222880808....
...228888888....
....28888888....
....2.888888....
.......8888.....
........8.......
......0000000...
......C.0.8.....
......88888.....
........8.......
.......888......
.......8.8......`,
  ],
  [
    bullet,
    bitmap`
................
................
................
................
................
................
................
................
................
..........0.....
...0.0.00000....
..........0.....
................
................
................
................`,
  ],
  [
    enemy,
    bitmap`
................
................
.........CCC....
.......CCCCC....
......CCCCC.....
.....888888.....
.....808808.....
.....888888.....
.......88.......
...4444444444...
...4444444444...
...44.4444.44...
...88.4444.88...
...88.4444.88...
......4444......
................`,
  ],
  [
    obstacle,
    bitmap`
................
......CCCC......
......C88C......
......C88C......
......C55C......
.....CC55CC.....
....55555555....
....55555555....
....55555555....
....55555555....
....85555558....
.....555555.....
.....555555.....
......8..8......
......0..0......
................`,
  ],
  [
    grass1,
    bitmap`
................
................
................
................
................
................
................
................
.....4D...D4....
.....4D.D.D4..D.
..DD.DD.D4DD.4D.
DD4D.DD4D4DD.4D.
DD4D4DD4DDDDD4DD
D44D4DD4D4D4D4DD
DD4DDD44D4D4DDDD
DD4D444DD4D4DDDD`,
  ],
  [
    grass2,
    bitmap`
................
................
................
................
................
................
................
................
................
........4...4...
..D4...D4..D4...
.D4D..4D4.DDDDD.
D4DDD.4D4DDDDDD.
D4DDD44DDDDD4D4.
D4D4D44DDD44DD44
44D4D44DD4D4DD44`,
  ],
  [
    dirt1,
    bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
CCCCCC1CCCCCCCCC
CCCCCCCCCCCC1CCC
CCC1CC1CCCCCCCCC
C111CCCCCCCCCCCC
CCCCCC1CC11CCCCC
CCCCCC1CCCCCCCCC
CCCCCC1CCCCCCCCC
CCCCC111CCCCCCCC
CCCCC1C1CCCCCCCC
CC11CCCCCCCC111C
CCCCCCCCCCCC1CCC
CCCCCCCCCCCCCCCC`,
  ],
  [
    dirt2,
    bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
C1CCCCCCCC1CCCCC
CCCCC2222CCCCCCC
CCCCCC22CCCCCC1C
CC1CC2222CCCCCCC
CCCCCC22CCCCCCCC
CCCCCCCCCCCCCCCC
CCCC222C222CCCCC
CCCC2CCCCC2CC1CC
CC1CC22C22CCCCCC
CCCCC2CCC2CCCCCC
C11CCCC2CCCC11CC
CCCCCCC2CCCCCCCC`,
  ],
  [
    heaven1,
    bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`,
  ],
  [
    heaven2,
    bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777222777777
7777772222277777
7777772222277777
7777222222222777
7772222222222277
7772222222222277
7777777777777777
7777777777777777
7777777777777777
7777777777777777`,
  ],
);

let intervals = [];
let gameScore = 1;
let obstacleExists = false;
let gameScoreMultipliciator = 1.1;
let justlost = false;


function setup() {
  addSprite(1, 6, player);

  for (let x = 0; x < 10; ++x) {
    populateRandomized(x, 7, [...repeat(80, dirt1), ...repeat(20, dirt2)]);
    populateRandomized(x, 6, [...repeat(5, grass1), ...repeat(5, grass2)]);
    populateRandomized(x, 6, [heaven1]);
    
    for (let y = 0; y < 6; ++y) {
      populateRandomized(x, y, [...repeat(95, heaven1), ...repeat(5, heaven2)]);
    }
  }
  setupPreStartText();

  onInput("w", onInputW);
  onInput("l", pleka);
  onInput("j", gameOver);
}

function setupPreStartText(){
    addText("Bert Blaster", {
    x: 4,
    y: 5,
    color: color`5`,
  });
  addText("Press W to start!", {
    x: 2,
    y: 7,
    color: color`L`,
  });
}

function addGameOverText(){
    addText("Game Over", {
    x: 5,
    y: 4,
    color: color`3`,
  });
  addText(`Score: ${gameScore.toFixed(0)}`, {
    x: 5,
    y: 6,
    color: color`L`,
  });
    addText("Press W!", {
    x: 5,
    y: 8,
    color: color`L`,
  });
  
}

function gameOver(){
justlost = true;
 if(running){
  stop()
  addGameOverText()
 }
}

function start() {
  clearText();
  running = true;
  animateToLeft([...getAll(grass1), ...getAll(grass2)]);
  animateToLeft([...getAll(dirt1), ...getAll(dirt2)]);
  setupGamescoreInterval();
  setupEgger();
}

function reset(){
clearText();
gameScore = 1;
obstacleExists = false;
deleteFirstSprite(bullet);
deleteFirstSprite(obstacle);
deleteFirstSprite(player);
setupPreStartText();
addSprite(1, 6, player);
addSprite(6, 6, obstacle);


}


function stop() {
  // console.log('game stopped');
  running = false;
  intervals.forEach((interval) => clearInterval(interval));
}

var running = false;

function onInputW() {
  if (running) return jump();
if(justlost){
reset();
justlost = false;
return;

}
  start();

}

function populateRandomized(x, y, sprites) {
  addSprite(x, y, sprites[Math.floor(Math.random() * sprites.length)]);
}

function repeat(count, obj) {
  const result = [];
  for (var i = 0; i < count; ++i) {
    result.push(obj);
  }
  return result;
}

//setSolids([player, obstacle, enemy])
function jump() {
  if (getFirst(player).y < 6) return;
  getFirst(player).y -= 1;
  setTimeout(() => getFirst(player).y += 1, 1000);
}

function animateToLeft(sprites) {
  const interval = setInterval(() => {
    sprites.forEach((sprite) => {
      
      sprite.x = sprite.x == 0 ? 9 : sprite.x - 1;
    });
  }, 200);
  intervals = [...intervals, interval];
}


function setupGamescoreInterval(){
  const interval = setInterval(()=> {
    
    gameScore*= gameScoreMultipliciator;
    // console.log(gameScore.toFixed(0));
    
    
  },500);
  intervals = [...intervals, interval]
}


var eggerInterval;
function setupEgger() {
   addSprite(6, 6, obstacle);
   obstacleExists = true;


  eggerInterval = setInterval(() => {
if(getFirst(obstacle)!=undefined){
    if (getFirst(obstacle).x == 2 && getFirst(player).y == 6) {
      gameOver();
    }
     if (getFirst(obstacle).x == 1) {
      getFirst(obstacle).x = 5;
    }
    getFirst(obstacle).x -= 1;
}

// console.log("running");



  }, 500);

 let eggerSpawnCheckInterval = setInterval(() => {
    if(!obstacleExists){
addSprite(6, 6, obstacle);
obstacleExists = true;

  }   
  },4000);

  intervals = [...intervals, eggerInterval, eggerSpawnCheckInterval];
}



function pleka() {
  if (getAll(bullet).length > 0) {// if a bullet already exists -> exit
    return;
  }
  if(getFirst(player).y == 5){
    return;
  }

  addSprite(2, 6, bullet);// init sprite location on player position
  let intervaltime = 300;
  moveBulletToNextTile(getFirst(bullet).x, bullet, intervaltime);
}

function moveBulletToNextTile(cposition, bobject, intervaltime) {
  if (cposition == 8) {
    deleteFirstSprite(bullet);
    return;
  }

  if (getAll(obstacle).length != 0) {
    if (cposition >= getFirst(obstacle).x) {
      deleteFirstSprite(bullet);
      deleteFirstSprite(obstacle);
      obstacleExists = false;
      return;
    }
  }
  setTimeout(() => {
    getFirst(bullet).x += 1;
    moveBulletToNextTile(getFirst(bobject).x, bobject, intervaltime);
  }, intervaltime);
}

function deleteFirstSprite(spriteToDel) {
if(getFirst(spriteToDel) != undefined){
  getFirst(spriteToDel).x = 0;
  getFirst(spriteToDel).y = 0;
  clearTile(0, 0);
  addSprite(0, 0, heaven1);
}

}

setup();
