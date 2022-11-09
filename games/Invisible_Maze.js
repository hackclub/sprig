/*
@title: Invisible Maze
@author: Ryan Qin
*/

const player = "p";
const wall = "w";
const special = "s"
const route = "e"
const hidden = "h"

setLegend(
  [ player, bitmap`
................
....33333333....
...3333333333...
..335553355533..
.33355533555333.
.33355533555333.
.33355533555333.
.33355533555333.
.33333333333333.
.33333333333333.
.33355555555333.
.33355555555333.
..333333333333..
...3333333333...
....33333333....
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
4444444444444444
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4444444444444444`],
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
111111111111111L`]
);

setSolids([player, route]);

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
.e.e....e.e..
........eee..`,
  map`
eeeeeeeeeeeeeeeeeeeee
e..................e.
e.eee.eeeeeeee.eee.e.
e.e..........e.e.e.e.
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
e.e.s..e.e.eeeeeeeee.
e.e....e.e.........e.
e.e....e.e.........e.
e.e....e.e.........e.
e.eeeeee.eeeeeeeeeee.
e....................
eeeeeeeeeeeeeeeeeeeep`
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
  
  if (numberCovered === targetNumber) {
    level = level + 1;
    clearText()

   

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Thanks For Playing!", { y: 11, color: color`7` });
    }
  }
});
