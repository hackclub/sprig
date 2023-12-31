/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

/* 
Nickels by Adam Miller. Made on December 28th, 2023.
Nickels is a fun die game that has players compete to be the first one to fill a board.
Players roll two dice and cover up the matching sum on their board with a nickel.
If a player already has already covered the number that he or she rolls,
the next player has a chance to steal that value for his or her own board.
Play continues to the next player after the stealer.
If a player rolls the same number on both dice and does not get stolen from,
he or she gets to roll again.
If a player rolls a 7, a random nickel is removed from his or her own board.
The first player to fill all ten spaces on the board is the winner!
In this digital version, all decisions are handled randomly and immediately.
The goal is to beat the computer opponent.
*/

//Keep Track of Covered Values.
const pRolledNums = [];
const cRolledNums = [];

//Random Number Generation.
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Update Dice Sprites with New Rolls.
function updateDice(x, y, val) {
  clearTile(x, y);
  addSprite(x, y, val);
}

//Roll a Die.
function roll() {
  return getRndInteger(1, 6);
}

//Find Sprite Information for Any Board Tile.
function findNumberTileInfo(diceSum, isX, isY, isType, isPlayer) {
  if (diceSum == 2) {
    if (isX) {
      return 0;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "b";
    }
  }
  if (diceSum == 3) {
    if (isX) {
      return 1;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "c";
    }
  }
  if (diceSum == 4) {
    if (isX) {
      return 2;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "d";
    }
  }
  if (diceSum == 5) {
   if (isX) {
      return 3;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "e";
    }
  }
  if (diceSum == 6) {
    if (isX) {
      return 4;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "f";
    }
  }
  if (diceSum == 8) {
    if (isX) {
      return 0;
    }
    if (isY) {
      if (isPlayer) {
        return 5;
      }
      else {
        return 2;
      }
    }
    if (isType) {
      return "h";
    }
  }
  if (diceSum == 9) {
    if (isX) {
      return 1;
    }
    if (isY) {
      if (isPlayer) {
        return 5;
      }
      else {
        return 2;
      }
    }
    if (isType) {
      return "i";
    }
  }
  if (diceSum == 10) {
    if (isX) {
      return 2;
    }
    if (isY) {
      if (isPlayer) {
        return 5;
      }
      else {
        return 2;
      }
    }
    if (isType) {
      return "j";
    }
  }
  if (diceSum == 11) {
    if (isX) {
      return 3;
    }
    if (isY) {
      if (isPlayer) {
        return 5;
      }
      else {
        return 2;
      }
    }
    if (isType) {
      return "k";
    }
  }
  if (diceSum == 12) {
    if (isX) {
      return 4;
    }
    if (isY) {
      if (isPlayer) {
        return 5;
      }
      else {
        return 2;
      }
    }
    if (isType) {
      return "l";
    }
  }
}

//Check if a Board Value Is Already Covered.
function checkRolledNums(nums, val) {
  let flag = true;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == val) {
      flag = false;
    }
  }
  return flag;
}

//Run the Player's Turn.
//Doubles or Stolen Value Both Lead to Another Turn.
function playerTurn() {
  let pdice1 = roll();
  let pdice2 = roll();
  updateDice(1, 6, pdice1);
  updateDice(3, 6, pdice2);
  let psum = pdice1 + pdice2;
  if (psum != 7) {
    let flag = false;
    if (checkRolledNums(pRolledNums, psum)) {
        let x = 0;
        let y = 0;
        x = findNumberTileInfo(psum, true, false, false, true);
        y = findNumberTileInfo(psum, false, true, false, true);
        addSprite(x, y, "n");
        pRolledNums.push(psum);
    }
    else {
      if (checkRolledNums(cRolledNums, psum)) {
        let x = 0;
        let y = 0;
        x = findNumberTileInfo(psum, true, false, false, false);
        y = findNumberTileInfo(psum, false, true, false, false);
        addSprite(x, y, "n");
        cRolledNums.push(psum);
        flag = true;
      }
    }
    if (flag || (pdice1 == pdice2)) {
      playerTurn();
    }
  }
  else {
    if (pRolledNums.length > 0) {
      let removeIndex = 0;
      let tileValue = 0;
      let x = 0;
      let y = 0;
      let spriteType = "0";
      removeIndex = getRndInteger(0, pRolledNums.length - 1);
      tileValue = pRolledNums[removeIndex];
      pRolledNums.splice(removeIndex, 1);
      x = findNumberTileInfo(tileValue, true, false, false, true);
      y = findNumberTileInfo(tileValue, false, true, false, true);
      spriteType = findNumberTileInfo(tileValue, false, false, true, true);
      clearTile(x, y);
      addSprite(x, y, spriteType);
    }
  }
}

//Run the Computer's Turn.
//Doubles or Stolen Value Both Lead to Another Turn.
function computerTurn() {
  let cdice1 = roll();
  let cdice2 = roll();
  updateDice(1, 0, cdice1);
  updateDice(3, 0, cdice2);
  let csum = cdice1 + cdice2;
  if (csum != 7) {
    let flag = false;
    if (checkRolledNums(cRolledNums, csum)) {
        let x = 0;
        let y = 0;
        x = findNumberTileInfo(csum, true, false, false, false);
        y = findNumberTileInfo(csum, false, true, false, false);
        addSprite(x, y, "n");
        cRolledNums.push(csum);
    }
    else {
      if (checkRolledNums(pRolledNums, csum)) {
        let x = 0;
        let y = 0;
        x = findNumberTileInfo(csum, true, false, false, true);
        y = findNumberTileInfo(csum, false, true, false, true);
        addSprite(x, y, "n");
        pRolledNums.push(csum);
        flag = true;
      }
    }
    if (flag || (cdice1 == cdice2)) {
      computerTurn();
    }
  }
  else {
    if (cRolledNums.length > 0) {
      let removeIndex = 0;
      let tileValue = 0;
      let x = 0;
      let y = 0;
      let spriteType = "0";
      removeIndex = getRndInteger(0, cRolledNums.length - 1);
      tileValue = cRolledNums[removeIndex];
      cRolledNums.splice(removeIndex, 1);
      x = findNumberTileInfo(tileValue, true, false, false, false);
      y = findNumberTileInfo(tileValue, false, true, false, false);
      spriteType = findNumberTileInfo(tileValue, false, false, true, false);
      clearTile(x, y);
      addSprite(x, y, spriteType);
    }
  }
}

//Graphics, Sound, and Map Organization.
const dot1Dice = "1"
const dot2Dice = "2"
const dot3Dice = "3"
const dot4Dice = "4"
const dot5Dice = "5"
const dot6Dice = "6"
const nickel = "n"
const board2 = "b"
const board3 = "c"
const board4 = "d"
const board5 = "e"
const board6 = "f"
const board8 = "h"
const board9 = "i"
const board10 = "j"
const board11 = "k"
const board12 = "l"
const background = "z"

setLegend(
  [ dot1Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111110011111DD
DD111110011111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot2Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD111111110011DD
DD111111110011DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD110011111111DD
DD110011111111DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot3Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011111111DD
DD110011111111DD
DD111111111111DD
DD111110011111DD
DD111110011111DD
DD111111111111DD
DD111111110011DD
DD111111110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot4Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot5Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111110011111DD
DD111110011111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot6Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ nickel, bitmap`
................
................
.....111111.....
...1111111111...
...1111111111...
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
...1111111111...
...1111111111...
.....111111.....
................
................` ],
  [ board2, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0770077777777770
0770077777777770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board3, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board4, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777700777770
0777777000777770
0777770070777770
0777700770777770
0777000000007770
0777000000007770
0777777700777770
0777777700777770
0777777700777770
0777777700777770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board5, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770077777777770
0770077777777770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board6, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770077777777770
0770077777777770
0770000000000770
0770000000000770
0770077777700770
0770077777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board8, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770000770000770
0770000770000770
0770000000000770
0770000000000770
0770000770000770
0770000770000770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board9, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770077777700770
0770077777700770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board10, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777077777000770
0770077770777070
0707077770777070
0777077770777070
0777077770777070
0777077770777070
0777077770777070
0777077770777070
0777077770777070
0700000777000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board11, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777077777707770
0770077777007770
0707077770707770
0777077777707770
0777077777707770
0777077777707770
0777077777707770
0777077777707770
0777077777707770
0700000770000070
0777777777777770
0777777777777770
0000000000000000` ],
  [ board12, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777077770000070
0770077777777070
0707077777777070
0777077777777070
0777077770000070
0777077770000070
0777077770777770
0777077770777770
0777077770777770
0700000770000070
0777777777777770
0777777777777770
0000000000000000` ],
  [ background, bitmap`
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
DDDDDDDDDDDDDDDD` ]
)

const melody = tune`
369.2307692307692,
46.15384615384615: B4~46.15384615384615,
46.15384615384615: B4~46.15384615384615,
46.15384615384615: B4~46.15384615384615,
969.2307692307692`

setSolids([])

let level = 0
const levels = [
  map`
z1z1z
bcdef
hijkl
zzzzz
bcdef
hijkl
z1z1z`
]

setMap(levels[level])

setPushables({})

//Decide Who Goes First and Define Variables to Stop Controls When the Game Is Over.
let canGoC = false;
let canGoP = true;
let firstMove = getRndInteger(0, 1);
if (firstMove == 1) {
  computerTurn();
  addText("Computer Went First!", {x: 0, y: 7, color: color`3`});
  addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
}
else {
  addText("Player Goes First!", {x: 1, y: 7, color: color`3`});
  addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
}

//Play the Player's Turn on Input and Check Win Conditions.
onInput("l", () => {
  if (canGoP) {
    canGoC = true;
    clearText();
    playTune(melody);
    playerTurn();
    if (pRolledNums.length == 10) {
      addText("PLAYER WINS!", {x: 4, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
    if (cRolledNums.length == 10) {
      addText("COMPUTER WINS!", {x: 3, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
  }
})

//Reset the Game.
onInput("k", () => {
  canGoC = false;
  canGoP = true;
  setMap(levels[level]);
  clearText();
  pRolledNums.splice(0, pRolledNums.length);
  cRolledNums.splice(0, cRolledNums.length);
  firstMove = getRndInteger(0, 1);
  if (firstMove == 1) {
    computerTurn();
    addText("Computer Went First!", {x: 0, y: 7, color: color`3`});
    addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
  }
  else {
    addText("Player Goes First!", {x: 1, y: 7, color: color`3`});
    addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
  }
})

//Play the Computer's Turn After the Player and Check Win Conditions.
afterInput(() => {
  if (canGoC) {
    computerTurn();
    if (cRolledNums.length == 10) {
      addText("COMPUTER WINS!", {x: 3, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
    if (pRolledNums.length == 10) {
      addText("PLAYER WINS!", {x: 4, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
  }
})