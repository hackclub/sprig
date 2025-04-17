/* 
@title: Dinosaur_Fire
@author: Elkammar
@tags: [action, pixelart]
@addedOn: 2025-04-13
*/

// Sprites
const player = "p";
const fireball = "f";
const bird = "b";
const ground = "g";
const sky = "s";
const mountain = "m";

setLegend(
  [player, bitmap`
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................
................
`],
  [fireball, bitmap`
................
................
.......33.......
......3333......
......3333......
.......33.......
.......CC.......
......CCCC......
......CCCC......
.......CC.......
.......44.......
......4444......
......4444......
.......44.......
................
................
`],
  [bird, bitmap`
................
................
................
......6666......
.....6...666....
....6666666.....
...6666..66.....
........66......
.......666......
......666.......
.....666........
....666.........
................
................
................
................
`],
  [ground, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
`],
  [sky, bitmap`
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
7777777777777777
`],
  [mountain, bitmap`
................
................
................
................
................
................
.......99.......
......9999......
.....999999.....
....99999999....
...9999999999...
..999999999999..
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
`]
);

// Map
const level = 0;
const levels = [
  map`
mmmmmmmmmmmmmmmmmmmm
ssssssssssssssssssss
ssssssssssssssssssss
ssssssssssssssssssss
ssssssssssssssssssss
ssssssssssssssssssss
ssssssssssssssssssss
p...................
gggggggggggggggggggg
gggggggggggggggggggg`
];

setMap(levels[level]);

// Solids and pushables
setSolids([player, ground]);
setPushables({
  [player]: []
});

// Game variables
let score = 0;
let birdSpawnTimer = 0;
const birdSpawnInterval = 10; // Frames (~0.5s at 20fps)
let lastShot = 0;
const shotDelay = 5; // Frames (~0.25s at 20fps)
let backgroundTuneTimer = 0;
const backgroundTuneInterval = 100; // Frames (~5s)

// Sound definitions
const shootSound = tune`
100: E5-100,
100: G5-100,
3000`;
const hitSound = tune`
100: C5-100,
100: E4-100,
3000`;
const moveSound = tune`
100: C4-100,
3000`;
const backgroundTune = tune`
200: C4-200,
200: E4-200,
200: G4-200,
200: E4-200,
2400`;

// Display score
addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });

// Controls
onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(moveSound); // Sound on move left
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(moveSound); // Sound on move right
});

onInput("w", () => {
  if (lastShot >= shotDelay) {
    const p = getFirst(player);
    addSprite(p.x, p.y - 1, fireball);
    playTune(shootSound); // Sound on shoot
    lastShot = 0;
  }
});

// Game logic
afterInput(() => {
  lastShot++;

  // Play background tune periodically
  backgroundTuneTimer++;
  if (backgroundTuneTimer >= backgroundTuneInterval) {
    playTune(backgroundTune);
    backgroundTuneTimer = 0;
  }

  // Move fireballs
  getAll(fireball).forEach(f => {
    f.y -= 1;
    if (f.y < 0) f.remove();
  });

  // Spawn birds
  birdSpawnTimer++;
  if (birdSpawnTimer >= birdSpawnInterval) {
    addSprite(19, Math.floor(Math.random() * 6) + 1, bird);
    birdSpawnTimer = 0;
  }

  // Move birds
  getAll(bird).forEach(b => {
    b.x -= 1;
    if (b.x < 0) b.remove();
  });

  // Check collisions
  getAll(fireball).forEach(f => {
    getAll(bird).forEach(b => {
      if (f.x === b.x && f.y === b.y) {
        f.remove();
        b.remove();
        score += 10;
        playTune(hitSound); // Sound on hit
        clearText();
        addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
      }
    });
  });
});