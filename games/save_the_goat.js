/*
@title: save-the-goat
@author: Cookiesgobrr
@tags: []
@addedOn: 2025-01-03
*/

const player = "p";
const hammerhead = "o";
const mapa = "m";
setLegend(
  [hammerhead, bitmap`
................
................
................
................
................
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
....000000000000
.....000000.....
.....000000.....
.....000000.....
...00000000.....
..000000000000..
.0000000000000..`],
  [player, bitmap`
................
.......FFFFFFFFF
.......FFFF2020F
.......FFFF2222F
.......FFFF2022F
.......FF.F2000F
.......FF.FFFFFF
..........FF....
FFFFFFFFFFFF....
F.FFFFFFFFFF....
F.FFFFFFFFFF....
F.FFFFFFFFFF....
F.FFF...FFFF....
..FFF...FFFF....
..FFF...FFFF....
..FFF...FFFF....`],
  [mapa, bitmap `
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
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
)
setMap(map`
mmmmmmmm
mmmmmmmm
mmmmmmmm
mmmmmmmm
mmmmmmmm
mmmmmmmm
mmmmmmmm
..p.....`)
var gameRunning = true; 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});
onInput("d", function() {
    getFirst(player).x += 1;
});
function spawnhammerhead() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, hammerhead);
}

function movehammerheads() {
  let hammerheads = getAll(hammerhead);

  for (let i = 0; i < hammerheads.length; i++) {
    hammerheads[i].y += 1;
  }
}
function despawnhammerheads() {
  let hammerheads = getAll(hammerhead);

  for (let i = 0; i < hammerheads.length; i++) {
   if (hammerheads[i].y == 8) {
     hammerheads[i].remove();
   }
  }
}
function checkHit() {
  let hammerheads = getAll(hammerhead);
  let p = getFirst(player);

  for (let i = 0; i < hammerheads.length; i++) {
    if (hammerheads[i].x == p.x && hammerheads[i].y == p.y) {
      return true;
    }
  }
  return false;
}
var gameLoop = setInterval(() => {
  despawnhammerheads();
  movehammerheads();
  spawnhammerhead();
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("YOU DIED BRUH!", {
      x: 5,
      y: 6,
      color: color`5`
    });
  }
}, 750);

