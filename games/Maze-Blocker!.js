//Maze game
const player = "p"
const wall = "o"
const goal = "g"
const enemy = "e"
let total = 0;
setLegend(
  [ player, bitmap`
................
.......66.......
......6666......
.....666666.....
....66666666....
...6666666666...
...6006666006...
...6006666006...
...6666666666...
...6666666666...
...6666666666...
...6600000066...
...6666666666...
................
................
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ goal, bitmap`
................
................
................
...44444444444..
...43333333334..
...43111111134..
...43166666134..
...43168886134..
...43168886134..
...43166666134..
...43111111134..
...43333333334..
...44444444444..
................
................
................`],
  [ enemy, bitmap`
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
);

setSolids([player, wall, enemy])

let level = 0
const levels = [
  map`
oooooooooooo
op.oo.....go
o..oo..o...o
o..oo..o...o
o..ooe.o...o
o..oo..o..eo
o..oo..o...o
o..oo..ooo.o
oe.....o...o
o.....e...eo
oooooooooooo`,
  map`
oooooooooo
o...p..oeo
o.ooo....o
o.o...oooo
o.o......o
o.o.ooo..o
oe....o..o
ooooo....o
ooo.g.o.eo
oooooooooo`,
  map`
oooooooooooo
op....o....o
o.o.e.oeoo.o
o.o.o......o
o.o.o.o..eoo
o.o.o.oo...o
o.e.o......o
o.....oo.e.o
o.eooe.o.o.o
o.........go
oooooooooooo`
];

setMap(levels[level]);


onInput("s", () =>{
  getFirst(player).y += 1;
  total++;
});
onInput("w", () =>{
  getFirst(player).y -= 1;
  total++;
});
onInput("a", () =>{
  getFirst(player).x -= 1;
  total++;
});
onInput("d", () =>{
  getFirst(player).x += 1;
  total++;
});


onInput("j", () => {
  setMap(levels[level]);
});

afterInput(() => {
  addText("Moves: " + total, { x: 0, y: 0, color: color`6` });
  const tN = tilesWith(goal).length;
  const nC = tilesWith(goal, player).length;

  if (tN === nC) {
    level++;
    if (levels[level]) {
      setMap(levels[level]);
    } else {
      addText("You win!", { y: 4, color: color`4` });
    }
    return;
  }

  const play = getFirst(player);
  const enemies = getAll(enemy);

  for (let i of enemies) {
    const moves = [
      { x: 0, y: -1 }, 
      { x: 0, y: 1 },  
      { x: -1, y: 0 }, 
      { x: 1, y: 0 }   
      ];

    const move = moves[Math.floor(Math.random() * moves.length)];
    i.x += move.x;
    i.y += move.y;

    
    if (i.x === play.x && i.y === play.y) {
      addText("Game over.", { y: 3, color: color`3` });
    }
  }
});
