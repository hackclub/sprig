/*
@title: Lander
@description: An addictive, infinite game about dodging asteroids
@author: Ivan Stiner
@tags: ['Space', 'Infinite']
@addedOn: 2026-10-12
*/

const player = "p"
const die = "d"
const rock = "r"
let r = 0
let l = 0
let u = 0
let d = 0
let score = 0
let speed = 300

function next() {
    const p = getFirst(player);
    const rs = getAll("r");
    rs.forEach(rSprite => {
      let randomOffset = Math.floor(Math.random() * 11) + 1;
      rSprite.x = randomOffset;
    });
    
    p.y = 9;
    if (speed >= 200) {
      speed = speed - 10;
    } else if (speed <= 40) {
      speed = speed;
    } else {
      speed = speed - 1;
    }

    score = score + 1;
    console.log(score, speed);
}

function crash() {
  clearText();
  addText("Score:" + score, {
    x: 6,
    y: 13,
    color: color`0`
  });
  

  const p = getFirst(player);
  p.x = 6;
  p.y = 9;
  r = 0;
  l = 0;
  u = 0;
  d = 0;
  score = 0;
}

setLegend(
  [ player, bitmap`
............
............
.....00.....
....0..0....
...0....0...
...0....0...
.0.0....0.0.
090222222090
090221122090
090220022090
090220022090
.0.000000.0.` ],

    [ die, bitmap`
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
3333333333333
` ],

    [ rock, bitmap`
....000....
..0011100..
.011111110.
.011111110.
01111111110
01111111110
01111111110
.011111110.
.011111110.
..0011100..
....000....
...........
` ]
)

setSolids([])

let level = 0
const levels = [
  map`
d...........d
d..r...r....d
d...r..r....d
d...r..r....d
d...r.r.r...d
d...r.......d
d...r.r.....d
d....r.r.r..d
d...........d
d.....p.....d`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("d", () => {
  r = 1
  l = 0
  u = 0 
  d = 0
  clearText()
});
onInput("a", () => {
  l = 1
  r = 0
  u = 0
  d = 0
  clearText()
});
onInput("w", () => {
  u = 1
  r = 0
  l = 0
  d = 0
  clearText()
});
onInput("s", () => {
  d = 1  
  u = 0
  r = 0
  l = 0
  clearText()
});

function gameLoop() {
  const p = getFirst(player);
  if (r == 1) { p.x += 1; }
  if (l == 1) { p.x -= 1; }
  if (u == 1) { p.y -= 1; }
  if (d == 1) { p.y += 1; }

  // Check collisions here every time the player moves
  const hitWall = getTile(p.x, p.y).some(sprite => sprite.type === "d");
  const hitRock = getAll("r").some(s => s.x === p.x && s.y === p.y);
  
  if (hitWall || hitRock) {
    crash();
  }

  if (p.y == 0) {
    next();
  }
  setTimeout(gameLoop, speed);
}
setTimeout(gameLoop, speed);
