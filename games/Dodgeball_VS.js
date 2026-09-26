/*
@title: Dodgeball
@description: 2-player dodgeball! d/j to throw, a/l to catch
@author: Sjpark01
@tags: ['2-player', 'PvP']
@addedOn: 2025-08-13

I was going to have bgm, but 
1. it was too loud and 
2. the tune editor broke on me
*/
const floor = "f";
const line = "|";

const left_player = "l";
const right_player = "r";

let left_health = 3;
let right_health = 3;

const ball = "b";
let ball_state = Math.round(Math.random());
let caught = 0;
let win_text_timer = 0;

setLegend(
  [floor, bitmap`
1111111112111111
1111111112111111
1111111112111111
2222222222222222
1111121111111111
1111121111111111
1111121111111111
2222222222222222
1111111111121111
1111111111121111
1111111111121111
2222222222222222
1121111111111111
1121111111111111
1121111111111111
2222222222222222`],
  [left_player, bitmap`
................
......33333.....
.....3393333....
.....3339333....
.....3333C33....
.....3333C33...3
.....3333333...3
.....3333399..33
.....333333333.3
.....3333333..3.
.....333333333..
......33333.....
.......3..3.....
.......3..3.....
......3..3......
......33.33.....`],
  [right_player, bitmap`
................
.....55555......
....5555755.....
....5557555.....
....5505555.....
....5505555.....
5...5555555.....
55..7755555.....
5.555555555.....
55..5555555.....
..555555555.....
.....55555......
.....5..5.......
.....5..5.......
......5..5......
.....55.55......`],
  [ball, bitmap`
................
....99999999....
...9999999999...
..999999999999..
.99993333339999.
.99933333333999.
.99933333333999.
.99933399333999.
.99933399333999.
.99933333333999.
.99933333333999.
.99993333339999.
..999999999999..
...9999999999...
....99999999....
................`],
  [line, bitmap`
1111111442111111
1111111442111111
1111111442111111
2222222442222222
1111121441111111
1111121441111111
1111121441111111
2222222442222222
1111111441121111
1111111441121111
1111111441121111
2222222442222222
1121111441111111
1121111441111111
1121111441111111
2222222442222222`],
);

setMap(map`
....|....
....|....
....|....
.lb.|..r.
....|....
....|....
....|....`);
setBackground(floor);

const hit_sound = tune`
208.33333333333334: C4/208.33333333333334 + D4/208.33333333333334,
6458.333333333334`;
const catch_sound = tune`
78.3289817232376: G5~78.3289817232376 + C5^78.3289817232376 + G4-78.3289817232376 + D4/78.3289817232376,
78.3289817232376: A4-78.3289817232376 + F4/78.3289817232376 + C5^78.3289817232376 + A5~78.3289817232376 + F5~78.3289817232376,
78.3289817232376: C5/78.3289817232376 + G4-78.3289817232376 + E5^78.3289817232376,
2271.5404699738906`;
const throw_sound = tune`
54.054054054054056: E5^54.054054054054056 + F5^54.054054054054056,
54.054054054054056: F5^54.054054054054056 + G5^54.054054054054056,
1621.6216216216217`;
const win_sound = tune`
187.5: G4^187.5 + C5~187.5 + C4-187.5 + B4/187.5,
187.5: C4-187.5 + F4^187.5 + E5~187.5 + C5/187.5,
187.5: G4-187.5 + E4^187.5 + G5~187.5 + C5/187.5,
187.5: C4-187.5 + F4^187.5 + E5~187.5 + B4/187.5,
187.5: C4-187.5 + G4^187.5 + E5~187.5 + C5/187.5,
5062.5`;
const bgm = tune`
234.375: C4-234.375 + C5/234.375 + E5/234.375 + G4/234.375,
234.375,
234.375: C5/234.375 + C4-234.375 + F4^234.375,
234.375: G4^234.375,
234.375: C4-234.375 + G5~234.375 + F4^234.375,
234.375: C5/234.375 + A5~234.375,
234.375: C5/234.375 + C4-234.375 + E4^234.375,
234.375: C4-234.375 + F4^234.375,
234.375: A4/234.375 + E4^234.375 + C5/234.375 + E5/234.375,
234.375: D4-234.375 + F4^234.375,
234.375: A4/234.375 + E4^234.375,
234.375: D4-234.375,
234.375: F5~234.375 + D4^234.375,
234.375: A4/234.375 + D4-234.375 + G5~234.375 + C4^234.375,
234.375: A4/234.375 + F5~234.375 + D4^234.375,
234.375: D4-234.375 + G5~234.375 + E4^234.375,
234.375: F4/234.375 + D4-234.375 + A4/234.375,
234.375: E4^234.375,
234.375: F4/234.375 + C4-234.375 + C5~234.375 + D4^234.375,
234.375: D4-234.375 + D5~234.375 + F4^234.375,
234.375: E4^234.375,
234.375: F4/234.375 + D5~234.375,
234.375: F4/234.375 + C4-234.375 + E5~234.375,
234.375: D4-234.375 + G4^234.375,
234.375: G4/234.375 + A4^234.375 + E4/234.375 + B4/234.375,
234.375: E5~234.375 + B4^234.375,
234.375: G4/234.375 + F5~234.375,
234.375: D4-234.375 + G5~234.375 + D5^234.375,
234.375: D4-234.375 + A5~234.375 + A4^234.375,
234.375: G4/234.375 + G5~234.375,
234.375: G4/234.375 + C4-234.375 + F5~234.375 + C5^234.375,
234.375: C4-234.375 + G5~234.375 + C5^234.375`;

//let play_bgm = playTune(bgm, Infinity);

if (ball_state == 0) {
  getFirst(ball).x = 2;
} else if (ball_state == 1) {
  getFirst(ball).x = 6;
}

onInput("w", () => {
  getFirst(left_player).y -= 1;
});
onInput("s", () => {
  getFirst(left_player).y += 1;
});
onInput("d", () => {
  if (ball_state == 0) {
    playTune(throw_sound);
    ball_state = 2;
  }
});
onInput("a", () => {
  if (getFirst(ball).x == 3) {
    caught = 1;
  }
});

onInput("i", () => {
  getFirst(right_player).y -= 1;
});
onInput("k", () => {
  getFirst(right_player).y += 1;
});
onInput("j", () => {
  if (ball_state == 1) {
    playTune(throw_sound);
    ball_state = 3;
  }
});
onInput("l", () => {
  if (getFirst(ball).x == 5) {
    caught = 1;
  }
});


setInterval(() => {
  ball_state = state_transition(ball_state);
}, 50);
setInterval(() => {
  if (performance.now() - win_text_timer > 2500) {
    clearText();
  }
  handle_state(ball_state);
  addText("HP: " + left_health.toString(), {
    x: 1,
    y: 1,
    color: color`3`
  });
  addText("HP: " + right_health.toString(), {
    x: 14,
    y: 1,
    color: color`5`
  });
  if (left_health == 0) {
    win_text_timer = performance.now();
    //play_bgm.end();
    playTune(win_sound);
    addText("Blue Wins!", {
      x: 6,
      y: 5,
      color: color`5`
    });
    left_health = 3;
    right_health = 3;
    ball_state = Math.round(Math.random());
    if (ball_state == 0) {
      getFirst(ball).x = 2;
    } else if (ball_state == 1) {
      getFirst(ball).x = 6;
    }
  }
  if (right_health == 0) {
    win_text_timer = performance.now();
    //play_bgm.end();
    playTune(win_sound);
    addText("Red Wins!", {
      x: 6,
      y: 5,
      color: color`3`
    });
    left_health = 3;
    right_health = 3;
    ball_state = Math.round(Math.random());
    if (ball_state == 0) {
      getFirst(ball).x = 2;
    } else if (ball_state == 1) {
      getFirst(ball).x = 6;
    }
  }
}, 10);

function handle_state(ball_state) {
  switch (ball_state) {
    case 0: //held left
      getFirst(ball).y = getFirst(left_player).y;
      break;
    case 1: //held right
      getFirst(ball).y = getFirst(right_player).y;
      break;
    case 2: //thrown from left
      getFirst(ball).y = getFirst(left_player).y;
      break;
    case 3: //thrown from right
      getFirst(ball).y = getFirst(right_player).y;
      break;
    case 4: //left successful hit
      break;
    case 5: //right successful hit
      break;
  }
}

function state_transition(state) {
  switch (state) {
    case 2:
      if (getFirst(ball).x == 8) {
        getFirst(ball).x = 6;
        caught = 0;
        return 1;
      } else if (tilesWith(ball, right_player).length == 1) {
        if (caught == 1) {
          getFirst(ball).x = 6;
          left_health -= 1;
          playTune(catch_sound);
          caught = 0;
          return 1;
        } else {
          caught = 0;
          playTune(hit_sound);
          return 4;
        }
      } else {
        getFirst(ball).x += 1;
      }
      break;
    case 3:
      if (getFirst(ball).x == 0) {
        getFirst(ball).x = 2;
        caught = 0;
        return 0;
      } else if (tilesWith(ball, left_player).length == 1) {
        if (caught == 1) {
          getFirst(ball).x = 2;
          right_health -= 1;
          playTune(catch_sound);
          caught = 0;
          return 0;
        } else {
          caught = 0;
          playTune(hit_sound);
          return 5;
        }
      } else {
        getFirst(ball).x -= 1;
      }
      break;
    case 4:
      right_health -= 1;
      getFirst(ball).x = 6;
      return 1;
    case 5:
      left_health -= 1;
      getFirst(ball).x = 2;
      return 0;
  }
  return state;
}