/*
@title: 2Psplashflame
@author: Josh Deva
@tags: []
@addedOn: 2024-04-19
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player1 = "p";
const player2 = "t";


const grass = "g";
const clear = "c";
const water  = "6"
const fire = "f";
const unmoveable = "m";



const exit = "e";
const exit2 = "2";

const upwall = "w";
const sdwall = "u";
const suwall = "a";
const road = "r";
const block = "b";
const dark = "d";



move = 1;

setLegend(
  [player1, bitmap`
................
................
................
......0000......
.....077770.....
....07777770....
....07077070....
....07777770....
....07777770....
....07700770....
.....077770.....
.....077770.....
....07770770....
....07707770....
....07777770....
....07700770....`],
  [player2, bitmap`
................
................
................
......0000......
.....0DDDD0.....
....0DDDDDD0....
....0D0DD0D0....
....0DDDDDD0....
....0DDDDDD0....
....0DD00DD0....
.....0DDDD0.....
.....0DDDD0.....
....0DD0DDD0....
....0DDD0DD0....
....0DDDDDD0....
....0DD00DD0....`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDD4
DD44DDDD4DDDD44D
DDD4DD444DDD4DDD
D44DD44DDDDD44DD
DDDDDD4DD44DD4DD
DD4DDDDDDD44DDDD
DD44DD4DDD4DDDDD
DD4DDD44DDD44D4D
D44DD444DDD4D4DD
DDDD4DDDDDDDDD4D
D4DDDDDDDD4DDDDD
D44D4D4DD4444DDD
4DD4DDD4DD4D4DDD
DDD4DDD44DDD4D4D
DDDDDDDDDDDD4DDD`],
  [exit, bitmap`
................
................
................
................
................
................
................
.......FF.......
......FF6F......
....FF6666FF....
....F6666666F...
....F666F6666F..
...F66666F6666F.
..F66F6666666FF.
..F6F666666F66F.
..F66666666666F.`],
  [exit2, bitmap`
................
................
................
................
................
................
................
.......FF.......
......FF6F......
....FF6666FF....
....F6666666F...
....F666F6666F..
...F66666F6666F.
..F66F6666666FF.
..F6F666666F66F.
..F66666666666F.`],

  [water, bitmap`
................
................
................
................
...........5....
....5.....55....
...55....5775...
...575...5775...
..57775..57775..
.577775.5777755.
5777777577777755
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],
  [fire, bitmap`
................
................
................
................
................
......33........
.....3993.......
.....39693......
.....33693......
......3693......
.....39693......
....3966693.....
...39666693.....
...39666693.....
..396666933.....
..39666933......`],

  [road, bitmap`
1111111111111111
1222222222222221
1211222222222221
1221122222222221
1222222222221221
1222222222221121
1222221122222221
1222222112222221
1222222222212221
1222222222111221
1222122222221221
1221122222222221
1222222222122221
1222222221112221
1222222222222221
1111111111111111`],
  [dark, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L00LLLLLLLLLLL0
0LL00LLLLLLLLLL0
0LLLLLLLLLLL0LL0
0LLLLLLLLLLL00L0
0LLLLL00LLLLLLL0
0LLLLLL00LLLLLL0
0LLLLLLLLLL0LLL0
0LLLLLLLLL000LL0
0LLL0LLLLLLL0LL0
0LL00LLLLLLLLLL0
0LLLLLLLLL0LLLL0
0LLLLLLLL000LLL0
0LLLLLLLLLLLLLL0
0000000000000000`],



  [block, bitmap`
................
..C..........C..
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..
..CCCLLLLLLCCC..
..CCLCLLLLCLCC..
..CCLLCLLCLLCC..
..CCLLLCCLLLCC..
..CCLLLCCLLLCC..
..CCLLCLLCLLCC..
..CCLCLLLLCLCC..
..CCCLLLLLLCCC..
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
..C..........C..
................`],
  [unmoveable, bitmap`
................
..C..........C..
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..
..CCCLLLLLLCCC..
..CCLCLLLLCLCC..
..CCLLCLLCLLCC..
..CCLLLCCLLLCC..
..CCLLLCCLLLCC..
..CCLLCLLCLLCC..
..CCLCLLLLCLCC..
..CCCLLLLLLCCC..
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
..C..........C..
................`],



  [upwall, bitmap`
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......`],
  [suwall, bitmap`
0000000000000000
0000000000000000
0000000000000000
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

  [sdwall, bitmap`
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
0000000000000000
0000000000000000`],
  [clear, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`])


setBackground(road)
setSolids([player1, player2, upwall, suwall, sdwall, block, unmoveable, dark]);
let level = 0;
const levels = [
  map`
e.bbt
.b.bb
b....
bb...
pb...`,
  map`
.b.b...
bpb....
bbb.b..
.b.e.b.
..b.bbb
....btb
...b.b.`,
  map`
tb.bbbbbb
b.b......
bbbbbbbbb
.bbbbbb..
....e....
..bbbbbb.
bbbbbbbbb
......b.b
bbbbbb.bp`,
  map`
..b.b.b..
..b.b.b..
..b.b.b..
bbbbbbbbb
..bpbtb..
b.bbbbb.b
b.b.b.b.b
b.b.b.b.b
b...e...b`,
  map`
pb.b.b.b.
b.b.b.b.b
.b.b.b.b.
b.b.b.b.b
.b.beb.b.
b.b.b.b.b
.b.b.b.b.
b.b.b.b.b
.b.b.b.bt`,
  map`
bbbbbbbbb
be.......
b.bbbbbbb
b.b......
b.b.bbbbb
b.b.b....
b.b.b.bbb
b.b.b.b.t
b.b.b.bp.`,
  map`
t.......p
.........
.........
.........
.........
.........
....b....
...b.b...
p..beb..t`,
  map`
.........
.p.......
mmmmmmmmb
.........
........e
.........
mmmmmmmmb
.t.......
.........`,
  map`
dtd....ddd.
d.d...d...d
d.dd.d..d..
d..dd..d.d.
.d.dd.d.dd.
...ddedd...
.dd.d.dd.d.
.d.d..dd..d
..d..d.dd.d
d...d...d.d
.ddd....dpd`,
  map`
dtd....ddd.
d.d...d...d
d.dd.d..d..
d..dd..d.d.
.d.dd.d.dd.
...ddedd...
.dd.d.dd.d.
.d.d..dd..d
..d..d.dd.d
d...d...d.d
.ddd....dpd`,
  map`
..td.......dp..
....d.....d....
..d..d...d..d..
...d..d.d..d...
....d..d..d....
.....d...d.....
.....d...d.....
....d..d..d....
...d..d2d..d...
ddd..d...d..ddd
d...d..d..d...d
ddd...ddd...ddd`


];

const finalScoreLevel = map`
cccc
cccc
cccc
cccc`;


setMap(levels[level]);

setPushables({
  [player1]: [block],
  [player2]: [block]
});

onInput("s", () => {
  const player1Sprite = getFirst(player1);
  if (player1Sprite) player1Sprite.y += move; // positive y is downwards
});

onInput("d", () => {
  const player1Sprite = getFirst(player1);
  if (player1Sprite) player1Sprite.x += move;
});

onInput("a", () => {
  const player1Sprite = getFirst(player1);
  if (player1Sprite) player1Sprite.x -= move;
});

onInput("w", () => {
  const player1Sprite = getFirst(player1);
  if (player1Sprite) player1Sprite.y -= move; // positive y is downwards
});

onInput("k", () => {
  const player2Sprite = getFirst(player2);
  if (player2Sprite) player2Sprite.y += move; // positive y is downwards
});

onInput("l", () => {
  const player2Sprite = getFirst(player2);
  if (player2Sprite) player2Sprite.x += move;
});

onInput("j", () => {
  const player2Sprite = getFirst(player2);
  if (player2Sprite) player2Sprite.x -= move;
});

onInput("i", () => {
  const player2Sprite = getFirst(player2);
  if (player2Sprite) player2Sprite.y -= move; // positive y is downwards
});


let player1Score = 0;
let player2Score = 0;
let finalLevelReached = false;

afterInput(() => {
  // Check if player 1 has reached the exit



  const exitTilesPlayer1 = tilesWith(exit, player1).length;
  if (exitTilesPlayer1 !== 0) {
    level++;

    player1Score++;
    const nextLevel = levels[level];
    if (nextLevel !== undefined) {
      setMap(nextLevel);
    }

  }

  // Check if player 2 has reached the exit
  const exitTilesPlayer2 = tilesWith(exit, player2).length;
  if (exitTilesPlayer2 !== 0) {
    level++;
    player2Score++;

    const nextLevel = levels[level];
    if (nextLevel !== undefined) {
      setMap(nextLevel);
    }

  }
  
  const exit2TilesPlayer1 = tilesWith(exit2, player1).length;
  if (exit2TilesPlayer1 !== 0) {
    player1Score++;
    setMap(finalScoreLevel);
    addText("Final Score:", {
      x: 4,
      y: 1,
      color: color`0`
    });
    addText("Player 1: " + player1Score, {
      x: 4,
      y: 3,
      color: color`0`
    });
    addText("Player 2: " + player2Score, {
      x: 4,
      y: 4,
      color: color`0`
    });
    if (player1Score > player2Score) {
      addText("Player 1 wins!", {
        x: 4,
        y: 6,
        color: color`0`
      });
    } else if (player1Score < player2Score) {
      addText("Player 2 wins!", {
        x: 4,
        y: 6,
        color: color`0`
      });
    } else {
      addText("It's a tie!", {
        x: 4,
        y: 6,
        color: color`0`
      });
    }
  }
  
  const exit2TilesPlayer2 = tilesWith(exit2, player2).length;
  if (exit2TilesPlayer2 !== 0) {
    player2Score++;
    setMap(finalScoreLevel);
    addText("Final Score:", {
      x: 4,
      y: 1,
      color: color`0`
    });
    addText("Player 1: " + player1Score, {
      x: 4,
      y: 3,
      color: color`0`
    });
    addText("Player 2: " + player2Score, {
      x: 4,
      y: 4,
      color: color`0`
    });
    if (player1Score > player2Score) {
      addText("Player 1 wins!", {
        x: 4,
        y: 6,
        color: color`0`
      });
    } else if (player1Score < player2Score) {
      addText("Player 2 wins!", {
        x: 4,
        y: 6,
        color: color`0`
      });
    } else {
      addText("It's a tie!", {
        x: 4,
        y: 6,
        color: color`0`
      });
    }
  }
});
