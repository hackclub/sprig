/*
Greetings fellows programmers <3

@title: Temple Escape
@author: Andrea
@tags: [Arcade, Infinite, Hability, Demake, Action, Platform]
@addedOn: 2025-03-15
*/

const player_right = "q",
  player_left = "w",
  floor = "e",
  water_1 = "r",
  water_2 = "t",
  player_jump_1 = "y",
  player_jump_2 = "u",
  player_roll_1 = "i",
  player_roll_2 = "o",
  log_1 = "p",
  log_2 = "a",
  log_3 = "s",
  barrier = "d",
  score_board = "f",
  rocks = "g",
  black_screen = "h",
  jump = tune`
240.32042723631508,
40.053404539385845: C4^40.053404539385845,
40.053404539385845: E4^40.053404539385845,
40.053404539385845: G4^40.053404539385845,
40.053404539385845: B4^40.053404539385845,
40.053404539385845: D5^40.053404539385845,
640.8544726301735,
40.053404539385845: D5^40.053404539385845,
40.053404539385845: B4^40.053404539385845,
40.053404539385845: G4^40.053404539385845,
40.053404539385845: E4^40.053404539385845,
40.053404539385845: C4^40.053404539385845`,
  roll = tune`
240.32042723631508,
40.053404539385845: D5^40.053404539385845,
40.053404539385845: B4^40.053404539385845,
40.053404539385845: G4^40.053404539385845,
40.053404539385845: E4^40.053404539385845,
40.053404539385845: C4^40.053404539385845,
640.8544726301735,
40.053404539385845: C4^40.053404539385845,
40.053404539385845: E4^40.053404539385845,
40.053404539385845: G4^40.053404539385845,
40.053404539385845: B4^40.053404539385845,
40.053404539385845: D5^40.053404539385845`,
  left = tune`
43.604651162790695,
43.604651162790695: E4^43.604651162790695,
43.604651162790695: D4^43.604651162790695 + F4^43.604651162790695,
43.604651162790695: C4^43.604651162790695 + G4^43.604651162790695,
1220.9302325581396`,
  right = tune`
40.70556309362279,
40.70556309362279: C4^40.70556309362279 + G4^40.70556309362279,
40.70556309362279: D4^40.70556309362279 + F4^40.70556309362279,
40.70556309362279: E4^40.70556309362279,
1139.7557666214382`,
  click_sound = tune`
43.7956204379562: C4^43.7956204379562,
1357.6642335766423`,
  ping = tune`
42.07573632538569: C5/42.07573632538569,
42.07573632538569: E5/42.07573632538569,
42.07573632538569: G5/42.07573632538569,
42.07573632538569: B5-42.07573632538569,
1178.1206171107992`

let action = 0,
  time_till_running = 0,
  next_obst = 0,
  score = 0,
  max = 10,
  x = 4,
  water = false,
  click = 1,
  max_score = 0,
  mute = false,
  mult = 2,
  temp = 0,
  speed = 400,
  speed_type = "",
  move = true,
  last_obst

let rows = [0, 0, 0, 0, 0, 0];

setLegend(
  [player_right, bitmap`
........C.......
.....C.CCC.C....
.....CC222CC....
.....CCCCCCC....
.......888......
....99CCCCC999..
...99CCCCCCC999.
..999CCCCCCC999.
..999CCCCCCC..2.
..99.CCCCCCC....
..88..99999.....
..8..LLLLLLL....
.....LLLLLLL....
......CCLLL.....
......CC.LL.....
.........LL.....`],
  [player_left, bitmap`
........C.......
.....C.CCC.C....
.....CC222CC....
.....CCCCCCC....
.......888......
...999CCCCC99...
..999CCCCCCC99..
..999CCCCCCC999.
.....CCCCCCC999.
.....CCCCCCC199.
......99999..88.
.....LLLLLLL..8.
.....LLLLLLL....
......LLLCC.....
......LL.CC.....
......LL........`],
  [player_jump_1, bitmap`
................
....99CCCCC99...
...99CCCCCCC99..
...99CCCCCCC99..
...99CCCCCCC99..
....9CCCCCCC9...
......CCCCC.....
................
................
................
................
................
................
................
................
................`],
  [player_jump_2, bitmap`
................
......CCCCC.....
....9CCCCCCC9...
...99CCCCCCC99..
...99CCCCCCC99..
..299CCCCCCC99..
....99CCCCC99...
................
................
.......2........
................
................
................
................
................
................`],
  [player_roll_1, bitmap`
................
................
................
.........2......
................
................
................
................
..............2.
....99CCCCC99...
...99CCCCCCC99..
...99CCCCCCC99..
...99CCCCCCC99..
....9CCCCCCC9...
......CCCCC.....
................`],
  [player_roll_2, bitmap`
................
................
................
................
................
................
................
................
................
......CCCCC.....
....9CCCCCCC9...
...99CCCCCCC99..
...99CCCCCCC99..
...99CCCCCCC99..
....99CCCCC99...
................`],
  [floor, bitmap`
0000000000000000
00F6166116F61100
0F6666F116F621F0
0F6662F662F6F160
066F62F62F666660
062F6F16F666F610
01F66112F611F120
01F6616F661F6120
0166F66661166F20
0662F662626611F0
066F662F6F666FF0
062F61F666616620
06F61166F61162F0
06612662611F6F60
006FF622612F6600
0000000000000000`],
  [water_1, bitmap`
7755577777775577
7777777722577777
7225777755757777
2557557777777777
7777777722555777
7777227255772557
7722557777777777
7555775577777777
7777777777222557
7777777722555775
7257777777777777
2575577777775577
7777777222557757
7777772555777777
2277777777777222
5522277777772555`],
  [water_2, bitmap`
5775577777777777
7777777772255777
7722577725577557
7255755777777777
7777777722777227
2527777255722557
5755577777255775
7777777777777777
7772277777725577
7225577772257757
2257755577777777
7777777777777777
7225577777222777
5557755722555227
7777777755777555
2557777777777777`],
  [log_1, bitmap`
0000000000000000
09999999CCCC9999
09CCCC9999999999
09999999999CCCC9
0999CCCCC9999999
0CC9999999999CCC
0000000000000000
0L11016F661F6120
0L11066661166F20
0L110662626611F0
01L1062F6F666FF0
0L1061F666616620
0L101166F61162F0
01L10662611F6F60
01L10622612F6600
0000000000000000`],
  [log_2, bitmap`
0000000000000000
99CCC9999999CC99
999999CCCCC99999
9CCCC99999999CCC
999999999CCC9999
CC999CCC9999999C
0000000000000000
01F6616F661F6120
0166F66661166F20
0662F662626611F0
066F662F6F666FF0
062F61F666616620
06F61166F61162F0
06612662611F6F60
006FF622612F6600
0000000000000000`],
  [log_3, bitmap`
0000000000000000
999CCCC999999CC0
99999999CCC99990
CC9999999999CCC0
999999CC99999990
CCCCC99999CCCC90
0000000000000000
01F6616F661011L0
0166F66661101L10
0662F66262660110
066F662F6F660110
062F61F666610L10
06F61166F61011L0
0661266261101110
006FF62261201110
0000000000000000`],
  [barrier, bitmap`
0000000000000000
06666F06666F06F0
0FFFFF0FFFFF0FF0
0000000000000000
06F06666F06666F0
0FF0FFFFF0FFFFF0
0000000000000000
06666F06666F06F0
0FFFFF0FFFFF0FF0
0000000000000000
06F06666F06666F0
0FF0FFFFF0FFFFF0
0000000000000000
06666F06666F06F0
0FFFFF0FFFFF0FF0
0000000000000000`],
  [score_board, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCC000CCCCCC
000CCCCCCCCCC000
CCCC000CCCCCCCCC
CCCCCCCCCC00000C
C00000CCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC0000CCCC
0000CCCCCCCCCCC0
CCCCCCCCCCCCCCCC
CCCCC00000000CCC
CCCCCCCCCCCCCC00
000CCCCCCCCCCCCC
CCCCCC000CCCCCCC
CCC00CCCCCC000CC
CCCCCCCCCCCCCCCC`],
  [rocks, bitmap`
0000000000000000
00F6166116F61100
0F6666F116F621F0
0F6662F662F6F160
066F62F62F666660
062F6F16F666F610
01F66112F611F120
01F6616F661F6120
0000F66000166000
LLL0000LLL000LL0
1L01LL011L011L0L
1L011LL010L01L01
L01111L001L00011
L01111L0111L0111
L01111L01111L011
0000000000000000`],
  [black_screen, bitmap`
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
)

const field = map`
fffffffff
.........
.........
.........
.........
.........
.........`

setSolids(
  [
    player_right,
    player_left,
    player_jump_1,
    player_jump_2,
    player_roll_1,
    player_roll_2,
    log_1,
    log_2,
    log_3
  ]
)

onInput("w", () => {
  if (click == 0) {
    if (time_till_running < 0) {
      action = 2
      time_till_running = 2
      if (!mute)
        playTune(jump);
    } 
    else return
  }
})
onInput("a", () => {
  if (click == 0) {
    action = 0
    time_till_running = 0
    x -= 1
    if (x < 3)
      x = 3
    if (!mute)
      playTune(left);
    generatePlayer();
  }
})
onInput("s", () => {
  if (click == 0) {
    if (time_till_running < 0) {
      action = 3
      time_till_running = 2
      if (!mute)
        playTune(roll);
    }
    else return
  }
})
onInput("d", () => {
  if (click == 0) {
    time_till_running = 0
    action = 1
    x += 1
    if (x > 5)
      x = 5
    if (!mute)
      playTune(right);
    generatePlayer();
  }
})
onInput("j", () => {
  if (!mute)
    playTune(click_sound);
  if (click == 1) {
    click = 0
    score = 0
    speed = 400
    rows = [0, 0, 0, 0, 0, 0]
    next_obstacle = 3
    loop();
  }
})
onInput("i", () => {
  if (!mute)
    playTune(click_sound);
  mute = !mute
})

setMap(field);
createMap();
intro();
function intro() {
  if (temp < 7) {
    for (let row = 0; row < 9; row++) {
      clearTile(row, temp);
      addSprite(row, temp, score_board);
      clearText();
      if (temp >= 1)
          addText("TEMPLE ESCAPE", { y: 1, color: color`4` });
      if (temp >= 2)
        addText("MAX: " + max_score, {y: 3, color: color`2` });
      if (temp >= 3) {
        addText("'J' = START", {y: 6, color: color`2` });
        addText("'I' = MUTE", {y: 8, color: color`2` });
      }
      if (temp >= 4)
        addText("(W)   :  JUMP", {x: 4, y: 10, color: color`6` });
      if (temp >= 5)
        addText("(A) (D) : LH  RH", {x: 2, y: 12, color: color`6` });
      if (temp >= 6)
        addText("(S)   :  ROLL", {x: 4, y: 14, color: color`6` });
    }
    temp += 1
  } else return
  if (!checkDeath(rows[5]))
    setTimeout(intro, 75);
  else
    intro();
}

function createMap() {
  for (let heig = 1; heig < height(); heig++) {
    clearTile(2, heig);
    addSprite(2, heig, barrier);
    clearTile(6, heig);
    addSprite(6, heig, barrier);
    for (let row = 3; row < 6; row++)
      clearTile(row, heig);
    generateRow(heig, rows[heig - 1]);
    generateWater()
  }
}

function loop() {
  last_obst = rows[5]
  if (checkDeath(last_obst)) {
    temp = 6
    if (score > max_score)
      max_score = score
    click = 1
    youDied();
  }
  else {
    nextObstacle();
    createMap();
    generatePlayer();
    generateWater();
  
    score += 1
    if (speed > 150)
      speed -= 1
    if (score % 100 == 0) {
      next_obst = 5
      playTune(ping);
    }
      
    clearText();
    addText("SCORE: " + score, {x:1, y: 1, color: color`2` });
  
    if (speed > 350)
      addText("SLOW", {x:12, y: 1, color: color`4` });
    else if (speed > 275)
      addText("MEDIUM", {x:12, y: 1, color: color`6` });
    else if (speed > 150)
      addText("FAST", {x:12, y: 1, color: color`3` });
    else if (speed == 150)
      addText("FASTEST", {x:12, y: 1, color: color`8` });
  
    time_till_running -= 1  
    if (checkDeath(rows[5])) {
      temp = 0
      if (score > max_score)
        max_score = score
      click = 1
      youDied();
    } 
    else
      setTimeout(loop, speed);
  }
}

function generatePlayer() {
  createMap();
  switch (action) {
    case 0: {
      action = 1;
      addSprite(x, 6, player_left);
      break;
    }
    case 1: {
      action = 0;
      addSprite(x, 6, player_right);
      break;
    }
    case 2: {
      if (time_till_running % 2 == 0)
        addSprite(x, 6, player_jump_1);
      else
        addSprite(x, 6, player_jump_2);
      if (time_till_running == 0) {
        action = 0
        generatePlayer();
      }
      break;
    }
    case 3: {
      if (time_till_running % 2 == 0)
        addSprite(x, 6, player_roll_1);
      else
        addSprite(x, 6, player_roll_2);
      if (time_till_running == 0) {
        action = 0
        generatePlayer();
      }
      break;
    }
  }
}

function generateWater() {
  for (let heig = 1; heig < 7; heig++)
    for (let row = 0; row < 9; row++) {
      if (row > 2 && row < 6) {
        if (getTile(row, heig) == 0) {
          clearTile(row, heig);
          if (water)
            addSprite(row, heig, water_1);
          else
            addSprite(row, heig, water_2);
        }
      } else if (row < 2 || row > 6) {
        clearTile(row, heig);
        if (water)
          addSprite(row, heig, water_1);
        else
          addSprite(row, heig, water_2);
      }
    }
  water = !water
}

function generateRow(y, type) {
  switch (type) {
    case 0: {
      for (let row = 3; row < 6; row++) {
        addSprite(row, y, floor);
      }
      break;
    }
    case 1: {
      addSprite(3, y, log_1);
      addSprite(4, y, log_2);
      addSprite(5, y, log_3);
      break;
    }
    case 2: {
      for (let row = 3; row < 6; row++) {
        addSprite(row, y, rocks);
      }
      break;
    }
    case 4: {
      addSprite(4, y, floor);
      addSprite(5, y, floor);
      break;
    }
    case 5: {
      addSprite(3, y, floor);
      addSprite(5, y, floor);
      break;
    }
    case 6: {
      addSprite(3, y, floor);
      addSprite(4, y, floor);
      break;
    }
    case 7: {
      addSprite(3, y, floor);
      break;
    }
    case 8: {
      addSprite(4, y, floor);
      break;
    }
    case 9: {
      addSprite(5, y, floor);
      break;
    }
  }
}

function nextObstacle() {
  for (let i = 4; i >= 0; i--)
    rows[i + 1] = rows[i]

  if (mult == 0) {
    if (next_obst < 0) {
      let casual = Math.random()
      if (casual < 0.15)
        rows[0] = 1
      else if (casual < 0.3)
        rows[0] = 2
      else if (casual < 0.4)
        rows[0] = 3
      else if (casual < 0.5)
        rows[0] = 4
      else if (casual < 0.6)
        rows[0] = 5
      else if (casual < 0.7)
        rows[0] = 6
      else if (casual < 0.8)
        rows[0] = 7
      else if (casual < 0.9)
        rows[0] = 8
      else if (casual <= 1)
        rows[0] = 9
      if (casual >= 0.4)
        mult = 2
      next_obst = 3
    }
    else
      rows[0] = 0
    next_obst -= 1
  } 
  else {
    rows[0] = rows[1]
    mult -= 1
  }
}

function checkDeath(obs) {
  switch (action) {
    case 0: {
      if (obs == 1 ||
          obs == 2 ||
          obs == 3 ||
          obs == 4 && x == 3 ||
          obs == 5 && x == 4 ||
          obs == 6 && x == 5 ||
          obs == 7 && x != 3 ||
          obs == 8 && x != 4 ||
          obs == 9 && x != 5)
        return true
      return false;
    }
    case 1: {
      if (obs == 1 ||
          obs == 2 ||
          obs == 3 ||
          obs == 4 && x == 3 ||
          obs == 5 && x == 4 ||
          obs == 6 && x == 5 ||
          obs == 7 && x != 3 ||
          obs == 8 && x != 4 ||
          obs == 9 && x != 5)
        return true
      return false;
    }
    case 2: {
      if (obs == 1)
        return true
      return false
    }
    case 3: {
      if (obs == 2 ||
          obs == 3 ||
          obs == 4 && x == 3 ||
          obs == 5 && x == 4 ||
          obs == 6 && x == 5 ||
          obs == 7 && x != 3 ||
          obs == 8 && x != 4 ||
          obs == 9 && x != 5)
        return true
      return false
    }
  }
}

function youDied() {
  if (temp < 7) {
    for (let row = 0; row < 9; row++) {
      clearTile(row, temp);
      addSprite(row, temp, black_screen);
    }
    temp += 1
    setTimeout(youDied, 50);
    clearText();
    addText("YOU LOSE!", {y:7, color: color`3` });
  } 
  else {
    temp = 0
    setTimeout(intro, 1500);
  }
}