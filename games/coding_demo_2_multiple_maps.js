/*
@title: Coding Demo 2 - Dual Maps
@author: Leonard Maculo
@tags: []
@addedOn: 2022-09-13

Use the function addMap to add a background or another layer.
ex:
setMap(map`ab
..`);
addMap(map`cc
cc`);
*/

const player = "a";
const box = "b";
const bg = "c";

setLegend(
  [player, bitmap`
................
................
................
......44........
...444..444.....
..44......44....
..4..44..44.44..
..4..44..44..4..
..4..........4..
..4...44..44.4..
..44...4444..4..
....44.......4..
.....444444444..
......4..4......
...4444..4......
...44....444....`],
  [box, bitmap`
................
..333333333.....
..3....3...33...
..3....3....33..
..3....3.....3..
..3....3.....3..
..3....3.....3..
..3...333333333.
..3333.3.....3..
..3....3....3...
..33...3....3...
...3..33....3...
...3..3....33...
...33.33..33....
....3333333.....
................`],
  [bg, bitmap`
22221111LLLL0000
22221111LLLL0000
22221111LLLL0000
22221111LLLL0000
1111LLLL00002222
1111LLLL00002222
1111LLLL00002222
1111LLLL00002222
LLLL000022221111
LLLL000022221111
LLLL000022221111
LLLL000022221111
000022221111LLLL
000022221111LLLL
000022221111LLLL
000022221111LLLL`]
);

setSolids([player, box]);
setPushables({
  [ player ]: [box],
});

let level = 0;
const levels = [
  map`
.....
.....
.....
..ba.
.....`,
];
const addlevels = [
  map`
ccccc
ccccc
ccccc
ccccc
ccccc`,
];
function addMap(mapa){
  mapa = mapa.split("\n");
  for(var i = 0; i < mapa.length; i++){
    for(var j = 0; j < mapa[i].length; j++){
      if(mapa[i].charAt(j) !== "."){
        addSprite(j, i-1, mapa[i].charAt(j));
      }
    }
  }
}
setMap(levels[level]);
addMap(addlevels[level]);

onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});
onInput("d", () => {
  getFirst(player).x += 1
});

afterInput(() => {
  
});
