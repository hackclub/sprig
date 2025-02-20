/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Highway Splits
@author: jazxtech |OPHS STEAM Society|
@tags: []
@addedOn: 2024-00-00
*/

// S
const playerCar = "p";
const road = "r";
const roadMedian = "m";
const rightroadLine = "q";
const leftroadLine = "e";
const trafficCar = "t";
const coin = "c";
const grass = "g";
const medianrail = "l";
const maxAttempts = 50;
let gameRunning = true;


setLegend(
  [ playerCar, bitmap`
.......636......
......33333.....
......32323.....
....033232330...
....031232130...
.....3L030L3....
.....3323233....
.....0000000....
.....0000000....
.....0323230....
....033000330...
....030000030...
.....3023203....
......32323.....
......00000.....
................` ],
  [ road, bitmap`
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
  [trafficCar, bitmap`
................
......6DDD6.....
.....DDDDDDD....
....0DDDDDDD0...
....0DDDDDDD0...
....0DLLLLLD0...
....DLLLLLLLD...
.....DDDDDDD....
.....LDDDDDL....
.....LDDDDDL....
.....DDDDDDD....
....0LDDDDDL0...
....0LDDDDDL0...
....0DDDDDDD0...
.....D33D33D....
................`],
  [coin, bitmap`
................
................
................
.......00.......
......0660......
.....0266F0.....
....02666FF0....
....02666FF0....
....02666FF0....
....0666FFF0....
.....066FF0.....
......06F0......
.......00.......
................
................
................`],
  [roadMedian, bitmap`
1111111111111121
1111111111111121
1111111111111121
1111111111111121
1111111111111121
1111111111111111
1111111111111111
1111111111111111
1111111111111121
1111111111111121
1111111111111121
1111111111111121
1111111111111121
1111111111111111
1111111111111111
1111111111111111`],
  [rightroadLine, bitmap`
1166111111111121
1166111111111121
1166111111111121
1166111111111121
1166111111111121
1166111111111111
1166111111111111
1166111111111121
1166111111111121
1166111111111121
1166111111111121
1166111111111121
1166111111111121
1166111111111111
1166111111111111
1166111111111111`],
  [leftroadLine, bitmap`
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211
1111111111112211`],
  [grass, bitmap`
1LLL0DDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLLDDDDDDDDDDDD
1LLLDDDDDDDDDDDD
1LLLDDDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLLDDDDDDDDDDDD
1LLLDDDDDDDDDDDD
1LLLDDDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLL0DDDDDDDDDDD
1LLLDDDDDDDDDDDD`],
  [medianrail,bitmap`
DDDDDDDDDDD0LLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDDDLLL1
DDDDDDDDDDDDLLL1
DDDDDDDDDDDDLLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDDDLLL1
DDDDDDDDDDDDLLL1
DDDDDDDDDDDDLLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDD0LLL1
DDDDDDDDDDDDLLL1`],
);
setSolids(
    [playerCar, grass, medianrail],
         );

setMap(map`
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg`);

// Variables

let timer = 0;
let score = 0;
let level = 1;

//Speed and spawn rates
let playerSpeed = 1; // default speed
let trafficSpeed = 200; // default speed for traffic
let trafficRate = 1000; // Initial value in how much traffic spawns
let coinSpawnRate = 2000; 


let coinInterval;

let trafficInterval;
let movetrafficInterval;
//Lists
let occupiedpos = [];
let coins = [];

// Player car
addSprite(3,6, "p");

// Traffic car functions
function spawntrafficCars() {
  let lane = Math.floor(Math.random() * 6); // Generate a random lane between 1 and 7
  if (lane === 0) {
    lane = lane + 1;
    console.error(lane);
    
  }
  if (lane === 6) {
    lane = lane - 1;
    console.error(lane)
    
  } else {
    let car = addSprite(lane, 0, trafficCar);
    if (car) {
      setTimeout(() => {
        if (car) {
          car.y += 1;
        }
      }, 250);
  } 
    else {
    console.log(lane);
  }
  }
}
function movetrafficCars() {
  const trafficCars = getAll(trafficCar);
  for (const car of trafficCars) {
    car.y += 1;
    if (car.y >= 11) {
      setTimeout( () => {
        car.remove(); }, 100);
    }}}

//Detection systems
function isOccupied(x, y) {
  return occupiedpos.some(pos => pos.x === x && pos.y === y);
}
//Collision detection
setInterval(() => {
  if (!gameRunning) return;
  
  let player = getFirst(playerCar);
  let tile = getTile(player.x, player.y);
  
  // Check for collisions with traffic cars
  if (tile.some(sprite => sprite.type === trafficCar)) {
    gameRunning = false;
    console.log("Car has crashed, game ending...");
    endgame();
  } else if (tile.some(sprite => sprite.type === coin)) {
    // Check for coin collection
    score += 10;
    console.log(`Score: ${score}`);
    updateScoreDisplay();
    tile.find(sprite => sprite.type === coin).remove();
  }
}, 100);

function updateScoreDisplay() {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: 1 });
}

//Items

function spawncoin() {
  let lane;
  let y;
  let attempts = 0;

  do {
    lane = Math.floor(Math.random() * 5) + 1;
    y = Math.floor(Math.random() * 12);
    attempts++;

  if (!isOccupied(lane, y)) {
    const coinSprite = addSprite(lane, y, coin);
    occupiedpos.push({x: lane, y: y});
    break;
  }
} while (attempts < maxAttempts);

if (attempts === maxAttempts) {
  console.log("Max attempts reached for coin.");
}}

//Ending the game
function endgame() {
  gameRunning = false; // Stop all game logic
  clearText(); // Clear any previous text

  // Screen dimensions
  const screenWidth = 15; // Update with your actual screen width
  const screenHeight = 9; // Update with your actual screen height

  // Text messages
  const gameOverText = "Crashed! Game over.";
  const scoreText = `Final Score: ${score}`;

  // Calculate center positions
  const gameOverX = Math.floor((screenWidth - gameOverText.length) + 10/ 2);
  const gameOverY = Math.floor(screenHeight / 2) + 3; // Slightly above center

  const scoreX = Math.floor((screenWidth - scoreText.length + 3) / 2);
  const scoreY = gameOverY + 3; // Below the "Game Over" text

  // Display game over text
  addText(gameOverText, {
    x: gameOverX,
    y: gameOverY,
    color: 2
  });

  // Display final score
  addText(scoreText, {
    x: scoreX,
    y: scoreY,
    color: 1
  });

  // Clear intervals to stop all movement
  clearInterval(trafficInterval);
  clearInterval(coinInterval);
  clearInterval(moveTrafficInterval);

  // Replace map with a simple game over background
  setMap(map`
lqmmmmmmmmeg
lqmmmmmmmmeg
lrrrrrrrrrrg
lrrrrrrrrrrg
lrrrrrrrrrrg
lrrrrrrrrrrg
lqmmmmmmmmeg`);
}

//Resetting the game

function resetGame() {
  console.log("Resetting the game");
  clearText()

  //Resetting variables

  gameRunning = true;
  score = 0;
  let level = 1;

  getAll(trafficCar).forEach(car => car.remove());
  getAll(coin).forEach(coin => coin.remove());
  getAll(playerCar).forEach(player => player.remove());

  setMap(map`
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg
lqmmmeg`);
  addSprite(3,6, playerCar);

  coinInterval = setInterval(spawncoin, coinSpawnRate);
  trafficInterval = setInterval(spawntrafficCars, trafficRate);
  movetrafficInterval = setInterval(movetrafficCars, trafficSpeed);

  console.log("Game reset complete.");
}


// Input controls
if (gameRunning) {
onInput("s", () => {
  getFirst(playerCar).y += playerSpeed;
});
onInput("a", () => {
  getFirst(playerCar).x -= playerSpeed;
});
onInput("d", () => {
  getFirst(playerCar).x += playerSpeed;
});
onInput("w", () => {
  getFirst(playerCar).y -= playerSpeed;
});
}

onInput("i", () => {
  if (!gameRunning) {
    resetGame();
  }})


//Function initialization
coinInterval = setInterval(spawncoin, coinSpawnRate);
trafficInterval = setInterval(spawntrafficCars, trafficRate);
moveTrafficInterval = setInterval(movetrafficCars, trafficSpeed);

//Debugging

// setInterval(() => {
//   const playerCarSprite = getFirst(playerCar);

//   if (playerCarSprite) {
//     console.log("Player Car Position - X:", playerCarSprite.x, "Y:", playerCarSprite.y);
//   } else {
//     console.log("Player car does not exist in the game!");
//   }
// }, 1000);