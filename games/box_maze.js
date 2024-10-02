/*
@title: Box_Maze
@author: Boden
@tags: ['puzzle']
@addedOn: 2022-10-19
*/
/*
  INSTRUCTIONS
Make your way through the maze while pushing boxes, and standing on the multicolored goal
to move to the next level
CONTROLS
w= up
a= left
s= down
d= right
j= reset level
*/
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
......00000.....
.....0000000....
......LLLLL.....
......LLLLL.....
.......LLL......
....00..0.00....
...0000000000...
..0...0000...0..
..0....00....0..
......0000......
.....00..00.....
.....0....0.....
....00...00.....
...000..000.....
...00...00......
....000..000....`],
  [ box, bitmap`
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
0000000000000000`],
  [ goal, bitmap`
LLLLLLLLLLLLLLLL
L66666666666666L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L67777777777776L
L66666666666666L
LLLLLLLLLLLLLLLL`],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
);

setSolids([player, box, wall]);

let level = 0;
const levels = [
  map`
..w.g
p.w..
..b..
..w..
..w..`,
  map`
pw.w..
.w..bg
.w...w
.w....
.wwbww
......`,
  map`
pww.www
.ww.www
...b..g
.wwbwww
.......`,
  map`
...wwwwww
..b......
p..wwwwb.
..b...b.g
...wwwwbw
..b......
...wwwwww`,
  map`
..b..w.......
..b...ww....w
..w.wb..wbw.w
..w.wb..b.w.w
p.w.w.wgw.w.w
..w.w.www.wbw
..w.w.....w.w
..w.w.wwwww.w
..w..b.......`,
  map`
pwwwwwwwww
.w...w....
.wwb...wbb
.b..w..w..
.b..w.ww..
wwwww.w...
......w..w
w.bwwwww.w
w.......g.
wwwwwwwwww`,
  map`
p........w
www.www..w
w.....wbww
wbww..w..w
w..wbbw..w
w.w...w.ww
wbw..w...w
w.......gw
wwwwwwwwww`
];

setMap(levels[level]);

setPushables({
  [ player ]: [box],
  [ box ]: [box],
});
// START MOVEMENT CODE
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});
onInput("d", () => {
  getFirst(player).x += 1
});
// END MOVEMENT CODE

// START RESTART LEVEL INPUT
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined); {
    clearText(" ");
    setMap(currentLevel);
  }
});
// END RESTART LEVEL INPUT

  var tempototal = 60;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText(); 
    addText(""+tempototal, { y: 1 , color: color`7` });
      if(tempototal <= 0){ 
        clearInterval(tempodescendo);
        clearTile(getFirst(player).x,getFirst(player).y);
        // clearText(); was here before
        addText("Try Again!", { y: 1 , color: color`3` });
    }
    },1000);

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      clearInterval(tempodescendo);
    clearTile(getFirst(player).x,getFirst(player).y);
    }
  }
});
