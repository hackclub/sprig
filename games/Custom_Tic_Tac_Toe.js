/*
@title: Custom Tic Tac Toe
@author: Cael Ganem
@tags: ['multiplayer']
@addedOn: 2023-10-30

Controls:
-WASD to control the selector
-K to place your piece (X always goes first)
-J to reset the game at any point
*Onscreen instructions when necessary*


Change the default grid size & the default number of marks required to win by changing the variables directly below
--gridSize = default size of the board
--inaRow = default for how many marks (x's or 0's) you need in a row
--crazyMode x's and o's don't matter anymore! A x-in-a-row of ANY COlOR means you lose! (inspired from https://github.com/hackclub/sprig/blob/main/games/Tic-Tac-No.js)
--skipSelection = skip the opening screen to edit the map size and in-a-row each time it should appear (true=skip every time; false=show every time)
*/
let gridSize = 6
let inaRow = 4
let crazyMode = false
let skipSelection = false





//define variables
const player1 = "x"; //x sprite
const player2 = "z"; //o sprite
const wallSide = "w"; //sideways wall sprite
const wallUp = "g"; //upward wall sprite
const cross = "n"; //cross sprite (between up and down sprites)
const player = "o" //red square as selector
const endgame_across_x = "a" //lines across winning marks
const endgame_up_x = "m" //lines across winning marks
const endgame_diagnal_right_x = "r" //lines across winning marks
const endgame_diagnal_left_x = "l" //lines across winning marks
const endgame_across_o = "b" //lines across winning marks
const endgame_up_o = "c" //lines across winning marks
const endgame_diagnal_right_o = "d" //lines across winning marks
const endgame_diagnal_left_o = "e" //lines across winning marks
const blank_blue_background = "u"

let customMap = `` //blank variable for the custom map made later
let PlayerTurn = "x"; //variable that holds who's turn it is
let tempSprite = '' //used to hold what icon to use when displaying line over winning marks

let gridmap = [] //list holding the positions of all marks on the board (used to determine if someone won)
//generate a list of blank spots based on the grid size
for (let i = 0; i < (gridSize*gridSize); i++) {
  gridmap.push(0)
}

//more variables
let tempX = 0 //used to determine x offset
let gametie = gridSize*gridSize //used to determine if all marks on the board are placed
let score = 0 //I don't think this is needed anymore tbh
let winner_coords = [] //holds the cords of all the marks that make up a winning line
let tempScore = 0 //used to determiene if a player has won the match
let x = 0
let y = 0
let gameOver = false

let gameStarted = false
if (skipSelection == true) {
  gameStarted = true
} else {
  gameStarted = false
}


//sprites
setLegend(
  [ player1, bitmap`
99............99
999..........999
.999........999.
..999......999..
...999....999...
....999..999....
.....999999.....
......9999......
......9999......
.....999999.....
....999..999....
...999....999...
..999......999..
.999........999.
999..........999
99............99`],
  [ player2, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ wallUp, bitmap`
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......`],
  [ wallSide, bitmap`
................
................
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
................
................
................
................
................
................`],
  [ cross, bitmap`
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
0000000000000000
0000000000000000
0000000000000000
0000000000000000
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......`],
  [ player, bitmap`
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333
3333333333333333`],
  [ endgame_across_x, bitmap`
................
................
................
................
................
................
................
9999999999999999
9999999999999999
................
................
................
................
................
................
................`],
  [ endgame_up_x, bitmap`
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......`],
  [ endgame_diagnal_right_x, bitmap`
99..............
999.............
.999............
..999...........
...999..........
....999.........
.....999........
......999.......
.......999......
........999.....
.........999....
..........999...
...........999..
............999.
.............999
..............99`],
  [ endgame_diagnal_left_x, bitmap`
..............99
.............999
............999.
...........999..
..........999...
.........999....
........999.....
.......999......
......999.......
.....999........
....999.........
...999..........
..999...........
.999............
999.............
99..............`],
  [ endgame_across_o, bitmap`
................
................
................
................
................
................
................
4444444444444444
4444444444444444
................
................
................
................
................
................
................`],
  [ endgame_up_o, bitmap`
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......`],
  [ endgame_diagnal_right_o, bitmap`
44..............
444.............
.444............
..444...........
...444..........
....444.........
.....444........
......444.......
.......444......
........444.....
.........444....
..........444...
...........444..
............444.
.............444
..............44`],
  [ endgame_diagnal_left_o, bitmap`
..............44
.............444
............444.
...........444..
..........444...
.........444....
........444.....
.......444......
......444.......
.....444........
....444.........
...444..........
..444...........
.444............
444.............
44..............`],
  [ blank_blue_background, bitmap`
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
);
const levels = [
  map`
u`
];


function make_map(gridSize){
  customMap = ``
  //generate custom board map
  for (let z = 0; z < (gridSize - 1); z++) {
    for (let i = 0; i < (gridSize - 1); i++) {
      if (z==0){
          if (i==0){
            customMap = customMap + `og`
          } else {
            customMap = customMap + `.g`
        }
      } else {
        customMap = customMap + `.g`
      }
    }
    customMap = customMap + `.\n`
    for (let i = 0; i < (gridSize - 1); i++) {
      customMap = customMap + `wn`
    }
    customMap = customMap + `w\n`
  }
  for (let i = 0; i < (gridSize - 1); i++) {
      customMap = customMap + `.g`
    }
    customMap = customMap + `.\n`

  return customMap
}

customMap = make_map(gridSize)

function onStart(gameStarted) {
  if (gameStarted == true){
    gameOver = false
    const currentLevel = customMap;
    setMap(currentLevel);
  } else {
    gameOver = false
    const currentLevel = levels[0];
    setMap(currentLevel);
    addText("Tic Tac Toe!", { 
        x: 2,
        y: 1,
        color: color`3`
    })
    addText("Map size: " + gridSize, { 
        x: 2,
        y: 3,
        color: color`0`
    })
    addText("In-a-row: " + inaRow, { 
        x: 2,
        y: 5,
        color: color`0`
    })
    addText("Crazy mode:" + crazyMode, {
      x: 2,
      y: 7,
      color: color`0`
    })
    addText("Press j to start", { 
        x: 2,
        y: 9,
        color: color`3`
    })
    addText("w=+size; s=-size", { 
        x: 2,
        y: 11,
        color: color`0`
    })
    addText("d=+row; a=-row", { 
        x: 2,
        y: 13,
        color: color`0`
    })
    addText("toggle crazy = i", {
      x: 2,
      y: 15,
      color: color`0`
    })
  }
}

if (skipSelection == false) {
  gameOver = false
  onStart()
} else {
  gameOver = false
  const currentLevel = customMap;
  setMap(currentLevel);
}

setSolids([ player ]);

setPushables({
  [player]: []
});

//runs when game is ended
function endgame(whoWon, winnerCoords, type, crazy) {
  gameOver = true
  
  if (whoWon == "tie") {
    addText("The game is a tie!", { 
      x: 1,
      y: 7,
      color: color`5`
    })
  } else {
    if (type == "lr"){
      if (whoWon == "z"){
        tempSprite = "b"
      } else {
        tempSprite = "a"
      }
    } else if (type == "ud") {
      if (whoWon == "z"){
        tempSprite = "c"
      } else {
        tempSprite = "m"
      }
    } else if (type == "r") {
      if (whoWon == "z"){
        tempSprite = "d"
      } else {
        tempSprite = "r"
      }
    } else if (type == "l") {
      if (whoWon == "z"){
        tempSprite = "e"
      } else {
        tempSprite = "l"
      }
    }
    
    for (var i = 0; i < (winnerCoords.length - 1); i++) {
      x = winnerCoords[i] % gridSize
      y = (winnerCoords[i] - x) / gridSize
      addSprite(x*2,y*2,tempSprite)
  
      if ((winnerCoords[0] % gridSize) == (winnerCoords[1] % gridSize)) {
        addSprite(x*2,y*2+1,tempSprite)
      } else if (((winnerCoords[0] - (winnerCoords[0] % gridSize))/gridSize) == ((winnerCoords[1] - (winnerCoords[1] % gridSize))/gridSize)){
        addSprite(x*2+1,y*2,tempSprite)
      } else if ((winnerCoords[0] % gridSize) == (winnerCoords[1] % gridSize)-1){
        if (((winnerCoords[0] - (winnerCoords[0] % gridSize))/gridSize) == ((winnerCoords[1] - (winnerCoords[1] % gridSize))/gridSize + 1)){
          addSprite(x*2+1,y*2-1,tempSprite)
        } else {
          addSprite(x*2+1,y*2+1,tempSprite)
        }
      }
    }
    x = winnerCoords[winnerCoords.length-1] % gridSize
    y = (winnerCoords[winnerCoords.length-1] - x) / gridSize
    addSprite(x*2,y*2,tempSprite)
    
    //print out who won
      if (whoWon == 'z'){
        whoWon = 'o';
      }
      if (crazy == "crazy"){
        if (whoWon == 'x'){
          whoWon = 'o';
        } else {
          whoWon = 'x';
        }
      }
      addText("" + (whoWon) + " won!", { 
        x: 7,
        y: 7,
        color: color`5`
      })
      addText("press j to replay", { 
        x: 2,
        y: 8,
        color: color`5`
      })
      //getFirst(player).remove()
  }
}


//inputs to move selector
onInput("s", () => {
  if (gameStarted == true){
    getFirst(player).y += 2;
  } else {
    if (gridSize > 2) {
      gridSize = gridSize - 1
      addText("Map size: " + gridSize, { 
        x: 2,
        y: 3,
        color: color`0`
      })
    }
  }
});

onInput("d", () => {
  if (gameStarted == true) {
    getFirst(player).x += 2;
  } else {
    inaRow = inaRow + 1
    addText("In-a-row: " + inaRow, { 
        x: 2,
        y: 5,
        color: color`0`
    })
  }
});

onInput("w", () => {
  if (gameStarted == true) {
    getFirst(player).y -= 2;
  } else {
    gridSize = gridSize + 1
    addText("Map size: " + gridSize, { 
      x: 2,
      y: 3,
      color: color`0`
    })
  }
});

onInput("a", () => {
  if (gameStarted == true) {
    getFirst(player).x -= 2;
  } else {
    if (inaRow > 1){
      inaRow = inaRow - 1
      addText("In-a-row: " + inaRow, { 
          x: 2,
          y: 5,
          color: color`0`
      })
    }
  }
});

onInput("i", () => {
  if (gameStarted == false) {
    if (crazyMode == true){
      crazyMode = false
    } else {
      crazyMode = true
    }
    addText("                ", {
      x: 2,
      y: 7,
      color: color`0`
    })
    addText("Crazy mode:" + crazyMode, {
      x: 2,
      y: 7,
      color: color`0`
    })
  }
});


//code to place mark
onInput("k", () => {
  if (gameOver == false) {
    if (gameStarted == true) {
      gametie = gridSize*gridSize //make a temp variable to decide if the game was a tie
    
      tempX =  (getFirst(player).x / 2) + 1 //temporary variable for x offset
    
      if (gridmap[((getFirst(player).y * gridSize / 2 + tempX)-1)] == 0){ //check if mark exists on current square
        gridmap[((getFirst(player).y * gridSize / 2 + tempX)-1)] = PlayerTurn //set the mark on the square
        addSprite(getFirst(player).x, getFirst(player).y, PlayerTurn); //add the sprite for the mark
    
        //logic to decide if game is over
    
        //left & right
        tempScore = 0
        winner_coords = []
        for (let i = 0; i < gridSize; i++) {
          tempScore = 0
          winner_coords = []
          for (let x = 0; x < gridSize; x++){
            if (crazyMode == false){
              if (gridmap[i*gridSize + x] == PlayerTurn){
                tempScore = tempScore + 1
                winner_coords.push(i*gridSize + x)
                if (tempScore >= inaRow) {
                  endgame(PlayerTurn, winner_coords, "lr", "")
                }
              } else {
                tempScore = 0
                winner_coords = []
              }
            } else {
              if ((gridmap[i*gridSize + x] == "x") || (gridmap[i*gridSize + x] == "z")){
                tempScore = tempScore + 1
                winner_coords.push(i*gridSize + x)
                if (tempScore >= inaRow) {
                  endgame(PlayerTurn, winner_coords, "lr", "crazy")
                }
              } else {
                tempScore = 0
                winner_coords = []
              }
            }
          }
        }
      
    
        //up and down
        tempScore = 0
        winner_coords = []
        for (let i = 0; i < gridSize; i++) {
          tempScore = 0
          winner_coords = []
          for (let x = 0; x < gridSize; x++){
            if (crazyMode == false){
              if (gridmap[i + x*gridSize] == PlayerTurn){
                tempScore = tempScore + 1
                winner_coords.push(i + x*gridSize)
                if (tempScore >= inaRow) {
                  endgame(PlayerTurn, winner_coords, "ud", "")
                }
              } else {
                tempScore = 0
                winner_coords = []
              }
            } else {
              if ((gridmap[i + x*gridSize] == "z") || (gridmap[i + x*gridSize] == "x")){
                tempScore = tempScore + 1
                winner_coords.push(i + x*gridSize)
                if (tempScore >= inaRow) {
                  endgame(PlayerTurn, winner_coords, "ud", "crazy")
                }
              } else {
                tempScore = 0
                winner_coords = []
              }
            }
          }
        }
    
    
        
        //right diagonal
        tempScore = 0
        winner_coords = []
        for (let x_axis = 0; x_axis < (gridSize-inaRow+1); x_axis++) {
          tempScore = 0
          winner_coords = []
          for (let y_axis = 0; y_axis < gridSize; y_axis++) {
            tempScore = 0
            winner_coords = []
            if (crazyMode == false){
              if (gridmap[x_axis + y_axis*gridSize] == PlayerTurn){
                for (let x = 0; x < inaRow; x++) {
                  if (gridmap[(x_axis+x) + (y_axis+x)*gridSize] == PlayerTurn){
                    tempScore = tempScore + 1
                    winner_coords.push((x_axis+x) + (y_axis+x)*gridSize)
                    if (tempScore >= inaRow) {
                      endgame(PlayerTurn, winner_coords, "r", "")
                    }
                  } else {
                    tempScore = 0
                    winner_coords = []
                  }
                }
              }
            } else {
              if ((gridmap[x_axis + y_axis*gridSize] == "z") || (gridmap[x_axis + y_axis*gridSize] == "x")){
                for (let x = 0; x < inaRow; x++) {
                  if ((gridmap[(x_axis+x) + (y_axis+x)*gridSize] == "z") || (gridmap[(x_axis+x) + (y_axis+x)*gridSize] == "x")){
                    tempScore = tempScore + 1
                    winner_coords.push((x_axis+x) + (y_axis+x)*gridSize)
                    if (tempScore >= inaRow) {
                      endgame(PlayerTurn, winner_coords, "r", "crazy")
                    }
                  } else {
                    tempScore = 0
                    winner_coords = []
                  }
                }
              }
            }
          }
        }
        
    
        //left diagonal
        tempScore = 0
        winner_coords = []
        for (let x_axis = 0; x_axis < (gridSize-inaRow+1); x_axis++) {
          tempScore = 0
          winner_coords = []
          for (let y_axis = 0; y_axis < gridSize; y_axis++) {
            tempScore = 0
            winner_coords = []
            if (crazyMode == false){
              if (gridmap[x_axis + y_axis*gridSize] == PlayerTurn){
                for (let x = 0; x < inaRow; x++) {
                  if (gridmap[(x_axis+x) + (y_axis-x)*gridSize] == PlayerTurn){
                    tempScore = tempScore + 1
                    winner_coords.push((x_axis+x) + (y_axis-x)*gridSize)
                    if (tempScore >= inaRow) {
                      endgame(PlayerTurn, winner_coords, "l", "")
                    }
                  } else {
                    tempScore = 0
                    winner_coords = []
                  }
                }
              }
            } else {
              if ((gridmap[x_axis + y_axis*gridSize] == "x") || (gridmap[x_axis + y_axis*gridSize] == "z")){
                for (let x = 0; x < inaRow; x++) {
                  if ((gridmap[(x_axis+x) + (y_axis-x)*gridSize] == "x") || (gridmap[(x_axis+x) + (y_axis-x)*gridSize] == "z")){
                    tempScore = tempScore + 1
                    winner_coords.push((x_axis+x) + (y_axis-x)*gridSize)
                    if (tempScore >= inaRow) {
                      endgame(PlayerTurn, winner_coords, "l", "crazy")
                    }
                  } else {
                    tempScore = 0
                    winner_coords = []
                  }
                }
              }
            }
          }
        }
    

        gametie = gridSize * gridSize
        //determine if game was a tie after all moves are made
        for (var i = 0; i < gridSize*gridSize; i++) {
            if (gridmap[i] == 0) {
              gametie = gametie - 1
            }
        }
        
        
        if (gametie == gridSize*gridSize) {
          endgame("tie", [], "", "")
        }
        
        if (PlayerTurn == "z"){
          PlayerTurn = "x";
        } else {
          PlayerTurn = "z";
        }
      } else {
    
    
      }
    }
  }
});

// input to reset level
onInput("j", () => {
  clearText("");
  if (gameStarted == false){
    gameStarted = true
    customMap = make_map(gridSize)
    PlayerTurn = "x";
    gridmap = []
    for (let i = 0; i < (gridSize*gridSize); i++) {
      gridmap.push(0)
    }
    gametie = gridSize*gridSize
    const currentLevel = customMap
  
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    }
  } else {
    if (skipSelection == false) {
      gameStarted = false
      onStart(gameStarted)
    } else {
        gameStarted = true
        customMap = make_map(gridSize)
        PlayerTurn = "x";
        gridmap = []
        for (let i = 0; i < (gridSize*gridSize); i++) {
          gridmap.push(0)
        }
        gametie = gridSize*gridSize
        const currentLevel = customMap
      
        if (currentLevel !== undefined) {
          clearText("");
          setMap(currentLevel);
        }
    }
      
  }
});

afterInput(() => {
});