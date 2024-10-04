/*
@title: Fruit_Catcher
@author: Navneet Saxena
@tags: []
@addedOn: 2024-01-16
*/

//Contorls:
// Use W and D to move bowl and the goal to catch the most fruits.

const bowl = "b";
const apple = "a";
const sky = "s";
const ground = "g";
const orange = "o";


setLegend(
  [ bowl, bitmap`
................
................
................
................
................
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
..CCCCCCCCCCCCCC
..CCCCCCCCCCCCC.
...CCCCCCCCCCCC.
...CCCCCCCCCCC..
....CCCCCCCCC...
................
................
................` ],
  [ apple, bitmap`
.......C........
.......C444.....
.......C44......
....333C333.....
...333333333....
..33333333333...
..33333333333...
..33333333333...
..33333333333...
..33333333333...
..33333333333...
...33333333.....
......333.......
................
................
................` ],
  [ orange, bitmap`
......C.........
......CC.44.....
.......C44......
....99944999....
...9999999999...
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
...9999999999...
....99999999....
................
................`],
  [ sky, bitmap`
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
  [ ground, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ]
)


setSolids([])

let level = 0;
let score = 0;
const levels = [
  map`
ssssssss
ssasssss
ssssssss
ssssssss
ssssssss
ssssssss
ssssbsss
gggggggg`
]
setBackground('s');

onInput("a", () => {
  if (getFirst(bowl).x !== 0){
    getFirst(bowl).x -=1;
  }
});

onInput("d", () => {
  if (getFirst(bowl).x !== 8){
    getFirst(bowl).x +=1;
  }
});


setMap(levels[level])

var draw = setInterval(() => {
  let appleGroup = getAll(apple);
  let orangeGroup = getAll(orange);
  let bowlTile = getFirst(bowl);
  let xApple = Math.floor(Math.random() * 8);
  let xOrange = Math.floor(Math.random() * 8);
 
  
  addSprite(xApple, 0, apple);
  addSprite(xOrange, 0, orange);

  for (let i = 0; i < appleGroup.length; i++) {
    appleGroup[i].y += 1;
  }
  for (let i = 0; i < orangeGroup.length; i++) {
    orangeGroup[i].y += 1;
  }
  
  for (let i = 0; i < appleGroup.length; i++) {
   if (appleGroup[i].y == 7) {
     appleGroup[i].remove();
    }
  }
  for (let i = 0; i < orangeGroup.length; i++) {
   if (orangeGroup[i].y == 7) {
     orangeGroup[i].remove();
    }
  }

  for (let i = 0; i < appleGroup.length; i++) {
    if (appleGroup[i].y == bowlTile.y && appleGroup[i].x == bowlTile.x) {
      score++;
    }
  }
   for (let i = 0; i < orangeGroup.length; i++) {
    if (orangeGroup[i].y == bowlTile.y && orangeGroup[i].x == bowlTile.x) {
      score++;
    }
  }

   addText(`Score: ${score}`, {
     x: 8, 
     y: 1, 
     color: color`0`
   })
},400)

                     
