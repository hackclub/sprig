/* 
@title: FOOTYMAYHEM
@description: A mini retro soccer game where you have to maneuver around cones and opponents to put the ball in the net.
@author: Harsh Gairola
*/

const player = "p";
const ball = "b";
const goal = "g";
const cone = "c";
const field = "f";
const opp = "o";


setSolids([player, ball, opp]);

setLegend(
  [player, bitmap`
4444444444444444
4444444444444444
4444499994444444
4444409904444444
4444499994444444
4444449944444444
444933DD33944444
4494433334494444
4444433334444444
4444443344444444
4444433334444444
4444494494444444
4444004400444444
4444444444444444
4444444444444444
4444444444444444`],
  [opp, bitmap`
4444444444444444
4444444444444444
4444499994444444
4444439934444444
4444499994444444
4444449944444444
444972LL72944444
4494427274494444
4444427274444444
4444447244444444
4444422224444444
4444494494444444
4444004400444444
4444444444444444
4444444444444444
4444444444444444`],
  [ball, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444420220244444
4444402002044444
4444420220244444
4444420220244444
4444402002044444
4444420220244444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
2222222222222222
21L1L1L1L1L1L1L2
2L1L1L1L1L1L1L12
21L1L1L1L1L1L1L2
2L1L1L1L1L1L1L12
21L1L1L1L1L1L1L2
2L1L1L1L1L1L1L12
21L1L1L1L1L1L1L2
2L1L1L1L1L1L1L12
4444444444444444
4444444444444444`],
  [cone, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444443333444444
4444433333344444
4444433333333444
4443333333333344
4443333443333444
4443333443333444
4443333333333344
4444433333333444
4444433333344444
4444443333444444
4444444444444444
4444444444444444
4444444444444444`],
  [field, bitmap`
44C444444444444C
44444DD444D44444
4D444444444D44D4
4DD4444444444444
44444D44D4444444
4444D4444444DD44
C444444C44444444
44D44D4444D4D444
4D44444D4444D4D4
C4444444D4444444
C444444D44C4444C
D444D4444C44D444
4444444444444444
C444444444444444
444444444444444D
44444444CC444444`]
);

setBackground(field);

let level = 0;

const levels = [
  map`
.........
.........
.........
.........
pb..c...g
.........
.........
.........
.........`,
  map`
p........
.b.......
....c....
.........
.........
....c....
.........
.........
........g`,
  map`
.........
....c....
.........
.........
pbc.....g
.........
....c....
.........
.........`,
  map `
p.......g
.c...c...
...c.....
.........
.b......c
...c.....
.........
....c....
.........`,
  map `
........g
.........
....c....
.........
.c.b.b.c.
.........
....c....
.........
p.......g`,
  map `
ccccccccc
g.......c
cccccc..c
ccc..c...
.....c...
..cc.cc.c
c.c..cc.c
cbc.....c
p.c.....c`,
  map `
..c.c.c..
.........
.........
.........
p......bg
.........
.........
.........
.c.c.c...`,
  map `
....g....
.........
.........
.........
....o....
.........
.........
....b....
....p....`,
  // LEVEL 8: Central Keep
  map `
..c...c..
.........
....g....
.........
.c..o..c.
.........
....b....
.........
....p....`,
  // LEVEL 9: Passing Gates
  map `
.........
..ccccc..
....g....
.........
p..o.b...
.........
..ccccc..
.........
.........`,
  // LEVEL 10: Double Cross Stadium
  map `
o...g...o
.........
.........
.........
....b....
.........
.........
.........
....p....`
];

setMap(levels[level]);

setPushables({
  [player]: [ball]
});

let patrolStep = 0;

setInterval(() => {
  const cones = getAll(cone);
  const opps = getAll(opp);
  const currentBall = getFirst(ball);

  if (cones.length === 0 && opps.length === 0) return;

  patrolStep++;

  switch (level) {
    case 0:
      break;

    case 1:
      for (const c of cones) {
        if (patrolStep % 4 < 2) {
          c.x += 1;
          c.y -= 1;
        } else {
          c.y += 1;
          c.x -= 1;
        }
      }
      break;

    case 2:
    case 3:
      for (const c of cones) {
        if (patrolStep % 6 < 3) {
          c.y += 1;
        } else {
          c.y -= 1;
        }
      }
      break;

    case 4:
      for (const c of cones) {
        if (patrolStep % 2 < 1) {
          c.y += 1;
          c.x += 1;
        } else {
          c.y -= 1;
          c.x -= 1;
        }
      }
      break;

    case 5:
      break;

    case 6:
      const totalHeight = height();
      const loopHeight = (totalHeight - 1) * 2;
      const verticalProgress = patrolStep % loopHeight;

      for (const c of cones) {
        let startsMovingDown = (c.y === 0 || c.y < totalHeight / 2);

        if (verticalProgress < totalHeight - 1) {
          c.y += startsMovingDown ? 1 : -1;
        } else {
          c.y += startsMovingDown ? -1 : 1;
        }

        if (c.y < 0) c.y = 0;
        if (c.y >= totalHeight) c.y = totalHeight - 1;
      }
      break;

    case 7:
    case 8:
    case 9:
    case 10:
      for (const o of opps) {
        let targetX = o.x;
        let targetY = o.y;

        // Pure pursuit logic targeting the ball, without possessing it
        if (currentBall) {
          if (o.x < currentBall.x) targetX += 1;
          else if (o.x > currentBall.x) targetX -= 1;
          if (o.y < currentBall.y) targetY += 1;
          else if (o.y > currentBall.y) targetY -= 1;
        }

        if (targetX >= 0 && targetX < width() && targetY >= 0 && targetY < height()) {
          o.x = targetX;
          o.y = targetY;
        }
      }
      break;
  }

  // Combined real-time proximity hazard checks
  const currentPlayer = getFirst(player);
  if (currentPlayer) {
    for (const c of cones) {
      if (currentPlayer.x === c.x && currentPlayer.y === c.y) {
        setMap(levels[level]);
        return;
      }
    }
    for (const o of opps) {
      if (currentPlayer.x === o.x && currentPlayer.y === o.y) {
        setMap(levels[level]);
        return;
      }
    }
  }
}, 400);

onInput("w", () => { getFirst(player).y -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });

onInput("j", () => {
  clearText();
  setMap(levels[level]);
});

afterInput(() => {
  const currentPlayer = getFirst(player);

  const cones = getAll(cone);
  for (const c of cones) {
    if (currentPlayer && currentPlayer.x === c.x && currentPlayer.y === c.y) {
      setMap(levels[level]);
      return;
    }
  }

  const opps = getAll(opp);
  for (const o of opps) {
    if (currentPlayer && currentPlayer.x === o.x && currentPlayer.y === o.y) {
      setMap(levels[level]);
      return;
    }
  }

  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, ball).length;

  if (numberCovered === targetNumber && targetNumber > 0) {
    level = level + 1;
    if (levels[level] !== undefined) {
      setMap(levels[level]);
    } else {
      addText("YOU WIN!", { y: 4, color: color`3` });
    }
  }
});