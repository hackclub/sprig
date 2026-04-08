/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Journey to the Centre of the Earth
@author: HorseMagic
@tags: ['platformer']
@addedOn: 2025-01-17
@description: A platformer game based on the book called Journey to the Centre of the Earth. as a rat navigating through various obstacles. Jump and crouch to avoid stalagmites, stalagtights, lava, bats, and geysers, and try to reach the doors. Get the golden trophy, then complete the extra challenge!
*/

const player = "p"
const enemy = "e"
const lava = "q"
const crates = "c"
const ground = "g"
const dirt = "d"
const sky = "s"
const cloud = "a"
const playerCrouch = "w"
const rock = "m"
const caveCrystal = "x"
const cheese = "h"
const caveSky = "i"
const door = "o"
const ladder = "l"
const cradder = "r"
const enemyDown = "z"
const batAcross = "b"
const batUp = "u"
const geyser = "y"
const water = "f"

let crouching = false;
let jumping = false;
let canRestart = false;
let musicPlaying = true;
let deathCount = 0;
let batDirect = 1;
let batX = 1
let batY = 1
let waterY = 1

const jump = tune`
64.51612903225806: F4^64.51612903225806,
64.51612903225806: B4^64.51612903225806,
1935.483870967742`
const fail = tune `
125: G4^125,
125: E4^125,
125: C4^125,
3625`
const bgm = tune `
333.3333333333333: A4~333.3333333333333 + C5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: G5~333.3333333333333 + B5-333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: G5~333.3333333333333 + B5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: F5~333.3333333333333 + A5-333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333,
333.3333333333333: E4^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + D5-333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333,
333.3333333333333: E4^333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + D5-333.3333333333333,
333.3333333333333: B4~333.3333333333333 + D5-333.3333333333333 + E4^333.3333333333333,
333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333,
333.3333333333333: E4^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5-333.3333333333333`
const win = tune `
125,
125: C5~125,
125: F4~125,
125: B4~125,
125: D5~125,
125: B4~125,
125: D5~125,
125: G5~125,
3000`

setLegend(
  [player, bitmap`
................
.....9999.......
....988889......
.....5885.......
.....8338.......
...00000000.....
..0000000000....
...80000008.....
...80000008.....
...80000008.....
...8DDDDDD8.....
....DDDDDD......
....DD..DD......
....DD..DD......
....DD..DD......
....DD..DD......`],
  [playerCrouch, bitmap`
................
................
................
................
................
................
................
......9999......
.....958859.....
......8338......
....00000000....
....80000008....
....80000008....
.....DDDDDD.....
.....DDDDDD.....
....8DD.8DD.....`],
  [enemy, bitmap`
................
................
......3.........
......33........
......33........
.....333........
.....333........
.....3333.......
.....3333.......
.....3333.......
....33333.......
....333333......
...33333333.....
...33333333.....
.33333333333....
3333333333333...`],
  [enemyDown, bitmap`
3333333333333...
.33333333333....
...33333333.....
...33333333.....
....333333......
....33333.......
.....3333.......
.....3333.......
.....3333.......
.....333........
.....333........
......33........
......33........
......3.........
................
................`],
  [lava, bitmap`
................
9......9....93..
9.39.39993.99969
9999999699939999
9693999939999999
9999993999999999
9999999999999399
9939999999939999
9999993999999999
9999999999999999
9999399399999999
9999999999939999
9939999999999999
9999399999999939
9999999399999999
9999999999999999`],
  [crates, bitmap`
CCCCCCCCCCCCCCCC
CC9999CCCC9999CC
C9C99C9CC9C99C9C
C99CC99CC99CC99C
C99CC99CC99CC99C
C9C99C9CC9C99C9C
CC9999CCCC9999CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC9999CCCC9999CC
C9C99C9CC9C99C9C
C99CC99CC99CC99C
C99CC99CC99CC99C
C9C99C9CC9C99C9C
CC9999CCCC9999CC
CCCCCCCCCCCCCCCC`],
  [ground, bitmap`
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDCCDCDCDCCDCD
CDDCCCCDCCCCCDCC
CCCCCCCCCCCCCCCC
CCCLCCCCCCCCCCCC
CCCCCCCCLCCCCCCC
CCCCCCCCCCCCLCCC
CCCCCCCCCCCCCCCC
CCCLCCCCCCCCCCCC
CCCCCCCLCCCCCLCC
CCCCCCCCCCCCCCCC
CCLCCCCLCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCLCCCCCCCCCC
CCLCCCCCCCCCCLCC
CCCCCCCCLCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCLCCLCCCCCC
CCCCCCCCCCCCCCLC
CCCLCCCCCCCCCCCC
CCCCCCCCCCCCLCCC
CCCCCCCLCCCCCCCL
CCCLCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCLCCCCCCC
CCCLCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [sky, bitmap`
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
7777777777777777`],
  [cloud, bitmap`
7777777777777777
7777777777777777
7777777777722777
7772227777222277
7722222777777777
7777777777777777
7777777777777777
7777777777777777
7777777777222277
7777777772222227
7777277777777777
7772227777777777
7777777777222277
7777777772222277
7777777777777777
7777777777777777`],
  [rock, bitmap`
1111111111111111
1111111111111111
11111L1111111111
1111111111111111
1111111111L11111
1111111111111111
111111111111111L
1111111111111111
1L11111111L11111
1111111111111111
1111111111111111
111111111111111L
11L1111111111111
11111L1111111111
1111111111111111
1111111111111111`],
  [caveCrystal, bitmap`
LLLLLL000LLLLLLL
LLLLL00700LLLLLL
LLLL0077700LLLLL
LLLL0527270LLLLL
L00005272700000L
L05505272700220L
L05555272707220L
L05255272777770L
L05775272777770L
L05775272777700L
L0557527277770LL
L0055577277700LL
LL00555557700LLL
LLL001111100LLLL
LLLLL11111LLLLLL
LLLLLLLLLLLLLLLL`],
  [caveSky, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L4LLLLLLLLLLLLLL
LDLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL9LLL
LLLLLLLLLLLL3LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL7LLLLLLLLLLL
LLLL5LLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [cheese, bitmap`
...7...7.7......
.....7..7.......
....7.7.........
.......7........
...9696969......
...9696969......
...9699969......
...9969699......
....96969.......
....99999.......
.....999........
......9.........
......9.........
......9.........
.....999........
....99999.......`],
  [door, bitmap`
......CCCC......
....CCCCCCCC....
...CCC1111CCC...
...CC111111CC...
..CC11111111CC..
..CC11111111CC..
..CCCCCCCCCCCL..
..CCCCCCCCCCCC..
..CC66CCCCCCCC..
..CC66CCCCCCCL..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCL..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..`],
  [ladder, bitmap`
CCCCFCCCCCCFCCCC
CCCCFCLCCCCFCLCC
CCLCFFFFFFFFCCCC
CCCCFLCCCLCFCCCC
CCLCFCCCCCCFCCLC
CCCCFFFFFFFFCCCC
CCCCFCCCLCCFCCCC
CCCCFCCCLCCFCLCC
CCLCFFFFFFFFCCCC
CCCCFCCCCLCFCCCC
CCCCFCCCCCCFCCCC
CCLCFFFFFFFFCLCC
CCCLFCCCCCCFCCCC
CCCCFCCCLCCFCCCL
LCCCFFFFFFFFCCCC
CCCCFCLCCCCFCCCC`],
  [cradder, bitmap`
1111FFFFFFF11111
11L1F1111LF11111
1111F11111F11111
1L11FFFFFFF11L11
1111F1L111F11111
1111F11111F11111
1L11FFFFFFF1111L
1111F11L11F11L11
1111F11111F11111
1111FFFFFFF11111
11L1F1111LF11111
1111F11111F11111
1111FFFFFFF1L1L1
1111F11L11F11111
11L1F11111F11111
1111FFFFFFF11111`],
  [batAcross, bitmap`
................
................
................
..0.........0...
..00..0.0..00...
..000.0.0.000...
...000303000....
...000000000....
....0000000.....
....0000000.....
.....00000......
.......0........
................
................
................
................`],
  [batUp, bitmap`
................
................
................
..0.........0...
..00..0.0..00...
..000.0.0.000...
...000303000....
...000000000....
....0000000.....
....0000000.....
.....00000......
.......0........
................
................
................
................`],
  [geyser, bitmap`
................
................
................
......LLL.......
...CCLCLLLCC....
.CCLLCLCLCLLCC..
CCLCCCLCCLCCLCC.
CLCCCCLCCLCCCLCC
CCCCCLCCCCLCCCLC
CCCCCLCCCCCCCCCC
CCCCLCCCCCCCCCCC
CCCCLCCCCLCCCCLC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCLCCCCCLCCCCCLC
CCCCCCCCCCCCCCCC`],
  [water, bitmap`
......22722.....
....22775722....
.....275552.....
......75577.....
.......777......
........7.......
.......27.......
........7.......
........7.......
........72......
........7.......
........2.......
........72......
.......57.......
.......575......
.......575......`],
)

setSolids([player, playerCrouch, dirt, ground, crates, rock, ladder, cradder, geyser])
let playback = playTune(bgm, Infinity)

let level = 0
const levels = [
  map`
...a......
.....a..a.
.a.......g
........ad
....ag...d
p...gd...d
gg.gdd..od
ddgdddggld`,
  map`
dlddmddddm
dp.mmmdmdd
dd.m.....m
m..m...m.d
m.mmm..d.d
d.....mm.m
mm.e.mme.o
mmmdmmdmmm`,
  map`
mmmmmmmmmm
mmmmz....m
mmz....e.m
m....mqm.m
m...mmmm.m
mm..m....m
p..mo....m
mmmmrmqmqm`,
  map`
dmmmrdmmmm
m...pmz..m
m.mmmm...o
m.mmmm...m
m.mzzmm..m
d.......mm
m.....emmm
mqmqqmmmmm`,
  map`
dmmdmmmmmd
d...z....m
p...b....m
mmmmmmqm.d
dmo...mz.m
mmrmef...m
dmrdmymmqm
mmrmmmmmmm`,
  map`
mmrdmmmmmm
m.pmz...zm
m.m...ef.m
m....mmy.m
mqmmqmmm.m
mdmmdz...m
mo.....bmm
mrmmmmmqmm`,
  map`
mrmmmmmmmm
mr......om
mr...mmmrm
mrm....mrm
mrzm..fmrm
mr....ymrm
mr...mmmrm
mrm...zmrm
mp..meemrm
mmmmmmmmrm`,
  map`
mmmmmmmmmrm
mzzzzzm..pm
m.....m.mmm
m.m...m...m
m.m..mmum.m
m.mm..mqm.m
m...m..m..m
mqm.om...bm
mmmmrmmmmqm`,
  map`
mmmmrmmmmm
mz..pmmmmm
m...mmz..m
m.mdm....m
mf.....m.m
my..bumz.m
dmmqqmmeom
dmmmmdmmlm`,
  map`
mmmddmmmdld
m...zzz..pm
m.m......mm
m..m....mdm
mf..mqqqd.m
mym.mdddm.m
mmm......uo
mmmqmmmmmmm`,
  map`
mmmmmmmmmmmmmmmm
m..b...........m
m....mmmmmmm.m.m
mf.mm......mum.m
my.....m..emqm.m
mmmmmm....mmmm.m
zzz.....m......m
mmm...m........m
p...m.........om
mmmmmqqqqqqqqqrm`,
  map`
mmmmmmmmmmmmmmrm
mmdzdmzz......rm
mzz.........f.pm
m......b.m..y.mm
o...um...z..m.zm
mm...z......z..m
m..............m
mqqqqqqqqqqqqqqm
mmmmmmmmmmmmmmmm`,
  map`
mmmmmmmmmmmmmmmm
mzz.zz......zzzm
m.........e....m
m........mmm...m
m.me.....zzmme.p
mummmm.....zmmmm
m..hbme.....zzzm
mmmmmmmqqqqqqqqm`,
]

setMap(levels[level])
if (level == 1 || level == 3 || level == 4 || level == 5 || level == 6 || level == 7 || level == 8 || level == 9 || level == 10 || level == 11 || level == 12) {
  setBackground(caveSky)
} else {
  setBackground(sky)
}

let gravity = 1;

function isGroundBelow(playerX, playerY) {
  const belowTile = getTile(playerX, playerY + 1);
  return belowTile.some(sprite => sprite.type === ground);
}

function isTouchingEnemy(playerX, playerY) {
  const frontTile = getTile(playerX, playerY);
  return frontTile.some(sprite => sprite.type === enemy || sprite.type === lava || sprite.type === enemyDown || sprite.type === batUp || sprite.type === batAcross || sprite.type === water);
waterY = 1
  batX = 1
  batY = 1
}


function isTouchingCheese(playerX, playerY) {
  const frontTile = getTile(playerX, playerY);
  return frontTile.some(sprite => sprite.type === cheese);
}

function applyGravity(playerSprite) {
  if (!isGroundBelow(playerSprite.x, playerSprite.y)) {
    playerSprite.y += gravity;
  }
}

function death() {
  setMap(levels[level]); // oop u died
  playTune(fail);
  deathCount++;
  waterY = 1
  batX = 1
  batY = 1
}

function generateElement(levelID) {
  clearText()
  addText("Level: " + (level + 1), {
    x: 0,
    y: 15,
    color: color`2`
  })
  if (level == 0) {
    addText("Welcome", {
      x: 4,
      y: 4,
      color: color`3`
    })
  }
  }
  if (level == 1) {
    addText("Good luck!", {
      x: 5,
      y: 7,
      color: color`6`
    })
  }

generateElement(level)

onInput("w", () => {
  const playerSprite = getFirst(player);
  if (!jumping) {
    jumping = true;
    playerSprite.y -= 1; // weeeee
    playTune(jump)
    setTimeout(() => {
      playerSprite.y += 1; // waaaaa
      jumping = false;
      if (isTouchingEnemy(playerSprite.x, playerSprite.y)) {
        death()
      }
    }, 500);
  }
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  playerSprite.x -= 1; // Move left
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  playerSprite.x += 1; // Move right
});

onInput("s", () => {
  // Check if the current sprite is the player sprite
  if (getFirst(player)) {
    // Replace the player's sprite with the crouching sprite
    getFirst(player).type = playerCrouch;
    setTimeout(() => {
      getFirst(playerCrouch).type = player;
    }, 500);
  }
});

onInput("j", () => {
  if (canRestart) {
    level = 0;
    setMap(levels[level]);

    if (level == 1 || level == 3 || level == 4 || level == 5 || level == 6 || level == 7 || level == 8 || level == 9 || level == 10 || level == 11 || level == 12) {
      setBackground(caveSky)
    } else {
      setBackground(sky)
    }
    generateElement(level)
  }
});

afterInput(() => {

  const playerSprite = getFirst(player);
  if (playerSprite) {
    const playerX = playerSprite.x;
    const playerY = playerSprite.y;

    if (playerY === height() - 1) {
      setMap(levels[level]);
    }

    if (playerX === width() - 1) {
      if (levels[level + 1]) {
        level++;
        setMap(levels[level]);

        if (level  == 1 || level == 2 || level == 3 || level == 4 || level == 5 || level == 6 || level == 7 || level == 8 || level == 9 || level == 10 || level == 11 || level == 12) {
          setBackground(caveSky)
        } else {
          setBackground(sky)
        }
        generateElement(level)
      }
    }

    if (!jumping) {
      applyGravity(playerSprite);
    }

    if (isTouchingEnemy(playerSprite.x, playerSprite.y)) {
      death()
      waterY = 1
      batY = 1
      batX = 1
    }

    if (isTouchingCheese(playerSprite.x, playerSprite.y)) {
      playTune(win)
      addText("You win!", {
        x: 1,
        y: 1,
        color: color`4`
      })
      const cheesess = getFirst(cheese)
      cheesess.remove()
      setTimeout(() => {
        addText("Press j to restart!", {
          x: 1,
          y: 14,
          color: color`4`
        })
        addText("You died " + deathCount + " time(s)!", {
          x: 0,
          y: 1,
          color: color`3`
        })
        deathCount = 0;
        canRestart = true;
      }, 3000);
    }
  }
})

afterInput(() => {
  
  if (tilesWith(batAcross) < 1) {
  } else {  
    if (batX < 3) {
    batX = batX + 1;
    getFirst(batAcross).x -= 1;
  } else {
    if (batX > 3) {
      batX = 1
      getFirst(batAcross).x += 1;
    }else{
      if (batX > 2) {
      batX = batX + 1;
      getFirst(batAcross).x += 1;
      }
    }
  } 
  }
})

afterInput(() => {
if (tilesWith(batUp) < 1 ) {
  } else {
  if (batY < 3) {
    batY = batY + 1;
    getFirst(batUp).y -= 1;
  } else {
    if (batY > 3) {
      batY = 1
      getFirst(batUp).y += 1;
    }else{
      if (batY > 2) {
      batY = batY + 1;
      getFirst(batUp).y += 1;
      }
    }
  } 
}
})

afterInput(() => {
if (tilesWith(water) < 1 ) {
  } else {
  if (waterY < 3) {
    waterY = waterY + 1;
    getFirst(water).y += 1
  } else {
    if (waterY > 3) {
      waterY = 1
    getFirst(water).y -= 1
    }else{
      if (waterY > 2) {
      waterY = waterY + 1;
      getFirst(water).y -= 1
        } else {
    
      
    }
  } 
}
}
})


onInput("i", () => {
  if (musicPlaying) {
    playback.end(); // Stop the music
    musicPlaying = false;
  } else {
    playback = playTune(bgm, Infinity); // Start the music
    musicPlaying = true;
  }
  console.log(musicPlaying);
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with door
  const targetNumber = tilesWith(door).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(door, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    waterY = 1
    batY = 1
    batX = 1

    if (level  == 1 || level == 2 || level == 3 || level == 4 || level == 5 || level == 6 || level == 7 || level == 8 || level == 9 || level == 10 || level == 11 || level == 12) {
          setBackground(caveSky)
        } else {
          setBackground(sky)
        }
        generateElement(level)
  

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});