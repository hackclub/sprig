/*
Hi! Thanks for looking at my game!
And hopefully you will learn a
bit about circuits :)

Controls:
W, A, S, and D
for moving the blue selection square

I and K to change the selected item
to place

J to rotate the item
under the blue selection square

L to place a new item
under the blue selection square

 
@title: Circuits!
@author: Kevin Butchard
@tags: ['circuits', 'sandbox', 'wire']
@addedOn: 2024-09-16
*/

const player = "p";
const wireVert = "w";
const wireHor = "h";
const wire1 = "z";
const wire2 = "y";
const wire3 = "x";
const wire4 = "a";
const bulb = "b";
const bulbLit = "l";
const bulbBurnt = "f";
const cell = "c";
const cellVert = "v";
const resistor = "r";
const resistorVert = "t";
const switchOpen = "o";
const switchOpenVert = "d";
const switchClosed = "s";
const switchClosedVert = "e";
const menu = "m";
const arrowUp = "u";
const errorBox = "g";

const placementOptionsGlobal =
  ["", "h", "z", "b", "r", "o", "c"];
let placementOptions =
  ["", "h", "z", "b", "r", "o", "c"];
let placementOptionsAll = 
  ["w", "h", "z", "y", "x", "a", "b",
   "l", "f", "c", "v", "r", "t", "o",
   "d", "s", "e"];
let placement = placementOptions.length - 1;
let s = placementOptions[placement];

let outputText = "                ";
let tile;

let clearBoardNext = false;
let clearBoardText = "clear board";

let onMenu = false;
let pastSpot = "home";
let currSpot = "home";
let menuSelection = 0;
let menuSelectionMax = 5;
let switchFlips = 1;
let menuColors =
  [color`7`, color`0`, color`0`,
   color`0`, color`0`, color`0`];

setLegend(
  [ player, bitmap`
7777777777777777
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7777777777777777`],
  [ wireVert, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [ wireHor, bitmap`
................
................
................
................
................
................
................
0000000000000000
0000000000000000
................
................
................
................
................
................
................`],
  [ wire1, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......000000000
.......000000000
................
................
................
................
................
................
................`],
  [ wire2, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
000000000.......
000000000.......
................
................
................
................
................
................
................`],
  [ wire3, bitmap`
................
................
................
................
................
................
................
000000000.......
000000000.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [ wire4, bitmap`
................
................
................
................
................
................
................
.......000000000
.......000000000
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [ bulb, bitmap`
....00000000....
...0000000000...
..0000....0000..
.000F......F000.
000FFF....FFF000
000.FFF..FFF.000
00...FF00FF...00
00....0FF0....00
00....0FF0....00
00...FF00FF...00
000.FFF..FFF.000
000FFF....FFF000
.000F......F000.
..0000....0000..
...0000000000...
....00000000....`],
  [ bulbLit, bitmap`
....00000000....
...0000000000...
..000066660000..
.00066666666000.
0006666666666000
0006666006666000
0066660000666600
0066600660066600
0066600660066600
0066660000666600
0006666006666000
0006666666666000
.00066666666000.
..000066660000..
...0000000000...
....00000000....`],
  [ bulbBurnt, bitmap`
....00000000....
...0000000000...
..0000....0000..
.000........000.
000.0......0.000
000..0.00.0..000
00....0000....00
00...00..00...00
00...00..00...00
00....0000....00
000..0.00.0..000
000.0......0.000
.000........000.
..0000....0000..
...0000000000...
....00000000....`],
  [ cell, bitmap`
.........00.....
.........00.....
.........00.....
.....00..00..3..
.555.00..00.333.
.....00..00..3..
.....00..00.....
0000000..0000000
0000000..0000000
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.........00.....
.........00.....
.........00.....`],
  [ cellVert, bitmap`
.......00.......
....3..00.......
...333.00.......
....3..00.......
.......00.......
0000000000000000
0000000000000000
................
................
...0000000000...
...0000000000...
.......00.......
.......00.......
...555.00.......
.......00.......
.......00.......`],
  [ resistor, bitmap`
................
................
................
................
................
................
..9...9...9...9.
9999.999.999.999
99.999.999.999.9
....9...9...9...
................
................
................
................
................
................`],
  [ resistorVert, bitmap`
.......99.......
......99........
.......99.......
........99......
.......99.......
......99........
.......99.......
........99......
.......99.......
......99........
.......99.......
........99......
.......99.......
......99........
.......99.......
.......99.......`],
  [ switchOpen, bitmap`
................
................
................
...........0....
.........000....
.444...0000.444.
.444.0000...444.
0044000.....4400
00440.......4400
.444........444.
.444........444.
................
................
................
................
................`],
  [ switchOpenVert, bitmap`
.......00.......
.....440044.....
.....444444.....
.....444444.....
...00...........
....00..........
....00..........
.....00.........
.....00.........
......00........
......00........
.......00.......
.....444444.....
.....444444.....
.....440044.....
.......00.......`],
  [ switchClosed, bitmap`
................
................
................
................
................
.444........444.
.444........444.
0044000000004400
0044000000004400
.444........444.
.444........444.
................
................
................
................
................`],
  [ switchClosedVert, bitmap`
.......00.......
.....440044.....
.....444444.....
.....444444.....
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.....444444.....
.....444444.....
.....440044.....
.......00.......`],
  [ menu, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
................
................
.00000000000000.
.00000000000000.
.00000000000000.
................
................
.00000000000000.
.00000000000000.
.00000000000000.
................
................`],
  [ arrowUp, bitmap`
................
................
................
................
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
................
................
................
................
................
................`],
  [ errorBox, bitmap`
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
3333333333333333`]
);

let level = 3;
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`, /* menu */
  map`
..........
..........
..........
..........
..........
..........
..........
..........`, /* controls */
  map`
....................
....................
hhhhhhhhhhhhhhhhhhhh
m.................u.
....................
......b..cros.......
......w.............
......w......x......
......w....ahy......
......zhhhhy........
..........p.........
....................
....................
....................
....................
....................`, /* sandbox */
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`  /* home */
];

let savedMap =  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`;

setMap(levels[level]);

setPushables({
  [ player ]: []
});

onInput("w", () => {
  switch (currSpot) {
    case "menu":
      menuSelection -= 1;
      if (menuSelection < 0) {
        menuSelection = menuSelectionMax;
      }
      updateMenu();
      break;
    case "controls":
  
      break;
    case "tutorial":
      
      break;
    case "levels":
  
      break;
    case "sandbox":
      p1 = getFirst(player);
      
      if (p1.y > 3) {
        getFirst(player).y -= 1
      }
      break;
  }
});

  

onInput("a", () => {
  switch (currSpot) {
    case "menu":
  
      break;
    case "controls":
  
      break;
    case "tutorial":
      
      break;
    case "levels":
  
      break;
    case "sandbox":
      getFirst(player).x -= 1;
      break;
  }
});

onInput("s", () => {
  switch (currSpot) {
    case "menu":
      menuSelection += 1;
      if (menuSelection > menuSelectionMax) {
        menuSelection = 0;
      }
      updateMenu();
      break;
    case "controls":
  
      break;
    case "tutorial":
  
      break;
    case "levels":
  
      break;
    case "sandbox":
      getFirst(player).y += 1;
      break;
  }
});

onInput("d", () => {
  switch (currSpot) {
    case "menu":
  
      break;
    case "controls":
  
      break;
    case "tutorial":
  
      break;
    case "levels":
  
      break;
    case "sandbox":
      getFirst(player).x += 1;
      break;
  }
});

onInput("i", () => {
  switch (currSpot) {
    case "menu":
      
      break;
    case "controls":
  
      break;
    case "tutorial":
  
      break;
    case "levels":
  
      break;
    case "sandbox":
      placement -= 1;
      if (placement < 0) {
        placement = placementOptions.length - 1;
      }
      
      setPlacementIcon();
      break;
  }
});

onInput("j", () => {
  switch (currSpot) {
    case "menu":
  
      break;
    case "controls":
  
      break;
    case "tutorial":
  
      break;
    case "levels":
  
      break;
    case "sandbox":
      rotateTile();
      break;
  }
});

onInput("k", () => {
  switch (currSpot) {
    case "menu":
      
      break;
    case "controls":
  
      break;
    case "tutorial":
  
      break;
    case "levels":
  
      break;
    case "sandbox":
      placement += 1;
      if (placement > placementOptions.length - 1) {
        placement = 0
      }
      
      setPlacementIcon();
      break;
  }
});

onInput("l", () => {
  switch (currSpot) {
    case "menu":
      switch (menuSelection) {
        case 0:
          currSpot = pastSpot;
          clText();
          defaultText();
          setMap(levels[level]);
          clearBoard();
          makeSavedMap();
          setPlacementIcon();
          if (clearBoardNext) {
            clearBoard();
            clearBoardNext = false;
          }
          
          p1 = getFirst(player);
          if (p1 == null) {
            addSprite(10, 10, player);
          }
          break;
        case 1:
          if (clearBoardNext) {
            clearBoardNext = false;
            clearBoardText = "clear board       ";
          } else {
            clearBoardNext = true;
            clearBoardText = "cancel board clear";
          }
          break;
        case 2:
          showControlsArea();
          break;
        case 3:
          setUpTutorial();
          break;
        case 4:
          currSpot = "animation";
          clText();
          clearBoardCompletely();
          addText("Woah.", {
            x: 1,
            y: 1,
            color: color`7`
          });
          addText("     Circuits", {
            x: 1,
            y: 13,
            color: color`0`
          });
          setMap(levels[3]);
          addSprite(10, 10, player);
          randScreenInterval = setInterval(randScreen, 20);
          break;
        case 5:
          currSpot = "sandbox";
          clText();
          defaultText();
          setMap(levels[2]);
          setPlacementIcon();
          break;
      }
      break;
    case "controls":
      currSpot = "menu";
      showMenu()
      break;
    case "animation":
      currSpot = "menu";
      clearInterval(randScreenInterval);
      clearBoardCompletely();
      showMenu();
      break;
    case "sandbox":
      p1 = getFirst(player);
      if (onMenu) {
        saveMap();
        currSpot = "menu";
        p1.x = 0;
        p1.y = 0;
        showMenu();
      } else if (p1.y != 3 || p1.x < 15 || p1.x > 19) {
        clTile();
        if (placement != 0) {
          addSprite(p1.x, p1.y, placementOptions[placement]);
        }
      }
      break;
    case "home":
      setUpTutorial();
      break;
    case "tutorial":
      clearInterval(randScreenInterval);
      currSpot = "tutorial1";
      clText();
      clearBoardCompletely();
      addTutorialText();
      addText("A Wire", {
        x: 13,
        y: 3,
        color: color`3`
      });
      addSprite(1, 3, "w");
      addSprite(3, 3, "h");
      addSprite(5, 3, "z");
      addSprite(7, 3, "y");
      addSprite(9, 3, "x");
      addSprite(11, 3, "a");
      addText(`Wires are the
conductors that 
allow electricity
to flow from one
point to another
to power all of
your devices!`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      break;
    case "tutorial1":
      currSpot = "tutorial2";
      clText();
      clearBoardCompletely();
      addTutorialText();
      addText("A Cell/Battery", {
        x: 5,
        y: 3,
        color: color`3`
      });
      addSprite(1, 3, "c");
      addSprite(3, 3, "v");
      addText(`But where does the
electrical energy
come from? Cells!
They store
chemical energy
and then release
it as electrical
energy.`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      break;
    case "tutorial2":
      currSpot = "tutorial3";
      clText();
      clearBoardCompletely();
      addTutorialText();
      addText("A Bulb", {
        x: 5,
        y: 3,
        color: color`3`
      });
      addSprite(1, 3, "b");
      addSprite(3, 3, "l");
      addText(`Now, what are we
going to power?
How about the
great light bulb!
It lights up.
Yeah!`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      break;
    case "tutorial3":
      currSpot = "tutorial4";
      clText();
      clearBoardCompletely();
      addTutorialText();
      addText("A Burnt Bulb", {
        x: 3,
        y: 3,
        color: color`3`
      });
      addSprite(1, 3, "f");
      addText(`This happens
when too much
current flows
through a light
bulb, it burns
out! To prevent
this, we need to
add a...`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      break;
    case "tutorial4":
      currSpot = "tutorial5";
      clText();
      clearBoardCompletely();
      addTutorialText();
      addText("A Resistor", {
        x: 5,
        y: 3,
        color: color`3`
      });
      addSprite(1, 3, "t");
      addSprite(3, 3, "r");
      addText(`Resistor! This
limits the flow of
electricity by
converting some of
it into heat. This
helps prevent our
light bulbs from
burning out!`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      break;
    case "tutorial5":
      currSpot = "tutorial6";
      clText();
      clearBoardCompletely();
      addTutorialText();
      addText("A Switch", {
        x: 9,
        y: 3,
        color: color`3`
      });
      addSprite(1, 3, "o");
      addSprite(3, 3, "d");
      addSprite(5, 3, "s");
      addSprite(7, 3, "e");
      addText(`Our final
component is a
switch, which
allows us to turn
our circuits on
and off.
Very neat!`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      break;
    case "tutorial6":
      currSpot = "tutorial7";
      clText();
      clearBoardCompletely();
      addText("Also, the Controls", {
        x: 1,
        y: 1,
        color: color`1`
      });
      addText("L to continue", {
        x: 1,
        y: 14,
        color: color`1`
      });
      addText("Move selection", {
        x: 1,
        y: 3,
        color: color`3`
      });
      addText("box: WASD", {
        x: 1,
        y: 4,
        color: color`3`
      });
      addText("Change item to", {
        x: 1,
        y: 6,
        color: color`0`
      });
      addText("place: I, K", {
        x: 1,
        y: 7,
        color: color`0`
      });
      addText("Rotate item under", {
        x: 1,
        y: 9,
        color: color`8`
      });
      addText("selection box: J", {
        x: 1,
        y: 10,
        color: color`8`
      });
      addText("Place item: L", {
        x: 1,
        y: 12,
        color: color`4`
      });
      break;
    case "tutorial7":
      currSpot = "tutorial8";
      clText();
      clearBoardCompletely();
      addText("     TUTORIAL ", {
        x: 1,
        y: 1,
        color: color`1`
      });
      addText("L to start!", {
        x: 1,
        y: 14,
        color: color`1`
      });
      addText(`Wonderful!
Now you are
officially ready
to create your
very own circuits!`, {
                   //
        x: 1,
        y: 5,
        color: color`0`
      });
      addSprite(17, 2, player);
      randScreenInterval = setInterval(randScreen, 200);
      break;
    case "tutorial8":
      clearInterval(randScreenInterval);
      currSpot = "sandbox";
      pastSpot = "sandbox";
      clText();
      clearBoardCompletely();
      defaultText();
      setMap(levels[2]);
      setPlacementIcon();
      break;
  }
});

let sel = 0;

afterInput(() => {
  switch (currSpot) {
    case "menu":
      updateMenu();
      break;
    case "controls":
  
      break;
    case "tutorial":
  
      break;
    case "levels":
  
      break;
    case "sandbox":
      p1 = getFirst(player);
  
      switchFlips += 1;
      if (p1.x != lastx || p1.y != lasty) {
        switchFlips = 1;
      }
      
      if (p1.y == 3 && p1.x < 5) {
        onMenu = true;
        outputText = "Press L for menu";
      } else if (p1.y == 3 && p1.x > 14 && p1.x < 19) {
        onMenu = false;
        outputText = "I & K for items "; 
      } else {
        onMenu = false;
        tile = getTile(p1.x, p1.y);
        
        for (let i = 0; i < tile.length; i++) {
          switch (tile[i].type) {
            default:
              outputText = "                ";
              break;
            case "w":
            case "h":
            case "z":
            case "y":
            case "x":
            case "a":
              outputText = "Wire            ";
              break;
            case "b":
              outputText = "Unlit bulb      ";
              break;
            case "l":   
              outputText = "Lit bulb        ";
              break;
            case "c":
            case "v":
              outputText = "Cell (battery)  ";
              break;
            case "r":
            case "t":
              outputText = "Resistor        ";
              break;
            case "o":
            case "d":
              outputText = "Open switch     ";
              break;
            case "s":
            case "e":
              outputText = "Closed switch   ";
              break;
          }
        }
      }
      
      addText(outputText, {
        x: 1,
        y: 1,
        color: color`1`
      });
  
      lastx = p1.x;
      lasty = p1.y;
      break;
  }
});

function setPlacementIcon() {
  clearTile(18, 1);
  if (placement != 0) {
    addSprite(18, 1, placementOptions[placement]);
  }
}

function clTile() {
  p1 = getFirst(player);
  tile = getTile(p1.x, p1.y);

  for (let i = 0; i < tile.length; i++) {
    let currTile = tile[i];
    let t = currTile.type;

    if (t != "p" && t != "m" && t != "u") {
      currTile.remove();
    }
  }
}

function rotateTile() {
  p1 = getFirst(player);
  tile = getTile(p1.x, p1.y);
  let t = "";

  for (let i = 0; i < tile.length; i++) {
    switch (tile[i].type) {
      case "w":
        t = "h";
        break;
      case "h":
        t = "w";
        break;
      case "z":
        t = "y";
        break;
      case "y":
        t = "x";
        break;
      case "x":
        t = "a";
        break;
      case "a":
        t = "z";
        break;
      case "c":
        t = "v";
        break;
      case "v":
        t = "c";
        break;
      case "r":
        t = "t";
        break;
      case "t":
        t = "r";
        break;
      case "o":
        t = "s";
        break;
      case "d":
        t = "e";
        break;
      case "s":
        t = "d";
        break;
      case "e":
        t = "o";
        break;
      default:
        t = "";
        break;
    }
  }

  if (t != "") {
    clTile();
    addSprite(p1.x, p1.y, t);
  }
}

function showMenu() {
  clearBoardNext = false;
  clearBoardText = "clear board";
  
  menuSelection = 0;
  setMap(levels[0]);
  clText();
  
  addText("       MENU     ", {
    x: 1,
    y: 1,
    color:color`1`
  });
  addText("You are in:      ", {
    x: 1,
    y: 3,
    color:color`0`
  });

  addText("W and A to move", {
    x: 1,
    y: 13,
    color: color`1`
  });
  addText("L to select", {
    x: 1,
    y: 14,
    color: color`1`
  });

  updateMenu();
}

function updateMenu() {
  let menuColors =
    [color`0`, color`0`, color`0`,
     color`0`, color`0`, color`0`];
  menuColors[menuSelection] = color`7`;
  
  addText(pastSpot, {
    x: 1,
    y: 4,
    color:color`0`
  });
  addText("resume", {
    x: 1,
    y: 6,
    color: menuColors[0]
  });
  addText(clearBoardText, {
    x: 1,
    y: 7,
    color: menuColors[1]
  });
  addText("controls", {
    x: 1,
    y: 8,
    color: menuColors[2]
  });
  addText("tutorial", {
    x: 1,
    y: 9,
    color: menuColors[3]
  });
  addText("???", {
    x: 1,
    y: 10,
    color: menuColors[4]
  });
  addText("sandbox", {
    x: 1,
    y: 11,
    color: menuColors[5]
  });
}

function clearBoard() {
  for (let i = 0; i < 20; i++) {
    for (let j = 3; j < 16; j++) {
      tile = getTile(i, j);

      for (let i = 0; i < tile.length; i++) {
        let currTile = tile[i];
        let t = currTile.type;
    
        if (t != "p" && t != "m" && t != "u") {
          currTile.remove();
        }
      }
    }
  }
}

function clText() {
  for (let i = 0; i < 16; i++) {
    addText("                    ", {
      x: 0,
      y: i,
      color: color`0`
    });
  }
}

function defaultText() {
  addText("MENU          Sel", {
    x: 1,
    y: 3,
    color: color`1`
  });
}

function saveMap() {
  savedMap =  "";

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 16; j++) {
      tile = getTile(i, j);
      let placementHere = ".";

      for (let m = 0; m < tile.length; m++) {
        let t = tile[m].type;

        if (t != "p") {
          placementHere = t;
        }
      }

      savedMap += placementHere;
    }
  }
}

function makeSavedMap() {
  let sel = 0;
  
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 16; j++) {
      let curr = savedMap.substring(sel, sel + 1);

      if (curr != ".") {
        addSprite(i, j, curr);
      }

      sel += 1;
    }
  }
}

function makeHome() {
  addText("       HOME     ", {
    x: 1,
    y: 1,
    color:color`1`
  });
  addText(`Welcome!
This is a game
where you can
learn about parts
of a circuit, what
they do, and then
make your very own
circuits!

Enjoy!`, {
    x: 1,
    y: 3,
    color:color`0`
  });

  addText("L to continue", {
    x: 1,
    y: 14,
    color:color`1`
  });
}

let randScreenInterval;

function randScreen() {
  p1 = getFirst(player);
  let rand = Math.floor(Math.random() * 4);
  switch (rand) {
    case 0:
      if (p1.x < 19) {
        p1.x += 1;
        break;
      }
    case 1:
      if (p1.y > 0) {
        p1.y -= 1;
        break;
      }
    case 2:
      if (p1.x > 0) {
        p1.x -= 1;
        break;
      } else {
        p1.x += 1;
      }
    case 3:
      if (p1.y < 8) {
        p1.y += 1;
        break;
      } else {
        p1.y -= 1;
      }
  }
  p1 = getFirst(player);
  clTile(p1.x, p1.y);
  //0-16
  rand = Math.floor(Math.random() * 17);
  addSprite(p1.x, p1.y, placementOptionsAll[rand]);
}

function setUpTutorial() {
  clText();
  setMap(levels[3]);
  currSpot = "tutorial";
  addSprite(Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 9), player);
  
  randScreenInterval = setInterval(randScreen, 200);

  addTutorialText();
  addText(`See all the parts!
Don't worry, we'll
explain them next`, {
    x: 1,
    y: 10,
    color: color`0`
  });
  
}

function addTutorialText() {
  addText("     TUTORIAL ", {
    x: 1,
    y: 1,
    color: color`1`
  });
  addText("L to continue", {
    x: 1,
    y: 14,
    color: color`1`
  });
}

function clearBoardCompletely() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 16; j++) {
      clearTile(i, j);
    }
  }
}

function showControlsArea() {
  currSpot = "controls";
  clText();
  addText("     CONTROLS   ", {
    x: 1,
    y: 1,
    color: color`1`
  });
  addText("back", {
    x: 1,
    y: 3,
    color: color`7`
  });
  addText("Move selection", {
    x: 1,
    y: 5,
    color: color`3`
  });
  addText("box: WASD", {
    x: 1,
    y: 6,
    color: color`3`
  });
  addText("Change item to", {
    x: 1,
    y: 7,
    color: color`0`
  });
  addText("place: I, K", {
    x: 1,
    y: 8,
    color: color`0`
  });
  addText("Rotate item under", {
    x: 1,
    y: 9,
    color: color`8`
  });
  addText("selection box: J", {
    x: 1,
    y: 10,
    color: color`8`
  });
  addText("Place item: L", {
    x: 1,
    y: 11,
    color: color`4`
  });

  addText("L to return", {
    x: 1,
    y: 13,
    color: color`1`
  });
  addText("to menu", {
    x: 1,
    y: 14,
    color: color`1`
  });
  /*
            W, A, S, and D
  for moving the blue selection square
  
  I and K to change the selected item
  to place
  
  J to rotate the item
  inder the blue selection square
  
  L to place a new item
  inder the blue selection square*/
}

let lastx = 0;
let lasty = 0;

makeHome();








