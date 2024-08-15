/*
@title: Prison Game
@author: Fallhicory 
@tags: ['maze', 'game','levels', 'singleplayer', 'prison']
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
.....55555555...
....55555565....
..55555LLLLL....
...LLLL000000...
...00LFF000000..
...00LF24F24....
...0LLFFFFFF....
...0LFFFFFHH....
....LFFFFFFF....
.....555555.....
...555555555....
..5.5577565.5...
..5.0555555.5...
..5.000000005...
..F.00555550F...
....555.555.....`],
  [prisoner, bitmap`
....000000......
...00101010.....
..02020202000...
..00000000000...
..0FLCCFFFCC0...
.0FFLFCCFCCFF0..
.0FFFF25FF25F0..
.0LFFFFFFFFFL0..
.0LLFFLLLLFFL0..
0112LLHHHHLL120.
00000LLLLLL0000.
0FF0112222220F0.
.0000000000000..
..01112222220...
..0FF00000FF0...
.0000.....00....`],
  [ground, bitmap`
1111111111111111
1L111111L11111L1
1111111111111111
1111111111111111
111L1111111L1111
11111111111111L1
1111111111111111
1111111L11111111
L11111111111L111
1111111111111111
1111111L11111111
111L111111111111
1111111111111111
111111111L1111L1
1111111111111111
1111L11111111111`],
  [key, bitmap`
................
................
................
......6666......
.....662266.....
.....622226.....
.....622226.....
.....662266.....
......6666......
.......66.......
.......6666.....
.......66.......
.......6666.....
.......66.......
................
................`],
  [prison, bitmap`
................
LLLLLLLLLLLLLLLL
.LL..LL..LL..LL.
.LL..LL..LL..LL.
.LL..LL..LL..LL.
.LL..LL..LL..LL.
.LL..LL..LL.LLLL
.LL..LL..LL.L00L
.LL..LL..LL.L00L
.LL..LL..LL.LLLL
.LL..LL..LL..LL.
.LL..LL..LL..LL.
.LL..LL..LL..LL.
.LL..LL..LL..LL.
LLLLLLLLLLLLLLLL
................`],
  [prisonLocked, bitmap`
................
333333FFFF333333
.33..F....F..33.
.33..F....F..33.
.33..F....F..33.
.33..F....F..33.
.33..F....F.3333
.33.000000003003
.33.000000003003
.33.00LLLL003333
.33.00LLLL00.33.
.33.00LLLL00.33.
.33.00000000.33.
.33.00000000.33.
3333333333333333
................`],
  [wall, bitmap`
.L...L...L...L..
L.L.L.L.L.L.L.L.
L.L.L.L.L.L.L.L.
LLL1LLL1LLL1LLL1
1111111111111111
L1LLL1LLL1LLL1LL
1111111111111111
LLL1LLL1LLL1LLL1
1111111111111111
L1LLL1LLL1LLL1LL
1111111111111111
LLL1LLL1LLL1LLL1
1111111111111111
L1LLL1LLL1LLL1LL
1111111111111111
LLL1LLL1LLL1LLL1`]
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
155.44041450777203,
155.44041450777203: E5/155.44041450777203 + D5/155.44041450777203 + F5^155.44041450777203,
155.44041450777203: E5/155.44041450777203 + D5/155.44041450777203 + F5^155.44041450777203,
155.44041450777203: E5/155.44041450777203 + D5/155.44041450777203 + F5^155.44041450777203,
155.44041450777203: E5/155.44041450777203 + F5/155.44041450777203 + G5^155.44041450777203,
155.44041450777203: E5/155.44041450777203 + F5/155.44041450777203 + G5^155.44041450777203,
155.44041450777203: E5/155.44041450777203 + F5/155.44041450777203 + G5^155.44041450777203,
155.44041450777203: G5/155.44041450777203 + F5/155.44041450777203 + A5^155.44041450777203,
3730.5699481865286`
const unlock = tune`
181.8181818181818,
90.9090909090909: B4^90.9090909090909 + C5^90.9090909090909,
90.9090909090909: C5^90.9090909090909 + D5^90.9090909090909 + E5^90.9090909090909 + F5^90.9090909090909 + B4-90.9090909090909,
90.9090909090909: G5^90.9090909090909 + A5^90.9090909090909 + B5^90.9090909090909 + F5-90.9090909090909 + E5-90.9090909090909,
90.9090909090909: A5-90.9090909090909 + B5-90.9090909090909,
2363.6363636363635`

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

