/*
@title: PASS_ALL
@author: Shivang0
@tags: ['strategy']
@addedOn: 2022-10-03
Instructions:
1) Cover All Tiles
2) You cannot take a step back. So, be careful
3) Move with the aim to cover all boxes to win
*/
const coolguy = "c"; /*p*/
const green = "g"; /*r*/
const blocker = "b"; /*w*/
setLegend(
  [ coolguy, bitmap`
................
................
................
................
....11111111....
....11411411....
....11111111....
....18111181....
....11888811....
....11111111....
.....33..33.....
.....33..33.....
.....33..33.....
................
................
................`],
  [ green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ blocker, bitmap`
0000000000000000
0000000000000000
0000044444440000
0004444444444400
0004444444444400
0044444444444440
0044444444444440
0044444444444440
0044444444444440
0044444444444440
0044444444444440
0004444444444400
0004444444444400
0000044444440000
0000000000000000
0000000000000000`]
)
setSolids([coolguy, green, blocker])
let level = 0;
const levels = [
  map`
cb..
.b.b
...b`,
  map`
c.......
bbbbbbb.
......b.
.bbbb.b.
.b.bb.b.
.b....b.
.bbbbbb.
........`,
  map`
c.....bbb
bbbbb....
.........
....bbb..
bbb......
.b.......
.b....b..
......b..`,
  map`
c.......
........
.b......
...bbbb.
....b...
.bb.....
.bb..bbb`,
   map`
c........b
b..bbbb..b
b.........
b......bb.
b...bb..b.
b...bb..b.
..........
.bbbb..b..`,
   
]
setMap(levels[level])
const c = getFirst(coolguy);
addSprite(c.x - c.dx, c.y - c.dy, green)
onInput("w", _ => {
  getFirst(coolguy).y -= 1;
})
onInput("s", _ => {
  getFirst(coolguy).y += 1;
})
onInput("a", _ => {
  getFirst(coolguy).x -= 1;
})
onInput("d", _ => {
  getFirst(coolguy).x += 1;
})
onInput("j", _ => {
  setMap(levels[level]);
  const c = getFirst(coolguy);
  addSprite(c.x, c.y, green)
  
})
afterInput(_ => {
  const p = getFirst(coolguy);
  if (p.dy !== 0 || p.dx !==0) {
    addSprite(p.x, p.y, green)
  }
  if (getAll(green).length === width() * height() - getAll(blocker).length) {
    level++;
    if (level in levels) setMap(levels[level])
    else addText("You are the Best", { y: 5, color: color`5`})
    const c = getFirst(coolguy);
    addSprite(c.x, c.y, green)
  }
})
