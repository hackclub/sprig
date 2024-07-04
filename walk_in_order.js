/*
@title: Walk-In Order
@author: prwrit_
@tags: []
@addedOn: 2024-07-03

PLEASE READ HERE!

HOW TO PLAY:
"Walk-in Order" is a game where you will walk through mazes with colored blocks, 
which you have to step in order as stated on the top of your screen. Failure to do so
means you have to restart the level all over again at the beginning. As you advance through
the game, more colors will be introduced and more challenging mazes will follow.

Press K to start the game!

CONTROLS:
- Press W, A, S, D to move your character up, left, down, right, respectively.
- Press J if you are stuck and want to re-start the same level all over again.
- From now on, ONLY press K IF you want to start again at Level 0,
this is for use only if you for some reason want to reset, or have finished the whole game.

REMARKS:
- You are allowed to step in a colored block, and get out on the same side you entered in.
- You, however, are not allowed to step on the block of same color again after leaving one.

PLEASE ENJOY PLAYING!
and do report any bugs found in the game, it would help a lot! :)

*/

const player = "p";
const wall = "w";
const redblock = "r";
const orangeblock = "o";
const yellowblock = "y";
const greenblock = "g";
const blueblock = "b";
const purpleblock = "c";
const pinkblock = "d";
const brownblock = "e";
const checkmark = "x";
let ordercount = 0;
let prevX, prevY;
let shouldpunish = 0;
let movablestatus = 0;

// in-game music
const deadmelody = tune`
500: A4^500,
15500`;
const winmelody = tune`
500: E5^500,
15500`;
const congratsmelody = tune`
184.04907975460122: C5-184.04907975460122,
184.04907975460122: E5-184.04907975460122,
184.04907975460122: D5-184.04907975460122,
184.04907975460122: E5-184.04907975460122,
184.04907975460122: G5-184.04907975460122,
184.04907975460122: B5-184.04907975460122,
4785.2760736196315`;

setLegend(
  [ player, bitmap`
................
................
.....000000.....
...000....000...
...0........0...
..00........00..
..0..0....0..0..
..0..0....0..0..
..0..........0..
..0..........0..
..00.000000.00..
...0........0...
...000....000...
.....000000.....
................
................` ],
  [ wall,  bitmap`
0000000000000000
0LLLL0LLLLLLLL00
0LLL0LLLLLLLL0L0
0LL0LLLLLLLL0LL0
0L0LLLLLLLL0LLL0
00LLLLLLLL0LLLL0
0LLLLLLLL0LLLLL0
0LLLLLLL0LLLLLL0
0LLLLLL0LLLLLLL0
0LLLLL0LLLLLLLL0
0LLLL0LLLLLLLL00
0LLL0LLLLLLLL0L0
0LL0LLLLLLLL0LL0
0L0LLLLLLLL0LLL0
00LLLLLLLL0LLLL0
0000000000000000` ],
  [ redblock,  bitmap`
................
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
................` ],
  [ orangeblock,  bitmap`
................
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
................` ],
  [ yellowblock,  bitmap`
................
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
................` ],
  [ greenblock,  bitmap`
................
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
................` ],
  [ blueblock,  bitmap`
................
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
................` ],
  [ purpleblock,  bitmap`
................
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
................` ],
  [pinkblock,  bitmap`
................
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
................` ],
  [brownblock,  bitmap`
................
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
................` ],
  [checkmark, bitmap`
0000000000000000
00.............0
0.0............0
0..0...........0
0...0..........0
0....0.........0
0.....0........0
0......0.......0
0.......0......0
0........0.....0
0.........0....0
0..........0...0
0...........0..0
0............0.0
0.............00
0000000000000000` ],
)

const levels = [
  map`
...royg....
wwwwwwwwwww
wwgwwwwwwww
ww......www
wwwwwwwywww
wwo.....www
ww.wwwwwwww
wwr....pwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`, //level 0
  map`
...royg....
wwwwwwwwwww
wwwwwwwwwww
wwww....o.w
wwww.wwww.w
www..y.r..w
www.ww.wwww
www.gwpwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...royg....
wwwwwwwwwww
wwwp......w
wwwwwwgww.w
wwwo......w
wwwwwwwww.w
wwwy......w
wwwwwwwwwrw
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...royg....
wwwwwwwwwww
ww.wwpw...w
wwowwrw.w.w
ww......w.w
wwwwwwwww.w
www...w...w
wwwyw.w.w.w
ww..w...wgw
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...royg....
wwwwwwwwwww
wwp..w....w
ww.w.w.ww.w
wwwwrw.ww.w
ww...y..wgw
ww.wwww...w
ww...ww.w.w
wwww....wow
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygb...
wwwwwwwwwww
wwwwwwwwwww
ww.......ww
wwproygb.ww
ww.......ww
ww.......ww
ww.......ww
ww.......ww
wwwwwwwwwww
wwwwwwwwwww`,//level 5 - +blue
  map`
...roygb...
wwwwwwwwwww
wwp..w....w
ww.w.w.ww.w
wwwwrwbww.w
ww...y..wgw
ww.wwww...w
ww...ww.w.w
wwww....wow
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygb...
wwwwwwwwwww
w.o.w...w.w
wpw...wyw.w
w.r.w...w.w
ww.www.wwww
w...w...w.w
wbw.g.w.w.w
w...w...w.w
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygb...
wwwwwwwwwww
wo.w..w..ww
ww..wb.wy.w
www..w..w.w
wrww..w.g.w
w..ww..ww.w
ww..ww....w
www...www.w
wwwww....pw
wwwwwwwwwww`,
  map`
...roygb...
wwwwwwwwwww
w.w.....wyw
w.wow.w.w.w
w...w.w...w
w.www.www.w
w.www.www.w
wbw.....wrw
w.wgw.w.w.w
w...w.w..pw
wwwwwwwwwww`,
  map`
...roygb...
wwwwwwwwwww
wwwwwwwwwww
ww.r.....ww
ww.w.p.w.ww
ww.w.g.wbww
ww.o.....ww
ww.wwwwwyww
ww.......ww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygbc..
wwwwwwwwwww
wwwwwwwwwww
ww.r.c...ww
ww.w.p.w.ww
ww.w.g.wbww
ww.o.....ww
ww.wwwwwyww
ww.......ww
wwwwwwwwwww
wwwwwwwwwww`, //level 11 - +purple
  map`
...roygbc..
wwwwwwwwwww
w.........w
w.w.w.w.w.w
wow.w.w.w.w
w.w.w.w.w.w
w.wywbwgwcw
wrw.w.w.w.w
w.w.w.w.www
w....p....w
wwwwwwwwwww`,
  map`
...roygbc..
wwwwwwwwwww
w.........w
w.w.w.w.w.w
wow.w.w.w.w
w.w.w.w.w.w
w.wywgwbw.w
wrw.w.w.w.w
w.w.w.w.www
w....pc...w
wwwwwwwwwww`,
  map`
...roygbc..
wwwwwwwwwww
wb.......cw
wwwwwgwwwww
wg.......bw
wwwwwywwwww
wo.......gw
wwwwwrwwwww
wy.......ow
wwwwwpwwwww
wwwwwwwwwww`,
  map`
...roygbc..
wwwwwwwwwww
wp.r..o...w
w.wwwwwww.w
wrw.....wyw
w...www.w.w
w.wowgw.wgw
wyw.....w.w
w.w.wwwwwcw
w.b...b...w
wwwwwwwwwww`,
  map`
...roygbcd.
wwwwwwwwwww
w......c..w
wpwwrwwww.w
www..d..w.w
w.w.wwwbw.w
w.o.www...w
w.w...g.w.w
w.wwywwww.w
w.....w...w
wwwwwwwwwww`, //level 16 - +pink
  map`
...roygbcd.
wwwwwwwwwww
w.b.g.o.y.w
wbwcwywbwdw
w.b.o.r.c.w
wgwywrwgwcw
w.o.rpo.b.w
wgwgwrwgwrw
w.c.c.o.y.w
wdwgwcwcwdw
wwwwwwwwwww`,
  map`
...roygbcd.
wwwwwwwwwww
wwwwwwwwwww
w..c...g..w
wdwwwwwwwyw
w..d...ro.w
wwwwwpwwwww
w..r...c..w
wowwwwwww.w
w..y..g..bw
wwwwwwwwwww`,
  map`
...roygbcd.
wwwwwwwwwww
w.pw..y...w
w.wwowwww.w
w.r.....w.w
wwwwwww.b.w
w....gwowdw
w.w.www.w.w
w.w.w...wcw
wyw...w.b.w
wwwwwwwwwww`,
  map`
...roygbcd.
wwwwwwwwwww
wwwwwwwwwpw
w.........w
wrwwowwrwww
w....c....w
wwwywwgwwbw
w.........w
wdwwcwwywww
w....c....w
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w....p....w
w.wwwwwrw.w
wyw.....wcw
w.wowwwww.w
w....b....w
w.wwwwwww.w
w.w.e..d..w
wgw.wwwww.w
wwwwwwwwwww`, //level 21 - +brown
  map`
...roygbcde
wwwwwwwwwww
wp........w
wwwwwrwwwew
w......d..w
wowww.wwwww
w..y...g..w
wwwwwcwwwbw
w..e......w
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
wp........w
weg.y.b.rew
wg.od..o..w
w...g....bw
w.c...o.r.w
w.o.rb..c.w
wb........w
we.c.ogc.cw
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w....y.g..w
w.wpwwwww.w
w.w..c..wbw
w.wwwww.w.w
w..o..w...w
w.www.w.www
w..r..w...w
wwwwwwwewdw
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w.........w
wercocycgew
w....p....w
wdrdodydgdw
w.........w
wcrcocycgcw
w.........w
wcbcbcbcbcw
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w.r.o.r.r.w
wpo.g.y.c.w
w.y.o.b.o.w
w.o.y.y.r.w
w.r.g.r.c.w
w.o.e.d.o.w
w.e.o.r.c.w
w.o.r.y.r.w
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w.pw..o...w
w.ww.wwww.w
w.r..wg.w.w
wwwwwww.w.w
w..dwww.y.w
w.w..w..w.w
weww.wbww.w
w...c.....w
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
wwp......ww
wwrwwywwcww
ww.w..w..ww
ww.o..d..ww
ww.w..w..ww
ww.w..wwbww
ww.e..g..ww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w...c...d.w
w.p.o...y.w
w...e...o.w
wdrg.bob..w
w...b...r.w
w...r...y.w
w...g...c.w
w...o...b.w
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
we........w
wro.......w
w.gy...p..w
w..dc.....w
w...br....w
w....cd...w
w.....db..w
w......gr.w
wwwwwwwwwww`, //level 30 - final level
]

let level = 0

const startingscene = [map`
...........
...........
...........
...........
...........
...........
...roygbcde
wwwwwwwwwww
w.........w
w....p....w
wwwwwwwwwww`]
const finishingscene = [map`
...........
...........
...........
...........
...........
...........
...roygbcde
wwwwwwwwwww
w.........w
w....p....w
wwwwwwwwwww`]

setMap(startingscene[0]);
setSolids([player, wall]);
addText("Walk-In Order", {y: 2, color: color`3` });
addText("Press K to start", {y: 5, color: color`0` });

// player movement controls WASD
onInput("w", () => {
  if (movablestatus === 0) {
    // get previous position before moving
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
  
    //attempt movement
    getFirst(player).y -= 1;
  
    // check position after movement
    if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
      // if haven't moved, reset the position
      getFirst(player).x = prevX;
      getFirst(player).y = prevY;
      shouldpunish = 0;
    } else {
      // update previous position if player has moved
      prevX = getFirst(player).x;
      prevY = getFirst(player).y;
      shouldpunish = 1;
    }
  }
});

onInput("a", () => {
  if (movablestatus === 0) {
    // get previous position before moving
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
  
    //attempt movement
    getFirst(player).x -= 1;
  
    // check position after movement
    if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
      // if haven't moved, reset the position
      getFirst(player).x = prevX;
      getFirst(player).y = prevY;
      shouldpunish = 0;
    } else {
      // update previous position if player has moved
      prevX = getFirst(player).x;
      prevY = getFirst(player).y;
      shouldpunish = 1;
    }
  }
});

onInput("s", () => {
  if (movablestatus === 0) {
    // get previous position before moving
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
  
    //attempt movement
    getFirst(player).y += 1;
  
    // check position after movement
    if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
      // if haven't moved, reset the position
      getFirst(player).x = prevX;
      getFirst(player).y = prevY;
      shouldpunish = 0;
    } else {
      // update previous position if player has moved
      prevX = getFirst(player).x;
      prevY = getFirst(player).y;
      shouldpunish = 1;
    }
  }
});

onInput("d", () => {
  if (movablestatus === 0) {
    // get previous position before moving
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
  
    //attempt movement
    getFirst(player).x += 1;
  
    // check position after movement
    if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
      // if haven't moved, reset the position
      getFirst(player).x = prevX;
      getFirst(player).y = prevY;
      shouldpunish = 0;
    } else {
      // update previous position if player has moved
      prevX = getFirst(player).x;
      prevY = getFirst(player).y;
      shouldpunish = 1;
    }
  }
});

// reset level if stuck
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    ordercount = 0;
    addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });
  }
});

// in case you want to start all over again, or you have finished the game
onInput("k", () => {
  clearText("");
  ordercount = 0;
  setMap(levels[0]);
  level = 0;
  addText(`Level: 0`, { x: 2, y: 2, color: color`2` });
});

// WILL FIX LATER function for character blinking (after dying in the game)
function blinkCharacter(duration) {
  let blinkCount = duration / 500;
  let blinkInterval = setInterval(() => {
    player.visible = !player.visible;
    blinkCount--;
    if (blinkCount <= 0) {
      clearInterval(blinkInterval);
    }
  }, 500);
}

//check every after input
afterInput(() => {
  const playerSprite = getFirst(player);
  const redBlockTiles = tilesWith(redblock);
  const orangeBlockTiles = tilesWith(orangeblock);
  const yellowBlockTiles = tilesWith(yellowblock);
  const greenBlockTiles = tilesWith(greenblock);
  const blueBlockTiles = tilesWith(blueblock);
  const purpleBlockTiles = tilesWith(purpleblock);
  const pinkBlockTiles = tilesWith(pinkblock);
  const brownBlockTiles = tilesWith(brownblock);
  const currentLevel = levels[level];
  const checkmarkblock = checkmark;

  // Check if the player is on a red block
  redBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 0 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        blinkCharacter(2000);
        movablestatus = 1;
        setTimeout(() => {
          setMap(currentLevel);
          ordercount = 0;
          movablestatus = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          clearTile(3, 0);
          addSprite(3, 0, checkmark);
          ordercount++;
        }
      }
    }
  });

  //check if on orange block
  orangeBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 1 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        blinkCharacter(1000);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          clearTile(4, 0);
          addSprite(4, 0, checkmark);
          ordercount++;
        }
      }
    }
  });

  //check if on yellow block
  yellowBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 2 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          clearTile(5, 0);
          addSprite(5, 0, checkmark);
          ordercount++;
        }
      }
    }
  });

  //check if on green block
  greenBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 3 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          clearTile(6, 0);
          addSprite(6, 0, checkmark);
          ordercount++;
          
          // check if this level introduces blue blocks yet?
          if (tilesWith(blueblock).length == 0) {
            if ((level+1) < levels.length) {
              playTune(winmelody);
              level++;
              movablestatus = 1;
              setTimeout(() => {
                movablestatus = 0;
                setMap(levels[level]);
                ordercount = 0;
              }, 1000); // Set the map to the next level if no blue blocks
              clearText(); 
              addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });
              ordercount = 0;
            }
          }
        }
      }
    }
  });

  //check if on blue block
  blueBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 4 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          clearTile(7, 0);
          addSprite(7, 0, checkmark);
          // check if this level introduces purple blocks yet?
          if (tilesWith(purpleblock).length == 0) {
            if ((level+1) < levels.length) {
              playTune(winmelody);
              level++;
              movablestatus = 1;
              setTimeout(() => {
                movablestatus = 0;
                setMap(levels[level]);
                ordercount = 0;
              }, 1000); // Set the map to the next level if no purple blocks
              clearText(); 
              addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });
              ordercount = 0;
            }
          }
        }
      }
    }
  });

  //check if on purple block
  purpleBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 5 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          clearTile(8, 0);
          addSprite(8, 0, checkmark);
          // check if this level introduces pink blocks yet?
          if (tilesWith(pinkblock).length == 0) {
            if ((level+1) < levels.length) {
              playTune(winmelody);
              level++;
              movablestatus = 1;
              setTimeout(() => {
                movablestatus = 0;
                setMap(levels[level]);
                ordercount = 0;
              }, 1000); // Set the map to the next level if no pink blocks
              clearText(); 
              addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });
              ordercount = 0;
            }
          }
        }
      }
    }
  });

  pinkBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 6 && shouldpunish === 1) {
        // Reset the player to the start position
        playTune(deadmelody);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          clearTile(9, 0);
          addSprite(9, 0, checkmark);
          // check if this level introduces brown blocks yet?
          if (tilesWith(brownblock).length == 0) {
            if ((level+1) < levels.length) {
              playTune(winmelody);
              level++;
              movablestatus = 1;
              setTimeout(() => {
                movablestatus = 0;
                setMap(levels[level]);
                ordercount = 0;
              }, 1000); // Set the map to the next level if no brown blocks
              clearText(); 
              addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });
              ordercount = 0;
            } 
          }
        }
      }
    }
  });

  brownBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 7 && shouldpunish === 1) {
        // Reset the player to the start positions
        playTune(deadmelody);
        movablestatus = 1;
        setTimeout(() => {
          movablestatus = 0;
          setMap(currentLevel);
          ordercount = 0;
        }, 1000);
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          clearTile(10, 0);
          addSprite(10, 0, checkmark);
            if ((level+1) < levels.length) {
              playTune(winmelody);
              level++;
              movablestatus = 1;
              setTimeout(() => {
                movablestatus = 0;
                setMap(levels[level]);
                ordercount = 0;
              }, 1000);
              clearText(); 
              addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });
              ordercount = 0;
            } else {
              clearText();
              setMap(finishingscene[0]);
              playTune(congratsmelody);
              addText("Congratulations!", { y: 2, color: color`3` });
              addText("You finished!", { y: 4, color: color`3` });
              addText("K to start over", { y: 6, color: color`0` });
            }
          
        }
      }
    }
  });

  // display level count text on screen
  // addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });

  prevX = getFirst(player).x;
  prevY = getFirst(player).y;
  
  // these are mostly for debugging purposes, to see the variables.
  //addText(`punish: ${shouldpunish} count: ${ordercount}`, { x: 2, y: 14, color: color`2` });
  //addText(`prevX: ${prevX} prevY: ${prevY}`, { x: 2, y: 15, color: color`2` });

});