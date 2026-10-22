/*
@title: catch_banana
@description: Catch the bananas to get higher score.
@author: Aayan Aqdas
@tags: ["Catch"]
@addedOn: 2025-08-16
*/
const player = "p";
const banana = "b";
const ground = "g";
const top = "t";

let isGameStarted = false;
let isGameOver = false;
let score = 0;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
......CCCCC.....
.....CCCCCCC....
....CCCCCCCCC...
...CC111C111CC..
.11C111111111C11
.11C102111201C11
..1C100111001C1.
...C188111881C..
....C1111111C...
.....CC111CC....
.......CCC......
......CCCCC...C.
......CCCCC..CC.
.....CCCCCCCCC..
.....CC1C1CC....`],
  [ banana, bitmap`
................
.......000......
.....000C0......
....060000......
...06660........
...06660........
..066660........
..0666660.......
..066666600.....
..06666666600...
...066666666600.
....06666666660.
.....006666600..
.......000000...
................
................`],
  [ ground, bitmap`
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
DDDDDDDDDDDDDDDD`],
  [ top, bitmap`
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
DDD.DDDD.DDDD.DD
DDD.DDDD.DDDD.DD
DD...DD...DD...D
DD...DD...DD...D`],
);

setMap(map`
tttttttttt
..........
..........
..........
..........
..........
..........
..........
...p......
gggggggggg`)

addText("A and D to move", {x: 2, y:7, color: `5`})
addText("Press J to start", {x: 2, y:9, color: `5`})

function startGame(){
  clearText("")
  addText(`Score: ${score}`, {x: 3, y: 2, color: `5`})
  isGameOver = false;
  isGameStarted = true;
}

function drawBanana() {
  let x = Math.floor(Math.random() * 10);
  let y = 0; 
  addSprite(x, y, banana);
}

function moveBanana() {
  let bananas = getAll(banana);

  for (let i = 0; i < bananas.length; i++) {
    bananas[i].y += 1;
  }
}

function removeBananas() {
  let bananas = getAll(banana);

  for (let i = bananas.length - 1; i >= 0; i--) {
    if (bananas[i].y >= height() - 1) {
      bananas[i].remove();
    }
  }
}

function checkHit() {
  let bananas = getAll(banana);
  for (let i = 0; i < bananas.length; i++) {
    if (!isGameOver && bananas[i].x === getFirst(player).x && bananas[i].y === getFirst(player).y) {
      console.log("hit");
      bananas[i].remove();
      score++
      addText(`Score: ${score}`, {x: 3, y: 2, color: `5`})
    }
    else if(bananas[i].y === 9){
      isGameStarted = false;
      isGameOver = true;
      clearText("")
      addText("Game Over!", {x: 5, y: 7, color: `5`})
      addText(`Score: ${score}`, {x: 5, y: 9, color: `5`})
      addText("Press J to reset", {x: 2, y:11, color: `5`})
    }
  }


}

setInterval(() => {
  if(isGameStarted && !isGameOver){
    drawBanana()
    moveBanana()
    checkHit()
    removeBananas()
  }
}, 1000)

onInput("j", () => {
  if(isGameOver){
    isGameStarted = false;
    isGameOver = false;
    score = 0;
    clearText("")
    addText("A and D to move", {x: 2, y:7, color: `5`})
    addText("Press J to start", {x: 2, y:9, color: `5`})
    setMap(map`
tttttttttt
..........
..........
..........
..........
..........
..........
..........
...p......
gggggggggg`)
  }
  else if(!isGameOver && !isGameStarted){
    startGame()
  }
})


onInput("a", () => {
  getFirst(player).x -= 1;
})

onInput("d", () => {
  getFirst(player).x += 1;
})

afterInput(() => {
  if(!isGameOver){
    checkHit()
  }
})
