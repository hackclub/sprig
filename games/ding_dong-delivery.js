/*
@title: ding_dong-delivery
@author: cott3-github * efe - slack
@tags: []
@addedOn: 2023-09-09
*/
//controls:
//wasd to move, j to restart level
const bell = tune`
348.83720930232556: A4/348.83720930232556,
348.83720930232556: E5/348.83720930232556,
348.83720930232556: B4/348.83720930232556,
10116.27906976744`
const win = tune`
105.63380281690141: G4^105.63380281690141,
105.63380281690141: A4^105.63380281690141,
105.63380281690141: B4^105.63380281690141,
105.63380281690141: C5^105.63380281690141,
105.63380281690141: D5^105.63380281690141,
105.63380281690141: E5^105.63380281690141,
105.63380281690141: F5^105.63380281690141,
105.63380281690141: G5^105.63380281690141,
2535.211267605634`
const fall = tune`
231.66023166023166,
115.83011583011583: F5~115.83011583011583,
115.83011583011583: E5~115.83011583011583,
115.83011583011583: D5~115.83011583011583,
115.83011583011583: C5~115.83011583011583,
115.83011583011583: B4~115.83011583011583,
2895.7528957528957`
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const pothole = "h"
setLegend(
    [
        player,
        bitmap`
....99999999....
...99CCCCCC99...
..99CCCCCCCC99..
..CCC0CCCC0CCC..
..CCC0CCCC0CCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
..LL11111111LL..
..LL10LL0001LL..
..LL1L0LL001LL..
..LL11100111LL..
....LLL..LLL....
....LLL..LLL....
....LLL..LLL....`
    ],
    [
        box,
        bitmap`
2225222522252222
2525252525555225
2225252522255225
2555222555255225
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC000
C0CCCCCCCCCCCC00
CC0CCCCCCCCCC0C0
CCC0CCCCCCCC0CCC
CCCC00000000CCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
    ],
    [
        goal,
        bitmap`
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
C33333333333333C
C33333333333333C
.37777733777773.
.37727733772773.
.37277733727773.
.37777733777773.
.37777733777773.
.33333333333333.
.33333333333333.
.33333CCCC33333.
.33333CCCC33333.
.33333CCC033333.
.33333CCCC33333.
.33333CCCC33333.`
    ],
    [
        wall,
        bitmap`
111L1111L11111L1
111L1111L11111L1
111L1111L11111L1
LLLLLLLLLLLLLLLL
11111L1111L11111
11111L1111L11111
11111L1111L11111
LLLLLLLLLLLLLLLL
11L111L1111L1111
11L111L1111L1111
LLLLLLLLLLLLLLLL
11111L111L111111
11111L111L111111
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111`
    ],
   [pothole, bitmap`
.LL0L......LL...
.L00L.....LLL...
.L00LLLLLLL0L...
.L00000000000L..
.LL000000000LL..
..L0000000000L..
..L0000000000L..
.L00000000000L..
.L00000000000L..
.L00000000000L..
..L0000000000L..
..LL00000000L...
..LLL00000000L.L
.LL..LLLLLLL0LLL
.L.........LLL..
................`],
);
let level = 0;
const levels = [
  map`
p.w..
.b.g.
.....
.....`,
    map`
..w.
...g
.bw.
p.w.`,
   map`
p.ww..g
...w...
.......
......b
...ww..
....w..`,
map`
wgww...
w.wwwww
......w
....b.w
......w
...p..w`,map`
...w...wg
.ww......
.ww......
.ww...www
w..b...ww
........w
w..p..www
wwwwwwwww`, map`
wwwwwwwww
wwwwwwwww
wwwwwwwww
wwwpbgwww
wwwwwwwww
wwwwwwwww
wwwwwwwww
wwwwwwwww`, map`
wwwwww...g
wwwwww....
ww.....b..
ww......ww
wwp.....ww
ww......ww
wwwwwwwwww
wwwwwwwwww`,  map`
w.w.ww...p
w.w.ww....
ww......b.
g.......w.
w.......w.
w.......w.
w.w.w.w.w.
w.w.w.w.w.`, map`
.wwwwwwwwwwww
p........wwww
...b.....wwww
.wwwwww..wwww
.w....w.....h
w......h.wwww
ww....w..wwww
ww....w....ww
w..ww.w....ww
w..gw......ww
wwwww......ww`, map`
.wgw..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
ww.w..w.w.w.w.w..w
................bp
ww....w.w.w.w.w..w
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...
.w.w..w.w.w.w.w...`, 
  map`
......
.w..w.
w.ww.w
wg.bpw
.w..w.
..ww..
......` ,map`
wwww..
wwww..
wwww..
g..hbp
ww....
ww..ww`, map`
pbg`, map`
hhh.......h
hhh.......h
hwhgw..wwwh
hwhhw..hwhh
hwwww..hwhh
hwhhw..hwhh
hwhhw..wwwh
hhhhh....hh
hhhhh....hh
hhhhh..bphh
hhhhhhhhhhh
hhhhhhhhhhh`, map`
wwhww
w...w
pb..h
w...w
wwgww`, map`
.......w.......
......w........
.....w.........
..w.w..........
...w...........
....w..........
ww.............
wg.h..bp.......
ww.............
...w...........
..w............
.w.w...........`, map`
www........
whw........
w.wwwwwwwww
w..........
w........bp
w.wwwwwwwww
w.w........
wgw........`, map`
whhhhhhhw
hwhhhhhwh
hhwhhhwhh
hhhwhwhhh
g...bphhh
hhhwhwhhh
hhwhhhwhh
hwhhhhhwh
whhhhhhhw`


];
const currentLevel = levels[level];
setMap(currentLevel);
setSolids([player, box, wall]);
setPushables({
    [player]: [box]
});
onInput("w", () => {
    getFirst(player).y -= 1;
});
onInput("s", () => {
    getFirst(player).y += 1;
});
onInput("a", () => {
    getFirst(player).x -= 1;
});
onInput("d", () => {
    getFirst(player).x += 1;
});  
    
onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});

afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;
    if (numberCovered === targetNumber) {
      //play doorbell tune
        playTune(bell)
      //pause script for 1 sec
      setTimeout(() => {
        // console.log("This will have the 1 second delay.");
        // increase the current level number
        level += 1;
      
        const currentLevel = levels[level];
        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you won!", { y: 4, color: color`6` });
          playTune(win)
        }
      }, 1000);
      // console.log("This will not have the delay.")
    }
    getAll(pothole).forEach((obj) => {
      if(getFirst(box).x == obj.x && getFirst(box).y == obj.y){
        setMap(levels[level]);
        playTune(fall)
        
      }
    });
})
