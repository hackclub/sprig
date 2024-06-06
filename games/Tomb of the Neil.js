/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const end = "e"

setLegend(
  [ player, bitmap`
................
................
.....0000000....
...0006666600...
...06666666600..
..006606606660..
..0666066066600.
.00666066066660.
.06666666666660.
.06666666666660.
.06660066660600.
.0066600000660..
..006666666660..
...00006666000..
......000000....
................` ],
  [ wall, bitmap`
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
0000000000000000` ],
  [ end, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ]
)

setSolids([ player, wall ])

let level = 0
const levels = [
  map`
pw...w.e
.w.w.w.w
.w.w.w.w
.www.w.w
.....w.w
w.wwww.w
w......w
wwwwwwww`,
  map`
...w...w
.w.w.w.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
pw...w.e`,
  map`
........
.wwwwww.
.w....w.
.w.ww.w.
.w.wp.w.
.w.wwww.
.w......
ewwwwwww`,
  map`
pwwww...
....w.w.
www...w.
e.wwwww.
w.w...w.
w.w.w.w.
w...w...
wwwwwwww`,
  map`
........
.wwwwww.
.w....w.
.w.ww.w.
.w.w..w.
.w.weww.
.w.wwww.
pw......`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x--;
});

onInput("w", () => {
  getFirst(player).y--;
});

afterInput(() => {
  let target = getFirst(end);
  let p = getFirst(player);
  
  if ((target.x == p.x) && (target.y == p.y)) {
    level++;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})