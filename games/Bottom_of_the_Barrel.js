/*
@title: Bottom_of_the_Barrel
@author: Ozfolo
@tags: ['strategy']
@addedOn: 2022-12-01
*/
/*
Controls: A and D for moving in game, WASD for navigating menus, J for select, 
          W when player is infront of a ladder or chest.
*/
let gameOver = false;

const player = "p";
const wood = "w";
const next = "n";
const prev = "b";
const slime = "s";
const deselected1 ="u";
const selected1 = "y";
const deselected2 ="v";
const selected2 = "z";
const blackBox = "x";
const greyBox = "q";
const ghost = "g";
const ladder = "l";
const chest = "t";
const bat = "h";
const pig = "m";
const spider = "a";
const fball = "f";
const robot = "r";
const demon = "d";
const sky = "k";
let floor = 0;
let enemyTiles = ["s","s","g","g","h","m","a","g","m","r","r","d"];
let e ="0";
let eS = {};
let thisMap = 0;
var battleMode = false;
var box1l ="y";
var box2l ="u";
var box3l ="u";
var box4l ="u";
var box1r ="z";
var box2r="v";
var box3r ="v";
var box4r ="v";
var bmScreen = 0;
let prevPlayerx = 0;
let prevPlayery = 0;
let hp = 100;
let maxHp = hp;
let df = 50;
let at = 30;
let currentE = 0;
var playerTurn = false;
let demonStats = {};
let robotStats = {};
let spiderStats = {};
let pigStats = {};
let batStats = {};
let ghostStats = {};
let slimeStats = {};
var playerStats = {};
let playerItems = [];

function startingValues() {
  floor = 0;
  enemyTiles = ["s","s","g","g","h","m","a","g","m","r","r","d"];
  e ="0";
  eS = {};
  thisMap = 0;
  battleMode = false;
  box1l ="y";
  box2l ="u";
  box3l ="u";
  box4l ="u";
  box1r ="z";
  box2r="v";
  box3r ="v";
  box4r ="v";
  bmScreen = 0;
  prevPlayerx = 0;
  prevPlayery = 0;
  hp = 100;
  maxHp = hp;
  df = 50;
  at = 25;
  currentE = 0;
  playerTurn = false;
  demonStats = {"health": 600, "defence": 100, "attack": 350,"XP": 10000, "weakness": "none", "strength": "fire"};
  robotStats = {"health": 450, "defence": 100, "attack": 300,"XP": 1000, "weakness": "throw", "strength": "fire"};
  spiderStats = {"health": 300, "defence": 70, "attack": 250,"XP": 500, "weakness": "fire", "strength": "cut"};
  pigStats = {"health": 400, "defence": 50, "attack": 300,"XP": 400, "weakness": "cut", "strength": "throw"};
  slimeStats = {"health": 40, "defence": 25, "attack": 30,"XP": 100, "weakness": "none", "strength": "none"};
  batStats = {"health": 75, "defence": 100, "attack": 300,"XP": 300, "weakness": "throw", "strength": "cut"};
  ghostStats = {"health": 100, "defence": 50, "attack": 75,"XP": 125, "weakness": "fire", "strength": "cut"};
  playerStats = {"health": hp, "defence": df, "attack": at,"XP": 0,"Level": 1};
  playerItems = ["Potion","None","None"];
}
startingValues();
function setSprites(playerSprite, fireball) {
setLegend(
  [player,playerSprite],
  [wood,bitmap`
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC`],
  [next,bitmap`
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC`],
  [prev,bitmap`
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC`],
  [slime,bitmap`
................
................
................
................
................
................
................
................
.....DDDDDD.....
....DDDDDDDD....
...DD0DDDD0DD...
..DDD0DDDD0DDD..
.DDDDDDDDDDDDDD.
DDDDDDDDDDDDDDDD
DDDDDD0000DDDDDD
DDDDD0DDDD0DDDDD`],
  [deselected1,bitmap`
2222222222222222
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2000000000000000
2222222222222222`],
  [selected1,bitmap`
6666666666666666
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6000000000000000
6666666666666666`],
  [deselected2,bitmap`
2222222222222222
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
0000000000000002
2222222222222222`],
  [selected2,bitmap`
6666666666666666
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
0000000000000006
6666666666666666`],
  [blackBox,bitmap`
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
  [ghost,bitmap`
......2222......
.....222222.....
....22222222....
...2222222222...
...2202222022...
...2202222022...
...2202222022...
...2222222222...
...2220000222...
...2200000022...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
....2222222222..
.....2222222222.`],
  [ladder,bitmap`
FF............FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF............FF
FF............FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF............FF
FF............FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF............FF
FF............FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF............FF`],
  [greyBox,bitmap`
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
  [chest,bitmap`
0000000000000000
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000110000000
0FFFFFF11FFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000000000000`],
  [bat,bitmap`
................
......0..0......
.....000000.....
.....060060.....
0....000000....0
0000002332000000
0000003333000000
0000000000000000
0000000000000000
0.0..000000..0.0
......0000......
.......00.......
................
................
................
................`],
  [pig,bitmap`
................
................
00000000000000..
088888880888880.
0888888080888080
0888888000000000
0888888088888880
0888888082080280
0888888088888880
0888888088080880
0888888088888880
0888888000000000
0000000000000...
08080...08080...
08080...08080...
00000...00000...`],
  [spider,bitmap`
................
......0.0.......
...0..0.0..0....
....0.0.0.0.....
.....00000......
.000.00000.0000.
0300000000000000
0000000000000000
0300000000000000
.000.00000.0000.
.....00000......
....0.0.0.0.....
...0..0.0..0....
......0.0.......
................
................`],
  [robot,bitmap`
........D.......
........L.......
........L.......
......LLLL......
......L11L......
......L31L......
......L11L......
......LLLL......
...LLLL11L......
...L11111L......
...L11111L......
...LLLLLLL......
......L11L......
......LLLL......
......L..L......
......L..L......`],
  [demon,bitmap`
....F......F....
....F333333F....
....33333333....
....32033023....
....33333333....
....30000003....
.....333333.....
......3333......
.....002200.....
.....002200.....
.....002200.....
.....002200.....
.....002200.....
.....300003.....
......0..0......
......0..0......`],
  [sky, bitmap`
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
  [fball,fireball],
  )
}
function battleMap() {
  setMap( map`
......
pf...${e}
${box1l}${box1r}xx${box2l}${box2r}
${box3l}${box3r}xx${box4l}${box4r}`);
}
var playerR = bitmap`
..000000........
.02222220.......
0222220220......
0222222220......
0222220000......
0222222220......
.02222220.......
..000000........
...0330.........
...0330.........
...0330.........
...0330L........
...L22LL11111111
...5555L........
...5..5.........
...0..0.........`;
var playerL = bitmap`
........000000..
.......02222220.
......0220222220
......0222222220
......0000222220
......0222222220
.......02222220.
........000000..
.........0330...
.........0330...
.........0330...
........L0330...
11111111LL22L...
........L5555...
.........5..5...
.........0..0...`;
var playerAway = bitmap`
.....000000.....
....02222220....
...0222222220...
...0222222220...
...0222222220...
...0222222220...
....02222220....
.....000000.....
....03033030....
....03033030....
....03033030....
....03033030....
....020000L0....
.....055550.....
......5..5......
......0..0......`;
var playerStrike1 = bitmap`
..000000..1.....
.02222220.1.....
02222202201.....
02222222201.....
02222200001.....
02222222201.....
.02222220.1.....
..000000..1.....
...0330...1.....
...033000LLL....
...0333332L.....
...0333332L.....
...0000000L.....
...5555.........
...5..5.........
...0..0.........`;
var playerStrike2 = bitmap`
..000000........
.02222220.......
0222220220......
0222222220......
0222220000..66..
0222222220....6.
.02222220.66...1
..000000....6.1.
...0330......1..
...0330000L.1...
...03333322L....
...0333332L.L...
...000000L......
...5555.........
...5..5.........
...0..0.........`;
var playerThrow = bitmap`
..000000........
.02222L20.......
022LLLL11111111.
022022L220......
0220330000......
0220330220......
.02033020.......
..003300........
...0000.........
...0330.........
...0330.........
...0330.........
...0330.........
...5555.........
...5..5.........
...0..0.........`;
var playerEmptyHand = bitmap`
..000000........
.02222220.......
0222220220......
0222222220......
0222220000......
0222222220......
.02222220.......
..000000........
...0330.........
...0330.........
...0330.........
...0330.........
...0220.........
...5555.........
...5..5.........
...0..0.........`;
var fballVis = bitmap`
................
................
.3333333333333..
..399999999993..
.3399999999993..
33399666666993..
..399666666993..
.3399662266993..
.3399662266993..
..399666666993..
33399666666993..
.3399999999993..
..399999999993..
.3333333333333..
................
................`;
var swordThrown = bitmap`
................
................
................
................
................
................
....L...........
.LLLL1111111111.
....L...........
................
................
................
................
................
................
................`;
var fballInVis = bitmap`
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
................`;

setSprites(playerR, fballInVis)
setSolids([ player, slime, ghost, bat, pig, spider, robot, demon ])
setBackground(wood);
var levels = [];
function setLevels() {
  levels = [
    map`
..........
..........
..........
..........
..........
..........
..........`,
    map`
......
......
.p...n`,
    map`
......
......
bp..${enemyTiles[0]}n`,
    map`
......
......
bp.${enemyTiles[1]}.n`,
    map`
......
......
bp.${enemyTiles[2]}.n`,
    map`
.....l
.....l
bp...l`,
    map`
.......
.......
n.${enemyTiles[3]}..p.
qqqqqqq`,
    map`
.......
.......
n..t.pb
qqqqqqq`,
    map`
.......
.${enemyTiles[4]}.....
n....pb
qqqqqqq`,
    map`
.......
.......
n${enemyTiles[5]}...pb
qqqqqqq`,
    map`
l......
l......
l....pb
qqqqqqq`,
    map`
.......
.......
p..t..n
qqqqqqq`,
    map`
.......
.......
bp..${enemyTiles[6]}.n
qqqqqqq`,
    map`
.......
.......
bp..${enemyTiles[7]}.n
qqqqqqq`,
    map`
......l
......l
bp..t.l
qqqqqqq`,
    map`
.......
.......
n.....p
qqqqqqq`,
    map`
.......
.......
n.${enemyTiles[8]}..pb
qqqqqqq`,
    map`
.......
.......
n.${enemyTiles[9]}..pb
qqqqqqq`,
    map`
l......
l......
l....pb
qqqqqqq`,
    map`
.......
.......
p..${enemyTiles[10]}t.n
qqqqqqq`,
    map`
.......
.......
bp...${enemyTiles[11]}n
qqqqqqq`,
    map`
......l
......l
bp....l
qqqqqqq`,
    map`
.......
.......
......p
qqqqqqq`,
  ]
}
setLevels();
function endTurn() {
  checkDead();
  bmScreen = 0;
  bmScreenReset();
  statsShow();
  playerTurn = false;
  enemyTurn();

}
function levelUp() {
  clearText();
  if(playerStats["XP"] >= 100 && playerStats["XP"] < 500 && playerStats["Level"] == 1) {
    playerStats["Level"] = 2;
    setTimeout(() => {
      addText("Level Up!", { 
        x: 5,
        y: 5,
        color: color`6`
      }) 
    }, "600" )
    setTimeout(() => {
      clearText();
    }, "1400")
  }
  else if(playerStats["XP"] >= 500 && playerStats["XP"] < 1200 && playerStats["Level"] == 2) {
    playerStats["Level"] = 3;
    setTimeout(() => {
      addText("Level Up!", { 
        x: 5,
        y: 5,
        color: color`6`
      }) 
    }, "600" )
    setTimeout(() => {
      clearText();
    }, "1400")
  }
  else if(playerStats["XP"] >= 1200 && playerStats["XP"] < 2500 && playerStats["Level"] == 3) {
    playerStats["Level"] = 4;
    setTimeout(() => {
      addText("Level Up!", { 
        x: 5,
        y: 5,
        color: color`6`
      }) 
    }, "600" )
    setTimeout(() => {
      clearText();
    }, "1400")
  }
  else if(playerStats["XP"] >= 2500 && playerStats["Level"] == 4) {
    playerStats["Level"] = 5;
    setTimeout(() => {
      addText("Level Up!", { 
        x: 5,
        y: 5,
        color: color`6`
      }) 
    }, "600" )
    setTimeout(() => {
      clearText();
    }, "1400")
  }
}

function resetBattleStats() {
  playerStats["health"] = hp*playerStats["Level"];
  playerStats["defence"] = df*playerStats["Level"];
  playerStats["attack"] = at*playerStats["Level"];
  slimeStats = {"health": 40, "defence": 25, "attack": 30,"XP": 100, "weakness": "none", "strength": "none"};
  ghostStats = {"health": 100, "defence": 50, "attack": 75,"XP": 125, "weakness": "fire", "strength": "cut"};
  batStats = {"health": 75, "defence": 100, "attack": 300,"XP": 300, "weakness": "throw", "strength": "cut"};
  pigStats = {"health": 400, "defence": 50, "attack": 300,"XP": 400, "weakness": "cut", "strength": "throw"};
  spiderStats = {"health": 300, "defence": 70, "attack": 250,"XP": 500, "weakness": "fire", "strength": "cut"};
  robotStats = {"health": 500, "defence": 100, "attack": 300,"XP": 1000, "weakness": "throw", "strength": "fire"};
  demonStats = {"health": 600, "defence": 100, "attack": 350,"XP": 10000, "weakness": "none", "strength": "fire"};
}

function item(type) {
  if(type == "Potion") {
    if(playerStats["health"] + 500 <= hp*playerStats["Level"]) {
      playerStats["health"] += 500;
    }
    else if(playerStats["health"] + 500 > hp*playerStats["Level"]) {
      playerStats["health"] = hp*playerStats["Level"];
    }
    addText("+500", { 
          x: 7,
          y: 2,
          color: color`6`
        })
    playerItems[0] = "None";
    setTimeout(() => {
      statsShow();
      endTurn();
    }, "400")
  }
  else if(type == "Cake") {
    if(playerStats["health"] + 300 <= hp*playerStats["Level"]) {
      playerStats["health"] += 300;
    }
    else if(playerStats["health"] + 300 > hp*playerStats["Level"]) {
      playerStats["health"] = hp*playerStats["Level"];
    }
    addText("+300", { 
          x: 7,
          y: 2,
          color: color`6`
        })
    playerItems[1] = "None";
    setTimeout(() => {
      statsShow();
      endTurn();
    }, "400")
  }
  else if(type == "None") {

  }
}
function attack(type) {

    if(type == "slash") {
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "25")
      setTimeout(() => {
        setSprites(playerStrike2, fballInVis);
      }, "75")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
        getFirst(player).x += 1;
      }, "100")
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "125")
      setTimeout(() => {
        setSprites(playerStrike2, fballInVis);
      }, "175")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
        getFirst(player).x += 1;
      }, "200")
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "225")
      setTimeout(() => {
        setSprites(playerStrike2, fballInVis);
      }, "275")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
        getFirst(player).x += 1;
      }, "300")
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "325")
      setTimeout(() => {
        setSprites(playerStrike2, fballInVis);
      }, "375")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
        getFirst(player).x += 1;
      }, "400")
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "425")
      setTimeout(() => {
        setSprites(playerStrike2, fballInVis);
      }, "475")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
        getFirst(player).x += 1;
      }, "500")
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "525")
      setTimeout(() => {
        setSprites(playerStrike2, fballInVis);
      }, "575")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
      }, "600")
      setTimeout(() => {
        getFirst(player).x += -1;
      }, "700")
      setTimeout(() => {
        getFirst(player).x += -1;
      }, "800")
      setTimeout(() => {
        getFirst(player).x += -1;
      }, "900")
      setTimeout(() => {
        getFirst(player).x += -1;
      }, "1000")

      if(eS["weakness"] == "cut") {
        eS["health"] += Math.round(-((playerStats["attack"]*2)*(100/(100+eS["defence"]))));
        addText("Weak!", { 
          x: 13,
          y: 3,
          color: color`6`
        })
      }
      else if(eS["strength"] == "cut") {
        eS["health"] += Math.round(-((playerStats["attack"]/2)*(100/(100+eS["defence"]))));
        addText("Resist!", { 
          x: 13,
          y: 3,
          color: color`6`
        })
      }
      else {
        eS["health"] += Math.round(-(playerStats["attack"]*(100/(100+eS["defence"]))));
      }
    }
    else if(type == "fire") {
      setTimeout(() => {
        setSprites(playerStrike1, fballInVis);
      }, "100")
      setTimeout(() => {
        setSprites(playerStrike2, fballVis);
      }, "150")
      setTimeout(() => {
        setSprites(playerR, fballVis);
        getFirst(fball).x += 1;
      }, "175")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "200")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "225")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "250")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "275")
      setTimeout(() => {
        setSprites(playerR, fballInVis);
        getFirst(fball).x += -5;
      }, "300")

      if(eS["weakness"] == "fire") {
        eS["health"] += Math.round(-((playerStats["attack"]*2)*(100/(100+eS["defence"]))));
        addText("Weak!", { 
          x: 13,
          y: 3,
          color: color`6`
        })
      }
      else if(eS["strength"] == "fire") {
        eS["health"] += Math.round(-((playerStats["attack"]/2)*(100/(100+eS["defence"]))));
        addText("Resist!", { 
          x: 13,
          y: 3,
          color: color`6`
        })
      }
      else {
        eS["health"] += Math.round(-(playerStats["attack"]*(100/(100+eS["defence"]))));
      }
    }

    else if(type == "throw") {
      setTimeout(() => {
        setSprites(playerThrow, fballInVis);
      }, "100")
      setTimeout(() => {
        setSprites(playerEmptyHand, swordThrown);
      }, "150")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "175")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "200")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "225")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "250")
      setTimeout(() => {
        getFirst(fball).x += 1;
      }, "275")
      setTimeout(() => {
        getFirst(fball).x += -1;
      }, "300")
      setTimeout(() => {
        getFirst(fball).x += -1;
      }, "325")
      setTimeout(() => {
        getFirst(fball).x += -1;
      }, "350")
      setTimeout(() => {
        getFirst(fball).x += -1;
      }, "375")
      setTimeout(() => {
        setSprites(playerR, fballInVis)
      }, "400")


      if(eS["weakness"] == "throw") {
        eS["health"] += Math.round(-((playerStats["attack"]*2)*(100/(100+eS["defence"]))));
        addText("Weak!", { 
          x: 13,
          y: 3,
          color: color`6`
        })
      }
      else if(eS["strength"] == "throw") {
        eS["health"] += Math.round(-((playerStats["attack"]/2)*(100/(100+eS["defence"]))));
        addText("Resist!", { 
          x: 13,
          y: 3,
          color: color`6`
        })
      }
      else {
        eS["health"] += Math.round(-(playerStats["attack"]*(100/(100+eS["defence"]))));
      }
    }

  setTimeout(() => {
    clearText();
    bmScreenReset();
    statsShow();
  }, "600")
  setTimeout(() => {
    endTurn();
  }, "1100")

}
function statsShow(){
 addText(`HP: ${playerStats["health"]}`, { 
    x: 0,
    y: 2,
    color: color`2`
  })
  addText(`HP: ${eS["health"]}`, { 
    x: 13,
    y: 2,
    color: color`2`
  }) 
  addText(`LVL: ${playerStats["Level"]}`, { 
    x: 0,
    y: 3,
    color: color`2`
  })

}
function bmScreenReset() {
  clearText();
  statsShow();
  addText("Fight", { 
    x: 1,
    y: 9,
    color: color`2`
  })
  addText("Items", { 
    x: 14,
    y: 9,
    color: color`2`
  })
  addText("Info", { 
    x: 1,
    y: 13,
    color: color`2`
  })
  addText("Escape", { 
    x: 14,
    y: 13,
    color: color`2`
  })
}
function startGame() {
  clearText();
  startingValues();
  setLevels();
  setMap(levels[0]);
  setBackground(wood);
  addText("Bottom of the Barrel", { 
    x: 0,
    y: 4,
    color: color`2`
  })
  addText("Press J to Start", { 
    x: 2,
    y: 11,
    color: color`2`
  })
}

function nextR() {
  if(floor == 0 || floor/2 == Math.round(floor/2)) {
    setMap(levels[thisMap+1]);
    thisMap += 1;
    getFirst(player).x += -1;
    clearText();
  }
  else if(floor != 0 && floor/2 != Math.round(floor/2)) {
    setMap(levels[thisMap+1]);
    thisMap += 1;
    getFirst(player).x += 1;
    clearText();
  }
}
function prevR() {
  if(floor == 0 || floor/2 == Math.round(floor/2)) {
    setMap(levels[thisMap-1]);
    thisMap += -1;
    getFirst(player).x += 4;
    clearText();
  }
  else if(floor != 0 && floor/2 != Math.round(floor/2)){
    setMap(levels[thisMap-1]);
    thisMap += -1;

    clearText();
  }
}
function battle(enemy, enemyStats) {
  prevPlayerx = getFirst(player).x;
  prevPlayery = getFirst(player).y;
  maxHp = hp;
  battleMode = true;
  playerTurn = true;
  setBackground(wood);
  e = enemy;
  eS = enemyStats;
  setSprites(playerR, fballInVis);
  bmScreenReset();
  battleMap();
}
function checkDead() {
  if(playerStats["health"] <= 0 && battleMode) {
    clearText();
    setBackground(blackBox)
    setMap(map`
......
......
......
......`);
    gameOver = true;
    startingValues();
    setSprites(playerR, fballInVis);
    addText("GAME OVER", { 
      x: 5,
      y: 2,
      color: color`2`
    })
    addText("Press J to restart", { 
      x: 1,
      y: 11,
      color: color`2`
    })
  }
  else if(eS["health"] <= 0 && battleMode) {
    clearText();
    playerStats["XP"] += eS["XP"];
    battleMode = false;
    enemyTiles[currentE] = ".";
    currentE += 1;
    setLevels();
    setMap(levels[thisMap]);
    getFirst(player).x = prevPlayerx;
    getFirst(player).y = prevPlayery;
    levelUp();
    resetBattleStats();
  }

}
function enemyTurn() {
  if(eS["health"] > 0) {
    clearText();
    statsShow();
    setTimeout(() => {
      getFirst(e).x += -1;
    }, "100")
    setTimeout(() => {
      getFirst(e).x +=-1;
    }, "200")
    setTimeout(() => {
      getFirst(e).x += -1;
    }, "300")
    setTimeout(() => {
      getFirst(e).x += -1;
    }, "400")
    setTimeout(() => {
      getFirst(e).x += -1;
    }, "500")
    setTimeout(() => {
      getFirst(e).x += 1;
    }, "700")
    setTimeout(() => {
      getFirst(e).x += 1;
    }, "800")
    setTimeout(() => {
      getFirst(e).x += 1;
    }, "900")
    setTimeout(() => {
      getFirst(e).x += 1;
    }, "1000")
    setTimeout(() => {
      clearText();
      playerStats["health"] += Math.round(-(eS["attack"] * (100/(100+playerStats["defence"])))); 
      statsShow(); 
    }, "600" )
    setTimeout(() => {
      checkDead();
      if(battleMode == true) {
        bmScreenReset();
        playerTurn = true;
      }
    }, "1100")
  }
  else {
    clearText();
    checkDead();
  }
}

startGame();
resetBattleStats();

onInput("d", () => {
  if(typeof getFirst(player) !== 'undefined' && battleMode == false && floor != 5) {
    getFirst(player).x += 1;
    setSprites(playerR, fballInVis);
    if(typeof getFirst(next) !== 'undefined' && getFirst(player).x == getFirst(next).x) {
      nextR();
    }
    else if(typeof getFirst(prev) !== 'undefined' && getFirst(player).x == getFirst(prev).x) {
      prevR();
      getFirst(player).x += -5;
    }
    else if(typeof getFirst(slime) !== 'undefined' && getFirst(player).x == getFirst(slime).x -1 ) {
      battle(slime, slimeStats);
    }
    else if(typeof getFirst(ghost) !== 'undefined' && getFirst(player).x == getFirst(ghost).x -1 ) {
      battle(ghost, ghostStats);
    }
    else if(typeof getFirst(bat) !== 'undefined' && getFirst(player).x == getFirst(bat).x -1 ) {
      battle(bat, batStats);
    }
    else if(typeof getFirst(pig) !== 'undefined' && getFirst(player).x == getFirst(pig).x -1 ) {
      battle(pig, pigStats);
    }
    else if(typeof getFirst(spider) !== 'undefined' && getFirst(player).x == getFirst(spider).x -1 ) {
      battle(spider, spiderStats);
    }
    else if(typeof getFirst(robot) !== 'undefined' && getFirst(player).x == getFirst(robot).x -1 ) {
      battle(robot, robotStats);
    }
    else if(typeof getFirst(demon) !== 'undefined' && getFirst(player).x == getFirst(demon).x -1 ) {
      battle(demon, demonStats);
    }
  }
  else if(battleMode == true && playerTurn) {
    if(box1l == "y") {
      box1l = "u";
      box1r = "v";
      box2l = "y";
      box2r = "z";
      battleMap();
    }
    else if(box3l == "y") {
      box3l = "u";
      box3r = "v";
      box4l = "y";
      box4r = "z";
      battleMap();
    }
  }
})
onInput("a", () => {
  if(typeof getFirst(player) !== 'undefined' && battleMode == false && floor != 5) {
    getFirst(player).x += -1;
    setSprites(playerL, fballInVis);
    if(typeof getFirst(prev) !== 'undefined' && getFirst(player).x == getFirst(prev).x) {
      prevR();
    }
    else if(typeof getFirst(next) !== 'undefined' && getFirst(player).x == getFirst(next).x) {
      nextR();
      getFirst(player).x += 2;
    }
    else if(typeof getFirst(slime) !== 'undefined' && getFirst(player).x == getFirst(slime).x +1 ) {
      battle(slime, slimeStats);
    }
    else if(typeof getFirst(ghost) !== 'undefined' && getFirst(player).x == getFirst(ghost).x +1 ) {
      battle(ghost, ghostStats);
    }
    else if(typeof getFirst(bat) !== 'undefined' && getFirst(player).x == getFirst(bat).x +1 ) {
      battle(bat, batStats);
    }
    else if(typeof getFirst(pig) !== 'undefined' && getFirst(player).x == getFirst(pig).x +1 ) {
      battle(pig, pigStats);
    }
    else if(typeof getFirst(spider) !== 'undefined' && getFirst(player).x == getFirst(spider).x +1 ) {
      battle(spider, spiderStats);
    }
    else if(typeof getFirst(robot) !== 'undefined' && getFirst(player).x == getFirst(robot).x +1 ) {
      battle(robot, robotStats);
    }
    else if(typeof getFirst(demon) !== 'undefined' && getFirst(player).x == getFirst(demon).x +1 ) {
      battle(demon, demonStats);
    }
  }
  else if(battleMode == true && playerTurn) {
    if(box2l == "y") {
      box2l = "u";
      box2r = "v";
      box1l = "y";
      box1r = "z";
      battleMap();
    }
    else if(box4l == "y") {
      box4l = "u";
      box4r = "v";
      box3l = "y";
      box3r = "z";
      battleMap();
    }
  }

})
onInput("s", () => {
  if(battleMode == true && playerTurn) {
    if(box1l == "y") {
      box1l = "u";
      box1r = "v";
      box3l = "y";
      box3r = "z";
      battleMap();
    }
    else if(box2l == "y") {
      box2l = "u";
      box2r = "v";
      box4l = "y";
      box4r = "z";
      battleMap();
    }
  }
})
onInput("w", () => {
  if(typeof getFirst(ladder) !== 'undefined' && getFirst(player).x == getFirst(ladder).x) {
    setMap(levels[thisMap+1]);
    thisMap += 1;
    floor += 1;
    if(floor == 5) {
      setBackground(sky);
      addText("The End", { 
      x: 6,
      y: 4,
      color: color`2`
    })
    setSprites(playerAway, fballInVis);
    }
    else if(floor/2 != Math.round(floor/2)&& floor != 5) {
      setSprites(playerL, fballInVis);
      getFirst(player).x += 1;
    }
    else if(floor/2 == Math.round(floor/2)&& floor != 5) {
      setSprites(playerR, fballInVis);
      getFirst(player).x += -1;
    }
  }
  else if(typeof getFirst(chest) !== 'undefined' && getFirst(player).x == getFirst(chest).x && playerItems[1] != "Cake") {
    playerItems[1] = "Cake";
    addText("Got Cake!", { 
      x: 5,
      y: 5,
      color: color`6`
    })
    setTimeout(() => {
      clearText();
  }, "800")
  }
  else if(battleMode == true && playerTurn) {
    if(box3l == "y") {
      box3l = "u";
      box3r = "v";
      box1l = "y";
      box1r = "z";
      battleMap();
    }
    else if(box4l == "y") {
      box4l = "u";
      box4r = "v";
      box2l = "y";
      box2r = "z";
      battleMap();
    }
  }

})

onInput("j", () => {
  if(gameOver) {
    gameOver = false;
    startGame();
  }
  else if(thisMap == 0) {
    setMap(levels[1]);
    thisMap = 1;
    getFirst(player).x += -1;
    clearText();
  }
  else if(battleMode == true && playerTurn) { 
    if(battleMode == true && bmScreen == 0) {
      if(box1l == "y") {
        bmScreen = 1;
        clearText();
        statsShow();
        addText("Slash", { 
          x: 1,
          y: 9,
          color: color`2`
        })
        addText("Fire", { 
          x:14,
          y: 9,
          color: color`2`
        })
        addText("ball", { 
          x:14,
          y: 10,
          color: color`2`
        })
        addText("Back", { 
          x: 14,
          y: 13,
          color: color`2`
        })
        addText("Yeet", { 
          x: 1,
          y: 13,
          color: color`2`
        })
      }
      else if(box2l == "y") {
        bmScreen = 2;
        clearText();
        statsShow();
        addText(playerItems[0], { 
          x: 0,
          y: 9,
          color: color`2`
        })
        addText(playerItems[1], { 
          x:14,
          y: 9,
          color: color`2`
        })
        addText(playerItems[2], { 
          x: 1,
          y: 13,
          color: color`2`
        })
        addText("Back", { 
          x: 14,
          y: 13,
          color: color`2`
        })
      }
      else if(box3l == "y") {
        bmScreen = 3;
        clearText();
        statsShow();
        addText(`ATT: ${playerStats["attack"]}`, { 
          x: 0,
          y: 9,
          color: color`2`
        })
        addText(`DEF: ${playerStats["defence"]}`, { 
          x: 13,
          y: 9,
          color: color`2`
        })
        addText("Back", { 
          x: 14,
          y: 13,
          color: color`2`
        })
      }
      else if(box4l == "y") {
        clearText();
        statsShow();
        if(Math.random() < 0.5 && currentE != 11) {
          battleMode = false;
          enemyTiles[currentE] = ".";
          currentE += 1;
          setLevels();
          setMap(levels[thisMap]);
          getFirst(player).x = prevPlayerx;
          getFirst(player).y = prevPlayery;
          clearText();
          levelUp();
          resetBattleStats();
        }
        else {
          endTurn();
        }
    }
    }
    else if(battleMode == true && bmScreen == 1) {
      if(box1l == "y") {
        attack("slash");
      }
      else if(box2l == "y") {
        attack("fire");
      }
      else if(box3l == "y") {
        attack("throw")
      }
      else if(box4l =="y") {
        bmScreenReset();
        bmScreen = 0;
      }
    }
    else if(battleMode == true && bmScreen == 2) {
      if(box1l == "y") {
        item(playerItems[0]);
      }
      else if(box2l == "y") {
        item(playerItems[1]);
      }
      else if(box3l == "y") {
        item(playerItems[2]);
      }
      else if(box4l =="y") {
        bmScreenReset();
        bmScreen = 0;
      }
    }
    else if(battleMode == true && bmScreen == 3) {
      if(box4l =="y") {
        bmScreenReset();
        bmScreen = 0;
      }
    }

  }
})