/*
This is my first game. Feel free to remix and add your own drawings (in the levels array)

@title: Redraw
@author: Max
@description: A game where you memorize and redraw motives as best as you can
@tags: ["memory"]
@addedOn: 2026-02-16
*/

function get_width(map){
  return map.substring(1).indexOf("\n")
}
function get_heigth(map){
  return map.replaceAll("\n", "").length / get_width(map)
}
function get_middle(){
  var x = Math.floor((width() - 1) / 2);
  var y = Math.floor((height() - 1) / 2);
  return [x, y];
}
function get_tile(x, y, map){
  return map[y * (get_width(map) + 1) + x + 1]
}

function get_colors(map){
  var chars = [...new Set(map)];
  const index = chars.indexOf("\n");
  chars.splice(index, 1);
  return chars;
}

const cursor =  bitmap`
0003330000333000
0..............0
0..............0
3..............3
3..............3
3..............3
0..............0
0..............0
0..............0
0..............0
3..............3
3..............3
3..............3
0..............0
0..............0
0003330000333000`
function get_cursor(color, invert){
  if (color == null){
    color = "0"
  }
  
  var c = cursor
  if (invert){
    c = cursor.replaceAll("0", "2");
  }
  return c.replaceAll("3", color);
}
function get_default_cursor(invert){
  return get_cursor("0", invert);
}

function update_cursor_inversion(){
  var p = getFirst(player)
  var on_black = getTile(p.x, p.y).some((x) => x.type == "0")

  if(cursor_inverted != on_black){
    cursor_inverted = !cursor_inverted
    set_cursor_color(curr_color);
  }
}
function spawn_cursor_middle_without_update(){
  pos = get_middle(curr_level)
  addSprite(pos[0], pos[1], player)
}
function spawn_cursor(x, y){
  addSprite(x, y, player)
  update_cursor_inversion()
}

const player = "p"
const star_empty = "e"
const star_full = "f"

let cursor_inverted = false // Used if cursor is on black tile

let player_map = [ player, get_default_cursor() ]

function update_legend(){
  setLegend(
    [ star_empty, bitmap`
.......00.......
......0110......
.....011110.....
.....011110.....
0000011111100000
0111111111111110
.01111111111110.
..011111111110..
...0111111110...
...0111111110...
..011111111110..
..011111111110..
.01111000011110.
.01100....00110.
0110........0110
000..........000`],
    [ star_full, bitmap`
.......00.......
......0660......
.....066660.....
.....066660.....
0000066666600000
0666666666666660
.06666666666660.
..066666666660..
...0666666660...
...0666666660...
..066666666660..
..066666666660..
.06666000066660.
.06600....00660.
0660........0660
000..........000`],
    
    player_map,
  
    [ "0", bitmap`
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
0000000000000000` ],
    [ "1", bitmap`
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111` ],
    [ "2", bitmap`
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
2222222222222222` ],
    [ "3", bitmap`
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
    [ "4", bitmap`
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444` ],
    [ "5", bitmap`
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
    [ "6", bitmap`
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
  6666666666666666` ],
    [ "7", bitmap`
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
  7777777777777777` ],
    [ "8", bitmap`
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888
  8888888888888888` ],
    [ "9", bitmap`
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999
  9999999999999999` ],
    [ "C", bitmap`
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
    [ "D", bitmap`
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD` ],
    [ "F", bitmap`
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF` ],
    [ "L", bitmap`
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
  LLLLLLLLLLLLLLLL` ],
    [ "H", bitmap`
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH
  HHHHHHHHHHHHHHHH` ],
  )
}
function set_cursor_color(color){
  player_map = [ player, get_cursor(color, cursor_inverted) ]
  update_legend()
}
function set_default_cursor(){
  set_cursor_color("0")
}

const levels = [
  // 5x5
  map`
02220
22022
22022
02220
20002`, // Face
  map`
67676
76667
66666
76667
67676`, // Sun
  map`
24442
24C42
22C22
22C22
DDDDD`, // Tree
  map`
29992
99999
46633
C6CCC
99999`, // Burger
  map`
77777
76777
7777D
DD7DD
DDDDD`, // Landscape

  // 7x7
  map`
2200022
2200022
0227220
2077702
22CCC22
22C2C22
2202022`, // Person
  map`
2000222
2030222
2000222
2030222
2000002
2030302
2000002`, // L
  map`
1133331
1333331
1333331
1333331
1333331
1322221
1133331`, // Book
  map`
2002002
0230330
0333330
0333390
2033902
2209022
2220222`, // Heart
  map`
7770777
770C077
70CCC07
7000007
70CCC07
70CCC07
DDDDDDD`, // House
  map`
9.....9
C9...9C
C9C9C9C
9999999
9099909
999C999
.99999.`, // Cat
  map`
9111116
C91116C
C99266C
9922266
2022202
2228222
1222221`, // Cat 2
  map`
7227722
7777777
7776777
7766677
766C667
66CCC66
FFFFFFF`, // Pyramid
  map`
9CCDCC9
CCD4DCC
CD464DC
D46664D
CD464DC
CCD4DCC
9CCDCC9`, // Mandala
  
  map`
222C22D22
2222CD222
2233C3322
233333332
233333332
233333332
233333332
223323322`, // Apple (9x8)
  map`
333333333
737737737
737737737
333333333
303333303
020333020
202222202`, // Bus (9x7)
  map`
111LLL111
1LLLLLLL1
112020211
112299211
C1333331C
1C23H22C1
112222211
1122H2211
111222111`, // Snowman (9x9)
]

let colors = []
let color_index = 0
let curr_color = null

function set_color(color){
  curr_color = color
  set_cursor_color(color)
}
function next_color(){
  color_index = (colors.length + color_index + 1) % colors.length
  set_color(colors[color_index])
}
function prev_color(){
  color_index = (colors.length + color_index - 1) % colors.length
  set_color(colors[color_index])
}

function generate_empty_map(){
  return ("2".repeat(width()) + "\n").repeat(height()).slice(0, -1) // Remove last \n
}

const COLORS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "D", "F", "L", "H"] 

// End screen drawing
function evaluate_map(){
  score = 0
  for (y = 0; y < height(); y++){
    for (x = 0; x < width(); x++){
      //console.log("x: ", x, " y: ", y, "Values Length: ", getTile(x,y).length, " T: ", get_tile(x, y, curr_level))
      for (sprite of getTile(x, y)){
        //console.log("Sprite: ", sprite.type)
        if (sprite.type == get_tile(x, y, curr_level)){
          score++
        }
      }
    }
  }
  return score / (height() * width())
}
function draw_stars(score){
  middle = get_middle()

  var star_count;
  if (score < 0.5) {
    star_count = 0
  } else if (score < 0.9) {
    star_count = 1
  } else if (score < 1) {
    star_count = 2
  } else {
    star_count = 3
  }
  
  for(i = 0; i < 3; i++){
    var star = i < star_count ? star_full : star_empty;
    console.log(middle[0] - 1 + i, " ", middle[1], " ", star)
    addSprite(middle[0] - 1 + i, middle[1], star)
  }
}
function show_score(score){
  addText(Math.round(score * 100) + "% !!!", {y: 5, color: color`3`})
}
function show_end_instructions(){
  if (score == 1){
    addText("j: Retry", {y: 14})
    addText("l: Next", {y: 15})
  }
  else {
    addText("j: Retry", {y: 13})
    addText("l: Next", {y: 14})
    if (showing_original){
      addText("i: Show yours", {y: 15})
    }
    else {
      addText("i: Show original", {y: 15})
    }
  }

  if (level == levels.length - 1){ // Reached end
    addText("YOU BEAT", {color: color`4`})
    addText("EVERY LEVEL!!!", {color: color`4`, y: 1})
    addText("HURRAY", {color: color`4`, y: 2})

    addText("j: Retry", {y: 13})
    addText("l: Start over", {y: 14})
    if (showing_original){
      addText("i: Show yours", {y: 15})
    }
    else {
      addText("i: Show original", {y: 15})
    }
    
    return
  }
}
function get_drawing_map(){
  var map = ""
  for(y = 0; y < height(); y++){
    for(x = 0; x < width(); x++){
      for (s of getTile(x, y)){
        if (COLORS.includes(s.type)){
          map = map + s.type
        }
      }
    }
    map = map + "\n"
  }
  console.log(map)
  return map
}
function redraw_ending_screen(){
  clearText()
  show_score(score)
  show_end_instructions()
  draw_stars(score)
}

// End screen actions
function retry(){
  restart()
}
function next_level(){
  level = (level + 1) % levels.length
  restart()
}
function switch_original(){
  if (showing_original){
    setMap(drawing)
    showing_original = false
  }
  else {
    setMap(curr_level)
    showing_original = true
  }

  redraw_ending_screen()
}

const STATE = {
  REMEMBER: "Remembering",
  COLOR: "Coloring",
  RESULTS: "Results"
}
let game_state = STATE.REMEBER

curr_level = null
function load_level(id){
  curr_level = levels[id]
  curr_level = curr_level.replaceAll(".", "2") // Replacing missing ones with white, just in case
  update_legend()
  setMap(curr_level)
  cursor_inverted = get_tile(...get_middle(curr_level), curr_level) == "0"
  set_default_cursor()
  spawn_cursor_middle_without_update()
  colors = get_colors(curr_level)
  game_state = STATE.REMEMBER
  console.log("Colors: ", colors)
}
function start_coloring(){
  var p = getFirst(player)
  setMap(generate_empty_map())
  spawn_cursor(p.x, p.y)
  next_color()
  if (curr_color == "2"){ // We don't want white as first color, as background is already white
    next_color()
  }
  game_state = STATE.COLOR
}

// Variables for end screen
let score = 0
let showing_original = false
let drawing; // map
function finish_coloring(){
  score = evaluate_map()
  console.log("Score: ", score)
  getFirst(player).remove()
  redraw_ending_screen()
  shwing_original = false
  drawing = get_drawing_map()
  game_state = STATE.RESULTS
}

const ASKING_COOLDOWN = 1000

let last_start_ask = 0
let start_timer;
function ask_to_start(){
  let now = Date.now()
  if (now > last_start_ask + ASKING_COOLDOWN){
    addText("Press again to start")
    start_timer = setTimeout(clearText, ASKING_COOLDOWN)
    last_start_ask = now
  } else {
    clearTimeout(start_timer)
    clearText()
    start_coloring()
  }
}
let last_finish_ask = 0
let finish_timer;
function ask_to_finish(){
  let now = Date.now()
  if (now > last_finish_ask + ASKING_COOLDOWN){
    addText("Press again")
    addText("to finish", {y:1})
    finish_timer = setTimeout(clearText, ASKING_COOLDOWN)
    last_finish_ask = now
  } else {
    clearTimeout(finish_timer)
    clearText()
    finish_coloring()
    console.log("finished")
  }
}
function paint(){
  p = getFirst(player)
  clearTile(p.x, p.y)
  addSprite(p.x, p.y, curr_color)
  spawn_cursor(p.x, p.y)
}

let level = 0
function restart(){
  clearText()
  load_level(level)
}

load_level(level)

onInput("w", () => {
  getFirst(player).y -= 1
  update_cursor_inversion()
})
onInput("s", () => {
  getFirst(player).y += 1
  update_cursor_inversion()
})
onInput("a", () => {
  getFirst(player).x -= 1
  update_cursor_inversion()
})
onInput("d", () => {
  getFirst(player).x += 1
  update_cursor_inversion()
})

onInput("j", () => {
  switch(game_state){
    case STATE.REMEMBER:
      ask_to_start();
      break;
    case STATE.COLOR:
      prev_color();
      break;
    case STATE.RESULTS:
      retry();
      break;
  }
})
onInput("l", () => {
  switch(game_state){
    case STATE.REMEMBER:
      ask_to_start();
      break;
    case STATE.COLOR:
      next_color();
      break;
    case STATE.RESULTS:
      next_level();
      break;
  }
})
onInput("i", () => {
  switch(game_state){
    case STATE.REMEMBER:
      ask_to_start();
      break;
    case STATE.COLOR:
      paint()
      break;
    case STATE.RESULTS:
      switch_original()
      break;
  }
})
onInput("k", () => {
  switch(game_state){
    case STATE.REMEMBER:
      ask_to_start();
      break;
    case STATE.COLOR:
      ask_to_finish()
      break;
    case STATE.RESULTS:
      break;
  }
})
