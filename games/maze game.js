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
.......w......`
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
  