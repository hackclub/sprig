/*
@title: red_light_green_light
@author: annie
@tags: ['strategy']
@addedOn: 2022-11-16
wasd to move
get a score of 3 during at level to progress to the next level
move road blocks to get to the goal
and don't move during a red light!
*/

const player = "p";
const coin = "c";
const redlight = "r";
const greenlight = "g";
const road = "o";
const yellowline = "y";
const finish = "f";
const roadBlock = "b";
let score = 0;
let redOn = false;
let greenOn = true;
let playerY = 0;
let playerX = 0;
let gameRun = true;

setLegend(
  [ player, bitmap`
.....00000......
....0666660.....
....0606060.....
....0666660.....
....0666660.....
....0000000.....
...044444440....
..00444444440...
..044444444440..
..040444444040..
.06004444440060.
.00004444440000.
....00000000....
....050..050....
....050..050....
....000..000....`],
  [ coin, bitmap`
................
................
.....000000.....
...0066666600...
...0662FFF660...
..06626666F660..
..062666666F60..
..062666666F60..
..062666666F60..
..062666666F60..
..06F666666F60..
..066F6666F660..
...066FFFF660...
...0066666600...
.....000000.....
................`],
  [ redlight, bitmap`
1LLLLLLLLLLLLLL1
LLLL00000000LLLL
LLL0033333300LLL
LL003333333300LL
L00336333333300L
L033333333333C0L
L033333333333C0L
L033333333333C0L
L033333333333C0L
L033333333333C0L
L033333333333C0L
L00333333333C00L
LL003333333C00LL
LLL00CCCCCC00LLL
LLLL00000000LLLL
1LLLLLLLLLLLLLL1`],
  [ greenlight, bitmap`
1LLLLLLLLLLLLLL1
LLLL00000000LLLL
LLL0044444400LLL
LL004444444400LL
L00444444444400L
L044244444444D0L
L044444444444D0L
L044444444444D0L
L044444444444D0L
L044444444444D0L
L044444444444D0L
L00444444444D00L
LL004444444400LL
LLL00DDDDDD00LLL
LLLL00000000LLLL
1LLLLLLLLLLLLLL1`],
  [ yellowline, bitmap`
................
................
................
................
................
................
..666666666666..
..666666666666..
..666666666666..
..666666666666..
................
................
................
................
................
................`],
  [ road, bitmap`
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
1111111111111111`],
  [ finish, bitmap`
0000222200002222
0000222200002222
0000222200002222
0000222200002222
2222000022220000
2222000022220000
2222000022220000
2222000022220000
0000222200002222
0000222200002222
0000222200002222
0000222200002222
2222000022220000
2222000022220000
2222000022220000
2222000022220000`],
  [roadBlock, bitmap`
0000000000000000
0660006666666000
0600066666660000
0000666666600060
0006666666000660
0066666660006660
0666666600066660
0666666000666660
0666660006666660
0666600066666660
0666000666666600
0660006666666000
0600066666660000
0000666666600060
0006666666000660
0000000000000000`]
);

setSolids([ player, greenlight, redlight,roadBlock ]);

let level = 0;
const levels = [
  map`
g........f
c........f
yyyyyyyyyf
p........f
.........f`, 
  map`
g...........f
............f
............f
yyyyyyyyyyyyf
..c.........f
bb..........f
pb..........f`, 
  map`
g....fff.....
.............
.............
yyyyyyyyyyyyy
..c..........
bbbbbbbbbbbbb
........p....`, 
  map`
g...........p
.............
yyyyyyyyyyyyy
.....c.......
.............
yyyyyyyyyyyyy
b.b..........
.bb..........
f.b..........`, 
  map`
gf..b.....p
...b.bb....
..b....b...
.b......b..
b........b.
..........b
yyyyyyyyyyy
...........
...........
...........
.....c.....`, 
  map`
g.........p
bbbbbbbbbbb
...........
...........
bbbbbbbbbbb
....bcb....
...b...b...
..b.....b..
.b.......b.
b.........b
.....f.....`
  
];

const currentLevel = levels[level];
setMap(currentLevel);

setBackground(road);


setInterval(() => {
      if(gameRun === true){
      if (greenOn === true) {
      clearTile(0,0);
      addSprite(0, 0, redlight);
      redOn = true;
      greenOn = false;

}
      else {

      clearTile(0,0);
      addSprite(0, 0, greenlight);
            
      redOn = false;
      greenOn = true;}}
}, 2500);


setPushables({
  [ player ]: [roadBlock],
});

function scoreKeep(){
    addText("coins: " + score, {
    x: 8, 
    y: 2, 
    color: color`3`
  })
}
scoreKeep()


// player controls 

  onInput("w", () => {
    if (gameRun==true){
    getFirst(player).y -= 1;
    }
  });
  
  onInput("s", () => {
     if (gameRun==true){
    getFirst(player).y += 1;
     }
  });
  
  onInput("a", () => {
     if (gameRun==true){
    getFirst(player).x -= 1;
     }
  });
  
  onInput("d", () => {
     if (gameRun==true){
    getFirst(player).x += 1;
     }
  })

// timer
  var timeleft = 30;
  var Timer = setInterval(function(){if(gameRun === true && timeleft>0){
  clearText();
  scoreKeep();
  addText(''+timeleft, { 
    x: 2,
    y: 2,
    color: color`3`
  })};
    if(timeleft <= 0 && gameRun === true){
      clearInterval(Timer);
      clearText();
      
      clearTile(getFirst(coin).x, getFirst(coin).y);
      clearTile(getFirst(player).x, getFirst(player).y);

      addText("game over!", { 
      x: 5, 
      y: 5, 
      color: color`3`  })

    
    }
  timeleft--;
  }, 1000);


  afterInput(() => {
    let overlap = tilesWith(player, coin).length;
    let finishLine = tilesWith(player, finish).length;
    // coin overlap and respawn
    if (overlap === 1) {
      let coinSpawnY = Math.floor(Math.random() * 4) + 1;
      let coinSpawnX = Math.floor(Math.random() * 9) + 1;
      getFirst(coin).y = coinSpawnY;
      getFirst(coin).x = coinSpawnX;
      score++;
      scoreKeep();
     
    }
    //progress to next level
   if (finishLine === 1 && score >= 3) {
      level = level + 1;
     timeleft = 30
     score = 0
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {gameRun = false
                  clearText();
      addText("you win!", { y: 4, color: color`3` });
    }
    }
    //check if the red light is on
      if (greenOn==false && gameRun==true){
        timeleft = 0;
        clearText();
        gameRun = false
        clearTile(getFirst(coin).x, getFirst(coin).y);
        clearTile(getFirst(player).x, getFirst(player).y);
        addText("game over!", { 
            x: 5, 
            y: 5, 
            color: color`3`  })
      }
  });


