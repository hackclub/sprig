/*
@title: chase_bob
@author: garfieldfatcat3pack
@tags: []
@addedOn: 2023-04-01
*/

const player = "p";
const orpheus = "o";
const background = "b";
const bob = 'c';
const hitman = 'd';
const wall = 'e';

setLegend(
  [ player, bitmap`
................
....000000......
....0CCCC0......
...00000000.....
....022220......
....022220......
....000000......
......00..000000
......00..000000
...000000000....
......00..00....
......00........
....000000......
....0....0......
...00....00.....
...0......0.....` ],
  [background, bitmap`
44444444444444CC
44444444444CCCC4
44444444CCCC4444
444CC444C4C44444
4444C44444444444
44444444CC4444C4
4444444CC44CCCC4
44444CC444CC4444
4444C44444444444
4444444444CC4444
4C44444444C44444
4CC44444CC444444
44CCC44C44444444
44C4444444444444
4444444444444444
4444444444444444`],
  [orpheus, bitmap`
................
................
................
...00000000.....
...03333330.....
00003033330.....
00003333330.....
...003333300....
....03333330....
....03333330....
....03333330....
.....0300030....
.....030.030....
.....030.030....
.....030.030....
.....000.000....`],
  [bob, bitmap`
............0...
..........00....
..0000...00.....
.0DDD0..00....00
.00DD0...000.000
..0DD0.00DD000..
...0000DDDDD0...
......0DDDDDD0..
.......0DDDD00..
...00000DD00....
.......0000.....
..........0.....
...........0....
...........0....
................
................`],
  [hitman, bitmap`
................
.00.............
.00.............
.00.00000000....
.00.0CCCCCC0....
.0000000000000..
.00.0.0..0.0....
000000.....0....
.00..0.....00...
.00.0.......0...
.0000.......0...
.00.0.......0...
....00000000....
.....00..00.....
.....00..00.....
.....00..00.....`],
  [wall, bitmap`
LLLLLLLLLLL0LLLL
LL0LLL0LLL0LLL0L
LLLLLLLL00000LLL
0000000000000000
LLLLLLLLLLLLLLLL
LLLLL0LLLL0LLLLL
LLLLL0L0LLLLLLLL
LLLLLLLLLLL0LLLL
LL00000LLLLLL0LL
0000000000000000
LLLLLLL0LLLLL0LL
LL00LLLLLLLLLLLL
LLLL0LLLL0000LLL
0000000000000000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
  )
  
setBackground(background)

setSolids([wall, player])

let level = 0
const levels = [
  map`
p.......
........
...c....
........
........
....o...
........
.......d`, 
  map`
p..o.
.....
.....
d..c.
.....`,
  map`
p......c
........
........
........
........
.....od.`,
  map`
p.......
........
........
......od
ee..eeee
e.......
e......c`
]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
  getFirst(hitman).y += Math.floor(Math.random() * 5) -2;
  getFirst(bob).y += Math.floor(Math.random() * 5) -2;
  getFirst(orpheus).y += Math.floor(Math.random() * 5) - 2;
})

onInput("w", () => {
  getFirst(player).y -= 1
  getFirst(hitman).y -= Math.floor(Math.random() * 5) -2;
  getFirst(bob).y -= Math.floor(Math.random() * 5) -2;
  getFirst(orpheus).y -= Math.floor(Math.random() * 5) - 2;

})

onInput("a", () => {
  getFirst(player).x -= 1
  getFirst(hitman).x -= Math.floor(Math.random() * 5) -2;
  getFirst(bob).x -= Math.floor(Math.random() * 5) -2;
  getFirst(orpheus).x -= Math.floor(Math.random() * 5) - 2;

})

onInput("d", () => {
  getFirst(player).x += 1
  getFirst(hitman).x += Math.floor(Math.random() * 5) -2;
  getFirst(bob).x += Math.floor(Math.random() * 5) -2;
  getFirst(orpheus).x += Math.floor(Math.random() * 5) - 2;

})

afterInput(() => {

  if (
    getFirst(player).x == getFirst(orpheus).x &&
    getFirst(player).y == getFirst(orpheus).y
   ){
        addText("you lose!", {
          x: 10,
          y: 4,
          color: color`3`
        } )
   setTimeout(() => setMap(levels[0]), 2000);
    setTimeout(() => clearText(), 2000); 
    
  }

  
  if (
    getFirst(player).x == getFirst(bob).x &&
    getFirst(player).y == getFirst(bob).y
    ){
        addText( "you win!", {
          x:10,
          y:4,
          color: color`5`
        })
  
    
       level = level + 1;
  
      const currentLevel = levels[level];

    if (currentLevel == undefined) {
      clearText()
      addText("victory!", { y: 4, color: color`3` });
    } else {
    
     setTimeout(() => setMap(currentLevel), 2000);
    setTimeout(() => clearText(), 2000); 
    }
  }

  
  if (
    getFirst(player).x == getFirst(hitman).x &&
    getFirst(player).y == getFirst(hitman).y
    ){
      addText( "you lose!", {
        x:10,
        y:4,
        color: color`2`
      })

    setTimeout(() => setMap(levels[0]), 2000);
    setTimeout(() => clearText(), 2000); 
    }
  

 } 
)
