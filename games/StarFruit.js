/*
@title: StarFruit
@author: irstupid
@tags: ['endless', 'retro']
@addedOn: 2024-10-04
*/

let player = "p"
const grass = "#"
const cherry = "1"
const orange = "2"
const lemon = "3"
const lime = "4"
const playerIdle = `
.......00.......
......0660......
......0660......
.....066660.....
.....066660.....
0000006666000000
0666666666666660
.06666066066660.
..066666666660..
...0606666060...
...0660000660...
...0666666660...
..066660066660..
.066660..066660.
.06660....06660.
.0000......0000.`
const playerHold = `
.00....00....00.
0660..0660..0660
06660.0660.06660
0666006666006660
.06660666606660.
.06660666606660.
..066666666660..
..066606606660..
...0666666660...
...0606666060...
...0660000660...
...0666666660...
..066660066660..
.066660..066660.
.06660....06660.
.0000......0000.`
const farmTL = "y"
const farmTR = "u"
const farmBL = "h"
const farmBR = "j"
const beetleW = "W"
const beetleA = "A"
const beetleS = "S"
const beetleD = "D"
setLegend(
  [ beetleW, bitmap`
.0....0000....0.
070..022220..070
.0..02022020..0.
.0..02222220..0.
..0.05522550.0..
..007775577700..
...0577557750...
.0.0777557770.0.
0700577557750070
.0.0777557770.0.
...0577557750...
..007775577700..
.0.0777557770.0.
.0..07755770..0.
070..000000..070
.0............0.` ],
  [ beetleA, bitmap`
.0......0.....0.
0700...070..0070
.0..00..0..0..0.
.....00000000...
..000757575770..
.02257777777770.
020257777777770.
022225555555550.
022225555555550.
020257777777770.
.02257777777770.
..000757575770..
.....00000000...
.0..00..0..0..0.
0700...070..0070
.0......0.....0.` ],
  [ beetleS, bitmap`
.0............0.
070..000000..070
.0..07755770..0.
.0.0777557770.0.
..007775577700..
...0577557750...
.0.0777557770.0.
0700577557750070
.0.0777557770.0.
...0577557750...
..007775577700..
..0.05522550.0..
.0..02222220..0.
.0..02022020..0.
070..022220..070
.0....0000....0.` ],
  [ beetleD, bitmap`
.0.....0......0.
0700..070...0070
.0..0..0..00..0.
...00000000.....
..077575757000..
.07777777775220.
.077777777752020
.055555555522220
.055555555522220
.077777777752020
.07777777775220.
..077575757000..
...00000000.....
.0..0..0..00..0.
0700..070...0070
.0.....0......0.` ],
  [ player, bitmap`
.......00.......
......0660......
......0660......
.....066660.....
.....066660.....
0000006666000000
0666666666666660
.06666066066660.
..066666666660..
...0606666060...
...0660000660...
...0666666660...
..066660066660..
.066660..066660.
.06660....06660.
.0000......0000.` ],
  [ cherry, bitmap`
................
..00000.........
..0DDDD000......
...000DDD00.....
.....0D0DD00....
....00D000D0....
....0D0..0D0....
....0D0..0000...
...0000.033330..
..0333303223330.
.03223330233330.
.03233330333330.
.03333330333330.
.0333333033330..
..033330.0000...
...0000.........` ],
  [ orange, bitmap`
................
.....00.........
.....0C0........
......0C000.....
......0C040.....
....00004000....
...0999009990...
...0929092990...
..099299099990..
..092999999990..
..099999999990..
..099999999990..
...0999999990...
...0999999990...
....00999900....
......0000......` ],
  [ lemon, bitmap`
.........000.00.
......0006660660
....00666F666660
...066216666660.
..061226666F6F60
..062666F6666660
.0662F6666666660
.0626666666F660.
.062F666F666660.
06666666666F660.
06F666F6666660..
0666F6666F6660..
.066666666660...
066666F66600....
0660666000......
.00.000.........` ],
  [ lime, bitmap`
.........000.00.
......0004440440
....00444D444440
...044214444440.
..041224444D4D40
..042444D4444440
.0442D4444444440
.0424444444D440.
.042D444D444440.
04444444444D440.
04D444D4444440..
0444D4444D4440..
.044444444440...
044444D44400....
0440444000......
.00.000.........` ],
  [ grass, bitmap`
444444D44DD444D4
4444D4D444D444D4
4D44D4D4444444D4
4D44D444444444D4
4D44444D4DD444D4
4D44D44D4D4444D4
4D44D4444D444444
44444444D4444D44
44444444D44D4D44
44D44D44D44D4D44
44D44DD4444D444D
4D4444D44444444D
4D4444D44D44D44D
4D44D4D44D44D444
4D44D4D44D44D444
444444444444D444` ],
  [ farmTL, bitmap`
................
....000.........
...02220........
..02C2C20..00000
..0CC2CC00033333
..0CC20033333333
..0CC03333333333
..0C033300000003
..0C03330FF2FF03
..00333302222203
..0033330FF2FF03
..00333302222203
..0333330FF2FF03
..03333300000003
..03333333333333
..03333330000000` ],
  [ farmTR, bitmap`
................
................
................
00000...........
33333000........
3333333300......
33333333330.....
300000003330....
30FF2FF03330....
3022222033330...
30FF2FF033330...
3022222033330...
30FF2FF0333330..
30000000333330..
33333333333330..
00000003333330..` ],
  [ farmBL, bitmap`
.0333333302FFF20
.0333333302FFF20
.033333330F2F2F0
.033333330F2F2F0
.033333330F2F2F0
.033333330FF2FF0
.033333330FF2FF0
.033333330FF2FF0
.033333330F2F2F0
.033333330F2F2F0
.033333330F2F2F0
.0333333302FFF20
.0333333302FFF20
0000000000000000
0LLLLLLLLLLLLLLL
0000000000000000` ],
  [ farmBR, bitmap`
02FFF2033333330.
02FFF2033333330.
0F2F2F033333330.
0F2F2F033333330.
0F2F2F033333330.
0FF2FF033333330.
0FF2FF033333330.
0FF2FF033333330.
0F2F2F033333330.
0F2F2F033333330.
0F2F2F033333330.
02FFF2033333330.
02FFF2033333330.
0000000000000000
LLLLLLLLLLLLLLL0
0000000000000000` ],
)

const level = map`
##########
##########
##########
####yu####
####hj####
##########
##########
##########`
//setBackground(grass);
setMap(level)

addSprite(5, 5, player)
// addSprite(2, 2, beetleW)
// addSprite(2, 2, beetleW)
// addSprite(2, 2, beetleW)
// addSprite(2, 2, beetleW)

onInput("w", () => {
  if(!gameOver)
  {
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if(!gameOver)
  {
    getFirst(player).x -= 1
  }
})
onInput("s", () => {
  if(!gameOver)
  {
    getFirst(player).y += 1
  }
})
onInput("d", () => {
  if(!gameOver)
  {
    getFirst(player).x += 1
  }
})
onInput("l", () => {
  if(!gameOver)
  {
    held = -1;
  }
  else
  {
    reset();
  }
})

function resetLegend(pType)
{
  setLegend(
  [ beetleW, bitmap`
.0....0000....0.
070..022220..070
.0..02022020..0.
.0..02222220..0.
..0.05522550.0..
..007775577700..
...0577557750...
.0.0777557770.0.
0700577557750070
.0.0777557770.0.
...0577557750...
..007775577700..
.0.0777557770.0.
.0..07755770..0.
070..000000..070
.0............0.` ],
  [ beetleA, bitmap`
.0......0.....0.
0700...070..0070
.0..00..0..0..0.
.....00000000...
..000757575770..
.02257777777770.
020257777777770.
022225555555550.
022225555555550.
020257777777770.
.02257777777770.
..000757575770..
.....00000000...
.0..00..0..0..0.
0700...070..0070
.0......0.....0.` ],
  [ beetleS, bitmap`
.0............0.
070..000000..070
.0..07755770..0.
.0.0777557770.0.
..007775577700..
...0577557750...
.0.0777557770.0.
0700577557750070
.0.0777557770.0.
...0577557750...
..007775577700..
..0.05522550.0..
.0..02222220..0.
.0..02022020..0.
070..022220..070
.0....0000....0.` ],
  [ beetleD, bitmap`
.0.....0......0.
0700..070...0070
.0..0..0..00..0.
...00000000.....
..077575757000..
.07777777775220.
.077777777752020
.055555555522220
.055555555522220
.077777777752020
.07777777775220.
..077575757000..
...00000000.....
.0..0..0..00..0.
0700..070...0070
.0.....0......0.` ],
  [ player, pType ],
  [ cherry, bitmap`
................
..00000.........
..0DDDD000......
...000DDD00.....
.....0D0DD00....
....00D000D0....
....0D0..0D0....
....0D0..0000...
...0000.033330..
..0333303223330.
.03223330233330.
.03233330333330.
.03333330333330.
.0333333033330..
..033330.0000...
...0000.........` ],
  [ orange, bitmap`
................
.....00.........
.....0C0........
......0C000.....
......0C040.....
....00004000....
...0999009990...
...0929092990...
..099299099990..
..092999999990..
..099999999990..
..099999999990..
...0999999990...
...0999999990...
....00999900....
......0000......` ],
  [ lemon, bitmap`
.........000.00.
......0006660660
....00666F666660
...066216666660.
..061226666F6F60
..062666F6666660
.0662F6666666660
.0626666666F660.
.062F666F666660.
06666666666F660.
06F666F6666660..
0666F6666F6660..
.066666666660...
066666F66600....
0660666000......
.00.000.........` ],
  [ lime, bitmap`
.........000.00.
......0004440440
....00444D444440
...044214444440.
..041224444D4D40
..042444D4444440
.0442D4444444440
.0424444444D440.
.042D444D444440.
04444444444D440.
04D444D4444440..
0444D4444D4440..
.044444444440...
044444D44400....
0440444000......
.00.000.........` ],
  [ grass, bitmap`
444444D44DD444D4
4444D4D444D444D4
4D44D4D4444444D4
4D44D444444444D4
4D44444D4DD444D4
4D44D44D4D4444D4
4D44D4444D444444
44444444D4444D44
44444444D44D4D44
44D44D44D44D4D44
44D44DD4444D444D
4D4444D44444444D
4D4444D44D44D44D
4D44D4D44D44D444
4D44D4D44D44D444
444444444444D444` ],
  [ farmTL, bitmap`
444D44444444D44D
444D00044D44D44D
444022204D44D444
D402C2C20D400000
D40CC2CC00033333
440CC20033333333
440CC03333333333
440C033300000003
4D0C03330FF2FF03
4D00333302222203
4D0033330FF2FF03
4D00333302222203
440333330FF2FF03
D403333300000003
D403333333333333
D403333330000000` ],
  [ farmTR, bitmap`
4D4444444D44444D
4D444D444D44444D
4D444D444D444D44
00000D444D4D4D44
333330004D4D4D4D
33333333004D444D
333333333304444D
3000000033304D4D
30FF2FF033304D44
3022222033330D44
30FF2FF033330D44
3022222033330D44
30FF2FF033333044
300000003333304D
333333333333304D
000000033333304D` ],
  [ farmBL, bitmap`
40333333302FFF20
40333333302FFF20
4033333330F2F2F0
4033333330F2F2F0
4033333330F2F2F0
4033333330FF2FF0
4033333330FF2FF0
D033333330FF2FF0
D033333330F2F2F0
D033333330F2F2F0
4033333330F2F2F0
40333333302FFF20
40333333302FFF20
0000000000000000
0LLLLLLLLLLLLLLL
0000000000000000` ],
  [ farmBR, bitmap`
02FFF20333333304
02FFF20333333304
0F2F2F0333333304
0F2F2F033333330D
0F2F2F033333330D
0FF2FF033333330D
0FF2FF033333330D
0FF2FF033333330D
0F2F2F0333333304
0F2F2F0333333304
0F2F2F0333333304
02FFF20333333304
02FFF20333333304
0000000000000000
LLLLLLLLLLLLLLL0
0000000000000000` ],
)
}

const melody = tune`
375: E4~375 + C5/375 + A5^375,
375: A4~375 + D5/375 + G5^375,
375: F4~375 + E5/375 + A5^375,
375: A4~375 + D5/375 + G5^375,
375: E4~375 + C5/375 + F5^375,
375: A4~375,
375: F4~375,
375: A4~375,
375: E4~375 + C5/375,
375: A4~375 + D5/375,
375: F4~375 + E5/375,
375: A4~375 + D5/375,
375: E4~375 + C5/375,
375: A4~375 + E5-375,
375: F4~375 + D5-375,
375: A4~375 + E5-375,
375: E4~375 + C5/375,
375: D5/375 + A4~375,
375: E5/375 + F4~375,
375: D5/375 + A4~375,
375: C5/375 + E4~375,
375: E5-375 + A4~375,
375: E5-375 + F4~375,
375: E5-375 + A4~375,
375: C5/375 + E4~375 + A5^375,
375: D5/375 + A4~375 + G5^375,
375: E5/375 + F4~375 + A5^375,
375: D5/375 + A4~375 + B5^375,
375: C5/375 + E4~375 + A5^375,
375: E5-375 + A4~375 + G5^375,
375: D5-375 + F4~375 + A5^375,
375: E5-375 + A4~375 + G5^375`
const menu = tune`
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250 + A4^250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250 + A4^250,
250: D4~250 + A4^250,
250: E4~250,
250: D4~250 + A4^250,
250: E4~250`
const scoreSound = tune`
125: A5/125,
125: B5^125 + A5-125,
3750`
const scoreSound1 = tune`
125: F5/125,
125: G5^125 + F5-125,
3750`
const scoreSound2 = tune`
125: D5/125,
125: E5^125 + D5-125,
3750`
const scoreSound3 = tune`
125: B4/125,
125: C5^125 + B4-125,
3750`
const die = tune`
250: A5/250 + C5/250,
250: B5-250 + A5^250 + C5^250 + D5-250,
250: G5/250 + B4/250,
250: A5-250 + G5^250 + B4^250 + C5-250,
250: F5/250 + A4/250,
6750`
let background = playTune(melody, Infinity)

let held = -1
let heldType = -1
let fruitSpawnTime = 0
let beetleTime = 0
let beetleSpawn = 0
let score = 0
let gameOver = false
let flash = 0;
let scores = new Array()
let difficulty = 15;

var gameLoop = setInterval(() => {
  clearText();
  scoreDissplay();
  flash--;
  if(flash < 0)
  {
    flash = 30
  }
  if(!gameOver)
  {
    spawnFruit();
    pickUp();
    hold();
    scoreFruit();
    bugHit();
    //addSprite(2, 2, beetleW)
    moveBugs();
    let scoreText = score + " "
    addText(scoreText, { x: 1, y: 0, color: color`0`, size: 2});
  }
  else
  {
    let scoreText = score + " "
    if(flash > 15)
    {
      addText(scoreText, { x: 1, y: 0, color: color`2`, size: 2});
      addText("gameOver", {y: 5, color: color`2`, size: 2});
      addText("press L to", {y: 10, color: color`2`, size: 2});
      addText("play again", {y: 11, color: color`2`, size: 2});
    }
    else
    {
      addText(scoreText, { x: 1, y: 0, color: color`0`, size: 2});
      addText("gameOver", {y: 5, color: color`0`, size: 2});
      addText("press L to", {y: 10, color: color`0`, size: 2});
      addText("play again", {y: 11, color: color`0`, size: 2});
    }
  }
}, 1);

function reset()
{
  for(let i = 0; i < 10; i++)
  {
    for(let j = 0; j < 8; j++)
    {
      clearTile(i, j);
    }
  }
  setMap(level);
  addSprite(5, 5, player);
  held = -1;
  heldType = -1;
  fruitSpawnTime = 0;
  beetleTime = 0;
  beetleSpawn = 0;
  score = 0;
  gameOver = false;
  flash = 0;
  scores = new Array();
  difficulty = 15;
  background.end();
  background = playTune(melody, Infinity)
}

function scoreDissplay()
{
  for(let i = 0; i < scores.length; i++)
  {
    let score = scores[i];
    score[1]--;
    if(score[1] <= 0)
    {
      scores.shift();
    }
    else 
    {
      if(flash > 15)
      {
        addText(score[0], {x: score[2], y: score[2], color: color`0`, size: 2});
      }
      else
      {
        addText(score[0], {x: score[2], y: score[2], color: color`2`, size: 2});
      }
    }
  }
}

function bugHit()
{
  let bugs = [getAll(beetleW), getAll(beetleA), getAll(beetleS), getAll(beetleD)];
  let p = getFirst(player);
  for(let j = 0; j < bugs.length; j++)
  {
    for(let i = 0; i < bugs[j].length; i++)
    {
      bug = bugs[j][i];
      if(bug.x == p.x && bug.y == p.y)
      {
        background.end();
        background = playTune(menu, Infinity)
        playTune(die);
        gameOver = true;
      }
    }
  }
}

function moveBugs()
{
  beetleTime--;
  if(beetleTime <= 0)
  {
    beetleTime = 60;
    beetleSpawn--;
    moveBeetle();
    if(beetleSpawn <= 0)
    {
      beetleSpawn = difficulty;
      if(difficulty > 5)
      {
        difficulty--;
      }
      addBeetle();
    }
  }
}

function addBeetle()
{
  //addSprite(Math.round(Math.random()) * 9, Math.floor(Math.random() * 8), beetleW)
  if(Math.random() > 0.5)
  {
    if(Math.random() > 0.5)
    {
      addSprite(0, Math.floor(Math.random() * 8), beetleD);
    }
    else
    {
      addSprite(9, Math.floor(Math.random() * 8), beetleA);
    }
  }
  else
  {
    if(Math.random() > 0.5)
    {
      addSprite(Math.floor(Math.random() * 10), 0, beetleS);
    }
    else
    {
      addSprite(Math.floor(Math.random() * 10), 7, beetleW);
    }
  }
}

function moveBeetle()
{
  let beetles = [getAll(beetleW), getAll(beetleA), getAll(beetleS), getAll(beetleD)]
  for (let j = 0; j < beetles.length; j++) 
  {
    for (let i = 0; i < beetles[j].length; i++) 
    {
      let beetle = beetles[j][i];
      let seed = Math.random();
      if(seed <= 0.5)
      {
        switch(j)
        {
          case(0):
            if(beetle.y > 0)
            {
              beetle.y -= 1;
            }
            else
            {
              beetle.remove();
            }
          break;
          case(1):
            if(beetle.x > 0)
            {
              beetle.x -= 1;
            }
            else
            {
              beetle.remove();
            }
          break;
          case(2):
            if(beetle.y < 7)
            {
              beetle.y += 1;
            }
            else
            {
              beetle.remove();
            }
          break;
          case(3):
            if(beetle.x < 9)
            {
              beetle.x += 1;
            }
            else
            {
              beetle.remove();
            }
          break;
        }
      }
      else
      {
        if(Math.random() >= 0.5)
        {
          switch(j)
          {
            case(0):
              beetle.type = "A"
            break;
            case(1):
              beetle.type = "S"
            break;
            case(2):
              beetle.type = "D"
            break;
            case(3):
              beetle.type = "W"
            break;
          }
        }
        else
        {
          switch(j)
          {
            case(0):
              beetle.type = "D"
            break;
            case(1):
              beetle.type = "W"
            break;
            case(2):
              beetle.type = "A"
            break;
            case(3):
              beetle.type = "S"
            break;
          }
        }
      }
    }
  }
}

function scoreFruit()
{
  let fruits = [getAll(cherry), getAll(orange), getAll(lemon), getAll(lime)]
  for (let j = 0; j < fruits.length; j++) 
  {
    for (let i = 0; i < fruits[j].length; i++) 
    {
      if(fruits[j][i].x > 3 && fruits[j][i].x < 6 && fruits[j][i].y > 2 && fruits[j][i].y < 5)
      {
        if(i == held && j == heldType)
        {
          held = -1;
        }
        let pScore = score;
        switch(j)
        {
            case(3):
            playTune(scoreSound);
            score += 500;
            case(2):
            playTune(scoreSound1);
            score += 300;
            case(1):
            playTune(scoreSound2);
            score += 100;
            case(0):
            playTune(scoreSound3);
            score += 100;
        }
        let scoreDiff = (score - pScore) + " ";
        scores.push([scoreDiff, 100, Math.floor(Math.random() * 3) + 7, Math.floor(Math.random() * 3) + 7]);
        fruits[j][i].remove();
      }
    }
  }
}

function spawnFruit()
{
  fruitSpawnTime--;
  if(fruitSpawnTime <= 0)
  {
    fruitSpawnTime = 200;
    let seed = Math.random()
    if(seed < 0.45)
    {
      addSprite(Math.floor(Math.random() * 10), Math.floor(Math.random() * 8), cherry);
    }
    if(seed > 0.45 && seed < 0.75)
    {
      addSprite(Math.floor(Math.random() * 10), Math.floor(Math.random() * 8), orange);
    }
    if(seed > 0.75 && seed < 0.90)
    {
      addSprite(Math.floor(Math.random() * 10), Math.floor(Math.random() * 8), lemon);
    }
    if(seed > 0.95)
    {
      addSprite(Math.floor(Math.random() * 10), Math.floor(Math.random() * 8), lime);
    }
  }
}

function hold()
{
  if(held >= 0)
  {
    resetLegend(playerHold)
    let fruits = [getAll(cherry), getAll(orange), getAll(lemon), getAll(lime)];
    let p = getFirst(player)
    let heldFruit = fruits[heldType][held];
    if(p.y < 1)
    {
      p.y = 1;
    }
    heldFruit.x = p.x;
    heldFruit.y = p.y - 1;
  }
  else
  {
    resetLegend(playerIdle)
  }
}

function pickUp()
{
  let fruits = [getAll(cherry), getAll(orange), getAll(lemon), getAll(lime)]
  let p = getFirst(player);
  for (let j = 0; j < fruits.length; j++) 
  {
    for (let i = 0; i < fruits[j].length; i++) 
    {
      if(fruits[j][i].x == p.x && fruits[j][i].y == p.y)
      {
        held = i;
        heldType = j;
      }
    }
  }
}

