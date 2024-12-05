/*
@title: The_Sky_Is_Falling_For_Real_This_Time
@author: Sawgur
@tags: ['endless']
@addedOn: 2023-02-11
*/



const player = "p";
const wall = "w";

var opening = 5;
var score = 0;
var speed = 350;
var death = false;

setLegend(
  [ player, bitmap`
....6666666.....
...606666606....
...666666666....
...606006006....
...000000000....
...000000000....
...600000006....
.5566600066655..
577766666665775.
577777777777775.
577777777777775.
.5555777777555..
..CCCCCCCCCCC...
.CCCCCC.CCCCCC..
.CCCCCC.CCCCCC..
..000.....000...`],
  [ wall, bitmap`
................
.........LLL....
.LLLL.LLLL1LLL..
L11LLLL122221LL.
L12112LL222221LL
L12222222222221L
L12222222222221L
L11222222LL2221L
.LL1222221L1111L
..LL11221LLLLLLL
...LLL1LLL......
.....LLL........
................
................
................
................`]
);

setSolids([]);


function generateSky() {
  opening = Math.floor(Math.random() * 9);
  for (let x=0; x < 9; x++) {
    if (x != opening) {
      addSprite(x, 0, wall);
    }
  }

  score++;
}

let level = 0;
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........
.........
.........
....p....`,
];

setMap(levels[level]);
generateSky();
setPushables({
  [ player ]: [],
});

function gameLoop() {
  addText(`Score: ${score}`, {x: 8, y: 1,color: color`0`})

getAll(wall).forEach((w) => {
    if (w.y == 9) {
      w.remove();
    } else {
      w.y += 1;
    };
  });

  if (getAll(wall).length == 0) {
    generateSky();
  }

  if (getFirst(wall).y == getFirst(player).y && getFirst(player).x != opening) {
      lost();
  } 
  speed -= 1;
  if (!death) {
    setTimeout(gameLoop, speed);
  }
}

function lost() {
  death = true;
  setMap(map`
........
........
........
........
........
........
........
........`);
  clearText();
  addText("LOSE!", {x: 7, y: 6, color: color`0`})
  addText(`Score: ${score}`, {x: 5, y: 9, color: color`0`})
}

onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("d", () => {
  getFirst(player).x += 1
});

afterInput(() => {
  
});

gameLoop();
