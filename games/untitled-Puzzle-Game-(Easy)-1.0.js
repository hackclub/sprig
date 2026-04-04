/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: First
@author: 
@tags: []
@addedOn: 2025-00-00
*/


const player = "p"
const box = "b"
const goal = "g"
const yellowGoal = "y"
const yellowBox = "Y"
const yellowMover = "M"
const wall = "w"
const movableBox = "B"
const blackBox = "Z"
const blueBox = "X"
const lock = "l"
const lockMover = "L"
const arrow = "a"
const skull = "s"
const rageButton = "r"

setLegend(
  [ player, bitmap`
................
.....0000000....
....044DDDD40...
...044DDDD9D40..
.00044DD99DD40..
.0444400DD0040..
..04H0H0HH0H0...
...0H9H0HH0H90..
...099HHHHHH90..
....0902H20090..
....002228800...
...042272282D0..
...04427722DD0..
....00010L000...
......033CC0....
................` ],
  [ box, bitmap `
................
................
..2CCCCCCCCCCL..
..C1LLLLLLLLLC..
..CLLCCCCCCLLC..
..CLCLCCCCLCLC..
..CLCCL24LCCLC..
..CLCC41L4CCLC..
..CLCC4LL4CCLC..
..CLCCL44LCCLC..
..CLCLCCCCLCLC..
..CLLCCCCCCLLC..
..CLLLLLLLLLLC..
..LCCCCCCCCCCL..
................
................`],
  [ goal, bitmap `
................
................
.....4DDDDD.....
...2444DDDDDD...
...44......DD...
..D4..4DDD..DD..
..D4.4....D.DD..
..DD.D.2H.D.DD..
..DD.D.8H.D.DD..
..DD.D....D.DD..
..DD..DDDD..DD..
...DD......DD...
...DDDDDDDDDD...
.....DDDDDD.....
................
................`],
  [ yellowGoal, bitmap `
................
................
.....6FFFFF.....
...2666FFFFFF...
...66......FF...
..F6..6FFF..FF..
..F6.6....F.FF..
..FF.F.2H.F.FF..
..FF.F.8H.F.FF..
..FF.F....F.FF..
..FF..FFFF..FF..
...FF......FF...
...FFFFFFFFFF...
.....FFFFFF.....
................
................`],
  [ yellowBox, bitmap `
................
................
..2CCCCCCCCCCL..
..C1LLLLLLLLLC..
..CLLCCCCCCLLC..
..CLCLCCCCLCLC..
..CLCCL2FLCCLC..
..CLCCF1LFCCLC..
..CLCCFLLFCCLC..
..CLCCLFFLCCLC..
..CLCLCCCCLCLC..
..CLLCCCCCCLLC..
..CLLLLLLLLLLC..
..LCCCCCCCCCCL..
................
................`],
  [ yellowMover, bitmap `
................
.......26.......
......2266......
.....6666F6.....
.......66.......
...6...CC...6...
..66...66...F6..
.6666C6266C6666.
.6666C6666C6666.
..66...66FF.F6..
...6...CCF..6...
.......66.......
.....6666F6.....
......6666......
.......66.......
................`],
  [ wall, bitmap `
C3L333CCL3CC3C0C
33L3CCC30333CC03
LLLLLL0000LLLL00
333C303333C0C33C
33C33LC3C33033CC
LLL0LLLLLLL00LLL
33LC333CL3333CL3
3CL33C3C033CC303
L0C00LLLL0LLLLLL
C3333L333CCL333C
333C303C33303CCC
00LLLLL00LL00L00
330333C3L3333303
33L3C333033CCCLC
0LL00C0LLLLLL00L
3C3C303C3CCL33CC`],
  [ movableBox, bitmap `
................
................
..2CCCCCCCCCCL..
..C1LLLLLLLLLC..
..CLLCCCCCCLLC..
..CLCLCCCCLCLC..
..CLCCL23LCCLC..
..CLCC31L3CCLC..
..CLCC3LL3CCLC..
..CLCCL33LCCLC..
..CLCLCCCCLCLC..
..CLLCCCCCCLLC..
..CLLLLLLLLLLC..
..LCCCCCCCCCCL..
................
................`],
  [ blackBox, bitmap `
................
................
..2CCCCCCCCCCL..
..C1LLLLLLLLLC..
..CLLCCCCCCLLC..
..CLCLCCCCLCLC..
..CLCCL20LCCLC..
..CLCC01L0CCLC..
..CLCC0LL0CCLC..
..CLCCL00LCCLC..
..CLCLCCCCLCLC..
..CLLCCCCCCLLC..
..CLLLLLLLLLLC..
..LCCCCCCCCCCL..
................
................`],
  [ blueBox, bitmap `
................
................
..2CCCCCCCCCCL..
..C1LLLLLLLLLC..
..CLLCCCCCCLLC..
..CLCLCCCCLCLC..
..CLCCL25LCCLC..
..CLCC51L5CCLC..
..CLCC5LL5CCLC..
..CLCCL55LCCLC..
..CLCLCCCCLCLC..
..CLLCCCCCCLLC..
..CLLLLLLLLLLC..
..LCCCCCCCCCCL..
................
................`],
  [ lock, bitmap `
1111111111111111
L11LL11LL11LL11L
1LL11LL11LL11LL1
L11LL11LL11LL11L
1111111001111111
1111110000111111
1LL11LL00LL11LL1
L11LL00LL00LL11L
1LL10LL00LL01LL1
1111000000001111
1111000000001111
L11LL00LL00LL11L
1LL10LL00LL01LL1
L11LL11LL11LL11L
1111111111111111
1111111111111111`],
  [ lockMover, bitmap `
................
................
................
................
..........LLLLL.
.........LLLLLLL
.........LL...LL
.LLLLLLLLLL...LL
.LLLLLLLLLL...LL
..LL.L.L.LL...LL
..L......LLLLLLL
..........LLLLL.
................
................
................
................`],
  [ arrow, bitmap `
................
................
................
..........0.....
..........00....
..........000...
..........0000..
.00000000000000.
.00000000000000.
..........0000..
..........000...
..........00....
..........0.....
................
................
................`],
  [ skull, bitmap `
................
....00000000....
...0........0...
..0..........0..
.0............0.
0...00....00...0
0..0000..0000..0
0..0000..0000..0
0...00..0.00...0
.0.....00.....0.
..00........00..
...0.0....0.0...
...0000000000...
...0.0....0.0...
....0......0....
.....000000.....`],
  [ rageButton, bitmap `
................
....00000000....
...0033333300...
..033333333330..
.00332233333300.
.03322233333330.
.03322233333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.00333333333300.
..033333333330..
...0033333300...
....00000000....
................`],
  
)


setSolids([player, box, wall, movableBox, blackBox, blueBox])

let level = 0
const levels = [
//level 0  
  map`
wwwwww
wp.www
wwb..w
w..w.w
w...gw
wwwwww`,
//level 1
  map `
wwwwwwwwwww
wg.......gw
w.w..w..w.w
w..w...w..w
w....b....w
w.w.bpb.w.w
w....b....w
w..w...w..w
w.w..w..w.w
wg.......gw
wwwwwwwwwww`,
//level 2
  map `
wwwwwwwwwww
wg..ww....w
ww.g..w.w.w
w..w......w
w..w..w...w
wpw.wb..w.w
w.........w
w...w..ww.w
w.b...b.g.w
wwwwwg.b.ww
wwwwwwwwwww`,
//level 3
  map `
wwwwwwwwwwwwwwww
w....wwwwww....w
w..w..g..w..ww.w
w.w.w.ww....g..w
w.w.......w.ww.w
wg......w.w....w
w.......gw...b.w
w.ww..wbbb.w...w
w......bpb.....w
w......bbbw.w.ww
wwwg..w.w..b...w
w...w...gww.w..w
w...w..wwwwg...w
w.gbg..g..w.wwww
w.w.wwwww...g..w
wwwwwwwwwwwwwwww`,
//level 4
  map `
wwwwwwwwwwwwwww
wg..ggggggg.ggw
w.b.bbbbbbbbbbw
w..gggggggg.bgw
w..bbbbbbbb.bgw
wgb..ggg..bgbgw
wgbgbbbbbgbgbgw
wgbgb.p.bgbgbgw
wgbgb.bbb.bgbgw
wgbgb.ggg.bgbgw
wgb.bbbbbbbwbgw
wgb.ggggggg.bgw
w.bbbbbbbbbb..w
w.gggggggggg.gw
wwwwwwwwwwwwwww`,
//level 5
  map `
wwwwwwwwww
www....www
ww..bw.www
wwp.Bg.gww
ww..bwwwww
ww..Bwwwww
ww..bwwwww
www..wwwww
www.gwwwww
wwwwwwwwww`,
//level 6
  map `
wwwwwwwwwwwwwwwwwww
w..p..............w
w...............w.w
w.............w...w
w.w.XbXbX...w.w...w
w...wwwww.wgwgwZ..w
w..Zwgwgw.wwwww...w
w...w.w...XbXbX.w.w
w...w.............w
w.w...............w
w.................w
w.................w
wwwwwwwwwwwwwwwwwww`,
//level 7
  map `
wwwwwwwwwwwwwwwwwww
w..p..............w
w.Z.............w.w
w....BXbX.....w...w
w.w.XbXbXX..wgw...w
w...wwwwwZwgwgwZ..w
w..ZwgwgwZwwwww...w
w...wgw..XXbXbX.w.w
w...w.....XbXB....w
w.w...............w
w.................w
w.................w
wwwwwwwwwwwwwwwwwww`,
//level 8
  map `
wwwwwwwwwwwwwwwwwwwwwww
wwwwww.p.wwww..wgg.ggww
wwww..l....L....w...www
wwwwww.w.wwwwwb...b.www
wwww...w......b.w.w.gww
wwww.wbwwwwwwwb.w.w..ww
w...g.bB..g..w..w.ww.ww
w..w.w.wZww...g.B.bB..w
w.....l...w..ww.w..w..w
www..w.w..w..w..ww.L.ww
wwwwg.bB..w..w...w.b.ww
www..w.wZ.w..w...w.b.ww
w.....l...w..w..Z....ww
www..w.wB.w..w..w..b.ww
wwwwg.bBX....w.L.wwZ.ww
wwww.wbwB.wgwggb......w
wwww.wgww.b.wwwwwwww..w
wwww........gwwwwwwwwww
wwwwlwwwwwwwwwwwwwwwwww
wwww...wwwwwwwwwwwwwwww
wwww....L..wwwwwwwwwwww
ww.....w...wwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwww`,

//level 9
  map `
wwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwww.p.wwww.gwgg.ggww.ggw
w.....l....L....w...wwwgbbw
wwwwww.w.wwwwwb...b.www.bgw
wwww...w......b.w.w.gww.g.w
wwww.wbwwwwwwwb.w.w..wwgbbw
w...g.bB..g..w..w.ww.ww.b.w
w..w.w.wZww...g.B.bB..w...w
w.....l...w..ww.w..w..w.b.w
www..w.w..w..w..ww.L.wwgbbw
wwwwg.bB..w..wgb.w.b.w....w
www..w.wZ.w..wb..w.b.w..bgw
w.....l...w..w..Z....w.g.bw
www..w.wB.w..w..w..b.w..g.w
wwwwg.bBX....w.L.wwZ.ww.bgw
wwww.wbwB.wgw.gb......wgbbw
wwww.wgww.b.wwwwwwww..wZg.w
wwww........gw.g..gw.ww..gw
wwwwlwwwwwwww.ZZZZZ..ww...w
wwww...wwwww..........www.w
wwww.L..L..w..b.b....ZgZw.w
ww.....w...BX........Z....w
wwwwlwwwwwBwwwwwwwwZZZZ...w
w.Z.......bw..............w
w..Z.......XZ..........wwww
wwww..www.wwwwwwwwww..Xg.ww
wwwwwwwwwwwwwwwwwwwwwwwwwww`,

//level 10
  map `
wwwwwwwwwwwwww
w............w
w............w
w............w
w..b.g.......w
wpbsarg......w
w..b.g.......w
w............w
w............w
w............w
wwwwwwwwwwwwww`,

//level 11
  map `
wwwwwwwwwwwwww
wrrrr..rrrrrrw
wr..r........w
wr.br...rrr..w
wr..rr.rrrr.rw
wr..r..rrrr.rw
wr..r...grr.rw
wr..rrrrrrr.rw
wrp.........rw
wrrrrrrrrr..rw
wwwwwwwwwwwwww`,

//level 12
  map `
wwwwwwwwwwwwww
wrrrrrrrrrrrrw
wr........g.rw
wr....rrrr..rw
wr....bbXBg.rw
wr....rBrr..rw
wr..Z.rXr...rw
wr..........rw
wrp...r.....rw
wrrrrrrrrrrrrw
wwwwwwwwwwwwww`,

//level 13
  map `
wwwwwwwwwwwwww
wrrrrrrrrrrrrw
wr..........rw
wr....rrrr..rw
wr......XB..rw
wr....rBrr..rw
wr..Z.rXr...rw
wr..........rw
wrpbg.r.....rw
wrrrrrrrrrrrrw
wwwwwwwwwwwwww`,
  
//level 14
  map `
wwwwwwwwwwwwww
w...r..r..rrgw
w.b.r.br..rrgw
w.b.......rrgw
w.bgr..r.....w
wpbrrrrrrrrrgw
w.bgr..r....gw
w.b.......r..w
w.b.r.br..rrgw
w...r..r..rrgw
wwwwwwwwwwwwww`,
//level 15
  map `
wwwwwwwwwwwwwwwwwwwwww
w...r..r..rrgr......rw
w.b.r.br..rrgr.......w
w.b.......rrgr..Z....w
w.bgr.gr.....r.......w
wpbrrrrrrrrrgr....X..w
w.bgr.gr....gr.......w
w.b.......r..rrrX.X..w
w.b.r.br..rrgrLr.....w
w...r..r..rrgrrr.....w
wr.rrrrrrrrrrr...B...w
wr...........b.B.B...w
wrl...b.Z............w
wr..................rw
wwwwwwwwwwwwwwwwwwwwww`,
]

setMap(levels[level])

setPushables({
  [player]: [box, blackBox, yellowBox, yellowMover, lockMover],
  [box]: [movableBox, blueBox],
  [movableBox]: [box, blueBox, lockMover],
  [blackBox]: [box, movableBox, blueBox, yellowBox],
  [blueBox]: [box, blueBox, movableBox],
  [lockMover]: [lock],
//  [lock]: [blackBox],
  [yellowMover]: [lockMover]
  
})

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
  if (level == 0) {
    level = 0;
    const currentLevel = levels[level];
    setMap(currentLevel);
    
  } else if (level >= 10){
    level = 10;
    const currentLevel = levels[level];
    setMap(currentLevel);
    
  } else if (level >= 8){
    level = 8;
    const currentLevel = levels[level];
    setMap(currentLevel);
    
  } else if (level >= 5){
    level = 5;
    const currentLevel = levels[level];
    setMap(currentLevel);
    
  } else if (level >= 2){
    level -= 2;
    const currentLevel = levels[level];
    setMap(currentLevel);
    
  } else if (level = 1){
    level -= 1;
    const currentLevel = levels[level];
    setMap(currentLevel);
  }
  
})
onInput("l", () => {
  level += 1;
  const currentLevel = levels[level];
  setMap(currentLevel);
  
})

afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  const rBNumberCovered = tilesWith(rageButton, player).length;
  const rBTargetNumber = 1
  
  if (numberCovered === targetNumber) {
    level += 1;

    const currentLevel = levels[level];
    
    if (currentLevel != undefined) setMap(currentLevel)
    
  }

  if (rBNumberCovered === rBTargetNumber) {
    level = 0;
    setMap(levels[level])
  }
  
  
})