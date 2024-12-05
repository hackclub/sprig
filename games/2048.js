/*
@title: 2048
@author: linkai101
@tags: ["puzzle" , "endless"]
@addedOn: 2022-09-16
*/

const empty = "-"
const two = "a";
const four = "b";
const eight = "c";
const sixteen = "d";
const thirtytwo = "e";
const sixtyfour = "f";
const onetwentyeight = "g";
const twofiftysix = "h";
const fivetwelve = "i";
const tentwentyfour = "j";
const twentyfortyeight = "k";

const tileOrder = ["a","b","c","d","e","f","g","h","i","j","k"];

setLegend(
  [ empty, bitmap`
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
1222222222222221
1222221111222221
1222211211122221
1222212221122221
1222222221122221
1222222211122221
1222222111222221
1222221122222221
1222211111122221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
  [ four, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
12222222LLL22221
1222222LLLL22221
122222LL2LL22221
12222LL22LL22221
12222LLLLLL22221
122222222LL22221
122222222LL22221
122222222LL22221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
  [ eight, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
133333LLLL333331
13333LL33LL33331
13333LL33LL33331
133333LLLL333331
13333LL33LL33331
13333LL33LL33331
13333LL33LL33331
133333LLLL333331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ sixteen, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
1333113311133331
1333113113313331
1333313113333331
1333313111133331
1333313113313331
1333313113313331
1333313111113331
1333111311133331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ thirtytwo, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
1333322332223331
1333222232223331
1333232232323331
1333332233323331
1333322333223331
1333222232233331
1333332232333331
1333222332223331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ sixtyfour, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
1333366636363331
1333666636363331
1333663636363331
1333663336363331
1333666636663331
1333663636663331
1333663633363331
1333666633363331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ onetwentyeight, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
16LL66LLL66LL661
16LL66LLL6LLLL61
166L66L6L6L66L61
166L6666L6L66L61
166L666LL66LL661
166L66LL66L66L61
166L66L666L66L61
16LLL6LLL66LL661
1666666666666661
1666666666666661
1666666666666661
1111111111111111`],
  [ twofiftysix, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1611161116611161
1611161116111161
1616161666116161
1666161666116661
1661161166111161
1611666116116161
1616666616116161
1611161116111161
1666666666666661
1666666666666661
1666666666666661
1111111111111111`],
  [ fivetwelve, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1655556556655561
1655556556655561
1656666656656561
1656666656666561
1655566656665561
1666556656655561
1666556656656661
1655556555655561
1666666666666661
1666666666666661
1666666666666661
1111111111111111`],
  [ tentwentyfour, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1336636633363631
1336333633363631
1636363666363631
1636363666363331
1636363666366631
1636363663366631
1636333633666631
1333636633366631
1666666666666661
1666666666666661
1666666666666661
1111111111111111`],
  [ twentyfortyeight, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1888666686868881
1888666686868881
1868666686868681
1668668688868681
1668686866868681
1688686866866861
1886686866868681
1888668666868881
1666666666666661
1666666666666661
1666666666666661
1111111111111111`]
);

//setSolids([]);

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

// setPushables({
  // [ player ]: [],
// });

let boardChanged = false;
onInput("w", () => {
  if (isGameOver) return;
  
  for (let x=0; x<=3; x++) {  
    let nextYToFill = 0;
    for (let y=1; y<=3; y++) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(x,nextYToFill)[0].type):
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextYToFill===0 && getTile(x,nextYToFill)[0].type===empty))
            nextYToFill++;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,currentType);
          if (y !== nextYToFill) boardChanged = true;
          break;
      }
    }
  }
});

onInput("s", () => {
  if (isGameOver) return;
  
  for (let x=0; x<=3; x++) {  
    let nextYToFill = 3;
    for (let y=2; y>=0; y--) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(x,nextYToFill)[0].type):
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextYToFill===3 && getTile(x,nextYToFill)[0].type===empty))
            nextYToFill--;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,currentType)
          if (y !== nextYToFill) boardChanged = true;
          break;
      }
    }
  }
});

onInput("d", () => {
  if (isGameOver) return;

  for (let y=0; y<=3; y++) {  
    let nextXToFill = 3;
    for (let x=2; x>=0; x--) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(nextXToFill,y)[0].type):
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextXToFill===3 && getTile(nextXToFill,y)[0].type===empty))
            nextXToFill--;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,currentType)
          if (x !== nextXToFill) boardChanged = true;
          break;
      }
    }
  }
});

onInput("a", () => {
  if (isGameOver) return;
  
  for (let y=0; y<=3; y++) {  
    let nextXToFill = 0;
    for (let x=1; x<=3; x++) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(nextXToFill,y)[0].type):
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextXToFill===0 && getTile(nextXToFill,y)[0].type===empty))
            nextXToFill++;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,currentType)
          if (x !== nextXToFill) boardChanged = true;
          break;
      }
    }
  }
});

// RESTART
onInput("j", () => {
  isGameOver = true;
  prepBoard();
});


afterInput(() => {
  if (checkLoss()) {
    isGameOver = true;
    addText("You lost :(", { y: 4, color: color`0` });
    addText("Press j", { y: 8, color: color`0` });
    addText("to restart", { y: 9, color: color`0` });
    return;
  }

  if (getAll(twentyfortyeight).length >= 1) {
    isGameOver = true;
    addText("You win!", { y: 4, color: color`0` });
    addText("Press j", { y: 8, color: color`0` });
    addText("to restart", { y: 9, color: color`0` });
    return;
  }
  
  if (!isGameOver) {
    if (boardChanged) generateTile();
    boardChanged = false;
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
  if (getAll(empty).length===0) return;
  
  let blankTiles = tilesWith(empty);
  let random = Math.floor(Math.random() * (blankTiles.length-1+1));
  clearTile(blankTiles[random][0].x,blankTiles[random][0].y);
  addSprite(blankTiles[random][0].x,blankTiles[random][0].y,"a");
}

function checkLoss() {
  if (getAll(empty).length>0) return false;
  
  for (let x=0; x<=3; x++) {
    for (let y=1; y<=3; y++) {
      if (getTile(x,y)[0].type === getTile(x,y-1)[0].type) return false;
    }
  }
  
  for (let y=0; y<=3; y++) {
    for (let x=1; x<=3; x++) {
      if (getTile(x,y)[0].type === getTile(x-1,y)[0].type) return false;
    }
  }

  return true;
}
