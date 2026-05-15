/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: ship game
@author: OneAvargeCoder193
@tags: []
@addedOn: 2025-00-00
*/

setMap(map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`)

const pixWidth = width() * 16;
const pixHeight = height() * 16;
let screen8 = new Uint8Array(pixWidth * pixHeight / 2);
let screen32 = new Uint32Array(screen8.buffer);

const colors = [
  // Transparent
  '.',
  // Grayscale
  '0',
  'L',
  '1',
  '2',
  // Red
  '3',
  'C',
  // Blue
  '7',
  '5',
  // Yellow
  '6',
  'F',
  // Green
  '4',
  'D',
  // Pink and purple
  '8',
  'H',
  // Orange
  '9'
];

const chars = [
  "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", "/", 
  "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?",
  "@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "[","\\","]","^","_",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "{","|","}","~",
  "¡","¢","£","¤","¥","¦","§","¨","©","ª","«","¬","®","¯",
  "°","±","²","³","´","µ","¶","·","¸","¹","º","»","¼","½","¾","¿",
  "À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï",
  "Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý"
];

const special = [
  "Þ","ß",
  "à","á","â","ã","ä","å","æ","ç","è","é","ê","ë",
  "ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷",
  "ø","ù","ú","û","ü","ý","þ","ÿ"
];

const WATER = special[0];
let WATER_BITMAP;

let specialLegend = [];

function setPixel(x, y, color) {
  const pixelIndex = y * pixWidth + x;
  const byteIndex = pixelIndex >> 1;
  const bitIndex = (pixelIndex & 1) << 2;

  screen8[byteIndex] &= ~(15 << bitIndex);
  screen8[byteIndex] |= (color << bitIndex);
}

function calculateBitmap(arrays) {
  let str = new Array(17*16);
  let idx = 0;
  for(let i = 0; i < 16; i++) {
    str[idx++] = '\n';
    for(let j = 0; j < 2; j++) {
      const val = arrays[i * 2 + j];
      const h8 = (val >> 28) & 0xF;
      const h7 = (val >> 24) & 0xF;
      const h6 = (val >> 20) & 0xF;
      const h5 = (val >> 16) & 0xF;
      const h4 = (val >> 12) & 0xF;
      const h3 = (val >> 8) & 0xF;
      const h2 = (val >> 4) & 0xF;
      const h1 = val & 0xF;
      str[idx++] = colors[h1];
      str[idx++] = colors[h2];
      str[idx++] = colors[h3];
      str[idx++] = colors[h4];
      str[idx++] = colors[h5];
      str[idx++] = colors[h6];
      str[idx++] = colors[h7];
      str[idx++] = colors[h8];
    }
  }
  return str.join('');
}

const charToNibble = {};

for (let i = 0; i < colors.length; i++) {
  charToNibble[colors[i]] = i;
}

function loadImage(str) {
  const lines = str.split('\n');
  let width = lines[1].length;
  let height = lines.length - 1;
  let trueWidth = Math.ceil(width / 16) * 16;
  let trueHeight = Math.ceil(height / 16) * 16;
  const bytes = new Uint8Array(Math.ceil(trueWidth / 2) * trueHeight);

  let byteIndex = 0;
  let nibbleToggle = 0;
  let low = 0;

  const amountLeft = trueWidth - width;
  byteIndex -= Math.ceil(amountLeft/2);

  for(let i = 0; i < str.length; i++) {
    const c = str[i];
    if(c === '\n') {
      const amountLeft = trueWidth - width;
      if(nibbleToggle === 1) {
        bytes[byteIndex++] = low;
      }
      byteIndex += Math.ceil(amountLeft/2 - nibbleToggle);
      nibbleToggle = 0;
      continue;
    }

    const value = charToNibble[c];

    if (nibbleToggle === 0) {
      low = value;
      nibbleToggle = 1;
    } else {
      const byte = (value << 4) | low;
      bytes[byteIndex++] = byte;
      nibbleToggle = 0;
    }
  }

  return {data: new Uint32Array(bytes.buffer), width, height};
}

let bits = new Uint32Array(32);
function generateMap() {
  let legend = [];
  let alreadyExists = new Map();
  let map = new Array(width() * height());
  let idx = 0;
  let i = 0;

  for(let y = 0; y < height(); y++) {
    for(let x = 0; x < width(); x++) {
      for(let i = 0; i < 16; i++) {
        let baseIdx = (y * 16 + i) * width() * 2 + x * 2;
        bits[i * 2]     = screen32[baseIdx];
        bits[i * 2 + 1] = screen32[baseIdx + 1];
      }
      const key = bits.toString();
      if(!alreadyExists.has(key)) {
        legend.push([chars[i], calculateBitmap(bits)]);
        alreadyExists.set(key, chars[i]);
        i++;
      }

      map[idx++] = alreadyExists.get(key);
    }
  }

  setLegend(...legend, ...specialLegend);
  for(let y = 0; y < height(); y++) {
    for(let x = 0; x < width(); x++) {
      addSprite(x, y, map[y * width() + x]);
    }
  }
}

function line(x0, y0, x1, y1, color) {
  x0 = Math.round(x0);
  x1 = Math.round(x1);
  y0 = Math.round(y0);
  y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = Math.sign(x1 - x0);
  const sy = Math.sign(y1 - y0);
  let err = dx - dy;

  while (true) {
    setPixel(x0, y0, color);

    if (x0 === x1 && y0 === y1) break;

    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 <  dx) { err += dx; y0 += sy; }
  }
}

function rect(x, y, w, h, color) {
  x0 = Math.round(x);
  y0 = Math.round(y);
  x1 = Math.round(x + w);
  y1 = Math.round(y + h);

  if (x0 > x1) [x0, x1] = [x1, x0];
  if (y0 > y1) [y0, y1] = [y1, y0];

  const pixPerUint32 = 8;
  const maskPixel = (n) => ((1 << 4) - 1) << (n * 4);
  const fillValue = (color & 0xF) | ((color & 0xF) << 4) | ((color & 0xF) << 8) | ((color & 0xF) << 12) | ((color & 0xF) << 16) | ((color & 0xF) << 20) | ((color & 0xF) << 24) | ((color & 0xF) << 28);

  for (let y = y0; y <= y1; y++) {
    const rowStart = y * (pixWidth >> 3);
    const startUint = Math.floor(x0 / pixPerUint32);
    const endUint = Math.floor(x1 / pixPerUint32);

    const startOffset = x0 % pixPerUint32;
    const endOffset = x1 % pixPerUint32;

    if (startUint === endUint) {
      let mask = 0;
      for (let i = startOffset; i <= endOffset; i++) mask |= maskPixel(i);
      screen32[rowStart + startUint] = (screen32[rowStart + startUint] & ~mask) | (fillValue & mask);
    } else {
      let mask = 0;
      for (let i = startOffset; i < pixPerUint32; i++) mask |= maskPixel(i);
      screen32[rowStart + startUint] = (screen32[rowStart + startUint] & ~mask) | (fillValue & mask);

      for (let u = startUint + 1; u < endUint; u++) {
        screen32[rowStart + u] = fillValue;
      }

      mask = 0;
      for (let i = 0; i <= endOffset; i++) mask |= maskPixel(i);
      screen32[rowStart + endUint] = (screen32[rowStart + endUint] & ~mask) | (fillValue & mask);
    }
  }
}

function pasteImageInner(x, y, img32, flipped = false) {
  for (let row = 0; row < 16; row++) {
    const imgRowStart = row * 2;
    let rowPart1 = img32[imgRowStart];
    let rowPart2 = img32[imgRowStart + 1];

    if (flipped) {
      const p1 = reverseNibbles(rowPart1);
      const p2 = reverseNibbles(rowPart2);
      rowPart1 = p2;
      rowPart2 = p1;
    }
    let p1mask = (((rowPart1 | (rowPart1 >> 1) | (rowPart1 >> 2) | (rowPart1 >> 3)) & 0x11111111) ^ 0x11111111) * 0xF;
    let p2mask = (((rowPart2 | (rowPart2 >> 1) | (rowPart2 >> 2) | (rowPart2 >> 3)) & 0x11111111) ^ 0x11111111) * 0xF;

    const screenRow = (y + row) * (pixWidth >> 3);
    const uintCol = x >> 3;
    const width = pixWidth >> 3;
    const baseIdx = (screenRow + (x >> 3));
    const shiftBits = (x & 7) * 4;

    if (shiftBits === 0) {
      if(uintCol >= 0 && uintCol < width) screen32[baseIdx] = (screen32[baseIdx] & p1mask) | rowPart1;
      if(uintCol + 1 >= 0 && uintCol + 1 < width) screen32[baseIdx + 1] = (screen32[baseIdx + 1] & p2mask) | rowPart2;
    } else {
      const invShift = 32 - shiftBits;
      if(uintCol >= 0 && uintCol < width) screen32[baseIdx] = (screen32[baseIdx] & (((1 << shiftBits) - 1) | (p1mask << shiftBits)) >>> 0) | (rowPart1 << shiftBits);
      if(uintCol + 1 >= 0 && uintCol + 1 < width) screen32[baseIdx + 1] = (screen32[baseIdx + 1] & ((p1mask >>> invShift) | (p2mask << shiftBits))) | (rowPart1 >>> invShift) | (rowPart2 << shiftBits);
      if(uintCol + 2 >= 0 && uintCol + 2 < width) screen32[baseIdx + 2] = (rowPart2 >>> invShift) | (screen32[baseIdx + 2] & (~((1 << shiftBits) - 1) | (p2mask >>> invShift)));
    }
  }
}

function pasteImage(x, y, img, flipped = false) {
  x = Math.round(x);
  y = Math.round(y);

  const tilesX = Math.ceil(img.width / 16);
  const tilesY = Math.ceil(img.height / 16);

  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const tileWidth = Math.min(16, img.width - tx * 16);
      const tileHeight = Math.min(16, img.height - ty * 16);

      const tileBuffer = new Uint32Array(32);

      for (let row = 0; row < tileHeight; row++) {
        const srcRowStart = (ty * 16 + row) * tilesX * 2 + (!flipped?tx:(tilesX - tx - 1)) * 2;
        for (let colU32 = 0; colU32 < 2; colU32++) {
          const srcIdx = srcRowStart + colU32;
          const dstIdx = row * 2 + colU32;
          if (srcIdx < img.data.length && dstIdx < tileBuffer.length) {
            tileBuffer[dstIdx] = img.data[srcIdx];
          }
        }
      }

      pasteImageInner(x + tx * 16, y + ty * 16, tileBuffer, flipped);
    }
  }
}

function reverseNibbles(n) {
  n = ((n & 0x0F0F0F0F) << 4) | ((n & 0xF0F0F0F0) >>> 4);
  n = ((n & 0x00FF00FF) << 8) | ((n & 0xFF00FF00) >>> 8);
  n = ((n & 0x0000FFFF) << 16) | (n >>> 16);
  return n >>> 0;
}

function clear(color=0) {
  setMap(map`
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............`)
  screen8.fill(color | color << 4);
}

function createSpecialLegend() {
  specialLegend = [
    [WATER, WATER_BITMAP]
  ];
  setLegend(...specialLegend);
}

function background(time, camX, camY) {
  let background = new Array(17 * 16);
  let idx = 0;
  for(let y = 0; y < 16; y++) {
    background[idx++] = '\n';
    for(let x = 0; x < pixWidth; x++) {
      let sin = Math.sin(x * Math.PI / 8.0 + time + camX / 2.0) * 2 * Math.sin(time) + 8;
      
      let color = 7;
      if(Math.abs(sin - y - (camY % 16) / 2.0) < 0.5) {
        color = 4;
      }
      if(Math.abs(sin - y - (camY % 16 - 16) / 2.0) < 0.5) {
        color = 4;
      }
      if(Math.abs(sin - y - (camY % 16 + 16) / 2.0) < 0.5) {
        color = 4;
      }
      if(Math.abs(sin - y - (camY % 16 - 32) / 2.0) < 0.5) {
        color = 4;
      }
      if(Math.abs(sin - y - (camY % 16 + 32) / 2.0) < 0.5) {
        color = 4;
      }
      background[idx++] = colors[color];
    }
  }
  WATER_BITMAP = background.join('');
}

function wrapAngle(diff) {
  while (diff <= -Math.PI) diff += 2 * Math.PI;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  return diff;
}

function interpolateAngle(angle1, angle2, t) {
    const TWO_PI = Math.PI * 2;

    angle1 = angle1 % TWO_PI;
    angle2 = angle2 % TWO_PI;

    let delta = angle2 - angle1;
    if (delta > Math.PI) delta -= TWO_PI;
    if (delta < -Math.PI) delta += TWO_PI;

    return angle1 + delta * t;
}

function rotateTowardDirection(currentAngle, dirX, dirY, stepDeg = 45) {
  const stepRad = stepDeg * (Math.PI / 180);
  const targetAngle = Math.atan2(dirY, dirX);
  const diff = wrapAngle(targetAngle - currentAngle);

  if (Math.abs(diff) <= stepRad) {
    return targetAngle;
  }

  return currentAngle + stepRad * (diff > 0 ? 1 : -1);
}

function checkCollision(rect1, rect2) {
  return !(
    rect1.xMax < rect2.xMin ||
    rect1.xMin > rect2.xMax ||
    rect1.yMax < rect2.yMin ||
    rect1.yMin > rect2.yMax
  );
}

function isFullyInside(rect1, rect2) {
  return (
    rect1.xMin >= rect2.xMin &&
    rect1.xMax <= rect2.xMax &&
    rect1.yMin >= rect2.yMin &&
    rect1.yMax <= rect2.yMax
  );
}

function clampCamera(camX, camY, camWidth, camHeight, worldBox) {
  const halfWidth = camWidth / 2;
  const halfHeight = camHeight / 2;

  if (camX - halfWidth < worldBox.xMin) {
    camX = worldBox.xMin + halfWidth;
  } else if (camX + halfWidth > worldBox.xMax) {
    camX = worldBox.xMax - halfWidth;
  }

  if (camY - halfHeight < worldBox.yMin) {
    camY = worldBox.yMin + halfHeight;
  } else if (camY + halfHeight > worldBox.yMax) {
    camY = worldBox.yMax - halfHeight;
  }

  return [camX, camY];
}

onInput('w', () => {
  if(stopped) {
    start();
    return;
  }
  targetAngle = rotateTowardDirection(targetAngle, 0, -1);
})

onInput('s', () => {
  if(stopped) {
    start();
    return;
  }
  targetAngle = rotateTowardDirection(targetAngle, 0, 1);
})

onInput('d', () => {
  if(stopped) {
    start();
    return;
  }
  targetAngle = rotateTowardDirection(targetAngle, 1, 0);
})

onInput('a', () => {
  if(stopped) {
    start();
    return;
  }
  targetAngle = rotateTowardDirection(targetAngle, -1, 0);
})

onInput('i', () => {
  if(!stopped) return;
  start();
})

onInput('j', () => {
  if(!stopped) return;
  start();
})

onInput('k', () => {
  if(!stopped) return;
  start();
})

onInput('l', () => {
  if(!stopped) return;
  start();
})

let boat = loadImage(bitmap`
................................20..2......................
.............................02220022......................
.............................0.202202......................
.............................0.22002.......................
.............................0220.20.......................
.............................0.............................
.............................0.............................
.........................6CCC0CCC6.........................
.........................066666663.........................
.........................000000003.........................
.........................000000003.........................
.........................000000003.........................
..........................0000003.CC......0................
............................C0......CCC.00.................
............................C0........00222................
...........................C.0......00222222...............
..........................C..0....00222222222..............
..........................C..0.00022222222222..............
.........................C...00222C22222222222.............
........................C.00022222C22222222222.............
......................0000222222222C2222222222.............
.....................00222222222222C2222222222.............
........................222222222222C222222222.............
.........................222222222222C22222222.............
.........................2222222222222C2222221.............
.........................22222222222222C222212.............
..........................22222222222222CC212F.............
..........................2222222222222222CCFF.............
..........................222222222222222121CC.............
..........................2222222222221212FFF.CCC..........
..................633.....22222222222121FFFF.....CCCCC9....
................6633333...2222222212121FFF..........60.....
..............66333333333.222222212F21FF............99.....
............66333333333333222222F2FFFFFC...........0.......
..........6633333333333333222121FFFFC.CC..........0........
.........63333333333333392121F1FFF.C.C.C.........0.........
.........066333333333339912FFFFF....C.C.C..3333330.........
.........0006633333339999FFFFF33333333333333CCCCD3.........
.........000006433399999FFFF303333333333CC3CC3CCD..........
.........0000000D99999999C3C30333333333CC3CC3CCD3..........
.........0000000D9999099C3C33333333333CC3CCCCCD03..........
..........000000D9990093CC3C333333333CC3CC3CCD03...........
..........000000D9990033C3CC3333333CCC33CCCCD003...........
...........00000D999033C3C3C3333333CC33C3CCD0003...........
...........00000D49333C3C3C33333333333C3CCD0003............
............000000663C3C3CC3333333333333DD00003............
........22....00000063C3C3C333333333364D000003.............
...........222.00CC006663C3333336666600000000..............
...............00CC0C0006666666600CC000F0000...............
2222...........2F0F0CC0CC00CC00CC0CCF0F0F0.................
........222222222F0F0C0CC00CC00CC00F0F0F2222...............
............222222200F00F00F0F00F000F0222222...............
.................222220F00F0F0F00FFF2222222................
....................222222222222222222.....................`);
let rock = loadImage(bitmap`
................
................
................
................
................
.....21222......
....11111222....
..L1111111112...
..L11111111112..
..LL11111111112.
.LLLL11111111111
.LLLLL1111111111
.0LLLLLLLLLLLLL.
..000LLLLLL000..
.....000000.....
................`);
let coin = loadImage(bitmap`
................
................
......FFFF......
....FF6222FF....
....F666662F....
...F666FF662F...
...F666FF666F...
...F666FF666F...
...F666FF666F...
...F666FF666F...
...F662FF666F...
....F662666F....
....FF6666FF....
......FFFF......
................
................`);

let gameInterval;
let stopped;

let shipX;
let shipY;
let camX;
let camY;
let velX;
let velY;
let angle;
let targetAngle;
let coinCount;
let health;
let maxHealth;

let rocks = [];
let coins = [];

let bounds = {
  xMin: -500,
  yMin: -500,
  xMax: 500,
  yMax: 500,
};

let shipBox = {
  xMin: -20,
  yMin: 5,
  xMax: 20,
  yMax: 25
};

function stop() {
  clearInterval(gameInterval);
  stopped = true;
  addText("Press any button", {
    x: 2,
    y: 7,
    color: color`0`
  });
  addText("to play", {
    x: 6,
    y: 8,
    color: color`0`
  });
}

function start() {
  stopped = false;
  clearText();

  shipX = 0;
  shipY = 0;
  camX = 0;
  camY = 0;
  velX = 0;
  velY = 0;
  angle = 0;
  targetAngle = 0;
  coinCount = 0;
  health = 5;
  maxHealth = 5;

  rocks = [];
  for(let i = 0; i < 200; i++) {
    let x = Math.random() * (1000 - rock.width) - 500;
    let y = Math.random() * (1000 - rock.height) - 500;
    while(x * x + y * y < 50*50) {
      x = Math.random() * (1000 - rock.width) - 500;
      y = Math.random() * (1000 - rock.height) - 500;
    }
    rocks.push([x, y]);
  }
  
  coins = [];
  for(let i = 0; i < 200; i++) {
    let x = Math.random() * (1000 - rock.width) - 500;
    let y = Math.random() * (1000 - rock.height) - 500;
    while(x * x + y * y < 50*50) {
      x = Math.random() * (1000 - rock.width) - 500;
      y = Math.random() * (1000 - rock.height) - 500;
    }
    coins.push([x, y]);
  }
  
  shipBox = {
    xMin: -20,
    yMin: 5,
    xMax: 20,
    yMax: 25
  };
  
  let time = 0;
  gameInterval = setInterval(() => {
    clear();
  
    let deltaTime = 0.1;
    time += deltaTime;
  
    angle = interpolateAngle(angle, targetAngle, 1 - Math.exp(-deltaTime * 5));
  
    velX += deltaTime * 16 * Math.cos(angle);
    velY += deltaTime * 16 * Math.sin(angle);
    velX *= 0.995 * Math.exp(-deltaTime);
    velY *= 0.995 * Math.exp(-deltaTime);
    shipX += velX * deltaTime;
    shipY += velY * deltaTime;
  
    shipBox = {
      xMin: -20 + shipX,
      yMin: 5 + shipY,
      xMax: 20 + shipX,
      yMax: 25 + shipY
    };
  
    if(shipBox.xMin < bounds.xMin || shipBox.xMax > bounds.xMax) {
      if(velX > 0) {
        shipX += (bounds.xMax - shipBox.xMax);
      } else {
        shipX += (bounds.xMin - shipBox.xMin);
      }
      velX *= -0.5;
    }
  
    if(shipBox.yMin < bounds.yMin || shipBox.yMax > bounds.yMax) {
      if(velY > 0) {
        shipY += (bounds.yMax - shipBox.yMax);
      } else {
        shipY += (bounds.yMin - shipBox.yMin);
      }
      velY *= -0.5;
    }
  
    const [camX, camY] = clampCamera(shipX, shipY, pixWidth, pixHeight, bounds);
  
    for (let i = rocks.length - 1; i >= 0; i--) {
      const pos = rocks[i];
      let x = pos[0] - camX + 112;
      let y = pos[1] - camY + 80;
      if(x + rock.width < 0 || x >= pixWidth || y + rock.height < 0 || y >= pixHeight) {
        continue;
      }
      pasteImage(x, y, rock);
  
      if(checkCollision(shipBox, {
        xMin: pos[0],
        yMin: pos[1],
        xMax: pos[0] + rock.width,
        yMax: pos[1] + rock.height
      })) {
        velX *= -0.5;
        velY *= -0.5;
        health--;
        if(health == 0) {
          stop();
        }
        rocks.splice(i, 1);
      }
    }
  
    for (let i = coins.length - 1; i >= 0; i--) {
      const pos = coins[i];
      let x = pos[0] - camX + 112;
      let y = pos[1] - camY + 80;
      if(x + rock.width < 0 || x >= pixWidth || y + rock.height < 0 || y >= pixHeight) {
        continue;
      }
      pasteImage(x, y, coin);
  
      if(checkCollision(shipBox, {
        xMin: pos[0],
        yMin: pos[1],
        xMax: pos[0] + coin.width,
        yMax: pos[1] + coin.height
      })) {
        coinCount++;
        coins.splice(i, 1);
      }
    }
  
    pasteImage(shipX - camX + 112 - boat.width/2, shipY - camY + 80 - boat.height/2, boat, Math.cos(angle) < 0);
  
    let speed = Math.sqrt(velX * velX + velY * velY);
    let arrowPointX = shipX - camX + 112 + velX * 2;
    let arrowPointY = shipY - camY + 80 + velY * 2;
    let arrowSide0X = arrowPointX + Math.cos(angle + 3*Math.PI/4) * 5;
    let arrowSide0Y = arrowPointY + Math.sin(angle + 3*Math.PI/4) * 5;
    let arrowSide1X = arrowPointX + Math.cos(angle - 3*Math.PI/4) * 5;
    let arrowSide1Y = arrowPointY + Math.sin(angle - 3*Math.PI/4) * 5;
    line(arrowPointX, arrowPointY, arrowSide0X, arrowSide0Y, 1);
    line(arrowPointX, arrowPointY, arrowSide1X, arrowSide1Y, 1);
  
    rect(shipX - camX + 112 - 30, shipY - camY + 80 + Math.round(boat.height/2) + 4, 60, 4, 1);
    rect(shipX - camX + 112 - 29, shipY - camY + 80 + Math.round(boat.height/2) + 5, 58, 2, 2);
  
    let healthPerc = health / maxHealth;
    let healthColor = 11;
    if(healthPerc <= 0.8) healthColor = 9;
    if(healthPerc <= 0.5) healthColor = 15;
    if(healthPerc <= 0.2) healthColor = 5;
    rect(shipX - camX + 112 - 29, shipY - camY + 80 + Math.round(boat.height/2) + 5, 58 * healthPerc, 2, healthColor);
  
    background(time, camX, camY);
  
    createSpecialLegend();
    for(let y = 0; y < height(); y++) {
      for(let x = 0; x < width(); x++) {
        addSprite(x, y, WATER);
      }
    }
  
    generateMap();
  
    addText("Coins: " + coinCount.toString(), {
      x: 0,
      y: 0,
      color: color`6`
    });
  }, 1000 / 10)
}

stop();