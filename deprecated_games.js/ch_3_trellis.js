/*
@title: Ch 3 trellis
@author: hackclub

Go get your movement code from the last challenge and add it to this one.

hint: go to your shed to get the code from the last stage!

After doing that try these things:

What happens if you getFirst(trellis) rather than getFirst(bean)? :O

What happens if you make vines solid? :3
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
..cccccc.
.cccbbccc
cccbbbbcc
ccbbbbbcc
cbbbcbbbc
ccbccbabc
cccccbbcc
cccccbcc.
..cccccc.`);

// PASTE MOVEMENT CODE BELOW THIS

setSolids( [bean, trellis] )