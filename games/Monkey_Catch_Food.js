/*
@title: Monkey_Catch_Food
@author: Ahmet Dedeler
@tags: []
@addedOn: 2023-12-30
*/

/*
  Fruit Catcher Game:
  Catch falling fruits while avoiding bombs. Use 'A' to move left, 'D' to move right,
  and 'J' to jump. Increase your score, collect life fruits for extra lives, and be careful
  with bombs. How long can you survive?
*/


// Fruit and player characters
const apple = "a";
const banana = "b";
const orange = "o";
const grape = "g";
const watermelon = "w";
const player = "p";
const bomb = "t";
const lifeFruit = "l";
const speedBoost = "s";

// Game parameters
let lives = 15;
let score = 0;
let speed = 1;
let jump = false;
let jumpCooldown = 0;
let jumpHeight = 0;


const music = tune`
105.63380281690141: B5~105.63380281690141 + A4^105.63380281690141 + G4/105.63380281690141 + E4-105.63380281690141 + C4-105.63380281690141,
105.63380281690141: A5~105.63380281690141 + C4^105.63380281690141 + B5/105.63380281690141,
105.63380281690141: G5~105.63380281690141 + A4^105.63380281690141 + F4/105.63380281690141 + C4-105.63380281690141,
105.63380281690141: G5~105.63380281690141 + F5~105.63380281690141 + E5~105.63380281690141 + D4/105.63380281690141 + C4^105.63380281690141,
105.63380281690141: E5~105.63380281690141 + D5~105.63380281690141 + A4^105.63380281690141 + F4-105.63380281690141 + C4-105.63380281690141,
105.63380281690141: D5~105.63380281690141 + C5~105.63380281690141 + C4^105.63380281690141,
105.63380281690141: C5~105.63380281690141 + B4~105.63380281690141 + A4^105.63380281690141 + D4/105.63380281690141 + C4-105.63380281690141,
105.63380281690141: B4~105.63380281690141 + A4~105.63380281690141 + G4~105.63380281690141 + F5-105.63380281690141 + C5-105.63380281690141,
105.63380281690141: G4~105.63380281690141 + F4~105.63380281690141 + C4-105.63380281690141,
105.63380281690141: F4~105.63380281690141 + A4^105.63380281690141 + B5-105.63380281690141,
105.63380281690141: F4~105.63380281690141 + E4~105.63380281690141 + A5-105.63380281690141 + G4/105.63380281690141 + B4-105.63380281690141,
105.63380281690141: E4~105.63380281690141 + B5-105.63380281690141 + C4/105.63380281690141,
105.63380281690141: E4~105.63380281690141 + A4^105.63380281690141 + A5-105.63380281690141 + C4^105.63380281690141,
105.63380281690141: E4~105.63380281690141 + D4~105.63380281690141 + C5-105.63380281690141 + B5-105.63380281690141 + C4/105.63380281690141,
105.63380281690141: D4~105.63380281690141 + G5/105.63380281690141 + E4^105.63380281690141 + F4/105.63380281690141 + B4-105.63380281690141,
105.63380281690141: D4~105.63380281690141 + C4~105.63380281690141 + A4^105.63380281690141 + A5-105.63380281690141,
105.63380281690141: C4~105.63380281690141 + G5-105.63380281690141,
105.63380281690141: D4~105.63380281690141 + A4^105.63380281690141 + A5-105.63380281690141,
105.63380281690141: E4~105.63380281690141 + G4/105.63380281690141 + G5-105.63380281690141,
105.63380281690141: E4~105.63380281690141 + F4~105.63380281690141 + C5^105.63380281690141 + A4/105.63380281690141 + G4/105.63380281690141,
105.63380281690141: F4~105.63380281690141 + G4~105.63380281690141 + B4/105.63380281690141 + A4/105.63380281690141 + G5^105.63380281690141,
105.63380281690141: G4~105.63380281690141 + A4~105.63380281690141 + E5^105.63380281690141 + B4/105.63380281690141 + A5^105.63380281690141,
105.63380281690141: B4~105.63380281690141 + C5/105.63380281690141 + D5/105.63380281690141 + E5/105.63380281690141 + G5^105.63380281690141,
105.63380281690141: B4~105.63380281690141 + C5~105.63380281690141 + E5/105.63380281690141 + F5/105.63380281690141,
105.63380281690141: D5~105.63380281690141 + G4^105.63380281690141 + F5/105.63380281690141 + G5/105.63380281690141,
105.63380281690141: E5~105.63380281690141 + G5/105.63380281690141 + A5/105.63380281690141,
105.63380281690141: E5~105.63380281690141 + F5~105.63380281690141 + A4^105.63380281690141 + A5/105.63380281690141 + B5/105.63380281690141,
105.63380281690141: F5~105.63380281690141 + B5/105.63380281690141,
105.63380281690141: G5~105.63380281690141 + A5~105.63380281690141 + A4^105.63380281690141 + B5/105.63380281690141,
105.63380281690141: A5~105.63380281690141,
105.63380281690141: A5~105.63380281690141 + D5^105.63380281690141 + A4^105.63380281690141,
105.63380281690141: B5~105.63380281690141`

const music2 = tune`
500,
500: E5-500,
15000`

const playback = playTune(music, Infinity);


// Fruit scores
function getFruitScore(fruitType) {
  switch (fruitType) {
    case apple: return 10;
    case banana: return 15;
    case orange: return 20;
    case grape: return 25;
    case watermelon: return 30;
    default: return 0;
  }
}

setLegend(
  [player, bitmap`
.....CCCCCC.....
.C..CCFFFFCC..C.
.C..CF02FF20C.C.
.C..CFFF0FFC.CC.
.C..CFFF8FFC.C..
.CC..CFFFFC..C..
..CCCCCCCCCCCC..
.....CCCCCC.....
......CCCC......
.....CCCCCC.....
.....CCCCCC.....
.....CCCCCC.....
....CC...CCC....
...CC......C....
...C.......C....
..CC.......CC...`],
  [apple, bitmap`
........000DD0..
.......0CCDDDD0.
.......0CDD..D0.
...00000C0000...
..033333C33330..
.033333CCC33330.
03333333C3333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
.03333333333330.
..033333333330..
...0000000000...`],
  [banana, bitmap`
................
................
................
................
................
................
.............F0.
............FF.0
..FFF......F6F..
.F066FFFFFF66FF.
.F666FF666666F6F
.F66FF666666F66F
..FF066FFFFF666F
...F6666666666F.
....F6666666FF..
.....FFFFFFF....`],
  [orange, bitmap`
.....DDD........
....DDCC........
......DCC.......
...00000C0000...
..09999CCC9990..
.0999999C999990.
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
.09999999999990.
..099999999990..
...0000000000...`],
  [grape, bitmap`
........DD44....
.......CCDDDD4..
.......C000DD4..
......CCHHH0DD..
....000HHHHH0...
...0HHH0HHHH0...
..0HHHHH0HH0....
..0HHHHH0000....
...0HHH00HHH0...
....00000HHH0...
......000HHH0...
.....0HHH0H0....
....0HHHHH0.....
....0HHHHH0.....
.....0HHH0......
......000.......`],
  [watermelon, bitmap`
................
................
................
................
................
................
................
................
................
3333333333333333
D330333333333033
DD333333330333DD
.DD3333033333DD.
..DD33333333DD..
...DD33333DDD...
....DDDDDDD.....`],
  [lifeFruit, bitmap`
.......FF.......
......F66F......
.....F6HH6F.....
....F6H66H6F....
...F6H6776H6F...
..F6H67H776H6F..
.F6H67777776H6F.
F6H677H77H776H6F
.F6H67777776H6F.
..F6H6H7776H6F..
....6H6776H6F...
....F6H66H6F....
.....F6HH6F.....
......F66F......
.......FF.......
................`],
  [speedBoost, bitmap`
................
........D.......
.......D4D......
......D444D.....
.....D44444D....
....D4444444D...
...D444444444D..
..D44444444444D.
...DDD44444DDD..
.....D44444D....
.....D44444D....
.....D44444D....
.....D44444D....
.....D44444D....
.....D44444D....
.....D44444D....`],
  [bomb, bitmap`
0000000000000000
0C33333333333330
0C33333333333330
0C33333333333330
0C33333333333330
0C00030330300030
0C30330030330330
0C30330300330330
0C30330330330330
0C33333333333330
0C33333333333330
0C33333333333330
0C33333333333330
0C33333333333330
0CCCCCCCCCCCCCC0
0000000000000000`],
  ['z', bitmap`
...............1
......1.........
.1........7..1..
............1...
.....7..........
..........1.....
.........1...1..
................
.......1......7.
..7...1...7.....
.....1..........
............1...
...1............
..1....1.......1
...........7....
1....7..........`]
);


setBackground('z');

const level = map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
p............`;

let fallingObjects = [];

setMap(level);

const objectSpawn = setInterval(() => {
  // Generate falling objects
  let x = Math.floor(Math.random() * 12);
  let randomFruit = getRandomFruit();
  addSprite(x, 0, randomFruit);
  fallingObjects.push([x, 0, randomFruit]);
}, 1000 / speed);

let playerPos = getFirst(player);
let playerX = playerPos.x;
let playerY = playerPos.y;

const objectUpdate = setInterval(() => {
  for (let i = 0; i < fallingObjects.length; ++i) {
    let pos = fallingObjects[i];
    let tile = getTile(pos[0], pos[1]);
    if (tile.length > 0) {
      tile[0].y += 1;
      fallingObjects[i][1] += 1;
    }
  }

  let toRemove = [];

  for (let i = 0; i < fallingObjects.length; ++i) {

    let playerX = getFirst(player).x;
    let playerY = getFirst(player).y;
    

    let fruitType = fallingObjects[i][2];
    
    if (
      fallingObjects[i][0] == playerX &&
      fallingObjects[i][1] >= playerY - 1
    ) {
      // Player caught an object
      if (fruitType === lifeFruit) {
        lives += 3; // Lifefruit caught
        score += 50;
      } else if (fruitType === speedBoost) {
        speed += 30; // Boost the speed temporarily
        setTimeout(() => (speed -= 0.5), 3000); // Reset speed after 3 seconds
      } else if (fruitType === bomb) {
        score -= 5; // Caught bomb
        lives -= 5;
      } else {
        // Get score based on the fruit
        score += getFruitScore(fruitType);
      }

      toRemove.push(i);
    }
    if (fallingObjects[i][1] == getFirst(player).y) {
      // Object reached the bottom
      if (fruitType !== lifeFruit && fruitType !== bomb) {
        lives -= 1;
      }
      toRemove.push(i);
    }
  }



// Remove caught objects
for (let i = 0; i < toRemove.length; ++i) {
  getTile(...fallingObjects[toRemove[i]]).forEach((item) => {
    if (item != null && item.type != "p") {
      item.remove();
      fallingObjects.splice(toRemove[i], 1);
    }
  });
}

  // Jumping logic
  if (jump && jumpHeight < 2) {
    getFirst(player).y -= 2;
    jumpHeight += 1;
    jump = false;
  }

  if (jumpHeight > 0) {
    setTimeout(() => {
      getFirst(player).y += 2;
      jumpHeight -= 1;
    }, 500); // Applying gravity after half a second
  }


  clearText();
  addText(`Lives: ${lives}`, { x: 5, y: 0 });
  addText(`Score: ${score}`, { x: 5, y: 1 });

  if (lives <= 0) {
    clearInterval(objectUpdate);
    clearInterval(objectSpawn);
    addText("Game Over", { x: 5, y: 0 });
  }

  // Increase speed over time
  speed += 0.1;
}, 1000 / speed);


onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  // Allow the player to jump by pressing 'j'
  if (!jump && jumpCooldown === 0) {
    jump = true;
  }
});

// Get a random fruit
function getRandomFruit() {
  const fruits = [apple, banana, orange, grape, watermelon, lifeFruit, speedBoost, bomb];
  return fruits[Math.floor(Math.random() * fruits.length)];
}
