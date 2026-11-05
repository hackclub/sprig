
/* 
@title: Maze Game
@description: Used the maze template and added my own twists to end up with this!
@author: Noah Basilio Oliveira
@tags: ["maze", "puzzle"]
@addedOn: 2026-11-04
*/

const player = "p"
const box = "b"
const goal = "g"
const background = "m"
const wall = "w"
const wall2 = "d"
const obstacle = "o"
const key = "k"
const lockedWall = "l"

setLegend(
	[ player, bitmap`
................
.00000000000000.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.0LL0LLLLLL0LL0.
.0LL0LLLLLL0LL0.
.0LL0LLLLLL0LL0.
.0LL0LLLLLL0LL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.0L0LLLLLLLL0L0.
.0LL00000000LL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
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
01111L1111L11110
01111L1111L11110
0LLLLL1111LLLLL0
01111L1111L11110
01111L1111L11110
01111L1111L11110
01111L1111L11110
01111L1111L11110
01111L1111L11110
01111LLLLLL11110
01111L1111L11110
01111L1111L11110
01111L1111L11110
01111L1111L11110
0000000000000000` ],
  [ obstacle, bitmap`
................
.33333333333333.
.3LL3LLLLLL3LL3.
.3LLL3LLLL3LLL3.
.3LL3L3LL3L3LL3.
.3LL3LL33LL3LL3.
.3LL3LLLLLL3LL3.
.3LL3LLLLLL3LL3.
.3LLLLLLLLLLLL3.
.3LLLLLLLLLLLL3.
.3LL33333333LL3.
.3L3LLLLLLLL3L3.
.3LLLLLLLLLLLL3.
.3LLLLLLLLLLLL3.
.33333333333333.
................` ],
  [ key, bitmap`
................
................
................
................
..000...........
.066600.........
066066600000000.
060.066666666660
060.066666606660
06606600060.0660
.06660..060.0660
..000....0...00.
................
................
................
................` ],
  [ lockedWall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000LL0000000
000000LLLL000000
00000LLLLLL00000
00000LLLLLL00000
000000LLLL000000
0000000LL0000000
000000LLLL000000
000000LLLL000000
00000LLLLLL00000
00000LLLLLL00000
0000000000000000
0000000000000000
0000000000000000` ],
  [ wall2, bitmap`
0000000000000000
01111L1111111110
01111L1111111110
01111L1111111110
01111L1111111110
0LLLLLLLLLLLLLL0
01111111111L1110
01111111111L1110
01111111111L1110
0LLLLLLLLLLLLLL0
01111L1111111110
01111L1111111110
01111L1111111110
01111L1111111110
01111L1111111110
0000000000000000` ]
)

setBackground(background)
setSolids([player, box, wall, lockedWall, wall2])

let level = 0
let obstacleDir = -1
let keyPickUp = 0


const levels = [
	map`
pwwww
.d..d
.b...
.w...
dwgwd`,
    map`
....w
.w.b.
.wp..
.d.wd
....g`,
    map`
wwdwwd
wp...w
w..b.w
w...ow
d.g..w
dwwwwd`,
    map`
wwwdwwwdww
dp.......w
wwwwwbwwww
wwd.bb.www
dw.....wdw
w.......kw
w..wdwwwww
w..w....od
w..l....gw
dwwwwdwwww`
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
    const pickUpKey = tilesWith(player, key)

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

    if (level == 3) {
      if (obstacleDir == -1) {
            getFirst(obstacle).x -= 1
            if (getFirst(obstacle).x == 4) {
                obstacleDir = 1
            }
      } else {
            getFirst(obstacle).x += 1
            if (getFirst(obstacle).x == 8) {
                obstacleDir = -1
            }
      }
    }
    if (pickUpKey.length >= 1) {
      keyPickUp = 1
      getFirst(key).remove()
    }

    if (keyPickUp == 1) {
      const wall = getFirst(lockedWall)
      if (wall) {
        wall.remove()
      }
    }
  
    if (boxesGoal.length >= 1) {
      level++
      obstacleDir = -1
      keyPickUp = 0
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