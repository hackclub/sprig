/*
@title: Frog Maze game
@author: Froggy1018
@description: Solve the maze
@tags: [Maze]
@addedOn: 2025-10-22
*/



	const player="p"
    const fly = "y"
    const worm="e"
    const wall= "w"
    const wall2= "v"
    const key = "k"
    const door = "d"
    const key2="f"


setLegend(
	[ player, bitmap`
................
................
..DD...DD.......
.D44D.D44D......
.4024D4024D.....
.400444004D.....
..4444444D......
..433334D.......
..444444DD......
...DDDDDD4D.....
...D44D4444D....
...D44D4444D....
...D44D44DD.....
................
................
................` ],

	[ fly, bitmap`
................
................
................
................
................
....LLL..LLL....
...LL1L..L1LL...
...L11000011L...
...LLL0000LLL...
......3003......
......0000......
................
................
................
................
................` ],

	[ worm, bitmap`
................
................
................
................
............CC..
............CC..
.....CCCC...CC..
....CCCCCC..CC..
....CC..CC..CC..
...CCC..CCCCCC..
..CCC....CCCC...
................
................
................
................
................` ],

	[ wall, bitmap`
DD.DD...4.D...4.
D.4.D..4..DD.44.
D.44D.44...D.4..
D..4D.4....D.4..
DD..D.44..DD.44.
.D.DD..4..DD..44
.D.D.4..4..D...4
.D.D44...4.D..44
D4.D4....4.D.44.
D44.DD...4.D.4..
DD4..D..4.DD.4..
.DD..D..4.DD..4.
..D..D..4..D..44
.D...D.4...DD..4
.D..DD.4....D.44
.D.DD..4....D.4.` ],

	[ wall2, bitmap`
4DD..44D.C.DDD..
.DD.D44..4DDD...
4DD4344D..DDD.4C
.DD.D44.3..DDD44
4DD...44D...DDD.
.DD4..D44...DDDD
.DD4...44....DDD
4DD....44D....DD
.DD4.3.44...3.DD
.DD..D444....DDD
4DD...44....DDD.
.DD4...44...DD..
4DD....44D..4DD.
.DD....44..44DD.
.DD4...D44..44DD
4DD.....44D...DD` ],
  
  	[ key, bitmap`
................
.....66666F.....
....6666666F....
....66FFF66F....
....66FFF66F....
....6666666F....
.....66666F.....
......666F......
......6666F.....
......66FFF.....
......6666F.....
......66FF......
......6666F.....
......6666F.....
......66FF......
......66F.......` ],
  
    [ door, bitmap`
......6666......
.....66CC66.....
....66CCCC66....
....6CCCCCC6....
...66CCCCCC66...
...6CCCCCCCC6...
...6CCCCCCCC6...
...6CC6CC6CC6...
...6CC6CC6CC6...
...6CC6CC6CC6...
...6CCCCCCCC6...
...6CCCCCCCC6...
...6CCCCCCCC6...
...6CCCCCCCC6...
.LL6666666666LL.
.LLLLLLLLLLLLLL.` ],

  	[ key2, bitmap`
................
.....66666C.....
....6666666C....
....66CCC66C....
....66CCC66C....
....6666666C....
.....66666C.....
......666C......
......6666C.....
......66CCC.....
......6666C.....
......66CC......
......6666C.....
......6666C.....
......66CC......
......66C.......` ]
)

setSolids([player, wall, wall2, key])

let level = 0
const levels = [
  map`
wwwwwwwww
w.......w
w.wwwww.w
w.w..ew.w
w.w.www.w
w.w.....w
wpwwwwwww`
]
levels.push(level)

level = level + 1
const newLevel1 = map`
wwwwewwww
wwww.wwww
wwww.wwww
e...p...y
wwww.wwww
wwww.wwww
wwwwywwww`

levels.push(newLevel1)

level = level + 1
const newLevel2 = map`
wpwwwwwwwww
w.w...wywew
w.w.www.www
w...w.....w
w.www.ww.ww
w.wy...w.ww
w.wwww.w.ww
w...w..w.ww
www.w.ww.ww
wy....w...e
wwwwwwwwwww`

levels.push(newLevel2)

level = level + 1
const newLevel3 = map`
wpwwwwwwwwwwwwwwwww
w.v..............fw
w.w.wvw.w.wvwvwvwvw
w...v...v.........w
w.wvw.wvwvwvwvw.w.w
w.vf..v.......vfv.w
w.wvwvw.wvwvw.wvw.w
w...v.......v.v...w
wvw.w.wvwvw.w.w.w.w
wf..v.v...v.v.v.v.w
wvw.w.w.w.w.w.w.w.w
w...v...v.vfv...vfw
w.wvwvwvw.wvwvwvwvw
w.......v.v.......w
wvwvw.w.w.w.wvwvw.w
w..kv.v.v...v...v.w
w.wvw.w.wvwvw.w.w.w
w.....v.......v.vde
wwwwwwwwwwwwwwwwwww`

levels.push(newLevel3)
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

onInput("j", () => {
    level = 0; // Reset the level to the first level
    setMap(levels[level]); // Set the map to the first level
});

let hasKey = false;

afterInput(() => {
    const goalsCovered = tilesWith(player, worm, door, key);
    const playerSprite = getFirst(player);

    goalsCovered.forEach((goal) => {
        if (goal.type === key) {
            hasKey = true;
            goal.remove(); } 
        else if (goal.type === door && hasKey) 
        {goal.remove();} 
        else if (goal.type === worm) 
        {level = level + 1;
            if (level < levels.length) {
                setMap(levels[level]);
            } 
            else {
                addText("you win!", { y: 4, color: color`0` });
            }
        }
    });
});

function resetGame() {
    level = 0;
    setMap(levels[level]);
    hasKey = false;
}

document.querySelector("#run").addEventListener("click", resetGame);

