/*
@title: Fighing Engine
@author: James Lian
@tags: ['action','multiplayer']
@addedOn: 2024-07-22

A simple 2-player fighting game engine, a little like rock'em sock'em robots and Street Fighter.
Dodge your oponents by moving left and right! Punch them to knock them out!
Use 'hadouken' to attack them from afar! Block 'hadouken' by guarding!
Win at all costs!

Player 1: 
- left: A
- right: D
- punch: W
- hadouken: S
- if you see a hadouken coming towards you, press W to deflect

Player 2:
- left: J
- right: L
- punch: I
- hadouken: K
- if you see a hadouken coming towards you, press I to deflect

P.S. apologies for the inconsistent variable naming... I tried to adopt camel case but failed miserably...
*/

const p1_health = "v";
const p1_healthHalf = "u";
const p2_health = "y";
const p2_healthHalf = "o";

const p1 = "d";
const p1punch = "f"
const p1guard = "s";
const p1hadouken = "w";
const p1hurt = "q";
const p2 = "j";
const p2punch = "h"
const p2guard = "k";
const p2hadouken = "i";
const p2hurt = "p";
const ground = 'g';
const hadouken_p1 = "z"
const hadouken_p1_deflected = "c"
const hadouken_p2 = "m"
const hadouken_p2_deflected = "b"

setLegend(
  [ p1_health, bitmap`
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
3333333333333333
3333333333333333
................`],
  [ p2_health, bitmap`
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
5555555555555555
5555555555555555
................`],
  [ p1, bitmap`
......11........
.....111........
.....111........
.....L11........
...1LLLL1.......
..11LLLL11......
..1133LL11......
..1333LLL1......
..133LL331......
....LLL333......
...000000.......
...00..00.......
..000..00.......
..00...000......
..00....00......
.111....11......` ],
  [ p1punch, bitmap`
......11........
.....111........
.....111........
.....L11........
...1LLLL11......
..11LLLL1111333.
..1133LL1111333.
..1333LLL....33.
..133LLLL.......
....LLLLL.......
...000000.......
...00..00.......
..000..000......
..00....00......
..00....00......
.111....11......` ],
  [ p1guard, bitmap`
................
................
........11......
.......111......
.......111...3..
.....11L11..33..
....11LLLL1.33..
....11L33L1113..
....11333L1111..
.....1333L.11...
.....LLL000.....
.....000000.....
.....00..00.....
....000..00.....
..10000..10.....
..111....111....`],
  [ p1hadouken, bitmap`
.......11.......
......111.......
......111.......
......L11.....33
.....L11L1..133.
.....L11111113..
.....LL11111133.
....LLLLL.....33
....LLLLL.......
....LLLL........
....000000......
....00..000.....
...000...00.....
..00.....00.....
.100.....10.....
.11......111....`],
  [ p1hurt, bitmap`
..11............
.111............
.111............
.111............
.LLLLL..........
.111LL1.........
.11111133.......
..L1111333......
..LLLLL133......
..000000........
..000.000.......
...00..000......
...00...00......
...00...10......
...10...11......
...11...........` ],
  [ p2, bitmap`
........11......
........111.....
........111.....
........11L.....
.......1LLLL1...
......11LLLL11..
......11LL5511..
......1LLL5551..
......155LL551..
......555LLL....
.......000000...
.......00..00...
.......00..000..
......000...00..
......00....00..
......11....111.`],
  [ p2punch, bitmap`
........11......
........111.....
........111.....
........11L.....
......11LLLL1...
.5551111LLLL11..
.5551111LL5511..
.55....LLL5551..
.......LLLL551..
.......LLLLL....
.......000000...
.......00..00...
......000..000..
......00....00..
......00....00..
......11....111.` ],
  [ p2guard, bitmap`
................
................
......11........
......111.......
..5...111.......
..55..11L11.....
..55.1LLLL11....
..5111L55L11....
..1111L55511....
...11.L5551.....
.....000LLL.....
.....000000.....
.....00..00.....
.....00..000....
.....01..00001..
....111....111..`],
  [ p2hadouken, bitmap`
.......11.......
.......111......
.......111......
55.....11L......
.551..1L11L.....
..51111111L.....
.55111111LL.....
55.....LLLLL....
.......LLLLL....
........LLLL....
......000000....
.....000..00....
.....00...000...
.....00.....00..
.....01.....001.
....111......11.`],
  [ p2hurt, bitmap`
............11..
............111.
............111.
............111.
..........LLLLL.
.........1LL111.
.......55111111.
......5551111L..
......551LLLLL..
........000000..
.......000.000..
......000..00...
......00...00...
......01...00...
......11...01...
...........11...` ],
  [ ground, bitmap`
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
  
  [ hadouken_p1, bitmap`
................
................
.......3333.....
.....3388833....
....3388..83....
.....83....8....
....3388..83....
.....3388833....
.......3333.....
................
................
................
................
................
................
................`],
  [ hadouken_p1_deflected, bitmap`
................
................
.....3333.......
....3388833.....
....38..8833....
....8....38.....
....38..8833....
....3388833.....
.....3333.......
................
................
................
................
................
................
................`],
  [ hadouken_p2, bitmap`
................
................
.....5555.......
....5577755.....
....57..7755....
....7....57.....
....57..7755....
....5577755.....
.....5555.......
................
................
................
................
................
................
................`],
  [ hadouken_p2_deflected, bitmap`
................
................
.......5555.....
.....5577755....
....5577..75....
.....75....7....
....5577..75....
.....5577755....
.......5555.....
................
................
................
................
................
................
................`],
);

setSolids([p1, p1punch, p1guard, p1hadouken, p1hurt, p2, p2punch, p2guard, p2hadouken, p2hurt, ground])

let level = 0;
const levels = [
  map`
vvvvvv..yyyyyy
..............
..............
..............
..............
....d....j....
gggggggggggggg
gggggggggggggg`
]

var y = 5;

// player 1 variables
var p1_x = 4;
// states: d --> disabled, i --> idle, h --> hurt, a --> attacking
var p1State = "d";
var p1Health = 6;
var p1HadoukenExists = false;

// player 2 variables
var p2_x = 9;
var p2State = "d";
var p2Health = 6;
var p2HadoukenExists = false;

setMap(levels[level])

function init() {
  p1State = "i";
  p2State = "i";
  addText("FIGHT!", {
    x: 7,
    y: 3,
    color: color`0`
  });
  setTimeout(() => {clearText();}, 1000);
}

function countdown() {
  addText(String(3), {
    x: 9,
    y: 3,
    color: color`0`
  });
  for (let i=2; i > 0; i--) {
    setTimeout(() => {
      clearText();
    }, 1000*(3-i)-500);
    setTimeout(() => {
      addText(String(i), {
        x: 9,
        y: 3,
        color: color`0`
      });
    }, 1000*(3-i));
  }
  setTimeout(() => {
    clearText();
  }, 2500);
  setTimeout(() => {
    init();
  }, 3000);
}

countdown()

function damaged(player1) {
  // if both players attack at the same time, there will be a 'clash' or a 'parry' - neither player will receive damage, but they will both be knocked back
  if (player1 == true && (p1State == "i" || p2State == "a")) {
    if (p1State == "i") {
      p1Health -= 1;
      clearTile(p1Health, 0);
    }

    p1State = "h";
    if (p1_x > 0) {
      p1_x -= 1;
    }
    getFirst(p1).x -= 1;
    getFirst(p1).type = p1hurt;

    setTimeout(() => {
      p1State = "i";
      if (p1_x > 0) {
        p1_x -= 1;
      }
      getFirst(p1hurt).x -= 1;
      getFirst(p1hurt).type = p1;
    }, 200);
  }
  else if (player1 == false && (p2State == "i" || p2State == "a")) {
    if (p2State == "i") {
      p2Health -= 1;
      clearTile(13-p2Health, 0);
    }
    
    p2State = "h";
    if (p2_x < 13) {
      p2_x += 1;
    }
    getFirst(p2).x += 1;
    getFirst(p2).type = p2hurt;

    setTimeout(() => {
      p2State = "i";
      if (p2_x < 13) {
        p2_x += 1;
      }
      getFirst(p2hurt).x += 1;
      getFirst(p2hurt).type = p2;
    }, 200)
  }
}

async function spawnHadouken(player1, deflected=false) {
  var hadouken;
  var direction = 1;
  if (player1 == true && deflected == false) {
    addSprite(p1_x + 1, y, hadouken_p1);
    hadouken = hadouken_p1;
  }
  else if (player1 == true && deflected == true) {
    addSprite(p2_x - 1, y, hadouken_p1_deflected);
    hadouken = hadouken_p1_deflected;
    direction = -1;
  }
  else if (player1 == false && deflected == false) {
    addSprite(p2_x - 1, y, hadouken_p2);
    hadouken = hadouken_p2;
    direction = -1;
  }
  else if (player1 == false && deflected == true) {
    addSprite(p1_x + 1, y, hadouken_p2_deflected);
    hadouken = hadouken_p2_deflected;
  }
  var hit = false;
  while (hit != true) {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (getFirst(hadouken).x == 0 || getFirst(hadouken).x == 13) {
      hit = true;
      getFirst(hadouken).remove()
      
      if (player1 == true){
        p1HadoukenExists = false
      }
      else {
        p2HadoukenExists = false
      }
      break;
    }
    getFirst(hadouken).x += 1 * direction;
    for (i in getTile(getFirst(hadouken).x, y)) {
      let obj = getTile(getFirst(hadouken).x, y)[i]
      // player1's hadouken hit player2
      if (obj["_type"] == "j") { 
        hit = true;
        damaged(false);
        getFirst(hadouken).remove();

        if (player1 == true){
          p1HadoukenExists = false
        }
        else {
          p2HadoukenExists = false
        }
        break;
      }
      // player2's hadouken hit player1
      else if (obj["_type"] == "d") { 
        hit = true;
        damaged(true);
        getFirst(hadouken).remove();

        if (player1 == true){
          p1HadoukenExists = false
        }
        else {
          p2HadoukenExists = false
        }
        break;
      }
      // player1 or player2 deflected!
      else if (obj["_type"] == "s" || obj["_type"] == "k") {
        hit = true;
        getFirst(hadouken).remove();
        spawnHadouken(player1, !deflected)
        break;
      }
    }
  }
}

// P1: move right
onInput("d", () => {
  if (p1State == "i") {
    getFirst(p1).x += 1;
    // if p1 is not in front of p2
    if (p1_x < p2_x - 1) {
      p1_x += 1;
    }
  }
});

// P1: move left
onInput("a", () => {
  if (p1State == "i") {
    getFirst(p1).x -= 1;
    // if p1 is within game boundaries
    if (p1_x != 0) {
      p1_x -= 1;
    }
  }
});

// P1: punch or guard
onInput("w", () => {
  if (p1State == "i") {
    p1State = "a";

    if (p1HadoukenExists == true || p2HadoukenExists == true) {
      getFirst(p1).type = p1guard;
      setTimeout(() => {
        getFirst(p1guard).type = p1;
        p1State = "i";
      }, 120);
    }
    else {
      getFirst(p1).type = p1punch;
      if (p2_x == p1_x + 1) {
        damaged(false);
      }
      setTimeout(() => {
        getFirst(p1punch).type = p1;
        p1State = "i";
      }, 200);
    }
  }
});

// P1: hadouken
onInput("s", () => {
  if (p1State == "i" && p1HadoukenExists == false) {
    p1State = "a";
    p1HadoukenExists = true;
    getFirst(p1).type = p1hadouken;
    spawnHadouken(true)
    setTimeout(() => {
      getFirst(p1hadouken).type = p1;
      p1State = "i";
    }, 480);
  }
});

// P2: move left
onInput("j", () => {
  if (p2State == "i") {
    getFirst(p2).x -= 1;
    // if p2 is not in front of p1
    if (p2_x > p1_x + 1) {
      p2_x -= 1;
    }
  }
});

// P2: move right
onInput("l", () => {
  if (p2State == "i") {
    getFirst(p2).x += 1;
    // if p2 is not in front of p1
    if (p2_x != 13) {
      p2_x += 1;
    }
  }
});

// P2: punch
onInput("i", () => {
  if (p2State == "i") {
    p2State = "a";

    if (p1HadoukenExists == true || p2HadoukenExists == true) {
      getFirst(p2).type = p2guard;
      setTimeout(() => {
        getFirst(p2guard).type = p2;
        p2State = "i";
      }, 120);
    }
    else {
      getFirst(p2).type = p2punch;
      if (p1_x == p2_x - 1) {
        damaged(true);
      }
      setTimeout(() => {
        getFirst(p2punch).type = p2;
        p2State = "i"
      }, 200);
    }
  }
});

// P2: hadouken
onInput("k", () => {
  if (p2State == "i" && p2HadoukenExists == false) {
    p2State = "a";
    p2HadoukenExists = true;
    getFirst(p2).type = p2hadouken;
    spawnHadouken(false);
    setTimeout(() => {
      getFirst(p2hadouken).type = p2;
      p2State = "i";
    }, 480);
  }
});

afterInput(() => {
  if (p1Health == 0) {
    setTimeout(() => {
      p1State = "d";
      p2State = "d";
    }, 500);

    clearText()
    addText("P2 WINS!", {
      x: 6,
      y: 3,
      color: color`0`
    });
  }
  else if (p2Health == 0) {
    setTimeout(() => {
      p1State = "d";
      p2State = "d";
    }, 500);

    clearText()
    addText("P1 WINS!", {
      x: 6,
      y: 3,
      color: color`0`
    });
  }
})
