
/* 
@title: Swapper
@author: RaidTheWeb
@tags: []
@addedOn: 2023-10-18
*/

    /*
A game featuring simple puzzles involving a swapping mechanic, can be played alone or with a friend. An introductory adventure of mine into Sprig game development.
*/

const player1 = "p"; // player 1
const player2 = "q"; // player 2
const wall = "w"; // immovable wall
const button = "b"; // button
const portala = "r"; // portal A
const portalb = "t"; // portal B
const doorv = "d"; // vertical door
const doorh = "e"; // horizontal door
const wincondition = "x"; // win condition (goal)
const finalwincondition = "f"; // final win condition (end goal)
const box = "o"; // box (moveable)
const redo = "&"; // redo level (in case we break stuff with the boxes)
const bg = "-"; // background
const red = "/"; // death itself

setLegend(
  [player1, bitmap`
................
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
................`],
  [player2, bitmap`
................
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
................`],
  [wall, bitmap`
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
  [box, bitmap`
1111111111111111
11CCCCCCCCCCCC11
1C1CCCCCCCCCC1C1
1CC1CCCCCCCC1CC1
1CCC1CCCCCC1CCC1
1CCCC1CCCC1CCCC1
1CCCCC1CC1CCCCC1
1CCCCCC11CCCCCC1
1CCCCCC11CCCCCC1
1CCCCC1CC1CCCCC1
1CCCC1CCCC1CCCC1
1CCC1CCCCCC1CCC1
1CC1CCCCCCCC1CC1
1C1CCCCCCCCCC1C1
11CCCCCCCCCCCC11
1111111111111111`],
  [redo, bitmap`
................
................
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HH........HH..
..HH.......HHHH.
..HH........HH..
..HH............
..HH............
..HH............
..HH........HH..
..HH........HH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
................
................`],
  [button, bitmap`
1111111111111111
11LLLLLLLLLLLL11
1LL3333333333LL1
1L333333333333L1
1L332222222233L1
1L332333333233L1
1L332333333233L1
1L332333333233L1
1L332333333233L1
1L332333333233L1
1L332333333233L1
1L332222222233L1
1L333333333333L1
1LL3333333333LL1
11LLLLLLLLLLLL11
1111111111111111`],
  [portala, bitmap`
................
....22222222....
...2777777772...
..277777777772..
.27777777777772.
.27777777777772.
.27777777777772.
.27777777777772.
.27777777777772.
.27777777777772.
.27777777777772.
.27777777777772.
..277777777772..
...2777777772...
....22222222....
................`],
  [portalb, bitmap`
................
....22222222....
...2999999992...
..299999999992..
.29999999999992.
.29999999999992.
.29999999999992.
.29999999999992.
.29999999999992.
.29999999999992.
.29999999999992.
.29999999999992.
..299999999992..
...2999999992...
....22222222....
................`],
  [doorv, bitmap`
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...`],
  [doorh, bitmap`
................
................
................
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
................
................
................`],
  [wincondition, bitmap`
................
................
.....6.66.......
.....6.66666....
.....6.666666...
.....6.66666....
.....6.66.......
.....6..........
.....6..........
.....6..........
.....6..........
.....6..........
.....6..........
.....6..........
.....6..........
.....6..........`],
  [finalwincondition, bitmap`
................
................
.....H.HH.......
.....H.HHHHH....
.....H.HHHHHH...
.....H.HHHHH....
.....H.HH.......
.....H..........
.....H..........
.....H..........
.....H..........
.....H..........
.....H..........
.....H..........
.....H..........
.....H..........`],
  [bg, bitmap`
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
0000000000000000`],
  [red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
);

setSolids([player1, player2, wall, doorv, doorh, box]);

// SFX:
const buttonpress = tune`
120: E4-120,
3720`;
const menutheme = tune`
230.76923076923077: G4-230.76923076923077,
230.76923076923077,
230.76923076923077: B4-230.76923076923077,
230.76923076923077: F5/230.76923076923077,
230.76923076923077,
230.76923076923077: A4-230.76923076923077,
230.76923076923077,
230.76923076923077: E5-230.76923076923077,
230.76923076923077: A5/230.76923076923077,
230.76923076923077,
230.76923076923077: B4-230.76923076923077,
230.76923076923077: F5/230.76923076923077,
461.53846153846155,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: A4-230.76923076923077,
230.76923076923077: G5/230.76923076923077,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: G4-230.76923076923077,
230.76923076923077: F5/230.76923076923077,
230.76923076923077,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: A4-230.76923076923077,
230.76923076923077: A4-230.76923076923077,
230.76923076923077: F5/230.76923076923077,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: E5/230.76923076923077,
230.76923076923077: D5-230.76923076923077,
230.76923076923077: A5/230.76923076923077,
230.76923076923077: C5-230.76923076923077,
230.76923076923077: B4/230.76923076923077,
230.76923076923077`;
const victorytheme = tune`
230.76923076923077: D5^230.76923076923077,
230.76923076923077: C5^230.76923076923077 + F5^230.76923076923077,
230.76923076923077: C5^230.76923076923077,
230.76923076923077: C5^230.76923076923077 + F5^230.76923076923077,
230.76923076923077: D5^230.76923076923077,
230.76923076923077: F5^230.76923076923077 + C5^230.76923076923077,
230.76923076923077: E5^230.76923076923077 + B4^230.76923076923077,
5769.2307692307695`;
const maintheme = tune`
3000: A4^3000,
3000: B4^3000,
3000: G4^3000,
3000: A4^3000,
3000: B4^3000,
3000: A4^3000,
3000: G4^3000,
3000: B4^3000,
3000: A4^3000,
3000: B4^3000,
3000: A4^3000,
3000: B4^3000,
3000: C5^3000,
3000: B4^3000,
3000: A4^3000,
3000: G4^3000,
3000: A4^3000,
3000: B4^3000,
3000: A4^3000,
3000: B4^3000,
3000: G4^3000,
3000: A4^3000,
3000: B4^3000,
3000: A4^3000,
3000: G4^3000,
3000: A4^3000,
3000: B4^3000,
3000: A4^3000,
3000: G4^3000,
3000: B4^3000,
3000: A4^3000,
3000: B4^3000`;
const death = tune`
10000: G4^10000 + F4^10000 + E4^10000 + D4^10000 + C4^10000,
310000`;
const portal = tune`
2142.8571428571427: C5/2142.8571428571427,
66428.57142857142`;

const ONE_PLAYER = 0;
const TWO_PLAYER = 1;
let mode = ONE_PLAYER;
let inputsallowed = true;
let swapped = false;
let level = 0;
let menuplayback = null;
let gameplayback = null;
let mainplayback = null;

function sfxplayback(sfx) {
  if (gameplayback != null) {
    gameplayback.end();
  }
  gameplayback = playTune(sfx);
} 
const levels = [
  map`
...
...`, // used for menu backgrounds
  map`
wwwwwwwwwwwwwww
wp....bwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwx..d..ww
wwwwwwwwwwwwqww
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wwwwwbww...d..bw
wp....d..wwwww.w
wwwwwwwwwww.bw.w
wqd......bw.wwew
wwwbwwewwww.w..w
wwwwww.wwww...ww
wwwwww.w.ww.wwww
w.d......wwwwwww
wxwwwwwwbwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.&..b..wwwwwwww
w.........d...ww
w..o....wwwww.ww
wp......wwwwweww
wwwwwwwwwwwwweww
w.........wwwxww
w.o.b...b.wwwwww
w.........wwwwww
wq....&...wwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wb..o....w&...pw
w...w..&.w.o.b.w
w...w....w.....w
w...w.wwwwwwww.w
w...d.d.xwwwwwew
wwewwwwwwwwwww.w
w......wb..w...w
w......w...d...w
wq.....w...w..bw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w&....www......w
w.p.o.wwwr..b.bw
w.....wwwwwwwwww
w.....wwwwb.wwww
w..t..wwww..d.ww
wewwwwwwwwwwweww
wxwwwwwwwww....w
wwwwwwwwwww..q.w
wwwwwwwwwww....w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wb..o...wwwwwwww
w.&.w...w...wwww
w...w...w.b.wwww
w...w.www...wwww
wp..d.d.....wwww
wwwwwwwwwwwwwwww
w.....wwwwwwwwww
wq..wewwww.b.www
w...wrwwwwt..dxw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
w....w........w...&w
w.t..d...o....d....w
w....w........w....w
wwwwww........w....w
w&.......wwwwww..b.w
w........w..b.d....w
w.o...b..w....w....w
w........wwwwwwwwwww
wwwwwwwwwwb..o.....w
w&.......w...w.....w
w......r.w...w.....w
w..p.....w...d...wew
wb.......wq..w...wxw
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wb.o.w..w...w.....ww
w.&w.w.bw&.ow.b...ww
wp.d.d............ww
wwwwwwwwwwwwwwwwewww
w....w...w....&wewww
wq.wew.b.d...o.w.www
wwwwrwt..w.b...w.www
wbwwwwwwww...b.w.www
wew.wb...d.....w.www
w...w....wwwwwww.www
w.o.w....w.........w
w...d.b..wew.......w
w...w....wfw.......w
wwwwwwwwwwwwwwwwwwww`
];

const levelbuttons = [
  [],
  [ // level 1
    { x: 6, y: 1, activates: [{ x: 10, y: 8, type: doorv }] }
  ],
  [ // level 2
    { x: 5, y: 1, activates: [{ x: 2, y: 4, type: doorv }] },
    { x: 3, y: 5, activates: [{ x: 6, y: 2, type: doorv }] },
    { x: 9, y: 4, activates: [{ x: 11, y: 1, type: doorv }] },
    { x: 14, y: 1, activates: [{ x: 6, y: 5, type: doorh }] },
    { x: 8, y: 9, activates: [{ x: 14, y: 4, type: doorh }] },
    { x: 12, y: 3, activates: [{ x: 2, y: 8, type: doorv }] }
  ],
  [ // level 3
    { x: 5, y: 1, activates: [{ x: 10, y: 2, type: doorv }] },
    { x: 4, y: 7, activates: [{ x: 13, y: 4, type: doorh }] },
    { x: 8, y: 7, activates: [{ x: 13, y: 5, type: doorh }] }
  ],
  [ // level 4
    { x: 13, y: 2, activates: [{ x: 14, y: 5, type: doorh }] },
    { x: 14, y: 9, activates: [{ x: 2, y: 6, type: doorh }] },
    { x: 1, y: 1, activates: [{ x: 6, y: 5, type: doorv }, { x: 11, y: 8, type: doorv }] },
    { x: 8, y: 7, activates: [{ x: 4, y: 5, type: doorv }] }
  ],
  [ // level 5
    { x: 12, y: 2, activates: [{ x: 13, y: 6, type: doorh }] },
    { x: 14, y: 2, activates: [{ x: 12, y: 5, type: doorv }] },
    { x: 10, y: 4, activates: [{ x: 1, y: 6, type: doorh }] }
  ],
  [ // level 6
    { x: 1, y: 1, activates: [{ x: 6, y: 5, type: doorv }, { x: 5, y: 8, type: doorh }] },
    { x: 11, y: 8, activates: [{ x: 4, y: 5, type: doorv }] },
    { x: 10, y: 3, activates: [{ x: 13, y: 9, type: doorv }] }
  ],
  [ // level 7
    { x: 10, y: 9, activates: [{ x: 5, y: 2, type: doorv }] },
    { x: 6, y: 7, activates: [{ x: 14, y: 2, type: doorv }] },
    { x: 1, y: 13, activates: [{ x: 13, y: 12, type: doorv }] },
    { x: 17, y: 5, activates: [{ x: 14, y: 6, type: doorv }] },
    { x: 12, y: 6, activates: [{ x: 18, y: 12, type: doorh }] },
  ],
  [ // level 8
    { x: 1, y: 1, activates: [{ x: 5, y: 3, type: doorv }, { x: 4, y: 6, type: doorh }] },
    { x: 7, y: 6, activates: [{ x: 3, y: 3, type: doorv }] },
    { x: 7, y: 2, activates: [{ x: 9, y: 6, type: doorv }] },
    { x: 11, y: 7, activates: [{ x: 16, y: 4, type: doorh }] },
    { x: 13, y: 8, activates: [{ x: 16, y: 5, type: doorh }] },
    { x: 14, y: 2, activates: [{ x: 9, y: 9, type: doorv }] },
    { x: 6, y: 12, activates: [{ x: 1, y: 9, type: doorh }] },
    { x: 1, y: 8, activates: [{ x: 10, y: 12, type: doorh }] },
    { x: 5, y: 9, activates: [{ x: 4, y: 12, type: doorv }] }
  ],
];

const levelportals = [
  [],
  [], // level 1
  [], // level 2
  [], // level 3
  [], // level 4
  [  // level 5
    { x: 3, y: 5, dest: { x: 10, y: 2 }, boxdest: { x: 11, y: 2 } },
    { x: 9, y: 2, dest: { x: 2, y: 5 }, boxdest: { x: 3, y: 3 } }
  ],
  [ // level 6
    { x: 5, y: 9, dest: { x: 11, y: 9 }, boxdest: { x: 0, y: 0 } },
    { x: 10, y: 9, dest: { x: 5, y: 8 }, boxdest: { x: 0, y: 0 } }
  ],
  [ // level 7
    { x: 7, y: 11, dest: { x: 3, y: 2 }, boxdest: { x: 4, y: 2 } },
    { x: 2, y: 2, dest: { x: 6, y: 11 }, boxdest: { x: 5, y: 11 } },
  ],
  [ // level 8
    { x: 4, y: 7, dest: { x: 6, y: 6 }, boxdest: { x: 6, y: 5 } },
    { x: 6, y: 7, dest: { x: 4, y: 6 }, boxdest: { x: 4, y: 5 } }
  ],
  []
];

setMap(levels[level]);

setPushables({
  [player1]: [box],
  [player2]: [box]
});

function spritesat(x, y, type) {
  var sprites = getTile(x, y);
  for (var i = 0; i < sprites.length; i++) {
    for (var j = 0; j < type.length; j++) {
      if (sprites[i].type == type[j]) {
        return true;
      }
    }
  }
}

function resetafterdeath() {
  setBackground(bg);
  levelinit();
  mainplayback = playTune(maintheme, Infinity);
}

function killcrush() {
  setMap(levels[0]);
  setBackground(red);
  mainplayback.end();
  addText("Crushed!", { x: 5, y: 6, color: color`2` });
  sfxplayback(death);
  setTimeout(resetafterdeath, 4000);
}

function buttonlogic(x, y, i) {
  var buttons = levelbuttons[level];
  if (spritesat(x, y, [player1, player2, box])) { // if a player or box is colliding with this button
    var activates = buttons[i].activates;
    for (var i = 0; i < activates.length; i++) {
      var target = null;
      if (activates[i].type == doorv || activates[i].type == doorh) {
        var sprites = getTile(activates[i].x, activates[i].y);
        for (var j = 0; j < sprites.length; j++) {
          if (sprites[j].type == doorv || sprites[j].type == doorh) {
            target = sprites[j];
            break;
          }
        }
        if (target) {
          sfxplayback(buttonpress);
          target.remove();
        }
      }
    }
    return true;
  } else { // if there is nothing here we check to make sure that the door this button opens is closed
    var activates = buttons[i].activates;
    for (var i = 0; i < activates.length; i++) {
      var target = null;
      if (activates[i].type == doorv || activates[i].type == doorh) {
        var sprites = getTile(activates[i].x, activates[i].y);
        var playerthere = false;
        for (var j = 0; j < sprites.length; j++) {
          if (sprites[j].type == player1 || sprites[j].type == player2) {
            playerthere = true;
          }
          if (sprites[j].type == doorv || sprites[j].type == doorh) {
            target = sprites[j];
            break;
          }
        }
        if (!target) {
          addSprite(activates[i].x, activates[i].y, activates[i].type);
          if (playerthere) { // crush them!!!!
            setTimeout(killcrush, 400);
          }
        }
      }
    }
  }
}

function portallogic(x, y, i) {
  if (spritesat(x, y, [player1, player2, box])) {
    var target = levelportals[level][i];
    var sprites = getTile(x, y);
    for (var j = 0; j < sprites.length; j++) {
      if (sprites[j].type == player1 || sprites[j].type == player2) {
        sprites[j].x = target.dest.x;
        sprites[j].y = target.dest.y;
        sfxplayback(portal);
        return;
      } else if (sprites[j].type == box) {
        sprites[j].x = target.boxdest.x;
        sprites[j].y = target.boxdest.y;
        sfxplayback(portal);
        return;
      }
    }

  }
}

function levelinit() {
  inputsallowed = true;
  setMap(levels[level]);
  clearText();
}

function nextlevel() {
  level++;
  levelinit();
}

function resumetheme() {
  mainplayback = playTune(maintheme, Infinity);
}

function win() {
  inputsallowed = false;
  addText("Level Complete!", { x: 2, y: 6, color: color`2` });
  mainplayback.end();
  playTune(victorytheme);
  setTimeout(nextlevel, 2000);
  setTimeout(resumetheme, 2000);
}

function end() {
  inputsallowed = false;
  clearText();
  setMap(levels[0]);
  setBackground(bg);
  addText("Thank you for", { x: 3, y: 4, color: color`2` });
  addText("Playing!", { x: 5, y: 5, color: color`2`} );
  addText("Swapper, by", { x: 4, y: 11, color: color`2`} );
  addText("RaidTheWeb", { x: 5, y: 12, color: color`2`} );
  mainplayback.end();
  playTune(victorytheme);
}

function interactionlogic(x, y) {
  for (var i = 0; i < levelbuttons[level].length; i++) {
    buttonlogic(levelbuttons[level][i].x, levelbuttons[level][i].y, i); // run logic on all buttons
  }

  for (var i = 0; i < levelportals[level].length; i++) {
    portallogic(levelportals[level][i].x, levelportals[level][i].y, i); // run logic on all portals
  }

  if (spritesat(x, y, [wincondition])) { // player is touching win condition!
      win();
  } else if (spritesat(x, y, [finalwincondition])) { // player is touching end condition!
      end();
  } else if (spritesat(x, y, [redo])) {
    inputsallowed = false;
    setTimeout(levelinit, 100);
  }
}

// is second checks to see if the inputs are coming in from the player two inputs
function resolvemovement(issecond, x, y) {
  var player;
  if (issecond && mode == ONE_PLAYER) {
    swapped = !swapped; // swap player!
    return;
  }
  if ((issecond && mode == TWO_PLAYER) || swapped) {
    player = getFirst(player2);
  } else {
    player = getFirst(player1);
  }

  player.x += x;
  player.y += y;

  interactionlogic(player.x, player.y);
}

let menuactive = 1;
const MENU_SINGLE = 0;
const MENU_MULTI = 1;
const MENU_HELP = 2;
let menuselect = MENU_SINGLE;

function updatemenu() {
  clearText();
  addText("Swapper", { x: 6, y: 2, color: color`2` });
  addText("D to begin", { x: 5, y: 14, color: color`2` });
  if (menuselect == MENU_SINGLE) {
    addText("> Singleplayer", { x: 4, y: 6, color: color`2` });
    addText("Multiplayer", { x: 4, y: 7, color: color`2` });
    addText("How to Play", { x: 4, y: 8, color: color`2` });
  } else if (menuselect == MENU_MULTI) {
    addText("Singleplayer", { x: 4, y: 6, color: color`2` });
    addText("> Multiplayer", { x: 4, y: 7, color: color`2` });
    addText("How to Play", { x: 4, y: 8, color: color`2` });
  } else {
    addText("Singleplayer", { x: 4, y: 6, color: color`2` });
    addText("Multiplayer", { x: 4, y: 7, color: color`2` });
    addText("> How to Play", { x: 4, y: 8, color: color`2` });
  }
}

let htppage = 0;
const howtoplaypages = [
  [
    { x: 1, y: 4, text: "Blue uses WASD" },
    { x: 1, y: 5, text: "to navigate." },
    { x: 1, y: 6, text: "To swap colours" },
    { x: 1, y: 7, text: "use any of IJKL." },
    { x: 1, y: 8, text: "In multiplayer," },
    { x: 1, y: 9, text: "IJKL will control" },
    { x: 1, y: 10, text: "Red without needing" },
    { x: 1, y: 11, text: "to swap." }
  ],
  [
    { x: 1, y: 4, text: "Try to reach the" },
    { x: 1, y: 5, text: "goal to complete" },
    { x: 1, y: 6, text: "the level." },
    { x: 1, y: 7, text: "Swapping or relying" },
    { x: 1, y: 8, text: "on the second" },
    { x: 1, y: 9, text: "player is essential" },
    { x: 1, y: 10, text: "in order to win." }
  ],
  [
    { x: 1, y: 4, text: "Red buttons will" },
    { x: 1, y: 5, text: "open doors." },
    { x: 1, y: 6, text: "Boxes may be used" },
    { x: 1, y: 7, text: "to keep a button" },
    { x: 1, y: 8, text: "depressed." },
    { x: 1, y: 9, text: "Portal are linked" },
    { x: 1, y: 10, text: "to each other" },
    { x: 1, y: 11, text: "boxes can travel" },
    { x: 1, y: 12, text: "through them." }
  ],
  [
    { x: 1, y: 4, text: "Touching the purple" },
    { x: 1, y: 5, text: "redo button will" },
    { x: 1, y: 6, text: "reset the level" },
    { x: 1, y: 7, text: "if a mistake is" },
    { x: 1, y: 8, text: "made. Be careful" },
    { x: 1, y: 9, text: "not to be crushed" },
    { x: 1, y: 10, text: "in a closing door" },
    { x: 1, y: 11, text: "if the button-" }
  ],
  [
    { x: 1, y: 4, text: "opening the door" },
    { x: 1, y: 5, text: "is deactivated!" },
  ]
];

function updatehtp() {
  clearText();
  addText("How to Play", { x: 4, y: 2, color: color`2` });
  addText("< A", { x: 1, y: 14, color: color`2` });
  addText(htppage + 1 + "/" + howtoplaypages.length, { x: 8, y: 14, color: color`2` });
  addText("D >", { x: 16, y: 14, color: color`2` });

  for (var i = 0; i < howtoplaypages[htppage].length; i++) {
    addText(howtoplaypages[htppage][i].text, { x: howtoplaypages[htppage][i].x, y: howtoplaypages[htppage][i].y, color: color`2` });
  }
}

function submitmenu() {
  if (menuselect == MENU_SINGLE) {
    mode = ONE_PLAYER;
    menuactive = false;
    menuplayback.end();
    nextlevel();
    mainplayback = playTune(maintheme, Infinity);
  } else if (menuselect == MENU_MULTI) {
    mode = TWO_PLAYER;
    menuactive = false;
    menuplayback.end();
    nextlevel();
    mainplayback = playTune(maintheme, Infinity);
  } else if (menuselect == MENU_HELP) {
    htppage = 0;
    menuactive = MENU_HELP;
    updatehtp();
  }
}

function menu() {
  setBackground(bg);
  menuplayback = playTune(menutheme, Infinity);
  updatemenu();
  menuactive = true;
}

onInput("a", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(false, -1, 0);
    } else if (menuactive == MENU_HELP) {
      htppage--;
      if (htppage < 0) {
        htppage = howtoplaypages.length - 1;
      }
      updatehtp();
    }
  }
});

onInput("d", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(false, 1, 0);
    } else if (menuactive == MENU_HELP) {
      htppage++;
      if (htppage > howtoplaypages.length - 1) {
        menuactive = 0;
        menuselect = MENU_SINGLE;
        setBackground(bg);
        updatemenu();
        menuactive = true;
      } else {
        updatehtp();
      }
    } else {
      submitmenu();
    }
  }
});

onInput("w", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(false, 0, -1);
    } else if (menuactive == MENU_HELP) {
      ;
    } else {
      menuselect--;
      if (menuselect < MENU_SINGLE) {
        menuselect = MENU_HELP;
      }
      updatemenu();
    }
  }
});

onInput("s", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(false, 0, 1);
    } else if (menuactive == MENU_HELP) {
      ;
    } else {
      menuselect++;
      if (menuselect > MENU_HELP) {
        menuselect = MENU_SINGLE;
      }
      updatemenu();
    }
  }
});

// red controls
onInput("j", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(true, -1, 0);
    }
  }
});

onInput("l", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(true, 1, 0);
    }
  }
});

onInput("i", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(true, 0, -1);
    }
  }
});

onInput("k", () => {
  if (inputsallowed) {
    if (!menuactive) {
      resolvemovement(true, 0, 1);
    }
  }
});

// ran on initial setup
levelinit(); // setup first level (blank menu)
menu(); // initialise menu drawing
