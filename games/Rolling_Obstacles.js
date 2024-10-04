/*
@title: Rolling Obstacles
@author: Ruhan Pandit
@tags: ['puzzle']
@addedOn: 2023-02-02
*/

const player = "p";
const obstacles = "o";
const coin = "c";
const bg = "b";
let score = 0;
let x = 0;
let y = 0;
let coinx = 0;
let coiny = 0;

setLegend(
  [ player, bitmap`
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777700007777777
1111000000111111
7777000000777777
1111000000111111
7777700007777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111`],
  [obstacles, bitmap`
7777777777777777
1111111111111111
7777777777777777
1111111001111111
7777777007777777
1111111001111111
7777777007777777
1111111001111111
7777777007777777
1111111001111111
7777777007777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111`],
  [coin, bitmap`
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777776666777777
1111166666611111
7777766FF6677777
1111166666611111
7777776666777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111`],
  [bg, bitmap`
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111
7777777777777777
1111111111111111`]
);

setBackground(bg);
setSolids([ player, obstacles ]);

const levels = [
  map`
pbbbbbob
bbbbbobb
oobbobbb
bbbbbbob
obbbbbob
bobbbbob
bcbbbbbb
bboobobb
bbbbbbbb`,
  map`
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb`
];
setMap(levels[0]);

addText("Score: "+score, {
  x: 6,
  y: 15,
  color: color`0`
})

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  coinx = 0;
  coiny = 0;
  if(getFirst(player).x == getFirst(coin).x) {
    if(getFirst(player).y == getFirst(coin).y) {
      score = score + 1;
      clearText();
      addText("Score: "+score, {
        x: 6,
        y: 15,
        color: color`0`
      })

      clearTile(getFirst(coin).x, getFirst(coin).y);
      while((coinx < 2 || coinx > 5) || (coiny < 4 || coiny > 6)) {
        coinx = Math.floor(Math.random() * 5) + 2;
        coiny = Math.floor(Math.random() * 6) + 4;
      }
      addSprite(coinx, coiny, coin);
      addSprite(1, 1, player);
    }
  }

  if(score > 14) {
    setMap(levels[1]);
      addText("Game Over!", {
        x: 5,
        y: 7,
        color: color`0`
      })
  }
})
