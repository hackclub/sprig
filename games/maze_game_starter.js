
/* 
@title: maze_game_starter
@description: A simple template to help you get started with making a maze game.
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p"

setLegend(
	[ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ]
)

setSolids([])

let level = 0
const levels = [
	map`
p.
..`
]

setMap(levels[level])

setPushables({
	[ player ]: []
})

onInput("s", () => {
	getFirst(player).y += 1
})

afterInput(() => {

})