const player = "p";
const guard1 = "f";
const guard2 = "g";
const guard3 = "h";
const guard4 = "k"; // NEW (guard 4): letter for the fourth guard

const door = "d";
const startbackground = "b"
const background = "c"

let currentlevel = 0; 
let music = null // NEW: holds the playing music so it can be stopped later

onInput("w", () => {
   if (currentlevel !== 1) return
   const p = getFirst(player)
   if (p) p.y -= 1 // move up
});

onInput("a", () => {
   if (currentlevel !== 1) return
   const p = getFirst(player)
   if (p) p.x -= 1  // move left
});

onInput("d", () => {
 if (currentlevel !== 1) return
  const p =getFirst(player)
  if (p) p.x += 1  // move right
});

onInput("s", () => {
   if (currentlevel !== 1) return // Checks which level it is and stops the bottom code i
   const p =getFirst(player) // Finds the sprite player. 
   if (p) p.y += 1  // If the player is found, it moves down. This prevents the scenario when getFirst gets null. 
});





const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`, // CHANGED: "b" tiles replaced with "." (empty); black now comes from setBackground(startbackground)
  map`
..p.
.f..
..g.
...k
h...
.d..` , // CHANGED (guard 4): new row "...k" added, guard 4 starts at the right wall; map is now 6 rows tall
  map`
.` // CHANGED: "b" replaced with "."; black comes from setBackground(startbackground)
  ]

setLegend(
  [player, bitmap`
2222222222222222
2222222022222222
2222220202222222
2222022022022222
2222000000022222
2222222022222222
2222220202222222
2222220202222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [guard1, bitmap`
2222222222222222
2222222222222222
2222222252222222
2222222525222222
2222222252222222
2222222252222222
2222222252222222
2222222525222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ door, bitmap `
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
222CCCCCCCCC2222
222CCCCCCCCC2222`],
  [startbackground, bitmap `
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
  [background,bitmap `
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
    [guard2,bitmap`
2222222222222222
2222222222222222
2222222252222222
2222222525222222
2222222252222222
2222222252222222
2222222252222222
2222222525222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [guard3, bitmap`
2222222222222222
2222222222222222
2222222252222222
2222222525222222
2222222252222222
2222222252222222
2222222252222222
2222222525222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [guard4, bitmap`
2222222222222222
2222222222222222
2222222252222222
2222222525222222
2222222252222222
2222222252222222
2222222252222222
2222222525222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`], // NEW (guard 4): same picture as the other guards
);

const backgroundMusic = tune`
227.27272727272728,
227.27272727272728: C4~227.27272727272728 + B4^227.27272727272728,
227.27272727272728: D5^227.27272727272728 + G4~227.27272727272728 + E5~227.27272727272728,
227.27272727272728: G5~227.27272727272728 + F4~227.27272727272728 + D4^227.27272727272728,
227.27272727272728: F4~227.27272727272728 + D4^227.27272727272728,
227.27272727272728: A4~227.27272727272728 + A5^227.27272727272728 + G5~227.27272727272728,
227.27272727272728: D5~227.27272727272728 + E5~227.27272727272728 + E4~227.27272727272728,
227.27272727272728,
227.27272727272728: B4~227.27272727272728 + F5^227.27272727272728,
227.27272727272728: E4~227.27272727272728 + A5^227.27272727272728,
227.27272727272728: E5^227.27272727272728 + E4^227.27272727272728 + G4~227.27272727272728,
227.27272727272728: B4~227.27272727272728,
227.27272727272728: D4^227.27272727272728 + G5^227.27272727272728,
227.27272727272728: F5~227.27272727272728 + G4~227.27272727272728 + F4^227.27272727272728,
227.27272727272728: D5^227.27272727272728,
227.27272727272728: G4~227.27272727272728,
227.27272727272728: F4^227.27272727272728 + B4~227.27272727272728,
227.27272727272728: A4~227.27272727272728 + F5^227.27272727272728,
227.27272727272728: E5~227.27272727272728 + F4~227.27272727272728,
227.27272727272728: B4~227.27272727272728 + C5~227.27272727272728,
227.27272727272728: D4~227.27272727272728 + C5^227.27272727272728,
227.27272727272728: F4^227.27272727272728 + A5^227.27272727272728,
227.27272727272728: A4~227.27272727272728 + E5^227.27272727272728 + D4^227.27272727272728,
227.27272727272728: G5~227.27272727272728 + E4^227.27272727272728,
227.27272727272728: D5^227.27272727272728 + C5^227.27272727272728,
227.27272727272728: B4^227.27272727272728,
227.27272727272728: A4~227.27272727272728 + F5~227.27272727272728,
227.27272727272728: F5^227.27272727272728 + E4^227.27272727272728,
227.27272727272728: A4~227.27272727272728 + F5~227.27272727272728 + B4^227.27272727272728 + E4^227.27272727272728,
227.27272727272728: G5~227.27272727272728,
227.27272727272728: E4~227.27272727272728 + B4^227.27272727272728 + D4^227.27272727272728,
227.27272727272728: D4~227.27272727272728`;


// 3. Trigger music when the player starts the game
onInput("i", () => {
  clearText()
  if (music) music.end()                      // NEW: stop the old music so copies don't pile up
  music = playTune(backgroundMusic, Infinity) // CHANGED: save the playing music in "music"
  currentlevel = 1
  resetGuards()                               // NEW: reset guard directions/steps for a fresh start
  setMap(levels[1])
  setBackground(background)                   // NEW: white background under every tile of the game level
})




function movetostart() {
     setMap(levels[0])
     setBackground(startbackground) // NEW: black background for the start screen

addText("Welcome to", { 
  x: 4,
  y: 4,
  color: color`9`

})

addText("Catch the Guard!", { 
  x: 2,
  y: 6,
  color: color`9`

})

    addText("To start, press i", { 
  x: 2,
  y: 9,
  color: color`2`

})

   addText("For help, press j", { 
  x: 2,
  y: 12,
  color: color`2`

})
   }
 
movetostart()

onInput("j", () => {
  clearText()
  if (music) music.end()          // NEW: stop the music when leaving the game for the help screen
  music = null                    // NEW: no music is playing now
  setMap(levels[0])
  setBackground(startbackground)  // NEW: black background for the help screen
  currentlevel = 0
  
  addText("Dodge the guards", { 
  x: 2,
  y: 2,
  color: color`2`})
  
  addText("to reach the door", { 
  x: 2,
  y: 4,
  color: color`2`})

  addText("w: move up", { 
  x: 2,
  y: 6,
  color: color`2`})
  addText("s: move down", { 
  x: 2,
  y: 8,
  color: color`2`})
  
  addText("a: move left", { 
  x: 2,
  y: 10,
  color: color`2`})
  
  addText("d: move right", { 
  x: 2,
  y: 12,
  color: color`2`})

  addText("Press i to start", { 
  x: 2,
  y: 14,
  color: color`2`})
  
})


let dir = 1          // 1 = right, -1 = left
let steps = 2      // steps left in the current stretch
let firstStretch = true  // true only for the opening 2 right

let dir2 = 1          // CHANGED: moved up here so resetGuards() sits next to all guard variables
let steps2 = 1     // CHANGED: moved up here
let firstStretch2 = true  // CHANGED: moved up here; true only for the opening 1 right (comment fixed, it was "2")

function resetGuards() {                    // puts all guards' movement back to the starting pattern
  dir = 1; steps = 2; firstStretch = true   // guard1 starts with 2 steps right
  dir2 = 1; steps2 = 1; firstStretch2 = true // guard2 starts with 1 step right
  dir3 = 1; steps3 = 3                      // NEW: guard3 starts with 3 steps right
  dir4 = -1; steps4 = 3                     // NEW (guard 4): guard4 starts with 3 steps left
}                                // NEW

setInterval(() => {
  if (currentlevel !== 1) return  // do nothing unless the game has started

  const f = getFirst(guard1)      // find the guard
  if (!f) return                  // stop if it is not on the map

  f.x += dir                      // move one tile in the current direction
  steps -= 1                      // one step of this stretch is used up

  if (steps === 0) {              // the stretch is finished
    if (firstStretch) {
      firstStretch = false        // the opening 2 right never happens again
      dir = -1                    // turn left
      steps = 3                   // CHANGED: 4 -> 3, the map is only 4 wide (x 0 to 3), so 3 steps goes wall to wall
    } else {
      dir = -dir                  // flip direction: left becomes right, right becomes left
      steps = 3                   // CHANGED: 4 -> 3, so the guard no longer pauses against the wall
    }
  }
}, 500)                          // wait 1 second between steps

setInterval(() => {
  if (currentlevel !== 1) return  // do nothing unless the game has started

  const g = getFirst(guard2)      // find the guard
  if (!g) return                  // stop if it is not on the map

  g.x += dir2                     // move one tile in the current direction
  steps2 -= 1                      // one step of this stretch is used up

  if (steps2 === 0) {              // the stretch is finished
    if (firstStretch2) {
      firstStretch2 = false        // CHANGED (comment only): the opening 1 right never happens again
      dir2 = -1                    // turn left
      steps2 = 3                   // CHANGED: 4 -> 3, wall to wall on a 4-wide map
    } else {
      dir2 = -dir2                  // flip direction: left becomes right, right becomes left
      steps2 = 3                   // CHANGED: 4 -> 3
    }
  }
}, 500)                          // wait 1 second between steps


let dir3 = 1    // NEW: guard3 direction, 1 = right, -1 = left
let steps3 = 3  // NEW: guard3 starts at x=0, so 3 steps right takes it to the right wall



setInterval(() => {                 // NEW: movement loop for guard3
  if (currentlevel !== 1) return    // NEW: do nothing unless the game has started

  const h = getFirst(guard3)        // NEW: find guard3
  if (!h) return                    // NEW: stop if it is not on the map

  h.x += dir3                       // NEW: move one tile in the current direction
  steps3 -= 1                       // NEW: one step of this stretch is used up

  if (steps3 === 0) {               // NEW: the stretch is finished
    dir3 = -dir3                    // NEW: flip direction: right becomes left, left becomes right
    steps3 = 3                      // NEW: wall to wall on the 4-wide map
  }
}, 500)                            // NEW: wait 1 second between steps

let dir4 = -1   // NEW (guard 4): guard4 direction, starts moving left (-1)
let steps4 = 3  // NEW (guard 4): guard4 starts at x=3, so 3 steps left takes it to the left wall

setInterval(() => {                 // NEW (guard 4): movement loop for guard4
  if (currentlevel !== 1) return    // NEW (guard 4): do nothing unless the game has started

  const k = getFirst(guard4)        // NEW (guard 4): find guard4
  if (!k) return                    // NEW (guard 4): stop if it is not on the map

  k.x += dir4                       // NEW (guard 4): move one tile in the current direction
  steps4 -= 1                       // NEW (guard 4): one step of this stretch is used up

  if (steps4 === 0) {               // NEW (guard 4): the stretch is finisheds
    dir4 = -dir4                    // NEW (guard 4): flip direction
    steps4 = 3                      // NEW (guard 4): wall to wall on the 4-wide map
  }
}, 500)                             // NEW (guard 4): wait half a second between steps, same as the others

setInterval(() => { 
if (currentlevel !== 1) return // NEW: only check for getting caught while the game is being played

const guardcaught =
tilesWith(player,guard1).length > 0 || tilesWith(player,guard2).length > 0 || tilesWith(player,guard3).length > 0 ||
tilesWith(player,guard4).length > 0 // CHANGED (guard 4): touching guard4 also loses

/* tilesWith(...) checks which sprites are on the same tile. It returns an array (a list of tiles), not a number.
We have to check the length of that array by adding .length, to determine the no. of collisions. 
*/

if (guardcaught){
setMap(levels[2])
setBackground(startbackground) // NEW: black background for the lose screen
currentlevel = 2
addText("You Lose!", { 
  x: 6,
  y: 4,
  color: color`9`
  })

  addText("To start again,", { 
  x: 3,
  y: 8,
  color: color`9`
  })

  addText("press i", { 
  x: 6,
  y: 10,
  color: color`9`
  })
  
}
}, 100)

afterInput(() => {
  if (currentlevel !== 1) return                 
  if (tilesWith(player, door).length > 0) {      
    setMap(levels[2])
    setBackground(startbackground)               // NEW: black background for the win screen
    addText("You win!", { x: 6, y: 4, color: color`4` })
    addText("If you want to ", { x: 4, y: 6, color: color`4` })
    addText("play again ", { x: 4, y: 8, color: color`4` })    
    addText("Press i ", { x: 6, y: 12, color: color`4` })
    currentlevel = 2                            
  }
})