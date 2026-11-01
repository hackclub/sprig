/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Test
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const rock = "r"
const paper = "p"
const scissoors = "s"

setLegend(
  [ rock, bitmap`
................
................
................
......LLLL......
....LL222LLL....
....L22LLLLLL...
...LL2LLLLLLLL..
...LLLLLLLLLLL..
...LLLLLLLLLL0..
...LLLLLLLL00...
....LLLLLL000...
....LLLLL000....
.....LLL000.....
.......L00......
................
................` ],
  [ paper, bitmap`
................
................
.........22.....
........2222....
.......222222...
......22222222..
.....2222222222.
....22222222221.
...22222222221..
..22222222221...
..1222222221....
...12222221.....
....122221......
.....1221.......
......11........
................`],
  [ scissoors, bitmap`
................
..1.........11..
..11.......11...
...111....11....
....111..111....
......1111......
.......11.......
......1111......
.....11..11.....
....333..333....
...33.3..3.33...
..33..3..3..33..
..3..33..33..3..
..3.33....33.3..
..333......333..
................`]
);

setSolids([])

let level = 0
const levels = [
  map`
rr`,
  map`
rp`,
  map`
rs`,
  map`
pr`,
  map`
pp`,
  map`
ps`,
  map`
sr`,
  map`
sp`,
  map`
ss`,
];

onInput("w", () => {
  let randomLevel = Math.floor(Math.random() * 9);
});

onInput("w", () => {
  let randomLevel = Math.floor(Math.random() * 9); // 1. Générer un nombre aléatoire

  setMap(levels[randomLevel]) // 2. Récupérer la map correspondante

  // 3. Afficher cette map

});

// input to reset level

const currentLevel = levels[level]; // get the original map of the level


setMap(levels[level])

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


afterInput(() => {
  
})