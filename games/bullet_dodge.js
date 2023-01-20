/*
@title: bullet-dodge
@author: vishram1123

Controls:
  W/A/S/D to move up/left/down/right
  J to activate time warp powerup
  I to activate heal powerup

Rules:
  Bullets will shoot in from all sides. 
  Avoid these by moving your heart around. If you get hit by one, you will lose 1 HP. You start with 13 HP.
  Going down to 0 HP will result in you losing the game.
  Using the time warp powerup will slow down the rate at which bullets spawn for 5 seconds. There is an 8 second cooldown to use another powerup after using this one.
  Using the heal powerup will regenerate 3 HP. There is a 5 second cooldown to use another powerup after using this one.
  Dodge as many bullets as possible for as long as possible!

UI:
  At the bottom of the game screen is a health bar, which will drop down as you take more hits.
  After using a powerup, the border will flash green, and the timer will turn orange for a cooldown period specified above. Attempting to use the powerup during this time will cause the border to flash red.
  After you lose all 13 HP, you will lose the game, and a screen stating your total time will show up.
*/

//sprite defs
const player = "p";
const border = "b";
const border_invalid = "i";
const border_executed = "e";
const background = "w";
const hp = "h";
const inv_hp = "j";
const [bullet_up, bullet_left, bullet_right, bullet_down] = ["u", "l", "r", "d"];

//sfx
const hitSound = tune`
120: c3-120,
120: c3-120,
7250`;
const powerUp = tune`
60: f4-160,
60: a4-160,
60: c5-160,
60: a4-160,
60: c5-160,
60: f5-160,
60: c5-160,
60: f5-160,
60: a5-160,
1425`;
const noPower = tune`
60: b3-90,
60: b3-90,
60: b3-90,
14500`;
const song = tune`
187.5: a4~187.5 + e4-250 + a5/187.5,
187.5: a5/187.5 + a4~187.5,
187.5: c5~187.5,
187.5: e4-250 + a5/187.5 + c5~187.5,
187.5: e5~187.5 + a5/187.5,
187.5: e5~187.5,
187.5: c5~187.5 + e4-250 + a5/187.5,
187.5: a5/187.5 + c5~187.5,
187.5: e5~187.5 + e4-250,
187.5: a5/187.5 + e5~187.5,
187.5: c5~187.5 + f4-250 + a5/187.5,
187.5: c5~187.5,
187.5: e5~187.5 + g4-250 + a5/187.5,
187.5: a5/187.5 + e5~187.5,
187.5: c5~187.5 + d4-250,
187.5: c5~187.5,
187.5: a4~187.5 + e4-250 + a5/187.5 + c5^187.5,
187.5: e4-250 + a5/187.5 + a4~187.5 + c5^187.5,
187.5: c5~187.5 + e5^187.5,
187.5: a5/187.5 + c5~187.5 + e5^187.5,
187.5: e5~187.5 + e4-250 + a5/187.5 + c5^187.5,
187.5: e4-250 + e5~187.5 + c5^187.5,
187.5: c5~187.5 + a5/187.5 + a4^187.5,
187.5: e4-250 + a5/187.5 + c5~187.5 + a4^187.5,
187.5: e5~187.5 + c5^187.5,
187.5: e4-250 + a5/187.5 + e5~187.5 + c5^187.5,
187.5: c5~187.5 + f4-250 + a5/187.5 + e5^187.5,
187.5: c5~187.5 + e5^187.5,
187.5: e5~187.5 + g4-250 + a5/187.5 + c5^187.5,
187.5: a5/187.5 + e5~187.5 + c5^187.5,
187.5: c5~187.5 + d4-250 + g4^187.5,
187.5: c5~187.5 + g4^187.5`;
const gameoverSong = tune`
256: c5/512,
256,
256: b4/512,
256,
256: a#4/512,
256,
256: a4/512,
256,
256: g#4/4096`;

//sprite bitmaps
setLegend(
  [ player, bitmap`
..333......333..
.33333....33333.
3333333..3333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......`], 
  [ border_invalid, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ border_executed, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ border, bitmap`
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
  [ background, bitmap`
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
  [ hp, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ inv_hp, bitmap`
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
CCCCCCCCCCCCCCCC`],
  [ bullet_up, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
22....2222....22
22222.2222.22222
.22222222222222.
..222222222222..
...2222222222...
.....222222.....
......2222......
.......22.......`], 
  [ bullet_left, bitmap`
........22......
........222.....
.........222....
.........2222...
.........2222...
..........2222..
222222222222222.
2222222222222222
2222222222222222
222222222222222.
..........2222..
.........2222...
.........2222...
.........222....
........222.....
........22......`],
  [ bullet_down, bitmap`
.......22.......
......2222......
.....222222.....
...2222222222...
..222222222222..
.22222222222222.
22222.2222.22222
22....2222....22
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
  [ bullet_right, bitmap`
......22........
.....222........
....222.........
...2222.........
...2222.........
..2222..........
.222222222222222
2222222222222222
2222222222222222
.222222222222222
..2222..........
...2222.........
...2222.........
....222.........
.....222........
......22........`]
);

//prevents player from leaving bounding box
setSolids([player, border]);

//sets background color to black
setBackground(background);

//loads startup screen
const level = map`
bbbbbbbbbbbbb
b...........b
b...........b
b...........b
b...........b
b...........b
b.....p.....b
b...........b
b...........b
b...........b
b...........b
b...........b
bbbbbbbbbbbbb
.............`
setMap(level);

//Movement controls (defined above)
onInput("w", () => {
  if (game)
    getFirst(player).y -= 1
});
onInput("a", () => {
  if (game)
    getFirst(player).x -= 1
});
onInput("s", () => {
  if (game)
    getFirst(player).y += 1
});
onInput("d", () => {
  if (game)
    getFirst(player).x += 1
});

//powerup controls
onInput("i", () => {
  if (!effects && health != 13 && game) {
    //plays powerup sfx, and increases health by 3 if resultant value is not greater than 13
    playTune(powerUp);
    health += 3;
    health = health > 13 ? 13 : health;

    //sets effects applied to true, and flashes border green
    effects = true;
    for (var i = 0; i < 13; i++){
      addSprite(i, 0, border_executed);
      addSprite(0, i, border_executed);
      addSprite(i, 12, border_executed);
      addSprite(12, i, border_executed);
    } 
    setTimeout(() => {
      getAll(border_executed).forEach(sprite => {
        sprite.remove();
      });
    }, 500);

    //sets effects applied to false after 5 seconds
    setTimeout(() => {
      effects = false;
    }, 5000);
  } else {
    //if powerup is already applied, plays not allowed sfx and flashes border red
    playTune(noPower);
    for (var i = 0; i < 13; i++){
      addSprite(i, 0, border_invalid);
      addSprite(0, i, border_invalid);
      addSprite(i, 12, border_invalid);
      addSprite(12, i, border_invalid);
    } 
    setTimeout(() => {
      getAll(border_invalid).forEach(sprite => {
        sprite.remove();
      });
    }, 500);
  }
});
onInput("j", () => {
  if (!effects && game) {
    //plays powerup sfx and slows down bullet spawn by 400ms
    playTune(powerUp);
    timeout = 600;

    //sets effects applied to true, and flashes border green
    effects = true;
    for (var i = 0; i < 13; i++){
      addSprite(i, 0, border_executed);
      addSprite(0, i, border_executed);
      addSprite(i, 12, border_executed);
      addSprite(12, i, border_executed);
    } 
    setTimeout(() => {
      getAll(border_executed).forEach(sprite => {
        sprite.remove();
      });
    }, 500);

    //disables slowdown after 5 seconds
    setTimeout(() => {
      timeout = 200;
    }, 5000);

    //sets effects applied to false after 8 seconds
    setTimeout(() => {
      effects = false;
    }, 8000);
  } else {
    //if powerup is already applied, plays not allowed sfx and flashes border red
    playTune(noPower);
    for (var i = 0; i < 13; i++){
      addSprite(i, 0, border_invalid);
      addSprite(0, i, border_invalid);
      addSprite(i, 12, border_invalid);
      addSprite(12, i, border_invalid);
    } 
    setTimeout(() => {
      getAll(border_invalid).forEach(sprite => {
        sprite.remove();
      });
    }, 500);
  }
})

//end controls

//random bullet spawn function
function spawnBullet() {
  //calculates health
  setHealth();

  //chooses bullet spawn location - top, left, bottom, or right
  var pos = Math.round(Math.random() * 3)
  var posX = [Math.round(Math.random() * 10), 1, Math.round(Math.random() * 10), 11][pos];
  var posY = [1, Math.round(Math.random() * 10), 11, Math.round(Math.random() * 10)][pos];

  //sets bullet look
  var bulletType = [bullet_up, bullet_left, bullet_down, bullet_right]
  addSprite(posX, posY, bulletType[pos]);

  //selects bullet and moves across screen. If hits other side, despawns. If hits player, recalculates health and despawns
  var newBul = getAll(bulletType[pos])[getAll(bulletType[pos]).length - 1];
  setInterval(() => {
    newBul.x += [0, 1, 0, -1][pos];
    newBul.y += [1, 0, -1, 0][pos];
    var playerSprite = getFirst(player);
      try {
      if (newBul.x > 11 || newBul.x < 1 || newBul.y > 11 || newBul.y < 1) {
        newBul.remove();
      } else if (newBul.x == playerSprite.x && newBul.y == playerSprite.y) {
        health--;
        setHealth();
        newBul.remove();
        playTune(hitSound);
      } 
    } catch (e) {
    }
  }, 100); 
}

//health bar setter function
function setHealth() {
  //clears bottom
  for (var j = 0; j < 13;j++){
    clearTile(i, 13);
  }

  //adds green for health available
  for (var i = 0; i < health; i++) {
    clearTile(i, 13);
    addSprite(i, 13, hp);
  } 

  //replaces with maroon when depleted
  for (var j = health; j < 13;j++){
    clearTile(i, 13);
    addSprite(i, 13, inv_hp);
  }
}

//game variables - remaining health, time elapsed, effects applied, slowdown, and game running
let health = 13;
let time = 0;
let effects = false;
let timeout = 200;
let game = true;

//dirty sleep hack
async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

//game loop, runs infinitely until death
async function gameLoop() {
  //infinitely plays background music until game stopped
  const playback = playTune(song, Infinity);

  //timer on until game stopped
  const timer = setInterval(() => {
    clearText();
    time +=0.1
    addText(Math.round(time * 10)/10 + "", {
      x: 4,
      y: 2,
      color: effects ? color`9` : color`7`
    });
  }, 100);
  while(true) {
    //spawn bullets
    spawnBullet();

    //if health is fully depleted, stops timer and background theme, clears all elements, and display game over text and ending time. Plays ending theme
    if (health <= 0){
      clearInterval(timer);
      clearText();
      for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 14; j++) {
          clearTile(i, j);
        }
      }
      addText("Game Over", {
        x: 4,
        y: 11,
        color: color`3`
      });
      addText("Time: " + Math.round(time * 10)/10 + "s", {
        x: 4,
        y: 13,
        color: color`7`
      });
      playback.end();
      playTune(gameoverSong, 1);
      game = false;
      break;
    }

    //waits specified time before spawning another bullet
    await sleep(timeout);
  }
}
gameLoop();
