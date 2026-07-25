/*
@title: TwoShots
@description: Unlike Hamaltin you can give up one shot and still have one
@author: Nat
@tags: ['light']
@addedOn: 2026-05-15

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const cpu = "c";
const door1 = "g";
const wall = "w";
const door2 = "d";
const cpu2 = "u"
const ground = "r";
const cpu3 = "q"
const cpu4 = "e"
const light = "l"
const broken = "k"
const cpu5 = "t"
const cpu6 = "y"
const light2 = "i"
const broken2 = "b"
const wheat = "a"
const niko = "n"
const green = "s"
const sky = "f"
const cpu1 = "m"



// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
...C......C.....
..CFC....CFC....
.CFFFCCCCFFFC...
.CCCCCCCCCCCC...
CCCCCCCCCCCCCC..
..HHHHHHHHHH....
HHHHFFFFFFHHHH..
..HF66FF66FH....
HHHF60FF06FHHH..
.55555555555....
555555555555....
5.CCCCCCCCCC....
.CCCFFFFFFCC66..
.C.CCCCCCCC6666.
...CFFFFFFC.11..
...CCC..CCC.....`],
  [ cpu, bitmap`
................
................
.11111111111111.
.11111111111111.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
  [ door1, bitmap`
..CCCCCCCCCCCC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CCCCCCCCC66C..
..CCCCCCCCC66C..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CCCCCCCCCCCC..`],
  [ wall, bitmap`
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
  [ door2, bitmap`
..CCCCCCCCCCCC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CCCCCCCCC66C..
..CCCCCCCCC66C..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CFFFFFFFFFFC..
..CCCCCCCCCCCC..`],
  [ cpu2, bitmap`
................
................
.11111111111111.
.11111111111111.
.11777777777711.
.11777777777711.
.11777777777711.
.11777777777711.
.11777777777711.
.11777777777711.
.11777777777711.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
  [ ground, bitmap`
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
   [ cpu3, bitmap`
................
................
.11111111111111.
.11111111111111.
.11444444444411.
.11444444444411.
.11444444444411.
.11444444444411.
.11444444444411.
.11444444444411.
.11444444444411.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
  [ cpu4, bitmap`
................
................
.11111111111111.
.11111111111111.
.11999999999911.
.11999999999911.
.11999999999911.
.11999999999911.
.11999999999911.
.11999999999911.
.11999999999911.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
  [ light, bitmap`
................
......222222....
.....26666662...
....2666666662..
...266622666662.
...266266266662.
...266266226662.
...266222662662.
...262662662662.
..1226662226662.
.LL12662666662..
111L122666662...
LL11LL222222....
11L1111.........
.11LLL..........
..111...........`],
   [ broken, bitmap`
....2.2.........
...2L2L2..22....
...2LL2..2LL2...
....22....2LL2..
...222.2..2LLL2.
...2LL2LL2LLLL2.
...2LL2LL22LLL2.
...2LL222LL2LL2.
...2L2LL2LL2LL2.
..122LLL222LLL2.
.LL12LL2LLLLL2..
111L122LLLLL2...
LL11LL222222....
11L1111.........
.11LLL..........
..111...........`],
  [ cpu5, bitmap`
................
................
.11111111111111.
.11111111111111.
.11HHHHHHHHHH11.
.11HHHHHHHHHH11.
.11HHHHHHHHHH11.
.11HHHHHHHHHH11.
.11HHHHHHHHHH11.
.11HHHHHHHHHH11.
.11HHHHHHHHHH11.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
  [ cpu6, bitmap`
................
................
.11111111111111.
.11111111111111.
.11888888888811.
.11888888888811.
.11888888888811.
.11888888888811.
.11888888888811.
.11888888888811.
.11888888888811.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
  [ light2, bitmap`
................
......222222....
.....26666662...
....2666666662..
...266622666662.
...266266266662.
...266266226662.
...266222662662.
...262662662662.
..1226662226662.
.LL12662666662..
111L122666662...
LL11LL222222....
11L1111.........
.11LLL..........
..111...........`],
   [ broken2, bitmap`
....2.2.........
...2L2L2..22....
...2LL2..2LL2...
....22....2LL2..
...222.2..2LLL2.
...2LL2LL2LLLL2.
...2LL2LL22LLL2.
...2LL222LL2LL2.
...2L2LL2LL2LL2.
..122LLL222LLL2.
.LL12LL2LLLLL2..
111L122LLLLL2...
LL11LL222222....
11L1111.........
.11LLL..........
..111...........`],
  [wheat, bitmap`
................
................
................
.........F.6....
...F..6.6F66....
.9..F6..F.6.F...
.9...6.9F666F..6
..9..6.9F66.F..6
...966FF9666F6.6
6..966FF99669.6.
66.966FF6966F.6.
.66966F.F9696.6.
..6.66F.F96F6.6.
..6.6F.6.F6F66..
...66F666F6F96..
...66F6FF6.F66..`],
  [ niko, bitmap`
...C......C.....
..CFC....CFC....
.CFFFCCCCFFFC...
.CCCCCCCCCCCC...
CCCCCCCCCCCCCC..
..HHHHHHHHHH....
HHHHFFFFFFHHHH..
..HF66FF66FH....
HHHF60FF06FHHH..
.55555555555....
555555555555....
5.CCCCCCCCCC....
.CCCFFFFFFCC66..
.C.CCCCCCCC6666.
...CFFFFFFC.11..
...CCC..CCC.....`],
  [ green, bitmap`
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
  [ cpu1, bitmap`
................
................
.11111111111111.
.11111111111111.
.11LLLLLLLLLL11.
.11LLLLLLLLLL11.
.11LLLLLLLLLL11.
.11LLLLLLLLLL11.
.11LLLLLLLLLL11.
.11LLLLLLLLLL11.
.11LLLLLLLLLL11.
.11111111154311.
.11111111111111.
...1111111111...
..111111111111..
................`],
);

setBackground(ground)

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
w.p...m.....g
w...........w
w...........w
w...........w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
d.p...c.....w
w...........w
w...........w
w...........w
wwwwwwgwwwwww`,
  map`
wwwwwwdwwwwww
w.....p.....w
w...........w
w...........w
w.....u.....w
w...........w
w...........w
w...........w
wwwwwwgwwwwww`,
  map`
wwwwwwdwwwwww
w.....p.....w
w...........w
w...........w
g.....q.....w
w...........w
w...........w
w...........w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
w.....e....pd
w...........w
w...........w
w...........w
wwwwwwgwwwwww`,
  map`
wwwwwwdwwwwww
w.....p.....w
w...........w
w...........w
w...l.t.k...w
w...........w
w...........w
w...........w
wwwwwwwwwwwww`,
  map`
wwwwwwdwwwwww
w.....p.....w
w...........w
w...........w
w...i.y.b...w
w...........w
w...........w
w...........w
wwwwwwwwwwwww`,
  map`
aaaaaaaaaaaaa
aaaaaaaaaaaaa
aaaaaaaaaaaaa
aaaaaaaaaaaaa
aaaaaanaaaaaa
aaaaaaaaaaaaa
aaaaaaaaaaaaa
aaaaaaaaaaaaa
aaaaaaaaaaaaa`,
  map`
fffffffffffff
lffffffffffff
rffffffffffff
rffffffffffff
rfffffnffffff
rssssssssssss
rssssssssssss
rssssssssssss
rssssssssssss`,
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall, ]); // other sprites cannot go inside of these sprites


// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

// input to reset level
onInput("k", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const oldLevel = level;

  const targetNumber = tilesWith(door1).length;
  const numberCovered = tilesWith(door1, player).length;
  if (targetNumber > 0 && numberCovered === targetNumber) {
    level = level + 1;
  }

  const targetNumber2 = tilesWith(door2).length;
  const numberCovered2 = tilesWith(door2, player).length;
  if (targetNumber2 > 0 && numberCovered2 === targetNumber2) {
    level = level - 1;
  }

  const cpu1Text = tilesWith(cpu1).length;
  const cpu1Covered = tilesWith(cpu1, player).length;
  if (cpu1Text > 0 && cpu1Covered === cpu1Text) {
     addText("This is Niko", { y: 4, color: color`2` });
 
  setTimeout(() => {
      clearText();
    }, 2500);
}
  const cpuText = tilesWith(cpu).length;
  const cpuCovered = tilesWith(cpu, player).length;
  if (cpuText > 0 && cpuCovered === cpuText) {
     addText("You only have, wait", { y: 4, color: color`2` });
 
  setTimeout(() => {
      clearText();
    }, 2500);
}
  const cpu2Text = tilesWith(cpu2).length;
  const cpu2Covered = tilesWith(cpu2, player).length;
  if (cpu2Text > 0 && cpu2Covered === cpu2Text) {
    addText("TwoShots?", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
}
  const cpu3Text = tilesWith(cpu3).length;
  const cpu3Covered = tilesWith(cpu3, player).length;
  if (cpu3Text > 0 && cpu3Covered === cpu3Text) {
    addText("Thats not...", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
}
  const cpu4Text = tilesWith(cpu4).length;
  const cpu4Covered = tilesWith(cpu4, player).length;
  if (cpu4Text > 0 && cpu4Covered === cpu4Text) {
    addText("...how it works", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
} 

  const cpu5Text = tilesWith(cpu5).length;
  const cpu5Covered = tilesWith(cpu5, player).length;
if (cpu5Text > 0 && cpu5Covered === cpu5Text) {
    addText("Choose.", { y: 4, color: color`2` });
    
    setTimeout(() => {
        clearText();
    }, 2500);
}

  const cpu6Text = tilesWith(cpu6).length;
  const cpu6Covered = tilesWith(cpu6, player).length;
if (cpu6Text > 0 && cpu6Covered === cpu6Text) {
    addText("One more shot", { y: 4, color: color`2` });
    
    setTimeout(() => {
        clearText();
    }, 2500);
}

  
  if (level !== oldLevel) {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    } else {
      clearText("");
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});

afterInput(() => {

  const brokenText = tilesWith(broken).length;
  const brokenCovered = tilesWith(broken, player).length;
  if (brokenText > 0 && brokenCovered === brokenText) {
    addText("Save Niko", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
  }

  const lightText = tilesWith(light).length;
  const lightCovered = tilesWith(light, player).length;
  if (lightText > 0 && lightCovered === lightText) {
    addText("Save the World", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
  }

  const broken2Text = tilesWith(broken2).length;
  const broken2Covered = tilesWith(broken2, player).length;
  if (broken2Text > 0 && broken2Covered === broken2Text) {
    addText("Save Niko", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
  }

  const light2Text = tilesWith(light2).length;
  const light2Covered = tilesWith(light2, player).length;
  if (light2Text > 0 && light2Covered === light2Text) {
    addText("Save the World", { y: 4, color: color`2` });
    
  setTimeout(() => {
    clearText();
    }, 2500);
  }
});

// FINISH IT!
onInput("i", (targetLevel = 6) => {

  const brokenText = tilesWith(broken).length;
  const brokenCovered = tilesWith(broken, player).length;
  if (brokenText > 0 && brokenCovered === brokenText) {
  setMap(levels[targetLevel]); 

  }
  
  const lightText = tilesWith(light).length;
  const lightCovered = tilesWith(light, player).length;
  if (lightText > 0 && lightCovered === lightText) {
  setMap(levels[targetLevel]); 
  
  }
});

onInput("i", (targetLevel = 7) => {
  
  const broken2Text = tilesWith(broken2).length;
  const broken2Covered = tilesWith(broken2, player).length;
  if (broken2Text > 0 && broken2Covered === broken2Text) {
  const level = setMap(levels[targetLevel]);
  setBackground(wheat)
  addText("Niko is home", { y: 4, color: color`0` });
  
setTimeout(() => {
  addText("Switch off the game.", { y: 4, color: color`3` });
}, 2500);

setTimeout(() => {
  clearText();
}, 5000); 
}
});

onInput("i", (targetLevel = 8) => {
  
  const light2Text = tilesWith(light2).length;
  const light2Covered = tilesWith(light2, player).length;
  if (light2Text > 0 && light2Covered === light2Text) {
  const level = setMap(levels[targetLevel]);
  setBackground(sky)

  addText("You saved the world", { y: 4, color: color`2` });
  
setTimeout(() => {
  addText("Switch off the game.", { y: 4, color: color`3` });
}, 2500);

setTimeout(() => {
  clearText();
}, 5000); 
}
});
