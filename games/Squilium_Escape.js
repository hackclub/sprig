/*
@title: Squilium_Escape
@author: Ali Mustafa
@tags: []
@addedOn: 2023-01-06

Use WASD to move the player(s) around. use J to reset the level. The goal is to move every player into a X.
A player can only move one box at a time. Try beat my highscore of 181
*/

const player = "p";
const dest= "d";
const block = "b";
const crate = "c";
const blank = ".";
const back = "l";
const w = "w";
const i = "i";
const n = "n";
const move = tune`
43.85964912280702: E4~43.85964912280702 + D4~43.85964912280702 + F4~43.85964912280702,
1359.6491228070176`
const winStage = tune`
147.05882352941177,
147.05882352941177: F4-147.05882352941177,
147.05882352941177: A4-147.05882352941177,
147.05882352941177: C4-147.05882352941177,
4117.64705882353`
const winGame = tune`
208.33333333333334,
208.33333333333334: G4/208.33333333333334,
208.33333333333334: A4~208.33333333333334,
208.33333333333334: D5/208.33333333333334,
208.33333333333334: B4~208.33333333333334,
208.33333333333334: G4/208.33333333333334,
208.33333333333334: E5/208.33333333333334 + G5^208.33333333333334,
208.33333333333334: B4~208.33333333333334,
208.33333333333334: A4/208.33333333333334,
208.33333333333334: B4/208.33333333333334,
208.33333333333334: A4~208.33333333333334,
208.33333333333334: F4/208.33333333333334,
208.33333333333334: C5~208.33333333333334,
3958.3333333333335`
let lvlTurn = 0;
let totTurn = 0;

setLegend(
  [ player, bitmap`
....33333333....
...3888888883...
..388880088883..
.388000HH000883.
3800HHHHHHHH0083
388HHH1111HHH883
388HH122221HH883
388HH120021HH883
388HH120021HH883
388HH120021HH883
3880H122221H0883
38080H1111H08083
30088H0000H88003
.038800HH008830.
..000088880000..
...3333333333...` ],
  [ dest, bitmap`
000..........000
0LLL........LLL0
0L33L......L33L0
.L333L....L333L.
..L333L..L333L..
...L333LL333L...
....L333333L....
.....L3333L.....
.....L3333L.....
....L333333L....
...L333LL333L...
..L333L..L333L..
.L333L....L333L.
0L33L......L33L0
0LLL........LLL0
0000.........000` ],
  [ block, bitmap`
0000000000000000
00L1111111111L00
0L0L11111111L0L0
01L0L111111L0L10
011L0L1111L0L110
0111L0LLLL0L1110
01111L0LL0L11110
01111LL00LL11110
01111LL00LL11110
01111L0LL0L11110
0111L0LLLL0L1110
011L0L1111L0L110
01L0L111111L0L10
0L0L11111111L0L0
00L1111111111L00
0000000000000000`],
  [ crate, bitmap`
9C9LLLLLLLLLL9C9
CCCCCCCCCCCCCCCC
9CLLLLLLLLLLLLC9
LCLCLCCCCCCLCLCL
LCLLCC9999CCLLCL
LCLCCCCLLCCCCLCL
LCLC9CCCCCC9CLCL
LCLC9LCCCCL9CLCL
LCLC9LCCCCL9CLCL
LCLC9CCCCCC9CLCL
LCLCCCCLLCCCCLCL
LCLLCC9999CCLLCL
LCLCLCCCCCCLCLCL
9CLLLLLLLLLLLLC9
CCCCCCCCCCCCCCCC
9C9LLLLLLLLLL9C9` ],
  [ w, bitmap`
......00........
.....000........
....000.......00
...000........00
...000.......000
..000........000
..000...00..000.
..00...000..000.
..00..000...00..
.000.0000..000..
.00000000.0000..
0.0000.00000.00.
..000..0000..000
..............00
................
................` ],   
  [ i, bitmap`
................
........00......
........00......
................
................
......0...0000.0
.....00..00.0000
....000......000
....00........00
...000.......00.
..00000.....000.
000..00....000..
00...000...00...
.....00000000...
.......00000....
................` ],    
  [ n, bitmap`
................
.........000....
........0000....
0000...000.00...
00000.000..000..
0..00..0....00..
...00.......00..
...00.......00..
...00......000..
..00.......000..
..00......000...
.000...00000....
.0000000000.....
.0000000........
................
................` ],
  [ back, bitmap`
LL111111111111LL
L11111111111111L
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
L11111111111111L
LL111111111111LL` ],   
)
setSolids( 
  [ player, bitmap`
....33333333....
...3888888883...
..388880088883..
.388000HH000883.
3800HHHHHHHH0083
388HHH1111HHH883
388HH122221HH883
388HH120021HH883
388HH120021HH883
388HH120021HH883
3880H122221H0883
38080H1111H08083
30088H0000H88003
.038800HH008830.
..000088880000..
...3333333333...` ],
  [ block, bitmap`
0000000000000000
00L1111111111L00
0L0L11111111L0L0
01L0L111111L0L10
011L0L1111L0L110
0111L0LLLL0L1110
01111L0LL0L11110
01111LL00LL11110
01111LL00LL11110
01111L0LL0L11110
0111L0LLLL0L1110
011L0L1111L0L110
01L0L111111L0L10
0L0L11111111L0L0
00L1111111111L00
0000000000000000`],
 [ crate, bitmap`
9C9LLLLLLLLLL9C9
CCCCCCCCCCCCCCCC
9CLLLLLLLLLLLLC9
LCLCLCCCCCCLCLCL
LCLLCC9999CCLLCL
LCLCCCCLLCCCCLCL
LCLC9CCCCCC9CLCL
LCLC9LCCCCL9CLCL
LCLC9LCCCCL9CLCL
LCLC9CCCCCC9CLCL
LCLCCCCLLCCCCLCL
LCLLCC9999CCLLCL
LCLCLCCCCCCLCLCL
9CLLLLLLLLLLLLC9
CCCCCCCCCCCCCCCC
9C9LLLLLLLLLL9C9` ])

let level = 0
const levels = [
map`
b.d.b
b...b
b...b
b...b
b.p.b`,
map`
bbbbb
bbbdb
pc...
bbbbb
bbbbb`,  
map`
bbbbb
dbbbd
..b..
.....
.p.p.`,
map`
.d..d
..bb.
.....
.bb..
.p.p.`, 
map`
.b..d
dbbpb
.bp..
dbbp.
.....`,
map`
p.b.p
..d.b
.dbdb
..d.b
p.b.p`,
map`
.c.d.
.bcdd
p..c.
.b.bc
p.p..`,
map`
d..c.
.pdcp
.d...
cc.b.
.p..b`,
map`
..d..
..c.p
..c..
b.cc.
d.cp.`,
map`.ddd.
  bcccp
  p.c.b
  .ccc.
  ..p..`,
map`..cbb
  dc...
  b.pc.
  dp.b.
  b.pbd`,
map`
p.d.b
ccccc
.....
cccc.
bbd.p`,
map`
d.c.p
.c...
d.ccc
bb.c.
bb.cp`,
map`
d.cpc
cd.cc
..d.b
b..dc
bppp.`, 
map`.....
  .....
  .win.
  ..p..
  ..d..`
]

setMap(levels[level])

setPushables({[player]: [block,crate]});
setBackground(back)

onInput("w", () => movePlayer("w"));
onInput("s", () => movePlayer("s"));
onInput("a", () => movePlayer("a"));
onInput("d", () => movePlayer("d"));
onInput("j", () => setMap(levels[level]));


function movePlayer(direction) {
  let arr = getAll(player);
  let blocks = getAll(block);
  let crates = getAll(crate);
  let xChange = 0;
  let yChange = 0;
  playTune(move);
  lvlTurn+=1;
  if (direction === "w") {
    yChange -= 1; // up
    arr.sort((a, b) => a.y - b.y);
  } else if (direction === "s") {
    yChange += 1; // down
    arr.sort((a, b) => b.y - a.y);
  } else if (direction === "a") {
    xChange -= 1; // left
    arr.sort((a, b) => a.x - b.x);
  } else if (direction === "d") {
    xChange += 1; // right
    arr.sort((a, b) => b.x - a.x);
  }

  for (let plr of arr) {
    let newX = plr.x + xChange;
    let newY = plr.y + yChange;
    if (!inBounds(newX,newY)) {
      //player moving out of bounds
      continue;
    }
    if (inWay(blocks, newX, newY) || isPlayerAt(newX, newY, arr)) {
      //there is a player or a block at the new player position
      continue;
    }
    let crateIndex = getPushableIndex(newX, newY, crates);
    //gets the crates index that's directly infront of player
    if (crateIndex === -1) {
        plr.x = newX; //can't be pushed ( no crates infront )
        plr.y = newY;
        continue;
    }
    let newCrateX = newX + xChange;
    let newCrateY = newY + yChange;
    if (inBounds(newCrateX, newCrateY)&&!inWay(blocks, newCrateX, newCrateY) &&!inWay(crates, newCrateX, newCrateY)) {
      //if the new crate is inbounds and there isn't a block or another crate in the way set the new crate value to the array
      crates[crateIndex].x = newCrateX;
      crates[crateIndex].y = newCrateY;
      plr.x = newX;
      plr.y = newY;
      }
  }
}

function inBounds(x,y){
  return x >= 0 &&
  x < 5 &&
  y >= 0 &&
  y < 5 
}
function isPlayerAt(x, y, players) {
  for (let player of players) {
    if (player.x === x && player.y === y) {
      return true;
    }
  }
  return false;
}

function getPushableIndex(x, y, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].x === x && arr[i].y === y) {
      return i;
    }
  }
  return -1;
  //can't be pushed
}


function inWay(arr, xCheck, yCheck){
    let blockInWay = false;
    for(let i of arr){
      if(i.x === xCheck && i.y === yCheck){
        blockInWay = true;
      }
    }
  return blockInWay;
}

afterInput(() => {
  let maxLvl = levels.length - 1;
  let allPlayersOnDest = 0;
  if(level < maxLvl){
    addText("Moves: " + lvlTurn, { x: 0, y: 0, color: color`9` });
  }
  for(let plr of getAll(player)){
    let curTile = getTile(plr.x, plr.y);
    if (curTile.length === 2) { // player and something where that something is an X
      if (curTile[0].type == dest || curTile[1].type == dest) {
        allPlayersOnDest += 1;
      }
    }
  }
  
  if (allPlayersOnDest === tilesWith(player).length) {
    level += 1; //if all players on tiles then reset
    totTurn += lvlTurn;
    if (level >= maxLvl+1) {
      level = 0; //restart game
      totTurn = 0;
    } else {
      playTune(winStage);
    }
    clearText();
    setMap(levels[level]);
    lvlTurn = 0; // Reset the move counter when the level changes
    if(level >= maxLvl){
     addText("Moves: " + totTurn, { x: 4, y: 2, color: color`H` });
     playTune(winGame);
    }else{
    addText("Moves: " + lvlTurn, { x: 0, y: 0, color: color`9` });
    }
  }
});
