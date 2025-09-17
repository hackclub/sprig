/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: farm_test
@author: Jaan-Erik F.
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const grass = "g"
const sand_unplowed = "u"
const sand_plowed = "s"
const sand_planted = "l"
const plant_start = "c"
const plant_half = "h"
const plant_done = "d"

var plants_harvested = 0

addText(plants_harvested + " cucumbers")

// Format:
// [x, y, time_left, fully_grown]
var plants = []


setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ plant_start, bitmap`
................
................
................
................
................
................
........D.......
.......DD.......
.......DD.......
................
................
................
................
................
................
................` ],
  [ plant_half, bitmap`
................
................
.....DD4........
.....DDDDDD.....
......4DDDD.....
.......DD4......
.......DD.......
.......DD.......
.......DD.......
................
................
................
................
................
................
................` ],
  [ plant_done, bitmap`
................
....DD..........
....DDD...DD....
....4DDD.DDD....
...44.DDDDD4....
...44..DDD.44...
...44..DD..44...
...4...DD..4....
.......DD.......
................
................
................
................
................
................
................` ],
  [ sand_unplowed, bitmap`
6666666666666666
6666666666666666
6666666L66666L66
66L6666666666666
6666666666666666
666666L66L666666
6666666666666666
6666L6666666L66L
6666666666666666
6666666L66666666
66L6666666666666
666666666666L666
6666666666666666
666L66L666666666
6666666666666666
666666666666L666` ],
  [ sand_plowed, bitmap`
6666666666666666
6666666666666666
6666666666666666
66666CCCCCC66666
6666CCCCCCCC6666
666CCCCCCCCCC666
666CCCCCCCCCC666
666CCCCCCCCCC666
666CCCCCCCCCC666
666CCCCCCCCCC666
666CCCCCCCCCC666
6666CCCCCCCC6666
66666CCCCCC66666
6666666666666666
6666666666666666
6666666666666666` ],
  [ sand_planted, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
666666CCCC666666
66666CCCCCC66666
66666CCCCCC66666
66666CCCCCC66666
66666CCCCCC66666
666666CCCC666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
)

setSolids([])

let level = 0
const levels = [
  map`
gggggggggg
guuuuuuuug
guuuuuuuug
guussuuuug
guussuuuug
guususuuug
guuuuuuuug
guuuuuuuug
guuuuuuuug
gggggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addSprite(1,1,player)

// Movement, and possible menu handling
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

// Planting, and other controls
// Plowing
onInput("j", () => {
  player_char = getFirst(player)
  player_x = player_char.x
  player_y = player_char.y

  if (getTile(player_char.x, player_char.y)[1].type == sand_unplowed){
    console.log("Plowable")
    player_char.y -= 1
    clearTile(player_x, player_y)
    addSprite(player_x, player_y, sand_plowed)
  }
  
})

// Planting
onInput("k", () => {
  player_char = getFirst(player)
  player_x = player_char.x
  player_y = player_char.y

  if (getTile(player_char.x, player_char.y)[1].type == sand_plowed){
    console.log("Plantable")
    player_char.y -= 1
    clearTile(player_x, player_y)
    addSprite(player_x, player_y, sand_planted)
    plants.push([player_x, player_y, 100, false])
  }
  
})

// Harvesting
onInput("l", () => {
  player_char = getFirst(player)
  player_x = player_char.x
  player_y = player_char.y

  if (getTile(player_char.x, player_char.y)[1].type == plant_done){
    console.log("Harvestable")
    player_char.y -= 1
    clearTile(player_x, player_y)
    addSprite(player_x, player_y, sand_unplowed)
    for (let i = 0; i < plants.length; i++) {
      var plant = plants[i]
      if (plant[0] == player_x && plant[1] == player_y) {
        plants.splice(i,1)
      }
    }
    plants_harvested += 1
    addText(plants_harvested + " cucumbers")
  }
  
})

function handleGrowth(){
  for (let i = 0; i < plants.length; i++) {
    var plant = plants[i]
    var temp = getTile(plant[0], plant[1])
    var okay = false
    var grow = false
    
    if (((plant[2] < 50) && (plant[2] > 1)) || (plant[2] < 0)){
      grow = true
    }

    if (plant[2] < 0){
      plants[i][3] = true
    }
    
    for (let j = 0; j < temp.length; j++) {
      if (temp[j].type == plant_start || temp[j].type == plant_half || temp[j].type == plant_done){
        okay = true
        if (grow && temp[j].type == plant_start){
          temp[j].remove()
          addSprite(plant[0], plant[1], plant_half)
        }
        if (grow && temp[j].type == plant_half){
          temp[j].remove()
          addSprite(plant[0], plant[1], plant_done)
        }
      }
    }

    if (!okay){
      addSprite(plant[0], plant[1], plant_start)
    }

    plants[i][2] = plant[2]-1
  }
}

const gameIntervals = []

gameIntervals.push(
  setInterval(() => {
    handleGrowth()
  }, 500)
);


afterInput(() => {
})








