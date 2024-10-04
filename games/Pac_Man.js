/*
@title: Pac Man
@author: Nico Koundakjian
@tags: ['retro']
@addedOn: 2022-12-07


The Pac is back
Ghosts chomping at his feet
Pac's our hero
Pac just can't be beat, yeah!

Pac-Man yellow, Pac extreme
He's a chowing down machine
Ghosts, monsters, ghouls, and only one can stop them
Pac-man rules!

The Pac is back
Ghosts chomping at his feet
Pac's our hero
Pac just can't be beat

The Pac is back!
*/

const player = "p";
const power = "b";
const wall = "w";
const dot = "t";
const background = "k";
const inky = "i";
const blinky = "l";
const pinky = "y";
const clyde = "c";
const blinkyeyes = "e";
const inkyeyes = "s";
const pinkyeyes = "n";
const clydeeyes = "o";
const ghostwall = "m";
setLegend(
  [ player, bitmap`
......66666.....
....666666666...
...66666666666..
..666666666666..
..666666666666..
.66666666666....
.66666666.......
.666666.........
.66666666.......
.66666666666....
..666666666666..
..666666666666..
...66666666666..
....666666666...
......66666.....
................`],
  [ blinky, bitmap `
................
.....33333......
....33333333....
...3333333333...
..33322333322...
..332222332222..
..332255332255..
.33322553322553.
.33332233332233.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33.333..333.33.
.3...33..33...3.`],
  [ inky, bitmap `
................
.....77777......
....77777777....
...7777777777...
..77722777722...
..772222772222..
..775522775522..
.77755227755227.
.77772277772277.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77.777..777.77.
.7...77..77...7.`],
  [ pinky, bitmap `
................
.....88888......
....88888888....
...8888888888...
..88822888822...
..882222882222..
..882222882222..
.88825528825528.
.88885588885588.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88.888..888.88.
.8...88..88...8.`],
  [ clyde, bitmap `
................
.....99999......
....99999999....
...9999999999...
..99955999955...
..992552992552..
..992222992222..
.99922229922229.
.99992299992299.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99.999..999.99.
.9...99..99...9.`],
  [ blinkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....2255..2255..
....2255..2255..
.....22....22...
................
................
................
................
................
................
................`],
  [ inkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....5522..5522..
....5522..5522..
.....22....22...
................
................
................
................
................
................
................`],
  [ pinkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....2222..2222..
....2552..2552..
.....55....55...
................
................
................
................
................
................
................`],
  [ clydeeyes, bitmap `
................
................
................
................
.....55....55...
....2552..2552..
....2222..2222..
....2222..2222..
.....22....22...
................
................
................
................
................
................
................`],
  [ power, bitmap`
................
....2222222.....
...222222222....
..22222222222...
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
..22222222222...
...222222222....
....2222222.....
................`],
  [ wall, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ dot, bitmap`
................
................
................
................
................
......2222......
.....222222.....
.....222222.....
.....222222.....
.....222222.....
......2222......
................
................
................
................
................`],
  [ background, bitmap`
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
  [ ghostwall, bitmap `
................
................
................
................
................
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
................
................
................
................
................`],
);
setBackground(background);
setSolids([player,wall]);
let lives = 3;
let score = 0;
const levels = [
  map`
.......................
.......................
..wwwwwwwwwwwwwwwwwww..
..wttttttttwttttttttw..
..wbwwtwwwtwtwwwtwwbw..
..wtttttttttttttttttw..
..wtwwtwtwwwwwtwtwwtw..
..wttttwtttwtttwttttw..
..wwwwtwww.w.wwwtwwww..
.....wtw...l...wtw.....
.wwwwwtw.wwmww.wtwwwww.
......t..wiycw..t......
.wwwwwtw.wwwww.wtwwwww.
.....wtw.......wtw.....
..wwwwtw.wwwww.wtwwww..
..wttttttttwttttttttw..
..wtwwtwwwtwtwwwtwwtw..
..wbtwtttttptttttwtbw..
..wwtwtwtwwwwwtwtwtww..
..wttttwtttwtttwttttw..
..wtwwwwwwtwtwwwwwwtw..
..wtttttttttttttttttw..
..wwwwwwwwwwwwwwwwwww..`,
  map`
.......................
.......................
..wwwwwwwwwwwwwwwwwww..
..w........w........w..
..w.ww.www.w.www.ww.w..
..w.................w..
..w.ww.w.wwwww.w.ww.w..
..w....w...w...w....w..
..wwww.www.w.www.wwww..
.....w.w.......w.w.....
.wwwww.w.wwmww.w.wwwww.
.........w.t.w.........
.wwwww.w.wwwww.w.wwwww.
.....w.w.......w.w.....
..wwww.w.wwwww.w.wwww..
..w........w........w..
..w.ww.www.w.www.ww.w..
..w..w...........w..w..
..ww.w.w.wwwww.w.w.ww..
..w....w...w...w....w..
..w.wwwwww.w.wwwwww.w..
..w.................w..
..wwwwwwwwwwwwwwwwwww..`,
];
addText("SCORE: ", {
  x: 0,
  y: 0,
  color: color`2`
})
let keyPressed = "w";
let ghostMode = 1;
let blinkyMode = "scatter";
let blinkyFace = "d";
let pinkyMode = "scatter";
let pinkyFace = "";
let inkyMode = "scatter";
let inkyFace = "";
let clydeMode = "scatter";
let clydeFace = "";
let blinkyeyesFace = "";
let pinkyeyesFace = "";
let inkyeyesFace = "";
let clydeeyesFace = "";

const moveForward = () => {
 
  if (keyPressed === "a" ){
    getFirst(player).x -= 1;
    eatFood();
  }
  else if (keyPressed === "d"){
    getFirst(player).x += 1;
    eatFood();
  }
  else if (keyPressed === "w"){
    getFirst(player).y -= 1;
    eatFood();
  }
  else if (keyPressed === "s"){
    getFirst(player).y += 1;
    eatFood();
  }
}
//blinky stuff
const blinkyAI = () =>{
  let blx = getFirst(blinky).x
  let bly = getFirst(blinky).y
  if (blx == 0){
    clearTile(blx, bly);
    addSprite(21, bly, blinky);
  } else if (blx == 22){
    clearTile(blx, bly);
    addSprite(1, bly, blinky);
  }
  let bx = 0;
  let by = 0;
  if (blinkyMode == "chase") {
    bx = getFirst(blinky).x - getFirst(player).x;
    by = getFirst(blinky).y - getFirst(player).y;
  } else if (blinkyMode == "scatter"){
    bx = getFirst(blinky).x - 19;
    by = getFirst(blinky).y - 3;
  } else if (blinkyMode == "scared"){
    bx = Math.random(2, 20);
    by = Math.random(2, 20);
  }
  let gw = (by-1)*(by-1) + (bx * bx);
  let ga = (bx-1)*(bx-1) + (by * by);
  let gs = (by+1)*(by+1) + (bx * bx);
  let gd = (bx+1)*(bx+1) + (by * by);
  if (getTile(getFirst(blinky).x, getFirst(blinky).y-1).length == 2 || blinkyFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(blinky).x-1, getFirst(blinky).y).length == 2 || blinkyFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(blinky).x, getFirst(blinky).y+1).length == 2 || blinkyFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(blinky).x+1, getFirst(blinky).y).length == 2 || blinkyFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(blinky).x, getFirst(blinky).y-1).length != 2) {
      blinkyFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(blinky).x-1, getFirst(blinky).y).length != 2) {
      blinkyFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(blinky).x, getFirst(blinky).y+1).length != 2) {
      blinkyFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(blinky).x+1, getFirst(blinky).y).length != 2) {
      blinkyFace ="d";    
    }
  }
}
const blinkyMove = () =>{
   if (blinkyFace === "w" ){
    getFirst(blinky).y -= 1;
    blinkyAI();
  }
  else if (blinkyFace === "a"){
    getFirst(blinky).x -= 1;
    blinkyAI();
  }
  else if (blinkyFace === "s"){
    getFirst(blinky).y += 1;
    blinkyAI();
  }
  else if (blinkyFace === "d"){
    getFirst(blinky).x += 1;
    blinkyAI();
  }
}
//pinky stuff
const pinkyAI = () =>{
  let plx = getFirst(pinky).x
  let ply = getFirst(pinky).y
  if (plx == 0){
    clearTile(plx, ply);
    addSprite(21, ply, pinky);
  } else if (plx == 22){
    clearTile(plx, ply);
    addSprite(1, ply, pinky);
  }
  let px = 0;
  let py = 0;
  if (pinkyMode == "chase") {
    if (keyPressed === "w"){
      px = (getFirst(pinky).x - getFirst(player).x - 2);
      py = (getFirst(pinky).y - getFirst(player).y - 2);
    } else if (keyPressed === "s"){
      px = (getFirst(pinky).x - getFirst(player).x);
      py = (getFirst(pinky).y - getFirst(player).y + 2);
    } else if (keyPressed === "a"){
      px = (getFirst(pinky).x - getFirst(player).x - 2);
      py = (getFirst(pinky).y - getFirst(player).y);
    } else if (keyPressed === "d"){
      px = (getFirst(pinky).x - getFirst(player).x + 2);
      py = (getFirst(pinky).y - getFirst(player).y);
    }
  } else if (pinkyMode == "scatter"){
    px = getFirst(pinky).x - 3;
    py = getFirst(pinky).y - 3;
  } else if (pinkyMode == "scared"){
    px = Math.random(2, 20);
    py = Math.random(2, 20);
  }
  let gw = (py-1)*(py-1) + (px * px);
  let ga = (px-1)*(px-1) + (py * py);
  let gs = (py+1)*(py+1) + (px * px);
  let gd = (px+1)*(px+1) + (py * py);
  if (getTile(getFirst(pinky).x, getFirst(pinky).y-1).length == 2 || pinkyFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(pinky).x-1, getFirst(pinky).y).length == 2 || pinkyFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(pinky).x, getFirst(pinky).y+1).length == 2 || pinkyFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(pinky).x+1, getFirst(pinky).y).length == 2 || pinkyFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(pinky).x, getFirst(pinky).y-1).length != 2) {
      pinkyFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(pinky).x-1, getFirst(pinky).y).length != 2) {
      pinkyFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(pinky).x, getFirst(pinky).y+1).length != 2) {
      pinkyFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(pinky).x+1, getFirst(pinky).y).length != 2) {
      pinkyFace ="d";    
    }
  }
}
const pinkyMove = () =>{
   if (pinkyFace === "w" ){
    getFirst(pinky).y -= 1;
    pinkyAI();
  }
  else if (pinkyFace === "a"){
    getFirst(pinky).x -= 1;
    pinkyAI();
  }
  else if (pinkyFace === "s"){
    getFirst(pinky).y += 1;
    pinkyAI();
  }
  else if (pinkyFace === "d"){
    getFirst(pinky).x += 1;
    pinkyAI();
  }
}
//inky
const inkyAI = () =>{
  let inx = getFirst(inky).x
  let iny = getFirst(inky).y
  if (inx == 0){
    clearTile(inx, iny);
    addSprite(21, iny, inky);
  } else if (inx == 22){
    clearTile(inx, iny);
    addSprite(1, iny, inky);
  }
  let tx = 0;
  let ty = 0;
  let ix = 0;
  let iy = 0;
  if (inkyMode == "chase") {
    if (keyPressed === "w"){
      tx = -(getFirst(blinky).x - getFirst(player).x - 1);
      ty = -(getFirst(blinky).y - getFirst(player).y - 1);
    } else if (keyPressed === "s"){
      tx = -(getFirst(blinky).x - getFirst(player).x);
      ty = -(getFirst(blinky).y - getFirst(player).y + 1);
    } else if (keyPressed === "a"){
      tx = -(getFirst(blinky).x - getFirst(player).x - 1);
      ty = -(getFirst(blinky).y - getFirst(player).y);
    } else if (keyPressed === "d"){
      tx = -(getFirst(blinky).x - getFirst(player).x + 1);
      ty = -(getFirst(blinky).y - getFirst(player).y);
    }
    ix = (getFirst(inky).x - tx);
    iy = (getFirst(inky).y - ty);
  } else if (inkyMode == "scatter"){
    ix = getFirst(inky).x - 19;
    iy = getFirst(inky).y - 21;
  } else if (inkyMode == "scared"){
    ix = Math.random(2, 20);
    iy = Math.random(2, 20);
  }
  let gw = (iy-1)*(iy-1) + (ix * ix);
  let ga = (ix-1)*(ix-1) + (iy * iy);
  let gs = (iy+1)*(iy+1) + (ix * ix);
  let gd = (ix+1)*(ix+1) + (iy * iy);
  if (getTile(getFirst(inky).x, getFirst(inky).y-1).length == 2 || inkyFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(inky).x-1, getFirst(inky).y).length == 2 || inkyFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(inky).x, getFirst(inky).y+1).length == 2 || inkyFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(inky).x+1, getFirst(inky).y).length == 2 || inkyFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(inky).x, getFirst(inky).y-1).length != 2) {
      inkyFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(inky).x-1, getFirst(inky).y).length != 2) {
      inkyFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(inky).x, getFirst(inky).y+1).length != 2) {
      inkyFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(inky).x+1, getFirst(inky).y).length != 2) {
      inkyFace ="d";    
    }
  }
}
const inkyMove = () =>{
   if (inkyFace === "w" ){
    getFirst(inky).y -= 1;
    inkyAI();
  }
  else if (inkyFace === "a"){
    getFirst(inky).x -= 1;
    inkyAI();
  }
  else if (inkyFace === "s"){
    getFirst(inky).y += 1;
    inkyAI();
  }
  else if (inkyFace === "d"){
    getFirst(inky).x += 1;
    inkyAI();
  }
}
//clyde stuff
const clydeAI = () =>{
  if (ghostMode = 2 && clydeMode != "scared") {
    clydeMode = "chase";
  }
  let clx = getFirst(clyde).x
  let cly = getFirst(clyde).y
  if (clx == 0){
    clearTile(clx, cly);
    addSprite(21, cly, clyde);
  } else if (clx == 22){
    clearTile(clx, cly);
    addSprite(1, cly, clyde);
  }
  let cx = 0;
  let cy = 0;
  if (clydeMode == "chase") {
    cx = getFirst(clyde).x - getFirst(player).x;
    cy = getFirst(clyde).y - getFirst(player).y;
    if(cx >= -4 && cx <= 4 && cy >= -4 && cy <= 4){
      clydeMode = "scatter";
    }
  }
  if (clydeMode == "scatter"){
    cx = getFirst(clyde).x - 3;
    cy = getFirst(clyde).y - 21;
  } else if (clydeMode == "scared"){
    cx = Math.random(2, 20);
    cy = Math.random(2, 20);
  }
  let gw = (cy-1)*(cy-1) + (cx * cx);
  let ga = (cx-1)*(cx-1) + (cy * cy);
  let gs = (cy+1)*(cy+1) + (cx * cx);
  let gd = (cx+1)*(cx+1) + (cy * cy);
  if (getTile(getFirst(clyde).x, getFirst(clyde).y-1).length == 2 || clydeFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(clyde).x-1, getFirst(clyde).y).length == 2 || clydeFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(clyde).x, getFirst(clyde).y+1).length == 2 || clydeFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(clyde).x+1, getFirst(clyde).y).length == 2 || clydeFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(clyde).x, getFirst(clyde).y-1).length != 2) {
      clydeFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(clyde).x-1, getFirst(clyde).y).length != 2) {
      clydeFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(clyde).x, getFirst(clyde).y+1).length != 2) {
      clydeFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(clyde).x+1, getFirst(clyde).y).length != 2) {
      clydeFace ="d";    
    }
  }
}
const clydeMove = () =>{
   if (clydeFace === "w" ){
    getFirst(clyde).y -= 1;
    clydeAI();
  }
  else if (clydeFace === "a"){
    getFirst(clyde).x -= 1;
    clydeAI();
  }
  else if (clydeFace === "s"){
    getFirst(clyde).y += 1;
    clydeAI();
  }
  else if (clydeFace === "d"){
    getFirst(clyde).x += 1;
    clydeAI();
  }
}
//ghost eyes
const blinkyeyesAI = () =>{
  let blx = getFirst(blinkyeyes).x
  let bly = getFirst(blinkyeyes).y
  if (blx == 0){
    clearTile(blx, bly);
    addSprite(21, bly, blinkyeyes);
  } else if (blx == 22){
    clearTile(blx, bly);
    addSprite(1, bly, blinkyeye);
  }
  let bx = getFirst(blinkyeyes).x - 11;
  let by = getFirst(blinkyeyes).y - 11;
  let gw = (by-1)*(by-1) + (bx * bx);
  let ga = (bx-1)*(bx-1) + (by * by);
  let gs = (by+1)*(by+1) + (bx * bx);
  let gd = (bx+1)*(bx+1) + (by * by);
  if (getTile(getFirst(blinkyeyes).x, getFirst(blinkyeyes).y-1).length == 2 || blinkyeyesFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(blinkyeyes).x-1, getFirst(blinkyeyes).y).length == 2 || blinkyeyesFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(blinkyeyes).x, getFirst(blinkyeyes).y+1).length == 2 || blinkyeyesFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(blinkyeyes).x+1, getFirst(blinkyeyes).y).length == 2 || blinkyeyesFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(blinkyeyes).x, getFirst(blinkyeyes).y-1).length != 2) {
      blinkyeyesFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(blinkyeyes).x-1, getFirst(blinkyeyes).y).length != 2) {
      blinkyeyesFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(blinkyeyes).x, getFirst(blinkyeyes).y+1).length != 2) {
      blinkyeyesFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(blinkyeyes).x+1, getFirst(blinkyeyes).y).length != 2) {
      blinkyeyesFace ="d";    
    }
  }
  if(blx == 11 && bly == 9){
    blinkyeyesFace ="s";
  }
  if( blx == 11 && bly == 11){
    clearTile(blx, bly);
    addSprite(11, 9, blinky);
    blinkyeyesFace ="";
    blinkyAI();
  }
}
const blinkyeyesMove = () =>{
   if (blinkyeyesFace === "w" ){
    getFirst(blinkyeyes).y -= 1;
    blinkyeyesAI();
  }
  else if (blinkyeyesFace === "a"){
    getFirst(blinkyeyes).x -= 1;
    blinkyeyesAI();
  }
  else if (blinkyeyesFace === "s"){
    getFirst(blinkyeyes).y += 1;
    blinkyeyesAI();
  }
  else if (blinkyeyesFace === "d"){
    getFirst(blinkyeyes).x += 1;
    blinkyeyesAI();
  }
}
const pinkyeyesAI = () =>{
  let blx = getFirst(pinkyeyes).x
  let bly = getFirst(pinkyeyes).y
  if (blx == 0){
    clearTile(blx, bly);
    addSprite(21, bly, pinkyeyes);
  } else if (blx == 22){
    clearTile(blx, bly);
    addSprite(1, bly, pinkyeye);
  }
  let bx = getFirst(pinkyeyes).x - 11;
  let by = getFirst(pinkyeyes).y - 11;
  let gw = (by-1)*(by-1) + (bx * bx);
  let ga = (bx-1)*(bx-1) + (by * by);
  let gs = (by+1)*(by+1) + (bx * bx);
  let gd = (bx+1)*(bx+1) + (by * by);
  if (getTile(getFirst(pinkyeyes).x, getFirst(pinkyeyes).y-1).length == 2 || pinkyeyesFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(pinkyeyes).x-1, getFirst(pinkyeyes).y).length == 2 || pinkyeyesFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(pinkyeyes).x, getFirst(pinkyeyes).y+1).length == 2 || pinkyeyesFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(pinkyeyes).x+1, getFirst(pinkyeyes).y).length == 2 || pinkyeyesFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(pinkyeyes).x, getFirst(pinkyeyes).y-1).length != 2) {
      pinkyeyesFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(pinkyeyes).x-1, getFirst(pinkyeyes).y).length != 2) {
      pinkyeyesFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(pinkyeyes).x, getFirst(pinkyeyes).y+1).length != 2) {
      pinkyeyesFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(pinkyeyes).x+1, getFirst(pinkyeyes).y).length != 2) {
      pinkyeyesFace ="d";    
    }
  }
  if(blx == 11 && bly == 9){
    pinkyeyesFace ="s";
  }
  if(blx == 11 && bly == 11){
    clearTile(blx, bly);
    addSprite(11, 9, pinky);
    pinkyeyesFace ="";
    pinkyAI();
  }
}
const pinkyeyesMove = () =>{
   if (pinkyeyesFace === "w" ){
    getFirst(pinkyeyes).y -= 1;
    pinkyeyesAI();
  }
  else if (pinkyeyesFace === "a"){
    getFirst(pinkyeyes).x -= 1;
    pinkyeyesAI();
  }
  else if (pinkyeyesFace === "s"){
    getFirst(pinkyeyes).y += 1;
    pinkyeyesAI();
  }
  else if (pinkyeyesFace === "d"){
    getFirst(pinkyeyes).x += 1;
    pinkyeyesAI();
  }
}
const inkyeyesAI = () =>{
  let blx = getFirst(inkyeyes).x
  let bly = getFirst(inkyeyes).y
  if (blx == 0){
    clearTile(blx, bly);
    addSprite(21, bly, inkyeyes);
  } else if (blx == 22){
    clearTile(blx, bly);
    addSprite(1, bly,inkyeye);
  }
  let bx = getFirst(inkyeyes).x - 11;
  let by = getFirst(inkyeyes).y - 11;
  let gw = (by-1)*(by-1) + (bx * bx);
  let ga = (bx-1)*(bx-1) + (by * by);
  let gs = (by+1)*(by+1) + (bx * bx);
  let gd = (bx+1)*(bx+1) + (by * by);
  if (getTile(getFirst(inkyeyes).x, getFirst(inkyeyes).y-1).length == 2 || inkyeyesFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(inkyeyes).x-1, getFirst(inkyeyes).y).length == 2 || inkyeyesFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(inkyeyes).x, getFirst(inkyeyes).y+1).length == 2 || inkyeyesFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(inkyeyes).x+1, getFirst(inkyeyes).y).length == 2 || inkyeyesFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(inkyeyes).x, getFirst(inkyeyes).y-1).length != 2) {
      inkyeyesFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(inkyeyes).x-1, getFirst(inkyeyes).y).length != 2) {
      inkyeyesFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(inkyeyes).x, getFirst(inkyeyes).y+1).length != 2) {
      inkyeyesFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(inkyeyes).x+1, getFirst(inkyeyes).y).length != 2) {
      inkyeyesFace ="d";    
    }
  }
  if(blx == 11 && bly == 9){
    inkyeyesFace ="s";
  }
  if(blx == 11 && bly == 11){
    clearTile(blx, bly);
    addSprite(11, 9, inky);
    inkyeyesFace ="";
    inkyAI();
  }
}
const inkyeyesMove = () =>{
   if (inkyeyesFace === "w" ){
    getFirst(inkyeyes).y -= 1;
    inkyeyesAI();
  }
  else if (inkyeyesFace === "a"){
    getFirst(inkyeyes).x -= 1;
    inkyeyesAI();
  }
  else if (inkyeyesFace === "s"){
    getFirst(inkyeyes).y += 1;
    inkyeyesAI();
  }
  else if (inkyeyesFace === "d"){
    getFirst(inkyeyes).x += 1;
    inkyeyesAI();
  }
}
const clydeeyesAI = () =>{
  let blx = getFirst(clydeeyes).x
  let bly = getFirst(clydeeyes).y
  if (blx == 0){
    clearTile(blx, bly);
    addSprite(21, bly, clydeeyes);
  } else if (blx == 22){
    clearTile(blx, bly);
    addSprite(1, bly, clydeeye);
  }
  let bx = getFirst(clydeeyes).x - 11;
  let by = getFirst(clydeeyes).y - 11;
  let gw = (by-1)*(by-1) + (bx * bx);
  let ga = (bx-1)*(bx-1) + (by * by);
  let gs = (by+1)*(by+1) + (bx * bx);
  let gd = (bx+1)*(bx+1) + (by * by);
  if (getTile(getFirst(clydeeyes).x, getFirst(clydeeyes).y-1).length == 2 || clydeeyesFace == "s") {
    gw = 999;
  }
  if (getTile(getFirst(clydeeyes).x-1, getFirst(clydeeyes).y).length == 2 || clydeeyesFace == "d") {
    ga = 999;
  }
  if (getTile(getFirst(clydeeyes).x, getFirst(clydeeyes).y+1).length == 2 || clydeeyesFace == "w") {
    gs = 999;
  }
  if (getTile(getFirst(clydeeyes).x+1, getFirst(clydeeyes).y).length == 2 || clydeeyesFace == "a") {
    gd = 999;
  }
  if (gw <= ga && gw <= gs && gw <= gd){
    if (getTile(getFirst(clydeeyes).x, getFirst(clydeeyes).y-1).length != 2) {
      clydeeyesFace ="w";
    }
  } else if (ga <= gw && ga <= gs && ga <= gd) {
    if (getTile(getFirst(clydeeyes).x-1, getFirst(clydeeyes).y).length != 2) {
      clydeeyesFace ="a";
    }
  } else if (gs <= gw && gs <= ga && gs <= gd) {
    if (getTile(getFirst(clydeeyes).x, getFirst(clydeeyes).y+1).length != 2) {
      clydeeyesFace ="s";
    }
  } else if (gd <= gw && gd <= gs && gd <= ga) {
    if (getTile(getFirst(clydeeyes).x+1, getFirst(clydeeyes).y).length != 2) {
      clydeeyesFace ="d";    
    }
  }
  if(blx == 11 && bly == 9){
    clydeeyesFace ="s";
  }
  if(blx == 11 && bly == 11){
    clearTile(blx, bly);
    addSprite(11, 9, clyde);
    clydeeyesFace ="";
    clydeAI();
  }
}
const clydeeyesMove = () =>{
   if (clydeeyesFace === "w" ){
    getFirst(clydeeyes).y -= 1;
    clydeeyesAI();
  }
  else if (clydeeyesFace === "a"){
    getFirst(clydeeyes).x -= 1;
    clydeeyesAI();
  }
  else if (clydeeyesFace === "s"){
    getFirst(clydeeyes).y += 1;
    clydeeyesAI();
  }
  else if (clydeeyesFace === "d"){
    getFirst(clydeeyes).x += 1;
    clydeeyesAI();
  }
}

onInput("s", () => {
  if (getTile(getFirst(player).x, getFirst(player).y+1).length != 2){
    keyPressed = "s";
  }
});
onInput("w", () => {
  if (getTile(getFirst(player).x, getFirst(player).y-1).length != 2){
    keyPressed = "w";
  }
});
onInput("a", () => {
  if (getTile(getFirst(player).x-1, getFirst(player).y).length != 2) {
    keyPressed = "a";
  }
});
onInput("d", () => {
  if (getTile(getFirst(player).x+1, getFirst(player).y).length != 2) {
    keyPressed = "d";
  }
});
const eatFood = () => {
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  if ((tilesWith(player, blinky).length != 0) && blinkyMode === "scared"){
    blinkyFace = "";
    clearTile(px, py);
    addSprite(px, py, player);
    addSprite(px, py, blinkyeyes);
    blinkyeyesAI();
    score += 200;
    addText(score.toString(), { x: 6, y: 0, color: color`2` });
  } else if (tilesWith(player, blinky).length != 0){
    if (lives > 0) {
      Continuegame()
    } else {
    Gameover();
    }
  } else if ((tilesWith(player, pinky).length != 0) && pinkyMode === "scared"){
    pinkyFace = "";
    clearTile(px, py);
    addSprite(px, py, player);
    addSprite(px, py, pinkyeyes);
    pinkyeyesAI();
    score += 200
    addText(score.toString(), { x: 6, y: 0, color: color`2` });
  } else if (tilesWith(player, pinky).length != 0){
    if (lives > 0) {
      Continuegame()
    } else {
    Gameover();
    }
  } else if ((tilesWith(player, inky).length != 0) && inkyMode === "scared"){
    inkyFace = "";
    clearTile(px, py);
    addSprite(px, py, player);
    addSprite(px, py, inkyeyes);
    inkyeyesAI();
    score += 200
    addText(score.toString(), { x: 6, y: 0, color: color`2` });
  } else if (tilesWith(player, inky).length != 0){
    if (lives > 0) {
      Continuegame()
    } else {
    Gameover();
    }
  } else if ((tilesWith(player, clyde).length != 0) && clydeMode === "scared"){
    clydeFace = "";
    clearTile(px, py);
    addSprite(px, py, player);
    addSprite(px, py, clydeeyes);
    clydeeyesAI();
    score += 200
    addText(score.toString(), { x: 6, y: 0, color: color`2` });
  } else if (tilesWith(player, clyde).length != 0){
    if (lives > 0) {
      Continuegame()
    } else {
    Gameover();
    }
  } else if (tilesWith(player, power).length != 0){
    clearTile(px, py);
    addSprite(px, py, player);
    score += 50
    setLegend(
      [ player, bitmap`
......66666.....
....666666666...
...66666666666..
..666666666666..
..666666666666..
.66666666666....
.66666666.......
.666666.........
.66666666.......
.66666666666....
..666666666666..
..666666666666..
...66666666666..
....666666666...
......66666.....
................`],
      [ blinky, bitmap `
................
.....55555......
....55555555....
...5555555555...
..55555555555...
..555115511555..
..555115511555..
.55555555555555.
.55555555555555.
.55555555555555.
.55115511551155.
.51551155115515.
.55555555555555.
.55555555555555.
.55.555..555.55.
.5...55..55...5.`],
      [ inky, bitmap `
................
.....55555......
....55555555....
...5555555555...
..55555555555...
..555115511555..
..555115511555..
.55555555555555.
.55555555555555.
.55555555555555.
.55115511551155.
.51551155115515.
.55555555555555.
.55555555555555.
.55.555..555.55.
.5...55..55...5.`],
      [ pinky, bitmap `
................
.....55555......
....55555555....
...5555555555...
..55555555555...
..555115511555..
..555115511555..
.55555555555555.
.55555555555555.
.55555555555555.
.55115511551155.
.51551155115515.
.55555555555555.
.55555555555555.
.55.555..555.55.
.5...55..55...5.`],
      [ clyde, bitmap `
................
.....55555......
....55555555....
...5555555555...
..55555555555...
..555115511555..
..555115511555..
.55555555555555.
.55555555555555.
.55555555555555.
.55115511551155.
.51551155115515.
.55555555555555.
.55555555555555.
.55.555..555.55.
.5...55..55...5.`],
      [ blinkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....2255..2255..
....2255..2255..
.....22....22...
................
................
................
................
................
................
................`],
      [ inkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....5522..5522..
....5522..5522..
.....22....22...
................
................
................
................
................
................
................`],
      [ pinkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....2222..2222..
....2552..2552..
.....55....55...
................
................
................
................
................
................
................`],
      [ clydeeyes, bitmap `
................
................
................
................
.....55....55...
....2552..2552..
....2222..2222..
....2222..2222..
.....22....22...
................
................
................
................
................
................
................`],
      [ power, bitmap`
................
....2222222.....
...222222222....
..22222222222...
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
..22222222222...
...222222222....
....2222222.....
................`],
      [ wall, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
      [ dot, bitmap`
................
................
................
................
................
......2222......
.....222222.....
.....222222.....
.....222222.....
.....222222.....
......2222......
................
................
................
................
................`],
      [ background, bitmap`
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
      [ ghostwall, bitmap `
................
................
................
................
................
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
................
................
................
................
................`],
    );
    clearInterval(forwardinky);
    clearInterval(forwardPinky);
    clearInterval(forwardBlinky);
    clearInterval(forwardClyde);
    forwardinky = setInterval(inkyMove, 420);
    forwardPinky = setInterval(pinkyMove, 420);
    forwardBlinky = setInterval(blinkyMove, 420);
    forwardClyde = setInterval(clydeMove, 420);
    blinkyMode = "scared";
    pinkyMode = "scared";
    inkyMode = "scared";
    clydeMode = "scared";
    setTimeout(scaredChange, 7000);
  addText(score.toString(), { x: 6, y: 0, color: color`2` });
  } else if (tilesWith(player, dot).length != 0){
    clearTile(px, py);
    addSprite(px, py, player);
    score += 10
    addText(score.toString(), { x: 6, y: 0, color: color`2` });
  }
  if (px == 0){
    clearTile(px, py);
    addSprite(21, py, player);
  } else if (px == 22){
    clearTile(px, py);
    addSprite(1, py, player);
  }
  if (tilesWith(dot).length == 0 && tilesWith(power).length == 0) {
    Startgame();
    /*
    setMap(levels[1]);
    clearTimeout(pinkstart);
    clearTimeout(inkystart);
    clearTimeout(clydestart);
    keyPressed = "";
    blinkyMode ="";
    blinkyFace = "";
    pinkyMode = "";
    pinkyFace = "";
    inkyMode = "";
    inkyFace = "";
    clydeMode = "";
    clydeFace = "";
    blinkyeyesFace = "";
    pinkyeyesFace = "";
    inkyeyesFace = "";
    clydeeyesFace = "";
    addText("YOU WIN", { x: 7, y: 9, color: color`3`})
    */
  }
}
const scaredChange = () => {
  setLegend(
  [ player, bitmap`
......66666.....
....666666666...
...66666666666..
..666666666666..
..666666666666..
.66666666666....
.66666666.......
.666666.........
.66666666.......
.66666666666....
..666666666666..
..666666666666..
...66666666666..
....666666666...
......66666.....
................`],
  [ blinky, bitmap `
................
.....33333......
....33333333....
...3333333333...
..33322333322...
..332222332222..
..332255332255..
.33322553322553.
.33332233332233.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33.333..333.33.
.3...33..33...3.`],
  [ inky, bitmap `
................
.....77777......
....77777777....
...7777777777...
..77722777722...
..772222772222..
..775522775522..
.77755227755227.
.77772277772277.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77.777..777.77.
.7...77..77...7.`],
  [ pinky, bitmap `
................
.....88888......
....88888888....
...8888888888...
..88822888822...
..882222882222..
..882222882222..
.88825528825528.
.88885588885588.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88.888..888.88.
.8...88..88...8.`],
  [ clyde, bitmap `
................
.....99999......
....99999999....
...9999999999...
..99955999955...
..992552992552..
..992222992222..
.99922229922229.
.99992299992299.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99.999..999.99.
.9...99..99...9.`],
  [ blinkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....2255..2255..
....2255..2255..
.....22....22...
................
................
................
................
................
................
................`],
  [ inkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....5522..5522..
....5522..5522..
.....22....22...
................
................
................
................
................
................
................`],
  [ pinkyeyes, bitmap `
................
................
................
................
.....22....22...
....2222..2222..
....2222..2222..
....2552..2552..
.....55....55...
................
................
................
................
................
................
................`],
  [ clydeeyes, bitmap `
................
................
................
................
.....55....55...
....2552..2552..
....2222..2222..
....2222..2222..
.....22....22...
................
................
................
................
................
................
................`],
  [ power, bitmap`
................
....2222222.....
...222222222....
..22222222222...
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
.2222222222222..
..22222222222...
...222222222....
....2222222.....
................`],
  [ wall, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ dot, bitmap`
................
................
................
................
................
......2222......
.....222222.....
.....222222.....
.....222222.....
.....222222.....
......2222......
................
................
................
................
................`],
  [ background, bitmap`
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
  [ ghostwall, bitmap `
................
................
................
................
................
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
................
................
................
................
................`],
);
  clearInterval(forwardinky);
  clearInterval(forwardPinky);
  clearInterval(forwardBlinky);
  clearInterval(forwardClyde);
  forwardinky = setInterval(inkyMove, 220);
  forwardPinky = setInterval(pinkyMove, 220);
  forwardBlinky = setInterval(blinkyMove, 220);
  forwardClyde = setInterval(clydeMove, 220);
  if (ghostMode = 1){
    blinkyMode = "scatter";
    pinkyMode = "scatter";
    inkyMode = "scatter";
    clydeMode = "scatter";
  } else if (ghostMode = 2) {
    blinkyMode = "chase";
    pinkyMode = "chase";
    inkyMode = "chase";
    clydeMode = "chase";
  }
}
const scatterChange = () => {
  if (blinkyMode != "scared"){
    if (blinkyFace === "w" && (getTile(getFirst(blinky).x, getFirst(blinky).y+1).length != 2)){
      blinkyFace = "s"
    } else if (blinkyFace === "s" && (getTile(getFirst(blinky).x, getFirst(blinky).y-1).length != 2)){
      blinkyFace = "w"
    } else if (blinkyFace === "a" && (getTile(getFirst(blinky).x+1, getFirst(blinky).y).length != 2)){
      blinkyFace = "d"
    } else if (blinkyFace === "d" && (getTile(getFirst(blinky).x-1, getFirst(blinky).y).length != 2)){
      blinkyFace = "a"
    }
    if (tilesWith(dot).length + tilesWith(power).length > 15) {
      blinkyMode = "scatter";  
    }
  }
  if (pinkyMode != "scared"){
    if (pinkyFace === "w" && (getTile(getFirst(pinky).x, getFirst(pinky).y+1).length != 2)){
      pinkyFace = "s"
    } else if (pinkyFace === "s" && (getTile(getFirst(pinky).x, getFirst(pinky).y-1).length != 2)){
      pinkyFace = "w"
    } else if (pinkyFace === "a" && (getTile(getFirst(pinky).x+1, getFirst(pinky).y).length != 2)){
      pinkyFace = "d"
    } else if (pinkyFace === "d" && (getTile(getFirst(pinky).x-1, getFirst(pinky).y).length != 2)){
      pinkyFace = "a"
    }
    pinkyMode = "scatter";  
  }
  if (inkyMode != "scared"){
    if (inkyFace === "w" && (getTile(getFirst(inky).x, getFirst(inky).y+1).length != 2)){
      inkyFace = "s"
    } else if (inkyFace === "s" && (getTile(getFirst(inky).x, getFirst(inky).y-1).length != 2)){
      inkyFace = "w"
    } else if (inkyFace === "a" && (getTile(getFirst(inky).x+1, getFirst(inky).y).length != 2)){
      inkyFace = "d"
    } else if (inkyFace === "d" && (getTile(getFirst(inky).x-1, getFirst(inky).y).length != 2)){
      inkyFace = "a"
    }
    inkyMode = "scatter";  
  }
  if (clydeMode != "scared"){
        if (clydeFace === "w" && (getTile(getFirst(clyde).x, getFirst(clyde).y+1).length != 2)){
      clydeFace = "s"
    } else if (clydeFace === "s" && (getTile(getFirst(clyde).x, getFirst(clyde).y-1).length != 2)){
      clydeFace = "w"
    } else if (clydeFace === "a" && (getTile(getFirst(clyde).x+1, getFirst(clyde).y).length != 2)){
      clydeFace = "d"
    } else if (clydeFace === "d" && (getTile(getFirst(clyde).x-1, getFirst(clyde).y).length != 2)){
      clydeFace = "a"
    }
    clydeMode = "scatter";  
  }
  setTimeout(chaseChange, 7000);
  ghostMode = 1;
}
const chaseChange = () =>{
  if (blinkyMode != "scared"){
    if (blinkyFace === "w" && (getTile(getFirst(blinky).x, getFirst(blinky).y+1).length != 2)){
      blinkyFace = "s"
    } else if (blinkyFace === "s" && (getTile(getFirst(blinky).x, getFirst(blinky).y-1).length != 2)){
      blinkyFace = "w"
    } else if (blinkyFace === "a" && (getTile(getFirst(blinky).x+1, getFirst(blinky).y).length != 2)){
      blinkyFace = "d"
    } else if (blinkyFace === "d" && (getTile(getFirst(blinky).x-1, getFirst(blinky).y).length != 2)){
      blinkyFace = "a"
    }
    blinkyMode = "chase";
  }
  if (pinkyMode != "scared"){
    if (pinkyFace === "w" && (getTile(getFirst(pinky).x, getFirst(pinky).y+1).length != 2)){
      pinkyFace = "s"
    } else if (pinkyFace === "s" && (getTile(getFirst(pinky).x, getFirst(pinky).y-1).length != 2)){
      pinkyFace = "w"
    } else if (pinkyFace === "a" && (getTile(getFirst(pinky).x+1, getFirst(pinky).y).length != 2)){
      pinkyFace = "d"
    } else if (pinkyFace === "d" && (getTile(getFirst(pinky).x-1, getFirst(pinky).y).length != 2)){
      pinkyFace = "a"
    }
    pinkyMode = "chase";  
  }
  if (inkyMode != "scared"){
    if (inkyFace === "w" && (getTile(getFirst(inky).x, getFirst(inky).y+1).length != 2)){
      inkyFace = "s"
    } else if (inkyFace === "s" && (getTile(getFirst(inky).x, getFirst(inky).y-1).length != 2)){
      inkyFace = "w"
    } else if (inkyFace === "a" && (getTile(getFirst(inky).x+1, getFirst(inky).y).length != 2)){
      inkyFace = "d"
    } else if (inkyFace === "d" && (getTile(getFirst(inky).x-1, getFirst(inky).y).length != 2)){
      inkyFace = "a"
    }
    inkyMode = "chase";  
  }
  if (clydeMode != "scared"){
    if (clydeFace === "w" && (getTile(getFirst(clyde).x, getFirst(clyde).y+1).length != 2)){
      clydeFace = "s"
    } else if (clydeFace === "s" && (getTile(getFirst(clyde).x, getFirst(clyde).y-1).length != 2)){
      clydeFace = "w"
    } else if (clydeFace === "a" && (getTile(getFirst(clyde).x+1, getFirst(clyde).y).length != 2)){
      clydeFace = "d"
    } else if (clydeFace === "d" && (getTile(getFirst(clyde).x-1, getFirst(clyde).y).length != 2)){
      clydeFace = "a"
    }
    clydeMode = "chase";  
  }
  setTimeout(scatterChange, 20000);
  ghostMode = 2;
}
const pinkyStart = () =>{
  pinkyFace = "w";
}
const inkyStart = () =>{
  clearTile(10,11);
  addSprite(11,11,inky);
  inkyFace = "w";
}
const clydeStart = () =>{
  clearTile(12,11);
  addSprite(11,11,clyde);
  clydeFace = "w";
}
const Gameover = () =>{  
  setMap(levels[1]);
  clearTimeout(pinkstart);
  clearTimeout(inkystart);
  clearTimeout(clydestart);
  keyPressed = "";
  blinkyMode ="";
  blinkyFace = "";
  pinkyMode = "";
  pinkyFace = "";
  inkyMode = "";
  inkyFace = "";
  clydeMode = "";
  clydeFace = "";
  blinkyeyesFace = "";
  pinkyeyesFace = "";
  inkyeyesFace = "";
  clydeeyesFace = "";
  addText("GAME OVER", { x: 6, y: 9, color: color`3`});
}
let forwardinky = setInterval(inkyMove, 220);
let forwardPinky = setInterval(pinkyMove, 220);
let forwardBlinky = setInterval(blinkyMove, 220);
let forwardClyde = setInterval(clydeMove, 220);
let forwardBlinkyeyes = setInterval(blinkyeyesMove, 100);
let forwardPinkyeyes = setInterval(pinkyeyesMove, 100);
let forwardinkyeyes = setInterval(inkyeyesMove, 100);
let forwardClydeeyes = setInterval(clydeeyesMove, 100);
let pinkstart = setTimeout(pinkyStart, 1000);
let inkystart = setTimeout(inkyStart, 6000);
let clydestart = setTimeout(clydeStart, 12000);
setInterval(moveForward, 200);
const Startgame = () =>{
  addText("Lives:", { x: 11, y: 0, color: color`2` });
  addText(lives.toString(), { x: 17, y: 0, color: color`2` });
  clearTimeout(pinkstart);
  clearTimeout(inkystart);
  clearTimeout(clydestart);
  setMap(levels[0]);
  for (let i = 0; i < 203; ++i){
    let wx = getAll(wall)[i].x;
    let wy = getAll(wall)[i].y;
    addSprite(wx, wy, wall);
  }
  addSprite(getFirst(ghostwall).x, getFirst(ghostwall).y, ghostwall);
  setTimeout(chaseChange, 7000);
  pinkstart = setTimeout(pinkyStart, 1000);
  inkystart = setTimeout(inkyStart, 6000);
  clydestart = setTimeout(clydeStart, 12000);
  keyPressed = "w";
  ghostMode = 1;
  blinkyMode = "scatter";
  blinkyFace = "d";
  pinkyMode = "scatter";
  pinkyFace = "";
  inkyMode = "scatter";
  inkyFace = "";
  clydeMode = "scatter";
  clydeFace = "";
  blinkyeyesFace = "";
  pinkyeyesFace = "";
  inkyeyesFace = "";
  clydeeyesFace = "";
}
const Continuegame = () =>{
  lives -=1;
  addText(lives.toString(), { x: 17, y: 0, color: color`2` });
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  let bx = getFirst(blinky).x;
  let by = getFirst(blinky).y;
  let ix = getFirst(inky).x;
  let iy = getFirst(inky).y;
  let pix = getFirst(pinky).x;
  let piy = getFirst(pinky).y;
  let cx = getFirst(clyde).x;
  let cy = getFirst(clyde).y;
  clearTile(bx,by);
  clearTile(pix,piy);
  clearTile(ix,iy);
  clearTile(cx,cy);
  clearTile(px,py);
  addSprite(11, 17, player);
  addSprite(11, 9, blinky);
  addSprite(11, 11, pinky);
  addSprite(10, 11, inky);
  addSprite(12, 11, clyde);
  clearTimeout(pinkstart);
  clearTimeout(inkystart);
  clearTimeout(clydestart);
  setTimeout(chaseChange, 7000);
  pinkstart = setTimeout(pinkyStart, 1000);
  inkystart = setTimeout(inkyStart, 6000);
  clydestart = setTimeout(clydeStart, 12000);
  keyPressed = "w";
  ghostMode = 1;
  blinkyMode = "scatter";
  blinkyFace = "d";
  pinkyMode = "scatter";
  pinkyFace = "";
  inkyMode = "scatter";
  inkyFace = "";
  clydeMode = "scatter";
  clydeFace = "";
  blinkyeyesFace = "";
  pinkyeyesFace = "";
  inkyeyesFace = "";
  clydeeyesFace = "";
}
Startgame();
