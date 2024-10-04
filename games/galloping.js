/*
@title: galloping!
@author: Daniel Cui
@tags: ['action']
@addedOn: 2023-05-23

Description:
A gallant horse is travelling at breakneck speeds! 
Only problem is that it might actually break its neck from crashing into trees... 
Avoid the trees for as long as you can until the time in the stage runs out!

Controls:
Use WASD to move. When prompted to start or restart, use L.
*/

const player = "p";
const player2 = "2";
const player3 = "3";
const player4 = "4";
const player5 = "5";

const ground = "g";

const apple = "a";
const time = "t";

const tree = "r";
const wall1 = "w";
const wall2 = "b";
const bg = "q";

const horses = [player, player2, player3, player4, player5];

const newLevelSound = tune`
104.52961672473867: C5/104.52961672473867,
104.52961672473867: D5/104.52961672473867,
104.52961672473867: F5/104.52961672473867,
104.52961672473867: E5/104.52961672473867,
104.52961672473867: F5/104.52961672473867,
2822.2996515679442`;
const goodSound = tune`
118.57707509881423: C5~118.57707509881423,
118.57707509881423: G5~118.57707509881423,
3557.312252964427`;
const badSound = tune`
142.85714285714286: C5^142.85714285714286,
142.85714285714286: A4^142.85714285714286,
142.85714285714286: F4^142.85714285714286,
142.85714285714286: E4^142.85714285714286,
4000`;
const winSound = tune`
170.45454545454547: G4-170.45454545454547,
170.45454545454547: A4-170.45454545454547,
170.45454545454547: C5-170.45454545454547,
170.45454545454547: E5-170.45454545454547,
170.45454545454547,
170.45454545454547: E5-170.45454545454547,
170.45454545454547: D5-170.45454545454547,
170.45454545454547,
170.45454545454547: G4-170.45454545454547,
170.45454545454547: A4-170.45454545454547,
170.45454545454547: C5-170.45454545454547,
170.45454545454547: D5-170.45454545454547,
170.45454545454547,
170.45454545454547: D5-170.45454545454547,
170.45454545454547: C5-170.45454545454547,
170.45454545454547,
170.45454545454547: G4-170.45454545454547,
170.45454545454547: A4-170.45454545454547,
170.45454545454547: C5-170.45454545454547,
170.45454545454547: C5-170.45454545454547,
170.45454545454547,
170.45454545454547: D5-170.45454545454547,
170.45454545454547: B4-170.45454545454547,
170.45454545454547: A4-170.45454545454547,
170.45454545454547: G4-170.45454545454547,
340.90909090909093,
170.45454545454547: D5-170.45454545454547,
170.45454545454547,
170.45454545454547: C5-170.45454545454547,
340.90909090909093`;
const gallopSound = tune`
52.17391304347826: E4^52.17391304347826 + F4^52.17391304347826 + G4^52.17391304347826,
52.17391304347826,
52.17391304347826: E4^52.17391304347826 + D4^52.17391304347826 + C4^52.17391304347826,
260.8695652173913,
52.17391304347826: G4^52.17391304347826 + F4^52.17391304347826 + E4^52.17391304347826,
52.17391304347826,
52.17391304347826: E4^52.17391304347826 + D4^52.17391304347826 + C4^52.17391304347826,
260.8695652173913,
52.17391304347826: G4^52.17391304347826 + F4^52.17391304347826 + E4^52.17391304347826,
52.17391304347826,
52.17391304347826: E4^52.17391304347826 + D4^52.17391304347826 + C4^52.17391304347826,
260.8695652173913,
52.17391304347826: G4^52.17391304347826 + E4^52.17391304347826 + F4^52.17391304347826,
52.17391304347826,
52.17391304347826: E4^52.17391304347826 + D4^52.17391304347826 + C4^52.17391304347826,
260.8695652173913`;

setLegend(
  [ player, bitmap`
................
..........77..6.
........7700H6..
......77H00220..
......7HH022220.
.....77H02220220
....00HH22222220
.HH022222022000.
7H7222222200....
772202222220....
7H2220002200....
H02200..0220....
.0200....020....
.0200....020....
.0800....080....
..00.....00.....` ],
  [ player2, bitmap`
................
...........7..6.
........7H00H6..
......7HH00220..
......HH7022220.
.....7H702220220
....00HH22222220
.HH022222022000.
HH7222222200....
H72222222220....
7H2020002220....
H02000..0020....
00200....0220...
00200...00020...
08800..000008...
.0000..000......`],
  [ player3, bitmap`
................
..........HH..6.
........7HH0H6..
......7HH00220..
......HH7022220.
.....7H702220220
....00HH22222220
.HH022222222000.
HH7222222220....
H722222220220...
7H222222200220..
H0220000000200..
.0200..000220...
.0200.000080....
.080..00.000....
..00............` ],
  [ player4, bitmap`
................
.........777..6.
........770HH6..
......7HH70220..
......HH7022220.
.....77702220220
....007722222220
.7H022222222000.
7772222222000...
77222022222000..
7H2220222022000.
H02200000002200.
022000...00220..
08000....0220...
0000.....0800...
................`],
  [ player5, bitmap`
................
.........HHH..6.
........HH00H6..
......7HH70220..
......HH7022220.
.....7HH02220220
...7.7H722222220
.7HH00H22222000.
7HHH22222200....
HH02222222200...
HH222022202200..
H02200000002200.
.0200....002200.
.020.....002200.
.80......08000..
.0..............` ],

  [ ground, bitmap`
4444444444444444
4444444444444444
4444444444444444
44444444444444D4
4444444444444D44
4444444444444444
4444444444444444
444D444444444444
44D4444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD` ],
  
  [ apple, bitmap`
................
................
................
........C.......
.......CDD......
.....33DD.......
....3233333.....
...323333333....
...333333333....
...333333333....
....33333331....
....3333331.....
.....33111......
................
................
................` ],
  [ time, bitmap`
................
................
....777777777...
...7LLLLLLLLL7..
...7L322222LL7..
....7L3332LL7...
.....7L33LL7....
......7LLL7.....
......7LL7......
.....7LLLL7.....
....7LL22LL7....
...7LL5522LL7...
..7LLLL5555LL7..
..7LLLLLLLLLL7..
...7777777777...
................` ],

  [ tree, bitmap`
......0000......
...000444400....
..04444444440...
.0444444444440..
0444444D44D440..
0444D4D44DD440..
0444CDD44CD4440.
.04DDCDDCDDD4440
..0DDDDCCD4DDD40
...0CCLLDDD4440.
....0CLCDDDD00..
....0CLCC000....
...0CCCCCC0.....
..00CCCCCCC00...
.0CCCCCCCCCCC0..
.0C00CC000CCCC0.` ],
  [ wall1, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ wall2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ bg, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ]
);

setSolids([...horses, wall1, wall2]);

// setPushables({
//   [ player ]: []
// });

let level = 0; // starting level
const levels = [
  // title screen
  map`
........
........
........
......p.
........
........
........`,
  // actual levels
  map`
........
........
........
.p......
........
........
........`,
  map`
wwwwwwww
........
........
.p......
........
........
........`,
  map`
wwwwwwww
........
........
.p......
........
........
wwwwwwww`,
  map`
bbbbbbbb
wwwwwwww
........
.p......
........
........
wwwwwwww`,
  map`
bbbbbbbb
wwwwwwww
........
.p......
........
wwwwwwww
bbbbbbbb`,
  // game win screen
  map`
........
........
........
........
..3atr..
........
........`,
];



let horseIndex = 0;
function getHorse() {
  return getFirst("p") || getFirst("2") || getFirst("3") || getFirst("4") || getFirst("5");
}
function nextHorseAnimation() {
  let horse = getHorse();
  if (horse === undefined) {
    return;
  }
  let x = horse.x, y = horse.y;
  horse.remove();
  
  horseIndex = (horseIndex + 1) % horses.length;
  addSprite(x, y, horses[horseIndex]);
}
// animation loop
setInterval(() => {
  if (isRunning) {
    nextHorseAnimation();
  }
}, 100);


const startingPlayback = playTune(winSound, Infinity);
let gallopPlayback;
let isRunning = false;
const TIME_PER_LEVEL = 151e2;
const ENDING_LEVEL_IDX = 6;
let timeToFinish = TIME_PER_LEVEL;

function getAllThings() {
  return [...getAll("t"), ...getAll("a"), ...getAll("r")];
}

function despawnThings() {
  const things = getAllThings();
  for (let i = 0; i < things.length; i++) {
    if (things[i] !== undefined && things[i].x === 0) {
      things[i].remove();
    }
  }
}
// wtf width() and height() had confusing error messages
let lvlRanges = [[],
    [0, 1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5],
    [2, 3, 4]
];
function spawnThings() {
  let range = lvlRanges[level];  
  let ypos = range[Math.trunc(Math.random() * range.length)];
  let isTree = Math.random() < 0.60;
  if (isTree) {
    addSprite(width() - 1, ypos, tree);
  } else {
    addSprite(width() - 1, ypos, (Math.random() < 0.5) ? apple : time);
  }
}
function moveThings() {
  // if (timeToFinish % (200 - level * 20) === 0 || (timeToFinish < 50e2 && timeToFinish % 2e2) ) {
  const things = getAllThings();
  for (let i = 0; i < things.length; i++) {
    if (things[i] !== undefined) {
      things[i].x--;
    }
  }
}

// game loop
let gameloop = setInterval(() => {
  if (level === ENDING_LEVEL_IDX) {
    setBackground(bg);
    setMap(levels[6]);
    addText("you won!", {
      x: 6,
      y: 7,
      color: color`8`
    });
    gallopPlayback.end();
    playTune(winSound, Infinity);
    clearInterval(gameloop);
  }
  
  if (timeToFinish <= 0) {
    setLevel(level + 1);
  }
  
  if (!isRunning && level === 0) {
    addText("galloping!", {
      x: 4,
      y: 8,
      color: color`8`
    });
    addText("press l to start", {
      x: 2,
      y: 12,
      color: color`0`
    });
    
  }
  
  if (isRunning && level > 0 && level < ENDING_LEVEL_IDX) {
    clearText();
    addText(`Level ${level}`, {
      x: 2,
      y: 1,
      color: (level == 5) ? color`3`: color`H`,
    });
    addText(`${Math.trunc(timeToFinish / 100)}`, {
      x: 2,
      y: 14,
      color: color`0`,
    });

    
    if (timeToFinish % (120 - level * 3) === 0 ^ (timeToFinish < 50e2 && timeToFinish % (100 - level) == 0) ) {
      despawnThings();
      moveThings();
      spawnThings();
    }

    // collision detection
    const horse = getHorse();
    const spritesOnTile = getTile(horse.x, horse.y);
    // let hasTree = false, hasApple = false, hasTime = false;
    for (let i = 0; i < spritesOnTile.length; i++) {
      let curr = spritesOnTile[i];
      if (curr.type === "r") { // tree collision
        horse.remove();
        isRunning = false;
        addText("game over...", {
          x: 4,
          y: 7,
          color: color`0`,
        });
        addText("press L to restart", {
          x: 1,
          y: 9,
          color: color`0`,
        });
        gallopPlayback.end();
        playTune(badSound);
        break;
      } else if (curr.type === "a") { // apple collision
        const allThings = getAllThings();
        for (let j = 0; j < allThings.length; j++) {
          allThings[j].remove();
        }
        playTune(goodSound);
        break;
      } else if (curr.type === "t") { // time collision
        timeToFinish -= 15e2;
        curr.remove();
        playTune(goodSound);
        break;
      }
    }
    
    timeToFinish--;
  }
}, 0);

function setLevel(newLevel) {
  // console.log(newLevel);
  isRunning = false;
  level = newLevel;
  clearText();
  setMap(levels[level]);
  timeToFinish = TIME_PER_LEVEL;
  if (level > 0 && level < ENDING_LEVEL_IDX) {
    playTune(newLevelSound);
    setBackground(ground);
    isRunning = true;
  }
}

// input
onInput("w", () => {
  if (isRunning) {
    getHorse().y -= 1;
  }
});
onInput("a", () => {
  if (isRunning) {
    getHorse().x -= 1;
  }
});
onInput("s", () => {
  if (isRunning) {
    getHorse().y += 1;
  }
});
onInput("d", () => {
  if (isRunning) {
    getHorse().x += 1;
  }
});


onInput("l", () => {
  gallopPlayback = playTune(gallopSound, Infinity);
  if (!isRunning && level === 0) {
    setLevel(1);
    startingPlayback.end();
  }
  if (!isRunning) {
    setLevel(level);
  }
});


// starting the game!
setLevel(level);