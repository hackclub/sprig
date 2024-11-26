
/* 
@title: Maze_Escape
@author: Madison Shaw
@tags: ['puzzle']
@addedOn: 2023-07-27
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const wall="w"
const end ="e"

setLegend(
  [ player, bitmap`
................
................
................
................
.....666666.....
.....666666.....
.....606606.....
.....666666.....
......7777.5....
.....5777755....
.....55777......
......7777......
......5..5......
......5..5......
......5..5......
................` ],
  [wall, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................`],
  [end, bitmap`
................
................
................
................
....C444........
....C44D444.....
....C44D444.....
....C44D444.....
....C44D444.....
....C...444.....
....C...........
....C...........
....C...........
....C...........
................
................`]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
www.w
w...e
w.www
p.w.w
w...w`,
  map`
......wew
.ww.w.w.w
.w..ww...
..w.w..ww
w..w.w...
p.w...ww.
w...w....`,
  map`
.ww...wwww..
p...w.w.ww.w
..w.w...w.w.
.w....w.w.w.
.wwww.w.....
....w.wwwww.
www.w.w.w.w.
w.......w..e`,
  map`
.......w..
.w.ww.w.ww
.w..w.w...
..w.w..ww.
w.w.ww..w.
..w...w...
.wwww.www.
....w.w.w.
www.w.w.w.
p...w...we`,
  map`
pw....w..w...w
.w...w.w...w.w
..ww.w..w.w...
.w..w..w.w..w.
.w.w.w.w.w....
..w...e...w.w.
.w...w.w.w..w.
..w.w..w.w....
w..w.w.w..www.
.w......w.....
.w.wwww..wwww.
.......w......`,
  map`
.www..we...wwww
w...w....w.....
..ww.w.w.w..w..
w.....w.w.w..w.
...ww...w..w..w
..w..w..w..w.ww
.w..w.w....w...
.w..w.....ww.w.
..w..ww.w....w.
w.ww..w.w.ww.w.
pw....w.w....w.
...ww.w.w.w.w..
.w...w...w.w..w
.w.....w.....w.`,
  map`
ew...wwwwwww..
...www.....ww.
..w..www.ww.w.
w.w.ww.w..w.w.
w.w.w.....w.w.
w..w..w.w.....
.w..ww.p.www.w
.w.ww.w.w....w
.w...w.w...w.w
.w.w...w..ww.w
.w.www...ww...
www..www....w.
.w......www...`,
  map`
.........w...w....e
.wwwww.w...w.w.wwww
.w...wwwwwww.w.....
.www.w.....w.w.ww..
...w.ww.ww.w.www...
.w....w.w..w...w.ww
wwwww.w.w.wwww.w...
....w.w.w....w.www.
.ww.w.w.wwww.w.....
..w...w.w....w.wwww
w.wwwww.wwww.www...
..w.....w......w.ww
.ww.w.w.w.wwww.w...
....w.w.w....w.w...
www.w.wwwwww.w.www.
....w......w.w.....
.wwwwwwwww.w.www.ww
.............w.w...
wwwpwwwwwwww.w.....`,
  map`
.......w............
.w.wwwwwwwwwwww.www.
.w............w.we..
.wwwwww.wwwwww...www
.w....w.w......w....
...ww.w.w.wwwwwww.ww
.w.w..w.w.w......w.w
.w.wwww.w.w..ww.ww.w
.w....w.w....w.....w
.ww.www......w.....w
..w.w....www.wwwww.w
..w.w.w....w.w.w...w
..w.w.ww...w...ww..w
w.w.w.w.ww.w..w.www.
w.w......www.w......
w.wwwwww...w.wwwwww.
w....w....ww..w.....
w.w..w.wwww..wwwww.w
w.w................w
p.w.wwwwwwwwwww.wwww`,
  map`
ewwwwww.....w.wwwwwwww
........www.w...w...w.
wwwwwww.....w.w...w...
......w..wwww.www.w.ww
www...w.........w.w.w.
..w.w.wwwwwwwww.w.w.w.
w.w.w.w...w.....w.w.w.
w.w.w.........www.w.w.
w.w.w.wwwwwww.w..ww.w.
w.w.w.......w.........
w.w.wwwww...w.wwwwwwww
w.w..w..wwww......w..w
w.w..w.w...w.wwwwww..w
p.ww.w.w.w.w.w..w....w
w........w.w.......w.w
w.wwwwww.w.wwwwww..w..
w.w......w..........w.
w.w.wwwwww.wwwwww...w.
w.w.............www.w.
w.wwww..w.ww.........w
w......ww..wwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y-=1
})

onInput("a", () => {
  getFirst(player).x-=1
})

onInput("d", () => {
  getFirst(player).x+=1
})

afterInput(() => {

  if (tilesWith(player, end).length==1) {
      
        level = level + 1;

        const currentLevel = levels[level];

        
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`4` });
        }
    }
});
  
