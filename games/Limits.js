/*
@title: Limits
@author: Nathan Pease
@tags: ['puzzle']
@addedOn: 2022-09-15
*/

/*
CONTROLS:
  Game Nav:
    W - move up
    S - move down
    A - move left
    D - move right
    J - restart level
  Menu Nav:
    I - navegate menu up
    K - navegate menu down
    J - navegate menu left
    L - navegate menu right
    S - select option
*/

// Sprites
const player = "p";
const bluePortal = "b";
const redPortal = "r";
const win = "w";
const solid = "s";
const move = "m";
const ui = "u";
const selectLeft = "z";
const selectRight = "x";
const selectMiddle = "c";

// Tunes
const music = tune`
252.10084033613447: g4~252.10084033613447,
252.10084033613447: g4~252.10084033613447,
252.10084033613447: e4~252.10084033613447,
252.10084033613447: e4~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: g4~252.10084033613447,
252.10084033613447: g4~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: a5~252.10084033613447,
252.10084033613447: a5~252.10084033613447,
252.10084033613447: a5~252.10084033613447,
252.10084033613447: f5~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: b4~252.10084033613447`;
const pickUp = tune`
30,
30: d4-30,
120,
30: b5-30,
750`;

// Primitive types
let moves = 20;
let selected = 0;
const menu = true;

setLegend(
  [ player, bitmap`
................
......00000.....
.....0222220....
.....0202020....
.....0202020....
.....0222220....
......01210.....
....001111100...
....011111110...
...00111111100..
..0220111110220.
..0220111110220.
...00555555500..
.....0550550....
.....0550550....
......00.00.....`],
  [solid, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [bluePortal, bitmap`
................
.....000000.....
....05555550....
...0555555570...
..055555555570..
..055555555750..
..055555555570..
..055555555750..
..055555555570..
..055555555750..
..055555557570..
..055555575750..
...0555575750...
....05575750....
.....000000.....
................`],
  [redPortal, bitmap`
................
.....000000.....
....03333330....
...0333333360...
..033333333360..
..033333333630..
..033333333360..
..033333333630..
..033333333360..
..033333333630..
..033333336360..
..033333363630..
...0333363630...
....03363630....
.....000000.....
................`],
  [win, bitmap`
................
.LL.LLLLLLLL.LL.
.L.4444444444.L.
..444444444444..
.L444444444444L.
.L444444444444L.
.L444444444444L.
.L444444444444L.
.L444444444444L.
.L444444444444L.
.L444444444444L.
.L444444444444L.
..444444444444..
.L.4444444444.L.
.LL.LLLLLLLL.LL.
................`],
  [move, bitmap`
................
.....LLLLLL.....
...LL666666LL...
..L6666666666L..
..L6666666666L..
.L666666666636L.
.L666666666663L.
.L666666666636L.
.L666666666663L.
.L666666666636L.
.L666666666363L.
..L6666666363L..
..L6666663636L..
...LL666363LL...
.....LLLLLL.....
................`],
  [ui, bitmap`
................
................
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [selectLeft, bitmap`
................
................
................
................
................
................
1111111111111111
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1111111111111111`],
  [selectRight, bitmap`
................
................
................
................
................
................
1111111111111111
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
1111111111111111`],
  [selectMiddle, bitmap`
................
................
................
................
................
................
1111111111111111
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1111111111111111`],
);

setSolids([player, solid]);

let level = 0;
const levels = [
  map`
.........
.........
.........
.........
.........`, // main menu
  map`
p.........
.s.ssssss.
.s.s.s.s..
.s.s.s...s
.sss.s.s..
..s....ss.
s...ss.s..
ssssss...s
.sss.s.s..
.......s.w`,
  map`
.....p....
sssssssss.
..........
bsssssssss
..........
sssssssss.
..........
.sssssssss
......r...
sssssssssw`,
  map`
p.........
sssssssss.
sssssssss.
sssssssss.
sssssssss.
sssssssss.
wssssssss.
.ssssssss.
.ssssssss.
.......m..`,
  map`
p.........
sss.sss.ss
s.s.s.s.s.
s.sms.s...
s.sss.sss.
b.........
.sssssssss
.ssswr....
.sssssss..
..........`,
  map`
p.........
s.s.s.s.s.
sbsbsbsbsb
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
sssssssr.w`,
  map`
rs........
.ss.s.ssss
.ss.ss....
.ss.ssssm.
..........
sss.sssss.
....ss....
.ssss..s..
......ssss
sssswssp.b`,
  map`
..........
.b..b...b.
......b...
..........
...b...b..
b.........
.....p..b.
..........
.b.....sss
.....bmsrw`,
  map`
ps.......w
.sr....s..
.sssssss.s
...s...s..
.s.s.s...b
.s...s.s..
...s.s.sss
ss.s.s....
ss.ssssss.
ssm.......`,
  map`
s..sb...ss
s.sssss...
s.s...s.s.
s...sss.ss
s...sps.sm
..s.s.s.s.
.ss.....s.
..s..s....
s.sssssss.
r......ws.`,
  map`
ps...s....
.s.s..ms.s
.s.s.sss.s
...s.sws.s
ssss.s.sss
b....s....
s.ssss.s.s
s......s.s
s.sss.ss..
m...sr...s`,
  map`
.........
.........
.........
.........
.........`, // win screen
  map`
......
......
......
......
......`, // level select
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

playTune(music, Infinity);
addText("Play", {y: 6, color: color`4`});
addText("Level Select", {y: 9, color: color`0`});

//addText(moves.toString(), { x: 1, y: 1, color: color`3` });

onInput("w", () => {
  if (moves >= 1 && getFirst(player)) {
    getFirst(player).y -= 1
    moves -= 1;
  } 
});
  
onInput("a", () => {
  if (moves >= 1 && getFirst(player)) {
    getFirst(player).x -= 1
    moves -= 1;
  }
});
  
onInput("d", () => {
  if (moves >= 1 && getFirst(player)) {
    getFirst(player).x += 1
    moves -= 1;
  }
});
  
onInput("s", () => {
  if (level == 0 && selected == 0) {
    level += 1;
    setMap(levels[level]);
  }
  else if (level == 0 && selected == 1) {
    selected = 0;
    level = 12;
    setMap(levels[level]);
  }
  else if (level == 11) {
    level = 0;
    setMap(levels[level]);
    clearText();
    addText("Play", {y: 6, color: color`4`});
    addText("Level Select", {y: 9, color: color`0`});
  }
  else if (level == 12) {
    level = selected + 1;
    setMap(levels[selected + 1]);
  }
  else if (moves >= 1 && getFirst(player)) {
    getFirst(player).y += 1
    moves -= 1;
  }
});

onInput("j", () => {
  if (level != 0 && level != 11 && level != 12) {
    setMap(levels[level]);
    moves = 20;
  }
  else if (level == 12) {
    selected -= 1;
    if (selected < 0) {
      selected  = 0;
    }
  }
});

onInput("k", () => {
  if (level == 0) {
    selected = 1;
  }
  else if (level == 12) {
    if (selected < 5) {
      selected  += 5;
    }
    if (selected > 9) {
      selected = 9;
    }
  }
});

onInput("i", () => {
  if (level == 0) {
    selected = 0;
  }
  else if (level == 12) {
    if (selected > 4) {
      selected -= 5; 
    }
    if (selected < 0) {
      selected = 0;
    }
  }
});

onInput("l", () => {
  if (level == 12) {
    selected += 1;
    if (selected > 9) {
      selected = 9;
    }
  }
});

afterInput(() => {
  

  if (getFirst(bluePortal) && getFirst(player) && getFirst(player).x == getFirst(bluePortal).x) {
    if (getFirst(player).y == getFirst(bluePortal).y) {
      setSolids([solid]);
      getFirst(player).x = getFirst(redPortal).x;
      getFirst(player).y = getFirst(redPortal).y;
      setSolids([player, solid]);
    }
  }
  else if (getFirst(redPortal) && getFirst(player) && getFirst(player).x == getFirst(redPortal).x) {
    if (getFirst(player).y == getFirst(redPortal).y) {
      setSolids([solid]);
      getFirst(player).x = getFirst(bluePortal).x;
      getFirst(player).y = getFirst(bluePortal).y;
      setSolids([player, solid]);
    }
  }
 
  if (getFirst(player) && getFirst(move) && getFirst(player).x == getFirst(move).x) {
    if (getFirst(player).y == getFirst(move).y) {
      moves += 10;
      let x = getFirst(player).x;
      let y = getFirst(player).y;
      playTune(pickUp);
      clearTile(x, y);
      addSprite(x, y, player);
    }
  }



  if (getFirst(player) && getFirst(win) && getFirst(player).x == getFirst(win).x) {
    if (getFirst(player).y == getFirst(win).y) {
      level += 1;
      setMap(levels[level]);
      moves = 20;
    }
  }


  if (level != 0 && level != 12) {
    clearText();
    addText(moves.toString(), { x: 1, y: 1, color: color`3` });    
  }
  if (level == 11) {
    addText("You Win!", {y: 8, color: color`0`});  
  } 
  else if (level == 12) {
    clearText();
    addText("1", {x: 2, y: 6, color: color`0`});
    addText("2", {x: 5, y: 6, color: color`0`});
    addText("3", {x: 9, y: 6, color: color`0`});
    addText("4", {x: 13, y: 6, color: color`0`});
    addText("5", {x: 17, y: 6, color: color`0`});
    
    addText("6", {x: 2, y: 11, color: color`0`});
    addText("7", {x: 5, y: 11, color: color`0`});
    addText("8", {x: 9, y: 11, color: color`0`});
    addText("9", {x: 13, y: 11, color: color`0`});
    addText("10", {x: 17, y: 11, color: color`0`});
  }

  if (level == 0) {
    if (selected == 0) {
      clearText();
      addText("Play", {y: 6, color: color`4`});
      addText("Level Select", {y: 9, color: color`0`});
    } else if (selected == 1) {
      clearText();
      addText("Play", {y: 6, color: color`0`});
      addText("Level Select", {y: 9, color: color`4`});
    }
  }
  else if (level == 12) {
    switch(selected) {
      case 0:
        addText("1", {x: 2, y: 6, color: color`4`});
        break;
      case 1:
        addText("2", {x: 5, y: 6, color: color`4`});
        break;
      case 2:
        addText("3", {x: 9, y: 6, color: color`4`});
        break;
      case 3:
        addText("4", {x: 13, y: 6, color: color`4`});
        break;
      case 4:
        addText("5", {x: 17, y: 6, color: color`4`});
        break;
      case 5:
        addText("6", {x: 2, y: 11, color: color`4`});
        break;
      case 6:
        addText("7", {x: 5, y: 11, color: color`4`});
        break;
      case 7:
        addText("8", {x: 9, y: 11, color: color`4`});
        break;
      case 8:
        addText("9", {x: 13, y: 11, color: color`4`});
        break;
      case 9:
        addText("10", {x: 17, y: 11, color: color`4`});
        break;
    }
  }
});
