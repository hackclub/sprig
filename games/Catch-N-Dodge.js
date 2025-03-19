const player = "p"
const apple = "a"
const orange = "o"
const banana = "b"
const bomb = "x"

let point_lookup = {
  [bomb]: 0,
  [apple]: 1,
  [orange]: 2,
  [banana]: 3
}
let potential_fruits = [ orange, banana, bomb ]
let fruits = [ apple ]

setLegend(
  [ player, bitmap`
.0LLLLLLLLLLLL0.
.06L66L66L66L60.
.06L66L66L66L60.
.0LLLLLLLLLLLL0.
.06L66L66L66L60.
.06L66L66L66L60.
.0LLLLLLLLLLLL0.
100066L66L660001
11.006L66L600.11
111.00000000.111
.0....0000....0.
.0...052250...0.
.00000522500000.
.....022220.....
.....033330.....
......0000......` ],
  [ apple, bitmap`
................
.....CC.DDD.....
......CCDD......
.......C........
.....000000.....
...0003333000...
...0333333330...
..003333333300..
..033333333330..
..033333333330..
..033333333330..
..033333333330..
..003333333300..
...0333333330...
...0003333000...
.....000000.....` ],
  [ orange, bitmap`
................
................
........DD......
........DD......
.....00DD00.....
...0009D99000...
...0999999990...
..009999999900..
..099999999990..
..099999999990..
..099999999990..
..099999999990..
..009999999900..
...0999999990...
...0009999000...
.....000000.....` ],
  [ banana, bitmap`
................
................
...0............
...0............
..00............
..060...........
.0660...........
.06660.......0..
..06600.....060.
..0666000000660.
...06666666660..
....006666600...
......00000.....
................
................
................` ],
  [ bomb, bitmap`
........9.......
.......9C.......
.......9CC......
.........C......
.....000000.....
...0000000000...
..00000000000...
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
...0000000000...
.....000000.....` ],
)

setSolids([ player ].concat(potential_fruits).concat(fruits))
setPushables({
  [player]: fruits
})

let level = 0
let score = 0
let fruitInterval = 0
const levels = [
  map`
..a..
.....
.....
..p..`
]

setMap(levels[level])

let gameOver = false
function endGame() {
  gameOver = true
  clearInterval(fruitInterval)
  
  getAll().forEach(sprite => {
    sprite.remove()
  })
  
  clearText()
  addText("Game over!", {
    x: 1,
    y: 1,
    color: color`0`
  })
}

function updateFruits() {
  fruits.forEach(fruit => {
    let fruitObj = getFirst(fruit)
    let initialY = fruitObj.y
    fruitObj.y += 1
    
    if(fruitObj.y != height() && fruitObj.y != initialY)
      return;

    if(fruit == bomb && fruitObj.y == height() - 2 && fruitObj.x == getFirst(player).x)
      endGame()
      
    updateScore(score + (point_lookup[fruit] * (fruitObj.x == getFirst(player).x ? 1 : -1)))
    replaceFruit(fruitObj)
  })

  if(getRandom(5) == 0)
    addFruit()
}
fruitInterval = setInterval(updateFruits, 1000)

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function replaceFruit(fruitObj) {
  fruitObj.y = 0;
  fruitObj.x = getRandom(width());
}

function updateScore(newScore) {
  score = newScore;
  if(score < 0) {
    endGame()
    return;
  }
  
  clearText()
  addText("Score: " + score, {
    x: 1,
    y: 1,
    color: color`3`
  })
}

function addFruit() {
  if(potential_fruits.length == 0)
    return;
  
  const index = getRandom(potential_fruits.length)
  const type = potential_fruits[index]
  
  fruits.push(type)
  addSprite(getRandom(width()), 0, type)
  potential_fruits.splice(index, 1)
}

function getFruitX(newX, direction) {
  const potential_sprite = getTile(newX + direction, height() - 1)[0]
  const fruitX = typeof potential_sprite != 'undefined' ? potential_sprite.x : newX
  
  return fruitX
}

function isOnEdge(fruitX) {
  return fruitX == 0 || fruitX == width() - 1
}

function movePlayerX(newX) {
  let playerObj = getFirst(player)
  
  playerObj.x = newX
  if(playerObj.x == newX || (playerObj.x == 0 && newX < playerObj.x) || (playerObj.x == width() - 1 && newX > playerObj.x))
    return;

  const direction = newX - playerObj.x
  let fruitX = getFruitX(newX, direction)
  
  if(isOnEdge(fruitX)) {
    replaceFruit(getTile(fruitX, height() - 1)[0])
  } else {
    fruitX = direction < 0 ? 0 : width() - 1
    let found_fruits = 0;
    let index = 0;
    
    while(fruitX != playerObj.x) {
      var fruitObj = getTile(fruitX, height() - 1)[0]
      fruitX -= direction
      index += 1
      
      if(typeof fruitObj == 'undefined' || found_fruits >= index)
        continue

      if(isOnEdge(fruitObj.x)) {
        replaceFruit(fruitObj)
      } else {
        fruitObj.x += direction
      }
      found_fruits += 1
    }
  }
  playerObj.x = newX
}

onInput("a", () => {
  if(gameOver)
    return
  
  movePlayerX(getFirst(player).x - 1)
})

onInput("d", () => {
  if(gameOver)
    return
  
  movePlayerX(getFirst(player).x + 1)
})

updateScore(score)
