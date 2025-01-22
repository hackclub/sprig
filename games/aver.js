/*
@title: gatitoj
@author: arojeza
@tags: []
@addedOn: 2025-01-22

*/

// Create tunes for movement and victory
const izquierda = tune`
500,
500: G5-500,
15000;`;
const derecha = tune`
500,
500: D5/500,
15000;`;

const winTune = tune`
500: C5-500,
500: E5-500,
500: G5-500,
500: C6-500,
15000;`;

// Define sprites
const player = "p";
const fish = "f";
const background = "b";

// Assign bitmap art to each sprite
setLegend(
  [player, bitmap`
33333......33333
3003888888830003
3000838888890003
3008888839999003
3388888899999333
.38822799922733.
.38822799822733.
.39977799977733.
.39999300093333.
0000000000000000
.30003330333000.
0003333000333300
..333300300333..
...3330333033...
....33333333....
................`],
  [fish, bitmap`
................
.....9...9......
.....99.99......
.....99999......
......999.......
.....99999......
....9999999.....
....9999999.....
....9920999.....
.....99999......
.....99999......
......999.......
................
................
................
................`],
  [background, bitmap`
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
7777777777777777`]
);

// Set the background
setBackground(background);

// Initialize level
let level = 0;

// Define map
const levels = [
  map`
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbpbbb`
];

setMap(levels[level]);

// Display the current level
addText(`Level: ${level}`, { x: 6, y: 2, color: color`3` });

// Function to update level text
function updateLevelText() {
  clearText();
  addText(`Level: ${level}`, { x: 6, y: 2, color: color`3` });
}

// Generate falling fish periodically
setInterval(() => {
  const x = Math.floor(Math.random() * width());
  addSprite(x, 0, fish); // Add a fish at a random x position
}, 1000); // One fish every second

// Make fish fall
setInterval(() => {
  const allFish = getAll(fish);
  for (const f of allFish) {
    if (f.y < height() - 1) {
      f.y += 1; // Move fish down
    } else {
      f.remove(); // Remove fish that reach the bottom
    }
  }
}, 500); 

// Check for collisions with fish
setInterval(() => {
  const playerSprite = getFirst(player);

  if (playerSprite) { // Ensure the player exists
    const allFish = getAll(fish);

    for (const f of allFish) {
      if (f.x === playerSprite.x && f.y === playerSprite.y) {
        f.remove(); // Remove the fish
        level += 1; // Increase the level
        updateLevelText();

        // Check for victory
        if (level === 15) {
          clearText();
          // Remove all sprites
          getAll(player).forEach(sprite => sprite.remove());
          getAll(fish).forEach(sprite => sprite.remove());
          // Display "You Win!" message
          addText("You Win!", { x: 6, y: 6, color: color`5` });
          playTune(winTune); // Play victory tune
          return; // Stop further game logic
        }
      }
    }
  }
}, 100); // Check for collisions every 100 msdd

// Player movement controls
onInput("a", () => {
  const playerSprite = getFirst(player);
  if (playerSprite && playerSprite.x > 0) { // Ensure the player exists
    playerSprite.x -= 1;
    playTune(izquierda);
  }
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  if (playerSprite && playerSprite.x < width() - 1) { // Ensure the player exists
    playerSprite.x += 1;
    playTune(derecha);
  }
});

// Reset level
onInput("j", () => {
  level = 0;
  updateLevelText();
  setMap(levels[level]);
});
