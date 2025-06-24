/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Defend Your Bones!
@author: Yosef Unell
@tags: [#action]
@addedOn: 2024-00-00
*/

const player = "p"
const cat = "c"
const ginger = "g"
const shorthair = "s"
const mainecoon = "m"
const wall = "w"
const bone = "b"
const background = "B"
const siamese = "S"
const toyger = "t"



setLegend(
  [ player, bitmap`
................
................
................
................
................
.....00.00......
.....00000......
.....0C2C0......
......020.......
......000.......
................
................
................
................
................
................` ],
   [cat, bitmap`
................
................
................
................
................
................
......2.0.......
......202.......
......D0D.......
......280.......
................
................
................
................
................
................`],
  [ginger, bitmap`
................
................
................
................
................
................
......C.9.......
......CC9.......
......494.......
......C89.......
................
................
................
................
................
................`],
  [shorthair, bitmap`
................
................
................
................
.....1.L........
.....11L........
.....DLD........
.....18L........
................
................
................
................
................
................
................
................`],
  [mainecoon, bitmap`
................
................
................
................
................
................
......0.0.......
......000.......
......404.......
......080.......
................
................
................
................
................
................`],
  [wall, bitmap`................
................
................
2222222222222222
C2CCCC2CCCC2CCCC
C2CCCC2CCCC2CCCC
2222222222222222
CCC2CCCC2CCCC2CC
CCC2CCCC2CCCC2CC
2222222222222222
CC2CCCC2CCCC2CCC
CC2CCCC2CCCC2CCC
2222222222222222
................
................
................`],
  [bone, bitmap`
................
................
................
................
................
................
.....2...2......
......222.......
.....2...2......
................
................
................
................
................
................
................`],
  [background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDD4D
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD4DDDDD4DDDDD
DDDDDDD4DDD4DDDD
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDDDDDD4DDDD
DDDDD4DDDDDDDDDD
DDDDDDDDD4DDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DDDDDDDDDDDDDDDD`],
  [siamese, bitmap`
................
................
................
................
.....0.0........
.....222........
.....707........
.....000........
................
................
................
................
................
................
................
................`],
  [toyger, bitmap`
................
................
................
................
................
.....9.9........
.....000........
.....494........
.....080........
................
................
................
................
................
................
................`]
 
)
setBackground(background)
setSolids([player, wall])

let level = 0
const levels = [
 map`
.....
.....
.....
.....
.....`,
  map`
www.wwww
w......w
w...b..w
w..bbb..
..pbb..w
w...b..w
w......w
wwww.www`,
  map`
wwww
wBBw
wBBw
wwww`
  
]

setMap(levels[level])

addText("Fight the cats", {x:3, y:2, color: color`.`})
addText("Save your bones", {x:3, y:3, color: color`.`})
addText("w, a, s, d", {x: 3, y: 4, color: color`0`})
addText("to move", {x: 3, y: 5, color: color`0`})
addText("k to start", {x:3, y: 6, color: color`0`})
addText("j to attack", {x:3, y:7, color: color`0`})
  
setPushables({
  [ player ]: []
})
onInput("w", () => {
  getFirst(player).y += -1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x += -1
})
onInput("d", () => {
  getFirst(player).x += 1
})




onInput("k", () => {
  clearText();
  if(level===0){
    level+=1
  setMap(levels[level])
  let timer = 0;
let timerInterval;

const updateTimer = () => {
  timer++;
  clearText();
  addText(`Time: ${timer}s`, { x: 4, y: 4, color: color`0` });

  if (timer === 2) {
    addSprite(3, 0, cat)}
  if(timer === 3) {
    getFirst(cat).y += 1}
  if(timer === 4) {
    getFirst(cat).y += 1}
  if(timer === 5) {
    getFirst(cat).x += 1}
  if(timer === 6) {
    getFirst(cat).y += 1}

if(timer === 7) {
    addSprite(4, 7, ginger)}
if(timer === 8) {
    getFirst(ginger).y += -1}
if(timer === 9) {
    getFirst(ginger).y += -1}
if(timer === 10) {
    getFirst(ginger).y += -1}

  if(timer === 12) {
    addSprite(0, 4, cat)}
  if(timer === 13){
    getFirst(cat).x += 1}
if(timer === 14){
  getFirst(cat).x += 1}
  if(timer === 15){
    getFirst(cat).x +=1}

  if(timer === 16){
    addSprite(7, 3, mainecoon)}
  if(timer === 17){
    getFirst(mainecoon).x +=-1}
  if(timer === 18){
    getFirst(mainecoon).x += -1}
  if(timer === 19){
    getFirst(mainecoon).x += -1}
  if(timer === 20){
    getFirst(mainecoon).x += -1}




  


  
  if(timer === 22) {
    addSprite(3, 0, shorthair)}
  if(timer === 23){
    getFirst(shorthair).y += 1}
  if(timer === 25){
    getFirst(shorthair).y += 1}
  if(timer === 26){
    getFirst(shorthair).y += 1}

  if(timer === 27) {
 
    addSprite(4, 7, siamese)}
if(timer === 28) {
    getFirst(siamese).y += -1}
if(timer === 29) {
    getFirst(siamese).y += -1}
if(timer === 30) {
    getFirst(siamese).y += -1}

  if(timer === 31){
    addSprite(7, 3, toyger)}
  if(timer === 32){
    getFirst(toyger).x +=-1}
  if(timer === 33){
    getFirst(toyger).x += -1}
  if(timer === 34){
    getFirst(toyger).x += -1}
  if(timer === 36){
    getFirst(toyger).x += -1}

if (timer === 37) {
    addSprite(3, 0, ginger)}
  if(timer === 38) {
    getFirst(ginger).y += 1}
  if(timer ===39) {
    getFirst(ginger).y += 1}
  if(timer === 40) {
    getFirst(ginger).x += 1}
  if(timer === 41) {
    getFirst(ginger).y += 1}

 if(timer === 42) {
    addSprite(4, 7, mainecoon)}
if(timer === 43) {
    getFirst(mainecoon).y += -1}
if(timer === 44) {
    getFirst(mainecoon).y += -1}
if(timer === 45) {
    getFirst(mainecoon).y += -1}

 if(timer === 46){
    addSprite(7, 3, toyger)}
  if(timer === 47){
    getFirst(toyger).x +=-1}
  if(timer === 48){
    getFirst(toyger).x += -1}
  if(timer === 49){
    getFirst(toyger).x += -1}
  if(timer === 50){
    getFirst(toyger).x += -1}

  if(timer === 51){
    addSprite(7, 3, siamese)}
  if(timer === 52){
    getFirst(siamese).x +=-1}
  if(timer === 53){
    getFirst(siamese).x += -1}
  if(timer === 54){
    getFirst(siamese).x += -1}
  if(timer === 55){
    getFirst(siamese).x += -1}

if(timer === 57) {
    addSprite(3, 0, cat)}
  if(timer === 58){
    getFirst(cat).y += 1}
  if(timer === 59){
    getFirst(cat).y += 1}
  if(timer === 60){
    getFirst(cat).y += 1
  


    
  
  }
  if(timer === 61){
  const bonesLeft = tilesWith(bone).length;
  stopTimer();
   clearText();
   level += 1
  setMap(levels[level])
  
  if (bonesLeft === 0) {
         
   
   addText("You Lose!", { x: 6, y: 6, color: color`0`});
     
} 
    if (bonesLeft > 0) {
  

    addText("You Win!", { x: 6, y: 6, color: color`0`});
     }
      
}

};

// Start the timer
const startTimer = () => {
  timer = 0;
  timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000ms)
};

// Stop the timer
  const stopTimer = () => {
  clearInterval(timerInterval);
};

// Usage example:
// Start the timer when a certain condition is met
startTimer();

}})


onInput("j", () => {
  const playerTile = getFirst(player)
  const catOnPlayerTile = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === cat)
  const gingerOnPlayerTile = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === ginger)
  const mainecoonOnPlayerTile = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === mainecoon)
  const shorthairOnPlayerTile = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === shorthair)
  const siameseOnPlayerTile = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === siamese)
   const toygerOnPlayerTile = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === toyger)                                                                    
  if(catOnPlayerTile) {
catOnPlayerTile.remove()
  }
  if(gingerOnPlayerTile) {
  gingerOnPlayerTile.remove()}
  if(mainecoonOnPlayerTile) {
  mainecoonOnPlayerTile.remove()}
  if(shorthairOnPlayerTile) {
  shorthairOnPlayerTile.remove()}
  if(siameseOnPlayerTile) {
  siameseOnPlayerTile.remove()}
  if(toygerOnPlayerTile) {
  toygerOnPlayerTile.remove()}
})




afterInput(() => {
 //if(boneOnCatTile) {
  // boneOnCatTile.remove()}
  
  
 // const levelText = `Level: ${level}`;
    
    // Print the level value on the screen
  //  addText(levelText, { x: 4, y: 5, color: color`0` });

const catTile = getFirst(cat)
    if(catTile){
const boneOnCatTile = getTile(catTile.x, catTile.y).find(sprite => sprite.type === bone);
  
    if (boneOnCatTile) {
      boneOnCatTile.remove();}}

  const gingerTile = getFirst(ginger)
    if(gingerTile){
const boneOnGingerTile = getTile(gingerTile.x, gingerTile.y).find(sprite => sprite.type === bone);
  
    if (boneOnGingerTile) {
      boneOnGingerTile.remove();}}

  const mainecoonTile = getFirst(mainecoon)
    if(mainecoonTile){
const boneOnMainecoonTile = getTile(mainecoonTile.x, mainecoonTile.y).find(sprite => sprite.type === bone);
  
    if (boneOnMainecoonTile) {
      boneOnMainecoonTile.remove();}}

  
const shorthairTile = getFirst(shorthair)
    if(shorthairTile){
const boneOnShorthairTile = getTile(shorthairTile.x, shorthairTile.y).find(sprite => sprite.type === bone);
  
    if (boneOnShorthairTile) {
      boneOnShorthairTile.remove();}}

  const siameseTile = getFirst(siamese)
    if(siameseTile){
const boneOnSiameseTile = getTile(siameseTile.x, siameseTile.y).find(sprite => sprite.type === bone);
  
    if (boneOnSiameseTile) {
      boneOnSiameseTile.remove();}}
  const toygerTile = getFirst(toyger)
    if(toygerTile){
const boneOnToygerTile = getTile(toygerTile.x, toygerTile.y).find(sprite => sprite.type === bone);
  
    if (boneOnToygerTile) {
      boneOnToygerTile.remove();}}

  
   
  
   

})



