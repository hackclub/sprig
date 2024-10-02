/*
@title: 3072: A 2048 Spin-Off
@author: sahitid
@tags: ['strategy']
@addedOn: 2022-10-14

Why play 2048 when it's the same basic game you've been playing for years?
Why don't you move on to a better version? A more intuitive version?
I present to you... 3072!

Controls:
Use the a, w, d, and s keys to move left, up, right, and down!
Instructions:
2048 is a game where you combine the sums of numbered tiles in order to gain a higher numbered tile.
This is a spin-off of that game. Try your best to get to 3072 and win the game. Good Luck!

Press k to reset game.
Press l for music.
Press j to end music.
Press i for instructions and credits.
*/
const blank = "-"
const three = "a";
const six = "b";
const twelve = "c";
const twentyFour = "d";
const fortyEight = "e";
const ninetySix = "f";
const oneNinetyTwo = "g";
const threeEightyFour = "h";
const sevenSixtyEight = "i";
const fifteenThirtySix = "j";
const thirtySeventyTwo = "k";

const tileOrder = ["a","b","c","d","e","f","g","h","i","j","k"];

setLegend(
  [ blank, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
  [ three, bitmap`
1111111111111111
1222222222222221
1222211111222221
1222112221122221
1222122222122221
1222122222122221
1222222222122221
1222222221122221
1222221111222221
1222222221122221
1222222222122221
1222122222122221
1222112221122221
1222211111222221
1222222222222221
1111111111111111`],
  [ six, bitmap`
1111111111111111
1222222222222221
122222LLLL222221
12222LL22LL22221
12222L2222L22221
1222LL2222222221
1222L22222222221
1222L2LLLL222221
1222LLL22LL22221
1222LL2222LL2221
1222L222222L2221
1222LL2222LL2221
12222LL22LL22221
122222LLLL222221
1222222222222221
1111111111111111`],
  [ twelve, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666266622226661
1666266266622661
1666266266662661
1666266666622661
1666266666226661
1666266662266661
1666266622666661
1666266226666661
1666266266666661
1666266222222661
1666666666666661
1666666666666661
1111111111111111`],
  [ twentyFour, bitmap`
1111111111111111
1999999999999991
1999999999999991
1992222999992291
1922999299922291
1929999299929291
1999999299229291
1999992292299291
1999922992222221
1999929999999291
1999299999999291
1992299999999291
1922999999999291
1922222299999291
1999999999999991
1111111111111111`],
  [ fortyEight, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333322333222331
1333222332333231
1332232332333231
1322332332333231
1323332332333231
1322222233222331
1333332332333231
1333332332333231
1333332332333231
1333332332333231
1333332333222331
1333333333333331
1111111111111111`],
  [ ninetySix, bitmap`
1111111111111111
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CC222CCCC222CC1
1C2CCC2CC2CCCCC1
1C2CCC2CC2CCCCC1
1C2CCC2CC2CCCCC1
1C2CCC2CC2CCCCC1
1CC2222CCC222CC1
1CCCCC2CC2CCC2C1
1CCCCC2CC2CCC2C1
1CCCCC2CC2CCC2C1
1CCCCC2CC2CCC2C1
1CCCCC2CCC222CC1
1CCCCCCCCCCCCCC1
1111111111111111`],
  [ oneNinetyTwo, bitmap`
1111111111111111
1FFFFFFFFFFFFFF1
1F2FF22FFF222FF1
1F2F2FF2F22FF2F1
1F2F2FF2F2FFF2F1
1F2F2FF2F2FFF2F1
1F2F2FF2FFFFF2F1
1F2FF222FFFF22F1
1F2FFFF2FFF22FF1
1F2FFFF2FF22FFF1
1F2FFFF2F22FFFF1
1F2FFFF2F2FFFFF1
1F2FFFF2F2FFFFF1
1F2FFFF2F22222F1
1FFFFFFFFFFFFFF1
1111111111111111`],
  [ threeEightyFour, bitmap`
1111111111111111
1777777777777771
1227772277777271
1772727727772271
1772727727727271
1772727727727271
1772727727277271
1772772277222221
1227727727777271
1772727727777271
1772727727777271
1772727727777271
1772727727777271
1227772277777271
1777777777777771
1111111111111111`],
  [ sevenSixtyEight, bitmap`
1111111111111111
1555555555555551
1555555555555551
1522555222552251
1255252552525521
1255252555525521
1555252555525521
1555252555525521
1555252222552251
1555252552525521
1555252552525521
1555252552525521
1555252552525521
1555255225552251
1555555555555551
1111111111111111`],
  [ fifteenThirtySix, bitmap`
1111111111111111
1HHHHHHHHHHHHHH1
1HH22HHHH2222HH1
1HHH2HHHH2HHHHH1
1HHH2HHHH222HHH1
1HHH2HHHHHHH2HH1
1HH222HHH222HHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HH222HHHH222HH1
1HHHHH2HH2HHHHH1
1HH2222HH222HHH1
1HHHHH2HH2HH2HH1
1HH222HHHH22HHH1
1HHHHHHHHHHHHHH1
1111111111111111`],
  [ thirtySeventyTwo, bitmap`
1111111111111111
1888888888888881
1882228888228881
1888882882882881
1882228882882881
1888882882882881
1888882882882881
1882228888228881
1888888888888881
1888228888228881
1882882882882881
1888882888822881
1888882888288881
1888882882222881
1888888888888881
1111111111111111`]
);

// Music controls
const melody = tune`
294.11764705882354: a4~294.11764705882354 + g4~294.11764705882354,
294.11764705882354: g4~294.11764705882354 + f4^294.11764705882354,
294.11764705882354: b4~294.11764705882354 + g4~294.11764705882354,
294.11764705882354: c5~294.11764705882354 + g4~294.11764705882354 + a4~294.11764705882354,
294.11764705882354: a4~294.11764705882354,
294.11764705882354: c5~294.11764705882354 + g4^294.11764705882354,
294.11764705882354,
294.11764705882354: d5^294.11764705882354 + a4~294.11764705882354 + b4~294.11764705882354,
294.11764705882354: b4~294.11764705882354,
294.11764705882354: d5~294.11764705882354,
294.11764705882354,
294.11764705882354: b4~294.11764705882354 + f4~294.11764705882354,
294.11764705882354: g4~294.11764705882354 + f4^294.11764705882354,
294.11764705882354: c5~294.11764705882354 + g4~294.11764705882354,
294.11764705882354: a4^294.11764705882354,
294.11764705882354: a4~294.11764705882354,
294.11764705882354,
294.11764705882354: a4~294.11764705882354 + g4~294.11764705882354,
294.11764705882354: f4~294.11764705882354,
294.11764705882354: a4~294.11764705882354 + b4^294.11764705882354,
294.11764705882354: a4~294.11764705882354 + b4~294.11764705882354,
294.11764705882354: e4~294.11764705882354 + g4~294.11764705882354,
294.11764705882354: d5~294.11764705882354,
294.11764705882354: a4~294.11764705882354 + b4~294.11764705882354,
294.11764705882354: f4~294.11764705882354 + a4^294.11764705882354,
294.11764705882354: d5~294.11764705882354,
294.11764705882354: g5~294.11764705882354 + b4~294.11764705882354 + f5^294.11764705882354,
294.11764705882354: d5~294.11764705882354,
294.11764705882354: a4~294.11764705882354,
294.11764705882354: c5~294.11764705882354 + a4^294.11764705882354,
294.11764705882354: e4~294.11764705882354 + a4~294.11764705882354,
294.11764705882354: f4^294.11764705882354`

let playback;

onInput("l", () => {
  playback = playTune(melody, Infinity);
});

onInput("j", () => {
  if (playback) playback.end();
});

//Instructions
onInput("i", () => {
  clearText();
  prepBoard();
  
  setMap(levels[level]);
  addText(`2048 Game`, {y:1, color: color`8` });
  addText(`To Move:`, {y:3, color: color`5` });
  addText(`W, A, S, D`, {y:4, color: color`8` });
  addText(`Other Controls`, {y:6, color: color`5` });
  addText(`I for help`, {y:8, color: color`0` });
  addText(`K to reset level`, {y:9, color: color`0` });
  addText(`L to start music`, {y:10, color: color`0` });
  addText(`J to end music`, {y:11, color: color`0` });
  addText(`Credits:`, {y:13, color: color`5` });
  addText(`by @sahitid`, {y:14, color: color`8` });
  
});

//setSolids([player, wall]);

let level = 0;
const levels = [
  map`
----
----
----
----`,
];

let isGameOver = false;
prepBoard();

//setPushables({ 
//   [player]: [ block, player ] 
//})

let changeBoard = false;
onInput("w", () => {
  if (isGameOver) return;
  
  for (let x=0; x<=3; x++) {  
    let nextFilledY = 0;
    for (let y=1; y<=3; y++) {
      switch (getTile(x,y)[0].type) {
        case blank:
          break;
        case (getTile(x,nextFilledY)[0].type):
          clearTile(x,nextFilledY);
          addSprite(x,nextFilledY,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,blank);
          changeBoard = true;
          break;
        default:
          if (!(nextFilledY===0 && getTile(x,nextFilledY)[0].type===blank))
            nextFilledY++;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,blank);
          clearTile(x,nextFilledY);
          addSprite(x,nextFilledY,currentType);
          if (y !== nextFilledY) changeBoard = true;
          break;
      }
    }
  }
});

onInput("s", () => {
  if (isGameOver) return;
  
  for (let x=0; x<=3; x++) {  
    let nextFilledY = 3;
    for (let y=2; y>=0; y--) {
      switch (getTile(x,y)[0].type) {
        case blank:
          break;
        case (getTile(x,nextFilledY)[0].type):
          clearTile(x,nextFilledY);
          addSprite(x,nextFilledY,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,blank);
          changeBoard = true;
          break;
        default:
          if (!(nextFilledY===3 && getTile(x,nextFilledY)[0].type===blank))
            nextFilledY--;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,blank);
          clearTile(x,nextFilledY);
          addSprite(x,nextFilledY,currentType)
          if (y !== nextFilledY) changeBoard = true;
          break;
      }
    }
  }
});

onInput("d", () => {
  if (isGameOver) return;

  for (let y=0; y<=3; y++) {  
    let nextFilledX = 3;
    for (let x=2; x>=0; x--) {
      switch (getTile(x,y)[0].type) {
        case blank:
          break;
        case (getTile(nextFilledX,y)[0].type):
          clearTile(nextFilledX,y);
          addSprite(nextFilledX,y,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,blank);
          changeBoard = true;
          break;
        default:
          if (!(nextFilledX===3 && getTile(nextFilledX,y)[0].type===blank))
            nextFilledX--;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,blank);
          clearTile(nextFilledX,y);
          addSprite(nextFilledX,y,currentType)
          if (x !== nextFilledX) changeBoard = true;
          break;
      }
    }
  }
});

onInput("a", () => {
  if (isGameOver) return;
  
  for (let y=0; y<=3; y++) {  
    let nextFilledX = 0;
    for (let x=1; x<=3; x++) {
      switch (getTile(x,y)[0].type) {
        case blank:
          break;
        case (getTile(nextFilledX,y)[0].type):
          clearTile(nextFilledX,y);
          addSprite(nextFilledX,y,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,blank);
          changeBoard = true;
          break;
        default:
          if (!(nextFilledX===0 && getTile(nextFilledX,y)[0].type===blank))
            nextFilledX++;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,blank);
          clearTile(nextFilledX,y);
          addSprite(nextFilledX,y,currentType)
          if (x !== nextFilledX) changeBoard = true;
          break;
      }
    }
  }
});

// restarting game
onInput("k", () => {
  isGameOver = true;
  prepBoard();
});


afterInput(() => {
  if (checkGameOver()) {
    isGameOver = true;
    addText("Game over!", { y: 4, color: color`0` });
    addText("K to restart", { y: 8, color: color`0` });
    return;
  }

  if (getAll(thirtySeventyTwo).length >= 1) {
    isGameOver = true;
    addText("You win!", { y: 4, color: color`0` });
    addText("K to restart", { y: 8, color: color`0` });
    return;
  }
  
  if (!isGameOver) {
    if (changeBoard) generateTile();
    changeBoard = false;
  }
});

function prepBoard() {
  isGameOver = false;
  clearText("");
  setMap(levels[level]);
  generateTile();
  generateTile();
}

function generateTile() {
  if (getAll(blank).length===0) return;
  
  let blankTiles = tilesWith(blank);
  let random = Math.floor(Math.random() * (blankTiles.length-1+1));
  clearTile(blankTiles[random][0].x,blankTiles[random][0].y);
  addSprite(blankTiles[random][0].x,blankTiles[random][0].y,"a");
}

function checkGameOver() {
  if (getAll(blank).length>0) return false;
  
  for (let x=0; x<=3; x++) {
    for (let y=1; y<=3; y++) {
      if (getTile(x,y)[0].type == getTile(x,y-1)[0].type) return false;
    }
  }
  
  for (let y=0; y<=3; y++) {
    for (let x=1; x<=3; x++) {
      if (getTile(x,y)[0].type == getTile(x-1,y)[0].type) return false;
    }
  }

  return true;
}
