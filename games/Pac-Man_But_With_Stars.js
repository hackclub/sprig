/*
@title: Pac-Man But With Stars
@author: Austin
@tags: ['strategy','retro']
@addedOn: 2022-12-01

controls: 
W, A, S, D - movement
J - restart

Goal:
collect all of the stars before the ghosts collect you

Note:
ghosts can phase through walls because they are ghosts and this mechanic is most definitely a design choice

*/

/* soundtrack */

const backgroundMusic = tune`
208.33333333333334: c5~208.33333333333334,
208.33333333333334: c5~208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334: a5~208.33333333333334,
208.33333333333334: a5~208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334,
208.33333333333334: f5~208.33333333333334,
208.33333333333334: f5~208.33333333333334,
208.33333333333334: e5~208.33333333333334,
208.33333333333334: e5~208.33333333333334,
208.33333333333334: d5~208.33333333333334,
208.33333333333334: d5~208.33333333333334,
208.33333333333334: c5~208.33333333333334,
208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334: f5~208.33333333333334,
208.33333333333334: f5~208.33333333333334,
208.33333333333334: e5~208.33333333333334,
208.33333333333334: e5~208.33333333333334,
208.33333333333334: d5~208.33333333333334,
208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334: g5~208.33333333333334,
208.33333333333334: f5~208.33333333333334,
208.33333333333334: f5~208.33333333333334,
208.33333333333334: e5~208.33333333333334,
208.33333333333334: e5~208.33333333333334,
208.33333333333334: d5~208.33333333333334,
208.33333333333334`
const playback = playTune(backgroundMusic, Infinity)

/* stuff */

const pacRight = "p";
const pacLeft = "q";
const pacUp = "t";
const pacDown = "e";
const wall = "w";
const star = "s";
const ghostRed = "r";
const ghostOrange = "o"
const ghostPink = "i"
const ghostCyan = "c"

setLegend(
  [ pacRight, bitmap`
.......0000.....
.....00666600...
....0666666660..
...066660066660.
..06666600666660
..0666666666600.
.066666666000...
.066666000......
.066666660......
.066666666000...
..0666666666600.
..06666666666660
...066666666660.
....0666666660..
.....00666600...
.......0000.....`],
  [ pacLeft, bitmap`
......0000......
....00666600....
...0666666660...
..066660066660..
.06666600666660.
..0066666666660.
....000666666660
.......000666660
.......066666660
....000666666660
..0066666666660.
.06666666666660.
..066666666660..
...0666666660...
....00666600....
......0000......`],
  [ pacUp, bitmap`
....0......0....
...060....060...
..0660....0660..
.066660..066660.
.066660..066660.
0666660..0666660
0660066006666660
0660066066666660
0666666066666660
.06666666666660.
.06666666666660.
..066666666660..
...0666666660...
....00666600....
......0000......
................`],
  [ pacDown, bitmap`
................
......0000......
....00666600....
...0666666660...
..066666666660..
.06666666666660.
.06666666666660.
0666666606666660
0666666606600660
0666666006600660
0666660..0666660
.066660..066660.
.066660..066660.
..0660....0660..
...060....060...
....0......0....`],
  [ wall, bitmap`
5555555555555555
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5555555555555555`],
  [star, bitmap`
.......00.......
......0660......
......0660......
.....066660.....
0000006666000000
0666666666666660
.06666666666660.
..066666666660..
...0666666660...
...0666666660...
..066666666660..
..066666666660..
.06666600666660.
.066600..006660.
06600......00660
000..........000`],
  [ghostRed, bitmap`
................
.......333......
.....3333333....
....333333333...
...33322333223..
...33222232222..
...33225532255..
..3332255322553.
..3333223332233.
..3333333333333.
..3333333333333.
..3333333333333.
..3333333333333.
..33.33..333.33.
..3...3..33...3.
................`],
  [ghostOrange, bitmap`
................
.......999......
.....9999999....
....999999999...
...99922999229..
...99222292222..
...99225592255..
..9992255922559.
..9999229992299.
..9999999999999.
..9999999999999.
..9999999999999.
..9999999999999.
..99.99..999.99.
..9...9..99...9.
................`],
  [ghostPink, bitmap`
................
.......888......
.....8888888....
....888888888...
...88822888228..
...88222282222..
...88225582255..
..8882255822558.
..8888228882288.
..8888888888888.
..8888888888888.
..8888888888888.
..8888888888888.
..88.88..888.88.
..8...8..88...8.
................`],
  [ghostCyan, bitmap`
................
.......777......
.....7777777....
....777777777...
...77722777227..
...77222272222..
...77225572255..
..7772255722557.
..7777227772277.
..7777777777777.
..7777777777777.
..7777777777777.
..7777777777777.
..77.77..777.77.
..7...7..77...7.
................`]
  );

let level = 0
const levels = [
  map`
p.wwwwwwww
.........w
w......s.w
w..i..r..w
w........w
w........w
w..o..c..w
w.s....s.w
w........w
wwwwwwwwww`,
  map`
p.........
...wwwwww.
.......sw.
.w.c..r.w.
.w......w.
.w......w.
.w.i..o.w.
.ws....sw.
.wwwwwwww.
..........`,
  map`
p.w....w.s
..........
www....www
w........w
w..i..r..w
w..c..o..w
w........w
www....www
..........
s.w....w.s`,
  map`
p.wwwwwwww
...w..w.sw
w........w
ww.r..o.ww
w........w
w........w
ww.i..c.ww
w........w
ws.w..w.sw
wwwwwwwwww`,
  map`
p.w....w.s
.....r....
www....ww.
..wwwwww..
.c....o...
.........w
w.wwwwwwww
w..w.w...w
.....i....
s.w.w..w.s`,
  map`
p.wwwwww.s
..w.w.w...
w....r...w
ww.w.w.w..
wwwwwwwww.
.i.....o..
...w..w..w
.ww.ww.www
....c.....
s.ww.w.w.s`
];
  
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([pacRight, pacLeft, pacUp, pacDown, wall, ]);

onInput("j", () => {
  level = 0
  setMap(map`
p.wwwwwwww
.........w
w......s.w
w..i..r..w
w........w
w........w
w..o..c..w
w.s....s.w
w........w
wwwwwwwwww`)
});

/* player controls */

var pacXPosition;
var pacYPosition;

onInput("s", () => {
  if (tilesWith(pacUp).length == 1) {
  pacUpPosition()
  addSprite(pacXPosition, pacYPosition, pacDown);
  }
  else if (tilesWith(pacRight).length == 1) {
  pacRightPosition()
  addSprite(pacXPosition, pacYPosition, pacDown);
  }
  else if (tilesWith(pacLeft).length ==  1) {
  pacLeftPosition()
  addSprite(pacXPosition, pacYPosition, pacDown);
  }
  else {
  pacDownPosition()
  addSprite(pacXPosition, pacYPosition, pacDown)
  }
  getFirst(pacDown).y += 1;
  checkLoss();
  pacDownPosition()
  addSprite(pacXPosition, pacYPosition, pacDown)
});

onInput("d", () => {
  if (tilesWith(pacUp).length == 1) {
  pacUpPosition()
  addSprite(pacXPosition, pacYPosition, pacRight);
  }
  else if (tilesWith(pacDown).length == 1) {
  pacDownPosition()
  addSprite(pacXPosition, pacYPosition, pacRight);
  }
  else if (tilesWith(pacLeft).length == 1) {
  pacLeftPosition()
  addSprite(pacXPosition, pacYPosition, pacRight);
  }
  else {
  pacRightPosition()
  addSprite(pacXPosition, pacYPosition, pacRight);
  }
  getFirst(pacRight).x += 1;
  checkLoss();
  pacRightPosition();
  addSprite(pacXPosition, pacYPosition, pacRight);
});

onInput("w", () => {
  if (tilesWith(pacRight).length == 1) {
  pacRightPosition()
  addSprite(pacXPosition, pacYPosition, pacUp)
  }
  else if (tilesWith(pacLeft).length == 1) {
  pacLeftPosition()
  addSprite(pacXPosition, pacYPosition, pacUp)
  }
  else if (tilesWith(pacDown).length == 1) {
  pacDownPosition()
  addSprite(pacXPosition, pacYPosition, pacUp)
  }
  else {
  pacUpPosition()
  addSprite(pacXPosition, pacYPosition, pacUp)
  }
  getFirst(pacUp).y -= 1;
  checkLoss();
  pacUpPosition();
  addSprite(pacXPosition, pacYPosition, pacUp);
});

onInput("a", () => {
  if (tilesWith(pacRight).length == 1) {
  pacRightPosition()
  addSprite(pacXPosition, pacYPosition, pacLeft)
  }
  else if (tilesWith(pacUp).length == 1) {
  pacUpPosition()
  addSprite(pacXPosition, pacYPosition, pacLeft)
  }
  else if (tilesWith(pacDown).length == 1) {
  pacDownPosition()
  addSprite(pacXPosition, pacYPosition, pacLeft)
  }
  else {
  pacLeftPosition()
  addSprite(pacXPosition, pacYPosition, pacLeft)
  }
  getFirst(pacLeft).x -= 1;
  checkLoss();
  pacLeftPosition();
  addSprite(pacXPosition, pacYPosition, pacLeft)
});

function pacUpPosition() {
  pacXPosition = getFirst(pacUp).x;
  pacYPosition = getFirst(pacUp).y;
  clearTile(pacXPosition, pacYPosition);
}

function pacRightPosition() {
  pacXPosition = getFirst(pacRight).x;
  pacYPosition = getFirst(pacRight).y;
  clearTile(pacXPosition, pacYPosition);
}

function pacLeftPosition() {
  pacXPosition = getFirst(pacLeft).x;
  pacYPosition = getFirst(pacLeft).y;
  clearTile(pacXPosition, pacYPosition);
}

function pacDownPosition() {
  pacXPosition = getFirst(pacDown).x;
  pacYPosition = getFirst(pacDown).y;
  clearTile(pacXPosition, pacYPosition);
}

/* ghost movement */

var redRandom;
var orangeRandom;
var pinkRandom;
var cyanRandom
const min = 1;
const max = 4;

setInterval(() => {
  redRandom = Math.floor(Math.random()*(max-min+1)+min);
  if (redRandom == 1) {
  getFirst(ghostRed).x += 1;
  }
  else if (redRandom == 2) {
  getFirst(ghostRed).x -= 1;
  }
  else if (redRandom == 3) {
  getFirst(ghostRed).y += 1;
  }
  else {
  getFirst(ghostRed).y -= 1;
  }
  checkLoss()
}, 800)

setInterval(() => {
  orangeRandom = Math.floor(Math.random()*(max-min+1)+min);
  if (orangeRandom == 1) {
  getFirst(ghostOrange).x += 1;
  }
  else if (orangeRandom == 2) {
  getFirst(ghostOrange).x -= 1;
  }
  else if (orangeRandom == 3) {
  getFirst(ghostOrange).y += 1;
  }
  else {
  getFirst(ghostOrange).y -= 1;
  }
  checkLoss()
}, 800)

setInterval(() => {
  pinkRandom = Math.floor(Math.random()*(max-min+1)+min);
  if (pinkRandom == 1) {
  getFirst(ghostPink).x += 1;
  }
  else if (pinkRandom == 2) {
  getFirst(ghostPink).x -= 1;
  }
  else if (pinkRandom == 3) {
  getFirst(ghostPink).y += 1;
  }
  else {
  getFirst(ghostPink).y -= 1;
  }
  checkLoss()
}, 800)

setInterval(() => {
  cyanRandom = Math.floor(Math.random()*(max-min+1)+min);
  if (cyanRandom == 1) {
  getFirst(ghostCyan).x += 1;
  }
  else if (cyanRandom == 2) {
  getFirst(ghostCyan).x -= 1;
  }
  else if (cyanRandom == 3) {
  getFirst(ghostCyan).y += 1;
  }
  else {
  getFirst(ghostCyan).y -= 1;
  }
  checkLoss()
}, 800)

/* lose */

function checkLoss() {
  if (tilesWith(pacRight, ghostRed).length == 1) {
       setMap(map`
sw.................ws
ww...www.www.w.w...ww
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
ww.p.............q.ww
sw.................ws`);
  }
  else if (tilesWith(pacRight, ghostOrange).length == 1) {
       setMap(map`
sw.................ws
ww...www.www.w.w...ww
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
ww.p.............q.ww
sw.................ws`);
  }
  else if (tilesWith(pacRight, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacRight, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  
    if (tilesWith(pacLeft, ghostRed).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacLeft, ghostOrange).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacLeft, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacLeft, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }

    if (tilesWith(pacUp, ghostRed).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacUp, ghostOrange).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacUp, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacUp, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }

    if (tilesWith(pacDown, ghostRed).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacDown, ghostOrange).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacDown, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
  else if (tilesWith(pacDown, ghostPink).length == 1) {
       setMap(map`
.....................
.....www.www.w.w.....
......w..w.w..w......
......w..www..w......
.i.c..w..ww...w..r.o.
......w..w.w..w......
.....................
.....................
.www.www.www.www.www.
.w.w.w...w.w..w..w.w.
.www.w.w.www..w..w.w.
.w.w.w.w.w.w..w..w.w.
.w.w.www.w.w.www.w.w.
.....................
.....................
..p................ww
...................ws`);
  }
}

/* win condition */

afterInput(() => {
  const starNumber = tilesWith(star).length;
  
  if (starNumber == 0) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      playback.end()
      setMap(map`
............................
.w.w.www.w.w..w.w.www.www.w.
.w.w.w.w.w.w..w.w..w..w.w.w.
..w..w.w.w.w..w.w..w..w.w.w.
..w..w.w.w.w..www..w..w.w...
..w..www.www..w.w.www.w.w.w.
............................
............................
............................
............................
............................
............................
............................
........s....p....s.........
........w....w....w.........
........w...www...w.........
........w..wwwww..w.........
........w.wwwwwww.w.........`);
      
    }
  }
});



