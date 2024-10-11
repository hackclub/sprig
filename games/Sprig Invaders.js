/*
@title: Sprig Invaders
@author: Bunnzulu
@tags: ["retro" , "strategy" , "timed"]
@addedOn: 2024-08-13
*/

const player = "p"
const Mob1 = "1"
const Mob2 = "2"
const Mob3 = "3"
const Boss = "b"
const Background = "B"
const PlayerBullet = "P"
const AlienBullet = "A"
const Shield = "S"
let bossmovement = 1;
let Shieldmovement = 1;
let Score = 0;
let Lives = 25;
let Shield_durability = 25
let MovingAliensLoop;
let MovingAliensShootingLoop;
let BulletsLoop;
var Wave = 1


setLegend(
  [player, bitmap`
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
4444444444444444
4444444444444444
4444444444444444
................
................
................
................
................
................
................
................`],
  [Mob1, bitmap`
................
................
................
.....222222.....
.....23..32.....
.....2....2.....
.....222222.....
....22422422....
....2.4..4.2....
..222......222..
..2..........2..
..2..........2..
..2..........2..
................
................
................`],
  [Mob2, bitmap`
................
........2.......
........2.......
........2.......
........2.......
.....3322233....
.....3322233....
2222222222222222
.....2222222....
.....2222222....
.....2222222....
........2.......
........2.......
........2.......
........2.......
................`],
  [Mob3, bitmap`
................
................
....55555555....
....53555535....
....55555555....
....55555555....
....55555555....
......6.6.6.....
.....6..6..6....
....6..6....6...
....6..6....6...
...6...6.....6..
..6.....6.....6.
.6.......6.....6
................
................`],
  [Boss, bitmap`
................
.....333333.....
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
.33..........33.
.33..........33.
................
................
................
................
................
................`],
  [Shield, bitmap`
................
................
................
................
................
................
................
4444444444444444
4444444444444444
................
................
................
................
................
................
................`],
  [PlayerBullet, bitmap`
................
................
................
................
................
.......4........
.......4........
.......4........
.......4........
.......4........
.......4........
................
................
................
................
................`],
  [AlienBullet, bitmap`
................
................
................
................
................
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
................
................
................
................`],
  [Background, bitmap`
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
0000000000000000`]
)

setBackground(Background)


let Stage = 0
const Stages = [
  map`
......
......
......
......
......
......
......
......
......
......`,
  map`
......
..b...
222222
111111
111111
......
......
..S...
..p...
......`,
  map`
......
..b...
333333
222222
222222
111111
111111
......
......
...S..
..p...
......`
]
setMap(Stages[Stage])
addText("Space Invaders", options = { x: 3, y: 5, color: color`2` })
addText("Press i to Play", options = { x: 3, y: 7, color: color`2` })
setPushables({
  [player]: []
})

function PlayerShoot() {
  if (getAll(player).length === 1 && (getAll(Mob1).length + getAll(Mob2).length + getAll(Mob3).length + getAll(Boss).length) > 0){
  addSprite(getFirst(player).x, getFirst(player).y, PlayerBullet)
  }
}

function Move_Mob1() {
  for (let i = 0; i < getAll(Mob1).length; i++) {
    alien = getAll(Mob1)[i]
    alien.y += 1
    if (alien.y === 8 && Wave <= 10){
      End_Game("You Lose")
    } else if (alien.y === 10 && Wave > 10){
      End_Game("You Lose")
    }
  }
}

function Move_Mob2() {
  for (let i = 0; i < getAll(Mob2).length; i++) {
    alien = getAll(Mob2)[i]
    alien.y += 1
    if (alien.y === 8 && Wave <= 10){
      End_Game("You Lose")
    } else if (alien.y === 10 && Wave > 10){
      End_Game("You Lose")
    }
  }
}

function Move_Mob3() {
  for (let i = 0; i < getAll(Mob3).length; i++) {
    alien = getAll(Mob3)[i]
    alien.y += 1
    if (alien.y === 8 && Wave <= 10){
      End_Game("You Lose")
    } else if (alien.y === 10 && Wave > 10){
      End_Game("You Lose")
    }
  }
}

function Move_Boss() {
  if (getAll(Boss).length > 0){
    getFirst(Boss).x += bossmovement
    if (getFirst(Boss).x === 0 || getFirst(Boss).x === 5) {
      bossmovement *= -1
    }
  }
}

function Move_Shield(){
  if (getAll(Shield).length > 0){
    getFirst(Shield).x += Shieldmovement
    ShieldCollisions()
    if (getFirst(Shield).x === 0 || getFirst(Shield).x === 5) {
      Shieldmovement *= -1
    }
  }
}

function clearSprites() {
  for (let sprite of getAll()) {
    sprite.remove();
  }
}

function Mob1Shoot(AlienIndex) {
  if (getAll(Mob1).length > 0) {
    addSprite(getAll(Mob1)[AlienIndex].x, getAll(Mob1)[AlienIndex].y, AlienBullet)
  }
}

function Mob2Shoot(AlienIndex) {
  if (getAll(Mob2).length > 0) {
    addSprite(getAll(Mob2)[AlienIndex].x, getAll(Mob2)[AlienIndex].y, AlienBullet)
  }
}

function Mob3Shoot(AlienIndex) {
  if (getAll(Mob3).length > 0) {
    addSprite(getAll(Mob3)[AlienIndex].x, getAll(Mob3)[AlienIndex].y, AlienBullet)
  }
}

function BossShoot() {
  if (getAll(Boss).length > 0){
    addSprite(getFirst(Boss).x, getFirst(Boss).y, AlienBullet)
  }
}

function AlienBulletsMove(speed) {
  for (let i = 0; i < getAll(AlienBullet).length; i++) {
    getAll(AlienBullet)[i].y += speed
    if (getAll(AlienBullet)[i].y >= 9) {
      getAll(AlienBullet)[i].remove()
    }
    AlienBulletCollision()
  }
}

function PlayerBulletsMove(speed) {
  for (let i = 0; i < getAll(PlayerBullet).length; i++) {
    getAll(PlayerBullet)[i].y -= speed
    if (getAll(PlayerBullet)[i].y === 0) {
      getAll(PlayerBullet)[i].remove()
    }
    PlayerBulletCollision()
  }
}

function ShieldCollisions(){
  if (tilesWith(Mob1, Shield).length > 0 && getAll(player).length > 0) {
    tile = tilesWith(Mob1, Shield)[0]
    clearTile(tile[0].x, tile[0].y)
  }
  if (tilesWith(Mob2, Shield).length > 0 && getAll(player).length > 0) {
    tile = tilesWith(Mob2, Shield)[0]
    clearTile(tile[0].x, tile[0].y)
  }
  if (tilesWith(Mob3, Shield).length > 0 && getAll(player).length > 0) {
    tile = tilesWith(Mob3, Shield)[0]
    clearTile(tile[0].x, tile[0].y)
  }
  if (tilesWith(Boss, Shield).length > 0 && getAll(player).length > 0) {
    tile = tilesWith(Boss, Shield)[0]
    clearTile(tile[0].x, tile[0].y)
  }
}

function End_Game(text) {
  clearText()
  addText(text, options = { x: 3, y: 5, color: color`2` })
  addText(`Score:${Score}`, options = { x: 3, y: 6, color: color`2` })
  addText(`Wave:${Wave}`, options = { x: 3,y: 8, color: color`2` })
  clearInterval(MovingAliensShootingLoop);
  clearInterval(MovingAliensLoop);
  clearInterval(BulletsLoop);
  clearSprites();
}

function UpdateText(scorechange, livechange,wavechange) {
  Score += scorechange
  Lives += livechange
  Wave += wavechange
  clearText()
  if (Lives === 0) {
    End_Game("You Lose")
  } else {
    addText(`${Score}`, options = { x: 0, y: 1, color: color`2` })
    addText(`${Lives}`, options = { x: 17, y: 1, color: color`2` })
    addText(`Wave:${Wave}`, options = { x: 3,y: 15, color: color`2` })
  }
}

function Main_Loop(time) {
  clearInterval(MovingAliensLoop);
  MovingAliensLoop = setInterval(() => {
    Move_Mob1();
    Move_Mob2();
    if (Wave > 10){
      Move_Mob3()
    }
  }, time);
  MovingAliensShootingLoop = setInterval(() => {
    Mob1Shoot(Math.floor(Math.random() * getAll(Mob1).length));
    Mob2Shoot(Math.floor(Math.random() * getAll(Mob2).length));
    if (Wave > 10){
      Mob3Shoot(Math.floor(Math.random() * getAll(Mob3).length))
    };
    BossShoot();
    Move_Boss();
  }, 3000);
  BulletsLoop = setInterval(() => {
    AlienBulletsMove(1);
    PlayerBulletsMove(1);
    Alien_Respawn();
    Destroy_Shield();
  }, 100)
  setInterval(() => {
    Move_Shield();
  },500)
};

function StageChange(Index) {
  Stage = Index
  setMap(Stages[Stage])
  if (Wave === 11){
    Shield_durability = 25
  }
}

function Create_Shield(){
  if (Wave%10 === 0 && Wave > 10 && getAll(Shield).length === 0){
    Shield_durability = 25
    addSprite(3, 9, Shield)
  }
}

function PlayerBulletCollision() {
  tile = []
  if (tilesWith(PlayerBullet, Mob1).length > 0) {
    tile = tilesWith(PlayerBullet, Mob1)[0]
    UpdateText(100, 0,0)
    clearTile(tile[0].x, tile[0].y)
  }
  if (tilesWith(PlayerBullet, Mob2).length > 0) {
    tile = tilesWith(PlayerBullet, Mob2)[0]
    clearTile(tile[0].x, tile[0].y)
    UpdateText(150, 0,0)
  }
  if (tilesWith(PlayerBullet, Mob3).length > 0) {
    tile = tilesWith(PlayerBullet, Mob3)[0]
    clearTile(tile[0].x, tile[0].y)
    UpdateText(200, 0,0)
  }
  if (tilesWith(PlayerBullet, Boss).length > 0) {
    tile = tilesWith(PlayerBullet, Boss)[0]
    clearTile(tile[0].x, tile[0].y)
    UpdateText(300, 0,0)
  }
  if (tilesWith(PlayerBullet, AlienBullet).length > 0) {
    tile = tilesWith(PlayerBullet, AlienBullet)[0]
    clearTile(tile[0].x, tile[0].y)
  }
  if (tilesWith(PlayerBullet, Shield).length > 0 && getAll(player).length > 0) {
    tilesWith(PlayerBullet, Shield)[0][1].remove()
    Shield_durability -= 1
  }
}

function AlienBulletCollision() {
  if (tilesWith(AlienBullet, player).length > 0 && getAll(player).length > 0) {
    UpdateText(0, -1,0)
    tilesWith(AlienBullet, player)[0][1].remove()
  };
  if (tilesWith(AlienBullet, Shield).length > 0 && getAll(player).length > 0) {
    tilesWith(AlienBullet, Shield)[0][1].remove()
    Shield_durability -= 1
  }
}

function Destroy_Shield(){
  if (Shield_durability <= 0 && getAll(Shield).length > 0){
    getFirst(Shield).remove()
  } 
}

function Alien_Respawn(){
  if ((getAll().length === 2 && getAll(player).length + getAll(Shield).length === 2) || (getAll().length === 1 && getAll(player).length === 1)){
    StageChange(0)
    if (Wave < 10){
      StageChange(1)
    } else {
      StageChange(2)
      Create_Shield()
    }
    UpdateText(0,0,1)
  }
}


onInput("i", () => {
  if (Stage === 0) {
    StageChange(1)
    clearText()
    addText(`${Score}`, options = { x: 0, y: 1, color: color`2` })
    addText(`${Lives}`, options = { x: 17,y: 1, color: color`2` })
    addText(`Wave:${Wave}`, options = { x: 3,y: 15, color: color`2` })
    onInput("w", () => {
      PlayerShoot()
    })
    onInput("a", () => {
      getFirst(player).x -= 1
    })
    onInput("d", () => {
      getFirst(player).x += 1
    })
    Main_Loop(5000)
  }
})




afterInput(() => {
})
