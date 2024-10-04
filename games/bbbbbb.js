/*
@title: bbbbbb
@author: hoggie
@tags: ['puzzle']
@addedOn: 2022-12-06
*/

const player = "p";
const goal = "g";
const wall = "w";
const bg = "b";
const spike = "s";
const key = "k";
const door = "d";

var gravity = 0;
  
setLegend(
  [ player, bitmap`
.......33.......
......3333......
.....303303.....
.....333333.....
......3333......
.......33.......
.......33.......
....33333333....
....33333333....
.......33.......
.......33.......
.......33.......
......3333......
.....333333.....
.....33..33.....
.....33..33.....`],
  [ goal, bitmap`
................
................
..6.............
..6..666666...6.
..6666666666666.
..6666666666666.
..6666666666666.
..6666666666666.
..6666666666666.
..6666666666666.
..6666666666666.
..6666.....666..
..6.............
..6.............
..6.............
.666............`],
  [ wall, bitmap`
7777777777777777
5557555555575555
5557555555575555
5557555555575555
7777777777777777
5555555755555557
5555555755555557
5555555755555557
7777777777777777
5557555555575555
5557555555575555
5557555555575555
7777777777777777
5555555755555557
5555555755555557
5555555755555557`],
  [ bg, bitmap`
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
  [ spike, bitmap`
................
.......33.......
......3333......
......3333......
.....333333.....
....33399333....
..333399993333..
.33339999993333.
.33339999993333.
..333399993333..
....33399333....
.....333333.....
......3333......
......3333......
.......33.......
................`],
  [ key, bitmap`
................
.......77.......
......7777......
.....775577.....
.....775577.....
......7777......
.......77.......
.......77.......
.......77.......
.......7777.....
.......77.......
.......7777.....
.......77.......
.......7777.....
................
................`],
  [ door, bitmap`
5555555555555555
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777757557577775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5555555555555555`],
  
);

const tunes = {
  goal: tune`
352.94117647058823: d4-352.94117647058823 + f4-352.94117647058823 + a4-352.94117647058823,
352.94117647058823: f4-352.94117647058823 + a4-352.94117647058823 + c5-352.94117647058823,
10588.235294117647`,
  keyCollect: tune`
145.63106796116506: e5-145.63106796116506,
145.63106796116506: a5-145.63106796116506,
4368.9320388349515`,
  death: tune`
326.0869565217391: d4/326.0869565217391 + f4/326.0869565217391 + a4/326.0869565217391,
10108.695652173912`,
  flipU: tune`
500: e4^500 + g4^500 + c5^500 + e5^500,
15500`,
  flipD: tune`
500: d5^500 + b4^500 + f4^500 + d4^500,
15500`,
}


setBackground(bg);
setSolids([player, wall, door]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwww
wwssssssssww
ww........ww
ww.wwwwww.ww
ww.wwwwww.ww
ww........ww
ww........ww
ww.wwwwww.ww
ww.wwwwww.ww
w...wwww...w
w.p.wwww..gw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
w..........w
w..........w
w..........w
w..........w
w..........w
wp.ssssss.gw
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
w......sss.w
w..........w
w..........w
w..........w
w..........w
wpsss.....gw
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w..sss.....w
w..........w
w..........w
wg....sss..w
wwwwwwwww..w
wwwwwwwww..w
w.....sss..w
w..........w
w..........w
wp.sss.....w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w..sswwss..w
w....ww....w
w....ww....w
w....ww....w
w.w.gwwp.w.w
w..wwwwww..w
w...ssss...w
wss......ssw
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wwwwwwwwwwww
www...ss..kw
www.......ww
www.......ww
www.......ww
www.......ww
www.......ww
www.......ww
wgdpss..ssww
wwwwwwwwwwww
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
ws..ss....kw
w..........w
w......ss..w
w..wwwwwwwww
w..d....ss.w
w..ww......w
w..d..ss..gw
w..wwwwwwwww
w..sss.....w
ws.....ssspw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wss........w
w....sssss.w
w..wwwwwws.w
wp.d...gw..w
wwwwwwwww.sw
wwwwwwwww.sw
w......kw..w
w..wwwwwws.w
w.....ssss.w
wss........w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wssss.....pw
ws.....ss..w
ws..wwwwwwww
ws.......skw
wwwww..s.s.w
wwwww..s.s.w
w...d..s...w
w.sswwwwwwww
w.ss....sssw
w....ss...gw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w..sss...wsw
w...s....w.w
w........w.w
w.s...s..w.w
wks..ssspd.w
wwwwwwwwww.w
w.....sss..w
w......s...w
w...s.....sw
wg.sss...ssw
wwwwwwwwwwww`,
];

setMap(levels[level]);

onInput("i", () => {
  var gravity = 1
  playTune(tunes.flipU);
  for (let i = 0; i < 10; i++) {
   setTimeout(() => { getFirst(player).y -= 1;}, 100*i);
   if (gravity == 0) {
     break;
   }
    
}
});

onInput("k", () => {
  var gravity = 0
  playTune(tunes.flipD);
  for (let i = 0; i < 10; i++) {
   setTimeout(() => { getFirst(player).y += 1;}, 100*i);
    if (gravity == 1) {
      break;
    }
}  
});

onInput("d", () => {
  getFirst(player).x += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

afterInput(() => {
    //checks your vibe
    const currentLevel = levels[level];
    const vibeCheck = tilesWith(player, spike).length;
  if (vibeCheck > 0) {
  if (currentLevel !== undefined) {
    clearText("");
    setSolids([player, wall, door]);
    playTune(tunes.death);
    setMap(currentLevel);
  }
  }

  const keyCollision = tilesWith(player, key).length
  if (keyCollision > 0) {
    getFirst(key).remove();
    playTune(tunes.keyCollect);
    setSolids([player, wall]); 
  }
  
 //checks goal collision
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setSolids([player, wall, door]);
      playTune(tunes.goal);
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`D` });
    }
  }


  
});
