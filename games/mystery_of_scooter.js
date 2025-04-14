/*
@title: Mystery of scooter
@description: Try to find the right house with the clues you're given!
@author: Lucas
@tags: []
@addedOn: 2022-09-08
*/

const player = "p";
const house = "h";
const house2 = "0";
const house3 = "1";
const house4 = "2";
const house5 = "3";
const house6 = "4";
const house7 = "5";
const house8 = "6";
const house9 = "7";
const house10 = "8";
const house11 = "9";

setLegend(
  [ player, bitmap`
................
................
................
................
........L.......
.........5......
..666....55.....
..666...555.....
..666....55.....
..55555..55.....
...55555555.....
...LLL...LLL....
....L.....L.....
................
................
................`],
  [ house, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555666655..
..566655655655..
..565655666655..
..565655555555..
..565655555555..
..565655555555..`],
  [ house2, bitmap`
................
.......77.......
......7777......
.....777777.....
....77777777....
...7777777777...
..777777777777..
.77777777777777.
7777777777777777
..777777777777..
..777777555577..
..755577577577..
..757577555577..
..757577777777..
..757577777777..
..757577777777..`],
  [ house3, bitmap`
................
.......77.......
......7777......
.....777777.....
....77777777....
...7777777777...
..777777777777..
.77777777777777.
7777777777777777
..777777777777..
..777777222277..
..722277277277..
..727277222277..
..727277777777..
..727277777777..
..727277777777..`],
  [ house4, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555777755..
..577755755755..
..575755777755..
..575755555555..
..575755555555..
..575755555555..`],
  [ house5, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555444455..
..544455455455..
..545455444455..
..545455555555..
..545455555555..
..545455555555..`],
  [ house6, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555333355..
..533355355355..
..535355333355..
..535355555555..
..535355555555..
..535355555555..`],
  [ house7, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555LLLL55..
..5LLL55L55L55..
..5L5L55LLLL55..
..5L5L55555555..
..5L5L55555555..
..5L5L55555555..`],
  [ house8, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555888855..
..588855855855..
..585855888855..
..585855555555..
..585855555555..
..585855555555..`],
  [ house9, bitmap`
................
.......55.......
......5555...LL.
.....555555..LL.
....55555555LLL.
...5555555555LL.
..555555555555L.
.55555555555555.
5555555555555555
..555555555555..
..555555662655..
..5LLL55255L55..
..56565566L655..
..565655555555..
..565655555555..
..565655555555..`],
  [ house10, bitmap`
................
.......LL.......
......5LL5......
.....55LL55.....
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555666655..
..566655655655..
..565655666655..
..565655555555..
..565655555555..
..565655555555..`],
  [ house11, bitmap`
................
.......55.......
......5555......
.....566665.....
....55655655....
...5556666555...
..555555555555..
.55555555555555.
5555555555555555
..555555555555..
..555555666655..
..566655655655..
..565655666655..
..565655555555..
..565655555555..
..565655555555..`],
);

setSolids([player]);


let level = 0;
const levels = [
  map`
.01234
......
p.....
.56789`,
  map`
........7.
.......7..
..7...7...
...7.7....
....7.....
..........`,
  map`
..0....0..
...0..0...
....00....
....00....
...0..0...
..0....0..`
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
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
  const faseAtual = levels[level];
  if (faseAtual !== undefined) setMap(faseAtual);
});
afterInput(() => {
  const objetivoejoga = tilesWith(player, house9).length;
  const objetivo = tilesWith(house9).length;

  if(objetivoejoga === objetivo){
    clearText();
    addText("You win!")
  }else{
    const erro = tilesWith(player, house2).length;
    const e1 = tilesWith(house2).length;
    if(erro === e1){
      clearText();
      addText("very far away!")
      }else{
        const erro2 = tilesWith(player, house3).length;
        const e2 = tilesWith(house3).length;
        if(erro2 === e2){
          clearText();
          addText("diagon!")
        }else{
          const erro3 = tilesWith(player, house4).length;
          const e3 = tilesWith(house4).length;
          if(erro3 === e3){
            clearText();
            addText("opposite!")
          }else{
            const erro4 = tilesWith(player, house5).length;
            const e4 = tilesWith(house5).length;
            if(erro4 === e4){
              clearText();
              addText("diagon!")
            }else{
              const erro5 = tilesWith(player, house6).length;
              const e5 = tilesWith(house6).length;
              if(erro5 === e5){
                clearText();
                addText("very far away!")
              }else{
                const erro6 = tilesWith(player, house7).length;
                const e6 = tilesWith(house7).length;
                if(erro6 === e6){
                  clearText();
                  addText("far away!")
                }else{
                  const erro7 = tilesWith(player, house8).length;
                  const e7 = tilesWith(house8).length;
                  if(erro7 === e7){
                    clearText();
                    addText("near!")
                  }else{
                    const erro8 = tilesWith(player, house10).length;
                    const e8 = tilesWith(house10).length;
                    if(erro8 === e8){
                      clearText();
                      addText("near!")
                    }else{
                      const erro9 = tilesWith(player, house11).length;
                      const e9 = tilesWith(house11).length;
                      if(erro9 === e9){
                        clearText();
                        addText("very far away!")
                      }else{
                        addText("")
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
});
