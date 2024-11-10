/*
@title: Save the Seas
@author: RyanBran888
@tags: []
@addedOn: 2024-11-10
*/

const player = "p"
const bg = "b"
const Lone = "1"
const Ltwo = "2"
const Lthree = "3"
const buttonOne = "w"
const buttonTwo = "x"
var end = 3
var d = 0
var xt = 1
var raawwr = 0
var rawrPop = 0
var points = 0
var time = 2000
var run = 60
const buttonThree = "e"
setLegend(
  [ player, bitmap`
................
................
................
................
................
..00............
..090.00000.....
..0990999990....
..0999999090....
..0990999990....
..090.00000.....
..00............
................
................
................
................` ],
  [ bg, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5577775555577775
7775577555575577
5555555777775555
5555555555555555
5555555555555555
5555555555555555
7755555557775555
7777555577557777
7555777775555755
5555555555555555
5555555555555555
5555555555555555`],
  [ Lone, bitmap`
................
................
..00............
.0..0...........
.0..0...........
.0..0...........
..00............
..00............
..00............
.0..0...........
.0..0...........
.0..0...........
..00............
................
................
................`],
  [Ltwo, bitmap`
................
................
................
................
................
.....1111.......
.....1LL1.......
......LL........
.....LLLL.......
.....LLLL.......
.....LLLL.......
.....LLLL.......
.....LLLL.......
.....LLLL.......
................
................`],
  [buttonThree, bitmap`
3333333333333333
3303330003333033
3030303333330303
3000303000330003
3030303303330303
0333030003303330
3333333333333333
0003333333003333
3033033030330333
3033003033330333
3033030033303333
0003033033303333
3333333333333333
3333333333303333
3333333333333333
3333333333333333`],
  [buttonOne, bitmap`
5000505550500555
5055500550505055
5000505050505055
5055505500505055
5000505550500555
5555555555555555
5055500050005000
5055505550555055
5055500050005000
5055505555505550
5000500050005000
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [buttonTwo, bitmap`
7777777777777777
7000700077007007
7707770770770770
7707770770770770
7707700070770770
7777777777777777
7700070077777777
7707770707777777
7700070707777777
7707770707777777
7700070077777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [Lthree, bitmap`
................
................
................
................
................
....32323.......
....23232.......
....32..........
....23..........
....32..........
....23..........
....32..........
................
................
................
................`]
)

setSolids([])
setBackground(bg)
let level = 1
const levels = [
  map`
p.....
......
......
......
......
......`,
  map`
p....
.....
.w.x.
.....
.....`,
  map`
..p..
.....
..e..
.....
.....`
]
setMap(levels[level])

setPushables({
  [ player ]: []
})

addText
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
afterInput(() => {
  
})
function timer(){
  if(run != 0){
  run -= 1
    addText("time: " + run,{
  x: 0, y: 14, 
  color: color`3`
})
  setTimeout(timer, 1000)
  }
}
function createlitter(){
  if(run != 0){
    if (getFirst(player)) {
        if(d == 0){
          let yv = Math.floor(Math.random() * width())
          let xv = Math.floor(Math.random() * height())
          if(getFirst(Lone)){
            clearTile(getFirst(Lone).x,getFirst(Lone).y)
          }
          if(getTile(xv, yv).length === 0 && (xv !== getFirst(player).x || yv !== getFirst(player).y)){
             addSprite(xv, yv, Lone)
          }
        } else if(d == 1){
          let yvv = Math.floor(Math.random() * width())
          let xvv = Math.floor(Math.random() * height())
          if(getFirst(Ltwo)){
            clearTile(getFirst(Ltwo).x,getFirst(Ltwo).y)
          }
          if(getTile(xvv, yvv).length === 0 && (xvv !== getFirst(player).x || yvv !== getFirst(player).y)){
             addSprite(xvv, yvv, Ltwo)
          }
        } else {
          let yvvv = Math.floor(Math.random() * width())
          let xvvv = Math.floor(Math.random() * height())
          if(getFirst(Lthree)){
            clearTile(getFirst(Lthree).x,getFirst(Lthree).y)
          }
          if(getTile(xvvv, yvvv).length === 0 && (xvvv !== getFirst(player).x || yvvv !== getFirst(player).y)){
             addSprite(xvvv, yvvv, Lthree)
          }
        }
        d = (d + 1) % 3 // Update d value for next iteration
        rawrPop = d - 1
    }
//    disapear()
    if(time - points > 0){
    setTimeout(createlitter, (time - points))
    }else{
    setTimeout(createlitter, (time - 1999))
    }
  }else{
    gameOver()
  }
}
afterInput(() => {
  const playerSprite = getFirst(player)
  const litterOneSprite = getFirst(Lone)
  const litterTwoSprite = getFirst(Ltwo)
  const litterThreeSprite = getFirst(Lthree)
  const buttonOneSprite = getFirst(buttonOne)
  const buttonTwoSprite = getFirst(buttonTwo)
  const buttonThreeSprite = getFirst(buttonThree)
  if (playerSprite && buttonOneSprite) {
    const playerTile = getTile(playerSprite.x, playerSprite.y)
    const buttonOneTile = getTile(buttonOneSprite.x, buttonOneSprite.y)

    if (playerTile.length > 0 && buttonOneTile.length > 0) {
      const playerType = playerTile[0].type
      const buttonType = buttonOneTile[0].type

      if (playerType == buttonType) {
        let ermx = getFirst(player).x
        let ermy = getFirst(player).y
        end = 1
        level = 0
        setMap(levels[level])
        createlitter()
      }
    }
  }
  if (playerSprite && buttonThreeSprite) {
    const playerTile = getTile(playerSprite.x, playerSprite.y)
    const buttonThreeTile = getTile(buttonThreeSprite.x, buttonThreeSprite.y)

    if (playerTile.length > 0 && buttonThreeTile.length > 0) {
      const playerType = playerTile[0].type
      const buttonType = buttonThreeTile[0].type

      if (playerType == buttonType) {
        let ermx = getFirst(player).x
        let ermy = getFirst(player).y
        level = 2
        setMap(levels[level])
      }
    }
  }
    if (playerSprite && buttonTwoSprite) {
    const playerTile = getTile(playerSprite.x, playerSprite.y)
    const buttonTwoTile = getTile(buttonTwoSprite.x, buttonTwoSprite.y)

    if (playerTile.length > 0 && buttonTwoTile.length > 0) {
      const playerType = playerTile[0].type
      const buttonType = buttonTwoTile[0].type

      if (playerType == buttonType) {
        let ermx = getFirst(player).x
        let ermy = getFirst(player).y
        end = 0
        level = 0
        setMap(levels[level])
        createlitter()
        timer()
      }
    }
  }
  if (playerSprite && litterOneSprite) {
    const playerTile = getTile(playerSprite.x, playerSprite.y)
    const litterOneTile = getTile(litterOneSprite.x, litterOneSprite.y)

    if (playerTile.length > 0 && litterOneTile.length > 0) {
      const playerType = playerTile[0].type
      const litterType = litterOneTile[0].type

      if (playerType == litterType) {
        points += 1
        let ermx = getFirst(player).x
        let ermy = getFirst(player).y
        litterOneTile.forEach(s => s.remove())
        addSprite(ermx,ermy,player)
        updateScore()
      }
    }
  }
  if (playerSprite && litterTwoSprite) {
    const playerTile = getTile(playerSprite.x, playerSprite.y)
    const litterTwoTile = getTile(litterTwoSprite.x, litterTwoSprite.y)

    if (playerTile.length > 0 && litterTwoTile.length > 0) {
      const playerType = playerTile[0].type
      const litterType = litterTwoTile[0].type

      if (playerType == litterType) {
        points += 1
        let ermx = getFirst(player).x
        let ermy = getFirst(player).y
        litterTwoTile.forEach(s => s.remove())
        addSprite(ermx,ermy,player)
        updateScore()
      }
    }
  }
  if (playerSprite && litterThreeSprite) {
    const playerTile = getTile(playerSprite.x, playerSprite.y)
    const litterThreeTile = getTile(litterThreeSprite.x, litterThreeSprite.y)

    if (playerTile.length > 0 && litterThreeTile.length > 0) {
      const playerType = playerTile[0].type
      const litterType = litterThreeTile[0].type

      if (playerType == litterType) {
        points += 1
        let ermx = getFirst(player).x
        let ermy = getFirst(player).y
        litterThreeTile.forEach(s => s.remove())
        addSprite(ermx,ermy,player)
        updateScore()
        
      }
    }
  }
})
function updateScore(){
addText("Score: " + points,{
  x: 0, y: 0, 
  color: color`3`
})
}
function gameOver(){
  clearText()
  addText("You Collected " + points,{
  x: 0, y: 0, 
  color: color`3`
})
  level = 2
  setMap(levels[level])
}
