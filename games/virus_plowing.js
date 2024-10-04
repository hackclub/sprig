/*
@title: virus_plowing
@author: Danush Ramanan
@tags: ['endless']
@addedOn: 2022-11-11
*/

/*
CONTROLS:
  W - Move Up
  S - Move Down
  A - Move Left
  D - Move Right

  I - Info
  J - Restart
*/

class Obj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player extends Obj {
  constructor(x, y) {
    super(x, y);
  }

  move(dir) {
    switch(dir) {
      case 'w':
        this.y--;
        if (this.y <= 0) this.y = 0;
        break;
      case 'a':
        this.x--;
        if (this.x <= 0) this.x = 0;
        break;
      case 's':
        this.y++;
        if (this.y >= height()) this.y = height() - 1;
        break;
      case 'd':
        this.x++;
        if (this.x >= width()) this.x = width() - 1;
        break;
      default:
        break;
    }
  }

  update() {
    getFirst(playerKey).x = this.x;
    getFirst(playerKey).y = this.y;
  }
}

class Virus extends Obj {
  constructor(x, y) {
    super(x, y);
    this.toSpawn = true;
  }
}

const playerKey = "p";
const virusKey = "v";
const shieldKey = "s";

setLegend(
  [ playerKey, bitmap`
3333333333333333
3333333333333333
3333333333333333
3330003333000333
3330003333000333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
...33......33...
...33......33...
...33......33...
...33......33...
..3333....3333..`],
  [ virusKey, bitmap`
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
4444444444444444`],
  [ shieldKey, bitmap`
................
................
7......77......7
7777777777777777
7777777777777777
7777779779777777
7777999999997777
7777944444497777
7777794444977777
7777779449777777
.77777799777777.
.77777777777777.
..777777777777..
..777777777777..
...7777777777...
................` ]
);
setSolids([playerKey, shieldKey]);

let level = 0;
const levels = [
  map`
..................
.p................
...............v..
..................
..................
..................
..................
..................
.......s..........
..................
..................`,
  map`
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................`,
];
setMap(levels[level]);

setPushables({
  [ playerKey ]: [ shieldKey ],
});

let player = new Player(getFirst(playerKey).x, getFirst(playerKey).y);

const killVirusSound = tune`
124.48132780082987: c5~124.48132780082987,
124.48132780082987: f5~124.48132780082987 + c5-124.48132780082987,
124.48132780082987: f5-124.48132780082987,
3609.9585062240662`;
const dieSound = tune`
205.4794520547945: f5-205.4794520547945 + b4^205.4794520547945,
205.4794520547945: f5-205.4794520547945 + b4^205.4794520547945,
205.4794520547945: c5-205.4794520547945 + f4^205.4794520547945,
205.4794520547945: c5-205.4794520547945 + f4^205.4794520547945,
205.4794520547945: e5-205.4794520547945 + a4^205.4794520547945,
205.4794520547945: d5-205.4794520547945 + g4^205.4794520547945,
205.4794520547945,
205.4794520547945: b4/205.4794520547945,
205.4794520547945: b4/205.4794520547945,
4726.027397260274`;

let score = 0;
let showingInstructions = false;
let died = false;

function startGame() {
  score = 0;
  getFirst(virusKey).x = Math.floor(Math.random() * (width() - 3) + 2);
  getFirst(virusKey).y = Math.floor(Math.random() * (height() - 3) + 2);
  getFirst(shieldKey).x = Math.floor(Math.random() * (width() - 3) + 2);
  getFirst(shieldKey).y = Math.floor(Math.random() * (height() - 3) + 2);
  player.x = 1;
  player.y = 1;
  player.update()
}


startGame();

onInput("w", () => {
  player.move('w');
});
onInput("a", () => {
  player.move('a');
});
onInput("s", () => {
  player.move('s');
});
onInput("d", () => {
  player.move('d');
});

onInput("i", () => {
  if (level !== 0) return;
  if (!showingInstructions) {
    addText("Move with WASD.\nPush shield into \nvirus squares.\nDon't touch viruses!", { 
      x: 0,
      y: 2,
      color: color`3`
    })
  } else {
    clearText();
  }
  showingInstructions = !showingInstructions;
  
});

onInput("j", () => {
  if (died) return;
  clearText()
  level = 0;
  setMap(levels[level]);
  startGame();
});

afterInput(() => {
  if (level === 1) {
    clearText()
    setMap(levels[level]);
    addText("You Died", { 
      x: 6,
      y: 2,
      color: color`3`
    });
    addText(`Score: ${score}`, { 
      x: 6,
      y: 4,
      color: color`3`
    });
    addText("'J' to Restart", { 
      x: 3,
      y: 7,
      color: color`3`
    });
    died = false;
  } else {
    for (const virus of getAll(virusKey)) {
      if (player.x === virus.x && player.y === virus.y && !died) { // if player touches virus
        died = true;
        getFirst(playerKey).remove();
        playTune(dieSound);
        clearText();
        addText("Press Any Key.", { 
          x: 3,
          y: 2,
          color: color`3`
        })
        level = 1;
      }
      if (!died) player.update();

      if (getFirst(shieldKey).x === virus.x && getFirst(shieldKey).y === virus.y) { // if shield is in same spot as a virus, then destroy the virus
          virus.remove();
          playTune(killVirusSound);
          score++;
      }
    }  
    const allViruses = getAll(virusKey);
    let toVirusSpawn = Math.floor(Math.random() * 2); // gets if we spawn a virus
    var newVirus = undefined;
    if (toVirusSpawn === 1) {
      newVirus = new Virus(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()));
      if (newVirus.toSpawn && newVirus.x === player.x && newVirus.y === player.y && newVirus !== null) newVirus.toSpawn = false; // if the new virus spawns at the location of the player, don't spawn it
      if (newVirus.toSpawn && newVirus.x === getFirst(shieldKey).x && newVirus.y === getFirst(shieldKey).y && newVirus !== undefined) newVirus.toSpawn = false; // if the new virus spawns at the location of the shield, don't spawn it
    }
    
    for (const virus of getAll(virusKey)) {
      if ((toVirusSpawn === 1 && allViruses.length > 1 && newVirus !== undefined) && (newVirus.x === virus.x && newVirus.y === virus.y)) {
        if (!newVirus.toSpawn) break;
        newVirus.toSpawn = false; // if the new virus spawns at the location of another virus, don't spawn it
      }
    }
    
    if (toVirusSpawn && newVirus.toSpawn) addSprite(newVirus.x, newVirus.y, virusKey);    
  }

});
