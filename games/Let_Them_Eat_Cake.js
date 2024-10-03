/*
@title: Let_Them_Eat_Cake
@author: Xander Reyes
@tags: ['puzzle']
@addedOn: 2023-01-10
*/


const player = "p";
const goal = "g";
const wall = "w";
const cake = "c";
const goal_happy = "f";
const door = "d";
const background = "b";
const stone = "s";
const crate = "r";


let win = 0;

const win_tune = tune`
125: c4/125,
125: g4/125,
125: d5/125,
3625`
const input_up_tune = tune`
166.66666666666666: f5^166.66666666666666,
5166.666666666666`
const input_down_tune = tune `
166.66666666666666: f4^166.66666666666666,
5166.666666666666`
const input_left_tune = tune `
166.66666666666666: a4^166.66666666666666,
5166.666666666666`
const input_right_tune = tune `
166.66666666666666: d5^166.66666666666666,
5166.666666666666`
const door_tune = tune `
202.7027027027027: c4/202.7027027027027 + e4/202.7027027027027 + g4/202.7027027027027 + c5/202.7027027027027,
6283.783783783784`
const background_tune = tune `
250: e5~250,
250: e5~250,
250: f5~250,
250,
250: e5~250,
250,
250: a5~250,
250,
250: g5~250,
750,
250: e5~250,
250: e5~250,
250: f5~250,
250,
250: e5~250,
250,
250: a5~250,
250,
250: g5~250,
2750`

setLegend([player, bitmap`
................
.....000000.....
...0066666600...
..066666666660..
..066666666660..
.06660666606660.
.06666666666660.
.06666666666660.
.06666666666660.
.06606666660660.
.06660000006660.
..066666666660..
..066666666660..
...0066666600...
.....000000.....
................`],
          [goal,bitmap`
................
....00000000....
...0077777700...
..077777777770..
.00777777777700.
.07770777707770.
.07777777777770.
.07777777777770.
.07777777777770.
.07770000007770.
.07707777770770.
.00777777777700.
..077777777770..
...0077777700...
....00000000....
................`],
         [cake, bitmap `
................
...9..9..9..9...
...0..0..0..0...
..000000000000..
..023222222240..
..022722223220..
..022222222220..
.00000000000000.
.02222223222270.
.02322422223220.
.02222222222220.
0000000000000000
0272222232222220
0223222222272320
0222223222222220
0000000000000000`],
         [wall, bitmap `
0000000000000000
0333333303333330
0333333303333330
0000000000000000
0333303333303330
0333303333303330
0000000000000000
0333333033333330
0333333033333330
0000000000000000
0333303333303330
0333303333303330
0000000000000000
0333333330333330
0333333330333330
0000000000000000`],
         [goal_happy, bitmap `
................
....00000000....
...0077777700...
..077777777770..
.00777777777700.
.07770777707770.
.07777777777770.
.07777777777770.
.07477377477370.
.02707727770720.
.07370000007270.
.00747773347300.
..077727337770..
...0077777700...
....00000000....
................`],
         [door, bitmap `
................
....00000000....
...00LLLLLL00...
..0LL111111LL0..
.00L11111111L00.
.0L1111111111L0.
.0L1111111111L0.
.0L1111111111L0.
.0L1111111111L0.
.0L1111111111L0.
.0L1111111111L0.
.00L11111111L00.
..0LL111111LL0..
...00LLLLLL00...
....00000000....
................`],
          [stone, bitmap `
0000000000000000
011LLL011LL01LL0
0111LL0111L011L0
0000000000000000
01LL011LL01LLLL0
011L0111L0111LL0
0000000000000000
0LL01LL01LL01LL0
01L011L011L011L0
0000000000000000
01LLL01LLL01LLL0
011LL011LL011LL0
0000000000000000
0LL01LLL01LL0LL0
01L011LL011L01L0
0000000000000000`],
         [background, bitmap `
0000000000000000
0CL0CL0CL0CL0CL0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CL0CL0CL0CL0CL0
0000000000000000`],
         [crate, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CLLLLLLLLLLLLC0
0CL1111111111LC0
0CL1333333331LC0
0CL1399999931LC0
0CL1396666931LC0
0CL1396666931LC0
0CL1396666931LC0
0CL1396666931LC0
0CL1399999931LC0
0CL1333333331LC0
0CL1111111111LC0
0CLLLLLLLLLLLLC0
0CCCCCCCCCCCCCC0
0000000000000000`]);

let level = 0;
const levels = [ map`
wwwwwwwwww
w........w
w........w
w........w
w........w
wp......dw
w........w
w........w
w........w
wwwwwwwwww`
                ,map`
wwwww
p.c.g
wwwww`
                ,map`
pww..
.w.c.
.w.w.
...wg
wwwww`
                ,map`
wwwwww
w...gw
w.wc.w
w....w
wp..ww
wwwwww`
                ,map`
wwwwwww
wg....w
www.w.w
w.....w
w.c.w.w
w...wpw
wwwwwww`
                ,map`
wwwwwwww
wp.w...w
w..w.c.w
w..w...w
ww.ww.ww
w......w
wg.....w
wwwwwwww`
                ,map`
sssssssss
sp..s.r.s
s.....c.s
s.......s
s...sssss
s.......s
s.......s
s...s..gs
sssssssss`
                ,map`
ssssssssss
s....s...s
s......c.s
s....s...s
s....s...s
ss.sssssss
s....s...s
s.g..r.p.s
s....s...s
ssssssssss`
                ,map`
sssssssssss
s...s.....s
s.p.r..rc.s
s...s.....s
ssrssssssss
s...s.....s
s...s...g.s
s.r.s.....s
s...r.....s
s...s.....s
sssssssssss`
                ,map`
ssssssssss.s
sps........s
srsrcsssss.s
s.s..s...s.s
s.s..s.g.s.s
s.s..s...s.s
s.s..r...s.s
s.s..s...s.s
s.s..s...srs
s.ssssssss.s
s.r.........
s.ssssssssss`
                ,map`
sssssssssssss
s...r...r...s
s...r...r.p.s
s...r...r...s
srrrrrrrrrrrs
s...r...r...s
s...r.c.r...s
s...r...r...s
srrrrrrrrrrrs
s...r...r...s
s.g.r...r...s
s...r...r...s
sssssssssssss`
                ,map`
sssssssssssss
s...........s
s...........s
s...........s
s...........s
s...........s
s...........s
s...........s
sssssssssssss`];

setMap(levels[level]);

setSolids([player, wall,cake,goal_happy,stone,crate]);

setPushables({
    [player]: [cake,crate],
});

// Input Manager

onInput("w", () => {
    getFirst(player).y -= 1;
    playTune(input_up_tune)
    
});

onInput("s", () => {
    getFirst(player).y += 1;
    playTune(input_down_tune)
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(input_left_tune)
});

onInput("d", () => {
    getFirst(player).x += 1;
    playTune(input_right_tune)
});

onInput("j", () => {
    setMap(levels[level]);
});


// After Input Events

afterInput(() => {

// Cakes Completed
  
  if (tilesWith(goal,cake).length > 0 && win == 0) {
    playTune(win_tune)
    win = 1;
    
    if (level == 1) {
      clearTile(4, 1)
      addSprite(4, 1, goal_happy)
      addSprite(0, 1, door)
      
    }
      
    else if (level == 2) {
      clearTile(4, 3)
      addSprite(4, 3, goal_happy)
      addSprite(0, 0, door)
      
    }

    else if (level == 3) {
      clearTile(4, 1)
      addSprite(4, 1, goal_happy)
      addSprite(1, 4, door)
      
    }

    else if (level == 4) {
      clearTile(1, 1)
      addSprite(1, 1, goal_happy)
      addSprite(1, 5, door)
      
    }

    else if (level == 5) {
      clearTile(1, 6)
      addSprite(1, 6, goal_happy)
      addSprite(1, 1, door)
      
    }

    else if (level == 6) {
      clearTile(7, 7)
      addSprite(7, 7, goal_happy)
      addSprite(1, 1, door)
      
    }

    else if (level == 7) {
      clearTile(2, 7)
      addSprite(2, 7, goal_happy)
      addSprite(7, 7, door)
      
    }

    else if (level == 8) {
      clearTile(8, 6)
      addSprite(8, 6, goal_happy)
      addSprite(2, 2, door)
      
    }

    else if (level == 9) {
      clearTile(7, 4)
      addSprite(7, 4, goal_happy)
      addSprite(1, 1, door)
      
    }

    else if (level == 10) {
      clearTile(2, 10)
      addSprite(2, 10, goal_happy)
      addSprite(10, 2, door)
      
    }
    
  }

// Door Event 
    
  else if (tilesWith(player,door).length > 0) {
    level += 1
    win = 0
    setMap(levels[level]);
    playTune(door_tune)
    clearText()

    if (level > 10){
      addText("Game Completed", { 
      x: 3,
      y: 4,
      color: color`4`
    })
      addText("Created by Xander", { 
      x: 2,
      y: 6,
      color: color`4`
    })
      addText("Dev Time: 10am", { 
      x: 3,
      y: 8,
      color: color`4`
    })

      addText("2:26pm", { 
      x: 7,
      y: 10,
      color: color`4`
    })
      
    }
    
  }
})


// Main Menu

setBackground(background)

playTune(background_tune, Infinity);
addText("Let Them Eat", { 
  x: 4,
  y: 4,
  color: color`2`
})
addText("Cake", { 
  x: 8,
  y: 6,
  color: color`2`
})

addText("Press J to", { 
  x: 5,
  y: 10,
  color: color`2`
})

addText("Restart", { 
  x: 7,
  y: 12,
  color: color`2`
})







