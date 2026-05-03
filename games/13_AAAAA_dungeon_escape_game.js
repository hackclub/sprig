/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: My dungeon escape game
@author: Darsh Shah (Anycircle11139s)
@tags: [submission]
@addedOn: 2026-05-03
@description: A cool dungeon escape game where you have to collect coins before exiting through a door. It has 2 levels and it has bout 5 minutes of playtime.

/*
  dungeon escape game
  explore through a dungeon while collecting coins
  then find the exit door to escape!

  This is my first project so don't blame me if its not that good

  controls: w a s d to move
*/

// sprite names
const player = "p"
const wall   = "w"
const gem    = "g"
const door   = "d"
const floor  = "o"
const torch  = "t"

// game state
var gemsCollected = 0
var currentLevel  = 1
var gameOver      = false

setLegend(

  [ player, bitmap`
CCCCCC66666CCCCC
CCCC6666666666CC
CC6666666666666C
CC6666066606666C
C666660666066666
C666660666066666
C660660666066066
C660666666666066
C660066666660066
C666006666660666
C666600000000666
CC66666666666666
CCCC66666666666C
CCCCCC6666666CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],

  [ wall, bitmap`
0000000000000000
010L1LLLLLLLL1L0
0L000L0L00L000L0
0LLLLLLLLLLLL0L0
0L1LLLLLLL11L0L0
0L1L11111LL1LLL0
0L1L1LLLLLL1L0L0
0LL01111LLL1L0L0
0LL0LLL11LLLLLL0
0LLLLLLL11LLL0L0
0LLLLLLL1LLLL010
0LL11L111LL1LLL0
0L11111LLLL1L0L0
0LL00L0LLL1LL000
0LLLLLLLLLLLLL00
0000000000000000` ],

  [ gem, bitmap`
CCCCC000000CCCCC
CCC0006666000CCC
CC006666666600CC
C00666666666600C
0066666006666600
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0066666006666600
C06666666666600C
C0066666666660CC
CC066666666600CC
CC00000000000CCC` ],

  [ door, bitmap`
CCCCCCCCCCCCCCCC
CC6666666666CCCC
CC6000000006CCCC
CC6000000006CCCC
CC6000000006CCCC
CC6000000006CCCC
CC6000000006CCCC
CC6000000006CCCC
CC6000006006CCCC
CC6000006006CCCC
CC6000006006CCCC
CC6000000006CCCC
CC6000000006CCCC
CC6666666666CCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],

  [ floor, bitmap`
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
CCCCCCCCCCCCCCCC` ],

  [ torch, bitmap`
CCCCCCCCCCCCCCCC
CCCCCC6666CCCCCC
CCCCCC6996CCCCCC
CCCCCC6C96CCCCCC
CCCCCC6666CCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCL00LCCCCCC
CCCCCCLLLLCCCCCC` ]

)

setSolids([ player, wall ])



var level1rows = [
  "wwwwwwwwwwwwwwwwwwww",
  "wpooooooooooooooooww",
  "woowwwwwwwwwwwwoooww",
  "woowooooooooowooooww",
  "woowogoooooogwoootww",
  "woowoooooooowoooowww",
  "woowwwwooowwwoooowww",
  "woooooogooooooooooww",
  "woowwwwooowwwoooodww",
  "woowooooooowwoooowww",
  "woowoogoooooooooooww",
  "woowooootooowoooowww",
  "woowwwwwwwwwwoooowww",
  "woooooooooooooooooww",
  "woowwwwwwwwwwwwoowww",
  "woowooooooooowooooww",
  "woowogooooooowooowww",
  "woowooooooooowooooww",
  "woooooooooooooooooow",
  "wwwwwwwwwwwwwwwwwwww"
]

var level2rows = [
  "wwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwdw",
  "wwpoooooooooooooooow",
  "wwowwwwwwwwwwwwoowww",
  "wwowoooooooooowoowww",
  "wwowogwwwwwwgowoowww",
  "wwowoooooooooowoowww",
  "wwowwwwwoowwwwwoowww",
  "wwooooowooooooooowww",
  "wwwwwwowooowwwwwwwww",
  "wwoooowoooooooogowww",
  "wwowwowwwwwwwwwoowww",
  "wwowoooooooooowoowww",
  "wwowogoooooogowoowww",
  "wwowooooootooowoowww",
  "wwowwwwwwwwwwwwoowww",
  "wwooooooooooooooowww",
  "wwwwwwwwwwwwwwooooww",
  "wwwwwwwwwwwwwwooooww",
  "wwwwwwwwwwwwwwwwwwww"
]

function loadLevel(num) {
  gemsCollected = 0
  gameOver = false
  clearText()
  addText("gems: 0/5", { x: 1, y: 14, color: color`2` })
  addText("level " + num,   { x: 12, y: 14, color: color`7` })

  if (num == 1) {
    setMap(level1rows.join("\n"))
  } else {
    setMap(level2rows.join("\n"))
  }
}

loadLevel(1)



onInput("w", () => {
  if (gameOver) return
  getFirst(player).y -= 1
  checkGem()
  checkDoor()
})

onInput("s", () => {
  if (gameOver) return
  getFirst(player).y += 1
  checkGem()
  checkDoor()
})

onInput("a", () => {
  if (gameOver) return
  getFirst(player).x -= 1
  checkGem()
  checkDoor()
})

onInput("d", () => {
  if (gameOver) return
  getFirst(player).x += 1
  checkGem()
  checkDoor()
})


function checkGem() {
  var p = getFirst(player)
  var allGems = getAll(gem)
  for (var i = 0; i < allGems.length; i++) {
    var thisGem = allGems[i]
    if (thisGem.x == p.x && thisGem.y == p.y) {
      // replace gem tile with a floor tile so no white gap!
      thisGem.remove()
      addSprite(p.x, p.y, floor)
      gemsCollected = gemsCollected + 1
      clearText()
      addText("gems: " + gemsCollected + "/5", { x: 1, y: 14, color: color`2` })
      addText("level " + currentLevel, { x: 12, y: 14, color: color`7` })
      if (gemsCollected == 5) {
        addText("find the door!", { x: 3, y: 8, color: color`4` })
      }
    }
  }
}



function checkDoor() {
  var p = getFirst(player)
  var allDoors = getAll(door)
  for (var i = 0; i < allDoors.length; i++) {
    var thisDoor = allDoors[i]
    if (thisDoor.x == p.x && thisDoor.y == p.y) {
      if (gemsCollected >= 5) {
        if (currentLevel == 1) {
          currentLevel = 2
          loadLevel(2)
        } else {
          gameOver = true
          clearText()
          addText("YOU ESCAPED", { x: 4, y: 6, color: color`4` })
          addText("THE DUNGEON!",  { x: 4, y: 8, color: color`6` })
        }
      } else {
        var need = 5 - gemsCollected
        clearText()
        addText("gems: " + gemsCollected + "/5", { x: 1, y: 14, color: color`2` })
        addText("level " + currentLevel, { x: 12, y: 14, color: color`7` })
        addText("need " + need + " more gems", { x: 2, y: 11, color: color`2` })
      }
    }
  }
}
