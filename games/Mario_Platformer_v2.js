/*
@title: Mario Platformer
@author: Jackson Flanders
@tags: []
@addedOn: 2023-10-20
*/

/*
Welcome to Mario Platformer, where your goal is to finish each level/puzzle by collecting stars
and reach the end of the game. You may add your levels for even more fun and longevity (delete some of the ones that are one here already though). 
Control mario with ASD (K is jump for use with console). You can only jump after an action because idk how to fix it, 
so use either S or W as filler keys, also, S doesnt do anything I didn't feel like removing it. 
When making a level, make sure to line the jump surfaces with the
block with a dark blue line at the bottom, that's a jump surface. Have fun

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
.....33333......
....333333333...
....FFF66F6.....
...F6F666F666...
...F6FF666F666..
...FF6666FFFF...
.....6666666....
....33F333......
...333F33F333...
..333FFFFF3333..
..663F6FF6F366..
..666FFFFFF666..
..66FFFFFFFF66..
....FFF..FFF....
...CCC....CCC...
..CCCC....CCCC..`],
  [ box, bitmap`
9222222229029229
2999999999029990
2999999999029990
2999999999029990
2999999999029990
2999999999000009
2999999999022220
0009999990299990
2220099990299990
2992200002999990
2999922202999990
2999999902999990
2999999902999990
2999999902999900
9000000902900009
................`],
  [ goal, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777767777777
7777777666777777
7777776066677777
7777776066677777
7766660666666667
7760666666666667
7776066666666677
7777606666666777
7777766666667777
7777666666666777
7776666777666677
7776677777776677
7777777777777777`],
  [ wall, bitmap`
9990999990999990
9990999990999990
9990999990999990
0000000000000000
0999990999990999
0999990999990999
0999990999990999
0000000000000000
9990999990999990
9990999990999990
9990999990999990
0000000000000000
0999990999990999
0999990999990999
0999990999990999
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
DDDDDDDDDDDDDDDD
DDDDDDCCDDDDDDDD
DDCCCDCCCCDCDDDD
DCCCCCCCCCCCCCDC
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
  [ start, bitmap`
7777777777777777
7000777777777777
7077707777007077
7000000777070007
7770707007077077
7000707000077077
7777777777777777
7777777007777777
7777777007777777
7777777007777777
7777777007777777
7777777007777777
7777700000077777
7777770000777777
7777777007777777
7777777777777777`],
);

let level = 0;
const levels = [
  map`
ssssssssssss
ssswwwwwssss
ssssssssssss
bbsssysssbbs
iissigissiis
wwsswwwsswws
ssiispsiisss
sswwssswwsss
iiiiiiiiiiii
ffffffffffff`,
  map`
sssssssssiis
sssiisiiswws
ssswwbwwssss
sgssssssiiss
swsssssiwwss
ssssssswssss
ssssiissssss
spsswwssssss
iiiiiiiiiiii
ffffffffffff`,
  map`
ssssssssssss
sssiisisssss
ssswwswsssss
spssiiwsssss
sssswwssisss
iiiiissswigi
wwwwwssswwww
ssssssssssss
iiiiiiiiiiii
ffffffffffff`,
  map`
ssssssssssss
ssssssssssss
ssssssiigsss
sssssiwwwsss
ssssssssssss
sssiisssssss
ssswwsssssss
spissbssssss
iiwiiiiiiiii
ffffffffffff`,
  map`
ssssssssssss
sssssssswwss
ssssissswgss
sisswiiswwss
swssswwsssbs
sssiiwwiiiii
ssswwwwwwwww
spbsssssssss
iiiiiiiiiiii
ffffffffffff`,
  map`
ssssssssssss
ssssssssssss
ssssswgwssss
ssbiswwwssss
ssswsissssss
ssissbsissss
swiiiiiwssss
spwwwwwsbsss
siiiiiiiiiis
ffffffffffff`,
  map`
sssiisssssss
ssswwsssssss
ssiswsigssss
sswswswwssss
sssissssssss
ssswssssssss
ssisssssssss
pswsssssssss
iiiiiiiiiiii
ffffffffffff`,
  map`
ssssssssssss
ssssssssssss
sssssssssssg
sssssssssisw
sssssssiswiw
sssssiswiwiw
sssiswiwiwiw
psswiwiwiwiw
iiiwiwiwiwiw
ffffffffffff`,
  map`
ssssssssssss
ssssssssssss
ssssssssssss
ssssssssssss
psssssssssss
iiiiiiiiiiig
wbwbwbwbwbww
ssssssssssss
iiiiiiiiiiii
ffffffffffff`,
  map`
ssssssswssss
ssssssswsssg
ssssssswsssw
ssssssswsiss
sssssiswswss
ssssswbwsssi
sssiiwsssssw
psswwwssssss
iiiwiiiiiiii
ffffffffffff`,
  map`
sssssswsssss
sssssswsssss
sssssswsssss
sssssswsssss
sssssswssisi
ssssssisiwbw
pssssswswsss
iiiiiiwiwiig
ffffffffffff
............`,
  map`
ssssswssssss
ssssswssssss
ssssswsssssg
ssssswsssssw
sssssiiiiiiw
ssssswwwwwww
ssssiwssssss
psssswssssss
iiiiiwiiiiii
ffffffffffff`,
  map`
sssssswswsws
ssssiswsisws
pssswswswsws
iiiiwiiiwiis
fffffffffffs
sssssswswsws
ssisiswsisws
sswswswswsws
giwiwiiiwiii
ffffffffffff`,
  map`
sssssswsssss
sssssswsssss
sssssswsssss
sssssswsssss
sssssswsssss
sssssswsssss
sssssswsssss
pssssswsssss
iiiiibssiiig
fffffiiiffff`,
  map`
ssssssssspws
sssiiiiiiiws
ssswwwwwwwws
iiiiiissssws
wwwwwwisssws
sssssswbbbws
ssssiswsssws
sssswsssssws
giiiwissssws
ffffffffffff`,
  map`
ssssssssssss
ssssssssbbbb
sssssssbbbbb
ssssssbbbbbb
sssssbbwwwww
sssssswsssss
ssssiibiiigi
psiiffffffff
iiffffffffff
ffffffffffff`,
  map`
ssssssssssss
ssssssssssss
ssssssssssis
ssssssssisws
ssssssiiwsws
ssssiswwwsws
ssiswswswsws
pswswsiswiws
iiwiwiwswfwi
fffffffiiigf`,
  map`
gsssssssssss
wissssssssss
swsissssssss
ssswsisssiss
ssssswsiswss
sssssiswsiss
sssiswssswsi
piswsssssssw
iwiiiiiiiiii
ffffffffffff`,
  map`
ssssssssssss
ssgiisiiisss
sswwwswwwiss
sssswisswwis
sssswwisswwi
ssssswwsiiwi
ssssissswwwi
pssswiiiiswi
iiiiwwwwwiwi
ffffffffffff`,
  map`
siisisiiiiss
swwswswwwwss
siigwswsswss
swwbwswsswss
swiiiswsswss
swwwwswwwwss
sssssissssss
psssswssssss
iiiiiiiiiiii
ffffffffffff`,
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



let jumps = 999999999;

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
