/*
@title: Rythym
@author: Shadman
@tags: []
@addedOn: 2023-12-25

  Use WASD to activate a pad right before an array lands on it!
  Letting one fall through loses you points, so does activating a pad and not having anything land on it (so no spamming all the keys)
*/

const player = "p"
const up = "1";
const down = "4";
const right = "3";
const left = "2";
const wall = "w";
const pad = "d";
const poweredPad = "l";
const funText = ["Good!", "Awsome!", "Amazing!"];
const sadText = ["Oof", "Next time", "Almost"];
const melody = tune`
500: F5^500,
500: E5^500,
500: D5^500,
500: E5^500 + C4/500 + E4/500,
500: E5^500 + C4/500 + E4/500,
500: E5^500 + C4/500 + E4/500,
500: F5^500,
500: E5^500,
500: D5^500,
500: E5^500 + C4/500 + F4/500,
500: E5^500 + C4/500 + F4/500,
500: E5^500 + C4/500 + F4/500,
500: G5^500,
500: F5^500,
500: E5^500 + E4/500 + G4/500,
500: E5^500 + E4/500 + G4/500,
500: E5^500 + E4/500 + G4/500,
500: C5^500,
500: D5^500,
500: E5^500,
500: D5^500 + C4/500 + E4/500,
500: D5^500 + C4/500 + E4/500,
500: D5^500 + C4/500 + E4/500,
500: A4^500,
500: B4^500,
500: C5^500,
500: B4^500 + C4/500 + F4/500,
500: C5^500,
500: D5^500,
500: E5^500,
500: D5^500 + D4/500 + G4/500,
500: D5^500 + E4/500 + C4/500`;
const beat = tune`
52.44755244755245: G5/52.44755244755245 + A5-52.44755244755245,
1625.8741258741259`;
let quit = false;

setLegend(
  [ player, bitmap`
...3333333333...
..3..........3..
.3.LLLLLLLLLL.3.
.33LLLLLLLLLL33.
.33L001LL001L33.
.33L010LL010L33.
.33L000LL000L33.
.33LLLLLLLLLL33.
.33LLLLLLLLLL33.
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
................
................
................
................` ],
  [ up, bitmap`
.......HH.......
......H88H......
.....H8228H.....
....H822228H....
...H82222228H...
..H8222222228H..
..HHHH8228HHHH..
.....H8228H.....
.....H8228H.....
.....H8228H.....
.....H8228H.....
.....H8218H.....
.....H8218H.....
.....H8218H.....
.....H82L8H.....
.....H82L8H.....` ],
  [ right, bitmap`
................
................
.........HH.....
.........H8H....
.........H28H...
HHHHHHHHHH228H..
88888888882228H.
222222222222228H
LL1112222222228H
88888888882228H.
HHHHHHHHHH228H..
.........H28H...
.........H8H....
.........HH.....
................
................` ],
  [ down, bitmap`
.....H8L28H.....
.....H8L28H.....
.....H8128H.....
.....H8128H.....
.....H8128H.....
.....H8228H.....
.....H8228H.....
.....H8228H.....
.....H8228H.....
..HHHH8228HHHH..
..H8222222228H..
...H82222228H...
....H822228H....
.....H8228H.....
......H88H......
.......HH.......` ],
  [ left, bitmap`
................
................
.....HH.........
....H8H.........
...H82H.........
..H822HHHHHHHHHH
.H82228888888888
H8222222222111LL
H822222222222222
.H82228888888888
..H822HHHHHHHHHH
...H82H.........
....H8H.........
.....HH.........
................
................` ],
  [ wall, bitmap`
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100
0011111111111100` ],
  [ pad, bitmap`
................
................
..000000000000..
..01111LL11110..
..0111L11L1110..
..011111111110..
..01L1L11L1L10..
..0L11111111L0..
..0L11111111L0..
..01L1L11L1L10..
..011111111110..
..0111L11L1110..
..01111LL11110..
..000000000000..
................
................` ],
  [ poweredPad, bitmap`
................
................
..000000000000..
..01111LL11110..
..0111L88L1110..
..0111H11H1110..
..01LHL11LHL10..
..0L81111118L0..
..0L81111118L0..
..01LHL11LHL10..
..0111H11H1110..
..0111L88L1110..
..01111LL11110..
..000000000000..
................
................` ]
)

setSolids([])

let level = 0
const levels = [
  map`.`,
  map`
p....
w....
w....
wdddd`,
  map`.`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
function getCorrect(pads, x) {
  for(let i = 0; i < pads.length; i++) {
    if(pads[i].x == x) {
      return pads[i];
    }
  }
  return null;
}
onInput("s", () => {
  let downPad = getCorrect(getAll(pad), 4);
  if(downPad != null)
    downPad.type = poweredPad;
});
onInput("w", () => {
  let downPad = getCorrect(getAll(pad), 1);
  if(downPad != null)
    downPad.type = poweredPad;
});
onInput("a", () => {
  let downPad = getCorrect(getAll(pad), 2);
  if(downPad != null)
    downPad.type = poweredPad;
});
onInput("d", () => {
  let downPad = getCorrect(getAll(pad), 3);
  if(downPad != null)
    downPad.type = poweredPad;
});
addText("Rythym", {x: 7, y: 5});
addText("Press i to begin", {x: 2, y: 7});
addText(" Press i to quit\n    in game", {x: 2, y: 13});

let counter = 0;
let max = 1
let score = 0;
let loop;
let playback;
onInput("i", () => {
  if(level == 0) {
    clearText();
    level++;
    setMap(levels[level])
    loop = gameLoop();
  } else if(level == 1) {
    clearText();
    quit = true;
    level++;
    setMap(levels[level])
    addText("Thanks for\n playing!!", {x: 5, y: 5});
    addText("Press i to\n  restart", {x: 5, y: 10});
    addText("Score: " + score, {x: 5, y: 15});
  } else if(level == 2) {
    quit = false;
    level = 1;
    clearText();
    setMap(levels[level])
    addSprite(0,0, wall);
    playback = playTune(melody, Infinity);
  	score = 0;
  }
});

function gameLoop() {
  addSprite(0,0, wall);
  playback = playTune(melody, Infinity);
  return setInterval(() => {
    if(quit) {
      playback.end();
      return;
    }
    clearText();
    let didClear = moveArrows();
    let didThing = clearPoweredPads();
    if(didThing) {
      addText(funText[Math.floor(Math.random()*funText.length)], {x: 10, y: 10, color: color`0`});
      playTune(beat);
    } else if(didClear) {
      addText(sadText[Math.floor(Math.random()*funText.length)], {x: 10, y: 10, color: color`0`});
      score--;
    }
    if(counter >= max) {
      let numMake = Math.floor(Math.random()*3+1);
      max = Math.floor(Math.random()*3+1);
      counter = 0;
      for(let i = 0; i < numMake; i++) {
        let type = Math.floor(Math.random()*4+1);
        addSprite(type, 0, type.toString());
      }
      
    } else {
      counter++;
    }
    addText("S\nc\no\nr\ne\n..\n\n" + score, {x: 1, y: 5, color: color`2`});
  }, 1000)
}

function moveArrows() {
  let didClear = false;
  let arrows = getAll(up);
  arrows = arrows.concat(getAll(down));
  arrows = arrows.concat(getAll(left));
  arrows = arrows.concat(getAll(right));
  for(let i = 0; i < arrows.length; i++) {
    if(arrows[i].y == height()-1) {
      arrows[i].remove();
      didClear = true;
    }
    arrows[i].y += 1;
  }
  return didClear;
}

function clearPoweredPads() {
  let powered = getAll(poweredPad);
  let ret = false;
  for(let i = 0; i < powered.length; i++) {
    let tile = getTile(powered[i].x, powered[i].y);
    // console.log(tile[0]);
    if(tile[0].type != poweredPad) {
      tile[0].remove();
      score++;
      ret = true;
    } else {
      addText("Too Fast!", {x: 5, y: 5, color: color`0` });
      score--;
    }
    powered[i].type = pad;
  }
  return ret;
}
