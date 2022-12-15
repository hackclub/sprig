/*
@title: catch the apple
@author: Ivoine Strachan


To play the game, use the "A," "S," and "D" keys to move around and collect the apples. 
Be careful to dodge the trees and branches as you move. 
Can you collect all of the apples and reach the end of the level? Try your best and have fun!

*/


const updateRate = 1000;
const player = "p"
const area = "a"
const branch = "t"
const leaf = "l"
const apple = "f"

let collected = 0;
let timer = 0;


setLegend(
  [ player, bitmap`
................
................
................
....CCCCCCC.....
.....CCCCC......
...00.000.00....
...0..000..0....
...0..000..0....
...0...0...0....
...000000000....
.......0........
......000.......
......0.0.......
...333333333....
....7.....7.....
................` ],
  [ area, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ branch, bitmap`
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......` ],
  [leaf, bitmap `
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD3DDDDDDDDDDD
DDDDDDDDDDDD3DDD
DDD3DDD3D3DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDD3DDDD3DDD
DDD3DDDDDDDDDDDD
DDDDDDD3DDDDDDDD
DDDDDDDDDD3DDDDD
DDDDDDDDDDDDDDDD
DDDD3DDDDDDDDDDD
DDDDDDDDDDDDD3DD
DDDD3DDDD3DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [apple, bitmap `
................
................
................
................
................
.......CC.......
.......C........
......3333......
......3333......
......3333......
......3333......
................
................
................
................
................`],
 
)

setSolids([]);



const levels = [
  map`
.t.t.t.
.l.l.l.
.......
...p...
aaaaaaa
aaaaaaa`,
]

let apples = [];

setMap(levels[0])

const appleSpawn = setInterval(() => {
  
  let x = Math.floor(Math.random() * 12);
  let found = false;
  for(let i = 0; i < apples.length; ++i) {
    if(apples[i][0] == x && apples[i][1] == 0 || apples[i][0] == x && apples[i][1] == 1) {
      found = true;
    }
  }

  if(!found) {
    addSprite(x, 0, apple);
    apples.push([x, 0]);
  }
}, updateRate);

const appleUpdate = setInterval(() => {
  for(let i = 0; i < apples.length; ++i) {
    let pos = apples[i];
    let tile = getTile(...pos);
    if(tile.length > 0) {
      tile[0].y += 1;
      apples[i][1] += 1;
    }
  }

  let toRemove = [];
  
  for(let i = 0; i < apple.length; ++i) {
    let playerPos = getFirst(player);
    let playerX = playerPos.x;
    let playerY = playerPos.y;
    if(apple[i][0] == playerX && apple[i][1] >= playerY + 1) {
      collected = 1;
      toRemove.push(i);
      
    }
  }
  for(let i = 0; i < apple.length; ++i) {
    if(apple[i][1] == getFirst(player).y) {
      toRemove.push(i);
    }
  }
  for(let i = 0; i < toRemove.length; ++i) {
    getTile(...apple[toRemove[i]]).forEach(item => {
      if(item != null && item.type != "p") {
        item.y = getFirst(player).y;
        setTimeout(() => {
          item.remove();
          apple.splice(toRemove[i], 1);
        }, 300);
      }
    });
  }

  
  clearText();
  addText(`collected: ${collected}/10`, { x : 5, y : 0});
  
  if(collected <= -11) {
    clearInterval(appleUpdate);
    clearInterval(appleSpawn);
    addText("Game Over", { x : 5, y : 0});
  }
  timer++;
}, updateRate);




setPushables({
  [player] : [],
})

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});








