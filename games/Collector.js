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

setMap(map`
wwwwwwwwwwwwwcd
l.cc....cd.cdcd
l..wwww..d.ddcd
l.c..c.c.d..dcd
lc.wwww..d..dcd
l.....c.cd.cdcd
lp.c.c...dl.dcd
wwww..wwww..dcd
l.....c..dc.dcd
l..c.......cdcd
l..w....cd..dcd
l..cc....dlc..d
l..lclc..dc.d.d
wwwwwwwwwwwwwwd`);

let pontos = 0;
const total = getAll(moeda).length;

function mostrarPlacar() {
  clearText();
  addText("coins: " + pontos + "/" + total, { x: 4, y: 15, color: color`9` });
}
mostrarPlacar();

onInput("w", () => { getFirst(jogador).y -= 1; });
onInput("s", () => { getFirst(jogador).y += 1; });
onInput("a", () => { getFirst(jogador).x -= 1; });
onInput("d", () => { getFirst(jogador).x += 1; });

afterInput(() => {
  const encontros = tilesWith(jogador, moeda);

  for (const tile of encontros) {
    for (const sprite of tile) {
      if (sprite.type === moeda) {
        sprite.remove();
        pontos += 1;
      }
    }
  }

  mostrarPlacar();

  if (getAll(moeda).length === 0) {
    addText("U WIN!", { x: 6, y: 7, color: color`0` });
  }
});