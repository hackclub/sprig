/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Floor is lava
@author: Sawyer
@description: Side Scroller with platforming
@tags: ['plattformer']
@addedOn: 2025-11-5
*/

const player = "p"
const floor = "f"
const floor2 = "g"
const background = "b"
const Platform = "a"
const white = "w"

setLegend(
  [player, bitmap`
................
................
................
................
.....333333.....
....33363633....
....33636363....
...3FF33333F....
..33F02FF02F....
..33F02FF02F....
....FFFFFFFF....
....FFCCCFFF....
....5FFFFFF5....
....55555555....
....55....55....
....55....55....`],
  [floor, bitmap`
    9933399999999999
    9333999999993339
    9933993339993339
    9999993339993339
    9999933339333999
    9C99933399933999
    9C9993339999CC9C
    CC99939933999CCC
    CCC999993999C99C
    CCC9999939999999
    CCCC9999399CCCCC
    CCCCC99339CCCCCC
    CCCCCC999CCCCCCC
    CCCCCCCCCCCC333C
    CCCCCCCCCCCC333C
    CCCCCCCCCCC333CC`],
  [floor2, bitmap`
    9999999999933399
    9333999999993339
    9333999333993399
    9333999333999999
    9993339339999999
    99933999993999C9
    C9999999933999C9
    C9999999993999CC
    C99C9999999CCCCC
    CC9CC99999CCCCCC
    CC9CCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    CCCCCCCCCCCCCCCC
    C333CCCCCCCCCCCC
    C333CCCCCCCCCCCC
    CC333CCCCCCCCCCC`],
  [background, bitmap`
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
  [Platform, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [white, bitmap`
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
2222222222222222`]
)


setSolids([player, Platform])
setBackground("b")
let level = 0;
let a0 = "ggfgfgfgfgfffgfgggffgfgfgfgfgfgfgfgfggfgfgfgfggfgfgfggffgfgfgfggfgfgfggfgfgggfgfgfgfgfffgfgggffgfgfgfgfgfgfgfgfggfgfgfgfggfgfgfggffgfgfgfggfgfgfggfgfgggfgfgfgfgfffgfgggffgfgfgfgfgfgfgfgfggfgfgfgfggfgfgfggffgfgfgfggfgfgfggfgfgggfgfgfgfgfffgfgggffgfgfgfgfgfgfgfgfggfgfgfgfggfgfgfggffgfgfgfggfgfgfggfgfgf";
let a1 = ".............................................................................................................................................................................................................................................................................................................";
let a2 = ".........aa..aa............a......a.........aaaa..a.............aa.....a..a..a.......aa..aa............a......a.........aaaa..a.............aa.....aaaa..............aa..aa............a......a.........aaaa..a.............aa.....a.............aa..aa............a......a........aaaa..a...........aa...a..";
let a3 = "...aa.....a......aa..aa.a...........aa..aaa.........a..aaa.a.......a...........aa.....a......aa..aa.a...........aa..aaa.........a..aaa.a.......a........a..aa.....a......aa..aa.a...........aa..aaa.........a..aaa.a.......a...........aa.....a......aa..aa.a...........aa..aaa.........a..aaa.a.......a.....";
let a4 = "......aa....................a..a.............................a.......a............aa....................a..a.............................a.......a............aa....................a..a.............................a.......a............aa....................a..a....................................a....";
let a5 = ".a..........a.................................a......a........a......a.......a..........a.................................a......a........a......a.......a..........a.................................a......a........a......a.......a..........a.................................a......a........a.....a....";
let a6 = ".............................................................................................................................................................................................................................................................................................................";
let a7 = ".............................................................................................................................................................................................................................................................................................................";

const levels = [
  map`
bbbbbb
bbbbbb`,
  map`..........
..........
.a........
...p..aa..
...aa.....
..........
..........
ggfgfgfgfg`,
  map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbabbbbabb
babwbbabab
bbabbbbabb
bbbbbbbbbb`
]
let start = false;
let playAgain = true;
setMap(levels[2])
addText("Welcome to my game", {
  x: 1,
  y: 1,
  color: color`2`
})

addText("Press RIGHT to play", {
  x: 1,
  y: 2,
  color: color`2`
})

function makeMap() {
  console.log(level)
  console.log(a0.length)
  if (level == a0.length - 11) {
    start = false;
    playAgain = false
    clearInterval(inter)
    setMap(levels[2])
    level = 0
    addText("Congratulations", {
      x: 2,
      y: 1,
      color: color`2`
    })
    addText("You Win", {
      x: 6,
      y: 2,
      color: color`2`
    })
    addText("Press RIGHT to", {
      x: 3,
      y: 4,
      color: color`2`
    })
    addText("play again", {
      x: 5,
      y: 5,
      color: color`2`
    })
    setMap(levels[2])
    setTimeout(function() {
      playAgain = true;
    }, 1000);
  } else if (start) {
    let b0 = a0.substring(level, level + 10)
    let b1 = a1.substring(level, level + 10)
    let b2 = a2.substring(level, level + 10)
    let b3 = a3.substring(level, level + 10)
    let b4 = a4.substring(level, level + 10)
    let b5 = a5.substring(level, level + 10)
    let b6 = a6.substring(level, level + 10)
    let b7 = a7.substring(level, level + 10)
    let dynLevel = map`
${b7}
${b6}
${b5}
${b4}
${b3}
${b2}
${b1}
${b0}`
    let x = getFirst(player).x
    let y = getFirst(player).y

    setMap(dynLevel)

    addSprite(x, y, player)
  }
}
setPushables({
  [player]: []
})

function getFirstElementIfNotEmpty(arr) {
  if (arr.length > 0) {
    return arr[0];
  } else {
    return ["p"]; // Or null, or throw an error, depending on desired behavior for empty arrays
  }
}
onInput("a", () => {
  if (start) {
    let inWay = getTile(a.x - 1, a.y)
    if (getFirstElementIfNotEmpty(inWay).type != "a") {
      level -= 1
      makeMap()
    }
  }
})

let inter;
onInput("d", () => {
  if (start) {
    let inWay = getTile(a.x + 1, a.y)
    if (getFirstElementIfNotEmpty(inWay).type != "a") {
      level += 1
      makeMap()
    }
  } else if (playAgain) {
    clearText()
    start = true;
    setMap(levels[1])
    addSprite(3, 3, player)
    inter = setInterval(tick, 200)
  }

})
onInput("j", () => {
  if (onGround && !isJumping && start) {
    jump(3)
  }
})

class Coords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static createFromSprite(sprite) {
    return new Coords(sprite.x, sprite.y); // Username is null by default
  }
}

function getCoordinates(sprite) {
  return Coords.createFromSprite(sprite);
}
let isJumping = false;

function jump(distance) {
  isJumping = true;
  for (let i = 0; i < 1; i++) {
    setTimeout(function() {
      getFirst(player).y -= 1
      setTimeout(function() {
        getFirst(player).y -= 1
        setTimeout(function() {
          getFirst(player).y -= 1
          setTimeout(function() {
            getFirst(player).y -= 0
            isJumping = false;
          }, 300);
        }, 70);
      }, 70);
    }, 70);
  }
}

let a = new Coords(2, 2);
let onGround = true;

function tick() {

  const currentY = getCoordinates(getFirst(player)).y;

  if (currentY === a.y) {
    onGround = true;
  } else {
    onGround = false;
  }
  a = getCoordinates(getFirst(player));
  if (!isJumping) {
    getFirst(player).y += 1;
  }
  if (currentY == 7) {
    start = false;
    playAgain = false
    clearInterval(inter)
    setMap(levels[2])
    level = 0
    addText("GAME OVER", {
      x: 5,
      y: 1,
      color: color`2`
    })
    addText(":(", {
      x: 9,
      y: 2,
      color: color`2`
    })
    addText("Press RIGHT to", {
      x: 3,
      y: 4,
      color: color`2`
    })
    addText("play again", {
      x: 5,
      y: 5,
      color: color`2`
    })
    setMap(levels[2])
    setTimeout(function() {
      playAgain = true;
    }, 1000);
  }

}
