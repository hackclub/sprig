

// Made for the arcade session
// is a remix of the maze game start by Cher Berhanu

// Finished on July 9th, 2024 


const player = "p"// player
const player2 = "l"// player

//variables for Keys
const yellowKey = "y" // yellow key
const blueKey = "b" // Blue Key
const greenKey = "g" // Green Key

// Variables for the locks
const greenLock = "h" // greenlock
const yellowLock = "j" // Yellow lock
const blueLock = "k" // Blue Lock

//varibles for enviroment
const wall = "w" // concrete wall
const goal = "g" // goal
const goal2 = "o" // goal2
const blueBox = "v" // pushable blue box
const yellowBox = "c" //pushable yellow box

let number = 0;

const melody = tune `
500: A5-500 + C4~500,
500: C4^500,
500: D5-500 + C4^500,
500: C4^500,
500: G5-500 + C4~500,
500: C4^500,
500: C5-500 + C4^500,
500: C4^500,
500: F5-500 + C4~500,
500: C4^500,
500: A5-500 + C4^500,
500: C4^500,
500: G5-500 + C4~500,
500: C4^500,
500: C5-500 + C4^500,
500: A5-500 + C4~500,
500: C4^500,
500: C4^500 + D5-500,
500: C4^500,
500: C4~500 + G5-500,
500: C4^500,
500: C4^500 + C5-500,
500: C4^500,
500: C4~500 + F5-500,
500: C4^500,
500: C4^500 + A5-500,
500: C4^500,
500: C4~500 + G5-500,
500: C4^500,
500: C4^500 + C5-500,
500: C4~500,
500: C4^500`;

playTune(melody, Infinity);

setLegend(
  [player, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66600666600666.
.66600666600666.
.66600666600666.
.66600666600666.
.66666666666666.
.60066666666666.
.66006666660066.
.66600666660666.
..666600060066..
...6666600066...
....66666666....
................`], // player
  [player2, bitmap`
................
....55555555....
...5555555555...
..555555555555..
.55500555500555.
.55500555500555.
.55500555500555.
.55500555500555.
.55555555555555.
.50055555555555.
.55005555550055.
.55500555550555.
..555500050055..
...5555500055...
....55555555....
................`], // player
  [yellowKey, bitmap`
................
................
................
................
.66666..........
6666666.........
6622266666666666
662226666.6.6.66
66222666.6.6.6..
6666666.........
.66666..........
................
................
................
................
................`], // yellow key
  [yellowLock, bitmap`
................
................
................
......6666......
.....666666.....
....66....66....
....6......6....
....6......6....
....6......6....
....66666666....
....66666666....
....66111166....
....66111166....
....66611666....
....66611666....
....66666666....`], // yellow lock
     [blueLock, bitmap`
................
................
................
......5555......
.....555555.....
....55....55....
....5......5....
....5......5....
....5......5....
....55555555....
....55555555....
....55111155....
....55111155....
....55511555....
....55511555....
....55555555....`], // blue lock
  [blueKey, bitmap`
................
................
................
................
.55555..........
5555555.........
5522255555555555
552225555.5.5.55
55222555.5.5.5..
5555555.........
.55555..........
................
................
................
................
................`], // blue key
  [wall, bitmap`
0000000000000000
LLLLLL00111110LL
LLLLLL00111110LL
0000000000000000
11110LLLLL011110
11110LLLLL011110
0000000000000000
LLLLLL0111110LL0
LLLLLL0111110LL0
0000000000000000
111110LLLL011110
111110LLLL011110
0000000000000000
LLLL01111110LLL0
LLLL01111110LLL0
0000000000000000`], // concrete wall
  [goal, bitmap`
................
................
....5...........
....0606060606..
....0060606060..
....0606060606..
....0060606060..
....0606060606..
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........`], // goal
  [goal2, bitmap`
................
................
....6...........
....0505050505..
....0050505050..
....0505050505..
....0050505050..
....0505050505..
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........`], // goal2
  [blueBox, bitmap`
0000000000000000
0555555555555550
0500000000000050
0505555555555050
0505000000005050
0505055555505050
0505050000505050
0505050550505050
0505050550505050
0505050000505050
0505055555505050
0505000000005050
0505555555555050
0500000000000050
0555555555555550
0000000000000000`], //blue pushable box sprite
  [yellowBox, bitmap`
0000000000000000
0666666666666660
0600000000000060
0606666666666060
0606000000006060
0606066666606060
0606060000606060
0606060660606060
0606060660606060
0606060000606060
0606066666606060
0606000000006060
0606666666666060
0600000000000060
0666666666666660
0000000000000000`],
 // yellow pushable box sprite

)

setSolids([player, wall, yellowLock, blueLock,player2, yellowBox, blueBox])
setPushables({
 [player]: [yellowBox], 
  [player2]: [blueBox], 
  
})
let level = 0
const levels = [
  map `
wwwwwwww
y.k..j.b
..w..w..
..w..w..
..w..w..
..w..w..
p.wogwl.`, 
  map `
..w..p...
o.wwwwwcw
wjw.....y
..w.w....
..w...www
.ww...k..
.b.wwww.w
vwwww...g
........l`, 
  map `
..owp.wwww
w.wwwc.www
...wy.w..w
wv.ww..c..
..w....w..
..ww.wwww.
jw..w..w.k
...v...v..
b..w...wlg`, 
  map `
g......ww.o
.wkwwww..w.
w...w..b.w.
w.cywww.v.j
.w.ww.w..ww
.w.w..w....
w...wwwww..
w.cww..wwvw
ww..w..w..w
www.ww.w..w
w....w.w...
w....w.w...
wwwcwwwwvww
p.........l`, 



]

setMap(levels[level])



// First Player controls
onInput("s", () => {
  getFirst(player).y += 1 // move down
});

onInput("w", () => {
  getFirst(player).y -= 1 // move up
});

onInput("d", () => {
  getFirst(player).x += 1 // move right
});

onInput("a", () => {
  getFirst(player).x -= 1 // move left
});

// Second Players Movement inputs

onInput("k", () => {
  getFirst(player2).y += 1 // move down
});

onInput("i", () => {
  getFirst(player2).y -= 1 // move up
});

onInput("l", () => {
  getFirst(player2).x += 1 // move right
});

onInput("j", () => {
  getFirst(player2).x -= 1 // move left
});





afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
  const goalsCovered2 = tilesWith(player2, goal2); // tiles that both contain the player2 and goal2
  const keysTaken = tilesWith(player, yellowKey); // ADDED: all the keys that the player is on
   const keysTaken2 = tilesWith(player2, blueKey); // ADDED: all the keys that the player is on

// there is one player, so if 1 or more tiles with both a goal and a player, next level
if ((goalsCovered.length >= 1) && (goalsCovered2.length >= 1)) {
// increase the current level number
level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`7` });
    }
}

// ADDED: remove the lock and key if the key is picked up
if (keysTaken.length >= 1) {
getFirst(yellowLock).remove();
getFirst(yellowKey).remove();
}

  if (keysTaken2.length >= 1) {
getFirst(blueLock).remove();
getFirst(blueKey).remove();
}

});

// win (); {
// addText("you win!", { y: 4, color: color`7` });
// }






           
  