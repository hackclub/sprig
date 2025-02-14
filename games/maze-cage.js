/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: maze cage
@author: 
@tags: []
@addedOn: 2024-00-00
*/
const p = "p"
const wall2 = "q"
const wall = "w"
const wall3 = "a"
const wall4 = "m"
const win = "i"
setLegend(
  [ wall, bitmap`
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000` ],
  [ wall2, bitmap`
0000000000000000
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLL0LL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0000000000000000
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0LLLLLLL0LLLLLL0
0000000000000000` ],
  [ p, bitmap`
6666661111666666
6666661LL1666666
6666661LL1666666
6666331LL1336666
6666331LL1336666
1111111111111111
1LLLL166661LLLL1
1LLLL166661LLLL1
1LLLL166661LLLL1
1LLLL166661LLLL1
1111111111111111
6666331LL1336666
6666331LL1336666
6666661LL1666666
6666661LL1666666
6666661111666666` ],
  [ wall4, bitmap`
7777777777777777
7777555555557777
7777555555557777
7777555555557777
7555777777775557
7555755555575557
7555755555575557
7555755555575557
7555755555575557
7555755555575557
7555755555575557
7555777777775557
7777555555557777
7777555555557777
7777555555557777
7777777777777777` ],
  [ wall3, bitmap`
5777777777777775
7777777777777777
7777555555557777
7777555555557777
7755777777775577
7755755555575577
7755755555575577
7755755555575577
7755755555575577
7755755555575577
7755755555575577
7755777777775577
7777555555557777
7777555555557777
7777777777777777
5777777777777775` ],
  [ win, bitmap`
F66666666666666F
6666666666666666
6666666666666666
F66666666666666F
3333663663663333
3333663663663333
FCCC66C66C66CCCF
3333663663663333
3333663663663333
FCCC66C66C66CCCF
3333663663663333
3333663663663333
F66666666666666F
6666666666666666
6666666666666666
F66666666666666F` ]
)

setSolids([ wall, wall4 ,p])

let level = 0
const levels =[ 
  map`
pwwww.wwwwwwww.
.ww..q.......q.
...w..ww.www..w
ww.wwwww.www.ww
ww......wwww.ww
wwwwqww.wwww.ww
wwww.wwq....qww
wwww.ww.wwwwwww
w.q..ww.q...www
w.wwwwwww.w.www
w.....www.w.www
wwwwwq.ww.w.q.w
w......ww.www.q
wwwwwwwww.wwwwi`,
    map`
p...mm..mm.mmmm
.mm..a.mmmammmm
ammmmmmmmm..amm
...a.ammmmam.mm
mmmmm.a...a..mm
mmmmm.mmmmmmmmm
mmmmmam..a...am
m.a...mmammmm.m
m.mmm.mm..a.m.m
mammm.mm.mmmm.m
m.mmm.mmammmm.m
m.mmm.a......am
mm....mmmmmmmmm
.a.mm.....a...i`,
   map`
wwwwwwwiwwwwwww
wwwwwww.wwwwwww
www.q..qwwwwwww
www.wwwwwwwwwww
ww..w......wwww
w.qwwqwwwwq....
w.www.wqpwwwwwq
w.www.q.w.q.w..
w.wwq..ww.w.w.w
wqww.wq.w.w.wqw
w.ww.ww.w.w.w.w
w.w.qwq.w.w.w.w
w.q.ww.ww.w.w.w
wwwwww..q.wq..w`,
    map`
pmim...a.a..a..
.m.mammmmmmmmm.
amam..a..a...m.
.m.mmmmmmmmm.m.
.ma...a.a.mm.m.
.mmmmmmmm.mmama
am.....mm.mmam.
.mammm.mmammam.
.mammm.mm.mm.m.
.m.mmma...mm.m.
.m.mmmmmmmmm.m.
ama....a.....m.
.mmmmmmmmmmmmma
....a....a.....`]

setMap(levels[level])

onInput("w", () => {
  getFirst(p).y -= 1;
});

onInput("s", () => {
  getFirst(p).y += 1;
});

onInput("d", () => {
  getFirst(p).x += 1;
});

onInput("a", () => {
  getFirst(p).x -= 1;
});


afterInput(() => {
  if (getFirst(p).x == getFirst(win).x && getFirst(p).y == getFirst(win).y) {
    level++
      setMap(levels[level])
  }
})