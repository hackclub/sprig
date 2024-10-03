/*
@title: dihydrogen_monoxide_free_fall
@author: aksel s.
@tags: ['endless']
@addedOn: 2022-11-06
*/

// FLAGS AND VARIABLES
let lives = 3;


// THE SPRITES
const player = "p"
const water = "e"
const fire = "f"

const sky = "s"
setLegend(
  [ player, bitmap`
................
................
................
.......33.......
......3773......
......3773......
.....371573.....
....37555173....
....37555573....
....37555573....
.....375573.....
......3773......
.......33.......
................
................
................`],
  [ water, bitmap`
................
................
................
................
................
.......77.......
......7517......
.....755517.....
.....755557.....
......7557......
.......77.......
................
................
................
................
................`],
  [ fire, bitmap`
................
................
.......6........
......6666......
......6336......
.....639H36.....
.....3999H3.....
.....399993.....
.....399993.....
......3993......
.......33.......
................
................
................
................
................`],
  [ sky, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

)
// THE MAP
setBackground(sky)
setMap(map`
.............
.............
.............
.............
......p......
.............
.............
.............
.............`)
// PLAYER MOVEMENT
onInput("d", () => {
  if (lives > 0) {
    getFirst(player).x +=1
  }
});

onInput("a", () => {
  if (lives > 0) {
    getFirst(player).x -=1
  }
})
//MUSIC
const hit = tune`
121.95121951219512: g5~121.95121951219512,
121.95121951219512: f5~121.95121951219512 + g5/121.95121951219512,
121.95121951219512: e5~121.95121951219512 + f5/121.95121951219512,
3536.5853658536585`;
const heal = tune`
114.94252873563218: g4~114.94252873563218,
114.94252873563218: a4^114.94252873563218,
114.94252873563218: d5~114.94252873563218,
114.94252873563218: d5~114.94252873563218,
114.94252873563218: a5~114.94252873563218 + e5^114.94252873563218,
114.94252873563218: a5~114.94252873563218,
114.94252873563218: b5^114.94252873563218,
2873.5632183908046`;
const over = tune `
241.93548387096774: g5/241.93548387096774,
241.93548387096774: a5/241.93548387096774,
241.93548387096774: b5/241.93548387096774,
241.93548387096774,
241.93548387096774: b5/241.93548387096774,
241.93548387096774,
241.93548387096774: g5/241.93548387096774,
241.93548387096774: f5/241.93548387096774,
241.93548387096774: g5/241.93548387096774,
241.93548387096774,
241.93548387096774: c5/241.93548387096774,
241.93548387096774,
241.93548387096774: a4/241.93548387096774,
241.93548387096774,
241.93548387096774: f4/241.93548387096774,
241.93548387096774,
241.93548387096774: d4/241.93548387096774,
241.93548387096774,
241.93548387096774: c4/241.93548387096774,
241.93548387096774: d4/241.93548387096774,
241.93548387096774: c4/241.93548387096774,
2661.2903225806454`;
//FUNCTIONS
function displayLivesCounter() {
  let lives_string = String(lives);
  clearText()
  addText(lives_string, {
    x: 20,
    y: 2,
    color: color`3`
  })
}
displayLivesCounter(); /* so it's on screen even before a life is lost */

function getFireSprite(overlappingSprites) {
  for (const sprite of overlappingSprites)
    if (sprite.type == fire)
      return sprite;
}
function getWaterSprite(overlappingSprites) {
  for (const sprite of overlappingSprites)
    if (sprite.type == water)
      return sprite;
}

//DAMAGE
setInterval(() => {
  //Damage
  const ouchTiles = tilesWith(player, fire);

  /* for every tile where player and fire overlap, */
  for (const fireAndPlayer of tilesWith(player, fire)) {
    playTune(hit);
    
    /* fireAndPlayer is a list of two tiles. Which one is the fire? */
    let fire = getFireSprite(fireAndPlayer);
    fire.remove();

    /* remove a life! */
    lives = lives - 1;
    
    displayLivesCounter();
    }
  }, 10);
//HEALTH
setInterval(() => {
  //Healh
  const healthTiles = tilesWith(player, fire);
  
    
  
  /* for every tile where player and fire overlap, */
  for (const waterAndPlayer of tilesWith(player, water)) {
    playTune(heal);
    
    /* fireAndPlayer is a list of two tiles. Which one is the fire? */
    let water = getWaterSprite(waterAndPlayer);
    water.remove();

    /* remove a life! */
    lives = lives + 1;
    displayLivesCounter();
    }
  }, 1);
//MORE FUNCTIONS
 function spawnFire() {
   //This function Spawns Fire at the top
  let x = Math.floor(Math.random() * 13);
  let y = 0;
  addSprite(x, y, fire);
}
function moveFire() {
  //This function moves the fire
  let fires = getAll(fire);

  for (let i = 0; i < fires.length; i++) {
    fires[i].y +=1;
  }
}
function despawnFire() {
  //This Function Despawns the fire
  let fires = getAll(fire);

  for (let i = 0; i < fires.length; i++) {
    if (fires[i].y == 8) {
      fires[i].remove();
    }}
  }
//Start
function spawnWater() {
   //This function Spawns Fire at the top
  if (lives < 3) {
    let x = Math.floor(Math.random() * 13);
    let y = 8;
    addSprite(x, y, water);
}
}
function movewater() {
  //This function moves the fire
  let waters = getAll(water);

  for (let i = 0; i < waters.length; i++) {
    waters[i].y -=1;
  }
}
function despawnWater() {
  //This Function Despawns the fire
  let waters = getAll(water);

  for (let i = 0; i < waters.length; i++) {
    if (waters[i].y == 0) {
      waters[i].remove();
    }}
  }
//Game loop to call some functions
var gameLoop = setInterval(() => {
  if (lives > 0) {
    despawnFire();
    moveFire();
    spawnFire();
    despawnWater();
    movewater();
    spawnWater();
  }
    
    if (lives == 4 ) {
      lives = lives - 1;
    }
  
  if (lives == 0) {
    
    addText("GAME OVER", {
      x: 5,
      y: 5,
      color: color`3`
    })
  }


}, 200);



