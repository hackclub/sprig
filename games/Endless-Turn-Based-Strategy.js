/*
@title: Endless Turn-Based Combat
@description: A game where a group of inter-universe characters fight off the endless zerg invasion in a strategical turn-based gameplay.
@author: .effie
@tags: ['endless', 'turn-based', 'strategy']
@addedOn: 2025-05-08
*/

/* SPRITES */
const Kindler = 'w'
const Ranger  = 'r'
const Paladin = 't'
const Medic   = 's'
const Broodling = '0'
const Zergling  = '1'
const Infested  = '2'
const Hydralisk = '3'
const Mutalisk  = '4'
const Defiler   = '5'
const Guardian  = '6'
const Ultralisk = '7'
const Lurker    = '8'
const floor = 'B'
const dead = 'D'
const coffin = 'C'
const bordertop = 'I'
const border = 'K'
const explosion = 'E'
const burrow = 'U'

let spriteMap = {
  Kindler:'w',     Ranger:'r',  Paladin:'t', Medic:'s',
  Broodling:'0', Zergling:'1', Infested:'2', Hydralisk:'3',
  Mutalisk:'4',   Defiler:'5', Guardian:'6', Ultralisk:'7', Lurker:'8'
}

setLegend(
  [Kindler, bitmap`
......0000F0....
....00LLLFFL0...
...0L3LLLLFL0...
..0L333000000...
...033LLLLLLL0..
..0LL000C2000L0.
...000CC22CCC0..
...0C0C272270...
..0CC0C222220...
..0CC0C00300....
..0CC0FF00F0....
.0CC0FF0FF030...
..0C330FFF0F0...
...0220000020...
.....022020.....
.....0LLL0L0....`],
  [Ranger, bitmap`
................
..00000.........
.0DDDDD0..90....
.0DDDD660.090...
0DDD666660.09...
0D0266720..09...
0DD062220..09...
0D0062220..09.6.
.00D600FFFFFFF66
.0DDDD220D229...
..00DDDD00009...
...0CFFC0..09...
..0DDDDDD0090...
.0CC000CC090....
.000..0000......
................`],
  /*[Paladin, bitmap`
...0000000......
..0LLLLLFL0.....
.0LLLLLFFFL0....
.0LLL111F110....
.0LL1000F00.....
.0LL166666L.....
.0LL16722700000.
0660062220111110
0601102220111110
.011101110113110
.0CC011110133310
.000000F00113110
.0CC03333001310.
..0030003001110.
...010.010.010..
...0C0.0C0..0...`],*/
  /*[Paladin, bitmap`
..00...0....000.
.0LL000L0...050.
00LL111L0...050.
0L00LLL0L000LL0.
0LL00LL0LLLLLL0.
0LL011LL0LL00500
0LL100L0.0001110
.0L110L0...07770
..000LHL0...0770
....0H7HL0..0770
...0L7L7L0..0770
...0L7L7L0..0770
...0L707L0..070.
...0LL0LL0..070.
...00LL0LL0.070.
...00000000..0..`],*/
  [Paladin, bitmap`
..3....0000.....
...3.00FFFF00...
.0000FFFFFFFF0..
0LL0FFFFFFFF0...
0LLL0FF6FFFFF0..
0LFL0F65F65F0...
30FL00666660....
.0LF020666020...
.0LL102F77F20...
.0LL1021221200..
.0LL1101221020..
..0LL107117020..
..0LLF022220203.
...0FF02002000.3
...0FF0L00L0..3.
....000L00L0....`],
  [Medic, bitmap`
.....000........
....0CCC0.......
...0C66660......
...C66LL60......
...6LL27L0......
.L10666660......
.00026660.......
0L1202300.....4.
032202200....0.4
022332010000004D
.023301033LLL0..
..030L01330..0D4
.022CCC000....4.
.02CC0CC0.......
.0CC020CC0......
..000.0000......`],
  [Broodling, bitmap`
................
................
................
..........00....
...00.000020....
...020FFFFF0....
....0FFFFFF0....
.0000F0F0F00....
0HHH00808080....
.00H08888880....
...00808080000..
...0F0F0F0F0HH0.
...0FFFFFFF00000
....0FFFFF0.....
.....00000......
................`],
  [Zergling, bitmap`
................
...000000.......
..0HHHHHH0..00..
.0HHHHHHHH00H0..
0H00HHHH00H0H000
0H00HHHH00H000H0
0HHHHHHHHHH00HH0
.0HH0H0H0HH0HH0.
..00L0L0L0H000..
...00LL880HHH0..
..0HH0880HHHH0..
..0HHH00HHHHHH0.
...0HHHHHHH0HH0.
...0HH000HH000..
...000...000....
................`],
  [Infested, bitmap`
................
.......0000.....
......022220....
.....02222220...
..1.022222220...
.21.0222222200..
.21.022222200H0.
.21.0202020H0H0.
..21008080HHH0..
..210H8888HH0HH0
..210H8080HH000.
..21L0HH0HH0H0..
..LLHH0HHHH00H0.
....00HHHHHH000.
.....0HH00HH0...
......00..00....`],
  [Hydralisk, bitmap`
......0000......
.....0FFF0......
....0FFFF0......
....0FFFF0......
...0FFFF0.......
...0FFFF0.......
...0F0FF0.......
...0FFF0........
....88FH0.......
....88FFH0......
...08FF0F0......
...0F00FF0......
....00F00.......
....0FFH0H0.....
....0FFHH0......
.....0000.......`],
  [Mutalisk, bitmap`
...........0000.
00000.....0HHHH0
0HHHH0...0HHHH0.
.00HHH000HHH00..
...0H0FFF0H0....
...00F2F2FHH0...
.....0FFFF00....
......000F0.....
........0FF0....
.......0FFF0....
......1FFFF0....
.....0FF1F0.....
.....1FFF0......
......000.......
................
....LLLLLLLL....`],
  [Defiler, bitmap`
...........0..0.
...........0HH0.
............00..
............0F0.
....00.H0..0FF0.
...0HH00H00FHF0.
..0000H000FHH0..
.HHHHH00HHHH00..
....000HHHH00H0.
...H1FFFHH0000H.
...0F81F0000H0..
....08FH00H00H0.
.....00H0.0H0H0.
..........0H00..
..........0H0...
...........H....`],
  [Guardian, bitmap`
........8.......
..0000.0H00.....
.8HHFF0F0HH00H8.
80FF00FFHFHFF0..
.H00FFFHFHFF00..
8.0FFFFHHFFFF0..
..0FFFFFFF00FF0.
..802FFFFF0F0HH0
...80FFFH00H0080
.....80H00.H0...
.......8...8....
................
................
.....LLLLL......
...LLLLLLLLL....
....LLLLLLL.....`],
  [Ultralisk, bitmap`
.....0..00......
....0F00FF0.00..
....0FFFFFF0FF0.
.....0FFFFFFF0..
....0FFFFFFFF0..
...L0FFFFFFFC00.
.LL1FFFFFFFC0H0.
L11HLFFFFFC0HHF0
1HH.FFFFFLC0HFF0
H...0FFFFF01L0F0
....0808080H1LF0
.....0808FFH1LF0
......0000FH1L0.
..........0H1...
..........H1L...
.........H11....`],
  [Lurker, bitmap`
................
................
................
................
.......00H......
.......0FH0H....
....0.00HH0H0...
...0F0FF00HH000.
..00FFFFF00000F0
.0F0FFFFF0FH0HHF
0F0FFFFFFFF00H0.
0F0FFFFFFF00F0..
.003FFFFF0FHHF0.
..0FF3FF00FFH00.
...0FF00..0F0.0.
...000.....00...`],
  [dead, bitmap`
......0000......
....00222200....
...0222222220...
...0222222220...
..022022220220..
..022202202220..
.00220222202200.
0222222222272220
.02222000027220.
..022222222720..
..012222222210..
..011222222110..
..011112211110..
..011011110110..
..010.0110.010..
...0...00...0...`],
  [coffin, bitmap`
................
................
.....FFFFFF.....
....FHFFHHHF....
...FHHFHHHHHF...
...FHHFHH6HHF...
..FFFFFHH6HHF...
..FHHFH66666HF..
..FFFFH6H6H6HF..
...FHHFHH6HHF...
...FHHFHH6HHF...
...FHHFHH6HHF...
....FHFFHHHF....
....FHHFHHHF....
.....FFFFFF.....
................`],
  [explosion, bitmap`
.......C........
......C3C.....C.
.C....C3C...CC..
..CC.C393CCC3C..
..C3CC393C33C...
...C33363393C...
...C3996993CC...
.CC3396669333CC.
C33996666699933C
.CC3396669333CC.
...C3996993CC...
..C39339339C....
..C33C393CC3C...
.C3CC.C3C..CC...
.CC...C3C....C..
C......C........`],
  [burrow, bitmap`
................
................
................
................
......0.0.......
...0.01010.0....
..0101L1L1010...
.01L1LLLLL1L10..
0LLLLLLLLLLLLL0.
.0L0L0L0LLL0L0..
..0.0.0.0L0.0...
.........0......
................
................
................
................`],
  [floor, bitmap`
7777777777777777
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7777777777777777`],
  [bordertop, bitmap`
HHHHHHHHHHHHHHHH
8888888888888888
8888888888888888
HHHHHHHHHHHHHHHH
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
  [border, bitmap`
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
1111111111111111`]
)

setMap(map`
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
IIIIIIIIII
KKKKKKKKKK
KKKKKKKKKK`)

addSprite(0, 0, Kindler)
addSprite(0, 1, Ranger)
addSprite(0, 2, Paladin)
addSprite(0, 3, Medic)

/* CONSTANTS */
const MENU_X = 2
const MENU_Y_ATK = 12
const MENU_Y_SKILL = 13
const MENU_Y_ULT = 14
const CURSOR_X = 1
const SP_TEXT_X = 17
const SP_TEXT_Y = 15
const DMG_DISPLAY_DELAY = 750
const DMG_CLEAR_DELAY = 1000
const TURN_DELAY = 2500

/* GAME STATE */
var ally = [ // type[0] = unit's (AG), type[1] = attackable type (AGB)
  {name:'Kindler', hp:175, hpm:175, atk:35, def:2, speed:5.341, crit:0.1, type:'GG', av:1000, aggro:1, eff:[]},
  {name:'Ranger',  hp:125, hpm:125, atk:50, def:0, speed:7.721, crit:0.3, type:'GB', av:1000, aggro:1, eff:[]},
  {name:'Paladin', hp:300, hpm:300, atk:20, def:3, speed:2.962, crit:0.1, type:'GG', av:1000, aggro:3, eff:[]},
  {name:'Medic',   hp:150, hpm:150, atk:15, def:0, speed:4.804, crit:0.0, type:'GB', av:1000, aggro:1, eff:[]},
]
var enemies_class = [ // speed = 60/cooldown + movementSpeed/2
  {name:'Broodling', hp: 30, atk:  4, def:0, speed: 7.02, crit:0.0, will:0,    type:'GG', eff:[]},
  {name:'Zergling',  hp: 35, atk:  5, def:0, speed:10.29, crit:0.1, will:0,    type:'GG', eff:[]},
  {name:'Hydralisk', hp: 80, atk: 10, def:0, speed:5.855, crit:0.2, will:0,    type:'GB', eff:[]},
  {name:'Mutalisk',  hp:120, atk:  9, def:0, speed:5.335, crit:0.0, will:16,   type:'AB', eff:[]},
  {name:'Guardian',  hp: 80, atk: 20, def:2, speed: 3.25, crit:0.0, will:0,    type:'AG', eff:[]},
  {name:'Infested',  hp: 60, atk:270, def:0, speed:    3, crit:0.0, will:-300, type:'GG', eff:[]},
  // {name:'Defiler',   hp: 80, atk:  9, def:1, speed:    2, crit:0.0, will:200,  type:'GB', eff:[]},
  {name:'Lurker',    hp:125, atk: 20, def:1, speed:4.622, crit:0.5, will:125,  type:'GG', eff:[]},
  {name:'Ultralisk', hp:400, atk: 20, def:1, speed:  6.7, crit:0.1, will:0,    type:'GG', eff:[]},
]
/* unit:
     skills [
       skill {
         n:name, li [
           {on:modified unit stat, to:target type + target, val: value, adj: any if aoe else 0 or false, tick:effect or instant, initOnly:effect on apply, else overtime},
           {funcStart,funcEnd,funcInit:function handlers} // on {start,end} of turn & init; do: effect & text info
         ]
       }
     ]
*/ // targeting is based on li[0].to
let skill_list = {
  'Kindler': [ {n:'w', li:[{val:-45,  adj:-35,   to:'ge', on:'hp',    tick:0}]} ],
  'Ranger':  [ {n:'r', li:[{val:-105, adj:0,     to:'be', on:'hp',    tick:0}]} ],
  'Paladin': [ {n:'t', li:[
                           {val:5,    adj:0,     to:'gs', on:'def',   tick:1, initOnly:true},
                           {val:54,   adj:0,     to:'gs', on:'aggro', tick:1, initOnly:true}
                          ]} ],
  'Medic':   [ {n:'h', li:[{val:48,   adj:0,     to:'ba', on:'hp',    tick:0}]} ],
  // 'Defiler': [
  //              {n:'d', li:[{val:59,   adj:59,    to:'ge', on:'hp',    tick:5, initOnly:false}]}, // bleed
  //              {n:'D', li:[{val:999,  adj:999,   to:'ba', on:'def',   tick:2, initOnly:true}]},  // cloud
  //              {n:'c', li:[{val:-999, adj:0,     to:'ga', on:'hp',    tick:0}]},
  //            ],
}
var tech = {
  'Kindler': {a:'   Wangsheng Spear  ', s:{w:' Guide to Afterlife '}, u:'   Spirit Soother   '},
  'Ranger':  {a:'    Silver Arrow    ', s:{r:'     Light Arrow    '}, u:'    Twilight Bow    '},
  'Paladin': {a:'     Here I Go!     ', s:{t:'     Over Here!     '}, u:'     I Protecc!     '},
  'Medic':   {a:'   Crusader Arrow   ', s:{h:'    Medigun Beam    '}, u:'     ÜberCharge     '},
  'Broodling': {a:'    Toxic Spores    '},
  'Zergling':  {a:'        Claws       '},
  'Hydralisk': {a:'    Needle Spines   '},
  'Mutalisk':  {a:'     Glaive Wurm    '},
  'Guardian':  {a:'    Acid Spores     '},
  'Infested':  {a:'      Kamikaze      '},
  'Defiler':   {a:'        Stare       ', s:{d:'       Plague       ', D:'     Dark Swarm     ', c:'       Consume      '}},
  'Lurker':    {a:'  Unearthing Spines '},
  'Ultralisk': {a:'    Kaiser Blades   '},
}
var weight = [1, 2, 15, 8, 200] /* HP, ATK, DEF, SPEED, CRIT */
var sp  = [2, 5] /* skill point: initial, max */
var esp = [0, 5] /* enemies' skill point: initial, max */
let incSP = (asp) => {asp[0] = (asp[0] < 5) ? asp[0] + 1 : asp[0]}
let decSP = (asp) => {asp[0] = (asp[0] > 0) ? asp[0] - 1 : asp[0]}
var power     = 200 /* power spend by enemies for first wave */
var power_inc = 100 /* power increment each wave */

/* TUNES */
const cursorNote  = tune`
150: C5^150,
4650`
const confirmNote = tune`
100: E5^100,
100: G5^100,
3000`
const cancelNote  = tune`
100: F5^100,
100: D5^100,
3000`
const allyHitSFX      = tune`
100: G5~100,
100: E5~100,
3000`
const allyHitCritSFX  = tune`
100: A5-100,
100: E5-100,
100: B4-100,
2900`
const enemyHitSFX     = tune`
100: F5-100,
100: D5-100,
3000`
const enemyHitCritSFX = tune`
100: A5/100,
100: E5/100,
100: B4/100,
2900`
const enemyDieSFX     = tune`
100: C5^100,
100: D5^100,
100: F5^100,
100: G5~100,
2800`
const allyDieSFX      = tune`
100: G5~100,
100: E5~100,
100: C5~100,
100: A4~100,
2800`
const welcomeSFX   = tune`
100: D5^100,
100: F5~100,
100: E5~100,
100: A5^100,
100: G5~100,
2700`
const waveClearSFX = tune`
100: C5/100,
100: E5/100,
100: G5/100,
100: A5-100,
2800`
const theme = tune`
250: C4/250,
250: D4/250 + E4^250,
250,
250: E5^250,
250: C4/250 + A5-250,
250: E5^250,
250: B5-250,
250: E5^250,
250: C4/250 + G5-250,
250: D4/250 + E4^250,
250: A5-250,
250: E5^250,
250: C4/250 + F5-250,
250: F4^250,
250: G5-250,
250: F5^250,
250: C4/250 + E5-250,
250: D4/250 + F5^250,
250: F5-250,
250: F5^250,
250: C4/250,
250: E4^250,
250,
250: B4^250,
250: C4/250 + F5-250,
250: D4/250 + E4^250,
250: F5-250,
250: C5^250,
250: C4/250 + F5-250,
250: C5^250,
250,
250: C5^250`

/* UTILITY FUNCTIONS */
function sel2Locate(a1) {
  let row = (a1 % 5) * 2
  let col = 17 - (4 * Math.floor(a1 / 5))
  return [col, row]
}

function sel2Tile(i) {
  let row = (i % 5)
  let col = 9 - (2 * Math.floor(i / 5))
  return [col, row]
}

function isTargettable(attacker, victim) {
  return (!isBurrowed(victim) || isOnlyLurkerRemain()) && ((attacker.type[1] === 'B') || attacker.type[1] === victim.type[0])
}

let isOnlyLurkerRemain = () => { return enemies.every(u => u.name === "Lurker") }
let isBurrowed = (u) => {return 'burrow' in u && u.burrow === true}

function getAdjacentIndices(index) {
  const adj = []
  if (index % 5 !== 0) adj.push(index - 1) // up
  if ((index + 1) % 5 !== 0 && index + 1 < 20) adj.push(index + 1) // down
  if (index >= 5) adj.push(index - 5) // right
  if (index < 15) adj.push(index + 5) // left
  return adj.filter(i => i >= 0 && i < enemies.length)
}

function moveMenuCursor(direction) {
  if (direction === 's' && selection1 < MENU_Y_ULT) {
    selection1++
  } else if (direction === 'w' && selection1 > MENU_Y_ATK) {
    selection1--
  }
  playTune(cursorNote)
  for (let yy = MENU_Y_ATK; yy <= MENU_Y_ULT; yy++) {
    let d = (yy === selection1) ? ">" : " "
    addText(d, {x: CURSOR_X, y: yy, color: color`0`})
  }
}

/* GAME LOGIC */
let prices = []
for (var enemy of enemies_class) {
  let price = 0
  for (var i = 1; i <= 5; i++) {
    price += Object.values(enemy)[i] * weight[i-1]
  }
  price += enemy.will
  prices.push(price)
}

function drawEnemy() {
  console.log('draw enemy')
  for (var i = 0; i < enemies.length; i++) {
    let [xx, yy] = sel2Tile(i)
    addSprite(xx, yy, (isBurrowed(enemies[i])) ? burrow : spriteMap[enemies[i].name])
  }
}

function genEnemies(a1) {
  let power = a1
  let result = []
  while (result.length < 20) {
    let limit = -1
    for (var i = prices.length - 1; i >= 0; i--) {
      if (prices[i] <= power) {
        limit = i + 1
        break
      }
    }
    if (limit === -1) break
    let rand = Math.floor(Math.random() * limit)
    let selected = { ...enemies_class[rand] }
    selected['av'] = 1000 /* action value */
    result.push(selected)
    power -= prices[rand]
  }
  return result
}

let move = []
function step() {
  console.log(`step ${move.length}`)
  if (move.length > 0) return
  while (true) {
    for (var team of [enemies, ally]) {
      for (var i = 0; i < team.length; i++) {
        let unit = team[i]
        if (unit.hp <= 0) continue
        unit.av -= unit.speed
        if (unit.av <= 0) {
          move.push([unit, i])
          console.log(`move push ${unit.name}`)
          unit.av += 1000
        }
      }
    }
    if (move.length > 0) return
  }
}

function hAtk(team, idx, atk) {
  const victim = team[idx], toAlly = ally.includes(victim)
  const isCrit = Math.random() < actor.crit
  let dmg = Math.max(atk * (isCrit ? 2 : 1) - victim.def, 0)
  dmg = isTargettable(actor, victim) ? dmg : 0
  let [xx, yy] = toAlly ? [2, idx * 2] : sel2Locate(idx)
  let shift = toAlly ? (dmg > 99 ? 1 : 0) : (dmg > 9 ? 1 : 0)
  victim.hp -= dmg
  addText(`${dmg}`, {x: xx - shift, y: yy, color: isCrit ? color`3` : color`6`})
  if (isCrit) addText(`Critical Hit!`, {y: 13, color: color`9`})
  isAtk = false
  console.log(`hAtk ${dmg} to ${idx}`)

  if (team === ally) playTune(isCrit ? allyHitCritSFX : allyHitSFX)
  else playTune(isCrit ? enemyHitCritSFX : enemyHitSFX)

  setTimeout(() => {
    shift = toAlly ? (Math.max(victim.hp, 0) > 99 ? 1 : 0) : (Math.max(victim.hp, 0) > 9 ? 1 : 0)
    addText(`    `, {x: xx - 1, y: yy})
    addText(`${Math.max(victim.hp, 0)}`, {x: xx - shift, y: yy, color: color`D`})
    setTimeout(() => {
      addText(`   `, {x: xx - shift, y: yy, color: color`D`})
    }, DMG_CLEAR_DELAY)

    if (victim.hp <= 0) {
      console.log(`killed ${toAlly} ${idx}`)
      let [xt, yt] = toAlly ? [0, idx] : sel2Tile(idx)
      for (var sprit of getTile(xt, yt)) {
        if (sprit.type != 'B') sprit.remove()
      }
      addSprite(xt, yt, toAlly ? coffin : dead)
      playTune(enemyDieSFX)
      setTimeout(() => {
        for (var ghost of getAll(dead)) ghost.remove()
      }, DMG_CLEAR_DELAY)
    }
    run = true
  }, DMG_DISPLAY_DELAY)
}

function hSkill(team, idx, isAdj) {
  if (idx < 0 || idx >= team.length) return
  if (isAoe && !isAdj) {
    const adjIndices = getAdjacentIndices(idx)
    adjIndices.forEach(adjIdx => {
      hSkill(team, adjIdx, true)
    })
  }
  const victim = team[idx], toAlly = team === ally
  isSelf = isFriendly && idx === actorIdx
  for (let si = 0; si < skill.li.length; si++) {
    const sk = skill.li[si]
    const [xx, yy] = toAlly ? [isSelf ? 4 : 2, idx * 2] : sel2Locate(idx)
    const val = isAdj ? sk.adj : sk.val
    const isAtk = sk.on === 'hp' && val <= 0
    const isHeal = sk.on === 'hp' && val > 0
    const isBuff = sk.on !== 'hp' && val >= 0
    const isCrit = isAtk && Math.random() < actor.crit
    let d = val
    if (isAtk) d = Math.min(val * (isCrit ? 2 : 1) + victim.def, 0)
    if (!isTargettable(actor, victim) || (isHeal && victim.hp <= 0)) d = 0
    if (isHeal && victim.hp + d > Math.floor(victim.hpm * 1.5)) d = Math.floor(victim.hpm * 1.5) - victim.hp
    let after = Math.max(victim[sk.on] + d, 0) // no stat can be negative
    const change = Math.abs(victim[sk.on] - after)
    const col = isCrit ? color`3` : (isHeal || isBuff) ? color`4` : color`6`
    isSkill = false
    const shift = toAlly ? (Math.abs(d) > 99 ? 1 : 0) : (Math.abs(d) > 9 ? 1 : 0)
  
    setTimeout(() => { clearText() }, 650)
    setTimeout(() => {
      const shift = toAlly ? (after > 99 ? 1 : 0) : (after > 9 ? 1 : 0)
      if (si === 0) { // only show first effect's result
        addText(`    `,     {x: xx - shift, y: yy, color: color`D`})
        addText(`${after}`, {x: xx - shift, y: yy, color: color`D`})
        setTimeout(() => { addText(`    `, {x: xx - shift, y: yy, color: color`D`}) }, DMG_CLEAR_DELAY)
      }
  
      if (victim.hp <= 0) { // kill handler
        console.log(`killed ${idx}`)
        let [xt, yt] = toAlly ? [idx, 0] : sel2Tile(idx)
        getTile(xt, yt).forEach(sprit => { if (sprit.type != floor) sprit.remove() })
        addSprite(xt, yt, dead)
        playTune((toAlly) ? allyDieSFX : enemyDieSFX)
        setTimeout(() => { getAll(dead).forEach(ghost => {ghost.remove()}) }, DMG_CLEAR_DELAY)
      }
      run = true
    }, DMG_DISPLAY_DELAY + (si * 50))
  
    if (sk.tick > 0) { // effect type skill
      console.log(`hSkill effect ${skill.n} to ${toAlly} ${idx} -> len(${victim.eff.length})`)
      victim.eff.push({dur:sk.tick, val:sk.val, to:sk.to, on:sk.on, initOnly:sk.initOnly, applied:false})
      if (si === 0) addText(`${Math.abs(d)}`, {x: xx - shift, y: yy, color: col})
      after = actor[sk.on] + sk.val
      continue
    } // instant type skill
    victim[sk.on] += d
    if (toAlly) playTune(isCrit ? allyHitCritSFX : allyHitSFX)
    else playTune(isCrit ? enemyHitCritSFX : enemyHitSFX)
    if (si === 0) {
      addText(`${Math.abs(d)}`, {x: xx - shift, y: yy, color: col})
      if (isCrit) addText(`Critical Hit!`, {y: 13, color: color`9`})
    }
    console.log(`hSkill ${d} (${change}) to ${toAlly} ${idx}`)
  }
}

function flushEnemy() {
  console.log(`flushEnemy`)
  var idx = 0
  while (idx < enemies.length) {
    if (enemies[idx].hp <= 0) {
      console.log(`enemies splice ${idx}`)
      enemies.splice(idx, 1)
      idx--
    }
    idx++
  }

  for (var i = 0; i < 20; i++) {
    let [xt, yt] = sel2Tile(i)
    for (var sprit of getTile(xt, yt)) {
      if (sprit.type != 'B') sprit.remove()
    }
  }

  drawEnemy()

  for (var idx = 0; idx < ally.length; idx++) {
    if (!deadAlly[idx] && ally[idx].hp <= 0) {
      console.log(`ally died ${idx}`)
      deadAlly[idx] = true
    }
  }

  if (deadAlly.every(Boolean)) {
    clearText()
    addText(`Game Over!`, {y: 12, color: color`3`})
    addText(`Wave: ${wave}`, {y: 14, color: color`H`})
    run = false
    isPlayerMove = false
    return
  }

  if (enemies.length === 0) {
    clearText()
    power += power_inc
    wave++
    playTune(waveClearSFX)
    enemies = genEnemies(power)
    drawEnemy()
    actor = null, actorIdx = null
    addText(`Wave ${wave}`, {y: 13, color: color`H`})
    run = false, isPlayerMove = false
    for (var team of [ally, enemies]) for (var unit of team) unit.av = 1000
    move = []
    setTimeout(() => {
      run = true, isPlayerMove = true
      clearText()
      fun()
    }, 1800)
    return
  }
}

/* UI AND INPUT HANDLING */
let depth = 1
let selection1 = MENU_Y_ATK
let selection2 = 0
let isAoe = false
let isAtk = false
let isSkill = false
let isFriendly = false
let isSelf = false
let skill = null
let ski = null
let selectionA = 0
let deadAlly = [false, false, false, false]

function drawMenu() {
  console.log(`drawMenu`)
  clearText()
  addText(`${actor.name} move${(ally.includes(actor) ? '!' : '.')}`, {y: 11, color: color`0`})
  addText(`Attack           `, {x: MENU_X, y: MENU_Y_ATK, color: color`0`})
  addText(`Skill            `, {x: MENU_X, y: MENU_Y_SKILL, color: color`0`})
  addText(`Ult              `, {x: MENU_X, y: MENU_Y_ULT, color: color`0`})
  addText(`>`, {x: CURSOR_X, y: selection1, color: color`0`})
  showSP()
  addText(`Wave ${wave}`, {x: 0, y: 15, color: color`0`})
}

function drawTarget() {
  console.log(`drawTarget`)
  let [xx, yy] = sel2Locate(selection2)
  const isDmgAble = isTargettable(actor, enemies[selection2])
  addText(`>`, {x: xx, y: yy, color: isDmgAble ? color`3` : color`L`})
  if (isAoe) {
    console.log(`isAoe`)
    const adjIndices = getAdjacentIndices(selection2)
    adjIndices.forEach(adjIdx => {
      let [adjX, adjY] = sel2Locate(adjIdx)
      addText(`>`, {x: adjX, y: adjY, color: isTargettable(actor, enemies[adjIdx]) ? color`9` : color`L`})
    })
  }
}

function drawAlly() {
  console.log(`drawAlly`)
  if (isSelf) selectionA = actorIdx
  const col = (ally[selectionA].hp > 0) ? color`4` : color`L`
  addText(`<`, {x: (actorIdx === selectionA) ? 4 : 2, y: selectionA*2, color: col})
}
function clearAlly() {
  for (var yy = 0; yy < 10; yy+=2) {
    addText(` `, {x: 2, y: yy, color: color`4`})
    addText(` `, {x: 4, y: yy, color: color`4`})
  }
}
function clearMenu() {
  console.log(`clearMenu`)
  for (var yy = MENU_Y_ATK; yy <= MENU_Y_ULT; yy++) {
    addText(`                `, {x: MENU_X, y: yy})
  }
}
function clearCursor() {
  console.log(`clearCursor`)
  for (var yy = MENU_Y_ATK; yy <= MENU_Y_ULT; yy++) {
    addText(` `, {x: CURSOR_X, y: yy})
  }
}
function clearTarget() {
  console.log(`clearTarget`)
  for (var yy = 0; yy < 10; yy++) {
    addText(` `, {x: 17, y: yy})
    addText(` `, {x: 13, y: yy})
    addText(` `, {x: 9,  y: yy})
    addText(` `, {x: 5,  y: yy})
  }
}

let showSP = () => {addText(`${sp[0]}/${sp[1]}`, {x: SP_TEXT_X, y: SP_TEXT_Y, color: color`0`})}

function depth1() {
  clearMenu()
  clearCursor()
  isFriendly = false
  if (selection1 == MENU_Y_ATK) {
    console.log(`depth1 attack`)
    isAtk = true
    drawTarget()
    previewDmg()
    return true
  } else if (selection1 == MENU_Y_SKILL) {
    console.log(`depth1 skill`)
    if (sp[0] < 1) {
      console.log(`not enough sp`)
      addText(`You need more`, {y: 12, color: color`3`})
      addText(`skill point`, {y: 13, color: color`3`})
      isPlayerMove = false
      return false
    }
    let len = skill_list[actor.name].length
    let idx = (skill_list[actor.name].length <= 1) ? 0 : (() => { return Math.floor(Math.random() * len) })
    skill = skill_list[actor.name][idx]
    ski = skill.li[0]
    isSkill = true
    isAoe = ski.adj != 0
    let to = ski.to.slice(1, 2)
    if (to === "e") {
      isSelf = false
      drawTarget()
      previewSkill()
    } else if (to === "a" || to === "s") {
      isFriendly = true
      isSelf = to === "s"
      drawAlly()
      previewSkill()
    }
    return true
  } else { // ULT
    addText(`unavailable.`, {y: 13, color: color`0`})
    return false
  }
}

function previewDmg() {
  console.log(`previewDmg`)
  let t = enemies[selection2], d = (isTargettable(actor, t)) ? actor.atk - t.def : 0, h = t.hp - d
  h = (h > 0) ? h : 0
  addText(`${tech[actor.name].a}`, {y: 11, color: color`0`})
  addText(`${t.name} (${t.type[0]})                 `, {x: 2, y: 13, color: color`0`})
  addText(`${t.hp}->${h} (${Math.max(0, d)})           `, {x: 2, y: 14, color: color`0`})
}
function previewSkill() {
  let t = (isFriendly) 
    ? ally[isSelf ? actorIdx : selectionA]
    : enemies[selection2]
  const isHeal = ski.on === 'hp' && ski.val > 0
  let be = t[ski.on], after = Math.max(0, isTargettable(actor, t) ? be + ski.val : be) // must be targettable
  if (isHeal) {
    after = Math.min(after, Math.floor(t.hpm * 1.5)) // overheal limit
    if (t.hp <= 0) after = 0 // can't heal dead ally
  } else {
    after = ski.on === 'hp' 
      ? Math.max(0, be + Math.min(ski.val + t.def, 0))
      : be + ski.val // defense negation
  }
  const change = Math.abs(be - after)
  addText(`${tech[actor.name].s[skill.n]}`, {y: 11, color: color`0`})
  if (ski.tick > 0) {
    console.log(`previewSkill effect`)
    const prefix = (ski.on === 'hp') ? "" : `${ski.on} `
    addText(`${prefix}${be}->${after}`, {y: 13, color: color`0`})
    if (skill.n === 't') addText(`+Aggro enemies`, {y: 14, color: color`0`})
    return
  }
  console.log(`previewSkill instant`)
  let adjText = (ski.adj != 0) ? `+${Math.abs(ski.adj)}` : ''
  let toStat = (ski.on === 'hp') ? '' : `: ${ski.on}`
  addText(`${t.name} (${t.type[0]})${toStat}               `, {x: 2, y: 13, color: color`0`})
  addText(`${be}->${after} (${isHeal ? change : Math.abs(ski.val)}${adjText})       `, {x: 2, y: 14, color: color`0`})
}
function pickAlly() {
  let total = 0
  ally.forEach(u => {if (u.hp > 0) total += u.aggro})
  var rand = Math.random() * total
  console.log(`pickAlly ${rand}/${total}`)
  for (var i = 0; i < ally.length; i++) {
    if (ally[i].hp <= 0) continue
    rand -= ally[i].aggro
    if (rand <= 0) return i
  }
}

addText("WASD for cursor", {x: 3, y: 3, color: color`6` })
onInput("s", () => {
  if (isPlayerMove) {
    if (depth === 1) {
      console.log('s depth 1')
      moveMenuCursor('s')
    }
    if (depth === 2) {
      if (!isFriendly && selection2 < enemies.length - 1) {
        selection2++
        console.log(`s depth 2 notFriendly ${selection2}`)
        playTune(cursorNote)
        clearTarget()
        drawTarget()
      } else if (isFriendly && !isSelf && selectionA < ally.length - 1) {
        selectionA++
        console.log(`s depth 2 isFriendly ${selectionA}`)
        playTune(cursorNote)
        clearAlly()
        drawAlly()
      }
      (isSkill) ? previewSkill() : previewDmg()
    }
  }
})

onInput("w", () => {
  if (isPlayerMove) {
    if (depth === 1) {
      console.log('w depth 1')
      moveMenuCursor('w')
    }
    if (depth === 2) {
      if (!isFriendly && selection2 > 0) {
        console.log('w depth 2')
        selection2--
        playTune(cursorNote)
        clearTarget()
        drawTarget()
      } else if (isFriendly && !isSelf && selectionA > 0) {
        console.log('w depth 2')
        selectionA--
        playTune(cursorNote)
        clearAlly()
        drawAlly()
      }
      (isSkill) ? previewSkill() : previewDmg()
    }
  }
})

onInput("a", () => {
  if (isPlayerMove && depth === 2 && !isFriendly && selection2 + 5 < enemies.length) {
    console.log('a depth 2')
    selection2 += 5
    playTune(cursorNote)
    clearTarget()
    drawTarget()
    isSkill ? previewSkill() : previewDmg()
  }
})

onInput("d", () => {
  if (isPlayerMove && depth === 2 && !isFriendly && selection2 - 5 >= 0) {
    console.log('d depth 2')
    selection2 -= 5
    playTune(cursorNote)
    clearTarget()
    drawTarget()
    isSkill ? previewSkill() : previewDmg()
  }
})

// addText("I for info", {x: 6, y: 6, color: color`6` })
// onInput("i", () => {})

addText("J to select", {x: 6, y: 4, color: color`6` })
onInput("j", () => {
  if (!gamestarted) clearText()
  if (gamestarted && isPlayerMove) {
    playTune(confirmNote)
    if (depth === 1) {
      console.log('j depth 1')
      if (depth1()) depth++
      else setTimeout(() => {
        drawMenu()
        isPlayerMove = true
      }, DMG_CLEAR_DELAY)
      return
    }
    if (depth === 2 && isAtk) {
      console.log('j depth 2 atk')
      clearMenu()
      clearCursor()
      isPlayerMove = false
      hAtk(enemies, selection2, actor.atk)
      incSP(sp)
      showSP()
      setTimeout(() => {
        selection2 = 0
        isPlayerMove = true
        actorEndTurn()
        let yt = aName2Tile[actor.name]
        getTile(1, yt).forEach(sprit => {if (sprit.type != 'B') sprit.remove()})
        addSprite(0, yt, spriteMap[actor.name])
        flushEnemy()
        setTimeout(() => {fun()}, 100)
      }, TURN_DELAY)
      return
    }
    if (depth === 2 && isSkill) {
      console.log('j depth 2 skill')
      clearMenu()
      clearCursor()
      isPlayerMove = false
      let tTeam = ((ally.includes(actor) ^ isFriendly) == 1) ? enemies : ally
      let tIdx = ((ally.includes(actor) ^ isFriendly) == 1) ? selection2 : selectionA
      tIdx = isSelf ? actorIdx : tIdx
      hSkill(tTeam, tIdx, false)
      decSP(sp)
      showSP()
      setTimeout(() => {
        selection2 = 0
        addText(`...`, {y: 13, color: color``})
        isPlayerMove = true
        actorEndTurn()
        run = true
        ski = null
        let yt = aName2Tile[actor.name]
        for (var sprit of getTile(1, yt)) if (sprit.type != 'B') sprit.remove()
        addSprite(0, yt, spriteMap[actor.name])
        flushEnemy()
        setTimeout(() => {fun()}, 100)
      }, TURN_DELAY)
    }
  }
})

addText("K to back", {x: 6, y: 5, color: color`6` })
onInput("k", () => {
  if (isPlayerMove && depth === 2) {
    console.log('k depth 2')
    depth--
    playTune(cancelNote)
    clearTarget()
    clearMenu()
    clearAlly()
    drawMenu()
    isAtk = false, isSkill = false, isAoe = false, isFriendly = false, isSelf = false
  }
})

addText('Press any key', {y: 12, color: color`0`})
addText('to start!', {y: 13, color: color`0`})
playTune(welcomeSFX)
setTimeout(() => {playTune(theme, Infinity)}, 800)

let gamestarted = false
let wave = 1
let enemies = genEnemies(power)
drawEnemy()
let isPlayerMove = true
let run = false
let actor = null, actorIdx = null
let aName2Tile = {Kindler:0, Ranger:1, Paladin:2, Medic:3}

function actorEndTurn() { // effect application start
  console.log(`endTurn ${actor.eff.length}`)
  if (actor.eff.length === 0) return
  actor.eff.forEach(eff => {
    if (eff.initOnly && eff.applied) return
    console.log(`${actor.name} applied (${eff.on}) += ${eff.val}`)
    actor[eff.on] += eff.val
    eff.applied = true
  })
}

function actorStartTurn() { // effect duration tick down / expiry
  console.log(`startTurn ${actor.eff.length}`)
  if (actor.eff.length !== 0) {
    actor.eff = actor.eff.filter(eff => {
      eff.dur -= 1
      console.log(`${actor.name} (${eff.on}) tick down`)
      if (eff.initOnly && eff.dur <= 0) {
        console.log(`${actor.name} ${eff.on} expire`)
        actor[eff.on] -= eff.val
        return false // remove effect
      }
      return true // keep effect
    })
  }
}

function fun() {
  if (!(run && isPlayerMove)) return
  console.log('run')
  run = false
  isPlayerMove = false
  isAoe = false
  isSkill = false
  step()
  console.log('move pop')
  let [unit, i] = move.pop()
  console.log(unit.name)
  actor = unit
  actorIdx = i
  actorStartTurn()
  clearText()

  if (ally.includes(actor)) {
    console.log('ally unit')
    drawMenu()
    let yt = aName2Tile[unit.name]
    for (var sprit of getTile(0, yt)) if (sprit.type != 'B') sprit.remove()
    addSprite(1, yt, spriteMap[unit.name])
    isPlayerMove = true
    depth = 1
    looper = false
    return
  } else {
    addText(`${unit.name} move.`, {y: 11, color: color`3`})
    let [xt, yt] = sel2Tile(i)
    clearMenu()
    isPlayerMove = false
    run = true
    setTimeout(() => {
      isPlayerMove = true
      actorEndTurn()
      for (var sprit of getTile(xt - 1, yt)) if (sprit.type != 'B') sprit.remove()
      if (actor.hp > 0) addSprite(xt, yt, spriteMap[actor.name])
      flushEnemy()
      setTimeout(() => {fun()}, 100)
    }, 2100)
    console.log(`bedacui ${actor.name}`) // delete
    if (actor.name === "Lurker" && !('burrow' in actor)) {
      actor.burrow = true
      getTile(xt, yt).map((sprit) => { if (sprit.type === Lurker) sprit.remove() })
      addSprite(xt, yt, burrow)
      return
    } else {
      for (var sprit of getTile(xt, yt)) if (sprit.type != 'B') sprit.remove()
      addSprite(xt - 1, yt, isBurrowed(actor) ? burrow : spriteMap[unit.name])
    }
    let idx = pickAlly()
    if (Object.keys(skill_list).includes(actor.name) && Math.random() < esp[0]/esp[1]) {
      console.log(`enemy skill`)
      decSP(esp)
    } else {
      console.log(`enemy atk ally ${idx}`)
      if (actor.name === 'Infested') {
        actor.hp = 0
        let [xt, yt] = sel2Tile(i)
        for (var sprit of getTile(xt - 1, yt)) if (sprit.type != 'B') sprit.remove()
        addSprite(xt - 1, yt, explosion)
      }
      hAtk(ally, idx, actor.atk)
      if (actor.name === 'Mutalisk') {
        let idx1 = idx, idx2 = idx
        let cnt = 0; for (var u of ally) if (u.hp > 0) cnt++
        while (cnt >= 2 && idx1 === idx) idx1 = pickAlly()
        while (cnt >= 3 && idx2 === idx1 || idx2 === idx) idx2 = pickAlly()
        if (idx1 !== idx) setTimeout(() => {hAtk(ally, idx1, 3)}, 50)
        if (idx2 !== idx) setTimeout(() => {hAtk(ally, idx2, 1)}, 100)
      }
      incSP(esp)
    }
  }
}

afterInput(() => {
  if (!gamestarted) {
    console.log('game started')
    gamestarted = true
    run = true
  }
  fun()
})
