/*
@title: Cookie Hacker
@author: felixexists 
@tags: []
@addedOn: 2024-09-03
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
let bg = 'b'
let atom = 'a'
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
........0.......`, ],
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
0242422222232320
0222222222222220
0242422222233320
0244422222232320
0222220000022220
0222000777702220
0220777777702220
0207777777770220
0207777777777020
0220000000000020
0222222222222220
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
4444444444444444`],
  [bg, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [atom, bitmap`
....66666666....
...6666666666...
..660666666066..
.66000666600066.
6600006006000066
6000060000600006
6000060000600006
6666666006666666
6666666666666666
6666666666666666
6666666006666666
6666660000666666
.66660000006666.
..660000000066..
...6600000066...
....66666666....`]
)

setSolids([])
let money = 990000000
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
  x: 2,
  y: 13,
  color: color`0`,
})

/*Loading screen*/
onInput('s', () => {
  if (is_in_main_game == 0) {
    setMap(levels[0])
    setBackground(bg)

    clearText()
    applyPassives()
    is_in_main_game = 1
  } else {
    if (is_in_waiting_state == 0) {
      cookies += 1
      clearTile(0, 3)
      addSprite(0, 3, cookie_small)
      is_in_waiting_state = 1
      setTimeout(() => {
        clearTile(0, 3)
        addSprite(0, 3, cookie_big)
        is_in_waiting_state = 0
      }, 100)

    }
  }
  set_displays(money, cookies)
})


onInput('w', () => {
  if (is_in_main_game == 1) {
    sell_cookies()
    set_displays(money, cookies)
  }

})

function set_displays(money, cookies) {
  if (is_in_main_game == 1) {
  clearText()
  addText(money.toString(), {
    x: 6,
    y: 3,
    color: color`0`
  })
  addText(cookies.toString(), {
    x: 6,
    y: 1,
    color: color`0`
  })
  addText("S ", {
    x: 3,
    y: 11,
    color: color`D`
  })
  addText("W ^", {
    x: 3,
    y: 9,
    color: color`D`
  })
  addText((sumPassives().toString()).concat("/sec"), {
    x: 6,
    y: 6,
    color: color`5`
  })

  addPurchasables()
}}

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
      is_in_main_game = 0
    }
  }
})

function addPurchasables() {
  if (is_in_main_game == 1) {
  if (money >= 100) {
    addSprite(3, 1, social_media)
    addText(
      "I ^", {
        x: 15,
        y: 9,
      }
    )
    if (money >= 500) {
      addSprite(3, 3, factory)
      addText(
        "K ", {
          x: 15,
          y: 10,
        }
      )

      if (money >= 10000) {
        addSprite(1, 3, atom)
        addText("J", {
          x: 6,
          y: 11,
        })
      } else {
        clearTile(1, 3)
      }
    } else {
      clearTile(3, 3)
      clearTile(1, 3)
    }
  } else {
    clearTile(3, 1)
    clearTile(3, 3)
    clearTile(1, 3)
  }
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
onInput('j', () => {
  if (money >= 10000) {
    money -= 10000
    passives.push(500)
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

function applyPassives() {
  cookies += sumPassives()
  set_displays(money, cookies)

  setTimeout(function() {
    applyPassives();

  }, 1000);
}

