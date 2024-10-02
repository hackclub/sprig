/*
@title: LaserGuide
@author: Extner
@tags: ['puzzle','action']
@addedOn: 2024-05-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const BACKGROUND = "0"
const EMITTER = "e"
const WALL = "w"
const TARGET = "t"
const SELECTOR = "s"

const LASER_H = "h"
const LASER_V = "v"

const MIRROR_NE = "1"
const MIRROR_SE = "2"
const MIRROR_SW = "3"
const MIRROR_NW = "4"
const MIRROR_DIRS = [MIRROR_NE, MIRROR_SE, MIRROR_SW, MIRROR_NW]

const MIRROR_NE_A = "5"
const MIRROR_SE_A = "6"
const MIRROR_SW_A = "7"
const MIRROR_NW_A = "8"
const MIRROR_A_DIRS = [MIRROR_NE_A, MIRROR_SE_A, MIRROR_SW_A, MIRROR_NW_A]

const MAP_W = 9
const MAP_H = 9

let selector_pos = [0, 0]
let selector_idx = 0

const tune_mirror = tune`
64.23982869379014,
64.23982869379014: C4-64.23982869379014 + D4-64.23982869379014 + E4-64.23982869379014,
64.23982869379014: C4/64.23982869379014 + D4/64.23982869379014 + E4/64.23982869379014,
1862.9550321199142`
const tune_selector = tune`
83.33333333333333,
83.33333333333333: F4-83.33333333333333 + E4-83.33333333333333 + D4-83.33333333333333 + C4-83.33333333333333,
2500`
const tune_finish = tune`
62.37006237006237,
62.37006237006237: C4^62.37006237006237 + C5/62.37006237006237 + E4-62.37006237006237,
62.37006237006237: D4^62.37006237006237 + F4-62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D5/62.37006237006237 + G4-62.37006237006237,
62.37006237006237: A4-62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D4^62.37006237006237 + B4-62.37006237006237,
62.37006237006237: C5-62.37006237006237 + D4^62.37006237006237 + E4^62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D4^62.37006237006237 + D5-62.37006237006237 + C5/62.37006237006237,
62.37006237006237: E4^62.37006237006237 + D4^62.37006237006237 + E5-62.37006237006237,
62.37006237006237: D5/62.37006237006237,
1372.1413721413721`



setLegend(
  [BACKGROUND, bitmap`
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
  [EMITTER, bitmap`
222221LLLL122222
2111111111111112
2111111111111112
2111111111111112
2111111111LL1112
11111LLLLLL00000
L1111L1111L00333
L1111L1LL1L00222
L1111L1LL1L00222
L1111L1111L00333
11111LLLLLL00000
2111111111LL1112
2111111111111112
2111111111111112
2111111111111112
222221LLLL122222`],
  [WALL, bitmap`
1111LLLLLLLL1111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1111LLLLLLLL1111`],
  [TARGET, bitmap`
2222211111122222
2111111221111112
2111111221111112
2111132222311112
2111113223111112
1113111331113111
1112311111132111
1222231LL1322221
1222231LL1322221
1112311111132111
1113111331113111
2111113223111112
2111132222311112
2111111221111112
2111111221111112
2222211111122222`],
  [SELECTOR, bitmap`
44444......44444
44444......44444
44............44
44............44
44............44
................
................
................
................
................
................
44............44
44............44
44............44
44444......44444
44444......44444`],

  
  [LASER_H, bitmap`
................
................
................
................
................
................
3333333333333333
2222222222222222
2222222222222222
3333333333333333
................
................
................
................
................
................`],
  [LASER_V, bitmap`
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......
......3223......`],
  

  [MIRROR_NE, bitmap`
12..............
112.............
.112............
..112...........
...112..........
...L112.........
....L112........
....LL112.......
.....LL112......
....LLLL112.....
...L00LLL112....
...L00L.LL112...
....LL....L112..
............112.
.............112
..............11`],
  [MIRROR_SE, bitmap`
..............11
.............112
............112.
....LL....L112..
...L00L.LL112...
...L00LLL112....
....LLLL112.....
.....LL112......
....LL112.......
....L112........
...L112.........
...112..........
..112...........
.112............
112.............
12..............`],
  [MIRROR_SW, bitmap`
11..............
211.............
.211............
..211L....LL....
...211LL.L00L...
....211LLL00L...
.....211LLLL....
......211LL.....
.......211LL....
........211L....
.........211L...
..........211...
...........211..
............211.
.............211
..............21`],
  [MIRROR_NW, bitmap`
..............21
.............211
............211.
...........211..
..........211...
.........211L...
........211L....
.......211LL....
......211LL.....
.....211LLLL....
....211LLL00L...
...211LL.L00L...
..211L....LL....
.211............
211.............
11..............`],

  [MIRROR_NE_A, bitmap`
12....3223......
112...3223......
.112..3223......
..112.3223......
...1123223......
...L112223......
....L11223333333
....LL1122222222
.....LL112222222
....LLLL11233333
...L00LLL112....
...L00L.LL112...
....LL....L112..
............112.
.............112
..............11`],
  [MIRROR_SE_A, bitmap`
..............11
.............112
............112.
....LL....L112..
...L00L.LL112...
...L00LLL112....
....LLLL11233333
.....LL112222222
....LL1122222222
....L11223333333
...L112223......
...1123223......
..112.3223......
.112..3223......
112...3223......
12....3223......`],
  [MIRROR_SW_A, bitmap`
11..............
211.............
.211............
..211L....LL....
...211LL.L00L...
....211LLL00L...
33333211LLLL....
222222211LL.....
2222222211LL....
33333332211L....
......322211L...
......3223211...
......3223.211..
......3223..211.
......3223...211
......3223....21`],
  [MIRROR_NW_A, bitmap`
......3223....21
......3223...211
......3223..211.
......3223.211..
......3223211...
......322211L...
33333332211L....
2222222211LL....
222222211LL.....
33333211LLLL....
....211LLL00L...
...211LL.L00L...
..211L....LL....
.211............
211.............
11..............`]
)



function in_bounds(val, lower, upper) {
  if (val < lower) {return false}
  if (val > upper) {return false}
  return true
}

function equal_arr(arr1, arr2) {
  if (arr1.length != arr2.length){return false}
  let thruths = 0
  for (let i=0; i<arr1.length; i++){
    if (arr1[i] == arr2[i]){thruths++}
  }
  return thruths == arr1.length
}

function in_vector_arr(val, arr) {
  //[1, 2] == [1, 2] is apparently FALSE FOR SOME REASON (this took so long to debug)
  for (let i=0; i<arr.length; i++) {
    if (equal_arr(val, arr[i])) {return true}
  }
  return false
}

function deepcopy_arr(arr) {
  let new_arr = []
  for (let i=0; i<arr.length; i++) {
    new_arr.push(arr[i])
  }

  return new_arr
}

function mirror_dir(mirror_name) {
  switch(mirror_name){
    case MIRROR_NE:
      return 0
    case MIRROR_SE:
      return 1
    case MIRROR_SW:
      return 2
    case MIRROR_NW:
      return 3
    default:
      return -1

  }
}

function set_selector(idx) {
  selector_pos = maps[current_map].mirror_positions[idx]
}

function get_selected_mirror() {
  return maps[current_map].mirrors[selector_idx]
}

function clear_all() {
  for (let y=0; y<MAP_H; y++){
    for (let x=0; x<MAP_W; x++){
      clearTile(x, y)
    }
  }
}

function finish_level() {
  playTune(tune_finish)
  current_map += 1
  selector_idx = 0
  set_selector(selector_idx)

  addText("Press L to \ncontinue", { 
      x: 5,
      y: 4,
      color: color`2`
  })
  
  
  if (current_map >= (maps.length)) {
    current_map = (maps.length -1)
    addText("You did it! \n thanks for \n playing!", { 
      x: 5,
      y: 4,
      color: color`2`
    })
  }
}

class Emitter {
  constructor(pos, mirrors, solid_positions, target) {
    this.pos = pos
    this.mirrors = mirrors
    this.solid_positions = solid_positions
    this.target = target
  }

  render_laser(pos, dir){
    if (dir[0] != 0) {
      addSprite(pos[0], pos[1], LASER_H)
      return
    }
    if (dir[1] != 0) {
      addSprite(pos[0], pos[1], LASER_V)
      return
    }
  }

  activate_mirror(pos) {
    let result = null
    
    for (let i=0; i<this.mirrors.length; i++) {
      if (equal_arr(this.mirrors[i].pos, pos)) {
        result = this.mirrors[i]
      }
      
    }

    return result
  }

  new_laser_dir(mirror_dir, laser_dir) {
    //this is such a horrible mess
    
    if (mirror_dir == 0) {
        if (equal_arr(laser_dir, [0, 1])) {return [1, 0]}
        if (equal_arr(laser_dir, [-1, 0])) {return [0, -1]}
        else{return [0, 0]}
    }
    else if (mirror_dir == 1) {
        if (equal_arr(laser_dir, [0, -1])) {return [1, 0]}
        if (equal_arr(laser_dir, [-1, 0])) {return [0, 1]}
        else{return [0, 0]}
    }
    else if (mirror_dir == 2) {
        if (equal_arr(laser_dir, [0, -1])) {return [-1, 0]}
        if (equal_arr(laser_dir, [1, 0])) {return [0, 1]}
        else{return [0, 0]}
    }
    else if (mirror_dir == 3) {
        if (equal_arr(laser_dir, [1, 0])) {return [0, -1]}
        if (equal_arr(laser_dir, [0, 1])) {return [-1, 0]}
        else{return [0, 0]}
    }
  }

  render() {
    addSprite(this.pos[0], this.pos[1], EMITTER)
    
    //laser drawing and path calculation
    let laser_dir = [1, 0]
    let laser_pos = deepcopy_arr(this.pos)

    laser_pos[0] += laser_dir[0]
    laser_pos[1] += laser_dir[1]
    
    
    while (true) {
      
      if ((!in_bounds(laser_pos[0], 0, MAP_W-1) || !in_bounds(laser_pos[1], 0, MAP_H-1))) {
        break
      }

      if (in_vector_arr(laser_pos, this.solid_positions)) {
        break
      }

      if (equal_arr(laser_pos ,this.target.pos)) {
        finish_level()
        break
        
      }

      let current_mirror = this.activate_mirror(laser_pos)
      

      if (current_mirror != null) {
        let new_dir = this.new_laser_dir(current_mirror.dir, laser_dir)
        if (equal_arr(new_dir, [0, 0])) {break}
        laser_dir = new_dir
        current_mirror.active = true
      }
      else {
        this.render_laser(laser_pos, laser_dir)
      }

      laser_pos[0] += laser_dir[0]
      laser_pos[1] += laser_dir[1]
      
    }
    
  }

  
}

class Target {
  constructor(pos) {
    this.pos = pos
  }

  render() {
    addSprite(this.pos[0], this.pos[1], TARGET)
  }
}

class Mirror {
  constructor(pos, dir) {
    this.pos = pos
    this.dir = dir
    this.active = false
  }

  render() {

    if (this.active) {
      addSprite(this.pos[0], this.pos[1], MIRROR_A_DIRS[this.dir])
    }
    else {
      addSprite(this.pos[0], this.pos[1], MIRROR_DIRS[this.dir])
    }
  }
}

class Map {
  constructor(original_map_data) {
    
    this.original_map_data = original_map_data.replace(/\n|\r/g, "");
    this.map_data = ""
    
    this.mirrors = []
    this.mirror_positions = []
    this.solid_positions = []
    this.target = null

    this.emitter_pos = [0, 0]
      
    for (let y=0; y<MAP_H; y++){
      for (let x=0; x<MAP_W; x++){
        let char = this.original_map_data.charAt(x + y*MAP_W)
        let new_char = "."

        //mirrors
        let dir = mirror_dir(char)
        if (dir != -1) {
          this.mirror_positions.push([x, y])
          this.mirrors.push(new Mirror([x, y], dir))
        }

        //walls
        else if (char == WALL) {
          this.solid_positions.push([x, y])
          new_char = WALL
          
        }

        //emitter
        else if (char == EMITTER) {
          this.emitter_pos = [x, y]
          this.solid_positions.push([x, y])
          
        }

        //target
        else if (char == TARGET) {
          this.target = new Target([x, y])
        }

        this.map_data += new_char
            
      }
      this.map_data += "\n"
    }

    this.map_data = eval("map`"+this.map_data+"`")
    
    
    this.emitter = new Emitter(this.emitter_pos, this.mirrors, this.solid_positions, this.target)
    
  }

  render() {
    setMap(this.map_data)
    for (let i=0; i<this.mirrors.length; i++) {
      this.mirrors[i].active = false
    }
    
    this.emitter.render()
    this.target.render()
    
    for (let i=0; i<this.mirrors.length; i++) {
      this.mirrors[i].render()
    }

    addSprite(selector_pos[0], selector_pos[1], SELECTOR)

  }
}

let current_map = 0
const maps = [
  new Map(map`
e.......2
.........
.........
.........
.........
.........
.........
.........
........t`),
  new Map(map`
.........
....e...2
.........
.........
.........
.........
.........
....t...2
.........`),
  new Map(map`
.........
.........
.........
.........
1..t.e..2
.........
.........
.........
4.......4`),
  new Map(map`
.........
.2.2w2.2.
.........
.........
e..3.3..t
.........
.3.3w3.3.
.........
.3.....3.`),
  new Map(map`
.........
.3....2..
.........
.2.2.....
.w..e.2..
.........
.t.......
.........
.3.3.w3..`),
  new Map(map`
.........
.3..t....
.........
....w....
e...2....
.........
.3.....3.
.........
....3..3.`),
  new Map(map`
e..3w3..t
.........
.........
.....3..3
3.....3..
.........
.........
...3..3..
3.......3`),
  new Map(map`
...w.2..2
.www..ww.
.2.......
w...w2.2.
e2wwwww.t
w...w2.2.
.2.2w...w
.w..w.ww.
.w.2.2..3`),
  new Map(map`
442323223
.........
.........
4.......4
e2......t
.........
.........
........w
.14143223`),
  new Map(map`
22.222..2
....w....
..2...2..
...2.2...
e.2.2...t
.....2...
......2..
.22......
2...2w..2`)
]



setBackground(BACKGROUND)
set_selector(0)
maps[current_map].render()

addText("  Use j and l\n    to move.\nUse k to rotate\n    mirrors.", { 
  x: 2,
  y: 4,
  color: color`2`
})


onInput("l", () => {
  selector_idx += 1
  if (selector_idx > (maps[current_map].mirror_positions.length-1)) {
    selector_idx = 0
  }
  set_selector(selector_idx)
  playTune(tune_selector)
})

onInput("j", () => {
  selector_idx -= 1
  if (selector_idx < 0) {
    selector_idx = (maps[current_map].mirror_positions.length-1)
  }
  set_selector(selector_idx)
  playTune(tune_selector)
})

onInput("k", () => {
  let mirror = get_selected_mirror()
  mirror.dir += 1
  if (mirror.dir > (MIRROR_DIRS.length - 1)) {
    mirror.dir = 0
  }
  playTune(tune_mirror)
})

afterInput(() => {

  clearText()
  for (let y=0; y<MAP_H; y++){
    for (let x=0; x<MAP_W; x++){
      clearTile(x, y)
    }
  }
  
  maps[current_map].render()
})
