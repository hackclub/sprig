/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Target Practice
@author: Ankit Kantheti 
@tags: []
@addedOn: 2024-09-03
*/
//
const player = "P";
const target = "T";
const background = "B";

setLegend(
  [player, bitmap`
................
.....00000000...
.....0CCCCCC0...
.....00000CC0...
.....02220000...
.....02222220...
.....02022020...
.....02222220...
....0020000200..
....00CCCCCC00..
....00FFFFFF00..
....00FFFFFF00..
....00FFFFFF00..
.....0FFFFFF0...
.....00000000...
................`],
  
  [target, bitmap`
................
................
................
.......HH.......
......HHHH......
......HHHH......
....HH2222HH....
...HHH2002HHH...
....HH2222HH....
......HHHH......
......HHHH......
.......HH.......
................
................
................
................`],

  [background, bitmap`
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
DDDDDDDDDDDDDDDD`]
);

let level = map`
PBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBB
TBBBBBBBBBBBBBBB`;

setMap(level);

const movePlayer = (dx, dy) => {
  const playerTile = getFirst(player);
  playerTile.x += dx;
  playerTile.y += dy;
};

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

const shoot = () => {
  const playerTile = getFirst(player);
  const targetTile = getFirst(target);

  if (playerTile.x === targetTile.x || playerTile.y === targetTile.y) {
    targetTile.x = Math.floor(Math.random() * 16);
    targetTile.y = Math.floor(Math.random() * 16);
    addText("Hit!", { x: 1, y: 1, color: color`3` });
  } else {
    addText("Miss!", { x: 1, y: 1, color: color`2` });
  }

  setTimeout(clearText, 500); 
};

onInput("j", () => shoot());

