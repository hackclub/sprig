/*
@title: Penny s Quest
@author: OHIO-MAN
@tags: []
@addedOn: 2024-04-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/
/*
Controls:
WASD to move
IJKL to attack

The Game:
Explore a randomly generated world where you have to use
your yoyo to fight penguins and eventually fight the
emperor at the end.

Every 3 levels you'll either get a shop where you can buy
items or a prize room that gives you a free item.

To buy an item at the shop, just step on it and it'll be
bought.
Here are the items, their prices, and their effect:

    Item    |    Effect    |    Price    
------------+--------------+-------------
    Appel   |  Heals by 1  |      2
   Borgor   |  Heals by 2  |      5
    Spool   |  Str Len +1  |      10
  Cool Yoyo |    ATK +1    |      15

There are also spikes that you have to dodge.
You also die when you run out of hearts.
Have fun!
*/

const melody = tune`
90.09009009009009,
90.09009009009009: B4^90.09009009009009,
90.09009009009009,
90.09009009009009: B4^90.09009009009009,
90.09009009009009: C5^90.09009009009009,
90.09009009009009,
90.09009009009009: C5^90.09009009009009,
90.09009009009009: B4^90.09009009009009,
90.09009009009009,
90.09009009009009: G4^90.09009009009009,
90.09009009009009,
90.09009009009009: B4^90.09009009009009,
90.09009009009009: C5^90.09009009009009,
90.09009009009009,
90.09009009009009: D5^90.09009009009009,
90.09009009009009: E5^90.09009009009009,
180.18018018018017,
90.09009009009009: D5^90.09009009009009,
90.09009009009009: B4^90.09009009009009,
90.09009009009009: A4^90.09009009009009,
90.09009009009009: D5^90.09009009009009,
90.09009009009009,
90.09009009009009: C5^90.09009009009009,
90.09009009009009,
90.09009009009009: C5^90.09009009009009,
90.09009009009009,
90.09009009009009: D5^90.09009009009009,
90.09009009009009: C5^90.09009009009009,
90.09009009009009: B4^90.09009009009009,
90.09009009009009,
90.09009009009009: B4^90.09009009009009`
const playback = playTune(melody, Infinity)

const p_head_r = "p"
const p_stand_r = "s"

const p_head_l = "P"
const p_stand_l = "S"

const penguin = "§"
const penguintop = "^"

const tpenhead = "®"
const tpenbody = "×"

const ground = "+"
const wall1 = "1"
const wall2 = "2"
const wall3 = "3"
const wall4 = "4"
const wall5 = "5"
const wall6 = "6"
const wall_top = "O"
const black_tile = "~"
const heart_tile = "♥"
const buy_tile = "$"
const exit = "X"
const money = "M"
const start = "△"
const start_bottom = "▴"

const str_vert = "|"
const str_horz = "-"
const yoyo = "๑"

const spike = "Â"
const spike_hole = "⁂"

const colltest = "!"
const colltest2 = "‼"
const colltest3 = "¡"
const colltest4 = "A"
const colltest5 = "a"

const appel = "‡"
const spool = "%"
const borgor = "÷"
const cool_yoyo = "⁜"

const emperor1 = "ž";
const emperor2 = "ſ";
const emperor3 = "ƀ";
const emperor4 = "Ɓ";
const EMP = 500
let ehp = 12

let lose = false

setLegend(
  [p_head_r, bitmap`
................
5F....5F........
56F...5F........
5666.55FF.......
5666655FF.......
5666665FFF......
5F666666FFF.....
556666666FFF....
5566666666FFFF..
256266666666FFF6
2252266666666661
2211226666666622
.122129LL99LL222
222212L259952L22
2212192279972121
.2212999C999992.`],
  [p_head_l, bitmap`
................
........F5....F5
........F5...F65
.......FF55.6665
.......FF5566665
......FFF5666665
.....FFF666666F5
....FFF666666655
..FFFF6666666655
6FFF666666662652
1666666666622522
2266666666221122
222LL99LL921221.
22L259952L212222
1212799722912122
.299999C9992122.`],
  [tpenhead, bitmap`
.......4D.......
......D4DD......
......4DDD......
......44DD......
...F66.DD.66F...
...666F4DF666...
...66664D6666...
...6666666666...
...F67766776F...
....57777775....
....77277277....
....72022027....
....7229C227....
....7799CC77....
....57722775....
.....777777.....`],
  [wall_top, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [emperor1, bitmap`
...........66666
..........66FFF3
.........66F6CCC
.........446644C
........4446D444
.......444464444
.......D44464444
.......8D4434444
.......8HHD34444
......5H0288HH88
......58288820H8
......5H5585528H
......55558555H5
......1558755822
......5557755522
......5517715512`],
  [emperor2, bitmap`
6666666FF.......
3333C66FF.......
33333C66FF......
CC333366FF......
4CC333C66FF.....
44CC33366FF.....
44CC333C66FF....
4DCC333366FF....
D55CC333C66FF...
555CC333366FF...
555CCC333666F...
55CCCC333C66F...
5221CC333366F...
2222CCC33366F...
2221DCC33366F...
2214DDCC3366F...`],
  [emperor3, bitmap`
......5527725552
......552222555D
......55222D1554
......15D2444444
.....44441444444
....8HD4222222D4
....H82271177122
......7772277777
......1772277777
....C337712777C3
....333775C77533
....333777C77733
....C33177C17723
...FFFFF72FF722F
....FFFF22FF222F
.....FF222FF22FF`],
  [emperor4, bitmap`
1444DDCC3366F...
4444DDCC3366F...
4444DDCC3C66F...
444DDDCC3666F...
444DDCC3C666F...
48HDDCC36666F...
2H8FFC3C6666F...
666FFFFFFFFFF...
66FFFFFFFFFFF...
66FFFFFFFFF.....
66FFF666FFFF....
66FFF66666FFF...
66FFFF66666FF...
F66FFF666666F...
FF66FFFFFFFFF...
FF66FFFFFFFFF...`],
  [tpenbody, bitmap`
.....122221.....
....57777775....
...5777777775...
...77712217755..
..7777222277755.
.775772222777555
7775712222177755
7757722222277755
7.777222222777.5
..777222222777..
..777122221777..
...7777777777...
....77777777....
......CC.CC.....
......99.99.....
...9999C.C9999..`],
  [p_stand_l, bitmap`
11C99CC999C32211
11C3355551333311
11C3555555333311
115F66666FF51311
3556666666F55311
335F66666F353311
3333333311333311
399F666665993311
1996666666993C11
166666666665L11L
L6665116666F111.
.L55F1.F555111L.
...9.....9......
..333...333.....
...3.....3......
.555....555.....`],
  [p_stand_r, bitmap`
11223C999CC99C11
1133331555533C11
1133335555553C11
11315FF66666F511
11355F6666666553
113353F66666F533
1133331133333333
113399566666F993
11C3996666666991
L11L566666666661
.111F6666115666L
.L111555F.1F55L.
......9.....9...
.....333...333..
......3.....3...
.....555....555.`],
  [money, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000600000000
0000666666600000
0006000600000000
0006000600000000
0006000600000000
0000666666600000
0000000600060000
0000000600060000
0000000600060000
0000666666600000
0000000600000000
0000000000000000
0000000000000000`],
  [black_tile, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [heart_tile, bitmap`
0000000000000000
0003330000333000
0033333003333300
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
0003333333333000
0000333333330000
0000033333300000
0000003333000000
0000000330000000
0000000000000000
0000000000000000`],
  [buy_tile, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCFFFFFFFFFFFFCC
CCFFFFF6FFFFFFCC
CCFFF666666FFFCC
CCFF6FF6FFFFFFCC
CCFF6FF6FFFFFFCC
CCFFF666FFFFFFCC
CCFFFFF666FFFFCC
CCFFFFF6FF6FFFCC
CCFFFFF6FF6FFFCC
CCFF666666FFFFCC
CCFFFFF6FFFFFFCC
CCFFFFFFFFFFFFCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [yoyo, bitmap`
....LLLLLLLL....
...L11111111L...
..L1111111111L..
.L111LLLLLL111L.
L111LC3333CL111L
L11LC333333CL11L
L11L33333333L11L
L11L333L1333L11L
L11L3331L333L11L
L11L33333333L11L
L11LC333333CL11L
L111LC3333CL111L
.L111LLLLLL111L.
..L1111111111L..
...L11111111L...
....LLLLLLLL....`],
  [str_horz, bitmap`
................
................
................
................
................
................
1111111111111111
2222222222222222
2222222222222222
1111111111111111
................
................
................
................
................
................`],
  [str_vert, bitmap`
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......
......1221......`],
  [penguin, bitmap`
....6F4DDF6F....
...6664DD66F....
...6264DD66F....
..F2666D666FF...
..66F76F67FFF...
..6F7776777FF...
..F772212277F...
..57202220275...
.7772299922755..
.7777777777755..
777712222217555.
775722222227555.
7..7222222275.5.
7...1222221...5.
....C9...9C.....
..9999...9999...`],
  [spike, bitmap`
................
..2....2....2...
..22...22...22..
..22...22...22..
................
................
..2....2....2...
..22...22...22..
..22...22...22..
................
................
..2....2....2...
..22...22...22..
..22...22...22..
................
................`],
  [spike_hole, bitmap`
................
................
..00...00...00..
.0000.0000.0000.
..00...00...00..
................
................
..00...00...00..
.0000.0000.0000.
..00...00...00..
................
................
..00...00...00..
.0000.0000.0000.
..00...00...00..
................`],
  [wall1, bitmap`
LLLLLLLLLLLLLLLL
7L7L7L7L7L7L7L7L
7777777777777777
7757777777777777
7777722222277577
7777225555227777
7777255555527777
7777255555527777
7777255555527777
7777255555527777
7777255555527777
7777255555527777
777LLLLLLLLLL777
7777LLLLLLLL7777
7577777777777777
7777777777777777`],
  [wall2, bitmap`
LLLLLLLLLLLLLLLL
7L7L7L7L7L7L7L7L
7777777777777777
7777777777777777
7777777777777777
7757777777757777
7777777777777777
7777777777777777
7777777777777777
7777775777777777
7777777777777777
7777777777775777
7777777777777777
7777777777777777
7757777777777777
7777777777777777`],
  [wall3, bitmap`
LLLLLLLLLLLLLLLL
8L8L8L8L8L8L8L8L
8888888888888888
8888888888888888
8888822222288H88
8888225555228888
8888255555528888
8H88255555528888
8888255555528888
8888255555528888
88882555555288H8
8888255555528888
888LLLLLLLLLL888
8888LLLLLLLL8888
8888888888888888
8888888888888888`],
  [wall4, bitmap`
LLLLLLLLLLLLLLLL
8L8L8L8L8L8L8L8L
8888888888888888
8H88888888888888
8888888888H88888
8888888888888888
888888H888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888H88
8888888888888888
8888888888888888
888H888888H88888
8888888888888888
8888888888888888`],
  [wall5, bitmap`
LLLLLLLLLLLLLLLL
6L6L6L6L6L6L6L6L
6666666666666666
66F666666666F666
6666622222266666
6666225555226666
6666255555526666
6666255555526666
66662555555266F6
6666255555526666
6666255555526666
6666255555526666
666LLLLLLLLLL666
6666LLLLLLLL6666
66F6666666666666
6666666666666666`],
  [wall6, bitmap`
LLLLLLLLLLLLLLLL
6L6L6L6L6L6L6L6L
6666666666666666
6666F6666666F666
6666666666666666
6666666666666666
6666666666666666
66F6666666666666
66666666F6666666
6666666666666666
6666666666666F66
6666666666666666
6666F66666666666
6666666666F66666
6666666666666666
6666666666666666`],
  [exit, bitmap`
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
1111111111111111`],
  [start, bitmap`
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
1111111111111111`],
  [start_bottom, bitmap`
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
1111111111111111`],
  [appel, bitmap`
................
................
........C.......
......4.C.......
.......C........
.....333C33.....
....33333333....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33....33....
................
................`],
  [spool, bitmap`
................
................
...CCCCCCCCCC...
...CFFFFFFFFC...
...CCCCCCCCCC...
....HHHHHHHH....
....88888888....
....HHHHHHHH....
....88888888....
....HHHHHHHH....
....88888888....
....HHHHHHHH....
...C88888888C...
...CCCCCCCCCC...
................
................`],
  [borgor, bitmap`
................
................
................
....99999999....
...9999999999...
..999999999999..
...FCCCCCFCCC...
...CCFCCCCCCF...
...44444444444..
...66644DD4DD...
...3666666666...
...3333333333...
..999999999999..
..999999999999..
................
................`],
  [cool_yoyo, bitmap`
...0000000000...
..011111111110..
.01333333333310.
.01333333333310.
.01333333333310.
.0L1111111111L0.
..0LLLLLLLLLL0..
...0666666660...
..016666666610..
.01366666666310.
.01366666666310.
.01333333333310.
.0L1111111111L0.
..0LLLLLLLLLL0..
...0000000000...
................`],
  [ground, bitmap`
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
1111111111111111`],
  [colltest, bitmap`
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
................
................
................
................
................
................`],
  [colltest2, bitmap`
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
................
................
................
................
................
................`],
  [colltest3, bitmap`
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
................
................
................
................
................
................`],
  [colltest4, bitmap`
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
................
................
................
................
................
................`],
  [colltest5, bitmap`
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
................
................
................
................
................
................`],
)

let framesR = [p_head_r, p_stand_r]
let framesL = [p_head_l, p_stand_l]

let prev_dir = framesR
let direction = framesR
let move_vert = false

const MOVESPEED = 100
let actcooldown = false

const PENSPEED = 200
let penguins = []
let pen_dir = []
let pen_hp = []

const TPENSPEED = 750
let tpen = 0
let tdir = 0
let thp = 4
let dead = false

const SPIKESPEED = 1000
let spikes = []
let spike_switch = true

const BUYING = 100

let str_length = 1
let atk_pos = []
let yoyo_pos = []
let yoyo_col = false
let atk_dir = str_horz
const ATKSPEED = 500
let atkcooldown = false

const FIRESPEED = 1000
let firecooldown = false

const DMG = 250
const pDMG = 500

let health = 3
let coins = 0
let damage = 1

let items = [appel, appel, appel, appel, borgor, borgor, borgor, cool_yoyo, spool, spool]
let item_chosen = 0
let sh_items = []
let prize_item = 0

const areas = [
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O124365621212344O
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++6
O+++++++++++++++X
O+++++++++++++++X
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O5665OOOOOOO4344O
O++++OOOOOOO+§++O
O++++OOOOOOO++++O
3++++4344221++++2
△+++++++®+++++++X
▴+++++++++++++++X
O++++OOOOOOO++++O
O++++OOOOOOO++++O
O++§+OOOOOOO++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O566124346651243O
O+++++++++++++++O
O+++++++++++++++O
3++++++++®++++++2
△+++++++++++++++X
▴+++++++++++++++X
O++OOOOOOOOOOO++O
O++34656621344++O
O++++++++§++++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
1222564434OOOOOOO
△+++++++++2OOOOOO
▴++++++++++6OOOOO
OO+++++++®++3OOOO
OOO++++++++++1OOO
OOOO++++++++++2OO
OOOOO⁂⁂⁂⁂⁂⁂⁂⁂⁂⁂66
OOOOOO++++++++++X
OOOOOOO+++++++++X
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
4434656212234665O
△+++++++++++++++O
▴+++++++++++++++O
O+++++++++++++++O
O+++++§+++++++++O
O++++++++++§++++O
O+++++++++++++++1
O+++++++++++++++X
O+++++++++++++++X
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
4434656212234665O
△+++++++++++++++O
▴+++++++++++++++O
O+++++++++++++++O
O+++§++OOOO++§++O
O⁂⁂⁂⁂⁂⁂3465⁂⁂⁂⁂⁂O
O+++++++++++++++1
O+++++++++++++++X
O+++++++++++++++X
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
443OO562122OO6656
△++OO+++§++OO+++X
▴++OO++++++OO+++X
O++OO++OO++OO+++O
O⁂⁂OO⁂⁂OO⁂⁂OO⁂⁂⁂O
O++OO++OO++OO+++O
O++12++OO++43+++O
O++++++OO+++++++O
O++§+++OO++++§++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O431265664341256O
O+++++++++++++++O
O+++++++++++++++O
6+++++++++++++++4
△+++++++++++++++X
++++++++++++++++X
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O124365621212344O
O+++++++++++++++O
O+++++++++++++++O
2+++++++++++++++6
△+++++$+$+$+++++X
++++++++++++++++X
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O124365621212344O
O+++++++§+++++++O
O+++++++§+++++++O
4+++++++++++++++6
△+++++++®+++++žſX
▴+++++++×+++++ƀƁX
O+++++++§+++++++O
O+++++++§+++++++O
O+++++++§+++++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O124365621212344O
O+++++++++++++++O
O+++++++++++++++O
4+++++++++++++++O
△+++++++++++++++O
▴+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
OOOOOOOOOOOOOOOOO`,
  map`
♥~M~~~~~~~~~~~~~~
OOOOOOOOOOOOOOOOO
O124365621212344O
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
O△++++++++++++++O
O▴++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
O+++++++++++++++O
OOOOOOOOOOOOOOOOO`,
]

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let level = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
shuffle(level)
level.splice(3, 0, 8)
level.splice(7, 0, 7)
level.splice(11, 0, 8)
level.push(9)
level.push(10)
let area = -1

setSolids([p_head_r, p_head_l, wall_top, black_tile, heart_tile])

setBackground(ground)
setMap(areas[0])
addSprite(6, 6, direction[0])
addSprite(getFirst(direction[0]).x, getFirst(direction[0]).y + 1, direction[1])
addText(`${health}`, options = { x: 1, y: 1, color: color`2` })
addText(`${coins}`, options = { x: 4, y: 1, color: color`2` })

onInput("w", () => {
  if (!(actcooldown) && !(lose)) {
    getFirst(direction[0]).y -= 1
    move_vert = true
  }
})
onInput("a", () => {
  if (!(actcooldown) && !(lose)) {
    getFirst(direction[0]).x -= 1
    addSprite(getFirst(direction[0]).x, getFirst(direction[0]).y, framesL[0])
    getFirst(direction[0]).remove()
    prev_dir = direction
    direction = framesL
  }
})
onInput("s", () => {
  if (!(actcooldown) && !(lose)) {
    getFirst(direction[0]).y += 1
    move_vert = true
  }
})
onInput("d", () => {
  if (!(actcooldown) && !(lose)) {
    getFirst(direction[0]).x += 1
    addSprite(getFirst(direction[0]).x, getFirst(direction[0]).y, framesR[0])
    getFirst(direction[0]).remove()
    prev_dir = direction
    direction = framesR
  }
})

onInput("l", () => {
  if (!(firecooldown) && getAll(direction[1]).length !== 0 && getFirst(direction[0]).x !== width() - 1 && !(lose)) {
    atkcooldown = true
    yoyo_col = false
    atk_dir = str_horz
    for (let i = 0; i <= str_length; i++) {
      addSprite(getFirst(direction[1]).x + i + 1, getFirst(direction[1]).y, yoyo)
      if (tilesWith(yoyo, wall_top).length === 0 && tilesWith(yoyo, exit).length === 0) {
        getFirst(yoyo).remove()
        atk_pos.push([getFirst(direction[1]).x + i + 1, getFirst(direction[1]).y])
      } else {
        getFirst(yoyo).remove()
        yoyo_col = true
        atk_pos.pop()
        yoyo_pos = [getFirst(direction[1]).x + i, getFirst(direction[1]).y]
        break
      }
    }
    if (!(yoyo_col)) {
      yoyo_pos = atk_pos.pop()
    }
  }
})

onInput("j", () => {
  if (!(firecooldown) && getAll(direction[1]).length !== 0 && getFirst(direction[0]).x !== 0 && !(lose)) {
    atkcooldown = true
    yoyo_col = false
    atk_dir = str_horz
    for (let i = 0; i <= str_length; i++) {
      addSprite(getFirst(direction[1]).x - i - 1, getFirst(direction[1]).y, yoyo)
      if (tilesWith(yoyo, wall_top).length === 0 && tilesWith(yoyo, start_bottom).length === 0) {
        getFirst(yoyo).remove()
        atk_pos.push([getFirst(direction[1]).x - i - 1, getFirst(direction[1]).y])
      } else {
        getFirst(yoyo).remove()
        yoyo_col = true
        atk_pos.pop()
        yoyo_pos = [getFirst(direction[1]).x - i, getFirst(direction[1]).y]
        break
      }
    }
    if (!(yoyo_col)) {
      yoyo_pos = atk_pos.pop()
    }
  }
})

onInput("i", () => {
  if (!(firecooldown) && getAll(direction[1]).length !== 0 && !(lose)) {
    atkcooldown = true
    yoyo_col = false
    atk_dir = str_vert
    for (let i = 0; i <= str_length; i++) {
      addSprite(getFirst(direction[1]).x, getFirst(direction[1]).y - i - 1, yoyo)
      if (tilesWith(yoyo, wall_top).length === 0) {
        getFirst(yoyo).remove()
        atk_pos.push([getFirst(direction[1]).x, getFirst(direction[1]).y - i - 1])
      } else {
        getFirst(yoyo).remove()
        yoyo_col = true
        atk_pos.pop()
        yoyo_pos = [getFirst(direction[1]).x, getFirst(direction[1]).y - i]
        break
      }
    }
    if (!(yoyo_col)) {
      yoyo_pos = atk_pos.pop()
    }
  }
})

onInput("k", () => {
  if (!(firecooldown) && getAll(direction[1]).length !== 0 && !(lose)) {
    atkcooldown = true
    yoyo_col = false
    atk_dir = str_vert
    for (let i = 0; i <= str_length; i++) {
      addSprite(getFirst(direction[1]).x, getFirst(direction[1]).y + i + 1, yoyo)
      if (tilesWith(yoyo, wall_top).length === 0) {
        getFirst(yoyo).remove()
        atk_pos.push([getFirst(direction[1]).x, getFirst(direction[1]).y + i + 1])
      } else {
        getFirst(yoyo).remove()
        yoyo_col = true
        atk_pos.pop()
        yoyo_pos = [getFirst(direction[1]).x, getFirst(direction[1]).y + i]
        break
      }
    }
    if (!(yoyo_col)) {
      yoyo_pos = atk_pos.pop()
    }
  }
})

afterInput(() => {
  if (!(lose)) {
    if (getAll(direction[1]).length > 0) {
      getFirst(direction[1]).remove()
    }
    try {
      if (direction !== prev_dir && !(move_vert)) {
        getFirst(prev_dir[1]).remove()
      }
    } catch (err) {}
    addSprite(getFirst(direction[0]).x, getFirst(direction[0]).y + 1, direction[1])
    while (true) {
      if (level[area] === 9 && ehp > 0) {
        break
      }
      if (getAll(penguin).length <= 0 && getAll(tpenhead).length <= 0 && (tilesWith(exit, p_head_r).length > 0 || tilesWith(exit, p_stand_r).length > 0)) {
        area++;
        getFirst(direction[0]).remove()
        getFirst(direction[1]).remove()
        setMap(areas[level[area]])
        addSprite(getFirst(start).x, getFirst(start).y, direction[0])
        addSprite(getFirst(direction[0]).x, getFirst(direction[0]).y + 1, direction[1])
        penguins = getAll(penguin)
        pen_dir = []
        tpen = 0
        spike_switch = true
        pen_hp = []
        sh_items = []
        thp = 4
        prize_items = 0
        dead = false
        if (level[area] === 10) {
          addText("You Win!", options = { x: 7, y: 6, color: color`0` })
        }
        for (let i = 0; i < penguins.length; i++) {
          pen_dir.push(true)
          pen_hp.push(1)
        }
        if (level[area] === 8) {
          for (let i = 0; i < 3; i++) {
            item_chosen = randint(0, items.length - 1)
            addSprite(6 + (i * 2), 5, items[item_chosen])
            sh_items.push(getAll(items[item_chosen])[getAll(items[item_chosen]).length - 1])
            items.splice(item_chosen, 1)
          }
        } else if (level[area] === 7) {
          item_chosen = randint(0, items.length - 1)
          addSprite(8, 6, items[item_chosen])
          prize_items = getAll(items[item_chosen])[getAll(items[item_chosen]).length - 1]
          items.splice(item_chosen, 1)
        }
      }
      break
    }
    if (atkcooldown) {
      for (let i = 0; i < atk_pos.length; i++) {
        addSprite(atk_pos[i][0], atk_pos[i][1], atk_dir)
      }
      addSprite(yoyo_pos[0], yoyo_pos[1], yoyo)
    }
    move_vert = false
    actcooldown = true
    firecooldown = true
    atk_pos = []
  }
})

const movetick = setInterval(() => {
  addText(`${health}`, options = { x: 1, y: 1, color: color`2` })
  addText(`${coins}`, options = { x: 4, y: 1, color: color`2` })
  if (actcooldown) {
    actcooldown = false
  }
}, MOVESPEED)

const firetick = setInterval(() => {
  if (firecooldown) {
    firecooldown = false
  }
}, FIRESPEED)

const penguintick = setInterval(() => {
  penguins = getAll(penguin)
  for (let i = 0; i < penguins.length; i++) {
    pen_dir.push(true)
  }
  if (penguins.length > 0) {
    for (let i = 0; i < penguins.length; i++) {
      if (pen_hp[i] <= 0) {
        pen_hp.splice(i, 1)
        penguins[i].remove()
        coins += 1
      }
      addSprite(penguins[i].x + 1, penguins[i].y, colltest)
      if (tilesWith(colltest, wall_top).length === 0) {
        pen_dir[i] = !(pen_dir[i])
      }
      getFirst(colltest).remove()
      addSprite(penguins[i].x - 1, penguins[i].y, colltest)
      if (tilesWith(colltest, wall_top).length === 0) {
        pen_dir[i] = !(pen_dir[i])
      }
      getFirst(colltest).remove()
      if (pen_dir[i]) {
        penguins[i].x++;
      } else {
        penguins[i].x--;
      }
    }
  }
}, PENSPEED)

const tpenguintick = setInterval(() => {
  tpen = getAll(tpenhead)
  let possible_directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
  if (tpen.length > 0 && thp > 0) {
    tpen = getFirst(tpenhead)
    let go_dir = randint(0, 3)
    addSprite(tpen.x + possible_directions[go_dir][0], tpen.y + possible_directions[go_dir][1], colltest2)
    if (!(tilesWith(colltest2, wall_top).length > 0)) {
      tpen.x += possible_directions[go_dir][0]
      tpen.y += possible_directions[go_dir][1]
    }
    getFirst(colltest2).remove()
    try {
      getFirst(tpenbody).remove()
    } catch (err) {}
    addSprite(tpen.x, tpen.y + 1, tpenbody)
  }
  if (thp <= 0 && !(dead)) {
    getFirst(tpenhead).remove()
    getFirst(tpenbody).remove()
    coins += 2
    dead = true
  }
}, TPENSPEED)

const spiketick = setInterval(() => {
  if (spike_switch) {
    spikes = getAll(spike_hole)
    if (spikes.length > 0) {
      for (let i = 0; i < spikes.length; i++) {
        addSprite(spikes[i].x, spikes[i].y, spike)
      }
      spike_switch = !(spike_switch)
    }
  } else {
    spikes = getAll(spike)
    if (spikes.length > 0) {
      for (let i = 0; i < spikes.length; i++) {
        spikes[i].remove()
      }
      spike_switch = !(spike_switch)
    }
  }
}, SPIKESPEED)

const dmgtick = setInterval(() => {
  tpen = getAll(tpenhead)
  penguins = getAll(penguin)
  if (tpen.length > 0) {
    if (tilesWith(tpenbody, yoyo).length > 0 || tilesWith(tpenbody, atk_dir).length > 0 || tilesWith(tpenhead, yoyo).length > 0 || tilesWith(tpenhead, atk_dir).length > 0) {
      thp -= damage;
    }
  }
  if (penguins.length > 0) {
    for (let i = 0; i < penguins.length; i++) {
      addSprite(penguins[i].x, penguins[i].y, colltest3)
      if (tilesWith(colltest3, yoyo).length > 0 || tilesWith(colltest3, atk_dir).length > 0) {
        pen_hp[i] -= damage;
      }
      getFirst(colltest3).remove()
    }
  }
}, DMG)

const playerdmgtick = setInterval(() => {
  tpen = getAll(tpenhead)
  penguins = getAll(penguin)
  if (tpen.length > 0) {
    if (tilesWith(tpenbody, p_stand_r).length > 0 || tilesWith(tpenbody, p_stand_l).length > 0) {
      health--;
    }
  }
  if (penguins.length > 0) {
    for (let i = 0; i < penguins.length; i++) {
      addSprite(penguins[i].x, penguins[i].y, colltest3)
      if (tilesWith(colltest3, p_stand_r).length > 0 || tilesWith(colltest3, p_stand_l).length > 0) {
        health--;
        break;
      }
      getFirst(colltest3).remove()
    }
  }
}, pDMG)

const emporerdmgtick = setInterval(() => {
  if (level[area] === 9 && ehp > 0) {
    if (tilesWith(emperor1, yoyo).length > 0 || tilesWith(emperor1, atk_dir).length > 0 || tilesWith(emperor2, yoyo).length > 0 || tilesWith(emperor2, atk_dir).length > 0 || tilesWith(emperor3, yoyo).length > 0 || tilesWith(emperor3, atk_dir).length > 0 || tilesWith(emperor4, yoyo).length > 0 || tilesWith(emperor4, atk_dir).length > 0) {
      ehp -= damage;
    }
    if (ehp <= 0) {
      getFirst(emperor1).remove()
      getFirst(emperor2).remove()
      getFirst(emperor3).remove()
      getFirst(emperor4).remove()
    }
  }
}, EMP)

const playerspikedmgtick = setInterval(() => {
  spikeds = getAll(spike)
  if (spikeds.length > 0) {
    for (let i = 0; i < spikeds.length; i++) {
      addSprite(spikeds[i].x, spikeds[i].y, colltest4)
      if (tilesWith(colltest4, p_stand_r).length > 0 || tilesWith(colltest4, p_stand_l).length > 0) {
        health--;
        break;
      }
      getFirst(colltest4).remove()
    }
  }
}, SPIKESPEED)

const buyingtick = setInterval(() => {
  if (level[area] === 8) {
    for (let i = 0; i < sh_items.length; i++) {
      addSprite(sh_items[i].x, sh_items[i].y, colltest5)
      if (tilesWith(colltest5, p_stand_r).length > 0 || tilesWith(colltest5, p_stand_l).length > 0) {
        switch (sh_items[i].type) {
          case appel:
            if (coins >= 2) {
              health++;
              coins -= 2
              sh_items[i].remove()
              sh_items.splice(i, 1)
            }
            break;
          case borgor:
            if (coins >= 5) {
              health += 2
              coins -= 5
              sh_items[i].remove()
              sh_items.splice(i, 1)
            }
            break;
          case spool:
            if (coins >= 10) {
              str_length += 1
              coins -= 10
              sh_items[i].remove()
              sh_items.splice(i, 1)
            }
            break;
          case cool_yoyo:
            if (coins >= 15) {
              damage += 1
              coins -= 15
              sh_items[i].remove()
              sh_items.splice(i, 1)
            }
            break;
        }
      }
      getFirst(colltest5).remove()
    }
  }
}, BUYING)

const prizetick = setInterval(() => {
  if (level[area] === 7 && prize_items !== 0) {
    addSprite(prize_items.x, prize_items.y, colltest5)
    if (tilesWith(colltest5, p_stand_r).length > 0 || tilesWith(colltest5, p_stand_l).length > 0) {
      switch (prize_items.type) {
        case appel:
          health++;
          break;
        case borgor:
          health += 2
          break;
        case spool:
          str_length += 1
          break;
        case cool_yoyo:
          damage += 1
          break;
      }
      prize_items.remove()
      prize_items = 0
    }
    getFirst(colltest5).remove()
  }
}, BUYING)

const atktick = setInterval(() => {
  if (atkcooldown) {
    atkcooldown = false
    yoyos = getAll(yoyo)
    for (let i = 0; i < yoyos.length; i++) {
      yoyos[i].remove()
    }
    strings = getAll(atk_dir)
    for (let i = 0; i < strings.length; i++) {
      strings[i].remove()
    }
  }
  if (health <= 0) {
    lose = true
    setMap(areas[11])
    addText("You Lose", options = { x: 7, y: 6, color: color`0` })
  }
}, ATKSPEED)
