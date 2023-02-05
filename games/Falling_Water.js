/*
@title: Falling Water
@author: Captainexpo

Version: 2.0

Changes:
added a cursor so you can place water wherever you want, and added a solid!

This is just a little water simulation using cellular automata for the water.
Based on just a simple set of rules this can act like water, sand, fire, or smoke. 



*/
let curx = 0;
let cury = 0;

const water = "s";
const wall = "w";
const cursor = "c";

let speed = "100"
setLegend(
  [ water, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`,],
  [ wall, bitmap`
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
LLLLLLLLLLLLLLLL`,],
  [ cursor, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000`,]
);

//Tutorial text
addText("Use WASD and IK.", {x: 2, y: 7, color: color`0`})

setMap(map`
..........c..............
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................`,);

setSolids([water, wall]);

//Update all of the water cells
Update()

//Get user input
onInput("s", () => {
  clearText()
  getFirst(cursor).y += 1;
});
onInput("w", () => {
  clearText()
  getFirst(cursor).y -= 1;
});
onInput("a", () => {
  clearText()
  getFirst(cursor).x -= 1;
});
onInput("d", () => {
  clearText()
  getFirst(cursor).x += 1;
});

//add wall/water/empty sprites
onInput("i", () => {
  addSprite(getFirst(cursor).x,getFirst(cursor).y, water)
});
onInput("k", () => {
  addSprite(getFirst(cursor).x,getFirst(cursor).y, wall)
});
onInput("j", () => {
  curx = getFirst(cursor).x
  cury = getFirst(cursor).y
  clearTile(getFirst(cursor).x,getFirst(cursor).y)
  addSprite(curx,cury,cursor)
});



function Update(){
  //Loop over all the water cells
    getAll(water).forEach((w) => {
      //Loop over all the water cells again
      getAll(water).forEach((x)=> {
        //Check if cell below is a water cell
        if (w.x == x.x && w.y == x.y-1) {
          //If it is, then move to the right or to the left
          if(Math.random() > 0.5){
            w.x += 1; 
          }
          else{
            w.x -= 1; 
          }
        }  
      });
      //Move down if you can
      w.y += 1;
    console.log(speed)
  });
  //Delay for a certain amount of time
  setTimeout(Update, speed);
}
