/*
@title: Dogs vs Cats
@author: Theodor
@tags: ['endless']
@addedOn: 2022-11-12
*/
const melody = tune `
500: f4^500 + g5~500,
500: f4^500,
500: g5~500,
500: c4^500,
500: c4^500 + g5~500,
500: c5^500,
500: c5^500 + g5~500,
500: e4^500,
500: e4^500 + g5~500 + c4-500,
500: f4^500 + c4-500,
500: f4^500 + g5~500,
500: c4^500,
500: c4^500 + g5~500,
500: c5^500,
500: c5^500 + g5~500,
500: e4^500,
500: e4^500 + a4-500 + g5~500,
500: f4^500 + a4-500,
500: f4^500 + g5~500,
500: c4^500,
500: c4^500 + g5~500,
500: c5^500,
500: c5^500 + g5~500,
500: e4^500,
500: e4^500 + c5-500 + g5~500,
500: f4^500 + c5-500,
500: f4^500 + g5~500,
500: c4^500,
500: c4^500 + g5~500,
500: c5^500,
500: c5^500 + g5~500,
500`
const playback = playTune(melody, Infinity)
const dogone = "p";
const dogtwo = "q";
const catone = "c";
const background = "b";
setLegend(
  [ dogone, bitmap`
................
................
................
........66666666
........FFF66FFF
........FF0660FF
.........F6666F.
...66666666336..
.6666666666336..
.6.66666666666..
....6.......6...
....6.......6...
....66......66..
................
................
................`],
  [ dogtwo, bitmap`
................
................
........66666666
66......FFF66FFF
.6......FF0660FF
.66......F6666F.
..666666666336..
..666666666336..
..666666666666..
6.6..........6.6
666..........666
................
................
................
................
................`],
  [ catone, bitmap`
................
................
......L.L.......
.....LL.LL......
....LLL.LLL.....
....LLLLLLL.....
....LL3L3LL.....
.....LLLLL......
.....LLLL.......
.....LLLLLL....L
.....LLLLLLL..L.
.....LLLLLLL.LL.
.....LLLLLLLL...
.....LLLLLLLL...
................
................`],
  [ background, bitmap`
444444444D444444
44444444D4D44444
44D4444444444444
4D4D444444444444
4444444444D44444
444444444D4D4444
4444444444444444
4444444444444444
4444444D444444D4
444444D4D4444D4D
4444444444444444
4D44444444444444
D4D4444444444444
44444D444444D444
4444D4D4444D4D44
4444444444444444`]
);
setBackground(background);
const dog = () => getFirst("p") || getFirst("q");
setSolids([]);

onInput("s", () => {
  dog().y += 1;
});
onInput("w", () => {
  dog().y -= 1;
});

let level = 0;
const levels = [
  map`
.......
....c..
c......
......c
p......
.......
.......`,
];

setMap(levels[level]);

/* TEST FAILED - Error: Your sprite name must be wrapped in [] brackets here.
setPushables({
  [ dog ]: [],
});
*/

afterInput(() => {
  if (dog()) {
        const {x, y} = dog();
        if (getTile(x, y).length > 1) {
            addText("YOU LOSE!", { y: 4, color: color`3` });
        }
    }
  
});
let t=0;
let catspeed=400
let uded=false
let numcats=getAll(catone).length
function gameLoop() {
  t++;
  dog().type=[dogone,dogtwo][t % 2];

    if (dog()) {
        const {x, y} = dog();
        if (getTile(x, y).length > 1) {
            addText("YOU LOSE!", { y: 4, color: color`3` });
            playback.end()
          uded=true
        }
    }
  
  if (!uded){
    setTimeout(gameLoop, 400);
  }
}
function movecat(cat) {
  if (cat.x == 0){
    cat.remove();
    addSprite(6, Math.floor(Math.random() * 7), catone );
  }
  else{
    cat.x -= 1
  }
}
function moveCats() {
  getAll(catone).forEach(movecat);
addText(""+numcats, { x:2, y: 0, color: color`H` });
 if (!uded){ 
   setTimeout(moveCats, catspeed);
 }

  
}
function addCat() {
  setTimeout(addCat, 20000);
  addSprite(6, Math.floor(Math.random() * 7), catone );
  catspeed=catspeed-10
  numcats ++
  
  if (catspeed < 100){
    catspeed=100;
  }
}
addCat();
moveCats();
gameLoop();
