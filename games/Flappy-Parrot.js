/*
@title: Flappy Parrot
@author: TheBlisteringSun
@description: Flappity Parrity 
@tags: ['endless', 'cool']
@addedOn: 2025-11-30
*/

const player = "p"
const pipe = "l" // Change the type of the pipe sprites to "l"
const food = "f"
const background = "b"
const intro_melody = tune`
397.35099337748346,
198.67549668874173: G4~198.67549668874173 + B4^198.67549668874173,
198.67549668874173,
198.67549668874173: G4^198.67549668874173,
198.67549668874173,
198.67549668874173: A4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: C5^198.67549668874173,
198.67549668874173: B4^198.67549668874173,
198.67549668874173: B4~198.67549668874173,
794.7019867549669,
198.67549668874173: B4~198.67549668874173,
198.67549668874173: E5~198.67549668874173,
3178.8079470198677`
const main_melody = tune`
198.67549668874173: D4/198.67549668874173,
198.67549668874173,
198.67549668874173: G4~198.67549668874173 + B4^198.67549668874173,
198.67549668874173,
198.67549668874173: G4^198.67549668874173 + B4-198.67549668874173,
198.67549668874173,
198.67549668874173: A4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: C5^198.67549668874173,
198.67549668874173: B4^198.67549668874173,
198.67549668874173: B4~198.67549668874173 + G4-198.67549668874173,
397.35099337748346,
198.67549668874173: F4-198.67549668874173,
198.67549668874173: C5-198.67549668874173,
198.67549668874173: B4~198.67549668874173,
198.67549668874173: E5~198.67549668874173 + B4-198.67549668874173,
198.67549668874173,
198.67549668874173: G4-198.67549668874173,
198.67549668874173,
198.67549668874173: E4/198.67549668874173 + G4/198.67549668874173 + B4/198.67549668874173,
198.67549668874173,
198.67549668874173: G4-198.67549668874173,
198.67549668874173,
198.67549668874173: G4-198.67549668874173,
198.67549668874173: A4-198.67549668874173,
198.67549668874173: G4-198.67549668874173 + A4-198.67549668874173,
198.67549668874173,
198.67549668874173: F4/198.67549668874173,
198.67549668874173: A4/198.67549668874173,
198.67549668874173: C5/198.67549668874173,
198.67549668874173: A4/198.67549668874173,
198.67549668874173: F4/198.67549668874173`
let intro_playback = null
let main_playback = null


let running = true
let score = 0
let level = 0

let speed = 0
let frameCount = 0
let pipes = [] // Array to store the pipe sprites
let foods = []

setLegend(
  [player, bitmap`
................
................
................
.33.............
..33CCC.........
...333CC......D.
.CCCCC33000.DD..
..CCC00000003333
.0.500000020C533
..5.000000C03333
5.5.000000004443
...50000000C0...
3353330000000...
C33333000000....
66663C00000.....
666.C..CC.C.....`],
  [pipe, bitmap`
00D00D00000D0000
0DD00D044000D000
00D00D400000DDDD
0DD0004000000000
0D0004400DD00000
0D0DD0000D004000
0D0000000D44000D
0000000000D000D0
0000DD00000000DD
00440000000400DD
0D044400D0004D00
DD440400D004D000
00D040D000D00000
0D04000000D00000
DD00000D000D0000
00DDD00D0000DDDD`],
  [food, bitmap`
................
................
................
..........DDD...
.........DDDD...
.....3333DDD....
....32C333D3....
....3CC33C23....
....3333CCC3....
....3333CC33....
....33333333....
...33C333333....
...33CC3333.....
...3333333......
....33333.......
................`],
  [background, bitmap`
L11111L11111111L
1111111111111111
1111111111111111
1111111111111111
11111111L11111L1
1111111111111111
111L111111111111
1111111111111111
111111111111111L
1111111111D11111
1111111111111111
1111111111111111
L111111111111111
111111L111111111
1111111111111111
L1111111111L111L`]
)

function Initialize() {

  setBackground("b")
  setSolids([])
  
  running = true
  score = 0
  level = 0
  
  speed = 0
  frameCount = 0
  pipes = [] // Array to store the pipe sprites
  foods = []
  
  setMap(levels[level])
  clearText()
  addText("Press k to Start!!", { y: 9, color: color`H` })
  addText(" w to flap ", { y: 10, color: color`3` })
  
  intro_playback = playTune(intro_melody, 5)
}
const levels = [
    map`
  ................
  .lll..l.lllll.l.
  .lll.lllllll.l..
  .l.lll.ll.l..l..
  ................
  .......p........
  ................
  ................
  ................
  ................
  ................
  ................`,
    map`
  ........
  .p......
  ........
  ........
  ........
  ........
  ........
  ........`
  ]


setPushables({
  [player]: [],
  [pipe]: [], // Make the pipes pushable
  [food]: [],
})

onInput("w", () => {
  speed = -2;
})
startTime = performance.now()
onInput("k", () => {
  clearText()
  setMap(levels[1])
  intro_playback.end()
  main_playback = playTune(main_melody, Infinity)

  if (move() == 1) {
    pass
  }
})

function randInt(max) {
  return ~~(Math.random() * ~~max);
}

function move() {
  frameCount += 1
  speed = speed + 1;
  const playerY = getFirst(player).y;
  const playerX = getFirst(player).x;

  getAll(pipe).forEach(pipe => {
    if (pipe.x === playerX && pipe.y === playerY) {
      running = false;
    }
  });

  getAll(food).forEach(food => {
    if (food.x === playerX && food.y === playerY) {
      food.remove();
      score += 3;
    }
  });

  if (playerY === height() - 1) { // Player reached the bottom, game over
    running = false;
  }

  
  if (!running) {
    clearText();
    addText("Game Over", { y: 2, color: color`3` });
    addText(`Final Score: ${score}`, { y: 4, color: color`2` });
    addText("press J to", { y: 10, color: color`6` });
    addText("restart", { y: 12, color: color`6` });
    main_playback.end()
    return;
  } else {
    clearText();
  addText(`Score: ${score}`, { y: 1, color: color`2` });
  }

  if (height() - getFirst(player).y - 1 < speed) {
    getFirst(player).y = height() - 1;
  } else {
    getFirst(player).y += speed;
  }
  if (frameCount % 8 == 0) {
    makePipes(); // Call the function to update the pipes
  }
  if (frameCount % 8 == 4) {
    makeFood(); // Call the function to update the pipes
  }
  if (frameCount % 2 == 0) {
    updatePipes(); // Call the function to update the pipes
    updateFood(playerX, playerY);
  }

  setTimeout(move, 500)
}

function makePipes() {
  const gapSize = 2; // Gap size between top and bottom pipes
  let y = randInt(height()-1);

  // Spawn walls above the specified y value
  for (let yPos = 0; yPos < y; yPos++) {
    addSprite(width() - 1, yPos, pipe);
  }

  // Spawn walls under y + gap
  for (let yPos = y + gapSize; yPos < 8; yPos++) {
    addSprite(width() - 1, yPos, pipe);
  }
}

function updatePipes() {
  let point = 0;
  getAll(pipe).forEach(pipe => {
    if (pipe.x <= 0) {
      pipe.remove(); // Remove the pipe if it goes off the screen
      const index = pipes.indexOf(pipe);
      pipes.splice(index, 1); // Remove the pipe from the pipes array
      point = 1;
    }
    pipe.x -= 1; // Move each pipe to the left
  });
  score += point;
}

function makeFood() {
  let y = randInt(height()-1);
  addSprite(width() - 1, y, food);
}

function updateFood(playerX, playerY) {
  let point = 0;
  getAll(food).forEach(food => {
    if (food.x <= 0) {
      food.remove(); // Remove the food if it goes off the screen
      const index = foods.indexOf(food);
      foods.splice(index, 1); // Remove the food from the foods array
    }
    food.x -= 1; // Move each food to the left
  });
  score += point;
}

function main() {
  Initialize()
  
}

onInput("j", () => {
  Initialize()
})
main();
