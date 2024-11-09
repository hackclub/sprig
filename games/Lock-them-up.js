/*
@title: Prison Game
@author: Fallhicory
@tags: ['puzzle']
@addedOn: 2024-08-15
*/

const police = "p"
const prisoner = "r";
const ground = "g";
const key = "k";
const prison = "j";
const prisonLocked = "L";
const wall = "W";

setLegend(
  [police, bitmap`
.....77777777...
....77777767....
..77777LLLLL....
...LLLL000000...
...00LCC000000..
...00LC25C25....
...0LLCCCCCC....
...0LCCCCC88....
....LCCCCCCC....
.....77777...00.
....77777777C0..
....777776......
....777777......
....C00600......
.....77777......
.....77.77......`],
  [prisoner, bitmap`
..0000000000....
..00CCCCCC00....
..0024CC4200....
...C2DCCD2C.....
...CC0000CC.....
...CC0880CC.....
...22222222.....
.CC11111111CC...
.CCLLCLLCLLCC...
.CCLLC00CLLCC...
..222L22L222....
...L11LL11L.....
....LLLLLL......
....00..00......
....00..00......
....00..00......`],
  [ground, bitmap`
L1L1011101111111
1L1L101111111001
01L1L10111100101
101L1L1011111011
1101L1L101000111
11101L1L10111111
111101L1L1011110
1011101L1L101111
10011101L1L10111
110011101L1L1011
1110000101L1L101
11111100001L1L10
100111111101L1L1
1110001111101L1L
11111000011101L1
111111111000101L`],
  [key, bitmap`
................
................
................
......6666......
.....662266.....
...00622220000..
...0L662266L000.
..00LL6666L11L0.
..0L11L661111L0.
..00L1L66LLLLL0.
...00LL66666L00.
....0006600000..
.......666600...
.......66.......
................
................`],
  [prison, bitmap`
................
................
................
8888888888888888
8..8..8..8..8..8
8888888888888888
8..8..8..8..8..8
8888888888888888
8..8..8..8..8..8
8888888888888888
8..8..8..8LL8..8
8888888888888888
8..8..8..8..8..8
8888888888888888
8..8..8..8..8..8
8888888888888888`],
  [prisonLocked, bitmap`
................
8888886666888888
.88..6....6..88.
.88..6....6..88.
.88..6....6..88.
.88..6....6..88.
.88..6....6.8888
.88.888888888668
.88.888888888668
.88.881111888888
.88.881LL188.88.
.88.88111188.88.
.88.88888888.88.
.88.88888888.88.
8888888888888888
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLL00000LLL
L000LLLLLLLLL0LL
LLLLL000LLLLLLLL
LLLLLLL00LLLLLLL
LL0000LLLLL0LLLL
LLLLLLLLLLL0000L
0LLLLLLL000LLLLL
0L00000LLL000LLL
0LLLLL000LLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLL000LLL
000000000LLL000L
00LLLLLLLLLLLL00
00L00000LLLLLLLL
LLLLLLL000000LLL`]
);

let level = 0;
const levels = [
  map`
WWWWWWWWW
WWWWWWWWW
WWWWkWWWW
WWWW.WWWW
Wp...r.LW
WWWWWWWWW
WWWWWWWWW
WWWWWWWWW`, //Tutorial
    map`
WWWWWLggg
jWgggWgrg
kWgrgWggg
gggggWWgg
ggggggggg
pgggggggg`, 
  map`
WWWWWWWWWWWW
WWWWWWWW..jW
W.....WW..WW
W.....WW..WW
W.rW......WW
W..W..WWW.WW
W..W......WW
W.pWWWWWWWWW
WWWWWWWWWWWW`, //Level 1
  map`
WWWWWWWWWWWWWWWWWW
WL.....WWWWWWWWWWW
WL.....WW........W
WWWWW..WW.....r..W
W......WW..WWW...W
W......W...WW....W
W..WWWWW...W....WW
W.........W....WWW
W........W....WWWW
WWWW.WWWW....WWWWW
Wp.W...W....W....W
W..W...W...W.....W
W..WW..W.rW.k.W..W
W..WW..W..WWWWW..W
W......W.........W
WWWWWWWWWWWWWWWWWW`, //Level 2
  map`
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
W.......W........W.....W.....W
W.......W........W.....W.....W
W..WWW..W..WWWW..W..WWWW..W..W
W....W..W.....W.....W.....W..W
W....W..W.....W.....W.....W..W
WWW..W..WWWW..WWWWWWW..WWWW..W
W....W.....r..W.....W.....W..L
W....W........W.....W.....W..L
W..WWWWWWWWWWWW..W..WWWW..WWWW
W....W........W..W.....W.....W
W....W........W..W.....W.....W
WWW..W..WWWW..W..WWWW..WWWW..W
W....W.....W.....W..W.....W..W
W....W.....W.....W.kW.....W..W
W..WWWWWW..WWWWWWW..W..W..W..W
W.......W..W.....W..W..W.....W
W.......W..W.....W..W..W.....W
WWW..W..W..W..W..W..W..WWWWWWW
W....W........W.....W......r.W
Wp...W........W.....W........W
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW` //Level 3 
];
const WinMusic = tune`
135.13513513513513: B5/135.13513513513513 + G4^135.13513513513513,
135.13513513513513: E4^135.13513513513513 + B4-135.13513513513513 + A4/135.13513513513513 + C5~135.13513513513513 + F5~135.13513513513513,
135.13513513513513: E5~135.13513513513513 + A4~135.13513513513513 + B4^135.13513513513513 + E4/135.13513513513513 + G5-135.13513513513513,
135.13513513513513: E5/135.13513513513513 + D5~135.13513513513513 + F5~135.13513513513513 + D4/135.13513513513513 + C4~135.13513513513513,
135.13513513513513: E5~135.13513513513513 + A5~135.13513513513513 + C4~135.13513513513513 + G4~135.13513513513513,
135.13513513513513: C4^135.13513513513513 + E4^135.13513513513513 + G4^135.13513513513513 + B4^135.13513513513513 + D5^135.13513513513513,
3513.5135135135133`
const unlock = tune`
92.5925925925926: G5^92.5925925925926,
92.5925925925926: F5^92.5925925925926 + G5^92.5925925925926,
92.5925925925926: F5^92.5925925925926,
92.5925925925926: E5~92.5925925925926 + F5^92.5925925925926,
92.5925925925926: E5^92.5925925925926,
92.5925925925926: D5^92.5925925925926 + E5^92.5925925925926,
92.5925925925926: D5^92.5925925925926 + E5^92.5925925925926,
92.5925925925926: C5^92.5925925925926 + D5^92.5925925925926,
92.5925925925926: C5^92.5925925925926 + D5^92.5925925925926,
92.5925925925926: C5^92.5925925925926,
92.5925925925926: C5^92.5925925925926,
92.5925925925926: B4~92.5925925925926 + C5^92.5925925925926,
92.5925925925926: B4^92.5925925925926,
92.5925925925926: B4^92.5925925925926,
92.5925925925926: A4~92.5925925925926 + B4^92.5925925925926,
92.5925925925926: A4^92.5925925925926,
92.5925925925926: G4~92.5925925925926 + A4^92.5925925925926,
92.5925925925926: G4^92.5925925925926,
92.5925925925926: F4~92.5925925925926 + G4^92.5925925925926,
92.5925925925926: F4~92.5925925925926 + G4^92.5925925925926,
92.5925925925926: F4^92.5925925925926,
92.5925925925926: E4~92.5925925925926 + F4^92.5925925925926,
92.5925925925926: E4^92.5925925925926,
92.5925925925926: D4~92.5925925925926 + E4^92.5925925925926,
92.5925925925926: D4~92.5925925925926 + E4^92.5925925925926,
92.5925925925926: C4~92.5925925925926 + D4^92.5925925925926,
92.5925925925926: C4~92.5925925925926 + D4^92.5925925925926,
92.5925925925926: C4^92.5925925925926,
92.5925925925926: C4^92.5925925925926,
277.77777777777777`

setMap(levels[level]);
setBackground(ground);
addText("The Prison Game", { y: 0, color: color`2` });
addText("Put the prisoners", { y: 2, color: color`2` });
addText("in prison!", { y: 3, color: color`2` });
addText("Collect the key !", { y: 11, color: color`8` });
addText("Use W A S D to move", { y: 14, color: color`6` });
addText("Press I to reset", { y: 15, color: color`6` });

setSolids([police, prisoner, wall]);
setPushables({
  [police]: [prisoner],
  [prisoner]: [prisoner, police]
});

let cooldown = false; // Control the Cooldown

// Only move when the the cooldown is not active
onInput("w", () => { if (!cooldown) getFirst(police).y -= 1 });
onInput("a", () => { if (!cooldown) getFirst(police).x -= 1 });
onInput("s", () => { if (!cooldown) getFirst(police).y += 1 });
onInput("d", () => { if (!cooldown) getFirst(police).x += 1 });

onInput("i", () => {
  if (!cooldown) {
    setMap(levels[level]);
  }
});

afterInput(() => {
  if (cooldown) return; // Ignore the movements in the cooldown

  const prisoners = getAll(prisoner);
  let allInPrison = true;

  for (const p of prisoners) {
    const tile = getTile(p.x, p.y);
    if (!tile.some(sprite => sprite.type === prison)) {
      allInPrison = false;
      break;
    }
  }

  if (allInPrison) {
    cooldown = true; // Activate the cooldown
    addText("You Win!", { y: 7, color: color`2` });
    playTune(WinMusic, 1);

    if (level < levels.length - 1) {
      // Let a 1 sec delay
      setTimeout(() => {
        level++;
        setMap(levels[level]);
        clearText();
        cooldown = false;
      }, 1000);
    } else {
      // After all of the levels
      addText("All Levels Completed!", { y: 10, color: color`2` });
    }
  }
});


// For the key function, if you touch it, it will clean the tile 
afterInput(() => {
  const policeSprite = getFirst(police);
  const keySprites = getTile(policeSprite.x, policeSprite.y).filter(sprite => sprite.type === key);

  if (keySprites.length > 0) {
    // Delete the key without he policeman(just deleting the tile)
    keySprites.forEach(keySprite => {
      clearTile(keySprite.x, keySprite.y);
      playTune(unlock, 1)
      // Put the policeman after cleaning the tile
      addSprite(policeSprite.x, policeSprite.y, police);
    });

    // Change the the locked prison to normal
    tilesWith(prisonLocked).forEach(tile => {
      tile.forEach(sprite => {
        if (sprite.type === prisonLocked) {
          sprite.type = prison;
        }
      });
    });
  }
});

