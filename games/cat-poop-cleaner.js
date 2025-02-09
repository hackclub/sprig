/*
@title: minesweeper
@author: sam liu
@tags: ['retro']
@addedOn: 2022-08-29

Your typical Minesweeper game
9x9, 10 poops

Controls:
w, a, s, d: Move selection
j: click open. open neighbours (if tile already opened)
l: mark flag
*/

const tile = "a";
const poop = "b";
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
3333333333333333
3888888888888883
3866666666666683
386..........683
386..........683
386..........683
386..........683
386..........683
386..........683
386..........683
386..........683
386..........683
386..........683
3866666666666683
3888888888888883
3333333333333333`],
  [ tile, bitmap`
2222222222222223
222222222222223H
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
22888888888888HH
23HHHHHHHHHHHHHH
3HHHHHHHHHHHHHHH`],
  [ poop, bitmap`
2222222022222222
22222000C0222222
222200CCCC022222
22200CCCCC022222
2200CCCCCC000222
220CCCCCCCCCC002
220CCCCCCCCCCC02
2200CCCCCCCCCC02
2220000CCCCCCC02
200CCCCCCCCCC022
0CCCCCCCCCCC0002
0CCCCCC00000CC02
0CCCCC0CCCCCCCC0
0CCCCCCCCCCCCCC0
00CCCCCCCCCCCC00
200CCCCCCCCCC002`],
  [ flag, bitmap`
222222222222222H
28888222222226H8
2822822222226688
2822822222266688
2228822222666688
2282222226666688
2282222266666688
2222222666666688
2288226666666688
2222266666666688
2222666666666688
2226666666666688
2266666666666688
2666666666666688
2H88888888888888
H888888888888888`],
  [ one, bitmap`
2222222222222222
2222222222222222
2222222888222222
2222228888222222
2222288888222222
2222888888222222
2222228888222222
2222228888222222
2222228888222222
2222228888222222
2222228888222222
2222228888222222
2222888888882222
2222888888882222
2222222222222222
2222222222222222`],
  [ two, bitmap`
2222222222222222
2222222222222222
2228888888882222
2288888888882222
2288822222888222
2222222222888222
2222222222888222
2222222288882222
2222228888822222
2222888882222222
2288888222222222
2288888888888222
2288888888888222
2222222222222222
2222222222222222
2222222222222222`],
  [ three, bitmap`
2222222222222222
2222222222222222
2222222222222222
2288888888882222
2288888888888222
2222222222888222
2222222222888222
2222888888882222
2222888888882222
2222222222888222
2222222222888222
2288888888888222
2288888888882222
2222222222222222
2222222222222222
2222222222222222`],
  [ four, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222288828882222
2222288828882222
2222888228882222
2222888228882222
2228888888888222
2228888888888222
2222222228882222
2222222228882222
2222222228882222
2222222228882222
2222222222222222
2222222222222222
2222222222222222`],
  [ five, bitmap`
2222222222222222
2222222222222222
2222222222222222
2228888888888222
2228888888888222
2228882222222222
2228882222222222
2228888888882222
2228888888888222
2222222222888222
2222222222888222
2228888888888222
2228888888882222
2222222222222222
2222222222222222
2222222222222222`],
  [ six, bitmap`
2222222222222222
2222222222222222
2222222222222222
2228888888882222
2288888888882222
2288822222222222
2288822222222222
2288888888882222
2288888888888222
2288822222888222
2288822222888222
2288888888888222
2228888888882222
2222222222222222
2222222222222222
2222222222222222`],
  [ seven, bitmap`
2222222222222222
2222222222222222
2222222222222222
2228888888888222
2228888888888222
2222222222888222
2222222222888222
2222222228882222
2222222228882222
2222222288822222
2222222288822222
2222222888222222
2222222888222222
2222222222222222
2222222222222222
2222222222222222`],
  [ eight, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222888888882222
2228888888888222
2228882222888222
2228882222888222
2222888888882222
2222888888882222
2228882222888222
2228882222888222
2228888888888222
2222888888882222
2222222222222222
2222222222222222
2222222222222222`],
  [ empty, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222282222822222
2222888228882222
2222888888882222
2222888888882222
2222288888822222
2222228888222222
2222222882222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ]
);

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

// Place 10 random poops
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
        let poops = 0;
        if (x > 0) {
          if (board[y][x-1] == -1) { poops++ };
        };
        if (y > 0) {
          if (board[y-1][x] == -1) { poops++ };
        };
        if (x < 8) {
          if (board[y][x+1] == -1) { poops++ };
        };
        if (y < 8) {
          if (board[y+1][x] == -1) { poops++ };
        };
        if (x > 0 && y > 0) {
          if (board[y-1][x-1] == -1) { poops++ };
        };
        if (x > 0 && y < 8) {
          if (board[y+1][x-1] == -1) { poops++ };
        };
        if (x < 8 && y > 0) {
          if (board[y-1][x+1] == -1) { poops++ };
        };
        if (x < 8 && y < 8) {
          if (board[y+1][x+1] == -1) { poops++ };
        };

        numbers[y][x] = poops;
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
          addSprite(x, y, poop);
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

  addText("GAME OVER!!!", { 
    x: 5, 
    y: 6, 
    color: color`H`
  });
  addText(`Score: ${opened}`, { 
    x: 6, 
    y: 8, 
    color: color`H`
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
