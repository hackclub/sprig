/*
@title: Ninja In A Bear Trap Factory
@author: Matt The Banana
@tags: ['strategy']
@addedOn: 2022-12-04
*/


const player = "p";
const sword = "s";
const box = "b";
const goal = "g";
const wall = "w";

const bearTrap = tune`
82.75862068965517,
41.37931034482759: a4/41.37931034482759 + c5/41.37931034482759 + e5/41.37931034482759,
41.37931034482759: b4-41.37931034482759,
41.37931034482759: c5-41.37931034482759,
41.37931034482759: c5-41.37931034482759,
41.37931034482759: e5/41.37931034482759 + c5/41.37931034482759 + a4/41.37931034482759,
1034.4827586206898`;
const nextLevel = tune`
40.053404539385845,
40.053404539385845: c4^40.053404539385845,
40.053404539385845: d4~40.053404539385845 + e4-40.053404539385845 + f4/40.053404539385845 + g4^40.053404539385845,
40.053404539385845: e4~40.053404539385845 + g4-40.053404539385845 + b4/40.053404539385845 + d5^40.053404539385845,
40.053404539385845: f4~40.053404539385845 + b4-40.053404539385845 + e5/40.053404539385845 + a5^40.053404539385845,
40.053404539385845: g4~40.053404539385845 + d5-40.053404539385845 + a5/40.053404539385845,
40.053404539385845: a4~40.053404539385845 + f5-40.053404539385845,
40.053404539385845: b4~40.053404539385845 + a5-40.053404539385845,
40.053404539385845: c5~40.053404539385845,
40.053404539385845: d5~40.053404539385845,
40.053404539385845: e5~40.053404539385845,
40.053404539385845: f5~40.053404539385845,
40.053404539385845: g5~40.053404539385845,
40.053404539385845: a5~40.053404539385845,
40.053404539385845: b5-40.053404539385845,
40.053404539385845,
40.053404539385845: c5-40.053404539385845 + c4^40.053404539385845,
40.053404539385845: c4^40.053404539385845,
40.053404539385845: c5-40.053404539385845 + c4^40.053404539385845,
40.053404539385845: c4^40.053404539385845,
40.053404539385845: c5-40.053404539385845 + c4^40.053404539385845,
40.053404539385845: c4^40.053404539385845,
40.053404539385845: c5-40.053404539385845 + c4^40.053404539385845,
40.053404539385845: c4^40.053404539385845,
40.053404539385845: c5-40.053404539385845 + c4^40.053404539385845,
40.053404539385845: c4^40.053404539385845,
40.053404539385845: c5-40.053404539385845 + c4^40.053404539385845,
200.26702269692922`
const swordCollect = tune`
75,
75: e5/75 + e4-75 + c5~75,
75: g5/75 + g4-75 + c5~75,
2175`;
const die = tune`
100,
100: c4-100 + d4^100 + e4~100,
100,
100: c4-100 + d4^100 + e4~100,
100,
100: c4-100 + d4^100 + e4~100,
2600`;
const win = tune`
100,
100: c4-100,
100,
100: c4-100,
100,
100: c4-100,
100: g4-100 + e4/100 + c4/100,
100: e4/100 + c4/100 + g4-100,
100: e4/100 + c4/100 + g4-100,
100: e4/100 + c4/100 + g4-100,
100: e4/100 + c4/100 + g4-100,
100: c5-100 + c4~100,
100: e5-100 + e4~100,
100: g5-100 + g4~100,
100: e5-100 + e4~100,
100: c5-100 + c4~100,
100: e5-100 + e4~100,
100: g5-100 + g4~100,
100: e5-100 + e4~100,
100: c4~100,
100: c5-100 + c4~100 + g4~100 + e5/100 + g5^100,
200,
100: c5-100 + c4~100 + g4~100 + e5/100 + g5^100,
200,
100: c5-100 + c4~100 + g4~100 + e5/100 + g5^100,
200,
100: c5^100 + c4/100 + e4/100 + g4/100,
100: c5^100 + c4/100 + e4/100 + g4/100,
100: c5^100 + c4/100 + e4/100 + g4/100`;

let x = 0;
let y = 0;
let swords = 0;
addText("Swords: " + swords, {x: 0, y: 0, color: color`3`});
setLegend(
  [ player, bitmap`
................
................
................
3330000000000...
3333000000000...
..CC3C3333333...
.333C33333333...
3330000000000...
33.0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
................
................
................`],
  [ sword, bitmap`
.00.............
.010............
.010............
.0110...........
.0110...........
.01110..........
..011L0.........
...01LL0........
....01LL0.......
.....01LL00.....
......01LLL0....
.......00LCC0...
.........0CCC0..
..........0CC0..
...........000..
................`],
  [ box, bitmap`
................
................
................
................
................
...00......00...
..010.0000.010..
.0L0001001000L0.
0L100L1001L001L0
0110011001100110
011L01100110L110
0111L11LL11L1110
.0L1111111111L0.
..00L111111L00..
....00000000....
................`],
  [ goal, bitmap`
................
................
..1L........1L..
..1L........1L..
..11111111111L..
..1LLLLLLLLL1L..
..1L........1L..
..11111111111L..
..1LLLLLLLLL1L..
..1L........1L..
..11111111111L..
..1LLLLLLLLL1L..
..1L........1L..
..11111111111L..
..1LLLLLLLLL1L..
..1L........1L..`],
  [ wall, bitmap`
1LLLLLLLLLLLLLL1
L111111111111110
L100L1LLLLLLL110
L100L11111111110
L1LLL1LLLLLLL110
L111111111111110
L11LLLLLLLLLL110
L111111111111110
L11LLLLLLLLLL110
L111111111111110
L11LLLLLLL111110
L111111111100L10
L11LLLLLL1100L10
L1111111111LLL10
L111111111111110
1000000000000001`],
)
let level = 0;
const levels = [
  map`
wwwwww
wpsbgw
wwwwww`,
  map`
wwwwwww
w..p..w
w..s..w
wbwwwbw
wswgwsw
wbwbwsw
ws.bsbw
wwwwwww`,
  map`
wwwwww
wpswgw
wsbb.w
wbswbw
wsbbsw
wwwwww`,
  map`
wwwwwww
wpsbssw
wbbbbww
wsbbbww
wsbwgww
wwwwwww`,
  map`
wwwwwww
ws.b.bw
w.wbbsw
wswb.bw
w.wsb.w
wswb.bw
wpw.bgw
wwwwwww`,
  map`
wwwwwww
w.s.wgw
wspswbw
w...wbw
w.bbb.w
wb.sbbw
wbbbbsw
wbbbwsw
wwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, wall]);

setPushables({
  [player]: [player],
});

// START - PLAYER MOVEMENT CONTROLS
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// END - PLAYER MOVEMENT CONTROLS
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  x = getFirst(player).x;
  y = getFirst(player).y;
  
  const swordNumber = tilesWith(sword).length;
  const swordCovered = tilesWith(sword, player).length;
  
  const boxNumber = tilesWith(box).length;
  const boxCovered = tilesWith(box, player).length;
  
  if (swordCovered == 1 && swordNumber > 0)
  {
    clearTile(x, y);
    addSprite(x, y, player);
    swords += 1;
    playTune(swordCollect);
  }
  if (boxCovered == 1 && boxNumber > 0)
  {
    if (swords > 0)
    {
      clearTile(x, y);
      addSprite(x, y, box);
      addSprite(x, y, player);
      swords -= 1;
      playTune(bearTrap);
    }
    else
    {
      clearTile(x, y);
      addSprite(x, y, box);
      playTune(die);
	  const currentLevel = levels[level];
	  swords = 0;
	  clearText("");
	  addText("Swords: " + swords, {x: 0, y: 0, color: color`3`});
	  setMap(currentLevel);
    }
  }
  
  // count the number of tiles with goals
  // count the number of tiles with goals and boxes
  clearText("");
  addText("Swords: " + swords, {x: 0, y: 0, color: color`3`});
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered == 1)
  {
    // increase the current level number
    level = level + 1;
    playTune(nextLevel);
    swords = 0;
    clearText("");
    addText("Swords: " + swords, {x: 0, y: 0, color: color`3`});
    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Escaped!", { y: 4, color: color`4` });
      playTune(win);
    }
  }
});
