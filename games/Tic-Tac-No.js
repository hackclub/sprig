/*
@title: Tic-Tac-No
@author: Ojas Somethin'
@tags: ['multiplayer']
@addedOn: 2023-02-02
*/

/*

    Almost like the usual Tic-Tac-Toe (but also, nothing like it).
    Both players play with Xs.
    Players take turns to place their X trying to PREVENT a triple X from being formed
    The player who completes a triple X LOSES :(
    THE WINNER GETS TO TAKE OVER THE WORLD!

    w, a, s, d to control the pointer
    j to place a cross
    
*/

const empty     = "a";
const crossred  = "b";
const crossblue = "c";
const player    = "d";

const clickRed  = tune`
197.3684210526316: c5~197.3684210526316,
6118.421052631579`;
const clickBlue = tune`
500: c5-500,
15500`;
const win       = tune`
175.43859649122808: b4-175.43859649122808,
175.43859649122808: b4^175.43859649122808,
175.43859649122808: b4/175.43859649122808,
175.43859649122808: b4/175.43859649122808,
175.43859649122808: b4~175.43859649122808,
175.43859649122808: b4~175.43859649122808,
4561.40350877193`;

setLegend(
  [ player,    bitmap`
LLLLLLLLLLLLLLLL
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
LLLLLLLLLLLLLLLL` ],
  [ crossred,  bitmap`
2222222222222222
2111111111111112
2111111111111112
2111101111101112
2111030111030112
2110333010333012
2111033303330112
2111103333301112
2111110333011112
2111103333301112
2111033303330112
2110333010333012
2111030111030112
2111101111101112
2111111111111112
2222222222222222` ],
  [ crossblue, bitmap`
2222222222222222
2111111111111112
2111111111111112
2111101111101112
2111070111070112
2110777010777012
2111077707770112
2111107777701112
2111110777011112
2111107777701112
2111077707770112
2110777010777012
2111070111070112
2111101111101112
2111111111111112
2222222222222222` ],
  [ empty,     bitmap`
2222222222222222
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2222222222222222` ]
);

let board;
let turn;

function setUp(){
setMap(map`
aaa
aaa
aaa`);
    addSprite(1, 1, player);
    
    
    //board state || 0 for empty, 1 for not
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    
    
    //Turn variable - false for red, true for blue
    turn = false

}

setUp();

//On Victory
function onVic(){
    setMap(map`
......
......
......
......`)
    playTune(win);
    if(turn){
      addText("Blue Wins!", { 
        x: 6,
        y: 6,
        color: color`5`
      })
    }
    else{
      addText("Red Wins!", { 
        x: 6,
        y: 6,
        color: color`3`
      })
    }
    addText("Press L to restart!", { 
      x: 1,
      y: 8,
      color: color`L`
    })

    onInput("l", () => {
        clearText();
        setUp();
    });
}

const allEqual = arr => arr.every( v => v === arr[0] )

//Check if win
function checkVic(){
    for( let i = 0; i < 3; i++ ){
        // console.log(board[i])
        if(board[i][0] != 0 && allEqual( board[i] )){
            onVic();
            break;
        }
    }
    for( let i = 0; i < 3; i++ ){
        if(board[0][i] == 1 && board[0][i] == board[1][i] && board[1][i] == board[2][i]){
            onVic();
            break;
        }
    }
    let diagPos = board[0][0] == 1 && board[0][0] == board[1][1] && board[1][1] == board[2][2] 
    let diagNeg = board[0][2] == 1 && board[0][2] == board[1][1] && board[1][1] == board[2][0]
    if(diagPos || diagNeg){
        onVic();
    } 
}

//Movement
onInput("s", () => {
  try{
      getFirst(player).y += 1
  }
  catch(err){}
});

onInput("w", () => {
  try{
  getFirst(player).y -= 1
  }catch(err){}
  });

onInput("a", () => {
  try{
  getFirst(player).x -= 1
  }catch(err){}
});

onInput("d", () => {
  try{
  getFirst(player).x += 1
  }catch(err){}
});


//onClick
onInput("j", () => {
  try{
    click(getFirst(player).x, getFirst(player).y);
  }catch(err){}
  });

function click(x, y){
  if(!turn && board[y][x] == 0){
    addSprite(x, y, crossred);
    turn = !turn;
    board[y][x] = 1;
    playTune(clickRed);
    // console.log(turn, x, y);
  } 
  else if(turn && board[y][x] == 0) {
    addSprite(x, y, crossblue);
    turn = !turn;
    board[y][x] = 1;
    // console.log(turn, x, y);
    playTune(clickBlue);
  }
  checkVic();
}


