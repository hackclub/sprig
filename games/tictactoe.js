/*
@title: 2 player tic-tac-toe
@author: reesericci
@tags: ['multiplayer','retro']
@addedOn: 2022-09-06

"a", "s", and "d" are your controls.

You push a combo of those keys to control where to place your piece.

First you use "a", "s", or "d" to control your X position, then do the same thing to place your Y position. You have just placed a piece!


*/

class Tile {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get state() {
      return this.updateState();
  }
  
  get x() {
    return this._x;
  }
  
  get y() {
    return this._y;
  }

  updateState() {
    const sprigTile = getTile(this.x,this.y)
    if(finished == true) return;
    if(sprigTile.length == 1 && sprigTile[0].type == "t") {
      return null;
    } else {
      return sprigTile[1].type;
    }
  }
  
  addX() {
    if(finished == true) return
    if(!this.state) {
      addSprite(this.x, this.y, "x");
      return;
    }
    throw new Error("taken")
  }

  addO() {
    if(finished == true) return
    if(!this.state) {
      addSprite(this.x, this.y, "o");
      return;
    }
    throw new Error("taken")
  }

}

let finished = false;

function checkForWinner(tiles) {
  for(let i = 0; i < 2; i++) {
    let row = tiles[i];

    if(row[0].state == null || row[1].state == null || row[2].state == null) continue;
    if(
      row[0].state == row[1].state && 
      row[0].state == row[2].state &&
      row[1].state == row[2].state
    ) {
      winner(row[0].state)
      break;
    }
    
  }

  for(let i = 0; i < 2; i++) {
    if(tiles[0][i].state == null || tiles[1][i].state == null || tiles[2][i].state == null) continue;
    
    if(tiles[0][i].state == tiles[1][i].state &&
       tiles[0][i].state == tiles[2][i].state &&
       tiles[1][i].state == tiles[2][i].state
    ) {
      winner(tiles[2][i].state)
      return;
    }
  }

  function checkLeftDiagonal() {
    if(tiles[0][0].state == tiles[1][1].state &&
       tiles[0][0].state == tiles[2][2].state &&
       tiles[1][1].state == tiles[2][2].state
    ) {
      return tiles[0][0].state;
    }
  }

  function checkRightDiagonal() {
    if(tiles[2][0].state == tiles[1][1].state &&
       tiles[2][0].state == tiles[0][2].state &&
       tiles[1][1].state == tiles[0][2].state
    ) {
      return tiles[2][0].state;
    }
  }
  
  if(!(tiles[0][0].state == null || tiles[1][1].state == null || tiles[2][2].state == null)) { 
    const checker = checkLeftDiagonal();
    if(checker == "x" || checker == "o") {
      winner(checker)
      return;
    }
  }

  if(!(tiles[2][0].state == null || tiles[1][1].state == null || tiles[0][2].state == null)) { 
    const checker = checkRightDiagonal();
    if(checker == "x" || checker == "o") {
      winner(checker)
      return;
    }
  }
    
}

function winner(type) {
  // console.log(`${type} wins!`);
  finished = true;
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`)
  addText(`${type} wins!`, {x: 7, y: 8})
  playTune(tune`
1865.2849740932643,
155.44041450777203: a5^155.44041450777203 + g5^155.44041450777203 + f5^155.44041450777203 + e5^155.44041450777203 + d5^155.44041450777203,
155.44041450777203: a5^155.44041450777203 + d5^155.44041450777203 + c5^155.44041450777203,
155.44041450777203: a5^155.44041450777203 + c5^155.44041450777203,
155.44041450777203: f5^155.44041450777203 + a5^155.44041450777203 + c5^155.44041450777203,
155.44041450777203: f5^155.44041450777203 + a5^155.44041450777203 + c5^155.44041450777203,
155.44041450777203: f5^155.44041450777203 + g5^155.44041450777203 + a5^155.44041450777203 + c5^155.44041450777203,
155.44041450777203: c5^155.44041450777203,
155.44041450777203: c5^155.44041450777203,
155.44041450777203: c5^155.44041450777203,
155.44041450777203: c5^155.44041450777203 + b5^155.44041450777203,
155.44041450777203: c5^155.44041450777203 + b5^155.44041450777203,
155.44041450777203: c5^155.44041450777203 + a5^155.44041450777203 + b5^155.44041450777203,
155.44041450777203: d5^155.44041450777203 + e5^155.44041450777203 + f5^155.44041450777203 + g5^155.44041450777203 + a5^155.44041450777203,
`)
}


const basetile = "t";
const xwins = "k";
const owins = "l";

setLegend(
  [ "x", bitmap`
................
................
................
...4........4...
....4......4....
.....4....4.....
......4..4......
.......44.......
.......44.......
......4..4......
.....4....4.....
....4......4....
...4........4...
................
................
................`],
  [ "o",bitmap`
................
................
................
................
.....555555.....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
.....555555.....
................
................
................
................`],
  [ basetile, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
);

setSolids(["x","o"]);

setMap(map`
ttt
ttt
ttt`);

const tileMap = new Map();


const allTiles = [
  [new Tile(0,0), new Tile(1,0), new Tile(2,0)],
  [new Tile(0,1), new Tile(1,1), new Tile(2,1)],
  [new Tile(0,2), new Tile(1,2), new Tile(2,2)]
]

checkForWinner(allTiles)

let currentX = null;
let currentY = null;
// true == x, false == o
let currentTurn = true;

function addAndClear() {
  try {
    if(currentTurn == true) allTiles[currentY][currentX].addX();
    if(currentTurn == false) allTiles[currentY][currentX].addO();
  } catch(e) {
    currentX = null;
    currentY = null;
    return;
  }
  currentTurn = !currentTurn
  currentX = null;
  currentY = null;
}

onInput("a", () => {
  if(currentX == null) {
    currentX = 0; 
    return;
  }
  currentY = 0;
  addAndClear()
})
onInput("s", () => {
  if(currentX == null) {
    currentX = 1; 
    return;
  }
  currentY = 1;
  addAndClear() ;
})

onInput("d", () => {
  if(currentX == null) {
    currentX = 2; 
    return;
  }
  currentY = 2;
  addAndClear();
})

afterInput(() => {
  // console.log(currentTurn)
  checkForWinner(allTiles);
});
