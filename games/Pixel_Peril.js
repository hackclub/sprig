/*
@title: Pixel Peril
@author: Outdatedcandy92
@tags: []
@addedOn: 2024-07-08
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const wall = "r"
const enemy = "w"
const reward = "x"
const pushwall = "q"
const spike = "s"
const bgbg = "b"

const bgmusic = tune`
188.67924528301887: C4~188.67924528301887,
188.67924528301887: C4~188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4~188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4~188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4~188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4~188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4~188.67924528301887,
188.67924528301887: C4-188.67924528301887,
188.67924528301887: C4-188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4-188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4-188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4-188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4-188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: D4^188.67924528301887,
188.67924528301887: C4~188.67924528301887`
const victory = tune`
125.52301255230125: E4~125.52301255230125 + B4/125.52301255230125,
125.52301255230125: E4~125.52301255230125 + C5-125.52301255230125,
125.52301255230125: F4^125.52301255230125 + C5-125.52301255230125,
125.52301255230125: F4^125.52301255230125 + B4/125.52301255230125,
3514.644351464435`
const sad = tune`
184.04907975460122: A4/184.04907975460122,
184.04907975460122: A4/184.04907975460122,
184.04907975460122: A4/184.04907975460122,
184.04907975460122: D4/184.04907975460122,
184.04907975460122: D4/184.04907975460122,
184.04907975460122: D4/184.04907975460122,
184.04907975460122: D4/184.04907975460122,
184.04907975460122: D4/184.04907975460122,
184.04907975460122: D4/184.04907975460122,
4233.128834355828`


setLegend(
  [player, bitmap`
.......000000000
.....00111111110
....011222222220
...0122000000020
...0120000000020
...0120770770020
...012070070020.
....0120000020..
.....012222220..
......07777770..
......077777700.
......012001220.
......012001220.
......0120011200
......0120001220
......0000000000`],
  [enemy, bitmap`
.......000000000
.....00111111110
....011LLLLLLLL0
...01LL0000000L0
...01L00000000L0
...01L03303300L0
...01L0300300L0.
....01L00000L0..
.....01LLLLLL0..
......03333330..
......033333300.
......01L001LL0.
......01L001LL0.
......01L0011L00
......01L0001LL0
......0000000000`],
  [wall, bitmap`
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
  [reward, bitmap `
....00000000....
...0666666660...
..066FFFFFF660..
.066F666666F660.
066F66FFFF66F660
06F666F666666F60
06F666F666666F60
06F666FFFF666F60
06F666666F666F60
06F666666F666F60
06F666FFFF666F60
066F66666666F660
.066F666666F660.
..066FFFFFF660..
...0666666660...
....00000000....`],
  [pushwall, bitmap`
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
  [spike, bitmap `
................
................
................
............6...
.........00696..
........0069996.
.......00..696..
.......0....6...
.....000000.....
....00LLLL00....
....0LLL11L0....
....0LLLL1L0....
....0LLLLLL0....
....0LLLLLL0....
....00LLLL00....
.....000000.....`],
  [bgbg, bitmap `
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
0000000000000000`]
)
const levels = [
  map `
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
r..r.......rr..r..w.xr
r..r......rr...r.....r
r..rrr.........r.....r
r..............rrrr..r
r....rrr.rr.......r..r
r...r......r.....rr..r
r.rr.......r....rr...r
rrr........r.....r...r
rr.........r.....r...r
rr......rrrr.....rr..r
rr.....rr....r...r...r
r.r......rr...r..r...r
r.........r...r..r...r
r.......rrrr.....r...r
r.....rr...r....rr...r
r....rr.......rrr....r
rr..r........r.....rrr
r...r...rrrrrr.....rrr
r...r...........r....r
rp.rr...........r....r
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
rw....r............rrr
r....rrr....r.....rr.r
r...rrrrrrr.r...rrr..r
r...r.......r........r
r...........r........r
rrrrr......rrrrrrrr..r
r..rr....rrr......r..r
r..r....r.......r.r..r
r..r....r.....rrrr...r
r.......r...r...r....r
r....rr.r.p.r...r....r
r.......rrrrr.r.r....r
r.r....r..xr..r..r...r
r.rrr..r...r..r......r
r.rrr..r...rr........r
r..rr..r.r...r....r..r
r......rrrr..r...rrrrr
r........r...rr...r..r
r...r....r....rr..r..r
r..rrr.........rr....r
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
r...rrrrrrrrrrrr....pr
r.....r..rr.......rrrr
r..r..............rrxr
r.rr......rrrr...rrr.r
r..r..rrrr...rrrrrrr.r
r.....r......r......rr
rr....rrr..........rrr
rr......rr..rrrrrrrr.r
rr...r..r..r...r.....r
r....rr.rr.rr.......rr
rr......rr.r..rr....rr
rrr.....r..r...rrrr.rr
r.rr....r.rrr..r.....r
r.r..r..r......r....rr
r....r..rr...rr....rrr
rr..rrrr.r..r.......rr
rr.......rrr.........r
rr...................r
rrr..r........rrrr.r.r
rrr..rrr..rrrrrrrrrrwr
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
rx..rr...rrrrrrr.....r
r.....r..r...........r
r..r...............r.r
r.rr......rrr......r.r
r..r..rrrr...rrr.....r
r.r.rrr......r......rr
rr....r........s...rrr
rr.......rrrrrr.rrrr.r
r....rr.r......r.....r
r......r....r.......rr
rr......rr.r..rr....rr
rr.....r..p....rrr..rr
r..r..r...rrr..r.....r
r....rr.rr.....r.....r
r.....r......r......rr
rr.....r.r..r........r
rw.r.....rr..........r
rrrrr..s.............r
rr.r.r........rr.....r
rr...rr...r.rrrr..r..r
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
r......rrrrrr..r...r.r
r....rr..rr....r...r.r
r..r.r.........r.rrrrr
rrrr.......r...r...r.r
r..r....rrrr...rr....r
r..........r.s.......r
r..r..r...........r..r
rrrr.....r..r.rrrrr..r
r.rr.......r...r.....r
r.rr.r..r.srr.....s.rr
r.....rrr..r..rr....rr
rrr......r.....rrrr.rr
r.rr......rrr..r.....r
r....s.......r.r....rr
r............rr....rrr
r.......r...r..r....rr
rr.....rrrrr......r..r
rr....r......s....r..r
r....r....r...rrrrrr.r
rp....rxwrr..........r
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
rrrrrr..rrrx...r.....r
rr......r.r..........r
rr..rrr....r....rrr..r
rr....qq...rrrrr.....r
rrrr...q......r......r
rr............r....s.r
r....rrrrrr....r.....r
r....r....r.....rr...r
r...rr....r......r...r
r...r.....rrrrr..r...r
r...r...r.r...r..r..rr
r..sr...r....pr..r..rr
rr..q...rrrrrrr..r...r
rrr.r.......r...rr...r
rr..r.s.....r...r...rr
rr..r....s..rr.rr..srr
rr..r........r.r....rr
rr...rrrr....r...qq.rr
r.........rrrrrrrqrrrr
r............q......wr
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
r..r.......r......rrrr
r.rrr......qr.x..rrrrr
rs......r...r........r
r..r.rr..r..r..rr....r
r...rr...rr.rrrrr....r
rrr.r.....r.....r....r
r...r..s.rr.....rqrr.r
rr.rrrr..r....rrr....r
rr..r...rr.r..r.r.s..r
rr..r...r..r..r.r....r
r..rr..r...rrqr.r.rrrr
r....q.r........r.r.rr
r.s..q.r..r.r.s.r.r..r
r....r.r..rrr...r....r
r....r.r........r..r.r
r...r..rrrrrrrr.r..r.r
r...r.r.......r.r.rr.r
r..rr.r.........rrr..r
r..r..r..rrrrrrr.....r
rp.r..r.............wr
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrr...r
rr...s...........r...r
rr.rrrqq....rrrr...q.r
rr.....qrr.....r..s.rr
rr......rr..rrrrrr..rr
rr..r...r...r.......rr
rw..r.......r..r..rrrr
r.r.rrrrrrrrr..r.rrrrr
r.r.r.........rrrrrrrr
r.r.rr....rrrrr.rrrrrr
r.rq...q..q.....rrrrrr
rsr.rr.q..q.........rr
r...r..r..r.rrrr.....r
r...rr.r..r....r.....r
r...rr.r.......r...rrr
r..rrrrrr...rrrrrr.r.r
r....r..rrrr...r...r.r
rr......rp.....r...r.r
rrrr..s.rrr....r..r..r
rrrrr.....xr.......r.r
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
rx..r....r..r.......wr
r.....s..q..rrr......r
r....r.......s.......r
r.r....rr.....rr.....r
r.r....r...qr.rrqrrrsr
r.r...qrq..r..r..rr..r
rs..rq...s...q.......r
rrr..q.......r.r...q.r
rrr......r.r...r.r...r
rr....s........r.r...r
rr..q...r....r.r..rr.r
r..qr.....rr...r...r.r
r..qr.r..qr..rr...r..r
r....r....q....rr.r..r
r...rr..........r.r..r
r....r...s...r..r.r..r
r.r.s....r..rr.......r
r.r.....rrrrr....rq..r
r.rrrrrrr..rrrr......r
rwrr.........rr.....pr
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
......................
......................
......................
......................
rrrrrrrrrrrrrrrrrrrrrr
rx.r..r.w..r...r...rpr
r.r...r..r.r.r.r.r.r.r
r.r.r.r..r.q.r.r.r.r.r
r.r.r.r..r.r.r.r.r.r.r
r...r.r..r.r.r.r.r.r.r
rrrr..r..r.r.r.r.r.r.r
rr.rr.r..r.r.r.r.q.r.r
rr..q.r..r.r.r.r.r.r.r
rr.r.sr..r.r.r.r.r.r.r
rr.r..r..r.r.r.q.r.r.r
rr.r..r..r.r.r.q.r.r.r
rr.r..r..r.r.r.r.r.r.r
rr.r..r..r.r.q.r.r.r.r
rr.rrrq..r.r.r.r.r.r.r
rr....r..r.r.r.r.r.r.r
rr....r..r.r.r.r.r.r.r
rr....r..r.r.r.r.r.r.r
rr.......r.r.r.r.r.r.r
rr.......r.r.r.r.r.r.r
rrrrrr...r...r...r...r
rrrrrrrrrrrrrrrrrrrrrr`,
  map`
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................`,
  



]
setBackground(bgbg)


setPushables({
  [player]: [pushwall]
})

setSolids([player, wall,pushwall ])

onInput("w", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) {
    playerSprite.y -= 1; // Move up if the player sprite exists
  }
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) {
    playerSprite.x -= 1; // Move left if the player sprite exists
  }
});

onInput("s", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) {
    playerSprite.y += 1; // Move down if the player sprite exists
  }
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  if (playerSprite) {
    playerSprite.x += 1; // Move right if the player sprite exists
  }
});

onInput("l", () => {
  playerWin = true
})
onInput("j", () => {
  setMap(levels[0]);
  gameOver = false;
  playerWin = false; 
  levelstat = 0;
  clearText();
})

onInput("k", () => {
  toggleBackgroundMusic(); // Toggle background music on key press
});

let moveInterval = 500;


let playback; // Declare playback variable globally

function toggleBackgroundMusic() {
  if (playback && !playback.ended) {
    playback.end(); // Stop the music if it's playing
    playback = null;
  } else {
    playback = playTune(bgmusic, Infinity); // Start playing the background music indefinitely
  }
}



function gameStart() {
  setMap(levels[10])
  addText("Pixel Peril", { x: 5, y: 5, color: color`4` });
  addText("J to start", { x: 6, y: 8, color: color`4` });
  addText("L to skip levels", { x: 3, y: 10, color: color`4` });
  addText("K to toggle music", { x: 2, y: 12, color: color`4` });
}

gameStart()

let lastMoveTime = performance.now(); // Initialize lastMoveTime

function moveEnemy() {
  const currentTime = performance.now();

  if (currentTime - lastMoveTime >= moveInterval) {
    lastMoveTime = currentTime;

    const playerSprite = getFirst(player);
    const enemySprite = getFirst(enemy);

    if (playerSprite && enemySprite) {
      if (playerSprite.x > enemySprite.x) {
        enemySprite.x += 1; // Move enemy right
      } else if (playerSprite.x < enemySprite.x) {
        enemySprite.x -= 1; // Move enemy left
      }

      if (playerSprite.y > enemySprite.y) {
        enemySprite.y += 1; // Move enemy down
      } else if (playerSprite.y < enemySprite.y) {
        enemySprite.y -= 1; // Move the enemy up
      }
    }
  }
}

setInterval(moveEnemy, moveInterval);

function checkCollision(sprite1, sprite2) {
  return sprite1.x === sprite2.x && sprite1.y === sprite2.y;
}

let gameOver = false;

let levelstat = 0
let enemyMovementInterval = setInterval(moveEnemy, moveInterval);
let playerWin = false;

function checkWinCondition() {
  const playerSprite = getFirst(player);
  const rewardSprite = getFirst(reward);

  if (playerSprite && rewardSprite && checkCollision(playerSprite, rewardSprite)) {
    playerWin = true; // Set playerWin flag to true if player reaches reward
  }
}


function checkGameStatus() {
  const playerSprite = getFirst(player);
  const enemySprite = getFirst(enemy);

  if (playerSprite && enemySprite && checkCollision(playerSprite, enemySprite)) {
    gameOver = true;
    clearInterval(enemyMovementInterval);
    console.log("Game Over! Enemy touched the player.");
    clearTile(enemySprite.x, enemySprite.y);
    clearTile(playerSprite.x, playerSprite.y);
    addText("Game Over", { x: 5, y: 5, color: color`3` });
    addText("Press J to restart", { x: 1, y: 7, color: color`3` });
    playTune(sad);
  }

  
  const spikeSprites = getAll(spike);
  for (const spikeSprite of spikeSprites) {
    if (playerSprite && checkCollision(playerSprite, spikeSprite)) {
      gameOver = true;
      clearInterval(enemyMovementInterval);
      console.log("Game Over! Spike touched the player.");
      clearTile(spikeSprite.x, spikeSprite.y);
      clearTile(playerSprite.x, playerSprite.y);
      addText("Game Over", { x: 5, y: 5, color: color`3` });
      addText("Press J to restart", { x: 1, y: 7, color: color`3` });
      playTune(sad);
      break; // Exit the loop when a collision is detected
    }
  


}

  if (playerWin) {
    playerWin = false; // Reset playerWin flag for the next level
    gameOver = true;
    clearInterval(enemyMovementInterval);
    console.log("You Win! Player reached the reward.");
    clearTile(enemySprite.x, enemySprite.y);
    addText("You Win!", { x: 6, y: 6, color: color`3` });
    playTune(victory);
    levelstat +=1
    let countdown =5;
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        clearText();
        addText("You Win!", { x: 6, y: 6, color: color`3` });
        addText(`Next level in ${countdown}`, { x: 3, y: 8, color: color`3` });
      } else {
        clearInterval(countdownInterval); // Stop the countdown interval
        }
      }, 1000);
    if (levelstat < 9) {
      
        setTimeout(() => {
          setMap(levels[levelstat]); 
          gameOver = false;
          playerWin = false;
          clearText();
          }, 5000); 
    }
    if (levelstat >= 9) {
      clearText();
      addText("Congratulation", { x: 6, y: 6, color: color`6` });
      addText("You Won The Game", { x: 6, y: 15, color: color`6` });
      
    }


  }
}



setInterval(() => {
  if (!gameOver) {
    addText(`Level ${levelstat + 1}`, { x: 1, y: 1, color: color`3` });

    checkGameStatus();
    checkWinCondition(); // Check for win condition
  }
}, 100);
