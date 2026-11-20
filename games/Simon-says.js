/*
@title: Simon says
@description: This is a remage of the simple game Simon. Most of the inspiration was from https://sprig.hackclub.com/gallery/play/nomis 
@author: Bald Seb, Credits to the person who made Nomis
@tags: ['casual', 'simple']
@addedOn: 2026-10-11
*/

  // btw theres nothin here only boring ahh color thing.
  // So if u wanna actually see the code its at 460 or sum

const green = "a";
const greenRed = "b";
const greennoRed = "c";
const nogreenRed = "d";
const red = "e";
const redBlue = "f";
const rednoBlue = "g";
const noredBlue = "h";
const blue = "i";
const blueYellow = "j";
const bluenoYellow = "k";
const noblueYellow = "l";
const yellow = "m";
const yellowGreen = "n";
const yellownoGreen = "o";
const noyellowGreen = "p";
const center = "q";
const centerGreen = "r";
const centerRed = "s";
const centerBlue = "t";
const centerYellow = "u";
const black = "v";

const beep = tune`
100: B4-100,
100: B4-100,
3000`;

const beep2 = tune`
500: B4^500,
15500`;

const next = tune`
200: F4/200 + E4^200,
200: G4/200 + F4^200,
200: A4/200 + G4^200,
200: B4/200 + A4^200 + G4~200,
200: B4/200 + A4^200 + G4~200,
5400`;

const click = tune`
75: B4~75,
75: B4~75,
2250`;

const loose = tune`
187.5: G4-187.5,
187.5: F4-187.5,
187.5: E4-187.5,
187.5: C4/187.5,
187.5: C4/187.5,
187.5: C4/187.5,
375,
187.5: C4~187.5 + D4~187.5,
4312.5`;

setLegend(
  [green, bitmap`
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

  [greenRed, bitmap`
4444444444444444
4444444444444449
4444444444444499
4444444444444999
4444444444449999
4444444444499999
4444444444999999
4444444449999999
4444444499999999
4444444999999999
4444449999999999
4444499999999999
4444999999999999
4449999999999999
4499999999999999
4999999999999999`],

  [greennoRed, bitmap`
4444444444444444
444444444444444.
44444444444444..
4444444444444...
444444444444....
44444444444.....
4444444444......
444444444.......
44444444........
4444444.........
444444..........
44444...........
4444............
444.............
44..............
4...............`],

  [nogreenRed, bitmap`
................
...............9
..............99
.............999
............9999
...........99999
..........999999
.........9999999
........99999999
.......999999999
......9999999999
.....99999999999
....999999999999
...9999999999999
..99999999999999
.999999999999999`],

  [red, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],

  [redBlue, bitmap`
9999999999999999
5999999999999999
5599999999999999
5559999999999999
5555999999999999
5555599999999999
5555559999999999
5555555999999999
5555555599999999
5555555559999999
5555555555999999
5555555555599999
5555555555559999
5555555555555999
5555555555555599
5555555555555559`],

  [rednoBlue, bitmap`
9999999999999999
.999999999999999
..99999999999999
...9999999999999
....999999999999
.....99999999999
......9999999999
.......999999999
........99999999
.........9999999
..........999999
...........99999
............9999
.............999
..............99
...............9`],

  [noredBlue, bitmap`
................
5...............
55..............
555.............
5555............
55555...........
555555..........
5555555.........
55555555........
555555555.......
5555555555......
55555555555.....
555555555555....
5555555555555...
55555555555555..
555555555555555.`],

  [blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],

  [blueYellow, bitmap`
HHHHHHHHHHHHHHH5
HHHHHHHHHHHHHH55
HHHHHHHHHHHHH555
HHHHHHHHHHHH5555
HHHHHHHHHHH55555
HHHHHHHHHH555555
HHHHHHHHH5555555
HHHHHHHH55555555
HHHHHHH555555555
HHHHHH5555555555
HHHHH55555555555
HHHH555555555555
HHH5555555555555
HH55555555555555
H555555555555555
5555555555555555`],

  [bluenoYellow, bitmap`
...............5
..............55
.............555
............5555
...........55555
..........555555
.........5555555
........55555555
.......555555555
......5555555555
.....55555555555
....555555555555
...5555555555555
..55555555555555
.555555555555555
5555555555555555`],

  [noblueYellow, bitmap`
HHHHHHHHHHHHHHH.
HHHHHHHHHHHHHH..
HHHHHHHHHHHHH...
HHHHHHHHHHHH....
HHHHHHHHHHH.....
HHHHHHHHHH......
HHHHHHHHH.......
HHHHHHHH........
HHHHHHH.........
HHHHHH..........
HHHHH...........
HHHH............
HHH.............
HH..............
H...............
................`],

  [yellow, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],

  [yellowGreen, bitmap`
H444444444444444
HH44444444444444
HHH4444444444444
HHHH444444444444
HHHHH44444444444
HHHHHH4444444444
HHHHHHH444444444
HHHHHHHH44444444
HHHHHHHHH4444444
HHHHHHHHHH444444
HHHHHHHHHHH44444
HHHHHHHHHHHH4444
HHHHHHHHHHHHH444
HHHHHHHHHHHHHH44
HHHHHHHHHHHHHHH4
HHHHHHHHHHHHHHHH`],

  [yellownoGreen, bitmap`
H...............
HH..............
HHH.............
HHHH............
HHHHH...........
HHHHHH..........
HHHHHHH.........
HHHHHHHH........
HHHHHHHHH.......
HHHHHHHHHH......
HHHHHHHHHHH.....
HHHHHHHHHHHH....
HHHHHHHHHHHHH...
HHHHHHHHHHHHHH..
HHHHHHHHHHHHHHH.
HHHHHHHHHHHHHHHH`],

  [noyellowGreen, bitmap`
.444444444444444
..44444444444444
...4444444444444
....444444444444
.....44444444444
......4444444444
.......444444444
........44444444
.........4444444
..........444444
...........44444
............4444
.............444
..............44
...............4
................`],

  [center, bitmap`
H444444444444444
HH44444444444449
HHH4444444444499
HHHH444444444999
HHHHH44444449999
HHHHHH4444499999
HHHHHH0000999999
HHHHHH0000999999
HHHHHH0000999999
HHHHHH0000999999
HHHHH55555999999
HHHH555555599999
HHH5555555559999
HH55555555555999
H555555555555599
5555555555555559`],

  [centerGreen, bitmap`
H...............
HH.............9
HHH...........99
HHHH.........999
HHHHH.......9999
HHHHHH.....99999
HHHHHH0000999999
HHHHHH0000999999
HHHHHH0000999999
HHHHHH0000999999
HHHHH55555999999
HHHH555555599999
HHH5555555559999
HH55555555555999
H555555555555599
5555555555555559`],

  [centerRed, bitmap`
H444444444444444
HH4444444444444.
HHH44444444444..
HHHH444444444...
HHHHH4444444....
HHHHHH44444.....
HHHHHH0000......
HHHHHH0000......
HHHHHH0000......
HHHHHH0000......
HHHHH55555......
HHHH5555555.....
HHH555555555....
HH55555555555...
H5555555555555..
555555555555555.`],

  [centerBlue, bitmap`
H444444444444444
HH44444444444449
HHH4444444444499
HHHH444444444999
HHHHH44444449999
HHHHHH4444499999
HHHHHH0000999999
HHHHHH0000999999
HHHHHH0000999999
HHHHHH0000999999
HHHHH.....999999
HHHH.......99999
HHH.........9999
HH...........999
H.............99
...............9`],

  [centerYellow, bitmap`
.444444444444444
..44444444444449
...4444444444499
....444444444999
.....44444449999
......4444499999
......0000999999
......0000999999
......0000999999
......0000999999
.....55555999999
....555555599999
...5555555559999
..55555555555999
.555555555555599
5555555555555559`],

  [black, bitmap`
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

  // yeah i did change the color but frogot the names but doin dat would take too long for me and im kinda lazy.
  // i changed it for half of the things so like by the time it works ig. -_-

let maps = {
  default: map`
nab
mqe
jif`,

  orange: map`
nac
ms.
jih`,

  blue: map`
nab
mte
l.g`,

  yellow: map`
pab
.ue
kif`,

  green: map`
o.d
mre
jif`,

  blank: map`
...
...
...`
};

setMap(maps.default);

// This tells the game at what spped do i start at and up to how fast does it go.
let flashSpeed = 650;
const minSpeed = 250;

function flashColor(colorName) {
  setMap(maps[colorName]);

  setTimeout(() => {
    setMap(maps.default);
  }, Math.min(300, flashSpeed * 0.6));
}

const colors = ["green", "yellow", "blue", "orange"];

let sequence = [];
let position = 0;
let phase = "waiting";
let score = 0;
let highScore = 0;
let soundEnabled = true;
let paused = false;
let gameID = 0;

  // so like this remplaces PLayTune into playSound for a sound toggle
  // Like that u can turn off sound ir u a bum or if ur tryna take ur sprig to class
function playSound(sound) {
  if (soundEnabled) {
    playTune(sound);
  }
}

function updateStats() {
  clearText();

  addText(`SCORE ${score}`, {
    x: 3,
    y: 14,
    color: color`2`
  });

  addText(`BEST ${highScore}`, {
    x: 11,
    y: 14,
    color: color`2`
  });

  addText(`SPD ${Math.floor(score / 3) + 1}`, {
    x: 12,
    y: 1,
    color: color`2`
  });

  if (!soundEnabled) {
    addText("MUTE", {
      x: 3,
      y: 0,
      color: color`C`
    });
  }

  if (paused) {
    addText("PAUSED", {
      x: 7,
      y: 7,
      color: color`2`
    });
  }
}

function restartGame() {
  gameID++;

  sequence = [];
  position = 0;
  score = 0;

  flashSpeed = 650;

  paused = false;
  phase = "waiting";

  setMap(maps.default);
  updateStats();

  startRound();
}

  //soo like this pauses the game and  
function gameTimeout(callback, delay) {
  const currentGame = gameID;
  let remaining = delay;
  let lastTime = Date.now();

  function checkTimer() {
    if (currentGame !== gameID) return;

    const now = Date.now();

    if (!paused) {
      remaining -= now - lastTime;
    }

    lastTime = now;

    if (remaining <= 0) {
      callback();
    } else {
      setTimeout(checkTimer, Math.min(remaining, 50));
    }
  }

  setTimeout(checkTimer, Math.min(delay, 50));
}

function startRound() {
  phase = "showing";
  position = 0;

  // So the fancy math thing makes the speed faster and faster so its a bit more of a challenge
  flashSpeed = Math.max(
    minSpeed,
    650 - Math.floor(score / 2) * 40
  );

  const randomIndex = Math.floor(Math.random() * colors.length);
  const nextColor = colors[randomIndex];

  sequence.push(nextColor);

  playSound(click);
  updateStats();

  gameTimeout(() => {
    showSequence(0);
  }, 600);
}

function showSequence(index) {
  if (index >= sequence.length) {
    phase = "input";
    playSound(beep2);
    return;
  }

  flashColor(sequence[index]);
  playSound(beep);

  gameTimeout(() => {
    showSequence(index + 1);
  }, flashSpeed);
}

function checkInput(colorName) {
  if (phase !== "input" || paused) {
  return;
}

  const expectedColor = sequence[position];

  if (colorName !== expectedColor) {
    phase = "over";
    paused = false;
    gameID++;
    setMap(maps.blank);
    clearText();

    addText("Game Over!", { y: 4 });
    addText(`Score: ${score}`, { y: 6 });
    addText(`BEST ${highScore}`, { y: 8 });
    addText("J TO RESTART", { y: 13 });

    playSound(loose);
    return;
  }

  phase = "feedback";
  flashColor(colorName);
  position += 1;

  if (position === sequence.length) {
    score += 1;
    if (score > highScore) {
  highScore = score;
}

    gameTimeout(() => {
      startRound();
    }, 800);
  } else {
    gameTimeout(() => {
      phase = "input";
    }, 350);
  }
}

onInput("w", () => checkInput("green"));
onInput("a", () => checkInput("yellow"));
onInput("s", () => checkInput("blue"));
onInput("d", () => checkInput("orange"));
  //fancy feature keybinds 
onInput("l", () => {
  soundEnabled = !soundEnabled;
  updateStats();
});
onInput("k", () => {
  if (phase === "over") return;

  paused = !paused;
  updateStats();
});
onInput("j", () => {
  if (phase === "over") {
    restartGame();
  }
});

startRound();
