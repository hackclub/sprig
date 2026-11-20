/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: collector
@description:This is a simple game where you have to collect all the coins on the map. This game was made 1000000% by a HUMAN, a HUMAN! 
@author: @Developer-Vini(Marcinho)
@tags: ['game', 'collect', 'coins', 'collector']
@addedOn: 2026-11-04
*/

const jogador = "p";
const moeda = "c";
const parede = "w";
const lateral = "l";
const lateralD = "d"

let faseAtual = 0;
let pontos = 0;

setLegend(
  [jogador, bitmap`
................
................
...5555555555...
...5CCCCCCCC5...
...5C22CC22C5...
...5C22CC22C5...
...5C22CC22C5...
...5CCCCCCCC5...
...5CCCCCCCC5...
...5C2CCCC2C5...
...5CC2222CC5...
...5CCCCCCCC5...
...5555555555...
................
................
................`],
  [moeda, bitmap`
................
................
.....666666.....
....6FFFFFF6....
...6FF9999FF6...
..6FF9LLLL9FF6..
..6FF9L11L9FF6..
..6FF9L11L9FF6..
..6FF9LLLL9F6...
...6FF9999FF6...
....6FFFFFF6....
.....666666.....
................
................
................
................`],
  [lateral, bitmap`
CCCCCCCCLCC4DD44
CLCCCCCCCCC44444
CCCCLLLCCCC4D444
CCCCCCCLCCCDD4D4
CCCCCCCLCCC44D44
LLLCCLCCCCC44444
LLCCCCCLCCC44444
CLLCCCCLLCC44444
CCCCCCLLCCC44444
CCCLLCCLCCC4DD44
CCLCCCCCCCC44DD4
CCLCCLCCLCCDD444
CCCCLLCCCLCD4444
CCCLLCCCCLL44DD4
CCCCLCCLCCC44444
CCCCCCCCCCC444D4`],
  [lateralD, bitmap`
44444CCCLCCCCCCC
444D4CCCCCCCCCCC
444D4LLCCCCCLLCC
44444CCLCCLCCLCC
4D444CCLCCLCLCCC
4DD44LCCCCLCLCCC
4DD44CCLCCCCCLLC
44444CCLLCCCCLCC
44DD4CLLCCCCCCLC
444D4CCLCCCCCCLC
4D444CCCCCCCCCCC
4DD44LCCLCCCLCCC
44444LCCCLCCLCCC
4DD44CCCCLLCCCCL
44DD4CCLCCCCLCCL
44444CCCCCCLCCCC`],
  [parede, bitmap`
44444444444444D4
44DD4444444444D4
44D44D4444DDD4D4
44D4444444444444
CCCCCCCCCCCCCCCC
LLLCCCCCCCCCCCCC
LLCCCCCLCCCCCCLC
CLLCCCCLLCCCLLLC
CCCCCCCCCCCLCCCC
CCCLLCCCCCCLCCCC
CCLCCCCCCCCLLCCC
CCLCCLCCLCCCLCCC
CCCCLLCCCLCCLLCC
CCCLLCCCCLLCCLCC
CCCCLCCLCCCCCCCC
CCCCCCCCCCCCCCCC`],
);

setSolids([jogador, parede, lateral, lateralD]);

const fases = [
  map`
  wwwwwwwwwwwwwww
  w.............w
  w.p..c....c...w
  w.wwww........w
  w....c...ww...w
  w.............w
  w..wwww...c...w
  w.c...........w
  w.....c.......w
  w...........c.w
  w.............w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  w.............w
  w.p.c...w.....w
  w..ww...w..c..w
  w..w....w.....w
  w..w..c...ww..w
  w..wwww....w..w
  w.c......c.w..w
  w....wwww....ww
  w..c.........ww
  w...........c.w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  w.............w
  w.p.c...w.....w
  w..w...w..c...w
  w..w....w.....w
  w..w..c...ww..w
  w..ww....w..w.w
  w.c......c.w..w
  w....ww....wwww
  w..c.........ww
  w...........c.w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  w.............w
  w.p.c...w.....w
  w..ww...w..c..w
  w..w....w.....w
  w..w..c...ww..w
  w..wwww....w..w
  w.c......c.w..w
  w....wwww....ww
  w..c.........ww
  w...........c.w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  w.............w
  w.p.c...w.....w
  w..wwww.w..c..w
  w..w....w.....w
  w..w..cw..ww..w
  w..wwwww...w..w
  w.c...ww.c.w..w
  w....wwww....ww
  w..c.........ww
  w....w.w..wwc.w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  w.............w
  w.p.c...w.w.w.w
  w..ww...w.wcw.w
  w..w....w.www.w
  w..w..c...ww..w
  w..wwww....w..w
  w.c.....wc.w..w
  w..w.wwww....ww
  w.wc.........ww
  w..w........c.w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  w.....c.......w
  w.p.c...w.....w
  w..ww...w..w..w
  w..ww...w.....w
  w..wwwc...ww..w
  w..wwwww...w..w
  w.ww.....c.w..w
  w..c.wwww....ww
  w..wwwwwww...ww
  w...wcc.....c.w
  wwwwwwwwwwwwwww`,
  map`
  wwwwwwwwwwwwwww
  wp....w....c..w
  w.ww.ww.wwww..w
  w.c..w...w....w
  wwww.w.w.w.wwww
  w....w.w...c..w
  w.wwww.wwwwww.w
  w.c....w......w
  w.wwww.w.wwww.w
  w....c..w...c.w
  w.wwwwwwwwww..w
  wwwwwwwwwwwwwww`
];

function carregarFase() {
  setMap(fases[faseAtual]);

  clearText();

  addText("fase " + (faseAtual + 1), { x: 5, y: 1, color: color`9`});
  addText("coins: " + getAll(moeda).length, { x: 3, y: 15, color: color`9`});
}

carregarFase();

onInput("w", () => {const player = getFirst(jogador);if (player) player.y -= 1;});
onInput("s", () => {const player = getFirst(jogador);if (player) player.y += 1;});
onInput("a", () => {const player = getFirst(jogador);if (player) player.x -= 1;});
onInput("d", () => {const player = getFirst(jogador);if (player) player.x += 1;});

afterInput(() => {
  const encontros = tilesWith(jogador, moeda);

  for (const tile of encontros) {
    for (const sprite of tile) {
      if (sprite.type === moeda) {
        sprite.remove();
        pontos++;
      }
    }
  }
  clearText();

  addText("fase: " + (faseAtual + 1), { x: 4, y: 1, color: color`9`});
  addText("coins: " + getAll(moeda).length, { x: 3, y: 15, color: color`9`});

  if (getAll(moeda).length === 0) {

    if (faseAtual < fases.length - 1) {
      faseAtual++;
      carregarFase();
    } else {
      clearText();
      
      addText("U WIN!", { x: 5, y: 6, color: color`6`});
      addText("score: " + pontos, { x: 5, y: 9, color: color`9`});
    }
  }
});
