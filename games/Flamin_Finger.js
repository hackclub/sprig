/*
@title: Flamin_Finger
@author: Richie Tran
@tags: ['puzzle','timed']
@addedOn: 2023-02-23
A computer rendition of the classic game Flamin' Finger! Use WASD to move and colect the white circles!
Find the secret (not so secret) easter egg!!
All levels are possible and were tested by multiple people
Make sure CAPSLOCK isn't on!
(Code for timer used from "Flurffy" by Lucas :))
*/

const player = "p";
const barrier = "b";
const goal = "g";
const background = "o";
const trail = "t";

setLegend(
  [ player, bitmap`
0000000000000000
0000000000000000
0000022000000000
00002.2000000000
00002.2000000000
00002.2220000000
00002.2.22000000
00222.2.2.220000
02.2....2.2.2000
02.2......2.2000
02...........200
02...........200
002..........200
0002........2000
0000222222220000
0000000000000000`],
  [ barrier, bitmap`
0000000000000000
0000000000000000
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0066666666666600
0000000000000000
0000000000000000`],
  [ goal, bitmap`
0000000000000000
0000000000000000
0000002222000000
0000222222220000
0002222222222000
0002222222222000
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0002222222222000
0002222222222000
0000222222220000
0000002222000000
0000000000000000
0000000000000000`],
  [ background, bitmap`
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
  [ trail, bitmap`
0000000000000000
0000000000000000
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0000000000000000
0000000000000000`]
);

setBackground(background)

setSolids([player, barrier]);

let level = 0;
const levels = [
  /*
..............................
..............................
..............................
..............................
..............................
..............................
*/
  map`
...................
.....b...b....b....
.....b...b..b.b....
.....bbbbb....b....
.....b...b..b......
.....b...b..b.b....
...................
..bbbbbbbbbbbbbbb..
..bp...........gb..
..bbbbbbbbbbbbbbb..`,//level 1
  map`

.............bbbbb.bbbbb...bbb..bbb.bbbbb..bbb.............
.....bbbbb.....b.....b....b.....b.....b...b................
.....bgbpb.....b.....b....b..bb.bb....b....bb..............
..bbbb.b.b.....b.....b....b...b.b.....b......b.............
..b....b.b...bbbbb...b.....bbbb.bbb...b...bbb..............
..b.bbbb.b.................................................
..b....b.b...b..b...b...bbb..bbb.....b...bbb.bbbbb.bbb.bbb.
..bbbb.b.b...b..b..b.b..b..b.b..b...b.b..b.....b...b...b..b
.....b...b...bbbb..bbb..bbb..b..b...bbb..bb....b...bb..bbb.
.....bbbbb...b..b.b...b.b..b.b..b..b...b.b.....b...b...b.b.
.............b..b.b...b.b..b.bbb...b...b.b.....b...bbb.b..b`,//level 2
  map`
............................................
.bbbbbbbbbbbbb..............................
.bbg.........b..............................
.bpbbbbbbbbb.b..............................
.b..b......b.b..............................
..b..b.....b.b.b...bbb.b...b.bbb.b....bbbbb.
...b..b....b.b.b...b...b...b.b...b.......b..
....b..b...b.b.b...bb...b.b..bb..b......b...
.....b..b..b.b.b...b....b.b..b...b.....b....
......b..b.b.b.bbb.bbb...b...bbb.bbb...b....
.......b..bb.b..............................
........b..b.b..............................
.........b...b..............................
..........bbbb..............................
............................................`,//level 3
  map`
.bbbbbbbbbbbbbbb..bbb..b....b.
.bpb...b...b...b.b.....b....b.
.b...b.b.b.b.b.b.b..bb.b....b.
.bbbbb.b.b...bgb.b...b.b......
.....b...bbbbbbb..bbbb.bbbb.b.
.....bbbbb....................
`,//level 4
  map`
..bbbbbbbbbbbbbbb.............
..bp.....b......b.............
..bbbbbb.b.bbbb.b.............
.......b...b..b.bbbbbbbbbbbbb.
.bbbbbbbbbbb..b.b.........bgb.
.b.......b....b.b.bbbbbbb.b.b.
.b.bbbbb.b....b.b.b.....b.b.b.
.b.....b.bbbbbb.b.b.....b.b.b.
.bbbbb.b........b.b.....b.b.b.
.....b.bbbbbbbbbb.b.....b...b.
.....b............b.....bbbbb.
.....bbbbbbbbbbbbbb...........`,//level 5
  map`
..bbbbbbbbbbbbbbb.............
..bp.....b......b.....bbb.....
..bbbbbb.b.bbbb.b.....bgb.....
.......b...b..b.bbbbbbb.bbbbb.
.bbbbbbb.bbb..bbb.....b...b.b.
.b.......b....b...bbbbbbb.b.b.
.b.bbbbb.b....b.b.b..b..b.b.b.
.b.....b.bbbbbb.b.b..bb.b.b.b.
.bbbbb.b........b.....b.b.b.b.
.....b.bbbbbbbbbb.bbb.b.b...b.
.....b..b.........b.b...b.b.b.
.....bb.bbbb.bbbbbb.bbbbb.b.b.
..bbbbb.bbbb.bbbb..........bb.
..b.............bbbb.bbbbbb.b.
..bbbbbbbb.bbbbbb.bb........b.
.........b.b.........bbbbbbbb.
.........b...bbbbb.bbb.b......
.........bbbbb...b.....b......
.................bbbbbbb......`,//level 6
  map`
..bbbbbbbbbbbbbbbbbbbbbbbbbb..
..bp.....................bgb..
..bbb.bbbbbbbbbbbbbbbbbbbb.b..
....b......................b..
....bbbbbbbbbbbbbbbbbbbbbbbb..`,//level 7
  map`
.............................
........bbbbbbb..............
.......b.......b.............
......b.........b............
......b...bbbbbbb............
......b..b.......b...bb......
....bbb..b.......b.....b.....
...b..b..b.......b..b...b....
...b..b...bbbbbbb.......b....
...b............b........b...
...b..b.........b........b...
...b..b.........b....b...b...
....bbb...bbbb..b.......b....
......b...b.b...b.......b....
......b...b.b...b......b.....
......b.g.b.b.p.b............
.......bbb...bbb.............`,//level 8
  map`
....bbbbb........................
....b..gb........................
bbbbb.bbbbbbbbbbbbbbbbbbbbbbbbbbb
b...............................b
b........................p......b
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,//level 9
  map`
...................bbbbbbbb...
.......bbbbbbbbb...b......bb..
...bbbbb.......bbbbb.bbbb..b..
...bpbgb.bbbbb.b.....b...b.b..
...b.b...b...b.b.bbbbb.b.b.b..
...b.bbbbb.b.b.b.b...b.b.b.bbb
...b.b...b.b.b.b.b.b.b.b.b...b
...b.b.b.b.b.b...b.b.b.b.bbb.b
...b.b.b.b.b.bbbbb.b...b...b.b
...b...b...b.......bbbbbbb...b
...bbbbbbbbbbbbbbbbb.....bbbbb`,//level 10
  map`
..............................
.bbbbbbbbbbbbbbb....bbbbbbbbb.
.bp............b....b......gb.
.bbbbbb.bbbbbbbbbbbbb.bbbbbbb.
......b...............b.......
......bbbbbbbbbbbbbbbbb.......`,//level 11
  map`
.....bbbb.....
...bbpbg.bb...
..b...bb...b..
.b..bbbbbb..b.
.b.bb....bb.b.
b..b.b..b.b..b
b.bb......bb.b
b.bbb....bbb.b
b..b.bbbb.b..b
.b.bb....bb.b.
.b..bbbbbb..b.
..b...bb...b..
...bb....bb...
.....bbbb.....`,//level 12
  map`
...........bb...........
..........b..b..........
.........b....b.........
........b..bb..b........
.......b..bbbb..b.......
......b..bbbbbb..b......
.....b..b..gbbbb..b.....
....b..bb.bbbbbbb..b....
...b..bb..bbb...bb..b...
..b..bbb.bbbb.b...b.bb..
.bp.bbbb......bbb...bbb.
..bbbbbbbbbbbbbbbbbbbb..`,//level 13
  map`
..................
.bbbbbbbbbbbbbbbb.
.bpbb..........bb.
.b.b..bbbbbbbb..b.
.b.bb..b.....bb.b.
.b.bbb...bbb..b.b.
.b.bbbbbb...b.b.b.
.b.b....b.b.b.b.b.
.b.b.bb.bgb.b.b.b.
.b.b..b.bbb.b.b.b.
.b.bb.b.....b.b.b.
.b.bb.bbbbbbb.b.b.
.b.b..........b.b.
.b..bbbbbbbbbbb.b.
.bb.............b.
.bbbbbbbbbbbbbbbb.
..................`,//level 14 
  map`
..bbbbbbbbbbbbbbb.......................bbbbbbbb............
..bp............bbbb...bbb...bbbbb.....bb......bbbbbb.......
bbbbbbbbbbbbbbb.b...bbb..b..b.....b....b.b.bbb...b..b.......
b.....b.........b.b.b.bb.b.b..bbb..bb.bb.b.b...b....bb......
b.bbbbb.bbbbbbbbb.b...bb.bbb.bbb....bbb....bbb.bbbb..b......
b...........b...b.b.b.........bb.b.bb...bbbb.b.bbb.b.b..bbbb
bbbbbbbbbbb.b.b...b.bbbbbbb.b....b..bbb.bbb..bbb...b.bbbb..b
.b...b......b.bbbbb......bb.bbbbbbb.....bbb......b......b..b
.bbb.b.bbbbbb.......bbbb.b....b.b.bb.bbbb...b.bbbbbbbbbbbb.b
...b.b......bbbbb..........b..b........bb.bbb.bbb..b....bb.b
bbbb.bbbbbb.b...bbbbbbbbbb.bbbbbbbbbbb..b..bbbb...bbb...b..b
b..b........b.b......b...........b...bbbbb......b.b.bbb...bb
b.bbbb.bbbbbb.bbbbb.bbbb.bbb.bbb...b.....bbbbbbbb.b.b.bbbbbb
b.................b......bb....bbbbbbbbb.b......b.....b...bb
bb.bbbbbbbbbb.bbb.bbbbbbbb..b..b.......b.b.bbbb.bbbbb.b.b.bb
b........b.............b.b.bb.bbb.bbbbbb...b.......b..bgb..b
bbbb.bbb.bbbbbbbbbbbbbbb.b.............bbbbb.bbbb.bbb.bbbb.b
...b.....................b.bbbbbbbbbbb.....b..b.....b......b
...bbbbbbbbbbbbbbbbbbbbbbbbb.........bbbbbbbbbbbbbbbbbbbbbbb`,//level 15
  map`
....................................................
.bbb.b.b...b...bb..b.b...b...b...b..bb..b..b...b.b..
..b..b.b..b.b..b.b.b.b..b....b...b.b..b.b..b...b.b..
..b..bbb..bbb..b.b.b.bbb......bbb..b..b.b..b...bbbb.
..b..b.b.b...b.b..bb.b..b......b...b..b.b..b.....b..
..b..b.b.b...b.b...b.b...b.....b....bb...bb......b..
....................................................
....bbb..b.....b...b.b.bbb.b..b..bb..b.....b.b......
....b..b.b....b.b..b.b..b..bb.b.b....b....bbbbb.....
....bbb..b...bbbbb..b...b..b.bb.b..b.......bbb......
....b....bbb.b...b..b..bbb.b..b..bbb.b......b.......
....................................................
......p.....................................g.......`,//level 16
];

setMap(levels[level]);

//code for timer (resets every level and when you die), different time for each level
const levelTime=[
  2,
  5,
  8,
  10,
  14,
  18,
  5,
  50,
  2,
  19, 
  3,
  6,
  7,
  12,
  30,
  ];

var tempototal=levelTime[level];
var tempodescendo = setInterval(function() {
	tempototal--;
	clearText();
	addText("" + tempototal, {
		y: 1,
		color: color`3`
	});
	if (tempototal <= 0) {
		clearTile(getFirst(player).x, getFirst(player).y);
        tempototal=tempototal;
		tempodescendo;
        reset()
	}
}, 1000);

//reset for when you run our of time
function reset(){
  setMap(levels[level]);
  tempototal=levelTime[level];
}

setPushables({
  [ player ]: [],
});

//code for trails after you move
let trails = true;
function wMove() {
  for(let i of getAll(player)){
    if(trails){
      addSprite(i.x, i.y+1, trail);
    }
  }
}
function aMove() {
for(let i of getAll(player)){
    if(trails){
      addSprite(i.x+1, i.y, trail);
    }
  }
}
function sMove() {
for(let i of getAll(player)){
    if(trails){
      addSprite(i.x, i.y-1, trail);
    }
  }
}
function dMove() {
for(let i of getAll(player)){
    if(trails){
      addSprite(i.x-1, i.y, trail);
    }
  }
}

//movement keys
onInput("w", () => {
  getFirst(player).y -= 1
  wMove();
});
onInput("a", () => {
  getFirst(player).x -= 1
  aMove();
});
onInput("s", () => {
  getFirst(player).y += 1
  sMove();
});
onInput("d", () => {
  getFirst(player).x += 1
  dMove();
});

//code for going on to next level or winning
afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, player).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    tempototal=levelTime[level];
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      clearText();
      addText("you win!", { y: 4, color: color`3` });
      clearInterval(tempodescendo);
    }
  }
});