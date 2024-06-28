/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player1 = "p"
const player2 = "a"
const box = 'b'
const planks = 'c'

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
CCCCCCCCCCCCCCCC`]
)



let level = 0
const levels = [
  map`
.....p
..bb..
......
.b..b.
..b.b.
a.....`,
  map`
p.....
bbb..b
......
..b.b.
......
a..b..`,
  map`
a....p
.bb.b.
....b.
.b....
.b.bb.
......`,
  map`
pb.b.b
.b.b.b
.b....
....b.
b.b.b.
b.b.ba`,
  map`
......
..p..b
.bbb.b
..a..b
...bb.
......`,
  map`
......
.bbbb.
.abb..
..bbp.
.bbbb.
......`,
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
  setSolids([player1, box])
  currentColour = color`3`
  addText('Red is IT!', options = { x: 5, y: 1, color: currentColour })
} else {
  setSolids([player2, box])
  currentColour = color`5`
  addText('Blue is IT!', options = { x: 5, y: 1, color: currentColour })
}

// player 1 controls
onInput("w", () => {
  getFirst(player1).y -= 1
})
onInput("a", () => {
  getFirst(player1).x -= 1
})
onInput("s", () => {
  getFirst(player1).y += 1
})
onInput("d", () => {
  getFirst(player1).x += 1
})


// player 2 controls
onInput("i", () => {
  getFirst(player2).y -= 1
})
onInput("j", () => {
  getFirst(player2).x -= 1
})
onInput("k", () => {
  getFirst(player2).y += 1
})
onInput("l", () => {
  getFirst(player2).x += 1
})

afterInput(() => {
  var tiles = tilesWith(player1, player2)
  if (tiles.length > 0) {
    clearText()
    addText('TAG!', options = { x: 8, y: 7, color: currentColour })
    playTune(levelComplete)

    if (level === 5) {
        addText('Thank you!', options = {x: 5, y: 1, color: color`0`})
        return
    }

    setTimeout(() => {
      level += 1
      
      setMap(levels[level])
      clearText()
  
      if (level % 2) {
        setSolids([player1, box])
        currentColour = color`3`
        addText('Red is IT!', options = { x: 5, y: 1, color: currentColour })
      } else {
        setSolids([player2, box])
        currentColour = color`5`
        addText('Blue is IT!', options = { x: 5, y: 1, color: currentColour })
      }
    }, 1000);
    
    
  }
})