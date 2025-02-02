/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Subconscious Revolution
@author: 
@tags: []
@addedOn: 2024-00-00
*/

let Phase2count = 10
let Phase1count = 150

const player = "p"
const shadow = "s"
const persona = "e"
const animaillusion = "a"
const animatrue = "t"
const self = "f"
const guard = "g"
const ship = "h"
const meteor = "m"
const enemyshipstable = "c"
const enemyshipactive = "o"
const laser = "l"
const starbackground1 = "1"
const starbackground2 = "2"
const starbackground3 = "3"
const starbackground4 = "4"
const starbackground5 = "5"
const planetpiece1 = "6"
const planetpiece2 = "7"
const planetpiece3 = "8"
const planetpiece4 = "9"
const planetpiece5 = "0"
const wall = "w"
const wall2 = "q"
const door = "d"
const flag = "y"
const dialogueSplit = "D"
const controlGearStable = "G"
const controlGearSelect = "S"
const electricGear = "Q"
const electricityRD = "W"
const electricityLD = "E"
const robotArm = "R"
const robotHand = "T"
const trap = "Y"
const pow = "U"

let meteorcount = 150
let meteorcount3 = 250
let dialogueKeyGuard = 0
let titleSelection=0


let orange = 0



setLegend(
  [self, bitmap`
................
....00000000....
...0122222220...
...0111222220...
...0221112220...
...0222211220...
...0222222110...
....00000000....
...0L666666L0...
..0LLL6776LLL0..
.02L0LL66LL0L20.
.0220LLLLLL0220.
..00066LL66000..
.....0L00L0.....
....0LL00LL0....
....06600660....`],
  [shadow, bitmap`
L..............L
LL...000000...LL
LLLL0LLL3330LLLL
.LL1LLLL33331LL.
..11LL3L303311..
...0LL3L30330...
...0LLLL33330...
....0LLL3330....
...03000000L0...
..0333300LLLL0..
.0330333LLL0LL0.
.0330333LLL0LL0.
..000CCCCCC000..
.....0L0030.....
....0LL00330....
....01100110....`],
  [persona, bitmap`
....000.........
...01110LLL.....
...01100222L....
...01110242L....
...01010242L....
...01100222L....
...01110LLL.....
....0001111L....
...L11111111L...
..L21L1441L12L..
..L22L1111L22L..
...LLL1111LLL...
......L11L......
.....L1LL1L.....
.....L2LL2L.....
.....LLLLLL.....`],
  [animaillusion, bitmap`
.......00.......
.....006600.....
....07622670....
...0762662670...
...0566666650...
..0FFFFFFFFFF0..
...0625225260...
...0625225260...
...0602222060...
...0660000660...
...0677557760...
...0775555770...
..025556655520..
...0055555500...
....07577570....
.....070070.....`],
  [animatrue, bitmap`
.......00.......
.....003300.....
....04311340....
...0431331340...
...0D333333D0...
..0CCCCCCCCCC0..
...0D131131D0...
.000D131131D000.
0DD0D011110D0DD0
3D00DD0000DD00D3
00.0D44DD44D0.00
...044DDDD440...
..01DDD66DDD10..
...00DDDDDD00...
....04D44D40....
.....040040.....`],
  [player, bitmap`
..6.6..66..6.6..
..676767767676..
..667666666766..
..666222222666..
...0227227220...
...0227227220...
...0222222220...
....00000000....
...0L666666L0...
..0LLL6776LLL0..
.02L0LL66LL0L20.
.0220LLLLLL0220.
..00066LL66000..
.....0L00L0.....
....0LL00LL0....
....06600660....`],
  [guard, bitmap`
.....LLLLLL.....
....L111111L....
...L11111111L...
..1L1L6L1111L1..
..1L11L11111L1..
..L5111111115L..
..L5L111111L5L..
..1L.L1111LLL1..
..L1..5LL5..1L..
..00..L11L..00..
..3...L11L...3..
..3...5115...3..
..3...9669...3..
......9999......
.......99.......
.......00.......`],
  [ship, bitmap`
................
.......00.......
......0220......
.0....0770....0.
0L0..005500..0L0
000000L00L000000
022221L00L122220
0211L1L00L111120
01LL1LL00LL11110
01LL1LL00LL11110
.001LL01L0LL100.
..00100LL00100..
...000L00L000...
.....010010.....
.....00..00.....
................`],
  [meteor, bitmap`
................
................
......00000.....
.....0111110....
....011101100...
...0111111110...
..0110111111L0..
..011111110LL0..
..0101101LLLL0..
..01111LLLL0L0..
...01LLLLLLL0...
...0LLL0LLL0....
...000LLLL0.....
......0000......
................
................`],
  [enemyshipstable, bitmap`
................
................
................
......2222......
....22111122....
...2111111112...
..211331133112..
..211111111112..
..211111111112..
...2211111122...
...212....212...
..21112..21112..
..211112211112..
...2111221112...
....22122122....
......2..2......`],
  [enemyshipactive, bitmap`
................
................
................
......2222......
....22555522....
...2555555552...
..255335533552..
..255555555552..
..255555555552..
...2255555522...
...2522222252...
..25552..25552..
..255552255552..
...2555225552...
....22522522....
......2..2......`],
  [laser, bitmap`
.....127221.....
.....122721.....
.....127221.....
.....122721.....
.....127221.....
.....122721.....
.....127221.....
.....122721.....
.....127221.....
.....122721.....
.....127221.....
.....122721.....
.....127221.....
.....122721.....
.....127221.....
.....122721.....`],
  [starbackground1, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000020000000000
0000000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0020000000000000
0000000000000000`],
  [starbackground2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000220000
0000000000220000
0000000000000000
0000200000000000
0000000000000000
0000000000000000
0000000000000000
0000000200000000
0200000000000000
0000000000000000`],
  [starbackground3, bitmap`
0000000000000000
0000000000000000
0000000000000200
0000000000000000
0000000000000000
0000000002000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000
0022000000000000
0022000000000000
0000000000000000
0000000000000000`],
  [starbackground4, bitmap`
0000000000000000
0000000000000000
0000000000002000
0093300000000000
0555550000000000
0039900000000000
0000000000000000
0000000000000000
0000000000000000
0000000020000000
0020000000000000
0000000000000000
0000000200000000
0020000000000200
0000000000000000
0000000000000000`],
  [starbackground5, bitmap`
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
  [planetpiece1, bitmap `
0000000000000000
0001111111111020
0017444444444100
0117744444444110
0147774444D44D10
144477744444DDD1
14444777444DDDD1
144444777DDDDDD1
14444447DDDDDDD1
14444DDDDDDDDDD1
1444DD22222DDDD1
014DD22222DDDD10
011DDDDDDDDDD110
001DDDDDDDDDD100
2001111111111000
0000000000000000`],
  [planetpiece2, bitmap`
0000000000000000
0000000000000000
0000001111111111
0000001111111111
0000117744444444
0000117744444DD4
0011117777444DD4
0011117777444444
0011447777774444
0011447777774444
1144444477777744
1144444477777744
1144DD4444777777
1144DD4444777777
1144444444447777
1144444444447777`],
  [planetpiece3, bitmap`
0000000000000000
0000000000000000
1111111111000000
1111111111000000
4444444444110000
4444444444110000
4444444444111100
444DD44444111100
444DD44444DD1100
4444444444DD1100
44444444DDDDDD11
44444444DDDDDD11
444444DDDDDDDD11
444444DDDDDDDD11
77DDDDDD2222DD11
77DDDDDD2222DD11`],
  [planetpiece4, bitmap`
1144444444444477
1144444444444477
1144444444DDDDDD
1144444444DDDDDD
11444444DDDD2222
11444444DDDD2222
001144DDDD222222
001144DDDD222222
001111DDDDDDDDDD
001111DDDDDDDDDD
000011DDDDDDDDDD
000011DDDDDDDDDD
0000001111111111
0000001111111111
2200000000000000
2200000000000000`],
  [planetpiece5, bitmap`
DDDDDDDDDDDDDD11
DDDDDDDDDDDDDD11
DDDDDDDDDDDDDD11
DDDDDDDDDDDDDD11
222222DDDDDDDD11
222222DDDDDDDD11
2222DDDDDDDD1100
2222DDDDDDDD1100
DDDDDDDDDD111100
DDDDDDDDDD111100
DDDDDDDDDD110000
DDDDDDDDDD110000
1111111111000000
1111111111000000
0000000000000000
0000000000000000`],
  [wall, bitmap`
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
  [door, bitmap`
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
  [wall2, bitmap`
.00000000000000.
0000000000000000
00LLL111LLLLLL00
00LL111LLLLLL100
00L111LLLLLL1L00
00111LLLLLL1LL00
0011LLLLLL1LLL00
001LLLLLL1LLL100
00LLLLLL1LLL1100
00LLLLL1LLL11L00
00LLLL1LLL11LL00
00LLL1LLL11LLL00
00LL1LLL11LLLL00
00L1LLL11LLLLL00
0000000000000000
.00000000000000.`],
  [flag, bitmap`
..........LL00..
.........LLH00..
.......LLLHH00..
....LLLLHHHH00..
..LLLH6H6H6H00..
.LHHHHH666HH00..
LHHHHHH676HH00..
.LHHHHH666HH00..
..LLLH6H6H6H00..
....LLLLHHHH00..
.......LLLHH00..
.........LLH00..
..........LL00..
............00..
............00..
............00..`],
  [dialogueSplit, bitmap`
0000000000000000
0000000000000000
2222222222222222
2222222222222222
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
  [controlGearStable, bitmap`
................
......5555......
...55.5665.55...
..566556655665..
..566666666665..
...5666556665...
.55566522566555.
.56665222256665.
.56665222256665.
.55566522566555.
...5666556665...
..566666666665..
..566556655665..
...55.5665.55...
......5555......
................`],
  [controlGearSelect, bitmap`
................
......6666......
...66.6556.66...
..655665566556..
..655555555556..
...6555665556...
.66655622655666.
.65556222265556.
.65556222265556.
.66655622655666.
...6555665556...
..655555555556..
..655665566556..
...66.6556.66...
......6666......
................`],
  [electricGear, bitmap`
0060000060006000
0606660606660600
0600006000000060
6000000000000006
0600010110100006
06001L1LL1L10060
060001L11L100060
006001L11L100600
006001L11L100060
00601L1LL1L10060
0600010110100060
0600000000000060
0600000000000006
0060600666000060
0006066000666060
0000000000000600`],
  [electricityRD, bitmap`
0000000000000066
0000000000000666
0000000000006660
0000000000066600
0000000000666000
0000000006660000
0000000066600000
0000000666000000
0000006660000000
0000066600000000
0000666000000000
0006660000000000
0066600000000000
0666000000000000
6660000000000000
6600000000000000`],
  [electricityLD, bitmap`
6600000000000000
6660000000000000
0666000000000000
0066600000000000
0006660000000000
0000666000000000
0000066600000000
0000006660000000
0000000666000000
0000000066600000
0000000006660000
0000000000666000
0000000000066600
0000000000006660
0000000000000666
0000000000000066`],
  [robotArm, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
3111113111113113
3311131311131313
3131311131311133
3113111113111113
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [robotHand, bitmap`
0000000000000000
00000LLLLL000000
000LL11111L00000
00L11111111L0000
00L111LL1111L0L0
0L111L00L1111L1L
00LLL0000LL11L1L
0000000000L11L1L
0000000000L11L1L
00LLL0000LL11L1L
0L111L00L1111L1L
00L111LL1111L0L0
00L11111111L0000
000LL11111L00000
00000LLLLL000000
0000000000000000`],
  [trap, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L113333333311L0
0L113333333311L0
0L111113311111L0
0L111113311111L0
0L111113311111L0
0L111113311111L0
0L111113311111L0
0L111113311111L0
0L111113311111L0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [pow, bitmap`
0000000000000000
0000000000000000
0033333333333300
0033333333333300
00LLLLLLLL993L00
00L39LL9LL993L00
00L39LL6LL993L00
00LLLLL6LL993L00
00L399L6LL9L3L00
00L399L6LL9L3L00
00L399L9LL9L3L00
00L399LLLLL3LL00
0033333333333300
0033333333333300
0000000000000000
0000000000000000`],
)

setSolids([player, wall, wall2, guard])

setBackground(starbackground5)

let level = 5
const levels = [
  map `
11111111111G
111111111111
155555555111
155555555111
155555555111
111111111111
111111111111`,
  map`
11112131111132
35121512114111
54115155151113
15511451113514
11213515115125
45115131311112
11512151251514
15213111111211
111111h1111111`,
  map`
11112131111132
35121512114111
54115155151113
15511451113514
11213515115125
45115131311112
11512151251514
15213111111211
111111h1111111`,
  map`
11112131111132
35121512114111
54115155151113
15511451113514
11213515115125
45115131311112
11512151251514
15213111111211
111111h1111111`,
  map`
11251178111132
35121590114111
54115115151113
15511451113514
11213515115125
45115131311112
11512151251514
15213111111211
111111h1111111`,
  map`
14135131133541
23521111211111
23123541y1112y
54152211w1ww1w
13521141wqwwqw
52135111qwqqwq
11113111wwwwww
21p11g12dwwwww
wwwwwwwwwwwwww`,
  map`
g5555555
DDDDDDDD
55555555
55555555
55555555`,
  map `
555555555555
555555555555
555555555555
555555555555
555555555555
555555555555
555555555555`,
  map`
.................
..............Q..
.......Q.....W...
......W.....Q....
.....W...Q.......
....W.....E......
...Q.......E.....
............Q....
p...............g`,
  
]



setMap(levels[level])

setPushables({
  [player]: []
})

setInterval(destructionByMeteor, 1)
setInterval(addMeteors, 130)
setInterval(addEnemyShips, 200)
setInterval(addEnemyShipsFinal, 1500)
setInterval(destructionByLaser, 1)
setInterval(shipLanding, 1)
setInterval(gravity, 600)
setInterval(guardDialogue, 1)
setInterval(titleScreen, 1)
setInterval(controlsForGame, 1)
setInterval(toBeContinued, 1)

onInput("s", () => {
  if (level==0){
    titleSelection+=1
  }
  if (level < 5 && level!=0) {
    getFirst(ship).y += 1
  } else if (level == 5 || level == 8) {
    getFirst(player).y += 1
  }
})
onInput("w", () => {
  if (level==0){
    titleSelection+=1
  }
  if ((level < 4 && level!=0) && getFirst(ship).y == height() - 1) {
    getFirst(ship).y -= 1
  } else if (level == 4) {
    getFirst(ship).y -= 1
  } else if (level == 5 || level == 8) {
    getFirst(player).y -= 1
  }
})
onInput("d", () => {
  if (level < 5 && level!=0) {
    getFirst(ship).x += 1
  } else if (level == 5) {
    getFirst(player).x += 1
  }
})
onInput("a", () => {
  if (level < 5 && level!=0) {
    getFirst(ship).x -= 1
  } else if (level == 5) {
    getFirst(player).x -= 1
  }
})

onInput("i", () => {
  if(level==0 && titleSelection==2){
    level+=1
    setMap(levels[level])
  }
  if (level==0 && titleSelection==1){
    clearText()
    level=7
    setMap(levels[level])
  }
  if (level == 5 && getFirst(player).x + 1 == getFirst(guard).x) {
    level += 1
    setMap(levels[level])
  }
  else if (level == 6){
    dialogueKeyGuard+=1
  }
})

onInput("k", () => {
  if (level==7){
    clearText()
    level=0
    setMap(levels[level])
  }
})

afterInput(() => {
  destructionByMeteor()
  destructionByLaser()
})

function addMeteors() {
  if (level == 1) {
    if (meteorcount > 0) {
      let yval = 0;
      let xval = Math.floor(Math.random() * width());
      addSprite(xval, yval, meteor)
      meteorcount -= 1
      clearText()
      addText(String(meteorcount), { x: 1, y: 1, color: color`2` })
    } else {
      clearText()

    }
    getAll(meteor).forEach((meteor) => {

      if (meteor.y < height() - 1) {
        meteor.y += 1;
      } else {
        meteor.remove()
      }
    })

    if (tilesWith(meteor).length == 0 && level == 1) {
      (getFirst(ship)).y -= 1
      if (getFirst(ship).y == 0) {
        level += 1
        setMap(levels[level])
      }
    }
  }
  if (level == 3) {
    const tilesOccupiedByShips = tilesWith(enemyshipactive, enemyshipstable)
    if (meteorcount3 > 0) {
      let yval = 0;
      let xval = Math.floor(Math.random() * width());
      tilesOccupiedByShips.forEach((enemyshipactive, enemyshipstable) => {
        if (xval == enemyshipactive.x || xval == enemyshipstable) {
          xval == Math.floor(Math.random() * width());
        }
      })
      addSprite(xval, yval, meteor)
      meteorcount3 -= 1
      clearText()
      addText(String(meteorcount3), { x: 1, y: 1, color: color`2` })
    } else {
      clearText()
    }
    getAll(meteor).forEach((meteor) => {

      if (meteor.y < height() - 1) {
        meteor.y += 1;
      } else {
        meteor.remove()
      }
    })

    if (tilesWith(meteor).length == 0 && level == 3) {
      for (let x = 0; x < width(); x++) {
          clearTile(x,0)
      }
      getAll(laser).forEach((laser) => {
          laser.remove()
        });
      (getFirst(ship)).y -= 1
      if (getFirst(ship).y == 0) {
        level += 1
        setMap(levels[level])
      }
    }
  }
}

function destructionByMeteor() {
  if (level == 1 || level == 3) {
    if (tilesWith(ship, meteor).length > 0) {
      clearTile(player.x, player.y)
      setMap(levels[level])
      if (level == 1) {
        meteorcount = 150
      }
      if (level == 3) {
        meteorcount3 = 250
      }
      apple = true
      banana = 0
      orange = 0
      clearText()
    }
  }
}

let apple = true
let banana = 0

function addEnemyShips() {
  if (level == 2) {
    if (level == 2 && tilesWith(enemyshipstable).length + tilesWith(enemyshipactive).length < width()) {
      let yval = 0;
      let xval = tilesWith(enemyshipstable).length;
      addSprite(xval, yval, enemyshipstable)
    }
    if (tilesWith(enemyshipactive).length < width() && level == 2 && tilesWith(enemyshipstable).length + tilesWith(enemyshipactive).length == width() && apple) {
      getFirst(enemyshipstable).type = enemyshipactive
      if (tilesWith(enemyshipactive).length == width()) {
        apple = false
      }
    }
    if (tilesWith(enemyshipactive).length == width() && apple == false) {
      let xval = Math.floor(Math.random() * width());
      clearTile(xval, 0)
      addSprite(xval, 0, enemyshipstable)
      setTimeout(() => {
        for (let i = 1; i < height(); i++) {
          getAll(enemyshipactive).forEach((enemyshipactive) => {
            addSprite(enemyshipactive.x, i, laser)
          })
        }
        banana += 1
      }, 2000);
      setTimeout(() => {
        getAll(laser).forEach((laser) => {
          laser.remove()
          apple = true
        });
      }, 2500)
      if (banana <= Phase2count) {
        clearText()
        addText(String(Phase2count - banana), { x: 1, y: 1, color: color`2` })
      } else {
        clearText()
      }
    }
    if (banana > Phase2count && level == 2) {
      getAll(laser).forEach((laser) => {
        laser.remove()
      });
      getAll(enemyshipactive).forEach((enemyshipactive) => {
        enemyshipactive.remove()
      });
      getAll(enemyshipstable).forEach((enemyshipstable) => {
        enemyshipstable.remove()
      });
      (getFirst(ship)).y -= 1
      if (getFirst(ship).y == 0) {
        level += 1
        meteorcount = 150
        setMap(levels[level])
      }
    }
  }

}

function addEnemyShipsFinal() {
  if (level == 3) {
    if (orange == 0 && tilesWith(enemyshipstable).length == 0) {
      let rando = getRandomUniqueNumbers(4)
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          addSprite(rando[i], 0, enemyshipstable)
        }
        orange += 1
      }, 1000)

    }
    if (orange == 1 && tilesWith(enemyshipstable).length == 4) {
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          getAll(enemyshipstable).forEach((enemyshipstable) => {
            addSprite(enemyshipstable.x, 0, enemyshipactive)
            enemyshipstable.remove()
            for (let i = 1; i < height(); i++) {
              getAll(enemyshipactive).forEach((enemyshipactive) => {
                addSprite(enemyshipactive.x, i, laser)
              })
            }
            orange = 2
          })
        }

      }, 1000)

    }
    if (orange == 2 && tilesWith(enemyshipactive).length == 4) {
      setTimeout(() => {
        while (tilesWith(enemyshipactive).length > 0) {
          getFirst(enemyshipactive).remove()
        }
        while (tilesWith(laser).length > 0) {
          getFirst(laser).remove()
        }
        orange = 0
      }, 1000)

    }


  }
}


function destructionByLaser() {
  if (level == 2 || level == 3) {
    if (tilesWith(ship, laser).length > 0) {
      clearTile(player.x, player.y)
      setMap(levels[level])
      meteorcount3 = 250
      apple = true
      banana = 0
      orange = 0
      clearText()
      if (level == 2) {
        addText(String(Phase2count - banana), { x: 1, y: 1, color: color`2` })
      }
    }
  }
}

function shipLanding() {
  if (level == 4 && (tilesWith(ship, planetpiece2).length > 0 || tilesWith(ship, planetpiece3).length > 0 || tilesWith(ship, planetpiece4).length > 0 || tilesWith(ship, planetpiece5).length > 0)) {
    level += 1
    setMap(levels[level])
  }
}

function gravity() {
  if (level == 5 || level == 8) {
    getFirst(player).y += 1
  }
}

function guardDialogue(){
  if (level==6){
    if (dialogueKeyGuard==0){
      addText("Wha-",{x:0,y:6, color: color`2`})
    }
    if (dialogueKeyGuard==1){
      clearText()
      addText("What are you doing",{x:0,y:6, color: color`2`})
      addText("here?!",{x:0,y:8, color: color`2`})
    }
    if (dialogueKeyGuard==2){
      clearText()
      addText("How did you make it",{x:0,y:6, color: color`2`})
      addText("past all the",{x:0,y:8, color: color`2`})
      addText("distractions?",{x:0,y:10, color: color`2`})
    }
    if (dialogueKeyGuard==3){
      clearText()
      addText("I'm pretty sure ",{x:1,y:6, color: color`2`})
      addText("protocol requires",{x:1,y:8, color: color`2`})
      addText("that I don't let",{x:1,y:10, color: color`2`})
      addText("you go any further.",{x:1,y:12, color: color`2`})
    }
    if (dialogueKeyGuard==4){
      clearText()
      addText("So um... ",{x:1,y:6, color: color`2`})
    }
    if (dialogueKeyGuard==5){
      clearText()
      addText("PREPARE FOR YOUR",{x:1,y:6, color: color`2`})
      addText("DOOM!!!",{x:1,y:8, color: color`2`})
    }
    if (dialogueKeyGuard==6){
      clearText()
      addText("... or something",{x:1,y:6, color: color`2`})
      addText("like that.",{x:1,y:8, color: color`2`})
    }
    if (dialogueKeyGuard==7){
      clearText()
      addText("Sorry I'm new to",{x:1,y:6, color: color`2`})
      addText("this whole thing.",{x:1,y:8, color: color`2`})
    }
    if (dialogueKeyGuard==8){
      clearText()
      level+=2
      setMap(levels[level])
    }
  }
}

function titleScreen(){
  if (level==0){
    addText("SUBCONSCIOUS", {x:2, y:7, color: color`2`})
    addText("REVOLUTION", {x:2, y:9, color: color`2`})
    if (titleSelection==1){
      clearTile(11,0)
      addSprite(11,0,controlGearSelect)
    }
    else{
      clearTile(11,0)
      addSprite(11,0,controlGearStable)
    }
    if (titleSelection==2){
      addText("Play", {x:13, y:12, color:color`5`})
    }
    else{
      addText("Play", {x:13, y:12, color:color`2`})
    }
    if (titleSelection==3){
      titleSelection=1
    }
  }
}

function controlsForGame(){
  if (level==7){
    addText("Controls", {x:6,y:1, color:color`2`})
    addText("W-UP", {x:1,y:3,color: color`2`})
    addText("S-DOWN", {x:1,y:4,color: color`2`})
    addText("A-LEFT", {x:1,y:5,color: color`2`})
    addText("D-RIGHT", {x:1,y:6,color: color`2`})
    addText("I-INTERACT", {x:1,y:7,color: color`2`})
    addText("K-EXIT", {x:1,y:8,color:color`2`})
  }
}

function toBeContinued(){
  if (level==8){
    addText("TO BE", {x:8, y:2, color: color`2`})
    addText("CONTINUED...",{x:5, y:4, color: color`2`})
  }
}


function getRandomUniqueNumbers(count) {
  let numbers = []
  while (numbers.length < count) {
    let randomNumber = Math.floor(Math.random() * (width()));
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}

function levelEight(){
  if (level==8){
    
  }
}