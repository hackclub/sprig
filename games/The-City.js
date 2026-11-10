/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The City
@author: Nicholas Garnsworthy
@tags: [sandbox, building]
@addedOn: 2025-00-00
*/

const wood = "w"
const stone = "s"
const smelt = "m"
const shop = "h"
const ground = "g"
const sky = "k"
const cursor = "c"
const person1 = "p"
const person2 = "q"
const person3 = "r"
const person4 = "t"
const personSprites = [person1, person2, person3, person4];

function getPrice(building) {
  switch (building) {
    case wood:
      return 2
    case stone:
      return 3
    case smelt:
      return 10
    case shop:
      return 6
    default:
      return 0
  }
}

function getProduction(building) {
  switch (building) {
    case wood:
      return [2, 0, 0, 0]
    case stone:
      return [0, 1, 0, 0]
    case smelt:
      return [-1, -5, 3, 0]
    case shop:
      return [-2, -1, -1, 10]
    default:
      throw new Error("building not found")
  }
}

setLegend(
  [person1, bitmap`
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
................
.CC.............
.CC.............
.55.............
.55.............
.55.............`],
  [person2, bitmap`
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
................
.....66.........
.....66.........
.....55.........
.....55.........
.....55.........`],
  [person3, bitmap`
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
................
.........99.....
.........99.....
.........44.....
.........44.....
.........44.....`],
  [person4, bitmap`
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
................
.............CC.
.............CC.
.............HH.
.............HH.
.............HH.`],
  [cursor, bitmap`
0020020020020020
2..............0
0..............2
0..............0
2..............0
0..............2
0..............0
2..............0
0..............2
0..............0
2..............0
0..............2
0..............0
2..............0
0..............2
0200200200200200`],
  [wood, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CC4444CCCCCCCC0
0C444444CCCCCCC0
0C444444CCCCCCC0
0C444444CCCCCCC0
0CC4994CCCCCCCC0
0CCC99CCCCCCCCC0
0CCC99CCCCCCCCC0
0CCC99CCCCCCCCC0
0CCC99CCCCCCCCC0
0CCC99CCCCCCCCC0
0CC9999CCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [stone, bitmap`
0000000000000000
0111111111111110
0111111111111110
011LLL1111111110
01LLLLL111111110
01LLLLL1LL111110
01LLLLL1LLL11110
011LLL11LLLL1110
0111111LLLLL1110
01111LLLLLLL1110
01111LLLLLLL1110
011111LLLLL11110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`],
  [smelt, bitmap`
0000000000000000
0999999999999990
0999LLLLLLLL9990
099LLLLLLLLLL990
099LLLLLLLLLL990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999393939393990
0993333333333990
0993333333333990
0993333333333990
0993333333333990
0999999999999990
0000000000000000`],
  [shop, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CLLLLCCCCCCCCC0
0C1CCCCCCCCCCCC0
0C1111CCCCCCCCC0
0C1111CCLLLCCCC0
0C111CCLLLLLCCC0
0C111CCLLCLLCCC0
0C11CCCLLLLLCCC0
0C11CCCCLLLCCCC0
0C1CCCCCCCCCCCC0
0C1CCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [ground, bitmap`
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDCDDDDDDDDDDD
CCDCCCDDDDDDCDCC
.CCC.CCDDDDCCCC.
..C...CCDDCC....
.......CCCC.....
................
................
................
................
................
................
................
................`],
  [sky, bitmap`
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
);

pickingMap = map`
wsm
h..`
pickingMapParsed = pickingMap.split("\n").slice(1).map((r) => r.split(""))
picking = false
pickingPosition = [0, 0]
picked = "w"

setBackground(sky);
setSolids([]);

globalMap = map`
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................
ggggggggggggggggggggggggggggggggggggggggggggggggggggg
.....................................................
.....................................................
.....................................................
.....................................................
.....................................................`
globalMapSize = [globalMap.split("\n")[1].length, globalMap.split("\n").length]
viewSize = [9, 7]
position = [0, globalMapSize[1] - viewSize[1] - 5]
sellfactor = 0.7

function reloadMap() {
  generatedMap = globalMap.split("\n").map((line, index) => {
    if (index < position[1] || index >= position[1] + viewSize[1])
      return ""

    return line.substring(position[0], position[0] + viewSize[0]) + "\n"
  }).join("")

  setMap(generatedMap)
  clearTile(width() - 1, 0)
  addSprite(width() - 1, 0, picked)
  addSprite(Math.floor(width() / 2), Math.floor(height() / 2), cursor)
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function screenToWorld(x, y) {
  return [x + position[0] + 1, y + position[1] - 1]
}

function setGlobal(x, y, tile) {
  globalMap = setCharAt(globalMap, x + y * (globalMapSize[0] + 1), tile)
}

function getGlobal(x, y) {
  return globalMap[x + y * (globalMapSize[0] + 1)]
}

onInput("w", () => {
  if (picking)
    pickingPosition[1] -= 1
  else {
    position[1] -= 1
    if (position[1] < 0) {
      position[1] += 1;
    }
  }
})

onInput("s", () => {
  if (picking)
    pickingPosition[1] += 1
  else {
    position[1] += 1
    if (position[1] > (globalMapSize[1] - viewSize[1])) {
      position[1] -= 1;
    }
  }
})

onInput("a", () => {
  if (picking)
    pickingPosition[0] -= 1
  else {
    position[0] -= 1
    if (position[0] < 0) {
      position[0] += 1;
    }
  }
})

onInput("d", () => {
  if (picking)
    pickingPosition[0] += 1
  else {
    position[0] += 1
    if (position[0] > (globalMapSize[0] - viewSize[0])) {
      position[0] -= 1;
    }
  }
})

onInput("i", () => {
  if (picking)
    stopPicking()
  else
    pickBuilding()
})

onInput("k", () => {
  place()
})

onInput("j", () => {
  console.log("data dump")
  console.log(people)
  console.log(resources)
  console.log(jobs)
})

flashTimer = -1

function pickBuilding() {
  picking = true
  setMap(pickingMap)

  hidden = false

  flashTimer = setInterval(() => {
    if (hidden) {
      addSprite(pickingPosition[0], pickingPosition[1],
        pickingMapParsed[pickingPosition[1]][pickingPosition[0]]);
    } else {
      clearTile(pickingPosition[0], pickingPosition[1])
    }

    hidden = !hidden
  }, 250)
}

function stopPicking() {
  picking = false
  clearInterval(flashTimer)
  picked = pickingMapParsed[pickingPosition[1]][pickingPosition[0]]
}

function place() {
  if (picking)
    return
  cost = getPrice(picked);
  if (resources[3] >= cost) {
    [x, y] = screenToWorld(Math.floor(width() / 2), Math.floor(height() / 2))
    current = getGlobal(x, y)
    if (current == ground)
      return
    resources[3] += getPrice(current) * sellfactor
    setGlobal(x, y, picked)
    resources[3] -= cost
    let person = (jobs[x + y * (globalMapSize[0] + 1)] ?? { person: -1 }).person ?? -1
    jobs[x + y * (globalMapSize[0] + 1)] = { block: picked, person: person }
  }
}

function showText() {
  clearText();
  addText(`Resources: 
${resources.map(e=>Math.floor(e)).join(",")}`, {
    x: 0,
    y: 0,
    color: color`6`
  })

  for (const person of people) {
    if (!person.hasJob) {
      addText(`Unemployment`, {
        x: 0,
        y: 15,
        color: color`3`
      })
    }
  }
}

afterInput(() => {
  if (picking) {
    pickingPosition[1] = Math.max(Math.min(pickingPosition[1], pickingMapParsed.length - 1), 0)
    pickingPosition[0] = Math.max(Math.min(pickingPosition[0], pickingMapParsed[0].length - 1), 0)

    setMap(pickingMap)
  } else
    reloadMap()
  showText()
})

function inView(x, y) {
  if (y < 0) return false
  if (x < 0) return false
  if (y >= height()) return false
  if (x >= width()) return false
  return true
}

class Person {
  constructor(startLoc, id) {
    this.location = startLoc
    this.jobLocation = [-1, -1]
    this.job = "";
    this.id = id
    this.debug(`created`)
  }

  update() {
    if (!this.hasJob)
      this.findJob()
    else
      this.work()
    this.move()
    this.reproduce()
  }

  findJob() {
    // this.debug(`searching for job`)
    if(this.hasJob)
      return;
    
    for (const loc in jobs) {
      let data = jobs[loc]
      if (data.person == -1) {
        this.debug(`took job ${JSON.stringify(data)} at ${loc}`)
        this.jobLocation = [loc % (globalMapSize[0] + 1), Math.floor(loc / (globalMapSize[0] + 1))]
        data.person = this.id
        this.job = data.block;
        break;
      }
    }

    showText()
  }

  move() {
    if (this.hasJob) {
      // this.debug("moving to job")
      if (this.location[0] !== this.jobLocation[0]) {
        this.location[0] -= Math.sign(this.location[0] - this.jobLocation[0])
      } else if (this.location[1] !== this.jobLocation[1]) {
        this.location[1] -= Math.sign(this.location[1] - this.jobLocation[1])
      }
    } else {
      // this.debug("no job, wandering")
      this.location[0] += Math.round(Math.random() * 2 - 1)
    }
  }

  render() {
    const screenPosition = [this.location[0] - position[0] - 1, this.location[1] - position[1] + 1];
    if (!inView(...screenPosition))
      return

    const currentSprites = getTile(...screenPosition).map((e) => e.type)

    for (const person of personSprites) {
      if (!currentSprites.includes(person)) {
        addSprite(...screenPosition, person);
        break;
      }
    }
  }

  get hasJob() {
    return this.jobLocation[0] != -1
  }

  debug(log) {
    console.log(`Person ${this.id}: ${log}`)
  }

  reproduce() {
    if (Math.random() < 0.01 / people.length) {
      createPerson()
      this.debug("had a child")
    }
  }

  work() {
    if (Math.random * 100 > 1)
      return;

    const production = getProduction(this.job);

    if (!production.every((production, i) => {
        const resourceAmount = resources[i];
        if (production + resourceAmount < 0)
          return false;

        return true;
      }))
      return;

    production.forEach((production, i) => {
      resources[i] += production;
    })
    showText();
  }
}

let people = []
let nextId = 0
let jobs = {}
let startPeople = 3
let resources = [0, 0, 0, 100] // Wood, Stone, Metal, Money

function createPerson() {
  people.push(new Person([10, globalMapSize[1] - 8], nextId++))
}

function updatePeople() {
  for (const person of people) {
    person.update();
  }
  for (const personType of personSprites) {
    for (const person of getAll(personType)) {
      person.remove()
    }
  }

  for (const person of people) {
    person.render()
  }
}

setInterval(updatePeople, 100)

for (let i = 0; i < startPeople; i++) {
  createPerson()
}

reloadMap()
showText()