/*
@title: Legally Distinct Yellow Creature Collects Bananas
@author: DogeJr
@tags: ['endless', 'humor']
@addedOn: 2025-01-22

Update Log:
Version 1.1 (2025-01-29)
Add shields to make you invincible for a 5 seconds (they spawn every 20 seconds)
New Player sprite when shielded
Make bananas spawn randomly at start
Added score at the start
454 lines
*/

//Starting the game

const player = "p"
const shieldplayer = "j"
const banana = "w"
const wall = "i"
const shieldsprite= "s"

const health4 = "9"
const health35 = "8"
const health3 = "7"
const health25 = "6"
const health2 = "5"
const health15 = "4"
const health1 = "3"
const health05 = "2"
const health0 = "1"

  

//Making da map
setLegend(
  [shieldsprite, bitmap `
................
................
......5555......
....55777755....
...5777777775...
...5757757775...
..577577577775..
..575577577575..
..575775577575..
..577775775775..
...5775577575...
...5777777775...
....55777755....
......5555......
................
................`],
  [player, bitmap`
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
....00....00....`],
  [shieldplayer, bitmap `
.......666......
...5.66666657...
..56666116657...
.5766616616657..
.570016006105...
..70016006100...
...6661661666...
...6666116666...
...6666666666...
.7.5666666665.5.
.57656666665675.
.65.55555555775.
.65.57555555.56.
.66.55775555.66.
....55555555....
....00....00....`],
  [banana, bitmap`
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
................`],
  [wall, bitmap`
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
................`],
  [health4, bitmap`
.00.00...00.00..
0330330.0330330.
0333330.0333330.
0333330.0333330.
.03330...03330..
..030.....030...
...0.......0....
................
................
.00.00...00.00..
0330330.0330330.
0333330.0333330.
0333330.0333330.
.03330...03330..
..030.....030...
...0.......0....`],
  [health35, bitmap `
.00.00...00.00..
0330330.0330..0.
0333330.0333..0.
0333330.0333..0.
.03330...03..0..
..030.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330330.0330330.
0333330.0333330.
0333330.0333330.
.03330...03330..
..030.....030...
...0.......0....`],
  [health3, bitmap `
.00.00...00.00..
0330330.0..0..0.
0333330.0.....0.
0333330.0.....0.
.03330...0...0..
..030.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330330.0330330.
0333330.0333330.
0333330.0333330.
.03330...03330..
..030.....030...
...0.......0....`],
  [health25, bitmap `
.00.00...00.00..
0330..0.0..0..0.
0333..0.0.....0.
0333..0.0.....0.
.03..0...0...0..
..0.0.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330330.0330330.
0333330.0333330.
0333330.0333330.
.03330...03330..
..030.....030...
...0.......0....`],
  [health2, bitmap `
.00.00...00.00..
0..0..0.0..0..0.
0.....0.0.....0.
0.....0.0.....0.
.0...0...0...0..
..0.0.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330330.0330330.
0333330.0333330.
0333330.0333330.
.03330...03330..
..030.....030...
...0.......0....`],
  [health15, bitmap `
.00.00...00.00..
0..0..0.0..0..0.
0.....0.0.....0.
0.....0.0.....0.
.0...0...0...0..
..0.0.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330330.0330..0.
0333330.0333..0.
0333330.0333..0.
.03330...03..0..
..030.....0.0...
...0.......0....`],
  [health1, bitmap `
.00.00...00.00..
0..0..0.0..0..0.
0.....0.0.....0.
0.....0.0.....0.
.0...0...0...0..
..0.0.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330330.0..0..0.
0333330.0.....0.
0333330.0.....0.
.03330...0...0..
..030.....0.0...
...0.......0....`],
  [health05, bitmap `
.00.00...00.00..
0..0..0.0..0..0.
0.....0.0.....0.
0.....0.0.....0.
.0...0...0...0..
..0.0.....0.0...
...0.......0....
................
................
.00.00...00.00..
0330..0.0..0..0.
0333..0.0.....0.
0333..0.0.....0.
.03..0...0...0..
..0.0.....0.0...
...0.......0....`],
  [health0, bitmap `
.00.00...00.00..
0..0..0.0..0..0.
0.....0.0.....0.
0.....0.0.....0.
.0...0...0...0..
..0.0.....0.0...
...0.......0....
................
................
.00.00...00.00..
0..0..0.0..0..0.
0.....0.0.....0.
0.....0.0.....0.
.0...0...0...0..
..0.0.....0.0...
...0.......0....`],
)
setSolids([player, wall,])
let level = 0
const levels = [
  map`
iiiiiiii
.p......
........
........`,
  map `
........
........
........
........`,
]


setMap(levels[level])
setPushables({
  [player]: []
})

const ding = tune`
101.69491525423729: B4/101.69491525423729,
101.69491525423729: C5/101.69491525423729,
3050.8474576271187`

//Set points to 0
var Points = 0
var health = 9
var difficulty = 800
var shielded = false
var hLoop = 0
var sLoop = 0

function placeRandomSprite(spriteType) {
  const emptyTiles = [];
  const mapWidth = width();
  const mapHeight = height();
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
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
    x: 8,
    y: 4,
    color: color`4`,
  })
}

function updateHealth() {
  if (health > 0) {
  clearTile(0, 0)
  addSprite(0, 0, health)}
  addSprite(0, 0, wall)}

function shield() {
  if (shielded === false) {
    shielded = true
    const sprite = getFirst("p")
    const sprite2 = getFirst("s")
    const { x, y } = sprite;
    sprite.remove()
    sprite2.remove()
    addSprite(x, y, shieldplayer)
    setTimeout(function(){
      shielded = false
      const sprite = getFirst("j")
      const { x, y } = sprite;
      sprite.remove()
      addSprite(x, y, player)
      healthLoop()
    }, 5000)
  }
}

function shieldLoop(){
    setTimeout(function(){
      if (health > 0) {
        if (tilesWith(shieldsprite, ).length < 1)
      placeRandomSprite(shieldsprite)}
      if (sLoop < 9999999) {
        shieldLoop()
      }
    }, 20000)
  }

function healthLoop() {
  if (health > 0) {
    if (shielded === false) {
    setTimeout(function(){
      health--
      updateHealth();
      difficulty = difficulty - 5
      if (hLoop < 9999999) {
        healthLoop()
      }
    }, difficulty)
  }
  }
  else {
    setMap(levels[1])
    clearText()
    addText("you dided!11!1!", {
      x: 3,
      y: 7,
      color: color`0`,})
    addText("score: " + Points, {
      x: 6,
      y: 9,
      color: color`0`,})
    };
  }


//inputs
onInput("w", () => {
  if (tilesWith(player).length >= 1) {
    getFirst(player).y -= 1;}
  if (tilesWith(shieldplayer).length >= 1) {
    getFirst(shieldplayer).y -= 1;}
});
onInput("a", () => {
  if (tilesWith(player).length >= 1) {
    getFirst(player).x -= 1;}
  if (tilesWith(shieldplayer).length >= 1) {
    getFirst(shieldplayer).x -= 1;}
});
onInput("s", () => {
  if (tilesWith(player).length >= 1) {
    getFirst(player).y += 1;}
  if (tilesWith(shieldplayer).length >= 1) {
    getFirst(shieldplayer).y += 1;}
});
onInput("d", () => {
  if (tilesWith(player).length >= 1) {
    getFirst(player).x += 1;}
  if (tilesWith(shieldplayer).length >= 1) {
    getFirst(shieldplayer).x += 1;}
});

afterInput(() => {
  if (tilesWith(banana, player,).length >= 1 || tilesWith(banana, shieldplayer,).length >= 1) {
    getFirst(banana).remove();
    Points = Points + 1
    if (health > 0) {
    if ((health + 2) > 9) {
      health = health + (9 - health)
    } else {
    health = health + 2}
    updatePoints()
    updateHealth()
    placeRandomSprite(banana)
    playTune(ding)}
  }
  if (tilesWith(shieldsprite, player,).length >= 1 || tilesWith(shieldsprite, shieldplayer,).length >= 1) {
    shield()
  }         
})

setMap(levels[0])
updatePoints()
updateHealth()
healthLoop()
shieldLoop()
placeRandomSprite(banana)
