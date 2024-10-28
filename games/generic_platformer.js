/*
@title: Generic Platformer
@author: DaInfLoop
@tags: ['platformer']
@addedOn: 2024-10-22

A very simple and generic platformer game.
Press W to jump, and then A/D for left/right respectively.
Charge over large gaps by holding down a directional button, and jump on enemies to kill them.

Push boxes and climb chains by standing on them.
*/

const player = "p"
const dirt = "d"
const grass = "g"
const enemy = "e"
const goalTL = "["
const goalTR = "]"
const goalBL = "{"
const goalBR = "}"
const DEATH = "D"
const spring = "S"
const cave = "c"
const box = "b"

setLegend(
  [player, bitmap`
....55555555....
...5555555555...
..555777777555..
.55777777777755.
5557770770777555
5577770770777755
5577770770777755
5577770770777755
5577777777777755
5577077777707755
5577707777077755
5557770000777555
.55777777777755.
..555777777555..
...5555555555...
....55555555....`],
  [dirt, bitmap`
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
  [grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
44CC4444CC4444C4
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
  [enemy, bitmap`
....33333333....
...3333333333...
..333CCCCCC333..
.33CCCCCCCCCC33.
333CCC2CC2CCC333
33CCCC2CC2CCCC33
33CCCC2CC2CCCC33
33CCCCCCCCCCCC33
33CCCCCCCCCCCC33
33CCCC2222CCCC33
33CCC2CCCC2CCC33
333C2CCCCCC2C333
.33CCCCCCCCCC33.
..333CCCCCC333..
...3333333333...
....33333333....`],
  [goalTL, bitmap`
..............12
.............12H
............12HH
...........12HHH
..........12HHHH
.........12HHHHH
........12HHHHHH
.......12HHHHHH8
......12HHHHHH88
.....12HHHHHH888
....12HHHHHH8888
...12HHHHHH88882
..12HHHHHH888822
.12HHHHHH8888222
12HHHHHH88882222
2HHHHHH888822222`],
  [goalTR, bitmap`
21..............
H21.............
HH21............
HHH21...........
HHHH21..........
HHHHH21.........
HHHHHH21........
8HHHHHH21.......
88HHHHHH21......
888HHHHHH21.....
8888HHHHHH21....
28888HHHHHH21...
228888HHHHHH21..
2228888HHHHHH21.
22228888HHHHHH21
222228888HHHHHH2`],
  [goalBL, bitmap`
2HHHHHH888822222
12HHHHHH88882222
.12HHHHHH8888222
..12HHHHHH888822
...12HHHHHH88882
....12HHHHHH8888
.....12HHHHHH888
......12HHHHHH88
.......12HHHHHH8
........12HHHHHH
.........12HHHHH
..........12HHHH
...........12HHH
............12HH
.............12H
..............12`],
  [goalBR, bitmap`
222228888HHHHHH2
22228888HHHHHH21
2228888HHHHHH21.
228888HHHHHH21..
28888HHHHHH21...
8888HHHHHH21....
888HHHHHH21.....
88HHHHHH21......
8HHHHHH21.......
HHHHHH21........
HHHHH21.........
HHHH21..........
HHH21...........
HH21............
H21.............
21..............`],
  [DEATH, bitmap`
................
................
.......00.......
......0120......
......0110......
.....0L1120.....
.....0L1120.....
....0LL11110....
....0LL11120....
...0LLLLL1120...
...0LLLLL1110...
..0LLLLLL11110..
..0LLLLLL11120..
.00000000000000.
0666666666666660
0000000000000000`],
  [spring, bitmap`
......1..1......
......1..1......
.......11.......
.......11.......
......1..1......
......1..1......
.......11.......
.......11.......
......1..1......
......1..1......
.......11.......
.......11.......
......1..1......
......1..1......
.......11.......
.......11.......`],
  [cave, bitmap`
1L111111LL1111LL
1LLL1111L11LL111
11LL11111111L111
11111111L111L111
LL111LLLLLL1111L
1111111L11111111
111LLLL11LLLL111
111L11111LLLL111
1111111L11111111
L1111LLLLLLLLLLL
11111111L1111111
11LL111111111111
11L11111L11LLL11
LLLL11LLLL11LL1L
1111111L1111LL11
LLL111LL11111111`],
  [box, bitmap`
CCCCCCCCCCCCCCCC
C99999999999999C
C9CCCCCCCCCCCC9C
C9CC99999999CC9C
C9C9CCCCCCCC9C9C
C9C9C999999C9C9C
C9C9C999999C9C9C
C9C9C999999C9C9C
C9C9C999999C9C9C
C9C9C999999C9C9C
C9C9C999999C9C9C
C9C9CCCCCCCC9C9C
C9CC99999999CC9C
C9CCCCCCCCCCCC9C
C99999999999999C
CCCCCCCCCCCCCCCC`]
)

const levels = [
  map`
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
.....gg.................
.p..gdde...ggg..........
ggggdddggggdddgggggggggg
dddddddddddddddddddddddd`,
  map`
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
..p.....................
ggggggggggg.gggg..e.gggg
dddddddddddDddddggggdddd`,
  map`
......d.................
......d.................
......S.................
......S.................
......S.................
......S.................
......S.................
......S.............[]..
......Sggggg........{}..
......Sdddddggg..ggggggg
......S.dddddd....dddddd
......S..dddd.......dddd
......S..ddd.........ddd
......S...dd.........ddd
......S...dd..........dd
......S...dd..........dd
.p....S...dd..........dd
gggggggg..dd..........dd
ddddddddDDddDDDDDDDDDDdd`,
  map`
..S...................S.
..S...................S.
..S...................S.
..S...................S.
..S...................S.
..S...................S.
g.S.gggggggggggg..ggggSg
c.S.ccddcccd..........Sd
c.S.cccccccd..........Sd
c.S...cccccc..........Sd
c.S......S.c..........Sd
c.S......S.c..........Sd
c.S......S.c..........Sd
cccccccccS.c..........Sd
.........S.c..........Sd
.........S.c..........Sd
.........S.c..........Sd
..p......S.c......e...Sd
ccccccccccccgggggggggggd`,
  map`
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............cccccccccc
..............S.........
..............S......[].
..............S......{}.
..............Sccccccccc
..............Sccccccccc
..............Sccccccccc
..............Sccccccccc
..........g...Sccccccccc
..p..b....dg..Sccccccccc
ggggggggggddgggddddddddd`,
  map`
cccccccccccccccccccccccc
cS......................
cS......................
cS.....................c
cS.....................c
cScccccccccccccccccccScc
cS...................Scc
cS...................Scc
cS..e...........e....Scc
cccccccccccccccccccccScc
ccccc................Scc
ccccc................Scc
ccccc................Scc
ccccc...e...........eScc
cccccccccccccccccccccScc
.....................Scc
.....................Scc
..p..........b.......Scc
cccccccccccccccccccccccc`,
  map`
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccccccccccccccccc
cccccccccS.............c
cccccccccSccccbccDccc..c
cccccccccSccccScccccc..c
cccccccc.SccccScccccc..c
cccccccc.SccccScccccc..c
cccccccc.SccccScccccc..c
cccccccc.S.cccScccccc..c
c........S.cccScccccc..c
c........S....Scccccc[]c
c..p.....S.b..Scccccc{}c
cccccccccccccccccccccccc`
]

function generateLevelCompleteSound(levelId) {
const e = `37.5: D5^37.5,
37.5: E5^37.5 + D5-37.5,
37.5: F5^37.5 + E5-37.5,
37.5: G5^37.5 + F5-37.5,
37.5: A5^37.5 + G5-37.5,
37.5: B5^37.5 + A5-37.5,
37.5: B5-37.5,`.split('\n')

  
  return tune`
37.5: C5-37.5,
37.5,
${e.slice(0,levelId+1)}
862.5`
}

setPushables({
  [player]: [box],
  [box]: [box]
})

setSolids([player, dirt, grass, cave, box])

let mps = 0;

onInput("a", () => {
  if (!getFirst(player)) return;
  getAll(player).forEach((p) => p.x -= 1)
  mps++
  enemies.filter(x => x.alive && x.ref.x == getFirst(player).x && x.ref.y == getFirst(player).y).forEach(enemyDeath)
})

onInput("d", () => {
  if (!getFirst(player)) return;
  getAll(player).forEach((p) => p.x += 1)
  mps++
})

setInterval(() => {
  mps = 0
}, 1000)

let jumped = false;

onInput("w", () => {
  if (jumped || !getFirst(player) || isColliding(player, spring)) return;
  getFirst(player).y -= 1

  jumped = true;
})

const enemies = [];
let updateIntv = -1;
let curId = -1;

function onEnd() {
  setMap(map`
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................
........................`)

  addText("You win!\n\n(yay!)", { y: 4 })
}

function onStart(levelId = 0) {
  if (updateIntv != -1) clearInterval(updateIntv)

  if (levels[levelId] == undefined) {
    return onEnd()
  }

  curId = levelId
  setMap(levels[levelId])
  enemies.length = 0;
  getAll(enemy).forEach((e) => {
    enemies.push({ dir: Math.random() > 0.5 ? -1 : 1, alive: true, ref: e })
  })

  updateIntv = setInterval(onUpdate, 500)
}

const levelGoal = [
  [20, 16],
  [21, 16],
  [0, 0],
  [19, 5],
  [0, 0],
  [22, 2],
  [21, 17]
]

function addGoal(x, y) {
  addSprite(x, y, goalBL)
  addSprite(x + 1, y, goalBR)
  addSprite(x, y - 1, goalTL)
  addSprite(x + 1, y - 1, goalTR)
}

setInterval(() => {
  const inGoal = isCollidingAny(player, [goalTL, goalTR, goalBL, goalBR])

  if (inGoal) {
    playTune(generateLevelCompleteSound(curId))
    onStart(curId + 1)
  } 
}, 10)

function onUpdate() {
  enemies.filter(x => x.alive).forEach(e => {
    const blockExists = getTile(e.ref.x + e.dir, e.ref.y)[0];
    const blockBelowNext = getTile(e.ref.x + e.dir, e.ref.y + 1)[0];

    if (
      (
        blockExists &&
        blockExists.type != player && 
        blockExists.type != enemy
      ) || 
      !blockBelowNext
    ) e.dir *= -1

    e.ref.x += e.dir

    if (e.ref.x == getFirst(player).x && e.ref.y == getFirst(player).y) onStart(curId)
  })

  if (isColliding(player, spring)) {
    getFirst(player).y -= 1
  }

  const boxes = getAll(box)

  boxes.forEach(box => {
    let tilesBelow = getTile(box.x, box.y + 1);

    if (tilesBelow.length == 0) {
      box.y += 1
    }

    if (tilesBelow[0] && tilesBelow[0].type == DEATH) {
      clearTile(box.x, box.y+1)
      box.y += 1
    }

    if (isCollidingSpecific(box, spring)) {
      box.y -= 1
    }
  })
}

function enemyDeath(tile) {
  clearTile(tile.x, tile.y)
  let en = enemies.find((e) => JSON.stringify(e.ref) === JSON.stringify(tile))
  if (en) en.alive = false

  if (!enemies.find(e => e.alive)) addGoal(...levelGoal[curId])
}

function isColliding(tag1, tag2) {
  const obj1 = getFirst(tag1);

  if (!obj1) return false;

  let tiles = getTile(obj1.x, obj1.y)
  if (tiles.length) {
    return tiles.some(tile => tile.type == tag2)
  } else {
    return false
  }
}

function isCollidingSpecific(obj1, tag2) {
  let tiles = getTile(obj1.x, obj1.y)
  if (tiles.length) {
    return tiles.some(tile => tile.type == tag2)
  } else {
    return false
  }
}

function isCollidingAny(tag, tags) {
  const obj1 = getFirst(tag);

  if (!obj1) return false;

  let tiles = getTile(obj1.x, obj1.y)
  if (tiles.length) {
    return tiles.some(tile => tags.includes(tile.type))
  } else {
    return false
  }
}

afterInput(() => {
  const plr = getFirst(player);

  if (jumped) {
    setTimeout(() => {
      let tilesBelow = getTile(plr.x, plr.y + 1)
      if (tilesBelow.length && tilesBelow[0].type == enemy) {
        enemyDeath(tilesBelow[0])
        plr.y -= 1
        setTimeout(() => {
          plr.y += 1
        }, 200)
        setTimeout(() => {
          jumped = false
        }, 250)
      } else if (tilesBelow.length && tilesBelow[0].type == DEATH) {
        jumped = false
        onStart(curId)
      } else {
        plr.y += 1
        setTimeout(() => {
          jumped = false
        }, 50)
      }
    }, 200)
  } else {
    let interval = setInterval(() => {
      let tiles = getTile(plr.x, plr.y + 1)

      if (tiles.length == 0) {
        jumped = true
        plr.y += 1
        if (isColliding(player, DEATH)) {
          clearInterval(interval)
          onStart(curId)
        }
      } else {
        const goalTypes = [goalTL, goalTR, goalBL, goalBR]
        if (tiles[0].type == enemy) {
          enemyDeath(tiles[0])

          plr.y -= 1
        } else if (tiles[0].type == DEATH) {
          clearInterval(interval)
          onStart(curId)
        } else if (goalTypes.includes(tiles[0].type)) {
          clearInterval(interval)
          onStart(curId + 1)
        } else {
          clearInterval(interval)
          jumped = false
        }
      }
    }, 200)
  }
})

onStart(0)
