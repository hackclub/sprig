/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: gioco ad ondate
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const floor = "f"
const bullet = "b"
const street = "s"
const street_under = "u"
const street_top = "t"
const enemy_one = "e"
setLegend(
  [wall, bitmap`
01LLL0LLLLLLLLLL
01L1101111L1111L
01L11011L1L11L1L
01L1101L11L1L11L
0LL11011L1L11L1L
01L1101L11L1L11L
01LLL01111L1111L
01L110LLLLLLLLLL
01L110LLLLLLLLLL
0LL1101111L1111L
01L11011L1L11L1L
01L1101L11L1L11L
01LLL011L1L11L1L
0LL1101L11L1L11L
01L1101111L1111L
01L110LLLLLLLLLL`],
  [player, bitmap`
..0....00000....
.030..0666660...
0C3C0.0CCCCC0...
.0C0..07C7CC0...
.0C0..0CCCCC0...
.0C0...0CCC00...
.0C0...00000....
.00000000000000.
.0C110FF333FF010
.000000FF3FF0010
.0C0.010FFF010C0
.0C0.0110F01100.
.0C0.000000000..
.0C0..010.010...
.0C0..010.010...
..0...000.000...`],
  [bullet, bitmap`
................
.....33333333...
...333399999333.
..33999666933...
.3392666666933..
.39266666693....
.39666666693....
.3966666666933..
.396666666669333
.3926666666933..
.33926666693....
..33999999993...
...33333333333..
................
................
................`],
  [enemy_one, bitmap`
........000000..
........088DD0..
........0DD0D0..
........0DDDD0..
.......00DD000..
......00DDDDD0..
.....00DD000000.
....00DDD0CCDD0.
....0CCCCC000000
....0CCDCCCCCDD0
....0CDDCC000000
....0CCCCC0.....
...00CCCCC00....
..0CCC000CC00...
.0DD00..00DD0...
.0000....0000...`],
  [floor, bitmap`
DDDDDDDD4DDDDDDD
DDDDDDDDDDDD4DDD
DD4DDD4DDD4DDDDD
DDDDDDDDDDDDDD4D
DDDDD4DDDDDDDDDD
DD4DDDDDD4DDDDDD
DDDDDDD4DDD4DD4D
DDD4DDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDD4DD4DDD
4DDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDDD4DD4DD
DDDDDD4DDDDDDDDD
DD4DDDDDD4DDD4DD
DDDDDDDDDDDDDDDD`],
  [street, bitmap`
11L1111L111L111L
11L1L11L111L11L1
111L1LL111L11L11
1LL111LL1LL1L1L1
1L1L1L11L11L11LL
LL11L11111L11L11
L1111L111L11L11L
LLLL11LLL1LL1LL1
11L1L111L1L111L1
1L11LL11L11L1L1L
L11L11LL1111LL11
11L11L11L1LL11LL
LL1L11L11LL1L111
1L1L1LL1L111LL11
1L11L11LLL1L11LL
1L1L11L111L1111L`],
  [street_top, bitmap`
LLLLLLLLLLLLLLLL
1L1111L11L11111L
11L11L111LL111LL
11L11L11111L11L1
111LL1LL1LLL1LL1
111L1111L111L111
L1L1L111L1111L11
1L111LL1L11111LL
1L11L11LL11LLL11
1L11L1111LL11111
1L11L111L11LL111
1LLLL11L11111L11
L1111L1L1L1111L1
1L1111L1L1LL1L1L
11LL1L11L111L111
1111L111L111L111`],
  [street_under, bitmap`
1111L111L111L111
11LL1L11L111L111
1L1111L1L1LL1L1L
L1111L1L1L1111L1
1LLLL11L11111L11
1L11L111L11LL111
1L11L1111LL11111
1L11L11LL11LLL11
1L111LL1L11111LL
L1L1L111L1111L11
111L1111L111L111
111LL1LL1LLL1LL1
11L11L11111L11L1
11L11L111LL111LL
1L1111L11L11111L
LLLLLLLLLLLLLLLL`]
)

setSolids([enemy_one]);
setBackground(street);
const level = [map`
fffffffffffffw
fffffffffffffw
tttttttttttttw
sssssssssssspw
uuuuuuuuuuuuuw
fffffffffffffw
fffffffffffffw`, ]

setMap(level[0])

setPushables({
  [enemy_one]: [enemy_one]
})
let bool = true;
onInput("s", () => {
  getFirst(player).y += 1
  playTune(move)
  if (bool === true) {
    moveAll()
    bool = false;
  }
})
onInput("w", () => {
  getFirst(player).y -= 1
  playTune(move)
  if (bool === true) {
    moveAll()
    bool = false;
  }
})
onInput("k", () => {
  addSprite(getFirst(player).x - 1, getFirst(player).y, bullet)
  if (bool === true) {
    moveAll()
    bool = false;
  }
})
let repetition = false;

function control_lose() {
  getAll(enemy_one).forEach(enemy_one => {
    const spritesOnTileEnemy = getTile(enemy_one.x, enemy_one.y);
    spritesOnTileEnemy.forEach(sprite => {
      if (repetition === false)
        if (sprite.type === wall || sprite.type === player) {
          //lose
          addText("You lose!", { x: 5, y: 5, color: color`2` });
          playback.end();
          playTune(lose_theme)
          repetition = true;
        }
    });
  });
}

function moveEnemy_one() {
  getAll(enemy_one).forEach(enemy_one => {
    enemy_one.x += 1;
  });
  control_lose();
  setTimeout(() => {
    moveEnemy_one(enemy_one);
  }, 2000);
}

function control_bullet() {
  getAll(bullet).forEach(bullet => {
    if (bullet.x <= 0) {
      bullet.remove();
    }
    const spritesOnTile = getTile(bullet.x, bullet.y);
    spritesOnTile.forEach(sprite => {
      if (sprite.type === enemy_one) {
        bullet.remove();
        sprite.remove();
      }
    });
  });
}

function moveBullet() {
  getAll(bullet).forEach(bullet => {
    bullet.x -= 1;
  });
  control_bullet();
  setTimeout(() => {
    moveBullet(bullet);
  }, 500);
}

function moveAll() {
  moveEnemy_one();
  moveBullet();
}
let n = 1;
const melody = tune`
895.5223880597015,
447.76119402985074: C4~447.76119402985074 + G5-447.76119402985074 + B4^447.76119402985074,
447.76119402985074: F4~447.76119402985074,
447.76119402985074,
447.76119402985074: B4~447.76119402985074 + E5-447.76119402985074,
447.76119402985074,
447.76119402985074: C4~447.76119402985074 + B4^447.76119402985074,
447.76119402985074: F4~447.76119402985074 + D5^447.76119402985074,
447.76119402985074: A4~447.76119402985074 + B5^447.76119402985074,
447.76119402985074: E4~447.76119402985074 + D4^447.76119402985074,
447.76119402985074: B4~447.76119402985074,
447.76119402985074: G4~447.76119402985074 + E5^447.76119402985074,
447.76119402985074: B4~447.76119402985074,
447.76119402985074: A4~447.76119402985074 + F5^447.76119402985074,
447.76119402985074: F4~447.76119402985074,
447.76119402985074: G4~447.76119402985074 + A5^447.76119402985074,
447.76119402985074: E4~447.76119402985074,
447.76119402985074: B4~447.76119402985074,
447.76119402985074: G4~447.76119402985074 + C5^447.76119402985074,
447.76119402985074: A4~447.76119402985074 + F4^447.76119402985074,
447.76119402985074: C5~447.76119402985074 + G5^447.76119402985074,
447.76119402985074: F4~447.76119402985074,
447.76119402985074: D5^447.76119402985074,
447.76119402985074: G5/447.76119402985074,
447.76119402985074: E4-447.76119402985074,
447.76119402985074: B4-447.76119402985074,
447.76119402985074,
447.76119402985074: E4/447.76119402985074,
447.76119402985074: C5^447.76119402985074,
447.76119402985074: G4~447.76119402985074,
447.76119402985074`
const move = tune`
229.00763358778627: C4^229.00763358778627 + G4~229.00763358778627,
7099.236641221374`
const win_theme = tune`
740.7407407407408,
370.3703703703704: A4^370.3703703703704 + E4~370.3703703703704 + C4/370.3703703703704,
370.3703703703704: C5^370.3703703703704 + G4~370.3703703703704 + E4/370.3703703703704,
370.3703703703704: F5^370.3703703703704 + C5~370.3703703703704 + A4/370.3703703703704,
10000`
const lose_theme = tune`
370.3703703703704,
370.3703703703704: F5/370.3703703703704 + C5-370.3703703703704 + A4~370.3703703703704,
370.3703703703704: C5/370.3703703703704 + G4-370.3703703703704 + E4~370.3703703703704,
370.3703703703704: E4-370.3703703703704 + C4~370.3703703703704 + A4/370.3703703703704,
370.3703703703704: C4~370.3703703703704 + D4-370.3703703703704 + F4/370.3703703703704,
10000`
const playback = playTune(melody, Infinity)
playback.end()

function spawn() {
  let j;
  for (j = 0; j < n; j++) {
    const randomy = Math.floor(Math.random() * 7);
    addSprite(0, randomy, enemy_one)
  }
}
afterInput(() => {
  if (tilesWith(enemy_one).length === 0) {
    const waves = 20;
    if (repetition === false)
      if (n === waves) {
        //win
        addText("You win!", { x: 5, y: 5, color: color`2` });
        playback.end();
        playTune(win_theme)
        repetition = true;
      }
    if (n < waves) {
      spawn()
      n += 1;
    }
  }
})
