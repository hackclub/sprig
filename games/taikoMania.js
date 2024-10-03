/*
@title: taikoMania
@author: Isaac Wong
@tags: []
@addedOn: 2023-12-29
*/

const row1 = "1"
const row2 = "2"
const note = "n"
const held = "h"

setLegend(
  [ note, bitmap`
................
....00000000....
..003333333300..
.00333333333300.
0033333333333300
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
.00333333333300.
..003333333300..
....00000000....
................`],
  [ row1, bitmap`
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000` ],
  [ row2, bitmap`
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....0000C0000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000`],

)

const levels = [
  map`
.1.........
.2.........`
]

//notes
const D5HH = tune`
2000: D5~2000,
15500`
const D5H = tune`
1000: D5~1000,
15500`
const C5HH = tune`
2000: C5~2000,
15500`
const C5H = tune`
1000: C5~1000,
15500`
const C5 = tune`
500: C5~500,
15500`
const B4 = tune`
500: B4~500,
15500`
const B4H = tune`
1000: B4~1000,
15500`
const A4 = tune`
500: A4~500,
15500`
const A4H = tune`
1000: A4~1000,
15500`
const A4HH = tune`
2000: A4~2000,
15500`
const G4 = tune`
500: G4~500,
15500`
const G4H = tune`
1000: G4~1000,
15500`
const G4HH = tune`
2000: G4~2000,
15500`
const F4 = tune`
500: F4~500,
15500`
const F4HH = tune`
2000: F4~2000,
15500`
const F4H = tune`
1500: F4~1500,
15500`
const E4 = tune`
500: E4~500,
15500`
const E4H = tune`
1000: E4~1000,
15500`
const E4HH = tune`
2000: E4~2000,
15500`
const D4 = tune`
500: D4~500,
15500`
const D4H = tune`
1000: D4~1000,
15500`
const D4HH = tune`
2000: D4~2000,
15500`
const C4 = tune`
500: C4~500,
15500`
const C4H = tune`
1000: C4~1000,
31000`
const C4HH = tune`
2000: C4~2000,
15500`
const B3 = tune`
500: B3~500,
15500`
const B3H = tune`
1000: B3~1000,
15500`
const B3HH = tune`
2000: B3~2000,
15500`
const A3 = tune`
500: A3~500,
15500`
const A3H = tune`
1000: A3~1000,
15500`

const R = tune`
16000`


const catalog = [
  {
    name: "Hot Cross Buns",
   suggestedBPM: 120,
   beats: [R,R,R,R,R,R,R,R,R, B4, A4, G4H, R, B4, A4, G4H, R, G4, G4, G4, G4, A4, A4, A4, A4, B4, A4, G4H],
   notes: [0,1,0,2,0,1,0,2,0,0,0,0,1,1,1,1,0,1,0]
  },
  {
    name: "Au Clair De La Lune",
    suggestedBPM: 120,
   beats: [R,R,R,R,R,R,R,R,R, F4, F4, F4, G4,A4H,G4H, F4, A4, G4, G4, F4HH, R, F4, F4, F4, G4,A4H,G4H, F4, A4, G4, G4, F4HH],
   notes: [0,0,0,1,0,1,0,0,1,1,0,2,0,0,0,1,0,1,0,0,1,1,0]
  },
  {
    name: "Sakura, Sakura",
    suggestedBPM: 140,
   beats: [R,R,R,R,R,R,R,R,R, D4H,D4H,E4HH, D4H,D4H,E4HH, D4H,E4H,F4H,E4H,D4H,E4,D4,B3HH, A4H, F4H, A4H, B4H, A4H, A4, F4, E4HH, D4H,D4H,E4HH, D4H,D4H,E4HH, D4H,E4H,F4H,E4H,D4H,E4,D4,B3HH, A4H, F4H, A4H, B4H, A4H, A4, F4, E4HH, D4H,D4H,E4HH,D4H,D4H,E4HH,A4H,A4H,B4H,G4H,E4,D4,B3HH,D4HH],
   notes: [0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,0,1]
  },
  {
    name: "Banana Boat",
    suggestedBPM: 120,
   beats: [R,R,R,R,R,R,R,R,R, C5HH, G4HH, A4HH, G4HH, C4H,C4H,E4H,E4,E4,D4,C4,D4H,C4HH,R, C4,C4,E4,E4,G4H,E4,E4,F4H,A4H,G4HH, C4H,C4H,E4H,E4,E4,D4,C4,D4H,C4HH, R, C4H,C4H,E4H,E4,E4,D4,C4,D4H,C4HH],
   notes: [1,0,1,0,1,1,0,0,0,0,1,0,1, 2, 1,1,0,0,1,0,0,0,1,0, 1,1,0,0,0,0,1,0,0, 2, 1,1,0,0,0,0,1,0,1]
  },
  {
    name: "Carnival of Venice",
    suggestedBPM: 160,
   beats: [R,R,R,R,R,R,R,R,R, G4H,G4,G4,F4H,E4H,E4,E4,D4H,C4H,C4,C4,B3HH,B3H,D4H,E4H,F4,F4,F4H,G4H,A4,A4,A4H,G4H,E4HH,E4HH,R,G4,G4,G4HH,R,G4,G4,G4HH,G4,G4,G4H,G4H,G4HH,A4,A4,A4H,B4H,C5H,G4H,E4H,C4H],
   notes: [1,1,1,0,1,1,1,0,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,2,1,1,1,2,0,0,0,1,1,0,1,0,1,1,1,0,1,1,0,1]
  },
  {
    name: "Ode to Joy",
    suggestedBPM: 200,
    beats: [R,R,R,R,R,R,R,R,R, E4H,E4H,F4H,G4H,G4H,F4H,E4H,D4H, C4H,C4H,D4H,E4H,E4H,D4,D4HH,R, E4H,E4H,F4H,G4H,G4H,F4H,E4H,D4H, C4H,C4H,D4H,E4H,D4H,C4,C4HH],
   notes: [0,0,0,1,1,0,1,0,1,1,0,1,1,0,0,2, 0,0,0,1,1,0,1,0,1,1,0,1,1,0,0]
  },
  {
    name: "Jumpin'-Jumpin'",
    suggestedBPM: 300,
    beats: [R,R,R,R,R,R,R,R,R, C5,C5,B4,B4,A4H,E4H,C4,C4,B3,B3,A3H,E4H,E4H,A4H,E4,E4,E4,E4,E4H,A4H,R,R,B4,B4,A4,A4,G4H,D4H,B4,B4,A4,A4,G4H,D4H,D4H,G4H,D4H,G4H,D4,D4,D4,D4,D4H,G4H],
   notes: [1,1,0,0,1,0,1,1,0,0,1,0,0,1,0,0,0,0,0,1,2,2,0,0,1,1,0,1,0,0,1,1,0,1,1,0,1,0,1,1,1,1,1,0,2,2]
  },
  {
    name: "Spotlight",
    suggestedBPM: 180,
    beats: [R,R,R,R,R,R,R,R,R, C4H,F4HH,E4H,F4H,D4HH,D4H,F4H,G4H,A4,G4,A4H,F4H,G4HH,C4H,F4HH,E4H,F4H,D4HH,C4H,F4H,G4H,A4,B4,A4H,F4H,G4HH,F4H,C4H,G4H,A4,
            B4,A4H,G4,R,A4,B4,A4H,G4H,R,A4,B4,A4H,E4H,F4HH,D5HH,C5H,G4,A4,B4H,C5H,A4H,G4,D4,E4H,C4H,D4HH,B4H,A4H,R,G4,F4,E4HH,F4H,R,F4H,G4,F4HH],
   notes: [1,0,1,0,1,1,1,0,1,0,1,1,0,0,0,1,0,0,1,1,0,1,0,1,1,0,1,1,1,0,1,0,1,2,0,1,0,1,2,0,1,0,0,1,1,1,0,0,1,0,1,1,0,1,0,1,0,0,1,2,0,1,0,1,2,0,0,0]
  },
  {
  name: "Fast Clicks",
  suggestedBPM: 400,
  beats: [R,R,R,R,R,R,R,R,R, C4,D4,C4,D4,C4,D4,C4,D4,C4,D4,C4,D4,C4,D4,C4,D4,R,R,R,F4],
   notes: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,2,2,0]
},

]

let beatNum = 0

let score = 0
let level = 0
let bpm = catalog[level]["suggestedBPM"]
let gaming = false

setMap(levels[0])
startText()

function time() {
  score = 0
  beatNum = 0
  var gameLoop = setInterval(()=> {
  // note movement
  for (let n in getAll(note)) {
    getAll(note)[n].x -= 1
  }
  //clear missed notes
  if(getTile(0,0).length >= 1) {
    clearTile(0,0)
    hitRes('miss')
  }
  if(getTile(0,1).length >= 1) {
    clearTile(0,1)
    hitRes('miss')
  }
  
  if(gaming && beatNum < catalog[level]["beats"].length) {
    if(catalog[level]["notes"][beatNum] != 2 && catalog[level]["notes"][beatNum] != undefined) {
      addSprite(10, catalog[level]["notes"][beatNum], note)
    }
    playTune(catalog[level]["beats"][beatNum])
    beatNum += 1
  } else {
    startText(true)
    gaming = false
    clearInterval(gameLoop)
    
   }

},  (60000/bpm))
}

function startText(displayScore) {
clearText()
if(displayScore) {addText("Score: " + Math.round(score*(bpm/catalog[level]["suggestedBPM"])), {x:0, y:2, color: color`2`})}
  addText("BPM: " + bpm, {x:0,y:0, color: color`2`})
addText("Select BPM (k).", {x:0,y:10, color: color`2`})
addText("Press (j) to skip.", {x:0,y:11, color: color`2`})
addText("Press (l) to start.", {x:0,y:12, color: color`6`})
addText("BPM: " + bpm + " (x"+Math.round((bpm/catalog[level]["suggestedBPM"])*10)/10+")", {x:0,y:1, color: color`2`})

addText(catalog[level]["name"], {x:0,y:0, color: color`2`})

addText("Use (w) and (i)", {x:0,y:4, color: color`7`})
addText("to hit the notes.", {x:0,y:5, color: color`7`})
}

function hitRes(score) {
  clearText()
  switch (score) {
    case 'miss':
      addText("MISS", {x:0, y:2, color: color`3`})
      break;
    case 'perfect':
      addText("PERFECT", {x:0, y:2, color: color`7`})
      break;
    case 'ok':
      addText("OK", {x:0, y:2, color: color`6`})
      break;
    default: {}
}
}

//oninputs
onInput("w", () => {
    if(getTile(getFirst(row1).x, getFirst(row1).y).length > 1) {
      getTile(getFirst(row1).x, getFirst(row1).y)[0].remove()
      hitRes('perfect')
      score += 200
  } else
  if(getTile(getFirst(row1).x+1, getFirst(row1).y).length >= 1) {
      getTile(getFirst(row1).x+1, getFirst(row1).y)[0].remove()
      hitRes('ok')
      score += 100
    }
  else score -= 100
})


onInput("i", () => {
    if(getTile(getFirst(row2).x, getFirst(row2).y).length > 1) {
      getTile(getFirst(row2).x, getFirst(row2).y)[0].remove()
      hitRes('perfect')
      score += 300
  } else
  if(getTile(getFirst(row2).x+1, getFirst(row2).y).length >= 1) {
      getTile(getFirst(row2).x+1, getFirst(row2).y)[0].remove()
      hitRes('ok')
      score += 100
    }
  else score -= 50
})

onInput("k", () => {
  if (!gaming) {
    if (bpm < 500) { bpm += 20 }
    else {bpm = 100}
    clearText()
    startText()
    addText("BPM: " + bpm + " (x"+Math.round((bpm/catalog[level]["suggestedBPM"])*10)/10+")", {x:0,y:1, color: color`2`})
  }
})

onInput("l", () => {
  if(!gaming)
  {
    gaming = true
    time()
    clearText()
  }
})

onInput("j", () => {
  if(!gaming) {
      if(level < catalog.length-1) {
    level += 1
    bpm = catalog[level]["suggestedBPM"]
  } else level = 0
  startText() //refresh level
  }
})

afterInput(() => {
  
})

