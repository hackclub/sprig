/*
@title: burger build
@author: emily27yee
@tags: ['action']
@addedOn: 2023-08-19
*/

const player = "p"
const meat = "m"
const cheese = "c"
const tomato = "t"
const lettuce = "l"
const topBun = "b"

const meat2 = "e"
const cheese2 = "h"
const tomato2 = "o"
const lettuce2 = "u"
const topBun2 = "n"

const burger1 = "1"
const burger2 = "2"
const burger3 = "3"
const burger4 = "4"
const burger5 = "5"

setLegend(
  [ player, bitmap`
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
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
................` ],
  [ meat, bitmap`
................
................
................
................
................
................
................
................
...CC00CC00CC...
..CC00CC00CC00..
..C00CC00CC00C..
...0CC00CC00C...
................
................
................
................`],
  [ cheese, bitmap`
................
................
................
................
................
.........66.....
.......666666...
.....666666666..
...666666666666.
..66666666666...
....6666666.....
......666.......
................
................
................
................`],
  [ tomato, bitmap`
................
................
................
................
................
................
................
...3333333333...
..333939993933..
..339393939393..
...3333333333...
................
................
................
................
................`],
  [ lettuce, bitmap`
................
................
................
................
.......DF..DD...
...DF.DDDDDD....
..DDDD44D4DDDF..
....FD4D4DD4DF..
..DDDDDDD4DDDD..
...FDD.DDDDD....
.......D..FF....
................
................
................
................
................`],
  [ topBun, bitmap`
................
....CC2C2CCC....
...C2CC2CCC2C...
..CCC2CC2C2C2C..
..CCCCCCCCCCCC..
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
................`],

  [ meat2, bitmap`
................
................
................
................
................
................
................
................
...CC00CC00CC...
..CC00CC00CC00..
..C00CC00CC00C..
...0CC00CC00C...
................
................
................
................`],
  [ cheese2, bitmap`
................
................
................
................
................
.........66.....
.......666666...
.....666666666..
...666666666666.
..66666666666...
....6666666.....
......666.......
................
................
................
................`],
  [ tomato2, bitmap`
................
................
................
................
...3333333333...
..333939993933..
..339393939393..
...3333333333...
................
................
................
................
................
................
................
................`],
  [ lettuce2, bitmap`
................
................
................
................
.......DF..DD...
...DF.DDDDDD....
..DDDD44D4DDDF..
....FD4D4DD4DF..
..DDDDDDD4DDDD..
...FDD.DDDDD....
.......D..FF....
................
................
................
................
................`],
  [ topBun2, bitmap`
................
....CC2C2CCC....
...C2CC2CCC2C...
..CCC2CC2C2C2C..
..CCCCCCCCCCCC..
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
................`],

  [ burger1, bitmap`
5555555555555555
5....C2CC2C....5
5..CC2C2CC2CC..5
5.CCCCCCCCCCCC.5
5..............5
5.666666666666.5
5...66666666...5
5......66......5
5..............5
5..C00CC00CC0..5
5.C00CC00CC00C.5
5..0CC00CC00C..5
5..............5
5.CCCCCCCCCCCC.5
5...CCCCCCCC...5
5555555555555555`],
  [ burger2, bitmap`
5555555555555555
5....C2CC2C....5
5..CC2C2CC2CC..5
5.CC2C2CC2CC2C.5
5.CCCCCCCCCCCC.5
5.333333333333.5
5..3333333333..5
5.DDDD44DD44D4.5
5.4D.4DD.D4D.D.5
5..C0CD0CC0CC..5
5.C0C00CC00C0C.5
5..C00C000C00..5
5.CCCCCCCCCCCC.5
5.CCCCCCCCCCCC.5
5...CCCCCCCC...5
5555555555555555`],
  [ burger3, bitmap`
5555555555555555
5....C2CC2C....5
5..CC2C2CC2CC..5
5.CC2C2CC2CC2C.5
5.CCCCCCCCCCCC.5
5.666666666666.5
5..6666666666..5
5.....6666.....5
5.333333333333.5
5..3333333333..5
5.DDDD44DD44D4.5
5.4D.4DD.D4D.D.5
5.CCCCCCCCCCCC.5
5.CCCCCCCCCCCC.5
5...CCCCCCCC...5
5555555555555555`],
  [ burger4, bitmap`
5555555555555555
5....C2CC2C....5
5..CC2C2CC2CC..5
5.CC2C2CC2CC2C.5
5.CCCCCCCCCCCC.5
5.666666666666.5
5..6666666666..5
5.DDDD466D44D4.5
5.4D.4DD.D4D.D.5
5..C0CD0CC0CC..5
5.C0C00CC00C0C.5
5..C00C000C00..5
5.CCCCCCCCCCCC.5
5.CCCCCCCCCCCC.5
5...CCCCCCCC...5
5555555555555555`],
  [ burger5, bitmap`
5555555555555555
5....C2CC2C....5
5..CC2C2CC2CC..5
5.CCCCCCCCCCCC.5
5.666666666666.5
5....666666....5
5.333333333333.5
5.333333333333.5
5.4DDD44DD44DD.5
5.DD.4DD.D4D.D.5
5..0CC00CC00C..5
5.0CC00CC00C0C.5
5..C00CC00CC0..5
5.CCCCCCCCCCCC.5
5...CCCCCCCC...5
5555555555555555`],
)

const foodMap = {
  m: 'e',
  c: 'h',
  t: 'o',
  l: 'u',
  b: 'n'
}

setSolids([player])

let level = 0
const levels = [map`
.....
.....
.....
.....
.....`,
  map`
1....
.....
.....
.....
..p..`,
  map `
2....
.....
.....
.....
..p..`,
  map`
3....
.....
.....
.....
..p..`,
  map`
4....
.....
.....
.....
..p..`,
  map`
5....
.....
.....
.....
..p..`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let hasStartedGame = false;
let speed = 1000;

function startGame() {
  speed = 1000;
  if (level == 0) {
    hasStartedGame = false;
    addText("Burger Builder", {x: 3, y: 1, color: color`5`})
    addText("to start: \npress L", {x: 3, y: 5, color: `black`})
    addText("move bun with \nA and D", {x: 3, y: 8, color: `black`})
    addText("catch food to \nbuild burger!", {x: 3, y: 12, color: color`H`})
  }
  
  onInput("l", () => {
    if (!hasStartedGame) {
      hasStartedGame = true;
      clearText()
      level = 1
      setMap(levels[level])
    }
  })
}

onInput("j", () => {
  level = 0
  restartGame()
})

const foodTypes = [meat, cheese, tomato, lettuce, topBun];
const foodTypes2 = [meat2, cheese2, tomato2, lettuce2, topBun2];

const level1burger = ['m', 'c', 'b'];
const level2burger = ['m', 'l', 't', 'b'];
const level3burger = ['l', 't', 'c', 'b'];
const level4burger = ['m', 'l', 'c', 'b'];
const level5burger = ['m', 'l', 't', 'c', 'b'];
const burgerLevels = [level1burger, level2burger, level3burger, level4burger, level5burger];
let collectedFood1 = [];
let collectedFood2 = [];

onInput("a", () => {
  getFirst(player).x -= 1
  
  foodTypes2.forEach(type => {
    getAll(type).forEach(food => {
      food.x -= 1
    })
  })
})

onInput("d", () => {
  getFirst(player).x += 1

  foodTypes2.forEach(type => {
    getAll(type).forEach(food => {
      food.x += 1
    })
  })
})

function randFood() {
  let num = Math.floor(Math.random() * 5);
  return foodTypes[num];
}

let foods = [];

function addFood() {
  let x = Math.floor(Math.random() * 5);
  let y;
  if (x == 0)
    y = 1;
  else
    y = 0;
  let newFood = addSprite(x, y, randFood());
  foods.push(newFood);
}

function fallingFood() {
  foodTypes.forEach(type => {
    getAll(type).forEach(food => {
      setTimeout(() => {
        food.y += 1;
      }, speed)
    }) 
  })
}

function removeFood() {
  foodTypes.forEach(type => {
    getAll(type).forEach(food => {
      if (food.y == 4 && !(food.x === getFirst(player).x)) {
        let x = food.x;
        let y = food.y;
        food.remove();
      }
    })
  })
}

let mapping;

function stackingFood() {
  foodTypes.forEach(type => {
    getAll(type).forEach(food => {
      if (food.x === getFirst(player).x && food.y === getFirst(player).y) {
        mapping = foodMap[food.type];
        let collectedFoodImage = addSprite(getFirst(player).x, getFirst(player).y, mapping)
        collectedFood1.push(collectedFoodImage);
        collectedFood2.push(food.type);
        food.remove();
      }
    })
  })
}

let win = false;

function checkWin() {
  if (burgerLevels[level - 1].length !== collectedFood2.length) {
    win = false;
    // console.log("diff length")
  }
  
  for (let i = 0; i < burgerLevels[level - 1].length && i < collectedFood2.length; i++) {
    if (burgerLevels[level - 1][i] === collectedFood2[i]) {
      win = true;
    }
    else {
      win = false;
      // console.log("diff ingredients")
      break;
    }
  }
  if (win) {
    addText("You Win", {
              x: 6,
              y: 4,
              color: color`black`
            });
    addText(`Next level: \nLevel ${level + 1}`, {
              x: 6,
              y: 7,
              color: color`L`
            });
    speed -= 100;
    if (level < 5) {
      // console.log("level is " + level)
      addText("press I", {x: 6, y: 11, color: color`L`})
      level += 1;
      clearInterval(runGameInterval);
      // console.log(win)
      onInput("i", () => {
        if (win) {
          setLevel();
          runGameInterval = setInterval(gameLoop, speed);
          win = false;
        }
      })
    }
    else {
      clearText()
      addText("You beat \nthe game!", {
              x: 6,
              y: 5,
              color: color`H`
            });
      clearInterval(runGameInterval);
    }
  //win = false;
  }
  else {
    addText("You Lose", {
            x: 6,
            y: 5,
            color: color`black`
          });
    addText("to restart: \npress J", {x: 5, y: 8, color: color`L`})
    clearInterval(runGameInterval);
  }
}

function setLevel() {
  collectedFood1 = [];
  collectedFood2 = [];
  setMap(levels[level])
  clearText()
}

function restartGame() {
  clearInterval(runGameInterval);
  setLevel();
  hasStartedGame = false;
  runGameInterval = setInterval(gameLoop, 1000);
  speed = 1000;
}

let runGameInterval;

function gameLoop() {
  if (!hasStartedGame)
    startGame();
  else {
    addFood();
    fallingFood();
    removeFood();
    stackingFood();
    
    if (collectedFood2.includes(topBun)) {
      // console.log(collectedFood2)
      // console.log("Finished")
      checkWin();
    }
  }
}

runGameInterval = setInterval(gameLoop, 1000);
