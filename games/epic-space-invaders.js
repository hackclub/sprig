/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: epic space invaders
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const bg = "b"
const laser = "1"
const laser2 = "2"
const laser3 = "3"
const enemy = "e"

setLegend(
  [ player, bitmap`
.......LL.......
......L11L......
......L11L......
.1...L1111L...1.
.1...L1111L...1.
.1..L117711L..1.
.LL.L175571L.L1.
L1.L11755711L.1L
L1.L11755711L.1L
L1.L11177111L.1L
L1.L11111111L.1L
.LLL11111111LLL.
.L11111LL11111L.
.L111LL..LL111L.
L11LL......LL11L
LLL..........LLL` ],
  [ bg, bitmap`
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
0000000000000000` ],
  [ laser, bitmap`
................
................
................
................
................
................
.6..............
.6..............
.6............6.
.6............6.
.6............6.
.6............6.
.6............6.
..............6.
..............6.
................` ],
  [ laser2, bitmap`
................
................
................
................
................
................
.6..............
.6..............
.6............6.
.6............6.
.6............6.
.6............6.
.6............6.
..............6.
..............6.
................` ],
  [ laser3, bitmap`
................
................
................
................
................
................
.6..............
.6..............
.6............6.
.6............6.
.6............6.
.6............6.
.6............6.
..............6.
..............6.
................` ],
  [ enemy, bitmap`
................
................
.L111LL..LL111L.
.L11111LL11111L.
.LLL11111111LLL.
...L11111111L...
...L11199111L...
...L11933911L...
...L11933911L...
....L193391L....
....L119911L....
.....L1111L.....
.....L1111L.....
......L11L......
......L11L......
.......LL.......` ]
)

setSolids([
  
])

let level = 0
const levels = [
  map`
.........
........e
.........
.........
.........
.........
.........
.........
....p....`
]

setMap(levels[level])
setBackground(bg)

setPushables({
  
})

let won

onInput("a", () => {
  if (!won) getFirst(player).x -= 1
})

onInput("d", () => {
  if (!won) getFirst(player).x += 1
})

let enemy_alive = true
let enemiesDead = 0

function doLaser(l) {
    addSprite(getFirst(player).x, 6, l)
    setTimeout(() => {
        if (!won) getFirst(l).y -= 1
        if (enemy_alive && getFirst(l).x == getFirst(enemy).x && getFirst(l).y == getFirst(enemy).y) {
            getFirst(enemy)?.remove();
            enemiesDead++
            addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
            enemy_alive = false
            if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
        }
    }, 100)
    setTimeout(() => {
        if (!won) getFirst(l).y -= 1
        if (enemy_alive && getFirst(l).x == getFirst(enemy).x && getFirst(l).y == getFirst(enemy).y) {
            getFirst(enemy)?.remove();
            enemiesDead++
            addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
            enemy_alive = false
            if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
        }
    }, 200)
    setTimeout(() => {
        if (!won) getFirst(l).y -= 1
        if (enemy_alive && getFirst(l).x == getFirst(enemy).x && getFirst(l).y == getFirst(enemy).y) {
            getFirst(enemy)?.remove();
            enemiesDead++
            addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
            enemy_alive = false
            if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
        }
    }, 300)
    setTimeout(() => {
        if (!won) getFirst(l).y -= 1
        if (enemy_alive && getFirst(l).x == getFirst(enemy).x && getFirst(l).y == getFirst(enemy).y) {
            getFirst(enemy)?.remove();
            enemiesDead++
            addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
            enemy_alive = false
            if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
        }
    }, 400)
    setTimeout(() => {
        if (!won) getFirst(l).y -= 1
        if (enemy_alive && getFirst(l).x == getFirst(enemy).x && getFirst(l).y == getFirst(enemy).y) {
            getFirst(enemy)?.remove();
            enemiesDead++
            addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
            enemy_alive = false
            if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
        }
    }, 500)
    setTimeout(() => {
        if (!won) getFirst(l).y -= 1
        if (enemy_alive && getFirst(l).x == getFirst(enemy).x && getFirst(l).y == getFirst(enemy).y) {
            getFirst(enemy)?.remove();
            enemiesDead++
            addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
            enemy_alive = false
            if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
        }
    }, 600)
    setTimeout(() => {
        getFirst(l).remove()
    }, 700)
}

let interval

let upgrade = false;

function spawnLaser() {
  addText(`Enemies Dead: ${enemiesDead}`, {color: color`7`})
  if (upgrade == true) addText(`(Upgraded)`, {color: color`7`, y: 1})
  setTimeout(() => doLaser(laser), 0)
  setTimeout(() => doLaser(laser2), 400)
  if (upgrade == true) setTimeout(() => doLaser(laser3), 900)
  if (enemy_alive == false) {
    if (enemiesDead == 25) {
      upgrade = true
    } else if (enemiesDead == 50) {
      clearInterval(interval)
      clearText()
      addText(`You Win`, {color: color`7`})
      won == true
    } 
    if (enemiesDead != 50) {
      enemy_alive = true
      addSprite(Math.floor(Math.random() * (9 - 1)) + 1,1,enemy)
    }
  }
}

spawnLaser()

interval = setInterval(spawnLaser, 700)

afterInput(() => {
  
})
