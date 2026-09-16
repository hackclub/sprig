/*
@title: SprigFull
@description: A plethora of games for the Sprig!
@author: BEANSTASTEGOOD
@tags: ['platformer', 'jumping', 'multiple-games']
@addedOn: 2026-06-08
*/

let isHome = true;
let currentGame = 0;
let started = false;

const games = ['Higgles Adventure', 'Sprig Jump', 'Samuri', 'Spretris', 'Rain Run', 'Sprortal'];

function home() {
    sPressed = false;
    kPressed = false;
    isHome = true;
    started = false;

    clearText();

    const red = 'r';
    const yellow = 'y';
    const orange = 'o';
    const background = 'b';

    setLegend(
        [
            red,
            bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
        ],
        [
            orange,
            bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`,
        ],
        [
            yellow,
            bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`,
        ],
        [
  background,
  bitmap`
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
5D5D5D5D5D5D5D5D
D5D5D5D5D5D5D5D5
  `],
    );
  setBackground(background);

    setMap(map`
................................................................................................................................
.....................................................................rooooooo...................................................
......................................................................rroooooo..................................................
..........................ooooooo........oooooooo........rooooooooooo...........................................................
........................oooooooooo.....oooooooooooo.....roooooooooooo..ooooooo......ooooooooooo.................................
........................oooooooooo....ooooooooooooo....rooooooooooooo.rooooooo....oooooooooooooooo..............................
......................oooooorrrrr....oooooooorrooooooo.rooooooorrrooooroooooooo..ooooooooooooooooo..............................
......................ooooooorrr.....rooooooorroooooooorrooooooo.rrooorrooooooo.rooooooorrrooooooo..............................
......................royyyyyyyyy...rroyyyyyyorryyyyyyorrooooooo..rrr.rrooooooo.rrooooooorrooooooo..............................
.....................royyyyyyyyyyy.rrryyyyyyyrryyyyyyy.royyyyyo.......rryyyyyo.rrooooooo.roooooooo..............................
.....................rrrrrryyyyyyy.rrryyyyyyy.ryyyyyyy.ryyyyyyyy......rryyyyyyyrroyyyyyo.royyyoooo..............................
.....................rrrrrrryyyyyy.rrryyyyyyy.ryyyyyyyyrryyyyyyy......rryyyyyyy.rryyyyyyyrryyyyyyy..............................
.......................rrrrryyyyyy..rryyyyyyyyyyyyyyyy.rryyyyyyy......rryyyyyyy.rrrrryyyyyyyyyyyyy..............................
.......................ryyyyyyyyyy..rryyyyyyyyyyyyyy...rryyyyyyy.......ryyyyyyy.rrrrryyyyyyyyyyyyy..............................
......................ryyyyyyyyyrr..rrryyyyyyyyyyyyy....rrryyyy........rrrrrrr....rrrrrrrrryyyyyyy..............................
.....................rryyyyyyyyr....rrryyyyyyyrrrr......rrrrrrr........rrrrrrr......rrrrrrrryyyyyy..............................
.....................rrryyyyyyyr....rrryyyyyyyrrrr.....................................rryyyyyyyyy..............................
......................rrrrrrrrr......rryyyyyyyr.......................................ryyyyyyyyyy...............................
.......................rrrrrrr.......rrryyyyyr.......................................rryyyyyyyyyy...............................
.....................................rrrrrrrr.......................................rrrryyyyyy..................................
......................................rrrrrrr........................................rrrrrrrrr..................................
.......................................rrrrr....................................................................................
...........................................................................................oooooooo.............................
...........................................................................................oooooooooo...........................
...........................................................oooooo.....rooooooo.............oooooooooo...........................
..............................oooooooo..........oooo......ooooooo....rrooooooooo.........rroooooooooo...........................
......................ooooooooooooooooo......oooooooo.....ooooooooo..rrooooooooo.........rroooooooooo...........................
...................oooooooooooooooooooooo....ooooooooo...rroooooooo..rrooooooooo.........rrrooooooooo...........................
...................oooooooooooooooooooooo..roooooooooo...rroooooooo..rrooooooooo.........rrrooooooooo...........................
.................rooooooooooooooooooooooo..rroooooooooo..rroooooooo..rrooooooooo.........rrrooooooooo...........................
.................rooooooooooooooooooooooo..rroooooooooo..rrooooooooo.rryyyyoooooo.........rryyyyyyyyy...........................
...............rrrooooooooooooooooorrrr...rrroooooooooo..rrroyyyyyyy.rryyyyyyyyyy.........rrryyyyyyyyy..........................
...............rrrooooooooorrrrrrrrrrrr...rrryyyoooyyyy..rrryyyyyyyy.rrryyyyyyyyy.........rrryyyyyyyyy..........................
...............rrroyyyoooorrrrrrrrrrrrr...rrryyyyyyyyyy...rryyyyyyyy.rrryyyyyyyyy.........rrryyyyyyyyy..........................
...............rrryyyyyyyyorrrrrrr........rrrryyyyyyyyy...rryyyyyyyy.rrryyyyyyyyy.........rrryyyyyyyyy..........................
...............rrryyyyyyyyyrr..............rrryyyyyyyyyy..rryyyyyyyy.rrryyyyyyyyy..........rryyyyyyyyyy.........................
...............rrryyyyyyyyyyyyyyyyyyy......rrryyyyyyyyyy..rrryyyyyyyyrrryyyyyyyyyy.........rrryyyyyyyyy.........................
...............rrrryyyyyyyyyyyyyyyyyy......rrryyyyyyyyyy..rrryyyyyyyy.rryyyyyyyyyy.........rrryyyyyyyyy.........................
................rrryyyyyyyyyyyyyyyyyyyy....rrryyyyyyyyyy...rryyyyyyyy.rrryyyyyyyyy.........rrryyyyyyyyy.........................
................rrrrryyyyyyyyyyyyyyyyyy....rrryyyyyyyyyy...rryyyyyyyy.rrryyyyyyyyy..........rryyyyyyyyy.........................
................rrrrrryyyyyyyyyyyyyyyyy....rrrryyyyyyyyy...rryyyyyyyy.rrryyyyyyyyy..........rrryyyyyyyyy........................
................rrrrrryyyyyyyyyyyyyyyyy.....rrryyyyyyyyy...rryyyyyyyy.rrryyyyyyyyy..........rrryyyyyyyyy........................
..................rrrryyyyyyyyyyyyyrrr......rrryyyyyyyyyy..rrryyyyyyyy.rryyyyyyyyyy.........rrryyyyyyyyyyyyyyyyyy...............
...................rrryyyyyyyyrrrrrrrr......rrryyyyyyyyyy..rrryyyyyyyy.rrryyyyyyyyy.........rrryyyyyyyyyyyyyyyyyyy..............
...................rrryyyyyyyyrrrrrrrr......rrryyyyyyyyyy...rryyyyyyyy.rrryyyyyyyyyyyyyyyy...rryyyyyyyyyyyyyyyyyyy..............
...................rrrryyyyyyyrrrrrrrr......rrryyyyyyyyyyyyyyyyyyyyyyy.rrryyyyyyyyyyyyyyyyyy.rrryyyyyyyyyyyyyyyyyy..............
...................rrrryyyyyyyy.............rrryyyyyyyyyyyyyyyyyyyyyyy.rrryyyyyyyyyyyyyyyyyy.rrrrryyyyyyyyyyyyyyyy..............
....................rrryyyyyyyy..............rrryyyyyyyyyyyyyyyyyyyyyy..rryyyyyyyyyyyyyyyyyyyrrrrryyyyyyyyyyyyyyyy..............
....................rrryyyyyyyy..............rrrryyyyyyyyyyyyyyyyyyyy...rrrrryyyyyyyyyyyyyyyy.rrrrrryyyyyyyyyyrrrr..............
....................rrryyyyyyyy..............rrrrrryyyyyyyyyyyyyyyyyr...rrrrryyyyyyyyyyyyyyyy.rrrrrrrrrrrrrrrrrrrr..............
....................rrrryyyyyyy..............rrrrrrryyyyyyyyyyyyyyyrr...rrrrrrryyyyyyyyyyyyy..rrrrrrrrrrrrrrrrrrr...............
....................rrrryyyyyyy................rrrrrrryyyyyyyyyyyyrr.....rrrrrrrrrrrrrrrrrrr....rrrrrrrrrrrrrrrrr...............
....................rrrryyyyyyy................rrrrrrrrrrrrrrrrrrrrr.....rrrrrrrrrrrrrrrrr........rrrrrrrrrrr...................
.....................rrrrrrrrr...................rrrrrrrrrrrrrrrrrr........rrrrrrrrrrrrrrr......................................
.....................rrrrrrrrr....................rrrrrrrrrrrrrrrrr..........rrrrrrrrrr.........................................
.....................rrrrrrrrr......................rrrrrrrrrrrrr...............................................................
.....................rrrrrrrrr..................................................................................................
.......................rrrrrr...................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
................................................................................................................................
`);
    updateMenu();
}

function updateMenu() {
    clearText();

    addText('Select Game', {
        y: 10,
        color: color`6`,
    });

    addText('<' + games[currentGame] + '>', {
        y: 12,
        color: color`6`,
    });
}

onInput('a', () => {
    if (!isHome) return;

    currentGame--;

    if (currentGame < 0) {
        currentGame = games.length - 1;
    }

    updateMenu();
});

onInput('d', () => {
    if (!isHome) return;

    currentGame++;

    if (currentGame >= games.length) {
        currentGame = 0;
    }

    updateMenu();
});

onInput('w', () => {
    if (!isHome) return;

    started = true;
    launch(currentGame);
});

function launch(id) {
    isHome = false;
    started = true;

    clearText();

    switch (id) {
        case 0:
            startHiggles();
            break;

        case 1:
            startSprigJump();
            break;

        case 2:
            // startSamuri();
            break;

        case 3:
            // startSpretris();
            break;

        case 4:
            // startRainRun();
            break;
    }
}

function startSprigJump() {
  let dead = false;
  let score = 0;
  let jumping = false;
  let jumpVelocity = 0;

  const player = 'p';
  const background = 'b';
  const spike = 's';
  
  setLegend(
  [
  player,
  bitmap`
  DDDDDDDDDDDDDDDD
  D44444444444444D
  D44444444444444D
  D44DDDDDDDDDD44D
  D44D........D44D
  D44D.555555.D44D
  D44D.577775.D44D
  D44D.577775.D44D
  D44D.577775.D44D
  D44D.577775.D44D
  D44D.555555.D44D
  D44D........D44D
  D44DDDDDDDDDD44D
  D44444444444444D
  D44444444444444D
  DDDDDDDDDDDDDDDD
  `],
  [
  background,
  bitmap`
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  3333333333333333
  `],
  [
  spike,
  bitmap`
  ................
  ................
  ................
  .......L1.......
  .......11.......
  ......1LL1......
  ......L11L......
  ......111L......
  .....1LL1L1.....
  ....1L1111L1....
  ...LL111L1LLL...
  ...1L1L11L1L1...
  ..LL1LL1L11111..
  ..L111111111L1..
  .111LL11LL11111.
  1LL111LL1LL1L11L
  `]
  );

  setMap(map`
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ...p.........s
  `);

onInput("w", () => {
  if (isHome || dead || jumping) return;

  jumping = true;

  let jumpStep = 0;

  let jumpInterval = setInterval(() => {
    let p = getFirst(player);
    
    jumpStep++;

    if (jumpStep <= 2) {
        if (!p) return;
      p.y -= 1;
    } else if (jumpStep <= 4) {
        if (!p) return;
      p.y -= 1;
    }
    if (jumpStep >= 4) {
      clearInterval(jumpInterval);

      let fallInterval = setInterval(() => {
        let p = getFirst(player);
        if (!p) return;
        let oldY = p.y;

        p.y += 1;

      }, 50);

      setTimeout(() => {
        clearInterval(fallInterval);
        jumping = false;
      }, 50 * 4);
    }
  }, 60); 
});

setSolids([ player ]);

let spikeMove = setInterval(() => {
    if (isHome || dead) return;

    let s = getFirst(spike);

    if (!s) return;

    s.x -= 1;

    if (s.x === 0) {
        s.remove();
        addSprite(13, 10, spike);
    }
    if ((s.x === getFirst(player).x - 1) && !jumping) {
    clearInterval(spikeMove);
      dead = true;
      setMap(map`
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............
  ..............`);
  clearText();
    addText('Game Over!', {
        y: 5,
        color: color`7`,
    });
  
    addText('Score: ' + String(score), {
        y: 8,
        color: color`5`,
    });
    } else {
      score += 1;
    }
    if (!dead) {
        addText(String(score), { y: 0, x: 0, color: color`7`})
    }
}, 150);

setBackground(background);

afterInput(() => {
    if (isHome || dead) return;
});
};

function startHiggles() {
    const player = 'p';
    const goal = 'g';
    const atom = 'a';
    const wall = 'w';
    const background = 'b';

    let finished = false;
    let level = 0;

    setLegend(
      [
      player,
      bitmap`
        ................
        ................
        ....1111111.....
        ...111111111....
        ..11999999911...
        ..19999999991...
        ..19259995291...
        ..19999999991...
        ...993999399....
        ....9933399.....
        .....99999......
        ......LLL.......
        ...LLLLLLLLL....
        ...9.LLLLL.9....
        .....LLLLL......
        .....0...0......
    `],
      [
      goal,
      bitmap`
        ..444444444444..
        .DDDDDDDDDDDDDD.
        4D444444444444D4
        4D4445DDDD7444D4
        4D44445DD74444D4
        4D47445DD74454D4
        4D4D77457455D4D4
        4D4DDD5757DDD4D4
        4D4DDD7575DDD4D4
        4D4D55475477D4D4
        4D45447DD54474D4
        4D44447DD54444D4
        4D4447DDDD5444D4
        4D444444444444D4
        .DDDDDDDDDDDDDD.
        ..444444444444..
      `],
      [
      atom,
      bitmap`
      DDD4...DDD....DD
      DDD44..DD4...DDD
      .DD5555DD555DDDD
      ..DDD77DD77DDD44
      ..5DDD5DD5DDD54.
      ..57DDDDDDDD75..
      D4575DDDDDD575..
      DDDDDDDDDDDDDDDD
      DDDDDDDDDDDDDDDD
      ..575DDDDDD5754D
      ..57DDDDDDDD75..
      .45DDD5DD5DDD5..
      44DDD77DD77DDD..
      DDDD555DD555DDD.
      DDD...4DD..44DDD
      DD....DDD...4DDD
      `],
      [
      wall,
      bitmap`
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
      [
      background,
      bitmap`
      F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
F6F6F6F6F6F6F6F6
6F6F6F6F6F6F6F6F
`]
    );

    setSolids([ player, atom, wall ]);
    
    setPushables({
      [player]: [atom]
    });

    const levels = [
        map`
          .p......
          ........
          ........
          ..a.....
          ........
          .......g
        `,
          map`
          ........
          ........
          ........
          ........
          .....aw.
          p.....wg
        `,
          map`
          ...w....
          ..aw....
          ...w..w.
          ...w..w.
          ......w.
          p.....wg
        `,
          map`
          ........
          ..a.....
          .....a..
          ...a....
          ........
          p..g.g.g
          `,
          map`
          ........
          ...p....
          ........
          .aa.aa..
          w.w.w.w.
          wgwgwgwg`
    ];

    setMap(levels[level]);
    addText(String(level + 1), {x: 0, y: 1})

    onInput('s', () => {
        if (finished || isHome) return;

        if (kPressed) {
            kPressed = false;
            home();
            return;
        }

        getFirst(player).y += 1;
    });

    onInput('w', () => {
        if (finished || isHome) return;

        getFirst(player).y -= 1;
    });

    onInput('a', () => {
        if (finished || isHome) return;

        getFirst(player).x -= 1;
    });

    onInput('d', () => {
        if (finished || isHome) return;

        getFirst(player).x += 1;
    });

    onInput('j', () => {
        if (isHome) return;
        if (finished) {
          level = 0;
          finished = false;
  
          clearText();
          setMap(levels[level]);
          addText(String(level + 1), {x: 0, y: 1})
        } else {
          setMap(levels[level]);
        }
    });

    afterInput(() => {
        if (isHome || finished) return;

        const targetNumber = tilesWith(goal).length;
        const numberCovered = tilesWith(goal, atom).length;

        if (numberCovered === targetNumber) {
            level++;

            if (level < levels.length) {
                setMap(levels[level]);
                addText(String(level + 1), {x: 0, y: 1})
            } else {
                clearText();
                addText('you win!', {
                    y: 7,
                    color: color`5`,
                });

                setMap(map`
                  ........
                  ........
                  ........
                  ........
                  ........
                  ........
                `);

                finished = true;
            }
        }
    });
}

let kPressed = false;
let sPressed = false;

onInput('k', () => {
    if (isHome) return;

    kPressed = true;
    if (sPressed) {
        sPressed = false;
        home();
    }
});

onInput('s', () => {
    if (isHome) return;

    sPressed = true;

    if (kPressed) {
        kPressed = false;
        home();
    }
});

home();
