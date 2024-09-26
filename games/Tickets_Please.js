/*
@title: Tickets Please!
@author: Vaporform (ysk)
@tags: ['singleplayer','simulator']
@addedOn: 2024-09-18
*/

//A game heavily inspired by Papers Please!
//You are a ticket inspector. Find the difference bewteen the ticket and the person.
//If you got it wrong 3 times, the game is over!
//Aim for the highscore!
//////CONTROLS//////
//J to decline
//L to accept
//I to bring the ticket up
//K to bring the ticket down

//Set screen size
let screen_width = 64
let screen_height = 64

/////////////////////////////RENDERING ENGINE/////////////////////////////
//Rederpipeline for sprig, allows devs to display more advanced stuff!
//By Vaporform (ysk)
const colors = {
  q: "0",
  w: "1",
  e: "2",
  r: "3",
  t: "4",
  y: "5",
  u: "6",
  i: "7",
  o: "8",
  p: "9",
  a: "C",
  s: "D",
  d: "F",
  f: "H",
  g: "L",
  h: ".",
}
//Finds corresponding index from value.
function findKeyByValue(value) {
  return Object.keys(colors).find(key => colors[key] === value)
}

//Creating characters for all available colors. ( RUN ONCE! )
function setcolorLegend() {
  const generateBitmap = (value) => {
    return Array(16).fill(value.repeat(16)).join('\n')
  }
  //Behold, the list of colors!
  let colorLegend = Object.entries(colors).map(([color, value]) => [color, bitmap`${generateBitmap(value)}`])
  setLegend(...colorLegend)
} //Taken colors are q-h in qwerty


//Function for sprite scaling
function scaleSprite(sprite, scaleX, scaleY) {
  let scaledSprite = [];
  let spriteLines = sprite.trim().split('\n');

  for (let y = 0; y < spriteLines.length; y++) {
    let line = spriteLines[y];
    let scaledLines = Array(scaleY).fill(null).map(() => '');

    for (let x = 0; x < line.length; x++) {
      let pixel = line[x];
      for (let sy = 0; sy < scaleY; sy++) {
        scaledLines[sy] += Array(scaleX).fill(pixel).join('');
      }
    }

    scaledSprite.push(...scaledLines);
  }

  return scaledSprite;
}

let screen = Array(screen_height).fill(null).map(() => Array(screen_width).fill('.'));

function drawScreen(type = '.') {
  screen = Array(screen_height).fill(null).map(() => Array(screen_width).fill(type));
}

//Rendering Function
function Render(sprites = [], offsets = [], scales = []) {
  // Initialize a blank screen with a default character (e.g., '.')

  // Render each sprite onto the screen
  for (let i = 0; i < sprites.length; i++) {
    let sprite = sprites[i];
    let [offsetX, offsetY] = offsets[i] || [0, 0];
    let [scaleX, scaleY] = scales[i] || [1, 1];
    let scaledSprite = scaleSprite(sprite, scaleX, scaleY);
    for (let y = 0; y < screen_height; y++) {
      for (let x = 0; x < screen_width; x++) {
        let spriteX = x - offsetX;
        let spriteY = y - offsetY;

        if (spriteX >= 0 && spriteX < scaledSprite[0].length && spriteY >= 0 && spriteY < scaledSprite.length) {
          let spriteChar = scaledSprite[spriteY][spriteX];
          if (spriteChar != '.') {
            screen[y][x] = findKeyByValue(spriteChar);
          }
        }
      }
    }
  }

  // Convert the 2D screen array to a string for display
  let mapping = screen.map(row => row.join('')).join('\n');

  //console.log(mapping); //lag
  setMap(mapping);
}

setcolorLegend() // Initialize Render Colors.

/////////////////////////////Game code below!/////////////////////////////
let strikes = 0
const viol = bitmap`
................
................
................
................
2222222222222222
2000000000000002
2020232222320202
2020223223220202
2020222332220202
2020223223220202
2020232222320202
2000000000000002
2222222222222222
................
................
................`

let runonce = false
const music1 = tune`
256.4102564102564: A4-256.4102564102564 + D4/256.4102564102564 + E4~256.4102564102564,
256.4102564102564: A4-256.4102564102564 + D4/256.4102564102564,
256.4102564102564: A4-256.4102564102564 + D4/256.4102564102564,
256.4102564102564: C5-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: C4~256.4102564102564,
256.4102564102564: B4-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: B4-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: B4-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564 + E4~256.4102564102564,
256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564 + C4~256.4102564102564,
256.4102564102564: F5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564,
256.4102564102564: G5-256.4102564102564 + C5/256.4102564102564,
256.4102564102564: A5-256.4102564102564 + D5/256.4102564102564,
256.4102564102564: E4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
769.2307692307693,
256.4102564102564: E4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
512.8205128205128`
const music2 = tune`
256.4102564102564: A5-256.4102564102564 + G4/256.4102564102564 + D4~256.4102564102564,
256.4102564102564: A5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564: A5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: C4~256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564 + D4~256.4102564102564,
256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564 + C4~256.4102564102564,
256.4102564102564: E5-256.4102564102564 + D4/256.4102564102564,
256.4102564102564,
256.4102564102564: E5-256.4102564102564 + D4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + C4/256.4102564102564 + D4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
769.2307692307693,
256.4102564102564: D4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
769.2307692307693`

const daycont = tune`
265.4867256637168: A4-265.4867256637168,
265.4867256637168: A4-265.4867256637168,
265.4867256637168: A4-265.4867256637168,
265.4867256637168: G4-265.4867256637168,
265.4867256637168,
265.4867256637168: G4-265.4867256637168,
265.4867256637168: G4-265.4867256637168,
265.4867256637168: G4-265.4867256637168,
265.4867256637168: F4-265.4867256637168,
265.4867256637168,
265.4867256637168: F4-265.4867256637168,
265.4867256637168: F4-265.4867256637168,
265.4867256637168: F4-265.4867256637168,
265.4867256637168: E4-265.4867256637168,
265.4867256637168,
265.4867256637168: E4-265.4867256637168,
265.4867256637168,
265.4867256637168: D4-265.4867256637168,
3716.8141592920356`
let clear = bitmap`
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
0000000000000000`
let title = bitmap`
0000033330000000
0000000300000000
0000003000000000
0000000000000000
0000333330000000
0033333333330000
0032233223333000
0032233223333000
0033333333333000
0003333333333330
0000333330003330
0000000000033330
0000000033333330
0000000033333330
0000000003333300
0000000000000000`
let bars = bitmap`
0000000000000000
1111111111111111
1111111111111111
0000000000000000
0000000000000000
1111111111111111
1111111111111111
0000000000000000
0000000000000000
1111111111111111
1111111111111111
0000000000000000
0000000000000000
1111111111111111
1111111111111111
0000000000000000`
let barsposition = [0, -40]
const fullmusic = tune`256.4102564102564: A4-256.4102564102564 + D4/256.4102564102564 + E4~256.4102564102564,
256.4102564102564: A4-256.4102564102564 + D4/256.4102564102564,
256.4102564102564: A4-256.4102564102564 + D4/256.4102564102564,
256.4102564102564: C5-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: C4~256.4102564102564,
256.4102564102564: B4-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: B4-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: B4-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564 + E4~256.4102564102564,
256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + F4/256.4102564102564 + C4~256.4102564102564,
256.4102564102564: F5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564,
256.4102564102564: G5-256.4102564102564 + C5/256.4102564102564,
256.4102564102564: A5-256.4102564102564 + D5/256.4102564102564,
256.4102564102564: E4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
769.2307692307693,
256.4102564102564: E4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
256.4102564102564: A5-256.4102564102564 + G4/256.4102564102564 + D4~256.4102564102564,
256.4102564102564: A5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564: A5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: C4~256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: G5-256.4102564102564 + F4/256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564 + D4~256.4102564102564,
256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564,
256.4102564102564: F5-256.4102564102564 + E4/256.4102564102564 + C4~256.4102564102564,
256.4102564102564: E5-256.4102564102564 + D4/256.4102564102564,
256.4102564102564,
256.4102564102564: E5-256.4102564102564 + D4/256.4102564102564,
256.4102564102564: D5-256.4102564102564 + C4/256.4102564102564 + D4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
769.2307692307693,
256.4102564102564: D4~256.4102564102564,
769.2307692307693,
256.4102564102564: C4~256.4102564102564,
769.2307692307693`
const reeling = tune`
58.93909626719057: C4/58.93909626719057,
58.93909626719057: C4/58.93909626719057,
58.93909626719057: C4/58.93909626719057,
58.93909626719057: C4/58.93909626719057,
58.93909626719057: C4/58.93909626719057,
58.93909626719057: C4/58.93909626719057,
58.93909626719057: C4/58.93909626719057,
1473.4774066797643`
frame = 0

let gamestate = 0
let highscore = 0 //Your highscore here! change it to your best

const themesong = playTune(fullmusic, Infinity)
/////////////THE TITLE SCREEN
sframe = 0
datecount = 1


function daynext() {
  sframe += 1
  console.log("stopping loop")
  themesong.end()
  barsposition = [0, -40 + sframe]
  Render([bars], [
    barsposition
  ], [
    [7, 3]
  ])
  playTune(reeling)
  if (-40 + sframe >= 10) {
    console.log("done loop")
    playTune(daycont)
    addText(`Day ${datecount}`, {
      x: 4,
      y: 1,
      color: color`2`
    })
    //Animation finishes, wait around 10 seconds
    sframe = 0

    setTimeout(transition, 8000);

  } else {
    setTimeout(daynext, 60);
  }
}

function tscreen() {
  frame += 1
  Render([clear, title], [
    [0, 0],
    [20, Math.ceil(0 + Math.sin(frame / 8))]
  ], [
    [8, 8],
    [1, 1]
  ])
  
  console.log(gamestate)
  if (gamestate == 1) {
    daynext()
  } else if (gamestate == 2) {
    setTimeout(maingame, 1);
  } else {
    setTimeout(tscreen, 10);
  }
}

addText("Tickets Please", {
  x: 3,
  y: 5,
  color: color`3`
})
addText("Begin (K)", {
  x: 6,
  y: 8,
  color: color`2`
})
addText(`Highscore: ${highscore}`, {
  x: 3,
  y: 10,
  color: color`2`
})
addText("MAKE ORPHEUS PROUD", {
  x: 1,
  y: 15,
  color: color`2`
})
onInput("k", () => {
  if (gamestate == 0) {
    gamestate = 1
    render = 0
    clearText()
  }
  if (gamestate > 6 && lookable && gamestate != 16) {
    gamestate = -2
  }
})
tscreen()
///////////////

//////////////MAIN GAME
let backdrop = bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
0FF0FF0FF0FF0FF0
FFFFFFFFFFFFFFFF
F0FF0FF0FF0FF0FF
FFFFFFFFFFFFFFFF
0F0F0F0F0F0F0F0F
F0F0F0F0F0F0F0F0
0F0F000F0F000F0F
00F00F00F00F00F0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`
let intensity = 0.1 // 1 to all fake, 0 to all real

function transition() {
  sframe += 1
  barsposition[1] -= sframe
  clearposition = [0, 0 - sframe]
  Render([bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`, backdrop, backdrop, backdrop, backdrop, backdrop, backdrop, bitmap`
................
..000000000000..
00CCCCCCCCCCCC00
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`, bitmap`
......0000......
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
......0000......
.......00.......
.......00.......
..000000000000..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
0000000000000000
0333333333333330
0333333333333330
0333333333333330
0000000000000000`,
      bitmap`
......0000......
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
......0000......
.......00.......
.......00.......
..000000000000..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
0000000000000000
0444444444444440
0444444444444440
0444444444444440
0000000000000000`, clear, bars
    ],
    [
      [0, 0],
      [-5, 35],
      [10, 35],
      [20, 35],
      [30, 35],
      [40, 35],
      [50, 35],
      [0, 45],
      [1, 45],
      [47, 45],
      clearposition,
      barsposition,
    ],
    [
      [8, 8],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [4, 2],
      [1, 1],
      [1, 1],
      [5, 1],
      [7, 3]

    ])
  playTune(reeling)
  clearText()
  if (barsposition[1] <= -50) {
    console.log("done loop")
    //Animation finishes, wait around 10 miliseconds
    setTimeout(maingame, 20);
    Render(R_ARRAY, P_ARRAY, S_ARRAY)
    sframe = 0
  } else {
    setTimeout(transition, 60);
  }
}

const hum = tune`
1200: C4^1200,
1200,
1200: E4^1200,
1200,
1200: C4^1200,
2400,
1200: D4^1200,
1200: E4^1200,
1200,
1200: C4^1200,
1200,
1200: E4^1200,
1200,
1200: C4^1200,
2400,
1200: D4^1200,
1200: F4^1200,
1200: E4^1200,
1200: C4^1200,
1200: E4^1200,
1200: D4^1200,
2400,
1200: C4^1200,
1200,
1200: C4^1200,
1200,
1200: D4^1200,
2400`

face = [
  bitmap`
................
................
................
................
................
................
...2222222222...
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....00000000....`,
  bitmap`
................
................
................
................
................
................
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....02222220....
.....000000.....`,
  bitmap`
................
................
................
................
................
................
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
..022222222220..
...0222222220...
....02222220....
.....000000.....`,
  bitmap`
................
................
................
................
................
................
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
..022222222220..
..022222222220..
...0222222220...
....00000000....`,
  bitmap`
................
................
................
................
................
................
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..000000000000..`,
  bitmap`
................
................
................
................
................
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....02222220....
....02222220....
....02222220....
.....000000.....`,
  bitmap`
................
................
................
................
................
...0222222220...
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
...0000000000...`,
  bitmap`
................
................
................
................
................
...0222222220...
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....00000000....`,
]
cloth = [
  bitmap`
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
...0000000000...
..022222222220..
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.`,
  bitmap`
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
.....000000.....
....02222220....
...0222222220...
..022222222220..
..022222222220..
..022222222220..`,
  bitmap`
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
.....000000.....
....02222220....
..002222222200..
.02222222222220.
.02222222222220.
.02222222222220.`,
  bitmap`
................
................
................
................
................
................
................
................
................
......0000......
....00222200....
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022222222220..`,
  bitmap`
................
................
................
................
................
................
................
................
................
......0000......
.....022220.....
...0022222200...
..022222222220..
..022222222220..
..022222222220..
..022222222220..`,
  bitmap`
................
................
................
................
................
................
................
................
................
......0000......
.....022220.....
....02222220....
...0222222220...
..022222222220..
..022222222220..
..022222222220..`,
  bitmap`
................
................
................
................
................
................
................
................
................
......0000......
.....022220.....
....02222220....
...0222222220...
..022222222220..
..022222222220..
..022222222220..`,
  bitmap`
................
................
................
................
................
................
................
................
................
.....000000.....
.00002222220000.
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220`,
  bitmap`
................
................
................
................
................
................
................
................
................
.00000000000000.
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220`,
  bitmap`
................
................
................
................
................
................
................
................
................
..000000000000..
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.`,
]
eyes = [
  bitmap`
................
................
................
................
................
................
...00......00...
...00......00...
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..000......000..
...0........0...
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
...0........0...
...0........0...
...0........0...
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
....0......0....
...00......00...
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
...00......00...
...0........0...
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
...00......00...
...00......00...
...00......00...
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..000......000..
...0........0...
..000......000..
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..000......000..
.0.0........0.0.
..000......000..
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..000......000..
.0.0........0.0.
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..000......000..
..000......000..
..000......000..
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
................
..000......000..
..000......000..
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..000......000..
................
................
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
..0000....0000..
................
..0000....0000..
................
................
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
................
....000..000....
................
....000..000....
................
................
................
................
................
................
................`,
]
hair = [
  bitmap`
................
................
................
................
................
................
................
........00......
....000000000...
..000000000000..
.0000..00000000.
.000.........00.
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
................
....00000000....
..000000000000..
.00000000000000.
.000........000.
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
......0000......
....000000000...
..000000000000..
.00000000000000.
.000...00...000.
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
......0000......
....000000000...
..000000000000..
.0000......0000.
.000........000.
.000........000.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
................
....00000000....
..000000000000..
.000........000.
.00..........00.
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
.....0000000....
....000000000...
..000000000000..
.00000000...000.
.000.........00.
.000.........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
........000.....
....000000000...
..000000000000..
.0000......0000.
.000.........00.
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
.....000000.....
....000000000...
..000000000000..
.00000000000000.
.000.00..00.000.
.00...0..0...00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
....00000000....
...0000000000...
..000000000000..
.00000000000000.
.000.0.00.0.000.
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
.....0.0.0......
...0.000000.0...
..0.000000000.0.
..000000000000..
.00000000000000.
0000..0000..0000
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
......0.0.0.....
0..0.000000.0.0.
.0.000000000.0..
..000000000000.0
.00000000000000.
0000..0000..0000
.00..........00.
.0............0.
.0............0.
.0............0.`,
  bitmap`
................
................
................
................
................
................
................
................
......00000.....
..000000000000..
.00000000000000.
0000000000000000
000..........000
00............00
00............00
00............00`,
]

R_ARRAY = [bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`, backdrop, backdrop, backdrop, backdrop, backdrop, backdrop, bitmap`
................
..000000000000..
00CCCCCCCCCCCC00
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`, bitmap`
......0000......
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
......0000......
.......00.......
.......00.......
..000000000000..
..0CC022220CC0..
..0CC000020CC0..
0000000002000000
0333300002033330
0333302002033330
0333302222033330
0000000000000000`,
  bitmap`
......0000......
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
.....0CCCC0.....
......0000......
.......00.......
.......00.......
..000000000000..
..0CC020CCCCC0..
..0CC020CCCCC0..
0000002000000000
0444402044444440
0444402000044440
0444402222044440
0000000000000000`,
]
P_ARRAY = [
  [0, 0],
  [-5, 35],
  [10, 35],
  [20, 35],
  [30, 35],
  [40, 35],
  [50, 35],
  [0, 45],
  [1, 45],
  [47, 45]
]
S_ARRAY = [
  [8, 8],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [4, 2]
]
let updatetime = 20

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
let charoffset_x = 0
let char_isvalid = false

let randomFace
let randomCloth
let randomEyes
let randomHair
let randomName
let randomStamp

let irandomFace
let irandomCloth
let irandomEyes
let irandomHair
let irandomName
let irandomStamp
let irandomStampLogo
let alias_tf

let tickets = 0

const names = ['Aaran', 'Aaren', 'Aarez', 'Aarman', 'Aaron', 'Aarron', 'Aaryan', 'Aaryn', 'Aayan', 'Aazaan', 'Abaan', 'Abbas', 'Abdallah', 'Abdul', 'Abdullah', 'Abdur', 'Abel', 'Abhinav', 'Abid', 'Abir', 'Abraham', 'Abu', 'Abubakar', 'Ace', 'Adain', 'Adam', 'Addison', 'Addisson', 'Adegbola', 'Aden', 'Adenn', 'Adie', 'Adil', 'Aditya', 'Adnan', 'Adrian', 'Adrien', 'Aedan', 'Aedin', 'Aedyn', 'Aeron', 'Afonso', 'Ahmad', 'Ahmed', 'Ahoua', 'Ahtasham', 'Aiadan', 'Aidan', 'Aiden', 'Aidian', 'Aidy', 'Ailin', 'Aiman', 'Ainsley', 'Ainslie', 'Airen', 'Airidas', 'Airlie', 'AJ', 'Ajay', 'A-Jay', 'Ajayraj', 'Akan', 'Akram', 'Al', 'Ala', 'Alan', 'Alanas', 'Alasdair', 'Alastair', 'Alber', 'Albert', 'Albie', 'Aldred', 'Alec', 'Aled', 'Aleem', 'Alessio', 'Alex', 'Alexei', 'Alexx', 'Alf', 'Alfee', 'Alfie', 'Alfred', 'Alfy', 'Alhaji', 'Ali', 'Aliekber', 'Alieu', 'Alisdair', 'Alishan', 'Alistair', 'Alistar', 'Alister', 'Aliyaan', 'Allan', 'Allen', 'Allister', 'Ally', 'Alphonse', 'Altyiab', 'Alum', 'Alvern', 'Alvin', 'Alyas', 'Amaan', 'Aman', 'Amani', 'Ameer', 'Amgad', 'Ami', 'Amin', 'Amir', 'Ammaar', 'Ammar', 'Ammer', 'Amos', 'Amrinder', 'Amrit', 'Amro', 'Anay', 'Andrea', 'Andreas', 'Andrei', 'Andrejs', 'Andrew', 'Andy', 'Anees', 'Anesu', 'Angel', 'Angelo', 'Angus', 'Anir', 'Anis', 'Anish', 'Annan', 'Anndra', 'Anselm', 'Anthony', 'Antoine', 'Anton', 'Antoni', 'Antonio', 'Antony', 'Antonyo', 'Anubhav', 'Aodhan', 'Aon', 'Aonghus', 'Apisai', 'Arafat', 'Aran', 'Arandeep', 'Arann', 'Aray', 'Arayan', 'Archie', 'Arda', 'Ardal', 'Ardeshir', 'Areeb', 'Areez', 'Aref', 'Arfin', 'Argyle', 'Argyll', 'Ari', 'Aria', 'Arian', 'Arihant', 'Arjuna', 'Arlo', 'Armaan', 'Arman', 'Armen', 'Arnab', 'Arnav', 'Arnold', 'Aron', 'Aronas', 'Arran', 'Arrham', 'Arron', 'Arryn', 'Arsalan', 'Artem', 'Arthur', 'Artur', 'Arturo', 'Arun', 'Arunas', 'Arved', 'Arya', 'Aryan', 'Aryian', 'Aryn', 'Asa', 'Asfhan', 'Ash', 'Ashley', 'Ashton', 'Ashtyn', 'Ashwin', 'Asif', 'Asim', 'Aslam', 'Asrar', 'Ata', 'Atal', 'Atapattu', 'Ateeq', 'Athol', 'Athon', 'Atli', 'Atom', 'Attila', 'Aulay', 'Aun', 'Austen', 'Austin', 'Avani', 'Averon', 'Avi', 'Avinash', 'Avraham', 'Awais', 'Awwal', 'Axel', 'Ayaan', 'Ayan', 'Aydan', 'Ayden', 'Aydin', 'Aydon', 'Ayman', 'Ayomide', 'Ayren', 'Ayrton', 'Aytug', 'Ayub', 'Ayyub', 'Azaan', 'Azedine', 'Azeem', 'Azim', 'Aziz', 'Azlan', 'Azzam', 'Azzedine', 'Babur', 'Bader', 'Badr', 'Badsha', 'Bailee', 'Bailey', 'Bailie', 'Bailley', 'Baillie', 'Baley', 'Balian', 'Banan', 'Barath', 'Barkley', 'Barney', 'Baron', 'Barrie', 'Barry', 'Bartosz', 'Basher', 'Basile', 'Baxter', 'Baye', 'Bayley', 'Beau', 'Beinn', 'Bekim', 'Believe', 'Ben', 'Bendeguz', 'Benedict', 'Benjamin', 'Benjamyn', 'Benji', 'Benn', 'Bennett', 'Benny', 'Benoit', 'Bentley', 'Berkay', 'Bernard', 'Bertie', 'Bevin', 'Bezalel', 'Bharath', 'Bilal', 'Bill', 'Billy', 'Binod', 'Bjorn', 'Blaike', 'Blaine', 'Blair', 'Blaire', 'Blake', 'Blazej', 'Blazey', 'Blessing', 'Blue', 'Blyth', 'Bo', 'Boab', 'Bob', 'Bobby', 'Bodhan', 'Boedyn', 'Bogdan', 'Bohbi', 'Bony', 'Bowen', 'Bowie', 'Boyd', 'Bracken', 'Brad', 'Bradan', 'Braden', 'Bradley', 'Bradlie', 'Bradly', 'Brady', 'Bradyn', 'Braeden', 'Braiden', 'Brajan', 'Brandan', 'Branden', 'Brandon', 'Brandyn', 'Brannan', 'Brayden', 'Braydon', 'Braydyn', 'Breandan', 'Brehme', 'Brendan', 'Brendon', 'Brendyn', 'Breogan', 'Bret', 'Brett', 'Briaddon', 'Brian', 'Brodi', 'Brodie', 'Brody', 'Brogan', 'Broghan', 'Brooke', 'Brooklin', 'Brooklyn', 'Bruce', 'Bruin', 'Bruno', 'Brunon', 'Bryan', 'Bryce', 'Bryden', 'Brydon', 'Bryn', 'Brynmor', 'Bryson', 'Buddy', 'Bully', 'Burak', 'Burhan', 'Butali', 'Butchi', 'Byron', 'Cabhan', 'Cadan', 'Cade', 'Caden', 'Cadon', 'Cadyn', 'Caedan', 'Caedyn', 'Cael', 'Caelan', 'Caelen', 'Caethan', 'Cahl', 'Cahlum', 'Cai', 'Caidan', 'Caiden', 'Caidyn', 'Caie', 'Cailaen', 'Cailean', 'Cailin', 'Cain', 'Caine', 'Cairn', 'Cal', 'Calan', 'Calder', 'Cale', 'Calean', 'Caleb', 'Calen', 'Caley', 'Calib', 'Calin', 'Callahan', 'Callan', 'Calley', 'Callie', 'Callin', 'Callum', 'Callun', 'Callyn', 'Calum', 'Calvin', 'Cambell', 'Camerin', 'Cameron', 'Campbel', 'Campbell', 'Camron', 'Caolain', 'Caolan', 'Carl', 'Carlo', 'Carlos', 'Carrich', 'Carrick', 'Carson', 'Carter', 'Carwyn', 'Casey', 'Casper', 'Cassy', 'Cathal', 'Cator', 'Cavan', 'Cayden', 'Ceejay', 'Ceilan', 'Ceiran', 'Ceirin', 'Ceiron', 'Cejay', 'Celik', 'Cephas', 'Cesar', 'Cesare', 'Chad', 'Chang-Ha', 'Charles', 'Charley', 'Charlie', 'Charly', 'Chase', 'Che', 'Chester', 'Chevy', 'Chi', 'Chibudom', 'Chidera', 'Chimsom', 'Chin', 'Chintu', 'Chiqal', 'Chiron', 'Chris', 'Christie', 'Christy', 'Chu', 'Cian', 'Ciann', 'Ciar', 'Ciaran', 'Ciarian', 'Cieran', 'Cillian', 'Cillin', 'Cinar', 'CJ', 'C-Jay', 'Clark', 'Clarke', 'Clayton', 'Clement', 'Clifford', 'Clyde', 'Cobain', 'Coban', 'Coben', 'Cobi', 'Cobie', 'Coby', 'Codey', 'Codi', 'Codie', 'Cody', 'Cody-Lee', 'Coel', 'Cohan', 'Cohen', 'Colby', 'Cole', 'Colin', 'Coll', 'Colm', 'Colt', 'Colton', 'Colum', 'Colvin', 'Comghan', 'Conal', 'Conall', 'Conan', 'Conar', 'Conlan', 'Conley', 'Conli', 'Conlin', 'Conlly', 'Conlon', 'Conlyn', 'Connal', 'Connall', 'Connan', 'Connar', 'Connel', 'Connell', 'Conner', 'Connolly', 'Connor', 'Conor', 'Conrad', 'Cooper', 'Copeland', 'Coray', 'Corben', 'Corbin', 'Corey', 'Cori', 'Corie', 'Corin', 'Cormac', 'Cormack', 'Cormak', 'Corran', 'Corrie', 'Cory', 'Cosmo', 'Coupar', 'Craig', 'Crawford', 'Creag', 'Crispin', 'Cristian', 'Crombie', 'Cruiz', 'Cruz', 'Cuillin', 'Cullen', 'Cullin', 'Curtis', 'Cyrus', 'Daanyaal', 'Daegan', 'Daegyu', 'Dafydd', 'Dagon', 'Dailey', 'Daimhin', 'Daithi', 'Dakota', 'Daksh', 'Dale', 'Dalong', 'Dalton', 'Damian', 'Damien', 'Damon', 'Dan', 'Danar', 'Dane', 'Danial', 'Daniel', 'Daniele', 'Daniels', 'Daniil', 'Danish', 'Daniyal', 'Danniel', 'Danny', 'Dante', 'Danyal', 'Danyil', 'Danys', 'Daood', 'Dara', 'Darach', 'Daragh', 'Darcy', "D'arcy", 'Dareh', 'Daren', 'Darien', 'Darius', 'Darl', 'Darn', 'Darrach', 'Darragh', 'Darrel', 'Darrell', 'Darren', 'Darrie', 'Darrius', 'Darroch', 'Darryl', 'Darryn', 'Darwyn', 'Daryl', 'Daryn', 'Daud', 'Davi', 'David', 'Davie', 'Davis', 'Davy', 'Dawid', 'Dawson', 'Dawud', 'Dayem', 'Daymian', 'Deacon', 'Deagan', 'Dean', 'Deano', 'Decklan', 'Declain', 'Declan', 'Declyan', 'Declyn', 'Deecan', 'Deegan', 'Deelan', 'Del', 'Denis', 'Deniss', 'Dennan', 'Dennin', 'Dennis', 'Denny', 'Dennys', 'Denon', 'Denton', 'Denver', 'Denzel', 'Deon', 'Derek', 'Derick', 'Derin', 'Dermot', 'Derren', 'Derrie', 'Derrin', 'Derron', 'Derry', 'Derryn', 'Deryn', 'Deshawn', 'Desmond', 'Dev', 'Devan', 'Devin', 'Devlin', 'Devlyn', 'Devon', 'Devrin', 'Devyn', 'Dex', 'Dexter', 'Dhani', 'Dharam', 'Dhavid', 'Dhyia', 'Diarmaid', 'Diarmid', 'Diarmuid', 'Didier', 'Diego', 'Diesel', 'Diesil', 'Digby', 'Dilan', 'Dilano', 'Dillan', 'Dillon', 'Dilraj', 'Dimitri', 'Dinaras', 'Dion', 'Dmitri', 'Doire', 'Dolan', 'Domanic', 'Domenico', 'Domhnall', 'Dominic', 'Dominick', 'Dominik', 'Donald', 'Donnacha', 'Donnie', 'Dorian', 'Dougal', 'Douglas', 'Dougray', 'Drakeo', 'Dre', 'Dregan', 'Drew', 'Dugald', 'Duncan', 'Duriel', 'Dustin', 'Dylan', 'Dylin', 'Dyllan', 'Dyllon', 'Eadie', 'Eagann', 'Eamon', 'Eamonn', 'Eason', 'Eassan', 'Easton', 'Ebow', 'Ed', 'Eddie', 'Eden', 'Ediomi', 'Edison', 'Eduardo', 'Eduards', 'Edward', 'Edwin', 'Edwyn', 'Eesa', 'Efan', 'Efe', 'Ege', 'Ehsan', 'Ehsen', 'Eiddon', 'Eidhan', 'Eihli', 'Eimantas', 'Eisa', 'Eli', 'Elias', 'Elijah', 'Eliot', 'Elisau', 'Eljay', 'Eljon', 'Elliot', 'Elliott', 'Ellis', 'Elshan', 'Elvin', 'Elyan', 'Emanuel', 'Emerson', 'Emil', 'Emile', 'Emir', 'Emlyn', 'Emmanuel', 'Emmet', 'Eng', 'Eniola', 'Enis', 'Ennis', 'Enrico', 'Enrique', 'Enzo', 'Eoghain', 'Eoghan', 'Eoin', 'Eonan', 'Erdehan', 'Eren', 'Erencem', 'Eric', 'Ericlee', 'Erik', 'Eriz', 'Eroni', 'Eryk', 'Eshan', 'Essa', 'Esteban', 'Ethan', 'Etienne', 'Etinosa', 'Euan', 'Eugene', 'Evan', 'Evann', 'Ewan', 'Ewen', 'Ewing', 'Exodi', 'Ezekiel', 'Ezra', 'Fabian', 'Fahad', 'Faheem', 'Faisal', 'Faizaan', 'Famara', 'Fares', 'Farhaan', 'Farhan', 'Farren', 'Farzad', 'Fauzaan', 'Favour', 'Fawaz', 'Fawkes', 'Faysal', 'Fearghus', 'Feden', 'Felix', 'Fergal', 'Fergie', 'Fergus', 'Ferre', 'Fezaan', 'Fiachra', 'Fikret', 'Filip', 'Filippo', 'Finan', 'Findlay', 'Findlie', 'Finlay', 'Finley', 'Finn', 'Finnan', 'Finnean', 'Finnen', 'Finnlay', 'Finnley', 'Fintan', 'Fionn', 'Firaaz', 'Fletcher', 'Flint', 'Florin', 'Flyn', 'Flynn', 'Fodeba', 'Forbes', 'Forgan', 'Forrest', 'Fox', 'Francis', 'Franco', 'Frank', 'Frankie', 'Franklin', 'Franko', 'Fraser', 'Frazer', 'Fred', 'Freddie', 'Fruin', 'Fyfe', 'Fyn', 'Fynlay', 'Fynn', 'Gabriel', 'Gareth', 'Garren', 'Garrett', 'Garry', 'Gary', 'Gavin', 'Gene', 'Geoff', 'Geoffrey', 'Geomer', 'Geordan', 'Geordie', 'George', 'Georgia', 'Georgy', 'Gerard', 'Ghyll', 'Giacomo', 'Gian', 'Gianluca', 'Gideon', 'Gil', 'Gio', 'Girijan', 'Girius', 'Gjan', 'Glascott', 'Glen', 'Glenn', 'Gordon', 'Grady', 'Graeme', 'Graham', 'Grahame', 'Grant', 'Grayson', 'Greg', 'Gregor', 'Gregory', 'Greig', 'Griffin', 'Griffyn', 'Grzegorz', 'Guang', 'Guerin', 'Gurdeep', 'Gursees', 'Gurthar', 'Gurveer', 'Gus', 'Gustav', 'Guthrie', 'Guy', 'Gytis', 'Habeeb', 'Hadji', 'Hadyn', 'Hagun', 'Haiden', 'Haider', 'Hamad', 'Hamid', 'Hamish', 'Hamza', 'Hamzah', 'Han', 'Hansen', 'Hao', 'Hareem', 'Hari', 'Haris', 'Harish', 'Harjyot', 'Harlee', 'Harleigh', 'Harley', 'Harman', 'Harnek', 'Harold', 'Haroon', 'Harper', 'Harri', 'Harris', 'Harrison', 'Harry', 'Harvey', 'Harvie', 'Hasan', 'Haseeb', 'Hashem', 'Hashim', 'Hassan', 'Hately', 'Havila', 'Hayden', 'Haydn', 'Haydon', 'Haydyn', 'Hcen', 'Hector', 'Heddle', 'Heidar', 'Heini', 'Hendri', 'Henri', 'Henry', 'Herbert', 'Heyden', 'Hiro', 'Hishaam', 'Hogan', 'Honey', 'Hong', 'Hope', 'Hopkin', 'Hosea', 'Howard', 'Howie', 'Hubert', 'Hugh', 'Hugo', 'Humza', 'Hunter', 'Husnain', 'Hussain', 'Hussan', 'Hussnain', 'Hussnan', 'Hyden', 'I', 'Iagan', 'Iain', 'Ian', 'Ibraheem', 'Ibrahim', 'Idahosa', 'Idrees', 'Idris', 'Iestyn', 'Ieuan', 'Igor', 'Ihtisham', 'Ijay', 'Ilyaas', 'Ilyas', 'Iman', 'Immanuel', 'Inan', 'Indy', 'Ines', 'Innes', 'Ioannis', 'Ireoluwa', 'Irvin', 'Irvine', 'Isa', 'Isaa', 'Isaac', 'Isaiah', 'Isak', 'Isher', 'Ishwar', 'Isimeli', 'Isira', 'Ismaeel', 'Ismail', 'Israel', 'Issiaka', 'Ivan', 'Ivar', 'Izaak', 'J', 'Jaay', 'Jac', 'Jace', 'Jack', 'Jacki', 'Jackie', 'Jackson', 'Jacky', 'Jacob', 'Jacques', 'Jad', 'Jaden', 'Jadon', 'Jadyn', 'Jae', 'Jagat', 'Jago', 'Jaheim', 'Jahid', 'Jahy', 'Jai', 'Jaida', 'Jaiden', 'Jaidyn', 'Jaii', 'Jaime', 'Jaise', 'Jak', 'Jake', 'Jakey', 'Jakob', 'Jaksyn', 'Jakub', 'Jamaal', 'Jamal', 'Jameel', 'Jameil', 'James', 'Jamey', 'Jamie', 'Jan', 'Jaosha', 'Jardine', 'Jared', 'Jarell', 'Jarl', 'Jarno', 'Jarred', 'Jarvi', 'Jasim', 'Jaskaran', 'Jason', 'Jasper', 'Jaxon', 'Jaxson', 'Jay', 'Jaydan', 'Jayden', 'Jaydn', 'Jaydon', 'Jaydyn', 'Jayhan', 'Jay-Jay', 'Jayke', 'Jaymie', 'Jayse', 'Jayson', 'Jaz', 'Jazeb', 'Jazib', 'Jazz', 'Jean', 'Jebadiah', 'Jed', 'Jedd', 'Jedidiah', 'Jeemie', 'Jeevan', 'Jeffrey', 'Jensen', 'Jenson', 'Jensyn', 'Jeremy', 'Jerome', 'Jeronimo', 'Jerrick', 'Jerry', 'Jesse', 'Jesuseun', 'Jeswin', 'Jevan', 'Jeyun', 'Jez', 'Jia', 'Jian', 'Jiao', 'Jimmy', 'Jincheng', 'JJ', 'Joaquin', 'Joash', 'Jock', 'Jody', 'Joe', 'Joeddy', 'Joel', 'Joey', 'Johann', 'Johannes', 'John', 'Johndean', 'Johnjay', 'Johnnie', 'Johnny', 'Johnpaul', 'Johnson', 'Jole', 'Jomuel', 'Jon', 'Jonah', 'Jonatan', 'Jonathan', 'Jonathon', 'Jonny', 'Jonothan', 'Jon-Paul', 'Jonson', 'Joojo', 'Jordan', 'Jordi', 'Jordon', 'Jordy', 'Jordyn', 'Jorge', 'Joris', 'Jorryn', 'Josan', 'Josef', 'Joseph', 'Josese', 'Josh', 'Joshiah', 'Joshua', 'Josiah', 'Joss', 'Jostelle', 'Joynul', 'Juan', 'Jubin', 'Judah', 'Jude', 'Jules', 'Julian', 'Julien', 'Jun', 'Junior', 'Jura', 'Justan', 'Justin', 'Justinas', 'Kaan', 'Kabeer', 'Kabir', 'Kacey', 'Kacper', 'Kade', 'Kaden', 'Kadin', 'Kadyn', 'Kaeden', 'Kael', 'Kaelan', 'Kaelin', 'Kaelum', 'Kai', 'Kaid', 'Kaidan', 'Kaiden', 'Kaidinn', 'Kaidyn', 'Kaileb', 'Kailin', 'Kain', 'Kaine', 'Kainin', 'Kainui', 'Kairn', 'Kaison', 'Kaiwen', 'Kajally', 'Kajetan', 'Kalani', 'Kale', 'Kaleb', 'Kaleem', 'Kal-el', 'Kalen', 'Kalin', 'Kallan', 'Kallin', 'Kalum', 'Kalvin', 'Kalvyn', 'Kameron', 'Kames', 'Kamil', 'Kamran', 'Kamron', 'Kane', 'Karam', 'Karamvir', 'Kareem', 'Karim', 'Karimas', 'Karl', 'Karol', 'Karson', 'Karsyn', 'Kasey', 'Kash', 'Kashif', 'Kasim', 'Kasper', 'Kasra', 'Kavin', 'Kayam', 'Kaydan', 'Kayden', 'Kaydin', 'Kaydn', 'Kaydyn', 'Kaydyne', 'Kayleb', 'Kaylem', 'Kaylum', 'Kayne', 'Kaywan', 'Kealan', 'Kealon', 'Kean', 'Keane', 'Kearney', 'Keatin', 'Keaton', 'Keavan', 'Keayn', 'Kedrick', 'Keegan', 'Keelan', 'Keelin', 'Keeman', 'Keenan', 'Keeton', 'Kehinde', 'Keigan', 'Keilan', 'Keir', 'Keiran', 'Keiren', 'Keiron', 'Keiryn', 'Keison', 'Keith', 'Keivlin', 'Kelam', 'Kelan', 'Kellan', 'Kellen', 'Kelso', 'Kelum', 'Kelvan', 'Kelvin', 'Ken', 'Kenan', 'Kendall', 'Kendyn', 'Kenlin', 'Kenneth', 'Kensey', 'Kenton', 'Kenyon', 'Kenzeigh', 'Kenzi', 'Kenzie', 'Kenzo', 'Kenzy', 'Keo', 'Ker', 'Kern', 'Kerr', 'Kevan', 'Kevin', 'Kevyn', 'Kez', 'Khai', 'Khalan', 'Khaleel', 'Khaya', 'Khevien', 'Khizar', 'Khizer', 'Kia', 'Kian', 'Kiaran', 'Kiarash', 'Kie', 'Kiefer', 'Kiegan', 'Kienan', 'Kier', 'Kieran', 'Kieren', 'Kierin', 'Kiern', 'Kieron', 'Kieryn', 'Kile', 'Killian', 'Kimi', 'Kingston', 'Kinneil', 'Kinnon', 'Kinsey', 'Kiran', 'Kirk', 'Kirwin', 'Kit', 'Kiya', 'Kiyonari', 'Kjae', 'Klein', 'Klevis', 'Kobe', 'Kobi', 'Koby', 'Koddi', 'Koden', 'Kodi', 'Kodie', 'Kody', 'Kofi', 'Kogan', 'Kohen', 'Kole', 'Konan', 'Konar', 'Konnor', 'Konrad', 'Koray', 'Korben', 'Korbyn', 'Korey', 'Kori', 'Korrin', 'Kory', 'Koushik', 'Kris', 'Krish', 'Krishan', 'Kriss', 'Kristian', 'Kristin', 'Kruz', 'Krzysiek', 'Ksawery', 'Ksawier', 'Kuba', 'Kurt', 'Kurtis', 'Kyaan', 'Kyan', 'Kyde', 'Kyden', 'Kye', 'Kyel', 'Kyhran', 'Kyie', 'Kylan', 'Kylar', 'Kyle', 'Kylian', 'Kym', 'Kynan', 'Kyral', 'Kyran', 'Kyren', 'Kyrillos', 'Kyro', 'Kyron', 'Kyrran', 'Lachlan', 'Lachlann', 'Lael', 'Lagan', 'Laird', 'Laison', 'Lakshya', 'Lance', 'Lancelot', 'Landon', 'Lang', 'Lasse', 'Latif', 'Lauchlan', 'Lauchlin', 'Laughlan', 'Lauren', 'Laurence', 'Laurie', 'Lawlyn', 'Lawrence', 'Lawrie', 'Lawson', 'Layne', 'Layton', 'Lee', 'Leigh', 'Leigham', 'Leighton', 'Leilan', 'Leiten', 'Leithen', 'Leland', 'Lenin', 'Lennan', 'Lennen', 'Lennex', 'Lennon', 'Lennox', 'Lenny', 'Leno', 'Lenon', 'Lenyn', 'Leo', 'Leon', 'Leonard', 'Leonardo', 'Lepeng', 'Leroy', 'Leven', 'Levi', 'Levon', 'Levy', 'Lewie', 'Lewin', 'Lewis', 'Lex', 'Leydon', 'Leyland', 'Leylann', 'Leyton', 'Liall', 'Liam', 'Limo', 'Lincoln', 'Lincon', 'Linden', 'Linton', 'Lionel', 'Lisandro', 'Litrell', 'LLeyton', 'Lliam', 'Lloyd', 'Lloyde', 'Loche', 'Lochlan', 'Lochlann', 'Lock', 'Lockey', 'Logan', 'Logann', 'Loghan', 'Lokesh', 'Loki', 'Lomond', 'Lorcan', 'Lorenz', 'Lorenzo', 'Lorne', 'Loudon', 'Loui', 'Louie', 'Louis', 'Loukas', 'Lovell', 'Luc', 'Luca', 'Lucais', 'Lucas', 'Lucca', 'Lucian', 'Luciano', 'Lucien', 'Lucus', 'Luic', 'Luis', 'Luk', 'Luka', 'Lukas', 'Lukasz', 'Luke', 'Lukmaan', 'Luqman', 'Lyall', 'Lyle', 'Lyndsay', 'Lysander', 'Maanav', 'Maaz', 'Mac', 'Macallum', 'Macaulay', 'Macauley', 'Macaully', 'Machlan', 'Maciej', 'Mack', 'Mackenzy', 'Mackie', 'Macsen', 'Macy', 'Madaki', 'Maddison', 'Maddox', 'Madison', 'Madox', 'Mael', 'Magnus', 'Mahan', 'Mahdi', 'Mahmoud', 'Maias', 'Maison', 'Maisum', 'Maitlind', 'Majid', 'Makensie', 'Makenzie', 'Makin', 'Maksim', 'Malachai', 'Malachi', 'Malachy', 'Malakai', 'Malakhy', 'Malcolm', 'Malik', 'Malikye', 'Malo', "Ma'moon", 'Manas', 'Maneet', 'Manmohan', 'Manolo', 'Manson', 'Mantej', 'Manuel', 'Manus', 'Marc', 'Marcel', 'Marcello', 'Marcin', 'Marco', 'Marcos', 'Marcous', 'Marcquis', 'Marcus', 'Mario', 'Marios', 'Marius', 'Mark', 'Marko', 'Markus', 'Marley', 'Marlin', 'Marlon', 'Maros', 'Marshall', 'Martin', 'Marty', 'Martyn', 'Marvin', 'Marwan', 'Maryk', 'Marzuq', 'Mashhood', 'Mason', 'Masood', 'Masson', 'Matas', 'Matej', 'Mateusz', 'Mathew', 'Mathias', 'Mathu', 'Mathuyan', 'Mati', 'Matt', 'Matteo', 'Matthew', 'Matthias', 'Max', 'Maxim', 'Maximus', 'Maxwell', 'Maxx', 'Mayeul', 'Mayson', 'Mazin', 'Mcbride', 'McKade', 'McKauley', 'McKay', 'McKenzie', 'McLay', 'Meftah', 'Mehmet', 'Mehraz', 'Meko', 'Melville', 'Meshach', 'Micah', 'Michael', 'Michal', 'Michat', 'Micheal', 'Michee', 'Mickey', 'Miguel', 'Mika', 'Mikael', 'Mikee', 'Mikey', 'Mikhail', 'Mikolaj', 'Miles', 'Millar', 'Miller', 'Milo', 'Milos', 'Milosz', 'Mir', 'Mirza', 'Mitch', 'Mitchel', 'Mitchell', 'Moad', 'Moayd', 'Mobeen', 'Modu', 'Mohamad', 'Mohamed', 'Mohammad', 'Mohammed', 'Mohanad', 'Mohd', 'Momin', 'Montague', 'Monty', 'Moore', 'Moosa', 'Moray', 'Morgan', 'Morgyn', 'Morris', 'Morton', 'Moshy', 'Motade', 'Moyes', 'Msughter', 'Mueez', 'Muhammad', 'Muhammed', 'Muhsin', 'Muir', 'Munachi', 'Muneeb', 'Mungo', 'Munir', 'Munmair', 'Munro', 'Murdo', 'Murray', 'Murrough', 'Murry', 'Musa', 'Musse', 'Mustafa', 'Mustapha', 'Muzammil', 'Mykie', 'Myles', 'Mylo', 'Nabeel', 'Nadeem', 'Nader', 'Nagib', 'Naif', 'Nairn', 'Narvic', 'Nash', 'Nasser', 'Nassir', 'Natan', 'Nate', 'Nathan', 'Nawfal', 'Nayan', 'Neco', 'Neil', 'Nelson', 'Neo', 'Neshawn', 'Nevan', 'Nevin', 'Nial', 'Niall', 'Nicholas', 'Nick', 'Nickhill', 'Nicki', 'Nickson', 'Nicky', 'Nico', 'Nicol', 'Nicolae', 'Nicolas', 'Nidhish', 'Nihaal', 'Nihal', 'Nikash', 'Nikhil', 'Niki', 'Nikita', 'Nikodem', 'Nikolai', 'Nikos', 'Nilav', 'Niraj', 'Niro', 'Niven', 'Noah', 'Noel', 'Nolan', 'Noor', 'Norman', 'Norrie', 'Nuada', 'Nyah', 'Oakley', 'Oban', 'Obieluem', 'Obosa', 'Odhran', 'Odin', 'Odynn', 'Ohran', 'Oisin', 'Olaf', 'Ole', 'Olie', 'Oliver', 'Olivier', 'Oliwier', 'Ollie', 'Omar', 'Omri', 'Oran', 'Orin', 'Orlando', 'Orley', 'Orran', 'Orrick', 'Orrin', 'Orson', 'Oryn', 'Oscar', 'Oskar', 'Ossian', 'Oswald', 'Otto', 'Owain', 'Owais', 'Owen', 'Owyn', 'Oz', 'Ozzy', 'Pablo', 'Pacey', 'Padraig', 'Paolo', 'Parkash', 'Parker', 'Pascoe', 'Pasquale', 'Patrick', 'Patrikas', 'Patryk', 'Paul', 'Pavit', 'Pawel', 'Pawlo', 'Pearce', 'Pearse', 'Pearsen', 'Pedram', 'Pedro', 'Peirce', 'Peiyan', 'Pele', 'Peni', 'Peter', 'Phani', 'Philip', 'Phinehas', 'Phoenix', 'Phoevos', 'Pierce', 'Pieter', 'Pietro', 'Piotr', 'Porter', 'Praise', 'Pranav', 'Pravin', 'Precious', 'Prentice', 'Presley', 'Preston', 'Prinay', 'Prince', 'Prithvi', 'Promise', 'Pushkar', 'Qasim', 'Qirui', 'Quinlan', 'Quinn', 'Radmiras', 'Raees', 'Raegan', 'Rafael', 'Rafal', 'Rafferty', 'Rafi', 'Raheem', 'Rahil', 'Rahim', 'Rahman', 'Raith', 'Raithin', 'Raja', 'Rajan', 'Ralfs', 'Ralph', 'Ramanas', 'Ramit', 'Ramone', 'Ramsay', 'Ramsey', 'Rana', 'Ranolph', 'Raphael', 'Rasmus', 'Rasul', 'Raul', 'Raunaq', 'Ravin', 'Ray', 'Rayaan', 'Rayan', 'Rayane', 'Rayden', 'Rayhan', 'Raymond', 'Rayne', 'Rayyan', 'Raza', 'Reace', 'Reagan', 'Reean', 'Reece', 'Reed', 'Reegan', 'Rees', 'Reese', 'Reeve', 'Regan', 'Regean', 'Reggie', 'Rehaan', 'Rehan', 'Reice', 'Reid', 'Reigan', 'Reilly', 'Reily', 'Reis', 'Reiss', 'Remo', 'Remy', 'Ren', 'Renars', 'Reng', 'Rennie', 'Reno', 'Reo', 'Reuben', 'Rexford', 'Reynold', 'Rhein', 'Rheo', 'Rhett', 'Rheyden', 'Rhian', 'Rhoan', 'Rholmark', 'Rhoridh', 'Rhuan', 'Rhuaridh', 'Rhudi', 'Rhy', 'Rhyan', 'Rhyley', 'Rhyon', 'Rhys', 'Rhyse', 'Riach', 'Rian', 'Ricards', 'Riccardo', 'Ricco', 'Rice', 'Richard', 'Richey', 'Richie', 'Ricky', 'Rico', 'Ridley', 'Ridwan', 'Rihab', 'Rihan', 'Rihards', 'Rihonn', 'Rikki', 'Riley', 'Rio', 'Rioden', 'Rishi', 'Ritchie', 'Rivan', 'Riyadh', 'Riyaj', 'Roan', 'Roark', 'Roary', 'Rob', 'Robbi', 'Robbie', 'Robby', 'Robert', 'Robi', 'Robin', 'Rocco', 'Roddy', 'Roderick', 'Rodrigo', 'Roen', 'Rogan', 'Roger', 'Rohaan', 'Rohan', 'Rohin', 'Rohit', 'Rokas', 'Roman', 'Ronald', 'Ronan', 'Ronin', 'Ronnie', 'Rooke', 'Roray', 'Rori', 'Rorie', 'Rory', 'Roshan', 'Ross', 'Rossi', 'Rowan', 'Rowen', 'Roy', 'Ruadhan', 'Ruaidhri', 'Ruairi', 'Ruairidh', 'Ruan', 'Ruaraidh', 'Ruari', 'Ruaridh', 'Ruben', 'Rubhan', 'Rubin', 'Rubyn', 'Rudi', 'Rudy', 'Rufus', 'Rui', 'Ruo', 'Rupert', 'Ruslan', 'Russel', 'Russell', 'Ryaan', 'Ryan', 'Ryan-Lee', 'Ryden', 'Ryder', 'Ryese', 'Ryhs', 'Rylan', 'Rylay', 'Rylee', 'Ryleigh', 'Ryley', 'Rylie', 'Ryo', 'Ryszard', 'Saad', 'Sabeen', 'Saffi', 'Saghun', 'Sahaib', 'Sahbian', 'Sahil', 'Saif', 'Saim', 'Sajid', 'Sajjad', 'Salman', 'Salter', 'Salvador', 'Sam', 'Saman', 'Samar', 'Samarjit', 'Samatar', 'Sambrid', 'Sameer', 'Sami', 'Samir', 'Samual', 'Samuel', 'Samuela', 'Samy', 'Sandro', 'Sandy', 'Sanfur', 'Sanjay', 'Santiago', 'Santino', 'Satveer', 'Saul', 'Saunders', 'Savin', 'Sayad', 'Sayeed', 'Sayf', 'Scot', 'Scott', 'Seaan', 'Seamas', 'Seamus', 'Sean', 'Seane', 'Sean-Ray', 'Seb', 'Selasi', 'Seonaidh', 'Sergei', 'Sergio', 'Seth', 'Sethu', 'Seumas', 'Shaarvin', 'Shadow', 'Shae', 'Shahmir', 'Shai', 'Shane', 'Shannon', 'Sharland', 'Sharoz', 'Shaughn', 'Shaun', 'Shaurya', 'Shaw', 'Shawn', 'Shay', 'Shayaan', 'Shayan', 'Shaye', 'Shayne', 'Shazil', 'Shea', 'Sheafan', 'Sheigh', 'Shenuk', 'Sher', 'Shergo', 'Sheriff', 'Sherwyn', 'Shiloh', 'Shiraz', 'Shreeram', 'Shreyas', 'Shyam', 'Siddhant', 'Sidharth', 'Sidney', 'Siergiej', 'Silas', 'Simon', 'Sinai', 'Skye', 'Sofian', 'Sohaib', 'Sohail', 'Soham', 'Sohan', 'Sol', 'Solomon', 'Sonneey', 'Sonni', 'Sonny', 'Sorley', 'Soul', 'Spencer', 'Spondon', 'Stanley', 'Stefan', 'Stefano', 'Stefin', 'Stephen', 'Steve', 'Steven', 'Stevie', 'Stewart', 'Stewarty', 'Strachan', 'Struan', 'Stuart', 'Su', 'Subhaan', 'Sudais', 'Suheyb', 'Suilven', 'Sukhi', 'Sukhpal', 'Sukhvir', 'Sulayman', 'Sullivan', 'Sultan', 'Sung', 'Sunny', 'Suraj', 'Surien', 'Sweyn', 'Syed', 'Sylvain', 'Symon', 'Szymon', 'Tadd', 'Taddy', 'Tadhg', 'Taegan', 'Taegen', 'Tai', 'Tait', 'Taiwo', 'Talha', 'Taliesin', 'Talon', 'Talorcan', 'Tamar', 'Tamiem', 'Tammam', 'Tanay', 'Tane', 'Tanner', 'Tanvir', 'Tanzeel', 'Taonga', 'Tarik', 'Tate', 'Taylan', 'Taylar', 'Tayler', 'Taylor', 'Tayo', 'Tayyab', 'Tayye', 'Tayyib', 'Teagan', 'Tee', 'Teejay', 'Tee-jay', 'Tegan', 'Teighen', 'Teiyib', 'Te-Jay', 'Temba', 'Teo', 'Teodor', 'Teos', 'Terry', 'Teydren', 'Theo', 'Theodore', 'Thiago', 'Thierry', 'Thom', 'Thomas', 'Thomson', 'Thorben', 'Thorfinn', 'Thrinei', 'Thumbiko', 'Tiago', 'Tian', 'Tiarnan', 'Tibet', 'Tieran', 'Tiernan', 'Timothy', 'Timucin', 'Tiree', 'Tisloh', 'Titi', 'Titus', 'Tiylar', 'TJ', 'Tjay', 'T-Jay', 'Tobey', 'Tobi', 'Tobias', 'Tobie', 'Toby', 'Todd', 'Tokinaga', 'Tom', 'Tomas', 'Tomasz', 'Tommy', 'Tomson', 'Tony', 'Torin', 'Torquil', 'Torran', 'Torrin', 'Torsten', 'Trafford', 'Trai', 'Travis', 'Tre', 'Trent', 'Trey', 'Tristain', 'Tristan', 'Troy', 'Tubagus', 'Turki', 'Turner', 'Ty', 'Tye', 'Tyelor', 'Tylar', 'Tyler', 'Tyllor', 'Tylor', 'Tymom', 'Tymon', 'Tyra', 'Tyree', 'Tyrnan', 'Tyrone', 'Tyson', 'Ubaid', 'Ubayd', 'Uchenna', 'Uilleam', 'Umair', 'Umar', 'Umer', 'Umut', 'Urban', 'Uri', 'Usman', 'Uzair', 'Uzayr', 'Valen', 'Valentin', 'Valery', 'Valo', 'Vasyl', 'Veeran', 'Victor', 'Victory', 'Vinay', 'Vince', 'Vincent', 'Vincenzo', 'Vinh', 'Vinnie', 'Vithujan', 'Vladimir', 'Vrishin', 'Wabuya', 'Wai', 'Walid', 'Wallace', 'Walter', 'Waqaas', 'Warkhas', 'Warren', 'Warrick', 'Wasif', 'Wayde', 'Wayne', 'Wei', 'Wen', 'Wesley', 'Wiktor', 'Wilkie', 'Will', 'William', 'Willum', 'Wilson', 'Windsor', 'Wojciech', 'Wyatt', 'Wylie', 'Wynn', 'Xabier', 'Xander', 'Xavier', 'Xiao', 'Xida', 'Xin', 'Xue', 'Yadgor', 'Yago', 'Yahya', 'Yakup', 'Yang', 'Yanick', 'Yann', 'Yannick', 'Yaseen', 'Yasin', 'Yasir', 'Yassin', 'Yoji', 'Yong', 'Yoolgeun', 'Yorgos', 'Youcef', 'Yousif', 'Youssef', 'Yu', 'Yuanyu', 'Yuri', 'Yusef', 'Yusuf', 'Yves', 'Zaaine', 'Zaak', 'Zac', 'Zach', 'Zacharie', 'Zachary', 'Zachery', 'Zack', 'Zackary', 'Zaid', 'Zain', 'Zaine', 'Zainedin', 'Zak', 'Zakaria', 'Zakariya', 'Zakary', 'Zaki', 'Zakir', 'Zakk', 'Zamaar', 'Zander', 'Zane', 'Zarran', 'Zayd', 'Zayn', 'Zayne', 'Ze', 'Zeek', 'Zeeshan', 'Zeid', 'Zein', 'Zen', 'Zendel', 'Zenith', 'Zennon', 'Zeph', 'Zerah', 'Zhen', 'Zhi', 'Zhong', 'Zhuo', 'Zi', 'Zidane', 'Zijie', 'Zinedine', 'Zion', 'Zishan', 'Ziya', 'Ziyaan', 'Zohaib', 'Zohair', 'Zoubaeir', 'Zubair', 'Zubayr', 'Zuriel']
const stamp = ["United Coder", "Sprig HQ", "Hack Club"]
const stamplogo = [bitmap`
.....222222.....
...2200000022...
..200220022002..
.20222222222202.
.20202022000202.
2022020220202202
2022020220202202
.20200022020202.
.20222222222202.
2022000220022202
2022022220202202
.20200022002202.
.20222222222202.
..200220022002..
...2200000022...
.....222222.....`,
  bitmap`
2222222222222222
2000000000000002
2022222222222202
2020020022220202
2022020022220202
2020020222220202
2022222200002202
2022200020202202
2022020200202202
2020220020202202
2020202020022202
2020022002222202
2022200022222202
2022222222222202
2000000000000002
2222222222222222`,
  bitmap`
...2222222222...
.22000000000022.
.20002222220002.
2002222222222002
2002000000222002
2022022220022202
2022022222002202
2022022220022202
2022000000222202
2022022222022202
2022020220222202
2002020022022002
2002220202222002
.20002222220002.
.22000000000022.
...2222222222...`
]

function createchar() {
  randomFace = getRandomItem(face);
  randomCloth = getRandomItem(cloth);
  randomEyes = getRandomItem(eyes);
  randomHair = getRandomItem(hair);
  randomName = getRandomItem(names);
  randomStamp = getRandomItem(stamp);
  R_ARRAY.splice(7, 0, randomCloth, randomFace, randomEyes, randomHair)
  P_ARRAY.splice(7, 0, [8 + charoffset_x, 3], [15 + charoffset_x, 1], [23 + charoffset_x, 15], [15 + charoffset_x, -6])
  S_ARRAY.splice(7, 0, [3, 3], [2, 2], [1, 1], [2, 2])
  alias_tf = Math.random() >= intensity;
  if (alias_tf == false) {
    createAlias()
  }
  char_isvalid = true
}

function animate() {
  if (charoffset_x < 0) {
    setTimeout(animate, 20);
  }
}

// Helper function to randomize the selection of variables
function randomizeVariables(variableNames, numToRandomize) {
  // Shuffle the array
  const shuffled = variableNames.sort(() => 0.5 - Math.random());
  // Return the first `numToRandomize` elements
  return shuffled.slice(0, numToRandomize);
}

let newValues = {};
const functionsMap = {
  irandomFace: () => irandomFace = getRandomItem(face),
  irandomCloth: () => irandomCloth = getRandomItem(cloth),
  irandomEyes: () => irandomEyes = getRandomItem(eyes),
  irandomHair: () => irandomHair = getRandomItem(hair),
  irandomName: () => irandomName = getRandomItem(names),
  irandomStamp: () => irandomStamp = getRandomItem(stamp),
  irandomStampL: () => irandomStampLogo = getRandomItem(stamplogo)
}

function createAlias() {
  const variableNames = [
    'irandomFace', 'irandomCloth', 'irandomEyes', 'irandomHair',
    'irandomName', 'irandomStamp', 'irandomStampL'
  ];

  // Determine the number of variables to randomize
  const numToRandomize = Math.floor(Math.random() * variableNames.length) + 1

  // Get the randomly selected variables
  const selectedVariables = randomizeVariables(variableNames, numToRandomize);
  console.log('Selected variables to randomize:', selectedVariables);
  newValues = {}
  // Apply the functions to the selected variables
  prevValues = {irandomFace:randomFace,irandomCloth:randomCloth,
                irandomEyes:randomEyes,irandomHair:randomHair,
                irandomName:randomName,irandomStamp:randomStamp};
  irandomFace = randomFace
  irandomCloth = randomCloth
  irandomEyes = randomEyes
  irandomHair = randomHair
  irandomName = randomName
  irandomStamp = randomStamp
  irandomStampLogo = stamplogo[stamp.indexOf(randomStamp)]
  selectedVariables.forEach(variable => {
    if (functionsMap[variable]) {
      do {
        // Call the function and update newValues[variable]
        newValues[variable] = functionsMap[variable]();
        
        // Optionally, log the updated value
        // console.log('Updated values:', newValues[variable]);
      } while (newValues[variable] === prevValues[variable]);
    } else {
      console.warn(`No function defined for ${variable}`);
    }
  });
}
yail = tune`
37.5: B5/37.5 + D5/37.5 + F5^37.5,
37.5: B5/37.5 + D5/37.5 + G5^37.5,
37.5: B5/37.5 + D5/37.5,
37.5: B5/37.5 + D5/37.5 + F5^37.5,
37.5: B5/37.5 + D5/37.5 + G5^37.5,
37.5: B5/37.5 + D5/37.5,
37.5: B5/37.5 + D5/37.5 + F5^37.5,
37.5: B5/37.5 + D5/37.5 + G5^37.5,
37.5: B5/37.5 + D5/37.5,
37.5: B5/37.5 + D5/37.5 + F5^37.5,
37.5: B5/37.5 + B4/37.5 + G5^37.5,
37.5: A5/37.5 + B4/37.5 + D5^37.5,
37.5: A5/37.5 + B4/37.5 + E5^37.5 + D5-37.5,
37.5: A5/37.5 + B4/37.5,
37.5: A5/37.5 + B4/37.5 + D5^37.5,
37.5: A5/37.5 + B4/37.5 + E5^37.5 + D5-37.5,
37.5: A5/37.5 + B4/37.5,
37.5: A5/37.5 + B4/37.5 + D5^37.5,
37.5: A5/37.5 + B4/37.5 + E5^37.5,
37.5: A5/37.5 + B4/37.5,
37.5: A5/37.5 + B4/37.5 + D5^37.5 + E5-37.5,
412.5`
lookable = false

function slider(st) {
  if (st == true) {
    Render([randomCloth, randomFace, randomEyes, randomHair, bitmap`
0000........0000
3330........0333
333300....003333
3333300000033333
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333`],
      [
        [8 + charoffset_x, 3 + 3],
        [15 + charoffset_x, 1 + 3],
        [23 + charoffset_x, 15 + 3],
        [15 + charoffset_x, -6 + 3],
        [0, -20]
      ],
      [
        [3, 3],
        [2, 2],
        [1, 1],
        [2, 2],
        [4, 5]
      ])

    addText(`${randomName}`, {
      x: 3,
      y: 1,
      color: color`2`
    })
    addText(`${randomStamp}`, {
      x: 2,
      y: 15,
      color: color`2`
    })
    Render([stamplogo[stamp.indexOf(randomStamp)]],
      [
        [45, 43]
      ],
      [
        [1, 1]
      ]
    );
  } else {
    Render([irandomCloth, irandomFace, irandomEyes, irandomHair, bitmap`
0000........0000
3330........0333
333300....003333
3333300000033333
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333`],
      [
        [8 + charoffset_x, 3 + 3],
        [15 + charoffset_x, 1 + 3],
        [23 + charoffset_x, 15 + 3],
        [15 + charoffset_x, -6 + 3],
        [0, -20]
      ],
      [
        [3, 3],
        [2, 2],
        [1, 1],
        [2, 2],
        [4, 5]
      ])

    addText(`${randomName}`, {
      x: 3,
      y: 1,
      color: color`2`
    })
    addText(`${randomStamp}`, {
      x: 2,
      y: 15,
      color: color`2`
    })
    Render([irandomStampLogo],
      [
        [45, 43]
      ],
      [
        [1, 1]
      ]
    );

  }
}

function stager() {
  if (gamestate < 8) {
    clearText()
  }
  switch (gamestate) {
    case -2:
      updatetime = 10
      sframe = 0
      break
    case -1:
      updatetime = 20
      Render(R_ARRAY, P_ARRAY, S_ARRAY)
      sframe += 10
      Render([bitmap`
0000........0000
3330........0333
333300....003333
3333300000033333
3333333333333333
3333333333333333
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
3333333333333333`], [
        [0, -20 + sframe]
      ], [
        [4, 5]
      ])
      //console.log(sframe)
      if (sframe < 100) {
        gamestate -= 1
      }
      break
    case 0: //Limbo
      gamestate -= 1
      break
    case 1:
      lookable = false
      updatetime = 2000
      addText(`Hi, My name is`, {
        x: 3,
        y: 0,
        color: color`4`
      })
      playTune(tune`
37.5: G4~37.5,
37.5: A4~37.5,
37.5: G4~37.5,
37.5: G4~37.5,
1050`)
      break
    case 2:
      addText(`..${randomName}.`, {
        x: 3,
        y: 0,
        color: color`4`
      })
      playTune(tune`
37.5: G4~37.5,
37.5: A4~37.5,
37.5: G4~37.5,
37.5: G4~37.5,
1050`)
      break
    case 3:
      addText(`I am from...`, {
        x: 3,
        y: 0,
        color: color`4`
      })
      playTune(tune`
37.5: G4~37.5,
37.5: A4~37.5,
37.5: G4~37.5,
37.5: G4~37.5,
1050`)
      break
    case 4:
      addText(`${randomStamp}.`, {
        x: 3,
        y: 0,
        color: color`4`
      })
      playTune(tune`
37.5: G4~37.5,
37.5: A4~37.5,
37.5: G4~37.5,
37.5: G4~37.5,
1050`)
      break
    case 5:
      addText(`Tickets Please.`, {
        x: 2,
        y: 0,
        color: color`2`
      })
      playTune(tune`
37.5: G4-37.5,
37.5: A4-37.5,
37.5: G4-37.5,
37.5: F4-37.5,
1050`)
      break
    case 6:
      updatetime = 30
      sframe = 0
      break
    case 7:
      sframe += 2
      gamestate -= 1
      Render([bitmap`
0000........0000
3330........0333
333300....003333
3333300000033333
3333333333333333
3333333333333333
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
3333333333333333`], [
        [0, 70 - sframe]
      ], [
        [4, 5]
      ])
      //console.log(sframe)
      if (sframe > 90) {
        gamestate += 1
      }
      break
    case 8: //Trial
      lookable = true
      updatetime = 100
      console.log(alias_tf)
      gamestate -= 1
      slider(alias_tf)
      break
    case 9: //Accepted!
      sframe = 0
      break
    case 10:
      sframe += ccount
      if (Math.abs(sframe) < 100) {
        gamestate -= 1
      }
      Render(R_ARRAY, P_ARRAY, S_ARRAY)
      P_ARRAY.splice(7, 4);
      P_ARRAY.splice(7, 0, [8 + sframe, 3], [15 + sframe, 1], [23 + sframe, 15], [15 + sframe, -6])
      break
    case 11: //Judgement
      updatetime = 900
      clearText()
      sframe = 0
      P_ARRAY.splice(7, 4);
      P_ARRAY.splice(7, 0, [8, 3], [15, 1], [23, 15], [15, -6])
      addText(`Was that right?`, {
        x: 2,
        y: 0,
        color: color`2`
      })
      break
    case 12:
      sframe += 1
      clearText()
      if (sframe < 6) {
        gamestate -= 1
      }
      if (sframe % 2 === 0) {
        Render(R_ARRAY, P_ARRAY, S_ARRAY)
        playTune(tune`
500: D5~500,
15500`)
        addText(`${randomName}.`, {
          x: 3,
          y: 1,
          color: color`4`
        })
        addText(`${randomStamp}.`, {
          x: 2,
          y: 15,
          color: color`4`
        })
         Render([stamplogo[stamp.indexOf(randomStamp)]],
      [
        [45, 43]
      ],
      [
        [1, 1]
      ]
    );
      } else {
        Render([bitmap`
0000........0000
3330........0333
333300....003333
3333300000033333
3333333333333333
3333333333333333
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
3333333333333333
3333333333333333`], [
          [0, -20]
        ], [
          [4, 5]
        ])
        slider(alias_tf)
        playTune(tune`
500,
500: B4~500,
15000`)
      }
      break
    case 13:
      clearText()
      Render([clear], [
        [0, 0]
      ], [
        [8, 8],
      ])
      updatetime = 500
      R_ARRAY.splice(7, 4);
      S_ARRAY.splice(7, 4);
      P_ARRAY.splice(7, 4);
      if (alias_tf === choice) {
        addText('Great Job!', {
          x: 4,
          y: 0,
          color: color`2`
        });
        playTune(tune`
500: D5~500,
15500`)
      } else {
        addText('Oh dear...', {
          x: 4,
          y: 0,
          color: color`2`
        });
        strikes += 1
        playTune(tune`
500: F4~500,
15500`)
      }

      break
    case 14:
      addText(`Calculations...`, {
        x: 4,
        y: 3,
        color: color`2`
      })
      if (alias_tf === choice) {
        addText(`${tickets}+${datecount}`, {
          x: 4,
          y: 5,
          color: color`2`
        })
        tickets += datecount
        playTune(tune`
500: B4~500,
15500`)
      } else {
        addText(`${tickets}-${datecount}`, {
          x: 4,
          y: 5,
          color: color`2`
        })
        tickets -= datecount
        playTune(tune`
500: B4~500,
15500`)
      }
      break
    case 15:
      if (strikes > 0) {
        addText(`Strikes`, {
          x: 6,
          y: 9,
          color: color`2`

        })
        highscore = tickets
        switch (strikes){
          case 1:
            Render([viol],[[4,38]],[[1,1]]); break
          case 2:
            Render([viol],[[4,38]],[[1,1]]); 
            Render([viol],[[24,38]],[[1,1]]); break
          case 3:
            Render([viol],[[4,38]],[[1,1]]); 
            Render([viol],[[24,38]],[[1,1]]); 
            Render([viol],[[44,38]],[[1,1]]); break
        }
      }
      if (tickets > highscore) {
        addText(`NEW HIGHSCORE!`, {
          x: 4,
          y: 10,
          color: color`2`

        })
        highscore = tickets
      }
      addText(`Tickets: ${tickets}`, {
        x: 4,
        y: 8,
        color: color`2`
      })
      addText(`W to continue`, {
        x: 4,
        y: 13,
        color: color`2`
      })
      playTune(tune`
500: B4/500,
15500`)
      break
    case 16:
      gamestate -= 1
      break
    case 17:
      sframe += 1
      console.log("stopping loop")
      themesong.end()
      barsposition = [0, -40 + sframe]
      Render([bars], [
        barsposition
      ], [
        [7, 3]
      ])
      playTune(reeling)
      if (-40 + sframe >= 10) {
        console.log("done loop")
        playTune(daycont)
        addText(`Day ${datecount}`, {
          x: 4,
          y: 1,
          color: color`2`
        })
        updatetime = 60
        //Animation finishes, wait around 10 seconds
        sframe = 0
        barsposition = [0, -40]
        updatetime = 8000;
      }
      else{
        gamestate -= 1
      }
      break
    case 18:
      console.log("pseduo trans")
      updatetime = 60;
      sframe += 1
      barsposition[1] -= sframe
      clearposition = [0, 0 - sframe]
      Render(R_ARRAY, P_ARRAY, S_ARRAY)
      Render([clear, bars],
        [
          clearposition,
          barsposition,
        ],
        [
          [5, 1],
          [7, 3] ])
      playTune(reeling)
      clearText()
      if (barsposition[1] <= -50) {
        console.log("done loop")
        //Animation finishes, wait around 10 miliseconds
        updatetime = 20
        char_isvalid = false
        gamestate = 0
        Render(R_ARRAY, P_ARRAY, S_ARRAY)
        sframe = 0
      }
      else {
        gamestate -= 1
      }
      break
    case 19:
      addText(`End Game!`, {
        x: 4,
        y: 2,
        color: color`2`
      })
      addText(`You made it to \n the last day!`, {
        x: 4,
        y: 4,
        color: color`2`
      })
      if (tickets > highscore) {
        addText(`NEW HIGHSCORE!`, {
          x: 4,
          y: 6,
          color: color`2`

        })
        highscore = tickets
      }
      addText(`Tickets: ${tickets}`, {
        x: 4,
        y: 8,
        color: color`2`
      })
      addText(`Restart to replay`, {
        x: 2,
        y: 13,
        color: color`2`
      })
      gamestate -= 1
      break
    case 20:
      addText(`End Game!`, {
        x: 4,
        y: 2,
        color: color`2`
      })
      addText(`You made too \n many mistakes.`, {
        x: 4,
        y: 6,
        color: color`2`
      })
      if (tickets > highscore) {
        addText(`NEW HIGHSCORE!`, {
          x: 4,
          y: 5,
          color: color`2`

        })
        highscore = tickets
      }
      addText(`Tickets: ${tickets}`, {
        x: 4,
        y: 8,
        color: color`2`
      })
      addText(`Restart to replay`, {
        x: 2,
        y: 13,
        color: color`2`
      })
      gamestate -= 1
      break
  }
  gamestate += 1
}
movecount = 1
peopleperday = 3
iterations = 3 //number of ppl


function maingame() {
  if (char_isvalid == false) {
    createchar()
    next_p()
  } else {
    //Animate walking to center
    if (charoffset_x < 0) {
      charoffset_x += movecount
      P_ARRAY.splice(7, 4);
      P_ARRAY.splice(7, 0, [8 + charoffset_x, 3], [15 + charoffset_x, 1], [23 + charoffset_x, 15], [15 + charoffset_x, -6])
      //console.log(charoffset_x)
      Render(R_ARRAY, P_ARRAY, S_ARRAY)
    } else {
      //Start Action
      stager()
    }
  }
  setTimeout(maingame, updatetime);
}

function next_p() { //Set the animator, and clear
  if (gamestate > 0) {
    playTune(yail)
    console.log("changed chars")
    addText("Next!", {
      x: 2,
      y: 0,
      color: color`2`
    })
    R_ARRAY.splice(7, 4);
    S_ARRAY.splice(7, 4);
    P_ARRAY.splice(7, 4);
    createchar()
    charoffset_x = -50
  }

}

onInput("i", () => {
  if (gamestate < 6 && gamestate == 0 && lookable) {
    gamestate = 6
  }
})

onInput("w", () => {
  if (gamestate == 16 && lookable) {
    clearText()
    updatetime = 20
    iterations -= 1
    if (strikes >= 3) {
      gamestate = 20
    }
    else{
      if (iterations != 0) {
        char_isvalid = false
        gamestate = 1
      }
      else{
        if (datecount < 7){
          strikes = 0
          datecount += 1
          peopleperday += 2
          iterations = peopleperday //number of ppl
          intensity += Math.random(-0.1, 0.1)
          intensity = Math.max(0, Math.min(1, intensity));
          console.log(intensity)
          gamestate = 17
        }
        else{
          gamestate = 19
        }
      }
    }
  }
})

onInput("j", () => {
  if (gamestate < 6 && gamestate == 0 && lookable) {
    addText(`Rejected!`, {
      x: 3,
      y: 1,
      color: color`2`
    })
    playTune(tune`
500: B4/500,
500: G4~500,
15000`)
    ccount = -1
    choice = false
    gamestate = 9
  }
})

onInput("l", () => {
  if (gamestate < 6 && gamestate == 0 && lookable) {
    addText(`Approved!`, {
      x: 3,
      y: 1,
      color: color`2`
    })
    ccount = 1
    choice = true
    gamestate = 9
    playTune(tune`
500: B4/500,
500: G4~500,
15000`)
  }
})
/////////////

