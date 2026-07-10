/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: box game
@description: A puzzle game similar to Sokuban.
@author: Augie Womack
@tags: ['tag']
@addedOn: 2025-00-00
*/

const player = "p"
const box = "b"
const flag = "f"
const wall = "w"

const melody = tune`
250: F4~250,
250: F4~250,
250: C4-250,
250: B4~250,
250: B4~250,
250: C4-250,
250: B5/250,
250: D5/250,
250: F4~250 + C5/250,
250: F4~250,
250: C4-250,
250: B4~250,
250: B4~250,
250: C4-250,
500,
250: F4~250,
250: F4~250,
250: C4-250,
250: B4~250,
250: B4~250,
250: C4-250 + B5/250,
250: D5/250,
250: C5/250,
250: F4~250,
250: F4~250,
250: C4-250,
250: B4~250,
250: B4~250,
250: C4-250,
500`

setLegend(
  [ player, bitmap`
.....00000......
....0222220.....
....0202020.....
....0222220.....
.....00000......
....0222220.....
...002222200....
..0.0222220.0...
..0.0222220.0...
....0222220.....
.....00000......
.....0...0......
.....0...0......
.....0...0......
.....0...0......
.....000.00.....` ],
  [ box, bitmap`
.00000000000000.
0CCLCFCFCFCFCFC0
0CCCLCFCFCFCFCF0
00CCCLCFCFCFCFC0
.0LCCCLCFCFCFCF0
.0CLCCCLCFCFCFC0
.0FCLCCCLCFCFCF0
.0CFCLCCCLCFCFC0
.0FCFCLCCCLCFCF0
.0CFCFCLCCCLCFC0
.0FCFCFCLCCCLC0.
.0CFCFCFCLCCCL0.
.0FCFCFCFCLCCC0.
0FCFCFCFCFCLCC00
0CFCFCFCFCFCLCC0
.00000000000000.` ],
  [ wall, bitmap`
0000000000000000
0111111111111110
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0000000000000000` ],
  [ flag, bitmap`
........00000...
......00666660..
....0066366630..
..006666363630..
.0666666363630..
..000666636360..
.....000666660..
........000060..
............00..
............00..
............00..
............00..
............00..
............00..
............00..
............00..` ]
)

let level = 0
const levels = [
  map`
wwwwwww
wp.w..w
w..b..w
w..w.fw
wwwwwww`,
  map`
www.wwww
wpb.b..w
w.wbw..w
w...w.fw
wwwwwwww`,
  map`
wwwwwwww
wp.w.b.w
w.bw.bfw
wb...b.w
w.w..b.w
wwwwwwww`,
  map`
wwwwwww.w
w..pw...w
wbb.w.w.w
w..wf.wbw
wbb.www.w
w....b...
wwwwwwwww`,
  map`
wwwwww
w....w
w.pb.w
w....w
wwwwww`
]

setMap(levels[level])

setSolids([ player, box, wall ]);
setPushables({ [player]: [ box ] })

const playback = playTune(melody, Infinity)

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

onInput("k", () => {
  setMap(levels[level])
})

afterInput(() => {
    if (tilesWith(player, flag).length > 0) {
    level += 1;
    
    if (level === levels.length - 1) {
      addText("you win!", { y: 4, color: color`3` })
      playback.end()
     setMap(levels[level]);
    } else {
      setMap(levels[level]);
    }
  }
});