/*
@title: Orb Journey
@author: trungu
@tags: []
@addedOn: 2024-06-10
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

// Introduction
// This is a very simple game I made to mess around with the Sprig editor

const player = "p"
const player2 = "o"
const waterTile = "w"
const lavaTile = "l"
const potHoleWater = "c"
const potHoleFire = "h"
const wall = "i"
console.log('test')

let timeElapsed = 0;
let timer = setInterval(() => {
  timeElapsed = timeElapsed + 1;
}, 1000);

// controls
// water orb : W A S D
// lava orb: I J K L
// objective: get the orbs to their respective potholes
// try to get the fastest time

setLegend(
  [ player, bitmap`
................
................
................
..0000000000....
.00777772220....
.0777777722000..
00777077707220..
00577777777770..
.0057077707770..
..055000007700..
..00557775550...
...0005500000...
.....0000.......
................
................
................` ],
  [ player2, bitmap`
................
................
................
................
....000000000...
...0022222220...
..002203303300..
..0233333333300.
..03303303333C0.
..033000033CCC0.
..0033333CC000..
...0CCCCC00.....
....000000......
................
................
................` ],
  [ waterTile, bitmap`
7777777755577777
7777775577777777
7755557777777777
5557777777777777
7777777777777555
7777777755555777
7777775577777777
5555557777777777
7777777777777555
7777777755555777
7777755577777777
5555577777777777
7777777777777755
7777777775555577
7777755557777777
7555577777777777`],
  [ lavaTile, bitmap`
9999999999999999
3399999999999999
9333999999999999
9999333999999999
9999999333333333
9999999999999999
3399999999999999
9933999999999999
9999333333999999
9999999993399999
3999999999933333
3399999999999993
9933333339999999
9999999933999999
3999999993399999
9333999999933999`],
  [ potHoleWater, bitmap`
....00000000....
...0LLLLLLLL0...
..0LLLLLLLLLL0..
.0LL11111111LL0.
0LL1111111111LL0
0LL1111111111LL0
0LL1111111111LL0
0LL1111111111LL0
0LL1111111111LL0
0572111111112750
0572111111112750
0572211111122750
.057222222227750
..0577777777750.
...05555555550..
....000000000...`],
  [ potHoleFire, bitmap`
....00000000....
...0LLLLLLLL0...
..0LLLLLLLLLL0..
.0LL11111111LL0.
0LL1111111111LL0
0LL1111111111LL0
0LL1111111111LL0
0LL1111111111LL0
0LL1111111111LL0
0396111111116930
0396111111116930
0396611111166930
.039666666669930
..0399999999930.
...03333333330..
....000000000...`],
  [ wall, bitmap`
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
0000000000000000`]
)

setSolids([player, player2, wall])

let level = 0
let gameFinished = false;
const levels = [
  map`
p.iic
..l..
.ii..
hw..o`,  
  map`
p....i.c
...i.i..
...i.w..
.iliii..
.i...i..
hi.i...o`,  
  map`
h....ic
iiii.i.
...l.i.
.i.iii.
.i.w...
.i.iiii
p....io
..ii...`,
  map`
o..i.i.
i..c...
i..ii.i
iiwi...
...i.i.
.i.....
.iiiili
...h..p`,
  map`
.ihc.l.
..w.i..
i..i..i
.....i.
..i.i..
i..i...
pi...io
....i..`,
  map`
o.......
iii...ii
..iii...
........
iiicii..
.....iii
.iiliiih
..i..ip.
..w.....`,
  map`
i.....p
ihiiiii
...w..i
iili..i
....i.i
i.....i
....i.i
coi.i.i`,
  map`
........p
.i.i.iii.
.ihi.i.i.
.iii.iii.
.i.i.i.i.
l.......w
.iii.ici.
.i...ii..
.iii.i.i.
.o.......`,
  map`
po.......
.iii.i...
.i...i...
.i...i...
.iii.iii.
.........
.i.i.iii.
.i.i.i.i.
.i.i.ii..
.i.i.i.i.
.iii.iii.
lc.....hw`]
const empty = [ map`
iiiii
iiiii
iiiii
iiiii`]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  if (gameFinished === false) {
     getFirst(player).y -= 1
  }
})

onInput("i", () => {
  if (gameFinished === false) {
    getFirst(player2).y -= 1
  }
})

onInput("a", () => {
  if (gameFinished === false) {
    getFirst(player).x -= 1
  }
})

onInput("j", () => {
  if (gameFinished === false) {
    getFirst(player2).x -= 1
  } else {
    gameFinished = false;
    clearText();
    level = 0;
    setMap(levels[level]);

    timeElapsed = 0;
    timer = setInterval(() => {
      timeElapsed = timeElapsed + 1;
    }, 1000);
  }
})

onInput("s", () => {
  if (gameFinished === false) {
    getFirst(player).y += 1
  }
})

onInput("k", () => {
  if (gameFinished === false) {
    getFirst(player2).y += 1
  }
})

onInput("d", () => {
  if (gameFinished === false) {
    getFirst(player).x += 1
  }
})

onInput("l", () => {
  if (gameFinished === false) {
    getFirst(player2).x += 1
  }
})

afterInput(() => {
  const player1 = getFirst("p"); // Get the player sprite
  const player2 = getFirst("o"); // Get the player sprite

  const playerX = player1.x;
  const playerY = player1.y;
  const player2X = player2.x;
  const player2Y = player2.y;

  let lavaTileX = -1; 
  let lavaTileY = -1;
  let lavaHoleX = -1; 
  let lavaHoleY = -1;

  
  let waterTileX = -1; 
  let waterTileY = -1;
  let waterHoleX = -1; 
  let waterHoleY = -1;

  // Iterate over all sprites to find the lava tile
  getAll().forEach(sprite => {
    if (sprite.type === "l") {
      lavaTileX = sprite.x;
      lavaTileY = sprite.y;
    }
  });

   getAll().forEach(sprite => {
    if (sprite.type === "h") {
      lavaHoleX = sprite.x;
      lavaHoleY = sprite.y;
    }
  });
  
  getAll().forEach(sprite => {
    if (sprite.type === "w") {
      waterTileX = sprite.x;
      waterTileY = sprite.y;
    }
  });

  getAll().forEach(sprite => {
    if (sprite.type === "c") {
      waterHoleX = sprite.x;
      waterHoleY = sprite.y;
    }
  });

  // Check if player is on a lava tile by comparing coordinates
  if ((playerX === lavaTileX && playerY === lavaTileY) || (player2X === waterTileX && player2Y === waterTileY)) {
    console.log("Player is on a lava tile at coordinates (" + playerX + ", " + playerY + ")");
    // Additional actions can be performed here
    const currentLevel = levels[level]; // get the original map of the level

   

    // make sure the level exists before we load it
    if (currentLevel !== undefined) {
      clearText("");
      setMap(empty[0]);

      // Show "You lose" text for 0.5 seconds after crossing lava tile
      addText("You lose", { x: 6, y: 7, color: color`3` });
      setTimeout(() => {
        clearText();
        setMap(currentLevel);
      }, 500); // Clear text after 0.5 second
    }
  }

  // Check if player is on a hole
  if ((playerX === waterHoleX && playerY === waterHoleY) && (player2X === lavaHoleX && player2Y === lavaHoleY)) {
    console.log("Player is on a lava tile at coordinates (" + playerX + ", " + playerY + ")");
    // Additional actions can be performed here
    level = level + 1;
    const currentLevel = levels[level]; // get the original map of the level
    
    // make sure the level exists before we load it
    if (currentLevel !== undefined) {
      setMap(levels[level]);
    } else {
      clearText("");
      setMap(empty[0]);

      gameFinished = true;
      // Show "You win"
      clearInterval(timer);
      addText(`You win!`, { x: 6, y: 7, color: color`4` });
      setTimeout(() => {
        clearText();
        addText(`Time: ${timeElapsed}s`, { x: 6, y: 7, color: color`4` });
      }, 1000); // Clear text after 0.5 second
      setTimeout(() => {
        clearText();
        addText(`Click J to reset`, { x: 2, y: 7, color: color`4` });
      }, 2000); // Clear text after 0.5 second
    }
  }
})
