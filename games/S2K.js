/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: S2K
@author: Spectrepro 
@tags: []
@addedOn: 2024-08-15
*/

/*
 __Game Setup__
*/

// Set up the player and platforms
const player = "p";
const ground = "g";
const platform = "t";
const spike = "s";

// Set up the level map using a grid layout
setLegend(
  [player, bitmap`
................
................
................
.....6666.......
....60006.......
....60006.......
....60006.......
....6666........
....6..6........
...66666........
..66.6.66.......
..6.....6.......
..6.....6.......
..6.....6.......
..6.....6.......
..6666666.......`],
  [ground, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [platform, bitmap`
................
................
................
................
6666666666666666
6666666666666666
6666666666666666
6666666666666666
................
................
................
................
................
................
................
................`],
  [spike, bitmap`
................
................
................
................
.....6666.......
....666666......
....666666......
...66666666.....
...66666666.....
...66666666.....
..6666666666....
..6666666666....
..6666666666....
.666666666666...
.666666666666...
66666666666666..`]
);

// Set up the levels, player starts at the top, and has to reach the bottom
const levels = [
  map`
p.....
..t...
..gttg
..gssg`,
  map`
p......
..tg..
..gttt
..gssg`,
  map`
p...s.
..t...
..gttg
..gggg`,
];

// Set the current level
let level = 0;
setMap(levels[level]);

// Player movement and gravity
let gravity = 1;
let jumpPower = 3;
let velocityY = 0;
let isJumping = false;

const playerSprite = getFirst(player);

// Move player left or right
onInput("a", () => {
  playerSprite.x -= 1;
});

onInput("d", () => {
  playerSprite.x += 1;
});

// Make the player jump
onInput("w", () => {
  if (!isJumping) {
    velocityY = -jumpPower;
    isJumping = true;
  }
});

// Update the player's position and apply gravity
function update() {
  playerSprite.y += velocityY;
  velocityY += gravity;

  // Check for ground or platform collision
  const collisionGround = getTile(playerSprite.x, playerSprite.y + 1).some(tile => tile.type === ground || tile.type === platform);
  if (collisionGround) {
    isJumping = false;
    velocityY = 0;
  }
  // Check for spikes
  const collisionSpike = getTile(playerSprite.x, playerSprite.y).some(tile => tile.type === spike);
  if (collisionSpike) {
    // Restart the level if the player hits a spike
    setMap(levels[level]);
    playerSprite.y = 0;
  }

  // Check if the player reached the bottom (goal)
  if (playerSprite.y >= getMap().height - 1) {
    level++;
    if (level >= levels.length) {
      addText("You Win!", { x: 5, y: 5 });
    } else {
      setMap(levels[level]);
      playerSprite.y = 0;
    }
  }
}

// Run the update function repeatedly
setInterval(update, 100);

