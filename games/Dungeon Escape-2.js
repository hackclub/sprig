/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: maze runner
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const door = "d"
const key = "k"
const box = "b"
const fondo = "f"
const lavatop = "t"
const lavastream = "s"
const lavapool = "l"


setLegend(
  [ player, bitmap`
....D4444D......
.....220........
.....2222.......
.....222........
...D4DDD4D......
..D4D444D4D.....
..D.DD4DD.D.....
..D.DD4DD.D.....
..D.DD4DD.D.....
....44444.......
....DDDDD.......
....DD.DD.......
....DD.DD.......
....DD.DD.......
....DD.DD.......
....CC.CC.......` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LL111111111111LL
L1L1111111111L1L
L11LLLLLLLLLL11L
L11LL111111LL11L
L11L1LLLLLL1L11L
L11L1L1LL1L1L11L
L11L1LLLLLL1L11L
L11L1LLLLLL1L11L
L11L1L1LL1L1L11L
L11L1LLLLLL1L11L
L11LL111111LL11L
L11LLLLLLLLLL11L
L1L1111111111L1L
LL111111111111LL
LLLLLLLLLLLLLLLL` ],
  [ door, bitmap`
................
....LLL11LLL....
...L10000001L...
..L10CCCCCC01L..
..L0CCCCCCCC0L..
.L166666FCCCC1L.
.L1F2F2F6FCCC1L.
.L116666FCCC11L.
..L2CCCCCCCC2L..
.L10CCCCC6C601L.
.L11CCCCC66611L.
.LL1CCCCCCCC1LL.
..L1CCCCCCCC1L..
.LL166666CCC1LL.
.L1F2F2F2FCC21L.
.L10FFFFFCCC01L.` ],
  [ key, bitmap`
................
................
................
................
..666...........
.66966..........
66FFF66.........
69F6F96666666666
66FFF66..66..66.
.66966.......66.
..666...........
................
................
................
................
................` ],
  [ box, bitmap`
FFFFFFFFFFFFFFFF
FLLLLLLLLLLLLLLF
FLF6CCCCCCCCCFLF
FLCF6CCCCCCCF6LF
FLCCF6CCCCCF6CLF
FLCCCF6CCCF6CCLF
FLCCCCF6CF6CCCLF
FLCCCCCFF6CCCCLF
FLCCCC6FFCCCCCLF
FLCCC6FC6FCCCCLF
FLCC6FCCC6FCCCLF
FLC6FCCCCC6FCCLF
FL6FCCCCCCC6FCLF
FLFCCCCCCCCC6FLF
FLLLLLLLLLLLLLLF
FFFFFFFFFFFFFFFF` ],
  [ fondo, bitmap`
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
1111111111111111` ],
  [ lavatop, bitmap`
6....6..F.6.....
6....6...9.6.6F.
.9.9..F..6...6..
.F99F...999.6...
.9999.9.F6..69.6
996.6699696..6..
.6.9F9F999.6F...
.9.696696..999.9
.699699F99969F6.
9F9FF9969F99999F
99F99966F666FF99
9969FFFFFFF96699
9F699999F66FFFF9
99FF9F666FFF9999
9F969F999F99F9F9
F9F69F9999999999` ],
 [ lavastream, bitmap`
...99F969929999.
...99FF996F99699
..92269999996999
..9996969F292969
...9992969999F99
...9996969926F9.
....999999F96F9.
....999629699999
....929969F96F9.
....999999999F9.
....99F99996999.
....99299996969.
....69662999996.
...999F629F29669
...969F699F66999
...999F96999969.` ],
  [ lavapool, bitmap`
9996999699699999
9999999999999999
9999699999999699
9969999699969999
9999999999999699
9999699699969999
9999999996999999
6969969969999969
9999969999969999
9999996999699699
9699999999999999
9999699999999999
9699996969699969
9999999999996999
9999999699699999
9996999999999999` ]
)

setSolids([player, wall, key, box, lavatop, lavastream, lavapool])

let level = 0
const levels = [
  map`
wwwwwwwwww
w........w
w....b.w.w
wbkb.p...w
w.b...b..d
w..ww....w
wtttlllllw
wwwwwwwwww`,
  map`
wlll......
wwws..k...
...swwww..
..ps......
.www......
.b........
ww.....www
lb.......d`,
  map`
...w....b...
.w...wwwwww.
.wwwwwl.....
.w...bwb..ww
...w....w.kd
.wwwwwwwwwww
.w..w.w..b.p
......ww.www
..www.w.....
....w...www.`,
  map`
tw....wlw..k.d
lwb...wwlb.www
wwwbw...ww..w.
w...w.w.......
..wwwwwwwwwwww
.........b....
lwwwww.wwwwww.
sww..b..w.....
ll..www.w.wwww
wsw.w...w.bwll
sww.w.www.wwww
lb..w........p`
]

setMap(levels[level])

setBackground(fondo)

setPushables({
  [ player ]: [key, box]
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})


afterInput(() => {

  const targetNumber = tilesWith(door).length;
  

  const numberCovered = tilesWith(door, key).length;

  if (numberCovered === targetNumber) {
    
    level = level + 1;

    const currentLevel = levels[level];

        if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
  
})