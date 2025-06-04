/*
@title: step-step
@author: Edward Hesketh
@tags: []
@addedOn: 2025-05-25
*/

const trapdoor = 'a'
const player = 'b'
const annoyer = 'c'
const annoyer_falling = 'd'
const wall = 'e'
const background_tile = 'j'

const button_outline = 'h'

const button_filled_w = 'k'
const button_filled_a = 'l'
const button_filled_s = 'm'
const button_filled_d = 'n'

const button_filled = 'o'

function resetLegend() {
  setLegend(
    [player, bitmap`
3333333333333333
333LL333333LL333
33L3333333333L33
3333333333333333
3333233333323333
3332223333222333
3332023333202333
333202333320233C
333222333322233C
333121333312133C
333313333331333C
333333333333333C
33333L3333L3333C
333333LLLL33333C
333333333333333C
333333CCCCCCCCCC`],
    [annoyer, bitmap`
..88888HHHHHHH..
.8HHHHHHHHHHHHH.
8HHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHH2HH2HH2HH2HHH
HHH2222HH2222HHH
HHH2LL2HH2LL2HHH
HHH2LL2HH2LL2HHH
HHH2222HH2222HH8
HHHH22HHHH22HHH8
HHHHHHHHHHHHHHH8
HHHHHHHHHHHHHHH8
HHHHHHHHHHHHHH88
.HHHHHHHHHHHH88.
..HHHHHHH88888..`],
    [annoyer_falling, bitmap`
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
................
................
................
................`],
    [trapdoor, bitmap`
LLLLLLLLLLLLLLLL
L111166LL601111L
L111106LL661111L
L111100LL061111L
L111160LL001111L
L111166LL601111L
L111106LL661111L
L111100LL061111L
L111160LL001111L
L111166LL601111L
L111106LL661111L
L111100LL061111L
L111160LL001111L
L111166LL601111L
L111106LL661111L
LLLLLLLLLLLLLLLL`],
    [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
    [button_outline, bitmap`
0000000000000000
0000000000000000
0000022222200000
000222LLLL222000
0002LLLLLLLL2000
0022LLLLLLLL2200
002LLLLLLLLLL200
002LLLLLLLLLL200
002LLLLLLLLLL200
002LLLLLLLLLL200
0022LLLLLLLL2200
0002LLLLLLLL2000
000222LLLL222000
0000022222200000
0000000000000000
0000000000000000`],
    [background_tile, bitmap`
1111111111111111
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
100000000000000L
1LLLLLLLLLLLLLLL`],
    [button_filled_w, bitmap`
0000000000000000
0000000000000000
0000022222200000
0002222LL2222000
000222LLLL222000
00222LLLLLL22200
0022LLLLLLLL2200
0022222LL2222200
0022222LL2222200
0022222LL2222200
0022222LL2222200
0002222LL2222000
0002222LL2222000
0000022222200000
0000000000000000
0000000000000000`],
    [button_filled_a, bitmap`
0000000000000000
0000000000000000
0000022222200000
0002222222222000
000222L222222000
00222LL222222200
0022LLL222222200
002LLLLLLLLLL200
002LLLLLLLLLL200
0022LLL222222200
00222LL222222200
000222L222222000
0002222222222000
0000022222200000
0000000000000000
0000000000000000`],
    [button_filled_s, bitmap`
0000000000000000
0000000000000000
0000022222200000
0002222LL2222000
0002222LL2222000
0022222LL2222200
0022222LL2222200
0022222LL2222200
0022222LL2222200
0022LLLLLLLL2200
00222LLLLLL22200
000222LLLL222000
0002222LL2222000
0000022222200000
0000000000000000
0000000000000000`],
    [button_filled_d, bitmap`
0000000000000000
0000000000000000
0000022222200000
0002222222222000
000222222L222000
002222222LL22200
002222222LLL2200
002LLLLLLLLLL200
002LLLLLLLLLL200
002222222LLL2200
002222222LL22200
000222222L222000
0002222222222000
0000022222200000
0000000000000000
0000000000000000`],
    [button_filled, bitmap`
0000000000000000
0000000000000000
0000022222200000
0002222222222000
0002222222222000
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0002222222222000
0002222222222000
0000022222200000
0000000000000000
0000000000000000`],
  )
}

resetLegend()

setBackground(background_tile)

setSolids([player, annoyer, wall])

let gameover = false;
let player_dead = false;
var gameState = "game";
let tutorialIndex = 0;
let win = false;

function loadLevel(levelIndex) {
  resetLegend()
  clearText()
  setMap(levels[levelIndex])
  tutorialIndex = 2;
  switch (levelIndex) {
    case 0:
      break
    case 1:
      gameState = "game";
      tutorialIndex = 0;
      addText("WASD for\nmovement", {
        x: 10,
        y: 4,
        color: color`3`
      })
      break
    case 2:
      gameState = "game";
      addText("Retry\nwith J", {
        x: 2,
        y: 4,
        color: color`9`
      })
      break;
    default:
      gameState = "game";
  }
}

let level = 1
const levels = [
  map`
eeeeeeeeee
eeeeeeeeee
eeeeeeehee
eeeeeehehe
eeeeeeehee
eeeeeeeeee
eeeeeeeeee
eeeeeeeeee`,
  map`
eeeeeeeeee
eekeeeeeee
eleneeeeee
eemeeeeeee
eeeeeeeeee
....ea....
.b..ea...c
....ea....`,
  map`
eeeeeeeeee
eeeeeeehee
eeeeeeoehe
eeeeeeehee
eeeeeeeeee
......a...
c..b..a...
......a...`,
  map`
eeeeeeeeee
eeeeeeeeee
ec.aeea.ce
e..aeea..e
eeeeeeeeee
eeeeeeeeee
eb.......e
eeeeeeeeee`,
  map`
eeeeeeeeee
e...c....e
e.eeeeee.e
e.aaaaaabe
e.eeeeee.e
e.eeeeee.e
e...c.c..e
eeeeeeeeee`,
  map`
...eeeeeee
.eceeeeeee
.eeeeeec..
.ee...eee.
..a.b.a...
eee...eeee
eeeeeeeeee
eeeeeeeeee`,
  map`
eeeeaaaaec
eeeeaaeaec
eeeeaaeaec
eeeeaaeaeb
eeeeaaeaea
eeeeaaeaaa
eeeeaaeeee
eeeeaaaaaa`,
  map`
........ee
.eeeeee.ee
.eeeeee.ee
..a.a.a.ee
.eeeeeeeee
..........
...cc..c..
b.........`,
  map`
c....b...c
eeee.eeeee
eeee...eee
eeee...eee
eeee...eee
eeee.eeeee
ceec.eeeee
aaaaaaaaaa`,
  map`
eeeeeeeeee
eeeeeeeeee
eeeeeeeeee
eeeeeeeeee
eeeeeeeeee
eeebeeeeee
eeeeeeeeee
eeeeeeeeee`,
]
loadLevel(level)

let playermovesPerEnemyMove = 2;

function afterPlayerMovement() {
  movetimer++;
  if (movetimer == 5 && tutorialIndex == 0) {
    addSprite(2, 1, wall)
    addSprite(3, 2, wall)
    addSprite(1, 2, wall)
    addSprite(2, 3, wall)
    clearText()
    addText("   enemies\nfollow you", {
      x: 10,
      y: 7,
      color: color`H`
    })
    tutorialIndex++;
    movetimer = playermovesPerEnemyMove - 1;
  }
}

// Player movement
onInput("w", () => {
  switch (gameState) {
    case "game":
      if (getFirst(player).y-- != getFirst(player).y) {
        afterPlayerMovement();
      }
      break;
  }
})
onInput("a", () => {
  switch (gameState) {
    case "game":
      if (getFirst(player).x-- != getFirst(player).x) {
        afterPlayerMovement();
      }
      break;
  }
})
onInput("s", () => {
  switch (gameState) {
    case "game":
      if (getFirst(player).y++ != getFirst(player).y) {
        afterPlayerMovement();
      }
      break;
  }
})
onInput("d", () => {
  switch (gameState) {
    case "game":
      if (getFirst(player).x++ != getFirst(player).x) {
        afterPlayerMovement();
      }
      break;
  }
})

onInput("j", () => {
  loadLevel(level)
})

onInput("l", () => {
  if (gameState == "gameover" && win && level != 8) {
    win = false;
    loadLevel(++level)
  }
})

// Open the trapdoors!
onInput("k", () => {
  if (tutorialIndex < 2) {
    return
  }
  switch (gameState) {
    case "game":
      gameState = "trapdoors"

      // Play the animations for the trapdoor and annoyers.
      setTimeout(() => { setLegend([trapdoor, bitmap`
      LLLLLLLLLLLLLLLL
      L11166LLLL60111L
      L11106LLLL66111L
      L11100LLLL06111L
      L11160LLLL00111L
      L11166LLLL60111L
      L11106LLLL66111L
      L11100LLLL06111L
      L11160LLLL00111L
      L11166LLLL60111L
      L11106LLLL66111L
      L11100LLLL06111L
      L11160LLLL00111L
      L11166LLLL60111L
      L11106LLLL66111L
      LLLLLLLLLLLLLLLL`]); }, 100);
      setTimeout(() => { setLegend([trapdoor, bitmap`
      LLLLLLLLLLLLLLLL
      L1166LL00LL6011L
      L1106LL00LL6611L
      L1100LL00LL0611L
      L1160LL00LL0011L
      L1166LL00LL6011L
      L1106LL00LL6611L
      L1100LL00LL0611L
      L1160LL00LL0011L
      L1166LL00LL6011L
      L1106LL00LL6611L
      L1100LL00LL0611L
      L1160LL00LL0011L
      L1166LL00LL6011L
      L1106LL00LL6611L
      LLLLLLLLLLLLLLLL`]); }, 200);
      setTimeout(() => { setLegend([trapdoor, bitmap`
      LLLLLLLLLLLLLLLL
      L166LL0000LL601L
      L106LL0000LL661L
      L100LL0000LL061L
      L160LL0000LL001L
      L166LL0000LL601L
      L106LL0000LL661L
      L100LL0000LL061L
      L160LL0000LL001L
      L166LL0000LL601L
      L106LL0000LL661L
      L100LL0000LL061L
      L160LL0000LL001L
      L166LL0000LL601L
      L106LL0000LL661L
      LLLLLLLLLLLLLLLL`]); }, 300);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
      ................
      ..8888HHHHHHHH..
      .88HHHHHHHHHHHH.
      .8HHHHHHHHHHHHH.
      .HHH2HHHHHH2HHH.
      .HH222HHHH222HH.
      .HH2L2HHHH2L2HH.
      .HH2L2HHHH2L2HH.
      .HH222HHHH222HH.
      .HHH2HHHHHH2HHH.
      .HHHHHHHHHHHHH8.
      .HHHHHHHHHHHHH8.
      .HHHHHHHHHHHHH8.
      .HHHHHHHHHHHH88.
      ..HHHHHHHH8888..
      ................`],
          [trapdoor, bitmap`
      11LLLLLLLLLLLLLL
      166LL000000LL60L
      L06LL000000LL66L
      L00LL000000LL06L
      L60LL000000LL00L
      L66LL000000LL60L
      L06LL000000LL66L
      L00LL000000LL06L
      L60LL000000LL00L
      L66LL000000LL60L
      L06LL000000LL66L
      L00LL000000LL06L
      L60LL000000LL00L
      L66LL000000LL60L
      L06LL000000LL66L
      LLLLLLLLLLLLLLLL`]
        );
      }, 400);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
      ................
      ................
      ...88HHHHHHHH...
      ..88HHHHHHHHHH..
      ..8HHHHHHHHHHH..
      ..HH2HHHHHH2HH..
      ..H2L2HHHH2L2H..
      ..H2L2HHHH2L2H..
      ..HH2HHHHHH2HH..
      ..HHHHHHHHHHHH..
      ..HHHHHHHHHHHH..
      ..HHHHHHHHHHH8..
      ..HHHHHHHHHH88..
      ...HHHHHHHH88...
      ................
      ................`],
          [trapdoor, bitmap`
      11LLLLLLLLLLLLLL
      166LL000000LL60L
      L06LL000000LL66L
      L00LL000000LL06L
      L60LL000000LL00L
      L66LL000000LL60L
      L06LL000000LL66L
      L00LL000000LL06L
      L60LL000000LL00L
      L66LL000000LL60L
      L06LL000000LL66L
      L00LL000000LL06L
      L60LL000000LL00L
      L66LL000000LL60L
      L06LL000000LL66L
      LLLLLLLLLLLLLLLL`]
        );
      }, 500);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
      ................
      ................
      ....88HHHHHH....
      ...8HHHHHHHHH...
      ..8HHHHHHHHHHH..
      ..8H2L2HH2L2HH..
      ..HH2L2HH2L2HH..
      ..HH2L2HH2L2HH..
      ..HH2L2HH2L2HH..
      ..HHHHHHHHHHHH..
      ..HHHHHHHHHHH8..
      ..HHHHHHHHHHH8..
      ...HHHHHHHHH8...
      ....HHHHHH88....
      ................
      ................`],
          [trapdoor, bitmap`
      11LLLLLLLLLLLLLL
      16LL00000000LL6L
      L6LL00000000LL6L
      L0LL00000000LL0L
      L0LL00000000LL0L
      L6LL00000000LL6L
      L6LL00000000LL6L
      L0LL00000000LL0L
      L0LL00000000LL0L
      L6LL00000000LL6L
      L6LL00000000LL6L
      L0LL00000000LL0L
      L0LL00000000LL0L
      L6LL00000000LL6L
      L6LL00000000LL6L
      LLLLLLLLLLLLLLLL`]
        );
      }, 600);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
      ................
      ................
      ................
      ................
      ....88HHHHHH....
      ....8HHHHHHH....
      ....H22HH22H....
      ....HLLHHLLH....
      ....H22HH22H....
      ....HHHHHHHH....
      ....HHHHHHH8....
      ....HHHHHH88....
      ................
      ................
      ................
      ................`],
          [trapdoor, bitmap`
      11LLLLLLLLLLLLLL
      16LL00000000LL6L
      L6LL00000000LL6L
      L0LL00000000LL0L
      L0LL00000000LL0L
      L6LL00000000LL6L
      L6LL00000000LL6L
      L0LL00000000LL0L
      L0LL00000000LL0L
      L6LL00000000LL6L
      L6LL00000000LL6L
      L0LL00000000LL0L
      L0LL00000000LL0L
      L6LL00000000LL6L
      L6LL00000000LL6L
      LLLLLLLLLLLLLLLL`]);
      }, 700);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
      ................
      ................
      ................
      ................
      ................
      ................
      ......HHHH......
      ......HL2H......
      ......HHHH......
      ......HHHH......
      ................
      ................
      ................
      ................
      ................
      ................`],
          [trapdoor, bitmap`
      11LLLLLLLLLLLLLL
      1LL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLL0000000000LLL
      LLLLLLLLLLLLLLLL`]
        );
      }, 800);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
      ................
      ................
      ................
      ................
      ................
      ................
      ................
      .......H1.......
      .......HH.......
      ................
      ................
      ................
      ................
      ................
      ................
      ................`],
          [trapdoor, bitmap`
      11LLLLLLLLLLLLLL
      1L000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LL000000000000LL
      LLLLLLLLLLLLLLLL`]
        );
      }, 900);
      setTimeout(() => {
        setLegend(
          [annoyer_falling, bitmap`
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
      ................
      ................
      ................
      ................`],
          [trapdoor, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`]
        );
        var fallers = getAll(annoyer_falling);
        fallers.forEach((faller) => {
          faller.remove();
        })
      }, 1000);

      // after 1.5 seconds, display the appropriate gameover text.
      setTimeout(() => {
        gameState = "gameover";
        if (player_dead) {
          loadLevel(0)
          addText("you killed\nyourself\n\npress J to\ntry again", {
            x: 2,
            y: 5,
            color: color`5`
          })
          player_dead = false
          clearTile(6, 3)
          addSprite(6, 3, button_filled)
        } else if (getAll(annoyer).length > 0) {
          loadLevel(0)
          addText("you missed\nenemies!\n\npress J to\ntry again", {
            x: 2,
            y: 5,
            color: color`H`
          })
          clearTile(6, 3)
          addSprite(6, 3, button_filled)
        } else {
          if (level != 8) {
            loadLevel(0)
            win = true;
            addText("you win!\n\nuse L to\ncontinue", {
              x: 2,
              y: 5,
              color: color`4`
            })
            addText("level " + level + " of 8", {
              x: 4,
              y: 14,
              color: color`2`
            })
            clearTile(8, 3)
            addSprite(8, 3, button_filled)
          } else {
            loadLevel(9)
            addText("you win!", {
              x: 6,
              y: 5,
              color: color`4`
            })
            addText("yay!", {
              x: 10,
              y: 10,
              color: color`3`
            })
            addText("Created by Edward H\ngithub:headblockhead", {
              x: 0,
              y: 14,
              color: color`2`
            })
          }
        }
      }, 1500);
      let annoyers = getAll(annoyer)
      let trapdoors = getAll(trapdoor)
      let player_inst = getFirst(player)

      trapdoors.forEach((trapdoor) => {
        if (trapdoor.x == player_inst.x && trapdoor.y == player_inst.y) {
          player_dead = true;
        }
        annoyers.forEach((annoyer) => {
          if (annoyer.x == trapdoor.x && annoyer.y == trapdoor.y) {
            addSprite(annoyer.x, annoyer.y, annoyer_falling);
            setTimeout(() => {
              annoyer.remove();
              annoyers.splice(annoyers.indexOf(annoyer), 1);
            }, 450);
          }
        });
      })
      break;
  }
});

let movetimer = 0;
afterInput(() => {

})

var gameLoop = setInterval(() => {
  if (tutorialIndex != 0) {
    moveAnnoyers();
  }
  if (tutorialIndex == 1 && getFirst(trapdoor).x == getFirst(annoyer).x) {
    clearText()
    addText("lure them\nover\ntrapdoors\n\nand kill\nwith K", {
      x: 1,
      y: 2,
      color: color`6`
    })
    clearTile(7, 1)
    clearTile(8, 2)
    clearTile(6, 2)
    clearTile(7, 3)

    addSprite(7, 1, button_outline)
    addSprite(8, 2, button_outline)
    addSprite(6, 2, button_outline)
    addSprite(7, 3, button_filled)
    tutorialIndex++
  }
}, 400);

function moveAnnoyers() {
  player_sprite = getFirst(player)
  annoyers = getAll(annoyer)
  annoyers.forEach((a) => {
    trapdoors = getAll(trapdoor)
    var shouldMove = true
    trapdoors.forEach((trapdoor) => {
      if (a.x == trapdoor.x && a.y == trapdoor.y) {
        shouldMove = true
      }
    })
    if (!shouldMove || gameState != "game") {
      return;
    }

    // make a move
    p = getFirst(player)
    var path = astar(a, p)
    if (path) {
      a.x = path[1].x
      a.y = path[1].y
    } else {
      if (a.x > p.x && a.x-- != a.x) {
        return
      }
      if (a.y > p.y && a.y-- != a.y) {
        return
      }
      if (a.x < p.x && a.x++ != a.x) {
        return
      }
      if (a.y < p.y && a.y++ != a.y) {
        return
      }
    }
  });
}

// A* pathfinding algorithm implementation from github:adamstirtan/astar-js
function astar(start, end) {
  const openSet = [];
  const closedSet = [];
  openSet.push(start);

  while (openSet.length > 0) {
    // Find the node with the lowest total cost in the open set
    let currentNode = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < currentNode.f || (openSet[i].f === currentNode.f && openSet[i].h < currentNode.h)) {
        currentNode = openSet[i];
      }
    }

    // Remove the current node from the open set
    openSet.splice(openSet.indexOf(currentNode), 1);
    closedSet.push(currentNode);

    // If the current node is the goal, reconstruct the path
    if (currentNode.y === end.y && currentNode.x === end.x) {
      let path = [];
      let temp = currentNode;
      while (temp) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    // Generate neighbors of the current node
    const neighbors = [];
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ]; // Right, Down, Left, Up

    for (let dir of directions) {
      const neighborRow = currentNode.y + dir[0];
      const neighborCol = currentNode.x + dir[1];

      if (isValidCell(neighborRow, neighborCol)) {
        const neighbor = {
          y: neighborRow,
          x: neighborCol,
          g: currentNode.g + 1, // Cost to move to a neighboring cell is 1
          h: heuristic({ y: neighborRow, x: neighborCol }, end),
          f: 0,
          parent: currentNode,
        };

        neighbor.f = neighbor.g + neighbor.h;

        // Check if the neighbor is already in the closed set
        if (closedSet.some((node) => node.y === neighbor.y && node.x === neighbor.x)) {
          continue;
        }

        // Check if the neighbor is already in the open set
        const openSetNode = openSet.find((node) => node.y === neighbor.y && node.x === neighbor.x);
        if (!openSetNode || neighbor.g < openSetNode.g) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // No path found
  return null;
}

function isValidCell(y, x) {
  var potentialTile = getTile(x, y)
  if (!potentialTile || x > 9 || y > 7 || x < 0 || y < 0) {
    return false
  }
  if (potentialTile.length != 0 && potentialTile[0].type == wall) {
    return false
  }
  return true
}

function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);
  return d1 + d2;
}