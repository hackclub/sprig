/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: craft
@author: 
@tags: []
@addedOn: 2024-00-00
*/


//----------------------------

// Actual stuff


//-- colors
const black = "1";
const dark_gray = "2";
const light_gray = "3";
const white = "4";
const red = "5";
const brown  = "6";
const cyan = "7";
const blue = "8";
const yellow = "9";
const swamp_green = "A";
const light_green = "B";
const dark_green = "C";
const pink = "D";
const purple = "E";
const orange = "F";
const clear = "G";


const add_value = tune`
500: D5~500,
15500`
const sub_value = tune`
500: B4~500,
15500`

const menu_move = tune`
500: A4^500,
15500`

const new_game = tune`
61.224489795918366: C5^61.224489795918366,
61.224489795918366: E5^61.224489795918366,
61.224489795918366: G5^61.224489795918366,
1775.5102040816325`

const menu_screen_theme_drive = tune`
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200,
200: C4^200,
200: E4^200,
200: G4^200,
200: C5^200`
const menu_screen_theme_hat = tune`
200: C4/200,
200: C4/200,
200,
200: C4/200,
200: C4/200,
200: C4/200,
200,
200: C4/200,
200: C4/200,
200: C4/200,
200,
200: C4/200,
200: D4/200,
200,
200: D4/200,
200,
200: C4/200,
200: C4/200,
200,
200: C4/200,
200: C4/200,
200: C4/200,
200,
200: C4/200,
200: C4/200,
200: C4/200,
200,
200: C4/200,
200: D4/200,
200,
200: D4/200,
200`
const menu_screen_theme_carry = tune`
200: E5-200,
200,
200: C5-200,
200,
200: G4-200,
2200,
200: E5-200,
200,
200: C5-200,
200,
200: G4-200,
2200`



const grass = tune`
16000`

setLegend(
  [black,bitmap`
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
  [dark_gray,bitmap`
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
LLLLLLLLLLLLLLLL`],
  [light_gray,bitmap`
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
1111111111111111`],
  [white,bitmap`
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
2222222222222222`],
  [red,bitmap`
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
3333333333333333`],
  [brown,bitmap`
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
CCCCCCCCCCCCCCCC`],
  [cyan,bitmap`
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
7777777777777777`],
  [blue,bitmap`
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
5555555555555555`],
  [yellow,bitmap`
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
6666666666666666`],
  [swamp_green,bitmap`
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
FFFFFFFFFFFFFFFF`],
  [light_green,bitmap`
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
4444444444444444`],
  [dark_green,bitmap`
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
DDDDDDDDDDDDDDDD`],
  [pink,bitmap`
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
8888888888888888`],
  [purple,bitmap`
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
HHHHHHHHHHHHHHHH`],
  [orange,bitmap`
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
9999999999999999`],
  [clear,bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
)

//-- world generation
var seed = 500;

function gen_map(x,y,color){
  let r =  ""
  for(let yi = 0;yi<y;yi++){
    let l = ""
    for(let xi = 0;xi<x;xi++){
      l += color
    }

    r += l+"\n";
  }
  return r
}

function main_menu_screen_gen(x,y,index){
  let r =  ""
  for(let yi = 0;yi<y;yi++){
    let l = ""
    for(let xi = 0;xi<x;xi++){
      var color = cyan
      v = perlin((2*xi)/x,(2*yi)/y)+index
      if (v == 0){
        color = black
      } else if (v > 0 && v < 0.25) {
        color = dark_gray
      } else if (v >= 0.25 && v < 0.5){
        color = light_gray
      } else if (v >= 0.5 && v < 0.75){
        color = brown
      } else if (v >= 0.75 && v < 1){
        color = light_green
      }

      
      l += color
    }

    r += l+"\n";
  }
  return r
}

var main_menu = main_menu_screen_gen(80,64,0)
var main_menu_index = 0
var game_level = gen_map(80,64,".")
var settings_menu = gen_map(80,64,brown)
setMap(main_menu)

// assets

var drive = 0
var hat =0
var carry = 0

function play_menu_theme(){
  drive = playTune(menu_screen_theme_drive,Infinity)
  hat = playTune(menu_screen_theme_hat,Infinity)
  carry = playTune(menu_screen_theme_carry,Infinity)
}

function end_menu_theme(){
  drive.end()
  hat.end()
  carry.end()
}
//play_menu_theme()
// ------- vector math
class Vector3{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
  }

  magnitude(){
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
  }
    
  dot(v){
    return this.x*v.x+this.y*v.y+this.z*v.z;
  }

  add(v){
    return new Vector3(this.x+v.x,this.y+v.y,this.z+v.z);
  }

  addn(i){
    return new Vector3(this.x+i,this.y+i,this.z+i);
  }

  sub(v){
    return new Vector3(this.x-v.x,this.y-v.y,this.z-v.z);
  }

  subn(i){
    return new Vector3(this.x-i,this.y-i,this.z-i);
  }
  
  mul(v){
    return new Vector3(this.x*v.x,this.y*v.y,this.z*v.z);
  }

  muln(i){
    return new Vector3(this.x*i,this.y*i,this.z*i);
  }

  div(v){
    return new Vector3(this.x/v.x,this.y/v.y,this.z/v.z);
  }

  divn(i){
    return new Vector3(this.x/i,this.y/i,this.z/i);
  }

  floor(){
    return new Vector3(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z));
  }

  cross(v){
    return new Vector3(this.y*v.z-this.z*v.y,this.z*v.x-this.x*v.z,this.x*v.y+this.y*v.x);
  }
  
}

class Vector2{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }

  magnitude(){
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
  }
 
  dot(v){
    return this.x*v.x+this.y*v.y;
  }

  add(v){
    return new Vector2(this.x+v.x,this.y+v.y);
  }

  addn(i){
    return new Vector2(this.x+i,this.y+i);
  }

  sub(v){
    return new Vector2(this.x-v.x,this.y-v.y);
  }

  mul(v){
    return new Vector2(this.x*v.x,this.y*v.y);
  }
  
  muln(i){
    return new Vector2(this.x*i,this.y*i);
  }

  div(v){
    return new Vector2(this.x/v.x,this.y/v.y);
  }
  
  divn(i){
    return new Vector2(this.x/i,this.y/i);
  }
  
}


// ------------ values

// --- Worlds Generation Settings
const noiseZoomFactor = 10;
var chunk_size = 8;
var chunk_height = 16
const world_size = new Vector2(20,20);
var superflat_ = 0

var loaded_chunks = [0]
var centered_chunk = loaded_chunks[0]

// --- Rendering Settings

const sprite_offset = new Vector3(8,8,8);
const playerS_offset = new Vector3(8,8,8);
const layer_offset = 6;
var rendered_layers = 1;
var ghost_layers = 0;
var render_distance = 0.8;

var side_split = 1


const iso_x_mul_s = new Vector2(1*sprite_offset.x/2,-1*sprite_offset.x/2);
const iso_y_mul_s = new Vector2(0.5*sprite_offset.y/2,0.5*sprite_offset.y/2);



// --- Display Settings

const x_mul = new Vector2(0.5*2/sprite_offset.y,1*2/sprite_offset.x);
const y_mul = new Vector2(-0.5*2/sprite_offset.y,1*2/sprite_offset.x);
const screen_center = new Vector2(width()/2-4,height()/2-10)
var tick_speed = 100//ms

const settings_item_size = 32;

const chunk_offset = new Vector2(screen_center.dot(x_mul)-chunk_size/2,screen_center.dot(y_mul)-chunk_size/2)

//var chunk_position_offset = new Vector2(0,0).muln(chunk_size);

// ------------ setup

var game_state = 0;

// ---- item mapping
item_maps = [
       [ // 0 Settings Gear 
        [0,dark_gray,0,dark_gray,0,dark_gray,0,0],
        [dark_gray,white,dark_gray,dark_gray,dark_gray,white,dark_gray,0],
        [0,dark_gray,white,white,white,dark_gray,0,0],
        [dark_gray,dark_gray,white,dark_gray,white,dark_gray,dark_gray,0],
        [0,dark_gray,white,white,white,dark_gray,0,0],
        [dark_gray,white,dark_gray,dark_gray,dark_gray,white,dark_gray,0],
        [0,dark_gray,0,dark_gray,0,dark_gray,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ], 
      [ // 1 Pickaxe Icon
        [0,0,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,0],
        [0,dark_gray,0,0,0,0,0,0],
        [dark_gray,0,brown,0,0,0,0,0],
        [dark_gray,0,0,brown,0,0,0,0],
        [dark_gray,0,0,0,brown,0,0,0],
        [dark_gray,0,0,0,0,brown,0,0],
        [dark_gray,0,0,0,0,0,brown,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 2 Bedrock
        [0,0,0,dark_gray,dark_gray,0,0,0],
        [0,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,0],
        [dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray],
        [black,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,light_gray],
        [black,black,black,dark_gray,dark_gray,light_gray,light_gray,light_gray],
        [black,black,black,black,light_gray,light_gray,light_gray,light_gray],
        [0,black,black,black,light_gray,light_gray,light_gray,0],
        [0,0,0,black,light_gray,0,0,0]
      ],
      [ // 3 Deepslate
        [0,0,0,dark_gray,dark_gray,0,0,0],
        [0,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,0],
        [dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray],
        [dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,dark_gray,light_gray],
        [dark_gray,light_gray,dark_gray,dark_gray,dark_gray,light_gray,dark_gray,light_gray],
        [dark_gray,light_gray,dark_gray,light_gray,dark_gray,light_gray,dark_gray,light_gray],
        [0,light_gray,dark_gray,light_gray,dark_gray,light_gray,dark_gray,0],
        [0,0,0,light_gray,dark_gray,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 4 Stone
        [0,0,0,light_gray,light_gray,0,0,0],
        [0,light_gray,light_gray,light_gray,light_gray,light_gray,light_gray,0],
        [light_gray,light_gray,light_gray,light_gray,light_gray,light_gray,light_gray,light_gray],
        [dark_gray,light_gray,light_gray,light_gray,light_gray,light_gray,light_gray,dark_gray],
        [dark_gray,dark_gray,dark_gray,light_gray,light_gray,dark_gray,light_gray,dark_gray],
        [dark_gray,dark_gray,dark_gray,dark_gray,light_gray,dark_gray,light_gray,dark_gray],
        [0,dark_gray,dark_gray,dark_gray,light_gray,dark_gray,light_gray,0],
        [0,0,0,dark_gray,light_gray,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 5 Dirt
        [0,0,0,brown,brown,0,0,0],
        [0,brown,brown,brown,brown,brown,brown,0],
        [brown,brown,brown,brown,brown,brown,brown,brown],
        [brown,brown,brown,brown,brown,brown,brown,swamp_green],
        [brown,swamp_green,brown,brown,brown,swamp_green,brown,swamp_green],
        [brown,swamp_green,brown,swamp_green,brown,swamp_green,brown,swamp_green],
        [0,swamp_green,brown,swamp_green,brown,swamp_green,brown,0],
        [0,0,0,swamp_green,brown,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 6 Grass
        [0,0,0,dark_green,dark_green,0,0,0],
        [0,dark_green,dark_green,dark_green,dark_green,dark_green,dark_green,0],
        [dark_green,dark_green,dark_green,dark_green,dark_green,dark_green,dark_green,dark_green],
        [dark_green,dark_green,dark_green,dark_green,dark_green,dark_green,dark_green,light_green],
        [dark_green,light_green,dark_green,dark_green,dark_green,light_green,dark_green,light_green],
        [dark_green,light_green,dark_green,light_green,dark_green,light_green,dark_green,light_green],
        [0,light_green,dark_green,light_green,dark_green,light_green,dark_green,0],
        [0,0,0,light_green,dark_green,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 7 Wood
        [0,0,0,brown,brown,0,0,0],
        [0,brown,brown,yellow,yellow,brown,brown,0],
        [brown,yellow,yellow,swamp_green,swamp_green,yellow,yellow,brown],
        [brown,brown,brown,yellow,yellow,brown,brown,brown],
        [brown,brown,brown,brown,brown,brown,swamp_green,brown],
        [brown,brown,brown,brown,swamp_green,brown,swamp_green,brown],
        [0,brown,brown,brown,swamp_green,brown,swamp_green,0],
        [0,0,0,brown,swamp_green,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 8 Glass
        [0,0,0,light_gray,light_gray,0,0,0],
        [0,light_gray,light_gray,0,0,light_gray,light_gray,0],
        [light_gray,0,0,light_gray,0,0,0,light_gray],
        [0,light_gray,light_gray,0,0,light_gray,light_gray,0],
        [light_gray,light_gray,0,light_gray,light_gray,light_gray,0,light_gray],
        [light_gray,0,light_gray,light_gray,0,0,light_gray,light_gray],
        [0,light_gray,light_gray,0,light_gray,light_gray,0,0],
        [0,0,0,light_gray,light_gray,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      [ // 9 Brick
        [0,0,0,red,red,0,0,0],
        [0,red,red,red,red,red,red,0],
        [red,red,red,red,red,red,red,red],
        [light_gray,red,red,red,red,red,red,dark_gray],
        [red,light_gray,light_gray,red,red,dark_gray,dark_gray,red],
        [light_gray,red,red,light_gray,dark_gray,red,red,dark_gray],
        [0,light_gray,light_gray,red,red,dark_gray,dark_gray,0],
        [0,0,0,light_gray,dark_gray,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ]
]


// ------ noise generation

function perlin(x, y) {
  const xFloor = Math.floor(x);
  const yFloor = Math.floor(y);

  const xFraction = x - xFloor;
  const yFraction = y - yFloor;

  const v1 = randomGradient(xFloor, yFloor);
  const v2 = randomGradient(xFloor + 1, yFloor);
  const v3 = randomGradient(xFloor, yFloor + 1);
  const v4 = randomGradient(xFloor + 1, yFloor + 1);

  const dot1 = dotProduct(v1, xFraction, yFraction);
  const dot2 = dotProduct(v2, xFraction - 1, yFraction);
  const dot3 = dotProduct(v3, xFraction, yFraction - 1);
  const dot4 = dotProduct(v4, xFraction - 1, yFraction - 1);

  const u = fade(xFraction);
  const v = fade(yFraction);

  return lerp(lerp(dot1, dot2, u), lerp(dot3, dot4, u), v);
}

function randomGradient(x, y) {
  const random = (2920 * Math.sin(x * 21942 + y * 171324 + 8912) * Math.cos(x * 23157 * y * 217832 + 9758))*seed;
  return normalize(Math.cos(random), Math.sin(random));
}

function normalize(x, y) {
  const length = Math.sqrt(x * x + y * y);
  return { x: x / length, y: y / length };
}

function dotProduct(v, x, y) {
  return v.x * x + v.y * y;
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return a + t * (b - a);
}

//------------------------------- World
// ------- chunk constrction

function generate_chunks(world_size){
  chunks = []
  for (let y = Math.floor(-world_size.y/2);y<Math.floor(world_size.y/2);y++){
    for (let x = Math.floor(-world_size.x/2);x<Math.floor(world_size.x/2);x++){
      chunks.push(new Chunk(chunk_size,chunk_height,new Vector2(x,y)))
    }
  }
  return chunks;
}



class Chunk {

  
  constructor(size,height,position){
    this.size = size;
    this.height = height;
    this.data = [];
    this.position = (position.muln(this.size)).add(chunk_offset);
    this.old_position = position;

  

    // generate empty chunk
    for (let z = 0 ;z<height;z++){
      this.data[z] = [];
      if (z == 0){
        for (let y = 0;y<size;y++){
          this.data[z][y] = [];
          for (let x = 0;x<size;x++){
            this.data[z][y][x] = 0
          }
      }
        continue;
      }
      for (let y = 0;y<size;y++){
        this.data[z][y] = [];
        for (let x = 0;x<size;x++){
          if (superflat_ == 0){
            this.data[z][y][x] = perlin(((x+1)+this.position.x)/noiseZoomFactor,((y+1)+this.position.y)/noiseZoomFactor)+(z)/noiseZoomFactor;
          } else {
            this.data[z][y][x] = -1;
          }
        }
      }
    }
  }

  move(new_position){
    this.old_position = this.position;
    this.position = this.position.add(new_position);
  }

  visualize(offset,layer=0,player){
    layer = Math.max(Math.min(layer,this.height-1),0)
    for (let y = 0;y<this.size+1;y++){
      for (let x = 0;x<this.size+1;x++){
        clearTile(x+offset.x,y+offset.y)
        if (y == this.size || x == this.size){
          addSprite(x+offset.x,y+offset.y,black);
          continue;
        }
        let v = this.data[layer][y][x];
        if (v == 0){
          addSprite(x+offset.x,y+offset.y,black);
        } else if (v > 0 && v < 0.25) {
          addSprite(x+offset.x,y+offset.y,dark_gray);
        } else if (v > 0.25 && v < 0.5){
          addSprite(x+offset.x,y+offset.y,light_gray);
        } else if (v > 0.5 && v < 0.75){
          addSprite(x+offset.x,y+offset.y,brown);
        } else if (v > 0.75 && v < 1){
          addSprite(x+offset.x,y+offset.y,light_green);
        } else if (v == 3){
          addSprite(x+offset.x,y+offset.y,yellow);
        } else if (v == 4){
          addSprite(x+offset.x,y+offset.y,orange);
        } else if (v == 5){
          addSprite(x+offset.x,y+offset.y,red);
        } else {
          addSprite(x+offset.x,y+offset.y,white);
        }
      }
    }
    if ( player != null ){
      let mini_map_pos = player.no_offsetV2(player.positionV2.addn(1))
      if (mini_map_pos.x+offset.x-this.size/2>0 && mini_map_pos.y+offset.y-this.size/2>0 && mini_map_pos.x+offset.x-this.size/2<width() && mini_map_pos.y+offset.y-this.size/2<height()){
        clearTile(mini_map_pos.x+offset.x-this.size/2,mini_map_pos.y+offset.y-this.size/2)
        addSprite(mini_map_pos.x+offset.x-this.size/2,mini_map_pos.y+offset.y-this.size/2,cyan);
      }
    }
  }
  render(layer,ghost1,ghost2,offset){
    layer = Math.max(Math.min(layer,this.height-1),0)
    for (let y = 0;y<this.size;y++){
      for (let x = 0;x<this.size;x++){
        let world_pos = (new Vector2(x,y).add(this.position));
        let screen_pos = new Vector2(world_pos.dot(iso_x_mul_s),(world_pos.dot(iso_y_mul_s))-((offset/2)*layer_offset)+this.size);
        this.renderblock(screen_pos,this.data[layer][y][x],ghost1,ghost2);
      }
    }
  }
  renderblock(screen_pos,block_type,ghost1,ghost2){
    let x = Math.floor(screen_pos.x);
    let y = Math.floor(screen_pos.y);
    
      if (block_type == 0){
        this.drawBlock(x,y,item_maps[2],ghost1,ghost2);
      } else if (block_type > 0 && block_type < 0.25) {
        this.drawBlock(x,y,item_maps[3],ghost1,ghost2);
      } else if (block_type >= 0.25 && block_type < 0.5){
        this.drawBlock(x,y,item_maps[4],ghost1,ghost2);
      } else if (block_type >= 0.5 && block_type < 0.75){
        this.drawBlock(x,y,item_maps[5],ghost1,ghost2);
      } else if (block_type >= 0.75 && block_type < 1){
        this.drawBlock(x,y,item_maps[6],ghost1,ghost2);
      } else if (block_type == 3){
         this.drawBlock(x,y,item_maps[7],ghost1,ghost2);
      } else if (block_type == 4){
         this.drawBlock(x,y,item_maps[8],ghost1,ghost2);
      } else if (block_type == 5){
         this.drawBlock(x,y,item_maps[9],ghost1,ghost2);
      }
  }

  drawBlock(x,y,sprite_map,ghost1,ghost2){
    for (let yi = y; yi<y+sprite_offset.y;yi+=1+ghost1){
      for (let xi = x; xi<x+sprite_offset.x;xi+=1+ghost2){
       if (xi < width() && yi < height() && xi > -1 && yi > -1){
        if (sprite_map[yi-y][xi-x] != 0){
          clearTile(xi,yi);
          addSprite(xi,yi,sprite_map[yi-y][xi-x]);
        }
       }
      }
    }
  }
}

// ------- Player 

class HotBar{
  
  constructor(items){
    this.items = []
    this.hot_bar_size_x = width()-10;
    this.hot_bar_size_y = 11;
    this.hot_bar_item_size = 8;

    this.selected_item = 0
    if (items != null){
      for (let i = 0 ; i < Math.min(items.length,9); i ++){
        this.items[i] = [items[i][0],items[i][1],items[i][2]];
      }
    }
  

  }

  pick_item(n){
    this.selected_item += n
    if (this.selected_item >= this.items.length){
      this.selected_item = 0
    }
    if (this.selected_item < 0){
      this.selected_item = this.items.length-1
    }
  }

  render(){
    for (let item = 0; item < Math.min(this.items.length,9) ; item++){
      this.draw_item(item*this.hot_bar_item_size+(width()-this.hot_bar_size_x)-7,height()-this.hot_bar_size_y,item == this.selected_item,item_maps[this.items[item][0]])  
    }
  }
  
  draw_item(x,y,selected,item_map){
    for (let row = 0; row<this.hot_bar_size_y; row++){
      for (let col = 0; col<this.hot_bar_item_size; col++){
        clearTile(x+col,row+y)
        if (row == 0 || col == 0 || row == this.hot_bar_size_y-1 || col == this.hot_bar_item_size){
          if (selected){
            addSprite(x+col,row+y,pink);
          } else {
            addSprite(x+col,row+y,white);
          }
        } else {
          if (item_map[row-1][col-1] == 0 ){
            addSprite(x+col,row+y,black);
          }else{
            addSprite(x+col,row+y,item_map[row-1][col-1]);
          }
        }
      }
    }
  }


}

class Player{
  constructor(position,hotbar){
    this.position = position
    this.old_position = position;
    this.positionV2 = new Vector2(this.position.x,this.position.y)
    this.layer = this.position.z;
    this.hotbar = hotbar;
    this.facing = new Vector3(0,1,0);

    this.jumped = false;

    this.player_map = [
      [0,0,0,black,black,0,0,0],
      [0,black,black,black,black,black,black,0],
      [brown,black,black,black,black,black,black,brown],
      [brown,brown,brown,black,black,brown,brown,brown],
      [blue,brown,brown,brown,brown,brown,brown,blue],
      [dark_gray,blue,blue,brown,brown,blue,blue,dark_gray],
      [0,dark_gray,dark_gray,blue,blue,dark_gray,dark_gray,0],
      [0,0,0,dark_gray,dark_gray,0,0,0]
    ]

    this.marker_map = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,white,white,0,0,0],
      [0,white,white,purple,purple,white,white,0],
      [white,purple,purple,orange,orange,purple,purple,white],
      [0,white,white,purple,purple,white,white,0],
      [0,0,0,white,white,0,0,0],
    ]
  }

  no_offsetV2(pos){
    return new Vector2(pos.x-chunk_offset.x+chunk_size/2-1,pos.y-chunk_offset.y+chunk_size/2-1);
  }
  
  move(new_position){
    this.old_position = this.position;
    this.position = this.position.add(new_position);
    this.position.z = Math.max(Math.min(this.position.z,chunk_height-1),0)
    this.positionV2 = new Vector2(this.position.x,this.position.y);
    this.layer = this.position.z;

    let move_dir = player.position.sub(player.old_position).divn(player.position.sub(player.old_position).magnitude());
    player.facing=move_dir.floor();
  }

  move_to(new_position){
    this.old_position = this.position;
    this.position = new_position;
    this.position.z = Math.max(Math.min(this.position.z,chunk_height-1),0)
    this.positionV2 = new Vector2(this.position.x,this.position.y);
    this.layer = this.position.z;
  }


  render(){
    // render looking at block
    let marker_pos = this.position.add(this.facing)
    let marker_world_pos = new Vector2(marker_pos.x-1,marker_pos.y-1)
    let marker_screen_pos = new Vector2(marker_world_pos.dot(iso_x_mul_s),(marker_world_pos.dot(iso_y_mul_s))+chunk_size);
    
    for (let yi = marker_screen_pos.y; yi < marker_screen_pos.y + playerS_offset.y; yi++){
      for (let xi = marker_screen_pos.x; xi < marker_screen_pos.x + playerS_offset.x; xi++){
        if (xi < width() && yi < height() && xi > -1 && yi > -1){
          if (this.marker_map[yi-marker_screen_pos.y][xi-marker_screen_pos.x] != 0){
            clearTile(xi,yi);
            addSprite(xi,yi,this.marker_map[yi-marker_screen_pos.y][xi-marker_screen_pos.x]);
          }
        }
      }
    }
    
    // render player
    let world_pos = new Vector2(this.position.x-1,this.position.y-1)
    let screen_pos = new Vector2(world_pos.dot(iso_x_mul_s),(world_pos.dot(iso_y_mul_s))+chunk_size);
    
    for (let yi = screen_pos.y; yi < screen_pos.y + playerS_offset.y; yi++){
      for (let xi = screen_pos.x; xi < screen_pos.x + playerS_offset.x; xi++){
        if (xi < width() && yi < height() && xi > -1 && yi > -1){
          if (this.player_map[yi-screen_pos.y][xi-screen_pos.x] != 0){
            clearTile(xi,yi);
            addSprite(xi,yi,this.player_map[yi-screen_pos.y][xi-screen_pos.x]);
          }
        }
      }
    }

    // render hot bar
    this.hotbar.render()
  }

  use_item(){
    this.hotbar.items[this.hotbar.selected_item][1]["use"](this,this.hotbar.items[this.hotbar.selected_item][2])
  }
}

// ------------------- Settings
class MenuItem{
  constructor(setting_name,init_value,position,label,func,args){
    this.name = setting_name
    this.value = init_value
    this.isLabel = label;
    this.function = func;
    this.arguments = args
    this.position = position
    this.id = 0;
  }

  render(index){
    if (index){
      addText(this.name,{x:this.position.x,y:this.position.y,color:color`2`})
      if (!this.isLabel){
        addText(this.value.toString(),{x:this.position.x+this.name.length+1,y:this.position.y,color:color`2`})
      }
    } else {
      addText(this.name,{x:this.position.x,y:this.position.y,color:color`0`})
      if (!this.isLabel){
        addText(this.value.toString(),{x:this.position.x+this.name.length+1,y:this.position.y,color:color`0`})
      }
    }
  }

  update_value(new_val){
    this.value = new_val
  }
}

class MenuWindow{
  constructor(setting_items){
    this.items = setting_items;
    this.selected_item = 0;
  }
  render(){
    clearText()
    for (let setting_index = 0; setting_index<this.items.length; setting_index++){
      this.items[setting_index].render(setting_index == this.selected_item)
    }
  }
  pick_item(n){
    this.selected_item += n
    if (this.selected_item >= this.items.length){
      this.selected_item = 0
    }
    if (this.selected_item < 0){
      this.selected_item = this.items.length-1
    }
  }
  select_item(i){
    this.items[this.selected_item].function(this.items[this.selected_item].arguments,i)
  }
}

const settings = {
  "use": () => {
    game_state = 2
    setMap(settings_menu)
  }
}

const fist = {
  "use": (player,block_type) => {
    let marker_pos = player.no_offsetV2(player.position.add(player.facing))
    if (marker_pos.y+1-chunk_size/2 < chunk_size && marker_pos.x+1-chunk_size/2 < chunk_size && player.facing.z>=0){
      centered_chunk.data[player.layer+1][marker_pos.y+1-chunk_size/2][marker_pos.x+1-chunk_size/2] = block_type
    } else if (marker_pos.y+1-chunk_size/2 < chunk_size && marker_pos.x+1-chunk_size/2 < chunk_size && player.facing.x==0 && player.facing.y==0 && player.facing.z<0){
      centered_chunk.data[player.layer][marker_pos.y+1-chunk_size/2][marker_pos.x+1-chunk_size/2] = block_type
    }
  }
}

const block = {
  "use": (player,block_type) => {
  
    let marker_pos = player.no_offsetV2(player.position.add(player.facing))
    if (marker_pos.y+1-chunk_size/2 < chunk_size && marker_pos.x+1-chunk_size/2 < chunk_size){
      centered_chunk.data[player.layer+1][marker_pos.y+1-chunk_size/2][marker_pos.x+1-chunk_size/2] = block_type
    }
  }
}


const player = new Player(new Vector3(chunk_offset.x+chunk_size/2-1,chunk_offset.y+chunk_size/2-1,chunk_height-1),new HotBar([[0,settings,0],[1,fist,1.5],[3,block,0.05],[4,block,0.26],[5,block,0.56],[6,block,0.76],[7,block,3],[8,block,4],[9,block,5]]))

const render_distance_update_function = (menuitem,i)=>{
  render_distance+= 1; 
  if(render_distance>2){
    render_distance=0.8
  } 
  menuitem.update_value(render_distance);
}

const render_layers_update_function = (menuitem,i)=>{
  rendered_layers+=i
  if(rendered_layers>chunk_height){
    rendered_layers = 1
  } else if(rendered_layers < 1){
    rendered_layers = chunk_height
  }
  menuitem.update_value(rendered_layers);
}

const ghost_layers_update_function = (menuitem,i)=>{
  ghost_layers+=i
  if(ghost_layers>chunk_height-rendered_layers){
    ghost_layers = 0
  } else if(ghost_layers < 0){
    ghost_layers = chunk_height-rendered_layers
  }
  menuitem.update_value(ghost_layers);
}

const half_render_update_function = (menuitem,i)=>{
  side_split+= 1; 
  if(side_split>1){
    side_split=0
  } 
  menuitem.update_value(side_split);
}

const game_speed_update_function = (menuitem,i)=>{
  menuitem.value+= i*10; 
  if(menuitem.value>100){
    menuitem.value=1
  } else if (menuitem.value < 1){
    menuitem.value = 100
  }
  tick_speed = 100 * (100/menuitem.value)
  menuitem.update_value(menuitem.value);
}

const setting_menu = new MenuWindow([
  new MenuItem("Resume",0,new Vector2(1,1),true,()=>{ game_state = 1; clearText(); tick()}),
  new MenuItem("Render Distance",render_distance,new Vector2(1,2),false),
  new MenuItem("Rendered Layers",rendered_layers,new Vector2(1,3),false),
  new MenuItem("Ghost Layers",ghost_layers,new Vector2(1,4),false),
  new MenuItem("Half Render",side_split,new Vector2(1,5),false),
  new MenuItem("Game Speed %",100,new Vector2(1,6),false),
  new MenuItem("Main Menu",0,new Vector2(1,7),true,()=>{main_menu_index = 0; player.move_to(new Vector3(0,0,chunk_height-1)); setMap(main_menu); game_state = 0; clearText; tick()}),
]);

setting_menu.items[1].arguments = setting_menu.items[1]
setting_menu.items[1].function = render_distance_update_function

setting_menu.items[2].arguments = setting_menu.items[2]
setting_menu.items[2].function = render_layers_update_function

setting_menu.items[3].arguments = setting_menu.items[3]
setting_menu.items[3].function = ghost_layers_update_function

setting_menu.items[4].arguments = setting_menu.items[4]
setting_menu.items[4].function = half_render_update_function

setting_menu.items[5].arguments = setting_menu.items[5]
setting_menu.items[5].function = game_speed_update_function


const superflat_world = (menuitem,i)=>{
  superflat_+= 1; 
  if(superflat_>1){
    superflat_=0
  } 
  menuitem.update_value(superflat_);
}

const chunk_size_change = (menuitem,i)=>{
  chunk_size+= 2*i; 
  if(chunk_size>20){
    chunk_size=2
  } else if(chunk_size<2){
    chunk_size = 20
  }
  menuitem.update_value(chunk_size);
}

const chunk_height_change = (menuitem,i)=>{
  chunk_height+= i; 
  if(chunk_height>17){
    chunk_height = 1
  } else if(chunk_height<1){
    chunk_height = 17
  }
  menuitem.update_value(chunk_height);
}

const world_size_x_change = (menuitem,i)=>{
  world_size.x+= i; 
  if(world_size.x>50){
     world_size.x = 2
  } else if( world_size.x<2){
     world_size.x = 50
  }
  menuitem.update_value( world_size.x);
}

const world_size_y_change = (menuitem,i)=>{
   world_size.y+= i; 
  if(world_size.y>50){
    world_size.y = 2
  } else if(world_size.y<2){
    world_size.y = 50
  }
  menuitem.update_value(world_size.y);
}

const seed_change = (menuitem,i)=>{
  seed+= i; 
  menuitem.update_value(seed);
}

const random_seed = (menuitem,i)=>{
  seed = Math.floor(Math.random()*10000000); 
  menuitem.update_value(seed);
}

const title = new MenuItem("Title Card",0,new Vector2(5,0),true)

const main_menu_window = new MenuWindow([
  new MenuItem("New Game",0,new Vector2(6,3),true,()=>{ playTune(new_game); loaded_chunks = []; loaded_chunks = generate_chunks(world_size); centered_chunk = loaded_chunks[0]; game_state = 1; clearText(); tick()}),
  new MenuItem("Superflat",superflat_,new Vector2(5,4),false),
  new MenuItem("Chunk Size",chunk_size,new Vector2(4,5),false),
  new MenuItem("Chunk Height",chunk_height,new Vector2(3,6),false),
  new MenuItem("World Size X",world_size.x,new Vector2(3,7),false),
  new MenuItem("World Size Y",world_size.y,new Vector2(3,8),false),
  new MenuItem("Seed",seed,new Vector2(0,10),false),
  new MenuItem("Random Seed",0,new Vector2(0,11),true),
]);

main_menu_window.items[1].arguments = main_menu_window.items[1]
main_menu_window.items[1].function = superflat_world

main_menu_window.items[2].arguments = main_menu_window.items[2]
main_menu_window.items[2].function = chunk_size_change

main_menu_window.items[3].arguments = main_menu_window.items[3]
main_menu_window.items[3].function = chunk_height_change

main_menu_window.items[4].arguments = main_menu_window.items[4]
main_menu_window.items[4].function = world_size_x_change

main_menu_window.items[5].arguments = main_menu_window.items[5]
main_menu_window.items[5].function = world_size_y_change

main_menu_window.items[6].arguments = main_menu_window.items[6]
main_menu_window.items[6].function = seed_change

main_menu_window.items[7].arguments = main_menu_window.items[6]
main_menu_window.items[7].function = random_seed
//


const left = new Vector3(1,0,0);
const right = new Vector3(-1,0,0);
const forward = new Vector3(0,1,0);
const backward= new Vector3(0,-1,0);
const up = new Vector3(0,0,1);
const down = new Vector3(0,0,-1);
const zero_v = new Vector3(0,0,0);

// rendering cycle

function render(chunks,player){
  for (let chunkIndex = 0; chunkIndex<chunks.length;chunkIndex++){
    if (((chunks[chunkIndex].position.divn(chunk_size).addn(0.5)).sub(player.positionV2.divn(chunk_size))).magnitude()>render_distance){
      continue
    }
    if (chunkIndex == chunks.length-1){
      for (let index = 0; index < rendered_layers;index++){
        chunks[chunkIndex].render(player.layer+index,0,0,index);
      }
      chunks[chunkIndex].visualize(new Vector2(0,0),Math.max(Math.min(player.position.z+1,chunk_height-1),0),player)
      chunks[chunkIndex].visualize(new Vector2(0,chunk_size+1),Math.max(Math.min(player.position.z,chunk_height-1),0),player)
      chunks[chunkIndex].visualize(new Vector2(0,2*chunk_size+2),Math.max(Math.min(player.position.z-1,chunk_height-1),0))
      for (let index = rendered_layers; index < rendered_layers+ghost_layers;index++){
        chunks[chunkIndex].render(player.layer+index,1,0,index);
      }
    } else {
      for (let index = 0; index < rendered_layers;index++){
        chunks[chunkIndex].render(player.layer+index,0,side_split,0);
      }
    }
    

  }
  player.render();
}

function order_chunks_to_player(chunks,player){
  chunks.sort((a,b)=>{
    ((a.position.divn(chunk_size)).sub(player.positionV2.divn(chunk_size))).magnitude()
    if (((a.position.divn(chunk_size).addn(0.5)).sub(player.positionV2.divn(chunk_size))).magnitude() < ((b.position.divn(chunk_size).addn(0.5)).sub(player.positionV2.divn(chunk_size))).magnitude()){
      return -1
    } 
    if (((a.position.divn(chunk_size).addn(0.5)).sub(player.positionV2.divn(chunk_size))).magnitude() > ((b.position.divn(chunk_size).addn(0.5)).sub(player.positionV2.divn(chunk_size))).magnitude()){
      return 1
    }
    return 0;
    }
  )
  chunks.reverse()
  center_chunk(chunks,chunks[chunks.length-1],player)
}

function center_chunk(chunks,chunk,player){
  if (chunk != centered_chunk){
    for (let chunkIndex = 0; chunkIndex<chunks.length;chunkIndex++){
      chunks[chunkIndex].move(chunk.position.sub(chunk_offset).muln(-1));
    }
    centered_chunk = chunk
    zero_v.x = chunk_offset.x+chunk_size/2-1;
    zero_v.y = chunk_offset.y+chunk_size/2-1;
    zero_v.z = player.position.z
    player.move_to(zero_v);
    if (player.position.sub(player.old_position).magnitude()>0){
        player.move(player.facing.muln(-Math.floor((chunk_size-3)/2)).floor())
    }
  }
}

// physics cycle

function physics(chunks,player){
  // check block under player to see if its air
  if (player.positionV2.sub(chunk_offset).x >= chunk_size || player.positionV2.sub(chunk_offset).y >= chunk_size || player.positionV2.sub(chunk_offset).x < 0 || player.positionV2.sub(chunk_offset).y < 0 ){
    player.move_to(player.old_position);
  }
  if (player.jumped == true){
    player.jumped = false;
    return
  }
  if (player.layer + 1 < chunk_height){
    if ((centered_chunk.data[player.layer+1][player.positionV2.sub(chunk_offset).y][player.positionV2.sub(chunk_offset).x] >= 0 && centered_chunk.data[player.layer+1][player.positionV2.sub(chunk_offset).y][player.positionV2.sub(chunk_offset).x] < 1)||centered_chunk.data[player.layer+1][player.positionV2.sub(chunk_offset).y][player.positionV2.sub(chunk_offset).x]>=2){
      player.move_to(player.old_position);
    }
  }
  // if the block under has the value of air but not the value of higher id blocks then fall
 if (centered_chunk.data[player.layer][player.positionV2.sub(chunk_offset).y][player.positionV2.sub(chunk_offset).x] < 0 || (centered_chunk.data[player.layer][player.positionV2.sub(chunk_offset).y][player.positionV2.sub(chunk_offset).x]>=1&&centered_chunk.data[player.layer][player.positionV2.sub(chunk_offset).y][player.positionV2.sub(chunk_offset).x]<2)){
   player.move(down);
}

}

// settings menu cycle


// Controls
onInput("d",() =>{
  if (game_state == 1){
    player.move(left);
  } 
})

onInput("a",() =>{
  if (game_state == 1){
    player.move(right);
  }
})

onInput("s",() =>{
  if (game_state == 0){
    playTune(menu_move)
    main_menu_window.pick_item(1)
  }else if (game_state == 1){
    player.move(forward);
  } else if (game_state == 2){
    playTune(menu_move)
    setting_menu.pick_item(1)
  }
})

onInput("w",() =>{
  if (game_state == 0){
    playTune(menu_move)
    main_menu_window.pick_item(-1)
  }else if (game_state == 1){
    player.move(backward);
  } else if (game_state == 2){
    playTune(menu_move)
    setting_menu.pick_item(-1)
  }
})


onInput("k",() =>{
  if (game_state == 0){
    playTune(sub_value)
    main_menu_window.select_item(-1)
  } else if (game_state == 1){
    player.jumped = true
    player.move(up);
  } else if (game_state == 2){
    playTune(sub_value)
    setting_menu.select_item(-1)
  }
})
onInput("i",() =>{
  if (game_state == 0){
    playTune(add_value)
    main_menu_window.select_item(1)
  } else if (game_state == 1){
    player.use_item(down);
  } else if (game_state == 2){
    playTune(add_value)
    setting_menu.select_item(1)
  }
})

onInput("j",() =>{
  if (game_state == 0){
    playTune(sub_value)
    main_menu_window.select_item(-1)
  } else if (game_state == 1){
    player.hotbar.pick_item(-1);
  } else if (game_state == 2){
    playTune(sub_value)
    setting_menu.select_item(-1)
  }
})
onInput("l",() =>{
  if (game_state == 0){
    playTune(add_value)
    main_menu_window.select_item(1)
  } else  if (game_state == 1){
    player.hotbar.pick_item(1);
  } else if (game_state == 2){
    playTune(add_value)
    setting_menu.select_item(1)
  }
})

afterInput(()=>{
  if (game_state == 2){
    setting_menu.render()
  }
})

// update loop
var old_ts = -1
var dir = 1

var tick = () =>{
  if(game_state == 0){
    setMap(main_menu_screen_gen(80,64,main_menu_index))
    main_menu_window.render()
    title.render(false)
    setTimeout(tick,tick_speed)
    main_menu_index+=(0.0005*dir)
    if (main_menu_index > 2 || main_menu_index < 0){
      dir *= -1
    }
  } else if(game_state == 1){
    order_chunks_to_player(loaded_chunks,player)
    setMap(game_level) 
    render(loaded_chunks,player)
    physics(loaded_chunks,player)
    setTimeout(tick,tick_speed)
  } else if (game_state == 2){
    setting_menu.render()
  }
}
tick()





