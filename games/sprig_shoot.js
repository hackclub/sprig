/*
@title: sprig_shoot
@author: Holden L
@tags: ['endless']
@addedOn: 2023-02-11
*/

/*
Shoot the enemies, not the bomb!
Shooting an enemy results in +1 points.
Letting an enemy get past you results in -1 points.
Shooting a bomb results in a GAME OVER.
*/

const player = "p";
const bullet = "b";
const enemy = "e";
const wall = "w";
const bomb = "x";

const pointsup = tune`
100: c5^100,
100: g5^100,
3000`;
const pointsdown = tune`
100: g4^100,
100: c4^100,
3000`;


const maxAmmo = 25;
let ammo = maxAmmo;

let points = 0;

let gameState = "gaming";

addText(ammo + "/" + maxAmmo,{x:0,y:0,color:color`0`})

setLegend(
  [ bomb, bitmap`
..........33....
.........693....
........C96.....
........CC......
.......CC.......
.......CC.......
.....000000.....
....00000000....
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
....00000000....
.....000000.....`],
  [ player, bitmap`
.00000000.......
0........0......
0...0..0.0......
0........0......
0...0000.0......
0........0......
.00000000.......
..0....0....0000
.00....000000...
.00....0....0...
.00....0........
.00....0........
..000000........
..0....0........
..0....0........
..0....0........`],
  [ bullet, bitmap`
................
................
................
................
................
................
................
.......00.......
.......00.......
................
................
................
................
................
................
................`],
  [ enemy, bitmap`
0000000000000000
0222222222222220
0222022222202220
0222202222022220
0222220220222220
0222022002202220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222200000022220
0222222222222220
0222222222222220
0000000000000000`],
);

setSolids([]);

let level = 0;
const levels = [
  map`
.......e..
......e...
.....e....
p.....e...
.......e..
......e..x
.....e....
....e.....`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

onInput("w", () => {
  if (gameState === "gaming") {
    getFirst(player).y -= 1;
  }
});
onInput("s", () => {
  if (gameState === "gaming") {
    getFirst(player).y += 1;
  }
});
onInput("j", () => {
  if (gameState === "gaming") {
    if (ammo > 0) {
      addSprite(getFirst(player).x,getFirst(player).y,bullet);
      ammo--;
    }
  }
  
});
onInput("k", () => {
  if (gameState === "not gaming") {
    gameState = "gaming";
    setMap(levels[level]);
    ammo = maxAmmo;
    points = 0;
  }
});



afterInput(() => {
});


setInterval(function () {
  if (gameState === "gaming") {
    let bullets = getAll(bullet);
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].x == 9) {
        bullets[i].remove()
      }
      bullets[i].x++;
    }
    for (let i = 0; i < tilesWith(bullet,enemy).length; i++) {
      clearTile(tilesWith(bullet,enemy)[0][i].x, tilesWith(bullet,enemy)[0][i].y);
      addSprite(9, Math.floor(Math.random() * 8), enemy)
      points++;
      playTune(pointsup);
    }
    if (tilesWith(bullet,bomb).length > 0) {
      let all = getAll();
      for (let i = 0; i < all.length; i++) {
        all[i].remove();
        clearText();
        gameState = "not gaming";
      }
    }
    
    clearText()
    if (gameState === "gaming") {
      addText(ammo + "/" + maxAmmo,{x:0,y:0,color:color`0`})
      addText(points.toString(), {x:16,y:0,color:color`0`})
      
    }
  }
  if (gameState === "not gaming") {
    addText("GAME OVER\nPRESS K TO RESTART\n\nYOU HAD " + points + " POINTS",{x:1,y:5,color:color`0`})
    
  }
}, 25)

setInterval(function () {
  if (ammo < maxAmmo && gameState === "gaming") {
    ammo++;
  }
}, 1000)
setInterval(function () {
  if (gameState === "gaming") {
    for (let i = 0; i < getAll(enemy).length; i++) {
      if (getAll(enemy)[i].x == 0) {
        getAll(enemy)[i].x = 9;
        getAll(enemy)[i].y = Math.floor(Math.random() * 8);
        points--;
        playTune(pointsdown);
      }
      getAll(enemy)[i].x--;
    }
    if (getAll(enemy).length < 8) {
      addSprite(9, Math.floor(Math.random() * 8), enemy);
    }
    let bombobj = getFirst(bomb)
    if (bombobj.x == 0) {
      bombobj.x = 9;
      bombobj.y = Math.floor(Math.random() * 8);
    }
    bombobj.x--;
  }
}, 500)