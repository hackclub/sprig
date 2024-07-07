/*
@title: Collect the coins
@author: Chun Han
*/


const piggy = "b";
const coins = "a";
const sky = "s";
const ground = "g";


setLegend(
  [ piggy, bitmap`
................
................
................
................
....00222200....
..00000000000...
..008888888000..
.00088888888880.
.088888888880800
0088888888888800
.008888888888800
..0888888888880.
..0888888888800.
..0000000000000.
...00.....00....
...00.....00....`  ],
  [ coins, bitmap`
................
....0000000.....
..0006666600....
.006666666600...
.0066660666600..
.0666660666660..
.0666660666660..
.0666660666660..
.0666660666660..
.0666660666660..
.0066660666660..
..006666666600..
...0066666600...
....00000000....
................
................`],
  [ sky, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
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
1111111111111111` ]
)

setSolids([])

let level = 0;
let score = 0;
const levels = [
  map`
ssssssss
ssasssss
ssssssss
ssssssss
ssssssss
ssssssss
ssssbsss
gggggggg`
]
setBackground('s');

onInput("a", () => {
  if (getFirst(piggy).x !== 0){
    getFirst(piggy).x -=1;
  }
});

onInput("d", () => {
  if (getFirst(piggy).x !== 8){
    getFirst(piggy).x +=1;
  }
});


setMap(levels[level])

var draw = setInterval(() => {
  let coinsGroup = getAll(coins);

  let piggyTile = getFirst(piggy);
  let xCoins = Math.floor(Math.random() * 8);
  
 
  
  addSprite(xCoins, 0, coins);


  for (let i = 0; i < coinsGroup.length; i++) {
    coinsGroup[i].y += 1;
  }
 
  for (let i = 0; i < coinsGroup.length; i++) {
   if (coinsGroup[i].y == 7) {
     coinsGroup[i].remove();
    }
  }
 

  for (let i = 0; i < coinsGroup.length; i++) {
    if (coinsGroup[i].y == piggyTile.y && coinsGroup[i].x == piggyTile.x) {
      score++;
    }
  }
 

   addText(`Score: ${score}`, {
     x: 8, 
     y: 1, 
     color: color`5`
   })
},400)

                     
