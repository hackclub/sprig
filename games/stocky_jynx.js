/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const button = "b"
const boundary = "w"
const melody = tune`
187.5: C4-187.5 + B5^187.5,
187.5: C4-187.5 + B5^187.5 + F5/187.5 + E5/187.5,
187.5: C4-187.5 + A5^187.5 + E5/187.5 + D5/187.5 + C5/187.5,
187.5: D4-187.5 + A5^187.5 + B4/187.5,
187.5: D4-187.5 + A5^187.5 + A4/187.5 + G4/187.5 + F4/187.5,
187.5: D4-187.5 + G5^187.5 + F4/187.5,
187.5: D4-187.5 + E4-187.5 + G5^187.5 + F4/187.5 + G4/187.5,
187.5: E4-187.5 + G5^187.5 + B4/187.5 + A4/187.5,
187.5: E4-187.5 + F5^187.5 + A4/187.5 + B5^187.5,
187.5: E4-187.5 + F5^187.5 + G4/187.5 + B5^187.5,
187.5: E4-187.5 + F4/187.5 + F5^187.5 + B5^187.5,
187.5: F4/187.5 + E5^187.5 + B5^187.5,
187.5: F4-187.5 + E5^187.5 + E4/187.5 + B5^187.5,
187.5: F4-187.5 + D5^187.5 + E4/187.5 + B5^187.5,
187.5: F4/187.5 + G4/187.5 + D5^187.5 + E4/187.5 + B5^187.5,
187.5: G4/187.5 + D5^187.5 + C5^187.5 + B5^187.5,
187.5: G4/187.5 + C5^187.5 + B4^187.5 + B5^187.5,
187.5: G4/187.5 + B4^187.5 + F4/187.5 + B5^187.5,
187.5: G4-187.5 + A4^187.5 + B4^187.5 + F4/187.5 + B5^187.5,
187.5: A4^187.5 + B5^187.5,
187.5: A4^187.5 + G4^187.5 + A5^187.5,
187.5: A4-187.5 + B4-187.5 + G4^187.5 + G5/187.5,
187.5: B4-187.5 + F4^187.5 + A5/187.5,
187.5: B4-187.5 + C5-187.5 + F4^187.5 + E4^187.5 + A5/187.5,
187.5: C5-187.5 + E4^187.5 + A5/187.5,
187.5: C5-187.5 + E4^187.5 + D4^187.5 + A5/187.5,
187.5: C5-187.5 + D4^187.5 + A5/187.5 + G5/187.5 + F5/187.5,
187.5: D4^187.5 + C4^187.5 + F5/187.5 + E5/187.5 + D5/187.5,
187.5: C4^187.5 + D5/187.5 + C5/187.5 + B4/187.5 + B5^187.5,
187.5: B4/187.5 + A4/187.5 + B5^187.5,
187.5: A4/187.5 + G4^187.5 + F4^187.5 + E4^187.5 + B5^187.5,
187.5: G4^187.5 + E4^187.5 + D4^187.5`

setLegend(
  [ player, bitmap`
................
................
................
................
................
.....00000......
.....03330......
.....00000......
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
................
................` ],
  [ button, bitmap`
................
................
................
................
....00000000....
...0033333300...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0033333300...
....00000000....
................
................
................
................` ],
  [ boundary, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setSolids([ boundary, player ])

let level = 0
const levels = [
  map`
...w...
.w.w.w.
.w.w.w.
.w.w.w.
pw...wb`,
  map`
p.........
wwwwwwwww.
bw........
.wwwwwwww.
.w........
.w.wwwwwww
.w........
.wwwwwwww.
.w........
...wwwwwww`,
  map`
ww.......wwww..
p.w.....w....w.
w..w...w..ww..w
.w..w.w..w..w..
..w..w..w....w.
...w...w..w..w.
....w.w..w.w.w.
.....w..w..w.w.
...ww..w...w.w.
..w....w...w.w.
ww..www....w.w.
b..w.......w.w.
www........w...`,
  map`
ww.......wwww...........www
b.w.....w....w......wwww...
w..w...w..ww..wwwwww.....w.
.w..w.w..w..w........wwwww.
..w..w..w....wwwwwwww....w.
...w...w..w..wpw.........w.
....w....w.w.w.w.....w...w.
.....w..w..w.w.w....w.w..w.
...ww..w...w.w.w...w...w.w.
..w....w...w.w.w..w..w..w..
ww..www....w.w.w.w..w.w...w
...w.......w.w.ww..w...www.
www........w.w....w........`,
]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: []
})

const playback = playTune(melody, Infinity)

onInput("s", () => {
  getFirst(player).y += 1
  
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(button).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(button, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
  
})