const player = "p"
const ground = "g"
const bullet = "b"
const curse = "c"
var player_cursed = false
var life = 3
var gameover = false
var score = 0
var speed = 200

setLegend(
  [ player, bitmap`
................
................
................
....333333330...
...33666666630..
..3366666666630.
..3666666666630.
..3699966999630.
.336696666966333
333666666666633.
..3666699966630.
..3366666666330.
...33666666330..
....333333333...
.....333.333....
......3...3.....` ],
  [ ground, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
DCCDDCCCCDDCCCCC
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ bullet, bitmap`
...00.000.00....
....0.000.0.....
....00.0.00.....
......000.......
.......0........
......000.......
.....00000......
.....00000......
.....00000......
.....00000......
.....00000......
......000.......
................
................
................
................`],
  [ curse, bitmap`
................
.....99999......
....9000009.....
...900000009....
..90000000009...
..00000000000...
..00330003300...
..00000000000...
..00000H00000...
..0000HHH0000...
..0000HHH0000...
...000000000....
.....00000......
......000.......
.......0........
................`],
)

setSolids([player, ground])

let level = 0
const levels = [
  map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
.......p.....
ggggggggggggg`
]

setMap(levels[level])
onInput("j", () => {
  player_cursed = false
  life = 3
  gameover = false
  score = 0
  speed = 200
  clearText()
  addText(`${score}`, { 
        x: width()+2,
        y: 0,
        color: color`6`
  })
  addText(`Lifes: ${life}`, { 
      x: 1,
      y: 0,
      color: color`3`
})
})
//// Movements
onInput("a", () => {
  if (player_cursed === false){
    getFirst(player).x -= 1
  }else{
    getFirst(player).x += 1
  }
})
onInput("d", () => {
  if (player_cursed === false){
    getFirst(player).x += 1
  }else{
    getFirst(player).x -= 1
  }
})
////
//// Intervals
setInterval(() => {
  if(gameover === false){
    let x = Math.floor(Math.random() * width());
    let y = 0; 
    addSprite(x, y, bullet)
  }
}, 400);
setInterval(() => {
  if(gameover === false){
    let x = Math.floor(Math.random() * (width() - 5));
    let y = 0; 
    addSprite(x, y, curse)
  }
}, 6000);
////
//// Main interval
setInterval(() => {
  if(gameover === false){
    const play = getFirst(player)
    //// movements and collisions
    getAll(bullet).forEach(bull => {
      bull.y += 1;
      if(bull.x === play.x && bull.y === play.y){
        life -= 1
      }
      else if(bull.y > 9){
        bull.remove()
      }
    });
    getAll(curse).forEach(cur => {
      cur.y += 1;
      if(cur.x === play.x && cur.y === play.y){
        player_cursed = true
        setInterval(() => {
          player_cursed = false
        }, 5000)
      }
      else if(cur.y > 9){
        cur.remove()
      }
    });
    ////
    //// Text
    addText(`Lifes: ${life}`, { 
      x: 1,
      y: 0,
      color: color`3`
    })
    if(life === 0){
      addText(`GAME OVER`, { 
        x: Math.floor(width()/2),
        y: Math.floor(height()/2),
        color: color`3`
      })
      addText(`PRESS "J"`, { 
        x: Math.floor(width()/2),
        y: Math.floor(height()/2) + 1,
        color: color`3`
      })
      addText(`TO RESTART`, { 
        x: Math.floor(width()/2),
        y: Math.floor(height()/2) + 2,
        color: color`3`
      })
      gameover = true
    }
    if(life > 0){
      score += 2
      addText(`${score}`, { 
        x: width()+2,
        y: 0,
        color: color`6`
      })
    }
    ////
    //// speeding with score/time
    if(score === 100){
      speed -= 20
    }
    if(score === 200){
      speed -=30
    }
    if(score === 300){
      speed -=30
    }
    if(score === 400){
      speed -= 30
    }
  }
  else{
    getAll(bullet, curse).forEach(all => {
        all.remove()
    });
  }
  ////
}, speed);
////







