/*
@title: Spraze
@author: Peipr (@peiprjs)
@tags: ['puzzle']
@addedOn: 2022-08-29
*/
/*---------------------------------------------------------------------------*/
const player = "p";
const movable = "b";
const goal = "g";
const bg = "q";
const wall = "w";
const wallb = "y";
const invis = "i";
/*---------------------------------------------------------------------------*/
setLegend(
  [ player, bitmap`
................
................
................
................
.......LLL......
......L7L7L.....
.....L78L87L....
....L7863687L...
....LLL363LLL...
....L7863687L...
.....L78L87L....
......L7L7L.....
.......LLL......
................
................
................`],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ wallb, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
11111LLLLLL11111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
11111LLLLLL11111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ movable, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLL00LLL1111
1111LLL00LLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111LLLLLLLL1111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ goal, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555544444455555
5555445555445555
5554454444544555
5554545555454555
5554545665454555
5554545665454555
5554545555454555
5554454444544555
5555445555445555
5555544444455555
5555555555555555
5555555555555555
5555555555555555`],
  [ bg, bitmap`
7557557557557557
5775775775775775
7557557557557557
5775775775775775
7557557557557557
5775775775775775
7557557557557557
5775775775775775
7557557557557557
5775775775775775
7557557557557557
5775775775775775
7557557557557557
5775775775775775
7557557557557557
5775775775775775`],
  [ invis, bitmap`
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
1111111111111111`]);
let level = 0;
const nextlvl = tune`
250: e5~250,
250,
250: e5~250,
250,
250: e5~250,
250,
250: a5~250,
6250`;
const fail = tune`
375,
375: c5-375,
375: c5-375,
375,
375: c4/375,
10125`;
const levels = [
  map`
p.......w.
wwwwwww.w.
..........
.wwwwwwwww
.........g`,
  map`
......w...
.wwww.www.
.w..w.w...
.w.ww.w.w.
...w....w.
ww.wwwwww.
pw.w......
.w.ww.wwww
...w.....g`,
  map`
pw.g
.w.w
b..w
.www`,
  map`
.....b..w..
.www.w.ww..
.w.w.w.w...
...w.w.www.
wwbw.w.b...
p..b.w.www.
wwbw.w.w...
...b.w.w.ww
.w.w.w.w.wg
.www.w.w.w.
.....w.....`,
  map`
pb..
wwbw
.b.w
wg.w`,
  map`
.wg
.y.
.w.
.w.
.w.
.w.
pw.
.w.`,
  map`
pb.y
bw.w
...w
wwyg`,
  map`
.p..
qwwy
q..y
bgbw`,
  map`
pywy
yyyy
wwwy
gyyy`,
  map`
p..........
wbwwwwwwyww
...........
gwwwwwwwwww`,
  map`
p...q....q
..q.q.qq.q
qqq.q..q..
....qq.qq.
.qqqq..q..
......qq.g`];
/*---------------------------------------------------------------------------*/
const currentLevel = levels[level];
setMap(currentLevel); setSolids([player, movable, wall, invis]);
setPushables({[player]: [movable, player]});
/*---------------------------------------------------------------------------*/
onInput("s", () => {
  getFirst(player).y += 1;});
onInput("d", () => {
  getFirst(player).x += 1;});
onInput("w", () => {
  getFirst(player).y += -1;});
onInput("a", () => {
  getFirst(player).x += -1;});
/*onInput("s", () => {
  getFirst(invis).y += 1;});
onInput("d", () => {
  getFirst(invis).x += 1;});
onInput("w", () => {
  getFirst(invis).y += -1;});
onInput("a", () => {
  getFirst(invis).x += -1;});*/
onInput("l", () => {
  const currentLevel = levels[level];
  setMap(currentLevel);
  playTune(fail);
});
/*---------------------------------------------------------------------------*/

afterInput(() => {
  const target = tilesWith(goal).length;
  const failedTiles = tilesWith(bg, player).length;
  if (failedTiles === target) {
    playTune(fail);
    const currentLevel = levels[level]
    setMap(currentLevel);}
  const goalcheck2 = tilesWith(goal, invis).length;
  const goalcheck = tilesWith(goal, player).length;
  if (goalcheck2 === target) {
    level = level + 1;
    playTune(nextlvl);
    const currentLevel = levels[level];}
  if (goalcheck === target) {
    level = level + 1;
    playTune(nextlvl);
    const currentLevel = levels[level];
    if (currentLevel !== "") {
      setMap(currentLevel);} 
    else {
      setBackground(bg)
      addText("Win!", { y: 4 });
    }
  }
});





