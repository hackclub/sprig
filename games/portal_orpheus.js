/*
@title: Portal: Orpheus Edition
@author: [Lucas11, Art3mis]
@tags: []
@description: "An sprig game inspired by portal."
@addedOn: 2025-00-00
*/

const player = "p"
const cube = "c"
const button = "b"
const buttonspawner = "i"
const spawner = "s"
const wall = "w"
const blueportal = "o"
const redportal = "r"
const finish = "f"
const lazer = "l"
const adbanomendwall = "v"
const adbanomendfloor = "j"
const glados = "g"
const torrert = "t"
const passblockslazer = "y"
const finalblueportal = "z"
const finalredportal = "x"
const finalbutton = "n"
const floor = "z"


setLegend(
  [ player, bitmap`
...000..........
..02220.........
..02020.........
..022220........
..020220........
..02200........0
0.0220..11....0.
0002220001LL1L..
0202222220L111..
020222200.....0.
0202220........0
0222220.........
0222200.........
.0022020........
..022020........
..000000........`  ],
  [ blueportal, bitmap`
................
.....11111......
....1177711.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
.....11111......
................` ],
  [ finalblueportal, bitmap`
................
.....11111......
....1177711.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
....1777771.....
.....11111......
................` ],
  [ redportal, bitmap`
................
.....11111......
....1133311.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
.....11111......
................` ],
  [ finalredportal, bitmap`
................
.....11111......
....1133311.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
....1333331.....
.....11111......
................` ],
  [ cube, bitmap`
1111.......1111.
1111..111..1111.
111....8....111.
11.....8.....11.
......111.......
.....11111......
.1..1181811..1..
.1881888881881..
.1..1188811..1..
.....11811......
......111.......
11.....8.....11.
111....8....111.
1111..111..1111.
1111.......1111.
................` ],
  [ button, bitmap`
.......LL.......
....111LL111....
...1133333311...
..113333333311..
.11333333333311.
.13333333333331.
.13333333333331.
LL333333333333LL
LL333333333333LL
.13333333333331.
.13333333333331.
.11333333333311.
..113333333311..
...1133333311...
....111LL111....
.......LL.......`],
  [ finalbutton, bitmap`
.......LL.......
....111LL111....
...1133333311...
..113333333311..
.11333333333311.
.13333333333331.
.13333333333331.
LL333333333333LL
LL333333333333LL
.13333333333331.
.13333333333331.
.11333333333311.
..113333333311..
...1133333311...
....111LL111....
.......LL.......`],
  [ buttonspawner, bitmap`
.......LL.......
....111LL111....
...1177777711...
..117777777711..
.11777777777711.
.17777777777771.
.17777777777771.
LL777777777777LL
LL777777777777LL
.17777777777771.
.17777777777771.
.11777777777711.
..117777777711..
...1177777711...
....111LL111....
.......LL.......`],
  [ glados, bitmap`
.0....0000....0.
.0....0000....0.
.00....00....00.
..000.1111.000..
....0.1111.0....
...LLL1001LLL...
...LLL1001LLL...
..0LLL1001LLL0..
..0LLL1001LLL0..
..0LLL1111LLL0..
...LLL1111LLL...
....LL0110LL....
......0660......
......0660......
.......00.......
................`],
  [ finish, bitmap`
....LLLLLLLL....
.LLL11111111LLL.
.LL1122222211LL.
.L112222222211L.
.L122222777771L.
L11222227772211L
L12222227772271L
L12222227222771L
L12222222722271L
L12222227722721L
L12222227722771L
L12222227272271L
L11222227277211L
.L122222277721L.
.L112222777711L.
.LL1122277711LL.`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LL1111LLLL1111LL
L1L11L1LL1L11L1L
L11LL11LL11LL11L
L11LL11LL11LL11L
L1L11L1LL1L11L1L
LL1111LLLL1111LL
LLLLLLLLLLLLLLLL
LL1111LLLL1111LL
LL1111LLLL1111LL
L1L11L1LL1L11L1L
L11LL11LL11LL11L
L11LL11LL11LL11L
L1L11L1LL1L11L1L
LL1111LLLL1111LL
LLLLLLLLLLLLLLLL`],
  [ adbanomendwall, bitmap`
000000000D000000
D0LLLL000DLLLL00
DL0LL0L00D0LL0L0
DLL0DLLD0DL00LL0
DLLDDLL0DDL0DDL0
DL0DL0L00D0DLDD0
D0LDLL00DDDLLLDD
000DDDDD0D000000
00LLLL000DDDDDD0
00LLLL00DDLLLL00
DDDDDDDD0D0LL0L0
0LL00LD00DL0DLL0
0LDDDDL00DLDDLL0
0LDDDDL00DDDL0L0
00LLLL000DLLLL00
000000000D00000D`],
  [ adbanomendfloor, bitmap`
0000000000000000
0000000000000000
000D000000000000
000D000044444400
00DD0D44DD004400
00DDD000D0004000
0DDD004440044000
0D0D0440DD440000
044D440004400000
00044440044DD000
00DDDD440400DD00
0DDD0440444000D0
000D444404440000
0004000000440000
0044000000044000
0004444400000000`],
  [ spawner, bitmap`
0000000000000000
0LLLL07770LLLLL0
0LLLL07770LLLLL0
0LLLL07770LLLLL0
0LLLL07770LLLLL0
0LLLLL000LLLLLL0
0000000000000000
.0............0.
..0..........0..
...0........0...
....0......0....`],
  [ lazer, bitmap`
3333333333333333
9393939393939393
3333333333333333
9393939393939393
3333333333333333
3333333333333333
9393939393939393
3333333333333333
9393939393939393
3333333333333333
9393939393939393
3333333333333333
9393939393939393
3333333333333333
9393939393939393
3333333333333333`],
  [ passblockslazer, bitmap`
5555555555555555
7575757575757575
5555555555555555
7575757575757575
5555555555555555
5555555555555555
7575757575757575
5555555555555555
7575757575757575
5555555555555555
7575757575757575
5555555555555555
7575757575757575
5555555555555555
7575757575757575
5555555555555555`],
  [ floor, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ torrert, bitmap`
................
................
....1..11..1....
...11.1111.11...
...11.1111.11...
..111..11..111..
..11..1111..11..
..11LL1331LL11..
..11LL1331LL11..
..11..1111..11..
..11...11...11..
...1...LL...1...
...1.11LL11.1...
.....1LLLL1.....
.....0....0.....
.....0....0.....` ],
  [ torrert, bitmap`
................
................
....1..11..1....
...11.1111.11...
...11.1111.11...
..111..11..111..
..11..1111..11..
..11LL1331LL11..
..11LL1331LL11..
..11..1111..11..
..11...11...11..
...1...LL...1...
...1.11LL11.1...
.....1LLLL1.....
.....0....0.....
.....0....0.....` ],
)
setSolids([player, cube, wall, adbanomendwall, spawner])

let level = 0

const levels = [
`wwwwww
w.p..w
w...bw
w..c.w
wf...w
wwwwww`,
  map`
wwwwwwww
wp.l.r.w
w.cl...w
w..l.b.w
wfol...w
wwwwwwww`,
map`
ttwwwwww
s...pllw
b...cyiw
..w..llw
..w...fw
..wwwwww`,
  map`
vvvvvvvv
vp..t..v
v.c....v
v......v
v...w..v
vb....fv
vvvvvvvv`,
  map`
vvvvvvvvv
vp.s..wcv
v.....wwv
v...b...v
v.......v
vi.....fv
vvvvvvvvv`,
  map`
wwwwwwww
w.p.twsw
w....wbw
wf.c.www
w.....iw
wwwwwwww`,
  map`
wwwwwwww
wp.g...w
w.....cw
w.....bw
w.....fw
wwwwwwww`,
]
const melody = tune`
500: C4~500,
15500`
setBackground(floor);
const portal = tune`
500,
500: C4^500,
15000`
const dies = tune`
223.88059701492537: F5~223.88059701492537,
223.88059701492537: E5~223.88059701492537,
223.88059701492537: D5~223.88059701492537,
223.88059701492537: C5~223.88059701492537,
223.88059701492537: D4~223.88059701492537,
6044.776119402985`
const enter = tune`
300: B4~300,
300: G4~300,
9000`
setMap(levels[level])

  setPushables({
    [ player ]: [cube],
    [ cube ]: [cube, player]
  })
  
  onInput("s", () => {
    getFirst(player).y += 1
    playTune(melody)
  })
  onInput("d", () => {
    getFirst(player).x += 1
    playTune(melody)
  })
  
  onInput("w", () => {
    getFirst(player).y += -1
    playTune(melody)
  })
  onInput("a", () => {
    getFirst(player).x += -1
    playTune(melody)
  })
onInput("i", () => {
  // Check if the player can move up and there is no wall in the way
  if (getFirst(player).x > 0 && (getTile(getFirst(player).x - 1), getFirst(player).y)[0] == undefined || getTile(getFirst(player).x - 1, getFirst(player).y[0].type != wall)) {
    getFirst(player).x -= 1; // Move the player up
    
    // Spawn a portal at the player's previous position before the move
    addSprite(getFirst(player).x + 1, getFirst(player).y, blueportal); // Adjust the portal type as needed
    playTune(portal)
  }
});

onInput("k", () => {
  
  // Check if the player can move up and there is no wall in the way
  if (getFirst(player).x > 0 && (getTile(getFirst(player).x - 1), getFirst(player).y)[0] == undefined || getTile(getFirst(player).x - 1, getFirst(player).y[0].type != wall)) {
    getFirst(player).x -= 1; // Move the player up
    
    // Spawn a portal at the player's previous position before the move
    addSprite(getFirst(player).x  + 1, getFirst(player).y, redportal); // Adjust the portal type as needed
    playTune(portal)
  }
});
onInput("j", () => {
  setMap(levels[level])
});
onInput("l", () => {
  getFirst(cube).x -= 1; 
  getFirst(player).x -= 1;
});


afterInput(() => {
  const targetNumber2 = tilesWith(button).length;
  const targetNumber3 = tilesWith(cube).length;
  const targetNumber = tilesWith(player).length;
  const redPortalsCovered = tilesWith(player, redportal);
  const finalredPortalsCovered = tilesWith(player, finalredportal);
  const finalbluePortalsCovered = tilesWith(player, finalblueportal);
  const bluePortalsCovered = tilesWith(player, blueportal);
  const redPortalsCoveredcube = tilesWith(cube, redportal);
  const bluePortalsCoveredcube = tilesWith(cube, blueportal);
  const numberCovered = tilesWith(button, cube).length;
  const numberCoveredfinal = tilesWith(button, player).length;
  const numberCoveredLazer = tilesWith(player, lazer).length;
  const numberCoveredaLazer = tilesWith(player, passblockslazer).length;
  const numberCoveredaLazerCube = tilesWith(cube, passblockslazer).length;
  const numberCoveredFinish = tilesWith(player, finish).length;
  const numberCoveredCube = tilesWith(cube, lazer).length;
  const numberCoveredButton = tilesWith(player, buttonspawner).length;
  const numberCoveredFinalBlue = tilesWith(player, buttonspawner).length;
  const numberCoveredButtonCube = tilesWith(cube, buttonspawner).length;
    if (redPortalsCovered.length >= 1) {
    const bp = getFirst(blueportal);
    const pl = getFirst(player);
    

    pl.x = bp.x;
    pl.y = bp.y;
      playTune(enter)
  }
  if (finalbluePortalsCovered === targetNumber) {
      level = level + 1;  
  }

  if (finalredPortalsCovered === targetNumber) {
      level = level + 1;  
  }     
  
  if (redPortalsCoveredcube.length >= 1) {
    const bp = getFirst(blueportal);
    const cb = getFirst(cube);

        cb.x = bp.x;
        cb.y = bp.y;
        
}
  if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(redportal);
    const pl = getFirst(player);

    pl.x = rp.x;
    pl.y = rp.y;
    playTune(enter)
  }
    if (bluePortalsCoveredcube.length >= 1) {
    const rp = getFirst(redportal);
    const cb = getFirst(cube);

        cb.x = rp.x;
        cb.y = rp.y + 1;
      
        
  }
  if (numberCoveredButton === targetNumber) {
      addSprite(getFirst(spawner).x, getFirst(spawner).y + 1, cube);
  }
  else if (numberCoveredfinal === targetNumber) {
      addSprite(getFirst(spawner).x, getFirst(spawner).y + 1, cube);
  }
  else if (numberCoveredButtonCube === targetNumber2) {
      addSprite(getFirst(spawner).x, getFirst(spawner).y + 1, cube);
  }
  const nextLevel = levels[level];
  if (nextLevel) {
    if (numberCoveredLazer === targetNumber) {
      setMap(levels[level])
      playTune(dies)
    }
    else if (numberCoveredaLazer === targetNumber) {
      setMap(levels[level])
      playTune(dies)
    }
    else if (numberCoveredCube === targetNumber2) {
      getFirst(cube).remove();
      playTune(dies)
    }
    else if (numberCoveredaLazerCube === targetNumber3) {
      getFirst(cube).x = getFirst(cube).x + 1
      
    }
  }
  else {
    return;
  }
    // Turret line of sight detection
 const turrets = getAll(torrert);
  const pl = getFirst(player);

  for (let turret of turrets) {
    if (turret.x === pl.x) {
      // Same column - check up/down for walls
      let blocked = false;
      let minY = Math.min(turret.y, pl.y);
      let maxY = Math.max(turret.y, pl.y);

      for (let y = minY + 1; y < maxY; y++) {
        if (getTile(turret.x, y).some(t => t.type === wall || t.type === adbanomendwall || t.type === cube)) {
          blocked = true;
          break;
        }
      }

      if (!blocked) {
        setMap(levels[level]);
        playTune(dies)
      }
    }
  }

  if (numberCovered === targetNumber) {
    if (numberCoveredFinish === targetNumber) {
      level = level + 1;
      playTune(enter)

    const nextLevel = levels[level];
    if (nextLevel) {
      setMap(nextLevel);
    } else {
      addText("GG!", { y: 4, color: color`D` });
      addText("Made by Lucas11", { y: 5, color: color`7` });
      addText("Sprites by Art3mis", { y: 6, color: color`3` });
    }
    }

  }
})

