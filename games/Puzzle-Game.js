/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Jump Game
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const Player = "p"
const Block = "b"
const Goal = "g"
const Wall = "w"

let moveCount = 0
let moves = []

let blocks = []
let goals = []

setLegend(
  [ Player, bitmap`
0000000000000000
00DDDDDDDDDDDD00
030DDDDDDDDDD050
0330DDDDDDDD0550
03330DDDDDD05550
033330DDDD055550
0333330DD0555550
0333333005555550
0333333005555550
0333330CC0555550
033330CCCC055550
03330CCCCCC05550
0330CCCCCCCC0550
030CCCCCCCCCC050
00CCCCCCCCCCCC00
0000000000000000` ],
  [ Block, bitmap`
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
0000000000000000`],
  [ Goal, bitmap`
0.0.0.0.0.0.0.00
...............0
0...............
...............0
0...............
...............0
0...............
...............0
0...............
...............0
0...............
...............0
0...............
...............0
0...............
00.0.0.0.0.0.0.0`],
  [ Wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
)

setSolids([Block, Player, Wall])

let level = 0
const levels = [
  map`
p....
.....
..b..
.....
....g`,
  map`
p.wg.
.bw..
..w..
.....
w....`,
  map`
g...w
...b.
..w..
.b.p.
wg...`,
  map`
g.w.g
..w..
..wb.
...b.
p.w..`,
  map`
p..w.gg
ww.w.b.
....w..
.b....w
...w...`,
]

setPushables({
  [ Player ]: [Block],
  [ Block ]: [Block],
})

onInput("w", () => {
  player.y -= 1
  saveMove()
})

onInput("s", () => {
  player.y += 1
  saveMove()
})

onInput("a", () => {
  player.x -= 1
  saveMove()
})

onInput("d", () => {
  player.x += 1
  saveMove()
})

onInput("i", () => {
  if (moveCount <= 0) return;
  
  moveCount--
  player.x = moves[moveCount][0]
  player.y = moves[moveCount][1]
  for (var i = 0; i < blocks.length; i++)
  {
      blocks[i].x = moves[moveCount][(i + 1) * 2]
      blocks[i].y = moves[moveCount][(i + 1) * 2 + 1]
  }
  clearText()
  addText("Moves: " + moveCount, {x: 0, y: 0, color: color`5`})
})

afterInput(() => {
  for (var i = 0; i < blocks.length; i++)
  {
      var foundBlock = false
      for (var j = 0; j < goals.length; j++)
      {
          if (blocks[i].x == goals[j].x && blocks[i].y == goals[j].y)
          {
            foundBlock = true
            break
          }
      }

      if (!foundBlock)
      {
        return
      }
  }

  nextLevel()
})

function saveMove() {
  moveCount++
  moves[moveCount] = [player.x, player.y]
  for (var i = 0; i < blocks.length; i++)
  {
      moves[moveCount].push(blocks[i].x)
      moves[moveCount].push(blocks[i].y)
  }
  clearText()
  addText("Moves: " + moveCount, {x: 0, y: 0, color: color`5`})
}

function loadGame()
{
  setMap(levels[level])
  player = getFirst(Player)
  goal = getFirst(Goal)
  blocks = getAll(Block)
  goals = getAll(Goal)
  moves = [[player.x, player.y]]
  for (var i = 0; i < blocks.length; i++)
  {
      moves[0].push(blocks[i].x)
      moves[0].push(blocks[i].y)
  }
  moveCount = 0
  clearText()
  addText("Moves: " + moveCount, {x: 0, y: 0, color: color`5`})
}

function nextLevel()
{
  if (level >= levels.length - 1)
  {
    win()
    return
  }
  
  level++
  loadGame()
}

function win()
{
  setMap(map`
...
.p.
...`)
  clearText()
  addText("YOU WIN!", {x: 0, y: 0, color: color`3`})
}

loadGame()