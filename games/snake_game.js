/*
@title: snake_game
@author: souvikpal2000
*/

const player = "p";
const body = "h";
const background = "s";
const food = "f";
const border = "b";

setLegend(
  [ player, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ body, bitmap`
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
  [ background, bitmap`
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
  [ food, bitmap`
..4444.000......
.4444440........
44444..0........
.44..330333.....
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
...3333333333...
.....333333.....`],
  [ border, bitmap`
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
0000000000000000`]
);

setBackground(background);

let level = 0;
const levels = [
  map`
bbbbbbbbbbbbbbb
...............
....f..........
...............
...............
...............
.......p.......
...............
...............
...............
...............
...............
...............
...............
...............
...............`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

const lostMsg = () => {
  addText("LOST", { 
      x: 8, 
      y: 7, 
      color: [ 255, 0, 0 ]
  });
}

let score = 0;
const showScore = () => {
  addText(`${score}`, { 
      x: 3, 
      y: 0, 
      color: [ 255, 255, 255 ]
  });
}
showScore();

const foodPlacement = () => {
  getFirst(food).x = Math.floor(Math.random()*14);
  getFirst(food).y = Math.floor(Math.random()*15) + 1;
}
foodPlacement();

const eatFood = () => {
  if(getFirst(player).x === getFirst(food).x && getFirst(player).y === getFirst(food).y){
    score++;
    // gainWeight();
    showScore();
    foodPlacement();
  }
}

let keyPressed = "";

const moveForward = () => {
  if(keyPressed === "a"){
    if(getFirst(player).x === 0){
        clearInterval(game);
        lostMsg();
        return;
    }
    getFirst(player).x -= 1;
    eatFood();
  }
  if(keyPressed === "d"){
    if(getFirst(player).x === 14){
      clearInterval(game);
      lostMsg();
      return;
    }
    getFirst(player).x += 1;
    eatFood();
  }
  if(keyPressed === "w"){
    if(getFirst(player).y === 1){
      clearInterval(game);
      lostMsg();
      return;
    }
    getFirst(player).y -= 1;
    eatFood();
  }
  if(keyPressed === "s"){
    if(getFirst(player).y === 15){
      clearInterval(game);
      lostMsg();
      return;
    }
    getFirst(player).y += 1;
    eatFood();
  }
}

// const gainWeight = () => {
//   if(keyPressed === "d"){
//     const xPos = getFirst(player).x;
//     const yPos = getFirst(player).y;
//     console.log(xPos+" ",yPos);

//     getFirst(body).x = 0;
//     getFirst(body).y = 0;
    
//   }
// }

onInput("a", () => {
  if(keyPressed !== "d"){
    keyPressed = "a";
  }
});

onInput("d", () => {
  if(keyPressed !== "a"){
    keyPressed = "d";
  }
});

onInput("w", () => {
  if(keyPressed !== "s"){
    keyPressed = "w";
  }
});

onInput("s", () => {
  if(keyPressed !== "w"){
    keyPressed = "s";
  }
});



let game = setInterval(moveForward, 100);

afterInput(() => {
  
});
