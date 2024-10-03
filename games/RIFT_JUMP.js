/*
@title: Rift Jump
@author: sharonbasovich
@tags: ['platformer']
@addedOn: 2024-05-28
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const coin = "c"
const player = "p"
const island = "i"
const background = "b"
const counter = "x"
var total = "0";
const portal = "z"



setLegend(
  [player, bitmap`
.....000000.....
....06666990....
...0666666990...
..003333333300..
.06666666666660.
0669000000009660
0690F00F00000960
.09002002000090.
..00L2FL2F0000..
...0FFFFFF00....
....0CCCC030....
...0333333330...
..0F333330FF0...
..0F055550FF0...
...007007700....
....0F0.0F0.....`],
  [coin, bitmap`
....00000000....
...0222222660...
..026666666660..
.0266622FF666F0.
026662266FF666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
026662266FF666F0
.0266622FF666F0.
..0666666666F0..
...066FFFFFF0...
....00000000....`],
  [island, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
00DD00DD00DD00D0
0C00CC00CC00CC00
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [counter, bitmap`
................
................
................
................
................
................
................
................
................
..00............
.0660...........
066660..........
066660..........
.0660...........
..00............
................`],
  [portal, bitmap`
....HHHHHHHH....
...H88888888H...
..H88HHHHHH88H..
.H88H888888H88H.
H88H888HH888H88H
H8H888HHHH888H8H
H8H88HH22HH88H8H
H8H8HH2222HH8H8H
H8H8HH2222HH8H8H
H8H88HH22HH88H8H
H8H888HHHH888H8H
H88H888HH888H88H
.H88H888888H88H.
..H88HHHHHH88H..
...H88888888H...
....HHHHHHHH....`]
)

setSolids([player, island])

let level = 0;
const levels = [
  map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
pbbbbbbbbz
iiiiiiiiii
bbbbbbbbbb`,
  map`
....c...x.
..........
.........z
.........i
....i..cii
p.iii..iii
iiiiiiiii.
..........`,
  map`
...c....x.
..........
..........
...ii..c..
..iiii....
piiiiiii.z
iiiiiiiiii
..........`,
  map`
..c.....x.
..i......c
..i..iiiii
..i....iii
.iii....ii
piii....zi
iiiiiiiiii
..........`,
  map`
........x.
..........
...c......
......i...
...i..c...
p........z
i.i..i...i
..........`,
  map`
........x.
..c.......
...c......
.p..c.....
.i...c....
......z...
i.....i...
..........`,
  map`
....c...x.
........z.
....i...i.
..........
..i..ci.c.
p.........
i....i..i.
..........`,
  map`
c.......x.
i.iiii..i.
..........
......ii..
.ii.c.....
p.......z.
i...i...i.
..........`,
  map`
........x.
..........
..cc..cz..
..cc..cc..
.........i
p.i....i..
i..iiii...
..........`,
  
]

addText("WELCOME TO \nRIFT JUMP", {
        x: 2,
        y: 2,
        color: color`0`,});
addText("W: Jump\nA: Right\nD: Left", {
        x: 5,
        y: 7,
        color: color`0`,});
addText("Go to the portal!", {
        x: 1,
        y: 5,
        color: color`0`,});

const endScreen = map`
........x.
..........
..........
..........
..........
..........
p.........
iiiiiiiiii`;
setMap(levels[level])
setBackground(background);

/*setPushables({
  [ player ]: []
})*/

/*onInput("s", () => {
  
  getFirst(player).y += 1
})*/

onInput("w", () => {
  if (isGrounded()) {
    if (getFirst(player).y < 2) {
      getFirst(player).y -= 1;
    } else if (getFirst(player).y < 3) {
      getFirst(player).y -= 2;
    }

    getFirst(player).y -= 3
  }
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

var done = false;

function levelEnd() {
  let obstacles = getFirst(portal);
  let p = getFirst(player);
  if (obstacles.x == p.x && obstacles.y == p.y) {
    
    if (level > levels.length - 2) {
      
      
      setMap(endScreen)
      addText("THANK YOU \nFOR PLAYING", {
        x: 5,
        y: 5,
        color: color`0`,
      });
      done = true;
      return;
    }
    
    level++;
    clearText();
    addText(total.toString(), {
      x: 17,
      y: 1,
      color: color`0`,
    })
    setMap(levels[level]);
  }


}

function isGrounded() {
  let obstacles = getAll(island);
  let p = getFirst(player);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == (p.y + 1)) {
      return true;
    }
  }
  return false;
}

function checkHit() {
  let obstacles = getAll(coin);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      let tempX = p.x;
      let tempY = p.y;
      clearTile(tempX, tempY);
      addSprite(tempX, tempY, player);
      return true;
    }
  }
  return false;
}

addText("0", {
  x: 17,
  y: 1,
  color: color`0`,
})
let check = 0;
var gameLoop = setInterval(() => {
  check++;
  isGrounded();
  if (!done) {
    levelEnd();
  }
  if (getFirst(player).y > 6) {
    getFirst(player).y = 5;
    getFirst(player).x = 0;
  }
  if (checkHit()) {
    total++;
    addText(total.toString(), {
      x: 17,
      y: 1,
      color: color`0`,
    })
  }
  if ((check % 2) == 0) {
    getFirst(player).y += 1;
  }
}, 100);
