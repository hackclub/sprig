/*
@title: Spike_Avoider
@author: Hrushal Nikhare
@tags: ['endless']
@addedOn: 2023-05-16

¯\_(ツ)_/¯

press any button to start
W to go up
S to go down
D to move ahead
A to go back


change diff for a challenge
Recommended:
Easy: 250
Mid: 150
Hard: 75
*/
var diff = 250;
const player = "p";
const ground = "g";
const spike = "s";
const background = "b";
const playerflip = "f";
const spikeflip = "k";
const goal = "o"

setLegend(
    [
        player,
        bitmap`
....C...........
.....DDDDDD.....
LLLLLLLLLLLLLLLL
L22222222222222L
L22222222222222L
L22022222222022L
L22222222222222L
L22222222222222L
L22200000002222L
L22222222222222L
L22222222222222L
L22222222222222L
LLLLLLLLLLLLLLLL
....L......L....
....L......L....
....L......L....`,
    ],
    [
        playerflip,
        bitmap`
....L......L....
....L......L....
....L......L....
LLLLLLLLLLLLLLLL
L22222222222222L
L22222222222222L
L22222222222222L
L22220000000222L
L22222222222222L
L22222222222222L
L22022222222022L
L22222222222222L
L22222222222222L
LLLLLLLLLLLLLLLL
.....DDDDDD.....
...........C....`,
    ],
    [
        ground,
        bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
    ],
    [
        spike,
        bitmap`
................
.......00.......
......0220......
.....022220.....
....02222220....
...0222222220...
..022222222220..
.02222222222220.
0222222222222220
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
    ],
    [
        spikeflip,
        bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0222222222222220
.02222222222220.
..022222222220..
...0222222220...
....02222220....
.....022220.....
......0220......
.......00.......
................`,
    ],
    [
        background,
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
0000000000000000`,
    ],
    [
        goal,
        bitmap`
................
................
................
......33C.......
.....333C.......
....3333C.......
...33333C.......
..333333C.......
...33333C.......
....3333C.......
.....333C.......
......33C.......
........C.......
........C.......
........C.......
........C.......`,
    ],
);
var score = 0;
var started = false;
var running = false;
setSolids([spike, spikeflip]);

let level = 0;
const levels = [
    map`
...................
.p.....s...........
ggggggggggggggggggg
..........k........
...................`,

];

setBackground(background);
setMap(levels[level]);

setPushables({
    [player]: [],
    [playerflip]: [],
});
var up = 1;
var down = 0;

function reset() {
  setMap(levels[0]);
  clearInterval(hmm);
  score = 0;
  started = false;
  clearText()
  hmm = setInterval(ActualGameloop, 250)
  up = 1;
  down = 0;
}

onInput("w", () => {
    if (up === 0) {
        getFirst(playerflip).y -= 2;
        getFirst(playerflip).type = "p";
        up += 1;
        if (down === 1) {
            down = 0;
        }
    }
});

onInput("d", () => {
    try {
        getFirst(player).x += 1;
    } catch (exceptionVar) {
        getFirst(playerflip).x += 1;
    }
});
onInput("a", () => {
    try {
        getFirst(player).x -= 1;
    } catch (exceptionVar) {
        getFirst(playerflip).x -= 1;
    }
});
onInput("s", () => {
    if (down === 0) {
        getFirst(player).y += 2;
        getFirst(player).type = "f";
        down += 1;
        if (up === 1) {
            up = 0;
        }
    }
});

onInput("j", () => {
  reset()
});

var sp = 0

function Spawn() {
    if (sp === 0) {
        var ran = Math.floor(Math.random() * 4);
        if (ran == 0) {
            Down_Up_Up()
        } else if (ran == 1) {
            Up_Up_Down()
        } else if (ran == 2) {
            Up()
        } else if (ran == 3) {
            Downp()
        }
        sp = 4
    } else {
        sp -= 1
    }
}

function Up() {
    addSprite(width() - 4, 1, spike)
    addSprite(width() - 3, 1, spike)
    addSprite(width() - 2, 1, spike)
}

function Up_Up_Down() {
    addSprite(width() - 4, 1, spike)
    addSprite(width() - 3, 1, spike)
    addSprite(width() - 1, 3, spikeflip)
}

function Down_Up_Up() {
    addSprite(width() - 2, 1, spike)
    addSprite(width() - 1, 1, spike)
    addSprite(width() - 4, 3, spikeflip)
}

function Downp() {
    addSprite(width() - 2, 3, spikeflip)
    addSprite(width() - 1, 3, spikeflip)
    addSprite(width() - 4, 1, spike)
}

function kill() {
    let spikes = getAll(spike);

    for (let i = 0; i < spikes.length; i++) {
        if (spikes[i].x === 0) {
            clearTile(spikes[i].x, spikes[i].y)
        }
    }
    let spikesflip = getAll(spikeflip);

    for (let i = 0; i < spikesflip.length; i++) {
        if (spikesflip[i].x === 0) {
            clearTile(spikesflip[i].x, spikesflip[i].y)
        }
    }
}

function move() {
    let spikes = getAll(spike);

    for (let i = 0; i < spikes.length; i++) {
        spikes[i].x -= 1;
    }
    let spikesflip = getAll(spikeflip);
    for (let i = 0; i < spikesflip.length; i++) {
        spikesflip[i].x -= 1;
    }
}

function checkHit() {
    try {
        let obstacles = getAll(spike);
        let p = getFirst(player)
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
                return true;
            }
        }
    } catch (exceptionVar) {
        let obstacles = getAll(spikeflip);
        let p = getFirst(playerflip)
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
                return true;
            }
        }
    }

    return false;
}

afterInput(() => {
  if (!started){
    started = !started
  }
  if (checkHit()) {
        clearInterval(hmm);
        clearText();
            if (score >= 500){
          addText("Go touch Grass!",{
            x: 3,
            y: 1,
            color: color`4`
          })
        }
        addText("Game Over!", {
            x: 5,
            y: 3,
            color: color`3`
        });
        addText(`Your Score: ${score}`, {
            x: 3,
            y: 5,
            color: color`2`
        });
        addText("Press j to restart",{
          x: 1,
          y: 11,
            color: color`6`
        })
    }
})
function ActualGameloop(){
  if (started){
      kill()
    Spawn()
        if (checkHit()) {
        clearInterval(hmm);
        clearText();
        if (score >= 500){
          addText("Go touch Grass!",{
            x: 3,
            y: 1,
            color: color`4`
          })
        }
        addText("Game Over!", {
            x: 5,
            y: 3,
            color: color`3`
        });
        addText(`Your Score: ${score}`, {
            x: 3,
            y: 5,
            color: color`2`
        });
        addText("Press j to restart",{
          x: 1,
          y: 11,
            color: color`6`
        })
    }else{
      move()
    clearText()
    addText(`Score: ${score}`, {
        x: 6,
        y: 1,
        color: color`2`
    });
    score += 1
          
    }
  }
}
var hmm = setInterval(ActualGameloop, diff)