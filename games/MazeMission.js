/*
@title: MazeMission
@author: CaitlinOchuwa
@tags: ['puzzle']
@addedOn: 2024-08-06

HOW TO PLAY
'WASD' to control your player
'I' to reset the game

The goal is to get to the door to escape the mazes. However, in order to maximize your score
and successfully complete the run, you must collect all of the coins. But, the red coins
are known as AntiCoins and actually hurt your score. Collect coins, avoid the AntiCoins, and navigate
through the mazes to become the ultimate maze master!
*/

//CONSTANTS
const player = "p"
const antiCoin = "o"
const spike = "s"
const spikeRight = "r"
const spikeLeft = "l"
const spikeDown = "a"
const coin = "c"
const door = "d"
const background = "b"
const collectedCoin = tune `
461.53846153846155: B5~461.53846153846155,
14307.692307692309`
const collectedAntiCoin = tune `
461.53846153846155: C4^461.53846153846155,
14307.692307692309`


setLegend(
  [ player, bitmap`
................
................
................
................
................
................
......9999......
.....999999.....
.....909909.....
.....999999.....
.....990099.....
......9999......
......0..0......
.....00..00.....
................
................` ],
  [ spike, bitmap `
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ coin, bitmap `
................
................
................
................
.....66666......
....6666666.....
....6600066.....
....6606666.....
....6600066.....
....6666666.....
.....66666......
................
................
................
................
................`],
  [door, bitmap `
................
................
................
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
.....CCCC6C.....
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
................
................`],
  [ background, bitmap `
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ],
  [spikeRight, bitmap `
000000000.......
0000000000......
00000000000.....
000000000000....
0000000000000...
00000000000000..
000000000000000.
0000000000000000
0000000000000000
000000000000000.
00000000000000..
0000000000000...
000000000000....
00000000000.....
0000000000......
000000000.......`],
  [spikeLeft, bitmap `
.......000000000
......0000000000
.....00000000000
....000000000000
...0000000000000
..00000000000000
.000000000000000
0000000000000000
0000000000000000
.000000000000000
..00000000000000
...0000000000000
....000000000000
.....00000000000
......0000000000
.......000000000`],
  [spikeDown, bitmap `
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
..000000000000..
...0000000000...
....00000000....
.....000000.....
......0000......
.......00.......`], [antiCoin, bitmap`
................
................
................
................
.....33333......
....3333333.....
....3300033.....
....3303333.....
....3300033.....
....3333333.....
.....33333......
................
................
................
................
................`]
)

setBackground(background)

//GLOBAL VARIABLES
var score = 0
var isSecretChallenge = false



//SCORE AND LIVES LABELS
addText(`Score: ${score}`,{x: 0, y: 0, color: color`4`})
addText(`   WASD to move\n   'i' to reset\n Collect coins and\n navigate through\n the mazes to win!`, {x: 1, y:5, color: color`D`}) 

setSolids([player, spike, spikeRight, spikeLeft, spikeDown])

let levelNumber = 0
const levels = [ map `
aad
rc.
p.l`, map `
d.aa
rc..
raa.
p..c`, map `
.....
.sss.
.ldr.
.l.r.
pl.c.`, map `
aaaaaaa
rcro.cl
r.r.l.l
r..cl.l
rss...l
r...s..
p.o.csd`, map `
ca.c.aaa
..da.c.c
rcoco..a
r....rc.
c.lc.roc
..l..c..
colcosss
pc..c..c`, map `
..d.aa
sss...
c.ocr.
.aa.r.
p...oc`, map `
..o.....c....l
.aaa..aa...r.l
.clc...o...r.l
..l..sssssss.l
..l.o......r.l
........co.r.l
.aaa.l.aaa.rcl
.aalcl.olo.rss
...l.l.cl.....
po.c..o....s.d`, map`
daaaa
....o
aaa.c
p...o`
]
setMap(levels[levelNumber])

setPushables({
  [ player ]: []
})

//USER INPUT
onInput("d", () => {
  getFirst(player).x += 1;
})
onInput("a", () => {
  getFirst(player).x -= 1;
})
onInput("w", () => {
  getFirst(player).y -= 1;
})
onInput("s", () => {
  getFirst(player).y += 1;
})
onInput("i", () => {
  resetGame()
})
onInput("j", () => {
  resetGame()
  isSecretChallenge = true
  addText(`Collect the LEAST\namount of coins\n   possible to win`, {x: 1, y: 10, color: color`9`})
})

afterInput(() => {
  let antiCoins = getAll(antiCoin)
  let coins = getAll(coin)
  let character = getFirst(player)
  let thisTile = getTile(getFirst(player).x, getFirst(player).y);
  if(thisTile.length > 1){
    if(thisTile[1]._type == "d"){
      if(levelNumber >= levels.length - 1){
        if(score == 36){
        addText(`Congrats! You Win!`, {x: 1, y: 5, color: color`4`})
        addText(`Press 'j' to play\na secret challenge`, {x: 1, y: 8, color: color`6`})
        addText(`Press 'i' to reset\n     the game`, {x: 1, y: 13, color: color`4`})
        }
        else if(isSecretChallenge == false && score < 36){
          addText(`Try again. Collect\n      All Coins`, {x: 1, y: 5, color: color `3`})
          addText(`Press 'i' to reset\n     the game`, {x: 1, y: 13, color: color `3`})
        }
        else if(score == 9 && isSecretChallenge == true){
          addText(`Congrats! You are\n   the ultimate\n    maze master!`, {x: 1, y: 5, color: color `9`})
          addText(`Press 'i' to reset\n     the game`, {x: 1, y: 13, color: color `9`})
        }
        else{
          addText(`Try again, Collect\nthe LEAST amount\n     of coins`, {x: 1, y: 5, color: color `3`})
          addText(`Press 'i' to reset\n     the game`, {x: 1, y: 13, color: color`3`})
        } 
      }
      else{
      levelNumber++
      setMap(levels[levelNumber])
      }
    }
  }
  for(let i = 0; i < coins.length; i++){
    if(character.x === coins[i].x && character.y === coins[i].y){
      coins[i].remove()
      playTune(collectedCoin)
      score += 1;
      clearText()
      addText(`Score: ${score}`,{x: 0, y: 0, color: color`4`})
    
    }
  }
  for(let i = 0; i < antiCoins.length; i++){
    if(character.x === antiCoins[i].x && character.y === antiCoins[i].y){
      antiCoins[i].remove()
      playTune(collectedAntiCoin)
      score -= 2;
      clearText()
      addText(`Score: ${score}`,{x: 0, y: 0, color: color`3`})
    
    }
  }

  if(score < 0){
    addText(`Try again. Collect\n  All GOLD Coins`, {x: 1, y: 5, color: color `3`})
    addText(`Press 'i' to reset\n     the game`, {x: 1, y: 11, color: color `3`})
  }
})



//RESETS THE GAME
function resetGame(){
  score = 0
  isSecretChallenge = false
  clearText()
  addText(`Score: ${score}`,{x: 0, y: 0, color: color`4`})
  addText(`   WASD to move\n   'i' to reset\n Collect coins and\n navigate through\n the mazes to win!`, {x: 1, y:5, color: color`D`})
  levelNumber = 0
  setMap(levels[levelNumber])
}

