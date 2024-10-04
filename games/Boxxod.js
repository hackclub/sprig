/*
@title: Boxxod
@author: Kokonico
@tags: ['puzzle']
@addedOn: 2023-10-20

a game about gravity and boxes.

  think different.

*/

const music_empty = tune`
16000`

const player = "p"
const goal = "g"
const block = "b"
const log = "l"
const anchor = "a"
const caught = "c"
const barrierblock = "h"
const playerblock = "x"
const invisiblock = "v"


const a_u = "j"
const a_d = "k"
const a_l = "i"
const a_r = "o"

var gravity = 1
var axis = "x"

var map_id = 0

var turns = 0

var total_turns = 0

var playing = false

var music = playTune(music_empty)

var gdir

// SFX



const ground_hit = tune`
37.5: E4/37.5 + G4-37.5 + F4-37.5,
37.5: G4/37.5 + F4/37.5 + E4-37.5,
1125`
const beat_level = tune`
500: F4~500,
500: C5/500 + E5/500,
15000`

// MUSIC

const win_beat = tune`
500: C4/500,
500: E4/500,
500: C4/500,
500: E4/500,
500,
500: E4-500 + D4/500,
500: D4-500 + G4-500 + F4/500,
500: F4-500,
500: D4-500,
500: F4-500,
500,
500: F4-500 + E4/500,
500: A4-500 + G4/500,
500: G4~500,
500: B4~500,
500: G4~500,
500: B4~500,
500,
500: B4-500 + A4/500,
500: D5-500 + C5/500,
500: C5^500,
500: E5^500,
500: C5^500,
500: E5^500,
500,
500: E5-500 + D5/500,
500: G5-500 + F5/500,
500: A5^500 + F5^500,
500,
500: A5^500 + F5^500,
500: E5^500 + C5^500,
500: F4/500 + A4^500`

// gravity directions

var grav_arrows = [
  bitmap`
................
................
................
................
.......00.......
.......00.......
....0..00..0....
....00.00.00....
.....000000.....
......0000......
.......00.......
................
................
................
................
................`,
  bitmap`
................
................
................
................
................
.......00.......
......0000......
.....000000.....
....00.00.00....
....0..00..0....
.......00.......
.......00.......
................
................
................
................`,
  bitmap`
................
................
................
................
......00........
.......00.......
........00......
....0000000.....
....0000000.....
........00......
.......00.......
......00........
................
................
................
................`,
  bitmap`
................
................
................
................
........00......
.......00.......
......00........
.....0000000....
.....0000000....
......00........
.......00.......
........00......
................
................
................
................`,
]

setLegend(
  [ a_u, grav_arrows[1] ],
  [ a_d, grav_arrows[0] ],
  [ a_l, grav_arrows[3] ],
  [ a_r, grav_arrows[2] ],
  [ goal, bitmap`
DDDDDDDDDDDDDDDD
D44444444444444D
D44444444444444D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44..........44D
D44444444444444D
D44444444444444D
DDDDDDDDDDDDDDDD` ],
  [ player, bitmap`
CCCCCCCCCCCCCCCC
C33333333333333C
C33333333333333C
C33333333333333C
C333CCCCCCCC333C
C333C333333C333C
C333C333333C333C
C333C333333C333C
C333C333333C333C
C333C333333C333C
C333C333333C333C
C333CCCCCCCC333C
C33333333333333C
C33333333333333C
C33333333333333C
CCCCCCCCCCCCCCCC` ],
  [ block, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L111LLLLLLLL111L
L111L111111L111L
L111L111111L111L
L111L111111L111L
L111L111111L111L
L111L111111L111L
L111L111111L111L
L111LLLLLLLL111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ log, bitmap`
..000000000000..
.00000000000000.
00LLLLLLLLLLLL00
00LL00000000LL00
00L0L000000L0L00
00L00L0000L00L00
00L000L00L000L00
00L0000330000L00
00L0000330000L00
00L000L00L000L00
00L00L0000L00L00
00L0L000000L0L00
00LL00000000LL00
00LLLLLLLLLLLL00
.00000000000000.
..000000000000..` ],
  [ invisiblock, bitmap`
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L` ]
)

setSolids([ block, player, log, invisiblock ])

let level = 0
var levels = [
  map`
v..gv
v...v
vp..v`,
  map`
v..gv
v...v
vp.lv`,
  map`
vb..gv
v.l..v
v....v
vp...v`,
  map`
vbb...gv
vb.....v
v......v
vp.....v
v......v
vb...l.v`,
  map`
vbbp..bv
v......v
v......v
v.....bv
v.....lv
vbb...gv`,
  map`
vpb...gv
vbb....v
v......v
v......v
v......v
v.....bv`,
  map`
vpb...bb.v
v...l.bb.v
v..l.....v
vb...l...v
v..lgl..bv
v..l....bv
vl..b...bv
vbb.l..bbv`,
  map`
vp.....v
v......v
v......v
v......v
vl.....v
vgbb...v`,
  map`
v.b.p.bbv
v.b.....v
v...l...v
v...gl..v
v...l...v
vb....bbv
vb....bbv`,
  map`
v....bb....v
v.......b..v
vb.......l.v
vb.........v
v...l......v
v.b........v
v.....bbbbbv
v........b.v
v.......g..v
v.l.p.....lv`,
  map`
v........v
v........v
v........v
v.......pv
vlb......v
v........v
vgl.....bv
v.l.....bv`,
  map`
v....p....v
v.........v
v.........v
v.........v
v.........v
v.........v
v....b....v
v....l....v
vb...g..bbv`,
  map`
vb..b...pv
vb.......v
vb.......v
vg.l.....v
vl......bv
v.......bv
v.......bv
v.bbb...bv`,
  map`
v..b....bv
v..b....bv
v..b....bv
v.......bv
vb...b..bv
v..l.....v
vllp....lv
vgbbbbb..v`,
  map`
..vpb........l..v..
..vbb...........v..
..v.............v..
..v.........bb..v..
..v...ll....bb..v..
..v.............v..
..v.............v..
..v...bb........v..
..v...bb......lbv..
..v............bv..
..v............bv..
..v.........gl.bv..
..v.........l..bv..
..v.l...bbb....bv..`,
  map`
vb...gv
v....lv
vb....v
vp....v
vb..l.v`,
  map`
vp..bbbbv
v.......v
v.......v
v.......v
v...g...v
vb......v
vb..l.bbv
vb....bbv`,
  map`
vl..gl.v
v...l..v
v......v
v......v
v...b.bv
v...p.bv`,
  map`
vb..p..bbv
vb.......v
vb......lv
v......bbv
v...l..bbv
v........v
vll......v
vgbbb...bv`,
  map`
vbbbpbbbv
v......lv
vl......v
v......lv
vl......v
v......lv
vg......v`,
  map`
vb..bb..v
vb..bb..v
v.......v
v.......v
vl......v
v.g.l.bbv
vp..b...v`,
  map`
vb..b..bv
vb..b...v
v...b...v
v...g..pv
v...l..bv
v.......v
vb...bblv`,
]

let blank = map`
g....ll
......l
.......
.......
bb.p..b`


setPushables({
  [ player ]: []
})

// time elapsed

var startElapsed

function start_Elapse() {
  startElapsed = new Date();
}


function getTimeElapsed() {
  return new Date() - startElapsed
}


// your did it function

function beatgame(mapid) {
  return (mapid + 1) >= levels.length
}


// map reset function

function reset_to(mapid) {
  turns = 0
  var realmap = map_id + 1
  clearText()
  addText("" + turns, { x: 1, y: 1, color: color`7`})
  addText("level: " + realmap, { x: 1, y: 15, color: color`6`})
  setMap(levels[mapid]);
}

// map checking function

function saveState() {
  let state = "";

  getAll(block).forEach(b => {
    state += `block:${b.x},${b.y}\n`;
  });

  getAll(player).forEach(p => {
    state += `player:${p.x},${p.y}\n`;
  });

  return state;
}

// move stuff around
function move() {
  var pre_state = saveState()
  if (axis == "y") {
    getAll(block).forEach(p => p.y += gravity);
    getAll(player).forEach(p => p.y += gravity);
    if (gravity > 0) {
      gdir = a_d
    } else {
      gdir = a_u
    }
  } else if (axis == "x") {
    getAll(block).forEach(p => p.x += gravity);
    getAll(player).forEach(p => p.x += gravity);
    if (gravity > 0) {
      gdir = a_r
    } else {
      gdir = a_l
    }
  }
  var post_state = saveState()
  if (pre_state != post_state) {
    move()
  }
}

// check win

function check_win() {
  if (tilesWith(player, goal).length != 0) {
    playTune(beat_level)
    return true
  } else {
    playTune(ground_hit)
    turns += 1
    total_turns += 1
    addText("" + turns, { x: 1, y: 1, color: color`7`})
    return false
  }
}

// gravity function

function setGravity(g_axis, direction) {
  if (playing) {
    gravity = direction;
    axis = g_axis
    move()
    if (check_win()) {
      if (!beatgame(map_id)) {
        map_id += 1
        addText("level: " + map_id + 1, { x: 1, y: 2, color: color`7`})
        reset_to(map_id)
      } else {
          var time = getTimeElapsed()
          playing = false
          music = playTune(win_beat, Infinity)
          addText("you won,\ncongrats!", { x: 5, y: 5, color: color`C`})
          addText("turns: " + total_turns, { x: 5, y: 8, color: color`7`})
          addText("time: " + time, { x: 5, y: 9, color: color`7`})
          addText("press i to restart", { x: 1, y: 11, color: color`C`})
      }
    }
  }
}

// reset game
function total_reset(stop_song) {
  if (!playing) {
    if (stop_song) {
      music.end()
    }
    playing = true
    total_turns = 0
    map_id = 0
    reset_to(0)
    start_Elapse()
  }
}


// MAIN

setMap(blank)
addText("welcome to Boxxod\npress i to start", { x: 2, y: 5, color: color`4`})
addText("move the red cube\nto the green one\nusing WASD", { x: 1, y: 8, color: color`4`})
addText("press 'k' to restart", { x: 0, y: 12, color: color`4`})
addText("level", { x: 8, y: 13, color: color`4`})

onInput("s", () => {
    setGravity("y", 1)
})

onInput("w", () => {
    setGravity("y", -1)
})

onInput("a", () => {
    setGravity("x", -1)
})

onInput("d", () => {
    setGravity("x", 1)
})

onInput("k", () => {
  reset_to(map_id)
})

onInput("i", () => {
    var song = false
  if (beatgame(map_id)) {
    song = true
  }
  total_reset(song)
})

afterInput(() => {
  
});

// addText("" + getTimeElapsed(), { x: 1, y: 2, color: color`7`})