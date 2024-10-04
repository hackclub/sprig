/*
@title: DVD logo Simulator
@author: the456gamer
@tags: ['endless','simulation']
@addedOn: 2022-12-18

hit run, enjoy.
J -> restart from random position

*/


const map_width = 10 // size of board, anything above 10x8 gets automatically scaled
const map_height = 8
const wait_ms = 200 // time between automatic moves
const hitshow_ms = 2000 // time before the text saying you hit a corner (and on what move) disapears. setting to 0 should disable it

const dvd_colours = [color`3`,color`7`,color`6`,color`4`] // what colours are used when hitting walls

const DVD = "V";
const BG = "o"



var colour_index = 0

function get_current_colour() {
  return dvd_colours[colour_index]
}

function get_next_colour() {
  colour_index = (colour_index + 1) % dvd_colours.length
  return get_current_colour()
}



const dvd_icon = bitmap`
.00..0...0.00...
.0.0.0...0.0.0..
.0.0.0...0.0.0..
.0.0..0.0..0.0..
.0.0..0.0..0.0..
.00....0...00...
................
................
0.0.0.00..00.000
0.0.0.0.0.0..0.0
0.0.0.0.0.00.0.0
0.0.0.0.0.0..0.0
.0..0.00..00.000
`

function update_legend() {
  setLegend(
  [ DVD, dvd_icon.replaceAll("0",get_current_colour())],
  [ BG, bitmap`0000000000000000
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
);
}

update_legend()
setSolids([]);

var map = (".".repeat(map_width)+"\n").repeat(map_height).trim()





setBackground(BG)


var velocity = [1,1]

function update() {
  
  var dvd = getFirst(DVD)
  var dvd_current_pos = [dvd.x, dvd.y]
  var dvd_next_pos = [dvd.x + velocity[0], dvd.y + velocity[1]]
  var wrap = check_pos(dvd_next_pos[0], dvd_next_pos[1])
  // console.log("velocity b4 wrap", velocity[0],velocity[1])
  if ((wrap[0] == 0) && (wrap[1] == 0)) {
    // console.log("run0")
    // normal movement

  } else if ((wrap[0] == 1) && (wrap[1] == 0)) {
    // console.log("run1")
    // hit left or right
    velocity = [-velocity[0], velocity[1]]
    dvd_next_pos = [dvd.x+velocity[0], dvd.y + velocity[1]]
    get_next_colour()
    
  } else if ((wrap[0] == 0) && (wrap[1] == 1)) {
    // console.log("run2")
    // hit top or bottom
    velocity = [velocity[0], -velocity[1]]
    dvd_next_pos = [dvd.x+velocity[0], dvd.y + velocity[1]]
    get_next_colour()
  
  } else if ((wrap[0] == 1) && (wrap[1] == 1)) {
    // console.log("run3")
    // hit corner 🎉
    velocity = [-velocity[0],-velocity[1]]
    dvd_next_pos = [dvd.x+velocity[0], dvd.y + velocity[1]]
    get_next_colour()
    get_next_colour()
    
    addText("corner @ move "+moves.toString(), {y: Math.floor(map_height / 2),color: color`9`})
    setTimeout(clearText, hitshow_ms)
  } else {
    // console.log("run4")
    // error
  }
    // console.log("velocity after wrap", velocity[0],velocity[1])
  dvd.x = dvd_next_pos[0]
  dvd.y = dvd_next_pos[1]
  moves++
  update_legend()
}

function check_pos(x_pos, y_pos) {
  var wrap_x = false
  var wrap_y = false
  if ((0 <= x_pos) && (x_pos < map_width)) {
    wrap_x = false
  } else {
    wrap_x = true
  }
  if ((0 <= y_pos) && (y_pos < map_height)) {
    wrap_y = false
  } else {
    wrap_y = true
  }
  // console.log("check_wrap: x=", x_pos, "y=",y_pos,"result", wrap_x, wrap_y)
  return [wrap_x, wrap_y]
}

var intervalID = null

var moves = 0


function restart() {
  if (intervalID != null) {
    clearInterval(intervalID)
  }

  
  colour_index = 0
  update_legend()
  setMap(map)
  var dvd_start_x = 2* Math.floor(Math.random() * (map_width / 2));
  var dvd_start_y = 2* Math.floor(Math.random() * (map_height / 2));
  
  addSprite(dvd_start_x, dvd_start_y, DVD)
  velocity = [Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1]
  moves = 0
  clearText()
  intervalID = setInterval(update, wait_ms);
}

restart()



onInput("j", () => {
  restart()
})



// afterInput(() => {
  
// });
