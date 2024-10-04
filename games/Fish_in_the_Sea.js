/*
@title: Fish_in_the_Sea
@author: Hugh Wilks
@tags: ['puzzle']
@addedOn: 2022-12-01
*/

/*
Instructions:

Hit "run" to execute the code and
start the game (you can also press shift+enter).

WASD to move, J to reset the level.

The objective is to get to any portal. Each move costs one energy (Bumping into 
a wall won't!). Collect an energy boost to increase your energy. 
Have fun!
*/

function move(dir) {
  const pla = getFirst(player);
  const oldx = pla.x;
  const oldy = pla.y;
  try {
    addSprite(oldx+dir[0], oldy+dir[1], blank);
    const spot = getFirst(blank);
    if (tilesWith(blank, wall).length < 1 && energy > 0) {
      pla.x = spot.x;
      pla.y = spot.y;
      playTune(moveSound);
      energy -= 1;
    } else {
      playTune(noMoveSound);
    }
    spot.remove();
  } catch (Exeption) {
    playTune(noMoveSound);
  }
}

const collect = tune`
36.94581280788177: f4^36.94581280788177 + d4^36.94581280788177,
36.94581280788177: e4^36.94581280788177 + g4^36.94581280788177,
36.94581280788177: f4^36.94581280788177 + b4^36.94581280788177,
1071.4285714285713`;
const portalSound = tune`
93.75: a4~93.75,
93.75: b4~93.75,
93.75: c5~93.75,
93.75: d5~93.75 + a4~93.75,
93.75: b4~93.75,
93.75: c5~93.75,
93.75: d5~93.75 + f5~93.75 + a5~93.75,
2343.75`;
const moveSound = tune`
30: e4^30,
30: d4^30,
30: f4^30,
870`;
const noMoveSound = tune`
46.15384615384615: c4^46.15384615384615,
1430.7692307692307`;
const resetSound = tune`
30: d5^30 + f5^30,
30: b4^30 + d5^30,
30: g4^30 + b4^30,
30: e4^30 + g4^30,
30: c4^30 + e4^30,
30: e4^30 + c4^30,
30: g4^30 + e4^30,
30: b4^30 + g4^30,
30: b4^30 + e5^30,
690`;
const winSound = tune`
60: f5~60 + a5~60,
120,
60: g5~60 + b5~60`;
const startSound = tune`
100: a4~100 + f4~100,
100: b4~100 + g4~100,
100: c5~100 + a4~100,
100: c5~100 + e5~100,
100: e5~100 + g5~100,
100: b5~100 + g5~100 + e5~100 + c5~100,
2600`;

const player = "p";
const blank = "N"
const food = "f";
const goal = "g";
const wall = "w";
const bg = "b";

setLegend(
  [ player, bitmap`
................
..............2.
................
.............2..
.44.....444.....
.444...44444..2.
.4444.4444044...
.4444444444444..
.4444444440444..
.4444.4444400...
.444...44444....
.44.....444.....
................
................
................
................`],
  [ food, bitmap`
................
................
................
.....666666.....
....66699666....
...6669999666...
...6699999966...
...6996996996...
...6666996666...
...6666996666...
...6666996666...
....66699666....
.....666666.....
................
................
................`],
  [ goal, bitmap`
................
....DDDDDDDD....
...DD77DDDDDD...
..DD77DD7777DD..
.DD77DD777D77DD.
.DD7DD7DDDDD77D.
.DD77D7DD77DD7D.
.DD77DD77DD7DDD.
.DDD7DD77DD77DD.
.D7DD77DD7D77DD.
.D77DDDDD7DD7DD.
.DD77D777DD77DD.
..DD7777DD77DD..
...DDDDDD77DD...
....DDDDDDDD....
................`],
  [ wall, bitmap`
0050000000005000
0050000000005000
0005000000050000
0000500005500000
0000055050000000
0000500500000000
0005000055000000
0550500000550000
5000050000005000
0000050000000500
0000500000000500
5505000000005500
0050000000050050
0000000005500005
0000000550000000
0000005000000000`],
  [ bg, bitmap`
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
  [ blank, bitmap`
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
................`]
);

setBackground(bg);


let level = 0;
const levels = [
  map`
wwwwwwwww
wwwwwwwww
wwwwwwwww
p....gwww
wwwwwwwww
wwwwwwwww
wwwwwwwww`, //0
  map`
wwwwwwwww
wwwwwwwww
wwwwwwwww
p...f...g
wwwwwwwww
wwwwwwwww
wwwwwwwww`, //1
  map`
wwwwwwwww
wwwwwwwww
wwwwww.gw
p.....fww
wwwfwwwww
wwwwwwwww
wwwwwwwww`, //2
  map`
wwwwwwwww
wwwwwwwww
wwwwwwwgw
wwwwwww.w
p....f..w
wwwwwwwgw
wwwwwwwww`, //3
  map`
wwwwwwwww
ww...f.ww
..fwww.ww
pwwfff.ww
wwgwww.ww
ww..f..ww
wwwwwwwww`, //4
  map`
wwwwwwwww
wwwwwwwww
.....f.wg
pwfw.w.w.
.w..fwf..
wwwwwwwww
wwwwwwwww`, //5
  map`
wwwwwwwww
www...www
...fwf...
pwwwwwwwg
..fwf..w.
ww.f.w...
wwwwwwwww`, //6
  map`
wwwwwwwww
pw.....gw
fw.wwwwww
fw......g
fw.wwwwww
....w...w
www...w.g`, //7
  map`
pwwwwwwww
.w.f.w.f.
.w.w.w.w.
f.f.f....
.w.w.w.w.
.w.w.w.w.
.f.w.f.wg`, //8
  map`
wwwwwwwww
wwwww.f..
wwww..ww.
p..f.wwg.
.w.wwwww.
fw.w.f.wf
..f..w...`, //9
  map`
gwwwwww.g
........w
wwwwpw..w
wwww.wfww
wf......w
ww.wwwwgw
g..wwwwww`, //10
  map`
ww......f
pwfwwwww.
fw.......
fw.wwwwwg
fw.f...w.
.w.wfw.w.
.....w...` //11
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]);

let energy = 5;
let lastX = 0;
let lastY = 0;

playTune(portalSound);
addText("Energy: " + energy, { y: 1, color: color`6` });

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  move([0, -1]);
});

onInput("s", () => {
  move([0, 1]);
});

onInput("a", () => {
  move([-1, 0]);
});

onInput("d", () => {
  move([1, 0]);
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  playTune(resetSound);
  const currentLevel = levels[level];
  energy = 5;
  clearText("");
  if (currentLevel !== undefined) {
    setMap(currentLevel); 
  } else {
    setMap(levels[levels.length-1])
  }
});

afterInput(() => {

  
  // count the number of tiles with goals
  const targetNumber = 1;
  
  // count the number of tiles with goals and players
  const numberCovered = tilesWith(goal, player).length;

  
  // count the number of tiles with foods and players
  const numberCovered2 = tilesWith(food, player).length;

  if (numberCovered2 === targetNumber) {
    playTune(collect);
    lastX = getFirst(player).x;
    lastY = getFirst(player).y;
    clearTile(lastX, lastY);
    addSprite(lastX, lastY, player);
    energy += 3;
  }
  clearText("");
  if (level < levels.length-1) {
    addText("Energy: " + energy, { y: 1, color: color`6` });
  } else {
    addText("Energy: " + energy, { x: 7, y: 3, color: color`6` });
  }

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      playTune(portalSound);
      setMap(currentLevel);
      energy = 5
      clearText("");
      if (level < levels.length-1) {
        addText("Energy: " + energy, { y: 1, color: color`6` });
      } else {
        addText("Energy: " + energy, { x: 7, y: 3, color: color`6` });
      }
    } else {
      energy = 0;
      lastX = getFirst(player).x;
      lastY = getFirst(player).y;
      clearTile(lastX, lastY);
      addSprite(lastX, lastY, goal);
      playTune(winSound)
      addText("You Win!", { x: 7, y: 5, color: color`2` });
    }
    
  }  
});
