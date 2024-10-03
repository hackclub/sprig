
/* 
@title: fire_boom
@author: Samarpan
@tags: ['action']
@addedOn: 2023-09-25
*/

    const player = "p";
const fire = "f";
const water = "w";
const explode = "e";

setLegend(
  [ player, bitmap`
...1..CCCC......
...1..CCCC......
..11.CCCCCC.....
..66..0909......
..66..LLLL......
..66..LLLL......
..CCCCC66CCCC...
..CCCCC66CCCC...
.....CC66CC66...
.....CC66CC66...
.....11LL1199...
.....77777799...
.....77..77.....
.....77..77.....
.....77..77.....
.....00..00.....` ],
  [ fire, bitmap`
................
................
................
.......99.......
......9999......
......9999......
.....969969.....
....99699999....
....96996969....
....99969969....
....99699699....
.....999999.....
................
................
................
................` ],
    [ water, bitmap`
................
................
................
......7777......
.....777777.....
....77577777....
....75575757....
....75777757....
....77757577....
.....777777.....
......7777......
.......77.......
................
................
................
................`],
  [ explode, bitmap`
................
................
................
.....9777799....
....79765576....
...795777797....
...5657976759...
...7975756977...
...776976579....
....7975757.....
......7697......
................
................
................
................
................`]
  
)

setSolids([])

let level = 0
const levels = [
  map`
......
......
......
......
......
.p....`
]

var gameRunning = true; 

setMap(levels[level])



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

let lastShotTime = 0;

function spawnwater() {
  let currentTime = Date.now();
  let timeSinceLastShot = currentTime - lastShotTime;
  
  // Define your cooldown time in milliseconds (e.g., 1000 milliseconds = 1 second)
  let cooldownTime = 2500;

  if (gameRunning && timeSinceLastShot >= cooldownTime) {
    let x = getFirst(player).x;
    let y = 4; // Adjust the initial Y position as needed
    addSprite(x, y, water);

    // Update the last shot time
    lastShotTime = currentTime;
  }
}

function movewater() {
  let waterSprites = getAll(water);

  for (let i = 0; i < waterSprites.length; i++) {
    waterSprites[i].y -= 1; // Move the water sprites upward
  }
}

function despawnWater() {
  let waterSprites = getAll(water);

  for (let i = 0; i < waterSprites.length; i++) {
    if (waterSprites[i].y <= 0) {
      waterSprites[i].remove();
    }
  }
}

onInput("w", () => {
  if (gameRunning) {
    spawnwater();
  }
});

// Call movewater() continuously within a game loop
var gameLoop = setInterval(() => {
  if (gameRunning) {
    movewater();
    let waterSprites = getAll(water);
  let fireSprites = getAll(fire);

  for (let i = 0; i < waterSprites.length; i++) {
    for (let j = 0; j < fireSprites.length; j++) {
      if (
        waterSprites[i].x === fireSprites[j].x &&
        waterSprites[i].y === fireSprites[j].y
      ) {
        spawnExplosion(waterSprites[i].x, waterSprites[i].y);
        waterSprites[i].remove();
        fireSprites[j].remove();
      }
    }
  }
  }
  despawnWater();
}, 1000); // Adjust the interval as needed (controls the speed of movement)


function spawnExplosion(x, y) {
  addSprite(x, y, explode);
  setTimeout(() => {
    let explosions = getAll(explode);
    for (let i = 0; i < explosions.length; i++) {
      explosions[i].remove();
    }
  }, 500); // Adjust the explosion duration (milliseconds)
}




function spawnfire() {
  let x = Math.floor(Math.random() * 6);
  let y = 0; 
  addSprite(x, y, fire);
}

function movefire() {
  let obstacles = getAll(fire);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

function despawnfire() {
  let obstacles = getAll(fire);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 5) {
     obstacles[i].remove();
   }
  }
}


function checkHit() {
  // Step 3 - Fix code
  let fires = getAll(fire);
  let p = getFirst(player);

  for (let i = 0; i < fires.length; i++) {
    if (fires[i].x === p.x && fires[i].y === p.y) {
      return true;
    }
  }

  return false;
}

let startTime = Date.now();
let elapsedTime = 0;
let timerInterval;

// Start the game timer when the game begins
startTimer();

function startTimer() {
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  }, 1000);
}


var gameLoop = setInterval(() => {
  // console.log("Game loop is running");
  // Step 4 - Add all game functions
despawnfire();
  movefire();
  spawnfire();

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over in \n" + elapsedTime + " sec.", {
      x: 5,
      y: 6,
      color: color`0`
    });
  }

}, 1000);
