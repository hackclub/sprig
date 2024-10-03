/*
@title: the_invisible_man
@author: Gárdonyi Bálint (Valentine)
@tags: ['puzzle']
@addedOn: 2022-11-14
MOVEMENT: WASD
In this game, you have to collect coins. The catch? You are invisible! (the player is invisible, but it is there somewhere)
You have to find, and keep track of the location of your character. Or just press random keys, and hope it works out...
*/

const player = "p";
const coin ="c";

setLegend(
  [ coin, bitmap`
................
................
....66666666....
...6666666666...
..6666FFFF6666..
..666F6666F666..
..666F6666F666..
..666F6666F666..
..666F6666F666..
..666F6666F666..
..666F6666F666..
..6666FFFF6666..
...6666666666...
....66666666....
................
................`],
  [ player, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
);

setSolids([coin]);

let level = 0;
const levels = [
  map`
p......
.......
...c...
.......
.......
.......
.......`,
];

setMap(levels[level]);

setPushables({
  [ player]: [],
});
//Places the invisible man on a random spot
getFirst(player).y = Math.floor(Math.random() * 7);
getFirst(player).x = Math.floor(Math.random() * 7);
let playery = getFirst(player).y;
let playerx = getFirst(player).x;

//Places the coin on a random spot
getFirst(coin).y = Math.floor(Math.random() * 7);
getFirst(coin).x = Math.floor(Math.random() * 7);
let coinx = getFirst(coin).x;
let coiny = getFirst(coin).y;

//Makes sure, the coin and the invisible man are not spawned in the same location
//If you are REALLY unlucky, you might get stuck in an infinite loop, and your system could crash, but the chance of that is negligible
while(coiny == playery && coinx == playerx){
  getFirst(coin).x = Math.floor(Math.random()*7)
  getFirst(coin).y = Math.floor(Math.random()*7)
  coiny = getFirst(coin).y
  coinx = getFirst(coin).x
}
//Handles player movement
onInput("s", () => {
  getFirst(player).y += 1
  playery = getFirst(player).y
});

onInput("w", () => {
  getFirst(player).y -= 1
  playery = getFirst(player).y
});

onInput("a", () => {
  getFirst(player).x -=1
  playerx = getFirst(player).x
});

onInput("d", () => {
  getFirst(player).x +=1
  playerx = getFirst(player).x
});
 //Checks if the coin has been found by the invisible man, and if yes, spawns a new one at a location, which is not equal to the position of the invisible man
afterInput(() => {
  while(getFirst(player).y == getFirst(coin).y && getFirst(player).x == getFirst(coin).x){
  getFirst(coin).y = Math.floor(Math.random() * 7)
  getFirst(coin).x = Math.floor(Math.random() * 7)
  coiny = getFirst(coin).y
  coinx = getFirst(coin).x
}})

//Debug stuff, I'll leave this in in case someone playing from the browser wants it
afterInput(() => {
  // console.log("playery "+playery);
  // console.log("playery "+playerx);
  // console.log("coinx "+coiny);
  // console.log("coinx "+coinx);
  // console.log("--------------------");
})



