/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Get the GREEN!
@author: Dhyan99
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const green = "s"
const grey = "g"
const red = "r"
var gameOver = false

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

let level = 0
const levels = [
  map`
ggggggggg
ggggggggg
ggggggggg
ggggggggg
ggggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addSprite(4,2,player);

      const randomX = Math.floor(Math.random() * 9);
      const randomY = Math.floor(Math.random() * 5);
      addSprite(randomX, randomY, red)
      const randomX1 = Math.floor(Math.random() * 9);
      const randomY1 = Math.floor(Math.random() * 5);
      addSprite(randomX1, randomY1, red)
      const randomX2 = Math.floor(Math.random() * 9);
      const randomY2 = Math.floor(Math.random() * 5);
      addSprite(randomX2, randomY2, red)
      const randomX3 = Math.floor(Math.random() * 9);
      const randomY3 = Math.floor(Math.random() * 5);
      addSprite(randomX3, randomY3, green)

function checkGreen() {
  const playerSprite = getFirst(player);
  const greenSprite = getFirst(green);
  const redSprites = getAll(red)
    if (playerSprite.x === greenSprite.x && playerSprite.y === greenSprite.y && gameOver === false) {
      greenSprite.remove()
      for (const redSprite of redSprites) {
        redSprite.remove()
      }
      const randomX = Math.floor(Math.random() * 9);
      const randomY = Math.floor(Math.random() * 5);
      addSprite(randomX, randomY, red)
      const randomX1 = Math.floor(Math.random() * 9);
      const randomY1 = Math.floor(Math.random() * 5);
      addSprite(randomX1, randomY1, red)
      const randomX2 = Math.floor(Math.random() * 9);
      const randomY2 = Math.floor(Math.random() * 5);
      addSprite(randomX2, randomY2, red)
      const randomX3 = Math.floor(Math.random() * 9);
      const randomY3 = Math.floor(Math.random() * 5);
      addSprite(randomX3, randomY3, green)
    }
  for (const redSprite of redSprites) {
    if(playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false){
      addText("Game OVER!", { 
  x: 5,
  y: 3,
  color: color`.`
})
      gameOver = true;
  }
  }
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
