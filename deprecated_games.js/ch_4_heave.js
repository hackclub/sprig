/*
@title: CH. 4 - heave
@author: hackclub

Make some things solid so the bean can push the trellis.
*/

const bean = 'a';
const vine = 'b';
const trellis = 'c';

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
L....L....L...L.`]
);

setMap(map`
bbbbbbbbb
bbbb...bb
bbb.....b
bb......b
b...c.a.b
b......bb
b.....bbb
bb.bbbbbb
bbbbbbbbb`);

// notice how we're using a function to get the bean now
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

// see if you can figure out what this does >:)
setPushables({
  [bean]: [trellis]
})