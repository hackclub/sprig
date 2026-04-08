/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Heaven or hell?
@author: Hector Ninaquispe
@addedOn: 2026-02-02
description:Get to the final portal and avoid enemies. Use platforms to help you, and choose between heaven or hell. Press 'a' to move left, 'd' to move right, 'w' to jump, 'i' to dash, 'l'to reload the current level and 'k' to choose a different world
*/


//Variables:
const player = "p"
const enemy = "o"
const heavenEnemy = "k"
const hellEnemy = "l"

const ground = "e"
const hellGround = "r"
const hellGround2 = "b"
const heavenGround = "t"
const drakness = "d"
const hellport = "h"
const heavenport = "a"
const sky = "m"
const sky2 = "n"
const jumpPower = "w"
const superdash = "s"


let timer = 600

//Sprites:
setLegend(
  [ player, bitmap`
.......444......
........F.......
......66666.....
.....6666666....
....666464666...
....666666666...
....666444666...
.....6666666....
.......666......
......66666.....
..446666666664..
.44666666666664.
.4.66666666666.4
44..666666666...
....666666666...
......46464.....` ],
  [ sky, bitmap`
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
  [ sky2, bitmap`
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
  [ enemy, bitmap`
................
................
....3333333.....
..433DDDDD334...
..40DDDDDDD04...
..400DDDDD004...
..33D0DDD0D33...
..33D7DDD7D33...
..330DDDDD033...
...3300D0033....
....3300033.....
.....33333......
.....33333......
......DDD.......
......DDD.......
.......D........` ],
  [ hellEnemy, bitmap`
................
................
.....CCCCCCC....
...9CC99999CC9..
...90999999909..
...90099999009..
...CC2029202CC..
...CC9C999C9CC..
.FFCC0999990CCFF
..FFCC00900CCFF.
...FFCC000CCFF..
....FFCCCCCFF...
....FFCCCCCFF...
.....FFFFFFF....
.......FFF......
........F.......` ],
  [ heavenEnemy, bitmap`
LL............LL
77L..........L77
777L5555555.L777
7705577777550777
7700777777700777
770007777700077L
L7557077707557L.
.L55777777755L..
..55077777055...
...550070055....
....5500055.....
.....55555......
.....55555......
.....L777L......
.....L777L......
......L7L.......` ],
  
  [ ground, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CDCDCCDDDDDDCCDC
CCCDCCCCDCCDCCDC
CCCDCCCCDCCDCCDC
CCCCCCCCCCCDCCDC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ hellGround, bitmap`
9999999999999999
0000333.33L33.CL
CCC0003333C33C33
00CCC0033033C333
L00CCC0000033303
LC0C33CCCC000000
L3.0003CCCCCCCCC
0333300000C00000
000003333000333L
CCCC000C333.3CLL
0CCCCC0000333.3L
033333CCC0000333
03.33CCCCC0C0300
0CCCCC.CCCCC000C
000000C00CCCCC30
3333330000000000`],
  [ hellGround2, bitmap`
DDDDDDDDDDDDDDDD
0000333.33L33.CL
CCC0003333C33C33
00CCC0033033C333
L00CCC0000033303
LC0C33CCCC000000
L3.0003CCCCCCCCC
0333300000C00000
000003333000333L
CCCC000C333.3CLL
0CCCCC0000333.3L
033333CCC0000333
03.33CCCCC0C0300
0CCCCC.CCCCC000C
000000CDDCCCCC3D
DDDDDDDDDDDDDDDD`],
  [ heavenGround, bitmap`
2277722222222777
7772222222222277
7722222222222227
7222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
7222222222222222
7722222222222277
7777722222277777
7777777777777777
7777777777777777
7777777777777777`],
  [ drakness, bitmap`
0000000000000000
0000000000000LL0
000LL00000000000
00000000L0L00000
0000000000000000
0000000000000L00
000000L000000000
0000000000000000
0000000000LL0000
0000L00000000000
0000000000000000
00000000LL0L0000
0000000000000000
0000000000000000
000L00000000LL00
0000000000000000`],
  [ heavenport, bitmap`
................
.......5555.....
.....55555.5....
....5.......5...
...5...5555.55..
..55..5...5..55.
.55..5.....5...5
.5..55.55...5..5
.5..5..555.5..5.
...5..5.5..5.55.
...5.5....5..5..
...5..5..5..5...
....5..55..5....
.....5....5.....
......5..5......
.......555......`],
  [ hellport, bitmap`
................
.......3333.....
.....33333.3....
....3.......3...
...3...3333.33..
..33..3...3..33.
.33..3.....3...3
.3..33.33...3..3
.3..3..333.3..3.
...3..3.3..3.33.
...3.3....3..3..
...3..3..3..3...
....3..33..3....
.....3....3.....
......3..3......
.......333......`],

  [ jumpPower, bitmap`
................
...000....000...
..005000000500..
.05555000055550.
0055555005555500
.05555500555550.
..055550055550..
...0055005500...
....05500550....
..000550055000..
...0055005500...
....00500500....
.....000000.....
................
................
................`],
  [ superdash, bitmap`
...06.06.60.06..
...06.06.60.06..
...00606.00.06..
....0606.06.06..
....0606.06006..
.0..0606.060660.
..0.0606.06060..
...00606.0600...
666.0......0.666
0066.00..00.6600
.0066..00..6600.
..00666..66600..
....00666600....
.....000000.....
................
................`]
)

//Music:
let side = tune`
141.50943396226415: A4^141.50943396226415 + G4~141.50943396226415,
141.50943396226415: G4~141.50943396226415 + A4^141.50943396226415 + G5-141.50943396226415,
141.50943396226415: B4^141.50943396226415 + F5^141.50943396226415 + E4-141.50943396226415,
141.50943396226415,
141.50943396226415: E5-141.50943396226415 + C5~141.50943396226415 + A4~141.50943396226415,
141.50943396226415: F5-141.50943396226415,
141.50943396226415: F4-141.50943396226415 + C5^141.50943396226415 + G5-141.50943396226415,
141.50943396226415: B4^141.50943396226415 + F5-141.50943396226415,
141.50943396226415: B4^141.50943396226415 + A4~141.50943396226415 + D4~141.50943396226415,
141.50943396226415: E5-141.50943396226415,
141.50943396226415: F5^141.50943396226415,
141.50943396226415: B4^141.50943396226415 + A4^141.50943396226415 + G4~141.50943396226415 + E5^141.50943396226415,
141.50943396226415: A4-141.50943396226415,
141.50943396226415: A4-141.50943396226415,
141.50943396226415: G4-141.50943396226415,
141.50943396226415: G4-141.50943396226415,
141.50943396226415: E4^141.50943396226415 + D5^141.50943396226415 + F5^141.50943396226415,
141.50943396226415: E5^141.50943396226415,
141.50943396226415,
141.50943396226415: C5^141.50943396226415 + A4^141.50943396226415 + G4-141.50943396226415,
141.50943396226415: B4^141.50943396226415 + C5-141.50943396226415 + A4-141.50943396226415,
141.50943396226415: B4/141.50943396226415,
141.50943396226415: F4-141.50943396226415 + C5/141.50943396226415,
141.50943396226415: D5/141.50943396226415,
141.50943396226415: A4^141.50943396226415 + G4~141.50943396226415,
141.50943396226415: A5-141.50943396226415,
283.0188679245283,
141.50943396226415: F5^141.50943396226415 + B4-141.50943396226415,
141.50943396226415: E4-141.50943396226415 + G4~141.50943396226415,
141.50943396226415: G4^141.50943396226415 + B4/141.50943396226415,
141.50943396226415`
const win = tune`
329.6703296703297: F4/329.6703296703297 + C4~329.6703296703297,
329.6703296703297: G4^329.6703296703297 + C4~329.6703296703297,
329.6703296703297: A4/329.6703296703297 + C4~329.6703296703297,
329.6703296703297: B4^329.6703296703297 + C4~329.6703296703297,
329.6703296703297: C5/329.6703296703297 + C4~329.6703296703297,
329.6703296703297: D5^329.6703296703297 + C4~329.6703296703297,
329.6703296703297: E5/329.6703296703297 + C4~329.6703296703297,
329.6703296703297: F5^329.6703296703297 + C4~329.6703296703297,
329.6703296703297: G5/329.6703296703297 + E4-329.6703296703297,
329.6703296703297: A5/329.6703296703297 + F4-329.6703296703297,
329.6703296703297: B5/329.6703296703297 + G4-329.6703296703297,
329.6703296703297,
329.6703296703297: C4~329.6703296703297,
329.6703296703297: C4~329.6703296703297,
329.6703296703297: C4~329.6703296703297,
329.6703296703297,
329.6703296703297: C5-329.6703296703297,
329.6703296703297: A4-329.6703296703297,
329.6703296703297,
329.6703296703297: G4-329.6703296703297,
329.6703296703297: B4-329.6703296703297,
329.6703296703297,
329.6703296703297: B4-329.6703296703297,
329.6703296703297: C5-329.6703296703297,
2637.3626373626375`
let melody = playTune(side, Infinity)



//Levels:
const level = map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
..........p..........
.........eee.........
........eeeee........
.......eeeeeee.......
......eeeeeeeee......
.....eeeeeeeeeee.....
a...eeeeeeeeeeeee...h
eeeeeeeeeeeeeeeeeeeee`
const redLevels = [
  map`
p................
.................
........n........
...........l.....
.................
.................
.................
.................
.................
.................
.................
.................
................h`,
  map`
p................
rr...............
rr..............h
rrr.............h
rrrr............h
rrrrr...........h
rrdrrrs.........h
dddddrr.........h
rrddddrr........h
rrrddddrddr.....h
rrrrddddddrrrrr.h
rrrrrddddddddrrrr
rrrrrrrrrrrrrrrrr`,
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
p................
r................
rrrrrrrr....rrr..
rddddddrrrrhhhrrr`,
  map`
rrrrrrrpddrrrrrrr
dddddddrddddddddr
dddddddrdrddddddr
dddddddrddddddddr
dddddddrddrrddddr
dddddddrddddddrdr
dddddddrddddddddr
dddddddrddddrdddr
dddddddrddddddddr
dddddddrddrdddddh
ddddddddddddddddh
rrrrrrddrdllldddh
rrrrrrrdddrrrrrdr`,
  map`
rrrrrrrhhhrrrrrrr
dddddddbddddddddr
ddddddddrbddddddr
dddddddddddddddbr
ddddddddddrrddd.r
dddddddddddddbrdr
ddddddddddddddddr
dddddddddddbrdddr
ddddddddddddddddr
dddddddddbrdddddr
ddddddbdddddddddr
pdddddddrdddddddr
rrlrllllllllllllr`,
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
................h
................h
p...............h
b..rrrrlllrrrrrlr`,
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
.....b..........h
................h
p...............h
rllbllllrrlllrrrr`,
  map`
p..ll............
rr.rr.rrrrrrrr...
.lb..bl.l........
.l....l..l....rrr
.llllll......r...
..........l.r...h
........rrlr....h
..rrrrrr..l.....h
..r.............h
..r.............h
........l......lh
........l......lh
b.rrrrblllbrrrblr`,
  map`
l...............p
l.............lrr
l......lrrlrrl.l.
lll..rr........l.
l..............l.
l..bbllrr..l...l.
l..r.....lrr...l.
l..r.........rrl.
l..r.rllrrrrb..l.
l..r...........lh
l..rrrrrrrrrll.lh
l...............h
llllrrrlllrrrrrlr`,
  map`
.................
.................
....llllll.......
......llll.......
.......ll........
......ll.........
......ll.........
.....llll........
.................
.................
.................
p................
rrrrrrrrrrrrrrrrr`,
]
const blueLevels = [
  map`
................p
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
a................`,
  map`
a................
t................
t................
ttt..............
tttt.............
ttttt............
tttttt...........
ttttttt..........
tttttttt.........
ttttttttt........
ttttttttt........
tttttttttw......p
ttttttttttttttttt`,
  map`
.................
.................
........a........
......ttt........
.................
..t..............
.....t...........
.t......tt.......
..........t......
t..........t.....
..t.........t....
..............t.p
tttttttooooooooot`, 
  map`
a................
....tttttttt.tt.t
...t....p...t....
......ttttt....t.
t................
..t...........t..
...........t.....
.................
...............t.
.................
................t
...............t.
oooooooooooooottt`,
  map`
a................
ttt.ttttttttttt.t
...t.............
......ttttt....t.
.................
.......t.........
...........t..t..
......t..........
.........tt..tttt
.....t...........
..p..............
.tttt..........ts
oooooooooooooottt`,
  map`
.................
.................
.................
.........tt......
........t........
...........t.....
......k..........
....k..t....t....
a....t...........
ttt..........t...
...t.............
................p
oooooooooooooottt`,
  map`
.................
......tt.........
........k.......a
.........tt....tt
.....tt..........
...........ttk...
..............t..
.......t.........
p....t...........
ttttt..tt........
......t..........
.................
ooooooooooooooooo`,
  map`
.......k....k...a
.tttttttttttttttt
................p
t..............tt
.................
..............t..
.t.k.............
.................
....k........t...
tttttt...k.......
......tt...t.....
........t...t....
ooooooooooooooooo`,
  map`
a...t...........p
tt..ttttttt.ttttt
........t........
t.t.....t......tt
t.t.....tkt..t...
t..k....t..tt.t..
tt.............tk
..t..............
...t.......tktkt.
ttttttk..........
......ttt..t.....
............t.t..
tttttttttoottottt`,
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
................p
ttttttttttttttttt`
]
let leveldef = -1


//Setting things:
setBackground([sky])
setSolids([ground, hellGround,hellGround2, heavenGround,player])
setMap(level)


setPushables({
  [ hellGround2 ]: [hellGround2,player]
})

//More variables
let gamerunning = true;
let dash = 0;
let clearing = 7
let lvTnow = redLevels


let gameLoop = setInterval(() => {
  gravirty(1);
  const currentEnemies = getAll(enemy)
  const currentHeavenEnemies = getAll(heavenEnemy)
  const currentHellEnemies = getAll(hellEnemy)
  const platform = getAll(hellGround2)
  let levelNow = leveldef
  let lvTnow = blueLevels
  moveObjects(currentEnemies);
  moveObjectsUpDown(currentHeavenEnemies);
  moveObjectsUpDown(platform);
  if (checkHit(currentEnemies) === false) {
    respawn(lvTnow ,levelNow);
  }
  if (checkHit(currentHeavenEnemies) === false) {
    respawn(lvTnow ,levelNow);
  }
  if (checkHit(currentHellEnemies) === false) {
    clearInterval(gameLoop);
    gamerunning = false;
    addText("Game Over", {x: 5, y: 4, color: '10'});
    addText("'k' to play again", {x: 1, y: 5, color: '10'});
  }
  if (leveldef > 0 && leveldef < clearing){
    clearText();
  }
  if (leveldef > 8){
    clearInterval(gameLoop);
    addText("Congratulations,", {x: 1, y: 4, color: '10'});
    addText("You've won,", {x: 5, y: 5, color: '10'});
    addText("'k' to play again", {x: 1, y: 5, color: '10'});
    gamerunning = false; 
    melody.end()
    playTune(win, 1)
    
    
  }
},timer)
addText("Get to the end and ", {x: 1, y: 1, color: '9'});
addText("avoid enemies, in ", {x: 2, y: 3, color: '9'});
addText("Heaven", {x: 1, y: 5, color: '2'});
addText("or", {x: 9, y: 5, color: '6'});
addText("Hell?", {x: 13, y: 5, color: '3'});
addText("A", {x: 1, y: 8, color: '2'});
addText("D", {x: 18, y: 8, color: '3'});
function gravirty(down){
  getFirst(player).y += down}

function moveObjects(object){
  let o = object
  for(let i = 0; i < o.length; i++){
    o[i].y += 1;
  }
}

let moveStep = 0; 
let movingDown = true;
const maxDistance = 2; 

function moveObjectsUpDown(objects) {
  if (!objects || objects.length === 0) return;

  if (moveStep >= maxDistance) {
    movingDown = false;
  } else if (moveStep <= 0) {
    movingDown = true;
  }

  for (let i = 0; i < objects.length; i++) {
    if (movingDown) {
      objects[i].y += 1;
    } else {
      objects[i].y -= 1;
    }
  }

  movingDown ? moveStep++ : moveStep--;
}

function respawn(leveType,currentlevel){
  if (currentlevel === -1){
    currentlevel = 0
  }
  setMap(leveType[currentlevel]);
}

function checkHit(object) {
  if (!object) return true;

  const p = getFirst(player);
  if (!p) return true;

  for (let i = 0; i < object.length; i++) {
    const obj = object[i];

    // Friendly Hitbox :)
    const isColliding = 
      p.x < obj.x + 1 &&
      p.x + 1 > obj.x &&
      p.y < obj.y + 1.3 &&
      p.y + 1.3 > obj.y;

    if (isColliding) {
      return false; // Player is hit!
    }
  }
  return true;
}

let jump = 0;
function isGroundBelow(playerX, playerY) {
  const ground = getAll(heavenGround)
  const belowTile = getTile(playerX, playerY + 1);  
  return belowTile.some(sprite => sprite.type === heavenGround); 
}



afterInput(() => {
  if (leveldef < 0){
  clearText();}
  playerp = getFirst(player)||"";
  hellporth = getAll(hellport)||"";
  heavenporta = getFirst(heavenport)||"";
  jumpPowerw = getFirst(jumpPower)||"";
  superdashe = getFirst(superdash)||"";
  for (let i = 0; i < hellporth.length; i++) {
    let lev = hellporth[i]
  if (playerp.y == lev.y && playerp.x == lev.x){
    clearing = 3
    lvTnow = redLevels
    melody.end()
    side = tune`
63.69426751592356: C5~63.69426751592356 + B4~63.69426751592356,
191.08280254777068,
63.69426751592356: C5~63.69426751592356,
573.248407643312,
63.69426751592356: F4^63.69426751592356,
63.69426751592356: E4^63.69426751592356,
63.69426751592356: D4^63.69426751592356,
63.69426751592356: C4^63.69426751592356,
509.5541401273885,
63.69426751592356: C5~63.69426751592356 + B4~63.69426751592356,
127.38853503184713,
63.69426751592356: C5~63.69426751592356,
63.69426751592356: B4/63.69426751592356,
63.69426751592356: A4/63.69426751592356`
    melody = playTune(side,Infinity)
    if (leveldef == -1){
    addText("You've chosen", {x: 3, y: 2, color: '4'});
    addText("hell. Enemies", {x: 3, y: 3, color: '4'});
    addText("here never", {x: 3, y: 4, color: '4'});
    addText("let you go", {x: 3, y: 5, color: '4'});
    }

    leveldef += 1
    setMap(redLevels[leveldef]);
    setBackground([sky2])
  }if (leveldef == 2 && playerp.y  >= lev.y - 3){
      addText("If you ever feel ", {x: 3, y: 2, color: '2'});
      addText("stuck Press 'l' ", {x: 3, y: 3, color: '2'});
    } }    
  if (playerp.y == heavenporta.y && playerp.x == heavenporta.x){
    lvTnow = blueLevels
    melody.end()
    clearing = 7
    side = tune`
500: C4-500,
500: D4-500,
500: A4^500,
500: B4^500,
500: A4^500,
500: G4^500,
500: B4^500,
500: C5^500,
500: D5^500,
500: E5~500,
500: D5~500 + E5~500,
500,
500: C5~500,
500: E5~500,
500: F5~500,
500: G4/500,
500: F4/500,
500: G4/500,
500: C5~500,
500: E5~500,
500: D5~500,
500,
500: D5~500,
500: D5~500,
500: C5~500,
500: B4~500,
500,
500: E5-500,
500: D5-500,
500: C5-500,
500: B4-500,
500: G4-500`
    melody = playTune(side,Infinity)
    if (leveldef == -1){
    addText("You've chosen", {x: 3, y: 2, color: '2'});
    addText("heaven. Enemies", {x: 3, y: 3, color: '2'});
    addText("here might", {x: 3, y: 4, color: '2'});
    addText("sometimes let", {x: 3, y: 5, color: '2'});
    addText("you go", {x: 3, y: 6, color: '2'});
    }
    leveldef += 1
    setMap(blueLevels[leveldef]);
     
  } if (leveldef == 2 && playerp.x  == heavenporta.y +3 ){
      addText("If you ever feel ", {x: 3, y: 2, color: '2'});
      addText("stuck Press 'l' ", {x: 3, y: 3, color: '2'});
    } 
  if (playerp.y == jumpPowerw.y && playerp.x == jumpPowerw.x){
    timer = 3000
    addText("Now you can jump", {x: 3, y: 2, color: '2'});
    addText("Press 'w' ", {x: 4, y: 3, color: '2'});
    jump = 1
    }
  else {
    timer = 600
  }
  if (playerp.y == superdashe.y && playerp.x == superdashe.x){
    timer = 3000
    addText("Now you can dash", {x: 3, y: 2, color: '4'});
    addText("Press 'i' ", {x: 4, y: 3, color: '4'});
    dash = 1
    } else{
    timer = 600
    }
})


onInput("a", () => {
  if (gamerunning){
    getFirst(player).x -= 1
    gravirty(1);
  if (dash != -1){
    dash = dash* -1
  }}})
onInput("d", () => {
  if (gamerunning){
    getFirst(player).x += 1
    gravirty(1);
    if (dash != 1){
    dash = dash* -1
  }}})
onInput("w", () => {
  if (jump === 1){
      if (isGroundBelow(getFirst(player).x, getFirst(player).y)){ 
         getFirst(player).y  -= jump
         getFirst(player).y  -= jump
         getFirst(player).y  -= jump
      }  
}})

onInput("s",() =>{
  if (gamerunning){
    getFirst(player).y +=1
}})
onInput("i",() =>{
  if (gamerunning){
    getFirst(player).x += dash
    getFirst(player).x += dash
    getFirst(player).x += dash
}})
onInput("l",() =>{
    let levelNow = leveldef
    respawn(lvTnow ,levelNow);
})
onInput("k",() =>{
    clearText()
    setBackground([sky])
    setMap(level)
    leveldef = -1 
    gamerunning = true
    clearing = 3
  gameLoop = setInterval(() => {
  gravirty(1);
  const currentEnemies = getAll(enemy)
  const currentHeavenEnemies = getAll(heavenEnemy)
  const currentHellEnemies = getAll(hellEnemy)
  const platform = getAll(hellGround2)
  let levelNow = leveldef
  let lvTnow = blueLevels
  moveObjects(currentEnemies);
  moveObjectsUpDown(currentHeavenEnemies);
  moveObjectsUpDown(platform);
  if (checkHit(currentEnemies) === false) {
    respawn(lvTnow ,levelNow);
  }
  if (checkHit(currentHeavenEnemies) === false) {
    respawn(lvTnow ,levelNow);
  }
  if (checkHit(currentHellEnemies) === false) {
    clearInterval(gameLoop);
    gamerunning = false;
    addText("Game Over", {x: 5, y: 4, color: '10'});
    addText("'k' to play again", {x: 1, y: 5, color: '10'});
  }
  if (leveldef > 0 && leveldef < clearing){
    clearText();
  }
  if (leveldef > 8){
    clearInterval(gameLoop);
    addText("Congratulations,", {x: 1, y: 4, color: '10'});
    addText("You've won,", {x: 5, y: 5, color: '10'});
    addText("'k' to play again", {x: 1, y: 5, color: '10'});
    gamerunning = false; 
    melody.end()
    playTune(win, 1)
  
}},800)})