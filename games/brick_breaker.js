/*
@title: brick_breaker
@author: shaunba
@tags: ['strategy']
@addedOn: 2023-01-14

Instructions:

Hit "run" to start the game,
your objective is to break all the bricks in a level
complete all levels to win

controls:
'a' to shift the paddle to left
'd' to shift the paddle to right
*/

const paddle = "p";
const brick = "b";
const ball = "a";
const bg = "f";
setLegend(
  [ paddle, bitmap`
5555555555555555555555555555555555555555555555
4444444444444444444444444444444444444444444444
`],
[brick, bitmap`
................
................
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
................
................
`],
[ball, bitmap`
......999......
....9933399....
....9333339....
...933333339...
...933333339...
...933333339...
....9333339....
....9933399....
......999......

`],
[ bg, bitmap`
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
0000000000000000`]
);

setSolids([ball]);

let level = 0;
const levels = [
  map`
.......a........
................
...b.......b....
..b.b.bbb.b.b...
...b.......b....
......bbb.......
...b........b...
....b......b....
.....bbbbbb.....
................
................
.......pp.......
`,
  map`
................
...a............
bbbbbbbbbbbb....
................
....bbbbbbbbbbbb
................
bbbbbbbbbbbb....
................
................
................
................
.......pp.......
`,
  map`
...............
...............
b..bbbbbbbbb..b
bba.bbbbbbb..bb
bbb..bbbbb..bbb
bbbb...b...bbbb
bbb..bbbbb..bbb
bb..bbbbbbb..bb
b..bbbbbbbbb..b
...............
...............
.......pp......
`,
  map`
.................
...a.............
...bbb.....bbb...
..b.b.b...b.b.b..
..b.b.b...b.b.b..
..bbbbb...bbbbb..
..bbbbb...bbbbb..
..b.b.b...b.b.b..
.................
.................
.................
.......pp........
`,
];
setBackground(bg);
setMap(levels[level]);
let score = 0;

addText(`${score}`, {
  y: 1,
  x: 9,
  color: color`2`
});

function wScore() {
  addText(`${score += 1}`, {
  y: 1,
  x: 9,
  color: color`2`
  });
}
let hX = 1;
let hY = 1;

onInput("d", () => {
  getAll(paddle).forEach(s => s.x += 2)
});

onInput("a", () => {
  getAll(paddle).forEach(s => s.x -= 2)
});

let gmInterval = setInterval(() => {
  let theball = getFirst(ball);
  let prevposX = theball.x;
  theball.x += hX;
  if (prevposX == theball.x){
    hX *= -1;
  }
  let prevposY = theball.y;
  theball.y += hY;
  if (prevposY == theball.y){
    hY *= -1;
}
let collided = tilesWith(ball, brick)
  if (collided.length > 0){
    let collision = collided[0];
    let br = collision.find(s=>s.type===brick);
    br.remove();
    wScore();
    hY *= -1;
  }  
  let paddleTiles = tilesWith(paddle);
  if (paddleTiles.some(s => s.length > 1)){
    hY *= -1;
    theball.y += hY
  }
if (theball.y >= height() -1) {
    theball.remove();
    clearText()
    addText ("GAME OVER!", { y: 1, x: 5, color: color`2` });
    addText ("TRY AGAIN!", { y: 10, x: 5, color: color`2` });
    clearInterval(gmInterval);
 } 
if (getAll(brick).length === 0) {
    level++;
    if (level in levels) setMap(levels[level])
    else {addText("Great! You Win!", { y: 7, color: color`2`});
        theball.remove();
}
  }


},175/1)