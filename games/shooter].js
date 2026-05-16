/*
@title: Scrap Legion: Overdrive
@description: Survive chaos, defeat bosses. A true survival game.
@author: yash
@tags: [survival, roguelike, action, boss]
@addedOn: 2026-03-24
*/

const hero = "h"
const enemy = "e"
const boss = "B"
const bullet = "b"
const scrap = "s"
const wall = "w"

setLegend(
[hero, bitmap`
....000000...0..
....666666..060.
....006600.06660
....006600..000.
....666666...6..
.0..600006..060.
666.666666..060.
060...6.....060.
060000600000060.
066666666666660.
000000600000000.
.....060........
....06660.......
...0666660......
..066606660.....
.06660006660....`],

[enemy, bitmap`
.....00000......
....0333330.....
...033333330....
..03300000330...
..03322022330...
..03300000330...
..03300200330...
..03333333330...
...033333330....
....0333330.....
.....03330......
......030.......
......030.......
......030.......
......030.......
......000.......`],

[boss, bitmap`
.....000000.....
....07777770....
...0700000070...
..077220022770..
.07770000007770.
..077020020770..
...0702222070...
....07777770....
.....077770.....
......0770......
......0770......
......0770......
......0770......
......0770......
......0770......
......0000......`],

[bullet, bitmap`
......3003......
.....300003.....
....30011003....
....30122103....
...3001FF1003...
..3001F33F1003..
33001F3333F1003.
3001F333333F1003
001F33333333F100
6001F333333F1006
.6001F3333F1006.
..6001F33F1006..
...6001FF1006...
....60011006....
.....600006.....
.....660066.....`],

[scrap, bitmap`
...0000000000...
..066660666660..
.06666606666660.
0666660006666660
0666600000666660
0666606060666660
0666606060666660
0666606066666660
0666600000666660
0666666060666660
0666606060666660
0666606060666660
0666600000666660
.06666000666660.
..066660666660..
...0000000000...`],

[wall, bitmap`
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
1111111111111111`]
)

let health = 12
let score = 0
let wave = 1
let fireRate = 600
let multiShot = 1
let shield = 0
let bossHP = 0

const baseMap = map`
wwwwwwwwww
w........w
w........w
w........w
w....h...w
w........w
w........w
w........w
w........w
wwwwwwwwww`

setMap(baseMap)
setSolids([hero, wall])

const move = (dx, dy) => {
  const p = getFirst(hero)
  p.x += dx
  p.y += dy
}

onInput("w", ()=>move(0,-1))
onInput("s", ()=>move(0,1))
onInput("a", ()=>move(-1,0))
onInput("d", ()=>move(1,0))

// BUILD
onInput("i", ()=>{
  if(score >= 5){
    const p = getFirst(hero)
    addSprite(p.x, p.y, wall)
    score -= 5
  }
})

// SHOOT
function shoot(){
  const p = getFirst(hero)
  for(let i=0;i<multiShot;i++){
    let b = addSprite(p.x, p.y, bullet)
    b.x += Math.floor(Math.random()*3)-1
  }
}
setInterval(shoot, fireRate)

// BULLETS
setInterval(()=>{
  getAll(bullet).forEach(b=>{
    b.y--
    if(b.y <= 0) b.remove()
  })
},100)

// SPAWN
function spawnEnemy(){
  addSprite(Math.floor(Math.random()*8)+1,1,enemy)
}

function spawnBoss(){
  bossHP = 20 + wave*2
  addSprite(5,1,boss)
  addText("BOSS INCOMING",{x:1,y:6,color:color`3`})
}

// ENEMY AI
setInterval(()=>{
  const p = getFirst(hero)

  getAll(enemy).forEach(e=>{
    if(e.x < p.x) e.x++
    else if(e.x > p.x) e.x--
    if(e.y < p.y) e.y++
    else if(e.y > p.y) e.y--
  })

  getAll(boss).forEach(b=>{
    if(b.x < p.x) b.x++
    else if(b.x > p.x) b.x--
    if(b.y < p.y) b.y++
    else if(b.y > p.y) b.y--
  })

},300)

// COLLISION
setInterval(()=>{
  tilesWith(bullet, enemy).forEach(t=>{
    t[0].remove()
    t[1].remove()
    score++
    if(Math.random()<0.4){
      addSprite(t[1].x,t[1].y,scrap)
    }
  })

  tilesWith(bullet, boss).forEach(t=>{
    t[0].remove()
    bossHP--
    if(bossHP <= 0){
      t[1].remove()
      score += 20
      addText("BOSS DOWN!",{x:1,y:6,color:color`4`})
    }
  })

  tilesWith(hero, scrap).forEach(t=>{
    t[1].remove()
    score += 2
  })

  if(tilesWith(hero, enemy).length){
    if(shield>0){ shield-- }
    else health--
    getFirst(enemy).remove()
  }

  if(tilesWith(hero, boss).length){
    health -= 2
  }

},100)

// WAVES
setInterval(()=>{
  wave++

  if(wave % 5 === 0){
    spawnBoss()
  } else {
    for(let i=0;i<wave;i++) spawnEnemy()
  }

  // UPGRADE CHOICE
  if(wave % 3 === 0){
    clearText()
    addText("1:HP 2:FIRE",{x:1,y:4})
    addText("3:SHOT 4:SHIELD",{x:1,y:5})

    onInput("1",()=>health+=3)
    onInput("2",()=>fireRate-=50)
    onInput("3",()=>multiShot++)
    onInput("4",()=>shield+=3)
  }

},4000)

// UI
setInterval(()=>{
  clearText()
  addText("HP:"+health,{x:0,y:0,color:color`3`})
  addText("SCRAP:"+score,{x:0,y:1,color:color`6`})
  addText("WAVE:"+wave,{x:0,y:2,color:color`9`})
  addText("SHIELD:"+shield,{x:0,y:3,color:color`5`})

  if(health<=0){
    clearText()
    addText("YOU DIED",{x:2,y:4,color:color`3`})
    addText("PRESS J",{x:3,y:6,color:color`7`})
  }

},200)

onInput("j",()=>{
  setMap(baseMap)
  health=12www
  score=0
  wave=1
  fireRate=600
  multiShot=5
  shield=0
})