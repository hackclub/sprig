/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: MY TRUE AND REAL GAME
@author: 
@tags: []k
@addedOn: 2025-00-00
*/

const player = "p"
const ground = "g"
const rock = "r"

setLegend(
  [ player, bitmap`
................
................
................
................
................
.....7777.......
.....7770.......
.....7770.......
.....7777.......
......77........
.....7775.......
....7777555.....
...77.77..55....
.....5577.......
....55..77......
...55....77.....` ],  
  [ ground, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
    [ rock, bitmap`
................
................
................
................
......LLLLLLL...
...LLLLLLLLLLLL.
.LLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLL00
.LLLLLLLLLLLLL00
..LLLLLLLLLLL00.
...LLLLLLLL000..
....LLLLL0000...
.....LL00000....` ],
)
onInput("a", () => {
  if (gamerunning){
  getFirst(player).x += 1
  }
})
setSolids([])

let level = 0
const levels = [
  map`
.....
.....
.p..r
ggggg`
]
const gameloop = setInterval(()=> {
  clearTile(0,2)
   getAll(rock).forEach((r) => {
    if (r.x == 0) {
      r.remove();
    } else {
      r.x -= 1;
    };
  });
  if (getAll(rock).length == 0) {
    spawny();
  }

   if (checkRock() ==false){
    clearInterval(gameloop)
    gamerunning = false;
    addText("YOU ARE DED",{x:5, y:4, color:'3'})
  }
},500)



setMap(levels[level])

setPushables({
  [ player ]: []
})
let gamerunning = true;


function MOVE2(){
let r = getAll(rock)
for (let i = 0; i < r.length; i++) {
  r[i].x -=1;
}
}

function spawny(){
  let x = 4
  let y = 2
addSprite(x,y,rock)
}




function checkRock(){
let r=getAll(rock)
  let p=getFirst(player)
  for (let i = 0; i < r.length; i++) {
    if (r[i].x==p.x && r[i].y==p.y) {
      return false;
    }
  }
  return true;
}




onInput("w", () => {
  const playerSprite = getFirst(player);
  if (!jumping) {
    jumping = true;
    playerSprite.y -= 1; // weeeee
    setTimeout(() => {
      playerSprite.y += 1; // waaaaa
      jumping = false;
    }, 1000);
  }
});

function isGroundBelow(playerX, playerY) {
  const belowTile = getTile(playerX, playerY + 1);
  return belowTile.some(sprite => sprite.type === ground);
}



const playerSprite = getFirst(player);

function applyGravity(playerSprite) {
  if (!isGroundBelow(playerSprite.x, playerSprite.y)) {
    playerSprite.y += gravity;
  }
}

let gravity = 2;
let jumping = false;
  
if (!jumping) {
      applyGravity(playerSprite);
    }
