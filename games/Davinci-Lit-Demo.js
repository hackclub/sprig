/*
@title: Davinci Lit Trivia
@author: RubixTV
@tags: []
@addedOn: 2024-05-20
@img: ""
*/

const player = "p"
const brick = "b"
const mystery = "m"
const usedMystery = "u"
const stembody = "i"
const stemtop = "h"
const run = "w"
const enemy = "e"
const explosion = "x"
const pink = "r"
const heart = "l"
const blue = "q"
const cloud1 = "k"
const Sun = "j"
const cloud3 = "z"
const acid = "y"

let playerUpwardsVel = -1
let runSpawn = 0;
let maxJump = 2;
let health = 3;
let gameover = false;

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
..444...........
..4D.4..........
..4.D400........
...440330.......
....037360......
....037360......
...00333300.....
....000000......
.....0..0.......` ],
  [ brick, bitmap`
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L`],
  [ mystery, bitmap`
4444444444444444
4222222222222224
4233333333333324
4233333333333324
4233333333333324
4222223333222224
4444423333244444
4444423333244444
4444423333244444
4444423333244444
4222223333222224
4233333333333324
4233333333333324
4233333333333324
4222222222222224
4444444444444444`],
  [ usedMystery, bitmap`
DDDDDDDDDDDDDDDD
D11111111111111D
D1CCCCCCCCCCCC1D
D1CCCCCCCCCCCC1D
D1CCCCCCCCCCCC1D
D11111CCCC11111D
DDDDD1CCCC1DDDDD
DDDDD1CCCC1DDDDD
DDDDD1CCCC1DDDDD
DDDDD1CCCC1DDDDD
D11111CCCC11111D
D1CCCCCCCCCCCC1D
D1CCCCCCCCCCCC1D
D1CCCCCCCCCCCC1D
D11111111111111D
DDDDDDDDDDDDDDDD`],
  [ stembody, bitmap`
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......
...666666666....
...666666666....`],
  [ stemtop, bitmap`
....HH666.......
...HHH666.......
..HHHH666.......
.H000H666.......
HH0HHH666.......
HH0H0H666.......
.H000H666.......
..HHHH666.......
...HHH666.......
....HH666.......
......666.......
......666.......
......666.......
......666.......
......666.......
......666.......`],
  [ run, bitmap`
................
................
.......6........
......696.......
.....69996......
.....69996......
....6999996.....
....6999996.....
....6669666.....
......696.......
......696.......
......696.......
....6.696.6.....
....6.....6.....
....6.6.6.6.....
....6.6.6.6.....`],
  [ enemy, bitmap`
.....DD.........
.....D.D........
......DD........
...0000000000...
...0999999990...
...099D99D990...
....09D99D90....
....09D99D90....
...0009999000...
.....099990.....
......0990......
......0000......
......0..0......
................
................
................`],
  [ explosion, bitmap`
.....00000....0.
...003333300.060
..03336663330.0.
..03666266630...
.0336622266330..
..03366666330...
..00333633300...
....0036300.....
...0..060.......
..090.060.......
...0..060..0....
......060.030...
......060..0....
....0009000.....
...099999990....
..00966666900...`],
  [ pink, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [ heart, bitmap`
................
................
................
................
..0000....0000..
.0HHHH0..0HHHH0.
0H22HHH00HHHHHH0
0H2HHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
.0HHHHHHHHHHHH0.
..0HHHHHHHHHH0..
...0HHHHHHHH0...
....0HHHHHH0....
.....0HHHH0.....
......0HH0......
.......00.......`],
  [ blue, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ cloud1, bitmap`
................
................
................
................
................
.22.2222222.....
22222222222222..
2222222222222222
2222222222222222
2222222222222222
22222222222222..
.2222222222222..
.....2222.......
................
................
................`],
  [ Sun, bitmap`
......6.........
6.....6.....6...
.6.........6....
...6666666......
...6666666......
...6666666......
...6666666......
66.6666666.66...
...6666666......
...6666666......
.6.........6....
6.....6.....6...
......6.........
................
................
................`],
  [ cloud3, bitmap`
................
................
................
..11......1.....
.111.11111111...
.111111111111.1.
111111111111111.
1111111111111111
1111111111111111
..11111111111111
..11111111111111
...1111111111111
.....1111.111111
...........11...
................
................`],
  [ acid, bitmap`
55D4554DDD4D5545
D44DD5DDD5DD5DDD
D55544DDD5DDD55D
5555444D55D4DDD5
DD4DDDD55DD44DDD
4DDD55555444455D
4DD55D455DD4454D
4D54444DD555DDD4
DD55D4DDDDD555D5
5555D44DD44DD4D5
D545D44D5544D4DD
554DDDD5D55DDDDD
DD4D44DDDDD54D55
555DD5554D55DDDD
444D44DDDD55D544
4D444DD55DD5D554`]
)

setSolids([player, brick, mystery, usedMystery, stembody, stemtop])

let level = 0
const levels = [
  map`
lll....zk..........
j...z.k..zkz.......
.zk....k...........
...kz............hb
..bbbb..........bib
..bbmb.........bbbb
..............bbbbb
.............bbbbbb
p.bbb....e..bbbbbbb
bbbbbbbbbbbbbbbbbbb`,
  map`
lll................
......mbb..........
...................
...................
p.....bb.......bbb.
bb...bb.b.....bb...
bb..bbb..b..bbb....
bbybybb...........h
bbybybbe.ee...e...i
bbbbbbbbbbbbbbbbbbb`,
  map`
lll..z..z..z..k....
j.....k.k...z..k...
.........k.........
...bmbbb..........h
............bbb...i
..b........bbb.ebbb
...bbb....bybbyyybb
........byyybyyyybb
pe..e.bbbyyybyyyybb
bbbbbbbbbbbbbbbbbbb`,
  map`
lll.j......zz.zk.z.
...........k.k.z.z.
h.bybbeebb.........
ibbybbbbmb.........
b..................
......bee.b........
.....bbbbbb........
.p..b.......e......
bbybyyyyyyyyyyyyyyy
bbbbbbbbbbbbbbbbbbb`,
  map`
lllj..zk.z..kzk..z.
by...z.be.e......b.
.bb....bbbbbbbbbbb.
..b..........b.b...
.....bybyybbhb.b...
....ybybybbbib.b...
.b.bybybbbbbbb.m...
...bbbbbbbbbbb.....
p.................e
bbbbbbbbbbbbbbbbbbb`]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("d", () => {
  if(!gameover)
  getFirst(player).x += 1
})

onInput("a", () => {
  if(!gameover)
  getFirst(player).x -= 1
})

onInput("w", () => {
  if(!gameover)
  jump();
})

onInput("i", () => {
  if(!gameover)
  jump();
})
onInput("k", () =>{
  if(gameover)
    restart()
})
onInput("l", () =>{
  if(gameover){
    level = 0;
    restart()
  }
})
afterInput(() => {
  
})

function jump(){
  if(getTile(getFirst(player).x, getFirst(player).y+1) != 0)
    playerUpwardsVel = maxJump;
}

function spawnRun(x,y){
  
  addSprite(x, y, run)
}

function powerUp(){
  maxJump=5;
}

function calculateGravity(playerX, playerY){
  let downTile = getTile(playerX, playerY+1)
  if(playerUpwardsVel > 0) {
      getFirst(player).y--
    playerUpwardsVel--;
  } else if(playerUpwardsVel < 0) {
      getFirst(player).y++
  } else if(downTile == 0)
      playerUpwardsVel = -1;
  else if (downTile.type == cloud1 || downTile.type == Sun || downTile.type == cloud3){
    playerUpwardsVel = -1
  }
}

function moveEnemies(){
  for(const character of getAll(enemy)){
    const num = Math.floor(Math.random() * 2)
    let characterX = character.x;
    let characterY = character.y
    if(num == 0){
      let tile = getTile(characterX-1, characterY)
      if(tile != 0){
        if(tile[0].type != brick && tile[0].type != stembody)
          character.x--
      } else character.x--
    }
    if(num == 1){
      let tile = getTile(characterX+1, characterY)
      if(tile != 0){
        if(tile[0].type != brick && tile[0].type != stembody)
          character.x++
      } else character.x++
    }
  }
}

function takeDamage(){
  health--;
  clearTile(health, 0)
  if(health == 0){
    gameOver(false)
    return;
  }
  setBackground(pink);
}

function nextLevel(){
  level++;
  if(levels.length == level) gameOver(true)
  restart();
}

function gameOver(won){
  gameover = true;
  if(!won){
    addText("Your Not Losing", {x: 1, y: 4, color: color`8`})
    addText("YOUR LEARNING", {x: 1, y: 5, color: color`8`})
    addText("Press K to restart", {x: 1, y: 6, color: color`5`})
    addText("L to go to level 1", {x:1, y:7, color: color`5`})
  }
  if(won){
    addText("Winning", {x: 3, y: 4, color: color`8`})
    addText("is Part of", {x: 1, y: 5, color: color`8`})
    addText("THE GROWTH", {x: 6, y: 6, color: color`8`})
    addText("Press L to restart", {x: 1, y: 9, color: color`5`})
  }
}

function restart(){
  health = 3;
  maxJump = 2;
  setMap(levels[level])
  clearText()
  gameover = false;
}

const explosionTimeout = 10
const damageTimeout = 10
const resetBackgroundTimeout = 5
let lastExplosion = -1;
let lastDamage = -1
let tick = 0;
let playerX
let playerY
  setBackground(blue)
addText("w or i to jump", {x:3, y:4, color: color`5`})
function onTick(){
  if(tick == 40) clearText();
  if(gameover) return;
  if(typeof getFirst(player) == 'undefined'){
    addSprite(playerX, playerY, player)
  }
  playerX = getFirst(player).x
  playerY = getFirst(player).y
  tick++
  try{
    if(getTile(playerX, playerY-1)[0].type == mystery){
      spawnRun(playerX, playerY+1)
      getTile(playerX, playerY-1)[0].type = usedMystery
    }
  } catch(e) {
  }
  try{
    if(getTile(playerX, playerY)[1].type == run){
      powerUp();
      clearTile(playerX, playerY)
      addSprite(playerX, playerY, player)
    }
  } catch(e){
  }
  try{
    if(getTile(playerX, playerY+1)[0].type == enemy){
      clearTile(playerX, playerY+1);
      addSprite(playerX, playerY+1, explosion);
      lastExplosion = tick;
    }
  } catch(e){
  }

  try{
    if(getTile(playerX, playerY+1)[0].type == stemtop){
      nextLevel();
    }
  } catch(e){
  }

  try{
    if(getTile(playerX, playerY)[1].type == enemy || getTile(playerX, playerY)[1].type == acid){
      if(tick-lastDamage > damageTimeout){
        takeDamage();
        lastDamage = tick;
      }
    }
  } catch(e){
  }
  calculateGravity(playerX, playerY);
  if(tick%5 == 0)
    moveEnemies();

  if(tick-lastExplosion == explosionTimeout){
    for(let ex of getAll(explosion)){
      clearTile(ex.x, ex.y)
    }
  }
  if(tick-lastDamage > resetBackgroundTimeout)
  setBackground(blue)
}

setInterval(onTick, 50)
