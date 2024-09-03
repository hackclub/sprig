/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Infinite Loop
@author: Matthew Soh
@tags: ["arcade-jam"]
@addedOn: 2024-08-28
*/

const soundtrack = tune`
200: D4~200 + D5/200,
200: D4~200,
200: D4~200,
200: D4~200 + D5/200,
200: D4~200,
200: D4~200 + F5/200,
200: D4~200,
200: D4~200 + D5/200,
200: D4~200 + D5^200 + A5-200,
200: D4~200 + D5^200 + A5-200,
200: D4~200 + D5^200 + A5-200,
200: D4~200 + D5^200 + A5-200,
200: D5^200 + D4~200 + A5-200,
200: D5^200 + D4~200 + A5-200,
200: D5^200 + D4~200 + A5-200,
200: D5^200 + D4~200 + A5-200,
200: G4-200 + D4~200 + D5^200 + C5/200,
200,
200: C5/200,
200,
200: F4-200 + D4~200 + D5^200 + C5/200,
200,
200: C5/200,
200: A4-200 + D4~200 + D5^200,
800,
200: A5~200 + D4/200 + D5/200 + A4/200 + F4^200,
200: A5~200 + D4/200 + D5/200 + A4/200 + F4^200,
200: A5~200 + D4/200 + D5/200 + A4/200 + F4^200,
200: A5~200 + D4/200 + D5/200 + A4/200 + F4^200`;
const coinTrack = tune`
37.5: B5~37.5 + A5^37.5 + G5^37.5 + F5-37.5 + E5/37.5,
37.5: B5~37.5 + A5~37.5 + G5^37.5 + F5-37.5 + E5/37.5,
37.5: A5~37.5 + G5^37.5 + F5-37.5 + E5/37.5 + D5/37.5,
37.5: G5~37.5 + F5-37.5 + E5-37.5 + D5/37.5,
37.5: G5~37.5 + F5^37.5 + E5-37.5 + D5/37.5 + C5/37.5,
37.5: G5~37.5 + F5^37.5 + E5^37.5 + D5-37.5 + C5/37.5,
37.5: F5~37.5 + E5^37.5 + D5-37.5 + C5/37.5 + B4/37.5,
37.5: F5~37.5 + E5^37.5 + D5^37.5 + C5-37.5 + B4/37.5,
37.5: F5~37.5 + E5~37.5 + D5^37.5 + C5-37.5 + B4/37.5,
37.5: E5~37.5 + D5^37.5 + C5-37.5 + B4/37.5 + A4/37.5,
37.5: E5~37.5 + D5~37.5 + C5-37.5 + B4-37.5 + A4/37.5,
37.5: D5~37.5 + C5^37.5 + B4-37.5 + A4/37.5,
37.5: D5~37.5 + C5^37.5 + B4-37.5 + A4/37.5 + G4/37.5,
37.5: D5~37.5 + C5~37.5 + B4^37.5 + A4-37.5 + G4/37.5,
37.5: C5~37.5 + B4^37.5 + A4-37.5 + G4/37.5,
37.5: G4/37.5 + A4-37.5 + B4^37.5 + C5~37.5,
37.5: G4/37.5 + A4-37.5 + B4^37.5 + C5~37.5,
37.5: F4/37.5 + A4-37.5 + B4^37.5 + C5~37.5,
37.5: F4/37.5 + G4-37.5 + B4^37.5 + A4^37.5 + C5~37.5,
37.5: F4/37.5 + G4-37.5 + A4^37.5 + C5~37.5 + B4~37.5,
37.5: F4/37.5 + E4/37.5 + G4-37.5 + A4^37.5 + B4~37.5,
37.5: E4/37.5 + G4-37.5 + A4^37.5 + F4-37.5 + B4~37.5,
37.5: E4/37.5 + G4-37.5 + A4^37.5 + F4-37.5 + B4~37.5,
37.5: E4/37.5 + G4-37.5 + A4^37.5 + F4-37.5 + B4~37.5,
37.5: E4/37.5 + G4-37.5 + F4-37.5 + A4^37.5 + B4~37.5,
37.5: E4-37.5 + D4/37.5 + F4-37.5 + A4^37.5 + G4^37.5,
37.5: D4/37.5 + E4-37.5 + G4^37.5 + F4^37.5 + C4/37.5,
37.5: D4/37.5 + E4-37.5 + F4^37.5 + C4/37.5 + A4~37.5,
37.5: D4-37.5 + E4^37.5 + F4^37.5 + C4/37.5 + G4~37.5,
37.5: E4^37.5 + D4-37.5 + C4/37.5 + G4~37.5,
37.5: C4/37.5 + E4^37.5 + D4-37.5 + F4~37.5 + G4~37.5,
37.5: C4/37.5 + D4-37.5 + E4^37.5 + F4~37.5`;

const player = "p";
const wall = "w";
const fake = "f";
const goal = "g";
const slide = "s";
const coin = "c";
const coinShow = "x";
const loopGoal = "l";
setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......09990.....
.....099990.....
.....09990......
......000.......
......0.0.......
.....00.00......
................`],
  [wall, bitmap`
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
1111111111111111`],
  [fake, bitmap`
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
1111111111111111`],
  [goal, bitmap`
................
....44444444....
...4444444444...
..444444444444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
....44444444....
................`],
  [slide, bitmap`
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
1111111111111111`],
  [coin, bitmap`
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
1111111111111111`],
  [coinShow, bitmap`
1111111111111111
1111666666661111
1116611111166111
1161111111111611
1661111111111661
1611116666111161
1611161111111161
1611161111111161
1611161111111161
1611161111111161
1611116666111161
1661111111111661
1161111111111611
1116611111166111
1111666666661111
1111111111111111`],
  [loopGoal, bitmap`
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
1111111111111111`]
);

setSolids([wall, player, slide]);
let level = -1;
let collected = false;
let start = false;
let time = 0;
const intro = map`
..........
..........
..........
..........
..........
..........
..........
..........`
const tutorialLevels = [map`
pw.......w
.w.w.w.w.w
.w...w...w
...wwwww..
wwww....w.
cfffs.w...
wwwww...w.
g.....w...`];
const altLevels = [map`
pw...c....
.f.w.w.wwg
.w.f.w.fcf
.c.w.c.wcw
.c.w.f.wwc
.w.w.w.scc
.w.c.w.wws
...w...wcf`]
const levels = [
  map`
pw...w....
.c.w.w.wwg
.w.w.w.fff
.f.w.f.www
.w.f.w.wcc
.w.w.w.wcc
.w.w.w.wcc
...w...scc`,
  map`
pwfwwwwgff
fwfffffwwf
fwfwfwffwf
fffwfwfwff
fwfwfwfwfw
fwfwffwlff
fwfwwffwwf
fwfffwffff`
];
let pressed = false;
let finished = false;

function showTutorial(tut) {
  setMap(tutorialLevels[tut]);
  addText("The Tutorial", { y: 0, color: color`7` });
  addText("Use WASD to move", { y: 5, color: color`0` });
  addText("L to skip", { y: 7, color: color`0` });
  addText("Reach the goal", { y: 9, color: color`0` });
}

function clear() {
  clearText();
  addText("Level " + (level + 1));
}

function loadLevel() {
  if (level === -1) {
    showTutorial(0);
  } else {
    clear()
    if (level === 0 && pressed) {
      setMap(altLevels[0]);
    } else {
      setMap(levels[level]);
    }
  }
}
setMap(intro);
addText("A haiku", { y: 1, color: color`8` });
addText("Is it possible", { y: 3, color: color`D` });
setTimeout(function() {
  clearText();
  addText("A haiku", { y: 1, color: color`8` });
  addText("to work on", { y: 5, color: color`D` });
  addText("Arcade, Sprig, and", { y: 7, color: color`D` });
  setTimeout(function() {
    clearText();
    addText("A haiku", { y: 1, color: color`8` });
    addText("Jam at the", { y: 9, color: color`D` });
    addText("same time?", { y: 11, color: color`D` });
    setTimeout(function() {
      addText("Yes it is! -Bartosz", { y: 13, color: color`3` });
      setTimeout(function() {
        clearText();
        start = true;
        loadLevel();
        const playback = playTune(soundtrack, Infinity);
      }, 1000);
    }, 2000);
  }, 1000);
}, 1000);
// addText("Jam on the same time?", { y: 9, color: color`D` });


onInput("w", () => {
  if (start) getFirst(player).y -= 1;
});

onInput("a", () => {
  if (start) getFirst(player).x -= 1;
});

onInput("s", () => {
  if (start) getFirst(player).y += 1;
});

onInput("d", () => {
  if (start) getFirst(player).x += 1;
});

onInput("l", () => {
  if (start && level === -1) {

    const playerPos = getFirst(player);
    const goalPos = getFirst(goal);
    playerPos.x = goalPos.x;
    playerPos.y = goalPos.y;
  }
});

onInput("j", () => {
  if (start) {
    const playerPos = getFirst(player);
    let x = playerPos.x;
    let y = playerPos.y;
    for (const [i, j] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
      ]) {
      let nx = x + i;
      let ny = y + j;
      if (getTile(nx, ny).length > 0 && getTile(nx, ny)[0].type === slide) {
        [playerPos.x, playerPos.y] = [nx + i, ny + j];
        break;
      }
    }
  }
});

onInput("k", () => {
  if (start) {
    const playerPos = getFirst(player);
    const coins = getAll(coin).concat(getAll(coinShow));
    coins.forEach(coinPos => {
      if (playerPos.x === coinPos.x && playerPos.y === coinPos.y) {
        coinPos.type = fake;
        time -= 15;
        playTune(coinTrack);
      }
    })
  }
});

afterInput(() => {
  if (start) {
    const playerPos = getFirst(player);
    const goalPos = getFirst(goal);
    const coins = getAll(coin, coinShow);
    coins.forEach(coinPos => {
      if (playerPos.x === coinPos.x && playerPos.y === coinPos.y) coinPos.type = coinShow;
    })
    if (level === 1 && playerPos.x === getFirst(loopGoal).x && playerPos.y === getFirst(loopGoal).y) {
      pressed = true;
      level = 0;
      loadLevel();
    } else if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
      if (level === -1) {
        level = 0;
        loadLevel();
        addText("Congratulations,", { y: 5, color: color`F` });
        addText("Tutorial complete!", { y: 7, color: color`F` });
        setTimeout(function() {
          clear();
        }, 2000);
      } else {
        level++;
        if (level >= levels.length) {
          finished = true;
          addText("You Win!", { y: 6, color: color`4` });
          playback.end();
        } else {
          loadLevel();
        }
      }
    }
  }
});

const timer = setInterval(() => {
  if (!finished && start) {
    time += 1;
    addText("Time: " + (time / 10).toFixed(1), { y: 15, color: color`L` });
  }
}, 100);

