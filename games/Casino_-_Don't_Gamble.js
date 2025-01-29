/*
@title: Casino - Don't Gamble
@author: FrankZ
@tags: []
@addedOn: 2025-01-28
*/

/*
4 games in one
CASINO includes:
BLACKJACK
ROULETTE
SLOTS
BINGO

No real objective but have fun and seriously don't get addicted kids

WASD for cursor movement
A for all-in on blackjack
J to select, hit on blackjack, or clear after roulette spin, blackjack hand, or bingo board
I to repeat previous bet on roulette of blackjack
L for roulette betting confirm and slots spin shortcut
K for return or home on some games

Have a view at my ~1500 line bowl of spaghetti
I used all 90 possible sprite characters for map declaration, like all of them (all the letters, numbers, and symbols)
24 hours of work for HighSeas
*/

let money = 1000;
let betAddition = 0;
let betAmount = 0;
let previousBetAmount = 0;
let bettingCursorX = 0;
let bettingCursorY = 2;

let blackjackDealerTotal = 0;
let blackjackPlayerTotal = 0;
let blackjackDealerCards = 0;
let blackjackPlayerCards = 0;
let blackjackDealerCardValues = [];
let blackjackPlayerCardValues = [];
let blackjackCardsDealt = false;
let blackjackReadyToReset = false;
let blackjackAceCount = 0;

let rouletteCursorX = 0;
let rouletteCursorY = 0;
let rouletteRoll;
let rouletteEvenOrOdd;
let rouletteColor;
let rouletteHighOrLow;
let rouletteThirds;
let rouletteBetRoll;
let rouletteBetEvenOrOdd;
let rouletteBetColor;
let rouletteBetHighOrLow;
let rouletteBetThirds;
let rouletteBetType;
let rouletteReadyToReset = false;

let slotsCursorX = 3;
let slotsCursorY = 7;
let slotsWinnings = 0;
let slotsReadyToReset = true;

let bingoCostPayed = false;
let bingoComplete = false;
let bingoNumbersB = [];
let bingoNumbersI = [];
let bingoNumbersN = [];
let bingoNumbersG = [];
let bingoNumbersO = [];
const bingoColumns = [bingoNumbersB, bingoNumbersI, bingoNumbersN, bingoNumbersG, bingoNumbersO];
let bingoRolledBalls = [];
let bingoShownBalls = [];
let bingoColumn = 10;
let bingoRow = 8;
let bingoDiagonal = 2;

const cursor = "c"
const BGgreen = "g"
const BGgray = "j"
const box = "U"
const blackjackIcon = "b"
const rouletteIcon = "r"
const slotsIcon = "s"
const bingoIcon = "y"
const diceIcon = "d"
const homeIcon = "h"
const infoIcon = "?"
const casinoTitle1 = "!"
const casinoTitle2 = "@"
const casinoTitle3 = "#"
const chip1 = "1"
const chip5 = "2"
const chip25 = "3"
const chip100 = "4"
const chip500 = "5"
const betDelete = "x"
const betConfirm = "z"

const blackjackCardTL = "H"
const blackjackCardTR = "J"
const blackjackCardBL = "N"
const blackjackCardBR = "M"
const blackjackCardL = "Z"
const blackjackCardR = "C"
const blackjackSuitHearts = "$"
const blackjackSuitDiamonds = "%"
const blackjackSuitSpades = "^"
const blackjackSuitClubs = "&"
const blackjackBET1 = "~"
const blackjackBET2 = "*"
const blackjackBET3 = "="
const blackjackBET4 = "+"
const blackjackHIT1 = "t"
const blackjackHIT2 = "n"
const blackjackSTAND1 = "S"
const blackjackSTAND2 = "X"
const blackjackSTAND3 = "T"
const blackjackHOME1 = ","
const blackjackHOME2 = "D"
const blackjackBox1 = ";"
const blackjackBox2 = ":"
const blackjackBox3 = "'"

const rouletteRed = "R"
const rouletteBlack = "B"
const rouletteGreen = "G"
const rouletteBoxL = "l"
const rouletteBoxM = "m"
const rouletteBoxR = "k"
const rouletteWheelTL = "u"
const rouletteWheelTR = "i"
const rouletteWheelBL = "o"
const rouletteWheelBR = "p"

const slotsBoxT = "-"
const slotsBoxB = "_"
const slotsBoxL = "/"
const slotsBoxR = "|"
const slotsBoxTL = "["
const slotsBoxTR = "]"
const slotsBoxBL = "{"
const slotsBoxBR = "}"
const slotsBoxBarConnect = "K"
const slotsBarTop = "L"
const slotsBar = "I"
const slotsBall = "O"
const slotsCherry = "q"
const slotsLemon = "w"
const slotsGrapes = "e"
const slotsWatermelon = "a"
const slotsBell = "f"
const slotsDiamond = "Q"
const slotsStar = "W"
const slotsCoin = "A"
const slots7 = "E"
const slotsWild = "F"
const slots1 = "6"
const slots2 = "7"
const slots3 = "8"

const bingoPlay1 = "P"
const bingoPlay2 = "Y"
const bingoBoxL = "v"
const bingoBoxR = "V"
const bingoBallL = "<"
const bingoBallR = ">"
const bingoXL = "9"
const bingoXR = "0"
const bingoXL2 = "("
const bingoXR2 = ")"

let rouletteWheelTLSprite = bitmap`
................
............6666
.........6666333
........66000033
......6663000033
.....66333000033
....663333300003
....600333300003
...6600033330666
..66000003366699
..63000000669993
..63300006699333
.663333006993336
.633333366933336
.633333369933336
.600333369336666`
let rouletteWheelTRSprite = bitmap`
................
6666............
3336666.........
33000066........
3300003666......
33000033366.....
300003333366....
300003333006....
6660333300066...
99666330000066..
39996600000036..
33399660000336..
633399600333366.
633339663333336.
633339963333336.
666633963333006.`
let rouletteWheelBLSprite = bitmap`
.600000069336666
.600000069933336
.600000066933336
.660003336993336
..60333336699333
..63333333669993
..66333300066699
...6633000003666
....630000033330
....660000333300
.....66000333300
......6663333300
........66333000
.........6666000
............6666
................`
let rouletteWheelBRSprite = bitmap`
666633960000006.
633339960000006.
633339660000006.
633399633300066.
33399663333306..
39996633333336..
99666000333366..
6663000003366...
033330000036....
003333000066....
00333300066.....
0033333666......
00033366........
0006666.........
6666............
................`

//setLegend in a function to be re-run for animations and sprite swaps
function resetLegend() {
  setLegend(
    [cursor, bitmap`
.77..77..77..77.
7..77..77..77..7
7..............7
.7............7.
.7............7.
7..............7
7..............7
.7............7.
.7............7.
7..............7
7..............7
.7............7.
.7............7.
7..............7
7..77..77..77..7
.77..77..77..77.`],
    [BGgreen, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
    [BGgray, bitmap`
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
    [box, bitmap`
LLLLLLLLLLLLLLLL
LL111111111111LL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LL111111111111LL
LLLLLLLLLLLLLLLL`],
    [blackjackIcon, bitmap`
00..0...........
..0.0.....00....
.0..0...00220...
0...0..022220...
000.0..0222220..
........020020..
....00..0220220.
..00220..022220.
.022220..02200..
.0223220..00....
..023320........
..0222220..33..3
...022220....3.3
...02200....3..3
....00.....3...3
...........333.3`],
    [rouletteIcon, bitmap`
.....CCCCCC.....
...CC033330CC...
..C0003333000C..
.C330003300003C.
.C333003300033C.
C33333033003333C
C00333366033300C
C00000666600000C
C00000666600000C
C00333066333300C
C33330033033333C
.C330003300333C.
.C300003300033C.
..C0003333000C..
...CC033330CC...
.....CCCCCC.....`],
    [slotsIcon, bitmap`
................
6....6...6....6.
.6...6...6...6..
..66666666666...
.6LLLLLLLLLLL6..
6LLLLLLLLLLLLL65
6L333L333L333L61
6L223L223L223L61
9L232L232L232L91
9L322L322L322L9.
9L322L322L322L9.
9LLLLLLLLLLLLL9.
.9LLLLLLLLLLL9..
..99999999999...
.9...9...9...9..
9....9...9....9.`],
    [bingoIcon, bitmap`
0000000000000000
0220220220220220
0220220220220220
0000000000000000
0220220220220220
0220220220220220
0000000000000000
0220220230220220
0220220320220220
0000000000000000
0240240240240240
0420420420420420
0000000000000000
0220220220220220
0220220220220220
0000000000000000`],
    [diceIcon, bitmap`
......LLL.......
....LL222LL.....
..LL2220222LL...
LL22022222222LL.
LL22222222022LL.
L2LL2220222LL2L.
L222LL222LL222L.
L22222LLL22222L.
L222202L222222L.
L222222L220022L.
L222222L220022L.
L202222L222222L.
LL22222L22222LL.
..LL222L222LL...
....LL2L2LL.....
......LLL.......`],
    [homeIcon, bitmap`
................
..LLLLLLLLLLLL..
.L222222222222L.
.L222220022222L.
.L222203302222L.
.L222030030222L.
.L22030CC03022L.
.L2030CCCC0302L.
.L220CCCCCC022L.
.L120CCCCCC012L.
.L110CC00CC011L.
.L110CC00CC011L.
.L111001100111L.
.L111111111111L.
..LLLLLLLLLLLL..
................`],
    [infoIcon, bitmap`
...0000000000...
..033333333330..
.03333333333330.
.03330000003330.
.03330222203330.
.L0002222203330.
.L2222200033330.
.L222200333330L.
.L122033330002L.
.L111033302211L.
.L111033301111L.
.L111100011111L.
.L111033301111L.
.L111033301111L.
..LLL03330LLLL..
......000.......`],
    [casinoTitle1, bitmap`
.000000000000000
0000000000000000
00..............
00..3333...9999.
00.333333.999999
00.33..33.99..99
00.33..33.99..99
00.33.....99..99
00.33.....999999
00.33..33.999999
00.33..33.99..99
00.333333.99..99
00..3333..99..99
00..............
0000000000000000
.000000000000000`],
    [casinoTitle2, bitmap`
0000000000000000
0000000000000000
................
..6666..4444.77.
.666666.4444.77.
.66..66..44..77.
.66......44..777
.66666...44..777
..66666..44..77.
.....66..44..77.
.66..66..44..77.
.666666.4444.77.
..6666..4444.77.
................
0000000000000000
0000000000000000`],
    [casinoTitle3, bitmap`
000000000000....
0000000000000...
...........00...
.77..HHHH..00...
.77.HHHHHH.00...
.77.HH..HH.00...
.77.HH..HH.00...
777.HH..HH.00...
777.HH..HH.00...
.77.HH..HH.00...
.77.HH..HH.00...
.77.HHHHHH.00...
.77..HHHH..00...
...........00...
0000000000000...
000000000000....`],
    [chip1, bitmap`
.....225522.....
...2222222222...
..222222222222..
.52222222222225.
.52222222222225.
2222222202222222
2222222002222222
2222222202222222
2222222202222222
2222222202222222
2222222000222222
.52222222222225.
.52222222222225.
..222222222222..
...2222222222...
.....225522.....`],
    [chip5, bitmap`
.....332233.....
...3333333333...
..333333333333..
.23333333333332.
.23333333333332.
3333330000333333
3333330333333333
3333330003333333
3333333330333333
3333333330333333
3333330003333333
.23333333333332.
.23333333333332.
..333333333333..
...3333333333...
.....332233.....`],
    [chip25, bitmap`
.....442244.....
...4444444444...
..444444444444..
.24444444444442.
.24444444444442.
4444004440000444
4440440440444444
4444440440004444
4444004444440444
4440444444440444
4440000440004444
.24444444444442.
.24444444444442.
..444444444444..
...4444444444...
.....442244.....`],
    [chip100, bitmap`
.....002200.....
...0000000000...
..000000000000..
.20000000000002.
.20000000000002.
0000202220222000
0000202020202000
0000202020202000
0000202020202000
0000202020202000
0000202220222000
.20000000000002.
.20000000000002.
..000000000000..
...0000000000...
.....002200.....`],
    [chip500, bitmap`
.....HH22HH.....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.2HHHHHHHHHHHH2.
.2HHHHHHHHHHHH2.
HH0000H000H000HH
HH0HHHH0H0H0H0HH
HH000HH0H0H0H0HH
HHHHH0H0H0H0H0HH
HHHHH0H0H0H0H0HH
HH000HH000H000HH
.2HHHHHHHHHHHH2.
.2HHHHHHHHHHHH2.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
.....HH22HH.....`],
    [betDelete, bitmap`
................
................
................
...33......33...
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
...33......33...
................
................
................`],
    [betConfirm, bitmap`
................
................
................
................
................
............44..
...........444..
..........444...
.........444....
...44...444.....
...444.444......
....44444.......
.....444........
......4.........
................
................`],
    [blackjackCardTL, bitmap`
................
................
................
......0000000000
....00LLLLLLLLLL
...0LL1111111111
..0L112222222222
..0L122222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222`],
    [blackjackCardTR, bitmap`
................
................
................
0000000000......
LLLLLLLLLL00....
1111111111LL0...
222222222211L0..
222222222221L0..
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.`],
    [blackjackCardBL, bitmap`
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
..0L122222222222
..0L112222222222
...0LL1111111111
....00LLLLLLLLLL
......0000000000
................
................
................`],
    [blackjackCardBR, bitmap`
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
222222222221L0..
222222222211L0..
1111111111LL0...
LLLLLLLLLL00....
0000000000......
................
................
................`],
    [blackjackCardL, bitmap`
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222
.0L1222222222222`],
    [blackjackCardR, bitmap`
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.`],
    [blackjackSuitHearts, bitmap`
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2223322233221L0.
2233332333321L0.
2233333333321L0.
2233333333321L0.
2223333333221L0.
2222333332221L0.
2222233322221L0.
2222223222221L0.`],
    [blackjackSuitDiamonds, bitmap`
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222223222221L0.
2222233322221L0.
2222333332221L0.
2223333333221L0.
2233333333321L0.
2223333333221L0.
2222333332221L0.
2222233322221L0.
2222223222221L0.`],
    [blackjackSuitSpades, bitmap`
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222220222221L0.
2222200022221L0.
2222000002221L0.
2220000000221L0.
2200000000021L0.
2200000000021L0.
2220020200221L0.
2222200022221L0.
2222000002221L0.`],
    [blackjackSuitClubs, bitmap`
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222222222221L0.
2222220222221L0.
2222200022221L0.
2222200022221L0.
2220020200221L0.
2200000000021L0.
2220020200221L0.
2222220222221L0.
2222200022221L0.`],
    [blackjackBET1, bitmap`
................
..LLLLLLLLLLLLLL
.L22222222222222
.L20000022000002
.L20000002000002
.L20022002002222
.L20022002002222
.L20000022000022
.L20000022000022
.L20022002002222
.L20022002002222
.L20000002000002
.L20000022000002
.L22222222222222
..LLLLLLLLLLLLLL
................`],
    [blackjackBET2, bitmap`
................
LLLLLLLLLLLLLLLL
2222222222222222
0000002222200200
0000002222200200
2200222222200200
2200222222200200
2200222222200200
2200222222200200
2200222222200200
2200222222200200
2200222222200000
2200222222220002
2222222222222222
LLLLLLLLLLLLLLLL
................`],
    [blackjackBET3, bitmap`
................
LLLLLLLLLLLLLLLL
2222222222222222
2002222242222222
2002222444222222
2002224242422222
2002222242222222
2002222242222222
2002002242222222
2002222242222222
2002222242222222
0002222242222222
0022222242222222
2222222222222222
LLLLLLLLLLLLLLLL
................`],
    [blackjackBET4, bitmap`
................
LLLLLLLLLLLLLL..
22222222222222L.
20000222223222L.
00000222223222L.
00222222223222L.
00222222223222L.
00002222223222L.
20000200223222L.
22200222223222L.
22200222323232L.
00000222233322L.
00002222223222L.
22222222222222L.
LLLLLLLLLLLLLL..
................`],
    [blackjackHIT1, bitmap`
................
..LLLLLLLLLLLLLL
.L22222222222222
.L22000000220020
.L22000000220020
.L22220022220020
.L22220022220020
.L22220022220000
.L22220020020000
.L22220022220020
.L20020022220020
.L20000022220020
.L22000222220020
.L22222222222222
..LLLLLLLLLLLLLL
................`],
    [blackjackHIT2, bitmap`
................
LLLLLLLLLLLLLL..
22222222222222L.
02000020000002L.
02000020000002L.
02200222200222L.
02200222200222L.
02200222200222L.
02200222200222L.
02200222200222L.
02200222200222L.
02000022200222L.
02000022200222L.
22222222222222L.
LLLLLLLLLLLLLL..
................`],
    [blackjackSTAND1, bitmap`
................
..LLLLLLLLLLLLLL
.L22222222222222
.L20022222220000
.L20022222200000
.L20022222200222
.L20022222200222
.L20022222200002
.L20022000220000
.L20022222222200
.L20022222222200
.L20000222200000
.L20000222200002
.L22222222222222
..LLLLLLLLLLLLLL
................`],
    [blackjackSTAND2, bitmap`
................
LLLLLLLLLLLLLLLL
2222222222222222
2000000222002220
2000000220000220
2220022220000220
2220022200220020
2220022200220020
2220022200000020
2220022200000020
2220022200220020
2220022200220020
2220022200220020
2222222222222222
LLLLLLLLLLLLLLLL
................`],
    [blackjackSTAND3, bitmap`
................
LLLLLLLLLLLLLL..
22222222222222L.
02220020000022L.
00220020000002L.
00220020022002L.
00020020022002L.
00020020022002L.
02000020022002L.
02000020022002L.
02200020022002L.
02200020000002L.
02220020000022L.
22222222222222L.
LLLLLLLLLLLLLL..
................`],
    [blackjackHOME1, bitmap`
................
..LLLLLLLLLLLLLL
.L22222222222222
.L22002220022222
.L22002200022222
.L22002000222222
.L22000002222222
.L22000022222222
.L22000022220000
.L22000002222222
.L22002000222222
.L22002200022222
.L22002220022222
.L22222222222222
..LLLLLLLLLLLLLL
................`],
    [blackjackHOME2, bitmap`
................
LLLLLLLLLLLLLL..
22222222222222L.
22222200222222L.
22222033022222L.
22220300302222L.
222030CC030222L.
22030CCCC03022L.
2220CCCCCC0222L.
2220CCCCCC0222L.
2220CC00CC0222L.
2220CC00CC0222L.
22220022002222L.
22222222222222L.
LLLLLLLLLLLLLL..
................`],
    [blackjackBox1, bitmap`
.000000000000000
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
0222222222222222
.000000000000000`],
    [blackjackBox2, bitmap`
0000000000000000
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
0000000000000000`],
    [blackjackBox3, bitmap`
000000000000000.
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
2222222222222220
000000000000000.`],
    [rouletteRed, bitmap`
LLLLLLLLLLLLLLLL
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
LLLLLLLLLLLLLLLL`],
    [rouletteBlack, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`],
    [rouletteGreen, bitmap`
LLLLLLLLLLLLLLLL
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
LLLLLLLLLLLLLLLL`],
    [rouletteBoxL, bitmap`
LLLLLLLLLLLLLLLL
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
LLLLLLLLLLLLLLLL`],
    [rouletteBoxM, bitmap`
LLLLLLLLLLLLLLLL
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
LLLLLLLLLLLLLLLL`],
    [rouletteBoxR, bitmap`
LLLLLLLLLLLLLLLL
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
111111111111111L
LLLLLLLLLLLLLLLL`],
    [rouletteWheelTL, rouletteWheelTLSprite],
    [rouletteWheelTR, rouletteWheelTRSprite],
    [rouletteWheelBL, rouletteWheelBLSprite],
    [rouletteWheelBR, rouletteWheelBRSprite],
    [slotsBoxT, bitmap`
................
................
................
................
................
................
..6...6...6...6.
.666.666.666.666
9666966696669666
9969996999699969
9999999999999999
9969996999699969
9666966696669666
6666666666666666
6LLL6LLL6LLL6LLL
LLLLLLLLLLLLLLLL`],
    [slotsBoxB, bitmap`
LLLLLLLLLLLLLLLL
LLL6LLL6LLL6LLL6
6666666666666666
6669666966696669
9699969996999699
9999999999999999
9699969996999699
6669666966696669
666.666.666.666.
.6...6...6...6..
................
................
................
................
................
................`],
    [slotsBoxL, bitmap`
.......6699966LL
......66669666LL
.......6699966LL
........9999966L
.......6699966LL
......66669666LL
.......6699966LL
........9999966L
.......6699966LL
......66669666LL
.......6699966LL
........9999966L
.......6699966LL
......66669666LL
.......6699966LL
........9999966L`],
    [slotsBoxR, bitmap`
L6699999........
LL6699966.......
LL66696666......
LL6699966.......
L6699999........
LL6699966.......
LL66696666......
LL6699966.......
L6699999........
LL6699966.......
LL66696666......
LL6699966.......
L6699999........
LL6699966.......
LL66696666......
LL6699966.......`],
    [slotsBoxTL, bitmap`
................
................
................
................
................
................
................
..............6.
..........6..666
.........666.666
..........669969
..........969999
.........6999966
........66699666
.........66696LL
........9999966L`],
    [slotsBoxTR, bitmap`
................
................
................
................
................
................
................
................
9.6.............
9666..6.........
96699666........
9699666.........
999999..........
66699966........
6L6696666.......
LL669966........`],
    [slotsBoxBL, bitmap`
........669966LL
.......6666966L6
........66999666
..........999999
.........6669969
........66699669
.........6..6669
.............6.9
................
................
................
................
................
................
................
................`],
    [slotsBoxBR, bitmap`
L6699999........
LL69666.........
66699666........
6699996.........
999969..........
969966..........
666.666.........
666..6..........
.6..............
................
................
................
................
................
................
................`],
    [slotsBoxBarConnect, bitmap`
L6699999........
LL6699966.......
LL66696666......
LL6699966.......
L6699999........
LL66999661111111
LL66696666111111
LL66999661111LLL
L66999991LLLL111
LL66999661111111
LL66696666111111
LL6699966.......
L6699999........
LL6699966.......
LL66696666......
LL6699966.......`],
    [slotsBarTop, bitmap`
................
................
................
................
................
11111111........
111111111L......
L1111LL1L1......
1LLLL11L111.....
111111L1L11.....
11111L11L11.....
....L11L111.....
.....11L111.....
.....11L111.....
.....11L111.....
.....111L11.....`],
    [slotsBar, bitmap`
.....111L11.....
.....111L11.....
.....111L11.....
.....11L111.....
.....11L111.....
.....11L111.....
.....11L111.....
.....111L11.....
.....111L11.....
.....111L11.....
.....111L11.....
.....11L111.....
.....11L111.....
.....11L111.....
.....11L111.....
.....111L11.....`],
    [slotsBall, bitmap`
.....111L11.....
.....555555.....
...5577777755...
..577777777775..
.57777777777775.
.57777777777775.
5777777777777775
5777777777777775
5775777777777775
5775777777777775
5777577777777775
.57775577777775.
.57777777777775.
..577777777775..
...5577777755...
.....555555.....`],
    [slotsCherry, bitmap`
LLLLLLLLLLLLLLLL
LL14DDDD111111LL
L114DDDDDDD1111L
L11441DDDDDD111L
L11414111DD1111L
L11411444111111L
L11441111441111L
L11141111000011L
L11000010333301L
L10333303333330L
L03333330333330L
L03333330333330L
L0C333330C33330L
L0CC33330CCC301L
LL0CCC30100001LL
LLL0000LLLLLLLLL`],
    [slotsLemon, bitmap`
LLLL000LLLLLLLLL
LL104440111111LL
L10444000011111L
L04466666600111L
L0C666666666011L
L0666F66F666601L
L0666666666F660L
L0F66666F666660L
L0FF66F66666660L
L10FF66666F6660L
L10FFF666F666660
L110FFF66666F660
L110FFFF66666660
L1110FFFFF66660L
LL111000FFFF60LL
LLLLLLLL00000LLL`],
    [slotsGrapes, bitmap`
LLLLLLLLLLLLLLLL
LL111114444111LL
L14411444444111L
L4444C441144411L
L4411CC11111111L
L4111CCC1100111L
L11111CC10H8011L
L11100CC00HH001L
L110H800H800H80L
L110HH00HH00HH0L
L11000H800H8001L
L10H80HH00HH011L
L10HH000H800111L
L1100110HH01111L
LL111111001111LL
LLLLLLLLLLLLLLLL`],
    [slotsWatermelon, bitmap`
LLLLDDLLLLLLLLLL
LL1D4411111111LL
L1D433311111111L
L1D430331111111L
LD4333333111111L
LD4333303311111L
LD4333333331111L
LD4303333033111L
LD4333333333311L
LD4333303333331L
L1D433333330334D
L1D433303333334D
L11D4433333344DL
L111DD444444DD1L
LL1111DDDDDD11LL
LLLLLLLLLLLLLLLL`],
    [slotsBell, bitmap`
LLLLLLLLLLLLLLLL
LL111110011111LL
L11111066011111L
L111100FF001111L
L11106666660111L
L1106FFFFFF6011L
L1106FFFFFF6011L
L1106FFFFFF6011L
L1106FFFFFF6011L
L1106FFFFFF6011L
L11066666666011L
L106FFFFFFFF601L
L100000CCCC0001L
L1111110CC01111L
LL111111001111LL
LLLLLLLLLLLLLLLL`],
    [slotsDiamond, bitmap`
LLLLLLLLLLLLLLLL
LL111111111111LL
L11111111111111L
L11100000000111L
L11057575757011L
L10775757575701L
L05555555555550L
L07775777757770L
L10775777757701L
L11077577577011L
L11107577570111L
L11110755701111L
L11111055011111L
L11111100111111L
LL111111111111LL
LLLLLLLLLLLLLLLL`],
    [slotsStar, bitmap`
LLLLLLLLLLLLLLLL
LL111110011111LL
L11111066011111L
L11111066011111L
L11110F66601111L
L1110F666660111L
0000666266660000
0F66666266666660
L0F6666626666F0L
L10F66666226F01L
L110F6666666011L
L110F6666666011L
L10F66666666601L
L10F66F00F66601L
LL0FFF0110FFF0LL
LL0000LLLL0000LL`],
    [slotsCoin, bitmap`
LLLLLLLLLLLLLLLL
LL111100001111LL
L11100666600111L
L11066696666011L
L10669999996601L
L10669696666601L
L0F669696666660L
L0F669999996660L
L0F666696696660L
L0F666696696660L
L10F69999996601L
L10F66696666601L
L110FF666666011L
L11100FFFF00111L
LL111100001111LL
LLLLLLLLLLLLLLLL`],
    [slots7, bitmap`
LLLLLLLLLLLLLLLL
LL111111111111LL
L11000000000011L
L10333333333301L
L10333333333301L
L10333000333301L
L11000110333301L
L11111100333301L
L11111033333011L
L11111033333011L
L11110333300111L
L11110333301111L
L11110333301111L
L11110333301111L
LL111100001111LL
LLLLLLLLLLLLLLLL`],
    [slotsWild, bitmap`
LLLLLLLLLLLLLLLL
LL100000000001LL
L10222222222201L
L102L2226222201L
L10222266222201L
L10333266277701L
L10233366777201L
L10223888872201L
L102288L8L22201L
L10228888822201L
L1022HHHHH22201L
L102H2H2H2H2201L
L1022222222L201L
L10222222222201L
LL100000000001LL
LLLLLLLLLLLLLLLL`],
    [slots1, bitmap`
................
................
.....00000......
.....02220......
.....02220......
.....00220......
......0220......
......0220......
......0220......
......0220......
......0220......
......0220......
......0220......
......0000......
................
................`],
    [slots2, bitmap`
................
................
.....000000.....
....00222200....
....02222220....
....02200220....
....00002220....
.....0022200....
....0022200.....
....022200......
....02200000....
....02222220....
....02222220....
....00000000....
................
................`],
    [slots3, bitmap`
................
................
....0000000.....
....02222200....
....02222220....
....00000220....
.....0000220....
.....0222220....
.....0222220....
.....0000220....
....00000220....
....02222220....
....02222200....
....0000000.....
................
................`],
    [bingoPlay1, bitmap`
................
..00000000000000
.022222222222222
.024444222422222
.024222422422222
.024222422422222
.024222422422222
.024444222411221
.014111111411111
.014111111411111
.014111111411111
.014111111411111
.014111111444441
.011111111111111
..00000000000000
................`],
    [bingoPlay2, bitmap`
................
00000000000000..
222222222222220.
222422224222420.
224242224222420.
224242222424220.
242224222424220.
244444222242220.
142214122141110.
141114111141110.
141114111141110.
141114111141110.
141114111141110.
111111111111110.
00000000000000..
................`],
    [bingoBoxL, bitmap`
0000000000000000
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0000000000000000`],
    [bingoBoxR, bitmap`
0000000000000000
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
0000000000000000`],
    [bingoBallL, bitmap`
...........00000
.......0000.....
.....00.........
....0...........
...0............
..0.............
.0..............
.0..............
.0..............
.0..............
..0.............
...0............
....0...........
.....00.........
.......0000.....
...........00000`],
    [bingoBallR, bitmap`
00000...........
.....0000.......
.........00.....
...........0....
............0...
.............0..
..............0.
..............0.
..............0.
..............0.
.............0..
............0...
...........0....
.........00.....
.....0000.......
00000...........`],
    [bingoXL, bitmap`
0000000000000000
04..............
0.44............
0...44..........
0.....444.......
0........444....
0...........444.
0..............4
0..............4
0...........444.
0........444....
0.....444.......
0...44..........
0.44............
04..............
0000000000000000`],
    [bingoXR, bitmap`
0000000000000000
..............40
............44.0
..........44...0
.......444.....0
....444........0
.444...........0
4..............0
4..............0
.444...........0
....444........0
.......444.....0
..........44...0
............44.0
..............40
0000000000000000`],
    [bingoXL2, bitmap`
0000000000000000
03..............
0.33............
0...33..........
0.....333.......
0........333....
0...........333.
0..............3
0..............3
0...........333.
0........333....
0.....333.......
0...33..........
0.33............
03..............
0000000000000000`],
    [bingoXR2, bitmap`
0000000000000000
..............30
............33.0
..........33...0
.......333.....0
....333........0
.333...........0
3..............0
3..............0
.333...........0
....333........0
.......333.....0
..........33...0
............33.0
..............30
0000000000000000`]
  )
};
resetLegend();

let level;
const levels = [
  map`
  .!@#.
  .....
  b...y
  .r.s.`,
  map`
  ..........
  ..........
  ..........
  ;:'~*=+;:'
  ;:'tnSXT,D
  ..........
  ..........
  ..........`,
  map`
  RBRBRBRBRB
  BRBRBRBRRB
  RBRBRBRBBR
  BRBRBR..GG
  ..........
  R.lk.lklmk
  B.lk.lklmk
  h......lmk`,
  map`
  [-------].
  /jjjjjjj|.
  /jEjEjEjKL
  /jjjjjjj|I
  {_______}I
  .........I
  .........O
  h?.678....`,
  map`
  h.........
  PY........
  ..........
  vVvVvVvVvV
  vVvVvVvVvV
  vVvVvVvVvV
  vVvVvVvVvV
  vVvVvVvVvV`,
  map`
  .....
  ....z
  12345
  xxxxx`,
  map`
  .....
  .ui..
  .op..
  .....`,
  map`
  ....UUU...
  qweaUUU...
  .fQWUUU...
  ...AUUU...
  ...EUUU...
  ..........
  .F........
  x.........`
];

//returns to home menu, reseting necessary settings
function home() {
  betAmount = 0;
  level = 0;
  setMap(levels[level]);
  setBackground(BGgreen);
  addSprite(0, 2, cursor);
  clearText();
  addText(" J to\nselect\n game", { x: 7, y: 7, color: color`2` });
  addText("Mny= " + money.toString(), { x: 5, y: 5, color: color`4` });
};
home();

//game list to run game function based on cursor position in menu, maybe not better than stating each but whatever
const games = [blackjack, roulette, slots, bingo];

//starts game listed and triggers necessary text
function blackjack() {
  setMap(levels[level]);
  blackjackText();
};

function roulette() {
  setMap(levels[level]);
  addSprite(rouletteCursorX, rouletteCursorY, cursor);
  rouletteText();
};

function slots() {
  setMap(levels[level]);
  addSprite(slotsCursorX, slotsCursorY, cursor);
  slotsText();
};

function bingo() {
  setMap(levels[level]);
  setBackground();
  addSprite(0, 1, cursor);
  bingoResetVariables();
  clearText();
  addText("Cost is 100,\nLess balls used,\nMore payout", { x: 4, y: 2, color: color`0` });;
};

//starts chips screen used in roulette and sets text
function bettingScreen() {
  if (level === 5) {
    bettingCursorX = getFirst(cursor).x;
    bettingCursorY = getFirst(cursor).y;
  };
  level = 5;
  setMap(levels[level]);
  addSprite(bettingCursorX, bettingCursorY, cursor);
  clearText();
  addText("MONEY:\n" + money.toString(), { x: 2, y: 1, color: color`2` });
  addText("BETTING:\n" + betAmount.toString(), { x: 10, y: 1, color: color`2` });
  addText("k-return", { x: 1, y: 5, color: color`2` });
};

//in a list for easy randomization
const blackjackSuits = [blackjackSuitHearts, blackjackSuitDiamonds, blackjackSuitSpades, blackjackSuitClubs];

function blackjackText() {
  clearText();
  addText("Dealer\n  " + blackjackDealerTotal.toString(), { x: 0, y: 6, color: color`0` });
  addText("Player\n  " + blackjackPlayerTotal.toString(), { x: 0, y: 8, color: color`0` });
  addText("Bet:\n" + betAmount.toString(), { x: 15, y: 6, color: color`0` });
  blackjackCardText();
};

function blackjackBet(upOrDown) {
  if (upOrDown === 0 && betAmount < money) {
    betAmount += 1;
  } else if (upOrDown === 1 && betAmount !== 0) {
    betAmount -= 1;
  };
  blackjackText();
};

//copies previous bet, set at end of previous round
function blackjackRedoBet() {
  if (money >= previousBetAmount) {
    betAmount = previousBetAmount;
    blackjackText();
  };
};

//places first two cards for player and dealer
function blackjackStart() {
  blackjackCardsDealt = true;
  money -= betAmount;
  blackjackPlaceCard(0, 0, false);
  blackjackPlaceCard(1, 0, true);
  blackjackDealerCards += 1;
  blackjackPlaceCard(0, 1, false);
  blackjackPlaceCard(1, 1, false);
  blackjackPlayerCards += 2;
  if (blackjackPlayerTotal === 21) {
    blackjackBlackjack();
  };
};

//triggers start card placement or player card draw based on card amount
function blackjackHit() {
  if (blackjackPlayerCards === 0) {
    blackjackStart();
  } else {
    blackjackPlaceCard(blackjackPlayerCards, 1, false);
    blackjackPlayerCards += 1;
  };
};

//goes to dealer's turn and draws until >17 and decides win
function blackjackStand() {
  clearTile(3, 1); //clears suit spot to allow the dealer's second card to be "flipped"
  while (blackjackDealerTotal < 17) {
    if (blackjackDealerCards < 6) {
      blackjackPlaceCard(blackjackDealerCards, 0, false);
      blackjackDealerCards += 1;
    };
  };
  //a bunch of cases testing if player won after standing
  if (blackjackPlayerTotal <= 21) {
    if (blackjackPlayerCards === 5 && blackjackPlayerTotal < 21) {
      blackjackWin();
    } else if (blackjackDealerTotal > 21 || blackjackDealerTotal < blackjackPlayerTotal) {
      blackjackWin();
    } else if (blackjackDealerTotal > blackjackPlayerTotal) {
      blackjackLose();
    } else if (blackjackDealerTotal === blackjackPlayerTotal) {
      blackjackPush();
    };
  } else {
    blackjackLose();
  };
  blackjackReadyToReset = true;
};

//places all 6 sprites for a random suited card in the given location and flipped condition
function blackjackPlaceCard(cardNumber, dealerOrPlayer, flipped) {
  addSprite(0 + 2 * cardNumber, 0 + 5 * dealerOrPlayer, blackjackCardTL);
  addSprite(1 + 2 * cardNumber, 0 + 5 * dealerOrPlayer, blackjackCardTR);
  addSprite(0 + 2 * cardNumber, 2 + 5 * dealerOrPlayer, blackjackCardBL);
  addSprite(1 + 2 * cardNumber, 2 + 5 * dealerOrPlayer, blackjackCardBR);
  addSprite(0 + 2 * cardNumber, 1 + 5 * dealerOrPlayer, blackjackCardL);
  if (flipped === false) {
    addSprite(1 + 2 * cardNumber, 1 + 5 * dealerOrPlayer, blackjackSuits[Math.floor(Math.random() * 4)]);
    blackjackCardValue(dealerOrPlayer);
  } else {
    addSprite(1 + 2 * cardNumber, 1 + 5 * dealerOrPlayer, blackjackCardR);
  };
};

//gives the placed card (^) a value and calculates the value total, then sees if the player's total or card count is special (like 21 or 5 card rule met)
function blackjackCardValue(dealerOrPlayer) {
  let cardValueNumber = Math.floor(Math.random() * 13 + 1);
  let trueCardValue;
  if (cardValueNumber === 1) {
    trueCardValue = 11;
    if (dealerOrPlayer === 1) {
      blackjackAceCount += 1;
    };
  } else if (cardValueNumber > 10) {
    trueCardValue = 10;
  } else {
    trueCardValue = cardValueNumber;
  };
  if (dealerOrPlayer === 0) {
    blackjackDealerTotal += trueCardValue;
    blackjackDealerCardValues.push(cardValueNumber);
  } else {
    blackjackPlayerTotal += trueCardValue;
    blackjackPlayerCardValues.push(cardValueNumber);
  };
  blackjackText();
  if (dealerOrPlayer === 1) {
    if (blackjackPlayerTotal >= 21) {
      //if the player busts with an ace, the value is reduced to a 1 instead of the default 11
      if (blackjackAceCount > 0 && blackjackPlayerTotal !== 21) {
        blackjackPlayerTotal -= 10;
        blackjackAceCount -= 1;
        blackjackText();
        if (blackjackPlayerTotal === 21) {
          blackjackStand();
        };
      } else {
        blackjackStand();
      };
    } else if (blackjackPlayerCards === 5) {
      blackjackStand();
    };
  };
};

//uses the saved card values for player and dealer to replace card text when other text is updated
function blackjackCardText() {
  let cardValue
  for (let i = 0; i < blackjackDealerCardValues.length; i++) {
    if (blackjackDealerCardValues[i] > 1 && blackjackDealerCardValues[i] < 11) {
      cardValue = blackjackDealerCardValues[i].toString();
    } else if (blackjackDealerCardValues[i] === 1) {
      cardValue = "A";
    } else if (blackjackDealerCardValues[i] === 11) {
      cardValue = "J";
    } else if (blackjackDealerCardValues[i] === 12) {
      cardValue = "Q";
    } else if (blackjackDealerCardValues[i] === 13) {
      cardValue = "K";
    };
    addText(cardValue.toString(), { x: 1 + i * 4, y: 1, color: color`0` });
  }
  for (let i = 0; i < blackjackPlayerCardValues.length; i++) {
    if (blackjackPlayerCardValues[i] > 1 && blackjackPlayerCardValues[i] < 11) {
      cardValue = blackjackPlayerCardValues[i].toString();
    } else if (blackjackPlayerCardValues[i] === 1) {
      cardValue = "A";
    } else if (blackjackPlayerCardValues[i] === 11) {
      cardValue = "J";
    } else if (blackjackPlayerCardValues[i] === 12) {
      cardValue = "Q";
    } else if (blackjackPlayerCardValues[i] === 13) {
      cardValue = "K";
    };
    addText(cardValue.toString(), { x: 1 + i * 4, y: 11, color: color`0` });
  };
};

//pays out and places text for a win
function blackjackWin() {
  blackjackClearCorner();
  addText("  Win\n+" + betAmount.toString(), { x: 13, y: 2, color: color`2` });
  money += betAmount * 2;
};

//pays out and places text for a blackjack (21 on the first two cards)
function blackjackBlackjack() {
  blackjackClearCorner();
  addText("  Win\n+" + (Math.ceil(betAmount * 1.5)).toString(), { x: 13, y: 2, color: color`2` });
  money += Math.ceil(betAmount * 2.5);
};

//text for loss
function blackjackLose() {
  blackjackClearCorner();
  addText(" Lose\n-" + betAmount.toString(), { x: 13, y: 2, color: color`2` });
};

//place text and gives back bet for a tie
function blackjackPush() {
  blackjackClearCorner();
  addText("  Push", { x: 13, y: 2, color: color`2` });
  money += betAmount;
};

//removes dealer's last two cards to display win or loss text (no other space)
function blackjackClearCorner() {
  for (let x = 6; x < 10; x++) {
    for (let y = 0; y < 3; y++) {
      clearTile(x, y);
    };
  };
  //removes dealer's cards from list so the values don't get printed after card sprites are gone
  blackjackDealerCardValues.splice(3, 2);
  blackjackText();
};

//clears away cards and resets all relevant variables
function blackjackReset() {
  for (let r = 0; r < 2; r++) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0 + 5 * r; y < 3 + 5 * r; y++) {
        clearTile(x, y);
      };
    };
  };
  if (betAmount !== 0) {
    previousBetAmount = betAmount;
  };
  betAmount = 0;
  blackjackDealerTotal = 0;
  blackjackPlayerTotal = 0;
  blackjackDealerCards = 0;
  blackjackPlayerCards = 0;
  blackjackDealerCardValues = [];
  blackjackPlayerCardValues = [];
  blackjackCardsDealt = false;
  blackjackReadyToReset = false;
  blackjackAceCount = 0;
  blackjackText();
};

//places text for betting options including a function to place the sequential numbers in the grid
function rouletteText() {
  clearText();
  let x = 0;
  let y = 1;
  for (let number = 1; number < 37; number++) {
    if (number / 10 > y) {
      y += 1;
      x = 0;
    };
    addText(number.toString(), { x: x, y: 2 * y - 1, color: color`2` });
    x += 2;
  };
  addText("0", { x: 16, y: 7, color: color`2` });
  addText("00", { x: 18, y: 7, color: color`2` });
  addText("even", { x: 4, y: 11, color: color`2` });
  addText("odd", { x: 5, y: 13, color: color`2` });
  addText("<19", { x: 11, y: 11, color: color`2` });
  addText(">18", { x: 11, y: 13, color: color`2` });
  addText("1-12", { x: 16, y: 11, color: color`2` });
  addText("13-24", { x: 15, y: 13, color: color`2` });
  addText("25-36", { x: 15, y: 15, color: color`2` });
  addText("Mny:" + money.toString(), { x: 3, y: 15, color: color`4` });
};

//saves bet option and type based on cursor position on click
function rouletteOption() {
  rouletteCursorX = getFirst(cursor).x;
  rouletteCursorY = getFirst(cursor).y;
  if (getFirst(cursor).y < 4) {
    if (getFirst(cursor).y === 3 && getFirst(cursor).x > 5) {
      if (getFirst(cursor).x === 8) {
        rouletteBetRoll = "0";
        rouletteBetType = 1;
        bettingScreen();
      } else if (getFirst(cursor).x === 9) {
        rouletteBetRoll = "00";
        rouletteBetType = 1;
        bettingScreen();
      };
    } else {
      rouletteBetRoll = (getFirst(cursor).y * 10 + getFirst(cursor).x + 1).toString();
      rouletteBetType = 1;
      bettingScreen();
    };
  } else if (getFirst(cursor).x === 0) {
    if (getFirst(cursor).y === 5) {
      rouletteBetColor = "red";
      rouletteBetType = 2;
      bettingScreen();
    } else if (getFirst(cursor).y === 6) {
      rouletteBetColor = "black";
      rouletteBetType = 2;
      bettingScreen();
    } else if (getFirst(cursor).y === 7) {
      home();
    };
  } else if (getFirst(cursor).x === 2 || getFirst(cursor).x === 3) {
    if (getFirst(cursor).y === 5) {
      rouletteBetEvenOrOdd = "even";
      rouletteBetType = 3;
      bettingScreen();
    } else if (getFirst(cursor).y === 6) {
      rouletteBetEvenOrOdd = "odd";
      rouletteBetType = 3;
      bettingScreen();
    };
  } else if (getFirst(cursor).x === 5 || getFirst(cursor).x === 6) {
    if (getFirst(cursor).y === 5) {
      rouletteBetHighOrLow = "1-18";
      rouletteBetType = 4;
      bettingScreen();
    } else if (getFirst(cursor).y === 6) {
      rouletteHighOrLowBet = "19-36";
      rouletteBetType = 4;
      bettingScreen();
    };
  } else if (getFirst(cursor).x > 6) {
    if (getFirst(cursor).y === 5) {
      rouletteBetThirds = "1-12";
      rouletteBetType = 5;
      bettingScreen();
    } else if (getFirst(cursor).y === 6) {
      rouletteBetThirds = "13-24";
      rouletteBetType = 5;
      bettingScreen();
    } else if (getFirst(cursor).y === 7) {
      rouletteBetThirds = "25-36";
      rouletteBetType = 5;
      bettingScreen();
    };
  };
};

//adds bet money based on chip clicked/cursor position
function rouletteSelectBets() {
  if (getFirst(cursor).y === 1 && getFirst(cursor).x === 4) {
    rouletteConfirmBet();
  } else if (getFirst(cursor).x === 0) {
    betAddition = 1;
    rouletteCheckBetMoney();
  } else if (getFirst(cursor).x === 1) {
    betAddition = 5;
    rouletteCheckBetMoney();
  } else if (getFirst(cursor).x === 2) {
    betAddition = 25;
    rouletteCheckBetMoney();
  } else if (getFirst(cursor).x === 3) {
    betAddition = 100;
    rouletteCheckBetMoney();
  } else if (getFirst(cursor).x === 4) {
    betAddition = 500;
    rouletteCheckBetMoney();
  };
};

//copies bet amount from previous round
function rouletteRedoBet() {
  betAddition = previousBetAmount;
  if (money >= betAddition) {
    money -= betAddition;
    betAmount += betAddition;
    bettingScreen();
  } else {
    addText("Not Enough", { x: 3, y: 6, color: color`3` });
    setTimeout(() => {
      bettingScreen();
    }, 500);
  };
};

//validates money amount to allow bet amount
function rouletteCheckBetMoney() {
  if (getFirst(cursor).y === 2) {
    if (money >= betAddition) {
      money -= betAddition;
      betAmount += betAddition;
      bettingScreen();
    } else {
      addText("Not Enough", { x: 3, y: 6, color: color`3` });
      setTimeout(() => {
        bettingScreen();
      }, 500);
    }
  } else if (getFirst(cursor).y === 3) {
    if (betAmount >= betAddition) {
      money += betAddition;
      betAmount -= betAddition;
      bettingScreen();
    } else {
      addText("Not Enough", { x: 3, y: 6, color: color`3` });
      setTimeout(() => {
        bettingScreen();
      }, 500);
    };
  };
};

//goes to roulette spinning screen
function rouletteConfirmBet() {
  clearText();
  level = 6;
  setMap(levels[level]);
  rouletteSpinAnimation();
};

//swaps out wheel sprites for inverted version quickly to make it look like it's spinning
function rouletteSpinAnimation() {
  rouletteReadyToReset = false;
  rouletteResetVariables();
  let frame = 0;
  let animationInterval = setInterval(function() {
    if (frame / 2 === Math.floor(frame / 2)) {
      rouletteWheelTLSprite = bitmap`
................
............6666
.........6666333
........66000033
......6663000033
.....66333000033
....663333300003
....600333300003
...6600033330666
..66000003366699
..63000000669993
..63300006699333
.663333006993336
.633333366933336
.633333369933336
.600333369336666`
      rouletteWheelTRSprite = bitmap`
................
6666............
3336666.........
33000066........
3300003666......
33000033366.....
300003333366....
300003333006....
6660333300066...
99666330000066..
39996600000036..
33399660000336..
633399600333366.
633339663333336.
633339963333336.
666633963333006.`
      rouletteWheelBLSprite = bitmap`
.600000069336666
.600000069933336
.600000066933336
.660003336993336
..60333336699333
..63333333669993
..66333300066699
...6633000003666
....630000033330
....660000333300
.....66000333300
......6663333300
........66333000
.........6666000
............6666
................`
      rouletteWheelBRSprite = bitmap`
666633960000006.
633339960000006.
633339660000006.
633399633300066.
33399663333306..
39996633333336..
99666000333366..
6663000003366...
033330000036....
003333000066....
00333300066.....
0033333666......
00033366........
0006666.........
6666............
................`
    } else {
      rouletteWheelTLSprite = bitmap`
................
............6666
.........6666000
........66333300
......6660333300
.....66000333300
....660000033330
....633000033330
...6633300003666
..66333330066699
..60333333669993
..60033336699333
.660000336993333
.600000066933663
.600000069933666
.633000069333366`
      rouletteWheelTRSprite = bitmap`
................
6666............
0006666.........
00333366........
0033330666......
00333300066.....
033330000066....
033330000336....
6663000033366...
99666003333366..
39996633333306..
33399663333006..
333399633000066.
366339660000006.
666339960000006.
663333960000336.`
      rouletteWheelBLSprite = bitmap`
.633333369333366
.633333369933666
.633333366933663
.663330006993333
..63000006699333
..60000000669993
..66000033366699
...6600333330666
....603333300003
....663333000033
.....66333000033
......6660000033
........66000333
.........6666333
............6666
................`
      rouletteWheelBRSprite = bitmap`
663333963333336.
666339963333336.
366339663333336.
333399600033366.
33399660000036..
39996600000006..
99666333000066..
6660333330066...
300003333306....
330000333366....
33000033366.....
3300000666......
33300066........
3336666.........
6666............
................`
    };
    resetLegend();
    clearTile(1, 1);
    clearTile(2, 1);
    clearTile(1, 2);
    clearTile(2, 2);
    addSprite(1, 1, rouletteWheelTL);
    addSprite(2, 1, rouletteWheelTR);
    addSprite(1, 2, rouletteWheelBL);
    addSprite(2, 2, rouletteWheelBR);

    if (frame < 10) {
      frame += 1;
    } else {
      clearInterval(animationInterval);
      rouletteSpinResult();
    };
  }, 100);
};

//after spin animation the result's color, value, etc. is set and checked against the bet to decide win or loss
function rouletteSpinResult() {
  let rollAnswer = Math.floor(Math.random() * 38) + 1;
  if (rollAnswer < 37) {
    rouletteRoll = rollAnswer.toString();
    //the colors aren't consistent on the wheel so set manually
    let redValues = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    if (redValues.includes(rollAnswer)) {
      rouletteColor = "red";
    } else {
      rouletteColor = "black";
    };
    if (rollAnswer / 2 === Math.floor(rollAnswer / 2)) {
      rouletteEvenOrOdd = "even";
    } else {
      rouletteEvenOrOdd = "odd";
    };
    if (rollAnswer < 19) {
      rouletteHighOrLow = "1-18";
    } else {
      rouletteHighOrLow = "19-36";
    };
    if (rollAnswer < 13) {
      rouletteThirds = "1-12";
    } else if (rollAnswer > 24) {
      rouletteThirds = "25-36";
    } else {
      rouletteThirds = "13-24";
    };
  } else {
    if (rollAnswer === 37) {
      rouletteRoll = "0";
    } else if (rollAnswer === 38) {
      rouletteRoll = "00";
    };
    rouletteColor = "green";
  };
  setTimeout(() => {
    if (rouletteColor === "black") {
      addText(rouletteRoll, { x: 13, y: 8, color: color`0` });
    } else if (rouletteColor === "red") {
      addText(rouletteRoll, { x: 13, y: 8, color: color`3` });
    } else if (rouletteColor === "green") {
      addText(rouletteRoll, { x: 13, y: 8, color: color`4` });
    };
  }, 300);
  setTimeout(() => {
    if (betAmount != 0) {
      if (rouletteBetType === 1) {
        if (rouletteBetRoll === rouletteRoll) {
          addText("Win! +" + (betAmount * 35).toString(), { x: 8, y: 13, color: color`4` });
          money += betAmount * 36;
        } else {
          addText("Lose! -" + (betAmount).toString(), { x: 8, y: 13, color: color`3` });
        };
      } else if (rouletteBetType === 2) {
        if (rouletteBetColor === rouletteColor) {
          addText("Win! +" + (betAmount).toString(), { x: 8, y: 13, color: color`4` });
          money += betAmount * 2;
        } else {
          addText("Lose! -" + (betAmount).toString(), { x: 8, y: 13, color: color`3` });
        };
      } else if (rouletteBetType === 3) {
        if (rouletteBetEvenOrOdd === rouletteEvenOrOdd) {
          addText("Win! +" + (betAmount).toString(), { x: 8, y: 13, color: color`4` });
          money += betAmount * 2;
        } else {
          addText("Lose! -" + (betAmount).toString(), { x: 8, y: 13, color: color`3` });
        };
      } else if (rouletteBetType === 4) {
        if (rouletteBetHighOrLow === rouletteHighOrLow) {
          addText("Win! +" + (betAmount).toString(), { x: 8, y: 13, color: color`4` });
          money += betAmount * 2;
        } else {
          addText("Lose! -" + (betAmount).toString(), { x: 8, y: 13, color: color`3` });
        };
      } else if (rouletteBetType === 5) {
        if (rouletteBetThirds === rouletteThirds) {
          addText("Win! +" + (betAmount * 2).toString(), { x: 8, y: 13, color: color`4` });
          money += betAmount * 3;
        } else {
          addText("Lose! -" + (betAmount).toString(), { x: 8, y: 13, color: color`3` });
        };
      };
    };
    rouletteReadyToReset = true;
  }, 500);
};

//empties necessary varaibles
function rouletteResetVariables() {
  rouletteRoll = "";
  rouletteEvenOrOdd = "";
  rouletteColor = "";
  rouletteHighOrLow = "";
  rouletteThirds = "";
};

//in a list for easy randomization
const slotsIcons = [slotsCherry, slotsLemon, slotsGrapes, slotsWatermelon, slotsBell, slotsDiamond, slotsStar, slotsCoin, slots7, slotsWild];

function slotsText() {
  clearText();
  addText("MONEY:\n" + money.toString(), { x: 1, y: 10, color: color`2` });
  addText("BETTING:\n" + betAmount.toString(), { x: 9, y: 10, color: color`2` });
  addText("  ^ \nSPIN", { x: 16, y: 14, color: color`7` });
};

//executes different things based on button clicked/cursor position
function slotsMenu() {
  if (getFirst(cursor).x === 0) {
    home();
  } else if (getFirst(cursor).x === 1) {
    slotsHelp();
  } else if (getFirst(cursor).x === 3) {
    betAddition = 1;
    slotsBet();
  } else if (getFirst(cursor).x === 4) {
    betAddition = 2;
    slotsBet();
  } else if (getFirst(cursor).x === 5) {
    betAddition = 3;
    slotsBet();
  } else if (getFirst(cursor).x === 9) {
    slotsSpinAnimation();
  };
};

//applies bet if money permits
function slotsBet() {
  if (money >= betAddition) {
    betAmount = betAddition;
    slotsText();
  } else {
    addText("Not Enough", { x: 4, y: 7, color: color`3` });
    setTimeout(() => {
      slotsText();
    }, 500);
  };
};

//brings up screen explaining payout values
function slotsHelp() {
  level = 7;
  setMap(levels[level]);
  addSprite(0, 7, cursor);
  clearText();
  addText("3x2x1x", { x: 8, y: 1, color: color`2` });
  addText("8 1 0\n\n208 0\n\n40203\n\n99506", { x: 8, y: 3, color: color`2` });
  addText("mult\niply\n\nwith\n\n bet", { x: 16, y: 2, color: color`2` });
  addText("complete a trio\nbut -25% win", { x: 4, y: 12, color: color`2` });
};

//randomly picks a slot sprite, 15% chance for each of 4 fruits, 8% for each of 3 mid items, 10% for wild, 4% for coin, 2% for 7
function slotsRandomizer() {
  let slotsRandomNumber = Math.floor(Math.random() * 100) + 1;
  if (slotsRandomNumber < 61) {
    if (slotsRandomNumber < 16) {
      return (slotsIcons[0]);
    } else if (slotsRandomNumber < 31) {
      return (slotsIcons[1]);
    } else if (slotsRandomNumber < 46) {
      return (slotsIcons[2]);
    } else {
      return (slotsIcons[3]);
    };
  } else if (slotsRandomNumber < 85) {
    if (slotsRandomNumber < 69) {
      return (slotsIcons[4]);
    } else if (slotsRandomNumber < 77) {
      return (slotsIcons[5]);
    } else {
      return (slotsIcons[6]);
    };
  } else if (slotsRandomNumber < 95) {
    return (slotsIcons[9]);
  } else if (slotsRandomNumber < 99) {
    return (slotsIcons[7]);
  } else {
    return (slotsIcons[8]);
  };
};

//repeatedly sets and places random sprites for the three slots
function slotsSpinAnimation() {
  money -= betAmount;
  slotsText();
  slotsReadyToReset = false;
  let frame = 0;
  let animationInterval = setInterval(function() {
    clearTile(2, 2);
    clearTile(4, 2);
    clearTile(6, 2);
    addSprite(2, 2, slotsRandomizer());
    addSprite(4, 2, slotsRandomizer());
    addSprite(6, 2, slotsRandomizer());
    if (frame < 25) {
      frame += 1;
    } else {
      clearInterval(animationInterval);
      slotsSpinResult();
    };
  }, 50);
};

//checks sprites after animation and figures out if a double or triple match occured
function slotsSpinResult() {
  setTimeout(() => {
    slotsReadyToReset = true;
    if (getTile(2, 2)[0].type === getTile(4, 2)[0].type && getTile(2, 2)[0].type === getTile(6, 2)[0].type) {
      slotsResultTriple();
    } else if (getTile(2, 2)[0].type === getTile(4, 2)[0].type) {
      slotsResultDouble(2, 4);
    } else if (getTile(2, 2)[0].type === getTile(6, 2)[0].type) {
      slotsResultDouble(2, 6);
    } else if (getTile(4, 2)[0].type === getTile(6, 2)[0].type) {
      slotsResultDouble(4, 6);
    } else {
      slotsResultSingle(0);
    };
    slotsWinnings = slotsWinnings * betAmount;
    money += slotsWinnings;
    slotsText();
    if (slotsWinnings === 0) {
      addText("LOSE", { x: 6, y: 13, color: color`3` });
    } else {
      addText("WIN +" + slotsWinnings.toString(), { x: 6, y: 13, color: color`4` });
    };
    slotsWinnings = 0;
  }, 100);
};

//if a triple match occured, the type is found
function slotsResultTriple() {
  if (getTile(2, 2)[0].type === "q" || getTile(2, 2)[0].type === "w" || getTile(2, 2)[0].type === "e" || getTile(2, 2)[0].type === "a") {
    slotsWinnings = 8;
  } else if (getTile(2, 2)[0].type === "f" || getTile(2, 2)[0].type === "Q" || getTile(2, 2)[0].type === "W") {
    slotsWinnings = 20;
  } else if (getTile(2, 2)[0].type === "A") {
    slotsWinnings = 40;
  } else if (getTile(2, 2)[0].type === "E") {
    slotsWinnings = 99;
  } else if (getTile(2, 2)[0].type === "F") {
    slotsWinnings = 0;
  };
};

//if a double match occured, the type is found and if a wild completes the double for a triple, the winnings are altered
function slotsResultDouble(matchingTile1, matchingTile2) {
  let slotsOpenPosition;
  if (matchingTile1 + matchingTile2 === 6) {
    slotsOpenPosition = 6;
  } else if (matchingTile1 + matchingTile2 === 8) {
    slotsOpenPosition = 4;
  } else if (matchingTile1 + matchingTile2 === 10) {
    slotsOpenPosition = 2;
  };
  if (getTile(matchingTile1, 2)[0].type === "q" || getTile(matchingTile1, 2)[0].type === "w" || getTile(matchingTile1, 2)[0].type === "e" || getTile(matchingTile1, 2)[0].type === "a") {
    if (getTile(slotsOpenPosition, 2)[0].type === "F") {
      slotsWinnings = 6;
    } else {
      slotsWinnings = 1;
      slotsResultSingle(slotsOpenPosition);
    };
  } else if (getTile(matchingTile1, 2)[0].type === "f" || getTile(matchingTile1, 2)[0].type === "Q" || getTile(matchingTile1, 2)[0].type === "W") {
    if (getTile(slotsOpenPosition, 2)[0].type === "F") {
      slotsWinnings = 15;
    } else {
      slotsWinnings = 8;
      slotsResultSingle(slotsOpenPosition);
    };
  } else if (getTile(matchingTile1, 2)[0].type === "A") {
    if (getTile(slotsOpenPosition, 2)[0].type === "F") {
      slotsWinnings = 30;
    } else {
      slotsWinnings = 20;
      slotsResultSingle(slotsOpenPosition);
    };
  } else if (getTile(matchingTile1, 2)[0].type === "E") {
    if (getTile(slotsOpenPosition, 2)[0].type === "F") {
      slotsWinnings = 75;
    } else {
      slotsWinnings = 50;
      slotsResultSingle(slotsOpenPosition);
    };
  } else if (getTile(matchingTile1, 2)[0].type === "F") {
    slotsWinnings = 0;
    slotsResultSingle(slotsOpenPosition);
  };
};

//runs a checker for single value of each slot
function slotsResultSingle(tilestoCheck) {
  if (tilestoCheck === 0) {
    for (let i = 2; i < 8; i += 2) {
      slotsResultSingleChecker(i);
    };
  } else {
    slotsResultSingleChecker(tilestoCheck);
  };
};

//finds value for sprites that give value for a single occurence
function slotsResultSingleChecker(tile) {
  if (getTile(tile, 2)[0].type === "A") {
    slotsWinnings += 3;
  } else if (getTile(tile, 2)[0].type === "E") {
    slotsWinnings += 6;
  } else {
    slotsWinnings += 0;
  };
};

//takes 100 money to play bingo
function bingoPay() {
  if (money >= 100) {
    money -= 100;
    bingoCostPayed = true;
    getTile(0, 1)[getTile(0, 1).length - 1].remove();
    getTile(1, 1)[getTile(1, 1).length - 1].remove();
    getFirst(cursor).x = 0;
    getFirst(cursor).y = 3;
    bingoText();
  } else {
    addText("Not Enough", { x: 3, y: 6, color: color`3` });
    setTimeout(() => {
      bingo();
    }, 500);
  };
};

function bingoText() {
  clearText();
  addText("L for next ball", { x: 3, y: 0, color: color`0` });
  addText("B", { x: 1, y: 5, color: color`3` });
  addText("I", { x: 5, y: 5, color: color`9` });
  addText("N", { x: 9, y: 5, color: color`4` });
  addText("G", { x: 13, y: 5, color: color`7` });
  addText("O", { x: 17, y: 5, color: color`H` });
  addText("FREE", { x: 8, y: 11, color: color`4` });
  bingoNumbers();
};

//generates the numbers for the tiles, confining columns to sets of 15
function bingoNumbers() {
  if (bingoColumns[0].length === 0) {
    for (let c = 0; c < 5; c++) {
      for (let n = 0; n < 5; n++) {
        let bingoRandomNumber;
        let bingoNumberLow = 15 * c + 1;
        do {
          bingoRandomNumber = Math.floor(Math.random() * 15) + bingoNumberLow;
        } while (bingoColumns[c].includes(bingoRandomNumber));
        if (c != 2 || n != 2) {
          addText(bingoRandomNumber.toString(), { x: (4 * c + 1), y: (2 * n + 7), color: color`0` });
          bingoColumns[c].push(bingoRandomNumber);
        } else {
          bingoColumns[c].push(0);
        };
      };
    };
    //doesn't generate numbers if numbers are already placed and text is just being updated
  } else {
    for (let c = 0; c < 5; c++) {
      for (let n = 0; n < 5; n++) {
        if (c != 2 || n != 2) {
          addText(bingoColumns[c][n].toString(), { x: (4 * c + 1), y: (2 * n + 7), color: color`0` });
        };
      };
    };
  };
};

//generates a random ball with letter, adds it to a list of rolled balls, and adds sprite up top, moving over previous balls
function bingoRollBall() {
  if (bingoRolledBalls.length != 75) {
    clearTile(8, 1);
    clearTile(9, 1);
    for (let i = 7; i > 0; i--) {
      if (getTile(i, 1).length > 0) {
        getTile(i, 1)[0].x += 2;
      };
    };
    addSprite(1, 1, bingoBallL);
    addSprite(2, 1, bingoBallR);
    let ballRoll;
    do {
      ballRoll = Math.floor(Math.random() * 75) + 1;
    } while (bingoRolledBalls.includes(ballRoll));
    bingoRolledBalls.unshift(ballRoll);
    bingoShownBalls.unshift(ballRoll);
    if (bingoShownBalls.length > 5) {
      bingoShownBalls.pop();
    };
    bingoText();
    for (let i = 0; i < bingoShownBalls.length; i++) {
      if (i === 4) {
        addText(bingoShownBalls[i].toString()[0], { x: (4 * i + 3), y: 3, color: color`0` });
      } else {
        addText(bingoShownBalls[i].toString(), { x: (4 * i + 3), y: 3, color: color`0` });
      };
      if (bingoShownBalls[i] < 16) {
        addText("B", { x: (4 * i + 3), y: 2, color: color`3` });
      } else if (bingoShownBalls[i] < 31) {
        addText("I", { x: (4 * i + 3), y: 2, color: color`9` });
      } else if (bingoShownBalls[i] < 46) {
        addText("N", { x: (4 * i + 3), y: 2, color: color`4` });
      } else if (bingoShownBalls[i] < 61) {
        addText("G", { x: (4 * i + 3), y: 2, color: color`7` });
      } else {
        addText("O", { x: (4 * i + 3), y: 2, color: color`H` });
      };
    };
  };
};

//checks if the square being selected is a number that has been rolled
function bingoCheckMatching() {
  let column;
  let row;
  if (getFirst(cursor).x > 1) {
    column = Math.ceil((getFirst(cursor).x - 1) / 2);
  } else {
    column = 0;
  };
  row = getFirst(cursor).y - 3;
  if (bingoRolledBalls.includes(bingoColumns[column][row])) {
    if (getFirst(cursor).x / 2 === Math.floor(getFirst(cursor).x / 2)) {
      addSprite(getFirst(cursor).x, getFirst(cursor).y, bingoXL);
      addSprite(getFirst(cursor).x + 1, getFirst(cursor).y, bingoXR);
    } else {
      addSprite(getFirst(cursor).x, getFirst(cursor).y, bingoXR);
      addSprite(getFirst(cursor).x - 1, getFirst(cursor).y, bingoXL);
    };
    bingoCheckBingo();
  };
};

//checks all rows, columns, and diagonals for a line of five Xs
function bingoCheckBingo() {
  for (let c = 0; c < 10; c += 2) {
    let verticalLineXs = 0;
    for (let r = 3; r < 8; r++) {
      if (getTile(c, r)[getTile(c, r).length - 1].type === "9" || (c === 4 && r === 5)) {
        verticalLineXs += 1;
      };
      if (verticalLineXs === 5) {
        bingoColumn = c;
        bingoFinish();
      };
    };
  };
  for (let r = 3; r < 8; r++) {
    let horizontalLineXs = 0;
    for (let c = 0; c < 10; c += 2) {
      if (getTile(c, r)[getTile(c, r).length - 1].type === "9" || (c === 4 && r === 5)) {
        horizontalLineXs += 1;
      };
      if (horizontalLineXs === 5) {
        bingoRow = r;
        bingoFinish();
      };
    };
  };
  let diagonalLineXs = 0
  for (let i = 0; i < 5; i++) {
    if (getTile(2 * i, i + 3)[getTile(2 * i, i + 3).length - 1].type === "9" || i === 2) {
      diagonalLineXs += 1;
    };
    if (diagonalLineXs === 5) {
      bingoDiagonal = 0;
      bingoFinish();
    };
  };
  diagonalLineXs = 0;
  for (let i = 0; i < 5; i++) {
    if (getTile(8 - 2 * i, i + 3)[getTile(8 - 2 * i, i + 3).length - 1].type === "9" || i === 2) {
      diagonalLineXs += 1;
    };
    if (diagonalLineXs === 5) {
      bingoDiagonal = 1;
      bingoFinish();
    };
  };
};

//colors bingo line with red Xs and displays finish text
function bingoFinish() {
  bingoComplete = true;
  if (bingoColumn != 10) {
    for (let r = 3; r < 8; r++) {
      getTile(bingoColumn, r)[getTile(bingoColumn, r).length - 1].remove();
      getTile(bingoColumn + 1, r)[getTile(bingoColumn + 1, r).length - 1].remove();
      addSprite(bingoColumn, r, bingoXL2);
      addSprite(bingoColumn + 1, r, bingoXR2);
    };
    bingoColumn = 10;
  } else if (bingoRow != 8) {
    for (let c = 0; c < 10; c += 2) {
      getTile(c, bingoRow)[getTile(c, bingoRow).length - 1].remove();
      getTile(c + 1, bingoRow)[getTile(c + 1, bingoRow).length - 1].remove();
      addSprite(c, bingoRow, bingoXL2);
      addSprite(c + 1, bingoRow, bingoXR2);
    };
    bingoRow = 8;
  } else if (bingoDiagonal != 2) {
    if (bingoDiagonal === 0) {
      for (let i = 0; i < 5; i++) {
        getTile(2 * i, i + 3)[getTile(2 * i, i + 3).length - 1].remove();
        getTile(2 * i + 1, i + 3)[getTile(2 * i + 1, i + 3).length - 1].remove();
        addSprite(2 * i, i + 3, bingoXL2);
        addSprite(2 * i + 1, i + 3, bingoXR2);
      };
    } else if (bingoDiagonal === 1) {
      for (let i = 0; i < 5; i++) {
        getTile(8 - 2 * i, i + 3)[getTile(8 - 2 * i, i + 3).length - 1].remove();
        getTile(9 - 2 * i, i + 3)[getTile(9 - 2 * i, i + 3).length - 1].remove();
        addSprite(8 - 2 * i, i + 3, bingoXL2);
        addSprite(9 - 2 * i, i + 3, bingoXR2);
      };
    };
    bingoDiagonal = 2;
  }
  for (let i = 1; i < 10; i++) {
    clearTile(i, 1);
  };
  bingoText();
  addText("B", { x: 4, y: 2, color: color`3` });
  addText("I", { x: 5, y: 2, color: color`9` });
  addText("N", { x: 6, y: 2, color: color`4` });
  addText("G", { x: 7, y: 2, color: color`7` });
  addText("O", { x: 8, y: 2, color: color`H` });
  addText("!!!", { x: 9, y: 2, color: color`0` });
  bingoPayout();
};

//pays out based on a function of how many balls rolled, paying back the 100 fee for 41 balls, giving more for less balls and less for more balls
function bingoPayout() {
  money += Math.round((0.94509) ** (bingoRolledBalls.length - 123.48498) - 5.4588);
  addText(bingoRolledBalls.length.toString() + " Balls, Win +" + Math.round((0.94509) ** (bingoRolledBalls.length - 123.48498) - 5.4588).toString(), { x: 1, y: 4, color: color`0` });
};

//resets necessary variables
function bingoResetVariables() {
  bingoComplete = false;
  bingoNumbersB.length = 0;
  bingoNumbersI.length = 0;
  bingoNumbersN.length = 0;
  bingoNumbersG.length = 0;
  bingoNumbersO.length = 0;
  bingoRolledBalls.length = 0;
  bingoShownBalls.length = 0;
  bingoCostPayed = false;
};

//inputs are set to check what screen they are on to execute the appropriate action

//moves cursor up everywhere needed except for increasing bet on blackjack
onInput("w", () => {
  if (level === 1 && blackjackCardsDealt === false) {
    blackjackBet(0);
  } else if (level === 2) {
    getFirst(cursor).y -= 1;
  } else if (level === 4 && bingoComplete === false) {
    if (bingoCostPayed === false && getFirst(cursor).y === 1) {
      getFirst(cursor).y -= 1;
      getFirst(cursor).x = 0;
    } else if (getFirst(cursor).y > 3) {
      getFirst(cursor).y -= 1;
    } else {
      getFirst(cursor).x = 0;
      getFirst(cursor).y = 0;
    };
  } else if (level === 5 && (getFirst(cursor).y > 2 || (getFirst(cursor).x === 4 && getFirst(cursor).y === 2))) {
    getFirst(cursor).y -= 1;
  };
});

//moves cursor left everywhere needed except for betting all-in on blackjack
onInput("a", () => {
  if (level === 0) {
    if (getFirst(cursor).x > 0) {
      if (getFirst(cursor).x === 3) {
        getFirst(cursor).x -= 2;
      } else if (getFirst(cursor).y === 2) {
        getFirst(cursor).y += 1;
        getFirst(cursor).x -= 1;
      } else if (getFirst(cursor).y === 3) {
        getFirst(cursor).y -= 1;
        getFirst(cursor).x -= 1;
      };
    };
  } else if (level === 1 && blackjackCardsDealt === false) {
    betAmount += money - betAmount;
    blackjackText();
  } else if (level === 2) {
    getFirst(cursor).x -= 1;
  } else if (level === 3 && slotsReadyToReset === true) {
    if (getFirst(cursor).x === 1 || getFirst(cursor).x === 4 || getFirst(cursor).x === 5) {
      getFirst(cursor).x -= 1;
    } else if (getFirst(cursor).x === 3) {
      getFirst(cursor).x -= 2;
    } else if (getFirst(cursor).x === 9) {
      getFirst(cursor).x -= 4;
      getFirst(cursor).y = 7;
    };
  } else if (level === 4 && bingoComplete === false) {
    if (bingoCostPayed === false && getFirst(cursor).x === 1) {
      getFirst(cursor).x -= 1;
    } else if (getFirst(cursor).y > 2) {
      getFirst(cursor).x -= 1;
    };
  } else if (level === 5 && getFirst(cursor).y > 1) {
    getFirst(cursor).x -= 1;
  };
});

//moves cursor down everywhere needed except for decreasing bet on blackjack
onInput("s", () => {
  if (level === 1 && blackjackCardsDealt === false) {
    blackjackBet(1);
  } else if (level === 2) {
    getFirst(cursor).y += 1;
  } else if (level === 4 && bingoComplete === false) {
    if (bingoCostPayed === false && getFirst(cursor).y === 0) {
      getFirst(cursor).y += 1;
    } else if (getFirst(cursor).y === 0) {
      getFirst(cursor).y += 3;
    } else if (getFirst(cursor).y > 2) {
      getFirst(cursor).y += 1;
    };
  } else if (level === 5) {
    getFirst(cursor).y += 1;
  };
});

//only moves cursor right
onInput("d", () => {
  if (level === 0) {
    if (getFirst(cursor).x < 4) {
      if (getFirst(cursor).x === 1) {
        getFirst(cursor).x += 2
      } else if (getFirst(cursor).y === 2) {
        getFirst(cursor).y += 1
        getFirst(cursor).x += 1
      } else if (getFirst(cursor).y === 3) {
        getFirst(cursor).y -= 1
        getFirst(cursor).x += 1
      }
    }
  } else if (level === 2) {
    getFirst(cursor).x += 1
  } else if (level === 3 && slotsReadyToReset === true) {
    if (getFirst(cursor).x === 0 || getFirst(cursor).x === 3 || getFirst(cursor).x === 4) {
      getFirst(cursor).x += 1
    } else if (getFirst(cursor).x === 1) {
      getFirst(cursor).x += 2
    } else if (getFirst(cursor).x === 5) {
      getFirst(cursor).x += 4
      getFirst(cursor).y = 6
    }
  } else if (level === 4 && getFirst(cursor).y != 0 && bingoComplete === false) {
    if (bingoCostPayed === false && getFirst(cursor).x === 0) {
      getFirst(cursor).x += 1
    } else if (getFirst(cursor).y > 2) {
      getFirst(cursor).x += 1
    }
  } else if (level === 5) {
    getFirst(cursor).x += 1
  }
})

//only repeats previous bets for roulette and blackjack
onInput("i", () => {
  if (level === 1 && blackjackCardsDealt === false) {
    blackjackRedoBet();
  } else if (level === 5) {
    rouletteRedoBet();
  };
});

//mostly used to select but also hitting on blackjack and resetting like after roulette spin, blackjack hand, or bingo board
onInput("j", () => {
  if (level === 0) {
    if (getFirst(cursor).x < 2) {
      level = 1 + getFirst(cursor).x;
      games[getFirst(cursor).x]();
    } else {
      level = getFirst(cursor).x;
      games[getFirst(cursor).x - 1]();
    };
  } else if (level === 1) {
    if (blackjackReadyToReset === false) {
      blackjackHit();
    } else if (blackjackReadyToReset === true) {
      blackjackReset();
    };
  } else if (level === 2) {
    rouletteOption();
  } else if (level === 3 && slotsReadyToReset === true) {
    slotsMenu();
  } else if (level === 4) {
    if (bingoComplete === true) {
      bingo();
    } else if (getFirst(cursor).y === 0) {
      home();
    } else if (getFirst(cursor).y === 1) {
      bingoPay();
    } else {
      bingoCheckMatching();
    };
  } else if (level === 5) {
    rouletteSelectBets();
  } else if (level === 6 && rouletteReadyToReset === true) {
    previousBetAmount = betAmount;
    betAmount = 0;
    level = 2;
    roulette();
  } else if (level === 7) {
    level = 3;
    slots();
  };
});

//home on blackjack and return to roulette option board from betting
onInput("k", () => {
  if (level === 1) {
    blackjackReset();
    home();
  } else if (level === 5) {
    money += betAmount;
    betAmount = 0;
    level = 2;
    roulette();
  };
});

//confirm shortcut for roulette betting, slots spin, and used to roll next bingo ball
onInput("l", () => {
  if (level === 1 && blackjackReadyToReset === false && blackjackPlayerCards !== 0) {
    blackjackStand();
  } else if (level === 3 && slotsReadyToReset === true) {
    slotsSpinAnimation();
  } else if (level === 4 && bingoComplete === false && bingoCostPayed === true) {
    bingoRollBall();
  } else if (level === 5) {
    rouletteConfirmBet();
  };
});