/*
@title: racer
@author: Snow
@tags: ['puzzle']
@addedOn: 2022-11-08
*/

// WHEN ON LEVEL SELECT SCREEN: To move to next level, click L. To move to previous level, click J. To select, click I.
// TO MOVE CAR: USE A AND D TO MOVE LEFT AND RIGHT RESPECTIVELY.

const player = "p";
const goal = "g";
const obst_food = "f";
const obst_junk = "n";
const background = "b";
const left_background = "x";
const right_background = "m";
const white = "w";


setLegend(
  [ player, bitmap`
.LLLLLLLLLLLLLL.
.LL63333336LLLL.
.L6333333336LLL.
.L3322222233LLL.
.L3322222233LLL.
.L3322222233LLL.
.L3333333333LLL.
.L3333333333LLL.
.L3333333333LLL.
.L3333333333LLL.
.L3333333333LLL.
.L3322222233LLL.
.L3322222233LLL.
.L3322222233LLL.
.L3333333333LLL.
.L6333333336LLL.`],
  [ goal, bitmap`
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
0202020202020202
2020202020202020
0202020202020202
2020202020202020
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2`],
  [ obst_food, bitmap`
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLL11111111L.
.LLLLL11111111L.
.LLLLL11LLLL11L.
.LLLLL11LLLLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLCCCCCCCCLLLL.
.LLLCCCCCCLLLLL.
.LLLLCCCCLLLLLL.`],
  [ obst_junk, bitmap`
.LLLLLCCLLLLLLL.
.LLLCCCCCLLLLLL.
.L44CCCCCCLLLLL.
.L4477CCCCCLLLL.
.L44477CCCCLLLL.
.L444777CCCCLLL.
.LL444777CCCLLL.
.LL4444777CCCLL.
.LL44444777CCLL.
.LL444444777CLL.
.LL4444447777LL.
.LLL444444447LL.
.LLL4444444444L.
.LLLLLLLLL4444L.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.`],
  [ background, bitmap`
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
.LLLLLLLLLLLLLL.
2LLLLLLLLLLLLLL.
2LLLLLLLLLLLLLL2
.LLLLLLLLLLLLLL2
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2`],
  [ left_background, bitmap`
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400
4444444444444400`],
  [ right_background, bitmap`
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444
0044444444444444`],
  [ white, bitmap`
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
................`]
);

let hasLost = false;
let raceStarted = 3;
let textCleared = false;

let level = 0;

const levels = [
  map`
....
....
....
....`,
  map`
....
....
....
....`,
  map`
xgggm
xfbbm
xbnbm
xbbbm
xbbnm
xbbbm
xbfbm
xbbbm
xbpbm`,
  map`
xgggm
xbfbm
xbbbm
xnbbm
xbbnm
xbbbm
xbfbm
xfbbm
xbbbm
xpbbm`,
  map`
xgggm
xbbbm
xbfbm
xnbbm
xbbnm
xbfbm
xbbbm
xnbnm
xbbbm
xpbbm`,
  map`
xgggm
xbfnm
xbbnm
xbbbm
xfnbm
xbbbm
xbnbm
xbbfm
xfbbm
xpbbm`,
  map`
xgggm
xbfbm
xbbnm
xnbbm
xbbnm
xbfbm
xbbbm
xfbnm
xbbbm
xbbpm`,
  map`
xgggm
xbbbm
xbfbm
xnbbm
xnbfm
xbbbm
xbfbm
xfbbm
xbbnm
xbpbm`,
  map`
xgggm
xbbnm
xfbbm
xbfbm
xbbbm
xbbnm
xnbbm
xbbbm
xbfbm
xbpbm`,
];


const levelSpeeds = [0, 0, 1000, 800, 600, 400, 300, 300, 200]



const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, left_background, right_background ]);



setPushables({
  [player]: []
});


setInterval(() => {
  if (level > 1) {
    
  if (raceStarted >= 0) {
    let text = String(raceStarted)
    if (text == "0") {
      text = "GO!"
    }
    clearText()
    addText(text, { y: 4, color: color`3` });

    if (raceStarted == 0) {
    setTimeout(() => {raceStarted -= 1}, 500);
    }
    else {
      raceStarted -= 1 
    }
  }
  else if (!textCleared) {
    clearText()
    textCleared = true;
    
  }
  }
}, 500)


let lastTime = Date.now()

setInterval(() => {
  // console.log(lastTime)
  if (!hasLost && raceStarted <= -1 && Date.now() - lastTime >= levelSpeeds[level] && level > 1) {
    
  getFirst(player).y -= 1;
    checkWin()
    lastTime = Date.now()
    // console.log("inside", lastTime)
    
  }
}, 100)

let selectedLvl = "1"


onInput("a", () => {
  if (!hasLost && getAll(player).length > 0) {
  getFirst(player).x -= 1;
  }
});


onInput("d", () => {
  if (!hasLost && getAll(player).length > 0) {
  getFirst(player).x += 1;
  }
});

onInput("i", () => {
  clearText()
  level = Number(selectedLvl) + 1;
  
  setMap(levels[level]);
  setBackground("b")
  
});

onInput("k", () => {
  clearText()
  level = 1;
  raceStarted = 3;
  textCleared = false;
  hasLost = false;
  
  setMap(levels[level]);  
  setBackground("w");

  addText("1", {y: 2, color: color`7`})
  addText("2", {y: 4, color: color`0`})
  addText("3", {y: 6, color: color`0`})
  addText("4", {y: 8, color: color`0`})
  addText("5", {y: 10, color: color`0`})
  
  addText("6", {y: 12, color: color`0`})
  addText("7", {y: 14, color: color`0`})
  
});

onInput("l", () => {
  setBackground("w");
  if (selectedLvl < 7) {
  selectedLvl = String(Number(selectedLvl)+1)
}
  
  clearText()
  addText("1", {y: 2, color: color`${selectedLvl == "1" ? 7 : 0}`})
  addText("2", {y: 4, color: color`${selectedLvl == "2" ? 7 : 0}`})
  addText("3", {y: 6, color: color`${selectedLvl == "3" ? 7 : 0}`})
  addText("4", {y: 8, color: color`${selectedLvl == "4" ? 7 : 0}`})
  addText("5", {y: 10, color: color`${selectedLvl == "5" ? 7 : 0}`})
  addText("6", {y: 12, color: color`${selectedLvl == "6" ? 7 : 0}`})
  addText("7", {y: 14, color: color`${selectedLvl == "7" ? 7 : 0}`})
  
});

onInput("j", () => {
  setBackground("w");
  if (selectedLvl > 1) {
  selectedLvl = String(Number(selectedLvl)-1)
  }  
  
  clearText()
  addText("1", {y: 2, color: color`${selectedLvl == "1" ? 7 : 0}`})
  addText("2", {y: 4, color: color`${selectedLvl == "2" ? 7 : 0}`})
  addText("3", {y: 6, color: color`${selectedLvl == "3" ? 7 : 0}`})
  addText("4", {y: 8, color: color`${selectedLvl == "4" ? 7 : 0}`})
  addText("5", {y: 10, color: color`${selectedLvl == "5" ? 7 : 0}`})
  addText("6", {y: 12, color: color`${selectedLvl == "6" ? 7 : 0}`})
  addText("7", {y: 14, color: color`${selectedLvl == "7" ? 7 : 0}`})
  
});


const checkWin = () => {
  const numberCovered = tilesWith(goal, player).length;
  const obstEncountered = tilesWith(obst_food, player).length;
  const obstEncountered2 = tilesWith(obst_junk, player).length;

  if (numberCovered > 0) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      raceStarted = 3
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
    
  }

  if (obstEncountered > 0 || obstEncountered2 > 0) {
    hasLost = true;
    
    addText("oops...you lose!", { y: 4, color: color`3` });
  }

}

afterInput(checkWin);

setBackground("w");
addText("Start (I)", {y: 2, color: color`4`});
addText("Level Select (K)" , {y: 7, color: color`7`});

