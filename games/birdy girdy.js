/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const bird = "p";
const cloud = "c";
const Gcloud = "d";
const food = "f";
const finish = "g";
const myTune = tune`
500: A4~500,
500: G5~500 + E4^500,
500: G4~500 + C4~500 + B4^500,
500: C5~500 + E4~500 + F5^500,
500,
500: B4~500,
500: D4~500 + G4~500 + F5~500 + A5-500 + B4/500,
500,
500: A4/500 + D5^500 + G4/500,
500: G5^500 + C5/500,
500: D4^500 + G4^500,
500: E5^500,
500: D4^500 + G5-500 + G4-500,
500: B4^500 + D4-500,
500: F4^500 + D5/500,
500: F5-500 + A4-500,
500: C5-500 + E4-500 + C4-500,
500,
500: E4-500 + G5-500 + G4-500 + D5/500,
500,
500: A4-500,
500: D4/500 + G5/500,
500: C5-500 + E5~500,
500: E4/500 + A4/500,
500,
500: F5/500 + E5/500 + F4~500 + B4~500,
500: D4/500,
500: G4/500 + C5/500,
500,
500: B4~500,
500: G5/500 + C5/500 + F4/500 + D4~500,
500`

setLegend(
  [ bird, bitmap`
................
....333.........
....3.33..333333
....33.3..3....3
.....3..33...3.3
....33..33.....3
.3333....3....33
.3....3....3333.
.3....33...3....
.3....33...3....
.33333333..3....
........333.....
................
................
................
................` ],
  [ cloud, bitmap`
................
................
..11111111111...
..11112112121...
.1122222222221..
112222222222211.
122222222222221.
122222222222221.
1222222222222211
122222222222221.
112222212222211.
11112121111111..
111111111.1111..
................
................
................`],
  [food, bitmap`
................
......F.....6...
.F......6.......
..6..6.......F..
.....F.6..6.6...
..6......6.F..F.
F..6F6.F..6..6..
...6...F....F...
.6..6..6FF..6...
.....F....F..FF.
...FFF.6..F.6...
F...6...66......
......F.....F6..
..FF..F6..F.....
.6.F.6..F.6.....
...6............`],
  [Gcloud,bitmap`
................
........66666...
...6666666626...
..666626222266..
.6662222222226..
66222222222226..
622222222222266.
622222222222226.
662222222222226.
.66222222222226.
.66622222222226.
.66662262666666.
....66666.6666..
................
................
................`]
)

setSolids([bird,cloud])

let level = 0
const levels = [
  map`
c..........cc......f
.c.cc.c.c.....c..c..
.c........c.c..c....
.c..c..c.....c.c..c.
.....c.....c...cc.c.
c..c..c.c....c.c....
..c..c....c.c.c..c.c
...c...c.c.....c.c..
.c...c.....c..c..c..
..c...c.c.c.c.....c.
p...c....c.....c..c.`,
  map`
c.c.c...c..c....c..f
...c...c.c...c.c..c.
.c...cc....c...c.c..
.c.c....c.c...c.....
.....c..........c...
.c.....c..c.c.c..cc.
c.c...c..c....c...c.
.c.c....c...c..cc...
c....cc..c...c....c.
.c..c..c.c.c..c.c.c.
p..c.c..c...c...c...`,
  map`
....cccc........c...c.....cc....c...f
...c.......c..c................c.....
..c.c...c.c.c........c...c.....c...c.
..c.ccc......ccc.c.....cc.c.....c....
.....c...c.......c..c..cc....cc.....c
..c.c...cc..c..c.c.c..c..ccc.c..cc.cc
c.c.c.c...ccc...c.....c....c..cc..c..
.c..c.....ccc.c.c.c.cc..ccccc..c.c...
c...ccc.c.......c..cccc......cc..c..c
cccc...c.cc..cc..c.ccc.ccc..c...c...c
..cc.c.c...........c......cc..c...c..
c.c..cc..cc..c..c...c..cc.c..c...ccc.
..cc..c.ccccc.c.....cc.c...........c.
.cc......cc.ccc...c.c.......c.ccc..cc
.cc....cc.c......c..cc.c..cc...c..c..
..cc...c...ccccccccc..c.cc.c.c.c....c
.cc.c.cc.c.....cc.c.cc..cc.cc.cccc..c
..c....c...cc.cccc...cccc....cc.cc..c
...c...c...c.......c.c......cc.c.c..c
pc...c...c....c...c....c..c.c.c..c...`,
  map`
.c..c..cc.cccc..c........c.........f
.c.........c......cc...cc..c.ccc.c..
..c.....c.....c.c.c...c......ccc..cc
....cc.c....cc..c..cc...c.cc.c......
..cc.....ccc....c.cc.c...c.c.cc.....
...cc..cc...ccc....c...c.....c..cc..
.cccc...cc...c.ccc.cc.....c..cc...c.
....cccc.cc.ccc..c....c.c.cc..c.c...
....c.cccc...c....ccc...c.c.c...cc..
.....c.cc.......c.c.......c....c....
..c..c.c..c...c.cc......cccc..c.....
cc.c.....c....c..cdc.c.cc..cc..cccc.
cc......c..c........c.......c.cc.c..
..cccc.c.cc.ccc..c...c.....cc...cc..
c.....c..c....cccc..c..c..ccc...cc.c
.c..c..c...c....cc..c...cc..c.ccc...
cccccc..c...c...c..c.cc...cc...c..c.
..c...cc.c.....ccc.ccc.ccccc.c......
c...c.....c....ccc.c..ccc..c.cccc...
..cc....cc...c.c........c....c..c.cc
p.c.ccc....c.....c......c..........c`,
]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ bird ]: []
})

onInput("s", () => {
  getFirst(bird).y += 1
});

onInput("d", () => {
  getFirst(bird).x += 1;
  playTune(myTune);

});

onInput("w", () => {
  getFirst(bird).y -= 1; // positive y is downwards
  playTune(myTune);

});

onInput("a", () => {
  getFirst(bird).x -= 1; // positive y is downwards
  playTune(myTune);

}); 

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
   // count the number of tiles with goals
  const targetNumber = tilesWith(food).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(food, bird).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
  
})