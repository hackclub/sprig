/*
@title: aMaze
@author: Sumedh Natu
@tags: ['puzzle']
@addedOn: 2024-08-13
*/

let playerSprite = bitmap`
....00000000....
...0022222200...
..002222222200..
..022222222220..
..022222222220..
0002222022202000
0222222020202220
0222222020202220
0002222222222000
..022220202020..
..002222222200..
...0002222000...
.....000000.....
.....0....0.....
....000..000....
....0000.0000...`;
let keyBoxSprite = bitmap`
..000000000000..
.00HHHHHHHHHH00.
00HHHHHHHHHHHH00
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0H00000HH00000H0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HH0000000000HH0
0H00HHHHHHHH00H0
0H0HHHHHHHHHH0H0
00HHHHHHHHHHHH00
.00HHHHHHHHHH00.
..000000000000..`;
let flagSprite = bitmap`
...0000.........
...0440.........
...0440.........
...0000.........
...0440000000000
...0440444444440
...0440444444400
...044044444000.
...0440444400...
...044000000....
...0440.........
..004400........
..044440........
0000000000......
0444444440......
0000000000......`
let wallSprite = bitmap`
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
0000000000000000`;

let redButtonSprite = bitmap`
..000000000000..
.00333333333300.
0033223333333300
0332233333333330
0322333333333330
0323333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
.00333333333300.
..000000000000..`;
let blueButtonSprite = bitmap`
..000000000000..
.00555555555500.
0055225555555500
0552255555555550
0522555555555550
0525555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0055555555555500
.00555555555500.
..000000000000..`;

let redSpikesSprite = bitmap`
3333333333333333
3..............3
3...3.....3....3
3..333...333...3
3.33.33.33.33..3
333...333...3333
3....3.....3...3
3...333...333..3
3..33.33.33.33.3
3333...333...333
3...3.....3....3
3..333...333...3
3.33.33.33.33..3
333...333...3333
3..............3
3333333333333333`;
let blueSpikesSprite = bitmap`
5555555555555555
5..............5
5....5.....5...5
5...555...555..5
5..55.55.55.55.5
5555...555...555
5...5.....5....5
5..555...555...5
5.55.55.55.55..5
555...555...5555
5....5.....5...5
5...555...555..5
5..55.55.55.55.5
5555...555...555
5..............5
5555555555555555`;

const deathTune = tune`
50.33557046979866: A5/50.33557046979866 + G5/50.33557046979866 + D5/50.33557046979866 + E5/50.33557046979866 + F5/50.33557046979866,
50.33557046979866: G5/50.33557046979866 + F5/50.33557046979866 + E5/50.33557046979866 + D5/50.33557046979866 + C5/50.33557046979866,
50.33557046979866: F5/50.33557046979866 + E5/50.33557046979866 + D5/50.33557046979866 + C5/50.33557046979866 + B4/50.33557046979866,
1459.731543624161`;
const victoryTune = tune`
72.46376811594203,
72.46376811594203: E5-72.46376811594203,
72.46376811594203: E5-72.46376811594203,
72.46376811594203: E5-72.46376811594203,
72.46376811594203: E5-72.46376811594203,
72.46376811594203: F5-72.46376811594203,
72.46376811594203: G5-72.46376811594203,
72.46376811594203: A5-72.46376811594203,
1739.1304347826087`;
const placeBlock = tune`
122.44897959183673,
122.44897959183673: E5/122.44897959183673,
122.44897959183673: E5/122.44897959183673,
122.44897959183673: E5-122.44897959183673,
122.44897959183673: E5-122.44897959183673,
3306.122448979592`

const player = "p";
const keyBox = "k";
const wall = "w";
const redButton = "r";
const blueButton = "b";
const redSpikes = "t";
const blueSpikes = "n";
const flag = "f";

const isRedSpikeOn = false;
const isBlueSpikeOn = false;

let timesPlayedRed = 0;
let timesPlayedBlue = 0;

setLegend(
  [player, playerSprite],
  [keyBox, keyBoxSprite],
  [wall, wallSprite],
  [redButton, redButtonSprite],
  [blueButton, blueButtonSprite],
  [redSpikes, redSpikesSprite],
  [blueSpikes, blueSpikesSprite],
  [flag, flagSprite]
);

setSolids([player, wall, keyBox])
setPushables({
  [player]: [keyBox],
  [keyBox]: [keyBox]
});

let level = 0
const levels = [
  map`
wwwwwww
....tft
.....t.
.......
.......
.......
.p.....
....k.r
wwwwwww`,
  map`
wwwwwww
...p...
...k...
.......
tttkttt
...r...
...w...
...f...
wwwwwww`,
  map`
wwwwwwwwwww
t......n...
t..p...n...
t..k...n...
t..r...n...
t......n.f.
t..b...n...
wwwwwwwwwww`,
  map`
wwwwwwwwwwww
wwwnnnnnnwww
wwwn....nwww
wwwn.f..nwww
wwwn....nwww
wwwnnnnnnwww
tttttttttttt
t..........t
t..........t
t..p.kk.rb.t
t..........t
t..........t
tttttttttttt
wwwwwwwwwwww`,
  map`
wwwwwwwwwww
..t.....www
b.t........
ttt....n...
....kknrn..
.......n...
..p........
........www
nnnnnnnnnnn
.....f.....
wwwwwwwwwww`,
  map`
wwwwwwwwwww
.......nnnn
p...kk.n.bn
.......nnnn
ttttttttttt
...........
...k.......
...r.......
nnnnnnnnnnn
ttttttttttt
...f.......
wwwwwwwwwww`,
  map`
wwwwwwwwwwww
nnnnnt...w..
nfwwnt...w..
n..r.t...w..
nnnnnt...w..
tttttt...w..
............
....p.k..k.b
............
........ww..
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwww
.................
.......www.......
......w...w......
..w..w.w.w.w..w..
.w.w.ww...ww.w.w.
..w..w.www.w..w..
......wwwww......
.................
.www.w.w.w.w.w.w.
..w..www.www..w..
..w..w.w.w.w.w.w.
.................
wwwwwwwwwwwwwwwww`,
];

setMap(levels[level])

onInput("j", () => {
  resetLevel();
});
movePlayer();
afterInput(() => {
  clearText();
  checkWinningState();
  blueButtonBegins();
  redButtonBegins();
  keyBoxSmile();
  setNewAnimations();
});

function setNewAnimations() {
  setLegend(
    [player, playerSprite],
    [keyBox, keyBoxSprite],
    [wall, wallSprite],
    [redButton, redButtonSprite],
    [blueButton, blueButtonSprite],
    [redSpikes, redSpikesSprite],
    [blueSpikes, blueSpikesSprite],
    [flag, flagSprite]
  );
};
function movePlayer() {
  onInput("w", () => {
    getFirst(player).y -= 1
  })
  onInput("a", () => {
    getFirst(player).x -= 1
    playerSprite = bitmap`
....00000000....
...0022222200...
..002222222200..
..022222222220..
..022222222220..
0002022202222000
0222020202222220
0222020202222220
0002222222222000
..020202022220..
..002222222200..
...0002222000...
.....000000.....
.....0....0.....
....000..000....
...0000.0000....`
  })
  onInput("s", () => {
    getFirst(player).y += 1
  })
  onInput("d", () => {
    getFirst(player).x += 1
    playerSprite = bitmap`
....00000000....
...0022222200...
..002222222200..
..022222222220..
..022222222220..
0002222022202000
0222222020202220
0222222020202220
0002222222222000
..022220202020..
..002222222200..
...0002222000...
.....000000.....
.....0....0.....
....000..000....
....0000.0000...`
  })
};
function redButtonBegins() {
  const keyCovered = tilesWith(redButton, keyBox).length;

  if (keyCovered > 0) {
    redSpikesSprite = bitmap`
3..33..33..33..3
................
................
3..............3
3..............3
................
................
3..............3
3..............3
................
................
3..............3
3..............3
................
................
3..33..33..33..3`;
    timesPlayedRed = timesPlayedRed + 1;
    if (timesPlayedRed == 1){
      playTune(placeBlock);
    }
  }else {
    timesPlayedRed = 0;
    redSpikesSprite = bitmap`
3333333333333333
3..............3
3...3.....3....3
3..333...333...3
3.33.33.33.33..3
333...333...3333
3....3.....3...3
3...333...333..3
3..33.33.33.33.3
3333...333...333
3...3.....3....3
3..333...333...3
3.33.33.33.33..3
333...333...3333
3..............3
3333333333333333`;
    playerDeath(redSpikes);
  }
};
function blueButtonBegins() {
  const keyCovered = tilesWith(blueButton, keyBox).length;
  
  if (keyCovered > 0) {
    blueSpikesSprite = bitmap`
5..55..55..55..5
................
................
5..............5
5..............5
................
................
5..............5
5..............5
................
................
5..............5
5..............5
................
................
5..55..55..55..5`;
    timesPlayedBlue = timesPlayedBlue + 1;

    if (timesPlayedBlue == 1){
      playTune(placeBlock, 1);
    }
  } else {
    blueSpikesSprite = bitmap`
5555555555555555
5..............5
5....5.....5...5
5...555...555..5
5..55.55.55.55.5
5555...555...555
5...5.....5....5
5..555...555...5
5.55.55.55.55..5
555...555...5555
5....5.....5...5
5...555...555..5
5..55.55.55.55.5
5555...555...555
5..............5
5555555555555555`;
    playerDeath(blueSpikes);
    timesPlayedBlue=0;
  }
};
function keyBoxSmile() {
  const redButtonCovered = tilesWith(redButton, keyBox).length;
  const blueButtonCovered = tilesWith(blueButton, keyBox).length;
  if (redButtonCovered > 0 || blueButtonCovered > 0) {
    keyBoxSprite = bitmap`
..000000000000..
.00HHHHHHHHHH00.
00HHHHHHHHHHHH00
0HHH0HHHHHH0HHH0
0HH000HHHH000HH0
0H00H00HH00H00H0
0H0HHH0HH0HHH0H0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0H000000000000H0
0H000000000000H0
0H000000000000H0
0HH0000000000HH0
00HH00000000HH00
.00HHHHHHHHHH00.
..000000000000..`;
  } else {
    keyBoxSprite = bitmap`
..000000000000..
.00HHHHHHHHHH00.
00HHHHHHHHHHHH00
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0H00000HH00000H0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HH0000000000HH0
0H00HHHHHHHH00H0
0HHHHHHHHHHHHHH0
00HHHHHHHHHHHH00
.00HHHHHHHHHH00.
..000000000000..`;
  }
};
function playerDeath(spikeObject) {
  const playerCovered = tilesWith(spikeObject, player).length;
  if (playerCovered > 0) {
    addText("Player Died", {x:0, y:0, color:color`3`})
    resetLevel();
  }
};
function checkWinningState() {
  const hasWon = tilesWith(flag, player).length;
  if (hasWon > 0) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      if (currentLevel != 6){
        addText("New Level!", {x:0, y:0, color:color`6`});
        playTune(victoryTune);
      }
    }
  }
};
function resetLevel() {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    playTune(deathTune);
    setMap(currentLevel); 
    redSpikesSprite = bitmap`
3333333333333333
3..............3
3...3.....3....3
3..333...333...3
3.33.33.33.33..3
333...333...3333
3....3.....3...3
3...333...333..3
3..33.33.33.33.3
3333...333...333
3...3.....3....3
3..333...333...3
3.33.33.33.33..3
333...333...3333
3..............3
3333333333333333`;
    blueSpikesSprite = bitmap`
5555555555555555
5..............5
5....5.....5...5
5...555...555..5
5..55.55.55.55.5
5555...555...555
5...5.....5....5
5..555...555...5
5.55.55.55.55..5
555...555...5555
5....5.....5...5
5...555...555..5
5..55.55.55.55.5
5555...555...555
5..............5
5555555555555555`;
  }
};
