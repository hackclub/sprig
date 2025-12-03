/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Shadow
@author: Ofer Afik
@description: "Shadow" is a topdown game, where you are a cube, that needs to get to the door.
@tags: [Black/White, Top-down]
@addedOn: 2025-9-22

Instructions:
Use WASD to move. 
To reach the door,
you will need to toggle the solidity of walls: press J.
To reset a level (if you wasted switches), press L.

Enjoy!
*/

const player = "p";
const wall1 = "1";
const wall2 = "2";
Ask AI for help with your code

const door = "d";
const levelNum = 9;
let switchesLeft = 0;
let win = false;

setLegend([player, bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LL11111111LL00
00LL11111111LL00
00LL11....11LL00
00LL11....11LL00
00LL11....11LL00
00LL11....11LL00
00LL11111111LL00
00LL11111111LL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`], [door, bitmap`
11111CCCCCC11111
1111CCCCCCCC1111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCC00C111
111CCCCCCC00C111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
1110000000000111`], [wall1, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0LLLLLLLLLL0L0
0L0L00000000L0L0
0L0L0LLLLLL0L0L0
0L0L0L0000L0L0L0
0L0L0L0LL0L0L0L0
0L0L0L0LL0L0L0L0
0L0L0L0000L0L0L0
0L0L0LLLLLL0L0L0
0L0L00000000L0L0
0L0LLLLLLLLLL0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`], [wall2, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L111111L1L1L
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L111111L1L1L
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`]);

let curLevel = 0
const levels = [[map`
.........d
..........
..........
..........
..........
..........
..........
p.........`, () => addText("Hello! Try WASD.", {x: 1, y: 2, color: color`D`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 0],
                [map`
111111111d
1111111111
1111111111
1111111111
1111111111
1111111111
2211111111
p211111111`, () => addText("Walls... Try J!", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 1],
                [map`
111111111d
2222222111
1111112121
2222212121
1111212121
2221212121
1121212121
p121212121`, () => addText("This requires more.", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 7],
                [map`
p222122111
2112211121
2121112211
2112112112
2122121211
2112121211
2221212122
121211221d`, () => addText("L to restart.", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 2],
                [map`
1222122221
2122221212
1111122221
2221121212
2112112222
2p12122111
21121212d2
2121122111`, () => addText("No corners!", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 3],
                [map`
2222222222
2111111112
2111112112
2122212112
2111212112
22p1d21112
1111122212
1111111222`, () => addText("Short is wrong...", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 0],
                [map`
1111111111
1122112d11
1122112211
1111111111
1122112211
1112222111
1111221111
p111111111`, () => addText("Hahaha!", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 1],
                [map`
121122222d
2121221111
2211121111
1122122211
1221111211
2211222211
2112212222
p221212121`, () => addText("Nothing to say...", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 2],
                [map`
111211121d
1212121212
1212121212
1212121212
1212121212
1212121212
1212121212
p222122222`, () => addText("Guess how many levels.", {x: 1, y: 2, color: color`4`}), () => addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`}), 2]];

setMap(levels[curLevel][0]);
levels[curLevel][1]();
levels[curLevel][2]();

setSolids([player, wall1]);

onInput("w", () => {getFirst(player).y -= 1; playTune(tune`
500: C5-500,
15500`);});
onInput("s", () => {getFirst(player).y += 1; playTune(tune`
500: C5-500,
15500`);});
onInput("a", () => {getFirst(player).x -= 1; playTune(tune`
500: C5-500,
15500`);});
onInput("d", () => {getFirst(player).x += 1; playTune(tune`
500: C5-500,
15500`);});

onInput("j", () => {
  playTune(tune`
500: B4-500,
15500`);
  if (switchesLeft > 0) {
    clearText()
    const curWall1 = getAll(wall1);
    const curWall2 = getAll(wall2);
    for (let wall of curWall1) {
      wall.type = wall2;
    }
    for (let wall of curWall2) {
      wall.type = wall1;
    }
    switchesLeft -= 1;
    addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`});
  }
})

onInput("l", () => {
  if (curLevel >= levelNum - 1) {
    switchesLeft = 10;
    clearText();
    addText(`Switches Left: ${switchesLeft}`, {x: 3, y: 8, color: color`4`})
    return;
  }
  setMap(levels[curLevel][0]);
  clearText();
  switchesLeft = levels[curLevel][3];
  levels[curLevel][1]();
  levels[curLevel][2]();
});

afterInput(() => {
  if (getFirst(player).y === getFirst(door).y && getFirst(player).x === getFirst(door).x) {
    playTune(tune`
500: A5/500,
15500`);
    if (curLevel < levelNum - 1) {
      curLevel += 1;
      setMap(levels[curLevel][0]);
      clearText();
      switchesLeft = levels[curLevel][3];
      levels[curLevel][1]();
      levels[curLevel][2]();
    } else {
      setMap(map`
1212121212
2121212121
1212121212
2121212121
1212p21212
2121212121
1212121212
2121212121`)
      if (!win) {
        playTune(tune`
500: G5/500 + G4^500 + B4~500 + D5-500,
15500`);
        win = true
      }
      addText("Good Job!", {x: 1, y: 1, color: color`7`})
      const randX = Math.floor(Math.random() * 10);
      const randY = Math.floor(Math.random() * 8);
      clearTile(randX, randY);
      addSprite(randX, randY, door);
      switchesLeft = 10;
    }
  }
})