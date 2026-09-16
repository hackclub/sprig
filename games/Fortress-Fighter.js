/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Fortress Fighter
@description: A very basic RPG-ish game.
@author: Codingfreak234
@tags: ['RPG', 'Castle']
@addedOn: 2025-00-00
*/

const player = "p"
const enemy = "e"
const background = "b"
const blast1 = "1"
const blast2 = "2"
const castle = "c"



setLegend(
  [ player, bitmap`
....99999999....
...9955555599...
..995555555599..
.99555555555599.
9955555555555599
9555555555555559
9555555555555559
9555555555555559
9555555555555559
9555555555555559
9555555555555559
9955555555555599
.99555555555599.
..995555555599..
...9955555599...
....99999999....` ],
  [
    enemy,
    bitmap`
3.....3.33.33..3
33.3.33.3.3..333
.333.3..3.3.33..
..333333333333..
3..3333333333.33
333333333333333.
...3333333333...
3333333333333333
3..33333333333..
..33333333333...
3333333333333333
...3333333333..3
33333333333333..
..333..3.3.3.33.
.33.3..3.3.33.3.
33..3..3.3..3.33`], 
  [
  castle,
    bitmap`
LLL11LL11LL11LLL
LLL11LL11LL11LLL
LL111111111111LL
1111111111111111
1111LLLLLLLL1111
LL11LLLLLLLL11LL
LL11LLLLLLLL11LL
1111LLLLLLLL1111
1111LLLLLLLL1111
LL11LLLLLLLL11LL
LL11LLLLLLLL11LL
1111LLLLLLLL1111
1111111111111111
LL111111111111LL
LLL11LL11LL11LLL
LLL11LL11LL11LLL`],
  
  [
    blast1,
    bitmap`
................
...............9
9.9..9.9.9...9.9
.97997979599959.
9977777755557799
9775775557777559
9755577777757579
9777557555575579
9555777777777779
9575557757777559
9757755557555579
9555775777757799
995979979797999.
9.9.9..9.9.9..99
................
................`],
  [
    blast2,
    bitmap`
..9999999999.9..
...9575577799...
..955575757779..
...9575575579...
..97775755779...
...97557577779..
...9557777579...
..977577575779..
...9755757559...
..977777577559..
...9757757759...
..97557775759...
...9757757779...
...97557555759..
..99975777599...
..9.99999999.99.`],
  [
    background,
    bitmap`
4DDDDDDDD4DDDD4D
D4DD44DD44DDD44D
D44DDDDD4DD444DD
DD444DDD4DD4DDDD
D4DDDD444D4DDDDD
D444DDD4DD4D444D
DDDDDDDDDD4DDD4D
444DD444DD44DD44
DD444DD4DDD4DDDD
D4DD4DDD4D44DDDD
DD4DDD44D4DDDDD4
DD44DDDDDD44444D
DDD4DD44DDDDDD4D
44DDDDD4444D4D4D
D4444D4DD44D44DD
DDDD44DDDD4DD4DD`],
  )
 
let level = 0
let health = 10
let ticks = 0


const levels = [map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb`]

const currentLevel = levels[level]
setMap(currentLevel)


var gameRunning = true

addText("Health: 10", {
  x: 1,
  y: 1,
  color: color `2`
});


addSprite(8, 9, player)
addSprite(0,9,castle)
addSprite(1,9,castle)
addSprite(2,9,castle)
addSprite(3,9,castle)
addSprite(4,9,castle)
addSprite(5,9,castle)
addSprite(6,9,castle)
addSprite(7,9,castle)
addSprite(8,9,castle)
addSprite(9,9,castle)


onInput("w", () => {
  if (gameRunning === true) {
    if (getFirst(player).y > 0) {
  getFirst(player).y-=1
    }
  }
})

onInput("s", () => {
  if (gameRunning === true) {
    if (getFirst(player).y < 10) {
  getFirst(player).y-=-1
    }
  }
})

onInput("d", () => {
  if (gameRunning === true) {
    if (getFirst(player).x < 8) {
  getFirst(player).x-=-1
  }
  }
})

onInput("a", () => {
  if (gameRunning === true) {
    if (getFirst(player).x > 1) {
  getFirst(player).x-=1
  }
  }
})

  onInput("l",() => {
    if (gameRunning === true) {
    if (getFirst(player).x < 9) {
   let l = getFirst(player)
    addSprite(l.x+1, l.y, blast1)
    }
    }
})

  
onInput("j",() => {
  if (gameRunning === true) {
  if (getFirst(player).x > 0) {
   let j = getFirst(player)
    addSprite(j.x-1, j.y, blast1)
    }
  }
})


onInput("i",() => {
  if (gameRunning === true) {
   if (getFirst(player).y > 0) {
   let i = getFirst(player)
    addSprite(i.x, i.y-1, blast2)
    }
  }
})

onInput("k",() => {
  if (gameRunning === true) 
  if (getFirst(player).y < 9) {
   let k = getFirst(player)
    addSprite(k.x, k.y+1, blast2)
  }
})

let onOff = 0

function spawnEnemy() {
  
  if (ticks < 25) {
  if(onOff === 0) {
  let x = Math.floor(Math.random() * 10)
  let y = 0
  addSprite(x,y,enemy)
  onOff = 1
  }else{
  onOff = 0
  }
 }else{
let x = Math.floor(Math.random() * 10)
  let y = 0
  addSprite(x,y,enemy)
  }
}

function moveEnemy() {
  let enemies = getAll(enemy)
  for (let i = 0; i < enemies.length; i++) {
    if(enemies[i].y < 9) {
    enemies[i].y +=1
    } else { 
      if(enemies[i].x < 5) {
        enemies[i].x+=1
      }else{
        enemies[i].x-=1
      }
    }
  }
}

function checkHit() {
  const hits = tilesWith(enemy, player).length
  if(hits === 1) {
    health = health - 1
    addText("Health: " + health + " ", {
  x: 1,
  y: 1,
  color: color`2`
});
  }
}

function destroyEnemy() {
let enemies = getAll(enemy)
let blasts = getAll(blast1).concat(getAll(blast2))


  for (let e = 0; e < blasts.length; e++) {
  for (let i = 0; i < enemies.length; i++) {
  if (enemies[i].y === blasts[e].y) {
  if (enemies[i].x === blasts[e].x) {
  let x = enemies[i].x
  let y = enemies[i].y
  enemies[i].remove()
  blasts[e].remove()
  }
  }
  }
  }

}

function removeBlasts() {
let blasts = getAll(blast1).concat(getAll(blast2))

for (let b of blasts) {
b.remove()
}
}

function castleCrusher() {
let castles = getAll(castle)
let enemies = getAll(enemy)

for (let c of castles) {
for (let e of enemies) {

  if (e.y === c.y) {
  if (e.x === c.x) {
  e.remove()
  c.remove()
  health = health -1
      addText("Health: " + health + " ", {
  x: 1,
  y: 1,
  color: color`2`
});
  }
  }
  }
}
}



var gameLoop = setInterval(() => {
  castleCrusher()
  destroyEnemy()
  checkHit()
  moveEnemy()
  checkHit()
  destroyEnemy()
  removeBlasts()
  spawnEnemy()
  ticks = ticks +1
      addText("score: " + ticks, {
  x: 1,
  y: 2,
  color: color`2`
});
  if(health < 1) {
    clearInterval(gameLoop)
   gameRunning = false
    addText("Health: 0  ", {
  x: 1,
  y: 1,
  color: color`2`
});
addText("Game over", {
  x: 1,
  y: 3,
  color: color`2`
});
  }
}, 500)
