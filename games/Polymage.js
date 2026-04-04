/*
@title: Polymage
@author: Coderpillar
@tags: [rogue]
@addedOn: 2025-00-00
@description: thx to davnotdev for code insperation
*/

//sprites
const title_screen = "B"
const player_up = "w"
const player_down = "s"
const player_left = "a"
const player_right = "d"
const Triangle = "T"
const pewpew = "p"
const hit = "g"
const hud_tile = "t"
const full_heart = "H"
const half_heart = "h"
const heart_max = "M"
const full_energy = "E"
const half_energy = "e"
const energy_max = "m"
const UI_INTERACT = "u"
const UI_WALL = "U"
var background = "b"
var selector1 = "Q"
var selector2 = "q"
//music&SFX
const click = tune`
428.57142857142856: C4-428.57142857142856,
13285.714285714284`
const music = tune`
16000`
setLegend(
  // ----- menu -----
  [UI_INTERACT, bitmap`
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
  [UI_WALL, bitmap`
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
  [selector1, bitmap`
111111LLLLLLLLLL
1..............L
1..............L
1..............L
1..............L
1..............L
L..............L
L..............L
L..............L
L..............L
L..............1
L..............1
L..............1
L..............1
L..............1
LLLLLLLLLL111111`],
  [selector2, bitmap`
................
................
................
................
................
................
................
5555555555555555
5555555555555555
5555555555555555
7777777777777777
7777777777777777
................
................
................
................`],
  // ----- attack -----
  [hit, bitmap`
...69......96...
...693....396...
..66933..33966..
6666933..3396666
9999993..3999999
.333993..399333.
..33333..33333..
................
................
..33333..33333..
.333993..399333.
9999993..3999999
6666933..3396666
..66933..33966..
...693....396...
...69......96...`],
  [pewpew, bitmap`
................
................
................
................
................
................
................
.......33.......
.......33.......
................
................
................
................
................
................
................`],
  // ----- HUD -----
  [background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [full_heart, bitmap`
DDDDDDDDDDDDDDDD
D444444DD444444D
D466664DD466664D
D444444DD444444D
DDDDDDDDDDDDDDDD
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
  [half_heart, bitmap`
DDDDDDDD........
D444444D........
D466664D........
D444444D........
DDDDDDDD........
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
  [heart_max, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
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
  [full_energy, bitmap`
................
................
................
................
................
................
F622666FF622666F
F666666FF666666F
F999999FF999999F
FFFFFFFFFFFFFFFF
................
................
................
................
................
................`],
  [half_energy, bitmap`
................
................
................
................
................
................
F622666F........
F666666F........
F999999F........
FFFFFFFF........
................
................
................
................
................
................`],
  [energy_max, bitmap`
................
................
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
................
................
................
................
................
................`],
  [hud_tile, bitmap`
LLLLLLLLLLLLLLLL
L111111LL111111L
L122221LL122221L
L111111LL111111L
LLLLLLLLLLLLLLLL
0000000000000000
L122111LL112211L
L111111LL111111L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL
0000000000000000`],
  // ----- Entities -----
  [player_up, bitmap`
....00000000....
...0777777770...
...0770770770...
..077707707770..
..077707707770..
.07777777777770.
.07777777777770.
0777777777777770
0777777777777770
.07777777777770.
..077777777770..
...0777777770...
....07777770....
.....077770.....
......0770......
.......00.......`],
  [player_down, bitmap`
.......00.......
......0770......
.....077770.....
....07777770....
...0777777770...
..077777777770..
.07777777777770.
0777777777777770
0777777777777770
.07777777777770.
.07777777777770.
..077707707770..
..077707707770..
...0770770770...
...0777777770...
....00000000....`],
  [player_left, bitmap`
.......00.......
.....00770......
...00777770.....
.00777777770....
0777777777770...
07777777777770..
070007777777770.
0777777777777770
0777777777777770
070007777777770.
07777777777770..
0777777777770...
.00777777770....
...00777770.....
.....00770......
.......00.......`],
  [player_right, bitmap`
.......00.......
......07700.....
.....07777700...
....07777777700.
...0777777777770
..07777777777770
.077777777700070
0777777777777770
0777777777777770
.077777777700070
..07777777777770
...0777777777770
....07777777700.
.....07777700...
......07700.....
.......00.......`],
  [Triangle, bitmap`
.......00.......
......0FF0......
......0660......
.....0F66F0.....
.....0F66F0.....
....0F6666F0....
....0F6666F0....
...0F666666F0...
...0F666666F0...
..0F66666666F0..
..0F66066066F0..
.0F6660660666F0.
.0F6660660666F0.
0F666666666666F0
0000000000000000
................`]
)
setSolids([UI_WALL, selector2, player_up, player_down, player_left, player_right, hud_tile, Triangle])
//level 0 is menu
//level 1 is play
//level 2 is 
let level = 0
const levels = [
  map`
..........
..........
...U......
...u......
..........
...U......
..........
..........`,
  map`
tttttttttt
..........
T........T
..........
..........
..........
..........
...w......`,
]
setMap(levels[level])
// vars
//game state 
// -----player globals-----
const entities = [player_up, player_down, player_left, player_right]
// -----player globals-----
var Player = player_up
var player_dat = {
  "health": 3,
  "max_hearts": 3,
  "energy": 3,
  "max_energy": 3,
  "strength": 0.5,
  "attack_E": 0.5,
  "attack_cd": 500,
  "speed": 300,
}
var dodge_speed = 200
const player_states = [player_up, player_down, player_left, player_right]
const enemies = [Triangle]
var targeted_x = 0
var targeted_y = 0
var pressed = false
var attacking = false
var healing_rate = 1000
var energy_rate = 8000
// -----triangle-----
var trispeed = 1000

setPushables({
  [Triangle]: player_states,
  [player_up]: [Triangle],
  [player_down]: [Triangle],
  [player_left]: [Triangle],
  [player_right]: [Triangle]
})
//w is up
//a is left
//s is down
//d is right
//i is y
//j is x
//k is a
//l is b
const checkOnEdgeX = function(sprite) {
  const X = sprite.x
  if (X == 0 || (X + 1) == width()) {
    return true
  } else {
    return false
  }
}
const checkOnEdgeY = function(sprite) {
  const Y = sprite.y
  if ((Y - 1) == 0 || (Y + 1) == height()) {
    return true
  } else {
    return false
  }
}
const GameEnd = function(){
level=0;
    setMap(levels[0])
}

// ----- Player Functions ------
const drawHearts = function() {
  const heart = Math.floor(player_dat.health)
  const Heart = player_dat.max_hearts
  var ii = 0
  for (var i = 0; i < heart; i++) {
    addSprite(ii, 0, full_heart)
    ii++
  }
  var iii = 0
  for (var i = 0; i < 10; i++) {
    if (iii >= Heart) {
      addSprite(iii, 0, heart_max)
    }
    iii++
  }
  if (player_dat.health - heart === 0.5) {
    addSprite(ii, 0, half_heart)
  }
}
const updateHearts = function() {
  const heart = Math.floor(player_dat.health)
  const Heart = player_dat.max_hearts
  const Hearts = getAll(full_heart)
  const hearts = getAll(half_heart)
  const max = getAll(heart_max)
  Hearts.forEach(HEART => { HEART.remove() })
  hearts.forEach(HEART => { HEART.remove() })
  max.forEach(MAX => { MAX.remove() })
  var ii = 0
  for (var i = 0; i < heart; i++) {
    addSprite(ii, 0, full_heart)
    ii = ii + 1
  }
  var iii = 0
  for (var i = 0; i < 10; i++) {
    if (iii >= Heart) {
      addSprite(iii, 0, heart_max)
    }
    iii++
  }
  if (player_dat.health - heart === 0.5) {
    addSprite(ii, 0, half_heart)
  }
  if (player_dat.health < 0){
    GameEnd()
    addText("h")
  }
}
const changeHearts = function(amount) {
   player_dat.health += amount
  updateHearts()
}
const heartTick = function() {
  if (player_dat.health < player_dat.max_health) {
    changeHealth(0.5)
    updateHealth()
  }
}
const drawEnergy = function() {
  const energy = Math.floor(player_dat.energy)
  const Energy = player_dat.max_energy
  const Ener = getAll(full_energy)
  const ener = getAll(half_energy)
  var ii = 0
  for (var i = 0; i < energy; i++) {
    addSprite(ii, 0, full_energy)
    ii++
  }
  var iii = 0

  for (var i = 0; i < 10; i++) {
    if (iii >= Energy) {
      addSprite(iii, 0, energy_max)
    }
    iii++
  }
  if (player_dat.energy - energy === 0.5) {
    addSprite(ii, 0, half_heart)
  }
}
const updateEnergy = function() {
  const energy = Math.floor(player_dat.energy)
  const Energy = player_dat.max_energy
  const Ener = getAll(full_energy)
  const ener = getAll(half_energy)
  const max = getAll(energy_max)
  Ener.forEach(ENERGY => { ENERGY.remove() })
  ener.forEach(ENERGY => { ENERGY.remove() })
  max.forEach(MAX => { MAX.remove() })
  var ii = 0
  for (var i = 0; i < energy; i++) {
    addSprite(ii, 0, full_energy)
    ii++
  }
  var iii = 0
  for (var i = 0; i < 10; i++) {
    if (iii >= Energy) {
      addSprite(iii, 0, energy_max)
    }
    iii++
  }
  if (player_dat.energy - energy === 0.5) {
    addSprite(ii, 0, half_energy)
  }
}
const energyTick = function() {

    if (player_dat.energy > (player_dat.max_energy - 1.5)) {
      if (player_dat.health < player_dat.max_health) {
    changeHearts(0.5)
    updateHearts()
      }
  } else {
      if (player_dat.energy < player_dat.max_energy) {
    changeEnergy(0.5)
    updateEnergy()
  }
}
}
const changeEnergy = function(amount) {
   player_dat.energy += amount
  updateEnergy()
}
var movePlayer = function(m) {
  if (Player === m) {
    if (pressed === false) {
        pressed = true
        switch (m) {
          case "w":
            getFirst(Player).y -= 1
            targeted_x = getFirst(Player).x
            targeted_y = getFirst(Player).y - 1
            break
          case "s":
            getFirst(Player).y += 1
            targeted_x = getFirst(Player).x
            targeted_y = getFirst(Player).y + 1
            break
          case "a":
            getFirst(Player).x -= 1
            targeted_x = getFirst(Player).x - 1
            targeted_y = getFirst(Player).y
            break
          case "d":
            getFirst(Player).x += 1
            targeted_x = getFirst(Player).x + 1
            targeted_y = getFirst(Player).y
            break
        }
        setTimeout(() => {
          pressed = false
        }, player_dat.speed)
    }
  } else {
    getFirst(Player).type = m
    Player = m
    switch (m) {
      case "w":
        targeted_x = getFirst(Player).x
        targeted_y = getFirst(Player).y - 1
        break
      case "s":
        targeted_x = getFirst(Player).x
        targeted_y = getFirst(Player).y + 1
        break
      case "a":
        targeted_x = getFirst(Player).x - 1
        targeted_y = getFirst(Player).y
        break
      case "d":
        targeted_x = getFirst(Player).x + 1
        targeted_y = getFirst(Player).y
        break
    }
  }
}
const pushPlayer = function(m) {
  const on_edgeX = checkOnEdgeX(getFirst(Player))
  const on_edgeY = checkOnEdgeY(getFirst(Player))
  switch (m) {
    case "w":
      if (on_edgeY == false) {
        getFirst(Player).y -= 1
        targeted_y -= 1
      }
      break
    case "s":
      if (on_edgeY == false) {
        getFirst(Player).y += 1
        targeted_y += 1
      }
      break
    case "a":
      if (on_edgeX == false) {
        getFirst(Player).x -= 1
        targeted_x -= 1
      }
      break
    case "d":
      if (on_edgeX == false) {
        getFirst(Player).x += 1
        targeted_x += 1
      }
      break
  }
}
const playerHit = function() {
  if (player_dat.energy > 0) {
      attacking = true
    changeEnergy(-player_dat.attack_E)
    addSprite(targeted_x, targeted_y, hit)
    const hits = getAll(hit)
    hits.findLast(Hit => {
      setTimeout(() => {
        Hit.remove()
      }, 50)
      setTimeout(() => {
        attacking = false
      }, player_dat.attack_cd)
    })
  }
}
// var shoot = function() {
//   const faceing = Player

//   addSprite(targeted_x, targeted_y, pewpew)
//   if (faceing === "w") {
//     const i = getAll(pewpew).length - 1
//     setInterval(() => {
//       getAll(pewpew)[i].y -= 1
//       if (getAll(pewpew)[i].y < 1) {
//         clearInterval()
//       }
//     }, 100)

//   }
//   if (faceing === "s") {
//     const i = getAll(pewpew).length - 1
//     setInterval(() => {
//       getAll(pewpew)[i].y += 1
//       //

//       if (getAll(pewpew)[i].y === height() - 1) {

//         // getAll(pewpew)[i].remove()
//         clearInterval()

//       }
//     }, 100)

//   }
// }
const polyPATH = function(POLY, damage, Health, speed) {
  var player = getFirst(Player)
  var polys = getAll(POLY)
  const health = Health
  polys.forEach(pol => {
    var health = Health
    var targetedX
    var targetedY
    var path;
    (function(path) {
      path[path["X"] = 0] = "X"
      path[path["Y"] = 1] = "Y"
    })(path || (path = {}))
    var Path;
    const poly_tick = setInterval(() => {
      player = getFirst(Player)
      // ----- Attack Logic -----
      if (pol.x == player.x && pol.y - 1 == player.y) {
        targetedX = pol.x
        targetedY = pol.y - 1
        eHit(targetedX, targetedY, damage, "w", true)
      } else if (pol.x == player.x && pol.y + 1 == player.y) {
        targetedX = pol.x
        targetedY = pol.y + 1
        eHit(targetedX, targetedY, damage, "s", true)
      } else if (pol.x - 1 == player.x && pol.y == player.y) {
        targetedX = pol.x - 1
        targetedY = pol.y
        eHit(targetedX, targetedY, damage, "a", true)
      } else if (pol.x + 1 == player.x && pol.y == player.y) {
        targetedX = pol.x + 1
        targetedY = pol.y
        eHit(targetedX, targetedY, damage, "d", true)
      } else {
        // ----- Pathfinding -----
        if (Math.abs(pol.x - player.x) > Math.abs(pol.y - player.y)) {
          Path = path.X
        }
        if (Math.abs(pol.x - player.x) < Math.abs(pol.y - player.y)) {
          Path = path.Y
        }
        switch (Path) {
          case path.Y:
            if (pol.y > player.y) {
              pol.y -= 1
            } else if (pol.y < player.y) {
              pol.y += 1
            }
            break
          case path.X:
            if (pol.x > player.x) {
              pol.x -= 1
            } else if (pol.x < player.x) {
              pol.x += 1
            }
            break
          default:
            if (pol.y > player.y) {
              pol.y -= 1
            } else if (pol.y < player.y) {
              pol.y += 1
            }
        }
      }
    }, speed)
    // ----- Damage Logic -----
    const damageHandler = setInterval(() => {
      const pos_tile = JSON.stringify(getTile(pol.x, pol.y))
      const pos = getTile(pol.x, pol.y)
      const hit_tile = JSON.stringify(tilesWith(hit))
      if (pos.length > 1) {
        if (hit_tile.includes(pos_tile)) {
          switch (Player) {
            case "w":
              pol.y -= 1
              break
            case "s":
              pol.y += 1
              break
            case "a":
              pol.x -= 1
              break
            case "d":
              pol.x += 1
              break
          }
          health -= player_dat.strength
        }
      }
      if (health <= 0) {
        pol.remove()
        clearInterval(damageHandler)
        clearInterval(poly_tick)
      }
    }, 30)
  },)
}
const polyUADD = function(POLY, damage, Health, speed) {
  var player = getFirst(Player)
  var polys = getAll(POLY)
  polys.findLast(pol => {
    var health = Health
    var targetedX
    var targetedY
    var path;
    (function(path) {
      path[path["X"] = 0] = "X"
      path[path["Y"] = 1] = "Y"
    })(path || (path = {}))
    var Path;
    const poly_tick = setInterval(() => {
      player = getFirst(Player)
      var t = getTile(targetedX, targetedY)
      // ----- Attack Logic -----
      if (pol.x == player.x && pol.y - 1 == player.y) {
        targetedX = pol.x
        targetedY = pol.y - 1
        eHit(targetedX, targetedY, damage)
      } else if (pol.x == player.x && pol.y + 1 == player.y) {
        targetedX = pol.x
        targetedY = pol.y + 1
        eHit(targetedX, targetedY, damage)
      } else if (pol.x - 1 == player.x && pol.y == player.y) {
        targetedX = pol.x - 1
        targetedY = pol.y
        eHit(targetedX, targetedY, damage)
      } else if (pol.x + 1 == player.x && pol.y == player.y) {
        targetedX = pol.x + 1
        targetedY = pol.y
        eHit(targetedX, targetedY, damage)
      } else {
        // ----- Pathfinding -----
        if (Math.abs(pol.x - player.x) > Math.abs(pol.y - player.y)) {
          Path = path.X
        }
        if (Math.abs(pol.x - player.x) < Math.abs(pol.y - player.y)) {
          Path = path.Y
        }
        switch (Path) {
          case path.Y:
            if (pol.y > player.y) {
              pol.y -= 1
            } else if (pol.y < player.y) {
              pol.y += 1
            }
            break
          case path.X:
            if (pol.x > player.x) {
              pol.x -= 1
            } else if (pol.x < player.x) {
              pol.x += 1
            }
            break
          default:
            if (pol.y > player.y) {
              pol.y -= 1
            } else if (pol.y < player.y) {
              pol.y += 1
            }
        }
      }
    }, speed)
    const damageHandler = setInterval(() => {
      const pos_tile = JSON.stringify(getTile(pol.x, pol.y))
      const pos = getTile(pol.x, pol.y)
      const hit_tile = JSON.stringify(tilesWith(hit))
      if (pos.length > 1) {
        if (hit_tile.includes(pos_tile)) {
          switch (Player) {
            case "w":
              pol.y -= 1
              break
            case "s":
              pol.y += 1
              break
            case "a":
              pol.x -= 1
              break
            case "d":
              pol.x += 1
              break
          }
          health -= player_dat.strength
        }
      }
      if (health <= 0) {
        pol.remove()
        clearInterval(damageHandler)
        clearInterval(poly_tick)
      }
    }, 30)
  })
}
var spawnTriangle = function(x, y, d) {
  addSprite(x, y, Triangle)
  polyUADD(Triangle, 0.5, 2, 1000)
}
var eHit = function(x, y, damage, facing, knockback) {
  addSprite(x, y, hit)
  const hits = getAll(hit)
  var player = getFirst(Player)
  hits.findLast(Hit => {
    const hits = getAll(hit)
    setTimeout(() => {
      if ((Hit.x === player.x) && (Hit.y === player.y)) {

        Hit.remove()
        changeHearts(-damage)
        updateHearts()
        if (knockback === true) {
          pushPlayer(facing)
        }
      } else {
        Hit.remove()
      }
    }, dodge_speed)
  })
}
var trianglePath = function() {
  polyPATH(Triangle, 0.5, 2, 600)
}
const spawnTick = function(){}
const gameTick = function() {
  // ----- Energy & Health Tick -----
  setInterval(() => {
    energyTick()
  }, energy_rate)
  // setInterval(() => {
  //   energyTick()
  // }, energy_rate)
}
const gameSetup = function() {
  level = 1
  setMap(levels[1])
  clearText()
  targeted_x = getFirst(Player).x
  targeted_y = getFirst(Player).y - 1
  setBackground(background)
  gameTick()
  drawHearts()
  drawEnergy()
  trianglePath()
}
// menu setup
if (level === 0) {
  clearText()
  addText("Polymage", {
    x: 6,
    y: 3,
    color: color`0`
  })
  addText("play", {
    x: 6,
    y: 6,
    color: color`0`
  })
  addText("settings", {
    x: 6,
    y: 8,
    color: color`0`
  })
  Is_Selector_On_Screen = false
}
onInput("w", () => {
  //meun control
  if (level === 0) {
    playTune(click)
    if (Is_Selector_On_Screen === false) {
      addSprite(3, 3, selector2)
      Is_Selector_On_Screen = true
    }
    if (Is_Selector_On_Screen === true) {
      getFirst(selector2).y -= 1
    }
  }
  //play
  if (level === 1) {
    movePlayer("w")
  }
})
onInput("s", () => {
  //meun control
  if (level === 0) {
    playTune(click)
    if (Is_Selector_On_Screen === false) {
      addSprite(3, 3, selector2)
      Is_Selector_On_Screen = true
    }
    if (Is_Selector_On_Screen > 0) {
      getFirst(selector2).y += 1
    }
  }
  //play
  if (level === 1) {
    movePlayer("s")
  }
})
onInput("a", () => {
  //play
  if (level === 1) {
    movePlayer("a")
  }
})
onInput("d", () => {
  //play
  if (level === 1) {
    playTune(click)
    movePlayer("d")
  }
})
//a
onInput("k", () => {
  if (level === 1) {
    if (attacking === false) {
      playerHit()
    }
  }
})
onInput("l", () => {
  if (level === 0) {
    playTune(click)
    if (getTile(3, 3).length === 2) {
      gameSetup()
    }
  }
})
afterInput(() => {

})