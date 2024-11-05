/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Infinity Jump Lite
@author: levi
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const block = "b"
const backdrop = "d"

let gravity = 1
let canFall = false
let falling = false
let jumping = false

setLegend(
  [ player, bitmap`
.....000000.....
...0022222200...
..024444444420..
.02444444444420.
.04444444442440.
0444444444442440
0444444444442440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
.04444444444440.
.0D4444444444D0.
..0D44444444D0..
...00DDDDDD00...
.....000000.....` ],
  [ block, bitmap`
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
  [ backdrop, bitmap`
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
1111111111111111` ]
)

setSolids([player, block])

let level = 1
const levels = [
  map`
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
....................
....................
....................
..........p.........
bbbbbbbbbbbbbbbbbbbb`];

setMap(levels[0])

setBackground(backdrop)

setPushables({
  [ player ]: []
})

regenerateLevel()
addText("Level " + level, { 
      x: 0,
      y: 0,
      color: color`4`
    })

onInput("a", () => {
  moveLeft()
  setTimeout(moveLeft, 50)
})

onInput("d", () => {
  moveRight()
  setTimeout(moveRight, 50)
})

onInput("k", () => {
  checkForGround()  
  if (grounded)
    {
      jumping = true
      getFirst(player).y -= 1
      setTimeout(jump, 50)
      setTimeout(jump, 150)
      setTimeout(fall, 350)
    }
  }
)

afterInput(() => {
  
})

function checkForGround()
{

  var checkX = getFirst(player).x
  var checkY = getFirst(player).y +1
  if ((getTile(checkX, checkY)).find(sprite => sprite.type == block))
  {
    grounded = true
    falling = false
  } 
  else
  {
    grounded = false
  }
}

function fall() 
{
  checkForGround()
  
  if (!grounded)
  {
    falling = true
    getFirst(player).y += 1
    setTimeout(fall, 100)
  }
  else
  {
    falling = false
  }
  
  jumping = false
  
}

function jump() 
{
  getFirst(player).y -= 1
  
  if (getFirst(player).y == 0)
  {
    clear()
    getFirst(player).y = 14
    regenerateLevel()

    level++
    addText("Level " + level, { 
      x: 0,
      y: 0,
      color: color`4`
    })
  }
}

function moveLeft()
{
  getFirst(player).x -= 1
  if (!jumping && !falling) {setTimeout(fall, 50)}
}

function moveRight()
{
  getFirst(player).x += 1
  if (!jumping && !falling) {setTimeout(fall, 50)}
}

function regenerateLevel()
{
  var contextX = Math.floor(Math.random() * 19)
  var contextY = 12 + Math.floor(Math.random() * 2)
  
  addSprite(contextX, contextY, block)
  if (contextX < 19)
  {
    addSprite(contextX + 1, contextY, block)
  }
  else
  {
    addSprite(contextX - 1, contextY, block)
  }

  if (contextX < 10)
  {
    contextX = contextX + 2 + Math.floor(Math.random() * 3)
    contextY = contextY - 2 - Math.floor(Math.random() * 2)
    addSprite(contextX, contextY, block)
    addSprite(contextX + 1, contextY, block)
  }
  else
  {
    contextX = contextX - 2 - Math.floor(Math.random() * 3)
    contextY = contextY - 2 - Math.floor(Math.random() * 2)
    addSprite(contextX, contextY, block)
    addSprite(contextX - 1, contextY, block)
  }
  var softlockPos = contextX

  if (contextY > 8)
  {
    if (contextX < 10)
    {
      contextX = contextX + 2 + Math.floor(Math.random() * 3)
      while (contextX <= softlockPos)
        {
          contextX = contextX + 2 + Math.floor(Math.random() * 3)
        }
      addSprite(contextX, 8, block)
      addSprite(contextX + 1, 8, block)
    }
    else
    {
      contextX = contextX - 2 - Math.floor(Math.random() * 3)
      while (contextX >= softlockPos)
        {
          contextX = contextX + 2 + Math.floor(Math.random() * 3)
        }
      addSprite(contextX, 8, block)
      addSprite(contextX - 1, 8, block)
    }
    contextY = 8
  }

  if (contextX < 10)
  {
    contextX = contextX + 2 + Math.floor(Math.random() * 3)
    contextY = contextY - 2 - Math.floor(Math.random() * 2)
    addSprite(contextX, contextY, block)
    addSprite(contextX + 1, contextY, block)
  }
  else
  {
    contextX = contextX - 2 - Math.floor(Math.random() * 3)
    contextY = contextY - 2 - Math.floor(Math.random() * 2)
    addSprite(contextX, contextY, block)
    addSprite(contextX - 1, contextY, block)
  }

  if (contextX < 10)
  {
    contextX = contextX + 2 + Math.floor(Math.random() * 3)
    contextY = contextY - 2 - Math.floor(Math.random() * 2)
    addSprite(contextX, contextY, block)
    addSprite(contextX + 1, contextY, block)
  }
  else
  {
    contextX = contextX - 2 - Math.floor(Math.random() * 3)
    contextY = contextY - 2 - Math.floor(Math.random() * 2)
    addSprite(contextX, contextY, block)
    addSprite(contextX - 1, contextY, block)
  }
}

function clear()
{
  clearTile(0, 1)
  clearTile(1, 1)
  clearTile(2, 1)
  clearTile(3, 1)
  clearTile(4, 1)
  clearTile(5, 1)
  clearTile(6, 1)
  clearTile(7, 1)
  clearTile(8, 1)
  clearTile(9, 1)
  clearTile(10, 1)
  clearTile(11, 1)
  clearTile(12, 1)
  clearTile(13, 1)
  clearTile(14, 1)
  clearTile(15, 1)
  clearTile(16, 1)
  clearTile(17, 1)
  clearTile(18, 1)
  clearTile(19, 1)
  clearTile(0, 2)
  clearTile(1, 2)
  clearTile(2, 2)
  clearTile(3, 2)
  clearTile(4, 2)
  clearTile(5, 2)
  clearTile(6, 2)
  clearTile(7, 2)
  clearTile(8, 2)
  clearTile(9, 2)
  clearTile(10, 2)
  clearTile(11, 2)
  clearTile(12, 2)
  clearTile(13, 2)
  clearTile(14, 2)
  clearTile(15, 2)
  clearTile(16, 2)
  clearTile(17, 2)
  clearTile(18, 2)
  clearTile(19, 2)
  clearTile(0, 3)
  clearTile(1, 3)
  clearTile(2, 3)
  clearTile(3, 3)
  clearTile(4, 3)
  clearTile(5, 3)
  clearTile(6, 3)
  clearTile(7, 3)
  clearTile(8, 3)
  clearTile(9, 3)
  clearTile(10, 3)
  clearTile(11, 3)
  clearTile(12, 3)
  clearTile(13, 3)
  clearTile(14, 3)
  clearTile(15, 3)
  clearTile(16, 3)
  clearTile(17, 3)
  clearTile(18, 3)
  clearTile(19, 3)
  clearTile(0, 4)
  clearTile(1, 4)
  clearTile(2, 4)
  clearTile(3, 4)
  clearTile(4, 4)
  clearTile(5, 4)
  clearTile(6, 4)
  clearTile(7, 4)
  clearTile(8, 4)
  clearTile(9, 4)
  clearTile(10, 4)
  clearTile(11, 4)
  clearTile(12, 4)
  clearTile(13, 4)
  clearTile(14, 4)
  clearTile(15, 4)
  clearTile(16, 4)
  clearTile(17, 4)
  clearTile(18, 4)
  clearTile(19, 4)
  clearTile(0, 5)
  clearTile(1, 5)
  clearTile(2, 5)
  clearTile(3, 5)
  clearTile(4, 5)
  clearTile(5, 5)
  clearTile(6, 5)
  clearTile(7, 5)
  clearTile(8, 5)
  clearTile(9, 5)
  clearTile(10, 5)
  clearTile(11, 5)
  clearTile(12, 5)
  clearTile(13, 5)
  clearTile(14, 5)
  clearTile(15, 5)
  clearTile(16, 5)
  clearTile(17, 5)
  clearTile(18, 5)
  clearTile(19, 5)
  clearTile(0, 6)
  clearTile(1, 6)
  clearTile(2, 6)
  clearTile(3, 6)
  clearTile(4, 6)
  clearTile(5, 6)
  clearTile(6, 6)
  clearTile(7, 6)
  clearTile(8, 6)
  clearTile(9, 6)
  clearTile(10, 6)
  clearTile(11, 6)
  clearTile(12, 6)
  clearTile(13, 6)
  clearTile(14, 6)
  clearTile(15, 6)
  clearTile(16, 6)
  clearTile(17, 6)
  clearTile(18, 6)
  clearTile(19, 6)
  clearTile(0, 7)
  clearTile(1, 7)
  clearTile(2, 7)
  clearTile(3, 7)
  clearTile(4, 7)
  clearTile(5, 7)
  clearTile(6, 7)
  clearTile(7, 7)
  clearTile(8, 7)
  clearTile(9, 7)
  clearTile(10, 7)
  clearTile(11, 7)
  clearTile(12, 7)
  clearTile(13, 7)
  clearTile(14, 7)
  clearTile(15, 7)
  clearTile(16, 7)
  clearTile(17, 7)
  clearTile(18, 7)
  clearTile(19, 7)
  clearTile(0, 8)
  clearTile(1, 8)
  clearTile(2, 8)
  clearTile(3, 8)
  clearTile(4, 8)
  clearTile(5, 8)
  clearTile(6, 8)
  clearTile(7, 8)
  clearTile(8, 8)
  clearTile(9, 8)
  clearTile(10, 8)
  clearTile(11, 8)
  clearTile(12, 8)
  clearTile(13, 8)
  clearTile(14, 8)
  clearTile(15, 8)
  clearTile(16, 8)
  clearTile(17, 8)
  clearTile(18, 8)
  clearTile(19, 8)
  clearTile(0, 9)
  clearTile(1, 9)
  clearTile(2, 9)
  clearTile(3, 9)
  clearTile(4, 9)
  clearTile(5, 9)
  clearTile(6, 9)
  clearTile(7, 9)
  clearTile(8, 9)
  clearTile(9, 9)
  clearTile(10, 9)
  clearTile(11, 9)
  clearTile(12, 9)
  clearTile(13, 9)
  clearTile(14, 9)
  clearTile(15, 9)
  clearTile(16, 9)
  clearTile(17, 9)
  clearTile(18, 9)
  clearTile(19, 9)
  clearTile(0, 10)
  clearTile(1, 10)
  clearTile(2, 10)
  clearTile(3, 10)
  clearTile(4, 10)
  clearTile(5, 10)
  clearTile(6, 10)
  clearTile(7, 10)
  clearTile(8, 10)
  clearTile(9, 10)
  clearTile(10, 10)
  clearTile(11, 10)
  clearTile(12, 10)
  clearTile(13, 10)
  clearTile(14, 10)
  clearTile(15, 10)
  clearTile(16, 10)
  clearTile(17, 10)
  clearTile(18, 10)
  clearTile(19, 10)
  clearTile(0, 11)
  clearTile(1, 11)
  clearTile(2, 11)
  clearTile(3, 11)
  clearTile(4, 11)
  clearTile(5, 11)
  clearTile(6, 11)
  clearTile(7, 11)
  clearTile(8, 11)
  clearTile(9, 11)
  clearTile(10, 11)
  clearTile(11, 11)
  clearTile(12, 11)
  clearTile(13, 11)
  clearTile(14, 11)
  clearTile(15, 11)
  clearTile(16, 11)
  clearTile(17, 11)
  clearTile(18, 11)
  clearTile(19, 11)
  clearTile(0, 12)
  clearTile(1, 12)
  clearTile(2, 12)
  clearTile(3, 12)
  clearTile(4, 12)
  clearTile(5, 12)
  clearTile(6, 12)
  clearTile(7, 12)
  clearTile(8, 12)
  clearTile(9, 12)
  clearTile(10, 12)
  clearTile(11, 12)
  clearTile(12, 12)
  clearTile(13, 12)
  clearTile(14, 12)
  clearTile(15, 12)
  clearTile(16, 12)
  clearTile(17, 12)
  clearTile(18, 12)
  clearTile(19, 12)
  clearTile(0, 13)
  clearTile(1, 13)
  clearTile(2, 13)
  clearTile(3, 13)
  clearTile(4, 13)
  clearTile(5, 13)
  clearTile(6, 13)
  clearTile(7, 13)
  clearTile(8, 13)
  clearTile(9, 13)
  clearTile(10, 13)
  clearTile(11, 13)
  clearTile(12, 13)
  clearTile(13, 13)
  clearTile(14, 13)
  clearTile(15, 13)
  clearTile(16, 13)
  clearTile(17, 13)
  clearTile(18, 13)
  clearTile(19, 13)
  clearTile(0, 14)
  clearTile(1, 14)
  clearTile(2, 14)
  clearTile(3, 14)
  clearTile(4, 14)
  clearTile(5, 14)
  clearTile(6, 14)
  clearTile(7, 14)
  clearTile(8, 14)
  clearTile(9, 14)
  clearTile(10, 14)
  clearTile(11, 14)
  clearTile(12, 14)
  clearTile(13, 14)
  clearTile(14, 14)
  clearTile(15, 14)
  clearTile(16, 14)
  clearTile(17, 14)
  clearTile(18, 14)
  clearTile(19, 14)
}
