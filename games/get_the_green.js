/*
@title: Get the GREEN!
@author: Dhyan99
@tags: ['endless']
@addedOn: 2024-06-28
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const green = "s"
const grey = "g"
const red = "r"
var gameOver = false
var ingameLevel = 1
var timer = 10;
let countdownInterval;

setLegend(
  [ player, bitmap`
................
................
................
................
................
.......00.......
.......00.......
......9CC9......
......0990......
......D99D......
.......LL.......
................
................
................
................
................` ],
  [green,bitmap`
2222222222222222
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2222222222222222`],
  [red, bitmap`
2222222222222222
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2222222222222222`],
  [grey,bitmap`
2222222222222222
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2222222222222222`],
)

setSolids([ green, red ])

let level = 0
const levels = [
  map`
ggggggggggg
ggggggggggg
ggggggggggg
ggggggggggg
ggggggggggg
ggggggggggg
ggggggggggg
ggggggggggg
ggggggggggg
...........`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addSprite(5,4,player);

      const randomX = Math.floor(Math.random() * 11);
      const randomY = Math.floor(Math.random() * 9);
      addSprite(randomX, randomY, red)
      const randomX1 = Math.floor(Math.random() * 11);
      const randomY1 = Math.floor(Math.random() * 9);
      addSprite(randomX1, randomY1, red)
      const randomX3 = Math.floor(Math.random() * 11);
      const randomY3 = Math.floor(Math.random() * 9);
      clearTile(randomX3,randomY3)
      addSprite(randomX3, randomY3, grey)
      addSprite(randomX3, randomY3, green)
addText("Level "+ingameLevel, { 
  x: 2,
  y: 15,
  color: color`.`
})

function checkGreen() {
  const playerSprite = getFirst(player);
  const greenSprite = getFirst(green);
  const redSprites = getAll(red)
    if (playerSprite.x === greenSprite.x && playerSprite.y === greenSprite.y && gameOver === false) {
      resetTimer()
      greenSprite.remove()
      for (const redSprite of redSprites) {
        redSprite.remove()
      }
      ingameLevel += 1
      for(let i = 0;i < ingameLevel * 2 - 2;i++){
      const randomX = Math.floor(Math.random() * 11);
      const randomY = Math.floor(Math.random() * 9);
      addSprite(randomX, randomY, red)
      }

      const randomX = Math.floor(Math.random() * 11);
      const randomY = Math.floor(Math.random() * 9);
      clearTile(randomX,randomY)
      addSprite(randomX, randomY, grey)
      addSprite(randomX, randomY, green)

      if(playerSprite.x === randomX && playerSprite.y === randomY){
        getFirst(player).x = 5
        getFirst(player).y = 4
      }
      const playerSprite1 = getFirst(player)
      clearTile(playerSprite1.x,playerSprite1.y)
      addSprite(playerSprite1.x,playerSprite1.y, grey)
      addSprite(playerSprite1.x,playerSprite1.y, player)
      addText("Level "+ingameLevel, { 
  x: 2,
  y: 15,
  color: color`.`
})
      startTimer()
      
      
    }
  for (const redSprite of redSprites) {
    if(playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false){
      resetTimer()
      clearText()
      addText("Game Over! Lvl "+ingameLevel, { 
  x: 2,
  y: 15,
  color: color`.`
})
      gameOver = true;
  }
  }
}

function startTimer() {
  timer = 10;
  addText(timer.toString(), { 
  x: 15,
  y: 15,
  color: color`.`
})
  countdownInterval = setInterval(() => {
    timer--;
      addText("0"+timer.toString(), { 
  x: 15,
  y: 15,
  color: color`.`
})
    if (timer === 0) {
      clearInterval(countdownInterval);
           clearText()
      addText("Game OVER! Lvl "+ingameLevel, { 
  x: 2,
  y: 15,
  color: color`.`
})
      gameOver = true;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  timer = 10;
}

onInput("w", () => {
  getFirst(player).y -= 1
  checkGreen()
})


onInput("a", () => {
  getFirst(player).x -= 1
  checkGreen()
})

onInput("s", () => {
  getFirst(player).y += 1
  checkGreen()
})

onInput("d", () => {
  getFirst(player).x += 1
  checkGreen()
})

onInput("i", () => {
  getFirst(player).x -= 1
  getFirst(player).y -= 1
  checkGreen()
})

onInput("j", () => {
  getFirst(player).x -= 1
  getFirst(player).y += 1
  checkGreen()
})

onInput("k", () => {
  getFirst(player).x += 1
  getFirst(player).y += 1
  checkGreen()
})

onInput("l", () => {
  getFirst(player).x += 1
  getFirst(player).y -= 1
  checkGreen()
})
