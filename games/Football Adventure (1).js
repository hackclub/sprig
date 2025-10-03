/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Football Adventure
@author: Ivan Platonov
@description: Football Adventure is a game based on the sport of football, where the 
player has to score a goal within 10 seconds across 10 levels. To score a goal in 
order to complete a level, the player has to push the ball into the goal on the 
right, past 10 field players and a goalkeeper. WASD to move and J to restart.
@tags: []
@addedOn: 2025-08-28
*/

const player = "a"
const ball = "b"
const goalnet = "c"
const opponentplayer = "d"
const opponentplayeronwhite = "e"
const white = "f"
const greenfieldpiece = "g"
const darkgreenfieldpiece = "h"
const border = "i"
const background =  "j"
const goalkeeper = "k"
const owngoal = "l"
const bluered = "m"
const whiteyellow = "o"
const bottomline = "p"
const topline = "q"
const leftline = "r"
const rightline = "s"
const toprightcorner = "t"
const topleftcorner = "u"
const bottomleftcorner = "v"
const bottomrightcorner = "x"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.03.30.....
......03530.....
.....053530.....
.....05350......
......000.......
......0.0.......
....000.000.....
.....0...0......` ],
  [ ball, bitmap`
................
................
.....200002.....
....02200220....
...0022222200...
..222022220222..
..022200002220..
..002200002200..
..002200002200..
..022200002220..
..222022220222..
...0022222200...
....02200220....
.....200002.....
................
................` ],
  [ goalnet, bitmap`
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22` ],
  [ opponentplayer, bitmap`
................
................
......000.......
......0.0.......
......0..0......
...0.0...0......
...0.02.2000....
...000...0.0....
.....06.60.0....
.....06260......
.....062620.....
......02620.....
.......000......
.......0.0......
.....000.000....
......0...0.....` ],
  [ white, bitmap `
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
2222222222222222` ],
  [ greenfieldpiece, bitmap`
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
4444444444444444`],
  [ darkgreenfieldpiece, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ border, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ background, bitmap`
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD` ],
  [ opponentplayeronwhite, bitmap`
2222222222222222
2222222222222222
2222220002222222
2222220202222222
2222220220222222
2220202220222222
2220202220002222
2220002220202222
2222206260202222
2222206260222222
2222206262022222
2222220262022222
2222222000222222
2222222020222222
2222200020002222
2222220222022222`  ],
  [ goalkeeper, bitmap`
................
................
......000.......
......0.0.......
......0..0......
...0.0...0......
...0.02.2000....
...000...0.0....
.....09.90.0....
.....09990......
.....099990.....
......09990.....
.......000......
.......0.0......
.....000.000....
......0...0.....`  ],
  [ owngoal, bitmap`
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22` ],
  [ bluered, bitmap`
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333
5555555533333333` ],
  [ whiteyellow, bitmap`
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666
2222222266666666` ],
  [ bottomline, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
................
................
................
................
................
................
................
................
................
................
................
................` ],
  [ topline, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ leftline, bitmap`
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............
2222............` ],
  [ rightline, bitmap`
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222
............2222` ],
  [ toprightcorner, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
2222............
2222............
2222............
2222............` ],
  [ topleftcorner, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
............2222
............2222
............2222
............2222` ],
  [ bottomleftcorner, bitmap`
............2222
............2222
............2222
............2222
................
................
................
................
................
................
................
................
................
................
................
................` ],
  [ bottomrightcorner, bitmap`
2222............
2222............
2222............
2222............
................
................
................
................
................
................
................
................
................
................
................
................` ],
  );

  const playMelody = tune`
500: E4^500,
15500`;
  const lossMelody = tune`
500: G4~500 + F4^500 + E4^500 + D4-500 + A4/500,
15500`;
  const goalMelody = tune`
500: D5/500,
15500`;
  const defaultMelody = tune`
220.58823529411765: E5^220.58823529411765,
220.58823529411765: F5~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + D5^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + D5~220.58823529411765 + C5^220.58823529411765 + G4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + C5^220.58823529411765 + G4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + C5^220.58823529411765 + G4^220.58823529411765 + E4^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + C5^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + D5^220.58823529411765 + G4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + C5^220.58823529411765 + F4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + D5^220.58823529411765 + G4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + D5^220.58823529411765 + F4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + C5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + B4^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + G4^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + G4^220.58823529411765,
220.58823529411765: F5~220.58823529411765 + A4~220.58823529411765,
220.58823529411765: F5~220.58823529411765 + G4^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765,
220.58823529411765: E5^220.58823529411765`;
  playTune(defaultMelody, Infinity);

setSolids([ player, opponentplayer, opponentplayeronwhite, goalkeeper, ball ]);

setBackground(background);

let level = 0
const levels = [
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is...........ri
is.......d...ri
il..d..dd....ci
il.....d.....ci
il.....d.ab.kci
il.....d.....ci
is......d....ri
is.......d...ri
is.........d.ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is...d...d...ri
is...........ri
il.d..d...d..ci
il......d....ci
ilab..d.....kci
il........d..ci
is...........ri
is..d........ri
is.......d...ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is...........ri
is......d....ri
il........d..ci
il...d...d.d.ci
il........d.kci
il..........dci
is.....d..d..ri
is..........bri
is..........ari
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is...........ri
is.......d...ri
il..........dci
il......d.dd.ci
il...ab.d.d.kci
il......d....ci
is.......d..dri
is...........ri
is...........ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is...........ri
is.....d...d.ri
il..d....d..dci
il........d..ci
il.......ab.kci
il.....d..d..ci
is...........ri
is....d....d.ri
is...........ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
isa....d.....ri
is.b.d.......ri
is........d..ri
il.d.d.......ci
il.....d.....ci
il........d.kci
il..d........ci
is.....d.....ri
is........d..ri
is...........ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is.......d...ri
is...........ri
il...d..d.d..ci
il..........kci
il..d.ab..d..ci
il......d....ci
is...d....d..ri
is...........ri
is.......d...ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is...........ri
is...........ri
il.....d..d.dci
il.......d.dkci
il....ab..d.dci
il.......dd..ci
is........d..ri
is.........d.ri
is...........ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is...........ri
is.......d...ri
is.....d...d.ri
il.......d...ci
il..bd.......ci
il......d...kci
il.......d...ci
is....d.a....ri
is........d..ri
is......d....ri
ivpppppppppppxi
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiiiiiiii
iuqqqqqqqqqqqti
is......d....ri
is..d........ri
is........d..ri
il....d......ci
ilbd....d....ci
ila.......d.kci
il....d......ci
is..d........ri
is......d....ri
is...........ri
ivpppppppppppxi
iiiiiiiiiiiiiii`
]

setMap(levels[level]);

let gameRunning = 1;

onInput("w", () => {
  if (gameRunning == 1) {
  getFirst(player).y -= 1,
  playTune(playMelody)
  }
});

onInput("a", () => {
  if (gameRunning == 1) {
  getFirst(player).x -= 1,
  playTune(playMelody)
  }
});

onInput("s", () => {
  if (gameRunning == 1) {
  getFirst(player).y += 1,
  playTune(playMelody)
  }
});

onInput("d", () => {
  if (gameRunning == 1) {
  getFirst(player).x += 1,
  playTune(playMelody)
  };
});

setPushables({
  [ player ]: [ ball ]
})

let currentLevel = levels[level];

onInput("j", () => {
  resetGame();
});

function resetGame() {
  win = false;
  gameRunning = 1;
  level = 0;
  currentLevel = levels[level];
  clearText();
  count = 10;
  setMap(levels[0]);
  clearTimeout(playerTimer);
  clearInterval(countdown);
  createTimers();
  clearText();
  addText("Time:10", { x: 6, y: 1, color: color`0` });
  count = 10;
  goal = false;
  ballOutOfPlay = false;
  ownGoal = false;
};
  
goal = false;
afterInput(() => {
  checkGoal()
  function checkGoal() {
  const targetNumber = tilesWith(goalnet).length - 3;
  
  const numberCovered = tilesWith(goalnet, ball).length;

  checkConditions();
    
  if (numberCovered  === targetNumber) {
    goal = true,
    playTune(goalMelody),
    checkConditions();
  };
  };
});

ballOutOfPlay = false;
afterInput(() => {
  checkBall()
  function checkBall() {
  const bottomlineBorderNumber = 1;
  const bottomlineBorderNumberCovered = tilesWith(bottomline, ball).length;
  const toplineBorderNumber = 1;
  const toplineBorderNumberCovered = tilesWith(topline, ball).length;
  const leftlineBorderNumber = 1;
  const leftlineBorderNumberCovered = tilesWith(leftline, ball).length;
  const rightlineBorderNumber = 1;
  const rightlineBorderNumberCovered = tilesWith(rightline, ball).length;

  if (bottomlineBorderNumber === bottomlineBorderNumberCovered || toplineBorderNumber === toplineBorderNumberCovered || leftlineBorderNumber === leftlineBorderNumberCovered || rightlineBorderNumber === rightlineBorderNumberCovered) {
    playTune(lossMelody);
    setMap(map`
.......
.......
.......
.......
.......
.......
.......`);
    stopTimer();
    addText("Ball out of play", { x: 2, y: 4, color: color`2`});
    addText("You lost", { x: 6, y: 8, color: color`2`});
    addText("Press 'j'", { x: 6, y: 12, color: color`2`});
    ballOutOfPlay = true;
  }};
});

ownGoal = false;
afterInput(() => {
  checkOwnGoal()
  function checkOwnGoal() {
  const borderNumber = tilesWith(owngoal).length - 3;

  const borderNumberCovered = tilesWith(owngoal, ball).length;
  
  if (borderNumber === borderNumberCovered) {
    setMap(map`
.......
.......
.......
.......
.......
.......
.......`);
    stopTimer();
    addText("Own goal", { x: 6, y: 3, color: color`2`});
    addText("You lost", { x: 6, y: 7, color: color`2`});
    addText("Press 'j'", { x: 6, y: 11, color: color`2`});
    ownGoal = true;
    playTune(lossMelody);
  };
  };
});

function stopTimer() {
  clearText();
  clearTimeout(playerTimer);
  clearInterval(countdown);
};

let playerTimer = setTimeout(timer, 10000);

function timer() {
  if (!goal && !ballOutOfPlay && !ownGoal) {
  setMap(map`
.......
.......
.......
.......
.......
.......
.......`);
  clearText();
  gameRunning = 0;
  playTune(lossMelody);
  addText("You ran out", { x: 5, y: 3, color: color`2`});
  addText("of time", { x: 5, y: 5, color: color`2`});
  addText("Game over", { x: 5, y: 8, color: color`2`});
  addText("Press 'j'", { x: 5, y: 11, color: color`2`});
  };
};

let count = 10;
addText("Time:10", { x: 6, y: 1, color: color`0` });
let countdown = setInterval(() => {
  if (count > 1) {
      if (!goal && !ballOutOfPlay && !ownGoal) {
    clearText();
    addText("Time:", { x: 6, y: 1, color: color`0` });
    count -= 1; // Subtract 1 from count
    addText("" + count, { x: 11, y: 1, color: color`0` });
    };
    };
  }, 1000);

function createTimers() {
  let count = 10;
  gameRunning = 1; // Reset gameRunning to allow player movement
  //gameplay timer
  playerTimer = setTimeout(timer, 10000);
  //countdown timer
  countdown = setInterval(() => {
    if (count > 1) {
      if (!goal && !ballOutOfPlay && !ownGoal) {
    clearText();
    addText("Time:", { x: 6, y: 1, color: color`0` });
    count -= 1; // Subtract 1 from count
    addText("" + count, { x: 11, y: 1, color: color`0` });
    };
    };
  }, 1000);
};

function checkConditions() {
  if (goal) {  
    level++;
    currentLevel = levels[level];
    goal = false;
    ballOutOfPlay = false;
    ownGoal = false;
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      clearText("");
      clearTimeout(playerTimer);
      clearInterval(countdown);
      addText("Time:10", { x: 6, y: 1, color: color`0` });
      createTimers();
      };
  };
    if (currentLevel === undefined) {
    setMap(map`
.......
.......
.......
.......
.......
.......
.......`);
    gameRunning = 0;
    stopTimer();
    addText("You won!", { x: 6, y: 3, color: color`2` });
    addText("Press 'j'", { x: 6, y: 8, color: color`2`});
    addText("To play again", { x: 4, y: 12, color: color`2`});
    win = true;
  };
};

