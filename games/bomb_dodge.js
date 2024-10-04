
/* 
@title: bomb_dodge
@author: AstralTurtle
@tags: ['puzzle']
@addedOn: 2023-12-10
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/
let score = 0;
const sounds = [
  tune`
500,
500: C5~500,
15000`  ,
  tune`
500,
500: G5/500,
15000`
]

const levels = [
  map`
........
...b....
...p....
........
........
........`
]
let playback;
const player = "p"
const bomb = "b";
const explosion = "e";
var gameRunning = true;
let nextTime = 5;
let difficulty = 2.0;
let soundID = 0;


setLegend(
  [ player, bitmap`
................
................
....6666666.....
...666666666....
..66666666666...
..66266662666...
..66666666666...
..66666666666...
..66666666666...
..66222222666...
..66666666666...
...666666666....
....6666666.....
.....6...6......
....66..66......
................` ],
  [bomb, bitmap`
.........3......
........33......
.....003300.....
...0000300000...
...0000000000...
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
...0000000000...
.....000000.....
................
................`],
  [explosion,bitmap`
....33333333....
...3333333333...
..339999999333..
.33999999999333.
3399966666999333
3399666666699333
3399666666699333
3399666666699333
3399666666699333
3399666666699333
3399966666999333
3339999999993333
.33399999993333.
..333333333333..
...3333333333...
....33333333....`]
)

setSolids([player,bomb,explosion])






setPushables({
  [ player ]: [bomb]
})

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

onInput("i", () => {
  if (!gameRunning){
    clearText();
    gameLoop = startGame();
    gameRunning = true;
  }
} 
  )

function explode(){
  getAll(bomb).forEach((bom) => {
    for (let i = 0; i < width(); i++){
      addSprite(i,bom.y,explosion)
    };
    for (let i = 0; i < height(); i++){
      addSprite(bom.x,i,explosion)
    };
    clearTile(bom.x,bom.y);
  })
  checkDeath();
}
function checkDeath(){
  let currentPlayer = getFirst(player);
  getAll(explosion).forEach((exp) => {
    if(currentPlayer.x == exp.x && currentPlayer.y == exp.y){
      clearTile(currentPlayer.x,currentPlayer.y);
       clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    }
  })
}

function spawnBombs(){
  let numBombs = Math.ceil(Math.random() * difficulty);
  for (let i = 0; i < numBombs; i++){
  let spawnX = Math.floor(Math.random() * width());
  let spawnY = Math.floor(Math.random() * height());
  addSprite(spawnX, spawnY, bomb);}
}

function clearExplosion(){
  getAll(explosion).forEach((exp) => {
    clearTile(exp.x,exp.y)
  } )
}

var gameLoop = startGame();


function startGame(){
  score = 0;
  difficulty = 2.0;
  nextTime = 5;
  soundID = 0;
  setMap(levels[0])
  return setInterval(() => {
  clearExplosion();
  nextTime--;
  //   addText("" + difficulty,{
  //   x: 0,
  //   y: height(),
  //   color: color`5` 
  // })
  addText("Explode in: " + Math.ceil(nextTime),{
      x: 0,
      y: 0,
      color: color`H`
    })
  addText("Score: " + score,{
      x: 0,
      y: 15,
      color: color`4`
    })

  if (nextTime <= 0){
    explode();
    difficulty += (width() / 100);
    spawnBombs();
    nextTime = 7 - difficulty;
    soundID = 1;
    score++;
  }
  if (playback != null){
  playback.end();
  }
  playback = playTune(sounds[soundID]);
  soundID = 0;
  
    
},1000)
}

                    