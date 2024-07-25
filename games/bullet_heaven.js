/*
@title: Bullet Heaven
@author: OtterDev 
@tags: [shooter]
@addedOn: 2024-00-00
*/

const player = "p";
const jerk = "j";
const bullet = "b";
const wall = "w"
const playerWall = "i"
const jerkBullet = "u";
let jerkHealth = 30;
let jerkMovingLeft = false;
let stillAlive = true;
let jerkDead = false;
const bulletNoise = tune`
500: C4-500,
15500`
const jerkSpeed = 400;
const winNoise = tune`
500: C4/500,
500: D4/500,
500: E4/500,
14500`
const deadNoise = tune`
500: E4/500,
500: D4/500,
500: C4/500,
14500`
let jerkCanShoot = true;
let canShoot = true;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
setLegend(
  [player, bitmap`
0000000000000000
0000000000000000
0022200000022200
0022200000022200
0022200000022200
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000002222000000
0000000000000000
0000000000000000
0000000000000000`],
  [jerk, bitmap`
3333333333333333
3033333333333303
3303333333333033
3330333333330333
3333333333333333
3333303333033333
3333303333033333
3333303333033333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333330000333333
3333303333033333
3333303333033333
3333303333033333`],
  [bullet, bitmap`
....66666666....
....66666666....
...6666666666...
...6666666666...
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..FFFFFFFFFFFF..
..FFFFFFFFFFFF..`],
  [jerkBullet, bitmap`
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
....33333333....`],
  [wall, bitmap`
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
  [playerWall, bitmap`
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
................
................
................
................`],
)

setSolids([])

const level = map`
wwwwwwww
........
j.......
........
........
...p....
iiiiiiii`


setMap(level)

setPushables({
  [player]: []
})

onInput("s", () => {
  if (stillAlive) {
    getFirst(player).y += 1;
  }
});

onInput("d", () => {
  if (stillAlive) {
    getFirst(player).x += 1;
  }
});

onInput("w", () => {
  if (stillAlive) {
    getFirst(player).y -= 1;
  }
});
onInput("a", () => {
  if (stillAlive) {
    getFirst(player).x -= 1;
  }
});
onInput("l", () => {
  if (stillAlive && canShoot) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet)
    canShoot = false
  }
});
onInput("i", () => {
  if (stillAlive && canShoot) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet)
    canShoot = false
  }
});
onInput("j", () => {
  if (stillAlive && canShoot) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet)
    canShoot = false
  }
});
onInput("k", () => {
  if (stillAlive && canShoot) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet)
    canShoot = false
  }
});

function moveBullets() {
  let bullets = getAll(bullet);
  let jerkBullets = getAll(jerkBullet);
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 1;
  }
  for (let i = 0; i < jerkBullets.length; i++) {
    jerkBullets[i].y += 1;
  }
}
let timer = setInterval(() => {
  moveBullets()
  const bullets = getAll(bullet);
  const jerkBullets = getAll(jerkBullet);
  const walls = getAll(wall);
  const playerWalls = getAll(playerWall);
  if (getFirst(jerk).x === getFirst(player).x && jerkCanShoot) {
    addSprite(getFirst(jerk).x, getFirst(jerk).y, jerkBullet)
    jerkCanShoot = false
  }
  jerkBullets.forEach(bullet => {
    if (getFirst(player).x === bullet.x && getFirst(player).y === bullet.y) {
      bullet.remove()
      stillAlive = false;
      playTune(deadNoise)
      addText(`you died!`, {
        x: 5,
        y: 5,
        color: color`9`
      })
      clearInterval(timer)
    }
    playerWalls.forEach(wall => {
      if (bullet.x === wall.x && bullet.y === wall.y) {
        bullet.remove();
      }
    });
  });
  bullets.forEach(bullet => {
    walls.forEach(wall => {
      if (bullet.x === wall.x && bullet.y === wall.y) {
        bullet.remove();
      }
    });
    if (bullet.x === getFirst(jerk).x && bullet.y === getFirst(jerk).y && !jerkDead && stillAlive) {
      if (jerkHealth <= 1) {
        jerkDead = true
        clearInterval(jerkTimer)
        getFirst(jerk).remove();
        playTune(winNoise);
        addText(`you won!`, {
          x: 5,
          y: 5,
          color: color`6`
        })
        clearInterval(timer)
        return;
      }
      jerkHealth -= 1;
      playTune(bulletNoise)
      bullet.remove()
    }

  });
}, 100);
let jerkTimer = setInterval(() => {
  if (jerkDead || !stillAlive) {
    return;
  }
  if (getFirst(jerk).x === 0) {
    jerkMovingLeft = false;
  }
  if (getFirst(jerk).x < 7) {
    if (jerkMovingLeft) {
      getFirst(jerk).x -= 1
    } else {
      getFirst(jerk).x += 1
    }
  } else {
    jerkMovingLeft = true
    getFirst(jerk).x -= 1
  }
}, jerkSpeed);
let bulletTimer = setInterval(() => {
  jerkCanShoot = true
}, 2000)
let playerTimer = setInterval(() => {
  canShoot = true
}, 200)
