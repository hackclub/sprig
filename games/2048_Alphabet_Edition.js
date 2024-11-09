/*
@title: 2048 Alphabet Edition
@author: OptimalBlock489
@tags: ['strategy']
@addedOn: 2022-10-19

Credits : linkai101

Why play 2048 when it's the same basic game you've been playing for years?
Why don't you move on to a better version? A more intuitive version?
I present to you... 2048 Alphabet Edition!

Controls:
Use the a, w, d, and s keys to move left, up, right, and down!
Instructions:
2048 is a game where you combine the sums of numbered tiles in order to gain a higher numbered tile.
This is a spin-off of that game. Try your best to get to "L" and win the game. Good Luck!

Press k to reset game.
Press l for music.
Press j to end music.
Press i for instructions and credits.
*/
const blank = "-"
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
const k = "k";
const l = "l";

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
  [ a, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222200000022221
1222202222022221
1222202222022221
1222202222022221
1222200000022221
1222202222022221
1222202222022221
1222202222022221
1222202222022221
1222222222222221
1222222222222221
1111111111111111`],
  [ b, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222200002222221
1222202220222221
1222202220222221
1222202220222221
1222200002222221
1222202220222221
1222202220222221
1222202220222221
1222202220222221
1222200002222221
1222222222222221
1222222222222221
1111111111111111`],
  [ c, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666600000066661
1666066666666661
1666066666666661
1666066666666661
1666066666666661
1666066666666661
1666066666666661
1666066666666661
1666600000066661
1666666666666661
1666666666666661
1666666666666661
1111111111111111`],
  [ d, bitmap`
1111111111111111
1999999999999991
1999999999999991
1999000099999991
1999099009999991
1999099900999991
1999099990999991
1999099990999991
1999099990999991
1999099990999991
1999099900999991
1999099009999991
1999000099999991
1999999999999991
1999999999999991
1111111111111111`],
  [ e, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333300000033331
1333303333333331
1333303333333331
1333303333333331
1333303333333331
1333300003333331
1333303333333331
1333303333333331
1333303333333331
1333303333333331
1333300000033331
1333333333333331
1111111111111111`],
  [ f, bitmap`
1111111111111111
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCC0000000CCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCC00000CCCCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCC0CCCCCCCCCC1
1CCCCCCCCCCCCCC1
1111111111111111`],
  [ g, bitmap`
1111111111111111
1FFFFFFFFFFFFFF1
1FFFFFFFFFFFFFF1
1FFFF00000FFFFF1
1FFF00FFFF0FFFF1
1FFF0FFFFFFFFFF1
1FFF0FFFFFFFFFF1
1FFF0FFFFFFFFFF1
1FFF0FFFFFFFFFF1
1FFF0FFF000FFFF1
1FFF0FFF0F0FFFF1
1FFF00FF0F0FFFF1
1FFFF0000F0FFFF1
1FFFFFFFFFFFFFF1
1FFFFFFFFFFFFFF1
1111111111111111`],
  [ h, bitmap`
1111111111111111
1777777777777771
1777777777777771
1777077777707771
1777077777707771
1777077777707771
1777077777707771
1777077777707771
1777000000007771
1777077777707771
1777077777707771
1777077777707771
1777077777707771
1777077777707771
1777777777777771
1111111111111111`],
  [ i, bitmap`
1111111111111111
1555555555555551
1555555555555551
1555000000005551
1555555005555551
1555555005555551
1555555005555551
1555555005555551
1555555005555551
1555555005555551
1555555005555551
1555555005555551
1555000000005551
1555555555555551
1555555555555551
1111111111111111`],
  [ j, bitmap`
1111111111111111
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHH0000000000H1
1HHHHHHHHHH0HHH1
1HHHHHHHHHH0HHH1
1HHHHHHHHHH0HHH1
1HHHHHHHHHH0HHH1
1HHHHHHHHHH0HHH1
1HHHHHHHHHH0HHH1
1HHH0HHHHHH0HHH1
1HHH000HHH00HHH1
1HHHHH00000HHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1111111111111111`],
  [ k, bitmap`
1111111111111111
1888888888888881
1888888888888881
1888088888088881
1888088880088881
1888088800888881
1888088008888881
1888080088888881
1888000888888881
1888080088888881
1888088008888881
1888088800888881
1888088880088881
1888088888088881
1888888888888881
1111111111111111`],
  [ l, bitmap`
1111111111111111
1444444444444441
1444444444444441
1444044444444441
1444044444444441
1444044444444441
1444044444444441
1444044444444441
1444044444444441
1444044444444441
1444044444444441
1444044444444441
1444000000004441
1444444444444441
1444444444444441
1111111111111111`],
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
  addText(`2048 Alphabet edition`, {y:1, color: color`8` });
  addText(`To Move:`, {y:3, color: color`5` });
  addText(`W, A, S, D`, {y:4, color: color`8` });
  addText(`Other Controls`, {y:6, color: color`5` });
  addText(`I for help`, {y:8, color: color`0` });
  addText(`K to reset level`, {y:9, color: color`0` });
  addText(`L to start music`, {y:10, color: color`0` });
  addText(`J to end music`, {y:11, color: color`0` });
  addText(`Credits:`, {y:13, color: color`5` });
  addText(`by OptimalBlock489`, {y:14, color: color`8` });
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

  if (getAll(k).length >= 1) {
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
