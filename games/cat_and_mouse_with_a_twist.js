/*
@title: Cat and Mouse with a Twist
@author: Vincent Villarreal
@tags: []
@img: ""
@addedOn: 2024-05-29
*/



// Your goal is to the kill the mouse




const cat = "c"
const mouse = "m"
const dog = "d"
const spaceman = "h"
const spaceship = "s"
const melody = tune`
150.7537688442211,
150.7537688442211: C4~150.7537688442211,
301.5075376884422,
150.7537688442211: E4~150.7537688442211,
150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: A4~150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: C4~150.7537688442211,
301.5075376884422,
150.7537688442211: E4~150.7537688442211,
150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: A4~150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: C4~150.7537688442211,
301.5075376884422,
150.7537688442211: E4~150.7537688442211,
150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: A4~150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: C4~150.7537688442211,
301.5075376884422,
150.7537688442211: E4~150.7537688442211,
150.7537688442211,
150.7537688442211: G4~150.7537688442211,
150.7537688442211: A4~150.7537688442211`
const purpledude = "p"
const cheese = "f"
const playback = playTune(melody, Infinity)


setLegend(
  [ cat, bitmap`
......9999...99.
......99.99999.1
99.....1999..991
9.9....91.0.0.19
9..9...111...111
9..9....19000.1.
.9.9...1.99..991
.9.99999999999..
..99........9...
...9........9...
...9........9...
...9999999999...
...9.9....9.9...
...9.9....9.9...
...9.9....9.9...
................` ],
  [mouse, bitmap`
...........111..
.....1111111.1..
.....1...11111..
.....1..11...1..
.....1111.0.01..
.......1.....1..
....11111..888..
..11....11...1..
.11......1..11..
.1.......1111...
.1........1.....
.1........1.....
11111111111.....
.1..1..1..1.....
.11.11.11.111...
................`], 
  [dog, bitmap`
..........C000C.
..........CC00C.
...........C00C.
.CCC000CCC00CCC.
C0CCCC0CC00CCC..
C0CC200CC002CC..
C0CC200CC002CC..
C0CC222CC222CC..
C0CCCCCCCCCCCC..
C0CCCC0000CCC...
C0CCCC0000CCC...
CCCCCC0000CCC...
...CCCC00CCCC...
....CCCCCCCC....
....CC0000CC....
.....CCCCCC.....`],
  [spaceman, bitmap`
..DDDDDDDDDDDD..
.DDDDDDDDDDDDDD.
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D66DDDDDDDDDD66D
D666DDDDDDDD666D
D6666DDDDDD6666D
D66666666666666D
D66666666666666D
D66666666666666D
DD666666666666DD
DDDD66666666DDDD
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDD..
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [spaceship, bitmap`
.....444444.....
....44444444....
....44444444....
....44444444....
...1444444441...
.11144444444111.
1111444444441111
1111444444441111
1111144444411111
1111111111111111
.11111111111111.
...1111111111...
...6666666666...
..666666666666..
.66666666666666.
6666666666666666`],
  [purpledude, bitmap`
................
................
......HHHHHH....
.....HH00H00H...
.....HHHHHHHH...
.....HH0000HH...
.HHHHHHH00HHH...
.HHHHHHHHHHH....
.HHHHHH.........
.HHHHHH.........
.HHHHHHHHH......
.HHHHHH.........
.HHHHHHHHHHHH...
.HH..HH.........
.HH..HH.........
.HH..HH.........
.HH..HH.........
HHHHHHHH........`],
  [cheese, bitmap`
................
..66666666......
..666666666.....
..666666666.....
..6666666666....
..6666666666....
..66666666666...
..66666666666...
..666666666666..
..666666666666..
..666666666666..
....6666666666..
.......6666666..
...........666..
................
................`]
)

setSolids([cat,dog, spaceman, cheese])

let level = 0
const levels = [
  map`
......d...d.dddd.d..................
..d..dddd.....dddddd....dd.dd.ddd..d
..ddd.d.d..d.d..ddd.ddd.dddd.d.dddd.
..d.ddd.d.dd.ddddd.dd..dddd.d...dd..
......d....d..d....dddddd.d...dddd..
dddddddd..dddddddd..d.d....d.ddd.d.p
dd.............d...d......dd.dd.....
.dddd.ddddd.d...ddd..d.d....d...dddd
.d..d.....d.dd...dd.....d..dd.......
.d..ddddd.d..dd...dd..d..dd..d.dd...
........d.d...ddd.......ddd.dd.d..dd
.dddddd.d.......dd...d.d.dd....d.dd.
........d.dd.....ddd..dd.d.d.dd..d.d
.dd.ddd.d.dddd.....dd.d......dd.dd.d
..d...ddd.d..dddd...dd...ddd....dd..
c.d.......d.....d........d.......d..`,
  map`
..h.h......h...h....h..h..h.
.h...h.h.h...h...h...h...h.s
c..h...h...h...h.h.h...h....`,
  map`
.ff.f....
c...ffffm
.ff.f....`
  
]

setMap(levels[level])

setPushables({
  [ cat ]: [cheese]
})

onInput("s", () => {
  getFirst(cat).y += 1
})

onInput("w", () => {
  getFirst(cat).y -= 1
  
})

onInput("a", () => {
  getFirst(cat).x -= 1
 
  
})

onInput("d", () => {
  getFirst(cat).x += 1
  
  
})

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(purpledude).length;
  const targetNumber2 = tilesWith(spaceship).length;
  const targetNumber3 = tilesWith(mouse).length
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(purpledude, cat).length;
  const numberCovered2 = tilesWith(spaceship, cat).length;
  const numberCovered3 = tilesWith(mouse, cat).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level



    if (numberCovered3 === targetNumber3 && level === 2) {
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

  
  else if(numberCovered2 === targetNumber2 && level === 1 ){
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
    else if (numberCovered === targetNumber && level === 0) {
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
