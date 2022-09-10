const mod = (f, n) => ((f % n) + n) % n;
const cubeBitMap = "d";
const cube = () => getFirst("d");
const wall = "w";

setLegend(
  [cubeBitMap, bitmap`
................
................
................
................
................
................
................
................
................
................
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....`],
  [ wall, bitmap`
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
);

const levels = [
    map`
........
........
........
........
.....w..
d....w..`,
    map`
........
........
........
........
......ww
d.....ww`,
    map`
........
........
........
........
.......w
d.....ww`,
];
let level = 0;

let nextTick, lastTick, alive, pos, currTicks;
function startLevel(n) {
    currTicks = 0;
    setMap(levels[Math.min(n, levels.length-1)]);
    pos = 0;
    alive = true;
    tick();
}

onInput("w", () => {
    const elapsed = Date.now() - lastTick;
    if (!alive && elapsed > 500) {
        start();
    }
    if (elapsed < 100) return;
    pos = 2;
    tick();
});

function tick() {
    if (!alive) return;
    //go up
    if (cube()) {
        cube().y -= pos;
    }
    pos -= 2;
    
    
    currTicks++;
    if (currTicks > 40)
        startLevel(++level);
  
    //wrap game walls around
    for (const w of getAll(wall)) {
        w.x = mod(w.x - 1, 8);
        if (getTile(w.x-1, w.y) == undefined)
            w.remove();
    }
     //handle collision
       if (cube()) {
           const {x, y} = cube();
           if (getTile(x, y).length > 1) {
               setMap(map`
........
..w.....
..w.....
..w.....
..www...
........`,);
               alive = false;
           }
       }
    lastTick = Date.now();
    clearTimeout(nextTick);
    nextTick = setTimeout(tick, 200);
}
startLevel(0);