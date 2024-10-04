/*
@title: Block_Stacker
@author: vracto
@tags: []
@addedOn: 2024-05-02
   ___  __         __     ______           __          
  / _ )/ /__  ____/ /__  / __/ /____ _____/ /_____ ____
 / _  / / _ \/ __/  '_/ _\ \/ __/ _ `/ __/  '_/ -_) __/
/____/_/\___/\__/_/\_\ /___/\__/\_,_/\__/_/\_\\__/_/ 

@img: ""
*/


const blocks = "roygdblip".split("")
let curBlock;
let len = 5;
let stackSize = 0;
let running = false,gameOver = false
let blockX = 0;
let range = [0, 14]
let start

//sounds
const sounds = {
  "break": tune`
100: C5^500,
120`,
  "destroy": tune`
500: F4/500 + E4/500 + D4/500,`,
  "place": tune`
500: E5-500,
15500`,
  "gameover": tune`
250: F5~250,
400: B4~250,
400: F4~250,
400: E4~250,
250: D4~250,
6750`,
  "win": tune`
400: E4-250,
400: F4-250,
250: B4-250,
250: F5-250,
250: A5-250,`,
}

setLegend(
  ["1", bitmap`
.............222
..............22
...............2
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
...............2
..............22
.............222`],
  ["2", bitmap`
222.............
22..............
2...............
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
2...............
22..............
222.............`],
  ["r", bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  ["o", bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  ["y", bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  ["g", bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  ["d", bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  ["b", bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  ["l", bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  ["i", bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  ["p", bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
)

let level = 0
const levels = [
  map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............`
]

setMap(levels[level])

function wait(t) {
  let start = performance.now()
  while (performance.now() - start < t) {}
}

let mInterval

function movement() {
  let diff = 1
  const z = getAll(curBlock).reverse()[0]
  if (z.x == 14) {
    diff = -1
  }
  if (z.x == len - 1) {
    diff = 1
  }
  blockX = z.x
  mInterval = setInterval(function() {
    let numBlocks = 0;
    for (let a of getAll(curBlock).reverse()) {
      numBlocks++
      if (numBlocks <= len) {
        a.x += diff
      }
    }
    const z = getAll(curBlock).reverse()[0]
    if (z.x == 14) {
      diff = -1
    }
    if (z.x == len - 1) {
      diff = 1
    }
    blockX = z.x
  }, stackSize < 8 ? -45 / 2.5 * stackSize + 200 : -26 / 4 * stackSize + 108)
}

function nextRound() {
  if (!running) {
    if (len != 0) {
      if (stackSize < 12) {
        clearText()
        if (stackSize == 0) {
          addText("s to place", {
            x: 5,
            y: 10,
            color: color`7`
          })
        }
        addText("Score: " + stackSize, {
          x: 1,
          y: 1,
          color: color`L`
        })
        curBlock = blocks[Math.floor(blocks.length * Math.random())]
        const blockStart = Math.floor(Math.random() * (15 - len))
        for (let i = 0; i < len; i++) {
          addSprite(blockStart + i, 11 - stackSize, curBlock)
        }
        movement()
        running = true;
      } else {
        playTune(sounds.win)
        clearText()
        addText("Score: 12", {
          x: 4,
          y: 5,
          color: color`4`
        })
        setTimeout(function() {
          addText("Time: " + Math.round(performance.now() - start) / 1000 + "s", {
            x: 4,
            y: 6,
            color: color`4`
          })
        }, 400)
        setTimeout(function() {
          addText("You ", {
            x: 6,
            y: 3,
            color: color`4`
          })
        }, 800)
        setTimeout(function() {
          addText("You Won!!", {
            x: 6,
            y: 3,
            color: color`4`
          })
        }, 1050)
        setTimeout(function() {
          addText("w to restart", {
            x: 4,
            y: 8,
            color: color`4`
          })
          gameOver = true
        }, 1300)
      }
    } else {
      playTune(sounds.gameover)
      clearText()
      addText("Game Over!", {
        x: 5,
        y: 3,
        color: color`3`
      })
      setTimeout(function() {
        addText("Score: " + (stackSize - 1), {
          x: 4,
          y: 5,
          color: color`3`
        })
      }, 400)
      setTimeout(function() {
        addText("Time: " + Math.round(performance.now() - start) / 1000 + "s", {
          x: 4,
          y: 6,
          color: color`3`
        })
      }, 800)
      setTimeout(function() {
        addText("w to restart", {
          x: 4,
          y: 8,
          color: color`3`
        })
        gameOver = true
      }, 1200)
    }
  }
}

start = performance.now()
nextRound()

onInput("s", () => {
  if (running) {
    if (stackSize<11){
      playTune(sounds.place)
    }
    running = false;
    clearInterval(mInterval);
    stackSize++;
    range[0] = Math.max(range[0], blockX - len + 1)
    range[1] = Math.min(range[1], blockX)
    if (range[1] - range[0] + 1 < len) {
      const orig = len
      len = Math.max(range[1] - range[0] + 1, 0)
      let numBlocks = 0;
      let blocksDespawning = 0
      for (let a of getAll(curBlock).reverse()) {
        numBlocks++
        if (numBlocks <= orig && (a.x < range[0] || a.x > range[1])) {
          blocksDespawning++
          let inter = setInterval(function() {
            if (getTile(a.x, a.y + 1).length == 0 && a.y != 11) {
              playTune(sounds.break)
              a.y += 1
            } else {
              a.remove()
              blocksDespawning--
              if (blocksDespawning == 0) {
                playTune(sounds.destroy)
                nextRound()
              }
              clearInterval(inter)
            }
          }, 150)
        }
      }
    } else {
      nextRound()
    }
  }
})

onInput("w",()=>{
  if (gameOver){
    gameOver = false
    start = performance.now()
    len = 5;
    stackSize = 0;
    blockX = 0
    range = [0, 14]
    for (let x = 0;x<15;x++){
      for (let y = 0;y<12;y++){
        clearTile(x, y)
      }
    }
    nextRound()
  }
})
