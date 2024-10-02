/*
@title: Falldown mini
@author: Riptide
@tags: []
@addedOn: 2024-08-04
*/

const player = "p"
const walls = "w"
const wallsL = "L"
const wallsR = "R"
const invisWall = "i"

setLegend(
  [ player, bitmap`
....33333333....
...3333333333...
..330003300033..
.33302133L20333.
3333010330L03333
3333333333333333
3333333HH3333333
3333333HH3333333
3333833333383333
3333888888883333
3333388228833333
3333338888333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....` ],
  [ walls, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
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
................` ],
  [ wallsL, bitmap`
LLLLLLLLLLLLLLL.
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL.
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
................` ], 
  [ wallsR, bitmap`
.LLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLLL
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
................` ], 
  [ invisWall, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ]
)

setSolids([ player, walls, wallsL, wallsR, invisWall ])

let go = false;
let gameIsOn = false;
let score = 0;
const levels = [
  map`
...........
.....p.....
wwwwL.Rwwww
...........
wwwL.Rwwwww
...........
wwwwwwwwwL.
...........
.Rwwwwwwwww
iiiiiiiiiii
iiiiiiiiiii`,
  map`
...........
...........
...........
...........
...........
....iii....
....ipi....
....iii....
...........
...........`,
]

// setMap(levels[level])
setLevel(1, "Press J to start", "/reset!")

setPushables({
  [ walls ]: [ player ],
  [ wallsL ]: [ player ],
  [ wallsR ]: [ player ]
})

function wallUpdate(){
  if (gameIsOn){
    moveWallsUp();
    // killRedundantWalls()
    spawnMoreWalls();
  }
}

function setLevel(l, text1="", text2=""){
  clearText();
  setMap(levels[l])
  if (text1!=""){
    addText(text1, {
      x: 1,
      y: 1,
      color: color`3`
    })
  }
  if (text2!=""){
    addText(text2, {
      x: 1,
      y: 4,
      color: color`7`
    })
  }
}

function checkIfWallNeeded(){ // 8
  for (let i = 0; i < 11; i++){
    if (getTile(i, 8).length > 1){
      let type = getTile(i, 8)[0]['_type']
      let type2 = getTile(i, 8)[1]['_type']
      for (let letter of ["w", "L", "R"]){
        if (type == letter || type1 == letter)
          return false;
      }
    }
    if (getTile(i, 8).length > 0){
      let type = getTile(i, 8)[0]['_type']
      for (let letter of ["w", "L", "R"]){
        if (type == letter)
          return false;
      }
    }
  }
  return true;
}

function spawnMoreWalls(){
  if (checkIfWallNeeded()){
      score += 1;
    let x = randint(10); // 0-10
    if (x == 0){
      addSprite(1, 9, wallsR);
      for (let i = 2; i < 11; i++){
        addSprite(i, 9, walls);
      }
    } // Speacial case!
    else if (x == 10){
      for (let i = 0; i < 9; i++){
        addSprite(i, 9, walls);
      }
      addSprite(9, 9, wallsL);
    } // Speacial case!
    else {
      for (let i = 0; i < x-1; i++){
        addSprite(i, 9, walls);
      }
      addSprite(x-1, 9, wallsL);
      addSprite(x+1, 9, wallsR);
      for (let i = x+2; i < 11; i++){
        addSprite(i, 9, walls);
      }
    }
  }
}

function moveWallsUp(){
  for (let wall of getAll(walls)){
    wall.y -= 1;
    if (wall.y == 0){wall.remove();}
  }
  for (let wall of getAll(wallsL)){
    wall.y -= 1;
    if (wall.y == 0){wall.remove();}
  }
  for (let wall of getAll(wallsR)){
    wall.y -= 1;
    if (wall.y == 0){wall.remove();}
  }
}

function playerUpdate(){
  let pl = getFirst(player);
  fixGlitch();
  gravity();
  checkLoose();
}

function checkLoose(){
  if (gameIsOn){
    if (getFirst(player).y == 0){
      setLevel(1, "Game Over!", "Score: " + score.toString());
      gameIsOn = false;
      score = 0;
    }
  }
}

function checkForGlitch(){
  if (!gameIsOn){
    return false;
  }
  let pl = getFirst(player)
  let a = !checkBelowPlayer()
  let b = false;
  let c = false;
  if (getTile(pl.x-1, pl.y).length > 0){
    b = true;
  }
  if (getTile(pl.x+1, pl.y).length > 0){
    c = true;
  }
  if (a && b && c){
    return true;
  }
  return false;
  // if (!gameIsOn){
  //   return false;
  // }
  // let found_wall = 0;
  // for (let i = 0; i < 11; i++){
  //   if (getTile(i, pl).length > 0){
  //     found_wall += 1;
  //   }
  // }
  // if (found_wall == 1){
  //   return false;
  // }
  // return true;
}

function fixGlitch(){
  let pl = getFirst(player);
  if (checkForGlitch()){
    console.log("GLITCH DETECTED");
    // if (checkBelowPlayer)
    // {
    console.log("FIXING GLITCH");
    // FIX THE GLITCH()
    // clearTile(pl.x, pl.y-1);
    // addSprite(pl.x, pl.y, walls);
    pl.y -= 1;
    pl.x += 1;
  }
}

function checkBelowPlayer(){
  let pl = getFirst(player)
  if (getTile(pl.x, pl.y+1).length > 0){
    return false;
  }
  return true;
}

function gravity(){
  if (checkBelowPlayer()){
    getFirst(player).y += 1;
  }
}

function randint(max) {
  return Math.floor(Math.random() * max);
}

function gameUpdate(){
  if (go){
    wallUpdate();
    // getInput();
    go = false;
  }else{go=true;}
  playerUpdate();
}

function getInput(){
  onInput("a", () => {
    getFirst(player).x -= 1;
  })
  onInput("d", () => {
    getFirst(player).x += 1;
  })
  onInput("j", () => {
    setLevel(0);
    gameIsOn = true;
  })
}

// let wallUpdateInt = setInterval(wallUpdate, 2000);
// let playerUpdateInt = setInterval(playerUpdate, 2000);
// let wallUpdateInt = setInterval(wallUpdate, 750);
// let playerUpdateInt = setInterval(playerUpdate, 500);
let gameUpdateInt = setInterval(gameUpdate, 375);
onInput("a", () => {
  getFirst(player).x -= 1;
})
onInput("d", () => {
  getFirst(player).x += 1;
})
onInput("j", () => {
  setLevel(0);
  gameIsOn = true;
})
