/*
@title: 2048 Game
@author: sahitid

Controls:
Use the a, w, d, and s keys to move left, up, right, and down!
Instructions:
2048 is a game where you combine the sums of numbered tiles in order to gain a higher numbered tile.
Try your best to get to 2048 and win the game. Good Luck!

Press k to reset game.
Press l for music.
Press j to end music.
Press i for instructions and credits.
*/
const blank = "-"
const two = "a";
const four = "b";
const eight = "c";
const sixteen = "d";
const thirtyTwo = "e";
const sixtyFour = "f";
const oneTwentyEight = "g";
const twoFiftySix = "h";
const fiveTwelve = "i";
const tenTwentyFour = "j";
const twentyFortyEight = "k";

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
  [ two, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222221111222221
1222211221122221
1222212222122221
1222212222122221
1222222222122221
1222222211222221
1222222112222221
1222221122222221
1222211222222221
1222211111122221
1222222222222221
1222222222222221
1111111111111111`],
  [ four, bitmap`
1111111111111111
1222222222222221
1222222222222221
12222222LL222221
1222222LLL222221
122222LL2L222221
12222LL22L222221
1222LL222L222221
1222LLLLLLLL2221
122222222L222221
122222222L222221
122222222L222221
122222222L222221
1222222222222221
1222222222222221
1111111111111111`],
  [ eight, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666662222666661
1666626666266661
1666626666266661
1666626666266661
1666662222666661
1666626666266661
1666626666266661
1666626666266661
1666626666266661
1666662222666661
1666666666666661
1666666666666661
1111111111111111`],
  [ sixteen, bitmap`
1111111111111111
1999999999999991
1999999999999991
1999229999222991
1992929992999991
1992929992999991
1999929929999991
1999929922229991
1999929929992991
1999929929992991
1999929922992991
1992222992229991
1999999999999991
1999999999999991
1999999999999991
1111111111111111`],
  [ thirtyTwo, bitmap`
1111111111111111
1333333333333331
1333333333333331
1332222333222331
1322333232232231
1323333232333231
1333333233332231
1333322233332331
1333322333322331
1333333233323331
1323333233223331
1323333232233331
1332222332222231
1333333333333331
1333333333333331
1111111111111111`],
  [ sixtyFour, bitmap`
1111111111111111
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCC222CCCC22CC1
1CC22C22CC222CC1
1C22CCCCC22C2CC1
1C2CCCCC22CC2CC1
1C2CCCCC222222C1
1C22222CCCCC2CC1
1C22CC22CCCC2CC1
1C2CCCC2CCCC2CC1
1C22CC22CCCC2CC1
1CC2222CCCCC2CC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1111111111111111`],
  [ oneTwentyEight, bitmap`
1111111111111111
1FFFFFFFFFFFFFF1
1FFFFFFFFFFFFFF1
1FFFFFFFFFFFFFF1
1F2FF222FFF22FF1
1F2F2FFF2F2FF2F1
1F2FFFFF2F2FF2F1
1F2FFFF22F2FF2F1
1F2FFF22FFF22FF1
1F2FF22FFF2FF2F1
1F2F22FFFF2FF2F1
1F2F2FFFFF2FF2F1
1F2F22222FF22FF1
1FFFFFFFFFFFFFF1
1FFFFFFFFFFFFFF1
1111111111111111`],
  [ twoFiftySix, bitmap`
1111111111111111
1777777777777771
1777777777777771
1772277722772771
1722727277727271
1727727277727771
1777727227727771
1777277722722271
1772777772727271
1727777772727271
1727777772727271
1722227227772771
1777777777777771
1777777777777771
1777777777777771
1111111111111111`],
  [ fiveTwelve, bitmap`
1111111111111111
1555555555555551
1555555555555551
1522225225522551
1525555525255251
1525555525555251
1525555525555251
1552255525555251
1555525525552551
1555525525552551
1555525525525551
1555225525255551
1522255225222251
1555555555555551
1555555555555551
1111111111111111`],
  [ tenTwentyFour, bitmap`
1111111111111111
1HHHHHHHHHHHHHH1
1HH22HHHH222HHH1
1HHH2HHH2HHH2HH1
1HHH2HHH2HHH2HH1
1HHH2HHH2HHH2HH1
1HH222HHH222HHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHH22HHH222HHH1
1HH2HH2HH2HH2HH1
1HHHH2HHHH22HHH1
1HHH2HHHH2HH2HH1
1HH2222HHH222HH1
1HHHHHHHHHHHHHH1
1111111111111111`],
  [ twentyFortyEight, bitmap`
1111111111111111
1888888888888881
1888288888228881
1882828882882881
1888828882882881
1888288882882881
1882888882882881
1882228888228881
1888888888888881
1888822882222881
1888282882882881
1882882888228881
1882222282882881
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
  playback.end();
});

//Instructions
onInput("i", () => {
  clearText();
  prepBoard();
  
  setMap(levels[level]);
  addText(`2048 Game`, {y:1, color: [245, 109, 187, 255 ] });
  addText(`To Move:`, {y:3, color: [19, 21, 224, 255] });
  addText(`W, A, S, D`, {y:4, color: [245, 109, 187, 255 ] });
  addText(`Other Controls`, {y:6, color: [19, 21, 224, 255] });
  addText(`I for help`, {y:8, color: [0, 0, 0, 255 ] });
  addText(`K to reset level`, {y:9, color: [0, 0, 0, 255] });
  addText(`L to start music`, {y:10, color: [0, 0, 0, 255] });
  addText(`J to end music`, {y:11, color: [0, 0, 0, 255 ] });
  addText(`Credits:`, {y:13, color: [19, 21, 224, 255 ] });
  addText(`by @sahitid`, {y:14, color: [245, 109, 187, 255 ] });
  
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
    addText("Game over!", { y: 4, color: [0, 0, 0] });
    addText("K to restart", { y: 8, color: [0, 0, 0] });
    return;
  }

  if (getAll(twentyFortyEight).length >= 1) {
    isGameOver = true;
    addText("You win!", { y: 4, color: [0, 0, 0] });
    addText("K to restart", { y: 8, color: [0, 0, 0] });
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