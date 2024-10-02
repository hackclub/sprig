/*
@title: sokobanlike
@author: Neptune1190
@tags: ['puzzle']
@addedOn: 2024-07-18
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const floor = "f"
const box = "b"
const goal = "g"
const redbox = "r"
const redgoal = "c"
const numgoal = tilesWith(goal).length;
const pathsfinished = tilesWith(goal, box).length;
const blueportal = "l"
const orangeportal = "k"
let canportal = false
setLegend(
  [ player, bitmap`
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020` ] ,
  [ floor, bitmap`
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
1111111111111111` ] ,
  [ box, bitmap`
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
CCCCCCCCCCCCCCCC` ] ,
  [ goal, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999699999999
9999966669999999
9999666666999999
9966666666699999
9666666666669999
9966666666666999
9966666666666999
9996666966666999
9996669996669999
9999699999969999
9999999999999999
9999999999999999
9999999999999999` ],
  [ redgoal, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555355555555
5555533335555555
5555333333555555
5533333333355555
5333333333335555
5533333333333555
5533333333333555
5553333533333555
5553335553335555
5555355555535555
5555555555555555
5555555555555555
5555555555555555` ],
  [ redbox, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ blueportal, bitmap`
................
...5555555555...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
................` ],
  [ orangeportal, bitmap`
................
...9999999999...
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
...9999999999...
................` ]
  
)

setSolids([ player, floor, box, redbox ])

let level = 0
const levels = [
  map`
fffff
fg..f
f.b.f
f..pf
fffff`,
  map`
ffffff
fgb..f
f....f
f.p..f
f..bgf
ffffff`,
  map`
ffffffff
fg.....f
fffff..f
f...b..f
f.bp...f
f..fffff
f.....gf
ffffffff`,
  map`
ffffffffff
f........f
f.b......f
f......f.f
f.b..p.f.f
f......f.f
f.b....fgf
f......fgf
f......fgf
ffffffffff`,
  map`
ffffffffffff
f.......f..f
f.b.....f..f
f....ff.f..f
f....gfgf..f
f.....pf...f
f....fgf...f
f..........f
f........b.f
f....b.....f
f..........f
ffffffffffff`,
  map`
fffffffff
f.......f
f.......f
f.......f
f..bgb..f
f.fgpgfff
f..bgb..f
f...f...f
fffffffff`, 
  map`
fffffff
f..g..f
f.....f
f.rp.cf
f..b..f
f.....f
fffffff`,
  map`
ffffffffffffff
ffffffffffffff
ffffffffffffff
fffc......gfff
fff.b....r.fff
fff........fff
fff....p...fff
fff........fff
fff........fff
fff.r....b.fff
fffg......cfff
ffffffffffffff`,
  map`
ffffffffffffff
f...f........f
f...f......b.f
f.p.cg..b....f
f...f........f
f...f........f
ffgfffffff.fff
ff...r.....fff
ff.........fff
ffffffffffffff`,
  map`
fffffffffffffffff
fffff.fffffffffff
fffff..........ff
fffff.f........ff
fffff.f......f.ff
fffff.f.....br.ff
f...f.ffffff.f.ff
f.p.f..fffff...ff
f...g..ffffffffff
f...fffffffffffff
f...............f
f.............c.f
f...............f
fffffffffffffffff`,
  map`
fffffffffffffffff
f...............f
f.fffffffffff.b.f
f.ff........f...f
f.ff.fffff.b.f..f
f.ff.f.fff...fr.f
f.ff.f....f.f...f
f.ff.f.f..f.f...f
f.ff.f.f.ffgf...f
f.ff.f.f.ffff...f
f.ff.f.f.fff....f
f...p.cf.......gf
ffff.fff.ffffffff
ffff.ffff......gf
ffff.fffffb.fffff
ffff........fffff
ffffffffff.ffffff
fffffffffffffffff`,
  map`
fffffff
fffffff
fffffff
fffpfff
fffffff
fffffff
fffffff`,
]
setMap(levels[level])

setPushables({
  [ player ]: [ box, redbox]
})

if (level === 0) {
  addText("Move using the \n w a s d keys", {
    x: 3,
    y: 1})
}
if (level === 7) {
  addText("You can now shoot \nportals,using the \nl and k keys", {
    x: 2,
    y: 1})
}

if (level === 11) {
  addText("You have won!", {
    x: 2,
    y: 1})
}
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("l", () => {
  const existingBluePortal = getFirst(blueportal);
  if (existingBluePortal) {
    existingBluePortal.remove();
  }
  if (canportal == true) {
    addSprite(getFirst(player).x, getFirst(player).y, blueportal)
}})

onInput("k", () => {
  const existingOrangePortal = getFirst(orangeportal);
    if (existingOrangePortal) {
      existingOrangePortal.remove();
  }
  if (canportal == true) {
    addSprite(getFirst(player).x, getFirst(player).y, orangeportal)
}})

afterInput(() => {
  const numgoal = tilesWith(goal).length;
  const pathsfinished = tilesWith(goal, box).length;
  const redgoals = tilesWith(redgoal).length;
  const redfinish = tilesWith(redgoal, redbox).length
  const playerblue = tilesWith(blueportal, player).length
  const playerorange = tilesWith(orangeportal, player).length
  const existingOrangePortal = getFirst(orangeportal);
  const existingBluePortal = getFirst(blueportal);
  if (level >= 7) {
  canportal = true
  }
  if (pathsfinished === numgoal && redfinish === redgoals && level < 11 ) {
    clearText()
    level = level + 1
    setMap(levels[level])
  }
  if (playerblue === 1 && existingOrangePortal) {
    setSolids([ floor, box, redbox ])
    getFirst(player).x = getFirst(orangeportal).x
    getFirst(player).y = getFirst(orangeportal).y
    setSolids([ player, floor, box, redbox ])
  }
  if (playerorange === 1 && existingBluePortal ) {
    setSolids([ floor, box, redbox ])
    getFirst(player).x = getFirst(blueportal).x
    getFirst(player).y = getFirst(blueportal).y
    setSolids([ player, floor, box, redbox ])
  }
})
