/*
@title: the_dining_room_in_the_sky
@author: Dylan Tran
@tags: ['puzzle']
@addedOn: 2023-02-28
*/

        let Score = 0;

const player = "1";
const spriteKey = "a";
const ground = "b";
const recycle = "c";
const trash = "d";
const food = "e";
const paper = "f";
const brownsubstance = "g";
var havepaper = false;
const paperinventory = "h";
var havebrownsubstance = false;
const brownsubstanceinventory = "i";
const cloud ="j";
const cloud2 ="k";
const melody = tune`
265.4867256637168: c4^265.4867256637168,
265.4867256637168: a4-265.4867256637168,
265.4867256637168: g5~265.4867256637168,
265.4867256637168,
265.4867256637168: a4~265.4867256637168,
265.4867256637168: d5^265.4867256637168,
265.4867256637168: e4^265.4867256637168,
265.4867256637168,
265.4867256637168: e4~265.4867256637168,
265.4867256637168: d5-265.4867256637168,
265.4867256637168,
265.4867256637168: e5^265.4867256637168,
265.4867256637168: d4^265.4867256637168,
530.9734513274336,
265.4867256637168: a4~265.4867256637168,
265.4867256637168,
265.4867256637168: e5~265.4867256637168 + d4~265.4867256637168,
265.4867256637168: b4^265.4867256637168 + f5^265.4867256637168,
265.4867256637168,
265.4867256637168: e4-265.4867256637168,
265.4867256637168,
265.4867256637168: f5-265.4867256637168 + a4~265.4867256637168,
265.4867256637168,
265.4867256637168: a5~265.4867256637168,
265.4867256637168: d4^265.4867256637168,
265.4867256637168,
265.4867256637168: d5~265.4867256637168,
265.4867256637168: e5~265.4867256637168,
265.4867256637168: e4~265.4867256637168,
265.4867256637168: e4-265.4867256637168 + a4^265.4867256637168,
265.4867256637168`
const bigpaper = "l";
const bottomsmallbrownsubstance = "m";
var gameon = false;
var gameover = false;
const endscreen = "n";
const topleft = "o";
const topright = "p";
const bottomleft = "q";
const bottomright = "r";
const left = "s";

const above = "t";
const below = "u";
const blcorner = "v";
const brcorner = "w";
const trcorner = "x";
const tlcorner = "y";
const right = "z";


setLegend(
  [ player, bitmap`
................
................
................
.....DDDDDD.....
....DD4444DD....
...DD444444DD...
..D4444444444D..
.D440444440444D.
.D440444440444D.
D44404444404444D
D44444444444444D
D44444400444444D
D44444400444444D
D44444444444444D
.D444444444444D.
..DDDDDDDDDDDD..`],
  [ spriteKey, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ recycle, bitmap`
5555555555555555
5555555555555555
5555555555555555
..555555555555..
..555552255555..
..555525525555..
..555525525555..
..555555555555..
..555255552555..
..552555555255..
..552555555255..
..552225522255..
..555555555555..
..555555555555..
..555555555555..
..555555555555..`],
  [ trash, bitmap`
........11......
.........11333..
..........1..33.
..........11..3.
...........1111.
............11..
....11111111111.
....1L1L1L1L1.1.
....1L1L1L1L1...
....1L1L1L1L1...
....1L1L1L1L1...
....1L1L1L1L1...
....1L1L1L1L1...
....1L1L1L1L1...
....1L1L1L1L1...
....111111111...`],
  [ ground, bitmap`
4464444443F34444
46F6444444344494
44644444444449F9
4444444444444494
4444444444444444
CC4CC44C44C4CC4C
CC4CC44CCCC44C4C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC1CCCCC1CCCC1CC
CCC1CCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCC1CCCC
CCC11CCC1CCCCCCC
CCCCCCCC11CCC11C
CCCCCCCCCCCCCCCC`],
  [ food, bitmap`
................
................
................
................
................
................
................
....1.CCCC.1....
....11CCCC11....
....1.CCCC.1....
................
................
................
................
................
................`],
  [ paper, bitmap`
1111111111......
1222222221......
1222222221......
1222222221......
1222222221......
1222222221......
1111111111......
................
................
................
................
................
................
................
................
................`],
  [ paperinventory, bitmap`
0000000000000000
0000000000000000
00............00
00..11111111..00
00..12222221..00
00..12222221..00
00..12222221..00
00..12222221..00
00..12222221..00
00..12222221..00
00..12222221..00
00..11111111..00
00............00
0000000000000000
0000000000000000
................`],
  [ brownsubstance, bitmap`
................
................
....CCC.........
.....CCCC.......
......CCCC......
......CCCCC.....
.....CCCCCCC....
....CCCCCCCCC...
...CCCCCCCCCCC..
...CCCCCCCCCCC..
..CCCCCCCCCCCCC.
..CCCCCCCCCCCCC.
..CCCCCCCCCCCCC.
..CCCCCCCCCCCCC.
...CCCCCCCCCCC..
....CCCCCCCCCC..`],
  [ brownsubstanceinventory, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00..CCCC......00
00....CCC.....00
00....CCCC....00
00.....CCCC...00
00....CCCCCC..00
00...CCCCCCCC.00
00..CCCCCCCCC.00
00..CCCCCCCCC.00
00..CCCCCCCCC.00
00...CCCCCCC..00
0000000000000000
0000000000000000`],
  [ cloud,bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777722211227777
7772222212222277
7712222112221227
7122221122211122
1112221222211222
1111111111111111`],
  [ cloud2,bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777112777
7712777771112277
7112277771122277
7122211271122277
1122211222222127
1222212222221222
1222221222221121
1111111111111111`],
  [ bigpaper, bitmap`
................
................
................
................
................
11111111........
12222221........
12222221........
12222221........
12222221........
12222221........
12222221........
12222221........
12222221........
12222221........
11111111........`],
  [ bottomsmallbrownsubstance, bitmap`
....CCCC........
......CCC.......
......CCCC......
.......CCCC.....
......CCCCCC....
.....CCCCCCCC...
....CCCCCCCCC...
....CCCCCCCCC...
....CCCCCCCCC...
.....CCCCCCC....
................
................
................
................
................
................`],
  [ endscreen, bitmap`
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
DDDDDDDDDDDDDDDD`],
  [ topleft, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777DDDDDD
77777777DDDDDDDD
7777777DDDDDDDDD
777777DDDDDD4444
77777DDDDDD44444
7777DDDD44444444
777DDDD444444444
77DDDD4444444444
77DDDD4444444444
7DDD444440044444
7DDD444440044444
DDD4444440044444`],
  [ topright, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
DDDDD77777777777
DDDDDDD777777777
DDDDDDDDD7777777
4444DDDDDDD77777
444444DDDDDD7777
44444444DDDD7777
4444444444DDD777
44444444444DDD77
444444444444DD77
444004444444DDD7
4440044444444DD7
4440044444444DDD`],
  [ bottomleft, bitmap`
DD44444440044444
DD44444440044444
DD44444440044444
DD44444440044444
DD44444440044444
DD44444444444444
DD44444444444444
DD44444444444400
DD44444444444400
DD44444444444400
DD44444444444444
DD44444444444444
DDD4444444444444
DDDD444444444444
7DDDDDDDDDDDDDDD
777DDDDDDDDDDDDD`],
  [ bottomright, bitmap`
4440044444444DDD
44400444444444DD
44400444444444DD
44400444444444DD
44400444444444DD
44444444444444DD
44444444444444DD
04444444444444DD
04444444444444DD
04444444444444DD
4444444444444DDD
444444444444DDDD
44444444444DDDD7
44444444444DDD77
DDDDDDDDDDDDD777
DDDDDDDDDDDD7777`],
  [ left, bitmap`
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777`],
  [ right, bitmap`
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD`],
  [ above, bitmap`
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
1111111111111111
1111111111111111
7777777777777777
7777777777777777`],
  [ below, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
1111111111111111
1111111111111111
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ blcorner, bitmap`
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11777777
DDDDDDDD11111111
DDDDDDDD11111111
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ brcorner, bitmap`
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD
11111111DDDDDDDD
11111111DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ trcorner, bitmap`
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
11111111DDDDDDDD
11111111DDDDDDDD
77777711DDDDDDDD
77777711DDDDDDDD`],
  [ tlcorner, bitmap`
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
DDDDDDDD11111111
DDDDDDDD11111111
DDDDDDDD11777777
DDDDDDDD11777777`],
  
);
setMap(map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`);
      addText(`press w to start`, { 
      x: 1,
      y: 0,
      color: color`5`});
      addText(`Catch the objects`, { 
      x: 1,
      y: 1,
      color: color`D`});
      addText(`falling from the`, { 
      x: 1,
      y: 2,
      color: color`D`});
      addText(`sky.`, { 
      x: 1,
      y: 3,
      color: color`D`});
      addText(`why is stuff `, { 
      x: 1,
      y: 4,
      color: color`6`});
      addText(`falling from the`, { 
      x: 1,
      y: 5,
      color: color`6`});
      addText(`sky?`, { 
      x: 1,
      y: 6,
      color: color`6`});
      addText(`don't worry about`, { 
      x: 1,
      y: 7,
      color: color`6`});
      addText(`it.`, { 
      x: 1,
      y: 8,
      color: color`6`});
      addText(`a:go left`, { 
      x: 1,
      y: 9,
      color: color`3`});
      addText(`d:go right`, { 
      x: 1,
      y: 10,
      color: color`3`});
      addText(`k:stop music`, { 
      x: 1,
      y: 11,
      color: color`3`});
      addText(`j:recycle`, { 
      x: 1,
      y: 12,
      color: color`3`});
      addText(`l:trash`, { 
      x: 1,
      y: 13,
      color: color`3`});
      addText(`i:end game`, { 
      x: 1,
      y: 14,
      color: color`3`});
       addSprite(7, 8, bigpaper);
       addSprite(6, 9, bottomsmallbrownsubstance);


onInput("w", () => {
  if (gameon == false) {
    gameon = true;
  function endmap() {
    setMap( map`
...yttx...
...sopz...
...sqrz...
...vuuw...
..........
..........
..........
..........`);
    clearText();
    if (playback) playback.end();
    gameover = true;
    gameon = false;
    setBackground(endscreen)
    addText(`Final Score:${Score}`, { 
        x: 3,
        y: 0,
        color: color`5`});
     addText(`This is the end of`, { 
      x: 1,
      y: 8,
      color: color`3`});
     addText(`the game. If you`, { 
      x: 1,
      y: 9,
      color: color`3`});
      addText(`would like to try`, { 
      x: 1,
      y: 10,
      color: color`3`});
          addText(`to beat your high`, { 
      x: 1,
      y: 11,
      color: color`3`});
      addText(`score press w.`, { 
      x: 1,
      y: 12,
      color: color`3`});
    Score = 0;
  };
  function endgame() {
  clearInterval(spawnpaper1 );
  clearInterval(spawnbrownsubstance1);
  clearInterval(spawnfood1);
  setTimeout(endmap, 3000);
};   
  setTimeout(endgame, 300000);
  const playback = playTune(melody, Infinity)

setSolids([player, ground, trash, recycle]);
setBackground(spriteKey)
    setMap( map`
j.....j.......j
....j....k..k..
.kj.k..k......j
...........k...
j.......j...j.j
...k......j....
...............
...............
...............
...............
c......1......d
bbbbbbbbbbbbbbb`)
        clearText();
        addText(`Score:${Score}`, { 
        x: 6,
        y: 0,
        color: color`5`});

function spawnfood() {
  let x = Math.floor(Math.random() * 13)+1;
    addSprite(x, 0, food);
   };

function movefood() {
  let object = getAll(food);

  for (let i = 0; i < object.length; i++) {
    object[i].y += 1;
  }
}

function despawnfood() {
  let object = getAll(food);
  for (let i = 0; i < object.length; i++) {
    if (object[i].y >= 11) {
      object[i].remove();
    }
  }
}

function checkHit() {
  let p = getAll(player);  
  let obstacles = getAll(food);
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (obstacles[i].x == p[j].x && obstacles[i].y == p[j].y) {
        obstacles[i].remove();
        Score += 10;
        clearText();
        addText(`Score:${Score}`, { 
        x: 6,
        y: 0,
        color: color`5`});
      }
    }
  }
}


const spawnfood1 = setInterval(spawnfood, 800);

const movefood1 = setInterval(movefood, 300);

const despawnfood1 = setInterval(despawnfood, 1);

const checkfoodcatch1 = setInterval(checkHit, 1);



function spawnpaper() {
  let x = Math.floor(Math.random() * 13)+1;
    addSprite(x, 0, paper);
   };

function movepaper() {
  let object = getAll(paper);

  for (let i = 0; i < object.length; i++) {
    object[i].y += 1;
  }
}

function despawnpaper() {
  let object = getAll(paper);

  for (let i = 0; i < object.length; i++) {
    if (object[i].y >= 11) {
      object[i].remove();
    }
  }
}

function checkpapercatch() {
  let p = getAll(player);  
  let obstacles = getAll(paper);
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (obstacles[i].x == p[j].x && obstacles[i].y == p[j].y) {
        obstacles[i].remove();
        addSprite(0, 9, paperinventory);
        havepaper = true; 
      }
    }
  }
}

const spawnpaper1 = setInterval(spawnpaper, 1800);

const movepaper1 = setInterval(movepaper, 300);

const despawnpaper1 = setInterval(despawnpaper, 1);

const checkpapercatch1 = setInterval(checkpapercatch, 1);

function spawnbrownsubstance() {
  let x = Math.floor(Math.random() * 13)+1;
    addSprite(x, 0, brownsubstance);
   };

function movebrownsubstance() {
  let object = getAll(brownsubstance);

  for (let i = 0; i < object.length; i++) {
    object[i].y += 1;
  }
}

function despawnbrownsubstance() {
  let object = getAll(brownsubstance);

  for (let i = 0; i < object.length; i++) {
    if (object[i].y >= 11) {
      object[i].remove();
    }
  }
}

function checkbrownsubstancecatch() {
  let p = getAll(player);  
  let obstacles = getAll(brownsubstance);
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (obstacles[i].x == p[j].x && obstacles[i].y == p[j].y) {
        obstacles[i].remove();
        addSprite(14, 9, brownsubstanceinventory);
        havebrownsubstance = true; 
      }
    }
  }
}

const spawnbrownsubstance1 = setInterval(spawnbrownsubstance, 3100);

const movebrownsubstance1 = setInterval(movebrownsubstance, 300);

const despawnbrownsubstance1 = setInterval(despawnbrownsubstance, 1);

const checkbrownsubstancecatch1 = setInterval(checkbrownsubstancecatch, 1);


onInput("d", () => {

  getFirst(player).x += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("j", () => {
    let p = getAll(player);  
     for (let j = 0; j < p.length; j++) {
      if ( 1 == p[j].x && havepaper == true) {
        Score += 50;
        havepaper = false;
        clearTile(0, 9)
        clearText();
        addText(`Score:${Score}`, { 
        x: 6,
        y: 0,
        color: color`5`});
      }
      }
});

onInput("l", () => {
    let p = getAll(player);  
     for (let j = 0; j < p.length; j++) {
      if ( 13 == p[j].x && havebrownsubstance == true) {
        Score += 50;
        havebrownsubstance = false;
        clearTile(14, 9)
        clearText();
        addText(`Score:${Score}`, { 
        x: 6,
        y: 0,
        color: color`5`});
      }
      }
});

onInput("i", () => {
  endgame();
  
});

onInput("k", () => {
    if (playback) playback.end()
});

onInput("w", () => {
  clearText();
  addText(`Score:${Score}`, { 
  x: 6,
  y: 0,
  color: color`5`});
  let p = getAll(player);  
  for (let j = 0; j < p.length; j++) {
  addText(`meat is good`, { 
        x: p[j].x-3,
        y: p[j].y+3,
        color: color`5`});


  }  
});

onInput("s", () => {
    clearText();
  addText(`Score:${Score}`, { 
  x: 6,
  y: 0,
  color: color`5`});
  let p = getAll(player);  
  for (let j = 0; j < p.length; j++) {
  addText(`can't fall`, { 
        x: p[j].x-2,
        y: p[j].y+3,
        color: color`5`});
  }  
});

  }
});



