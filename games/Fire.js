/*
@title: Fire
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "A";
const box = "F";
const goal = "t";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
.......66.......
......6666......
..33.666666.33..
.33336616163333.
3333366666633333
..LL.662226.LL..
..LLLL66666LLL..
.....666666.....
.....666666.....
.....666666.....
.....666666.....
....00000000....
......0..0......
.....00..00.....`],
  [ box, bitmap`
................
.......3.3......
.........3......
.....3..3.......
.....3.33..3....
.......3........
......3333......
......33333.....
....3333333.....
....333333333...
....399999333...
....396669333...
....39999933....
....33333333....
..........3.....
................`],
  [ goal, bitmap`
................
................
................
....LLLLLLL.....
...LLL...LL.....
...L.6..HHLL....
...L.6.HH..L....
...L.66H...L....
...LL.HH...L....
...LLHH6...L....
....LL.66..L....
....LLLLL.LL....
....LLLLLLL.....
......L.........
......L.........
................`],
  [ wall, bitmap`
0000000000000000
3000300000000000
0303000000000000
0030300000000000
0000000030030300
0000000030033000
0000000003333000
0000300030003000
3300000330000000
0330003000000003
0033003000000000
0000303030030000
0000030000000300
HHHH300030003000
HHHH000000000000
HHH0000000000000`]
);

setSolids([player, wall]);

let level = 0; 
let coins = 0; 

const levels = [
  map`
Aw.FF....
......FF.
.ww.F.FF.
w.wwFw...
t........`,
  map`
.F....FFFt
FF.FF.FF..
A..FF.FF.F
FFF.......`,
  map`
AFw.
.Fw.
....
FFwt`
];

setMap(levels[level]);

setPushables({
  [player]: []
});

function collectCoin() {
  const playerTile = getFirst(player);
  const boxTile = getTile(playerTile.x, playerTile.y).find(obj => obj.type === box);
  
  if (boxTile) {
    coins++;
    boxTile.remove();
    addText(`Coins: ${coins}`, { y: 1, color: color`3` });
  }
}

function nextLevel() {
  level++;
  if (level < levels.length) {
    setMap(levels[level]);
    addText("NEXT", { y: 4, color: color`H` });
  } else {
    addText("YOU WIN!", { y: 4, color: color`H` });
  }
}

onInput("s", () => {
  getFirst(player).y += 1;
  collectCoin();
});

onInput("w", () => {
  getFirst(player).y -= 1;
  collectCoin();
});

onInput("d", () => {
  getFirst(player).x += 1;
  collectCoin();
});

onInput("a", () => {
  getFirst(player).x -= 1;
  collectCoin();
});

afterInput(() => {
  const playerTile = getFirst(player);
  if (getTile(playerTile.x, playerTile.y).some(obj => obj.type === goal)) {
    nextLevel();
  }
});
