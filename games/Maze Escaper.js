const player = "r"; 
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
................
................
...444444.......
..444442244.....
.4424255244.....
.44222552444....
.44455554444....
..444444444.....
.55555544444....
.555555 444.....
.555555 4.......
..55555.........
..2.2..55.......
..2.2..55.......
.22.22.55.......
................` ], 
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L111111L1L1L
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L111111L1L1L
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ goal, bitmap`
................
................
.....44444......
....44...44.....
...44.....44....
..44.......44...
..4.......444...
.4.........4....
.4...666...4....
.4...6.6...4....
.4...666...4....
.4.........4....
.44.......4.....
..44.....44.....
...44...44......
....44444.......` ]
);

setSolids([ wall ]); 

let level = 0;
const levels = [
  map`
wwwwwwwwww
w........w
w.www.ww.w
w.w....w.w
w.w.rw.w.w
w.w....w.w
w.wwwwww.w
w........w
wwwwwwgwww`,
  map`
wwwwwwwwww
w....ww.gw
w.ww.w..ww
w.ww.w.www
w..w.w...w
ww.w.www.w
w.rw...w.w
wwwww.ww.w
w........w
wwwwwwwwww`,
  map`
gwwwwwwwww
.wwwwwwwww
.......w.w
w.wwww.w.w
w.wrww.w.w 
w.w..w...w
w.ww.wwww.
w....w...w
wwwwww...w
wwwwwwwwww`,
  map`
wwwwwwwwww
wr.......w
wwwwwww..w
w.....w..w
w.www.w..w
w.wgw.w..w
w.w...w..w
w.wwwww..w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wr.w...w.w
w..w.w.w.w
w.w..w.w.w
w.w.w..w.w
w.w.w.w...
w.w.w.w.w.
w...w...w.
wwwwwwwww.
g.........`,
  map`
wwwwwwwwww
wg.......w
www.www..w
w...www..w
w.ww..wwww
w.w...w..w
w.w.w.w.ww
w.w.w...rw
w.w.wwwwww
w........w`,
  map`
g..wwwwwww
.w...w...w
.w.w.w.w.w
.w.w...w.w
.w.wwwwwww
.w.......w
.wwwwwww.w
.......w.w
wwwwwwww.w
r........w`,
  map`
wwwwwwwwww
w.w....g.w
w.w.wwww.w
w...w....w
wwwww.wwww
w.....w..w
w.wwwwwww.
w....rw..w
wwwww..w.w
wwwwwwwwww`
];

setMap(levels[level]);

onInput("w", () => { getFirst(player).y -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });

let gameWon = false; 

afterInput(() => {
  if (gameWon) return; 

  const playerSprite = getFirst(player);
  const tiles = getTile(playerSprite.x, playerSprite.y); 

  if (tiles.some(tile => tile.type === goal)) {
    level++; 
    
    if (level < levels.length) {
      clearText(); 
      setMap(levels[level]); 
      addText(`Level ${level + 1}`, { 
        x: 5, 
        y: 1, 
        color: color`5` 
      });
    } else {
      gameWon = true;
      clearText();
      addText("YOU WIN!", { 
        x: 5, 
        y: 6, 
        color: color`4` 
      });
       addText("Excellent!", { 
        x: 4, 
        y: 7, 
        color: color`6` 
      });
    }
  }
});