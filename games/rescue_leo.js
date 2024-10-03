/*
@title: rescue_leo
@author: agentblack_6000
@tags: ['puzzle']
@addedOn: 2023-02-11


A game to spread awarness about sea turtles, perhaps switch to reusable
mugs the next time you go to Starbucks :)

Leo, the sea turtle needs to reach the goal tile without hitting any trash.
Using WASD controls, navigate to the goal tile without choking on plastic.

Hit J to start!

Potential upgrades(I'm new to JS, consider a PR!)
- Moving trash
- Congratulations text
*/

const player = "p";
const backgroundColor = "b";
const soda_can = "t";
const plastic_bottle = "q";
const plastic_rings = "r";
const goal = "g";

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
..DDDDDDDDD.....
.D44DDDDD44D....
.D44D444D44D.444
.DDDDD44DDDD.040
.DD44DDDD44D4444
.DDDDDDDDDDD4444
.44.44.44.44....
.44.44.44.44....
................`],
  [ backgroundColor, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ soda_can, bitmap`
................
................
................
......333.......
.....33333......
....3333223.....
...332233223....
..33333232233...
.3333233233333..
3323232322333...
3233323323233...
332233332233....
.3332333333.....
..32333333......
...333333.......
....3333........`],
  [ plastic_bottle, bitmap`
................
................
.......000......
.......000......
......22222.....
....222222222...
...22222222222..
...22222222222..
...55555555555..
...22222222222..
...222222222222.
...555555555552.
...222222222222.
...22222222222..
...55555555555..
...22222222222..`],
  [ plastic_rings,  bitmap`
................
................
................
.0000.0000.0000.
.0..000..000..0.
.0..000..000..0.
.0000.0000.0000.
..00...00...00..
.0000.0000.0000.
.0..000..000..0.
.0..000..000..0.
.0000.0000.0000.
................
................
................
................`],
  [ goal, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
);

setSolids([]);
setBackground(backgroundColor);

// Levels
let level = 0;
const levels = [
  map`
..........
..........
..........
..........
..........
..........`,
  map`
.............
.............
..bbbbbbbb...
..bbbbbbbb...
..bbbbbbbb...
..bbbbbbbb...
..bbbbbbbb..g
..tbbbbqbb...
..bpbbbtbb..r
..bbbbbrbq...
.t..........t
....t....r...`,
  map`
gbbrbbbq
bbbbtbbb
btbbbbtb
bbbqbqbb
bqbtbbbb
trbbbbrb
bbbbbbbb
bbbrtbbp`,
  map`
bbbbrbbg
tqbtbrbb
btqqqbbb
btbtbbrb
rbbbbbbq
rbbrbqtq
bbttqbqb
pbbtqbtq`,
  map`
bbbrrrrqbbbg
brbbqqqqqqbb
brtbttrqqqbb
brtbbbttbbbb
bqbbqbbbbqbb
btqqbrqbbbtq
btbbbrbbbbtb
bbbbbrrbbttb
bbbbbbbbrbbb
brrbqbbbbbrb
bbrrqbbtbbrr
pbbbbbbbbbrr`,
  map`
bqbbbbbbbbg
bbbqbrqrrbb
qbrttrrbtrb
qbrrbtrrbbb
qbbrbbbbbrr
qrbbbbtqrrr
brbbrbrrrrr
brbtqbbbbbr
brbqqrrbtqr
bbbrrbbbrrr
pbbbbbqqqrb`,
  map`
btttrrrttbtbb
ttbbbbrrqttbg
ttrbrbbqqqtbt
tbrbrtbbqqrbt
bttbrtbbrrbbt
bttbbrrbrbbbr
bttqbrrbbbttt
tbbbbrrbrtrtr
rbbrttrbtttrt
bbrtttrbtrrbt
bbrtttrbrrrrt
bbbrtqbbrbbrr
bpbbbbbtttbrt`,
  map`
bbbttbbqtbbbbg
trrrrrqtbbttqq
tbbbbbrbbqtbtb
tbrrrbtbtqrttt
qbbbrbtbtqtttb
qqbbrbtbtrbbtt
btbttbrbttqbrb
btbqtbbbbbbqtt
ttbbbrrbrtbtqt
rbbqtttbtqbrtb
bbrrbbbbtqbbbt
bbrqtttbrqtrtt
bbbqtqtttqqqrq
bpbbbbbrtttqtt`,
  map`
bqrqqqttrbtbtbg
rbtttqtbtbtbtbb
bttrrrtrrrrbttb
ttbbrtqqbbbbbbb
ttrbrbbbbqrbrtb
ttrbrrrtbttbqrt
bttbtqbrrrtbttr
rrrbbbbbbbbbqtt
bttqbqrtbbrtrrb
tbbbbbqrrbttrrr
rbbrtbrttbtqqrr
bbrttbrbtbbbtbq
bbrttrqrrrrttrq
bbbrtqbbrbbrtrt
bpbbbbqtttbrrrq`,
  map`
bbbbbbbrrrbtbbg
brrqbttrrrtbbbb
rqrqbbrrbrtrbbt
qqbbqbrrrbbbrbr
qrrqbbrtttbbtbr
bbbbbrrtqqrqbbt
trbqbbtttbqrbqt
rqbrqbqtrqbqbrr
btqqrbbbqtbbbrr
bttbbbbrqttbrrr
rbbqqbbbqqqbbbq
brbbqbbbqbbbrrq
bbrbrbqqbbqqttq
bbbbbbqqbqbbrqb
bpbbbbbbbqqrrqr`,
];

setMap(levels[level]);
beginGame();

function beginGame() {
  addText("START", {x: 7, y: 7, color: color`5`});
  addText("Rescue Leo", {x: 5, y: 8, color: color`5`});
  addText("Hit J to begin!", {x: 3, y: 9, color: color`5`});
}


onInput("j", () => {
  if(!getFirst(player)) return;
  
  if (level === 0)
  {
    clearText();
    level += 1;
    setMap(levels[level]);
  }
});

// WASD Controls
onInput("w", () => {
  if(!getFirst(player)) return;
  getFirst(player).y -= 1
});

onInput("a", () => {
  if(!getFirst(player)) return;
  getFirst(player).x -= 1
});

onInput("s", () => {
  if(!getFirst(player)) return;
  getFirst(player).y += 1
});

onInput("d", () => {
  if(!getFirst(player)) return;
  getFirst(player).x += 1
});


// Restarts the game
function restartGame() {
  level = 0;
  setMap(levels[level]);
  beginGame();
}

// Checks for collision with trash
afterInput(() => {
  const goalTiles = tilesWith(goal, player).length;

  // Adds up tiles with trash and player
  const sodaTiles = tilesWith(player, soda_can).length;
  const plasticBottleTiles = tilesWith(player, plastic_bottle).length;
  const plasticRingTiles = tilesWith(player, plastic_rings).length;
  const trashTiles = sodaTiles + plasticBottleTiles + plasticRingTiles;
  
  // Player hit trash, restart the game
  if (trashTiles > 0) {
    level = 0;
    setMap(levels[level]);
    beginGame();
  }

  else if (level === 1) {
    addText("Using WASD, reach", {x: 2, y: 2, color: color`5`});
    addText("the goal tile", {x: 2, y: 3, color: color`5`});
    addText("without touching", {x: 2, y: 4, color: color`5`});
    addText("the trash!", {x: 2, y: 5, color: color`5`});
    setTimeout(clearText, 3000);
  }
    
  
  // Player reached goal tile, advance level
  if (goalTiles > 0) {
    // Increment level
    level = level + 1;

    // Check if all levels completed, otherwise advances level
    if (level > levels.length - 1) {
      addText("Game over!", {x: 2, y: 2, color: color`5`});
      addText("Congratulations", {x: 2, y: 3, color: color`5`});
      setTimeout(clearText, 2000);
      addText("Restarting...", {x: 2, y: 4, color: color`5`});
      setTimeout(clearText, 2000);
      setTimeout(restartGame, 2000);
    }
    else {   
      setMap(levels[level]);
    } 
  }
});

