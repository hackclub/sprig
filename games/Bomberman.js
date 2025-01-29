/*
@title: Bomberman
@author: Jahn
@tags: ['action','multiplayer']
@addedOn: 2024-07-02
*/

/*
  Hey there! This is a Bomberman game I made over the course of three days!
  Code and Art are completely original made by me.
  
  The controls are the following:
  Player 1 - Move: WASD
  Player 2 - Move: IJKL

  Every time you start the game, a new random map will be selected!
  
  To place bombs, simply run into a collidable wall three times, you will hear a
  noise progressively pitching up to notify you of your placing progress!
  
  Bombs only damage the players the instant they explode

  There are also two upgrades:
  The range upgrade, which increases the range of the blast
  and The amount upgrade, which lets you have more placed bombs at once!

  These have a 25% chance of dropping from any broken wall!

  Have fun, and I hope you enjoy the game!
*/

let gameOver = false;

let bombSpeed = 1000
let player1BombRange = 1;
let player1RemainingBombs = 1;

let player2BombRange = 1;
let player2RemainingBombs = 1;

const player1PlaceProgress0 = tune`
500: 20-500,
15500`
const player1PlaceProgress1 = tune`
500: 40-500,
15500`
const player1PlaceProgress2 = tune`
500: 60-500,
15500`

const player2PlaceProgress0 = tune`
500: 70-500,
15500`
const player2PlaceProgress1 = tune`
500: 80-500,
15500`
const player2PlaceProgress2 = tune`
500: 90-500,
15500`

const collectUpgrade = tune`
120: G4-220,
120: A4-220,
120: B4-220,
120: D5-220,
3360`
const gameOverTune = tune`
100: D4-100,
100: F4-100,
100: A4-100,
100: E5-100,
2800`

const bombWarning = tune`
500: B5~500,
15500`
const bombExplodeSound = tune`
500: 15-2000+30-2000+40-500,
15500`

const player1 = "p"
const player2 = "q"
const tomb = "r"
const wall = "w"
const brick = "b"
const background = "g"
const bomb1 = "x"
const bomb2 = "y"
const bomb3 = "z"
const explosionCenter = "0"
const explosionHorizontal = "1"
const explosionVertical = "2"
const amountUpgrade = "u"
const rangeUpgrade = "i"

setLegend(
  [ player1, bitmap`
................
....33333333....
..333333333333..
..332233332233..
..332233332233..
..333333333333..
..333222222333..
....33333333....
......3333......
.33333333333333.
.33333333333333.
......3333......
..333333333333..
..333333333333..
.333........333.
.33..........33.` ],
  [ player2, bitmap`
................
....55555555....
..555555555555..
..552255552255..
..552255552255..
..555555555555..
..555222222555..
....55555555....
......5555......
.55555555555555.
.55555555555555.
......5555......
..555555555555..
..555555555555..
.555........555.
.55..........55.` ],
  [ wall, bitmap`
LL22222222222222
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LL11111111111112
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ brick, bitmap`
1111111LLL111111
11111111L1111111
11111111L1111111
1111111LLL111111
LLLLLLLLLLLLLLLL
1111111111111LLL
11111111111111L1
11111111111111L1
11111111111111L1
1111111111111LLL
LLLLLLLLLLLLLLLL
11LLL11111111111
111L111111111111
111L111111111111
11LLL11111111111
LLLLLLLLLLLLLLLL`],
  [ bomb1, bitmap`
................
.......33.......
.......CC.......
.......CC.......
.......CC.......
....000CC000....
..000000000000..
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
..000000000000..
....00000000....`],
  [ bomb2, bitmap`
................
................
.......33.......
.......99.......
.......CC.......
....000CC000....
..000000000000..
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
..000000000000..
....00000000....`],
  [ bomb3, bitmap`
................
................
................
................
.......33.......
....00099000....
..000000000000..
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
..000000000000..
....00000000....`],
  [ explosionCenter, bitmap`
..399666666993..
..399666666993..
3333966939693333
3339923292233333
9999392222999339
6639223622239996
6666262222629366
6692222222222266
6662222222262396
6693222222226996
9993262222262936
9933922223299999
3333332992993339
3333399639933333
..339966699333..
..399666669993..`],
  [ explosionHorizontal, bitmap`
................
..333.....333...
3333333333333333
9993333333339999
9999999999999999
6666666999996666
6666666666666666
6666666666666666
6666666666666666
6666666996666666
6666999999996666
9999999999999999
9933333333333999
3333333333333333
.3333...333333..
................`],
  [ explosionVertical, bitmap`
..399666666993..
.3399666666993..
.33396666669933.
.33396666669333.
.33399666669333.
..339966666933..
..339966666933..
..339996669933..
.3339996669933..
.3339966669933..
.33399666699333.
.33399666699333.
.33396666669933.
.3399666666993..
..399666666993..
..399666666993..`],
  [ tomb, bitmap`
................
....LLLLLLLL....
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.L0000L000L000L.
.L0LL0LL0LL0L0L.
.L0000LL0LL0L0L.
.L0L0LLL0LL000L.
.L0LL0LL0LL0LLL.
.L0LL0L000L0LLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.`],
  [ amountUpgrade, bitmap`
................
................
.........3......
........C.......
......0000......
.....000000.....
....00000000....
....00000000....
....00000000....
....00000004....
.....0000004....
......00044444..
.........DD4DD..
...........4....
...........D....
................`],
  [ rangeUpgrade, bitmap`
................
................
................
...3.........3..
..3.333333333...
...99999999969..
...66666666696..
..6.66666666.6..
...6666666666...
...96666666469..
...3999999949...
....3333344444..
...33....DD4DD..
...........4....
...........D....
................`]
)

setSolids([player1, player2, wall, brick, bomb1, bomb2, bomb3, tomb])

const levels = [
  map`
wbbwbbwbbwbwbbw
wbbbbbbbbbbbbbw
wbwbwbwbwbwbwbw
w..bbbbbbbbb..w
wpwbwbwbwbwbwqw
w..bbbbbbbbb..w
wbwbwbwbwbwbwbw
wbbbbbbbbbbbbbw
wbwbwbwbwbwbwbw
wbbbbbbbbbbbbbw
wbbwbwbwbwbwbbw
wbbbbbbbbbbbbbw`,
  map`
wbbbwbbbwbbbw.q
bbwbbbwbbbwbb.w
wbbbwbbbwbbbwbb
bbwbbbwbbbwbbbw
wbbbwbbbwbbbwbb
bbwbbbwbbbwbbbw
wbbbwbbbwbbbwbb
bbwbbbwbbbwbbbw
wbbbwbbbwbbbwbb
bbwbbbwbbbwbbbw
w.bbwbbbwbbbwbb
p.wbbbwbbbwbbbw`,
  map`
wbbwbbbwbbbw.qw
wbbwbbbwbbbwb.w
wbbbbbwwwbbbbbw
wbwwwbbbbbwwwbw
wbbwbbbwbbbwbbw
wbbwbwbbbwbwbbw
wbbwbwbbbwbwbbw
wbbwbbbwbbbwbbw
wbwwwbbbbbwwwbw
wbbbbbwwwbbbbbw
w.bwbbbwbbbwbbw
wp.wbbbwbbbwbbw`,
  map`
bbbbbbw.wbbbbbb
bbbbwb.q.bwbbbb
bbbbbbw.wbbbbbb
wbbbbbbbbbbbbbw
bwbbwbbwbbwbbwb
bbbwbbbbbbbwbbb
bbbwbbbbbbbwbbb
bwbbwbbwbbwbbwb
wbbbbbbbbbbbbbw
bbbbbbw.wbbbbbb
bbbbwb.p.bwbbbb
bbbbbbw.wbbbbbb`,
  map`
bbbbbbbbbbbbbbb
bbwwbb.q.bbwwbb
bbbbbbbbbbbbbbb
bbbbbbbwbbbbbbb
wbbbbbbbbbbbbbw
wbbbbwwwwwbbbbw
wbbbbwwwwwbbbbw
wbbbbbbbbbbbbbw
bbbbbbbwbbbbbbb
bbbbbbbbbbbbbbb
bbwwbb.p.bbwwbb
bbbbbbbbbbbbbbb`,
  map`
wwwwwwwwwwwwwww
bwbbbbbbbbbbbbb
.p.bbwwwwwbbbbb
w.wbbbbbbbbbbbb
bbbbbbwbwbbbbbb
bbbwbbwbwbbwbbb
bbbwbbwbwbbwbbb
bbbbbbwbwbbbbbb
bbbbbbbbbbbbw.w
bbbbbwwwwwbb.q.
bbbbbbbbbbbbbwb
wwwwwwwwwwwwwww`
]

setBackground(background)
setMap(levels[Math.floor(Math.random() * levels.length)])

setPushables({
  [ player1 ]: [],
  [ player2 ]: []
})

function spawnBomb(x, y, range) {
  let tile = addSpriteReturn(x, y, bomb1);
  setTimeout(function(){updateBombState(tile)}, bombSpeed);
  setTimeout(function(){bombExplode(x, y, range)}, bombSpeed*3);
}

function updateBombState(tile) {
  tile.remove();
  if(tile.type==bomb1) {
    playTune(bombWarning);
    let newTile = addSpriteReturn(tile.x,tile.y,bomb2);
    setTimeout(function(){updateBombState(newTile)}, bombSpeed)
  }
  if(tile.type==bomb2) {
    playTune(bombWarning);
    let newTile = addSpriteReturn(tile.x,tile.y,bomb3);
    setTimeout(function(){updateBombState(newTile)}, bombSpeed)
  }
  if(tile.type==bomb3) {
    playTune(bombExplodeSound);
    tile.remove();
  }
}

function isInBounds(x, y) {
  return(x>=0&&x<15&&y>=0&&y<12)
}

function bombExplode(x, y, range) {
  tryExplode(x, y, explosionCenter)
  for(let i = 1; i<=range; i++) {
    if(isInBounds(x+i, y)) if(tryExplode(x+i, y, explosionHorizontal)==false) break;
  }
  for(let i = 1; i<=range; i++) {
    if(isInBounds(x-i, y)) if(tryExplode(x-i, y, explosionHorizontal)==false) break;
  }
  for(let i = 1; i<=range; i++) {
    if(isInBounds(x, y+i)) if(tryExplode(x, y+i, explosionVertical)==false) break;
  }
  for(let i = 1; i<=range; i++) {
    if(isInBounds(x, y-i)) if(tryExplode(x, y-i, explosionVertical)==false) break;
  }
}

function tryExplode(x, y, sprite) {
  if(gameOver) return false;
  if(getTile(x,y).filter(tile => tile.type==player1).length>0) {
    gameOver=true;
    setTimeout(function(){
      playTune(gameOverTune)
      addText("Player 2 Wins!", {x: 3, y: 7, color: color`5`})
    }, 700);
    let tile = getFirst(player1);
    addSprite(tile.x, tile.y, tomb)
    tile.remove();
    return false;
  }
  if(getTile(x,y).filter(tile => tile.type==player2).length>0) {
    gameOver=true;
    setTimeout(function(){
      playTune(gameOverTune)
      addText("Player 1 Wins!", {x: 3, y: 7, color: color`3`})
    }, 700);
    let tile = getFirst(player2);
    addSprite(tile.x, tile.y, tomb)
    tile.remove();
    return false;
  }
  if(getTile(x,y).filter(tile => tile.type==wall).length==0) {
    const length = getTile(x,y).filter(tile => tile.type==brick).length;
    getTile(x,y).forEach(tile => tile.remove());

    if(length>0) {
      const randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber < 20) {
        const randomNumber2 = Math.floor(Math.random() * 100)
        if(randomNumber2>=50) {
          addSprite(x,y,amountUpgrade);
        } else {
          addSprite(x,y,rangeUpgrade);
        }
      }
    }
    
    let explosion = addSpriteReturn(x,y,sprite);
    setTimeout(function(){explosion.remove();}, bombSpeed)
    return true;
  }
  return false;
}

function addSpriteReturn(x, y, sprite) {
  addSprite(x, y, sprite);
  let filtered = getTile(x,y).filter(tile => tile.type==sprite);
  return filtered[filtered.length-1];
}

function removeSprites(x, y, type) {
  getTile(x,y).filter(tile => tile.type==type).forEach(tile => tile.remove());
}

function hasSprite(x, y, type) {
  return getTile(x,y).filter(tile => tile.type==type).length>0;
}

let player1Moved = false;
let player2Moved = false;

onInput("w", () => {
  if(gameOver) return;
  getFirst(player1).y-=1
  player1Moved = true;
})
onInput("a", () => {
  if(gameOver) return;
  getFirst(player1).x-=1
  player1Moved = true;
})
onInput("s", () => {
  if(gameOver) return;
  getFirst(player1).y+=1
  player1Moved = true;
})
onInput("d", () => {
  if(gameOver) return;
  getFirst(player1).x+=1
  player1Moved = true;
})
onInput("i", () => {
  if(gameOver) return;
  getFirst(player2).y-=1
  player2Moved = true;
})
onInput("j", () => {
  if(gameOver) return;
  getFirst(player2).x-=1
  player2Moved = true;
})
onInput("k", () => {
  if(gameOver) return;
  getFirst(player2).y+=1
  player2Moved = true;
})
onInput("l", () => {
  if(gameOver) return;
  getFirst(player2).x+=1
  player2Moved = true;
})

let player1CollisionAmount = 0;
let player2CollisionAmount = 0;
let player1PreviousX = getFirst(player1).x;
let player1PreviousY = getFirst(player1).y;
let player2PreviousX = getFirst(player2).x;
let player2PreviousY = getFirst(player2).y;

afterInput(() => {
  if(gameOver) return;

  doUpgradeCollision();
  
  if(player1Moved) {
    //Check if the player tried to move, but couldn't (collided), and if he still has remaining bombs
    if(player1PreviousX==getFirst(player1).x && player1PreviousY==getFirst(player1).y && player1RemainingBombs>0) {
      player1CollisionAmount++;

      //Play the different stages of bomb placing sounds
      if(player1CollisionAmount==1) playTune(player1PlaceProgress0);
      if(player1CollisionAmount==2) playTune(player1PlaceProgress1);
      if(player1CollisionAmount==3) playTune(player1PlaceProgress2);

      //Place the bombs and start a timeout for a function to replenish the remaining bomb amount
      if(player1CollisionAmount>=3) {
        player1RemainingBombs--;
        spawnBomb(getFirst(player1).x, getFirst(player1).y, player1BombRange);
        setTimeout(function(){player1RemainingBombs++;}, bombSpeed*4);
        player1CollisionAmount=0;
      }
    } else {
      //Player didn't collide, reset the collision amount
      player1CollisionAmount=0;
    }
  }

  if(player2Moved) {
    //Check if the player tried to move, but couldn't (collided), and if he still has remaining bombs
    if(player2PreviousX==getFirst(player2).x && player2PreviousY==getFirst(player2).y && player2RemainingBombs>0) {
      player2CollisionAmount++;

      //Play the different stages of bomb placing sounds
      if(player2CollisionAmount==1) playTune(player2PlaceProgress0);
      if(player2CollisionAmount==2) playTune(player2PlaceProgress1);
      if(player2CollisionAmount==3) playTune(player2PlaceProgress2);

      //Place the bombs and start a timeout for a function to replenish the remaining bomb amount
      if(player2CollisionAmount>=3) {
        player2RemainingBombs--;
        spawnBomb(getFirst(player2).x, getFirst(player2).y, player2BombRange);
        setTimeout(function(){player2RemainingBombs++;}, bombSpeed*4);
        player2CollisionAmount=0;
      }
    } else {
      //Player didn't collide, reset the collision amount
      player2CollisionAmount=0;
    }
  }
  
  player1PreviousX = getFirst(player1).x;
  player1PreviousY = getFirst(player1).y;
  player2PreviousX = getFirst(player2).x;
  player2PreviousY = getFirst(player2).y;
  player1Moved = false;
  player2Moved = false;
})

function doUpgradeCollision() {
  //Player 1 Check
  if(hasSprite(getFirst(player1).x, getFirst(player1).y, amountUpgrade)) {
    removeSprites(getFirst(player1).x, getFirst(player1).y, amountUpgrade);
    player1RemainingBombs++;
    playTune(collectUpgrade);
  }

  if(hasSprite(getFirst(player1).x, getFirst(player1).y, rangeUpgrade)) {
    removeSprites(getFirst(player1).x, getFirst(player1).y, rangeUpgrade);
    player1BombRange++;
    playTune(collectUpgrade);
  }

  //Player 2 Check
  if(hasSprite(getFirst(player2).x, getFirst(player2).y, amountUpgrade)) {
    removeSprites(getFirst(player2).x, getFirst(player2).y, amountUpgrade);
    player2RemainingBombs++;
    playTune(collectUpgrade);
  }

  if(hasSprite(getFirst(player2).x, getFirst(player2).y, rangeUpgrade)) {
    removeSprites(getFirst(player2).x, getFirst(player2).y, rangeUpgrade);
    player2BombRange++;
    playTune(collectUpgrade);
  }
}
