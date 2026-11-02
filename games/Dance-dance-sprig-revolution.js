const lefttouch = "o";
const left = "l";
const up = "u";
const uptouch = "j";
const downtouch = `e`;
const down = `d`;
const righttouch = "f";
const right = "r";
const testsong = map`
........
..ojef..
........
........
........
........
........`;

var score = 0;

const song1sequence = [
  "l", ".", ["l", "u"], ".", ".", ".", "r", ".", ["d", "r"], ".", 
  ".", ".", "u", ".", ["u", "d"], ".", ".", ".", "r", "d", 
  "u", "u", ".", "l", "d", "l", ".", "r", "u", "r", 
  "r", ".", "d", "u", "u", "d", "l", "l", "d", ".",
  "l", ".", "u", ".", "d", ".", "r", ".", ["l", "r"], ".",
  ".", "l", "l", "u", "u", "d", "d", "r", "r", ".",
  "l", "u", "d", "r", ".", "l", "u", "d", "r", ".",
  ["l", "d"], ".", ["u", "r"], ".", ["l", "u"], ".", ["d", "r"], ".", ".", ".",
  "l", "u", "l", "u", "d", "r", "d", "r", ["l", "u", "d", "r"], ".",
  ".", ".", ".", "l", ".", "u", ".", "d", ".", "r"
];

const song2sequence = [
  "u", "d", "l", "r", ".", "u", "d", ["l", "r"], ".", "l", 
  "l", "r", "r", ".", ["u", "l"], ["d", "r"], ".", "l", "u", "d",
  "r", ".", "r", "d", "u", "l", ".", "l", "u", "d",
  "r", "u", "d", "l", "r", ".", "u", "u", "d", "d",
  "l", "l", "r", "r", ".", "l", "u", "d", "r", "l",
  "u", "d", "r", ".", "r", "d", "u", "l", "r", "d",
  "u", "l", ".", ["l", "u"], ["u", "d"], ["d", "r"], ".", "l", "r", "l",
  "r", ".", "u", "d", "u", "d", ".", ["l", "d"], ["u", "r"], ".",
  "l", "u", "d", "r", "l", "u", "d", "r", "l", "u",
  "d", "r", "l", "u", "d", "r", ["l", "u", "d", "r"], ".", ".", "."
];

const song3sequence = [
  "r", "d", "u", "l", ".", "l", "u", "d", "r", ".", 
  "l", "d", "u", "r", "r", ".", ["u", "r"], ".", ["l", "d"], ".",
  ["u", "l"], ".", ["d", "r"], ".", ["l", "r"], ".", ["u", "d"], ".", ".", ".",
  ["l", "u"], ["l", "u"], ".", ["d", "r"], ["d", "r"], ".", ["l", "d"], ["u", "r"], ".", ".",
  "l", ".", "r", ".", ["l", "r"], ".", "u", ".", "d", ".",
  ["u", "d"], ".", ["l", "u", "d"], ".", ["u", "d", "r"], ".", ["l", "u", "d", "r"], ".", ".", ".",
  "l", "l", ".", "u", "u", ".", "d", "d", ".", "r",
  "r", ".", ["l", "u"], ".", ["d", "r"], ".", ["l", "d"], ".", ["u", "r"], ".",
  "u", "u", "u", "d", "d", "d", "l", "l", "l", "r",
  "r", "r", ["l", "u"], ["d", "r"], ["l", "u"], ["d", "r"], ["l", "u", "d", "r"], ".", ".", "."
];

let gamestate = "menu"; 
let currentsongindex = 0; 
let sequence = [];
let sequenceindex = 0;

const leftsound = tune`
500: F5/500,
15500`
const rightsound = tune`
500: E5/500,
15500`
const upsound = tune`
500: D5/500,
15500`
const downsound = tune`
500: C5/500,
15500`

setLegend(
  [ left, bitmap`
................
................
.........LL.....
......LLLLL.....
....LLLLL.......
..LLLLL.........
.LLL............
LL..............
LLLLLLLLLLLLLLLL
LL..............
.LLLLL..........
..LLLLLLLL......
.....LLLLLLL....
..........LL....
................
................` ],

  [up,bitmap`
......LLL.......
.....LLLLL......
.....L.L.LL.....
....LL.L.LL.....
...LL..L..LL....
..LL...L...LL...
..LL...L....LL..
.LL....L....LL..
LL.....L.....LL.
.......L......LL
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........`],

  [down,bitmap`
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L.......L
L......L......LL
LL.....L.....LL.
.LL....L....LL..
..LL...L...LL...
...LL..L..LL....
...LL..L..LL....
....LL.L.LL.....
.....LLLLL......
......LLL.......`],

  [ right, bitmap`
................
................
....11..........
....1111111.....
......11111111..
..........11111.
..............11
1111111111111111
..............11
............111.
.........11111..
.......11111....
.....11111......
.....11.........
................
................` ],


  [ lefttouch, bitmap`
................
................
.........44.....
......44444.....
....44444.......
..44444.........
.444............
44..............
4444444444444444
44..............
.44444..........
..44444444......
.....4444444....
..........44....
................
................` ],

  [uptouch,bitmap`
......777.......
.....77777......
.....7.7.77.....
....77.7.77.....
...77..7..77....
..77...7...77...
..77...7....77..
.77....7....77..
77.....7.....77.
.......7......77
.......7........
.......7........
.......7........
.......7........
.......7........
.......7........`],

  [downtouch,bitmap`
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3.......3
3......3......33
33.....3.....33.
.33....3....33..
..33...3...33...
...33..3..33....
...33..3..33....
....33.3.33.....
.....33333......
......333.......`],

  [ righttouch, bitmap`
................
................
....99..........
....9999999.....
......99999999..
..........99999.
..............99
9999999999999999
..............99
............999.
.........99999..
.......99999....
.....99999......
.....99.........
................
................` ],
)

function drawmenu() {
  clearText();
  addText("welcome!", { x: 4, y: 1, color: color`3` });
  addText("w/s to choose", { x: 2, y: 3, color: color`0` });
  addText("d to start", { x: 4, y: 4, color: color`0` });
  
  if (currentsongindex === 0) {
    addText("> song 1", { x: 3, y: 6, color: color`4` });
    addText("  song 2", { x: 3, y: 7, color: color`3` });
    addText("  song 3", { x: 3, y: 8, color: color`3` });
  } else if (currentsongindex === 1) {
    addText("  song 1", { x: 3, y: 6, color: color`3` });
    addText("> song 2", { x: 3, y: 7, color: color`4` });
    addText("  song 3", { x: 3, y: 8, color: color`3` });
  } else {
    addText("  song 1", { x: 3, y: 6, color: color`3` });
    addText("  song 2", { x: 3, y: 7, color: color`3` });
    addText("> song 3", { x: 3, y: 8, color: color`4` });
  }
}

function updatescoredisplay() {
  clearText();
  addText(`score: ${score}`, { x: 2, y: 0, color: color`3` });
}

function startsong() {
  score = 0;
  sequenceindex = 0;
  if (currentsongindex === 0) {
    sequence = song1sequence;
  } else if (currentsongindex === 1) {
    sequence = song2sequence;
  } else {
    sequence = song3sequence;
  }
  gamestate = "playing";
  setMap(testsong);
  updatescoredisplay();
}

setMap(testsong);
drawmenu();

function gameTick() {
  if (gamestate !== "playing") return;

  const arrows = [...getAll(left), ...getAll(up), ...getAll(down), ...getAll(right)];
  for (let arrow of arrows) {
    arrow.y -= 1;
    if (arrow.y === 0) {
      arrow.remove();
      score -= 1;
      updatescoredisplay();
    }
  }

  if (sequenceindex < sequence.length) {
    const nextspawn = sequence[sequenceindex];
    
    if (Array.isArray(nextspawn)) {
      for (let note of nextspawn) {
        if (note === "l") addSprite(2, 6, left);
        if (note === "u") addSprite(3, 6, up);
        if (note === "d") addSprite(4, 6, down);
        if (note === "r") addSprite(5, 6, right);
      }
    } else {
      if (nextspawn === "l") addSprite(2, 6, left);
      if (nextspawn === "u") addSprite(3, 6, up);
      if (nextspawn === "d") addSprite(4, 6, down);
      if (nextspawn === "r") addSprite(5, 6, right);
    }
    
    sequenceindex++;
  } else if (arrows.length === 0) {
    gamestate = "menu";
    drawmenu();
  }
}

onInput("a", () => {
  if (gamestate !== "playing") return;
  let lefts = getAll(left);
  for (let i in lefts) {
    if (lefts[i].y === 1) {
      lefts[i].remove();
      score += 1;
      updatescoredisplay();
      playTune(leftsound);
    }
  }
});

onInput("w", () => {
  if (gamestate === "menu") {
    currentsongindex--;
    if (currentsongindex < 0) currentsongindex = 2;
    drawmenu();
  } else {
    let ups = getAll(up);
    for (let i in ups) {
      if (ups[i].y === 1) {
        ups[i].remove();
        score += 1;
        updatescoredisplay();
        playTune(upsound);
      }
    }
  }
});

onInput("s", () => {
  if (gamestate === "menu") {
    currentsongindex++;
    if (currentsongindex > 2) currentsongindex = 0;
    drawmenu();
  } else {
    let downs = getAll(down);
    for (let i in downs) {
      if (downs[i].y === 1) {
        downs[i].remove();
        score += 1;
        updatescoredisplay();
        playTune(downsound);
      }
    }
  }
});

onInput("d", () => {
  if (gamestate === "menu") {
    startsong();
  } else {
    let rights = getAll(right);
    for (let i in rights) {
      if (rights[i].y === 1) {
        rights[i].remove();
        score += 1;
        updatescoredisplay();
        playTune(rightsound);
      }
    }
  }
});

setInterval(gameTick, 300);
