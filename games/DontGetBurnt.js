/*
@title: Don't Get Burnt!
@author: Alexandra Miller, Mariia Tymoshenko, Elaine Liu, Shenelle Jayakody, Ariane Clarke
@tags: ["endless"]
@addedOn: 2023-05-28

Use WASD keys to move Crummington and dodge the evil toasters! Try to collect jam jars, they boost your score

Warning: don't press j before it tells you too --> totally not a bug :D
*/

let time = 0
let va = true

var count
var screen = 1;

const player = "y"
const obstacle = "o"
const background = "b"
const blue = "l"
const green = "g"
const brown = "r"
const black = "c"
const apple1 = "a"
const apple2 = "d"
const purple = "u"
const player1 = "p"
const jamJar = "j"


//LEGEND
function textures(type){
    switch(type){
    case 1:
      setLegend(
        [obstacle, bitmap`
      ................
      ................
      ................
      ................
      ................
      ....00000000....
      ...0111111110...
      ..011011110110..
      ..011101101110..
      ..011111111110..
      ..011201102110..
      ..011001100110..
      ..01111111111000
      ..000000000000..
      ................
      ................`],
        [player, bitmap`
................
................
................
....CCCCCCCCC...
...C999999999C..
...C999999999C..
....C9029029C...
....C9009009C...
....C9999999C...
....C9999999C...
....C9099909C...
....C9900099C...
....C9999999C...
.....CCCCCCC....
................
................`],
        [player1, bitmap`
................
....CCCCCCCCC...
...C999999999C..
...C999999999C..
....C9999029C...
....C9999009C...
....C9999999C...
....C9999999C...
....C9909900C...
....C9909999C...
....C9900099C...
....C0999999C...
.....C0CCCCC....
.......0.0......
.......0000.....
................`],
        [background, bitmap`
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666`],
        [blue, bitmap`
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
        [green, bitmap`
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF`],
        [brown, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
        [black, bitmap`
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000`],
        [apple1, bitmap`
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHH3333HH
      HHHHHHHHH3333333
      HHHHHHHH33333333
      HHHHHHH333333333
      HHHHHHH333333333
      HHHHHHH333333333
      HHHHHHH333333333
      HHHHHHH333333333
      HHHHHHH333333333
      HHHHHHH333333333
      HHHHHHHH33333333
      HHHHHHHHH3333333
      HHHHHHHHHH333333`],
        [apple2, bitmap`
      HHHHHHHHHHHHHHHH
      CCHHHHHHHHHHHHHH
      CHHHHHHHHHHHHHHH
      CH3333HHHHHHHHHH
      3333333HHHHHHHHH
      33333333HHHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      33333333HHHHHHHH
      3333333HHHHHHHHH
      333333HHHHHHHHHH`],
        [purple, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
        [jamJar, bitmap`
................
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
.....1..1.1.....
....1....1.1....
....1.33..31....
....13133331....
....1C33C3C1....
....13313CC1....
....1133CC11....
.....111111.....
................
................
................`]
      );
      break;
      case 2:
        setLegend(
        [obstacle, bitmap`
      ................
      ................
      ................
      ................
      ................
      ....00000000....
      ...0111111110...
      ..011011110110..
      ..011101101110..
      ..011111111110..
      ..011201102110..
      ..011001100110..
      ..01111111111000
      ..000000000000..
      ................
      ................`],
        [player, bitmap`
................
................
................
....CCCCCCCCC...
...C999999999C..
...C999999999C..
....C9029029C...
....C9009009C...
....C9999999C...
....C9999999C...
....C9099909C...
....C9900099C...
....C9999999C...
.....CCCCCCC....
................
................`],
        [player1, bitmap`
................
....CCCCCCCCC...
...C999999999C..
...C999999999C..
....C9999029C...
....C9999009C...
....C9999999C...
....C9999999C...
....C9999900C...
....C9909999C...
....C9099999C...
....C0999099C...
.....CCCCC0C....
......0....0....
......00...00...
................`],
        [background, bitmap`
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666
      6666666666666666`],
        [blue, bitmap`
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
        [green, bitmap`
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF
      FFFFFFFFFFFFFFFF`],
        [brown, bitmap`
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC
      CCCCCCCCCCCCCCCC`],
        [black, bitmap`
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000
      0000000000000000`],
        [apple1, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHH3333HH
HHHHHHHHH3333333
HHHHHHHH33333333
HHHHHHH333333333
HHHHHHH333333333
HHHHHHH333333333
HHHHHHH333333333
HHHHHHH333333333
HHHHHHH333333333
HHHHHHH333333333
HHHHHHHH33333333
HHHHHHHHH3333333
HHHHHHHHHH333333`],
        [apple2, bitmap`
      HHHHHHHHHHHHHHHH
      CCHHHHHHHHHHHHHH
      CHHHHHHHHHHHHHHH
      CH3333HHHHHHHHHH
      3333333HHHHHHHHH
      33333333HHHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      333333333HHHHHHH
      33333333HHHHHHHH
      3333333HHHHHHHHH
      333333HHHHHHHHHH`],
        [purple, bitmap`
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH
      HHHHHHHHHHHHHHHH`],
        [jamJar, bitmap`
................
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
.....1..1.1.....
....1....1.1....
....1.33..31....
....13133331....
....1C33C3C1....
....13313CC1....
....1133CC11....
.....111111.....
................
................
................`]
      );
        break;
    }
}
textures(1);
count = 1; 
setInterval(function(){
  if (count == 1)
  {
    textures(2);
    count = 2;
  }
  else if (count == 2)
  {
    textures(1);
    count = 1;
  }
},500)
//LEGEND END

addText("DON'T GET BURNT  ", {y: 2, color: color`C`,})
addText("story loading...", {y: 8, color: color`0`,})
 
setInterval(function(){
    if (screen == 1){
      clearText()
      addText("Once upon a time", {y: 1, color: color`0`,})
      addText("there was a toaster", {y: 2, color: color`0`,})
      addText("who resented all", {y: 3, color: color`0`,})
      addText("types of bread.", {y: 4, color: color`0`,})
      screen = 2;
    }
    else if (screen == 2)
    {
      clearText()
      addText("He sought out to", {y: 1, color: color`0`,})
      addText("burn all the bread", {y: 2, color: color`0`,})
      addText("in the world!", {y: 3, color: color`0`,})
      addText("Our protagonist,", {y: 4, color: color`0`,})
      addText("Crummington the", {y: 5, color: color`0`,})
      addText("Ninth, was captured", {y: 6, color: color`0`,})
      addText("by the malicious", {y: 7, color: color`0`,})
      addText("toaster.", {y: 8, color: color`0`,})
      screen = 3;
    }
  else if (screen == 3)
  {
    clearText()
    addText("Try your luck", {y: 1, color: color`0`,})
    addText("and see if you", {y: 2, color: color`0`,})
    addText("can help Crummington", {y: 3, color: color`0`,})
    addText("escape the toaster's", {y: 4, color: color`0`,})
    addText("evil clutches!", {y: 5, color: color`0`,})
    screen = 4;
  }
  else if (screen == 4)
  {
    clearText()
    addText("Press j to play :D", {y: 1, color: color`0`,})
    screen = 5;
  }
  else if (screen == 5)
  {
    clearText()
  }
}, 5000)

//WASD Keys
onInput("d", () => {
  var p = getFirst(player1);
  p.x += 1;
});
 
onInput("a", () => {
  var p = getFirst(player1);
  p.x -= 1;
});
 
onInput("s", () => {
  var p = getFirst(player1);
  p.y += 1;
});
 
onInput("w", () => {
  var p = getFirst(player1);
  p.y -= 1;
 
});
//END WASD
 
onInput("j", () => {
  clearText()
//   setMap(map`
// uuuuuuuuuuuuuuu
// uuuuuuuuuuuuuuu
// uuuuuuuuuuuuuuu
// uuuuuuuadaduuuu
// uuuuuuadadaduuu
// uuuuulllllllluu
// ubbuulllllllluu
// cbbcuulllllluuu
// uccuuuulllluuuu
// ggggggggggggggg
// gggpggggggggggg
// ccccccccccccccc`)
  setMap(map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...p...........
ccccccccccccccc`)
  setSolids([black, player1])
  var gameLoop = setInterval (() => {
   count++;
addText(" " + count, {
       x:0,
    y:1,
       color: color`3`
     })
 
   despawnObstacle();
   moveObstacle();
   spawnObstacle();

  if(count == 0){
     spawnJamJar();
   }
   if(count % 20 == 0){
     spawnJamJar();
   }
   
  if(checkHitJamJar() == true){
     despawnJamJar();
     count += 20;
  }

 
   if(checkHit() == true){
     clearInterval(gameLoop);
     addText("GAME OVER :(", {
       y:4,
       color: color`3`
     })
     playback.end();//ends the tune
   }
 }, 100);
});

setMap(map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...p...........
ccccccccccccccc`)

function spawnObstacle() {
  var x = 14;
  var y = Math.floor(Math.random()*11);
  addSprite(x,y,obstacle);
}
 
function moveObstacle(){
  var toaster = getAll(obstacle);
 
  for(var i = 0; i < toaster.length; i++) {
    var o = toaster[i];
    o.x -= 1;
  }
}
 
function despawnObstacle () {
  var toaster = getAll(obstacle);
 
  for(var i = 0; i < toaster.length; i++) {
     var o = toaster[i];
     if (o.x == 0) {
       o.remove();
     }
  }
}

function checkHit(){
  var toaster = getAll(obstacle);
  var p = getFirst(player1);
 
  for(var i = 0; i < toaster.length; i++) {
    var o = toaster[i];
    if(o.x == p.x && o.y == p.y){
     return true; 
    }
  }
  return false;
}

function spawnJamJar() {
  var x = Math.floor(Math.random()*14);
  var y = Math.floor(Math.random()*11);
  addSprite(x,y,jamJar);
}

function despawnJamJar() {
  var jamJars = getAll(jamJar);
  var p = getFirst(player1);
  
  for(var i = 0; i < jamJars.length; i++) {
     var j = jamJars [i];
     if (j.x == p.x && j.y == p.y) {
       j.remove();
     }
  }
}

function checkHitJamJar(){
  var jamJars = getAll(jamJar);
  var p = getFirst(player1);
  
  for(var i = 0; i < jamJars.length; i++) {
    var j = jamJars[i];
    if(j.x == p.x && j.y == p.y){
     return true; 
    }
  }
  return false;
}

//sound!!

const melody = tune`
508.47457627118644,
508.47457627118644: F4^508.47457627118644,
508.47457627118644: A4^508.47457627118644,
508.47457627118644: C5^508.47457627118644,
508.47457627118644: A4^508.47457627118644,
508.47457627118644: F4^508.47457627118644,
508.47457627118644: D4^508.47457627118644,
508.47457627118644: D4^508.47457627118644,
508.47457627118644: D4^508.47457627118644,
508.47457627118644: G5^508.47457627118644,
508.47457627118644: G5^508.47457627118644,
508.47457627118644: G5^508.47457627118644,
508.47457627118644,
508.47457627118644: F4^508.47457627118644,
508.47457627118644: A4^508.47457627118644,
508.47457627118644: C5^508.47457627118644,
508.47457627118644: A4^508.47457627118644,
508.47457627118644: F4^508.47457627118644,
508.47457627118644: D4^508.47457627118644,
508.47457627118644: D4^508.47457627118644,
508.47457627118644: D4^508.47457627118644,
508.47457627118644: G5^508.47457627118644,
508.47457627118644: G5^508.47457627118644,
508.47457627118644: G5^508.47457627118644,
508.47457627118644: E5^508.47457627118644,
508.47457627118644: E5^508.47457627118644,
508.47457627118644: E5^508.47457627118644,
508.47457627118644: C5^508.47457627118644,
508.47457627118644: C5^508.47457627118644,
508.47457627118644: C5^508.47457627118644,
508.47457627118644: F4^508.47457627118644,
508.47457627118644: F4^508.47457627118644`

var playback = playTune(melody, Infinity);
