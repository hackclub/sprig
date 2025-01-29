/*
@title: orbit_blaster
@author: blackpolygon
@tags: ['action']
@addedOn: 2024-04-08
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const obstacle = "o"
const shoot = "s"
let health = 10
let score = 0
let GAMESTARTED = false
let FIRSTSTART = false
let isnormaldifficulty = true
let isnormaldifficultyint = 1
const hit = tune`
55.14705882352941,
55.14705882352941: C4/55.14705882352941 + D4/55.14705882352941 + E4/55.14705882352941,
55.14705882352941: E4/55.14705882352941 + D4/55.14705882352941 + C4/55.14705882352941,
55.14705882352941: A4/55.14705882352941,
55.14705882352941: A4/55.14705882352941,
55.14705882352941: E4/55.14705882352941 + D4/55.14705882352941 + C4/55.14705882352941,
55.14705882352941: C4/55.14705882352941 + D4/55.14705882352941 + E4/55.14705882352941,
55.14705882352941: A4/55.14705882352941,
55.14705882352941: A4/55.14705882352941,
55.14705882352941: E4/55.14705882352941 + D4/55.14705882352941 + C4/55.14705882352941,
55.14705882352941: E4/55.14705882352941 + D4/55.14705882352941 + C4/55.14705882352941,
55.14705882352941: A4/55.14705882352941,
55.14705882352941: A4/55.14705882352941,
55.14705882352941: E4/55.14705882352941 + D4/55.14705882352941 + C4/55.14705882352941,
55.14705882352941: C4/55.14705882352941 + E4/55.14705882352941 + D4/55.14705882352941,
937.5`
const shootsound = tune`
37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: G4~37.5 + B4~37.5 + A4~37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: B4~37.5 + A4~37.5 + G4~37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: G4^37.5 + A4^37.5 + B4^37.5,
37.5: B4^37.5 + A4^37.5 + G4^37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: B4~37.5 + A4~37.5 + G4~37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5,
37.5: B4~37.5 + G4~37.5 + A4~37.5,
675`
const damagesound = tune`
37.5,
37.5: B5-37.5,
37.5: A5-37.5 + B5~37.5,
37.5: G5-37.5 + A5~37.5 + B5^37.5,
37.5: F5-37.5 + G5~37.5 + A5^37.5 + B5^37.5,
37.5: E5-37.5 + F5~37.5 + G5^37.5 + A5^37.5,
37.5: D5-37.5 + E5~37.5 + F5^37.5 + G5^37.5,
37.5: C5-37.5 + D5~37.5 + E5^37.5 + F5^37.5,
37.5: B4-37.5 + C5~37.5 + D5^37.5 + E5^37.5,
37.5: A4-37.5 + B4~37.5 + C5^37.5 + D5^37.5,
37.5: G4-37.5 + A4~37.5 + B4^37.5 + C5^37.5,
37.5: F4-37.5 + G4~37.5 + A4^37.5 + B4^37.5,
37.5: E4-37.5 + F4~37.5 + G4^37.5 + A4^37.5,
37.5: D4-37.5 + E4~37.5 + F4^37.5 + G4^37.5,
37.5: C4-37.5 + D4~37.5 + E4^37.5 + F4^37.5,
37.5: C4~37.5 + D4^37.5 + E4^37.5,
600`
setLegend(
  [player, bitmap`
..000000........
..0.....0.......
0.0......0......
900.......0.....
0.0444444440....
..0.........0...
000.........000.
0003333333333330
0003333333333330
..0.........000.
..0.........0...
0.0444444440....
900.......0.....
0.0......0......
..0.....0.......
..000000........`],
  [obstacle, bitmap`
................
................
................
......0.........
......0.0044....
.....000444.....
.....0044..0....
....04440000....
...4444400......
...4.0.000......
..44.000........
.....0..........
................
................
................
................`],
  [shoot, bitmap`
................
................
................
................
..00000000000...
..9...99999990..
999999999999990.
.9996666.6663300
.333333366336600
.99633333333330.
99.96666666660..
..00000000000...
................
................
................
................`]
)

setSolids([player])

let level = 0
const levels = [
  map`
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................`
]


setPushables({
  [player]: []
})
setInterval(startMenu, 50);
setMap(levels[0])

function refreshStartMenuText() {
  if (GAMESTARTED == false) {
    clearText()

    addText("Orbit Blaster", {
      x: 5,
      y: 4,
      color: color`3`
    })
    if (isnormaldifficulty) {
      addText("> Play Normal", {
        x: 5,
        y: 8,
        color: color`7`
      })
      addText("Play Hard", {
        x: 5,
        y: 10,
        color: color`L`
      })
    } else {
      addText("Play Normal", {
        x: 5,
        y: 8,
        color: color`L`
      })
      addText("> Play Hard", {
        x: 5,
        y: 10,
        color: color`7`
      })
    }
    onInput("w", () => {
      isnormaldifficulty = true
    })
    onInput("s", () => {
      isnormaldifficulty = false
    })
    addText("k to shoot/ok", {
      x: 5,
      y: 12,
      color: color`1`
    })
  }

}

function clearLevel(spriteType) {
  const sprites = getAll(spriteType); // Get all sprites of the specified type
  
  // Iterate over each sprite and remove it from the grid
  for (const sprite of sprites) {
    clearTile(sprite.x, sprite.y);
  }
}
function restartGame() {
  // Reset variables
  health = 10;
  score = 0;
  GAMESTARTED = false;
  FIRSTSTART = false;
  
  // Clear the game grid
  clearText();

  clearLevel(obstacle)
  clearLevel(player)
  clearLevel(shoot)

  
  // Stop ongoing intervals
  clearInterval(startMenuInterval);
  clearInterval(moveBulletsInterval);
  clearInterval(checkForObstacleInterval);
  clearInterval(moveObstacleInterval);
  clearInterval(spawnObstacleInterval);
  
  // Restart the start menu
  //startMenuInterval = setInterval(refreshStartMenuText, 50);
}

function startMenu() {
   if (health < 0) {
    addText("you died", {
      x: 11,
      y: 8,
      color: color`3`
    });
    restartGame(); // Call restartGame when the player dies
    return;
  }
  if (isnormaldifficulty) {
    isnormaldifficultyint = 1
  } else {
    
    isnormaldifficultyint = 2.2
  }
  if (GAMESTARTED) {
    if (FIRSTSTART == false) {
      startGame()
    }
    return
  } else {
    setInterval(refreshStartMenuText, 50);
  }
  onInput("k", () => {
    GAMESTARTED = true
  })
  return
}

let startMenuInterval;
let moveBulletsInterval;
let checkForObstacleInterval;
let moveObstacleInterval;


function startGame() {
  // console.log('srart game working ')
  FIRSTSTART = true
  if (GAMESTARTED) {
    // console.log('srart game  ')
    clearText()
    addSprite(1, 8, player);
    moveBulletsInterval = setInterval(moveBullets, 50);
    checkForObstacleInterval = setInterval(checkForObstacle, 50);
    moveObstacleInterval = setInterval(moveObstacle, 1000 / isnormaldifficultyint);
    spawnObstacleInterval = setInterval(spawnObstacle, 1200 / isnormaldifficultyint);
    
    addText((health / 2).toString(), { x: 1, y: 1, color: color`3` })
    addText(score.toString(), { x: 3, y: 1, color: color`F` });

    onInput("w", () => {
      getFirst(player).y -= 1
    })
    onInput("s", () => {
      getFirst(player).y += 1
    })
    onInput("a", () => {
      getFirst(player).x -= 1
    })
    onInput("d", () => {
      getFirst(player).x += 1
    })
    onInput("k", () => {
      addSprite(getFirst(player).x + 1, getFirst(player).y, shoot)
      playTune(shootsound)
    })
  }
  return
}


function refreshText() {
  clearText();
  addText((health / 2).toString(), { x: 1, y: 1, color: color`3` });
  addText((score / 2).toString(), { x: 3, y: 1, color: color`F` });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function spawnObstacle() {
  addSprite(getRandomInt(20, 21), getRandomInt(0, 16), obstacle)
}

function moveBullets() {
  const bullets = getAll(shoot);

  for (const pop of tilesWith(obstacle, shoot)) {
    for (const pop1 of pop) {

      clearTile(pop1.x, pop1.y)
      playTune(hit)
      score++;

      refreshText();
    }
  }

  for (const bullet of bullets) {
    bullet.x += 1;
    if (bullet.x == 19) {
      clearTile(bullet.x, bullet.y)
      
    }
  }
}


function moveObstacle() {
  const Obstacles = getAll(obstacle);


  for (const Obstacle of Obstacles) {
    Obstacle.x -= 1;
    if (Obstacle.x == 0) {
      clearTile(Obstacle.x, Obstacle.y);
    }
  }
  if (getFirst(player) === undefined) {
    addSprite(1, 1, player);
  }
  for (const obj of getAll(obstacle)) {

    if (obj.x < 2) {
      health--;
      score--;
      playTune(damagesound)
      health--;
      score--;
      clearTile(obj.x, obj.y)
      refreshText();
    }


  }
}


function checkForObstacle() {

  for (const pop of tilesWith(obstacle, player)) {
    for (const pop1 of pop) {
      health--;
      clearTile(pop1.x, pop1.y);
      addSprite(pop1.x, pop1.y, player);
      refreshText();

    }
  }


}


// add sounds


