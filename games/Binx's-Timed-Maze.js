/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Binx's Timed Maze
@author: Wafers
@tags: [Maze]
@addedOn: 2024-00-00
*/
let score = 0;

let timer = 75;

let phrase = ``;

let intervalId;

let goldFishSpawned = true;

let startEnd = false;

const player = "p"

const wall = "W"

const beef = "B"

const salmon = "S"

const goldFish = "G"

const chicken = "C"

addText(`use wasd to move`, {
    x: 2,
    y: 7, 
    color: color`3`
  });
    addText(`and use l to start`, {
      x: 1,
      y: 8,
      color: color`3`
      });
addText(`and j to stop`, {
      x: 2,
      y: 9,
      color: color`3`
      });

setLegend(
  [ player, bitmap`
.....................
..........0...0......
.........020.020.....
0........0000000.....
00.......0000000.....
.00......0260260.....
..00.....0003000.....
...0000000202020.....
...0000000020200.....
...0000000000000.....
...000000000000......
...000000000000......
...0.0......0.0......
...0.0......0.0......
.....................
.....................` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ beef, bitmap`
................
................
.......303......
......33303.....
.....303330.....
....0330333.....
....3033033.....
....330330......
....03303.......
.....033........
................
................
................
................
................
................` ],
  [ salmon, bitmap `
................
................
................
.....0000000000.
....033233233230
...0323323323320
..0233233233230.
.0332332332330..
0323323323320...
233233233230....
32332332330.....
0000000000......
................
................
................
................`  ],

  [ chicken, bitmap`
......0000......
.....033330.....
....03333330....
...0333333330...
...0333333330...
...0333333330...
...0333333330...
....03333330....
.....033330.....
......0220......
......0220......
.....002200.....
.....022220.....
.....000000.....
................
................`],
  [ goldFish, bitmap`
............66..
...........6226.
..........62266.
.....66.6666666.
....62266666....
....62666666....
....66666666....
....6662266.....
...61622666.....
..66616666......
..6066666.......
..666666........
...666..........
................
................
................`]
)


setSolids([ wall, player ])

let level = 0
const levels = [
  map`
WWWWWWWWWWWWWWWWWWW
.......W.W.........
..WWW..W.WWWWWWWWW.
....W............W.
WWWWWW...WWWW.W..W.
W......W......W..W.
..WWWW.W..W.W.W..W.
..W..W.W..W.WWW..W.
.WW..W.W.pW.W....W.
.....W...WW.W..W.W.
.WWWW..........W.W.
......WWWWWWWWW..W.
..WWWW......W.W.WW.
.......W.W.........
.WWWWWWW.WWWWWWWW..
.......W...........`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let removableSpritesCount = getAll(beef).length + getAll(salmon).length + getAll(chicken).length;



onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y += -1
})

onInput("a", () => {
  getFirst(player).x += -1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("l", () => {
  if(!(startEnd)){
    startGame();
    clearText();
    addText(`Score: ${score}`, {
  x: 0,
  y: 0,
  color: color`5`
});

addText(`Time: ${timer}`, {
    x: 11,
    y: 0,
    color: color`5`
  });
    
    intervalId = setInterval(() => {
      timer--;
  updateTimerText();
  if (timer === 0){
    removefood();
    clearInterval(intervalId);
    phrase = `time ran out`;
    addText(`game over`, {
    x: 6,
    y: 7, 
    color: color`3`
  });
    addText(`${phrase}`, {
      x: 3,
      y: 8,
      color: color`3`
      });
  }
  }, 1000);
    removableSpritesCount = getAll(beef).length + getAll(salmon).length + getAll(chicken).length;
  }
});

onInput("j", () => {
      startEnd = false;
      removeFood();
      clearInterval(intervalId);
    });

afterInput(() => {
  const playerSprite = getFirst(player)
  
  // Check for collision between player and beef sprites
  getAll(beef).forEach(beefSprite => {
    if (playerSprite.x === beefSprite.x && playerSprite.y === beefSprite.y) {
      // If player touches the beef sprite, remove the beef sprite
      beefSprite.remove();
      removableSpritesCount--;
      score += 5;
      updateScoreText();
    }
  })

  // Check for collision between player and salmon sprites
  getAll(salmon).forEach(salmonSprite => {
    if (playerSprite.x === salmonSprite.x && playerSprite.y === salmonSprite.y) {
      // If player touches the salmon sprite, remove the salmon sprite
      salmonSprite.remove();
      removableSpritesCount--;
      score += 15;
      updateScoreText();
    }
  })

  // Check for collision between player and chicken sprites
  getAll(chicken).forEach(chickenSprite => {
    if (playerSprite.x === chickenSprite.x && playerSprite.y === chickenSprite.y) {
      // If player touches the chicken sprite, remove the chicken sprite
      chickenSprite.remove();
      removableSpritesCount--;
      score += 10;
      updateScoreText();
    }
  })

  // Check for collision between player and goldFish sprites
  getAll(goldFish).forEach(goldFishSprite => {
    if (playerSprite.x === goldFishSprite.x && playerSprite.y === goldFishSprite.y) {
      // If player touches the goldFish sprite, remove the goldFish sprite
      goldFishSprite.remove();
      score += 40;
      startEnd = false;
      updateScoreText();
      phrase = `you ate all the food`;
    addText(`you won`, {
      x: 7,
      y: 7,
      color: color`3`
    });
      
    addText(`${phrase}`, {
      x: 0,
      y: 8,
      color: color`3`
    });
     
    }
    clearInterval(intervalId);
  })

// Update the afterInput function to handle sprite spawning
afterInput(() => {
  const playerSprite = getFirst(player);

  // Check if all removable sprites are collected and a goldFish has not been spawned
  if (removableSpritesCount === 0 && !goldFishSpawned) {
    const { x, y } = getRandomEmptyTile();
    
    addSprite(x, y, goldFish); // Spawn the new "goldFish" sprite at a random unoccupied tile
    goldFishSpawned = true;
    removableSpritesCount++;

    clearInterval(intervalId);

    intervalId = setInterval(() => {
      timer--;
  updateTimerText();
  if (timer === 0){
    removefood();
    clearInterval(intervalId);
    phrase = `time ran out`;
    addText(`game over`, {
    x: 6,
    y: 7, 
    color: color`3`
  });
    addText(`${phrase}`, {
      x: 3,
      y: 8,
      color: color`3`
      });
  }
  }, 1000);
  }
  });
});

function startGame()
  {
    timer = 75;
    score = 0;

    const playerSprite = getFirst(player);
    
    playerSprite.x = 9;
    playerSprite.y = 8;
    playerSprite.x = 9;
    playerSprite.y = 8;
    
  
      for(let i = 0; i < 14; i++){
        const { x: beefX, y: beefY } = getRandomEmptyTile();
        addSprite(beefX, beefY, beef);
        
      }

    for(let i = 0; i < 10; i++){
      const { x: chickenX, y: chickenY } = getRandomEmptyTile();
      addSprite(chickenX, chickenY, chicken);
      
    }

    for(let i = 0; i < 6; i++){
      const { x: salmonX, y: salmonY } = getRandomEmptyTile();
       addSprite(salmonX, salmonY, salmon);
      
    }

    startEnd = true;
    goldFishSpawned= false;
  }

function updateScoreText() {
  clearText();
  addText(`Time: ${timer}`, {
    x: 11,
    y: 0,
    color: color`5`
  });
  addText(`Score: ${score}`, {
    x: 0,
    y: 0,
    color: color`5`
  });
}

function updateTimerText() {
  clearText();
  addText(`Time: ${timer}`, {
    x: 11,
    y: 0,
    color: color`5`
  });
  addText(`Score: ${score}`, {
    x: 0,
    y: 0,
    color: color`5`
  });
}
  function getRandomEmptyTile() {
  let randomX, randomY;
  do {
    randomX = Math.floor(Math.random() * width()); // Generate random x coordinate
    randomY = Math.floor(Math.random() * height()); // Generate random y coordinate
  } while (getTile(randomX, randomY).length > 0); // Continue generating if the tile is not empty
  return { x: randomX, y: randomY };
}

function removeFood(){
  goldFishSpawned = true;
  
  getAll(beef).forEach(beefSprite => {
    beefSprite.remove();
  });

  getAll(salmon).forEach(salmonSprite => {
    salmonSprite.remove();
  });

  getAll(chicken).forEach(chickenSprite => {
    chickenSprite.remove();
  });

  getAll(goldFish).forEach(goldFishSprite => {
    goldFishSprite.remove();
  });

  removeableSpritesCount = 0;
  goldFishSpawned = false;
}
