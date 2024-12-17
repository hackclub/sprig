
/* 
@title: Battleship
@author: Johna-123
@tags: []
@addedOn: 2023-08-25
*/

    /*
Battleship
@Johna-123


How to play:
WASD to move cursor
I to rotate ships (when placing)
J to confirm position of ship/attack


Note to self: organise code and try to add more comments, gets confusing when i come back to it later
*/

const tile = "t";
const corner = "L";
const seperator = "l";

const selector = "+";

const a = "a";
const b = "b";
const c = "c";
const d = "d";
const e = "e";
const f = "f";
const g = "g";
const h = "h";
const i = "i";
const j = "j";
const _0 = "0";
const _1 = "1";
const _2 = "2";
const _3 = "3";
const _4 = "4";
const _5 = "5";
const _6 = "6";
const _7 = "7";
const _8 = "8";
const _9 = "9";

/* ships */
const top = "↑";
const vertical = "|";
const bottom = "↓";
const left = "←";
const horizontal = "_";
const right = "→";

const miss = "@";
const hit = "#";

function getLast(sprite) {
  return getAll(sprite)[getAll(sprite).length - 1];
}

setLegend(
  [tile, bitmap`
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
...............1
1111111111111111`],
  [corner, bitmap`
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
...............1`],
  [seperator, bitmap`
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....
.......0000.....`],

  [selector, bitmap`
................
.0000.....0000..
.0000.....0000..
.00.........00..
.00.........00..
................
................
................
................
................
.00.........00..
.00.........00..
.0000.....0000..
.0000.....0000..
................
................`],

  [a, bitmap`
................
................
................
....LLLLLLLL....
....LLL....L....
....LLL....L....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLL....L....
....LLL....L....
....LLL....L....
....LLL....L....
................
................
1111111111111111`],
  [b, bitmap`
................
................
................
....LLLLLLL.....
....LLL...L.....
....LLL...L.....
....LLL...L.....
....LLL...L.....
....LLLLLLLL....
....LLL....L....
....LLL....L....
....LLL....L....
....LLLLLLLL....
................
................
1111111111111111`],
  [c, bitmap`
................
................
................
....LLLLLLLL....
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLLLLLLL....
................
................
1111111111111111`],
  [d, bitmap`
................
................
................
....LLLLLLL.....
....LLL...LL....
....LLL...LL....
....LLL...LL....
....LLL...LL....
....LLL...LL....
....LLL...LL....
....LLL...LL....
....LLL...LL....
....LLLLLLL.....
................
................
1111111111111111`],
  [e, bitmap`
................
................
................
....LLLLLLLL....
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLLLLLL.....
....LLL.........
....LLL.........
....LLL.........
....LLLLLLLL....
................
................
1111111111111111`],
  [f, bitmap`
................
................
................
....LLLLLLLL....
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLLLLLL.....
....LLL.........
....LLL.........
....LLL.........
....LLL.........
................
................
1111111111111111`],
  [g, bitmap`
................
................
................
....LLLLLLLL....
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLL.........
....LLL.LLLL....
....LLL....L....
....LLL....L....
....LLLLLLLL....
................
................
1111111111111111`],
  [h, bitmap`
................
................
................
....LLL....L....
....LLL....L....
....LLL....L....
....LLL....L....
....LLL....L....
....LLLLLLLL....
....LLL....L....
....LLL....L....
....LLL....L....
....LLL....L....
................
................
1111111111111111`],
  [i, bitmap`
................
................
................
......LLLLL.....
.......LLL......
.......LLL......
.......LLL......
.......LLL......
.......LLL......
.......LLL......
.......LLL......
.......LLL......
......LLLLL.....
................
................
1111111111111111`],
  [j, bitmap`
................
................
................
........LLLL....
.........LLL....
.........LLL....
.........LLL....
.........LLL....
.........LLL....
.........LLL....
.........LLL....
....L....LLL....
....LLLLLLLL....
................
................
1111111111111111`],

  [_0, bitmap`
...............1
...............1
...............1
....LLLLLLLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLL..LLL...1
....LLLLLLLL...1
...............1
...............1
...............1`],
  [_1, bitmap`
...............1
...............1
...............1
......LLLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
.......LLL.....1
...............1
...............1
...............1`],
  [_2, bitmap`
...............1
...............1
...............1
....LLLLLLLLL..1
............L..1
............L..1
....LLLLLLLLL..1
....L..........1
....L..........1
....L..........1
....LLLLLLLLL..1
....LLLLLLLLL..1
....LLLLLLLLL..1
...............1
...............1
...............1`],
  [_3, bitmap`
...............1
...............1
...............1
....LLLLLLLLL..1
............L..1
............L..1
....LLLLLLLLL..1
............L..1
............L..1
............L..1
....LLLLLLLLL..1
....LLLLLLLLL..1
....LLLLLLLLL..1
...............1
...............1
...............1`],
  [_4, bitmap`
...............1
...............1
...............1
....L.....LLL..1
....L.....LLL..1
....L.....LLL..1
....L.....LLL..1
....L.....LLL..1
....LLLLLLLLL..1
..........LLL..1
..........LLL..1
..........LLL..1
..........LLL..1
...............1
...............1
...............1`],
  [_5, bitmap`
...............1
...............1
...............1
....LLLLLLLLL..1
....L..........1
....L..........1
....L..........1
....LLLLLLLLL..1
..........LLL..1
..........LLL..1
..........LLL..1
..........LLL..1
....LLLLLLLLL..1
...............1
...............1
...............1`],
  [_6, bitmap`
...............1
...............1
...............1
....LLLLLLLL...1
....LLL........1
....LLL........1
....LLL........1
....LLLLLLLL...1
....LLL....L...1
....LLL....L...1
....LLL....L...1
....LLL....L...1
....LLLLLLLL...1
...............1
...............1
...............1`],
  [_7, bitmap`
...............1
...............1
...............1
....LLLLLLLL...1
....LLLLLLLL...1
....LLLLLLLL...1
.........LLL...1
.........LLL...1
.........LLL...1
.........LLL...1
.........LLL...1
.........LLL...1
.........LLL...1
...............1
...............1
...............1`],
  [_8, bitmap`
...............1
...............1
...............1
......LLLL.....1
......L..L.....1
......L..L.....1
....LLLLLLLL...1
....L......L...1
....L......L...1
....L......L...1
....LLLLLLLL...1
....LLLLLLLL...1
....LLLLLLLL...1
...............1
...............1
...............1`],
  [_9, bitmap`
...............1
...............1
...............1
.....LLLLLLL...1
.....L...LLL...1
.....L...LLL...1
.....L...LLL...1
.....LLLLLLL...1
.........LLL...1
.........LLL...1
.........LLL...1
.........LLL...1
.....LLLLLLL...1
...............1
...............1
...............1`],

  [top, bitmap`
..00000000000...
.0011111111100..
001111111111100.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.`],
  [vertical, bitmap`
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.`],
  [bottom, bitmap`
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
011111111111110.
001111111111100.
.0011111111100..
..00000000000...
................`],
  [left,  bitmap`
..0000000000000.
.00111111111111.
001111111111111.
011111111111111.
011111111111111.
011111111111111.
011111111111111.
011111111111111.
011111111111111.
011111111111111.
011111111111111.
011111111111111.
001111111111111.
.00111111111111.
..0000000000000.
................`],
  [horizontal, bitmap`
0000000000000000
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
0000000000000000
................`],
  [right, bitmap`
0000000000000...
11111111111100..
111111111111100.
111111111111110.
111111111111110.
111111111111110.
111111111111110.
111111111111110.
111111111111110.
111111111111110.
111111111111110.
111111111111110.
111111111111100.
11111111111100..
0000000000000...
................`],

  [miss, bitmap`
................
................
................
................
................
.......L........
......LLL.......
.....LLLLL......
......LLL.......
.......L........
................
................
................
................
................
................`],
  [hit, bitmap`
................
.L...........L..
..L.........L...
...L.......L....
....L.....L.....
.....L...L......
......L.L.......
.......L........
......L.L.......
.....L...L......
....L.....L.....
...L.......L....
..L.........L...
.L...........L..
................
................`]
)

setSolids([corner, seperator, a, b, c, d, e, f, g, h, i, j, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9])

/*
level 0 = Player 1
level 1 = Player 2
level 2 = Win
*/

let levels = [
  map`
.......................
.......................
.......................
...........l...........
...........l...........
LabcdefghijlLabcdefghij
0ttttttttttl0tttttttttt
1ttttttttttl1tttttttttt
2ttttttttttl2tttttttttt
3ttttttttttl3tttttttttt
4ttttttttttl4tttttttttt
5ttttttttttl5tttttttttt
6ttttttttttl6tttttttttt
7ttttttttttl7tttttttttt
8ttttttttttl8tttttttttt
9ttttttttttl9tttttttttt`,
  map`
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................`
]

/*
0 = empty
1 = top
2 = vertical
3 = bottom
4 = left
5 = horizontal
6 = right
7 = miss
8 = hit
*/

let playerOneGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

let playerTwoGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

/*
ships
*/

// idek if i had to use a class here?
class Ship {
  constructor(_length, _x, _y, pos) {
    this.length = _length;
    this.x = _x;
    this.y = _y;
    this.pos = pos;
    
    if (this.pos === "right") {
      addSprite(this.x + 1, this.y + 6, left);
      currentPlayer === 0 ? playerOneGrid[this.y][this.x] = 4 : playerTwoGrid[this.y][this.x] = 4;
      for(let i = 0; i < this.length - 2; i++) {
        addSprite(this.x + 2 + i, this.y + 6, horizontal);
        currentPlayer === 0 ? playerOneGrid[this.y][this.x + 1 + i] = 5 : playerTwoGrid[this.y][this.x + 1 + i] = 5;
      }
      addSprite(this.x + this.length, this.y + 6, right);
      currentPlayer === 0 ? playerOneGrid[this.y][this.x + this.length - 1] = 6 : playerTwoGrid[this.y][this.x + this.length - 1] = 6;
    } else if (this.pos === "down") {
      addSprite(this.x + 1, this.y + 6, top);
      currentPlayer === 0 ? playerOneGrid[this.y][this.x] = 1 : playerTwoGrid[this.y][this.x] = 1;
      for(let i = 0; i < this.length - 2; i++) {
        addSprite(this.x + 1, this.y + 7 + i, vertical);
        currentPlayer === 0 ? playerOneGrid[this.y + 1 + i][this.x] = 2 : playerTwoGrid[this.y + 1 + i][this.x] = 2;
      }
      addSprite(this.x + 1, this.y + this.length + 5, bottom);
      currentPlayer === 0 ? playerOneGrid[this.y + this.length - 1][this.x] = 3 : playerTwoGrid[this.y + this.length - 1][this.x] = 3;
    } else if (this.pos === "left") {
      addSprite(this.x - this.length + 2, this.y + 6, left);
      currentPlayer === 0 ? playerOneGrid[this.y][this.x - this.length + 1] = 4 : playerTwoGrid[this.y][this.x - this.length + 1] = 4;
      for(let i = 0; i < this.length - 2; i++) {
        addSprite(this.x + 3 + i - this.length, this.y + 6, horizontal);
        currentPlayer === 0 ? playerOneGrid[this.y][this.x + 2 + i - this.length] = 5 : playerTwoGrid[this.y][this.x + 2 + i - this.length] = 5;
      }
      addSprite(this.x + 1, this.y + 6, right);
      currentPlayer === 0 ? playerOneGrid[this.y][this.x] = 6 : playerTwoGrid[this.y][this.x] = 6;
    } else if (this.pos === "up") {
      addSprite(this.x + 1, this.y + 7 - this.length, top);
      currentPlayer === 0 ? playerOneGrid[this.y + 1 - this.length][this.x] = 1 : playerTwoGrid[this.y + 1 - this.length][this.x] = 1;
      for(let i = 0; i < this.length - 2; i++) {
        addSprite(this.x + 1, this.y + 8 + i - this.length, vertical);
        currentPlayer === 0 ? playerOneGrid[this.y + 2 + i - this.length][this.x] = 2 : playerTwoGrid[this.y + 2 + i - this.length][this.x] = 2;
      }
      addSprite(this.x + 1, this.y + 6, bottom);
      currentPlayer === 0 ? playerOneGrid[this.y][this.x] = 3 : playerTwoGrid[this.y][this.x] = 3;
    }
  }
}

let _left = true;
let _top = true;

function isHorizontal(length, _is) {
  if (!_is) {
    for(let i = 1; i < length; i++) {
      if (getFirst(selector).x < 6) {
        getAll(selector)[i].x += i;
        _left = true
        pos = "right";
      } else {
        getAll(selector)[i].x -= i;
        _left = false
        pos = "left";
      }

      if (_top) {
        getAll(selector)[i].y -= i;
      } else {
        getAll(selector)[i].y += i;
      }
    }
    return true;
  } else {
    for(let i = 1; i < length; i++) {
      if (getFirst(selector).y < 11) {
        getAll(selector)[i].y += i;
        _top = true;
        pos = "down";
      } else {
        getAll(selector)[i].y -= i;
        _top = false;
        pos = "up";
      }

      if (_left) {
        getAll(selector)[i].x -= i;
      } else {
        getAll(selector)[i].x += i;
      }
    }
    return false;
  }
}

let currentPlayer = 0;
let currentAction = "placeShips";
let length = 0;
let ship = 0;
let hor = false;
let pos = "down";

function inputs() {
  onInput("i", () => {
    switch (currentAction) {
      case "placeShips":
        if (isHorizontal(length, hor)) {
          hor = true;
        } else {
          hor = false;
        }
        break;
    }
  });
  onInput("w", () => {
    switch (currentAction) {
      case "placeShips":
        if (getFirst(selector).y !== 6 && getLast(selector).y !== 6) {
          getAll(selector).forEach(el => el.y -= 1);
        }
        break;
        
      case "play":
        if (getFirst(selector).y !== 6) {
          getAll(selector).forEach(el => el.y -= 1);
        }
        break;
    }
  });
  onInput("a", () => {
    switch (currentAction) {
      case "placeShips":
        if (getFirst(selector).x !== 1 && getLast(selector).x !== 1) {
          getAll(selector).forEach(el => el.x -= 1);
        }
        break;
        
      case "play":
        if (getFirst(selector).x !== 13) {
          getAll(selector).forEach(el => el.x -= 1);
        }
        break;
    }
  });
  onInput("s", () => {
    switch (currentAction) {
      case "placeShips":
        if (getLast(selector).y !== 15 && getFirst(selector).y !== 15) {
          getAll(selector).forEach(el => el.y += 1);
        }
        break;
        
      case "play":
        if (getLast(selector).y !== 15) {
          getAll(selector).forEach(el => el.y += 1);
        }
        break;
    }
  });
  onInput("d", () => {
    switch (currentAction) {
      case "placeShips":
        if (getLast(selector).x !== 10 && getFirst(selector).x !== 10) {
          getAll(selector).forEach(el => el.x += 1);
        }
        break;
        
      case "play":
        if (getLast(selector).x !== 22) {
          getAll(selector).forEach(el => el.x += 1);
        }
        break;
    }
  });
  onInput("j", () => {
    switch (currentAction) {
      case "placeShips":
        let e = [];
        
        getAll(selector).forEach(function(el) {
          getTile(el.x, el.y).forEach(function(el) {
            e.push(el.type);
          });
        });

        if (!(e.includes("↑") || e.includes("|") || e.includes("↓") || e.includes("←") || e.includes("_") || e.includes("→"))) {
          new Ship(length, getFirst(selector).x - 1, getFirst(selector).y - 6, pos);
          getAll(selector).forEach(el => el.remove());
          ship += 1;
          hor = false;
          _left = true;
          _top = true;
          pos = "down";
          placeShip();
        }
        break;

      case "play":
        let x = getFirst(selector).x;
        let y = getFirst(selector).y;

        if (currentPlayer === 0) {
          if (playerTwoGrid[y - 6][x - 13] !== 0 && playerTwoGrid[y - 6][x - 13] !== 7 && playerTwoGrid[y - 6][x - 13] !== 8) {
            addSprite(x, y, hit);
            playerTwoGrid[y - 6][x - 13] = 8;
          } else if (playerTwoGrid[y - 6][x - 13] === 0) {
            addSprite(x, y, miss);
            playerTwoGrid[y - 6][x - 13] = 7;
            currentPlayer = 1;
            wait(1);
          }
        } else {
          if (playerOneGrid[y - 6][x - 13] !== 0 && playerOneGrid[y - 6][x - 13] !== 7 && playerOneGrid[y - 6][x - 13] !== 8) {
            addSprite(x, y, hit);
            playerOneGrid[y - 6][x - 13] = 8;
          } else if (playerOneGrid[y - 6][x - 13] === 0) {
            addSprite(x, y, miss);
            playerOneGrid[y - 6][x - 13] = 7;
            currentPlayer = 0;
            wait(0);
          }
        }
    }
  });
}inputs();

function wait(player) {
  if (player === 0) {
    currentAction = "wait";
    setTimeout(() => {
      clearText();
      setMap(levels[1]);
      addText("Player 1's turn", {
        x: 3,
        y: 7,
        color: color`3`
      });
      setTimeout(() => {
        clearText();
        currentAction = "play";
        player1Play();
      }, 3000);
    }, 500);
  } else {
    currentAction = "wait";
    setTimeout(() => {
      clearText();
      setMap(levels[1]);
      addText("Player 2's turn", {
        x: 3,
        y: 7,
        color: color`5`
      });
      setTimeout(() => {
        clearText();
        currentAction = "play";
        player2Play();
      }, 3000);
    }, 500);
  }
}

afterInput(() => {
  switch (currentAction) {
    case "placeShips":
      if (ship > 5 && currentPlayer === 0) {
        currentPlayer = 1;
        player2Ships();
      } else if (ship > 5 && currentPlayer === 1) {
        currentPlayer = 0;
        wait(0);
      }
      break;

    case "play":
      let one = playerOneGrid.some(function(y) {
        return (y.includes(1) || y.includes(2) || y.includes(3) || y.includes(4) || y.includes(5) || y.includes(6))
      });
      
      let two = playerTwoGrid.some(function(y) {
        return (y.includes(1) || y.includes(2) || y.includes(3) || y.includes(4) || y.includes(5) || y.includes(6))
      });

      if (!one) {
        currentAction = "win";
        clearText();
        setMap(levels[1]);
        addText("Player 2 Wins!!", {
          x: 3,
          y: 7,
          color: color`5`
        });
      } else if (!two) {
        currentAction = "win";
        clearText();
        setMap(levels[1]);
        addText("Player 1 Wins!!", {
          x: 3,
          y: 7,
          color: color`3`
        });
      }
      break;

    case "win":
      clearText();
      player1Ships();
  }
});

function placeShip() {
  switch (ship) {
    case 1: length = 2; break;
    case 2: length = 3; break;
    case 3: length = 3; break;
    case 4: length = 4; break;
    case 5: length = 5; break;
  }
  for (let i = 0; i < length; i++) {
    addSprite(1, 6 + i, selector);
  }  
}

function text(player) {
  addText("Player " + player, {x: 6, y: 2, color: player === 1 ? color`3` : color`5`});
  addText("You", {x: 4, y: 4, color: color`L`});
  addText("Opponent", {x: 11, y: 4, color: color`L`});
}

function player1() {
  setMap(levels[0]);
  text(1);
}

function player2() {
  setMap(levels[0]);
  text(2);
}

function player1Ships() {
  currentAction = "placeShips";
  player1();
  ship = 1;
  placeShip();
}

function player2Ships() {
  currentAction = "placeShips";
  player2();
  ship = 1;
  placeShip();
}

function player1Play() {
  player1();

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let _x = x + 1;
      let _y = y + 6;

      switch (playerOneGrid[y][x]) {
        case 1: addSprite(_x, _y, top); break;
        case 2: addSprite(_x, _y, vertical); break;
        case 3: addSprite(_x, _y, bottom); break;
        case 4: addSprite(_x, _y, left); break;
        case 5: addSprite(_x, _y, horizontal); break;
        case 6: addSprite(_x, _y, right); break;
        case 7: addSprite(_x, _y, miss); break;
        case 8: addSprite(_x, _y, hit); break;
      }

      switch (playerTwoGrid[y][x]) {
        case 7: addSprite(x + 13, _y, miss); break;
        case 8: addSprite(x + 13, _y, hit); break;
      }
    }
  }
  
  addSprite(13, 6, selector);
}

function player2Play() {
  player2();

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let _x = x + 1;
      let _y = y + 6;

      switch (playerTwoGrid[y][x]) {
        case 1: addSprite(_x, _y, top); break;
        case 2: addSprite(_x, _y, vertical); break;
        case 3: addSprite(_x, _y, bottom); break;
        case 4: addSprite(_x, _y, left); break;
        case 5: addSprite(_x, _y, horizontal); break;
        case 6: addSprite(_x, _y, right); break;
        case 7: addSprite(_x, _y, miss); break;
        case 8: addSprite(_x, _y, hit); break;
      }

      switch (playerOneGrid[y][x]) {
        case 7: addSprite(x + 13, _y, miss); break;
        case 8: addSprite(x + 13, _y, hit); break;
      }
    }
  }
  
  addSprite(13, 6, selector);
}

player1Ships();