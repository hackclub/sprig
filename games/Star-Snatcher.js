/*
@title: Star-Snatcher
@author: tap
@description:Catch 'em all! Run From Lava And Survive!
@tags: []
@addedOn: 2025-12-13
*/

const player = "p"
const star = "s"
const wall = "w"
const gem = "g"
const moon = "m"
const lava = "l"

setLegend(

[player, bitmap`
................
................
......0000......
.....0....0.....
.....0.00.0.....
.....0....0.....
......0000......
...3333333333...
...3333333333...
......3333......
......3333......
......3333......
......HH88......
......HH8H......
......HH8H......
......00LL......`],

[star, bitmap`
................
................
................
................
........6.......
.......666......
......66666.....
.....6666666....
......66666.....
.......666......
........6.......
................
................
................
................
................`],

[wall, bitmap`
0000000000000000
0000000000000000
00L0LLL00LLLLL00
00L1LLL00L0LLL00
00LLLLL00LLL1L00
00LL10L00LLL1L00
00LLL0L00L01LL00
0000000000000000
0000000000000000
00LLLLL00LLL0L00
00LL0LL00L0LLL00
00L1LLL00LLLLL00
00LL0LL00LL1LL00
00LLLL000LL0LL00
0000000000000000
0000000000000000`],

[gem, bitmap`
................
.......44.......
......4444......
.....442244.....
....44222244....
...4422222244...
....44222244....
.....442244.....
......4444......
.......44.......
................
................
................
................
................
................`],

[moon, bitmap`
................
......666.......
....666666......
...666..66......
..666...........
..666...........
..666...........
..666...........
...666..66......
....666666......
......666.......
................
................
................
................
................`],

[lava, bitmap`
3333333333333333
3300330033003333
3330033300330033
3300330033003333
3333003330033333
3300330033003333
3330033300330033
3300330033003333
3333003330033333
3300330033003333
3330033300330033
3300330033003333
3333003330033333
3300330033003333
3330033300330033
3333333333333333`]

)

setSolids([player, wall])

let level = 0
let lives = 3

const levels = [

map`
wwwwwwwww
wpwws...w
w.wwwww.w
w.wwwww.w
w...s...w
wwwwwwwww`,

map`
wwwwwwwww
wp..w...w
w..w.s..w
w..w....w
w...s...w
wwwwwwwww`,

map`
wwwwwwwww
wp..w.s.w
w.w.w.w.w
w.s...w.w
w.w.w...w
wwwwwwwww`,

map`
wwwwwwwww
wp.w.w..w
w.s.w.w.w
w.w...w.w
w..w...sw
wwwwwwwww`,

map`
wwwwwwwwwwww
w...w...wwsw
w.w.w.w....w
wp..w.w.wwww
w.w.w.w.ws.w
w.w...w.ww.w
w.w.w.w....w
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
ww.......w.w
w.ws.w.www.w
w.wwww...w.w
ws.w...w...w
ww.w.w.w.w.w
w....w.ww.pw
wwwwwwwwwwww`,

map`
wwwwwwwwww
wp....g..w
w.wwwww..w
w......s.w
w..g.....w
wwwwwwwwww`,

map`
wwwwwwwwww
wp.......w
w.w.www..w
w.w.m.w..w
w...s....w
wwwwwwwwww`,

map`
wwwwwwwwwwww
wp..w.....sw
w.w.w.www..w
w.w...g.w..w
w.www.w.w..w
w.....w....w
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp......g..w
w.www.www..w
w...w...w..w
www.w.w.w..w
ws..m.w....w
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wpl...l...sw
w.www.www..w
w...w......w
www.w.www..w
w.......l..w
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.llllll..w
w..l....l..w
w..l.gg.l..w
w..llll.l..w
w....m..s..w
wwwwwwwwwwww`,

map`
wwwwwwwwwwwwww
wp....w....s.w
w.lll.w.lll..w
w.l.....l....w
w.l.www.l.gg.w
w.....m......w
wwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwww
wp.g....w...sw
w.wwwlw.w.wwww
w....lw.w....w
w.wwwlw.www..w
w...mll......w
wwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwww
wp....l.....sw
w.www...www..w
w...w.l...w..w
www.w.l.w.w..w
w.g...l..m...w
wwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwww
wp..llllll...w
w.....wwwl...w
w.g.l.ggwl.s.w
w...lww......w
w...llllll.m.w
wwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwww
wp......w.....sw
w.wwwww.w.www..w
w.w...w.w...w..w
w.w.g.w.www.w..w
w.w...w...w.w..w
w.www.www.w.w..w
w...m..........w
wwwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwww
wp..g..l..m..w
w.www.ll.www.w
w....l....w..w
w.wwwlwww.w..w
ws...........w
wwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwww
wp..lllllllw..sw
w.........lw.www
w.g.l.www.lwgg.w
w...l.www.lwww.w
w...l...w...m..w
w...lllllllwwwww
wwwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwww
wp....w......w
w.www.w.wwwl.w
w.w...w...ll.w
w.w.www.wlll.w
w...g...w...sw
w.wwwwww...m.w
wwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwww
wp.g....l.....w
w.wwwww.l.www.w
w.....w.l.w...w
w.www.w...w.w.w
w.w...w.l.w.w.w
w.w.www.l.w.w.w
w...m...l...s.w
wwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwww
wp....ll.......w
w.www.l..l.www.w
w.g...l..l.....w
wwwww.l..l.www.w
w.....l..l...m.w
w.www....l.www.w
ws....llll.....w
wwwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwww
wp..g.....w...sw
w.www.www.w.www.
w.w...w...w....w
w.w.l.l.l.www..w
w...l.m.l......w
www.l.l.l.www..w
w..............w
wwwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwww
wp.g...lll.....w
w.www.l....lww.w
w.....l.gg.l...w
w.www.l....l.w.w
w...w.llllll.w.w
w.m.w........s.w
wwwwwwwwwwwwwwww`

]

setMap(levels[level])

function drawHUD() {

  clearText()

  let hearts = ""

  for (let i = 0; i < lives; i++) {
    hearts += "<3"
  }

  addText(hearts, {
    x: 1,
    y: 0,
    color: color`3`
  })

  addText("LV:" + (level + 1), {
    x: 11,
    y: 0,
    color: color`4`
  })
}

function loseLife() {

  lives--

  if (lives <= 0) {

    level = 0
    lives = 3

  }

  setMap(levels[level])
  drawHUD()
}

drawHUD()

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {

  if (tilesWith(player, lava).length > 0) {
    loseLife()
    return
  }

  const stars = tilesWith(player, star)
  const gems = tilesWith(player, gem)
  const moons = tilesWith(player, moon)

  if (stars.length > 0) {
    stars.forEach(tile => tile[1].remove())
  }

  if (gems.length > 0) {
    gems.forEach(tile => tile[1].remove())
  }

  if (moons.length > 0) {
    moons.forEach(tile => tile[1].remove())
  }

  if (
    getAll(star).length === 0 &&
    getAll(gem).length === 0 &&
    getAll(moon).length === 0
  ) {

    level++

    if (level < levels.length) {

      setMap(levels[level])
      drawHUD()

    } else {

      clearText()

      addText("YOU WIN!", {
        x: 4,
        y: 6,
        color: color`3`
      })

      addText("STAR SNATCHER", {
        x: 1,
        y: 8,
        color: color`4`
      })
    }
  }
})
