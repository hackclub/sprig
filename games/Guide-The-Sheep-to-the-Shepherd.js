
/* 
@title: maze_game_starter
@description: A simple template to help you get started with making a maze game.
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

const player = "p"
const fence = "f"
const goal = "g"
const enemy = "e"
const enemy_path = "_"

const bg = "b"
setLegend(
  [bg, bitmap`
4444444444444444
444D444444444444
4D4D4D44444D4444
4D4D4D444D4DD444
444444444D44D444
4444444444444444
4444444444444444
44444444D4444444
44444444DD444444
4444444DDD444444
44D4444444444444
44D4444444444D44
44DD4444444D4D44
44444444444D4D44
4444444444444444
4444444444444444`],
	[ player, bitmap`
................
................
....000222222...
...00000222222..
.00000000022222.
0000202000022222
0..0000022022222
...0000022222222
...0000022222222
...0000022222222
....00022222222.
.....222222222..
.....022222222..
.....0.0..0.0...
.......0....0...
................` ],
  [ fence, bitmap`
................
...CC......CC...
...CC......CC...
CCCFCCCCCCCCFCCC
CCCCCCCCCCCCCCCC
...CC.....CCC...
...CC....CCCC...
...CC...CC.CC...
...CC..CC..CC...
...CC.CC...CC...
...CCCC....CC...
CCCCCCCCCCCCCCCC
CCCFCCCCCCCCFCCC
...CC......CC...
...CC......CC...
...CC......CC...`],
  [ goal, bitmap`
................
...CC....111....
..CCCC..16661...
..C..C..16661...
.....C..11611...
.....60001110...
.....C0000100...
.....C.0000000..
.....C..000000..
.....C..CCCC00..
.....C..0C006...
.....C..00000...
.....C..00000...
.....C..00000...
.....C..00000...
.....C..00000...` ],
  [ enemy, bitmap`
................
......3...3.3...
..33333...333...
...333333.33....
....339999933...
...3999999993...
...3399699993...
..399996699333..
..339996699333..
..339966699339..
..933966639333..
..999966669399..
.999996666999...
...9996666699...
....9666666699..
..999966666999..`]
)

setSolids([player, fence])
setBackground(bg)

let level = 0
const levels = [
	map`
p......
.fffff.
..e.f..
....f.g`, map`
p......
ffffff.
....gf.
.fffff.
.......`
]

setMap(levels[level])

setPushables({
	[ player ]: []
})

onInput("w", () => {
	getFirst(player).y -= 1
})
onInput("s", () => {
	getFirst(player).y += 1
})
onInput("a", () => {
	getFirst(player).x -= 1
})
onInput("d", () => {
	getFirst(player).x += 1
})

afterInput(() => {
  const numberOfGoalsCovered = tilesWith(player, goal);
    console.log(tilesWith(player, goal));
  if (numberOfGoalsCovered.length > 0) {
    level = level + 1;
    console.log("win");
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      const win_text = "You Win!"
      const xp = 3
      const yp = 3
      addText(win_text, options = { x:xp-1, y:yp, color:color`0` })
      addText(win_text, options = { x:xp+1, y:yp, color:color`0` })
      addText(win_text, options = { x:xp, y:yp+1, color:color`0` })
      addText(win_text, options = { x:xp, y:yp-1, color:color`0` })
      addText(win_text, {y:4, color: color`2`});
    }
  }
});