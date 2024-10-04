/*
@title: Orpheus Burger Dash
@author: SamsonC
@tags: []
@addedOn: 2023-06-16
*/

const player = "p";
const bread = "b";
const cheese = "c";
const tomato = "t";
const meat = "m";
const lettuce = "l";
const floor = "f";
const breadwmeat = "e"
const breadwcheese = "h"
const breadwtomato = "o"
const breadwlettuce = "u"
const wall = "w"
const rottenegg = "r"

const pointSFX = tune`
103.80622837370242: C5-103.80622837370242,
103.80622837370242: E5-103.80622837370242,
103.80622837370242: G5-103.80622837370242,
103.80622837370242: E5-103.80622837370242,
103.80622837370242,
103.80622837370242: F5-103.80622837370242,
103.80622837370242,
103.80622837370242: G5-103.80622837370242,
2491.349480968858`
const lossSFX = tune`
138.88888888888889: C5^138.88888888888889,
138.88888888888889: C5^138.88888888888889,
138.88888888888889: B4^138.88888888888889,
138.88888888888889: B4^138.88888888888889,
138.88888888888889: A4^138.88888888888889,
138.88888888888889: A4^138.88888888888889,
138.88888888888889: G4^138.88888888888889,
138.88888888888889: F4^138.88888888888889,
138.88888888888889: F4^138.88888888888889,
138.88888888888889: E4^138.88888888888889,
138.88888888888889: D4^138.88888888888889,
138.88888888888889: C4^138.88888888888889,
2777.777777777778`


setLegend(
  [ player, bitmap`
0....DDDDD.....0
0....DD000D....0
0...D0002200...0
0...002222200..0
0..00202202200.0
0.022200200220.0
00222222222220.0
0.022220202220.0
0.002222022220.0
0..00000222220.0
0......0222220.0
00....00222220.0
.0....02222200.0
.000..0222200.00
...0.0222220.00.
...00022220000..` ],
  [ bread , bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
.00000000000000.
0999999999999990
0999999999999990
.00000000000000.` ],
  [ breadwmeat , bitmap`
................
................
................
................
................
................
................
................
................
................
.00000000000000.
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0999999999999990
.09999999999990.
..000000000000..` ],
  [ breadwcheese , bitmap`
................
................
................
................
................
................
................
................
................
.00000000000000.
0666666666666660
0CCCC66666CCCCC0
0CCCCC666CCCCCC0
0999999699999990
.09999999999990.
..000000000000..` ],
  [ breadwtomato , bitmap`
................
................
................
................
................
................
................
.00000000000000.
0333333333333330
0333333333333330
0666666666666660
0CCCC66666CCCCC0
0CCCCC666CCCCCC0
0999999699999990
.09999999999990.
..000000000000..` ],
  [ breadwlettuce , bitmap`
................
................
................
..000000000000..
.09999999999990.
0999999999999990
0444444444444440
0444444444444440
0434433443443340
0333333333333330
0666666666666660
0CCCC66666CCCCC0
0CCCCC666CCCCCC0
0999999699999990
.09999999999990.
..000000000000..` ],
  [ cheese, bitmap`
................
.......66.......
......6666......
.....666666.....
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
....666666666...
.....6666666....
......66666.....
.......666......
........6.......` ],
  [ tomato, bitmap`
................
....33333333....
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
................` ],
  [ meat, bitmap`
................
................
.....CCCCCCC....
....CC00CCCCC...
...CC00CCC0CCC..
..CCC0CCC00CCCC.
..CC00CC00CCC0C.
..C00CC00CCC00C.
..C0CC00CCC00CC.
..CCC00CCC00CCC.
..CC00CCC00CCCC.
...C0CCC00CCCC..
...CCCC00CCCC...
....CCCCCCCC....
................
................` ],
  [ lettuce, bitmap`
................
.....DDDDDD.....
....D444444D....
...D444444400...
..D0444440004D..
..D4004400444D..
..D4404004444D..
..D4440004444D..
..D4444004444D..
..D44440444440..
..D4444044400D..
..D4444040004D..
..D4444004444D..
...D44004444D...
....D404444D....
.....D0DDDD.....` ],
  [ rottenegg, bitmap`
................
................
................
....22222222....
..222222222222..
.22222222222222.
.22222222222222.
.22222266222222.
.22222660222222.
.22222666022222.
..222606662222..
....60660666....
..........6.....
................
................
................` ],
  [ floor, bitmap`
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC00000CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0000CCC0CCC0CCC0
0CC0CCC0CCC00000
0CC0CCC0CCC0CCC0
0CC00000CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0
0CC0CCC0CCC0CCC0` ],
  [ wall, bitmap`
1111111111111111
LL1LLLLLLL1LLLLL
LL1LLLLLLL1LLLLL
LL1LLLLLLL1LLLLL
1111111111111111
LLLL1LLLLLLLLL1L
LLLL1LLLLLLLLL1L
LLLL1LLLLLLLLL1L
1111111111111111
LLLLLLL1LLLLLLL1
LLLLLLL1LLLLLLL1
LLLLLLL1LLLLLLL1
1111111111111111
1LLLLLLLL1LLLLLL
1LLLLLLLL1LLLLLL
1LLLLLLLL1LLLLLL`]
);

setBackground(wall);

let gameLoop;
let level = 0
//map
const levels = [
  map`
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...........
...........
...........
...........
...........
...........
.....b.....
.....p.....
fffffffffff`
]

//game values
var gameRunning = false;
var score = 0;
var finished = false;
var intervalTime = 0;

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("d", () => {
  getFirst(player).x += 1;
  
  let breadSprite = getFirst(bread);
  if (breadSprite) {
    breadSprite.x += 1;
  }

  let breadwmeatSprite = getFirst(breadwmeat);
  if (breadwmeatSprite) {
    breadwmeatSprite.x += 1;
  }

  let breadwcheeseSprite = getFirst(breadwcheese);
  if (breadwcheeseSprite){
    breadwcheeseSprite.x += 1
  }

  let breadwtomatoSprite = getFirst(breadwtomato);
  if (breadwtomatoSprite){
    breadwtomatoSprite.x += 1
  }

  let breadwlettuceSprite = getFirst(breadwlettuce);
  if (breadwlettuceSprite){
    breadwlettuceSprite.x += 1
  }
});

onInput("a", () => {
  getFirst(player).x -= 1;
  
  let breadSprite = getFirst(bread);
  if (breadSprite) {
    breadSprite.x -= 1;
  }

  let breadwmeatSprite = getFirst(breadwmeat);
  if (breadwmeatSprite) {
    breadwmeatSprite.x -= 1;
  }

  let breadwcheeseSprite = getFirst(breadwcheese);
  if (breadwcheeseSprite){
    breadwcheeseSprite.x -= 1
  }

  let breadwtomatoSprite = getFirst(breadwtomato);
  if (breadwtomatoSprite){
    breadwtomatoSprite.x -= 1
  }

  let breadwlettuceSprite = getFirst(breadwlettuce);
  if (breadwlettuceSprite){
    breadwlettuceSprite.x -= 1
  }
});

onInput("i", () => {
    if (!gameRunning) {
        clearText();
        gameRunning = true;
        setMap(levels[1]); // Set the map again
        intervalTime = 1000; // Set the initial interval time
        gameLoop = setInterval(gameLogic, intervalTime);

    }
});

function showInstructions() {
    // Clear the screen
    setMap(levels[0])
    
    // Add text for instructions
    addText("Make a Burger", {
        x: 2,
        y: 1,
        color: color`2`
    });

    addText("1. Catch bread ", {
        x: 2,
        y: 3,
        color: color`9`
    });

    addText("2. Catch meat ", {
        x: 2,
        y: 4,
        color: color`C`
    });

    addText("3. Catch cheese ", {
        x: 2,
        y: 5,
        color: color`6`
    });

    addText("4. Catch tomato ", {
        x: 2,
        y: 6,
        color: color`3`
    });

    addText("5. Catch lettuce ", {
        x: 2,
        y: 7,
        color: color`4`
    });

    addText("Avoid rotten eggs ", {
        x: 2,
        y: 9,
        color: color`8`
    });

    addText("Press 'i' to start", {
        x: 2,
        y: 11,
        color: color`2`
    });

    addText("Every 3 points\n it gets faster", {
        x: 2,
        y: 13,
        color: color`2`
    });
}

function restartGame() {
  score = 0;
  gameRunning = true;
  finished = false;

  // Clear text
  clearText();


  // Reset the map
  setMap(levels[1]);

  // Restart the game loop
  intervalTime = 1000; // Set the initial interval time
  gameLoop = setInterval(gameLogic, intervalTime);
}

// Modify the onInput for the "j" key
onInput("j", () => {
  if (finished) {
    restartGame();
  }
});

//spawn item
function spawnFooditem(){
  let x = Math.floor(Math.random() * 11)
  let y = 0
  let item = Math.floor(Math.random() * 5)
  if (item == 0){
    addSprite(x, y, lettuce);
  }
  else if (item == 1){
    addSprite(x, y, cheese)
  }
  else if (item == 2){
    addSprite(x, y, tomato)
  }
  else if (item == 3){
    addSprite(x, y, meat)
  }
  else if (item == 4){
    addSprite(x, y, rottenegg)
  }
}

//item falls
function itemFall(type) {
  let items = getAll(type);

  // Log the items array to the console for debugging
  // console.log('items of type ' + type + ':', items);

  // Increment the y property of each sprite
  for (let i = 0; i < items.length; i++) {
    items[i].y += 1;
  }
}

function despawnItem(type) {
  let item = getAll(type)
  for (let i = 0; i < item.length; i++) {
    if (item[i].y == 7) {
      item[i].remove();
    }
  }
}


function checkHit(type) {
  let items = getAll(type);
  let burger;

  let breadSprite = getFirst(bread);
  if (breadSprite) {
    burger = breadSprite;
  }

  let breadwmeatSprite = getFirst(breadwmeat);
  if (breadwmeatSprite) {
    burger = breadwmeatSprite;
  }

  let breadwcheeseSprite = getFirst(breadwcheese);
  if (breadwcheeseSprite){
    burger = breadwcheeseSprite;
  }

  let breadwtomatoSprite = getFirst(breadwtomato);
  if (breadwtomatoSprite){
    burger = breadwtomatoSprite;
  }

  let breadwlettuceSprite = getFirst(breadwlettuce);
  if (breadwlettuceSprite){
    burger = breadwlettuceSprite;
  }
 
  for (let i = 0; i < items.length; i++) {
    if (items[i].x == burger.x && items[i].y == burger.y) {
      items[i].remove(); // Remove the food item
      return true;
    }
  }
  return false;
}

afterInput(() => {
  
})

//game loops
function gameLogic() {
  despawnItem(tomato);
  despawnItem(lettuce);
  despawnItem(cheese);
  despawnItem(meat);
  despawnItem(rottenegg);
  itemFall(rottenegg);
  itemFall(tomato);
  itemFall(lettuce);
  itemFall(cheese);
  itemFall(meat);
  spawnFooditem();

  if (checkHit(meat) && getFirst(bread)) {
    let burger = getFirst(bread);
    burger.type = breadwmeat;
  }
  if (checkHit(cheese) && getFirst(breadwmeat)) {
    let burger = getFirst(breadwmeat);
    burger.type = breadwcheese;
  }
  if (checkHit(tomato) && getFirst(breadwcheese)) {
    let burger = getFirst(breadwcheese);
    burger.type = breadwtomato;
  }
  if (checkHit(lettuce) && getFirst(breadwtomato)) {
    let burger = getFirst(breadwtomato);
    burger.type = breadwlettuce;
  }

  if (checkHit(rottenegg)) {
    // Stop the game loop
    clearInterval(gameLoop);
    gameRunning = false;
    
    // Display Game Over text
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Press j\n to restart.", {
      x: 4,
      y: 8,
      color: color`2`
    });
    playTune(lossSFX);
    finished = true;
  }
  
  //add score text
  addText("SCORE " + score, { 
    x: 10 - Math.round((("SCORE " + score).length) / 2),
    y: 0,
    color: color`0`
  });

  if (getFirst(breadwlettuce)) {
    score++;
    setTimeout(() => {
      let burger = getFirst(breadwlettuce);
      if (burger) { // Check if burger still exists
        // set type to default
        burger.type = bread;
        playTune(pointSFX);
      }
    }, 750); //750ms to update
   }
  
  if (score % 3 === 0 && score > 4) {
      // Decrease time by 50ms
      intervalTime = Math.max(50, intervalTime - 50);
      
      // clear current
      clearInterval(gameLoop);
      
      // start a new interval
      gameLoop = setInterval(gameLogic, intervalTime);
    }
  
}
showInstructions();

