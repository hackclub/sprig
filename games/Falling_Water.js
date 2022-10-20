/*
@title: Falling Water
@author: Captainexpo

Version: 1.1

This is just a little water simulation using cellular automata for the water.
Based on just a simple set of rules this can act like water, sand, fire, or smoke. 
Although for this, it's just water.

You can also press i and k to speed up/slow down the simulation speed.
It can be a little buggy though.

*/

const water = "s";
let speed = "100"
setLegend(
  [ water, bitmap`
7555555555555557
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
7555555555555557`,]
);

let level = 0;
const levels = [
  map`
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
.........................
.........................`,
  map`
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................
...................................`,
];
//Tutorial text
addText("use WASD", {x: 6, y: 7, color: color`0`})
addText("to spawn water.", {x: 3, y: 8, color: color`0`})

const currentLevel = levels[0];
setMap(currentLevel);

setSolids([water]);

//Update all of the water cells
Update()

//Get user input
onInput("s", () => {
  clearText()
  addSprite(15, 0, water);
});
onInput("w", () => {
  clearText()
  addSprite(10, 0, water);
});
onInput("a", () => {
  clearText()
  addSprite(5, 0, water);
});
onInput("d", () => {
  clearText()
  addSprite(20, 0, water);
});

//Change map
onInput("j", () => {
  setMap(levels[0])
});
onInput("l", () => {
  setMap(levels[1])
});

//Raise/Lower tickspeed
onInput("i", () => {
  if(speed > 10){
    speed -= 10
  }
});
onInput("k", () => {
  speed += 10
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
 




































//I wouldn't of expected you to look down here :)
