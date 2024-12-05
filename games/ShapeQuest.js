/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: matching
@author: Kaiyuran
@tags: ['puzzle', 'maze']
@addedOn: 2024-11-12
*/
console.log("start")
const player = "p";
const circle = "c";
const triangle = "t"; 
const square = "s";
const trapezoid = "r";
const circleHole = "j";
const triangleHole = "k";
const squareHole = "l";
const trapezoidHole = "m";
const wall = "x";
const finish = "f";
const floor = "b";




setLegend(
  [ player, bitmap`
................
....00000000....
....09999990....
....09000000....
....09909090....
....09999990....
....00000000....
...0003333000...
...0903399090...
...0903399090...
...0903999090...
...0909999090...
...0000000000...
.....090090.....
.....000000.....
................` ],  //Drawn by my friend
  [ circle, bitmap`
................
....99999999....
...9999999999...
..999999999999..
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
..999999999999..
...9999999999...
....99999999....
................` ],
  [ triangle, bitmap`
................
.......99.......
.......99.......
......9999......
......9999......
.....999999.....
.....999999.....
....99999999....
....99999999....
...9999999999...
...9999999999...
..999999999999..
..999999999999..
.99999999999999.
.99999999999999.
................` ],
  [ square, bitmap`
................
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
................` ],
  [ trapezoid, bitmap`
................
................
................
................
................
................
................
.....999999.....
....99999999....
....99999999....
...9999999999...
...9999999999...
..999999999999..
..999999999999..
.99999999999999.
................` ],
  [ circleHole, bitmap`
................
....LLLLLLLL....
...LLLLLLLLLL...
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
...LLLLLLLLLL...
....LLLLLLLL....
................` ],
  [ triangleHole, bitmap`
................
.......LL.......
.......LL.......
......LLLL......
......LLLL......
.....LLLLLL.....
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
...LLLLLLLLLL...
...LLLLLLLLLL...
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
................` ],
  [ squareHole, bitmap`
................
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
................` ],
  [ trapezoidHole, bitmap`
................
................
................
................
................
................
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
...LLLLLLLLLL...
...LLLLLLLLLL...
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
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
  [ finish, bitmap`
................
....44444444....
...44......44...
..4..777777..4..
.44.77777777.44.
.4.7777777777.4.
.4.7777777777.4.
.4.7777777777.4.
.4.7777777777.4.
.4.7777777777.4.
.4.7777777777.4.
.44.77777777.44.
..4..777777..4..
...44......44...
....44444444....
................` ],
  [ floor, bitmap`
11111L1111111111
11111L1111111111
11111L1111111111
LLLL1L11LLLLLLLL
111LLL1LL1111111
11111LLL11111111
111111LL11111111
111111L111111111
LLLLLLLLL111111L
1111111L1LLLLLLL
111111LL11111111
11111LL111111111
11111L1111111111
11111L1111111111
11111L1111111111
11111L1111111111` ]
  
);


setSolids([player, circle, triangle, square, trapezoid, wall])

let level = 0
const levels = [
  map`
xxxxxx
xxxxxx
xxxxxx
xxxxxx
xxxxxx
p....f`,
  map`
kjl
tcs
p..
..f`,
  map`
xf.........
x..........
xxxxxxxxx..
x..xxxxxxr.
x..........
x.xxxx.cjxx
..x...xxxxx
...mk...t..
xxxxxxxxxx.
xxxxx...xx.
xps...l....`,
  map`
xxxxxxxxxxx......
xxxxxx....x.....j
...........x..xx.
........x..x.xx.x
..xxxx....xx.....
..x..x.x.x.x..x..
.....x.x.xxxxxx.x
..xxkx.......x...
..x..xxx....x....
..x...lx........x
..xxkxxx...m...xl
xxxxxxxx......xxj
.s.t.s.........x.
..r.r...xxxx...x.
.c.c.t..xm.......
f.p.....x........`,
  map`
jjjjjjjjjjjjjjjj
kkkkkkkkkkkkkkkk
llllllllllllllll
mmmmmmmmmmmmmmmm
cccccccccccccccc
tttttttttttttttt
ssssssssssssssss
rrrrrrrrrrrrrrrr
.......p........
................
.......f........`,
  map`
xxxxxx
xxxxxx
xxxxxx
xxxxxx
xxpfxx`
]

setMap(levels[level])

setPushables({
  [player]: [circle, triangle, square, trapezoid],
  [circle]: [circle, triangle, square, trapezoid],
  [triangle]: [circle, triangle, square, trapezoid],
  [square]: [circle, triangle, square, trapezoid],
  [trapezoid]: [circle, triangle, square, trapezoid],
})

setSolids([ player, circle, triangle, square, trapezoid, wall]); // other sprites cannot go inside of these sprites

// inputs
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
    setMap(currentLevel);
});


onInput("k", () => {
    clearText();
});


setBackground(floor);

function checkBoxes() {
  let totalChecks = []
  let collided = "[object Object],[object Object]"
  let boxes = [circle, triangle, square, trapezoid]
  let holes = [circleHole, triangleHole, squareHole, trapezoidHole]
  for (i = 0; i < boxes.length; i++) {
    totalChecks.push(tilesWith(boxes[i], holes[i]).length == getAll(boxes[i]).length);
  }
  if (totalChecks.toString() == Array(boxes.length).fill(true).toString()) {
    return true
  }
  else {
    return false
  }
}


// title screen
addText("How to play:\nMove With WASD\n\nGoal:\nMatch the boxes\nwith the holes\nanwd get to the\nfinish\n\nK: Clear Message\nJ: Reset Level", { x: 2, y: 1, color: color`5` });

// let counter = 0
let currentLevel = levels[level];
setMap(currentLevel)

afterInput(() => {
  if (tilesWith(player, finish).length == 1) {
    if (checkBoxes()) {
      level++;
      currentLevel = levels[level];
      if (currentLevel !== undefined) {
        setMap(currentLevel);
      } else {
        addText("you win!", { y: 4, color: color`3` });
      }
    } else {
      addText("Match ALL Boxes", { y: 4, color: color`3` });
      console.log("STILL HAVE NOT MATCHED BOXES");
    }
  }
})
