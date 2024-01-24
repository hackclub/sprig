/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Slime Farmer
@author: Robyn Feider
@tags: [puzzle] [strategy] [beginner]
@img: ""
@addedOn: 2024-01-24

play as a slime farmer and bring all of the excaped slimes home!
this is my first game ever :)

w - move up
a - move left
s - move down
d - move right
j - reset level
*/



const player = "p";
const slime = "l";
const background = "b";
const tree = "t";
const corral = "c";
const haybale = "h";
const myTune = tune`
80,
80: C4~80,
2400`;
const barrel = "a";


setLegend(
  [ player, bitmap`
................
................
......0000......
....00222200....
...0222222220...
...0222222220...
...0120220220...
...0120220220...
...0182222820...
....01112220....
.....000000.....
....02HHHH20....
...010HHHH020...
....00HHHH00....
.....000000.....
................` ],
  [ slime, bitmap`
................
................
................
................
.....000000.....
....07777770....
...0777777770...
...0570770770...
...0570770770...
...0557777770...
....05555770....
.....000000.....
................
................
................
................` ],
  [ background, bitmap`
4444444444444444
444444D44444D444
4444444444444444
44D4444444444444
444444444D444444
4444444444444444
44444444444444D4
44D4444444444444
4444444444444444
444444D444444444
4444444444444D44
4444444444444444
444D444444444444
4444444444444444
4444444444D44444
4444444444444444` ],
  [ tree, bitmap`
................
................
......0000......
....00444400....
...0D44444440...
...0D44444440...
...0D44444440...
...0D44444440...
...0DD4444440...
....00DD4400....
......0000......
......0CC0......
......0CC0......
.....0CCCC0.....
....00000000....
................` ],
  [ corral, bitmap`
................
................
.0000.0000.0000.
.0CC0.0CC0.0CC0.
.0CC0.0CC0.0CC0.
.0CC000CC000CC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CC000CC000CC0.
.0CC0.0CC0.0CC0.
.0CC0.0CC0.0CC0.
.0000.0000.0000.
................
................
................
................` ],
  [ haybale, bitmap`
................
................
......0000......
....00666600....
...0F66666660...
...0006666000...
...0F60000660...
...0F66666660...
...0F66666660...
...0336666330...
...0F63333660...
...0F66666660...
...0FF6666660...
....00F66600....
......0000......
................` ],
  [ barrel, bitmap`
................
................
......0000......
....00CCCC00....
...0CCCCCCCC0...
...000CCCC000...
...0CC0000CC0...
...0CCCCCCCC0...
...0LLCCCC110...
...0CC1111CC0...
...0CCCCCCCC0...
...0LLCCCC110...
...0CC1111CC0...
....00CCCC00....
......0000......
................` ]
);

setBackground(background)

let level = 0;
const levels = [
  map`
  tttttttttt
  t........t
  t.....c..t
  t........t
  t..l.....t
  tp.......t
  tttttttttt`,
  map`
  tttttttttt
  t...hh...t
  t.l.hh.c.t
  t...hh...t
  t........t
  tp.......t
  tttttttttt`,
  map`
tttttttttt
t..h....ct
t.lh...hht
t..h..h..t
t........t
tp..h....t
tttttttttt`,
  map`
tttttttttt
t...h..c.t
t.h.h....t
t.h.hh.h.t
t......h.t
t..hl....t
ttttpttttt`,
  map`
ttttcctttt
t........t
t..h..hl.t
t.lh..h..t
t..h..hhht
thhh....pt
tttttttttt`,
  map`
tttttttttt
t..h..hhct
t.lh.....t
t.lh.....t
t.....h..t
th..p.h.ct
tttttttttt`,
  map`
tttttctttt
t.h.h....t
t.l.h..l.t
t......h.t
t.lhh.h..t
t..p..h..c
tttttttttt`,
  map`
tttttttttt
t..hch...t
t...a....t
t......l.t
t.p......t
t........t
tttttttttt`,
  map`
ttttcttttt
thhh...h.t
tp.hah.h.t
t.l..h...t
t..h.h...t
t........t
tttttttttt`,
  map`
tttttttttt
thh..p.hht
th.....a.c
t.al.hh..t
t..a.....t
t........t
tttttttttt`,  
  map`
tttttttttt
thh......t
thca...l.t
t.a.aa.a.t
t.l...acht
tp.....hht
tttttttttt`,
  map`
tttttttttt
tchhp.hhct
t..h..h..t
t........t
t..la.l..t
th.a..a.ht
tttttttttt`,
];
  
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, slime, haybale, tree, barrel]);

setPushables({
  [ player ]: [slime, barrel],
  [ slime ]: [slime]
})

onInput("w", () => {
  getFirst(player).y -= 1; 
  playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x -= 1; // 
  playTune(myTune);
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);
});

onInput ("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(corral).length;
  const numberCovered = tilesWith(corral, slime).length;

  if (targetNumber === numberCovered) {
    level = level + 1;
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("YOU WIN!", {y: 8, color: color`8` });
    }
  }
});