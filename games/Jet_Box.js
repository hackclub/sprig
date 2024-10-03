/*
@title: Jet_Box
@author: Hugh Wilks
@tags: ['puzzle']
@addedOn: 2022-12-03

Instructions:

You control the jet. You must get to the yellow square
and blast it with "J" to open a path. If you aren't in
front of the open path by the time the green dot on the
left hits the top (representing your distance from the wall)
you crash.

Controls:
WASD - move
J - blast (only works on the yellow square)
*/

const success = tune`
50: f5-50 + c5-50 + g4-50,
50: g5-50 + c5-50 + g4-50,
50: f5-50 + c5-50 + g4-50,
1450`;
const pew = tune`
42.857142857142854: f5/42.857142857142854,
42.857142857142854: e5/42.857142857142854,
42.857142857142854: b4/42.857142857142854 + c5/42.857142857142854,
1242.8571428571427`;
const death = tune`
42.857142857142854: g5/42.857142857142854,
42.857142857142854: e5/42.857142857142854,
42.857142857142854: d5/42.857142857142854,
42.857142857142854: c5/42.857142857142854,
42.857142857142854: g4/42.857142857142854,
42.857142857142854: e4/42.857142857142854,
42.857142857142854: c4/42.857142857142854,
1071.4285714285713`;
const tick = tune`
42.857142857142854: c5^42.857142857142854 + e5^42.857142857142854,
1328.5714285714284`;



function plane() {
  if (tilesWith(player).length > 0) {
    return getFirst(player);
  } else if (tilesWith(player1).length > 0) {
    return getFirst(player1);
  } else {
    return getFirst(nothing);
  }
}

function passed() {
  playTune(success);
  const jet = plane();
  const x = jet.x;
  const y = jet.y;
  
  setMap(levels[1]);
  
  const xBox = Math.floor(Math.random() * 4);
  const yBox = Math.floor(Math.random() * 4);

  clearTile(xBox, yBox);

  addSprite(x, y, player);
  addSprite(4, 3, playerIcon);
  addSprite(xBox, yBox, box);

  score++;
}

function gameOver() {
  playTune(death);
  over = 1;
  plane().remove();
  addSprite(4, 0, nothing);
  clearInterval(interval);
  let length = 0;
  while (length <= 3) {
    let width = 0;
    while (width <= 4) {
          addSprite(width, length, result);
          width++;
       }
    length++;
  }
  addText("Game Over!\nScore: " + score, {x: 5, y: 6, color: color`2`});
    
}

function crashTest() {
  const jet = plane();
  const through = tilesWith(player, blasted).length + tilesWith(player1, blasted).length;
  const target = tilesWith(blasted).length;
  if (through === target && target > 0) {
    return 1
  } else {
    return 0
  }
}
  
function move() {
  const jet = getFirst(playerIcon);
  if (jet.y === 0) {
    if (crashTest() == 1) {
      dist = 4;
      passed();
    } else {
      gameOver();
    }
  } else {
    playTune(tick);
  }
  dist--;
  jet.y = dist;
}

function pulse() {
  const jet = plane()
  const x = jet.x
  const y = jet.y
  if (tilesWith(player).length > 0) {
    jet.remove();
    addSprite(x, y, player1);
  } else if (tilesWith(player1).length > 0) {
    jet.remove();
    addSprite(x, y, player);
  }
}

const result = "r"
const player = "P"
const player1 = "p"
const wall = "w"
const box = "b"
const playerIcon = "I" // (I for icon)
const wallIcon = "W"
const blasted = "d" // (d for destroyed)
const background = "z"
const backgroundStart = "Z"
const nothing = "n"




setLegend(
  [ result, bitmap`
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
0000000000000000` ],
  [ player, bitmap`
................
................
................
................
................
.......11.......
.......11.......
.....119911.....
...LLL9339LLL...
.....LL99LL.....
......0..0......
................
................
................
................
................` ],
  [ player1, bitmap`
................
................
................
................
................
.......11.......
.......11.......
.....113311.....
...LLL3993LLL...
.....LL33LL.....
......0..0......
................
................
................
................
................` ],
  [ playerIcon, bitmap`
................
................
................
................
................
................
................
.......44.......
.......44.......
................
................
................
................
................
................
................`],
  [ wall, bitmap`
0000000000000000
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000000000000` ],
  [ box, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0000000000000000` ],
  [ wallIcon, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000
000000FFFF000000`],
  [ blasted, bitmap`
0000000000000000
0666666666666660
06666..666.66660
06............60
0666........6660
066..........660
066...........60
06............60
06............60
066..........660
0666........6660
066..........660
066.6........660
06.666666..6.660
0666666666666660
0000000000000000`],
  [ background, bitmap`
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000`],
  [ backgroundStart, bitmap`
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
000000CCCC000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ nothing, bitmap`
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
................
................
................
................` ]
);

let level = 0;
let dist = 3;
let delay = 2000;
let over = 0;
let score = 0;



const levels = [
  map`
dwwwW
wwwwz
wwwwz
wwwwZ`,
  map`
wwwwW
wwwwz
wwwwz
wwwwZ`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, player1, backgroundStart, background, wallIcon ]);


addSprite(0, 0, player);
addSprite(4, 3, playerIcon);
addSprite(0, 0, nothing);


playTune(tick);


// START - PLAYER MOVEMENT CONTROLS

onInput("a", () => {
  if (over === 0)
  plane().x -= 1;
});

onInput("d", () => {
  if (over === 0)
  plane().x += 1;
});

onInput("w", () => {
  if (over === 0)
  plane().y -= 1;
});

onInput("s", () => {
  if (over === 0)
  plane().y += 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("i", () => {
  if (delay > 100) {
    delay -= 100;
  }
});

onInput("k", () => {
  if (delay < 2000) {
    delay += 100;
  }
});

onInput("j", () => {
  if (over === 0) {
    playTune(pew);
    const jet = plane()
    const numberCovered = tilesWith(player, box).length + tilesWith(player1, box).length;
    if (numberCovered === 1) {
      getFirst(box).remove();
      addSprite(jet.x, jet.y, blasted);
    }
  }
});



let interval = setInterval(move, 550);
let fire = setInterval(pulse, 100);