/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Little Farm
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const farmland = "f"
const coin = "c"
const seedbag = "s"
const wheatbag = "w"
const seed = "i"
const warterd_seed = "d"
const wheat = "r"
const shop = "h"
const lock5 = "l"
const lock10 = "a"
const lock20 = "q"
const lock50 = "t"
const lock100 = "z"
const street = "o"

let coins = 0;
let seeds = 1;
let wheat_bundles = 0;

setLegend(
  [ player, bitmap`
......00000000..
1...1.99999990..
1.1.1.9099099...
1.1.1..999999...
11111..799977...
..L.557777777755
..L.557777777755
..L.557777777755
.9L5557777777755
.9L5557777777755
..L...DDDDD77799
..L...DDDDDDDD99
..L...DDDDDDDD..
..L....55..55...
..L....55..55...
.......CC..CC...` ],
  [farmland, bitmap`
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
  [coin, bitmap`
LLLLL000000LLLLL
LLLL06666660LLLL
LLL0666666660LLL
LL066666666660LL
L06666FFFF66660L
L0666F6666F6660L
L066F666666F660L
L066F666666F660L
L066F666666F660L
L066F666666F660L
L0666F6666F6660L
L06666FFFF66660L
LL066666666660LL
LLL0666666660LLL
LLLL06666660LLLL
LLLLL000000LLLLL`],
  [seedbag, bitmap`
LLLLLLLLLLLLLLLL
LLLL00000000000L
LLL00CCCCCC0FF0L
LLL0FFFFFFFF0F0L
LLL00CCCCCC0FF0L
L000CCCCCCCC000L
L0CCCCCCCCCCCC0L
L0CCCCCC4CCCCC0L
L0CCC4CCCC4CCC0L
L0CCCCCC4CCCCC0L
L0CCC44CC4CCCC0L
L0CCCCC4CC4CCC0L
L0CCCCC4CCCCCC0L
L00CCCCCCCCCC00L
LL00CCCCCCCC00LL
LLL0000000000LLL`],
  [wheatbag, bitmap`
LLLLLLLLLLLLLLLL
LLLL00000000000L
LLL00CCCCCC0FF0L
LLL0FFFFFFFF0F0L
LLL00CCCCCC0FF0L
L000CCCCCCCC000L
L0CCCCCCCCCCCC0L
L0CCC6CCC6CCCC0L
L0CCC6C6C6C6CC0L
L0CCC666C666CC0L
L0CCCC66666CCC0L
L0CCCCFFFFCCCC0L
L0CCCCC66CCCCC0L
L00CCC6666CCC00L
LL00CCCCCCCC00LL
LLL0000000000LLL`],
  [seed, bitmap`
................
..........4...4.
...4..........4.
.......4........
.............4..
....4.4..4.4....
.4.4...4...4....
.......4........
.....4..........
..44.....4.4....
.......4........
.4..4.......4...
...4....4.......
....4...........
........4....4..
................`],
  [warterd_seed, bitmap`
................
..........4...4.
...4..7....7..4.
.7.7...4.7......
....7........4..
..7.4.47.4.4....
.4.4...4...4....
...7...4.7...7..
.....4..........
..44.7...4.4....
.......4.....7..
.47.4.7...7.4...
...4....4.....7.
....47...7......
.7......4....4..
................`],
  [wheat, bitmap`
........6.......
..6....666......
.666.6.666.6....
.666666.6.666...
..6.666666666...
.666.6.666.6....
.666666.6.666...
..6.66666F666.6.
.666.6.6FF.6.666
.666666.F.666666
..6.66F.F.66F.6.
.666.F..F..F.666
.66F.F..F..F.66F
..F..F..F..F..F.
..F..F..F..F..F.
..F..F..F..F..F.`],
  [shop, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L33223322332233L
3332233223322333
3002030200020003
3032030203020303
3302000203020003
3002030200020333
LLFFFFFFFFFFFFLL
LLFFFFFFFFFFFFLL
LLF75757FFCCCFLL
LLF57575FFCCCFLL
LLF11111FF6CCFLL
LLFFFFFFFFCCCFLL
LLLLLLLLLLLLLLLL
1111111111111111`],
  [lock5, bitmap`
................
......LLLL......
.....L1111L.....
....L1....1L....
....L1....1L....
....L1....1L....
...L11111111L...
...L11000011L...
...L11011111L...
...L11000111L...
...L11111011L...
...L11000111L...
...L11111111L...
....LLLLLLLL....
................
................`],
  [lock10, bitmap`
................
......LLLL......
.....L1111L.....
....L1....1L....
....L1....1L....
....L1....1L....
...L11111111L...
...L10110011L...
...L00101101L...
...L10101101L...
...L10101101L...
...L10110011L...
...L11111111L...
....LLLLLLLL....
................
................`],
  [lock20, bitmap`
................
......LLLL......
.....L1111L.....
....L1....1L....
....L1....1L....
....L1....1L....
...L11111111L...
...L10111011L...
...L01010101L...
...L10110101L...
...L01110101L...
...L00011011L...
...L11111111L...
....LLLLLLLL....
................
................`],
  [lock50, bitmap`
................
......LLLL......
.....L1111L.....
....L1....1L....
....L1....1L....
....L1....1L....
...L11111111L...
...L00011011L...
...L01110101L...
...L00110101L...
...L11010101L...
...L00111011L...
...L11111111L...
....LLLLLLLL....
................
................`],
  [lock100, bitmap`
................
......LLLL......
.....L1111L.....
....L1....1L....
....L1....1L....
....L1....1L....
...L11111111L...
...L10110101L...
...L00101010L...
...L10101010L...
...L10101010L...
...L10110101L...
...L11111111L...
....LLLLLLLL....
................
................`],
  [street, bitmap`
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
)
setBackground(farmland)
setSolids([shop, wheatbag, wheatbag, seedbag, seed])

let level = 0
const levels = [
  map`
plaaqqttzzh
llaaqqttzzz
aaaaqqttzzz
aaaaqqttzzz
qqqqqqttzzz
qqqqqqttzzz
ttttttttzzz
cooosooowoo`,
  map`
prrrrrrrrrh
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
cooosooowoo`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("i", () => {

  if(getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === shop)){
    console.log("player is on shop");
    if (wheat_bundles > 0){
      console.log("player has wheat");
      coins += (wheat_bundles * 1.5);
      wheat_bundles = 0;
    }else if(coins > 0){
      coins--;
      seeds++;
    }
    clearText()
    addText(coins.toString(), { 
      x: 2,
      y: 14,
      color: color`0`
    })
    
    addText(seeds.toString(), { 
      x: 10,
      y: 14,
      color: color`0`
    })
    
    addText(wheat_bundles.toString(), { 
      x: 17,
      y: 14,
      color: color`0`
    })
    
  }else if(getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock5) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock10) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock20) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock50) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock100) ){
    console.log("player is on lock");
    if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock5) && coins >= 5){
      coins -= 5;
      const c_lock = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === lock5);
      c_lock.remove();
    }else if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock10) && coins >= 10){
      coins -= 10;
      const c_lock = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === lock10);
      c_lock.remove();
    }else if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock20) && coins >= 20){
      coins -= 20;
      const c_lock = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === lock20);
      c_lock.remove();
    }else if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock50) && coins >= 50){
      coins -= 50;
      const c_lock = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === lock50);
      c_lock.remove();
    }else if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock100) && coins >= 100){
      coins -= 100;
      const c_lock = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === lock100);
      c_lock.remove();
    }
    
    clearText()
    addText(coins.toString(), { 
      x: 2,
      y: 14,
      color: color`0`
    })
    
    addText(seeds.toString(), { 
      x: 10,
      y: 14,
      color: color`0`
    })
    
    addText(wheat_bundles.toString(), { 
      x: 17,
      y: 14,
      color: color`0`
    })
    
  }else if (seeds > 0){ 
    if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === warterd_seed) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === seed) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock5) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock10) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock20) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock50) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === lock100) ||getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === seedbag) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === wheatbag) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === shop) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === street) || getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === coin)){
      
    }else{
      seeds -= 1;
      addSprite(getFirst(player).x, getFirst(player).y, seed);
      clearText()
      addText(coins.toString(), { 
        x: 2,
        y: 14,
        color: color`0`
      })
      
      addText(seeds.toString(), { 
        x: 10,
        y: 14,
        color: color`0`
      })
      
      addText(wheat_bundles.toString(), { 
        x: 17,
        y: 14,
        color: color`0`
      })
    }
  }else if(getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === wheat)){
    const c_wheat = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === wheat);
    c_wheat.remove();
    wheat_bundles += 1;
    clearText()
    addText(coins.toString(), { 
      x: 2,
      y: 14,
      color: color`0`
    })
    
    addText(seeds.toString(), { 
      x: 10,
      y: 14,
      color: color`0`
    })
    
    addText(wheat_bundles.toString(), { 
      x: 17,
      y: 14,
      color: color`0`
    })
  }
});

onInput("k", () => {
  if (getTile(getFirst(player).x, getFirst(player).y).some(s => s.type === seed)){
    const c_seed = getTile(getFirst(player).x, getFirst(player).y).find(s => s.type === seed);
    c_seed.remove();
    addSprite(getFirst(player).x, getFirst(player).y, warterd_seed);
    const cw_seed_x = getFirst(player).x;
    const cw_seed_y = getFirst(player).y;
    setTimeout(function(){
      const cw_seed = getTile(cw_seed_x,cw_seed_y).find(s => s.type === warterd_seed);
      cw_seed.remove();
      addSprite(cw_seed_x,cw_seed_y, wheat);
    }, 6000);
  }
});


addText(coins.toString(), { 
  x: 2,
  y: 14,
  color: color`0`
})

addText(seeds.toString(), { 
  x: 10,
  y: 14,
  color: color`0`
})

addText(wheat_bundles.toString(), { 
  x: 17,
  y: 14,
  color: color`0`
})

afterInput(() => {
  
})