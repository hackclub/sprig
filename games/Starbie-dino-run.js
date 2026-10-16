/*
@title: Starbie Dino Dash
@description: One-button Sprig dinosaur runner with score, hazards, and increasing speed.
@author: Patrick Draghina
@tags: ['arcade', 'endless', 'runner']
@addedOn: 2026-10-12
*/
const D="d", C="c", R="r", B="b", F="f", O="o", H="h", G="g", K="k", Q="q", U="u";
setLegend(
  [D, bitmap`
................
.......444444...
......44444444..
......44044044..
......44444444..
......44444400..
......4444440...
......4444440...
...444444440....
..4444444440....
.44444444440....
.4444444440.....
..000444000.....
.....04040......
.....04040......
.....00000......
`],
  [C, bitmap`
.......DD.......
.......DD.......
...DD..DD.......
...DD..DD..DD...
...DDDDDD..DD...
.....DDDDDDDD...
.......DDDD.....
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
................
`],
  [R, bitmap`
................
................
................
................
................
......1111......
....11111111....
...111LL1111....
..111LLLL1111...
..11111111111...
.1111111111111..
..11111111111...
....11111111....
................
................
................
`],
  [B, bitmap`
................
................
..CCCCCCCCCCCC..
..C999999999C...
..C9C99999C9C...
..C99C999C99C...
..C999CC9999C...
..C999CC9999C...
..C99C999C99C...
..C9C99999C9C...
..C999999999C...
..CCCCCCCCCCCC..
................
................
................
................
`],
  [F, bitmap`
................
................
...000.....000..
..03330...03330.
.033333000333330
.033333333333330
..0333333333330.
...03333333330..
....033333330...
.....0333330....
......03030.....
.....0000000....
................
................
................
................
`],
  [O, bitmap`
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
................
`],
  [H, bitmap`
................
................
................
................
......1111......
....11111111....
..111111111111..
.11111111111111.
1111111111111111
1111111111111111
.11111111111111.
................
................
................
................
................
`],
  [G, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
`],
  [K, bitmap`
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
7777777777777777
`],
  [Q, bitmap`
................
................
.....555555.....
....55555555....
...5555555555...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
....55555555....
.....555555.....
................
................
................
`],
  [U, bitmap`
................
................
......3333......
.....333333.....
....33333333....
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
......3333......
......3333......
................
................
................
................
`]
);
setBackground(K);
setSolids([]);
const scene = map`
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
gggggggggggggggg
gggggggggggggggg
`;
// Mission catalogue: each mission defines a distinct target, obstacle mix and bonus.
const missions = [
  {
    id: 1,
    name: "Run 01",
    targetScore: 12,
    targetCoins: 2,
    difficulty: 1,
    obstacleStyle: "cactus",
    bonusCoins: 3,
    bonusScore: 10,
    minDistance: 20,
    spawnGap: 10,
    description: "Reach 12 points and collect 2 coins",
  },
  {
    id: 2,
    name: "Run 02",
    targetScore: 15,
    targetCoins: 2,
    difficulty: 1,
    obstacleStyle: "rock",
    bonusCoins: 3,
    bonusScore: 12,
    minDistance: 23,
    spawnGap: 10,
    description: "Reach 15 points and collect 2 coins",
  },
  {
    id: 3,
    name: "Run 03",
    targetScore: 19,
    targetCoins: 2,
    difficulty: 1,
    obstacleStyle: "crate",
    bonusCoins: 3,
    bonusScore: 14,
    minDistance: 26,
    spawnGap: 10,
    description: "Reach 19 points and collect 2 coins",
  },
  {
    id: 4,
    name: "Run 04",
    targetScore: 22,
    targetCoins: 2,
    difficulty: 1,
    obstacleStyle: "bird",
    bonusCoins: 3,
    bonusScore: 16,
    minDistance: 29,
    spawnGap: 10,
    description: "Reach 22 points and collect 2 coins",
  },
  {
    id: 5,
    name: "Run 05",
    targetScore: 26,
    targetCoins: 2,
    difficulty: 1,
    obstacleStyle: "mixed",
    bonusCoins: 4,
    bonusScore: 18,
    minDistance: 32,
    spawnGap: 10,
    description: "Reach 26 points and collect 2 coins",
  },
  {
    id: 6,
    name: "Run 06",
    targetScore: 29,
    targetCoins: 3,
    difficulty: 1,
    obstacleStyle: "cactus",
    bonusCoins: 4,
    bonusScore: 20,
    minDistance: 35,
    spawnGap: 10,
    description: "Reach 29 points and collect 3 coins",
  },
  {
    id: 7,
    name: "Run 07",
    targetScore: 33,
    targetCoins: 3,
    difficulty: 1,
    obstacleStyle: "rock",
    bonusCoins: 4,
    bonusScore: 22,
    minDistance: 38,
    spawnGap: 10,
    description: "Reach 33 points and collect 3 coins",
  },
  {
    id: 8,
    name: "Run 08",
    targetScore: 36,
    targetCoins: 3,
    difficulty: 1,
    obstacleStyle: "crate",
    bonusCoins: 4,
    bonusScore: 24,
    minDistance: 41,
    spawnGap: 10,
    description: "Reach 36 points and collect 3 coins",
  },
  {
    id: 9,
    name: "Run 09",
    targetScore: 40,
    targetCoins: 3,
    difficulty: 1,
    obstacleStyle: "bird",
    bonusCoins: 5,
    bonusScore: 26,
    minDistance: 44,
    spawnGap: 10,
    description: "Reach 40 points and collect 3 coins",
  },
  {
    id: 10,
    name: "Run 10",
    targetScore: 43,
    targetCoins: 3,
    difficulty: 1,
    obstacleStyle: "mixed",
    bonusCoins: 5,
    bonusScore: 28,
    minDistance: 47,
    spawnGap: 10,
    description: "Reach 43 points and collect 3 coins",
  },
  {
    id: 11,
    name: "Run 11",
    targetScore: 47,
    targetCoins: 4,
    difficulty: 1,
    obstacleStyle: "cactus",
    bonusCoins: 5,
    bonusScore: 30,
    minDistance: 50,
    spawnGap: 10,
    description: "Reach 47 points and collect 4 coins",
  },
  {
    id: 12,
    name: "Run 12",
    targetScore: 50,
    targetCoins: 4,
    difficulty: 1,
    obstacleStyle: "rock",
    bonusCoins: 5,
    bonusScore: 32,
    minDistance: 53,
    spawnGap: 10,
    description: "Reach 50 points and collect 4 coins",
  },
  {
    id: 13,
    name: "Run 13",
    targetScore: 54,
    targetCoins: 4,
    difficulty: 2,
    obstacleStyle: "crate",
    bonusCoins: 6,
    bonusScore: 34,
    minDistance: 56,
    spawnGap: 10,
    description: "Reach 54 points and collect 4 coins",
  },
  {
    id: 14,
    name: "Run 14",
    targetScore: 57,
    targetCoins: 4,
    difficulty: 2,
    obstacleStyle: "bird",
    bonusCoins: 6,
    bonusScore: 36,
    minDistance: 59,
    spawnGap: 9,
    description: "Reach 57 points and collect 4 coins",
  },
  {
    id: 15,
    name: "Run 15",
    targetScore: 61,
    targetCoins: 4,
    difficulty: 2,
    obstacleStyle: "mixed",
    bonusCoins: 6,
    bonusScore: 38,
    minDistance: 62,
    spawnGap: 9,
    description: "Reach 61 points and collect 4 coins",
  },
  {
    id: 16,
    name: "Run 16",
    targetScore: 64,
    targetCoins: 5,
    difficulty: 2,
    obstacleStyle: "cactus",
    bonusCoins: 6,
    bonusScore: 40,
    minDistance: 65,
    spawnGap: 9,
    description: "Reach 64 points and collect 5 coins",
  },
  {
    id: 17,
    name: "Run 17",
    targetScore: 68,
    targetCoins: 5,
    difficulty: 2,
    obstacleStyle: "rock",
    bonusCoins: 7,
    bonusScore: 42,
    minDistance: 68,
    spawnGap: 9,
    description: "Reach 68 points and collect 5 coins",
  },
  {
    id: 18,
    name: "Run 18",
    targetScore: 71,
    targetCoins: 5,
    difficulty: 2,
    obstacleStyle: "crate",
    bonusCoins: 7,
    bonusScore: 44,
    minDistance: 71,
    spawnGap: 9,
    description: "Reach 71 points and collect 5 coins",
  },
  {
    id: 19,
    name: "Run 19",
    targetScore: 75,
    targetCoins: 5,
    difficulty: 2,
    obstacleStyle: "bird",
    bonusCoins: 7,
    bonusScore: 46,
    minDistance: 74,
    spawnGap: 9,
    description: "Reach 75 points and collect 5 coins",
  },
  {
    id: 20,
    name: "Run 20",
    targetScore: 78,
    targetCoins: 5,
    difficulty: 2,
    obstacleStyle: "mixed",
    bonusCoins: 7,
    bonusScore: 48,
    minDistance: 77,
    spawnGap: 9,
    description: "Reach 78 points and collect 5 coins",
  },
  {
    id: 21,
    name: "Run 21",
    targetScore: 82,
    targetCoins: 6,
    difficulty: 2,
    obstacleStyle: "cactus",
    bonusCoins: 8,
    bonusScore: 50,
    minDistance: 80,
    spawnGap: 9,
    description: "Reach 82 points and collect 6 coins",
  },
  {
    id: 22,
    name: "Run 22",
    targetScore: 85,
    targetCoins: 6,
    difficulty: 2,
    obstacleStyle: "rock",
    bonusCoins: 8,
    bonusScore: 52,
    minDistance: 83,
    spawnGap: 9,
    description: "Reach 85 points and collect 6 coins",
  },
  {
    id: 23,
    name: "Run 23",
    targetScore: 89,
    targetCoins: 6,
    difficulty: 2,
    obstacleStyle: "crate",
    bonusCoins: 8,
    bonusScore: 54,
    minDistance: 86,
    spawnGap: 9,
    description: "Reach 89 points and collect 6 coins",
  },
  {
    id: 24,
    name: "Run 24",
    targetScore: 92,
    targetCoins: 6,
    difficulty: 2,
    obstacleStyle: "bird",
    bonusCoins: 8,
    bonusScore: 56,
    minDistance: 89,
    spawnGap: 9,
    description: "Reach 92 points and collect 6 coins",
  },
  {
    id: 25,
    name: "Run 25",
    targetScore: 96,
    targetCoins: 6,
    difficulty: 3,
    obstacleStyle: "mixed",
    bonusCoins: 9,
    bonusScore: 58,
    minDistance: 92,
    spawnGap: 9,
    description: "Reach 96 points and collect 6 coins",
  },
  {
    id: 26,
    name: "Run 26",
    targetScore: 99,
    targetCoins: 7,
    difficulty: 3,
    obstacleStyle: "cactus",
    bonusCoins: 9,
    bonusScore: 60,
    minDistance: 95,
    spawnGap: 9,
    description: "Reach 99 points and collect 7 coins",
  },
  {
    id: 27,
    name: "Run 27",
    targetScore: 103,
    targetCoins: 7,
    difficulty: 3,
    obstacleStyle: "rock",
    bonusCoins: 9,
    bonusScore: 62,
    minDistance: 98,
    spawnGap: 8,
    description: "Reach 103 points and collect 7 coins",
  },
  {
    id: 28,
    name: "Run 28",
    targetScore: 106,
    targetCoins: 7,
    difficulty: 3,
    obstacleStyle: "crate",
    bonusCoins: 9,
    bonusScore: 64,
    minDistance: 101,
    spawnGap: 8,
    description: "Reach 106 points and collect 7 coins",
  },
  {
    id: 29,
    name: "Run 29",
    targetScore: 110,
    targetCoins: 7,
    difficulty: 3,
    obstacleStyle: "bird",
    bonusCoins: 10,
    bonusScore: 66,
    minDistance: 104,
    spawnGap: 8,
    description: "Reach 110 points and collect 7 coins",
  },
  {
    id: 30,
    name: "Run 30",
    targetScore: 113,
    targetCoins: 7,
    difficulty: 3,
    obstacleStyle: "mixed",
    bonusCoins: 10,
    bonusScore: 68,
    minDistance: 107,
    spawnGap: 8,
    description: "Reach 113 points and collect 7 coins",
  },
  {
    id: 31,
    name: "Run 31",
    targetScore: 117,
    targetCoins: 8,
    difficulty: 3,
    obstacleStyle: "cactus",
    bonusCoins: 10,
    bonusScore: 70,
    minDistance: 110,
    spawnGap: 8,
    description: "Reach 117 points and collect 8 coins",
  },
  {
    id: 32,
    name: "Run 32",
    targetScore: 120,
    targetCoins: 8,
    difficulty: 3,
    obstacleStyle: "rock",
    bonusCoins: 10,
    bonusScore: 72,
    minDistance: 113,
    spawnGap: 8,
    description: "Reach 120 points and collect 8 coins",
  },
  {
    id: 33,
    name: "Run 33",
    targetScore: 124,
    targetCoins: 8,
    difficulty: 3,
    obstacleStyle: "crate",
    bonusCoins: 11,
    bonusScore: 74,
    minDistance: 116,
    spawnGap: 8,
    description: "Reach 124 points and collect 8 coins",
  },
  {
    id: 34,
    name: "Run 34",
    targetScore: 127,
    targetCoins: 8,
    difficulty: 3,
    obstacleStyle: "bird",
    bonusCoins: 11,
    bonusScore: 76,
    minDistance: 119,
    spawnGap: 8,
    description: "Reach 127 points and collect 8 coins",
  },
  {
    id: 35,
    name: "Run 35",
    targetScore: 131,
    targetCoins: 8,
    difficulty: 3,
    obstacleStyle: "mixed",
    bonusCoins: 11,
    bonusScore: 78,
    minDistance: 122,
    spawnGap: 8,
    description: "Reach 131 points and collect 8 coins",
  },
  {
    id: 36,
    name: "Run 36",
    targetScore: 134,
    targetCoins: 9,
    difficulty: 3,
    obstacleStyle: "cactus",
    bonusCoins: 11,
    bonusScore: 80,
    minDistance: 125,
    spawnGap: 8,
    description: "Reach 134 points and collect 9 coins",
  },
  {
    id: 37,
    name: "Run 37",
    targetScore: 138,
    targetCoins: 9,
    difficulty: 4,
    obstacleStyle: "rock",
    bonusCoins: 12,
    bonusScore: 82,
    minDistance: 128,
    spawnGap: 8,
    description: "Reach 138 points and collect 9 coins",
  },
  {
    id: 38,
    name: "Run 38",
    targetScore: 141,
    targetCoins: 9,
    difficulty: 4,
    obstacleStyle: "crate",
    bonusCoins: 12,
    bonusScore: 84,
    minDistance: 131,
    spawnGap: 8,
    description: "Reach 141 points and collect 9 coins",
  },
  {
    id: 39,
    name: "Run 39",
    targetScore: 145,
    targetCoins: 9,
    difficulty: 4,
    obstacleStyle: "bird",
    bonusCoins: 12,
    bonusScore: 86,
    minDistance: 134,
    spawnGap: 8,
    description: "Reach 145 points and collect 9 coins",
  },
  {
    id: 40,
    name: "Run 40",
    targetScore: 148,
    targetCoins: 9,
    difficulty: 4,
    obstacleStyle: "mixed",
    bonusCoins: 12,
    bonusScore: 88,
    minDistance: 137,
    spawnGap: 7,
    description: "Reach 148 points and collect 9 coins",
  },
  {
    id: 41,
    name: "Run 41",
    targetScore: 152,
    targetCoins: 10,
    difficulty: 4,
    obstacleStyle: "cactus",
    bonusCoins: 13,
    bonusScore: 90,
    minDistance: 140,
    spawnGap: 7,
    description: "Reach 152 points and collect 10 coins",
  },
  {
    id: 42,
    name: "Run 42",
    targetScore: 155,
    targetCoins: 10,
    difficulty: 4,
    obstacleStyle: "rock",
    bonusCoins: 13,
    bonusScore: 92,
    minDistance: 143,
    spawnGap: 7,
    description: "Reach 155 points and collect 10 coins",
  },
  {
    id: 43,
    name: "Run 43",
    targetScore: 159,
    targetCoins: 10,
    difficulty: 4,
    obstacleStyle: "crate",
    bonusCoins: 13,
    bonusScore: 94,
    minDistance: 146,
    spawnGap: 7,
    description: "Reach 159 points and collect 10 coins",
  },
  {
    id: 44,
    name: "Run 44",
    targetScore: 162,
    targetCoins: 10,
    difficulty: 4,
    obstacleStyle: "bird",
    bonusCoins: 13,
    bonusScore: 96,
    minDistance: 149,
    spawnGap: 7,
    description: "Reach 162 points and collect 10 coins",
  },
  {
    id: 45,
    name: "Run 45",
    targetScore: 166,
    targetCoins: 10,
    difficulty: 4,
    obstacleStyle: "mixed",
    bonusCoins: 14,
    bonusScore: 98,
    minDistance: 152,
    spawnGap: 7,
    description: "Reach 166 points and collect 10 coins",
  },
  {
    id: 46,
    name: "Run 46",
    targetScore: 169,
    targetCoins: 11,
    difficulty: 4,
    obstacleStyle: "cactus",
    bonusCoins: 14,
    bonusScore: 100,
    minDistance: 155,
    spawnGap: 7,
    description: "Reach 169 points and collect 11 coins",
  },
  {
    id: 47,
    name: "Run 47",
    targetScore: 173,
    targetCoins: 11,
    difficulty: 4,
    obstacleStyle: "rock",
    bonusCoins: 14,
    bonusScore: 102,
    minDistance: 158,
    spawnGap: 7,
    description: "Reach 173 points and collect 11 coins",
  },
  {
    id: 48,
    name: "Run 48",
    targetScore: 176,
    targetCoins: 11,
    difficulty: 4,
    obstacleStyle: "crate",
    bonusCoins: 14,
    bonusScore: 104,
    minDistance: 161,
    spawnGap: 7,
    description: "Reach 176 points and collect 11 coins",
  },
  {
    id: 49,
    name: "Run 49",
    targetScore: 180,
    targetCoins: 11,
    difficulty: 5,
    obstacleStyle: "bird",
    bonusCoins: 15,
    bonusScore: 106,
    minDistance: 164,
    spawnGap: 7,
    description: "Reach 180 points and collect 11 coins",
  },
  {
    id: 50,
    name: "Run 50",
    targetScore: 183,
    targetCoins: 11,
    difficulty: 5,
    obstacleStyle: "mixed",
    bonusCoins: 15,
    bonusScore: 108,
    minDistance: 167,
    spawnGap: 7,
    description: "Reach 183 points and collect 11 coins",
  },
  {
    id: 51,
    name: "Run 51",
    targetScore: 187,
    targetCoins: 12,
    difficulty: 5,
    obstacleStyle: "cactus",
    bonusCoins: 15,
    bonusScore: 110,
    minDistance: 170,
    spawnGap: 7,
    description: "Reach 187 points and collect 12 coins",
  },
  {
    id: 52,
    name: "Run 52",
    targetScore: 190,
    targetCoins: 12,
    difficulty: 5,
    obstacleStyle: "rock",
    bonusCoins: 15,
    bonusScore: 112,
    minDistance: 173,
    spawnGap: 7,
    description: "Reach 190 points and collect 12 coins",
  },
  {
    id: 53,
    name: "Run 53",
    targetScore: 194,
    targetCoins: 12,
    difficulty: 5,
    obstacleStyle: "crate",
    bonusCoins: 16,
    bonusScore: 114,
    minDistance: 176,
    spawnGap: 6,
    description: "Reach 194 points and collect 12 coins",
  },
  {
    id: 54,
    name: "Run 54",
    targetScore: 197,
    targetCoins: 12,
    difficulty: 5,
    obstacleStyle: "bird",
    bonusCoins: 16,
    bonusScore: 116,
    minDistance: 179,
    spawnGap: 6,
    description: "Reach 197 points and collect 12 coins",
  },
  {
    id: 55,
    name: "Run 55",
    targetScore: 201,
    targetCoins: 12,
    difficulty: 5,
    obstacleStyle: "mixed",
    bonusCoins: 16,
    bonusScore: 118,
    minDistance: 182,
    spawnGap: 6,
    description: "Reach 201 points and collect 12 coins",
  },
  {
    id: 56,
    name: "Run 56",
    targetScore: 204,
    targetCoins: 13,
    difficulty: 5,
    obstacleStyle: "cactus",
    bonusCoins: 16,
    bonusScore: 120,
    minDistance: 185,
    spawnGap: 6,
    description: "Reach 204 points and collect 13 coins",
  },
  {
    id: 57,
    name: "Run 57",
    targetScore: 208,
    targetCoins: 13,
    difficulty: 5,
    obstacleStyle: "rock",
    bonusCoins: 17,
    bonusScore: 122,
    minDistance: 188,
    spawnGap: 6,
    description: "Reach 208 points and collect 13 coins",
  },
  {
    id: 58,
    name: "Run 58",
    targetScore: 211,
    targetCoins: 13,
    difficulty: 5,
    obstacleStyle: "crate",
    bonusCoins: 17,
    bonusScore: 124,
    minDistance: 191,
    spawnGap: 6,
    description: "Reach 211 points and collect 13 coins",
  },
  {
    id: 59,
    name: "Run 59",
    targetScore: 215,
    targetCoins: 13,
    difficulty: 5,
    obstacleStyle: "bird",
    bonusCoins: 17,
    bonusScore: 126,
    minDistance: 194,
    spawnGap: 6,
    description: "Reach 215 points and collect 13 coins",
  },
  {
    id: 60,
    name: "Run 60",
    targetScore: 218,
    targetCoins: 13,
    difficulty: 5,
    obstacleStyle: "mixed",
    bonusCoins: 17,
    bonusScore: 128,
    minDistance: 197,
    spawnGap: 6,
    description: "Reach 218 points and collect 13 coins",
  },
  {
    id: 61,
    name: "Run 61",
    targetScore: 222,
    targetCoins: 14,
    difficulty: 6,
    obstacleStyle: "cactus",
    bonusCoins: 18,
    bonusScore: 130,
    minDistance: 200,
    spawnGap: 6,
    description: "Reach 222 points and collect 14 coins",
  },
  {
    id: 62,
    name: "Run 62",
    targetScore: 225,
    targetCoins: 14,
    difficulty: 6,
    obstacleStyle: "rock",
    bonusCoins: 18,
    bonusScore: 132,
    minDistance: 203,
    spawnGap: 6,
    description: "Reach 225 points and collect 14 coins",
  },
  {
    id: 63,
    name: "Run 63",
    targetScore: 229,
    targetCoins: 14,
    difficulty: 6,
    obstacleStyle: "crate",
    bonusCoins: 18,
    bonusScore: 134,
    minDistance: 206,
    spawnGap: 6,
    description: "Reach 229 points and collect 14 coins",
  },
  {
    id: 64,
    name: "Run 64",
    targetScore: 232,
    targetCoins: 14,
    difficulty: 6,
    obstacleStyle: "bird",
    bonusCoins: 18,
    bonusScore: 136,
    minDistance: 209,
    spawnGap: 6,
    description: "Reach 232 points and collect 14 coins",
  },
  {
    id: 65,
    name: "Run 65",
    targetScore: 236,
    targetCoins: 14,
    difficulty: 6,
    obstacleStyle: "mixed",
    bonusCoins: 19,
    bonusScore: 138,
    minDistance: 212,
    spawnGap: 6,
    description: "Reach 236 points and collect 14 coins",
  },
  {
    id: 66,
    name: "Run 66",
    targetScore: 239,
    targetCoins: 15,
    difficulty: 6,
    obstacleStyle: "cactus",
    bonusCoins: 19,
    bonusScore: 140,
    minDistance: 215,
    spawnGap: 5,
    description: "Reach 239 points and collect 15 coins",
  },
  {
    id: 67,
    name: "Run 67",
    targetScore: 243,
    targetCoins: 15,
    difficulty: 6,
    obstacleStyle: "rock",
    bonusCoins: 19,
    bonusScore: 142,
    minDistance: 218,
    spawnGap: 5,
    description: "Reach 243 points and collect 15 coins",
  },
  {
    id: 68,
    name: "Run 68",
    targetScore: 246,
    targetCoins: 15,
    difficulty: 6,
    obstacleStyle: "crate",
    bonusCoins: 19,
    bonusScore: 144,
    minDistance: 221,
    spawnGap: 5,
    description: "Reach 246 points and collect 15 coins",
  },
  {
    id: 69,
    name: "Run 69",
    targetScore: 250,
    targetCoins: 15,
    difficulty: 6,
    obstacleStyle: "bird",
    bonusCoins: 20,
    bonusScore: 146,
    minDistance: 224,
    spawnGap: 5,
    description: "Reach 250 points and collect 15 coins",
  },
  {
    id: 70,
    name: "Run 70",
    targetScore: 253,
    targetCoins: 15,
    difficulty: 6,
    obstacleStyle: "mixed",
    bonusCoins: 20,
    bonusScore: 148,
    minDistance: 227,
    spawnGap: 5,
    description: "Reach 253 points and collect 15 coins",
  },
  {
    id: 71,
    name: "Run 71",
    targetScore: 257,
    targetCoins: 16,
    difficulty: 6,
    obstacleStyle: "cactus",
    bonusCoins: 20,
    bonusScore: 150,
    minDistance: 230,
    spawnGap: 5,
    description: "Reach 257 points and collect 16 coins",
  },
  {
    id: 72,
    name: "Run 72",
    targetScore: 260,
    targetCoins: 16,
    difficulty: 6,
    obstacleStyle: "rock",
    bonusCoins: 20,
    bonusScore: 152,
    minDistance: 233,
    spawnGap: 5,
    description: "Reach 260 points and collect 16 coins",
  },
  {
    id: 73,
    name: "Run 73",
    targetScore: 264,
    targetCoins: 16,
    difficulty: 7,
    obstacleStyle: "crate",
    bonusCoins: 21,
    bonusScore: 154,
    minDistance: 236,
    spawnGap: 5,
    description: "Reach 264 points and collect 16 coins",
  },
  {
    id: 74,
    name: "Run 74",
    targetScore: 267,
    targetCoins: 16,
    difficulty: 7,
    obstacleStyle: "bird",
    bonusCoins: 21,
    bonusScore: 156,
    minDistance: 239,
    spawnGap: 5,
    description: "Reach 267 points and collect 16 coins",
  },
  {
    id: 75,
    name: "Run 75",
    targetScore: 271,
    targetCoins: 16,
    difficulty: 7,
    obstacleStyle: "mixed",
    bonusCoins: 21,
    bonusScore: 158,
    minDistance: 242,
    spawnGap: 5,
    description: "Reach 271 points and collect 16 coins",
  },
  {
    id: 76,
    name: "Run 76",
    targetScore: 274,
    targetCoins: 17,
    difficulty: 7,
    obstacleStyle: "cactus",
    bonusCoins: 21,
    bonusScore: 160,
    minDistance: 245,
    spawnGap: 5,
    description: "Reach 274 points and collect 17 coins",
  },
  {
    id: 77,
    name: "Run 77",
    targetScore: 278,
    targetCoins: 17,
    difficulty: 7,
    obstacleStyle: "rock",
    bonusCoins: 22,
    bonusScore: 162,
    minDistance: 248,
    spawnGap: 5,
    description: "Reach 278 points and collect 17 coins",
  },
  {
    id: 78,
    name: "Run 78",
    targetScore: 281,
    targetCoins: 17,
    difficulty: 7,
    obstacleStyle: "crate",
    bonusCoins: 22,
    bonusScore: 164,
    minDistance: 251,
    spawnGap: 5,
    description: "Reach 281 points and collect 17 coins",
  },
  {
    id: 79,
    name: "Run 79",
    targetScore: 285,
    targetCoins: 17,
    difficulty: 7,
    obstacleStyle: "bird",
    bonusCoins: 22,
    bonusScore: 166,
    minDistance: 254,
    spawnGap: 5,
    description: "Reach 285 points and collect 17 coins",
  },
  {
    id: 80,
    name: "Run 80",
    targetScore: 288,
    targetCoins: 17,
    difficulty: 7,
    obstacleStyle: "mixed",
    bonusCoins: 22,
    bonusScore: 168,
    minDistance: 257,
    spawnGap: 5,
    description: "Reach 288 points and collect 17 coins",
  },
];

// Controls:
// Sprig physical buttons: W/I/J jump, S/K duck, A shop, L buy, D pause.
// J restarts after a crash. Only Sprig-supported input keys are used.
// The player can practice freely; completing missions unlocks the next.

let score=0, best=0, tick=0, jumpTicks=0, gap=7, running=true;
let pace=180, timer=null;
const hazards=[C,R,B,F];
function hud() {
  clearText();
  addText("SCORE "+score,{x:0,y:0,color:color`0`});
  addText("BEST "+best,{x:0,y:1,color:color`0`});
  if (!running) {
    addText("GAME OVER",{x:4,y:5,color:color`3`});
    addText("W RESTART",{x:4,y:7,color:color`0`});
  }
}
function restart() {
  if(timer!==null) clearInterval(timer);
  setMap(scene);
  addSprite(2,9,D);
  addSprite(5,2,H);
  addSprite(12,3,H);
  score=0;tick=0;jumpTicks=0;gap=7;pace=180;running=true;
  hud();
  timer=setInterval(step,pace);
}
onInput("w",()=>{
  if(!running){restart();return;}
  if(jumpTicks===0) jumpTicks=6;
});
function step() {
  if(!running)return;
  tick++;
  const hero=getFirst(D);
  if(!hero)return;
  if(jumpTicks>0){
    hero.y=(jumpTicks===6||jumpTicks===1)?8:(jumpTicks===5||jumpTicks===2)?7:6;
    jumpTicks--;
  }else hero.y=9;
  for(const type of [C,R,B,F,H]){
    for(const item of getAll(type)){
      if(item.x===0){item.remove();if(type!==H)score+=5;}
      else item.x-=1;
    }
  }
  if(getTile(hero.x,hero.y).some(item=>hazards.includes(item.type))){
    running=false;
    best=Math.max(best,score);
    hud();
    return;
  }
  if(tick%2===0)score++;
  best=Math.max(best,score);
  if(tick%17===0)addSprite(15,2,H);
  gap--;
  if(gap<=0){
    const type=hazards[Math.floor(Math.random()*hazards.length)];
    addSprite(15,type===F?8:9,type);
    gap=Math.max(6,10-Math.floor(score/80))+Math.floor(Math.random()*3);
  }
  const newPace=Math.max(85,180-Math.floor(score/50)*8);
  if(newPace!==pace){
    pace=newPace;
    clearInterval(timer);
    timer=setInterval(step,pace);
  }
  hud();
}
restart();