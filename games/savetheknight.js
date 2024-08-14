/*
@title: Save the knight
@author: dibya
@tags: [sprig]
@addedOn: 2024-00-00
*/
const knight = "k";
const goblin = "g";


setLegend(
  [goblin, bitmap`
................
................
..000000000000..
..044444444440..
..044444444440..
..043444444340..
..044440044440..
..044444444440..
..044444444440..
..044000000440..
..040444444040..
..044444444440..
..044444444440..
..000000000000..
................
................`],
  [knight, bitmap`
...0000000000...
...0999999990...
...0999999990...
...0990990990.1.
...0999999990.1.
...0909999090.1.
...0990000990.1.
...0999999990.1.
...0000000000.1.
.......0......1.
..00000000000033
.......0......L.
.......0......L.
.......0........
......0.0.......
.....0...0......`],
)


setMap(map`
........
........
........
........
........
........
........
....k...`)


var gameRunning = true;



onInput("a", () => {
  if (gameRunning) {
    getFirst(knight).x -= 1;
  }

});
onInput("d", function() {
  getFirst(knight).x += 1;
});



function spawngoblin() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, goblin);
}


function movegoblins() {
  let goblins = getAll(goblin);

  for (let i = 0; i < goblins.length; i++) {
    goblins[i].y += 1;
  }
}


function despawngoblins() {
  let goblins = getAll(goblin);

  for (let i = 0; i < goblins.length; i++) {
    if (goblins[i].y == 7) {
      goblins[i].remove();
    }
  }
}


function checkHit() {

  let goblins = getAll(goblin);
  let p = getFirst(knight);

  for (let i = 0; i < goblins.length; i++) {
    if (goblins[i].x == p.x && goblins[i].y == p.y) {
      return true;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {

  despawngoblins();
  movegoblins();
  spawngoblin();

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("THE KNIGHT DIED", {
      x: 3,
      y: 5,
      color: color`9`
    });
  }

}, 1000);