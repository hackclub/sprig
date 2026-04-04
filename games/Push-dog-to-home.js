/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Push
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const dog = "d"
const wall = "w"
const finish = "f"
const wall2 = "2"
const walking = tune`
130.43478260869566: C4^130.43478260869566,
130.43478260869566: C4^130.43478260869566 + D4~130.43478260869566,
130.43478260869566: D4~130.43478260869566,
3782.608695652174`


setLegend(
  [ player, bitmap`
................
................
....0000........
...032230.......
...022220.......
....0LL0........
...000000.......
..00.00.00......
.00..00..0......
.0...00..00.....
.....00...0.....
.....000........
....00.0........
....0..00.......
....0...0.......
...CC...CC......` ],
  [ dog, bitmap`
................
................
................
............CCCC
...........C0C0C
.CCCCCFFCCCCCCCC
CCFFFFFCCCCCC33C
FFFCCCCCCCCCCC33
CCCCCCCCCCCCCCC.
CCCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
..CC..C....C..C.
..C..CC....C.CC.
.CC.CC....CC.C..
.C..C....CC.CC..
.C..C....C..C...` ],
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LL1111111111LL0
0LL1111111111LL0
0LL11LLLLLL11LL0
0LL11LLLLLL11LL0
0LL11LL00LL11LL0
0LL11LL00LL11LL0
0LL11LLLLLL11LL0
0LL11LLLLLL11LL0
0LL1111111111LL0
0LL1111111111LL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ wall2, bitmap`
3333223333332233
2222222222222222
2333333322333333
2333333322333333
2222222222222222
3332233333322333
3332233333322333
2222222222222222
2333333322333333
2333333322333333
2222222222222222
3332233333332233
3332233333332233
2222222222222222
3333333223333333
3333333223333333`],
  [ finish, bitmap`
................
................
.......33.......
......3113......
.....301103.....
....30000003....
...3000000003...
..300000000003..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LL2LLLLLLL0..
..0LL2LLLCCLL0..
..0LLLLLLC0LL0..
..0LLLLLLCCLL0..
..000000000000..` ]

)

setSolids([dog, player, wall, wall2])

let level = 0
const levels = [
  map`
p...w..wwf
..w.w..ww.
..w.w..w..
.dw.w..ww.
....wwww..
..w.w.....
.w.....ww.
...www....`,
  map`
..........
...w....w.
.www.w....
.d...w....
w.ww.w..ww
...w.w..w.
w....w.ww.
wpf.......`,
  map`
f...222...
22...22.2.
.....2....
.22.22..d2
.22..222.2
....2p.2..
.2........
.2..2...22`,
  map`
22.......f
2....2..2.
....2.f22.
.2.2..2...
....2....2
.2.2..2.2.
.....d.2..
....2..p2.`
  

]

addText("press j to restart", { x: 2, y: 5, color: color`0` })

setMap(levels[level]) 
setPushables({ [ player ]: [dog] }) 
onInput("s", () => { 
  getFirst(player).y += 1,
  playTune(walking)

})

onInput("w", () => { 
  getFirst(player).y -= 1,
  playTune(walking)
}) 

onInput("d", () => { 
  getFirst(player).x += 1,
  playTune(walking)
}) 

onInput("a", () => { 
  getFirst(player).x -= 1,
  playTune(walking)
}) 
onInput("j", () => {
  setMap(levels[level])
  addText("press j to restart", { x: 2, y: 5, color: color`0` })
})

afterInput(() => { 
  clearText(); 
  if (tilesWith(dog, finish).length >= 1) { 
    addText("You Won!", { x: 7, y: 7, color: color`6` });
    addText("press j to restart", { x: 2, y: 5, color: color`0` });
    level += 1; 
    if (level < levels.length) {
      setMap(levels[level]); 
    } else {
      addText("all levels completed", { x: 3, y: 7, color: color`9` });
    }
  }
});