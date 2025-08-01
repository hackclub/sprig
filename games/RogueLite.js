/*
@title: RogueLite
@author: A41K (Andrew)
@tags: [CTF]
@addedOn: 2025-08-01
*/

const player = "p";
const enemy = "e";
const fakegoal = "f";
const box = "b";
const goal = "g";
const wall = "w";
const fakewall = "y";
const heart= "h";

setLegend(
  [ player, bitmap`
................
.LLLLLLLLLLLLLL.
.L000000000000L.
.L022200002220L.
.L022000002200L.
.L022200002220L.
.L000000000000L.
.L000000000000L.
.L000000000000L.
.L020000000020L.
.L022000000220L.
.L002222222200L.
.L000000000000L.
.L000000000000L.
.LLLLLLLLLLLLLL.
................` ],
  [ enemy,  bitmap`
................
.33333333333333.
.30000000000003.
.30CC000000CC03.
.300CC0000CC003.
.30022200222003.
.30020200202003.
.30022200222003.
.30000000000003.
.30000000000003.
.30022222222003.
.30020000002003.
.30000000000003.
.30000000000003.
.33333333333333.
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
)

setSolids([player, enemy, wall]);

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
wwwwwwwwywwwwwww
................
................
wwwwwwwwwwywwwww
................
................
wywwwwwwwwwwwwww
................
fffffffffgffffff`,
      map`
.........
.........
....h....
.........
.........
.........
.........
.p.....e.`,
  
]

setMap(levels[level])

setPushables({
  [player]: [],
  [enemy]: []
});

// Player 1 (WASD Controls)
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

// Player 2 (Arrow Keys Controls)
onInput("k", () => {
  getFirst(enemy).y += 1
})

onInput("i", () => {
  getFirst(enemy).y -= 1
})

onInput("j", () => {
  getFirst(enemy).x -= 1
})

onInput("l", () => {
  getFirst(enemy).x += 1
})

function updateScores(winner) {
  if (winner === player) {
    scorePlayer1 += 1;
  } else if (winner === enemy) {
    scorePlayer2 += 1;
  }
}

function checkWin() {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y);
  const enemyTile = getTile(getFirst(enemy).x, getFirst(enemy).y);

  if (playerTile.some(sprite => sprite.type === goal)) {
    addText("Player1 Won!", { x: 5, y: 5, color: color`7` });
    console.log("Player 1 wins!");
    updateScores(player);
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }

  if (enemyTile.some(sprite => sprite.type === goal)) {
    addText("Player2 Won!", { x: 5, y: 5, color: color`3` });
    console.log("Player 2 wins!");
    updateScores(enemy);
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }
}



let finalWinner = scorePlayer1 > scorePlayer2 ? "Player1" : "Player2";

// Display on the last map after all levels have been completed
afterInput(() => {
  // Check if all levels have been completed
  if (level === levels.length) {
    clearText();
    // Determine the final winner based on the scores
    const finalWinner = scorePlayer1 > scorePlayer2 ? "Player1" : "Player2";
    // Display the final winner on the screen
    addText(`Final Winner: ${finalWinner}`, { x: 5, y: 5, color: color`7` });
  } else {
    // Display scores for each player during the game
    clearText();
    addText(`Player1: ${scorePlayer1}`, { x: 1, y: 1, color: color`7` });
    addText(`Player2: ${scorePlayer2}`, { x: 1, y: 2, color: color`3` });
  }
});


afterInput(() => {
  checkWin();
  clearText();

    // Display scores
  addText(`Player1: ${scorePlayer1}`, { x: 1, y: 1, color: color`7` });
  addText(`Player2: ${scorePlayer2}`, { x: 1, y: 2, color: color`3` });
});
  



