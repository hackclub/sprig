/*
@title: Chest Cleanser Snake
*/

const head = "h";
const body = "b";
const food = "f";
const spike = "x"; 
const chest = "c"; 

setLegend(
  [head, bitmap`
................
................
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
................
................`],
  [body, bitmap`
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................`],
  [food, bitmap`
................
................
................
................
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....
......3333......
................
................
................
................`],
  [spike, bitmap`
................
......2222......
.....222222.....
....22333322....
...2233223322...
...2232222322...
..223222222322..
..223222222322..
...2232222322...
...2233223322...
....22333322....
.....222222.....
......2222......
................
................
................`],
  [chest, bitmap`
................
....77777777....
...7777777777...
..770077770077..
..777777777777..
..777788887777..
..777780087777..
..777788887777..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
....66666666....
................
................`]
);

const W = 10;
const H = 8;

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);

let snake, dir, nextDir, foodPos, score, alive, timer, grow, spikes;
let chestPos, chestActive, chestTimer;

function placeFood() {
  do {
    foodPos = {
      x: Math.floor(Math.random() * W),
      y: Math.floor(Math.random() * H)
    };
  } while (
    snake.some(s => s.x === foodPos.x && s.y === foodPos.y) ||
    spikes.some(s => s.x === foodPos.x && s.y === foodPos.y) ||
    (chestActive && chestPos && chestPos.x === foodPos.x && chestPos.y === foodPos.y)
  );
}

function spawnSpike() {
  let newSpike;
  do {
    newSpike = {
      x: Math.floor(Math.random() * W),
      y: Math.floor(Math.random() * H)
    };
  } while (
    snake.some(s => s.x === newSpike.x && s.y === newSpike.y) ||
    (foodPos && foodPos.x === newSpike.x && foodPos.y === newSpike.y) ||
    spikes.some(s => s.x === newSpike.x && s.y === newSpike.y) ||
    (chestActive && chestPos && chestPos.x === newSpike.x && chestPos.y === newSpike.y)
  );
  spikes.push(newSpike);
}

function spawnChest() {
  do {
    chestPos = {
      x: Math.floor(Math.random() * W),
      y: Math.floor(Math.random() * H)
    };
  } while (
    snake.some(s => s.x === chestPos.x && s.y === chestPos.y) ||
    spikes.some(s => s.x === chestPos.x && s.y === chestPos.y) ||
    (foodPos && foodPos.x === chestPos.x && foodPos.y === chestPos.y)
  );
  
  chestActive = true;

  chestTimer = setTimeout(() => {
    chestActive = false;
    chestPos = null;
  }, 6000);
}

function draw() {
  [head, body, food, spike, chest].forEach(t => getAll(t).forEach(s => s.remove()));
  addSprite(foodPos.x, foodPos.y, food);
  spikes.forEach(s => addSprite(s.x, s.y, spike));
  if (chestActive && chestPos) {
    addSprite(chestPos.x, chestPos.y, chest);
  }
  snake.forEach((s, i) => addSprite(s.x, s.y, i === 0 ? head : body));
  clearText();
  addText("Score: " + score, { x: 1, y: 0, color: color`0` });
}

function gameOver() {
  alive = false;
  clearInterval(timer);
  clearTimeout(chestTimer);
  addText("Game Over!", { x: 3, y: 3, color: color`3` });
  addText("Press J to Retry", { x: 1, y: 5, color: color`0` });
}

function step() {
  dir = nextDir;
  const nx = (snake[0].x + dir.x + W) % W;
  const ny = (snake[0].y + dir.y + H) % H;

  // खुद से टकराने पर गेम ओवर
  if (snake.some((s, i) => i > 0 && s.x === nx && s.y === ny)) {
    gameOver();
    return;
  }

  // स्पाइक से टकराने पर पॉइंट कम होगा, गेम एंड नहीं होगी
  let hitSpikeIndex = spikes.findIndex(s => s.x === nx && s.y === ny);
  if (hitSpikeIndex !== -1) {
    spikes.splice(hitSpikeIndex, 1); // उस स्पाइक को हटा दें
    if (score > 0) score--; // पॉइंट काटें
  }

  snake.unshift({ x: nx, y: ny });

  // चेस्ट कलेक्ट करने पर
  if (chestActive && chestPos && nx === chestPos.x && ny === chestPos.y) {
    spikes = []; // सारे स्पाइक्स साफ़!
    chestActive = false;
    chestPos = null;
    clearTimeout(chestTimer);
  }

  if (nx === foodPos.x && ny === foodPos.y) {
    score++;
    grow += 1;
    
    if (score > 0 && score % 7 === 0) {
      spawnChest();
    }
    
    spawnSpike(); 
    placeFood();
  }
  
  if (grow > 0) {
    grow--;
  } else {
    snake.pop();
  }
  draw();
}

function startGame() {
  clearInterval(timer);
  clearTimeout(chestTimer);
  snake = [{ x: 4, y: 4 }];
  spikes = []; 
  chestActive = false;
  chestPos = null;
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  grow = 0;
  alive = true;
  placeFood();
  draw();
  timer = setInterval(step, 250);
}

function turn(x, y) {
  if (dir.x !== -x || dir.y !== -y) nextDir = { x: x, y: y };
}
onInput("w", () => turn(0, -1));
onInput("s", () => turn(0, 1));
onInput("a", () => turn(-1, 0));
onInput("d", () => turn(1, 0));
onInput("i", () => turn(0, -1));
onInput("k", () => turn(0, 1));
onInput("j", () => turn(-1, 0));
onInput("l", () => turn(1, 0));

onInput("j", () => { if (!alive) startGame(); });

startGame();
