/*
@title: Morph-Madness
@author: SimonDMC
@tags: ['puzzle']
@addedOn: 2024-02-21
*/

/////////////////////////////////////////////////////////////////////////////////////////
//  __  __                  _         __  __           _                     
// |  \/  |                | |       |  \/  |         | |                    
// | \  / | ___  _ __ _ __ | |__     | \  / | __ _  __| |_ __   ___  ___ ___ 
// | |\/| |/ _ \| '__| '_ \| '_ \    | |\/| |/ _` |/ _` | '_ \ / _ \/ __/ __|
// | |  | | (_) | |  | |_) | | | |   | |  | | (_| | (_| | | | |  __/\__ \__ \
// |_|  |_|\___/|_|  | .__/|_| |_|   |_|  |_|\__,_|\__,_|_| |_|\___||___/___/
//                   | |                                                     
//                   |_|                                                     
// 
// HOW TO PLAY:
// 
// You play as a player who can morph into a bat.
// The PLAYER can push blocks, but cannot pass through walls.
// The BAT can pass through anything, but cannot push blocks.
// 
// BLACK  BLOCKS can be pushed. 
// YELLOW BLOCKS morph you between a player and a bat.
// GREEN  BLOCKS are the goals.
// 
// You move onto the NEXT LEVEL by COVERING ALL GOALS with pushable blocks.
// 
// 
// 
// CONTROLS:
// 
// WASD - Movement
// K    - Select Level
// J    - Restart Level
// 
/////////////////////////////////////////////////////////////////////////////////////////

// KEYBINDS
const keybind_UP = "w";
const keybind_DOWN = "s";
const keybind_LEFT = "a";
const keybind_RIGHT = "d";
const keybind_SELECT = "k";
const keybind_RESTART = "j";

const player = "p";
const bat = "b";
const wall = "w";
const block = "t"; // as in tile? b is taken
const morpher = "m";
const goal = "g";
const unselected = "u";
const selected = "s";
const l1 = "1";
const l2 = "2";
const l3 = "3";
const l4 = "4";
const l5 = "5";
const l6 = "6";
const l7 = "7";
const l8 = "8";

setLegend(
  [ player, bitmap`
................
................
...0000000000...
..00........00..
..0..........01.
..0..0....0..01.
..0..0....0..01.
..0..0....0..01.
..0..........01.
..0...0..0...01.
..0....00....01.
..0..........01.
..00........001.
...000000000011.
....1111111111..
................` ],
  [ bat, bitmap`
................
................
................
................
................
......0..0......
.000..0000..000.
..000.9009.000..
...0000000000...
....00000000....
......0000......
.......00.......
................
................
................
................` ],
  [ wall, bitmap`
.00000000000000.
00..0..0..0..000
0..0..0..0..0..0
0.0..0..0..0..00
00..0..0..0..0.0
0..0..0..0..0..0
0.0..0..0..0..00
00..0..0..0..0.0
0..0..0..0..0..0
0.0..0..0..0..00
00..0..0..0..0.0
0..0..0..0..0..0
0.0..0..0..0..00
00..0..0..0..0.0
00.0..0..0..0.00
.00000000000000.` ],
  [ block, bitmap`
.00000000000000.
00............00
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
00............00
.00000000000000.` ],
  [ morpher, bitmap`
.66666666666666.
66............66
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
66............66
.66666666666666.` ],
  [ goal, bitmap`
.DDDDDDDDDDDDDD.
DD............DD
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
D..............D
DD............DD
.DDDDDDDDDDDDDD.` ],
  [ unselected, bitmap`
................
..000000000000..
.00..........00.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.00..........00.
..000000000000..
................` ],
  [ selected, bitmap`
.00000000000000.
0077777777777700
077..........770
07............70
07............70
07............70
07............70
07............70
07............70
07............70
07............70
07............70
07............70
077..........770
0077777777777700
.00000000000000.` ],
  [ l1, bitmap`
................
................
................
.......00.......
......000.......
.....0000.......
....00000.......
....00.00.......
.......00.......
.......00.......
.......00.......
....00000000....
....00000000....
................
................
................` ],
  [ l2, bitmap`
................
................
................
.....000000.....
....00000000....
....00....00....
.........000....
........000.....
.......000......
......000.......
.....000........
....00000000....
....00000000....
................
................
................` ],
  [ l3, bitmap`
................
................
................
.....000000.....
....00000000....
....00....00....
..........00....
........000.....
........000.....
..........00....
....00....00....
....00000000....
.....000000.....
................
................
................` ],
  [ l4, bitmap`
................
................
................
.........00.....
........000.....
.......0000.....
......00000.....
.....000.00.....
....000..00.....
....00000000....
....00000000....
.........00.....
.........00.....
................
................
................` ],
  [ l5, bitmap`
................
................
................
....00000000....
....00000000....
....00..........
....00..........
....0000000.....
.....0000000....
..........00....
....00....00....
....00000000....
.....000000.....
................
................
................` ],
  [ l6, bitmap`
................
................
................
.......0000.....
.....000000.....
....0000........
....00..........
....0000000.....
....00000000....
....00....00....
....00....00....
....00000000....
.....000000.....
................
................
................` ],
  [ l7, bitmap`
................
................
................
....00000000....
....00000000....
..........00....
.........000....
........000.....
.......000......
.......00.......
.......00.......
.......00.......
.......00.......
................
................
................` ],
  [ l8, bitmap`
................
................
................
.....000000.....
....00000000....
...000....000...
...000....000...
....00000000....
....00000000....
...000....000...
...000....000...
....00000000....
.....000000.....
................
................
................` ],
)

setSolids([player, wall, block])

setPushables({
  [ player ]: [ block ],
  [ block ]: [ block]
})

let level = 1;
let onTitleScreen = true;
const levels = [
  map`
.........
.........
.........
.1.2.3.4.
.........
.5.6.7.8.
.........`, // menu/title screen
  map`
...w..
.g.t..
...w..
wwww..
..mw..
p..w.m`, // level 1
  map`
m......
.......
wwtw.g.
...w...
...wwww
.p.....
......m`, // level 2
  map`
.g....g.
..wwwww.
......w.
..w.ttww
..w.....
.mwp....
wmw...mm`, // level 3
  map`
...t.t...
...w.w...
...wpw...
twwwtwwwt
...tmt...
twwwtwwwt
...w.w...
...wgw...
...t.t...`, // level 4
  map`
..wwwww.ww
..w....tww
..wt.mw...
..wt.wwww.
...p..ggw.
..www.www.
..gw..t...
m.ww......`, // level 5
  map`
www.....www
mg..t.t..mg
www.....www
..wwwwwww..
www.....www
gm..tpt..gm
www.....www
..wwwwwww..
www.....www
mg..t.t..mg
www.....www`, // level 6
  map`
.wmg...gmw.
.www.p.www.
...w...w...
...wtttw...
.m.wtttw.m.
...w.w.w...
..ww...ww..
..wm...mw..
..ww.g.ww..
..wg.g.gw..
..wwwwwww..`, // level 7
  map`
...wgw..
..tw.ww.
.wtt..gw
.pttm.w.
.w.w.gw.
.w.w.w..
mwgwgw..`, // level 8
  map`
mmmmmmmmm
m.......m
m.......m
m.ttttt.m
m.t...t.m
m.t.p.t.m
m.t...t.m
m.ttttt.m
mmmmmmmmm`, // win screen
]

renderTitle();

// create sounds
const moveSound = tune`
100: C4~100,
3100`;
const goalSound = tune`
83.33333333333333: C5~83.33333333333333,
83.33333333333333: E5~83.33333333333333,
83.33333333333333: G5~83.33333333333333,
2416.6666666666665`;
const resetSound = tune`
83.33333333333333: B4~83.33333333333333,
83.33333333333333: B4~83.33333333333333,
2500`;
const morphToBatSound = tune`
83.33333333333333: D5^83.33333333333333,
83.33333333333333: C5^83.33333333333333,
2500`;
const morphToPlayerSound = tune`
83.33333333333333: C5^83.33333333333333,
83.33333333333333: G5^83.33333333333333,
2500`;
const selectSound = tune`
83.33333333333333: C4^83.33333333333333,
83.33333333333333: D4^83.33333333333333,
2500`;
const winSound = tune`
83.33333333333333: C5^83.33333333333333,
83.33333333333333: A4^83.33333333333333,
83.33333333333333: C5^83.33333333333333,
166.66666666666666,
83.33333333333333: C5^83.33333333333333,
333.3333333333333,
83.33333333333333: D5^83.33333333333333,
83.33333333333333: C5^83.33333333333333,
83.33333333333333: D5^83.33333333333333,
166.66666666666666,
83.33333333333333: D5^83.33333333333333,
333.3333333333333,
83.33333333333333: G5^83.33333333333333,
83.33333333333333: G5^83.33333333333333,
83.33333333333333: G5^83.33333333333333,
166.66666666666666,
83.33333333333333: G4^83.33333333333333,
83.33333333333333: A4^83.33333333333333,
83.33333333333333: B4^83.33333333333333,
166.66666666666666,
83.33333333333333: C4~83.33333333333333 + C5^83.33333333333333,
83.33333333333333`;

onInput(keybind_DOWN, () => {
  if (onTitleScreen) return;
  (getFirst(player) || getFirst(bat)).y += 1;
  moved();
});

onInput(keybind_RIGHT, () => {
  if (onTitleScreen) return;
  (getFirst(player) || getFirst(bat)).x += 1;
  moved();
});

onInput(keybind_UP, () => {
  if (onTitleScreen) return;
  (getFirst(player) || getFirst(bat)).y -= 1;
  moved();
});

onInput(keybind_LEFT, () => {
  if (onTitleScreen) return;
  (getFirst(player) || getFirst(bat)).x -= 1;
  moved();
});

// after any move
// not in afterInput because you could invoke another morph by pressing an unused key
function moved() {
  // check for morph
  const playerToBat = tilesWith(player, morpher).length == 1;
  const batToPlayer = tilesWith(bat, morpher).length == 1;
  if (playerToBat) {
    // morph and remove tile
    const playerSprite = getFirst(player);
    playerSprite.type = bat;
    getTile(playerSprite.x, playerSprite.y).forEach((sprite) => {
      if (sprite.type == morpher) sprite.remove();
    });
    playTune(morphToBatSound);
  } else if (batToPlayer) {
    // morph and remove tile
    const batSprite = getFirst(bat);
    batSprite.type = player;
    getTile(batSprite.x, batSprite.y).forEach((sprite) => {
      if (sprite.type == morpher) sprite.remove();
    });
    playTune(morphToPlayerSound);
  } else {
    // only play move sound if no morph
    playTune(moveSound);
  }
}

// select level
onInput(keybind_SELECT, () => {
  if (!onTitleScreen) return;
  // render next level
  setMap(levels[level]);
  // clear title text
  clearText();
  onTitleScreen = false;
  playTune(selectSound);
})

// reset level
onInput(keybind_RESTART, () => {
  if (!onTitleScreen) {
    // rerender current level
    setMap(levels[level]);
    playTune(resetSound);
  }
  ////////// THIS IS ONLY FOR TESTING LEVELS //////////
  /*else {
    level++;
    renderTitle()
  }*/
})

// render title screen
function renderTitle() {
  onTitleScreen = true;
  setMap(levels[0])
  addText("MORPH", {
    x: 7,
    y: 3,
    color: color`0`
  })
  addText("MADNESS", {
    x: 6,
    y: 4,
    color: color`0`
  })
  for (let y = 3; y <= 5; y += 2) {
    for (let x = 1; x <= 7; x += 2) {
      // figure out whether to render selected or unselected
      // basically converts x and y to level number
      const isSelected = (y-3)*2+(x-1)/2+1 == level;
      addSprite(x, y, isSelected ? selected : unselected)
    }
  }
}


afterInput(() => {
  // check for goal
  const reachedGoal = tilesWith(goal).length == tilesWith(block, goal).length;
  if (reachedGoal && !onTitleScreen && level <= 8) {
    level++;
    if (level != 9) {
      // increment level and go back to title screen
      renderTitle();
      playTune(goalSound);
    } else {
      // or go to win screen if that was the last level
      setMap(levels[9]);
      playTune(winSound);
      addText("YOU WIN!", {
        x: 6,
        y: 3,
        color: color`0`
      });
    }
  } 
})
