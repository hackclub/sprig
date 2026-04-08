/*
@title: Simple Maze
@author: Chicken-Slayer
@tags: []
@addedOn: 2026-03-22
*/

const player = "p"
const wall = "w";
const flag = "f";
const notwall = "n";

setLegend(
  [player, bitmap`
....FFFFFFFFC...
...FC66666666C..
..FC6666666666C.
.FC666666666666C
FC6666666666666F
FC6666666666666F
FC6666666666666F
FC6666666666666F
FC6666666666666F
FC6666666666666F
FC6666666666666F
FC6666666666666F
.FC66666666666F.
..FC666666666F..
...FCCCCCCCCF...
....FFFFFFFF....` ],
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
  [flag, bitmap`
................
...0............
...033..........
...033333.......
...03333333.....
...033333.......
...033..........
...0............
...0............
...0............
...0............
...0............
...0............
.00000..........
0000000.........
.00000..........`],
  [notwall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)

setSolids([player, wall, notwall])

let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.
wp.w.w......w.w................w.
w..w...w..w...wwwwwww.wwwwwwww.w.
ww.wwwww.wwww.......w.w......w.w.
w...w.......w.w.wwwww.w.wwww.w.w.
www.w.wwwww.w.w.......w.w......w.
w.w...w...w...w.wwwwwww.w.ww.w.w.
w.w.w.w.w.w.www.w.......w..w.w.w.
w.w.w.w.w.w.....w.wwwww.ww.w.w.w.
w...w...w.w.wwwww.....w..w.w.w.w.
w.www.w.w.w.w.....wwwww..w.w.w.w.
w...w.www.w.w.wwwww..w..ww.w.w.w.
w.w.w.....w.w.w......w.ww....w.w.
w.w.wwwwwww.w.w.wwww......ww.www.
w.w.........w.w.wwww.www.ww...ww.
w.wwwwwwwwwww..........w....w..w.
w.............w.wwww.w.w.ww.ww.w.
w.wwww.wwwwww.www..www.w.w..w..w.
w.w..w.w...............w.w..w.ww.
w.w.ww.w.wwwww.wwww.w....w..w..w.
w.w....w.w........w.wwww.w.www.w.
w...wwww.w.w.www.ww..........w.w.
w.w......w.w.w.w.w...wwwww.w.w.w.
w.wwww.www.www.w.w...w...w.w.w.w.
w....w.............w.w.w.w.w.w.w.
w.ww.w.wwwwwwwwwwwww...w.w.w.w.w.
w..w.w..w.....w....w.www.w.w.w.w.
wwww.ww.w.www.w.ww.w.w...w.www.w.
w..w.w....w...w.w..w.w.w.w.w...w.
w.ww.wwww.wwwww.wwww.w.wwwww...w.
w...............w....w........fw.
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp.....w...w...................w
w..www.w.w.w.wwwwwwwwwwwwwwwww.w
ww...w.www.w.w...............w.w
w..w.........w.wwwwwww.w.www.w.w
w.ww.wwwwwww.w.......w.w.w...w.w
w..........w.w.wwwww.w.w.w.www.w
w.wwwwww.w.w.w.w...w.w.w.w.....w
w........w.w.w.w.w...w.w.wwwwwww
w.wwwwwwww.w.w...w.w.w.w.......w
w..............w.w.w.w.wwwwwww.w
wwwww.w.w.wwwwww.w.w.w.n.....w.w
w.....w.w.w......w.w.w.w.www.w.w
w.wwwww.w.w.wwwwww.w...w.w.w.w.w
w.w.....w.w......wnwwwww.w.w.www
w.wwwwwww.w.wwww.w.......w.w...w
w................w.wwwww.w.www.w
wwwwwwwwwwwwwwwwww.....w.....w.w
w................wwwwwww.w.w.w.w
w.wwwwwwwwwwwwww.........w.w.w.w
w..............wwwwwwwwwww.w.w.w
w.www.wwwwww.w......w......w...w
w.w.w.w......wwwwww.w.wwwwwwwwww
w.www.wwwwww......w.w.....w...ww
w.....w......wwww.wwwwwww.w.w..w
wwwww.w.wwwwww....w.....w.w.ww.w
w...w...w......wwww.www.w.w.w..w
w.w.wwwww.wwwwww......w.www.w.ww
w.w.......w......www..w.....w..w
w.wwwwwwwww.wwwwww.w.wwwwwwww..w
w.........n........w.......w..fw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp........w.......w...n........w
w.wwwwwww.w.w.www.w.w.w.w.wwww.w
w.w.....w.w.w.....w.w.w.w.w..w.w
w.wwwww.w.w.w.w.www.w.w.w.ww.w.w
w.w...w.w.w.www.w...w.w.w....w.w
w...w.w.w.w.....w.www.w.w.ww.w.w
wwwww.w...w.www.w.w...w.w..w.w.w
w.....wwwww.w...w.w.www.ww.w.w.w
w.www.......w.www.w.w......w...w
w.w.wwwwwwwww.w.....w.www.wwww.w
w.w...........wwwww.w...w....w.w
w.w.wwwwwwwww.....w.www.w.w.ww.w
www.w.......w.www.w.w...w.w....w
w...w.www.w.w.w...w.w.www.wwwwww
w.www.w.www.w.wwwww.w.w........w
w.w...w.....w...w...n...wwwwww.w
w.w.w.w.wwwwwww.w.wwwww.w......w
w...w.w.........w.w.......wwww.w
wwwww...w.www.www.w.wwwww....w.w
w...wwwww.w.w...w.w.....wwww...w
w.w.......w.www.w.w.www....wwwww
w.wwww.wwww.w...w.w.w.w.ww.....w
w....w.w....w.www.w.www.w..www.w
w.ww.w.w.wwww.w...w.....w.ww...w
w.w...........w.www.wwwww....www
w.wwwwwww...www.w.........wwww.w
w.......www.w...w.wwwwwww.w....w
www.w.w..w..w.w.w.w.........ww.w
w.www.w.ww.ww.www.w.wwwwwwwww..w
w.....w.......w...............fw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: [notwall]
})

const winPage = map`.`

// Audios:
const melody = tune`
142.85714285714286: C5^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: G5^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: E5^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: G4^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: E5^142.85714285714286,
142.85714285714286: A4^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: E5^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: A4^142.85714285714286,
142.85714285714286: D5^142.85714285714286,
142.85714285714286,
142.85714285714286: A4^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: A4^142.85714285714286,
142.85714285714286: E5^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: A4^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: C5^142.85714285714286,
142.85714285714286: G5^142.85714285714286,
142.85714285714286,
142.85714285714286: G5^142.85714285714286,
142.85714285714286: G5^142.85714285714286,
142.85714285714286,
142.85714285714286: G5^142.85714285714286,
142.85714285714286: F5^142.85714285714286,
142.85714285714286: E5^142.85714285714286`;
const victory = tune`
146.34146341463415,
146.34146341463415: G4/146.34146341463415,
146.34146341463415: E5/146.34146341463415,
146.34146341463415: C5/146.34146341463415,
585.3658536585366,
146.34146341463415: C5/146.34146341463415,
146.34146341463415: C5/146.34146341463415,
3219.512195121951`;

const playback = playTune(melody, Infinity)

// Define Movement:

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

// Win Conditions and Logic:

afterInput(() => {
  const winCon = tilesWith(player, flag).length;

  if (winCon == 1) {
    level +=1
    playTune(victory)

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    }
    else {
      setMap(winPage);
      addText("You win!", {y: 4, color: color`3`});
    }
    
  } 
})