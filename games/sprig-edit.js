/*
@title: Sprig-Edit
@author: Colack
@tags: ['utility']
@img: ""
@addedOn: 2024-04-30

This is Sprig-Edit, a basic text editor for Sprig.

Characters: a-z A-Z ! . ? , (56 Characters)

Controls:
AD - Move Cursor
JL - Change Character
I - Place Character
K - Delete Character
S - Space
*/

const player = "p";

var matrix = Array.from({ length: 15 }, () => Array(16).fill(" "));

const BACKGROUND_BLACK = "B";

const LOGO_1 = "1";
const LOGO_2 = "2";
const LOGO_3 = "3";
const LOGO_4 = "4";

var canPress = false;

var MATRIX_X = 0;
var MATRIX_Y = 0;

var currentColor = 0;
var currentCharacter = 1;
var currentHeldCharacter = "a";
var textColor = color`2`;

const SPRIG_EDIT = {
  VERSION: {
    MAJOR: 0,
    MINOR: 1,
    PATCH: 1,
  },
};

setLegend(
  [
    BACKGROUND_BLACK,
    bitmap`
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
0000000000000000`,
  ],
  [
    LOGO_1,
    bitmap`
................
................
................
.........222....
........20022...
........200022..
........20000222
........20200020
........20220000
........20220000
........20000000
........22000000
........22002000
........20020000
........20200700
........20202000`,
  ],
  [
    LOGO_2,
    bitmap`
................
........2222....
........20022...
......2220002...
......22000022..
......220002022.
222222200002202.
000000000002202.
000000000002202.
0000000000000022
0000000000000002
0000002220000002
0000002007000002
0000022077700002
0000022020070002
0000022070070002`,
  ],
  [
    LOGO_3,
    bitmap`
........20207000
........20207000
........20207000
........20207700
........20207700
........20000000
.........2088800
..........200222
.......222222000
.......200000220
.......202220000
.......200222200
.......220222000
........22022000
........22002000
.........2200000`,
  ],
  [
    LOGO_4,
    bitmap`
0000222070070002
0000222070070002
0000022070070002
0000022077700002
0000002077000202
0000000000022200
0000000888880000
2222222222200020
2222222220000220
0000000000602220
6666666666002220
6666666660002200
6666660600002202
0660006000000002
0660066000000022
006666000000022.`,
  ],
);

setSolids([]);

let level = 0;
const levels = [
  map`
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
..............12
..............34`,
  map`
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
................`,
  map`
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
................`,
  map`
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
................`,
];

function changeCharacter() {
  if (currentCharacter >= 1 && currentCharacter <= 56) {
    if (currentCharacter <= 26) {
      currentHeldCharacter = String.fromCharCode(currentCharacter + 96);
    } else if (currentCharacter <= 52) {
      currentHeldCharacter = String.fromCharCode(currentCharacter + 64 - 26);
    } else {
      switch (currentCharacter) {
        case 53:
          currentHeldCharacter = "!";
          break;
        case 54:
          currentHeldCharacter = ".";
          break;
        case 55:
          currentHeldCharacter = "?";
          break;
        case 56:
          currentHeldCharacter = ",";
          break;
      }
    }
  }
}

function changeTextColor() {
  switch (currentColor) {
    case 0:
      textColor = color`3`;
      break;
    case 1:
      textColor = color`9`;
      break;
    case 2:
      textColor = color`6`;
      break;
    case 3:
      textColor = color`4`;
      break;
    case 4:
      textColor = color`7`;
      break;
    case 5:
      textColor = color`2`;
      break;
  }
}

function createScreens(screen) {
  switch (screen) {
    case 0:
      setBackground(BACKGROUND_BLACK);

      clearText();

      addText("Sprig Edit", {x: 5,y: 0,color: color`2`,});
      addText("----------------", {x: 2,y: 1,color: color`2`,});
      addText(`v${SPRIG_EDIT.VERSION.MAJOR}.${SPRIG_EDIT.VERSION.MINOR}.${SPRIG_EDIT.VERSION.PATCH}`,{x: 7,y: 4,color: color`2`,});
      addText("Press S To", {x: 5,y: 7,color: color`2`,});
      addText("Start", {x: 8,y: 9,color: color`2`,});
      addText("Colack 2024", {x: 2,y: 15,color: color`2`});

      break;
    case 1:
      clearText();

      addText("Controls", {x: 6,y: 0,color: color`2`,});
      addText("----------------", {x: 2,y: 1,color: color`2`,});
      addText("AD - Move Cursor", {x: 2,y: 2,color: color`2`,});
      addText("JL - Change Char", {x: 2,y: 3,color: color`2`,});
      addText("I  - Place Char", {x: 2,y: 4,color: color`2`,});
      addText("K  - Remove Char", {x: 2,y: 5,color: color`2`,});
      addText("S  - Space", {x: 2,y: 6,color: color`2`,});
      addText("W  -", {x: 2,y: 7,color: color`2`,});
      addText("C", {x: 7,y: 7,color: color`3`,});
      addText("o", {x: 8,y: 7,color: color`9`,});
      addText("l", {x: 9,y: 7,color: color`6`,});
      addText("o", {x: 10,y: 7,color: color`D`,});
      addText("r", {x: 11,y: 7,color: color`5`,});
      addText("s", {x: 12,y: 7,color: color`H`,});
      addText("Press S to Start", {x: 2,y: 9,color: color`2`,});
      addText("Press W for cred", {x: 2, y:11,color:color`2`});

      break;
    case 2:
      clearText();

      for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 16; x++) {
          if (x === MATRIX_X && y === MATRIX_Y) {
            addText("/", { x: x + 2, y, color: textColor });
          } else {
            addText(matrix[y][x], { x: x + 2, y, color: textColor });
          }
        }
      }

      addText("Color", { x: 2, y: 15, color: textColor });
      addText(currentHeldCharacter, { x: 8, y: 15, color: color`2` });
      addText(`${MATRIX_X}`, { x: 10, y: 15, color: color`2` });
      addText(`${MATRIX_Y}`, { x: 13, y: 15, color: color`2` });
      break;
    case 3:
      clearText();
      
      addText("Credits", {x: 6,y: 0,color: color`2`,});
      addText("----------------", {x: 2,y: 1,color: color`2`,});
      addText("By: Jack S.", {x: 2, y: 3,color: color`2`});
      addText("Testers:", {x:2,y:5, color:color`2`});
      addText("   Joe",{x:2,y:6,color:color`2`});
      addText("   Nat",{x:2,y:7,color:color`2`});
      addText("   Trent",{x:2,y:8,color:color`2`});
      addText("   Jared",{x:2,y:9,color:color`2`});
      addText("   Phin",{x:2,y:10,color:color`2`});
      addText("Thanks for using",{x:2,y:14,color:color`2`});
      addText("Sprig Edit",{x:5,y:15,color:color`2`});
      
      break;
  }
}

function onGameStart() {
  createScreens(level);
}

setMap(levels[level]);

onInput("w", () => {
  if (level == 2) {
    if (currentColor == 5) {
      currentColor = 0;
    } else {
      currentColor++;
    }
    changeTextColor();
  } else if (level == 1) {
    level = 3;
    setMap(levels[level]);
    createScreens(level);
  }
});

onInput("i", () => {
  if (level == 2) {
    matrix[MATRIX_Y][MATRIX_X] = currentHeldCharacter;
  }
});

onInput("k", () => {
  if (level == 2) {
    matrix[MATRIX_Y][MATRIX_X] = " ";
  }
});

onInput("a", () => {
  if (level == 2) {
    if (MATRIX_X == 0) {
      if (MATRIX_Y > 0) {
        MATRIX_Y--;
        MATRIX_X = 15;
      }
    } else {
      MATRIX_X--;
    }
  }
});

onInput("d", () => {
  if (level == 2) {
    if (MATRIX_X == 15 && MATRIX_Y < 14) {
      MATRIX_Y++;
      MATRIX_X = 0;
    } else if (MATRIX_X < 15) {
      MATRIX_X++;
    }
  }
});

onInput("j", () => {
  if (level == 2) {
    if (currentCharacter == 1) {
      currentCharacter = 56;
    } else {
      currentCharacter--;
    }
  }
  changeCharacter();
});

onInput("l", () => {
  if (level == 2) {
    if (currentCharacter == 56) {
      currentCharacter = 1;
    } else {
      currentCharacter++;
    }
  }
  changeCharacter();
});

onInput("s", () => {
  switch (level) {
    case 0:
      level = 1;
      setMap(levels[level]);
      createScreens(level);
      canPress = false;
      setTimeout(function () {
        canPress = true;
      }, 100);
      break;
    case 2:
      matrix[MATRIX_Y][MATRIX_X+1] = " ";
      if (MATRIX_X < 15) {
        MATRIX_X+=2;
      } else if (MATRIX_Y < 14) {
        MATRIX_X = 0;
        MATRIX_Y++;
      }
      break;
  }
});

afterInput(() => {
  if (level == 1 && canPress) {
    level = 2;
    setMap(levels[level]);
    createScreens(level);
  }
});

setInterval(function () {
  if (level == 2) {
    createScreens(level);
  }
}, 30);

onGameStart();
