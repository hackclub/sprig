/*
@title: Raycasting Demo
@author: Henry Bass
@tags: []
@addedOn: 2022-07-22

Press W to move forwards, S to move back
A and D to look

In the top left is the map, any red tiles are tiles that are currently visible. Blue is look direction.

No objective currently.

(Rotation and Position are not locked to grid)
*/
const wall1 = "1";
const wall2 = "2";
const wall3 = "3";
const wall4 = "4";
const wall5 = "5";
const wall6 = "6";
const wall7 = "7";
const floor = "/";
const sky = "s";
const red = "r";
const yellow = "y";
const blue = "b"
const walls = [wall1, wall2, wall3, wall4, wall5, wall6, wall7]
const pi = 3.141
var vAngle = (pi/4) * 3;
var x = 1.5
var y = 7.5

const screenSize = 48
var range = 10
var mapSize = 8

let angle, dist, hit;

var screen = ``

var henryMap =
`#########
#.......#
#.$.$...#
#.#.#...#
#.#.#...#
#.$.$...#
#.......#
#.......#
#########`

function inRange(n, min, max) {
    if (x > min && x < max) {
        return true
    }
}

for (let i = 0; i < screenSize; i++) {
    for (let j = 0; j < screenSize; j++) {
        screen += "1"
    }
    screen += "\n"
}

henryMap = henryMap.split("\n").map(function(x) {
    return x.split("")
});

setLegend(
    [sky, bitmap`
7777777777777777
7777777777777777
7727777777772777
7777777777777777
7777777777777777
7777777777777777
7777777277777777
7777777777777777
7772777777772777
7777777777777777
7777777777777777
7777777777777777
7777727777727777
7777777777777777
7777777777777777
7777777777777777`   ],
    [wall1, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
    [wall2, bitmap`
2121212121212121
1212121212121212
2121212121212121
1212121212121212
2121212121212121
1212121212121212
2121212121212121
1212121212121212
2121212121212121
1212121212121212
2121212121212121
1212121212121212
2121212121212121
1212121212121212
2121212121212121
1212121212121212` ],
    [wall3, bitmap`
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
1111111111111111` ],
    [wall4, bitmap`
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1` ],
    [wall5, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
    [wall6, bitmap`
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0` ],
    [wall7, bitmap`
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
0000000000000000` ],
    [floor, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
    [red, bitmap`
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
3333333333333333`   ],
    [blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`  ],
    [yellow, bitmap`
2266666666666622
2666666666666662
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
6666666666666666`]);

onInput("w", () => {
    var nx = Math.cos(vAngle)
    var ny = Math.sin(vAngle)
    if (inRange(x - nx, -1, mapSize) && inRange(y - ny, 0, mapSize)) {
        if (henryMap[Math.floor(x - nx)][Math.floor(y - ny)] == ".") {
            y -= ny;
            x -= nx;
        }
    }
})

onInput("s", () => {
    var nx = Math.cos(vAngle)
    var ny = Math.sin(vAngle)
    if (inRange(x + nx, -1, mapSize) && inRange(y + ny, 0, mapSize)) {
        if (henryMap[Math.floor(x + nx)][Math.floor(y + ny)] == ".") {
            y += ny;
            x += nx;
        }
    }
})

onInput("d", () => {
    vAngle += pi / 8
})

onInput("a", () => {
    vAngle -= pi / 8
})

function getDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - y1, 2) + Math.pow(x2 - y2, 2))
}
// don't ask about all the variables for "angle", I need a lot

function rayCast(startx, starty, angle, dAngle) {
    startx
    starty
    var lastDist = 0;
    let dx = Math.cos(angle)
    let dy = Math.sin(angle)
    let i = 0
    var hit = "."
    while (i < range) {
        // of course there are better ways to do this than making "i" really low, but whatever
        i += 0.1
        let cx = startx - (dx * i)
        let cy = starty - (dy * i)
        lastDist = getDist(startx, starty, cx, cy) * Math.cos(dAngle)
        hit = henryMap[Math.floor(cx)][Math.floor(cy)]
        if (hit !== ".") {
           return [i * Math.cos(dAngle), hit, Math.floor(cx), Math.floor(cy)]
        }

    }
    
    return [i, hit, Math.floor(startx - (dx * i)), Math.floor(starty - (dy * i))]
      
}
    setMap(screen)

var tick = () => {
    var hits = []
    for (let i = 0; i < screenSize; i+=1) {
        var dAngle = (pi/2)/(screenSize/(i - (screenSize/2)))
        angle = (vAngle - pi/4) + (pi/2)/(screenSize/i)
        // there's x, nx, vx, rx, dx, and they all do different things
        var nx = Math.round(Math.cos(angle))
        var ny = Math.round(Math.sin(angle))
        var vx = Math.round(Math.cos(vAngle))
        var vy = Math.round(Math.sin(vAngle))
        var cast = rayCast(x, y, angle, dAngle)
        dist = cast[0]
        height = 50/dist
        hit = cast[1]
        if (!hits.includes(cast[2] + "," + cast[3])) {
            hits.push(cast[2] + "," + cast[3])
        }
        for (let j = 0; j < screenSize; j++) {

            if (j > screenSize / 2) {
                clearTile(i, j);
                addSprite(i, j, floor);
            }

            if (j <= screenSize / 2) {
                clearTile(i, j);
                addSprite(i, j, sky);
            }

            if (Math.abs(j - screenSize / 2) <= height) {
                clearTile(i, j);
              if (hit == "#") {
                
                if (dist <= (range)) {
                  addSprite(i, j, walls[Math.floor(dist/(range/5))]);
                }else {
                    addSprite(i, j, wall7)
                  }
                } else {
                  addSprite(i, j, yellow);
                }

            }
        }

    }
  let rx = Math.floor(x)
  let ry = Math.floor(y)
  for(let i = 0; i <= mapSize; i++) {
    
    for(let j = 0; j <= mapSize; j++) {
                  if (i == rx && j == ry) {
                clearTile(rx, ry);
                addSprite(rx, ry, wall2);
            } else if (i == Math.floor(x - vx) && j == Math.floor(y - vy)) {
                clearTile(i, j);
                addSprite(i, j, blue);
            
            } else if (hits.indexOf(i + "," + j) !== -1) {
                clearTile(i, j);
                addSprite(i, j, red);
            } else if (i <= mapSize && j <= mapSize) {
                if (henryMap[i][j] == ".") {
                    clearTile(i, j);
                    addSprite(i, j, floor);
                } else if (henryMap[i][j] == "#") {
                    clearTile(i, j);
                    addSprite(i, j, wall3);
                } else if (henryMap[i][j] == "$") {
                    clearTile(i, j);
                    addSprite(i, j, yellow);
                } else if (i == hit[2] && j == hit[3]) {
                    clearTile(i, j);
                    addSprite(i, j, wall5);
                }

            }
    }
  }
    setTimeout(tick, 100);
}

tick()
