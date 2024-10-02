/*
@title: snakey snake
@author: Alexander Chin
@tags: ['strategy']
@addedOn: 2022-08-12
Instructions:
Eat all of the apples, then go for orphy!
rock eater power ups allow you to eat rocks - one rock per power up. 
Still working on making new levels - feel free to make more!
*/

const player = "p";
const red = "r";
const wall = "w";
const bomb = "b";
const orph = "o";
const powerup = "u";

setLegend(
  [ player, bitmap`
................
................
................
...000..........
...002...000....
...000...002....
...000...000....
.........000....
................
................
................
.........0......
......0000......
................
................
................`],
  [ red, bitmap`
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
3333333333333333
 `],
  [ wall, bitmap`
................
................
.....44.........
......44........
.......4........
.......4...44...
...44444444444..
...4...444...4..
...4.4444444444.
...444....44444.
...4....444..4..
...4...44....4..
...44.4444444444
....444......4..
......44444444..
................`], 
  [ bomb, bitmap`
................
................
................
.....0000000....
...000LLLLL00...
...0LLLLLLLLL0..
...0LLLLLLLLLL0.
...0LLLLLLLLLL00
...0LLLLLLLLLLL0
...0LLLLLLLLLL00
..0LLLLLLLLLLL0.
..0LLLLLLLLLL00.
..0LLLLLLLLL00..
..0L000000000...
..000...........
................`], 
  [ orph, bitmap`
.....000........
...000.00.......
..00....000.....
.00.......0.....
.0....0.0.0.....
.0....0.0.0.....
.0....0.0.00000.
.0............00
.0.............0
.0.............0
.0...........000
.0........0000..
.0........0.....
.0........0.....
.0........0.....
.0........0.....`], 
  [ powerup, bitmap`
................
.....77777777...
....77....6..7..
....7.....66.77.
....7..66.66..7.
...7...66.66..7.
...7...66......7
..7.....6......7
..7..6.....6...7
..7..6.....6...7
..7..6666666...7
..7...........7.
..7...........7.
..7.........777.
..7.......77....
..77777777......`], 
)

setSolids([player, red, orph])

let level = 0;

const levels = [
  
  map`
p.......
.ww.....
.www....
..wow...
...www..
....ww..
........
........`,
  map`
p.ub....
bbbb....
........
....w...
....o...
........
........
........`,
  map`
puuu.bw.
ubu.bww.
uuwb.bb.
ubbww.w.
..w..bbw
b..bw.bb
bw.w....
wwwb.b.o`,
]


const currentLevel = levels[level];
setMap(currentLevel);

const p = getFirst(player);
addSprite(p.x - p.dx, p.y - p.dy, red)

onInput("w", _ => {
  getFirst(player).y -= 1;
})

onInput("s", _ => {
  getFirst(player).y += 1;
})

onInput("a", _ => {
  getFirst(player).x -= 1;
})

onInput("d", _ => {
  getFirst(player).x += 1;
})


afterInput(_ => {
  const p = getFirst(player);
  if (p.dy !== 0 || p.dx !==0) {
    addSprite(p.x, p.y, red)
  }

  const deadDead = tilesWith(bomb, red).length;
  const targetNumber = tilesWith(wall).length;
  const numberCovered = tilesWith(wall, red).length;
  const winWin = tilesWith(orph, red).length;
  const rockEater = tilesWith(powerup, red).length;
  
  if (deadDead === rockEater + 1) {
    const currentLevel = levels[level];
    setMap(currentLevel)
    const p = getFirst(player);
    addSprite(p.x - p.dx, p.y - p.dy, red)
  }
    
  if (numberCovered === targetNumber) {
    setSolids([player, red])
  }

  if (winWin === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
  
    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      const p = getFirst(player);
      addSprite(p.x - p.dx, p.y - p.dy, red)
    } else {
      addText("you win!", { y: 4 });
      const p = getFirst(player);
      addSprite(p.x - p.dx, p.y - p.dy, red)
    }
  }
})