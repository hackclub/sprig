/*
@title: Food Hunt
@description: This game is called Food Hunt! Navigate through the yucky food(fruits) to complete the yummy meal!
@author:Rishik Theranikal 
@tags: ['tag1', 'tag2']
@addedOn: 10/25/2026
*/

const player = "p"
const apple = "a"
const banana = "b"
const watermelon = "w"
const drink = "d"
const fries = "f"
const burger = "g"
const cookie = "c"
const background = "k"

const stepSound = tune`
80: c3^80,
80: g2^80`

const portalSound = tune`
100: e5~100,
100: g5~100,
100: c6~100`

const winSound = tune`
200: c5~200,
200: e5~200,
200: g5~200,
200: c6~200 + e5~200,
200: b5~200 + g5~200 + d5~200,
200: c6~200 + g5~200 + e5~200 + c5~200,
200: c6~200 + g5~200 + e5~200 + c5~200,
200: c6~200 + g5~200 + e5~200 + c5~200`

setLegend(
  [ player, bitmap`
....CCCCCCCC....
....C666666C....
....C606606C....
....66666666....
....60666606....
....66000066....
....66666666....
...0055555500...
..055555555550..
.05555555555550.
.05555555555550.
.05555555555550.
..055555555550..
...0LLL00LLL0...
...0LLL00LLL0...
...000....000...` ],
  [ apple, bitmap`
...3333333DD3...
..333DD33DDD33..
.3333DDDDDD3333.
333333DDDD333333
33333333333333..
3333333333333...
333333333333....
333333333333....
333333333333....
333333333333....
333333333333....
333333333333333.
3333333333333333
.33333333333333.
..333333333333..
...3333333333...` ],
  [ watermelon, bitmap`
.......33.......
.......33.......
......3033......
.....333333.....
.....333333.....
....33303333....
...3033333033...
...3333333333...
..333330333333..
.33333333303333.
.33303333333333.
3033333033333033
3333333333333333
DDDDDDDDDDDDDDDD
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDD..` ],
  [ banana, bitmap`
....C666........
......66666.....
........6666....
.........6666...
.........6666...
..........666...
..........666...
..........666...
..........666...
..........666...
.........6666...
.........6666...
........66666...
......666666....
.....666666.....
...66666........` ],
  [ drink, bitmap`
........3.......
........3.......
....222222222...
....262222262...
....262222262...
....262222262...
....262222262...
....262222262...
....262262262...
....262262262...
....262666262...
....262626262...
....262626262...
....266626662...
....222222222...
....222222222...` ],
  [ fries, bitmap`
...6666666666...
...6666666666...
...6666666666...
...3366666633...
...3336666333...
...3333333333...
...3633333363...
...3633333363...
...3663333663...
...3363663633...
...3363663633...
...3366666633...
...3366336633...
...3336336333...
...3333333333...
................` ],
  [ burger, bitmap`
..666666666666..
.66666666666666.
6666666666666666
6666666666666666
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
3333333333333333
3333333333333333
4444444444444444
4444444444444444
4444444444444444
2222222222222222
2222222222222222
6666666666666666
.66666666666666.
..666666666666..` ],
  [ cookie, bitmap`
..666666666666..
..666666666CC6..
.666CC66666CC66.
6666CC6666666666
6666666666666666
666666666666CC66
666666CCC666CC66
66CC66CCC6666666
66CC666666666666
6666666666666666
666666666666CCC6
6666666CC666CCC6
66C6666CC666CCC6
.66666666666666.
..666666666666..
..666666666666..` ],
  [ background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ]
)

setBackground(background)

setSolids([ player, apple, watermelon, banana ])

let level = 0
const levels = [
  map`
p.w...
..a.a.
a...a.
aaa.a.
....a.
.aa..d`,
  map`
p......a...a
.waaba.aba.b
.a...a.a...w
.w.aaabw.aba
...a.......b
.abb.waaabaa
.......w...a
baba.b.a.a.b
.....b.a.a.a
.babab.a.w.b
.....w...a..
wbwaaaaaabaf`,
  map`
p....a.............b.....a...a
.baaba.a.aba.a.a.wba.aaa.w.aaa
...............a.w.....b.....b
bb.waaab.wbb.aab.a.bbw.aaaaw.w
.......w.........a...a.a...a.a
.aabbwwb.w.aaababwwb.bab.aaa.a
.w.w.......a.....w...w.......w
.a.b.aaw.w.a.a.aab.aaa.aaa.b.b
...b...a.w...a.a...a.....a.a.a
.bwwab.bawaaawaa.aaa.a.aaa.w.a
.a...a.a.a.w.....a...w.a...b.a
.w.waaaa.w.w.b.aaa.a.w.a.w.b.b
.....a...b...a.b...a.w.b.a.w.b
.a.a.a.a.b.w.aaa.aaaabaa.a.a.a
.b.a...b...a...a.....a...a.b.b
aaba.bba.aaw.aaa.aababwa.a.a.w
.....a.a...a.b.........a.a.w.a
.a.b.w.abwba.a.aaaaaawwb.bwaba
...a...a...a.b.........a.....w
babw.bbw.a.b.a.baaawabaawa.bab
...a.a.a.....w...a...b...a...a
.bwa.b.a.a.aawab.a.w.baa.a.b.w
.......w...a.....a.a.........b
aw.aaa.awaawwb.baawabbabbawawa
.a.......a.a...a...b.........a
.a.w.a.a.b.a.aaa.a.aaa.bbaaw.a
.a.a.......a.b...b.....b.....b
.a.b.aaa.aww.baa.aaababa.waawa
.........a.......b............
aaaawbaaababbwabaaaabawaawaaac`,
  map`
.....
.gfd.
..p..
.....`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  playTune(stepSound)

  if (tilesWith(player, drink).length > 0 || tilesWith(player, fries).length > 0 || tilesWith(player, cookie).length > 0) {
    if (level < levels.length - 1) {
      level = level + 1
      setMap(levels[level])
      if (level === levels.length - 1) {
        playTune(winSound)
        addText("Yum! Meal time!", { x: 2, y: 2, color: color`3` })
      } else {
        playTune(portalSound)
      }
    }
  }
})