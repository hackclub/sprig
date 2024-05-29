/*
@title: CatchEm
@tags: ['beginner', 'tutorial']
@img: catch_falling_objects
@addedOn: 2022-12-15
*/

// define the sprites in our game
const basket = "b";
const fallingObject = "f";

// assign bitmap art to each sprite
setLegend(
  [fallingObject, bitmap`
................
................
................
................
.....6666.......
....666666......
...66666666.....
...66666666.....
...66666666.....
...66666666.....
....666666......
.....6666.......
................
................
................
................`],
  [basket, bitmap`
................
................
................
................
................
................
................
....999999999...
.....9999999....
.....9999999....
.....9999999....
......99999.....
................
................
................
................`],
)

// Step 1 - Add basket to map
setMap(map`
........
........
........
........
........
........
........
...b....`)

// Create a variable that shows when the game is running
var gameRunning = true; 
var score = 0;

// START - BASKET MOVEMENT CONTROLS

onInput("a", () => {
  if (gameRunning) {
    getFirst(basket).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(basket).x += 1;
  }
});

// END - BASKET MOVEMENT CONTROLS

// Put falling object in a random position at the top
function spawnFallingObject() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, fallingObject);
}

// Make falling objects move down
function moveFallingObjects() {
  let objects = getAll(fallingObject);

  for (let i = 0; i < objects.length; i++) {
    objects[i].y += 1;
  }
}

// Make falling objects disappear
function despawnFallingObjects() {
  let objects = getAll(fallingObject);

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].y == 8) {
      objects[i].remove();
    }
  }
}

// Check if the player caught a falling object
function checkCatch() {
  let objects = getAll(fallingObject);
  let b = getFirst(basket);

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].x == b.x && objects[i].y == b.y) {
      objects[i].remove();
      score += 1;
      addText(`Score: ${score}`, {
        x: 0,
        y: 0,
        color: color`3`
      });
    }
  }
}

var gameLoop = setInterval(() => {
  if (gameRunning) {
    moveFallingObjects();
    despawnFallingObjects();
    spawnFallingObject();
    checkCatch();
  }
}, 1000);


