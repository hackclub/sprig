/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: gateway
@author: eminentquasar34
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const final = "f"
const gateway = "g"
const gateway2 = "a"
const deathGateway = "d"

setLegend(
  [ player, bitmap`
................
................
................
................
................
....33333333....
...3366336633...
...3666336663...
...3666666663...
...3666666663...
...3677667763...
...3666666663...
...3666666663...
...3666666663...
...3366666633...
....33666633....` ],
  [wall, bitmap`
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
0000000000000000`],
  [final, bitmap`
................
................
....00000000....
...0000000000...
..000222222000..
..002222222200..
..002200002200..
..002200002200..
..002200002200..
..002200002200..
..002222222200..
..000222222000..
...0000000000...
....00000000....
................
................`],
  [gateway, bitmap`
................
................
................
....4444444.....
...444444444....
..44444444444...
..444.....444...
..444.....444...
..444.....444...
..444.....444...
..444.....444...
..44444444444...
...444444444....
....4444444.....
................
................`],
  [gateway2, bitmap`
................
................
................
.....555555.....
....55555555....
...5555555555...
...555....555...
...555....555...
...555....555...
...555....555...
...5555555555...
....55555555....
.....555555.....
................
................
................`],
  [deathGateway, bitmap`
................
................
................
.....333333.....
....33333333....
...333....333...
...33......33...
...33..33..33...
...33..33..33...
...33......33...
...333....333...
....33333333....
.....333333.....
................
................
................`]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
...............
...............
...............
...............
...............
...............
...............
wwwwwwwwwwwwwww
p.............f
wwwwwwwwwwwwwww
...............
...............`,
  map`
..............
..............
...wwwwwwwwww.
...w........w.
...w.wwwwww.w.
...w.w....w.w.
...w.w.wwww.w.
...w.w.w....w.
wwww.w.w.wwwww
p....w.w.....f
wwwwww.wwwwwww
..............`,
  map`
..............
..............
..............
wwwwwwwwwwwwww
f............g
wwwwwwwwwwwwww
..............
..............
wwwwwwwwwwwwww
p............g
wwwwwwwwwwwwww
..............`,
  map`
..............
..............
..wwwwwwwwwww.
..w.........w.
..w.wwwwwww.w.
..w.....wgw.w.
...wwww.w.w.w.
wwww..w.w.w.w.
...wwww.w.w.w.
pg......w.wfw.
wwwwwwwww.www.
..............`,
  map`
..............
p.............
wwwwwwww..wwww
......gw..w..g
...wwwww..w..w
..........w..w
.wwwwwwwwww..w
.w...........w
.wwwwwww....ww
.wf....www.ww.
.www.......w..
...w.....ww...`,
  map`
g............p
www.wwwwwwwwww
....wg........
.wwwwwww......
.w.....wwwww.a
.w.www........
.w.w.w.wwwwwww
.w.w.w........
.w.w.wwwwwwww.
.w.w.w........
.w.w.wwwwwwwww
...wa........f`,
  map`
.w..........w.
.w....g.....w.
.wwwwwwwwwwww.
..............
..wwwwwwwwww.w
..wa.......g.f
..wwwwwwwwwwww
..............
.wwwwwwwwwwwww
a.............
wwwwwwwwwwwww.
p.............`,
  map`
g......w...wfw
wwwwww.w.w.w.w
....aw.w.w.w.w
.ww..w...w.w.w
.www.wwwww...w
..ww....pw.www
...wwwwwww....
w...w...wwwww.
w.w.w.w.waw.w.
w.w.w.w.w.w.w.
w.w.w.w.w.w.w.
wgw...w...w...`,
  map`
.....ww.w.....
.www....w.www.
.w.wwwwww.w...
.w......w.w.ww
.wwww.www.w.w.
.w....wf..w...
.wwww.wwwwwww.
......w...w.w.
.wwww.w.w.w.w.
....w.w.w...w.
www.www.wwwww.
p.............`,
  map`
...w...w.....a
.w.w.w.w.wwwww
.w.w.waw.....p
.w.w.wwwww.www
.w...wf..w.w..
.wwwwwww.w.ww.
.......w.w....
.wwwww.w.w.www
.w...w.w.w....
.w.w...w.w.ww.
.w.wwwww.w....
gw..w...gw.www`,
map`
w...wgd.w...w.
w.w.w.w.w.w.w.
w.w.w.w.w.w...
w.w...w.w.w.w.
w.wwwww...w.w.
w.....w.www.ww
w.w.w.w.w.....
..w.w.w.w.www.
.ww.wgw.w.wfw.
pw..w...w.w.w.
ww.wwww.w.w.w.
........w...w.`,
  map`
..w...d...w..f
.....w.ww...w.
w..w...ww..w..
......w..w.d..
..w.wdw.....w.
.w.......w.w..
....w...w.....
.wdw.dw..d.ww.
......w.w.w..w
...w.w..d..w..
w....ww....w.w
p.w...d..w....`,
  map`
pawwwww...w...
gww.....www.w.
wwfwwww.....w.
w.....wwwww.w.
w...w.....w.w.
wwww.wwww.w.w.
....w..w..www.
.wwwww.w.ww...
.....d.w....w.
d.d..w.wwwwww.
.w.w.w......wg
.......wwww.aw`
]

setMap(levels[level])
const startSound = tune``;
playTune(startSound);
setPushables({
  [ player ]: []
})

const movement = tune`5`


onInput("s", () => {
  getFirst(player).y += 1
  playTune(movement)
  
})

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(movement)
})

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(movement)
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(movement)
})


afterInput(() => {
  const targetNumber = tilesWith(final).length;
  const numberCovered = tilesWith(final, player).length;

  const totalGateways = tilesWith(gateway).length;
  const gatewaysEntered = tilesWith(gateway, player).length;
  // console.log(totalGateways, gatewaysEntered);
  if (totalGateways - 1 == gatewaysEntered) {
  if (getAll(gateway)[0].x == getFirst(player).x && getAll(gateway)[0].y == getFirst(player).y) {
    getFirst(player).x = getAll(gateway)[1].x;
    getFirst(player).y = getAll(gateway)[1].y;
  } else {
    getFirst(player).x = getAll(gateway)[0].x;
    getFirst(player).y = getAll(gateway)[0].y;
  }
  }
  const totalGateways2 = tilesWith(gateway2).length;
  const gateways2Entered = tilesWith(gateway2, player).length;
  // console.log(totalGateways, gatewaysEntered);
  if (totalGateways2 - 1 == gateways2Entered) {
  if (getAll(gateway2)[0].x == getFirst(player).x && getAll(gateway2)[0].y == getFirst(player).y) {
    getFirst(player).x = getAll(gateway2)[1].x;
    getFirst(player).y = getAll(gateway2)[1].y;
  } else {
    getFirst(player).x = getAll(gateway2)[0].x;
    getFirst(player).y = getAll(gateway2)[0].y;
  }
  }
  const totalDeathGateways = tilesWith(deathGateway).length;
  const totalDeathGatewaysReached = tilesWith(deathGateway, player).length;

  if (totalDeathGatewaysReached == totalDeathGateways && totalDeathGateways > 0) {
    addText("YOU DIE", {
        x: 5,
        y: 7,
        color: color`3`
      })
    addText("Press J to restart", {
        x: 2,
        y: 9,
        color: color`3`
      })
    onInput("j", () => {
      level = 0;
      setMap(levels[level]);
      clearText();
  })
  }
  
  if (targetNumber == numberCovered) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level])
    } else {
      addText("YOU  WIN", {
        x: 3,
        y: 7,
        color: color`2`
      })
    }
  }
})
