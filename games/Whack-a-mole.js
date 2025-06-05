/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Whack-a-mole
@author: Nils
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const field = "f"
const mole = "m"
const sound = tune`
230.76923076923077: C5~230.76923076923077,
7153.846153846154`;
var points = 0
let moleX = 0
let moleY = 0
let moleExists = false;


setLegend(
  [ player, bitmap`
3333333333333333
3999999999999993
39............93
39............93
39............93
39............93
39............93
39............93
39............93
39............93
39............93
39............93
39............93
39............93
3999999999999993
3333333333333333` ],
  [ field, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCLLLLCCCCCC
CCCCCL0000LCCCCC
CCCCL000000LCCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCCL000000LCCCC
CCCCCL0000LCCCCC
CCCCCCLLLLCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ mole, bitmap`
CCCCCCCCCCCCCCCC
CCCCC7CCC7CCCCCC
CCCCCC7C7CC7CCCC
CCCCCL77777CCCCC
CCCCL033337LCCCC
CCCL03303330LCCC
CCC333333333LCCC
C00333333333LCCC
C0033HHH3333LCCC
CCCL00333330LCCC
CCCL00333330LCCC
CCCCL033333LCCCC
CCCCCLLLLLLCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ]
);



let level = 0
const levels = [
  map`
.....
.....
..p..
.....
.....`
]

setMap(levels[level])

setBackground("f")

// Making a function to spawn a mole on a random tile

function spawnMole(){
  ;
  moleX = Math.floor(Math.random() * 5);
  moleY = Math.floor(Math.random() * 5);
  
  //Check if spot is free
  let p = getFirst(player); // get the player sprite
  while (p.x == moleX && p.y == moleY){
    moleX = Math.floor(Math.random() * 5);
    moleY = Math.floor(Math.random() * 5);
  }
  if (!moleExists){
  addSprite(moleX, moleY, mole);
  moleExists = true;
  }
};

// Implement player movements

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

// Adding the molewhacking functionality

onInput("j", () => {
  let p = getFirst(player); // get the player sprite
  let m = getFirst(mole);   // get the mole sprite
  if (p.x === m.x && p.y === m.y) {
    m.remove();
    moleExists = false;
    points += 1;
    playTune(sound);
    spawnMole();
  }
  addText("Score:" + String(points));
});

spawnMole();