/*
@title: The UFO farm
@author: Harrison Ng
@tags: ['endless']
@addedOn: 2023-01-20
*/

let tractor;
let tractorLoc = [];

let grass;

let crop;
let crops = [];
let cropSize = 20;
let harvest = 0;

let ufoActive;
let ufoInactive;
let ufos = [];
let activeUfos = 1;

let field = [];
let xSize = 10;
let ySize = 8;

let isGameEnded = false;

function main() {
  setSprites()

  setLegend(
    ['p', tractor],
    ['g', grass],
    ['c', crop],
    ['u', ufoActive],
    ['n', ufoInactive]
  );
  
  setSolids(['p','u']);

  setMap(generateMap());
  setBackground('g');

  updateText();
  
  onInput("s", () => {
    tractorLoc[1] += 1
    if (tractorLoc[1] >= ySize) tractorLoc[1] = 0
  });
  onInput("w", () => {
    tractorLoc[1] -= 1
    if (tractorLoc[1] < 0) tractorLoc[1] = ySize - 1
  });
  onInput("a", () => {
    tractorLoc[0] -= 1
    if (tractorLoc[0] < 0) tractorLoc[0] = xSize - 1
  });
  onInput("d", () => {
    tractorLoc[0] += 1
    if (tractorLoc[0] >= xSize) tractorLoc[0] = 0
  });
  onInput("l", () => {
    if (isGameEnded) {
      resetGame();
    }
  });
  
  afterInput(() => {
    if (!isGameEnded) {
      updateScreen();
    }
  });
}

function resetGame() {
  isGameEnded = false;
  activeUfos = 1;
  setMap(generateMap());
  harvest = 0;
  updateText();
}

function updateScreen() {
  updateCrops();
  updateUfos();
  setMap(updateMap());
}

function updateUfos() {
  for (let i = 0; i < activeUfos; i++){
    let ufo = ufos[i];
    let status = Math.round(Math.random())

    ufo[2] = status;
    if (status == 1) {
      if(ufo[0] < tractorLoc[0]) ufo[0] += 1
      else if(ufo[0] > tractorLoc[0]) ufo[0] -= 1
      else if(ufo[1] < tractorLoc[1]) ufo[1] += 1
      else if(ufo[1] > tractorLoc[1]) ufo[1] -= 1
    }
    if (ufo[0] == tractorLoc[0] && ufo[1] == tractorLoc[1]) {
      endGame()
    }
  }
}

function endGame() {
  isGameEnded = true;
  clearText();
  let cx = xSize/2;
  let cy = ySize/2;
  addText("You are caught!", {x: 3, y: cy, color: color`3`});
  addText("Harvest: "+harvest, {x: cx, y: cy+2, color: color`3`});
  addText("Press L to restart", {x: 1, y: cy+6, color: color`0`});
}

function updateCrops() {
  let gotCrop = false;
  for (let num = 0; num < crops.length; num++){
    if (crops[num][0]==tractorLoc[0] && crops[num][1]==tractorLoc[1]) {
      crops[num] = makeNewCrop();
      harvest++;
      gotCrop = true;
      updateText();
      break;
    }
  }
  if (gotCrop == true && harvest % 10 == 0) {
    gotCrop = false;
    activeUfos = Math.min(activeUfos + 1, 10);
    ufos[activeUfos-1] = [0,0,0]
  }
}

function updateText() {
  clearText();
  addText("Harvest: " + harvest);
}

function generateMap() {
  for (let num = 0; num < cropSize; num++){
    crops[num] = makeNewCrop();
  }
  tractorLoc = [Math.floor(xSize/2), Math.floor(ySize/2)];
  
  ufos = new Array(10)
  ufos[0] = [0,0,0];
  
  return updateMap()  
}

function makeNewCrop() {
  let coord;
  let cropDedup;
  do {
    coord = [Math.floor(Math.random()*xSize), Math.floor(Math.random()*ySize)];
    cropDedup = crops.map(crop=>crop[0]==coord[0] && crop[1]==coord[1])
  } while (cropDedup.includes(true));
  return coord;
}

function updateMap() {
  field = new Array(xSize).fill(0).map(x=>new Array(ySize).fill('.'));

  crops.forEach(crop => {
    field[crop[0]][crop[1]] = 'c';
  })
  
  field[tractorLoc[0]][tractorLoc[1]] = 'p'

  for (let i = 0; i < activeUfos; i++){
    let ufo = ufos[i];
    if (ufo[2] == 0) {
      field[ufo[0]][ufo[1]] = 'n';
    } else {
      field[ufo[0]][ufo[1]] = 'u';
    }
  }

  return printMap();
}

function printMap() {
  let mapString = ``;
  for (let j = 0; j < ySize; j++){
    for (let i = 0; i < xSize; i++){
      mapString += field[i][j];
    }
    mapString += `\n`;
  }
  
  return mapString;
}

function setSprites() {
  tractor = bitmap`
.00000000.......
0333333330......
.03777730.......
.037777730......
03337777330.....
33333333333000..
3.......3333330.
..00000..3333330
.0000000..333330
000111000.33....
001111100.3.000.
001111100..00000
000111000..00100
.0000000...00000
..00000.....000.
................`;
  
  grass = bitmap`
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
  444444444444444L`;

  ufoActive = bitmap`
.......00.......
.....009900.....
....07799770....
.00097799779000.
0999999999999990
.09999999999990.
..000000000000..
................
....62626262....
...6262626262...
...2626262626...
..262626262626..
..626262626262..
.62626262626262.
.26262626262626.
2626262626262626`;

  ufoInactive = bitmap`
.......00.......
.....009900.....
....07799770....
.00097799779000.
0999999999999990
.09999999999990.
..000000000000..
................
................
................
................
................
................
................
................
................`;
    
  crop = bitmap`
......6.6..6....
..6.6.66.6.66.66
.66.6.66.6.6666.
..66.666.66.666.
6..66.66666666..
.6.666.6.66666..
..66.666.666666.
...66.66.66666..
.6..66666.6666.6
..6.66.66.666.6.
6..66666666666..
.6.6.6.66.666...
..66.6.66666.6..
...6.666.666.6..
...6.666.666.6..
...6.66..6.6.6..`;
}

main()
