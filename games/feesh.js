/*
@title: feesh
@author: Ethan DeArmond
@description: feesh.
@tags: ['adventure']
@addedOn: 2025-MM-DD
*/

const player = "p"
const kelp = "k"
const wall = "w"
const shell = "s"
const star = "t"
const pebble = "b"
const ocean = "o"

const left = 0
const right = 1
let playerDirection = right
let rocks = 0


directions = [
  bitmap`
................
................
.......55.......
......575....55.
....557775..5775
...5777777557775
..5770777777775.
.5777777777775..
..5773377777775.
...5777777557775
....577775..5575
.....5555....55.
................
................
................
................`,
  bitmap`
................
................
.......55.......
.55....575......
5775..577755....
5777557777775...
.5777777770775..
..5777777777775.
.5777777733775..
5777557777775...
5755..577775....
.55....5555.....
................
................
................
................`
]


function setSprites() {
  setLegend(
    [ kelp, bitmap `
...DD.........DD
..D44D..D...DD4D
.D44D..D4D.DD44D
.D44D.D44D.D44D.
.D4D..D4D..D44D.
D44D..D44D.DD44D
D4D...D44D..DD4D
D44D.D444DD..D4D
.D4D.DD444D..D4D
.D4D..D44DD..D4D
D444D.DD4DD..D4D
D4444D.D44D.D44D
.D44D..D44D.D4D.
.D44D..D44D.D44D
..D44D.D4DD..D4D
...DD..DDD....DD`],
    [ player, directions[playerDirection] ],
    [pebble, bitmap`
................
................
................
......LLLL......
.....L8888L.....
....L831118L....
...L81131118L...
..L8411111C18L..
..L1116111111L..
..L11C1111141L..
..LC111161111L..
...L11111111L...
....L1H1H10L....
.....L1D1DL.....
......LLLL......
................`],
    [ wall, bitmap `
  111CC11111199911
  1CCC111199911111
  CC111999911111CC
  1111991111111CC1
  119991111111CC11
  1991111111CC1119
  99111111CCC19999
  911111CCC1199111
  1111CCC119911111
  11CC1111991111CC
  CCC1111991111CC1
  C11119991111CC11
  11119911111CC119
  111191111CC11199
  11199111CC111911
  1119111C11119111`],
    [shell, bitmap `
................
.H..............
HHH.............
.HHH............
HH8HHHH.........
HH8888HHHH......
HHH88H88HHH.....
H88HH888H8HH....
H8888888H88HHHH.
HH8888H888888HH.
.H88HH888888H8HH
.HHHH888888H888H
.HHHHH88888888H.
.HLLLHHH8H888HH.
.HHLLLLHH888HH..
..HHHHHHHHHH....` ],
    [star, bitmap`
  .......9........
  .......99.......
  .......93.......
  99....9939....39
  9399..9939..339.
  .9339.93999399..
  ..99399393399...
  ....93333999....
  .....993999.....
  .....993399.....
  ....99399399....
  ...9339999339...
  ..93999...9939..
  .9399......9939.
  .99.............
  ................`],
    [ocean, bitmap`
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
  1111111111111111`]
  )
}
setSprites()
setSolids([player, wall, shell])
levels = [
  map`
bkw...w.s..k
....w.w.wkkk
...wwss..wws
k.www.www.b.
k.pwwww...w.
kkkwwww.wwww
wwbwwww.s..w
wwwwwwwwwtww`,
  map`
wk..ww.ww
wk...s..w
w..wbw..w
wk.kwb.ww
wkwwwws.w
w.kbwk..w
wtwwwwpkw
wwwwwwwww`,
  map `
...s...wwww...w
.wwkwbwwww..ssw
.wwwwwwwww.w..k
.wkkbwwwww.ws..
.k..sk.pkkkw.s.
ww.w.wwwwwww..w
wwww.wtwww.bssw
wwww...wwwww..w`,
  map`
.wwwwkkkww
.bkw.s.k..
.wkw.wwww.
.k.w.wt...
..w..wwwww
s.w.....ww
kw..www.wk
kw.wbw..wk
kw.w...wwk
...w.w....
..kw.www..
wwkw.w.bs.
wwwwpwwww.`,
  map`
t.....
ww....
wb..w.
w.kwbs
w.wbs.
p.ws..`,
  map`
p...s...s..
www..s.s..b
....wwwwwww
s.ssw.ks..k
.s..wkkwkkk
.s..k.wwwwk
.ks.wss.wkk
k..sw...wkb
s..bwsstwww`,
  map`
t.....
wwb.ss
pwsskk
swssbk
.s.sw.
.ss...
s.ss..
k...s.
b....s`,
  map`
wwbk..
b.w...
..ws..
ws..ws
k..w.b
k..w..
kpwt.k`,
  map`
..s...w..swwkb
wsw..w.k.s.wkk
w.w.wb...s.wkk
k.w..w.k.s.skk
..w...w..s.s..
.w..w..wks.wkk
.w.www..ws.wkw
bw..w....w.www
ww..........ww
pt........wwww`
]
level=0
setMap(levels[level])

setPushables({
  [ player ]: [shell],
})

onInput("s", () => {
  let tile = getTile(getFirst(player).x, getFirst(player).y+1)[0] != undefined ? getTile(getFirst(player).x, getFirst(player).y+1)[0] : {type: undefined}
  let nexTile = getTile(getFirst(player).x, getFirst(player).y+2)[0] != undefined ? getTile(getFirst(player).x, getFirst(player).y+2)[0] : {type: undefined}
  if (tile.type == shell) {
    if (nexTile.type != kelp) {
      getFirst(player).y +=1
    }
  } else {
    getFirst(player).y +=1
  }
})

onInput("w", () => {
  let tile = getTile(getFirst(player).x, getFirst(player).y-1)[0] != undefined ? getTile(getFirst(player).x, getFirst(player).y-1)[0] : {type: undefined}
  let nexTile = getTile(getFirst(player).x, getFirst(player).y-2)[0] != undefined ? getTile(getFirst(player).x, getFirst(player).y-2)[0] : {type: undefined}
  if (tile.type == shell) {
    if (nexTile.type != kelp) {
      getFirst(player).y -=1
    }
  } else {
    getFirst(player).y -=1
  }
})

onInput("a", () => {
  let tile = getTile(getFirst(player).x-1, getFirst(player).y)[0] != undefined ? getTile(getFirst(player).x-1, getFirst(player).y)[0] : {type: undefined}
  let nexTile = getTile(getFirst(player).x-2, getFirst(player).y)[0] != undefined ? getTile(getFirst(player).x-2, getFirst(player).y)[0] : {type: undefined}
  if (tile.type == shell) {
    if (nexTile.type != kelp) {
      getFirst(player).x -=1
    }
  } else {
    getFirst(player).x -=1
  }
  playerDirection = left
})

onInput("d", () => {
  let tile = getTile(getFirst(player).x+1, getFirst(player).y)[0] != undefined ? getTile(getFirst(player).x+1, getFirst(player).y)[0] : {type: undefined}
  let nexTile = getTile(getFirst(player).x+2, getFirst(player).y)[0] != undefined ? getTile(getFirst(player).x+2, getFirst(player).y)[0] : {type: undefined}
  if (tile.type == shell) {
    if (nexTile.type != kelp) {
      getFirst(player).x +=1
    }
  } else {
    getFirst(player).x +=1
  }
  
  
  playerDirection = right
})

onInput("i", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    rocks = 0
    }
  })

onInput("k", () => {
  let x = getFirst(player).x
  let y = getFirst(player).y
  if (getTile(x, y)[1] != undefined && getTile(x, y)[1].type == pebble) {
    clearTile(x, y)
    rocks += 1
    addSprite(x, y, player)
    console.log(rocks)
  }
})

onInput("l", () => {

})

onInput("j", () => {
})
              
afterInput(() => {
  setSprites()

  const targetNumber = tilesWith(star).length;
  const numberCovered = tilesWith(star, player).length;

  if (numberCovered === targetNumber && rocks == 3) {
    level = level + 1;
    rocks = 0;
  
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Beat FEESH", { y: 8, color: color`6` });
    }
  }
});