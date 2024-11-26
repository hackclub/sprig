/*
@title: Runaway
@author: Theenash Muneeswaran
@tags: []
@addedOn: 2024-07-08


Welcome to Runaway!
There is a ghost that wants to be friends with you, but it does not know it's 
own power as it has enough power to scare you to death.
Here you will have to runaway from the ghost because he is chasing you 
wanting to be friends, and to exit, you will have 
to go through the door in each level and avoid landmines!
The ghost will teleport randomly to scare you.
But sometimes he will teleport right next to you and scare you to death.
You are the person with the yellow face.
The ghost is the one with a white body
Thats it.
*/



const player = "p"
const bomb = "b";
const goal = "g";
const wall = "w";
const background = "k"
const enemy = "e"
const bgm = tune`
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + A4^277.77777777777777 + C5~277.77777777777777 + F5^277.77777777777777,
277.77777777777777: C5~277.77777777777777 + B5/277.77777777777777 + C4~277.77777777777777 + E5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777 + D5^277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777 + E5^277.77777777777777 + C4~277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: C5~277.77777777777777 + B5/277.77777777777777 + F5^277.77777777777777 + C4~277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5~277.77777777777777 + B5/277.77777777777777 + F5^277.77777777777777 + C4~277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + F5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + E5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + D5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + D5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + D5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + E5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + F5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + F5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + G5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + G5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + E4-277.77777777777777 + C5~277.77777777777777 + B5/277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + E5^277.77777777777777,
277.77777777777777: D4/277.77777777777777 + F4-277.77777777777777 + A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5~277.77777777777777 + C4~277.77777777777777 + B5/277.77777777777777 + E5^277.77777777777777`



const playback = playTune(bgm, Infinity)



setLegend(
  [player, bitmap`
.....000000.....
....00666600....
...0660606660...
...0666060660...
...0666000660...
0...000000000...
000.....0.......
..00...00.....00
...000000000000.
.......0........
.......0........
......00........
.....0000.......
....00..0.......
..00....0.......
.00....00.......`],
  [bomb, bitmap`
7777000000007777
7770000000000777
7700000000000077
7000033333300007
0000333333330000
0003330000333000
0003300000033000
0003300330033000
0003300330033000
0003300000033000
0003330000333000
0000333333330000
7000033333300007
7700000000000077
7770000000000777
7777000000007777`],
  [goal, bitmap`
777CCCCCCCCCC777
777C22222222C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C2CCCCCC2C777
777C22222222C777
777CCCCCCCCCC777`],
  [wall, bitmap`
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
  [enemy, bitmap`
................
.....00000......
....0222220.....
...022222220....
...020222020....
...002020200....
...020222020....
...022222220....
..02222222220...
..02222222220...
..02222222220...
..02222222220...
.0202220222020..
.00.020.020.00..
.0...0...0...0..
................`],
  [background, bitmap`
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
7777777777777777`], );

setBackground(background)

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwewkkkbkkk
kkkkwpwwwwwwwk
kwkkkkkkkbkkwk
kwkwwbwwwkwwwk
kwkwkkkkwwwkkb
kwkwwwwkkkwkkk
kwkkkkkkkwwwwk
kwwwwwwwbkkwwk
kkkkkkkwwkkkkk
wwwwbwkbwkwwww
kkkkkwkkkkkkgk`,
  map`
kekbkkkkwkkwww
pwwwwkkkkwwkkk
kwkkwkkwkbbkwk
kwkbwkkwkkkkwk
kwwkwkkwkwwwkk
kkkkkkkkbkkwkw
wwwkwwwwwwkwkk
kkkkwkwkkkkwwk
kkwwbkbkwkwkbk
kwkkkwkkwkkkwk
kkkwkkkwwbbkkg`,
  map`
kekkkkbkwwwwww
pwbwwbkkkkkkkk
kbkkwwwwkwwkkk
kkwkwkwwkwbkkb
kkkkkkkbkkkwkw
kwwkbkbkkbbkkk
wwkkbkwwkkbkww
kkwkwwkkkkwkbb
bkwkkkkwwwwkbb
kkkkwbkwbbbkkg
wkkkkwkkkkbkkb`,
  map`
gkbkbkkkbkkkbg
kbbkkkbkkkbkkb
bkkwkwwwwwwkkk
kkbwkkekkwkkbk
kkkkkwkwkwkwkk
bkkwkkpkkwkwkb
kkkwkwkwkwkwkk
bwkwkkkkkkkwbk
kwbwbbbbbbkwkk
kwbwwwwwwwkwkk
gkkbbkkkkbkkbg`,
  map`
ebgkkbkkkkbbbb
kbbbkbkbbkkkbb
pbkbkkkbkkkbbb
kbbbbkbkkkkkkk
kkkkbkbkbbbbkb
kbbkbbkkbkkkkk
kbkkkkkkbbbkbk
kbbbbkkbbkkkkk
kkkkbbkbkkkbkb
kbbbbkkbbbbbbb
kkkkkkkkbkkkkk`,
  map`
wwkkwkbkkkkkkbkwkkkbwkw
kkkbbkkbkwwwkkkwkwkkwkk
bbkwwwwkkkwkkbkkkwkkkkw
ekwkkkbkbkwkwkkbkbkwkkk
kwkkwwwkkkkwwkkkbbwwkkb
pwbkkkkwwwkkkwwbkbbbwkk
kwkkkkwkkkwkkkkkwkwkwkb
kkkkwkkbkkwwwkbkkkwkkkk
kwbkkkkkwkkwwkkkbbwbkwk
kwkwkkwkkwkkkkwwwwbwkwk
wwbkkkkwwwwkwbwwwwwkkww
kkbwkwkwbkkkwkkbkbkkkkw
wkkkkwbbwbkkkwwkbkkwkkk
wwkkkkwkwkbbkkkwwkwkkwb
bkkwkkbkkwkkkwbwwkkkkkk
kkbbwkkkwwkwkkkwkkkwbbw
kkkbkkkbwkkkwkwkkwbbbkk
kbkkkbkwkkkwwkwwkwbkkkw
kkwkkbkkkbkbwwkwkkkkgkb
kkwwkkkbkkkwkwwkkkbwkkw
kwkkwkbwkbwkkwkbbbbbbbk`,
  map`
pkkekkwkwkkwwwkwwkwkkkk
kkwkkkkwwkwwkkkkkwkkwkk
bkkbkkkwwwwkkkwkkwkkwbk
bbkkkkbkwkkkwkkkkwkwwbk
kbwbkkwkkkwkbkwkwkkwkwk
wkbkkkwwkkkwbkkwwkkbkwk
kwkkwwbkkkkkkbkwkkwwbkk
kkkkkkkwkkbwwbkwwkwkkkk
kkwkbkkbkwwbkwkwkkwwkww
kwbkbbbkkkbkkkkwwkkwkbw
kwbbwkwkwwkkwkkbkbkwkwb
kkwwkwkkkbkkwwbbwkkwkkk
kwwwkbkkkkwkkkkwbkkwbkk
kkkkbkwkkkwwwwkkwwkwkwk
wkkkkkkwkkwwwkkkwwkwkwk
kwwwkkkwwkwkkbkkwbkwkkk
kwwkbkkbkkkkkbkkkwkkwbk
kwbbkkwwwkkwbkbwkkbkwkk
kbbbkbwkkkwwkkkbbkbkwkk
kbkkkkwkkwwwkwkkkkkkwkk
wkkkkkkkkkkkbbkkkbbkwkg`,







];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, wall]); // collison prevention

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// player movement
onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
});

onInput("a", () => {
  getFirst(player).x -= 1; // positive y is downwards
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get map 1 of the level

  // make sure there is a level before loading it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// run every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;

  // count the number of tiles with doors and boxes
  const boxedCovered = tilesWith(goal, player).length;
  const bombCovered = tilesWith(bomb, player).length;

  //die
  if (bombCovered === 1) {
    clearText("")
    addText("Game Over!", { x: 3, y: 3, color: color`2` })
    setMap(levels[0])
    setTimeout(function() {
      clearText("")
    }, 1000);
  }








  // Enemy chasing logic
  afterInput(() => {
    const playerSprite = getFirst(player);
    const enemySprite = getFirst(enemy);
    setTimeout(() => {
      if (playerSprite.x < enemySprite.x) {
        setTimeout(() => {
          enemySprite.x -= 1; // Move left towards player
        }, 1);
      } else if (playerSprite.x > enemySprite.x) {
        setTimeout(() => {
          enemySprite.x += 1; // Move right towards player
        }, 1);
      }

      if (playerSprite.y < enemySprite.y) {
        setTimeout(() => {
          enemySprite.y -= 1; // Move up towards player
        }, 1);
      } else if (playerSprite.y > enemySprite.y) {
        setTimeout(() => {
          enemySprite.y += 1; // Move down towards player
        }, 1);
      }
    }, 1000);

  });


  //die with ghost
  if (tilesWith(enemy, player).length > 0) {
    clearText("")
    addText("Game Over!", { x: 3, y: 3, color: color`2` })
    setMap(levels[0])
    setTimeout(function() {
      clearText("")
    }, 1000);
  }





  if (boxedCovered === 1) {
    // increase the current level numbers
    level = level + 1;

    const currentLevel = levels[level];

    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", { x: 3, y: 3, color: color`2` });
      playback.end()
    }
  }
});
