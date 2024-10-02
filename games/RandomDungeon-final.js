/*
@title: RandomDungeon
@author: JonathanLevi
@tags: ['adventure']
@addedOn: 2023-02-20

WASD to Move

JKIL to attack

Dig through the walls and battle enemies
with the goal of getting as much gold
as you can.
*/

function random(min, max) {
  return Math.floor((Math.random()*(max-min))+min)
}


// console.log("running")

class Weapon {
  constructor(name, range, damage) {
    this.name = name
    this.range = range
    this.damage = damage
  }
}

const dagger = new Weapon("dagger", 1, 5)
const sword = new Weapon("sword", 2, 10)
const battleaxe = new Weapon("axe", 2, 15)


const player = "p";
var playerdata = {
  gold: 0,
  hp: 20,
  max_hp: 20,
  diggingSpeed: 350,
  weapon: dagger
}

const view = 4

var playery = 0
var playerx = 0

var GAMEON = true

function newWeapon(weapon) {
  if (playerdata.weapon == weapon || weapon == sword && playerdata.weapon == battleaxe) {
    return false
  } else {
    addText(`New Weapon: ${weapon.name}`, {x:6, y:4, color: color`9`})
    setTimeout(()=>{
      clearText()
    }, 500)
    playerdata.weapon = weapon
    return True
  }
}

function endGame() {
  GAMEON = false
  clearInterval(gameloop)
  setMap(".")
  clearText()
  addText("Game Over", {
    x: 6,
    y: 5,
    color: color`2`
  })
  addText(`GOLD: ${playerdata.gold}`, {
    x : 6,
    y: 7,
    color: color`6`
  })
  onInput("w", ()=>{return endGame()})
  onInput("a", ()=>{return endGame()})
  onInput("s", ()=>{return endGame()})
  onInput("d", ()=>{return endGame()})
  onInput("i", ()=>{return endGame()})
  onInput("j", ()=>{return endGame()})
  onInput("k", ()=>{return endGame()})
  onInput("l", ()=>{return endGame()})
}


const moveSound = tune`
30,
30: d4^30 + c4^30 + e4^30 + f4^30 + g4^30,
900`
const enterGame = tune`
111.11111111111111: g4-111.11111111111111,
111.11111111111111: c4/111.11111111111111,
111.11111111111111: d4/111.11111111111111,
111.11111111111111: g4-111.11111111111111,
111.11111111111111: f4/111.11111111111111,
111.11111111111111,
111.11111111111111: e4/111.11111111111111,
111.11111111111111: a4-111.11111111111111,
111.11111111111111: g4/111.11111111111111,
111.11111111111111: b4-111.11111111111111,
111.11111111111111: b4/111.11111111111111,
111.11111111111111: d5/111.11111111111111,
111.11111111111111: f4/111.11111111111111 + b4-111.11111111111111,
111.11111111111111: e4/111.11111111111111,
111.11111111111111: d4/111.11111111111111 + b4-111.11111111111111,
111.11111111111111: b5~111.11111111111111 + a5~111.11111111111111,
111.11111111111111: b5~111.11111111111111 + a5~111.11111111111111,
1666.6666666666667`
const attackSound = tune`
56.17977528089887,
56.17977528089887: c4-56.17977528089887 + d4-56.17977528089887 + e4-56.17977528089887 + f4-56.17977528089887 + g4-56.17977528089887,
56.17977528089887: a4-56.17977528089887 + b4-56.17977528089887 + c5-56.17977528089887 + d5-56.17977528089887 + e5-56.17977528089887,
1629.2134831460673`
const dieSound = tune`
326.0869565217391,
163.04347826086956: b5/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: a5/163.04347826086956 + b5-163.04347826086956,
163.04347826086956: g5/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: f5/163.04347826086956,
163.04347826086956: e5/163.04347826086956 + b5-163.04347826086956,
163.04347826086956: d5/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: c5/163.04347826086956 + b5-163.04347826086956,
163.04347826086956: b4/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: a4/163.04347826086956 + b5-163.04347826086956,
163.04347826086956: g4/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: f4/163.04347826086956 + b5-163.04347826086956,
163.04347826086956: e4/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: d4/163.04347826086956 + b5-163.04347826086956,
163.04347826086956: c4/163.04347826086956 + f5-163.04347826086956,
163.04347826086956: c4/163.04347826086956,
163.04347826086956: c4/163.04347826086956,
163.04347826086956: c4/163.04347826086956,
163.04347826086956: c4/163.04347826086956,
163.04347826086956: c4/163.04347826086956,
163.04347826086956: c4/163.04347826086956,
1630.4347826086955`
const treasureSound = tune`
71.42857142857143,
71.42857142857143: c4^71.42857142857143 + d4~71.42857142857143,
71.42857142857143,
71.42857142857143: a5^71.42857142857143 + b5~71.42857142857143,
2000`

playTune(enterGame)



setLegend(
  [ "p", bitmap`
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
  [ "#", bitmap`
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
  [ "H", bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLL0LLLLL
LLLLLLLLLLLLLLLL
LLL0LLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL0LLLLLL0LL
LLLLLLLLLL0LLLLL
LL0LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLL0LLLL0LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL0LLLLLL0LL0L
LLLLLLLLLLLLLLLL
0LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLLL`],
  [ "z", bitmap`
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
  [ "t", bitmap`
................
................
................
...CCCCCCCCCC...
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCC00CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
................` ],
  [ "G", bitmap`
................
.....DDDDDD.....
.....DDDDDD.....
.....D3DD3D.....
.....DD4DDD.....
.....DDD4DD.....
.....DDDD4D.....
.....DDD44D...L.
.....DDDDDD...L.
.......DD.....L.
..DDDDDDDDDDDLLL
.......DD.....L.
......DDDD......
.....DD..DD.....
.....D....D.....
....DD....DD....` ],
  [ "S", bitmap`
................
....22222222....
...2222222222...
...2200222002...
...2200222002...
...2222222222...
...2220202022...
.....202020.....
.....222222.....
...2...22...2...
..222222222222..
...2..2222..2...
.......22.......
.......22.......
.......22.......
......2..2......` ],
  [ "W", bitmap`
................
................
.....0000.......
....000000......
...00300300.....
...00000000.....
....003330......
.....00000......
.....000000.....
..0000000000....
..0.000000.0....
.00.000000.0....
....000000.0....
....000000......
....000000......
.....0..0.......` ]
)

function changePlayer(player) {
  setLegend(
    player,
    [ "#", bitmap`
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
    [ "H", bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLL0LLLLL
LLLLLLLLLLLLLLLL
LLL0LLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL0LLLLLL0LL
LLLLLLLLLL0LLLLL
LL0LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLL0LLLL0LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL0LLLLLL0LL0L
LLLLLLLLLLLLLLLL
0LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLLL`],
    [ "z", bitmap`
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
    [ "t", bitmap`
................
................
................
...CCCCCCCCCC...
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCC00CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
................` ],
    [ "G", bitmap`
................
.....DDDDDD.....
.....DDDDDD.....
.....D3DD3D.....
.....DD4DDD.....
.....DDD4DD.....
.....DDDD4D.....
.....DDD44D...L.
.....DDDDDD...L.
.......DD.....L.
..DDDDDDDDDDDLLL
.......DD.....L.
......DDDD......
.....DD..DD.....
.....D....D.....
....DD....DD....` ],
    [ "L", bitmap`
................
................
....3......3....
...3333..3333...
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................
................
................` ],
    [ "S", bitmap`
................
....22222222....
...2222222222...
...2200222002...
...2200222002...
...2222222222...
...2220202022...
.....202020.....
.....222222.....
...2...22...2...
..222222222222..
...2..2222..2...
.......22.......
.......22.......
.......22.......
......2..2......` ],
    [ "W", bitmap`
................
.....33333......
...33000033.....
..330000003.....
..3003003003....
..3000000003....
...300333033....
....3000003.....
..3330000003....
.300000000003...
3303000000303...
3003000000303...
3333000000303...
...3000000333...
...30000003.....
...33033033.....` ]
  )
}

setBackground("z")

setSolids([player, "#", "G"]);

function dmgPlayer(dmg) {
  playerdata.hp -= dmg
  if (playerdata.hp <= 0) {
    playTune(dieSound)
    endGame()
  }
}




function displayDungeon(dungeon) {
	for (var row=0; row<dungeon.length; row++) {
		var r = document.createElement("code")
		r.innerHTML=dungeon[row].join("")
		document.body.appendChild(r)
	}
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const offsetby = 10

const generateDungeon = (width, height)=> {
	const numRoomAttempts = 200
	const map = []
    const rooms = []


    const offsetMap = ()=> {
      for (var row=0; row<map.length; row++) {
        var spacer = "H".repeat(offsetby).split("")
        map[row] = spacer.concat(map[row], spacer)
      }
    }

	const generate = ()=> {
		for (var y=0; y<height; y++) {
			var newRow = []
			for (var x=0; x<width; x++) {
				newRow.push("#")
			}
			map.push(newRow)
		}
		addRooms()

	}

	const addRooms = ()=> {
		for (var i=0; i<numRoomAttempts; i++) {
			var _width = rand(3, 12)
			var _height = rand(3, 12)

			var y_offset = rand(0, height-_height)
			var x_offset = rand(0, width-_width)

			var cords = []

			for (var y=0; y<_height; y++) {
				for (var x=0; x<_width; x++) {
					cords.push([y+y_offset, x+x_offset].join(","))
				}
			}

			var overlaps = false

			for (var r=0; r<rooms.length; r++) {
				var room = rooms[r]
				for (var c=0; c<cords.length; c++) {
					if (room.includes(cords[c])) {
						overlaps = true
						break
					}
				}
				if (overlaps){break}
			}

			if (overlaps){;continue}
			else{
				draw(cords)
				rooms.push(cords)
			}
		}
	}

	const draw = (cords)=> {
		for (var i=0; i<cords.length; i++) {
			var cord = cords[i].split(",")
			map[cord[0]][cord[1]] = "."
		}
	}

    const findSpawn = ()=> {
      while (true) {
        var y = random(offsetby, map.length-offsetby)
        var x = random(offsetby, map[0].length-offsetby)
        if (map[y][x] == ".") {
          playery = y
          playerx = x
          break
        }
      }
    }

	generate()

    offsetMap()

    findSpawn()

	return map
}

var dungeon = generateDungeon(100, 100)



function spawnItem(item_id) {
  for (var i=0; i<500; i++) {
    var y = random(offsetby, dungeon.length-offsetby)
    if (dungeon[y].includes(".")) {
      for (var j=0; j<500; j++) {
        var x = random(offsetby, dungeon[y].length-offsetby)
        if (dungeon[y][x] == "."){
          dungeon[y][x] = item_id
          return
        }
      }
    }
  }
}





//enemy settings

class Enemy {
  constructor(name, id, hp, range, sight, dmg) {
    this.name = name
    this.id = id
    this.hp = hp
    this.range = range
    this.sight = sight
    this.dmg = dmg
    this.x = 30
    this.y = 30
  }

  spotted() {
    if (this.x-this.sight <= playerx && playerx <= this.x+this.sight && this.y-this.sight <= playery && playery <= this.y+this.sight){
      return true
    }
    return false
  }

  in_range() {
    if (this.x-this.range <= playerx && playerx <= this.x+this.range && this.y-this.range <= playery && playery <= this.y+this.range){
      return true
    }
    return false
  }

  spawn() {
    for (var i=0; i<500; i++) {
      var y = random(offsetby, dungeon.length-offsetby)
      if (dungeon[y].includes(".")) {
        for (var j=0; j<500; j++) {
          var x = random(offsetby, dungeon[y].length-offsetby)
          if (dungeon[y][x] == "."){
            dungeon[y][x] = this.id
            this.x = x
            this.y = y
            // console.log(this.x, this.y)
            return
          }
        }
      }
    }
  }

  attack() {
    addText(`${this.name} attacks! -${this.dmg} DMG`, {
      y: 12,
      x: 1,
      color: color`3`
    })
    setTimeout(()=>{
      clearText()
    }, 500)
    dmgPlayer(this.dmg)
  }

  move() {
    if (!this.spotted()){return}
    if (this.in_range()){
      this.attack()
      return
    }
    // attempt to move towards player
    var x = this.x.valueOf()
    var y = this.y.valueOf()
    // console.log("moving", x, y)
    if (this.y > playery) {
      y--
    } else if (this.y < playery) {
      y++
    } else {
      if (this.x > playerx) {
        x--
      } else if (this.x < playerx) {
        x++
      } else {
        return
      }
    }

    // check if the square the enemy wants to move
    // to is open
    if (dungeon[y][x] != ".") {
      // if spot is not open, attempt to move starting
      // with the X axis
      x = this.x.valueOf()
      y = this.y.valueOf()
      if (this.x > playerx) {
        x --
      } else {
        x ++
      }
    }
    if (dungeon[y][x] == ".") {
      // if spot is open, move
      dungeon[this.y][this.x] = "."
      this.y = y
      this.x = x
      dungeon[this.y][this.x] = this.id
    }
  }
}

//name, id, hp, range, sight, dmg)
var ENEMIES = []

function genGoblin(){
  var e = new Enemy("Goblin", "G", 10, 1, 10, 2)
  e.spawn()
  ENEMIES.push(e)
}

function genSkeleton() {
  var e = new Enemy("Skeleton", "S", 5, 2, 15, 1)
  e.spawn()
  ENEMIES.push(e)
}

function genWraith() {
  var e = new Enemy("Wrath", "W", 20, 1, 5, 5)
  e.spawn()
  ENEMIES.push(e)
}


for (var i=0; i<15; i++) {
  spawnItem("t") // spawn item should only be called here
  genGoblin()
  genSkeleton()
  genWraith()
}


var mode = "normal"


function playerAttack() {
  playTune(attackSound)
  var hit = false
  for (let i=0; i<ENEMIES.length; i++){
    var enemy = ENEMIES[i]
    var r = playerdata.weapon.range
    let px = playerx.valueOf()
    let py = playery.valueOf()
    if (px-r <= enemy.x && enemy.x <= px+r && py-r <= enemy.y && enemy.y <= py+r){
      hit = true
      enemy.hp -= playerdata.weapon.damage
      addText(`+${playerdata.weapon.damage} DMG`, {
        x: 1,
        y: 13,
        color: color`D`
      })
      if (enemy.hp <= 0){
        ENEMIES.splice(i, 1)
        addText(`You Slayed The ${enemy.name}`, {
          x: 1,
          y: 13,
          color: color`D`
        })
        setTimeout(()=>{clearText()}, 500)
        dungeon[enemy.y][enemy.x] = "L"
      } else {
        addText(`+${playerdata.weapon.damage} DMG`, {
          x: 1,
          y: 13,
          color: color`D`
        })
        setTimeout(()=>{clearText()}, 500)
      }
      
    }
  }
  if (hit){
    // console.log("hit enemy")
  } else {
    // console.log("could not target enemy")
  }
}


function DisplayMap() {
  var y_range = [playery-view, playery+view]
  var x_range = [playerx-view-2, playerx+view+2]
  var output = ""
  for (var y=y_range[0]; y<y_range[1]; y++) {
    var row = ""
    for (var x=x_range[0]; x<x_range[1]; x++) {
      if (x == playerx && y == playery) {
        row += "p"
      } else {
        try {
          row += dungeon[y][x]
        } catch (err) {
          row += "H"
        }
      }
    }
    output += row+"\n"
  }
  setMap(output)
}


function showStats() {
  addText("HP: "+playerdata.hp, {
    x: 1,
    y: 1,
    color: color`4`
  })
  addText("GOLD: "+playerdata.gold, {
    x : 8,
    y : 1,
    color: color`6`
  })
  addText("WEAPON: "+playerdata.weapon.name, {
    x : 1,
    y : 2,
    color: color`3`
  })
  addText(`${playerx}-${playery}`, {
    x: 1,
    y: 3,
    color: color`2`
  })
}


var digging = false
var dloc = [0,0]

function startDigging(){
  digging=true
  setTimeout(()=>{
    digging=false
    clearText()
    dungeon[dloc[0]][dloc[1]] = "."
    DisplayMap()
  }, playerdata.diggingSpeed)
}

DisplayMap()

setPushables({
  [ player ]: [],
});

var newY = 0
var newX = 0


var anim = "idle"
var frame = 0
var _count = 0

var lastKeypress = 0

function keyPress() {
  _count = 0
  anim = "running"
}

var gameloop = setInterval(()=>{
  showStats()
  if (_count > 2) {
    anim = "idle"
  } else {
    _count += 1
  }
  if (anim == "idle") {
    changePlayer(
     [ player, bitmap`
.......33.......
.......33.......
....11111111....
....11111111..L.
....11011011..L.
....11111111..L.
....11111111..L.
.L..11111111..L.
LL..11111111..L.
LL.....11....LLL
LL...111111...L.
LL111111111111L.
LL....1111....L.
.L....1111......
.....11..11.....
....111..111....`]
    )
  } else if (anim == "running") {
    if (frame == 0) {
      changePlayer(
       [ player, bitmap`
.......33.......
.......33.......
....11111111....
....11111111..L.
....11011011..L.
....11111111..L.
....11111111..L.
.L..11111111..L.
LL..11111111..L.
LL.....11....LLL
LL...111111...L.
LL111111111111L.
LL....1111....L.
.L....11111.....
.....11..111....
....111.........`]
      )
    } else {
      changePlayer(
        [ player, bitmap`
.......33.......
.......33.......
....11111111....
....11111111..L.
....11011011..L.
....11111111..L.
....11111111..L.
.L..11111111..L.
LL..11111111..L.
LL.....11....LLL
LL...111111...L.
LL111111111111L.
LL....1111....L.
.L...11111......
....111..11.....
.........111....`]
      )
    }
    frame ++
  
    if (frame == 2) {
      frame = 0
    }
  }
}, 50)


onInput("j", ()=> {
  playerAttack()
})

onInput("i", ()=> {
  playerAttack()
})

onInput("k", ()=> {
  playerAttack()
})

onInput("l", ()=> {
  playerAttack()
})


onInput("s", () => {
  newY++
  keyPress()
});

onInput("w", () => {
  newY--
  keyPress()
});

onInput("d", () => {
  newX++
  keyPress()
});

onInput("a", () => {
  newX--
  keyPress()
});

afterInput(() => {
  if (!GAMEON) {return}
  for (var i=0;i<ENEMIES.length;i++){
    ENEMIES[i].move()
  }
  
  if (digging) {
    newY = 0
    newX = 0
    return
  }
  try {
    var key = dungeon[newY+playery][newX+playerx]
  } catch (err) {
    newY = 0
    newX = 0
    return
  }
  if (playery+newY > dungeon.length+offsetby || playery+newY < offsetby || playerx+newX > dungeon.length[0]+offsetby || playery+newX < offsetby) {
    return
  }
  playTune(moveSound)
  if (key == ".") {
    playery += newY
    playerx += newX
  } else if (key == "L") {
    playerdata.hp += 2
    if (playerdata.hp > playerdata.max_hp) {
      playerdata.hp = playerdata.max_hp
    }
    playery += newY
    playerx += newX
    dungeon[playery][playerx] = "."
  } else if (key == "t") {
    playTune(treasureSound)
    playery += newY
    playerx += newX
    if (random(1, 20) == 1 && newWeapon(battleaxe)) {
      newWeapon(battleaxe)
    } else if (random(1, 10) == 1 && newWeapon(sword)) {
      newWeapon(sword)
    } else {
      var gold = random(10, 20)
      addText("+"+gold+" gold", {x:6, y:4, color: color`6`})
      playerdata.gold += gold
    }
    dungeon[playery][playerx] = "."
    setTimeout(()=>{
      clearText()
    }, 800)
  } else if (key == "#") {
    dloc = [newY+playery, newX+playerx]
    startDigging()
    addText("digging", {x: 7, y:4, color:color`7`})
  }
  DisplayMap()
  newY = 0
  newX = 0
});
