
/* 
@title: The_Legend_Of_Sprig
@author: Medieval Apple
@tags: []
@addedOn: 2023-10-15
*/

    /*
Welcome to The Legend Of Sprig!

Long ago there was a treasure hunter named Sprig 
who built an enormous labyrinth to store their fabled treasure.
Inside this labyrinth, they built a maze of 68 rooms and 
created tons of enemys to protect them.

You take on the role of Marin who is an
adventure in search of Sprig's fabled treasure
with your trusty sword and shield in hand will you
be able to find the treasure?

Controls:
  Movement: W,A,S,D
  Swing Sword: K

Info:
  Fight enemys
  Use keys to open doors
  Collect all the pumpkins
  Pick up hearts to raise your health
  Find the treasure to win
*/

//map
const wall = "w"
const stone = ","
const pillar = "^"
const water = "?"
const torch = "|"
const statue = "~"
const broken = "<"

const floor = "f"
const pfloor = "!"
const rfloor = "#"
const bfloor = "%"
const yfloor = "*"
const voidf = "v"
const rdoor = "d"
const bdoor = "m"
const ydoor = "g"
const odoor = "}"
const pdoor = "{"
const gdoor = "_"

//objects
const rkey = "h"
const bkey = "j"
const ykey = "k"
const pkey = "["
const okey = "]"
const heart = "l"
const treasure = "&"
const pumpkin = "$"
const time = "'"

//Player

//normal
const player = "p"
const splayer = "s"
//flipped
const fplayer = "o"
const fsplayer = "a"

//Enemy

//normal
const enemy = "e"
const senemy = "x"
//flipped
const fenemy = "r"
const fsenemy = "z"

//Ghost Enemy

//normal
const wenemy = "q"
const wsenemy = "b"
//flipped
const wfenemy = "t"
const wfsenemy = "y"

//Shadow Enemy

//normal
const benemy = "u"
const bsenemy = "i"
//flipped
const bfenemy = "n"
const bfsenemy = "c"

//Gold Enemy

//normal
const yenemy = "("
const ysenemy = ")"
//flipped
const yfenemy = "-"
const yfsenemy = "+"

//Game States
var gameStarted = false
var timerStarted = false
var inLevelChange = false
var startedBoss = false
var tutorial = 0
const heartRecovers = 25
var respawnX = 1
var respawnY = 9

//Player Stats
const attackL = 200
const cooldownL = 200

const playerTotalHealth = 100

var playerHealth = playerTotalHealth

var attacking = false
var cooldown = false

var attackDamage = 25

var pX = 0

var pY = 0

var totalTime = 0

var pumpkins = 0

var pFlipped = false

var redKey = false

var blueKey = false

var yellowKey = false

var purpleKey = false

var orangeKey = false

//List O Enemys
var enemysAI = []

setLegend(
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0LLLLLLLLLL0L0
0L0L11110000L0L0
0L0L10000000L0L0
0L0L00000000L0L0
0L0L00000000L0L0
0L0L00000000L0L0
0L0L00000000L0L0
0L0L00000001L0L0
0L0L00001111L0L0
0L0LLLLLLLLLL0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ stone, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LL0000000000LL0
0L0LLLLLLLLLL0L0
0L0LLLLLLLLLL0L0
0L0LL0000001L0L0
0L0LL0000001L0L0
0L0LL0000001L0L0
0L0LL0000001L0L0
0L0LL0000001L0L0
0L0LL0000001L0L0
0L0LL1111111L0L0
0L0LLLLLLLLLL0L0
0LL0000000000LL0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  /*[ pillar, bitmap`
...0000000000...
..00LLLLLLLL00..
..0L1L111L11L0..
..0L1L111L11L0..
..0LLLLLLLLLL0..
..0L11L111L1L0..
..0L11L111L1L0..
..0LLLLLLLLLL0..
..0L1L111L11L0..
..0L1L111L11L0..
..0LLLLLLLLLL0..
..0L11L111L1L0..
..0L11L111L1L0..
..0LLLLLLLLLL0..
..0L1L111L11L0..
..0L1L111L11L0..` ],*/
  [ pillar, bitmap`
...0000000000...
..00LLLLLLLL00..
..0LL0LL10LLL0..
..0L10L110L1L0..
..0L00000000L0..
..0LL10LL101L0..
..0LL10L1101L0..
..0L00000000L0..
..0LL0LL10LLL0..
..0L10L110L1L0..
..0L00000000L0..
..0LL10LL10LL0..
..0LL10L1101L0..
..0L00000000L0..
..0L10LL10L1L0..
..0L10L110L1L0..` ],
  [ water, bitmap`
5555555555555555
5555555555755555
5575555755555555
5555575555555755
5555555557555555
5555555555555755
5555755575555555
5755555555575555
5555555555555555
5555755755575575
5555555555555555
5555555555575555
5755557557555555
5555555555555755
5557555755755555
5555555555555555` ],
  [ torch, bitmap`
................
.......9999.....
......996669....
.....9966669....
.....966969.....
.....969969.....
..00CCCCCCCC00..
..0L0000000010..
..0L0L11111010..
..0L0LLLLLL010..
..0L0L11111010..
..0L0LLLLLL010..
..0L0L11111010..
..0L0LLLLLL010..
..0L0L11111010..
..000000000000..` ],
  [ statue, bitmap`
................
................
....000000......
...00LLLL000....
...0LL11LLL00...
..00L11111LL00..
..0LL100011LL0..
..0L11111111L0..
..0L10010001L0..
..0L11111111L0..
..0L10100011L0..
..0L11111111L0..
..0L10000011L0..
..0L11111111L0..
..0L10010001L0..
..0L11111111L0..` ],
  [ broken, bitmap`
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C
C9C9C9C9C9C9C9C9
9C9C9C9C9C9C9C9C` ],
  
  
  [ floor, bitmap`
9999999CC9999999
9999999CC9999999
9999999CC9999999
9999999CC9999999
999999CCCC999999
99999CCCCCC99999
9999CCCCCCCC9999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999CCCCCCCC9999
99999CCCCCC99999
999999CCCC999999
9999999CC9999999
9999999CC9999999
9999999CC9999999
9999999CC9999999` ],
  [ pfloor, bitmap`
0000000HH0000000
0000000HH0000000
0000000HH0000000
0000000HH0000000
000000HHHH000000
00000HHHHHH00000
0000HHHHHHHH0000
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
0000HHHHHHHH0000
00000HHHHHH00000
000000HHHH000000
0000000HH0000000
0000000HH0000000
0000000HH0000000
0000000HH0000000` ],
  [ rfloor, bitmap`
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000003333000000
0000033333300000
0000333333330000
3333333333333333
3333333333333333
0000333333330000
0000033333300000
0000003333000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000` ],
  [ bfloor, bitmap`
0000000550000000
0000000550000000
0000000550000000
0000000550000000
0000005555000000
0000055555500000
0000555555550000
5555555555555555
5555555555555555
0000555555550000
0000055555500000
0000005555000000
0000000550000000
0000000550000000
0000000550000000
0000000550000000` ],
  /* [ yfloor, bitmap`
0000000660000000
0000000660000000
0000000660000000
0000000660000000
0000006666000000
0000066666600000
0000666666660000
6666666666666666
6666666666666666
0000666666660000
0000066666600000
0000006666000000
0000000660000000
0000000660000000
0000000660000000
0000000660000000` ], */
  [ yfloor, bitmap`
6666666666666666
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6666666666666666` ],
  [ voidf, bitmap`
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
0000000000000000` ],
  [ rdoor, bitmap`
0000000000000000
0333333333333330
0300000000000030
0303333333333030
0303111100003030
0303100000003030
0303000000003030
0303000000003030
0303000000003030
0303000000003030
0303000000013030
0303000011113030
0303333333333030
0300000000000030
0333333333333330
0000000000000000` ],
  [ bdoor, bitmap`
0000000000000000
0555555555555550
0500000000000050
0505555555555050
0505111100005050
0505100000005050
0505000000005050
0505000000005050
0505000000005050
0505000000005050
0505000000015050
0505000011115050
0505555555555050
0500000000000050
0555555555555550
0000000000000000` ],
  [ ydoor, bitmap`
0000000000000000
0666666666666660
0600000000000060
0606666666666060
0606111100006060
0606100000006060
0606000000006060
0606000000006060
0606000000006060
0606000000006060
0606000000016060
0606000011116060
0606666666666060
0600000000000060
0666666666666660
0000000000000000` ],
  [ pdoor, bitmap`
0000000000000000
0HHHHHHHHHHHHHH0
0H000000000000H0
0H0HHHHHHHHHH0H0
0H0H11110000H0H0
0H0H10000000H0H0
0H0H00000000H0H0
0H0H00000000H0H0
0H0H00000000H0H0
0H0H00000000H0H0
0H0H00000001H0H0
0H0H00001111H0H0
0H0HHHHHHHHHH0H0
0H000000000000H0
0HHHHHHHHHHHHHH0
0000000000000000` ],
  [ odoor, bitmap`
0000000000000000
0999999999999990
0900000000000090
0909999999999090
0909111100009090
0909100000009090
0909000000009090
0909000000009090
0909000000009090
0909000000009090
0909000000019090
0909000011119090
0909999999999090
0900000000000090
0999999999999990
0000000000000000` ],
  [ gdoor, bitmap`
0000000000000000
0444444444444440
0400000000000040
0404444444444040
0404111100004040
0404100000004040
0404000000004040
0404000000004040
0404000000004040
0404000000004040
0404000000014040
0404000011114040
0404444444444040
0400000000000040
0444444444444440
0000000000000000` ],

  [ rkey, bitmap`
................
................
................
................
................
..000...........
.03330000000000.
0300333333333330
030033330003030.
.0333000...0.0..
..000...........
................
................
................
................
................` ],
  [ bkey, bitmap`
................
................
................
................
................
..000...........
.05550000000000.
0500555555555550
050055550005050.
.0555000...0.0..
..000...........
................
................
................
................
................` ],
  [ ykey, bitmap`
................
................
................
................
................
..000...........
.06660000000000.
0600666666666660
060066660006060.
.0666000...0.0..
..000...........
................
................
................
................
................` ],
  [ pkey, bitmap`
................
................
................
................
................
..000...........
.0HHH0000000000.
0H00HHHHHHHHHHH0
0H00HHHH000H0H0.
.0HHH000...0.0..
..000...........
................
................
................
................
................` ],
  [ okey, bitmap`
................
................
................
................
................
..000...........
.09990000000000.
0900999999999990
090099990009090.
.0999000...0.0..
..000...........
................
................
................
................
................` ],

  [ heart, bitmap`
................
................
...0000..0000...
..033300003330..
.03333300333330.
.03333333333330.
.03333333333330.
..033333333330..
...0333333330...
....03333330....
.....033330.....
......0330......
.......00.......
................
................
................` ],

  [ treasure, bitmap`
................
................
................
................
................
....LLL11111....
...L6L6666161...
..L66L66661661..
.L666L666616661.
.L666L666616661.
.LLLLLL00111111.
.L6666600666661.
.L6666666666661.
.LLLLLLLLL11111.
.L6666666666661.
.LLLLLLLLLLL111.` ],
  
  [ pumpkin, bitmap`
................
........00......
.......0CC0.....
......0CC0......
......0C0.......
.....00000......
..00009999000...
.0099999999990..
.09990999099900.
.09990999099990.
.09999999999990.
.09909990990990.
.00900000000990.
..0099999999900.
...00099999000..
.....0000000....` ],

  [ time, bitmap`
................
................
....00000000....
...0022222200...
..002202202200..
.00202202220200.
.02222202222220.
.02022202222020.
.02222202222220.
.02222200000220.
.02022222222020.
.02222222222220.
.00202222220200.
..002202202200..
...0022222200...
....00000000....` ],
  
  [ player, bitmap`
................
................
....66666.......
...6FFFF6.......
..6.FF0F........
..6.FFFF........
.....33..C......
....3333.C......
...333333C......
...3333..C......
...3CCC..C......
...3777.........
....7.7.........
...77.77........
..77...77.......
..7.....7.......` ],
  [ splayer, bitmap`
................
................
....66666.......
...6FFFF6.......
..6.FF0F........
..6.FFFF........
.....33.........
.C..3333...C....
.C.3333333CC222.
.C33333....C....
.C..CCC.........
.C..777.........
....7.7.........
...77.77........
..77...77.......
..7.....7.......` ],

  [ fplayer, bitmap`
................
................
.......66666....
.......6FFFF6...
........F0FF.6..
........FFFF.6..
......C..33.....
......C.3333....
......C333333...
......C..3333...
......C..CCC3...
.........7773...
.........7.7....
........77.77...
.......77...77..
.......7.....7..` ],
  [ fsplayer, bitmap`
................
................
.......66666....
.......6FFFF6...
........F0FF.6..
........FFFF.6..
.........33.....
....C...3333..C.
.222CC3333333.C.
....C....33333C.
.........CCC..C.
.........777..C.
.........7.7....
........77.77...
.......77...77..
.......7.....7..` ],

  //Enemy
  [ enemy, bitmap`
................
................
....11111.......
...1LLLL1.......
..1.LL0L........
..1.LLLL........
.....11..L......
....1111.L......
...111111L......
...1111..L......
...1LLL..L......
...1111.........
....1.1.........
...11.11........
..11...11.......
..1.....1.......` ],
  [ senemy, bitmap`
................
................
....11111.......
...1LLLL1.......
..1.LL0L........
..1.LLLL........
.....11.........
.L..1111...L....
.L.1111111LL111.
.L11111....L....
.L..LLL.........
.L..111.........
....1.1.........
...11.11........
..11...11.......
..1.....1.......` ],
  
  [ fenemy, bitmap`
................
................
.......11111....
.......1LLLL1...
........L0LL.1..
........LLLL.1..
......L..11.....
......L.1111....
......L111111...
......L..1111...
......L..LLL1...
.........1111...
.........1.1....
........11.11...
.......11...11..
.......1.....1..` ],
  [ fsenemy, bitmap`
................
................
.......11111....
.......1LLLL1...
........L0LL.1..
........LLLL.1..
.........11.....
....L...1111..L.
.111LL1111111.L.
....L....11111L.
.........LLL..L.
.........111..L.
.........1.1....
........11.11...
.......11...11..
.......1.....1..` ],

  //Ghost Enemy
  [ wenemy, bitmap`
................
................
....22222.......
...2LLLL2.......
..2.LL0L........
..2.LLLL........
.....22..L......
....2222.L......
...222222L......
...2222..L......
...2LLL..L......
...2222.........
....2.2.........
...22.22........
..22...22.......
..2.....2.......` ],
  [ wsenemy, bitmap`
................
................
....22222.......
...1LLLL2.......
..1.LL0L........
..1.LLLL........
.....22.........
.L..2222...L....
.L.2222222LL222.
.L22222....L....
.L..LLL.........
.L..222.........
....2.2.........
...22.22........
..22...22.......
..2.....2.......` ],
  
  [ wfenemy, bitmap`
................
................
.......22222....
.......2LLLL2...
........L0LL.2..
........LLLL.2..
......L..22.....
......L.2222....
......L222222...
......L..2222...
......L..LLL2...
.........2222...
.........2.2....
........22.22...
.......22...22..
.......2.....2..` ],
  [ wfsenemy, bitmap`
................
................
.......22222....
.......2LLLL2...
........L0LL.2..
........LLLL.2..
.........22.....
....L...2222..L.
.222LL2222222.L.
....L....22222L.
.........LLL..L.
.........222..L.
.........2.2....
........22.22...
.......22...22..
.......2.....2..` ],

  //Shadow Enemy
  [ benemy, bitmap`
................
................
....00000.......
...0LLLL0.......
..0.LL0L........
..0.LLLL........
.....00..L......
....0000.L......
...000000L......
...0000..L......
...0LLL..L......
...0000.........
....0.0.........
...00.00........
..00...00.......
..0.....0.......` ],
  [ bsenemy, bitmap`
................
................
....00000.......
...0LLLL0.......
..0.LL0L........
..0.LLLL........
.....00.........
.L..0000...L....
.L.0000000LL000.
.L00000....L....
.L..LLL.........
.L..000.........
....0.0.........
...00.00........
..00...00.......
..0.....0.......` ],
  
  [ bfenemy, bitmap`
................
................
.......00000....
.......0LLLL0...
........L0LL.0..
........LLLL.0..
......L..00.....
......L.0000....
......L000000...
......L..0000...
......L..LLL0...
.........0000...
.........0.0....
........00.00...
.......00...00..
.......0.....0..` ],
  [ bfsenemy, bitmap`
................
................
.......00000....
.......0LLLL0...
........L0LL.0..
........LLLL.0..
.........00.....
....L...0000..L.
.000LL0000000.L.
....L....00000L.
.........LLL..L.
.........000..L.
.........0.0....
........00.00...
.......00...00..
.......0.....0..` ],

  //Gold Enemy
  [ yenemy, bitmap`
................
................
....FFFFF.......
...FLLLLF.......
..F.LL0L........
..F.LLLL........
.....FF..L......
....FFFF.L......
...FFFFFFL......
...FFFF..L......
...FLLL..L......
...FFFF.........
....F.F.........
...FF.FF........
..FF...FF.......
..F.....F.......` ],
  [ ysenemy, bitmap`
................
................
....FFFFF.......
...FLLLLF.......
..F.LL0L........
..F.LLLL........
.....FF.........
.L..FFFF...L....
.L.FFFFFFFLLFFF.
.LFFFFF....L....
.L..LLL.........
.L..FFF.........
....F.F.........
...FF.FF........
..FF...FF.......
..F.....F.......` ],
  
  [ yfenemy, bitmap`
................
................
.......FFFFF....
.......FLLLLF...
........L0LL.F..
........LLLL.F..
......L..FF.....
......L.FFFF....
......LFFFFFF...
......L..FFFF...
......L..LLLF...
.........FFFF...
.........F.F....
........FF.FF...
.......FF...FF..
.......F.....F..` ],
  [ yfsenemy, bitmap`
................
................
.......FFFFF....
.......FLLLLF...
........L0LL.F..
........LLLL.F..
.........FF.....
....L...FFFF..L.
.FFFLLFFFFFFF.L.
....L....FFFFFL.
.........LLL..L.
.........FFF..L.
.........F.F....
........FF.FF...
.......FF...FF..
.......F.....F..` ],
)

//Music
const melody = tune`
16000`
// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

setSolids([player,splayer,fplayer,fsplayer,enemy,senemy,fenemy,fsenemy,wall])

const testLevels = [
  //OG Level
  map`
vvvvvvvvvv
wwwwwwwwww
w.......ew
w.e......w
w..w..w..w
w....p...d
w........d
w..w.ew..w
w.e....e.w
w........w
wwwwwwwwww`,
  //Blank Menu Level
  map`
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv`,
  //Test Level
  map`
vvvvvvvvvv
www.gg.www
w.......hw
w........w
...we.w...
d..w..w..m
dp.w.ew..m
...wwww...
w........w
wk......jw
ww..ww..ww`
]

let betaLevels = [
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w........w
w..wwww..w
w.....w..w
w.....w..w
w...www..w
w...w....w
w........w
w...w....w
w........w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: voidf},
  {level:map`
vvvvvvvvvv
wwww..wwww
wl......ew
w.e......w
w..w..w..w
m....p.&.d
m.$......d
w..w.ew..w
w.e....e.w
w........w
wwwwggwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},
  {level:map`
vvvvvvvvvv
wwwwwwwwww
wk......ew
w.e......w
w..w..w..w
p........w
.........w
w..w.ew..w
w.e....e.w
w........w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor},
  {level:map`
vvvvvvvvvv
wwww.pwwww
w.......ew
w.e......w
w..w..w..w
w........w
w........w
w..w.ew..w
w.ej...e.w
w........w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor},
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w...e...ew
w.e..e...w
w..w..w..w
we.e....ep
w.e.......
w..w.ew..w
w.e....eew
w....e...w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor},
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w..h....ew
w.e......w
w..w..w..w
w........w
w........w
w..w.ew..w
w.e....e.w
w........w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: pfloor}
]

const BetaWorld = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

/*const gameoverLevel = map`
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv`*/
const gameoverLevel = map`
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv`

/*const menuLevel = map`
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv
vvvvvvvvvv`*/
const menuLevel = map`
vvvvvvvvvvvv
vvllllllllvv
vvvvvvvvvvvv
vvv$vvvvvvvv
vvvvvvvvvvvv
vvvvvvvvvvvv
vvvvvvvvvvvv
vvvvvvvvvvvv
vvvvpvyvkv&v
wwwwwwwwwwww`

const scoreLevel = map`
vvvvvvvvvvvv
vvvvvvvvvvvv
vvvv&&&&vvvv
vvvvvvvvvvvv
v'vvvvv$vvvv
vvvvvvvvvvvv
vvvvvvvvvvvv
vvvvvvvvvvvv
vvvvvpvvvvvv
vwwwwvvwwwwv`

const infoLevel = map`
............
............
........r...
......kg....
............
..........$.
.........l..
............
............`

const infoWinLevel = map`
............
............
............
.......p&&..
............
............
............
............
............`

const controlsLevel = map`
............
............
............
...p........
........o...
............
...s........
............
............
............`

let worldX = 1
let worldY = 9

function LevelData() {
  this.rDoorOpen = false
  this.bDoorOpen = false
  this.yDoorOpen = false
  this.pDoorOpen = false
  this.oDoorOpen = false
  this.rKeyGrab = false
  this.bKeyGrab = false
  this.yKeyGrab = false
  this.pKeyGrab = false
  this.oKeyGrab = false
  this.sX = 0
  this.sY= 0
}

let currentLevel = 0;
let lastLevel = 0;

let levels = [
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w........w
w..wwww..w
w.....w..w
w.....w..w
w...www..w
w...w....w
w........w
w...w....w
wp.......w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //0 Error Level
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w???,|,|,w
w??<,.,.,w
w?<...,.,w
w,,.q.....
w|........
w,,,...q.w
w|......,w
w,,,...,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //1
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,??????,w
w????????w
w|,|,,|,|w
p.q...q...
....q.....
w|,|,,|,|w
w????????w
w,??????,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //2
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,??????,w
w????????w
w|,|,,|,|w
..q...q...
p...u.....
w|,|,,|,|w
w????????w
w,??????,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //3
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,,,,,,,w
w,.|..|.,w
w~......|w
p..u..(..}
....u..(.}
w~......|w
w,.|..|.,w
w,,,,,,,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //4
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,&&&&&&,w
w,.&&&&.,w
w,..&&..,w
w,~....~,w
w^..ll..^w
w.$....$.w
w?......?w
w??|..|??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //5 Treasure Room
  {level:map`
vvvvvvvvvv
wwwwwwwwww
wl......ew
w.e......w
w..w..w..w
m....p.&.d
m.$......d
w..w.ew..w
w.e....e.w
w........w
wwww__wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //6
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,|..|,,w
w,......,w
wl.q..q.kw
w,,,ee,,,w
w?e....e?w
w?......?w
w,......,w
w,,|..|,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //7
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,?..l,,w
w,?.....^w
w?......|w
w~......({
w~......({
w?......|w
w,?.....^w
w,,?..l,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //8
  {level:map`
vvvvvvvvvv
wwwwggwwww
w??|l.|??w
w?(.e..(?w
w|q^..^q|w
...u..u..p
...u..u...
w|q^..^q|w
w?(..e.(?w
w??|.l|??w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: pfloor}, //9 Boss Fight
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,l..?,,w
w^.....?,w
w|......?w
{(......~w
{(......~w
w|......?w
w^.....?,w
w,,l..?,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //10
  {level:map`
vvvvvvvvvv
wwww__wwww
w,,|..|,,w
w,......,w
w,.|..|.,w
w~........
w~........
w,.|..|.,w
w,......,w
w,,|..|,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //11
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,,..,,,w
w,......,w
w|.^..^.|w
p...ee....
....ee....
w|.^..^.|w
w,......,w
w,,,..,,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //12
  {level:map`
vvvvvvvvvv
wwww..wwww
wl.,..,.lw
w.e....e.w
w,......,w
........~w
p.......~w
w,......,w
w.e....e.w
w|.,??,.|w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //13
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w...e...ew
w.e..e...w
w..w..w..w
we.e....ep
w.e.......
w..w.ew..w
w.e....eew
w....e...w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //14
  {level:map`
vvvvvvvvvv
wwwwwwwwww
wj.,...,.w
w..,.,.,.w
wu,|.,.,.w
w....,.,..
w,,,,^q,.p
w......,.w
w.,,,,,|.w
w...e....w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //15
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w$....,||w
w.,,,.,,,w
wq,^.....w
..,.e..,.w
..,~..^,.w
w,,,,,,,.w
w...q....w
w^......^w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor},  //16
  {level:map`
vvvvvvvvvv
wwwwwwwwww
wk......ew
w.e......w
w..w..w..w
p........w
.........w
w..w.ew..w
w.e....e.w
w........w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //17
  {level:map`
vvvvvvvvvv
wwww.pwwww
w,,|..|,,w
w^......^w
w,......,w
w~........
w~........
w,......,w
w^......^w
w,,.]$.,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //18
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,????,,w
w,^.~~.^,w
w|......|w
.........p
..........
w|......|w
w,^.~~.^,w
w,,????,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //19
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,|..|,,w
w^......^w
w,......,w
........~w
........~w
w,......,w
w^......^w
w,,....,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor}, //20
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,|..|.,w
w,......,w
w,.|..|.,w
w~......~w
w~......~w
w,.|..|.,w
w,......,w
w,,|..|,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //21
  {level:map`
vvvvvvvvvv
wwww..wwww
wm,|..|,mw
wm,.....,w
w,~.q...^w
wm,.......
wm,.......
w,~..q..^w
wm,....,,w
wm,|..|,mw
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //22
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w|,|,,|,|w
w,,,,,,,,w
w.,....,.w
p.,.,,.,..
....,,....
w.,~,,~,.w
w,,,,,,,,w
w|,|,,|,|w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //23
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w|,|,,|,|w
w,,,,,,,,w
w.,....,.w
p.,.,,.,..
....,,....
w.,~,,~,.w
w,,,,,,,,w
w|,|,,|,|w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //24
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w.,^..^,.w
w$,....,$w
w,,....,,w
...u..u.~w
p..u..u.~w
w,,....,,w
w$,....,$w
w.,|.....w
wwwwggwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //25
  {level:map`
vvvvvvvvvv
wwwwp.wwww
w,,|..|,,w
w,l....l,w
w^......^w
w?......?w
w?......?w
w^......^w
w,......,w
w,,|..|,,w
wwwwddwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: rfloor},  //26
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,...,??w
w,.e...,?w
w|......,w
w<........
w<.e.....p
w|....e..w
w,<.....,w
w,,|<<|,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //27
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w|,??????w
w..,,????w
w...~,???w
p.e..,???w
......<??w
w......<?w
w...e...,w
w|......|w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //28
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,......,w
w,^.~~.^,w
w,......,w
w........p
w.........
w,......,w
w,......,w
w,,|..|,,w
wwwwggwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //29
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w$.q.....w
w,,,,,,,.w
w.|..|.,.w
p..q..e...
...e..q...
w^......^w
w,^....^,w
w,,^~~^,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //30
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w.,.~~.,.w
w,|,..,|,w
w^..,,..^w
p.........
..........
w^..,,..^w
w,|,..,|,w
w.,.~~.,.w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor},  //31
  {level:map`
vvvvvvvvvv
wwww..wwww
wmm,e.,mmw
wm,^..^,mw
w,^....^,w
p......|,w
.......|,w
w,^....^,w
wg,^..^,gw
wgg,.q,ggw
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //32
  {level:map`
vvvvvvvvvv
wwwwggwwww
w?,|..|,?w
w?,.uu.,?w
w,^....^,w
w~.q......
w~....q...
w,^....^,w
w?,....,?w
w??,..,??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //33
  {level:map`
vvvvvvvvvv
wwwwddwwww
w?,|..|,?w
w?,.qq.,?w
w,^....^,w
p..u....~w
...u....~w
w,^....^,w
w?,....,?w
w??,..,??w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //34
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w|......|w
w..,..,..w
w.,,..,,.w
w.,,..,,.w
w.,,~$,,.w
w.,,,,,,.w
w..,,,,..w
w|......|w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //35
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,|..|,,w
w,e....e,w
w.^~..~^.w
w.........
w.........
w.^~..~^.w
w,e....e,w
w,,|..|,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //36
  {level:map`
vvvvvvvvvv
wwwwggwwww
w,|....|,w
w,...e..,w
w^.e....^w
p.....e..w
..e......w
w^..e.e.^w
w,|....|,w
w,,.~~.,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //37
  {level:map`
vvvvvvvvvv
wwww.pwwww
wgg,..,ggw
wg,|..|,gw
w,|....|,w
w|........
w,|.......
wg,|...|,w
wgg,|.|,gw
wggg,|,ggw
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //38
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w..e.....w
w.,,,,,,.w
w.,||,...w
p.,||,.,,w
.,,,,,e.~w
w......,,w
w.,,,,...w
w..q..,,$w
wwwwmmwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: yfloor}, //39
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w??,..|,?w
w??,...|,w
w??,^....p
w???,^....
w????,,,,w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //40
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w????????w
w????????w
w,,,,????w
....^,???w
.....^,??w
w,|...,??w
w?,|..,??w
w??,..,??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor},  //41
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,....|w
w??,.....w
w??,.....w
w??,.....p
w??<......
w??<<,,,,w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //42
  {level:map`
vvvvvvvvvv
wwww.pwwww
w??|..|??w
w?,....,?w
w,.e....,w
........~w
........~w
w,....e.,w
w?,....,?w
w??|..|??w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //43
  {level:map`
vvvvvvvvvv
wwwwmmwwww
w?,|..|,?w
w?,....,?w
w,^....^,w
w~.......p
w~...q....
w,^....^,w
w?,....,?w
w??,..,??w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //44
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w????????w
w????????w
w,,,,????w
....^,???w
..q.$^,??w
w,|...,??w
w?,|u.,??w
w??,..,??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //45
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w????????w
w?,,~~,,?w
w,|....|,w
w$u......p
w.u.......
w,|....|,w
w?,,~~,,?w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor},  //46
  {level:map`
vvvvvvvvvv
wwww..wwww
w?,....,?w
w?,.uu.,?w
w,^....^,w
p.......~w
........~w
w,^.qq.^,w
w?,....,?w
w??,..,??w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //47
  {level:map`
vvvvvvvvvv
wwww.pwwww
w,....???w
w..e..,,?w
w|.....,?w
wl....e...
wl.e......
w|.....,?w
w...e.,,?w
w,....???w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //48
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w????????w
w????????w
w|......|w
.........p
..........
w|......|w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //49
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w.......ew
w..,,,,,.w
w..|..|,.w
.......,..
...e...,..
w.....|,,w
w...e..??w
w~.....??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //50
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,.~~.,,w
w,......,w
w.......|w
p.......$w
........|w
w????????w
w,??????,w
w,,????,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //51
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w?,|..|,?w
w?,.q..,?w
w?~....~?w
w?~....~?w
w?,..u.,?w
w?,|..|,?w
w??,..,??w
wwww.pwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //52
  {level:map`
vvvvvvvvvv
wwww.pwwww
w?,....,?w
w?,....,?w
w,^....^,w
w~..q.....
w~...u....
w,^....^,w
w?,....,?w
w??,..,??w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //53
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w????????w
w????????w
w,,,,????w
p...^,???w
...q.^,??w
w,|...,??w
w?,|q.,??w
w??,..,??w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //54
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w?,|..|,?w
w?,....,?w
w?~....~?w
w?~....~?w
w?,....,?w
w?,|..|,?w
w??,..,??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //55
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,...???w
w,.e...??w
w.......?w
w|.......w
w|.......w
w.....e..w
w,......,w
w,,....,,w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //56
  {level:map`
vvvvvvvvvv
wwww..wwww
w?|....|?w
w?......?w
w?.e....?w
w?......?w
w?|....|?w
w??....??w
w??....??w
w??~..~??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //57
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w?,|..|,?w
w?,....,?w
w?~.u..~?w
w?~.h..~?w
w?,..u.,?w
w?,|..|,?w
w??,..,??w
wwww.pwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //58
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w?,|..|,?w
w?,....,?w
w?~....~?w
w?~....~?w
w?,....,?w
w?,|..|,?w
w??,..,??w
wwww.pwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //59
  {level:map`
vvvvvvvvvv
wwww..wwww
w?,....,?w
w?,....,?w
w,^....^,w
w~........
w~........
w,^....^,w
w?,....,?w
w??,..,??w
wwwwp.wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //60
  {level:map`
vvvvvvvvvv
wwww..wwww
w?,....,?w
w?,....,?w
w,^....^,w
p.....u.~w
...u....~w
w,^....^,w
w?,....,?w
w??,..,??w
wwww..wwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor},  //61
  {level:map`
vvvvvvvvvv
wwww..wwww
w,,....,,w
w,|....|,w
w?......?w
w?......?w
w?......?w
w?..p...?w
w,|....|,w
w,,????,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //62 Start Level
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w.......$w
w.,,,,,,,w
w.,......w
w.,.,,,,.p
w.,.....,.
w.,,,,,..w
w........w
w|??????|w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //63
  {level:map`
vvvvvvvvvv
www,..wwww
w,,<..<,,w
w,<....<,w
w<......<w
.........p
..........
w|.e..e.|w
w,??????,w
w,,????,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //64
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w,,|..|,,w
w,......,w
w........w
p.........
..........
w........w
w,......,w
w,,|..|,,w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //65
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w????????w
w????????w
w|.......w
p........_
........._
w|.......w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor},  //66
  {level:map`
vvvvvvvvvv
wwwwp.wwww
w??,..,??w
w,,^..^,?w
w|......,w
_...q.....
_...$u....
w|......,w
w,,^..^,?w
w??,~~,??w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //67
  {level:map`
vvvvvvvvvv
wwww.pwwww
w??,..,??w
w?,|..,??w
w,|...,??w
.....^,??w
....^,???w
w,,,,????w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //68
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w??,..|,?w
w??,...|,w
w??,^....p
w???,^....
w????,,,,w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //69
  {level:map`
vvvvvvvvvv
wwww..wwww
w??,..,??w
w?,|..,??w
w,|$u.,??w
p..qk^,??w
....^,???w
w,,,,????w
w????????w
w????????w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: bfloor}, //70
  {level:map`
vvvvvvvvvv
wwwwwwwwww
w{{,~~,{{w
w{,^..^,{w
w,|....|,w
}..p.[..?w
}.......?w
w,|....|,w
w{,^..^,{w
w{{,~~,{{w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: pfloor}, //71
  {level:map`
vvvvvvvvvv
wwww..wwww
w...u...ew
w.e......w
w.dmg{}_.w
w.hjk[]..w
w.l$&.p..w
w....e...w
w.e.(..e.w
w.....q..w
wwwwwwwwww`, data: new LevelData, pGrab: false, ais: [], aiLoaded: false, floor: floor}, //72 Test Level

  
]

const world = [
  [0, 0, 1, 2, 3, 4, 71, 0, 5, 0],
  [6, 0, 7, 0, 0, 0, 0, 8, 9, 10],
  [11, 12, 13, 0, 15, 16, 0, 18, 19, 20],
  [21, 0, 0, 0, 0, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 0, 0, 33, 34],
  [35, 36, 37, 0, 0, 38, 39, 0, 40, 41],
  [42, 43, 0, 0, 0, 0, 44, 45, 46, 47],
  [0, 48, 49, 50, 51, 0, 52, 53, 54, 55],
  [0, 56, 0, 57, 0, 0, 58, 59, 60, 61],
  [0, 62, 63, 64, 65, 66, 67, 68, 69, 70]
]

//setBackground(floor)
//setMap(levels[level])

setPushables({
  [ player ]: []
})

//Player Controller
//Movement/Input
onInput("w", () => {
  if(gameStarted){
    if(pY - 2 < 0){
      worldY--
      levels[world[worldY][worldX]].data.sX = pX
      levels[world[worldY][worldX]].data.sY = height() - 1
      LevelSwap(world[worldY][worldX],worldY,worldX)
    }
    else{
      if(getTile(pX,pY - 1).length == 0 && !inLevelChange){
        if(!attacking)
          if(pFlipped)
            getTile(pX,pY)[0].y -= 1
          else
            getTile(pX,pY)[0].y -= 1
        else{
          if(pFlipped)
            getTile(pX,pY)[0].y -= 1
          else
            getTile(pX,pY)[0].y -= 1
        }
        pY -= 1
      } 
      else {
        CheckForItem(pX, pY - 1)
      }
    }
  }
})

onInput("a", () => {
  if(gameStarted){
    if(pX - 1 < 0){
      worldX--
      levels[world[worldY][worldX]].data.sX = width() - 1
      levels[world[worldY][worldX]].data.sY = pY
      LevelSwap(world[worldY][worldX],worldY,worldX)
    }
    else{
      if(!inLevelChange){
        if(!attacking)
          if(!pFlipped && !attacking){
            clearTile(pX,pY)
            addSprite(pX,pY,fplayer)
            pFlipped = true
            if (getTile(pX - 1,pY).length == 0){
              getTile(pX,pY)[0].x -= 1
              pX -= 1
            }else{
              CheckForItem(pX - 1, pY)
            }
          }
          else if (getTile(pX - 1,pY).length == 0){
            getTile(pX,pY)[0].x -= 1
            pX -= 1
          }else{
              CheckForItem(pX - 1, pY)
          }
        else if(getTile(pX - 1,pY).length == 0){
          if(pFlipped)
            getTile(pX,pY)[0].x -= 1
          else
            getTile(pX,pY)[0].x -= 1
          pX -= 1
        }else{
              CheckForItem(pX - 1, pY)
          }
        if(currentLevel == 9){
          addSprite(9, 5, pdoor)
          addSprite(9, 6, pdoor)
          addSprite(0, 5, pdoor)
          addSprite(0, 6, pdoor)
        }
      }
    }
  }
})

onInput("s", () => {
  if(gameStarted){
    if(pY + 2 > height()){
      worldY++
      levels[world[worldY][worldX]].data.sX = pX
      levels[world[worldY][worldX]].data.sY = 1
      LevelSwap(world[worldY][worldX],worldY,worldX)
    }
    else{
      if(getTile(pX,pY + 1).length == 0 && !inLevelChange){
        if(!attacking)
          if(pFlipped)
            getTile(pX,pY)[0].y += 1
          else
            getTile(pX,pY)[0].y += 1
        else{
          if(pFlipped)
            getTile(pX,pY)[0].y += 1
          else
            getTile(pX,pY)[0].y += 1
        }
        pY += 1
      }
      else {
        CheckForItem(pX, pY + 1)
      }
    }
  }
})

onInput("d", () => {
  if(gameStarted){
    if(pX + 2 > width()){
      worldX++
      levels[world[worldY][worldX]].data.sX = 0
      levels[world[worldY][worldX]].data.sY = pY
      LevelSwap(world[worldY][worldX],worldY,worldX)
    }
    else{
      if(!inLevelChange){
        if(!attacking)
          if(pFlipped && !attacking){
            clearTile(pX,pY)
            addSprite(pX,pY,player)
            pFlipped = false
            if (getTile(pX + 1,pY).length == 0){
              getTile(pX,pY)[0].x += 1
              pX += 1
            }else{
              CheckForItem(pX + 1, pY)
            }
          }
          else if (getTile(pX + 1,pY).length == 0){
            getTile(pX,pY)[0].x += 1
            pX += 1
          }else{
              CheckForItem(pX + 1, pY)
          }
        else if (getTile(pX + 1,pY).length == 0){
          if(pFlipped)
            getTile(pX,pY)[0].x += 1
          else
            getTile(pX,pY)[0].x += 1
          pX += 1
        }else{
              CheckForItem(pX + 1, pY)
          }
        if(currentLevel == 9){
          addSprite(9, 5, pdoor)
          addSprite(9, 6, pdoor)
          addSprite(0, 5, pdoor)
          addSprite(0, 6, pdoor)
        }
      }
    }
  }
})

//attack
onInput("k", () => {
  if(gameStarted && !inLevelChange){
    if(!cooldown && !attacking){
      if(!pFlipped){
        attacking = true;
        var x = getFirst(player).x
        var y = getFirst(player).y
        clearTile(x,y)
        addSprite(x,y,splayer)
        const attackTimer = setTimeout(StopAttack, attackL);
        for (var i = 0; i < enemysAI.length; i++) {
          if(enemysAI[i].x == x + 1 && enemysAI[i].y == y){
            enemysAI[i].Health -= attackDamage
            if(enemysAI[i].Health <= 0){
              enemysAI[i].Dead = true
              clearTile(enemysAI[i].x,enemysAI[i].y)
              //Add Drop Chance
              if(currentLevel == 9 && enemysAI.length == 1){
                addSprite(enemysAI[i].x, enemysAI[i].y, ykey)
              }else{
                if(Math.floor(Math.random() * 4) == 1){
                addSprite(enemysAI[i].x, enemysAI[i].y, heart)
                }
              }
              enemysAI.splice(i,1)
            }
          }
        }
      }
      else{
        attacking = true;
        var x = getFirst(fplayer).x
        var y = getFirst(fplayer).y
        clearTile(x,y)
        addSprite(x,y,fsplayer)
        const attackTimer = setTimeout(StopAttack, attackL);
        for (var i = 0; i < enemysAI.length; i++) {
          if(enemysAI[i].x == x - 1 && enemysAI[i].y == y){
            enemysAI[i].Health -= attackDamage
            if(enemysAI[i].Health <= 0){
              enemysAI[i].Dead = true
              clearTile(enemysAI[i].x,enemysAI[i].y)
              //Add Drop Chance
              if(currentLevel == 9 && enemysAI.length == 1){
                addSprite(enemysAI[i].x, enemysAI[i].y, ykey)
              }else{
                if(Math.floor(Math.random() * 2) == 1){
                addSprite(enemysAI[i].x, enemysAI[i].y, heart)
                }
              }
              enemysAI.splice(i,1)
            }
          }
        }
      }
    }
  }
  else{
    if(tutorial == 0){
      LoadControlsMenu()
      tutorial++
    }else if(tutorial == 1){
      LoadInfoMenu()
      tutorial++
    }else if(tutorial == 2){
      LoadInfoWinMenu()
      tutorial++
    }else{
      StartGame()
    }
  }
})

afterInput(() => {
  
})

function StopAttack(){
  if(gameStarted && !inLevelChange){
    if(pFlipped){
      var x = getFirst(fsplayer).x
      var y = getFirst(fsplayer).y
      clearTile(x,y)
      addSprite(x,y,fplayer)
      attacking = false
      cooldown = true
      const attackCooldown = setTimeout(StopCooldown, cooldownL);
    }else{
      var x = getFirst(splayer).x
      var y = getFirst(splayer).y
      clearTile(x,y)
      addSprite(x,y,player)
      attacking = false
      cooldown = true
      const attackCooldown = setTimeout(StopCooldown, cooldownL);
    }
  }
}

function StopCooldown(){
  cooldown = false
}

function UnlockOtherSide(x, y, c){
  
  var nextMapX = worldX
  var nextMapY = worldY

  //console.log(x + " - " + y + " height: " + height())
  
  if(y == 1){ //Top
    nextMapY--
    // console.log("Deleteing Rooms Up Top")
  }else if (x == width() - 1){ //Right
    nextMapX++
    // console.log("Deleteing Rooms Too Right")
  }else if (y == height() - 1){ //Bottom
     nextMapY++
    // console.log("Deleteing Rooms Down Below")
  }else if (x == 0){ //Left
     nextMapX--
    // console.log("Deleteing Rooms Too Left")
  }

  //console.log("worldMap: " + worldX + " , " + worldY)
  //console.log("nextMap: " + nextMapX + " , " + nextMapY)

  if(c == "r"){
    levels[world[nextMapY][nextMapX]].data.rDoorOpen = true
  }else if(c == "b"){
    levels[world[nextMapY][nextMapX]].data.bDoorOpen = true
  }else if(c == "y"){
    levels[world[nextMapY][nextMapX]].data.yDoorOpen = true
  }else if(c == "p"){
    //Hard coded unlock for final doors
    if(world[nextMapY][nextMapX] == 9){
      levels[8].data.pDoorOpen = true
      levels[9].data.pDoorOpen = true
      levels[10].data.pDoorOpen = true
    }else{
     levels[world[nextMapY][nextMapX]].data.pDoorOpen = true 
    }
  }else if(c == "o"){
    levels[world[nextMapY][nextMapX]].data.oDoorOpen = true
  }
  
}

function CheckForItem(x, y){
  // console.log("CHECKING FOR ITEM")
  //console.log(getTile(x, y)[0])

  //'h' = Red Key 'j' = Blue Key 'k' = yellow key
  //'d' = Red Door 'm' = Blue Door 'g' = yellow Door
  //'l' = Heart

  //heart
  if(getTile(x, y)[0]._type == 'l'){
    // console.log("GOT HEART!")
    clearTile(x,y)
    if(playerHealth + heartRecovers > 100){
      playerHealth = 100
    }else{
      playerHealth += heartRecovers
    }
  }

  //pumpkin
  else if(getTile(x, y)[0]._type == '$'){
    // console.log("GOT pumpkin!")
    clearTile(x,y)
    pumpkins++
    //console.log("Current pumpkins: " + pumpkins)
    levels[currentLevel].pGrab = true
  }

  //Keys

  else if(getTile(x, y)[0]._type == 'h'){
    // console.log("RED KEY!")
    redKey = true
    clearTile(x,y)
    levels[currentLevel].data.rKeyGrab = true
  }else if(getTile(x, y)[0]._type == 'j'){
    // console.log("Blue KEY!")
    blueKey = true
    clearTile(x,y)
    levels[currentLevel].data.bKeyGrab = true
  }else if(getTile(x, y)[0]._type == 'k'){
    // console.log("Yellow KEY!")
    yellowKey = true
    clearTile(x,y)
    levels[currentLevel].data.yKeyGrab = true
  }else if(getTile(x, y)[0]._type == '['){
    // console.log("Purple KEY!")
    purpleKey = true
    clearTile(x,y)
    levels[currentLevel].data.pKeyGrab = true
  }else if(getTile(x, y)[0]._type == ']'){
    // console.log("Orange KEY!")
    orangeKey = true
    clearTile(x,y)
    levels[currentLevel].data.oKeyGrab = true
  }

  //Doors
  
  else if(getTile(x, y)[0]._type == 'd'){
    // console.log("RED Door!")
    if(redKey){
      var rDoors = tilesWith(rdoor)
      for (var i = 0; i < rDoors.length; i++) {
        var dx = rDoors[i][0]._x
        var dy = rDoors[i][0]._y
        clearTile(dx,dy)
      }
      levels[currentLevel].data.rDoorOpen = true
      UnlockOtherSide(rDoors[0][0]._x, rDoors[0][0]._y, "r")
      redKey = false
    }
  }else if(getTile(x, y)[0]._type == 'm'){
    // console.log("Blue Door!")
    if(blueKey){
      var bDoors = tilesWith(bdoor)
      for (var i = 0; i < bDoors.length; i++) {
        var dx = bDoors[i][0]._x
        var dy = bDoors[i][0]._y
        clearTile(dx,dy)
      }
      levels[currentLevel].data.bDoorOpen = true
      UnlockOtherSide(bDoors[0][0]._x, bDoors[0][0]._y, "b")
      blueKey = false
    }
  }else if(getTile(x, y)[0]._type == 'g'){
    // console.log("Yellow Door!")
    if(yellowKey){
      var yDoors = tilesWith(ydoor)
      for (var i = 0; i < yDoors.length; i++) {
        var dx = yDoors[i][0]._x
        var dy = yDoors[i][0]._y
        clearTile(dx,dy)
      }
      levels[currentLevel].data.yDoorOpen = true
      UnlockOtherSide(yDoors[0][0]._x, yDoors[0][0]._y, "y")
      yellowKey = false
    }
  }else if(getTile(x, y)[0]._type == '{'){
    // console.log("Purple Door!")
    if(purpleKey){
      var pDoors = tilesWith(pdoor)
      for (var i = 0; i < pDoors.length; i++) {
        var dx = pDoors[i][0]._x
        var dy = pDoors[i][0]._y
        clearTile(dx,dy)
      }
      levels[currentLevel].data.pDoorOpen = true
      UnlockOtherSide(pDoors[0][0]._x, pDoors[0][0]._y, "p")
      purpleKey = false
    }
  }else if(getTile(x, y)[0]._type == '}'){
    // console.log("Orange Door!")
    if(orangeKey){
      var oDoors = tilesWith(odoor)
      for (var i = 0; i < oDoors.length; i++) {
        var dx = oDoors[i][0]._x
        var dy = oDoors[i][0]._y
        clearTile(dx,dy)
      }
      levels[currentLevel].data.oDoorOpen = true
      UnlockOtherSide(oDoors[0][0]._x, oDoors[0][0]._y, "o")
      orangeKey = false
    }
  }
}

//Ai Controller

function AI(eX,eY,eSprite,feSprite,seSprite,fseSprite,health,aDamage,aChance,fChance) {
  //Textures

  //normal
  this.e = eSprite
  this.fe = feSprite
  //Filpped
  this.se = seSprite
  this.fse = fseSprite
  
  //Stats
  this.Health = health //100
  this.lastHealth = this.Health
  this.attackDamage = aDamage //25
  this.attackChance = aChance //3
  this.fleeChance = fChance//5
  this.inCombat = false
  this.Dead = false
  this.attacking = false
  this.cooldown = false
  this.Flipped = false
  this.x = eX
  this.y = eY
}
AI.prototype.MoveUp = function() {
  if(getTile(this.x,this.y - 1).length == 0 && this.y - 2 != 0){
    if(!this.attacking){
      if(this.Flipped)
        getTile(this.x,this.y)[0].y -= 1
      else
        getTile(this.x,this.y)[0].y -= 1
      this.y -= 1
    }
  }
}
AI.prototype.MoveDown = function() {
  if(getTile(this.x,this.y + 1).length == 0 && this.y + 2 != height()){
    if(!this.attacking){
      if(this.Flipped)
        getTile(this.x,this.y)[0].y += 1
      else
        getTile(this.x,this.y)[0].y += 1
      this.y += 1
    }
  }
}
AI.prototype.MoveLeft = function() {
  if(getTile(this.x - 1,this.y).length == 0 && this.x - 1 != 0){
    if(!this.attacking){
      if(this.Flipped)
        getTile(this.x,this.y)[0].x -= 1
      else if(!this.attacking){
        clearTile(this.x,this.y)
        addSprite(this.x,this.y,this.fe)
        getTile(this.x,this.y)[0].x -= 1
        this.Flipped = true
      }
      this.x -= 1
    }
  }
}
AI.prototype.MoveRight = function() {
  if(getTile(this.x + 1,this.y).length == 0 && this.x + 2 != width()){
    if(!this.attacking){
      if(this.Flipped && !this.attacking){
        clearTile(this.x,this.y)
        addSprite(this.x,this.y,this.e)
        getTile(this.x,this.y)[0].x += 1
        this.Flipped = false
      }
      else{
        getTile(this.x,this.y)[0].x += 1
      }
      this.x += 1
    }
  }
}
AI.prototype.StopAttack = function(){
  //console.log("Stopping Attack")
  clearTile(this.x,this.y)
  if(this.Flipped)
    addSprite(this.x,this.y,this.fe)
  else
    addSprite(this.x,this.y,this.e)
  this.attacking = false
}
AI.prototype.Attack = function() {
  //console.log("Running Attack")
  this.attacking = true

  //if(this.x - 1 == pX && this.y == pY)
  //  console.log("player Behind Me")
  //if(this.x + 1 == pX && this.y == pY)
  //  console.log("player Infront Of Me")

  var pHittable = false;

  // * P-->
  if(this.x - 1 == pX && this.y == pY && !this.Flipped){
    //console.log("player Behind Me")
    this.Flipped = true
    pHittable = true
  }

  // <--P *
  if(this.x + 1 == pX && this.y == pY && this.Flipped){
    //console.log("player Infront Of Me")
    this.Flipped = false
    pHittable = true
  }

  // * <--P
  if(this.x - 1 == pX && this.y == pY && this.Flipped){
    //console.log("player Behind Me")
    this.Flipped = true
    pHittable = true
  }

  // p--> *
  if(this.x + 1 == pX && this.y == pY && !this.Flipped){
    //console.log("player Infront Of Me")
    this.Flipped = false
    pHittable = true
  }

  if(pHittable){
    clearTile(this.x,this.y)
    if(this.Flipped)
      addSprite(this.x,this.y,this.fse)
    else
      addSprite(this.x,this.y,this.se)
    playerHealth -= this.attackDamage
  }
}
AI.prototype.AIMove = function(){
  var roll = Math.floor(Math.random() * 8);
  //console.log("Roll: " + roll)

  //Stop Any Running Attacks
  if(this.attacking){
    this.StopAttack()
  }
  else{
    if(!this.inCombat){
  
    //Check For If Player In Front Of You (Players in Eye Range)
      if(!this.Flipped){
        if(this.x + 1 == pX && this.y == pY){
          this.inCombat = true
        }
      }
      else{
        if(this.x - 1 == pX && this.y == pY){
          this.inCombat = true
        }
      }
      
      //Check For Health Change (Sneak Attack)
      if(this.Health < this.lastHealth){
        //Check For Player Behind
        if(!this.Flipped){
          if(this.x - 1 == pX && this.y == pY){
            this.inCombat = true
          }
        }
        else{
          if(this.x + 1 == pX && this.y == pY){
            this.inCombat = true
          }
        }
      }
      
    }
    //Check If Safe To Leave Combat Or Keep Going
    else if(this.x - 1 != pX && this.y != pY && this.x + 1 != pX && this.y != pY){
      this.inCombat = false
    }
  
    //Sets last health to be current health after all checks above
    this.lastHealth = this.Health
  
    //If in Combat it fights or flees else it wanders
    if(this.inCombat && roll < this.fleeChance){
      if(roll < this.attackChance)
        this.Attack()
    }
    else{
      if(roll == 0)
        this.MoveUp()
      if(roll == 1)
        this.MoveDown()
      if(roll == 2)
        this.MoveLeft()
      if(roll == 3)
        this.MoveRight()
    }
  }
}

function SetupPlayer(){
  pX = getFirst(player).x
  pY = getFirst(player).y
}

function SetupAI(){
  if(!levels[currentLevel].aiLoaded){
    var enemys = getAll(enemy)
    var genemys = getAll(wenemy)
    var benemys = getAll(benemy)
    var yenemys = getAll(yenemy)
  
    //AI(eX,eY,eSprite,feSprite,seSprite,fseSprite,health,aDamage,aChance,fChance)
  
    for (var i = 0; i < enemys.length; i++) {
      enemysAI.push(new AI(enemys[i].x,enemys[i].y,enemy,fenemy,senemy,fsenemy,50,15,5,3))
    }
    for (var i = 0; i < genemys.length; i++) {
      enemysAI.push(new AI(genemys[i].x,genemys[i].y,wenemy,wfenemy,wsenemy,wfsenemy,75,25,5,3))
    }
    for (var i = 0; i < benemys.length; i++) {
      enemysAI.push(new AI(benemys[i].x,benemys[i].y,benemy,bfenemy,bsenemy,bfsenemy,100,25,5,3))
    }
    for (var i = 0; i < yenemys.length; i++) {
      enemysAI.push(new AI(yenemys[i].x,yenemys[i].y,yenemy,yfenemy,ysenemy,yfsenemy,125,25,5,3))
    }
    levels[currentLevel].aiLoaded = true
  }else{
    RemoveAI(currentLevel)
    enemysAI = levels[currentLevel].ais
    for (var i = 0; i < enemysAI.length; i++) {
      enemysAI[i].inCombat = false
      enemysAI[i].Dead = false
      enemysAI[i].attacking = false
      enemysAI[i].cooldown = false
      enemysAI[i].Flipped = false
      addSprite(enemysAI[i].x, enemysAI[i].y, enemysAI[i].e)
    }
  }
}

function RemoveAI(levelNum){
  var e = tilesWith(enemy)
  var we = tilesWith(wenemy)
  var be = tilesWith(benemy)
  var ye = tilesWith(yenemy)
  
  for (var i = 0; i < e.length; i++) {
    var x = e[i][0]._x
    var y = e[i][0]._y
    clearTile(x,y)
  }
  for (var i = 0; i < we.length; i++) {
    var x = we[i][0]._x
    var y = we[i][0]._y
    clearTile(x,y)
  }
  for (var i = 0; i < be.length; i++) {
    var x = be[i][0]._x
    var y = be[i][0]._y
    clearTile(x,y)
  }
  for (var i = 0; i < ye.length; i++) {
    var x = ye[i][0]._x
    var y = ye[i][0]._y
    clearTile(x,y)
  }
}

function UpdateUI(){

  var keyNum = 17

  clearText()
  
  addText("Health:" + playerHealth, { 
    x: 1,
    y: 0,
    color: color`3`
  })
  
  addText("Keys:", { 
    x: 12,
    y: 0,
    color: color`6`
  })
  
  if(redKey){
      addText("#", { 
      x: keyNum,
      y: 0,
      color: color`3`
    })
    keyNum++
  } 
  if(blueKey){
      addText("#", { 
      x: keyNum,
      y: 0,
      color: color`5`
    })
    keyNum++
  }
  if(yellowKey){
      addText("#", { 
      x: keyNum,
      y: 0,
      color: color`6`
    })
    keyNum++
  }
  if(purpleKey){
      addText("#", { 
      x: keyNum,
      y: 0,
      color: color`H`
    })
    keyNum++
  }
  if(orangeKey){
      addText("#", { 
      x: keyNum,
      y: 0,
      color: color`9`
    })
    keyNum++
  }
}

//Game Code
var TimeTracker;
var GameLoopTimer;
var AILoopTimer;

function LoadMainMenu(){
  setBackground(voidf)
  setMap(menuLevel)

  clearText()

  addText("----------------", { 
    x: 2,
    y: 3,
    color: color`L`
  })
  addText("The Legend Of Sprig", { 
    x: 1,
    y: 6,
    color: color`4`
  })
  addText("Press K To Start", { 
    x: 2,
    y: 9,
    color: color`3`
  })
}

function LoadControlsMenu(){
  setBackground(voidf)
  setMap(controlsLevel)

  clearText()

  addText("--Controls--", { 
    x: 4,
    y: 2,
    color: color`L`
  })
  addText("W,A,S,D", { 
    x: 7,
    y: 5,
    color: color`3`
  })
  addText("To Move", { 
    x: 6,
    y: 7,
    color: color`4`
  })
  addText("K", { 
    x: 4,
    y: 10,
    color: color`3`
  })
  addText("To Attack", { 
    x: 7,
    y: 10,
    color: color`4`
  })
  addText("Press K To Proceed", { 
    x: 1,
    y: 13,
    color: color`H`
  })
}

function LoadInfoMenu(){
  setBackground(voidf)
  setMap(infoLevel)

  clearText()

  addText("--Tutorial--", { 
    x: 4,
    y: 2,
    color: color`L`
  })
  addText("Fight Enemys", { 
    x: 1,
    y: 4,
    color: color`4`
  })
  addText("Use Keys", { 
    x: 1,
    y: 6,
    color: color`6`
  })
  addText("To Open Doors", { 
    x: 1,
    y: 7,
    color: color`6`
  })
  addText("Collect Pumpkins", { 
    x: 1,
    y: 9,
    color: color`9`
  })
  addText("Health Boosts", { 
    x: 1,
    y: 11,
    color: color`3`
  })
  addText("Press K To Proceed", { 
    x: 1,
    y: 13,
    color: color`H`
  })
}

function LoadInfoWinMenu(){
  setBackground(voidf)
  setMap(infoWinLevel)

  clearText()

  addText("--Tutorial--", { 
    x: 4,
    y: 2,
    color: color`L`
  })
  addText("Find The", { 
    x: 3,
    y: 6,
    color: color`6`
  })
  addText("Treasure To Win!", { 
    x: 2,
    y: 8,
    color: color`6`
  })
  addText("Press K To Proceed", { 
    x: 1,
    y: 13,
    color: color`H`
  })
}

function LoadGame(levelNum){
  //Reset Var's
  pX = 0
  pY = 0
  attacking = false
  cooldown = false
  pFlipped = false

  levels[currentLevel].ais = enemysAI
  enemysAI = []

  //Start Loading
  setBackground(levels[levelNum].floor)
  setMap(levels[levelNum].level)
  lastLevel = currentLevel
  currentLevel = levelNum

  //check if Keys Or Doors Need Removal
  CheckLevelData(levelNum)

  //Setup Player
  SetupPlayer()

  //Setup AI's
  SetupAI()

  //Setup UI
  UpdateUI()

  //Game Loops

  //Start The Time Tracker
  if(!timerStarted){
    TimeTracker = setInterval(IncreaseTime, 1000)
    timerStarted = true
  }

  //Starts UI Update Loop
  GameLoopTimer = setInterval(UI, 200);

  //Starts A Wander AI
  AILoopTimer = setInterval(Wander, 500);
  
  gameStarted = true
  inLevelChange = false
}

function IncreaseTime(){
  totalTime++
  //console.log(Math.floor(Math.random() * 2))
  //var min = Math.trunc(totalTime / 60)
  //var sec = totalTime - min * 60
  //console.log(min + ":" + sec);
}

function CheckLevelData(levelNum){
  var levelData = levels[levelNum].data

  //pumpkin Check
  if(levels[levelNum].pGrab){
    var p = tilesWith(pumpkin)
      for (var i = 0; i < p.length; i++) {
        var x = p[i][0]._x
        var y = p[i][0]._y
        clearTile(x,y)
      }
  }
  
  //Key Checks
  if(levelData.rKeyGrab){
    var rKey = tilesWith(rkey)
      for (var i = 0; i < rKey.length; i++) {
        var dx = rKey[i][0]._x
        var dy = rKey[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.bKeyGrab){
    var bKey = tilesWith(bkey)
      for (var i = 0; i < bKey.length; i++) {
        var dx = bKey[i][0]._x
        var dy = bKey[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.yKeyGrab){
    var yKey = tilesWith(ykey)
      for (var i = 0; i < yKey.length; i++) {
        var dx = yKey[i][0]._x
        var dy = yKey[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.pKeyGrab){
    var pKey = tilesWith(pkey)
      for (var i = 0; i < pKey.length; i++) {
        var dx = pKey[i][0]._x
        var dy = pKey[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.oKeyGrab){
    var oKey = tilesWith(okey)
      for (var i = 0; i < oKey.length; i++) {
        var dx = oKey[i][0]._x
        var dy = oKey[i][0]._y
        clearTile(dx,dy)
      }
  }
  
  //Door Checks
  if(levelData.rDoorOpen){
    var rDoors = tilesWith(rdoor)
      for (var i = 0; i < rDoors.length; i++) {
        var dx = rDoors[i][0]._x
        var dy = rDoors[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.bDoorOpen){
    var bDoors = tilesWith(bdoor)
      for (var i = 0; i < bDoors.length; i++) {
        var dx = bDoors[i][0]._x
        var dy = bDoors[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.yDoorOpen){
    var yDoors = tilesWith(ydoor)
      for (var i = 0; i < yDoors.length; i++) {
        var dx = yDoors[i][0]._x
        var dy = yDoors[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.pDoorOpen){
    var pDoors = tilesWith(pdoor)
      for (var i = 0; i < pDoors.length; i++) {
        var dx = pDoors[i][0]._x
        var dy = pDoors[i][0]._y
        clearTile(dx,dy)
      }
  }
  if(levelData.oDoorOpen){
    var oDoors = tilesWith(odoor)
      for (var i = 0; i < oDoors.length; i++) {
        var dx = oDoors[i][0]._x
        var dy = oDoors[i][0]._y
        clearTile(dx,dy)
      }
  }

  //Set Player Spawn
  if(levelData.sX == 0 && levelData.sY == 0){
    // console.log("Using Map Spawn")
  }
  else{
    clearTile(getFirst(player).x, getFirst(player).y)
    addSprite(levelData.sX, levelData.sY, player)
    // console.log("Spawn: ", levelData.sX, " : " , levelData.sY)
  }
    
}

function GameOver(){
  gameStarted = false
  playerHealth = playerTotalHealth
  for (var i = 0; i < levels.length; i++) {
    //console.log(levels[i].data)
    //levels[i].data = new LevelData
    levels[i].ais = [] 
    levels[i].aiLoaded = false
  }
  if(startedBoss){
    levels[8].data = new LevelData
    levels[9].data = new LevelData
    levels[10].data = new LevelData
    purpleKey = true
  }
  worldX = respawnX//1
  worldY = respawnY//9
  clearInterval(GameLoopTimer);
  clearInterval(AILoopTimer);
  setMap(gameoverLevel)

  clearText()
  
  addText("Game Over", { 
    x: 5,
    y: 6,
    color: color`3`
  })
  addText("Press K To Restart", { 
    x: 1,
    y: 9,
    color: color`6`
  })
}

function TheEnd(){
  // console.log("YOU WON!!")
  
  gameStarted = false
  playerHealth = playerTotalHealth
  for (var i = 0; i < levels.length; i++) {
    // console.log(levels[i].data)
    levels[i].data = new LevelData
    levels[i].ais = [] 
    levels[i].aiLoaded = false
    levels[i].pGrab = false
  }
  worldX = 1
  worldY = 9
  clearInterval(TimeTracker);
  timerStarted = false
  clearInterval(GameLoopTimer);
  clearInterval(AILoopTimer);
  
  setBackground(floor)
  setMap(levels[5].level)
  setTimeout(EndScore, 3000);
}

function EndScore(){

  var min = Math.trunc(totalTime / 60)
  var sec = totalTime - min * 60

  
  clearText()

  addText("YOU FOUND", { 
    x: 6,
    y: 1,
    color: color`6`
  })
  addText("THE TREASURE!", { 
    x: 4,
    y: 2,
    color: color`6`
  })
  if(sec < 10){
    addText(min + ":0" + sec, { 
      x: 4,
      y: 7,
      color: color`4`
    })
  }else{
    addText(min + ":" + sec, { 
      x: 4,
      y: 7,
      color: color`4`
    })
  }
  addText(pumpkins + "/12", { 
    x: 14,
    y: 7,
    color: color`9`
  })
  addText("Press K To Restart", { 
    x: 1,
    y: 11,
    color: color`3`
  })
  pumpkins = 0
  
  setBackground(voidf)
  setMap(scoreLevel)
}

function LevelSwap(levelNum,wY,wX){
  //Respawn Points
  if(levelNum == 29 || levelNum == 44 || levelNum == 33 || levelNum == 26){
    respawnX = wX
    respawnY = wY
  }

  if(levelNum == 9){
    startedBoss = true
  }
  
  if(levelNum == 5){
    TheEnd()
  }else{
    inLevelChange = true
    clearInterval(GameLoopTimer);
    clearInterval(AILoopTimer);
    LoadGame(levelNum)
  }
}

function StartGame(){
    playerHealth = playerTotalHealth
    // for (var i = 0; i < levels.length; i++) {
    //   console.log(levels[i].data)
    //   levels[i].data = new LevelData
    // }
    LoadGame(world[worldY][worldX])
}


//onInput("l", () => {
  //LevelSwap(2)
  //LoadControlsMenu()
  //LoadInfoMenu()
  //LoadInfoWinMenu()
//})

LoadMainMenu()

function UI(){
  UpdateUI()
  if(playerHealth <= 0)
    GameOver()
}

function Wander(){
  for (var i = 0; i < enemysAI.length; i++) {
    if(!enemysAI[i].Dead){
      enemysAI[i].AIMove() 
    }
  }
}