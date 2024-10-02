/*
@title: Super Efficient Bunny
@author: Mihir Surlaker (Mihirsur007)
@tags: ['puzzle']
@addedOn: 2023-01-31
*/
//The goal of this game is to advance as many levels as you can in 400 steps. This will challenge you to choose the most efficient movements to get to the carrot.
const player = "p";
const goal = "g";
const back = "b";


setLegend(
  [ player, bitmap`
................
................
........0.0.....
.......02020....
.......02020....
.......02020....
.......022220...
..0.0002222220..
.0202222220220..
..022222220280..
..022222222280..
..02222222000...
...022200220....
....0000.000....
................
................`],
  [ goal, bitmap`
................
............000.
...........0DD00
........00.0D0D0
.......0990D0DD0
......099990D00.
.....09999990...
....0999999990..
...09999999990..
...0999999990...
..0999999990....
..099999090.....
.099990900......
.0999900........
..0000..........
................`],
  [ back, bitmap`
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444`],
  
  
  
);
setBackground(back);
setSolids([]);
let steps = 0;
let level = 0;
let xcoord = 0;
let ycoord= 0;



addText("Level "+level, {
  x: 6,
  y: 0,
  color: color`2`
});

const levels = [
  map`
p...........
............
............
............
............
............
.........g..
............
............`,

];

let stepslim = 400; /*Set to 100 for testing, 
I will set back to 400 before submitting for review*/
  addText("Steps Left: "+stepslim, {
    x: 3,
    y: 15,
    color: color`2`
  });

setMap(levels[level]);



setPushables({
  [ player ]: [],
});


onInput("s", () => { 
  if(stepslim > 0){
  getFirst(player).y += 1
  steps +=1;
  ycoord +=1;}
});



onInput("w", () => { 
  if(stepslim > 0){
  getFirst(player).y -= 1
  steps +=1;
  ycoord -=1;}
});


onInput("a", () => {
  if(stepslim > 0){
  getFirst(player).x -= 1
  steps +=1;
  xcoord -=1;}
});


onInput("d", () => {
  if(stepslim > 0){
  getFirst(player).x += 1
  steps +=1;
  xcoord +=1;}
});




afterInput(() => {
  const tilesWithGoalAndPlayer = tilesWith(goal, player);
  if(stepslim > 0){
  stepslim -=1;}
  clearText();
  
  if (stepslim <= 0){
    //clearTile(xcoord, ycoord); //removes Bunny after game ends
    
    clearText();
    addText("Game Over", {
    x: 6,
    y: 6,
    color: color`2`
    
  });
   clearTile(xcoord,ycoord);
    addSprite(0,0, player); 
    
  }
  
  addText("Steps Left: "+stepslim, {
    x: 3,
    y: 15,
    color: color`2`
  });

  addText("Level "+level, {
  x: 6,
  y: 0,
  color: color`2`
});
  
  if (tilesWithGoalAndPlayer.length >0 ){
    clearText();
    level +=1;
    addText("Level "+level,{
  x: 6,
  y: 0,
  color: color`2`
});
    clearTile(xcoord,ycoord);
    for (let row = 0; row < 12; row++) { //created loop to clear the whole screen which stops the carrot glitch.
  for (let col = 0; col < 9; col++) {
    clearTile(row, col);
  }
}
    addSprite(0,0, player);
    xcoord = 0;
    ycoord = 0;
    let goalx = Math.floor(Math.random() * 11)+1; //edit to stop the carrot from spawning on the start block of the bunny to stop bunny from disappearing mid game.
    let goaly = Math.floor(Math.random() * 8)+1; // edit to stop the carrot from spawning on the start block of the bunny to stop bunny from disappearing mid game.
    addSprite(goalx,goaly,goal);
    
    addText("Steps Left: "+stepslim, {
    x: 3,
    y: 15,
    color: color`2`
  });
    

    
    
  }
  
  
});
