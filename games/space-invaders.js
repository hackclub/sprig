

/*
@title: Space_Invaders
@author: Carmel132
@tags: ['strategy']
@addedOn: 2023-04-19

Controls:
A/D - Left/Right
I   - Shoot
J   - Restart
*/


const enemyProjectile = "a"
const bgColor = "b"
const shieldTL = "c"
const shieldTR = "d"
const enemy_Frame1 = "e"
const shieldBL = "f"
const shieldBR = "g"
const liveIcon = "h"
const enemy_Frame2 = "i"
const UFOL = "j"
const UFOR = "k"
const player = "p"
const playerProjectile = "r"

let playerLives = 4
let playerShootCooldownDuration = 850
let playerShootCooldown = 0
let numEnemies = 72
let enemyDir = 1
let shieldStatus = []
let enemyFrame = 0
let UFOActive = false
let UFOKilled = 0


const enemyTypes = [enemy_Frame1, enemy_Frame2]
const winmessage = "YOU WIN!"
const losemessage = "YOU LOSE!"

const UFOSound = tune`
55.65862708719852: B4-55.65862708719852,
55.65862708719852: C5-55.65862708719852,
55.65862708719852: C5-55.65862708719852,
55.65862708719852: G5-55.65862708719852,
55.65862708719852: B5-55.65862708719852,
55.65862708719852: B5-55.65862708719852,
55.65862708719852: B5-55.65862708719852,
55.65862708719852: G5-55.65862708719852,
55.65862708719852: C5-55.65862708719852,
55.65862708719852: C5-55.65862708719852,
55.65862708719852: G5-55.65862708719852,
55.65862708719852: B5-55.65862708719852,
55.65862708719852: B5-55.65862708719852,
55.65862708719852: B5-55.65862708719852,
55.65862708719852: G5-55.65862708719852,
55.65862708719852: C5-55.65862708719852,
55.65862708719852: B4-55.65862708719852,
55.65862708719852: A4-55.65862708719852,
55.65862708719852: A4-55.65862708719852,
723.5621521335808`
const playerShootSound = tune`
63.96588486140725,
63.96588486140725: D4~63.96588486140725 + E4~63.96588486140725 + A5^63.96588486140725 + G5/63.96588486140725,
63.96588486140725: D4~63.96588486140725 + E4~63.96588486140725 + B5^63.96588486140725 + A5/63.96588486140725 + G5/63.96588486140725,
1855.0106609808101`
const enemyDeathSound = tune`
75.37688442211055: E4~75.37688442211055 + A4^75.37688442211055,
75.37688442211055: E4~75.37688442211055 + A4^75.37688442211055 + C5-75.37688442211055 + B5/75.37688442211055,
75.37688442211055: E4~75.37688442211055 + D5-75.37688442211055 + G5/75.37688442211055,
75.37688442211055: E4~75.37688442211055 + D5-75.37688442211055 + A5/75.37688442211055,
75.37688442211055: E4~75.37688442211055 + A4^75.37688442211055 + C5-75.37688442211055 + B5/75.37688442211055,
2035.1758793969848`
const playerHitSound = tune`
144.92753623188406: C4~144.92753623188406 + D4~144.92753623188406 + E4~144.92753623188406 + F4~144.92753623188406 + G4~144.92753623188406,
144.92753623188406: C4~144.92753623188406 + D4^144.92753623188406 + E4~144.92753623188406 + F4~144.92753623188406,
144.92753623188406: C4~144.92753623188406 + D4^144.92753623188406 + E4~144.92753623188406,
144.92753623188406: C4~144.92753623188406 + D4~144.92753623188406 + F4^144.92753623188406,
144.92753623188406: C4~144.92753623188406 + F4^144.92753623188406,
144.92753623188406: C4~144.92753623188406 + D4^144.92753623188406 + E4~144.92753623188406,
3768.1159420289855`
const shieldHitSound = tune`
188.67924528301887: C4/188.67924528301887,
5849.056603773585`
const winSound = tune`
186.33540372670808: B5/186.33540372670808,
186.33540372670808: B5/186.33540372670808,
186.33540372670808: B5/186.33540372670808,
186.33540372670808: A5/186.33540372670808 + B5/186.33540372670808,
186.33540372670808: A5/186.33540372670808,
186.33540372670808: A5/186.33540372670808,
186.33540372670808: A5/186.33540372670808,
186.33540372670808: G4/186.33540372670808,
186.33540372670808: G4/186.33540372670808,
186.33540372670808: G4/186.33540372670808,
559.0062111801242,
186.33540372670808: B4/186.33540372670808,
186.33540372670808: B4/186.33540372670808,
186.33540372670808: D5/186.33540372670808,
186.33540372670808: D5/186.33540372670808,
186.33540372670808: D5/186.33540372670808 + F5/186.33540372670808,
186.33540372670808: F5/186.33540372670808,
186.33540372670808: F5/186.33540372670808,
186.33540372670808: A5/186.33540372670808,
186.33540372670808: C4/186.33540372670808 + A5/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
186.33540372670808: C4/186.33540372670808,
559.0062111801242`
const loseSound = tune`
120: E5^120 + D5^120,
120: E5-120 + D5~120,
120: E5-120 + D5~120,
120: E5-120 + D5~120,
120: E5-120 + D5~120,
120: D5^120 + C5^120,
120: D5-120 + C5~120,
120: D5-120 + C5~120,
120: D5-120 + C5~120,
120: B4^120 + A4^120,
120: B4^120 + A4^120,
120: B4-120 + A4~120,
120: B4-120 + A4~120,
120: B4-120 + A4~120,
120: B4-120 + A4~120,
120: B4-120 + A4~120,
120: G4^120 + F4^120,
120: C4^120 + D4^120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
120: C4-120 + D4~120,
600`
const enemyMoveSound = tune`
86.70520231213872: C4~86.70520231213872 + D4~86.70520231213872,
86.70520231213872: D4~86.70520231213872 + C4~86.70520231213872,
2601.156069364162`

const level = map`
....................
....................
....................
....................
....eeeeeeeeeeee....
....eeeeeeeeeeee....
....eeeeeeeeeeee....
....eeeeeeeeeeee....
....eeeeeeeeeeee....
....eeeeeeeeeeee....
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
...cd..cd..cd..cd...
...fg..fg..fg..fg...
....................
..........p.........`
const end = map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............`
const enterMap = map`
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
................`
setLegend(
  [ player, bitmap`
................
................
................
................
.......44.......
.......44.......
.....444444.....
.....444444.....
..444444444444..
..444444444444..
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ enemy_Frame1, bitmap`
......4444......
......4444......
....44444444....
....44444444....
..444444444444..
..444444444444..
4444004444004444
4444004444004444
4444444444444444
4444444444444444
....44....44....
....44....44....
..44..4444..44..
..44..4444..44..
44..44....44..44
44..44....44..44`],
  [ bgColor, bitmap`
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
  [ playerProjectile, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
  [ enemyProjectile, bitmap`
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......`],
  [ shieldTL, bitmap`
........44444444
........44444444
....444444444444
....444444444444
..44444444444444
..44444444444444
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
  [ shieldTR, bitmap`
44444444........
44444444........
444444444444....
444444444444....
44444444444444..
44444444444444..
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
  [ shieldBL, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444......
4444444444......
44444444........
44444444........
444444..........
444444..........
444444..........
444444..........
444444..........
444444..........`],
  [ shieldBR, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
......4444444444
......4444444444
........44444444
........44444444
..........444444
..........444444
..........444444
..........444444
..........444444
..........444444`],
  [ liveIcon, bitmap`
................
................
................
................
.......44.......
.......44.......
.....444444.....
.....444444.....
..444444444444..
..444444444444..
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ enemy_Frame2, bitmap`
......4444......
......4444......
....44444444....
....44444444....
..444444444444..
..444444444444..
4444004444004444
4444004444004444
4444444444444444
4444444444444444
..44..4444..44..
..44..4444..44..
44............44
44............44
..44........44..
..44........44..`],
  [ UFOL, bitmap`
..........333333
..........333333
......3333333333
......3333333333
....333333333333
....333333333333
..3333..3333..33
..3333..3333..33
3333333333333333
3333333333333333
....333333....33
....333333....33
......33........
......33........
................
................`], 
  [ UFOR, bitmap`
333333..........
333333..........
3333333333......
3333333333......
333333333333....
333333333333....
33..3333..3333..
33..3333..3333..
3333333333333333
3333333333333333
33....333333....
33....333333....
........33......
........33......
................
................`]
)
function enter(){
  setMap(enterMap)
  setBackground(bgColor)
  for (let i of intervals) {clearInterval(i)}
  addText("SPACE INVADERS", {x: 3, y: 4, color: color`4`})
  addText("A/D - LEFT/RIGHT", {x: 2, y: 6, color: color`2`})
  addText(" I  -   SHOOT", {x: 2, y: 7, color: color`2`})
  addText("PRESS J TO START", {x: 2, y: 10, color: color`2`})
}
function start() {
  setBackground(bgColor)
  setMap(level)
  clearText()
  shieldStatus = [[getAll(shieldBL)[0], 4], [getAll(shieldBL)[1], 4], [getAll(shieldBL)[2], 4], [getAll(shieldBL)[3], 4]]
  restartIntervals()
  playerLives = 4
  numEnemies = 72
  playerShootCooldown = 0
  UFOKilled = 0
  UFOActive = false
}
function enemyMove() {
  playTune(enemyMoveSound)

  clearInterval(enemyMoveInterval)
  enemyMoveInterval = setInterval(enemyMove, 1000 - 650 * (1 - numEnemies / 72))
  intervals[0] = enemyMoveInterval
  let enemies = getAll(enemyTypes[0]).concat(getAll(enemyTypes[1]))
  enemyFrame = (enemyFrame + 1) % 2
  for (let e of enemies) {e.type = enemyTypes[enemyFrame]}
  enemies = getAll(enemyTypes[0]).concat(getAll(enemyTypes[1]))
  
  for (let e of enemies){
    if ((e.x >= width() - 1 && enemyDir == 1) || (e.x <= 0 && enemyDir == -1)) 
    {
      enemyDir *= -1;
      for (let i of enemies) {i.y += 1;}
      if (!UFOActive) {UFOStart()}
      return;
    }
  }
  for (let e of enemies){
      e.x += enemyDir

      if (e.y >= height() - 2) {playerLives = 0; endgame();}
  }
  for (let e of enemies){
    for (let shield of shieldStatus){
        if (shield[1] <= 0) {continue;}
        if (e.x == shield[0].x || e.x == shield[0].x + 1){
          if (e.y == shield[0].y - 1) {shield[1] = 2}
          else if (e.y == shield[0].y) {shield[1] = 0}
   }
  }
    }
}
function updateShieldState(){
  for (let shield of shieldStatus){
    if (shield[1] <= 2 && getTile(shield[0].x, shield[0].y - 1).find((x) => {return x.type == shieldTL}) != undefined){
      getTile(shield[0].x, shield[0].y - 1).find(x=>x.type == shieldTL).remove()
      getTile(shield[0].x + 1, shield[0].y - 1).find(x=>x.type == shieldTR).remove()
    }
    if (shield[1] <= 0 && getTile(shield[0].x, shield[0].y).find((x) => {return x.type == shieldBL}) != undefined){
      getTile(shield[0].x + 1, shield[0].y).find(x=>x.type == shieldBR).remove()
      getTile(shield[0].x, shield[0].y).find(x=>x.type == shieldBL).remove()
    }
  }
}
function playerShoot(){
  if (playerShootCooldown == 0){
    addSprite(getFirst(player).x, getFirst(player).y - 1, playerProjectile)
    clearInterval(playerShootCooldownInterval)
    playerShootCooldownInterval = setInterval(() => {if (playerShootCooldown == 1) {playerShootCooldown = 0}}, playerShootCooldownDuration)
    playerShootCooldown = 1

    playTune(playerShootSound)
  }
  
}
function playerProjectileMove(){
  for (let proj of getAll(playerProjectile)){
    proj.y -= 1
  }

}
function playerProjectileCollision(){
  for (let proj of getAll(playerProjectile)){
    if (getTile(proj.x, proj.y).length > 1) {
      if (getTile(proj.x, proj.y).some(x => enemyTypes.includes(x.type)))
      {
        numEnemies -= 1
        if (numEnemies <= 0) {endgame()}
        getTile(proj.x, proj.y).find(x => enemyTypes.includes(x.type)).remove()
        proj.remove()

        playTune(enemyDeathSound)
      }
      else if (getTile(proj.x, proj.y).some(x=> [UFOL, UFOR].includes(x.type))){
        UFORemove()
        UFOKilled += 1
        proj.remove()
      }
      else if (getTile(proj.x, proj.y).some(x=>x.type == enemyProjectile)){
        getTile(proj.x, proj.y).find(x=>x.type == enemyProjectile).remove()
        proj.remove()
      }
    }
    else if (proj.y <= 0) {proj.remove()}
    for (let shield of shieldStatus){
      if (shield[1] <= 0) {continue}

      if (shield[0].x == proj.x || shield[0].x + 1 == proj.x){
        if (shield[0].y == proj.y) {
          shield[1] -= 1
          proj.remove()
          
          playTune(shieldHitSound)
        }
      }
    }
  }
}
function enemyShoot(){
  for (let e of getAll(enemyTypes[0]).concat(getAll(enemyTypes[1]))){
    if (getTile(e.x, e.y + 1).length == 0 && Math.floor(Math.random() * (6 + 3 * numEnemies / 72)) == 1){
      addSprite(e.x, e.y + 1, enemyProjectile)
    }
  }
}
function enemyProjectileCollision(){
    for (let proj of getAll(enemyProjectile)){
      if (getTile(proj.x, proj.y).length > 1) {
        if (getTile(proj.x, proj.y).find(x => x.type == player) != undefined){
            playerLives -= 1
            if (playerLives <= 0) {endgame()}
            proj.remove()

            playTune(playerHitSound)
          }
        else if (getTile(proj.x, proj.y).some(x=>x.type == playerProjectile)){
          getTile(proj.x, proj.y).find(x=>x.type == playerProjectile).remove()
          proj.remove()
        }
      }
      else if (proj.y >= height() - 1) {proj.remove()}
      for (let shield of shieldStatus){
      if (shield[1] <= 0) {continue}

      if (shield[0].x == proj.x || shield[0].x + 1 == proj.x){
        if (shield[0].y == proj.y) {
          shield[1] -= 1
          proj.remove()

          playTune(shieldHitSound)
        }
      }
    }
  }
}
function endgame(){
  setMap(end)
  for (let i of intervals){clearInterval(i)}
  clearText()
  if (numEnemies <= 0) {
    addText(winmessage, {x: 7, y: 7, color: color`2`})
    
    playTune(winSound)
  }
  else {
    addText(losemessage, {x: 7, y: 7, color: color`2`})

    playTune(loseSound)
  }
  addText("SCORE: " + ( (72-numEnemies) * 100 + (UFOKilled * 500)).toString(), {x: 5, y: 6, color: color`2`})
  addText("PRESS J TO RESET", {x: 2, y: 8, color: color`2`})
}
function enemyProjectileMove(){
  for (let proj of getAll(enemyProjectile)){
    proj.y += 1
  }
}
function UI(){
  clearText()
  for (let i = 0; i < 4; i++){clearTile(8 + i, 3)}
  addText("SCORE: " + ( (72-numEnemies) * 100 + (UFOKilled * 500)).toString(), { x: 5, y: 1, color: color`2`})
  for (let i = 0; i < playerLives; i++){ addSprite(8 + i, 3, liveIcon)}

}
function UFOStart(){
  addSprite(0, 4, UFOL)
  addSprite(1, 4, UFOR)
  UFOActive = true
  playTune(UFOSound)
}
function UFOMove(){
  if (UFOActive){
    let l = getFirst(UFOL)
    let r = getFirst(UFOR)

    l.x += 1
    r.x += 1

      if (r.x + 1 >= width()) {
        UFORemove()
    }
  }
}
function UFORemove(){
      getFirst(UFOL).remove()
      getFirst(UFOR).remove()
      UFOActive = false
      playTune(UFOSound)
}
function restartIntervals(){
  for (let i of intervals){
    clearInterval(i)
  }
  enemyMoveInterval = setInterval(enemyMove, 1000)
  updateShieldStateInterval = setInterval(updateShieldState, 5)
  playerProjectileMoveInterval = setInterval(playerProjectileMove, 20)
  playerProjectileCollisionInterval = setInterval(playerProjectileCollision, 20)
  enemyShootInterval = setInterval(enemyShoot, 1000)
  enemyProjectileMoveInterval = setInterval(enemyProjectileMove, 125)
  enemyProjectileCollisionInterval = setInterval(enemyProjectileCollision, 125)
  UIInterval = setInterval(UI, 125)
  UFOMoveInterval = setInterval(UFOMove, 250)
  intervals = [enemyMoveInterval, 
                 updateShieldStateInterval, 
                 playerProjectileMoveInterval,
                 playerProjectileCollisionInterval,
                 enemyShootInterval,
                 enemyProjectileMoveInterval,
                 enemyProjectileCollisionInterval,
                 UIInterval,
                 UFOMoveInterval
                ]
}
//function enemyMoveInteval 


let enemyMoveInterval = setInterval(enemyMove, 1000)
let updateShieldStateInterval = setInterval(updateShieldState, 125)
let playerShootCooldownInterval = setInterval(() => {if (playerShootCooldown == 1) {playerShootCooldown = 0}}, playerShootCooldownDuration)
let playerProjectileMoveInterval = setInterval(playerProjectileMove, 20)
let playerProjectileCollisionInterval = setInterval(playerProjectileCollision, 20)
let enemyShootInterval = setInterval(enemyShoot, 1000)
let enemyProjectileMoveInterval = setInterval(enemyProjectileMove, 125)
let enemyProjectileCollisionInterval = setInterval(enemyProjectileCollision, 125)
let UIInterval = setInterval(UI, 125)
let UFOMoveInterval = setInterval(UFOMove, 250)

let intervals = [enemyMoveInterval, 
                 updateShieldStateInterval,  
                 playerProjectileMoveInterval,
                 playerProjectileCollisionInterval,
                 enemyShootInterval,
                 enemyProjectileMoveInterval,
                 enemyProjectileCollisionInterval,
                 UIInterval,
                 UFOMoveInterval
                ]
onInput("a", () => {getFirst(player).x -= 1})
onInput("d", () => {getFirst(player).x += 1})
onInput("i", playerShoot)
onInput("j", start)

enter()
