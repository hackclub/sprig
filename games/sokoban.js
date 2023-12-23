/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p";
const wall = "w";
const door = 'd';
const goal = "g";
const key = 'k';
const keyGoal = "q";
const box = "b";
const boxGoal = "m";
const melody = tune`
461.53846153846155: E4~461.53846153846155,
461.53846153846155: G4~461.53846153846155,
461.53846153846155: B4^461.53846153846155,
461.53846153846155: D5-461.53846153846155,
461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: F4~461.53846153846155,
461.53846153846155: A4-461.53846153846155,
461.53846153846155: G4^461.53846153846155,
461.53846153846155: D4~461.53846153846155,
461.53846153846155: A4~461.53846153846155,
461.53846153846155: E5^461.53846153846155,
461.53846153846155: B4-461.53846153846155,
461.53846153846155,
461.53846153846155: C5^461.53846153846155,
461.53846153846155: A4~461.53846153846155 + F4^461.53846153846155,
461.53846153846155,
461.53846153846155: E4~461.53846153846155,
461.53846153846155: D4~461.53846153846155,
461.53846153846155: C5~461.53846153846155 + A4^461.53846153846155,
461.53846153846155: G4^461.53846153846155,
461.53846153846155: E5~461.53846153846155,
461.53846153846155,
461.53846153846155: F4-461.53846153846155,
461.53846153846155: B4-461.53846153846155 + E4~461.53846153846155,
461.53846153846155: A4~461.53846153846155,
461.53846153846155: D5^461.53846153846155,
461.53846153846155: E5/461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155 + G4^461.53846153846155,
461.53846153846155: F5^461.53846153846155 + F4~461.53846153846155,
461.53846153846155`;

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
......000.......
.....02220......
....0222220.....
....0223220.....
....0222220.....
.....02220......
......000.......
......0.0.......
.....00.00......
................` ],
  [key, bitmap`
6666666666666666
666..........666
666..........666
6..6........6..6
6...6......6...6
6....6....6....6
6.....6..6.....6
6......66......6
6......66......6
6.....6..6.....6
6....6....6....6
6...6......6...6
6..6........6..6
666..........666
666..........666
6666666666666666`],
  [door, bitmap`
...0000000000...
.00CCCCCCCCCC00.
0CCC00000000CCC0
0CC0CCCCCCCC0CC0
0C0CCCCC0CCCC0C0
0C0CCCCC0CCCC0C0
0C0CCCCCCCCCC0C0
0C0CCC0CCCCCC0C0
0C0CC00CCC6CC0C0
0C0CC0CCC666C0C0
0C0CCCCCCC6CC0C0
0C0CCCCCCCCCC0C0
0C0CC0CCCCCCC0C0
0C0CC0CCCCCCC0C0
0C0CC0CCCC0CC0C0
0C0CCCCCCC0CC0C0`],
  [wall, bitmap`
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
0000000000000000
LLLLLL0LLLLLLLLL
LLLLLL0LLLLLLLLL
LLLLLL0LLLLLLLLL
LLLLLL0LLLLLLLLL
LLLLLL0LLLLLLLLL
0000000000000000
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL
LLLLLLLLLLLL0LLL`],
  [goal, bitmap`
................
....4...........
....44..........
...464444.......
...6644444444...
....04444444444.
....04444444....
....04444.......
....04..........
....0...........
....0...........
....0...........
....0...........
...000..........
..00000.........
................`],
  [keyGoal, bitmap`
....66666666....
...6........6...
..6..666666..6..
.6.66......66.6.
6..6........6..6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6..6........6..6
.6.66......66.6.
..6..666666..6..
...6........6...
....66666666....`],
  [box, bitmap`
CCCCCCCCCCCCCCCC
CCC..........CCC
CCC..........CCC
C..C........C..C
C...C......C...C
C....C....C....C
C.....C..C.....C
C......CC......C
C......CC......C
C.....C..C.....C
C....C....C....C
C...C......C...C
C..C........C..C
CCC..........CCC
CCC..........CCC
CCCCCCCCCCCCCCCC`],
  [boxGoal, bitmap`
....CCCCCCCC....
...C........C...
..C..CCCCCC..C..
.C.CC......CC.C.
C..C........C..C
C.C..........C.C
C.C..........C.C
C.C..........C.C
C.C..........C.C
C.C..........C.C
C.C..........C.C
C..C........C..C
.C.CC......CC.C.
..C..CCCCCC..C..
...C........C...
....CCCCCCCC....`]
  
)

setSolids([player, wall, door, key, box]);
setPushables({
  [player]:[key, box, player],
  
})

let level = 0
const levels = [
  map`
...wwp
.w..w.
......
.wkw..
.w..wd
.w..w.
qw..w.
..wwwg`,
  map`
wwwwwwwww.
w.....dgw.
wpkkk.www.
w..wqqqw..
ww....ww..
.wwwwww...`,
  map`
.....wwww
wwwwww..w
w.k.k...w
w......pw
w..wwwdww
wqqw.wgw.
wwww.www.`,
  map`
..wwww
..wm.w
..wq.w
wwwq.w
wgd..w
www..w
wwwk.w
wpk..w
w.b..w
w....w
wwwwww`,
  map`
.........
wwwwwwwww
mq....dgw
w.kb..www
w.b.k..w.
w.kb...w.
wm.pw..w.
wwwwwqqw.
....w.mw.`,
  map`
wwwwwwwww
wmw..pdgw
wqwkk.www
wqw..ww..
wqw.kw...
w.w..w...
w...bw...
w....w...
w...ww...
wwwwww...
.........`,
  map`
wwwww...
w...ww..
wmbbpwww
wq.k.dgw
wmmb.www
w..www..
w..w....
w..w....
wwww....`,
  map`
wpwww.....www..
w...ww....wgw..
ww.b.wwwwwwdwww
ww...w..w...wmw
ww.www..w.....w
w....w..www.w.w
w..w.w.w....w.w
w..w...w..w.w.w
w.ww.w..w.w...w
w..w......w.w.w
ww..w.w....w..w
ww..www.www..ww
ww............w
wwwwwwwwwwwwwww`,
  map`
.wwwwwwwww
.w..qq...w
.w.qm....w
.w..mm...w
.w..www..w
.w..w..k.w
.w.bw..k.w
ww.b.w.k.w
w..b.w..pw
w....wwwww
wwwdww....
..wgw.....`,
  map`
wwwwwwwwww..
w..b..bw.w..
w.bbbb.wbw..
wb.......www
w...bb.b.dgw
wpk.bb..bwww
w....bb.qw..
w.bb.....w..
w...bb.b.w..
wbb....b.w..
wwwwwwwwww..`,
  map`
..wwww...
..w..w...
..w.kwwww
wwwq.q..w
w.k.w.k.w
w..q.qwww
wwwwk.dgw
...w.pwww
...wwww..`,
  map`
..........w..
.www.w.wdw...
...ww..wgw..w
ww...wwww...w
..ww...w...m.
.k...ww..b.w.
.kk...w..bb.m
....w..w.b.w.
..ww.......m.
.qqqw.www.w..
wwwwwpw.m....`,
]

setMap(levels[level]);

addText("w, a, s, d to move. \nl to clear text.\nj to reset level.", {x:0, y:0, color: color`3`});

playTune(melody, Infinity)


// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
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

onInput("l", () => {
  clearText("");
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {

  let targetKey = tilesWith(key).length;
  let keyCovered = tilesWith(keyGoal, key).length;
  let targetBox = tilesWith(box).length;
  let boxCovered = tilesWith(boxGoal, box).length;
  if (targetKey === keyCovered && targetBox == boxCovered && getFirst(door) !== undefined){
    getFirst(door).remove();
  }
  else if (targetKey === keyCovered && getFirst(door) !== undefined && level === 9){
    getFirst(door).remove(); 
  }

  
  const win = tilesWith(goal).length;

  const checkWin = tilesWith(goal, player).length;
  if(checkWin === win){
    level = level+1;
    const currentLevel = levels[level];
  

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } 
    else {
      addText("you win!", { y: 4, color: color `3` });
    }
  }
})