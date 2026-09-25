/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Fortress Fighter
@description: A very basic RPG-ish game.
@author: Codingfreak234
@tags: ['RPG', 'Castle']
@addedOn: 2025-00-00
*/

const player1 = "5"
const player2 = "6"
const player3 = "7"
const player4 = "8"
const enemy = "e"
const enemy2 = "d"
const background = "b"
const blast1 = "1"
const blast2 = "2"
const blast3 = "3"
const blast4 = "4"
const castle = "c"
const marker = "m"
const walkway = "w"


setLegend(
  [ player1, bitmap`
.......33.......
...LL113311LL...
..LL11133111LL..
.LL1111331111LL.
LL111113311111LL
L11111133111111L
L11111133111111L
L11111133111111L
L11111133111111L
L11111133111111L
L11111133111111L
LL111113311111LL
.LL1111331111LL.
..LL11111111LL..
...LL111111LL...
....LLLLLLLL....` ],
    [
      player2, bitmap`
....LLLLLLLL....
...LL111111LL...
..LL11111111LL..
.LL1111111111LL.
LL111111111111L.
L11111111111111.
L11111111111111.
L113333333333333
L113333333333333
L11111111111111.
L11111111111111.
LL111111111111L.
.LL1111111111LL.
..LL11111111LL..
...LL111111LL...
....LLLLLLLL....` ],
      [
      player3, bitmap`
....LLLLLLLL....
...LL111111LL...
..LL11111111LL..
.LL1111331111LL.
LL111113311111LL
L11111133111111L
L11111133111111L
L11111133111111L
L11111133111111L
L11111133111111L
L11111133111111L
LL111113311111LL
.LL1111331111LL.
..LL11133111LL..
...LL113311LL...
.......33.......` ],
      [
      player4, bitmap`
....LLLLLLLL....
...LL111111LL...
..LL11111111LL..
.LL1111111111LL.
.L111111111111LL
.11111111111111L
.11111111111111L
333333333333311L
333333333333311L
.11111111111111L
.11111111111111L
.L111111111111LL
.LL1111111111LL.
..LL11111111LL..
...LL111111LL...
....LLLLLLLL....` ],
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
  enemy2,
    bitmap`
......3....33...
.3....3.3.3...3.
..3..3..3.3..33.
...3333333333...
3..33.3333.33...
.3.333...33.333.
.3.3333333333...
..3333.333.33.3.
...3333..33333..
3.33.33...333.3.
.3.3..33...333..
...3333333333...
.333333333333...
...33..3.3.3.3..
.33.3.3.3..3..3.
......3..3..3...`], 
  [
  blast3,
    bitmap`
................
................
................
................
.9.99.9.99.9.99.
9999999999999999
9755577777757579
9777557555575579
9555777777777779
9575557757777559
9999999999999999
.99.9.99.9.99.9.
................
................
................
................`],
    [
  blast4,
    bitmap`
.....999999.....
....99557799....
....9975759.....
.....9557599....
....99575599....
.....957579.....
....99777799....
....9977579.....
.....9575799....
....99775799....
.....977579.....
....99777599....
....9977579.....
.....9575599....
....99577799....
.....999999.....`],
  [marker, bitmap`
................
................
................
................
................
................
.....999999.....
.....999999.....
.....999999.....
.....999999.....
................
................
................
................
................
................`],
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
 [ walkway, bitmap`
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL` ],
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
let score= 0
let direction = 1


const levels = [map`
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
wbbbbbbbbw
bbbbbbbbbb`]

const currentLevel = levels[level]
setMap(currentLevel)


var gameRunning = true

addText("Health: 10", {
  x: 1,
  y: 1,
  color: color `2`
});

addSprite(8, 9, marker)
addSprite(8, 9, player1)
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
    if (direction === 1){
      if (getFirst(marker).y > 0) {
  getFirst(marker).y-=1
  }
}
}
})

onInput("s", () => {
    if (gameRunning === true) {
    if (direction === 3){
      if (getFirst(marker).y < 9) {
  getFirst(marker).y+=1
  }
}
}
})

onInput("a", () => {
    if (gameRunning === true) {
    if (direction === 4){
      if (getFirst(marker).x > 1) {
  getFirst(marker).x-=1
  }
}
}
})

onInput("d", () => {
    if (gameRunning === true) {
    if (direction === 2){
      if (getFirst(marker).x < 8) {
  getFirst(marker).x+=1
  }
}
}
})

onInput("w", () => {
  if (gameRunning === true) {
    if (direction === 1){
      if (getFirst(player1).y > 0) {
  getFirst(player1).y-=1
         direction = 1
      }
    }else{
       if (direction === 2){
         if (getFirst(player2).y > 0) {
         }
          addSprite(getFirst(player2).x,getFirst(player2).y,player1)
         getFirst(player2).remove()
         direction = 1
       }else{
           if (direction === 3){
         if (getFirst(player3).y > 0) {
         }
          addSprite(getFirst(player3).x,getFirst(player3).y,player1)
         getFirst(player3).remove()
         direction = 1
       }else{
           if (direction === 4){
         if (getFirst(player4).y > 0) {
         }
          addSprite(getFirst(player4).x,getFirst(player4).y,player1)
         getFirst(player4).remove()
         direction = 1
       }
       }
       }
    }
    }
  })
  
  onInput("s", () => {
    if (gameRunning === true) {
    if (direction === 3){
      if (getFirst(player3).y < 9) {
  getFirst(player3).y+=1
         direction = 3
      }
    }else{
       if (direction === 2){
         if (getFirst(player2).y < 9) {
         }
          addSprite(getFirst(player2).x,getFirst(player2).y,player3)
         getFirst(player2).remove()
        direction = 3
       }else{
           if (direction === 1){
         if (getFirst(player1).y < 9) {
         }
          addSprite(getFirst(player1).x,getFirst(player1).y,player3)
         getFirst(player1).remove()
         direction = 3
       }else{
           if (direction === 4){
         if (getFirst(player4).y < 9) {
         }
          addSprite(getFirst(player4).x,getFirst(player4).y,player3)
         getFirst(player4).remove()
         direction = 3
       }
       }
       }
    }
    }
  })
  
  onInput("d", () => {
    if (gameRunning === true) {
    if (direction === 2){
      if (getFirst(player2).x < 8) {
  getFirst(player2).x+=1
         direction = 2
      }
    }else{
       if (direction === 3){
         if (getFirst(player3).x < 8) {
         }
          addSprite(getFirst(player3).x,getFirst(player3).y,player2)
         getFirst(player3).remove()
         direction = 2
       }else{
           if (direction === 1){
         if (getFirst(player1).x < 8) {
         }
          addSprite(getFirst(player1).x,getFirst(player1).y,player2)
         getFirst(player1).remove()
         direction = 2
       }else{
           if (direction === 4){
         if (getFirst(player4).x < 8) {
         }
         addSprite(getFirst(player4).x,getFirst(player4).y,player2)
         getFirst(player4).remove()
         direction = 2
       }
       }
       }
    }
    }
  })

  onInput("a", () => {
    if (gameRunning === true) {
    if (direction === 4){
      if (getFirst(player4).x > 1) {
  getFirst(player4).x-=1
         direction = 4
      }
    }else{
       if (direction === 3){
         if (getFirst(player3).x > 1) {
         }
          addSprite(getFirst(player3).x,getFirst(player3).y,player4)
         getFirst(player3).remove()
            direction = 4
       }else{
           if (direction === 1){
         if (getFirst(player1).x > 1) {
         }
         addSprite(getFirst(player1).x,getFirst(player1).y,player4)
         getFirst(player1).remove()
           direction = 4
       }else{
           if (direction === 2){
         if (getFirst(player2).x > 1) {
         }
         addSprite(getFirst(player2).x,getFirst(player2).y,player4)
         getFirst(player2).remove()
            direction = 4
       }
       }
       }
    }
    }
  })

  onInput("k", () => {
    if (gameRunning === true) {
    if (direction === 4){
     if (getFirst(player4).x > 0) {
   let j = getFirst(player4)
    addSprite(j.x-1, j.y, blast1)
    }
    
    }else{
       if (direction === 3){
              if (getFirst(player3).y < 9) {
   let j = getFirst(player3)
    addSprite(j.x, j.y+1, blast2)
    }
         
       }else{
           if (direction === 1){
         if (getFirst(player1).y < 8) {
   let j = getFirst(player1)
    addSprite(j.x, j.y-1, blast2)
         }
       }else{
           if (direction === 2){
        if (getFirst(player2).y < 8) {
   let j = getFirst(player2)
    addSprite(j.x+1, j.y, blast1)
         }
       }
       }
       }
    }
    }
  })

 onInput("l", () => {
    if (gameRunning === true) {
    if (direction === 4){
     if (getFirst(player4).x > 2) {
     
   let j = getFirst(player4)
    addSprite(j.x-1, j.y, blast3)
    addSprite(j.x-2, j.y, blast3)
    addSprite(j.x-3, j.y, blast3)
    }else if (getFirst(player4).x === 2){
    let j = getFirst(player4)
    addSprite(j.x-1, j.y, blast3)
    addSprite(j.x-2, j.y, blast3)
    }else if (getFirst(player4).x === 1){
    let j = getFirst(player4)
    addSprite(j.x-1, j.y, blast3)
    }
    
    }else{
       if (direction === 3){
              if (getFirst(player3).y < 7) {
   let j = getFirst(player3)
    addSprite(j.x, j.y+1, blast4)
    addSprite(j.x, j.y+2, blast4)
    addSprite(j.x, j.y+3, blast4)
    }else if (getFirst(player3).y === 7){
    let j = getFirst(player3)
    addSprite(j.x, j.y+1, blast4)
    addSprite(j.x, j.y+2, blast4)
    }else if (getFirst(player3).y === 8){
       let j = getFirst(player3)
    addSprite(j.x, j.y+1, blast4)
    }
         
       }else{
           if (direction === 1){
         if (getFirst(player1).y > 2) {
   let j = getFirst(player1)
    addSprite(j.x, j.y-1, blast4)
    addSprite(j.x, j.y-2, blast4)
    addSprite(j.x, j.y-3, blast4)
         }else if (getFirst(player1).y === 2){
         let j = getFirst(player1)
    addSprite(j.x, j.y-1, blast4)
    addSprite(j.x, j.y-2, blast4)
         }else if (getFirst(player1).y === 1){
         let j = getFirst(player1)
    addSprite(j.x, j.y-1, blast4)
         }
       }else{
           if (direction === 2){
        if (getFirst(player2).x < 7) {
   let j = getFirst(player2)
    addSprite(j.x+1, j.y, blast3)
    addSprite(j.x+2, j.y, blast3)
    addSprite(j.x+3, j.y, blast3)
         }else if (getFirst(player2).x === 7){
          let j = getFirst(player2)
    addSprite(j.x+1, j.y, blast3)
    addSprite(j.x+2, j.y, blast3)
         }else if (getFirst(player2).x === 8){
          let j = getFirst(player2)
    addSprite(j.x+1, j.y, blast3)
         }
       }
       }
       }
    }
    }
  })



let onOff = 0

function spawnEnemy() {
  
  if (score < 500) {
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
  let enemies = getAll(enemy).concat(getAll(enemy2))
  if(score < 500){
  if(onOff === 0){
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
  }else{
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
}

function checkHit() {
  const playerNumbers = {1: player1, 2: player2, 3: player3, 4: player4}
  const hits = tilesWith(enemy, playerNumbers[direction]).length
  if(hits > 0) {
    health = health - 1
    let x = playerNumbers[direction].x
    let y = playerNumbers[direction].y
    addText("Health: " + health + " ", {
  x: 1,
  y: 1,
  color: color`2`
});
  }
}

function destroyEnemy() {
let enemies = getAll(enemy).concat(getAll(enemy2))
let blasts = getAll(blast1).concat(getAll(blast2)).concat(getAll(blast3)).concat(getAll(blast4))

  for (let e = 0; e < blasts.length; e++) {
  for (let i = 0; i < enemies.length; i++) {
  if (enemies[i].y === blasts[e].y) {
  if (enemies[i].x === blasts[e].x) {
  let x = enemies[i].x
  let y = enemies[i].y
  enemies[i].remove()
  blasts[e].remove()
  score += 1
  }
  }
  }
  }

}



function removeBlasts() {
let blasts = getAll(blast1).concat(getAll(blast2)).concat(getAll(blast3)).concat(getAll(blast4))

for (let b of blasts) {
b.remove()
}
}

function castleCrusher() {
let castles = getAll(castle)
let enemies = getAll(enemy).concat(getAll(enemy2))

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
  moveEnemy()
  checkHit()
  removeBlasts()
  spawnEnemy()
  score += 1
      addText("Score: " + score, {
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