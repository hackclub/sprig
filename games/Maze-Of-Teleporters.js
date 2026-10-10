/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze-Of-Teleporters
@description: just a maze game with teleporters
@author: NotTacos
@tags: ['Puzzle', 'Guessing']
@addedOn: 2026-09-30
*/

const player = "p"
const wall = "w"
const fakewall = "f"
const teleporter = "t"
const faketeleporter = "a"
const killteleporter = "k"
const secretteleporter = "s"
const restartteleporter = "r"

const winner = tune`
306.1224489795918: B4~306.1224489795918 + D5~306.1224489795918 + C5^306.1224489795918,
306.1224489795918: A4~306.1224489795918,
306.1224489795918: B4~306.1224489795918,
306.1224489795918,
306.1224489795918: C5~306.1224489795918,
306.1224489795918: C5~306.1224489795918,
306.1224489795918: D5~306.1224489795918,
306.1224489795918: G4~306.1224489795918 + F5~306.1224489795918 + D5^306.1224489795918,
306.1224489795918: C5^306.1224489795918 + E5^306.1224489795918,
306.1224489795918: D5~306.1224489795918 + G5~306.1224489795918,
306.1224489795918: D5~306.1224489795918 + C5~306.1224489795918 + B4~306.1224489795918 + E5^306.1224489795918 + F5^306.1224489795918,
306.1224489795918: D5^306.1224489795918 + E5^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: C5^306.1224489795918,
306.1224489795918: D5^306.1224489795918,
306.1224489795918: C5~306.1224489795918,
306.1224489795918: B4^306.1224489795918 + C5~306.1224489795918,
306.1224489795918: C5^306.1224489795918 + B4~306.1224489795918,
306.1224489795918: G4^306.1224489795918 + B4^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: C5^306.1224489795918,
306.1224489795918: F4^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: E5~306.1224489795918 + C5^306.1224489795918,
306.1224489795918: D5^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: C5^306.1224489795918 + D5^306.1224489795918,
306.1224489795918: E5~306.1224489795918,
306.1224489795918: B4^306.1224489795918,
306.1224489795918: C5^306.1224489795918,
306.1224489795918: A4~306.1224489795918,
306.1224489795918: C5~306.1224489795918 + B4~306.1224489795918,
306.1224489795918: D5^306.1224489795918,
306.1224489795918: D5~306.1224489795918,
306.1224489795918: D5^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: D5~306.1224489795918`

const footstep = tune `
161.29032258064515: G4~161.29032258064515,
5000`

setLegend(
  [ player, bitmap`
................
................
......00000.....
....00....0.....
....0.....0.....
...00.3.3.0.....
...0......0.....
...00.333.0.....
....00....0.....
......0000......
.......0........
.......0........
...00000000.....
......00........
.....0000.......
........0.......`],
  [ wall, bitmap`
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
  [ fakewall, bitmap`
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
  [teleporter, bitmap`
................
................
.......3333.....
.....333...33...
....3........3..
...33........3..
...3.........3..
...3.........3..
...3.........3..
...3........3...
...3........3...
...33.......3...
.....33....3....
.......33333....
.........33.....
................`],
  [faketeleporter, bitmap`
................
................
.......3333.....
.....333...33...
....3........3..
...33........3..
...3.........3..
...3.........3..
...3.........3..
...3........3...
...3........3...
...33.......3...
.....33....3....
.......33333....
.........33.....
................`],
  [killteleporter, bitmap`
................
................
.......3333.....
.....333...33...
....3........3..
...33........3..
...3.........3..
...3.........3..
...3.........3..
...3........3...
...3........3...
...33.......3...
.....33....3....
.......33333....
.........33.....
................`],
  [secretteleporter, bitmap`
................
................
.......3333.....
.....333...33...
....3........3..
...33........3..
...3.........3..
...3.........3..
...3.........3..
...3........3...
...3........3...
...33.......3...
.....33....3....
.......33333....
.........33.....
................`],
  [restartteleporter, bitmap`
................
................
.......HHHH.....
.....HHH...HH...
....H........H..
...HH........H..
...H.........H..
...H.........H..
...H.........H..
...H........H...
...H........H...
...HH.......H...
.....HH....H....
.......HHHHH....
.........HH.....
................`]
)

setSolids([ player, wall ])

let level = 0
let larplevel = -1
const levels = [
  map`
wwp...www
wwwww.www
wwwww.www
wwwww.www
wwwww...w
wwww..w.w
wwww.ww.w
wwww.ww.w
wwwwawwtw`,
  map`
wwp...w
wwwww.w
ww....w
ww.ww.w
ww.ww.w
ww..w..
www.ww.
ww..ww.
wwwtw.a`,
  map`
p.wt...w
..fwww.w
.wfwww.a
.wfwww.w
.wfsww.w
..wwww..
..wwww.w
.......w`,
  map`
p.wwwwwww
...wwaw..
.wwww.w..
.wwww.ww.
.wwww.ww.
.wwww.w..
.wwww.w.t
.w..w....
.........`,
  map`
wwwwwwt.w
wwwwww..w
wwwwww..w
wwwwwk..w
........w
p.....w.w
......waw
wwwwwwwfw
wwwwwwwww`,
  map`
wwwwwwwww
w......ww
w..ww..ws
w..ww..wf
w.kww..wf
w...w..wf
wt..w..wf
wwwww..ff
wwwwwp.ww`,
  map`
wp.wwwwww
w..wwwwww
w......tw
w......aw
w......kw
wwfwwwwww
wwfwwwwww
wwfffwwww
wwwwswwww`,
  map`
wp......t
w.wwwwwww
w...wwwww
w.w.....k
w.wwwwwww
w.fffwffs
w.wwfffww
w......aw
wwwwwwwww`,
  map`
wwwwwwwww
wwwwwwwww
....wwwww
.w.....wp
twwww.ww.
wwwww....
wwwwwwwww
wwwwwwwww
wwwwwwwww`,
  map`
wwwwpwwww
wwww.w...
a......wk
w.wwww.ww
w.wwww.ww
..w....ww
..wwwwwww
w.....tww
wwwwwwwww`,
  map`
wfffffswwwww
wfwwwwwwwwww
p.........ww
www.w.wwwwww
www.w.wwwwwa
ww..w.wwwww.
ww.ww.wwwww.
k..ww.wwwww.
wwwww.wwwww.
wwwww.wwwww.
wwwww.wwwww.
t...........`,
  map`
wpwww......a
w.www.ww.ww.
w.www.ww....
w.....wwwwww
wwwww..wwwww
wwkwww..wwww
ww.wwww.wwww
ww.wwww.wwww
ww......wwww
wwwwwww.wwww
wwwwwww.wwww
wwwwwwt.wwww`,
  map`
p.wwwwwfffffs
w.wwwwwfwwwww
w......fwwwww
www.ww.wwwwwa
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.......
www.ww.wwww.w
www.ww.wwwwkw
www.twwwwwwww`,
  map`
wwwwwwtwwwwwk
wwwwww.wwwww.
wwwwww.wwwww.
wwwwww.wwwww.
wwwwww.wwwww.
p...ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www.ww.wwwww.
www..........`,
  map`
wp.....wwwwww
wwwwww.wwwwww
wwwwww.wwwwww
wwwwww.wwwwwt
wwwwww.wwwww.
wwwwww.wwwww.
wwwwww.wwwww.
a......wwwww.
wwwwww.wwwww.
wwwwww.wwwww.
wwwwww.wwwww.
wwwwww.wwwww.
wwk..........`,
  map`
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
p........ww
wwww.w.w.ww
wwww.w.w.ww
wwww.w.w.ww
wwww.w.w.ww
wwww.w.w.ww
wwwwtwawkww`,
  map`
wpwwwwwwwwwwwww
w.............w
w.wwwwwwww.wwww
w.....wwww....w
w.wwwwwwwwwww.w
w.wkwa..wwwww.w
w.w.www.wwwww.w
w...www.wwwww.w
www.w.........w
www.w.wwwwwwwww
www.wwwww.....w
www.ww.ww.www.w
www....ww...wtw
www.wwww.ww.www
www.........www
wwwwwwwwwwwwwww`,
  map`
wp..wwwwwwwwww
w.wwwwwwwwwwww
w...........ww
w.wwwwww.ww.ww
w.wwwww..ww.ww
w.wwwwww.ww.ww
w......wwww.ww
w.wwwww.www.ww
w.wwwww...w.ww
w.......w.w.ww
w.wwwwwww.w.ww
w.wwwwwww.w.ww
wtwwwwwa..w.kw
wwwwwwwwwwwwww`,
  map`
wp.wwwwwwwwwwwwww
ww.ww...........w
ww....wwwwwwwwwww
ww..........wt..w
ww.wwwwwwwwwwww.w
ww..............w
ww.wwwwwwwwwww.ww
ww.wwwwwwwwwww.ww
ww.w........ww.ww
ww.wwwwwwww.ww.ww
ww........w.ww.ww
wwwwwwwwwww.ww.ww
wwwwwwwwwww.aw.ww
..........w.ww.ww
.wwwwwwww......ww
.kwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwww`,
  map`
wpwwwwwwwwwwwwwwwwww
w.w..............w.w
w...wwwwwwwwwwwwww.w
w..wwww............w
w.....w.w.wwwwwwww.w
w.ww.ww.w.wwwwwwww.w
w.ww.ww.w.w........w
w.ww.ww.w.wwwwwwww.w
w.ww.ww.w.wwwwwwww.w
wwww.ww.w.ww.....w.w
wwww....w.ww.w...w.w
wwwwwwwww.ww.wwwww.w
wwwwwwwww.ww.wwwww.w
w.......wwww.wwwww.w
wwwwwww............w
wwtwwww.wwwwwwwww..w
ww......wa.........w
wwwwwww.wwwwwwwww..w
wk.................w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wwt.wwwwawwwwwkwwwww
www.wwww.www.w.w..ww
w.w.w..w.....w.ww.ww
w.w.w...w.wwww..w.ww
w.w.w...........w.ww
w.w.w.wwwww.......ww
w.w.w.w...w.w.ww.www
w.w.w.www.w.w..w.www
w.w.w.....w.w..w.www
w.w.wwwww.w.w..w.www
w.w.......w.w..w.www
w.wwwwwwwww.wwww.www
w.w.........w....www
w.wwwwwwwww.www.wwww
w.............w....w
w.wwwwwwwwwww.w.wwww
w.wwwwwwwww.w...wwww
w...........w.wwwwww
wwwwwwwwwwwwwp.wwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wk...........w....ww
wwwwwwwwwwww.wwww.ww
ww.......www....w.ww
ww.wwwwwwwwwwww.w.ww
ww.wwwwwwwwwwww.w.ww
ww.www......www.w.ww
ww.www.ww.......w.ww
ww.wwwaww.wwwww....p
ww.wwwwww.wwwwwwww.w
ww..............ww.w
ww.wwwwwwww.www.ww.w
ww.www....w.www.ww.w
ww.wtwwww.w.www.ww.w
ww.w.wwww.w.www.ww.w
ww.w......w..ww.ww.w
ww.wwwwww.wwwww.ww.w
ww..............ww.w
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
wwwww..ww.ww........w
www.w.www.ww.ww.www.w
www.w.www.ww.ww...w.w
www.w.www.ww.ww...w.w
www.w.www.ww.ww..ww.w
ww..w.w.w.ww.ww..ww.w
ww.w....w.ww.ww..ww.w
p....w.ww.ww.ww..ww.w
w.w.ww....ww.ww..ww.w
w.w.wwwww.ww.ww...w.w
w.w.wwwww.ww.ww.w.w.w
w.w...ww..wwtww.w.w.w
w.wwwwww.wwwwww.w.w.w
w.ww.www.www....w.w.w
w.ww.www......w.w.w.w
w.ww.www.ww...w.w.waw
w.....w...wwwww.wwwww
wwwww.wwww.........ww
w........wkwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww`,
  map`
wp......w
w.......w
w.......w
w.......w
w.......w
w.......w
w.r.....w
w.......w
wwwwwwwww`
]

const larplevels = [
  map`
tp.ww`
]

const deadmap = [
  map`
wwwwww
wwwwww
wwwwww
wwwwww
wwwwww
wwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
let secrets = 0
let addTextInGame = addText(`${level}/23`, { 
  x: 14,
  y: 1,
  color: color`3`
})
let addSecretTextInGame = addText(`Secrets: ${secrets}`, { 
  x: 10,
  y: 2,
  color: color`3`
})

let hasbeendead = false;


onInput("s", () => {
  if (hasbeendead == false) {
    getFirst(player).y += 1
  }
  playTune(footstep)
})

onInput("w", () => {
  if (hasbeendead == false) {
    getFirst(player).y -= 1
  }
  playTune(footstep)
})

onInput("d", () => {
  if (hasbeendead == false) {
    getFirst(player).x += 1
  }
  playTune(footstep)
})

onInput("a", () => {
  if (hasbeendead == false) {
    getFirst(player).x -= 1
  }
  playTune(footstep)
})

let hasbeeninlarpuniverse = false;

afterInput(() => {
  const targetNumber = tilesWith(teleporter).length;
  const numberCovered = tilesWith(teleporter, player).length;

  if (targetNumber > 0 && numberCovered === targetNumber) {
    clearText()
    if (hasbeeninlarpuniverse) {
      larplevel = -1;
    } else {
      level = level + 1;
    }
    hasbeeninlarpuniverse = false;

    const currentLevel = levels[level];

    const newaddTextInGame = addText(`${level}/23`, { 
      x: 14,
      y: 1,
      color: color`3`
    })

    const newaddSecretTextInGame = addText(`Secrets: ${secrets}`, { 
      x: 10,
      y: 2,
      color: color`3`
    })

    console.log(level)
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
    }

    if(level == 4){
      const warningTextInGame = addText('Watch out for\ndeadly\nteleporters!', { 
      x: 5,
      y: 5,
      color: color`3`
    })}
    if (level == 23){
      clearText()
      addText("Congrats!", { y: 4, color: color`3` });
      addText(`Total Secrets ${secrets}`, { x: 5, y: 6, color: color`3` });
      playTune(winner, 3)
    }
  }

  const larptargetNumber = tilesWith(faketeleporter).length;
  const larpnumberCovered = tilesWith(faketeleporter, player).length;

  if (larptargetNumber > 0 && larpnumberCovered === larptargetNumber) {
    hasbeeninlarpuniverse = true;

    addTextInGame = addText(`??/???`, { 
      x: 14,
      y: 1,
      color: color`3`
    })

    console.log(larplevel)
      if (level == 0) {
        setMap(larplevels[0]);
      } else if (level == 1) {
        setMap(larplevels[0]);
      } else {
        setMap(larplevels[0]);
      }
  }

  const killtargetNumber = tilesWith(killteleporter).length;
  const killnumberCovered = tilesWith(killteleporter, player).length;

  if (killtargetNumber > 0 && killnumberCovered === killtargetNumber) {
    level = 0;
    secrets = 0;
    hasbeendead = true;
    clearText()

    const deadmessage = addText('Game Over.\nPress J to restart', { 
      x: 2,
      y: 7,
      color: color`3`
    })

    setMap(deadmap[0]);

    onInput("j", () => {
      hasbeendead = false;
      clearText()
      setMap(levels[0])
      const message = addText(`${level}/23`, { 
        x: 14,
        y: 1,
        color: color`3`
      })
      const secretaa = addText(`Secrets: ${secrets}`, { 
        x: 10,
        y: 2,
        color: color`3`
      })
    })
  }

  const secrettargetNumber = tilesWith(secretteleporter).length;
  const secretnumberCovered = tilesWith(secretteleporter, player).length;

  if (secrettargetNumber > 0 && secretnumberCovered === secrettargetNumber) {
    secrets = secrets + 1;

    const secretbrr = addText('You have found\na secret!', { 
      x: 2,
      y: 7,
      color: color`3`
    })

    addSecretTextInGame = addText(`Secrets: ${secrets}`, { 
      x: 10,
      y: 2,
      color: color`3`
    })

    setMap(larplevels[0]);
    
  }

  const restarttargetNumber = tilesWith(restartteleporter).length;
  const restartnumberCovered = tilesWith(restartteleporter, player).length;

  if (restarttargetNumber > 0 && restartnumberCovered === restarttargetNumber) {
    clearText()
    secrets = 0;
    level = 0;

    const newaddTextInGame = addText(`${level}/23 `, { 
      x: 14,
      y: 1,
      color: color`3`
    })

    const newaddSecretTextInGame = addText(`Secrets: ${secrets}`, { 
      x: 10,
      y: 2,
      color: color`3`
    })

    setMap(levels[level]);
    console.log("restart")
    
  }
  
})
