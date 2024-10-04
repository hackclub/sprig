/*
@title: randomworld
@author: Wojtek Widomski
@tags: ['adventure']
@addedOn: 2022-12-11
*/


// ########################################
// ### TEXTURES                         ###
// ########################################

const Player = "p";
const grass = "g";
const grass1 = "G";
const tree = "T";
const wall = "w";
const door = "d";
const player_door = "D";
const roof = "r";
const floor = "f";
const table = "t";
const monitor_on = "M";
const monitor_off = "m";
const computer = "C";
const portal_on = "P";
const portal_on1 = "O";
const portal_off = "o";
const file_icon = "F";
const monitor_border = "b";
const wallpaper = "W";
const black = "B";
const loading_left = "l";
const loading_left_full = "L";
const loading_center = "c";
const loading_center_full = "v";
const loading_right = "y";
const loading_right_full = "R";
const cursor = "q";
const window_bg = "z";
const window_bar = "Z";
const error = "!";
const zombie = "e";
const wolf = "E";
const bear = "x";
const snake = "J";
const game_over = "X";
const enemy_hp_bar = ["0", "1", "2", "3", "4"]
const gps_on = "N";
const gps_off = "n";
const inventory_selection = "I";
const inventory_background = "i";
const floppy_disk_desktop = "s";
const floppy_disk = "S";
const file_icon_window = "h";
const folder = "V";
const portal_desktop_icon = "k";
const teleportation_menu_bg = "K";
const shovel = "H";
const hp_potion = "Q";
const speaker_icon = "u";
const loading_icon = "U";

setLegend(
  [ Player, bitmap`
......FFFF......
......0FF0......
......FFFF......
......FFFF......
....50000005....
....50LLLL05....
....50LLLL05....
....50LLLL05....
....50LLLL05....
....F0LLLL0F....
....F0LLLL0F....
.....000000.....
.....57..57.....
.....57..57.....
.....57..57.....
.....00..00.....`],
  [ cursor, bitmap`
................
................
......00........
......020.......
......0220......
......02220.....
......022220....
......0222220...
......02222220..
......02222000..
......0202220...
......00.02220..
......0...02220.
...........02220
............0220
.............000`],
  [ inventory_selection, bitmap`
7575757575757575
5757575757575757
75............75
57............57
75............75
57............57
75............75
57............57
75............75
57............57
75............75
57............57
75............75
57............57
7575757575757575
5757575757575757`],
  [ gps_on, bitmap`
................
...........00...
...........00...
...........00...
...........00...
...........00...
..000000000000..
.0LLLLLLLLLLLL0.
.0L7777777777L0.
.0L7575775757L0.
.0L7757777577L0.
.0L7575777577L0.
.0L7777777777L0.
.0LLLLLLLLLLLL0.
..000000000000..
................`],
  [ gps_off, bitmap`
................
...........00...
...........00...
...........00...
...........00...
...........00...
..000000000000..
.0LLLLLLLLLLLL0.
.0L0000000000L0.
.0L0000000000L0.
.0L0000000000L0.
.0L0000000000L0.
.0L0000000000L0.
.0LLLLLLLLLLLL0.
..000000000000..
................`],
  [ error, bitmap`
................
................
.......99.......
......9999......
......9999......
.....999999.....
.....990099.....
....99900999....
....99900999....
...9999009999...
...9999009999...
..999990099999..
..999999999999..
.99999900999999.
.99999900999999.
9999999999999999`],
  [ folder, bitmap`
................
................
................
.000000.........
0FFFFFF0........
0FFFFFFF0.......
0FFFFFFFF000000.
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
.00000000000000.`],
  [ file_icon_window, bitmap`
...0000000......
..022222010.....
..02LLL20210....
..02222202210...
..02LLL2022210..
..022222200000..
..02LLLL222220..
..022222222220..
..02LLLLLLLL20..
..022222222220..
..02LLLLLLLL20..
..022222222220..
..02LLLLLLLL20..
..022222222220..
..022222222220..
...0000000000...`],
  [ floppy_disk, bitmap`
................
.00000111110....
.0LLLL11101L0...
.0LLLL11101LL0..
.0LLLL11111LLL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.0L4444444444L0.
.0L4000000004L0.
.0L4444444444L0.
.0L4000004444L0.
.0L4444444444L0.
.0L4000000444L0.
.0L4444444444L0.
.00000000000000.
................`],
  [ portal_on1, bitmap`
..111111111111..
..177777777771..
..175557777771..
..177777755771..
..177777777771..
..177777777771..
..177555577771..
..177777777771..
..177777777771..
..175557777771..
..177777755551..
..177777777771..
..175777777771..
..177777777771..
.11111111111111.
1111111111111111`],
  [ portal_on, bitmap`
..111111111111..
..177777777771..
..177777755571..
..155577777771..
..177777777771..
..177777755571..
..177777777771..
..177555777771..
..177777777771..
..177777777771..
..177755577771..
..177777775551..
..177777777771..
..177557777771..
.11111111111111.
1111111111111111`],
  [ portal_off, bitmap`
..111111111111..
..1LL000000LL1..
..1L00000000L1..
..100000000001..
..1DL0L0L0LDD1..
..1DDL0L0L0LD1..
..100000000001..
..155000000551..
..100000000001..
..155000000551..
..100000000001..
..155000000551..
..1L00000000L1..
..1LL000000LL1..
.11111111111111.
1111111111111111`],
  [ shovel, bitmap`
................
.........1111...
........100001..
.......10000001.
......100000001.
.......10000001.
........1000001.
.......1010001..
......101.101...
.....101...1....
....101.........
...101..........
..101...........
.101............
101.............
.1..............`],
  [ hp_potion, bitmap`
................
.....222222.....
.....222222.....
.....222222.....
......0..0......
......0..0......
.....0....0.....
....07777770....
...0775777770...
..077577777770..
..075777777770..
..075777777770..
..077777777770..
...0777777770...
....07777770....
.....000000.....`],
  [ inventory_background, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [ window_bar, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
0000000000000000
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ window_bg, bitmap`
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
1111111111111111`],
  [ portal_desktop_icon, bitmap`
..111111111111..
..1LL000000LL1..
..1L00000000L1..
..100000000001..
..1DL0L0L0LDD1..
..1DDL0L0L0LD1..
..100000000001..
..155000000551..
..100000000001..
..155000000551..
..100000000001..
..155000000551..
..1L00000000L1..
..1LL000000LL1..
.11111111111111.
1111111111111111`],
  [ floppy_disk_desktop, bitmap`
................
.00000111110....
.0LLLL11101L0...
.0LLLL11101LL0..
.0LLLL11111LLL0.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.0L4444444444L0.
.0L4000000004L0.
.0L4444444444L0.
.0L4000004444L0.
.0L4444444444L0.
.0L4000000444L0.
.0L4444444444L0.
.00000000000000.
................`],
  [ enemy_hp_bar[0], bitmap`
..000000000000..
..000000000000..
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
................`],
  [ enemy_hp_bar[1], bitmap`
..333000000000..
..333000000000..
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
................`],
  [ enemy_hp_bar[2], bitmap`
..333333000000..
..333333000000..
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
................`],
  [ enemy_hp_bar[3], bitmap`
..333333333000..
..333333333000..
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
................`],
  [ enemy_hp_bar[4], bitmap`
..333333333333..
..333333333333..
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
................`],
  [ zombie, bitmap`
.....000000.....
.....0DDDD0.....
.....03DD30.....
.....0DDDD0.....
....5000004.....
.....5LLFF05....
.....05LLD05....
....0LL5LL04....
....0LLLDL0.....
....04LLLD0.....
....0444LL0.....
.....000400.....
.....57..57.....
.....57..47.....
.....54..50.....
.....04..00.....`],
  [ wolf, bitmap`
................
................
................
................
................
................
................
..LLL0..........
LLL0L0111111111.
00LLL012121211.1
..LLL011212121.1
.....111111111..
.....L.L...L.L..
.....L.L...L.L..
.....L.L...L.L..
.....L.L...L.L..`],
  [ snake, bitmap`
................
................
................
..055555........
..55577755......
.......6756.....
........7755....
.........775....
.........75.....
..767777765.....
.755556555......
.75.............
.656............
.775555.........
..7767755555565.
......77767777..`],
  [ bear, bitmap`
................
................
.CCCCCCC........
.C0CCCCC........
0CCCCCCC0CCCCCCC
CCCCCCCC0CCCCCCC
000CCCCC0CCCCCCC
.CCCCCCC0CCCCCCC
.CCCCCCC0CCCCCCC
....00000CCCCCCC
....CCCCCCCCCCCC
....CCCCCCCCCCCC
....CCCCCCCCCCCC
....CC.CC..CC.CC
....CC.CC..CC.CC
....CC.CC..CC.CC`],
  [ tree, bitmap`
DDDDD444444DDDD4
D4DD444DD44444D4
D4DD44444CC44444
D4D4DDC44C4D444D
DD4444C44C4D4DDD
DD44CCC44CCCC4DD
DD4D44CC4CCD444D
DD444DDCCCD44D4D
DDD44D4DCD444DDD
DDDD444CC4444DDD
DDDD444CCCDD4DDD
D4DDDDCCCCDDDDD4
D4DDDDCCCCDDDDD4
D4D4DDCCCCDDDDD4
DDD4DDCCCCD4DDDD
DDDDDDCCCCD4DDDD`],
  [ wall, bitmap`
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
0000000000000000
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
0000000000000000
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
0000000000000000
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
0000000000000000`],
  [ door, bitmap`
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
0000000000000000
LLL0LLLLLLLL0LLL
LLL0L0L0L0LL0LLL
LLL0LL0L0L0L0LLL
0000L0L0L0LL0000
LLL0LL0L0L0L0LL0
LLL0L0L0L0110LL0
LLL0LL0L0L110LL0
0000L0L0L0LL0000
LLL0LL0L0L0L0LLL
LLL0L0L0L0LL0LLL
LLL0LLLLLLLL0LLL
0000000000000000`],
  [ player_door, bitmap`
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
LLLLLLL0LLLLLLL0
0000000000000000
LLL0LLLLLLLL0LLL
LLL0LDLDLDLL0LLL
LLL0LLDLDLDL0LLL
0000LDLDLDLL0000
LLL0LLDLDLDL0LL0
LLL0LDLDLD110LL0
LLL0LLDLDL110LL0
0000LDLDLDLL0000
LLL0LLDLDLDL0LLL
LLL0LDLDLDLL0LLL
LLL0LLLLLLLL0LLL
0000000000000000`],
  [ roof, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLL5L5L5L5L5LL0
0LL5L5L5L5L5LLL0
0LLL5L5L5L5L5LL0
0LL5L5L5L5L5LLL0
0LLL5L5L5L5L5LL0
0LL5L5L5L5L5LLL0
0LLL5L5L5L5L5LL0
0LL5L5L5L5L5LLL0
0LLL5L5L5L5L5LL0
0LL5L5L5L5L5LLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [ grass1, bitmap`
444DD444DD444DD4
DDDDDDDDDDDDDDDD
D444DD444DD444DD
DDDDDDDDDDDDDDDD
DD444DD444DD444D
DDDDDDDDDDDDDDDD
4DD444DD444DD444
DDDDDDDDDDDDDDDD
44DD444DD444DD44
DDDDDDDDDDDDDDDD
444DD444DD444DD4
DDDDDDDDDDDDDDDD
D444DD444DD444DD
DDDDDDDDDDDDDDDD
DD444DD444DD444D
DDDDDDDDDDDDDDDD`],
  [ grass, bitmap`
DDDDDD4DDDDDDDD4
D4DDDDDD4DDDDDD4
D4DD4DDD4DDDDDD4
D4DD4DDDDDDD4DDD
DDDD4DDDDD4D4DDD
DDDDDDDDDD4D4DDD
DD4DDDD4DD4DDD4D
DD4DDDD4DDDDDD4D
DDDD4DD4DDDD4DDD
DDDD4DDDD4DD4DDD
DDDD4DDDD4DD4DDD
D4DDDDDDD4DDDDD4
D4DDDDDDDDDDDDD4
D4D4DDDDDDDDDDD4
DDD4DD4DDDD4DDDD
DDDDDD4DDDD4DDDD`],
  [ table, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CL0L0L0L0L0L0L0C
C0L0L0L0L0L0L0LC
CL0L0L0L0L0L0L0C
C0L0L0L0L0L0L0LC`],
  [ monitor_off, bitmap`
CCCCCCCCCCCCCCCC
CCCLLLLLLLLLLCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCL00000000LCCC
CCCLLLLLLLLLLCCC
CCCCCCLLLLCCCCCC
CCC00000000C0CCC
CCC00000000C0CCC
CCCCCCCCCCCCCCCC
CL0L0L0L0L0L0L0C
C0L0L0L0L0L0L0LC
CL0L0L0L0L0L0L0C
C0L0L0L0L0L0L0LC`],
  [ monitor_on, bitmap`
CCCCCCCCCCCCCCCC
CCCLLLLLLLLLLCCC
CCCL77777777LCCC
CCCL76767277LCCC
CCCL77777777LCCC
CCCL77777777LCCC
CCCL77777777LCCC
CCCLLLLLLLLLLCCC
CCCCCCLLLLCCCCCC
CCC00000000C0CCC
CCC00000000C0CCC
CCCCCCCCCCCCCCCC
CL0L0L0L0L0L0L0C
C0L0L0L0L0L0L0LC
CL0L0L0L0L0L0L0C
C0L0L0L0L0L0L0LC`],
  [ computer, bitmap`
000000000L0L0L0L
0LLLLLL0L0L0L0L0
0LLLLLL00L0L0L0L
0LLLLLL0L0L0L0L0
0LLLLLL00L0L0L0L
00000000L0L0L0L0
0LLLLLL00L0L0L0L
0L4L22L0L0L0L0L0
0LLLLLL00L0L0L0L
0L4L22L0L0L0L0L0
0LLLLLL00L0L0L0L
0L0000L0L0L0L0L0
0LLLLLL00L0L0L0L
0LLLLLL0L0L0L0L0
0LLLLLL00L0L0L0L
00000000L0L0L0L0`],
  [ floor, bitmap`
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0`],
  [ file_icon, bitmap`
...0000000......
..022222010.....
..02LLL20210....
..02222202210...
..02LLL2022210..
..022222200000..
..02LLLL222220..
..022222222220..
..02LLLLLLLL20..
..022222222220..
..02LLLLLLLL20..
..022222222220..
..02LLLLLLLL20..
..022222222220..
..022222222220..
...0000000000...`],
  [ loading_left_full, bitmap`
................
................
..22222222222222
..22222222222222
22..............
22.2222222222222
22.2222222222222
22.2222222222222
22.2222222222222
22.2222222222222
22.2222222222222
22..............
..22222222222222
..22222222222222
................
................`],
  [ loading_center_full, bitmap`
................
................
2222222222222222
2222222222222222
................
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
................
2222222222222222
2222222222222222
................
................`],
  [ loading_right_full, bitmap`
................
................
22222222222222..
22222222222222..
..............22
2222222222222.22
2222222222222.22
2222222222222.22
2222222222222.22
2222222222222.22
2222222222222.22
..............22
22222222222222..
22222222222222..
................
................`],
  [ loading_left, bitmap`
................
................
..22222222222222
..22222222222222
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
..22222222222222
..22222222222222
................
................`],
  [ loading_center, bitmap`
................
................
2222222222222222
2222222222222222
................
................
................
................
................
................
................
................
2222222222222222
2222222222222222
................
................`],
  [ loading_right, bitmap`
................
................
22222222222222..
22222222222222..
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
22222222222222..
22222222222222..
................
................`],
  [ monitor_border, bitmap`
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
  [ wallpaper, bitmap`
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
  [ speaker_icon, bitmap`
.......21.......
......221.......
.....2221.......
....22221.2.....
...222221..2....
222222221...2...
212222221.2..2..
212222221..2.2..
212222221..2.2..
212222221.2..2..
222222221...2...
...222221..2....
....22221.2.....
.....2221.......
......221.......
.......21.......` ],
  [ loading_icon, bitmap`
.22222222222222.
.22222222222222.
..222200222222..
...2200000022...
....22000022....
.....220022.....
......2222......
.......22.......
.......22.......
......2222......
.....220222.....
....22022222....
...2222202222...
..220000000022..
.22000000000022.
.22222222222222.` ],
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
  [ game_over, bitmap`
0000002222000000
0000022222200000
0000222222220000
0002202222022000
0002000220002000
0002202002022000
0002222002222000
0000220000220000
2200222222220022
2220202222020222
2222020000202222
2200022222200022
0022202222022200
2222000000002222
2220000000002222
0220000000000220`],
  [ teleportation_menu_bg, bitmap`
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
5555555555555555`]
);

const solids = [Player, tree, wall, roof, table, monitor_off, monitor_on, computer, cursor, monitor_border, zombie, wolf, snake, bear];

setSolids(solids);

// End of TEXTURES section
// ----------------------------------------


// ########################################
// ### SOUNDS                           ###
// ########################################

const computer_bios = tune`
300: e5-300,
9300`;
const computer_start = tune`
468.75: f5~468.75 + c5-468.75 + b4-468.75 + a4-468.75 + c4/468.75,
468.75: e4/468.75 + c5-468.75 + d5-468.75 + e5-468.75 + a5~468.75,
468.75: b4-468.75 + a4-468.75 + g4-468.75,
468.75: g5-468.75 + a5-468.75 + b5-468.75,
13125`;
const computer_error = tune`
200,
200: a5^200 + b5^200 + g5^200 + f5^200,
200: d4-200,
200: f4-200 + g4-200 + a4-200 + c4-200 + e4-200,
5600`;
const portal_enable = tune`
100: c4-100,
100: c4/100,
100: c4-100,
100: c4/100,
100: c4-100,
100: c4/100,
100: c4-100 + b4~100 + a4~100,
100: c4/100 + b4~100 + a4~100,
100: c4-100 + b4~100 + a4~100,
100: c4/100 + b4~100 + a4~100,
100: c4-100 + b4~100 + a4~100,
100: c4/100 + b4~100 + a4~100,
100: c4-100 + b4~100 + a4~100,
100: c4/100 + b4~100 + a4~100,
100: c4-100 + b4~100 + a4~100,
100: a5/100 + g5/100 + f5/100 + b4~100 + a4~100,
100: a5/100 + g5/100 + f5/100 + a4~100 + b4~100,
100: a5/100 + g5/100 + f5/100 + a4~100 + b4~100,
100: a5/100 + g5/100 + f5/100 + a4~100 + b4~100,
100: a5/100 + g5/100 + f5/100,
100: a5/100 + g5/100 + f5/100,
100: a5/100 + g5/100 + f5/100,
100: a5/100 + g5/100 + f5/100,
900`;
const teleportation_sound = tune`
60: c4^60,
60: c4^60,
60: c4^60,
60: c4^60,
60: c4^60 + d4^60,
60: d4^60 + e4^60,
60: e4^60 + f4^60,
60: f4^60 + g4^60,
60: g4^60 + a4^60,
60: a4^60 + b4^60,
60: b4^60 + c5^60,
60: c5^60 + d5^60,
60: d5^60 + e5^60,
60: e5^60 + f5^60,
60: f5^60 + g5^60,
60: g5^60 + a5^60,
60: a5^60 + b5^60,
60: b5^60,
840`;
const death_sound = tune`
2000: c4-2000 + d4-2000 + e4-2000 + g4-2000 + f4-2000,
62000`;
const gps_on_sound = tune`
166.66666666666666: e5-166.66666666666666,
166.66666666666666,
166.66666666666666: e5-166.66666666666666,
166.66666666666666,
166.66666666666666: e5-166.66666666666666,
166.66666666666666: b5-166.66666666666666 + a5-166.66666666666666,
166.66666666666666: b5-166.66666666666666 + a5-166.66666666666666,
4166.666666666666`;
const gps_off_sound = tune`
166.66666666666666: b5-166.66666666666666,
166.66666666666666,
166.66666666666666: b5-166.66666666666666,
166.66666666666666,
166.66666666666666: b5-166.66666666666666,
166.66666666666666: e5-166.66666666666666 + f5-166.66666666666666,
166.66666666666666: f5-166.66666666666666 + e5-166.66666666666666,
4166.666666666666`;
const collect_item_sound = tune`
100,
100: f5-100,
100: f5-100,
100: g5-100 + f5-100 + e5-100,
2800`;
const music = tune`
250: c4^250 + b5~250,
250: b4-250 + c4^250 + g5~250 + a5~250 + b5~250,
250: b4-250 + c4^250 + f5~250 + g5~250,
250: b4-250 + d5-250 + e4-250,
250: b4-250 + e5-250 + d5-250,
250,
250: b4-250 + a4-250,
250: f4-250,
250: g4-250,
250: c5/250,
250: f5/250 + e5/250 + c5/250,
250: b4/250 + d4~250,
250: b4/250 + d4~250,
250: a4/250 + g4/250,
250: d4~250 + f5~250,
250: d4~250,
250: b4-250 + g5~250,
250: g5~250,
250: e5/250,
250: e5/250 + g4^250 + f4^250,
250: f4^250 + g5~250,
250: g5~250,
250: c5/250 + b4^250 + a4^250 + e4^250 + f5~250,
250: e5~250 + d5~250,
250: f4^250,
250: f5^250 + c5~250 + f4-250,
250: c5~250 + g4-250,
250,
250: a5-250,
250: a4~250 + g5-250 + b5-250,
250: a4~250 + g4~250 + e4~250 + d5/250 + d4~250,
250: g4~250 + c5/250 + d5/250 + e5/250 + d4~250`;
const music_portal_menu = tune`
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: e4/1500 + c5-1500 + d5-1500 + e5-1500 + a5~1500,
1500: f4/1500 + d5-1500 + e5-1500 + f5-1500 + b5~1500,
1500: g5~1500 + d5-1500 + c5-1500 + b4-1500 + d4/1500,
1500: c5-1500 + d5-1500 + e5-1500 + a5~1500 + e4/1500,
1500: d5-1500 + e5-1500 + f5-1500 + b5~1500 + f4/1500`;


// End of SOUNDS section
// ----------------------------------------


// Constasts
const CAMERA_WIDTH = 10;
const CAMERA_HEIGHT = 8;
const WORLD_SIZE = 128;
const VIEW_MARGIN = 2;

const base_door_x = 0;
const base_door_y = 6;
const base_portal_x = 8;
const base_portal_y = 1;

const enemy_types = new Map([
  [zombie, {min_dist: 4, damage: 3, max_hp: 8, points: 20, world_max: 100, item: null}],
  [wolf, {min_dist: 10, damage: 5, max_hp: 10, points: 25, world_max: 30, item: "hp_potion"}],
  [snake, {min_dist: 6, damage: 8, max_hp: 4, points: 15, world_max: 30, item: "hp_potion"}],
  [bear, {min_dist: 10, damage: 10, max_hp: 30, points: 100, world_max: 3, item: null}]
]);

const max_min_dist = 10;

const black_bg = map`
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB`;


// ########################################
// ### GLOBAL VARIABLES                 ###
// ########################################

// World
// world is array of Uint8Arrays (2d array of 8-bit unsigned ints)
// first 4 bits is world block (sprite, that can't move)
// 5th bit is 1 if there is an enemy
// numbers less than 2 are not solid
// to get this number: world[x][y] & 15 (15 is 2^4-1 - 1111 in binary)
// to get sprite: sprite_types[world[x][y]&15]
// to get number of sprite: sprite_numbers[sprite]
let world;
const sprite_types = [grass, grass1, tree, wall, roof, door, player_door];
let sprite_numbers = new Map();
sprite_types.forEach((spr, i) => sprite_numbers[spr] = i);

let bases = [];
let hidden_items = [];

// Player
let player_hp = 100;
// Player position in the world (not on screen)
let player_x;
let player_y;
let inventory;
let score = 0;
let player_level;
let next_level;
let restart_allowed = false;
let player_sprite;

let sound_mode; // 0-off, 1-no music, 2-on

// Enemies
// number of enemies of each type
// Divide world in 8x8 chunks to update enemies only close to player
let enemies_chunks;
const CHUNK_SIZE = 8;
let chunk_number = Math.ceil(WORLD_SIZE/CHUNK_SIZE);

// number of enemies of each type (set to 0 in newGame())
let enemies_number = new Map();
let enemy_update_interval;
let spawn_interval;

// View
let view_x;
let view_y;
let in_base = -1;
let display_state = {mode: "world"};
let inventory_numbers = [];
let text_onetime = [];

// Which controls help has been shown (this is not reset on new game)
let controls_help = {
  inventory: false,
  use: false,
  computer: false,
  attack: false
}

let music_playback = null;

// End of GLOBAL VARIABLES section
// ----------------------------------------


// ########################################
// ### WORLD GENERATION                 ###
// ########################################

// Generate random world
function generateWorld(size) {
  // Forest is a place with more trees
  let forest_x = Math.floor(Math.random() * (WORLD_SIZE-30)) + 10;
  let forest_y = Math.floor(Math.random() * (WORLD_SIZE-30)) + 10;
  
  // Do not generate forest in the middle of the world
  if (forest_x > WORLD_SIZE/2 - 5) {
    forest_x += 10;
  }
  if (forest_y > WORLD_SIZE/2 - 5) {
    forest_y += 10;
  }

  // World is 2d array of ints
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let random_number = Math.floor(Math.random() * 100);

      if ((random_number % 50 == 0)
          || (random_number % 4 == 0 && Math.pow(i - forest_y, 2) + Math.pow(j - forest_x, 2) <= 100)) {
        world[i][j] = sprite_numbers[tree];
      } else if (random_number % 10 == 0) {
        world[i][j] = sprite_numbers[grass1];
      } else {
        world[i][j] = sprite_numbers[grass];
      }
    }
  }

  // Set start position of player to grass
  world[WORLD_SIZE/2-1][WORLD_SIZE/2-1] = sprite_numbers[grass];
}

// Add bases at random positions
function addStructures() {
  const min_distance = 20; // Minimum distance beetween bases

  // Add first base with player's computer always at the same position
  let player_door_x = WORLD_SIZE/2 + 5;
  let player_door_y = WORLD_SIZE/2 - 4;
  addBase(true, player_door_x, player_door_y);

  // Add bases
  for (let i = 0; i < 10 + Math.floor(Math.random() * 5); i++) {
    let new_x;
    let new_y;
    let good_location_found = false;
    // Generate random positions, until good location is found
    while (!good_location_found) {
      new_x = Math.floor(Math.random() * (WORLD_SIZE - 20)) + 10;
      new_y = Math.floor(Math.random() * (WORLD_SIZE - 20)) + 10;
      good_location_found = true;
      for (let b in bases) {
        if (Math.pow(bases[b].x - new_x, 2) + Math.pow(bases[b].y - new_y, 2) < Math.pow(min_distance, 2)) {
          // Too close to other bases
          good_location_found = false;
          break;
        }
      }
      if (good_location_found) {
        addBase(false, new_x, new_y);
      }
    }
  }

  // Add hidden items, and files with location of them to bases
  for (let b in bases.slice(1)) {
    let hidden_item_x = Math.floor(Math.random() * (WORLD_SIZE - 20)) + 10;
    let hidden_item_y = Math.floor(Math.random() * (WORLD_SIZE - 20)) + 10;
    let item_good_location = false;
    // Find free location (without tree or structure)
    while (!item_good_location) {
      hidden_item_x++;
      item_good_location = true;
      if (world[hidden_item_y][hidden_item_x] >= 2) {
        item_good_location = false;
      } else {
        for (let i of hidden_items) {
          if (i.x == hidden_item_x && i.y == hidden_item_y) {
            item_good_location = false;
          }
        }
      }
    }
    let item; // Item can be points or HP potion
    if (Math.random() > 0.5) {
      item = "points";
    } else {
      item = "potion";
    }
    hidden_items.push({x: hidden_item_x, y: hidden_item_y, item: item, found: false});
    bases[Number(b)+1].files.push({
      text: "Item hidden\nat " + (hidden_item_x-WORLD_SIZE/2+1).toString() + ", " + (hidden_item_y-WORLD_SIZE/2+1).toString(),
      can_open: false
    });
  }


  // Add GPS to first base (bases are in random places and user can't know where is first base)
  bases[1].tableitem = ["gps", {sprite: gps_off, qty: 1}];

  // Add floppy disk to second base
  bases[2].tableitem = ["floppy_disk", {sprite: floppy_disk, files: [], qty: 1}];

  // Add shovel to third base
  bases[3].tableitem = ["shovel", {sprite: shovel, qty: 1}];
}

// Add base to world
function addBase(is_playerbase, door_x, door_y) {
  // remove trees around base
  for (let i = door_y-3; i <= door_y + 1; i++){
    for (let j = door_x-2; j <= door_x+2; j++){
      world[i][j] = sprite_numbers[grass];
    }
  }

  // Files on computer in base
  let files = [];

  // Every computer contains file with base location
  files.push({
    text: " X=" + (door_x-WORLD_SIZE/2+1).toString() + "\n Y=" + (door_y-WORLD_SIZE/2+1).toString(),
    can_open: true
  });

  // Player's base has different doors.
  // Player's computer can open all files and has file with information about it.
  if (is_playerbase) {
    world[door_y][door_x] = sprite_numbers[player_door];
    files.push({
      text: "This is your\ncomputer.\nIt can open\nall file\nformats.",
      can_open: true
    });
  } else {
    world[door_y][door_x] = sprite_numbers[door];
  }
  
  // Add walls
  world[door_y][door_x-1] = sprite_numbers[wall];
  world[door_y][door_x+1] = sprite_numbers[wall];

  // Add roof
  for (let i = door_y-1; i >= door_y - 2; i--) {
    for (let j = door_x-1; j <= door_x+1; j++) {
      world[i][j] = sprite_numbers[roof];
    }
  }

  let item = null;
  if (!is_playerbase) {
    // All not player's bases have potion on the table by default
    item = ["hp_potion", {sprite: hp_potion, qty: 1}];
  }

  bases.push({
    x: door_x,
    y: door_y,
    playerbase: is_playerbase,
    computer_power: is_playerbase, // computer and portal are on in player base
    files: files,
    portal_power: is_playerbase,
    tableitem: item
  });
}

function showLoadingScreen() {
  setMap(black_bg);
  clearText();  
  addSprite(1, 1, loading_icon);
  addText("Generating", {x: 5, y: 2, color: color`2`});
  addText("world...", {x: 5, y: 3, color: color`2`});
}

// End of WORLD GENERATION section
// ----------------------------------------


// ########################################
// ### COMPUTER                         ###
// ########################################

const COMPUTER_WINDOW_POSITION = 2;
const desktop_map = map`
bbbbbbbbbb
bBBBBBBBBb
bBBBBBBBBb
bBBBBBBBBb
bBBBBBBBBb
bBBBBBBBBb
bBBBBBBBBb
bbbbbbbbbb`;
const desktop_map_on = map`
bbbbbbbbbb
bWWWWWWWWb
bWWWWWWWWb
bWWWWWWWWb
bWWWWWWWWb
bWWWWWWWWb
bWWWWWWWWb
bbbbbbbbbb`;
const window_map = map`ZZZZZZ
zzzzzz
zzzzzz
zzzzzz`;


function useComputer() {
  // Loading bar position
  const loading_x = 3;
  const loading_y = 5;

  // Loading bar sprites
  const loading_sprites = [loading_left, loading_center, loading_center, loading_right];
  const loading_sprites_full = [loading_left_full, loading_center_full, loading_center_full, loading_right_full];

  const icons_start = 2; // Position of first icon

  
  display_state.mode = "computer";
  display_state.icons = [];
  display_state.file_open = false;

  clearText();

  if (bases[in_base].computer_power) { // Computer is turned on
    display_state.computer_progress = false;
    setMap(desktop_map_on);

    // Add files icons
    for (let i = 0; i < bases[in_base].files.length; i++) {
      addSprite(icons_start+2*i, icons_start, file_icon);
      display_state.icons.push({x: icons_start+2*i, y: icons_start, type: "file", idx: i});
    }

    // Add floppy disk icon
    if (inventory.has("floppy_disk")) {
      addSprite(icons_start, icons_start+3, floppy_disk_desktop);
      display_state.icons.push({x: icons_start, y: icons_start+3, type: "floppy_disk"});
    }

    // Add Portal Control icon
    if (!bases[in_base].portal_power) {
      addSprite(icons_start+4, icons_start+3, portal_desktop_icon);
      display_state.icons.push({x: icons_start+4, y: icons_start+3, type: "portal_control"});
    }

    // Add cursor
    addSprite(CAMERA_WIDTH-1-icons_start, CAMERA_HEIGHT-1-icons_start, cursor);
    player_sprite = getFirst(cursor); // Cursor is now player

    // Display controls help if computer is used first time
    if (!controls_help.computer) {
      addText("(i) Exit", {x: 0, y: CAMERA_HEIGHT*2-2, color: color`0`});
      addText("(k) Open    (l) Menu", {x: 0, y: CAMERA_HEIGHT*2-1, color: color`0`});
      controls_help.computer = true;
    }
    
  } else { // Computer is turned off
    display_state.computer_progress = true;
    setMap(desktop_map);
    playSoundIfOn(computer_bios);

    // Show loading bar animation
    for (let i = 0; i < loading_sprites.length; i++) {
      addSprite(loading_x+i, loading_y, loading_sprites[i]);
      setTimeout(() => {addSprite(loading_x+i, loading_y, loading_sprites_full[i])}, 250*(i+1));
    }
    bases[in_base].computer_power = true;
    
    setTimeout(() => {
      playSoundIfOn(computer_start);
      useComputer();
    }, 250*loading_sprites.length + 100);
  }
  
}

// Show error window
function showError(text) {
  createWindow("Error");
  addSprite(COMPUTER_WINDOW_POSITION, COMPUTER_WINDOW_POSITION+1, error);
  addTextWorkaround(text, {x: COMPUTER_WINDOW_POSITION*2+2, y: COMPUTER_WINDOW_POSITION*2+2, color: color`0`});
  playSoundIfOn(computer_error)
}

// Create empty window with title
function createWindow(title) {
  closeWindow(); // Close any open windows before creating new
  let window_lines = window_map.split("\n");
  for (let i = 0; i < window_lines.length; i++) {
    for (let j = 0; j < window_lines[i].length; j++) {
      addSprite(j+COMPUTER_WINDOW_POSITION, i+COMPUTER_WINDOW_POSITION, window_lines[i][j]);
    }
  }
  addText(title, {x: COMPUTER_WINDOW_POSITION*2, y: COMPUTER_WINDOW_POSITION*2, color: color`2`});
  display_state.file_open = true;
}

function closeWindow() {
  clearText();
  let remove = getAll(error).concat(getAll(window_bg), getAll(window_bar));
  for (let s in remove) {
    remove[s].remove();
  }
  display_state.file_open = false;
  display_state.file_menu = false;
  display_state.floppy_disk = false;
}

function openFile(base, idx, open_every_file) {
  // Max text size: 12 columns, 5 rows
  let file = bases[base].files[idx];
  if (file.can_open || open_every_file) {  
    createWindow("Text editor");
    addTextWorkaround(file.text, {x: COMPUTER_WINDOW_POSITION*2, y: COMPUTER_WINDOW_POSITION*2+2, color: color`0`});
  } else {
    showError("Can't open\nthis type\nof file");
  }
}

// Copy file from computer to player's floppy disk and show animation
function copyFile(idx) {
  // Check if file already exists
  let file_exists = false;
  for (let f of inventory.get("floppy_disk").files) {
    if (f.base == in_base && f.idx == idx) {
      file_exists = true;
      break;
    }
  }
  if (file_exists) {
    showError("File\nalready\nexists");
  } else {
    // Display animation
    display_state.computer_progress = true;
    createWindow("Copying...");
    addSprite(3, 4, folder);
    addSprite(6, 4, floppy_disk);
    addSprite(3, 4, file_icon_window);
  
    const frame = 100;
  
    setTimeout(() => {
      getFirst(file_icon_window).y--;
    }, frame);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        getFirst(file_icon_window).x++;
      }, frame*(2+i));
    }
    setTimeout(() => {
      getFirst(file_icon_window).y++;
    }, 5*frame);
    setTimeout(() => {
      getFirst(file_icon_window).remove();
      getFirst(folder).remove();
      getFirst(floppy_disk).remove();
      closeWindow();
      display_state.computer_progress = false;
    }, 6*frame);

    // Add file to floppy disk in inventory
    inventory.get("floppy_disk").files.push({base: in_base, idx: idx});
  }
}

// Returns icon under cursor or null
function getFileUnderCursor() {
  for (let i in display_state.icons) {
    if (display_state.icons[i].x == player_sprite.x && display_state.icons[i].y == player_sprite.y) {
      return display_state.icons[i];
    }
  }
  return null;
}

// Shows file menu with copy button
function showFileMenu() {
  addSprite(player_sprite.x+1, player_sprite.y+1, window_bg);
  addSprite(player_sprite.x+2, player_sprite.y+1, window_bg);
  addText("Copy", {x: player_sprite.x*2+2, y: player_sprite.y*2+2, color: color`0`});
  display_state.file_menu = true;
}

const floppy_disk_list_length = 6;

function renderFloppyDiskList(selection_pos, view_pos) {
  clearText();
  addText("Files", {x: COMPUTER_WINDOW_POSITION*2, y: COMPUTER_WINDOW_POSITION*2, color: color`2`});
  let files = inventory.get("floppy_disk").files.slice(view_pos, view_pos+floppy_disk_list_length);

  if (files.length == 0) {
    addText("(empty)", {x: 6, y: 7, color: color`L`});
    display_state.floppy_disk = false;
    return;
  }
  
  for (let f in files) {
    let file_str = (bases[files[f].base].x-WORLD_SIZE/2+1).toString()
      + "_" + (bases[files[f].base].y-WORLD_SIZE/2+1).toString() + "_" + files[f].idx.toString();
    if (selection_pos == Number(f) + view_pos) {
      addText(">" + file_str, 
              {x: COMPUTER_WINDOW_POSITION*2, y: COMPUTER_WINDOW_POSITION*2+2+Number(f), color: color`4`});
    } else {
      addText(" " + file_str,
              {x: COMPUTER_WINDOW_POSITION*2, y: COMPUTER_WINDOW_POSITION*2+2+Number(f), color: color`0`});
    }
  }
  display_state.floppy_disk_view = view_pos;
  display_state.floppy_disk_sel = selection_pos;
}

function scrollFloppyDiskList(delta_pos) {
  let files_length = inventory.get("floppy_disk").files.length;
  let pos = scrollList(files_length, display_state.floppy_disk_sel, display_state.floppy_disk_view, floppy_disk_list_length, delta_pos);
  renderFloppyDiskList(pos.sel, pos.view);

}

function openFloppyDisk() {
  createWindow("Files");
  display_state.floppy_disk = true;
  renderFloppyDiskList(0, 0);
}

// Enable portal and display window with animation
function enablePortal() {
  createWindow("PortalCtrl");
  getFirst(portal_desktop_icon).remove(); // remove icon from desktop
  // add background (portal uses in some parts the same color as window background)
  addSprite(COMPUTER_WINDOW_POSITION+1, COMPUTER_WINDOW_POSITION+1, inventory_background);
  addSprite(COMPUTER_WINDOW_POSITION+1, COMPUTER_WINDOW_POSITION+1, portal_off);
  addTextWorkaround("Enabling\nportal...", {x:COMPUTER_WINDOW_POSITION*2+2, y:COMPUTER_WINDOW_POSITION*2+4, color: color`0`});

  playSoundIfOn(portal_enable);

  const frame = 100;
  display_state.computer_progress = true;
  setTimeout(() => {getFirst(portal_off).type = portal_on}, 2*frame);
  setTimeout(() => {getFirst(portal_on).type = portal_off}, 3*frame);
  setTimeout(() => {getFirst(portal_off).type = portal_on}, 4*frame);

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {getFirst(portal_on).type = portal_on1}, (5+2*i)*frame);
    setTimeout(() => {getFirst(portal_on1).type = portal_on}, (6+2*i)*frame);
  }

  setTimeout(() => {
    getFirst(portal_on).remove();
    getFirst(inventory_background).remove();
    closeWindow();
    display_state.computer_progress = false;
    useComputer(); // This is the simplest way to remove portal control from display_state.icons
  }, 15*frame);

  bases[in_base].portal_power = true;
}

// End of COMPUTER section
// ----------------------------------------


// ########################################
// ### ENEMIES                          ###
// ########################################

function getChunk(x, y) {
  let chunkX = Math.floor(x/CHUNK_SIZE);
  let chunkY = Math.floor(y/CHUNK_SIZE);
  return {x: chunkX, y: chunkY};
}

// Execute spawnEnemies for every type
function spawnAllEnemies() {
  enemy_types.forEach((type, key) => {
    spawnEnemies(key);
  });
}

// Spawn enemies with type in random places
function spawnEnemies(type) {
  let to_spawn = enemy_types.get(type).world_max - enemies_number[type];
  for (let i = 0; i < to_spawn; i++) {
    let new_x;
    let new_y;
    let good_location_found = false;

    while(!good_location_found) {
      new_x = Math.floor(Math.random() * WORLD_SIZE);
      new_y = Math.floor(Math.random() * WORLD_SIZE);
      good_location_found = true;
      // Enemies are not spawned closer to player than min_dist + 5
      if (Math.pow(new_x - player_x, 2) + Math.pow(new_y - player_y, 2) < Math.pow(enemy_types.get(type).min_dist + 5, 2)){
        good_location_found = false;
        continue;
      }
      if (world[new_y][new_x] >= 2) {
        good_location_found = false;
        continue;
      }
      if (good_location_found) {
        world[new_y][new_x] |= 1<<4;
        let chunk = getChunk(new_x, new_y);
        enemies_chunks[chunk.x][chunk.y].add({type: type, x: new_x, y: new_y, hp: enemy_types.get(type).max_hp});
        enemies_number[type]++;
      }
    }
  }
}

// Update enemies on screen. This does not move enemies and can be called anytime.
function updateEnemiesDisplay() {
  if (display_state.mode == "world") {
    // Remove enemies sprites
    enemy_types.forEach((v, t) => {
      let to_remove = getAll(t);
      for (let e in to_remove) {
        to_remove[e].remove();
      }
    });
    // Remove enemy health bars
    for (let b in enemy_hp_bar) {
      let to_remove = getAll(enemy_hp_bar[b]);
      for (let s in to_remove) {
        to_remove[s].remove();
      }
    }

    let chunk1 = getChunk(view_x, view_y);
    let chunk2 = getChunk(view_x+CAMERA_WIDTH, view_y+CAMERA_HEIGHT);

    for (let i = chunk1.x; i <= chunk2.x; i++) {
      for (let j = chunk1.y; j <= chunk2.y; j++) {
        for (let e of enemies_chunks[i][j]) {
          if (e.x >= view_x && e.x < view_x+CAMERA_WIDTH && e.y >= view_y && e.y < view_y+CAMERA_HEIGHT) {
            let x = e.x - view_x;
            let y = e.y - view_y;
            addSprite(x, y, e.type); // Add enemy
            addSprite(x, y, enemy_hp_bar[Math.floor(e.hp/enemy_types.get(e.type).max_hp/0.25)]); // Add health bar
          }
        }
      }
    }
  }
}

// This function moves enemies and makes them attack players.
// It should be calles in interval (setInterval(updateEnemies, time))
function updateEnemies() {
  if (display_state.mode == "world") {
    let chunk1 = getChunk(Math.max(player_x-max_min_dist, 0), Math.max(player_y-max_min_dist, 0));
    let chunk2 = getChunk(Math.min(player_x+max_min_dist, WORLD_SIZE-1), Math.min(player_y+max_min_dist, WORLD_SIZE-1));

    let enemies_to_update = [];

    for (let i = chunk1.x; i <= chunk2.x; i++) {
      for (let j = chunk1.y; j <= chunk2.y; j++) {
        enemies_chunks[i][j].forEach((e) => {
          enemies_to_update.push(e);
        });
      }
    }

    for (let e in enemies_to_update) {
      let enemy = enemies_to_update[e];
      let old_x = enemy.x;
      let old_y = enemy.y;
      if (Math.pow(old_x - player_x, 2) + Math.pow(old_y - player_y, 2) <= Math.pow(enemy_types.get(enemy.type).min_dist, 2)) {
        let move_x = 0;
        let move_y = 0;
        if (old_x < player_x) {
          move_x++;
        } else if (old_x > player_x) {
          move_x--;
        }
        if (old_y < player_y) {
          move_y++;
        } else if (old_y > player_y) {
          move_y--;
        }

        let moves = [];
        if (move_x != 0) {
          moves.push([move_x, 0]);
        }
        if (move_y != 0) {
          moves.push([0, move_y]);
        }

        for (let m of moves) {
          let move_possible = true;
          let new_x = old_x+m[0];
          let new_y = old_y+m[1];

          if (player_x == new_x && player_y == new_y) {
            let alive = changeHp(-enemy_types.get(enemy.type).damage);
            if (!alive) {
              return;
            }
            move_possible = false;
          }

          if (world[new_y][new_x] >= 2) {
            move_possible = false;
          }
          
          if (move_possible) {
            world[old_y][old_x] &= ~(1<<4);
            world[new_y][new_x] |= 1<<4;

            let old_chunk = getChunk(old_x, old_y);
            let new_chunk = getChunk(new_x, new_y);

            enemies_chunks[old_chunk.x][old_chunk.y].delete(enemy);
            enemy.x = new_x;
            enemy.y = new_y;
            enemies_chunks[new_chunk.x][new_chunk.y].add(enemy);

            break;
          }
        }
      }
    }
    updateEnemiesDisplay();
  }
}

// End of ENEMIES section
// ----------------------------------------


// ########################################
// ### DISPLAYING                       ###
// ########################################

// Display part of a world
function setView(world, x, y) {
  let view = ``;

  // Add part of a world to map
  for (let i = y; i < y+CAMERA_HEIGHT; i++){
    for (let j = x; j < x+CAMERA_WIDTH; j++){
      view += sprite_types[world[i][j] & 15];
    }
    view += "\n";
  }
  // Set variables used by other functions
  view_x = x;
  view_y = y;
  setMap(view); // Set new map

  // Add player
  addSprite(player_x - x, player_y - y, Player);
  player_sprite = getFirst(Player);

  // Add enemies
  updateEnemiesDisplay();
}

// Workaround bug https://github.com/hackclub/sprig/issues/815
function addTextWorkaround(text, options) {
  let lines = text.split("\n");
  lines.forEach((l) => {
    addText(l, options);
    options.y++;
  });
}

function updateText() {
  clearText();
  addText(player_hp.toString(), {x: 20-player_hp.toString().length, y: 0, color: color`3`}); // HP
  addText(score.toString(), {x:0, y:0, color: color`5`}); // Points
  // Player X and Y if GPS is on
  if (!display_state.inventory_open
      && display_state.mode == "world" && inventory.has("gps") && inventory.get("gps").sprite == gps_on) {
    addText("X=" + (player_x-WORLD_SIZE/2+1).toString(), {x: 0, y: 14, color: color`0`});
    addText("Y=" + (player_y-WORLD_SIZE/2+1).toString(), {x: 0, y: 15, color: color`0`});
  }

  // Controls help
  if (!controls_help.inventory && inventory.size > 0) {
    addText("(j) Inventory", {x: 0, y: CAMERA_HEIGHT*2-1, color: color`0`});
  }
  if (!controls_help.attack) {
    enemy_types.forEach((type, name) => {
      if (getAll(name).length > 0) {
        addText("(k) Attack", {x: 0, y:CAMERA_HEIGHT*2-1, color: color`0`});
      }
    });
  }
  
  for (let t of inventory_numbers) {
    addText(t.text, t.options);
  }
  for (let t of text_onetime) {
    addTextWorkaround(t.text, t.options);
  }
  text_onetime = [];
}

function scrollList(list_length, sel_pos, view_pos, display_length, delta_pos) {
  let new_sel_pos = sel_pos + delta_pos;
  if (new_sel_pos >= 0 && new_sel_pos < list_length) {
    let new_view_pos = view_pos;
    if (new_sel_pos - new_view_pos + 2 > display_length && new_view_pos + display_length < list_length) {
      new_view_pos = new_sel_pos - display_length + 2;
    } else if (new_sel_pos - new_view_pos - 1 < 0 && new_view_pos >= 1) {
      new_view_pos--;
    }
    return {sel: new_sel_pos, view: new_view_pos};
  }
  return {sel: sel_pos, view: view_pos};
}

// End of DISPLAYING section
// ----------------------------------------


// ########################################
// ### INVENTORY                        ###
// ########################################

function openInventory() {
  display_state.inventory_open = true;
  for (let i = 0; i < CAMERA_WIDTH; i++){
    addSprite(i, CAMERA_HEIGHT-1, inventory_background);
  }

  controls_help.inventory = true;
  
  
  let item_x = 0;
  display_state.inventory_onscreen = [];
  inventory.forEach((item, key) => {
    addSprite(item_x, CAMERA_HEIGHT-1, item.sprite);
    display_state.inventory_onscreen.push(key);
    if (item.qty > 1) {
      inventory_numbers.push({text: item.qty.toString(), options: {x: item_x*2, y: CAMERA_HEIGHT*2-1, color: color`2`}});
    }
    item_x++;
  });
  
  updateText();

  addSprite(0, CAMERA_HEIGHT-1, inventory_selection);
}

function closeInventory() {
  display_state.inventory_open = false;
  display_state.inventory_onscreen = [];
  inventory_numbers = [];
  if (display_state.mode == "world") {
    setView(world, view_x, view_y);
  } else if (display_state.mode == "base") {
    let x = player_sprite.x;
    let y = player_sprite.y;
    enterBase(in_base);
    player_sprite.x = x;
    player_sprite.y = y;
  }
  updateText();
}

// Close inventory and open it again and restore selection position
function refreshInventory() {
  let sel_x = getFirst(inventory_selection).x;
  closeInventory();
  openInventory();
  getFirst(inventory_selection).x = sel_x;
}

// Add item, that has only name, sprite, but can be more than 1
function addSimpleItem(item_name, sprite, qty) {
  if (inventory.has(item_name)) {
    inventory.get(item_name).qty += qty;
  } else{
    inventory.set(item_name, {sprite: sprite, qty: qty});
  }  
}

function useShovel() {
  for (let i in hidden_items) {
    if (!hidden_items[i].found && hidden_items[i].x == player_x && hidden_items[i].y == player_y) {
      hidden_items[i].found = true;
      if (hidden_items[i].item == "potion") {
        addSimpleItem("hp_potion", hp_potion, 10)
        refreshInventory();
        text_onetime.push({text: "Item found", options: {x: 0, y: 13, color: color`0`}});
        playSoundIfOn(collect_item_sound);
      } else if (hidden_items[i].item == "points") {
        score += 500;
        text_onetime.push({text: "+500", options: {x: 0, y: 2, color: color`0`}});
      }
      return;
    }
  }
  text_onetime.push({text: "Nothing found", options: {x: 0, y: 8, color: color`0`}});
}

// End of INVENTORY section
// ----------------------------------------


// ########################################
// ### TELEPORTATION                    ###
// ########################################

// Enabling portal is in COMPUTER section.

const teleportation_list_length = 13;

function renderTeleportationList(selection_pos, view_pos) {
  clearText();
  addText("TELEPORTATION", {x:3, y:0, color: color`7`});

  let portals = display_state.portals.slice(view_pos, view_pos + teleportation_list_length);
  
  for (let b in portals) {
    let portal_string = "X=" + (bases[portals[b]].x - WORLD_SIZE/2+1).toString() + ", Y=" + (bases[portals[b]].y - WORLD_SIZE/2+1).toString();
    if (selection_pos == view_pos+Number(b)){
      addText(">" + portal_string, {x: 3, y: Number(b)+2, color: color`4`});
    } else {
      addText(" " + portal_string, {x: 3, y: Number(b)+2, color: color`7`});
    }
  }
  
  display_state.teleportation_sel = selection_pos;
  display_state.teleportation_view = view_pos;
}

function scrollTeleportationList (delta_pos) {
  let portals_length = display_state.portals.length;
  let pos = scrollList(portals_length, display_state.teleportation_sel, display_state.teleportation_view, teleportation_list_length, delta_pos);

  renderTeleportationList(pos.sel, pos.view);
}

function teleportationMenu() {
  const bg_map = map`
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK`;
  setMap(bg_map);
  display_state.mode = "teleportation";

  display_state.portals = [];
  for (let b in bases) {
    if (bases[b].portal_power) {
      display_state.portals.push(b);
    }
  }
  renderTeleportationList(0, 0);
  music_playback = playSoundIfOn(music_portal_menu, true);
}

function teleport() {
  playSoundIfOn(teleportation_sound);
  let base_idx = display_state.portals[display_state.teleportation_sel];
  enterBase(base_idx);
  updateText();
  player_sprite.x = base_portal_x;
  player_sprite.y = base_portal_y+1;
  player_x = bases[base_idx].x;
  player_y = bases[base_idx].y;
  view_x = player_x - 3;
  view_y = player_y - 3;
}

// End of TELEPORTATION section
// ----------------------------------------


// ########################################
// ### CONTROLS                         ###
// ########################################

// w, a, s, d
function moveInput(x, y) {
  if (display_state.mode != "death" && display_state.mode != "sound_menu" && !display_state.file_menu) {
    if (display_state.inventory_open) {
      getFirst(inventory_selection).x += x; // select items in inventory (a, d)
    } else if (display_state.floppy_disk) {
      scrollFloppyDiskList(y); // select files on floppy disk (w, s)
    } else if (display_state.mode == "teleportation") {
      scrollTeleportationList(y); // select portals (w, s)
    } else {
      // Move player (w, a, s, d)
      player_sprite.x += x;
      player_sprite.y += y;
    }
  }
}


onInput("w", () => {
  moveInput(0, -1);
});
onInput("s", () => {
  moveInput(0, 1);
});
onInput("a", () => {
  moveInput(-1, 0);
});
onInput("d", () => {
  moveInput(1, 0);
});

// Use or exit computer / collect item
onInput("i", () => {
  if (!display_state.inventory_open && display_state.mode == "base"){
    let sprites = getTile(player_sprite.x, player_sprite.y-1);
    for (let s in sprites) {
      if (sprites[s].type == monitor_on || sprites[s].type == monitor_off) {
        useComputer();
        break;
      }
      if (sprites[s].type == table && bases[in_base].tableitem != null) {
        // Collect item
        playSoundIfOn(collect_item_sound);
        if (bases[in_base].tableitem[0] == "hp_potion") {
          addSimpleItem("hp_potion", hp_potion, 1);
        } else {
          inventory.set(bases[in_base].tableitem[0], bases[in_base].tableitem[1]);
        }
        getFirst(bases[in_base].tableitem[1].sprite).remove();
        bases[in_base].tableitem = null;
        break;
      }
    }
  } else if (display_state.mode == "computer" && !display_state.computer_progress) {
    // Exit computer
    closeWindow();
    enterBase(in_base);
    updateText();
    player_sprite.x = 2;
    player_sprite.y = 2;
  } else if (display_state.mode == "teleportation") {
    // Exit teleportation menu
    enterBase(in_base);
    updateText();
    player_sprite.x = base_portal_x;
    player_sprite.y = base_portal_y+1;
  }
});

// Attack / select
onInput("k", () => {
  if (display_state.mode == "sound_menu") {
    setSound(2);
  }
  if (display_state.mode == "computer" && !display_state.computer_progress) {
    // Copy file
    let file = getFileUnderCursor();
    if (display_state.file_menu) {
      if (inventory.has("floppy_disk")) {
        if (file != null) {
          copyFile(file.idx);
        }
      } else {
        closeWindow();
        showError("No\nexternal\ndrive\nconnected");
      }
    } else if (!display_state.file_open) {
      if (file != null) {
        // Click icon
        if (file.type == "file") {
          openFile(in_base, file.idx, false);
        } else if (file.type == "floppy_disk") {
          openFloppyDisk();
        } else if (file.type == "portal_control") {
          enablePortal();
        }
      }
    } else if (display_state.floppy_disk) {
      // Open file from floppy disk
      let floppy_file = inventory.get("floppy_disk").files[display_state.floppy_disk_sel];
      openFile(floppy_file.base, floppy_file.idx, bases[in_base].playerbase);
    } else {
      closeWindow();
    }
  } else if (display_state.mode == "world" && !display_state.inventory_open) {
    // Attack
    let attack_chunks = new Map();
    if (player_x > 0) {
      let chunk = getChunk(player_x-1, player_y);
      attack_chunks.set([chunk.x, chunk.y].toString(), chunk);
    }
    if (player_x < WORLD_SIZE-2) {
      let chunk = getChunk(player_x+1, player_y);
      attack_chunks.set([chunk.x, chunk.y].toString(), chunk);
    }
    if (player_y > 0) {
      let chunk = getChunk(player_x, player_y-1);
      attack_chunks.set([chunk.x, chunk.y].toString(), chunk);
    }
    if (player_y < WORLD_SIZE-2) {
      let chunk = getChunk(player_x, player_y+1);
      attack_chunks.set([chunk.x, chunk.y].toString(), chunk);
    }
    
    attack_chunks.forEach((c) => {
      let chunk_x = c.x;
      let chunk_y = c.y;
      let attack_enemies = [];
      enemies_chunks[chunk_x][chunk_y].forEach((e) => {
        if ((Math.abs(e.x - player_x) == 1 && e.y == player_y)
        ||(Math.abs(e.y - player_y) == 1 && e.x == player_x)) {
          attack_enemies.push(e);
        }
      });
      for (let e of attack_enemies) {
        // Remove enemy, modify its hp and, if it is > 0 add it back
        enemies_chunks[chunk_x][chunk_y].delete(e);
        e.hp -= player_level;
        controls_help.attack = true;
        if (e.hp <= 0) {
          addPoints(enemy_types.get(e.type).points);
          updateText();
          if (enemy_types.get(e.type).item == "hp_potion") {
            playSoundIfOn(collect_item_sound);
            addSimpleItem("hp_potion", hp_potion, 1);
          }
          world[e.y][e.x] &= ~(1<<4);
        } else {
          enemies_chunks[chunk_x][chunk_y].add(e);
        }
      }
    });
    updateEnemiesDisplay();
  }
  if (display_state.inventory_open) {
    // Use item
    let item_key = display_state.inventory_onscreen[getFirst(inventory_selection).x];
    if (item_key == "gps") {
      if (inventory.get(item_key).sprite == gps_on) {
        inventory.get(item_key).sprite = gps_off;
        playSoundIfOn(gps_off_sound);
      } else {
        inventory.get(item_key).sprite = gps_on;
        playSoundIfOn(gps_on_sound);
      }
      refreshInventory();
    } else if (item_key == "shovel") {
      useShovel();
    } else if (item_key == "hp_potion") {
      changeHp(30);
      inventory.get("hp_potion").qty--;
      if (inventory.get("hp_potion").qty <= 0) {
        inventory.delete("hp_potion");
      }
      refreshInventory();
    }
  }
  if (display_state.mode == "teleportation") {
    teleport();
  }
});

// Inventory
onInput("j", () => {
  if (display_state.mode == "sound_menu") {
    setSound(1);
  } else if (display_state.inventory_open) {
    closeInventory();
  } else if (display_state.mode != "computer" && display_state.mode != "death" && display_state.mode != "teleportation") {
    openInventory();
  }
});

// File menu
onInput("l", () => {
  if (display_state.mode == "sound_menu") {
    setSound(0);
  }
  if (display_state.file_menu) {
    closeWindow();
  } else if (display_state.mode == "computer" && !display_state.file_open && getFileUnderCursor() != null) {
    if (getFileUnderCursor().type == "file") {
      showFileMenu();
    }
  }
})

afterInput(() => {
  if (display_state.mode != "death" && display_state.mode != "sound_menu") {
    if (in_base == -1) {
      player_x = player_sprite.x + view_x;
      player_y = player_sprite.y + view_y;

      // Move view if player close to edge of screen
      if (player_x - view_x < VIEW_MARGIN && view_x != 0) {
        setView(world, view_x-1, view_y);
      } else if (player_x - view_x > CAMERA_WIDTH - VIEW_MARGIN - 1 && view_x + CAMERA_WIDTH != WORLD_SIZE-1) {
        setView(world, view_x+1, view_y);
      } else if (player_y - view_y < VIEW_MARGIN && view_y != 0) {
        setView(world, view_x, view_y-1);
      } else if (player_y - view_y > CAMERA_HEIGHT - VIEW_MARGIN - 1 && view_y + CAMERA_HEIGHT != WORLD_SIZE-1) {
        setView(world, view_x, view_y+1);
      }

  
      // Enter base
      for (let b in bases) {
        if (bases[b].x == player_x && bases[b].y == player_y) {
          enterBase(b);
          closeInventory();
          break;
        }
      }
      updateText();
  
    } else {
      if (display_state.mode == "base") {
        if (player_sprite.x == base_door_x && player_sprite.y == base_door_y) {
          // Exit base
          in_base = -1;
          setView(world, view_x, view_y);
          display_state.mode = "world";
          updateEnemiesDisplay();
          closeInventory();
          music_playback = playSoundIfOn(music, true);
        } else if (player_sprite.x == base_portal_x && player_sprite.y == base_portal_y && bases[in_base].portal_power) {
          // Teleportation
          teleportationMenu();
        } else if (!controls_help.use && player_sprite.x == 2 && player_sprite.y == 2) {
          // Contorls help
          addText("(i) Use", {x: 0, y: CAMERA_HEIGHT*2-1, color: color`2`});
          controls_help.use = true;
        }
      }
    }
  } else if (restart_allowed) {
    showLoadingScreen();
    setTimeout(newGame, 50);
  }
});


// End of CONTROLS section
// ----------------------------------------


// ########################################
// ### SOUND MENU                       ###
// ########################################


function soundMenu() {
  display_state.mode = "sound_menu";
  setMap(black_bg);
  addSprite(1, 1, speaker_icon);
  addText("Enable sound?", {x: 5, y: 2, color: color`2`});
  addText("(k) On", {x: 2, y: 5, color: color`2`});
  addText("(l) Off", {x: 2, y: 6, color: color`2`});
  addText("(j) No music", {x: 2, y:7, color: color`2`});
}

function setSound(mode) {
  sound_mode = mode;
  showLoadingScreen();
  setTimeout(newGame, 50);
}

function playSoundIfOn(sound, music=false) {
  let playback = null;
  if (music) {
    if (sound_mode == 2) {
      playback = playTune(sound, Infinity);
    }
  } else if (sound_mode >= 1) {
    playback = playTune(sound);
  }
  return playback;
}


// End of SOUND MENU section
// ----------------------------------------



// ########################################
// ### PLAYER AND GAME                  ###
// ########################################

const game_over_map = map`
BBBBB
BBXBB
BBBBB
BBBBB`;

// Change player's HP and return true if player is alive
function changeHp(delta_hp) {
  player_hp += delta_hp;
  updateText();
  if (player_hp <= 0) {
    death();
    return false;
  }
  if (player_hp > 100) {
    player_hp = 100;
  }
  return true;
}

// Clear all intervals and display death screen with score
function death() {
  stopMusic();
  playSoundIfOn(death_sound);
  closeInventory();
  clearInterval(enemy_update_interval);
  clearInterval(spawn_interval);
  display_state.mode = "death";
  setMap(game_over_map);
  clearText();
  addText(score.toString(), {x:8, y:10, color: color`2`});

  // Wait 1 second before allowing to restart, so user will not accidentally restart
  // the game before seeing score.
  setTimeout(() => {restart_allowed=true}, 1000);
}

function addPoints(points) {
  score += points;
  if (score >= next_level && player_level < 10) { // 10 is max level
    next_level += 500;
    player_level++;
  }
}

function stopMusic() {
  if (music_playback != null) {
    music_playback.end();
    music_playback = null;
  }
}

const base_map = map`
wwwwwwwwww
wtmCfffwfw
wffffffwfw
wffffffwfw
wffffffffw
wffffffffw
dffffffffw
wwwwwwwwww`;

function enterBase(base_idx) {
  let new_base_map = base_map;
  if (bases[base_idx].computer_power) {
    new_base_map = new_base_map.replace(monitor_off, monitor_on);
  }
  if (bases[base_idx].playerbase) {
    new_base_map = new_base_map.replace(door, player_door);
  }
  setMap(new_base_map);
  in_base = base_idx;

  const table_x = 1;
  const table_y = 1;
  if (bases[base_idx].tableitem) {
    addSprite(table_x, table_y, bases[base_idx].tableitem[1].sprite);
  }

  if (bases[base_idx].portal_power) {
    addSprite(base_portal_x, base_portal_y, portal_on);
  } else {
    addSprite(base_portal_x, base_portal_y, portal_off);
  }

  display_state.mode = "base";
  addSprite(base_door_x, base_door_y, Player);
  player_sprite = getFirst(Player);

  stopMusic();
}

function newGame() {
  // Reset variables to default values
  world = [...Array(WORLD_SIZE)].map(e => new Uint8Array(WORLD_SIZE).fill(0));
  hidden_items = [];
  enemies_number = new Map();
  enemy_types.forEach((type, key) => {
    enemies_number[key] = 0;
  });
  enemies_chunks = [...Array(chunk_number)].map(e => Array(chunk_number).fill(null).map(() => (new Set())));
  
  bases = [];
  in_base = -1;
  display_state = { // object to store information about currently displayed things
    mode: "world", // can be: "world", "base", "computer", "teleportation", "death"
    inventory_open: false,
    file_open: false,
    file_menu: false,
    floppy_disk: false,
    floppy_disk_view: 0, // Floppy disk list view position
    floppy_disk_sel: 0, // Floppy disk selection position
    computer_progress: false,
    icons: [], // icons currently displayed
    inventory_onscreen: [],
    portals: [],
    teleportation_view: 0,
    teleportation_sel: 0,
  }
  restart_allowed = false;
  inventory = new Map();
  player_hp = 100;
  score = 0;
  player_level = 1;
  next_level = 500;

  // Generate new world
  generateWorld(WORLD_SIZE);
  addStructures();

  // Set player position to center
  player_x = (WORLD_SIZE/2)-1;
  player_y = (WORLD_SIZE/2)-1;
  
  // Set view to center
  setView(world, (WORLD_SIZE-CAMERA_WIDTH)/2, (WORLD_SIZE-CAMERA_HEIGHT)/2);

  // Add enemies and intervals
  spawnAllEnemies();
  spawn_interval = setInterval(spawnAllEnemies, 20000);

  updateText();

  enemy_update_interval = setInterval(updateEnemies, 200);


  music_playback = playSoundIfOn(music, true);
}

// End of PLAYER AND GAME section
// ----------------------------------------


soundMenu();
