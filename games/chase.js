

const player = "p";
const enemy = "o";
const enemy2 = "i";
const wall = "u";
const rack = "y";
const word1 = "t";
const word2 = "r";
const word3 = "e";
const word4 = "w";
const word5 = "q";
const word6 = "a";
const face = "s";
const fries = "d";
const floor = "f";
const sink = "g";
const fridge = "h";
const wall2 = "j";




var running = true

setLegend(
  [ player, bitmap`
................
................
..FFFF..........
.FFFFFFF........
.FFF0FFFF.......
FFFFFFFFFF......
FFF0FFFFFFFF....
FFFFFF0FFF0FFFF.
FFFFFFFFFFFF0FFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
.FFFF0FFFF0FFFFF
.FFFFFFFFFFFFFFF
..FFFFFFFFFFFFFF
....FFFFFFFFFFF.
.....FFFFFFFF...` ],
  [ enemy, bitmap`
.111............
.1111...........
.11111..........
..11111.........
..111111........
..11111111......
...1111111......
...11111100.....
...111110000....
....1100000000..
.....1000000000.
.......000000000
.........0000000
...........00000
............0000
.............00.` ],
  [ enemy2, bitmap`
...........1111.
.........111111.
.........11111..
.......1111111..
......1111111...
.....1111111....
....1111111.....
...0001111......
..0000000.......
..000000........
.000000.........
0000000.........
000000..........
00000...........
0000............
.00.............` ],
  [ wall, bitmap`
................
................
................
................
................
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.` ],
  [ rack, bitmap`
...0000..CCCCCCC
...0000000CCCCCC
..0000000001CCCC
..0000000011CCCC
....00000011CCCC
....CCC11111CCCC
0000CCCCCCCCCCCC
000000CCCC00CCCC
00000001C00000CC
00000001C000000C
.C000001C0000001
.CC00001CCC00001
.CCC1111CCCCC011
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC` ],
   [ word1, bitmap`
.000........000.
.000........000.
.000........000.
.000........000.
.000........000.
.0000......0000.
.00000....00000.
.000000..000000.
..000000000000..
...0000000000...
....00000000....
.....000000.....
......0000......
......0000......
......0000......
......0000......` ],
 [ word2, bitmap`
....000000......
..0000000000....
.00000000000000.
.00000000000000.
.0000....0000000
.000........0000
0000.........000
000..........000
000.........0000
000.........0000
000........0000.
0000.......0000.
.00000....00000.
.0000000.00000..
..000000000000..
....0000000.....` ],
 [ word3, bitmap`
..00........00..
.0000......0000.
.0000......0000.
.0000......0000.
.0000......0000.
.0000......0000.
.0000......0000.
.0000......0000.
.0000......0000.
.00000....00000.
.000000..000000.
..0000000000000.
..000000000000..
...00000000000..
....000000000...
.....0000000....` ],
 [ word4, bitmap`
...00...........
..0000..........
..0000..........
..0000..........
..0000..........
..0000..........
..0000..........
..0000..........
..0000..........
..0000..........
..0000..........
..00000.........
..000000000000..
..0000000000000.
..0000000000000.
...00000000000..` ],
 [ word5, bitmap`
..0000000000....
.0000000000000..
.0000000000000..
.000000.........
..000000........
..000000000.....
...0000000000...
....000000000...
.....000000000..
.......00000000.
.........000000.
..00....0000000.
.00000000000000.
.0000000000000..
..00000000000...
......00000.....` ],
   [ word6, bitmap`
...00000000000..
..0000000000000.
..0000000000000.
..000..000.0000.
..000.......00..
..000...........
..000..00.......
..00000000......
..00000000......
..00000000......
..000..00.......
..000...........
..000.....0000..
..0000000000000.
..0000000000000.
...00000000000..` ],
 [ face, bitmap`
..888888888888..
.88888888888888.
8222888822222888
2002888820022888
2002888820022888
2222888822228888
8888888888888888
8888080888888888
8888888880220888
802208880000088.
802000200000088.
800000000002088.
82200020200288..
.8202020200888..
..88882022888...
...888888888....` ],
 [ fries, bitmap`
LLL6LLLLLLLLLLLL
LLL6FL6L6LLLLLLL
LFL6FL6F6FLFLLLL
6F6LF66F6FLF6LLF
6F6LF6FF66LF66LF
FF66F6F6F66F66FF
FF66F6F6FF6F66FL
3333333333333333
3333333333333333
L333333333333333
L33333363633333L
LL333363636333LL
LL333363636333LL
LL333363636333LL
LL333333333333LL
LLL3333333333LLL` ],
[ floor, bitmap`
7777222277772222
7777222277772222
7777222277772222
7777222277772222
2222777722227777
2222777722227777
2222777722227777
2222777722227777
7777222277772222
7777222277772222
7777222277772222
7777222277772222
2222777722227777
2222777722227777
2222777722227777
2222777722227777` ],
  [ sink, bitmap`
................
................
......LLLLL.....
......LLLLL.....
..3333LL.LL5555.
...LL.LL....LL..
.11111111111111.
.1CCCCCC1CCCCC1.
.1CCCC0C1C0CCC1.
.1CCCC0C1C0CCC1.
.1CCCCCC1CCCCC1.
.1CCCCCC1CCCCC1.
.1CCCCCC1CCCCC1.
.1CCCCCC1CCCCC1.
.1CCCCCC1CCCCC1.
.11111111111111.` ],
  [ fridge, bitmap`
.111111L1111111.
.111111L1111111.
.111111L1111111.
.1111L1L1L11111.
.1111L1L1L11111.
.1111L1L1L11111.
.1111L1L1L11111.
.1111L1L1L11111.
.1111L1L1L11111.
.111111L1111111.
.LLLLLLLLLLLLLL.
.11111111111111.
.111LLLLLLL1111.
.11111111111111.
.11111111111111.
.11111111111111.` ],
[ wall2, bitmap`
...........H....
.........33.H6..
.........33H.6..
........858588..
.........8585...
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.
.CC..........CC.` ],


)






setBackground(floor,);
  

setSolids([ wall, player, sink, fridge,])

let level = 0
const levels = [
  map`
fgifffjffffffjhgff
ffffffhfffffffffff
hfffffjfffffffffff
hgugufffufujgugujf
ffffffffffffffffff
fffuguguhhhuhhgguj
fjuffffufffuffffff
fffffffffffffuffuu
ffffffffffffffffff
gugfffffpfffgfufhf
ffffufffffffffffhu
ffffffffffffffffff
ffjgffhfffffufffgf
fhfuffugfffuffffuf
ffffffffufffffhhff
uffuffffffufgfffff
ffugffffffffffffff
fffuhfufhhfffoffff`,
  map`
d`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

//! means not

onInput("s", () => {
  if (!running) return
  getFirst(player).y += 1
})


afterInput(() => {
  
})


onInput("w", () => {
   if (!running) return
  const p = getFirst(player);
  if (p) p.y -= 1;

  
  
});

onInput("d", () => {
   if (!running) return
  const p = getFirst(player);
  if (p) p.x += 1;
 
 
});

onInput("a", () => {
   if (!running) return
  const p = getFirst(player);
  if (p) p.x -= 1;

});

var enemytimer1 = setInterval(function () {
  const p = getFirst(player);
  const playerx = p.x
  const playery = p.y
  const o = getFirst(enemy);
  const enemyx = o.x
  const enemyy = o.y
if (playerx > enemyx){
o.x += 1
}

if (playerx < enemyx){
o.x -= 1
}

if (playery < enemyy){
o.y -= 1
}

  

if (playery > enemyy){
o.y += 1
}
  
if (tilesWith(enemy, player,).length == 1){

clearInterval(enemytimer1)
clearInterval(enemytimer2)
running = false
  
  clearText()
    addText("you", {y: 3, color: color`0` } )
    addText(" lose ", {y: 4, color: color`0` })

  setMap(levels[1])

}
}, 550);





var enemytimer2 = setInterval(function () {
  const p = getFirst(player);
  const playerx = p.x
  const playery = p.y
  const i = getFirst(enemy2);
  const enemy2x = i.x
  const enemy2y = i.y
if (playerx > enemy2x){
i.x += 1
}

if (playerx < enemy2x){
i.x -= 1
}

if (playery < enemy2y){
i.y -= 1
}

  

if (playery > enemy2y){
i.y += 1
}
  
if (tilesWith(enemy2, player,).length == 1){

clearInterval(enemytimer2)
clearInterval(enemytimer1)
running = false
  
  clearText()
    addText("you", {y: 3, color: color`0` } )
    addText(" lose ", {y: 4, color: color`0` }) 

setMap(levels[1])
  }
}, 550);








