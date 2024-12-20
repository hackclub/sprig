/*
@title: Wanna See Me Speedrun
@author: alex tran
@tags: ['action', 'strategy', 'real-time']
@addedOn: 2024-12-12

modified from tutorial

game description:
think and move fast as you speed past mazes on a 3 second timer! dodge enemies and reach
the file to go onto the next level, picking up bonuses and time extensions on your way.

this game is meant to be replayed! try again to get better, and then try 
again once you beat the game to get a better rank!

controls:
WASD to move
k to restart (sends back to first level)

inspirations:
Pizza Tower by Tour De Pizza (speed-based gameplay, the majority of the game lol)
ULTRAKILL by Arsi "Hakita" Patala (ranking system and final screen)
*/

//game hints below, expand the comments to see
/*
1. time refreshes can be used multiple times. use this to wait out enemies!
2. bonuses, which are the small smiling chips, can be picked up once per level and contribute
to final rank. pick up 3 bonuses to move up a rank!
3. mash your keyboard.
4. there is a tier above s rank, which is the coveted PERFECT rank. acheive this by obtaining an s
rank and moving up a tier with bonuses!
*/



// define the sprites in our game
const player = "p";
const box = "x";
const goal = "g";
const wall = "w";
const deco1 = "1";
const background = "o"
const death = "d"
const black = "b"
const deadPlayer = "e"
const floorArrow = "a"
const timeReset = "t"
const hubert = "h"
const dangerLine = "l"

// make yo beats dre
const melody = tune`
500: C4~500,
15500`
const crash = tune`
500: G4^500 + B4^500 + A4^500 + F4^500 + C5^500,
15500`
const timerTune = tune`
200: A5^200 + F5^200 + D5^200,
200: E5^200 + G5^200 + A5^200,
6000`
const bonusTune = tune`
250: B4^250,
250: C5^250,
250: E5^250 + C5^250 + B4^250,
7250`
const pRank = tune`
187.5: A5/187.5,
187.5: G5/187.5,
187.5: A5/187.5,
187.5: B5/187.5 + C4/187.5,
187.5: B5/187.5 + F5/187.5 + C4/187.5,
5062.5`

//extra variables idk
let count = 3
let pettedHubert = false
let bonuses = 0
let bigTimer = 0
let restarts = 0

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
.00000000000....
.0LLLLLLL11110..
.0L00000000010..
.0L00000000010..
.0L00000000010..
.0L04000400010..
.0L00000000010..
.0L00000000010..
.01000000000L0..
.0111LLLLLLLL0..
..0000LLL00000..
.00000000000000.
.0LLLLLLLL4L4L0.
.00000000000000.
................`],
  [box, bitmap`
.............00.
.............010
............0000
.00000000000000.
.0LLLLLLLLLLLL0.
.01111111111LL0.
.00000000000000.
..0..........0..
..0..........0..
..0..........0..
.00000000000000.
.0LLLLLLLLLLLL0.
.00000000000000.
..010......010..
...0........0...
................`],
  [goal, bitmap`
................
................
................
.....00000000...
....002022020...
...0022000020...
...0222000020...
...0222222220...
...0200000020...
...0200404020...
...0200000020...
...0222222220...
...0000000000...
................
................
................`],
  [black, bitmap`
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
0000000000000000`],
  [death, bitmap`
................
.............9..
...000000....9..
..00000000...9..
.00LLLLL000.....
.0LLLLLLL00..9..
.0L3LL3LL000....
.0LLLLLLL000....
.00LLLLLL0000...
.000LLL000000...
..000000000000..
..000000000000..
...00000000000..
...00000000000..
...000.0000.....
................`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0L000000000000L0
0L004444444400L0
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0L4L4LLLLLLLLLL0
0000000000000000`],
  [deco1, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L100000000001L0
0LL0040404000LL0
0L100000000401L0
0L104004000001L0
0LL0000400040LL0
0LL0400440000LL0
0L100000000401L0
0L104000000001L0
0LL0004040400LL0
0L100000000001L0
0L111111111111L0
0L4L4L4LLLLLLLL0
0000000000000000`],
  [background, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [deadPlayer, bitmap`
................
.000............
.0L000000000000.
.0500LL11111110.
.0L00L777777710.
.0500L777272710.
.0L00L777777710.
.0L0LL7772227L0.
.0L0LL7272727L0.
.0L0LL7277777L0.
.0L00L7272777L0.
.0L0017272777L0.
.0L0017777777L0.
.0L0011LLLLLLL0.
.00000000000000.
................`],
  [floorArrow, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLL0LLLLLL
LLLLLLLL060LLLLL
LLLLLLLL0600LLLL
LLLLLLLL06660LLL
L0000000066600LL
L06666666666660L
L06666666666660L
LL000000066600LL
LLLLLLLL06660LLL
LLLLLLLL0600LLLL
LLLLLLLL060LLLLL
LLLLLLLL00LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [timeReset, bitmap`
................
................
................
.......0000000..
.......0660660..
..000000FF0FF00.
.0DDDDDDDDDDDD0.
.0DDD0DD666DDD0.
.0DD000DD6DDDD0.
.0DDD0DDD6DDDD0.
.0LLLLLLLLLLLL0.
.0000000000000..
................
................
................
................`],
  [hubert, bitmap`
................
................
....000..000....
....0L0..0L0....
....0L0000L0....
....0DDDDDD0....
....0D6DDDD0....
....0DDDD6D0....
....0D6DDDD0....
....0DD66DD0....
....0DDDDDL0....
....00000000....
................
................
................
................`],
  [dangerLine, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL33LLL33LLL33L
LL333LL333LL333L
L333LL333LL333LL
L333LL333LL333LL
LL333LL333LL333L
LLL33LLL33LLL33L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

// set background
setBackground([background])

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
bwwwwwwb
bw....wb
bwpaagwb
bw....wb
bwwwww1b`,
  map`
bwwwwwwb
bw.a..wb
bw.1w.wb
bwpwwgwb
bwwwwwwb`,
  map`
bwwwwwwb
bw.w.gwb
bwpxa.wb
bwwwwwwb`,
  map`
bwwwwwwb
bw....wb
bwpwax.b
bww1w.wb
bwx.g.wb
bwwwwwwb`,
  map`
bwwwwwwbb
bwp.wgwbb
bw.x...bb
bwwwwwwbb
bwelldwbb
b1wwwwwbb`,
  map`
bwwwwwwwb
bw.a.1.wb
bwplldgwb
bwwwwwwwb`,
  map`
bwwwwwwb
bwplldwb
bwllldwb
bw1.xg.b
bwwwwwwb`,
  map`
bwwwwwwb
bwpwxgwb
bwllldwb
b1..wwwb
bwwa.gwb
bwwwwwwb`,
  map`
bwwwwwwwb
bwpw...wb
bw.w.w.wb
bw.wtw.wb
bw.w.wgwb
bw..llldb
bwwwwwwwb`,
  map`
bwwwwwwb
bwp.wgwb
bwllwdwb
bw....wb
bwhw.gwb
bwwwwwwb`,
  map`
bwwwwwwwb
bw.pwg.wb
bw..w..wb
bwlllddwb
bw..1..wb
bw.....wb
bwwwwwwwb`,
  map`
bwwwwwwwwb
bw1p....wb
bw.llld.wb
bwlld.wwwb
bw.llldxwb
bw.w.wwwwb
bw.g.x..wb
bwwwwwwwwb`,
  map`
wwwwwwwww
w...llldw
wpllld..w
wwww.wwww
w.gwtx..w
w..w1w..w
w...llldw
w...t..xw
wwwwwwwww`,
  map`
wwwwwww1w
w...t...w
w.wwww..w
wllldwx.w
w.w..w.xw
wlld.wxgw
w.w..w.xw
wpw..1..w
wwwwwwwww`,
  map`
wwwwwwww
wllld..w
w.wwww.w
w....w.w
w.tp.wgw
w..xxw.w
w.wwww.w
w..lhldw
wwwwwwww`,
  map`
bbwwwwwwwwwb
bbw...llld1b
bbwpllld..gb
bbw.x.llldwb
bbwwwwwwwwwb`,
  map`
wwww.wwww
wg.lllddw
w..w.w..w
w.wwxwwww
...xpxld.
w.wwxwwww
w.hw.w..w
w.......w
wwww.wwww`,
  map`
wwwwww
w.p.ww
w....w
wddddw
w.w.tw
w.1.ww
w.wxhw
w.g.xw
wwwwww`,
  map`
bwwwtwwwb
bw..llldb
bw.www.wb
bw..pwtwb
bwwwww.wb
bwxg...1b
bwwwwwwwb`,
  map`
bwwwwwwwb
bwpllldwb
bwww.wwwb
bw.llldwb
bw.wwwwwb
bw.t..1wb
bwg..xh.b
bwwwwwwwb`,
  map`
bbbbbbb
bbbbbbb
bbbbbbb
bwwwwwb
bw.p.wb
bwwwwwb
bbbbbbb` // index 20, win screen
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall, black, deco1]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

// make a variable to disable movement when off
let gameRunning = 0;

// inputs for player movement control
onInput("s", () => {
  if (gameRunning == 0) {
    getFirst(player).y += 1; // positive y is downwards
    playTune(melody)
  }
});

onInput("w", () => {
  if (gameRunning == 0) {
    getFirst(player).y -= 1;
    playTune(melody)
  }
});

onInput("d", () => {
  if (gameRunning == 0) {
    getFirst(player).x += 1; // positive y is downwards
    playTune(melody)
  }
});

onInput("a", () => {
  if (gameRunning == 0) {
    getFirst(player).x -= 1; // positive y is downwards
    playTune(melody)
  }
});

onInput("k", () => {
  clearText()
  //manage timers
  clearInterval(playerTimer);
  clearInterval(countdown);
  createTimers()
  //manage variables
  count = 3
  pettedHubert = false
  bonuses = 0
  level = 0
  // bigTimer = 0 //disabled for restart punishment
  restarts += 1
  addText("3", { x: 1, y: 7, color: color`4` });
  //reset to first map
  setMap(map`
bwwwwwwb
bw....wb
bwpaagwb
bw....wb
bwwwww1b`)
}); //restart game

// these get run after every input
afterInput(() => {
  // win condition
  const reachedGoal = tilesWith(goal, player).length;

  //death tile
  const touchedDeath = tilesWith(death, player).length;

  //time reset
  const timeReseted = tilesWith(timeReset, player).length;

  //bonus counter
  const petHubert = tilesWith(hubert, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (reachedGoal == 1) {
    // increase the current level number
    level = level + 1;
    // reset hubert state (one hubert per level)
    pettedHubert = false

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);

      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);

        // Clear the existing level timer if it exists
        if (playerTimer) {
          clearInterval(playerTimer);
        }

        //reset countdown if it exists
        if (countdown) {
          clearInterval(countdown)
          count = 3
        }
        //reset timers using my nifty new function wow
        createTimers();
      }

    }
  }

  // if the player touches a ghost, lose the game
  if (touchedDeath == 1) {
    loseGame()
  }

  // if the player touches a time bonus, reset the time counters
  if (timeReseted == 1) {
    //reset intervals
    clearInterval(playerTimer);
    clearInterval(countdown);
    count = 3
    //create new timers
    createTimers();
    //play dopamine inducing sound
    playTune(timerTune)
  }

  // if the player touches a bonus chip, add one to the bonus counter
  if (petHubert == 1) {
    playTune(bonusTune)
    if (pettedHubert == false) {
      bonuses += 1
    }
    pettedHubert = true
  }

  // if the player is on the level 20 (win screen), autowin
  if (level == 20) {
    clearText()
    //stats
    addText("you win!", { y: 1, color: color`4` });
    addText("bonus:", { x: 2, y: 3, color: color`2` });
    addText("" + bonuses, { x: 12, y: 3, color: color`9` });
    addText("time:", { x: 2, y: 4, color: color`2` });
    clearInterval(gameTimer);
    addText("" + bigTimer, { x: 12, y: 4, color: color`9` });
    addText("restarts:", { x: 2, y: 5, color: color`2` });
    addText("" + restarts, { x: 12, y: 5, color: color`9` });
    /*
    rank calculation
    s rank - sub 35
    a rank - sub 40
    b rank - sub 50
    c rank - sub 60
    d rank - 60+

    if 3 bonuses are collected, move up a rank
    p rank if s rank time + 3 bonuses
    */
    if (bigTimer < 45) { //s rank
      if (bonuses >= 3) {
        addText("PERFECT!", { y: 14, color: color`H` });
        playTune(pRank);
      } else {
        addText("S RANK", { y: 14, color: color`3` });
      }
    } else if (bigTimer < 53) { //a rank
      if (bonuses >= 3) {
        addText("S RANK", { y: 14, color: color`3` });
      } else {
        addText("A RANK", { y: 14, color: color`9` });
      }
    } else if (bigTimer < 60) { //b rank
      if (bonuses >= 3) {
        addText("A RANK", { y: 14, color: color`9` });
      } else {
        addText("B RANK", { y: 14, color: color`6` });
      }
    } else if (bigTimer < 70) { //c rank
      if (bonuses >= 3) {
        addText("B RANK", { y: 14, color: color`6` });
      } else {
        addText("C RANK", { y: 14, color: color`4` });
      }
    } else if (bigTimer >= 70) { //d rank
      if (bonuses >= 3) {
        addText("C RANK", { y: 14, color: color`4` });
      } else {
        addText("D RANK", { y: 14, color: color`7` });
      }
    }
    //gameplay things
    gameRunning = 1
    if (playerTimer) {
      clearInterval(playerTimer);
      clearInterval(countdown);
    }
  }

});
  
// Start the initial timer for the first level (remove /* to activate, currently off)
let playerTimer = setTimeout(() => {
  // Stop the player after 3 seconds on the initial level
  loseGame()
}, 3000); // 3000 milliseconds = 3 seconds


//make a countdown timer
addText("" + count, { x: 1, y: 7, color: color`4` });
let countdown = setInterval(() => {
  count -= 1; // Subtract 1 from count
  addText("" + count, { x: 1, y: 7, color: color`4` });
}, 1000); // 1000 milliseconds = 1 second

//add text showing TIME vertically
addText("T", { x: 1, y: 2, color: color`2` });
addText("I", { x: 1, y: 3, color: color`2` });
addText("M", { x: 1, y: 4, color: color`2` });
addText("E", { x: 1, y: 5, color: color`2` });

//add an interval to move all enemies left every 0.5 seconds
let moveEnemies = setInterval(() => {
  const shmoovers = getAll(death);
  shmoovers.forEach(sprite => {
    sprite.x -= 1; // Move the sprite to the left
  });

  //check if the enemy is on the player
  const touchedDeath = tilesWith(death, player).length;

  if (touchedDeath == 1) {
    loseGame();
  }
}, 1000);

function createTimers() {
  gameRunning = 0; // Reset gameRunning to allow player movement
  //gameplay timer
  playerTimer = setTimeout(() => {
    loseGame()
  }, 3000); // 3000 milliseconds = 3 seconds
  //countdown timer
  addText("T", { x: 1, y: 2, color: color`2` });
  addText("I", { x: 1, y: 3, color: color`2` });
  addText("M", { x: 1, y: 4, color: color`2` });
  addText("E", { x: 1, y: 5, color: color`2` });
  addText("" + count, { x: 1, y: 7, color: color`4` });
  countdown = setInterval(() => {
    count -= 1; // Subtract 1 from count
    addText("" + count, { x: 1, y: 7, color: color`4` });
  }, 1000); // 1000 milliseconds = 1 second
}

function loseGame() {
  setMap(map`
bbbbbbb
bbbbbbb
bbbbbbb
bwwwwwb
bw.p.wb
bwwwwwb
bbbbbbb`);
  
  clearText()
  //stats
  addText("game over...", { y: 1, color: color`3` });
  addText("press k to restart", { y: 3, color: color`2` });
  addText("current deaths:" + (restarts + 1), {y:5, color: color`6`});
  
  //gameplay things
  gameRunning = 1;
  playTune(crash)
  clearInterval(playerTimer);
  clearInterval(countdown);
}

//set up a timer to track total play length
let gameTimer = setInterval(() => {
  bigTimer = bigTimer + 0.01
}, 10);
