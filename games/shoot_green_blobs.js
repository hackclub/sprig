/*
@title: shoot_green_blobs
@author: otterly-otter
@tags: ['retro']
@addedOn: 2022-09-07

*/

const player = "p";
const box = "b";
const bullet = "u";
const enemyBullet = "e";
const bg = "g"
const star = "t"

setLegend(
  [ player, bitmap`
.......22.......
.......22.......
.......22.......
.......22.......
......2222......
......2002......
.....22LL22.....
.....221122.....
....22222222....
..222222222222..
.12222222222221.
.22222222222222.
2200020000200022
.6...6....6...6.
.6...6....6...6.
................`],
  [ box, bitmap`
..444444444444..
.44444444444444.
4444444444444444
4444455555544444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
.44444444444444.
..444444444444..
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......`],
  [ bullet, bitmap`
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......
.......22.......`],
  [ enemyBullet, bitmap`
.......11.......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
.......11.......`],
  [ star, bitmap`
................
................
....2...........
....2...........
....2...........
....2...........
.2222222........
....2...........
....2...........
....2...........
....2...........
................
................
................
................
................`],
  [ bg, bitmap`
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
);

let level = 0;
const levels = [
  map`
.............
.............
...b.b.b.b...
.............
..b.b.b.b.b..
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
......p......`,
];

const sounds = {
  bgm: tune`
500: c5/500 + e4^500 + f4~500,
500: c4~500,
500: a4/500,
500,
500: d5/500 + e4^500 + g4~500,
500: c4~500,
500: b4/500,
500,
500: c5/500 + e4^500 + f4~500,
500: c4~500,
500: a4/500,
500,
500: e4^500 + g4~500 + e5/500,
500: c4~500,
500: d5/500,
500,
500: e4^500 + f4~500 + c5/500,
500: c4~500,
500: a4/500,
500,
500: e4^500 + g4~500 + b4/500,
500: c4~500,
500: g4/500,
500,
500: e4^500 + a4~500 + e5/500,
500: c4~500,
500: b4/500,
500,
500: e4^500 + g4/500 + f4~500,
500: c4~500,
500: a4/500,
500`,
  fire: tune`
49.3421052631579: a5-49.3421052631579,
49.3421052631579: b5/49.3421052631579,
1480.2631578947369`,
  cannotFire: tune`
49.91680532445923,
49.91680532445923: e5^49.91680532445923 + f5^49.91680532445923,
49.91680532445923: f5^49.91680532445923 + e5^49.91680532445923,
1447.5873544093179`,
  enemyDestroyed: tune`
73.17073170731707: a4/73.17073170731707 + g4-73.17073170731707,
73.17073170731707: g4/73.17073170731707 + f4-73.17073170731707 + a4-73.17073170731707,
73.17073170731707: f4/73.17073170731707 + e4-73.17073170731707 + g4-73.17073170731707,
73.17073170731707: e4/73.17073170731707 + f4-73.17073170731707,
2048.7804878048782`,
  enemyFire: tune`
37.688442211055275: d4-37.688442211055275 + e4^37.688442211055275,
37.688442211055275: e4-37.688442211055275 + f4^37.688442211055275,
1130.6532663316582`,
  playerDestroyed: tune`
53.763440860215056: b5/53.763440860215056 + a5~53.763440860215056 + g5^53.763440860215056,
53.763440860215056: a5/53.763440860215056 + b5-53.763440860215056 + g5~53.763440860215056 + f5^53.763440860215056,
53.763440860215056: f5/53.763440860215056 + g5-53.763440860215056 + e5~53.763440860215056,
53.763440860215056: e5/53.763440860215056 + f5-53.763440860215056 + d5~53.763440860215056,
53.763440860215056: c5/53.763440860215056 + e5-53.763440860215056 + d5^53.763440860215056,
53.763440860215056: b4/53.763440860215056 + d5-53.763440860215056 + c5~53.763440860215056,
53.763440860215056: c5-53.763440860215056,
1344.0860215053765`
}

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box ]);

const attackChance = 0.05
const attackCooldown = 1000 // ms
const maxBullets = 5

const gameState = {
  dir: 1,
  player: null,
  enemies: null,
  moveDown: false,
  gameover: false,
  win: false,
  lastFrameTime: Date.now(),
  deltaTime: 0,
  frame: 0,
  score: 0,
}

const updateFrame = ({lastFrameTime}) => {
  const now = Date.now()
  const deltaTime = now - lastFrameTime
  gameState.deltaTime = deltaTime
  gameState.lastFrameTime = now
  
  gameState.frame += 1
}

const onFPSInterval = (fps, state, callback) => {
  if (state.frame % fps !== 0) return
  callback(state)
}

const shouldMoveDown = () => {
  return getAll(box).some(box => 
    box.x === width() - 1 || box.x === 0
  )
}

const calculateEnemyMove = ({moveDown, dir}) => {
  if (moveDown) {
    gameState.moveDown = false
  } else if (shouldMoveDown()) { 
    Object.assign(gameState, {dir: dir *= -1, moveDown: true})
  }
}

const initializeState = () => {
  const enemies = getAll(box)
  const enemyMap = new Map()
  
  enemies.forEach(e => {
    enemyMap.set(e, {lastFired: gameState.lastFrameTime})
  })

  gameState.player = getFirst(player)
  gameState.enemies = enemyMap
  playTune(sounds.bgm, Infinity)
}

const makeEnemyMove = (state) => {
  const boxes = getAll(box)
  if (state.moveDown) {
    boxes.forEach(box => box.y += 1)
  } else {
    boxes.forEach(box => box.x += state.dir)
  }
}

const makeAttack = ({enemies}, enemy) => {
  addSprite(enemy.x, enemy.y + 1, enemyBullet)
  // we'll assume the last bullet is the one fired by this enemy...
  const s = getAll(enemyBullet).at(-1)
  enemies.get(enemy).bullet = s
  playTune(sounds.enemyFire)
}

const canAttack = ({lastFrameTime, enemies}, enemy) => {
  const {bullet, lastFired} = enemies.get(enemy)
  if (lastFrameTime - lastFired < attackCooldown) return false
  
  const bullets = getAll(enemyBullet)
  if (bullets.length >= maxBullets) return false
  
  if (bullets.includes(bullet)) return false
  return true
}

const processAttack = (state) => {
  const boxes = getAll(box)
  boxes.forEach(b => {
    if (canAttack(state, b)) {
      if (Math.random() < attackChance) {
        makeAttack(state, b)
      }
    }
  })
}

const processEnemy = (state) => {
    calculateEnemyMove(state)
    makeEnemyMove(state)
}

const processBullet = (state) => {
  getAll(bullet).forEach(b => {
    if (b.y === 0) {
      b.remove()
    }
  })

  getAll(enemyBullet).forEach(b => {
    if (b.y === height() - 1) {
      b.remove()
    }
  })
  
  getAll(bullet).forEach(b => b.y -= 1)
  getAll(enemyBullet).forEach(b => b.y += 1)
}

const processHits = (state) => {
  const enemiesHit = tilesWith(bullet, box)
  if (enemiesHit.length) {
    enemiesHit.forEach(tile => {
      state.score += 100
      playTune(sounds.enemyDestroyed)
      tile.forEach(s => {
        if (s.type !== bg) { 
          s.remove()
          // seems there are garbage collection issues if the reference to the sprite is not deleted
          state.enemies.delete(s)
        }
      })
    })
  }

  const playerHit = tilesWith(player, enemyBullet)
  if (playerHit.length) {
    playTune(sounds.playerDestroyed)
    state.player.remove()
    delete state.player
  }

  if (!state.enemies.size) {
    gameState.gameover = true
    gameState.win = true
  } else if (!state.player) {
    gameState.gameover = true
    gameState.win = false
  }
}

const processGameover = ({gameover, win, bgm}) => {
  if (gameover) {
    if (win) {
      addText(" YOU WIN", { 
        x: 6, 
        y: 8, 
        color: color`4`
      })
    } else {
      addText("YOU LOSE", { 
        x: 6, 
        y: 8, 
        color: color`3`
      })
    }
  }
}

const processScore = ({score}) => {
  clearText()
  addText(`SCORE:${score}`, {x: 5, y: 0, color: color`2`})
}

const fakeRAF = (cb) => {
  // force 60fps
  setTimeout(cb, 1000 / 60)
}

const onFrame = () => {
  updateFrame(gameState)
  
  onFPSInterval(60, gameState, processEnemy)
  onFPSInterval(5, gameState, processAttack)
  onFPSInterval(5, gameState, processBullet)
  
  processHits(gameState)
  processScore(gameState)
  processGameover(gameState)
  
  if (!gameState.gameover) {
    // requestAnimationFrame(onFrame)  
    fakeRAF(onFrame)
  }
}

const fill = () => {
  for (let i = 0; i < width(); i++) {
    for (let j = 0; j < height(); j++) {
      addSprite(i, j, bg)
      if (Math.random() < 0.02) {
        addSprite(i, j, star)
      }
    }
  }
}

const init = () => {
  initializeState()
  fill()

  // requestAnimationFrame(onFrame)
  fakeRAF(onFrame)
}

onInput("a", () => {
  gameState.player.x -= 1;
});

onInput("d", () => {
  gameState.player.x += 1;
});

onInput("j", () => {
  const p = gameState.player
  if(!p) return
  if (p.playback && p.playback.end) p.playback.end() // no optional chaining? :(
  if (getAll(bullet).length) {
    p.playback = playTune(sounds.cannotFire)
    return
  }
  addSprite(p.x, p.y - 1, bullet)
  p.playback = playTune(sounds.fire)
});

onInput("k", () => gameState.gameover = true)

init()