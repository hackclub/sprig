/*
@title: Spraze
@author: Peipr (@peiprjs)
*/
/*---------------------------------------------------------------------------*/
const player = "p";
const movable = "b";
const goal = "g";
const bg = "q";
const wall = "w";
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
5775775775775775`]);
let level = 0;
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
wg.w`];
/*---------------------------------------------------------------------------*/
const currentLevel = levels[level];
setMap(currentLevel); setSolids([player, movable, wall]);
setPushables({
  [player]: [movable, player]});
/*---------------------------------------------------------------------------*/
onInput("s", () => {
  getFirst(player).y += 1;});
onInput("d", () => {
  getFirst(player).x += 1;});
onInput("w", () => {
  getFirst(player).y += -1;});
onInput("a", () => {
  getFirst(player).x += -1;});
/*---------------------------------------------------------------------------*/
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {
  const target = tilesWith(goal).length;
  const goalcheck = tilesWith(goal, player).length;
  if (goalcheck === target) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);} 
    else {
      setBackground(bg)
      addText("Win!", { y: 4 });}}});