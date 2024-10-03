/*
@title: soko_quest
@author: swarit choudhari
@tags: ['puzzle']
@addedOn: 2022-11-13

Instructions:

- W to move up
- A to move left
- S to move down
- D to move right
- J to reset level
- Get the player in the "golden g" to continue and push different types of bricks
around to get a path to the "golden g"

Good Luck and I hope youenjoy the game!
*/

const player = "p";
const block = "b";
const wall = "w";
const brick = "j";
const goal = "g";
const super_block = "s";
const super_brick = "z"

setLegend(
  [ player, bitmap`
............DDDD
..DDDDDDDDDDD00D
.DD000000000000D
.D0000000000000D
.D0000000000000D
.D000010000000D.
..D0111111000D..
..D010110100D...
..D010110110D...
..D011111110D...
..D011111110D...
..D001111100D...
...DD00000DD....
.....D0D0D......
......000.......
......0.0.......`],
  [ block, bitmap`
................
................
................
....CCCCCCCCCC..
....C....C...C..
....C....C...C..
....CCCCCCCCCC..
....C....C...C..
....CCCCCCCCCC..
....C....C...C..
....CCCCCCCCCC..
....C....C...C..
....CCCCCCCCCC..
................
................
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
  [ brick, bitmap`
0000000000000000
033C33C33C33C330
033C33C33C33C330
033C33C33C33C330
0CCCCCCCCCCCCCC0
033C33C33C33C330
033C33C33C33C330
033C33C33C33C330
0CCCCCCCCCCCCCC0
033C33C33C33C330
033C33C33C33C330
033C33C33C33C330
0CCCCCCCCCCCCCC0
033C33C33C33C330
033C33C33C33C330
0000000000000000`],
  [ goal, bitmap`
................
....FFFFFFFF....
...FFFFFFFFFF...
..FFCCCCCCCCFF..
.FFFCFFFFFFFFFF.
.FFFCFFFFFFFFFF.
.FFFCFFFFFFFFFF.
.FFFCFFFFFFFFFF.
.FFFCFFFCCCCFFF.
.FFFCFFFFFFCFFF.
.FFFCFFFFFFCFFF.
.FFFCFFFFFFCFFF.
..FFCCCCCCCCFF..
...FFFFFFFFFF...
....FFFFFFFF....
................` ],
  [ super_block, bitmap`
................
................
................
....4444444444..
....4......4.4..
....44444..4.4..
....4...444444..
....4......4.4..
....44444..4.4..
....4...444444..
....4......4.4..
....4......4.4..
....4444444444..
................
................
................` ],
  [ super_brick, bitmap`
0000000000000000
0444C444C444C440
0444C444C444C440
0CCCCCCCCCCCCCC0
0444C444C444C440
0444C444C444C440
0CCCCCCCCCCCCCC0
0444C444C444C440
0444C444C444C440
0CCCCCCCCCCCCCC0
0444C444C444C440
0444C444C444C440
0CCCCCCCCCCCCCC0
0444C444C444C440
0444C444C444C440
0000000000000000` ]
);

setSolids([player, block, brick, wall, super_block, super_brick])

let level = 0;
const levels = [
  map`
.pw.w...j...
..w.w.b.j...
..w.w...w...
b.w.w...w.g.
jjwwwjjjwwww
........b...
............
............
............`,
  map`
p.wwwwwwwww
..wwwwwwwww
..www.jj.ww
..www..g.ww
bbwwwjbj.ww
jjwww.jjwww
......b..ww
.........ww
.........ww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwww
ww....j.......j.......wwwww
ww...bj..j...bj......bwwwww
ww....wwwwwwwwwwwwwwjjwwwww
wwj.jjw.....j......w..wwwww
ww....w....bj..j...w..wwwww
wwjjjjw.....j..j...w..wwwww
ww..b.w..wwwwwwww..w..wwwww
ww....w..w......w..w..wwwww
ww....w.jw.....gw..w..wwwww
ww....w..w......w..wb.wwwww
wwjj.jw..w..wwwww..wjjwwwww
ww....wjjw.....jb..w..wwwww
ww....wb.w.....j...w..wwwww
wwjjjjw..wwwwwwwwwww.jwwwww
ww.b..w......j..j.....wwwww
ww....w......j..jb....wwwww
ww..p.w.........j.....wwwww
wwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
...z...jj.g
...z...jj..
...z..z.j..
p.sz..z....
...z..z....
...z..z....`,
  map`
pw.z......w.......
.wsszz....w.......
.w....w...wg....w.
bw....w...w.....w.
jwzzzzw...wwwwwww.
..s...w......j..w.
......w...w.bj..w.
.j..s.w...w..j....
......w...w..j....`,
  map`
.p.wzzwww........
...wzzzww........
.b.w.zzz.....wwww
jjww.szzz....j...
.......zz....j..g
.....www.....j...
.....www.....wwww
.....www.........
.....www.........`,
  map`
p...zz...z
..szz...zz
..zz...zz.
.zz...zz..
zz...zz...
z...zz...g`
];

const audio = {
  theme: tune`
234.375: d5~234.375,
234.375: d5~234.375,
234.375: c5~234.375,
234.375: d5~234.375,
234.375: d5~234.375,
234.375: c5~234.375,
234.375: d5~234.375,
234.375: e5~234.375,
234.375: e5~234.375,
234.375: d5~234.375,
234.375: e5~234.375,
234.375: d5~234.375,
234.375: c5~234.375,
234.375: c5~234.375,
234.375: d5~234.375,
234.375: b5~234.375,
234.375: a5~234.375,
234.375,
234.375: e4~234.375,
234.375: e4~234.375,
234.375: g4~234.375,
234.375: g4~234.375,
234.375: b4~234.375,
234.375: b4~234.375,
234.375: d5~234.375,
234.375: d5~234.375,
234.375: f5~234.375,
234.375: e5~234.375,
234.375: d5~234.375,
234.375: c5~234.375,
234.375: b4~234.375,
234.375: c5~234.375`,
  nextLevel: tune`
215.8273381294964,
215.8273381294964: a4~215.8273381294964,
215.8273381294964: b4~215.8273381294964,
215.8273381294964: c5~215.8273381294964,
215.8273381294964: b5~215.8273381294964,
215.8273381294964: a5~215.8273381294964,
215.8273381294964: g5~215.8273381294964,
215.8273381294964: f5~215.8273381294964,
5179.856115107914`,
  step: tune`
99.00990099009901,
49.504950495049506: b4~49.504950495049506,
49.504950495049506: c4~49.504950495049506,
1386.1386138613861`,
  reset: tune`
179.64071856287424: b4~179.64071856287424,
179.64071856287424,
179.64071856287424: e4~179.64071856287424,
179.64071856287424: f4~179.64071856287424,
179.64071856287424: f4~179.64071856287424,
179.64071856287424,
179.64071856287424: g4~179.64071856287424,
4491.017964071856`
};

const currentLevel = levels[level];
setMap(levels[level]);



setPushables({
  [ player ]: [block] + [super_block],
  [ block ] : [brick],
  [ super_block ] : [super_brick],
  [ super_brick ] : [super_brick]
});

onInput("s", () => {
  getFirst(player).y += 1
  playTune(audio.step);
});

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(audio.step);
});

onInput("d", () => {
  getFirst(player).x += 1
  playTune(audio.step);
});

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(audio.step);
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    // clearText();
    playTune(audio.reset);
    setMap(currentLevel);
  }
});

afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      playTune(audio.nextLevel);
    } else {
      playTune(audio.theme);
      addText("you = winner!", { y: 6, x: 1, color: color`F` });
    }
  }
});
