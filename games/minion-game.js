/*
@title: minion game
@tags: []
@img: ""
@addedOn: 2024-2-06
@author: Hazik Khalid
*/

/*
PS: J is to reset a level
*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const sky = "s";
const invisible = "i";
const floor = "f";
const start = "y";

setLegend(
  [ player, bitmap`
................
................
................
................
.00000000000000.
.06666666666660.
.06222666622260.
.06200666600260.
.06200666600260.
.06666666666660.
.06666666666660.
.06622222222660.
.06622222222660.
.06666666666660.
.06666666666660.
.00000000000000.`],
  [ box, bitmap`
000000LLLL000000
099999CCCCCCCCC0
0CCCCC999999CCC0
0CCCCC999CC99990
099999999CC99990
099999999CCCCCC0
0999999999999990
099999CCC9999990
0CCCCCCCC9999990
0CCCCCCCC9999990
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
09999999CC999990
09999999CC999990
0000000000000000
................`],
  [ goal, bitmap`
7777777777777777
7777777777777777
7777700000077777
7777066666607777
7777066996607777
7770666969660777
7706666666666077
7706666669666077
7706666666966077
7706666699966077
7770666666660777
7777066666607777
7777700000077777
7777777777777777
7777777777777777
7777777777777777`],
  [ wall, bitmap`
LLL0LLLLL0LLLLL0
LLL0LLLLL0LLLLL0
LLL0LLLLL0LLLLL0
0000000000000000
0LLLLL0LLLLL0LLL
0LLLLL0LLLLL0LLL
0LLLLL0LLLLL0LLL
0000000000000000
LLL0LLLLL0LLLLL0
LLL0LLLLL0LLLLL0
LLL0LLLLL0LLLLL0
0000000000000000
0LLLLL0LLLLL0LLL
0LLLLL0LLLLL0LLL
0LLLLL0LLLLL0LLL
0000000000000000`],
  [ sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ invisible, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
5555555555555555`],
  [ floor, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ start, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
);

let level = 0;
const levels = [
   map`
ysssssssssyy
gyyssysssyyy
wwwwwwwwwyyy
yyyyyyyssyyy
syyywwwwwwws
ssyyyyyyyyyy
ywwyyyyyyyyy
pyyyyyyyyyyy`,
  map`
ysssssssssyyyyyyyg
yysssysssyyyyywwww
yyyyyyyssyyyyyyyyy
yyyyyyyssyyywbyyyy
syyyswwyysyyyswwyy
ssyybyyywwwyywyyyy
yywwyyyyyyyyyyyyyy
pyyyyyyyyyyyyyyyyy`,
  map`
ssyyyyyyyysyyyyyyyyyyyyyy
yffffssfyysyfyfffsffyyffy
yfsyssyffyyyfyfsyyffyyffy
yfsssgyfyfyyfyfffyffffffy
yfffyfyfssfyfyysfyffffffy
yfysyfyfssyffyssfyffysffy
yfysyfyfssyyfyfffyffysffy
yyyyyyyyyyyyyyyyyyyyyyyyy`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, floor ]);

setPushables({
  [player]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("k", () => {
  if (jumps > 0){
    getFirst(player).y -=1;
    getFirst(player).y -=1;
    getFirst(player).y -=1;
    jumps -= 1;
  
    }
});



onInput("a", () => {
  getFirst(player).x -= 1;
});



let jumps = 999999;

//Gravity Code
const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;


    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};
setInterval(() => {
  if (getFirst(player).y === 10) return;

  getFirst(player).y++;
}, 200);

//Double-Jump
afterInput(() => {
  let invisibleLocation = tilesWith(invisible, player).length; 
  let playerLocation = tilesWith(player).length;
  if (invisibleLocation === 1){
    jumps = 1;
  }
})


// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


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
      addText("You Win!", { y: 2, color: color`0` });
    }
  }
});
