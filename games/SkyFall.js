/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: SkyFall
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const meteor = "m";
let moveMeteorInterval;

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
...5......5.....
...50000005.....
....0H00H0......
....0H00H0......
....000000......
.....0..0.......
.....0..0.......
..0000..00000...
................`
  ],
  [ meteor, bitmap`
..6.6.6...6..6..
..666.6..6.6.6..
..93966.66996...
..63996666939...
..69399999396...
..69333333996...
...9333333966...
...69LLLLL666...
...6LLLLLLL6....
....LLLLLLL.....
....LLLLLLL.....
....LLLLLLL.....
....LLLLLLL.....
.....LLLLL......
................`
  ]
);

setSolids([]);

const levels = [
  map`
..m..
.....
.....
..p..`
];

let level = 0;
setMap(levels[level]);

setPushables({
  [player]: []
});

function endGame() {
  clearInterval(moveMeteorInterval);
  clearText();
  addText("Game Over!", { x: 5, y: 10, color: color`0` });
}

function detectCollisions() {
  const playerTiles = getTile(getFirst(player).x, getFirst(player).y);
  const meteorSprites = getAll(meteor);

  meteorSprites.forEach(meteorSprite => {
    if(meteorSprite && playerTiles.some(tile => tile === meteorSprite)) {
      endGame();
    }
  });
}

function respawnMeteor() {
  for (let i = 0; i < 3; i++) {
    const randomX = Math.floor(Math.random() * width());
    const meteorSprite = addSprite(randomX, 0, meteor);
  }
}

function moveMeteors() {
  const meteorSprites = getAll(meteor);
  
  if (meteorSprites.length < 4) {
    respawnMeteor();
  }

  meteorSprites.forEach(meteorSprite => {
    meteorSprite.y += 1;
    
    if (meteorSprite.y >= height() - 1) {
      setTimeout(() => meteorSprite.remove(), 1000);
    }

    detectCollisions();
  });
}

onInput("j", () => {
  level = 0;
  setMap(levels[level]);
  clearText()
  moveMeteorInterval = setInterval(moveMeteors, 1000);
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("l", () => {
  endGame();
});

moveMeteorInterval = setInterval(moveMeteors, 1000);
