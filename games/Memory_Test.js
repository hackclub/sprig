/*
@title: Memory_Test
@author: Albert_M
@tags: ['memory']
@addedOn: 2023-03-03
A simple memory test. 
Use WASD to move and L to click the tiles that light up. 
(Code for timer inspired by "Flurffy" by Lucas )
*/

const selector = "p";
const block = "b";
const activated = "a";

var selectedTiles = []
var time = 0
//Create timer, activated tiles dissapear after 5 seconds
var tempodescendo = setInterval(function() {
    time++;
	addText("" + time, {
		y: 1,
		color: color`3`
	});
	if (time == 5) {
	reDrawBoard();
}}, 1000);

setLegend(
  [ selector, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],
  [ block, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`],
  [ activated, bitmap`
0000000000000000
0033333333333300
0303333333333030
0330333333330330
0333033333303330
0333303333033330
0333330330333330
0333333003333330
0333333003333330
0333330330333330
0333303333033330
0333033333303330
0330333333330330
0303333333333030
0033333333333300
0000000000000000`]
);


let level = 0;
let selectX = 0;
let selectY = 1;
const levels = [
  map`
........
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbaaaaabaaaabaaaaabaaaaabb
bbabbbbbabbabababababbbbbb
bbabbbbbabbabababababbbbbb
bbabaaabaaaababababaaaaabb
bbabbbababbababbbababbbbbb
bbabbbababbababbbababbbbbb
bbaaaaababbababbbabaaaaabb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbaaaaababbabaaaaabaaaaabb
bbabbbababbababbbbbabbbabb
bbabbbababbababbbbbabbbabb
bbabbbababbabaaaaabaaaaabb
bbabbbababbababbbbbaabbbbb
bbabbbababbababbbbbababbbb
bbabbbababbababbbbbabbabbb
bbaaaaabaaaabaaaaababbbabb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbb.bbb.b.....b.bbb.bbbbbb
bbb.bbb.b.bbb.b.bbb.bbbbbb
bbb.bbb.b.bbb.b.bbb.bbbbbb
bbb.bbb.b.bbb.b.bbb.bbbbbb
bbb.....b.bbb.b.bbb.bbbbbb
bbbbb.bbb.bbb.b.bbb.bbbbbb
bbbbb.bbb.bbb.b.bbb.bbbbbb
bbbbb.bbb.bbb.b.bbb.bbbbbb
bbbbb.bbb.bbb.b.bbb.bbbbbb
bbbbb.bbb.....b.....bbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbb.bb.bb.b.....b...b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.bb.bb.bbb.bbb.b.b.b
bbbbbb.......b.....b.b...b
bbbbbbbbbbbbbbbbbbbbbbbbbb`,
];

//Create empty array for tiles to be activated
setMap(levels[level]);
let board = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
];

//Choose 10 random tiles to activate
for (let i = 0; i < 7; i++) {
  let randX = Math.floor(Math.random() * 8);
  let randY = Math.floor(Math.random() * 8 +1 );
  if (board[randY][randX] == 0) {
    board[randY][randX] = -1
 } else {
    // If the space is already taken, iterate again
    i--;
  };
};


drawBoard();
//Add in selector to board
addSprite(selectX, selectY, selector);


//Draw board with activated tiles
function drawBoard() {
  for (let x = 0; x < 8; x++) {
    for (let y = 1; y < 9; y++) {
      clearTile(x,y);
      if (board[y][x] == 0) {
        addSprite(x, y, block);
      }if (board[y][x] == -1) {
        addSprite(x, y, activated);
      }
    }
  }
};

//Redraw board after every move/action
function reDrawBoard() {
  for (let x = 0; x < 8; x++) {
    for (let y = 1; y < 9; y++) {
      if(board[y][x] != -2){
        clearTile(x,y);
        addSprite(x, y, block);}
      if(board[y][x] == -2){
        clearTile(x,y);
        addSprite(x,y,activated);
      }if((x== selectX) && (y==selectY)){
        addSprite(x,y,selector);
      }  
      }
    }
 
};   

//End game on loss
function loseGame(){
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 9; y++) {
      if(board[y][x] != -2 ||board[y][x] != -1){
        clearTile(x,y);
        addSprite(x, y, block);}
      if(board[y][x] == -2 ||board[y][x] == -1) {
        clearTile(x,y);
        addSprite(x,y,activated);
      }  
      }
    }
  level = 1
  setMap(levels[level]);
  let seconds = time
  clearText();
  addText("" + time, { y: 1, color: color`3` });
  clearInterval(tempodescendo);
 };   

//End game on win
function winGame(){
  for (let x = 0; x < 8; x++) {
    for (let y = 1; y < 9; y++) {
      if(board[y][x] ==-1){
        return }}}
  for (let x = 0; x < 5; x++) {
    for (let y = 1; y < 6; y++) {  
       clearTile(x,y);}}
  setMap(levels[2]);
  let seconds = time
  clearText();
  addText("" + time, { y: 1, color: color`3` });
  clearInterval(tempodescendo);

};
  

setPushables({
  [ selector ]: [],
});


onInput("w", () => {
  if (level == 0){
    selectY--
    reDrawBoard();
    if(selectY == 0){
      selectY = 8
      reDrawBoard()};
  }});
onInput("a", () => {
  if (level == 0){
    selectX--
    reDrawBoard();
      if(selectX == -1){
        selectX = 7
        reDrawBoard()};}});
onInput("s", () => {
  if (level == 0){
    selectY++
    reDrawBoard();
    if(selectY == 9){
      selectY = 1
      reDrawBoard()};}});
onInput("d", () => {
  if (level == 0){
    selectX++
    reDrawBoard();
    if(selectX == 8){
      selectX = 0
      reDrawBoard()};}});
onInput("l", () => {
    if (board[selectY][selectX] == -1){
      board[selectY][selectX] = -2
      reDrawBoard();
      winGame();
     }
    if(board[selectY][selectX] == 0){
      loseGame();}
    });
afterInput(() => {
  
});