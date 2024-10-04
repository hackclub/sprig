/*
@title: The Maze of Sprig
@author: SahilD
@tags: ['puzzle']
@addedOn: 2023-02-14
*/
/*
instructions
Get your character to the green teleporter to get to the next level. 
Controls: W = up
          S = down
          A = left
          d = right
          J = restart
          
*/
/*
Have you ever got a liitle bored and your mom told you, "You can't get on your computer!" 
Then get your sprig and play The Maze of Sprig. It is a fun game with sound and cool blocks. You can also add your own maps so you can play at your own will!
*/



const player = "p";
const wall = "w";
const block = "b";
const teleport = "t"

setLegend(
  [ player, bitmap`
...6666666666...
..666666666666..
.66666666666666.
6LL6336663366LL6
66L6336663366L66
66LL666D6666LL66
666LF666666FL666
66666FFFFFF66666
666L66666666L666
655L55555555L556
655L55555555L556
655L55555555L556
655L55555555L556
6666666666666666
...0........0...
...00.......00..`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ block, bitmap`
LLLLLLLLLLLLLLLL
L3333LLLLLLLLLLL
L3LL3L3LLL3L3333
L3333L3LLL3L3LLL
L3LLLL3LLL3L3LLL
L3LLLL3LLL3L3LLL
LLLLLL3LLL3L3333
LLLLLLL333LLLLL3
LLLLLLLLLLLLLLL3
LLLLLLLLLLLL3333
LLLL3LLL3LLLLLLL
LLLL3LLL3LLLLLLL
LLLL3LLL3LLLLLLL
LLLL33333LLLLLLL
LLLL3LLL3LLLLLLL
LLLL3LLL3LLLLLLL`],
  [teleport, bitmap`
7777777777777777
1117777777777717
1777777177777171
1777117111117111
1117117171717177
7777777777777111
7777777777777777
7777777777777717
7177777177777171
1117117111117111
7177117171717177
7777777777777111
7777737773777777
7777737373777777
7773777777737777
7777333333377777`]
);


setSolids([player, wall, block]);

let level = 0;
const levels = [
  map`
p.wt
..b.
..w.
....`,
  map`
p..ww
...ww
.wwww
.wwww
.wwww
...ww
.b..w
...tw
..www`,
  map`
.w..w.wwwww
.w..w...w..
.b..w...w..
.w..w...w..
.w..w...b..
.wwbw...w..
.w..w...w..
.w..w...w..
.w..b...w.t
pw..w.wwwww`,
  map`
.wwww..w...t...
.w...w..w.....w
.w....w..w...w.
.w....b..bb.w..
.w....w....w...
.w...w.....w...
.wwbw......w...
.w...w.....w...
.w....w....w...
.w....w....w...
.b....w....w...
pwwwww.....w...`,
  map`
pw..w..w.w......
bw..w..ww.b....t
....w...w..wbbbb
....w..bw...wbbb
wwbww..b.....wbb
.......b......wb
.......b.......w`,
  map`
pw..w..w.
bw..w.b..
....w.b..
....w..w.
ww.ww..w.
.......w.
.......w.
wwwwwwww.
........t`,
  map`
p.w...b..ww...w......ww...
..b..w...w....w.......w...
..w.wwww.....ww...........
..ww..........w....w.ww...
..ww.........w..w......ww.
www.....w.....wbb.....w...
......w..w..w.wbb......w..
..w..w...w.w.w.w.ww..w....
...ww..........w..........
.ww.....w....w......w.....
..w...w..w.ww..w....www...
..w......w......w.........
www...w...w.....w.w..w.w..
...w......w...w...ww......
..w.....w........ww.......
.w......www............w..
...........ww...w.ww..ww..
............w...w.w..w...t`,
  map`
bbwwwwwbb.wwwww........bb.
bbwbbb....w...w........b..
bbwbbb.bbbw....w....wwww..
bbwbbb..bb......w...w..ww.
bbwbbb....w.....w...w...w.
bbwwwww...w.....w...b..tw.
bbbbbbw...wwwwwww...w...w.
bbbbbbw....w........w..w..
bbbbbbw....wbbbb....wwww..
bbbwbbw....w...b....ww....
bbbwwww....w.bbbb...wwww..
bb...........b..bb..w..w..
..............bbbb........
....wwwww.bb...wwb........
......w...bb..ww.......bbb
......w.......w..www...bbb
......w.w..bb.b....w..bbb.
p..wwwwww..b..wwwwww...b.b`,

];





const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [block]
});

//Start - Movement
onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});


onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});
//End - Movement 

//Teleport feature 
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(teleport).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(teleport, player).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map 
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Woooo Hooooo", { y: 10, color: color`H` });
    }
  }
});
//End - Teleport Feature 



afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(teleport).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(teleport, player).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Broke Out", { y: 4, color: color`H` });
    }
  }
});
//End - Teleport Feature 



