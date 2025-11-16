/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: TW3DG
@author: n0o0b090lv
@tags: []
@addedOn: 2025-00-00

USES:
https://gist.github.com/officialErnests/ca5e80d4a61fcfbcc84c5f8f4a88bd08
*/



//--SETUP--
const screen_sprite_size = [10,8]


//Screen_sprite_size sets canvas size
//where 1 = 16
//example const screen_sprite_size = [10,8] = 160x128 (aka max screen)
//example const screen_sprite_size = [2,2] = 32x32
const screen_size = [screen_sprite_size[0] * 16, screen_sprite_size[1] * 16]



//--IGNORE--
//aka all drawing
//Initilises canvas
const aviable_chars = "0123456789qwrtyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMāēžščģūīņķļĀŠŽĒČĢŪĪŅĶĻ"
let aviable_chars_incrament = 0
let screen_sprites = []
for (let x = 0; x < screen_sprite_size[0]; x++){
  let screen_sprites_column = []
  for (let y = 0; y < screen_sprite_size[1]; y++){
    screen_sprites_column.push(aviable_chars[aviable_chars_incrament])
    aviable_chars_incrament += 1
  }
 screen_sprites.push(screen_sprites_column)
}
let canvas = []
for (let x = 0; x < screen_sprite_size[0]*16; x++){
  let temp_canvas = []
  for (let y = 0; y < screen_sprite_size[1]*16; y++){
    temp_canvas.push(3)
  }
  canvas.push(temp_canvas)
}
//Draws pixels to sprites and sprites
function draw(sprite_pixels) {
  let legends = []
  let legends_str = ''
  for (let y = 0; y < screen_sprite_size[1]; y++){
    for (let x = 0; x < screen_sprite_size[0]; x++){
      legends.push([screen_sprites[x][y], sprite_pixels[y][x]])
      legends_str += screen_sprites[x][y]
    }
    legends_str += '\n'
  }
  setLegend.apply(null,legends)
  setMap(legends_str)
}
//Initilises colors
const color_values = ['0','L','1','2','3','C','7','5','6','F','4','D','8','H','9']
function numToColor(value) {
  return color_values[value % 14]
}
//Converts canvas to 16 by 16 sprite colors
function draw_canvas(canvas){
  let all_pixels = []
  for (let canvas_y = 0; canvas_y < screen_sprite_size[1]; canvas_y++){
    let row_pixels = []
    for (let canvas_x = 0; canvas_x < screen_sprite_size[0]; canvas_x++){
      let sprite_pixels = ''
      for (let y = canvas_y*16; y < canvas_y*16+16; y++){
        for (let x = canvas_x*16; x < canvas_x*16+16; x++){
          sprite_pixels += numToColor(canvas[x][y])
        }
        sprite_pixels += '\n'
      }
      row_pixels.push(sprite_pixels)
    }
    all_pixels.push(row_pixels)
  }
  draw(all_pixels)
}
//Docs (can delete)
//You can draw on canvas by setting pixel colors in "canvas"
//Then just call draw_canvas(canvas)
//
//Example, draw gray pixel at x = 10 and y = 5
//canvas[10][5] = 2
//draw_canvas(canvas)
//
//
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
//
//


function fill(color, color2){
  const horizont = screen_size[1]/2
  for (let x = 0; x < screen_size[0]; x++){
    
    for (let y = 0; y < horizont; y++){
      canvas[x][y] = color
    }
    for (let y = horizont; y < screen_size[1]; y++){
      canvas[x][y] = color2
    }
  }
}

//your program goes here
const canvas_middle_offset = 15
function edgeFunction(a, b, c){
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
};

function pointInTriangle(triangle, point){
  const ABP = edgeFunction(triangle[0], triangle[1], point);
  if (ABP < 0) {return false}
  const BCP = edgeFunction(triangle[1], triangle[2], point);
  if (BCP < 0) {return false}
  const CAP = edgeFunction(triangle[2], triangle[0], point);
  if (CAP < 0) {return false}
  return true
}

function renderTriangle(triangle, color){
  for (let x = 0; x < screen_size[0]; x++){
    for (let y = 0; y < screen_size[1]; y++){
      if (pointInTriangle(triangle, [x,y])){
        canvas[Math.floor(x)][Math.floor(y)] = color
      }
    }
  }
}

function renderTriangles(){
  triangles.forEach((triangle) => {
    const transformed_point1 = projectPoint(
      rotatePoint(
        tranformPoint(points[triangle[0]])
      )
    )
    if(transformed_point1.length == 0){return} 
    const transformed_point2 = projectPoint(
      rotatePoint(
        tranformPoint(points[triangle[1]])
      )
    )
    if(transformed_point2.length == 0){return} 
    const transformed_point3 = projectPoint(
      rotatePoint(
        tranformPoint(points[triangle[2]])
      )
    )
    if(transformed_point3.length == 0){return} 
    renderTriangle([
      transformed_point1,
      transformed_point2,
      transformed_point3,
    ], triangle[3])
  })
}

function tranformPoint(point) {
  return [point[0] - player[0] , point[1] - player[1], point[2] - player[2]]
}

function projectPoint(point) {
  if (point.length == 0){
    return []
  }
  if (point[0] == 0) {
    return []
  }
  return [(1-point[1]/point[0])*screen_size[0]/2,(1-point[2]/point[0])*screen_size[1]/2]
}

function rotatePoint(point) {
  const projection = [point[0] * player_cos + point[1] * (-player_sin), point[0] * player_sin + point[1] * player_cos, point[2]]
  if (projection[0] < 0){
    return []
  }
  return projection
}

let points = [
  //Front face 0-4
  [4,-2,-1],
  [4,-2,2],
  [4,0,4],
  [4,2,2],
  [4,2,-1],
  //Back face 5-9
  [8,-2,-1],
  [8,-2,2],
  [8,0,4],
  [8,2,2],
  [8,2,-1],
  //Door 10-13
  [4,-0.5,-1],
  [4,-0.5,1],
  [4,0.5,-1],
  [4,0.5,1],
]
//TRIANGLE FRONT FACES ARE CLOCKWISE OTHER FACE IS CULLED
//Also the lover the face is the z index is bigger ;PP
let triangles = [
  //Bottom faces aka brown
  [1,0,3,5],
  [3,0,4,5],
  [6,5,1,5],
  [1,5,0,5],
  [5,8,9,5],
  [6,8,5,5],
  [8,3,9,5],
  [3,4,9,5],
  //Top faces aka golden
  [2,1,3,9],
  [7,6,2,9],
  [2,6,1,9],
  [7,8,6,9],
  [2,3,7,9],
  [7,3,8,9],
  //Door
  [11,10,12, 8],
  [11,12,13, 8],
]
let player = [0,0,0]
let player_radiants = 0
let player_sin = 0
let player_cos = 1
const turnRad = Math.PI/16
let cam_speed = 0.5

//TODO
// AS WELL ALREADY COMPUTED POINT VALUES
//AS WELL NOT TO RENDER POINTS OUTSiDE CAMERA
fill(6,10)
renderTriangles()
draw_canvas(canvas)
//controlls
onInput("w", () => {
  player_sin = Math.sin(player_radiants)
  player_cos = Math.cos(player_radiants)
  player[0] += player_cos * cam_speed
  player[1] -= player_sin * cam_speed
})
onInput("s", () => {
  player_sin = Math.sin(player_radiants)
  player_cos = Math.cos(player_radiants)
  player[0] -= player_cos * cam_speed
  player[1] += player_sin * cam_speed
})
onInput("a", () => {
  player_sin = Math.sin(player_radiants)
  player_cos = Math.cos(player_radiants)
  player[0] += player_sin * cam_speed
  player[1] += player_cos * cam_speed
})
onInput("d", () => {
  player_sin = Math.sin(player_radiants)
  player_cos = Math.cos(player_radiants)
  player[0] -= player_sin * cam_speed
  player[1] -= player_cos * cam_speed
})
onInput("j", () => {
  player_radiants -= turnRad
  player_radiants = player_radiants % (Math.PI * 2)
})
onInput("l", () => {
  player_radiants += turnRad
  player_radiants = player_radiants % (Math.PI * 2)
})
onInput("i", () => {
  player[2] += 0.5
})
onInput("k", () => {
  player[2] = Math.max(player[2]-0.5,-0.5)
  
})

afterInput(() => {
  fill(6,10)
  player_sin = Math.sin(player_radiants)
  player_cos = Math.cos(player_radiants)
  renderTriangles()
  draw_canvas(canvas)
})










