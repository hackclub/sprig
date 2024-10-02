

/*
@title: Waze
@author: DragonRoyal
@tags: ['action','survival']
@addedOn: 2024-07-17

INSTRUCTIONS:
W A S D to move the character around, i to shoot the zombies

Once you reach the 2nd level see how long you can surive until you die!
*/






// define the sprites in our game

const pistol = "p";

const street1 = "g";
const street2 = "v"
const bg ="z"
const t1 = "1"
const t2 = "2"
const t3 = "3"
const t4 = "4"
const melody = tune`
500: B4~500 + E5/500,
500,
500: D5~500 + G4~500 + B4-500,
500,
500: B4~500 + E4~500,
500: B5-500 + E5^500,
500: C5~500,
500: F4~500,
500: C5~500,
500: C4-500,
500: G4~500 + E4~500,
500: C5~500,
500: E5/500,
500: B4~500,
500: D5^500,
500: E4~500 + A5-500,
500: A4~500,
500: C4-500,
500: D4~500,
500: A4~500 + D5^500,
500: G5~500 + E5/500,
500,
500: A4~500,
500: C4~500,
500: B5~500 + E5/500 + F4-500 + B4^500,
500: G4~500,
500,
500: B4~500,
500: A5~500 + E4~500 + C5-500,
500,
500: A4^500,
500: D5~500 + B4/500`
const bullet1 = "x"
const zombie1 = "a"
const hit1 = tune`
63.29113924050633: B5/63.29113924050633 + A5/63.29113924050633 + G5/63.29113924050633 + C4~63.29113924050633,
63.29113924050633: A5/63.29113924050633 + C4~63.29113924050633,
1898.73417721519`
const h1 = "5"
const h2 = "6"
const h3 = "7"
const grass = "r"
const tile = "t"
const q1 = "8"
const q2 = "9"
const q3 = "0"
const shotgun = "c"
const zombie2 = "n"
const tile1 = "b"
const hit2 = tune`
184.04907975460122: E4~184.04907975460122 + D4~184.04907975460122 + F5-184.04907975460122 + A4-184.04907975460122,
184.04907975460122: D4~184.04907975460122 + G4/184.04907975460122 + A4/184.04907975460122 + E5^184.04907975460122,
5521.472392638037`
const bullet2 = "l"


// assign bitmap art to each sprite
setLegend(
  [ pistol, bitmap`
................
................
................
.....333333.....
....33333333....
...3330330333...
..333323323333..
..33232332323LL.
..33322332233L11
..33333333331111
..333333333111..
...2......112...
...2........2...
...2........2...
CC.2........2.CC
C3333......3333C`],
  [street1,bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
111LLLLL111LLLLL
111LLLLL111LLLLL
111LLLLL111LLLLL
111LLLLL111LLLLL
111LLLLL111LLLLL
111LLLLL111LLLLL
111LLLLL111LLLLL`],
  [ street2,bitmap`
LLLLL111LLLLL111
LLLLL111LLLLL111
LLLLL111LLLLL111
LLLLL111LLLLL111
LLLLL111LLLLL111
LLLLL111LLLLL111
LLLLL111LLLLL111
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
 
  [ bg, bitmap`
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
  [ t1, bitmap`
0000000000000000
0000000000000000
0000000000000000
2000000000000000
0200000000000020
0200000000000200
0220000000000200
0020000000000200
0002000000000200
0002000200002000
0002000220002000
0002200220002000
0000202020020000
0000202022200000
0000222002200000
0000022002200000`],
  [ t2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000220000000
0000002202200000
0000022002220000
0000220000220000
0002200000020000
0002000000202000
0002000000202000
0000200002002200
0000200002000200
0000200020000220
0000022220000020`],
  [ t3, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0022222222222000
0000000002200000
0000000002000000
0000000020000000
0000000220000000
0000002200000000
0000002000000000
0000022000000000
0000020000000000
0000220000000000
0022222222222000`],
  [ t4, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000222220000000
0002200022000000
0002000002000000
0020000002000000
0020020022000000
0020002200000000
0020000000000000
0002000000000000
0002000000000000
0002200000000000
0000220000000000
0000002220022000`],
  [ bullet1, bitmap`
................
................
................
................
................
................
................
................
................
L21.............
................
................
................
................
................
................`],
  [ bullet2, bitmap`
................
................
................
................
................
................
.66.............
6666............
6666............
.66.............
................
................
................
................
................
................`],
  [zombie1, bitmap`
.......444......
......44444.....
......33444.....
......44444.....
......44444.....
.......444......
.......F4F......
...44FFFF4......
.......F4F......
...44FFFFF......
.......F4F......
.......FFF......
.......F.F......
.......F.F......
.......4.4......
......44.44.....`],
  [h1, bitmap`
DDDD00CCCCCDDDDD
DDDDLLCCCCCCDDDD
DDDCLLCCCCCCCDDD
DDCCCCCCCCCCCCDD
DCCCCCCCCCCCCCCD
DCCCCCCCCCCCCCCD
DDFFFFFFFFFFFFDD
DDFFFFFFFFFFFFDD
DDF77FF77FF77FDD
DDF77FF77FF77FDD
DDFFFFFFFFFFFFDD
DDFFFFFFFFFFFFDD
DDFFF7FCCF7FFFDD
DDFFF7FCCF7FFFDD
DDFFFFFCCFFFFFDD
DD000000000000DD`],
  [h2, bitmap`
DDDDDDCCCCCDDDDD
DDDDDCCCCCCCDDDD
DDDDCCCCCCCCCDDD
DDDDD0000000DDDD
DDDDD0FFFFF0DDDD
DDDDD0F7F7F0DDDD
DDCDD0FFFFF0DDDD
DCCCD0F7F7F0DDDD
CCCCC0FFFFF0DDDD
CCCCC0FFFFF0DCCD
000000FFFFF0CCCC
FFFFF0FFFFF00000
FFFFF0FFFFF0FFFF
FFFFF0FFCFF0FFFF
FCCFF0FFCFF0FCCF
FCCFF0FFCFF0FCCF`],
  [h3, bitmap`
DDDDDDDDDDDDDDDD
DDDD00000000DDDD
DDD00CCCCCC00DDD
DD00CCCCCCCC00DD
D00CCCCCCCCCC00D
00CCCCCCCCCCCC00
0CCCCCCCCCCCCCC0
0000000000000000
FFFFFFFFFFFFFFFF
F77FFF77FF77FF77
F77FFF77FF77FF77
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF7FFFFCCCFFFF7F
FF7FFFFC0CFFFF7F
FFFFFFFCCCFFFFFF`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDD00DDDD
DDDDDDDDD0000DDD
DD0DDDDDD0DD0DDD
D0D0DDDD00DD00DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDD0DDDD00DD
DDDDDD00DDD000DD
DDDDDD0D0DDDDDDD
DDDDD0DD0DDDDDDD
DDDDDDDD00DDDDDD
DDDDDDDDDDDDDDDD
D0D0DDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [tile,bitmap`
................
................
................
................
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
................
................
................
................`],
  [zombie1, bitmap`
.......444......
......44444.....
......33444.....
......44444.....
......44444.....
.......444......
.......F4F......
...44FFFF4......
.......F4F......
...44FFFFF......
.......F4F......
.......FFF......
.......F.F......
.......F.F......
.......4.4......
......44.44.....`],
  [q1, bitmap`
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
LL0L7L7L7L7L70LL
LL0LLLLLLLLLL0LL
LL0L7L7L7L7L70LL
LL0LLLLLLLLLL0LL
LL0L7L7L7L7L70LL
LL0LLLLLLLLLL0LL
LL0L7L7L7L7L70LL
LL0LLLLLLLLLL0LL
LL0L7L7L7L7L70LL
LL0LLLLLLLLLL0LL
LL0L7L7L7L7L70LL
LL0LLLLLLLLLL0LL
LL0LLLLFFFLLL0LL
LL0LLLLFFFLLL0LL`],
  [q2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL00000000LLLL
LLL0LLLLLLLL0LLL
LL0LLLLLLLLLL0LL
L0LLLLLLLLLLLL0L
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
1111111111111111
1771771771771771
1771771771771771
1111111111111111
1771771771771771
1771771771771771
1111111111111111`],
  [q3, bitmap`
LLLLLLL33LLLLLLL
LLLLLL0LL0LLLLLL
LLLLLL0LL0LLLLLL
LLLLLL0LL0LLLLLL
LLLLLL0LL0LLLLLL
LLLLLL0LL0LLLLLL
03300L0LL0L00330
LLLL000LL000LLLL
LLLLLLLLLLLLLLLL
L777LL7777LL777L
L777LL7777LL777L
L777LL7777LL777L
LLLLLLLLLLLLLLLL
L777LLLFFFLL777L
L777LLLFFFLL777L
LLLLLLLFFFLLLLLL`],
  [shotgun, bitmap`
................
................
................
................
.....44.........
......4.........
......4.........
......4DDDD.....
......DDDDD.....
.....4444..3LL33
....0400403LLLL.
...4440044L.3...
...4444444L.3...
....D...D.......
..0DD...DD0.....
..400...004.....`],
  [ zombie2, bitmap`
.....5.....5....
.....5.....5....
.....55...55....
.....55C5C55....
.....5535355....
.....55C5C55....
......55555.....
.......CCC......
.......C5C......
....5CCC5C......
.......CCC......
....5CCCCC......
.......55C......
.......CCCC.....
.......C5CCCCC..
.......C5CCCCCCC`],
  [ tile1, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1L1LLLLLLLL
LLL11L1LLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL11LL
LLLLLLLLLLL111LL
LLLLLLLLLLL1LL1L
LLLL11LLLLLLLL1L
LLL11LLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  
  
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
1234
zzzz`,
  map`
5rr7r6rr5
vvvvvvvvv
p........
t.t.t.t.t
.........
ggggggggg
6r56rrr7r`,
  map`
8b90b8b9bb
vvvvvvvvvv
..........
c.........
..........
gggggggggg
b0bb980bb8`,
  map`
zpzz
zzzz
zczz
zzzz`,
  map`
zgz
ztz
zvz`,

];
let bullet = bullet1
let hit = hit1
let time = 30
let time2 = 1000
setBackground(bg)
// set the map displayed to the current level
let currentLevel = levels[level];
setMap(currentLevel);

setSolids([ pistol,shotgun,tile1,h1,h2,h3,grass,q1,q2,q3,street1,street2]); // other sprites cannot go inside of these sprites
let score = 0
// allow certain sprites to push certain other sprites
setPushables({
  [pistol]: [],
  [shotgun]: [],
  [zombie1]: [],
  [zombie2]: [],
  
});

//title screen
const playback = playTune(melody, Infinity)
addText("Press I to start", { 
  x: 2,
  y: 13,
  color: color`1`
})
let zombie = zombie1
let player = pistol
onInput("i", () => {
  if (level == 0){
  level = 1
  setMap(levels[level]);
  clearText(),
  playback.end()}
    
  else{
    if (level == 2){
    pgpos = getFirst(player)
    addSprite(pgpos.x + 1,pgpos.y+1,bullet)
    addSprite(pgpos.x + 2,pgpos.y,bullet)
    addSprite(pgpos.x + 1,pgpos.y-1,bullet)
    playTune(hit,1)} 
    
    
    
    else{
    pgpos = getFirst(player)
    
    addSprite(pgpos.x + 1,pgpos.y,bullet)
    playTune(hit,1)}
    
  }});




// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});


// input for enemies


function enemyspawn() {
  const ran =Math.floor(Math.random() * (5 - 1) + 1);
  console.log(ran)
  addSprite(8,ran,zombie)
}
// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


setInterval(function() {
  // code to be executed repeatedly
  enemyspawn()
  enemyspawn()
  getAll(zombie).forEach((zombie) => {
    zombie.x -= 1
  });
 
  
}, time2);


setInterval(() => {
  try {
  
  getAll(zombie).forEach((zombieObj) => {
    getTile(zombieObj.x, zombieObj.y).forEach((sprite) => {
      if (sprite.type === player) {
        // Zombie hit player
        sprite.remove()
        zombieObj.remove()
        level = 4
        setMap(levels[level]);
        addText("Wasted...", { 
  x: 7,
  y: 4,
  color: color`3`
        })
        
     
       
       
      }
    })}) 
}
catch(err) {
  
}

}, 400)



  
setInterval(() => {
  getAll(bullet).forEach((bulletObj) => {
    getTile(bulletObj.x + 1, bulletObj.y).forEach((sprite) => {
      if (sprite.type === zombie) {
        // Zombie detected
       
        sprite.remove()
        bulletObj.remove()
       score+=1
        return;
      }
    })
    if (level == 1)
    {if (bulletObj.x === 8) {
      bulletObj.remove();
    }}
    else{
      if (bulletObj.x === getFirst(player).x + 3 || bulletObj.x === 9 ) {
      bulletObj.remove();
    }}
    bulletObj.x += 1
    
  }) 
}, time)


// for score text
setInterval(() => {
  if (score != 0){
    addText(`Score: ${score}`,{color:color`3`})
  }
  else{
    
  }
}, 30)

setInterval(() => {
  if (score == 20){
    score = 0
    level+= 1
    setMap(levels[level]);
    clearText()
    player = shotgun
    zombie = zombie2
    bullet = bullet2
    hit = hit2
    time = 500
    time2 = 500  }
  else{
    if (level == 3){
              addText("You won", { 
  x: 7,
  y: 6,
  color: color`2`
        })}
        
     
  };
}, 30);



setInterval(function() {
  // code to be executed repeatedly
   getAll(bullet).forEach((bullet) => {
    bullet.x += 1
  });
}, 300);

