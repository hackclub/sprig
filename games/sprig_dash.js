/*
@title: Sprig Dash
@author: akshatk-khurana
@tags: []
@addedOn: 2024-08-05
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const bg = "b";
const enemy = "e";
const bird = "i";

setLegend(
  [player, bitmap`
6666666666666666
6666666666666666
6666666666666666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFF9999FFF666
666FFF9999FFF666
666FFF9999FFF666
666FFF9999FFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
6666666666666666
6666666666666666
6666666666666666`],
  [bg, bitmap`
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
  [enemy, bitmap `
................
................
................
................
................
................
................
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555`],
  [bird, bitmap `
333..........333
.333........333.
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
.......33.......
................
................
................
................
................
................
................
................`]
)

setBackground(bg)

setSolids([player])

let level = 0
const levels = [
  map `
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
....p...e....e....e......`
]

setMap(levels[level])

setPushables({
  [player]: [player]
})

const jumpHeight = 3;
const moveSpeed = 1;
let gameRunning = false;
let score = 0;
let coolDown = false;

displayScore();
setTimeout(() => {
  gameRunning = true;
}, 3000);

onInput("j", () => {
  if (!coolDown && gameRunning) {
    getFirst(player).y -= jumpHeight
    coolDown = true;
  }
})

afterInput(() => {
  setTimeout(() => {
    if (gameRunning) {
      getFirst(player).y += jumpHeight
      coolDown = false;
    }
  }, 300);
})


setInterval(() => {
  if (gameRunning) {
    generateEnemy();
  }
}, 1500)

setInterval(() => {
  if (score >= 5) {
      generateEnemyBird();
  }
}, 2000)

setInterval(() => {
  if (gameRunning) {
    moveEnemies();
  }
}, 150);

setInterval(() => {
  if (gameRunning) {
    checkOffScreen();
  }
}, 10)

setInterval(() => {
  if (gameRunning) {
    checkCollision();
  }
}, 10)

function checkOffScreen() {
  const enemies = getAll(enemy);
  const birds = getAll(bird);
  enemies.forEach(e => {
    if (e.x == 0) {
      score++;
      e.remove()
    }
  });

  birds.forEach(b => {
    if (b.x == 0) {
      score++;
      b.remove()
    }
  });
  displayScore();
}

function moveEnemies() {
  const enemies = getAll(enemy);
  const birds = getAll(bird);
  enemies.forEach(e => {
    e.x -= moveSpeed;
  });

  birds.forEach(b => {
    b.x -= moveSpeed;
  });
}

function deleteEnemies() {
  const enemies = getAll(enemy);
  const birds = getAll(bird);
  
  enemies.forEach(e => {
    e.remove();
  })

  birds.forEach(b => {
    b.remove();
  })
}

function generateEnemy() {
  let amount = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  
  for (let i = 0; i < amount; i++) {
    addSprite(24-i, 8, enemy);
  }
}

function generateEnemyBird() {
    addSprite(24, 6, bird);
}

function checkCollision() {
  const enemies = getAll(enemy);
  const birds = getAll(bird);
  const playerObj = getFirst(player);
  let removed = false;

  enemies.forEach(enemy => {
    if (getTile(enemy.x, enemy.y).length > 1) {
        let a = getTile(enemy.x, enemy.y)[0]['_type']
        let b = getTile(enemy.x, enemy.y)[1]['_type']
      
        if (a == player || b == player){
          playerObj.remove();
          onGameOver();
          removed = true;
          return;
        }
      }
  });

  if (!removed) {
    birds.forEach(bird => {
      if (getTile(bird.x, bird.y).length > 1) {
          let a = getTile(bird.x, bird.y)[0]['_type']
          let b = getTile(bird.x, bird.y)[1]['_type']
        
          if (a == player || b == player){
            playerObj.remove();
            onGameOver();
            return;
          }
        }
    });
  }
}

function onGameOver() {
  gameRunning = false;
  deleteEnemies();
  displayGameOver();
}

function displayScore() {
  clearText();
  addText(`${score}`, {
        x: 1,
        y: 5,
        color: color`2`
  })
}
  
function displayGameOver() {
  clearText()
  addText("Game Over", {
    x: 5,
    y: 6,
    color: color`3`
  })

  addText(`Score: ${score}`, {
    x: 5,
    y: 8,
    color: color`2`
  })
}
