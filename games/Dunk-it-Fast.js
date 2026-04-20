
       /*
	     @title: Dunk it fast
	     @author: Sefa
	     @description: Eliminate enemies to advance to the next level! Don't get fast your you'll trap yourself, be methodical and push the boxes into the right place!
	     @tags: 'maze', 'levels', 'strategy']
	     @addedOn: 2026-04-18
     */
    
    const wall = "w"
    const player = "p"
    const enemy = "e"
    const lock = "l"
    const next = "n"
    const box = "b"

setSolids([ player, wall ])
setSolids([ player, lock ])
setLegend(
	[ wall, bitmap`
9CC9CCCCCCC9CCCC
CCC9CCC9CCCC99CC
9999999999999999
C9CCCCCCCCCCCC9C
CCCC99CCCCCCCCC9
99CC9C99C999CCCC
9C999CC999CC9999
9CCCCCCCCCCCCCCC
CCC999CCCC9CCCCC
999CCC99CCC9C999
CCCCCCCC99C99CC9
999999CCC999CC9C
CCC9C999CC9CC9CC
C999CCC99CCCCCC9
9CC99CCC9999999C
99999999CCCCC9CC`],
    [ player, bitmap`
................
....LLLLLLLL....
...LL......LL...
..LL........LL..
.LL.33.....33LL.
.L...33...3...L.
.L....33.33...L.
.L.....3.3....L.
.L..0.......0.L.
.L...0.....0..L.
.LL...00000..LL.
..LL........LL..
...LL......LL...
....LLLLLLLL....
................
................`],
    [enemy, bitmap`
................
................
................
.......666......
......66666.....
.....6966696....
.....9F969F9....
.....6966696....
.....6666666....
.....6999996....
.....69FFF96....
.....6999996....
......66666.....
......6...6.....
......6...6.....
.....66..66.....`],
    [lock, bitmap`
................
......11111.....
.....11...11....
....11.....11...
....1.......1...
....1.......1...
....1.......1...
....666666666...
....666666666...
....6666F6666...
....6666F6666...
....666FF6666...
....666666666...
....666666666...
....666666666...
................`],
    [next, bitmap`
................
................
................
...5555555555...
...5777777775...
...57DDDDDD75...
...57D4444D75...
...57D4444D75...
...57D4444D75...
...57D4444D75...
...57DDDDDD75...
...5777777775...
...5555555555...
................
................
................`],
    [box, bitmap`
LLLLLLLLLLLLLLLL
LL0000LLLL0000LL
L0L0000LL0000L0L
L00L00000000L00L
L000L000000L000L
L0000L0000L0000L
LL0000L00L0000LL
LLL0000LL0000LLL
LLL0000LL0000LLL
LL0000L00L0000LL
L0000L0000L0000L
L000L000000L000L
L00L00000000L00L
L0L0000LL0000L0L
LL0000LLLL0000LL
LLLLLLLLLLLLLLLL`],
  
)


const levels = [

  map`
p.we..b.
w.w.ww.w
ebeb.w.w
w.www..w
wwebw.b.
e.b..wew
l...ew..
nw...bb.`,
  map`
pbbbb...bbb....ln
ww.weww.w.w.wb..l
ewewwew.w.w.wb...
........we....bbe`,
  map`
nlb..bbbbln
l...bbbbbbl
.bbbbbbb...
.bbbbbbbbbb
.bbbbpbbbbb
.bbbbbbbb..
..bbbb.bbbb
l.bbbb.b.b.
n...bb.b..e`,
  map`
pww.b.bbb.ew...
.ww.wewwww.w.w.
.ww.www...b..w.
....b.w.w.ww.e.
w.ww.ww.w..w.w.
w.ww....ww.w.w.
w.wwwwwww..w.w.
e.w....ew.ww.w.
w.w.ww....ww.w.
w.w..wwwwwww.w.
.bww.........w.
e.wwbwwwwwwwwe.
wwe.bwe..wew...
ewww.www...w..w
...w....b.w..lw
...bb.......lnw`,
  map`
nweeeeeewe....e
lwebbbbewew.www
.webpeeewew..ew
.webbbbbwew....
.weeeeeeebbbbb.
.wwwwwwwwwb....
.b..w.wwwbb.bbb
..w.......b....
.bwbw.w..bbbbb.
.....b.ewbbe...`,
  map`
.......................e
.e......................
.www.wwww.wbww.www.wwww.
.wew.w..b.w..w..we.w.ew.
.w...we.w.wp.w..w..w....
.www.wwww.wwww..w..wwww.
...w.we...www...w..w.nw.
.wew.w....w.ww..w..w.lw.
.www.w....w..w.www.wbww.
........................
.ww..wbe.ww..ww..wbe.ww.
.e.bw..ww..wbe.ww..ww...
........................`,
  ];
let level = 0;

setMap(levels[level])




setPushables({
	[ player ]: []
})

onInput("w", () => {
	getFirst(player).y += -1
})
onInput("s", () => {
	getFirst(player).y += 1
})
onInput("a", () => {
	getFirst(player).x += -1
})
onInput("d", () => {
	getFirst(player).x += 1
})
onInput("j", () => {
	setMap(levels[level])
})

afterInput(() => {
  const enemyCovered = tilesWith(player, enemy);

  enemyCovered.forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === enemy) {
        sprite.remove();
      }
    });
  });

  // remove lock if all enemies gone
  if (tilesWith(enemy).length === 0) {
    const lockSprite = getFirst(lock);
    if (lockSprite) {
      lockSprite.remove();
    }
  }

  const nextCovered = tilesWith(player, next);

  if (nextCovered.length >= 1) {
    level++;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win! :D", { y: 4, color: color`4` });
    }
  }
});



setSolids([ player, wall, box, lock ]); // Modify this line: box has to be solid to be pushable

setPushables({
    [player]: [box], // player can push box
    [box]: [box] // box can push box
})