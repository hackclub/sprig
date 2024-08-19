/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Bike Mayhem
@author: Eddie B
@tags: ["bike"]
@addedOn: 2024-08-18
*/

const player = "p"
const obstacle_block = 'b'
const wall = 'w'
const speed_boost = 's'
const player_speed = 'e'
const barrel = "a"
const slowdown = "d"
const speedup = "u"
const bg = "g"
const kaboom = "k"

let game = false
let level_difficulty = 0
let game_start = true
let timeout = 1000
var death_blocks = []
var powerup_speed = []
var barrel_block = []
var immunity = false
var countdown = 10
var speedboost = false
var boost = ""


for (let key in death_blocks) {
    addText(key, {
        x: 2,
        y: 4,
        color: color`0`
    });
  }

setLegend(
  [ kaboom, bitmap`
...3.....3......
..393...393..33.
..3993.3993.393.
..3963396933993.
...369966696693.
..396666666693..
.396666666693...
399666666669333.
3333366666669993
....36666669333.
...39696666933..
..399336699693..
..393.399339993.
...3..3993.3993.
.......33...333.
................`],
  [ player_speed, bitmap`
................
................
.......666......
.......666......
.......666......
........L.......
.......666......
......36663.....
......36663.....
......3CLC3.....
......6.L.6.....
.......666......
.......666......
.......666......
................
................` ],
  [ player, bitmap`
................
................
.......000......
.......000......
.......000......
........L.......
.......000......
......50005.....
......50005.....
......57L75.....
......0.L.0.....
.......000......
.......000......
.......000......
................
................` ],
  [ barrel, bitmap`
................
................
..11LCCCCCCL11..
.C11LCCCCCCL11C.
CC11LC000CCL11CC
0011L0CCC00L110C
CC11LCCCCCCL11CC
CC11LCCCCCCL11CC
CC11LCCCCCCL11CC
CC11LCCCCCCL11CC
0011L0CCC00L110C
CC11LC000CCL11CC
.C11LCCCCCCL11C.
..11LCCCCCCL11..
................
................` ],
  [ slowdown, bitmap`
................
................
................
................
................
.....88HH88.....
.....88HH88.....
.....88HH88.....
.....HHHHHH.....
.....8HHHH8.....
.....88HH88.....
................
................
................
................
................` ],
  [ speedup, bitmap`
................
................
................
................
................
.....HH88HH.....
.....H8888H.....
.....888888.....
.....HH88HH.....
.....HH88HH.....
.....HH88HH.....
................
................
................
................
................` ],
  [ obstacle_block, bitmap`
.....000000.....
....03333330....
...0333333330...
...0300000030...
..000777777000..
.03077777777030.
..007000000700..
...0703333070...
...0703333070...
...0303333030...
...0330330330...
...0330330330...
...0300000030...
...0303333030...
....00333300....
.....000000.....`],
  [ wall, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444D44444444444
44444D444444F444
44444444444F4444
4444444444444444
4444444444444444
4444444444444444
444444444D444444
44D44444D4444444
4D44444444F44444
444444444F444444
4444444444444444
4444444444444444`],
  [ speed_boost, bitmap`
8888888888888888
8888888668888888
8888886666888888
8888866666688888
8888866666688888
8666666666666668
8666666666666668
8666666666666668
8866666666666688
8886666666666888
8866666666666688
8666666666666668
8666688888866668
8668888888888668
8688888888888868
8888888888888888`],
  [ bg, bitmap`
1222222222222221
1222222222222221
1222222222222221
1222122222212221
1222122222212221
1222122222212221
1222122222212221
1222122222212221
1222122222212221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221`],
)

setSolids([
  player, wall, barrel
])

let level = 0
const levels = [
  map`
wwwwwww
...p...
.......
.......
.......
.......
wwwwwww`
]
setBackground(bg)
setMap(levels[level])

setPushables({
  [ player ]: [barrel]
})

const bgm = tune`
159.5744680851064: D5-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064,
159.5744680851064: C5-159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: B4-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: G4-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: A4-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
319.1489361702128,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: C5-159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064,
159.5744680851064: D5-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: D4-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: D4-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: D4-159.5744680851064 + undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
159.5744680851064: undefined/159.5744680851064,
319.1489361702128`;

const win = tune`
208.33333333333334: C4-208.33333333333334 + C3/208.33333333333334,
208.33333333333334: D4-208.33333333333334,
208.33333333333334: E4-208.33333333333334 + C3/208.33333333333334,
208.33333333333334: F4-208.33333333333334 + F2/208.33333333333334,
208.33333333333334: G4-208.33333333333334,
208.33333333333334: A4-208.33333333333334 + F2/208.33333333333334,
208.33333333333334: G4-208.33333333333334 + G2/208.33333333333334,
208.33333333333334: C5-208.33333333333334,
208.33333333333334: B4-208.33333333333334 + G2/208.33333333333334,
208.33333333333334: C5-208.33333333333334 + C2/208.33333333333334,
4583.333333333334`;

const coin = tune`
164.83516483516485: E5-600,
164.83516483516485: A5-300,
4945.054945054945`;

let playback = playTune (bgm, Infinity);


function pushObstacleSpritesUp() {
  getAll(obstacle_block).forEach(sprite => {
    sprite.y -= 1;
    if (sprite.y === 0) {
      sprite.remove()
    }
  });

  getAll(speed_boost).forEach(sprite => {
    sprite.y -= 1;
    if (sprite.y === 0) {
      sprite.remove()
    }
  });
  
  getAll(slowdown).forEach(sprite => {
    sprite.y -= 1;
    if (sprite.y === 1) {
      sprite.remove()
    }
  });

  getAll(speedup).forEach(sprite => {
    sprite.y -= 1;
    if (sprite.y === 1) {
      sprite.remove()
    }
  });
  
  checkCollision()
  getAll(barrel).forEach(sprite => {
    sprite.y -= 1;
    if (sprite.y === 1) {
      sprite.remove()
    }
  });
  
  
  for (let i = 0; i < death_blocks.length; i++) {
    if (death_blocks[i]) {
      let [x, y] = death_blocks[i];
      death_blocks[i] = [x, y -1];
    }
  }

}

function dictCount(dict) {
  let h = 0;
  for (let i in dict) {
    h++
  }
  return h
}

function gameover() {
  game = false
  clearText()

  let score = dictCount(death_blocks)
  addText("u ded", {
        x: 7,
        y: 4,
        color: color`0`
    });
  addText("score:" + score, {
        x: 6,
        y: 5,
        color: color`0`
    });
  setTimeout(menu, 3000)
}


function speedBoostCountdown() {
  if (countdown > 0) { 
    speedboost = true
    addText("Immune for", {
          x: 5,
          y: 4,
          color: color`0`
      });
    addText(countdown + " seconds", {
          x: 6,
          y: 5,
          color: color`0`
      });
    countdown--
    setTimeout(speedBoostCountdown, 1000)
  } else {
    countdown = 10
    clearText()
    speedboost = false

    // ending speed boost
    timeout += 200
    immunity = false
    getAll(player_speed).forEach(sprite => {
      sprite.remove()
    })
  }
}

function speedBoost() {
  if (!speedboost) {
    timeout -= 200
    immunity = true
    
    addSprite(getFirst(player).x, getFirst(player).y, player_speed)
    speedBoostCountdown()
  }
  boost = "speed boost"
}

function slowdown_all() {
  timeout += 200

  // addText("Slowdown", {
  //       x: 5,
  //       y: 4,
  //       color: color`0`
  //   });
  boost = "slow"
}
  
function speedup_all() {
  timeout -= 100

  // addText("Speedup", {
  //       x: 5,
  //       y: 4,
  //       color: color`0`
  //   });
  boost = "speed"
}

function kaboom_sprite(x, y) {
  clearTile(x, y)
}

function checkCollision() {
  playerx = getFirst(player).x
  playery = getFirst(player).y

  // for (let i in death_blocks) {
  //   blockx = death_blocks[i][0]
  //   blocky = death_blocks[i][1]
  //   if (!immunity) {
  //     if (blockx === playerx && blocky === playery) return gameover()
  //   }
  //   getAll(barrel).forEach(sprite => {
  //     if (sprite.x === blockx && sprite.y === blocky) {
  //       // sprite.remove()
  //       delete death_blocks[i]
  //       clearTile(sprite.x, sprite.y)
  //     }
  //   });
  // }
  getAll(obstacle_block).forEach(death => {
    blockx = death.x
    blocky = death.y
    if (!immunity) {
      if (blockx === playerx && blocky === playery) return gameover()
    }
    getAll(barrel).forEach(sprite => {
      if (sprite.x === blockx && sprite.y === blocky) {
        // delete death_blocks[i]
        addSprite(sprite.x, sprite.y, kaboom)
        // addSprite(sprite.x, sprite.y, player_speed)
        setTimeout(kaboom_sprite(sprite.x, sprite.y), 1000)
        // clearTile(sprite.x, sprite.y)
      }
    });
  })
  
  getAll(speed_boost).forEach(sprite => {
    if (sprite.x === playerx && sprite.y === playery) {
      sprite.remove()
      return speedBoost()
    }
  });
  
  getAll(slowdown).forEach(sprite => {
    if (sprite.x === playerx && sprite.y === playery) {
      sprite.remove()
      return slowdown_all()
    }
  });
  
  getAll(speedup).forEach(sprite => {
    if (sprite.x === playerx && sprite.y === playery) {
      sprite.remove()
      return speedup_all()
    }
  });
  
  return false  
}

function tick() {
  if (game) {
    checkLevel()
    let random_num = Math.floor(Math.random() * 7)
    random_boost = Math.floor(Math.random() * 8)
    let id = dictCount(death_blocks)

    if (getAll(player_speed) == 0) {
        immunity = false
    }

    // display boost
    addText(boost, {
      x: 3,
      y: 14,
      color: color`0`
    })
    
    addText(level_difficulty.toString(), {
      x: 17,
      y: 14,
      color: color`0`
    })
    
    // adding blocks
    let xy = [random_num, 6]

    if (random_boost == 1) {
      const objects_list = ["speed", "slowdown", "speedup", "barrel", "barrel"]
      const item = objects_list[Math.floor(Math.random() * objects_list.length)];
  
  
      switch(item) {
        case "speed":
          if (speedboost) {
            addSprite(random_num, 6, slowdown)
            barrel_block[id] = xy;
            break
          } else {
            addSprite(random_num, 6, speed_boost)
            powerup_speed[id] = xy;
            break
          }
        case "slowdown":
          addSprite(random_num, 6, slowdown)
          break
        case "speedup":
          addSprite(random_num, 6, speedup)
          break
        case "barrel":
          addSprite(random_num, 6, barrel)
          barrel_block[id] = xy;
          break
      }
    } else {
      addSprite(random_num, 6, obstacle_block)
      death_blocks[id] = xy;
    }

  
    // scootching all blocks upwards
    pushObstacleSpritesUp();
    
    checkCollision()
    
    let h = true
    setTimeout(tick, timeout);
  }
}


let one = true
let two = true
let three = true
let four = true
let levels_collected = []
function checkLevel() {
  // 1: 20
  // 2: 40
  // 3: 60
  // 4: 80
  // 5: 100
  
  let game_blocks = dictCount(death_blocks)
  let level_divided = Math.floor(game_blocks / 20)
  level_difficulty = level_divided
  if (!levels_collected.includes(level_divided)) {
    levels_collected.push(level_divided)
    if (timeout > 300) {
      timeout -= 100
    }
  }
}

onInput("a", () => {
  if (game) {
    getFirst(player).x -= 1
    checkCollision()
    if (getAll(player_speed).length > 0) {
      getFirst(player_speed).x = getFirst(player).x
      getFirst(player_speed).y = getFirst(player).y
    }
  }
})

onInput("d", () => {
  if (game) {
    getFirst(player).x += 1
    checkCollision()
    if (getAll(player_speed).length > 0) {
      getFirst(player_speed).x = getFirst(player).x
      getFirst(player_speed).y = getFirst(player).y
    }
  }
})

onInput("w", () => {
  if (game) {
    getFirst(player).y -= 1
    checkCollision()
    if (getAll(player_speed).length > 0) {
      getFirst(player_speed).x = getFirst(player).x
      getFirst(player_speed).y = getFirst(player).y
    }
  }
})

onInput("s", () => {
  if (game) {  
    getFirst(player).y += 1
    checkCollision()
    if (getAll(player_speed).length > 0) {
      getFirst(player_speed).x = getFirst(player).x
      getFirst(player_speed).y = getFirst(player).y
    }
  }
})


addText("Bike Mayhem", {
  x:4,
  y:4,
  color: color`0`
})
addText("WASD to start", {
  x:3,
  y:6,
  color: color`0`
})

function menu() {
  clearText()
  timeout = 1000
  boost = ""
  game_start = true
  game = false
  getAll().forEach(sprite => {
    if (sprite.type !== "p") {
      sprite.remove()
    }
  })
  // addSprite(3, 1, player)
  addText("Bike Mayhem", {
    x:4,
    y:4,
    color: color`0`
  })
  addText("WASD to start", {
    x:3,
    y:6,
    color: color`0`
  })
  setMap(levels[level])
}

afterInput(() => {
  if (game_start) {
      game = true  
      clearText()
      tick()
      game_start = false
    } 
})
