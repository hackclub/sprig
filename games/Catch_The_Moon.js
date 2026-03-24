/*
@title: Catch The Moon
@author: RoboticsKid
@description: Get the sun to the moon while avoiding the stars!
@tags: [ "strategy" ]
@addedOn: 2025-11-09
*/

/*
Remixing and want help? Here:
Player - The sun
Obstacle - The star
Target - The moon

Controls - WASD

General Tips & Notes:
- The sun gets 3 lives.
- The sun can pass through the interstellar clouds but a star cannot.
- Stars always move sideways first unless blocked or already in line with the sun.
- If the sun and a star are on the moon at the same time then the sun gets the points and no lives are lost.
- Getting confused which sprite is the player, obstacle, and target? Try tracking mode!
*/

// **************************************************
//                      Setup
// **************************************************

var score = 0
var lives = 3
var sunX = 0
var sunY = 0
var inc = 0
var finalShow = 0
var isPlaying = false
var isTracking = false
var isInfinite = false
var noGame = false
var lifeLost = false

const startMusic = tune`
461.53846153846155: F5/461.53846153846155,
461.53846153846155: A4/461.53846153846155,
461.53846153846155: G5/461.53846153846155,
461.53846153846155: F5/461.53846153846155,
461.53846153846155: A5/461.53846153846155,
461.53846153846155: A5~461.53846153846155,
461.53846153846155: G5~461.53846153846155,
461.53846153846155: F5~461.53846153846155,
461.53846153846155: E5/461.53846153846155,
461.53846153846155: G5/461.53846153846155,
461.53846153846155: D5/461.53846153846155,
461.53846153846155: E5/461.53846153846155,
461.53846153846155: B4/461.53846153846155,
461.53846153846155: B4~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: E5/461.53846153846155,
461.53846153846155: G5/461.53846153846155,
461.53846153846155: D5/461.53846153846155,
461.53846153846155: E5/461.53846153846155,
461.53846153846155: B4/461.53846153846155,
461.53846153846155: B4~461.53846153846155,
461.53846153846155: A4~461.53846153846155,
461.53846153846155: G4~461.53846153846155,
461.53846153846155: B4/461.53846153846155,
461.53846153846155: C5/461.53846153846155,
461.53846153846155: B4/461.53846153846155,
461.53846153846155: C5/461.53846153846155,
461.53846153846155: A4/461.53846153846155,
461.53846153846155: A4/461.53846153846155,
461.53846153846155: A4/461.53846153846155,
461.53846153846155: C5/461.53846153846155`
const gamePlayMusic = tune`
500: G4~500,
500: F4~500,
500: G5~500,
500: F5~500,
500: G5~500,
500: B5~500,
500: B4~500,
500: F4~500,
500: C5~500,
500: F5~500,
500: G5~500,
500: F5~500,
500: G5~500,
500: B5~500,
500: C5~500 + A4~500,
500: F4~500 + E5~500,
500: C5~500 + B4~500,
500: F5~500,
500: B4~500 + G4~500,
500: E5~500 + A5~500,
500: D5~500 + B4~500,
500: F5~500 + G4~500,
500: B4~500 + G5~500,
500: F5~500 + C5~500,
500: E5~500 + A4~500,
500: F4~500 + B4~500,
500: G4~500 + E4~500,
500: C5~500,
500: G4~500,
500: F4~500,
500: E4~500,
500: F4~500`
const gameOverMusic = tune`
638.2978723404256,
638.2978723404256: C5-638.2978723404256,
638.2978723404256: C5^638.2978723404256,
638.2978723404256: C5~638.2978723404256,
638.2978723404256: C5~638.2978723404256,
638.2978723404256: C5~638.2978723404256,
638.2978723404256: C5~638.2978723404256,
1276.595744680851,
638.2978723404256: C5-638.2978723404256,
638.2978723404256: C5-638.2978723404256,
638.2978723404256: C5^638.2978723404256,
638.2978723404256: C5^638.2978723404256,
638.2978723404256: C5~638.2978723404256,
638.2978723404256: C5~638.2978723404256,
1276.595744680851,
638.2978723404256: C4-638.2978723404256,
638.2978723404256: C4^638.2978723404256,
638.2978723404256: C4~638.2978723404256,
638.2978723404256: C4~638.2978723404256,
638.2978723404256: C4~638.2978723404256,
638.2978723404256: C4~638.2978723404256,
1276.595744680851,
638.2978723404256: C4-638.2978723404256,
638.2978723404256: C4-638.2978723404256,
638.2978723404256: C4^638.2978723404256,
638.2978723404256: C4^638.2978723404256,
638.2978723404256: C4~638.2978723404256,
638.2978723404256: C4~638.2978723404256,
638.2978723404256`
const finalLevelMusic = tune`
500: G5^500,
500: A5^500,
500: E5^500,
500: G5^500,
500: F5^500,
500,
500: F5^500,
500: G5^500,
500: D5^500,
500: F5^500,
500: E5^500,
500,
500: C5^500,
500: D5^500,
500: E5^500,
500: A5^500,
500: G5^500,
500: C5^500,
500: E5^500,
500: D5^500,
500: C5^500,
500: C5^500,
500: C5^500,
500,
500: A5^500,
500: A5^500,
500: A5^500,
500,
500: E5^500,
500: D5^500,
500: C5^500,
500`
const youWinMusic = tune`
196.07843137254903: A4~196.07843137254903,
196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903,
196.07843137254903: C5~196.07843137254903,
196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903: G4~196.07843137254903,
196.07843137254903,
196.07843137254903: G4~196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903,
196.07843137254903: C5~196.07843137254903,
196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903: G5~196.07843137254903,
196.07843137254903: E5~196.07843137254903,
196.07843137254903: E5~196.07843137254903,
196.07843137254903: E5~196.07843137254903,
196.07843137254903: E5~196.07843137254903,
196.07843137254903: C5~196.07843137254903,
196.07843137254903: C5~196.07843137254903,
196.07843137254903: C5~196.07843137254903,
196.07843137254903: C5~196.07843137254903,
196.07843137254903: A4~196.07843137254903,
196.07843137254903,
196.07843137254903: A4~196.07843137254903,
196.07843137254903`
const infiniteMusic = tune`
545.4545454545455: E5^545.4545454545455 + B4^545.4545454545455,
545.4545454545455,
545.4545454545455: E5^545.4545454545455 + B4^545.4545454545455,
545.4545454545455,
545.4545454545455: E5^545.4545454545455 + B4^545.4545454545455,
545.4545454545455,
545.4545454545455: E5^545.4545454545455 + B4^545.4545454545455,
545.4545454545455,
545.4545454545455: E5^545.4545454545455 + B4^545.4545454545455,
545.4545454545455,
545.4545454545455: E5^545.4545454545455 + B4^545.4545454545455,
545.4545454545455,
545.4545454545455: F5~545.4545454545455 + C5~545.4545454545455,
545.4545454545455: E5~545.4545454545455 + B4~545.4545454545455,
545.4545454545455: D5~545.4545454545455 + A4~545.4545454545455,
545.4545454545455: F5~545.4545454545455 + C5~545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455,
545.4545454545455: B4~545.4545454545455,
545.4545454545455: A4~545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455: B4~545.4545454545455`
const noGameMusic = tune`
500: G4~500,
500: A4~500,
500: B4~500,
500: C5~500,
500: D5~500,
500: C5~500,
500: B4~500,
500: A4~500,
500: G4~500,
500: A4~500,
500: B4~500,
500,
500: G4~500,
500: A4~500,
500: B4~500,
500,
500: D5~500,
500: C5~500,
500: B4~500,
500: A4~500,
500: G4~500,
500: A4~500,
500: B4~500,
500: A4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500,
500: G4~500,
500: G4~500,
500: G4~500,
500`
var musicPlayBack = null

const player = "p"
const aidPlayer = "P"
const obstacle = "o"
const aidObstacle = "O"
const evilObstacle = "e"
const finalTarget = "f"
const target = "t"
const aidTarget = "T"
const cloud = "c"
const black = "b"
const layerPart1 = "1"
const layerPart2 = "2"
const layerPart3 = "3"
const layerPart4 = "4"
const shadowTarget = "s"
const background = "B"

setLegend(
  [player, bitmap`
................
......999.......
.....996999.....
....99666969....
...9699999969...
..969966669999..
..9996666669699.
.99696666669669.
.96696666669699.
.9969666666999..
..999966669969..
...9699999969...
....96966699....
.....999699.....
.......999......
................`],
  [aidPlayer, bitmap`
................
......999.......
.....996999.....
....99666969....
...9699999969...
..969966669999..
..9996666669699.
.99696644669669.
.96696644669699.
.9969666666999..
..999966669969..
...9699999969...
....96966699....
.....999699.....
.......999......
................`],
  [obstacle, bitmap`
......333.......
......3C3.......
......3333......
.....33CC3......
.....3CCCC3.....
333333CCCC333333
3C3CCCCCCCCCC3C3
33CCCCCCCCCCCC33
.3CCCCCCCCCCCC3.
..3CCCCCCCCCC3..
...3CCCCCCCC3...
...3CCC33CCC3...
..33C33..33C33..
..3C33....33C3..
..333......333..
................`],
  [aidObstacle, bitmap`
......333.......
......3C3.......
......3333......
.....33CC3......
.....3CCCC3.....
333333CCCC333333
3C3CCCCCCCCCC3C3
33CCCCC33CCCCC33
.3CCCCC33CCCCC3.
..3CCCCCCCCCC3..
...3CCCCCCCC3...
...3CCC33CCC3...
..33C33..33C33..
..3C33....33C3..
..333......333..
................`],
  [evilObstacle, bitmap`
......555.......
......545.......
......5555......
.....55445......
.....545545.....
5555554554555555
5454545445454545
5554545555454555
.54545455454545.
..545554455545..
...5445445445...
...5554554555...
..55455..55455..
..5455....5545..
..555......555..
................`],
  [finalTarget, bitmap`
....65555556....
...5227222725...
..577222222225..
.52772227722225.
6722222277222226
5777227222222725
5777222222222225
5722222222222275
5727222727727225
5722222227722225
5727277222222225
6722277277722726
.57222227772225.
..572272777225..
...5777777775...
....65555556....`],
  [target, bitmap`
....LLLLLLLL....
...L77577757L...
..L5577777777L..
.L755777557777L.
L57777775577777L
L55577577777757L
L55577777777777L
L57777777777775L
L57577757557577L
L57777777557777L
L57575577777777L
L57775575557757L
.L577777555777L.
..L5775755577L..
...L55555555L...
....LLLLLLLL....`],
  [aidTarget, bitmap`
....LLLLLLLL....
...L77577757L...
..L5577777777L..
.L755777557777L.
L57777775577777L
L55577577777757L
L55577777777777L
L57777744777775L
L57577744557577L
L57777777557777L
L57575577777777L
L57775575557757L
.L577777555777L.
..L5775755577L..
...L55555555L...
....LLLLLLLL....`],
  [cloud, bitmap`
HH777HH7HH..H778
7778HH7....HH788
H888H77.HHHH778H
887777.HH77778H7
H7777..H77H8HH77
77....H77H88777.
H.HH7H77H887HHH.
..77777H8877...7
H77H8888H77.7777
77H8777777.77H88
88877..H..77H887
H77H.....7787777
7HH.777777H7HHH.
...77HHH8H7H...7
.H77H888HH7..H7H
H77888H777..777H`],
  [black, bitmap`
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
  [layerPart1, bitmap `
C.C.3.3.3.9.F.F.
.C.3.3.3.9.F.F.F
C.C.3.3.9.9.9.F.
.C.C.3.3.9.9.9.F
C.C.3.3.3.9.9.F.
.C.C.3.3.9.9.9.9
L.C.C.3.3.9.9.9.
.C.L.C.3.3.3.9.3
L.L.L.C.C.3.3.9.
.L.L.C.C.C.3.9.3
L.L.L.C.C.3.3.3.
.1.L.C.C.C.3.3.3
1.1.L.C.C.C.3.3.
.1.L.L.L.C.3.3.3
1.1.1.L.L.C.C.C.
.1.1.L.L.C.C.C.C`],
  [layerPart2, bitmap `
F.F.F.F.9.3.3.3.
.F.F.9.9.9.3.3.3
F.9.9.9.9.3.3.3.
.9.9.9.3.9.3.3.3
F.9.9.3.3.3.3.C.
.9.9.9.3.3.C.C.C
9.9.9.3.C.C.C.C.
.9.3.3.C.C.C.L.L
3.3.3.3.C.C.L.L.
.3.3.3.C.C.C.L.L
3.3.3.C.C.C.L.L.
.3.3.C.L.L.L.1.1
3.C.C.L.L.L.L.1.
.C.C.C.L.L.1.1.1
C.C.C.C.L.1.1.1.
.C.C.L.L.L.1.1.1`],
  [layerPart3, bitmap `
3.3.C.C.L.L.1.1.
.3.3.C.L.L.1.1.1
3.3.3.C.L.L.L.1.
.3.3.C.C.C.L.1.1
3.3.3.C.C.C.L.1.
.9.9.3.C.C.L.L.L
9.9.3.C.C.C.L.L.
.9.3.3.C.C.L.L.L
F.9.3.3.3.C.L.C.
.9.9.9.3.3.C.C.L
F.9.9.9.3.3.C.C.
.F.9.9.3.3.3.C.C
F.9.9.9.3.3.C.C.
.F.9.9.9.3.3.C.C
F.F.F.9.9.3.3.C.
.F.F.F.9.3.3.C.C`],
  [layerPart4, bitmap `
1.1.1.L.L.L.C.C.
.1.1.1.L.C.C.C.C
1.1.1.L.L.C.C.C.
.1.L.L.L.L.C.C.3
1.1.L.L.L.C.3.3.
.L.L.C.C.C.3.3.3
L.L.C.C.C.3.3.3.
.L.L.C.C.3.3.3.3
L.L.C.C.C.3.3.9.
.C.C.C.C.3.9.9.9
C.C.C.3.3.9.9.9.
.C.3.3.3.3.9.9.F
3.3.3.9.3.9.9.9.
.3.3.3.9.9.9.9.F
3.3.9.9.9.9.F.F.
.3.9.9.9.F.F.F.F`],
  [shadowTarget, bitmap`
....LLLLLLLL....
...LLLLLLLLLL...
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
...LLLLLLLLLL...
....LLLLLLLL....`],
  [background, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`]
)

const layer = [layerPart1, layerPart2, layerPart3, layerPart4]

setSolids([obstacle, aidObstacle, cloud, black])
setPushables({
  [cloud]: [obstacle] })

var level = 0
var lastLevel = 5
var infiniteLevel = 6
const levels = [
  map`
bbbo
bbbp
bbbt`,
  map`
..c..o
.c..c.
.p....
.ct.c.
...c..`,
  map`
...o..
.c..c.
..t.c.
oc....
.....p`,
  map`
.....p
.c....
..ot..
....c.
.....o`,
  map`
..c..c..
c..co.co
oc..c.tc
.pc..c..
c..c.oc.
.c..c..c`,
  map`
tttttt
tttttt
tttttt
tttptt
tttttt`,
  map`
c...c...c
..c...co.
.....c...
c.c.p..c.
..c.....c
c...c....
t.c...c.c`,
  map`
..oc...c..
......o.c.
.c..p.....
...c.....c
.o....ct..
c....c....`,
  map`
b`
]
setLevel(level)
setBackground(background)
gameStart()

// **************************************************
//                  Player Controls
// **************************************************

onInput("w", () => {
  if (isPlaying)
    getFirst(isTracking ? aidPlayer : player).y--
})

onInput("s", () => {
  if (isPlaying)
    getFirst(isTracking ? aidPlayer : player).y++
})

onInput("a", () => {
  if (isPlaying)
    getFirst(isTracking ? aidPlayer : player).x--
  else if (level == 0)
    help()
})

onInput("d", () => {
  if (isPlaying && !noGame)
    getFirst(isTracking ? aidPlayer : player).x++
  else if (!lifeLost && finalShow == 0 && !noGame) {
    gameStart()
    isTracking = false
    isInfinite = false
  }
})

onInput("j", () => {
  if (level == 0 && !isInfinite) {
    playMusic(gamePlayMusic)
    isPlaying = true
    level = 1
    setLevel(level)
    updateCounters(color`2`, color`2`, true)
  } else if (level == 0) {
    isPlaying = true
    level = infiniteLevel
    setLevel(level)
    updateCounters(color`2`, color`2`, true)
  }
})

onInput("k", () => {
  if (level == 0) {
    playMusic(gamePlayMusic)
    isPlaying = true
    isTracking = true
    level = 1
    setLevel(level)
    updateCounters(color`2`, color`2`, true)
  }
})

onInput("i", () => {
  if (level == 0) {
    playMusic(infiniteMusic)
    isPlaying = true
    isInfinite = true
    level = infiniteLevel
    setLevel(level)
    updateCounters(color`2`, color`2`, true)
  }
})

onInput("l", () => {
  if (level == 0) {
    playMusic(noGameMusic)
    level = levels.length - 1
    setLevel(level)
    noGame = true
    addText("l: esc", {
      x: 14,
      y: 13,
      color: color`8`
    })
  } else if (noGame) {
    gameStart()
    noGame = false
  }
})

// **************************************************
//                   Update Screen
// **************************************************

afterInput(() => {
  if (isPlaying && (level < lastLevel || isInfinite)) {
    moveObstacles()
    updateCounters(color`2`, color`2`)
    if (playerOnTarget()) {
      score++
      updateCounters(color`4`, color`2`)
    } else if (playerHit(obstacle)) {
      loseLives()
    } else if (isInfinite && score > 60) {
      if (playerHit(evilObstacle))
        loseLives()
    }

    if (score > 100) {
      youAreCrazy()
    } else if (playerOnTarget() && score % 5 == 0 && score != 0 && !isInfinite) {
      level++
      setLevel(level)
      updateCounters(color`4`, color`2`)
    } else if (playerOnTarget() && score % 5 == 0 && score != 0) {
      if (getAll(cloud).length < 4) {
        for (let i = 0; i < getAll(cloud).length; i++) {
          getAll(cloud)[i].x = Math.floor(Math.random() * width())
          getAll(cloud)[i].y = Math.floor(Math.random() * height())
        }
      } else getAll(cloud)[Math.floor(Math.random() * getAll(cloud).length)].remove()
      if (score % 20 == 0 && score < 80) {
        addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), obstacle)
        addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), target)
      }
      if (score % 10 == 0 && score > 60)
        addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), evilObstacle)
      randomizeObstacles()
      randomizeTarget()
    } else if (playerOnTarget()) {
      randomizeObstacles()
      randomizeTarget()
    }
  } else if (isPlaying && level == lastLevel) {
    updateCounters(color`2`, color`2`)
    let moon = getAll(isTracking ? aidTarget : target)
    let sun = getFirst(isTracking ? aidPlayer : player)
    for (let i = 0; i < moon.length; i++) {
      if (sun.x == moon[i].x && sun.y == moon[i].y) {
        moon[i].remove()
        score++
        updateCounters(color`4`, color`2`)
      }
    }
    if (score == 49 && !getTile(3, 3).some(sprite => sprite.type === finalTarget)) {
      isPlaying = false
      finalShow = 1
      addSprite(3, 0, shadowTarget)
    } else if (score == 49 && finalShow != 1) {
      if (playerOnTarget()) {
        score == 50
        getFirst(finalTarget).remove()
        isPlaying = false
        finalShow = 2
      }
    }
  }
})

var lifeLostLoop = setInterval(() => {
  if (!isPlaying && lifeLost) {
    if (inc % 2 == 0 && inc != 0)
      getFirst(isTracking ? aidPlayer : player).remove()
    else addSprite(sunX, sunY, isTracking ? aidPlayer : player)
    inc--
    if (inc == 0) {
      randomizeObstacles()
      randomizeTarget()
      isPlaying = true
      lifeLost = false
      if (lives == 0)
        gameOver()
    }
  }
}, 300)

var finalLevelPt1Loop = setInterval(() => {
  if (!isPlaying && finalShow == 1) {
    if (getFirst(shadowTarget).y < 3)
      getFirst(shadowTarget).y++
    if (getFirst(shadowTarget).y == 3) {
      addSprite(3, 3, finalTarget)
      isPlaying = true
      finalShow = 0
    }
  }
}, 800)

var finalLevelPt2Loop = setInterval(() => {
  if (!isPlaying && finalShow == 2) {
    clearText()
    updateCounters(color`6`, color`6`)
    if (score < 0) {
      finalShow = 0
      youWon()
    }
    score -= 1
  }
}, 100)

var noGameLoop = setInterval(() => {
  if (!isPlaying && noGame) {
    for (let a = 0; a < 4; a++) {
      for (let b = 0; b < getAll(layer[a]).length; b++) {
        if (getAll(layer[a])[b].x % 2 == 0)
          getAll(layer[a])[b].x++
        else getAll(layer[a])[b].x--
      }
    }
    for (let i = 0; i < getAll(cloud).length; i++) {
      if (getAll(cloud)[i].x == width() - 1)
        getAll(cloud)[i].x = 0
      else getAll(cloud)[i].x++
    }
    for (let i = 0; i < getAll(obstacle).length; i++) {
      if (getAll(obstacle)[i].x == width() - 1)
        getAll(obstacle)[i].x = 0
      else if (getAll(obstacle)[i].y == height() - 1)
        getAll(obstacle)[i].y = 0
      else getAll(obstacle)[i].y++
    }
    getFirst(player).x = Math.floor(Math.random() * 4 + 3)
    getFirst(player).y = Math.floor(Math.random() * (height() - 1))
    randomizeTarget()
  }
}, 1000)

// **************************************************
//                    Functions
// **************************************************

function playerOnTarget() {
  let moon = getAll(level == lastLevel && score == 49 ? finalTarget : isTracking ? aidTarget : target)
  let sun = getFirst(isTracking ? aidPlayer : player)
  for (let i = 0; i < moon.length; i++)
    if (sun.x == moon[i].x && sun.y == moon[i].y)
      return true
  return false
}

function playerHit(starVersion) {
  let star = getAll(isTracking ? aidObstacle : starVersion)
  let sun = getFirst(isTracking ? aidPlayer : player)
  for (let i = 0; i < star.length; i++)
    if (sun.x == star[i].x && sun.y == star[i].y)
      return true
  return false
}

function randomizeTarget() {
  let moon = getAll(isTracking ? aidTarget : target)
  let sun = getFirst(isTracking ? aidPlayer : player)
  for (let a = 0; a < moon.length; a++) {
    let x = Math.floor(Math.random() * width())
    let y = Math.floor(Math.random() * height())
    moon[a].x = x
    moon[a].y = y
    if (x == sun.x && y == sun.y)
      randomizeTarget()
  }
}

function randomizeObstacles() {
  let star = getAll(isTracking ? aidObstacle : obstacle)
  let sun = getFirst(isTracking ? aidPlayer : player)
  for (let a = 0; a < star.length; a++) {
    let x, y
    do {
      x = Math.floor(Math.random() * width())
      y = Math.floor(Math.random() * height())
    } while (x == sun.x && y == sun.y)
    star[a].x = x
    star[a].y = y
  }
}

function moveObstacles() {
  let star = getAll(isTracking ? aidObstacle : obstacle)
  let sun = getFirst(isTracking ? aidPlayer : player)
  for (let i = 0; i < star.length; i++) {
    let prevX = star[i].x
    let prevY = star[i].y
    let errX = star[i].x - sun.x
    let errY = star[i].y - sun.y

    if (star[i].y == prevY)
      star[i].x -= Math.sign(errX);

    if (errX == 0 || star[i].x == prevX)
      star[i].y -= Math.sign(errY);
  }
}

function setLevel(l) {
  setMap(levels[l])
  clearText()
  if (isTracking) {
    getFirst(player).type = aidPlayer
    getAll(obstacle).forEach(sprite => sprite.type = aidObstacle)
    getAll(target).forEach(sprite => sprite.type = aidTarget)
  }
  if (level == lastLevel)
    playMusic(finalLevelMusic)
  for (let x = 0; x < width(); x++) { //set background
    for (let y = 0; y < height(); y++) {
      if (x % 2 == 0 && y % 2 == 0)
        addSprite(x, y, layer[1])
      else if (y % 2 == 0)
        addSprite(x, y, layer[0])
      else if (x % 2 == 0)
        addSprite(x, y, layer[2])
      else
        addSprite(x, y, layer[3])
    }
  }
}

function updateCounters(scoreColor, livesColor, reset = false) {
  if (reset) {
    score = 0
    lives = 3
  }
  addText("o: " + score, {
    x: 2,
    y: 1,
    color: scoreColor
  })
  addText("*: " + lives, {
    x: 14,
    y: 1,
    color: livesColor
  })
}

function loseLives() {
  lives--
  updateCounters(color`2`, color`3`)
  sunX = getFirst(isTracking ? aidPlayer : player).x
  sunY = getFirst(isTracking ? aidPlayer : player).y
  inc = 10
  isPlaying = false
  lifeLost = true
}

function gameStart() {
  playMusic(startMusic)
  isPlaying = false
  isTracking = false
  level = 0
  setLevel(level)
  addText("Game Start", {
    x: 2,
    y: 2,
    color: color`2`
  })
  addText("j: Normal\n\nk: Tracking\n\ni: Infinite\n\nl: No Game\n\na: Help", {
    x: 2,
    y: 4,
    color: color`2`
  })
}

function gameOver() {
  playMusic(gameOverMusic)
  isPlaying = false
  level = 0
  setLevel(level)
  addText("Game Over", {
    x: 2,
    y: 2,
    color: color`3`
  })
  addText("j: Play\n   Again?\n\nd: No.", {
    x: 2,
    y: 4,
    color: color`2`
  })
}

function youWon() {
  playMusic(youWinMusic)
  isPlaying = false
  level = 0
  setLevel(level)
  addText("You Win!", {
    x: 2,
    y: 2,
    color: color`6`
  })
  addText("The sun and\nmoon are\nreunited.\n\nj: Play\n   Again?\n\nd: No.", {
    x: 2,
    y: 4,
    color: color`2`
  })
}

function youAreCrazy() {
  playMusic(youWinMusic)
  isPlaying = false
  isInfinite = false
  level = 0
  setLevel(level)
  addText("Thanks for\nplaying this\nlong!", {
    x: 2,
    y: 2,
    color: color`7`
  })
  addText("Man you are\ncrazy.", {
    x: 2,
    y: 6,
    color: color`8`
  })
  addText("j: Play\n   Again?\n\nd: Nope", {
    x: 2,
    y: 9,
    color: color`2`
  })
}

function playMusic(music, play = 'play') {
  if (play == 'end') {
    musicPlayBack.end()
    musicPlayBack = null
  } else {
    if (musicPlayBack)
      musicPlayBack.end()
    musicPlayBack = playTune(music, Infinity)
  }
}

function help() {
  playMusic(gamePlayMusic, 'end')
  level = 8
  setLevel(level)
  addText("Controls - WASD\n\nPlayer - The sun\nObstacle - The star\nTarget - The moon\n\nGoal: reunite the\nsun & moon", {
    x: 1,
    y: 2,
    color: color`2`
  })
  addText("d: back", {
    x: 12,
    y: 13,
    color: color`2`
  })
}
