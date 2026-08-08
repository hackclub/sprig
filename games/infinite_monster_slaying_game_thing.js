/*
@title: infinite_monster_slayer_game_thing
@description: This is a endless wave survival kind of game, monsters spawn from any of the four corners, all you have to do is survive and maybe kill monsters for extra points :)
@author: SheetSpeak
@tags: ['action', 'endless','retro']
@addedOn: 2026-06-11
*/

const player = "p"
const life="h"
const lost="n"
const enemy = "e"
const pointer = "v"
const arrow = "a"
const fire = "f"
const grass = "g"
const lily = "l"
const blade = "b"


const deathTune=tune`
500: A4~500 + D4-500,
500: A4~500 + C4^500,
500: A4~500 + E4-500 + F5/500,
500: B4~500 + C4^500,
500: B4~500 + D4-500,
500: B4~500 + E5/500,
500: B4~500 + C4-500,
500: C5~500,
500: C5~500 + C4-500,
500: C5~500 + F5/500,
500: C5~500 + D4-500,
500: B4~500,
500: B4~500 + C4-500 + E5/500,
500: B4~500 + E4-500,
500: A4~500 + D4-500,
500: A4~500 + E4-500,
500: A4~500 + D4-500 + F5/500,
500: G4~500 + F4^500,
500: G4~500 + D4-500,
500: G4~500 + E5/500,
500: F4~500 + C4-500,
500: F4~500 + E4^500,
500: F4~500 + D4-500 + F5/500,
500: F4~500,
500: G4~500 + C4-500,
500: G4~500 + D4-500 + E5/500,
500: G4~500 + F5/500,
500: A4~500 + D4-500,
500: A4~500 + C4-500,
500: A4~500 + D4-500 + E5/500,
500: A4-500,
500: B4~500 + F4-500 + F5/500`

const melody = tune`
250: D5/250 + E5-250,
250: G5/250 + A5^250,
250: E5-250,
250: D5/250 + F5-250,
250: G5/250 + C5-250 + A5^250,
250: E5-250,
250: D5/250,
250: G5/250 + C5-250 + A5^250,
250: E5-250,
250: D5-250 + E5/250,
250: D5-250 + C5/250,
250: C5-250,
250: C4/250,
250: E4-250 + F4/250,
250: E4-250 + A4/250,
250: E4-250 + G4/250,
250: F4-250 + E4/250,
250: F4-250 + A4/250,
250: F4-250 + D4/250,
250: F4-250 + G4/250,
250: G4-250 + C5/250,
250: G4-250 + C5/250,
250: E5/250 + A4-250,
250: E5/250 + A4-250,
250: F5/250 + A4-250,
250: F5/250,
250: C5-250 + G5/250 + A5/250,
250: C5-250,
250: C5-250 + G5/250 + A5-250,
250: F5/250,
250: B4-250 + C5/250 + D5-250 + G5-250,
250: B4-250 + E4/250 + E5-250 + D5/250`

const playback =playTune(melody,Infinity)
setLegend(
  [ player, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD00000000DDDD
DDDD02033220DDDD
DDDD02233020DDDD
DDDD03000330DDDD
DDDD03333330DDDD
DDDD00000000DDDD
DDDD0DDDDDD0D4DD
DDD4DDDDDD4DDDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ blade, bitmap`
................
............21..
...........21L..
..........21L...
.........21L....
........21L.....
.......21L......
......21L.......
.....21L........
....21L.........
.FFC1L..........
...CCL..........
..CFFC..........
.CCC.CC.........
.CF.............
................` ],
  [ life, bitmap`
................
................
................
................
...3333..3333...
...3C33.33323...
...3C33333323...
...3C33333233...
...3CC333333....
....3CC33333....
.....3CC333.....
......3333......
.......3........
................
................
................` ],
  [ lost, bitmap`
................
................
................
...0000..0000...
..011110011110..
..01L110111210..
..01L111111210..
..01L111112110..
..01LL1111110...
...01LL111110...
....01LL1110....
.....011110.....
......0100......
.......0........
................
................` ],
  [ enemy, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD00000000DDDD
DDDD002F6000DDDD
DDDD000FF200DDDD
DDDD0F000FF0DDDD
DDDD06FFFF60DDDD
DDDD00000000DDDD
DDDD0DDDDDD0D4DD
DDD4DDDDDD4DDDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ pointer, bitmap`
................
................
................
................
................
.......33.......
......3323......
.....333323.....
.....303333.....
......3003......
.......33.......
................
................
................
................
................` ],
  [ arrow, bitmap`
................
................
................
........2.......
.......21L......
.......10L......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
................
................
................` ],
  [ fire, bitmap`
......L.........
.......99.L.....
.......9L9L.....
.......999L.....
......999999L...
...99.9L99999...
...999L9996999..
...99999966699..
...99699996699..
...9969999669...
....966696669...
....996L66699...
.....9966669....
......99L99.....
.......99.......
................` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDD4D
DDDDDD4DDDDDDDDD
DDD44D4D4DD4DDDD
DDDDD4DD4D4DDDDD
DDD4DDD44D4DDDDD
DDDDD4DDDDD4DDDD
DDDDDDDDD4DDDDDD
DDDDDDDDDDDDDD4D
DDDDDD4DDDDDDDDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ lily, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDD6DDDD
DDDDDDD6DD6D6DDD
DDDDDD6D6DD6DDDD
DDDDDDD64D4DDD4D
DDDDDD4DD46DDDDD
DDD44D4D46D6DDDD
DDDDD4DD4D6DDDDD
DDD46DD4DD4DDDDD
DDD6D6DDDDD4DDDD
DDDD6DDDD4DDDDDD
DDDDDDDDDDDDDD4D
DDDDDD4DDDDDDDDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ]
)


setSolids([enemy,player])

let level = 0
const levels = [
  map`
gggggggggg
lgggggglgg
gggggggggg
gggglggglg
gggggggggl
glgggggggg
ggggggglgg
gglggggggg`,
  map`
gggggggggg
lgggggglgg
gggggggggg
gggglggglg
gggggggggl
glgggggggg
ggggggglgg
gglggggggg`
]

setMap(levels[0])

setPushables({
  [ player ]: [enemy],
  [enemy]:[player]
})

let pointing =0
addSprite(4,4,"p")
addSprite(getFirst(player).x+1,getFirst(player).y,"v")
let score=0
let alive=true
let lives=3
let eSpawn=false
let bladeS=0
let arrS=0
let fS=100

for(let i=0; i<lives;i++){
  addSprite(9-i,0,"h")
}
if(lives<3){
  for(let i =lives; i<3;i++){
    addSprite(9-i,0,"n")
  }
}

addSprite(0,0,"e")

onInput("d", () => {

  if(pointing==0){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==1){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==2){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==3){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y
  }else if(pointing==4){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==5){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==6){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==7){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y
  }
  
  pointing+=1
  if(pointing/8==1){
    pointing=0
  }

})
onInput("a", () => {

  if(pointing==2){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==3){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==4){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==5){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y
  }else if(pointing==6){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==7){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==0){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==1){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y
  }
  
  pointing-=1
  if(pointing<0){
    pointing=7
  }
  
})
onInput("w",()=>{
  getFirst(player).x=getFirst(pointer).x
  getFirst(player).y=getFirst(pointer).y
  
  if(pointing==0){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==1){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==2){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==3){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y
  }else if(pointing==4){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==5){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==6){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==7){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y
  }
  
  pointing+=1
  if(pointing/8==1){
    pointing=0
  }


    
  
})
onInput("s",()=>{
  getFirst(player).x+=(getFirst(player).x-getFirst(pointer).x)
  getFirst(player).y+=(getFirst(player).y-getFirst(pointer).y)

  if(pointing==2){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==3){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==4){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y+1
  }else if(pointing==5){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y
  }else if(pointing==6){
    getFirst(pointer).x=getFirst(player).x-1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==7){
    getFirst(pointer).x=getFirst(player).x
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==0){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y-1
  }else if(pointing==1){
    getFirst(pointer).x=getFirst(player).x+1
    getFirst(pointer).y=getFirst(player).y
  }
  
  pointing-=1
  if(pointing<0){
    pointing=7
  }
})

onInput("l", ()=>{
  
  addSprite(getFirst(pointer).x,getFirst(pointer).y,"b")
  bladeS=score
  
})
onInput("k", ()=>{
  if((getAll(fire).length==0)&&([1,2,3,4,5,6].includes(getFirst(player).y))){
  addSprite(getFirst(player).x-1,getFirst(player).y-1,'f')
  addSprite(getFirst(player).x-1,getFirst(player).y+1,'f')
  addSprite(getFirst(player).x+1,getFirst(player).y-1,'f')
  addSprite(getFirst(player).x+1,getFirst(player).y+1,'f')}
  fS=score
  
})
onInput("i", ()=>{
  if(getAll(arrow).length==0){
  for(let k=0; k<10;k++){

    if ((!getTile(k,getFirst(player).y).includes({type:"a",x:k,y:getFirst(player).y}))&&(k!=getFirst(player).x)){
      addSprite(k,getFirst(player).y,"a")
    
    }
  }
  for(let k=0; k<8;k++){
    if ((!getTile(getFirst(player).x,k).includes({type:"a",x:k,y:getFirst(player).y}))&&(k!=getFirst(player).y)){
      addSprite(getFirst(player).x,k,"a")
    
    }
  }
  arrS=score
  
}})

onInput("j",()=>{
  null
})

afterInput(() => {
  if(alive){
    for(const k of getAll(enemy)){
    
      if(getFirst(player).x-k.x<=1&&getFirst(player).y-k.y<=1&&getFirst(player).x-k.x>=-1&&getFirst(player).y-k.y>=-1){
        lives--
        }else {
            k.x+=((getFirst(player).x-k.x)<0)?(-1):(1)
            k.y+=((getFirst(player).y-k.y)<0)?(-1):(1)
            
        }
  
      if(getFirst(blade)){
        if(k.x==getFirst(blade).x && k.y==getFirst(blade).y){
          k.remove()
          score++
        }else if(bladeS!=score){
          getFirst(blade).remove()
        }
      }
      if(getAll(fire)){for(const m of getAll(fire)){
          if(m.x==getFirst(player).x&&m.y==getFirst(player).y){
            lives-=1
            m.remove()
          }else if(m.x==k.x&&m.y==k.y){
            k.remove()
            m.remove()
            score++
          }
      }}
      if(getAll(arrow)){for(const m of getAll(arrow)){
          if(m.x==getFirst(player).x&&m.y==getFirst(player).y){
            lives-=1
            m.remove()
          }else if(m.x==k.x&&m.y==k.y){
            k.remove()
            m.remove()
            score++
          }else if (score-arrS>=10){
          m.remove()
          }
      }}
      
    


            
        if(lives<3){
              for(let i =lives; i<3;i++){  
                for(const l of getTile(9-i,0)){
                  if(l.type=="h"){
                    l.remove()
                    addSprite(9-i,0,"n")
                  }
                }
              }
          }

        
        
        
        
    
    }
  
    
   }
   score++
   
    if(score%3==0){
      const tempVar = Math.floor(Math.random()*4)
          if(tempVar==0){
            addSprite(0,0,"e")
          }else if(tempVar==1){
            addSprite(0,7,"e")
          }else if(tempVar==2){
            addSprite(9,7,"e")
          }else{
            addSprite(9,0,"e")
            
          }
      }

        clearText()
        addText(JSON.stringify(score),{
        x:0,y:0,color:color`2`
        })
        if(lives<=0){
          alive=false
          playback.end()

          playTune(deathTune,Infinity)
    
          setMap(levels[1])
          addText(JSON.stringify(score),{
            x:0,y:0,color:`2`
            })
          addText("Game Over",options={y:7,color:color`2`})
          addText("Restart to retry",options={y:8,color:color`2`})
        }
})