/*
@title: The_Pet
@author: wyn-cmd
@tags: ['simulation']
@addedOn: 2022-12-07
*/


//sprites
const egg = "e";
const baby = "b";
const stage1 = "s";
const stage2 = "S";
const adult = "A";
const player = "f";
const scene1 = "c";
const scene2 = "C";
const death = "d"



//set sprites
setLegend(
  [ egg, bitmap`
................
......0000......
.....044220.....
....04442220....
....04422220....
...0442222220...
...0422222220...
...0222224420...
..022222444420..
..022222444420..
..022222244220..
..044222222220..
..044422222220..
...0444222220...
....00422200....
......0000......`],
  [ baby, bitmap`
................
................
.....000000.....
...0088888800...
..088888888880..
.08888800008880.
0888880111108880
0888880188108880
.088880111108880
..0888800008880.
...00088888800..
......000000....
................
................
................
................`],
  [ stage1, bitmap`
...0............
..080...........
.0H0.....00.....
.0H0....0HH00...
.0H0...0HHHHH0..
.0H0..0HH00HH0..
.0H0..0H0LL0HH0.
.0H0.0H0LHHL0H0.
.0HH0HH0LHHL0H0.
.0HHHHHH0LL0HH0.
..0HHHHHH00HH0..
...0HHHHHHHH0...
....00HHHH00....
......0000......
................
................`],
  [ stage2, bitmap`
..0..........0..
.0H0........0H0.
.0330......0330.
..033000000330..
...0330000330...
..0330LLLL0330..
.03330L33L03330.
033330LLLL033330
0333330000333330
0333003333003330
0330.033330.0330
0330.033330.0330
.030.033330.030.
..0H0.0330.0H0..
...0..0330..0...
.......00.......`],
  [ adult, bitmap`
.......00.......
......0330......
......0990......
..0..099990..0..
.030.099990.030.
.090.099990.090.
.09909999990990.
..099900009990..
..099006600990..
...0900660090...
....09000090....
....09999990....
....09999990....
...0399999930...
....00999900....
......0000......`],
  [ player, bitmap`
................
................
................
.....000000.....
....04444440....
...0443333440...
...0433333340...
...0433333340...
...0433333340...
...0433333340...
...0443333440...
....04444440....
.....000000.....
................
................
................`],
  [ scene1, bitmap`
................
................
...1...1...1....
....1..1..1.....
....11.1.11.....
.....11111......
.....11111......
.....11111......
.....11111......
....1111111.....
...111313111....
..11111111111...
..11..111..11...
.11....1....11..
.1...........1..
.1...........1..`],
  [ scene2, bitmap`
................
.......11.......
.......11.......
11.....11.....11
2111..1111..1112
2282111111112822
2882213113122828
8882881111882888
8888882882888888
8888888338888888
2882882332882882
2882281111822882
228211....112822
1111........1111
................
................`],
  [ death, bitmap`
................
.....9.....9..3.
.....3.93.3.....
.8.9..9..9.3....
.9...3.9..9.9.9.
99.99HH.88...3..
..3...3LL.3.3...
..9.93L66L93....
.....8L66L9..39.
..3.99HLL9H9....
..33..3.33.3....
.3.....99..99.3.
......3.39....9.
...9..9.....8...
...9......3.....
................`]
  
  
);






//maps
let level = 0;

const levels = [
  map`
e`,
  map`
.....
..f..
..b..
.....`,
  map`
.....
..f..
..s..
.....`,
  map`
.....
..f..
..S..
.....`,
  map`
.....
..A..
.....
.....`,
  map`
.....
..A..
..e..
.....`,
  map`
.....
..c..
.....
.....`,
  map`
C`,
  map`
d`
  
];

setMap(levels[level]);


//variables
let care = 0;
let feed = 0;



//start text
addText("press l to hatch", {
  x: 2,
  y: 3,
  color: color`0`
}) 




//inputs
onInput("l", () => {
  care += 1;
  
});


onInput("i", () => {
  feed += 1;
  clearText();
});



//proccessing inputs
afterInput(() => {


  //baby
  if (care === 1) {
    level = 1;

    const currentLevel = levels[level];
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
  };

  if (feed === 0) {
    clearText();
    addText("It looks hungry", {
  x: 2,
  y: 1,
  color: color`0`
});
    addText("feed it (i)", {
  x: 2,
  y: 0,
  color: color`0`
})
    
  };

  


  //stage 1
  if (feed === 4) {
    level = 2;

    const currentLevel = levels[level];
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
    clearText();
    addText("Still hungry...", {
  x: 2,
  y: 1,
  color: color`0`
});
   
  };

  if (feed === 5) {
    level = 2;

    const currentLevel = levels[level];
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
    setMap(levels[level]);

    
  };


//
  if (feed === 6) {

    level = 2;

    const currentLevel = levels[level];
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
    setMap(levels[level]);

    
    addText("They seem happy", {
  x: 2,
  y: 1,
  color: color`0`
});
  };

  if (feed === 7) {
    clearText();
    level = 3;

    const currentLevel = levels[level];
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
  };

  if (feed === 8) {
    clearText();
    level = 3;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
    clearText();
    addText("STILL hungry...", {
  x: 2,
  y: 1,
  color: color`0`
});
  };

  if (feed === 9) {
    clearText();
    
    level = 4;
    const currentLevel = levels[level];
    clearText();
    if (currentLevel !== undefined) setMap(currentLevel);
  };
  
  if (feed > 9) {
    setMap(levels[4]);
  };

  if (feed === 15) {
    clearText();

    setMap(levels[8]);

    addText("Uhhh...", {
  x: 2,
  y: 1,
  color: color`0`
});

  };

    if (feed === 16) {
    clearText();

    setMap(levels[8]);

    addText("I'll just...", {
  x: 2,
  y: 1,
  color: color`0`
});

    };

  if (feed === 17) {
    clearText();

    setMap(levels[8]);

    addText("leave...", {
  x: 2,
  y: 1,
  color: color`0`
});

  }

  
  if (feed === 18) {
  care = 14;

  }
    




  
    
  if (feed === 10) {
    clearText();
    addText("It needs care", {
  x: 2,
  y: 0,
  color: color`0`
});
    addText("give care (l)", {
  x: 2,
  y: 1,
  color: color`0`
})
    level = 4;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
    
  };

  if (care > 2) {
  clearText();
  level = 4;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
};

  
  if (care > 5) {
  level = 5;
  const currentLevel = levels[level];
  setMap(levels[level]);
    addText("Oh?", {
  x: 2,
  y: 1,
  color: color`0`
});

  
};


  if (care > 7) {
    clearText()
    addText("Looks like an...", {
  x: 2,
  y: 2,
  color: color`0`
}) 
    addText("      egg?   ", {
  x: 2,
  y: 4,
  color: color`6`
}) 
  const currentLevel = levels[0];
  if (currentLevel !== undefined) setMap(currentLevel);
};

  if (care > 8) {
    clearText()
    addText("Interesting...", {
  x: 2,
  y: 2,
  color: color`0`
}) 
  const currentLevel = levels[0];
  if (currentLevel !== undefined) setMap(currentLevel);
};

  if (care > 8) {
    clearText()
    addText("Hmm, Perhaps...", {
  x: 2,
  y: 2,
  color: color`0`
}) 
    addText("in due time ", {
  x: 2,
  y: 4,
  color: color`0`
}) 
  const currentLevel = levels[0];
  if (currentLevel !== undefined) setMap(currentLevel);
};

  if (care > 9) {
    clearText()
    addText("  We will meet", {
  x: 2,
  y: 3,
  color: color`0`
});
    addText("     again", {
  x: 2,
  y: 5,
  color: color`3`
}) 
  const currentLevel = levels[0];
  setMap(currentLevel);
};

  if (care > 10) {
    clearText()
    addText("But for now...", {
  x: 2,
  y: 3,
  color: color`0`
});
  const currentLevel = levels[0];
  setMap(currentLevel);
};

  if (care > 11) {
    clearText()
    addText("I have my meal", {
  x: 2,
  y: 3,
  color: color`0`
});
  const currentLevel = levels[6];
  setMap(currentLevel);
};

  
  if (care > 12) {
  clearText();
  const currentLevel = levels[7];
  setMap(currentLevel);
};

  if (care > 13) {
    clearText()
    care = 0;
    feed = 0;
  const currentLevel = levels[0];
  if (currentLevel !== undefined) setMap(currentLevel);

    addText("press l to hatch", {
  x: 2,
  y: 3,
  color: color`0`
}) 
};
  
});
