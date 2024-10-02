
/* 
@title: flappysprig
@author: Spectral
@tags: ['retro']
@addedOn: 2023-09-10
*/

    /*

Use W and Z to move up and down. It's a Flappy Bird but with a Sprig. The sprig is the same that on SprigressBar, MathR is a friend and autorised me to pick it. Go check his game!!!!
I've just seen that there is already an Flappy Bird but ... I've passed so much time on it to stop it. I don't think i will get a sprig but, i hope it.
Enjoy my Game !
(And sorry for my english that is like ... The pipes on this game ;-))

*/
const player = "p"
const background = "b"
const backgroundgameover = "c"
const sprig_a = 's'
const sprig_b = 't'
const sprig_c = 'u'
const sprig_d = 'v'
const mur1 = "w"
const mur2 = "x"
const mur3 = "y"

let interval = "something"
let phisycinterval = 1
let pipe_interval = 1

let pipe_entry_pointy

let isongameoverscreen = false

let point = 0

setLegend(
  [ mur1, bitmap`
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D`],
  [ mur2, bitmap`
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
.DDDDDDDDDDDDDD.
.D444444444444D.
DD444444444444DD
D44444444444444D
D44444444444444D
D44444444444444D`],
  [ mur3, bitmap`
D44444444444444D
D44444444444444D
D44444444444444D
DD444444444444DD
.D444444444444D.
.DDDDDDDDDDDDDD.
................
................
................
................
................
................
................
................
................
................`],
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ background, bitmap `
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
  [backgroundgameover, bitmap `
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
  [sprig_a, bitmap`
.00000..........
0444440.........
44044440........
444044440.......
4444004440......
0444440440......
.004444040......
...0004400......
......0440......
0000...000......
222200..........
22222200........
22222220........
222222220.......
222222220.......
2222200000......`],
  [sprig_b, bitmap`
................
..............00
...........00000
..........000.00
...........00..0
............00..
............00..
............00..
............000.
..........000000
........00222222
.......022222222
......0222222222
......0222222222
.....02222222222
.....02222200000`],
  [sprig_c, bitmap`
.....02222020000
.....02222020000
.....02222002220
.....02222220002
.....02222222222
.....02222222222
.....02200222222
.....02222000022
.....02222222200
.....02222222222
.....02222222222
.....02222222222
.....02222222222
.....02222222222
......0222222222
......0222222222`],
  [sprig_d, bitmap`
0222020000......
0222020020......
0222200000......
22222222220.....
22222222220.....
22222222220.....
22222222220.....
2222222220......
222222000.......
000000..........
20..............
20..............
220.............
220.............
2200............
2220............`]
)

setSolids([mur1,mur2,mur3])

let level = 0
let levelgameover = 1
const levels = [
  map `
...........w........
...........w........
...........w........
...........w........
...........w........
...........y........
.......ts...........
.......uv...........
...........x........
...........w........
...........w........
...........w........
...........w........
...........w........
...........w........
...........w........`
  ,
  map `
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
]
resetintervals()

setPushables({
  [ player ]: [],
})


onInput("s", () => {
  getFirst(sprig_a).y -= 1
  getFirst(sprig_b).y -= 1
  getFirst(sprig_c).y -= 1
  getFirst(sprig_d).y -= 1
})
onInput("j", () => {
  if (isongameoverscreen == true) {
    resetintervals()
    clearText()
  }
})
onInput("w", () => {
  getFirst(sprig_a).y += 1
  getFirst(sprig_b).y += 1
  getFirst(sprig_c).y += 1
  getFirst(sprig_d).y += 1
})

afterInput(() => {
  
})
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function catchdead() {
  isongameoverscreen = true
  setMap(levels[levelgameover])
  clearInterval(phisycinterval)
  clearInterval(pipe_interval)
  let scorestring = point.toString()
  clearInterval(interval)
  setBackground(backgroundgameover)
  point = 0

}
function placepipes() {
  // Generate the start y of pipe
  pipe_entry_pointy = getRandomInt(3,14)
  addSprite(15,pipe_entry_pointy,mur2)
  addSprite(15,pipe_entry_pointy - 4,mur3)
  let pipe_entry_pointy_down = pipe_entry_pointy + 1
  let numberofpipedown = 15 - pipe_entry_pointy 
  for (let i = 0; i < numberofpipedown; i++) {
    addSprite(15,pipe_entry_pointy_down + i,mur1)
  }
  for (let i = 0; i < pipe_entry_pointy - 4; i++) {
    addSprite(15,i,mur1)
  }
}
   


  
function resetintervals() {
  isongameoverscreen = false
  setBackground(background)
  setMap(levels[level])
  interval = setInterval(function() {
  // Delete Pipes

  for (let i = 0; i < 16; i++){
    clearTile(0,i)
  }
  // Make advance the pipes
  var my_array = getAll(mur1)
  var result = my_array.length;
  for (let i = 0; i < result; i++){
    getAll(mur1)[i].x -= 1
  }
  var my_array2 = getAll(mur2)
  var result2 = my_array2.length;
  for (let i = 0; i < result2; i++){
    getAll(mur2)[i].x -= 1
  }
  var my_array3 = getAll(mur3)
  var result3 = my_array3.length;
  for (let i = 0; i < result3; i++){
    getAll(mur3)[i].x -= 1
  }
  // Check if the player is on pipes

  let playerx = getFirst(sprig_a).x
  let playery = getFirst(sprig_a).y
  
  // Add 1 point when player pass an pipe

  let playery1 = playery - 1
  let playery2 = playery - 2
  

  if (getTile(playerx,playery1)[0] || getTile(playerx,playery2)[0] ) {
    point += 1
  }
  // Show Points at the right of the screen
  // console.log(point)
  let pointstring = point.toString()
  clearText()
  addText(pointstring, { 
  x: 1,
  y: 1,
  color: color`0`
  })
  // console.log(playerx,playery)
  if (getTile(playerx, playery)[1]) {
    // Make the game over screen appears
    clearText()
    addText("Score : "+ point, {x:5,y:6,color:color`0`})
    addText("Press J to restart", {x:1,y:8,color:color`0`})
    catchdead()
    
  }
}, 700);



phisycinterval = setInterval(function() {
  getFirst(sprig_a).y += 1
  getFirst(sprig_b).y += 1
  getFirst(sprig_c).y += 1
  getFirst(sprig_d).y += 1
}, 600);

pipe_interval = setInterval(function() {
  placepipes()
}, 4000);
}
