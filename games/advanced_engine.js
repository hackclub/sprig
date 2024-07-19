/*
@title: advanced_engine
@author: TODO
@tags: []
@addedOn: 2024-07-00
*/

const LOGGING = false
const STARTING_LEVEL = 0
const MAX_LOGS = 10

/** The amount of time each tick should take, in milliseconds */
const TICKRATE_MS = 50

/** The default tick rate for TickCadenceBehaviors */
const TICKRATE_DEFAULT = 10

/** Draw player every 2 ticks */
const TICKRATE_PLAYER_ANIMATIONS = 2

/** Evaluate touch behaviors every 5 ticks */
const TICKRATE_TOUCH = 5

/** Evaluate follow behaviors every 20 ticks */
const TICKRATE_FOLLOW = 20

/** Evaluate attack behaviors every 15 ticks */
const TICKRATE_ATTACK = 15

/** Evaluate push behaviors every 15 ticks */
const TICKRATE_PUSH = 5

const player = "p";
const enemy = "e";
const wall = "w";
const background = 'b';
const player_up_walk_1 = "z";
const player_down_walk_1 = "y";
const player_up_walk_2 = "x";
const player_down_walk_2 = "v";
const player_right_walk_2 = "t";
const player_right = "u";
const player_right_walk_1 = "h";
const player_down = "q";
const player_up = "r";
const player_left_walk_1 = "l";
const player_left = "m";
const player_left_walk_2 = "n";
const stairs = 'g';
const stairsDown = 'O';
const stairsDownHalf = 'P';
const stairsUp = 'i';
const teleport1_from = 'T';
const teleport1_from_anim = 'J';
const teleport1_to = 'U';
const teleport1_to_anim1 = "Z";
const teleport1_to_anim2 = "V";
const boss1 = "A";
const boss1_anim1 = "B";
const leftArrow = 'C';
const leftArrow_anim1 = 'D';
const rightArrow = 'E';
const rightArrow_anim1 = 'F';
const upArrow = 'G';
const upArrow_anim1 = 'H';
const downArrow = 'I';
const downArrow_anim1 = 'S';
const separator = "K";
const spike = "L";
const spike_anim1 = "M";
const black = 'Y';
const bomb = 'α';
const bomb_anim1 = 'Α';
const bomb_anim2 = 'β';
const bomb_anim3 = 'Β';
const flame = 'Φ';
const rock = 'R';

setLegend(
  [player, bitmap`
................
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DD000DD0...
....0DD0D0DD0...
....0DD000DD0...
...02DD0DDDD20..
....0DD0DDDD0...
....002222200...
...0CC000000C0..
..02C0CCCCC000..
..020000000020..
..00.0CC0CC00...
.....0CC020.....
.....02200......`],
  [stairsDown, bitmap`
................
.CC..........CC1
.CC..........CCL
.CCCCCC333LCCCCL
.CCLLLL363L1LCCL
.CCL...363L..CCL
.CCCCCC363LCCCCL
.CCLLL1363LLLCCL
.CCL...363L..CCL
.CCC3CC363LC3CC1
.CCL33L363L33CCL
.CCLL3336333LCCL
.CCCCL33633LCCCL
.CCLLLL333LLLCCL
.CCL...LLL...CC1
................`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L01LLLLLLLLL0L0
0LL01LLLLLLL01L0
0LLL01LLLLL01LL0
0LLLL01LLL01LLL0
0LLLLL01L01LLLL0
0LLLLLL001LLLLL0
0LLLLLL001LLLLL0
0LLLLL01L01LLLL0
0LLLL01LLL01LLL0
0LLL01LLLLL01LL0
0LL01LLLLLLL01L0
0L01LLLLLLLLL0L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [background, bitmap`
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
2222222222222222
2222222222222222`],
  [teleport1_from, bitmap`
................
...0000000000...
...0000000000...
...7.7777.777...
...7777777777...
...777.7.7.77...
...7777777777...
...7.77.777.7...
...7777777777...
...777.777.7....
....7777.7777...
...77.77777.7...
...77777.7777...
...7.7.777.77...
...0000000000...
...0000000000...`],
  [teleport1_to, bitmap`
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
..777777777777..
.77002000002007.
.70000002000077.
..777777777777..
................`],
  [boss1, bitmap`
....333..33..333
..333..333..33..
..3...33...33...
..30000000000...
..000000000000..
..003330033300..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000LLLLLL000..
..000000000000..
...0000000000...
................
................
................`],
  [leftArrow, bitmap`
................
................
.........655556.
........655556..
.......655556...
......655556....
.....655556.....
....655556......
....655556......
.....655556.....
......655556....
.......655556...
........655556..
.........655556.
................
................`],
  [rightArrow, bitmap`
................
................
.655556.........
..655556........
...655556.......
....655556......
.....655556.....
......655556....
......655556....
.....655556.....
....655556......
...655556.......
..655556........
.655556.........
................
................`],
  [downArrow, bitmap`
................
..6..........6..
..56........65..
..556......655..
..5556....6555..
..55556..65555..
..655556655556..
...6555555556...
....65555556....
.....655556.....
......6556......
.......66.......
................
................
................
................`],
  [upArrow, bitmap`
................
................
................
................
.......66.......
......6556......
.....655556.....
....65555556....
...6555555556...
..655556655556..
..55556..65555..
..5556....6555..
..556......655..
..56........65..
..6..........6..
................`],
  [spike, bitmap`
................
61............16
1111........1111
.1111LLLLLL1111.
.111LLLLLLLL111.
..1LLLL66LLLL1..
...LLLLLLLLLL...
...LL6LFFL6LL...
...LL6LFFL6LL...
...LLLLLLLLLL...
..1LLLL66LLLL1..
.111LLLLLLLL111.
.1111LLLLLL1111.
1111........1111
61............16
................`],
  [downArrow_anim1, bitmap`
................
................
................
................
..6..........6..
..56........65..
..556......655..
..5556....6555..
..55556..65555..
..655556655556..
...6555555556...
....65555556....
.....655556.....
......6556......
.......66.......
................`],
  [boss1_anim1, bitmap`
....L33..L3..L33
..L33..L33..L3..
..3...L3...L3...
..30000000000...
..000000000000..
..003630036300..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000LLLLLL000..
..000000000000..
...0000000000...
................
................
................`],
  [upArrow_anim1, bitmap`
................
.......66.......
......6556......
.....655556.....
....65555556....
...6555555556...
..655556655556..
..55556..65555..
..5556....6555..
..556......655..
..56........65..
..6..........6..
................
................
................
................`],
  [stairs, bitmap`
................
.CC..........CC1
.CC..........CCL
.CCCCCCCCCCCCCCL
.CCLLLL1LLL1LCCL
.CCL.........CCL
.CCCCCCCCCCCCCCL
.CCLLL1LL1LLLCCL
.CCL.........CCL
.CCCCCCCCCCCCCC1
.CCL1LLLLLL1LCCL
.CCL.........CCL
.CCCCCCCCCCCCCCL
.CCLLL1LL1LLLCCL
.CCL.........CC1
................`],
  [leftArrow_anim1, bitmap`
................
................
......655556....
.....655556.....
....655556......
...655556.......
..655556........
.655556.........
.655556.........
..655556........
...655556.......
....655556......
.....655556.....
......655556....
................
................`],
  [rightArrow_anim1, bitmap`
................
................
....655556......
.....655556.....
......655556....
.......655556...
........655556..
.........655556.
.........655556.
........655556..
.......655556...
......655556....
.....655556.....
....655556......
................
................`],
  [enemy, bitmap`
................
.......000......
.....00DDD00....
....0DDDDDDD0...
....0D0000DD0...
....0D0DDDDD0...
....0D0000DD0...
...02D0DDDDD20..
....0D0000DD0...
....002222200...
...0CC000000C0..
..02C0CCCCC000..
..020000000020..
..00.0CC0CC00...
.....0CC020.....
.....02200......`],
  [stairsDownHalf, bitmap`
.......333......
.CC....363...CC1
.CC....363...CCL
.CCCCCC363CCCCCL
.CCLLLL363L1LCCL
.CCL3..363..3CCL
.CCC33C363C33CCL
.CCLL3336333LCCL
.CCL..33333..CCL
.CCCCCCC3CCCCCC1
.CCL1LLLLLL1LCCL
.CCL.........CCL
.CCCCCCCCCCCCCCL
.CCLLL1LL1LLLCCL
.CCL.........CC1
................`],
  [player_up_walk_1, bitmap`
................
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
...02DDDDDDD20..
....0DDDDDDD0...
....002222200...
...0CC000000C0..
..02C0CCCCC000..
..020000000020..
..00.0CC0CC00...
.....0CC020.....
.....02200......`],
  [player_down_walk_1, bitmap`
................
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
....0D22D22D0...
...02202220220..
....020222020...
....002222200...
...0CC00000CC0..
...000CCCCC0C20.
...022000000020.
....000C0CC0.00.
......020CC0....
.......00220....`],
  [player_up_walk_2, bitmap`
................
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
...02DDDDDDD20..
....0DDDDDDD0...
....002222200...
...0C000000CC0..
...000CCCCC0C20.
...020000000020.
....00CC0CC0.00.
......020CC0....
.......00220....`],
  [player_down_walk_2, bitmap`
................
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
....0D22D22D0...
...02202220220..
....020222020...
....002222200...
...0CC00000CC0..
..02C0CCCCC000..
..020000000220..
..00.0CC0C000...
.....0CC020.....
.....02200......`],
  [player_right_walk_2, bitmap`
................
......0000......
....00DDDD00....
....0DDDDDD0....
...0DDDDDDDD0...
...0DDDDDDDD0...
...0DDDD22D0....
...0D0D22020....
....02022020....
.....0222220....
.....000000.....
....0C0C220.....
....0CC0CC0.....
.....022000.....
....00000C0.....
....02200220....`],
  [player_right, bitmap`
......0000......
....00DDDD00....
....0DDDDDD0....
...0DDDDDDDD0...
...0DDDDDDDD0...
...0DDDD22D0....
...0D0D22020....
....02022020....
.....0222220....
.....000000.....
.....0C020......
....0C0000......
....0CC220......
.....00000......
......0CC0......
......0220......`],
  [player_right_walk_1, bitmap`
................
......0000......
....00DDDD00....
....0DDDDDD0....
...0DDDDDDDD0...
...0DDDDDDDD0...
...0DDDD22D0....
...0D0D22020....
....02022020....
.....0222220....
.....000000.....
....0C0C2200....
...0C0CCCC020...
...020000000....
....00C0CC0.....
....02200220....`],
  [player_down, bitmap`
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
....0D22D22D0...
...02202220220..
....020222020...
....002222200...
...0CC00000CC0..
..0CCCC222CCCC0.
..0CC0CCCCC0CC0.
..0220000000220.
...000CCCCC000..
.....0CC0CC0....
.....0220220....`],
  [player_up, bitmap`
.......000......
.....00DDD00....
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
....0DDDDDDD0...
...02DDDDDDD20..
....0DDDDDDD0...
....002222200...
...0CC00000CC0..
..0CCCCCCCCCCC0.
..0CC0CCCCC0CC0.
..0220000000220.
...000CCCCC000..
.....0CC0CC0....
.....0220220....`],
  [player_left_walk_1, bitmap`
................
......0000......
....00DDDD00....
....0DDDDDD0....
...0DDDDDDDD0...
...0DDDDDDDD0...
....0D22DDDD0...
....02022D0D0...
....02022020....
....0222220.....
.....000000.....
.....022C0C0....
.....0CC0CC0....
.....000220.....
.....0C00000....
....02200220....`],
  [player_left, bitmap`
......0000......
....00DDDD00....
....0DDDDDD0....
...0DDDDDDDD0...
...0DDDDDDDD0...
....0D22DDDD0...
....02022D0D0...
....02022020....
....0222220.....
.....000000.....
......020C0.....
......0000C0....
......022CC0....
......00000.....
......0CC0......
......0220......`],
  [player_left_walk_2, bitmap`
................
......0000......
....00DDDD00....
....0DDDDDD0....
...0DDDDDDDD0...
...0DDDDDDDD0...
....0D22DDDD0...
....02022D0D0...
....02022020....
....0222220.....
.....000000.....
....0022C0C0....
...020CCCC0C0...
....000000020...
.....0CC0C00....
....02200220....`],
  [teleport1_from_anim, bitmap`
................
...0000000000...
...0000000000...
6..7.7177.777..6
...7777777757...
.F.777.7.7.77.F.
...7777767777...
6..1.77.777.7..6
...7577777777...
...777.777.7.F..
.F..7777.7717...
...77.67777.7...
6..77777.7767..6
...7.7.757.77...
...0000000000...
...0000000000...`],
  [teleport1_to_anim1, bitmap`
................
..1.............
..F......1......
.........F......
............1...
.....1..1...F...
.....F..F.......
..........1.....
..1.......F..1..
..F..........F..
................
..777777777777..
.77002000002007.
.70000002000077.
..777777777777..
................`],
  [teleport1_to_anim2, bitmap`
................
................
..F.............
..6......F......
.........6......
............F...
.....F..F...6...
.....6..6.......
..........F.....
..F.......6..F..
..6..........6..
..777777777777..
.77002000002007.
.70000002000077.
..777777777777..
................`],
  [spike_anim1, bitmap`
.61..........16.
.1111......1111.
..1111....1111..
..112LLLLLL211..
...1LLLLLLLL1...
...LLLL66LLLL...
...LLLLLLLLLL...
...LL6LF3L6LL...
...LL6L3FL6LL...
...LLLLLLLLLL...
...LLLL66LLLL...
...1LLLLLLLL1...
..112LLLLLL211..
..1111....1111..
.1111......1111.
.61..........16.`],
  [stairsUp, bitmap`
................
.CC..........CC1
.CC..........CCL
.CCCCCCCCCCCCCCL
.CCLLLL1LLL1LCCL
.CCL.........CCL
.CCCCCCCCCCCCCCL
.CCLLL1LL1LLLCCL
.CCL.........CCL
.CCCCCCCCCCCCCC1
.CCL1LLLLLL1LCCL
.CCL.........CCL
.CCCCCCCCCCCCCCL
.CCLLL1LL1LLLCCL
.CCL.........CC1
................`],
  [black, bitmap`
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
  [bomb, bitmap`
.........9......
........CC......
.......CC.......
...0000000000...
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
................`],
  [bomb_anim1, bitmap`
.........9......
........9C......
.......CC.......
...0000000000...
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
................`],
  [bomb_anim2, bitmap`
................
........99......
.......C9.......
...0000000000...
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
................`],
  [bomb_anim3, bitmap`
................
.......9........
.......99.......
...0000000000...
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
................`],
  [flame, bitmap`
................
................
...........99...
..99....9..99...
9969.9.99.9969..
.99699.9699699..
..99699666699...
.9966666666699..
.96666666666699.
.96666999966669.
.966699999966699
.966999999996669
9966999999996669
9669999999996669
9669999999999669
9699999999999669`],
  [rock, bitmap`
................
....LLLLLLLL....
...LLLLLLLLLL...
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
...LLLLLLLLLL...
....LLLLLLLL....
................`]
)

const mainLevelMusic = tune`
243.90243902439025: E4~243.90243902439025 + C5~243.90243902439025 + B5^243.90243902439025,
243.90243902439025: E4~243.90243902439025 + C5~243.90243902439025,
243.90243902439025: E4~243.90243902439025 + C5~243.90243902439025,
243.90243902439025: E4~243.90243902439025 + C5~243.90243902439025 + G5^243.90243902439025,
243.90243902439025: E4~243.90243902439025 + B4~243.90243902439025,
243.90243902439025: E4~243.90243902439025 + B4~243.90243902439025,
243.90243902439025: E4~243.90243902439025 + B4~243.90243902439025 + B5-243.90243902439025,
243.90243902439025: E4~243.90243902439025 + B4~243.90243902439025 + A5-243.90243902439025,
243.90243902439025: E5~243.90243902439025 + C5^243.90243902439025,
243.90243902439025: E5~243.90243902439025 + C5^243.90243902439025,
243.90243902439025: E5~243.90243902439025 + B4^243.90243902439025,
243.90243902439025: E5~243.90243902439025 + B4^243.90243902439025,
243.90243902439025: D5~243.90243902439025,
243.90243902439025: D5~243.90243902439025,
243.90243902439025: D5~243.90243902439025 + A5~243.90243902439025 + B5~243.90243902439025 + E4-243.90243902439025,
243.90243902439025: D5~243.90243902439025 + A5~243.90243902439025 + B5~243.90243902439025 + D4-243.90243902439025,
243.90243902439025: B4~243.90243902439025,
243.90243902439025: B4~243.90243902439025,
243.90243902439025: B4~243.90243902439025 + F4^243.90243902439025,
243.90243902439025: B4~243.90243902439025 + E4^243.90243902439025,
243.90243902439025: B4~243.90243902439025 + D4^243.90243902439025,
243.90243902439025: B4~243.90243902439025 + C4^243.90243902439025,
243.90243902439025: B4~243.90243902439025 + E4^243.90243902439025,
243.90243902439025: B4~243.90243902439025 + G4^243.90243902439025,
243.90243902439025: B5~243.90243902439025 + F5^243.90243902439025,
243.90243902439025: B5~243.90243902439025 + D5^243.90243902439025,
243.90243902439025: B5~243.90243902439025 + B4-243.90243902439025,
243.90243902439025: B5~243.90243902439025 + A4-243.90243902439025,
243.90243902439025: A5~243.90243902439025,
243.90243902439025: A5~243.90243902439025 + G4^243.90243902439025,
243.90243902439025: A5~243.90243902439025 + G4^243.90243902439025 + G5-243.90243902439025,
243.90243902439025: A5~243.90243902439025 + C4^243.90243902439025 + F5-243.90243902439025`
const secondLevelMusic = tune`
337.07865168539325: G5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: A5~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: F5~337.07865168539325 + F4/337.07865168539325,
337.07865168539325: G5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: E5~337.07865168539325 + E4/337.07865168539325,
337.07865168539325: D5~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: C5~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: B4~337.07865168539325 + D4/337.07865168539325,
337.07865168539325: C5~337.07865168539325 + D4/337.07865168539325`
const walkUpAnimations = [player_up, player_up_walk_1, player_up_walk_2]
const walkLeftAnimations = [player_left, player_left_walk_1, player_left_walk_2]
const walkRightAnimations = [player_right, player_right_walk_1, player_right_walk_2]
const walkDownAnimations = [player_down, player_down_walk_1, player_down_walk_2]
const stairDownAnimations = [stairs, stairsDownHalf, stairsDown]
const teleport1_from_animations = [teleport1_from, teleport1_from_anim]
const teleport1_to_animations = [teleport1_to, teleport1_to_anim2, teleport1_to_anim1]
const boss1Animations = [boss1, boss1_anim1]
const leftArrowAnimations = [leftArrow, leftArrow_anim1]
const upArrowAnimations = [upArrow, upArrow_anim1]
const rightArrowAnimations = [rightArrow, rightArrow_anim1]
const downArrowAnimations = [downArrow, downArrow_anim1]
const spikeAnimations = [spike, spike_anim1]
const bombAnimations = [bomb, bomb_anim1, bomb_anim2, bomb_anim3]

const levels = [
  map`
wwwwwwwwww
w........w
w........w
w...AAA..w
w........w
w........w
wp.......w
wwwwwwwwww`,
  map`
wwwwwwwwww
wLwTwwU..w
w.w.www.ww
w...www.ww
w...www.ww
w.w.www.ww
wpwLww..Ow
wwwwwwwwww`,
  map`
wwwOwww
wwwUwww
wwwAwww
www.www
www.www
wwwpwww
wwwTwww`,
  map`
wwwwwww
wA.O.Aw
w.www.w
w.w.w.w
w.....w
w.w.w.w
w..p..w`,
  map`
Owwwwww
Uww.www
ww...ww
wA.p..w
ww...ww
wwwAwww
wwwTwww`,
  map`
wwwwwww
w.CCCC.
w.wwww.
w.wOCw.
w.ww.w.
wA...w.
wwwwwwp`,
  map`
wwwOwww
wwwHwww
wwwHwww
pEEEEEA
wwwHwww
wwwHwww
wwwAwww`,
  map`
wwwOwww
www.www
www.www
pEEEEEA
wwwwwww
wwwwwww
wwwwwww`,
  map`
wwwwwww
wwwwwww
wLLLLLw
p.....O
wLLLLLw
wwwwwww
wwwwwww`,
  map`
wwwpwww
ICCICCw
EwwIwGw
IAwEE.I
EwLLLwI
.E.GICC
OwwCEww`,
  map`
wwwpwww
www.Lww
www.Lww
www...w
wwwwECL
wLwI..w
OAC.Lww`,
  map`
pTwwAww
wwww.ww
wwA..Ow
wwwww.w
wwwww.C
wwwwwBG
wwwwwwU`,
]

const blackMap = map`
YYYYYYYYY
YYYYYYYYY
YYYYYYYYY
YYYYYYYYY
YYYYYYYYY
YYYYYYYYY
YYYYYYYYY
YYYYYYYYY`
const music = [mainLevelMusic]

const NAVIGABLE = 0
const WALL = 1
const VISITED = 2

/** A real-time game engine that supports animations, built atop the Spade API */
class GameEngine {
  /**
   * @constructor
   * @param {function} onInit - A callback that is called when the game engine is initializing a new level.
   * @param {function} onWorldLoaded - A callback that is called when the game engine finishes loading a new level.
   * @param {function} onTileLoaded - A callback that is called when the game engine is attempting to load each tile during level loading.  This is generally where you'd create your GameObject's.
   * @param {integer} initialLevel - The initial level to load
   * @param {integer} msPerTick - How fast each game tick should take, in milliseconds
   */
  constructor(onInit, onWorldLoaded, onTileLoaded, initialLevel, msPerTick) {
    this.msPerTick = msPerTick
    this.onInit = onInit
    this.onWorldLoaded = onWorldLoaded
    this.onTileLoaded = onTileLoaded
    this.level = initialLevel
    this.reset(true)
  }

  /**
   * Clears all state from the game engine, unloads the currently loaded level, and loads the currently-configured level
   * @param {boolean} shouldStart - Whether or not to automatically start the engine after resetting
   */
  reset(shouldStart = false) {
    this.running = false
    this.maxLogs = MAX_LOGS
    this.tickCount = 0
    this.logs = []
    this.managedObjects = []
    this.navMap = null
    this.map = null
    this.inputHandler = null
    this.lastInput = null
    this.protagonist = null
    this.deleteAllTiles()
    if (this.music != null) this.music.end()
    this.music = null
    this.endOfTickWork = []

    this.onInit(this, this.level)
    if (this.map == null) {
      throw new Error("Map not initialized")
    }

    setMap(this.map)
    this.onWorldLoaded(this, this.level)
    this.loadTiles()

    this.recreateNavigationMap()
    if (shouldStart)
      this.start()
    this.tick()
  }

  /** @private */
  loadTiles() {
    let allTiles = getAll()
    let i
    let allTilesLen = allTiles.length
    for (i = 0; i < allTilesLen; i++) {
      let tile = allTiles[i]
      this.onTileLoaded(this, tile)
    }
  }

  /**
   * Registers a piece of work (callback) to be performed at the end the current tick
   * @param {function} work - The work to be performed after the current tick fully evaluates
   */
  scheduleAtEndOfTick(work) {
    this.endOfTickWork.push(work)
  }

  /** @private */
  deleteAllTiles() {
    let allTiles = getAll()
    let i
    for (i = 0; i < allTiles.length; i++) {
      allTiles[i].remove()
    }
  }

  /**
   * Log a message.  This will only work if the LOGGING feature flag is enabled.
   * @param {string} msg - The log you want to emit
   */
  log(msg) {
    this.logs.push(msg)
    if (this.logs.length > this.maxLogs)
      this.logs.shift()
  }

  /**
   * Retrieve the first game object encountered whose tile type currently equals the provided example
   * @param {string} type - The type of tile you are looking for
   */
  getFirst(type) {
    let i
    for (i = 0; i < this.managedObjects.length; i++) {
      if (type === this.managedObjects[i].type)
        return this.managedObjects[i]
    }
    return null
  }

  /**
   * Start playing a tune
   * @param {tune} tune - The tune you'd like to play
   */
  playMusic(tune) {
    if (this.music != null) {
      this.music.stop()
    }
    //this.music = playTune(tune, Infinity)
  }

  /** @private */
  emitLogs() {
    if (LOGGING) {
      for (let i = 0; i < this.logs.length; i++) {
        addText(this.logs[i], { x: 5, y: height() - this.maxLogs + i + 3, color: color`3` })
      }
    }
  }

  /**
   * Sets the current level to a new value
   * @param {integer} level - A new value for the currently configured level
   */
  setLevel(level) { this.level = level }

  /** Retrieve the currently configured level */
  getLevel() { return this.level }

  /** Retrieve the width dimension of the currently loaded map */
  getWidth() { return width() }

  /** Retrieve the height dimension of hte currently loaded map */
  getHeight() { return height() }

  /**
   * Configure a new map
   * @param {map} map - The new map that you want to load
   */
  setMap(map) { this.map = map }

  /** @private */
  indexManagedObjects() {
    this.managedObjectIndex = []
    let x
    let y
    for (x = 0; x < width(); x++) {
      this.managedObjectIndex.push([]);
      for (y = 0; y < height(); y++) {
        this.managedObjectIndex[x].push(this.getManagedObjectsAt(x, y))
      }
    }
  }

  /** @private */
  recreateNavigationMap() {
    this.navMap = []
    let x
    let y
    for (x = 0; x < width(); x++) {
      this.navMap.push([]);
      for (y = 0; y < height(); y++) {
        this.navMap[x].push(this.isNavigable(x, y) ? NAVIGABLE : WALL)
      }
    }
  }

  /** @private */
  logMap() {
    let x
    let y
    let output = ""
    for (x = 0; x < width(); x++) {
      for (y = 0; y < height(); y++) {
        output += this.navMap[x][y]
      }
      output += "\n"
    }
    console.log(output)
  }

  /**
   * Checks to see if a coordinate is navigable
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   */
  isNavigable(x, y) {
    if (this.isWall(x, y)) return false

    // NOTE - could do custom nav logic by inspecting these
    let managedObjects = this.getManagedObjectsAt(x, y)

    return true
  }

  /**
   * Checks to see if a coordinate is a wall
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   */
  isWall(x, y) {
    let tiles = getTile(x, y)
    let i
    for (i = 0; i < tiles.length; i++) {
      if (tiles[i].type === wall) return true
    }
    return false
  }

  /**
   * Checks if the GameObjects in a tile can be pushed
   * 
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   * @param {GameObject} objectCheck - The GameObject to check if it can be pushed by
   * @returns {GameObject[]} - The GameObjects in the tile that can be pushed
   */
  isPushable(x, y, objectCheck) {
    let objects = this.getManagedObjectsAt(x, y)
    let result = []

    objects.forEach((object) => {
      let behavior = object.getBehavior(PushableBehavior)
      if (!behavior) return;
      if (!behavior.canBePushedBy(objectCheck)) return;

      result.push(object)
    })

    return result
  }

  /**
   * Creates a new nav map on behalf of an agent
   * @param {GameObject} agent - A game object for whom you would like to create a nav map for
   */
  getFreshNavigationMap(agent) {
    let x
    let y
    for (x = 0; x < width(); x++) {
      for (y = 0; y < height(); y++) {
        if ((agent.x == x && agent.y == y) || this.navMap[x][y] == VISITED)
          this.navMap[x][y] = NAVIGABLE
      }
    }
    return this.navMap
  }

  /**
   * Retrieves all GameObject's at a current coordinate
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   */
  getManagedObjectsAt(x, y) {
    let ret = []
    let i
    for (i = 0; i < this.managedObjects.length; i++) {
      let obj = this.managedObjects[i]
      if (obj.x == x && obj.y == y)
        ret.push(obj)
    }
    return ret
  }

  /** @private */
  tick() {
    if (!this.running)
      return

    clearText()
    this.emitLogs()

    this.tickCount += 1
    this.indexManagedObjects()
    this.recreateNavigationMap()
    this.handleInput()
    this.managedObjects.forEach(obj => obj.tick())
    this.endOfTickWork.forEach(work => work());
    this.endOfTickWork = []
  }

  /** Stops (pauses, technically) the engine */
  stop() {
    this.running = false
  }

  /** Starts the engine */
  start() {
    this.running = true
    let me = this
    if (this.tickTimer == null) {
      // Schedule game ticks at an even cadence
      this.tickTimer = setInterval(function() {
        me.tick();
      }, me.msPerTick);
    }
  }

  /** Retrieve the current (ever-increasing) tick count */
  getTick() {
    return this.tickCount
  }

  /**
   * Retrieve all GameObject's within a given radius, centered on a coordinate
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   * @param {float} radius - The radius of your selection
   */
  spatialSelect(x, y, radius) {
    let objects = []
    let i;
    for (i = 0; i < this.managedObjects.length; i++) {
      let go = this.managedObjects[i]
      if (this.distanceBetween(x, y, go.x, go.y) <= radius)
        objects.push(go)
    }
    return objects
  }

  /** @private */
  addGameObject(go) {
    this.managedObjects.push(go);
  }

  /** @private */
  removeGameObject(go) {
    let index = this.managedObjects.indexOf(go);
    if (index !== -1) {
      this.managedObjects.splice(index, 1);
    }
  }

  /**
   * Registers a new callback handler for input.  The registered method is called at the appropriate time during the tick to handle commands from the user.  GameEngine::popLastInput can be utilized to retrieve the last command.
   * @param {function} inputHandler - A method that is called by the engine at the appropriate time for handling input from the user
   */
  setInputHandler(inputHandler) {
    this.inputHandler = inputHandler
  }

  /**
   * Notify the engine of the last key pressed.  This is generally consumed at a later point within the input handler (see setInputHandler, popLastInput)
   * @param {string} input - A key that was pressed
   */
  setLastInput(input) {
    this.lastInput = input
  }

  /** Returns the GameObject that has been registered with the engine as the protagonist */
  getProtagonist() { return this.protagonist; }

  /**
   * Sets a GameObject to the current protagonist.
   * @param {GameObject} protagonist - A GameObject that represents the player/user
   */
  setProtagonist(protagonist) { this.protagonist = protagonist }

  /** @private */
  handleInput() {
    if (this.inputHandler != null)
      this.inputHandler(this)
    else
      console.log("warning: no input handler")
  }

  /**
   * Checks whether a given coordinate is within the boundaries of the currently loaded map.
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   */
  withinBounds(x, y) {
    return x >= 0 && y >= 0 && y < this.getHeight() && x < this.getWidth()
  }

  /** @private */
  addTile(x, y, type) {
    addSprite(x, y, type)
  }

  /**
   * Calculates the distance between two coordinates
   * @param {float} x1 - The x coordinate of the first object
   * @param {float} y1 - The y coordinate of the first object
   * @param {float} x2 - The x coordinate of the second object
   * @param {float} y2 - The y coordinate of the second object
   */
  distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
  }

  /** Retrieves (and subsequently clears) the last input registered with the GameEngine */
  popLastInput() {
    let inp = this.lastInput;
    this.lastInput = null;
    return inp;
  }

  /**
   * Clamps the direction to (-1, +1) on both axis
   * @param {GameEngine~Position} direction - The direction to be clamped
   * @returns {GameEngine~Position}
   */
  clampDirection(direction) {
    let x = direction.x > 0 ? 1 : -1
    if (direction.x == 0)
      x = 0;

    let y = direction.y > 0 ? 1 : -1
    if (direction.y == 0)
      y = 0

    return {x: x, y: y}
  }

  /**
   * @typedef {Object} GameEngine~Position
   * @property {integer} x - The wall X
   * @property {integer} y - The wall Y
   */

  /**
   * @typedef {Object} GameEngine~RaycastResult
   * @property {GameEngine~Position} wall - The wall
   * @property {integer} freeSpaces - The amount of the free spaces
   */

  /**
   * @typedef {Object} GameEngine~RaycastResultCombined
   * @property {GameEngine~RaycastResult} x
   * @property {GameEngine~RaycastResult}
   */

  /**
   * Sends a raycast to both x, Y axis
   * @param {GameEngine} engine - The current game engine instance
   * @param {integer} startX - The raycast x coordinate
   * @param {integer} startY - The raycast y coordinate
   * @param {GameEngine~Position } direction - The raycast direction
   * 
   * @returns {GameEngine~RaycastResultCombined}
   */
  raycast(engine, startX, startY, direction) {
    const clampedDirection = this.clampDirection(direction)
    return {x: this.raycastX(engine, startX, startY, clampedDirection.x), y: this.raycastY(engine, startX, startY, clampedDirection.y)}
  }

  /**
   * Starts a raycast on the X axis
   * 
   * @param {GameEngine} engine - The current game engine instance
   * @param {integer} startX - The raycast start X
   * @param {integer} startY - The raycast start Y
   * @param {integer} direction - The raycast direction (positive or negative)
   * @param {string} pushedBy - The object to try if it can push others
   * @returns {GameEngine~RaycastResult} - Raycast Resuslt
   */
  raycastX(engine, startX, startY, direction, pushedBy = undefined) {
    let hitWall, hitPushable = undefined, pushables = [], freeSpaces = 0;
    let offset = direction > 0 ? 1 : -1;

    let x = startX
    while (!hitWall && x < engine.getWidth() && x >= 0) {
      if (engine.isWall(x, startY))
        hitWall = {x: x, y: startY}
      freeSpaces++
      x += offset

      if (!pushedBy) continue;
      let isPushable = engine.isPushable(x - offset, startY, pushedBy)
      const hasPushable = isPushable.length > 0

      if (hitPushable == true) {
        if (!hasPushable) {
          hitPushable = false
        } else {
          pushables.push(isPushable)
        }
      }

      if (hitPushable == undefined) {
        if (hasPushable) {
          hitPushable = true
          pushables.push(isPushable)
        } else {
          hitPushable = false
        }
      }
    }

    return {wall: hitWall, freeSpaces: freeSpaces - 2, pushables: pushables.flat()}
  }

  /**
   * Starts a raycast on the Y axis
   * 
   * @param {GameEngine} engine - The current game engine instance
   * @param {integer} startX - The raycast start X
   * @param {integer} startY - The raycast start Y
   * @param {integer} direction - The raycast direction (positive or negative)
   * @returns {GameEngine~RaycastResult} - Raycast Resuslt
   */
  raycastY(engine, startX, startY, direction, pushedBy = undefined) {
    let hitWall, hitPushable = undefined, pushables = [], freeSpaces = 0;
    let offset = direction > 0 ? 1 : -1;

    let y = startY
    while (!hitWall && y < engine.getHeight() && y >= 0) {
      if (engine.isWall(startX, y))
        hitWall = {x: startX, y: y}
      freeSpaces++
      y += offset

      if (!pushedBy) continue;
      let isPushable = engine.isPushable(startX, y - offset, pushedBy)
      const hasPushable = isPushable.length > 0

      if (hitPushable == true) {
        if (!hasPushable) {
          hitPushable = false
        } else {
          pushables.push(isPushable)
        }
      }

      if (hitPushable == undefined) {
        if (hasPushable) {
          hitPushable = true
          pushables.push(isPushable)
        } else {
          hitPushable = false
        }
      }
    }

    return {wall: hitWall, freeSpaces: freeSpaces - 2, pushables: pushables.flat()}
  }
}

function deepCopy(o) {
  var copy = o,
    k;
  if (o && typeof o === 'object') {
    copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
    for (k in o) {
      copy[k] = deepCopy(o[k]);
    }
  }
  return copy;
}

function getRandomRange(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

/** Represents a single game object that will be managed by the GameEngine */
class GameObject {
  /**
   * Create a new GameObject.  This generally represents an entity that can be seen on screen and has a location on the currently loaded map.
   * @param {GameEngine} gameEngine - The context GameEngine for your new game entity.
   * @param {integer} x - The initial x coordinate for your GameObject
   * @param {integer} y - The initial y coordinate for your GameObject
   * @param {string} type - The initial (Sprig/Spade) tile type for your GameObject.
   * @param {boolean} canOverlap - If the GameObject can overlap with other GameObjects
   */
  constructor(gameEngine, x, y, type, canOverlap = false) {
    this.x = x
    this.y = y
    this.type = type
    this.displayType = type
    this.canOverlap = canOverlap
    this.gameEngine = gameEngine
    this.destroyed = false
    this.behaviors = []
    this.lastMoveTick = gameEngine.getTick()
    gameEngine.addTile(x, y, this.displayType)
    gameEngine.addGameObject(this)
  }

  /** Retrieves the last tick that this GameObject moved */
  getLastMoveTick() {
    return this.lastMoveTick
  }

  /** The GameObject's main tick method.  This method is called every TICKRATE_MS milliseconds by the GameEngine that manages this object. */
  tick() {
    let i
    for (i in this.behaviors) {
      if (this.destroyed) break;
      
      let behavior = this.behaviors[i]
      behavior.tick();
    }
  }

  /**
   * Changes the tile type, and results in the GameObject re-rendering, potentially w/ a different tile.
   * Note that this does not change the underlying 'type' property - only the current 'displayType'
   * @param {string} newType - The new tile type to render this GameObject as
   */
  replaceTile(newType) {
    this.removeTile()
    this.displayType = newType
    this.gameEngine.addTile(this.x, this.y, newType)
  }

  /**
   * Determine3s whether or not this GameObject can move to an input coordinate
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   */
  canMoveTo(x, y) {
    if (!this.gameEngine.withinBounds(x, y)) {
      this.gameEngine.log("oob: " + x + ", " + y);
      return false
    }

    let isProtagonist = this === this.gameEngine.getProtagonist()

    let canOverlap = true
    let managedObjects = this.gameEngine.getManagedObjectsAt(x, y)
    for (let i = 0; i < managedObjects.length; i++) {
      let go = managedObjects[i]
      if (this.cannotOverlapWith(go))
        canOverlap = false
    }

    return this.gameEngine.isNavigable(x, y) && (isProtagonist || canOverlap)
  }

  /**
   * Determines whether or not this GameObject can co-exist with another GameObject
   * @param {GameObject} otherObject - Another GameObject to perform the overlap check against
   */
  cannotOverlapWith(otherObject) {
    return !otherObject.canOverlap
  }

  /**
   * Move the GameObject in a relative manner (using delta coordinates from current position)
   * @param {integer} dx - A relative offset on the x coordinate to apply (-1 is left, 1 is right)
   * @param {integer} dy - A relative offset on the y coordinate to apply (-1 is up, 1 is down)
   */
  move(dx, dy) {
    if (!this.canMoveTo(this.x + dx, this.y + dy))
      return false

    this.gameEngine.log(`Moved: ${this.type}: (${dx},${dy})`)

    this.removeTile()
    this.x += dx;
    this.y += dy;
    this.removeTile()
    this.gameEngine.addTile(this.x, this.y, this.displayType);
    this.gameEngine.recreateNavigationMap()
    this.lastMoveTick = this.gameEngine.getTick()
    return true
  }

  /**
   * Instantaneously move the GameObject to a specific x/y coordinate.
   * @param {integer} x - The x coordinate
   * @param {integer} y - The y coordinate
   */
  teleport(x, y) {
    if (!this.canMoveTo(x, y))
      return

    this.gameEngine.log("tp - " + x + "," + y)

    this.removeTile()
    this.x = x;
    this.y = y;
    this.removeTile()
    this.gameEngine.addTile(this.x, this.y, this.displayType);
    this.gameEngine.recreateNavigationMap()
    this.lastMoveTick = this.gameEngine.getTick()
  }

  /**
   * Calculate the distance to another GameObject
   * @param {GameObject} otherObj - The other GameObject whose distance from this GameObject you'd like to measure
   */
  distanceTo(otherObj) {
    return this.gameEngine.distanceBetween(this.x, this.y, otherObj.x, otherObj.y)
  }

  /**
   * Destroys the GameObject and clears its tile
   */
  destroy() {
    this.destroyed = true
    this.gameEngine.scheduleAtEndOfTick(() => {
      this.removeTile()
      this.gameEngine.removeGameObject(this)
    })
  }

  /** Clears the Spade tile that this GameObject is located on. */
  removeTile() {
    clearTile(this.x, this.y)
  }

  /** Retrieves the associated GameEngine with this GameObject */
  getGameEngine() {
    return this.gameEngine
  }

  /** Retrieves the current coordinate of the GameObject.  Note that this is returns a copy of the value */
  getPosition() {
    return { x: this.x, y: this.y }
  }

  /**
   * Adds a new Behavior to this GameObject.
   * @param {Behavior} behavior - The Behavior instance to add to this GameObject
   */
  addBehavior(behavior) {
    this.behaviors.push(behavior)
    behavior.setParent(this)
    return this
  }

  /**
   * Removes an existing Behavior from this GameObject
   * @param {Behavior} behavior - The Behavior instance to remove from this GameObject
   */
  removeBehavior(behavior) {
    var index = this.behaviors.indexOf(behavior)
    if (index !== -1) {
      this.behaviors.splice(index, 1)
    }
  }

  /**
   * Returns the first Behavior contained within this GameObject that is an instance of a specific type
   * @param {class} behaviorType - A type of Behavior to look for
   */
  getBehavior(behaviorType) {
    let i
    for (i in this.behaviors) {
      let behavior = this.behaviors[i];
      if (behavior instanceof behaviorType)
        return behavior;
    }
    return null;
  }
  
  /**
   * Returns true if a Behavior with the specified behaviroType is found
   * 
   * @param {Behavior} behaviorType - A type of Behavior to look for
   * @returns {boolean}
   */
  hasBehavior(behaviorType) {
    let i
    for (i in this.behaviors) {
      let behavior = this.behaviors[i];
      if (behavior instanceof behaviorType)
        return true;
    }

    return false;
  }

  /**
   * Enables/Disables overlaping
   * @param {boolean} canOverlap - If the GameObject can overlap
   */
  setCanOverlap(canOverlap) {
    this.canOverlap = canOverlap
  }
}

class Behavior {
  /** Represents logic that can be attached to a GameObject, altering its behavior at runtime (i.e., add generic, extensible flavor) */
  constructor() {
    this.parent = null
  }

  /** Returns the GameObject that this Behavior is attached to */
  getParent() { return this.parent }

  /**
   * Sets the current parent GameObject that this Behavior is attached to
   * @param {GameObject} parent - The Behavior's GameObject parent
   */
  setParent(parent) { this.parent = parent }

  /** Main logic for Behavior's go within this method.  This method is called once per TICK_RATE_MS milliseconds. */
  tick() { /* do nothing by default */ }
}

class TickCadenceBehavior extends Behavior {
  /**
   * A behavior that only evaluates every N ticks
   * @param {integer} ticksToSkipBetweenBehavior - The number of ticks to skip in between each 'onCadence' method call
   * @param {integer} offset - A random offset to use to initialize this behavior.  This is defaulted to a random number so that entities on screen do not move in perfect lockstep.  Use '0' (or the same exact offset) for entities that you want to run in lockstep
   */
  constructor(ticksToSkipBetweenBehavior, offset = getRandomRange(0, 1024)) {
    super()
    this.offset = offset
    this.ticksToSkipBetweenBehavior = ticksToSkipBetweenBehavior
  }

  /** @private */
  tick() {
    let parentGo = this.getParent()
    let engine = parentGo.getGameEngine()
    if (((this.offset + engine.getTick()) % this.ticksToSkipBetweenBehavior) == 0) {
      this.onCadence()
    }
  }

  /** The method that is called when this TickCadenceBehavior's logic should actually execute. */
  onCadence() {
    // Do nothing by default
  }
}

class LifetimeBehavior extends Behavior {
  /**
   * A behavior that limits the lifetime of an object to N ticks
   * @param {integer} duration - The number of ticks the object should live for
   */
  constructor(duration) {
    super()

    this.duration = duration
    this.count = 0
  }

  /** @private */
  tick() {
    this.count++

    if (this.count >= this.duration)
      this.getParent().destroy()
  }
}

class AnimatedBehavior extends TickCadenceBehavior {
  /**
   * A Behavior that animates its associated GameObject with a series of sprites
   * @param {Sprite[]} sprites - An array of Sprig Sprite objects to animate the GameObject with
   */
  constructor(sprites, ticksToSkipBetweenBehavior = TICKRATE_DEFAULT, randomOffset = getRandomRange(0, 1024), onAnimationEnd) {
    super(ticksToSkipBetweenBehavior, randomOffset)
    this.onAnimationEnd = onAnimationEnd
    this.sprites = sprites
    this.count = 0
  }

  /** Perform actual animations */
  onCadence() {
    let parentGo = this.getParent()
    let gameEngine = parentGo.getGameEngine()

    if (this.count >= this.sprites.length) {
      this.count = 0;

      if (this.onAnimationEnd)
        this.onAnimationEnd(this)
    }

    let index = this.count % this.sprites.length
    let newType = this.sprites[index]

    let me = gameEngine.getProtagonist()
    let distanceToMe = me.distanceTo(parentGo)
    if (distanceToMe == 0 && parentGo !== me) return;
    parentGo.replaceTile(newType)
    this.count++
  }

  setSprites(sprites) {
    this.sprites = sprites;
  }
}

function dotProduct(vector1, vector2) {
  let result = 0;
  for (let i = 0; i < vector1.length; i++) {
    result += vector1[i] * vector2[i];
  }
  return result;
}

class LivingBehavior extends Behavior {
  /**
   * This callback is being run when the player has no HP
   * @callback LivingBehavior~onDeath
   * @param {GameObject} - The GameObject that died
   * @param {GameEngine} - The GameEngine instance
   * @param {string} - The kill message
   */

  /**
   * A behavior that enables GameObjects to have hp and take damage
   * 
   * @param {integer} hp - The number of the starting hp the associated GameObject has
   * @param {integer} maxHp - The max number of hp the associated GameObject is allowed to have
   * @param {LivingBehavior~onDeath} onDeath - the function that is triggered when the player dies
   */
  constructor(hp, maxHp, onDeath) {
    super()

    this.hp = hp
    this.maxHp = maxHp
    this.onDeath = onDeath
    this.killMsg = "You are dead"
  }

  /**
   * Adds the specified hp to the associated GameObject
   * 
   * @param {integer} amount - The hp amount that will be added
   * @param {string} killMsg - The kill message to show if the player reaches 0 or lower hp by adding a negative number
   */
  addHp(amount, killMsg) {
    this.hp += amount
    if (this.hp > this.maxHp)
      this.hp = this.maxHp
    this.killMsg = killMsg
  }

  /**
   * Checks if the player is dead
   * 
   * @returns boolean
   */
  isDead() {
    return this.hp <= 0
  }

  /** @private */
  tick() {
    super.tick()
    if (this.isDead() && this.onDeath) {
      this.onDeath(this.getParent(), this.getParent().getGameEngine(), this.killMsg)
    }
  }
}

class TouchBehavior extends TickCadenceBehavior {
  /**
   * A behavior that enables the associated GameObject to run a function when touched
   * 
   * @param {function} touchCallback - The function to trigger when the associated GameObject is touched
   */
  constructor(touchCallback) {
    super(TICKRATE_TOUCH)
    this.touchCallback = touchCallback
  }

  /** @private */
  onCadence() {
    let parentGo = this.getParent()
    let engine = parentGo.getGameEngine();

    // Check to see if this game object is in same tile as protagonist
    let protagonist = engine.getProtagonist()
    let distanceToProtagonist = parentGo.distanceTo(protagonist)

    if (distanceToProtagonist == 0 && (engine.getTick() % 2) == 0) {
      let me = this
      engine.scheduleAtEndOfTick(() => me.onTouched())
    }
  }

  /** @private */
  onTouched() {
    this.touchCallback(this.getParent())
  }
}

class PushableBehavior extends TickCadenceBehavior {
  /**
   * A behavior that enables the associated GameObject to be pushed
   * 
   * @param {function} canBePushedBy - A callback to determine if the GameObject can be pushed
   */
  constructor(canBePushedBy = (object) => true) {
    super(TICKRATE_PUSH)

    this.canBePushedBy = canBePushedBy
  }

  /** @private */
  onCadence() {}
}

class PusherBehavior extends TickCadenceBehavior {
  /**
   * A behavior that enables the associated GameObject to push other GameObjects
   */
  constructor() {
    super(TICKRATE_PUSH)
    this.lastPosition = null
  }

  /** @private */
  onCadence() {
    const parent = this.getParent()
    const engine = parent.getGameEngine()

    const currentPosition = parent.getPosition()
    if (!this.lastPosition) return this.lastPosition = currentPosition;

    const deltaPosition = {x: currentPosition.x - this.lastPosition.x, y: currentPosition.y - this.lastPosition.y}

    let raycast
    if (deltaPosition.x !== 0)
      raycast = engine.raycastX(engine, currentPosition.x, currentPosition.y, deltaPosition.x, parent.type)
    if (deltaPosition.y !== 0)
      raycast = engine.raycastY(engine, currentPosition.x, currentPosition.y, deltaPosition.y, parent.type)

    if (raycast && raycast.pushables.length > 0 && raycast.pushables.length <= raycast.freeSpaces) {
      raycast.pushables.reverse().forEach(pushable => {
        pushable.move(deltaPosition.x, deltaPosition.y)
      })
    }

    this.lastPosition = currentPosition
  }
}

class FollowBehavior extends TickCadenceBehavior {
  /**
   * A behavior that enables the associated GameObject to follow a target
   */
  constructor() {
    super(TICKRATE_FOLLOW)
    this.target = null
  }

  /**
   * Sets the target to follow
   * '
   * @param {GameObject} targetObj - The target
   */
  setTarget(targetObj) {
    this.target = targetObj
  }

  /** @private */
  onCadence() {
    let parentGo = this.getParent()
    let engine = parentGo.getGameEngine()
    if (this.target == null) {
      engine.log("no flw trgt")
      this.target = engine.getProtagonist()
    }

    this.moveTowards(parentGo.x, parentGo.y, this.target.x, this.target.y)
  }

  /** @private */
  moveTowards(startX, startY, desiredX, desiredY) {
    let parentGo = this.getParent()
    let engine = parentGo.getGameEngine()

    if (engine.distanceBetween(startX, startY, desiredX, desiredY) <= 1)
      return

    let navMap = engine.getFreshNavigationMap(parentGo)
    let coord = this.bfs(navMap, { x: startX, y: startY }, { x: desiredX, y: desiredY })
    if (coord == false) {
      console.log("no move")
    } else {
      parentGo.move(coord.x - parentGo.x, coord.y - parentGo.y)
    }
  }

  /** @private */
  bfs(navigationMap, startCoordinate, destinationCoordinate) {
    let queue = [
      [startCoordinate]
    ];
    while (queue.length > 0) {
      let path = queue.shift()
      let currentNode = path[path.length - 1]
      if (currentNode.x == destinationCoordinate.x && currentNode.y == destinationCoordinate.y) {
        if (path.length >= 2) {
          return path[1]
        } else return false
      } else if (navigationMap[currentNode.x][currentNode.y] == NAVIGABLE) {
        navigationMap[currentNode.x][currentNode.y] = VISITED
        let neighbors = this.getNeighborsOf(currentNode, navigationMap)
        let i
        for (i = 0; i < neighbors.length; i++) {
          let newPath = deepCopy(path)
          newPath.push(neighbors[i])
          queue.push(newPath)
        }
      }
    }
    return false
  }

  /** @private */
  getNeighborsOf(coord, navigationMap) {
    let neighbors = []
    const dirs = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1]
    ]
    let i
    let w = width()
    let h = height()
    for (i = 0; i < dirs.length; i++) {
      let dir = dirs[i]
      let newCoord = { x: coord.x + dir[0], y: coord.y + dir[1] }
      if (newCoord.x >= 0 &&
        newCoord.x < w &&
        newCoord.y >= 0 &&
        newCoord.y < h &&
        navigationMap[newCoord.x][newCoord.y] == NAVIGABLE) {
        neighbors.push(newCoord)
      }
    }
    return neighbors
  }
}

class AttackBehavior extends TickCadenceBehavior {
  /**
   * A behavior that allows the associated GameObject to attack other GameObjects
   * 
   * @param {string} killMsg - The message to show when a GameObject is attacked and killed
   * @param {boolean} canDamageSameType - If the GameObject can damage other GameObjects of the same time
   * @param {integer} range -  The range of the attack
   */
  constructor(killMsg, canDamageSameType = false, range = 1) {
    super(TICKRATE_ATTACK)
    this.killMsg = killMsg
    this.canDamageSameType = canDamageSameType
    this.range = range
  }

  /** @private */
  onCadence() {
    let parentGo = this.getParent()
    let engine = parentGo.getGameEngine()

    engine.spatialSelect(parentGo.x, parentGo.y, this.range).forEach(target => {
      if (engine.getTick() - target.getLastMoveTick() < 3) return;
      if (!this.canDamageSameType && parentGo.type == target.type) return;
      
      const livingTarget = target.getBehavior(LivingBehavior)
      if (livingTarget) {
        livingTarget.addHp(-1, this.killMsg)
      }
    })
  }
}

class PlayerAnimationBehavior extends AnimatedBehavior {
  constructor() {
    super(walkUpAnimations, TICKRATE_PLAYER_ANIMATIONS)
    this.currentAnimations = null
    this.lastPosition = null
  }

  normalizeAngleDegrees(angle) {
    let ang = angle
    while (ang < 0)
      ang += 360
    return ang % 360
  }

  onCadence() {
    super.onCadence()

    let lp = this.lastPosition
    let desiredAnimations = walkUpAnimations


    let go = this.getParent()
    if (go != null) {
      let np = go.getPosition()

      if (lp != null) {
        // If we did not move, do not do anything
        if (np.x == lp.x && np.y == lp.y) return;

        // Now we have old and new position, and can orient the player accordingly
        let angleDegrees = this.normalizeAngleDegrees(Math.round(360 / (Math.PI * 2) * (Math.atan2(np.y - lp.y, np.x - lp.x))))
        let angleIndices = [270, 180, 90, 0]
        let choices = [walkUpAnimations, walkLeftAnimations, walkDownAnimations, walkRightAnimations]

        let lowDist = 9999
        for (let i = 0; i < angleIndices.length; i++) {
          let dist = Math.abs(angleDegrees - angleIndices[i])
          if (dist < lowDist) {
            lowDist = dist
            desiredAnimations = choices[i]
          }
        }
      }
      this.lastPosition = np
    }

    if (this.currentAnimations !== desiredAnimations) {
      this.setSprites(desiredAnimations)
    }
  }
}

// This handler is called once per tick, and allows you to consume the last input and act upon it
let inputHandler = function(engine) {
  let player = engine.getProtagonist();
  if (player == null) {
    console.log("Warning - no protagonist")
    return;
  }

  let desiredAnimations = null;
  switch (engine.popLastInput()) {
    case "w":
      player.move(0, -1);
      break;
    case "a":
      player.move(-1, 0);
      break;
    case "d":
      player.move(1, 0);
      break;
    case "s":
      player.move(0, 1);
      break;
    case null:
      break;
  }
}

// Callback registered for when the player dies
function onDeath(_, engine, killMsg) {
  engine.stop()
  addText(killMsg, { x: 5, y: 5, color: color`9` })
  addText("Press L to retry", { x: 3, y: 8, color: color`9` })
}

// Adds a player object, taking special case to inform the engine that this is the protagonist (main player controller)
function addPlayerAt(engine, x, y) {
  engine.setProtagonist(
    new GameObject(engine, x, y, player)
    .addBehavior(new PlayerAnimationBehavior())
    .addBehavior(new LivingBehavior(1, 1, onDeath))
    .addBehavior(new PusherBehavior()))
}

// Adds a boring old wall
function addWallAt(engine, x, y) {
  new GameObject(engine, x, y, wall);
}

// Adds a movable rocl
function addRockAt(engine, x, y) {
  new GameObject(engine, x, y, rock)
    .addBehavior(new PushableBehavior())
    .addBehavior(new LivingBehavior(1, 1, (obj) => obj.destroy()))
}

// Adds a pusher arrow.  It automatically pushes the player in a certain direction (up, down, left, right)
function addArrowAt(engine, x, y, arrowType, animations, logic) {
  new GameObject(engine, x, y, arrowType, true)
    .addBehavior(new AnimatedBehavior(animations, TICKRATE_DEFAULT, 0))
    .addBehavior(new TouchBehavior(logic))
}

// Adds an enemy that follows you and tries to eat you
function addEnemyAt(engine, x, y) {
  new GameObject(engine, x, y, boss1)
    .addBehavior(new AnimatedBehavior(boss1Animations))
    .addBehavior(new FollowBehavior())
    .addBehavior(new LivingBehavior(5, 5, (enemy) => enemy.destroy()))
    .addBehavior(new AttackBehavior("roflstomped"))
}

// Adds a spike trap.  When it touches you, it hurts!
function addSpikeAt(engine, x, y) {
  new GameObject(engine, x, y, spike)
    .addBehavior(new AnimatedBehavior(spikeAnimations, TICKRATE_DEFAULT, 0))
    .addBehavior(new AttackBehavior("slashinated"))
}

// Adds stairs that lead to the next level
function addDownStairsAt(engine, x, y) {
  new GameObject(engine, x, y, stairsDown)
    .addBehavior(new AnimatedBehavior(stairDownAnimations))
    .addBehavior(new TouchBehavior(warpDownLogic))
}

// Teleport the protagonist from the teleport starting position to the destination
function teleportLogic(go) {
  let gameEngine = go.getGameEngine()
  let protagonist = gameEngine.getProtagonist()

  switch (go.type) {
    case teleport1_from:
      let to = gameEngine.getFirst(teleport1_to)
      if (to != null) {
        protagonist.teleport(to.x, to.y)
        if (gameEngine.getLevel() == 0) {
          addText("whoa!", { x: 14, y: 3, color: color`0` })
        }
      } else
        gameEngine.log("whoa")
      break;
    default:
      gameEngine.log("no tp dst");
      break;
  }
}

// Add a controller for a teleporter.  When you touch it, it moves you to the associated teleporter destination
function addTeleporterAt(engine, x, y, destinationTileType) {

  // First, create the teleporter destination
  let destinationTile = getFirst(teleport1_to)
  if (destinationTile != null) {
    new GameObject(engine, destinationTile.x, destinationTile.y, teleport1_to)
      .addBehavior(new AnimatedBehavior(teleport1_to_animations))
  }

  // The teleporter, with its special teleportation logic that activates on touch (immediately adjacent)
  new GameObject(engine, x, y, teleport1_from)
    .addBehavior(new AnimatedBehavior(teleport1_from_animations))
    .addBehavior(new TouchBehavior(teleportLogic))
}

// Adds a Bomb
function addBombAt(engine, x, y) {
  new GameObject(engine, x, y, bomb)
    .addBehavior(new AnimatedBehavior(bombAnimations, TICKRATE_DEFAULT, getRandomRange(0, 1024), (self) => {
      self.getParent().destroy()
      addFlameAt(gameEngine, self.getParent().x, self.getParent().y + 1)
      addFlameAt(gameEngine, self.getParent().x, self.getParent().y - 1)
      addFlameAt(gameEngine, self.getParent().x + 1, self.getParent().y)
      addFlameAt(gameEngine, self.getParent().x - 1, self.getParent().y)
    }))
}

// Adds a flame, if it touches the player it hurts you
function addFlameAt(engine, x, y) {
  if (gameEngine.isWall(x, y) || !gameEngine.withinBounds(x, y)) return;

  new GameObject(engine, x, y, flame)
    .addBehavior(new AttackBehavior("burned"))
    .addBehavior(new LifetimeBehavior(10))
}

// Transports the protagonist
function warpDownLogic(go) {
  let engine = go.getGameEngine();
  engine.setLevel(engine.getLevel() + 1)
  engine.reset()
  engine.start()
}

function warpLeftArrowLogic(go) {
  go.getGameEngine().getProtagonist().move(-1, 0)
}

function warpRightArrowLogic(go) {
  go.getGameEngine().getProtagonist().move(1, 0)
}

function warpUpArrowLogic(go) {
  go.getGameEngine().getProtagonist().move(0, -1)
}

function warpDownArrowLogic(go) {
  go.getGameEngine().getProtagonist().move(0, 1)
}

// This is where you should create your game object controllers
function onTileLoaded(engine, tile) {
  switch (tile.type) {
    case player:
      addPlayerAt(engine, tile.x, tile.y);
      break;
    case stairsDown:
      addDownStairsAt(engine, tile.x, tile.y);
      break;
    case teleport1_from:
      addTeleporterAt(engine, tile.x, tile.y, teleport1_to);
      break;
    case wall:
      addWallAt(engine, tile.x, tile.y);
      break;
    case rock:
      addRockAt(engine, tile.x, tile.y)
      break;
    case boss1:
      addEnemyAt(engine, tile.x, tile.y);
      break;
    case leftArrow:
      addArrowAt(engine, tile.x, tile.y, tile.type, leftArrowAnimations, warpLeftArrowLogic);
      break;
    case rightArrow:
      addArrowAt(engine, tile.x, tile.y, tile.type, rightArrowAnimations, warpRightArrowLogic);
      break;
    case upArrow:
      addArrowAt(engine, tile.x, tile.y, tile.type, upArrowAnimations, warpUpArrowLogic);
      break;
    case downArrow:
      addArrowAt(engine, tile.x, tile.y, tile.type, downArrowAnimations, warpDownArrowLogic);
      break;
    case spike:
      addSpikeAt(engine, tile.x, tile.y);
      break;
    case bomb:
      addBombAt(engine, tile.x, tile.y);
      break;
    default:
      engine.log("no tile hdlr: " + tile.type);
      break;
  }
}

// This method is called on startup of each level, before all game objects are loaded
function onInit(engine, level) {
  engine.setInputHandler(inputHandler)
  engine.setMap(levels[level])
  engine.playMusic(music[level])

  // Register movement keys
  let validKeys = ["s", "w", "a", "d"]
  let index
  for (index in validKeys) {
    let character = validKeys[index]
    onInput(character, () => {
      engine.setLastInput(character)
    })
  }

  // Register level restart
  onInput('l', () => {
    gameEngine.reset()
    gameEngine.start()
  })

  onInput('k', () => { 
    const player = gameEngine.getProtagonist()
    addBombAt(gameEngine, player.x, player.y)
  })
}

// This method is called after the full initialization of the level (including after tiles have been loaded, and game objects created)
function onWorldLoaded(engine, level) {}

// Construct the game engine initially
let gameEngine = new GameEngine(onInit, onWorldLoaded, onTileLoaded, STARTING_LEVEL, TICKRATE_MS)
gameEngine.start()