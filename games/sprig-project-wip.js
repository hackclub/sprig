
/* 
@title: Maze Game
@description: Used the maze template and added my own twists to end up with this!
@author: Noah Basilio Oliveira
@tags: []
@addedOn: 2023-08-08
*/

const player = "p"
const box = "b"
const goal = "g"
const background = "m"
const wall = "w"
const obstacle = "o"

setLegend(
	[ player, bitmap`
................
.00000000000000.
.0............0.
.0............0.
.0..0......0..0.
.0..0......0..0.
.0..0......0..0.
.0..0......0..0.
.0............0.
.0............0.
.0.0........0.0.
.0..00000000..0.
.0............0.
.0............0.
.00000000000000.
................` ],
  [ box, bitmap`
................
.00000000000000.
.010CCC00CCC010.
.000CCC00CCC000.
.0CCCCC00CCCCC0.
.0CCCCC00CCCCC0.
.0CCCCC00CCCCC0.
.00000000000000.
.00000000000000.
.0CCCCC00CCCCC0.
.0CCCCC00CCCCC0.
.0CCCCC00CCCCC0.
.000CCC00CCC000.
.010CCC00CCC010.
.00000000000000.
................` ],
  [ background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ goal, bitmap`
................
....00000000....
..000444444000..
..044444444440..
.0044DDDDDD4400.
.044DDLLLLDD440.
.044DLLLLLLD440.
.044DLLLLLLD440.
.044DLLLLLLD440.
.044DLLLLLLD440.
.044DDLLLLDD440.
.0044DDDDDD4400.
..044444444440..
..000444444000..
....00000000....
................` ],
  [ wall, bitmap`
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
  [ obstacle, bitmap`
................
.33333333333333.
.3..3......3..3.
.3...3....3...3.
.3..3.3..3.3..3.
.3..3..33..3..3.
.3..3......3..3.
.3..3......3..3.
.3............3.
.3............3.
.3..33333333..3.
.3.3........3.3.
.3............3.
.3............3.
.33333333333333.
................` ]
)

setBackground(background)
setSolids([player, box, wall])

let level = 0
let obstacleDir = -1
const levels = [
	map`
pwwww
.w..w
.b...
.w...
wwgww`,
    map`
....w
.w.b.
.wp..
.w.ww
....g`,
    map`
wwwwww
wp...w
w..b.w
w...ow
w.g..w
wwwwww`,
    map`
.....
.....
.pbg.
.....
.....`
]

setMap(levels[level])

setPushables({
	[ player ]: [ box ],
    [ box ]: [ box ]
})

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
    const curr = levels[level]

    if (curr !== undefined) {
      clearText("")
      setMap(curr)
      obstacleDir = -1
    }
})

afterInput(() => {
    const boxesGoal = tilesWith(box, goal)
    const playerEnemy = tilesWith(player, obstacle)

    if (level == 2) {
        if (obstacleDir == -1) {
            getFirst(obstacle).x -= 1
            if (getFirst(obstacle).x == 1) {
                obstacleDir = 1
            }
        } else {
            getFirst(obstacle).x += 1
            if (getFirst(obstacle).x == 4) {
                obstacleDir = -1
            }
        }
    }
  
    if (boxesGoal.length >= 1) {
      level++
      obstacleDir = -1
      if (level < levels.length) {
        setMap(levels[level])
      } else {
        addText("You Won!", {y: 4, color: color`7` })
      }
    }

    if (playerEnemy.length >= 1) {    const curr = levels[level]
      if (curr !== undefined) {
        clearText("")
        setMap(curr)
        obstacleDir = -1
      }
    }
})