/*
@title: Linebeck Land
@author: CatR3kd
@tags: []
@addedOn: 2023-01-18
*/

/*
[WASD to move]
WARNING: If you read ahead, you may spoil some of the game and easter eggs. If you've already been deemed completionist, you've done everything (:
*/

setLegend(
["b", bitmap`
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
["p", bitmap`
..000000000000..
.02002222220020.
0202202222022020
0020020220200200
0020020220200200
0202202222022020
0220022222200220
0200000000000020
0200202002020020
0202020220202020
0200200000020020
0202202002022020
0220022002200220
0222000000002220
.02222222222220.
..000000000000..
`],
["w", bitmap`
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
0000000000000000
`],
["t", bitmap`
0000000000000000
0000000000000000
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
["2", bitmap`
0000000000000000
0000000000000000
0000000000000000
.........00.....
........00......
.......00.......
......00........
.....00.........
....00..........
...00...........
..00............
.00.............
00..............
................
................
................`],
["s", bitmap`
.......00.......
.......00.......
......0000......
......0000......
.....000000.....
.....000000.....
....00000000....
....00000000....
...0000000000...
...0000000000...
..000000000000..
..000000000000..
.00000000000000.
.00000000000000.
0000000000000000
0000000000000000`],
["f", bitmap`
................
........44......
....44.4444.....
...444444444....
...444444444....
....4444444.....
...333333333....
..33333333333...
.3333333333333..
.3333333333333..
.3333333333333..
.3333333333333..
.3333333333333..
...3333333333...
....33333333....
................`],
["u", bitmap`
6666666666666667
6666666666666677
6666666666666777
6666666666666666
6666666666667777
6666666666677777
6666666666667777
6666666666776677
6666666667777766
6666666667777777
6666666776677777
6666677777767777
6666777777777777
6677677777777777
6777767777777777
6777776777777777`]
);

let player = {"x": 0, "y": 0};
let levels = [
map`..........
..........
..........
..........
..........
....ff....
....ww....
...wwww...
..wwwwww..
.wwwwwwww.`,
map`u.........
..........
..........
..........
..........
.........f
.........t
....w.....
...ww.....
..www.....`,
map`..........
..........
..........
....tw....
f....w....
t...tw....
.....w....
....tw....
.....w....
.....w....`,
map`..........
..........
..........
..........
.....f....
....tt....
..........
..........
.w.tttt.w.
.wssssssw.`,
map`..........
..........
..........
..........
tws.......
.w2.......
.w........
twf.......
.wt..t..t.
.wsssssss.`,
map`..........
..........
..........
..........
..........
..........
......s...
t...w.w...
....wsw...
.ssswwwfs.`,
map`..........
..........
..........
fss.ss.ss.
.wwwwwwwwt
..........
..........
.........t
..........
.ss.ss.ss.`,
map`.........w
.........w
........fw
..tstststw
..wwwwwwww
..........
..........
..........
..s..s..s.
..w..w..w.`,
map`.........w
.........w
....s..s.w
...sw.swfw
tttttttt.t
..........
..........
t.........
....s.....
....ws....`,
map`u.........
..........
..........
..........
..........
tt......tt
..........
....tt....
.tt....tt.
..........`];
let currentLevel = 1;
let level = levels[currentLevel];
let updateInterval;

let score = 0;
let isInsane = false;
let died = false;


// Movement

const ground = ["", "w", "t", "2"];
const jumpThrough = [".", "t", "s", "f", "2"];
const walkThrough = [".", "t", "s", "f", "2"];
const deadly = ["s"];
const jumpHeight = 3;

let currentJump = 0;

function groundCheck(){
  const rowUnder = level.split("\n")[Math.abs(player.y - 9) + 1];
  const underPlayer = (rowUnder == undefined)? "" : rowUnder.split("")[player.x];
  return ground.includes(underPlayer);
}

function jump(){
  if(groundCheck() == true) currentJump = jumpHeight;
}

// Direction: -1 for left, 1 for right
function move(direction){
  const row = level.split("\n")[Math.abs(player.y - 9)];
  const target = row.split("")[player.x + direction];

  // Make sure player is not blocked
  if(walkThrough.includes(target)){
    player.x += direction;
  } else if((currentLevel < 9) && (target == undefined)){
    // Check if a new level needs to be loaded
    if(levels[currentLevel + direction] != undefined){
      currentLevel += direction;
      player.x = (player.x == 0)? (level.split("\n")[0].length - 1) : 0;
      clearText();

      if(currentLevel == 9) return win();

      if(currentLevel == 0){
        addText("Secret!", { 
          x: 7,
          y: 14,
          color: color`2`
        });
      }
    }
  }
}

function handleJump(){
  // Check if the player is jumping
  if(currentJump <= 0) return currentJump = 0;

  // Check if the player can go up without passing through an object
  const rowAbove = level.split("\n")[Math.abs(player.y - 9)];
  const abovePlayer = rowAbove.split("")[player.x];

  if((player.y >= (level.split("\n").length - 1)) || !(jumpThrough.includes(abovePlayer))) return currentJump = 0;

  // Increase y coord
  player.y++;
  currentJump--;
}


// Physics

function handleGravity(){
  if((groundCheck() == false) && (currentJump == 0)) player.y--;
}


// Tomatoes

function handleTomato(){
  const row = level.split("\n")[Math.abs(player.y - 9)];
  const currentTile = row.split("")[player.x];
  if(currentTile == "f"){
    // Increment Score
    score++;

    // Remove tomato from level
    let newRow = row.split("");
    newRow[player.x] = '.';
    let newLevel = level.split("\n");
    newLevel[Math.abs(player.y - 9)] = newRow.join("");
    levels[currentLevel] = newLevel.join("\n");
  }
}


// DEATH

function handleDeath(){
  const row = level.split("\n")[Math.abs(player.y - 9)];
  const currentTile = row.split("")[player.x];

  if(deadly.includes(currentTile)){
    died = true;
    currentLevel = 1;
    level = levels[currentLevel];
    currentJump = 0;
    player.x = 0;
    player.y = 0;
  }
}


// Inputs

onInput("w", () => {
  jump();
});

onInput("d", () => {
  move(1);
});

onInput("a", () => {
  move(-1);
});

let count = 0;
onInput("l", () => {
  count++;
  if(count == 10) insane();
});


// Game events

function updateGame(){
  handleGravity();
  handleJump();
  handleDeath();
  handleTomato();
  level = levels[currentLevel];
  setMap(level);
  addPlayer();
}

function startGame(){
  setBackground("b");
  setMap(levels[1]);

  addText("\"Linebeck\"\n   Land", { 
    x: 5,
    y: 3,
    color: color`2`
  });

  updateGame();
  updateInterval = setInterval(updateGame, 100);
}

startGame();

function addPlayer(level){
  addSprite(player.x, Math.abs(player.y - 9), "p");
}


// Win

function win(){
  currentLevel = 9;
  setMap(levels[9]);
  clearText();

  addText(`  You win!\n${score}/8 Tomatoes`, { 
    x: 4,
    y: 2,
    color: color`2`
  });

  if((score > 9) && (died == false) && (isInsane == true)){
    addText(`  Unlocked:\nCompletionist`, { 
      x: 4,
      y: 8,
      color: color`3`
    });
  } else if(score > 9){
    addText(`  Secret:\nRestart and\npress L x10`, { 
      x: 4,
      y: 10,
      color: color`2`
    });
  }
}


// Insane mode

function insane(){
  if(score > 0) return;
  isInsane = true
  setLegend(
  ["u", bitmap`
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
  ["b", bitmap`
  ..000000000000..
  .02002222220020.
  0202202222022020
  0020020220200200
  0020020220200200
  0202202222022020
  0220022222200220
  0200000000000020
  0200202002020020
  0202020220202020
  0200200000020020
  0202202002022020
  0220022002200220
  0222000000002220
  .02222222222220.
  ..000000000000..
  `],
  ["p", bitmap`
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
  0000000000000000
  `],
  ["w", bitmap`
  0000000000000000
  0000000000000000
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................`],
  ["t", bitmap`
  0000000000000000
  0000000000000000
  0000000000000000
  .........00.....
  ........00......
  .......00.......
  ......00........
  .....00.........
  ....00..........
  ...00...........
  ..00............
  .00.............
  00..............
  ................
  ................
  ................`],
  ["2", bitmap`
  .......00.......
  .......00.......
  ......0000......
  ......0000......
  .....000000.....
  .....000000.....
  ....00000000....
  ....00000000....
  ...0000000000...
  ...0000000000...
  ..000000000000..
  ..000000000000..
  .00000000000000.
  .00000000000000.
  0000000000000000
  0000000000000000`],
  ["s", bitmap`
  ................
  ........44......
  ....44.4444.....
  ...444444444....
  ...444444444....
  ....4444444.....
  ...333333333....
  ..33333333333...
  .3333333333333..
  .3333333333333..
  .3333333333333..
  .3333333333333..
  .3333333333333..
  ...3333333333...
  ....33333333....
  ................`],
  ["f", bitmap`
  6666666666666667
  6666666666666677
  6666666666666777
  6666666666666666
  6666666666667777
  6666666666677777
  6666666666667777
  6666666666776677
  6666666667777766
  6666666667777777
  6666666776677777
  6666677777767777
  6666777777777777
  6677677777777777
  6777767777777777
  6777776777777777`]
  );
}
