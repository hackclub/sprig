
    /*
@title: lazer guy
@author: hayward herlihy

Instructions:

yor caricter moovs 2 spaceis dont hit the kid balls and triy and get home.
.
*/

const player1 = "0"
const player2 = "1"
const wall = "2"
const upLaser = "3"
const downLaser = "4"
const leftLaser = "5"
const rightLaser = "6"
const vert = "7"
const horz = "8"
const target = "9"
const background = "b"
const door = "q"
const ball = "w"


setLegend(
  [ player1, bitmap`
................
....66666666....
...66LLLLLL66...
..6LL111111LL6..
.66L11111111L66.
.6L1111111111L6.
.6L1100110011L6.
.6L1111111111L6.
.6L1111111111L6.
.6L1111001111L6.
.6L1111111111L6.
.66L11111111L66.
..6LL111111LL6..
...66LLLLLL66...
....66666666....
................` ],
  [ player2, bitmap`
................
................
................
.....666666.....
....6LLLLLL6....
...6LL1111LL6...
...6L101011L6...
...6L111111L6...
...6L110111L6...
...6L111111L6...
...6LL1111LL6...
....6LLLLLL6....
.....666666.....
................
................
................` ],
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L100000000001L0
0L10LLLLLLLL01L0
0L10L111111L01L0
0L10L100001L01L0
0L10L102201L01L0
0L10L102201L01L0
0L10L100001L01L0
0L10L111111L01L0
0L10LLLLLLLL01L0
0L100000000001L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ upLaser, bitmap`
................
....66666666....
...66LLLLLL66...
..6LL111111LL6..
.66L11111111L66.
.6L1111111111L6.
.6L1100110011L6.
.6L1111111111L6.
.6L1101111111L6.
.6L1110011111L6.
.6L1111111111L6.
.66L11111111L66.
..6LL111111LL6..
...66LLLLLL66...
....66666666....
................` ],
  [ rightLaser, bitmap`
................
....66666666....
...66LLLLLL66...
..6LL111111LL6..
.66L11111111L66.
.6L1110011001L6.
.6L1111111111L6.
.6L1111111111L6.
.6L1011111111L6.
.6L1100111000000
.6L1111111010L6.
.66L11111100L66.
..6LL111110LL6..
...66LLLLLL66...
....66666666....
................` ],
  [ downLaser, bitmap`
................
................
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
...3...3.....3..
....3..3....3...
.....3.3..33....
.....3.3.3......
......333.......
.......3........` ],
  [ leftLaser, bitmap`
0000000000000000
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0000000000000000` ],
  [ vert, bitmap`
.......4........
....4..4.4......
.......4....4...
...4...4........
.......4........
.......4..4.....
....4..4........
.......4........
.......4........
....4..4....4...
...4...4.4......
.......4........
.......4........
.......4........
..4....4..4.....
.....4.4.....4..` ],
  [ horz, bitmap`
................
................
................
..........3.....
..3........3.3..
........3.......
...3.......3....
3333333333333333
................
..3..3...3......
.............3..
...........3....
.3...3..........
........3.......
................
................` ],
  [ target, bitmap`
................
................
.........44L....
......44444L....
....4444444L....
.4444444444L....
....4444444L....
......44444L....
.........44L....
...........L....
...........L....
...........L....
...........L....
...........L....
...........L....
...........L....`],
  [ background, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L100000000001L0
0L10LLLLLLLL01L0
0L10L111111L01L0
0L10L100001L01L0
0L10L102201L01L0
0L10L102201L01L0
0L10L100001L01L0
0L10L111111L01L0
0L10LLLLLLLL01L0
0L100000000001L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [ "u", bitmap`
0000000000000000
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0..0..0..0..0..0
0000000000000000`],
  [ "w", bitmap`
0000000000000000
0LLLLL0LL0LLLLL0
0L111101101111L0
0L100000000001L0
0L10LL0LL0LL01L0
0L10L101101L01L0
0000000000000000
0L10L10LL01L01L0
0L10L10LL01L01L0
0000000000000000
0L10L101101L01L0
0L10LL0LL0LL01L0
0L100000000001L0
0L111101101111L0
0LLLLL0LL0LLLLL0
0000000000000000`],
  [ door,bitmap`
LLLLCCCCCCCCLLLL
LLLCCCCCCCCCCLLL
LLCCCCCCCCCCCCLL
LCCCCCCCCCCCCCCL
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
1CCCCCCCCCCCCCCC
1CCCCCCCCCCCC00C
1CCCCCCCCCCCC00C
1CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCL
LCCCCCCCCCCCCCLL
LLCCCCCCCCCCCLLL
LLLCCCCCCCCCLLLL
LLLLCCCCCCCCLLLL`],
  [ ball,bitmap`
................
....8888888.....
...8888888886...
..888881111LL6..
.88881111111L66.
.6L1100110011L6.
.6L1111111111L6.
.6L1111111111L6.
.6L1111111111L6.
.6L1101111011L6.
.6L1110000111L6.
.66L11111111L66.
..6LL111111LL6..
...66LLLLLL66...
....66666666....
................`]  
) 

// setBackground(background);

setSolids([
      player2,
    wall, 
    upLaser,
    downLaser,
    leftLaser,
    "w",
    "u"
    
]);

let level = 0;
const levels = [
    map`
......1.9
.1.......
...12....
.........
..1......
.........
2.2......
3........`,
    map`
.........9
1.....1...
...2......
....2..bb.
..2.......
2...1.....
..........
2b.......1
3.........`,
    map`
........9
..1......
1...1....
......1..
..2......
....2..2.
.........
2........
3........`,
    map`
........9
.........
1.....1..
..1......
....1...1
.........
..2......
2....2...
3........`,
    map`
9......1.
22.......
3.22.1...
....2..1.
2........
..2.1....
...22....
.2......1
.....22..`,
    map`
1.....1..9
....2.....
...1..22..
.2......2.
....2...1.
...1......
2.2.......
3.........`,
    map`
22222q2222
2........2
2........2
2........2
23.......2
2222222222`
    
    
];

let activePlayer = player1;

const getActivePlayer = () => getFirst(activePlayer);

setMap(levels[level]);
initLasers();

onInput("w", _ => {
    const p1 = getFirst(upLaser);
    const p2 = getFirst(upLaser);
    if (p1.y < p2.y) {
        p1.y -= 1;
        p2.y -= 1;
    } else {
        p2.y -= 1;
        p1.y -= 1;
    }

})

onInput("s", _ => {
    const p1 = getFirst(upLaser);
    const p2 = getFirst(upLaser);
    if (p1.y > p2.y) {
        p1.y += 1;
        p2.y += 1;
    } else {
        p2.y += 1;
        p1.y += 1;
    }
})

onInput("a", _ => {
    const p1 = getFirst(upLaser);
    const p2 = getFirst(upLaser);
    if (p1.x < p2.x) {
        p1.x -= 1;
        p2.x -= 1;
    } else {
        p2.x -= 1;
        p1.x -= 1;
    }
})

onInput("d", _ => {
    const p1 = getFirst(upLaser);
    const p2 = getFirst(upLaser);
    if (p1.x > p2.x) {
        p1.x += 1;
        p2.x += 1;
    } else {
        p2.x += 1;
        p1.x += 1;
    }
})

/* reset level */
onInput("j", _ => setMap(levels[level]));

function isJustLaser(t) {
  return t.length === 1 
    && (t.map(x => x.type).includes(vert)
        || t.map(x => x.type).includes(horz)
        || t.map(x => x.type).includes(player2));
}

function initLasers() {
    // remove all lasers
    getAll(horz).forEach(s => s.remove());
    getAll(vert).forEach(s => s.remove());

    // add lasers back in
    getAll(upLaser).forEach(up => {
        let { x, y } = up;
        y -=1
        while (true) {
            if (y < 0) break;
            const t = getTile(x, y);
            if (t.length === 0 || isJustLaser(t)) addSprite(x, y, vert)
            else break;
            y--;
        }
    })

    getAll(downLaser).forEach(down => {
        let { x, y } = down;
        y +=1
        while (true) {
            if (y >= height()) break;
            const t = getTile(x, y);
            if (t.length === 0 || isJustLaser(t)) addSprite(x, y, vert)
            else break;
            y++;
        }
    })

    getAll(rightLaser).forEach(right => {
        let { x, y } = right;
        x +=1
        while (true) {
            if (x >= width()) break;
            const t = getTile(x, y);
            if (t.length === 0 || isJustLaser(t)) addSprite(x, y, horz)
            else break;
            x++;
        }
    })

   getAll(leftLaser).forEach(left => {
        let { x, y } = left;
        x -=1
        while (true) {
            if (x < 0) break;
            const t = getTile(x, y);
            if (t.length === 0 || isJustLaser(t)) addSprite(x, y, horz)
            else break;
            x--;
        }
    })
}

let jail = false

afterInput(_ => {
    initLasers();
    let finished = true;
    getAll(target).forEach(t => {
        finished = getTile(t.x, t.y).length === 2 && finished;
    })

    const dead = [
        ...tilesWith(player2, vert),
        ...tilesWith(player2, horz)
    ]
    if (dead.length) {
        getFirst(player2).remove()
        setMap(map`
..........
2q22222229
2..22...22
2...0...2.
22222...2.
2.......2.
2uuu2.uu2.
2...b...2.
23..2...2.
222222222.`)

      jail = true

    }

    if (finished && level+1 < levels.length) setMap(levels[++level]);
  setPushables({
  ["uplazer"]: ["w"]
});

  let p = getFirst(upLaser)
  if(dead.length || level==9 || jail) {
    let d = getFirst(door)

  if(p.x==d.x && p.y==d.y){
     setMap(levels[0])
    jail = false
   }
  }

  console.log(level)
  console.log(p)
  
});
