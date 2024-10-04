/*
@title: creepy_crush
@author: issac
@tags: ['puzzle']
@addedOn: 2022-11-27

INSTRUCTIONS:

Swap neighboring tiles to create vertical and horizontal runs of three or more matching tiles.
Four-tile matches earn a cross that acts as a bomb.
Five-tile matches earn an hourglass that extends the timer by thirty seconds.

Use WASD to move the cursor and I to select a tile.
The X tile in the scorebar restarts the game.

*/

const MAIN_LOOP_LATENCY = 400;
const TIMER_MAX = 120;
const TIMER_BOOST = 30;
const TILES_PER_GAME = 6;

const bg_tile = "y";
const score_tile = "z";
const crystal_ball = "a";
const candle = "b";
const skull = "c";
const stone = "d";
const bat = "e";
const ghost = "f";
const potion = "g";
const moon = "h";
const hand = "i";
const olantern = "j";
const cursor1 = "k";
const cursor2 = "l";
const cursor3 = "m";
const cursor4 = "n";
const select = "o";
const splode1 = "p";
const splode2 = "q";
const concede = "r";
const cross = "s";
const hourglass = "t";
const witch_hat = "u";
const web = "v";
const devil = "w";
const owl = "x";
const pentagram = "0";

setLegend(
  [ cursor1, bitmap`
66..66..66..66..
66..66..66..6666
..............66
66..............
66..............
..............66
..............66
66..............
66..............
..............66
..............66
66..............
66..............
..............66
66..66..66..6666
66..66..66..66..`],
  [ cursor2, bitmap`
66.66..66..66.66
66.66..66..66.66
................
................
66............66
66............66
................
................
66............66
66............66
................
................
66............66
66............66
.66..66..66..66.
.66..66..66..66.`],
  [ cursor3, bitmap`
..66..66..66..66
6666..66..66..66
66..............
..............66
..............66
66..............
66..............
..............66
..............66
66..............
66..............
..............66
..............66
66..............
6666..66..66..66
..66..66..66..66`],
  [ cursor4, bitmap`
.66..66..66..66.
.66..66..66..66.
66............66
66............66
................
................
66............66
66............66
................
................
66............66
66............66
................
................
66.66..66..66.66
66.66..66..66.66`],
  [ splode1, bitmap`
.......99.......
.......969......
......9969......
.99...9669......
.96999962999....
.99626662669....
..9962222269....
...9622222699...
...962222666999.
...9626626999999
..9926996269....
..9669999669....
.96699..9669....
.9999...99699...
.99......9969...
.9........999...`],
  [ splode2, bitmap`
9999............
996999.....99999
.9666999.9996669
.996266999662269
..99222666626699
...996222222699.
....9622222269..
...996222222699.
.999622222222699
9966662222222269
9999966622666669
.....99662699999
.......96299....
.......9669.....
.......9999.....
........99......`],
  [ select, bitmap`
.66666666666666.
6666666666666666
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
6666666666666666
.66666666666666.`],
  [ concede, bitmap`
................
.....CCCCCC.....
....C333333C....
...2233333322...
..C2223333222C..
.C332223322233C.
.C333222222333C.
.C333322223333C.
.C333322223333C.
.C333222222333C.
.C332223322233C.
..C2223333222C..
...2233333322...
....C333333C....
.....CCCCCC.....
................`],
  [ bg_tile, bitmap`
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
  [ score_tile, bitmap`
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0`],
  [ stone, bitmap`
................
......11L11.....
.....11L1L11....
....111L11111...
...111L1111111..
...11111111111..
...12211212211..
...1212121212L..
...12211212211..
...1212121211L..
...12121212114..
...1111111111D..
.4.1111L1L1LD4D.
.D41LDL14DL14D4.
.4D4D4D4D4D4D4D.
................`],
  [ crystal_ball, bitmap`
................
......7777......
....77777775....
...7722277775...
...7222277775...
..77222277775L..
..77222777775L..
..77777777775L..
..77777777755L..
...777777755L...
...577777555L...
..11555555LLLL..
..11111111LLLL..
...1313131CLC...
...11111111LL...
................`],
  [ candle, bitmap`
................
......66........
.......69.......
.......69.......
......2222......
......2221......
......2221......
......2221......
......2221......
......2221......
......2211...9C.
..99999999999CC.
..999999C9C9CC..
...99C9C9C9CCC..
....99CCCCCC....
................`],
  [ skull, bitmap`
................
....2222222.....
...222222111....
..2222211111L...
..222211111LL...
..22222122221...
..20002220001...
.2203002030011..
.220000200001L..
..22222222211L..
....L2L2L1LLL...
.....22211L.....
.....22221L.....
.....2L2L1L.....
.....2L2L1......
................`],
  [ bat, bitmap`
................
................
......1..1......
......1661......
...1..1111.1....
..1111.11.1111..
.11L11111111L11.
.1LL1LL11LL1LL1.
.1LL1LL11LL1LL1.
.1L.1.L11L.1.L1.
.1.....11.....1.
......1..1......
................
................
................
................`],
  [ ghost, bitmap`
0000000000000000
0000000000000000
0000000222220000
0000002222222000
0000002002002000
0222002002002000
0122222222222000
0011122222222220
0000122222222210
0000172727271100
0000727272720000
0077272727710000
0077727272710000
0011772727771000
0001777777771000
0000000000000000`],
  [ witch_hat, bitmap`
................
......8888......
......888H8.....
......888HH88...
.....888HHHHH8..
.....888HH......
.....888HH......
.....88HHH......
.....888HHH.....
.....6666HL.....
....L6LL6LLL....
....L6666LLL....
.88888HHHHHHHH..
.88LLL0000LLLHH.
..HHHHHHHHHHHH..
................`],
  [ web, bitmap`
................
.2222...........
.222.2222221....
..2.22..22.2222.
..22..222....2..
..2.2...22..22..
...2.2..22222...
...2.222...222..
...2.2.2..22.12.
...22..12.2.....
....2...122.....
....2..22222....
....2.22...12...
....122.....12..
.....2.......1..
................`],
  [ devil, bitmap`
................
....3......3....
....3CCCCCC3....
...C33333333C...
...C30033003C...
..333300003333..
..336633C36633..
..336063C60633..
...36663C6663...
...3CC33C3CC3...
...3333CC3333...
...331211213C...
...3331111C3C...
....333CC33C....
.....33CCCC.....
................`],
  [ owl, bitmap`
................
...55......55...
...55L....55L...
...555555555L...
...555555555L...
...557755775L...
..557027702755..
..557007700755..
..55577667755L..
..5555566555LL..
..55555FF5555L..
..555555555LLL..
...5555555L5L...
...55955LL9LL...
....999LL999....
................`],
  [ potion, bitmap`
................
.....222222.....
......2..1......
......2..1......
......2..2......
......2..2......
.....22..12.....
.....2HHH.2.....
....22H8H.11....
....2HHHHHH1....
...22HHH28H11...
...2HHHH88HH1...
...1H8HHHHHH1...
...11HHHHHH11...
....11111111....
................`],
  [ moon, bitmap`
................
.....666666.....
....6666........
...6666.........
..6666..........
.66666..........
.66666..........
.66666..........
.66666..........
.696666.........
.969666.........
..969666....66..
...9696666669...
....99969699....
.....999999.....
................`],
  [ hand, bitmap`
................
................
.........4......
.......4.4.4....
.......4.4.4....
.......4.4.4....
....4..4.4.4..4.
....4..4.4.4.44.
....44.4444444..
.....4D444444...
.....44DD444D...
.....D444D44D...
......D4444D....
......DD44D.....
.......44DD.....
.......44DD.....`],
  [ olantern, bitmap`
................
........CC......
.......CC.......
.......CC.......
....99CCC999....
...9999999999...
..999999999999..
..996699996699..
..999F6996F999..
..99999999999C..
..996699996699..
..99966666699C..
..9999666699CC..
...C9999999CC...
.....CCCCCC.....
................`],
  [ cross, bitmap`
................
......6666......
......8668......
......8HH8......
...6888HH8886...
...66HHHHHH66...
...6888HH8886...
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8HH8......
......8668......
......6666......
................`],
  [ hourglass, bitmap`
................
...CCCCCCCCCC...
...2........2...
...2........2...
...2........2...
....2......2....
.....2FFFF2.....
......2FF2......
......2FF2......
.....2.FF.2.....
....2..FF..2....
...2..FFFF..2...
...2FFFFFFFF2...
...2FFFFFFFF2...
...CCCCCCCCCC...
................`],
  [ pentagram, bitmap`
0000000000000000
0000444444440000
0004400440044000
0040000440000400
0440004004000440
0444444444444440
0404040000404040
0400440000440040
0400044004400040
0400400440040040
0400404004040040
0444040000404440
0044400000044400
0004400000044000
0000444444440000
0000000000000000`],
);

const cursors = [cursor1, cursor2, cursor3, cursor4];
const tiles = [crystal_ball, candle, skull, stone, bat, ghost, witch_hat, web, devil, owl, potion, moon, hand, olantern, splode1, splode2, cross, hourglass, pentagram];
const tiles_to_add = [crystal_ball, candle, skull, stone, bat, ghost, witch_hat, web, devil, owl, potion, moon, hand, olantern];
let tiles_this_game = [];

const background = map`
..........
..........
..........
..........
..........
..........
..........
zzzzzzzzzz`;
setMap(background);
setBackground(bg_tile);

let made_move = false;
let restarting = false;
let awaiting_input = false;
let timer = TIMER_MAX;
let metatimer = 0;
let hiscore = 0;
let score = 0;
let selecting = false;
let tiles_changed = true;

addSprite(width()-3, height()-1, concede);

/*=========================================================================*/
function end_game(){

  awaiting_input = true;
  
  remove_cursor();
  stop_selecting();
  clear_tiles();

  addText( "GAME OVER", {x:5, y:7, color: color`2`} );

  if (score > hiscore){
    hiscore = score;
    addText( "HIGH SCORE!", {x:4, y:4, color: color`6`} );
  }

  restarting = true;
  
}
/*=========================================================================*/
function start_game(){

  timer = TIMER_MAX;
  
  score = 0;
  selecting = false;
  made_move = false;

  paint_score();

  clear_tiles();

  choose_tiles();

  const cursor = get_cursor_ref();
  if (!cursor) addSprite(0,0,cursor1);

  tiles_changed = true;
  restarting = false;
  
}
/*=========================================================================*/
function get_hv_dist(sprite1, sprite2){
  return Math.abs(sprite1.x - sprite2.x) + Math.abs(sprite1.y - sprite2.y);
}
/* ========================================================================= */
function wield_cross(sprite){
  for (let ix=sprite.x-1; ix<sprite.x+2; ix++){
    if (ix < 0 || ix > width() - 1) continue;
    const t = get_tile(ix, sprite.y);
    if (t) t.type = splode1;
  }
  for (let iy=sprite.y-1; iy<sprite.y+3; iy++){
    if (iy < 0 || iy > height() - 2) continue;
    const t = get_tile(sprite.x, iy);
    if (t) t.type = splode1;
  }
}
/* ========================================================================= */
function activate_pentagram(sprite){
  for (let ix=0; ix<width(); ix++){
    const t = get_tile(ix, sprite.y);
    if (t) t.type = splode1;
  }
  for (let iy=0; iy<height()-1; iy++){
    const t = get_tile(sprite.x, iy);
    if (t) t.type = splode1;
  }
}
/* ========================================================================= */
function poke(sprite){

  let special = false;
  let hsploding = false;
  let vsploding = false;
  let matching = false;
  let match_count = 0;
  let match_type = "1";

  if (sprite.type == cross){
    wield_cross(sprite);
    special = true;
  } else if (sprite.type == hourglass){
    timer += TIMER_BOOST;
    sprite.type = splode1;
    special = true;
  } else if (sprite.type == pentagram){
    activate_pentagram(sprite);
    special = true;
  }
  
  for (let ix=0; ix<width(); ix++){
    const tile = get_gem_tile(ix, sprite.y);
    
    if (!tile){
      matching = false;
      match_count = 0;
      match_type = 1;
      continue;
    }
    if (tile.y < height()-2 && !get_tile(tile.x, tile.y+1)) continue;

    if (tile.type == match_type){
      matching = true;
      match_count += 1;
      if (made_move && hsploding){
        if (match_count > 4){
          tile.type = pentagram;
        } else if (match_count > 3){
          tile.type = hourglass;
        } else if (match_count > 2){
          tile.type = cross;
        }
      }
      if (match_count == 2){
        hsploding = true;
        let t = get_gem_tile(ix-2, sprite.y);
        if (t) t.type = splode1;
        t = get_gem_tile(ix-1, sprite.y);
        if (t) t.type = splode1;
        tile.type = splode1;
      } 
    } else {
      if (tile.type == splode1 || tile.type == splode2){
        match_type = "1";
      } else {
        match_type = tile.type;
      }
      matching = false;
      match_count = 0;
    }

  }

  matching = false;
  match_count = 0;
  match_type = "1";
  
  for (let iy=0; iy<height(); iy++){
    const tile = get_gem_tile(sprite.x, iy);

    if (!tile){
      matching = false;
      match_count = 0;
      match_type = 1;
      continue;
    }
    if (tile.y < height()-2 && !get_tile(tile.x, tile.y+1)) continue;
    
    if (tile.type == match_type){
      matching = true;
      match_count += 1;
      if (made_move && vsploding){
        if (match_count > 4){
          tile.type = pentagram;
        } else if (match_count > 3){
          tile.type = hourglass;
        } else if (match_count > 2){
          tile.type = cross;
        }
      }
      if (match_count == 2){
        vsploding = true;
        let t = get_gem_tile(sprite.x, iy-2);
        t.type = splode1;
        t = get_gem_tile(sprite.x, iy-1);
        t.type = splode1;
        tile.type = splode1;
      } 
    } else {
      if (tile.type == splode1 || tile.type == splode2){
        match_type = "1";
      } else {
        match_type = tile.type;
      }
      matching = false;
      match_count = 0;
    }

  }

  return special || hsploding || vsploding;

}
/* ========================================================================= */
function get_cursor_ref(){
  if (getFirst(cursor1)){
    return getFirst(cursor1);
  } else if (getFirst(cursor2)){
    return getFirst(cursor2);
  } else if (getFirst(cursor3)){
    return getFirst(cursor3);
  } else {
    return getFirst(cursor4);
  }
}
/* ========================================================================= */
function animate_sprites(){

  const cursor = get_cursor_ref();
  if (cursor.type == cursor1){
    cursor.type = cursor2;
  } else if (cursor.type == cursor2){
    cursor.type = cursor3;
  } else if (cursor.type == cursor3){
    cursor.type = cursor4;
  } else {
    cursor.type = cursor1;
  }

  const splode1s = getAll(splode1);
  for (let i=0; i<splode1s.length; i++){
    const sp = splode1s[i];
    sp.type = splode2;
  }

}
/*=========================================================================*/
function explode_tiles(){

  let scored = false;
  let this_score = 0;
  let score_inc = 100;
  const splode2s = getAll(splode2);
  for (let i=0; i<splode2s.length; i++){
    const sp = splode2s[i];
    sp.remove();
    if (made_move){
      this_score += score_inc;
      score_inc += 100;
      scored = true;
    }
    tiles_changed = true;
  }
  if (scored){
    score += this_score;
    paint_score(this_score);
  }
  
}
/*=========================================================================*/
function cursor_up(){
  const cursor = get_cursor_ref();
  if (cursor && cursor.y > 0){
    cursor.y -= 1;
  }
  awaiting_input = false;
}
/*=========================================================================*/
function cursor_down(){
  const cursor = get_cursor_ref();
  if (cursor && cursor.y < height()-1){
    cursor.y += 1;
    if (cursor.y == height()-1) cursor.x = width() - 3;
  }
  awaiting_input = false;
}
/*=========================================================================*/
function cursor_left(){
  const cursor = get_cursor_ref();
  if (cursor && cursor.y < height()-1 && cursor.x > 0){
    cursor.x -= 1;
  }
  awaiting_input = false;
}
/*=========================================================================*/
function cursor_right(){
  const cursor = get_cursor_ref();
  if (cursor && cursor.y < height()-1 && cursor.x < width()){
    cursor.x += 1;
  }
  awaiting_input = false;
}
/*=========================================================================*/
function remove_cursor(){
  const cursor = get_cursor_ref();
  if (cursor) cursor.remove();
}
/*=========================================================================*/
function stop_selecting(){
  const frame = getFirst(select);
  if (frame) frame.remove();
  selecting = false;
}
/*=========================================================================*/
function clear_tiles(){
  for (let i=0; i<tiles.length; i++){
    const tileset = getAll( tiles[i] );
    for (let i2=0; i2<tileset.length; i2++){
      tileset[i2].remove();
    }
  }
}
/*=========================================================================*/
function cursor_select(){
  const cursor = get_cursor_ref();
  if (!cursor) return;
  if (cursor.x == width()-3 && cursor.y == height()-1){
    if (selecting){
      stop_selecting();
    }
    restarting = true;
  } else if (selecting){
    made_move = true;
    const frame = getFirst(select);
    if (get_hv_dist(cursor, frame) == 1){
      const framed = get_tile(frame.x, frame.y);
      const cursed = get_tile(cursor.x, cursor.y);

      framed.x = cursor.x;
      framed.y = cursor.y;
      cursed.x = frame.x;
      cursed.y = frame.y;
      
      if (!poke(framed) && !poke(cursed)){
        framed.x = frame.x;
        framed.y = frame.y;
        cursed.x = cursor.x;
        cursed.y = cursor.y;
      } else tiles_changed = true;
      
      frame.remove();
      selecting = false;
    } else {
      frame.x = cursor.x;
      frame.y = cursor.y;
    }
  } else {
    addSprite(cursor.x, cursor.y, select);
    selecting = true;
  }
  awaiting_input = false;
}
/*=========================================================================*/
function get_tile(x, y){
  const tile_stack = getTile(x, y);    
  for(let i=0; i<tile_stack.length; i++){
    if (tiles.includes( tile_stack[i].type ) ){
      return tile_stack[i];
    }
  }
  return false;
}
/*=========================================================================*/
function get_gem_tile(x, y){
  const tile_stack = getTile(x, y);    
  for(let i=0; i<tile_stack.length; i++){
    if (tiles_to_add.includes( tile_stack[i].type ) ){
      return tile_stack[i];
    }
  }
  return false;
}
/*=========================================================================*/
function choose_tiles(){
  tiles_this_game = [];
  while (tiles_this_game.length < TILES_PER_GAME){
    const n = Math.floor(Math.random() * tiles_to_add.length);
    if (!tiles_this_game.includes( tiles_to_add[n] )){
      tiles_this_game.push( tiles_to_add[n] );
    }
  }
}
/*=========================================================================*/
function random_tile(){
  const i = Math.floor(Math.random() * TILES_PER_GAME);
  return tiles_this_game[i];
}
/*=========================================================================*/
function add_tiles(){
  for(let ix=0; ix<width(); ix++){
    if (!get_tile(ix, 0)){
      addSprite(ix, 0, random_tile());
      tiles_changed = true;
    }
  }
}
/*=========================================================================*/
function gravity(){
  let something_fell = false;
  
  for(let ix=0; ix<width(); ix++){
    for(let iy=height()-3; iy>=0; iy--){
      const this_tile = get_tile(ix,iy);
      if (!this_tile) continue;
      if (!get_tile(ix,iy+1)){
        this_tile.y += 1;
        something_fell = true;
      }
    }
  }
  
  return something_fell;
}
/*=========================================================================*/
function find_explosives(){

  let y = 0;
  for(let ix=0; ix<width(); ix++){
    const sprite = get_tile(ix, y);
    if (sprite){
      poke(sprite);
      y += 1;
      if (y == height()-1){
        y = height()-2;
      }
    }
  }
  
}
/*=========================================================================*/
function paint_score(this_score=0){
  clearText();
  if (this_score > 0){
    addText( "+ " + this_score, {x: 0, y: 15, color: color`6`} );
  } else {
    addText( "SCORE " + score, {x: 0, y: 15, color: color`2`} );
  }
  addText( " HIGH " + hiscore, {x: 0, y: 14, color: color`1`} );
  addText( " TIME", {x:15, y:14, color: color`1`} );
  addText( "  " + String(timer), {x:15, y:15, color: color`2`} );
}
/*=========================================================================*/
function tick(){

  explode_tiles();
  
  animate_sprites();

  if (tiles_changed){
    tiles_changed = false;
    if (!gravity()){
      find_explosives();
    }
    add_tiles();
  }

  if (made_move){
    metatimer += 1;
    if (metatimer == 4){
      timer -= 1;
      metatimer = 0;
      paint_score();
      if (timer == 0){
        end_game();
      }
    }
  }
  
}
/*=========================================================================*/
function loop(){ 
  if (awaiting_input){
    // do nothing
  } else if (restarting){
    start_game();
  } else {
    tick();
  }
  setTimeout(loop, MAIN_LOOP_LATENCY);
}
/*=========================================================================*/

onInput("w", cursor_up);
onInput("s", cursor_down);
onInput("a", cursor_left);
onInput("d", cursor_right);
onInput("i", cursor_select);

start_game();
loop();