/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hole In the Wall
@author: Abel0000 
@tags: []
@addedOn: 2024-08-23

Instructions:
Right handed movement

i key to place filling
j-k-l to use first second and third power up

Possible power-ups:
Extra time
Lessen difficulty
Re generate map

*/
let countdownTimeout;
var countDownValue;

const player = "p"
const filled = "w"
const regen = "r"
const extratime = "x"
const lowerdiff = "l"

const melody = tune`
434.7826086956522: D4^434.7826086956522 + D5~434.7826086956522,
434.7826086956522: F4^434.7826086956522 + F5~434.7826086956522,
434.7826086956522: D4^434.7826086956522,
434.7826086956522: F4^434.7826086956522 + F5~434.7826086956522,
434.7826086956522: D4^434.7826086956522 + A5~434.7826086956522,
434.7826086956522: F4^434.7826086956522 + F5~434.7826086956522,
434.7826086956522: A4^434.7826086956522 + D5~434.7826086956522,
434.7826086956522: F4^434.7826086956522 + E5~434.7826086956522,
434.7826086956522: E4^434.7826086956522 + F5~434.7826086956522,
434.7826086956522: F4^434.7826086956522,
434.7826086956522: D4~434.7826086956522 + D5^434.7826086956522,
434.7826086956522: F4~434.7826086956522 + F5^434.7826086956522,
434.7826086956522: D4~434.7826086956522 + D5^434.7826086956522,
434.7826086956522: F4~434.7826086956522 + F5^434.7826086956522,
434.7826086956522: A4~434.7826086956522 + A5^434.7826086956522,
434.7826086956522: F4~434.7826086956522 + F5^434.7826086956522,
434.7826086956522: E4~434.7826086956522 + D5^434.7826086956522,
434.7826086956522: D4~434.7826086956522 + F5^434.7826086956522,
434.7826086956522: C4~434.7826086956522 + D5^434.7826086956522,
434.7826086956522: E4~434.7826086956522,
434.7826086956522,
434.7826086956522: D4~434.7826086956522,
434.7826086956522: A4~434.7826086956522,
434.7826086956522: D4~434.7826086956522,
434.7826086956522: F4~434.7826086956522,
434.7826086956522: A4~434.7826086956522,
434.7826086956522: F4~434.7826086956522,
434.7826086956522: D4~434.7826086956522,
434.7826086956522: C4~434.7826086956522,
434.7826086956522: D4~434.7826086956522,
434.7826086956522: E4~434.7826086956522,
434.7826086956522: C4~434.7826086956522`
playTune(melody, Infinity)
var roundCounter = 0;
var powerUps = []
var stopCountdown = false;
var inMainMenu = true;
var inTutorial = false;


setLegend(
  [player, bitmap`
1111111111111111
1333333333333331
130..........031
13.0........0.31
13..0......0..31
13...0....0...31
13....0..0....31
13.....00.....31
13.....00.....31
13....0..0....31
13...0....0...31
13..0......0..31
13.0........0.31
130..........031
1333333333333331
1111111111111111`],
  [regen, bitmap`
................
................
................
.....000000.....
....0......0....
...0............
...0........0...
...0.......000..
...0......0.0.0.
...0........0...
...0........0...
....0......0....
.....000000.....
................
................
................`],
  [extratime, bitmap`
................
................
................
....00000000....
....0......0....
.....011110.....
......0110......
.......00.......
.......00.......
......0..0......
.....0....0.....
....01111110....
....00000000....
................
................
................`],
  [lowerdiff, bitmap`
................
................
................
................
.......00.......
.......00.......
.......00.......
.......00.......
....0..00..0....
....0..00..0....
.....0.00.0.....
......0000......
.......00.......
................
................
................`],
  [filled, bitmap`
1111111111111111
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1111111111111111`]
)

setSolids([])
var level = map`
.....
.....
.....
.....
.....
.....`
var mainMenu = map`
wwwww
wwwww
wwwww
wwwww
wwwww
wwwww`
var tutorial = map`
r....
....w
x....
....p
l....
.....`
if (inMainMenu) {
  setMap(mainMenu)
  addText("W(Top) \nto start \nthe game", {
    x: 5,
    y: 1,
    color: color`5`
  })

  addText("S(Bottom)\n for tutorial", {
    x: 4,
    y: 6,
    color: color`5`
  })


}

function killCountdown() {
  stopCountdown = true;

  countDownValue = 0;

  if (countdownTimeout) {
    clearTimeout(countdownTimeout);
  }
}

function generateLevel() {
  if (!inMainMenu) {
    clearText()
    var powerUpCount = 0;
    roundCounter++;
    difficulty += 1;
    level = map`
.....
.....
.....
.....
.....
.....`
    setMap(level)
    for (var i = 0; i < 30; i++) {
      if (playerPos == i) {

        addSprite(i % 5, Math.floor(i / 5), player)

        //continue;
      }
      //  if (i % 6 == 0) {
      //   level += "\n";
      //   continue;
      // }

      if (Math.floor(Math.random() * 17 > difficulty)) {
        addSprite(i % 5, Math.floor(i / 5), filled)
        if (powerUpCount < 2) {
          if (Math.floor(Math.random() * 6) == 1) {
            powerUpCount++;
            switch (Math.floor(Math.random() * 3)) {
              case 0:
                addSprite(i % 5, Math.floor(i / 5), regen)

                break;
              case 1:
                addSprite(i % 5, Math.floor(i / 5), extratime)

                break;
              case 2:
                addSprite(i % 5, Math.floor(i / 5), lowerdiff)

                break;
            }
          }
        }


      }

    }
    checkLevel(true)
    constructPowerUpString()
    stopCountdown = false
    startCountdown(8)
    pickPowerUp()
  }
}

var playerPos = Math.floor(Math.random() * 30);
console.log(playerPos)


var difficulty = 1 + roundCounter;

generateLevel();


function pickPowerUp() {
  if (powerUps.length < 3) {
    var pX = getFirst(player).x
    var pY = getFirst(player).y
    //Regen Level
    if (getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type == regen)) {
      clearTile(pX, pY)
      addSprite(pX, pY, player)
      addSprite(pX, pY, filled)
      powerUps += "r";
    }
    if (getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type == extratime)) {
      clearTile(pX, pY)
      addSprite(pX, pY, player)
      addSprite(pX, pY, filled)
      powerUps += "x";
    }
    if (getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type == lowerdiff)) {
      clearTile(pX, pY)
      addSprite(pX, pY, player)
      addSprite(pX, pY, filled)
      powerUps += "l";
    }
  }
  constructPowerUpString()
}
//First ability

function constructPowerUpString() {
  var string = "Powerups:"
  for (var i = 0; i < powerUps.length; i++) {
    string += powerUps[i] + " "
  }
  clearText();
  addText(string, {
    x: 3,
    y: 14,
    color: color`5`
  })
  if (countDownValue != 0 || stopCountdown == false) {
    addText(`Countdown: ` + countDownValue, {
      x: 4,
      y: 2,
      color: color`5`
    })
  }
}


function usePowerUps(aN) {
  if (aN > powerUps.length - 1) return;
  if (powerUps[aN] == "r") {
    killCountdown()

    generateLevel()
    difficulty -= 1;
    roundCounter -= 1;

  }
  if (powerUps[aN] == "l") {
    difficulty -= 4;
    killCountdown()

    generateLevel()

    roundCounter -= 1;

  }
  if (powerUps[aN] == "x") {

    let timeBefore = countDownValue;
    killCountdown()

    stopCountdown = false
    startCountdown(8 + timeBefore)
  }

  if (powerUps.length == 1) {
    powerUps = []
  }

  if (powerUps.length == 2) {
    if (aN == 0)
      powerUps = [powerUps[aN + 1]];
    if (aN == 1)
      powerUps = [powerUps[aN - 1]];
  }
  if (powerUps.length == 3) {
    if (aN == 0)
      powerUps = [powerUps[aN + 1], powerUps[aN + 2]];
    if (aN == 1)
      powerUps = [powerUps[aN - 1], powerUps[aN + 1]];
    if (aN == 2)
      powerUps = [powerUps[aN - 2], powerUps[aN - 1]];
  }
  if (powerUps.length > 3) {
    //I don't have the energy to deal with this
    powerUps = [];
  }

  constructPowerUpString()
}

onInput("j", () => {
  usePowerUps(0)
})
//Second ability

onInput("k", () => {
  usePowerUps(1)

})
//Third ability

onInput("l", () => {
  usePowerUps(2)

})

setPushables({
  [player]: []
})
onInput("d", () => {
  if (inMainMenu && inTutorial) {
    clearText()
    setMap(mainMenu)
    addText(`I to \nplace block`, {
      x: 4,
      y: 1,
      color: color`5`
    });
    addText(`J-K-L for\n1st 2th 3rd \nabilities`, {
      x: 4,
      y: 4,
      color: color`5`
    });
    addText(`Abilities\n(r-x-l)\nrandomly spawn`, {
      x: 3,
      y: 8,
      color: color`5`
    });

    addText(`W to start`, {
      x: 5,
      y: 12,
      color: color`5`
    });
    return;
  }
  getFirst(player).x += 1
  pickPowerUp()
})

onInput("a", () => {
  if (inMainMenu) {

    return;
  }
  getFirst(player).x -= 1
  pickPowerUp()
})

onInput("w", () => {
  if (inMainMenu) {

    inMainMenu = false;
    generateLevel()
    return;
  }
  getFirst(player).y -= 1
  pickPowerUp()
})

onInput("s", () => {
  if (inMainMenu) {
    inTutorial = true;
    setMap(tutorial)
    clearText();
    addText(`Regenerate\n map (r)`, {
      x: 6,
      y: 0,
      color: color`5`
    });

    addText(`Filled Place `, {
      x: 3,
      y: 4,
      color: color`5`
    });
    addText(`Extra time (x) `, {
      x: 3,
      y: 6,
      color: color`5`
    });
    addText(`You, WASD\nmovement `, {
      x: 4,
      y: 8,
      color: color`5`
    });

    addText(`    Lessen\ndifficulty(l) `, {
      x: 4,
      y: 12,
      color: color`5`
    });

    addText(`Page2 press D `, {
      x: 3,
      y: 15,
      color: color`5`
    });
    return;
  }
  getFirst(player).y += 1
  pickPowerUp()
})

onInput("i", () => {
  if (inMainMenu) {

    return;
  }
  addSprite(getFirst(player).x, getFirst(player).y, filled)
  console.log("diffculty: " + difficulty)
  checkLevel(false);
})

function checkLevel(isGenerated) {
  var x = 0;
  var y = 0;
  for (var i = 0; i < 30; i++) {

    //console.log(getTile(i % 5,y = Math.floor(i / 5)).some(sprite => sprite.type == filled))
    if (!getTile(i % 5, y = Math.floor(i / 5)).some(sprite => sprite.type == filled)) return;
  }
  if (isGenerated) {
    generateLevel();
    roundCounter -= 1;
    difficulty -= 1;
    return;
  }
  clearText()
  addText("Good Job", {
    x: 10,
    y: 4,
    color: color`3`
  })
  setTimeout(() => {
    generateLevel()
  }, 550)
}
let timeOfLastCall = Date.now();
async function countDownDowner() {
  const currentTime = Date.now();
  if (currentTime - timeOfLastCall >= 1000) {
    countDownValue -= 1;
    timeOfLastCall = currentTime;
  } else {}
}




//async
async function startCountdown(seconds) {
  for (countDownValue = seconds; countDownValue > 0;) {
    //if (stopCountdown == true) return;
    clearText();
    constructPowerUpString();
    addText(`Countdown: ` + countDownValue, {
      x: 4,
      y: 2,
      color: color`5`
    });
    //if (stopCountdown == true) return;

    countDownDowner()
    await new Promise(resolve => {
      countdownTimeout = setTimeout(resolve, 1000);
    });

  }
  if (!stopCountdown) {
    clearText();
    addText("Fail!\n Score: " + (roundCounter - 1), {
      x: 4,
      y: 2,
      color: color`5`
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
    resetGame();
  }
}






function resetGame() {
  killCountdown()

  roundCounter = 0;
  powerUps = []
  difficulty = 1 + roundCounter;
  level = map`
.....
.....
.....
.....
.....
.....`
  generateLevel()
}




afterInput(() => {

})

