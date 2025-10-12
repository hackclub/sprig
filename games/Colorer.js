/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: TW3DG
@author: n0o0b090lv
@tags: []
@addedOn: 2025-00-00
*/

//defines screen sprites
const q = "q"
const w = "w"
const a = "a"
const s = "s"

//defines canvas 16*32
let canvas = []
for (let x = 0; x < 32; x++){
  let temp_canvas = []
  for (let y = 0; y < 32; y++){
    temp_canvas.push(Math.floor(x/2+y/4))
  }
  canvas.push(temp_canvas)
}
let cursor = [16,16]

function draw(q_pixels, w_pixels, a_pixels, s_pixels) {
  setLegend(
    [q, q_pixels],
    [w, w_pixels],
    [a, a_pixels],
    [s, s_pixels],
  )
  setMap('qw\nas')
}

const color_values = ['0','L','1','2','3','C','7','5','6','F','4','D','8','H','9']
function numToColor(value) {
  return color_values[value % 14]
}

function draw_canvas(canvas){
  let q_pixels = ''
  let w_pixels = ''
  let a_pixels = ''
  let s_pixels = ''
  for (let y = 0; y < 16; y++){
    for (let x = 0; x < 16; x++){
      q_pixels += numToColor(canvas[x][y])
    }
    q_pixels += "\n"
  }
  for (let y = 0; y < 16; y++){
    for (let x = 16; x < 32; x++){
      w_pixels += numToColor(canvas[x][y])
    }
    w_pixels += "\n"
  }
  for (let y = 16; y < 32; y++){
    for (let x = 0; x < 16; x++){
      a_pixels += numToColor(canvas[x][y])
    }
    a_pixels += "\n"
  }
  for (let y = 16; y < 32; y++){
    for (let x = 16; x < 32; x++){
      s_pixels += numToColor(canvas[x][y])
    }
    s_pixels += "\n"
  }
  draw(q_pixels, w_pixels, a_pixels, s_pixels)
}

//Canvas colors
// 0 - black
// 1 - dark gray
// 2 - gray
// 3 - white
// 4 - red
// 5 - brown
// 6 - light blue
// 7 - blue
// 8 - yellow
// 9 - golden
// 10 - lime
// 11 - green
// 12 - pink
// 13 - violet
//init program goes here
draw_canvas(canvas)

//your program goes here
let cursor_color = 0
canvas[cursor[0]][cursor[1]] = cursor_color
draw_canvas(canvas)
//controlls
onInput("s", () => {
  cursor[1] += 1
  canvas[cursor[0]][cursor[1]] = cursor_color
})
onInput("w", () => {
  cursor[1] -= 1
  canvas[cursor[0]][cursor[1]] = cursor_color
})
onInput("a", () => {
  cursor[0] -= 1
  canvas[cursor[0]][cursor[1]] = cursor_color
})
onInput("d", () => {
  cursor[0] += 1
  canvas[cursor[0]][cursor[1]] = cursor_color
})
onInput("i", () => {
  cursor_color += 1
  canvas[cursor[0]][cursor[1]] = cursor_color
})
onInput("k", () => {
  cursor_color -= 1
  canvas[cursor[0]][cursor[1]] = cursor_color
})

afterInput(() => {
  draw_canvas(canvas)
})