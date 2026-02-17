/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Wizard vs Bugs
@author: A. SHeard
@tags: []
@addedOn: 2026-02-16
*/

const player = "p"
const wall = "w"
const enemy = "e"
const treasure = "t"

let gameOver = false
let level = 0

setLegend(
  [ player, bitmap`
......0000......
....000000......
....00007F......
....0F...F......
.....F.3.F......
.....FFFFF......
.......FF.......
.....5FFF5......
....55DF755.....
....54DDD75.....
...55444D755....
...544D4D775....
...54DD4DH75....
..554DDDDH755...
..5444DDHH775...
..5444DDH7775...` ],
  [ wall, bitmap`
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
  [ enemy, bitmap`
................
....44444444....
...4444444444...
..444440004444..
..444400000444..
..444444444444..
..444404444044..
..444444444444..
..444444444444..
..444404444044..
..444444444444..
..444400000444..
..444440004444..
...4444444444...
....44444444....
................` ],
  [ treasure, bitmap`
......6666......
....66666666....
....664LLL066...
...66F4DLL0066..
..66F44DLL0006..
..66F4DLLL0066..
...664DDLL066...
....6644DL66....
.....6F4DL6.....
.....6FFDL6.....
....66LL4L66....
..666LLD44F66...
..6000LDD44466..
..6600LLDDL4F6..
...6600LLLL666..
....66666666....` ]
)

setSolids([ player, wall ])

const levels = [
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p.............t
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwww
w...........w
w.wwwwwwwww.w
w.wt......w.w
w.wwwwwww.w.w
w.........w.w
wwwwwwwwwww.w
............w
pwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwww
we........e...
w.............
w.............
wp...........t
w.............
w.............
w.....e......e
wwwwwwwwwwwwww`,

    map`
e.........www
..w...www...w
www.www..w.tw
.........www.
..........w..
.www.........
w....w...w...
p.wwww...ww..
www......w..e`,

    map`
p............
w.....e......
ww.......w...
..w.....ww..e
..ww....w..et
......e.w...e
e...ww..w....
.....www.....
..e...ww.....`,

    map`
wewewewewewew
w.w.w.w.w.w.w
w.w.w.w.w.w.w
w.w.w.w.w.w.w
p...........t
.w.w.w.w.w.w.
.w.w.w.w.w.w.
.w.w.w.w.w.w.
ewewewewewewe`,

     map`
...e....wt...
...e....w....
...e.....www.
...e......ew.
p..e......ew.
...e......e..
...e......e..
...e......e..
...e......e..`,
    
  map`
.....ete.....
......e......
......e......
eeeeeeeeeeeee
p............
eeeeeeeeeeeee
......e......
......e......
......e......`,

   map`
w.w.wwtww.w.w
e.e.e...e.e.e
e.e.e...e.e.e
e.e.e...e.e.e
p............
.w.w.w.w.w.w.
e.e.e.e.e.e.e
e.e.e.e.e.e.e
e.e.e.e.e.e.e`,

     map`
eeeeewtweeeee
eeeee.e.eeeee
eeeee...eeeee
wwwww...wwwww
p............
wwwwww.wwwwww
eeeee.e.eeeee
eeeee.e.eeeee
eeeee.e.eeeee`
  ]

setMap(levels[level])

setPushables({})

// Movement
onInput("w", () => {
  if (gameOver) return
  getFirst(player).y -= 1
})

onInput("s", () => {
  if (gameOver) return
  getFirst(player).y += 1
})

onInput("a", () => {
  if (gameOver) return
  getFirst(player).x -= 1
})

onInput("d", () => {
  if (gameOver) return
  getFirst(player).x += 1
})

afterInput(() => {
  if (gameOver) return
  moveEnemies()
  checkGameState()
})

function moveEnemies() {
  let enemies = getAll(enemy)

  for (let e of enemies) {
    let dir = Math.floor(Math.random() * 4)

    if (dir === 0) e.y -= 1
    if (dir === 1) e.y += 1
    if (dir === 2) e.x -= 1
    if (dir === 3) e.x += 1
  }
}

function checkGameState() {
  let p = getFirst(player)

  // Lose condition
  let enemies = getAll(enemy)
  for (let e of enemies) {
    if (p.x === e.x && p.y === e.y) {
      gameOver = true
      addText("Game Over! press i", { y: 4, color: color`3` })
      addText("to restart level", { y: 6, color: color`3` })
      return
    }
  }

  // Win condition (safe check)
  let t = getFirst(treasure)
  if (t && p.x === t.x && p.y === t.y) {
    level++

    if (level < levels.length) {
      clearText()
      gameOver = false
      setMap(levels[level])
    } else {
      clearText()
      gameOver = true
      addText("CONGRATS! YOU WIN!", { y: 5, color: color`H` })
    }
  }
}

// Restart current level
onInput("i", () => {
  clearText()
  gameOver = false
  setMap(levels[level])
})
