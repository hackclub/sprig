/*
@title: Dino Jumps
@description: Chrome dino-style jump game with fireballs, spikes, and star power-up
@author: TopMyster
@tags: ['endless runner', 'arcade']
@addedOn: 2026-05-03
*/

var dino="d",dinoPower="p",dinoDuck="q",fireball="c",fireHigh="f",spike="k",coin="n",ground="g",sky="s",building="b",house="h"

const jumpSfx=tune`150:C5~150+E5~150,150:G5~150`
const coinSfx=tune`100:E5~100,100:G5~100,100:B5~100,100:E6~100`
const hitSfx=tune`200:C3/200,200:A2/200,400:F2~400`
const destroySfx=tune`100:G5~100,100:C6~100`
const dashSfx=tune`100:F4~100+A4~100,100:C5~100`
const duckSfx=tune`100:D3~100,100:A2~100`

setLegend(
[dino,bitmap`
................
................
.......444......
.......4.4......
.......444......
......44........
.....4444.......
....4.44........
....4.444444....
.....4444.4.....
......444.......
......4.4.......
.....4..4.......
.....4...4......
......4..4......
................`],
[dinoPower,bitmap`
................
..6...6...6.....
...6.666.6......
.......444......
..6....4.4..6...
.66....444.66...
......44..6.....
.6...4444.......
....4.44........
....4.444444....
.6...4444.4..6..
......444...6...
.6....4.4.......
.....4..4...6...
..6..4...4......
......4..4......`],
[dinoDuck,bitmap`
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
.......444......
.......4.4......
..44444444444...
.4.444444444.4..
.....4....4.....
................`],
[fireball,bitmap`
................
.........96.....
........9966....
.......699369...
......69933669..
......69933369..
.....3699333669.
.....0369933369.
.....0369993369.
.....003699369..
.....003369969..
.....00336999...
......003699....
.......0369.....
........09......
................`],
[fireHigh,bitmap`
................
.........93.....
........9933....
.......399363...
......39933633..
......39933363..
.....3399333633.
.....0339933363.
.....0339993363.
.....003399363..
.....003363963..
.....00336399...
......003639....
.......0363.....
........03......
................`],
[spike,bitmap`
................
................
................
................
................
................
................
................
.......11.......
......1001......
.....100001.....
....10000001....
...1000000001...
..100000000001..
.11111111111111.
................`],
[coin,bitmap`
................
.....666666.....
....66666666....
...6669999666...
..666999999666..
..669999999966..
..669996699966..
..669960099966..
..669960099966..
..669996699966..
..669999999966..
..666999999666..
...6669999666...
....66666666....
.....666666.....
................`],
[building,bitmap`
..0000000000....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLLLLLLL0....
..0LL0440LL0....
..0LL0440LL0....`],
[house,bitmap`
................
................
................
..........00....
......0000......
.....088880.....
....08888880....
...0888888880...
..00000000000...
..0LLLLLLLL0....
..0L17LL17L0....
..0L17LL17L0....
..0LLL0440L0....
..0LLL0440L0....
..0000000000....
................`],
[ground,bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
[sky,bitmap`
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
7777777777777777`]
)

setSolids([dino,dinoPower,dinoDuck,ground])

var score=0,gameOver=false,isJumping=false,jumpStep=0
var powered=false,powerTimer=0,isDucking=false,dashCooldown=0
var groundRow=6,dinoCol=1,POWER_DURATION=50,DASH_CD=15

var levels=[map`
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
gggggggggg
gggggggggg`]

setMap(levels[0])
addSprite(dinoCol,groundRow-1,dino)
addSprite(4,groundRow-2,building)
addSprite(4,groundRow-1,building)
addSprite(7,groundRow-1,house)

function getDino(){
  var d=getFirst(dinoDuck);if(d)return d
  d=getFirst(dinoPower);if(d)return d
  return getFirst(dino)
}

function swapSprite(a,b){
  var s=getFirst(a);if(!s)return
  var x=s.x,y=s.y;s.remove();addSprite(x,y,b)
}

function spawnObstacle(){
  if(gameOver)return
  var af=getAll(fireball),ah=getAll(fireHigh),as=getAll(spike),ac=getAll(coin)
  var i
  for(i=0;i<af.length;i++){if(af[i].x>=7)return}
  for(i=0;i<ah.length;i++){if(ah[i].x>=7)return}
  for(i=0;i<as.length;i++){if(as[i].x>=7)return}
  for(i=0;i<ac.length;i++){if(ac[i].x>=7)return}
  var r=Math.random()
  if(r<0.08&&!powered){addSprite(9,groundRow-2,coin)}
  else if(r<0.30){addSprite(9,groundRow-1,spike)}
  else if(r<0.55){addSprite(9,groundRow-1,fireball)}
  else{addSprite(9,groundRow-2,fireHigh)}
}

function startDuck(){
  isDucking=true;playTune(duckSfx)
  var d=getDino();if(!d)return
  var x=d.x;d.remove();addSprite(x,groundRow-1,dinoDuck)
  setTimeout(function(){stopDuck()},800)
}

function stopDuck(){
  if(!isDucking)return;isDucking=false
  var d=getFirst(dinoDuck);if(!d)return
  var x=d.x;d.remove()
  addSprite(x,groundRow-1,powered?dinoPower:dino)
}

function performDash(){
  playTune(dashSfx);dashCooldown=DASH_CD
  var obs=getAll(fireball).concat(getAll(fireHigh)).concat(getAll(spike))
  var d=getDino();if(!d)return
  var near=null,nd=999
  for(var i=0;i<obs.length;i++){
    var dist=obs[i].x-d.x
    if(dist>0&&dist<nd){near=obs[i];nd=dist}
  }
  if(near&&nd<=3){near.remove();score+=2;playTune(destroySfx)}
}

function activatePower(){
  powered=true;powerTimer=POWER_DURATION;playTune(coinSfx)
  if(!isDucking)swapSprite(dino,dinoPower)
}

function deactivatePower(){
  powered=false;powerTimer=0
  if(!isDucking)swapSprite(dinoPower,dino)
}

function triggerGameOver(){
  gameOver=true;playTune(hitSfx);clearText()
  addText("GAME OVER",{x:5,y:2,color:color`3`})
  addText("Score: "+score,{x:5,y:4,color:color`0`})
  addText("W:jump S:duck D:dash",{x:1,y:6,color:color`0`})
  addText("Press S to restart",{x:2,y:7,color:color`0`})
}

function checkCollision(){
  var d=getDino();if(!d)return
  var ac=getAll(coin),i
  for(i=0;i<ac.length;i++){
    if(ac[i].x===d.x&&ac[i].y===d.y){ac[i].remove();activatePower();return}
  }
  var fh=getAll(fireHigh)
  for(i=0;i<fh.length;i++){
    if(fh[i].x===d.x&&fh[i].y===d.y&&!isDucking){
      if(powered){fh[i].remove();score+=3;playTune(destroySfx)}
      else{triggerGameOver()}
    }
  }
  var obs=getAll(fireball).concat(getAll(spike))
  for(i=0;i<obs.length;i++){
    if(obs[i].x===d.x&&obs[i].y===d.y){
      if(powered){obs[i].remove();score+=3;playTune(destroySfx)}
      else{triggerGameOver()}
    }
  }
}

function restartGame(){
  gameOver=false;isJumping=false;isDucking=false
  jumpStep=0;score=0;powered=false;powerTimer=0;dashCooldown=0
  clearText();setMap(levels[0])
  addSprite(dinoCol,groundRow-1,dino)
  addSprite(4,groundRow-2,building)
  addSprite(4,groundRow-1,building)
  addSprite(7,groundRow-1,house)
}

onInput("w",function(){if(!isJumping&&!isDucking&&!gameOver){isJumping=true;jumpStep=0;playTune(jumpSfx)}})
onInput("i",function(){if(!isJumping&&!isDucking&&!gameOver){isJumping=true;jumpStep=0;playTune(jumpSfx)}})
onInput("s",function(){if(gameOver){restartGame();return};if(!isJumping&&!isDucking)startDuck()})
onInput("k",function(){if(gameOver){restartGame();return};if(!isJumping&&!isDucking)startDuck()})
onInput("d",function(){if(!gameOver&&dashCooldown<=0)performDash()})
onInput("l",function(){if(!gameOver&&dashCooldown<=0)performDash()})
onInput("a",function(){if(gameOver)restartGame()})
onInput("j",function(){if(gameOver)restartGame()})

setInterval(function(){
  if(gameOver)return
  var d=getDino();if(!d)return
  if(powered){powerTimer--;if(powerTimer<=0)deactivatePower()}
  if(dashCooldown>0)dashCooldown--
  if(isJumping){
    if(jumpStep===0)d.y=groundRow-2
    else if(jumpStep===1)d.y=groundRow-2
    else if(jumpStep===2){d.y=groundRow-1;isJumping=false}
    jumpStep++
  }
  var all=getAll(fireball).concat(getAll(fireHigh)).concat(getAll(spike)).concat(getAll(coin))
  for(var i=0;i<all.length;i++){
    if(all[i].x<=0){var wo=(all[i].type!==coin);all[i].remove();if(wo)score++}
    else{all[i].x-=1}
  }
  checkCollision()
  if(!gameOver){
    clearText()
    var dr=dashCooldown<=0?" D:RDY":""
    if(powered){
      var sl=Math.ceil(powerTimer/5)
      addText("STAR POWER "+sl+"s",{x:0,y:0,color:color`6`})
      addText("Score: "+score+dr,{x:0,y:1,color:color`6`})
    }else{
      addText("Score: "+score+dr,{x:0,y:0,color:color`0`})
    }
  }
},200)

setInterval(function(){
  if(!gameOver&&Math.random()<0.35)spawnObstacle()
},1000)
