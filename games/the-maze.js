/*
@title: The Maze
@author: TRXAlpha
@tags: ['puzzle']
@addedOn: 2024-07-18
*/


// Define sprites and bitmaps from the second snippet
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [player, bitmap`
................
....00000000....
...0666666660...
..066666666660..
..066666666660..
..066666666660..
..066660660660..
..066660660660..
..006666666660..
...0006666660...
..0CCC0666600...
..0CCC066660F0..
..0CCC066660F0..
...0006606600...
......00.00.....
................`],
  [box, bitmap`
................
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CC..CC..CC..CC.
.CC..CC..CC..CC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CC..CC..CC..CC.
.CC..CC..CC..CC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CC..CC..CC..CC.
.CC..CC..CC..CC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
................`],
  [goal, bitmap`
................
................
..000000000000..
.00777777777700.
0077555555557700
0775555555555770
075555HHHH555570
07555HHHHHH55570
0755HHH11HHH5570
0755HH1111HH5570
0755HH1LL1HH5570
0755HH1LL1HH5570
0755HH1LL1HH5570
0755HH1LL1HH5570
0000000000000000
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
0000000000000000`]
);

// Map definitions from the first snippet
const noLevel = map`
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww`;

// Easy levels from the first snippet
let easyLevel = 0;
const easyLevels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
....
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`,
  map`
gw...gw
.b..www
.....ww
p.w..ww
.ww.www
.b..www
ww..www`
];

// Medium levels from the second snippet
let mediumLevel = 0;
const mediumLevels = [
  map`
p..g
.b..
..w.
..w.`,
  map`
p..w
.b.w
..g.
..w.`,
  map`
p..w
.b.w
...g
..w.`,
  map`
.p..w
..b..
...g.`,
];

// Hard levels from the second snippet
let hardLevel = 0;
const hardLevels = [
  map`
p.......gw
.ww.ww.www
.b..w...w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.......w.`,
  map`
p....ww..gw
.ww...w...w
.w....w....
.w.bw.w.w..
.w..w.w.w.w
.w.ww.w.w.w
.w.ww.w.w.w
.w.ww.w.w.w
.w........w
...w.w.w..w`,
  map`
p........gw
w..wwww.www
.......w...
w...w......
w.w.wwwww.w
w.w.......w
w.w.ww.w.w.
w.w....w..w
w.wwwwbw.w.
w.......w.w`,
  map`
p..g....w.
..wwww.w..
.bw..w.w..
w.w...w...
w.w.....w.
w.w.www.w.
w.w.w.w.w.
..w..ww.w.
.....ww.w.
.........w`,
  map`
wp.......g
w.w.wwww.w
w.w..b...w
w.w.w.w..w
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w...w...w.`,
  map`
p...g.w..w
.ww.ww.w..
.w....b...
.w...w.w.w
.w.w.w.w.w
.w.w.w.w.w
.w.w.w.w.w
.w.w.w...w
.w....w..w
...ww...ww`,
  map`
p.ww....wg
w...www.w.
....w...w.
..w.w...w.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w...w.w.w.
wb........
w.....w...`
];

setSolids([player, box, wall]); // Solid sprites

setPushables({
  [player]: [box],
  [box]: [box]
});



// Title and start instructions
addText("THE MAZE", { x: 6, y: 2, color: color`3` });
addText("Press 'i' to start", { x: 1, y: 8, color: color`7` });

let isInMainMenu = true;
let isGameStarted = false;

// Start game or select difficulty
onInput("i", () => {
  if (isInMainMenu) {
    clearText();
    addText("Select Difficulty", { x: 2, y: 2, color: color`3` });
    addText("easy (press j)", { x: 3, y: 6, color: color`7` });
    addText("medium (press k)", { x: 3, y: 8, color: color`7` });
    addText("hard (press l)", { x: 3, y: 10, color: color`7` });

    isInMainMenu = false;
  }
});

if (isInMainMenu) {
  setMap(noLevel);
}

// Difficulty selection inputs
onInput("j", () => {
  if (!isInMainMenu && !isGameStarted) {
    startEasyGame();
  }
});

onInput("k", () => {
  if (!isInMainMenu && !isGameStarted) {
    startMediumGame();
  }
});

onInput("l", () => {
  if (!isInMainMenu && !isGameStarted) {
    startHardGame();
  }
});

// Function to reset the current level
function resetCurrentLevel() {
  if (!isInMainMenu && isGameStarted) {
    if (easyLevels.includes(currentLevel)) {
      setMap(currentLevel);
    } else if (mediumLevels.includes(currentLevel)) {
      setMap(currentLevel);
    } else if (hardLevels.includes(currentLevel)) {
      setMap(currentLevel);
    }
  }
}

// Start game functions for each difficulty
function startEasyGame() {
  currentLevel = easyLevels[easyLevel];
  setMap(currentLevel);
  clearText();
  isGameStarted = true;

  afterInput(() => {
    checkCompletion(easyLevels);
  });
}

function startMediumGame() {
  currentLevel = mediumLevels[mediumLevel];
  setMap(currentLevel);
  clearText();
  isGameStarted = true;

  afterInput(() => {
    checkCompletion(mediumLevels);
  });
}

function startHardGame() {
  currentLevel = hardLevels[hardLevel];
  setMap(currentLevel);
  clearText();
  isGameStarted = true;

  afterInput(() => {
    checkCompletion(hardLevels);
  });
}

// Gameplay controls
onInput("s", () => {
  getFirst(player).y += 1; // Move down
});

onInput("w", () => {
  getFirst(player).y -= 1; // Move up
});

onInput("d", () => {
  getFirst(player).x += 1; // Move right
});

onInput("a", () => {
  getFirst(player).x -= 1; // Move left
});

// Reset the current level when 'k' is pressed
onInput("k", resetCurrentLevel);


// Check if level is completed

function checkCompletion(levels) {
  if (!isInMainMenu && isGameStarted) {
    const targetNumber = tilesWith(goal).length;
    const numberCovered = tilesWith(goal, box).length;

    if (numberCovered === targetNumber) {
      if (levels === easyLevels) {
        easyLevel++;
      } else if (levels === mediumLevels) {
        mediumLevel++;
      } else if (levels === hardLevels) {
        hardLevel++;
      }

      if (levels === easyLevels && easyLevel >= easyLevels.length) {
        setMap(noLevel);
        addText("you win!", { y: 4, color: color`7` });
        isGameStarted = false;
        easyLevel = 0;
        mediumLevel = 0;
        hardLevel = 0;
        isInMainMenu = true;
      } else if (levels === mediumLevels && mediumLevel >= mediumLevels.length) {
        setMap(noLevel);
        addText("you win!", { y: 4, color: color`7` });
        isGameStarted = false;
        easyLevel = 0;
        mediumLevel = 0;
        hardLevel = 0;
        isInMainMenu = true;
      } else if (levels === hardLevels && hardLevel >= hardLevels.length) {
        setMap(noLevel);
        addText("you win!", { y: 4, color: color`7` });
        isGameStarted = false;
        easyLevel = 0;
        mediumLevel = 0;
        hardLevel = 0;
        isInMainMenu = true;
      } else {
        if (levels === easyLevels) {
          setMap(easyLevels[easyLevel]);
        } else if (levels === mediumLevels) {
          setMap(mediumLevels[mediumLevel]);
        } else if (levels === hardLevels) {
          setMap(hardLevels[hardLevel]);
        }
      }
    }
  }
}

