/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: cat clicker
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const cursor = "c"
const cat = "p"
const shop = "s"
const home = "h"
const clickupgrade = "1"
const grandma = "2"
const harvester = "4"
const helper = "5"
const treasurer = "6"
const mogul = "7"
const background = "b"


setLegend(
  [ cursor, bitmap`
................
................
.......00.......
......0220......
.....022220.....
...0022222200...
..022222222220..
.02222222222220.
0222222222222220
.00002222200000.
.....022220.....
.....022220.....
.....022220.....
......0220......
.......00.......
................` ],
  [ cat, bitmap`
..0..........0..
.0L0........0L0.
.08L00000000L80.
.0L1111111111L0.
.01111111111110.
.01111111111110.
.01110111101110.
0011101111011110
0111101221011110
0LL1101221011LL0
0111102222011110
0LL1122222211LL0
0111222882221110
0222222222222220
.02222222222220.
..000000000000..` ],
  [ shop, bitmap`
0000000000000000
0322332233223320
0322332233223320
0000000000000000
.00.........00..
.00.........00..
.00.........00..
.00.........00..
.00.........00..
0000000000000000
C0000CCCCCC0000C
00CC00CCCC00CC00
0C00C0CCCC0C00C0
0C00C000000C00C0
00CC00....00CC00
.0000......0000.` ],
  [ home, bitmap`
................
................
.........00.....
.......003300...
......03333330..
.....0333333330.
....033333333330
....000000000000
.000022222222220
.022027777777720
.022022222222220
.022022200002220
.02202220CC02220
.02202220CC02220
.02202220CC02220
.000000000000000` ],
  [ clickupgrade, bitmap`
................
................
.......00.......
......0440......
.....044440.....
...0044444400...
..044444444440..
.04444444444440.
0444444444444440
.00004444440000.
.....044440.....
.....044440.....
.....044440.....
......0440......
.......00.......
................` ],
  [ grandma, bitmap`
0000000000000000
0CDCCCCCCCCCCCC0
0CCCCDCCCCDCCDC0
0CDCCCCCCCCC4CC0
04CCDDCDC4CCCCC0
0CCC4CCCCDCCCCD0
0CDCCCCCCCCDCCC0
0CDCCCCCCCCCCDC0
0C4DCCDDCCDCCCC0
0CCCCCCCCCCCCDC0
0CCCCCCDCCCCD4C0
0CDCCDCCCDCCCCC0
0CCCD4CCDCCCDCC0
0CCCCCCCCCCDCCC0
0CDCCCDCCDC4CCD0
0000000000000000` ],
  [ harvester, bitmap`
.........00000..
....00..0666660.
...0440.06666660
...0444066666FF0
...044466666FFF0
...04446666FFF00
..04444666FFF00.
..044444DDDDD0..
..04444DDDDDD0..
.04444DDDDDDDD0.
.044DDDDDDDDDD0.
.0DDDDDDDD0000..
0DDDDDDD00......
0DDDD000........
00000...........
................` ],
  [ helper, bitmap`
...00......00...
...0800000080...
....01111110....
....01011010....
....01011010....
....01122110....
....02222220....
.....000000.....
....07777770....
....07777770....
....07777770....
....07777770....
....07777770....
....07777770....
....07777770....
....07777770....` ],
  [ treasurer, bitmap`
.....000000.....
......0FF0......
.....0FFFF0.....
....0FFFFFF0....
...0FFFFFFFF0...
..0FFFFDFFFFF0..
..0FFFDDDDFFF0..
..0FFDFDFFFFF0..
..0FFDFDFFFFF0..
..0FFDFDFFFFF0..
..0FFDFDFFFFF0..
..0FFFDDDDFFF0..
..0FFFFDFFFFF0..
...0FFFFFFFF0...
....0FFFFFF0....
.....000000.....` ],
  [ mogul, bitmap`
....00000000....
...0666666660...
..0666F66F6660..
.0666FFFFFF6660.
0666F6F66F666660
0666F6F66F666660
0666F6F66F666660
0666F6F66F666660
0666F6F66F666660
0666F6F66F666660
0666F6F66F666660
0666F6F66F666660
.0666FFFFFF6660.
..0666F66F6660..
...0666666660...
....00000000....` ],
    [ background, bitmap`
DDDDDDDD4444DDDD
DDDDDDDDDDDD444D
DDDDDDDDDDDDDD44
D444DDDDDDDDDDDD
DDDD444DDDDDDDDD
DDDDDDD444444DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDD444444D
DDDDDD444DDDDDDD
DD4444DDDDDDDDDD
444DDDDDDDDDDDDD
DDDDDDDDDD444444
4DDDDDDDDD4DDDDD
444DDDDDDDDDDDDD
DDD4444DDDDDDDDD` ]
)


setSolids([])

let catnip = 0

let clickerup = 0
let gprice = 10
let cprice = 1 
let prestige = 1
let catnip_per_click = 1

let clickers = 0
let grandmas = 0
let harvesters = 0
let helpers = 0
let treasurers = 0
let moguls = 0

let level = 0
const levels = [
  map`
.........
.........
.........
.s..p..s.
.........
.........
.........
.........`,
  map`
........
1.......
2......h
4.......
5.......
6.......
7.......`
]
/*shop*/



setMap(levels[level])



setPushables({
  [ cursor ]: []
})

addSprite(3, 2, "c")

onInput("s", () => {
  getFirst(cursor).y += 1
})
onInput("w", () => {
  getFirst(cursor).y -= 1
})
onInput("d", () => {
  getFirst(cursor).x += 1
})
onInput("a", () => {
  getFirst(cursor).x -= 1
})
onInput("j", () => {
  let CursorTile = getTile(getFirst(cursor).x, getFirst(cursor).y)
  if (level == 0) {
    CursorTile.forEach(sprite => {
    if (sprite.type == "p") {
      Click("cat")
    } else if (sprite.type == "s") {
      Click("shop")
    } 
    })
  } else if (level == 1) {    
    CursorTile.forEach(sprite => {
      if (sprite.type == "1") {
        Click("clicker");
      } else if (sprite.type == "2") {
        Click("grandma");
      } else if (sprite.type == "4") {
        Click("harvester");
      } else if (sprite.type == "5") {
        Click("helper");
      } else if (sprite.type == "6") {
        Click("treasurer");
      } else if (sprite.type == "7") {
        Click("mogul");
      } else if (sprite.type == "h") {
        Click("home");
      }
    });
  }
});

function Click(object) {
  if (object === "cat") {
    catnip += catnip_per_click;
  } else if (object === "shop") {
    setMap(levels[1]);
    level = 1;
    addSprite(3, 2, "c");
  } else if (object === "home") {
    setMap(levels[0]);
    level = 0;
    addSprite(3, 2, "c");
  } else {
    let prices = { "clicker": 1, "grandma": 10, "harvester": 500, "helper": 2000, "treasurer": 10000, "mogul": 50000 };
    let increments = { "clicker": 1, "grandma": 10, "harvester": 100, "helper": 500, "treasurer": 2000, "mogul": 10000 };
    if (catnip >= prices[object]) {
      catnip -= prices[object];
      catnip_per_click += increments[object];
      if (object == "clicker") {clickers += 1}
      if (object == "grandma") {grandmas += 1}
      if (object == "harvester") {harvesters += 1}
      if (object == "helper") {helpers += 1}
      if (object == "treasurer") {treasurers += 1}
      if (object == "mogul") {moguls += 1}
      
    }
    
  }
}
function updateText() {
  clearText();
  let displayCatnip = catnip;
  let suffix = "";

  if (catnip >= 1e12) {
    displayCatnip = (catnip / 1e12).toFixed(2);
    suffix = "T";
  } else if (catnip >= 1e9) {
    displayCatnip = (catnip / 1e9).toFixed(2);
    suffix = "B";
  } else if (catnip >= 1e6) {
    displayCatnip = (catnip / 1e6).toFixed(2);
    suffix = "M";
  } else if (catnip >= 1e3) {
    displayCatnip = (catnip / 1e3).toFixed(2);
    suffix = "K";
  }

  addText("Catnip: " + displayCatnip + suffix, { x: 2, y: 0, color: color`0` });

  if (level == 1) {
    addText("CL: " + 1 + "C - " + clickers, { x: 3, y: 3, color: color`0` });
    addText("GM: " + 10 + "C - " + grandmas, { x: 3, y: 5, color: color`0` });
    addText("HA: " + 500 + "C - " + harvesters, { x: 3, y: 7, color: color`0` });
    addText("HE: " + 2000 + "C - " + helpers, { x: 3, y: 9, color: color`0` });
    addText("TR: " + 10000 + "C - " + treasurers, { x: 3, y: 11, color: color`0` });
    addText("MO: " + 50000 + "C - " + moguls, { x: 3, y: 13, color: color`0` });
  }
}

setBackground("b")

updateText()
addText("Tutorial", {
      x: 5,
      y: 9,
      color: color`0`
})
addText("Click the", {
      x: 5,
      y: 10,
      color: color`0`
})
addText("cat for c", {
      x: 5,
      y: 11,
      color: color`0`
})
addText("click the ", {
      x: 5,
      y: 12,
      color: color`0`
})
addText("side for the", {
      x: 4,
      y: 13,
      color: color`0`
})
addText("shop use", {
      x: 5,
      y: 14,
      color: color`0`
})
addText("j to click", {
      x: 5,
      y: 15,
      color: color`0`
})

function idleIncome() {
  let income = 
    (clickers * 0) + 
    (grandmas * 1) + 
    (harvesters * 10) + 
    (helpers * 50) + 
    (treasurers * 100) + 
    (moguls * 1000);
    
  catnip += income;
  updateText();
}

// Apply idle income every second
setInterval(idleIncome, 1000);
afterInput(() => {
  updateText()
})