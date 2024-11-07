
/*
@title: loadsamoney
@author: geschmit
@tags: ['endless','simulation']
@addedOn: 2022-11-28

probaly.
(https://www.youtube.com/watch?v=ULeDlxa3gyc)

Instructions:
Make that sweet dough! Use [WASD] to print the bills 
and [IJKL] to buy upgrades!

Upgrades do as followed:
Money printers(I): ..... Costs 200$. Gives 1 dollar every 2 seconds.
Money men(J): .......... Costs 500$. Gives a 2x multiplier.
Money banks(K): ........ Costs 1250$. Gives a 5x multiplier.
24k sprigs(L): ......... Costs 5000$. Gives bragging rights.

Controls:
[WASD] - Make money
[I] - Buy money printers
[J] - Buy money men
[K] - Buy money banks
[L] - Buy 24k sprigs
*/

let money = 0
let mult = 1

const inKeys = ["w","a","s","d"]
const spr = {
  money_man: bitmap`
................
..6666D66D6666..
..666DDDDDDDD6..
..6DDDD6DD6666..
..6D6D66D66666..
..6D6D66D66666..
..6DDD66D66666..
..66DD66D66666..
..666DDDD66666..
..666D6DD66666..
..666D66DD6666..
..666D66DDD666..
..666D66DD6666..
..666D66DD6666..
.666DDDDD666666.
.6666D6D6666666.`,
  money_printer: bitmap`
................
................
................
................
...1111111111...
...1111111111...
...1111111111...
..LLLLLLLLLLLLL.
..LDDDDLLLLLLLL.
..LLLLLLLLLLLLL.
..L0000LLLLLLLL.
..LLLLLLLLLLLLL.
..LLLL22222222L.
..LLLL22222222L.
..LLLL22222222L.
................`,
  money_bank: bitmap`
................
......4.........
.....4D444444...
...44DDDDDDDD44.
.44D4DDDDDDDDDD4
.4DD4DDDDDDDDDD4
.4DD4D444D444DD4
.4DD4D4D444D4D44
.4DD4D44DD444D4.
44D44DDDDDDDDDD4
4DD4DDD444444444
44DDDD4.......44
44DD44.........4
.444............
................
................`,
  golden_sprig: bitmap`
................
.6.......6....6.
..6.....6....6..
..6....6.....6..
...6........6...
.....66666.6....
...666LLL6......
.666LLLLLL66666.
66FFLLFFFFLLLL6.
6LFFFLF22FLLLLL6
6LLFLLFFFFLFLL66
66LLLLLLLLFFFL6.
.6666666LLLFLL6.
.......666LLL66.
.........66666..
................`,
  background: bitmap`
CCCCCCCCCCCCCCCC
CFFFFFFFFFFFFFFC
CFFFFFFFFFFFFFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFCCCCCCCCCCFFC
CFFFFFFFFFFFFFFC
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC`,
  background2: bitmap`
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC
FFFFFFFCCCCCCCCC`,
  background3: bitmap`
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
7777777777777777`,
  background4: bitmap`
CCCCCCCCCCCCCCCC
CLLLLLLLLLLLLLLC
CLL7LL7LL7LLLLLC
CLL7LL7LL7LLLLLC
CL7LL7LL7LLLLLLC
CL7LL7LL7LLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CLLLLLLLLLLLLLLC
CCCCCCCCCCCCCCCC`
}

const shopItems = {
  i: { 
    name: "printer", 
    sprite: "c", 
    price: 200, 
    func: () => {
      setInterval(() => {
        money += 1
      },2000)
    }
  },
  j: { 
    name: "money man",
    sprite: "d", 
    price: 500, 
    func: () => {
      mult += 2
    }
  },
  k: { 
    name: "bank",
    sprite: "b", 
    price: 1250, 
    func: () => {
      mult += 5
    }
  },
  l: { 
    name: "24k sprig",
    sprite: "h", 
    price: 5000, 
    func: () => {}
  }

}
const currItems = {
  i: 0,
  j: 0,
  k: 0,
  l: 0
}

setLegend(
  ["h",spr.golden_sprig],
  ["g",spr.background4], 
  ["f",spr.background3],
  ["e",spr.background2],
  ["d",spr.money_man],
  ["c",spr.money_printer],
  ["b",spr.money_bank],
  ["a",spr.background]
)
setMap(map`
aaaaaaaaef
aaaaaaaaef
aaaaaaaaef
aaaaagggef
aaaaagggef
aaaaaaaaef
aaaaaaaaef
aaaaaaaaef`)

for (const x of inKeys) {
  onInput(x, () => {
    money += 1 * mult
  })
}

let instY = 4
let shopStuff = ``
for (const x of Object.keys(shopItems)) {
  const item = shopItems[x]
  addSprite(0,instY,item.sprite)
  shopStuff += `${item.name}: ${item.price}\n`
  onInput(x, () => {
    if (money >= item.price) {
      currItems[x]++
      money = money - item.price
      item.func()
    }
  })
  instY++
}

setInterval(() => {
  clearText()
  addText(`LOADSAMONEY\n\n${shopStuff}\n${money}\$ \\ ${mult}x`, {
  x: 1,
  y: 0,
  color: color`4`
  })

  let yPos = 9   
  for (const x of Object.keys(shopItems)) {
    const item = shopItems[x]
    addText(`${currItems[x]} \\ ${item.name}`,{
  x: 3,
  y: yPos,
  color: color`4`
  })
    yPos++
    yPos++
    }
}, 25)
