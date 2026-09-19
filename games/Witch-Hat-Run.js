
/* 
@title: Witch Hat Run
@description: You play as a mischievous witch's hat trying to find Salem (the Witch's cat) in the labyrinth of the Witch's home! Maneuver your way through the mystical and magical obstacles and travel through the mysterious cauldrons to try to get to Salem! Good luck!
@author: Nathan LC
@tags: ['game','maze','puzzle','strategy','rpg']
@addedOn: 2026-07-02
*/

    const player = "p"
    const wall = "w"
    const goal = "g"
    const key = "k"
    const lock = "l"
    const box = "b"
    const Rportal = "R"
    const Gportal = "G"
    const cat = "c"
    const endcat1 = "A"
    const endcat2 = "B"
    const endcat3 = "C"
    const endcat4 = "D"
    const endcat5 = "E"
    const redx = "X"
    const melody = tune`
500: C4~500,
15500`

    const victory = tune`
167.5977653631285: D4-167.5977653631285 + C4~167.5977653631285 + A4-167.5977653631285,
167.5977653631285: F4-167.5977653631285 + C4^167.5977653631285,
167.5977653631285: D4-167.5977653631285 + C4~167.5977653631285 + A4-167.5977653631285,
167.5977653631285: F4-167.5977653631285 + C4^167.5977653631285,
167.5977653631285: C5-167.5977653631285 + C4~167.5977653631285,
167.5977653631285: A4-167.5977653631285 + C4^167.5977653631285,
167.5977653631285: C5-167.5977653631285 + C4~167.5977653631285,
167.5977653631285: A4-167.5977653631285 + C4^167.5977653631285,
167.5977653631285: C4~167.5977653631285,
167.5977653631285: C4^167.5977653631285,
167.5977653631285: D5-167.5977653631285 + C4~167.5977653631285,
167.5977653631285: F5-167.5977653631285 + C4^167.5977653631285,
167.5977653631285: D5-167.5977653631285 + C4~167.5977653631285,
167.5977653631285: C5-167.5977653631285 + C4^167.5977653631285,
167.5977653631285: A4-167.5977653631285 + C4~167.5977653631285,
167.5977653631285: A4-167.5977653631285 + C4^167.5977653631285,
2681.564245810056`

setLegend(
	[ endcat1, bitmap`
2220000022222222
2205555500222222
2055555555002222
2055555555502222
2200555555502222
2220055555500222
2222055555550222
2220055550000222
2220550000660002
2220006666666602
2200666666660000
2206666600000550
2000000000555550
0555555555555500
0055555555550002
2000000000000000` ],
	[ endcat2, bitmap`
0000000000000000
0000000000066000
0066666006666600
0660006006000660
0660006606000060
0660000606600060
0660000606600060
0660000606600060
0660666606666660
0066606606000660
0066000000000660
0000003000300000
0000003333300000
2000000333000000
2000000000000000
2200000000000022` ],
  [ redx, bitmap`
33............33
333..........333
.333........333.
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
.333........333.
333..........333
33............33` ],
	[ endcat3, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ endcat5, bitmap`
2222222222222222
2222222222222222
2222222222222222
0222222222222222
0222222222222222
0222222222222222
0022222222222222
0022222222222222
0022222222222222
0022222222222222
0022222222222222
0022222222222222
0022222222222222
0222222222222222
2222222222222222
2222222222222222`],
  [ lock, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666000000006666
6666066666606666
6666066666606666
6666066666606666
6600000000000066
6606666666666066
6606660000666066
6606660000666066
6606666006666066
6606666006666066
6606666666666066
6600000000000066
6666666666666666` ],
  [ Rportal, bitmap`
................
.....111111.....
...1133333311...
..133333333331..
..133332333331..
.13332233333331.
.13332333333331.
.13323333333331.
.13333333333231.
.13333333333331.
.13333333332331.
.13333333223331.
.13333332233331.
.13333333333331.
.11111111111111.
................` ],
  [ Gportal, bitmap`
................
.....111111.....
...1144444411...
..144444444441..
..144442444441..
.14442244444441.
.14442444444441.
.14424444444441.
.14444444444241.
.14444444444441.
.14444444442441.
.14444444224441.
.14444442244441.
.14444444444441.
.11111111111111.
................`],
  [ wall, bitmap`
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999`],
[ cat, bitmap`
.0.....0........
.00...00........
.0000000........
.0600060........
.0600060........
.0003000........
..00000....00...
...000.....00...
...000......00..
...0000.....00..
...0000......00.
...00000.....00.
..0000000...000.
..000000000000..
.000000000000...
.000000000......` ],
  [ key, bitmap`
................
................
................
................
.....6666666....
....6.......6...
....6.......6...
....6.......6...
.....6666666....
........6.......
.......66.......
........6.......
.......66.......
........6.......
.......66.......
................`],
[ endcat4, bitmap`
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
2222222222222222` ],
[ player, bitmap`
..0000..........
.05555000.......
0555555500......
.0055555550.....
..0555555550....
...055555550....
...0555555500...
...0555555550...
...0555555500...
...0000000060...
..066666066660..
.00066666666000.
0055000000000550
..0555555555550.
...05555555500..
....00000000....` ],
	[ goal, bitmap`
................
................
................
....00000000....
...0444444440...
..044444444440..
.0L0444444440L0.
.0LL00000000LL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
..0LLLLLLLLLL0..
...0000000000...
................
................` ],
[ box, bitmap`
9999999999999999
99CCCCCCCCCCCC99
9C9CCCCCCCCCC9C9
9CC9CCCCCCCC9CC9
9CCC99999999CCC9
9CCC99999999CCC9
9CCC99CCCC99CCC9
9CCC99CCCC99CCC9
9CCC99CCCC99CCC9
9CCC99CCCC99CCC9
9CCC99999999CCC9
9CCC99999999CCC9
9CC9CCCCCCCC9CC9
9C9CCCCCCCCCC9C9
99CCCCCCCCCCCC99
9999999999999999` ]
)





const levels = [
    map`
    wwwwwww
    wp....w
    w.....w
    w....gw
    wwwwwww
    `,
    map`
    wwwwwww
    w...pkw
    w.wwwww
    w..l..w
    wwwww.w
    wg....w
    wwwwwww
    `,
    map`
    wwwwwww
    w..b.pw
    w..wwww
    w..wwww
    w..wwww
    w....gw
    wwwwwww
    `,
    map`
    wwwwwww
    w.Rw.gw
    w..w..w
    w..w..w
    wp.wG.w
    wwwwwww
    `,
    map`
    wwwwwww
    wp..lRw
    w.wwwww
    w.w..gw
    wkwG..w
    wwwwwww
    `,
    map`
    wwwwwwww
    ww.wwwww
    ww...lgw
    ww.wwwww
    ww.wpb.w
    wwbww.ww
    w...b.kw
    wwwwwwww
    `,
    map`
    wwwwwwwwww
    wp......Rw
    wwwwwwwwww
    wG......gw
    wwwwwwwwww
    `,
    map`
    wwwwwwwwwwwwww
    wpb...b......w
    ww...www...w.w
    wwwwwwwwwwww.w
    wwwwwwwwww...w
    wR........b..w
    wwwwwwwwww.www
    wwwwwwwwwwwwww
    wG..........gw
    wwwwwwwwwwwwww
    `,
    map`
    wwwwwwwwwwwwwww
    wp............w
    wwwwwwwwwwwww.w
    w...........w.w
    w.wwwwwwwww.w.w
    w.wg........w.w
    w.wwwwwwwwwww.w
    w.............w
    wwwwwwwwwwwwwww
    `,
    map`
    wwwwwwwwwwwwwww
    wpb..........Xw
    wwwwwwwwwwwwwww
    wG........gwRww
    wwwwwwwwwwwwwww
    `,
    map`
    wwwwwwwwwwwwwww
    wG............w
    wwwwwwwwwwwww.w
    w...w...w...w.w
    w.w.w.w.w.w.w.w
    w.w...w...w...w
    w.wwwwwwwwwwwww
    w.........pwRgw
    wwwwwwwwwwwwwww
    `,
    map`
    wwwwwwwwwwwwwww
    wp.lgw..b.w...w
    wwbwwwwkw.w.w.w
    ww.ww.www...w.w
    ww.ww...wwwww.w
    ww.ww.w.w...wRw
    ww.ww.w.w.w.www
    ww.ww.w.w.w..ww
    ww...bw.w.ww..w
    ww.w..w...wwwGw
    wwwwwwwwwwwwwww
    `,
    map`
    wwwwwwwwwwwwwwwwww
    wwwwww...www...www
    wp..w..w..w..w..cw
    www...www...wwwwww
    wwwwwwwwwwwwwwwwww
    `,
    map`
    DAD
    CBE
    `]

let level = 0;
const currentLevel = levels[level];
setMap(currentLevel);


setSolids([ player, wall, box, lock]);
  
setPushables({
	[ player ]: [box]
})

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(melody)
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(melody)
});

onInput("w", () => {
  getFirst(player).y -= 1; //
  playTune(melody)
});

onInput("a", () => {
  getFirst(player).x -= 1; //
  playTune(melody)
});

onInput("i", () => {
  setMap(levels[level])
});

// these get run after every input
afterInput(() => {
  const goalsCovered = tilesWith(player, goal); 
  const catReached = tilesWith(player, cat);

  // If player reaches a goal, go to next level
  if (goalsCovered.length >= 1) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level]);
    }
  }

  // Final level victory condition (Player touches Cat)
  if (catReached.length >= 1) {
      level = level + 1;
        if (level < levels.length) {
        setMap(levels[level]);}
      addText("you win!", { y: 4, color: color`H` });
      playTune(victory);
      setInterval(() => {
        playTune(victory);
      }, 2740);
  }
    
  // Key mechanics for specific levels
  if (level == 1) {
    const keyCovered = tilesWith(player, key);
    if (keyCovered.length >= 1) {
      clearTile(3,3);
      clearTile(5,1);
      addSprite(5,1, player);
    }
  }

  if (level == 4) {
    const keyCovered = tilesWith(player, key);
    if (keyCovered.length >= 1) {
      clearTile(4,1);
      clearTile(1,4);
      addSprite(1,4, player);
    }
  }
    
  if (level == 5) {
    const keyCovered = tilesWith(player, key);
    if (keyCovered.length >= 1) {
      clearTile(5,2);
      clearTile(6,6);
      addSprite(6,6, player);
    }
  }

  if (level == 9) {
    const XCovered = tilesWith(redx, box);
    if (XCovered.length >= 1) {
        clearTile(13,1)
        addSprite(13,1, box)
        clearTile(12,2)
        }
    }

  if (level == 11) {
    const keyCovered = tilesWith(player, key);
    if (keyCovered.length >= 1) {
      clearTile(3,1);
      clearTile(7,2);
      addSprite(7,2, player);
    }
  }
  
    
  // Portals (Using 'else if' to prevent infinite loop crashes)
  const redPortalsCovered = tilesWith(player, Rportal);
  const greenPortalsCovered = tilesWith(player, Gportal);

  if (redPortalsCovered.length >= 1) {
    const gp = getFirst(Gportal);
    const pl = getFirst(player);
    pl.x = gp.x;
    pl.y = gp.y;
  } else if (greenPortalsCovered.length >= 1) {
    const rp = getFirst(Rportal);
    const pl = getFirst(player);
    pl.x = rp.x;
    pl.y = rp.y;
  }
});



function checkForPlayer(x,y) { // this function accepts two paramaters: x & y
  let result = false
  getTile(x,y).map((tile) => { // .map runs the block of code between the brackets for every element in the array returned by getTile()
    if (tile.type == player)
      result = true
  })
  return result // this function returns true only if there is a player at (x,y)
}

let up = false

setInterval(() => {
    if (level == 2) { // run different code depending on the level
        if (up) { // run code depending on where the obstacle is
            if (!(checkForPlayer(1,2) || checkForPlayer(2,2)))  { // only run code if there isn't a player in the way
                addSprite(1,2, wall)
                addSprite(2,2,wall)
                clearTile(1,4)
                clearTile(2,4)
                up = false // switch the variable to the opposite state
            }
        } else {
            if (!(checkForPlayer(1,4) || checkForPlayer(2,4))) {
                addSprite(1,4, wall)
                addSprite(2,4,wall)
                clearTile(1,2)
                clearTile(2,2)
                up = true
            }
        }
    }
}, 500)

setInterval(() => {
    if (level == 6) { // run different code depending on the level
        if (up) { // run code depending on where the obstacle is
            if (!(checkForPlayer(3,1) || checkForPlayer(6,3)))  { // only run code if there isn't a player in the way
                addSprite(3,1, wall)
                addSprite(6,3, wall)
                clearTile(5,1)
                clearTile(4,3)
                up = false // switch the variable to the opposite state
            }
        } else {
            if (!(checkForPlayer(5,1) || checkForPlayer(4,3))) {
                addSprite(5,1, wall)
                addSprite(4,3,wall)
                clearTile(3,1)
                clearTile(6,3)
                up = true
            }
        }
    }
}, 500)
