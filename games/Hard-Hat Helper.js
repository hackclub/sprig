//based on Mario vs. Donkey Kong: Mini-Land Mayhem! for the 3DS

const playerR = "r"
const playerL = "l"
const background = "b"
const goal = "g"
const wall = "w"
const platformOFF = "f"
const platformON = "o"
const lift = "e"
const spring = "s"
const detectionR = "d"
const detectionL = "a"
const detectionDR = "z"
const detectionDL = "c"
const platform = "p"
const rBelt = "t"
const lBelt = "j"

setLegend(
  [ playerR, bitmap`
................
................
....00000000....
...0666666660...
..066600006660..
..066066660660..
.06606600660660.
.06066066066060.
0666606666066660
.000L27LL27L000.
...0L27LL27L0...
...0LLLLLLLL0...
...0LLL00LLL0...
...0CC0..0CC0...
...0CCC0.0CCC0..
...00000.00000..` ],
  [ playerL, bitmap`
................
................
....00000000....
...0666666660...
..066600006660..
..066066660660..
.06606600660660.
.06066066066060.
0666606666066660
.000L72LL72L000.
...0L72LL72L0...
...0LLLLLLLL0...
...0LLL00LLL0...
...0CC0..0CC0...
..0CCC0.0CCC0...
..00000.00000...` ],
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
7777777777777777`],
  [ wall, bitmap`
0000000000000000
010..........010
0000........0000
0.010LLLLLL010.0
0..000....000..0
0..L010..010L..0
0..L.000000.L..0
0..L..0LL0..L..0
0..L..0LL0..L..0
0..L.000000.L..0
0..L010..010L..0
0..000....000..0
0.010LLLLLL010.0
0000........0000
010..........010
0000000000000000`],
  [ goal, bitmap`
..00000.........
..0CC4400.......
..0CCDD4400.....
..0CC44DD4400...
..0CCDD44DD4400.
..0CC44DD44DD440
..0CCDD44DD4400.
..0CC44DD4400...
..0CCDD4400.....
..0CC4400.......
..0CC00.........
..0CC0..........
..0CC0..........
..0CC0..........
..0CC0..........
..0CC0..........`],
  [ platformOFF, bitmap`
0000000000000000
030LLLLLLLLLL030
030LLLLLLLLLL030
030LLLLLLLLLL030
030LL00LLLLLL030
000L0LL0L0LLL000
0LLL0LL0LL0LLLL0
0LLL000LLLL0LLL0
0LLL0L0LLL0LLLL0
0LLL0LL0L0LLLLL0
000LLLLLLLLLL000
030LLLLLLLLLL030
030LLLLLLLLLL030
030LLLLLLLLLL030
030LLLLLLLLLL030
0000000000000000`],
  [ platformON, bitmap`
LLLLLLLLLLLLLLLL
L4L1111111111L4L
L4L1111111111L4L
L4L1111111111L4L
L4L1100111111L4L
LLL1011010111LLL
L11101101101111L
L11100011110111L
L11101011101111L
L11101101011111L
LLL1111111111LLL
L4L1111111111L4L
L4L1111111111L4L
L4L1111111111L4L
L4L1111111111L4L
LLLLLLLLLLLLLLLL`],
  [detectionR, bitmap`
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
  [detectionL, bitmap`
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
  [detectionDR, bitmap`
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
  [detectionDL, bitmap`
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
  [lift, bitmap`
0000000000000000
0999999999999990
090L........L090
.0L9999999999L0.
.0.90LLLLLL09.0.
.0.9LLLLL0LL9.0.
.0.9L0LL0L0L9.0.
.0.9L0LLLLLL9.0.
.0.9L0LL0L0L9.0.
.0.9L000L0LL9.0.
.0.9LLLLLLLL9.0.
.0.90LLLLLL09.0.
.0L9999999999L0.
090L........L090
0999999999999990
0000000000000000`],
  [spring, bitmap`
.00000000000000.
0333333003333330
0333330330333330
0333303333033330
0333033333303330
.00000000000000.
..LL111LL111LL..
..11LL111LL111..
..L111LL111LL1..
..1LL111LL111L..
..111LL111LL11..
00LL111LL111LL00
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [platform, bitmap`
.L000000000000L.
L1L9999999999L1L
0L999999999999L0
0999990999999990
0999990999999990
0999990999999990
0999190000919990
0991L999999L1990
091LL999999LL190
01LLLLL99LLLLL10
01LLLLL99LLLLL10
091LL999999LL190
0991L999999L1990
0L991999999199L0
L1L9999999999L1L
.L000000000000L.`],
  [lBelt, bitmap`
0.0.0.0.0.0.0.0.
0000000000000000
1111..1111..1111
1LL1..1LL1..1LL1
1LL1CCCCCCCC1LL1
CCCCC110111CCCCC
9939C101001C9939
9399C011001C9399
9399C011010C9399
9939C101010C9939
CCCCC110111CCCCC
1LL1CCCCCCCC1LL1
1LL1..1LL1..1LL1
1111..1111..1111
0000000000000000
.0.0.0.0.0.0.0.0`],
  [rBelt, bitmap`
0.0.0.0.0.0.0.0.
0000000000000000
1111..1111..1111
1LL1..1LL1..1LL1
1LL1CCCCCCCC1LL1
CCCCC110111CCCCC
9799C101001C9799
9979C011001C9979
9979C011010C9979
9799C101010C9799
CCCCC110111CCCCC
1LL1CCCCCCCC1LL1
1LL1..1LL1..1LL1
1111..1111..1111
0000000000000000
.0.0.0.0.0.0.0.0`]
)
setBackground(background);

var level = 0
const levels = [
  //10 levels
  map`
......
......
......
......
wr..gw
wwwfww`, //1
  map`
......
......
......
......
wg..rw
wwffww`, //2
  map`
......
......
......
....gw
wr..ww
wwfs..`, //3
  map`
wwwwww
wg...w
wwoo.w
w....w
wl..ew
wwffww`, //4
  map`
...e.ewew
....w.w.w
....w.w.g
....w.w.w
w.l.w...w
wwwwwwwww`, //5
  map`
w.....w
w.....w
w.....w
w.....w
wr...gw
wwp..ww`, //6
  map`
w......g
w...pwww
we.....w
ww..p..w
wr....ew
ww..pwww`, //7
  map`
wwwwwww
w.....w
w.....w
w.....w
w.....w
wr...gw
wwjjjww`, //8
  map`
wr....ew
wwjjjj.w
we.....w
w.jjjjww
w.....ew
wwjjjj.w
wg.....w
wwjjjjww`, //9
  map`
w....ww
w.....w
w.ttt.w
weg...w
www..ew
wr..www
wwfs..w`, //10
	map `
..........
.wwww..w.w
..w.www.w.
..w.w.ww.w
..........
..........
..........
..........
wr.......w
wwwwwwwwww`
]
setMap(levels[level]);
setSolids([platformON, playerR, playerL, wall, spring, platform, lBelt, rBelt]);

onInput("l", () => {
  platformONOFF()
});
onInput("w", () => {
  liftUP()
});
onInput("s", () => {
  liftDOWN()
});
onInput("a", () => {
  mpL()
});
onInput("d", () => {
  mpR()
});
onInput("j", () =>{
  beltC();
})

const movep = setInterval(move, 1000)

//moving platforms
function mpR(){
  for(let i = 0; i < getAll(platform).length; i++){
    getAll(platform)[i].x += 1
  }
}
function mpL(){
  for(let i = 0; i < getAll(platform).length; i++){
    getAll(platform)[i].x -= 1
  }
}

//turns the platforms on or off
var num = 1;
function platformONOFF(){
  num += 1
  if(num % 2 == 0){
    for(let i = 0; i < getAll(platformOFF).length; i++){
    let px = getAll(platformOFF)[i].x
    let py = getAll(platformOFF)[i].y
    getAll(platformOFF)[i].remove()
    addSprite(px, py, platformON)
    }
  }
  if(num % 2 != 0){
    for(let i = 0; i < getAll(platformON).length; i++){
    let px = getAll(platformON)[i].x
    let py = getAll(platformON)[i].y
    getAll(platformON)[i].remove()
    addSprite(px, py, platformOFF)
    }
  }
}

//belt controlls
var num2 = 1;
function beltC(){
  num2 += 1
  if(num2 % 2 == 0){
    for(let i = 0; i < getAll(lBelt).length; i++){
    let px = getAll(lBelt)[i].x
    let py = getAll(lBelt)[i].y
    getAll(lBelt)[i].remove()
    addSprite(px, py, rBelt)
    }
  }
  if(num2 % 2 != 0){
    for(let i = 0; i < getAll(rBelt).length; i++){
    let px = getAll(rBelt)[i].x
    let py = getAll(rBelt)[i].y
    getAll(rBelt)[i].remove()
    addSprite(px, py, lBelt)
    }
  }
}

//move charater back and forth,wall & floor detection, and check win condition
function move(){
  if(tilesWith(playerR, goal).length > 0 || tilesWith(playerL, goal).length > 0){
    level = level + 1;
    setMap(levels[level]);
  }
//right -> left
  for( let i = 0; i < getAll(playerR).length; i++){
    let px = getAll(playerR)[i].x
    let py = getAll(playerR)[i].y
    let dx = px + 1
    let dy = py + 1
    addSprite(dx, py, detectionR)
    addSprite(dx, dy, detectionDR)
    if(tilesWith(detectionR, wall).length == 1 || tilesWith(detectionDR, wall).length == 0 && tilesWith(detectionDR, platformON).length == 0 && tilesWith(spring, detectionDR).length == 0 && tilesWith(detectionR, lift).length == 0 && tilesWith(platform, detectionDR).length == 0 && tilesWith(rBelt, detectionDR).length == 0){
      getAll(playerR)[i].remove()
      getAll(detectionR)[i].remove()
      getAll(detectionDR)[i].remove()
      addSprite(px, py, playerL)
    }else if (tilesWith(detectionDR, spring).length == 1){
      getAll(playerR)[i].x += 1
      getAll(playerR)[i].y -= 1
      getAll(playerR)[i].x += 1
      getAll(detectionR)[i].remove()
      getAll(detectionDR)[i].remove()
    }else{
      getAll(playerR)[i].x += 1
      getAll(detectionR)[i].remove()
      getAll(detectionDR)[i].remove()
    }
  }
  //left -> right
  for(let i = 0; i < getAll(playerL).length; i++){
    let px = getAll(playerL)[i].x
    let py = getAll(playerL)[i].y
    let dx = px - 1
    let dy = py + 1
    addSprite(dx, py, detectionL)
    addSprite(dx, dy, detectionDL)
    if(tilesWith(detectionL, wall).length == 1 || tilesWith(detectionDL, wall).length == 0 && tilesWith(detectionDL, platformON).length == 0 && tilesWith(spring, detectionDL).length == 0 && tilesWith(detectionL, lift).length == 0 && tilesWith(platform, detectionDL).length == 0 && tilesWith(lBelt, detectionDL).length == 0){
      getAll(playerL)[i].remove()
      getAll(detectionL)[i].remove()
      getAll(detectionDL)[i].remove()
      addSprite(px, py, playerR)
    }else if (tilesWith(detectionDL, spring).length == 1){
      getAll(playerL)[i].x -= 1
      getAll(playerL)[i].y -= 1
      getAll(playerL)[i].x -= 1
      getAll(detectionL)[i].remove()
      getAll(detectionDL)[i].remove()
    }else{
      getAll(playerL)[i].x -= 1
      getAll(detectionL)[i].remove()
      getAll(detectionDL)[i].remove()
    }
  }
}

//lift functions up and down
function liftUP(){
  for(let i = 0; i < getAll(lift).length; i++){
    for(let i = 0; i < getAll(playerR).length; i++){
      if(tilesWith(playerR, lift).length == 1){
        getAll(playerR)[i].y -= 1
      }
    }
    for(let i = 0; i < getAll(playerL).length; i++){
      if(tilesWith(playerL, lift).length == 1){
        getAll(playerL)[i].y -= 1
      }
    }
  getAll(lift)[i].y -= 1
  }
}
function liftDOWN(){
  for(let i = 0; i < getAll(lift).length; i++){
    for(let i = 0; i < getAll(playerR).length; i++){
      if(tilesWith(playerR, lift).length == 1){
        getAll(playerR)[i].y += 1
      }
    }
    for(let i = 0; i < getAll(playerL).length; i++){
      if(tilesWith(playerL, lift).length == 1){
        getAll(playerL)[i].y += 1
      }
    }
    getAll(lift)[i].y += 1
  }
}
