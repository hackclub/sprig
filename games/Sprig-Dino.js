/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dino
@description: A Version of the No Internet Dino game - now on the sprig!
@author: NiDo
@tags: []
@addedOn: 2026-05-07
*/

const player = "p"
const cactus = "c"
const meteor = "m"

setLegend(
  [ player, bitmap`
................
.......LLLLLLL..
......LLLLLLLL..
......LLLLLLLLL.
......LLLLLLL.LL
.L....LLLLLLLLLL
.LL...LLLLLLLLLL
.LLLLLLLLLLLLL..
.LLLLLLLLLLLLL..
.LLLLLLLLLLLLL..
..LLLLLLLLLLL...
...LLLLLLLL.....
....LLL.LLL.....
....LLL.LLL.....
....LLL.LLL.....
....LLL.LLL.....` ],
  [cactus, bitmap`
.......000......
.......000......
.......000......
.......000..00..
.......000..00..
..00...000..00..
..00...0000000..
..00...0000000..
..00...000......
..00000000......
..00000000......
.......000......
.......000......
.......000......
.......000......
.......000......`],
  [meteor, bitmap`
................
................
................
....666666.6666.
..66699996666666
.669999999666666
6699999999966666
6699999999996666
66999999999966..
6699999999996...
6669999999666...
66666666666.....
.6666666666.....
................
................
................`]
)

setSolids([ cactus, meteor ])

const move_music = tune`
229.00763358778627: C4/229.00763358778627 + A4^229.00763358778627 + F4~229.00763358778627,
7099.236641221374`;

const death_music = tune`
240: E4/240 + A4~240 + B5-240,
240: D4/240 + A4~240 + G5-240,
240: C4/240 + A4~240 + D5-240,
240: C5-240,
240: A4-240 + C4/240 + C5~240,
240: F4-240,
240: F4-240 + C4/240,
6000`;

const background_music = tune`
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + E5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + D5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + D4^272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + B5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + A5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + G5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + D4^272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + D5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + C5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + D4^272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + B5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + A5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + G5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + D4^272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + C5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + B4/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + B5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + D4^272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + A5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + A5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + E5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + D4^272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + F5/272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + E5/272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + C5-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + D4^272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + B4-272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + B5-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + A5-272.72727272727275,
272.72727272727275: C4/272.72727272727275 + D4^272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + F5-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + C5-272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + B4-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + D4^272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + B5-272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + A5-272.72727272727275 + C5-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + A4-272.72727272727275 + G5-272.72727272727275 + B4-272.72727272727275,
272.72727272727275: C4/272.72727272727275 + D4^272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + B5-272.72727272727275,
272.72727272727275: C4~272.72727272727275 + F5~272.72727272727275 + F4-272.72727272727275 + A5-272.72727272727275 + G5-272.72727272727275,
272.72727272727275: C4/272.72727272727275 + G5~272.72727272727275 + G4-272.72727272727275 + D5-272.72727272727275`;

const level =
  map`
.......
.......
....m..
.p....c`

setMap(level)

setPushables({
  [ player ]: []
})

var running = true;

var time = 0;
var timertime = 500;
var score = 0;
var bestscore = 0;
var background_player = playTune(background_music, Infinity);

function resetGame() {
  clearText();
  
  time = 0;
  timertime = 500;
  score = 0;
  background_player = playTune(background_music, Infinity);
  setMap(level);

  gameLoop = setInterval(() => {
    doGameLoop();
  }, timertime);
  
  running = true;
}

function gameOver() {
  background_player.end()
  
  playTune(death_music);
  
  if(score > bestscore) bestscore = score;
  
  clearText();
  
  addText("You have Lost!", { 
    x: 1,
    y: 4,
    color: color`3`
  })
  addText(`Score: ${Math.ceil(score)}`, { 
    x: 1,
    y: 5,
    color: color`3`
  })

  addText(`Best Score: ${Math.ceil(bestscore)}`, { 
    x: 1,
    y: 6,
    color: color`3`
  })

  addText(`Press J to restart`, { 
    x: 1,
    y: 7,
    color: color`3`
  })
}

function checkCollisions() {
  let cactii = getAll(cactus);
  let meteors = getAll(meteor);
  let p = getFirst(player);
  
  for(let i = 0; i < cactii.length; i++) {
    if(cactii[i].x == p.x && cactii[i].y == p.y) {
      running = false;
      clearInterval(gameLoop);
    }
  }

  for(let i = 0; i < meteors.length; i++) {  
    if(meteors[i].x == p.x && meteors[i].y == p.y) {
      running = false;
      clearInterval(gameLoop);
    }
  }

  if(!running) {
    gameOver();
    return true;
  }
  return false;
}

function isClear(x) {
  return getAll(cactus).every(c => c.x !== x) &&
         getAll(meteor).every(m => m.x !== x);
}

function doGameLoop() {
  let cactii = getAll(cactus);
  let meteors = getAll(meteor);
  let p = getFirst(player);
  let locs = [];
  
  for(let i = 0; i < cactii.length; i++) {
    if(cactii[i].x == 0) {
      cactii[i].remove();
      continue;
    }
    cactii[i].x -= 1;

    locs.push(cactii[i].x);
  }

  for(let i = 0; i < meteors.length; i++) {
    if(meteors[i].x == 0) {
      meteors[i].remove();
      continue;
    }
    meteors[i].x -= 1;
    
    locs.push(meteors[i].x);
  }

  if(checkCollisions()) return;
  
  if(isClear(5) && isClear(6)) {
    let r = Math.floor(Math.random() * 8);
    if(r < 2) {
      addSprite(6, 3, cactus);
    } else if(r > 6) {
      addSprite(6, 2, meteor);
    }
  }

  if(locs.length < 2 && isClear(5) && isClear(6)) {
    let r = Math.floor(Math.random() * 2);
    if(r == 0) {
      addSprite(6, 3, cactus);
    } else {
      addSprite(6, 2, meteor);
    }
  }

  time++;
  if(time > 15 && timertime > 125) {
    clearInterval(gameLoop);
    timertime -= 25;

    gameLoop = setInterval(() => {
      doGameLoop();
    }, timertime);

    time = 0;
  }
}

onInput("w", () => {
  if(!running) return;
  getFirst(player).y = 2;
  playTune(move_music);
})

onInput("s", () => {
  if(!running) return;
  getFirst(player).y = 3;
  playTune(move_music);
})

onInput("j", () => {
  if(running) return;
  resetGame();
})

afterInput(() => {
  checkCollisions();
})

var gameLoop = setInterval(() => {
  doGameLoop();
}, timertime);

var scoreloop = setInterval(() => {
  if(running) {
    score += 2 * (1000/timertime)
    clearText();
    addText(`${Math.ceil(score)}`, { 
      x: 15, 
      y: 3, 
      color: color`4`
    });
  }
}, 100);