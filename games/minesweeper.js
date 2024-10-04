/*
@title: minesweeper
@author: sam liu
@tags: ['retro']
@addedOn: 2022-08-29

Your typical Minesweeper game
9x9, 10 bombs

Controls:
w, a, s, d: Move selection
j: click open. open neighbours (if tile already opened)
l: mark flag
*/

const tile = "a";
const bomb = "b";
const flag = "c";
const one = "d";
const two = "e";
const three = "f";
const four = "g";
const five = "h";
const six = "i";
const seven = "j";
const eight = "k";
const select = "l";
const empty = "m";

setLegend(
  [ select, bitmap`
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
  [ tile, bitmap`
2222222222222221
222222222222221L
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
21LLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL`],
  [ bomb, bitmap`
LLLLLLLLLLLLLLLL
L11111100111111L
L11111100111111L
L11010000001011L
L11100000000111L
L11002200000011L
L11002200000011L
L00000000000000L
L00000000000000L
L11000000000011L
L11000000000011L
L11100000000111L
L11010000001011L
L11111100111111L
L11111100111111L
LLLLLLLLLLLLLLLL`],
  [ flag, bitmap`
2222222222222221
222222222222221L
22111111111111LL
22111113311111LL
22111333311111LL
22113333311111LL
22111333311111LL
22111113311111LL
22111111011111LL
22111111011111LL
22111100001111LL
22110000000011LL
22110000000011LL
22111111111111LL
21LLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL`],
  [ one, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111155511111L
L11111555511111L
L11115555511111L
L11155555511111L
L11111555511111L
L11111555511111L
L11111555511111L
L11111555511111L
L11111555511111L
L11111555511111L
L11155555555111L
L11155555555111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ two, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11444444444111L
L14444444444111L
L14441111144411L
L11111111144411L
L11111111144411L
L11111114444111L
L11111444441111L
L11144444111111L
L14444411111111L
L14444444444411L
L14444444444411L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ three, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L13333333333111L
L13333333333311L
L11111111133311L
L11111111133311L
L11133333333111L
L11133333333111L
L11111111133311L
L11111111133311L
L13333333333311L
L13333333333111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ four, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11116661666111L
L11116661666111L
L11166611666111L
L11166611666111L
L11666666666611L
L11666666666611L
L11111111666111L
L11111111666111L
L11111111666111L
L11111111666111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ five, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11888888888811L
L11888888888811L
L11888111111111L
L11888111111111L
L11888888888111L
L11888888888811L
L11111111188811L
L11111111188811L
L11888888888811L
L11888888888111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ six, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11777777777111L
L17777777777111L
L17771111111111L
L17771111111111L
L17777777777111L
L17777777777711L
L17771111177711L
L17771111177711L
L17777777777711L
L11777777777111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ seven, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11000000000011L
L11000000000011L
L11111111100011L
L11111111100011L
L11111111000111L
L11111111000111L
L11111110001111L
L11111110001111L
L11111100011111L
L11111100011111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ eight, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11122222222111L
L11222222222211L
L11222111122211L
L11222111122211L
L11122222222111L
L11122222222111L
L11222111122211L
L11222111122211L
L11222222222211L
L11122222222111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ empty, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL` ]
);

// This will store the state of the game board
// -2: flag, -1: bomb, 0: tile, 1: opened
let board = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
];

// This will store the values which the grids should display
// -1: bomb, 0: no number, >0: the number itself
let numbers = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
];

// Initial selection location; center
let selectX = 4;
let selectY = 4;

let player;
let gameover = false;
let opened = 0; // The amount of tiles opened
let flags = 0; // The amount of flags placed

// Place 10 random bombs
for (let i = 0; i < 10; i++) {
  let randX = Math.floor(Math.random() * 9);
  let randY = Math.floor(Math.random() * 9);
  if (board[randY][randX] == 0) {
    board[randY][randX] = -1
  } else {
    // If the space is already taken, another iteration.
    i--;
  };
};

// Compute the values and store them in "numbers"
for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[y][x] == -1) {
        numbers[y][x] = -1;
      } else {
        let bombs = 0;
        if (x > 0) {
          if (board[y][x-1] == -1) { bombs++ };
        };
        if (y > 0) {
          if (board[y-1][x] == -1) { bombs++ };
        };
        if (x < 8) {
          if (board[y][x+1] == -1) { bombs++ };
        };
        if (y < 8) {
          if (board[y+1][x] == -1) { bombs++ };
        };
        if (x > 0 && y > 0) {
          if (board[y-1][x-1] == -1) { bombs++ };
        };
        if (x > 0 && y < 8) {
          if (board[y+1][x-1] == -1) { bombs++ };
        };
        if (x < 8 && y > 0) {
          if (board[y-1][x+1] == -1) { bombs++ };
        };
        if (x < 8 && y < 8) {
          if (board[y+1][x+1] == -1) { bombs++ };
        };

        numbers[y][x] = bombs;
      };
    };
};

// Draws the board to the screen
function drawBoard() {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      clearTile(x,y);
      
      if (board[y][x] == 1) {
        if (numbers[y][x] == -1) {
          addSprite(x, y, bomb);
        } else if (numbers[y][x] == 0) {
          addSprite(x, y, empty);
        } else if (numbers[y][x] == 1) {
          addSprite(x, y, one);
        } else if (numbers[y][x] == 2) {
          addSprite(x, y, two);
        } else if (numbers[y][x] == 3) {
          addSprite(x, y, three);
        } else if (numbers[y][x] == 4) {
          addSprite(x, y, four);
        } else if (numbers[y][x] == 5) {
          addSprite(x, y, five);
        } else if (numbers[y][x] == 6) {
          addSprite(x, y, six);
        } else if (numbers[y][x] == 7) {
          addSprite(x, y, seven);
        } else if (numbers[y][x] == 8) {
          addSprite(x, y, eight);
        };
      } else if (board[y][x] == 0 || board[y][x] == -1) {
        addSprite(x, y, tile);
      } else if (board[y][x] == -2) {
        addSprite(x, y, flag);
      };
      
    };
  };
  selectX = Math.min(width()-1, selectX);
  selectX = Math.max(0, selectX);
  selectY = Math.min(height()-1, selectY);
  selectY = Math.max(0, selectY);
  addSprite(selectX, selectY, select);
  player = getFirst(select);
  
}

// Open all neighbouring tiles, excluding flagged ones
function openAround(x, y) {
  
  if (x > 0) {
    if (board[y][x-1] == -1) {
      lost();
    } else if(board[y][x-1] == 0 && numbers[y][x-1] == 0) {
      flood(x-1, y)
    } else if (board[y][x-1] == 0) {
      board[y][x-1] = 1;
      opened++;
    }
  };
  if (y > 0) {
    if (board[y-1][x] == -1) {
      lost();
    } else if(board[y-1][x] == 0 && numbers[y-1][x] == 0) {
      flood(x, y-1)
    } else if (board[y-1][x] == 0) {
      board[y-1][x] = 1;
      opened++;
    }
  };
  if (x < 8) {
    if (board[y][x+1] == -1) {
      lost();
    } else if(board[y][x+1] == 0 && numbers[y][x+1] == 0) {
      flood(x+1, y);
    } else if (board[y][x+1] == 0) {
      board[y][x+1] = 1;
      opened++;
    };
  };
  if (y < 8) {
    if (board[y+1][x] == -1) {
      lost();
    } else if(board[y+1][x] == 0 && numbers[y+1][x] == 0) {
      flood(x, y+1);
    } else if (board[y+1][x] == 0) {
      board[y+1][x] = 1;
      opened++;
    };
  };
  if (x > 0 && y > 0) {
    if (board[y-1][x-1] == -1) {
      lost();
    } else if(board[y-1][x-1] == 0 && numbers[y-1][x-1] == 0) {
      flood(x-1, y-1);
    } else if (board[y-1][x-1] == 0) {
      board[y-1][x-1] = 1;
      opened++;
    };
  };
  if (x > 0 && y < 8) {
    if (board[y+1][x-1] == -1) {
      lost();
    } else if(board[y+1][x-1] == 0 && numbers[y+1][x-1] == 0) {
      flood(x-1, y+1);
    } else if (board[y+1][x-1] == 0) {
      board[y+1][x-1] = 1;
      opened++;
    };
  };
  if (x < 8 && y > 0) {
    if (board[y-1][x+1] == -1) {
      lost();
    } else if(board[y-1][x+1] == 0 && numbers[y-1][x+1] == 0) {
      flood(x+1, y-1);
    } else if (board[y-1][x+1] == 0) {
      board[y-1][x+1] = 1;
      opened++;
    };
  };
  if (x < 8 && y < 8) {
    if (board[y+1][x+1] == -1) {
      lost();
    } else if(board[y+1][x+1] == 0 && numbers[y+1][x+1] == 0) {
      flood(x+1, y+1);
    } else if (board[y+1][x+1] == 0) {
      board[y+1][x+1] = 1;
      opened++;
    };
  };
}

// Open all connected empty tiles
function flood(x, y) {
  if (board[y][x] == 0) {
    board[y][x] = 1;
    opened++;
  };

    if (x > 0) {
      if (numbers[y][x-1] == 0 && board[y][x-1] == 0) {
        flood(x-1, y, -1);
      };
    };
    if (y > 0) {
      if (numbers[y-1][x] == 0 && board[y-1][x] == 0) {
        flood(x, y-1, 0);
      };
    };
    if (x < 8) {
      if (numbers[y][x+1] == 0 && board[y][x+1] == 0) {
        flood(x+1, y, 1);
      };
    };
    if (y < 8) {
      if (numbers[y+1][x] == 0 && board[y+1][x] == 0) {
        flood(x, y+1, -2);
      };
    };

  openAround(x, y);
  
};

// If you lost the game
function lost() {
  gameover = true;
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      board[y][x] = 1;
    };
  };

  addText("Game Over", { 
    x: 5, 
    y: 6, 
    color: color`2`
  });
  addText(`Score: ${opened}`, { 
    x: 6, 
    y: 8, 
    color: color`2`
  });

};

// If you won
function win() {
  gameover = true;  
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (numbers[y][x] != -1) {
        board[y][x] = 1;
      };
    };
  };

  addText("You Win!", { 
    x: 6, 
    y: 7, 
    color: color`2`
  });
};

// Move controls
onInput("w", () => {selectY--});
onInput("a", () => {selectX--});
onInput("s", () => {selectY++});
onInput("d", () => {selectX++});

// Open tile
onInput("j", () => {
  // Exclude flagged tiles
  if (
    board === undefined || 
    board[selectY] === undefined || 
    board[selectY][selectX] === undefined || 
    numbers === undefined || 
    numbers[selectY] === undefined || 
    numbers[selectY][selectX] === undefined ||
    board[selectY][selectX] == -2 ) { return };
  
  if (numbers[selectY][selectX] == -1) {
    lost(); // You opened a mine
  } else if (numbers[selectY][selectX] == 0){
    flood(selectX, selectY); // Open all connected empty tiles
  } else if (board[selectY][selectX] == 1) {
    openAround(selectX, selectY); // Open neighbouring if you click on a number
  } else {
    board[selectY][selectX] = 1;
    opened++;
  };

  if (opened >= 71 && flags >= 10) {
    win();
  };
  
  drawBoard();
});

// Flag a tile
onInput("l", () => {
  if (
    board === undefined || 
    board[selectY] === undefined || 
    board[selectY][selectX] === undefined
  ) { return };

  // Exclude opened tiles
  if (board[selectY][selectX] != 0 && board[selectY][selectX] != -1 && board[selectY][selectX] != -2 ) { return };

  // Toggle the flag
  if (board[selectY][selectX] == -2) {
    board[selectY][selectX] = 0;
    flags--;
  } else {
    board[selectY][selectX] = -2;
    flags++;
  };

  if (opened >= 71 && flags >= 10) {
    win();
  };
  
  drawBoard();
});

afterInput(() => {
  if (!gameover) {
    if (selectX < 0) {
      selectX = 8;
    } else if (selectX > 8) {
      selectX = 0;
    };
  
    if (selectY < 0) {
      selectY = 8;
    } else if (selectY > 8) {
      selectY = 0;
    };
  
    player.x = selectX;
    player.y = selectY;
  };
});

setMap(map`
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa
aaaaaaaaa`);

drawBoard();
