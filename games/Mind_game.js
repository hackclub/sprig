/*
@title: Mind_game
@author: brunoblaise
@tags: ["puzzle" , "strategy"]
@addedOn: 2024-04-05

*/

/*
-----------------------
Inspiration from @veritasium 
Video: What Game Theory Reveals About Life, The Universe, and Everything
-----------------------

-----------------------
How To Play!
-----------------------
-Press 'j' to start the game
-Learn patterns the computer comes up with 
-Once you understand the patterns play a mind game with it
-Use the 'a' to cooperate with it and 'd' to deflect 
-Use the 'j' to start again and 'l' to restart the game
-Try beating the game!
-----------------------
*/
const boardP = "l"
const boardM = "r"
const background = "o"
const deflect = "e"
const cooperate = "I"
const deflectM = "t"
const cooperateM = "p"

//Booleans
let started = false;
let disabled = true;

//Start values
let track = 0;
let level = 0;
let scoreP = 0;
let scoreM = 0;


//Sounds
const startTune = tune`
1500,
500: C4~500 + D4~500 + E4~500,
500: F4~500 + G4~500 + A4~500 + B4~500,
500: B4~500 + C5~500,
500: C5~500,
500: C5~500 + E5~500 + F5~500,
500: C5~500 + D5~500,
11500`
const endTune = tune`
4000,
500: G5~500,
500: F5~500 + E5~500,
500: D5~500,
500: C5~500 + B4~500,
500: A4~500 + G4~500,
500: F4~500 + E4~500,
500: E4~500,
500: E4~500,
500: E4~500,
500: E4~500 + D4~500,
500: D4~500 + C4~500,
6500`
const cooperateS = tune`
1000,
500: C4-500,
14500`
const deflectS = tune`
1000,
500: C4/500,
14500`

setLegend(
  [cooperate, bitmap`
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
.....44444444...
.....44444444...
.....44444444...
.....44444444...
................
................`],
  [deflect, bitmap`
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
.....33333333...
.....33333333...
.....33333333...
.....33333333...
................
................`],
  [cooperateM, bitmap`
................
................
................
................
................
....44444444....
....44444444....
....44444444....
....44444444....
................
................
................
................
................
................
................`],
  [deflectM, bitmap`
................
................
................
................
................
....33333333....
....33333333....
....33333333....
....33333333....
................
................
................
................
................
................
................`],
  [boardP, bitmap`
................
................
................
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
FFFFFFFFFFFFFFFF`],
  [boardM, bitmap`
FFFFFFFFFFFFFFFF
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CC22222222222222
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],

)
setSolids([cooperate, deflect, deflectM, cooperateM, boardP, boardM])

function startGame() {

  started = true
  clearText()
  addText("Use cooperate or \ndeflect to win \nthe game use \nthem wisely \npress 'j' again", {
    x: 2,
    y: 2,
  })

}


function again() {

  playTune(endTune)
  clearText()
  scoreP = 0;
  scoreM = 0;
  level = 0;

}


//Nextlevel funcion
function nextLevel() {
  if (scoreP === scoreM || scoreP > scoreM) {
    if (level === 3) {
      clearText()
      addText("Wow you are amazing ", {
        x: 1,
        y: 1,
        color: `9`
      })
      level = 0;
      setTimeout(restart, 5000)
    } else {
      clearText()
      addText("Be careful this \nlevel \nis way harder", {
        x: 2,
        y: 2
      })
      level++;
      setTimeout(restart, 5000)
    }

  } else if (scoreP === 100) {
    clearText()
    addText("Wow you are amazing", {
      x: 1,
      y: 2,
      color: `9`
    })
    again()
  } else {
    clearText()
    addText("Restart the game \npress 'l'", {
      x: 2,
      y: 2
    })
    disabled = true
  }


}
//Refreshing the game function
function restart() {
  clearText()
  setMap(levels[level]);
  setTimeout(() => { track = 0 }, 200);
  started = false;
  addText("Press 'J' To Start", {
    x: 1,
    y: 2
  })
  disabled = true
}

//Machine input function
function machine(input, track) {
  if (level === 0) {
    if (input === 'a') {
      addSprite(track, 5, cooperateM)
      setTimeout(() => { scoreP += 5 }, 10)
      setTimeout(() => { scoreM += 5 }, 10)
    } else if (input === 'd') {
      addSprite(track, 5, deflectM)
      setTimeout(() => { scoreP += 0 }, 100)
      setTimeout(() => { scoreM += 0 }, 100)
    }
  } else if (level === 1) {
    let r = Math.round(Math.random(2))
    let gameAr = [deflectM, cooperateM]
    addSprite(track, 5, gameAr[r])
    if (input === 'a' && r === 0) {
      setTimeout(() => { scoreM += 5 }, 10)
    } else if (input === 'a' && r === 1) {
      setTimeout(() => { scoreP += 5 }, 10)
      setTimeout(() => { scoreM += 5 }, 10)
    } else if (input === 'd' && r === 0) {
      setTimeout(() => { scoreM += 0 }, 10)
      setTimeout(() => { scoreP += 0 }, 10)
    } else if (input === 'd' && r === 1) {
      setTimeout(() => { scoreP += 5 }, 10)
    }
  } else if (level === 2) {
    let isDeflect = 0;
    let r = Math.round(Math.random(2))
    let gameAr = [deflectM, cooperateM]
    let choice = isDeflect > 0 ? deflectM : gameAr[r];
    addSprite(track, 5, choice)
    if (input === 'a' && choice === deflectM) {
      setTimeout(() => { scoreM += 5 }, 10)
    } else if (input === 'a' && choice === cooperateM) {
      setTimeout(() => { scoreM += 5 }, 10)
      setTimeout(() => { scoreP += 5 }, 10)
      isDeflect++
    } else if (input === 'd' && choice === cooperateM) {
      setTimeout(() => { scoreP += 5 }, 10)
    } else if (input === 'd' && choice === deflectM) {
      setTimeout(() => { scoreM += 0 }, 10)
      setTimeout(() => { scoreP += 0 }, 10)
      isDeflect++
    }

  } else if (level === 3) {
    addSprite(track, 5, deflectM)
    if (input === 'a') {
      setTimeout(() => { scoreM += 5 }, 10)
    } else if (input === 'd') {
      setTimeout(() => { scoreM += 0 }, 10)
      setTimeout(() => { scoreP += 0 }, 10)
    }
  }
}
//Manages play addSprite and final level
function manage(track, input) {
  let sound = input === 'a' ? playTune(cooperateS) : playTune(deflectS);
  let play = input === 'a' ? cooperate : deflect;
  addSprite(track, 4, play)
  machine(input, track)
  if (level === 0 && track === 6) {
    nextLevel()
    disabled = true
  } else if (level === 1 && track === 7) {
    nextLevel()
    disabled = true
  } else if (level === 2 && track === 9) {
    nextLevel()
    disabled = true
  } else if (level === 3 && track === 11) {
    nextLevel()
    disabled = true
  }

}
//user input function
function checkInput(input) {
  addText("ScoreP: " + scoreP, {
    x: 1,
    y: 1,
    color: `9`
  })
  addText("ScoreM: " + scoreM, {
    x: 1,
    y: 2,
    color: `9`
  })
  if (disabled === true) {
    clearText()
    addText("The game is \ndisabled press 'j'", {
      x: 1,
      y: 2
    })
  } else if (disabled === false) {
    if (track === 0) {
      manage(track, input)
      track += 1
    } else {
      manage(track, input)
      track += 1
    }
  }

}


// levels
const levels = [
  map`
........
........
........
........
lllllll.
rrrrrrr.`,
  map`
........
........
........
........
llllllll
rrrrrrrr`,
  map`
..........
..........
..........
..........
llllllllll
rrrrrrrrrr
..........`,
  map`
............
............
............
............
llllllllllll
rrrrrrrrrrrr
............
............
............`,

]

setMap(levels[level])

addText("Press 'J' To Start", {
  x: 1,
  y: 2
})
//Start the game
onInput("j", () => {
  if (started === false) {
    playTune(startTune)
    clearText()
    setTimeout(() => {
      addText("Your are going to \nplay a mind game \nplay it wisely", {
        x: 2,
        y: 2,
      })
    }, 200)
    disabled = true
    setTimeout(startGame, 2000)

  } else {
    clearText()
    disabled = false
    addText("cooperate press 'A' ", {
      x: 1,
      y: 4,
    })
    addText("Deflect press 'D'", {
      x: 1,
      y: 6,
    })
  }
})
//cooperate
onInput("a", () => {
  checkInput('a')
})

//Deflect
onInput("d", () => {
  checkInput('d')
})

//Start at the beginning
onInput("l", () => {
  again()
  addText("Restarting...", {
    x: 1,
    y: 2
  })
  setTimeout(restart, 4000)
})


setBackground(background)
