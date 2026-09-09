//@Title: escape the arena
//@author: erik
//@description: escape the scary area 
//@tags: escape, run, arena
//addeon: 2026-09-09


const playerUp = "u"
const playerDown = "d"
const playerLeft = "l"
const playerRight = "r"
const star = "s"
const wall = "w"
const kill = "k"

let level = 0
let score = 0
let timeLeft = 20
let timer

const levels = [
map`
wwwwwwwwwwwwwwww
wu............sw
wwwwwwwwwwwww..w
ws.............w
w.wwwwwwwwwww..w
w..swsws.......w
w...w.w.......sw
w...w.w..wwwwwww
w......w.......w
w.......w......w
w.wwwww..w.....w
w....sw...w....w
w.....w....w...w
w.....w.....s..w
wwwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwwwwww
wkkkkkkkkkkkkkkkkkw
wkssssssssssssssskw
wkskkkkkkkkkkkkkskw
wusk...........kskw
wkkk...kkkkkkk.kskw
w......ksssssk.kskw
w.w....kskkkskkkskw
w.w....ksk.kssssskw
w.www..ksk.kkkkkkkw
w.w.w..ksk........w
w.www..kskkkkkkk..w
w......ksssssssk..w
w.www..kkkkkkksk..w
w...w........ksk..w
w...w........ksk..w
w...w........ksk..w
wwwwwwwwwwwwwwwwwww`,

map`
wwwwwwwwwwwwwwww
wu....w....s...w
w.kkkkkkkkkkk..w
w........w....sw
w..kkkkkkkkkk..w
w..s...........w
w......k.......w
w...k..k..s....w
w......k....k..w
w.......k......w
w.kkkkk..k.....w
w....s....k....w
w.....k....k...w
w..............w
wwwwwwwwwwwwwwww`,

map`
kkkkkkkkkkkkkkk......
ksssssssssssssk......
kskkkkkkkkkkksk......
ksk.........ksk......
ksk.........ksk......
kuk..kkkkk..kskkkkkkw
kkk..ksssk..ksssssskw
w....ksksk..kkkkkkskw
w....ksksk.......kskw
w..kkksksk.......kskw
w..ksssksk...kkkkkskw
w..kskkksk...kssssskw
wkwksksssk..kkskkkkkw
wkskskskkk..kksk....w
wksksksk....kksk....w
wksksksk.kkkkksk....w
wkskskskkksssssk....w
wkssskssssskkkkk....w
wkkkkkkkkkkk........w
wwwwwwwwwwwwwwwwwwwww`
]

setLegend(
[playerUp, bitmap`
.....00000000...
....003333330...
.000033333330...
.022033333000000
.023033333077770
.033033333072220
.033033333077220
.033033333077770
.033033333300000
.03303333330....
.03303333330....
.03303333330....
.00000300030....
.....0302030....
.....0302030....
.....0002000....`],

[playerDown, bitmap`
.....0002000....
.....0302030....
.....0302030....
.00000300030....
.03303333330....
.03303333330....
.03303333330....
.033033333300000
.033033333077770
.033033333077220
.033033333072220
.033033333077770
.023033333077770
.022033333000000
.000033333330...
....003333330...
.....00000000...`],

[playerLeft, bitmap`
................
.....00000000...
.....03333330...
0000003333330000
0227703333330220
0277703333330320
0777703333330330
0000003333330330
.....03333330330
.....03333330330
.....03333330330
.....03000330000
.....030.0330...
.....030.0330...
.....030.0330...
.....000.0000...`],

[playerRight, bitmap`
...00000000.....
...03333330.....
00003333330.....
0220333333000000
0230333333077220
0330333333077720
0330333333077770
0330333333000000
033033333330....
033033333330....
033033000330....
0000330.0330....
...0330.0330....
...0330.0330....
...0330.0330....
...0000.0000....`],

[star, bitmap`
00.00.....00.00.
02520.....02520.
.577......77775.
.57..........75.
557..........75.
577.........755.
57.777777...75..
577555557...75..
5575...55...75..
.57...775..755..
.577..775..75...
.5577.775..75...
..5577755.755...
...55555..75....
................
................`],

[kill, bitmap`
6663666933333336
6333633999999936
3666396999999636
6666396999666663
6663366999666633
3663666333333363
6333333336333333
6639966333336666
6633333633669999
9636666333333339
6933369999963339
6636669999396663
6339369999369339
6399339333333999
6933339663993339
9933666963999939`],

[wall, bitmap`
000111110000LLLL
LLLLLL1111LL1111
11111000LL110011
LLLLLL1111LLLLLL
1000110000010001
LLLLL11LLL11LLLL
1111110LLL110L1L
100001L01L110L1L
LLLLL1L011000L1L
1111LLLL11111000
00000LLLLLLLL1LL
1111LL11111LL111
LLLLLL11000LL111
LL0111LLLL111000
11111100011LLLLL
L000LLLLLL10000L`]
)

setSolids([playerUp, playerDown, playerLeft, playerRight, wall])

function getPlayer(){
  return getFirst(playerUp) ||
         getFirst(playerDown) ||
         getFirst(playerLeft) ||
         getFirst(playerRight)
}

function loadLevel(){
  clearInterval(timer)
  setMap(levels[level])
  timeLeft = 15
  startTimer()
  updateHUD()
}

function startTimer(){
  timer = setInterval(()=>{
    timeLeft--
    updateHUD()

    if(timeLeft <= 0){
      failLevel()
    }

  },1000)
}

function failLevel(){
  clearInterval(timer)
  clearText()
  addText("YOU DIED!",{x:4,y:7})
  setTimeout(loadLevel,1000)
}

function updateHUD(){
  clearText()
  addText("Score:"+score,{x:0,y:0})
  addText("Time:"+timeLeft,{x:0,y:1})
}

onInput("w",()=>{
  const p = getPlayer()
  p.y -= 1
  p.type = playerUp
})

onInput("s",()=>{
  const p = getPlayer()
  p.y += 1
  p.type = playerDown
})

onInput("a",()=>{
  const p = getPlayer()
  p.x -= 1
  p.type = playerLeft
})

onInput("d",()=>{
  const p = getPlayer()
  p.x += 1
  p.type = playerRight
})

afterInput(()=>{

  // ⭐ collect stars
  const hits =
  tilesWith(playerUp,star)
  .concat(tilesWith(playerDown,star))
  .concat(tilesWith(playerLeft,star))
  .concat(tilesWith(playerRight,star))

  hits.forEach(tile=>{
    tile.forEach(sprite=>{
      if(sprite.type === star){
        sprite.remove()
        score++
      }
    })
  })

  // ☠️ check kill blocks
  const death =
  tilesWith(playerUp,kill)
  .concat(tilesWith(playerDown,kill))
  .concat(tilesWith(playerLeft,kill))
  .concat(tilesWith(playerRight,kill))

  if(death.length > 0){
    failLevel()
    return
  }

  updateHUD()

  // ➡️ next level
  if(getAll(star).length === 0){
    clearInterval(timer)
    level++

    if(level < levels.length){
      clearText()
      addText("NEXT LEVEL!",{x:4,y:7})
      setTimeout(loadLevel,1000)
    } else {
      clearText()
      addText("YOU WIN!",{x:5,y:7})
    }
  }

})

loadLevel()