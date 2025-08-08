const player= "a";
const box= "b";
const wall= "c";
const goal= "d";
setLegend(
  [player,bitmap`
................
................
................
................
.......000......
......00000.....
.....008.800....
.....00.9.00....
.....0088800....
......00000.....
.......000......
................
................
................
................
................`],
  [box,bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
     [wall,bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000030000
0000000000300000
0000000033000000
0000003330000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
     [goal,bitmap`
................
.00000000000000.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.00000000000000.
................`]
  );
   let level = 0;
   const levels = [
 map`
.bbb.d
..b..b
.bb.bb
bb..bb
a..bbb`,
 map`
bbbb..bb
bbbbbbbb
b......b
bdbbbb.b
bb.b.b.b
bbbbbb.b
ba.....b
bbbbbbbb
.bbbb...`,
 map`
bbbbb
.....
..b..
.bbb.
.abb.
..bb.
..bbd`,
 map`
a.....
bbbbb.
bbbbb.
dbbbb.
.bbbb.
.bbbb.
.bbbb.
.bbbb.
......`,
];
const currentLevel = levels[level];
setMap(currentLevel);
setSolids([ player, box, wall ]);
onInput("a",()=>{
  getFirst(player).x -=1;
});

onInput("d",()=>{
  getFirst(player).x +=1;
});

onInput("w",()=>{
  getFirst(player).y -=1;
});

onInput("s",()=>{
  getFirst(player).y +=1;
});
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel)
  }
  });

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
      setMap(currentLevel);}
else {
      addText("you win!", { y: 4, color: color`4` });
    }
  }
});