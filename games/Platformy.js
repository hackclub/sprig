/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Platformy
@author: Kyle B
@tags: [platformer, adventure]
@addedOn: 2025-00-00
*/

// entities
const player = "p";
const enemy = "e";

// blocks
const grass = "g";
const dirt = "d";
const sky = "s";

setLegend(
  [ player, bitmap`
................
................
................
.....0000000....
....0HHHHHHH0...
...0HHHHHHHHH0..
...0HHHHHHH8H0..
...0HHHHH8HHH0..
...0HHHHHH8880..
...0HHHHHHHH0...
....0HHHHHH0....
.....0H00H0.....
.....0H00H0.....
.....0HH0HH0....
......00.00.....
................` ],
  [ enemy, bitmap`
................
................
................
...33333333333..
...33333333993..
...33933333933..
...33993339333..
...33399399333..
...33333333333..
...33333999333..
..333399939933..
..3333933333333.
..3333333333333.
................
................
................` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDCCCDCDDDDDDD
DDCCCCCCCCCDDCCD
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
CCCCCCCCCCCCCCCC` ],
  [ dirt, bitmap`
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
CCCCCCCCCCCCCCCC` ],
  [ sky, bitmap`
7777777777777777
7777777777777777
7777772227777777
7722222222277777
7222222222222777
7222222222222277
7722222222222777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ]
);

setBackground(sky);
setSolids([player, enemy, grass, dirt]);

let level = 0;
const levels = [
  map`
p......
.......
.......
...gggg
gggdddd`,
  map`
.......
......e
.....gg
p..ggdd
gggdddd`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});




function handleGravity(sprite) {
      sprite.y += 1;
}

function handlePlayerGravity() {
  const playerSprite = getFirst(player);
  handleGravity(playerSprite);
}

var gravityInterval = setInterval(handlePlayerGravity, 100);


function moveEnemy() {
  const enemySprites = getAll(enemy);
  for (let enemySprite of enemySprites) {
    enemySprite.x -= 1;
    handleGravity(enemySprite);
  }
}


onInput("w", () => {
    const playerSprite = getFirst(player);
    playerSprite.y -= 1; 

    clearInterval(gravityInterval);
    setTimeout(() => {
        gravityInterval = setInterval(handlePlayerGravity, 100);
    }, 350);
}
);

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});

function changeLevel() {
  setMap(levels[level]);
  if (getFirst(enemy)) 
    var enemyInterval = setInterval(moveEnemy, 1000);
}
function checkNextLevel() {
  const playerSprite = getFirst(player);
  if (level == 0) {
    if (playerSprite.x == 6) {
      level ++;
      changeLevel();
    }
  }
}




afterInput(() => {
      checkNextLevel();
  });