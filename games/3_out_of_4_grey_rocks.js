/*
@title: 3 out of 4 grey rocks
@description: Push rocks onto pedestal to go to the next level. Until you reach the end
@author: NotDoodlez (Atharv)
@tags: ['puzzle']
@addedOn: 2026-03-13
*/

// define the sprites in our game
const player = "p";
const rock = "b";
const goal = "g";
const wall = "w";
const spike = "n";
const background = "e";
const togglewall = "q";
const shadedwall = "z";
const togglebutton = "x";

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
...00000000.....
..0066666660....
..06666666660...
.006000600060...
.066666666660...
.0666666666600..
0066666666666000
.0666666666660..
.0660000066660..
.0666666666660..
.0066666666660..
..006666666600..
...0000000000...
.....0....0.....
.....0....0.....`],
  [rock, bitmap `
....00000.......
...0L11110......
...01111110.....
..0L11111L0.....
.0L11111LL0.....
.011111LLLL000..
.01111LLLLL1110.
0111LLLLL11111L0
0111111111111LL0
0L1111111111LLL0
01L11111111LLLL0
01L1L1L1LLLLLLL0
01L1L1L1LLLLLLL0
.0L1L1L1LLLLLL0.
..00L1L1LLLL00..
....00000000....`], //this is the 3 out of grey rocs pls rememeber
  [goal, bitmap`
0000000000000000
0111111111111110
01LLLLLLLLLLLL10
01L1111111111L10
01L1111111111L10
01L1111111111L10
01L1111111111L10
01L1111111111L10
01L1111111111L10
01L1111111111L10
01L1111111111L10
01L1111111111L10
011L11111111L110
0111LLLLLLLL1110
0011111111111100
0000000000000000`],
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
  [spike, bitmap`
.......00.......
......0330......
......0330......
.....033330.....
.....033330.....
....03333330....
....03333330....
...0333333330...
...0333333330...
..033333333330..
..033333333330..
.03333333333330.
.03333333333330.
0333333333333330
0333333333333330
.00000000000000.`],
  [background, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [shadedwall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [togglewall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [togglebutton, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LL3333333333LL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1111111111111111`],
);

// create game levels
let level = 0; // this tracks the level we are on
addText("3 out of 4", { x: 5, y: 2, color: color`0` });
addText("grey rocks", { x: 5, y: 3, color: color`0` });
addText("(recommend you push", { x: 1, y: 9, color: color`0` });
addText("them)", { x: 7, y: 10, color: color`0` });
addText("By Atharv Dhiman", { x: 2, y: 5, color: color`0` });
addText("Tap i to continue", { x: 2, y: 13, color: color`0` });

const levels = [
  map`
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................`,
  map`...`,
  map`
........
........
........
........
........
........`,
  map`
.......
..b..g.
.......
..b..g.
.......
..b..g.
p......`,
  map`
...w.p.
...w...
.b.w...
.......
...w...
...w...
...w..g`,
  map`
.......
..p....
.......
...ngn.
....n..
.....b.
.......`,
  map`
wwwwwwwww
wp......w
wwbwwwn.w
ww.wwww.w
ww.wz...w
ww.wz.wgw
wz.ww.www
wz....www
wwwwzzwww`,
  map`
.....qg
.x...qq
.......
.......
...b...
.p.....
.......`,
  map`
p.w.
.bwg
....
..bg`,
  map`
wwwwwwwwwww
wxzzz.wwwww
p..ww.wwwww
zwbw..wwwww
.w.z.wwwwww
.wwwnwwwzzw
.n.wwzq...w
....zzqn..w
..n.wzqn..w
....wwwwwqw
.n.....wwgw
.......bzww
....n...zww`,
  map`
wwwwwwwwwww
wp....b..gw
w.wqwzw.w.w
w.b.qxw.b.w
w.w.wzw.w.w
w..n....n.w
w.w.wzw.w.w
w.b.qzz.b.w
w.w.wzw.w.w
wg..b..n..w
wwwwwwwwwww`,
    map`
.......
.......
.......
.......
.......
.p.....
.......`,
];
let deaths = 0;

setBackground([background])
// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

onInput("i", () => {
  playTune(death);
  clearText()
  if (level == 0) {
    level++;
    addText("WASD to move.", { x: 4, y: 3, color: color`0` });
    addText("J to restart level.", { x: 1, y: 4, color: color`0` });
    addText("Push the box", { x: 4, y: 6, color: color`0` });
    addText("to the button.", { x: 4, y: 7, color: color`0` });
    addText("Tap i to continue", { x: 2, y: 13, color: color`0` });
  }
});

setSolids([player, rock, togglewall, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [rock],
  [rock]: [rock]
});

//tune time lolzers
const movement = tune `
92.5925925925926: G4^92.5925925925926 + C4/92.5925925925926 + F5^92.5925925925926 + C5~92.5925925925926,
2870.3703703703704`
const reset = tune `
193.5483870967742: A4-193.5483870967742 + G5~193.5483870967742,
193.5483870967742: B4-193.5483870967742 + F5~193.5483870967742,
5806.451612903226`
const complete = tune `
198.67549668874173: G4~198.67549668874173 + E5^198.67549668874173,
198.67549668874173: A4/198.67549668874173 + G5-198.67549668874173,
198.67549668874173: A4^198.67549668874173 + G5/198.67549668874173,
198.67549668874173: B4~198.67549668874173 + G4-198.67549668874173,
5562.913907284768`
const death = tune `
76.33587786259542: G5/76.33587786259542 + C5^76.33587786259542,
76.33587786259542: E5/76.33587786259542 + G5^76.33587786259542,
76.33587786259542: D5-76.33587786259542,
76.33587786259542: E5-76.33587786259542,
76.33587786259542: E5-76.33587786259542,
2061.0687022900765`

//movement sound



// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(movement);
});

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(movement);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(movement);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(movement);
});

// input to reset level
onInput("j", () => {
  playTune(reset);
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;

  // count the number of tiles with goals and rockes
  const numberCovered = tilesWith(goal, rock).length;

  // checks if the player has died
  const ded = tilesWith(spike, player).length
  const rockded = tilesWith(spike, rock).length

  //what happens when player/rock dies
  if (tilesWith(spike).length > 0) {
    if (ded > 0) {
      deaths++;
      setMap(levels[level]);
      playTune(death)
    } else if (rockded > 0) {
      deaths++;
      setMap(levels[level]);
      playTune(death)
    }
  }

  if (tilesWith(togglebutton, rock).length > 0) {
    const togglewalls = getAll(togglewall);

    for (let wall of togglewalls) {
      clearTile(wall.x, wall.y);
    }
  }

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    playTune(complete)
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});