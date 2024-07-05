/*
@title: Tretris
@author: Xander K.
@tags: []
@addedOn: 2024-00-00
*/

const blackTile = "b"
const whiteTile = "w"
const menuSelectorLeft = "<"
const menuSelectorRight = ">"
const iBlock = "i"
const jBlock = "j"
const lBlock = "l"
const oBlock = "o"
const sBlock = "s"
const tBlock = "t"
const zBlock = "z"
const borderLeft = "1"
const borderRight = "2"

setLegend
(
  [ blackTile, bitmap`
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
  [ whiteTile, bitmap`
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
  [ menuSelectorLeft, bitmap`
................
................
................
........00......
.......020......
......0220......
.....02220......
....022220......
....022220......
.....02220......
......0220......
.......020......
........00......
................
................
................` ],
  [ menuSelectorRight, bitmap`
................
................
................
......00........
......020.......
......0220......
......02220.....
......022220....
......022220....
......02220.....
......0220......
......020.......
......00........
................
................
................` ],
  [ iBlock, bitmap`
7777777777777777
7777777777777777
7722227777777777
7722227777777777
7722777777777777
7722777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ jBlock, bitmap`
5555555555555555
5555555555555555
5522225555555555
5522225555555555
5522555555555555
5522555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ lBlock, bitmap`
9999999999999999
9999999999999999
9922229999999999
9922229999999999
9922999999999999
9922999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ],
  [ oBlock, bitmap`
6666666666666666
6666666666666666
6622226666666666
6622226666666666
6622666666666666
6622666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ sBlock, bitmap`
4444444444444444
4444444444444444
4422224444444444
4422224444444444
4422444444444444
4422444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ tBlock, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH2222HHHHHHHHHH
HH2222HHHHHHHHHH
HH22HHHHHHHHHHHH
HH22HHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH` ],
  [ zBlock, bitmap`
3333333333333333
3333333333333333
3322223333333333
3322223333333333
3322333333333333
3322333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ borderLeft, bitmap`
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22` ],
  [ borderRight, bitmap`
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............` ]
)

let level = 0
const levels = 
[
  map`
...........................
...........................
...........................
...........................
...........................
.iii.jjj.lll.ooo.sss.t.zzz.
..i..j.j.l....o..s.s.t.z...
..i..jj..ll...o..ss..t.zzz.
..i..j.j.l....o..s.s.t...z.
..i..j.j.lll..o..s.s.t.zzz.
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................`,
  map`
............
............
............
............
............
............
....<..>....
............
............
............`,
  map`
............
............
............
............
............
............
.>..........
............
............`,
  map`
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......
......1..........2......`
]

setMap(levels[level])
setBackground(blackTile)

const leftBound = 7
const rightBound = 17

const songA = tune`
214.28571428571428: A5/214.28571428571428 + A4~214.28571428571428 + D4^214.28571428571428,
214.28571428571428: F4^214.28571428571428,
214.28571428571428: D5/214.28571428571428 + D4^214.28571428571428,
214.28571428571428: E5/214.28571428571428 + F4^214.28571428571428,
214.28571428571428: G5/214.28571428571428 + G4~214.28571428571428 + D4^214.28571428571428,
214.28571428571428: F4^214.28571428571428,
214.28571428571428: F5/214.28571428571428 + D4^214.28571428571428,
214.28571428571428: E5/214.28571428571428 + F4^214.28571428571428,
214.28571428571428: D4~214.28571428571428 + D5/214.28571428571428 + C4^214.28571428571428,
214.28571428571428: E4^214.28571428571428,
214.28571428571428: D5/214.28571428571428 + C4^214.28571428571428,
214.28571428571428: F5/214.28571428571428 + E4^214.28571428571428,
214.28571428571428: A5/214.28571428571428 + A4~214.28571428571428 + C4^214.28571428571428,
214.28571428571428: E4^214.28571428571428,
214.28571428571428: G5/214.28571428571428 + C4^214.28571428571428,
214.28571428571428: F5/214.28571428571428 + E4^214.28571428571428,
214.28571428571428: E4~214.28571428571428 + E5/214.28571428571428 + D4^214.28571428571428,
214.28571428571428: F4^214.28571428571428,
214.28571428571428: E5/214.28571428571428 + D4^214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4^214.28571428571428,
214.28571428571428: G4~214.28571428571428 + G5/214.28571428571428 + D4^214.28571428571428,
214.28571428571428: F4^214.28571428571428,
214.28571428571428: A5/214.28571428571428 + D4^214.28571428571428,
214.28571428571428: F4^214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4~214.28571428571428 + C4^214.28571428571428,
214.28571428571428: E4^214.28571428571428,
214.28571428571428: D5/214.28571428571428 + D4~214.28571428571428 + C4^214.28571428571428,
214.28571428571428: E4^214.28571428571428,
214.28571428571428: D5/214.28571428571428 + D4~214.28571428571428 + C4^214.28571428571428,
214.28571428571428: E4^214.28571428571428,
214.28571428571428: C4^214.28571428571428,
214.28571428571428: E4^214.28571428571428`
const songB = tune`
214.28571428571428: D5/214.28571428571428 + C4^214.28571428571428,
214.28571428571428,
214.28571428571428: D4^214.28571428571428 + G5/214.28571428571428,
214.28571428571428: D5/214.28571428571428,
214.28571428571428: C4^214.28571428571428 + G5/214.28571428571428,
214.28571428571428,
214.28571428571428: E4^214.28571428571428 + F5/214.28571428571428,
214.28571428571428,
214.28571428571428: C4^214.28571428571428 + D5/214.28571428571428,
214.28571428571428,
214.28571428571428: F4^214.28571428571428 + E5/214.28571428571428,
214.28571428571428,
214.28571428571428: C4^214.28571428571428 + C5/214.28571428571428,
214.28571428571428: C5/214.28571428571428,
214.28571428571428: E4^214.28571428571428 + A4~214.28571428571428 + C5/214.28571428571428,
214.28571428571428,
214.28571428571428: C4^214.28571428571428 + B4/214.28571428571428,
214.28571428571428: B4/214.28571428571428,
214.28571428571428: D4^214.28571428571428 + B4/214.28571428571428 + G4~214.28571428571428,
214.28571428571428,
214.28571428571428: C4^214.28571428571428 + A4/214.28571428571428,
214.28571428571428: A4/214.28571428571428,
214.28571428571428: E4^214.28571428571428 + A4/214.28571428571428 + F4~214.28571428571428,
214.28571428571428,
214.28571428571428: C4^214.28571428571428 + G4/214.28571428571428,
214.28571428571428: D5/214.28571428571428,
214.28571428571428: B4/214.28571428571428 + F4^214.28571428571428,
214.28571428571428: D5/214.28571428571428,
214.28571428571428: B4/214.28571428571428 + C4^214.28571428571428,
214.28571428571428,
214.28571428571428: E4^214.28571428571428,
214.28571428571428`
let songPlayback = null;

const oneLineClearSound = tune`
59.171597633136095,
59.171597633136095: C5-59.171597633136095,
59.171597633136095: D5-59.171597633136095,
59.171597633136095: E5-59.171597633136095,
59.171597633136095: F5-59.171597633136095,
1597.6331360946745`
const twoLineClearSound = tune`
59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: E5-59.523809523809526,
59.523809523809526: D5-59.523809523809526,
59.523809523809526: F5-59.523809523809526,
59.523809523809526: E5-59.523809523809526,
59.523809523809526: G5-59.523809523809526,
1488.095238095238`
const threeLineClearSound = tune`
59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: E5-59.523809523809526,
59.523809523809526: A5-59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: E5-59.523809523809526,
59.523809523809526: A5-59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: E5-59.523809523809526,
59.523809523809526: A5-59.523809523809526,
1309.5238095238096`
const tretrisSound = tune`
59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: F5-59.523809523809526,
59.523809523809526: D5-59.523809523809526 + C4/59.523809523809526,
59.523809523809526: B5-59.523809523809526 + C4/59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: F5-59.523809523809526,
59.523809523809526: D5-59.523809523809526 + C4/59.523809523809526,
59.523809523809526: B5-59.523809523809526 + C4/59.523809523809526,
59.523809523809526: C5-59.523809523809526,
59.523809523809526: F5-59.523809523809526,
59.523809523809526: D5-59.523809523809526 + C4/59.523809523809526,
59.523809523809526: B5-59.523809523809526 + C4/59.523809523809526,
1130.952380952381`

const levelUpSound = tune`
100.33444816053512: E5~100.33444816053512 + C5^100.33444816053512 + A4^100.33444816053512,
100.33444816053512: G5~100.33444816053512 + E5^100.33444816053512 + C5^100.33444816053512,
100.33444816053512: A5~100.33444816053512 + F5^100.33444816053512 + D5^100.33444816053512,
100.33444816053512: B5~100.33444816053512 + G5^100.33444816053512 + E5^100.33444816053512,
2809.3645484949834`

const pauseSound = tune`
100,
100: E5~100,
100: C5~100,
100: E5~100,
100: C5~100,
2700`

const loseSound = tune`
60.851926977687626: E5~60.851926977687626 + G5^60.851926977687626,
60.851926977687626: E5~60.851926977687626 + G5^60.851926977687626,
60.851926977687626: E5~60.851926977687626 + G5^60.851926977687626,
60.851926977687626: D5~60.851926977687626 + F5^60.851926977687626,
60.851926977687626: D5~60.851926977687626 + F5^60.851926977687626,
60.851926977687626: D5~60.851926977687626 + F5^60.851926977687626,
60.851926977687626: C5~60.851926977687626 + E5^60.851926977687626,
60.851926977687626: C5~60.851926977687626 + E5^60.851926977687626,
60.851926977687626: C5~60.851926977687626 + E5^60.851926977687626,
60.851926977687626: B4~60.851926977687626 + D5^60.851926977687626,
60.851926977687626: B4~60.851926977687626 + D5^60.851926977687626,
60.851926977687626: A4~60.851926977687626 + C5^60.851926977687626,
60.851926977687626: A4~60.851926977687626 + C5^60.851926977687626,
60.851926977687626: G4~60.851926977687626 + B4^60.851926977687626,
60.851926977687626: G4~60.851926977687626 + B4^60.851926977687626,
60.851926977687626: F4~60.851926977687626 + A4^60.851926977687626,
60.851926977687626: E4~60.851926977687626 + G4^60.851926977687626,
60.851926977687626: D4~60.851926977687626 + F4^60.851926977687626,
60.851926977687626: C4~60.851926977687626 + E4^60.851926977687626,
791.0750507099391 `

let currentBlockType = "."
let activeBlocks = []

onInput("a", () => 
{
  if (level === 1)
  {
    startLevel--
    if (startLevel < 0)
    {
      startLevel = 0
    }
    updateLevelMenu()
  }
  else if (level === 2)
  {
    if (currentSong === null || currentSong === songA)
    {
      currentSong = songB
      getFirst(menuSelectorRight).x = 6
    }
    else 
    {
      currentSong = songA
      getFirst(menuSelectorRight).x = 1
    }

    restartMusic()
  }
  else if (level === 3)
  {
    if (hasLost || paused)
    {
      return
    }
    
    // Check for obstacle on left
    let canMove = true
    for (let i = 3; i >= 0; i--)
    {
      if (checkForTile(activeBlocks[i], -1, 0))
      {
        canMove = false
      }
    }
  
    if (canMove)
    {
      for (let i = 3; i >= 0; i--)
      {
        moveBlockSprite(activeBlocks[i], -1, 0)
      }
    }
  }
})

onInput("d", () => 
{
  if (level === 1)
  {
    startLevel++
    if (startLevel > 29)
    {
      startLevel = 29
    }
    
    updateLevelMenu()
  }
  else if (level === 2)
  {
    if (currentSong === null || currentSong === songA)
    {
      currentSong = songB
      getFirst(menuSelectorRight).x = 6
    }
    else 
    {
      currentSong = songA
      getFirst(menuSelectorRight).x = 1
    }

    restartMusic()
  }
  else if (level === 3)
  {
    if (hasLost || paused)
    {
      return
    }
    
    // Check for obstacle on right
    let canMove = true
    for (let i = 3; i >= 0; i--)
    {
      if (checkForTile(activeBlocks[i], 1, 0))
      {
        canMove = false
      }
    }
  
    if (canMove)
    {
      for (let i = 3; i >= 0; i--)
      {
        moveBlockSprite(activeBlocks[i], 1, 0)
      }
    }
  }
})

let currentRotation = 0
// Rotate right
onInput("l", () =>
{
  if (level === 0)
  {
    openLevelMenu()
  }
  else if (level === 1)
  {
    openMusicMenu()
  }
  else if (level === 2)
  {
    startGame()
  }
  else if (level === 3)
  {
    if (paused || !canInteract)
    {
      return
    }
    else if (hasLost && canInteract)
    {
      startGame()
      return
    }
    
    // Rotate active blocks
    rotate(1)
    switch (currentBlockType)
    {
      case iBlock:
        rotateIBlockRight()
        break
      case jBlock:
        rotateJBlockRight()
        break
      case lBlock:
        rotateLBlockRight()
        break
      // O blocks do not rotate
      case sBlock:
        rotateSBlockRight()
        break
      case tBlock:
        rotateTBlockRight()
        break
      case zBlock:
        rotateZBlockRight()
        break
    }
  }
})
// Rotate left
onInput("k", () =>
{
  if (level === 1)
  {
    openBaseMenu()
  }
  else if (level === 2)
  {
    openLevelMenu()
  }
  else if (level === 3)
  {
    if (paused)
    {
      return
    }
    else if (hasLost && canInteract)
    {
      openBaseMenu()
      return
    }
    
    // Rotate active blocks
    rotate(-1)
    switch (currentBlockType)
    {
      case iBlock:
        rotateIBlockLeft()
        break
      case jBlock:
        rotateJBlockLeft()
        break
      case lBlock:
        rotateLBlockLeft()
        break
      // O blocks do not rotate
      case sBlock:
        rotateSBlockLeft()
        break
      case tBlock:
        rotateTBlockLeft()
        break
      case zBlock:
        rotateZBlockLeft()
        break
    }
  }
})

onInput("s", () =>
{
  if (level === 3)
  {
    if (hasLost || paused)
    {
      return
    }
    
    // Move down
    let canMoveDown = true
    for (let i = 0; i < activeBlocks.length; i++) 
    {
      if (checkForTile(activeBlocks[i], 0, 1) || activeBlocks[i].y >= height() - 1)
      {
        canMoveDown = false
      }
    }
  
    if (canMoveDown)
    {
      for (let i = 0; i < activeBlocks.length; i++) 
      {
        moveBlockSprite(activeBlocks[i], 0, 1)
      }
    }
  }
})

onInput("w", () =>
{
  if (level === 3)
  {
    if (hasLost || paused)
    {
      return
    }
  
    while (true)
    {
      for (let i = 0; i < activeBlocks.length; i++) 
      {
        if (checkForTile(activeBlocks[i], 0, 1) || activeBlocks[i].y >= height() - 1)
        {
          // Settle block
          activeBlocks = []
          hasSwappedPiece = false
          checkForClearedLines()
          spawnRandomBlock()
          return
        }
      }
  
      for (let i = 0; i < activeBlocks.length; i++) 
      {
        moveBlockSprite(activeBlocks[i], 0, 1)
      }
    }
  }
})

let heldPiece = null
let hasSwappedPiece = false
onInput("j", () =>
{
  if (level === 3)
  {
    if (hasSwappedPiece || hasLost || paused)
    {
      return
    }
  
    hasSwappedPiece = true
    currentRotation = 0
  
    // Remove current block from field
    for (let i = 0; i < activeBlocks.length; i++)
    {
      clearTile(activeBlocks[i].x, activeBlocks[i].y)
    }
    activeBlocks = []
    
    if (heldPiece === null)
    {
      heldPiece = currentBlockType
      spawnRandomBlock()
      updateHeldPieceGraphic()
      return
    }
  
    // Swap held block
    let temp = heldPiece
    heldPiece = currentBlockType
    currentBlockType = temp
  
    // Spawn new block
    switch (currentBlockType)
    {
      case iBlock:
        spawnIBlock()
        break
      case jBlock:
        spawnJBlock()
        break
      case lBlock:
        spawnLBlock()
        break
      case oBlock:
        spawnOBlock()
        break
      case sBlock:
        spawnSBlock()
        break
      case tBlock:
        spawnTBlock()
        break
      case zBlock:
        spawnZBlock()
        break
    }
  
    updateHeldPieceGraphic()
  }
})

let paused = false
const pauseBufferTime = 1
let pauseTimer = pauseBufferTime
onInput("i", () =>
{
  if (hasLost)
  {
    paused = false
    return
  }

  // Stop pause spamming for cheating
  if (pauseTimer >= pauseBufferTime)
  {
    pauseTimer = 0
  }
  else
  {
    return
  }
  
  // Pause or unpause
  paused = !paused

  if (paused)
  {
    // Stop music
    songPlayback.end()

    // Show pause text
    addText("Paused",
    {
      x: 7,
      y: 7,
      color: color`2`
    })
    
    // Hide the board for anticheat
    for (let i = 0; i < height(); i++)
    {
      for (let j = leftBound; j < rightBound; j++)
      {
        addSprite(j, i, blackTile)
      }
    }
  }
  else
  {
    // Restart music
    songPlayback = playTune(song, Infinity);

    // Remove paused text
    resetText()
    updateText()
    
    // Unhide the board
    let sprites = getAll(blackTile)
    for (let i = 0; i < sprites.length; i++) 
    {
      sprites[i].remove()
    }
  }

  playTune(pauseSound);
})

let score = 0
const oneLineClearPoints = 40
const twoLineClearPoints = 100
const threeLineClearPoints = 300
const fourLineClearPoints = 1200

// me when completely unrelated variables with similar names
let startLevel = 0
let currentLevel = startLevel
let hasLost = false
// Infinite loop required to move tetrominoes
async function update() 
{
  if (level !== 3)
  {
    return
  }
  else if (hasLost)
  {
    lose()
    return
  }

  // Update based on the current level (numbers from NES tetris)
  let updateTime = 800
  switch (currentLevel)
  {
    case 0:
      updateTime = 800
      break
    case 1:
      updateTime = 717
      break
    case 2:
      updateTime = 633
      break
    case 3:
      updateTime = 550
      break
    case 4:
      updateTime = 467
      break
    case 5:
      updateTime = 383
      break
    case 6:
      updateTime = 300
      break
    case 7:
      updateTime = 217
      break
    case 8:
      updateTime = 133
      break
    case 9:
      updateTime = 100
      break
    case 10:
    case 11:
    case 12:
      updateTime = 83
      break
    case 13:
    case 14:
    case 15:
      updateTime = 67
      break
    case 16:
    case 17:
    case 18:
      updateTime = 50
      break
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
      updateTime = 33
      break
    default:
      updateTime = 17
      break
  }

  // Stop update from running while paused
  while (paused)
  {
    pauseTimer += updateTime
    await setTimeout(() => { update() }, updateTime)
    return
  }

  pauseTimer += updateTime
  
  let canMoveDown = true
  for (let i = 0; i < activeBlocks.length; i++) 
  {
    if (checkForTile(activeBlocks[i], 0, 1))
    {
      canMoveDown = false
    }
  }

  if (canMoveDown)
  {
    // Move all tiles down by 1
    for (let i = 0; i < activeBlocks.length; i++) 
    {
      moveBlockSprite(activeBlocks[i], 0, 1)
    }
  }
  else
  {
    activeBlocks = []
    hasSwappedPiece = false
    checkForClearedLines()
    spawnRandomBlock()
  }

  await setTimeout(() => { update(); }, updateTime);
}

function moveBlockSprite(blockSprite, xMove, yMove) 
{
  blockSprite.x += xMove
  blockSprite.y += yMove
}

function checkForTile(blockSprite, relativeXPos, relativeYPos) 
{
  if (blockSprite.y + relativeYPos < 0 || blockSprite.y + relativeYPos >= height())
  {
    return true
  }
  
  let tile = getTile(blockSprite.x + relativeXPos, blockSprite.y + relativeYPos)
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < 4; j++)
    {
      if (activeBlocks.length > 0 && tile[i] === activeBlocks[j])
      {
        return false
      }
    }
    return true
  }
  return false
}

function checkForTileAbs(xPos, yPos)
{
  if (yPos < 0 || yPos >= height())
  {
    return true
  }
  
  let tile = getTile(xPos, yPos)
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < 4; j++)
    {
      if (activeBlocks.length > 0 && tile[i] === activeBlocks[j])
      {
        return false
      }
    }
    return true
  }
  return false
}

let blocksPlayed = []
let nextPieceNum = null
function spawnRandomBlock()
{
  // make sure there is a block defined at the start of the game
  if (nextPieceNum === null)
  {
    nextPieceNum = Math.floor(Math.random() * 7)
    blocksPlayed.push(nextPieceNum)
  }

  currentRotation = 0

  switch (nextPieceNum)
  {
    case 0:
      spawnIBlock()
      break
    case 1:
      spawnJBlock()
      break
    case 2:
      spawnLBlock()
      break
    case 3:
      spawnOBlock()
      break
    case 4:
      spawnSBlock()
      break
    case 5:
      spawnTBlock()
      break
    case 6:
      spawnZBlock()
      break
  }

  // make sure each block is played only once until they all have been played
  nextPieceNum = Math.floor(Math.random() * 7);
  while (blocksPlayed.includes(nextPieceNum))
  {
    nextPieceNum = Math.floor(Math.random() * 7);
  }
  blocksPlayed.push(nextPieceNum)

  // if all blocks have been played, reset the array
  if (blocksPlayed.length >= 7)
  {
    blocksPlayed = []
  }

  updateNextPieceGraphic(nextPieceNum)
}

function spawnIBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(10, 0) || checkForTileAbs(11, 0) || checkForTileAbs(12, 0) || checkForTileAbs(13, 0))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(10, 0, iBlock)
  addSprite(11, 0, iBlock)
  addSprite(12, 0, iBlock)
  addSprite(13, 0, iBlock)

  currentBlockType = iBlock
  
  activeBlocks = [
      getTile(10, 0)[0],
      getTile(11, 0)[0],
      getTile(12, 0)[0],
      getTile(13, 0)[0]
  ]
}

function spawnJBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(10, 0) || checkForTileAbs(11, 0) || checkForTileAbs(12, 0) || checkForTileAbs(12, 1))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(11, 0, jBlock)
  addSprite(12, 0, jBlock)
  addSprite(13, 0, jBlock)
  addSprite(13, 1, jBlock)

  currentBlockType = jBlock
  
  activeBlocks = [
      getTile(11, 0)[0],
      getTile(12, 0)[0],
      getTile(13, 0)[0],
      getTile(13, 1)[0]
  ]
}

function spawnLBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(10, 0) || checkForTileAbs(11, 0) || checkForTileAbs(12, 0) || checkForTileAbs(10, 1))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(11, 0, lBlock)
  addSprite(12, 0, lBlock)
  addSprite(13, 0, lBlock)
  addSprite(11, 1, lBlock)

  currentBlockType = lBlock
  
  activeBlocks = [
      getTile(11, 0)[0],
      getTile(12, 0)[0],
      getTile(13, 0)[0],
      getTile(11, 1)[0]
  ]
}

function spawnOBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(11, 0) || checkForTileAbs(12, 0) || checkForTileAbs(11, 1) || checkForTileAbs(12, 1))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(11, 0, oBlock)
  addSprite(12, 0, oBlock)
  addSprite(11, 1, oBlock)
  addSprite(12, 1, oBlock)

  currentBlockType = oBlock
  
  activeBlocks = [
      getTile(11, 0)[0],
      getTile(12, 0)[0],
      getTile(11, 1)[0],
      getTile(12, 1)[0]
  ]
}

function spawnSBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(12, 0) || checkForTileAbs(13, 0) || checkForTileAbs(11, 1) || checkForTileAbs(12, 1))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(12, 0, sBlock)
  addSprite(13, 0, sBlock)
  addSprite(11, 1, sBlock)
  addSprite(12, 1, sBlock)

  currentBlockType = sBlock
  
  activeBlocks = [
      getTile(12, 0)[0],
      getTile(13, 0)[0],
      getTile(11, 1)[0],
      getTile(12, 1)[0]
  ]
}

function spawnTBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(11, 0) || checkForTileAbs(12, 0) || checkForTileAbs(13, 0) || checkForTileAbs(12, 1))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(11, 0, tBlock)
  addSprite(12, 0, tBlock)
  addSprite(13, 0, tBlock)
  addSprite(12, 1, tBlock)

  currentBlockType = tBlock
  
  activeBlocks = [
      getTile(11, 0)[0],
      getTile(12, 0)[0],
      getTile(13, 0)[0],
      getTile(12, 1)[0]
  ]
}

function spawnZBlock()
{
  // Check if blocks are already present here
  // If so, you lose
  if (checkForTileAbs(11, 0) || checkForTileAbs(12, 0) || checkForTileAbs(12, 1) || checkForTileAbs(13, 1))
  {
    hasLost = true
    canInteract = false
  }
  
  addSprite(11, 0, zBlock)
  addSprite(12, 0, zBlock)
  addSprite(12, 1, zBlock)
  addSprite(13, 1, zBlock)

  currentBlockType = zBlock
  
  activeBlocks = [
      getTile(11, 0)[0],
      getTile(12, 0)[0],
      getTile(12, 1)[0],
      getTile(13, 1)[0]
  ]
}

// The way I'm implementing rotation is so awful please forgive me
// Actually the way this whole game is implemented is awful I don't think I'm coming back from this
function rotate(dir)
{
  currentRotation += dir
  if (currentRotation < 0)
  {
    currentRotation = 3
  }
  else if (currentRotation > 3)
  {
    currentRotation = 0
  }
}

function rotateIBlockRight()
{
  switch (currentRotation)
  {
    case 1:
    case 3:
      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], 2, -2) || checkForTile(activeBlocks[1], 1, -1) || checkForTile(activeBlocks[3], -1, 1)))
      {
        moveBlockSprite(activeBlocks[0], 2, -2)
        moveBlockSprite(activeBlocks[1], 1, -1)
        moveBlockSprite(activeBlocks[3], -1, 1)
      }
      else
      {
        rotate(-1)
      }
      break
    case 0:
    case 2:
      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], -2, 2) || checkForTile(activeBlocks[1], -1, 1) || checkForTile(activeBlocks[2], 1, -1)))
      {
        moveBlockSprite(activeBlocks[0], -2, 2)
        moveBlockSprite(activeBlocks[1], -1, 1)
        moveBlockSprite(activeBlocks[3], 1, -1)
      }
      else
      {
        rotate(-1)
      }
      break
  }
}

function rotateIBlockLeft()
{
  switch (currentRotation)
  {
    case 1:
    case 3:
      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], 2, -2) || checkForTile(activeBlocks[1], 1, -1) || checkForTile(activeBlocks[3], -1, 1)))
      {
        moveBlockSprite(activeBlocks[0], 2, -2)
        moveBlockSprite(activeBlocks[1], 1, -1)
        moveBlockSprite(activeBlocks[3], -1, 1)
      }
      else
      {
        rotate(1)
      }
      break
    case 0:
    case 2:
      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], -2, 2) || checkForTile(activeBlocks[1], -1, 1) || checkForTile(activeBlocks[2], 1, -1)))
      {
        moveBlockSprite(activeBlocks[0], -2, 2)
        moveBlockSprite(activeBlocks[1], -1, 1)
        moveBlockSprite(activeBlocks[3], 1, -1)
      }
      else
      {
        rotate(1)
      }
      break
  }
}

function rotateJBlockRight()
{
  switch (currentRotation)
  {
    case 1:
      // Go from side to upright J

      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], 1, -1) || checkForTile(activeBlocks[2], -1, 1) || checkForTile(activeBlocks[3], -2, 0)))
      {
        moveBlockSprite(activeBlocks[0], 1, -1)
        moveBlockSprite(activeBlocks[2], -1, 1)
        moveBlockSprite(activeBlocks[3], -2, 0)
      }
      else
      {
        rotate(-1)
      }
      break
    case 2:
      // Go from upright J to side
      
      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], 1, 1) || checkForTile(activeBlocks[2], -1, -1) || checkForTile(activeBlocks[3], 0, -2)))
      {
        moveBlockSprite(activeBlocks[0], 1, 1)
        moveBlockSprite(activeBlocks[2], -1, -1)
        moveBlockSprite(activeBlocks[3], 0, -2)
      }
      else
      {
        rotate(-1)
      }
      break
    case 3:
      // Go from side to upside-down J

      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], -1, 1) || checkForTile(activeBlocks[2], 1, -1) || checkForTile(activeBlocks[3], 2, 0)))
      {
        moveBlockSprite(activeBlocks[0], -1, 1)
        moveBlockSprite(activeBlocks[2], 1, -1)
        moveBlockSprite(activeBlocks[3], 2, 0)
      }
      else
      {
        rotate(-1)
      }
      break
    case 0:
      // Go from upside-down J to side

      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], -1, -1) || checkForTile(activeBlocks[2], 1, 1) || checkForTile(activeBlocks[3], 0, 2)))
      {
        moveBlockSprite(activeBlocks[0], -1, -1)
        moveBlockSprite(activeBlocks[2], 1, 1)
        moveBlockSprite(activeBlocks[3], 0, 2)
      }
      else
      {
        rotate(-1)
      }
      break
  }
}

function rotateJBlockLeft()
{
  switch (currentRotation)
  {
    case 1:
      // Go from side to upright J

      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], -1, -1) || checkForTile(activeBlocks[2], 1, 1) || checkForTile(activeBlocks[3], 0, 2)))
      {
        moveBlockSprite(activeBlocks[0], -1, -1)
        moveBlockSprite(activeBlocks[2], 1, 1)
        moveBlockSprite(activeBlocks[3], 0, 2)
      }
      else
      {
        rotate(1)
      }
      break
    case 2:
      // Go from upright J to side
      
      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], 1, -1) || checkForTile(activeBlocks[2], -1, 1) || checkForTile(activeBlocks[3], -2, 0)))
      {
        moveBlockSprite(activeBlocks[0], 1, -1)
        moveBlockSprite(activeBlocks[2], -1, 1)
        moveBlockSprite(activeBlocks[3], -2, 0)
      }
      else
      {
        rotate(1)
      }
      break
    case 3:
      // Go from side to upside-down J

      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], 1, 1) || checkForTile(activeBlocks[2], -1, -1) || checkForTile(activeBlocks[3], 0, -2)))
      {
        moveBlockSprite(activeBlocks[0], 1, 1)
        moveBlockSprite(activeBlocks[2], -1, -1)
        moveBlockSprite(activeBlocks[3], 0, -2)
      }
      else
      {
        rotate(1)
      }
      break
    case 0:
      // Go from upside-down J to side

      // Check if the piece can rotate
      if (!(checkForTile(activeBlocks[0], -1, 1) || checkForTile(activeBlocks[2], 1, -1) || checkForTile(activeBlocks[3], 2, 0)))
      {
        moveBlockSprite(activeBlocks[0], -1, 1)
        moveBlockSprite(activeBlocks[2], 1, -1)
        moveBlockSprite(activeBlocks[3], 2, 0)
      }
      else
      {
        rotate(1)
      }
      break
  }
}

function rotateLBlockRight()
{
  switch (currentRotation)
  {
    case 1:
      if (!(checkForTile(activeBlocks[0], 1, -1) || checkForTile(activeBlocks[2], -1, 1) || checkForTile(activeBlocks[3], 0, -2)))
      {
        moveBlockSprite(activeBlocks[0], 1, -1)
        moveBlockSprite(activeBlocks[2], -1, 1)
        moveBlockSprite(activeBlocks[3], 0, -2)
      }
      else
      {
        rotate(-1)
      }
      break
    case 2:
      if (!(checkForTile(activeBlocks[0], 1, 1) || checkForTile(activeBlocks[2], -1, -1) || checkForTile(activeBlocks[3], 2, 0)))
      {
        moveBlockSprite(activeBlocks[0], 1, 1)
        moveBlockSprite(activeBlocks[2], -1, -1)
        moveBlockSprite(activeBlocks[3], 2, 0)
      }
      else
      {
        rotate(-1)
      }
      break
    case 3:
      if (!(checkForTile(activeBlocks[0], -1, 1) || checkForTile(activeBlocks[2], 1, -1) || checkForTile(activeBlocks[3], 0, 2)))
      {
        moveBlockSprite(activeBlocks[0], -1, 1)
        moveBlockSprite(activeBlocks[2], 1, -1)
        moveBlockSprite(activeBlocks[3], 0, 2)
      }
      else
      {
        rotate(-1)
      }
      break
    case 0:
      if (!(checkForTile(activeBlocks[0], -1, -1) || checkForTile(activeBlocks[2], 1, 1) || checkForTile(activeBlocks[3], -2, 0)))
      {
        moveBlockSprite(activeBlocks[0], -1, -1)
        moveBlockSprite(activeBlocks[2], 1, 1)
        moveBlockSprite(activeBlocks[3], -2, 0)
      }
      else
      {
        rotate(-1)
      }
      break
  }
}

function rotateLBlockLeft()
{
  switch (currentRotation)
  {
    case 1:
      if (!(checkForTile(activeBlocks[0], -1, -1) || checkForTile(activeBlocks[2], 1, 1) || checkForTile(activeBlocks[3], -2, 0)))
      {
        moveBlockSprite(activeBlocks[0], -1, -1)
        moveBlockSprite(activeBlocks[2], 1, 1)
        moveBlockSprite(activeBlocks[3], -2, 0)
      }
      else
      {
        rotate(1)
      }
      break
    case 2:
      if (!(checkForTile(activeBlocks[0], 1, -1) || checkForTile(activeBlocks[2], -1, 1) || checkForTile(activeBlocks[3], 0, -2)))
      {
        moveBlockSprite(activeBlocks[0], 1, -1)
        moveBlockSprite(activeBlocks[2], -1, 1)
        moveBlockSprite(activeBlocks[3], 0, -2)
      }
      else
      {
        rotate(1)
      }
      break
    case 3:
      if (!(checkForTile(activeBlocks[0], 1, 1) || checkForTile(activeBlocks[2], -1, -1) || checkForTile(activeBlocks[3], 2, 0)))
      {
        moveBlockSprite(activeBlocks[0], 1, 1)
        moveBlockSprite(activeBlocks[2], -1, -1)
        moveBlockSprite(activeBlocks[3], 2, 0)
      }
      else
      {
        rotate(1)
      }
      break
    case 0:
      if (!(checkForTile(activeBlocks[0], -1, 1) || checkForTile(activeBlocks[2], 1, -1) || checkForTile(activeBlocks[3], 0, 2)))
      {
        moveBlockSprite(activeBlocks[0], -1, 1)
        moveBlockSprite(activeBlocks[2], 1, -1)
        moveBlockSprite(activeBlocks[3], 0, 2)
      }
      else
      {
        rotate(1)
      }
      break
  }
}

function rotateSBlockRight()
{
  switch (currentRotation)
  {
    case 1:
    case 3:
      if (!(checkForTile(activeBlocks[1], -1, -1) || checkForTile(activeBlocks[2], 2, 0) || checkForTile(activeBlocks[3], 1, -1)))
      {
        moveBlockSprite(activeBlocks[1], -1, -1)
        moveBlockSprite(activeBlocks[2], 2, 0)
        moveBlockSprite(activeBlocks[3], 1, -1)
      }
      else
      {
        rotate(-1)
      }
      break
    case 0:
    case 2:
      if (!(checkForTile(activeBlocks[1], 1, 1) || checkForTile(activeBlocks[2], -2, 0) || checkForTile(activeBlocks[3], -1, 1)))
      {
        moveBlockSprite(activeBlocks[1], 1, 1)
        moveBlockSprite(activeBlocks[2], -2, 0)
        moveBlockSprite(activeBlocks[3], -1, 1)
      }
      else
      {
        rotate(-1)
      }
      break
  }
}

function rotateSBlockLeft()
{
  switch (currentRotation)
  {
    case 1:
    case 3:
      if (!(checkForTile(activeBlocks[1], -1, -1) || checkForTile(activeBlocks[2], 2, 0) || checkForTile(activeBlocks[3], 1, -1)))
      {
        moveBlockSprite(activeBlocks[1], -1, -1)
        moveBlockSprite(activeBlocks[2], 2, 0)
        moveBlockSprite(activeBlocks[3], 1, -1)
      }
      else
      {
        rotate(1)
      }
      break
    case 0:
    case 2:
      if (!(checkForTile(activeBlocks[1], 1, 1) || checkForTile(activeBlocks[2], -2, 0) || checkForTile(activeBlocks[3], -1, 1)))
      {
        moveBlockSprite(activeBlocks[1], 1, 1)
        moveBlockSprite(activeBlocks[2], -2, 0)
        moveBlockSprite(activeBlocks[3], -1, 1)
      }
      else
      {
        rotate(1)
      }
      break
  }
}

function rotateTBlockRight()
{
  switch (currentRotation)
  {
    case 1:
      if (!(checkForTile(activeBlocks[0], 1, -1) || checkForTile(activeBlocks[2], -1, 1) || checkForTile(activeBlocks[3], -1, -1)))
      {
        moveBlockSprite(activeBlocks[0], 1, -1)
        moveBlockSprite(activeBlocks[2], -1, 1)
        moveBlockSprite(activeBlocks[3], -1, -1)
      }
      else
      {
        rotate(-1)
      }
      break
    case 2:
      if (!(checkForTile(activeBlocks[0], 1, 1) || checkForTile(activeBlocks[2], -1, -1) || checkForTile(activeBlocks[3], 1, -1)))
      {
        moveBlockSprite(activeBlocks[0], 1, 1)
        moveBlockSprite(activeBlocks[2], -1, -1)
        moveBlockSprite(activeBlocks[3], 1, -1)
      }
      else
      {
        rotate(-1)
      }
      break
    case 3:
      if (!(checkForTile(activeBlocks[0], -1, 1) || checkForTile(activeBlocks[2], 1, -1) || checkForTile(activeBlocks[3], 1, 1)))
      {
        moveBlockSprite(activeBlocks[0], -1, 1)
        moveBlockSprite(activeBlocks[2], 1, -1)
        moveBlockSprite(activeBlocks[3], 1, 1)
      }
      else
      {
        rotate(-1)
      }
      break
    case 0:
      if (!(checkForTile(activeBlocks[0], -1, -1) || checkForTile(activeBlocks[2], 1, 1) || checkForTile(activeBlocks[3], -1, 1)))
      {
        moveBlockSprite(activeBlocks[0], -1, -1)
        moveBlockSprite(activeBlocks[2], 1, 1)
        moveBlockSprite(activeBlocks[3], -1, 1)
      }
      else
      {
        rotate(-1)
      }
      break
  }
}

function rotateTBlockLeft()
{
  switch (currentRotation)
  {
    case 1:
      if (!(checkForTile(activeBlocks[0], -1, -1) || checkForTile(activeBlocks[2], 1, 1) || checkForTile(activeBlocks[3], -1, 1)))
      {
        moveBlockSprite(activeBlocks[0], -1, -1)
        moveBlockSprite(activeBlocks[2], 1, 1)
        moveBlockSprite(activeBlocks[3], -1, 1)
      }
      else
      {
        rotate(1)
      }
      break
    case 2:
      if (!(checkForTile(activeBlocks[0], 1, -1) || checkForTile(activeBlocks[2], -1, 1) || checkForTile(activeBlocks[3], -1, -1)))
      {
        moveBlockSprite(activeBlocks[0], 1, -1)
        moveBlockSprite(activeBlocks[2], -1, 1)
        moveBlockSprite(activeBlocks[3], -1, -1)
      }
      else
      {
        rotate(1)
      }
      break
    case 3:
      if (!(checkForTile(activeBlocks[0], 1, 1) || checkForTile(activeBlocks[2], -1, -1) || checkForTile(activeBlocks[3], 1, -1)))
      {
        moveBlockSprite(activeBlocks[0], 1, 1)
        moveBlockSprite(activeBlocks[2], -1, -1)
        moveBlockSprite(activeBlocks[3], 1, -1)
      }
      else
      {
        rotate(1)
      }
      break
    case 0:
      if (!(checkForTile(activeBlocks[0], -1, 1) || checkForTile(activeBlocks[2], 1, -1) || checkForTile(activeBlocks[3], 1, 1)))
      {
        moveBlockSprite(activeBlocks[0], -1, 1)
        moveBlockSprite(activeBlocks[2], 1, -1)
        moveBlockSprite(activeBlocks[3], 1, 1)
      }
      else
      {
        rotate(1)
      }
      break
  }
}

function rotateZBlockRight()
{
  switch (currentRotation)
  {
    case 1:
    case 3:
      if (!(checkForTile(activeBlocks[0], 2, -1) || checkForTile(activeBlocks[1], 1, 0) || checkForTile(activeBlocks[2], 0, -1) || checkForTile(activeBlocks[2], -1, 0)))
      {
        moveBlockSprite(activeBlocks[0], 2, -1)
        moveBlockSprite(activeBlocks[1], 1, 0)
        moveBlockSprite(activeBlocks[2], 0, -1)
        moveBlockSprite(activeBlocks[3], -1, 0)
      }
      else
      {
        rotate(-1)
      }
      break
    case 0:
    case 2:
      if (!(checkForTile(activeBlocks[0], -2, 1) || checkForTile(activeBlocks[1], -1, 0) || checkForTile(activeBlocks[2], 0, 1) || checkForTile(activeBlocks[2], 1, 0)))
      {
        moveBlockSprite(activeBlocks[0], -2, 1)
        moveBlockSprite(activeBlocks[1], -1, 0)
        moveBlockSprite(activeBlocks[2], 0, 1)
        moveBlockSprite(activeBlocks[3], 1, 0)
      }
      else
      {
        rotate(-1)
      }
      break
  }
}

function rotateZBlockLeft()
{
  switch (currentRotation)
  {
    case 1:
    case 3:
      if (!(checkForTile(activeBlocks[0], 2, -1) || checkForTile(activeBlocks[1], 1, 0) || checkForTile(activeBlocks[2], 0, -1) || checkForTile(activeBlocks[2], -1, 0)))
      {
        moveBlockSprite(activeBlocks[0], 2, -1)
        moveBlockSprite(activeBlocks[1], 1, 0)
        moveBlockSprite(activeBlocks[2], 0, -1)
        moveBlockSprite(activeBlocks[3], -1, 0)
      }
      else
      {
        rotate(1)
      }
      break
    case 0:
    case 2:
      if (!(checkForTile(activeBlocks[0], -2, 1) || checkForTile(activeBlocks[1], -1, 0) || checkForTile(activeBlocks[2], 0, 1) || checkForTile(activeBlocks[2], 1, 0)))
      {
        moveBlockSprite(activeBlocks[0], -2, 1)
        moveBlockSprite(activeBlocks[1], -1, 0)
        moveBlockSprite(activeBlocks[2], 0, 1)
        moveBlockSprite(activeBlocks[3], 1, 0)
      }
      else
      {
        rotate(1)
      }
      break
  }
}

let totalLinesCleared = 0
function checkForClearedLines() 
{
  let numLinesCleared = 0
  let linesCleared = []
  for (let i = 0; i < height(); i++) 
  {
    let fullLine = true
    for (let j = leftBound; j < rightBound; j++)
    {
      if (!checkForTileAbs(j, i))
      {
        fullLine = false
      }
    }

    if (fullLine)
    {
      linesCleared.push(i)
    }
  }

  // For every line cleared, remove that line and move all lines above it down
  for (let i = 0; i < linesCleared.length; i++)
  {
    // Clear the line
    for (let j = leftBound; j < rightBound; j++)
    {
      clearTile(j, linesCleared[i])
    }

    // Go through every line above this one and move it down
    for (let j = linesCleared[i] - 1; j >= 0; j--)
    {
      for (let k = leftBound; k < rightBound; k++)
      {
        let tile = getTile(k, j)
        for (let l = 0; l < tile.length; l++)
        {
          tile[l].y++
        }
      }
    }

    // Add points and play sounds based on lines cleared
    switch (linesCleared.length)
    {
      case 1:
        score += oneLineClearPoints
        playTune(oneLineClearSound)
        break
      case 2:
        score += twoLineClearPoints
        playTune(twoLineClearSound)
        break
      case 3:
        score += threeLineClearPoints
        playTune(threeLineClearSound)
        break
      case 4:
        score += fourLineClearPoints
        playTune(tretrisSound)
        break
    }
  }

  totalLinesCleared += linesCleared.length
  checkForLevelUp()
  
  resetText()
  updateText()
}

function resetText()
{
  clearText()
  addText("Score",
  {
    x: 14,
    y: 0,
    color: color`2`
  })
  addText("Next",
  {
    x: 14,
    y: 5,
    color: color`2`
  })
  addText("Held",
  {
    x: 2,
    y: 0,
    color: color`2`
  })
  addText("Level",
  {
    x: 1,
    y: 5,
    color: color`2`
  })
}

function updateText()
{
  addText(score.toString(), 
  {
    x: 14,
    y: 1,
    color: color`2`
  })
  addText(currentLevel.toString(),
  {
    x: 4,
    y: 6,
    color: color`2`
  })
}

function updateNextPieceGraphic(pieceNum)
{
  // Clear out all possible pieces in the next slot
  clearTile(18, 8)
  clearTile(19, 8)
  clearTile(20, 8)
  clearTile(18, 9)
  clearTile(19, 9)
  clearTile(20, 9)
  clearTile(21, 9)

  switch (pieceNum)
  {
    case 0: // I block
      addSprite(18, 9, iBlock)
      addSprite(19, 9, iBlock)
      addSprite(20, 9, iBlock)
      addSprite(21, 9, iBlock)
      break
    case 1: // J block
      addSprite(18, 8, jBlock)
      addSprite(19, 8, jBlock)
      addSprite(20, 8, jBlock)
      addSprite(20, 9, jBlock)
      break
    case 2: // L block
      addSprite(18, 8, lBlock)
      addSprite(19, 8, lBlock)
      addSprite(20, 8, lBlock)
      addSprite(18, 9, lBlock)
      break
    case 3: // O block
      addSprite(18, 8, oBlock)
      addSprite(19, 8, oBlock)
      addSprite(18, 9, oBlock)
      addSprite(19, 9, oBlock)
      break
    case 4: // S block
      addSprite(19, 8, sBlock)
      addSprite(20, 8, sBlock)
      addSprite(18, 9, sBlock)
      addSprite(19, 9, sBlock)
      break
    case 5: // T block
      addSprite(18, 8, tBlock)
      addSprite(19, 8, tBlock)
      addSprite(20, 8, tBlock)
      addSprite(19, 9, tBlock)
      break
    case 6: // Z block
      addSprite(18, 8, zBlock)
      addSprite(19, 8, zBlock)
      addSprite(19, 9, zBlock)
      addSprite(20, 9, zBlock)
      break
  }
}

function updateHeldPieceGraphic()
{
  // Reset all possible block positions
  clearTile(3, 2)
  clearTile(4, 2)
  clearTile(5, 2)
  clearTile(2, 3)
  clearTile(3, 3)
  clearTile(4, 3)
  clearTile(5, 3)

  switch (heldPiece)
  {
    case iBlock:
      addSprite(2, 3, iBlock)
      addSprite(3, 3, iBlock)
      addSprite(4, 3, iBlock)
      addSprite(5, 3, iBlock)
      break
    case jBlock: // J block
      addSprite(3, 2, jBlock)
      addSprite(4, 2, jBlock)
      addSprite(5, 2, jBlock)
      addSprite(5, 3, jBlock)
      break
    case lBlock: // L block
      addSprite(3, 2, lBlock)
      addSprite(4, 2, lBlock)
      addSprite(5, 2, lBlock)
      addSprite(3, 3, lBlock)
      break
    case oBlock: // O block
      addSprite(4, 2, oBlock)
      addSprite(5, 2, oBlock)
      addSprite(4, 3, oBlock)
      addSprite(5, 3, oBlock)
      break
    case sBlock: // S block
      addSprite(4, 2, sBlock)
      addSprite(5, 2, sBlock)
      addSprite(3, 3, sBlock)
      addSprite(4, 3, sBlock)
      break
    case tBlock: // T block
      addSprite(3, 2, tBlock)
      addSprite(4, 2, tBlock)
      addSprite(5, 2, tBlock)
      addSprite(4, 3, tBlock)
      break
    case zBlock: // Z block
      addSprite(3, 2, zBlock)
      addSprite(4, 2, zBlock)
      addSprite(4, 3, zBlock)
      addSprite(5, 3, zBlock)
      break
  }
}

let lastTotalNumLinesCleared = 0
function checkForLevelUp()
{
  
  // Level function from NES tetris
  if (currentLevel === startLevel && (totalLinesCleared >= (startLevel * 10 + 10) || totalLinesCleared >= Math.max(100, startLevel * 10 - 50)))
  {
    currentLevel++
    resetText()
    updateText()

    playTune(levelUpSound)
    
    return
  }

  // Every 10 lines cleared, increase level
  // If the last lines cleared modulo 10 is more than current, then it cycled
  if (lastTotalNumLinesCleared % 10 > totalLinesCleared % 10)
  {
    currentLevel++
    resetText()
    updateText()

    playTune(levelUpSound)
  }
  lastTotalNumLinesCleared = totalLinesCleared
}

let canInteract = true
async function lose()
{
  canInteract = false

  songPlayback.end()
  songPlayback = null
  playTune(loseSound, 1)
  
  // Fill the whole board with blocks
  let currentBlock = 0
  
  for (let i = height() - 1; i >= 0; i--)
  {
    for (let j = leftBound; j < rightBound; j++)
    {
      clearTile(j, i)
      let blockSprite = "."
      switch (currentBlock)
      {
        case 0: // I block
          blockSprite = iBlock
          break
        case 1: // J block
          blockSprite = jBlock
          break
        case 2: // L block
          blockSprite = lBlock
          break
        case 3: // O block
          blockSprite = oBlock
          break
        case 4: // S block
          blockSprite = sBlock
          break
        case 5: // T block
          blockSprite = tBlock
          break
        case 6: // Z block
          blockSprite = zBlock
          break
      }
      addSprite(j, i, blockSprite)
      await new Promise(resolve => setTimeout(resolve, 12))

      currentBlock++
      currentBlock %= 7
    }
  }

  await new Promise(resolve => setTimeout(resolve, 250))

  // Empty the board
  for (let i = height() - 1; i >= 0; i--)
  {
    for (let j = leftBound; j < rightBound; j++)
    {
      clearTile(j, i)
    }
    await new Promise(resolve => setTimeout(resolve, 20))
  }

  // Write lose text
  addText("You",
  {
    x: 7,
    y: 1,
    color: color`2`
  })
  addText("lost!",
  {
    x: 8,
    y: 2,
    color: color`2`
  })
  addText("Press",
  {
    x: 7,
    y: 4,
    color: color`2`
  })
  addText("\"L\" to",
  {
    x: 7,
    y: 5,
    color: color`2`
  })
  addText("retry",
  {
    x: 7,
    y: 6,
    color: color`2`
  })
  addText("Press",
  {
    x: 7,
    y: 8,
    color: color`2`
  })
  addText("\"K\" to",
  {
    x: 7,
    y: 9,
    color: color`2`
  })
  addText("go back",
  {
    x: 7,
    y: 10,
    color: color`2`
  })
  addText("to menu",
  {
    x: 7,
    y: 11,
    color: color`2`
  })

  canInteract = true
}

let currentSong = songA
function switchMusic(tune)
{
  if (songPlayback !== null)
  {
    songPlayback.end()
  }
  currentSong = tune
  songPlayback = playTune(currentSong, Infinity);
}

function restartMusic()
{
  if (songPlayback !== null)
  {
    songPlayback.end()
  }
  songPlayback = playTune(currentSong, Infinity);
}

function openBaseMenu()
{
  clearText()

  addText("Press \"L\"", 
  {
    x: 6,
    y: 10,
    color: color`2`
  })
  
  level = 0
  setMap(levels[level])
}

function openLevelMenu()
{
  updateLevelMenu()

  if (songPlayback !== null)
  {
    songPlayback.end()
  }
  
  level = 1
  setMap(levels[level])
}

function updateLevelMenu()
{
  clearText()

  addText("Level Select", 
  {
    x: 4,
    y: 5,
    color: color`2`
  })

  addText(startLevel.toString().padStart(2, '0'), 
  {
    x: 9,
    y: 10,
    color: color`2`
  })
}

function openMusicMenu()
{
  clearText()

  addText("Select Song", 
  {
    x: 5,
    y: 5,
    color: color`2`
  })
  addText("Song A", 
  {
    x: 4,
    y: 11,
    color: color`2`
  })
  addText("Song B",
  {
    x: 12,
    y: 11,
    color: color`2`
  })
  
  level = 2
  setMap(levels[level])

  switchMusic(currentSong)
}

function startGame()
{
  level = 3
  setMap(levels[level])
  
  hasLost = false
  currentLevel = startLevel
  score = 0
  heldPiece = null

  if (songPlayback === null)
  {
    restartMusic()
  }
  
  resetText()
  updateText()
  spawnRandomBlock()
  update()
}

openBaseMenu()