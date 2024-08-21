/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

Description:
A game about making and selling lemonade! Your current goal is 100 Money, once you reach this goal hit "A".
You start off with 2 money; buy lemons to squeeze with "I"; squeeze the lemons with "J"; Put the juice into a cup with "L"; Sell the cups with J.
"W", "S", and "D" are used for purchasing upgrades.


@title: Easy Peasy
@author: ChasedDraco
@tags: ["lemons","clicker"]
@addedOn: 2024-08-20
*/

const music = tune`
160.42780748663102: C4^160.42780748663102,
160.42780748663102: C5~160.42780748663102 + A4~160.42780748663102 + A5-160.42780748663102 + F5-160.42780748663102,
160.42780748663102: B4~160.42780748663102 + D4^160.42780748663102 + G5-160.42780748663102 + E5-160.42780748663102,
160.42780748663102: C5~160.42780748663102 + A4~160.42780748663102 + F5-160.42780748663102,
160.42780748663102: B4~160.42780748663102 + C4^160.42780748663102 + G5-160.42780748663102 + E5-160.42780748663102,
160.42780748663102: C5~160.42780748663102 + A4~160.42780748663102 + A5-160.42780748663102 + F5-160.42780748663102,
160.42780748663102: B4~160.42780748663102 + D4^160.42780748663102 + G5-160.42780748663102 + E5-160.42780748663102,
160.42780748663102: A4~160.42780748663102 + F5-160.42780748663102 + D5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: C5~160.42780748663102 + A5-160.42780748663102 + F5-160.42780748663102,
160.42780748663102: C4^160.42780748663102 + G5-160.42780748663102 + E5-160.42780748663102,
160.42780748663102: C5~160.42780748663102 + F5-160.42780748663102 + A5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: E5-160.42780748663102 + G5-160.42780748663102 + B4~160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: E4^160.42780748663102 + G4^160.42780748663102 + F5-160.42780748663102 + A5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: E5-160.42780748663102 + G5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: F5-160.42780748663102 + D5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: F5-160.42780748663102 + D5-160.42780748663102,
160.42780748663102: C4^160.42780748663102 + E5-160.42780748663102,
160.42780748663102: F5-160.42780748663102,
160.42780748663102: C4^160.42780748663102 + E5-160.42780748663102,
160.42780748663102: F5-160.42780748663102 + D5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: F5-160.42780748663102 + D5-160.42780748663102,
160.42780748663102: C4^160.42780748663102 + E5-160.42780748663102,
160.42780748663102: F5-160.42780748663102 + D5-160.42780748663102,
160.42780748663102: C4^160.42780748663102,
160.42780748663102: F5-160.42780748663102`
const playback = playTune(music, Infinity)

const lemon = "l"
const squeeze = "s"
const juica = "q"
const dolla = "d"
const glass = "g"
const glassFull = "1"
const dollaUp = "u"
const juicer = "j"
const lemonTree = "t"
setLegend(
  [lemon, bitmap`
................
................
................
................
......6666......
....66666666....
...6666666666...
..F6666666666F..
..F6666666666F..
...6666666666...
....66666666....
......6666......
................
................
................
................`],
  [juica, bitmap`
................
................
................
................
.......6........
......6F6.......
......6F6.......
......6F6.......
.......6........
................
.....0...0......
.....0...0......
.....06660......
......060.......
......060.......
......000.......`],
  [dolla, bitmap`
................
................
................
.......4........
......DDD.......
.....D.4.D......
.....D.4........
.....D.4........
......D4........
.......D........
.......4D.......
.......4.D......
.......4.D......
.....D.4.D......
......DDD.......
.......4........`],
  [squeeze, bitmap`
................
................
................
................
................
....66....66....
...6666666666...
..F6666666666F..
..F6666666666F..
...6666666666...
....66....66....
................
................
................
................
................`],
  [glassFull, bitmap`
0..............0
0..............0
0666666666666660
0666666666666660
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
..066666666660..
..066666666660..
..066666666660..
...0666666660...
...0666666660...
...0666666660...
....06666660....
....00000000....`],
  [glass, bitmap`
................
................
................
................
................
................
.....0....0.....
.....066660.....
.....066660.....
......0660......
......0660......
......0000......
................
................
................
................`],
  [dollaUp, bitmap`
.......4........
......444.......
.....44444......
......444.......
......DDD.......
.....D444D......
.....D444.......
.....D444.......
......D44.......
......4D4.......
......44D.......
......444D......
......444D......
.....D444D......
......DDD.......
......444.......`],
  [juicer, bitmap`
................
................
................
................
.......F........
....11F6F11.....
....11F6F11.....
......F6F.......
......6F6.......
.......66.......
.....0.6.0......
.....0.6.0......
.....06660......
......060.......
......060.......
......000.......`],
  [lemonTree, bitmap`
................
................
................
...4444446444...
...4444644444...
...4444444464...
...4644644444...
...4444444444...
....6.CCCC..6...
......CCCC......
......CCCC......
......CCCC......
......CCCC......
......CCCC......
......CCCC......
................`]
)

setSolids([])
let potency = 1 // How many glasses you get out of 5 juice
let power = 1 // How much juice per squeeze
let market = 2 // Money per cup sold
let lemons = 0 // 
let juice = 0
let money = 2 //
let cups = 0
let autoJuicer = 2
let level = 0
let lemonTrees = 2 // lemonTrees - 2 = Lemons per second
let clickable = true
let juicable = true
let pickable = true
const levels = [
  map`
q......
g....l.
d......
j......
u......
t......`,
   map`
ldldldl
dldldld
ldldldl
dldldld
ldldldl
dldldld`
]

setMap(levels[level])

setPushables({
  [lemon]: []
})

function cupSell() {
  money += market
  cups -= 1
  updateScore()
  clickable = true
}

function juicing() {
  juice += power
  lemons -= 1
  updateScore()
  getFirst(squeeze).type = lemon
  clickable = true
}

function autoJuicing() {
  if(level === 0 && -1<lemons-autoJuicer-2){
  juice += autoJuicer-2
  lemons -= autoJuicer-2
  updateScore()
  juicable = true
  }
  else if(0>lemons-autoJuicer-2){
  juice += lemons
  lemons -= lemons
  updateScore()
  juicable = true
  }
}
function juicingLoop() {
  if(autoJuicer > 2){
        if(juicable===true){
      if(lemons>0){
        juicable = false;
  autoJuicing()
      }
      }
      } 
    setTimeout(juicingLoop, 1000);
  }

juicingLoop(); // Start juicing!! 

function treePicking() {
  if(level === 0){
  lemons += lemonTrees-2
  updateScore()
  pickable = true
  }
}

function pickingLoop() {
  if(lemonTrees > 2){
      if(pickable===true){
        pickable=false
        treePicking()
      }
    }
  setTimeout(pickingLoop, 3000);
}

pickingLoop(); // Start picking lemons!!!

function updateScore() {
  clearText()
  addText("Juice:" + juice, {
    x: 3,
    y: 2,
    color: color`6`
  })
  addText("Money:" + money, {
    x: 3,
    y: 6,
    color: color`4`
  })
  addText("Cup(s):" + cups, {
    x: 3,
    y: 4,
    color: color`0`
  })
  addText("" + lemons, {
    x: 14,
    y: 5,
    color: color`F`
  })
  // Sale up cost
  addText("(w)CupValueUp:" + market * market, {
    x: 3,
    y: 12,
    color: color`0`
  })
  addText("(d)AutoJuicer:" + autoJuicer * autoJuicer, {
    x: 3,
    y: 9,
    color: color`0`
  })
  addText("(s)LemonTree:" + lemonTrees * lemonTrees * lemonTrees, {
    x: 3,
    y: 15,
    color: color`0`
  })
}
addText("Juice:" + juice, {
  x: 3,
  y: 2,
  color: color`6`
})
addText("Money:" + money, {
  x: 3,
  y: 6,
  color: color`4`
})
addText("Cup(s):" + cups, {
  x: 3,
  y: 4,
  color: color`0`
})
addText("" + lemons, {
  x: 14,
  y: 5,
  color: color`F`
})
addText("J to juice", {
  x: 4,
  y: 9,
  color: color`F`
})
addText("K to sell cups", {
  x: 4,
  y: 13,
  color: color`D`
})
addText("l to fill cups", {
  x: 4,
  y: 11,
  color: color`0`
})
addText("i to buy lemons", {
  x: 4,
  y: 15,
  color: color`0`
})
// Juicing
onInput("j", () => {
  if (clickable == true) {
    if (lemons > 0) {
      clickable = false
      getFirst(lemon).type = squeeze
      setTimeout(juicing, 80)
    }
  }
})
// Selling cups
onInput("k", () => {
  if (clickable == true) {
    if (cups > 0) {
      clickable = false
      setTimeout(cupSell, 500)
    }
  }
})
// Filling cups
onInput("l", () => {
  if (juice > 4) {
    cups += potency
    juice = juice - 5
    updateScore()
  }
})
// Buying lemons
onInput("i", () => {

  if (money > 0) {
    money -= 1
    lemons += 5
    updateScore()
  }
})
// SaleUpCost buy button
onInput("w", () => {
  if (money > (market * market) - 1) {
    money -= market * market
    market += 1
    updateScore()
  }
})
// AutoJuicer: Juices one lemon each second
onInput("d", () => {
      if (money > (autoJuicer * autoJuicer) - 1) {
        money -= autoJuicer * autoJuicer
        autoJuicer += 1
        updateScore()
      }
    })
// Gives a lemon per second per tree
onInput("s", () => {
 // console.log("s button")
      if (money > (lemonTrees * lemonTrees * lemonTrees) - 1) {
        money -= lemonTrees * lemonTrees * lemonTrees
        lemonTrees += 1
        updateScore()
      }
})
// Win conditions (isn't working rn wth)
onInput("a", () => {
 // console.log("a button")
      if (money > 99 && level===0 ) {
      //  console.log("money win condition")
        clearText()
        level = 1
        setMap(levels[level])
        addText("You Win!!!", {
    x: 5,
    y: 7,
    color: color`L`
  })
        addText("If you want to play", {
    x: 1,
    y:11,
    color: color`0`
  })
        addText("Just press A again!", {
    x: 1,
    y:13,
    color: color`0`
      })

}
    else if (level === 1){
     // console.log("return from win screen")
      level = 0
      clearText()
      setMap(levels[level])
      updateScore()
    }
      })
    afterInput(() => {

      })
