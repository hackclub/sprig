/*
@title: Roodkapje
@author: Ebit22
@tags: ['puzzle']
@addedOn: 2024-05-30
@img: ""

move with WASD, go to the house and dogde the wolfs.
*/

const gehaald = tune`
62.37006237006237,
62.37006237006237: C4^62.37006237006237 + C5/62.37006237006237 + E4-62.37006237006237,
62.37006237006237: D4^62.37006237006237 + F4-62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D5/62.37006237006237 + G4-62.37006237006237,
62.37006237006237: A4-62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D4^62.37006237006237 + B4-62.37006237006237,
62.37006237006237: C5-62.37006237006237 + D4^62.37006237006237 + E4^62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D4^62.37006237006237 + D5-62.37006237006237 + C5/62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D4^62.37006237006237 + E5-62.37006237006237,
62.37006237006237: D5/62.37006237006237,
1372.1413721413721`
const dood =  tune`
82.87292817679558,
82.87292817679558: G4~82.87292817679558 + A4~82.87292817679558 + B4~82.87292817679558 + C5~82.87292817679558 + D5~82.87292817679558,
82.87292817679558: B4^82.87292817679558 + C5^82.87292817679558 + D5^82.87292817679558 + E5^82.87292817679558 + F5^82.87292817679558,
82.87292817679558: B5/82.87292817679558 + A5-82.87292817679558,
82.87292817679558: B5/82.87292817679558 + A5-82.87292817679558,
82.87292817679558: B5/82.87292817679558 + A5-82.87292817679558,
82.87292817679558: B5/82.87292817679558 + A5-82.87292817679558,
82.87292817679558: F5^82.87292817679558 + E5^82.87292817679558 + D5^82.87292817679558 + C5^82.87292817679558 + B4^82.87292817679558,
82.87292817679558: D5~82.87292817679558 + C5~82.87292817679558 + B4~82.87292817679558 + A4~82.87292817679558 + G4~82.87292817679558,
1906.0773480662983`
const player = "p"
const stone = "s"
const boom_midden = "m"
const boom_links = "l"
const boom_rechts = "r"
const wolf_links = "L"
const wolf_rechts = "R"
const achtergrond = "A"
const goal = "G"
const fakeGoal = "F"

setLegend(
  [ player, bitmap`
.......33333....
.......388833...
.......3080333..
........8888....
.........333....
.........3333...
...9983333333...
..9..9...3333...
..9999...3333...
...99....33333..
.........333333.
.........3333333
.........2...2..
.........2...2..
.........2...2..
........CC..CC..` ],
  [ stone, bitmap`
....LLLLLLLL....
...LLLLLLLLLL...
..LLL1LLLLDLLL..
.LLLL11LLDDLLLL.
LLLDDDDDDDDDDLLL
LLDDDDDDDDDDDDLL
LLDDDDDD11DDDDLL
LLDDDDDDD1DDDDLL
LLDDDDDDDDDDDDLL
LLDDDDDDDDDDDDLL
LLLDDDDDDDDDDLLL
LLLLLLDDDLLLLLLL
.LLLLLLLLLL1LLL.
..LLL111LL1LLL..
...LLLLLLLLLL...
....LLLLLLLL....` ],
  [ boom_midden, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCDDCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCDDCCCCC
CCCCCCCCDDDCCCCC
CCCCCCCCDDCCCCCC
CCDDCDDCCCCCCCCC
CCDCDDDCCCCCCCCC
CCCDDDCCCCCCCCCC
CCDCDDDCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ boom_links, bitmap`
.CDC....CCCCCCCC
....CC.CCCCCCCCC
.C...CCCCCCCCCCC
.DCCCCCCCCCCCCCC
....CCCCCDDCCCCC
..CCCCCCCDDDCCCC
.CD..CCCCDDDDCCC
.....CCCCCDDCCCC
...CCCCCCDCCCCCC
.CCD.CCCDDDCCCCC
.D...CCCCDDDCCCC
.....CCCCCDCCCCC
...DCCCCCCCCCCCC
..CC..CCCCCCCCCC
..C....CCCDDDDCC
....DDCCCDDCDDCC` ],
  [ boom_rechts, bitmap`
CCCCCCCCCCDD....
CCCCCCCCC....C..
CCCCCCCCCC..CC..
CCCCCCCCCCCCD...
CCCCCDCCCCC.....
CCCCDDCCCCC...D.
CCCCCDCDCCC.DCC.
CCCCCCDCCCCCC...
CCCCDDCCCCC.....
CCCDDDDCCCC..DC.
CCCCDDDCCCCCCC..
CCCCCDDCCCCC....
CCCCCCCCCCCCCCD.
CCDDCCCCCCC...C.
CCCDCCCCC.CC....
CCCDCCCC....CDC.` ],
  [ wolf_rechts, bitmap`
...11111........
..1111111.......
.111111111......
11111011111110..
111111111111111.
1111111111111111
1111111111111111
111111111112.2.2
111111111188....
11111111111.2.2.
1111111111111111
1111111111111111
11111111111.....
.111111111......
..1111111.......
...11111........` ],
  [ wolf_links, bitmap`
........11111...
.......1111111..
......111111111.
..01111111011111
.111111111111111
1111111111111111
1111111111111111
2.2.211111111111
....881111111111
.2.2.11111111111
1111111111111111
1111111111111111
.....11111111111
......111111111.
.......1111111..
........11111...` ],
  [ goal, bitmap`
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
...CCCCCCCCCC...
...CCCCCC77CC...
...CCCCCC77CC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCFFFFCCCC...
...CCFFFFCCCC...
...CCFFFFCCCC...
...CCFFHFCCCC...
...CCFFFFCCCC...
...CCFFFFCCCC...` ],
  [ fakeGoal, bitmap`
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
...CCCCCCCCCC...
...CCCCCC77CC...
...CCCCCC77CC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCFFFFCCCC...
...CCFFFFCCCC...
...CCFFFFCCCC...
...CCFFHFCCCC...
...CCFFFFCCCC...
...CCFFFFCCCC...` ],
  [ achtergrond, bitmap`
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
4444444444444444` ]
)
setBackground(achtergrond)
setSolids([ player, boom_links, boom_rechts, boom_midden, stone ])

let level = 0
const levels = [
  (map`
lmmmmmmmmmr
sssssssssss
lmmmmmmmmmr
lrlrlrlrlrl
RRRlmmmmmmr
RRRG.......
lmmmmr.lr.s
.....s.sR.L
.....spsR.L`),
  (map`
RRRRRRRRRRR
LLLLLLLLLLL
RRRRRRRRRRR
LLLLLLLLLLL
RRRRRRRRRRR
LLLG...LLLL
RRRRRR.RRRR
LLLLLL.LLLL
RRRRRRpRRRR`),
  (map`
lmmrs...Lsl
....s.R.Lsl
.LR.s.R.Lss
.LR...R....
.LR.lmrslr.
.LR.sR.....
.lmmrs.slmr
.slmrs.slrL
pslmrsGslrL`),
  (map`
lmmmmmmmmmr
RRRssssssss
R........Ls
R.R.RRRL.Ls
R.R.Rp.L.Ls
..R.RR.L.Ls
.RR....L.Ls
..RLLLLL.Ls
RGR......Ls`),
  (map`
FL...s...RF
LLLLLsRRRRR
.....s.....
.LLL.s.RRRR
LL...p.....
...LLs.RRRR
.L.LLs.....
LL.LLsRRRR.
FL.......RG`),
  (map`
...............
lmmmrs.R..L.G.G
..m.s.sRR.L.GG.
..m.sssR.LL.G.G
..m.s.sR..L.G.G
m...m..ss..R..L
.m.m..s..s.R..L
..m...s..s.R..L
.m....s..s.R..L
m......ss...RL.
...............`),
]

setMap(levels[level])

setPushables({
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

let startX = 0
let startY = 0

afterInput(() => {
  const playerSprite = getFirst(player)
  const goalSprite = getFirst(goal)

  // Check for collision with the goal sprite
  if (playerSprite.x === goalSprite.x && playerSprite.y === goalSprite.y) {
    playTune(gehaald)
    level++
    setMap(levels[level])
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      
    }
  }

  const wolvesLinks = getAll(wolf_links)
  
  wolvesLinks.forEach(wolf => {
    if (playerSprite.x === wolf.x && playerSprite.y === wolf.y) {
      // Collision with wolf detected, reset the level
      playTune(dood)
      setMap(levels[level])
    }
  })
  
  const wolvesRechts = getAll(wolf_rechts)
  
  wolvesRechts.forEach(wolf => {
    if (playerSprite.x === wolf.x && playerSprite.y === wolf.y) {
      // Collision with wolf detected, reset the level
      playTune(dood)
      setMap(levels[level])
    }
  })
})
