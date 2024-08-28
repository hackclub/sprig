/*
@title: Dungeon_Master
@author: BrandenLordNov
@addedOn: 2024-08-28
@tags: []
*/

const black = "-"
const health = "h"
const heart = "H"
const player = "p"
const star = "s"
const key = "k"
const zombie = "z"
const wall = "w"
const door = "d"
const box = "b"
const lbox ="l"
const exit0 = "0"
const exit1 = "1"
const exit2 = "2"
const exit3 = "3"
const floor = "f"

setLegend(
    [ health, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000330000330000
0003333003333000
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0003333333333000
0003333333333000
0000333333330000
0000033333300000
0000003333000000
0000000000000000
0000000000000000`],
    [ black, bitmap`
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
    [ wall, bitmap`
L0L00LL00LL00L0L
LLLLLLL0L0LLLL00
LLLLL0L0LLLLLL10
LL0LLL1L0LL00LL0
LLLLLL100LLLLL10
LLLLL110LLLLL110
L11L11L0LL1L11L0
0000000000000000
LL0L0LL00L0001L0
LLLLLL10LLLLLL10
LLLLLLL00LLL1LL0
LL00LL10LLLL0L10
LLLL1LL0LLL0LL10
LLLLL110LL1LL110
L1L11110L1L11110
0000000000000000`],
    [ door, bitmap`
L00CCCCCCCCCC0LL
L0CC999C999CCC0L
0CCCC99C999C9C0L
0C9C999C9C9C99C0
0C9C99CC9C9C9CC0
L99C999C999C990L
90LCC99C99CC0L9C
0L90L99C990L9C9C
C99CC01L1LC9900C
999C99L0L9C99C0C
0L9C0L1L10L99C9C
990L9C9C99C0LC9C
0L9C99CC99C9C0LC
0L9C999C99C99990
C99C99CC99C9999C
CCCCCCCCCCCCCCCC`],
    [ exit0, bitmap`
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10
LL1LL1LL1LL1LL1L
1111111111111111
1L11LLL11LLL11L1
11011L1011L10111
1100011000110001
1000110001100011
11101L1101L11011
1L11LLL11LLL11L1
1111111111111111
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10`],
    [ exit1, bitmap`
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10
LL1LL1LL1LL1LL1L
1111111111111111
1L51LLL11LLL11L1
11751L1011L10111
15D2751000110001
572D510001100011
11571L1101L11011
1L15LLL11LLL11L1
1111111111111111
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10`],
    [ exit2, bitmap`
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10
LL1LL1LL1LL1LL1L
1111111111111111
1L51LLL51LLL11L1
11751L1751L10111
15D2755D27510001
572D5572D5100011
11571L1571L11011
1L15LLL15LLL11L1
1111111111111111
0L10L10L10L10L10
0L10L10L10L10L10
0L10L10L10L10L10`],
    [ exit3, bitmap`
0L10L10L10L10L10
0L10L10L10L10L10
00L00L00L00L00L0
0000077000000000
0000700047777000
0700774427000000
0700752554477700
0074755005557077
0072450000524000
7007500000052400
0707500000052070
0074750000547007
0007555005574007
0700722552507007
0077744477007000
0000077470070000`],
    [ box, bitmap`
CCCCCCCCCCCCCCCC
CLC9999999999CLC
CCCC9CCC9CCCCCCC
C9CCC999999CCC9C
CCCCLC9CC9CLC9CC
C999CCC99CCC9999
C9999CLCCLC9999C
CCCCC9CCCC9CC9CC
C999C9CCCC99999C
C9999CLCCLC9CCCC
CC9CCCC99CCC9999
C99CLC9CC9CLC99C
C9CCC999999CCC9C
CCCC9CC9CCC9CCCC
CLC9999999999CLC
CCCCCCCCCCCCCCCC`],
    [ lbox, bitmap`
C999999C999999CC
CCCCCCCCCCCCCCC9
9C999999999C99C9
9C999999999999C9
9CC9CCCCCCC9CCC9
9C999999999999CC
CC999C999CC999C9
9C999999999999C9
9CCCCCCCC9CCCCC9
9C999999999999C9
CC999999999999CC
9CCCCCC9CCCCC9C9
9C999999999999C9
9C9C9999999C99C9
9CCCCCCCCCCCCCCC
CC99999C9999999C`],
	/*[ player, bitmap`
..........CCCC..
........CCCCC...
.......CCCCC....
......CCCCC.....
......CCCCC.....
.C...CCCCCCC....
.C..CCCCCCCCCC..
.CC...000000....
..C..02222200...
..C..02020220...
..CC.0222222CC..
...C.02222220C..
...C..CC6CCCCCC.
.......00000CCCC
.......0...0.CCC
.....000...000..` ],*/
    [ player, bitmap`
.........CCCC...
........CCCC....
.......CCCC.....
......CCCCC.....
.C...CCCCCCC....
.C..CCCCCCCCCC..
.CC...000000....
..C..02222200...
..C..02020220...
..CC.0222222CC..
...C.0222222CC..
...C..0000CCCCC.
.......C6CCCCCCC
.......00000CCCC
.......0...0.CCC
.....000...000..` ],
    [ zombie, bitmap`
................
........LLL.....
......LLLLLLL...
.L...LLDDDDFLL..
.L..LDD0DFDDLL..
.L...DDLFD0DD...
.L..DFDDDDLDDFD.
.DFDDDF3CDDDFDFD
.L...D300CDFDF.D
0L0..0D0C03DDD..
.0....000DD00...
.C....D000000...
.C....DD..00D...
......FD...FD...
......00...DF...
.....000...000..`],
    [ heart, bitmap`
................
................
................
....33....33....
...3333..3333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
................
................`],
    [ star, bitmap`
................
.......5........
......55........
......555.......
......5755......
.....5D7D55.....
....555275D555..
...55D722277555.
.555772227D55...
..555D572555....
.....55D7D5.....
......5575......
.......555......
........55......
........5.......
................`],
    [ key, bitmap`
................
................
................
................
................
................
................
...666..........
..66.66.........
..6...6666666...
..66.66..6.66...
...666..........
................
................
................
................`],
    [ floor, bitmap`
LLLLLL1LL111111L
L1L111111111111L
L11111111111111L
LL1111111111112L
L111111111111111
111111111111112L
111111111111111L
L11111111111112L
111111111111111L
111111111111112L
1111111111111221
111111111111112L
L11111111111211L
L111111112111221
111122121121221L
LL1LL11LLLL1LL1L`]
)
let level = 0;
const levels = [
 /* map`
hhhzzzzzzzzzzzzzs
szzzzzzzzzzzzzzzz
zzzzzz.zzzzzzzzzz
zzzz.....zzzzzzzz
zzz.......zzzzzzz
zzz.......zzzzzzz
zz....p....zzzzzz
zzz.......zzzzzzz
zzz.......zzzzzzz
zzzz.....zzzzzzzz
zzzzzz.zzzzzzzzzz
szzzzzzzzzzzzzzz0`,
  map`
....z....
....l....
....d....
.........
zld.p.dlz
.........
....d....
....l....
....z....`,
  map`
...w...w...w...w.k.ww
...w...w...w...w.z.ww
wdwwwdwwwdwwwdwwwlwww
p....................
wdwwwwwwwwwwwwwwwdwww
..w...ww.bz.zww......
.ww...w..wdwz.w.wwww.
.dd...d.wwdwwzd.w..w.
dwwwwwwwwwdwwww.w..w.
......w.......w.w..w.
......w.......w....w.
......w.......w.wwww.
......w.......w.w....
......w..wdw..w.w....
......w..w0w..w.w....`,//daf */
  map`
hhhwww
p.....
wwwww.
3.w...
w.w.w.
w...w.`,//Level 1
  map`
hhh..s
www.ww
.p....
.ww.w.
sws.w.
wwwww.
w0....`,//Level 2
  map`
hhhwpwswk
kwkw.w.w.
.w.w.wdw.
.........
wdwwdwwdw
...wkw...
.s.w0w.s.`,//Level 3
  map`
hhhwwww
p..ww0k
ww.wwwd
sw.wkw.
swkw.wd
.d.w...
ww.w.wd
kw.w.wk
kd.d.ws`,//Level 4
  map`
hhhwwww
p.l.k.w
dwwwwww
.l.ls.d
www.wwd
.kll...
2.bk..w`,//Level 5 
  map`
hhhwww
.s.www
dwbds1
p.lwww
.llkk.
..wwww`,//Level 6
  map`
hhhpbl...
wwww.w.ww
s..bb.blk
.l.bl..l.
..b.b....
wd.wwwwww
s...b.l.1`,//Level 7
  map`
hhhw.....
wwww.w.zk
p..d.w...
ww.wwwwdw
...ws....
.k.wzs..0
.z.wsz...`,//Level 8
  map`
hhhksww.H..wwk..
wwwwzww..z.ww...
p..w.wwz...ww..z
ww.w.w..........
ww.w.w.wwwwdwwww
z......ws...wwww
.wdwww.w.wwwwwHz
.wzsHw.w..z.wws.
.wwwww.wwww..w..
k...ww.ww0w..w.z
www....wwzw..wwd
kz..w.zww.dz....`,//Level 9
  map`
hhh.sbdwwwww
0wwww....www
kwz..bkwdwww
dw.wwwkks.zw
dw.wkwwwwwdw
dwdwkwwwwkbk
.k...dkdzwkw
wdw.bwww.w.w
wdww.www.www
wswp.....www`,//Level 10
  map`
hhhwwwwwwww
.ksw.k.wkkb
blld.z.dlbk
...w.b.wb.z
wdwww.www.w
p.........0
wbwwwdwwwdw
bsbw.b.wz..
.lldbzbd.bb
.bkwk..w.ds`,//Level 11
  map`
hhhw.w..zw.zz
wwww.d.z.dz.0
kz...w..Hw..z
wwww.wwwwwwww
p....d..wsz.b
ww.www.kwbbl.
.....ws.w....
.www.wwww...w
.zkw.z..lz..s`,//Level 12
  map`
hhh..b..k
pb.l..dbk
..kwdwwb.
wwwwdwwww
sz..z..z.
z.......z
...z...z.
z.zwzwz.z
sz.w0w.zs`,//Level 13
  map`
hhhwwwww.w...
www....llk.kk
p.dbkwwwbwws.
..w..l..k.wbl
bwwwwwwwwww.b
..wz.z.z.sw.s
..w.z.z.z.w..
.bwwwwdwwwwbk
llw0dz...ddd.
..www..z..wlb
k.w..z..z.w..
..w.z.....w.b
wdwwwwwwwww.b
..b.b....d...
.l..klb..d...`,//Level 14
  map`
hhhp....z...
wwwdwwwwwww.
......dddswz
zwwwwwwwwww.
kw.....z....
zwzwwwwwwdwd
kw.wszdzdzwz
ww.wwwwwwwzz
zd.d...wkwkk
zwzwzw.wkwkk
zwzwzw.wdwww
swkwkw.d.kk0`,//Level 15
 /* map`
hhhw...wpw...w.
wwww...w.w...w.
...w...w.w...w.
...wwdww.wwdww.
.............w.
w.wwwwww.ww.ww.
.......w.w...w.
.......w.w...w.
.......w.wwwww.
...............
...............
...............`,//Level 16*/
];

setMap(levels[level])
setBackground("f")

//global variables
let moveX;
let moveY;
let keysHeld = 0;
let playerHealth = 3;

//set solids
setSolids([ black, health, wall, exit0, exit1, exit2, player, zombie, box, lbox]);

//set pushables
setPushables({
  [player]: [box, lbox],
  [box]: [player, lbox],
  [lbox]: [player, zombie, lbox],
  [zombie]: [lbox],
})

//player movement
onInput("s", () => {
  moveX = 0
  moveY = 1
  getFirst(player).y += 1
})
onInput("w", () => {
  moveX = 0
  moveY = -1
  getFirst(player).y -= 1
})
onInput("a", () => {
  moveX = -1
  moveY = 0
  getFirst(player).x -= 1
})
onInput("d", () => {
  moveX = 1
  moveY = 0
  getFirst(player).x += 1
})
//attack
onInput("i", () => {
  let checkedAll = false;
  let i = 0;
  let zombs = getAll(zombie);
  while(i<zombs.length){
    zombs = getAll(zombie);
    while(i<zombs.length) {
      let distX = Math.abs(getFirst(player).x - zombs[i].x)
      let distY = Math.abs(getFirst(player).y - zombs[i].y)
      if(distX <= 1 && distY <= 1){
        getAll(zombie)[i].remove()
        break;
      }
      i++;
    }
  }
})
//reset level
onInput("j", () => {
  setMap(levels[level])
  keysHeld = 0;
  playerHealth = 3;
  clearText()
  gameLoop
})


  afterInput(() => {

    checkColision(moveX,moveY);
  
})

function checkColision(changeX, changeY){
  let p = getFirst(player);

  //if thing is in door
  if(getFirst(door) !== undefined){
    let doors = getAll(door);
    let boxes = getAll(box);
    let lboxes = getAll(lbox);
    //cycle doors
    for (let i = 0; i < doors.length; i++) {

      //if player is in door
      if (doors[i].x == p.x && doors[i].y == p.y) {
        if(keysHeld > 0){
          clearTile(p.x,p.y)
          addSprite(p.x,p.y,player)
          keysHeld--;
        }else{
          getFirst(player).x -= changeX
          getFirst(player).y -=changeY
        }
      }

    //if box is in door
    if(getFirst(box) !== undefined){
      for (let j = 0; j < boxes.length; j++) {
        if((doors[i].x == boxes[j].x) && (doors[i].y == boxes[j].y)){
          //move box
          getAll(box)[j].x -= changeX;
          getAll(box)[j].y -= changeY;
        }
      }
    }

    //if lbox is in door
      for (let j = 0; j < lboxes.length; j++) {
        if((doors[i].x == lboxes[j].x) && (doors[i].y == lboxes[j].y)){
          //addText("daf",{x: 0, y: 0, color: color`6`})
          //check if lbox will be in box
          for (let k = 0; k < boxes.length; k++) {
            if((lboxes[j].x-changeX == boxes[k].x) && (lboxes[j].y-changeY == boxes[k].y)){
              //if so move box
              getAll(box)[k].x -= changeX;
              getAll(box)[k].y -= changeY;
            }
          }
          //move lbox
          getAll(lbox)[j].x -= changeX;
          getAll(lbox)[j].y -= changeY;
          if(changeX == -1){
            addText("-1",{x: 4, y: 4, color: color`6`})
          }
        }
      }
    }

  }

  //If player is on star
  if(getFirst(star) !== undefined){
    let stars = getAll(star);
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].x == p.x && stars[i].y == p.y) {
        getAll(star)[i].remove();
        updateExit();
      }
    }
  }

  //If player is on key
  if(getFirst(key) !== undefined){
    let keys = getAll(key);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].x == p.x && keys[i].y == p.y) {
        getAll(key)[i].remove();
        keysHeld++;
      }
    }
  }

  //If player is on heart
  if(getFirst(heart) !== undefined){
    let hearts = getAll(heart);
    for (let i = 0; i < hearts.length; i++) {
      if (hearts[i].x == p.x && hearts[i].y == p.y) {
        getAll(heart)[i].remove();
        playerHealth++;
      }
    }
  }

  //If thing is in exit portal
  if(getFirst(exit3) != undefined){
    let exit = getFirst(exit3)
    //player
    if(p.x == exit.x && p.y == exit.y){
      if (level < levels.length) {
        level++;
        playerHealth = 3;
        setMap(levels[level])
      } else {
        addText("You won!", {
          x: 10,
          y:4,
          color: color`3`
        })
      }   
    }
    //box
    if(getFirst(box) !== undefined){
      let boxes = getAll(box)
      for (let j = 0; j < boxes.length; j++) {
        if((exit.x == boxes[j].x) && (exit.y == boxes[j].y)){
          //delete box
          getAll(box)[j].remove();
        }
      }
    }
    //lbox
    if(getFirst(lbox) !== undefined){
      let lboxes = getAll(lbox)
      for (let j = 0; j < lboxes.length; j++) {
        if((exit.x == lboxes[j].x) && (exit.y == lboxes[j].y)){
          //delete box
          getAll(lbox)[j].remove();
        }
      }
    }
  }
}

function updateExit(){
  if(getFirst(exit0) != undefined){
    getFirst(exit0).type = '1'
  }else if(getFirst(exit1) != undefined){
    getFirst(exit1).type = '2'
  }else if(getFirst(exit2) != undefined){
    getFirst(exit2).type = '3'
  }
}

function playerHearts(){
  clearTile(0,0)
  clearTile(1,0)
  clearTile(2,0)
  addSprite(0,0,black)
  addSprite(1,0,black)
  addSprite(2,0,black)
  if(playerHealth < 1){
    addText("You died!", {
          x: 10,
          y:4,
          color: color`3`
    })
    getFirst(player).remove();
  } if(playerHealth > 0){
    addSprite(0,0,health)
  } if(playerHealth > 1){
    addSprite(1,0,health)
  } if(playerHealth > 2){
    addSprite(2,0,health)
  }
}

function zombieInDoor(i,moveX,moveY){
  
  let doors = getAll(door);
  for (let j = 0; j < doors.length; j++) {
    if(getAll(zombie)[i].x == doors[j].x && getAll(zombie)[i].y == doors[j].y){
      getAll(zombie)[i].y -= moveY
      getAll(zombie)[i].x -= moveX
    }
  }
}


var gameLoop = setInterval(() => {
  if(getFirst(player) !== undefined){
  let p = getFirst(player);
  
  //zombies
  if(getFirst(zombie) !== undefined){
    let zombs = getAll(zombie);
    //loop all zombies
    for (let i = 0; i < zombs.length; i++) {
      let distX = p.x - zombs[i].x;
      let distY = p.y - zombs[i].y;
      let moveX = 0;
      let moveY = 0;
      
      //attack player
      if(Math.abs(distX) <= 1 && Math.abs(distY) <= 1){
        playerHealth--;
      } 
      
      //Movement
      //If player is in Range
      if( Math.sqrt( Math.pow(distX,2) + Math.pow(distY,2) ) <= 4){
        //move in direction with greater distance
        if( Math.abs(distX) >= Math.abs(distY) ){
          //move
          moveX = Math.sign(distX);
          getAll(zombie)[i].x += moveX
          zombieInDoor(i,moveX,0)
          //if zombie couldn't move, move in the other direction
          if( getAll(zombie)[i].x == zombs[i].x ){
            moveX = 0;
            moveY = Math.sign(distY)
            getAll(zombie)[i].y += moveY
            zombieInDoor(i,0,moveY)
          }
        }else{
          
          getAll(zombie)[i].y += Math.sign(distY)
          zombieInDoor(i,0,Math.sign(distY))
          //if zombie couldn't move, move in the other direction
          if( getAll(zombie)[i].y == zombs[i].y ){
            getAll(zombie)[i].x += Math.sign(distX)
            zombieInDoor(i,Math.sign(distX),0)
          }
        }
        //if zombie is in exit portal
        if(getFirst(exit3) != undefined){
          if(zombs[i].x == getFirst(exit3).x && zombs[i].y == getFirst(exit3).y){
            clearTile(zombs[i].x,zombs[i].y)
            addSprite(zombs[i].x,zombs[i].y,exit3)
          }
        }
        if(moveX == -1){
          addText("-1",{x: 4, y: 4, color: color`6`})
        }
        checkColision(moveX,moveY);
      }
    }
  }

  //player hearts
  playerHearts()
  }
  }, 300);

