
/* 
@title: for_Squiggly_myLost_worm
@author: Jeremiah Sung
@tags: ['puzzle']
@addedOn: 2023-10-19
*/

    /*
First time? Check out the tutorial game:d
https://sprig.hackclub.com/gallery/getting_started
*/

//Inverted controls:
//W to go down
//S to go up
//D to go left
//S to go right
//Go the to Crown to go on to the next level
//The player will "usually" start on the top right or the right side of the map
//This is the memorial for my third grade pet squiggly

const player = "p"
const block = "b"
const goal = "g"
const obstacle = "o"


setLegend(
  [ player, bitmap`
................
................
................
.....7777.......
.....70.0.......
.....7..7.......
.....777777.....
.......7..7.....
.......7..7.....
.....777777.....
.....7..7.......
.....7..7.......
.....7777.......
......0.0.......
.....00.00......
................` ],
  [block, bitmap`
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
0000000000000000` ],
  [goal, bitmap`
................
................
....66..........
....66.6...6....
...666.66.666...
...666666.6666..
..666666666666..
..666366366636..
..666366366336..
..666666666666..
..666666666636..
..663333333336..
................
................
................
................`],
  [obstacle, bitmap`
3333333333333333
33...........333
3.3..........3.3
3..3........33.3
3...3.......3..3
3...33.....33..3
3....33...33...3
3.....33.33....3
3......333.....3
3....333.33....3
3...33....33...3
3..33......33..3
3.33........33.3
333..........3.3
33...........333
3333333333333333`]
);

let level = 0;
const levels= [
  map`
pg`,
  map`
.....
.bbb.
.bbb.
.bbb.
pbbbg`,
  map`
pooo.
oo.oo
o.b.o
oogoo
.....`,
  map`
p.o
.o.
o.g`,
   map`
p...bbb
......b
bbbbb.b
pobgbob
pob.bob
..ooo..
ppppp.p
ppppp.p`,
    map`
p.........b........b
b.bbbbbbbbb.bbbbbb.b
b........b.......b.b
b.bbbbbobbbbbbbb.b.b
b.....bob......b.b.b
bbbbb.b.b.b.bbbb.b.b
bbb.b.b.bbb......b.b
b.b.b.b.b.b.bbbbbbgb
b.b.b.b.b.b.......bb
b.bbb.b.b.bbbbbbb.bb
b.....b.........b...
b.....bbbbbbbb..b...
bbb.bbb...b..b..b...
..b.b.....b.bb..bb.b
..b.b..b..b.........
.b....b...b.bbb.bb.b
b..b..b...b.b.b.bb.b
b.bb..b...bbb.b.bb.b
bbbbbbb.......bbbb.b
.......bbbbbb......b`,
  map`
p.
.g`,
  map`
p.ooooooooooooooooo....................b.b.b......
bbbbbbbbbbbbbbbbbbbb.................b............
...................b..............................
bbbbbbbbb.bb.......b...............b..............
b...........bb.bbbbb.............b..bb......b.....
................................b.........bb......
.bbb........b..b.b..b.b.bb..b.b....b.b.bb.........
.....b............b.......b....b...b....b..b..b...
................b......bbb.....b.bbb...........b..
...........b........bb....b.........b.b...........
.......b......b....b...b.b.b.....b.b..............
...b..b.b.b.......................b..........b..b.
.....b.........b...b...b..........................
......b..b.........b.b............................
..........b.............b............b....b.......
............b....b.........b...b..................
......................b....b....bb...b.b..........
..............b....b...............b..b.bbb.......
bbb..............................b.b..............
b.bbb.....................b.......................
g..o..............................................
b..bb.............................................`,
    map`
bbbb..............................................
po.bb.b.......................o...................
.bbbbbb..b..............b......b.............bb...
.ob...bbb.b.b.b..bbbbb.bbo.....b....bb..bb.b.bb...
.bbbb...b.b.b.b..bbbb...b......bbb..bbb.b...bbb...
.bb...b.bb...b...bb.b...b......b.b.bb...b.........
..................................................
..................................................
................................bbbb..............
................................b..b..............
................................b..b.....bbb..b...
................................b..b.b.b.b.b..bbb.
................................b..b.b.bbbb..b....
................................b..b..b.b.....b...
................................bbb...bbbbbb.bb...
.............................................b....
.........................................bbb.bbbbb
.........................................b.......b
.........................................b.......b
.............................................g...b
.................................................b
.........................................b.......b
.........................................bbbbbbbbb`,
    map`
poooo
o.oog
o.bb.
o.bb.
.....`,
  map`
.bbb.bbb.bbb.bbb.bbb
.b.b.b.b.b.b.b.b.bgb
pooooooo...........b
b..b...b...b...b.bbb`,
  map`
poooooooog
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.oooooooo.
.ooooooo..
.ooooooo..
.oooooo...
.oooooo...
.ooooo....
.ooooo....
.oooo.....
.oooo.....
.ooo......
.ooo......
.oo.......
.oo.......`,
  map`
p.g`,
  map`
p..g`,
  map`
p...g`,
  map`
p...g`,
  map`
p.....g`,
  map`
p........g`,
  map`
gbbbbbbbbbbbb
.b...........
.b.bbbbbbbbb.
.b.b.......b.
.b.b.bbbbb.b.
.b.b.b...b.b.
.b.b.bpb.b.b.
.b.b.bbb.b.b.
.b.b.....b.b.
.b.bbbbbbb.b.
.b.........b.
.bbbbbbbbbbb.
.............`,
  map`
.bbbbbbbbbb......b..bbbbbbbbb
.p....b...b.bbbb.b.bb........
.b.bbbbbbbbb.bbb.b..bb.......
.bbb..b.b.b.bbbb..b..bbbbb.b.
.bb.bb......bbbbb.b..b..b.b..
....bb.bb...b.b.....bbbb.....
........bbb....b..b.b...b.bb.
.b.bbbbbb.bbb...b.b.bbbbb.b..
.b.....b....b.b.b.bbb........
.bbbbbbbb.b.b.b...b.....bbb..
.bg............b.......bb....`,
  map`
p......................b..bb.bbb..b.b.pg
....b.................b.b.b..b.b..b.b...
....bb...............b..b.bb.b.b..b.b.p.
....b.b.............b...b..b.b.b..b.b.p.
....b..b.....b.....b....b.bb.bbbb.bbb.p.
....b...b...b.b...b.....b...............
....b....b.b...b.b......b.bbb.bbb.b.b.b.
....b.....b.....b.......b.b...b...b..b..
....b...................b.b.b.b.b.b..b..
....b...oo..ooo..oo.....b.b.b.b.b.b..b..
....b...oo..ooo..oo.....b.bbb.bbb.b..b..
....b...oo..ooo..oo.....b...............
....b...................b...............
....bbbbbbbbbbbbbbbbbbbbb...............
........................................`,
 map`
p......................g`
  ]
  
setMap(levels[level])

setSolids([ player, block, obstacle ]);

setPushables({
  [player]:[obstacle],
  [obstacle]:[obstacle]
});

onInput("w", () => {
  getFirst(player).y += 1
})

onInput("s", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x -= 1
})

onInput("a", () => {
  getFirst(player).x += 1
})


onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  clearText("");
  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const blockedNumber = tilesWith(goal,obstacle).length;
    const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, player).length;
  if(blockedNumber == targetNumber){
  addText("You may want ", { y: 4, color: color`3` });
  addText("Restart ", { y: 5, color: color`3` });
  addText("Press J ", { y: 6, color: color`3` });
  }
  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      clearText("");
    } else {
      setMap(levels[0]);
      addText("Faster", { y: 4, color: color`3` });
    }
  }
})
