/*
@title: Tag
@author: ThomasJPrice
@tags: []
@addedOn: 2024-07-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player1 = "p"
const player2 = "a"
const box = 'b'
const planks = 'c'
const movingBox = 'm'

setLegend(
  [player1, bitmap`
.....00000......
....0CCCCC0.....
...0CCCCCCC0....
...0C22222C0....
...020220220....
...022222220....
...022002220....
....0222220.....
.....00000......
...003333300....
..03333333330...
.0330333330330..
022000000000220.
.00.0888880.00..
....0880880.....
.....00.00......`],
  [player2, bitmap`
.....00000......
....0CCCCC0.....
...0CCCCCCC0....
...0C22222C0....
...020220220....
...022222220....
...022002220....
....0222220.....
.....00000......
...005555500....
..05555555550...
.0550555550550..
022000000000220.
.00.0888880.00..
....0880880.....
.....00.00......`],
  [box, bitmap`
0000000000000000
0999999999999990
0999999999999990
0000000000000000
0990990990990990
0990909909900990
0990099099090990
0990990990990990
0990909909900990
0990099099090990
0990990990990990
0990909909900990
0000000000000000
0999999999999990
0999999999999990
0000000000000000`],
  [planks, bitmap`
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
  [movingBox, bitmap`
0000000000000000
0999999999999990
0999999999999990
0000000000000000
0990990990990990
0990909909900990
0990093333090990
0990993333990990
0990903333900990
0990093333090990
0990990990990990
0990909909900990
0000000000000000
0999999999999990
0999999999999990
0000000000000000`]
)



let level = 0
const levels = [
  map`
.....p
m.bb.m
..m...
.b..b.
..b.b.
a..m..`,
  map`
p.m...
bbb..b
.....m
..b.b.
..m...
a..b..`,
  map`
am..mp
.bb.b.
....b.
.b..m.
mb.bb.
......`,
  map`
pb.b.b
.b.b.b
.b.m.m
.m..b.
b.b.b.
b.b.ba`,
  map`
.m....
..p..b
.bbbmb
m.a..b
...bb.
......`,
  map`
m....m
.bbbb.
.abb..
..bbp.
.bbbb.
m....m`,
]

const levelComplete = tune`
76.33587786259542,
76.33587786259542: G5~76.33587786259542,
76.33587786259542: G5~76.33587786259542 + A5~76.33587786259542 + E4/76.33587786259542,
76.33587786259542: A5~76.33587786259542 + B5~76.33587786259542 + A4-76.33587786259542 + B4-76.33587786259542 + C5-76.33587786259542,
76.33587786259542: B5~76.33587786259542 + A5^76.33587786259542 + G5^76.33587786259542 + F4/76.33587786259542 + E4/76.33587786259542,
76.33587786259542: B5~76.33587786259542 + G5^76.33587786259542 + F5^76.33587786259542 + E5^76.33587786259542 + G4/76.33587786259542,
76.33587786259542: B5~76.33587786259542 + E5^76.33587786259542 + D5^76.33587786259542 + C5^76.33587786259542 + A4/76.33587786259542,
76.33587786259542: B5~76.33587786259542 + C5^76.33587786259542 + B4^76.33587786259542 + A4^76.33587786259542,
76.33587786259542: A4^76.33587786259542,
1755.7251908396947`
setBackground(planks)

setMap(levels[level])
var currentColour = color`0`

if (level % 2) {
  setSolids([player1, box, movingBox])
  currentColour = color`3`
  addText('Red is IT!', options = { x: 5, y: 1, color: currentColour })
} else {
  setSolids([player2, box, movingBox])
  currentColour = color`5`
  addText('Blue is IT!', options = { x: 5, y: 1, color: currentColour })
}

// player 1 controls
onInput("w", () => {
  try {
    getFirst(player1).y -= 1
  } catch (error) {
    respawnPlayer(player1)
  }
})

onInput("a", () => {
  try {
    getFirst(player1).x -= 1
  } catch (error) {
    respawnPlayer(player1)
  }
})

onInput("s", () => {
  try {
    getFirst(player1).y += 1
  } catch (error) {
    respawnPlayer(player1)
  }
})

onInput("d", () => {
  try {
    getFirst(player1).x += 1
  } catch (error) {
    respawnPlayer(player1)
  }
})

// player 2 controls
onInput("i", () => {
  try {
    getFirst(player2).y -= 1
  } catch (error) {
    respawnPlayer(player2)
  }
})

onInput("j", () => {
  try {
    getFirst(player2).x -= 1
  } catch (error) {
    respawnPlayer(player2)
  }
})

onInput("k", () => {
  try {
    getFirst(player2).y += 1
  } catch (error) {
    respawnPlayer(player2)
  }
})

onInput("l", () => {
  try {
    getFirst(player2).x += 1
  } catch (error) {
    respawnPlayer(player2)
  }
})

function respawnPlayer(player) {
  addSprite(0, 0, player)
}

const removeAndRespawnMovingBoxes = () => {
  if (Math.random() < 0.4) {
    const tiles = getAll(movingBox) // Retrieve all movingBox sprites

    tiles.forEach(sprite => {
      const x = sprite.x
      const y = sprite.y

      // Randomly determine if the sprite should disappear and reappear
      if (Math.random() < 0.5) {
        // Check if the spawning position is occupied by a player
        const occupiedByPlayer = tilesWith(player1, player2).some(tile => tile.x === x && tile.y === y)

        if (!occupiedByPlayer) {
          // Remove the movingBox sprite
          clearTile(x, y)
          addSprite(x, y, planks)

          // Generate a random delay between 500ms and 2000ms for the sprite to reappear
          const randomDelay = Math.floor(Math.random() * 1500) + 500

          // Add the movingBox sprite back to the same tile after a random delay
          setTimeout(() => {
            clearTile(x, y)
            addSprite(x, y, movingBox)
          }, randomDelay);
        } else {
          const player1Sprite = getFirst(player1);
          const player2Sprite = getFirst(player2);
          
          if (player1Sprite) {
            player1Sprite.x += 1;
          }
          if (player2Sprite) {
            player2Sprite.x += 1;
          }
        }
      }
    })
  }
}

afterInput(() => {
  removeAndRespawnMovingBoxes()

  var tiles = tilesWith(player1, player2)
  if (tiles.length > 0) {
    clearText()
    addText('TAG!', options = { x: 8, y: 7, color: currentColour })
    playTune(levelComplete)

    if (level === 5) {
      addText('Thank you!', options = { x: 5, y: 1, color: color`0` })
      level += 1
      return
    }

    setTimeout(() => {
      level += 1

      setMap(levels[level])
      clearText()

      if (level % 2) {
        setSolids([player1, box, movingBox])
        currentColour = color`3`
        addText('Red is IT!', options = { x: 5, y: 1, color: currentColour })
      } else {
        setSolids([player2, box, movingBox])
        currentColour = color`5`
        addText('Blue is IT!', options = { x: 5, y: 1, color: currentColour })
      }
    }, 1000);


  }
})
