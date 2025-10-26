
const move = tune`
500: C4~500,
15500`
const reset = tune`
500: C4/500,
15500`
const next = tune`
250: C5/250,
250: D5/250,
250: F5/250,
250: A4/250,
250: E5/250,
250: B5/250,
250: A5/250,
6250`


const player = "0";
const box = "1";
const goal = "2";
const wall = "3";
const wall_y = "4";
const wall_x = "5";
const grate = "6";
const black = "7";
const bk = "8";
const win_box = "9";
const bk_alt = "a";

setBackground(bk);

setLegend(
  [ player, bitmap`
................
................
................
.....000000.....
....09666690....
...0666666660...
...0666662660...
00.0666666660.00
00.0666666660.00
...0966666690...
...0999009990...
....09999990....
.....000000.....
................
................
................`],
  [ box, bitmap`
................
.00000000000000.
.03999999999930.
.09666666666690.
.09666666666690.
.09999999999990.
.03999999999930.
.03333333333330.
.03999999999930.
.03999999999930.
.03999999999930.
.03333333333330.
.03333333333330.
.09333333333390.
.00000000000000.
................`],
  [ win_box, bitmap`
................
.00000000000000.
.0D4444444444D0.
.04666666666640.
.04666666666640.
.04444444444440.
.0D4444444444D0.
.0DDDDDDDDDDDD0.
.0D4444444444D0.
.0D4444444444D0.
.0D4444444444D0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.04DDDDDDDDDD40.
.00000000000000.
................`],
  [ grate, bitmap`
................
..000000000000..
.00100100100100.
.011LL1LL1LL110.
.00100100100100.
..010010010010..
..0L00100100L0..
..0L00100100L0..
..0L00100100L0..
..0L00L00L00L0..
..0L00L00L00L0..
.00L00L00L00L00.
.0LLLLLLLLLLLL0.
.00L00L00L00L00.
..000000000000..
................`], 
  [ goal, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L122222000000L0
0L222222000000L0
0L222222000000L0
0L222222000000L0
0L222222000000L0
0L222221L00000L0
0L00000L122222L0
0L000000222222L0
0L000000222222L0
0L000000222222L0
0L000000222222L0
0L000000222221L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000
0000000000000000`],
  [ wall_y, bitmap`
00LLLL0LLL0LLLL0
00LLLL0LLL0L11L0
00LLLL00000L11L0
00LLLL0LLL0L11L0
00LLLL0LLL0L11L0
00LLLLLLLL0L11L0
00LLLLLLLLLL11L0
00LLLLLLLLLL11L0
00LLLLLLLLLL11L0
00LLLLLLLLLL11L0
00LLLL0LLLLL11L0
00LLLL0LLLLL11L0
0000000LLLLL11L0
00LLLL0LLLLL11L0
00LLLL0LLL0L11L0
00LLLL0LLL0LLLL0`],  
  [ wall_x, bitmap`
0000000000000000
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL
000000LLLLLLLL00
LL0LLLLLLLLLLLLL
LL0LLLLLLLLLLLLL
LL0LLLLLLLLLLLLL
00000LLLLL000000
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
0000000000000000
0000000000000000`],
  [ black, bitmap`
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
  [ bk, bitmap`
9999999933333333
9999999933333333
9999999933333333
9999999933333333
9999999933333333
9999999933333333
9999999933333333
9999999933333333
3333333399999999
3333333399999999
3333333399999999
3333333399999999
3333333399999999
3333333399999999
3333333399999999
3333333399999999`],
  [ bk_alt, bitmap`
CCCCCCCC33333333
CCCCCCCC33333333
CCCCCCCC33333333
CCCCCCCC33333333
CCCCCCCC33333333
CCCCCCCC33333333
CCCCCCCC33333333
CCCCCCCC33333333
33333333CCCCCCCC
33333333CCCCCCCC
33333333CCCCCCCC
33333333CCCCCCCC
33333333CCCCCCCC
33333333CCCCCCCC
33333333CCCCCCCC
33333333CCCCCCCC`],
);


let level = 0;
const levels = [
  map`
0.42
..4a
..3a
..aa`, //0 goal
  map`
77777
55355
.042a
..3aa
.1aaa
..3aa`, //1 box
  map`
55553..
.....1.
.......
...3555
.0.6aaa
...3235`, //2 box_grate1
  map`
7777777
5553555
...4aa2
.1.3a33
..6aaa4
0..3553`, //3 box_grate2
  map`
77777777777
553...6aaa3
0.3...3aaa2
.16...35553
553...47774`, //4 box_grate_double
  map`
7777777
353..47
4.1..47
4.33.35
40..62a
3553.35`, //5 box_grate_ push
  map`
777777777
555555555
0...9...2
555555555`, //6 win_box
  map`
7777777777
5555555555
...6666692
aa35355535
aaaa3.0.47
aaaa6.1.47
aaaa3...47`, //7 long_grate
  map`
777777777
355555377
4...aa477
4.1.aa477
4.0.3a355
4..96a62a
4...35555`, //8 box_jumble
  map`
77777777777
77777777777
77777777777
...........
.aaaaaaaaa.
.a0.1.9.6a.
.aaaaaaaaa.
...........
77777777777
77777777777
77777777777`, //9 win
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, grate, wall, wall_y, wall_x, box, win_box]);

setPushables({
  [player]: [box, win_box],
  [box]: [grate, box, win_box],
  [grate]: [grate, box, win_box],
  [win_box]: [win_box, box, grate],
});

onInput("s", () => {
  getFirst(player).y += 1;
  playTune(move)
  clearText();
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(move)
  clearText();
});

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(move)
  clearText();
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(move)
  clearText();
});

onInput("j", () => {
  const currentLevel = levels[level];
  playTune(reset)
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

onInput("l", () => {
    addText("CONTROLS", { y: 1, color: color`2` });
    addText("'WASD' - Move", { y: 3, color: color`2` });
    addText("'J' - Reset", { y: 4, color: color`2` });
    addText("'L' - Controls", { y: 5, color: color`2` });
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, player).length || tilesWith(goal, win_box).length;
  
  if (numberCovered === targetNumber) {
    addText("L - Controls", { y: 1, x: 1, color: color`2` });
    level = level + 1;
    playTune(next);
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("-CONGRATS!-", { y: 3, color: color`7` });
      addText("-YOU BEAT THE GAME!-", { y: 12, color: color`7` });
    }

  }
});
