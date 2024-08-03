
/* 
@title: maze_game
@author: Aaryan Narayan
@tags: []
@addedOn: 2024-03-08
*/

const sumoboy = "p"
const enemy = 'e'
const obstacle = 'o'
const finish = 'f'
const sumogirl = 'g'
const sumoTune = tune`
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + F4~272.72727272727275,
272.72727272727275,
272.72727272727275: A4^272.72727272727275,
272.72727272727275,
272.72727272727275: F4~272.72727272727275 + B4^272.72727272727275`

setLegend(
    [ sumogirl, bitmap`
................
.....C8CCC......
....CCCCCCC.....
....C00000C.....
...CC02220CC....
...CC02220CC....
...CC00000CC....
.......0........
....0000000.....
.......0........
.......0........
....0000000.....
....0.....0.....
................
................
................`],
	[ sumoboy, bitmap`
................
................
.....00000......
.....02220......
.....02220......
.....00000......
.......0........
....0000000.....
.......0........
.......0........
....0000000.....
....0.....0.....
................
................
................
................` ],
    [enemy, bitmap`
................
................
................
......3..3......
.......33.......
...000.33.000...
.....033330.....
.......33.......
.......33.......
.......33.......
.....333333.....
.....3....3.....
................
................
................
................`],
    [obstacle, bitmap`
................
................
................
................
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
....00000000....
................
................
................
................`],
    [finish, bitmap`
................
................
................
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
................
................
................`],
)

setSolids([obstacle, sumoboy, enemy, sumogirl])

playTune(sumoTune, 5)

let level = 1

const levels = [
  map`
pppppppppppppppppppppppp
peeeeeeeeeeeeeeeeeeeeeep
peppppppppppppppppppppep
pepoooooooooooooooooopep
pepo................opep
pepo................opep
pepo................opep
pepo..ppppp..ppppp..opep
pepo..ppppp..ppppp..opep
pepo..ppppp..ppppp..opep
pepo................opep
pepo................opep
pepo.....eeeeee.....opep
pepo....eeeeeeee....opep
pepo...ee......ee...opep
pepo...ee......ee...opep
pepo...ee......ee...opep
pepo................opep
pepo................opep
pepo................opep
pepoooooooooooooooooopep
peppppppppppppppppppppep
peeeeeeeeeeeeeeeeeeeeeep
pppppppppppppppppppppppp`,
	map`
ooooooooo
o.......f
o.oo.oo.f
g.oo.oooo
p.eo.eeoo
ooooooooo`, map`
oooooooeooeoeff
oeooeooeooe....
oee..eo....o.oo
oooo....oe.o.oo
oe...eoeoo.e.eo
og.ooeoooe.o.oo
p...eeeee....eo
ooooooooooeoooo`, map `
oooooooeoooooooooo
e.eeooeeee..e.e.eo
e.eooeooooo.eoee.o
g..oo.oeee..oooooo
p.......e.o.e..e.o
oo.o...oeoo..oe.eo
o.ee.eooeo.e..e.eo
oeo...oo.....e..eo
o...e....ooo.ooe.f
o.ooo.oo..oe.....f
oeeeeo.oooooeooeeo`, map`
oooooooooooooooooooooooooo
oeo.oee.oo.o.e...oeooeffeo
oe..o..ooooe.ee.o..o.o..eo
o.o...oo...o.....e.....oeo
o.oe..eo.e...oooe..o.ooo.o
ooee..e..ooe.o..e.e..o.eoo
o.eooe..o..o....ee..ooe..o
o...o...o.oe.o.......o.e.o
o..oo..e.....oo.o..eee..oo
o.oooo..o.e...oo..oo.oeo.o
g......e.e..o..ooe..o.o.oo
p..e.oo..e.e.ee...o.o.oo.o
o....ooe....ee.oo..e.ooo.o
oo.e..e.e.oo.oe...e...e.eo
oooooooooooooooooooooooooo`, map`
ooooooooooooooooooooooooooooooooooeooooo
oo.o.o.o....o.e..oo..o.o.e..o.e.e......o
oe...oo..oo....e...oee.oo..oo..e.oo....o
oee.....e...o.o..e......e...ee...o.eee.o
o...o........e..ooo.ooooeo....eeeo..e..o
oe..o.ee..ee..o.o..oo.e....o....e...e..o
oe.o..e......o..ooooo....o..oo....o...eo
oe...o.e.o.oe..o....e...eoo....o..e.e..o
o.....o.o.oo...............ee.o..o...e.o
o.o...e.e....eeee.e.o..o.oo.o....o.e..oo
oe.....o...e.e.....eee..e..e.e..o......o
o...o..o.o.....o...oo..e....oeoo...oo.oo
oo.o....e..o...o..o.e....e.oo....o..eooo
o....oo...e..o...e.e...o..o....e...e...o
o......o.......ee....ooo...o....o.ooo..o
o.oo.....o.e.e.e..o.oo...o...o..o.e..e.o
o..o.o..ee....ee.o....o........e..e....o
o..o.o.e.eo.e.oe....oo.o..o.o.e...e..o.o
o.oe.....o...eo...o......e.e......e.o..o
ooe.....e...o........eeoe..ooo.e..oo...o
o....oooe...e..o.e..e......o...e...o.feo
oe..e...e...e............oo.o...e....f.o
o.eo.o...eo.e.o....e...o.ee...o.e......o
p..oo.......e....o..........eeoooe.ee..o
g.....o.ee..eo....e....o.....e.oo.....eo
o.....ooo.o.e.....e....o.o..e..o.ooo...o
oooooooooooooooooooooooooooooooooooooooo`
];

setMap(levels[level])

setPushables({
	[ sumoboy ]: []
})

setSolids([sumoboy, obstacle, sumogirl]);

// inputs

onInput("w", () => {
	getFirst(sumoboy).y -= 1
})
onInput("s", () => {
	getFirst(sumoboy).y += 1
})
onInput("a", () => {
	getFirst(sumoboy).x -= 1
})
onInput("d", () => {
	getFirst(sumoboy).x += 1
})

onInput("i", () => {
	getFirst(sumogirl).y -= 1
})
onInput("k", () => {
	getFirst(sumogirl).y += 1
})
onInput("j", () => {
	getFirst(sumogirl).x -= 1
})
onInput("l", () => {
	getFirst(sumogirl).x += 1
})



afterInput(() => {
  // check enemy hit sumoboy
  const sumoBoyEnemyHit = tilesWith(sumoboy, enemy)
  if (sumoBoyEnemyHit.length > 0) {
    setMap(levels[0])
    level = level - 1
    addText("Game Over! Score:" + level , {
      x:1,
        y:3,
        color:color`3`
    })
    addText("You hit an enemy!", {
      x:1,
      y:12,
       color:color`3`
    }) 
  }
// check enemy hit sumogirl
    const sumoGirlEnemyHit = tilesWith(sumogirl, enemy)
  if (sumoGirlEnemyHit.length > 0) {
    setMap(levels[0])
    level = level - 1
    addText("Game Over! Score:" + level , {
      x:1,
        y:3,
        color:color`3`
    })
    addText("You hit an enemy!", {
      x:1,
      y:12,
       color:color`3`
    }) 
  }

 // check win and map
 const sumoBoyGreenWinTile = tilesWith(sumoboy, finish);
  const sumoGirlGreenWinTile = tilesWith(sumogirl, finish);
  
  if (sumoBoyGreenWinTile.length >= 1 && sumoGirlGreenWinTile.length >= 1) {
    level = level + 1
    
    if (level < levels.length) {  
      setMap(levels[level])

    } else {
      addText("YEAHHHH YOU WIN!!!", {
        x:2,
        y:6,
        color:color`4`
        }); 
    }
}});