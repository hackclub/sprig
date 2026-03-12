/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: draw
@author: None
@description: None
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const alien = "a"
const bullet = "b"
const missile = "m"
const nuclear = "n"
const blast = "k"

setLegend(
  [ player, bitmap`
................
................
......000.......
......060.......
.....0660.......
.....06660.0....
...0002620.0....
...0.0666000....
...0.06360......
.....06660......
....066660......
....06660.......
.....000........
.....0.0........
....00.00.......
................` ],
  [ alien , bitmap`
................
................
.......0........
....00000000....
...0033333300...
...0303330330...
...0333333330...
...0033333300...
....00000000....
......000.......
.....00..0......
.....0...00.....
................
................
................
................`],
  [ bullet , bitmap`
................
................
................
.......0........
......000.......
.....00000......
....00.0.00.....
.......0........
.......0........
.......0........
.......0........
.......0........
................
................
................
................`],
  [missile,bitmap`
......1.........
.....101........
....10001.......
...1000001......
...0000000......
...3333333......
...0000000......
...HHHHHHH......
...0000000......
...DDDDDDD......
...0000000......
....00000.......
....66666.......
....699696......
...69993960.....
..690396399.....`],  
  [nuclear,bitmap`
................
................
................
................
.......00.......
.....00.........
....0...........
...0............
...0............
................
................
................
................
................
................
................`],
  [ blast , bitmap`
................
................
...666..66666...
..6633336.9.6...
..693338399.6...
..69333333..9...
..69993339899666
..99966333999996
669963333.399996
.9883336369..96.
.99863336999966.
..993369996966..
6996.99969.96...
6...6966.99.6...
66..666699..6...
..66....666.6...`]
)

setSolids([])

let level = 0
const levels = [
  map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....p...............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let score = 0
let status = 0 // 0 -> play , 1 -> pause , 2 -> won , 3 -> lose
let missileTimeout = 0
let bulletTimeout = 0
let alienCreationEnd = 0 
let noOfAlienCreated = 0 

/*onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})*/
onInput("a", () => {
  if(status == 0)
  getFirst(player).x -= 1
})
onInput("d", () => {
  if(status == 0)
  getFirst(player).x += 1
})

onInput("l", () => {
  if(status == 0 && bulletTimeout ==0 ){
    addSprite(getFirst(player).x , getFirst(player).y -1, bullet)
    bulletTimeout = 3
  }
})

onInput("k", () => {
  if(status == 0 && missileTimeout ==0 ){
    addSprite(getFirst(player).x , getFirst(player).y -1, missile)
    missileTimeout = 10
  }
})

onInput("j", ()=>{ 
  if(status == 0 ) status = 1
  else if(status == 1 || status == 2 || status ==3 ) status = 0
})

function showMessageMain(message){
  addText(`${message}`, {
       x: Math.floor(width()/2-3),
       y: Math.floor(height()/2),
       color: color`7`
      })
}
function showMessageBottom(message,margin=0){
  addText(`${message}`, {
       x: Math.floor(width()/2-margin),
       y: Math.floor(height()*3/4),
       color: color`D`
      })
}
function blastErasure(intervalTime){
  setInterval(()=>{
    if(status == 0 ){
      for (let i = getAll(blast).length - 1; i >= 0; i--) {
        let b = getAll(blast)[i]
        b.remove()
        getAll(blast).splice(i, 1)
        score +=1
      }
    }
  },intervalTime)
}

function textUpdate(intervalTime){
  setInterval(()=>{
    clearText();
    if(status == 1 ) {
      showMessageMain("paused")
      showMessageBottom("press j to unpause",9)
    }
    else if(status == 2 ){
      showMessageMain("You win")
      showMessageBottom("press j to continue",9)
    }
    else if(status == 3 ){
      showMessageMain("You lose")
      showMessageBottom("press j to replay",9)
    }
    
    addText(`Score :${score},${alienCreationEnd},${noOfAlienCreated},${status}`, {
       x: 0,
       y: 0,
       color: color`3`
    })
    
    addText(`${missileTimeout},${bulletTimeout} `, {
       x: width()-5,
       y: 0,
       color: color`D`
    })
    
  },intervalTime)
}

// move the bullets of the player
function moveBullets(intervalTime){
  setInterval(() => {  
    if(status == 0){
      if(bulletTimeout >0) bulletTimeout -= 1
      for (let i = getAll(bullet).length - 1; i >= 0; i--) {
        let b = getAll(bullet)[i]
        if ( b.y > 0) {
          b.y -= 1
        } else {
          b.remove()
          getAll(bullet).splice(i, 1)
        }
 
        // 💥 Check if this bullet hits an alien
        let tile = getTile(b.x, b.y)
        for (let s of tile) {
          if (s.type === alien) {
            s.remove()  // remove alien
            b.remove()  // remove bullet
            addSprite(b.x , b.y, blast)
            break
          }
         }
        }
      }
    }, intervalTime)  
  }

// move the missiles of the player
function moveMissiles(intervalTime){
  setInterval(() => { 
    if(status==0){
      if(missileTimeout >0) missileTimeout -= 1
      for (let i = getAll(missile).length - 1; i >= 0; i--) {
        let m = getAll(missile)[i]
        if ( m.y > 0) {
          m.y -= 1
        } else {
          m.remove()
          getAll(missile).splice(i, 1)
        }
 
        // 💥 Check if this bullet hits an alien
        let contactPointTile = getTile(m.x,m.y)
        let tiles = [
          getTile(m.x, m.y),
          getTile(m.x-1, m.y),
          getTile(m.x+1, m.y),
          getTile(m.x, m.y-1),
          getTile(m.x-1, m.y-1),
          getTile(m.x+1, m.y-1)
        ]
        for (let s of contactPointTile) {
          if (s.type === alien) {
            for (let tile of tiles){
              for(let s1 of tile){
                if (s1.type === alien) {
                  s1.remove()  // remove alien
                  addSprite(s1.x , s1.y, blast)
                }
              }
            }
            m.remove()  // remove bullet
          }
        }
      }
    }
  }, intervalTime)  
}

/* keep setAliens less than moveAliens otherwise Aliens will overlap */

/* spons new aliens */
function setAliens(noOfAliens,intervalTime){
  setAlien = setInterval(()=>{
    if(status == 0){
      addSprite(0 , 0, alien) 
      noOfAlienCreated += 1
    }
    
    if(noOfAlienCreated >= noOfAliens ){ 
      clearInterval(setAlien)
      alienCreationEnd = 1                                
    }
  },intervalTime)
  
}

/* function that moves the aliens */
function moveAliens(intervalTime){
  setInterval(()=>{ 
    if(status == 0){
      for (let i = getAll(alien).length - 1; i >= 0; i--) {        
        
        let a = getAll(alien)[i]
        
        if(a.y >= height()-1) status = 3 // lost
        
        if( a.y%2==1 ){
          if(a.x==0) a.y+=1
          else a.x-=1
        }
        else {
          if(a.x==width()-1) a.y+=1
          else a.x+=1
        }   
      }
    }
  },intervalTime)
}

textUpdate(50)
blastErasure(500)
moveBullets(100)
moveMissiles(150)
setAliens(20,200)
moveAliens(200)


setInterval(()=>{
    if( noOfAlienCreated == score && alienCreationEnd == 1 ) status = 2 // won
},100)

afterInput(() => {

})
