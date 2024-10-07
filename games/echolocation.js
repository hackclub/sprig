/*
@title: echolocation
@author: Leonard (Omay)
@tags: ['puzzle']
@addedOn: 2022-11-13

find the goal
ijkl to "look"
wasd to move
if you hear a triangle, than it mean its a wall
if its a sin, than its the goal
timing between press and sound is distance
go back over the goal to progress
*/

let looking = false;
let lookDir = null;

const player = "p";
const wall = "w";
const bg = "a";
const goal = "g";
const sense = "s";

setLegend(
  [bg, bitmap`
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
  [wall, bitmap`
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
  [player, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [sense, bitmap`
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
................`]
);
/*
setLegend(
  [player, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [wall, bitmap`
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
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [sense, bitmap`
................
......000.......
...000..000.....
...0......0.....
...0......00....
...0......0.....
.........00.....
.......000......
.......0........
.......0........
................
.......00.......
......000.......
......000.......
................
................`],
  [bg, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);
*/
setSolids([wall, player]);

let level = 0;
const levels = [
  map`
wwwwwwwwww
wp.......w
wwww.wwwww
w........w
wwwwww.www
w........w
wwgwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.......w
wwwwwwww.w
wg.w...w.w
ww.w.w.w.w
ww.w.w.w.w
w....w...w
wwwwwwwwww`,
  map`
wwwwwwwwww
wwgw.w.w.w
ww.w.w.w.w
ww.w.w.w.w
w........w
w.w.w.w.ww
w.w.w.wpww
wwwwwwwwww`,
  map`
wwwwwwwwww
w.......ww
w.wwwww.gw
w.w...wwww
w........w
w.w...w..w
w.wwwww.pw
wwwwwwwwww`,
  map`
wwwwwwwwww
w.www....w
w.w.ww.w.w
w.w....w.w
w.w....w.w
w.w.ww.w.w
w...pwwwgw
wwwwwwwwww`
];
const addlevel = map`
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa
aaaaaaaaaa`;

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
addMap(addlevel);
var wallSound = tune`
300: c5^300,
9300`;
var goalSound = tune`
500: f4~500,
15500`;

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
function look(){
  var sound = tilesWith(sense);
  if(sound.length > 0){
    sound = sound[0];
    if(sound.map(x => x.type).includes(wall)){
      playTune(wallSound);
      looking = false;
      getFirst(sense).remove();
      clearInterval(lookInterval);
    }else if(sound.map(x => x.type).includes(goal)){
      playTune(goalSound);
      looking = false;
      getFirst(sense).remove();
      clearInterval(lookInterval);
    }else{
      if(lookDir === 1){
        getFirst(sense).y--;
      }else if(lookDir === 2){
        getFirst(sense).x--;
      }else if(lookDir === 3){
        getFirst(sense).y++;
      }else if(lookDir === 4){
        getFirst(sense).x++;
      }
    }
  }
}
var lookInterval;
onInput("i", () => {
  if(!looking){
    lookDir = 1;
    looking = true;
    addSprite(getFirst(player).x, getFirst(player).y-1, sense);
    lookInterval = setInterval(look, 100);
  }
});
onInput("j", () => {
  if(!looking){
    lookDir = 2;
    looking = true;
    addSprite(getFirst(player).x-1, getFirst(player).y, sense);
    lookInterval = setInterval(look, 100);
  }
});
onInput("k", () => {
  if(!looking){
    lookDir = 3;
    looking = true;
    addSprite(getFirst(player).x, getFirst(player).y+1, sense);
    lookInterval = setInterval(look, 100);
  }
});
onInput("l", () => {
  if(!looking){
    lookDir = 4;
    looking = true;
    addSprite(getFirst(player).x+1, getFirst(player).y, sense);
    lookInterval = setInterval(look, 100);
  }
});
afterInput(() => {
  if(tilesWith(player, goal).length > 0){
    var bgs = getAll(bg);
    if(bgs.length > 0){
      for(var i = 0; i < bgs.length; i++){
        bgs[i].remove();
      }
    }else{
      level++;
      var currentLevel = levels[level];
      if(currentLevel !== undefined){
        setMap(levels[level]);
        addMap(addlevel);
        looking = false;
      }else{
        addText("You Win!", {color: color`4`});
      }
    }
  }
});
