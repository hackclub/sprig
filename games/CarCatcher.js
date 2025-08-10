/*
@title: CarCatcher
@author: Pranav
@description: watch out!, its raining cats!
@tags: ["cats","catch","cute"]
@addedOn: 2025-08-05 
*/

const player = "p"
const kitten = "k"
const background = "b"
const black = "d"
const sky = "s"
const ground = "g"
const cloud = "c"
// Player Sprites
const playerIdle = bitmap`
.CC..........CC.
.CC..........CC.
..CC........CC..
..CCCCCCCCCCCC..
....L......L....
....L.0L0L.L....
....L.0L0L.L....
....L.LLLL.L....
....LLL0LLLL....
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......L..L......
......L..L......
.....LL.LL......`

const playerLeft = bitmap`
.00..........00.
..0..........0..
..00........00..
...0000000000...
....L......L....
....L.0L0L.L....
....L.0L0L.L....
....L.LLLL.L....
.....LL0LLL.....
......LLLL......
......LLLL......
......LLLL......
......LLLL......
......L..L......
......L..L......
.....LL.LL......`

const playerRight = bitmap`
.....00..........00.
......0..........0..
......00........00..
.......0000000000...
........L......L....
........L.0L0L.L....
........L.0L0L.L....
........L.LLLL.L....
.........LL0LLL.....
..........LLLL......
..........LLLL......
..........LLLL......
..........LLLL......
..........L..L......
..........L..L......
.........LL.LL......`

const newSong = tune`
250: G4-250 + B4-250,
250: A4-250 + C5-250,
250: B4-250 + D5-250,
250,
250: A4-250 + F4-250,
250: G4-250 + E4-250,
250: F4-250 + D4-250,
250,
250: G4-250 + C5-250,
250: F4-250 + A4-250,
250: E4-250 + G4-250,
250: D4-250 + F4-250,
5000`;

const beautifulTune = tune`
250: C5-250 + E4-250 + D5/250,
250: G4-250 + B4-250,
250: A4-250 + F4-250,
250,
250: G4-250 + E5-250,
250: F4-250 + D5-250,
250: E4-250 + C5-250,
250,
250: D4-250 + G4-250,
250: F4-250 + A4-250,
250: G4-250 + B4-250,
250: A4-250 + C5-250,
250: E5-250 + G4-250,
250: G4-250 + D5-250,
250: E4-250 + C5-250,
250,
250: E4-250 + G4-250,
250: F4-250 + A4-250,
250: G4-250 + B4-250,
250: A4-250 + C5-250,
250,
250: E5-250,
250: E4-250 + G4-250,
250: G4-250 + E4-250,
250,
250: C4-250 + F4-250 + A4-250,
250: D4-250 + G4-250 + B4-250,
250,
250: C5-250 + G4-250,
750`

const ding = tune`
150,
150: B4-150,
150: G5-150,
4350`;

const death = tune`
333: E4-333 + C5-333,
333,
333: G4-333 + C4-333,
333,
333: G4-333 + E4-333,
333,
333: F4-333 + A4-333,
333: F4-333 + B4-333,
333: F4-333 + A4-333,
333: F4-333 + G4-333,
333: F4-333 + A4-333,
333: G4-333 + F4-333,
333: E4-333 + G4-333,
333: E4-333 + G4-333,
333: E4-333 + G4-333,
333: G4-333 + E4-333,
5000`;



let playback = playTune(beautifulTune, Infinity);
let playbackDeath;

let gameOver = false;

function setup(callback) {
  callback()
}

function forever(callback) {
  setInterval(callback, 10000 / 65);
}

setLegend(
  [player, playerIdle],
  [background, bitmap `
5555555555555555
5555555555555555
5522555555555555
5522555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4C44444444444444
4C44DDDDDD444D44
444DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [kitten, bitmap`
...0.......0....
..010.....010...
..01100000110...
..01111111110...
..01111111110...
.0LL1012101LL0..
.0111012101110..
.0LL1022201LL0..
.0881222221880..
..02222222220...
...00C363C00....
.....01110..0...
.....01210.010..
...00112110010..
...01L121L110...
....00000000....`],
  [black, bitmap`
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
  [sky,bitmap`
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
7777777777777777`],
  [ground,bitmap`
0777777777722227
0777777777772277
0777772227777777
0777772222777777
0777222222777777
0777222277777777
0777777777777777
0777777777777777
0777777777777777
0222777777222777
0222777777222227
0227777777772227
0777777777777777
0777772277777777
0777222277777777
0777222777722277` ],
  [cloud,bitmap`
.........2222...
................
................
.2222222........
.2222222........
.2222222222.....
.2222222222.....
....2222222...22
.............222
................
................
...222222.......
...222222.......
................
..........222...
........222222..` ]
)

setSolids([player, black])
setBackground(ground)

let level = 0
const levels = [
  map`
d..k..d
d.....d
d.....d
d.....d
d.....d
d..p..d`
]

setMap(levels[level])

setPushables({
  [player]: []
})

setup(() => {
  let playerPoints = 0;
  let kittenExists = true;

  const playerSprite = getFirst(player);
  if (playerSprite) {
    playerSprite.bitmap = playerIdle;
  }

  addText("K", { x: 2, y: 3, color: color`3` });
  addText("I", { x: 2, y: 4, color: color`4` });
  addText("T", { x: 2, y: 5, color: color`3` });
  addText("T", { x: 2, y: 6, color: color`4` });
  addText("Y", { x: 2, y: 7, color: color`3` });

  addText("C", { x: 2, y: 9, color: color`4` });
  addText("A", { x: 2, y: 10, color: color`3` });
  addText("T", { x: 2, y: 11, color: color`4` });
  addText("C", { x: 2, y: 12, color: color`3` });
  addText("H", { x: 2, y: 13, color: color`4` });

  addText("P", { x: 17, y: 1, color: color`2` });
  addText("o", { x: 17, y: 2, color: color`2` });
  addText("i", { x: 17, y: 3, color: color`2` });
  addText("n", { x: 17, y: 4, color: color`2` });
  addText("t", { x: 17, y: 5, color: color`2` });
  addText("s", { x: 17, y: 6, color: color`2` });
  addText("0", { x: 17, y: 8, color: color`H` });

  forever(() => {
    const playerSprite = getFirst(player);
    const kittenSprite = getFirst(kitten);

    if (!kittenExists && !kittenSprite) {
      const newX = Math.floor((Math.random() * 5) + 1);
      const newY = 0;
      addSprite(newX, newY, kitten);
      kittenExists = true;
    }

    if (playerSprite && kittenSprite) {
      if (kittenSprite.y === playerSprite.y - 1 && kittenSprite.x === playerSprite.x) {
        playerPoints++;
        playTune(ding)
        clearText();
        // Redraw score and title
        addText("K", { x: 2, y: 3, color: color`3` });
        addText("I", { x: 2, y: 4, color: color`4` });
        addText("T", { x: 2, y: 5, color: color`3` });
        addText("T", { x: 2, y: 6, color: color`4` });
        addText("Y", { x: 2, y: 7, color: color`3` });

        addText("C", { x: 2, y: 9, color: color`4` });
        addText("A", { x: 2, y: 10, color: color`3` });
        addText("T", { x: 2, y: 11, color: color`4` });
        addText("C", { x: 2, y: 12, color: color`3` });
        addText("H", { x: 2, y: 13, color: color`4` });
        addText("P", { x: 17, y: 1, color: color`2` });
        addText("o", { x: 17, y: 2, color: color`2` });
        addText("i", { x: 17, y: 3, color: color`2` });
        addText("n", { x: 17, y: 4, color: color`2` });
        addText("t", { x: 17, y: 5, color: color`2` });
        addText("s", { x: 17, y: 6, color: color`2` });
        addText(`${playerPoints}`, { x: 17, y: 8, color: color`H` });
        kittenSprite.remove();
        kittenExists = false;
      }
    }

    if (kittenExists && kittenSprite) {
      if (kittenSprite.y < height() - 1) {
        clearTile(kittenSprite.x, kittenSprite.y);
        kittenSprite.y++;
        addSprite(kittenSprite.x, kittenSprite.y, kitten);
      } else if (!gameOver) {
        playback.end();
        if (playbackDeath && playbackDeath.end){
          playbackDeath.end();
        }

        playbackDeath = playTune(death);
        clearText();
        addText("P", { x: 17, y: 1, color: color`2` });
        addText("o", { x: 17, y: 2, color: color`2` });
        addText("i", { x: 17, y: 3, color: color`2` });
        addText("n", { x: 17, y: 4, color: color`2` });
        addText("t", { x: 17, y: 5, color: color`2` });
        addText("s", { x: 17, y: 6, color: color`2` });
        addText(`${playerPoints}`, { x: 17, y: 8, color: color`H` });
        addText("G", { x: 2, y: 3, color: color`3`, size: 4 });
        addText("A", { x: 2, y: 4, color: color`3`, size: 4 });
        addText("M", { x: 2, y: 5, color: color`3`, size: 4 });
        addText("E", { x: 2, y: 6, color: color`3`, size: 4 });
        addText("O", { x: 2, y: 8, color: color`3`, size: 4 });
        addText("V", { x: 2, y: 9, color: color`3`, size: 4 });
        addText("E", { x: 2, y: 10, color: color`3`, size: 4 });
        addText("R", { x: 2, y: 11, color: color`3`, size: 4 });
        gameOver = true;
      }
    }
  });
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  if (playerSprite.x > 0) {
    playerSprite.x -= 1;
    playerSprite.bitmap = playerLeft;
  }
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  if (playerSprite.x < width() - 1) {
    playerSprite.x += 1;
    playerSprite.bitmap = playerRight;
  }
});

onInput("s", () => {
  if (gameOver) {
    // Stop the death tune playback if it's currently playing
    if (playback && playback.end) {
      playback.end();
    }

    if (playbackDeath && playbackDeath.end) {
      playbackDeath.end();
    }
    
    gameOver = false;
    setMap(levels[level]);
    setPushables({ [player]: [] });
    
    // Start the main tune again after stopping the death tune
    playback = playTune(beautifulTune, Infinity);
  }
});
