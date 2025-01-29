/**
@title: Kilroy Saves the Game!
@author: Jacob Fisher
@tags: []
@addedOn: 2024-07-08
*/
const quick = false
const speed = quick ? 0.25 : 1.0
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * speed))

/* Sprites */
const blank = "_"
const blankDark = "-"
const player = "kLry"
const robot = "R"
const robot2 = "T"
const brokenRobot = "/"
const note = "N"
const sidewaysNote = "s"
const npc = "npc"
const bolts = "bolt"
const correctBolt = "C"
const drill = "d"
const checkeredBackground = "x"
const drawer = "Dwa"
const mousePointer = "^"
const brain = "B"

setLegend(
  [ blank, bitmap`
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
2222222222222222` ],
  [ blankDark, bitmap`
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
0000000000000000` ],
  [ mousePointer, bitmap`
......00........
.....0220.......
.....0220.......
.....0220.......
.....0220000....
.....022020200..
..00.0220202020.
.02200222222220.
.02220222222220.
..0222222222220.
...022222222220.
...02222222220..
....0222222220..
.....02222220...
......0222020...
......0000.00...` ],
  [ player[0], bitmap`
................
................
................
................
................
................
................
..............00
.............066
............0666
...........06666
...........06666
..........066666
..........066666
..........000666
..0000000.022066` ],
  [ player[1], bitmap`
................
................
................
................
................
................
................
00..............
660.............
6660............
66660...........
66660...........
666660..........
666660..........
666000..........
660220.0000000..` ],
  [ player[2], bitmap`
..0606060.020066
0006060600000066
..0606000....066
..00060......066
....000......066
.............066
.............066
.............066
..............06
...............0
................
................
................
................
................
................`],
  [ player[3], bitmap`
660020.0606060..
6600000060606000
660....0006060..
660......06000..
660......000....
660.............
660.............
660.............
60..............
0...............
................
................
................
................
................
................`],
  [ brain, bitmap`
................
.......0000.....
...0000118000...
.00808888808800.
.01088080808010.
0118081188808110
0188880108008810
0800888011880080
0801180881888880
.008800180888000
..00110101100810
....000808088880
.......00000000.
..........0180..
...........0810.
............000.` ],
  [ robot, bitmap`
................
................
....1...........
..1..1..........
..11..1.........
..1.1F.1........
..1..19.1.......
..1...19.1......
..1....19.1.....
..1.....19.1....
..1......111....
..1......111....
5555555555555557
5555252525255557
5555555555555557
.00.........00..`],
  [ robot2, bitmap`
................
................
...........1....
..........1..1..
.........1..11..
........1.F1.1..
.......1.91..1..
......1.91...1..
.....1.91....1..
....1.91.....1..
....111......1..
....111......1..
C333333333333333
C333323232323333
C333333333333333
..00.........00.`],
  [ brokenRobot, bitmap`
................
................
................
...........3....
............3...
.......1....93..
.....99.1..3993.
....9.19.1.39663
..1....19.396663
..1.....1.396663
..1......113663.
..1......11133..
5555555555555557
5555252525255557
5555555555555557
.00.........00..`],
  [ note, bitmap`
.....000000.....
....09999990....
..009999999900..
..099900009990..
.09900....00990.
0990........0990
0990........0990
0990........0990
0990........0990
0990........0990
0990........0990
.09900....00990.
..099900009990..
..009999999900..
....09999990....
.....000000.....`],
  [ sidewaysNote, bitmap`
................
................
....0000........
..0099990000....
.099999999990...
09990009999990..
0990...00099990.
0990......009990
099900......0990
.09999000...0990
..09999990009990
...0999999999990
....00009999000.
........0000....
................
................`],
  [ npc[0], bitmap`
................
.....00000......
....0222220.....
....0202020.....
....0202020.....
....0222220.....
.....02220......
...001777100....
...011777110....
..00177777100...
.0220777770220..
.0220777770220..
..000FFFFF000...
....0FF0FF0.....
....0FF0FF0.....
.....00.00......`],
  [ npc[1], bitmap`
................
.....00000......
....0CCCCC0.....
....0C0C0C0.....
....0C0C0C0.....
....0CCCCC0.....
.....0CCC0......
...001444100....
...011444110....
..00144444100...
.0CC0444440CC0..
.0CC0444440CC0..
..000FFFFF000...
....0FF0FF0.....
....0FF0FF0.....
.....00.00......`],
  [ npc[2], bitmap`
................
..44400000444...
..44022222044...
...402020204....
...402020204....
....0222220.....
.....02220......
...00H888H00....
...0HH888HH0....
..00H88888H00...
.0220888880220..
.0220888880220..
..000LLLLL000...
....0LL0LL0.....
....0LL0LL0.....
.....00.00......` ],
  [ drill, bitmap`
................
...........00...
....00FFFFFFFFFF
...2L0666666666F
LLL10066666F6F6F
...LL0666666666F
....00FFFFF666FF
.........LFFFFLL
..........L06L..
..........L06L..
..........L06L..
..........L06L..
..........L06L..
.........L111L..
........L66666L.
.......L000000L.` ],
  [ bolts[0], bitmap`
........L.......
.......L2L......
......L211L.....
.....L21111L....
......L2111LL...
.......L11LL0L..
......L21LL000L.
.....L211L00000L
....L21110L000L.
...L21110L.L0L..
..L21110L...L...
.L21110L........
.L1110L.........
.L000L..........
..LLL...........
................`],
  [ bolts[1], bitmap`
.......L........
......L2L.......
.....L112L......
....L11112L.....
...LL1112L......
..L0LL11L.......
.L000LL12L......
L00000L112L.....
.L000L01112L....
..L0L.L01112L...
...L...L01112L..
........L01112L.
.........L0111L.
..........L000L.
...........LLL..
................`],
  [ bolts[2], bitmap`
................
...LLLLLLLLLL...
..L22111LL000L..
..L221111L000L..
..L2221110000L..
...LLL2110LLL...
.....L2110L.....
.....L2110L.....
.....L2110L.....
.....L2110L.....
.....L2110L.....
.....L2110L.....
.....L2110L.....
......L00L......
.......LL.......
................`],
  [ bolts[3], bitmap`
................
...L222222222...
...L111111112...
..L11111111112..
..L11111111112..
.L1111111111112.
.L1111111111112.
L111111LL1111112
L111111LL1111112
.L1111111111112.
.L1111111111112.
..L11111111112..
..L11111111112..
...L111111112...
...LLLLLLLLL2...
................` ],
  [ correctBolt, bitmap`
........7.......
.......727......
......72HH7.....
.....72HHHH7....
......72HHH77...
.......7HH7757..
......72H775557.
.....72HH7555557
....72HHH575557.
...72HHH57.757..
..72HHH57...7...
.72HHH57........
.7HHH57.........
.75557..........
..777...........
................`],
  [ checkeredBackground, bitmap`
2222....2222....
2222....2222....
2222....2222....
2222....2222....
....2222....2222
....2222....2222
....2222....2222
....2222....2222
2222....2222....
2222....2222....
2222....2222....
2222....2222....
....2222....2222
....2222....2222
....2222....2222
....2222....2222`],
  [ drawer[0], bitmap`
0000000000000000
0333333333333333
0333333333333333
0332222222222222
033LLLLLLLLLLLLL
033LLLLLLLLLLLLL
0333333333333333
0332222222222222
033LLLLLLLLLLLLL
033LLLLLLLLLLLLL
0333333333333333
0332222222222222
033LLLLLLLLLLLLL
033LLLLLLLLLLLLL
0333333333333333
0000000000000000` ],
  [ drawer[1], bitmap`
0000000000000000
3333333333333333
3333333333333333
2222222222222222
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
2222222222222222
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
2222222222222222
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
0000000000000000` ],
  [ drawer[2], bitmap`
0000000000000000
3333333333333330
3333333333333330
2222222222222330
LLLLLLLLLLLLL330
LLLLLLLLLLLLL330
3333333333333330
2222222222222330
LLLLLLLLLLLLL330
LLLLLLLLLLLLL330
3333333333333330
2222222222222330
LLLLLLLLLLLLL330
LLLLLLLLLLLLL330
3333333333333330
0000000000000000` ]
)

setSolids([...player, mousePointer, brain, checkeredBackground, blankDark, note, sidewaysNote, robot, robot2, brokenRobot, drill, npc[0]])

setPushables({
  [player[0]]: []
})

const drawers = [
  [{x:1,y:1}, {x:2,y:1}],
  [{x:1,y:2}, {x:2,y:2}],
  [{x:1,y:3}, {x:2,y:3}],
  [{x:4,y:1}, {x:5,y:1}],
  [{x:4,y:2}, {x:5,y:2}],
  [{x:4,y:3}, {x:5,y:3}],
]
const randomDrawerNumber = Math.floor(Math.random() * 6);
const correctDrawer = drawers[randomDrawerNumber];
const drillDrawer = drawers[randomDrawerNumber === 0 ? 5 : randomDrawerNumber - 1];

let phase = "I"
onInput("w", () => {
  if (phase === "III" || phase === "III.iv") {
    getFirst(mousePointer).y -= 1
  } else if (phase === "III.ii") {
    getFirst(brain).y -= 1
  } else if (phase === "IV.ii") {
    getFirst(player[0]).y -= 1
    getFirst(player[1]).y -= 1
    getFirst(player[2]).y -= 1
    getFirst(player[3]).y -= 1
  }
})
onInput("s", () => {
  if (phase === "III" || phase === "III.iv") {
    getFirst(mousePointer).y += 1
  } else if (phase === "III.ii") {
    getFirst(brain).y += 1
  } else if (phase === "IV.ii") {
    getFirst(player[2]).y += 1
    getFirst(player[3]).y += 1
    getFirst(player[0]).y += 1
    getFirst(player[1]).y += 1
  }
})
onInput("a", () => {
  if (phase === "III" || phase === "III.iv") {
    getFirst(mousePointer).x -= 1
  } else if (phase === "III.ii") {
    getFirst(brain).x -= 1
  } else if (phase === "IV.ii") {
    getFirst(player[0]).x -= 1
    getFirst(player[2]).x -= 1
    getFirst(player[1]).x -= 1
    getFirst(player[3]).x -= 1
  }
})
onInput("d", () => {
  if (phase === "III" || phase === "III.iv") {
    getFirst(mousePointer).x += 1
  } else if (phase === "III.ii") {
    getFirst(brain).x += 1
  } else if (phase === "IV.ii") {
    getFirst(player[1]).x += 1
    getFirst(player[3]).x += 1
    getFirst(player[0]).x += 1
    getFirst(player[2]).x += 1
  }
})

const maps = {
  blankIntermission: map`
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------
--------------------`,
  opener: map`
.....
.pcn.
.....
.....`,
  introduceKilroy: map`
..........
..........
....kL....
....ry....
..........
..........
..........
..........`,
  movingRobotIn: map`
__________
__________
..........
..........
..........
........kL
....Rcpnry
..........`,
  pickADrawer: map`
Da.Da
Da.Da
Da^Da
.....`,
  emptyDrawer: map`
----------
-........-
-........-
-........-
-........-
-........-
-........-
----------`,
  boltMaze: map`
---------------
-.-......-....-
-.-.----.-.--.-
-......-...-..-
-.-.----.-.-.--
-.-.-.--.-.-.--
-.-....-.-..-.C
-.-.----.----.-
B.-..-.-......-
-.----.--------
-.............-
---------------`,
  pickABolt: map`
----------
-boltbtol-
-lttotlbt-
-otblobto-
-tolbtolt-
-lbotlbot-
-tltbttlb-
----------`,
  drawerWithDrill: map`
----------
-...s....-
-..N...N.-
-.....N..-
-...d..s.-
-.s...N..-
-..s.....-
----------`,
  practiceField: map`
NNxxNxxx/n
NxsxNxsx..
xT.....R..
xx.....d..
sN..N.....
xR..d.....
kL..xxsxNx
ry..NTxNNN`,
  waitForPassingRobot: map`
----kL----
----ry----
----..----
----..----
T.........
----..----
----..----
----..----`
};

let oldKilroyPos = []

let inputKDebounce = false;
onInput("k", async () => {
  if (inputKDebounce) return;
  inputKDebounce = true;
  
  if (phase === "III") {
    const tile = tilesWith(mousePointer)[0][0]
    const drawerIsCorrect = (tile.x + 1 === correctDrawer[0].x && tile.y + 1 === correctDrawer[0].y) || (tile.x + 1 === correctDrawer[1].x && tile.y + 1 === correctDrawer[1].y)
      clearText()
    
    if (drawerIsCorrect) {
      setMap(maps.pickABolt)
      phase = "III.i"

      await sleep(500)
      addText("I found the bolts!", {
        x: 2,
        y: 1,
        color: color`2`
      })

      await sleep(1_500)
      addText("But which bolt??", {
        x: 2,
        y: 15,
        color: color`2`
      })

      await sleep(2_000)
      phase = "III.ii"
      clearText()
      setMap(maps.boltMaze)
      addText("Find the bolt!", {
        x: 3,
        y: 15,
        color: color`2`
      })
    } else {
      setMap(maps.emptyDrawer)
      addText("Wrong Drawer ):", {
        x: 3,
        y: 6,
        color: color`0`
      })
      await sleep(3_000)

      setMap(maps.pickADrawer)
      clearText()
      addText("Look for the right", {
        x: 1,
        y: 13,
        color: color`0`
      })
      addText("drawer and press K", {
        x: 1,
        y: 14,
        color: color`0`
      })
    }
  } else if (phase === "III.iv") {
    const tile = tilesWith(mousePointer)[0][0]
    const drawerIsCorrect = (tile.x + 1 === drillDrawer[0].x && tile.y + 1 === drillDrawer[0].y) || (tile.x + 1 === drillDrawer[1].x && tile.y + 1 === drillDrawer[1].y)
    clearText()
    
    if (drawerIsCorrect) {
      setMap(maps.drawerWithDrill)

      await sleep(500)
      addText("There it is!", {
        x: 2,
        y: 1,
        color: color`2`
      })

      await sleep(3_000)
      phase = "IV"
      clearText()
      setMap(maps.blankIntermission)
      addText("Let's get this to", {
        x: 1,
        y: 6,
        color: color`2`
      })
      addText("the team!", {
        x: 3,
        y: 7,
        color: color`2`
      })

      await sleep(1_500)
      clearText()
      setMap(maps.waitForPassingRobot)
      phase = "IV.i"

      await sleep(1_000)
      getFirst(robot2).x += 1
      
      await sleep(Math.floor(Math.random()) + 1)
      getFirst(robot2).x += 1
      getFirst(player[2]).y += 1
      getFirst(player[3]).y += 1
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1

      await sleep(1_000)
      getFirst(robot2).x += 1
      
      await sleep(Math.floor(Math.random() * 1_000) + 1_000)
      getFirst(robot2).x += 1
      getFirst(player[2]).y += 1
      getFirst(player[3]).y += 1
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1

      await sleep(1_000)
      getFirst(robot2).x += 1
      
      await sleep(Math.floor(Math.random() * 1_000) + 1_000)
      getFirst(robot2).x += 1

      await sleep(1_000)
      getFirst(robot2).x += 1
      getFirst(player[2]).y += 1
      getFirst(player[3]).y += 1
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1
      
      await sleep(Math.floor(Math.random() * 1_000) + 1_000)
      getFirst(robot2).x += 1
      getFirst(player[2]).y += 1
      getFirst(player[3]).y += 1
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1

      await sleep(1_000)
      getFirst(robot2).x += 1
      getFirst(player[2]).y += 1
      getFirst(player[3]).y += 1
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1

      await sleep(Math.floor(Math.random() * 1_000) + 1_000)
      clearTile(getFirst(robot2).x, getFirst(robot2).y)
      getFirst(player[2]).y += 1
      getFirst(player[3]).y += 1
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1

      await sleep(1_000)
      clearTile(getFirst(player[2]).x, getFirst(player[2]).y)
      clearTile(getFirst(player[3]).x, getFirst(player[3]).y)
      getFirst(player[0]).y += 1
      getFirst(player[1]).y += 1

      await sleep(1_000)
      clearTile(getFirst(player[0]).x, getFirst(player[0]).y)
      clearTile(getFirst(player[1]).x, getFirst(player[1]).y)

      setMap(maps.blankIntermission)
      await sleep(500)
      setMap(maps.practiceField)
      phase = "IV.ii"
      oldKilroyPos = [
        {x: getFirst(player[0]).x, y: getFirst(player[0]).y},
        {x: getFirst(player[1]).x, y: getFirst(player[1]).y},
        {x: getFirst(player[2]).x, y: getFirst(player[2]).y},
        {x: getFirst(player[3]).x, y: getFirst(player[3]).y},
      ]
    } else {
      setMap(maps.emptyDrawer)
      addText("Wrong Drawer ):", {
        x: 3,
        y: 6,
        color: color`0`
      })
      await sleep(3_000)

      setMap(maps.pickADrawer)
      clearText()
      addText("I forgot the drill!", {
        x: 1,
        y: 13,
        color: color`0`
      })
      addText("Look for the drawer", {
        x: 1,
        y: 14,
        color: color`0`
      })
    }
  }
  inputKDebounce = false;
})

afterInput(async () => {
  if (phase === "III.ii") {
    if (tilesWith(brain)[0][1]?.type !== correctBolt) return;
    phase = "III.iii"

    setMap(maps.blankIntermission)
    clearText()

    addText("You found it!", {
      x: 3,
      y: 6,
      color: color`2`
    })

    await sleep(2_000)

    setMap(maps.pickADrawer)
    clearText()
    addText("I forgot the drill!", {
      x: 1,
      y: 13,
      color: color`0`
    })
    addText("Look for the drawer", {
      x: 1,
      y: 14,
      color: color`0`
    })
    phase = "III.iv"
  } else if (phase === "IV.ii") {
    let stayedSame = false;
    oldKilroyPos.forEach((pos, index) => {
      if (getFirst(player[index]).x === pos.x && getFirst(player[index]).y === pos.y) stayedSame = true;
    })

    if (stayedSame) {
      oldKilroyPos.forEach((pos, index) => {
        getFirst(player[index]).x = pos.x
        getFirst(player[index]).y = pos.y
      })
    } else {
      oldKilroyPos = [
        {x: getFirst(player[0]).x, y: getFirst(player[0]).y},
        {x: getFirst(player[1]).x, y: getFirst(player[1]).y},
        {x: getFirst(player[2]).x, y: getFirst(player[2]).y},
        {x: getFirst(player[3]).x, y: getFirst(player[3]).y},
      ]
    }

    if (!(getFirst(player[1]).x === 9 && getFirst(player[1]).y === 1)) return;
    phase = "IV.iii"

    await sleep(500)
    setMap(maps.movingRobotIn)
    getFirst(robot).type = brokenRobot

    await sleep(1_000)
    clearText()
    addText("Student 1:", {
      x: 1,
      y: 1
    })
    addText("You got the bolt!", {
      x: 1,
      y: 2
    })

    await sleep(2_000)
    clearText()
    addText("Student 3:", {
      x: 1,
      y: 1
    })
    addText("Hooray!!", {
      x: 1,
      y: 2
    })

    await sleep(2_000)
    clearText()
    addText("Student 2:", {
      x: 1,
      y: 1
    })
    addText("Ok, let's do this!", {
      x: 1,
      y: 2
    })

    playTune(tune`
291.2621359223301,
291.2621359223301: A5^291.2621359223301 + B5/291.2621359223301,
291.2621359223301: B5/291.2621359223301 + A5^291.2621359223301,
291.2621359223301: B5/291.2621359223301 + A5^291.2621359223301,
291.2621359223301: B5/291.2621359223301 + A5^291.2621359223301,
291.2621359223301: B5/291.2621359223301 + A5^291.2621359223301,
7572.8155339805835`)
    await sleep(2_000)
    getFirst(brokenRobot).type = robot

    await sleep(1_000)
    getFirst(npc[1]).y += 1
    getFirst(npc[2]).y -= 1
    getFirst(npc[0]).y += 1
    await sleep(250)
    getFirst(npc[1]).y -= 1
    getFirst(npc[2]).y += 1
    getFirst(npc[0]).y -= 1
    await sleep(250)
    getFirst(npc[1]).y -= 1
    getFirst(npc[2]).y += 1
    getFirst(npc[0]).y -= 1
    await sleep(250)
    getFirst(npc[1]).y += 1
    getFirst(npc[2]).y -= 1
    getFirst(npc[0]).y += 1

    clearText()
    addText("Student 1:", {
      x: 1,
      y: 1
    })
    addText("Let's play!!", {
      x: 1,
      y: 2
    })

    await sleep(2_000)
    setMap(maps.blankIntermission)
    clearText()
    addText("They would go on", {
      x: 1,
      y: 6,
      color: color`2`
    })
    addText("to win the game", {
      x: 1,
      y: 7,
      color: color`2`
    })

    await sleep(3_000)
    clearText()
    addText("THE END!", {
      x: 3,
      y: 6,
      color: color`2`
    })
  }
})

setBackground(checkeredBackground)
setMap(maps.opener)
addText("Welcome!", {
  x: 6,
  y: 10,
  color: color`0`
})

async function start() {
  await sleep(2_000)
  clearText()
  
  addText("FIRST Robotics is a", {
    x: 1,
    y: 10,
    color: color`0`
  })
  addText("youth STEM org that", {
    x: 1,
    y: 11,
    color: color`0`
  })
  addText("inspires children", {
    x: 1,
    y: 12,
    color: color`0`
  })
  addText("of all ages to", {
    x: 1,
    y: 13,
    color: color`0`
  })
  addText("build and program", {
    x: 1,
    y: 14,
    color: color`0`
  })
  addText("ROBOTS!", {
    x: 1,
    y: 15,
    color: color`7`
  });

  await sleep(8_000)
  clearText()

  addText("FRC is a divison of", {
    x: 1,
    y: 10,
    color: color`0`
  })
  addText("High Schoolers, and", {
    x: 1,
    y: 11,
    color: color`0`
  })
  addText("has more complex", {
    x: 1,
    y: 12,
    color: color`0`
  })
  addText("game mechanics.", {
    x: 1,
    y: 13,
    color: color`0`
  })

  await sleep(4_000)
  clearText()

  addText("Now, let's begin!", {
    x: 2,
    y: 12,
    color: color`5`
  })

  await sleep(1_000)
  getFirst(npc[1]).y += 1
  getFirst(npc[2]).y -= 1
  getFirst(npc[0]).y += 1
  await sleep(250)
  getFirst(npc[1]).y -= 1
  getFirst(npc[2]).y += 1
  getFirst(npc[0]).y -= 1
  await sleep(250)
  getFirst(npc[1]).y -= 1
  getFirst(npc[2]).y += 1
  getFirst(npc[0]).y -= 1
  await sleep(250)
  getFirst(npc[1]).y += 1
  getFirst(npc[2]).y -= 1
  getFirst(npc[0]).y += 1

  playTune(tune`
400: A5^400,
400: A5^400,
400: A5^400,
11600`)
  await sleep(500)
  clearText()
  setMap(maps.introduceKilroy)

  addText("Who's here?", {
    x: 5,
    y: 10,
    color: color`9`
  })
  await sleep(1000)
  clearText()
  addText("KILROY IS HERE!!!", {
    x: 2,
    y: 10,
    color: color`9`
  })
  getFirst(player[0]).y -= 1
  getFirst(player[1]).y -= 1
  getFirst(player[2]).y -= 1
  getFirst(player[3]).y -= 1
  await sleep(250)
  getFirst(player[2]).y += 1
  getFirst(player[3]).y += 1
  getFirst(player[0]).y += 1
  getFirst(player[1]).y += 1
  await sleep(250)
  getFirst(player[0]).y -= 1
  getFirst(player[1]).y -= 1
  getFirst(player[2]).y -= 1
  getFirst(player[3]).y -= 1
  await sleep(250)
  getFirst(player[2]).y += 1
  getFirst(player[3]).y += 1
  getFirst(player[0]).y += 1
  getFirst(player[1]).y += 1
  
  await sleep(1_000)
  clearText()
  setMap(maps.movingRobotIn)

  addText("Student 1:", {
    x: 1,
    y: 1
  })
  addText("Are you guys ready?", {
    x: 1,
    y: 2
  })
  await sleep(750)
  getFirst(robot).x -= 1
  getFirst(npc[2]).x -= 1
  getFirst(npc[1]).x -= 1
  getFirst(npc[0]).x -= 1
  getFirst(player[0]).x -= 1
  getFirst(player[2]).x -= 1
  getFirst(player[1]).x -= 1
  getFirst(player[3]).x -= 1

  await sleep(750)
  getFirst(robot).x -= 1
  getFirst(npc[2]).x -= 1
  getFirst(npc[1]).x -= 1
  getFirst(npc[0]).x -= 1
  getFirst(player[0]).x -= 1
  getFirst(player[2]).x -= 1
  getFirst(player[1]).x -= 1
  getFirst(player[3]).x -= 1

  clearText()
  addText("Student 2:", {
    x: 1,
    y: 1
  })
  addText("Heck yeah!", {
    x: 1,
    y: 2
  })

  await sleep(750)
  getFirst(robot).x -= 1
  getFirst(npc[2]).x -= 1
  getFirst(npc[1]).x -= 1
  getFirst(npc[0]).x -= 1
  getFirst(player[0]).x -= 1
  getFirst(player[2]).x -= 1
  getFirst(player[1]).x -= 1
  getFirst(player[3]).x -= 1

  await sleep(750)
  getFirst(robot).x -= 1
  getFirst(npc[2]).x -= 1
  getFirst(npc[1]).x -= 1
  getFirst(npc[0]).x -= 1
  getFirst(player[0]).x -= 1
  getFirst(player[2]).x -= 1
  getFirst(player[1]).x -= 1
  getFirst(player[3]).x -= 1

  // Some horrible tune
  playTune(tune`
61.224489795918366,
61.224489795918366: E4/61.224489795918366 + F4/61.224489795918366 + G4/61.224489795918366 + A4/61.224489795918366 + D4~61.224489795918366,
61.224489795918366: A4/61.224489795918366 + B4/61.224489795918366 + G4/61.224489795918366 + F4/61.224489795918366 + E4/61.224489795918366,
61.224489795918366: E4/61.224489795918366 + F4/61.224489795918366 + G4/61.224489795918366 + A4/61.224489795918366 + B4/61.224489795918366,
61.224489795918366: G4/61.224489795918366 + A4/61.224489795918366 + B4/61.224489795918366 + C5/61.224489795918366 + D4~61.224489795918366,
61.224489795918366: B4/61.224489795918366 + A4/61.224489795918366 + C5/61.224489795918366 + D5/61.224489795918366 + E5/61.224489795918366,
61.224489795918366: E5/61.224489795918366 + F5/61.224489795918366 + D5/61.224489795918366 + F4~61.224489795918366 + G4~61.224489795918366,
61.224489795918366: E5/61.224489795918366 + D5/61.224489795918366 + C5/61.224489795918366 + F5/61.224489795918366 + G5/61.224489795918366,
1469.3877551020407`)
  getFirst(robot).type = brokenRobot
  phase = "II"
  await sleep(1000)

  clearText()
  addText("...", {
    x: 1,
    y: 1
  })

  await sleep(2_000)

  clearText()
  addText("Student 3:", {
    x: 1,
    y: 1
  })
  addText("What was that...", {
    x: 1,
    y: 2
  })

  await sleep(2_000)

  clearText()
  addText("Student 2:", {
    x: 1,
    y: 1
  })
  addText("A bolt fell off!", {
    x: 1,
    y: 2
  })

  await sleep(2_000)

  clearText()
  addText("Student 3:", {
    x: 1,
    y: 1
  })
  addText("Uh oh....what now??", {
    x: 1,
    y: 2
  })

  await sleep(2_750)

  clearText()
  addText("Student 1:", {
    x: 1,
    y: 1
  })
  addText("We need to get a", {
    x: 1,
    y: 2
  })
  await sleep(1_000)
  clearText()
  addText("new bolt. AND FAST!", {
    x: 1,
    y: 1
  })

  await sleep(2_000)
  clearText()
  addText("Kilroy:", {
    x: 1,
    y: 1
  })
  addText("I'm on it!", {
    x: 1,
    y: 2
  })

  await sleep(1_000)
  getFirst(player[1]).x += 1
  getFirst(player[3]).x += 1
  getFirst(player[0]).x += 1
  getFirst(player[2]).x += 1

  await sleep(500)
  getFirst(player[1]).x += 1
  getFirst(player[3]).x += 1
  getFirst(player[0]).x += 1
  getFirst(player[2]).x += 1

  await sleep(500)
  getFirst(player[1]).x += 1
  getFirst(player[3]).x += 1
  getFirst(player[0]).x += 1
  getFirst(player[2]).x += 1

  await sleep(500)
  getFirst(player[1]).x += 1
  getFirst(player[3]).x += 1
  getFirst(player[0]).x += 1
  getFirst(player[2]).x += 1

  await sleep(500)
  clearTile(getFirst(player[1]).x, getFirst(player[1]).y)
  clearTile(getFirst(player[3]).x, getFirst(player[3]).y)
  getFirst(player[0]).x += 1
  getFirst(player[2]).x += 1

  await sleep(500)
  clearTile(getFirst(player[0]).x, getFirst(player[0]).y)
  clearTile(getFirst(player[2]).x, getFirst(player[2]).y)

  await sleep(750)
  clearText()
  setMap(maps.blankIntermission)
  addText("30 seconds and one", {
    x: 1,
    y: 5,
    color: color`2`
  })
  addText("count of being told", {
    x: 1,
    y: 6,
    color: color`2`
  })
  addText("\"UNSAFE\" as you run", {
    x: 1,
    y: 7,
    color: color`2`
  })
  addText("in the pits later", {
    x: 1,
    y: 8,
    color: color`2`
  })

  await sleep(3_000)
  clearText()
  setMap(maps.pickADrawer)
  phase = "III"
  addText("Look for the right", {
    x: 1,
    y: 13,
    color: color`0`
  })
  addText("drawer and press K", {
    x: 1,
    y: 14,
    color: color`0`
  })
}
start()
