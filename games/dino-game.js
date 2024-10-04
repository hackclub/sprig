/*
@title: Save Orpheus - Chrome Dino Game Remake
@author: @thetridentguy
@tags: ['retro']
@addedOn: 2024-03-29
*/

const dino = "d"
const raptor = "r"
const cactus1 = "0"
const cactus2 = "2"
const ground = "g"

setLegend(
  [dino, bitmap`
................
................
................
..........00000.
.........00.0000
.........0000000
.0.......0000000
.00......00000..
.000....0000....
.0000..000000...
..00000000000...
...000000000....
....0000000.....
.....00000......
.....0..0.......
.....00.00......`],
  [raptor, bitmap`
......0.........
......00........
......000.......
......0000......
......00000.....
...0..000000....
..000.0000000000
.00000000000....
000000000000000.
......00000.....
................
................
................
................
................
................`],
  [cactus1, bitmap`
.......00.......
......0000..0...
...0..0000.000..
..000.0000.000..
..000.0000.000..
..000.0000.000..
..000.0000.000..
..000.00000000..
..000.00000000..
..000.0000000...
..00000000......
..00000000......
...0000000......
......0000..000.
0.00000000000.00
000...0000......`],
  [cactus2, bitmap`
.....0..........
....000.........
....000.0...0...
..0.000.0..000..
..0.000.0..000.0
..0.000.0..000.0
..0.000.0..000.0
..0.000.0..000.0
..0.00000..000.0
..0.000....000.0
..0.000..0.00000
..00000..0.000..
....000..00000..
000.000....000..
0.000000.0000000
....000000.000..`],
  [ground, bitmap`
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
..000...........
000.0000000.0000
..........000...`]
)
  
var runmap = map`
........
dggggggg`
setMap(runmap)

var const_time = 500
var time = const_time
var const_jump_time = 800
var jump_time = 800
var min_time = 200
var jump = 0
var top_map = "........"
var bot_map = "gggggggg"
var top_next = "."
var next = "."
var top_first = "."
var bot_first = "."
var last = ground
var tick_timer
var jump_timer
var playing = 0
var score = 0
var waiting = false


function do_jump(){
    if(jump == 1){
        return
    }else{
        if(top_map[0] == raptor){
            game_over()
        }
        if(getFirst(dino).y){
          getFirst(dino).y -= 1
          jump = 1
          jump_timer = setTimeout(end_jump, jump_time);
        }
    }
}
  
function end_jump(){
        if(bot_map[0] != ground){
            game_over()
        }
        if(getFirst(dino).y == 0){ // ==0 bc otherwise it'll be false
          getFirst(dino).y += 1
          jump = 0
        }
}
  
onInput("w", () => {
    if(playing == 0 && !waiting){
      playing = 1
      addText("                   ", {
          x: 0,
          y: 6,
          color: color`0`
      });
      top_map = "........"
      bot_map = "gggggggg"  
      runmap = top_map + "\n" + bot_map
      setMap(runmap)
      addSprite(0, 1, dino)
      jump = 0
      tick()
    }else if(!waiting){
      do_jump()
    } 
})

function tick(){
    top_next = "."
    switch (last) {
        case ground:
            var options = [ground, ground, ground, ground, ground, ground, cactus1, cactus2, raptor]
            next = options[Math.floor(Math.random() * options.length)]
            last = next
            if(next == raptor){
                top_next = raptor
                next = ground
            }
            break;
        default:
            next = ground
            last = next
            break;
    }
    top_map = top_map.slice(1) + top_next
    bot_map = bot_map.slice(1) + next
    runmap = top_map + "\n" + bot_map
    setMap(runmap)
    if(jump == 0){
        if(bot_map[0] != ground){
          game_over()
          return
        }
        addSprite(0, 1, dino)
    }else{
        if(top_map[0] == raptor){
          game_over()
          return
        }
        addSprite(0, 0, dino)
    }
    if(time > min_time){
      time -= 10
      jump_time -= 10
    }
    score += const_time - time
    addText(String(1000000+score).slice(1), {
        x: 14,
        y: 6,
        color: color`0`
    });
    tick_timer = setTimeout(tick, time)
}

function game_over(){
    clearTimeout(tick_timer)
    clearTimeout(jump_timer)
    playing = 0
    score = 0
    time = const_time
    jump_time = const_jump_time
    addText("Game Over", {
        x: 0,
        y: 6,
        color: color`0`
    });
    waiting = true
    setTimeout(()=>{waiting = false}, 2000)
}

addText("Press W to start", {
    x: 0,
    y: 6,
    color: color`0`
});
