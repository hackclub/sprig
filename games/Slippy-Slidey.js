/*
@title: Slippy-Slidey
@author: B0redChungus
@tags: []
@addedOn: 2024-09-17
Inspired by "the slippery ice puzzles" in snowdin from Undertale by Toby Fox.
*/


// Setting up Sprite variables
const the_player = "t"
const snow = "s"
const ice = "i"
const unpressed_tile = "u"
const pressed_tile = "p"
const button = "b"
const wall = "w"


// Setting up Sprite bitmaps
setLegend(
  [ the_player, bitmap`
......0000......
....000..000....
..000......000..
..0..........0..
.00...0..0...00.
.0....0..0....0.
00....0..0....00
0..............0
0..0.00..00.0..0
00.0000000000.00
.0..00....00..0.
.00..........00.
..0..........0..
..000......000..
....000..000....
......0000......`],
  [ ice, bitmap`
2277777777777772
2227777777777777
7222777777777777
7722277777755777
7772227777775577
7777222777777577
7777722277777777
7777772227777777
7777777222777777
7777777722277777
7777777772227777
7775777777222777
7775577777722277
7777557777772227
7777777777777222
2777777777777722`],
  [ snow, bitmap`
2222222222272222
2227272222222222
2277722222222722
7775772222222222
2277727272222222
2727222222227222
2222722222222722
2222222722227222
2272222222277722
2227227222775772
2222227722277722
2222277722227272
2222775777222222
2272777722222222
2222227222222727
2222222222222222`],
  [ unpressed_tile, bitmap`
................
................
..33........33..
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
..33........33..
................
................`],
  [ pressed_tile, bitmap`
................
................
............44..
............44..
...........44...
..........444...
..........44....
.........44.....
..44.....44.....
..444...44......
...44...44......
....44.44.......
.....4444.......
......4.........
................
................`],
  [ button, bitmap`
................
................
........LLLL....
.....LLLL11LLL..
...LLL1111111LL.
..LL11111111LLL.
.LL11111111LL1L.
.L1111111LLL11L.
.LLLL11LLL1111L.
.L11LLLL11111LL.
.L1111111111LL..
.L11111111LLL...
.LLLL11LLLL.....
....LLLL........
................
................`],
  [ wall, bitmap`
1LLLL1LLLLL1LLLL
1LLLL1LLLLL1LLLL
1LLLL1LLLLL1LLLL
1111111111111111
LLLL1LLLLL1LLLL1
LLLL1LLLLL1LLLL1
LLLL1LLLLL1LLLL1
1111111111111111
1LLLL1LLLLL1LLLL
1LLLL1LLLLL1LLLL
1LLLL1LLLLL1LLLL
1111111111111111
LLLL1LLLLL1LLLL1
LLLL1LLLLL1LLLL1
LLLL1LLLLL1LLLL1
1111111111111111`]
);


// Setting up levels
const levels = [
  map`
wwwwwwwwww
w........w
w........w
w.t.uu...w
w...uu.b.w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wtiiiiiiuw
wwwwwwwwiw
w......wiw
w......wiw
wwwwwwwwiw
wbiiiiiiuw
wwwwwwwwww`,
  map`
wwwwwwwwww
w.w....w.w
wwtiiiiuww
w.i....i.w
w.i....i.w
wwuiiiibww
w.w....w.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wtiiiiiiuw
wwwwwwwwiw
wuwiuuiiuw
wuiiuuwiuw
wwwwwwwwiw
wbiiiiiiuw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtiiiiiuww
wwwwwwwiww
wuii.wuiuw
wu.wui.iiw
wwwwwwwiiw
wbiiiiiuuw
wwwwwwwwww`,
]


// Setting up first level
let level = 0
setMap(levels[level])
setBackground(snow)
setSolids([ the_player, wall ]);


// I don't feel like typing "getFirst()" every time.
let player = getFirst(the_player)
let level_button = getFirst(button)


// Movement
onInput("a", () => {
  if (!check(ice, ice)) {
    player.x -= 1
    player.speed = [-1, 0]
  }
})

onInput("s", () => {
  if (!check(ice, ice)) {
    player.y += 1
    player.speed = [0, 1]
  }
})

onInput("w", () => {
  if (!check(ice, ice)) {
    player.y -= 1
    player.speed = [0, -1]
  }
})

onInput("d", () => {
  if (!check(ice, ice)) {
    player.x += 1
    player.speed = [1, 0]
  }
})

// Input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  setMap(currentLevel);
  // When the level changes, so do the Sprites
  player = getFirst(the_player)
  level_button = getFirst(button)
});


function check(old_type, new_type) {
  // For each old_type
  for (let old_tile of getAll(old_type)) {
    // Checks if the player is on an old_tile
    if (old_tile.x == player.x && old_tile.y == player.y) {
      // Changes an old_tile to a new_type
      old_tile.type = new_type
      return true
    }
  }
  return false
}


function slip(time_since_slip, slip_duration) {
  // If the player is on an ice tile
  if (check(ice, ice)) {
    // Increases the time since the last slip by the amount of time it should take to slip
    time_since_slip += slip_duration
    // The player slides (but makes sure not to skip the first tile)
    if (time_since_slip / slip_duration != 1) {
      player.x += player.speed[0]
      player.y += player.speed[1]
    }
        
    // Call itself recursively, but the increased time since last slip should delay the 
    // function call by the slip duration. It is rather inconsistent.
    setTimeout(() => slip(time_since_slip, slip_duration), time_since_slip)

    // Failures:
    // setTimeout(function() { slip(time_since_slip, slip_duration); }, time_since_slip);
    // setTimeout(slip(time_since_slip, slip_duration),time_since_slip);
    
  } else {
    // Changes unpressed tiles to pressed ones, if they're stepped on by the player
    check(pressed_tile, unpressed_tile)
    check(unpressed_tile, pressed_tile)

    // If there are no unpressed tiles left, and the player has pushed the button:
    if (!getFirst(unpressed_tile) && level_button.x == player.x && level_button.y == player.y) {
      // Next level
      level += 1
      if (level < levels.length) {
        setMap(levels[level])
      } else {
        addText("You finished all", options = {color: color`4`})
        addText("the levels!", options = {y: 2, color: color`3`})
        addText("Congrats!", options = {y: 4, color: color`4`})
      }
  
      // When the level changes, so do the Sprites
      player = getFirst(the_player)
      level_button = getFirst(button)
    }
  }
}


// Main game loop (check what's changed after player has moved)
afterInput(() => {  
  // Check if ice player is on ice, and slip and slide across it
  slip(0, 200)
})

