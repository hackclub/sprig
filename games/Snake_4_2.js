/*
@title: Snake_4_2
@author: Stephen King
@tags: ['endless']
@addedOn: 2022-11-18
*/
//random function
function rng(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//function to check if eaten
function checkEat(inp) {
  if (inp === play1end) {
    if (getFirst(apple) && getFirst(p1head)) {
      var appx = getFirst(apple).x;
      var appy = getFirst(apple).y;
      var plax = getFirst(p1head).x;
      var play = getFirst(p1head).y;
      if (appx === plax && appy === play) {
        score1 += 1;
        cscore1 = true;
        clearTile(appx, appy);
        addSprite(appx, appy, p1head);
        sapp();
        return true;
      }
    }
  }
  if (inp === play2end) {
    if (getFirst(apple) && getFirst(p2head)) {
      var appx = getFirst(apple).x;
      var appy = getFirst(apple).y;
      var plax = getFirst(p2head).x;
      var play = getFirst(p2head).y;
      if (appx === plax && appy === play) {
        score2 += 1;
        cscore2 = true;
        clearTile(appx, appy);
        addSprite(appx, appy, p2head);
        sapp();
        return true;
      }
    }
  }
}
//function death, first is mode, second is player
function dead(inp, inp2) {
  if (inp === -1 && inp2 === 1) {
    gameState = -1;
    setMap(playsend);
    clearText();
    if (score1 >= 10) {
      addText("Your score is " + score1.toString(), {
        x: 2,
        y: 14,
        color: color`2`
      })
    } else {
      addText("Your score is " + score1.toString(), {
        x: 3,
        y: 14,
        color: color`2`
      })
    }
  }
  if (inp === -2 && inp2 === 1) {
    gameState = -21;
    setMap(play1end);
    clearText();
    addText("P2 score:" + score2.toString() + "\nP1 score:" + score1.toString(), {
      x: 5,
      y: 9,
      color: color`5`
    });
  }
  if (inp === -2 && inp2 === 2) {
    gameState = -22
    setMap(play2end);
    clearText();
    addText("P1 score:" + score1.toString() + "\nP2 score:" + score2.toString(), {
      x: 5,
      y: 9,
      color: color`D`
    });
  }
}
//spawn apple
function sapp() {
  let x = rng(0, width());
  let y = rng(0, height());
  if (getTile(x, y).length > 0) {
    sapp();
  } else {
    addSprite(x, y, apple)
  }
}
//music
const backmusic = tune`
300: c4^300 + c5~300,
300: c4~300 + c5^300,
300: c4~300 + c5^300,
300: e4~300 + e5^300,
300: g4~300 + g5^300 + f4^300,
300: f4~300 + e5^300,
300: g4~300 + g5^300,
300: e4~300 + f5^300,
300: c4^300 + c5~300,
300: c4~300 + c5^300,
300: c4~300 + c5^300,
300: e4~300 + e5^300,
300: g4~300 + g5^300 + f4^300,
300: f4~300 + e5^300,
300: g4~300 + g5^300,
300: e4~300 + f5^300,
300: c4^300 + c5~300,
300: c4~300 + c5^300,
300: c4~300 + c5^300,
300: e4~300 + e5^300,
300: g4~300 + g5^300 + f4^300,
300: f4~300 + e5^300,
300: g4~300 + g5^300,
300: e4~300 + f5^300,
300: c4^300 + c5~300,
300: c4~300 + c5^300,
300: c4~300 + c5^300,
300: e4~300 + e5^300,
300: g4~300 + g5^300 + f4^300,
300: f4~300 + e5^300,
300: g4~300 + g5^300,
300: e4~300 + f5^300`;
const backmusic2 = tune`
375: e4/375 + a4^375 + d4~375 + b4-375,
375: e4/375 + d4~375 + c5-375,
375: e4/375 + a4^375 + d4~375 + d5-375,
375: e4/375 + a4^375 + d4~375 + d5-375,
375: e4/375 + d4~375 + c5-375,
375: e4/375 + a4^375 + d4~375 + b4-375,
375: e4/375 + d4~375 + c5-375,
375: d4/375 + a4^375 + c4~375 + d5-375,
375: d4/375 + a4^375 + c4~375 + e5-375,
375: d4/375 + c4~375 + d5-375,
375: e4/375 + a4^375 + d4~375 + e5-375,
375: e4/375 + d4~375 + d5-375 + f5-375,
375: e4/375 + a4^375 + d4~375 + e5-375 + c5-375,
375: d4/375 + a4^375 + c4~375 + d5-375 + b4-375,
375: d4/375 + c4~375 + c5-375 + a4-375,
375: d4/375 + a4^375 + c4~375 + b4-375 + g4-375,
375: c4/375 + d4~375 + b4-375 + e4-375,
375: e4/375 + a4^375 + d4~375 + c5-375,
375: e4/375 + a4^375 + d4~375 + d5-375,
375: f4/375 + e4~375 + d5-375,
375: f4/375 + a4^375 + e4~375 + c5-375,
375: f4/375 + e4~375 + b4-375,
375: g4/375 + a4^375 + f4~375 + b4-375,
375: g4/375 + a4^375 + f4~375 + c5-375,
375: g4/375 + f4~375 + d5-375,
375: g4/375 + a4^375 + f4~375 + e5-375,
375: g4/375 + f4~375 + d5-375 + f5-375,
375: g4/375 + a4^375 + f4~375 + e5-375 + c5-375,
375: g4/375 + a4^375 + f4~375 + d5-375 + b4-375,
375: f4/375 + e4~375 + c5-375 + a4-375,
375: e4/375 + a4^375 + d4~375 + b4-375 + g4-375,
375: d4/375 + c4~375 + a4-375`;
const playbackmusic = playTune(backmusic, Infinity);
const move = tune`
240: c4~240,
7440`;
const eat = tune`
250: g5-250 + e5~250 + c5~250 + g4^250,
7750`;
// set variables head tail and apples
const cursor = "m";
const p1head = "h";
const p2head = "k";
const p1tail = "t";
const p2tail = "n";
const ttail = "l";
const apple = "a";
const back = "b";
//endscreen art
const black = "z";
const lgreen = "x";
const dgreen = "c";
const red = "v";
const blue = "j";
//set maps
const menu = map`
zzzzzz
zzzzzz
zzzzzz
zzzzzz
zzzzzz`;
const playsend = map`
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzxzzzxzzzxxzzzzxzzzzxzzz
zzzxzzzxzzxzzxzzzxzzzzxzzz
zzzxzzzxzxzzzzxzzxzzzzxzzz
zzzzxzxzzxzzzzxzzxzzzzxzzz
zzzzzxzzzxzzzzxzzxzzzzxzzz
zzzzzxzzzxzzzzxzzxzzzzxzzz
zzzzzxzzzzxzzxzzzzxzzxzzzz
zzzzzxzzzzzxxzzzzzzxxzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzxxxzzzxzxxxxzxxxzzzxzzz
zzzxzzxzzxzxzzzzxzzxzzxzzz
zzzxzzxzzxzxzzzzxzzxzzxzzz
zzzxzzzxzxzxzzzzxzzzxzxzzz
zzzxzzzxzxzxxxzzxzzzxzxzzz
zzzxzzzxzxzxzzzzxzzzxzxzzz
zzzxzzxzzxzxzzzzxzzxzzxzzz
zzzxzzxzzxzxzzzzxzzxzzzzzz
zzzxxxzzzxzxxxxzxxxzzzxzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzz`;
const play1end = map`
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzjjjzzzjjjzzzjzzzzzzzjzzzjjzzzjzzzzjzjz
zzjzzjzjzzzjzzjzzzzzzzjzzjzzjzzjjzzzjzjz
zzjzzjzzzzzjzzjzzzzzzzjzjzzzzjzjzjzzjzjz
zzjjjzzzzzjzzzzjzzzzzjzzjzzzzjzjzzjzjzjz
zzjzzzzzzjzzzzzjzzjzzjzzjzzzzjzjzzzjjzjz
zzjzzzzzjzzzzzzjzjjjzjzzjzzzzjzjzzzzjzjz
zzjzzzzjzzzzzzzzjjzjjzzzzjzzjzzjzzzzjzzz
zzjzzzzjjjjjzzzzjzzzjzzzzzjjzzzjzzzzjzjz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`;
const play2end = map`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzxxxzzzzxzzzzxzzzzzzzxzzzxxzzzxzzzzxzxz
zzxzzxzzxxzzzzxzzzzzzzxzzxzzxzzxxzzzxzxz
zzxzzxzxzxzzzzxzzzzzzzxzxzzzzxzxzxzzxzxz
zzxxxzzzzxzzzzzxzzzzzxzzxzzzzxzxzzxzxzxz
zzxzzzzzzxzzzzzxzzxzzxzzxzzzzxzxzzzxxzxz
zzxzzzzzzxzzzzzxzxxxzxzzxzzzzxzxzzzzxzxz
zzxzzzzzzxzzzzzzxxzxxzzzzxzzxzzxzzzzxzzz
zzxzzzzxxxxxzzzzxzzzxzzzzzxxzzzxzzzzxzxz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`;
const x121 = map`
.............
.............
.............
.............
.............
.............
.th.......a..
.............
.............
.............
.............
.............
.............`;
const x122 = map`
.............
.............
.............
.............
.............
.............
.th...a...kn.
.............
.............
.............
.............
.............
.............`;
//set head, tail, and apples
setLegend(
  [cursor, bitmap `
0000000000000000
0000000000000000
0000002200000000
0000000220000000
0000000022000000
0000000002200000
0000000000220000
0000000000022000
0000000000022000
0000000000220000
0000000002200000
0000000022000000
0000000220000000
0000002200000000
0000000000000000
0000000000000000`],
  [p1head, bitmap`
................
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.444DD4444DD444.
.444DD4444DD444.
.44444444444444.
.44444444444444.
.44400000000444.
.44402222220444.
.44402222220444.
.44400000000444.
.44444444444444.
................`],
  [p2head, bitmap`
................
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77755777755777.
.77755777755777.
.77777777777777.
.77777777777777.
.77700000000777.
.77702222220777.
.77702222220777.
.77700000000777.
.77777777777777.
................`],
  [p1tail, bitmap`
4444444444444444
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4444444444444444`],
  [p2tail, bitmap`
7777777777777777
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7777777777777777`],
  [ttail, bitmap`
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
................`],
  [apple, bitmap`
................
........C.4.....
........CDD.....
...33..CC4..33..
..33333CD333333.
.33333333333333.
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
333333333333333.
.33333333333333.
.3333333333333..
..33333333333...
....3333333.....
................`],
  [back, bitmap`
DDDDDDDDDDDDDDDD
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
DDDDDDDDDDDDDDDD`],
  //colors
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
0000000000000000`],
  [lgreen, bitmap`
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
  [dgreen, bitmap`
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
3333333333333333`],
  [blue, bitmap`
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
7777777777777777`]);
//game State, 0 is menu, 1 is singleplayer, -1 is dead in singleplayer
//-11 dead multi p1, -12 dead multi p2
let gameState = 0

function start(inp) {
  if (inp === menu) {
    setMap(menu);
    addSprite(1, 1, cursor);
    addText("Singleplayer", {
      x: 7,
      y: 4,
      color: color`2`
    })
    addText("Multiplayer", {
      x: 7,
      y: 11,
      color: color`2`
    })
  }
  if (inp === playsend) {
    clearText();
    setMap(x121);
    setBackground(back);
    gameState = 1;
  }
  if (inp === play2end) {
    clearText();
    setMap(x122);
    setBackground(back);
    gameState = 2;
  }
}
start(menu);
//set solids
setSolids([p1tail, p1head, p2tail, p2head])
//score (also controls the length of snake)
var score1 = 0;
var score2 = 0;
var cscore1 = false;
var cscore2 = false;
//records last input
var lin1 = 2;
var lin2 = 4;
var lpin = 0;
//tail
function tail(inp) {
  if (inp === play1end && lpin === 1 && getFirst(p1tail)) {
    clearTile(getFirst(p1tail).x, getFirst(p1tail).y);
  }
  if (inp === play2end && lpin === 2 && getFirst(p2tail)) {
    clearTile(getFirst(p2tail).x, getFirst(p2tail).y);
  }
}
//move counter
var mvcr1 = 0;
var mvcr2 = 0;

function fmvcr(inp) {
  if (!cscore1 && (inp === playsend || inp === play1end)) {
    tail(play1end);
  } else {
    if (cscore1 && (inp === playsend || inp === play1end)) {
      cscore1 = false
    }
  };
  if (!cscore2 && inp === play2end && !back2) {
    tail(play2end);
  } else {
    if (cscore2 && inp === play2end) {
      cscore2 = false
    }
  };
}
//back boolean, says if player entered a backwards key
var back1 = false;
var back2 = false;
//variable for change in player
var cp1 = false;
var cp2 = false;
//checking eat and score
afterInput(() => {
  if ((gameState === 1 || gameState === 2) && lpin === 1 && !back1 && !back2) {
    if (checkEat(play1end)) {
      playTune(eat)
    } else {
      playTune(move)
    };
    fmvcr(playsend);
    addText(score1.toString(), {
      x: 0,
      y: 1,
      color: color`4`
    });
    mvcr1 += 1;
  } else {
    back1 = false;
    back2 = false
  }
  if (gameState === 2 && lpin === 2 && !back2 && !back1) {
    if (checkEat(play2end)) {
      playTune(eat)
    } else {
      playTune(move)
    };
    fmvcr(play2end);
    addText(score2.toString(), {
      x: 19,
      y: 1,
      color: color`7`
    });
    mvcr2 += 1;
  } else {
    back1 = false;
    back2 = false
  }
})
//take inputs to move head around
onInput("w", () => {
  if (lin1 !== 3 && (gameState === 1 || gameState === 2) && !back1) {
    const p = getFirst(p1head);
    if (!p) return;
    var tx = p.x;
    var ty = p.y;
    lpin = 1;
    p.y -= 1;
    lin1 = 1;
    if (ty !== p.y || tx !== p.x) {
      addSprite(tx, ty, p1tail)
    } else {
      if (gameState === 1) {
        dead(-1, 1)
      } else {
        dead(-2, 1)
      };
    }
  } else {
    back1 = true;
    lpin = 1;
  }
  const c = getFirst(cursor);
  if (!c) return;
  if (gameState === 0 && c.y === 3) {
    c.y -= 2;
  }
})
onInput("s", () => {
  if (lin1 !== 1 && (gameState === 1 || gameState === 2) && !back1) {
    const p = getFirst(p1head);
    if (!p) return;
    var tx = p.x;
    var ty = p.y;
    lpin = 1;
    p.y += 1;
    lin1 = 3;
    if (ty !== p.y || tx !== p.x) {
      addSprite(tx, ty, p1tail)
    } else {
      if (gameState === 1 && back1 === false) {
        dead(-1, 1)
      } else {
        dead(-2, 1)
      };
    }
  } else {
    back1 = true;
    lpin = 1;
  }
  const c = getFirst(cursor);
  if (!c) return;
  if (gameState === 0 && c.y === 1) {
    c.y += 2;
  }
})
onInput("a", () => {
  if (lin1 !== 2 && (gameState === 1 || gameState === 2) && !back1) {
    const p = getFirst(p1head);
    if (!p) return;
    var tx = p.x;
    var ty = p.y;
    lpin = 1;
    p.x -= 1;
    lin1 = 4;
    if (ty !== p.y || tx !== p.x) {
      addSprite(tx, ty, p1tail)
    } else {
      if (gameState === 1) {
        dead(-1, 1)
      } else {
        dead(-2, 1)
      };
    }
  } else {
    back1 = true;
    lpin = 1;
  }
})
onInput("d", () => {
  if (lin1 !== 4 && (gameState === 1 || gameState === 2) && !back1) {
    const p = getFirst(p1head);
    if (!p) return;
    var tx = p.x;
    var ty = p.y;
    lpin = 1;
    p.x += 1;
    lin1 = 2;
    if (ty !== p.y || tx !== p.x) {
      addSprite(tx, ty, p1tail)
    } else {
      if (gameState === 1) {
        dead(-1, 1)
      } else {
        dead(-2, 1)
      };
    }
  } else {
    back1 = true;
    lpin = 1;
  }
  const c = getFirst(cursor);
  if (!c) return;
  if (gameState === 0 && c.y === 1) {
    start(playsend);
  }
  if (gameState === 0 && c.y === 3) {
    start(play2end);
  }
})
//player 2 movements
onInput("l", () => {
  if (lin2 !== 4 && gameState === 2 && !back2) {
    const h = getFirst(p2head);
    if (!h) return;
    var tx = h.x;
    var ty = h.y;
    lpin = 2;
    h.x += 1;
    lin2 = 2;
    if (ty !== h.y || tx !== h.x) {
      addSprite(tx, ty, p2tail)
    } else {
      dead(-2, 2)
    }
  } else {
    if (lin2 === 4) {
      back2 = true;
    }
  }
})
onInput("j", () => {
  if (lin2 !== 2 && gameState === 2 && !back2) {
    const h = getFirst(p2head);
    if (!h) return;
    var tx = h.x;
    var ty = h.y;
    lpin = 2;
    h.x -= 1;
    lin2 = 4;
    if (ty !== h.y || tx !== h.x) {
      addSprite(tx, ty, p2tail)
    } else {
      dead(-2, 2)
    }
  } else {
    if (lin2 === 2) {
      back2 = true;
    }
  }
})
onInput("i", () => {
  if (lin2 !== 3 && gameState === 2 && !back2) {
    const h = getFirst(p2head);
    if (!h) return;
    var tx = h.x;
    var ty = h.y;
    lpin = 2;
    h.y -= 1;
    lin2 = 1;
    if (ty !== h.y || tx !== h.x) {
      addSprite(tx, ty, p2tail)
    } else {
      dead(-2, 2)
    }
  } else {
    if (lin2 === 3) {
      back2 = true;
    }
  }
})
onInput("k", () => {
  if (lin2 !== 1 && gameState === 2 && !back2) {
    const h = getFirst(p2head);
    if (!h) return;
    var tx = h.x;
    var ty = h.y;
    lpin = 2;
    h.y += 1;
    lin2 = 3;
    if (ty !== h.y || tx !== h.x) {
      addSprite(tx, ty, p2tail)
    } else {
      dead(-2, 2)
    }
  } else {
    if (lin2 === 1) {
      back2 = true;
    }
  }
})
