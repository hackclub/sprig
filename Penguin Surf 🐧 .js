/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Penguin Surf 🐧 
@author: Larissa G. 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p";
const snowball = "s";
const snowflakes = "f";
const mountain = "m";
const sky = "k";
const aurora = "a";
const night = "n";
const twilight = "w";
const dawn = "d";
const hail = "h";
const rock = "r";
const title = "t";
const subtitle = "u";
const stone = "o";
let score = 0;
let highscore = 0;
let deadStatus = false;
const music = tune`
361.4457831325301: A4-361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: A4-361.4457831325301 + E4/361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: C5^361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: A4-361.4457831325301 + E4/361.4457831325301 + D4~361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: C5^361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: A4-361.4457831325301 + E4/361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: C5^361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: A4-361.4457831325301 + E4/361.4457831325301 + D4~361.4457831325301,
361.4457831325301,
361.4457831325301: A4-361.4457831325301,
361.4457831325301: C5^361.4457831325301`
const playback = playTune(music, Infinity);



setLegend(
  [player, bitmap`
.......22.......
222.222..222.222
2222........2222
...........F6.2.
L2...000000.L6L.
LL000LLLLL0LL033
LLLLLLLL0LLLLLL.
.LLLLL000112111.
..LL000012212L..
.CC000022222077.
7773322227777777
...7777777777...
2222........2222
...2222..2222...
22...222222...22
..2..........2..`],
  [snowball, bitmap`
................
...1.555....1...
....5222555..1..
...5272277555...
...5722727775...
..572552222775..
..725222222275..
.5277222222275..
.5222222222275..
.5222222222275..
..772222222775..
...7222222775...
.1.552227775....
..1..577775.....
....1.5555......
................`],
  [snowflakes, bitmap`
2222............
...222....22222.
.........22.....
................
.222............
....2...........
....2222222.....
...........22...
..........2.....
...2..22222.....
.............22.
.........22222..
2.....222.......
.22........222..
..........22....
.......222......`],
  [mountain, bitmap`
55755557L7755755
755557DL1L675557
5555776L11647755
577746LL21664444
77446LLL22LL6444
74644L2222211664
4666LL12212211L6
6661L22211L22LLL
6L11222221LL222L
L1122222221LL122
122222222221LL12
2222222222211122
2112222222122112
2211222222222212
2222222211112222
2222222222211222`],
  [sky, bitmap`
5552577755555527
7777777777755555
44DDDD7777777755
6F44DDDDD7777777
6664444444DDDDDD
F6F6646644444446
6666666666666666
66666FF6666FFFF6
666F226FFFFF6FFF
666F66666666666L
66666666666666L2
666666666666LL22
FF266666666L2222
L6FFF66LL2221122
1L66611221222111
22LL122222222222`],
  [aurora, bitmap`
5725555555555755
77777755557775D4
7775577527775DDD
DD7775577775DD44
44DDDDDD5DDDD446
4444444DDDDD4446
6FF2444444446662
666666444444FFFF
666666F666666666
6662666FFFF666FF
2L6666666666FFF6
222LLFFF66666266
22112LFFFF666666
11122LLL2FFF6666
2222222222FFFFFF
21222221111FFFF6`],
  [night, bitmap`
5555555555555555
5555555572555555
5555555555555555
5555555555555555
5555555555555755
5572557555555555
5555555555555555
5555555555555555
5555555555555555
5555555555577755
5575555555757255
5525555777555555
7777775555555555
5577777777777555
7755555555555777
7555555555555555`],
  [dawn, bitmap`
7775555552755555
DD77555575555555
6DD7755555577777
F2657775577DD44D
6F665D77775D4444
66666666644446FF
44FFFFFFF6666FF6
744446666FFFF266
7777777466666644
555D777776626445
7575577577777777
7725555775557777
5577555577777555
5557755555557555
5255577775555225
5575555555555552`],
  [hail, bitmap`
2222221111111122
21..111.........
22111.2222222..2
...222..2.....22
22...22...222222
21222...........
LL1.22222222.222
22L11.22222.2222
22222211222.2222
22.222222....222
22.........2...2
22..22221.2222..
22.2221122222..2
22.222222.....22
222.............
................`],
  [twilight, bitmap`
5555555555555555
5555555575555555
5555555555555555
5555555555555555
5555555555555755
5575557555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555755
5575555555557255
5525555755555555
5557555555555555
5555555555557555
5555555555555555
5555555555555555`],
  [rock, bitmap`
F666122112222222
66L1222211....22
LL12...2212....2
1222.2....22...2
22.2.222.....222
.....221122222LL
2.2..22221122LLL
L..2..222L11LL11
L2..2..222L22222
.2.....222222222
222.......2..222
LL22....2...2...
21L2222........2
22211112........
222..22222...222
22222...........`],
  [stone, bitmap`
222222211221666F
22L1221122221L66
2L12.212212.21LL
222222....222221
2222.222222.2222
LL222221122222LL
LLL22112222222L2
11LL11L222112L1L
22222L2222L2222L
2222222222222222
222..2....2..222
LL22...22...22LL
21L2222..2222L12
2221111221111222
222..222222..222
22222......22222`],
  [title, bitmap`
5555555555555555
5225522525525522
5252525522525255
5225522525225252
5255525525725255
5275522525525522
5555555555555555
5555555555555555
5555222555555555
5555255525252225
5575222525252525
5525552725252555
5557222522252555
7755555555557577
5577777755555775
5555555555577755`],
  [subtitle, bitmap`
5555555555555555
5525252225255255
5525255255225255
2525255255252255
2525255255257255
2522252225255255
5555555555555555
5555555555555555
222555556F555555
255555L6L5555755
22255330LL557255
275555LL1LL55555
2557752221L77755
5555577555557777
7772555777775555
5555555555555555`],
);


setSolids([player, hail, stone, rock]);


let level = 0;
const levels = [
  map`
.........
.........
.........
.........
.........
.........
`
];

setMap(map`
wwwwwwwwww
nnnntunnnn
makmakmakm
hhhhhhhhhh
ffffffffff
fpffffffff
ffffffffff
ffffffffff`);

function updateScore() {
  clearText();
  addText("Score: " + score.toString(), { x: 0, y: 1, color: color`2` });

  if (score > highscore) {
    highscore = score; // Update highscore if current score is higher
  }

  addText("Highscore: " + highscore.toString(), { x: 0, y: 0, color: color`2` });
}


var gameRunning = true;

onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});

onInput("i", () => {
  if (deadStatus) {
    // Reset game variables
    score = 0;
    deadStatus = false;

    // Clear existing obstacles
    getAll(snowball).forEach(obstacle => obstacle.remove());

    // Restart game loop
    gameLoop = setInterval(() => {
      despawnObstacles();
      moveObstacles();
      spawnObstacle();

      if (checkHit()) {
        clearInterval(gameLoop);
        deadStatus = true;

        if (score > highscore) {
          highscore = score;
        }

        addText("Game Over!", { x: 5, y: 8, color: color`3` });
        addText("Press i ", { x: 1, y: 9, color: color`3` });
        addText(" to Restart", { x: 8, y: 9, color: color`3` });
      }
    }, 370);

    // Update score display
    updateScore();
  }
});


function spawnObstacle() {
  let chance = 0.25
  if (score >= 25 && score < 100) chance = 0.5;
  else if (score >= 100 && score < 150) chance = 0.60;
  else if (score >= 150 && score < 200) chance = 0.75
  else if (score >= 200 && score < 300) chance = 1;
  else if (score >= 300 && score < 400) chance = 1.25;
  else if (score >= 400 && score < 500) chance = 1.5;
  else if (score >= 500 && score < 600) chance = 1.75;
  else if (score >= 600 && score < 700) chance = 2;
  else if (score >= 700 && score < 800) chance = 2.25;
  else if (score >= 800 && score < 900) chance = 2.5;
  else if (score >= 900 && score < 1000) chance = 2.75;


  if (Math.random() < chance) {
    const safeRow = Math.floor(Math.random() * 5) + 4;

    let spawnRow;
    do {
      spawnRow = Math.floor(Math.random() * 4) + 4;
    } while (spawnRow === safeRow);

    const x = 8;
    addSprite(x, spawnRow, snowball);
  }
}

function moveObstacles() {
  let obstacles = getAll(snowball);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(snowball);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x <= 0) {
      obstacles[i].remove();
      score += 1;
      updateScore();
    }
  }
}

function checkHit() {
  let obstacles = getAll(snowball)
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();

  if (checkHit()) {
    clearInterval(gameLoop);
    deadStatus = true;

    if (score > highscore) {
      highscore = score;
    }

    addText("Game Over!", {
      x: 5,
      y: 8,
      color: color`3`
    });
    addText("Press i ", {
      x: 1,
      y: 9,
      color: color`3`
    });
    addText(" to Restart", {
      x: 8,
      y: 9,
      color: color`3`
    });
  }
}, 350);