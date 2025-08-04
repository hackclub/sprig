/*
@title: RogueLite
@author: A41K
@tags: [#CTF, #puzzle #twoplayer]
@addedOn: 2025-08-01
*/

const player1 = "p";
const player2 = "e";
const fakegoal = "f";
const box = "b";
const goal = "g";
const wall = "w";
const fakewall = "y";
const heart= "h";
const help= "j";
const ty= "t";

setLegend(
  [ player1, bitmap`
................
..333333333333..
.33333333333333.
.33222333322233.
.33200333300233.
.33200333300233.
.33333333333333.
.33333333333333.
.33333333333333.
.30333333333303.
.30033333333003.
.33003333330033.
.33300000000333.
.33333333333333.
..333333333333..
................` ],
  [ player2, bitmap`
................
..777777777777..
.77777777777777.
.77222777722277.
.77200777700277.
.77200777700277.
.77777777777777.
.77777777777777.
.77777777777777.
.70777777777707.
.70077777777007.
.77007777770077.
.77700000000777.
.77777777777777.
..777777777777..
................` ],
  [ goal,  bitmap`
......L133......
......L1333.....
......L13333....
......L13333....
......L133333...
......L1333333..
......L133333...
......L13333....
......L1333.....
......L133......
......L13.......
......L1........
......L1........
......L1........
......L1........
......L1........`],
  [ fakegoal, bitmap`
......L133......
......L1333.....
......L13333....
......L13333....
......L133333...
......L1333333..
......L133333...
......L13333....
......L1333.....
......L133......
......L13.......
......L1........
......L1........
......L1........
......L1........
......L1........`],
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
  [ fakewall, bitmap`
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
  [ heart, bitmap`
................
................
................
................
......3...3.....
.....333.333....
....333333333...
....333333333...
....333333333...
.....3333333....
......33333.....
.......333......
........3.......
................
................
................`],
  [ help, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000220000000
0000000220000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ ty, bitmap`
................
................
................
................
..00000..0...0..
....0.....0.0...
....0......0....
....0......0....
....0......0....
....0......0....
....0......0....
....0......0....
................
................
................
................`],
)

setSolids([player1, player2, wall]);

let level = 0
let scorePlayer1 = 0;
let scorePlayer2 = 0;
// MAPS
const levels = [
  map`
........
.p....e.
........
........
........
........
........
...g....`,
  map`
........
.p....e.
........
........
........
........
........
ffgfffff`,
  map`
.......w..
.p.w..wwe.
wwww..wf..
......www.
..........
ww.ww.www.
....w..w..
f...w.fw..
www.wwww..
wf..gwf...`,
  map`
................
.....p....e.....
................
................
................
wwwwwwwwjwwwwwww
................
................
wwwwwwwwwwywwwww
................
................
wywwwwwwwwwwwwww
................
fffffffffgffffff`,
  map`
..........
p...y....e
wwwwywwwyw
yyyyyywwyw
ywwwwywwyw
wwwwwyyyyw
wyyyyywwyy
yywwwyywww
wywwwwyw..
wywwwwyy.g`,
  map`
fffffffgff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
..........
..........
..........
.p......e.`,
  map`
..p.......
.wwwwwyww.
.w......w.
.w.wwww.w.
.w.wfgw.w.
.w.yffw.w.
.w.wwww.w.
.w......we
.wwwwwwww.
..........`,
  map`
p...wgww...fwwe
....w..www.ww..
...fw......w...
.wwww...wwwwf..
........w.fwww.
....w...w......
...fwww......w.
...ww..wwf...w.
...w....wwwwww.
..w....fw...w..
.wwww.www.w.w..
.w......w.wfw..
.wf.....w.www..
.wwwwww.w.w....
....wf........f`,
  map`
...wwww.wwww...
......w.w....f.
...wwww.wwww...
ww.w.gw.wf.w.ww
.w....w.w....w.
.w.w.ww.ww.w.w.
ww.www...www.w.
...............
ww.wwwe.pwww.ww
.w.w.ww.ww.w.w.
.w....w.w....w.
ww.w.fw.wf.w.ww
...wwww.wwww...
.f....w.w....f.
...wwww.wwww...`,

  map`
........
........
........
...th...
........
........
........
.e....p.`,
  
]


// Create a tune:
const melody = tune`
150: A4-150 + C5-150 + E5-150,
150: G4-150 + F5~150 + C4/150,
150: B4^150 + D4-150,
150: C5^150,
150: G4-150 + F5~150 + C4/150,
150: B4^150 + D4-150,
150: C5^150,
150: G4-150 + F5~150 + C4/150,
300,
150: F4-150 + C5/150,
150,
150: C4/150,
150: G4-150 + F5~150 + D4-150,
150: B4^150,
150: C5^150 + C4/150,
150: G4-150 + F5~150 + D4-150,
150: B4^150,
150: C5^150 + C4/150,
150: G4-150 + F5~150,
300,
150: F4-150 + C5/150,
150,
150: C4/150,
150: G4-150 + F5~150 + D4-150,
150: B4^150,
150: C5^150 + C4/150,
150: G4-150 + F5~150 + D4-150,
150: B4^150,
150: C5^150 + C4/150,
150: G4-150 + B4-150 + D5-150 + F5-150`;
const secret = tune`
500: B5-500 + C4~500 + C5/500 + B4^500,
500: A5-500 + D4~500 + C5/500 + B4^500,
500: G5-500 + E4~500 + C5/500 + B4^500,
500: F5-500 + F4~500 + C5/500 + B4^500,
500: E5-500 + G4~500 + C5/500 + B4^500,
500: D5-500 + A4~500 + C5/500 + B4^500,
500: C5-500 + B4~500 + E4/500 + D4/500 + A5~500,
500: B4-500 + C5~500 + E4/500 + G5~500 + A5~500,
500: A4-500 + D5~500,
500: G4-500 + E5~500 + A5-500 + B5-500,
500: F4-500 + F5~500 + C5~500 + B4~500 + B5-500,
500: E4-500 + G5~500 + F4/500 + F5^500 + C5~500,
500: D4-500 + A5~500 + G4/500 + E5^500,
500: C4-500 + B5~500 + A4/500 + D5^500 + E4-500,
500: B5^500 + C4/500 + B4/500 + C5^500 + E4-500,
500: A5^500 + D4/500 + C5/500 + B4^500 + F4-500,
500: G5^500 + E4/500 + D5/500 + A4^500,
500: F5^500 + F4/500 + E5/500 + G4^500 + C5/500,
500: E5^500 + G4/500 + C5/500 + B4/500 + A5~500,
500: D5^500 + A4/500 + A5~500 + G5~500 + D4-500,
500: C5^500 + B4/500 + F4-500,
500: B4^500 + C5/500 + E4/500 + D4/500,
500: A4^500 + D5/500 + C5-500 + B4~500 + D4/500,
500: G4^500 + E5/500 + C5-500 + B4~500,
500: F4^500 + F5/500 + C5-500 + B4~500,
500: E4^500 + G5/500 + C5-500 + B4~500 + D4-500,
500: D4^500 + A5/500 + C5-500 + B4~500,
500: C4^500 + B5/500 + C5-500 + B4~500,
500: B5~500 + C4-500 + C5-500 + B4~500,
500: A5~500 + D4-500 + C5-500 + B4~500,
500: G5~500 + E4-500 + C5-500 + B4~500,
500: F5~500 + F4-500 + C5-500 + B4~500`;

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 10)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()

const shouldPlaySecret = Math.floor(Math.random() * 5) === 0;

if (shouldPlaySecret) {
  playTune(secret);
}


setMap(levels[level])

setPushables({
  [player1]: [],
  [player2]: []
});

// Player 1 (WASD Controls)
onInput("s", () => {
  getFirst(player1).y += 1
})

onInput("w", () => {
  getFirst(player1).y -= 1
})

onInput("a", () => {
  getFirst(player1).x -= 1
})

onInput("d", () => {
  getFirst(player1).x += 1
})

// Player 2 (Arrow Keys Controls)
onInput("k", () => {
  getFirst(player2).y += 1
})

onInput("i", () => {
  getFirst(player2).y -= 1
})

onInput("j", () => {
  getFirst(player2).x -= 1
})

onInput("l", () => {
  getFirst(player2).x += 1
})

function updateScores(winner) {
  if (winner === player1) {
    scorePlayer1 += 1;
  } else if (winner === player2) {
    scorePlayer2 += 1;
  }
}

function checkWin() {
  const player1Tile = getTile(getFirst(player1).x, getFirst(player1).y);
  const player2Tile = getTile(getFirst(player2).x, getFirst(player2).y);

  if (player1Tile.some(sprite => sprite.type === goal)) {
    addText("Player1 Won!", { x: 5, y: 5, color: color`7` });
    console.log("Player 1 wins!");
    updateScores(player1);
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }

  if (player2Tile.some(sprite => sprite.type === goal)) {
    addText("Player2 Won!", { x: 5, y: 5, color: color`3` });
    console.log("Player 2 wins!");
    updateScores(player2);
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }
}


let finalWinner = scorePlayer1 > scorePlayer2 ? "Player1" : "Player2";

afterInput(() => {
  checkWin();
  clearText();

    // Display scores
  addText(`Player1: ${scorePlayer1}`, { x: 1, y: 1, color: color`7` });
  addText(`Player2: ${scorePlayer2}`, { x: 1, y: 2, color: color`3` });
});
  



