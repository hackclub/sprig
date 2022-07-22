
export const challenges = [
  {
    name: 'CH. 1 - bean',
    content: `
/*                     
                     WELCOME TO SPRIG!!!
 
  This is the first of many "challenges" which will help you
              familiarize yourself with Sprig.
 
   Read through to get acquainted with the format all Sprig
     games share. Play with the art! Make it your own :)
 
    When you're ready, click the big green button to go to
                   the next challenge!
 
              You can run your game by hitting Run 
                   or pressing Shift+Enter
*/

// HERE we give each kind of sprite
// in our game a letter, as a shorthand.

const bean = 'a';

// HERE we give each sprite its art!
setLegend(
  // click "bitmap" to change the art!
  [bean, bitmap\`
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
...00...00......\`]
);

// HERE we make a map out of those letters.
// try making the map bigger!
// (hint: CLICK "map")
setMap(map\`a\`);
`
  },
  {
    name: 'CH. 2 - walk',
    content: `
/*
This bean can walk left and down.
Can you add controls to walk right and up also?

Hint: we use w, a, s, d as inputs, check the help tab
*/

const bean = 'a';

setLegend(
  [bean, bitmap\`
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
...00...00......\`]
);

setMap(map\`
.....
.....
..a..
.....
.....\`);

onInput("a", () => {
  getFirst(bean).x -= 1
});

onInput("s", () => {
  getFirst(bean).y += 1
});
    `
  },
  {
    name: 'CH. 3 - trellis',
    content: `
/*
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
  [bean, bitmap\`
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
...00...00......\`],
  [vine, bitmap\`
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
4........44.....\`],
  [trellis, bitmap\`
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
L....L....L...L.\`]
);

setMap(map\`
..cccccc.
.cccbbccc
cccbbbbcc
ccbbbbbcc
cbbbcbbbc
ccbccbabc
cccccbbcc
cccccbcc.
..cccccc.\`);

// PASTE MOVEMENT CODE BELOW THIS

setSolids( [bean, trellis] )
    `
  },
  {
    name: 'CH. 4 - heave',
    content: `
/*
Make some things solid so the bean can push the trellis.
*/

const bean = 'a';
const vine = 'b';
const trellis = 'c';

setLegend(
  [bean, bitmap\`
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
...00...00......\`],
  [vine, bitmap\`
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
4........44.....\`],
  [trellis, bitmap\`
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
L....L....L...L.\`]
);

setMap(map\`
bbbbbbbbb
bbbb...bb
bbb.....b
bb......b
b...c.a.b
b......bb
b.....bbb
bb.bbbbbb
bbbbbbbbb\`);

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
    `
  },
  { name: 'CH. 5 - victory', content: `
/*
Count the right number of target tiles to test the win condition.

hint: use tilesWith to count tiles with a certain content
*/

const bean = 'a';
const vine = 'b';
const trellis = 'c';
const target = 'd';

setLegend(
  [bean, bitmap\`
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
...00...00......\`],
  [vine, bitmap\`
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
4........44.....\`],
  [trellis, bitmap\`
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
L....L....L...L.\`],
  [target, bitmap\`
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
......3..3......\`]
);

setMap(map\`
bbbbbbbbb
bbbb..dbb
bbb.....b
bb..c...b
b...c.a.b
b......bb
b.d...bbb
bb.bbbbbb
bbbbbbbbb\`);

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
  `},
  { name: 'CH. 6 - level up', content: `
/*
Add another level to this game.
*/

const bean = 'a';
const vine = 'b';
const trellis = 'c';
const target = 'd';

setLegend(
  [bean, bitmap\`
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
...00...00......\`],
  [vine, bitmap\`
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
4........44.....\`],
  [trellis, bitmap\`
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
L....L....L...L.\`],
  [target, bitmap\`
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
......3..3......\`]
);

setMap(map\`
bbbbbbbbb
bbbb..dbb
bbb.....b
bb..c...b
b...c.a.b
b......bb
b.d...bbb
bb.bbbbbb
bbbbbbbbb\`);

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

let level = 0;
const levels = [
  map\`
bbbbbbb
bba.bbb
b...bdb
b...c.b
bb.c.db
bbbbbbb\`,
  map\`
bb.a.bb
b.c.c.b
b..c..b
bbb.bbb
b..d..b
bbd.dbb\`
];
setMap(levels[0]);

afterInput(() => {
  const coveredTargetCount = tilesWith(target, trellis).length;
  const targetCount = tilesWith(target).length;
  
  setTextColor(0, 100, 255);
  setText(coveredTargetCount + '/' + targetCount + ' of the way there ...');

  if (targetCount == coveredTargetCount)
    setMap(levels[++level]);
})

setPushables({
  [bean]: [trellis]
})
  `}
]

for (const challenge of challenges)
  challenge.content = `/*
@title: ${challenge.name}
@author: hackclub
*/
${challenge.content}`;