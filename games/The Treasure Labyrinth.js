/* 
@title: The Treasure Labrynth
@description: A game about getting treasure.
@author:James Reegan II
@tags: []
@addedOn: 2025-04-28
*/

const player = "p";
const wall = "w";
const goal = "g";
const enemyLandR = "e";
const enemyUandD = "l";
const enemyR = "R";
const floor = "f";
const keyFloor = "F";
const key = "k";
const door = "d";
const portal1 = "q";
const portal2 = "P";
const portal3 = "v";
const portal4 = "V";
const key2 = "K";
const door2 = "D";
const melody = tune`
344.82758620689657: B4~344.82758620689657 + A4^344.82758620689657 + C5^344.82758620689657,
344.82758620689657: B4-344.82758620689657 + A4^344.82758620689657 + C5~344.82758620689657,
344.82758620689657: B4~344.82758620689657 + A4/344.82758620689657 + C5^344.82758620689657,
344.82758620689657: B4~344.82758620689657 + A4^344.82758620689657 + C5-344.82758620689657,
344.82758620689657: B4/344.82758620689657 + A4^344.82758620689657 + C5^344.82758620689657,
344.82758620689657,
344.82758620689657: A4~344.82758620689657,
344.82758620689657,
344.82758620689657: B4~344.82758620689657,
344.82758620689657: B4~344.82758620689657,
344.82758620689657: A4~344.82758620689657,
344.82758620689657: A4~344.82758620689657,
344.82758620689657: E4~344.82758620689657,
344.82758620689657: F4~344.82758620689657,
344.82758620689657: G4-344.82758620689657,
344.82758620689657: G4-344.82758620689657,
344.82758620689657: E5^344.82758620689657,
344.82758620689657: E5^344.82758620689657,
344.82758620689657: D5/344.82758620689657,
344.82758620689657: D5/344.82758620689657,
344.82758620689657: D5-344.82758620689657,
344.82758620689657: E5-344.82758620689657 + C5-344.82758620689657,
344.82758620689657: D5/344.82758620689657,
344.82758620689657: D5-344.82758620689657,
344.82758620689657: E5-344.82758620689657 + C5-344.82758620689657,
344.82758620689657: G5~344.82758620689657,
344.82758620689657: G5~344.82758620689657,
344.82758620689657: F5~344.82758620689657,
344.82758620689657: F5~344.82758620689657,
344.82758620689657: E5~344.82758620689657 + C5~344.82758620689657,
344.82758620689657: E5~344.82758620689657 + C5~344.82758620689657,
344.82758620689657: F5~344.82758620689657 + D5~344.82758620689657`;
const playback = playTune(melody, Infinity);
var direction;
var lost = false;
var hasKey = false;
var hasKey2 = false;
var movingRight = true;
var movingDown = true;
var counterSnake = 0;
var snakeMove = false;
var counterTurtle = 0;
var turtleMove = false;
var won = false;
var dialogueActive = true;
var dialogueNumber = 0;
var dialogueArray = ["This is Bob.", "He is a struggling\nbusiness owner.", "so he goes to \nthe Treasure \nLabyrinth.", "will you help him \nsave his buisiness?", "while using WASD to \nmove?", ""];
var iExpired = false;

function enemyMove(i) {
  if (movingDown == true) {
    getAll(enemyUandD)[i].y += 1;
    counterSnake++;
    if (counterSnake >= 2 && level == 0 || counterSnake >= 14 && level == 1 || counterSnake >= 4 && level == 2 || level == 3 && counterSnake == 10 || level == 4 && counterSnake == 12 || level == 5 && counterSnake == 21) {
      movingDown = false;
      counterSnake = 0;
    }
  } else if (movingDown == false) {
    getAll(enemyUandD)[i].y -= 1;
    counterSnake++;
    if (counterSnake >= 2 && level == 0 || counterSnake >= 14 && level == 1 || counterSnake >= 4 && level == 2 || level == 3 && counterSnake == 10 || level == 4 && counterSnake == 12 || level == 5 && counterSnake == 21) {
      movingDown = true;
      counterSnake = 0;
    }
  }
}

function turtleMover(i) {
  if (movingRight == true) {
    getAll(enemyLandR)[i].x += 1;
    counterTurtle++;
    if (counterTurtle == 9 && level == 0 || counterTurtle == 6 && level == 2 || turtleMove === false && counterTurtle == 1 && level == 1 || level == 1 && counterTurtle == 7 && turtleMove === true || level == 3 && counterTurtle == 16 || level == 4 && counterTurtle == 6 || level == 5 && counterTurtle == -1) {
      movingRight = false;
      counterTurtle = 0;
      turtleMove = true;
    }
  } else if (movingRight == false) {
    getAll(enemyLandR)[i].x -= 1;
    counterTurtle++;
    if (counterTurtle == 9 && level == 0 || counterTurtle == 7 && level == 1 || counterTurtle == 6 && level == 2 || level == 3 && counterTurtle == 16 || level == 4 && counterTurtle == 6) {
      movingRight = true;
      counterTurtle = 0;
    }
  }
}

function randomMove(i) {
  direction = Math.random();

  if (direction >= 0 && direction < 0.25 && getAll(enemyR)[i].x != width - 1) {
    getAll(enemyR)[i].x += 1;
  }


  if (direction >= 0.25 && direction < 0.5 && getAll(enemyR)[i].x != 0) {
    getAll(enemyR)[i].x -= 1;
  }


  if (direction >= 0.5 && direction < 0.75 && getAll(enemyR)[i].x != height - 1) {
    getAll(enemyR)[i].y += 1;
  }


  if (direction >= 0.75 && direction < 1 && getAll(enemyR)[i].x != 0) {
    getAll(enemyR)[i].y -= 1;
  }

}

setLegend(
  [player, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFF000FFFFFFF
FFFFF02220FFFFFF
FFFFF02220FFFFFF
FFFFF02220FFFFFF
FFFFFF000FFFFFFF
FFFFFFF0FFFFFFFF
FFFFF00000FFFFFF
FFFF0FF0FF0FFFFF
FFFFFFF0FFFFFFFF
FFFFFF0F0FFFFFFF
FFFFF0FFF0FFFFFF
FFFFF0FFF0FFFFFF`],
  [enemyR, bitmap`
................
................
......22222.....
......22020.....
......222666....
......2226666...
......22222.6...
......C2C2C.....
......0C0CC.....
..C..0CC0CC.....
..CC0CC0CCC.....
...C0C0CCCC.....
....00CCCCC.....
.....6..6.......
.....0..0.......
.....66.66......`],
  [wall, bitmap`
1110110111011111
0010100111000000
1101010000111011
1100111010010001
0111110111000110
0001000110101000
1110111001100101
1110110011101011
1100001111101011
0011110000001100
0111101110110110
1011011111011001
1100111110111011
0001001001110110
0110110110100000
1110110111011111`],
  [goal, bitmap`
................
................
................
..CCCCCCCCCCCC..
..C0000000000C..
..600606606006..
..C6060660606C..
..C6006666006C..
..116066660611..
..CCCCCCCCCCCC..
..CCCCC66CCCCC..
..CCCCC66CCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..`],
  [enemyUandD, bitmap`
................
................
.....44.........
......44........
.......4........
......44........
.....44.........
.....4..........
.....4..........
.....44.........
......4.........
......4.........
....44444.......
....44444.......
....40404.......
................`],
  [enemyLandR, bitmap`
................
................
................
................
................
................
................
................
..........4444..
....DDDD..4404..
...DDDDDDD4444..
..DDDDDDDD4.....
.DDDDDDDDDD.....
..66666666......
...44D44D.......
...44D44D.......`],
  [keyFloor, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [key, bitmap`
................
................
................
................
................
................
...666..........
...6.6666666....
...666...6.6....
................
................
................
................
................
................
................`],
  [door, bitmap`
1001000000001101
0110CCCCCCCC0010
100CCCCCCCCCC001
010CCCCCCCCCC001
00CCCCCCCCCCCC00
10CCCCCCCCCCCC01
10CCCCCCCCCLLC00
0CCCCCCCCCL00LC0
0CCCCCCCCL0660L0
0CCCCCCCCL0660L0
0CCCCCCC11C00LC0
0CCCCCCC101LLCC0
0CCCCCCC011CCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [key2, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFF1FFFFFFFFFFF
FFF111FFFFFFFFFF
FF11F111111111FF
FFF111FFFF11F1FF
FFFF1FFFFFF1F1FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [door2, bitmap`
1001000000001011
0110333333330100
1103333333333011
0103333333333010
1033333333333301
1033333333333300
1033333333311301
0333333333100130
0333333331066010
0333333331066010
03333333LL300130
03333333L0L11330
033333330LL33330
0333333333333330
0333333333333330
0000000000000000`],
  [portal1, bitmap`
FFFFF0FFFFFFFFFF
FFFFFF0FFFFFFFFF
FFFF50000555FFFF
FFF5500500555FFF
FF555000055555FF
FF555500005555FF
FF55500000055500
F0005000000000F0
00050000000055FF
FF555000000555FF
FF555500005555FF
FFF5555055555FFF
FFFF55055555FFFF
FFFFFF00FFFFFFFF
FFFFFFFF0FFFFFFF
FFFFFFF0FFFFFFFF`],
  [portal2, bitmap`
FFFFF0FFFFFFFFFF
FFFFFF0FFFFFFFFF
FFFF30000333FFFF
FFF3300300333FFF
FF333000033333FF
FF333300003333FF
FF33300000033300
F0003000000000F0
00030000000033FF
FF333000000333FF
FF333300003333FF
FFF3333033333FFF
FFFF33033333FFFF
FFFFFF00FFFFFFFF
FFFFFFFF0FFFFFFF
FFFFFFF0FFFFFFFF`],
  [portal3, bitmap`
FFFFF0FFFFFFFFFF
FFFFFF0FFFFFFFFF
FFFFH0000HHHFFFF
FFFHH00H00HHHFFF
FFHHH0000HHHHHFF
FFHHHH0000HHHHFF
FFHHH000000HHH00
F000H000000000F0
000H00000000HHFF
FFHHH000000HHHFF
FFHHHH0000HHHHFF
FFFHHHH0HHHHHFFF
FFFFHH0HHHHHFFFF
FFFFFF00FFFFFFFF
FFFFFFFF0FFFFFFF
FFFFFFF0FFFFFFFF`],
  [portal4, bitmap`
FFFFF0FFFFFFFFFF
FFFFFF0FFFFFFFFF
FFFF90000999FFFF
FFF9900900999FFF
FF999000099999FF
FF999900009999FF
FF99900000099900
F0009000000000F0
00090000000099FF
FF999000000999FF
FF999900009999FF
FFF9999099999FFF
FFFF99099999FFFF
FFFFFF00FFFFFFFF
FFFFFFFF0FFFFFFF
FFFFFFF0FFFFFFFF`],
  [floor, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],

)

setSolids([player, wall])



let level = 0;
const levels = [
  map`
fffwpwflff
fffwfwffkf
efffffffff
wwwwdwwwww
ffffffffff
ffffgfffff`,
  map`
ffwlfffl
gfdfffff
ffwfffff
wwffffff
pfffffek
wwffffff
ffffffff
ffffffff`,
  map`
pflfffffffff
fffwwwfwwwwf
fffwfwffffwf
wwwffwwwwfwR
fflffwffffww
qfffwwwwwfff
ffffffwfwfwf
wwwwwfwfwfwf
ffffwfffffwf
effPwfwfwfwd
fkffwfwfwfwf
ffffwfffffwg`,
  map`
qfffffffffffp
ffRwwwwfwwwww
wwwwwwwwwffff
efffPfwlwfwwf
wwwwwfwfwffff
ffffffwfwfwwl
fwwwwwwfwkwwf
fwwwwwwfwwwwf
ffffwffffffff
fwwfwfwdwwwwf
fwwfwfwfwwwwf
ffffffwgwwwww`,
  map`
fpfwfqfwgwf
effwflfwfwl
fffwfffwdwf
efkwlflwfff
fffwfffwwwf
effwfffwfff
fffffffwfwf
wwwwwwwwfwf
PfffffffRwf
fwwwwwwwfwf
fffffffwfwf
fffffffffff`,
  map`
fwflflfwflffflflflfwffffff
fwfffffwffflfffffffwfwwwwf
fwkffffwffffffffffKwfwwwwf
fwfffffwfffffffffffwfwwwwf
fwwwwffwfffffffwwwwwfwwwwf
pffffwfwdwwwwwwffffDfwwwwf
fwqeeeeeffeeeeeeeePwffwwwf
fwwwwwwwwwwwwwwwwwwwffffff
fwwwwwfffffRfRfffffwffwfwf
fwwwwwgfffffffffffVwffwfwf
fwwwwwfffffRfRfffffwffwvwf`,
]
var restartLevel = levels[level];

var winScreen = map`
fffffffff
fwwwwwwwf
fwgggggwf
fwgggggwf
fwggpggwf
fwgggggwf
fwggkggwf
fwwwdwwwf
fffffffff`;
var loseScreen = map`
ffwpwff
ffwfwfk
ffwdwff
fffffff
fffffff
fffffff`;
var dialogueScreen = map`
fffffffffff
fffffffffff
fffffpfffff
fffffgfffff
fffffffffff
fffffffffff`;

setMap(dialogueScreen);
setBackground(floor);
playback;

setPushables({
  [player]: []
})
addText(dialogueArray[dialogueNumber], {x: 1, y: 3});
addText("i to continue", {x: 1, y: 11});


onInput("w", () => {
  if (won === false && !lost) {
    getFirst(player).y -= 1; //negative y is upward
  }

});

onInput("a", () => {
  if (won === false && !lost) {
    getFirst(player).x -= 1; //negative x is left
  }

});

onInput("s", () => {
  if (won === false && !lost) {
    getFirst(player).y += 1; // positive y is downwards
  }

});

onInput("d", () => {
  if (won === false && !lost) {
    getFirst(player).x += 1; //positive x is right
  }
});

onInput("i", () => {
  
  dialogueNumber++;
  if(dialogueNumber < 5){
  clearText();
  addText(dialogueArray[dialogueNumber], {x: 1, y: 3});
    addText("i to continue", {x: 1, y: 11});
  }
  else if(!iExpired){
    clearText();
    dialogueActive = false;
    setMap(levels[level]);
    iExpired = true;
  }

});

onInput("k", () => {
  if (lost) {
    hasKey = false;
    hasKey2 = false;
    counterSnake = 0;
    counterTurtle = 0;
    turtleMoved = false;
    movingDown = true;
    movingRight = true;
    lost = false;
    clearText();
    setMap(restartLevel);
  }
});



afterInput(() => {


  if (won === false && lost === false && dialogueActive === false) {
    for (var i = 0; i < getAll(enemyUandD).length; i++) {
      if (getFirst(player).x == getAll(enemyUandD)[i].x && getFirst(player).y == getAll(enemyUandD)[i].y) {
        clearText();
        addText("You Lost!", { color: color`3` });
        addText("k to restart the", { color: color`3`, y: 3 });
        addText("level.", { color: color`3`, y: 4 });
        lost = true;
        setMap(loseScreen);

      }
      if (lost === false) {
        enemyMove(i);
      }
      if (lost === false) {
        if (getFirst(player).x == getAll(enemyUandD)[i].x && getFirst(player).y == getAll(enemyUandD)[i].y) {
          clearText();
          addText("You Lost!", { color: color`3` });
          addText("k to restart the", { color: color`3`, y: 3 });
          addText("level.", { color: color`3`, y: 4 });
          lost = true;
          setMap(loseScreen);

        }
      }
    }

    for (var i = 0; i < getAll(enemyLandR).length; i++) {
      if (getFirst(player).x == getAll(enemyLandR)[i].x && getFirst(player).y == getAll(enemyLandR)[i].y) {
        clearText();
        addText("You Lost!", { color: color`3` });
        addText("k to restart the", { color: color`3`, y: 3 });
        addText("level.", { color: color`3`, y: 4 });
        lost = true;
        setMap(loseScreen);

      }
      if (lost === false) {
        turtleMover(i);


        if (getFirst(player).x == getAll(enemyLandR)[i].x && getFirst(player).y == getAll(enemyLandR)[i].y) {
          clearText();
          addText("You Lost!", { color: color`3` });
          addText("k to restart the", { color: color`3`, y: 3 });
          addText("level.", { color: color`3`, y: 4 });
          lost = true;
          setMap(loseScreen);

        }

        if (getAll(portal1).length == 1) {

          if (getAll(enemyLandR)[i].x == getFirst(portal1).x && getAll(enemyLandR)[i].y == getFirst(portal1).y) {
            getAll(enemyLandR)[i].x = getFirst(portal2).x;
            getAll(enemyLandR)[i].y = getFirst(portal2).y;
          } else if (getAll(enemyLandR)[i].x == getFirst(portal2).x && getAll(enemyLandR)[i].y == getFirst(portal2).y) {
            getAll(enemyLandR)[i].x = getFirst(portal1).x;
            getAll(enemyLandR)[i].y = getFirst(portal1).y;
          }
        }
      }
    }

    for (var i = 0; i < getAll(enemyR).length; i++) {
      if (getFirst(player).x == getAll(enemyR)[i].x && getFirst(player).y == getAll(enemyR)[i].y) {
        clearText();
        addText("You Lost!", { color: color`3` });
        addText("k to restart the", { color: color`3`, y: 3 });
        addText("level.", { color: color`3`, y: 4 });
        lost = true;
        setMap(loseScreen);

      }

      randomMove(i);


      if (getFirst(player).x == getAll(enemyR)[i].x && getFirst(player).y == getAll(enemyR)[i].y) {
        clearText();
        addText("You Lost!", { color: color`3` });
        addText("k to restart the", { color: color`3`, y: 3 });
        addText("level.", { color: color`3`, y: 4 });
        lost = true;
        setMap(loseScreen);

      }

      if (getAll(portal1).length == 1) {

        if (getAll(enemyR)[i].x == getFirst(portal1).x && getAll(enemyR)[i].y == getFirst(portal1).y) {
          getAll(enemyR)[i].x = getFirst(portal2).x;
          getAll(enemyR)[i].y = getFirst(portal2).y;
        } else if (getAll(enemyR)[i].x == getFirst(portal2).x && getAll(enemyR)[i].y == getFirst(portal2).y) {
          getAll(enemyR)[i].x = getFirst(portal1).x;
          getAll(enemyR)[i].y = getFirst(portal1).y;

        }
      }
    }


    //first door and key
    if (getAll(key).length == 1) {
      if (tilesWith(player, key).length == 1) {
        hasKey = true;
        addSprite(getFirst(key).x, getFirst(key).y, "F");
      }
    }
    if (getAll(door).length == 1) {
      if (tilesWith(player, door).length == 1 && hasKey == false) {
        if (level == 0 || level == 2 || level == 3) {
          getFirst(player).y -= 1;
        }
        if (level == 1) {
          getFirst(player).x += 1;
        }
        if (level == 4 || level == 5) {
          getFirst(player).y += 1;
        }
        for (var i = 0; i < getAll(enemyLandR).length; i++) {
          if (getFirst(player).x == getAll(enemyLandR)[i].x && getFirst(player).y == getAll(enemyLandR)[i].y) {
            clearText();
            addText("You Lost!", { color: color`3` });
            addText("k to restart the", { color: color`3`, y: 3 });
            addText("level.", { color: color`3`, y: 4 });
            lost = true;
            setMap(loseScreen);
          }
        }
        for (var i = 0; i < getAll(enemyUandD).length; i++) {
          if (getFirst(player).x == getAll(enemyUandD)[i].x && getFirst(player).y == getAll(enemyUandD)[i].y) {
            clearText();
            addText("You Lost!", { color: color`3` });
            addText("k to restart the", { color: color`3`, y: 3 });
            addText("level.", { color: color`3`, y: 4 });
            lost = true;
            setMap(loseScreen);
          }
        }
      }
    }
    //second door and key
    if (getAll(key2).length == 1) {
      if (tilesWith(player, key2).length == 1) {
        hasKey2 = true;
        addSprite(getFirst(key2).x, getFirst(key2).y, "F");
      }
    }
    if (getAll(door2).length == 1) {
      if (tilesWith(player, door2).length == 1 && hasKey2 == false) {
        if (level == 5) {
          getFirst(player).x -= 1;
        }
        for (var i = 0; i < getAll(enemyLandR).length; i++) {
          if (getFirst(player).x == getAll(enemyLandR)[i].x && getFirst(player).y == getAll(enemyLandR)[i].y) {
            clearText();
            addText("You Lost!", { color: color`3` });
            addText("k to restart the", { color: color`3`, y: 3 });
            addText("level.", { color: color`3`, y: 4 });
            lost = true;
            setMap(loseScreen);
          }
        }
        for (var i = 0; i < getAll(enemyUandD).length; i++) {
          if (getFirst(player).x == getAll(enemyUandD)[i].x && getFirst(player).y == getAll(enemyUandD)[i].y) {
            clearText();
            addText("You Lost!", { color: color`3` });
            addText("k to restart the.", { color: color`3`, y: 3 });
            addText("level.", { color: color`3`, y: 4 });
            lost = true;
            setMap(loseScreen);
          }
        }
      }
    }

    //portals
    if (getAll(portal1).length == 1) {
      if (getFirst(player).x == getFirst(portal2).x && getFirst(player).y == getFirst(portal2).y) {
        getFirst(player).x = getFirst(portal1).x
        getFirst(player).y = getFirst(portal1).y
      } else if (getFirst(player).x == getFirst(portal1).x && getFirst(player).y == getFirst(portal1).y) {
        getFirst(player).x = getFirst(portal2).x
        getFirst(player).y = getFirst(portal2).y
      }
    }

    if (getAll(portal3).length == 1) {
      if (getFirst(player).x == getFirst(portal4).x && getFirst(player).y == getFirst(portal4).y) {
        getFirst(player).x = getFirst(portal3).x
        getFirst(player).y = getFirst(portal3).y
      } else if (getFirst(player).x == getFirst(portal3).x && getFirst(player).y == getFirst(portal3).y) {
        getFirst(player).x = getFirst(portal4).x
        getFirst(player).y = getFirst(portal4).y
      }
    }

    if (tilesWith(goal, player).length == 1) {
      level++;
      hasKey = false;
      hasKey2 = false;
      counterSnake = 0;
      counterTurtle = 0;
      turtleMoved = false;
      movingDown = true;
      movingRight = true;

      if (level == levels.length) {
        won = true;
        setMap(winScreen);
        addText("You Win!");
      } else if (lost == false) {
        setMap(levels[level]);
        restartLevel = levels[level];

      }
    }
  }
});