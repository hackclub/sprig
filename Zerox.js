/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Zerox
@author: 
@tags: []
@addedOn: 2025-27-5
*/

const player = "p";
const wall = "w";
const sea = "s";
const object = "b";
const goal = "g";
const enemy = "e";
const teleporter = "t";
const key = "k";
const lockedGoal = "l";
const stepLimits = [100,13,27,22,15,14];
const totalStepLimit =269;
let totalSteps = 0;
let moveCount = 0;
let score = 0;
let completedLevels = [false, false, false, false, false, false]; // One for each level
let isGameOver = false;
let hasKey = false;
let menuShown = false;

setLegend(
  [player, bitmap`
................
................
................
................
....575575H.....
....555555......
....HHHHHH......
.........H......
................
................
................
................
................
................
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [sea, bitmap`
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
  [object, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
   [goal, bitmap`
4444444444444444
4444444444444444
4444444444444446
4666646664666446
46DD6466646D6446
46DD646D646D6446
46DDD46D646D6446
46DDD46D646D6446
46D6666D646D6446
46D6D66D646D6446
46D6D66D646D6446
46DDD66D646D6446
46DDD66664666646
4666666664666646
4444444444444446
4444444444444444`],
  [enemy, bitmap`
..LLLLLL........
..L.LL.L........
..LLLLLL........
..L....L........
..L....L........
..LLLLLL........
....L...........
..LLLLL.........
....L...........
....L...........
...LLLL.........
................
................
................
................
................`],
  [teleporter, bitmap`
..888888888888..
.88888888888888.
8888888888888888
8888888..8888888
88888....8888888
888........88888
88..........8888
88..........8888
88..........8888
888........88888
88888....8888888
8888888..8888888
8888888888888888
.88888888888888.
..888888888888..
................`],
  [key, bitmap`
................
................
................
.......33.......
......3223......
.....322223.....
....32222223....
....32222223....
.....322223.....
......3223......
.......33.......
................
................
................
................
................`],
  [lockedGoal, bitmap`
................
................
....444444......
....4....4......
....4.33.4......
....4....4......
....444444......
....433334......
....433334......
....433334......
....433334......
....444444......
................
................
................
................`]

);

setSolids([player, wall, object, enemy]);

const levels = [
   map`
....bg
......
......
p.....`,
  map`
ss...g
ssw.w.
sww.b.
pww...`,
  map`
sbssssg
.p.....
.wwwwww
.ssssss
.wwwwws
.gsssbs`,
  map`
g.....
wsw.w.
wps.b.
wss.w.`,
  map`
ssssss
sssss.
swbw..
ssspwg`,
  map`
g.b...
w.w.w.
wpsb..
wss.wg`,
   
  
];

let level = 0;
setMap(levels[level]);

setPushables({
  [player]: [object]
});

// Music & Sounds
const moveSound = tune`
100: C5^100,
100: D5^100,
100: E5^100`;
const winSound = tune`
500: G5^500,
500: C6^500`;
const loseSound = tune`
200: G4^200,
200: F4^200,
200: E4^200`;
const seaSound = tune`
100: C4~100,
100: D4~100,
100: E4~100,
2900`;


// INTRO
addText(" SPRIG QUEST ", { y: 3, color: color`3` });
addText("Move: W A S D", { y: 6, color: color`1` });
addText("Reset: J", { y: 8, color: color`9` });
addText("Press any key...", { y: 10, color: color`5` });

onInput("i", () => startGame());
onInput("j", () => {
  level = 0;
  score = 0;
  hasKey = false;
  moveCount = 0;
  setMap(levels[level]);
  clearText();
});

function startGame() {
  if (!menuShown) {
    level = 1;  // skip menu
    menuShown = true;
  }
  moveCount = 0;
  totalSteps = 0;
  score = 0;
  hasKey = false;
  isGameOver = false;
  clearText();
  setMap(levels[level]);
}


// Inputs
["a", "d", "w", "s"].forEach(key => {
  onInput(key, () => {
    let p = getFirst(player);
    if (key === "a") p.x -= 1;
    if (key === "d") p.x += 1;
    if (key === "w") p.y -= 1;
    if (key === "s") p.y += 1;
    moveCount++;
    totalSteps++;
    playTune(moveSound);
  });
});
onInput("j", () => {
  if (isGameOver) {
    level = 1;
    moveCount = 0;
    totalSteps = 0;
    setMap(levels[level]);
    clearText();
    isGameOver = false;
  }
});

onInput("k", () => {
  if (isGameOver) {
    moveCount = 0;
    setMap(levels[level]); // Replay current level
    clearText();
    isGameOver = false;
  }
});


afterInput(() => {
  clearText();
addText(`Moves: ${moveCount}/${stepLimits[level]}`, { y: 14, color: color`5` });
addText(`Score: ${score}`, { y: 15, color: color`4` });


  let p = getFirst(player);
  let currentTile = getTile(p.x, p.y);

  // Sea sound
  if (currentTile.some(t => t.type === sea)) {
    playTune(seaSound);
  }

    // Lose if exceeded step limit for this level
  if (moveCount > stepLimits[level]) {
   playTune(loseSound);
clearText();
addText("LEVEL FAILED", { y: 5, color: color`3` });
addText("Too many steps!", { y: 7, color: color`3` });
addText(`Used: ${moveCount}/${stepLimits[level]}`, { y: 8, color: color`1` });
addText("J: Restart Game", { y: 10, color: color`D` });
addText("K: Retry Level", { y: 11, color: color`3` });
isGameOver = true;
return;

  }

  // Lose if exceeded total step limit
  if (totalSteps > totalStepLimit) {
    playTune(loseSound);
    clearText();
    addText("GAME OVER", { y: 6, color: color`3` });
    addText("Steps exceeded!", { y: 8, color: color`2` });
    addText(`Total: ${totalSteps}/${totalStepLimit}`, { y: 10, color: color`1` });
    return;
  }

  // Teleporters
  if (currentTile.some(t => t.type === teleporter)) {
    const other = tilesWith(teleporter).find(t => t[0].x !== p.x || t[0].y !== p.y);
    if (other) {
      p.x = other[0].x;
      p.y = other[0].y;
    }
  }

  const allGoals = tilesWith(goal);
  const goalsCovered = tilesWith(object, goal);

  if (goalsCovered.length === allGoals.length) {
    if (level < levels.length - 1) {
      level++;
      score += 10;
      hasKey = false;
      moveCount = 0;
      setMap(levels[level]);
    } else {
      playTune(winSound);
      addText(" YOU WIN!", { y: 6, color: color`7` });
      addText(`Score: ${score}`, { y: 8, color: color`4` });
    }
  }
});
