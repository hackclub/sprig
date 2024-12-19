/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: A Fantastical Adventure Through Weedland
@author: 
@tags: []
@addedOn: 2024-00-00
*/

//Functions i guess
function placeRandomSprite(spriteType) {
  const emptyTiles = [];
  const mapWidth = width();
  const mapHeight = height();
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y <mapHeight; y++) {
      if (getTile(x, y).length === 0) {
        emptyTiles.push({ x, y });
      }
    }
  }
  if (emptyTiles.length === 0) {
    console.log("no empty tiles")
    return;
  }
  const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  addSprite(randomTile.x, randomTile.y, spriteType);
}
 
  

function updatePoints() {
  clearText()
  addText("Bananas: " + Points, {
    x:5,
    y:4,
    color: color`4`,
  })
}


//Starting the game

const player = "p"
const banana = "w"
const wall = "i"

//Making da map
setLegend(
  [ player, bitmap`
.......666......
.....666666.....
...666611666....
...6661661666...
...0016006100...
...0016006100...
...6661661666...
...6666116666...
...6666666666...
...5666666665...
..665666666566..
.66.55555555.66.
.66.55555555.66.
.66.55555555.66.
....55555555....
....00....00....` ],
  [ banana, bitmap`
............000.
...........00C0.
...........0CC00
...........06660
...........06660
..........006660
.........0066600
.........066660.
.......00066660.
......006666600.
....0006666600..
0000066666600...
066666666000....
0066666000......
.0000000........
................` ],
  [ wall, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ],
)
setSolids([ player, wall ])
let level = 0
const levels = [
  map`
iiiiiiii
.p...w..
........
........`
]

setMap(levels[level])
setPushables({
  [ player ]: []
})

const ding = tune`
101.69491525423729: B4/101.69491525423729,
101.69491525423729: C5/101.69491525423729,
3050.8474576271187`

//Set points to 0
var Points=0
updatePoints()

//inputs
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
   getFirst(player).x -= 1;
});
onInput("s", () => {
   getFirst(player).y += 1;
});
onInput("d", () => {
   getFirst(player).x += 1;
});

afterInput(() => {
  if (tilesWith(banana, player,).length >=1)   {
    getFirst(banana).remove();
    Points = Points + 1
    updatePoints()
    placeRandomSprite(banana)
    playTune(ding)
    
                               }
  
})