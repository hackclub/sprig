/*
@title: FlyMyKite
@author: Julius Rompf
@tags: ['endless', 'action', 'retro']
@addedOn: 2024-11-16
*/

/*
 * Fly your kite, collect yellow gems. Watch out,
 * the wind increases with every 10 gems collected.
 * 
 * Controls:
 *   J: Take off and fly higher
 *   D: Fly lower
 *
 * Ideas for modifications:
 * - Change shape of kite or gems
 * - Add storm clouds (reduce score or impact movement)
 * - Bounce from the ground (or crash)
 * - Add a multiplayer mode (compete on speed or gems)
 */

/*
 * PIXEL ENGINE
 *
 * The pixel engine is adapted from the game
 * Sprigenstein3D by TheBlueOomaLoompa 
 * (https://sprig.hackclub.com/gallery/Sprigenstein3D)
 *
 */

// CONFIG
const SCREEN_X = 160
const SCREEN_Y = 128
const TILES_X = 10
const TILES_Y = 8
const TILE_SIZE = 16

// ASSETS
const tiles = 
`abcdefghij
klmnopqrst
uvwxyz0123
456789\`~!@
#$%^&*()-_
+=ABCDEFGH
IJKLMNOPQR
STUVWXYZ<>`

const sprites = tiles.split("\n").map(x => x.split(""))

const COLORS = "0L123C756F4D8H9".split("")

let pixels = new Array(160*128)

function clear() {
  for (let i = 0; i < SCREEN_X*SCREEN_Y; i++) { 
    pixels[i] = i > SCREEN_X*110 ? COLORS[1] : COLORS[6] 
  }
}

clear();

function updateLegend() {
  let param = []
  let buf = new Array(TILE_SIZE*TILE_SIZE+1) // pixel buffer for one tile at a time
  for (let ty = 0; ty < TILES_Y; ty++) {
    for (let tx = 0; tx < TILES_X; tx++) {
      let i = 0
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          buf[i++] = (pixels[tx*TILE_SIZE+x+(ty*TILE_SIZE+y)*TILES_X*TILE_SIZE])
        }
        buf[i++] = ("\n")
      }
      let str = buf.join("")
      param.push([sprites[ty][tx], bitmap`${str}`])
    }
  }
  setLegend(...param)
}

updateLegend()

setMap(map`${tiles}`)

function setPixel(x, y, color) {
  pixels[x+y*TILES_X*TILE_SIZE] = color
}


/*
 * GAME
*/


// STATE

let posX = 0
let posY = 96

let velX = 0
let velY = 0

let accX = 0
let accY = 0

let gravX = 0
let gravY = 0.1

let boxX = 80 
let boxY = 64

let boxShown = true

let screen = 0
let level = 0
let score = 0


// RENDER

function drawText() {
  if (velX == 0)
    addText(`Hit j to start`, { x: 1, y: 1, color: COLORS[3] });
  else
    addText(`Level ${level} Score ${score}  `, { x: 1, y: 1, color: COLORS[3] });
}

function drawBox() {
  if (boxShown) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        setPixel(i+boxX,j+boxY, COLORS[8])
      }
    }
  }
}

function drawKite() {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < i; j++) {
      setPixel(i+posX,j+posY, COLORS[4])
    }
  }
}

function render() {
  clear();
  drawText()
  drawBox()
  drawKite()
  updateLegend();
}

// INPUT

onInput("w", () => {
  //posY -= 1
});

onInput("a", () => {
  velX -= 1
});

onInput("s", () => {
  velX += 1
});

onInput("d", () => {
  accY = 2
});

onInput("j", () => {
  if (velX == 0) velX = 1
  accY = -3
});

onInput("k", () => {
  accY = 0
});


// MAIN LOOP

// render on start
render();

// render after every input
afterInput(() => {
  clearText();
  render();
});

// main loop
setInterval(() => {

  // update speed based on gravity and input force
  velY = velY + gravY + accY
  velX = velX + gravX + accX // (delta typically 0)
  
  // update position based on speed
  posY = Math.trunc(posY + velY)
  posX = Math.trunc(posX + velX)

  // clamp to screen top/bottom
  if (posY < 0) {
    posY = 0
    velY = 0
  }
  if (posY > 95) {
    posY = 95
    velY = 0
  }

  // hit box?
  if (boxShown) {
    if (boxX-5 <= posX+10 && posX+10 <= boxX+15 &&
        boxY-5 <= posY+5 && posY+5 <= boxY+15) {
      score = score + 1
      boxShown = false

      if (score % 10 == 0) {
        velX = velX+1
        level = level + 1
      }
    }
  }

  // leave screen?
  if (posX >= 160) {
    posX = posX % 160
    screen = screen + 1

    boxShown = true
    boxX = 45 + Math.trunc(Math.random() * (160-45-10))
    boxY = 10 + Math.trunc(Math.random() * (110-10-10))
  }
  if (posX < 0) {
    posX = (posX+160) % 160
    screen = screen - 1
  }

  // reset acting force
  accX = 0
  accY = 0
  
  render()
}, navigator.userAgent.includes("Chrome") ? 20 : 10)
