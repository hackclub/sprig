/*
@title: Hallowed Knight
@author: phthallo
@tags: []
@addedOn: 2024-07-09
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

/* Definitely not inspired by Hollow Knight.
--Controls--
W: Jump
A: Left
D: Right
J: Attack 
K: Interact
L: Dash (unlocked ability)

To go through a downward transition, press any key.
Attacks and dashes can only be done in the direction you were last facing.
To interact with an item, stand in front of it and press K.
The exception to this is the Key Gate (a black column). For this, you will need to obtain a key and interact next to it.
The green things in jars are Grubs, collectibles from Hollow Knight. Free them by attacking the jar they are in.
Dashes can be used to reach areas you were previously unable to reach.
Keep an eye out for walls that look slightly different to the others.
*/
const mask = "m"
const maskLost = "d"
const player = "p"
const stone = "s"
const background = "b"
const screenTransitionTop = "i"
const screenTransitionLeft = "j"
const screenTransitionRight = "l"
const screenTransitionBottom = "k"
const grass = "g"
const backgroundGrass = "t"
const acid = "a"
const black = "e"
const chest = "c"
const key = "h"
const currency ="n"
const keyGate = "w"
const dashStatue = "f"
const dashAbility="u"
const rightSlash = "x"
const leftSlash = "z"
const tiktik = "q" 
const grub = "o"
const fakeWall = "r"
const sign = "v"
const baba = "y"

const movementY = 2
const movement = 1

var lives = 3
var inventory = []
var money = 0
var freedGrubs = 0
var lastXInput = ""
var tiktikHealth = 5
var wallHealth = 3
var grubJarHealth = 2

var keyGet = false
var key2Get = false
var r1GrubSave = false
var r5GrubSave = false
var r8GrubSave = false
var r9GrubSave = false 
var keyGateOpen = false

var gameWon = false


const slashSFX = tune`
177.5147928994083: C4/177.5147928994083 + B4/177.5147928994083,
5502.958579881657`
const hurtSFX = tune `
140.18691588785046: G4-140.18691588785046 + E4-140.18691588785046,
4345.794392523364`
const deathSFX = tune `
500: G5/500,
15500`

setLegend(
  // UI ELEMENTS
  [maskLost, bitmap `
................
....22222222....
...2000000002...
..200110000002..
..201110011102..
..201110011102..
..201110000002..
..201100000002..
..201000001102..
..200011001102..
..201111101102..
..200111100002..
...2000110002...
....22000022....
......2222......
................`],
  [mask, bitmap `
....22222222....
...2000000002...
..201111111102..
..201111111102..
..201111111102..
..201LL11LL102..
..201LL11LL102..
..201LL11LL102..
..201111111102..
..201111111102..
..200111111002..
...2000110002...
....22000022....
......2002......
.......22.......
................`],
  [key, bitmap `
................
..........6666..
.........666666.
.........66..66.
.........66..66.
.........666666.
........666666..
.......666......
......666.......
.....666........
....66666.......
...666..6.......
.....66..6......
......6.........
.......6........
................`],
  [currency, bitmap `
....22222222....
...2000000002...
..206666666602..
.20666666666602.
20662FFFFFF66602
2062226666626602
2066266666626602
2066F66666626602
2066F66666626602
2066F66666626602
2066F66666626602
2066622222266602
.20666666666602.
..206666666602..
...2000000002...
....22222222....`],
  [dashAbility, bitmap `
................
................
................
...22222..222...
..200000220002..
.20LLLLL00LLL02.
.20L00LLLLLLLL02
.200000LLLLLLL02
.20LLLLLLLLLLL02
.20L0000LLLLL02.
..200LLLLLLLL02.
...20L00000LL02.
...20L00LLLLL02.
....2000L00002..
.....220L0222...
.......202......`],
  [player, bitmap`
................
..000......000..
..020......020..
..020......020..
...0200000020...
...0022222200...
....02022020....
....02022020....
....02222220....
.....022220.....
.....000000.....
....00LLLL00....
....0LLLLLL0....
....0LLLLLL0....
....00LLLL00....
.....00LL00.....`], 
  [screenTransitionTop, bitmap `
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
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
................
................`],
  [screenTransitionLeft, bitmap `
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............
LLL.............`],
  [screenTransitionRight, bitmap `
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL
.............LLL`],
  [screenTransitionBottom, bitmap `
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
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  // OTHER STUFF
  [rightSlash, bitmap `
................
................
222.............
.22222..........
..22222.........
...2222.........
...22222........
...222222.......
....22222.......
....22222.......
....22222.......
....22222.......
....22222.......
...22222........
..22222.........
................`],
  [leftSlash, bitmap `
................
.............222
..........22222.
.........22222..
.........2222...
........22222...
.......222222...
.......22222....
.......22222....
.......22222....
.......22222....
.......22222....
........22222...
.........22222..
................
................`],
  [baba, bitmap`
................
................
................
................
..........2.....
......22..22....
......222.22....
...222222222....
..22222222222...
.2222222222022..
.2222222202222..
.2222222222222..
..22222222222...
..22.22.22.22...
.222.22.22.22...
.22..22..22.2...`],
  [sign, bitmap `
................
................
................
................
................
................
...CCCCCCCCCC...
...C00C000C0C...
...CCCCCCCCCC...
...C0CC0C000C...
...CCCCCCCCCC...
...CC0C00C00C...
...CCCCCCCCCC...
.......CC.......
.......CC.......
.......CC.......`],
  [fakeWall, bitmap `
0000000000000000
0111111111LL11L0
01LLLL11000011L0
0111LLL111L011L0
0LL1LLL111100000
0L1LLLL1000L11L0
0L11111111LL11L0
0LLLL111110LL000
000001LLL00LL0L0
011111LL01011000
001L00111L00L1L0
00000111L0L11010
0L1LL1000LL01000
0LLL11101010LLL0
0LLL11LL1100LLL0
0000000000000000`],
  [grub, bitmap `
.......00.......
........0.......
.....000000.....
.00000000000000.
0LLLLLLLLLLLLLL0
0000000000000000
.0............0.
.0...DDD......0.
.0..FF0DD.....0.
.0..FFDDDD....0.
.0....44DD....0.
.0....44DD....0.
.0...040DD....0.
.0....44DDD...0.
.000..040DDD000.
...0000000000...`],
  [tiktik, bitmap `
................
................
................
................
................
................
................
................
................
..00000000000...
..022201L1L1L0..
.0202201L1L1L0..
.0022201L1L1L0..
.0222201L1L1L0..
..000000000000..
...0.0.0.0.0.0..`],
  [dashStatue, bitmap `
................
..222......222..
.21112....21112.
2111112222111112
2112111111112112
2112212112122112
.212.221122.212.
.......22.......
................
...LLLLLLLLLL...
......LLLL......
......LLLL......
......LLLL......
......LLLL......
....LLLLLLLL....
................`],
  [keyGate, bitmap `
.....000000.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....0LLLL0.....
.....000000.....`],
  [chest, bitmap `
................
................
................
................
................
................
..000......000..
..0F00000000F0..
..0FCCCCCCCCF0..
..0FFFF11FFFF0..
..0FCCC11CCCF0..
..0FCCCCCCCCF0..
..0FCCCCCCCCF0..
..0FCCCCCCCCF0..
..0FCCCCCCCCF0..
..000000000000..`],
  [stone, bitmap `
0000000000000000
0111111111LL1110
01LLLLL111LL11L0
0111LLL111LL1110
0LL1LLL111LL1110
0L1LLLL1000L11L0
0L111111110L11L0
0LLLL111110L11L0
000001LLL11111L0
011111LL011111L0
001L00111110L1L0
0000011100011110
0L1LL1000LL11110
0LLL11111110LLL0
0LLL11LL1100LLL0
0000000000000000`],
  [background, bitmap `
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
1111111111111111`],
  [grass, bitmap `
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0000000000000000`],
  [backgroundGrass, bitmap `
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
  [acid, bitmap `
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [black, bitmap `
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
)

setSolids([player, stone, grass, keyGate, grub, fakeWall, black])

setBackground(background)

let level = 0
const levels = [
  map `
ssssssssssiiis
s............s
s.......q....s
s....vssssssss
s...ss.......s
s............s
s..ssss......s
sp...........s
ssssssssssskks`, // R0: spawn room
  map `
sssssssssssiis
s...........ps
s..sssssssssss
sv...........s
ssssssssss...s
sssss........s
ssrrr.....ssss
ssrrr.......cs
ssssssssssssss`, // R1: room below spawn room w/ chest
  map `
ssssssssssiiis
s........w...s
s.....ssssssss
s....sssssssss
s...ssssss.s.s
s.ssssssss...s
jp...........s
sss..........s
ssssssssssskks`, // R2: hub room between grass and stone
  map `
gggggggggggggg
j............g
j............g
gggaaagg.....g
ggggggggg....g
g....ggggg...g
g.....ggggg.pl
g......q....gg
gkkggggggggggg`, // R3: grass with acid lake
  map `
giiggggggggggg
ggp..........g
ggggg........g
gggggg......cg
gggggggggggggg
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee`, // R4: grass with chest
  map `
sssssssiisssss
ssssssss.....s
sssssssss....s
sssssssssss..l
sssssss......l
sssssss....sss
ssssrrr..sss..
ssssrrr....p..
sssssssssssskk`, // R5: room above hub room
  map `
ssssssssssssss
s............s
s...ss.......s
j..ss......q.s
jpss....ssssss
sss..........s
s...ss.....f.s
s.........vsvs
ssssssssssssss`, // R6: dash room
  map `
j..........g.l
ggg..g.....g.l
.........ggg.g
.....gg.....pg
............gg
gg..ggg.....gg
g...........gg
aaaaaaaaaggggg
aaaaaaaaaggggg`, // R7: room after acid lake room
  map `
ssssssssssssss
s.....ss.....s
s.....ssy....s
s...ssssss...s
s............s
s.ss..ss..ss.s
s............s
s........p..ss
sssssskkssssss`, // R8: room above the room above hub room
  map `
gggggggggggggg
g...........pl
g.gg......gggg
g.....ggg.gggg
g.............
j...........gg
gggg...gg.....
aaaaaaaaaaaaaa
aaaaaaaaaaaaaa`, // R9: platforming room after R7
  map `
eeegiiiiigeeee
eeeg.....geeee
eeeggg...geeee
eeeg.....geeee
eeeg...gggeeee
eeeg.....geeee
eeeggg...geeee
eeeg....pgeeee
eeegggggggeeee`, // R10: the final climb!
  // GAME OVER
  map `
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee
eeeeeeeeeeeeee`,

]

/* How to interpret the levelsDir => 
"roomNumber": [
  [top transition info -> roomNumber, spawnX, spawnY], 
  [left "], 
  [right "], 
  [bottom "],
backgroundBitmap,
[
  [hazard, [respawnX, respawnY]]
],
[
  [secret, [secretX, secretY]]
]
]
*/


// PLEASE DONT JUDGE THIS ABOMINATION OF CODE
var levelsDir = {
  "R0": [
    [2, 9, 7], null, null, [1, 12, 1], background, [[tiktik, [1, 7]]], null, ["J: attack", [0,15]]
  ],
  "R1": [
    [0, 9, 7], null, null, null, background, null, [[grub, [2, 7], r1GrubSave]], ["K: interact", [0, 15]]
  ],
  "R2": [
    [5, 10, 7], [3, 10, 6], null, [0, 10, 2], background, null, null, null
  ],
  "R3": [
    null, [7, 13, 3], [2, 1, 6], [4, 2, 1], backgroundGrass, [[acid, [8, 3]], [tiktik, [10, 6]]], null
  ],
  "R4": [
    [3, 4, 7], null, null, null, backgroundGrass, null, null, null
  ],
  "R5": [[8,9,7], null, [6, 3, 4], [2, 11 , 1], background, null, [[grub, [4,7], r5GrubSave]], null],
  "R6": [null, [5, 12, 4], null, null, background, [[tiktik, [10,7]]], null, ["L: dash", [0,15]]],
  "R7": [null, [9, 12, 1], [3, 1, 2], null, backgroundGrass, [[acid, [11,6]]], null, null],
  "R8": [null, null, null, [5, 8, 1], background, null, [[grub, [5,2], r8GrubSave]], null],
  "R9": [null, [10, 7, 8], [7, 0, 0], null, backgroundGrass, [[acid, [12,1]]], [[grub, [13, 4], r9GrubSave]], null],
  "R10": [[11,2,3], null, null, null, backgroundGrass, null, null, null]
};

setMap(levels[level])

setPushables({
  [player]: []
})

// generate masks
updateHealth()
addSprite(0,1, currency)
updateCurrency(0) 

// Jumps are two units, and if we don't check if there are platforms
// directly above the Knight it will simply move through it.
function ceilingCheck(sprite) {
  var yPos = sprite.y
  sprite.y -= movement // try to move the sprite up
  if (sprite.y == yPos) { // if moving up didnt work
    return true
  } else // uh oh move it back
    sprite.y += movement
  return false
}

// Check if the Knight is currently on a platform.
function groundCheck(sprite) {
  var yPos = sprite.y
  sprite.y += movement // try to move the sprite down
  if (sprite.y == yPos) {
    // do nothing because apparently javascript doesnt have pass
    return true
  } else
    sprite.y -= movement // wow the sprite is not currently on the ground! move it back
  return false
}

// While the Knight is not on the ground, move downwards.
function moveDown(sprite) {
  setTimeout(() => {
    while (!(groundCheck(sprite))) {
      sprite.y += movement;
    }
  }, 150);
}

// Room transitions + regenerate the UI
function checkInteraction(sprite1, lvl) {
  const arr = ["i", "j", "l", "k"]
  knightCoords = getTile(getFirst(sprite1).x, getFirst(sprite1).y)
  currentLevel = "R" + lvl
  for (roomDirection in [0, 1, 2, 3]) {
    if (knightCoords.find(sprite => sprite.type == arr[roomDirection]) && (levelsDir[currentLevel][roomDirection])) {
      roomInfo = levelsDir[currentLevel][roomDirection]
      level = roomInfo[0]
        setMap(levels[level])
        setBackground(levelsDir["R"+level][4])
        spawnSecrets(levelsDir["R"+level][6])
        getFirst(sprite1).x = roomInfo[1]
        getFirst(sprite1).y = roomInfo[2]
        // Refresh UI
        if (keyGateOpen==true && level == 2){
            getFirst(keyGate).remove()
        }
        tiktikHealth = 5
        refreshScreen()
      }
  }
}

function refreshScreen(){
      clearText()
      updateHealth()
      updateInv()
      updateCurrency(0)
      addSprite(0,1, currency)
}

function checkHazard(sprite, hazard, respawnCoords) {
  directions = 
    [getTile(getFirst(sprite).x, (getFirst(sprite).y)),
     getTile((getFirst(sprite).x), (getFirst(sprite).y)+1),
     getTile((getFirst(sprite).x), (getFirst(sprite).y)-1)]
  for (knightCoords in directions){
    if (directions[knightCoords].find(sprite => sprite.type == hazard)) {
      lives -= 1
      playTune(hurtSFX)
      updateHealth()
      console.log(lives)
      getFirst(sprite).x = respawnCoords[0]
      getFirst(sprite).y = respawnCoords[1]
    }
  }
}


function checkGate(knight){
  gateCoords = getTile(getFirst(knight).x+1, (getFirst(knight).y))
  if (gateCoords.find(sprite => sprite.type == keyGate) && (inventory.includes("h"))) {
    inventory.splice(inventory.indexOf("h"), 1)
    keyGateOpen = true
    getFirst(keyGate).remove()
    refreshScreen()
  }
  console.log(inventory)
}

function spawnSecrets(secretInfo){
  if (secretInfo){
    if (!(secretInfo[0][2])){ // If the secretObtained variable is fase
      const secretType = secretInfo[0][0]; 
      const [secretX, secretY] = secretInfo[0][1]; // secret spawn coordinates     
      if (secretType === grub) { // the secret is  grub
        if ((level === 1 && !r1GrubSave) ||
            (level === 5 && !r5GrubSave) ||
            (level === 8 && !r8GrubSave) ||
            (level === 9 && !r9GrubSave)) {
          addSprite(secretX, secretY, secretType);
          console.log("addedSprite");
        }
      } else {
        addSprite(secretX, secretY, secretType);
        console.log("addedSprite");
      }
    }
  } else {
    console.log("secret info false");
  }
}

function updateHealth(){
  for (let i = 0; i < 3; i++){ 
    if (i < lives){
      addSprite(i,0, mask)
    } else
      addSprite(i,0, maskLost)    
  }
}

function updateInv(item=null){
  if (item){
    inventory.push(item)
  }
  for (let i = 0; i < inventory.length; i++){
    addSprite(i, 2, inventory[i])
  }
}

function updateCurrency(amount){
  money += amount
  addText(String(money), { 
  x: 2,
  y: 3,
  color: color`2`
})
}

function tutorialText(textInfo){
  if (textInfo){
    addText(String(textInfo[0]), { 
    x: textInfo[1][0],
    y: textInfo[1][1],
    color: color`2`
})
  }
}

function gameWin(){
    gameWon = true
    setMap(levels[levels.length-1])
    clearText()
    completionRequirements = [inventory.includes(dashAbility), keyGet, key2Get, r1GrubSave, r5GrubSave, r8GrubSave, r9GrubSave]
    console.log(completionRequirements.filter(Boolean))
    completionPercent = Math.round((completionRequirements.filter(Boolean).length/completionRequirements.length)*100)
    addText("// YOU WON //", {
      x: 3,
      y: 7,
      color: color`2`})
    addText("Completion " + String(completionPercent)+"%", {
      x: 3,
      y: 9,
      color: color`2`})

}

// Directions or smth yay
onInput("w", () => {
  if (!(ceilingCheck(getFirst(player)))) {
    getFirst(player).y -= movement;
    getFirst(player).y -= movement;
    moveDown(getFirst(player))
  }
})

onInput("a", () => {
  getFirst(player).x -= movement;
  lastXInput = -1
})


onInput("d", () => {
  getFirst(player).x += movement;
  lastXInput = 1
})

onInput("j", () => {
  slashX = getFirst(player).x + lastXInput
  slashY = getFirst(player).y
    if (lastXInput == 1){
      addSprite(slashX, slashY, rightSlash)
      } else {
      addSprite(slashX, slashY, leftSlash)
    }
  playTune(slashSFX)
  setTimeout(() => {
    if (lastXInput == 1){
      for (sprite = 0; sprite < getAll(rightSlash).length; sprite++){
        getAll(rightSlash)[sprite].remove()
        }
    } else {
      for (sprite = 0; sprite < getAll(leftSlash).length; sprite++){
        getAll(leftSlash)[sprite].remove()
        }
           }
    }, 5)
  if ((getTile(slashX, slashY)).find(sprite => sprite.type == tiktik)){
    tiktikHealth -=1
    playTune(hurtSFX)
    if (tiktikHealth == 0){
      getFirst(tiktik).remove()
      updateCurrency(2)
  }
  }
  if ((getTile(slashX, slashY)).find(sprite => sprite.type == fakeWall)){
    wallHealth -= 1
    playTune(hurtSFX)
    if (wallHealth <= 0){
      console.log("wall died")
      for (let wall = 0; wall < getAll(fakeWall).length; wall++){
        getAll(fakeWall)[wall].remove()
    }
    }
  }
  if ((getTile(slashX, slashY)).find(sprite => sprite.type == grub)){
    grubJarHealth -= 1
    playTune(hurtSFX)
    if (grubJarHealth <= 0){
      getFirst(grub).remove()
      if (level == 1 && (!(r1GrubSave))){
        r1GrubSave = true
        freedGrubs += 1
        updateCurrency(3)
        addText("GRUB saved", {x:0, y:15, color: color `2`})
        setTimeout(function() { refreshScreen() }, 2000)
      }
      if (level == 5 && (!(r5GrubSave))){
        r5GrubSave = true
        freedGrubs += 1
        updateCurrency(3)
        addText("GRUB saved", {x:0, y:15, color: color `2`})
        setTimeout(function() { refreshScreen() }, 2000)

    }
      if (level == 8 && (!(r8GrubSave))){
        r8GrubSave = true
        freedGrubs += 1
        updateCurrency(3)
        addText("GRUB saved", {x:0, y:15, color: color `2`})
        setTimeout(function() { refreshScreen() }, 2000)
    }
      if (level == 9 && (!(r9GrubSave))){
        r9GrubSave = true
        freedGrubs += 1
        updateCurrency(3)
        addText("GRUB saved", {x:0, y:15, color: color `2`})
        setTimeout(function() { refreshScreen() }, 2000)
    }


  }
  }
})

onInput("k", () => {
  knightCoords = getTile(getFirst(player).x, getFirst(player).y)
  if (knightCoords.find(sprite => sprite.type == chest && keyGet == false)) {
      addText("KEY obtained", {
      x: 0,
      y: 15,
      color: color`2`})
      updateInv(key)
      updateCurrency(2)
      setTimeout(function() { refreshScreen() }, 2000)
      keyGet = true
  } else if (knightCoords.find(sprite => sprite.type == chest && key2Get == false)){
      updateCurrency(5)
      key2Get = true
  }
  if (knightCoords.find(sprite=> sprite.type == dashStatue) && !(inventory.includes(dashAbility))){
      addText("DASH obtained", {
      x: 0,
      y: 15,
      color: color`2`})
      updateInv(dashAbility)
      setTimeout(function() { refreshScreen() }, 2000)

  }
  checkGate(player)
  updateInv()
  if (knightCoords.find(sprite=> sprite.type == sign)){
      tutorialText(levelsDir["R"+level][7])
    setTimeout(function() { refreshScreen() }, 2000)
    }
})

onInput("l", () => {
  if (inventory.includes(dashAbility)){
      for (let i = 0; i < 4; i++){
        getFirst(player).x += lastXInput
      }
  }
})

afterInput(() => {
  if (!(groundCheck(getFirst(player)))) {
      moveDown(getFirst(player))  
    }
  if (!(level >= 10)){
    console.log(getFirst(player).x, getFirst(player).y)
    checkInteraction(player, level)
    enemyInfo = levelsDir["R" + level][5]
    if (enemyInfo){ // If there's an enemy/hazard listed as being in the current room
      for (enemy in enemyInfo){
        checkHazard(player, enemyInfo[enemy][0], enemyInfo[enemy][1])
    }
    }
    updateInv()
    if (lives <= 0){
      setMap(levels[levels.length-1])
      playTune(deathSFX)
      clearText()
      addText("~GAME OVER~", {
        x: 5,
        y: 7,
        color: color`2`})
  }
        } else if (level == 10 && (getTile(getFirst(player).x, getFirst(player).y).find(sprite => sprite.type == "i"))){ 
          gameWin()
  } else {
  //pass 
}
  })
