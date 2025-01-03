
/* 
@title: mailman
@author: Akko
@tags: []
@addedOn: 2023-09-07
*/

    let badtime = 0; // Initialize badtime
let eviltime = 0;
const tunee = tune`
500: G4~500 + E5^500,
500: A4~500 + F4^500,
500: G4~500,
500: A4~500,
500: B4~500,
500: A4~500 + D4^500 + E5^500,
500: D4^500,
500: A4~500,
500: B4~500 + E5^500 + G4~500,
500: A4~500,
500: C5~500 + E4^500,
500: A4~500,
500: G4~500,
500: B4~500,
500: A4~500 + E5^500,
500,
500: G4^500 + D4^500 + C4^500,
500: C5~500,
500,
500: G4^500 + E5^500,
500,
500: A4~500,
500: C5~500 + E4^500,
500,
500: B4^500 + G4^500,
500,
500: G4^500 + C5^500 + D5^500,
500: E4^500,
500: D5^500,
500: E5^500,
500: F4^500 + A4^500,
500`;
playTune(tunee);
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const BADBOX = "r";
const EVILBOX = "o";

const damage = 1;
setLegend(
  [ player, bitmap`
................
................
................
................
......7777......
......7771......
......7772......
......777777....
......0...0.....
......0...0.....
.......000......
........0.......
.......000......
........0.......
.......0.0......
................`],
  [ box, bitmap`
................
................
................
...CCCCCCCCCCC..
...C...CC....CLL
...C...CC....CC.
...C...CC....CC.
...CCC.CC....CC.
...CCCCCCCCCCCC.
...C...CC....C..
...C....C....C..
...C....C....C..
...C....C....C..
...CCCCCCCCCCC..
................
................`],
  [BADBOX, bitmap`
................
....33333333....
...3........3...
...3........3...
...3........3...
...333......3...
...333......3...
...3........3...
...3........3...
...3........3...
....33333333....
................
................
................
................
................`],
  [EVILBOX, bitmap`
................
....HHHHHHHH....
...H........H...
...H........H...
...H........H...
...HHH......H...
...HHH......H...
...H........H...
...H........H...
...H........H...
....HHHHHHHH....
................
................
................
................
................`],
  [ goal, bitmap`
...............3
...............3
...............3
...............3
...............3
...............3
.LLLLLLLLLLLLLL3
L...0....0....03
L..010..010..013
L...0....0....03
.LLLLLLLLLLLLLL3
...............3
...............3
...............3
...............3
...............3`],
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
0000000000000000`]
);
let level = 0;
const levels = [
  map`
p...
.b.g
..r.`,
  map`
p...
..b.
...g`,
  map`
p..g
.b..
....
....`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`,
  map`
...r..
......
p.b..g
......`,
  map`
....r..r..
..........
..........
p..b.....g
..........
..........
.....oo...`,
  map`
.brrrrrrg
.........
.pwwwwwww
..wwwwwww
.........
.boooooog`,
  map`
..r..o.o.
...o..orr
pr..o....
..o.rr.o.
....o..o.`,
  map`
p.wwwgwg
.bwww.w.
.bwww.wr
..ooo.o.
........`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);
setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites
// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box] : [box]
});
setInterval(function(){
  badtime += 1; // Increment badtime
  if (badtime == 16) {
    badtime = 0;
  }
  if (badtime > 1 && badtime < 5) {
    setTimeout(function(){
      getAll(BADBOX).forEach(element => {
      element.y += 1
      })
    }, 200);
  }
  if (badtime > 10 && badtime < 15) {
    setTimeout(function(){
      getAll(BADBOX).forEach(element => {
      element.y -= 1
      }) // Move the box up by subtracting
    }, 200);
 }
  checkHit(); // check for collision on every update
}, 200);

setInterval(function(){
  eviltime += 1; // Increment badtime
  if (eviltime == 16) {
    eviltime = 0;
  }
  if (eviltime > 1 && eviltime < 5) {
    setTimeout(function(){
      getAll(EVILBOX).forEach(element => {
      element.y -= 1
      })
    }, 200);
  }
  if (eviltime > 10 && eviltime < 15) {
    setTimeout(function(){
      getAll(EVILBOX).forEach(element => {
      element.y += 1
      }) // Move the box up by subtracting
    }, 200);
 }
  checkHit(); // check for collision on every update
}, 200);


// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});
onInput("w", () => {
  getFirst(player).y += -1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x += -1;
});
onInput("i",() => {
  const currentLevel =levels[6];
  level = 6
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
// these get run after every input
afterInput(() => {

  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;
  // call the check hit function to check for collision
  checkHit();
  
  //aa if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    const currentLevel = levels[level];
    // console.log(level);
    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});

function checkHit() {
  const badhitbox = tilesWith(BADBOX).length;
  const baddamage = tilesWith(BADBOX, player).length;

  // Get the current level's map
  const currentLevelMap = levels[level];

  if (baddamage > 0) {
    // You're being hit
      // console.log("evilHIT!");
      // console.log(evildamage);
      setMap(currentLevelMap); // Reset the current level
    }
  }




// function checkHit() {
//   const badBoxHitbox = tilesWith(BADBOX).length;
//   const evilBoxHitbox = tilesWith(EVILBOX).length;
  
//   const badBoxDamage = tilesWith(BADBOX, player).length;
//   const evilBoxDamage = tilesWith(EVILBOX, player).length;

//   // Get the current level's map
//   const currentLevelMap = levels[level];

//   if (badBoxDamage > 0 || evilBoxDamage > 0) {
//     // You're being hit by either BADBOX or EVILBOX
//     setMap(currentLevelMap); // Reset the current level
//     // console.log("HIT!");
//   }
// }
