/*
@title: Zooter
@author: PerrinPerson
@tags: ['action']
@addedOn: 2022-10-21
*/

const player = "p";
const line = "l";
const enemy = "e";
const proj = "o";
const bg = "b";
const gear = tune `
60.120240480961925,
60.120240480961925: e5-60.120240480961925 + d5^60.120240480961925,
60.120240480961925: e5^60.120240480961925 + d5/60.120240480961925,
60.120240480961925: e5/60.120240480961925 + d5-60.120240480961925,
1683.366733466934`;
const shoot = tune `
40.48582995951417: b5~40.48582995951417 + a5~40.48582995951417 + g5~40.48582995951417 + f5~40.48582995951417 + e5~40.48582995951417,
40.48582995951417: e5~40.48582995951417 + b5~40.48582995951417 + f5^40.48582995951417 + g5^40.48582995951417 + a5^40.48582995951417,
40.48582995951417: b5~40.48582995951417 + a5~40.48582995951417 + g5~40.48582995951417 + f5~40.48582995951417 + e5~40.48582995951417,
1174.089068825911`;
const die = tune `
40.48582995951417: d4^40.48582995951417 + c4-40.48582995951417 + e4^40.48582995951417 + f4-40.48582995951417,
40.48582995951417: f4-40.48582995951417 + e4^40.48582995951417 + d4^40.48582995951417 + c4-40.48582995951417,
1214.5748987854251`;
const touch = tune `
119.04761904761905: b5-119.04761904761905,
119.04761904761905: a5-119.04761904761905,
119.04761904761905: g5-119.04761904761905,
119.04761904761905: f5-119.04761904761905,
119.04761904761905: e5-119.04761904761905,
119.04761904761905: d5-119.04761904761905,
119.04761904761905: c5-119.04761904761905,
119.04761904761905: b4-119.04761904761905,
119.04761904761905: a4-119.04761904761905,
119.04761904761905: g4-119.04761904761905,
119.04761904761905: f4-119.04761904761905,
119.04761904761905: e4-119.04761904761905,
119.04761904761905: d4-119.04761904761905,
119.04761904761905: c4-119.04761904761905,
2142.857142857143`

let score = 0;
let projActive = false;
let timers = [];

setLegend(
  [ player, bitmap`
................
................
................
..00000000......
..0H77HHH00.....
..0H77HHHH0.....
..0C77CCCC0.....
..0C77CCCC000000
..0C77CCCC000000
..0C77CCCC0.....
..0H77HHHH0.....
..0H77HHH00.....
..00000000......
................
................
................`],
  [ line, bitmap`
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........
....77..........`],
  [ enemy, bitmap`
.........L.LL...
........L.L.L...
........LLLL....
........44444...
........40404...
........44444...
........46664...
........44444...
......LLLL55....
..........55....
......LLLL55....
..........55....
.........5555...
.........5..5...
.........5..5...
.........5..5...`],
  [ proj, bitmap`
................
................
................
................
................
................
................
......L0........
......0L0.......
......L0........
................
................
................
................
................
................`],
  [ bg, bitmap`
DDDDDDDDDDDDDDDD
DDDDD1DDDDD1DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDD1D
DDD1DDDD1DDDDDDD
DDD1DDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDD1DDDDDD
1DDDDDD1DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD1DDDDDDDDDD
DDD1DDDDDDDDDDDD
DDDDDDDDDD1DDDDD
DDDDDDDDDDDDDD1D`],
);

setSolids([]);

let level = 0;
const levels = [
  map`
l.......
l.......
l.......
l.......`,
];

setMap(levels[level]);
setBackground(bg);
addSprite(0, 0, player);

setPushables({
    [ player ]: [],
});

onInput("s", () => {
  playTune(gear)
  getFirst(player).y += 1;
});

onInput("w", () => {
  playTune(gear)
  getFirst(player).y -= 1;
});

onInput("k", () => {
  if (projActive === false) {
      playTune(shoot)
      let p = getFirst(player);
      addSprite(p.x + 1, p.y, proj);
      projActive = true;
  }
});

onInput("j", () => {
  timers.forEach((timer) => {
    clearInterval(timer);
  });

  getAll(proj).forEach((projObj) => {
    projObj.remove();
  });

  projActive = false;
  
  getAll(enemy).forEach((enemyObj) => {
    enemyObj.remove();
  });

  score = 0;

  clearText();
  
  startgame();  
});

function startgame() {
  // check for game over and draw score
  timers.push(setInterval(() => {
    addText("SCORE: " + score, {
      x: 5,
      y: 0,
      color: color `0`
    });
    let gameover = false;
    getAll(enemy).forEach((enemyObj) => {
      if (enemyObj.x === 0) {
        gameover = true;
        return;
      }
    });
  
    if (gameover) {
      getAll(enemy).forEach((enemyObj) => {
        if (enemyObj.x != 0) {
          enemyObj.remove();
        }
      });
      playTune(touch);
    
      addText("R.I.P", {
        x: 4,
        y: 6,
        color: color `5` 
      });
  
      timers.forEach((timer) => {
        clearInterval(timer);
      });
    }
  }, 50));
  
  // moves the enemies
  timers.push(setInterval(() => {
    getAll(enemy).forEach((enemyObj) => {
      enemyObj.x -= 1;
    });
  }, 600));
  
  //  adds the enemies
  timers.push(setInterval(() => {
    for (let i = 0; i < 4; i += 1) {
      let dospawn =  Math.random();
      if (dospawn <= 0.35) {
        addSprite(7, i, enemy);
      }
    }
  }, 800));
  
  // projectile movement
  timers.push(setInterval(() => {    
    if (projActive) {
      getFirst(proj).x += 1
    }
  }, 100));
  
  timers.push(setInterval(() => {
    if (projActive) {
      // projectile hit end of screen
      let p = getFirst(proj);
      if (p.x === 7) {
        p.remove();
        projActive = false;
      }
    }

    if (projActive) {
      // projectile hit enemy
      let p = getFirst(proj);
      getAll(enemy).forEach((enemyObj) => {
        if (p.x === enemyObj.x && p.y === enemyObj.y) {
          enemyObj.remove();
          playTune(die);
          p.remove();
          score += 1;
          projActive = false;
          return;
        }
      });
    }
  }, 20));
}

startgame();