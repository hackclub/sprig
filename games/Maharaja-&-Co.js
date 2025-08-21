/*

@title: Maharaja & Co
@author: Srihari Muralikrishnan

*/


const player = "m"
const wall = "w"
const treasure = "t"
const guard = "g"
const throne = "k"

// ---------- Sprites ----------
setLegend(
  [player, bitmap`
......9999......
...0000000000...
..902929929209..
..909290092909..
...0292992920...
....00000000....
....66066066....
..00.666666.00..
...0.600006.0...
...0200330020...
...0000660000...
..222226622222..
..333777777333..
.33333333333333.
.33333333333333.
................`],

  [treasure, bitmap`
................
................
.........333....
..........3.....
.......6..3.....
......666.......
....CC666CCC....
....C666666C....
...666666666....
...6C6CC6C6C....
....6CCC6C66....
....333333336...
....CCC33CCC.6..
....CCC33CCC....
................
................`],

  [throne, bitmap`
................
................
...HHHHHHHHHHH..
...H66H6H6H66H..
...H66H66HH66H..
...H66H66HH66H..
...H66H6H6H66H..
...HH6HHHHH6HH..
...HH6H6H6H6HH..
...HHHH666HHHH..
..CHHHHH6HHHHHC.
..CH555555555HC.
..C55555555555C.
..C55555555555C.
..C55555555555C.
..C55555555555C.`],

  [guard, bitmap`
.......66.......
....55555555....
...5555665555...
...5533553355...
...5555555555...
....55566555....
....00333300....
....00000000....
....00333300....
..333333333333..
333..3333333.333
...3333..3333.33
..3.33....3.3...
..3.3.....3.33..
333.3.....33.333
...33......33...`],

  [wall, bitmap`
C2C2C2C9C9C9C2C2
2C2C2C9C9C9C2C2C
C2C2C9C9C9C2C2C2
2C2C9C9C9C2C2C2C
C2C9C9C9C2C2C2C9
2C9C9C9C2C2C2C9C
C9C9C9C2C2C2C9C9
9C9C9C2C2C2C9C9C
C9C9C2C2C2C9C9C9
9C9C2C2C2C9C9C9C
C9C2C2C2C9C9C9C8
9C2C2C2C9C9C9C8C
C2C2C2C9C9C9C8C8
2C2C2C9C9C9C8C8C
C2C2C9C9C9C8C8C8
2C2C9C9C9C8C8C8C`],
)

// ---------- Solids ----------
setSolids([player, wall]) // guards non-solid

// ---------- Levels ----------
let levelIndex = 0
const levels = [
  map`
wwwwwwwwww
wm..t...kw
w..w.w..tw
w.t..g..gw
wwwwwwwwww
`,
  map`
wwwwwwwwwwww
w.m.t..w..kw
w.www.w.t..w
w..g..t..g.w
w.t.ww.ww..w
w...t...t..w
wwwwwwwwwwww
`
]

// ---------- State ----------
let treasuresLeft = 0
let gameOver = false
let patrolTimer = null

// ---------- Sounds ----------
const sCollect = tune`120: E5^120, 120: G5^120, 120: C6^120`
const sLose = tune`120: C4^120, 120: B3^120, 120: A3^120, 120: G3^240`
const sWin = tune`120: C5^120, 120: E5^120, 120: G5^120, 120: C6^240`

// ---------- Helpers ----------
function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < width() && y < height()
}
function tileHasWall(x, y) {
  if (!inBounds(x, y)) return true
  return getTile(x, y).some(s => s.type === wall)
}
function showHUD() {
  clearText()
  addText(`${treasuresLeft} left`, {x: 1, y: 0, color: color`3`})
  addText(`Lvl ${levelIndex+1}`, {x: width()-7, y: 0, color: color`6`})
}

function stopPatrol() {
  if (patrolTimer !== null) {
    clearInterval(patrolTimer)
    patrolTimer = null
  }
}

function startPatrol() {
  stopPatrol()
  patrolTimer = setInterval(() => {
    if (gameOver) return
    getAll(guard).forEach((g, idx) => {
      if (g._dir === undefined) g._dir = 1
      if (g._axis === undefined) g._axis = idx%2===0?"x":"y"

      let nx = g.x
      let ny = g.y
      if (g._axis==="x") nx += g._dir
      else ny += g._dir

      if (tileHasWall(nx, ny)) g._dir = -g._dir
      else { g.x = nx; g.y = ny }

      if (tilesWith(player, guard).length>0) handleLose()
    })
  }, 450)
}

function loadLevel(i) {
  levelIndex=i
  setMap(levels[levelIndex])
  treasuresLeft = tilesWith(treasure).length
  gameOver=false
  showHUD()
  startPatrol()
}

function handleLose() {
  if (gameOver) return
  gameOver=true
  stopPatrol()
  clearText()
  addText("Caught!", {x:3, y:1, color: color`2`})
  playTune(sLose)
  setTimeout(()=>loadLevel(levelIndex), 800)
}

function handleWinLevel() {
  if (gameOver) return
  gameOver=true
  stopPatrol()
  clearText()
  playTune(sWin)
  addText("Victory!", {x:2, y:1, color: color`4`})

  setTimeout(()=>{
    if(levelIndex+1<levels.length) loadLevel(levelIndex+1)
    else {
      clearText()
      addText("All Clear!", {x:1, y:1, color: color`2`})
      addText("Press K to replay", {x:1, y:3, color: color`0`})
    }
  }, 900)
}

// ---------- Controls ----------
onInput("w", ()=>{if(!gameOver && !tileHasWall(getFirst(player).x,getFirst(player).y-1)) getFirst(player).y--})
onInput("s", ()=>{if(!gameOver && !tileHasWall(getFirst(player).x,getFirst(player).y+1)) getFirst(player).y++})
onInput("a", ()=>{if(!gameOver && !tileHasWall(getFirst(player).x-1,getFirst(player).y)) getFirst(player).x--})
onInput("d", ()=>{if(!gameOver && !tileHasWall(getFirst(player).x+1,getFirst(player).y)) getFirst(player).x++})

// Quick restart
onInput("k", ()=>{ loadLevel(levelIndex) })

// ---------- Rules ----------
afterInput(()=>{
  if(gameOver) return
  const p = getFirst(player)

  // Collect treasure
  if(tilesWith(player, treasure).length>0){
    clearTile(p.x, p.y)
    addSprite(p.x, p.y, player)
    treasuresLeft--
    playTune(sCollect)
    showHUD()
  }

  // Guard collision
  if(tilesWith(player, guard).length>0) handleLose()

  // Win: all treasures + throne
  if(treasuresLeft===0 && tilesWith(player, throne).length>0) handleWinLevel()
})

// ---------- Boot ----------
// Call the intro function at the beginning



// Load the first level or initialize your game after displaying the intro
// ---------- Intro ----------
// ---------- Intro ----------
function showIntro(callback) {
  // Load a blank map for the text
  setMap(map`
................
................
................
................
................
................
................
................
................
................`)

  clearText()
 
  addText("Once upon a time", { x: 1, y: 2, color: color`5` })
  addText("in Ancient India!", { x: 1, y: 3, color: color`5` })
  addText("Be ready to", { x: 1, y: 4, color: color`7` })
  addText("collect treasures!", { x: 2, y: 5, color: color`3` })

  addText(" Maharaja & Co ", { x: 3, y: 7, color: color`0` })
  addText("Controls: W A S D", { x: 1, y: 11, color: color`3` })
  addText("Restart: K", { x: 1, y: 12, color: color`6` })


  // Wait 10 seconds, then start the game
  setTimeout(() => {
    clearText()
    callback()
  }, 3000)
}

// ---------- Boot ----------
showIntro(() => {
  loadLevel(0); // Start first level after intro
})


