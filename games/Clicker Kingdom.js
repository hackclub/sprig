/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: clicker
@author: MaxMph 
@tags: []
@addedOn: 2024-08-15
*/

const player = "p"
const brick = "b"
const grass = "g"
const tree = "t"
const stone = "s"
const header = "h"
const bg = "q"
const village = "v"
const winbg = "w"

let wood = 0
let woodbuffer = 150
let forestlvl = 1
let forestcost = (forestlvl * 10)
let rock = 0
let rockbuffer = 150
let minelvl = 1
let minecost = (minelvl * 10)
let people = 1
let canclick = true


function varupdate() 
{
  forestcost = (forestlvl * 10)
  minecost = (minelvl * 10)
}

varupdate() 

setLegend(
  [ player, bitmap`
................
................
................
................
................
.......22.......
......2..2......
.....2....2.....
.....2....2.....
......2..2......
.......22.......
................
................
................
................
................` ],
  [ brick, bitmap`
LLLLLLLLLLLLLLLL
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
LLLLLLLLLLLLLLLL
11111111L1111111
11111111L1111111
11111111L1111111
11111111L1111111
11111111L1111111
11111111L1111111
11111111L1111111`],
  [ grass, bitmap`
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
  [ tree, bitmap`
....4...........
...44...........
...444.....4....
..4444.....4....
..44444...44....
..44444...444...
.444444...444...
.444444..4444...
.444444..44444..
.444444..44444..
..4444...44444..
...FF....44444..
...FF.....444...
...........F....
...........F....
................`],
  [ stone, bitmap`
.....1111111....
...1111111111...
..111111111111..
..111111111111..
.111FFFFFFFF111.
.111F000000F111.
.111F000000F111.
1111F000000F1111
1111F000000F1111
1111F000000F1111
1111F000000F1111
1111F000000F1111
.111F000000F111.
..11F000000F11..
...1111111111...
................`],
  [ header, bitmap`
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
................
................
................`],
  [ village, bitmap`
.......FF.......
......FCCF......
.....FCCCCF.....
....FCCFFCCF....
...FCCFFFFCCF...
..FCCFFLLFFCCF..
..CCFFL11LFFCC..
..CFFL1111LFFC..
..FFL111111LFF..
...F11111111F...
...F1LL11111F...
...F1LL11111F...
...F1LL11111F...
...F11111111F...
................
................`],
  [ bg, bitmap`
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
0000000000000000`],
  [ winbg, bitmap`
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
2222222222222222`]
)

//sound effects
const treehit = tune`
375: E5^375,
11625`
const rockhit = tune`
263.1578947368421: A4~263.1578947368421,
8157.894736842105`
const move = tune`
265.4867256637168: F4/265.4867256637168,
8230.08849557522`
const start = tune`
131.57894736842104: B4~131.57894736842104 + E5^131.57894736842104,
131.57894736842104: C5~131.57894736842104 + F5^131.57894736842104,
131.57894736842104: D5~131.57894736842104 + G5^131.57894736842104,
3815.78947368421`
const win = tune`
150.7537688442211: F4^150.7537688442211 + A4~150.7537688442211,
150.7537688442211: F4^150.7537688442211 + A4~150.7537688442211,
150.7537688442211,
150.7537688442211: G4^150.7537688442211 + C5~150.7537688442211,
150.7537688442211: A4^150.7537688442211 + D5~150.7537688442211,
150.7537688442211,
150.7537688442211: E5~150.7537688442211,
150.7537688442211,
150.7537688442211: B4~150.7537688442211,
150.7537688442211: A4~150.7537688442211,
150.7537688442211: B4~150.7537688442211,
150.7537688442211: C5~150.7537688442211,
150.7537688442211: A4~150.7537688442211,
2864.3216080402008`
const song = tune`
500: F4~500 + A4~500,
500: F4~500 + A4~500,
500: G4~500 + B4~500,
500: A4~500 + C5~500,
500: G4~500 + B4~500,
500: G4~500 + B4~500,
500: A4~500 + C5~500,
500: G4~500 + B4~500,
500: F4~500 + A4~500,
500: F4~500 + A4~500,
500: G4~500 + B4~500,
500: A4~500 + C5~500,
500: A4~500 + C5~500,
500: F4~500 + C5~500,
1000,
500: F4~500 + A4~500,
500: F4~500 + A4~500,
500: G4~500 + B4~500,
500: G4~500 + B4~500,
500: A4~500 + C5~500,
500: A4~500 + C5~500,
500: A4~500 + C5~500,
500: G4~500 + B4~500,
500: F4~500 + A4~500,
500: F4~500 + A4~500,
500: G4~500 + B4~500,
500: G4~500 + B4~500,
500: A4~500 + C5~500,
500: G4~500 + B4~500,
500: F4~500 + A4~500,
500: E4~500 + G4~500`

const playback = playTune(song, Infinity)

setSolids([player, header])

let level = 1
const levels = [
  map`
hhhhh
..p..
.....
t.v.s`, //main
  map`
.......
.......
.......
.......
.......
.......`, //startscreen
  map`
...........
...........
...........
...........
...........
...........
...........
...........
...........`, //stat screen
  map`
...........
...........
...........
...........
...........
...........
...........
...........
...........`, // info screen
  map`
...........
...........
...........
...........
...........
...........
...........
...........
...........`, //winscreen
]

//setmap()
setmap()
updatetext()

setPushables({
  [ player ]: []
})

onInput("w", () => {
  if (level === 0){
    getFirst(player).y -= 1
    playTune(move)
  }
})

onInput("a", () => {
  if (level === 0){
    getFirst(player).x -= 1
    playTune(move)
  }
})


onInput("s", () => {
  if (level === 0){
    getFirst(player).y += 1
    playTune(move)
  }
})

onInput("d", () => {
  if (level === 0){
    getFirst(player).x += 1
    playTune(move)
  }
})


afterInput(() => {
  
})

onInput("l", () => {
  
  if (level === 0){
  let P = getFirst(player);
  let TREE = getFirst(tree);
  let ROCK = getFirst(stone);
  let HOME = getFirst(village);
    if (canclick == true){
      if (P.x === ROCK.x && P.y === ROCK.y){
        rock += people
        playTune(rockhit)
        updatetext()
        canclick = false
        setTimeout(clickbuffer, rockbuffer/(minelvl * 0.25))
      }
      if (P.x === TREE.x && P.y === TREE.y){
        wood += people
        playTune(treehit)
        updatetext()
        canclick = false
        setTimeout(clickbuffer, woodbuffer/(forestlvl * 0.25))
      }
      if (P.x === HOME.x && P.y === HOME.y && wood > 9 && rock > 9){
        people += 1
        wood -= 10
        rock -= 10
        playTune(treehit)
        wincondish()
        updatetext()
        canclick = false
        setTimeout(clickbuffer, 40)
      }
    }
  }
  if (level === 1){
    level = 0
    playback.end()
    setmap()
    updatetext()
    playTune(start)
  }
})

onInput("i", () => {
  if (level === 0){
    let P = getFirst(player);
    let TREE = getFirst(tree);
    let ROCK = getFirst(stone);
    let HOME = getFirst(village);
    varupdate() 
    if (P.x === ROCK.x && P.y === ROCK.y && wood > (minecost - 1)){
      playTune(start)
      wood -= minecost
      minelvl += 1
      updatetext()
      varupdate() 
    }
    if (P.x === TREE.x && P.y === TREE.y && rock > (forestcost - 1)){
      playTune(start)
      rock -= forestcost
      forestlvl += 1
      updatetext()
      varupdate() 
    }
  }
})

onInput("j", () => {
  if (level != 1)
    if (level === 0){
      level = 2
      setmap()
      updatetext()
    }
    else {
      level = 0
      setmap()
      updatetext()
    }
})

onInput("k", () => {
  if (level != 1){
    if (level === 0){
      level = 3
      setmap()
      updatetext()
    }
    else {
      level = 0
      setmap()
      updatetext()
    }
  }
})

function clickbuffer()
  {
    canclick = true
  }

function wincondish()
  {
    if (people > 99){
      level = 4
      playTune(win)
      setmap()
      updatetext()
      endtime = true
      setTimeout(winsong, 2500)
    }
  }
function winsong()
{
  playTune(song)
}

let starttime = Date.now()
let time = 0
let endtime = false
setInterval(timeupdate, 1000)
  
function timeupdate(){
  if (endtime === false){
    let delta = Date.now() - starttime;
    time = Math.round(delta / 1000)
    updatetext()
  }
}

//level stuff

function setmap(){
  setMap(levels[level])
  if (level === 0)
    setBackground(grass)
  if (level === 1)
    setBackground(bg)
  if (level === 2)
    setBackground(bg)
  if (level === 3)
    setBackground(bg)
  if (level === 4)
    setBackground(winbg)
}


function updatetext()
{
  clearText()
  
  if (level === 0){
    addText("wood:" + wood, {
      x:0,
      y:0,
      color: color`2`
    })
    addText("stone:" + rock, {
      x:0,
      y:1,
      color: color`2`
    })
    addText("people:" + people, {
      x:0,
      y:2,
      color: color`2`
    })
    addText("J: stats", {
      x:10,
      y:0,
      color: color`1`
    })
    addText("k: info", {
      x:10,
      y:1,
      color: color`1`
    })
    addText("time:" + time, {
      x:10,
      y:2,
      color: color`1`
    })
  }
  if (level === 1){
    
    addText("press L to start", {
      x:2,
      y:8,
      color: color`1`
    })
    addText("CLICKER KINGDOM", {
      x:2,
      y:6,
      color: color`2`
    })
  }
  if (level === 2){
    addText("STATS", {
      x:8,
      y:1,
      color: color`2`
    })
    addText("forest level:" + forestlvl, {
      x:1,
      y:3,
      color: color`2`
    })
    addText("upgrade cost:" + forestcost, {
      x:1,
      y:4,
      color: color`2`
    })
    addText("mine level:" + minelvl, {
      x:1,
      y:6,
      color: color`2`
    })
    addText("upgrade cost:" + minecost, {
      x:1,
      y:7,
      color: color`2`
    })
  }
  if (level === 3){
    addText("INFO", {
      x:8,
      y:1,
      color: color`2`
    })
    addText("hold L to collect", {
      x:1,
      y:3,
      color: color`2`
    })
     addText("resources", {
      x:1,
      y:4,
      color: color`2`
    })
    addText("press J to upgrade", {
      x:1,
      y:6,
      color: color`2`
    })
    addText("infrastructure", {
      x:1,
      y:7,
      color: color`2`
    })
    addText("get more people to", {
      x:1,
      y:9,
      color: color`2`
    })
    addText("gather more", {
      x:1,
      y:10,
      color: color`2`
    })
    addText("resources", {
      x:1,
      y:11,
      color: color`2`
    })
     addText("get a population", {
      x:1,
      y:13,
      color: color`2`
    })
    addText("of 1000 to win!", {
      x:1,
      y:14,
      color: color`2`
    })
  }
  if (level === 4){
    addText("YOU WIN!", {
      x:6,
      y:6,
      color: color`4`
    })
    addText("your time:"+ time, {
      x:4,
      y:8,
      color: color`4`
    })
  }
}

