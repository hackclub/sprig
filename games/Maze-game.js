
/* 
@title: Puzzle Maze Game
@author: Isaiah Kim
@tags: []
@addedOn: 2024-11-19
*/

//Next Up: Switches!

//sprites
const player = "p";
const enemy1 = "e";
const wall = "w";
const goal = "g";
const key = "k";
const push = "z";
const switchr = "r";
const gater = "q";
const offr = "d";
const switchb = "b";
const gateb = "a";
const offb = "c";
const switchy = "y";
const gatey = "v";
const offy = "f";
const lockedgoal = "l";
//variables
const totalNum = 20;
let noMove = false;
let switchY = false;
let switchB = false;
let switchR = false;

setLegend(
	[ player, bitmap`
..555555555555..
.72222222222227.
7222220222022227
.77222222222277.
..722220220227..
...7777200777...
.....3399933....
.33.33999993..33
..3339999993333.
...33999999333..
....39999993....
....33333333....
.....CCCCCC.....
.....CC..CC.....
.....CC..CC.....
.....CC..CC.....` ],
    [ wall, bitmap`
1111111111111111
1111111111111111
111CL9099999LC11
111CL9999999LC11
111CL9909909LC11
11CCL9999999LC11
11CLL990099LLC11
11CL9900999LCC11
11CL9909909LC111
11CL9999999LC111
11CL9999099LC111
11CL990999LLC111
1CCL999009LCC111
1CLL900999LC1111
1111111111111111
1111111111111111` ],
    [ goal, bitmap`
....DDDDDDDD....
...D55555555D...
..D5577777755D..
.D577666666775D.
D55769909996755D
D57690999090675D
D57699090999675D
D57690999009675D
D57609090099675D
D57600999909675D
D57690990990675D
D55769909996755D
.D577666666775D.
..D5577777755D..
...D55555555D...
....DDDDDDDD....`],
    [ enemy1, bitmap`
................
.....3..3..3....
...333333333....
..33666666633...
..3666666666333.
3336066660663.33
.366666666663...
.36666666666333.
3366666666663.33
.366000006663...
.36066666066333.
.366666666663.33
.336666666633...
..3333333333....
...3..3..3.33...
...3..3..3..3...`],
    [ key, bitmap`
...999999999....
..93333333339...
.9366666666399..
.93666666663999.
.9366666666399..
..93333333339...
...999999999....
......99........
......99........
......999999....
......999999....
......99........
......9999......
......9999......
......99........
................`],
    [ lockedgoal, bitmap`
0...DDDDDDDD...0
0..D55555555D..0
00D5577777755D00
.00776666667700.
D50069999996005D
D57000000000075D
D5760LLLLLL0675D
D5760LL11LL0675D
D5760LL11LL0675D
D5760LL1LLL0675D
D57600LLLL00675D
D55760000006755D
.D577666666775D.
..D5577777755D..
...D55555555D...
....DDDDDDDD....`],
    [ push, bitmap`
................
.00000000000000.
.0CCCCC99CCCCC0.
.0CCCC9999CCCC0.
.0CCC939939CCC0.
.0CC93399339CC0.
.0C9333993339C0.
.09999999999990.
.09999999999990.
.0C9333993339C0.
.0CC93399339CC0.
.0CCC939939CCC0.
.0CCCC9999CCCC0.
.0CCCCC99CCCCC0.
.00000000000000.
................`],
    [ switchr, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC000000000000CC
CC033333333330CC
CC033330033330CC
CC033330033330CC
CC033330033330CC
CC033330033330CC
CC033330033330CC
CC033333333330CC
CC033330033330CC
CC033330033330CC
CC033333333330CC
CC000000000000CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
    [ switchb, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC000000000000CC
CC055555555550CC
CC055550055550CC
CC055550055550CC
CC055550055550CC
CC055550055550CC
CC055550055550CC
CC055555555550CC
CC055550055550CC
CC055550055550CC
CC055555555550CC
CC000000000000CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
    [ gater, bitmap`
3CCCCCCCCCCCCCC3
C32333333333323C
C23233333333232C
C32323333332323C
C33232333323233C
C33323233232333C
C33332322323333C
C33333233233333C
C33333233233333C
C33332322323333C
C33323233232333C
C33232333323233C
C32323333332323C
C23233333333232C
C32333333333323C
3CCCCCCCCCCCCCC3`],
    [ gateb, bitmap`
5CCCCCCCCCCCCCC5
C52555555555525C
C25255555555252C
C52525555522525C
C55252555525255C
C55525255252555C
C55552522525555C
C55555255255555C
C55555255255555C
C55552522525555C
C55525255252555C
C55252555525255C
C52525555552525C
C25255555555252C
C52555555555525C
5CCCCCCCCCCCCCC5`],
    [ gatey, bitmap`
6CCCCCCCCCCCCCC6
C62666666666626C
C26266666666262C
C62626666622626C
C66262666626266C
C66626266262666C
C66662622626666C
C66666266266666C
C66666266266666C
C66662622626666C
C66626266262666C
C66262666626266C
C62626666662626C
C26266666666262C
C62666666666626C
6CCCCCCCCCCCCCC6`],
    [ switchy, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC000000000000CC
CC066666666660CC
CC066660066660CC
CC066660066660CC
CC066660066660CC
CC066660066660CC
CC066660066660CC
CC066666666660CC
CC066660066660CC
CC066660066660CC
CC066666666660CC
CC000000000000CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
    [ offr, bitmap`
3222222222222223
232..........232
2232........2322
2.232.....2232.2
2..232....232..2
2...232..232...2
2....232232....2
2.....2332.....2
2.....2332.....2
2....232232....2
2...232..232...2
2..232....232..2
2.232......232.2
2232........2322
232..........232
3222222222222223`],
    [ offb, bitmap`
5222222222222225
252..........252
2252........2522
2.252.....2252.2
2..252....252..2
2...252..252...2
2....252252....2
2.....2552.....2
2.....2552.....2
2....252252....2
2...252..252...2
2..252....252..2
2.252......252.2
2252........2522
252..........252
5222222222222225`],
    [ offy, bitmap`
6222222222222226
262..........262
2262........2622
2.262.....2262.2
2..262....262..2
2...262..262...2
2....262262....2
2.....2662.....2
2.....2662.....2
2....262262....2
2...262..262...2
2..262....262..2
2.262......262.2
2262........2622
262..........262
6222222222222226`]
  
)

setSolids([enemy1])

let level = 0
const levels = [
	map`
wwwwwww
wpr...w
w..w..w
wq.w..w
w..e..w
w....gw
wwwwwww`,
    map`
wwwwwwww
wp...www
w.e..www
w..wz..w
w..w.w.w
w..w..gw
wwwwwwww`,
    map`
wwwwwwwww
w....p..w
w.w.....w
w.wew...w
w.w.w.z.w
w.w.w...w
wk..w..lw
wwwwwwwww`,
    map`
wwwwwwwwwwwwww
we...bw.e....w
w..e.yw...e.ew
w....ew......w
w.wwwww.wwww.w
wzwl..w.wk.w.w
w.w.e.w.w.ew.w
w.w..wwpw..w.w
w.wwv.waww.w.w
w.we..wrw..w.w
w..wwzwww.ew.w
w.z.....wqww.w
w.w..........w
wwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
	[ player ]: []
})

onInput("s", () => {
  clearText();
  if(getFirst(player).y < width() - 1){
    getFirst(player).y += 1;
  } else {
    noMove = true;
  }
  checkPush("yu");
  if(checkMovement(player, wall) || checkMovement(player, enemy1) || checkGates()){
    getFirst(player).y -= 1;
    noMove = true;
  }
})

onInput("a", () => {
  clearText();
  if(getFirst(player).x > 0){
    getFirst(player).x -= 1;
  } else {
    noMove = true;
  }
  checkPush("xr");
  if(checkMovement(player, wall) || checkMovement(player, enemy1) || checkGates()){
    getFirst(player).x += 1;
    noMove = true;
  }
})

onInput("d", () => {
  clearText();
  if(getFirst(player).x < height() - 1){
    getFirst(player).x += 1;
  } else {
    noMove = true;
  }
  checkPush("xl");
  if(checkMovement(player, wall) || checkMovement(player, enemy1) || checkGates()){
    getFirst(player).x -= 1;
    noMove = true;
  }
})

onInput("w", () => {
  clearText();
  if(getFirst(player).y > 0){
    getFirst(player).y -= 1;
  } else {
    noMove = true;
  }
  checkPush("yd");
  if(checkMovement(player, wall) || checkMovement(player, enemy1) || checkGates()){
    getFirst(player).y += 1;
    noMove = true;
  }
})  

onInput("i", () => {
  clearText();
  setMap(levels[level]);
  resetLevel();
})

afterInput(() => {
  if(noMove === false){
    
    //Enemy checks
    const allEnemies = getAll(enemy1);
    allEnemies.forEach((enemy1) => moveEnemy(enemy1));
    
    //Key checks
    let keysCovered = tilesWith(player, key).length;
    if(keysCovered > 0){
      let tempx = getFirst(player).x;
      let tempy = getFirst(player).y;
      getFirst(player).x = 0;
      getFirst(player).y = 0;
      clearTile(tempx, tempy);
      getFirst(player).x = tempx;
      getFirst(player).y = tempy;
      tempx = getFirst(lockedgoal).x;
      tempy = getFirst(lockedgoal).y;
      clearTile(tempx, tempy);
      addSprite(tempx, tempy, goal);
    }

    //Switches check
    checkSwitches();
    
    //End of level checks
    let goalsCovered = tilesWith(goal, player).length;
    if(goalsCovered > 0){
      level += 1;
      if (level > totalNum){
        //finish "world"
      } else {
        setMap(levels[level]);
      }
    }

    let lockedGoalsCovered = tilesWith(lockedgoal, player).length;
    if(lockedGoalsCovered > 0){
      addText("You Need A Key!", {x:Math.floor(width()/2), y:Math.floor(height()/2), color:color`5`});
    }
    
  } else {
    noMove = false;
  }
})

function moveEnemy(enemy){
  let checking = true;
  const checkdir = [false, false, false, false];
  while(checking === true){
    let rand = Math.floor(Math.random() * 4);
    if(rand === 0 && enemy.x < width() - 1){
      enemy.x += 1;
      checking = runCheck(enemy1);
      if(checking === true){
        enemy.x -= 1;
        checkdir[0] = true;
      }
    } else if (rand === 1 && enemy.x > 0){
      enemy.x -= 1;
      checking = runCheck(enemy1);
      if(checking === true){
        enemy.x += 1;
        checkdir[1] = true;
      }
    } else if (rand === 2 && enemy.y < height() - 1){
      enemy.y += 1;
      checking = runCheck(enemy1);
      if(checking === true){
        enemy.y -= 1;
        checkdir[2] = true;
      }
    } else if (rand === 3 && enemy.y > 0){
      enemy.y -= 1;
      checking = runCheck(enemy1);
      if(checking === true){
        enemy.y += 1;
        checkdir[3] = true;
      }
    }
    if(checkdir[0] === true && checkdir[1] === true && checkdir[2] === true && checkdir[3] === true){
      checking = false;
    }
  }
}

function checkMovement(var1, var2){
  if(tilesWith(var1, var2).length > 0){
    return true;
  } else {
    return false;
  }
}

function checkGates(){
  if(switchY){
    if(tilesWith(player, gatey).length > 0){
      return true;
    }
  }
  if (switchB){
    if(tilesWith(player, gateb).length > 0){
      return true;
    }
  }
  if(switchR){
    if(tilesWith(player, gater).length > 0){
      return true;
    }
  }
}

function checkSwitches(){
  if(tilesWith(player, switchy).length > 0){
    switchY = !switchY;
    if(switchY){
      clearTile(temp, tempy);
      addSprite(temp, tempy, switchy);
    } else {
      clearTile(temp, tempy);
      addSprite(temp, tempy, offy);
    }
  }
  if(tilesWith(player, switchb).length > 0){
    switchB = !switchB;
    if(switchB){
      clearTile(temp, tempy);
      addSprite(temp, tempy, switchb);
    } else {
      clearTile(temp, tempy);
      addSprite(temp, tempy, offb);
    }
  }
  if(tilesWith(player, switchr).length > 0){
    switchR = !switchR;
    if(switchR){
      let gates = getAll(switchb);
      for(i = 0; i < gates.length; i++){
        let tempx = gates[i].x;
        let tempy = gates[i].y;
        clearTile(tempx, tempy);
        addSprite(tempx, tempy, offr);
        addText("test", {x:1,y:1});
      }
    } else {
      clearTile(temp, tempy);
      addSprite(temp, tempy, offr);
    }
  }
}

function resetLevel(){
  noMove = false;
}

function checkPush(dir){
  let pushCovered = tilesWith(player, push).length;
  let tempx = getFirst(player).x;
  let tempy = getFirst(player).y;
  let tempCheck = null;
  if(pushCovered > 0){
    if(dir === "xr"){
      getFirst(player).x += 1;
      if(tempx > 0){
        tempCheck = getTile(tempx - 1, tempy);
        if(tempCheck.length === 0){
          clearTile(tempx, tempy);
          addSprite(tempx - 1, tempy, push);
          getFirst(player).x -= 1;
        } else {
          noMove = true;
        }
      } else {
        noMove = true;
      }
    } else if (dir === "xl"){
      getFirst(player).x -= 1;
      if(tempx < width() - 1){
        tempCheck = getTile(tempx + 1, tempy);
        if(tempCheck.length === 0){
          clearTile(tempx, tempy);
          addSprite(tempx + 1, tempy, push);
          getFirst(player).x += 1;
        } else {
          noMove = true;
        }
      } else {
        noMove = true;
      }
    } else if (dir === "yu"){
      getFirst(player).y -= 1;
      if(tempy < height() - 1){
        tempCheck = getTile(tempx, tempy + 1);
        if(tempCheck.length === 0){
          clearTile(tempx, tempy);
          addSprite(tempx, tempy + 1, push);
          getFirst(player).y += 1;
        } else {
          noMove = true;
        }
      } else {
        noMove = true;
      }
    } else if (dir === "yd"){
      getFirst(player).y += 1;
      if(tempy > 0){
        tempCheck = getTile(tempx, tempy - 1);
        if(tempCheck.length === 0){
          clearTile(tempx, tempy);
          addSprite(tempx, tempy - 1, push);
          getFirst(player).y -= 1;
        } else {
          noMove = true;
        }
      } else {
        noMove = true;
      }
    }
  }
}

function runCheck(obj){
  return checkMovement(obj, wall) || checkMovement(obj, goal) || checkMovement(obj, player) || checkMovement(obj, push);
}
//Debugger line: addText("test", {x:1,y:1});