/*
@title: Knight Post
@author: Aditya P Venugopal
@tags: ['puzzle']
@addedOn: 2023-10-23
Keys: 
- W to move forward
- A to move left
- D to move right
- S to move back

Objective: 
- You are Sir Mailus Postus, the famous knight postman 
- Push the mail towards the mat to deliver it
- The bookshelves are pushable, move them around to successully clear the path for mail
- Deliver all mail to complete the game 
- Have Fun!!!
*/



const shop = "s"
const mat = "m"
const bs ="b"
const hero = "h"
const grass = "g"
const bg = "d"
const entmap = "e"
const tree = "t"
const wall = "w"
const wood = "r"
const table = "g"
const prof = "p"
const mail = "c"

setLegend( 
  [hero, bitmap`
................
.....00000......
....0LLLLL0.....
....0LLLLL0.....
....0L0LL00.....
....0L9LL90.....
....099LL90.....
....0999990.....
....000000...0..
...001LL1L..0L0.
..0CC0L1LL.0LL0.
.0CCCC00C00LL0..
.0CCCC0L1L0L0...
..0CC0000000....
...000...0......
................`],
  [mail, bitmap`
................
................
................
................
................
0000000000000000
0C66CCCCCCCC66C0
0CCC66CCCC66CCC0
0CCCCC6666CCCCC0
0CCCCC3333CCCCC0
0CCCCC3333CCCCC0
0CCCCC3333CCCCC0
0000000000000000
................
................
................`],
  [shop, bitmap`
................
................
................
...6666666666...
...6333333336...
...6330330336...
..633300003336..
.63333033033336.
6333330330333336
0000000000000000
CL4LL111111LLLLL
4LCLL1CCCC1LCCCL
CL4LL1CCCC1LC6CL
4LCLL16CCC1LCCCL
CL4LL1CCCC1LLLLL
4LCLL1CCCC1LLLLL`],
  [ mat, bitmap`
66.6666666..6..6
...............6
6..............6
.........3......
....3....3.....6
6...3....3......
....3....3.....6
6...333333.....6
6...3....3......
....3....3.....6
6...3....3.....6
6........3.....6
6..............6
...............6
6...............
6..6666..6.666.6`],
  [bs, bitmap`
CCCCCCCCCCCCCCCC
L00000000000000L
L0903L0HH049020L
L0903L0HH049020L
L0903L0HH049020L
L0903L0HH049020L
L00000000000000L
LCCCCCCCCCCCCCCL
L00000000000000L
L060F05309010H0L
L060F05309010H0L
L060F05309010H0L
L060F05309010H0L
L060F05309010H0L
L00000000000000L
CCCCCCCCCCCCCCCC`],
  [grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
44444D444D444444
444444D4D4444444
4444444D44444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [bg, bitmap`
4444444444444444
4444444444444444
4444D44444444444
4D4444444D444444
4444444444444D44
4444444444444444
4444444D44444444
4444444444444444
4444D44444444444
4444444444444444
4444444444444444
44444444D4444D44
4444444444444444
444D444444444444
4444444444444444
4444444444444444`],
  [entmap, bitmap`
6C6C6C6C6C6C6C6C
CCCCCCCCCCCCCCC6
6CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCC6
6C6C6C6C6C6C6C6C
................
................
................
................
................
................
................
................
................
................
`],
  [tree, bitmap`
................
......DDDD......
.....D4444D.....
.....D4444D.....
....D44D444D....
....D444444D....
...DD4444D4DD...
...DD4D4444DD...
....D444D44D....
....D444444D....
.....D4444D.....
.....DDDDDD.....
.......CC.......
.......CC.......
......CCCC......
.....CCCCCC.....`],
  [wall, bitmap `
1111111111111111
C0CC0C1CC0CC00CC
CCCCCC1CCCCCCCCC
CCCCCC10CCCCCCCC
CCCCC01CCCCCCCCC
CCCCCC1CCCCCCCCC
CC0CCC1CCCC0C0CC
1111111111111111
0C1CC0CCC0CCC1CC
CC1CCCCCCCCCC10C
CC10CCCCCCCCC1CC
C01CCCCCCCCC010C
CC1CCCCCCCCCC1CC
0C1CCC0CCCCCC1C0
1111111111111111
1111111111111111`],
  [wood, bitmap`
LLLLLLLLLLLLLLLL
LC1CCCCCCCCCCCCL
LC1CCCC11CCCCCCL
LC1C1CCCC11CCCCL
LC1CC11CCCC11CCL
LC1CCCC1CCC1C1CL
LCCCCCCC1CC1CCCL
LCC1CCCCCCC1CCCL
LCCC11C11CC1CCCL
LC11CC1CC111CCCL
LCCC11C11CC111CL
LCCCCC11C1C1CCCL
LCCCCCCC1111CCCL
LC1111CCCCCC1CCL
LCCCCCCCCCCCCCCL
LLLLLLLLLLLLLLLL`],
  [prof, bitmap `
....555555755...
...57575755575..
..57599999995...
..57599099099...
...5993093099...
...5999999999...
...9999000099...
....99999999....
.....0LLLL0.....
.....0L1110.....
.....0L0110.....
.....0L0110.....
.....0L9LL0.....
......CCCC......
......C..C......
......C..C......`],
  
  

)

setBackground(bg)


let level = 0 ; // this tracks the level we are on
const levels = [
  map`
wwwwwwwwww
wt.g.g..tw
w..cg.tg.w
wt.g...s.w
wtt.g.gegw
w.....tgtw
wwwwhwwwww`,
  map `
rrrrrrr
rbbbmpr
rbmmmer
rbmcmbr
rrrhrrr`,
  map`
wwwwwwswwwwww
w..tte.et...w
w.ctt...t.c.w
w..t....tt..w
w......ttt..w
w.tt.t.tt...w
w.tttt..tt..w
w..tt.......w
wwwwwwh.wwwww`,
  map `
rrrrrrrrerrrrrrrr
r....w..b.......r
r.cww.....wwww..r
r..w..wbbww..w..r
r..ww........w..r
r....w......ww..r
r..........ww...r
r.rrr..r.www....r
rrrrrrrrhrrrrrrrr`,
  map `
e...www
w.b..bw
w.bc.bw
wb...bw
wwwhwww`,
  map`
we.wwwewwwwew
w.b...b..b..w
w.b...b.b...w
wbb....bb...w
w.b......b..w
w...c.c.c...w
wwwww.h.wwwww`,
  map `
echce`,
  
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("d", () => {
  // Move the player one tile to the right
  getFirst(hero).x += 1
})

onInput("w", () => {
  // Move the player one tile to the right
  getFirst(hero).y -= 1
})
onInput("a", () => {
  // Move the player one tile to the right
  getFirst(hero).x -= 1
})
onInput("s", () => {
  // Move the player one tile to the right
  getFirst(hero).y += 1
})

setSolids([ shop, hero, bs,tree, wall, prof, wood, mail ])
setPushables({ 
  [hero]: [ mail, bs ] , [bs] : [bs]
})

onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(entmap).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(mail, entmap).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
