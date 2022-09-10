 

/*
@title: helicopter
@author: oliveiragabriel1
*/

const player = "p";
const obj1 = "8";
const obj2 = "2";
const wall = "o";
const final = "f";

setLegend(
  [ player, bitmap`
.....55555555...
........5.......
.......555......
.5..55555555....
.555555555555...
.5...555555.....
......5..5......`],
  [ wall, bitmap`
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
  [ final, bitmap`
................
................
................
................
...444444446....
...444444446....
...444444446....
...444444446....
...444444446....
...444444446....
...444444446....
...444444446....
...444444446....
................
................
................`],
  [ obj1, bitmap`
.....66666666...
........6.......
.......666......
.6..66666666....
.666666666666...
.6...666666.....
......6..6......`],
  [ obj2, bitmap`
.....33333333...
........3.......
.......333......
.3..33333333....
.333333333333...
.3...333333.....
......3..3......`],
);

let level = 0;
const levels = [
  map`
poo..o.
.o.2.8.
...o...
..of..o`,
  map`
pof...o
.oooo..
..28...
o......`,
  map`
p.ofo..
..o....
..ooo2.
o....8.`,
];
const currentLevel = levels[level];
setMap(currentLevel);

setMap(levels[level]);

setPushables({
  [ player ]: [ obj1, obj2 ],
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

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});

setSolids([wall, player, obj1, obj2 ]);

afterInput(() => {
  

  const atual = tilesWith( player, final).length;
  const f2 = tilesWith(final).length;
   if (atual === f2) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You win!",{
        y: 5,
        color: [ 255, 0, 0 ] 
      })
    }
  }
});