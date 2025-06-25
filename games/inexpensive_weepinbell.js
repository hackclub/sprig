/*
@title: Dice Grenade Lite
@author: Chenzo
@tags: [Puzzle]
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const start_tile = "s"
const box = "r"
const push_box = "@"
const wall = "w"
const floor = "f"
const dice_1 = "1"
const dice_2 = "2"
const dice_3 = "3"
const dice_4 = "4"
const dice_5 = "5"
const dice_6 = "6"
const cursor_right = ">"
const cursor_left = "<"
const cursor_up = "^"
const cursor_down = "_"
const explosion_1 = "z"
const explosion_2 = "x"
const explosion_3 = "c"
const explosion_4 = "v"
const explosion_5 = "b"
const space = "o"
const crystal_1 = "*"
const crystal_2 = "+"
const exit_1 = "#"
const exit_2 = "$"
const screen_transition = "|"

const dice_sprites_ls = [dice_1,dice_2,dice_3,dice_4,dice_5,dice_6]
const explosion_frames = [explosion_1, explosion_2, explosion_3, explosion_4, explosion_5]
const crystal_frames = [crystal_1, crystal_2, crystal_1]
let crystals_animated = []
const dice_walls = [wall, box, push_box]

const player_normal = bitmap`
..000000000000..
.00CCC999999600.
00CCC99999999600
0CCC999999999960
0DCCCC99999999D0
0DDD44DDD4DD4DD0
0C4DD44DD44D4460
0C44DD4CCD44D460
0CC44DC99CD4DC60
0CCCCC9999CCC960
0CC00CCC99900960
0CCC000000009960
0CCCCCCC99999960
00CCC99999999600
.00CCCC99999600.
..000000000000..`

const selected_col = color`6`
const normal_col = color`2`
let current_selected = 0

let level_started = false
let level_finished = false
let transition_complete = false
let in_menu = true

let current_player = null

let dice_thrown = false

let current_dice = null

let crystals_collected = 0
let total_crystals = 0
let level_lost = false

class Player
{
  constructor(x,y,c_x,c_y,plr_obj,cursor_obj,cursor_direction){
    this.x = x
    this.y = y
    this.c_x = c_x
    this.c_y = c_y
    this.plr_obj = plr_obj
    this.cursor_obj = cursor_obj // [r,d,l,u]
    this.cursor_direction = cursor_direction

    addSprite(this.x,this.y,this.plr_obj) //Add player
    addSprite(this.c_x,this.c_y,this.cursor_obj[this.cursor_direction]) //Add cursor
  }
  
  get_direction_x(){
    if(this.cursor_direction == 0){
      return 1
    }
    else if(this.cursor_direction == 2){
      return -1
    }
    else{
      return 0
    }
  }
  
  get_direction_y(){
    if(this.cursor_direction == 1){
      return 1
    }
    else if(this.cursor_direction == 3){
      return -1
    }
    else{
      return 0
    }
  }

  update_player_pos(x,y){
    this.x = x
    this.y = y

    this.c_x = this.x+this.get_direction_x()
    this.c_y = this.y+this.get_direction_y()

    getFirst(this.cursor_obj[this.cursor_direction]).x = this.c_x
    getFirst(this.cursor_obj[this.cursor_direction]).y = this.c_y
    
  }

  rotate_cursor(clockwise){
    let prev_idx = this.cursor_direction
    if(clockwise){
      this.cursor_direction += 1
    }
    else{
      this.cursor_direction -= 1
    }

    if(this.cursor_direction > 3){
      this.cursor_direction = 0
    }
    else if(this.cursor_direction < 0){
      this.cursor_direction = 3
    }
    getFirst(this.cursor_obj[prev_idx]).type = this.cursor_obj[this.cursor_direction]

    this.update_player_pos(this.x, this.y)
  }

  is_on_crystal(){
    let current_tile = getTile(this.x, this.y)
    for(let idx = 0; idx < current_tile.length; idx++){
      if(current_tile[idx].type == "*" || current_tile[idx].type == "+" ){
        return true
      }
    }
    
    return false
  }

  is_on_exit(){
    return false
  }
  
  cursor_is_free(){
    let c_tile = getTile(this.c_x, this.c_y)
  
    for(let idx = 0; idx < c_tile.length; idx++){
      if(c_tile[idx].type == wall || c_tile[idx].type == box){
        return false
      }
    }
    return true
  }
}

class SpriteAnimation //Weird bug: will not properly animate final frame on looping animations, so just repeat first frame at end of frames array
{
  constructor(x,y,frames,is_loop){
    this.x = x
    this.y = y
    this.frames = frames //[frame 1, frame 2, ...]
    this.is_loop = is_loop
    this.current_frame = 0
    this.current_sprite = null
    this.current_interval = null

    addSprite(this.x, this.y, this.frames[0])
    this.current_sprite = this.find_sprite()

    this.current_interval = setInterval(this.change_frame.bind(this), 100)
  }

  find_sprite(){
    let this_type_all = getAll(this.frames[this.current_frame])
    let found_sprite = null
    for(let idx = 0; idx < this_type_all.length; idx++){
      if(this_type_all[idx].x == this.x && this_type_all[idx].y == this.y){ found_sprite = this_type_all[idx]}
    }
    return found_sprite
  }

  change_frame(){
    this.current_frame += 1
    this.current_sprite.remove()
    addSprite(this.x,this.y,this.frames[this.current_frame])
    this.current_sprite = this.find_sprite()
    
    
    if(this.current_frame == this.frames.length-1 && this.is_loop){
      this.current_frame = 0
    }
    else if (this.current_frame == this.frames.length-1){
      this.destroy_animation()
    }
  }

  destroy_animation(){
    clearInterval(this.current_interval)
    this.current_interval = null
    this.current_sprite.remove()
  }
}

class Dice
{
  constructor(x,y,direction,dice_sprites,current_face){
    this.x = x
    this.y = y
    this.dice_sprites = dice_sprites
    this.direction = direction //[x,y]
    this.current_face = current_face
    this.current_dice_interval = null
    this.dice_exploded = false
    addSprite(this.x,this.y,this.dice_sprites[this.current_face-1])

    this.current_dice_interval = setInterval(this.move_dice.bind(this), 200)
  }

  update_pos(x,y){
    this.x = x
    this.y = y

    getFirst(this.dice_sprites[this.current_face-1]).x = this.x
    getFirst(this.dice_sprites[this.current_face-1]).y = this.y
  }
  
  update_dice_sprite(){
    const old_idx = this.current_face
    this.current_face += 1
    getFirst(this.dice_sprites[old_idx-1]).remove()
    addSprite(this.x,this.y,this.dice_sprites[this.current_face-1])
  }
  
  move_dice(){ // use setInterval(func,ms) to call this method
    if(this.current_face == 1 && !this.dice_exploded){
      let next_tile = getTile(this.x + this.direction[0], this.y + this.direction[1])
      try{
        if(dice_walls.includes(next_tile[0].type)){
          this.explode_dice()
        }
      }
      catch(no_tiles_present){}
    }
    if(this.current_face <= 5 && !this.dice_exploded){
      this.update_dice_sprite()
      getFirst(this.dice_sprites[this.current_face-1]).x += this.direction[0]
      getFirst(this.dice_sprites[this.current_face-1]).y += this.direction[1]
      this.update_pos(getFirst(this.dice_sprites[this.current_face-1]).x,getFirst(this.dice_sprites[this.current_face-1]).y)
      //console.log(this.x + " " + this.y)

      //Check if next tile contains a wall or box
      let next_tile = getTile(this.x + this.direction[0], this.y + this.direction[1])
      try{
        if(dice_walls.includes(next_tile[0].type)){
          this.explode_dice()
        }
      }
      catch(no_tiles_present){}
    }
    else if(this.current_face == 6 && !this.dice_exploded){
      this.explode_dice()
    }
    else if(this.dice_exploded){
      clearInterval(this.current_dice_interval)
      this.current_dice_interval = null
      getFirst(this.dice_sprites[this.current_face-1]).remove()
      current_dice = null
    }
  }
  
  explode_dice(){
    //Spawn explosions
    this.dice_exploded = true
    for(var idx = -this.current_face; idx <= this.current_face; idx++){
      if(idx == 0){
        let n_x = this.x + (idx * this.direction[1])
        let n_y = this.y + (idx * this.direction[0])
        let tile_info = getTile(n_x, n_y)

        if(tile_info[0].type == crystal_1 || tile_info[0].type == crystal_2){
            tile_info[0].remove()
            stop_crystal_anim(n_x,n_y)
            lose_level()
          }
        continue
      } 
      try{
        let n_x = this.x + (idx * this.direction[1])
        let n_y = this.y + (idx * this.direction[0])
        let tile_info = getTile(n_x, n_y)
        try{
          if(tile_info[0].type == box || tile_info[0].type == push_box){
            tile_info[0].remove()
          }
          else if(tile_info[0].type == crystal_1 || tile_info[0].type == crystal_2){
            tile_info[0].remove()
            stop_crystal_anim(n_x,n_y)
            lose_level()
          }
        }
        catch(no_tiles){}
        
        let explosion = new SpriteAnimation(n_x, n_y, explosion_frames, false)
      }
      catch(out_of_bounds){}
    }
  }
  
}

class ScreenTransitioner{
  constructor(cover_map_key){
    this.cover_map_key = cover_map_key
    this.current_transition = null
    this.draw_x = 0
    this.draw_y = 0
    this.transitioning = false
    this.transition_finished = false
  }

  cover_screen(){
    for(let n_y = 0; n_y < height(); n_y++){
      for(let n_x = 0; n_x < width(); n_x++){
        addSprite(n_x,n_y,this.cover_map_key)
      }
    }
  }
  
  in(){
    for(this.draw_x; this.draw_x < width(); this.draw_x++){
      let tile_info = getTile(this.draw_x, this.draw_y)

      for(let idx = 0; idx < tile_info.length; idx++){
        if(tile_info[idx].type == this.cover_map_key){
          tile_info[idx].remove()
        }
      }
    }
    this.draw_x = 0
    this.draw_y++
    if(this.draw_y >= height()){
      clearInterval(this.current_interval)
      this.current_interval = null
      this.transitioning = false
      this.transition_finished = true
    }
  }
  
  out(){
    for(this.draw_x; this.draw_x > -1; this.draw_x--){
      addSprite(this.draw_x, this.draw_y, this.cover_map_key)
    }
    this.draw_x = width()-1
    this.draw_y -= 1
    if(this.draw_y <= -1){
      clearInterval(this.current_interval)
      this.current_interval = null
      this.transitioning = false
      this.transition_finished = true
    }
  }

  fade_in(speed){
    this.transitioning = true
    this.draw_x = 0
    this.draw_y = 0
    this.current_interval = setInterval(this.in.bind(this), speed)
  }

  fade_out(speed){
    this.transitioning = true
    this.draw_x = width()-1
    this.draw_y = height()-1
    this.current_interval = setInterval(this.out.bind(this), speed)
  }

  is_transition_finished()
  {
    if(this.transition_finished){
      this.transition_finished = false
      return true
    }
    else{
      return false
    }
  }
}

let screen_transitioner = new ScreenTransitioner(screen_transition)

setLegend(
  [screen_transition, bitmap`
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
  [player, player_normal],
  [cursor_right, bitmap`
................
................
................
2...............
02..............
602.............
6602............
66602...........
66602...........
6602............
602.............
02..............
2...............
................
................
................`],
  [cursor_up, bitmap`
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
.......22.......
......2002......
.....206602.....
....20666602....
...2066666602...`],
  [cursor_left, bitmap`
................
................
................
...............2
..............20
.............206
............2066
...........20666
...........20666
............2066
.............206
..............20
...............2
................
................
................`],
  [cursor_down, bitmap`
...2066666602...
....20666602....
.....206602.....
......2002......
.......22.......
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
................`],
  [ dice_1, bitmap`
0000000000000000
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0122222002222220
0122222002222220
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0111111111111110
0000000000000000`],
  [ dice_2, bitmap`
0000000000000000
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0122222002222220
0122222002222220
0122222222222220
0122222222222220
0122222002222220
0122222002222220
0122222222222220
0122222222222220
0122222222222220
0111111111111110
0000000000000000`],
  [ dice_3, bitmap`
0000000000000000
0122222222222220
0122222002222220
0122222002222220
0122222222222220
0122222222222220
0122222222222220
0122222002222220
0122222002222220
0122222222222220
0122222222222220
0122222222222220
0122222002222220
0122222002222220
0111111111111110
0000000000000000`],
  [ dice_4, bitmap`
0000000000000000
0122222222222220
0122222222222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0122222222222220
0122222222222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0122222222222220
0111111111111110
0000000000000000`],
  [ dice_5, bitmap`
0000000000000000
0122222222222220
0122222222222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0122222002222220
0122222002222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0122222222222220
0111111111111110
0000000000000000`],
  [ dice_6, bitmap`
0000000000000000
0122222222222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0122222222222220
0122002222002220
0122002222002220
0122222222222220
0111111111111110
0000000000000000`],
  [explosion_1, bitmap`................
................
................
................
................
................
......626.......
......2226......
......6226......
.......62.......
................
................
................
................
................
................`],
  [explosion_2, bitmap`................
...66...........
...666..........
...666666.......
...666666.......
....622666666...
....622226666...
....662222266...
....662222666...
...662222266....
...622262266....
..6622666666....
..6666..66666...
..666....6666...
................
................`],
  [explosion_3, bitmap`..966........96.
.9666.......6969
.662699.....9669
.966669......66.
..66969......9..
................
................
................
................
..99............
.9669...........
.66669..........
.96266.......9..
.966666.....969.
.99999......666.
................`],
  [explosion_4, bitmap`.9............9.
969............9
.99.............
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
.6..............
.99...........99`],
  [explosion_5, bitmap`................
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
................`],
  [push_box, bitmap`
0000000000000000
0DDDD444444DDDD0
0DD4444444444DD0
0000000000000000
.000DDDDDDDD000.
.0D0044444400D0.
.0DD00044000DD0.
.0D4440000444D0.
.0D4440000444D0.
.0DD40044004DD0.
.0D0044444400D0.
.000DDDDDDDD000.
0000000000000000
0DDDD444444DDDD0
0DD4444444444DD0
0000000000000000`],
  [box, bitmap`0000000000000000
0FFFF666666FFFF0
0FF6666666666FF0
0000000000000000
.000FFFFFFFF000.
.0F0066666600F0.
.0FF00066000FF0.
.0F6660000666F0.
.0F6660000666F0.
.0FF60066006FF0.
.0F0066666600F0.
.000FFFFFFFF000.
0000000000000000
0FFFF666666FFFF0
0FF6666666666FF0
0000000000000000`],
  [crystal_1, bitmap`
.......22.......
......2222......
......2662......
.....226622.....
....22699622....
....26699662....
...2266996622...
..226699996622..
..266699996662..
.22669999996622.
..226699996622..
...2266996622...
....22699622....
.....226622.....
......2222......
.......22.......`],
  [crystal_2, bitmap`
................
.......22.......
.......22.......
......2222......
.....226622.....
.....266662.....
....22699622....
...2266996622...
...2669999662...
..226699996622..
...2266996622...
....22699622....
.....226622.....
......2222......
.......22.......
................`],
  [exit_1, bitmap`
....22222222....
...2266666622...
..226669966622..
.22669999996622.
2266999999996622
2669999999999662
2669999339999662
2699993333999962
2699993333999962
2669999339999662
2669999999999662
2266999999996622
.22669999996622.
..226669966622..
...2266666622...
....22222222....`],
  [exit_2, bitmap`
....22222222....
...2211111122...
..22111LL11122..
.2211LLLLLL1122.
2211LLLLLLLL1122
211LLLLLLLLLL112
211LLLL00LLLL112
21LLLL0000LLLL12
21LLLL0000LLLL12
211LLLL00LLLL112
211LLLLLLLLLL112
2211LLLLLLLL1122
.2211LLLLLL1122.
..22111LL11122..
...2211111122...
....22222222....`],
  [start_tile, bitmap`
HHHHH888888HHHHH
HHHH888HH888HHHH
HHH888HHHH888HHH
HH888HHHHHH888HH
H888HHHHHHHH888H
88HHH88HH88HHH88
8HH8888HH8888HH8
8888HH8888HH8888
8888HH8888HH8888
8HH8888HH8888HH8
88HHH88HH88HHH88
H888HHHHHHHH888H
HH888HHHHHH888HH
HHH888HHHH888HHH
HHHH888HH888HHHH
HHHHH888888HHHHH`],
  [floor, bitmap`8HHHHHHHHHHHHHHH
8HHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
8HHHHHHHHHHHHHHH
888HH888888HHH88
HHHHHHH8HHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHH8HHHHHHHH
HH88HHH888888888
HHHHHHHHHHHH8HHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHH8HHH
88888HHHH8888888`],
  [wall, bitmap`0000000000000000
0577777777777750
0557777777777550
0555777777775550
0555577777755550
0555557777555550
0555555775555550
0555555555555550
0555555555555550
0555555775555550
0555557777555550
0555577777755550
0555777777775550
0557777777777550
0577777777777750
0000000000000000`],
  [space, bitmap`
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000020000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000200000`],
)

setSolids([wall, player, dice_1, dice_2, dice_3, dice_4, dice_5, dice_6, box, push_box])

let level = 0
const levels = [

    map`
............
............
............
............
............
............
............
............
............
............`, // Main menu
  map`
ooooooooooooooooo
ooooooooooooooooo
ooooooooowwwwwooo
ooooooooow.#.wooo
ooooooooowwrwwooo
oooooooooowrwoooo
ooowwwwwoowrwoooo
ooow...wwww.woooo
ooow.s......woooo
ooow...wwwwwwoooo
ooowwwwwooooooooo
ooooooooooooooooo
ooooooooooooooooo`, // l1
  map`
ooooooooooooooooo
ooooooooooooooooo
ooowwwwwwwwwwwwww
ooow....r...*....
wwww.....w.......
...w.....wwww....
.s....*..wwwwwww$
...w.....wwww....
wwww.....w.......
ooow....r...*....
ooowwwwwwwwwwwwww
ooooooooooooooooo
ooooooooooooooooo`, // temp1
  map`
ooooooooooooooooo
owwwwwwwwwwwwwwwo
ow.r..*r*..r*.$wo
ow.r*..r...r.wwwo
ow.w...r...r.wooo
ow.w...r...r.wooo
ow.w...r...r.wooo
ow.w...r...r.wooo
ow.w...r...r.wooo
owsw...r...r.wooo
owwwwwwwwwwwwwooo
ooooooooooooooooo
ooooooooooooooooo`, // temp2
  map`
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
oowwwoowwwoowwwoo
oow*woow$woow*woo
wwwrwwww.wwwwrwww
w*r.....s.....r*w
wwwwwwwwwwwwwwwww
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo`, // l2
  map`
ooooooooooooooooo
ooooooooooooooooo
oooooowwwwwoooooo
oooooow$.*woooooo
oooooowww.woooooo
owwwwwwww.wwwwwwo
ow..r*rrrrrrr*rwo
ow...........r.wo
ows............wo
owwwwwwwwwwwwwwwo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo`, // l3
  map`
ooooooooooowwwooooo
ooooooooooow*wooooo
ooowwwwwwwwwrwwwooo
owww....r.....$wooo
ow*r...........wooo
owww...........wooo
ooow...........wooo
ooowr....s.....wooo
ooow.........r.wooo
ooow...........wwwo
ooow...........r*wo
ooow.....r.....wwwo
ooowwrwwwwwwwwwwooo
oooow*woooooooooooo
oooowwwoooooooooooo`, // l4
  map`
ooooooooooooooooooo
ooooooooooooooooooo
owwwwwwwwwwwooooooo
ow$r.......wooooooo
owwwwwwwww.wooooooo
oowwwwwwow.wooooooo
oow.rr*wow.wooooooo
oow.wwwwow.wooooooo
www.wwwwww.wwwwwwww
w*r........r.....*w
wwwwwwwwwwswwwwwwww
ooooooooowwwooooooo
ooooooooooooooooooo
ooooooooooooooooooo
ooooooooooooooooooo`, // l5
  map`
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooowwwwwwwooooo
ooowww.....wooooo
ooow#r.....wooooo
ooowww..s..wooooo
ooooow..@..wooooo
oooooww...wwooooo
oooooowwwwwoooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo`, // l6
  map`
oooooowwwowwwoooooo
oooooow*wow$woooooo
oooooow.wow.woooooo
oooooow.wowrwoooooo
oooooow.wow.woooooo
oooooowrwow.woooooo
oooooow.wow.woooooo
oooooow.wowrwoooooo
oooooow.wow.woooooo
oooooowrwow@woooooo
oooooow@wow.woooooo
oooooow.www.woooooo
oooooow.....woooooo
oooooow..s..woooooo
oooooowwwwwwwoooooo`, // l7
  map`
oooowwwwwwwwwwwwwoooo
oooow...........woooo
oooow...@.......woooo
oooow..wwwwwwww.woooo
oooow..wwooooow.woooo
oooow...wooooow.woooo
oooow...wooooww.woooo
oooowww.wwwwww..woooo
oowwww.........wwwwoo
oow*r...........r*woo
oowwww.........wwwwoo
oooow...........woooo
oooow...........woooo
oooow.....s.....wwooo
oooow.....$.....woooo
oooowwwwwwwwwwwwwoooo
ooooooooooooooooooooo`, // l8
  map`
oowwwoowwwoo
www.woow.www
w*r.wwww.r*w
www......www
www......www
w..@.s$.@..w
www.wwww.www
ow*rwoowr*wo
oww.woow.wwo
oowwwoowwwoo`, // l9
  map`
............
............
............
............
............
............
............
............
............
............`, // End screen
]

setMap(levels[level])
setBackground(screen_transition)

setPushables({
  [player]: [push_box],
  [push_box]: [player],
  [wall]: [],
  [box]: [],
  [dice_1]: [],
  [dice_2]: [],
  [dice_3]: [],
  [dice_4]: [],
  [dice_5]: [],
  [dice_6]: [],
})

// Update Functions

screen_transitioner.cover_screen()
screen_transitioner.fade_in(35)
show_main_menu()

function show_main_menu(){
  clearText()
  addText("  DICE GRENADE LITE", {
  x: Math.ceil(width()/2)-7,
  y: Math.ceil(height()/2)-3,
  color: color`2`,
  })
  addText("Play" + (current_selected == 0 ? " <-" : ""), {
  x: Math.ceil(width()/2)-5,
  y: Math.ceil(height()/2)+3,
  color: current_selected == 0 ? selected_col : normal_col,
  })
  addText("Mute:OFF" + (current_selected == 1 ? " <-" : ""), {
  x: Math.ceil(width()/2)-5,
  y: Math.ceil(height()/2)+5,
  color: current_selected == 1 ? selected_col : normal_col,
  })
  addText("Test setting" + (current_selected == 2 ? " <-" : ""), {
  x: Math.ceil(width()/2)-5,
  y: Math.ceil(height()/2)+7,
  color: current_selected == 2 ? selected_col : normal_col,
  })
}

function onStart(){
  clearText()
  addText("Press I to start...", {
  x: 0,
  y: 0,
  color: color`2`,
  })

  find_crystals()
}

function start_level(){
  //Remove animated crystals and their object references
  let bad_idx = []
  for(let idx = 0; idx < crystals_animated.length; idx++){
    crystals_animated[idx].destroy_animation()
  }
  crystals_animated = []
  //Reset level values and load next level

  //Check if we are in an end level or a normal level
  setMap(levels[level])
  if(level == 12){
    show_end_text()
    setBackground(screen_transition)
    level_finished = false
    level_started = false
    crystals_collected = 0
    level_lost = false
  }
  else{
    if(level_finished)
    {
      screen_transitioner.cover_screen()
      screen_transitioner.fade_in(35)
    }
  
    level_finished = false
    level_started = false
    crystals_collected = 0
    level_lost = false
    onStart()
  }
  
}

function lose_level(){
  level_started = false
  level_lost = true

  clearText()
  addText("Crystal destroyed,\nPress I to try\nagain...", {
  x: 0,
  y: 0,
  color: color`2`,
  })
}

function set_portal(){
  try{
     if(crystals_collected >= total_crystals){
        let exit_info = getFirst(exit_2)
        let t_x = exit_info.x
        let t_y = exit_info.y
        exit_info.remove()
        addSprite(t_x,t_y,exit_1)
      }
  } catch(no_exit) {}
}

function find_crystals(){
  let current_crystals = getAll(crystal_1)
  total_crystals = current_crystals.length

  for(let idx = 0; idx < current_crystals.length; idx++){
    crystals_animated.push(new SpriteAnimation(current_crystals[idx].x, current_crystals[idx].y, crystal_frames, true))
    current_crystals[idx].remove()
  }
}

function stop_crystal_anim(x,y){
  let to_remove = null
  for(let idx = 0; idx < crystals_animated.length; idx++){
    if(crystals_animated[idx].x == x && crystals_animated[idx].y == y){
      crystals_animated[idx].destroy_animation()
      to_remove = idx
    }
  }
  crystals_animated.splice(to_remove, to_remove)
}

function show_level_text(){
    clearText()
    addText(crystals_collected + "/" + total_crystals, {
    x: 0,
    y: 0,
    color: color`2`,
    })
    addText("Level:" + (level), {
    x: 12,
    y: 0,
    color: color`2`,
    })
}
function show_end_text(){
  clearText()
  addText("You win", {
    x: Math.floor(width()/2),
    y: Math.floor(height()/2),
    color: color`2`,
    })
  addText("Thanks for playing", {
    x: Math.floor(width()/2)-5,
    y: Math.floor(height()/2)+2,
    color: color`2`,
    })
}

function update()
{
  if(level_started){ //main level loop
    //Update screen text
    show_level_text()
    //Check if crystal is touching player
    if(current_player.is_on_crystal()){
      let c_tile = getTile(current_player.x, current_player.y)
      for(let idx = 0; idx < c_tile.length; idx++){
        if(c_tile[idx].type == "*" || c_tile[idx].type == "+"){
          stop_crystal_anim(c_tile[idx].x, c_tile[idx].y)
          crystals_collected++
        }
      }
    }
    //Check if all crystals have been collected
    set_portal()
    //Check if player is on activated exit
    if(tilesWith(player,exit_1).length > 0 && !level_finished){
      //end level
      level_finished = true
    }
    //Transition stuff
    let b = screen_transitioner.is_transition_finished()
    
    if(level_finished && !screen_transitioner.transitioning && !b){
      console.log("fade out")
      screen_transitioner.fade_out(35)
    }
    if(!screen_transitioner.transitioning && b && level_finished){
      level += 1
      start_level()
    }
  }
}

//onStart()
setInterval(update, 1)

//Movement Inputs

onInput("s", () => {
  //Main menu input
  if(in_menu){
    current_selected += 1

    if(current_selected > 2){
      current_selected = 0
    }
    show_main_menu()
  }
  //Game input
  if(!level_started){return}
  getFirst(player).y += 1
  current_player.update_player_pos(getFirst(player).x,getFirst(player).y)
})

onInput("w", () => {
  //Main menu input
  if(in_menu){
    current_selected -= 1

    if(current_selected < 0){
      current_selected = 2
    }
    show_main_menu()
  }
  //Game input
  if(!level_started){return}
  getFirst(player).y -= 1
  current_player.update_player_pos(getFirst(player).x,getFirst(player).y)
})

onInput("a", () => {
  if(in_menu && current_selected == 0){
    in_menu = false
    level += 1
    setBackground(floor)
    start_level()
  }
  if(!level_started){return}
  getFirst(player).x -= 1
  current_player.update_player_pos(getFirst(player).x,getFirst(player).y)
})

onInput("d", () => {
  if(!level_started){return}
  getFirst(player).x += 1
  current_player.update_player_pos(getFirst(player).x,getFirst(player).y)
})

// Action inputs
onInput("i", () =>{ //start or reset level
  if(in_menu){return}
  if(level_started || level_lost){
    start_level()
  }
  else{
    let plr_spawn = getFirst(start_tile)
    current_player = new Player(plr_spawn.x,plr_spawn.y,plr_spawn.x+1,plr_spawn.y,player,[cursor_right, cursor_down, cursor_left, cursor_up],0)
    level_started = true
  }
})
onInput("j", () => { //Rotate Dice cursor clockwise
  if(!level_started){return}
  current_player.rotate_cursor(true)
})
onInput("l", () => { //Rotate Dice cursor counter-clockwise
  if(!level_started){return}
  current_player.rotate_cursor(false)
})
onInput("k", () => { //throw dice in direction cursor is facing
  if(!level_started || current_dice != null || !current_player.cursor_is_free()){return}
  current_dice = new Dice(current_player.c_x, current_player.c_y, [current_player.get_direction_x(), current_player.get_direction_y()], dice_sprites_ls,1)
})

afterInput(() => {
})