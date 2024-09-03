/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Guardian
@author: srijan-raghavula
@tags: []
@addedOn: 2024-08-18
*/

const player = "p";
const land = "l";
const clouds = "c";
const cloudOnWater = "C";
const ozone = "o";
const water = "w";
const asteroid = "a";

setLegend(
  [player, bitmap`
................
................
................
................
................
................
.....CCCCC......
....C77777C.....
...C7222227C....
...C7202027C....
...CC99999CC....
....C00000C.....
.....33333......
......333.......
.......3........
................`],
  [land, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [clouds, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD222222DDDDDDDD
D22222222DDDDDDD
22222222222DDD22
D222222222222222
2222222222222222
2222222222222222
DD22222222222222
2222222222222222
2222222222222222
DDDD222222222222
DDD22DDDDDDD222D
D22DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [cloudOnWater, bitmap`
5555555555555555
5555555555555555
5522222255555555
5222222225555555
2222222222255522
5222222222222222
2222222222222222
2222222222222222
5522222222222222
2222222222222222
2222222222222222
5555222222222222
5552255555552225
5225555555555555
5555555555555555
5555555555555555`],
  [ozone, bitmap`
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
7777777777777777`],
  [water, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [asteroid, bitmap`
......LLLL......
......LLLL......
....LLLLLLLL....
..L.LLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLLLL
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
....LLLLLLLLL...
......LL.LL.....
................
................
................
................`]
);

setSolids([player]);


const levels = [
  map`
...........
...........
...........
.....p.....
.ooooooooo.
owlwwClwCwo
wlcwlwcclwC`,
  map`
...........
...........
...........
.....p.....
.ooooooooo.
owlwwClwCwo
wlcwlwcclwC`,
  map`
...........
...........
...........
.....p.....
.ooooooooo.
owlwwClwCwo
wlcwlwcclwC`
  // Add more levels as needed...
];

let level = 0;
let lives = 3;
const maxLevels = levels.length;
const asteroidsPerLevel = 20;

setMap(levels[level]);

setPushables({
  [player]: [],
  [asteroid]: [asteroid],
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});


function spawnAsteroid() {
  const x = Math.floor(Math.random() * 7); // Generate x-coordinate between 0 and 6
  const y = 0; // Start at the top
  addSprite(x, y, asteroid);
}

let ozoneHitCounter = 0; // Variable to track hits on the ozone layer

function moveAsteroids() {
  const asteroids = getAll(asteroid);

  for (let a of asteroids) {
    a.y += 1; // Move the asteroid downwards by incrementing the y-coordinate

    // Check if asteroid hits the ozone layer
    if (getTile(a.x, a.y).some(t => t.type === "o")) {
      a.remove(); // Remove the asteroid that hit the ozone
      ozoneHitCounter++; // Increment the hit counter for the ozone

      // Check if the ozone has taken three hits
      if (ozoneHitCounter >= 3) {
        // End the game
        clearInterval(gameInterval);
        addText("Game Over!", { x: 5, y: 7, color: color`3` });
        return;
      }
    } else if (a.y >= 14) {
      a.remove(); // Remove asteroid if it reaches the bottom row without hitting the ozone
    }
  }
}





function destroyAsteroid() {
  const playerX = getFirst(player).x;
  const playerY = getFirst(player).y;
  const collisionRange = 1; // Define the collision range

  const asteroids = getAll(asteroid);

  for (let a of asteroids) {
    for (let dx = -collisionRange; dx <= collisionRange; dx++) {
      for (let dy = -collisionRange; dy <= collisionRange; dy++) {
        if (a.x === playerX + dx && a.y === playerY + dy) {
          a.remove(); // Destroy the asteroid
        }
      }
    }
  }
}


function nextLevel() {
  level += 1;
  if (level < maxLevels) {
    setMap(levels[level]);
    startLevel();
  } else {
    clearInterval(gameInterval);
    addText("Congratulations!", { x: 2, y: 7, color: color`3` });
    addText("You Saved Earth!", { x: 2, y: 9, color: color`3` });
  }
}

function startLevel() {
  let asteroidCount = 0;
  const asteroidIncreaseThreshold = 10; // Threshold to increase difficulty
  let asteroidInterval = 1000; // Initial interval time
  let asteroidsSpawned = 0; // Count of asteroids spawned

  const levelInterval = setInterval(() => {
    if (asteroidCount < asteroidsPerLevel) {
      spawnAsteroid();
      moveAsteroids();
      asteroidCount += 1;
      asteroidsSpawned += 1;

      if (asteroidsSpawned % asteroidIncreaseThreshold === 0) {
        // Increase difficulty every 10 asteroids
        asteroidInterval -= 100; // Decrease interval time for faster asteroid spawn
        clearInterval(levelInterval);
        startLevel(); // Restart level with updated difficulty
      }
    }
  }, asteroidInterval); // Use updated asteroidInterval for spawning asteroids
}


afterInput(() => {
  destroyAsteroid();
});

const gameInterval = setInterval(() => {
  moveAsteroids();
}, 1000);

startLevel();
