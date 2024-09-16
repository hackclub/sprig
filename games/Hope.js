/*

@title: Hope 
@author: Tyler P Evans
@tags: ["text-based", "story"]
@addedOn: 2024-09-15

almost all life died when the tmepature shot skyward.
some survived, some where left somewhere in between.
you survived.
living of the ruins in your semi truck you drive through the abandoned world hoping to live
one more day.

in the top right you will find your remaining gas and your current items

j while on driving screen to enter an encounter.
w and s to navigate through up to three diffrent options while in an encounter.
d to select an option in an encounter

the encounter will continue automaticaly if there are no options.
if you attempt to start an encounter with no gas the game ends.

I sadly coundl't get this game as far as I wanted to get it due to having bsa events
all weekend every weekend, i had ten more encounters planned that I didn't have enough time for.
*/

const Truck = "T"
const Road1 = "r"
const Road2 = "R"
const land1 = "l"
const land2 = "L"
const grey = "g"
const Mouse = "M"
const gasCounter = "G"
const itemCounter = "I"
const rope = "p"
const aidKit = "a"
const bat = "b"
const thermometer = "c"
const bucket = "B"
const zero = "-"
const one = "!"
const two = "@"
const three = "#"
const four = "$"
const five = "%"
const six = "^"
const seven = "&"
const eight = "*"
const nine = "("
const ten = ")"


setLegend(
  [Truck, bitmap`
......2222......
......2772......
.....277752.....
.....777555.....
......1LL1......
.....111111.....
.....11L1L1.....
.....11L1L1.....
.....11L1L1.....
.....11L1L1.....
.....1111L1.....
.....111LL1.....
.....111LL1.....
.....111LL1.....
.....11LLL1.....
.....111111.....`],
  [gasCounter, bitmap`
................
................
................
................
................
................
................
................
...00.......00..
..0.....00.0....
..0.00.0.0.000..
..0..0.0.0....0.
...00...0.0.00..
.11111111111111.
................
................`],
  [itemCounter, bitmap`
................
................
................
................
................
................
................
................
.0..0...........
.0.000.00.......
.0..0.0..0......
.0..0.000..0.0..
.0..0.0...0.0.0.
1111111001111111
................
................`],
  [rope, bitmap`
................
....LLLLLL......
..LLLLLLLLLL....
..LL111111LL....
.LL11LLLL11LL...
.L11L1111L1LL...
.L11L1LL1L1LL...
.L11L1LL1L1LL...
.L11L1111L1LL...
.L111LLLL11LL...
.L1L111111LL....
.L1LLLLLLLLL....
.L1.LLLLLL......
.L1.............
.L1.............
................`],
  [aidKit, bitmap`
................
................
....LLLLLLLL....
....L......L....
..LLLLLLLLLLLL..
..LLLLL11LLLLL..
..LLLLL11LLLLL..
..LLL111111LLL..
..LLL111111LLL..
..LLLLL11LLLLL..
..LLLLL11LLLLL..
..LLLLLLLLLLLL..
................
................
................
................`],
  [bat, bitmap`
................
.............LL.
............L1L.
...........L1LL.
..........L1L1L.
.........L1L1L..
........L1L1L...
.......L1L1L....
......L1L1L.....
......1L1L......
.....1L1L.......
....1LL.........
...L1L..........
................
................
................`],
  [thermometer, bitmap`
......LL........
.....L11L.......
.....LL1L.......
.....L11L.......
.....LL1L.......
.....L11L.......
.....LL1L.......
.....L11L.......
.....LL1L.......
.....L11L.......
.....LL1LL......
....LL111LL.....
....L11111L.....
....L11111L.....
....LL111LL.....
.....LLLLL......`],
  [bucket, bitmap`
................
......LLLL......
.....L....L.....
....LLLLLLLL....
...LLLL11LLLL...
...LL111111LL...
...LLL1111LLL...
...L11LLLL11L...
...LL1111111L...
....LL11111L....
....LL11111L....
....LL11111L....
....LLLL111L....
....LLLLL11L....
.....LLLLLL.....
................`],
  [Road1, bitmap`
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01`],
  [Road2, bitmap`
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01
10LLLLL6LLLLLL01
10LLLLLLLLLLLL01
10LLLLL6LLLLLL01`],
  [Mouse, bitmap`
................
................
................
................
................
11111111111.72..
1111111111117722
1L1111LLLLLL7772
1LLLL111111L5772
1LLLLLLLLL115522
11111111111.52..
................
................
................
................
................`],
  [zero, bitmap`
................
......000.......
.....0..00......
.....0..00......
.....0.0.0......
.....0.0.0......
.....00..0......
.....00..0......
......000.......
................
................
................
................
................
................
................`],
  [one, bitmap`
................
........0.......
.......00.......
......0.0.......
........0.......
........0.......
........0.......
.......000......
................
................
................
................
................
................
................
................`],
  [two, bitmap`
................
.......00.......
......0..0......
..........0.....
.........0......
........0.......
.......0........
......00000.....
................
................
................
................
................
................
................
................`],
  [three, bitmap`
................
......00........
........0.......
........0.......
......00........
........0.......
........0.......
......00........
................
................
................
................
................
................
................
................`],
  [four, bitmap`
................
................
................
................
................
.....0...0......
.....0...0......
.....0...0......
.....00000......
.........0......
.........0......
.........0......
................
................
................
................`],
  [five, bitmap`
................
.....00000......
.....0..........
.....0..........
......0.........
.......00.......
.........0......
.........0......
.....0...0......
......000.......
................
................
................
................
................
................`],
  [six, bitmap`
................
......000.......
.....0...0......
.....0..........
.....0000.......
.....0...0......
.....0...0......
......000.......
................
................
................
................
................
................
................
................`],
  [seven, bitmap`
................
.....000000.....
..........0.....
.........0......
.........0......
........0.......
........0.......
.......0........
.......0........
................
................
................
................
................
................
................`],
  [eight, bitmap`
................
......000.......
.....0...0......
.....0...0......
.....0...0......
......000.......
.....0...0......
.....0...0......
.....0...0......
......000.......
................
................
................
................
................
................`],
  [nine, bitmap`
................
......000.......
.....0...0......
.....0...0......
.....0...0......
......0000......
.........0......
.........0......
.........0......
.........0......
................
................
................
................
................
................`],
  [ten, bitmap`
................
....0...000.....
....0..0...0....
....0..0...0....
....0..0...0....
....0..0...0....
....0..0...0....
....0..0...0....
....0..0...0....
....0..0...0....
....0...000.....
................
.........L..L.L.
...L.L..L.L..L..
..L.L.L..LL.L.L.
................`],
  [land1, bitmap`
FFFFF9FFFFF6FF96
FFFFF6F9FFFFFF6F
FFF9FFF6FFFF9FFF
FF96FFFFFFFF6FFF
FF6FFFFF9FFFFFFF
FFFFFFFF6FF9FFFF
F9FFFFFFFF96FFFF
F6FFFF9FFF6FFFFF
FFF9FF6FFFFFFFF9
FF96FFFFFF9FFFF6
FF6F9FFFFF6FFFFF
FFFF6FF9FFFFF9FF
FFFFFFF6FFFF96FF
FFFF9FFFFFFF6FFF
FFF96FFFFF9FFFFF
FFF6FFFFFF69FFF9`],
  [land2, bitmap`
FFF6FFFFFF69FFF9
FFFFF9FFFFF6FF96
FFFFF6F9FFFFFF6F
FFF9FFF6FFFF9FFF
FF96FFFFFFFF6FFF
FF6FFFFF9FFFFFFF
FFFFFFFF6FF9FFFF
F9FFFFFFFF96FFFF
F6FFFF9FFF6FFFFF
FFF9FF6FFFFFFFF9
FF96FFFFFF96FFF6
FF6F9FFFFF6FFFFF
FFFF6FF9FFFFF9FF
FFFFFFF6FFFF96FF
FFFF9FFFFFFF6FFF
FFF96FFFFF9FFFFF`],
  [grey, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
)
setSolids([])

let level = 0
const levels = [
  map`
llllRllll
llllrllll
llllRllll
llllrllll
llllRllll
llllrllll
llllRllll`,
  map`
LLLLrLLLL
LLLLRLLLL
LLLLrLLLL
LLLLRLLLL
LLLLrLLLL
LLLLRLLLL
LLLLrLLLL`,
  map`
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg`,
]

let gas = 4

const num = [
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
]

let story = 0
const stories = [

  "you come acros",
  "an adandoned",
  "building,",
  "it has a loft",
  "and you",
  "can see a can",
  "of gas at the top.",
  "use a rope?",
  "throw a rock?",
  "you used a rope",
  "and got the gas down",
  "got the gas down",
  "didn't get the gas",

  "you drive through a",
  "ghost town there is",
  "a well with a",
  "baseball bat at the",
  "the bottom. you",
  "found a jerry can",
  "by the well.",
  "get bat with rope?",
  "Got the bat + gas",
  "Left, but got gas",

  "You pull up to a",
  "makeshift clay hut",
  "inside you find",
  "rough hewn stone",
  "furniture. on a",
  "desk is a note.",
  "It's getting late",
  "if you stay out-",
  "too late it'll get",
  "dangerous.",
  "read the note?",
  "leave?",
  "dear, whoever finds",
  "my hut, I have left",
  "this place in",
  "search of a better",
  "life. i built this",
  "place with my own",
  "two hands, but I",
  "have set out to",
  "find the answers",
  "to our current",
  "situation. I hope",
  "we meet someday.",
  "-Rowan",
  "As you leave the",
  "hut you see the",
  "sun has fallen.",
  "as you reach your",
  "truck you see a",
  "man in your way,",
  "this man appears",
  "deathly and has",
  "had his skin burnt",
  "off",
  "as you pass by him",
  "the man lunges at",
  "you, he knocks you",
  "down and bites",
  "into your throat",
  "you swing your",
  "bat into the man's",
  "chest and knock",
  "him over, clearing",
  "your way to the",
  "truck.",

  "your truck comes",
  "to a thin canyon,",
  "there is nothing",
  "for miles. your",
  "gas is running",
  "low.",

  "you find a hole",
  "carved into the",
  "side of a canyon",
  "wall. inside is",
  "some more stone",
  "furniture there",
  "is a a cooking",
  "area with a gas",
  "container next",
  "to it. outside",
  "the cave are",
  "footprints",
  "leading downroad.",

  "you come to a",
  "rangers tower.",
  "at the top is a",
  "crate with a",
  "thermometer",
  "which reads 198F,",
  "a first aid kit,",
  "and a full jerry",
  "can.",
  "which do you take",
  "thermometer?",
  "first aid kit?",
  "gas?",

  "you get to where",
  "the footprints",
  "end. you find a",
  "charred corpse",
  "clutching a well",
  "used notebook,",
  "the notebook",
  "reads:",
  "I Rowan have",
  "set out to find",
  "solace, safety,",
  "and information",
  "about this heat.",
  "next page.",
  "nothing yet. I",
  "only have hope.",
  "next page.",
  "losing hope",
  "next page.",
  "must find hope",
  "next page.",
  "there is no hope",
  "the next 32 pages",
  "are filled with:",
  "''no hope''",
  "over and over",

]

setMap(levels[level])

let itemCount = 0
let itemNum = 1
let hasRope = 1
let hasAidKit = 0
let hasBat = 0
let hasThermometer = 0
let hasBucket = 0
let printedRope = 0
let printedAidKit = 0
let printedBat = 0
let printedThermometer = 0
let printedBucket = 0

let bookCounter = 0

let mousePos = 1

function gameOver() {
  var timer = setInterval(() => {
    clearInterval(timer)
    clearText()
    level = 2
    setMap(levels[level])
    addText("Game Over", {
      x: 6,
      y: 7,
      color: color`3`
    });
  }, 5000)
}

function itemRecalculate() {
  printedRope = 0
  printedAidKit = 0
  printedBat = 0
  printedThermometer = 0
  printedBucket = 0
  itemCount = 0

}

function sleep() {
  var sleep = setInterval(() => {

    clearInterval(sleep)
    clearText()
    level = 0
    roadUI()

  }, 10000)
}

function roadUI() {
  clearTile(0, 3)
  clearTile(0, 4)
  clearTile(0, 2)
  clearTile(4, 4)
  clearTile(8, 1)
  clearTile(8, 0)
  clearTile(7, 1)
  clearTile(7, 2)
  clearTile(7, 3)
  clearTile(7, 4)
  clearTile(7, 5)
  clearTile(7, 0)
  setMap(levels[level])
  addSprite(4, 4, Truck)
  addSprite(8, 0, gasCounter)
  addSprite(8, 1, num[gas])
  addSprite(7, 0, itemCounter)
  if (itemNum > 0) {
    itemRecalculate()

    if (hasRope > 0 && printedRope == 0) {
      printedRope = 1 + itemCount
      itemCount = itemCount + 1
    }


    if (hasAidKit > 0 && printedAidKit == 0) {
      printedAidKit = 1 + itemCount
      itemCount = itemCount + 1
    }


    if (hasBat > 0 && printedBat == 0) {
      printedBat = 1 + itemCount
      itemCount = itemCount + 1
    }


    if (hasThermometer > 0 && printedThermometer == 0) {
      printedThermometer = 1 + itemCount
      itemCount = itemCount + 1
    }


    if (hasBucket > 0 && printedBucket == 0) {
      printedBucket = 1 + itemCount
      itemCount = itemCount + 1
    }

    if (printedRope > 0) {
      addSprite(7, printedRope, rope)
    }

    if (printedAidKit > 0) {
      addSprite(7, printedAidKit, aidKit)
    }

    if (printedBat > 0) {
      addSprite(7, printedBat, bat)
    }

    if (printedThermometer > 0) {
      addSprite(7, printedThermometer, thermometer)
    }

    if (printedBucket > 0) {
      addSprite(7, printedBucket, bucket)
    }
  }
}

function buildingUI() {
  clearTile(0, 3)
  clearTile(0, 4)
  clearTile(0, 2)
  clearTile(8, 1)
  clearTile(8, 0)
  clearTile(7, 1)
  clearTile(7, 2)
  clearTile(7, 3)
  clearTile(7, 4)
  clearTile(7, 5)
  clearTile(7, 0)
  setMap(levels[level])
  addSprite(12, 0, gasCounter)
  addSprite(12, 1, num[gas])
  addSprite(11, 0, itemCounter)
  addSprite(0, 6, Mouse)
  if (itemNum > 0) {
    itemRecalculate()
    if (hasRope > 0 && printedRope == 0) {
      printedRope = 1 + itemCount
      itemCount = itemCount + 1
    }
    if (printedRope > 0) {
      addSprite(11, printedRope, rope)
    }

    if (hasAidKit > 0 && printedAidKit == 0) {
      printedAidKit = 1 + itemCount
      itemCount = itemCount + 1
    }
    if (printedAidKit > 0) {
      addSprite(11, printedAidKit, aidKit)
    }

    if (hasBat > 0 && printedBat == 0) {
      printedBat = 1 + itemCount
      itemCount = itemCount + 1
    }
    if (printedBat > 0) {
      addSprite(11, printedBat, bat)
    }

    if (hasThermometer > 0 && printedThermometer == 0) {
      printedThermometer = 1 + itemCount
      itemCount = itemCount + 1
    }
    if (printedThermometer > 0) {
      addSprite(11, printedThermometer, thermometer)
    }

    if (hasBucket > 0 && printedBucket == 0) {
      printedBucket = 1 + itemCount
      itemCount = itemCount + 1
    }
    if (printedBucket > 0) {
      addSprite(11, printedBucket, bucket)
    }
  }
}

function runStories() {
  if (story == 0) {
    addText(stories[story], {
      x: 1,
      y: 2,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 1,
      y: 3,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 1,
      y: 4,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 1,
      y: 5,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 1,
      y: 6,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 1,
      y: 7,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 1,
      y: 8,
      color: color`2`
    })
    story = story + 1
    addText(stories[story], {
      x: 3,
      y: 10,
      color: color`7`
    })
    story = story + 1
    addText(stories[story], {
      x: 3,
      y: 12,
      color: color`7`
    })
    story = story + 1
    addText("leave?", {
      x: 3,
      y: 14,
      color: color`7`
    })
  } else {
    if (story == 13) {
      addText(stories[story], {
        x: 0,
        y: 2,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 0,
        y: 3,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 0,
        y: 4,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 0,
        y: 5,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 0,
        y: 6,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 0,
        y: 7,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 0,
        y: 8,
        color: color`2`
      })
      story = story + 1
      addText(stories[story], {
        x: 2,
        y: 10,
        color: color`7`
      })
      story = story + 1
      addText("Leave?", {
        x: 2,
        y: 12,
        color: color`7`
      })

    } else {
      if (story == 22) {
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 2,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 3,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 4,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 5,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 6,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 7,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 8,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 9,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 10,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 2,
          y: 11,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 2,
          y: 12,
          color: color`7`
        })
        story = story + 1
        addText(stories[story], {
          x: 2,
          y: 14,
          color: color`7`
        })
        story = story + 1

      } else {
        if (story == 69) {
          addText(stories[story], {
            x: 0,
            y: 2,
            color: color`2`
          })
          story = story + 1
          addText(stories[story], {
            x: 0,
            y: 3,
            color: color`2`
          })
          story = story + 1
          addText(stories[story], {
            x: 0,
            y: 4,
            color: color`2`
          })
          story = story + 1
          addText(stories[story], {
            x: 0,
            y: 5,
            color: color`2`
          })
          story = story + 1
          addText(stories[story], {
            x: 0,
            y: 6,
            color: color`2`
          })
          story = story + 1
          addText(stories[story], {
            x: 0,
            y: 7,
            color: color`2`
          })
          story = story + 1
          sleep()
        } else {
          if (story == 75) {
            addText(stories[story], {
              x: 0,
              y: 1,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 2,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 3,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 4,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 5,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 6,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 7,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 8,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 9,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 10,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 11,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 12,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 13,
              color: color`2`
            })
            story = story + 1
            gas = gas + 1
            sleep()
          } else {
            if (story == 88) {
              addText(stories[story], {
                x: 0,
                y: 1,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 2,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 3,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 4,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 5,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 6,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 7,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 8,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 9,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 0,
                y: 10,
                color: color`2`
              })
              story = story + 1
              addText(stories[story], {
                x: 2,
                y: 11,
                color: color`7`
              })
              story = story + 1
              addText(stories[story], {
                x: 2,
                y: 12,
                color: color`7`
              })
              story = story + 1
              addText(stories[story], {
                x: 2,
                y: 14,
                color: color`7`
              })
              story = story + 1
            } else {
              if (story == 101) {
                addText(stories[story], { //8
                  x: 0,
                  y: 2,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 3,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 4,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 5,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 6,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 7,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 8,
                  color: color`2`
                })
                story = story + 1
                addText(stories[story], { //8
                  x: 0,
                  y: 9,
                  color: color`2`
                })
                story = story + 1
                bookCounter = 1
                var book = setInterval(() => {
                  if (bookCounter == 1) {
                    clearText()
                    addText(stories[story], { //8
                      x: 0,
                      y: 2,
                      color: color`2`
                    })
                    story = story + 1
                    addText(stories[story], { //8
                      x: 0,
                      y: 3,
                      color: color`2`
                    })
                    story = story + 1
                    addText(stories[story], { //8
                      x: 0,
                      y: 4,
                      color: color`2`
                    })
                    story = story + 1
                    addText(stories[story], { //8
                      x: 0,
                      y: 5,
                      color: color`2`
                    })
                    story = story + 1
                    addText(stories[story], { //8
                      x: 0,
                      y: 6,
                      color: color`2`
                    })
                    story = story + 1
                    addText(stories[story], { //8
                      x: 0,
                      y: 7,
                      color: color`2`
                    })
                    story = story + 1
                    bookCounter = bookCounter + 1
                  } else {
                    if (bookCounter == 2) {
                      clearText()
                      addText(stories[story], { //8
                        x: 0,
                        y: 2,
                        color: color`2`
                      })
                      story = story + 1
                      addText(stories[story], { //8
                        x: 0,
                        y: 3,
                        color: color`2`
                      })
                      story = story + 1
                      addText(stories[story], { //8
                        x: 0,
                        y: 4,
                        color: color`2`
                      })
                      story = story + 1
                      bookCounter = bookCounter + 1
                    } else {
                      if (bookCounter > 2 && bookCounter < 5) {
                        clearText()
                        addText(stories[story], { //8
                          x: 0,
                          y: 2,
                          color: color`2`
                        })
                        story = story + 1
                        addText(stories[story], { //8
                          x: 0,
                          y: 3,
                          color: color`2`
                        })
                        story = story + 1
                        bookCounter = bookCounter + 1
                      } else {
                        if (bookCounter == 5) {
                          clearText()
                          addText(stories[story], { //8
                            x: 0,
                            y: 2,
                            color: color`2`
                          })
                          story = story + 1
                          addText(stories[story], { //8
                            x: 0,
                            y: 3,
                            color: color`2`
                          })
                          story = story + 1
                          addText(stories[story], { //8
                            x: 0,
                            y: 4,
                            color: color`2`
                          })
                          story = story + 1
                          addText(stories[story], { //8
                            x: 0,
                            y: 5,
                            color: color`2`
                          })
                          story = story + 1
                          bookCounter = bookCounter + 1
                        } else {
                          clearText()
                          setMap(2)
                          addText("no hope", { //8
                            x: 7,
                            y: 6,
                            color: color`2`
                          })
                        }
                      }
                    }
                  }
                }, 5000)


              }
            }
          }
        }
      }
    }
  }
}

function firstOptions() {
  if (level == 2) {
    if (story == 9) {
      if (mousePos == 1) {
        itemNum = itemNum - 1
        hasRope = hasRope - 1
        printedRope = 0
        itemCount = itemCount - 1
        gas = gas + 1
        clearText()
        buildingUI()
        addText(stories[story], {
          x: 1,
          y: 4,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 5,
          color: color`2`
        })
        story = 13

        sleep()


      } else {
        if (mousePos == 2) {
          clearText()
          if (Math.random() < 0.45) {
            addText(stories[story + 3], {
              x: 1,
              y: 6,
              color: color`2`
            })
            story = 13

            sleep()
          } else {
            addText(stories[story + 2], {
              x: 1,
              y: 6,
              color: color`2`
            })
            story = 13
            gas = gas + 1
            buildingUI()

            sleep()
          }
        } else {
          story = 13
          clearText()
          level = 0
          roadUI()

        }
      }

    }
  }
}

function secondOptions() {
  if (level == 2) {
    if (story == 21) {
      if (mousePos == 1 && hasRope > 0) {
        itemNum = itemNum + 1
        hasBat = hasBat + 1
        gas = gas + 1
        clearText()
        buildingUI()
        addText(stories[story], {
          x: 0,
          y: 5,
          color: color`2`
        })
        story = story + 1

        sleep()

      } else {
        gas = gas + 1
        clearText()
        buildingUI()
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 5,
          color: color`2`
        })

        sleep()
      }
    }
  }
}

function thirdOptions() {
  if (level == 2) {
    if (story == 35) {
      if (mousePos == 2) {
        clearText()
        addText(stories[story], {
          x: 0,
          y: 1,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 2,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 3,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 4,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 5,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 6,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 7,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 8,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 9,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 10,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 11,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 12,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 13,
          color: color`2`
        })
        story = story + 1
        addText("Leave", {
          x: 2,
          y: 14,
          color: color`7`
        })
        story = 48
      } else {
        if (mousePos == 3) {
          clearText()
          addText("made it safely", {
            x: 1,
            y: 7,
            color: color`2`
          })
          addText("to the truck.", {
            x: 1,
            y: 8,
            color: color`2`
          })
          story = 69
          sleep()
        }
      }
    }
  }
}

function fourthOptions() {
  if (level == 2) {
    if (story == 48) {
      if (mousePos == 3) {
        buildingUI()
        clearText()
        addText(stories[story], {
          x: 0,
          y: 2,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 3,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 4,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 5,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 6,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 7,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 8,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 9,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 10,
          color: color`2`
        })
        story = story + 1
        addText(stories[story], {
          x: 0,
          y: 11,
          color: color`2`
        })
        story = story + 1
        var check = setInterval(() => {
          buildingUI()
          clearText()
          if (hasBat == 0) {
            addText(stories[story], {
              x: 0,
              y: 2,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 3,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 4,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 5,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 6,
              color: color`2`
            })
            story = story + 6
            gameOver()
          } else {
            story = story + 5
            addText(stories[story], {
              x: 0,
              y: 4,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 5,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 6,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 7,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 8,
              color: color`2`
            })
            story = story + 1
            addText(stories[story], {
              x: 0,
              y: 9,
              color: color`2`
            })
            story = story + 1
            sleep()

            clearInterval(check)
          }
        }, 5300)
      }
    }
  }
}

function fifthOptions() {
  if (level == 2) {
    if (story == 101) {
      if (mousePos == 1) {
        story = story + 1
        itemNum = itemNum + 1
        hasThermometer = hasThermometer + 1
        clearText()
        buildingUI()
        addText("got Thermometer!", {
          x: 3,
          y: 5,
          color: color`2`
        })
        sleep()
        story = story - 1
      } else {
        if (mousePos == 2) {
          story = story + 1
          itemNum = itemNum + 1
          hasAidKit = hasAidKit + 1
          clearText()
          buildingUI()
          addText("got First Aid Kit!", {
            x: 3,
            y: 5,
            color: color`2`
          })
          sleep()
          story = story - 1
        } else {
          if (mousePos == 3) {
            story = story + 1
            gas = gas + 1
            clearText()
            buildingUI()
            addText("got Gas!", {
              x: 3,
              y: 5,
              color: color`2`
            })
            sleep()
            story = story - 1
          }
        }
      }
    }
  }
}

roadUI()

var animateRoad;
setInterval(() => {
  if (level < 2) {
    if (level == 0) {
      level = 1
      roadUI()
    } else {
      level = 0
      roadUI()
    }
  }
}, 30)

onInput("w", () => {
  if (level == 2) {
    if (getFirst(Mouse).y > 6) {
      getFirst(Mouse).y += -1
      mousePos = mousePos - 1
    }
  }
})

onInput("s", () => {
  if (level == 2) {
    if (getFirst(Mouse).y < 8) {
      getFirst(Mouse).y += 1
      mousePos = mousePos + 1
    }
  }
})

onInput("j", () => {
  if (level < 2) {
    level = 2
    mousePos = 1
    if (gas == 0) {
      gameOver()
    }
    gas = gas - 1
    buildingUI()
    runStories()
  }
})

onInput("d", () => {

  firstOptions()
  secondOptions()
  thirdOptions()
  fourthOptions()
  fifthOptions()
})
