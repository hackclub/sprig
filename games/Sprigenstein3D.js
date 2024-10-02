/*
@title: Sprigenstein3D
@author: TheBlueOomaLoompa
@tags: ['puzzle']
@addedOn: 2024-07-22
*/
/*
* Escape the 3D maze.
* Run into the trophy to complete each level.
* Controls:
*   W, S: Walk forward and backward
*   A, D: Turn left and right
*   J: Use key to open door
* TODO if I have time:
* - Add more levels
*/

/*
 * CONFIG
*/

const TILE_WIDTH=10
const TILE_HEIGHT=8
const TILE_SIZE=16

const PLAYER_SPEED = .5;
const LOOK_INC = 15 / 180 * Math.PI;
const COLLISION_MARGIN = .01;

const RAYCAST_RES = 0.001;
const FOV_NUM = 60;

const FOV = FOV_NUM / 180 * Math.PI;
const FOV_RES = FOV_NUM / 160 / 180 * Math.PI;
const MAX_HEIGHT = 128;

// ASSETS
//// Sounds
const doorSound = tune`
77.51937984496124: C4/77.51937984496124,
77.51937984496124: C4/77.51937984496124,
77.51937984496124: C4/77.51937984496124,
77.51937984496124: C4/77.51937984496124,
2170.5426356589146`;
const keySound = tune`
70.4225352112676: C4^70.4225352112676 + E4~70.4225352112676 + G4/70.4225352112676,
70.4225352112676: C5^70.4225352112676 + E5~70.4225352112676 + G5/70.4225352112676,
70.4225352112676: B5^70.4225352112676,
2042.2535211267605`;
const newLevelTune = tune`
103.80622837370242: D4~103.80622837370242 + G5^103.80622837370242 + A4/103.80622837370242,
103.80622837370242: D4~103.80622837370242 + F5^103.80622837370242 + B4/103.80622837370242,
103.80622837370242: D4~103.80622837370242 + E5^103.80622837370242 + A4/103.80622837370242,
103.80622837370242: D5^103.80622837370242 + D4~103.80622837370242 + G4/103.80622837370242,
103.80622837370242: F4-103.80622837370242,
103.80622837370242: F5-103.80622837370242,
2698.961937716263`;
const winTune = tune`
256.4102564102564: A5^256.4102564102564 + F5-256.4102564102564 + E4~256.4102564102564,
256.4102564102564,
256.4102564102564: A5^256.4102564102564 + F5-256.4102564102564 + B4/256.4102564102564 + D4~256.4102564102564,
256.4102564102564: A4/256.4102564102564,
256.4102564102564: G5^256.4102564102564 + E5-256.4102564102564 + E4~256.4102564102564,
256.4102564102564: A4/256.4102564102564,
256.4102564102564: G5^256.4102564102564 + E5-256.4102564102564,
256.4102564102564: G4/256.4102564102564,
256.4102564102564: E5^256.4102564102564 + C5-256.4102564102564 + F4/256.4102564102564 + E4~256.4102564102564,
256.4102564102564: G4/256.4102564102564,
256.4102564102564: G5^256.4102564102564 + E5-256.4102564102564 + D4~256.4102564102564,
256.4102564102564: F5^256.4102564102564 + D5-256.4102564102564 + B4/256.4102564102564,
256.4102564102564: G5^256.4102564102564 + E5-256.4102564102564 + E4~256.4102564102564,
256.4102564102564: A5^256.4102564102564 + F5-256.4102564102564 + B4/256.4102564102564,
256.4102564102564: B5^256.4102564102564 + G5-256.4102564102564 + B4/256.4102564102564 + D4~256.4102564102564,
256.4102564102564: D4~256.4102564102564,
256.4102564102564: B5^256.4102564102564 + G5-256.4102564102564 + G4/256.4102564102564,
256.4102564102564: C4~256.4102564102564,
256.4102564102564: D5^256.4102564102564 + B4-256.4102564102564 + C4/256.4102564102564 + F5~256.4102564102564,
256.4102564102564,
256.4102564102564: C5^256.4102564102564 + A4-256.4102564102564 + C4/256.4102564102564 + E5~256.4102564102564,
256.4102564102564: C4/256.4102564102564,
256.4102564102564: C5^256.4102564102564 + A4-256.4102564102564 + C4/256.4102564102564 + E5~256.4102564102564,
2307.6923076923076`;

//// Bitmaps
const wallTexture = bitmap`
2222222222222222
3332333233323332
3332333233323332
2222222222222222
3233323332333233
3233323332333233
2222222222222222
3332333233323332
3332333233323332
2222222222222222
3233323332333233
3233323332333233
2222222222222222
3332333233323332
3332333233323332
2222222222222222`;
const endTexture = bitmap`
................
...6666666666...
...FFFF33FFFF...
...6F6F33F6F6...
...FFFF33FFFF...
...6666666666...
...6666666666...
...6666666666...
....66666666....
....66666666....
......6666......
.......66.......
.......66.......
......FFFF......
.....666666.....
................`;
const keyTexture = bitmap`
................
................
................
................
................
................
....66..........
...6..6666666...
...6..6...6.6...
....66..........
................
................
................
................
................
................`;
const doorTexture = bitmap`
2222222222222222
3332355555523332
3332577777753332
2225777777775222
3235777777775233
3257777777777533
2257777777777522
3357777777777532
3357777777777532
2257777777677522
3257777776067533
3257777777677533
2257777777777522
3357777777777532
3357777777777532
2257777777777522`;

//// Levels

////// Level Components
const START = 's';
const END = 'e';
const WALL = 'w';
const KEY = 'k';
const DOOR = 'd';
const EMPTY = '_';

/* Empty level
`
  wwwwwwwwww
  w________w
  w________w
  w________w
  w________w
  w________w
  w________w
  w________w
  w________w
  wwwwwwwwww`,
*/

let levels = [
  `
  wwwwwwwwww
  w________w
  w_s______w
  w________w
  w___ww___w
  w___ww___w
  w________w
  w________w
  w_______ew
  wwwwwwwwww`,
  `
  wwwwwwwwww
  ws_______w
  w__wwwww_w
  w______www
  w___w__w_w
  w___w____w
  w_w___ww_w
  w_wwww___w
  w___w___ew
  wwwwwwwwww`,
  `
  wwwwwwwwww
  ws_______w
  wwwwwww__w
  w________w
  w_w_w_wwww
  w_w_w_weww
  w_w_w_w__w
  w_w_w_ww_w
  w__w_____w
  wwwwwwwwww`,
  `
  wwwwwwwwwww
  w_w__k___kw
  w_w_wwwww_w
  w___ws__w_w
  ww_ww___wdw
  w___w_____w
  w_www_wdwww
  w___w_w___w
  w_w_w_w___w
  w_w___w__ew
  wwwwwwwwwww`,
];

/*
 * PIXEL ENGINE
*/
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

let pixels = '';
function clear() {
  pixels = '';
  for(let i = 0; i < 160*128; i++) { pixels += i > 160*64 ? COLORS[1] : COLORS[6] }
}
clear();

function updateLegend() {
  let strings = [];

  let color = 0;
  
  for(let ty = 0; ty < TILE_HEIGHT; ty++) {
  for(let tx = 0; tx < TILE_WIDTH; tx++) {
  strings.push(''); // Populate array TODO: Prepopulate for performance
  for(let y = 0; y < TILE_SIZE; y++) {
    for(let x = 0; x < TILE_SIZE; x++) {
      strings[tx+ty*TILE_WIDTH] += pixels[tx*TILE_SIZE+x+(ty*TILE_SIZE+y)*TILE_WIDTH*TILE_SIZE];
      
    }
    strings[tx+ty*TILE_WIDTH] += '\n'
  }
    color += 1;
      if(color == COLORS.length) color = 0;
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
  pixels = pixels.substring(0, idx) + color + pixels.substring(idx+1);
}
/*
 * GAME
*/

let rows = [];

function removeThing(thing) {
  const { x, y } = { x: Math.floor(thing.x), y: Math.floor(thing.y) };
  rows[y] = rows[y].slice(0, x) + '_' + rows[y].slice(x + 1);
}

// STATE
let player = { x: 0, y: 0, a: 0, k: 0 };
let level = 0;

//// SETUP

// Remove whitespaces
for(let i = 0; i < levels.length; i++) {
  levels[i] = levels[i].replaceAll(' ', '');
}
rows = levels[level].split('\n');
function resetLevel() {
  rows = levels[level].split('\n');
  for(let y = 0; y < rows.length; y++) {
    for(let x = 0; x < rows[y].length; x++) {
      const char = rows[y].charAt(x);
      if(char == START) player = { x: x + .5, y: y + .5, a: 0, k: 0 };
    }
  }
}
resetLevel();

// RENDER

function render() {
  clear();
  addText(`Level ${level + 1}`, { x: 0, y: 0, color: COLORS[3] });
  let angleOffset = 0;
  let count = 0;
  let x = 0;
  while(angleOffset < FOV && x < 160) {
    const ra = player.a + angleOffset - FOV/2;
    const hit = raycast({ ...player, a: ra });
    const distance = dist(player, hit) * Math.cos(angleOffset - FOV/2);
    const height = Math.min(Math.max((11-distance)/13, 0), 1);
    const pxHeight = Math.round(Math.min(Math.max(height*MAX_HEIGHT, 0), 128));
    const percent = ((hit.x+hit.y))%1;

    switch(hit.char) {
      case WALL:
        drawLine(x, 1, pxHeight, percent, wallTexture);
        break;
      case END:
        drawLine(x, 1, pxHeight, percent, endTexture);
        break;
      case KEY:
        drawLine(x, 1, pxHeight, percent, keyTexture);
        break;
      case DOOR:
        drawLine(x, 1, pxHeight, percent, doorTexture);
        break;
      default:
        break;
    }
    x+= 1;

    angleOffset += FOV_RES;
  }
}

function dist(p1, p2) {
  return Math.sqrt((p2.x - p1.x)**2+(p2.y-p1.y)**2);
}

function drawLine(x, width, height, percent, texture) {
  const min = Math.round(Math.max(64-height/2, 0));
  const textureRows = texture.split('\n');
  
  for(let ix = x; ix < width + x; ix++) {
    for(let y = min; y < Math.round(Math.min(64+height/2, 128)); y++) {
      const color = textureRows[Math.floor((y-min)/height*16)+1].charAt(Math.floor(percent*16));
      setPixel(ix, y, color);
    }
  }
}

function raycast(start, filter = [START]) {
  let { x, y, a } = start;

  while(true) {
    const char = rows[Math.floor(y)].charAt(Math.floor(x))
    if(char != '_' && !filter.includes(char)) {
      return { char, x, y };
    }

    x += Math.cos(a) * RAYCAST_RES;
    y += Math.sin(a) * RAYCAST_RES;
  }
}

const moveFilter = [START, END, KEY];

// INPUT
onInput("w", () => {
  const hit = raycast(player);
  if(KEY == hit.char && dist(player, hit) < 1.5) {
    playTune(keySound);
    removeThing(hit);
    player.k++;
  }  
  
  const distance = dist(player, raycast(player, moveFilter));
  if(distance <= PLAYER_SPEED+COLLISION_MARGIN) return;
  player.x += Math.cos(player.a) * Math.min(PLAYER_SPEED, distance);
  player.y += Math.sin(player.a) * Math.min(PLAYER_SPEED, distance);
});

onInput("s", () => {
  const distance = dist(player, raycast({...player, a: player.a+Math.PI}, moveFilter));
  if(distance <= PLAYER_SPEED+COLLISION_MARGIN) return;
  player.x -= Math.cos(player.a) * Math.min(PLAYER_SPEED, distance);
  player.y -= Math.sin(player.a) * Math.min(PLAYER_SPEED, distance);
});

onInput("a", () => {
  player.a -= LOOK_INC;
});

onInput("d", () => {
  player.a += LOOK_INC;
});

onInput("j", () => {
  const hit = raycast(player);
  if(hit.char == DOOR && dist(player, hit) < 2 && player.k > 0) {
    player.k--;
    removeThing(hit);
    playTune(doorSound);
  }
});

// these get run after every input
afterInput(() => {
  clearText();
  const hit = raycast({ ...player, a: player.a });
  const distance = dist(player, hit);
  if(hit.char == END && distance < PLAYER_SPEED*2) {
    level += 1;
    if(level == levels.length) {
      addText("You escaped!", { x: 0, y: 0, color: COLORS[3] });
      playTune(winTune);
    }else {
      playTune(newLevelTune);
      resetLevel();
    }
  }
  if(level < levels.length) {
    render();
    updateLegend();
  }
});

// DEFAULT STATE RENDER
render();
updateLegend();
