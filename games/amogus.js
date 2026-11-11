/*
@title: Amogus
@description: Avoid the cactus accross the desert as an amogus
@author: guccimortyerik
@tags: ['infinite', 'jumping',' among us']
@addedOn: 2026-11-11
*/

const amongus = "p"
const cactus = "c"
const ground = "g"


setLegend(
  [amongus, bitmap`
.....33333333...
...33333333333..
...33333333333..
...3333333377777
...3333333377777
...3333333377777
...3333333333...
...3333333333...
...3333333333...
...3333333333...
.....33333333...
.....33333333...
.....333..333...
.....333..333...
.....333..333...
.....333..333...`],


  [cactus, bitmap`
................
................
................
................
................
...0..D...00....
....0DDDD0D.....
.....0DDDDD.....
.....DDDDDD0....
...00DDDDD0.....
.....0DDDDD.....
.....DDDDD0.....
...000DDDDD0....
.....DDDDDD.....
.....DDDDD000...
....00DDDDD.....`],


  [ground, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
)


setMap(map`
................gggg
...............ggggg
................gggg
...............ggggg
................g.g.
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
..........p.........
gggggggggggggggggggg`)


const GROUND_Y = 16


let score = 0
let game_over = false
let jump_frame = -1
let speed = 220
let obstacle_timer = 0


const jump_arc = [
  15,
  14,
  13,
  12,
  12,
  13,
  14,
  15,
  16
]


onInput("w", () => {
  if (game_over) return


  const p = getFirst(amongus)


  if (jump_frame === -1 && p.y === GROUND_Y) {
    jump_frame = 0
  }
})


function end_game() {
  game_over = true


  clearText()


  addText("GAME OVER", {
    x: 2,
    y: 6,
    color: color`3`
  })


  addText("SCORE " + score, {
    x: 2,
    y: 8,
    color: color`3`
  })
}


setInterval(() => {
  if (game_over) return


  const p = getFirst(amongus)


  if (jump_frame >= 0) {
    p.y = jump_arc[jump_frame]


    jump_frame++


    if (jump_frame >= jump_arc.length) {
      jump_frame = -1
      p.y = GROUND_Y
    }
  }
}, 80)


function spawn_cactus() {
  const random_num = Math.random()


  if (random_num < 0.7) {
    addSprite(19, GROUND_Y, cactus)
  } else {
    addSprite(19, GROUND_Y, cactus)
    addSprite(18, GROUND_Y, cactus)
  }
}


function loop() {
  if (game_over) return


  score++


  clearText()


  addText("" + score, {
    x: 2,
    y: 1,
    color: color`3`
  })


  const p = getFirst(amongus)


  for (const cac of getAll(cactus)) {
    if (cac.x === 0) {
      cac.remove()
    } else {
      cac.x--
    }
  }


  if (tilesWith(amongus, cactus).length > 0) {
    end_game()
  return 
  }


  obstacle_timer++


  if (obstacle_timer >= 14) {
    obstacle_timer = 0
    spawn_cactus()
  }


  if (score % 50 === 0) {
    if (speed > 120) {
      speed -= 10
    }
  }


  setTimeout(loop, speed)
}


loop()
