/*
A procedurally generated maze dungeon!
Climb the layers of the dungeon before the time runs out, collecting coins and avoiding traps to escape! But will escape ever come?

Idea from https://arcade.makecode.com/71680-30649-43580-11759

ALL GRAPHICS RIPPED FROM https://arcade.makecode.com/
Otherwise, made entirely by Tsunami014 with no AI :)

@title: Dungen
@author: Tsunami014
@tags: []
*/

const player = "p"
const player2 = "P"  // Death animation frame 2

const gap = "#"

const brick = "$"
const unsafebrick = "!"
const brickD = "{"
const brickCr = "%"
const block = "^"
const crate = "["

const coin = "c"

const doorT = "u"
const doorD = "d"
const doorL = "l"
const doorR = "r"
const stairs = "/"

const ff = "f"
const ff2 = "F"
const spikes1 = "_"
const spikes2 = "-"
const spikes3 = "+"

const carpet = "="
const carpetT  = "─"
const carpetB  = "┄"
const carpetL  = "│"
const carpetR  = "┆"
const carpetTL = "┌"
const carpetTR = "┐"
const carpetBL = "└"
const carpetBR = "┘"

const wallT  = "1"
const wallB  = "2"
const wallL  = "3"
const wallR  = "4"
const twallT  = "5"
const twallB  = "6"
const twallL  = "7"
const twallR  = "8"
const wallTL = "╔"
const wallTR = "╗"
const wallBL = "╚"
const wallBR = "╝"
const wallTLC = "▘"
const wallTRC = "▝"
const wallBLC = "▖"
const wallBRC = "▗"

setLegend(
  // Player
  [ player, bitmap`
....CCC....CCC..
....L22L..L22L..
....L12200221L..
....L81212218L..
....0182222810..
....C22222222C..
101.C20222202C..
020.0220220220..
020.0322112210..
0200113333330...
0121122222210...
.000221222220...
...0200200020...
...00..00..00...
................
................` ],
  [ player2, bitmap`
................
................
...000.0000.....
...0F000FF0.....
...0FFFFFF0.....
...0FF111F0.....
...0F1111F0.....
...0F1111F0.....
...0F1111F000...
...0FF111F0F0...
...00F111FFF0...
....0FFFFF000...
....0F00F00.....
....000000......
................
................` ],
  // Gap
  [ gap, bitmap`
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
  // Carpet
  [ carpet, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLL1LLLL1L
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL1LLLL1LLLL
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLL1LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1LLLLLLLLLL1LL
LLLLLLL1LLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ carpetT, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL1LLLL1LLLL
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLL1LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1LLLLLLLLLL1LL
LLLLLLL1LLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ carpetB, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLL1LLLL1L
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL1LLLL1LLLL
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLL1LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLL1LLLLL1L
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL` ],
  [ carpetL, bitmap`
L1LLLLLLLLLLLLLL
L1LLLLLLL1LLLL1L
L1LLLLLLLLLLLLLL
L1L1LLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLL1LLLL1LLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLL1LLLLL1LLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1L1LLLLLLLLL1LL
L1LLLLL1LLLLLLLL
L1LLLLLLLLLLLLLL` ],
  [ carpetR, bitmap`
LLLLLLLLLLLLLL1L
LLLLLLLLL1LLLL1L
LL1LLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLL1LLLL1LL1L
LLLLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLL1LLLLL1LL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LL1LLLLLLLLLLL1L
LLLLLLL1LLLLLL1L
LLLLLLLLLLLLLL1L` ],
  [ carpetTL, bitmap`
LLLLLLLLLLLLLLLL
L111111111111111
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLL1LLLL1LLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLL1LLLLL1LLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1L1LLLLLLLLL1LL
L1LLLLL1LLLLLLLL
L1LLLLLLLLLLLLLL` ],
  [ carpetTR, bitmap`
LLLLLLLLLLLLLLLL
111111111111111L
LLLLLLLLLLLLLL1L
LL1LLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLL1LLLL1LL1L
LLLLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLL1LLLLL1LL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LL1LLLLLLLLLLL1L
LLLLLLL1LLLLLL1L
LLLLLLLLLLLLLL1L` ],
  [ carpetBL, bitmap`
L1LLLLLLLLLLLLLL
L1LLLLLLL1LLLL1L
L1L1LLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLL1LLLL1LLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLL1LLLLL1LLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLL1LLLLLLL
L1LLLLLLLLLLLLLL
L111111111111111
LLLLLLLLLLLLLLLL` ],
  [ carpetBR, bitmap`
LLLLLLLLLLLLLL1L
LLLLLLLLL1LLLL1L
LL1LLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLL1LLLL1LL1L
LLLLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLL1LLLLL1LL1L
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLL1L
LLLLLLLL1LLLLL1L
LLLLLLLLLLLLLL1L
111111111111111L
LLLLLLLLLLLLLLLL` ],
  // Walls
  [ wallT, bitmap`
HHHLLHHHHHHLLHHH
8888L8888888L888
888HL8888888L888
HHHHLHHHHHHHLLHH
LLLLLLLLLLLLLLLL
LH88888HLH88888H
LLHHHHHHLLHHHHHH
LLLLLLLLLLLLLLLL
HHHLHHHHHHHHLHHH
HHHLLHHHHHHHLHHH
LLLLLLLLLLLLLLLL
LHHHHHHLLHHHHHHL
LLLLLLLLLLLLLLLL
HHLLHHHHHHLLHHHH
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ wallB, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
HHHHLLHHHHHHLLHH
LLLLLLLLLLLLLLLL
LHHHHHHLLHHHHHHL
LLLLLLLLLLLLLLLL
HHHLHHHHHHHLLHHH
HHHLHHHHHHHHLHHH
LLLLLLLLLLLLLLLL
HHHHHHLLHHHHHHLL
H88888HLH88888HL
LLLLLLLLLLLLLLLL
HHLLHHHHHHHLHHHH
888L8888888LH888
888L8888888L8888
HHHLLHHHHHHLLHHH` ],
  [ wallL, bitmap`
H88HLHHLHHLLLHLL
H88HL8HLHHLHLHLL
H88LL8HLHHLHLHLL
LLLLL8HLLLLHLHLL
L88HL8HLHHLHLLLL
H88HL8HLHHLHLLLL
H88HLHLLHHLHLHLL
H88HLLLLHHLLLHLL
H88HLHHLHHLLLHLL
H88HL8HLHHLHLHLL
H88HL8HLHHLHLHLL
LLLLL8HLHLLHLHLL
L8HHL8HLLLLHLLLL
H88HL8HLHHLHLLLL
H88HLHLLHHLHLHLL
H88HLLLLHHLLLHLL` ],
  [ wallR, bitmap`
LLHLLLHHLLLLH88H
LLHLHLHHLLHLH88H
LLLLHLHHLH8LH88H
LLLLHLLLLH8LHH8L
LLHLHLLHLH8LLLLL
LLHLHLHHLH8LH88H
LLHLHLHHLH8LH88H
LLHLLLHHLHHLH88H
LLHLLLHHLLLLH88H
LLHLHLHHLLHLH88H
LLLLHLHHLH8LH88H
LLLLHLHHLH8LH88L
LLHLHLLLLH8LLLLL
LLHLHLHHLH8LL88H
LLHLHLHHLH8LH88H
LLHLLLHHLHHLH88H` ],
  [ twallT, bitmap`
HHHLLHHHHHHLLHHH
8888L8888888L888
8888H8888888H888
HH88H8888888HLHH
LHHHHH8988HHHHLL
L88888899888888H
LL8888966988888H
LLLH8H922988HHHL
HH8888L9998888HH
HHH888HCCH888HHH
LLLL8HHLLHH8HLLL
LHHHHHHHHHHHHHHL
LLLLLLLLLLLLLLLL
HHLLHHHHHHLLHHHH
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ twallB, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
HHHHLLHHHHHHLLHH
LLLLLLLLLLLLLLLL
LHHHHHHHHHHHHHHL
LLLH8HHLLHH8LLLL
HHH888HCCH888HHH
HH8888999L8888HH
LHHH889229H8HLLL
H8888896698888LL
H88888899888888L
LLHHHH8898HHHHHL
HHLH8888888H88HH
888H8888888H8888
888L8888888L8888
HHHLLHHHHHHLLHHH` ],
  [ twallL, bitmap`
H88HLHHLHHLLLHLL
H88HL88HHHLHLHLL
H88LH88H8HLHLHLL
LLHHH88H88HHLHLL
L888H888888HLLLL
H888H88888HHLLLL
H88888999HHHLHLL
H88889629CLHLHLL
H88899629CLHLHLL
H8888899LHHHLHLL
H888H88H88HHLHLL
LLHHH888888HLHLL
L888H88H88LHLLLL
H888H88L8HLHLLLL
H88HH8LLHHLHLHLL
H88HLLLLHHLLLHLL` ],
  [ twallR, bitmap`
LLHLLLHHLLLLH88H
LLHLHLHHLL8HH88H
LLLLHLH8L88H888H
LLLLHL88H88H888L
LLHLH888888HHHLL
LLHLHH88H88H888H
LLHLHHHL9988888H
LLHLHLC92699888H
LLHLHLC92698888H
LLHLHHH99988888H
LLLLHH88888H888H
LLLLH888888H888L
LLHLHH88H88HHHLL
LLHLHLH8H88HL88H
LLHLHLHHH88LH88H
LLHLLLHHLHHLH88H` ],
  [ wallTL, bitmap`
0LHHHHHHHLLLLHHH
L0L88888888LL888
HLLL88888888LL88
H8LLLHHHHHHHHLHH
H88LLLLLLLLLLLLL
H88HLLLH888888HL
H88HLLLLHHHHHHHH
H88HL8LLLLLLLLLL
H88HL8HLLLHHHHHH
L88HL8HLLLLHHHHH
LLLHL8HLHLLLLLLL
H8LLL8HLHHLLLHHH
H88HL8HLHHLLLLLL
H88HL8HLHHLHLLLH
H88HLHLLHHLHLH0L
H88HLLLLHHLHLHL0` ],
  [ wallTR, bitmap`
HHHHHLLHHHHHHHL0
88888L8888888L0L
8888LL888888LLLH
HHHHLHHHHHHLLL8H
LLLLLLLLLLLLL88H
LH8888888LLLH88H
LLHHHHHHLLLLH88H
LLLLLLLLLLHLH88H
HHHHHHLLLH8LH88H
HHHHHLLLLH8LH88L
LLLLLLLHLH8LH88L
HHHLLLHHLH8LH8LL
LLLLLLHHLH8LHLLL
HHLLHLHHLH8LLL8H
L0LLHLHHLHHLH88H
0LHLHLHHLHLLH88H` ],
  [ wallBL, bitmap`
H88HLLHLHHLHLHL0
H88HLHHLHHLHLL0L
H8LLL8HLHHLHLLHH
LLLHL8HLHHLLLLLL
LL8HL8HLHHLLLHHH
L88HL8HLHLLLLLLL
L88HL8HLLLLHHHHH
H88HL8HLLLHHHHHH
H88HLHLLLLLLLLLL
H88HLLLLHHHHHHLL
H88HLLL8888888HL
H88LLLLLLLLLLLLL
H8LLLHHHHHHLHHHH
HLLL888888LL8888
L0L8888888L88888
0LHHHHHHHLLHHHHH` ],
  [ wallBR, bitmap`
0LHLHLHHLLLLH88H
L0HLHLHHLLHLH88H
HLLLHLHHLH8LH88H
LLLLLLHHLH8LH88H
HHHLLLHHLH8LLL8H
LLLLLLLHLH8LHLLL
HHHHHLLLLH8LH88L
HHHHHHLLLH8LH88H
LLLLLLLLLL8LH88H
HHHHHHHHLLLLH88H
LH888888HLLLH88H
LLLLLLLLLLLLL88H
HHLHHHHHHHHLLL8H
88LL88888888LLLH
888LL88888888L0L
HHHLLLLHHHHHHHL0` ],
  [ wallTLC, bitmap`
H88HLHHLHHLLLHLL
888HL8HLHHLHLHLL
88HLL8HLHHLHLHLL
HHHLL8HLLLLHLHLL
LLLL88HLHHLHLLLL
LH8888HLHHLHLLLL
LLHHHHLLHHLHLHLL
LLLLLLL8HHLHLHLL
HHHLHHHH8HLHLHLL
HHHLLHHHHHLHLHLL
LLLLLLLLLLLHLHLL
LHHHHHHLLHHHLHLL
LLLLLLLLLLLLLLLL
HHLLHHHHHHHHLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ wallTRC, bitmap`
LLHLLLHHLLLLH88H
LLHLHLHHLLHLH888
LLLLHLHHLH8LHH88
LLLLHLLLLH8LLLHH
LLHLHLLHLH88LLLL
LLHLHLHHLH88888H
LLHLHLHHLLHHHHHH
LLHLLLHH8LLLLLLL
LLHLLLH8HHHHLHHH
LLHLHLHHHHHHLHHH
LLHLHLLLLLLLLLLL
LLHLHHHHHHHHHHHL
LLLLLLLLLLLLLLLL
LLLLHHHHHHLLHHHH
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ wallBLC, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
HHHHLLHHHHHHLLLL
LLLLLLLLLLLLLLLL
LHHHHHHHHHHHLHLL
LLLLLLLLLLLHLHLL
HHHLHHHHHHLHLHLL
HHHLHHHH8HLLLHLL
LLLLLLL8HHLLLHLL
HHHHHHLLHHLHLHLL
H88888HLHHLHLHLL
LLLL88HLHLLHLHLL
HHLLL8HLLLLHLLLL
88HHL8HLHHLHLLLL
888HLHLLHHLHLHLL
H88HLLLLHHLLLHLL` ],
  [ wallBRC, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLHHHHHHHHLLHH
LLLLLLLLLLLLLLLL
LLHLHHHLLHHHHHHL
LLHLHLLLLLLLLLLL
LLHLHLHHHHHLLHHH
LLHLHLH8HHHHLHHH
LLHLHLHH8LLLLLLL
LLHLHLHHLLHHHHLL
LLLLHLHHLH8888HL
LLLLHLHHLH88LLLL
LLHLHLLLLH8LLHHH
LLHLHLHHLH8LLH88
LLHLHLHHLH8LH888
LLHLLLHHLHHLH88H` ],
  // DecorunsafeBrick
  [ brick, bitmap`
122222222222222L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
211111111111111L
LLLLLLLLLLLLLLLH` ],
  [ unsafebrick, bitmap`
1222222L2222222L
2111111L2222222L
2111111L2222222L
2111111L2222222L
2111111L2222222L
2111111L2222222L
2111111122222222
LLLLLL1HLLLLLL2H
2222222L1222222L
2222222L2111111L
2222222L2111111L
2222222L2111111L
2222222L2111111L
2222222L2111111L
2222222221111111
LLLLLL2H1LLLLLLH` ],
  [ brickD, bitmap`
1222222LL222222L
211111L22L11111L
21111L2111L1111L
2111L211111L111L
211L21111111L11L
21L2111111111L1L
2L211111111111L1
L21111111111111L
L2111111111111L2
2L11111111111L2L
21L111111111L21L
211L1111111L211L
2111L11111L2111L
21111L111L21111L
211111L1L211111L
LLLLLL1L2LLLLLLH` ],
  [ brickCr, bitmap`
12222L222222222L
211111L11111111L
211111L11111111L
2111111L1111111L
2111111L1111111L
2111111L1111111L
21111111L111111L
211111111L11111L
211111111L11111L
21111111L2LL111L
21111111L211LL1L
2111111L211111LL
211111LL2111111L
211111L21111111L
21111LL21111111L
LLLLLLLLLLLLLLLH` ],
  [ block, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL1
L11LLLLLLLLLL111
L1111LLLLLL11111
L111111111111111
L111111221111111
L111112222111111
L111112222111111
L111122222211111
L111222222221111
L111222222221111
L112222222222111
L122222222222211
L122222222222211
L222222222222221
2222222222222222` ],
  [ crate, bitmap`
C88888888888888C
C99999999999999C
CCCCCCCCCCCCCCCC
C9C9999999999C9C
C9CCCCCCCCCCCC9C
C9C8888888888C9C
C9C9999999999C9C
C9CCCCCCCCCCCC9C
C9C8888888888C9C
C9C9999999999C9C
C88888888888888C
C99999999999999C
CCCCCCCCCCCCCCCC
CCLLLLLLLLLLLLCC
CCLLLLLLLLLLLLCC
CCCCCCCCCCCCCCCC` ],
  // Coin
  [ coin, bitmap`
1222222LL222222L
211111L22L11111L
21111L2111L1111L
2111L211111L111L
211L211FF111L11L
21L211F66F111L1L
2L211F6216F111L1
L2111F6286F1111L
L2111LF286L111L2
2L111LFF26L11L2L
21L1110FF011L21L
211L1110011L211L
2111L11111L2111L
21111L111L21111L
211111L1L211111L
LLLLLL1L2LLLLLLH` ],
  // Falling floor & spikes
  [ ff, bitmap`
1222222L1222222L
2111111L211111LL
2111111L21111L1L
2111111L2111221L
2111111L211L111L
2111111L21LL111L
2111111121LL1111
LLLLLL1HLLLLLL1H
1222222L1222222L
2111111L2111111L
2111111L2111111L
2111111L2111111L
211111LL2111111L
21111LLL2111111L
21111LL121111111
LLLLLLLHLLLLLLLH` ],
  [ ff2, bitmap`
00000000LLL2222L
000LL000L222111L
00L22L0L2111111L
0L2211LL211111LL
0L2111LL211LLLL0
0L2111L0LLLL0000
00L1111LLL2L0000
000LLLLLL211L000
00L2LL00L211LL00
00L22LL0LL211L00
0LL211L00L211LL0
0L2111L000L111L0
0L21111LL0L11LL0
0L211111LLLLLL00
00LLLL111L000000
00000LLLLL000000` ],
  [ spikes1, bitmap`
1222222L1222222L
2111111L2111111L
2111111L2111111L
2100000L2100000L
2000000020000000
2100000L2100000L
2111111121111111
LLLLLL1HLLLLLL1H
1222222L1222222L
2111111L2111111L
2111111L2111111L
2100000L2100000L
2000000020000000
2100000L2100000L
2111111121111111
LLLLLL1H1LLLLLLH` ],
  [ spikes2, bitmap`
1222222L1222222L
2111111L2111111L
2111111L2111111L
2100200L2100200L
2002220020022200
2100000L2100000L
2111111121111111
LLLLLL1HLLLLLL1H
1222222L1222222L
2111111L2111111L
2111111L2111111L
2100200L2100200L
2002220020022200
2100000L2100000L
2111111121111111
LLLLLL1H1LLLLLLH` ],
  [ spikes3, bitmap`
1222L22L1222L22L
2111L11L2111L11L
21122L1L21122L1L
21022L0L21022L0L
202222L0202222L0
2100000L2100000L
2111111121111111
LLLLLL1HLLLLLL1H
1222L22L1222L22L
2111L11L2111L11L
21122L1L21122L1L
21022L0L21022L0L
202222L0202222L0
2100000L2100000L
2111111121111111
LLLLLL1H1LLLLLLH` ],
  // (blocked) Doorways
  [ doorT, bitmap`
L11111111111111L
L11111111111111L
L22222222222222L
L22222222222222L
LLLLLLLLLLLLLLLL
L11L11111111L11L
L22L11111111L22L
L22L91166119L22L
L22L1C6116C1L22L
L22L1C9669C1L22L
L11L91690619L11L
L22L1199C911L22L
L22L11C99C11L22L
L22L111CC111L22L
L22L11111111L22L
HLLLLLLLLLLLLLLH` ],
  [ doorD, bitmap`
HLLLLLLLLLLLLLLH
L22L11111111L22L
L22L111CC111L22L
L22L11C99C11L22L
L22L119C9911L22L
L11L91609619L11L
L22L1C9669C1L22L
L22L1C6116C1L22L
L22L91166119L22L
L22L11111111L22L
L11L11111111L11L
LLLLLLLLLLLLLLLL
L22222222222222L
L22222222222222L
L11111111111111L
L11111111111111L` ],
  [ doorL, bitmap`
LLLLLLLLLLLLLLLH
1122L1222212222L
1122L1222212222L
1122LLLLLLLLLLLL
1122L1191191111L
1122L111CC11111L
1122L1116969C11L
1122L116160C9C1L
1122L11616999C1L
1122L1116969C11L
1122L111CC11111L
1122L1191191111L
1122LLLLLLLLLLLL
1122L1222212222L
1122L1222212222L
LLLLLLLLLLLLLLLH` ],
  [ doorR, bitmap`
HLLLLLLLLLLLLLLL
L2222122221L2211
L2222122221L2211
LLLLLLLLLLLL2211
L1111911911L2211
L11111CC111L2211
L11C9696111L2211
L1C99961611L2211
L1C9C061611L2211
L11C9696111L2211
L11111CC111L2211
L1111911911L2211
LLLLLLLLLLLL2211
L2222122221L2211
L2222122221L2211
HLLLLLLLLLLLLLLL` ],
  [ stairs, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLL1111L
LLLLLLLLLLL1111L
LLLLLLLLLLL1111L
LLLLLL1111L1111L
LLLLLL1111L1111L
LLLLLL1111L1111L
LLLLLL1111L1111L
L1111L1111L1111L
L1111L1111L2222L
L1111L111111111L
L1111L222211111L
L1111L111111111L
L11111111111111L
L22221111111111L
L11111111111111L` ],
)

setSolids([
  player,
  wallT, wallB, wallL, wallR, wallTL, wallTR, wallBL, wallBR, wallTLC, wallTRC, wallBLC, wallBRC,
  twallT, twallB, twallL, twallR,
  doorT, doorD, doorL, doorR,
])
const safeBlocks = [
  carpet, carpetT, carpetB, carpetL, carpetR, carpetTL, carpetTR, carpetBL, carpetBR,
  brick, brickD, brickCr
]

setPushables({
  [ player ]: []
})

// Thanks to https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript !
function sfc32(a, b, c, d) {
  return function(max) {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return Math.floor(((t >>> 0) / 4294967296) * max);
  }
}
const seedgen = () => (Math.random()*2**32)>>>0;


var timeoutIds = []
function scheduleTimeout(callback, delay) {
  const id = setTimeout(() => {
    callback();
    const index = timeoutIds.indexOf(id);
    if (index > -1) {
      timeoutIds.splice(index, 1);
    }
  }, delay);
  timeoutIds.push(id);
  return id;
}
function removeTimeouts() {
  timeoutIds.forEach(id => clearTimeout(id));
  timeoutIds = []
}

var MAZESZE
const MAXMAZESZE = 8
var level
var nxtLvlUpgrade
var mze
var pos
var lastSafeP
var start
var end
var hardness
function makeMaze() {
  // It's just easier to regenerate the array each time
  mze = Array.from({ length: MAZESZE*2 }, (_, row) =>
    Array.from({ length: MAZESZE - 1 + (row%2) }, ()=>1)
  )
  const nxt = [[...pos, 0]]
  const prevSqus = []
  const prevWalls = []
  const DIRS = [
    {dx: 1, dy: 0},
    {dx: -1, dy: 0},
    {dx: 0, dy: 1},
    {dx: 0, dy: -1}
  ]
  var mxlen = 0
  var mlnSq = pos
  while (nxt.length > 0) {
    const curP = nxt.shift()
    if (prevSqus.some(p => p[0] === curP[0] && p[1] === curP[1])) {
      continue
    }
    const nl = curP[2] + 1
    if (nl > mxlen) {
        mxlen = nl
        mlnSq = [curP[0], curP[1]]
      }
    for (const d of DIRS) {
      const nx = curP[0] + d.dx
      const ny = curP[1] + d.dy
      if (ny < 0 || ny >= MAZESZE || nx < 0 || nx >= MAZESZE) {
        continue
      }
      // The position of the *wall* in the array, not the output block; as there are 4 ways of arriving at the output block
      const npos = [nx - Math.max(0, d.dx), Math.max(ny*2+Math.abs(d.dy) - Math.max(0, d.dy)*2, 0)]
      if (prevWalls.some(p => p[0] === npos[0] && p[1] === npos[1])) {
        continue
      }
      prevWalls.push(npos)
      if (nl != 1 && Math.random() < 0.6) {  // 60% chance for a wall unless it's the starting area
        //mze[npos[1]][npos[0]] = 1  // This is now a wall!
      } else {
        mze[npos[1]][npos[0]] = 0  // This is now not a wall!
        nxt.push([nx, ny, nl])  // It is not a wall, and keep going!
      }
    }
  }
  start = [...pos]
  end = mlnSq
  hardness = mxlen
}
function getWall(x, y, dx, dy) {  // Get whether a wall exists in a maze from a position in a direction
  const nx = x + dx
  const ny = y + dy
  if (ny < 0 || ny >= MAZESZE || nx < 0 || nx >= MAZESZE) {
    return 1
  }
  return mze[Math.max(ny*2+Math.abs(dy) - Math.max(0, dy)*2, 0)][nx - Math.max(0, dx)]
}
function displayMaze() {  // For testing
  const scr = Array.from({ length: MAZESZE*2-1 }, (_, row) =>
    Array.from({ length: MAZESZE*2-1 }, (_, col)=> {
      if ((col+row)%2 == 0) {
        if (row%2 != 0) {
          return block
        }
        if (col/2 == pos[0] && row/2 == pos[1]) {
          return player
        }
        if (col/2 == end[0] && row/2 == end[1]) {
          return stairs
        }
        return brickD
      }
      const realCol = (col - (1 - row%2)) / 2
      if (mze[row][realCol]) {
        return block
      }
      return brick
    })
  )
  
  setMap(scr.map(row => row.join('')).join('\n'))
}

var timer
var flashTimer
function displayHUD() {
  clearText()
  addText("lvl "+level, {
    x: 0,
    y: 1,
    color: color`7`
  })
  var col;
  if (flashTimer) {
    col = color`2`
  } else {
    if (timer <= 20) {
      col = color`3`
    } else if (timer < 60) {
      col = color`9`
    } else if (timer < 200) {
      col = color`6`
    } else {
      col = color`4`
    }
  }
  addText(timer.toString(), {
    x: 19-timer.toString().length,
    y: 1,
    color: col
  })
}

const MAPSZE = 12
const HMAPSZE = Math.round(MAPSZE/2)-1

var seed1
var seed2

const wallFill = [null, wallT, wallB, wallL, wallR, wallTL, wallTR, wallBL, wallBR]
const carpetFill = [carpet, carpetT, carpetB, carpetL, carpetR, carpetTL, carpetTR, carpetBL, carpetBR]
function fillRect(scr, x, y, w, h, fill, t, b, l, r, tl, tr, bl, br) {
  if (fill !== null) {
    for (var y2 = y+1; y2 < y+h-1; y2++) {
      for (var x2 = x+1; x2 < x+w-1; x2++) {
        scr[y2][x2] = fill
      }
    }
  }
  for (var y2 = y+1; y2 < y+h-1; y2++) {
    scr[y2][x] = l
    scr[y2][x+w-1] = r
  }
  for (var x2 = x+1; x2 < x+w-1; x2++) {
    scr[y][x2] = t
    scr[y+h-1][x2] = b
  }
  scr[y][x] = tl
  scr[y][x+w-1] = tr
  scr[y+h-1][x] = bl
  scr[y+h-1][x+w-1] = br
}
function fillRectSimple(scr, x, y, w, h, fill) {
  for (var y2 = y; y2 < y+h; y2++) {
    for (var x2 = x; x2 < x+w; x2++) {
      scr[y2][x2] = fill
    }
  }
}

function decorateBrick(scr, getRand) {
  for (var i = 0; i < getRand(20); i++) {
    const rnd = getRand(6)
    const pos = [getRand(MAPSZE-3)+1, getRand(MAPSZE-3)+1]
    var it = brickCr
    if (rnd == 0) {
      it = crate
    } else if (rnd <= 2) {
      it = brickD
    }
    scr[pos[1]][pos[0]] = it
  }
}

const CARPET_DIRECTIONS = [
    {dir: 0, x: 0, y: HMAPSZE, w: HMAPSZE+2, h: 2},
    {dir: 1, x: HMAPSZE, y: 0, w: 2, h: HMAPSZE+2},
    {dir: 0, x: HMAPSZE, y: HMAPSZE, w: HMAPSZE+2, h: 2},
    {dir: 1, x: HMAPSZE, y: HMAPSZE, w: 2, h: HMAPSZE+2}
  ];
function genCarpet(scr, wls, getRand, fix) {
  CARPET_DIRECTIONS.forEach((d, idx) => {
    if (!wls[idx]) {
      fillRect(scr, d.x, d.y, d.w, d.h, ...carpetFill)
    }
  })
  if (fix !== false) {
    // Fix the middle of the carpet
    const fixCarpets = [carpetT, carpetR, carpetB, carpetL]
    for (let i = 0; i < 4; i++) {
      const pos = [HMAPSZE + (i > 1 ? (3-i) : i), HMAPSZE+Math.floor(i/2)]
      if (!wls[i]) {
        if (!wls[(i+1)%4]) {
          scr[pos[1]][pos[0]] = carpet
        } else if (!wls[(i+2)%4] || !wls[(i+3)%4]) {
          scr[pos[1]][pos[0]] = fixCarpets[i]
        }
      } else if (!wls[(i+1)%4]) {
        if (!wls[(i+3)%4] || !wls[(i+2)%4]) {
          scr[pos[1]][pos[0]] = fixCarpets[(i+3)%4]
        }
      }
    }
  }
}

const RoomGenerators = [
  // Carpet room, easy
  (scr, wls, getRand, fix)=>{
    decorateBrick(scr, getRand)
    genCarpet(scr, wls, getRand, fix)
  },
  // Bridge room
  (scr, wls, getRand)=>{
    fillRectSimple(scr, 1, 1, MAPSZE-2, MAPSZE-2, gap)
    const rnd = getRand(5)
    if (rnd == 0) {
      genCarpet(scr, wls, getRand)
    } else {
      var fill;
      if (rnd <= 2) {
        fill = spikes1
      } else {
        fill = ff
      }
      CARPET_DIRECTIONS.forEach((d, idx) => {
        if (!wls[idx]) {
          fillRectSimple(scr, d.x==0? (1-d.dir) : d.x, d.y==0? d.dir : d.y, 
                              d.w-(1-d.dir), d.h-d.dir, 
                         fill)
        }
      })
    }
  },
  // Bridge room but where the middle is empty and the bridge is around the edge
  (scr, wls, getRand)=>{
    fillRectSimple(scr, 1, 1, MAPSZE-2, MAPSZE-2, unsafebrick)  // So nothing bad happens
    
    var width = 1+getRand(Math.round(MAPSZE/5))
    if (width == 1 && getRand(5) <= 2) width++;
    const typ = getRand(5)
    if (typ == 4) {
      var out = getRand(2)
      var inn = out
      while (inn == out) inn = getRand(3)
      const hwid = Math.round(width/2)+getRand(2);
      [out, inn].forEach((fill, idx)=>{
        fillRectSimple(scr, 1+idx*hwid, 1+idx*hwid, 
                            MAPSZE-2-idx*2*hwid, MAPSZE-2-idx*2*hwid, 
                       [spikes1, ff, unsafebrick][fill])
      })
    } else if (width >= 2 && typ>1) {
      var th = Math.floor(getRand(5)/2)  // Make 3 half as likely
      var bh = th
      while (bh == th) bh = Math.floor(getRand(5)/2);
      [th, bh].forEach((fill, idx)=>{
        if (fill != 2) {
          fillRectSimple(scr, 1, 1+HMAPSZE*idx, MAPSZE-2, HMAPSZE, [spikes1, ff][fill])
        }
      })
    } else {
      const rnd = getRand(5)
      if (rnd != 0) {
        var fill
        if (rnd <= 2) {
          fill = spikes1
        } else {
          fill = ff
        }
        fillRectSimple(scr, 1, 1, MAPSZE-2, MAPSZE-2, fill)
      }
    }
    fillRectSimple(scr, 1+width, 1+width, MAPSZE-2-width*2, MAPSZE-2-width*2, gap)
    if (getRand(2) == 0) {
      // Delete corners that are not touching
      const dirs = [
        // L, U, R, D - but when turned into a corner it goes clockwise (TL, TR, BR, BL)
        { idx: 0, x: 0, y: 0, dx: -1, dy: 0  },
        { idx: 1, x: 1, y: 0, dx: 0,  dy: -1 },
        { idx: 2, x: 1, y: 1, dx: 1,  dy: 0  },
        { idx: 3, x: 0, y: 1, dx: 0,  dy: 1  },
      ]
      const deletedDirs = []
      const its = getRand(4)
      for (var i = 0; i < its; i++) {  // Shuffle the list keeping the order
        dirs.push(dirs.shift())
      }
      while (getWall(pos[0], pos[1], dirs[0].dx, dirs[0].dy)) {
        deletedDirs.push(dirs.shift())  // Remove first element, as it's a wall
      }
      while (getWall(pos[0], pos[1], dirs[dirs.length-1].dx, dirs[dirs.length-1].dy)) {
        deletedDirs.push(dirs.pop())  // Remove last element, as it's a wall
      }
      deletedDirs.push(dirs.pop())  // Because otherwise there's an extra
      // What remains is a list of directions connecting all the doors in the room
      // But also a list of everything that was removed
      for (const d of deletedDirs) {
        fillRectSimple(scr, 1+d.x*HMAPSZE, 1+d.y*HMAPSZE, HMAPSZE, HMAPSZE, gap)
      }
    }

    if (getRand(4) != 0) {
      // Add mini starting platforms bcos y not
      const plats = [
        { dx: -1, dy: 0,  x: 0, y: HMAPSZE },
        { dx: 0,  dy: -1, x: HMAPSZE, y: 0 },
        { dx: 1,  dy: 0,  x: MAPSZE-2, y: HMAPSZE },
        { dx: 0,  dy: 1,  x: HMAPSZE, y: MAPSZE-2 },
      ]
      const isCarpet = getRand(4) == 0
      for (const p of plats) {
        if (!getWall(pos[0], pos[1], p.dx, p.dy)) {
          if (isCarpet) {
            fillRect(scr, p.x, p.y, 2, 2, ...carpetFill)
          } else {
            fillRectSimple(scr, p.x, p.y, 2, 2, brickD)
          }
        }
      }
    }

    if (width >= 2 && getRand(2) != 0) {
      // Remove corners 4 fun
      scr[1][1] = gap
      scr[MAPSZE-2][1] = gap
      scr[1][MAPSZE-2] = gap
      scr[MAPSZE-2][MAPSZE-2] = gap
    }
  },
  // Reward room! Only for when there is only one doorway
  (scr, wls, getRand)=>{
    var totPaths = wls.reduce((tot, i)=>{return tot + (i? 0 : 1)}, 0)
    if (totPaths != 1) {
      return false
    }

    const typ = getRand(2)
    if (typ == 0) {
      // Just plain straight up in the middle of the room
      decorateBrick(scr, getRand)
      fillRectSimple(scr, HMAPSZE, HMAPSZE, 2, 2, coin)
    } else if (typ == 1) {
      // Carpet over a pit to the coins!
      fillRectSimple(scr, 1, 1, MAPSZE-2, MAPSZE-2, gap)
      genCarpet(scr, wls, getRand)
      fillRectSimple(scr, HMAPSZE, HMAPSZE, 2, 2, coin)
    }
  },
]

function makeMap(playerx, playery) {
  removeTimeouts()
  
  const getRand = sfc32(seed1, seed2, pos[0], pos[1]);  // Deterministic based on the set seeds and position
  // Make base screen: having a border around the edge
  const scr = Array.from({ length: MAPSZE }, (_, row) =>
    Array.from({ length: MAPSZE }, ()=>brick)
  )
  fillRect(scr, 0, 0, MAPSZE, MAPSZE, ...wallFill);

  // Arrays in order: Left, Top, Right, Down
  [
    { tile: twallT, x: 1, y: 0, dir: 0 },
    { tile: twallB, x: 1, y: MAPSZE-1, dir: 0 },
    { tile: twallL, x: 0, y: 1, dir: 1 },
    { tile: twallR, x: MAPSZE-1, y: 1, dir: 1 },
  ].forEach((edge, _)=>{
    for (var i = 0; i < getRand(2); i++) {
      const offs = getRand(MAPSZE-3)
      scr[edge.y + edge.dir*offs][edge.x + (1 - edge.dir)*offs] = edge.tile
    }
  })

  const wls = []

  const edgeTs = [
    {door: doorL, edge: wallBLC},
    {door: doorT, edge: wallTLC},
    {door: doorR, edge: wallTRC},
    {door: doorD, edge: wallBRC},
  ];
  [
    {dir: 0, flipWs: true,  dx: -1, dy: 0,  x: 0, y: HMAPSZE},
    {dir: 1, flipWs: false, dx: 0,  dy: -1, x: HMAPSZE, y: 0},
    {dir: 0, flipWs: false, dx: 1,  dy: 0,  x: MAPSZE-1, y: HMAPSZE},
    {dir: 1, flipWs: true,  dx: 0,  dy: 1,  x: HMAPSZE, y: MAPSZE-1}
  ].forEach((d, idx) => {
    const w = getWall(pos[0], pos[1], d.dx, d.dy)
    wls.push(w)
    if (!w) {
      scr[d.y][d.x] = brick
      scr[d.y+(1-d.dir)][d.x+d.dir] = brick
      var cns = [edgeTs[idx].edge, edgeTs[(idx+1)%4].edge]
      if (d.flipWs) {
        cns = [cns[1], cns[0]]
      }
      scr[d.y-(1-d.dir)][d.x-d.dir] = cns[0]
      scr[d.y+(1-d.dir)*2][d.x+d.dir*2] = cns[1]
    }
  })

  if (pos[0] == end[0] && pos[1] == end[1]) {
    RoomGenerators[0](scr, wls, getRand, false)
    scr[HMAPSZE][HMAPSZE] = stairs
    scr[HMAPSZE][HMAPSZE+1] = stairs
    scr[HMAPSZE+1][HMAPSZE] = stairs
    scr[HMAPSZE+1][HMAPSZE+1] = stairs
  } else if (pos[0] == start[0] && pos[1] == start[1]) {
    RoomGenerators[0](scr, wls, getRand)
  } else {
    cont = false
    while (cont === false) {
      cont = RoomGenerators[getRand(RoomGenerators.length)](scr, wls, getRand)
      /*
      cont = true  // To ensure if it fails, it leaves the map blank
      RoomGenerators[3](scr, wls, getRand)*/
    }
  }
  

  setMap(scr.map(row => row.join('')).join('\n'))
  addSprite(playerx, playery, player)
  lastSafeP = [playerx, playery]
  displayHUD()
}

function levelUp(px, py) {
  level += 1

  if (MAZESZE < MAXMAZESZE) {
    if (level >= nxtLvlUpgrade+1) {
      nxtLvlUpgrade *= nxtLvlUpgrade
      MAZESZE += 1
    }
  }
  // Ensure the next set of levels are different
  seed1 = seedgen()
  seed2 = seedgen()
  // Now generate the maze and start!
  while (1) {
    pos = [Math.round(Math.random()*(MAZESZE-1)), Math.round(Math.random()*(MAZESZE-1))];
    makeMaze()
    if (pos[0] != end[0] || pos[1] != end[1]) {
      break
    }
  }
  flashTimer = false
  timer += Math.round(
    hardness * (1+Math.round(Math.random()*5)) * Math.max(3, (10-level)*2) * 0.3
  )
  makeMap(px, py)
}
function init() {
  MAZESZE = 4
  level = 0
  nxtLvlUpgrade = 1
  timer = 30
  levelUp(HMAPSZE+Math.round(Math.random()), HMAPSZE+Math.round(Math.random()))  // To initialise the stuff
}
init()
var canInp = true
var dying = false


function die() {
  if (dying) return;
  canInp = false
  dying = true
  const p = getFirst(player)
  var stage = 0
  const ppos = [p.x, p.y]
  function nxtStage() {
    const tls = getTile(...ppos)
    const tl = tls[tls.length-1].type
    clearTile(...ppos)
    addSprite(...ppos, tl)
    stage++
    if (stage == 1) {
      addSprite(...ppos, player2)
    }
    if (stage != 3) {
      scheduleTimeout(nxtStage, 500)
    } else {
      addSprite(lastSafeP[0], lastSafeP[1], player)
      canInp = true
      dying = false
    }
  }
  scheduleTimeout(nxtStage, 200)
}

function tryMove(dx, dy) {
  const p = getFirst(player)
  if (p.x === 0 && dx == -1) {
    pos[0]--;
    makeMap(MAPSZE-1, p.y)
  } else if (p.x === MAPSZE-1 && dx == 1) {
    pos[0]++;
    makeMap(0, p.y)
  } else if (p.y === 0 && dy == -1) {
    pos[1]--;
    makeMap(p.x, MAPSZE-1)
  } else if (p.y === MAPSZE-1 && dy == 1) {
    pos[1]++;
    makeMap(p.x, 0)
  } else {
    p.x += dx
    p.y += dy
    getTile(p.x, p.y).forEach((t, _)=>{
      const typ = t.type
      if (typ == stairs) {
        levelUp(p.x, p.y)
      } else if (typ == gap || typ == spikes3) {
        die()
      } else if (typ == spikes1) {
        const underTile = getTile(p.x, p.y)[1].type
        const ppos = [p.x, p.y]
        var stage = 0
        const Hold4 = 2
        function nxt() {
          const origTile = getTile(...ppos)
          clearTile(...ppos)
          stage++
          var hit = false
          if (stage == 1 || stage == Hold4+2) {
            addSprite(...ppos, spikes2)
          } else if (stage == Hold4+3) {
            addSprite(...ppos, spikes1)
          } else {
            addSprite(...ppos, spikes3)
            hit = true
          }
          if (stage == Hold4+2 || stage == 1) {
            scheduleTimeout(nxt, 350)
          } else if (stage != Hold4+3) {
            scheduleTimeout(nxt, 500)
          }
          if (origTile.length > 1) {
            addSprite(...ppos, origTile[0].type)
            if (origTile[0].type == player && hit) {
              die()
            } 
          }
        }
        nxt()
      } else if (typ == ff) {
        const ppos = [p.x, p.y]
        function nxt() {
          const playerOn = getTile(...ppos).length > 1
          clearTile(...ppos)
          addSprite(...ppos, gap)
          if (playerOn) {
            addSprite(...ppos, player)
            die()
          }
        }
        clearTile(...ppos)
        addSprite(...ppos, ff2)
        addSprite(...ppos, player)
        scheduleTimeout(nxt, 350)
      } else if (typ == coin) {
        const ppos = [p.x, p.y]
        clearTile(...ppos)
        addSprite(...ppos, brickD)
        addSprite(...ppos, player)
        timer += 20
        flashTimer = true
        displayHUD()
        scheduleTimeout(()=>{
          flashTimer = false
          displayHUD()
        }, 500)
      } else if (safeBlocks.includes(typ)) {
        lastSafeP = [p.x, p.y]
      }
    })
  }
}

const RATE = 60
const rateLimiteds = {}
function rateLimit(k) {
  if (!(k in rateLimiteds)) {
    rateLimiteds[k] = true
  } else {
    if (rateLimiteds[k]) {
      return false
    }
    rateLimiteds[k] = true
  }
  setTimeout(()=>{rateLimiteds[k] = false}, RATE)
  return true
}
onInput("w", () => {
  if (!canInp) return;
  if (!rateLimit("w")) return;
  tryMove(0, -1)
})
onInput("s", () => {
  if (!canInp) return;
  if (!rateLimit("s")) return;
  tryMove(0, 1)
})
onInput("a", () => {
  if (!canInp) return;
  if (!rateLimit("a")) return;
  tryMove(-1, 0)
})
onInput("d", () => {
  if (!canInp) return;
  if (!rateLimit("d")) return;
  tryMove(1, 0)
})

function loose() {
  removeTimeouts()
  canInp = false
  displayMaze()
  displayHUD()
  function write(txt, y) {
    addText(txt, {
      x: Math.round((19-txt.length)/2),
      y: y,
      color: color`F`
    })
  }
  write("GAME OVER!", 13)
  write("Press k to restart", 14)
  onInput("k", () => {
    if (canInp) return;
    clearText()
    init()
    canInp = true
  })
}

function tick() {
  if ((canInp || dying) && timer > 0) {
    timer -= 1
    if (timer == 0) {
      loose()
    } else {
      displayHUD()
    }
  }
  setTimeout(tick, 500)
}
tick()

/* DEBUGGING SCRIPTS (for getting through the maze by cheating)
var oldPPos = null
onInput("j", () => {
  if (oldPPos !== null) return;
  const p = getFirst(player)
  oldPPos = [p.x, p.y]
  canInp = false
  displayMaze()
})
onInput("i", () => {
  if (oldPPos !== null) {
    makeMap(oldPPos[0], oldPPos[1])
    oldPPos = null
    canInp = true
  }
})*/
