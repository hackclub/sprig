/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: TowerDefence
@author: Coe
@tags: []
@img: ""
@addedOn: 2024-00-00
*/
let speed = 1000
let spawn = 3000

let counter = 20

const player = "p"
const grass = "g"
const portal = "o"
const right = "r"
const left = "l"
const strightu = "s"
const side1 = "i"
const otherRight = "h"
const otherLeft = "e"
const enemy1 = "n"
const tower = "t"
const lightning = "L"




let gameOver = false

let numTower = 3

let towerIndex = 0
let enemyIndex = 0
let LIndex = 0

let health = 10

addText("K to", {
       x : 3,
       y : 5,
       color: color`0`})

addText("build Tower", {
       x : 3,
       y : 7,
       color: color`0`})

addText("" + health, {
  x: 15,
  y: 0,
  color: color`0`
})

const movement = [[2, 1], [2, 2], [2, 3], [3, 3], [4, 3], [4, 2], [4, 1], [5, 1], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 5], [4, 5],
                 [3, 5], [2, 5], [1, 5], [1, 4], [0, 4], [0, 5], [0, 6], [1, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]
 
setLegend(
  [ player, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000` ],
  [ grass, bitmap`
4DD4DD44DDD4DD44
DD4DDDD4DDDDDDD4
DD444DD4D444D4DD
DDD444DDDD4DD4DD
4DDDDDDDDDDDD4DD
D44DDDDD44DDDDD4
DD44DD4D44DDDDD4
4D44DDDDD4DDD4DD
DDDDDDDDDDDD44DD
444DDD444D4D444D
D4DDDDD44DDD4D44
DDDD4DDDDDDDDDD4
DDD44DDD444DD4DD
DD4D4D4D44DD44DD
4DDDDD4D4DDDDD44
D4DDD44DDDDDD44D`],
  [ portal, bitmap`
................
.LLLLLLLLLLLLLL.
.LC3333C333333L.
.L33333C33C933L.
.L339C3333C3C3L.
.L33CC333CC3C3L.
.L3333333333C3L.
.L333333CCC333L.
.L3339C333CC33L.
.L3CCCCC39333CL.
.L3333333333CCL.
.LLLLLLLLLLLLLL.
.L010011110010L.
.L01LL1001LL10L.
.LL1111001111LL.
.....LLLLLL.....`],
  [ enemy1, bitmap`
................
................
.......39.......
.......33.......
......1931......
......1111......
.....LLLLLL.....
.....L1001L.....
.....L1001L.....
.....L3333L.....
................
................
................
................
................
................`],
  [ lightning, bitmap`
................
................
................
................
....5.7..7.5....
.....7.55.7.....
....7.5775.7....
.....575575.....
.....577575.....
....7.5575.7....
.....7.55.7.....
....5.7..7.5....
................
................
................
................`],
  [ strightu, bitmap`
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......`],
  [ right, bitmap`
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLLLLLLLL
......LLLLLLLLLL
......LLLLLLLLLL
......LLLLLLLLLL
................
................
................
................
................
................`],
  [ left, bitmap`
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
LLLLLLLLLL......
LLLLLLLLLL......
LLLLLLLLLL......
LLLLLLLLLL......
................
................
................
................
................
................`],
  [ side1, bitmap`
................
................
................
................
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
................
................
................
................
................
................`],
  [ otherRight, bitmap`
................
................
................
................
................
................
......LLLLLLLLLL
......LLLLLLLLLL
......LLLLLLLLLL
......LLLLLLLLLL
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......`],
  [ otherLeft, bitmap`
................
................
................
................
................
................
LLLLLLLLLL......
LLLLLLLLLL......
LLLLLLLLLL......
LLLLLLLLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......LLLL......`],
  [ tower, bitmap`
................
................
................
...0000000000...
...017L5LL510...
...0L177551L0...
...055LLLL570...
...0L7L17L7L0...
...075L11L550...
...0L5LLLL5L0...
...0L15577150...
...015L711L10...
...0000000000...
................
................
................`]
 )

setSolids([])

setBackground(grass)

let level = 0
const levels = [ map `
p.o.....
..s.hie.
..s.s.s.
..ril.s.
he....s.
sriiiil.
re......
.riiiie.`]

setMap(levels[level])


setPushables({
  [ player ]: []
})

onInput("s", () => {
  if (gameOver) return
  getFirst(player).y += 1
})
onInput("w", () => {
  if (gameOver) return
  getFirst(player).y -= 1
})
onInput("a", () => {
  if (gameOver) return
  getFirst(player).x -= 1
})
onInput("d", () => {
  if (gameOver) return
  getFirst(player).x += 1
})


onInput("k", () => {
  if (gameOver) return
  let yes = true
  let i;
  let x = getFirst(player).x
  let y = getFirst(player).y
  getTile(x, y).forEach((sprite) =>{
    if (getTile(x, y).length === 1 && numTower > 0) {
      addSprite(x, y, tower)
      numTower--
      getAll(tower)[towerIndex].life = 5
      towerIndex++
    }
    else if (getTile(x, y).length === 1 && numTower === 0) {
      getFirst(tower).remove()
      towerIndex--
      addSprite(x, y, tower)
    }
      
  })
})

afterInput(() => {
  
})

setInterval (() => {
  if (gameOver) return
  addSprite(2, 1, enemy1)
  getAll(enemy1)[enemyIndex].loc = 0
  enemyIndex++
  

}, spawn)

setInterval (() => {
  if (gameOver) return 

  getAll(enemy1).forEach ((enemyobj) => {
    enemyobj.x = movement[enemyobj.loc][0]
    enemyobj.y = movement[enemyobj.loc][1]
    enemyobj.loc +=1
  })
  
}, speed)

setInterval (() => {
  if (gameOver) return
    
  getAll(enemy1).forEach ((enemyobj) => {
    if (enemyobj.x === 6 && enemyobj.y === 7) {
      clearText()
      enemyobj.remove()
      health--
      enemyIndex--
      addText("" + health, {
        x: 15,
        y: 0,
        color: color`0`
    })
    }

  })

  if (health === 0)  {
    gameOver = true
  }
}, 100)

setInterval (() => {
  if (gameOver) return
  getAll(tower).forEach((towerObj) => {
    if ((towerObj.x + 1) > 7) return
    addSprite(towerObj.x + 1, towerObj.y, lightning)
    getAll(lightning)[LIndex].time = 5
    LIndex++
    if ((towerObj.x - 1) < 0) return
    addSprite(towerObj.x - 1, towerObj.y, lightning)
    getAll(lightning)[LIndex].time = 5
    LIndex++
    if ((towerObj.y + 1) > 7) return
    addSprite(towerObj.x, towerObj.y + 1, lightning)
    getAll(lightning)[LIndex].time = 5
    LIndex++
    if ((towerObj.y - 1) < 0) return
    addSprite(towerObj.x, towerObj.y - 1, lightning)
    getAll(lightning)[LIndex].time = 5
    LIndex++
  })
  
}, 5000)

setInterval (() => {
  if (gameOver) return
  getAll(lightning).forEach((lightningObj) => {
    if (lightningObj.time === 0) {
      lightningObj.remove();
      LIndex--
    }
    lightningObj.time --
  })

}, 50)  

setInterval (() => {
  if (gameOver) return
  getAll(lightning).forEach((lightningObj) => {
    getTile(lightningObj.x, lightningObj.y).forEach((sprite) => {
      if (sprite.type === enemy1){
        sprite.remove();
        enemyIndex--;
      }
    }) 
  })
  
  counter--
  if (counter === 0) {clearText(); addText("" + health, {
        x: 15,
        y: 0,
        color: color`0`
    });}
}, 50)

setInterval (() => {
  if (gameOver) return

  if (speed < 500) return

  if (spawn < 1500) return

  speed -= 10
  spawn -= 20
  
}, 500)



setInterval (() => {
if (gameOver){
addText("GAME OVER", {
  x:5,
  y:5,
  color: color`0`
})
}
},50)






