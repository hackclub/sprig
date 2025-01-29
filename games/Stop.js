/*
@title: Stop
@author: wyn-cmd
@tags: ['puzzle']
@addedOn: 2022-12-07
*/


//objects
const player = "p";
const spike = "s";
const jewel = "j";
const box = "b";
const box2 = "B";
const waypoint1 = "w";
const waypoint2 = "W";
const corruption = "c";
const stop = "x";
const stop2 = "y";



//sprites
setLegend(
  [player, bitmap`
................
................
................
................
......000.......
.....02220......
.....00200......
.....02220......
....0111110.....
....0211120.....
.....01110......
.....07070......
.....02020......
......000.......
................
................`], 
  [spike, bitmap `
................
................
................
................
................
................
.......0........
......010.......
......010.......
.....01110......
.....01110......
.....01110......
.....01110......
....0111110.....
....0111110.....
.....00000......`], 
  [jewel, bitmap `
................
................
................
.......00.......
......0330......
.....033330.....
....03033030....
....03300330....
....03300330....
....03300330....
....03033030....
.....033330.....
......0330......
.......00.......
................
................`],
  [box, bitmap `
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
  [box2, bitmap `
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
  [waypoint1, bitmap `
................
.....000000.....
....07777770....
...0777777770...
..07775HH57770..
.07775HHHH57770.
.0775HH88HH5770.
.077HH8338HH770.
.077HH8338HH770.
.0775HH88HH5770.
.07775HHHH57770.
..07775HH57770..
...0777777770...
....07777770....
.....000000.....
................`],
  [waypoint2, bitmap `
................
.....000000.....
....03333330....
...0333333330...
..03338HH83330..
.03338HHHH83330.
.0338HH55HH8330.
.033HH5775HH330.
.033HH5775HH330.
.0338HH55HH8330.
.03338HHHH83330.
..03338HH83330..
...0333333330...
....03333330....
.....000000.....
................`],
  [corruption, bitmap `
8...9F..3..5....
..L697..L.7....6
..8D.C4083H34F..
9D.32713532.H4L.
..H2553.9.1H2L..
30H07849H96079..
.5.3H.06703.F.5.
.6.C249F.77F.3H.
9.F67128C6HH.L..
.9.H93F.H99.83C.
0.30.0.770.94L..
.243.58.513717..
..5.820390F.8C3.
.H..46H..H67....
.64.HF.58.67.5..
...20.C...H..C..`],
  [stop, bitmap `
3333333333333333
3322222222222233
3232222222222323
3223222222223223
3222322222232223
3222232222322223
3222223223222223
3222222332222223
3222222332222223
3222223223222223
3222232222322223
3222322222232223
3223222222223223
3232222222222323
3322222222222233
3333333333333333`],
  [stop2, bitmap `
3333333333333333
3322222222222233
3232222222222323
3223222222223223
3222322222232223
3222232222322223
3222223223222223
3222222332222223
3222222332222223
3222223223222223
3222232222322223
3222322222232223
3223222222223223
3232222222222323
3322222222222233
3333333333333333`]
);


setSolids([player, box, stop2]);




//levels
let level = 0;

const levels = [ map `
bbbbbbcx
.....bBy
.bb.jbwb
p.b.bb.b
Wsb....b
bbbbbbbb`
,map `
BbyxwxybB
b..scs..b
b..s.s..b
b..s.s..b
b..s.s..b
b..s.s..b
BbbbpbbbB`
,map `
BbcywycbB
bsccxccsb
b.scccs.b
b..scs..b
b..s.s..b
b..s.s..b
BbbbpbbbB`
,map `
BbcywycbB
bscxxxcsb
b.scxcs.b
b..scs..b
b..s.s..b
b..s.s..b
BbbbpbbbB`
,map `
ccccwcccc
bbbbbbbbb
byyyyyyyb
byyyyyyyb
byy...yyb
byy...yyb
byy.p.yyb
bbbBbbbbb`
,map `
.jybwByj.
..sycys..
...sys...
....x....
.........
.........
....p....
.........`
];




const currentlevel = levels[level];
setMap(currentlevel);






//controls
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});




//waypoint2
afterInput(() => {
  const numberCovered1 = tilesWith(waypoint2, player).length;
  const targetNumber1 = tilesWith(waypoint2).length;

  if (numberCovered1 === targetNumber1) {
    // create text box
    clearText()
  }
});



//jewel
afterInput(() => {
  const numberCovered2 = tilesWith(jewel, player).length;
  const targetNumber2 = tilesWith(jewel).length;

  if (numberCovered2 === targetNumber2) {
    // create text box
    addText("Cursed?       ", { 
  x: 1,
  y: 4,
  color: color`8`
})}});

//spike
afterInput(() => {
  const numberCovered3 = tilesWith(spike, player).length;
  const targetNumber3 = tilesWith(spike).length;

  if (numberCovered3 === targetNumber3) {
    // create text box
    addText("Ow?           ", {
  x: 1,
  y: 4,
  color: color`8`
})}});


afterInput(() => {
  const numberCovered4 = tilesWith(box, player).length - 1;
  const targetNumber4 = tilesWith(box).length;

  if (numberCovered4 === targetNumber4) {
    // create text box
    clearText();
}});

afterInput(() => {

  if (currentlevel === 1) {
    // create text box
    clearText();
}});



//corruption
afterInput(() => {
  const numberCovered5 = tilesWith(corruption, player).length;
  const targetNumber5 = tilesWith(corruption).length;

  if (numberCovered5 === targetNumber5) {
    // create text box
    addText("Why do you", {
  x: 1,
  y: 4,
  color: color`8`
})
    addText("do this?  ", {
  x: 1,
  y: 3,
  color: color`8`
})
  }});

//stop
afterInput(() => {
  const numberCovered6 = tilesWith(stop, player).length;
  const targetNumber6 = tilesWith(stop).length;

  if (numberCovered6 === targetNumber6) {
    // create text box
    addText("STOP THIS ", {
  x: 1,
  y: 3,
  color: color`H`
})
    addText("        ", {
  x: 1,
  y: 4,
  color: color`H`
})
  }});

//waypoint1
afterInput(() => {
  const numberCovered = tilesWith(waypoint1, player).length;
  const targetNumber = tilesWith(waypoint1).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
  }
});

//box2
afterInput(() => {
  const numberCovered7 = tilesWith(box2, player).length;
  const targetNumber7 = tilesWith(box2).length;

  if (numberCovered7 === targetNumber7) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
  }
});


