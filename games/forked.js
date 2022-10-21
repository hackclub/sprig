/*
@title: forked
@author: siri

Instructions:


you are a carrot
don't get stabbed by the fork
or else you fall into boiling hot oil and be carrot fries
you can refresh jumps in blue squares
any button works
w to jump
get the fork to stab the tomato
*/
const music = tune`
225.5639097744361: f4^225.5639097744361,
225.5639097744361: d4~225.5639097744361,
225.5639097744361,
225.5639097744361: g4^225.5639097744361 + e4^225.5639097744361 + b4^225.5639097744361 + c5-225.5639097744361,
225.5639097744361: g4^225.5639097744361 + b4^225.5639097744361 + e4^225.5639097744361 + d4/225.5639097744361,
225.5639097744361: d4~225.5639097744361,
225.5639097744361: f4^225.5639097744361 + a4^225.5639097744361 + c5^225.5639097744361 + d4~225.5639097744361 + e5-225.5639097744361,
225.5639097744361: f4^225.5639097744361,
225.5639097744361: a4^225.5639097744361 + d4~225.5639097744361 + c5^225.5639097744361,
225.5639097744361: a4^225.5639097744361,
225.5639097744361: c5^225.5639097744361,
225.5639097744361: e5^225.5639097744361 + f5-225.5639097744361,
225.5639097744361,
225.5639097744361: f5^225.5639097744361 + d4~225.5639097744361,
225.5639097744361: f5^225.5639097744361 + e5/225.5639097744361,
225.5639097744361,
225.5639097744361: f5^225.5639097744361 + d4~225.5639097744361 + g5-225.5639097744361,
225.5639097744361: f5^225.5639097744361,
225.5639097744361,
225.5639097744361: e5^225.5639097744361 + c5^225.5639097744361,
225.5639097744361: d4~225.5639097744361,
225.5639097744361: d5^225.5639097744361,
225.5639097744361: d5^225.5639097744361 + d4~225.5639097744361,
225.5639097744361,
225.5639097744361: f4-225.5639097744361,
225.5639097744361: c5^225.5639097744361,
225.5639097744361: b4^225.5639097744361 + d4~225.5639097744361,
225.5639097744361,
225.5639097744361: a4^225.5639097744361,
225.5639097744361: a4^225.5639097744361 + d4~225.5639097744361,
225.5639097744361,
225.5639097744361: c5^225.5639097744361 + d4~225.5639097744361 + d5-225.5639097744361`;
let playSound = true;
const player = "p";
const wall = "w";
const enemy = "d";
const other = "o";
const lava = "l";
const inv1 = "i";
const inv2 = "a";
const spork = "s";
var jumps = 1;
var timer = 0;


setLegend(
  [ player, bitmap`
................
................
................
................
....444444......
.....4444.......
.....4494.......
.....9999.......
.....9090.......
.....9999.......
.....9999.......
.....9222.......
.....9999.......
.....9999.......
.....9999.......
.....999........`],
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
0000000000000000`],
  [enemy, bitmap`
................
................
................
....1...........
1111111.........
......1111111111
1111111........1
......1111111111
......111.....11
1111111.........
................
................
................
................
................
................`],
  [other, bitmap`
................
................
....444....4....
.....4444444....
......344433....
.....33333333...
....3333333333..
....3333333333..
....3333333333..
....3333333333..
....3333333333..
....3333333333..
....3333333333..
.....33333333...
......333333....
................`],
  [lava, bitmap`
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
  [inv1, bitmap`
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
  [inv2, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [spork, bitmap`
................
................
................
................
................
111111..........
.10011..........
1100011111111111
.100011111111111
1110011.........
111111..........
................
................
................
................
................`]
);

let level = 0;
const levels = [
  map`
iiiiiiiiiiii
iiiiiiiiiiii
iiiipiiiiiii
o...aiiiiiid
....wwwwwwww
............
............
llllllllllll`,
  map`
iiiiiiiiiiiiiiii
iiiiiiiiiiiiiiii
iiiiiiipiiiiiiii
iiiiw..a.......s
....w.wwwwiiiii.
o....aiiiiiiiiid
...www..........
................
llllllllllllllll`,
  map`
...........................
.w.w.www.w.w...w...w.w.ww.w
.www.w.w.w.w...w.w.w.w.ww.w
..w..w.w.w.w...ww.ww.w.w.ww
..w..www.www...w...w.w.w.ww
...........................
............iii..dssd......
............iii..dssd......
............ipi..dssd......
............iai..dssd......
ooooooooowwwwwwwww.........
.............l.............`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall, enemy, spork ]);

setPushables({
  [enemy]: [player],
  [spork]: [player]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  if(jumps === 1){
  getFirst(player).y -= 2;
  
  }else{
  }

});
// END - PLAYER MOVEMENT CONTROLS
// gravity and enemy
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
  if(level<=1){
  getFirst(enemy).x -= 1;
  }
  if(level===1){
  getFirst(spork).x -= 2;
  }
}, 200);
//if ded and win then ded
afterInput(() => {
  let forkLocation = tilesWith(enemy, other).length;
  let otherLocation = tilesWith(other).length;
let lavaLocation = tilesWith(lava, player).length;
  let playerLocation = tilesWith(player).length;
  if ((lavaLocation === playerLocation) && (forkLocation === otherLocation)){
      setMap(levels[level]);
    playTune(music);
    jumps = 1;
  }
  
});

//fork
afterInput(() => {
  let enemyLocation = tilesWith(enemy, player).length;
  let playerLocation = tilesWith(player).length;
  if (enemyLocation === playerLocation){
      getFirst(player).y+=1;
  }
})
//lava
afterInput(() => {
  let lavaLocation = tilesWith(lava, player).length;
  let playerLocation = tilesWith(player).length;
  if (lavaLocation === playerLocation){
      setMap(currentLevel);
    playTune(music);
  }
})
//jumps
afterInput(() => {
 let invoneLocation = tilesWith(inv1, player).length;
  let playerLocation = tilesWith(player).length;
  if(invoneLocation === playerLocation){
  jumps--;
  }
});
afterInput(() => {
 let invtwoLocation = tilesWith(inv2, player).length;
  let playerLocation = tilesWith(player).length;
  if(invtwoLocation === playerLocation){
  jumps++;
  }
});
//check for real map
    if (currentLevel !== undefined) {
      setMap(levels[level]);
      playTune(music);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }

//next level
afterInput(() => {
 let forkLocation = tilesWith(enemy, other).length;
  let otherLocation = tilesWith(other).length;
  if(forkLocation === otherLocation){
 level++;
      setMap(levels[level]);
    playTune(music);
      jumps = 1;
  }
});
if(level===level){
playTune(music);
}


