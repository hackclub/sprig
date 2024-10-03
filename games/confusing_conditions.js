/*
@title: confusing_conditions
@author: Sooraj
@tags: ['puzzle']
@addedOn: 2022-09-08
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const invis_box = "i";
const win = "d";

setLegend(
  [ player, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66660666606666.
.66666666666666.
.66666666666666.
.66666666666666.
.66333333333366.
.66632222223666.
.66632222223666.
.66663222236666.
..666633336666..
...6666666666...
....66666666....
................`],
  [ box, bitmap`
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12`],
  [ goal, bitmap`
................
................
................
................
..............4.
.............4..
............4...
...........4....
..........4.....
.........4......
........4.......
.4.....4........
..4...4.........
...4.4..........
....4...........
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
  [ invis_box, bitmap`
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L12
L1L1L1L1L1L1L1L1
121L121L121L121L
L1L1L1L1L1L1L1L1
1L121L121L121L1.`],
  [ win, bitmap`
2222222222222222
2222222222222222
2222222222222666
2226222222223336
2263622222233262
2263322222232222
2222332222332222
2222233222322222
6622223222322222
6332223323322266
2633222323222233
2223322323222336
2222322323223322
2222222222222222
2222222222222222
2222222222222222`]
);

let level = 0;
const levels = [
  map`
p.bg`,
  map`
p..
.g.
..b`,
  map`
pw..
ww..
g.b.
....`,
  map`
...w.w
.p.w.w
....bw
..wwb.
.wbbg.
.ww...`,
  map`
bpb
ig.
i..`,
  map`
p.w.
.bwg
....
..bg`,
  map`
w...w...w...w...w...w...w...w...w...w...w...w...
w.wbw.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.w.
wpw...w...w...w...w...w...w...w...w...w...w...wg`,
  map`
ddd
dpd
ddd`
];

const currentLevel = levels[level];
setMap(currentLevel);

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
  
  
  if (level === 0) {
    setSolids([ player, box, wall ]);
    setPushables({
      [player]: [box],
      [box]: [box]
    });
  }
  else if (level === 1) {
    setSolids([ player, wall, goal ]);
    setPushables({
      [player]: [box, goal],
      [box]: [box]
    });
  }
  else if (level === 2) {
    setSolids([ player, wall, box ]);
    setPushables({
      [player]: [box, wall],
      [wall]: [wall]
    });
  }
  else if (level === 3) {
    setSolids([ player, wall, box ]);
    setPushables({
      [player]: [wall, box],
      [box]: [box]
    });
  }
  else if (level === 4) {
    setSolids([ player, goal, box ]);
    setPushables({
      [player]: [goal]
    });
  }
  else if (level === 5) {
    setSolids([ player, box ]);
    setPushables({
      [player]: [box]
    });
  }
  else if (level === 6) {
    setSolids([ player, box ]);
    setPushables({
      [player]: [box]
    });
  }
    else if (level === 7) {
      addSprite(1, 1, win)
    }
  else {
    setSolids([ player, box, wall ]);
    setPushables({
      [player]: [box],
      [box]: [box]
    });
  }
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length || tilesWith(goal, invis_box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!...", { y: 5, color: color`0` });
      addText("confusingly?", { y: 10, color: color`0` });
    }
  }
});
