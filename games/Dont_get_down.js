/*
@title: Dont get down
@description: Dont get hit by untextured blocks
@author: Kitulik
@tags: ['Untextured', 'road', 'easy']
@addedOn: 2025-00-00
*/

/*Variables*/
let running = 0;
let count;
let score = 0;
/*--------------------------*/
/*Textures*/
const player = "p"
const grass = "g"
const box = "b"
const road_left = "l"
const road_center = "c"
const road_right = "r"
const red = "e"

setLegend(
  [player, bitmap`
00.......00.....
020.....020.....
02900000920.....
09999999990000..
090999990902220.
0909999909022220
0999202999022200
.0992229909990..
..000000099990..
.0999999909990..
09099999099990..
0009999900000...
..0900090000....
..020.020.......
................
................`],
  [box, bitmap`
HHHH0000HHHH0000
HHHH0000HHHH0000
HHHH0000HHHH0000
HHHH0000HHHH0000
0000HHHH0000HHHH
0000HHHH0000HHHH
0000HHHH0000HHHH
0000HHHH0000HHHH
HHHH0000HHHH0000
HHHH0000HHHH0000
HHHH0000HHHH0000
HHHH0000HHHH0000
0000HHHH0000HHHH
0000HHHH0000HHHH
0000HHHH0000HHHH
0000HHHH0000HHHH`],
  [red, bitmap`
3333333333333333
................
3333333333333333
................
3333333333333333
................
3333333333333333
................
3333333333333333
................
3333333333333333
................
3333333333333333
................
3333333333333333
................`],
  [road_left, bitmap`
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLL2
22LLLLLLLLLLLLLL
22LLLLLLLLLLLLLL`],
  [road_center, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [road_right, bitmap`
LLLLLLLLLLLLLL22
LLLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
LLLLLLLLLLLLLL22
LLLLLLLLLLLLLL22
LLLLLLLLLLLLLL22
LLLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
2LLLLLLLLLLLLL22
LLLLLLLLLLLLLL22
LLLLLLLLLLLLLL22`],
  [grass, bitmap`
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
4444444444444444`]

)

setSolids([player, grass, box])

setPushables({
  [box]: [player]
})
/*--------------------------*/
/*level*/
const levels = [
  map`
glcrg
glcrg
glcrg
glcrg
glcrg`
]
/*--------------------------*/

/*controlls*/

onInput("a", () => {
  if (running == 1) {
    getFirst(player).x -= 1
  }
})

onInput("d", () => {
  if (running == 1) {
    getFirst(player).x += 1
  }
})

onInput("w", () => {
  if (running == 1) {
    if (getFirst(player).y !== 1) {
      getFirst(player).y -= 1
    }
  }
})

onInput("s", () => {
  if (running == 1) {
    if (getFirst(player).y < 3) {
      getFirst(player).y += 1
    }
  }
})

onInput("i", () => {
  start()
})

/*--------------------------*/
/*---------------Welcome---------------*/
welcome()

function welcome() {
  setMap(levels[0])
  clearText()
  addSprite(2, 4, player)

  addText("DONT GET DOWN", {
    x: 4,
    y: 1,
    color: color`3`
  })

  addText("DODGE THE BOXES!", {
    x: 2,
    y: 3,
    color: color`9`
  })

  addText("MOVE", {
    x: 8,
    y: 5,
    color: color`4`
  })

  addText("W S A D", {
    x: 6,
    y: 6,
    color: color`9`
  })

  addText("RESET", {
    x: 7,
    y: 8,
    color: color`4`
  })

  addText("I", {
    x: 9,
    y: 9,
    color: color`9`
  })

  addText("PRESS I TO START", {
    x: 2,
    y: 11,
    color: color`3`
  })

}
/*----------------------------------------------------*/
/*---------------Game---------------*/
/*Logick*/
function start() {
  clearText()
  setMap(levels[0])

  addSprite(2, 2, player)
  addSprite(1, 4, red)
  addSprite(2, 4, red)
  addSprite(3, 4, red)

  running = 1
  count = 0
  score = 0
}

function boxMove() {
  let boxes = getAll(box);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].y += 1;
  }
}

function boxDelete() {
  let boxes = getAll(box);

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].y == 4) {
      boxes[i].remove();
      score++
    }
  }
}

function boxNew() {
  count = 0
  let boxNewCount = Math.floor(Math.random() * 2);
  if (boxNewCount == 0) {
    let x = Math.floor(Math.random() * 3) + 1;
    addSprite(x, 0, box)
  } else {
    let x1 = Math.floor(Math.random() * 3) + 1;
    let x2;
    do {
      x2 = Math.floor(Math.random() * 3) + 1;
    } while (x2 === x1);

    addSprite(x1, 0, box)
    addSprite(x2, 0, box)
  }
}

function playerLose() {
  if (getFirst(player).y == 4) {
    end()
  }
}

function scoreDisplay() {
  if (running == 1) {
    addText("score", {
      x: 0,
      y: 0,
      color: color`9`
    })
    addText("" + score, {
      x: 1,
      y: 1,
      color: color`9`
    })
  }
}


var gameLoop = setInterval(() => {
  if (running == 1) {
    boxDelete()
    boxMove()
    if (count == 1) {
      boxNew()
    } else {
      count = 1
    }
    playerLose()
    scoreDisplay()
  }
}, 350)
/*----------------------------------------------------*/
/*---------------End---------------*/
function end() {
  running = 0
  clearText()
  setMap(levels[0])
  addSprite(2, 4, player)

  addText("GAME OVER", {
    x: 5,
    y: 1,
    color: color`3`
  })

  addText("YOUR SCORE", {
    x: 5,
    y: 4,
    color: color`9`
  })

  addText("" + score, {
    x: 9,
    y: 5,
    color: color`6`
  })

  addText("PRESS I", {
    x: 7,
    y: 8,
    color: color`5`
  })

  addText("TO RESTART", {
    x: 5,
    y: 9,
    color: color`5`
  })
}
/*----------------------------------------------------*/