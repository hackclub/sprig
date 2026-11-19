/*

@title: Escape the Garden
@description: You are trapped in a garden! Move boxes and find the exit to escape!
@author: Leo Kim
@tags: ['Puzzle', 'Escape']
@addedOn: 2026-11-19
j is reset button; resets levels.
*/

const player = "p"
const box = "b"
const goal = "g"
const background = "a"
const bush1 = "u"
const bush2 = "c"
const bush3 = "v"
const bush4 = "d"
const block = "n"
const goal1 = "l"
const goal2 = "m"
const key  = "k"
setLegend(
  [ player, bitmap`
................
......0...0.....
.....0000000....
....007700000...
....000007770...
....000000000...
.....0077700....
......00770.....
......00000.....
......00000.....
.....0000000....
....000000000...
....000000000...
................
................
................` ]
  ,[ goal, bitmap`
................
................
....333333333...
...33999999933..
..3399666669933.
..3996622266993.
..3966222226693.
..3962222222693.
..3962222222693.
..3966222226693.
..3996622266993.
..3399666669933.
...33999999933..
....333333333...
................
................`]
  ,[ background, bitmap`
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
0000000000000000`]
  ,[ box, bitmap`
................
................
.....DDDDDDDD...
....DDDDDDDDDD..
...DDDDDDDDDDDD.
...DDDDDDDDDDDD.
.....DDDDDDDDD..
.......CCCCCC...
......CCCCC.....
......CCCCC.....
.......CCCC.....
......CCCCC.....
.....CCCCCCC....
....CCCCCCCCCC..
................
................` ]
  ,[ bush1, bitmap`
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....FFFFFFFFFF..
................
................`]
  ,[ bush2, bitmap`
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..`]
  ,[ bush3, bitmap`
....444444444D..
....444444444D..
....444444444D..
....444444444D..
....444444444D..
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
FFFF444444444FFF
....444444444D..
....444444444D..`]
  ,[ bush4, bitmap`
................
................
................
................
................
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
FFFFFFFFFFFFFFFF
................
................`]
  ,[block, bitmap`
CCCCCCCCCCCCCCCC
CFFFFFFCCFFFFFFC
CFFFFFFCCF3333FC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CCCCCCCCCCCCCCCC`]
  ,[goal1, bitmap`
...HHHHHHHHHH...
..HH........HH..
.HH.55555555.HH.
HH.55......55.HH
H.55.777777.55.H
H.5.77....77.5.H
H.5.7......7.5.H
H.5.7......7.5.H
H.5.7......7.5.H
H.5.7......7.5.H
H.5.77....77.5.H
H.55.777777.55.H
HH.55......55.HH
.HH.55555555.HH.
..HH........HH..
...HHHHHHHHHH...`]
  ,[goal2, bitmap`
2222222222222222
2000000000000002
2000000000000002
2000000000000002
20000FFFFFF00002
20000F6666F00002
20000F6666F00002
20000FF66FF00002
200000F66F000002
200000F66F000002
200000FFFF000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2222222222222222`]
  ,[key, bitmap`
................
................
................
................
..6666..........
..6..66.........
..6...66666666..
..6..66..66.66..
..6666...66.66..
................
................
................
................
................
................
................`]
)
setPushables({
  [player]: [block]
});
setSolids([box, player, bush1, bush2, bush3, bush4, block,goal2])
onInput("s", () => {
  getFirst(player).y += 1; 
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("j", () => {
  const currentLevel = levels[level]
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {
  const playerTiles = tilesWith(goal).length;
  const goalTiles = tilesWith(goal, player).length;
  const currentLevel = levels[level];
  const blockGoalTiles = tilesWith(goal1, block).length;
  const blockTiles = tilesWith(block).length;
  const keyTiles = tilesWith(key).length;
  if (blockGoalTiles === blockTiles) {
    if (playerTiles === goalTiles) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you escaped!", { y: 4, color: color`0` });
    }}
  };
  if (tilesWith(key, player).length > 0){
    for (const item of getAll(goal2)) {
      item.remove();
      }
    for (const keyItem of getAll(key)) {
      keyItem.remove();
      }
  };
  if (level === 4) {
    addText("move box to goal"), { y: 3, color: color`0` }
            } else if (level === 0) {
    addText("enter the goal"), { y: 5, color: color`0` }
            } else{
    clearText();
            }
  });
        
let level = 0
const levels = [
  map`
p..
...
..g`,
  map`
pc.....
.vdd.b.
.....b.
.b.bbbg
..bbbbb
.......`,
  map`
.........
.cbb.c..b
dvdd.vd..
bc..pcbb.
dvdvdvd..
bcgubub.b
bc.......`,
  map`
p..bb.....
.b....b.b.
.bbbbbb.b.
.b.bb...b.
....bgb.b.
.bb.b.b.b.
.bb..bbb.b
..bbbbbbbb
.......b..`,
  map`
pc..l.....l
.c.........
.c.........
.c.........
.vdddd.dddd
....n..n..g
.b.b.b.b.b.
...........`,
  map`
.ccgcbbbbbb
.cc.vdddddd
.cc.......p
.cvdddddddd
.vddddddddd
...........
.b.b.b.b.b.
...........`,
  map`
vddddddddddddddv.
cgm............c.
cmm..nn.nn.n...c.
c..n.b.b..n.bb.c.
c...bb.pbk.nbb.c.
c..n.b.b..n....vv
cb..n...n....lllc
cbb...bb..b..lllc
cbbbb.......blllc
vdddddddvbbbblllc
........vdddddddv`,
  map`
vddddddddddddddv.
cg.............c.
c.b.bbbbbb.....c.
c.b..n.n.n.nb..c.
c.b...npn...bb.c.
c.b..n.n.nbbb..vv
c.b...n.n..bblllc
c.bbbnnn.n.bblllv
c.....b....bblllc
vdddv...bb.bblllc
....vdddvb.bblllc
........c.....vdv
........c.....c..
........vdddddv..`

  
]

setMap(levels[level])
