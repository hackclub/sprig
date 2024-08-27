/*
Sprig Space Game:

Press a and d to move the spaceship left and right to avoid the missiles!
Land on the intershapce helipads to temeporarily get away from the missiles!
See how long you can last and up the difficulty by disabling helipads!

Buttons:
 - a: Move spaceship left.
 - d: Move the spaceship right.
 - i: Enable difficult mode and disable helipads.
 - k: Disable difficult mode and enable helipads.
 - w: Restart the game once you inevitably hit a missile.

@title: Space Game
@author: Abhimanyu Chaudhary
@tags: []
@addedOn: 2024-08-13
*/

const player = "p"
const helipad = "h";
const missile = "m";
const explosion = "e";
const space = "s";
const boom = tune`
48.62236628849271,
48.62236628849271: F4/48.62236628849271 + C4-48.62236628849271 + E4^48.62236628849271 + D5-48.62236628849271 + C5-48.62236628849271,
48.62236628849271: A4/48.62236628849271 + C4-48.62236628849271 + G4^48.62236628849271 + E5-48.62236628849271 + D5-48.62236628849271,
48.62236628849271: C5/48.62236628849271 + C4-48.62236628849271 + B4^48.62236628849271 + G5-48.62236628849271,
48.62236628849271: F5/48.62236628849271 + C4-48.62236628849271 + E5^48.62236628849271 + A5-48.62236628849271 + B5-48.62236628849271,
48.62236628849271: F5/48.62236628849271 + C4-48.62236628849271 + E5^48.62236628849271 + B5-48.62236628849271 + A5-48.62236628849271,
48.62236628849271: D5/48.62236628849271 + B4/48.62236628849271 + C4-48.62236628849271 + A4^48.62236628849271 + G5-48.62236628849271,
48.62236628849271: A4/48.62236628849271 + F4/48.62236628849271 + C4-48.62236628849271 + C5^48.62236628849271 + G4^48.62236628849271,
48.62236628849271: E4/48.62236628849271 + C4-48.62236628849271 + D4^48.62236628849271,
1118.3144246353322`;
const move = tune`
107.52688172043011: A4^107.52688172043011 + G4-107.52688172043011,
3333.3333333333335`;
const music1 = tune`
230.76923076923077: F4~230.76923076923077 + D5~230.76923076923077,
230.76923076923077: G4~230.76923076923077 + C5~230.76923076923077,
230.76923076923077: A4~230.76923076923077 + D5~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: G4~230.76923076923077 + E5~230.76923076923077,
230.76923076923077: F4~230.76923076923077 + C5~230.76923076923077,
230.76923076923077: E4~230.76923076923077 + D5~230.76923076923077,
230.76923076923077: F4~230.76923076923077 + C5~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: F4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: F4~230.76923076923077,
230.76923076923077: G5~230.76923076923077 + A4~230.76923076923077,
230.76923076923077: F4~230.76923076923077 + C5~230.76923076923077,
230.76923076923077: G4~230.76923076923077 + E5~230.76923076923077,
230.76923076923077: F5~230.76923076923077 + B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077 + D5~230.76923076923077,
230.76923076923077: F5~230.76923076923077 + C5~230.76923076923077,
230.76923076923077: D5~230.76923076923077 + F4~230.76923076923077,
230.76923076923077: G4~230.76923076923077 + E5~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: F5~230.76923076923077 + G4~230.76923076923077,
230.76923076923077,
230.76923076923077: E5~230.76923076923077 + B4~230.76923076923077,
230.76923076923077: C5~230.76923076923077`;

setLegend(
  [player, bitmap`
................
................
................
.......6F.......
......7777......
.....773C77.....
....7734DC77....
...7734DDDC77...
..7774D11DD777..
..655D1CC1D55F..
......9339......
.....669966.....
....6.6..6.6....
................
................
................`],
  [helipad, bitmap`
................
................
.....111111.....
...3111111113...
...C16111161C...
..111611116111..
..111611116111..
..111666666111..
..1116FFFF6111..
..111611116111..
..131611116131..
..LC1F1111F1CL..
...C11111111C...
....L111111L....
.....LLLLLL.....
................`],
  [missile, bitmap`
....9.9..9.9....
.....999999.....
....3333333C....
.....36636F.....
.....63663F.....
.....66366C.....
.....36636F.....
.....63663F.....
.....66366C.....
.....36636F.....
.....63663F.....
.....33333C.....
......333C......
.......3C.......
................
................`],
  [explosion, bitmap`
6060060006660006
0006969666996600
0069696666666900
0666969999666660
6069999399669960
6069399933999660
0699933333339600
069333CCC3996606
09399333C3996660
0696933333996960
0669399399396660
6069966939996666
0666669669666660
0006696966696600
6069666666666006
0006066000000600`],
  [space, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setSolids([player])

let level = 0
const levels = [
  map`
sssss
sssss
sssss
sssss
sssss
sssss`,
  map`
e`
]


level = 0;
setMap(levels[level]);
const count = 0
let dead = false;
let difficult = false;
let time = 0;
let speed = 700;
let m1;
let mbool = false;

addSprite(2, 4, player);


function moveMissiles() {
  getAll(missile).forEach((missile) => {
  missile.y += 1; });
}

function checkCollision() {
    if (tilesWith(missile, player).length === 1) 
  {
    if (count < 1) {
      m1.end();
      playTune(boom);
      dead = true;
      level = 1;
      setMap(levels[level]);
      clearText();
      time = 0;
      speed = 700;
      const count = 1;
    }
  }
  else {
    
  }
}

function checkHelipadLanding() {
  if (tilesWith(player, helipad).length === 1) {

  
    
    for(let xval = 0; xval < 5; xval++) {
      for(let yval = 0; yval < 6; yval++) {
        if (getTile(xval, yval).some(sprite => sprite.type === missile)) checkCollision();
        if (getTile(xval, yval).some(sprite => sprite.type === missile)){
          clearTile(xval, yval);
          addSprite(xval, yval, space);
        }
      }
    }
  }
}

function addMissile() {
    let yval = 0;
    xval = Math.floor(Math.random() * 5);
  if (!dead) {
      addSprite(xval, yval, missile);
  }
}

function addHelipad() {
    let yval = 0;
    xval = Math.floor(Math.random() * 5);
  if (!dead) {
    if (!difficult) addSprite(xval, yval, helipad);
  }
}

function moveHelipad() {
  getAll(helipad).forEach((helipad) => {
  helipad.y += 1; });
}

function deleteMissile() {
  if (getTile(0, 5).length >= 2)   clearTile(0, 5);
  if (getTile(1, 5).length >= 2)   clearTile(1, 5);
  if (getTile(2, 5).length >= 2)   clearTile(2, 5);
  if (getTile(3, 5).length >= 2)   clearTile(3, 5);
  if (getTile(4, 5).length >= 2)   clearTile(4, 5);

  if (!dead) {
    for(let xval = 0; xval < 5; xval++) {
      for(let yval = 0; yval < 6; yval++) {
        addSprite(xval, yval, space);
      }
    }
  }
}

function clear() {
  clearTile(0, 0);
}

onInput("a", () => {
  if (!dead) if (getFirst(player).x > -1) {
    getFirst(player).x -= 1;
    playTune(move);
  }
});

onInput("d", () => {
  if (!dead) if (getFirst(player).x < 5) {
    getFirst(player).x += 1;
    playTune(move);
  }
});

onInput("w", () => {
  if (dead) {
    level = 0;
    dead = false;
    const count = 0;
    setMap(levels[level]);
    addSprite(2, 4, player);
    const check = setInterval(checkCollision, 20);
  }
});

function addSpace() {
  tilesWith().forEach((tile) => {
    addSprite(tile[0], tile[1], space);
  })
}

if (!dead) {
  let move = setInterval(() => {
    moveMissiles();
    }
    , speed);
  const update = setInterval(() => {
    clearInterval(move);
        if (speed >= 100) speed -= 10;
    move = setInterval(moveMissiles, speed);
  }, 10000);
      let mplayer;
  const mstart = setInterval(() => {
    if (!dead && !mbool) {
      m1 = playTune(music1, Infinity);
      clearText();
      mbool = true;
    }
  }, 10);

  const mstop = setInterval(() => {
    if (dead && mbool) {
      m1.end();
      addText("You Died!", {y:3, color:color`0`});
      mbool = false;
    }
  }, 10);
  const check = setInterval(checkCollision, 20);
  const deleteTheMissiles = setInterval(deleteMissile, 20);
  const add = setInterval(addMissile, 700);
  const addHeli = setInterval(addHelipad, 10000);
  const moveHeli = setInterval(moveHelipad, 700);
  const helipadLand = setInterval(checkHelipadLanding, 100);
  const timed = setInterval(() => { 
    if (!dead) {
      time = updateTimer(time);
      addText((time/10).toString(), {color:color`2`});
      }
    }
    , 100);
}
else {
  setInterval(clear, 20);
  clearInterval(m);
  clearInterval(move);
  clearInterval(deleteTheMissiles);
  clearInterval(add);
  clearInterval(addHeli);
  clearInterval(moveHeli);
  clearInterval(timed);
}

onInput("k", () => {
  if (!dead) difficult = false;
});

onInput("i", () => {
  if (!dead) difficult = true;
});

function updateTimer(timer) {
  if (!dead) {
    timer += 1;
    return timer;
  }
}

