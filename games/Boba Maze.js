/*
@title: Boba Maze
@author: audreyolafz
@tags: []
@img: ""
@addedOn: 2024-02-19
Get through the levels of boba creation to make your own drink!
Two special keys let you advance to the next level with ease.
*/

const player = "p"
const ball = "a"
const snowglobe = "g"
const boba = "b"
const leaf = "f"
const blacktea = "t"
const cream = "c"
const drink = "d"

setLegend(
  [ player, bitmap`
....00000000....
..00LLLLLLLL00..
.00L........L00.
0L............L0
.00LL......LL00.
..000LLLLLL000..
..0L.000000.L0..
..0L........L0..
..0L........L0..
..0L........L0..
..0L........L0..
..0L........L0..
..0L........L0..
..0L........L0..
..00LLLLLLLL00..
....00000000....`],
  [ ball, bitmap`
................
................
......1111......
....1122221L....
...122222271L...
...122222277L...
..12222222221L..
..12222222271L..
..1222222227LL..
..12222222771L..
...177222771L...
...L17777711L...
....LL1111LL....
......LLLL......
................
................` ],
  [ snowglobe, bitmap`
......1111......
....11....11....
...1........1...
..1..........1..
.1............1.
.1............1.
1..............1
1..............1
1..............1
1..............1
.1............1.
.1............1.
..1..........1..
..L1........1L..
.LLL11....11LLL.
LLLLLL1111LLLLLL` ],
  [ boba, bitmap`
.....111111.....
...112222221L...
..12222222211L..
.12222222222CL..
.12222222222C1L.
.12222222222C1L.
122222222222FC1L
1222222222222F1L
1222222222222CLL
122222222222FC1L
.1122222222FC11L
..1FCC222FFFCLL.
..L11CFFFCCCCL..
...L1CCCCC111L..
...LL111111LL...
.....LLLLLL.....` ],
  [ leaf, bitmap`
..............00
............00D0
.........00044D0
......0004444D40
....004D44D4D4D0
...0444D44DD4409
..04444DD4444D0.
..04444D4444409.
.04444D44444D0..
.0444D44444D09..
0D44D44444D09...
0DD44444D009....
0D4444D0099.....
0D4D00099.......
0000999.........
9999............` ],
  [ blacktea, bitmap`
....0L0.00L.....
...0LL0L001L....
....100L000L....
.L0.000LL00.....
.LL..001L00..00.
.010000L0001L0..
.00000000.0L000.
0L.0.0000.0L0.0.
0L00.0100000000.
LL0.L0LL0000001.
L000L00000L.0LL.
L0.01L000LL.0L..
.0000L0.01.00L..
..000.0L0.0000..
....000L1000....
.....000L.......` ],
  [ cream, bitmap`
......CC........
.....C21C.......
.....C221C......
....C2121C......
....C21211C.....
...C2112211C....
..C22122211C....
..C221222211CC..
.C221122122111C.
C22112221222111C
C22112221122221C
.C112222211222C.
..CCC2222212CCC.
.....CCCCCCC....
................
................` ],
  [ drink, bitmap`
......1111......
......1..1......
......1001......
...0001221000...
.00222122122200.
0222221221222220
.00000000000000.
..099919919990..
..099919919990..
..099999999990..
..009999099900..
...0909999090...
...0999099990...
...0099990900...
....09999990....
....00000000....` ],
)

setSolids([player, ball, boba, leaf, blacktea, cream, drink])

let level = 0
const levels = [
  map`
p..f
.f..
..fg
f.f.`,
  map`
bg.b.
.b..b
..b..
bb..b
..pb.`,
  map`
tt.p.t
t..ttt
.t..t.
t.t...
.t.t.t
t.g...`,
  map`
...a.ap
.a..a..
ga.a...
a..a.aa
.a.a...
....a.a
aa....a`,
  map`
c...c...
...c.c.c
c.c.c.c.
p.c.c..g
c...c.cc
.c.c....
...cc..c
cc....c.`,
  map`
d`,
]

const currentLevel = levels[level];
setMap(currentLevel)

setPushables({
  [ player ]: [player]
})

onInput("w", () => {
  const melody = tune `
400: A4~400,
12400`
  playTune(melody)
  getFirst(player).y -= 1
})

onInput("a", () => {
  const melody = tune `
400: G4^400,
14400`
  playTune(melody)
  getFirst(player).x -= 1
})

onInput("s", () => {
  const melody = tune `
400: E4^400,
12400`
    playTune(melody)
  getFirst(player).y += 1
})

onInput("d", () => {
  const melody = tune `
400: F4^400,
14400`
    playTune(melody)
  getFirst(player).x += 1
})

onInput("i", () => {
  clearText();
  addText(`To Move:`, {y:3, color: color`0` });
  addText(`W, A, S, D`, {y:4, color: color`0` });
  addText(`Other Controls:`, {y:6, color: color`0` });
  addText(`I for help`, {y:7, color: color`0` });
  addText(`J to reset level`, {y:8, color: color`0` });
  setTimeout(() =>{
    clearText()
  }, 5000);
});

onInput("j", () => {
  const currentLevel = levels[level]; 

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

onInput("k", () => {
  clearTile(getFirst(player).x+1, getFirst(player).y)
  clearTile(getFirst(player).x-1, getFirst(player).y)
  clearTile(getFirst(player).x, getFirst(player).y+1)
  clearTile(getFirst(player).x, getFirst(player).y-1)
})

onInput("l", () => {
  addSprite(getFirst(player).x, getFirst(player).y, snowglobe)
})

afterInput(() => {
  const goal = tilesWith(snowglobe, player).length;

  if (goal === 1) {
    level++;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
        setMap(currentLevel);
    } else {
        addText("You made boba :D", { y: 6, color: color`H` });
    }
  }

  if (level === 0) {
    addText("Level 1", { y: 2, color: color`C` });
    addText("Collect tapioca leaves", { y: 7, color: color`L` });

    setTimeout(() => {
    clearText();
    }, 3000);
  } else if (level === 1) {
    addText("Level 2", { y: 2, color: color`C` });
    addText("Collect boba balls", { y: 7, color: color`L` });

    setTimeout(() => {
    clearText();
    }, 3000);
  } else if (level === 2) {
    addText("Level 3", { y: 2, color: color`C` });
    addText("Collect black tea leaves", { y: 7, color: color`L` });

    setTimeout(() => {
    clearText();
    }, 3000);
  } else if (level === 3) {
    addText("Level 4", { y: 2, color: color`C` });
    addText("Add water", { y: 7, color: color`L` });

    setTimeout(() => {
    clearText();
    }, 3000);
  } else if (level === 4) {
    addText("Level 5", { y: 2, color: color`C` });
    addText("Add cream on top", { y: 7, color: color`L` });

    setTimeout(() => {
    clearText();
    }, 3000);
  } else if (level === 5) {
    addText("Enjoy your drink!", { y: 7, color: color`L` });
     const melody = tune `
400: F4^400 + A4^400,
400: G4^400 + B4^400,
400: A4^400 + C5^400,
400: D5^400,
400: D5^400,
400: D5^400,
10400`
    playTune(melody)
    setTimeout(() => {
    clearText();
    }, 3000);
  }
})



