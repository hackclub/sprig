/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Ellis's Emerald
@description: All the other miners laughed at you saying that Ellis's Emerald was just a myth. They said that an emerald that grants you luck could never exist. Your goal is to find the emerald by mining deeper and deeper. Each layer has rarer and rarer materials.
@author: Quinton
@tags: ['idle', 'grind']
@addedOn: 2025-00-00
*/

const cursor = "1"
const rockr = "4"
const rockrhit1 = "5"
const rockrhit2 = "6"
const rockl = "7"
const Emerald = "-"
const rocklhit1 = "8"
const rocklhit2 = "9"
const coalr = "q"
const coall = "Q"
const bg2 = ":"
const coalrhit1 = "w"
const coallhit1 = "W"
const coalrhit2 = "e"
const coallhit2 = "E"
const extractor = "x"
const smelter = "s"
const atelier = "'"
const ironr = "r"
const ironl = "R"
const ironrhit1 = "t"
const ironrhit2 = "T"
const ironlhit1 = "u"
const ironlhit2 = "U"
const goldr = "i"
const goldl = "I"
const goldlhit1 = "o"
const goldrhit1 = "O"
const goldlhit2 = "p"
const goldrhit2 = "P"
const diamondr = "b"
const diamondl = "B"
const diamondlhit1 = "n"
const diamondrhit1 = "N"
const diamondlhit2 = "m"
const diamondrhit2 = "M"
const background = "0"
const drone = "d"
const rockbreak = tune`
86.20689655172414: B4^86.20689655172414 + C5~86.20689655172414 + D5^86.20689655172414 + E5~86.20689655172414 + B5~86.20689655172414,
86.20689655172414: F4~86.20689655172414 + G4^86.20689655172414 + A4~86.20689655172414 + B4~86.20689655172414 + B5~86.20689655172414,
2586.206896551724`
const extraction = tune`
103.09278350515464: B4/103.09278350515464 + A4-103.09278350515464 + G4/103.09278350515464 + C5/103.09278350515464,
103.09278350515464,
103.09278350515464: C5-103.09278350515464 + B4-103.09278350515464 + D5/103.09278350515464 + A4/103.09278350515464,
103.09278350515464,
103.09278350515464: E5-103.09278350515464 + C5-103.09278350515464 + F5/103.09278350515464 + B4/103.09278350515464 + D5/103.09278350515464,
2783.5051546391755`
const dronefly = tune`
62.63048016701461: D5^62.63048016701461,
62.63048016701461: G5^62.63048016701461,
62.63048016701461: B4^62.63048016701461,
62.63048016701461: A4^62.63048016701461,
62.63048016701461: E5^62.63048016701461,
62.63048016701461: G4^62.63048016701461,
62.63048016701461: B4^62.63048016701461,
62.63048016701461: G4^62.63048016701461,
1503.1315240083507`
setLegend(
  [ Emerald, bitmap`
................
................
.......22.......
......222.......
..2...2D2...2...
..22..2D2..2D2..
..2D2.2D2..2D2..
..2D2.2D2..2D2..
..2D22DDD22DD2..
..2DD2D4D22DD2..
..2D422442D4D2..
..22442442442...
...2244222442...
....222222222...
................
................` ],
  [ bg2, bitmap`
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
0000000000000000` ],
  [ cursor, bitmap`
3333........3333
3CC..........CC3
3C............C3
3....333333....3
.....3....3.....
...33......33...
...3........3...
...3...33...3...
...3...33...3...
...3........3...
...33......33...
.....3....3.....
3....333333....3
3C............C3
3CC..........CC3
3333........3333` ],
  [ drone, bitmap`
LLL..........LLL
L1L7........7L1L
LLL.7......7.LLL
.7..7..LL..7..7.
..77.7L..L7.77..
....75555557....
....L575575L....
...L.557755.L...
...L.557755.L...
....L575575L....
....75555557....
..77.7L..L7.77..
.7..7..LL..7..7.
LLL.7......7.LLL
L1L7........7L1L
LLL..........LLL` ],
  [ extractor, bitmap`
LLL..........LLL
L1L3........3L1L
LLL.3......3.LLL
.3..3..LL..3..3.
..33.3L..L3.33..
....3CCCCCC3....
....LC3CC3CL....
...L.CC33CC.L...
...L.CC33CC.L...
....LC3CC3CL....
....3CCCCCC3....
..33.3L..L3.33..
.3..3..LL..3..3.
LLL.3......3.LLL
L1L3........3L1L
LLL..........LLL` ],
  [ smelter, bitmap`
................
................
..........FF....
..........FF....
..........FF....
....111111111...
....1LLLLLLL1...
....1L1L1L1L1...
....1LLLLLLL1...
..LL111111111L..
..000000000000..
..039933399930..
..099693396690..
..000000000000..
................
................` ],
  [ atelier, bitmap`
................
.....LLLLLL.....
.....31661D.....
....L222222L....
...LLLLLLLLLL...
...L2.1111.2L...
...L2..11..2L...
...L2..69..2L...
...L2..33..2L...
...L2..93..2L...
...L2..36..2L...
...L2..63..2L...
...L2..39..2L...
...LLLLLLLLLL...
................
................` ],
  [ background, bitmap`
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
1111111111111111` ],
  [ goldr, bitmap`
................
................
......0066......
.....016FF6.....
..6FF11FFF0.....
..6FF1L11L10....
...661L11110....
...0L11111110...
...0LL6FF1L10...
...0LL166L6660..
...0FFL111FF60..
...6FFLL1LLLL...
....60LLLLL0....
................
................
................` ],
  [ goldl, bitmap`
................
................
......6600......
.....6FF610.....
.....0FFF11FF6..
....01L11L1FF6..
....01111L166...
...01111111L0...
...01L1FF6LL0...
..0666L661LL0...
..06FF111LFF0...
...LLLL1LLFF6...
....0LLLLL06....
................
................
................` ],
  [ goldlhit1, bitmap`
................
................
......6600......
.....00F610.....
.....0F0011FF6..
....01L11L1FF6..
....00011L166...
...01111001L0...
...01L1FF00L0...
..0006L661L00...
..0600011LFF0...
...LLLL0LLFF6...
....0LLLLL06....
................
................
................` ],
  [ goldrhit1, bitmap`
................
................
......6600......
.....00F610.....
.....0F0011FF6..
....01L11L1FF6..
....00011L166...
...01111001L0...
...01L1FF00L0...
..0006L661L00...
..0600011LFF0...
...LLLL0LLFF6...
....0LLLLL06....
................
................
................` ],
  [ goldrhit2, bitmap`
................
................
......6600......
.....00F610.....
.....0F0001FF6..
....01L11000F6..
....00001L100...
...01111001L0...
...01L1FF00L0...
..0006L661L00...
..0600011LFF0...
...LLLL00LFF6...
....0LLLL000....
................
................
................` ],
  [ goldlhit2, bitmap`
................
................
......6600......
.....00F610.....
.....0F0001FF6..
....01L11000F6..
....00001L100...
...01111001L0...
...01L1FF00L0...
..0006L661L00...
..0600011LFF0...
...LLLL00LFF6...
....0LLLL000....
................
................
................` ],
  [ diamondr, bitmap`
................
................
......07772.....
.....015572.....
....0115570.....
...275L11L10....
...275L11110....
...0551111110...
...0111115772...
...0LL11155720..
...055L1115770..
...275LL1LLLL...
...220LLLLL0....
................
................
................` ],
  [ diamondl, bitmap`
................
................
.....27770......
.....275510.....
.....0755110....
....01L11L572...
....01111L572...
...0111111550...
...2775111110...
..02755111LL0...
..0775111L550...
...LLLL1LL572...
....0LLLLL022...
................
................
................` ],
  [ diamondlhit1, bitmap`
................
................
.....00770......
.....200510.....
.....0700110....
....00L100572...
....00011L572...
...0110111550...
...2775111110...
..027551000L0...
..0000011L000...
...LLL00LL572...
....0LL0LL022...
................
................
................` ],
  [ diamondrhit1, bitmap`
................
................
.....00770......
.....200510.....
.....0700110....
....00L100572...
....00011L572...
...0110111550...
...2775111110...
..027551000L0...
..0000011L000...
...LLL00LL572...
....0LL0LL022...
................
................
................` ],
  [ diamondrhit2, bitmap`
................
................
.....00770......
.....200510.....
.....0700110....
....00L100072...
....00011L002...
...0110011500...
...2775001110...
..027551000L0...
..0000011L000...
...LLL00LL572...
....0LL0LL022...
................
................
................` ],
  [ diamondlhit2, bitmap`
................
................
.....00770......
.....200510.....
.....0700110....
....00L100072...
....00011L002...
...0110011500...
...2775001110...
..027551000L0...
..0000011L000...
...LLL00LL572...
....0LL0LL022...
................
................
................` ],
  [ rockr, bitmap`
................
................
......000.......
.....01220......
....0111L20.....
....01L11L10....
...0L1L11110....
...0L11111110...
...0LL1111L10...
...0LL111LL1L0..
...0LLL11111L0..
....0LLL1LLLL...
.....0LLLLL0....
................
................
................` ],
  [ rockl, bitmap`
................
................
.......000......
......02210.....
.....02L1110....
....01L11L10....
....01111L1L0...
...01111111L0...
...01L1111LL0...
..0L1LL111LL0...
..0L11111LLL0...
...LLLL1LLL0....
....0LLLLL0.....
................
................
................` ],
  [ ironl, bitmap`
................
................
.......000FF....
...FFF0221FLF...
..FL11FL11F1F...
...FFLF11L1FF...
....FF111L1L0...
...01111FFFL0...
...01L11FLFL0...
..0LFFF11FLL0...
..0LF1LF1LLL0...
...LFFFFLLL0....
....0LLLLL0.....
................
................
................` ],
  [ ironr, bitmap`
................
................
.......000FF....
...FFF0221FLF...
..FL11FL11F1F...
...FFLF11L1FF...
....FF111L1L0...
...01111FFFL0...
...01L11FLFL0...
..0LFFF11FLL0...
..0LF1LF1LLL0...
...LFFFFLLL0....
....0LLLLL0.....
................
................
................` ],
  [ ironrhit1, bitmap`
................
................
.......000FF....
...0FF0220FLF...
..FL000L1001F...
...FFLF11L00F...
....FF101L100...
...001100FFL0...
...00L11F0FL0...
..0LF0F11F0L0...
..0LF1LF1LL00...
...LFFFFLLL0....
....0LLLLL0.....
................
................
................` ],
  [ ironlhit1, bitmap`
................
................
....FF000.......
...FLF0220FF0...
...F1001L000LF..
...F00L11FLFF...
...001L101FF....
...0LFF001100...
...0LF0F11L00...
...0L0F11F0FL0..
...00LL1FL1FL0..
....0LLLFFFFL...
.....0LLLLL0....
................
................
................` ],
  [ ironlhit2, bitmap`
................
................
....FF0000......
...FLF0000FF0...
...F1001L000LF..
...F00L1100FF...
...001L100FF....
...0LFF000100...
...0LF0011L00...
...0L001100FL0..
...00LL1001FL0..
....0LL00FFFL...
.....0L0LLL0....
................
................
................` ],
  [ ironrhit2, bitmap`
................
................
....FF0000......
...FLF0000FF0...
...F1001L000LF..
...F00L1100FF...
...001L100FF....
...0LFF000100...
...0LF0011L00...
...0L001100FL0..
...00LL1001FL0..
....0LL00FFFL...
.....0L0LLL0....
................
................
................` ],
  [ coall, bitmap`
................
................
.......2220.....
......222000....
....022L1110....
...001L11L10....
..0001100L1L2...
...00100011L2...
...01L1111LL2...
..2L1LL110LL2...
..2L100100LL2...
...L0001LLL2....
....00LLLL2.....
................
................
................` ],
  [ coalr, bitmap`
................
................
.......2220.....
......222000....
....022L1110....
...001L11L10....
..0001100L1L2...
...00100011L2...
...01L1111LL2...
..2L1LL110LL2...
..2L100100LL2...
...L0001LLL2....
....00LLLL2.....
................
................
................` ],
  [ coalrhit1, bitmap`
................
................
.......2220.....
......222000....
....02222110....
...221L12210....
..0022100L1L2...
...00100011L2...
...01L2111LL2...
..221L2210LL2...
..22200220LL2...
...L0001L2L2....
....00LLLL2.....
................
................
................` ],
  [ coallhit1, bitmap`
................
................
.......2220.....
......222000....
....02222110....
...221L12210....
..0022100L1L2...
...00100011L2...
...01L2111LL2...
..221L2210LL2...
..22200220LL2...
...L0001L2L2....
....00LLLL2.....
................
................
................` ],
  [ coallhit2, bitmap`
................
................
.......2220.....
......222000....
....02222110....
...221L12210....
..0022100L222...
...0022001122...
...01L2111LL2...
..221L2210LL2...
..22220220LL2...
...L0221L2L2....
....002LLL2.....
................
................
................` ],
  [ coalrhit2, bitmap`
................
................
.......2220.....
......222000....
....02222110....
...221L12210....
..0022100L222...
...0022001122...
...01L2111LL2...
..221L2210LL2...
..22220220LL2...
...L0221L2L2....
....002LLL2.....
................
................
................` ],
  [ rocklhit1, bitmap`
................
................
.......000......
......02210.....
.....02L0110....
....01L10010....
....00111L000...
...01001111L0...
...01L0110LL0...
..0L1LL1100L0...
..0001111L0L0...
...LLLL1LL00....
....0LLLLL0.....
................
................
................` ],
  [ rockrhit1, bitmap`
................
................
......000.......
.....01220......
....0110L20.....
....01001L10....
...000L11100....
...0L11110010...
...0LL0110L10...
...0L0011LL1L0..
...0L0L1111000..
....00LL1LLLL...
.....0LLLLL0....
................
................
................` ],
  [ rocklhit2, bitmap`
................
................
.......000......
......00010.....
.....02L0110....
....01L10010....
....00111L000...
...01001111L0...
...01L0000LL0...
..0L1LL1100L0...
..0000111L0L0...
...LLL00LL00....
....0LL0LL0.....
................
................
................` ],
  [ rockrhit2, bitmap`
................
................
......000.......
.....01000......
....0110L20.....
....01001L10....
...000L11100....
...0L11110010...
...0LL0000L10...
...0L0011LL1L0..
...0L0L1110000..
....00LL00LLL...
.....0LL0LL0....
................
................
................` ],
)

setSolids([])
let strength = 1
let rockspawnamt = 45
let level = 0
let rocks = 0
let coal = 0
let diamonds = 0
let cdiamonds = 0
let riron = 0
let iron = 0
let rgold = 0
let gold = 0
let isShopOpen = false;
let shopSelection = 0;
let goDeeperCost = 500
let droneStrengthCost = 200
let droneCost = 50;
let money = 10000000000
let floor = 0
let shopPage = 1
let smelterCost = 1000
let canExtractIron = false
let canExtractGold = false
let extractorSpeedCost = 1000
let droneStrength = 1
let extractorCost = 500
let canExtractDiamond = false
let atelierCost = 25000
let canSmeltGold = false
let smeltGoldCost = 5000
let extractGoldCost = "10000 Money"
let extractIronCost = "2500 Money"
let extractDiamondCost = "15000 Money"
let extractorSpeed = 8
addText("Rocks: " + rocks + " Coal: " + coal, {x:0, y:0, color: color`2`})
addText("WASD: Move", {x: 0, y:1, color: color`2`})
addText("I: Shop", {x: 0, y:2, color: color`2`})
addText("L: Destroy Rock", {x: 0, y:3, color: color`2`})
addText("Welcome to the caves", {x:0, y:4, color: color`2`})
addText("Your goal is to find", {x: 0, y:5, color: color`2`})
addText("Ellis's Emerald and", {x: 0, y:6, color: color`2`})
addText("prove that its real", {x: 0, y:7, color: color`2`})
addText("once and for all", {x: 0, y:8, color: color`2`})
let strengthCost = 15;
const droneSpeed = 3; 
let droneTickCounter = 0;
const levels = [
  map`
1..4......
.4.....7..
.....7....
.......4..
....7...7.
7.........
..........
..........`
]

setMap(levels[level])
setBackground(background)
setPushables({
  [ drone ]: [drone]
})


onInput("s", () => {
  getFirst(cursor).y += 1
})
onInput("w", () => {
  getFirst(cursor).y -= 1
})
onInput("a", () => {
  getFirst(cursor).x -= 1
})
onInput("d", () => {
  getFirst(cursor).x += 1
})
function startCutscene() {
  clearText()
  setMap(map`
1.........
..........
..........
..........
..........
..........
....-.....
..........`)
  setBackground(bg2)
  addText("As you go descend", {x:0, y:0, color: color`2`})
  addText("you think: I'll", {x: 0, y:1, color: color`2`})
  addText("never find it.", {x: 0, y:2, color: color`2`})
  addText("Suddenly the ground", {x: 0, y:3, color: color`2`})
  addText("rumbles and there it", {x:0, y:4, color: color`2`})
  addText("is. Ellis's Emerald", {x: 0, y:5, color: color`2`})
  addText("You realise you can", {x: 0, y:6, color: color`2`})
  addText("keep mining or go", {x: 0, y:7, color: color`2`})
  addText("home...", {x: 0, y:8, color: color`2`})
}
onInput("l", () => {
  const c = getFirst(cursor);
  if (!c) return;

  const currentTileItems = getTile(c.x, c.y);

  let resource = currentTileItems.find(t => 
    t.type === rockl || t.type === rockr || 
    t.type === rocklhit1 || t.type === rockrhit1 || 
    t.type === rocklhit2 || t.type === rockrhit2 ||
    t.type === coall || t.type === coalr || 
    t.type === coallhit1 || t.type === coalrhit1 || 
    t.type === coallhit2 || t.type === coalrhit2 ||
    t.type === ironl || t.type === ironr ||
    t.type === ironlhit1 || t.type === ironrhit1 ||
    t.type === ironlhit2 || t.type === ironrhit2 ||
    t.type === goldl || t.type === goldr ||
    t.type === goldlhit1 || t.type === goldrhit1 ||
    t.type === goldlhit2 || t.type === goldrhit2 ||
    t.type === diamondl || t.type === diamondr ||
    t.type === diamondlhit1 || t.type === diamondrhit1 ||
    t.type === diamondlhit2 || t.type === diamondrhit2 
  );

  if (resource) {
    let currentHits = resource._hitsAmt !== undefined ? resource._hitsAmt : 0;
    let maxHealth = 3;
    let resourceType = "rock";
    let side = "l";

    if (resource.type === rockl || resource.type === rocklhit1 || resource.type === rocklhit2) {
      resourceType = "rock"; maxHealth = 3; side = "l";
    } else if (resource.type === rockr || resource.type === rockrhit1 || resource.type === rockrhit2) {
      resourceType = "rock"; maxHealth = 3; side = "r";
    } else if (resource.type === coall || resource.type === coallhit1 || resource.type === coallhit2) {
      resourceType = "coal"; maxHealth = 10; side = "l";
    } else if (resource.type === coalr || resource.type === coalrhit1 || resource.type === coalrhit2) {
      resourceType = "coal"; maxHealth = 10; side = "r";
    } else if (resource.type === ironl || resource.type === ironlhit1 || resource.type === ironlhit2) {
      resourceType = "iron"; maxHealth = 100; side = "l";
    } else if (resource.type === ironr || resource.type === ironrhit1 || resource.type === ironrhit2) {
      resourceType = "iron"; maxHealth = 100; side = "r";
    } else if (resource.type === goldl || resource.type === goldlhit1 || resource.type === goldlhit2) {
      resourceType = "gold"; maxHealth = 500; side = "l";
    } else if (resource.type === goldr || resource.type === goldrhit1 || resource.type === goldrhit2) {
      resourceType = "gold"; maxHealth = 500; side = "r";
    } else if (resource.type === diamondr || resource.type === diamondrhit1 || resource.type === diamondrhit2) {
      resourceType = "diamond"; maxHealth = 2500; side = "r";
    } else if (resource.type === diamondl || resource.type === diamondlhit1 || resource.type === diamondlhit2) {
      resourceType = "diamond"; maxHealth = 2500; side = "l";
    }

    let newHits = currentHits + strength;
    playTune(rockbreak)
    updateGameUI();
    addText("Hits: " + newHits, { x: 0, y: 13, color: color`3` });

    if (newHits >= maxHealth) {
      if (resourceType === "coal") coal += 1;
      else if (resourceType === "iron") riron += 1;
      else if (resourceType === "gold") rgold += 1;
      else if (resourceType === "diamond") diamonds +=1;
      else rocks += 1;
      
      resource.remove();
      updateGameUI();
    } else {
      if (resourceType === "coal") {
        if (side === "l") {
          if (newHits >= 7) resource.type = coallhit2;
          else if (newHits >= 4) resource.type = coallhit1;
        } else {
          if (newHits >= 7) resource.type = coalrhit2;
          else if (newHits >= 4) resource.type = coalrhit1;
        }
      } else if (resourceType === "iron") {
        if (side === "l") {
          if (newHits >= 70) resource.type = ironlhit2;
          else if (newHits >= 35) resource.type = ironlhit1;
        } else {
          if (newHits >= 70) resource.type = ironrhit2;
          else if (newHits >= 35) resource.type = ironrhit1;
        }
      } else if (resourceType === "gold") {
        if (side === "l") {
          if (newHits >= 334) resource.type = goldlhit2;
          else if (newHits >= 167) resource.type = goldlhit1;
        } else {
          if (newHits >= 334) resource.type = goldrhit2;
          else if (newHits >= 167) resource.type = goldrhit1;
        }
      } else if (resourceType === "diamond") {
        if (side === "l") {
          if (newHits >= 1668) resource.type = diamondlhit2;
          else if (newHits >= 835) resource.type = diamondlhit1;
        } else {
          if (newHits >= 1668) resource.type = diamondrhit2;
          else if (newHits >= 835) resource.type = diamondrhit1;
        }
      } else {
        if (side === "l") {
          if (newHits === 1) resource.type = rocklhit1;
          else if (newHits === 2) resource.type = rocklhit2;
        } else {
          if (newHits === 1) resource.type = rockrhit1;
          else if (newHits === 2) resource.type = rockrhit2;
        }
      }

      const updatedResources = getTile(c.x, c.y);
      const activeResource = updatedResources.find(t => 
        t.type === rockl || t.type === rockr || 
        t.type === rocklhit1 || t.type === rockrhit1 || 
        t.type === rocklhit2 || t.type === rockrhit2 ||
        t.type === coall || t.type === coalr || 
        t.type === coallhit1 || t.type === coalrhit1 || 
        t.type === coallhit2 || t.type === coalrhit2 ||
        t.type === ironl || t.type === ironr ||
        t.type === ironlhit1 || t.type === ironrhit1 ||
        t.type === ironlhit2 || t.type === ironrhit2 ||
        t.type === goldl || t.type === goldr ||
        t.type === goldlhit1 || t.type === goldrhit1 ||
        t.type === goldlhit2 || t.type === goldrhit2 ||
        t.type === diamondl || t.type === diamondr ||
        t.type === diamondlhit1 || t.type === diamondrhit1 ||
        t.type === diamondlhit2 || t.type === diamondrhit2 
      );
      if (activeResource) {
        activeResource._hitsAmt = newHits;
      }
    }
  }
});


onInput("i", () => {
  isShopOpen = !isShopOpen;
  if (!isShopOpen) {
    clearText();
    updateGameUI()
  } else {
    shopSelection = 0;
    drawShop();
  }
});

onInput("w", () => {
  if (!isShopOpen) return;
  if (shopSelection > 0) {
    shopSelection--;
    drawShop();
  }
});
onInput("d", () => {
  if (!isShopOpen) return;
  if (shopPage < 5) {
    shopPage++;
    drawShop();
  }
});
onInput("a", () => {
  if (!isShopOpen) return;
  if (shopPage > 1) {
    shopPage--;
    drawShop();
  }
});

onInput("s", () => {
  if (!isShopOpen) return;
  if (shopSelection < 3) {
    shopSelection++;
    drawShop();
  }
});

onInput("l", () => {
  if (!isShopOpen) return;

  const c = getFirst(cursor);
  if (!c) return;
  if (shopPage === 1) {
  if (shopSelection === 0) {
    if (money >= droneCost) {
      money -= droneCost;
      addSprite(c.x, c.y, drone);
      droneCost = Math.floor(droneCost * 2);
      drawShop();
    }
  } else if (shopSelection === 1) {
    if (money >= strengthCost) {
      money -= strengthCost;
      strength += 1;
      strengthCost = Math.floor(strengthCost * 1.8);
      drawShop();
    }
  } else if (shopSelection === 2) {
    if (money >= goDeeperCost) {
      money -= goDeeperCost;
      floor += 1
      goDeeperCost = Math.floor(goDeeperCost * 5);
      drawShop();
      if (floor === 5) {
        startCutscene()
      }
    }
  } else if (shopSelection === 3) {
    money += rocks
    rocks = 0;
    drawShop();
  }
  } else if (shopPage === 2) {
  if (shopSelection === 0) {
    if (money >= extractorCost) {
      money -= extractorCost;
      addSprite(c.x, c.y, extractor);
      extractorCost = Math.floor(extractorCost * 2);
      drawShop();
    }
  } else if (shopSelection === 1) {
    if (money >= droneStrengthCost) {
      money -= droneStrengthCost;
      droneStrength += 1;
      droneStrengthCost = Math.floor(droneStrengthCost * 2);
      drawShop();
    }
  } else if (shopSelection === 2) {
    if (money >= 2500 && !(extractIronCost === "Bought")) {
      money -= 2500;
      canExtractIron = true
      extractIronCost = "Bought"
      drawShop();
    }
  } else if (shopSelection === 3) {
    money += coal*2
    coal = 0;
    drawShop();
  }
  }else if (shopPage === 3) {
  if (shopSelection === 0) {
    if (money >= smelterCost) {
      money -= smelterCost;
      addSprite(c.x, c.y, smelter);
      smelterCost = Math.floor(smelterCost * 2);
      drawShop();
    }
  } else if (shopSelection === 1) {
    if (money >= extractorSpeedCost) {
      money -= extractorSpeedCost;
      extractorSpeed = Math.floor(extractorSpeed * 0.8);
      extractorSpeedCost = Math.floor(extractorSpeedCost * 2);
      drawShop();
    }
  } else if (shopSelection === 2) {
    money += riron*5;
    riron = 0
    drawShop();
  } else if (shopSelection === 3) {
    money += iron*20
    iron = 0;
    drawShop();
  }
  }else if (shopPage === 4) {
  if (shopSelection === 0) {
    if (money >= 10000 && !(extractGoldCost === "Bought")) {
      money -= 10000;
      extractGoldCost = "Bought"
      canExtractGold = true
      drawShop();
    }
    } else if (shopSelection === 1) {
    if (money >= 5000 && !(smeltGoldCost === "Bought")) {
      money -= 5000;
      canSmeltGold = true;
      smeltGoldCost = "Bought";
      drawShop();
    }
  } else if (shopSelection === 2) {
    money += rgold*50;
    rgold = 0
    drawShop();
  } else if (shopSelection === 3) {
    money += gold*250
    gold = 0;
    drawShop();
  }
  }else if (shopPage === 5) {
  if (shopSelection === 0) {
    if (money >= atelierCost) {
      money -= atelierCost;
      addSprite(c.x, c.y, atelier);
      atelierCost = atelierCost*2;
      drawShop();
    }
  } else if (shopSelection === 1) {
    if (money >= 20000 && !(extractDiamondCost === "Bought")) {
      money -= 20000;
      canExtractDiamond = true;
      extractDiamondCost = "Bought";
      drawShop();
    }
  } else if (shopSelection === 2) {
    money += diamonds*500;
    diamonds = 0
    drawShop();
  } else if (shopSelection === 3) {
    money += cdiamonds*2500
    cdiamonds = 0;
    drawShop();
  }
  }
});
function updateGameUI() {
  if (isShopOpen) return;
  clearText();
  if (floor > 0) {
    addText("Rocks: " + rocks + " Coal: " + coal, {x:0, y:0, color: color`2`});
  } else {
    addText("Rocks: " +rocks, {x:0, y:0, color: color`2`});
  }
  if (floor > 1) {
  addText("Raw Iron: " + riron + " Iron: " + iron, {x:0, y:1, color: color`2`});}
  if (floor > 2) {
  addText("Raw Gold: " + rgold + " Gold: " + gold, {x:0, y:2, color: color`2`});}
  if (floor > 3) {
  addText("Diamonds: " + diamonds, {x:0, y:3, color: color`2`});
  addText("Cut Diamonds: " + cdiamonds, {x:0, y:4, color: color`2`});}
}

function drawShop() {
  clearText();
  addText("=== UPGRADE SHOP ===", { x: 1, y: 1, color: color`5` });
  addText("Money: " + money + " Page: " + shopPage, { x: 1, y: 2, color: color`2` });
  if (shopPage === 1) {
  let dronePrefix = shopSelection === 0 ? "> " : "  ";
  addText(dronePrefix + "Buy Drone", { x: 1, y: 4, color: color`2` });
  addText("(" + droneCost + " Money)", { x: 1, y: 5, color: color`2` });

  let strengthPrefix = shopSelection === 1 ? "> " : "  ";
  addText(strengthPrefix + "Upgrade Drill", { x: 1, y: 6, color: color`2` });
  addText("(" + strengthCost + " Money)", { x: 1, y: 7, color: color`2` });
  
  let deeperPrefix = shopSelection === 2 ? "> " : "  ";
  addText(deeperPrefix + "Go Deeper", { x: 1, y: 8, color: color`2` });
  addText("(" + goDeeperCost + " Money)", { x: 1, y: 9, color: color`2` });
  
  let sellRocksPrefix = shopSelection === 3 ? "> " : "  ";
  addText(sellRocksPrefix + "Sell Rocks", { x: 1, y: 10, color: color`2` });
  addText("(+" + rocks + " Money)", { x: 1, y: 11, color: color`2` });
  } else if (shopPage === 2) {
    let extractorPrefix = shopSelection === 0 ? "> " : "  ";
    addText(extractorPrefix + "Buy Extractor", { x: 1, y: 4, color: color`2` });
    addText("(" + extractorCost + " Money)", { x: 1, y: 5, color: color`2` });

    let strengthPrefix = shopSelection === 1 ? "> " : "  ";
    addText(strengthPrefix + "+Drone Strength", { x: 1, y: 6, color: color`2` });
    addText("(" + droneStrengthCost + " Money)", { x: 1, y: 7, color: color`2` });
  
    let extractIronPrefix = shopSelection === 2 ? "> " : "  ";
    addText(extractIronPrefix + "Extract Iron", { x: 1, y: 8, color: color`2` });
    addText("(" + extractIronCost +")", { x: 1, y: 9, color: color`2` });
  
    let sellCoalPrefix = shopSelection === 3 ? "> " : "  ";
    addText(sellCoalPrefix + "Sell Coal", { x: 1, y: 10, color: color`2` });
    addText("(+" + coal*2 + " Money)", { x: 1, y: 11, color: color`2` });
  } else if (shopPage === 3) {
    let smelterPrefix = shopSelection === 0 ? "> " : "  ";
    addText(smelterPrefix + "Buy Smelter", { x: 1, y: 4, color: color`2` });
    addText("(" + smelterCost + " Money)", { x: 1, y: 5, color: color`2` });

    let extractorSpeedPrefix = shopSelection === 1 ? "> " : "  ";
    addText(extractorSpeedPrefix + "+Extractor Speed", { x: 1, y: 6, color: color`2` });
    addText("(" + extractorSpeedCost + " Money)", { x: 1, y: 7, color: color`2` });
  
    let sellRawIronPrefix = shopSelection === 2 ? "> " : "  ";
    addText(sellRawIronPrefix + "Sell Raw Iron", { x: 1, y: 8, color: color`2` });
    addText("(+" + riron*5 +" Money)", { x: 1, y: 9, color: color`2` });
  
    let sellIronPrefix = shopSelection === 3 ? "> " : "  ";
    addText(sellIronPrefix + "Sell Iron", { x: 1, y: 10, color: color`2` });
    addText("(+" + iron*20 + " Money)", { x: 1, y: 11, color: color`2` });
  }else if (shopPage === 4) {
    let canExtractGoldPrefix = shopSelection === 0 ? "> " : "  ";
    addText(canExtractGoldPrefix + "Extract Gold", { x: 1, y: 4, color: color`2` });
    addText("(" + extractGoldCost + ")", { x: 1, y: 5, color: color`2` });

    let canSmeltGoldPrefix = shopSelection === 1 ? "> " : "  ";
    addText(canSmeltGoldPrefix + "+Smelt Gold", { x: 1, y: 6, color: color`2` });
    addText("(" + smeltGoldCost + ")", { x: 1, y: 7, color: color`2` });
  
    let sellRawGoldPrefix = shopSelection === 2 ? "> " : "  ";
    addText(sellRawGoldPrefix + "Sell Raw Gold", { x: 1, y: 8, color: color`2` });
    addText("(+" + rgold*50 +" Money)", { x: 1, y: 9, color: color`2` });
  
    let sellGoldPrefix = shopSelection === 3 ? "> " : "  ";
    addText(sellGoldPrefix + "Sell Gold", { x: 1, y: 10, color: color`2` });
    addText("(+" + gold*250 + " Money)", { x: 1, y: 11, color: color`2` });
  }else if (shopPage === 5) {
    let atelierPrefix = shopSelection === 0 ? "> " : "  ";
    addText(atelierPrefix + "Buy Atelier", { x: 1, y: 4, color: color`2` });
    addText("(" + atelierCost + ")", { x: 1, y: 5, color: color`2` });

    let  canExtractDiamondPrefix= shopSelection === 1 ? "> " : "  ";
    addText(canExtractDiamondPrefix + "Extract Diamond", { x: 1, y: 6, color: color`2` });
    addText("(" + extractDiamondCost + ")", { x: 1, y: 7, color: color`2` });
  
    let sellDiamondsPrefix = shopSelection === 2 ? "> " : "  ";
    addText(sellDiamondsPrefix + "Sell Diamonds", { x: 1, y: 8, color: color`2` });
    addText("(+" + diamonds*500 +" Money)", { x: 1, y: 9, color: color`2` });
  
    let sellCDiamondsPrefix = shopSelection === 3 ? "> " : "  ";
    addText(sellCDiamondsPrefix + "Sell Cut Diamonds", { x: 1, y: 10, color: color`2` });
    addText("(+" + cdiamonds*2500 + " Money)", { x: 1, y: 11, color: color`2` });
  }
  addText("I: Close  L: Buy", { x: 1, y: 12, color: color`7` });
  addText("W/S: Select", { x: 1, y: 13, color: color`7` });
  addText("A/D: Select Page", { x: 1, y: 14, color: color`7` });
}
setInterval(() => {
  if (isShopOpen) return;

  const currentLeftRocks = getAll(rockl).length + getAll(rocklhit1).length + getAll(rocklhit2).length;
  const currentRightRocks = getAll(rockr).length + getAll(rockrhit1).length + getAll(rockrhit2).length;
  const currentLeftCoal = getAll(coall).length + getAll(coallhit1).length + getAll(coallhit2).length;
  const currentRightCoal = getAll(coalr).length + getAll(coalrhit1).length + getAll(coalrhit2).length;
  const currentLeftIron = getAll(ironl).length + getAll(ironlhit1).length + getAll(ironlhit2).length;
  const currentRightIron = getAll(ironr).length + getAll(ironrhit1).length + getAll(ironrhit2).length;
  const currentLeftGold = getAll(goldl).length + getAll(goldlhit1).length + getAll(goldlhit2).length;
  const currentRightGold = getAll(goldr).length + getAll(goldrhit1).length + getAll(goldrhit2).length;
  const currentLeftDiamond = getAll(diamondl).length + getAll(diamondlhit1).length + getAll(diamondlhit2).length;
  const currentRightDiamond = getAll(diamondr).length + getAll(diamondrhit1).length + getAll(diamondrhit2).length;
  const totalResources = currentLeftRocks + currentRightRocks + currentLeftCoal + currentRightCoal + currentLeftIron + currentRightIron + currentLeftGold + currentRightGold + currentLeftDiamond + currentRightDiamond;

  if (totalResources >= 45) return;

  const randomSpawnCount = Math.floor(Math.random() * rockspawnamt) + 1;
  const spotsToSpawn = Math.min(randomSpawnCount, 45 - totalResources);

  for (let i = 0; i < spotsToSpawn; i++) {
    const rx = Math.floor(Math.random() * 10);
    const ry = Math.floor(Math.random() * 8);

    const tileItems = getTile(rx, ry);
    if (tileItems.length === 0) {
      if (floor === 0) {
        const chosenRockType = Math.random() < 0.5 ? rockl : rockr;
        addSprite(rx, ry, chosenRockType);
      } else if (floor === 1) {
        if (Math.random() < 0.5) {
          const chosenCoalType = Math.random() < 0.5 ? coall : coalr;
          addSprite(rx, ry, chosenCoalType);
        } else {
          const chosenRockType = Math.random() < 0.5 ? rockl : rockr;
          addSprite(rx, ry, chosenRockType);
        }
      } else if (floor === 2) {
        let spawnChance = Math.random();
        if (spawnChance < 0.50) {
          const chosenIronType = Math.random() < 0.5 ? ironl : ironr;
          addSprite(rx, ry, chosenIronType);
        } else if (spawnChance < 0.75) {
          const chosenCoalType = Math.random() < 0.5 ? coall : coalr;
          addSprite(rx, ry, chosenCoalType);
        } else {
          const chosenRockType = Math.random() < 0.5 ? rockl : rockr;
          addSprite(rx, ry, chosenRockType);
        }
      } else if (floor === 3){
        let spawnChance = Math.random();
        if (spawnChance < 0.25) {
          const chosenGoldType = Math.random() < 0.5 ? goldl : goldr;
          addSprite(rx, ry, chosenGoldType);
        } else if (spawnChance < 0.50) {
          const chosenIronType = Math.random() < 0.5 ? ironl : ironr;
          addSprite(rx, ry, chosenIronType);
        } else if (spawnChance < 0.75) {
          const chosenCoalType = Math.random() < 0.5 ? coall : coalr;
          addSprite(rx, ry, chosenCoalType);
        } else {
          const chosenRockType = Math.random() < 0.5 ? rockl : rockr;
          addSprite(rx, ry, chosenRockType);
        }
      } else if (floor >= 4){
        let spawnChance = Math.random();
        if (spawnChance < 0.20) {
          const chosenDiamondType = Math.random() < 0.5 ? diamondl : diamondr;
          addSprite(rx, ry, chosenDiamondType);
        } else if (spawnChance < 0.40) {
          const chosenGoldType = Math.random() < 0.5 ? goldl : goldr;
          addSprite(rx, ry, chosenGoldType);
        } else if (spawnChance < 0.60) {
          const chosenIronType = Math.random() < 0.5 ? ironl : ironr;
          addSprite(rx, ry, chosenIronType);
        } else if (spawnChance < 0.80) {
          const chosenCoalType = Math.random() < 0.5 ? coall : coalr;
          addSprite(rx, ry, chosenCoalType);
        } else {
          const chosenRockType = Math.random() < 0.5 ? rockl : rockr;
          addSprite(rx, ry, chosenRockType);
        }
      }
    }
  }
}, 2500);

setInterval(() => {
  if (isShopOpen) return;
  const activeDrones = getAll(drone);
  
  const allResources = [
    ...getAll(rockl), ...getAll(rockr),
    ...getAll(rocklhit1), ...getAll(rockrhit1),
    ...getAll(rocklhit2), ...getAll(rockrhit2),
    ...getAll(coall), ...getAll(coalr),
    ...getAll(coallhit1), ...getAll(coalrhit1),
    ...getAll(coallhit2), ...getAll(coalrhit2),
    ...getAll(ironl), ...getAll(ironr),
    ...getAll(ironlhit1), ...getAll(ironrhit1),
    ...getAll(ironlhit2), ...getAll(ironrhit2),
    ...getAll(goldl), ...getAll(goldr),
    ...getAll(goldlhit1), ...getAll(goldrhit1),
    ...getAll(goldlhit2), ...getAll(goldrhit2)
  ];

  allResources.forEach(r => {
    if (r._claimedBy && !activeDrones.some(d => d === r._claimedBy)) {
      r._claimedBy = undefined;
    }
  });

  activeDrones.forEach((d) => {
    if (d._tick === undefined) d._tick = 0;
    
    d._tick++;
    if (d._tick < droneSpeed) return;
    d._tick = 0;

    if (allResources.length === 0) return;

    let closestResource = null;
    let minDistance = Infinity;

    allResources.forEach((r) => {
      if (r._claimedBy && r._claimedBy !== d) return;
      const dist = Math.abs(d.x - r.x) + Math.abs(d.y - r.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestResource = r;
      }
    });

    if (!closestResource) {
      allResources.forEach((r) => {
        const dist = Math.abs(d.x - r.x) + Math.abs(d.y - r.y);
        if (dist < minDistance) {
          minDistance = dist;
          closestResource = r;
        }
      });
    }

    if (!closestResource) return;
    closestResource._claimedBy = d;

    if (d.x === closestResource.x && d.y === closestResource.y) {
      let currentHits = closestResource._hitsAmt !== undefined ? closestResource._hitsAmt : 0;
      let maxHealth = 3;
      let resourceType = "rock";
      let side = "l";

      if (closestResource.type === rockl || closestResource.type === rocklhit1 || closestResource.type === rocklhit2) {
        resourceType = "rock"; maxHealth = 3; side = "l";
      } else if (closestResource.type === rockr || closestResource.type === rockrhit1 || closestResource.type === rockrhit2) {
        resourceType = "rock"; maxHealth = 3; side = "r";
      } else if (closestResource.type === coall || closestResource.type === coallhit1 || closestResource.type === coallhit2) {
        resourceType = "coal"; maxHealth = 10; side = "l";
      } else if (closestResource.type === coalr || closestResource.type === coalrhit1 || closestResource.type === coalrhit2) {
        resourceType = "coal"; maxHealth = 10; side = "r";
      } else if (closestResource.type === ironl || closestResource.type === ironlhit1 || closestResource.type === ironlhit2) {
        resourceType = "iron"; maxHealth = 100; side = "l";
      } else if (closestResource.type === ironr || closestResource.type === ironrhit1 || closestResource.type === ironrhit2) {
        resourceType = "iron"; maxHealth = 100; side = "r";
      } else if (closestResource.type === goldl || closestResource.type === goldlhit1 || closestResource.type === goldlhit2) {
        resourceType = "gold"; maxHealth = 500; side = "l";
      } else if (closestResource.type === goldr || closestResource.type === goldrhit1 || closestResource.type === goldrhit2) {
        resourceType = "gold"; maxHealth = 500; side = "r";
      } else if (closestResource.type === diamondl || closestResource.type === diamondlhit1 || closestResource.type === diamondlhit2) {
        resourceType = "diamond"; maxHealth = 2500; side = "l";
      } else if (closestResource.type === diamondr || closestResource.type === diamondrhit1 || closestResource.type === diamondrhit2) {
        resourceType = "diamond"; maxHealth = 2500; side = "r";
      }

      let newHits = currentHits + droneStrength;

      if (newHits >= maxHealth) {
        if (resourceType === "coal") coal += 1;
        else if (resourceType === "iron") riron += 1;
        else if (resourceType === "gold") rgold += 1;
        else if (resourceType === "diamond") diamonds += 1;
        else rocks += 1;
        playTune(rockbreak)
        closestResource.remove();
        updateGameUI();
      } else {
        if (resourceType === "coal") {
          if (side === "l") {
            if (newHits >= 7) closestResource.type = coallhit2;
            else if (newHits >= 4) closestResource.type = coallhit1;
          } else {
            if (newHits >= 7) closestResource.type = coalrhit2;
            else if (newHits >= 4) closestResource.type = coallhit1;
          }
        } else if (resourceType === "iron") {
          if (side === "l") {
            if (newHits >= 70) closestResource.type = ironlhit2;
            else if (newHits >= 35) closestResource.type = ironlhit1;
          } else {
            if (newHits >= 70) closestResource.type = ironrhit2;
            else if (newHits >= 35) closestResource.type = ironrhit1;
          }
        } else if (resourceType === "gold") {
          if (side === "l") {
            if (newHits >= 334) closestResource.type = goldlhit2;
            else if (newHits >= 167) closestResource.type = goldlhit1;
          } else {
            if (newHits >= 334) closestResource.type = goldrhit2;
            else if (newHits >= 167) closestResource.type = goldrhit1;
          }
        } else if (resourceType === "diamond") {
          if (side === "l") {
            if (newHits >= 1668) closestResource.type = diamondlhit2;
            else if (newHits >= 835) closestResource.type = diamondlhit1;
          } else {
            if (newHits >= 1668) closestResource.type = diamondrhit2;
            else if (newHits >= 835) closestResource.type = diamondrhit1;
          }
        } else {
          if (side === "l") {
            if (newHits === 1) closestResource.type = rocklhit1;
            else if (newHits === 2) closestResource.type = rocklhit2;
          } else {
            if (newHits === 1) closestResource.type = rockrhit1;
            else if (newHits === 2) closestResource.type = rockrhit2;
          }
        }

        const updatedResources = getTile(d.x, d.y);
        const activeResource = updatedResources.find(t => 
          t.type === rockl || t.type === rockr || 
          t.type === rocklhit1 || t.type === rockrhit1 || 
          t.type === rocklhit2 || t.type === rockrhit2 ||
          t.type === coall || t.type === coalr || 
          t.type === coallhit1 || t.type === coalrhit1 || 
          t.type === coallhit2 || t.type === coalrhit2 ||
          t.type === ironl || t.type === ironr ||
          t.type === ironlhit1 || t.type === ironrhit1 ||
          t.type === ironlhit2 || t.type === ironrhit2 ||
          t.type === goldl || t.type === goldr ||
          t.type === goldlhit1 || t.type === goldrhit1 ||
          t.type === goldlhit2 || t.type === goldrhit2 ||
          t.type === diamondl || t.type === diamondr ||
          t.type === diamondlhit1 || t.type === diamondrhit1 ||
          t.type === diamondlhit2 || t.type === diamondrhit2
        );
        if (activeResource) {
          activeResource._hitsAmt = newHits;
          playTune(rockbreak)
        }
      }
    } else {
      if (d.x < closestResource.x) d.x += 1;
      else if (d.x > closestResource.x) d.x -= 1;

      if (d.y < closestResource.y) d.y += 1;
      else if (d.y > closestResource.y) d.y -= 1;
      playTune(dronefly)
    }
  });
}, 150);

setInterval(() => {
  if (isShopOpen) return;
  const activeExtractors = getAll(extractor);
  
  let goldTargets = [];
  let ironTargets = [];
  let diamondTargets = [];
  const coalTargets = [
    ...getAll(coall), ...getAll(coalr),
    ...getAll(coallhit1), ...getAll(coalrhit1),
    ...getAll(coallhit2), ...getAll(coalrhit2)
  ];

  if (typeof canExtractIron !== "undefined" && canExtractIron === true) {
    ironTargets = [
      ...getAll(ironl), ...getAll(ironr),
      ...getAll(ironlhit1), ...getAll(ironrhit1),
      ...getAll(ironlhit2), ...getAll(ironrhit2)
    ];
  }

  if (typeof canExtractGold !== "undefined" && canExtractGold === true) {
    goldTargets = [
      ...getAll(goldl), ...getAll(goldr),
      ...getAll(goldlhit1), ...getAll(goldrhit1),
      ...getAll(goldlhit2), ...getAll(goldrhit2)
    ];
  }
  if (typeof canExtractDiamond !== "undefined" && canExtractDiamond === true) {
    diamondTargets = [
      ...getAll(diamondl), ...getAll(diamondr),
      ...getAll(diamondlhit1), ...getAll(diamondrhit1),
      ...getAll(diamondlhit2), ...getAll(diamondrhit2)
    ];
  }

  const targets = diamondTargets.length > 0 ? diamondTargets : (goldTargets.length > 0 ? goldTargets : (ironTargets.length > 0 ? ironTargets : coalTargets));

  targets.forEach(node => {
    if (node._extractedBy && !activeExtractors.some(e => e === node._extractedBy)) {
      node._extractedBy = undefined;
    }
  });

  activeExtractors.forEach((e) => {
    if (e._tick === undefined) e._tick = 0;
    
    let d_tick = e._tick + 1;
    if (d_tick < extractorSpeed) {
      e._tick = d_tick;
      return;
    }
    e._tick = 0;

    if (targets.length === 0) return;

    let closestNode = null;
    let minDistance = Infinity;

    targets.forEach((node) => {
      if (node._extractedBy && node._extractedBy !== e) return;
      const dist = Math.abs(e.x - node.x) + Math.abs(e.y - node.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestNode = node;
      }
    });

    if (!closestNode) {
      targets.forEach((node) => {
        const dist = Math.abs(e.x - node.x) + Math.abs(e.y - node.y);
        if (dist < minDistance) {
          minDistance = dist;
          closestNode = node;
        }
      });
    }

    if (!closestNode) return;
    closestNode._extractedBy = e;

    if (e.x === closestNode.x && e.y === closestNode.y) {
      const isIronNode = closestNode.type === ironl || closestNode.type === ironr || 
                         closestNode.type === ironlhit1 || closestNode.type === ironrhit1 || 
                         closestNode.type === ironlhit2 || closestNode.type === ironrhit2;

      const isGoldNode = closestNode.type === goldl || closestNode.type === goldr || 
                         closestNode.type === goldlhit1 || closestNode.type === goldrhit1 || 
                         closestNode.type === goldlhit2 || closestNode.type === goldrhit2;
      
      const isDiamondNode = closestNode.type === diamondl || closestNode.type === diamondr || 
                         closestNode.type === diamondlhit1 || closestNode.type === diamondrhit1 || 
                         closestNode.type === diamondlhit2 || closestNode.type === diamondrhit2;
      closestNode.remove();
      playTune(extraction)
      if (isDiamondNode) {
        diamonds += 1;
      } else if (isGoldNode) {
        rgold += 1;
      } else if (isIronNode) {
        riron += 1;
      } else {
        coal += 1;
      }
      
      addSprite(e.x, e.y, rockl);
      updateGameUI();
    } else {
      if (e.x < closestNode.x) e.x += 1;
      else if (e.x > closestNode.x) e.x -= 1;

      if (e.y < closestNode.y) e.y += 1;
      else if (e.y > closestNode.y) e.y -= 1;
      playTune(dronefly)
    }
  });
}, 150);

setInterval(() => {
  getAll(smelter).forEach(() => {
    if (canSmeltGold && rgold > 0 && coal > 4) {
      rgold -=1
      coal -=5
      gold +=1
    } else {
    if (riron > 0 && coal > 4) {
      riron -=1
      coal -=5
      iron +=1
    }}
  })
}, 5000)
setInterval(() => {
  getAll(atelier).forEach(() => {
    if (diamonds > 1) {
      diamonds -= 2
      cdiamonds += 1
    }
  })
}, 10000)
