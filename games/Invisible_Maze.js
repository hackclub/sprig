/*
@title: Invisible Maze
@author: Ryan Qin
@tags: ['puzzle']
@addedOn: 2022-12-07
*/

const player = "p";
const wall = "w";
const special = "s"
const route = "e"
const hidden = "h"
const grass = "g"
const sun = "y"
const free = "f"

setLegend(
  [ player, bitmap`
................
....0......0....
....00....00....
....060..060....
....06600660....
...0666666660...
..066666666660..
.06660666066660.
.06606660666660.
.06606660666660.
.06666066666660.
..066060666660..
...0666666660...
....00000000....
................
................`],
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
1111111111111111`],
  [ special, bitmap`
................
.......000......
......0HHH0.....
.....0H888H0....
....0H88888H0...
....0H88888H0...
....0H88888H0...
....0H88888H0...
....0H88888H0...
....0H88888H0...
....0H88888H0...
....0H88888H0...
.....0H888H0....
......0HHH0.....
.......000......
................`],
  [ route, bitmap`
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
  [ hidden, bitmap`
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
  [ grass, bitmap`
................
................
................
................
................
................
................
.............D..
...D......D..D..
..DD..D..DD.DD.D
..DD.DD.DD..D.DD
.DDDDD.DDD..D.DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ sun, bitmap`
.......66.......
..66...66...66..
.666........666.
.66..666666..66.
....66666666....
...6666666666...
66.6666666666.66
66.6666666666.66
66.6666666666.66
...6666666666...
...6666666666...
....66666666....
.66..666666..66.
.666........666.
..66...66...66..
.......66.......`],
  [ free, bitmap`
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
7777777777777777`]
);

setSolids([player, route, free]);

let level = 0;
const levels = [
  map`
wwwwwwwwww
wwwwwwwwww
eeeeeeeeee
swwwwwwwwp
eeeeeeeeee
wwwwwwwwww
wwwwwwwwww`,
  map`
eeeeeeeeeeeep
e............
eeeeeeeee.eee
s.......e.e..
ee.e....e.e..
ee.e...he.e..
ee.eeeeee.eee
.............
.e.eeeeee.eee
.e.e....e.e..
.e.e....e.e..
eeee....e.e..
s.......eee..`,
  map`
.......ese......
.......eee......
.......e.eeeeeee
.......e........
.......e.eeeeee.
.......e.eh.....
wwweeeee.eeeeee.
se......p.....es
wwweeeee.eeeeeee
.e.....e.e......
.eeeeeee.e......
.........e......
eeeeeeee.e......
.......e.e......
.......eee......
.......ese......`,
  map`
se.e.e.....p...e.e.es
e...e...........e....
.e.e.............e.e.
e.................e.e
.e.................e.
e...................e
.....................
.....................
.........e.e.e.......
..........ese........
.........e.e.e.......
.....................
.....................
.....................
.....................
....................e
.e.................e.
..e...............e.e
...e.............e.e.
ee..e...........e.e.e
s..e.e.........e.e.es`,
  map`
eeeeeeeeeeeeeeeeeeeee
e..................e.
e.eee.eeeeeeee.eee.e.
e.e..........e.ese.e.
e.e..........e.e.e.e.
e.e....eeeeeeeee.e.e.
e.eeee.e..e...e..e.e.
e.e....e....e....e.e.
e.e.eeee.eeeee.s.e.e.
e.e....e.e.e.e...e.e.
e.eeee.e.e.e.eeeee.e.
e.e....e.e.e.........
e.e.eeee.e.e.eeeeeeee
e.ee...e.e.e.........
e.e....e.e.eeeeeeeee.
e.e....e.e.........e.
e.e....e.e.........e.
e.e....e.e.........e.
e.eeeeee.eeeeeeeeeee.
e....................
eeeeeeeeeeeeeeeeeeeep`,
  map`
.................y
..................
.fff.f...fff.fff..
.f...fff.fpf.fpf..
.fff.f...fff.fff..
.f...f...f...f....
.f...f...fff.fff..
..................
eeeeeeeeeeeeeeeeee
gggggggggggggggggg`
];
setBackground(wall)

setMap(levels[level]);

setPushables({
  [ player ]: [special]
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});



afterInput(() => {
  const targetNumber = tilesWith(player).length;
  const numberCovered = tilesWith(player, special).length;

    const playerSprite = getFirst(player)
    const hiddenSprite = getFirst(hidden)
   if (hiddenSprite && playerSprite.x == hiddenSprite.x && playerSprite.y == hiddenSprite.y) {
    addText("Easter Egg!", {
        y: 2,
      color: color `9`
    })
    };

   if (hiddenSprite && playerSprite.x != hiddenSprite.x && playerSprite.y != hiddenSprite.y) {
    clearText()
    };
  
  if (numberCovered === targetNumber) {
    level = level + 1;
    clearText()

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Good Game!", { y: 4, color: color`3` });
    }
  }
});
