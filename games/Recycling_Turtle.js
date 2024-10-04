/*
@title: Recycling_Turtle
@author: ari-tistic
@tags: ['puzzle']
@addedOn: 2023-05-19

Keys: 
  - A to move left
  - D to move right
  - K to start
  - J to restart

How to play:
  - Turtle is tired of swimming around so much plastic, so he has decided to put matters into
  his own flippers and help educate people about plastic disposal. Not all plastic can go in your
  curbside recycling bin, and certainly not the beach!
  - Play as Recycling Turtle to learn what plastic goes in your household bin,
  and what plastic requires special disposal.
  - Catch recyclable plastic types with the bin and win points
  - Catch nonrecyclable plastic types with the bin and lose points
  - Some plastics win/lose you more points than others!

Objective:
  - Reach 100 points to become a MASTER RECYCLER!

Learn the types of plastic:
  1 - PET (water bottle), most widely recycled (5 pts)
  2 - HDPE (detergent bottle), easy to be recycled (5 pts)
  3 - PVC (pipe), nonrecyclable in normal collections (-1 pt)
  4 - LDPE (shopping bag), nonrecyclable in normal collections (-1 pt)
  5 - PP (bucket), recyclable in some conditions (4 pts)
  6 - PS (red Solo cup), nonrecyclable (-2 pts)
  7 - Other (glasses frames), nonrecyclable (-2 pts)

  Remember not to put soft plastics in your curbside recycling bin -
  they get caught in recycling machinery!

  Learn more about how to properly recycle plastic at
  https://www.plasticsforchange.org/blog/which-plastic-can-be-recycled

  HAPPY RECYCLING!
*/

//SETUP
const player = "p"
const waterBottle = "1"
const detergent = "2"
const pipe = "3"
const shoppingBag = "4"
const bucket = "5"
const disposableCup = "6"
const glasses = "7"
const background = "b"
const spriteKeys = ["1", "2", "3", "4", "5", "6", "7"];
const spriteTypes = [waterBottle, detergent, pipe, shoppingBag, bucket, disposableCup, glasses];

setLegend(
  [ player, bitmap`
.......DD.......
......0DD0......
......DDDD......
....00000000....
..00LLLLLLLL00..
.D005555555500D.
.DD0555225550DD.
.DD0552552550DD.
.DD0055555500DD.
.D..05255250..D.
....05522550....
....05555550....
...D00555500D...
..DDD000000DDD..
..DD...DD...DD..
................` ], //recycling bin
  [ waterBottle, bitmap`
................
.....00000......
.....07270......
......050.......
....0077700.....
...077772770....
...077772270....
....55555555....
...022222220....
...022222220....
...022222220....
....5555555.....
...077772270....
...077777270....
...000000000....
................` ], //1-PET (5 pts)
  [ detergent, bitmap`
................
.....00000......
.....09290......
......0F0.......
....0044400.....
...044442440....
...044442240....
...0FFFFFFF0....
...066662260....
...066662260....
...066662260....
...0FFFFFFF0....
...044442240....
...044444240....
...000000000....
................` ], //2-HDPE (5 pts)
  [ pipe, bitmap`
................
................
................
................
.000........000.
.0F0000000000F0.
.0F0CFFCCCCC0C0.
.0C000F0C0000C0.
.0C0CCCCCCCC0C0.
.0C0000000000C0.
.000........000.
................
................
................
................
................` ], //3-PVC (-1 pt)
  [ shoppingBag, bitmap`
................
....0......0....
...020....020...
...020....020...
...020....020...
...0200000020...
..020022220020..
..022200002220..
..022222222220..
..022222222220..
...0222222220...
...0222222220...
..022222222220..
..022222222220..
...0000000000...
................` ], //4-LDPE (-1 pt)
  [ bucket, bitmap`
................
................
................
..000000000000..
.00333333333300.
..000000000000..
..L0333333330L..
...L33333333LL..
...L33333333L...
...0L333333LL...
...0LLL3333L0...
...033LL22LL0...
...0333333330...
....00000000....
................
................` ], //5-PP (4 pts)
  [ disposableCup, bitmap`
................
................
................
..000000000000..
..022222222220..
..0CCCCCCCCCC0..
...0333333330...
...0333333330...
...0333333330...
...00CCCCCC00...
....03333330....
....03333330....
....03333330....
....0CCCCCC0....
................
................` ], //6-PS (-2 pts)
  [ glasses, bitmap`
................
................
................
................
0000000..0000000
0LL0200..0LL0200
0L00020000L00020
0000000..0000000
.00000LLLL00000.
..000......000..
LL............LL
................
................
................
................
................` ], //7-Other (-2 pts)
  [ background, bitmap`
2777777227777777
7277772772222277
7777727777777727
7777277777777727
7772777777777272
7727777777722777
2227777777277777
7772727777277777
7777272222777777
7772777727777777
7777277277777727
7777272777777277
7772777277772772
2727777277727777
7277777227277777
7777777772777772` ], //background
)

let level = 0;
let points = 0;
let gameInterval; //set global variable
const framesPerSecond = 1.3; // Define the desired frames per second
const levels = [
  map`
bbbbb
bbbbb
bbbbb
bbbbb
bbpbb`,
];
setBackground(background)
setMap(levels[level])

//TEXT
function updatePoints(){
  if (points<0){
    points = 0;
  }
  else if (points >= 100) {
    stopGame();
    addText("You win!", {
      x: 6,
      y: 6,
      color: color`3`,
    });
    addText("J to Restart", {
      x: 4,
      y: 8,
      color: color`3`,
    });
  }
  addText("Points:" + points, { 
    x: 0,
    y: 0,
    color: color`3`,
  })
}
  addText("K to Start", { 
    x: 5,
    y: 6,
    color: color`3`,
  });

//SOUND EFFECTS
const shuffle = tune`
124.48132780082987: C4~124.48132780082987,
3858.921161825726`;
const bling = tune`
74.44168734491315: B5^74.44168734491315 + G5^74.44168734491315,
74.44168734491315: E5^74.44168734491315 + C5^74.44168734491315,
2233.2506203473945`;
const oof = tune`
163.9344262295082: E4^163.9344262295082 + D4^163.9344262295082 + C4^163.9344262295082,
5081.9672131147545`;

//PLAYER CONTROLS
function stopGame(){
  clearInterval(gameInterval);
}

onInput("a", () => {
  getFirst(player).x -= 1; //move left
  playTune(shuffle)
});

onInput("d", () => {
  getFirst(player).x += 1; //move right
  playTune(shuffle)
});

onInput("k", () => {
  clearText();
  gameInterval = setInterval(gameLoop, 1000 / framesPerSecond);
});

onInput("j", () => {
  clearInterval(gameInterval);
  points = 0;
  setMap(levels[level])
  clearText();
  gameInterval = setInterval(gameLoop, 1000 / framesPerSecond);
});

//SPRITE CONTROLS
function checkSprite(sprite) {
  if (sprite == 1 || sprite == 2) {
    playTune(bling);
    points += 5;
  } else if (sprite == 5) {
    playTune(bling);
    points += 5;
  } else if (sprite == 3 || sprite == 4) {
    playTune(oof);
    points += -1;
  } else if (sprite == 6) {
    playTune(oof);
    points += -2;
  } else if (sprite == 7) {
    playTune(oof);
    points += -2;
  }
}

function spawnSprite() {
  let randomSprite = spriteTypes[Math.floor(Math.random() * 7)];
  let check = Math.floor(Math.random()*5);
  if(check != 3){
    let x = Math.floor(Math.random() * width()); 
    let y = 0;
    addSprite(x, y, randomSprite);
  }
}

function dropSprite() {
  let p = getFirst(player);
  for (let i = 0; i < spriteTypes.length; i++) {
    let sprites = getAll(spriteTypes[i]);
    for (let j = 0; j < sprites.length; j++) {
      if (sprites[j].y == 3 && p.x == sprites[j].x) {
        checkSprite(sprites[j].type);
        sprites[j].remove();
      } else if (sprites[j].y == 4) {
        sprites[j].remove();
      }
      else {
        sprites[j].y += 1;
      }
    }
  }
}

//GAME LOOP
function gameLoop() {
  dropSprite();
  spawnSprite();
  updatePoints();
}
