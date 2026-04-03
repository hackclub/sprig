/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: apple catcher
@author: TheUtkarsh8939
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const ground = "g"
const sky = "s"
const apple = "a"
const heart = "h"
let score = 1
function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled; 
}
setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
.CCCC......CCCC.
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..
...CCCCCCCCCCC..
...CCCCCCCCCC...
.....CCCCCC.....` ],
  [ ground, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
CC444C4444CC44CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [sky, bitmap`
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
  [apple, bitmap`
.......DDD......
.......DDDD.....
.......DD.......
....00.D.000....
.000330D00300...
.033333303330...
.0333333333300..
.03333333333300.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333300.
.0033300033330..
..00300.00000...
...000.....0....`],
  [heart, bitmap`
................
................
..00000...0000..
.03333000003300.
0333333333333300
0333233333333330
0333223333333330
0333323333333330
0333333333333300
033333333333330.
00333333333330..
.0033333333300..
..00333333300...
...000333300....
.....033300.....
......0000......`]
)
addText("Score",{
  x:0,
  y:0,
  color: color`2`
})
setSolids([])

let level = 0
const levels = [
  map`
....hhhh
........
........
........
........
........
p.......
gggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
setBackground(sky)

onInput("a", () => {
  getFirst(player).x +=1
})

onInput("d", () => {
  getFirst(player).x -=1
})

afterInput(() => {
  
})
let spawnedApples = -1
//Apple adder loop
setInterval(()=>{
  const x = getRandomIntInclusive(0,7)
  const y = getRandomIntInclusive(0,1)
  addSprite(x,y,apple)
  spawnedApples++
},1500)

//Gravity Loop
setInterval(()=>{
  let all = getAll(apple)
  for (let i=0; i<all.length;i++){
    all[i].y+=1
    if (getFirst(player).x == all[i].x && getFirst(player).y == all[i].y){
      score++
      addText(`${score-1}`,{
          x:6,
          y:0,
          color: color`2`
      })
    }
    if(spawnedApples>score){
      let livesLost = spawnedApples-score
      if (livesLost == 4){
        addText("Game over", { 
            x: 3,
            y: 5,
            color: color`3`
        })
    }
      clearTile(3+livesLost,0)
  }
}
},400)
