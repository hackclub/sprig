/*
@title: Simple Maze Game
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p";
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
................
....0.0000.0....
.....033330.....
.0..03H33H30..0.
0H0.03333330.0H0
H8H0033HH3300H8H
0H8HH033330HH8H0
H8H88H0000H88H8H
0H8HH033330HH8H0
H8H00HHHHHH00H8H
0H0.03333330.0H0
00..0HHHHHH0..00
....03333330....
.....0HHHH0.....
......0000......
................` ],
  [ wall, bitmap`
0000000000000000
0LLL011101110LL0
0LLL011101110LL0
0000000000000000
0101110LLL011100
0101110LLL011100
0000000000000000
0LLL011101110LL0
0LLL011101110LL0
0000000000000000
0101110LLL011100
0101110LLL011100
0000000000000000
0LLL01110LLL0110
0LLL01110LLL0110
0000000000000000` ],
  [ goal, bitmap`
..8..8..88.8.8..
.8H88H88HH8H8H8.
8H8HH8HH88H8H8H8
8H88828822828H8.
.8H8HHHHHHHH8H8.
8H82H8H8HH8H28H8
8H82HH8H8HHH28H8
.8H8H8H8H8HH8H8.
.8H8HH8H8H8H28H8
8H82HHH8H8HH28H8
8H82H8HH8H8H8H8.
.8H8HHHHHHHH28H8
8H82222828822H8.
8H8HH88H8HH88H8.
8HH88HH8H88HH8H8
888..88.8..88.88` ]
);

setSolids([ player, wall ]);

let level = 0;
const levels = [
  map`
wpwwwwwwwgw
w.......w.w
wwwwwww.w.w
w.....w.w.w
w.wwwww.w.w
w.......w.w
w.wwwwwww.w
w.w...w...w
w...w...w.w
wwwwwwwwwww`,
  map`
pwwwwwwww.g
........w.w
w.wwwww.w.w
w.w...w.w.w
w.w.w.w.w.w
w.w.w.w.w.w
w.w.w.w.w.w
w.w.w.w.w.w
w...w.www.w
wwwww.....w`,
  map`
wwwwwwwwwwwwwwwwwwwww
w...w.....w.....w.w.w
w.w.w.www.wwwww.w...w
w.w.w...w.....w.w.w.w
w.wwwwwww.w.www.w.w.w
w.........w.....w.w.w
w.www.wwwww.wwwww.w.w
w.w...w...w.w.....w.w
w.wwwww.w.w.w.www.w.w
p.....w.w.w.w.w.w.w.g
wwwww.w.w.w.w.w.w.www
w.....w.w.w...w.w.w.w
w.wwwwwww.wwwww.w.w.w
w.......w...........w
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.....w.....w...........w.....g
w.www.w.w.wwwwwww.w.wwwww.www.w
w...w.w.w.w.....w.w.........w.w
www.w.w.w.w.www.w.wwwwwwwww.w.w
w...w...w...w...w...w...w...w.w
www.wwwwwww.w.wwwww.w.w.wwwww.w
w.w.......w.w.w...w.w.w.w.....w
w.w.www.www.w.w.w.w.w.w.w.www.w
w.w.w.w.w...w...w.w.w.w.w.w.w.w
w.w.w.w.w.wwwwwww.www.w.w.w.www
w...w...w.w.....w...w.w...w...w
www.wwwww.www.w.www.w.wwwww.w.w
w.......w.....w.w.w.w.w.....w.w
www.www.w.wwwww.w.w.w.w.wwwww.w
w.w.w.w.w.....w.w.w...w...w.w.w
w.www.w.wwwww.w.w.wwwwwww.w.w.w
w...w.w.....w.w...........w...w
www.w.wwwww.w.wwwwwwwwwww.w.www
w.w.........w...w.....w.w.w.w.w
w.w.wwwwwwwwwww.w.w.www.w.w.w.w
w.w.....w.....w.w.w.w...w.w...w
w.wwwwwww.www.w.w.w.www.w.w.w.w
w...........w.w...w.........w.w
w.wwwww.www.w.wwwwwww.wwwww.www
w.w.....w.w.w.w.......w.....w.w
www.wwwww.w.www.wwwwwww.wwwww.w
w.........w.....w.w...........w
w.wwwwwww.wwwwwww.w.www.wwwww.w
p.w.......w.........w...w.....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const playerSprite = getFirst(player);
  const goalSprite = getFirst(goal);

  if (playerSprite.x === goalSprite.x && playerSprite.y === goalSprite.y) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
    }
  }
});
