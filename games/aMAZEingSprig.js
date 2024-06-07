
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@img: ""
@addedOn: 2023-08-08
*/

const player = "p"
const wall = "w"
const goal = "g"
const moveable = "m"
const blockGoal = "b"
const teleporter = "t"

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
................` ],
    [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L..........1.L0
0L...........1L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L1...........L0
0L.1..........L0
0LLLLLLLLLLLLLL0
0000000000000000`], 
    [ moveable, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1..........2.1L
L1...........21L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L12...........1L
L1.2..........1L
L11111111111111L
LLLLLLLLLLLLLLLL`],
    [ goal, bitmap`
D4DDDDDDDDDDDD4D
4D4..........4D4
D4D4........4D4D
D.4D4......4D4.D
D..4D4....4D4..D
D...4D4..4D4...D
D....4D44D4....D
D.....4444.....D
D.....4444.....D
D....4D44D4....D
D...4D4..4D4...D
D..4D4....4D4..D
D.4D4......4D4.D
D4D4........4D4D
4D4..........4D4
D4DDDDDDDDDDDD4D`], 
    [ blockGoal, bitmap`
7777777777777777
75............57
7.5..........5.7
7..5........5..7
7...5......5...7
7....5....5....7
7.....5..5.....7
7......55......7
7......55......7
7.....5..5.....7
7....5....5....7
7...5......5...7
7..5........5..7
7.5..........5.7
75............57
7777777777777777`],
    [ teleporter, bitmap`
6300000000000036
3..............3
0.....3333.....0
0...33....33...0
0..3........3..0
0..3...33...3..0
0.3...3..3...3.0
0.3..3.33.3..3.0
0.3..3.33.3..3.0
0.3...3..3...3.0
0..3...33...3..0
0..3........3..0
0...33....33...0
0.....3333.....0
3..............3
6300000000000036`]
  
)

setSolids([
  player, wall, moveable
])

let level = 0
const levels = [
	map`
p.wg
....`,
    map`
gw.
...
ww.
p..`, 
    map`
g..b
.mw.
.p..`,
    map`
w...b
wm...
pm.w.
w....
www..
wg...`
    
]

setMap(levels[level])

setPushables({
	[ player ]: [moveable]
})

onInput("s", () => {
	getFirst(player).y += 1
})
onInput("d", () => {
	getFirst(player).x += 1
})
onInput("w", () => {
	getFirst(player).y -= 1
})
onInput("a", () => {
	getFirst(player).x -= 1
})
onInput("j", () => {
	setMap(levels[level]);
})

document.onkeydown = function(event) {
         switch (event.keyCode) {
            case 37:
               getFirst(player).x -= 1
            break;
            case 38:
               getFirst(player).y -= 1
            break;
            case 39:
               getFirst(player).x += 1
            break;
            case 40:
               getFirst(player).y += 1
            break;
         }
      };

function nextLevel() {
    level = level + 1;
  // check if current level number is valid
    if (level < levels.length) {
              setMap(levels[level]);
          } else {
              addText("Victory!", { y: 6, color: color`3` });
          }
};

function findTileWithoutPlayer({tileArr}) {
  tileArr.forEach((e) => {
    if (e.type != "p") {
      return e
    }
  })}

afterInput(() => {
    const goalsCovered = tilesWith(player, goal);
    const blockCovered = tilesWith(moveable, blockGoal);
    //const teleporterOpen = tilesWith(player, teleporter).remove(tilesWith(player))
    if (goalsCovered.length >= 1 ) {
        if (tilesWith(blockGoal).length >= 1 ) {
            if(tilesWith(moveable, blockGoal).length >= 1 ) {
                nextLevel();
            }
        } else{
        nextLevel();
        }

    }
  // if (tilesWith(player, teleporter).remove(tilesWith(player))) {
    
})