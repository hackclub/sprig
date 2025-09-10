/*
@title: Hey Hay Cow
@description: "Hey Hay Cow" is a maze-based puzzle game where the player helps a cow navigate through various mazes to find its desired hay. Each level presents a different challenge, requiring players to think strategically and solve navigation puzzles. It involves moving the cow through obstacles and sometimes pushing objects out of the way to reach the goal.
@author: Valeria DA
@tags: []
@addedOn: 2024-06-27
*/

// Create a tune:
const melody = tune`
333.3333333333333: D4~333.3333333333333 + D5^333.3333333333333,
333.3333333333333: F4~333.3333333333333 + D5^333.3333333333333,
333.3333333333333: A4~333.3333333333333 + D5^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + D5^333.3333333333333,
333.3333333333333: A4~333.3333333333333 + D5^333.3333333333333,
333.3333333333333: F4~333.3333333333333 + D5^333.3333333333333,
333.3333333333333: E4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: G4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: A4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: A4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: G4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: E4~333.3333333333333 + F5^333.3333333333333,
333.3333333333333: F4~333.3333333333333 + F5^333.3333333333333,
333.3333333333333: A4~333.3333333333333 + F5^333.3333333333333,
333.3333333333333: C5~333.3333333333333 + F5^333.3333333333333,
333.3333333333333: A4~333.3333333333333 + F5^333.3333333333333,
333.3333333333333: F4~333.3333333333333 + F5^333.3333333333333,
333.3333333333333: E4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: G4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: D5~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: G4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: E4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: G4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: B4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: D5~333.3333333333333 + E5^333.3333333333333,
333.3333333333333: E5^333.3333333333333 + B4~333.3333333333333,
333.3333333333333: E5^333.3333333333333 + G4~333.3333333333333,
333.3333333333333: E5^333.3333333333333 + C4~333.3333333333333,
333.3333333333333: C4~333.3333333333333 + E5^333.3333333333333`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()

// define the sprites in our game
const player = "p"
const hay = "h";
const grass = "g";
const sky1 = "w";
const sky2 = "z";
const sky3 = "a";
const sky4 = "q";
const sky5 = "t";
const sky6 = "u";
const sky7 = "o";
const field1 = "e";
const field2 = "b";
const green = "v";
const corn = "c";
const soil = "s";
const water = "r";
const bucket = "y";
const flowers = "f";
const finalfield = "l";

setBackground(soil); // Set t

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
................
................
.....0000000....
....02222LLL0...
...026202L0L0...
...06620220L0...
....0228888820..
..000228080820..
.022L02888880...
00L22L000000....
00LL2LLL2220....
.0L222222LL0....
.020020000L0....
.00.00....00....` ], 
  [hay, bitmap`
................
................
................
................
....C.C.C.......
...C9C6C6C......
..CC696966C.....
.C9626969C......
..C962626C......
...C9666C.......
....C66C........
....5555........
....C66C........
...C6696C.......
..C6C9C6C.......
..CC.C.CC.......`], 
  
  [sky1, bitmap`
2222222777777777
2222277777777777
2227777777777777
2777777777777777
2277777777777777
2222277777777777
2222222777777777
2222222277777777
2222222777777777
2222227777777777
2222277777777777
2222222277777777
2222222222277777
2222222222222277
2222222222222227
2222222222222222`],
  [sky2, bitmap`
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
  [sky3, bitmap`
2222222222222227
2222222222222277
2222222222277777
2222222227777777
2222222777777777
2222277777777777
2227777777777777
2222777777777777
2222222777777777
2222222277777777
2222222222777777
2222222222277777
2222222222222277
2222222222222222
2222222222222222
2222222222222222`],
  [sky4, bitmap`
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
7777777777777227
7777777777722222
7777777772222222
2227777722222222
2222222222222222`],
  [sky5, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777772
7777777777777722
7777777777777222
7777777777722222
7777777777222222
7777777772222222
2777777722222222
2222772222222222
2222222222222222
2222222222222222`],
  [sky6, bitmap`
7777777777772222
7777777772222222
7777772222222222
7777222222222222
7772222222222222
7222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [sky7, bitmap`
7722227777777777
7222727777222222
2227227772222222
2227777722222222
2222277222222222
7222222222222222
7777222222222222
7777222222222222
7772222222222222
7772222222222222
7722222272222222
7222277777222222
7227777777772222
7777777777772222
7777777777777222
7777777777777772`],
  [field1, bitmap`
22D2222D22D222D2
4DDD44D444D44DD4
4444444444444444
DDDD44DDDD44DDD4
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDFFFFDDDD
FFDDDFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC`],
  [field2, bitmap`
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

  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD2DDDD
DDDDDDDDDD262DDD
DDDDDDDDDDD2DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD4DDDD
DD8DDDDDDDDD4DDD
D828DDDDDDDD4DDD
DD8DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`], 
  [green, bitmap`
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
DDDDDDDDDDDDDDDD`], 

  [corn, bitmap`
......4D...D....
..4D.DDD.4D...D.
.4D.D...442..D.D
.D..D426.D66DD..
....4264.D.624..
.26446D..D.D4462
.D6244.4DD..426.
44D64.4D.D..D6..
4DDD4.D..4.DDD..
D..D44..DD.4.D..
...D.4...D...DD.
..DD.....D...DDD
.D.D....44...D.D
...D.....4...D..
...D.....D...D..
...D.....D...D..`], 
    [soil, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`], 

  [water, bitmap`
5555555555555555
5555222555555775
5552777255572555
5277555725555555
7755555255555555
5555555777755555
5572555555552255
7755555555277725
5555755777755777
5555555555555557
5555555555555555
5555555555555555
5555555555555225
5555572555552777
5577555775577555
7255555555775555`], 

   [bucket, bitmap`
....000000......
..00LLLLL100....
.0L1222222110...
.002222222200...
.0100222200L0...
.0111000022L0...
.01122LLL2LL0...
..0121LLL2L0....
..01121LLLL0....
..01121LL2L0....
...0111LLL0.....
...0L111LL0.....
....000000......
................
................
................`], 
  [flowers, bitmap`
....3....8.8....
..3333..8888H...
.333333..8H8....
33366333.88H...H
.332933..HH...HH
333333..D44.H..D
..333D.D44D..D.D
......D44DDD4.DD
.22D..DDD.D44..D
.D24D.D.4.D4D..D
.HD44DD.44DDD.DD
HD.D44D.D4DD.D.D
DH..DD....D.H.DD
DDD..D..DDDDDDDD
DDDD.D.DDDDDDDDD
DDDDDDDDDDDDDDDD`], 

    [finalfield, bitmap`
44D4444D44D444D4
4DDD44D444D44DD4
4444444444444444
DDDD44DDDD44DDD4
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDFFFFDDDD
FFDDDFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC`],
);

setSolids([sky3, sky4, sky5, sky6, player, corn, water, flowers, bucket]);

const levels = [
  {
    map: map`
wzzo
aqtu
eeee`,
    playerPos: { x: 0, y: 2 },
    hayPos: { x: 3, y: 2 }
  },
  {
    map: map`
gggggg
gvvvvg
gvvvvg
gvvvvg
gggggg`,
    playerPos: { x: 0, y: 4 },
    hayPos: { x: 5, y: 0 }
  },
  {
    map: map`
ccccccccccccccccccccc
sscssssssscssssssscsc
cscscscscccscscccscsc
cssscscccssscscsssssc
cccccssssscccsccccccc
cssscssssssscsssssssc
cscscccccscccccscccsc
cscssssscscssscscsssc
cscccccscscscscscscsc
cscssscscscscscccccsc
cssscscscssscssssscsc
cccccscscscccccccccsc
cssscscscscssssscsssc
cscssscssscsccsscsccc
cscssscssscsscsssssss
ccccccccccccccccccccc`,
    playerPos: { x: 0, y: 1 },
    hayPos: { x: 20, y: 14 }
  },
   {
    map: map`
rssrrrrrrrrrrrrrrrrrr
rssssssrssssssssssrsr
rrrrrrsrssrrrrrsrsrsr
rssssrsrrsrsssrsrsssr
rssssrssssrsrsrsrsssr
rsrrsrrrrrrsrrrsrrrrr
rsrsssssssrsssssssssr
rsrrrrrrsrrrrrrrrrrsr
rssssssrssssssssssrsr
rssrrrsrsrsrrrrrrrrsr
rssrsssrsrsssssrssssr
rssrsrrrsrrrrrrrrsssr
rssrsrsssrssssssrsrrr
rrrrsrrrrrssrsssrsssr
ssssssssssssrsssssssr
rrrrrrrrrrrrrrrrrrrrr`,
    playerPos: { x: 0, y: 14 },
    hayPos: { x: 1, y: 0 }
  },
  {
  map: map`
fffffffffffffffffff
f.......f....f.f..f
f.fffffff.f..f.f..f
f.f.....f.ff......f
f.f..f....f..f.f..f
f.f.fffffff..f.ffff
f.f....f.....f.....
f.f...ff.fffff.ffff
f.f.f..f.f......f.f
f.f.f..f.f....f...f
f.f.f..f.f.ffffff.f
f...f.ffff.f.f..f.f
f...f...........f.f
f...fffffffffffffff`,
     playerPos: { x: 2, y: 13},
    hayPos: { x: 18, y: 6 },
    bucketPositions: [
      { x: 14, y: 4 },
      { x: 5, y: 8 }, // Add more bucket positions here
      { x: 10, y: 6 },
      { x: 3, y: 10 },
      { x: 10, y: 10 },
      { x: 10, y: 1 },
      { x: 1, y: 5 },
        { x: 14, y: 7 },
    ],
  },
  // other levels...
];

// Key press event listener to restart the game
onInput("j", () => {
  currentLevel = 0;
  startLevel(currentLevel);
});

// Movement controls (existing code)...
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

let currentLevel = 0;

const startLevel = (levelIndex) => {
  const level = levels[levelIndex];
  setMap(level.map);
  const playerPos = level.playerPos;
  const hayPos = level.hayPos;

  // Add player and hay sprites first
  addSprite(playerPos.x, playerPos.y, player);
  addSprite(hayPos.x, hayPos.y, hay);

  // Add bucket sprites
  if (level.bucketPositions) {
    level.bucketPositions.forEach(bucketPos => {
      addSprite(bucketPos.x, bucketPos.y, bucket);
    });
  }
};

startLevel(currentLevel);


startLevel(currentLevel);

setPushables({
  [player]: [bucket], // player can push the bucket
  [bucket]: [bucket], // bucket is not pushed by any other object
});
const showEndScreen = () => {

     // Set a different background if desired
  setBackground(sky2);

  // Display the end text
  addText("the end", { y: 10, color: color`2` });
  
  // Define a new map for the end screen
  const endMap = map`
wzqtu
cfpfc
lllll
rrrrr`;
  
  // Set the new map for the end screen
  setMap(endMap);
};

afterInput(() => {
  const oneTiles = tilesWith(player);
  const twoTiles = tilesWith(hay);

  if (oneTiles[0][0]._x == twoTiles[0][0]._x && oneTiles[0][0]._y == twoTiles[0][0]._y) {
    currentLevel = currentLevel + 1;

    if (levels[currentLevel] !== undefined) {
      startLevel(currentLevel);
    } else {
      showEndScreen();
    }
  }
});
