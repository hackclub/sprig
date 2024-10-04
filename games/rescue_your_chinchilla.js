/*
@title: Rescue your chinchilla!
@author: KamilloDev
@tags: ['puzzle','adventure']
@addedOn: 2024-02-07
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/
const lever = 'y'
const player = "p"
const chinchilla = 'c'
const background = 'g'
const bush = 'b'
const wall = 'w'
const house = 'h'
const coin = 'l'
const teleporter_f = 't'
const teleporter_t = 'f'
const teleporter_f1 = 's'
const teleporter_t1 = 'v'

const fake_wall = 'r'
const music = tune`
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: C4^217.3913043478261 + B4~217.3913043478261,
217.3913043478261: C4^217.3913043478261 + B4~217.3913043478261 + C5~217.3913043478261 + D5/217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5~217.3913043478261 + D5/217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5~217.3913043478261 + B4~217.3913043478261 + D5/217.3913043478261,
217.3913043478261: C4^217.3913043478261 + B4~217.3913043478261 + D5/217.3913043478261,
217.3913043478261: C4^217.3913043478261 + B4~217.3913043478261,
217.3913043478261: C4^217.3913043478261 + B4~217.3913043478261 + C5~217.3913043478261,
217.3913043478261: C5~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: C5~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: B4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: B4~217.3913043478261 + A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: B4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: B4~217.3913043478261 + C5~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: C5~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5-217.3913043478261,
217.3913043478261: B4~217.3913043478261 + A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: A4~217.3913043478261 + C4^217.3913043478261,
217.3913043478261: A4~217.3913043478261 + B4~217.3913043478261 + C4^217.3913043478261 + C5/217.3913043478261,
217.3913043478261: B4~217.3913043478261 + C4^217.3913043478261 + C5/217.3913043478261,
217.3913043478261: B4~217.3913043478261 + C4^217.3913043478261 + C5/217.3913043478261,
217.3913043478261: B4~217.3913043478261 + C4^217.3913043478261 + C5/217.3913043478261,
217.3913043478261: C4^217.3913043478261 + C5/217.3913043478261`
const movechin = tune`
500: C4~500,
15500`
playTune(music, Infinity)

setLegend(
  [ player, bitmap`
.....66666......
....6626266.....
....8866688.....
....8836388.....
.....63336......
.....44444......
....4444444.....
..66444444466...
..66444444466...
....4444444.....
....CCCCCCC.....
....77...77.....
....77...77.....
....77...77.....
....CC...CC.....
...CCC...CCC....` ],
  [ chinchilla, bitmap`
....LL..LL......
...L88LL88L.....
..L888L888LL....
..L111L11111L...
.L11111111111L..
.L110111111111L.
.L111111111111L.
.LH111111111111L
..L22222LL11111L
..L222222LL1111L
..L8282288L1111L
...LLLLLLL1111L.
......LLL11111L.
.....L1111111L..
.....L1111111L..
.....LLLLLLLL...` ],
  [ background, bitmap`
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
  [ bush, bitmap`
................
.....444444.....
...44444DDD4....
..4D4DD4444444..
.4D444DD444444..
.4D44444D444444.
.44DD4444DD44444
44444D44444DD444
444444D44444DD44
4D4444D444444444
4D4444DD44444D44
4D44444444444DD.
.D44D444444444D.
.4444DDD444444..
..444444DD44D...
....444444DD....` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
11L111111111L111
LLLLLLLLLLLLLLLL
1111L111111111L1
LLLLLLLLLLLLLLLL
11L1111111L11111
LLLLLLLLLLLLLLLL
111L1111L11111L1
LLLLLLLLLLLLLLLL
11111L11111L1111
LLLLLLLLLLLLLLLL
11L11111L1111L11
LLLLLLLLLLLLLLLL
1L111L11111L1111
LLLLLLLLLLLLLLLL
111L11111L1111L1` ],
  [ house, bitmap`
....LLLLLLLL....
...LCCCCCCCCL...
..LCCCCCCCCCCL..
.LCCCCCCCCCCCCL.
LLLLLLLLLLLLLLLL
LCCCCCCCCCCCCCCL
LCCCCCCCCCCCCCCL
LCCCCCCCCCCCCCCL
LCCCCCCCCCCCCCCL
L2222CCCCCC2222L
L2222CCCCCC2222L
L2222C111CC2222L
L2222C111CC2222L
LCCCCCL11CCCCCCL
LCCCCC111CCCCCCL
LLLLLLLLLLLLLLLL` ],
  [coin, bitmap `
....66666666....
...666FFF6666...
..66FFF6666666..
.66FF6666666666.
66FF666666666666
6FF6666666666666
6F66666...666666
6F6666.....66666
666666.....66666
6666666...666FF6
666666666666FF66
66666666666FF666
.666666666FF666.
..6666666FF666..
...6666FFF666...
....66666666....`],
  [teleporter_f, bitmap `
HHHHHHHHHHHHHHHH
H88888888888888H
H8HHHHHHHHHHHH8H
H8H8888888888H8H
H8H8HHHHHHH88H8H
H8H88888888H8H8H
H8H88HHHHH8H8H8H
H8H8H8888H8H8H8H
H8H8H8HH8H8H8H8H
H8H8H8H88H8H8H8H
H8H8H8HHH88H8H8H
H8H88HHHHHH88H8H
H8H8888888888H8H
H8HHHHHHHHHHHH8H
H88888888888888H
HHHHHHHHHHHHHHHH`],
  [teleporter_t, bitmap `
HHHHHHHHHHHHHHHH
H77777777777777H
H7HHHHHHHHHHHH7H
H7H7777777777H7H
H7H7HHHHHHH77H7H
H7H77777777H7H7H
H7H77HHHHH7H7H7H
H7H7H7777H7H7H7H
H7H7H7HH7H7H7H7H
H7H7H7H77H7H7H7H
H7H7H7HHH77H7H7H
H7H77HHHHHH77H7H
H7H7777777777H7H
H7HHHHHHHHHHHH7H
H77777777777777H
HHHHHHHHHHHHHHHH`],
  [teleporter_f1, bitmap `
DDDDDDDDDDDDDDDD
D66666666666666D
D6DDDDDDDDDDDD6D
D6D6666666666D6D
D6D6DDDDDDD66D6D
D6D66666666D6D6D
D6D66DDDDD6D6D6D
D6D6D6666D6D6D6D
D6D6D6DD6D6D6D6D
D6D6D6D66D6D6D6D
D6D6D6DDD66D6D6D
D6D66DDDDDD66D6D
D6D6666666666D6D
D6DDDDDDDDDDDD6D
D66666666666666D
DDDDDDDDDDDDDDDD`],
  [teleporter_t1, bitmap `
DDDDDDDDDDDDDDDD
D99999999999999D
D9DDDDDDDDDDDD9D
D9D9999999999D9D
D9D9DDDDDDD99D9D
D9D99999999D9D9D
D9D99DDDDD9D9D9D
D9D9D9999D9D9D9D
D9D9D9DD9D9D9D9D
D9D9D9D99D9D9D9D
D9D9D9DDD99D9D9D
D9D99DDDDDD99D9D
D9D9999999999D9D
D9DDDDDDDDDDDD9D
D99999999999999D
DDDDDDDDDDDDDDDD`],
  [lever, bitmap `
................
............33..
............33..
...........22...
..........22....
..........2.....
.........22.....
........22......
........2.......
.......22.......
.......2........
....CCCCCCCC....
...CCCCCCCCCC...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC`],
  [fake_wall, bitmap`
CCCCCCCCCCCCCCCC
11C111111111C111
CCCCCCCCCCCCCCCC
1111C111111111C1
CCCCCCCCCCCCCCCC
11C1111111C11111
CCCCCCCCCCCCCCCC
111C1111C11111C1
CCCCCCCCCCCCCCCC
11111C11111C1111
CCCCCCCCCCCCCCCC
11C11111C1111C11
CCCCCCCCCCCCCCCC
1C111C11111C1111
CCCCCCCCCCCCCCCC
111C11111C1111C1`]
)

setSolids([player, wall, bush, chinchilla, fake_wall])

setPushables({
  [ player ]: [chinchilla, bush]
})

let level = 0
let coins = 0
const levels = [
 map`
...wpw...
wwww.lw..
w...b.w..
w..c.w...
wwww.w...
...w.w...
...wlw...
...whw...`,
  map`
.........
wwww.wwww
..lw.w...
...w.wf.h
pctw.w...
...w.wl..
wwww.wwww
.........`,
  map`
.........
wwww.wwww
y..www...
...rlr..h
pc.www...
...w.w...
wwww.wwww
.........`,
  map`
..rb.bw.....
.lw...w.c...
.bw.b.ww..rr
.ww....w.wb.
.w.b...ww...
.r......rb..
.www..wrww..
.b.wbww.....
...w.wpb....
h.bw.wyb...l`,
  map`
lb...bw......
...s..w..t..b
.b....w......
...p..wb.cb..
......w......
wwwwwwwwwwwww
...b..rh...b.
b.....r......
......rb....b
b..f..r..v...
l.b...r....by`,
  map`
hlwbrlr.wwp.
..ww.w..ww..
.bw..b..wwbw
rwwwwrw.....
.w..wcw.....
....wrw.....
.w...b.....w
....b..wwbww
...w...b....
.....w.b...y`
]
/*map`
s.lwf..lywtp
.c.ww.wwwwwr
...w......w.
rwww..w...b.
.w.b........
.r......w..b
.w..w.......
.w.b...wb...
.ww.....wwww
.....b...v.h`,*/
setMap(levels[level])

let prechin = {"x": getFirst(chinchilla).x, "y": getFirst(chinchilla).y} 

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  setMap(levels[level])
})

addText('Press J to ', {x:4, y:7, color:color`3`})
addText('reset level', {x:4, y:8, color:color`3`})

afterInput(() => {
  clearText();

  let lever_pos = getAll(lever)
  let poschin = { "x": getFirst(chinchilla).x, "y": getFirst(chinchilla).y };
  let obstacles = getAll(coin);
  let fakeWalls = getAll(fake_wall); // Change variable name to avoid naming conflict
  
  let playerpos = { "x": getFirst(player).x, "y": getFirst(player).y };
  
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == playerpos.y && obstacles[i].x == playerpos.x) {
      coins += 1;
      obstacles[i].remove();
    }
  }
  
  
  if (tilesWith(lever, player).length >= 1) {
  let fakes = getAll(fake_wall);

  for (let i = 0; i < fakes.length; i++) {
    fakes[i].remove();
  }
}
  
  addText(`${coins} coins`, { x: 1, y: 1, color: color`8` });
  
  if (tilesWith(chinchilla, house).length >= 1 && level == 5) {
    addText("you've won!", { x: 4, y: 9, color: color`8` });
    addText("you've collected", { x: 4, y: 10, color: color`8` });
    addText(`${coins} coins`, { x: 4, y: 11, color: color`8` });
  } else if (tilesWith(chinchilla, house).length >= 1) {
    level += 1;
    setMap(levels[level]);
  }
 /* Check if the chinchilla overlaps with the teleporter F
  if (tilesWith(chinchilla, teleporter_f).length >= 1) {
    const t_f = getFirst(teleporter_f);
    const t_t = getFirst(teleporter_t);

    // Teleport the chinchilla to the position of teleporter T
    getFirst(chinchilla).x = t_t.x;
    getFirst(chinchilla).y = t_t.y;
  */


  
   // Chinchilla teleportation outside the teleporter
   if (tilesWith(chinchilla, teleporter_f).length >= 1) {
    const t_f = getFirst(teleporter_f);
    const chinchillaPos = getFirst(chinchilla);
    
    // Move the chinchilla to be one tile away from teleporter_t
    const t_t = getFirst(teleporter_t);
    const dx = t_t.x - t_f.x;
    const dy = t_t.y - t_f.y;
    if (level == 1){
      chinchillaPos.x = t_t.x + 1;
      chinchillaPos.y = t_t.y + 1;
    } else {
      chinchillaPos.y = t_t.y + -1;
    }
    
    
  }else if (tilesWith(chinchilla, teleporter_t).length >= 1) {
    const t_f = getFirst(teleporter_t);
    const chinchillaPos = getFirst(chinchilla);
    
    // Move the chinchilla to be one tile away from teleporter_t
    const t_t = getFirst(teleporter_f);
    const dx = t_t.x - t_f.x;
    const dy = t_t.y - t_f.y;

    if (level == 1){
      chinchillaPos.x = t_t.x + -1;
      chinchillaPos.y = t_t.y + -1;
    }else{
      chinchillaPos.y = t_t.y + 1;
    }
    //chinchillaPos.x = t_t.x + 1;
    chinchillaPos.y = t_t.y + 1;
   }

  // Player teleportation within the teleporter
  if (tilesWith(player, teleporter_f).length >= 1) {
    const t_f = getFirst(teleporter_f);
    const t_t = getFirst(teleporter_t);
    const playerPos = getFirst(player);

    // Teleport the player within the teleporter
    playerPos.x = t_t.x;
    playerPos.y = t_t.y;
  }else if (tilesWith(player, teleporter_t).length >= 1) {
    const t_f = getFirst(teleporter_f);
    const t_t = getFirst(teleporter_t);
    const playerPos = getFirst(player);

    // Teleport the player within the teleporter
    playerPos.x = t_f.x;
    playerPos.y = t_f.y;
  }
  
  //------------------------------------------------------------------//
  if (tilesWith(chinchilla, teleporter_f1).length >= 1) {
    const t_f1 = getFirst(teleporter_f1);
    const chinchillaPos1 = getFirst(chinchilla);
    
    // Move the chinchilla to be one tile away from teleporter_t
    const t_t1 = getFirst(teleporter_t1);


    //chinchillaPos1.x = t_t1.x + -1;
    chinchillaPos1.y = t_t1.y + -1;
  }else if (tilesWith(chinchilla, teleporter_t1).length >= 1) {
    const t_f1 = getFirst(teleporter_t1);
    const chinchillaPos1 = getFirst(chinchilla);
    
    // Move the chinchilla to be one tile away from teleporter_t
    const t_t1 = getFirst(teleporter_f1);

    //chinchillaPos1.x = t_t1.x + 1;
    chinchillaPos1.y = t_t1.y + 1;
   }

  // Player teleportation within the teleporter
  if (tilesWith(player, teleporter_f1).length >= 1) {
    const t_f1 = getFirst(teleporter_f1);
    const t_t1 = getFirst(teleporter_t1);
    const playerPos = getFirst(player);

    // Teleport the player within the teleporter
    playerPos.x = t_t1.x;
    playerPos.y = t_t1.y;
  }else if (tilesWith(player, teleporter_t1).length >= 1) {
    const t_f1 = getFirst(teleporter_f1);
    const t_t1 = getFirst(teleporter_t1);
    const playerPos = getFirst(player);

    // Teleport the player within the teleporter
    playerPos.x = t_f1.x;
    playerPos.y = t_f1.y;
  }
  
  if (prechin.x != poschin.x || prechin.y != poschin.y){
    playTune(movechin, 1)
    prechin = poschin
  }

}
)
