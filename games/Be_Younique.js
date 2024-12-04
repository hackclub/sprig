/*
@title: Be Younique
@author: pixelianWarrior
@tags: []
@addedOn: 2024-11-29
*/

const player = "p"
const enemy = "e"
const immobileEnemy = "i"
const ammoPack = "a"
const ground = "g"
const wall = "w"
const playerWall = "q"
const bulletWall = "b"

const upBullet = "u"
const downBullet = "d"
const leftBullet = "l"
const rightBullet = "r"

const hit = tune`
258.62068965517244: B5-258.62068965517244,
8017.241379310346`
const die = tune`
234.375: B5^234.375,
234.375: E5/234.375,
234.375: A4/234.375,
234.375: C4/234.375,
6562.5`
const win = tune`
238.0952380952381: C4/238.0952380952381,
238.0952380952381: C5/238.0952380952381 + G4-238.0952380952381 + D4^238.0952380952381,
238.0952380952381: B5/238.0952380952381 + F5-238.0952380952381 + C5^238.0952380952381,
6904.761904761905`
const reload = tune`
135.13513513513513: C5/135.13513513513513 + A4^135.13513513513513,
135.13513513513513: D5^135.13513513513513 + G4/135.13513513513513,
4054.0540540540537`
const shoot = tune`
79.57559681697613: F5^79.57559681697613,
79.57559681697613: E5^79.57559681697613 + C5^79.57559681697613,
79.57559681697613: F5^79.57559681697613,
2307.6923076923076`

let changing = false
let ammo = 8

clearText()
addText(ammo + "/8", {
  x: 0,
  y: 0,
  color: color`6`
})

setLegend(
  [player, bitmap`
.....000000.....
....082LL280....
....0LLLLLL0....
....0LLHHHL0....
.....000000.....
0.....0000.....0
00....0000....00
..000000000000..
......0000......
......0000......
......0000......
.....000000.....
.....0....0.....
.....0....0.....
....00....00....
..000......000..`],
  [enemy, bitmap`
.....000000.....
....028LL280....
....0LLLLLL0....
....0LLHHLL0....
.....000000.....
......3333......
.....773377.....
....7.7337.7....
....0.7337.0....
....0.7777.0....
....0.7777.0....
......FFFF......
......F..F......
......F..F......
......3..3......
.....33..33.....`],
  [immobileEnemy, bitmap`
.....000000.....
....082LL820....
....0LLLLLL0....
....0LLHHLL0....
.....000000.....
......4444......
.....HH44HH.....
....H.H44H.H....
....0.H44H.0....
....0.HHHH.0....
....0.HHHH.0....
......FFFF......
......F..F......
......F..F......
......9..9......
.....99..99.....`],
  [ammoPack, bitmap`
................
.......D........
.......DD.......
........DD......
.........DD.....
..........DD....
......424..DD...
....664246F6DD..
...DFFDDDDDDD...
...D66DDDDDDD...
...DFFDDDDDDD...
...D66DDDDDDD...
...DDDDDDDDDD...
...DDDDDDDDDD...
................
................`],
  [ground, bitmap`
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1111111111111111
LLL11LLLLLL11LLL
LLL11LLLLLL11LLL
LLL11LLLLLL11LLL
1111111111111111
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1LLLLLL11LLLLLL1
1111111111111111
LLL11LLLLLL11LLL
LLL11LLLLLL11LLL
LLL11LLLLLL11LLL
1111111111111111`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`],
  [playerWall, bitmap`
33HHHHHHHHHHHH33
333..........333
H333........333H
H.333......333.H
H..333....333..H
H...333..333...H
H....333333....H
H.....3HH3.....H
H.....3HH3.....H
H....333333....H
H...333..333...H
H..333....333..H
H.333......333.H
H333........333H
333..........333
33HHHHHHHHHHHH33`],
  [bulletWall, bitmap`
......8888......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
8.....8118.....8
8111111881111118
8111111881111118
8.....8118.....8
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
......8888......`],
  [upBullet, bitmap`
................
................
................
................
................
.......99.......
......9339......
.....933339.....
.....933339.....
.....933339.....
.....933339.....
................
................
................
................
................`],
  [downBullet, bitmap`
................
................
................
................
................
.....933339.....
.....933339.....
.....933339.....
.....933339.....
......9339......
.......99.......
................
................
................
................
................`],
  [leftBullet, bitmap`
................
................
................
................
................
.......9999.....
......93333.....
.....933333.....
.....933333.....
......93333.....
.......9999.....
................
................
................
................
................`],
  [rightBullet, bitmap`
................
................
................
................
................
.....9999.......
.....33339......
.....333339.....
.....333339.....
.....33339......
.....9999.......
................
................
................
................
................`]
)

setSolids([player, enemy, immobileEnemy, wall, playerWall])

let level = 0
const levels = [
  map`
a.......ea
e.........
..........
.....p....
..........
..........
.........e
ae.......a`,
  map`
.....we...
.....we...
aeew.ww...
wwww.p....
......wwww
...ww.weea
...ew.....
...ew.....`,
  map`
a........p
qqqqqqqqq.
........q.
.e......q.
....ww..q.
....wwe.q.
....e...q.
e.......qa`,
  map`
qqq..a.bbb
qiq....beb
qqq....bbb
..........
..........
bbbbqqbbbb
ee..qq....
ie.aqq...p`,
  map`
pb......be
bb.wqqw.bb
..w....w..
..q.ii.q..
..q.ii.q..
..w....w..
bb.wqqw.bb
eb......be`
]

setMap(levels[level])

setBackground(ground)

setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("k", () => {
  if (ammo > 0) {
    playTune(shoot)
    addSprite(getFirst(player).x, getFirst(player).y, downBullet)
    getAll(downBullet)[getAll(downBullet).length - 1].isPlayer = true
    ammo--
  }
})

onInput("i", () => {
  if (ammo > 0) {
    playTune(shoot)
    addSprite(getFirst(player).x, getFirst(player).y, upBullet)
    getAll(upBullet)[getAll(upBullet).length - 1].isPlayer = true
    ammo--
  }
})

onInput("l", () => {
  if (ammo > 0) {
    playTune(shoot)
    addSprite(getFirst(player).x, getFirst(player).y, rightBullet)
    getAll(rightBullet)[getAll(rightBullet).length - 1].isPlayer = true
    ammo--
  }
})

onInput("j", () => {
  if (ammo > 0) {
    playTune(shoot)
    addSprite(getFirst(player).x, getFirst(player).y, leftBullet)
    getAll(leftBullet)[getAll(leftBullet).length - 1].isPlayer = true
    ammo--
  }
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

afterInput(() => {
  getAll(upBullet).forEach(bullet => {
    if (bullet.y === 0) {
      bullet.remove()
    } else {
      bullet.y -= 1
    }
    const potentialEnemy = getTile(bullet.x, bullet.y)
    if (potentialEnemy.some(sprite => sprite.type === player && !bullet.isPlayer)) {
      clearTile(bullet.x, bullet.y)
      playTune(die)
      addText("GAME OVER", {
        x: 6,
        y: 4,
        color: color`3`
      })
    } else if ((potentialEnemy.some(sprite => sprite.type === enemy) || potentialEnemy.some(sprite => sprite.type === immobileEnemy)) && bullet.isPlayer) {
      playTune(hit)
      clearTile(bullet.x, bullet.y)
      const action = getRandomInt(1, 3)
      if(action == 1) {
        addSprite(bullet.x,bullet.y,ammoPack)
      }
    } else if (potentialEnemy.some(sprite => sprite.type === wall) || potentialEnemy.some(sprite => sprite.type === bulletWall)) {
      bullet.remove()
    }
  })

  getAll(downBullet).forEach(bullet => {
    if (bullet.y === height() - 1) {
      bullet.remove()
    } else {
      bullet.y += 1
    }
    const potentialEnemy = getTile(bullet.x, bullet.y)
    if (potentialEnemy.some(sprite => sprite.type === player && !bullet.isPlayer)) {
      clearTile(bullet.x, bullet.y)
      playTune(die)
      addText("GAME OVER", {
        x: 6,
        y: 4,
        color: color`3`
      })
    } else if ((potentialEnemy.some(sprite => sprite.type === enemy) || potentialEnemy.some(sprite => sprite.type === immobileEnemy)) && bullet.isPlayer) {
      playTune(hit)
      clearTile(bullet.x, bullet.y)
      const action = getRandomInt(1, 3)
      if(action == 1) {
        addSprite(bullet.x,bullet.y,ammoPack)
      }
    } else if (potentialEnemy.some(sprite => sprite.type === wall) || potentialEnemy.some(sprite => sprite.type === bulletWall)) {
      bullet.remove()
    }
  })

  getAll(rightBullet).forEach(bullet => {
    if (bullet.x === width() - 1) {
      bullet.remove()
    } else {
      bullet.x += 1
    }
    const potentialEnemy = getTile(bullet.x, bullet.y)
    if (potentialEnemy.some(sprite => sprite.type === player && !bullet.isPlayer)) {
      clearTile(bullet.x, bullet.y)
      playTune(die)
      addText("GAME OVER", {
        x: 6,
        y: 4,
        color: color`3`
      })
    } else if ((potentialEnemy.some(sprite => sprite.type === enemy) || potentialEnemy.some(sprite => sprite.type === immobileEnemy)) && bullet.isPlayer) {
      playTune(hit)
      clearTile(bullet.x, bullet.y)
      const action = getRandomInt(1, 3)
      if(action == 1) {
        addSprite(bullet.x,bullet.y,ammoPack)
      }
    } else if (potentialEnemy.some(sprite => sprite.type === wall) || potentialEnemy.some(sprite => sprite.type === bulletWall)) {
      bullet.remove()
    }
  })

  getAll(leftBullet).forEach(bullet => {
    if (bullet.x === 0) {
      bullet.remove()
    } else {
      bullet.x -= 1
    }
    const potentialEnemy = getTile(bullet.x, bullet.y)
    if (potentialEnemy.some(sprite => sprite.type === player && !bullet.isPlayer)) {
      clearTile(bullet.x, bullet.y)
      playTune(die)
      addText("GAME OVER", {
        x: 6,
        y: 4,
        color: color`3`
      })
    } else if ((potentialEnemy.some(sprite => sprite.type === enemy) || potentialEnemy.some(sprite => sprite.type === immobileEnemy)) && bullet.isPlayer) {
      playTune(hit)
      clearTile(bullet.x, bullet.y)
      const action = getRandomInt(1, 3)
      if(action == 1) {
        addSprite(bullet.x,bullet.y,ammoPack)
      }
      
    } else if (potentialEnemy.some(sprite => sprite.type === wall) || potentialEnemy.some(sprite => sprite.type === bulletWall)) {
      bullet.remove()
    }
  })

  getAll(enemy).forEach(en => {
    const action = getRandomInt(1, 17);
    switch (action) {
      case 1:
        en.x += 1
        break
      case 2:
        en.x -= 1
        break
      case 3:
        en.y -= 1
        break
      case 4:
        en.y += 1
        break
      case 5:
        addSprite(en.x, en.y, upBullet)
        break
      case 6:
        addSprite(en.x, en.y, downBullet)
        break
      case 7:
        addSprite(en.x, en.y, leftBullet)
        break
      case 8:
        addSprite(en.x, en.y, rightBullet)
        break
    }
  })

  getAll(immobileEnemy).forEach(en => {
    const action = getRandomInt(1, 7);
    switch (action) {
      case 1:
        addSprite(en.x, en.y, upBullet)
        break
      case 2:
        addSprite(en.x, en.y, downBullet)
        break
      case 3:
        addSprite(en.x, en.y, leftBullet)
        break
      case 4:
        addSprite(en.x, en.y, rightBullet)
        break
    }
  })

  const potentialEnemy = getTile(getFirst(player).x, getFirst(player).y)
  if (potentialEnemy.some(sprite => sprite.type === ammoPack)) {
    ammo = 8
    playTune(reload)
    potentialEnemy.filter(sprite => sprite.type === ammoPack)[0].remove()
  }
  if (getFirst(enemy) === undefined && getFirst(immobileEnemy) === undefined && !changing) {
    changing = true
    playTune(win)
    addText("YOU WIN", {
      x: 7,
      y: 4,
      color: color`4`
    })
    if (level < levels.length - 1) {
      setTimeout(() => {
        level++
        setMap(levels[level])
        clearText()
        changing = false
        ammo = 8
        addText(ammo + "/8", {
        x: 0,
        y: 0,
        color: color`6`
        })
      }, 2000)
    }
  }
  if (!changing) {
    clearText()
    addText(ammo + "/8", {
      x: 0,
      y: 0,
      color: color`6`
    })
  }


})
