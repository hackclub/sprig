/*
@title: UpSideDown
@author: Sidak08
@tags: ['endless','retro']
@addedOn: 2024-06-26
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const upSideDownPlayer = "b"
const floor = "f";
const red = "r"
const black = "c"
let counter = 0
let platform = 0
let lenCounter = 0
let lenCounterLimit = 5
let gravity = "down"
let speed = 300
let hasGameEnded = false
let timeTillStart = 300
let score = 0
//console.log("resetting counter")

addText(
  ` 
    How To Play

W to flip gravity

S for opposite

walk on/under block

Do not hit them 

or fall in the void

game start in ${timeTillStart}
  `, {
    x: 1,
    y: 1,
    color: color`2`
  })

const myTune = tune`
100: B5^100 + E4~100,
100: C4~100 + A5^100 + A4-100 + E4~100,
100: D4~100 + G5^100 + B4-100 + F4~100,
100: E4~100 + F5^100 + C5-100 + A5/100 + G4~100,
100: F4~100 + E5^100 + D5-100 + A5/100 + G5/100,
100: G4~100 + D5/100 + E5/100 + A4~100 + B4~100,
100: A4~100 + C5/100 + E5-100 + B4~100,
100: B4~100 + F5-100 + A4/100,
100: C5~100 + B4^100 + F5-100 + D4-100 + G4/100,
100: D5~100 + A4^100 + F5-100 + D4-100 + B4/100,
100: E5/100 + G4^100 + E4-100 + D5/100,
100: F5/100 + F4-100 + E5-100 + G5/100,
100: G5~100 + E4^100 + G4-100 + A5/100,
100: A5/100 + D4^100 + A4-100 + B5/100,
100: B5~100 + C4^100 + B4-100 + C5-100 + A5/100,
100: A5~100 + D4^100 + G5/100 + E4/100 + G4/100,
100: G5~100 + E4/100 + A4-100 + F5/100 + G4/100,
100: F5~100 + F4^100 + A4-100 + E5/100 + E4/100,
100: E5~100 + G4^100 + A4-100 + D5/100 + E4/100,
100: D5~100 + A4-100 + G5-100 + C5/100 + B4/100,
100: C5~100 + B4^100 + G5-100 + A4/100 + G4/100,
100: B4~100 + C5^100 + F5-100 + A4-100 + F4/100,
100: A4-100 + D5/100 + E5-100 + E4~100 + F4~100,
100: G4~100 + E5/100 + A4-100 + F4~100,
100: F4~100 + F5/100 + D5-100 + A4~100,
100: E4~100 + G5^100 + C5-100 + A4-100 + F5/100,
100: D4~100 + A5^100 + B4-100 + A4-100 + G5/100,
100: C4~100 + B5^100 + B4-100 + A4-100 + D5~100,
100: D4~100 + A5^100 + A4-100 + E5~100 + B5~100,
100: E4~100 + G5^100 + B5~100 + A5~100,
100: F4~100 + F5^100 + G5~100,
100: G4~100 + E5^100 + G5~100 + F5~100`
const die = tune `
71.09004739336493,
71.09004739336493: A5~71.09004739336493 + D4~71.09004739336493,
71.09004739336493: A5~71.09004739336493 + D4~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + G5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + G5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + F5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + F5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + F5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + E5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + E5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + D5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + C5~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + B4~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + B4~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + A4~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + G4~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + G4~71.09004739336493 + F4~71.09004739336493,
71.09004739336493: D4~71.09004739336493 + F4~71.09004739336493 + E4~71.09004739336493,
995.260663507109`
const playback = playTune(myTune, Infinity);


setLegend(
  [
    player,
    bitmap`
................
................
......4444......
.....4DDDD4.....
....94DDDD49....
....44DDDD44....
.....909909.....
.....999999.....
......9999......
.......99.......
....66666666....
....6.6666.6....
....6.6666.6....
......6666......
......5..5......
......5..5......`,
  ],
  [
    upSideDownPlayer,
    bitmap`
......5..5......
......5..5......
......6666......
....6.6666.6....
....6.6666.6....
....66666666....
.......99.......
......9999......
.....999999.....
.....909909.....
....44DDDD44....
....94DDDD49....
.....4DDDD4.....
......4444......
................
................`,
  ],
  [
    floor,
    bitmap`

CCCCCCCCCCCCCCCC
C99999999999999C
C9CCCCCCCCCCCC9C
C9C9999999999C9C
C9C9CCCCCCCC9C9C
C9C9C999999C9C9C
C9C9C9CCCC9C9C9C
C9C9C9C99C9C9C9C
C9C9C9C99C9C9C9C
C9C9C9CCCC9C9C9C
C9C9C999999C9C9C
C9C9CCCCCCCC9C9C
C9C9999999999C9C
C9CCCCCCCCCCCC9C
C99999999999999C
CCCCCCCCCCCCCCCC`,
  ],
  [
    red,
    bitmap`
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
1111111111111111`,
  ],
  [black, bitmap`
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
0000000000000000`]
);

let layer = [
  ["ccccccccc"],
  ["ccccccccc"],
  ["ccccccccc"],
  ["ccccccccc"],
  ["ccccccccc"],
  ["ccccccccc"],
]

const levels = [
  map`
${layer[0]}
${layer[1]}
${layer[2]}
${layer[3]}
${layer[4]}
${layer[5]}`,
  map`
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrrrrrr`,
  map`
.........
.........
.........
.........
.........
.........
.........
.........
.........`

];
let level = 0;
let currentLevel = levels[level];
setMap(currentLevel);
setSolids([player, floor]);

const changeCharcterPostion = (dir) => {
  if (dir === "b") {
    setLegend(
      [
        player,
        bitmap`
......5..5......
......5..5......
......6666......
....6.6666.6....
....6.6666.6....
....66666666....
.......99.......
......9999......
.....999999.....
.....909909.....
....44DDDD44....
....94DDDD49....
.....4DDDD4.....
......4444......
................
................`,
      ],
      [
        floor,
        bitmap`

CCCCCCCCCCCCCCCC
C99999999999999C
C9CCCCCCCCCCCC9C
C9C9999999999C9C
C9C9CCCCCCCC9C9C
C9C9C999999C9C9C
C9C9C9CCCC9C9C9C
C9C9C9C99C9C9C9C
C9C9C9C99C9C9C9C
C9C9C9CCCC9C9C9C
C9C9C999999C9C9C
C9C9CCCCCCCC9C9C
C9C9999999999C9C
C9CCCCCCCCCCCC9C
C99999999999999C
CCCCCCCCCCCCCCCC`,
      ],
      [
        red,
        bitmap`
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
1111111111111111`,
      ],
      [black, bitmap`
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
0000000000000000`]
    )
  } else {
    setLegend(
      [
        player,
        bitmap`
................
................
......4444......
.....4DDDD4.....
....94DDDD49....
....44DDDD44....
.....909909.....
.....999999.....
......9999......
.......99.......
....66666666....
....6.6666.6....
....6.6666.6....
......6666......
......5..5......
......5..5......`,
      ],
      [
        upSideDownPlayer,
        bitmap`
......5..5......
......5..5......
......6666......
....6.6666.6....
....6.6666.6....
....66666666....
.......99.......
......9999......
.....999999.....
.....909909.....
....44DDDD44....
....94DDDD49....
.....4DDDD4.....
......4444......
................
................`,
      ],
      [
        floor,
        bitmap`

CCCCCCCCCCCCCCCC
C99999999999999C
C9CCCCCCCCCCCC9C
C9C9999999999C9C
C9C9CCCCCCCC9C9C
C9C9C999999C9C9C
C9C9C9CCCC9C9C9C
C9C9C9C99C9C9C9C
C9C9C9C99C9C9C9C
C9C9C9CCCC9C9C9C
C9C9C999999C9C9C
C9C9CCCCCCCC9C9C
C9C9999999999C9C
C9CCCCCCCCCCCC9C
C99999999999999C
CCCCCCCCCCCCCCCC`,
      ],
      [
        red,
        bitmap`
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
1111111111111111`,
      ],
      [black, bitmap`
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
0000000000000000`]
    )
  }
}

const genNextPlat = (id) => {

  counter += 1
  //console.log("counter", counter)
  if (counter == 6) {
    counter = 0
    lenCounter += 1

    if (lenCounterLimit === lenCounter) {
      lenCounterLimit = (Math.floor(Math.random() * 3)) + 2
      lenCounter = 0
      platform = Math.floor(Math.random() * 6);
    }

    //make a better alorithem
    //console.log("platform", platform)
  }

  //console.log("check vals", id, platform) 
  if (id === platform) {
    return "f"
  } else {
    return "."
  }


}

const moveP = (direction) => {
  let pRow = -1;
  let pCol = -1;

  // Find the position of 'p' or 'b'
  for (let i = 0; i < layer.length; i++) {
    let col = layer[i][0].indexOf('p');
    if (col !== -1) {
      pRow = i;
      pCol = col;
      break;
    }

    col = layer[i][0].indexOf('b');
    if (col !== -1) {
      pRow = i;
      pCol = col;
      break;
    }
  }

  if (pRow === -1 || pCol === -1) {
    // Neither 'p' nor 'b' is found
    return layer;
  }

  // Make a deep copy of the layer
  let newLayer = layer.map(row => [row[0]]);

  let newRow = direction === 'up' ? pRow - 1 : pRow + 1;

  if (newRow >= 0 && newRow < layer.length && newLayer[newRow][0][pCol] !== 'f') {
    // Move 'p' or 'b' to the new row
    if (newLayer[pRow][0][pCol] === 'p') {
      newLayer[newRow][0] = newLayer[newRow][0].substr(0, pCol) + 'p' + newLayer[newRow][0].substr(pCol + 1);
    } else {
      newLayer[newRow][0] = newLayer[newRow][0].substr(0, pCol) + 'b' + newLayer[newRow][0].substr(pCol + 1);
    }
    newLayer[pRow][0] = newLayer[pRow][0].substr(0, pCol) + '.' + newLayer[pRow][0].substr(pCol + 1);
  }

  return newLayer;
}

const endGame = () => {
  setTimeout(() => {
    hasGameEnded = true
    setMap(levels[1])
    playback.end()
    playTune(die, 1)
    clearText()
    addText(
      ` 
    GG bro 

But you kind lost

so you score is 

      ${score}
  `, {
        x: 2,
        y: 3,
        color: color`2`
      })
  }, speed)

}

const checkIfPlayerLost = () => {
  setTimeout(() => {
    if (!hasGameEnded) {
      if (gravity === "up" && (layer[0][0].includes("p") || layer[0][0].includes("b"))) {
        endGame();
      } else if (gravity === "down" && (layer[5][0].includes("p") || layer[0][0].includes("b"))) {
        endGame()
      }
    }
  }, 1000);
};

const moveTheBackGround = () => {
  setTimeout(() => {
    for (let i = 0; i < layer.length; i++) {
      const ogStr = layer[i][0];
      let newStr = "";
      if (ogStr.includes('p') || ogStr.includes('b')) {
        if (ogStr[3] === "f") {
          if (!hasGameEnded) {
            endGame()
          }
          //console.log("touch")
        }
        newStr = `${ogStr[1]}${ogStr[3]}${ogStr[2]}${ogStr[4]}${ogStr[5]}${ogStr[6]}${ogStr[7]}${ogStr[8]}${genNextPlat(i)}`
        //console.log(newStr)
      } else {
        for (let j = 1; j < ogStr.length; j++) {
          newStr += ogStr[j];
        }
        newStr += `${genNextPlat(i)}`;
      }
      layer[i] = [newStr];
    }

    currentLevel = `
${layer[0]}
${layer[1]}
${layer[2]}
${layer[3]}
${layer[4]}
${layer[5]}`;
    //console.log("layer", currentLevel)
    if (!hasGameEnded) {
      setMap(currentLevel);
    }
    checkIfPlayerLost()
    moveTheBackGround();
    //console.log("layer", layer);
  }, speed);
};

const makeThePlayerMove = () => {
  //console.log("makeTheMove")
  setTimeout(() => {
    if (gravity === "up") {
      //getFirst(player).y -= 1
      layer = moveP("up")
    } else {
      layer = moveP("down")
    }
    makeThePlayerMove()
  }, speed)
}

const increaseSpeed = () => {
  setTimeout(() => {
    speed -= 5
    //console.log(speed)
    increaseSpeed()
  }, 450);
}

const makeTheGameStart = () => {
  clearText()
  layer = [
    [".....ffff"],
    ["........."],
    ["........."],
    ["..p......"],
    ["........."],
    ["fffffffff"],
  ]
  moveTheBackGround()
  makeThePlayerMove()
  increaseSpeed()
  countScore()
}

const countScore = () => {
  setTimeout(() => {
    if (!hasGameEnded) {
      score += 10
      clearText()
      addText(
        ` 
score: ${score}
  `, {
          x: 1,
          y: 1,
          color: color`5`
        })
    }
    countScore()
  }, 100)

}

const countDown = () => {
  setTimeout(() => {
    if (timeTillStart === 0) {
      makeTheGameStart()
    } else {
      timeTillStart = timeTillStart - 1
      clearText()
      addText(
        ` 
    How To Play

W to flip gravity

S for opposite

walk on/under block

Do not hit them 

or fall in the void

game start in ${timeTillStart / 100}
  `, {
          x: 1,
          y: 1,
          color: color`2`
        })
      countDown()
    }

  }, 10)
}
countDown()


onInput("w", () => {
  gravity = "up"
  changeCharcterPostion("b")
  layer = moveP("up")
});

onInput("s", () => {
  gravity = "down"
  changeCharcterPostion("p")
  console.log("layer", layer)
  layer = moveP("down")
});


setPushables({
  [player]: [],
});

afterInput(() => {});