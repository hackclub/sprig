/*
@title: Dogger
@author: Boyce Dyson
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const road = "r"
const car = "c"
const grass = "g"
const water = "w"
const log = "l"

let Score = 0
let Dead = false

setLegend(
  [ player, bitmap`
................
................
................
................
................
.......1L..L1...
........LLLL....
........L0L0....
...1....LLLLL0..
..1.....LLLLL...
..L..LLLL11.....
...LLLLLLLL.....
....LLLLLLL.....
....LLLLLLL.....
....L.L.L.L.....
....L.L.L.L.....` ],
  [ car, bitmap`
................
..3333..........
..3003..........
..3003..........
..3333..........
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.3000......0003.
.00000....00000.
.00000....00000.
.00000....00000.
..000......000..
................
................`],
  [ grass, bitmap`
DDDD444444444444
DDDD444444444444
DDD44444444DDD44
DDD4444444DDDDD4
D444444444DDDDD4
44444444444DDD44
4444444444444444
4444444444444444
4444444444444444
444444DD44444444
44444DDDD4444D44
4444DDDD4444DD44
44444DDD4444DDD4
44444444444DDDD4
4444444444444444
4444444444444444`],
  [ road, bitmap`
1111111111111111
1111111111111111
1111111111111111
0000000000000000
0000000000000000
0000000000000000
0000000000000000
6660666066606660
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
    [ log, bitmap`
................
................
................
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
................
................
................`],
  [ water, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
7777777777777777
7755577777555557
5557555555577775
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7755577777555557
5557555555577775
7777777777777777
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]

)

setSolids([])

let level = 0
const levels = [
  map`
gggggggggggg
gggggggggggg
rrrrrrrrrrrr
gggggggggggg
rrrrrrrrrrrr
gggggggggggg
rrrrrrrrrrrr
gggggggggggg
gggggggggggg`,
  map`
gggggggggggg
rrrrrrrrrrrr
gggggggggggg
gggggggggggg
rrrrrrrrrrrr
rrrrrrrrrrrr
gggggggggggg
gggggggggggg
gggggggggggg`,
  map`
gggggggggggg
gggggggggggg
wwwwwwwwwwww
rrrrrrrrrrrr
gggggggggggg
wwwwwwwwwwww
gggggggggggg
gggggggggggg
gggggggggggg`,
  map`
gggggggggggg
gggggggggggg
rrrrrrrrrrrr
gggggggggggg
wwwwwwwwwwww
wwwwwwwwwwww
gggggggggggg
gggggggggggg
gggggggggggg`,
  map`
gggggggggggg
gggggggggggg
rrrrrrrrrrrr
wwwwwwwwwwww
rrrrrrrrrrrr
gggggggggggg
rrrrrrrrrrrr
gggggggggggg
gggggggggggg`
]

const MoveSound = tune`
136.36363636363637: A4~136.36363636363637,
4227.272727272728`
const DeathJingle = tune`
285.7142857142857: A4-285.7142857142857,
285.7142857142857: F4~285.7142857142857,
285.7142857142857: G4-285.7142857142857 + E4~285.7142857142857,
285.7142857142857: F4-285.7142857142857 + D4~285.7142857142857,
285.7142857142857: E4-285.7142857142857,
285.7142857142857: G4/285.7142857142857,
285.7142857142857: C4/285.7142857142857,
7142.857142857143`


setMap(levels[level])

setPushables({
  [ player ]: []
})


function Death() {
  Dead = true
  Score = 0
  playTune(DeathJingle)
  setTimeout(() => {
    const randomLevelIndex = Math.floor(Math.random() * levels.length);
    setMap(levels[randomLevelIndex]);
    spawnPlayer();
    Dead = false
  }, 3000); // Wait for 3 seconds before selecting a random level
}

function NewLevel(){
  const randomLevelIndex = Math.floor(Math.random() * levels.length);
  setMap(levels[randomLevelIndex]);
  Score += 1
  spawnPlayer();
  
  
  // Spawn cars in random positions on the road when entering a new level
  for (let i = 0; i < 7; i++) { // Spawn 3 cars randomly
    const randomY = Math.floor(Math.random() * height());// Generate a random Y coordinate
    const randomX = Math.floor(Math.random() * width());
    if (getTile(randomX, randomY).some(sprite => sprite.type === road)) { // Check if the tile at (0, randomY) is a road tile
      addSprite(randomX, randomY, car);} // Spawn a car sprite on the left side of the map at the random Y coordinate on a road tile
  }
}

function spawnPlayer() {
  const playerY = height() - 1; // Set the player's initial Y position to the bottom of the map
  const playerX = Math.floor(width() / 2); // Set the player's initial X position to the middle of the map
  
  addSprite(playerX, playerY, player); // Spawn the player sprite at the defined position
}

spawnPlayer(); // Call the spawnPlayer function to place the player at the bottom of the map when the game starts.

function spawnCar() {
  const randomY = Math.floor(Math.random() * height()); // Generate a random Y coordinate
  if (getTile(0, randomY).some(sprite => sprite.type === road)) { // Check if the tile at (0, randomY) is a road tile
    addSprite(0, randomY, car); // Spawn a car sprite on the left side of the map at the random Y coordinate on a road tile
  }
}

setInterval(spawnCar, Math.random() * 90 + 40 ); // Spawn a car at a random interval between 0.01 and 0.09 seconds

function MoveCars() {
    const cars = getAll(car);
    const playerSprite = getFirst(player);
    
    if (!playerSprite) return; // Check if the player sprite exists
    
    cars.forEach(carSprite => {
      if (carSprite.x === playerSprite.x && carSprite.y === playerSprite.y) {
        playerSprite.remove(); // Remove the player sprite if hit by a car
        console.log("Player died."); // Display a message and perform game over actions
        Death();
        }
      else {
        if (carSprite.x >= width() - 1) {
          carSprite.remove(); // Remove the car sprite when it reaches the end
        } 
        else {
          carSprite.x += 1; // Move the car sprite to the right
        } 

      }
    });
}

setInterval(MoveCars, Math.random() * 50 + 25);


let logsSpawned = 0; // Variable to track the number of logs spawned

function spawnLogs() {
  const randomY = Math.floor(Math.random() * height()); // Generate a random Y coordinate
  if (getTile(0, randomY).some(sprite => sprite.type === water && logsSpawned  <8)) { // Check if the tile at (0, randomY) is a water tile
    addSprite(0, randomY, log); // Spawn a car sprite on the left side of the map at the random Y coordinate on a water tile
  }
}

setInterval(() => {
  logsSpawned = 0; // Reset the logsSpawned count for the next cycle
}, 2000); // Reset every 2 seconds

setInterval(spawnLogs, 150); // Spawn logs at a random interval between 1 and 2 seconds

function moveLogs() {
  const logs = getAll(log);
  const playerSprite = getFirst(player);

  logs.forEach(logSprite => {
    if (logSprite.x >= width() - 1) {
      if (playerSprite && playerSprite.x === logSprite.x && playerSprite.y === logSprite.y) {
        playerSprite.remove(); // Remove the player sprite if on a log and hitting the right side
        console.log("Player rode the river off the map.");
        Death();
      } 
      else {
        logSprite.remove(); // Remove the log sprite when it reaches the end
      }
    } 
    else {
      logSprite.x += 1; // Move the log sprite to the right

      // Check if the player is on the log and move the player with the log
      if (playerSprite && playerSprite.x === logSprite.x - 1 && playerSprite.y === logSprite.y) {
        playerSprite.x += 1; // Move the player along with the log
      }
    }
  });
}

setInterval(moveLogs, 550);

const keyState = {}; // Object to track key states

document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
    if (!keyState[event.key] && !Dead) {
      keyState[event.key] = true;
      movePlayer(event.key);
    }
  }
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

function movePlayer(direction) {
  const playerSprite = getFirst(player);


  
  if (!playerSprite) return;

  let newX = playerSprite.x;
  let newY = playerSprite.y;

  // Calculate the new position based on the movement direction
  if (direction === 'w') {
    newY -= 1;
  } else if (direction === 'a') {
    newX -= 1;
  } else if (direction === 's') {
    newY += 1;
  } else if (direction === 'd') {
    newX += 1;
  }
  
  // Check if the player is on a log at the new position
  const isOnLog = getTile(newX, newY).some(sprite => sprite.type === log);
  playTune(MoveSound)
  // If the player is on a log or on grass, allow movement
  if (isOnLog || getTile(newX, newY).some(sprite => sprite.type === grass || getTile(newX, newY).some(sprite => sprite.type === road))) {
    playerSprite.x = newX;
    playerSprite.y = newY;
  } else if (!isOnLog && getTile(newX, newY).some(sprite => sprite.type === water)) {
    // If the player is not on a log and is on water, consider it as death
    console.log("Player drowned in water.");
    playerSprite.remove();
    Death();
  }
  
}


afterInput(() => {
  const playerSprite = getFirst(player);
  
  addText(`${Score}`, { 
  x: 15,
  y: 1,
  color: color`2`
  })

  if (playerSprite && playerSprite.y === 0) {
    console.log("Player reached the top of the map.");
    NewLevel();
  }
})