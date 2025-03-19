/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: bombs and boxs
@author: JadenDownie
@tags: [puzzle]
@addedOn: 2024-00-00
*/
let onslect = false

const melody = tune`
75,
75: C4^75 + E4^75 + D4/75,
75: F4^75 + E4/75,
75: F4-75 + E4/75,
75: F4-75 + E4/75,
75: F4-75 + E4/75,
75: G4^75 + E4/75,
75: A4^75 + E4/75,
1800`

const player = "p"
const playerb = "P"
const box = "o"
const habox = "O"
const swich = "s"
const on = "n"
const off = "f"
const butten = "u"
const bomb = "m"
const wall = "w"
const hwall = "h"
const boom = "b"
const boom2 = "B"
const boom3 = "d"
const goal = "G"
const bomb4 = "4"
const b3 = "3"
const b2 = "2"
const b1 = "1"

setLegend(
  [ butten, bitmap`
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
.33333333333333.
.33333333333333.` ],
  [ swich, bitmap`
33............33
333..........333
.333........333.
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
.333........333.
333..........333
33............33` ],
  [ on, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ off, bitmap`
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333
3333333333333333` ],
  [ player, bitmap`
................
................
................
.....LLLLLL.....
....LLLLLLLL....
....L20LL20L....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LL....LL....
....LL....LL....
....LL....LL....
....000...000...
....0000..0000..` ],
  [ playerb, bitmap`
................
................
................
.....LLLLLL.....
....LLLLLLLL....
....L20LL20L....
....LLL0LLLL....
....LLL55LLL....
....LL5555LL....
....LL7777LL....
....LLL55LLL....
....LL....LL....
....LL....LL....
....LL....LL....
....000...000...
....0000..0000..` ],
  [ box, bitmap`
9999999999999999
999CCCCCCCCCC999
9999CCCCCCCC9999
9C999CCCCCC999C9
9CC999CCCC999CC9
9CCC999CC999CCC9
9CCCC999999CCCC9
9CCCCC9999CCCCC9
9CCCCC9999CCCCC9
9CCCC999999CCCC9
9CCC999CC999CCC9
9CC999CCCC999CC9
9C999CCCCCC999C9
9999CCCCCCCC9999
999CCCCCCCCCC999
9999999999999999` ],
  [ habox, bitmap`
1111111111111111
111CCCCCCCCCC111
11L1CCCCCCCC1L11
1C1L1CCCCCC1L1C1
1CC1L1CCCC1L1CC1
1CCC1L1CC1L1CCC1
1CCCC1L11L1CCCC1
1CCCCC1LL1CCCCC1
1CCCCC1LL1CCCCC1
1CCCC1L11L1CCCC1
1CCC1L1CC1L1CCC1
1CC1L1CCCC1L1CC1
1C1L1CCCCCC1L1C1
11L1CCCCCCCC1L11
111CCCCCCCCCC111
1111111111111111` ],
  [ bomb, bitmap`
................
......0.........
.......0........
.......00.......
.......00.......
.....555555.....
....55555555....
....55555555....
....75555557....
....77777777....
....57777775....
....55555555....
.....555555.....
................
................
................` ],
  [ bomb4, bitmap`
......9.........
.....999........
......90........
.......00.......
.......00.......
.....555555.....
....55555555....
....55555555....
....75555557....
....77777777....
....57777775....
....55555555....
.....555555.....
................
................
................` ],
  [ b3, bitmap`
................
.......9........
......999.......
.......90.......
.......00.......
.....555555.....
....55555555....
....55555555....
....75555557....
....77777777....
....57777775....
....55555555....
.....555555.....
................
................
................` ],
  [ b2, bitmap`
................
................
.......9........
......999.......
.......90.......
.....555555.....
....55555555....
....55555555....
....75555557....
....77777777....
....57777775....
....55555555....
.....555555.....
................
................
................` ],
  [ b1, bitmap`
................
................
................
.......9........
......999.......
.....555555.....
....55555555....
....55555555....
....75555557....
....77777777....
....57777775....
....55555555....
.....555555.....
................
................
................` ],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ hwall, bitmap`
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
LLLLLLLLLLLLLLLL` ],
  [ boom, bitmap`
................
.9.....999....9.
...9999999999...
...9999999999...
...99966666999..
..996666666699..
..9966669666699.
9999696666666999
9999666666669999
9999696669669999
9999966666699999
..99966669999...
..9999966999....
....99999999....
.9..99999.....9.
................`],
  [ boom2, bitmap`
................
.9..99999999..9.
....99999999....
..999996699999..
..999996666999..
9999966666699999
9999669666969999
9999666666669999
9996666666969999
.99666696666999.
..996666666699..
..999666669999..
...9999999999...
...9999999999...
.9....9999....9.
................`],
  [ boom3, bitmap`
................
.9..99999999..9.
....99999999....
..999996699999..
..999996666999..
9999966666699999
9999669666969999
9999666666669999
9996666666969999
.99666696666999.
..996666666699..
..999666669999..
...9999999999...
...9999999999...
.9....9999....9.
................`],
  [ goal, bitmap`
4444444444444444
4444444444444444
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
4444444444444444
4444444444444444`]
)         

setSolids([ player, playerb, box, habox, boom3, wall, hwall, on])

let level = 0
var levelCoplet = 18
const levels = [
  map`
hhhh
..p.
.o.G
hhhh`,
  map`
hhhG
p.ho
.mw.
hhhh`,
  map`
p...
..o.
...w
m.wG`,
  map`
p...
.oho
..Go
m.hG`,
  map`
m.P.m
wwwww
hwwwh
GoooG`,//
  map`
h.....
Gnuuo.
hhhhh.
.mp.hu
.u...n`, 
  map`
hhG
hhn
.Pu
fhw
uoo
...`,
  map`
mpmh..
houfuo
.umhn.
..hhuh
..unfh
hhhhGh`,
  map`
h....un
hpowhh.
.moufuu
h.owhhw
h.Gwm.G`,//
  map`
p..m
....
o..O
G..G`,
  map`
p..h
.hOh
m.OG
mhGh`,
  map`
mmmmmPmmmmm
mhhhhmhhhhm
m.OOOOoOO.m
..OOOoOOO..
..OoOOOOO..
..OOoOOOO..
..OOOOOoO..
m.OOOOoOO.m
mhhhhwhhhhm
hhhGo.oGhhh`,
  map`
mm..h
Pohwh
mOhwh
.wOOG
hGhGh`,//
  map`
pm.hh
moOmh
mO.uG
.uhhh
.unG.`,
  map`
mmm...p
mO...hh
m...On.
....Ouh
..OOhh.
.hnuh..
.hGh...`,
  map`
GhhhhhG
OpOGGuw
...h.h.
h.mhom.
h.o...n
h....nm`,
  map`
wGwwwwwww
wu.fOwwww
ww.wwwGwm
wwom.mwwm
Gww.P.Owm
Owwm.mmwm
wwwwwwwnw
mmwwwow.w
mwwwwwmwG`,//
  map`
3wwwwwwwww4
wwwmmmmmwww
wwwGwwwGwww
www..m..www
www.mPm.www
www..m..www
wwwGwwwGwww
wwwmmmmmwww
2wwwwwwwww1`,//end
  map`
.p........
.GGGGGGGG.
........G.
.GGGGGGGG.
..........`
]

const maplevel = levels[level];
setMap(levels[level]);
addText("wasd = move", {
  x: 5,
  y: 15,
  color: color`0`
})
addText("J = Reset", {
  x: 6,
  y: 14,
  color: color`0`
})

setPushables({
  [ player ]: [ box ], 
  [ playerb ]: [ box ], 
  [ boom3 ]: [ habox ],
  [ habox ]: [ box, habox ],
  [ box ]: [ habox ]
})

onInput("s", () => {
  if (tilesWith(player).length == 1) {
    getFirst(player).y += 1
  } else if (tilesWith(playerb).length == 1) {
    getFirst(playerb).y += 1
  }
})

onInput("w", () => {
  if (tilesWith(player).length == 1) {
    getFirst(player).y -= 1
  } else if (tilesWith(playerb).length == 1) {
    getFirst(playerb).y -= 1
  }
})

onInput("a", () => {
  if (tilesWith(player).length == 1) {
    getFirst(player).x -= 1
  } else if (tilesWith(playerb).length == 1) {
    getFirst(playerb).x -= 1
  }
})

onInput("d", () => {
  if (tilesWith(player).length == 1) {
    getFirst(player).x += 1
  } else if (tilesWith(playerb).length == 1) {
    getFirst(playerb).x += 1
  }
})

var cbomb = 0
var co = 0
var cp = 0
var cP = 0
var cO = 0

onInput("j", () => {
  cbomb = 0
  co = 0
  cp = 0
  cP = 0
  cO = 0
  const maplevel = levels[level];
  setMap(levels[level]);
})

onInput("i", () => {
  //console.log(tilesWith(butten, bomb, player).length)
  if (tilesWith(bomb, player).length == 1){
    var playx = getFirst(player).x 
    var playy = getFirst(player).y
    if (tilesWith(butten, bomb, player).length > 0){
     clearTile(playx, playy) 
     addSprite(playx, playy, butten)
    } else {
     clearTile(playx, playy)
    }
    addSprite(playx, playy, playerb)
  } else if (tilesWith(playerb).length == 1){
    if (tilesWith(playerb, goal).length !== 1){
      if (tilesWith(playerb, bomb).length !== 1){
        if (tilesWith(playerb, on).length !== 1){
          var playx = getFirst(playerb).x 
          var playy = getFirst(playerb).y
          getFirst(playerb).remove()
          addSprite(playx, playy, player)
          addSprite(playx, playy, bomb)
        }
      }
    }
  }
  
})

onInput("k", () => {
  //console.log (onslect)
  if (onslect) {
    slect(1, 3, 16)
    slect(2, 3, 15)
    slect(3, 3, 14)
    slect(4, 3, 13)
    slect(5, 3, 12)
    slect(6, 3, 11)
    slect(7, 3, 10)
    slect(8, 3, 9)
    slect(8, 2, 8)
    slect(8, 1, 7)
    slect(7, 1, 6)
    slect(6, 1, 5)
    slect(5, 1, 4)
    slect(4, 1, 3)
    slect(2, 1, 1)
    slect(3, 1, 2)
    slect(1, 1, 0)
  } 
  if (tilesWith(bomb, player).length == 1){
    if (tilesWith(bomb4, b3, b2, b1).length == 0){
      var playx = getFirst(player).x 
      var playy = getFirst(player).y
        if (tilesWith(butten, bomb, player).length > 0){
          clearTile(playx, playy)
          addSprite(playx, playy, butten)
        } else {
          clearTile(playx, playy)
        }
        addSprite(playx, playy, player)
        addSprite(playx, playy, bomb4)
    }
  }
})

onInput("l", () => {
  level = level = 18
  const maplevel = levels[level];
  setMap(levels[level]);
  onslect = true
   addText("1 2 3 4 5 6 7 8", {
     x: 2,
     y: 5,
     color: color`0`
  })
   addText("9 ", {
     x: 16,
     y: 7,
     color: color`0`
  })
   addText("1716151413121110", {
     x: 2,
     y: 9,
     color: color`0`
  })
})

afterInput(() => {
  if (tilesWith(goal).length == tilesWith(goal, box).length + tilesWith(goal, habox).length) {
    clearText()
    cbomb = 0
    co = 0
    cp = 0
    cP = 0
    level = level + 1;
    if (levelCoplet <= level){
      levelCoplet = levelCoplet + 1;
    }
    const maplevel = levels[level];
    setMap(levels[level]);
    if (level == 1) {
      addText("K = Light", {
      x: 6,
      y: 15,
      color: color`0`
    })
    } else if (level == 2){
      addText("I = What?", {
      x: 6,
      y: 15,
      color: color`0`
    })
    } else if (level == 17){
      addText("YOU  WIN", {
      x: 6,
      y: 1,
      color: color`0`
    })
    }
  } 
})

afterInput(() => {
  //console.log(getFirst(hwall))
  //if (getAll(bomb4, b3, b2, b1).length == 1){
    while (getAll(boom).length > 0){
      getFirst(boom).remove()
    }
    if (getAll(b1).length == 1){
      var bombx = getFirst(b1).x
      var bomby = getFirst(b1).y
      getFirst(b1).remove()
      exsplod(bombx, bomby);
      exsplod(bombx+1, bomby, true, true);
      exsplod(bombx-1, bomby, false, true);
      exsplod(bombx, bomby+1, true, false);
      exsplod(bombx, bomby-1, false, false);
      //addSprite(bombx, bomby, bomb)
    } 
  
    if (getAll(b2).length == 1){
      var bombx = getFirst(b2).x
      var bomby = getFirst(b2).y
      getFirst(b2).remove()
      addSprite(bombx, bomby, b1)
    } 
    if (getAll(b3).length == 1){
      var bombx = getFirst(b3).x
      var bomby = getFirst(b3).y
      getFirst(b3).remove()
      addSprite(bombx, bomby, b2)
    }
    if (getAll(bomb4).length == 1){
      afterInput(() => {
        if (tilesWith(bomb4).length == 1){
        var bombx = getFirst(bomb4).x
        var bomby = getFirst(bomb4).y
        getFirst(bomb4).remove()
        addSprite(bombx, bomby, b3)
        }
      })
    }
  //}
})



afterInput(() => {
  //console.log(onoff)
  //console.log(tilesWith(butten, bomb).length)// < cbomb)
  //console.log(tilesWith(butten, box).length)
  //console.log(tilesWith(butten, player).length)
  //console.log(tilesWith(butten, playerb).length)
  //console.log(cbomb)
  if (tilesWith(butten, bomb).length < cbomb) {
    onoff()
    cbomb -= 1
  }
  if (tilesWith(butten, bomb).length > cbomb) {
    onoff()
    cbomb += 1
  }
  if (tilesWith(butten, box).length < co) {
    onoff()
    co -= 1
  }
  if (tilesWith(butten, box).length > co) {
    onoff()
    co += 1
  }
  if (tilesWith(butten, player).length < cp) {
    onoff()
    cp -= 1
  }
  if (tilesWith(butten, player).length > cp) {
    onoff()
    cp += 1
  }
  if (tilesWith(butten, playerb).length < cP) {
    onoff()
    cP -= 1
  }
  if (tilesWith(butten, playerb).length > cP) {
    onoff()
    cP += 1
  }
  if (tilesWith(butten, habox).length < cO) {
    onoff()
    cO -= 1
  }
  if (tilesWith(butten, habox).length > cO) {
    onoff()
    cO += 1
  }
})

function onoff(){
  //console.log(tilesWith(off).length)
  //console.log(tilesWith(on).length)
  
  while (tilesWith(off).length > 0){
    addSprite(getFirst(off).x, getFirst(off).y, swich)
    getFirst(off).remove()
  }
  while (tilesWith(on).length > 0){
    addSprite(getFirst(on).x, getFirst(on).y, off)
    getFirst(on).remove()
  }
  while (tilesWith(swich).length > 0){
    addSprite(getFirst(swich).x, getFirst(swich).y, on)
    getFirst(swich).remove()
  }
}

function exsplod(xs, ys, pont, pont2){
  //console.log(x, y)
  if (xs >= 0) {
    if (ys >= 0) {
      if (ys < height()) {
        if (xs < width()) {
          addSprite(xs, ys, boom2)
          if (tilesWith(boom2, hwall).length == 1){
            getFirst(boom2).remove()
          } else if (tilesWith(boom2, goal).length == 1){
            getFirst(boom2).remove()
          } else if (tilesWith(boom2, on).length == 1){
            getFirst(boom2).remove()
          } else if (tilesWith(boom2, habox).length == 1){
            if (pont) {
              if (pont2) {
                addSprite(xs-1, ys, boom3)
                getFirst(boom3).x += 1
                
              } else {
                addSprite(xs, ys-1, boom3)
                getFirst(boom3).y += 1
              }
            } else {
              if (pont2) {
                addSprite(xs+1, ys, boom3)
                getFirst(boom3).x -= 1
              } else {
                addSprite(xs, ys+1, boom3)
                getFirst(boom3).y -= 1
              }
            }
            getFirst(boom3).remove()
            if (tilesWith(boom2, habox).length !== 1) {
              getFirst(boom2).remove()
              clearTile(xs, ys)
              addSprite(xs, ys, boom)
            } else {
              getFirst(boom2).remove()
            }
          } else {
            clearTile(xs, ys)
            addSprite(xs, ys, boom)
          }
        }
      }
    }
  }
}

function slect(xe, ye, levelon){
  if (onslect){
    //console.log(getFirst(player).x)
    if (getFirst(player).x == xe){
      if (getFirst(player).y == ye){
        if (levelCoplet >= levelon){
          //console.log(getFirst(player).x)
          clearText()
          level = levelon;
          const maplevel = levels[level];
          setMap(levels[level]);
          onslect = false
          clearText()
        }
      }
    }
  }
}