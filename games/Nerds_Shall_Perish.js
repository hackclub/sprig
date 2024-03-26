/*
@title: getting_started
@tags: ['beginner', 'tutorial']
@img: ""
@addedOn: 2022-07-26
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const lol = "l";
const enemy = "e";
const bounce = "u";
const moveEnemy = "m";
let score = 0;
let topScore=0;
let end = false;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
....00666600....
...0066666600...
CCCCCCCCCCCCCCCC
.C66666CC66666C.
.FC006CCCC600C6.
.6C006CFFC600C6.
.6FCCC666FCCC66.
.66666666666666.
.69666666666696.
.66696022069666.
.69666022066696.
..F66662266666..
...FF66666666...
....FFFFFF66....
................`],
  [ box, bitmap`
................
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99902299220999.
.99999999999999.
.99999900999999.
.99999999999999.
.99999000009999.
.99999993C39999.
.99999993C39999.
.99999997359999.
.99999999759999.
.99999999959999.
..........5.....`],
  [enemy, bitmap`
................
.CCCCCCCCCCCCCC.
.C333333333333C.
.C000333333000C.
.C220033330022C.
.C202003300202C.
.C223333333322C.
.C333303303333C.
.C333333333333C.
.C333000000333C.
.C300022120003C.
.C300321223003C.
.C303333333303C.
.C333333333333C.
.CCCCCCCCCCCCCC.
................`],
  [ goal, bitmap`
................
.44444444444444.
.4DDDDDDDDDDDD4.
.4D7777777777D4.
.4D7111111117D4.
.4D71LLLLLL17D4.
.4D71L0000L17D4.
.4D71L0660L17D4.
.4D71L0660L17D4.
.4D71L0000L17D4.
.4D71LLLLLL17D4.
.4D7111111117D4.
.4D7777777777D4.
.4DDDDDDDDDDDD4.
.44444444444444.
................`],
  [ wall, bitmap`
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
  [ lol, bitmap`
................
..00............
.0..............
.0..............
..00..0..0.0.0..
....0.0..0.00.0.
....0.0..0.0..0.
..00...00..000..
...........0....
...........0....
................
0...0.00.......0
00..0.0........0
0.0.0.00.00....0
0..00.0..0.0.000
0...0.00.0...000`],
  [moveEnemy, bitmap`
221..........122
2211999999991122
11CCC999999CCC11
.1CC339999C3331.
.9C333399C33339.
.933033CC330339.
.93320033002339.
.9332C2002C2339.
.99332233223399.
.99333333333399.
.99933000033999.
.99930333303999.
.12293333339221.
1122993333992211
2211999999991122
221..........122`]
);
const myTune = tune`
214.28571428571428: F4-214.28571428571428 + D4/214.28571428571428,
214.28571428571428: G4~214.28571428571428,
214.28571428571428: A4-214.28571428571428 + E4/214.28571428571428,
214.28571428571428: B4~214.28571428571428,
214.28571428571428: C5-214.28571428571428 + F4/214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: G4-214.28571428571428 + F5^214.28571428571428 + C4/214.28571428571428,
214.28571428571428: G4~214.28571428571428 + G5^214.28571428571428,
214.28571428571428: F4-214.28571428571428 + A5^214.28571428571428 + D4/214.28571428571428,
214.28571428571428: F4~214.28571428571428 + A5^214.28571428571428,
214.28571428571428: G4-214.28571428571428 + G5^214.28571428571428 + E4/214.28571428571428,
214.28571428571428: G4~214.28571428571428 + F5^214.28571428571428,
214.28571428571428: C5-214.28571428571428 + F4/214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: D5-214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: C5-214.28571428571428,
214.28571428571428: C5~214.28571428571428,
214.28571428571428: A4-214.28571428571428 + G5^214.28571428571428 + F4/214.28571428571428,
214.28571428571428: A4~214.28571428571428 + A5^214.28571428571428,
214.28571428571428: F4-214.28571428571428 + B5^214.28571428571428 + E4/214.28571428571428,
214.28571428571428: F4~214.28571428571428 + B5^214.28571428571428,
214.28571428571428: G4-214.28571428571428 + A5^214.28571428571428 + D4/214.28571428571428,
214.28571428571428: A4~214.28571428571428 + G5^214.28571428571428,
214.28571428571428: C5-214.28571428571428 + C4/214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: A4-214.28571428571428 + F4/214.28571428571428,
214.28571428571428: A4~214.28571428571428,
214.28571428571428: F4-214.28571428571428 + E4/214.28571428571428,
214.28571428571428: F4~214.28571428571428,
214.28571428571428: E4-214.28571428571428 + D4/214.28571428571428,
214.28571428571428: E4~214.28571428571428`;
const myTune2 = tune`
2000: F4~2000,
2000: F4~2000,
2000: A4~2000,
2000: G4~2000,
2000: C5~2000 + D5^2000,
2000,
2000: E4~2000,
2000: E4~2000,
2000: G4~2000,
2000: F4~2000,
2000: B4~2000 + C5^2000,
2000,
2000: F4~2000,
2000: F4~2000,
2000: A4~2000,
2000: G4~2000,
2000: D5~2000 + E5^2000,
2000,
2000: F4~2000,
2000: F4~2000,
2000: E4~2000,
2000: G4~2000,
2000: F4~2000,
2000: E4~2000,
2000: D4~2000,
2000,
2000: F4~2000 + C5^2000,
2000: G4~2000 + D5^2000,
2000: A4~2000 + E5^2000,
2000: B4~2000 + E4^2000,
2000: A4~2000 + D4^2000,
2000: G4~2000 + C4^2000`;
const myTune3 = tune`
1000: B4~1000,
1000: C5~1000,
1000: D5~1000,
1000,
1000: D5~1000,
1000: C5~1000,
1000: B4~1000,
1000,
1000: B4~1000,
1000: B4~1000,
1000: C5~1000,
1000,
1000: A4~1000,
1000: B4~1000,
1000: G4~1000,
1000,
1000: B4~1000,
1000: C5~1000,
1000: D5~1000,
1000,
1000: D5~1000,
1000: C5~1000,
1000: B4~1000,
1000,
1000: B4~1000,
1000: B4~1000,
1000: C5~1000,
1000: B4~1000,
1000: C5~1000,
1000: D5~1000,
1000: A4~1000,
1000`;
const myTune4 = tune`
500: C5^500 + E4~500,
500: D5^500,
500: E5^500 + F4~500,
500: C5^500,
500: B4^500 + E4~500,
500: A4^500,
500: B4^500 + E4~500,
500: A4^500,
500: C5^500 + F4~500,
500: D5^500,
500: E5^500 + G4~500,
500: C5^500,
500: B4^500 + F4~500,
500: A4^500,
500: D5^500 + G4~500,
500: F5^500,
500: C5^500 + F4~500,
500: D5^500,
500: E5^500 + G4~500,
500: C5^500,
500: B4^500 + F4~500,
500: A4^500,
500: G4^500 + E4~500,
500: F4^500,
500: G4^500 + E4~500,
500: F4^500,
500: G4^500 + E4~500,
500: A4^500,
500: B4^500 + F4~500,
500: C5^500,
500: E5^500 + G4~500,
500: D5^500`;
let songlist = [myTune, myTune2, myTune3, myTune4];
let playback = playTune(myTune, Infinity);

addText(("Score: " + score), {
      x: 1,
      y: 1,
      color: color`7`
    })
    if (score > topScore){
      topScore = score
    }
    addText(("High Score: " + topScore), {
      x: 1,
      y: 2,
      color: color`F`
    })
let songType = 0;
// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
pwwwgwww
..ww.www
e.ww....
..wgbbbb
.www..w.
..ww.gw.
w....wwg`,
  map`
p.e
.be
..g`,
  map`
pwwg
....
.be.
w...`,
  map`
plll
eeeb
eeel
eeeg`,
  map`
gpw
blw
llw`,
  //5
  map`
plll
lbbg
lbbg
lggl`,
  map`
p.e
ebe
e.e
...
...
ee.
ee.
eeg`,
  map`
pbg`,
  map`
eeeegeeee
eeeeeeeee
....b....
p..blb...
....b....
eeeeeeeee
eeeegeeee`,
  map`
...
.eb
peg`,
  //10
  map`
...eg
..bee
eb.ee
p.eee`,
  map`
pbbblbebeg`,
  map`
geee
.eee
.bbe
.ebe
.p.e`,
  map`
p..ww....w
.bbmebww.w
we..wm...w
....wgww.w
.wewwww..w
.wm.w...ww
..w.w...ww
ww.wwwwwww`,
  map`
p.wg
.mw.
w.wm
w...`,
  //15
  map`
.p.
m..
.b.
bww
eww
gww`,
  map`
g..bg
mpmwg
.....`,
  map`
gebblbbeg
wwmwlwmww
wwwwlwwww
glgbpbglg`,
  map`
wwwwwww
w..g..w
w..b..w
wempmgw
w..m..w
w..w..w
wwwgwww`,
  map`
..e.bbeg
pme..www
..w..lww
www..wgw`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall, moveEnemy]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box, moveEnemy],
  [box]: [box, moveEnemy],
  [moveEnemy]: [moveEnemy, wall, box]
});

// inputs for player movement control


onInput("k", () => {
  playback.end();
  if (songType < 3){
    songType += 1;
  }else{
    songType = 0;
  }
  
  playback = playTune(songlist[songType], Infinity);
});
onInput("d", () => {
  getFirst(player).x += 1;

});


  


onInput("a", () => {
  getFirst(player).x += -1;
  
});

onInput("w", () => {
  getFirst(player).y += -1;

});


  


onInput("s", () => {
  getFirst(player).y += 1;
  
});

// input to reset level
onInput("j", () => {
  //const currentLevel = levels[level]; // get the original map of the level
  level = 0;
  
  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    score = 0;
    addText(("Score: " + score), {
      x: 1,
      y: 1,
      color: color`7`
    })
    if (score > topScore){
      topScore = score
    }
    addText(("High Score: " + topScore), {
      x: 1,
      y: 2,
      color: color`F`
    })
    
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;
  const numberCovered2 = tilesWith(goal, wall).length;
  const numberCovered3 = tilesWith(goal, moveEnemy).length;
  
  const enemyAttacked = tilesWith(player, enemy).length;
  const heartBoom = tilesWith(moveEnemy, enemy).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if ((enemyAttacked > 0 )||(heartBoom > 0)) {
    let plyr = getFirst(player);
    plyr.remove();
    addText("GAME OVER!!!", {
      x: 3,
      y: 3,
      color: color`3`
  })}
  
  if (((numberCovered+numberCovered2+numberCovered3)===targetNumber)){
    // increase the current level number
    level = level + 1;
    if (end === false){
      score = score + 1;
    }
    addText(("Score: " + score), {
      x: 1,
      y: 1,
      color: color`7`
    })
    if (score > topScore){
      topScore = score
    }
    addText(("High Score: " + topScore), {
      x: 1,
      y: 2,
      color: color`F`
    })

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      end = true
      addText("You Win!", { y: 4, color: color`4` });
      
    }
  }
});
