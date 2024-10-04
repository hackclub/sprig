/*
@title: dino
@author: Pfostierer
@tags: ['endless']
@addedOn: 2023-02-19
*/

const h = 10;
const w = 20;
let running = true;
let score = 0;

const player = "p";
const player2 = "P"
const bird = "b";
const bird2= "B"
const cloud = "c";
const floor = "f";

setLegend(
  [
    player,
    bitmap`
................
.........LLLLLL.
.........L.LLLL.
.........LLLLLL.
.........LLLLLL.
L.......LLL.....
LL.....LLLLLL...
LLL..LLLLL......
LLLLLLLLLLLLLL..
.LLLLLLLL.......
.LLLLLLLL.......
..LLLLLLL.......
...LL...L.......
...L....L.......
...L....L.......
...LL...LL......`,
  ],
  [
    player2,
    bitmap`
................
.........LLLLLL.
.........L.LLLL.
.........LLLLLL.
.........LLLLLL.
L.......LLL.....
LL.....LLLLLL...
LLL..LLLLL......
LLLLLLLLLLLLLL..
.LLLLLLLL.......
.LLLLLLLL.......
..LLLLLLL.......
...LL...L.......
...L....LLL.....
...LLL..........
................`
  ],
  [
    bird,
    bitmap`
......111111....
.......11111....
...1....1111....
..111....111....
.11111....11....
1111111...11....
......111111....
.......111111111
........11111...
................
................
................
................
................
................
................`,
  ],
  [
    bird2,
    bitmap`
................
................
...1............
..111...........
.11111..........
1111111.........
......111111....
.......111111111
........11111...
.........111....
.........111....
.........111....
........1111....
.......11111....
................
................`
    ],
  
  [
    floor,
    bitmap`
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
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
  ],
  [
    cloud,
    bitmap`
................
................
................
......1111......
...1111..11.....
.111......111...
.1.........11...
1...........111.
1....1111111111.
................
................
................
................
................
................
................`,
  ]
);

const ground = () => {
  return floor.repeat(w);
};

const air = () => {
  return ".".repeat(w)
}

const airWithClouds = () => {
  let layer = ""
  for(let i = 0; i<w;i++) {
    if(Math.floor(Math.random()*7)==1) {
      layer+=cloud
    }else {
      layer+="."
    }
  }
  return layer
};

const main = () => {
  let layer = "." + player;
  for (let i = layer.length; i < w; i++) {

    
      layer += ".";
    
  }
  return layer;
};

let layers = [];

for (let i = 0; i < 3; i++) {
  layers.push(airWithClouds());
}
for (let i = 0; i < 4; i++) {
  layers.push(air());
}
layers.push(main());
layers.push(ground());
layers.push(ground());

setMap(layers.join("\n"));

let jumping = false;
let jumpCount = 0;
let jumpDirection = 1;

const playerSprite = () => {
  return getFirst(player) ? getFirst(player): getFirst(player2)
}

onInput("w", () => {
  if(!jumping)
    jumping = true;
});

setInterval(() => {
  if (running) {
    clearText();
    addText(score.toString(), {
      x: 1,
      y: 4,
      color: color`0`,
    });
    score++;
    for (let i = 0; i < 3; i++) {
      let l = layers[i].substring(1)
      if(Math.floor(Math.random()*7)==1) {
      l+=cloud
    }else {
      l+="."
    }
      layers[i] = l
    }

    layers[7] = layers[7].substring(1);
    if (Math.floor(Math.random() * 10) == 1) {
      layers[7] = layers[7] + bird;
    } else {
      layers[7] = layers[7] + ".";
    }

    for (let currentBird of getAll(bird)) {
      if (currentBird.x == 2 && playerSprite().y == 7) {
        running = false;
        addText("dead", {
          x: 7,
          y: 4,
          color: color`3`,
        });
      }
    }

    for (let currentBird of getAll(bird2)) {
      if (currentBird.x == 2 && playerSprite().y == 7) {
        running = false;
        addText("dead", {
          x: 7,
          y: 4,
          color: color`3`,
        });
      }
    }
    

    if (jumping) {
      jumpCount += jumpDirection;
      if (jumpCount == 3) {
        jumpDirection = -1;
      }
      if (jumpCount == -1) {
        jumping = false;
        jumpCount = 0;
        jumpDirection = 1;
      }
    }
    
    for (let i = 4; i < 7; i++) {
      layers[i] = air();
    }

    layers[7] = layers[7].replace(player, ".").replace(player2, ".")
    if(score%2==1) {
      layers[7] = layers[7].replace(bird, bird2)
    }else {
      layers[7] = layers[7].replace(bird2, bird)
    }
    layers[7 - jumpCount] = layers[7 - jumpCount].substring(0, 1) + (score%2==0 ? player : player2) + layers[7 - jumpCount].substring(2, layers[7 - jumpCount].length);
    setMap(layers.join("\n"));
  }
}, 50);
