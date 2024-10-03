/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
@img: ""
*/

const player = "p";
const player2 = "l";
const wall = "w";
const wall2 = "q";
const wall3 = "e";
const goal = "g";
const goal2 = "h";
const button = "b";
const trap = "t";
const trap2 = "y";
const trap3 = "u";


setLegend(
  [player, bitmap`
................
................
................
.....000000.....
....00777700....
...0077777700...
...0770770770...
...0777777770...
...0777777770...
...0770770770...
...0077007700...
....00777700....
.....000000.....
................
................
................`],
  [player2, bitmap`
................
................
................
.....000000.....
....00333300....
...0033333300...
...0330330330...
...0333333330...
...0333333330...
...0330330330...
...0033003300...
....00333300....
.....000000.....
................
................
................`],
  [wall, bitmap`
0000000000000000
LL0LLLLLL0LLLLLL
LL0LLLLLL0LLLLLL
LL0LLLLLL0LLLLLL
0000000000000000
LLLLLL0LLLLLL0LL
LLLLLL0LLLLLL0LL
LLLLLL0LLLLLL0LL
0000000000000000
LL0LLLLLL0LLLLLL
LL0LLLLLL0LLLLLL
LL0LLLLLL0LLLLLL
0000000000000000
LLLLLL0LLLLLL0LL
LLLLLL0LLLLLL0LL
LLLLLL0LLLLLL0LL`],
  [wall2, bitmap`
0000000000000000
LL0L1LLLL0LLLL1L
LL0L1LL1L0LLL11L
LL0L11LLL0LLL1LL
0000001100011000
LLLLL1LLLL1LL0LL
LLL1LL7L11LLL0LL
LLLL1LL7LLLLL1LL
0000000070000000
LL0LLLL7L01LLLLL
LL0LLL1LL1LLL1LL
LL0L1L1LL01LLLLL
0001000101000000
LL1L1L0LLL1L10LL
L1LLLL0LL1LLL0LL
LLLLLL0LLL1LL1LL`],
  [wall3, bitmap`
LLLLLLLLLLLLLLLL
11L111111L111111
11L111111L111111
11L111111L111111
LLLLLLLLLLLLLLLL
111111L777111L11
111111L777111L11
111111L777111L11
LLLLLLLLLLLLLLLL
11L111111L111111
11L111111L111111
11L111111L111111
LLLLLLLLLLLLLLLL
111111L111111L11
111111L111111L11
111111L111111L11`],
  [goal, bitmap`
................
....77777777....
...77......77...
..77........77..
.77..........77.
.7.000......0.7.
.7.0........0.7.
.7.00.000.000.7.
.7.0..0.0.0.0.7.
.7.0000.0.000.7.
.7............7.
.77..........77.
..77........77..
...77......77...
....77777777....
................`],
  [goal2, bitmap`
................
....33333333....
...33......33...
..33........33..
.33..........33.
.3.000......0.3.
.3.0........0.3.
.3.00.000.000.3.
.3.0..0.0.0.0.3.
.3.0000.0.000.3.
.3............3.
.33..........33.
..33........33..
...33......33...
....33333333....
................`],
  [button, bitmap`
................
................
................
................
................
.....000000.....
.....033330.....
.....033330.....
.....033330.....
.....033330.....
.....000000.....
................
................
................
................
................`],
  [trap, bitmap`
................
....00000000....
...0999999990...
..039999999990..
.03393999999990.
.03393999999990.
.03993999999990.
.03399933999990.
.09339999999990.
.03393339933990.
.03333333333990.
.03333333333330.
..033333333330..
...0333333330...
....00000000....
................`],
  [trap2, bitmap`
................
....00000000....
...0444444440...
..0D4444444440..
.0DD4D444444440.
.0DD4D444444440.
.0D44D444444440.
.0DD444DD444440.
.04DD4444444440.
.0DD4DDD44DD440.
.0DDDDDDDDDD440.
.0DDDDDDDDDDDD0.
..0DDDDDDDDDD0..
...0DDDDDDDD0...
....00000000....
................`],
  [trap3, bitmap`
................
....00000000....
...0666666660...
..0F6666666660..
.0FF6F666666660.
.0FF6F666666660.
.0F66F666666660.
.0FF666FF666660.
.06FF6666666660.
.0FF6FFF66FF660.
.0FFFFFFFFFF660.
.0FFFFFFFFFFFF0.
..0FFFFFFFFFF0..
...0FFFFFFFF0...
....00000000....
................`],
)


let level = 0
const levels = [
  map`
wwwww.w.gw
w.plw...ww
w.wwwqwwww
w.w.....ww
w.wbwww.ww
w.wwwtw.ww
w.......hw
wwwwwwwwww`,
  map`
wwwwwwwwwwwww
w.lp........w
w.....q..q..w
w.wwww.wwqwww
webq......q.w
w..w..wwww.qw
wwwwwwww....w
w..t...w..w.w
w.w.ww.w..w.w
w.w.ww.w..w.w
w.w.ww.w..w.w
w.w....qq.w.g
whwwwwwwwwwww`,
  map`
wpwwwwwwwwwwwwwwwww
wlw....t.........bw
w.w.www.w.wwwwwwwww
w...w...w.........w
w.www.wwwwwwwww.w.w
w.w...w.......w.w.w
w.wwwww.wwwww.www.w
w...w..y....w.w...w
www.w.wwwww.w.w.w.w
w..uw.w...w.w.w.w.w
www.w.w.w.w.w.w.w.w
w...w...w.w.w...w.w
w.wwwwwww.wwwwwwwww
w...qq..w.w.......w
wwwww.w.w.w.wwwww.w
w..gw.w.w...w...w.w
w.www.w.wwwww.w.w.w
w.....w.......w.w.h
wwwwwwwwwwwwwwwwwww`
];
setMap(levels[level]);
let Pushy = {
  [player]: ["e"], [wall2]: ["q"] };
setSolids([player, player2, wall, wall2, wall3]);



function checkForPlayer(x, y) { // this function accepts two paramaters: x & y
  if (getTile(x, y).length === 0) {
    return false;
  } else {
    return (getTile(x, y)[0]["type"] === player || getTile(x, y)[0]["type"] === player2);
  }
}

let up = false
setInterval(() => {
  if (level === 0) {
    if (up) {
      if (checkForPlayer(5, 6)) {
        setMap(levels[level]);
      } else {
        clearTile(5, 5);
        addSprite(5, 6, trap);
        up = false;
      }
    } else {
      if ((checkForPlayer(5, 5) || checkForPlayer(5, 6))) {
        setMap(levels[level]);
      } else {
        clearTile(5, 6);
        addSprite(5, 5, trap);
        up = true;
      }
    }
  }
 if (level === 1) {
    if (up) {
      if ((checkForPlayer(3, 7) || checkForPlayer(3, 8))) {
        setMap(levels[level]);
      } else {
        clearTile(3, 7);
        addSprite(3, 8, trap);
        up = false;
      }
    } else {
      if ((checkForPlayer(5, 5) || checkForPlayer(5, 6))) {
        setMap(levels[level]);
      } else {
        clearTile(3, 8);
        addSprite(3, 7, trap);
        up = true;
      }
    }
  }
  if (level === 2) {
    if (up) {
      if (checkForPlayer(7, 1) || checkForPlayer(7, 2) || checkForPlayer(7,7) || checkForPlayer(8,7) || checkForPlayer(3,9) || checkForPlayer(2,9)) {
        setMap(levels[level]);
      } else {
        clearTile(7, 1);
        clearTile(7, 7);
        clearTile(3, 9);
        addSprite(7, 2, trap);
        addSprite(8, 7, trap2);
        addSprite(2, 9, trap3);
        up = false;
      }
    } else {
      if (checkForPlayer(7, 1) || checkForPlayer(7, 2) || checkForPlayer(7,7) || checkForPlayer(8,7) || checkForPlayer(3,9) || checkForPlayer(2,9)) {
        setMap(levels[level]);
      } else {
        clearTile(7, 2);
        clearTile(8, 7);
        clearTile(2, 9);
        addSprite(7, 1, trap);
        addSprite(7, 7, trap2);
        addSprite(3, 9, trap3);
        up = true;
      }
    }
  }
}, 1000)
//if want difierent timing intervals, make new set interval
//player 1
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y += -1
})
onInput("a", () => {
  getFirst(player).x += -1
})
onInput("d", () => {
  getFirst(player).x += +1
})
//player 2
onInput("k", () => {
  getFirst(player2).y += 1
})
onInput("i", () => {
  getFirst(player2).y += -1
})
onInput("j", () => {
  getFirst(player2).x += -1
})
onInput("l", () => {
  getFirst(player2).x += +1
})


// if (levels[level] !== undefined) {
//   clearText("");
//   setMap(levels[level]);
// };




afterInput(() => {
  setPushables(Pushy);

  
  // count the number of tiles with goals
  const blueGoals = tilesWith(goal).length;
  const redGoals = tilesWith(goal2).length;
  const redButtons = tilesWith(button).length;
  const redDeathNumber = tilesWith(trap).length; 
  const greenDeathNumber = tilesWith(trap2).length; 
  const yellowDeathNumber = tilesWith(trap3).length; 
  // count the number of tiles with goals and boxes
  const blueGoalsCovered = tilesWith(goal, player).length;
  const redGoalsCovered = tilesWith(goal2, player2).length;
  const redButtonsCovered = tilesWith(button, player2).length;
  const redTrapCovered = tilesWith(trap, player).length;
  const redTrapCovered2 = tilesWith(trap, player2).length;
  const greenTrapCovered = tilesWith(trap2, player).length;
  const greenTrapCovered2 = tilesWith(trap2, player2).length;
  const yellowTrapCovered = tilesWith(trap3, player).length;
  const yellowTrapCovered2 = tilesWith(trap3, player2).length;
  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level\

  
  if (redButtonsCovered === redButtons) { // checking for red button coverage
    Pushy = {[player]: [wall3, wall2], [wall2]: [wall2]};
  } else {
    Pushy = {
      [player]: [wall3], [wall2]: [wall2] };
  }

  
   if (blueGoalsCovered === blueGoals && redGoalsCovered === redGoals) {
      level++;
      if (!levels[level]) {
          addText("you win!", { y: 4, color: color`3` });
      } else {
          setMap(levels[level])

      }
    }
    if (redDeathNumber === redTrapCovered || redDeathNumber === redTrapCovered2) {
    setMap(levels[level]);
    }
  if( level === 2) {  

    if (greenDeathNumber === greenTrapCovered || greenDeathNumber === greenTrapCovered2) {
    setMap(levels[level]);
    }  
    if (yellowDeathNumber === yellowTrapCovered || yellowDeathNumber === yellowTrapCovered2) {
    setMap(levels[level]);
    }  
  }
  // if (trapCovered.length > 0) {
  //     setMap(levels[level]);
  // }

});
