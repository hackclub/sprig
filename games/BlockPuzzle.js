/*
@title: BlockPuzzle
@author: Konstantinos Fragkoulis
@tags: []
@addedOn: 2024-06-06
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const player = "p"
const rock1 = "a"
const rock2 = "b"
const target = "t"
const enemy = "e"


const rockA = bitmap`
2222L22222222222
1111L21111111111
1111L21111111111
1111L21111111111
1111L21111111111
1111L21111111111
1111L21111111111
LLLLLLLLLLLLLLLL
22222222222L2222
11111111111L2111
11111111111L2111
11111111111L2111
11111111111L2111
11111111111L2111
11111111111L2111
LLLLLLLLLLLLLLLL`
const rockB = bitmap`
22222L2222L2222L
21111L2111L2111L
21111L2111L2111L
LLLLLLLLLLLLLLLL
222L2222L22222L2
111L2111L21111L2
111L2111L21111L2
LLLLLLLLLLLLLLLL
22222L2222L2222L
21111L2111L2111L
21111L2111L2111L
LLLLLLLLLLLLLLLL
22L2222L22222L22
11L2111L21111L21
11L2111L21111L21
LLLLLLLLLLLLLLLL`


setLegend(
  [ player, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0110011111100110
0110011111100110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0110111111110110
0111011111101110
0111100000011110
0111111111111110
0111111111111110
0000000000000000` ],
  [ rock1, rockA ],
  [ rock2, rockB ],
  [ target, bitmap`
......0000......
.....033330.....
....03CCC330....
....03333C30....
...0333333C30...
...03CCC33C30...
...0C333C3C30...
..0C333CCC33C0..
..0C33CCC333C0..
...03C3C333C0...
...03C33CCC30...
...03C3333330...
....03C33330....
....033CCC30....
.....033330.....
......0000......`],
  [ enemy, bitmap`
0000000000000000
0333333333333330
0333333333333330
0333333333333330
0330033333300330
0330033333300330
0333333333333330
0333333333333330
0333333333333330
0330333333330330
0330333333330330
0333033333303330
0333300000033330
0333333333333330
0333333333333330
0000000000000000` ]
)

setSolids([player, rock1, rock2, target, enemy])

let level = 0;
const levels = [
  map`
aaaaaaaaaaaa
ap..b..b..aa
a..b..b..baa
a....b..b.aa
a..b...b..aa
a....b..b.aa
a..b...b..aa
a...b...b.aa
a..b.e.b.taa
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
ap.b.b..b.aa
a..b....b.aa
a....b.b..aa
a..b....b.aa
a....b..b.aa
a..b...b..aa
a...b..b..aa
a..b.e.b.taa
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
ap..b..b..aa
a..b..b..baa
a...b.bb.baa
a..b..bbbbaa
a..b..b..baa
a..b..bbbbaa
a..b..b..baa
a..b.eb..taa
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
a..b..b.b..a
a..b..b..b.a
ap.b..bbb..a
a..b.bbb...a
a..b.bb..b.a
a..b.bbb...a
a..b.bbb...a
a..be.b...ta
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
ap.b.......a
a.b.aaaaaa.a
abb..e..b..a
a..aaaaab..a
a.......bb.a
a......b.b.a
a.......b..a
a.......bt.a
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
ap.b.......a
a.bbaaaaaa.a
abb........a
a..aaaaab..a
a..aaaaabb.a
a...aaab.b.a
a....aaab.aa
ae.....bbt.a
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
ap.......e.a
a..b.bbbbaaa
a..bb..bb..a
a...b.b.b..a
a..bbbbbb..a
a..bb..bb..a
a..bb.bb...a
a..bbb.bb.ta
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
ap.b.bbbbbba
abbb.b....ba
a.b.bbbbbbba
abb.b.b.bb.a
abeb.b.b.bba
abbbbb..b.ba
ab.b..bb.b.a
abb.bb.b..ta
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
abtb.bb.bb.a
a...b..b..ba
a..a.a.aab.a
a.a.bbbaa.ba
abab..ba.b.a
a.e...b.b..a
abab...a.b.a
abb.b.b.b.pa
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaa
a..bb......a
a.p..e.ab..a
aa...b..b..a
a..bbbaabbba
a.bb.b.abbba
a.b.a....t.a
a..b.bbbbbba
a.b.....a.aa
aaaaaaaaaaaa`,
  map`
aaaaaaaaaaaaaaaa
ap.............a
a......e.......a
a.abbaaaaaaaaaaa
a.a..a...b..b.ba
a.a..a.b.b..bb.a
a.abbabb.aaaa..a
a.a..ab.....a..a
a.a..aaaa.t.a..a
a.abb...baaaabba
a.a.....b......a
a.aaaaaaaaaaaaaa
a..............a
aaaaaaaaaaaaaaaa`,
]

const maxMoves = [
  15, 15, 19, 18, 21, 19, 18, 22, 19, 17, 42
]

let curMoves = 0;

const melody = tune`
500: D4~500,
500: D4~500 + A4^500,
500: E4~500 + A4^500 + B4^500,
500: E4~500 + B4^500,
500: F4~500 + B4^500 + C5^500,
500: F4~500 + C5^500 + D5^500,
500: E4~500 + D5^500 + F5^500,
500: E4~500,
500: D4~500,
500: D4~500,
500: E4~500,
500: E4~500 + B4^500,
500: F4~500 + B4^500,
500: F4~500 + B4^500 + C5^500,
500: E4~500 + C5^500 + F5^500,
500: E4~500,
500: D4~500,
500: D4~500,
500: E4~500,
500: E4~500 + B4^500,
500: F4~500 + B4^500,
500: F4~500 + B4^500 + A4^500,
500: E4~500 + A4^500 + C4^500,
500: E4~500,
500: D4~500,
500: D4~500,
500: E4~500 + C5^500,
500: E4~500 + B4^500 + C5^500,
500: F4~500 + B4^500,
500: F4~500 + A4^500 + C4^500,
500: E4~500 + A4^500 + C4^500,
500: E4~500`

const playback = playTune(melody, Infinity)

setMap(levels[level])

setPushables({
  [ player ]: [rock2]
})

addText((maxMoves[level]-curMoves).toString(), { 
  x: 1,
  y: 1,
  color: color`3`
})




function findShortestPath(x, y) {
  let openSet = [{ x: x, y: y, g: 0, h: Math.abs(x - getFirst(player).x) + Math.abs(y - getFirst(player).y), path: [] }];
  let closedSet = new Set();

  while (openSet.length > 0) {
    let current = openSet.reduce((a, b) => (a.f < b.f ? a : b), { f: Infinity });

    if (current.x === getFirst(player).x && current.y === getFirst(player).y) {
      return current.path.length > 0 ? current.path[0] : { x: x, y: y };
    }

    openSet = openSet.filter(cell => cell.x !== current.x || cell.y !== current.y);
    closedSet.add(`${current.x},${current.y}`);

    let neighbors = [
      { x: current.x + 1, y: current.y, g: current.g + 1, h: Math.abs(current.x + 1 - getFirst(player).x) + Math.abs(current.y - getFirst(player).y) },
      { x: current.x - 1, y: current.y, g: current.g + 1, h: Math.abs(current.x - 1 - getFirst(player).x) + Math.abs(current.y - getFirst(player).y) },
      { x: current.x, y: current.y + 1, g: current.g + 1, h: Math.abs(current.x - getFirst(player).x) + Math.abs(current.y + 1 - getFirst(player).y) },
      { x: current.x, y: current.y - 1, g: current.g + 1, h: Math.abs(current.x - getFirst(player).x) + Math.abs(current.y - 1 - getFirst(player).y) }
    ];

    neighbors.forEach(neighbor => {
      if (
        !closedSet.has(`${neighbor.x},${neighbor.y}`) &&
        !tilesWith("rock1", "rock2").some(tile => tile.x === neighbor.x && tile.y === neighbor.y)
      ) {
        let existingCell = openSet.find(cell => cell.x === neighbor.x && cell.y === neighbor.y);
        if (existingCell && neighbor.g < existingCell.g) {
          existingCell.g = neighbor.g;
          existingCell.path = [...current.path, neighbor];
        } else if (!existingCell) {
          openSet.push({ x: neighbor.x, y: neighbor.y, g: neighbor.g, h: neighbor.h, f: neighbor.g + neighbor.h, path: [...current.path, neighbor] });
        }
      }
    });
  }

  return { x: x, y: y };
}


var gameOver = false;

onInput("w", () => {
  tile = getTile(getFirst(player).x, getFirst(player).y-1)
  if(curMoves < maxMoves[level] && tile.length > 0 && tile[0].type == "t") {
    if (level == 10) {
      gameOver = true;
      clearText();
      addText("You Win!", { 
        x: 10,
        y: 4,
        color: color`4`
      })
    } else {
      level++;
      setMap(levels[level]);
      curMoves = 0;
    }
  } else {
    let tmp = getFirst(player).y;
    getFirst(player).y -= 1
    if(tmp != getFirst(player).y) {
      curMoves++;
    }
  }
})

onInput("s", () => {
  tile = getTile(getFirst(player).x, getFirst(player).y+1)
  if(curMoves < maxMoves[level] && tile.length > 0 && tile[0].type == "t") {
    if (level == 10) {
      gameOver = true;
      clearText();
      addText("You Win!", { 
        x: 10,
        y: 4,
        color: color`4`
      })
    } else {
      level++;
      setMap(levels[level]);
      curMoves = 0;
    }
  } else {
    let tmp = getFirst(player).y;
    getFirst(player).y += 1
    if(tmp != getFirst(player).y) {
      curMoves++;
    }
  }
})

onInput("a", () => {
  tile = getTile(getFirst(player).x-1, getFirst(player).y)
  if(curMoves < maxMoves[level] && tile.length > 0 && tile[0].type == "t") {
    if (level == 10) {
      gameOver = true;
      clearText();
      addText("You Win!", { 
        x: 0,
        y: 0,
        color: color`4`
      })
    } else {
      level++;
      setMap(levels[level]);
      curMoves = 0;
    }
  } else {
    let tmp = getFirst(player).x;
    getFirst(player).x -= 1
    if(tmp != getFirst(player).x) {
      curMoves++;
    }
  }
})

onInput("d", () => {
  tile = getTile(getFirst(player).x+1, getFirst(player).y)
  if(curMoves < maxMoves[level] && tile.length > 0 && tile[0].type == "t") {
    if (level == 10) {
      gameOver = true;
      clearText();
      addText("You Win!", { 
        x: 10,
        y: 4,
        color: color`4`
      })
    } else {
      level++;
      setMap(levels[level]);
      curMoves = 0;
    }
  } else {
    let tmp = getFirst(player).x;
    getFirst(player).x += 1
    if(tmp != getFirst(player).x) {
      curMoves++;
    }
  }
})

afterInput(() => {  
  if(curMoves > maxMoves[level]) {
    setMap(levels[level]);
    curMoves = 0;
  }

  if (!gameOver) {
    clearText();
    addText((maxMoves[level]-curMoves).toString(), { 
      x: 1,
      y: 1,
      color: color`3`
    });
  }

  let curX = getFirst(enemy).x;
  let curY = getFirst(enemy).y;
  let _xy = findShortestPath(curX, curY);

  console.log("Target: ", _xy.x, ", ", _xy.y);
  console.log("Player: ", getFirst(player).x, ", ", getFirst(player).y)
  
  if (_xy.x == getFirst(player).x && _xy.y == getFirst(player).y) {
    setMap(levels[level]);
    curMoves = 0;
  }
  
  if (curX !== _xy.x || curY !== _xy.y) {
    if (curX !== _xy.x) {
      getFirst(enemy).x = _xy.x;
    }
    if (curY !== _xy.y) {
      getFirst(enemy).y = _xy.y;
    }
  }

})
