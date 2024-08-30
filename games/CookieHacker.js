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
let factory = 'f'
let victory = 'v'
let passives = []

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
  [factory, bitmap`
...2.......2.22.
.2222.....22.2..
2222......2222..
..11.......11...
..11.......11...
..11.......11...
..11.......11...
.LLLLLLLLLLLLLL.
.L77L77LL77L77L.
.L77L77LL77L77L.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.`],
  [victory, bitmap`
4L7L4LLLLL4L77L4
4L7L4L777L4L77L4
4LLL4L777L4L77L4
44L44L777L4L77L4
44L44LLLLL4LLLL4
4444444444444444
4L4L4L4LLL4LLL4L
4L4L4L44L44L4L4L
4L4L4L44L44L4L4L
4L4L4L44L44L4L44
4LLLLL4LLL4L4L4L
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
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
l`, map`
v`
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
  applyPassives()
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
  addText((sumPassives().toString()).concat("/sec"), {
    x:6,
    y:6,
    color: color`5`
  }
         )
  
  addPurchasables()
}

function sell_cookies() {
  money += Math.pow(cookies, 1.25)
  money = Math.round(money)
  cookies -= cookies
  
}

afterInput(() => {
  if (is_in_main_game == 1) {
    
  addPurchasables()
  if (money > 1000000000) {
    setMap(levels[2])
    clearText()
    
  }}
})
function addPurchasables() {
  if (money >= 100) {
    addSprite(3, 1, social_media)
    addText(
      "I ^", {
      x: 15,
      y: 9, }
    )
    if (money >= 500) {
      addSprite(3, 3, factory)
      addText(
      "K ", {
      x: 15,
      y: 10, }
    )
    }
  }
  else {
    clearTile(3,1)
    clearTile(3,3)
  }  
}

onInput('i', () => {
  if (money >= 100) {
  money -= 100
  passives.push(3)
  set_displays(money, cookies)
  }
})
onInput('k', () => {
  if (money >= 500) {
  money -= 500
  passives.push(25)
  set_displays(money, cookies)
  }
})
function sumPassives() {
  let n = 0
  for (let p of passives) {
      n += p
  }
  return n
  
}

function applyPassives()
{
    cookies += sumPassives()
    set_displays(money, cookies)

    setTimeout(function()
    {
        applyPassives();

    }, 1000);
}

