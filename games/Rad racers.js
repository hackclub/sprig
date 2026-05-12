/*
@title: Rad Racers
@author: Samuel
@tags: ['Race', 'fun']
@addedOn: 2025-05-11
*/








const player = "p";
const trafic = "t";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
................
....67777776....
...0755555570...
...0755555570...
....75555557....
...7777777777...
...7LLLLLLLL7...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
..077777777770..
..077777777770..
...7777777777...` ],
  [ trafic, bitmap`
...3333333333...
..033333333330..
..033333333330..
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3LLLLLLLL3...
...3333333333...
....33333333....
...0333333330...
...0333333330...
....63333336....
................
................
................` ],
    [ wall, bitmap`
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
DDDDDDDDDDDDDDDD` ],
); 

setMap(map`
w........w
w........w
w........w
w........w
w........w
w........w
w........w
w........w
w........w
w...p....w
`);

let score = 0;
let gameSpeed = 300;
let gameOver = false;


onInput("a", () => {
  const p = getFirst(player);
  if (p && p.x > 1 && !gameOver) p.x -= 1;
});

onInput("d", () => {
  const p = getFirst(player);
  if (p && p.x > 1 && !gameOver) p.x += 1;
});

function gameLoop() {
  if (gameOver) return;

  getAll(trafic).forEach(t => {
    if (t.y >= height() - 1) {
      t.remove();
      score += 1;
      
      // HARDER: Speed up every 5 points!
      if (score % 5 === 0 && gameSpeed > 100) {
        gameSpeed -= 20; 
      }
    } else {
      t.y += 1;
    }
  });
  if (Math.random() < 0.25) {
    const randomX = Math.floor(Math.random() * (width() - 2)) + 1;
    addSprite(randomX, 0, trafic);
  }
  const p = getFirst(player);
  if (p) {
    // 1. Fixed the comma here: (p.x, p.y)
    getTile(p.x, p.y).forEach(sprite => {
      // 2. Changed "trafic" to "trafic" to match your variable!
      if (sprite.type === trafic) {
        gameOver = true;
        addText("CRASHED!", { y: 4, color: color`R` });
        addText("Score: " + score, { y: 6, color: color`L` });
      }
    });
  }

  setTimeout(gameLoop, gameSpeed);
}

gameLoop();


const racingTune = tune`
100: d2-200, g2-200, a2-200, b2-200, c3-200, b2-200, a2-200, g2-200
`;


const music = playTune(racingTune, Infinity);


