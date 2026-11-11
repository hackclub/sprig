/*
@title: Wall st.
@author: Timofey
@description: Trade stocks,  "Money make money"
@tags: ['chad', 'stocks']
@addedOn: 2026-11-11
*/


const up = "g"
const down = "r"
const bg = "x"


let cash = 100000
let price = 5000
let shares = 0
let shorts = 0
let started = false
let trend = 1
let trendTime = 8
let status = "READY"
let candles = []


setLegend(
  [up, bitmap`
................
................
......4444......
......4444......
......4444......
......4444......
......4444......
......4444......
......4444......
......4444......
......4444......
......4444......
......4444......
................
................
................`],
  [down, bitmap`
................
................
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
................
................
................`],
  [bg, bitmap`
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


setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`)


setBackground(bg)


function money(n) {
  return Math.round(n).toString()
}


function netWorth() {
  return cash + shares * price - shorts * price
}


function makeCandles() {
  candles = []
  price = 5000


  for (let i = 0; i < 8; i++) {
    let open = price
    let change = (Math.random() - 0.5) * 0.02


    price = Math.max(50, price * (1 + change))
    candles.push({ open: open, close: price })
  }
}


function priceY(n, min, max) {
  if (max === min) return 3


  return 4 - Math.round((n - min) / (max - min) * 2)
}


function drawChart() {
  getAll(up).forEach(s => s.remove())
  getAll(down).forEach(s => s.remove())


  let min = Infinity
  let max = -Infinity


  for (let c of candles) {
    min = Math.min(min, c.open, c.close)
    max = Math.max(max, c.open, c.close)
  }


  for (let i = 0; i < candles.length; i++) {
    let c = candles[i]
    let a = priceY(c.open, min, max)
    let b = priceY(c.close, min, max)
    let top = Math.min(a, b)
    let bottom = Math.max(a, b)
    let colour = c.close >= c.open ? up : down


    for (let y = top; y <= bottom; y++) {
      addSprite(i + 1, y, colour)
    }
  }
}


function draw() {
  clearText()


  if (!started) {
    getAll(up).forEach(s => s.remove())
    getAll(down).forEach(s => s.remove())


    addText("STOCK SIM", { x: 5, y: 2, color: color0 })
    addText("SP500 MARKET", { x: 4, y: 4, color: color0 })
    addText("START CASH 100000", { x: 2, y: 6, color: color0 })
    addText("CONTROLS", { x: 6, y: 8, color: color0 })
    addText("W START / BUY", { x: 3, y: 9, color: color0 })
    addText("S SELL", { x: 3, y: 10, color: color0 })
    addText("A SHORT", { x: 3, y: 11, color: color0 })
    addText("D COVER", { x: 3, y: 12, color: color0 })
    addText("SHORT = BET ON DROP", { x: 1, y: 13, color: color0 })
    addText("PRESS W TO PLAY", { x: 3, y: 15, color: color0 })


    return
  }


  drawChart()


  addText("SP500 " + money(price), { x: 1, y: 0, color: color0 })
  addText("CASH " + money(cash), { x: 1, y: 10, color: color0 })
  addText("NET " + money(netWorth()), { x: 1, y: 11, color: color0 })
  addText("L" + shares + " S" + shorts + " PNL " + money(netWorth() - 100000), { x: 1, y: 12, color: color0 })
  addText(status, { x: 1, y: 13, color: color0 })
  addText("W BUY  S SELL", { x: 1, y: 14, color: color0 })
  addText("A SHORT  D COVER", { x: 1, y: 15, color: color0 })
}


function buy() {
  if (!started) return


  if (cash >= price) {
    cash -= price
    shares++
    status = "BOUGHT"
  } else {
    status = "NO CASH"
  }


  draw()
}


function sell() {
  if (!started) return


  if (shares > 0) {
    cash += price
    shares--
    status = "SOLD"
  } else {
    status = "NO SHARES"
  }


  draw()
}


function short() {
  if (!started) return


  if (netWorth() > 0 && (shorts + 1) * price <= netWorth()) {
    cash += price
    shorts++
    status = "SHORT OPEN"
  } else {
    status = "SHORT LIMIT"
  }


  draw()
}


function cover() {
  if (!started) return


  if (shorts > 0 && cash >= price) {
    cash -= price
    shorts--
    status = "SHORT CLOSED"
  } else if (shorts > 0) {
    status = "NEED CASH"
  } else {
    status = "NO SHORT"
  }


  draw()
}


function nextTick() {
  if (!started) return


  if (trendTime <= 0) {
    trend = Math.random() < 0.5 ? 1 : -1
    trendTime = 4 + Math.floor(Math.random() * 12)
  }


  trendTime--


  let change = (Math.random() - 0.5) * 0.018
  change += trend * Math.random() * 0.006


  if (Math.random() < 0.08) {
    change += (Math.random() - 0.5) * 0.08
  }


  if (Math.random() < 0.06) {
    trend *= -1
    trendTime = 3 + Math.floor(Math.random() * 6)
  }


  let oldPrice = price
  price = Math.max(50, price * (1 + change))


  candles.push({ open: oldPrice, close: price })


  if (candles.length > 8) {
    candles.shift()
  }


  status = price >= oldPrice ? "MARKET UP" : "MARKET DOWN"


  draw()
}


onInput("w", () => {
  if (!started) {
    started = true
    makeCandles()
    status = "MARKET OPEN"
    draw()
  } else {
    buy()
  }
})


onInput("s", sell)
onInput("a", short)
onInput("d", cover)


setInterval(nextTick, 1200)


draw()
