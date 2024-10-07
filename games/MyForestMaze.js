
/* 
@title: MyForestMaze
@author: MI2
@tags: ['adventure']
@addedOn: 2023-06-15
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p";
const wall = "w";
const grass1 = "a";
const grass2 = "b";
const grass3 = "c";
const wood1 = "1";
const woodStumpLeft = "[";
const woodStumpRight = "]";
const path = "i";
const leaf = "z";
const floor = "f";


setLegend(
  [ player, bitmap`
................
.00000000000000.
.00007000070000.
.00007000070000.
.00007000070000.
.00007000070000.
.00007000070000.
.00000000000000.
.00000000000000.
.00000777700000.
.00000077000000.
.00000000000000.
.00000000000000.
.00000000000000.
................
................` ],
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
  [ grass1, bitmap`
4444444444444444
4D4D44444D444444
44D444444D044444
4D4D444444444444
4444444444444444
444444444D444444
4D444444D4D44444
D4D4444444444444
4444444444444444
4444444444444444
444D444444444444
444D0444D4D444D4
444444444D4444D0
4D44444444444444
4D04444444444444
4444444444444444`],
  [ grass2, bitmap`
4444444444444444
4DD4444444444444
4DDD444444444444
44DD004444444444
44444444D4444444
444444444D444444
444444444D044444
4444444444444444
444444444444D444
444D444DD4444D44
4444D44DDD444D04
4444DD44DD004444
44444D0444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ grass3,bitmap`
444444444D444444
44DD44444DD44444
44DDD44444DD0444
444DDD4444444444
4400DDD44444D444
44444444444DD444
4444444444DDD444
4444DD4400DD4444
440DD44444444444
4444444444444444
44444444DD444444
4444444DD4444444
4444400DD4444444
4444444444444444
4444444444444444
4444444444444444`],
  [ wood1,bitmap`
CCCC0CCC0CCCC0CC
CCCC0CCC00CCC0CC
CCCC0CC0000CC0CC
CCC0CC00CC0CC0CC
CCC0CC0CCC0CC0CC
CC00CC0CCC0CC0CC
C00CC00CCC0CC0CC
C0CCC0CCC00CC0CC
C00CC00CC0CCC0CC
CC0CCC0C00CC000C
CC00CC000CCC0C0C
CCC0CCC0CCC00C00
CCC0CCC0CCC0CCC0
CCC0CCC0CC00CCC0
CCC0CCC0CC0CCCC0
CCC0CCC0CC0CCC00`],
  [ woodStumpLeft, bitmap`
CC0CCC0CC00CCC0C
CC0CC0CCCC0CCC0C
CC0CC0CCCC00CC0C
CC0CC0CCCCC0CC0C
CC0CC0CCCC00CC0C
CC0CC0CCC00CC00C
CC0CC0CCC0CCC00C
CC0CC0CCC00CCC0C
CCCCC00CCC0CC0CC
4CCCC00CC0CCC00C
44CCCCCCCCCCCCCC
4C4CCCCCCCCCCCCC
C4444C4444CC44C4
44444C4444C444CC
4444444444444444
4444444444444444`],
  [ woodStumpRight, bitmap`
C0CCC00CC0CCC0CC
C0CCC0CCCC0CC0CC
C0CC00CCCC0CC0CC
C0CC0CCCCC0CC0CC
C0CC00CCCC0CC0CC
C00CC00CCC0CC0CC
C00CCC0CCC0CC0CC
C0CCC00CCC0CC0CC
CC0CC0CCC00CCCCC
C00CCC0CC00CCCC4
CCCCCCCCCCCCCC44
CCCCCCCCCCCCC4C4
4C44CC4444C4444C
CC444C4444C44444
4444444444444444
4444444444444444`],
  [ path, bitmap`
444LLLL4LL44LL44
444LLLL44L44LL44
4D44444444444L44
4DD444LLLL444444
44D00444LL444444
4444444LLL4L4444
4444LL44444LLL44
4444LLL4D4LLL444
44L44LL4DD444444
44LL44444D044444
4444444444444444
44444LL4444LLL44
44LLLLLL444LLL44
44LLLL44LL444LL4
444L44444L4L4444
444LLL44L444L444`],
  [ floor, bitmap`
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
1111111111111111`]
  
);



let level = 0
let wrongEntrance = 1
const levels = [
  map `
11cic11cia11
[]cic[]aia[]
abbibbaaibbc
aabiiiiiiacc
aaccaiibcaaa
aaccaiibccaa
aabbaipbbcaa`,
  map`
11ab11cc11a11
11bb[]cc[]a11
[]bbbbcaaaa11
iiiiiiibbba11
bcaaccibbcc11
bccaacibbbc[]
aacccapaabcww`,
  map `
wwwwwww
w.....w
w.....p
w.....w
wwwwwww`,
  map`
111111111111i
111111111111c
1111[][]1111i
11[]cccc[]11c
[]bcccccaa[]i
bbbbbbaaaaaaa
bbbbbbpaaaaaa`,
  map`
11bbbbbbb11bb
11caabbbc11cc
11ccaaabb11bb
11accaaaa[]ab
11bbaacccbbbb
11baaabbbbaaa
11cccccpbbbbb`]
  


setSolids([ player, wall, wood1, woodStumpLeft, woodStumpRight]);

setMap(levels[level])

setPushables({
  [ player ]: []
})

setBackground(path);



function changeBackground(level,currLevel){
  clearText()
  if (level==0){
    //if level 0
    setMap(levels[level]);
    setBackground(path);
    // goes back
    if (currLevel == 1 && wrongEntrance == 1){
      getFirst(player).y = 2;
      getFirst(player).x = 8;
      addText("Did you enter\n"+
              "this way..?",{
        x:2,
        y:5,
        color: color`6`})
      let wrongEntrance=0;
    //goes back again
    }else if (currLevel == 1 && wrongEntrance==0){
      getFirst(player).y = 2;
      getFirst(player).x = 4;
    }
  
  }else if (level==1){
    // if level 1
    setMap(levels[level])
    setBackground(path)
    getFirst(player).y = 4;
    getFirst(player).x = 6;
    //coming from level 2
    if(currLevel == 2){
      getFirst(player).y=3;
      getFirst(player).x=0;
    }else if (currLevel==3){
      getFirst(player).y=0;
      getFirst(player).x=3;
    }

  }else if (level==2){
    //if level 2 
    setMap(levels[level])
    setBackground(floor)
    getFirst(player).y = 2;
    getFirst(player).x = 4;
    addText("Yay! You're Done!\n"+
            "But Theres More\n"+
            "In that forest",{
            x:2,
            y:5,
            color: color`6`})
    
  }else if (level==3){
    //if level 3
    setMap(levels[level])
    setBackground(path)
    getFirst(player).y=7;
    getFirst(player).x=6;
    if(currLevel == 4){
      //coming from 4
      getFirst(player).y=3;
      getFirst(player).x=12;
    }
  }else if (level==4){
    //if level 4
    setMap(levels[level])
    setBackground(grass1)
    getFirst(player).y=7;
    getFirst(player).x=6;
    addText("Thanks for playing!\n"+
            "This was a way for\n"+
            "Me to Test Various\n"+
            "functions as I have\n"+
            "Never used\n"+
            "Javascript!",{
            x:0,
            y:5,
            color: color`6`})
  }
  
}



onInput("w", () => {
  getFirst(player).y -=1;
});

onInput("a", () => {
  getFirst(player).x -=1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;

});

afterInput(() => {
  const currLevel = -1
  //teleport checks
  if (level==0){
    //level 0
    //if goes top left
    if (getFirst(player).y == 0 && getFirst(player).x==3)  {
      //go to level 1
      const currLevel=level;
      level = level+1;
      changeBackground(level,currLevel);
    }
  }else if (level==1){
    //level 1
    //if goes left(follow trail)
    if(getFirst(player).y == 3 && getFirst(player).x==0) {
      //go to level 2
      const currLevel=level;
      level = level+1;
      changeBackground(level,currLevel);
    //else goes back
    }else if(getFirst(player).y == 6 && getFirst(player).x==6) {
      //go to level 1
      const currLevel=level;
      level = level-1;
      changeBackground(level,currLevel);
    //else goes top left
    }else if (getFirst(player).y == 0 && getFirst(player).x>1 && getFirst(player).x<4){
      //goto level 3
      const currLevel=level;
      level=level+2;
      changeBackground(level,currLevel);
    }
  }else if (level==2){
    //level 2
    if(getFirst(player).y == 2 && getFirst(player).x == 6){
      //exit back to level 1
      const currLevel=level;
      level= level-1;
      changeBackground(level,currLevel)
    }
  }else if (level==3){
    //level 3
    if(getFirst(player).y == 0 && getFirst(player).x == 12){
      //goes forward
      const currLevel=level;
      level=level+1
      changeBackground(level,currLevel)
    }else if(getFirst(player).y == 6 && getFirst(player).x == 6){
      //goes back
      const currLevel=level;
      level=level-2
      changeBackground(level,currLevel)
    }
  }else if (level==4){
    //leaves
    if(getFirst(player).y == 6){
      const currLevel=level;
      level=level-1
      changeBackground(level,currLevel)
    }
  }
});

