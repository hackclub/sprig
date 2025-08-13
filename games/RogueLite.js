/*
@title: RogueLite
@author: A41K
@tags: ["CTF", "puzzle", "multiplayer"]
@addedOn: 2025-08-01
@description: A very simple 2 player capture the flag game. Player1 moves with WASD, Player2 moves with IJKL. You need to be the first to get the flag for that level, but beware there are fake "ghost" walls and "ghost goals" that 
don't work and just try to misguide/make your life harder. Can you be the one who is the winner in the maps or can you find the secrets that lie beneath this simple game. Only you tell by playing
*/

/*I am going to disclose it here for sake. I used the ai chatbot for the player level/score editing but then I heavily modified it. So this ha maybe a 5% of ai code 
	These gray tags were used by me because I had a test version and this and yknow its good practice to label what your stuff does.
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
const help2= "u";
const star= "s";
const eastereggpass = "r";
const nolevel = "z";
const background = "b";
const restart = "a";
const easteregg1 = "v";
const easteregg2 = "m";

setBackground("b")


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
......L133333...
......L1333333..
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
......L133333...
......L1333333..
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
.....000.000....
....033303330...
....033333230...
....033333330...
.....0333330....
......03330.....
.......030......
........0.......
................
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
  [ help2, bitmap`
......L133......
......L1333.....
......L13333....
......L133333...
......L1377333..
......L1377333..
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
  [ star, bitmap`
................
................
.......00.......
......0660......
......0660......
...0006666000...
..066666666660..
..066666666660..
...0666666660...
....06666660....
...0666006660...
...0660..0660...
....00....00....
................
................
................`],
  [ eastereggpass, bitmap`
......L133......
......L1333.....
......L13333....
......L133333...
......L1333333..
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
  [ nolevel, bitmap`
......L133......
......L1333.....
......L13333....
......L133333...
......L1333333..
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
  [ background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`] ,
  [ restart, bitmap`
2222222222222222
2222222222222222
0002002002002000
0202022022022202
0022002002002202
0202022202022202
0202002002002202
2222222222222222
2222220002222222
2222200202222222
2222202200022222
2220200202202222
2220220002202222
2220222222202222
2220022222202222
2222000000022222`] ,
  [ easteregg1, bitmap`
2222000222222222
2220999022222222
2209999902222222
2209999902222222
2092099990222222
0990099990222222
0990099999022222
0999999999022220
0099999999902220
2200099099990209
2220660999990099
2220666009999999
2220666699999999
2202066699999900
2220006699990022
2222220009002222`],
)

setSolids([player1, player2, wall,]);

let level = 0
let scorePlayer1 = 0;
let scorePlayer2 = 0;
// MAPS
const levels = [
  map`
...........
.p.......e.
...........
...........
jjj.....wwy
..j.....w..
u.j..g..w.r
wwwwwwwwwww`,
  
  map`
...........
...........
.p.......e.
...........
...........
...........
...........
.....g.....`,
  map`
...........
...........
.p.......e.
...........
...........
...........
...........
ffffffgffff`,
  map`
ww...wwwyyyy
f..w.wfy....
www....wfw..
...p.w..wwe.
fywwww..wf..
yy......www.
yf..........
yyww.ww.www.
fy....w..w..
......w.fwf.
.ywww.wwwwy.
.rwf..gwf...`,
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
ywywwywwyy
wwywwyyyyw
wyyyyywwyy
yywwwywwww
wywwwwwwww
wyyyyyyyyg`,
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
e..wwwwwwwwwwwwwwwww
...w..fwf.wfww.fwwfw
...w..ww.....ww.w..w
...w..w..www..w.w..w
...j.....w......w..w
...w.wwwww.........w
...w.w.....ww..ww..w
...w.w.ww...w.ww...w
...wfw.gw..fwfwf..fw
p..wwwwwwwwwwwwwwwww`,
  map`
yyyyyyyyyy
ywwwwwwwyw
yyyywgyyyw
ywwywwwwyy
ywyywwwyyw
wwywwywyww
yyyyyyyyyy
wywywywwyw
wpwwwwwwew`,
  
  
  map`
.........
.........
....t....
....h....
.........
.........
.........
.e..a..p.`,
  
]      

// Define a variable to track if the game is currently in the title screen state
let inTitleScreen = true;

// Display the title screen
addText("Rogue Lite", { x: 5, y: 3, color: color`1`, size: 3 });
addText("Move to Start", { x: 4, y: 5, color: color`9` });

// Add input handling for starting the game from the title screen
onInput("i", () => {
  if (inTitleScreen) {
    inTitleScreen = false;
    
    // Remove the title screen text
    clearText();
    
    // Start the game at the first level
    setMap(levels[0]);
  }
});


let tutorialShown = false;

function showTutorial() {
  addText("Tutorial!", { x: 5, y: 5, color: color`4` });
}

const melody = tune`
157.89473684210526: A4-157.89473684210526 + C5-157.89473684210526 + E5-157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: B4^157.89473684210526 + D4-157.89473684210526,
157.89473684210526: C5^157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: B4^157.89473684210526 + D4-157.89473684210526,
157.89473684210526: C5^157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: D4^157.89473684210526 + D5^157.89473684210526,
157.89473684210526: E5-157.89473684210526 + C5-157.89473684210526 + G4-157.89473684210526,
157.89473684210526: F4-157.89473684210526 + C5/157.89473684210526,
157.89473684210526: D5^157.89473684210526 + D4^157.89473684210526,
157.89473684210526: E5-157.89473684210526 + B4-157.89473684210526 + G4-157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: B4^157.89473684210526 + D4-157.89473684210526,
157.89473684210526: C5^157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526,
157.89473684210526: B4^157.89473684210526 + C4/157.89473684210526,
157.89473684210526: C5^157.89473684210526 + D4-157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526,
157.89473684210526: E5-157.89473684210526 + C5-157.89473684210526 + G4-157.89473684210526 + C4/157.89473684210526,
157.89473684210526: D5^157.89473684210526 + D4^157.89473684210526,
157.89473684210526: F4-157.89473684210526 + C5/157.89473684210526,
157.89473684210526: D5^157.89473684210526 + D4^157.89473684210526,
157.89473684210526: E5-157.89473684210526 + C5-157.89473684210526 + G4-157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: B4^157.89473684210526 + D4-157.89473684210526,
157.89473684210526: C5^157.89473684210526,
157.89473684210526: G4-157.89473684210526 + F5~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: B4^157.89473684210526 + D4-157.89473684210526,
157.89473684210526: C5^157.89473684210526,
157.89473684210526: G4-157.89473684210526 + B4-157.89473684210526 + D5-157.89473684210526 + F5-157.89473684210526 + C4/157.89473684210526`;
const secret = tune`
187.5,
187.5: D5~187.5,
187.5: D5~187.5,
187.5: C5^187.5,
187.5,
187.5: D5~187.5,
187.5: D5~187.5,
187.5: D5~187.5,
187.5,
187.5: D5~187.5,
187.5,
187.5: D5~187.5,
187.5: C5^187.5,
187.5: D5~187.5,
187.5: D5~187.5,
187.5,
187.5: D5~187.5,
187.5: D5~187.5,
187.5: D5~187.5,
187.5,
187.5: C5^187.5,
187.5: C5^187.5,
187.5: D5~187.5,
1687.5`;

// Play it:
playTune(melody)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)


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

// Player 2 (IJKL Keys Controls)
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
    addText("Player1 Won!", { x: 5, y: 5, color: color`3` });
    console.log("Player 1 wins!");
    if (!player1Tile.some(sprite => sprite.type === nolevel)) {
      updateScores(player1);
    }
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }

  if (player2Tile.some(sprite => sprite.type === goal)) {
    addText("Player2 Won!", { x: 5, y: 5, color: color`7` });
    console.log("Player 2 wins!");
    if (!player2Tile.some(sprite => sprite.type === nolevel)) {
      updateScores(player2);
    }
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }
}


afterInput(() => {
  checkWin();
  clearText();
    // Check if tutorial has been shown
  if (!tutorialShown) {
    showTutorial();
    tutorialShown = true; // Mark tutorial as shown
  }

  const player1Tile = getTile(getFirst(player1).x, getFirst(player1).y);
  const player2Tile = getTile(getFirst(player2).x, getFirst(player2).y);

  if (player1Tile.some(sprite => sprite.type === eastereggpass)) {
    // Teleport player 1 to a specific map
    setMap(map`
.....g.....
...........
...........
...........
.....s.....
...........
...........
...........
...........
e....v....p`)
    addText("Easter Egg Found <3", { x: 1, y: 5, color: color`3`, });
  }

  if (player2Tile.some(sprite => sprite.type === eastereggpass)) {
    // Teleport player 2 to a specific map
    setMap(map`
.....z.....
...........
...........
...........
.....s.....
...........
...........
...........
...........
e....v....p`)
    addText("Easter Egg Found <3", { x: 1, y: 5, color: color`3`});
  }


  let finalWinner = scorePlayer1 > scorePlayer2 ? "Player1" : "Player2";


function restartGame() {
  // Reset scores
  scorePlayer1 = 0;
  scorePlayer2 = 0;

  // Reset level
  level = 0;
  setMap(levels[level]);

  // Reset player positions
  getFirst(player1).x = 1;
  getFirst(player1).y = 1;
  getFirst(player2).x = 9;
  getFirst(player2).y = 1;

  clearText();
}

  
    if (player1Tile.some(sprite => sprite.type === restart)) {
      restartGame();
  }

  if (player2Tile.some(sprite => sprite.type === restart)) {
      restartGame();
  }


    // Display scores
  addText(`Player1: ${scorePlayer1}`, { x: 0, y: 1, color: color`3` });
  addText(`Player2: ${scorePlayer2}`, { x: 0, y: 2, color: color`7` });
});
