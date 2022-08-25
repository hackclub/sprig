/*
@title: CH. 5 - victory
@author: hackclub

Count the right number of target tiles to test the win condition.

hint: use tilesWith to count tiles with a certain content
*/

const bean = 'a';
const vine = 'b';
const trellis = 'c';
const target = 'd';

setLegend(
  [bean, bitmap`
................
......000.......
.....0.220......
.....002020.....
..0..022..0.....
...0..0...0.....
...0000...20....
....2.0...20....
.....0....200...
....0...220.0...
....0...220.0...
....02.220...2..
.....0000.......
....0....0......
....0....0......
...00...00......`],
  [vine, bitmap`
........44......
.......44.......
......44.......4
......4........4
.....44........4
.44..4........44
.44.44........4.
..444........44.
..44......44.4..
.44.......4444..
44.........444..
44..........42..
4...........4...
4..........44...
4.........44....
4........44.....`],
  [trellis, bitmap`
.L...L.....L..L.
.L...L.....L..L.
..L.L.L...LL.L..
..L.L.L...L.LL..
..L.L.L..L..LL..
..LL...L.L..LL..
...L...L.L..L...
...L...LL...L...
..LL....L...LL..
..LL...LL...LL..
..L.L..LL..L.L..
.L..L..L.L.L.L..
.L..L.L..L.L.L..
.L..L.L..L.L..L.
L....L....L...L.
L....L....L...L.`],
  [target, bitmap`
......3..3......
....333..333....
...3..3..3..3...
..3..........3..
.3............3.
.3............3.
333....33....333
......3..3......
......3..3......
333....33....333
.3............3.
.3............3.
..3..........3..
...3..3..3..3...
....333..333....
......3..3......`]
);

setMap(map`
bbbbbbbbb
bbbb..dbb
bbb.....b
bb..c...b
b...c.a.b
b......bb
b.d...bbb
bb.bbbbbb
bbbbbbbbb`);

const player = () => getFirst(bean);

onInput("a", () => {
  player().x -= 1;
});
onInput("d", () => {
  player().x += 1;
});
onInput("s", () => {
  player().y += 1;
});
onInput("w", () => {
  player().y -= 1;
});

setSolids( [ bean, trellis, vine ]);

afterInput(() => {

  const coveredTargetCount = tilesWith(target, trellis).length;
  
  // TODO: change three to something like the line above
  const targetCount = 3;
  
  if (targetCount == coveredTargetCount) {
    addText("you win!");
  }
})

setPushables({
  [bean]: [trellis]
})