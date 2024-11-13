/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pixel Box
@author: GriffinHengelsberg
@tags: ['sandbox', 'simulation']
@addedOn: 2024-11-12
*/

var tickTime = 100; //miliseconds
var selObj = 1;
var maxObjs = 4;


const sand = "s"
const water = "w"
const fire = "f"
const wood = "d"
const blackhole = "b"
const cursor = "c"

// Get a random integer between min (inclusive) and max (exclusive)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

//start
setInterval(tick, tickTime);



setLegend(  
  [ cursor, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000` ],
  [ sand, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ water, bitmap`
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
7777777777777777` ],
  [ fire, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ],
  [ wood, bitmap`
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
  [ blackhole, bitmap`
....00000000....
...0000000000...
..000000000000..
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
..000000000000..
...0000000000...
....00000000....` ],
)

setSolids([sand,water,fire,wood])

let level = 0
const levels = [
  map`
.........................
.........................
.........................
............c............
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................`
]

setMap(levels[level])

setPushables({
  [ cursor ]: [sand, water],
})


function tick(){

  const allWaterSprites = getAll("w");
  const allSandSprites = getAll("s"); 
  const allFireSprites = getAll("f");
  const allWoodSprites = getAll("d");
  const allBlackholeSprites = getAll("b");


  //obj behavors------------------------------------------ 

allBlackholeSprites.forEach(blackhole => {
    const nearbySprites = getAll("s", "w", "f", "d"); // Include all sprite types (sand, water, fire, wood)

    // Apply gravitational pull towards the blackhole
    nearbySprites.forEach(sprite => {
        const dx = blackhole.x - sprite.x;
        const dy = blackhole.y - sprite.y;

        // Update sprite position based on gravitational pull
            sprite.x += Math.sign(dx);
            sprite.y += Math.sign(dy);
            sprite.x += Math.sign(dx);
            sprite.y += Math.sign(dy);
        if(sprite.x == blackhole.x && sprite.y == blackhole.y){
            sprite.remove();
        }
    });
});
allWoodSprites.forEach(wood => {
      
    const tileBelow = getTile(wood.x, wood.y + 1); // Get the sprites in the tile below the wood sprite
    
    const isFireBelow = tileBelow.some(sprite => sprite.type === fire); // Check if a fire sprite is in the list of sprites below
    
    if(isFireBelow){
        addSprite(wood.x, wood.y, fire); // Add a fire sprite at the wood's position
        wood.remove(); // Remove the wood sprite
    }
});
    //fire
allFireSprites.forEach(fire => {
    const moveDirection = getRandomInt(0, 3);
    
    const canMoveUp = getTile(fire.x, fire.y - 1) !== "[object Object]";
    const canMoveRight = getTile(fire.x + 1, fire.y) !== "[object Object]";
    const canMoveLeft = getTile(fire.x - 1, fire.y) !== "[object Object]";
    
    if (getTile(fire.x, fire.y + 1) !== "[object Object]") {
        console.log("Fire sprite at (x, y):", fire.x, fire.y);
        
        // Move the fire sprite based on the random direction
        if (canMoveUp) {
            fire.y -= 1;
        }
       if (moveDirection === 2 && canMoveRight) {
            fire.x += 1;
       }
       else if (moveDirection === 1 && canMoveLeft) {
            fire.x -= 1;
        }

        // Set a timeout to remove the fire sprite after 3 seconds
        setTimeout(() => {
            fire.remove();  // Remove the fire sprite
        }, 1000); // 1 seconds in milliseconds
    }
});

    //water
  allWaterSprites.forEach(water => {
    const moveDirection = getRandomInt(0, 3); // Generate a random number for each water sprite

    const canMoveDown = getTile(water.x, water.y + 1) != "[object Object]";
    const canMoveRight = getTile(water.x + 1, water.y) != "[object Object]";
    const canMoveLeft = getTile(water.x - 1, water.y) != "[object Object]";

    if (canMoveDown) {
      water.y += 1; // Move down if possible
    } else if (moveDirection === 2 && canMoveRight) {
      water.x += 1; // Move right with a 1/3 probability if possible
    } else if (moveDirection === 1 && canMoveLeft) {
      water.x -= 1; // Move left with a 1/3 probability if possible
    }
  });
    //sand
  allSandSprites.forEach(sand => {
    const moveDirection = getRandomInt(0, 3); // Generate a random number for each sandliijiiis sprite

    const canMoveDown = getTile(sand.x, sand.y + 1) != "[object Object]";

    if(getTile(sand.x,sand.y + 1) != "[object Object]"){
      setTimeout(() => {
      if (canMoveDown) {
        sand.y += 1; // Move down if possible
      } 
      }, tickTime)
    }});

  
}
// Inputs ---------------------------------
onInput("s", () => {
  getFirst(cursor).y += 1
  console.log(getFirst(cursor).y)
})
onInput("w", () => {
  getFirst(cursor).y -= 1
  console.log(getFirst(cursor).y)
})
onInput("d", () => {
  getFirst(cursor).x += 1
  console.log(getFirst(cursor).y)
})
onInput("a", () => {
  getFirst(cursor).x -= 1
  console.log(getFirst(cursor).y)
})
onInput("i", () => {
  const cursor = getFirst("c")
  if(getTile(cursor.x,cursor.y) == "[object Object]"){
    if(selObj == 0){
        addSprite(cursor.x, cursor.y, sand);        
        addSprite(cursor.x + 1, cursor.y, sand);        
        addSprite(cursor.x - 1, cursor.y, sand);

    }
    else if(selObj == 1){
        addSprite(cursor.x, cursor.y, water);
    }
    else if(selObj == 2){
        addSprite(cursor.x, cursor.y, fire);
    }
    else if(selObj == 3){
        addSprite(cursor.x, cursor.y, wood);
    }
    else if(selObj == 4){
        addSprite(cursor.x, cursor.y, blackhole);
    }
  }
})

onInput("l", () => {
  if(selObj <= maxObjs - 1){
    selObj++;
  }
})
onInput("j", () => {
  if(selObj >= 1){
    selObj--;
  }
})

afterInput(() => {
  addText(selObj.toString(), { 
  x: 5, 
  y: 1, 
  color: color`3` // Choose a color for your text
})
});


  addText(selObj.toString(), { 
  x: 5, 
  y: 1, 
  color: color`3` // Choose a color for your text
})
