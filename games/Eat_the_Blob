/*
@title: Eat_the_Blob
@author: Vlader

Instructions

in this game, use WASD to try and 
catch Orpheus as she moves in all sorts
of directions! good luck!
*/

const player = "p";

const orpheus = "o";

const background = "b";

setLegend(
  [ player, bitmap`
.....000000.....
....00444400....
....04040440....
....04444400....
....0004400.....
..0...0000...0..
..00..0000..00..
...0.00000000...
...00000000.....
......00000.....
......00000.....
......00000.....
......0...0.....
......0...0.....
......0...0.....
......0...0.....`],
  [ orpheus, bitmap`
0000000000000000
0..............0
0..............0
0..00......00..0
0..00......00..0
0..............0
0..............0
0..............0
0..............0
0......0.......0
0..00.00..00...0
0..0000000000..0
0.0000..00.00..0
0.0.00......00.0
0..............0
0000000000000000`],
  [ background, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCC3CCCCCC
C3C3CHCCCCCC3CCC
CCCCCCCCCCCCCCCC
CCCCCCC33CCCCCCC
CC3CCCCCCCCC33CC
CCCCCCCCCCCCCCCC
CHCCCHCCC3CCCCCC
CCCCCC3CCCCCCCCC
CCCCCCCCCCCCHCCC
3CCCC3CCCCCCCCCC
CCCCCCCCCCCCCCCC
CCH3CCCC3CCCCC3C
CC3CC33CCCCCCCCC
CCCCCCCCCCC3CCCC
HCCCC3CCCCCCCCCC`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
p......
..o....
.......
.......
.......
.......`,
];

setBackground(background)

setMap(levels[level]);
setPushables({
  [ player ]: [],
});



afterInput(() => {
  if(getFirst(player).x == getFirst(orpheus).x  
     && getFirst(player).y == getFirst(orpheus).y){
      addText("you win!", { 
          x: 10, 
          y: 4, 
          color: color`3`
      })
      setTimeout(() => setMap(levels[0]), 2000)
      setTimeout(() => clearText(), 2000)
      setTimeout(resetSteps, 2000);
  }
});


const moveOrpheus = () => {
  const dx = Math.floor(Math.random() * 5) - 2; // generates a random number between -2 and 2
  const dy = Math.floor(Math.random() * 5) - 2; // generates a random number between -2 and 2
  let x = getFirst(orpheus).x + dx;
  let y = getFirst(orpheus).y + dy;

  // add boundaries to the movement
  if (x < 0) {
    x = 0;
  } else if (x > 15) {
    x = 15;
  }
  if (y < 0) {
    y = 0;
  } else if (y > 15) {
    y = 15;
  }

  getFirst(orpheus).x = x;
  getFirst(orpheus).y = y;
};

setInterval(moveOrpheus, 300); // call the moveOrpheus function every 1000 milliseconds (1 second)

let steps = 0;



onInput("s", () => {
  getFirst(player).y += 1;
  steps++;
  addText(`Steps: ${steps}`, {
    x: 1,
    y: 1,
    color: color`7`,
  });
  if (steps > 50) {
    addText("You lose!", { 
      x: 10, 
      y: 4, 
      color: color`3`
    });
    setTimeout(() => setMap(levels[0]), 2000); // reset the game after 2 seconds
    setTimeout(() => clearText(), 2000);
    setTimeout(resetSteps, 2000);// clear the text after 2 seconds
  }
});

onInput("w", () => {
  getFirst(player).y -= 1;
  steps++;
  addText(`Steps: ${steps}`, {
    x: 1,
    y: 1,
    color: color`7`,
  });
  if (steps > 50) {
    addText("You lose!", { 
      x: 10, 
      y: 4, 
      color: color`3`
    });
    setTimeout(() => setMap(levels[0]), 2000); // reset the game after 2 seconds
    setTimeout(() => clearText(), 2000);
    setTimeout(resetSteps, 2000);// clear the text after 2 seconds
  }
});

onInput("a", () => {
  getFirst(player).x -= 1;
  steps++;
  addText(`Steps: ${steps}`, {
    x: 1,
    y: 1,
    color: color`7`,
  });
  if (steps > 50) {
    addText("You lose!", { 
      x: 10, 
      y: 4, 
      color: color`3`
    });
    setTimeout(() => setMap(levels[0]), 2000); // reset the game after 2 seconds
    setTimeout(() => clearText(), 2000);
    setTimeout(resetSteps, 2000);// clear the text after 2 seconds
  }
});

onInput("d", () => {
  getFirst(player).x += 1;
  steps++;
  addText(`Steps: ${steps}`, {
    x: 1,
    y: 1,
    color: color`7`,
  });
  if (steps > 50) {
    addText("You lose!", { 
      x: 10, 
      y: 4, 
      color: color`3`
    });
    setTimeout(() => setMap(levels[0]), 2000); // reset the game after 2 seconds
    setTimeout(() => clearText(), 2000);
    setTimeout(resetSteps, 2000);// clear the text after 2 seconds
  }
});

const resetSteps = () => {
  steps = 0;
  addText(`Steps: ${steps}`, {
    x: 1,
    y: 1,
    color: color`7`,
  });
};

