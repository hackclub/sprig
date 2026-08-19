/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: SpaceGame
@description: A game set in space where the aim is to get the rocket back to Earth
@author: Enginerd14
@tags: ['Space']
@addedOn: 2026-07-01(July 1st 2026)
*/

const player = "p"
const earth = "e"
const asteroid = "a"
const wall = "w"
const bkg = "b"

const theme = tune`
100: F5/100 + D5-100 + G4-100,
100: G5/100 + G4-100,
100: A5/100 + D5-100 + F5^100 + F4-100,
100: F4-100 + E4-100,
100: D5-100 + F5^100 + E4-100,
100: A5/100 + D5-100 + E4-100 + D4-100,
100: G5/100 + D5-100 + F5^100 + D4-100,
100: F5/100 + D4-100,
100: E5/100 + D5-100 + D4-100,
100: D5/100 + D4-100,
100: C5/100 + D5-100 + F5^100 + D4-100,
100: D4-100,
100: D5-100 + F5^100 + D4-100,
100: C5/100 + D5-100 + D4-100,
100: D5/100 + F5^100 + D4-100 + E4-100,
100: E5/100 + E4-100,
100: F5/100 + D5-100 + E4-100,
100: G5/100 + F5^100 + E4-100 + F4-100,
100: A5/100 + D5-100 + F4-100,
100: F5^100 + F4-100,
100: D5-100 + F4-100,
100: A5/100 + D5-100 + F5^100 + G4-100,
100: G5/100 + D5-100 + G4-100,
100: F5/100 + G4-100,
100: E5/100 + D5-100 + G4-100,
100: D5/100 + F5^100 + G4-100,
100: C5/100 + D5-100 + G4-100,
100: F5^100 + G4-100,
100: D5-100 + A4-100,
100: C5/100 + D5-100 + F5^100 + A4-100,
100: D5/100 + A4-100 + G4-100,
100: E5/100`

const movement = tune`
500: F5-500,
15500`

const Nlevel = tune`
76.92307692307692: C5^76.92307692307692 + B4^76.92307692307692 + A4^76.92307692307692 + G4^76.92307692307692 + F4^76.92307692307692,
76.92307692307692: D5^76.92307692307692 + E5^76.92307692307692 + F5^76.92307692307692 + G5^76.92307692307692 + A5^76.92307692307692,
2307.6923076923076`

playTune(theme, Infinity);

setLegend(
  [ player, bitmap`
................
..000...........
.03330..........
..03300000......
...007777700....
99..077777770...
69907777007730..
66607770LL07330.
66607770LL07330.
69907777007730..
99..077777770...
...007777700....
..03300000......
.03330..........
..000...........
................` ],
  [ earth, bitmap`
.....000000.....
...00D4444400...
..0DD444444770..
.0D444444477770.
.0D444444777770.
0D444774777777D0
0777477777777DD0
077D44477777DD40
077D444477774440
077DD44444774440
0777D4444D7744D0
.0777444DD777D0.
.077744DD777770.
..0774DD777770..
...00DD777700...
.....000000.....` ],
  [ asteroid, bitmap`
................
................
......00000.....
...000011100....
.000111111100...
.0111L1L111100..
011LL11111LL100.
01L1111111L1110.
011111L1LLLL110.
.001LL1111111100
..01L111111LL110
...001LL11111100
....0011L1L100..
.....001LL100...
......000110....
........000.....` ],
  [ wall, bitmap`
0000000000000000
00LLLLLLLLLLLL00
0L1LLLLLLLL222L0
0L1LLLLLLLLLL2L0
0L1LLLLLLLLLL2L0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L111111111111L0
00LLLLLLLLLLLL00
0000000000000000` ],
  [ bkg, bitmap`
HH0000000000HHH7
500500007H000077
000H50005507777H
H700075005777007
HHH0000000000H0H
5500H55700000005
HH000507H0000000
00000007005H0000
7775500000555007
H775000500000577
H000055000000055
0050775550055500
0700070005007H77
000005005H507700
000H000770777005
H77H00557H005H00` ]
)

setBackground(bkg)
setSolids([wall, asteroid, player])

let level = 0
const levels = [

  map`
wwwwwwwwww
wpw.....ww
waw.w.w..w
w.w.w.w..w
w.w...w..w
w.wwwww..w
w.....a..w
w.wwwww..w
w......eww
wwwwwwwwww`,

  map`
wwwwwwwwww
wp.......w
wawww.ww.w
w.w.w....w
w.w.wwww.w
w...a..a.w
w.w.ww.a.w
w..a...w.w
ww.w..ewww
wwwwwwwwww`,

  map`
wwwwwwwwww
wpw......w
wawww.w.ww
w...w.wa.w
w.w.w.w..w
w.w.a..w.w
w.wwwwww.w
w......a.w
ww.....eww
wwwwwwwwww`,

  map`
wwwwwwwwww
wpw.w.w..w
wa..w.w..w
w.w.w....w
www.a.w..w
w.ww..w..w
w...ww...w
w.w...a..w
wea.ww...w
wwwwwwwwww`,

  map`
wwwwwwwwww
wpw......w
waw.wwwwaw
w.w.w..w.w
w.w..a.w.w
w.www..w..
w.....w...
w.wwwwww.w
ww....e..w
wwwwwwwwww`,

  map`
wwwwwwwwww
wpw.w...ew
waw.w.w..w
w.w.a.waw.
w.w.w.wa..
w.w...a...
w.wwwwww.w
w......a..
w......www
wwwwwwwwww`,

  map`
wwwwwwwwww
wp.......w
wwwwwwww.w
w.ew.....w
ww..w..w.w
w.a..w..ww
w.wwwww..w
w..a...a.w
w...a...ww
wwwwwwwwww`,

  map`
wwwwwwwwww
wp.ww....w
ww..wwaw.w
w.w....a.w
w..ww.a.ww
w..wa..a.w
w.....w..w
wwwwwwww.w
we.......w
wwwwwwwwww`
]

setMap(levels[level])


setPushables({
  [ player ]: [ asteroid ],
})

onInput("s", () => {
  getFirst(player).y += 1
  playTune(movement)
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(movement)

})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(movement)

})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(movement)

})

onInput("j", () => {
  setMap(levels[level])
})

afterInput(() => {
    const earthReached = tilesWith(player, earth); 

    if (earthReached.length >= 1) {
        level = level + 1;
        playTune(Nlevel)

        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("WINNER!", { y: 4, color: color`9` });
        }
    }
});
