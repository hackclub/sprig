/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Slidestop
@description: GLIDE, STOP, GLIDE.
@author: aayanzaidi
@tags: ['retro', 'puzzle']
@addedOn: 2026-09-28
*/



// sproits

const player = "p"
const background = "b"
const obstacle = "w"
const obstacle2 = "m"
const exit = "g"
const white = "c"

// aret
setLegend(
  [ white, bitmap`
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
[ player, bitmap`
0000000000000000
0022222222222200
0222222222222220
0222222222222220
0222220000022220
0222200000002220
0222002000200220
0222000000000220
0220000020000020
0220000220000020
0220002200000220
0220000000002220
0222222222222220
0222222222222220
0022222222222200
0000000000000000` ],
  [ background, bitmap`
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
  
  [ obstacle, bitmap`
....2222222222..
...222222222222.
.22222222222222.
.22LLL2222111222
2222222222222222
2222222222222222
2222222222222222
2222111222222222
2222222222222222
2222222222222222
2222222222222222
2222LLL222211222
2222222222222222
.2222222222222..
..22222222222...
....22222222....` ],
  [ obstacle2, bitmap`
....22222222....
...22222222222..
.2222222222222..
.22LLL2222111222
2222222222222222
2222222222222222
2222222222222222
2222111222222222
2222222222222222
2222222222222222
2222222222222222
2222LLL222211222
.222222222222222
..222222222222..
...2222222222...
....22222222....` ],
  [ exit, bitmap`
0000000000000000
0000000000000000
0000006000000000
0000066600000000
0000666660000000
0006666666000000
0066666FF6600000
000666FFF6000000
00006FFF60000000
000006F600060000
0000006000666000
000000000666F600
00000000006F6000
0000000000060000
0000000000000000
0000000000000000` ],
)

// lebels

setBackground(background)

let level = 0; 
const levels = [
  map`
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc
ccccccccccccc`,
  // level 1
  map`
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbwbbbbb
bbbbbbbbbmbbb
pbbbbbbbbbwbb
mbbbbbbbbbbbb
bbbbbbmbbbmbb
bbbbbbbbbwbbb
bbbbbbbbbbbbb
bbbbbbwbbbbgb
bbbbbbbmbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb`,
  // level 2
  map`
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbmbbbbbb
bbbgbbbbbbbbb
bbbmbbbbbbbbb
bbbbbbbbbbwbb
bbbbbwbbbbmbb
bbbbbbbbbwbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbpmbbbbbbbb`,
  // level 3
  map`
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbmbbbbbbbbbb
bbbbbbbmbbbbb
bbbbwbbbbgwbb
bwbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbmbbbb
bbwmbbbbbbbbp
bbbbbbbbbbbbw
bbbbbbbbbbbbb
bbbbbbbbbbbbb`,
  // level 4
  map`
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
pbbbbwmbbmbbb
wbbbbbbbbgbbb
bbwbbbbbbbbbb
bbbbbbbbbbbbb
bmbbbbbbbbbbb
bbbbmbbbbbbbb
bbbbbbbwbbbbb
bbmbbbbbbbwbb
bbbbbbmbbbbbb
bbbbbbbbbbbbb`,
  // level 5
  map`
bbbbbbbbbbbbb
bbbbbbbbwbbbb
bbbbbwbbbbbbb
pbbbbbbbbwbbb
mbbwbbbbbbbbb
bbwbbbwbbbbbb
bbbbbbbbbbbbb
bbwbbbbbwbbbb
bbbbwbbbbbbbb
bbbbbbbbbbgbb
bbbmbbbbbbwbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb`,
  // level 6
  map`
bbbbbbbbbbbbbbb
bbbbbmbbbbbbbbb
bmbbbbbbbmbbmbb
bbbbmbbbbbbbbbb
bbgbbbbbbwbbbbb
bbwbbbbbbbbbbwb
bbbbwbbbbbbbbbb
bbbbbbbbbbwbbbb
bbbwbbbbbbbbbbb
bbbbbbbbbbbwbbb
bbwbbbbbbbbbbbb
bbbbbbbbbbbbwbb
bbbwbbbbbbbbbbb
bwbbbbbbbbbbbwb
bbbpwwbbbbbbbbb`,
  // level 7
  map`
bbbbbbbbbbbbb
bbwbbbbmbbbbb
bbbbbbbbbbmbb
pbbbbwbbbbbbb
mbbbbbbbwbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbwb
bwbbbbwbbwbbb
bbbbwbbbbbbbb
bbbbbbgbbbbbb
bbbbbbwbbbwbb
bbbbbbbbbbbbb`,
  // level 8
  map`
bbbbbbbbbbbbbbb
bbbbbbbbmbbbbbb
bbbbmbbbbbbbbbb
bwbbbbbmbbbbbbb
bbgwbbbbbbbbbbb
bbwbbmbbbbbmbbb
bbbbbbmbbbbbbbb
bbbbbbbbbmmbbbb
bbbbbbbmmbbbmbb
bbbbbbbbbbbbbbb
bbbbbbbbbmbbbbb
bbbbbbbbbbbbbbw
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbpwbbbbbbbbbb`,
  // level 9
  map`
bbbbbbbbbbbbbbb
bbbbbbbbbbwbbwb
bbbwbbbbbbbbbgb
bbbbbbbbbbbmbbb
bbbbbbwbbbbbwbb
bbwbbbwbbbbbmbb
bbbbbbbbbbbbbbb
bbbbmbbpbbwbbbb
bbbbbbbwbbbbbbb
bbwbbbbbbbbbmbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbwbbbbbbbbbwbb
bbbbbwbbbwbbbbb
bbbbbbbbbbbbbbb`,
  // level 10
  map`
bbbbbbbbbbbbbbbbb
bbbbbbmbbbbbbbbbb
bbgbbbbbbbbbbbbbb
bbwbbwbwbbbbbbbbb
bbbbwbbbwbbbbbbbb
bbbbbbbbbbbwbbbbb
bbbbmbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbwbbbbbbbbbbbbw
bbbbbbbbwbbbbbbbb
bbbbbbbbbbbbwbbbb
bbbbbbbbbbbbbbbbb
bbbbbwbbbbbbbbbbb
bbbbbbbwbbbbbbbbb
bbbbbbwbbwbbbbbwp
bbbbbbbbbbbbbbbbw`,
  // end
  map`
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb`,
]

setMap(levels[0])

addText("Slidestop!", { x: 4, y: 2, color: color`0` });
addText("Press J", { x: 4, y: 10, color: color`1` });
addText("To Start", { x: 4, y: 12, color: color`1` });

 

// INPUTSSSSSSS

onInput("j", () => {
  const currentLevel = levels[level];

  if (level === 0) {
    level = 1;
    setMap(levels[level]);
    clearText();
  }
  else if (level === levels.length - 1) {
    level = 1;
    setMap(levels[level]);
    clearText();
  }
  else if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

onInput("w", () => {slideBlob(0, -1)});
onInput("s", () => {slideBlob(0, 1)});
onInput("a", () => {slideBlob(-1, 0)});
onInput("d", () => {slideBlob(1, 0)});


// sloid

function slideBlob(dx, dy) {
  const p = getFirst(player);
  if (!p || p.isSliding) return; 
  
  p.isSliding = true; 
  function step() {
    let nextX = p.x + dx;
    let nextY = p.y + dy;
    if (nextX < 0 || nextX >= width() || nextY < 0 || nextY >= height()) { 
      p.isSliding = false; 
      return; 
    }
    if (getTile(nextX, nextY).map(tile => tile.type).includes("w") || getTile(nextX, nextY).map(tile => tile.type).includes("m")) { 
      p.isSliding = false; 
      return; 
    }
    p.x = nextX;
    p.y = nextY;
    setTimeout(step, 25);
    
    const currentTiles = getTile(p.x, p.y).map(tile => tile.type);
  
    if (currentTiles.includes(exit)) {
      p.isSliding = false; 
      level++;             
    
      if (level < levels.length) {
        setMap(levels[level]);
        if (level === levels.length - 1) {
          addText("YOU WON!", { x: 4, y: 2, color: color`2` });
          addText("Press J", { x: 4, y: 10, color: color`L` });
          addText("To Restart", { x: 4, y: 12, color: color`L` });
        }
      } 
    }
  }

  step(); 
}


