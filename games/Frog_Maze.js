/*


@title: Frog Mazes
@author: Jeremiah Kellison
@tags: ['maze','puzzle']
@img: ""
@addedOn: 2024-01-30
*/
/*
The goal of the game is to navigate your frog player character to get the lilypad at the end of the level.

Controls:
WASD to move

*/

const player = "p"

const pad = "a"
const pad2 = "f"
const pad3 = "v"
const pad4 = "c"
const pad5 = "j"
const pad6 = "k"
const pad7 = "l"

const wall = "w"
const l1 = "1"
const l2 = "2"
const l3 = "3"
const l4 = "4"
const l5 = "5"
const l6 = "6"
const win = "n"
const move =tune`
37.5: B4-37.5,
37.5: D5-37.5,
37.5: G4-37.5,
1087.5`
const green = "g"
const help = "h"
const help2 = "b"
const help3 = "o"
const win2 = tune`
147.05882352941177: B4~147.05882352941177,
147.05882352941177: G4~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: G5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: G5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: F5~147.05882352941177,
147.05882352941177: A4~147.05882352941177`


setLegend(
  [ player, bitmap`
................
................
................
....0DDDDDD0....
...DDDDDDDDDD...
...DDDDDDDDDD...
...DDDDDDDDDD...
...DDDDDDDDDD...
....DDDDDDDD....
.......DD.......
...DDDDDDDDDD...
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..4DDDDDDDDDD4..
..44DDDDDDDD44..
................` ],
  [ pad, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ pad2, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ pad3, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ pad4, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ pad5, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ pad6, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ pad7, bitmap`
................
...444....444...
..44444..44444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
................`],
  [ wall, bitmap`
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
  [ green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ l1, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD2222DDDDDDD
DDDDD2222DDDDDDD
DDDDDDD22DDDDDDD
DDDDDDD22DDDDDDD
DDDDDDD22DDDDDDD
DDDDDDD22DDDDDDD
DDDDDDD22DDDDDDD
DDDDDDD22DDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ l2, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDD22DDDDDDDDD
DDDDD22DDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ l3, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ l4, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD22DD22DDDDD
DDDDD22DD22DDDDD
DDDDD22DD22DDDDD
DDDDD22DD22DDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ l5, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDD22DDDDDDDDD
DDDDD22DDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDD22DDDDD
DDDDDDDDD22DDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ l6, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDD22DDDDDDDDD
DDDDD22DDDDDDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDD22DD22DDDDD
DDDDD22DD22DDDDD
DDDDD222222DDDDD
DDDDD222222DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ help, bitmap`
...6666666666...
..666666666666..
.66666666666666.
6666660000666666
666660LLLL066666
66660L6666L06666
6666666666L06666
666666666L066666
66666666L0666666
6666666666666666
66666666L0666666
6666666606666666
6666666666666666
.66666666666666.
..666666666666..
...6666666666...` ],
  [ help2, bitmap`
...6666666666...
..666666666666..
.66666666666666.
6666660000666666
666660LLLL066666
66660L6666L06666
6666666666L06666
666666666L066666
66666666L0666666
6666666666666666
66666666L0666666
6666666606666666
6666666666666666
.66666666666666.
..666666666666..
...6666666666...` ],
  [ help3, bitmap`
................
...DDD....DDD...
..DDDDD..DDDDD..
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDD..
...DDDDDDDDDD...
................`]
  
  
)

setSolids([player,wall,green])

let level = 0
const levels = [
  
  map`
h.......................o
.ggggg.gggg...ggg...ggg..
.g.....g...g.g...g.g...g.
.g.....g...g.g...g.g.....
.gggg..gggg..g...g.g.....
.g.....g...g.g...g.g..gg.
.g.....g...g.g...g.g...g.
.g.....g...g..ggg...ggg..
.........................
.g...g..gggg.ggggg.ggggg.
.gg.gg.g...g.....g.g.....
.g.g.g.g...g....g..g.....
.g...g.ggggg...g...gggg..
.g...g.g...g..g....g.....
.g...g.g...g.g.....g.....
.g...g.g...g.ggggg.ggggg.
.........................
.........................
............p............
.........................
.........................
............a............
.........................
.........................
.........................`,
  map`
wwwwwwwwwwwwwwwwwwwww
wp......w.........w.w
w.w.w.www.w.wwwww.w.w
w.w.w.w...w.w.......w
www.w.w...w.w.wwwwwww
w...w.w.www.w...w...w
w.wwwww.w.w.wwwww.w.w
w.w.....w.w.......w.w
w.w.wwwww.wwwwwwwww.w
w.w...w...........w.w
w.www.w.wwwwwwwww.w.w
w...w.w.....w...w.w.w
www.w.w.www.w.w.w.w.w
w...w.w.w.w.w.w.w.w.w
w.w.w.w.w.w.www.w.www
w.w.w.w...w.w...w.w.w
w.www.w.www.w.www.w.w
w...w.w.w...w...w.w.w
w.w.w.www.www.w.w.w.w
w.w.......w...w....fw
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp......w...w.w...w...........w
w.w.www.w.w.w.w.w.w.www.wwwww.w
w.w.w.w.w.w.w...w.w...w...w.w.w
www.w.w.w.w.wwwww.w.wwwww.w...w
w...w.....w.w...w...w.....w.www
w.w.wwwwwww.w.w.www.w.wwwww...w
w.w.w.....w...w...w.w.w...www.w
w.www.www.wwwwwww.www.w...w...w
w.....w.w.w...w...w...w.w.w.www
wwwwwww.w.w.w.w.www.www.www...w
w.......w.w.w...w...w.........w
wwwwwww.w.w.wwwww.www.wwwwwwwww
w.......w.w.w.....w.......w...w
w.wwwww.w.w.www...w.wwwwwww.w.w
w...w...w.w.....www...w.....w.w
w.w.www.w.wwwww.w.wwwww.wwwww.w
w.w...w.w.....w.w..w..w.w...w.w
w.www.w.wwwww.w.ww.w..w.w.w.w.w
w...w.w...w...............w.w.w
wwwww.www.w.wwwww.w..wwwwww.w.w
w.....w...w.....w.w.......w.w.w
w.w.www.wwwwwww.wwwwwww..ww.w.w
w.w.w...w.....w.......w.....w.w
w.wwwwwww.wwwwwwwwwww.wwwwwww.w
w...w.........w...w...w.......w
w.w.w.www.www.w.w.w.www.www...w
w.w...w...w.w...w...w...w.w.www
w.wwwww...w.wwwwwwwwwww.w.w.w.w
w.....w.................w....vw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp....w.......w...w...w...w.............w
w.w.www.w.wwwww.w.w.w.www.w.wwwwwwwww.w.w
w.w...w.w.w...w.w.w.w...w...w.....w.w.w.w
w.www.w.w.w.w.w.w.w.www.w.wwwww.w.w.w.www
w...w...w.w.w...w.w.w.w.w.......w...w...w
www.wwwww.w.wwwww.w.w.w.wwwwwwwwwwwww.w.w
w.w.w...w...w.w...w.w.w.......w...w.w.w.w
w.w.w.w.wwwww.w.w.w.w.wwwwwww.w.www.www.w
w.w.w.w.......w.w.w.w.....w.w.w...w.w...w
w.w.www.www.w.w.www.w.www.w.w.www.w.w.www
w.w...w.w...w.w.....w...w...w.w...w.w...w
w.www.www.www.wwwwwwwww.w.www.w.www.w.w.w
w...w.w...w.............w.w...w...w.w.w.w
w.www.w.wwwwwwwwwwwwwwwww.w.wwwww.w.w.w.w
w...w.w.w...w...w...w.....w.w.....w.w.w.w
w.w.w.w.w.w.w.w.w.w.w.wwwww.w.wwwww.www.w
w.w...w...w.w.w...w...w...w.w...w...w...w
w.wwwwwwwww.wwwww.wwwww.w.w.www.w.www.w.w
w.........w.w...w.......w.w.w...w.w...w.w
wwwwwwwww.w.w.w.wwwwwwwww.w.w.www.w.www.w
w.....w...w.w.w.....w.w...w.w...w.w...w.w
wwwww.w.www.w.wwwww.w.w.www.www.w.w.w.www
w.....w.w.w...w...w.w.w...w.....w.w.w...w
w.wwwww.w.w.www.w.w.w.www.wwwwwwwwwww.w.w
w.....w.w...w...w.w.w...w.w.....w...w.w.w
wwwww.w.wwwww.www.w.w.w.w.www.w.w.w.www.w
w.....w.......w.w...w.w.w.....w...w.w...w
w.wwwwwwwwwwwww.wwwwwww.wwwwwwwwwww.w.w.w
w...........................w.....w...w.w
w..wwwwwwwwwwwwww.w.wwwwwww.w.www.wwwww.w
w..w.....w.w....w.w.w...w...w.w.w...w...w
w..w.www.w.w.ww.w.w.w.w.w.www.w.w.www.www
w..w.w.....w..w.w.w.w.w.w...w...w.w...w.w
w..w.wwwww.w..w.w.w.w.w.www.www.w.w.www.w
w..w...w...w..w...w.w.w.w.....w.w...w...w
w..ww..w.www..w.wwwww.w.wwwwwww.wwwwwww.w
w...w..w.w....w.w.....w.w.....w.w.....w.w
www.w..w.www..www.wwwww.w.www.w.ww.w..w.w
w......w..............w.....w......w...cw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp......w.......w...w.......w.....................w
w.www.www.w.www.w.www.w.wwwww.wwwwwwwww.wwwwwwwww.w
w.w...w...w...w...w...w.......w...w...w.w.......w.w
w.wwwww.wwwww.www.w.wwwwwwwwwww.w.w.www.w.www.w.w.w
w.....w.w.....w.w.w.....w.....w.w.w...w...w.w.w.w.w
w.www.w.w.wwwww.w.wwwww.www.w.w.w.www.wwwww.www.www
w...w.w.w...w...w.....w...w.w...w.......w.w...w...w
wwwww.w.www.w.www.wwwwwww.w.wwwwwwwwwww.w.www.www.w
w.....w.w...w.....w.......w...w.......w.....w.w...w
w.www.w.w.www.wwwww.wwwwwww.w.www.www.wwwww.w.w.www
w.w...w.w...w.w...w.w...w...w...w...w.....w.w.w...w
w.wwwww.www.www.w.w.w.w.wwwww.w.www.www.www.w.w.w.w
w.........w.w...w...w.w.....w.w...w...w...w.w.w.w.w
w.wwwwwwwww.w.wwwwwww.wwwww.w.www.w.wwwww.w.w.www.w
w.w.....w...w.........w.....w.w.w.w.w...w...w.w...w
w.wwwww.w.wwwwwwwwwwwww.wwwww.w.w.www...wwwww.w.www
w.w.....w.w.....w.......w...w...w.....w.w.....w...w
w.w.wwwww.w.w.www.wwwwwww.w.www.wwwwwww.w.wwwwwww.w
w...w.....w.w...w.w.....w.w.....w.....w.w...w.....w
wwwww.wwwww.www.w.w.wwwww.wwwwwww.w.www.www.w.wwwww
w...w.w...w...w...w.w...w.....w...w.w.....w...w...w
w.w.w.w.w.www.wwwww.w.w.wwwww.w.www.w.wwwwwwwwwww.w
w.w...w.w...w.w.......w.w.....w...w.w.w...........w
w.wwwww.www.w.w.wwwwwww.w.wwwwwww.w.w.w.wwwwwww...w
w.w...w.w.w.w.w.w.......w...w.....w.w...w.w.....w.w
w.w.w...w.w.w.w.w.www...www.www.wwwwwww.w.w.wwwww.w
w...w...w.w...w.w.w...........w.w.....w...w...w.w.w
w.wwwwwww.wwwww.www.wwwwwwwww.w.w.www.wwwwwww.w.w.w
w.w...w.....w.......w.....w.w.w.w...w.........w.w.w
w.w.w.w.wwwww.wwwwwww.www.w.w.w.www.wwwwwwwwwww.w.w
w.w.w.w.w.......w.....w...w.....w...w.w.......w...w
w.w.w.w.w.wwwwwww.wwwww.wwwwwwwww.www.w.www.w.w.www
w...w.w.w.w.w...w...w.w.w.........w...w.w.w.w.w...w
wwwww.w.w.w.w.w.www.w.w.w.w.wwwwwww.w.w.w.w.wwwww.w
w...w.w.....w.w.....w...w.w.w.....w.w...w.w.w...w.w
w.w.w.w.wwwww.wwwwwww.www.w.wwwww.w.wwwww.w.w.w.w.w
w.w.w.w.w.....w.w.....w...w.w.....w.w.....w...w.w.w
w.w.w.www.wwwww.w.wwwww.www.w.wwwww.w.www.wwwww.w.w
w.w.w.w...w.......w...w.w...w.......w...w.w...w...w
w.www.w.www.wwwwwwwww.w.w.www.wwwwwww.w.www.w.wwwww
w...w.w...w...w.....w...w.w...w.....w.w.....w...w.w
w.w.w.www.www.www.w.w.www.w.www.www.www.wwwww.w.w.w
w.w...w...w...w...w.w.w...w.....w.....w...w...w...w
w.wwwww.www.www.www.www.www.wwwwwwwww.wwwww.wwwww.w
w.w.....w.w...w.w.....w...w.w.......w.....w...w.w.w
w.www.www.www.w.wwwww.w.w.www.wwwww.wwwww.www.w.w.w
w.....w.....w.w.....w.w.w.........w.w.....w...w...w
wwwwwww.w.www.wwwww.w.wwwwwwwwwwwww.w.wwwww.www.www
w.......w...........w...............w.......w....jw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wpw.......w.........w.........w.....w.....w.......w.............w...w.......w...w.......w.....w.....w
w.w.wwwww.w.www.wwwww.w.wwwww.w.w.w.www.w.www.w.w.wwwww.wwwww.www.w.w.wwwww.w.w.w.www.www.www.w.www.w
w...w...w.w.w.w.......w...w.w.w.w.w.....w...w.w.w.....w.....w.w...w.......w...w.w.w.w.w...w...w...w.w
w.www.w...w.w.wwwwwwwwwww.w.w.www.wwwwwwwww.www.wwwww.wwwwwww.w.wwwwwwwwwww.www.w.w.w.w.www.wwwww.w.w
w...w.wwwww.w...........w.w.w...w.w.....w.....w...w.w.w.....w.w.w.....w...w...w.w...w.w.w.w.......w.w
www.w.w.....wwwwwwwww.www.w.www.w.w.www.wwwww.www.w.w.w.www.w.w.www.www.w.wwwww.www.w.w.w.wwwwwwwww.w
w.w.w.w.www.w...w...w.w...w.....w...w.w.w...w.....w...w.w.w.w.......w...w...w.....w.w...w.........w.w
w.w.w.w.w...w.w.w.w.w.w.wwwww.wwwww.w.w.w.w.wwwwwww.www.w.w.wwwwwww.w.wwwww.w.www.w.wwwww.wwwww.www.w
w...w.w.w...w.w...w...w.w...w.....w...w...w.....w.w...w.w.....w.....w.....w.w...w.w.w.....w...w.w...w
w.www.w.w.w.w.www.wwwww.w.w.wwwww.wwwwwwwwwwwww.w.www.w.wwwww.wwwwwwwwwww.w.www.www.w.wwwww.w.w.w.w.w
w.w.w.w.w.w...w...w...w...w...w...w.........w...w...w.w...w...w.......w...w...w...w.w...w...w.w.w.w.w
w.w.w.w.w.wwwwwwwww.w.www.www.w.www.wwwwwww.w.www.w.w.www.w.www.wwwww.w.wwwww.w.w.w.www.w.www.w.w.www
w...w.....w.......w.w...w.w...w.....w.....w.w.w...w.w.w...w.w...w...w.w.w...w.w.w.w.w...w...w.w.w...w
www.wwwww.w.wwwww.w.www.w.w.wwwwwwwwww..www.w.wwwww.w.w.www.w.w.w.w.w.w.w.www.www.w.w.wwwww.w.w.www.w
w...w...w.w...w...w.w...w.w.w.....w.....w...w.w.....w...w.w.w.w.w.w.w...w.........w.w.....w.w.....w.w
w.www.w.wwwww.w.www.w.wwwww.www.www.w.w.w.www.w.www.wwwww.w.www.w.wwwwwww.wwwwwwwww.w.www.www.wwwww.w
w...w.w.w.....w.w...w.....w.w...w...w.w.w.....w...w...w...w.....w...w.....w.....w...w...w...w.w.....w
w.www.w.w.wwwww.w.wwwwwww.w.w.www.www.wwwwwwwww.w.www.w.wwwwwwwww.w.w..wwww.www.w.wwwwwwwww.w.w.www.w
w.w...w...w...w.w.w.......w.w.w...w.w...........w.w...w.w.........w.w.....w...w.w.w.........w.w...w.w
w.w.w.wwwww.w.w.w.www.wwwww.w.w.www.wwwwwwwwwww.w.www.w.w.wwwwwwwww.wwwww.www.w.w.w.wwwwwwwww.www.www
w.w.w.w...w.w.w.w...w.......w.w.w.....w.......w.w...w...w...w.....w.w.....w.w.w.w.w.w...w...w.w.w...w
www.www.w.w.w.w.www.wwwwwwwww.w.www.w.w.wwwww.w.www.www.www.w.www.w.w.wwwww.w.w.w.w.w.w.w.w.w.w.www.w
w...w...w.w.w.w.w...w.w.............w.w.w.....w.w.w.w...w...w.w.w...w...w...w.w...w.w.w.w.w.......w.w
w.www.www.w.www.w.www.w.wwwwwwwwwwwww.w.w.wwwww.w.w.wwwww.www.w.www.www.w.www.wwwww.w.w.wwwww.wwwww.w
w.....w.w.w...w...w.......w.....w.....w.w.w.......w.........w.w...w.w...w...w.w.....w.w.....w.w.....w
w.wwwww.w.w.w.w.wwwwwwwwwww.www.www.www.w.wwwwwwwwwwwwwwwww.w.www.w.w.wwwww.w.w.w.www.wwwww.www.www.w
w.w...w.w.w.w...w...w...w...w.w...w.w.w.w.......w...w...w...w...w.w.w.w.....w.w.w.w...w.w...w...w.w.w
w...w...w.w.wwwww.w.w.w.w.www.www.w.w.w.wwwwwww.w.w.w.w.wwwwwww.w.w.w.www.www.w.w.w.www.w.www.www.w.w
wwwwwwwww.w...w...w.w.w...w.....w.w...w.w.....w.w.w...w...w.....w.w.w.....w...w.w.w.w...w...w.w...w.w
w.........w.w.w.www.w.wwwww.www.w.wwwww.w.www.w.w.wwwwwww.w.wwwww.w.wwwww.w.www.www.w.wwwww.w.w.w.w.w
w.wwwwwwwwwww.w...w...w.....w...w.w.....w.w...w.....w...w.w.w.....w.w.w...w.w.......w.w.....w.w.w...w
w.w.....w...w.www.wwwww.wwwww.www.w.wwwww.w.wwwwwwwww.w.w.w.www.www.w.w.www.w.wwwwwww.w.wwwww.www.www
w.w.w.w.w.w.w.w.w.....w...w.w...w...w...w.w.w.......w.w.w.w...w.......w.w...w...w...w.w.....w...w...w
w.w.w.w...w.w.w.wwwww.www.w.www.wwwww.www.w.w.w.ww..w.w.w.w.w.wwwww.www.w.wwwww.w.w.w.wwwww.www.www.w
w.w.w.wwwww.w...w...w...w.w...w.......w...w.w.w.w.....w.w.w.w.....w.w...w.w...w.w.w...w.......w.w...w
w.w.w.....wwwww.w.wwwww.w.w.www.wwwwwww.www.w.w.wwwwwww.w.w.wwwww.www.www.www.w.w.www.w.wwwww.w.wwwww
w.wwwww.w.w...w.w.w.....w.w.w...w.......w...w.w...w.w...w.w...w.w...w...w.w...w.w.w...w.w.....w.....w
w.....w.w...w...w.w.wwwww.w.w.w.w.wwwwwww.wwwwwww.w.w.www.www.w.www.www.w.w.www.w.wwwww.www.wwwwwww.w
w.www.w.wwwwwww.w.w.....w...w.w.w.w.......w.......w.w...w...w.....w.....w.w...w.w.....w...w.......w.w
w.w...w.w.....w...wwwww.wwwww.www.wwwwwww.w.w.wwwww.ww..www.w.wwwww.wwwww.www.w.wwwww.www.wwwwwww.w.w
w.w.www.w.www.www.w...w.....w...w.......w...w.w...w..w......w.w...w...w...w...w.....w...w.w...w...w.w
w.w.w...w.w.w.w...w.w.wwwww.www.wwwwwww.wwwww.w.w.w.wwwww.wwwww.w.wwwww.www.wwwwwww.w.www.w.w.w.www.w
w.w.wwwww.w.w.w.www.w.....w...w.....w...w.....w.w.w.....w.w.....w.w.....w...w...w...w.w...w.w.w.w...w
w...w.....w.w.w.....w.wwwwwww.wwwww.w.www.wwwww.w.wwwww.w.w.wwwww.w.wwwwwww.w.w.w.www.w.www.w.w.w.w.w
w.www.wwwww.w.w.wwwww.w.....w...w...w...w...w...w.....w...w.w...w.w.......w...w.w...w.w.w...w.w.w.w.w
w.w...w.....w.w.w...www.www.www.w.wwwww.www.w.w.wwwww.wwwww.www.w.wwwwwww.www.w.www.w.w.w.www.www.www
w.w.www.www.w.www.w..w..w...w...w.....w...w.w.w.w...w.......w...w.......w...w.w.....w.w.w.w.....w...w
w.w.w.....w.w.....w....ww.w.w.www.www.www.w.w...w.wwwwwwwwwww.www..wwwwwwww.w.wwwww.w.w.w.wwwww.www.w
w.w.wwwww.wwwwwwwwwwwwww..w.w.w.w.w...w.w.wwwww.w.w...w.....w...w.........w.w.w...w...w.w...w.....w.w
w...w.....w.....w.....w.w.....w.w.w.w.w.w.w.....w.w.w.w.w.w.w.w.wwwwwww.www.www.w.w.www.www.wwwww.w.w
w.www.wwwww.www.w.w.w.w.wwwwwww.w.w.w...w.w.wwwww...w...w.w.w.w.......w...w...w.w.w.w.....w.....w...w
w.w.......w.w.w...w.w...w.....w...w.w.w.w...w.w..wwwwwwww.www.wwwwwww.www.www.w.w.www.www.wwwww.www.w
w.wwwwwww.w.w.wwwww.www.www.w.wwwww.w.w.wwwww....w....w.w...w...w.......w.......w.....w...w...w.w.w.w
w.w.....w.w.....w.w...w.....w.......w.....w.....www.w.w.www.www.w.w.wwwwwwwwwwwwwwwwwww.www.w.w.w.w.w
w.w.www.w.wwwww.w.www.wwwwwww.wwwwwwwwwww.w.wwwww.w.w.....w.w...w.w.w.............w...w...w.w...w.w.w
w...w.w.w...w...w...w.w...w...w.........w.w.w.......wwwwwww.w.www.w.w.wwwwwwwwwww.w.w.wwwww.wwwww.w.w
wwwww.w.w.www.www.w.w.w.w.wwwww.wwwwwww.w.w.w.wwwww.w...w.w.w...w.w.w.........w.w.w.w.....w....w..w.w
w...w...w.........w.w...w.w.....w...w.w.w.w...w...w.w.w...w.www.w.wwwwwwwwwww.w.w.w.wwwww.www..wwww.w
w.www.wwwwwwwwwwwww.wwwww.w.wwwww.w.w.w.wwwwwww.w.w.w.ww.ww.w...w...........w.w...w.....w......w..w.w
w...w...........w...w...w.w.w.....w.w.w.........w...w.w.....wwwwwww.wwwwwww.w.www.wwwww.wwwwwwww.ww.w
www.wwwwwwwwwww.wwwww.w.w.w.www.w.w.w.wwwwwwwwwwwwwww.www.w.w...w...w.....w.w...w.............w.....w
w...w.w.....w.w.w.....w...w...w.w.w.w.....w.........w.w...www.w.w.wwwwwww.w.www.wwwwwwwww.www.w.wwwww
w.w.w.w.w.w.w.w.w.wwwwwww.www.www.w.www.w.w.wwwwwww.w.w.w...w.w...w.......w...w.....w...w...w.w.w...w
w.w.w.w.w.w...w.w.......w.........w.w...w.w.w.....w.w.w.w.w...wwwwwwwww.wwwww.wwwww.w.w.w.w.w.w.w.w.w
w.w.w.w.w.www.w.w.wwwww.wwwwwwwwwww.w.www.w.www.www.w...wwwwwww...w...w.w.....w...w...w.w.w.www.w.w.w
w.w...w.w...w.w.w.w...w...w.....w...w.w...w...w.w...w.w......w..w...w...w.w.w.w.w.wwwww.w.w.w...w.w.w
w.www.w.www.www.w.w.w.www.w.w.www.www.www.w.w.w.w.www.wwwww.wwwww.wwwwwww.w.w.w.w.w...w.w.w.w.www.w.w
w...w.w...w.....w...w.w.w...w.....w.w...w.w.w.w...w.....w...w.....w.....w...w.....w...w.w.w.w...w.w.w
w.w.wwwww.wwwwwwwwwww.w.wwwwwwwwwww.w.w.w.w.w.w.wwwwwww.w.wwwww.w.w.www.www.www.www.w...w.w.www.w.w.w
w.w.....w.w.....w...w.w...............w.w.w.w.w.w.......w.....w.w.....w.........w...w...w.w.....w.w.w
w.www.www.w.wwwww.w.w.wwwwwwwwwww.wwwww.w.www.w.w.w.wwwwwwwww.w.wwwwwwwww.wwwwwww.wwwwwww.wwwwwwwww.w
w...w.....w.......w.w.....w.....w...w.w.w.....w.w.w.........w.w.....w...w...w.....w.....w.w.........w
www.wwwwwwwww.wwwww.wwwww.w.www.www.w.w.wwwwwww.w.wwwww.wwwww.wwwwwww.w.wwwww.wwwww.w.www.www.wwwww.w
w.w.w.......w.w...w.....w.w.w...w...w.w...w.w...w...w...w.....w.......w...w...w.....w...w.....w...w.w
w.w.w.wwwww.www.w.w.www.w.w.w.www.www.www.w.w.wwwwwww.www.www.w.wwwwwwwww.w.www.wwwwwww.wwwwwww.www.w
w.w.w.....w.....w...w.w.w...w.w.......w...w.w.........w...w...w.w.w.....w...w.w.w.....w.............w
w.w.wwwww.wwwwwwwwwww.w.wwwww.wwwwwww.w.www.wwwwwwwww.w.wwwwwww.w.w.w.wwwwwww.w.w.w.wwwwwwwwwwwwwwwww
w...w...w.w.................w...w.....w.w.w.........w.w.w...w...w...w.....w.w...w.w.................w
w.www.w.w.wwww.wwwwwwwwwwww.www.wwwwwww.w.w.wwwwwww.w.w.w.w.w.www.wwwww.w.w.w.www.wwwww.wwww..wwwww.w
w.w...w.w.w.......w...w...w.w.w...w.....w...w.....w...w.w.w...w...w.w...w...w.w.w.....w.......w.....w
w.www.w.w.w.wwwww.w.w.w.w.w.w.www.w.wwwww.www.wwwwwwwww.w.wwwwwww.w.w.wwwwwww.w.wwwww.wwwwwww.w.wwwww
w...w.w.w.w.w...w...w.w.w...w...w...w...w...w.........w.w.......w...w.......w.w.........w.....w.....w
www.w.w.w.w.w.w.wwwww.w.wwwww.wwwwwwwww.www.wwwwwww.www.wwwwwww.wwwwwwwwwww.w.w.wwwwwww.www.w.wwwww.w
w...w...w.....w.w...w.w.....w...........w...w.....w...w.......w.......w.....w.w.w...w.....w.......w.w
w.www.w.wwwwwww.w.w.w.wwwww.wwwwwwwww.w.w.www.www.www.w.wwwww.wwwwwww.w.www.w.www.w.wwwww.w.ww..w.w.w
w...w.w.w...w.w.w.w.w.....w...........w.w.w...w.w.....w.w...w.w.......w.w.w.w.w...w...w.w...w...w.w.w
www.w.w.w.w.w.w.www.w.w.w.wwwwwwwwwwwww.w.w.www.wwwww.w.w.w.www.wwwwwww.w.w.w.w.wwwww.w.www.w.www.w.w
w.w...w.w.w.w.w.w.....w.........w.......w.w...w.......w.w.w.w...w.......w.w.w...w...w.w.....w...w...w
w.wwwww.w.w.w.w.w.www.wwwwwwwww.wwwwwwwww.www.w.wwwwwww.w.w.w.www.w.wwwww.w.wwwww.w.w.www.wwwww.www.w
w.....w...w.w.w.w.w.w.w.........w...w...w.....w.w.....w.w.w...w...w.w...w...w.....w.w...w.w...w.w.w.w
w.www.wwwww.w.w.w.w.w.w.wwwwwwwww.w.w.w.wwwww.www.www.w.w.wwwwwww.www.w.w.www.wwwww.www.w.w.www.w.w.w
w...w...w...w...w.w...w.......w...w.w.w.....w.w...w.w.w.w...w...w.....w.w...w...w.w...w.w.w.w...w.w.w
www.www.w.www.www.w.wwwwwww.w.w.www.w.www.www.w.www.w.w.www.w.w.wwwwwww.www.www.w.www.w.w.w.w.www.w.w
w...w...w.w.w...w.w.w.....w.w.....w.....w.....w.w.........w.w.w.......w...w.w...w...w...w...w.w...w.w
w.www.www.w.www.w.w.w.www.www.wwwwwwwww.wwwwwww.w.wwwwwwwww.w.wwwwwww.www.www.wwwww.wwwww.www.w.w.w.w
w.w.w.w...w.......w.w...w...www.......w.......w.w.w...w.....w...w...w...w.....w...w.......w...w.w...w
w.w.w.w..wwwwwwwwwwwwww.www...w.wwwww.wwwwwwwww.w.www.w.wwwwwwwwwww.www.w.wwwww...w.wwwww.w.www.wwwww
w.w...w.......w...w...w...w...w.w...w...........w.....w...............w.w.w.....w.w.w...w.w.w.w.w...w
w.wwwwwwwwwww.w.w.w.w.www.www.w.w.wwwwwwwwwwwwwwwwwww.wwwwwww.wwwwwwwww.w.w.wwwww.www.w.www.w.w.w.w.w
w...............w...w.....w.....w...........................w...........w...w.........w.....w.....wkw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
.............
.111.222.333.
.111.222.333.
.111.222.333.
.............
.............
.............
b.....p......
.............
.............
.............
.444.555.666.
.444.555.666.
.444.555.666.
.............`,
  map`
wwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww
wwgwwwgwwgggwwgwwwgww
wwgwwwgwgwwwgwgwwwgww
wwwgwgwwgwwwgwgwwwgww
wwwwgwwwgwwwgwgwwwgww
wwwwgwwwgwwwgwgwwwgww
wwwwgwwwgwwwgwgwwwgww
wwwwgwwwwgggwwwgggwww
wwwwwwwwwwwwwwwwwwwww
wwgwwwgwwgggwwgwwwgww
wwgwwwgwwwgwwwgwwwgww
wwgwwwgwwwgwwwggwwgww
wwgwwwgwwwgwwwgwgwgww
wwgwgwgwwwgwwwgwwggww
wwgwgwgwwwgwwwgwwwgww
wwwgwgwwwgggwwgwwwgww
wwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
wgwwwgwwgggwwgwwwgwww
wgwwwgwwwgwwwggwwgwww
wgwwwgwwwgwwwgwgwgwww
wgwgwgwwwgwwwgwwggwww
wgwgwgwwwgwwwgwwwgwww
wwgwgwwwgggwwgwwwgwww
wwwwwwwwwwwwwwwwwwwww
wgwwwgwwgggwwgwwwgwww
wgwwwgwwwgwwwggwwgwww
wgwwwgwwwgwwwgwgwgwww
wgwgwgwwwgwwwgwwggwww
wgwgwgwwwgwwwgwwwgwww
wwgwgwwwgggwwgwwwgwww
wwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww
wwp...............bww
wwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww`,
]

setMap(levels[level])


setPushables({
  [ player ]: []
})


onInput("s", () => {
  getFirst(player).y += 1;
  playTune(move)
});

onInput("w", () => {
  getFirst(player).y -= 1;
    playTune(move)
});

onInput("a", () => {
  getFirst(player).x -= 1;
    playTune(move)
});

onInput("d", () => {
  getFirst(player).x += 1;
    playTune(move)
});



afterInput(() => {
   if (tilesWith(l1, player) != 0){
    level =+ 1
    setMap(levels[level])
    clearText()
    
  } else if(tilesWith(l2, player) !=0) {
    level =+ 2
    setMap(levels[level])
    clearText()
    
  }else if(tilesWith(l3, player) !=0) {
    level =+ 3
    setMap(levels[level])
    clearText()
  }else if(tilesWith(l4, player) !=0) {
    level =+ 4
    setMap(levels[level])
    clearText()
  }else if(tilesWith(l5, player) !=0) {
    level =+ 5
    setMap(levels[level])
    clearText()
  } else if(tilesWith(help3, player) !=0) {
    level =+ 5
    setMap(levels[level])
    clearText()
  
  }
  if (tilesWith(pad, player) != 0){
    level =+ 1
    setMap(levels[level])
    clearText()
    
  } else if(tilesWith(pad2, player) !=0) {
    level =+ 2
    setMap(levels[level])
    clearText()
    
  }else if(tilesWith(pad3, player) !=0) {
    level =+ 3
    setMap(levels[level])
    clearText()
  }else if(tilesWith(pad4, player) !=0) {
    level =+ 4
    setMap(levels[level])
    clearText()
  }else if(tilesWith(pad5, player) !=0) {
    level =+ 7
    setMap(levels[level])
    clearText()
      const playback = playTune(win2, Infinity)

  } else if(tilesWith(pad6, player) !=0) {
    level =+ 8
    setMap(levels[level])
    clearText()
  const playback = playTune(win2, Infinity)
  
  }
  
  const helpCheck = tilesWith(player, help).length
  const helpCheck2 = tilesWith(player, help2).length
  const helpLevel =  6
  const spawnLevel = 0

 if( helpCheck > 0){
  setMap(levels[helpLevel])
   
 } 
  if (helpCheck2 > 0){
  setMap(levels[spawnLevel])
   
  }
  
})