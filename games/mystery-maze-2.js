/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: maze 2
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
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
  [ player, bitmap`
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

setSolids([])

let level = 0
const levels = [
  map`
pwwwwqwwwwwwwwq
qwwwqqqqqqqqqqq
qqqwqqwwqwwwqqw
wwqwwwwwqwwwqww
wwqqqqqqwwwwqww
wwwwqwwqwwwwqww
wwwwqwwqqqqqqww
wwwwqwwqwwwwwww
wqqqqwwqqqqqwww
wqwwwwwwwqwqwww
wqqqqqwwwqwqwww
wwwwwqqwwqwqqqw
wqqqqqqwwqwwwqq
wwwwwwwwwqwwwwi`,
    map`
pmmmmmmmmmammmm
ammmmmmmmmammmm
ammmmmmmmmaaamm
aaaaaammmmmmamm
mmmmmaaaaaaaamm
mmmmmammmmmmmmm
mmmmmamaaaaaaam
maaaaammammmmam
mammmammaaaamam
mammmammammmmam
mammmammmmmmmam
mmmmmaaaaaaaaam
mmaaaammmmmmmmm
aaammaaaaaaaaai`,
   map`
wwwwwwwiwwwwwww
wwwwwwwqwwwwwww
wwwqqqqqwwwwwww
wwwqwwwwwwwwwww
wwqqwqqqqqqwwww
wqqwwqwwwwqqqqq
wqwwwqwwwwwwwwq
wqwwwqqqwqqqwqq
wqwwqqqwwqwqwqw
wqwwqwqqwqwqwqw
wqwwqwwqwqwqwqw
wqwqqwqqwqwqwqw
wqqqwwqwwqwqwqw
wwwwwwqqqqwqqqw`,
    map`
pmimaaaaaaaaaaa
amamammmmmmmmma
amamaaaaaaaaama
amammmmmmmmmama
amaaaaaaaammama
ammmmmmmmammama
amaaaaammammama
amammmammammama
amammmammammama
amammmaaaammama
amammmmmmmmmama
amaaaaaaaaaaama
ammmmmmmmmmmmma
aaaaaaaaaaaaaaa`
]


setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})
afterInput(() => {
  
})