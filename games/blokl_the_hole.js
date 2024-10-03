/*
@title: blokl the hole
@author:  chase .A
@tags: ['puzzle']
@addedOn: 2024-05-02
@img: ""


*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const melody = tune`
205.4794520547945: C4/205.4794520547945 + D4/205.4794520547945 + F4-205.4794520547945 + A5-205.4794520547945 + B5/205.4794520547945,
205.4794520547945: D4/205.4794520547945 + E4/205.4794520547945 + G4-205.4794520547945 + F5-205.4794520547945 + G5/205.4794520547945,
6164.3835616438355`
addText("find and patch the ", { y: 4, color: color`7` });
addText("hole", { y: 5, color: color`7` });
// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCC00000000CCC0
0CCC05555550CCC0
0CCC05455450CCC0
0CCC05455450CCC0
0CCC05555550CCC0
0CCC05333350CCC0
0CCC05555550CCC0
0000000000000000`],
  [goal, bitmap`
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
  [wall, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`]
);
const backmusic = tune`
300: D5/300 + C5-300 + A5~300,
300: C5/300 + A4^300 + E5^300 + B4^300 + F5~300,
300: D5-300 + C5^300 + A4^300 + G5~300,
300: C5/300 + B5~300,
300: D5/300 + C5-300,
300: C5/300 + G5~300,
300: C5/300 + A5~300,
300: B4/300 + F5~300,
300: A4/300 + B4-300,
300: A4/300 + A5~300 + G5~300,
300: A4/300,
300: B4/300 + E5~300,
300: B4-300 + A4~300 + E5~300,
300: C5/300 + A4~300 + E5~300,
300: D5/300 + C5-300 + F5~300 + D4~300,
300: D5/300 + C5^300 + D4~300 + G4~300,
300: C5/300 + D4~300,
300: B4/300 + B5~300,
300: B4-300,
300: B4/300 + A5~300,
300: A4/300 + F5~300,
300: G4/300 + B4~300,
300: G4-300 + D5~300 + B4/300,
300: A4/300 + F4/300 + E5~300 + C5~300,
300: G4-300 + B4/300,
300: A4/300,
300: D5/300 + B4-300 + A5~300 + F5~300,
300: C5/300 + B4^300 + G5~300 + E5~300,
300: C5-300,
300: E5/300 + D5^300,
300: D5/300 + A5~300,
300: D5-300`
const playback = playTune(backmusic, Infinity)
// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwww
wwwwwww
wwpwwww
w...gww
w..wwww
wwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
ww......w.w.......ww
ww................gw
ww................ww
ww................ww
ww................ww
ww................ww
ww................ww
ww................ww
www...............ww
wwp...............ww
www...............ww
ww................ww
ww................ww
ww................ww
ww................ww
ww................ww
wwww.wwwwww.wwwwwwww
wwwwwwwwwwwwwwwwwwww`,
  map`
pwww
..gw
w.ww
w.ww`,
  map`
pwww
...w
w..w
wgww`,
  map`
wwwww
wpw.w
w...w
ww..w
wwgww`,
  map`
w.p.w
ww.ww
ww.ww
.....
gw.ww`,
  map`
wwwwww
w....w
w....p
w....w
wwgwww`,
  map`
wwwgwwwwpww
w.....w...w
w.........w
w.w...w...w
wwwwwwww.ww`,
  map`
wwwwwwwwwww
w.w.......p
w.w..www..w
w....wgwwww
w.wwww....w
w.......w..
wwwwwwwwwww`,
  map`
wwwwww.w
.w.....p
.w..w.w.
......w.
gw..www.`,
  map`
w...........
w.wwwwwwww..
w.wwww...w..
w.ww.w.wgww.
w.ww.w.www..
w....w..w...
w..wpw.ww.w.
w..www.wwww.
wwwwww......`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1;
  playTune(melody) // positive y is downwards
  clearText()
});
onInput("w", () => {
  getFirst(player).y += -1;
  playTune(melody) // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(melody)
});
onInput("a", () => {
  getFirst(player).x += -1;
  playTune(melody)
});

// input to reset level
onInput("j", () => {
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

  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`4` });

    }
  }
});
