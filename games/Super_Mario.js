/*
@title: Super_Mario
@author: Cosmin
@tags: ['retro']
@addedOn: 2024-03-01
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const block = "b"
const mystery = "m"
const usedMystery = "u"
const pipeBody = "i"
const pipeHead = "h"
const mushroom = "w"
const enemy = "e"
const explosion = "x"
const red = "r"
const heart = "l"
const blue = "q"
const cloud1 = "k"
const cloud2 = "j"
const cloud3 = "z"
const lava = "y"

let playerUpwardsVel = -1
let mushroomSpawn = 0;
let maxJump = 2;
let health = 3;
let gameover = false;

setLegend(
  [ player, bitmap`
....33333.......
...333333333....
...CCC9909......
..C9C9990999....
..C9CC999C999...
..CC9999CCCC....
....9999999.....
...335333.......
..3335335333....
.333355553333...
.993565565399...
.999555555999...
.995555555599...
...555..555.....
..CCC...CCCC....
.CCCC...CCCCC...` ],
  [ block, bitmap`
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
0000000000000000
CCC0CCCCCCC0CCCC
CCC0CCCCCCC0CCCC
0000000000000000
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
0000000000000000
CCC0CCCCCCC0CCCC
CCC0CCCCCCC0CCCC
0000000000000000
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0
CCCCCCC0CCCCCCC0`],
  [ mystery, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666622222666660
0666226662266660
0666226662266660
0666226662266660
0666666622266660
0666666226666660
0666666226666660
0666666666666660
0666666226666660
0666666226666660
0666666666666660
0666666666666660
0000000000000000`],
  [ usedMystery, bitmap`
LLLLLLLLLLLLLLLL
LFFFFFFFFFFFFFFL
LFFFFFFFFFFFFFFL
LFFFF11111FFFFFL
LFFF11FFF11FFFFL
LFFF11FFF11FFFFL
LFFF11FFF11FFFFL
LFFFFFFF111FFFFL
LFFFFFF11FFFFFFL
LFFFFFF11FFFFFFL
LFFFFFFFFFFFFFFL
LFFFFFF11FFFFFFL
LFFFFFF11FFFFFFL
LFFFFFFFFFFFFFFL
LFFFFFFFFFFFFFFL
LLLLLLLLLLLLLLLL`],
  [ pipeBody, bitmap`
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.
.0D44DDDD4D4D40.
.0D44DDDDD4D4D0.`],
  [ pipeHead, bitmap`
...0000000000...
..00DDDDDDDD00..
000DD000000DD000
0DDD00000000DDD0
0DDD00000000DDD0
000DD000000DD000
0400DDDDDDDD00D0
04D0000000000D40
04D44DDDD4D4D4D0
04D44DDDDD4D4D40
04D44DDDD4D4D4D0
04D44DDDDD4D4D40
04D44DDDD4D4D4D0
04D44DDDDD4D4D40
04D44DDDD4D4D4D0
00D44DDDDD4D4D00`],
  [ mushroom, bitmap`
................
................
.....000000.....
...0023333300...
..022333333220..
.02233332233220.
.03333322223320.
0323333222233330
0222333322333320
0323333333333220
0333000000003320
.00022022022000.
..022202202220..
..022222222220..
...0222222220...
....00000000....`],
  [ enemy, bitmap`
......CCCC......
.....CCCCCC.....
....CCCCCCCC....
...CCCCCCCCCC...
..C00CCCCCC00C..
.CCC20CCCC022CC.
.CCC20CCCC02CCC.
CCCC202CC202CCCC
CCCC222CC222CCCC
CCCCCCCCCCCCCCCC
.CCCC222222CCCC.
....22222222....
..002222222200..
.0000022220000..
.000000..00000..
..00000..00000..`],
  [ explosion, bitmap`
................
....00000.......
..00099900000...
.00333366999900.
.093996366933300
.0399339363333.0
0939336663333330
0933396262369330
0933966266339330
0933662233939930
.039366326663330
.039333666639900
.09333399939900.
.0939963663900..
.000009963300...
.....0000000....`],
  [ red, bitmap`
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
  [ heart, bitmap`
................
................
................
................
..0000....0000..
.033330..033330.
0322333003333330
0323333333333330
0333333333333330
.03333333333330.
..033333333330..
...0333333330...
....03333330....
.....033330.....
......0330......
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
  [ cloud2, bitmap`
................
................
................
................
...2222222.22...
.2222222222222..
.22222222222222.
2222222222222222
2222222222222222
2222222222222222
2222222222222222
......222222222.
.......222......
................
................
................`],
  [ cloud3, bitmap`
................
................
................
..22......2.....
.222.22222222...
.222222222222.2.
222222222222222.
2222222222222222
2222222222222222
..22222222222222
..22222222222222
...2222222222222
.....2222.222222
...........22...
................
................`],
  [ lava, bitmap`
6363636369966336
3936966696999363
6996399939939999
3399369963699633
3639699663639993
3669963369993393
9993333663336363
6699699363366363
3336993333696663
6699969966699963
3693639639936993
9969699699396696
3399999696993369
6993999339966363
9936993699666366
3663933693366336`]
)

setSolids([player, block, mystery, usedMystery, pipeBody, pipeHead])

let level = 0
const levels = [
  map`
lll....kk..........
....kkk..kkkk......
.kk...jj...........
...zzj...........h.
................bi.
..bbmb........bbbbb
..............bbbbb
..............bbbbb
p.bbb....e...bbbbbb
bbbbbbbbbbbbbbbbbbb`,map`
lll................
......mbb..........
...................
.p.................
bb.b.bb........bbbb
bb.b.bb.......bb...
bb.b.bb.....bbb....
bbybybb...........h
bbybybbe.ee...e...i
bbbbbbbbbbbbbbbbbbb`,map`
lll................
..................h
..................i
....mbbb..........i
..................i
...........bb..e.bb
...bbb.....bbyyyybb
........byyybyyyybb
pe....bybyyybyyyybb
bbbbybbbbbbbbbbbbbb`,map`
lll................
...................
..byeyeebb.........
h.bbbbbbmb.........
i..................
i.....beeeb........
i....b.bbb.........
ip..b..............
bbybyyyyyyyybbbbbbb
bbbbbbbbbbbbbbbbbbb`,map`
lll..........b.....
by.....be.......b..
.bb.....bbbbbbbbbb.
..b..........b.b...
.....bybyybbhb.b...
....ybybyb..bb.b...
.b.bybybbb..b..m..b
...bb..bb....b.....
...................
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

function spawnMushroom(x,y){
  
  addSprite(x, y, mushroom)
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
  else if (downTile.type == cloud1 || downTile.type == cloud2 || downTile.type == cloud3){
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
        if(tile[0].type != block && tile[0].type != pipeBody)
          character.x--
      } else character.x--
    }
    if(num == 1){
      let tile = getTile(characterX+1, characterY)
      if(tile != 0){
        if(tile[0].type != block && tile[0].type != pipeBody)
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
  setBackground(red);
}

function nextLevel(){
  level++;
  if(levels.length == level) gameOver(true)
  restart();
}

function gameOver(won){
  gameover = true;
  if(!won){
    addText("The more you lose", {x: 1, y: 4, color: color`3`})
    addText("The more you gain", {x: 1, y: 5, color: color`3`})
    addText("Press K to restart", {x: 1, y: 6, color: color`0`})
    addText("L to go to level 1", {x:1, y:7, color: color`0`})
  }
  if(won){
    addText("It's never just", {x: 3, y: 4, color: color`0`})
    addText("A game when you're", {x: 1, y: 5, color: color`0`})
    addText("Winning", {x: 6, y: 6, color: color`0`})
    addText("Press L to restart", {x: 1, y: 9, color: color`0`})
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
addText("w or i to jump", {x:3, y:4, color: color`0`})
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
      spawnMushroom(playerX, playerY+1)
      getTile(playerX, playerY-1)[0].type = usedMystery
    }
  } catch(e) {
  }
  try{
    if(getTile(playerX, playerY)[1].type == mushroom){
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
    if(getTile(playerX, playerY+1)[0].type == pipeHead){
      nextLevel();
    }
  } catch(e){
  }

  try{
    if(getTile(playerX, playerY)[1].type == enemy || getTile(playerX, playerY)[1].type == lava){
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
