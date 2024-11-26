/*
@title: Find-Tommy!
@author: Mysteryman386
@tags: []
@addedOn: 2024-11-20
*/

const player = "p"
const tommy = "t"
const box = "b"
const key = "k"
const keyBox = "a"
const lockedDoor = "l"
const tommyBox = "s"
const brickWall = "w"
const coin = "c"
const coinBox = "C"
const civ1 = "1"
const civ2 = "2"
const civ3 = "3"
const civ4 = "4"
const civ5 = "5"
const civ6 = "6"
const civ7 = "7"
const civ8 = "8"
const civ9 = "9"
const civ0 = "0"

const select = tune`
73.71007371007371: C5~73.71007371007371,
73.71007371007371: G5~73.71007371007371,
2211.3022113022116`
const hammer = tune`
41.78272980501393: C4/41.78272980501393,
41.78272980501393: C4-41.78272980501393,
1253.481894150418`
const step = tune`
500: C5^500,
15500`
const unlockSound = tune`
37.5: C4/37.5 + D4/37.5,
37.5: C4/37.5,
1125`
const coinSound = tune`
62.76150627615063: C4^62.76150627615063,
62.76150627615063: C4-62.76150627615063,
1882.8451882845188`

let timerVariable = 0; // Variable to store the incremented value
let intervalId; // Variable to store the interval ID
let moves = 0; // Variable to store amount of times moved
let keySelected = 0;
let coinCount = 0;
let tempCoinCount = 0;

// Function to start the timer and increment the variable every second
function startIncrementingTimer() {
  intervalId = setInterval(() => {
    timerVariable++; // Increment the variable by 1 every second
    console.log("Timer Variable: " + timerVariable);
  }, 1000); // 1000 milliseconds = 1 second
}

// Function to stop the timer
function stopIncrementingTimer() {
  clearInterval(intervalId); // Clear the interval to stop incrementing the variable
  console.log("Incrementing timer stopped!");
}

// Example usage:

// After some time or based on game conditions, you can stop the incrementing:
// stopIncrementingTimer(); // This will stop the incrementing behavior

function isPlayerOverTommy() {
  if (getFirst(player) && getFirst(tommy)) {
    if (getFirst(player).x === getFirst(tommy).x && getFirst(player).y === getFirst(tommy).y) {
      console.log("Player is over Tommy");
      return true;
    } else {
      console.log("Player is NOT over Tommy");
      return false;
    }
  } else {return false;}


}


function isPlayerOverTommyBox() {
  if (getFirst(player) && getFirst(tommyBox)) {
    if (getFirst(player).x === getFirst(tommyBox).x && getFirst(player).y === getFirst(tommyBox).y) {
      console.log("Player is over TommyBox");
      return true;
    } else {
      console.log("Player is NOT over TommyBox");
      return false;
    }
  }
  else{
      console.log("no tommyBox detected");
    return false;
  }
}

function isPlayerOverkeyBox() {
  if (getFirst(player) && getFirst(keyBox)) {
    if (getFirst(player).x === getFirst(keyBox).x && getFirst(player).y === getFirst(keyBox).y) {
      console.log("Player is over keyBox");
      return true;
    } else {
      console.log("Player is NOT over keyBox");
      return false;
    }
  }
  else{
      console.log("no keyBox detected");
    return false;
  }
}

function isPlayerOverkey() {
  if (getFirst(player) && getFirst(key)) {
    if (getFirst(player).x === getFirst(key).x && getFirst(player).y === getFirst(key).y) {
      console.log("Player is over key");
      return true;
    } else {
      console.log("Player is NOT over key");
      return false;
    }
  }
  else{
      console.log("no key detected");
    return false;
  }
}


function isPlayerOvercoinBox() {
  if (getFirst(player) && getFirst(coinBox)) {
    if (getFirst(player).x === getFirst(coinBox).x && getFirst(player).y === getFirst(coinBox).y) {
      console.log("Player is over coinBox");
      return true;
    } else {
      console.log("Player is NOT over coinBox");
      return false;
    }
  }
  else{
      console.log("no coinBox detected");
    return false;
  }
}

function isPlayerOverCoin() {
  if (getFirst(player) && getFirst(coin)) {
    if (getFirst(player).x === getFirst(coin).x && getFirst(player).y === getFirst(coin).y) {
      console.log("Player is coin key");
      return true;
    } else {
      console.log("Player is NOT coin key");
      return false;
    }
  }
  else{
      console.log("no coin detected");
    return false;
  }
}

setLegend(
  [player, bitmap`
....000000......
..0000000000....
..00......00....
.00.22.....00...
.00222.....00...
.0022......00...
.00........00...
.00........00...
.00........00...
..00......00....
..00000000000...
....000000000...
..........0000..
...........0000.
............0000
.............000`],
  [tommy, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....36666663....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....`],
  [box, bitmap`
0000011221100000
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF111111FFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000000000000`],
  [tommyBox, bitmap`
0000011221100000
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF111111FFFF0
0FFFFFFFFFFFFFF0
0F6666666FFFFFF0
0F6666666DDDDDF0
0F6666666FFDFFF0
0FFF666FFFFDFFF0
0FFF666FFFFDFFF0
0FFF666FFFFDFFF0
0FFF666FFFFDFFF0
0FFF666FFDDDFFF0
0FFFFFFFFFFFFFF0
0000000000000000`],
  [brickWall, bitmap`
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C
1111111111111111
CC1CC1CC1CC1CC1C`],
  [civ1, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666766...
...6666667776...
...6666666766...
...6606666606...
...6660666066...
....66600066....
....06666660....
....02223220....
....00003000....
....00003000....
....00000000....
....00000000....`],
    [civ2, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...3333333333...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....36666663....
....33334333....
....33334333....
....33334333....
....33334333....
....33334333....`],
    [civ3, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....C666666C....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....`],
    [civ4, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....36666663....
....33333333....
....33555553....
....33335333....
....33555333....
....33333333....`],
    [civ5, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6363663636...
...L333LL333L...
...6636666366...
...6606666606...
...6660666066...
....66600066....
....36666663....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....`],
    [civ6, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...3111661113...
...6113333116...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....36666663....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....`],
    [civ7, bitmap`
....LLLLLLLL....
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....36666663....
....33330333....
....32330323....
....32330323....
....33330333....
....33330333....`],
    [civ8, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....F666666F....
....FFFFFFFF....
....333FF333....
....33FFFF33....
....333FF333....
....33333333....`],
    [civ9, bitmap`
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....26666662....
....02222220....
....00006000....
....00000000....
....00006000....
....00000000....`],
    [civ0, bitmap`
....99922999....
...9999229999...
...9999229999...
...6666666666...
...6606666066...
...6666666666...
...6666666666...
...6606666606...
...6660666066...
....66600066....
....26666662....
....222222222...
....99992999....
....99992999....
....22222222....
....99992999....`],
  [key,bitmap`
........66666666
........66666..6
........66666..6
........66666666
.......666FFFF66
......6666666666
.....66666666666
....666666666666
...6666666......
..666666........
.6666666........
66666...........
66666...........
6666............
66..............
66..............`],
  [keyBox,bitmap`
0000011221100000
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF111111FFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FF66666FFFFFFF0
0F6666666FFFFFF0
0F600000666666F0
0F600000666666F0
0F6000006FF666F0
0F6666666FF6F6F0
0FF66666FFF6F6F0
0FFFFFFFFFFFFFF0
0000000000000000`],
  [lockedDoor,bitmap`
CCCCCCC00CCCCCCC
CCCCCCC00CCCCCCC
CCCCCCC00CCCCCCC
CCCCCCC00CCCCCCC
CCCCCCC00CCCCCCC
CCCC66C00C66CCCC
CCCC66C00C66CCCC
CCCCCFC111FCCCCC
CCCCCFF1FFFCCCCC
CCCCCCC101CCCCCC
CCCCCCFFFFFCCCCC
CCCCCCF666FCCCCC
CCCCCCF666FCCCCC
CCCCCCF666FCCCCC
CCCCCCFFFFFCCCCC
CCCCCCC00CCCCCCC`],
  [coin,bitmap`
....FFFFFFFF....
...F66666666F...
..F6666666666F..
.F666666666666F.
F6666FFFFFF6666F
F666FFFFFFFF666F
F666FF6FF6FF666F
F666FFFFFFFF666F
F666FF6FF6FF666F
F666FFF66FFF666F
F6666FFFFFF6666F
F66666FFFF66666F
.F6666FFFF6666F.
..F666FFFF666F..
...F66666666F...
....FFFFFFFF....`],
  [coinBox,bitmap`
0000011221100000
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF112211FFFF0
0FFFF111111FFFF0
0FFFFFFFFFFFFFF0
0FFFFF6F6FFFFFF0
0FFF6666666FFFF0
0FFF6F6F6FFFFFF0
0FFF6666666FFFF0
0FFFFF6F6F6FFFF0
0FFF6666666FFFF0
0FFFFF6F6FFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000000000000`]
)

setSolids([box, player, brickWall,lockedDoor])

let level = 0
const levels = [
  map`
...
p..
t..`,
  map`
p..9
..34
.16t
8275`,
  map`
p..0.
..wc.
..wb.
0Cw..
.9wt.`,
  map`
p...0.
w..b.b
w.b.b0
w.b..b
wb.t.C
wb.b.b`,
  map`
.0....0
b..0p..
..b...0
ab...b.
..wlw..
0bwswb.
.bw.w.C`,
  map`
p.....0.
....0b..
..b....0
.b..b..0
....b0.0
...bbbbb
..b..s.b
...bC.b0`,
  map`
....0wb....
.ww.....bpb
.w.wwwwwwww
.w...w....k
.w.w.wC....
.9.w5......
wwwwwwwwlww
......4....
...8......7
......t....
.0b......0b`,
  map`
...w.......C
b.tw..9...1.
..8w..4....2
....6.......
wwwwwwwlwwww
............
p...........
............
............
............
....0a.b0...
............`
]



// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

addText("Select Tommy\nWasd to move\nJ to select\nK to restart", {
  x: 3,
  y: 0,
  color: color`3`
})


setMap(levels[level])

setPushables({
  [player]: [box]
})



onInput("w", () => {
  getFirst(player).y -= 1
  playTune(step)
  if (level > 0) {
    moves = moves + 1;
  }
})
onInput("s", () => {
  getFirst(player).y += 1
  playTune(step)
  if (level > 0) {
    moves = moves + 1;
  }
})
onInput("a", () => {
  getFirst(player).x -= 1
  playTune(step)
  if (level > 0) {
    moves = moves + 1;
  }
})
onInput("d", () => {
  getFirst(player).x += 1
  playTune(step)
  if (level > 0) {
    moves = moves + 1;
  }
})
onInput("j", () => {
  playTune(select)
  if (isPlayerOverkey()){
   keySelected = keySelected+1;
    getFirst(lockedDoor).remove();
    getFirst(key).remove();
    playTune(unlockSound)    
  }

    if (isPlayerOverCoin()){
   tempCoinCount = tempCoinCount + 1;
    getFirst(coin).remove();
    playTune(coinSound)    
  }
  

  if (isPlayerOverTommy()) {
      if (level == 0) {
        startIncrementingTimer(); // Start incrementing the variable every second
      }
      level = level + 1;
      keySelected = 0;
    coinCount = coinCount + tempCoinCount;
    tempCoinCount = 0;
          console.log("coin count: "+coinCount);

      clearText();

      const currentLevel = levels[level];

      // make sure the level exists and if so set the map
      // otherwise, we have finished the last level, there is no level
      // after the last level
      if (currentLevel !== undefined) {
        setMap(currentLevel);
      } else {
        addText("you win!\nTime elapsed:\n" + timerVariable + " seconds\nTimes moved:\n" + moves + "\ncoins found:\n" + coinCount, { x: 3, y: 4, color: color`0` });
        stopIncrementingTimer(); // This will stop the incrementing behavior

      }

  }
})

onInput("l", () => {
  playTune(hammer)
  if (isPlayerOverkeyBox()){
              // Create a new sprite of type key at the same position
      addSprite(getFirst(keyBox).x, getFirst(keyBox).y, key);
      // Remove the keybox sprite from the game
      getFirst(keyBox).remove();
  }
  if (isPlayerOverTommyBox()) {
          // Create a new sprite of type tommy at the same position
      addSprite(getFirst(tommyBox).x, getFirst(tommyBox).y, tommy);
      // Remove the tommybox sprite from the game
      getFirst(tommyBox).remove();

  }
    if (isPlayerOvercoinBox()){
              // Create a new sprite of type coin at the same position
      addSprite(getFirst(coinBox).x, getFirst(coinBox).y, coin);
      // Remove the coinbox sprite from the game
      getFirst(coinBox).remove();
  }
  
})
onInput("k", () => {
  const currentLevel = levels[level]; // get the original map of the level
  keySelected = 0;
  tempCoinCount = 0;

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
    if (level === 2) {
    addText("Brick walls\nare solid\nmove around them", {
      x: 2,
      y: 0,
      color: color`0`
    })
    }
    if (level === 3) {
    addText("these boxes\ncan be pushed\n", {
      x: 2,
      y: 0,
      color: color`0`
    })
    }

  
  if (level === 4) {
    addText("L to search\nboxes and\nreveal Tommy!", {
      x: 2,
      y: 0,
      color: color`0`
    })

  }

})
