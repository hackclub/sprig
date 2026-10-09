/*
@title: Generating Maze
@description: Generates a new maze each time.
@author: Glitchtest(51)
@tags: ['Maze', 'Procedurally Generated']
@addedOn: 2026-10-03
*/

// init sprites
const player = "p"
const wall = "w"
const goal = "g"
setLegend([player, bitmap`
.......55.......
.....555555.....
...5555555555...
..555555555555..
..555555555555..
.55555555555555.
.55555555555555.
5555555555555555
5555555555555555
.55555555555555.
.55555555555555.
..555555555555..
..555555555555..
...5555555555...
.....555555.....
.......55.......`],
[wall, bitmap`
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
[goal, bitmap`
.........333....
......3333233...
...3333002023...
...3002020023...
...3000220203...
...3000202203...
...3002002023...
...3002020023...
...3000220333...
...30003333.....
...30033........
...3003.........
...3003.........
...3003.........
...3003.........
...3333.........`])

setSolids([player, wall])

//generate level
function gcd(a, b) {
    a = Math.abs(Math.floor(a))
    b = Math.abs(Math.floor(b))

    while (b > 0) {
        const temp = b
        b = a % b
        a = temp
    }

    return a
}

function generateMaze(height, width) {
  if (width < 6 || height < 5) { width = 6; height = 5; }
  var level = Array.from({ length: height }, () => Array(width).fill('w'))
  
  var x = Math.floor(width/2)
  var y = Math.floor(height/2)
  var direction = Math.floor(Math.random() * 4)
  
  var distance = 0
  var furthest_distance = 0
  var furthest_x = 0
  var furthest_y = 0

  function move(amount) {    
    switch (direction) {
      case 0: y -= amount; break; // Up
      case 1: x += amount; break; // Right
      case 2: y += amount; break; // Down
      case 3: x -= amount; break; // Left
    }
  }

  function checkDirections(start_direction) {
    direction = Math.floor(Math.random() * 4)
    var valid = false
    for (let i = 0; i < 4; i++) {
      move(2)
      if (y < height && x < width && y >= 0 && x >= 0) { valid = !(level[y][x] == "." || level[y][x] == "g") }
      else {valid = false}
      move(-2)
      if (valid) {maze()}
      direction = (direction + 1) % 4;
    }
    direction = start_direction
  }

  function maze() {
    if (!(level[y][x] == "g")) { level[y][x] = "." }
    for (let i = 0; i < 2; i++) {
      move(1)
      if (!(level[y][x] == "g")) { level[y][x] = "." }
    }
    distance += 1
    if (distance > furthest_distance) {
      furthest_distance = distance
      furthest_x = x
      furthest_y = y
    }
    checkDirections(direction)
    move(-2)
    distance -=1
  }

  level[y][x] = "g"
  maze()

  level[furthest_y][furthest_x] = "p"
  setMap(level.map(row => row.join('')).join('\n'))
}

const max_width = 160
const max_height = 128
const max_size = 28
var size = 10

generateMaze(Math.round(max_height/size), Math.round(max_width/size))

// player movement
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

// change size
onInput("i", () => {
  size = Math.min(size + 1, max_size)
  generateMaze(Math.round(max_height/size), Math.round(max_width/size))
})

onInput("k", () => {
  size = Math.max(size - 1, 1)
  generateMaze(Math.round(max_height/size), Math.round(max_width/size))
})

// regenerate
onInput("j", () => {
  generateMaze(Math.round(max_height/size), Math.round(max_width/size))
})

onInput("l", () => {
  generateMaze(Math.round(max_height/size), Math.round(max_width/size))
})

// win detection
var won=false

afterInput(() => {
  if (won) {
    clearText()
    won=false
    generateMaze(Math.round(max_height / size), Math.round(max_width / size))
  }
  if (tilesWith(goal, player).length > 0 && !won) {
    won=true
    addText("you win!", { y: 4, color: color`3` })
  }
})
