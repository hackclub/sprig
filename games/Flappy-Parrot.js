const player = "p"
const pipe = "l" // Change the type of the pipe sprites to "l"
const background = "b"

setLegend(
  [ player, bitmap`
................
................
..........C.....
...C9C9...99C...
....999...999C..
....C99...999.D.
......00000.DD..
.5...00000003333
3..500.00020C533
..5.00C0C0C03333
5.5.000020004443
...50000C00C04..
3353330000000...
C33333000000.4..
33C33C00000...4.
....C..CC.C...4.` ],
  [ pipe, bitmap`
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
  [ background, bitmap`
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

setBackground("b")
setSolids([])

let running = true
let score = 0
let level = 0
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
let speed = 0
let frameCount = 0
let pipes = [] // Array to store the pipe sprites

setMap(levels[level])
addText("Press k to Start!!", {y:9, color:color`H`})
  addText(" w to flap ", {y:10, color:color`D`})
setPushables({
  [ player ]: [],
  [ pipe ]: [], // Make the pipes pushable
})

onInput("w", () => {
  speed = -2;
})
startTime = performance.now()
onInput("k", () => {
  clearText()
  setMap(levels[1])
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
  
  clearText();
  addText(`Score: ${score}`, {y:1, color: color`2` });
  
  getAll(pipe).forEach(pipe => {
    if (pipe.x === playerX && pipe.y === playerY) { 
      running = false;
    }
  });

  if (playerY === height() - 1) { // Player reached the bottom, game over
    running = false;
  }

  if (!running) {
    clearText();
    addText("Game Over", {y:1, color:color`3`});
    addText(`Score: ${score}`, {y:3, color: color`2` });
    return;
  }

  if (height() - getFirst(player).y - 1 < speed) {
    getFirst(player).y = height()-1;  
  } else { 
  getFirst(player).y += speed;
  }
  if (frameCount % 8 == 0) {
    makePipes(); // Call the function to update the pipes
  }
  if (frameCount % 2 == 0) {
    updatePipes(); // Call the function to update the pipes
  }

  setTimeout(move, 500)
}

function makePipes() {
  const gapSize = 2; // Gap size between top and bottom pipes
  let y = randInt(width());

  // Spawn walls above the specified y value
  for (let yPos = 0; yPos < y; yPos++) {
    addSprite(width()-1, yPos, pipe);
  }

  // Spawn walls under y + gap
  for (let yPos = y + gapSize; yPos < 8; yPos++) {
    addSprite(width()-1, yPos, pipe);
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