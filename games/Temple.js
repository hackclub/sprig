/*
@title: Temple
@author: Wynston
@tags: ['puzzle']
@addedOn: 2022-12-07
*/


// WASD to move
// i to reset to level 1
// j to resent the level
// l to clear text
// k does nothing

//collect diamonds to get value and enter waypoints to reach the end.



//objects
const player = "p";
const diamond = "j";
const box = "b";
const box2 = "B";
const waypoint1 = "w";
const corrupt = "c";
const tip = "t";
const bg = "g"



//sprites
setLegend(
  [player, bitmap`
................
................
................
......000.......
.....0CCC0......
....0CCCCC0.....
.....02200......
.....02220......
.....0FFF0......
.....0F2F20.....
.....0FFF0......
.....0C0C0......
.....02020......
......000.......
................
................`], 
  [diamond, bitmap `
................
................
................
................
................
....0000000.....
...077777770....
..00777777700...
.0770000000770..
.0707777777070..
..07777777770...
...077777770....
....0777770.....
.....07770......
......070.......
.......0........`],
  [box, bitmap `
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
CCCCCCCCCCCCCCCC
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
CCCCCCCCCCCCCCCC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
CCCCCCCCCCCCCCCC
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
CCCCCCCCCCCCCCCC`],
  [box2, bitmap `
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
CCCCCCCCCCCCCCCC
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
CCCCCCCCCCCCCCCC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
CCCCCCCCCCCCCCCC
FCFFFCFFFCFFFCFC
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
CCCCCCCCCCCCCCCC`],
  [waypoint1, bitmap `
................
................
................
................
................
................
................
..00........00..
.03300....00330.
..03330..03330..
...0333003330...
..033333333330..
.03333333333330.
0333333223333330
0003332222333000
...0332222330...`],
  [corrupt, bitmap `
80009F0030050000
00L69700L0700006
008D.C4083H34F00
9D.32713532.H4L0
..02553.9.1H2L00
30007849H9007900
0503H.007030F.50
060C249F.77F.3H0
9.F67128C6HH.L00
.9.H93F.H99.83C0
0030.0.770.94000
0243.50.51371700
00500203900.8030
0H0046H..H670000
0640HF.580670500
00020.0000H00000`],
  [tip, bitmap `
................
................
................
................
...CCCCCCCCCC...
...CCCCCCCCCC...
...CC000000CC...
...CCCCCCCCCC...
...CC000000CC...
...CCCCCCCCCC...
...CCCCCCCCCC...
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......`],
  [bg, bitmap `
1111111111111111
1F111111F1111111
1111111111111111
1111111111111111
1111111111111111
1111F11111111F11
1111111111111111
11111111F1111111
1111111111111111
1F11111111111111
11111F11111111F1
1111111111111111
1111111111F11111
1111111111111111
1111111111111111
111F111111111111`]
);


setSolids([player, box]);
setBackground(bg)




//levels
let level = 0;
let value = 0;

const levels = [
//level 1  
map `
bbbBcBbb
p..bwbjb
bb.b...b
bt.bbb.b
b......b
bbbbbbbb`, //level 2
map `
bbbbbbbb
bw...bjb
b....bbb
bBbb...b
bcjb..tb
bbbbpbbb`, //level 3
map `
bpbbbbbb
b.bbb.tb
b.B....b
bjb..bbb
b.c....b
bbbbbbwb`, //level 4
map `
bbbBBBbb
b.BBb.bb
bjBb...b
b.bbcbbb
b.bb.Btb
bwbbbbpb`, //level 5
map `
bbbbbbwb
bBbtbbBb
bbb.bBBb
b...bBbb
b...c..b
bpbbbbjb`, //level 6
map `
bbbbbbpb
bt....cb
b.bbbb.b
b.bjbb.b
b...BB.b
bbbbbbwb`, //level 7
map `
bbbbbbbb
bbbb...b
wc.b.b.b
B..b.bjb
bt...b.b
bbbbbbpb`, //level 8
map `
bbbbwbbb
b....bbb
bcbBbb.p
bt..jb.b
bbbb...b
bbbbbbbb`, //level 9
map `
bbbbbbbb
bt.b...b
bb...bcw
bb.bbbjB
b....bBb
bbbbpBBb`, //level 10
map `
bbbbwbbb
b.t...bb
p.bbb.bb
BbBBBcbb
BBBbb.jb
bbBBBBbb`, //final level
map `
bbbbwbbb
b......B
BccccccB
B...t..B
B..bjb.B
BBbbpbBB`, //Win
map `
bbbbbbbb
b......b
b..cj..b
b......b
b...t..b
bbbwpbbb`
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


onInput("j", () => {
  clearText();
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(levels[level]);
});

onInput("i", () => {
  clearText();
  setMap(levels[0]);
});

onInput("l", () => {
  clearText();
});







//diamond
afterInput(() => {
  
  const numberCovered1 = tilesWith(diamond, player).length;
  const targetNumber1 = tilesWith(diamond).length;

  if (numberCovered1 === targetNumber1) {
    value = value + 1;
    // create text box
    addText("Shiny!       ", { 
  x: 1,
  y: 4,
  color: color`8`
})
    
}

});



afterInput(() => {
  clearText();
  addText("Value: " + value, {x: 1, y: 14, color: color`3`});

  if (level > 10) {
    clearText();
    addText("You Win!", {x: 1, y: 8, color: color`0`});
    addText("But...", {x: 1, y: 9, color: color`0`});
    addText("Can you leave?", {x: 1, y: 10, color: color`0`});
  }
});



//corruption
afterInput(() => {
  const numberCovered3 = tilesWith(corrupt, player).length;
  const targetNumber3 = tilesWith(corrupt).length;

  if (numberCovered3 === targetNumber3) {
    value = 0;
    // create text box
    clearText();
    addText("Its...     ", {
  x: 1,
  y: 3,
  color: color`8`
})
    addText("Wrong...   ", {
  x: 1,
  y: 4,
  color: color`8`
})
  }});


afterInput(() => {
  const numberCovered4 = tilesWith(tip, player).length;
  const targetNumber4 = tilesWith(tip).length;

  if (numberCovered4 === targetNumber4) {
    // create text box
    addText("Tip:", { 
  x: 1,
  y: 3,
  color: color`9`
});
    addText("Get the Diamond.", { 
  x: 1,
  y: 4,
  color: color`9`
});
    addText("Not everything", { 
  x: 1,
  y: 5,
  color: color`9`
});
    addText("is real", { 
  x: 1,
  y: 6,
  color: color`9`
})
  }});



//waypoint1
afterInput(() => {
  const numberCovered = tilesWith(waypoint1, player).length;
  const targetNumber = tilesWith(waypoint1).length;

  if (numberCovered === targetNumber) {
    if (value > 0) {
      // increase the current level number
      level += 1;
  
      const currentLevel = levels[level];
  
      // make sure the level exists and if so set the map
      clearText();
      setMap(levels[level]);
    }
}
});



