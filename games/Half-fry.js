const player = "f";
const wall = "w";
const box = "b";
const voltage = "v";
const pan = "p";

let hasDisplayedText = false;



setLegend(
  [player, bitmap`
................
................
................
......0000......
.....022220.....
....02222220....
....02266220....
....02666620....
....02666620....
....02266220....
....02222220....
.....022220.....
......0000......
................
................
................`],
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
  [box, bitmap`
................
................
..LLCCCCCCCCLL..
..LLLCCCCCCLLL..
..LCLLCCCCLLCL..
..LCCLLCCLLCCL..
..LCCCLLLLCCCL..
..LCCCCLLCCCCL..
..LCCCLLLLCCCL..
..LCCLLCCLLCCL..
..LCLLCCCCLLCL..
..LLLCCCCCCLLL..
..LLCCCCCCCCLL..
................
................
................`],
  [voltage, bitmap`
................
................
................
................
....7777........
.....7777.......
......7777......
.......7777.....
........7777....
.......7777.....
......7777......
.....7777.......
....7777........
................
................
................`],
  [pan, bitmap`
................
................
......LLLL......
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
.....LLLLLL.....
......LLLL......
................
................
................`],
);

setSolids([player, wall, box]);

setPushables({
  [player]: [box],
  [box]: [box]
});

let level = 0;
const levels = [
  map`
...................
...................
bbb.bbb.bbb.bb..bbb
b....b..bvb.bpb..b.
bbb..b..bbb.bb...b.
f.b..b..b.b.b.b..b.
bbb..b..b.b.b.b..b.
...................`,
  map`
wwww
wf.w
wbvw
w..p
wwww`,
  map`
wwwwww
w...bw
wbfbvw
w...bw
w....p
wwwwww`,
  map`
wwwwww
wfb..w
wwb..w
w.b..w
wbvb.w
w.b..p
wwwwww`,
  map`
wwwwww
wf..pw
wwb..w
wwbbbw
www..w
w.v..b
wwwwww`,
  map`
wwwwww
ww..vw
wb..bw
w.bb.w
w..b.w
wwf..p
wwwwww`,
  map`
wwwwwww
wwfb..w
wb.bb.w
ww....w
w.bb.bp
wwv.b.w
wwwwwww`,
  map`
wwwwww
wf..ww
wwb..w
wvwbbw
w....w
wbb..p
wwwwww`,
  map`
wwwwww
wf...w
w..bvw
wbb.b.
w...ww
w.w..p
wwwwww`,
  map`
wwwwww
ww...w
w..v.w
wbbwww
w...ww
wfbb.p
www.ww`,
  map`
wwwwww
wbwvbw
w.bb.w
wbww.w
wb.b.w
wbf..p
wwwwww`,
  map`
..pw..
..wv.w
b.bb.w
....bw
...bbw
bbf...
bwww.w`,
  map`
vb.pb
..bb.
...b.
wbb..
w...w
w.f.w
wwwww`,
  map`
wv.b..f
.bb...w
w.b.b.w
pwb...w
.bb...w
...bbbb
bbw.bbw`,
  map`
wbp.b.
.bbb..
w.....
..bbbw
w.bvb.
w.bbb.
.wfwww`,
  map`
bbbbbb
bf...b
b...bb
b..bpb
b.bbb.
bb.vbb
bbbbbb`,
  map`
pwf...
..w...
..www.
...bw.
..bvw.
.w.w.b
......`,
  map`
..b.w
wvw.w
.wf.w
..w.w
.b..w
pb..w
b..ww`,
  map`
..b.w
wvw.w
.wf.w
..w.w
.b..w
pb..w
b..ww`,
  map`
bbbbbw
b...vb
.bbbb.
.....b
.bb.pb
...bbb
wb..fw`
];

setMap(levels[level]);

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("j", () => {
  const currentLevel = levels[level];


  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const playerPos = getFirst(player);

  // Check if player is on voltage
  if (tilesWith(player, voltage).length) {
    getFirst(voltage).remove();
    hasVoltage = true;
  }

  // Check if player is on a pan and has collected voltage
  if (tilesWith(player, pan).length && hasVoltage) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      hasVoltage = false;
    } else {
      addText("You made a full-fry!!", { x: 5, y: 1, color: color`4` });
    }
  }
});