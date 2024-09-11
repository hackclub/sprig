/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: JB_Dodgy_Meteor_Game
@author: JbBurnsWasHere
@tags: ["dodge"]
@addedOn: 2024-09-03
*/

const player = "p";
const meteor = "m";
const bg = "b";
setLegend(
  [meteor, bitmap`
................
.......3........
.......3........
......333.......
......393.......
......3933......
.....39993......
.....39693......
.....39693......
.....366693.....
.....366663.....
.....3666CC.....
.....CCCCCCC....
.....00CC00C....
.....C0CC00C....
.....CCCCCCC....`],
    [bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [player, bitmap`
................
......6666......
.....606606.....
.....666666.....
.....600006.....
......6666......
.......55.......
......5555......
.....555555.....
...5555555555...
.....555555.....
.....555555.....
......5555......
......5..5......
......5..5......
......5..5......`]
   
);
 
setMap(map`
........
........
........
........
........
........
........
...p....`)
 
var gameRunning = true;
var secondsElapsed = 0;
  setBackground(bg);
// Update the elapsed time every second
var gameLoop = setInterval(() => {
  if (gameRunning) {
    secondsElapsed++;
  }
  despawnmeteors();
  movemeteors();
  spawnmeteor();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText(`Game Over! 
    Score = ${secondsElapsed}s`, {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
}, 1000); // Update every second

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});
 
function spawnmeteor() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, meteor);
}
 
function movemeteors() {
  let meteors = getAll(meteor);
  
  for (let i = 0; i < meteors.length; i++) {
    meteors[i].y += 1;
  }
}
 
function despawnmeteors() {
  let meteors = getAll(meteor);
 
  for (let i = 0; i < meteors.length; i++) {
    if (meteors[i].y == 7) {
      meteors[i].remove();
    }
  }
}
 
function checkHit() {
  let meteors = getAll(meteor);
  let p = getFirst(player);
  for (let i = 0; i < meteors.length; i++) {
    if (meteors[i].x == p.x && meteors[i].y == p.y) {
      return true;
    }
  }
  return false;
}

