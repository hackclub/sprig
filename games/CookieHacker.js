/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/
const melody = tune`
188.67924528301887,
188.67924528301887: F4-188.67924528301887,
188.67924528301887: F4-188.67924528301887,
188.67924528301887: F4-188.67924528301887 + E4^188.67924528301887,
188.67924528301887: F4-188.67924528301887 + E4^188.67924528301887,
188.67924528301887: F4-188.67924528301887 + E4^188.67924528301887,
188.67924528301887: G4-188.67924528301887,
188.67924528301887: A4-188.67924528301887,
188.67924528301887: B4-188.67924528301887,
188.67924528301887,
188.67924528301887: C5-188.67924528301887,
188.67924528301887: D5-188.67924528301887,
188.67924528301887: C5-188.67924528301887,
188.67924528301887: B4-188.67924528301887,
188.67924528301887: B4^188.67924528301887,
188.67924528301887: B4^188.67924528301887,
188.67924528301887: C5^188.67924528301887,
188.67924528301887: D5^188.67924528301887,
188.67924528301887: E5/188.67924528301887,
188.67924528301887: F5/188.67924528301887,
188.67924528301887: D5/188.67924528301887,
188.67924528301887: D5/188.67924528301887,
188.67924528301887: C5^188.67924528301887,
188.67924528301887: A4^188.67924528301887,
188.67924528301887: G4^188.67924528301887,
188.67924528301887: G4^188.67924528301887,
188.67924528301887: G4^188.67924528301887,
188.67924528301887: F4-188.67924528301887,
188.67924528301887: E4-188.67924528301887,
188.67924528301887: D4-188.67924528301887,
188.67924528301887: D4-188.67924528301887,
188.67924528301887: D4-188.67924528301887`
const playback = playTune(melody, Infinity)
let ui = 'u'
let loading_screen = 'l'
let cookie_big = 'c'
let cookie_small = 's'
let stall = 't'
let social_media = 'x'
setLegend(
  [ui, bitmap`
................
......CCCCC.....
.....CCLCCCC....
.....CCCCLCC....
.....CCCCCCC....
.....CCLCCCC....
.....CCCCLCC....
......CCCCC.....
................
........0.......
......DDDDD.....
......D.0.......
......DDDDD.....
........0.D.....
......DDDDD.....
........0.......`,],
   [loading_screen, bitmap`
................
................
...4444.44444...
...4....4...4...
...4.44.4...4...
...4..4.4...4...
...4444.44444...
................
..L..........L..
.L.L........L.L.
..L..........L..
................
................
................
................
................`],
  [cookie_big, bitmap`
................
....CCCCCCCC....
...CCCCLCCCCC...
..CCCLCCCLCCCC..
.CCCCCCCCCCCCCC.
.CCLCCCLCLCCCLC.
.CCCCCCCCCCCCCC.
.CCCLCCCCCCCCCC.
.CCCCCCCLCCCLCC.
.CCLCLCCCCCCCCC.
.CCCCCCLCCLCCCC.
.CCCCLCCCCCCCCC.
..CCCCCCCLCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
................`],
  [cookie_small, bitmap`
................
................
..1..........1..
...1........1...
....1CCCCCC1....
....CCCCCLCC....
...CCLCCCCCCC...
...CCCCCLCCLC...
...CCCLCCCCCC...
...CCLCCCLCCC...
...CCCCCCCCCC...
....CCCLCCCC....
....1CCCCCC1....
...1........1...
..1..........1..
................`],
  [stall, bitmap `
................
3223332223332223
3223332223332223
3223332223332223
..C..........C..
..C..........C..
..C..........C..
..C..........C..
..C..........C..
..C..........C..
.99999999999999.
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
.00000000000000.`], 
  [social_media, bitmap`
0000000000000000
0.4.4......3.3.0
0..............0
0.4.4......333.0
0.444......3.3.0
0.....00000....0
0...00077770...0
0..077777770...0
0.07777777770..0
0.077777777770.0
0..00000000000.0
0..............0
0000000000000000
...0.......0....
...0.......0....
...0.......0....`],
)

setSolids([])
let money = 0
let cookies = 0
let level = 0
let is_in_main_game = 0
let is_in_waiting_state = 0
const levels = [
  map`
u...
t...
....
c...`, map`
l`
]
setMap(levels[1])
addText("Press S to start", {
  x:2,
  y:13,
  color: color`0`,})

/*Loading screen*/
onInput('s', () => {
  if (is_in_main_game == 0) {
  setMap(levels[0])
  clearText()
  is_in_main_game = 1}
  else {
    if (is_in_waiting_state == 0){
    cookies += 1
    clearTile(0,3)
    addSprite(0,3,cookie_small)
    is_in_waiting_state = 1
    setTimeout(() => {
    clearTile(0,3)
    addSprite(0,3,cookie_big)
      is_in_waiting_state = 0
    }, 100)

  }}
    set_displays(money, cookies)
})


onInput('w', () => {
  if (is_in_main_game == 1) {
  sell_cookies()
  set_displays(money, cookies)
  }

})

function set_displays(money, cookies) {
  clearText()
  addText(money.toString(), { 
  x: 6,
  y: 3,
  color: color`0`})
  addText(cookies.toString(), { 
  x: 6,
  y: 1,
  color: color`0`})
  addText("S ", {
  x: 3,
  y: 11,
  color: color`D`})
  addText("W ^", {
  x: 3,
  y: 9,
  color: color`D`})
}

function sell_cookies() {
  money += Math.pow(cookies, 1.25)
  money = Math.round(money)
  cookies -= cookies
  
}

afterInput(() => {
  if (money > 100) {
    addSprite(3, 1, social_media)
    addText(
      "I ^", {
      x: 15,
      y: 9, }
    )
  }
    
})

onInput('i' () => {
  money -= 100
  
})
