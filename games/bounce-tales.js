/* @title: bounce tales
@description: maze-based version of the og nokia game , GOAL : collect eggs , reach the black zone!
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
const portalA = "x"
const portalB = "y"

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
.......333......
......33333.....
.....3333333....
....333CCC333...
....333C6C333...
....333CCC333...
.....3333333....
......33333.....
.......333......
........D.......
........D.......
........D.......
........D.......` ],
    [ portalA, bitmap`
0000000000000000
0333333333333330
0322222222222230
0322223333222230
0322233333322230
0322333333332230
0323333333333230
0323333333333230
0323333333333230
0323333333333230
0322333333332230
0322233333322230
0322223333222230
0322222222222230
0333333333333330
0000000000000000` ],
    [ portalB, bitmap`
0000000000000000
0555555555555550
0522222222222250
0522225555222250
0522255555522250
0522555555552250
0525555555555250
0525555555555250
0525555555555250
0525555555555250
0522555555552250
0522255555522250
0522225555222250
0522222222222250
0555555555555550
0000000000000000` ]
)

setSolids(
  [ ball, green, dirt, door]
)

let level = 0
const levels = [
	map`
gggggggggggggggggg
gge2..2.ggg..g.g.g
gggg..g.2.g...g..g
gggg2.g.g.g..ooo.g
ggggg.g.g.g.ooooog
gg..22g..2g.ooboog
g.2tggg..gg.ooboog
g.ggggg.3gg.gggggg
g.gg....gg..gggggg
gp22.2222d22gggg11
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
111111111111111111`,
  map`
ggggggggggggggoooo
gp..222.g.222.dbbo
ggg.ggg.g.ggg.oooo
g.22g.22g22.g222.g
g.ggg.ggggg.gggggg
g.22g22.2.g22....g
g.ggggg.g.ggg.22.g
g222x22.g2222ygg.g
ggggggg.gggggg..2g
g.222222g.22222.gg
g.ggggggggggggg..g
g222e.2223g..g2e2g
ggggg.ggggg..ggggg
g33..............g
1gg..1...1..13...1
1111..1.11.11111.1
1te....t.1...et..1
111111111111111111`,
  map`
gggggggggggggggggg
gp22.t.22dxggggggg
gggg.g.ggggggooogg
g.222g222.ggooooog
g.ggggggg.ggooboog
g.g.22.22eggooboog
g.g.gg.ggggggg2..g
g222g.222222.gg.2g
ggggg.gggggggg.2gg
g.2.22g..gy2222ggg
g.g.ggg..ggggggggg
g2t232....22223.2g
gggggg2...ggggg.gg
g...2.g.2222..g.2g
g...g.g.gggg2...g1
1..2g222te2.g....1
1teg1111111222t2e1
111111111111111111`
]

setMap(levels[level])

setPushables({
	[ ball ]: []
})

let jumpTicksLeft = 0;
let waitingForNextLevel = false;
let portalCooldown = 0;

onInput("d", () => {
  if (waitingForNextLevel) return; 
  const p = getFirst(ball);
  if (p) p.x += 1; 
});

onInput("a", () => {
  if (waitingForNextLevel) return; 
  const p = getFirst(ball);
  if (p) p.x -= 1; 
});

onInput("w", () => {
  if (waitingForNextLevel) return; 
  
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
    playTune(jump); 
    jumpTicksLeft = 3; 
  }
});

onInput("j", () => {
  if (waitingForNextLevel && level + 1 < levels.length) {
    clearText();                 
    level = level + 1;           
    setMap(levels[level]);       
    jumpTicksLeft = 0;
    portalCooldown = 0;
    waitingForNextLevel = false; 
  }
});

function checkCollision() {
    const Covered = tilesWith(ball, black); 
    const overlap = tilesWith(ball, egg); 
    const hitTrap = tilesWith(ball, trap); 
    const onPortalA = tilesWith(ball, portalA);
    const onPortalB = tilesWith(ball, portalB);
  
    if (Covered.length >= 1 && !waitingForNextLevel) {
        waitingForNextLevel = true;
        if (level + 1 < levels.length) {
            addText("Level " + (level + 1) + " cleared!\nPress J to go\nto next level", { y: 6, x: 1, color: color`3` });
        } else {
            addText("Level " + (level + 1) + " cleared!\nyou win!", { y: 6, x: 2, color: color`7` });
            playTune(collection);
        }
    }
    
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

    if (hitTrap.length > 0) {
        playTune(hit);
        setMap(levels[level]); 
        jumpTicksLeft = 0; 
        portalCooldown = 0;
    }

    if (portalCooldown === 0 && (onPortalA.length > 0 || onPortalB.length > 0)) {
        const p = getFirst(ball);
        const exit = onPortalA.length > 0 ? getFirst(portalB) : getFirst(portalA);
        if (p && exit) {
            p.x = exit.x;
            p.y = exit.y;
            portalCooldown = 4;
        }
    }
}

afterInput(() => {
  checkCollision();
});

setInterval(() => {
  if (waitingForNextLevel) return; 
  if (portalCooldown > 0) portalCooldown -= 1;

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
