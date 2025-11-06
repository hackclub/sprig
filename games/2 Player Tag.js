/*
@title: 2 Player Tag Game
@author: Leo B
@description: Simple tag game, WASD for red, IJKL for blue. Red has to try catch blue within the time limit, if they do, red gets the point. If blue evades, blue gets the point. First to 7 points wins. 
@tags: [2 Player]
@addedOn: 2025-11-04
*/

const restart = tune`
473.6842105263158,
157.89473684210526: E4/157.89473684210526,
157.89473684210526: E4~157.89473684210526,
473.6842105263158,
157.89473684210526: G4/157.89473684210526,
157.89473684210526: G4~157.89473684210526,
315.7894736842105,
157.89473684210526: B4/157.89473684210526,
157.89473684210526: B4~157.89473684210526,
473.6842105263158,
157.89473684210526: D5/157.89473684210526,
157.89473684210526: D5/157.89473684210526,
157.89473684210526: D5/157.89473684210526,
1894.7368421052631`
const music = tune`
109.89010989010988: C4~109.89010989010988,
109.89010989010988: C4-109.89010989010988,
109.89010989010988: C4~109.89010989010988,
109.89010989010988: C5/109.89010989010988,
109.89010989010988: C4~109.89010989010988,
109.89010989010988: G4/109.89010989010988,
109.89010989010988: D4~109.89010989010988,
109.89010989010988: C4^109.89010989010988,
109.89010989010988: D4~109.89010989010988,
109.89010989010988: F4-109.89010989010988,
109.89010989010988: D4~109.89010989010988,
109.89010989010988: C4/109.89010989010988,
109.89010989010988: E4~109.89010989010988,
109.89010989010988: D4^109.89010989010988,
109.89010989010988: E4~109.89010989010988,
109.89010989010988: F4^109.89010989010988,
109.89010989010988: E4~109.89010989010988,
109.89010989010988: B4/109.89010989010988,
109.89010989010988: F4~109.89010989010988,
109.89010989010988: C4-109.89010989010988,
109.89010989010988: F4~109.89010989010988,
109.89010989010988: A4^109.89010989010988,
109.89010989010988: F4~109.89010989010988,
109.89010989010988: A4/109.89010989010988,
109.89010989010988: G4~109.89010989010988,
109.89010989010988: A4^109.89010989010988,
109.89010989010988: G4~109.89010989010988,
109.89010989010988: E4-109.89010989010988,
109.89010989010988: G4~109.89010989010988,
109.89010989010988: C5^109.89010989010988,
109.89010989010988: D4~109.89010989010988 + B4/109.89010989010988,
109.89010989010988: D4~109.89010989010988 + G4-109.89010989010988`
const player = "p"
const player2 = "2"
const wall = "w"
const endColor = "e"
const background = "b"
let tagged = false 
let time = 0 
let gameActive = true
let redScore = 0
let blueScore = 0
let bPointGiven = false
let rPointGiven = false
let restartSongPlaying = false 
let waitTime = 0          
let display = false
let bothZero = false

  
var playback = playTune(music, Infinity)






setInterval(() => {



if (time == 1 && blueScore == 0 && redScore == 0) {


  addText("First to 7", {
      x: 5,
      y: 12,
      color: color`8`
  })
}
  
  if (time == 200) {
    clearText()
    bothZero = false
    display = false
  }



  
if(blueScore == 7 ) {
  setMap(end)
  clearText()
  gameActive = false
  restartSongPlaying = true
  playback.end()
  
  addText("Blue Wins!", {
    x: 5,
    y: 5,
    color: color`7`
  })
  }

if(redScore == 7 ) {
  setMap(end)
  clearText()
  gameActive = false
  restartSongPlaying = true
  playback.end()
  
  addText("Red Wins!", {
    x: 5,
    y: 5,
    color: color`3`
  })
  }


  
  if(restartSongPlaying == false & gameActive == false) {
  waitTime += 1 
  }


  if(waitTime >= 500){
    level += 1
    setMap(levels[level])
    clearText()
    
    
     playback = playTune(music, Infinity)


      addText(`${redScore}`, {
  x:17,
  y:1,
  color: color`3`
})

 
addText("-", {
  x:18,
  y:1,
  color:color`0`
})
  
addText(`${blueScore}`, {
  x:19,
  y:1,
  color: color`7`
})
    
    gameActive = true
    tagged = false
    time = 0
   bPointGiven = false
   rPointGiven = false
  restartSongPlaying = false 
  waitTime = 0 
      
    
  }


  
  
  let checkTagged = tilesWith(player, player2).length;
  if (checkTagged >= 1 && !rPointGiven) {
  gameActive = false
  redScore += 1
  tagged = true
  rPointGiven = true
    playback.end()
  playTune(restart,1)
     
    
    
    addText ("Red Point", {
    x:6,
    y:5,
    color: color`3`
  })
  
  }

    
  time += 1
  if (time >= 700 && !tagged && !bPointGiven ) { // Make sure to multiply desired time (in seconds) by 100
    bPointGiven = true
    gameActive = false
    blueScore += 1
    playback.end()
    playTune(restart, 1)
 
    addText("Blue Point", {
    x: 6,
    y:5,
    color: color`7`
  })

    
    
}

  
   
  
  addText(`${redScore}`, {
  x:17,
  y:1,
  color: color`3`
})

addText("-", {
  x:18,
  y:1,
  color:color`0`
})
  
addText(`${blueScore}`, {
  x:19,
  y:1,
  color: color`7`
})




if(redScore == 6 && gameActive == true) {
  addText("Match Point", {
    x:5,
    y:13, 
    color: color`3`
  })
}

  if(blueScore == 6 && gameActive == false) {
  addText("Match Point", {
    x:5,
    y:13, 
    color: color`7`
  })
}
  
  
}, 1)




setLegend(
  [ player, bitmap`
................
................
................
................
....33333333....
....33333333....
....33333333....
....30033003....
....30033003....
....33333333....
....33333333....
....33333333....
................
................
................
................` ],
  [ player2, bitmap`
................
................
................
................
....77777777....
....77777777....
....77777777....
....70077007....
....70077007....
....77777777....
....77777777....
....77777777....
................
................
................
................`],
  [wall, bitmap`
1111111111111111
11LLLLLLLLLLLL11
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
11LLLLLLLLLLLL11
1111111111111111`],
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [endColor, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],

)


const end = map`
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee
eeeeeeeeeeee`

setBackground(background)



// only walls are solid
setSolids([wall])

function canMove(sprite, dx, dy) {
  const x = sprite.x + dx
  const y = sprite.y + dy
  const things = getTile(x, y)
  // if there’s any wall in the target tile, block the move
  return !things.some(t => t.type === wall)
}







// Player 1 movement
onInput("s", () => {
  const p = getFirst(player)
  if (canMove(p, 0, 1) && gameActive)
    p.y += 1
})

onInput("w", () => {
  const p = getFirst(player)
  if (canMove(p, 0, -1) && gameActive)
  p.y -= 1
})

onInput("d", () => {
  const p = getFirst(player)
  if (canMove(p, 1, 0) && gameActive)
    p.x += 1
})

onInput("a", () => {
  const p = getFirst(player)
  if (canMove(p, -1, 0) && gameActive)
    p.x -= 1
})

// Player 2 movement
onInput("k", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, 0, 1) && gameActive)
    p2.y += 1
})

onInput("i", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, 0, -1) && gameActive)
    p2.y -= 1
})

onInput("l", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, 1, 0) && gameActive)
    p2.x += 1
})

onInput("j", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, -1, 0) && gameActive) 
    p2.x -= 1
})




const levels = [
  map`
p...........
.....w......
............
.........w..
............
............
..w.........
........w...
...........2`,
  map`
p...........
.......w....
............
.w..........
............
.....w......
............
............
...........2`,
  map`
p.w.........
w...........
............
......w.....
............
....w.......
............
...........w
.........w.2`,
  map`
p...........
............
............
....wwww....
....wwww....
....wwww....
............
............
...........2`,
  map`
2...........
...w...w....
............
............
............
..w.....w...
........w...
............
...........p`,
  map`
p...........
.......w....
............
............
............
....w.......
............
............
.........w.2`,
  map`
p.....w.....
............
......w.....
............
......w.....
...w........
............
......w.....
......w....2`,
  map`
p..........w
..........w.
.....w......
............
........w...
.....w......
............
.w..........
w..........2`,
  map`
...w....w...
....w..w....
p....ww....2
............
............
............
....w..w....
............
....w..w....`,
  map`
p...........
.....w......
............
.........w..
............
............
..w.........
........w...
...........2`,
  map`
p...........
.......w....
............
.w..........
............
.....w......
............
............
...........2`,
  map`
p.w.........
w...........
............
......w.....
............
....w.......
............
...........w
.........w.2`,
  map`
p...........
............
............
....wwww....
....wwww....
....wwww....
............
............
...........2`,
  map`
2...........
...w...w....
............
............
............
..w.....w...
........w...
............
...........p`,
  ]

let level = 0
setMap(levels[level])

