/* @title: bounce tales
@description: mazed based low version of block tales ( OG keypad phone game )
@author: Bhuvan-rai
@tags: []
@addedOn: 2026-06-18
*/

const ball = "p"
const green = "g"
const egg = "e"
const door = "d"
const black = "b"
const orange = "o"
const dirt= "1"
const trap = "t"
const grass = "2"
const flower = "3"

const collection = tune`
90.09009009009009: E5^90.09009009009009,
90.09009009009009: F5^90.09009009009009,
90.09009009009009: G5^90.09009009009009,
90.09009009009009: A5^90.09009009009009,sd
2522.522522522522`

const jump = tune`
157.06806282722513: F4~157.06806282722513 + G4~157.06806282722513,
157.06806282722513: G4~157.06806282722513 + F4~157.06806282722513 + A4~157.06806282722513,
157.06806282722513: A4~157.06806282722513 + B4~157.06806282722513 + G4~157.06806282722513,
157.06806282722513: A4~157.06806282722513 + B4~157.06806282722513 + C5~157.06806282722513,
157.06806282722513: C5~157.06806282722513 + B4~157.06806282722513,
4240.837696335078`

const hit = tune`
277.77777777777777: C4/277.77777777777777 + D4~277.77777777777777,
8611.111111111111`

setLegend(
	[ ball, bitmap`
...0000000000...
..003333333300..
.00333333333300.
0033333332233300
0333333322223330
0333333322222330
0333333332223330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
.00333333333300.
..003333333300..
...0000000000...` ],
    [ trap, bitmap`
................
................
................
................
.......00.......
.......11.......
......1111......
......1111......
.....LLLLLL.....
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
...LLLLLLLLLL...
...LLLLLLLLLL...
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.` ],
    [ green , bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDD4DDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDD4DDDDD
DD4DDDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDD4DDDDDDDDD4DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
    [ egg , bitmap`
................
.........000....
........06660...
.......0666660..
......06626660..
.....0662266660.
....00622266660.
....06666666660.
....06666666660.
....06666666660.
....06666666660.
.....0FFFFFFFF0.
......0FFFFFF0..
......00000000..
................
................` ],
    [ door , bitmap`
..LLLLLLLLLLLL..
..LC...CC...CL..
..LC...CC...CL..
..LC...CC...CL..
..LCCCCCCCCCCL..
..LC...CC...CL..
..LC...CC...CL..
..LC...CC...CL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LCCCCCCC110L..
..LCCCCCCC0CCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..` ],
    [ orange, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999990999
9999909999999999
9999999999999999
9999999999999099
9990999999999999
9999999999999999
9999999990999999
9999999999999999
9999999999999999
9999999099999099
9999999999999999
9999999999999999
9999999999999999` ],
    [ black, bitmap`
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
    [ dirt, bitmap`
C0CCCCCLLLLLLCCC
CCCCC9CCCCCCLC1C
LLCCCCCC1CC9CCCC
C1CC0CCCCCCCCCCC
CCCCCLCC1CLC9CC1
C9CLLCCCCCCCCCCC
CCCCC1C1CLLCC0CC
CL1CCCCCCC12CCCC
LCCCCCCC1CCCLC1C
CCC0CC9CCC9CLC9C
CLLCCCC1CCCCLCCC
CCLC1CCLCCC0000C
CC9CCLCCCC00CCCC
CC9LCCC211CCCCCL
CCCLC1CCCCLCCCCL
CLCCCCCLLLCLL9CL` ],
    [ grass, bitmap`
444.............
...44.....44.44.
.....4..44..44..
444..44.4...4...
..4...4.44..4...
..44.44..4..4...
..4444...4.444..
..4..444.444444.
4.4....4444...44
4444...44.44..44
.444..444..4..44
..44.44.4444.444
..44.4444444444.
..4444DD44444444
DDDDDDDDDDDD4444
DDDDDDDDDDDDDDDD` ],
    [ flower , bitmap`
................
................
................
................
.......969......
......66666.....
.....969C969....
.....66CCC66....
.....969C969....
......66666.....
.......969......
........D.......
........D.......
........D.......
........D.......
........D.......` ]
)

setSolids(
  [ ball, green, dirt, door]
)

let level = 0
const levels = [
	map`
gggggggggggggggggg
gge...2.ggg..g.g.g
gggg..g.2.g...g..g
gggg..g.g.g..ooo.g
ggggg.g.g.g.ooooog
gg..22g..2g.ooboog
g.2tggg..gg.ooboog
g.ggggg.3gg.gggggg
g.gg....gg..gggggg
gp...2222d22gggg11
gggg.gggggggggg111
gg..2ggggggggg1111
gg..gggggggg111111
ggt2..ggggg1111111
gggg2.ggggg1111111
g11gg.gggg11111111
g1e...ttg111111111
g11111111111111111` ,
  map`
gggggg.....g..g.g.
ggg..gp2...d3..g..
.t..eggg2.2gg.ooo.
.g.2ggggg.gggooooo
32.gggggg2..gooboo
gg2...gggg..gooboo
ggg.2222222.gggggg
ggg.ggggggg.gggggg
ggg.ggggg..2..gggg
ggg.gggg..2g..gggg
ggg.ggg...gg.2gggg
gg1.1....1gg.ggggg
g11....11111.11111
1111..1111.1....11
11....111..111..11
1..3.1111....11.11
1tegt11e..t.....11
111111111111111111`
]

setMap(levels[level])

setPushables({
	[ ball ]: []
})

// GAME ENGINE STATES
let jumpTicksLeft = 0;
let waitingForNextLevel = false; // Flag to handle transition screens

// CONTROLS
onInput("d", () => {
  if (waitingForNextLevel) return; // Ignore input when transition screen is active
  const p = getFirst(ball);
  if (p) p.x += 1; 
});

onInput("a", () => {
  if (waitingForNextLevel) return; // Ignore input when transition screen is active
  const p = getFirst(ball);
  if (p) p.x -= 1; 
});

onInput("w", () => {
  if (waitingForNextLevel) return; // Ignore input when transition screen is active
  
  const p = getFirst(ball);
  if (!p) return;

  const tileBelow = getTile(p.x, p.y + 1);
  let onGround = false;
  
  tileBelow.forEach(s => {
    if (s.type === green || s.type === dirt || s.type === door) {
      onGround = true;
    }
  });

  if (onGround) {
    playTune(jump); // Only trigger sound effect if jump succeeds
    jumpTicksLeft = 3; 
  }
});

// INTERMISSION SYSTEM KEY
onInput("j", () => {
  if (waitingForNextLevel) {
    clearText();                 // Erase the text box
    level = level + 1;           // Move up a level
    setMap(levels[level]);       // Generate the next map
    jumpTicksLeft = 0;           // Clean up physical arc status
    waitingForNextLevel = false; // Turn engine loops back on
  }
});

function checkCollision() {
    const Covered = tilesWith(ball, black); 
    const overlap = tilesWith(ball, egg); 
    const hitTrap = tilesWith(ball, trap); 
  
    // 1. Modified Level End Check
    if (Covered.length >= 1 && !waitingForNextLevel) {
        if (level + 1 < levels.length) {
            waitingForNextLevel = true; // Pause physics loop
            addText("Level " + (level + 1) + " completed!\nPress J to \nmove forward", { y: 6, x:2 , color: color`3` });
        } 
        else {
            addText("you win!", { y: 4, color: color`7` });
        }
    }
    
    // 2. Egg Collection
    overlap.forEach(tile => {
        tile.forEach(s => {
            if (s.type === egg) {
                s.remove();
                playTune(collection);
            }
        });
    });

    if (getAll(egg).length === 0 && getAll(door).length > 0) {
        getFirst(door).remove();
    }

    // 3. Spikes and Trap Hazards
    if (hitTrap.length > 0) {
        playTune(hit);
        setMap(levels[level]); 
        jumpTicksLeft = 0; 
    }
}

afterInput(() => {
  checkCollision();
});

// REAL-TIME GRAVITY INTERVAL
setInterval(() => {
  if (waitingForNextLevel) return; // Halt gravity completely during pauses

  const p = getFirst(ball);
  if (!p) return;

  if (jumpTicksLeft > 0) {
    p.y -= 1;          
    jumpTicksLeft -= 1;  
  } else {
    p.y += 1;          
  }

  checkCollision();
}, 150);