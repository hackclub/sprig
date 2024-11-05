/*
@title: FlyMyKite
@author: Julius Rompf
@tags: ['endless', 'action', 'retro']
@addedOn: 2024-11-03
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
 * The pixel engine is copied from the game
 * Sprigenstein3D by TheBlueOomaLoompa 
 * (https://sprig.hackclub.com/gallery/Sprigenstein3D)
 *
 */

// CONFIG
const TILE_WIDTH=10
const TILE_HEIGHT=8
const TILE_SIZE=16

// ASSETS
const sprites = [
  ['a','b','c','d','e','f','g','h','i','j'],
  ['k','l','m','n','o','p','q','r','s','t'],
  ['u','v','w','x','y','z','0','1','2','3'],
  ['4','5','6','7','8','9','`','~','!','@'],
  ['#','$','%','^','&','*','(',')','-','_',],
  ['+','=','A','B','C','D','E','F','G','H',],
  ['I','J','K','L','M','N','O','P','Q','R',],
  ['S','T','U','V','W','X','Y','Z','<','>',],
];

const COLORS = ['0', 'L', '1', '2', '3','C','7','5','6','F','4','D','8','H','9'];

let pixels = new Array(160*128)
function clear() {
  for (let i = 0; i < 160*128; i++) { 
    pixels[i] = i > 160*110 ? COLORS[1] : COLORS[6] 
  }
}
clear();

function updateLegend() {
  let strings = [];
  let color = 0;
  for (let ty = 0; ty < TILE_HEIGHT; ty++) {
    for (let tx = 0; tx < TILE_WIDTH; tx++) {
      strings.push(''); // Populate array TODO: Prepopulate for performance
      for (let y = 0; y < TILE_SIZE; y++) {
        for (let x = 0; x < TILE_SIZE; x++) {
          strings[tx+ty*TILE_WIDTH] += pixels[tx*TILE_SIZE+x+(ty*TILE_SIZE+y)*TILE_WIDTH*TILE_SIZE];          
        }
        strings[tx+ty*TILE_WIDTH] += '\n'
      }
      color += 1;
      if (color == COLORS.length) color = 0;
    }
  }
  setLegend(
    [ sprites[0][0], bitmap`${strings[0]}`],
    [ sprites[0][1], bitmap`${strings[1]}`],
    [ sprites[0][2], bitmap`${strings[2]}`],
    [ sprites[0][3], bitmap`${strings[3]}`],
    [ sprites[0][4], bitmap`${strings[4]}`],
    [ sprites[0][5], bitmap`${strings[5]}`],
    [ sprites[0][6], bitmap`${strings[6]}`],
    [ sprites[0][7], bitmap`${strings[7]}`],
    [ sprites[0][8], bitmap`${strings[8]}`],
    [ sprites[0][9], bitmap`${strings[9]}`],

    [ sprites[1][0], bitmap`${strings[10]}`],
    [ sprites[1][1], bitmap`${strings[11]}`],
    [ sprites[1][2], bitmap`${strings[12]}`],
    [ sprites[1][3], bitmap`${strings[13]}`],
    [ sprites[1][4], bitmap`${strings[14]}`],
    [ sprites[1][5], bitmap`${strings[15]}`],
    [ sprites[1][6], bitmap`${strings[16]}`],
    [ sprites[1][7], bitmap`${strings[17]}`],
    [ sprites[1][8], bitmap`${strings[18]}`],
    [ sprites[1][9], bitmap`${strings[19]}`],

    [ sprites[2][0], bitmap`${strings[20]}`],
    [ sprites[2][1], bitmap`${strings[21]}`],
    [ sprites[2][2], bitmap`${strings[22]}`],
    [ sprites[2][3], bitmap`${strings[23]}`],
    [ sprites[2][4], bitmap`${strings[24]}`],
    [ sprites[2][5], bitmap`${strings[25]}`],
    [ sprites[2][6], bitmap`${strings[26]}`],
    [ sprites[2][7], bitmap`${strings[27]}`],
    [ sprites[2][8], bitmap`${strings[28]}`],
    [ sprites[2][9], bitmap`${strings[29]}`],

    [ sprites[3][0], bitmap`${strings[30]}`],
    [ sprites[3][1], bitmap`${strings[31]}`],
    [ sprites[3][2], bitmap`${strings[32]}`],
    [ sprites[3][3], bitmap`${strings[33]}`],
    [ sprites[3][4], bitmap`${strings[34]}`],
    [ sprites[3][5], bitmap`${strings[35]}`],
    [ sprites[3][6], bitmap`${strings[36]}`],
    [ sprites[3][7], bitmap`${strings[37]}`],
    [ sprites[3][8], bitmap`${strings[38]}`],
    [ sprites[3][9], bitmap`${strings[39]}`],

    [ sprites[4][0], bitmap`${strings[40]}`],
    [ sprites[4][1], bitmap`${strings[41]}`],
    [ sprites[4][2], bitmap`${strings[42]}`],
    [ sprites[4][3], bitmap`${strings[43]}`],
    [ sprites[4][4], bitmap`${strings[44]}`],
    [ sprites[4][5], bitmap`${strings[45]}`],
    [ sprites[4][6], bitmap`${strings[46]}`],
    [ sprites[4][7], bitmap`${strings[47]}`],
    [ sprites[4][8], bitmap`${strings[48]}`],
    [ sprites[4][9], bitmap`${strings[49]}`],

    [ sprites[5][0], bitmap`${strings[50]}`],
    [ sprites[5][1], bitmap`${strings[51]}`],
    [ sprites[5][2], bitmap`${strings[52]}`],
    [ sprites[5][3], bitmap`${strings[53]}`],
    [ sprites[5][4], bitmap`${strings[54]}`],
    [ sprites[5][5], bitmap`${strings[55]}`],
    [ sprites[5][6], bitmap`${strings[56]}`],
    [ sprites[5][7], bitmap`${strings[57]}`],
    [ sprites[5][8], bitmap`${strings[58]}`],
    [ sprites[5][9], bitmap`${strings[59]}`],

    [ sprites[6][0], bitmap`${strings[60]}`],
    [ sprites[6][1], bitmap`${strings[61]}`],
    [ sprites[6][2], bitmap`${strings[62]}`],
    [ sprites[6][3], bitmap`${strings[63]}`],
    [ sprites[6][4], bitmap`${strings[64]}`],
    [ sprites[6][5], bitmap`${strings[65]}`],
    [ sprites[6][6], bitmap`${strings[66]}`],
    [ sprites[6][7], bitmap`${strings[67]}`],
    [ sprites[6][8], bitmap`${strings[68]}`],
    [ sprites[6][9], bitmap`${strings[69]}`],

    [ sprites[7][0], bitmap`${strings[70]}`],
    [ sprites[7][1], bitmap`${strings[71]}`],
    [ sprites[7][2], bitmap`${strings[72]}`],
    [ sprites[7][3], bitmap`${strings[73]}`],
    [ sprites[7][4], bitmap`${strings[74]}`],
    [ sprites[7][5], bitmap`${strings[75]}`],
    [ sprites[7][6], bitmap`${strings[76]}`],
    [ sprites[7][7], bitmap`${strings[77]}`],
    [ sprites[7][8], bitmap`${strings[78]}`],
    [ sprites[7][9], bitmap`${strings[79]}`],
  );
}

updateLegend()

setMap(map`
abcdefghij
klmnopqrst
uvwxyz0123
456789\`~!@
#$%^&*()-_
+=ABCDEFGH
IJKLMNOPQR
STUVWXYZ<>`);

function setPixel(x, y, color) {
  const idx = x+y*TILE_WIDTH*TILE_SIZE;
  pixels[idx] = color //pixels.substring(0, idx) + color + pixels.substring(idx+1);
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
