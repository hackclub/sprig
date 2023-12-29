const pr = "r"
const pb = "b"
const ball = "x"
const red = "z"
const blue = "y"
const wall = "a"
const teleport = tune`
65.0759219088937: B4~65.0759219088937,
65.0759219088937: C5~65.0759219088937,
65.0759219088937: D5~65.0759219088937,
65.0759219088937: E5~65.0759219088937,
1822.1258134490238`
const red_score = tune`
97.0873786407767,
97.0873786407767: C5-97.0873786407767,
97.0873786407767: C5-97.0873786407767,
97.0873786407767: C5-97.0873786407767,
97.0873786407767: E5-97.0873786407767,
97.0873786407767: E5-97.0873786407767,
97.0873786407767: E5-97.0873786407767,
97.0873786407767: G5-97.0873786407767,
2330.097087378641`
const blue_score = tune`
100: G5-100,
100: G5-100,
100: G5-100,
100: C5-100,
100: C5-100,
100: C5-100,
100: G5-100,
2500`
let red_points = 0
let blue_points = 0
const mid = "0"
let ra = "2"
let ba = "3"

setLegend(
  [ ball, bitmap`
................
................
................
................
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
................
................
................
................` ],
  [ pb, bitmap`
5555555555555555
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5555555555555555` ],
  [ pr, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],
  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ blue, bitmap`
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
5555555555555555` ],
  [ wall, bitmap`
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
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ mid, bitmap`
3333333665555555
3333336666555555
3363366666655655
3363366666655655
3366336666556655
3366633665566655
3366633665566655
3366663665666655
3336666666666555
3333366666655555
3333336666555555
3333333665555555
3333666666665555
3333666666665555
3333666666665555
3666666666666665` ],
  [ ra, bitmap`
................
................
................
...........3....
............3...
.............3..
..............3.
3333333333333333
3333333333333333
..............3.
.............3..
............3...
...........3....
................
................
................` ],
  [ ba, bitmap`
................
................
................
....5...........
...5............
..5.............
.5..............
5555555555555555
5555555555555555
.5..............
..5.............
...5............
....5...........
................
................
................` ]
);

//setting up walls
setSolids([ball, pr, pb,])

//setting up map
let level = 0
const levels = [ map`
aaaaaaaaaaaaa
z...........y
z...........y
z...........y
z..r..x..b..y
z...........y
z...........y
z...........y
aaaaaaaaaaaaa
2.....0.....3`]
setMap(levels[level])

//setting objects
setPushables({
  [pr]: [ball],
  [pb]: [ball]
})

//player controls
onInput("s", () => {
  getFirst(pr).y += 1
})

onInput("w", () => {
  getFirst(pr).y -= 1
})
onInput("a", () => {
  getFirst(pr).x -= 1
})
onInput("d", () => {
  getFirst(pr).x += 1
})

onInput("k", () => {
  getFirst(pb).y += 1
})
onInput("i", () => {
  getFirst(pb).y -= 1
})
onInput("j", () => {
  getFirst(pb).x -= 1
})
onInput("l", () => {
  getFirst(pb).x += 1
})

afterInput(() => {
  if (getFirst(ball).x === 0) {
    playTune(blue_score)
    setMap(levels[level])
    blue_points += 1
    getFirst(ba).x -= blue_points
    getFirst(ra).x += red_points
    if(blue_points === 5){
      addText(`Blue Wins!`, {
      y: 5,
      x: 6,
      color: color`5`
      });
      addText(`red score 
on yourself
to rematch`, {
      y: 8,
      x: 2,
      color: color`D`
      });
    }
    if (blue_points === 6) {
      red_points -= red_points
      blue_points -= blue_points
      clearText()
      setMap(levels[0])
    }
  }
  if (getFirst(ball).x === 12) {
    playTune(red_score)
    setMap(levels[level])
    red_points += 1
    getFirst(ra).x += red_points
    getFirst(ba).x -= blue_points
    if(red_points === 5){
      addText(`Red Wins!`, {
      y: 5,
      x: 6,
      color: color`3`
      });
      addText(`blue score 
on yourself
to rematch`, {
      y: 8,
      x: 2,
      color: color`D`
      });
    }
    if (red_points === 6) {
      red_points -= red_points
      blue_points -= blue_points
      clearText()
      setMap(levels[0])
    }
    }
  
  if (getFirst(ball).y === 0) {
    getFirst(ball).y = 6
  }
  if (getFirst(ball).y === 8) {
    getFirst(ball).y = 2
  }
  
  if (getFirst(pr).y === 0) {
    playTune(teleport)
    getFirst(pr).y = 7
  }
  if (getFirst(pr).y === 8) {
    playTune(teleport)
    getFirst(pr).y = 1
  }
  if (getFirst(pb).y === 0) {
    playTune(teleport)
    getFirst(pb).y = 7
  }
  if (getFirst(pb).y === 8) {
    playTune(teleport)
    getFirst(pb).y = 1
  }
  
  if (getFirst(pr).x === 0) {
    playTune(teleport)
    if(getFirst(ball).x === 11){
      if(getFirst(ball).y === getFirst(pr).y){
      getFirst(ball).x -= 1
      }
    }
    getFirst(pr).x = 11
  }
  
  if (getFirst(pr).x === 12) {
    playTune(teleport)
    if(getFirst(ball).x === 1){
      if(getFirst(ball).y === getFirst(pr).y){
      getFirst(ball).x += 1
      }
    }
    getFirst(pr).x = 1
  }

  if (getFirst(pb).x === 0) {
    playTune(teleport)
    if(getFirst(ball).x === 11){
      if(getFirst(ball).y === getFirst(pb).y){
      getFirst(ball).x -= 1
      }
    }
    getFirst(pb).x = 11
  }
  
  if (getFirst(pb).x === 12) {
    playTune(teleport)
    if(getFirst(ball).x === 1){
      if(getFirst(ball).y === getFirst(pb).y){
      getFirst(ball).x += 1
      }
    }
    getFirst(pb).x = 1
  }
})
