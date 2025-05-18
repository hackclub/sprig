/*
@title: Samurai_Master
@author: luca k
@tags: ['adventure', 'retro', 'action']
@addedOn: 2025-05-18
@description: A game themed around a Japanese Samurai traversing his way through a spiraling maze. Do you have what it takes to become The Samurai Master?
*/

const player = "p"
const playerstatic = "s"
const pushablebox = "j"
const temple = "k"
const templestatic = "m"
const katanaattack = "w"
const gate = "g"
const gateunlocked = "u"
const backgroundcolor = "q"
const terrain1 = "t"
const invisiblecollider = "i"
const cloud = "e"
const key = "y"
const katanacollectible = "b"
const enemy = "v"
const portalone = "x"
const portaltwo = "c"
const blackbox = "o"

var katanas = 0

var onMainMenu = true
var iInputEnabled = true
var mainGameInputsEnabled = false

//background music
const melody = tune`
600: C4~600,
600: C4~600,
600: C4~600 + E4^600,
600: C4~600 + G4^600,
600: C4~600 + D4^600,
600: C4~600 + G4^600,
600: C4~600,
600: C4~600 + E4^600,
600: C4~600 + G4^600,
600: C4~600 + D4^600,
600: C4~600 + G4^600,
600: C4~600,
600: C4~600 + E4^600,
600: C4~600 + G4^600,
600: C4~600 + D4^600,
600: C4~600 + A4^600,
600: C4~600,
600: C4~600 + E4^600,
600: C4~600 + G4^600,
600: C4~600 + D4^600,
600: C4~600 + F4^600,
600: C4~600,
600: C4~600 + E4^600,
600: C4~600 + G4^600,
600: C4~600 + D4^600,
600: C4~600 + A4^600,
600: C4~600 + B4^600,
600: C4~600 + C5^600,
600: C4~600 + B4^600,
600: C4~600 + A4^600,
600: C4~600 + G4^600,
600: C4~600`
playTune(melody, Infinity)

//sound effects
const enemycollisionSFX = tune`
176.47058823529412,
176.47058823529412: E4/176.47058823529412,
176.47058823529412: E4/176.47058823529412,
176.47058823529412: E4/176.47058823529412,
176.47058823529412: D4/176.47058823529412,
176.47058823529412: D4/176.47058823529412,
176.47058823529412: D4/176.47058823529412,
176.47058823529412: C4/176.47058823529412,
176.47058823529412: C4/176.47058823529412,
176.47058823529412: C4/176.47058823529412,
3882.3529411764707`
const keyPickupSFX = tune`
120,
120: F4^120,
120: F5^120,
3480`
const katanaPickupSFX = tune`
139.53488372093022: B4~139.53488372093022,
139.53488372093022: E4~139.53488372093022,
139.53488372093022: E5~139.53488372093022,
4046.5116279069766`
const enterNextRoomSFX = tune`
120: E4^120 + D4~120,
120: F4^120 + E4~120,
120: G4^120 + F4~120,
120: A4^120 + G4~120,
120: B4^120 + A4~120,
3240`
const gameStartSFX = tune`
74.07407407407408: C4-74.07407407407408,
74.07407407407408: D4-74.07407407407408,
74.07407407407408: E4-74.07407407407408,
74.07407407407408: D4-74.07407407407408,
74.07407407407408: C4-74.07407407407408,
74.07407407407408: D4-74.07407407407408,
74.07407407407408: E4-74.07407407407408,
74.07407407407408: F4-74.07407407407408,
1777.7777777777778`
const portalSFX = tune`
128.2051282051282: C4-128.2051282051282,
128.2051282051282: D4-128.2051282051282,
128.2051282051282: C4-128.2051282051282,
3717.948717948718`


setBackground("q")

//all of the sprites
setLegend(
  [player, bitmap`
................
.....FFFFF......
...FFFFFFFFF....
.FFFFFFFFFFFFF..
.....6666.......
...LLLLLLLL.....
..LLLLLLLLLLL...
.LLLLLLLLLLLL...
.LLLLLLLLLLLL...
.LLLLLLLLLLLL...
.LLLLLLLLLLLLL..
..1LLLLLLLLLLL..
.1.LLLLLLLLL....
.1.LLLLL..00....
....LL.....0....
....0......0....`],
  [playerstatic, bitmap`
................
.....FFFFF......
...FFFFFFFFF....
.FFFFFFFFFFFFF..
.....6666.......
...LLLLLLLL.....
..LLLLLLLLLLL...
.LLLLLLLLLLLL...
.LLLLLLLLLLLL...
.LLLLLLLLLLLL...
.LLLLLLLLLLLLL..
..1LLLLLLLLLLL..
.1.LLLLLLLLL....
.1.LLLLL..00....
....LL.....0....
....0......0....`],
  [pushablebox, bitmap`
.LLLLLLLLLLLLLL.
LL1L1LL11LL1L1LL
L1LLLL1111LLLL1L
LLL1L111111L1LLL
L1LLLLL11LLLLL1L
LLL1LLL11LLL1LLL
LL11LLL11LLL11LL
L11111111111111L
L11111111111111L
LL11LLL11LLL11LL
LLL1LLL11LLL1LLL
L1LLLLL11LLLLL1L
LLL1L111111L1LLL
L1LLLL1111LLLL1L
LL1L1LL11LL1L1LL
.LLLLLLLLLLLLLL.`],
  [temple, bitmap`
................
.00.00000000.00.
.06003333330060.
.00033333333000.
.03333333333330.
0000000000000000
.00333333333300.
..033333333330..
..033000000330..
..030011110030..
..030111LL1030..
..0301111L1030..
..0301L1111030..
..0301LL111030..
..030111111030..
..03LLLLLLLL30..`],
  [templestatic, bitmap`
................
.00.00000000.00.
.06003333330060.
.00033333333000.
.03333333333330.
0000000000000000
.00333333333300.
..033333333330..
..033000000330..
..030011110030..
..030111LL1030..
..0301111L1030..
..0301L1111030..
..0301LL111030..
..030111111030..
..03LLLLLLLL30..`],
  [katanaattack, bitmap`
................
................
................
................
.22222..........
..22222222......
......222222....
.........2222...
.......222222...
....222222......
222222222.......
22222222........
2222222.........
222.............
................
................`],
  [gate, bitmap`
00............00
3300000000000033
.33333333333333.
...3........3...
3333333333333333
...3........3...
...3........3...
..33LL....LL33..
..33.LL00LL.33..
..3...0..0...3..
..3...0000...3..
..3..L0LL0L..3..
..3LLL0000LLL3..
..3L........L3..
..3..........3..
..3..........3..`],
  [gateunlocked, bitmap`
00............00
3300000000000033
.33333333333333.
...3........3...
3333333333333333
...3........3...
...3........3...
..33........33..
..33........33..
..3..........3..
..3..........3..
..3..........3..
..3..........3..
..3..........3..
..3..........3..
..3..........3..`],
  [backgroundcolor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [terrain1, bitmap`
.CCCCCCCCCCCCCC.
CCFFCFFCCFFCFFCC
CFCCCCCCCCCCCCFC
CFCFCCCCCCCCFCFC
CCCCCCCCCCCCCCCC
CFCCCCCCCCCCCCFC
CFCCCCCCCCCCCCFC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CFCCCCCCCCCCCCFC
CFCCCCCCCCCCCCFC
CCCCCCCCCCCCCCCC
CFCFCCCCCCCCFCFC
CFCCCCCCCCCCCCFC
CCFFCFFCCFFCFFCC
.CCCCCCCCCCCCCC.`],
  [invisiblecollider, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [cloud, bitmap`
................
................
......222.......
....22222222....
..222222222222..
.22222222222222.
2222222222222222
2222222222222222
2222222222222222
.22222222222222.
................
................
................
................
................
................`],
  [key, bitmap`
................
................
.....000000.....
...0004444000...
...0444444440...
..004FF44FF400..
..044444444440..
..04F444444F40..
..04FF4444FF40..
..044F4444F440..
..004FFFFFF400..
...0444444440...
...0004444000...
.....000000.....
................
................`],
  [katanacollectible, bitmap`
.L..............
.LL.............
.LL.............
.LL.............
..LL............
..LLL...........
...LLL..........
..2.LLL.........
.2...LLLL.......
2......LLL.0....
2.22....LL00....
22.......000....
........00000...
...........000..
............00..
................`],
  [enemy, bitmap`
..0..........0..
..00........00..
..0F0......0F0..
..0F0......0F0..
..0F00000000F0..
..0FFFFFFFFFF0..
..0F000FF000F0..
..0F030FF030F0..
..0F000FF000F0..
..0FFFFFFFFFF0..
..0FF000000FF0..
..0FF033330FF0..
..00F000000F00..
...0FFFFFFFF0...
....00000000....
................`],
  [portalone, bitmap`
................
....00000000....
...00LLLLLL00...
..00L000000L00..
.00L00000000L00.
.0L000LLLLL00L0.
.0L00L00000L0L0.
.0L00L00L00L0L0.
.0L00L0L0L0L0L0.
.0L00L000L0L0L0.
.00L00LLL00L000.
.000L00000L0000.
..000LLLLL0000..
...0000000000...
....00000000....
................`],
  [portaltwo, bitmap`
................
....00000000....
...00LLLLLL00...
..00L000000L00..
.00L00000000L00.
.0L000LLLLL00L0.
.0L00L00000L0L0.
.0L00L00L00L0L0.
.0L00L0L0L0L0L0.
.0L00L000L0L0L0.
.00L00LLL00L000.
.000L00000L0000.
..000LLLLL0000..
...0000000000...
....00000000....
................`],
  [blackbox, bitmap`
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
0000000000000000`]
)

setSolids([player, terrain1, gate, invisiblecollider, pushablebox])

let level = 0
const levels = [
  map`
eeeee
.....
m.u.s
ttttt`,
  map`
.......
..e..e.
e......
....e..
iiiiiii
.p..u.k
ttttttt`,
  map`
t......t
t.tttt.t
t....t.t
tttt.t.t
k....t.t
tttttt.t
.p.....t
tttttttt`,
  map`
..u..t...t
.ttt...t..
.t.g....t.
.t.tttttt.
.tkty.....
.tttttttt.
........tb
ttttttt.tt
p..u.....t
tttttttttt`,
  map`
..tttttk.......u....
.tt...ttttt..ttttt..
....v.....tt..t..t..
.ttt..ttt..t.tt.vt..
.tyt.vt.t.......vt..
.t.t....t..tttttvt..
.t.tv.t.t..t.....t..
.t.t..t.t..t.ttt.t..
.t.t.vt.t..t.t.t.t.u
.t.t..t.t..t.t.t.ttv
...tv.t.ttttgt.t....
tttt..t........tttt.
t.....t.tttttt....t.
t.ttttttt..t.tttttt.
tptb................`,
  map`
.j.....b
tkttttgt
.t....j.
j..t.t.t
.ttt..j.
.ttttt.t
pj.jvt.y`,
  map`
....bt.ttttttt
.tjtttj.......
.tjt...tttt.tv
.tjt.ttv..t.ty
.tjt.t..t.t.t.
.tjt.t..t.t.t.
.tj.....t.tjt.
.tpttttvt...t.
...tvg....k...`,
  map`
.......
.....e.
.e.....
....e..
.......
iiiiiii
up....k`,
  map`
.....tt...ttt
.tttgt.j..y.t
.t...t.tttj.t
.tbttt.t.t.j.
.tttvt...t..t
....jt.t.tt.t
tttt.ttvjvt.t
up........tkt`,
  map`
c..b.g....k
ttttttttttt
v.v.v.v.v.v
.v.v.v.v.v.
iiiiiiiiiii
p...u.y...x
ttttttttttt`,
  map`
ttttttttttttt
.............
.ttt.ttttttt.
.tbv.t...tyt.
.t.t.t.t.t.t.
.g.v.t...t.t.
jttt.t.t...t.
.t.v.t.ttttt.
..ktpt.......
.tttttttttttt`,
  map`
............t
..tttttttt.tt
..j....c.t...
tt.tgttt.ttt.
...t.txb.tyt.
...tkt.ttt.t.
..tttt.tmt...
.jjp...vvtttt`,
  map`
ytc.........
.tttttttttt.
.t.v......t.
ut.ttgttt.t.
.t.tk.t...t.
..jtttt.ttt.
bjp..xt.....`,
  map`
.tg.ct..........tx
.tkttt..t.......t.
.ttt....t.tttjttt.
.....tttt.t.t.t.t.
tjt.tt....t.t.t.t.
tbt.t...ttt.t.j...
t.t...t.....t.t.t.
t.tt..tttt.tttt...
t..tt....t....t.tt
t...j.tt.tt.t.ttty
ttttt..t....t..v..
p......ttttttv...v`
]

let winscreen = 0
const winscreens = [
  map`
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo`
]

setMap(levels[level])

setPushables({
  [player]: [pushablebox],
  [pushablebox]: [pushablebox]
})

//Text for the main menu
addText("SAMURAI MASTER", { y: 3, color: color`C` });
addText("PRESS I TO START", { y: 5, color: color`3` });

//Makes the transition out of the MainMenu
if (onMainMenu) {
  onInput("i", () => {
    if (iInputEnabled) {
      onMainMenu = false;
      level = level + 1;
      setMap(levels[level]);
      iInputEnabled = false;
      clearText();
      playTune(gameStartSFX);
      mainGameInputsEnabled = true;
    }
  })
}

onInput("w", () => {
  if (mainGameInputsEnabled) {
    getFirst(player).y -= 1
  }
})

onInput("s", () => {
  if (mainGameInputsEnabled) {
    getFirst(player).y += 1
  }
})

onInput("a", () => {
  if (mainGameInputsEnabled) {
    getFirst(player).x -= 1
  }
})

onInput("d", () => {
  if (mainGameInputsEnabled) {
    getFirst(player).x += 1
  }
})

onInput("j", () => {
  if (mainGameInputsEnabled) {
    setMap(levels[level]);
  }
})


afterInput(() => {

  const keyPickup = tilesWith(player, key);
  const numberOfGoalsCovered = tilesWith(player, temple);
  const isPlayerTouchingEnemy = tilesWith(player, enemy);
  const isPlayerTouchingKatana = tilesWith(player, katanacollectible);
  const isPlayerTouchingPortalOne = tilesWith(player, portalone);
  const isPlayerTouchingPortalTwo = tilesWith(player, portaltwo);

  if (keyPickup.length >= 1) {
    getFirst(key).remove();
    getFirst(gate).remove();
    playTune(keyPickupSFX)
  }

  if (numberOfGoalsCovered.length > 0) {
    level = level + 1;
    playTune(enterNextRoomSFX)

    if (level < levels.length) { //if level is less than current level value, set new level to be present
      setMap(levels[level]);
    } else {
      setMap(winscreens[winscreen])
      addText("Surmounting every", { y: 1, color: color`3` });
      addText("challenge,", { y: 2, color: color`3` });
      addText("You have earned", { y: 4, color: color`3` });
      addText("your success,", { y: 5, color: color`3` });
      addText("AS THE:", { y: 7, color: color`3` });
      addText("SAMURAI MASTER", { y: 8, color: color`C` });
      addText("Katanas", { y: 10, color: color`7` });
      addText("collected: " + katanas + "/10", { y: 11, color: color`7` });
      addText("Thanks for playing!", { y: 14, color: color`9` });
    }
  }


  if (isPlayerTouchingEnemy.length > 0) {
    playTune(enemycollisionSFX)
    setMap(levels[level])
  }

  if (isPlayerTouchingKatana.length > 0) {
    katanas = katanas + 1
  }

  if (isPlayerTouchingKatana.length >= 1) {
    getFirst(katanacollectible).remove();
    playTune(katanaPickupSFX)
  }

  if (isPlayerTouchingPortalTwo.length >= 1) {
    const pOne = getFirst(portalone);
    const pl = getFirst(player);

    pl.y = pOne.y
    pl.x = pOne.x

    playTune(portalSFX);
  }

  if (isPlayerTouchingPortalOne.length >= 1) {
    const pTwo = getFirst(portaltwo);
    const pl = getFirst(player);

    pl.y = pTwo.y
    pl.x = pTwo.x

    playTune(portalSFX);
  }

})