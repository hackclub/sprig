
/* 
@title: Antivirus
@author: Nathan Jereb
@tags: ['action']
@addedOn: 2023-05-03
*/

    //my insperation is space invaders//

const background = "b"
const player = "p"
const attacku = "u"
const attackr = "r"
const attackd = "d"
const attackl = "l"
const enemy = "e"
var dead = false;
var score = 0;
var spawnrate = 1000;
var spawn = setInterval(spawnE,spawnrate)

setLegend(
  [player, bitmap`
..7777777777....
.7LLLLLLLLLL7...
.7L44444444LL7..
.7L40044004LLL7.
.7L40044004LLL7.
.7L44444444LLL7.
.7L44044044LLL7.
.7L44400444LL7..
.7LLLLLLLLLL7...
..7770000777....
...7LLLLLL7.....
...7L00L4L7.....
....7LLLL7......
...70000007.....
..7010110107....
...70000007.....`],
  [enemy, bitmap`
..3.3...33...3..
.39393.3993.393.
.33999399993993.
.39969996699993.
.39622222222693.
.39202222220293.
.39203222230293.
.39203222230293.
.32222200222223.
.32222000022223.
.32222222222223.
.32022022022023.
.32000000000023.
.32000000000023.
.32200200200223.
..322222222223..`],
  [attacku, bitmap `
.......77.......
......7557......
.......7557.....
.....7..7557....
....7....7557...
.....7..7557....
....7..7557.....
......7557......
.....7557.......
....7557........
...7557.........
....7557........
.....7557.......
......7557......
.......7557.....
........77......`],
  [attackl, bitmap `
................
................
................
....7...........
...757..........
..75557.......7.
.7557557.....757
7557.7557...7557
757...7557.7557.
.7.....7557557..
...7.7..75557...
....7.7..757....
..........7.....
................
................
................`],
  [attackr, bitmap `
................
................
................
.....7..........
....757..7.7....
...75557..7.7...
..7557557.....7.
.7557.7557...757
7557...7557.7557
757.....7557557.
.7.......75557..
..........757...
...........7....
................
................
................`],
  [attackd, bitmap `
......77........
.....7557.......
......7557......
.......7557.....
........7557....
.........7557...
........7557....
.......7557.....
......7557......
.....7557..7....
....7557..7.....
...7557....7....
....7557..7.....
.....7557.......
......7557......
.......77.......`],
  [background, bitmap`
5555444444445555
5775DD0DDDDD5775
5775D0D000005775
5555DD0DDD0D5555
4D0DDDDDDD0DDDD4
4D0DDD0DDD0DDDD4
400000D0D0D0DDD4
40DDDD0DDD0DDDD4
40DDDDDDDDDD0DD4
40DD0DDDDDD0D0D4
4000D0DDDDDD0DD4
4DDD0DDD0DDD0DD4
5555DDD0D0005555
5775DDDD0DDD5775
5775DDDDDDDD5775
5555444444445555`]
);
setBackground(background)

setSolids([])

let level = 0
const levels = [map`
..........e
...........
...........
...........
...........
...........
...........
...........
.....p.....
...........
...........`]
setMap(levels[level])

//player movement//
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1;
});

//player attack input//
onInput("j", () => {
  let x = getFirst(player).x - 1;
  let y = getFirst(player).y;
  addSprite(x, y, attackl);
})
onInput("k", () => {
  let x = getFirst(player).x;
  let y = getFirst(player).y + 1;
  addSprite(x, y, attackd);
});
onInput("i", () => {
  let x = getFirst(player).x;
  let y = getFirst(player).y - 1;
  addSprite(x, y, attacku);
})
onInput("l", () => {
  let x = getFirst(player).x + 1;
  let y = getFirst(player).y;
  addSprite(x, y, attackr);
});

//attack movement//
function moveA(){
  for (var i = 0; i < getAll(attackd).length; i++) {
      getAll(attackd)[i].y++;
      if (getAll(attackd)[i].y >= 10){
        getAll(attackd)[i].remove();
      }
    }
  for (var i = 0; i < getAll(attackr).length; i++) {
    getAll(attackr)[i].x++;
    if(getAll(attackr)[i].x >= 10){
      getAll(attackr)[i].remove();
    }
  }
  for (var i = 0; i < getAll(attackl).length; i++) {
    getAll(attackl)[i].x--;
    if(getAll(attackl)[i].x <= 0){
      getAll(attackl)[i].remove();
    }
  }
  for (var i = 0; i < getAll(attacku).length; i++) {
    getAll(attacku)[i].y--;
    if(getAll(attacku)[i].y <= 0){
      getAll(attacku)[i].remove();
    }
  }
}
//kill player on hit//
function hit(){
  for (var i = 0; i < getAll(enemy).length; i++) {
    if(tilesWith(player, enemy).length > 0) {
      var storex = tilesWith(player, enemy)[0][0].x
      var storey = tilesWith(player, enemy)[0][0].y
      clearTile(storex, storey)
      addText("You Died", {
      x: 6,
      y: 6,
      color: color`3`
      });
      dead = true;
    }
  }
}

//kill enemy//
function kill(){
  for (var i = 0; i < getAll(enemy).length; i++){
    if(tilesWith(attacku, enemy).length > 0) {
     var storex = getAll(enemy)[i].x
      var storey = getAll(enemy)[i].y
      clearTile(storex, storey)
    score+=1;
}
  if(tilesWith(attackd, enemy).length > 0) {
     var storex = getAll(enemy)[i].x
       var storey = getAll(enemy)[i].y
      clearTile(storex, storey)
    score+=1;
}
  if(tilesWith(attackl, enemy).length > 0) {
      var storex = getAll(enemy)[i].x
      var storey = getAll(enemy)[i].y
      clearTile(storex, storey)
    score+=1;
}
  if(tilesWith(attackr, enemy).length > 0) {
      var storex = getAll(enemy)[i].x
      var storey = getAll(enemy)[i].y
      clearTile(storex, storey)
    score+=1;
}
  }
}
//enemy spawn//
function spawnE() {
  if(dead == false){
  let x = Math.floor(Math.random() * 11);
  let y = 0;
  addSprite(x, y, enemy);
  spawnrate -= 1;
  moveE();
  moveA();
  hit();
  kill();
  addText("Score: " + score, {
      x: 0,
      y: 0,
      color: color`2`
      });
  }
}

//enemy movement//
function moveE(){
   for (var i = 0; i < getAll(enemy).length; i++) {
      getAll(enemy)[i].y++;
      var slope = ((getFirst(player).y - getAll(enemy)[i].y) / (getFirst(player).x - getAll(enemy)[i].x))
      if (Math.round(1 / slope) > 0.8) {
        getAll(enemy)[i].x++;
      } else if (Math.round(1 / slope) < - 0.8) {
        getAll(enemy)[i].x--;
      }
  } 
}
