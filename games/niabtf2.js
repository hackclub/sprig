/*
@title: Ninja In A Bear Trap Factory 2
@author: Matt The Banana
@tags: ['strategy']
@addedOn: 2022-12-06
*/


const player = "p";
const sword = "s";
const box = "b";
const goal = "g";
const wall = "w";
const button = "t";
const door = "d";
const closedDoor = "c";
const door2 = "e";
const closedDoor2 = "h";
const floor = "f";

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
const buttonSound = tune`
100,
100: c5~100 + c4~100 + e4^100,
100: d5~100 + d4~100 + f4^100,
100: c4~100 + e4^100 + c5~100,
100: d4~100 + f4^100 + d5~100,
2700`;

let x = 0;
let y = 0;
let oldx = 0;
let oldy = 0;
let doorx = 0;
let doory = 0;
let door2x = 0;
let door2y = 0;
let swords = 0;

addText("Swords: " + swords, {x: 0, y: 0, color: color`3`});
setLegend(
  [ player, bitmap`
................
.2222222222222..
.23331111111112.
.2333311111LLL2.
..22CC3C3333332.
..233CC33333332.
.2331LLL70007L2.
.23311111111112.
.22211111111112.
...200000000002.
..2000000000002.
..20LLLLL0L0LL2.
..2211122020112.
...2LLL2..21112.
...22222..22222.
................`],
  [ sword, bitmap`
................
...........666..
..........6616..
.........66126..
........661126..
.......6611216..
......66112116..
.....661121L66..
....661121L66...
...66112L066....
..66CL2L066.....
.66C3CL066......
.6C3C0666.......
.6CC066.........
.66666..........
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
.0000......0000.
.0CC0......0CC0.
.0CC00000000CC0.
.033CCCCCCCC330.
.03399999999330.
.03399999999330.
.03300000000330.
.033CCCCCCCC330.
.03399999999330.
.03399999999330.
.03300000000330.
.033CCCCCCCC330.
.03399999999330.
.03399999999330.
.03300000000330.
.0000......0000.`],
  [ wall, bitmap`
1LLLLLLLLLLLLLL1
L112222122111110
L10LLLLLLLLLL010
L1L1111111111L10
L1LLLLLLLLLLLL10
L2L1111111111L10
L2LLLLLLLLLLLL10
L2L1111111111L10
L2LLLLLLLLLLLL10
L1L1111111111L10
L2LLLLLLLLLLLL10
L2L1111111111L10
L1L2222222222L10
L10LLLLLLLLLL010
L111111111111110
100000000000000L`],
  [ button, bitmap`
................
....00000000....
...0444444440...
..044444444440..
.0D4444444444D0.
00D4444444444D00
01DD44444444DD10
01DDDDDDDDDDDD10
01LDDDDDDDDDDL10
0L1LDDDDDDDDL1L0
01L1111111111L10
0L1LLLLLLLLLL1L0
00L1111111111L00
.00LLLLLLLLLL00.
..000000000000..
................`],
  [ door, bitmap`
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
  [ closedDoor, bitmap`
0000000000000000
0H33L111111L33H0
03L1111111111L30
0311LLL11LLL1130
0L1LLLH33HLLL1L0
011LLH3333HLL110
011LH333333HL110
0111333333331110
0111333333331110
011LH333333HL110
011LLH3333HLL110
0L1LLLH33HLLL1L0
0311LLL11LLL1130
03L1111111111L30
0H33L111111L33H0
0000000000000000`],
  [ door2, bitmap`
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
  [ closedDoor2, bitmap`
0000000000000000
0H33L111111L33H0
03L1111111111L30
0311LLL11LLL1130
0L1LLLH33HLLL1L0
011LLH3333HLL110
011LH333333HL110
0111333333331110
0111333333331110
011LH333333HL110
011LLH3333HLL110
0L1LLLH33HLLL1L0
0311LLL11LLL1130
03L1111111111L30
0H33L111111L33H0
0000000000000000`],
  [ floor, bitmap`
0LLLLLLLLLLLLLL1
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
1111111111111111`]
)

setBackground(floor)

let level = 0;
const levels = [
  
  map`
wwwwwwwww
w.p.wbgbw
w.s.w.b.w
w...w...w
w.t.w...w
w...c...w
wwwwwwwww`,
  map`
wwwwwww
wpbtssw
wsbbwww
wb.btww
w..cegw
wwwwwww`,
  map`
wwwwwww
wpstwgw
wwwbwbw
wstdwbw
wsbshbw
wbbswsw
wwwwwww`,
  map`
wwwwwwwwww
wssbbbbbgw
wpwwwwwwww
wswdbbsssw
wsbtbetbsw
wbbbbwssbw
wwwwwwwwww`,
  map`
wwwwwwwwww
wswttspbsw
wtwbbwwwbw
w.h..wgwtw
wsw..wbwsw
wsw..dbbsw
wwwwwwwwww`,
  map`
wwwwwwwwww
wssbspwbgw
wbwtwwwbhw
wtwtsswbbw
wbwstbdbbw
wswwwwwsbw
wssbtbtbbw
wwwwwwwwww`,
  map`
wwwwwwwwww
wbsbbbb.bw
wgbbbbbwtw
wwwwbbswsw
wbsttbswsw
wcbbbtewsw
wsbwswtw.w
wsswpwttbw
wwwwwwwwww`,
  map`
wwwwwwwwww
wptssssssw
wwwwwwwwsw
wssssssssw
wbwwwwwwww
wbbbbbbbbw
wwwwwwwwbw
wgctbbbbbw
wwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, wall, closedDoor, closedDoor2]);

setPushables({
  [player]: [player],
});
// START - PLAYER MOVEMENT CONTROLS
onInput("w", () => {
  getFirst(player).y -= 1;
  oldx = x;
  oldy = y;
});

onInput("a", () => {
  getFirst(player).x -= 1;
  oldx = x;
  oldy = y;
});
onInput("s", () => {
  getFirst(player).y += 1;
  oldx = x;
  oldy = y;
});

onInput("d", () => {
  getFirst(player).x += 1;
  oldx = x;
  oldy = y;
});

// END - PLAYER MOVEMENT CONTROLS
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    swords = 0;
  }
});

afterInput(() => {
  
  x = getFirst(player).x;
  y = getFirst(player).y;
  
  const swordNumber = tilesWith(sword).length;
  const swordCovered = tilesWith(sword, player).length;
  
  const boxNumber = tilesWith(box).length;
  const boxCovered = tilesWith(box, player).length;

  const buttonNumber = tilesWith(button).length;
  const buttonCovered = tilesWith(button, player).length;

  const doors = tilesWith(door).length;
  const cdoors = tilesWith(closedDoor).length;
  if (x != oldx || y != oldy) {
    if (buttonCovered == 1 && buttonNumber > 0)
    {
      if (doors == 1)
      {
        doorx = getFirst(door).x;
        doory = getFirst(door).y;
        clearTile(doorx, doory);
        addSprite(doorx, doory, closedDoor);
      }
      else if (cdoors == 1)
      {
        doorx = getFirst(closedDoor).x;
        doory = getFirst(closedDoor).y;
        clearTile(doorx, doory);
        addSprite(doorx, doory, door);
      }
      playTune(buttonSound);
    }
    
    const doors2 = tilesWith(door2).length;
    const cdoors2 = tilesWith(closedDoor2).length;
    
    if (buttonCovered == 1 && buttonNumber > 0)
    {
      if (doors2 == 1)
      {
        door2x = getFirst(door2).x;
        door2y = getFirst(door2).y;
        clearTile(door2x, door2y);
        addSprite(door2x, door2y, closedDoor2);
      }
      else if (cdoors2 == 1)
      {
        door2x = getFirst(closedDoor2).x;
        door2y = getFirst(closedDoor2).y;
        clearTile(door2x, door2y);
        addSprite(door2x, door2y, door2);
      }
      playTune(buttonSound);
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
  }
  if (swordCovered == 1 && swordNumber > 0)
  {
    clearTile(x, y);
    addSprite(x, y, player);
    swords += 1;
    playTune(swordCollect);
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
