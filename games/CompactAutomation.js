/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Compact Automation
@description: A game about automating things in a small face.
@author: Simon (sevinatenine)
@tags: ['automation', 'factory', 'conveyor', 'compact']
@addedOn: 2026-00-00
*/

const selectU = "x";
const selectR = "y";
const selectD = "z";
const selectL = "s";

const selectPickup = "p";
const topSelect = "t";

const conveyerU = "u";
const conveyerD = "d";
const conveyerL = "l";
const conveyerR = "r";

const coalMine = "c";
const ironMine = "i";
const copperMine = "o";
const black = "v";

const smelter = "n";
const seller = "m";

const filteredEjectorU = "a";
const filteredEjectorD = "b";
const filteredEjectorL = "f";
const filteredEjectorR = "g";

const coalItem = "q";
const rawIronItem = "w";
const rawCopperItem = "h";
const ironIngotItem = "j";
const copperIngotItem = "k";

// free v

const remove = "e";

const select1 = tune`
500: E4~500,
15500`;

setLegend(
  [ black, bitmap`
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
  [ rawIronItem, bitmap`
................
................
................
................
................
....LLLLL1......
...LLL1L111.....
...LLLL11122....
..L1LL1121222...
..LLLL2111222...
...LLL1L12222...
....LLL112222...
.....LL122222...
.......122......
................
................` ],
[ rawCopperItem, bitmap`
................
................
................
................
................
....CCCCC9......
...CCC9C999.....
...CCCC999FF....
..C9CC99F9FFF...
..CCCCF999FFF...
...CCC9C9FFFF...
....CCC99FFFF...
.....CC9FFFFF...
.......9FF......
................
................` ],
  [ ironIngotItem, bitmap`
................
................
................
................
........12......
.......1122.....
......L11122....
.....LL121122...
....LLLL1111....
...LL2LL1L1.....
....L1L1L1......
.....LLLL.......
......LL........
................
................
................` ],
[ copperIngotItem, bitmap`
................
................
................
................
........9F......
.......99FF.....
......C999FF....
.....CC9F99FF...
....CCCC9999....
...CCFCC9C9.....
....C9C9C9......
.....CCCC.......
......CC........
................
................
................` ],
[ coalItem, bitmap`
................
................
................
................
................
....00000L......
...000L0LLL.....
...0000LLL11....
..0L00LL1L111...
..00001LLL111...
...000L0L1111...
....000LL1111...
.....00L11111...
.......L11......
................
................` ],
  [ selectU, bitmap`
333333....333333
33333......33333
333..........333
33.....33.....33
33....3333....33
3....333333....3
.......33.......
.......33.......
.......33.......
.......33.......
.......33......3
33.....33.....33
33.....33.....33
333..........333
33333......33333
333333....333333` ],
  [ selectR, bitmap`
333333....333333
33333......33333
333..........333
33............33
33............33
3.........3....3
..........33....
...3333333333...
...3333333333...
..........33....
..........3....3
33............33
33............33
333..........333
33333......33333
333333....333333` ],
  [ selectD, bitmap`
333333....333333
33333......33333
333..........333
33.....33.....33
33.....33.....33
3......33......3
.......33.......
.......33.......
.......33.......
.......33.......
.....333333....3
33....3333....33
33.....33.....33
333..........333
33333......33333
333333....333333` ],
  [ selectL, bitmap`
333333....333333
33333......33333
333..........333
33............33
33............33
3....3.........3
....33..........
...3333333333...
...3333333333...
....33..........
.....3.........3
33............33
33............33
333..........333
33333......33333
333333....333333` ],
  [ selectPickup, bitmap`
777777....777777
77777......77777
777..........777
77............77
77............77
7..............7
................
................
................
................
...............7
77............77
77............77
777..........777
77777......77777
777777....777777` ],
  [ topSelect, bitmap`
888888....888888
88888......88888
888..........888
88............88
88............88
8..............8
................
................
................
................
...............8
88............88
88............88
888..........888
88888......88888
888888....888888` ],
  [ conveyerU, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLL11LLLLLL1
1LLLLL1111LLLLL1
1LLLL111111LLLL1
1LLL11111111LLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1` ],
  [ conveyerD, bitmap`
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLLLL1111LLLLL1
1LLL11111111LLL1
1LLLL111111LLLL1
1LLLLL1111LLLLL1
1LLLLLL11LLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1` ],
  [ conveyerL, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLL11LLLLLLLLLL
LLL11111111111LL
LL111111111111LL
LL111111111111LL
LLL11111111111LL
LLLL11LLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111` ],
  [ conveyerR, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLL11LLLL
LL11111111111LLL
LL111111111111LL
LL111111111111LL
LL11111111111LLL
LLLLLLLLLL11LLLL
LLLLLLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111` ],
  [ filteredEjectorU, bitmap`
6FFFFFFFFFFFFFF6
6FF9999999999FF6
6FFF99977999FFF6
6FFFF977779FFFF6
6FFFF777777FFFF6
6FFF77777777FFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6` ],
  [ filteredEjectorD, bitmap`
6FFFFFFFFFFFFFF6
6FF9999999999FF6
6FFF99777799FFF6
6FFFF977779FFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFFFF7777FFFFF6
6FFF77777777FFF6
6FFFF777777FFFF6
6FFFFF7777FFFFF6
6FFFFFF77FFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6` ],
  [ filteredEjectorL, bitmap`
6666666666666666
FFF9999999999FFF
FFFF99999999FFFF
FFFFF999999FFFFF
FFFFF79999FFFFFF
FFFF77F99FFFFFFF
FFF77777777777FF
FF777777777777FF
FF777777777777FF
FFF77777777777FF
FFFF77F99FFFFFFF
FFFFF7F99FFFFFFF
FFFFFFF99FFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
6666666666666666` ],
  [ filteredEjectorR, bitmap`
6666666666666666
FFF9999999999FFF
FFFF99999999FFFF
FFFFF999999FFFFF
FFFFFF99997FFFFF
FFFFFFF99F77FFFF
FF77777777777FFF
FF777777777777FF
FF777777777777FF
FF77777777777FFF
FFFFFFF99F77FFFF
FFFFFFF99F7FFFFF
FFFFFFF99FFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
6666666666666666` ],
   [ coalMine, bitmap`
0000000000000000
00FFFFFFFFFFFF00
0FFFFF1111FFFFF0
0FFFF1LLLLLFFFF0
0FFFF1LC9FFFFFF0
0FFFF1L9C9FFFFF0
0FFFF1LF9C9FFFF0
0FFFFFLFF9C9FFF0
0FFFFFFFFF9C9FF0
0FFFFFFFFFF9C9F0
0FFF000LFFFF9CF0
0FF00000LFFFFFF0
0FF00000LFFFFFF0
0FFF000LLFFFFFF0
00FFFFFFFFFFFF00
0000000000000000` ],
  [ ironMine, bitmap`
0000000000000000
00DDDDDDDDDDDD00
0DDDDD1111DDDDD0
0DDDD1LLLLLDDDD0
0DDDD1LC9DDDDDD0
0DDDD1L9C9DDDDD0
0DDDD1LD9C9DDDD0
0DDDDDLDD9C9DDD0
0DDDDDDDDD9C9DD0
0DDDDDDDDDD9C9D0
0DDD1112DDDD9CD0
0DD111112DDDDDD0
0DD111112DDDDDD0
0DDD11122DDDDDD0
00DDDDDDDDDDDD00
0000000000000000` ],
  [ copperMine, bitmap`
0000000000000000
0077777777777700
0777771111777770
077771LLLLL77770
077771LC97777770
077771L9C9777770
077771L79C977770
077777L779C97770
07777777779C9770
077777777779C970
0777999C77779C70
07799999C7777770
07799999C7777770
0777999CC7777770
0077777777777700
0000000000000000` ],
  [ smelter, bitmap`
LLLLLLLLLLLLLLLL
L0011L1111L1100L
L0011L1L11L1100L
L1111LLLLLL1111L
L11111111111111L
LLLL1111LLL1LLLL
L11L1LLLLLL1L11L
L11L1L99L111LL1L
L1LL1L99L111L11L
L11L1LLLLLL1L11L
LLLL11111111LLLL
L11111111111111L
L1111LLLLLL1111L
L0011L11L1L1100L
L0011L1111L1100L
LLLLLLLLLLLLLLLL` ],
  [ seller, bitmap`
4444444444444444
4DDDDDDDDDDDDDD4
4DDDDDD44DDDDDD4
4DDDDDD44444DDD4
4DDDD4444444DDD4
4DDD44444DDDDDD4
4DDD44D44DDDDDD4
4DDD4444444DDDD4
4DDDD4444444DDD4
4DDDDDD44D44DDD4
4DDDDDD44444DDD4
4DDD4444444DDDD4
4DDD44444DDDDDD4
4DDDDDD44DDDDDD4
4DDDDDDDDDDDDDD4
4444444444444444` ],
  [ remove, bitmap`
3333333333333333
333..........333
3333........3333
3.333......333.3
3..333....333..3
3...333..333...3
3....333333....3
3.....3333.....3
3.....3333.....3
3....333333....3
3...333..333...3
3..333....333..3
3.333......333.3
3333........3333
333..........333
3333333333333333` ]
)

const PASSIVE = 0;
const PUSH = 1;
const PULL = 2;

var types = {
  conveyer: {
    rotations: [
      {
        image: conveyerU,
        io: [
          PUSH,
          PASSIVE,
          PASSIVE,
          PASSIVE
        ]
      },
      {
        image: conveyerR,
        io: [
          PASSIVE,
          PUSH,
          PASSIVE,
          PASSIVE
        ]
      },
      {
        image: conveyerD,
        io: [
          PASSIVE,
          PASSIVE,
          PUSH,
          PASSIVE
        ]
      },
      {
        image: conveyerL,
        io: [
          PASSIVE,
          PASSIVE,
          PASSIVE,
          PUSH
        ]
      }
    ]
  },
  filteredEjector: {
    rotations: [
      {
        image: filteredEjectorU
      },
      {
        image: filteredEjectorR
      },
      {
        image: filteredEjectorD
      },
      {
        image: filteredEjectorL
      }
    ]
  }
};

var cursorX = 0;
var cursorY = 1;
var picking = false;

const TOP_OFFSET = 2;
const MAX_TOP = 8;
var topPos = 0;

var costs = {
  conveyer: 15,
  filteredEjector: 25,
  coalMine: 50,
  ironMine: 80,
  copperMine: 60,
  smelter: 80,
  seller: 30
};

var sellPrices = {
  "Coal": 4,
  "Raw Copper": 5,
  "Raw Iron": 6,
  "Copper Ingot": 12,
  "Iron Ingot": 15
};

var onTop = [
  {
    name: "remove",
    image: remove
  },
  {
    name: "conveyer",
  },
  {
    name: "filteredEjector",
  },
  {
    name: "coalMine",
    image: coalMine
  },
  {
    name: "copperMine",
    image: copperMine
  },
  {
    name: "ironMine",
    image: ironMine
  },
  {
    name: "smelter",
    image: smelter
  },
  {
    name: "seller",
    image: seller
  },
];

setSolids([])

let level = 0
var gameLevel = map`
..........
..........
..........
..........
..........
..........
..........
..........`;

var placed = `
..........
..........
..........
..........
..........
..........
..........
..........`;

var data = [];

for (var x = 0; x < 10; x++) {
  data.push([]);
  for (var y = 0; y < 8; y++) {
    data[x].push({});
  }
}

placed = placed.replaceAll("\n", "").split(""); // array of chars, not a string

function getAt(x, y) {
  return placed[(y * 10) + x];
}

function setAt(x, y, d) {
  placed[(y * 10) + x] = d;
}

setMap(gameLevel);

for (var i = 0; i < onTop.length; i++) {
  addSprite(TOP_OFFSET + i, 0, types[onTop[i].name]?.rotations[0]?.image || onTop[i].image);
}

addSprite(TOP_OFFSET, 0, topSelect);

function setMode(selecting, rotation) {
  for (var type of [selectU, selectR, selectD, selectL, selectPickup]) {
    var s = getFirst(type);
    if (s) s.remove();
  }

  if (!selecting) {
    if (rotation == 0) addSprite(cursorX, cursorY, selectU);
    else if (rotation == 1) addSprite(cursorX, cursorY, selectR);
    else if (rotation == 2) addSprite(cursorX, cursorY, selectD);
    else if (rotation == 3) addSprite(cursorX, cursorY, selectL);
  } else {
    addSprite(cursorX, cursorY, selectPickup);
  }
}

setMode(false, 0);

var rotation = 0;

setPushables({
  [ selectU ]: []
})

onInput("s", () => {
  if (rotation == 0) {
    var cur = getFirst(!picking ? selectU : selectPickup);
  } else if (rotation == 1) {
    var cur = getFirst(!picking ? selectR : selectPickup);
  } else if (rotation == 2) {
    var cur = getFirst(!picking ? selectD : selectPickup);
  } else if (rotation == 3) {
    var cur = getFirst(!picking ? selectL : selectPickup);
  }

  var copy = {x:cur.x,y:cur.y};
  cur.y = Math.min(cur.y + 1, 7);

  if (parseInt(copy.y) != parseInt(cur.y)) {
    playTune(select1);
  }
  
  cursorY = cur.y;
})

onInput("w", () => {
  if (rotation == 0) {
    var cur = getFirst(!picking ? selectU : selectPickup);
  } else if (rotation == 1) {
    var cur = getFirst(!picking ? selectR : selectPickup);
  } else if (rotation == 2) {
    var cur = getFirst(!picking ? selectD : selectPickup);
  } else if (rotation == 3) {
    var cur = getFirst(!picking ? selectL : selectPickup);
  }

  var copy = {x:cur.x,y:cur.y};
  cur.y = Math.max(cur.y - 1, 1);

  if (parseInt(copy.y) != parseInt(cur.y)) {
    playTune(select1);
  }
  
  cursorY = cur.y;
})

onInput("a", () => {
  if (rotation == 0) {
    var cur = getFirst(!picking ? selectU : selectPickup);
  } else if (rotation == 1) {
    var cur = getFirst(!picking ? selectR : selectPickup);
  } else if (rotation == 2) {
    var cur = getFirst(!picking ? selectD : selectPickup);
  } else if (rotation == 3) {
    var cur = getFirst(!picking ? selectL : selectPickup);
  }

  var copy = {x:cur.x,y:cur.y};
  cur.x = Math.max(cur.x - 1, 0);

  if (parseInt(copy.x) != parseInt(cur.x)) {
    playTune(select1);
  }
  
  cursorX = cur.x;
})

onInput("d", () => {
  if (rotation == 0) {
    var cur = getFirst(!picking ? selectU : selectPickup);
  } else if (rotation == 1) {
    var cur = getFirst(!picking ? selectR : selectPickup);
  } else if (rotation == 2) {
    var cur = getFirst(!picking ? selectD : selectPickup);
  } else if (rotation == 3) {
    var cur = getFirst(!picking ? selectL : selectPickup);
  }

  var copy = {x:cur.x,y:cur.y};
  cur.x = Math.min(cur.x + 1, 9);

  if (parseInt(copy.x) != parseInt(cur.x)) {
    playTune(select1);
  }
  
  cursorX = cur.x;
})

var pricingDisplayed = false;


// var costs = {
//   conveyer: 15,
//   filteredEjector: 25,
//   coalMine: 50,
//   ironMine: 80,
//   copperMine: 60,
//   smelter: 80,
//   seller: 30
// };

// var sellPrices = {
//   "Coal": 4,
//   "Raw Copper": 5,
//   "Raw Iron": 6,
//   "Copper Ingot": 12,
//   "Iron Ingot": 15
// };

function blackBG() {
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 8; y++) {
      addSprite(x, y, black);
    }
  }
}

function clearBlackBG() {
  for (var i of getAll(black)) {
    i.remove();
  }
}

function displayPricing() {
  clearText();
  clearBlackBG();
  blackBG();

  addText("Pricing",{x:6,y:2, color:color`3`});  
  
  addText("Coal",{x:10,y:4, color:color`6`});
  addText("4",{x:15,y:4, color:color`7`});
  
  addText("Raw Copper",{x:4,y:5, color:color`6`});
  addText("5",{x:15,y:5, color:color`7`});
  
  addText("Raw Iron",{x:6,y:6, color:color`6`});
  addText("6",{x:15,y:6, color:color`7`});
  
  addText("Copper Ingot",{x:2,y:7, color:color`6`});
  addText("12",{x:15,y:7, color:color`7`});

  addText("Iron Ingot",{x:4,y:8, color:color`6`});
  addText("17",{x:15,y:8, color:color`7`});
  
  addText("Press Any Key",{x:3,y:12, color:color`4`});
  pricingDisplayed = 1;
}

function removePricing() {
  clearBlackBG();
  clearText();
  pricingDisplayed = false;
  updateMoney();
}

var lastPressedJ = 0;
var lastPressedL = 0;

onInput("j", () => {
  lastPressedJ = performance.now();
  if ((performance.now() - lastPressedL) < 50 ) {
    displayPricing();
  }
  
  topPos = (topPos - 1 + MAX_TOP) % MAX_TOP;
  getFirst(topSelect).x = TOP_OFFSET + topPos;
})

onInput("l", () => {
  lastPressedL = performance.now();
  if ((performance.now() - lastPressedJ) < 50 ) {
    displayPricing();
  }
  
  topPos = (topPos + 1 + MAX_TOP) % MAX_TOP;
  getFirst(topSelect).x = TOP_OFFSET + topPos;

})

var pickupX = 0;
var pickupY = 0;

var money = 100;

function formatMoney(val) {
  var sign = val < 0 ? "-" : "";
  var n = Math.abs(val);

  if (n < 1000) {
    return sign + n;
  }

  var units = ["k", "M", "B", "T"];
  var i = -1;
  while (n >= 1000 && i < units.length - 1) {
    n /= 1000;
    i++;
  }

  // pick precision so sign+digits+unit stays <= 4 chars
  var str;
  if (n < 10) {
    str = n.toFixed(1);       // e.g. 1.2
  } else {
    str = Math.floor(n).toString(); // e.g. 12, 123
  }

  // trim trailing ".0"
  str = str.replace(/\.0$/, "");

  return sign + str + units[i];
}

function updateMoney(notEnough) {
  if (pricingDisplayed) return;
  
  clearText();
  addText(formatMoney(money), {
    x: 0,
    y: 0,
    color: (notEnough ? color`3` : color`4`)
  })
}

function addMoney(v) {
  money += v;
  updateMoney();
}

// updateMoney();

blackBG();

addText("Compact",{x:7,y:2, color:color`3`});
addText("Automation",{x:5,y:3, color:color`3`});

addText("Controls",{x:6,y:5, color:color`5`});

addText("WASD",{x:2,y:7, color:color`6`});
addText("Move cursor",{x:7,y:7, color:color`7`});

addText("I",{x:5,y:8, color:color`6`});
addText("Rotate",{x:7,y:8, color:color`7`});

addText("K",{x:5,y:9, color:color`6`});
addText("Place/move",{x:7,y:9, color:color`7`});

addText("J/L",{x:3,y:10, color:color`6`});
addText("Cycle blocks",{x:7,y:10, color:color`7`});

addText("J+L",{x:3,y:11, color:color`6`});
addText("Prices info",{x:7,y:1, color:color`7`});

addText("Press Any Key",{x:3,y:13, color:color`4`});

var titleScreen = true;

function removeTitle() {
  clearBlackBG();
  clearText();
  updateMoney();
  titleScreen = false;
}

onInput("i", () => {
  rotation = (rotation + 1) % 4;
  setMode(picking, rotation);
})

onInput("k", () => {
  if (picking) {
    if (getAt(cursorX, cursorY) == ".") {
      picking = false;
      setMode(picking, rotation);

      // Move it here from (pickupX, pickupY)
      data[cursorX][cursorY] = data[pickupX][pickupY];
      setAt(cursorX, cursorY, getAt(pickupX, pickupY));
      addSprite(cursorX, cursorY, getAt(pickupX, pickupY));

      for (var sprite of getTile(pickupX, pickupY)) {
        if (sprite.type == getAt(pickupX, pickupY)) {
          sprite.remove();
        }
      }

      setAt(pickupX, pickupY, ".");
      data[pickupX][pickupY] = {};

    }
  } else {
    var t = onTop[topPos];
    var name = t.name;
    var image = types[t.name]?.rotations[rotation]?.image || t.image;

    if (name == "remove") {
      if (getAt(cursorX, cursorY) != ".") {
        for (var sprite of getTile(cursorX, cursorY)) {
          if (sprite.type == getAt(cursorX, cursorY) || ([rawIronItem, rawCopperItem, coalItem, copperIngotItem, ironIngotItem].includes(sprite.type))) {
            sprite.remove();
          }
        }

        money += costs[data[cursorX][cursorY].type];
        updateMoney();
        
        setAt(cursorX, cursorY, ".");
        data[cursorX][cursorY] = {};
      }
    } else if (getAt(cursorX, cursorY) != ".") {
      picking = true;
      setMode(picking, rotation);

      pickupX = cursorX;
      pickupY = cursorY;
    } else {
      if (money >= costs[name]) {
        money -= costs[name];
        updateMoney();

        // place
        data[cursorX][cursorY] = {
          type: name,
          rotation: rotation,
          inventory: {}
        };
        setAt(cursorX, cursorY, image);
        addSprite(cursorX, cursorY, image);
      } else {
        updateMoney(true);
        
        setTimeout(function() {
          updateMoney();
        }, 400);
      }
    }
  }
})

var minesTime = 3000;
var smeltTime = 4000;
var conveyerTime = 200;
var updateTime = 100;

var smeltCount = 0;
var minesCount = 0;
var conveyerCount = 0;

const INVENTORY_SIZES = {
  seller: Infinity,
  conveyer: 1,
  ironMine: 0,
  copperMine: 0,
  coalMine: 0,
  smelter: 20,
  filteredEjector: 1
};

const itemLookup = {
  "Raw Iron": rawIronItem,
  "Raw Copper": rawCopperItem,
  "Coal": coalItem,
  "Iron Ingot": ironIngotItem,
  "Copper Ingot": copperIngotItem
};

const smelterRecipies = {
  "Raw Iron": "Iron Ingot",
  "Raw Copper": "Copper Ingot"
};

function getSize(inv) {
  var size = 0;
  
  for (i of Object.values(inv)) {
    size += i;
  }

  return size;
}

setInterval(function() {

  if (minesCount == 0) {
    for (var x = 0; x < data.length; x++) {
      for (var y = 0; y < data[x].length; y++) {
        var i = data[x][y];

        if (["ironMine", "coalMine", "copperMine"].includes(i.type)) {
          console.log(x, y, Object.entries(i.inventory).join(","));

          var ingotType = (i.type === "ironMine") ? "Raw Iron" : ((i.type === "copperMine") ? "Raw Copper" : "Coal");

          if (!i.inventory[ingotType]) {
            i.inventory[ingotType] = 0;
          }

          i.inventory[ingotType]++;

          console.log(i.inventory);
        }
      }
    }
  }

  if (smeltCount == 0) {
    console.log("smelt update");

    for (var x = 0; x < data.length; x++) {
      for (var y = 0; y < data[x].length; y++) {
        var i = data[x][y];

        if (!i.type) continue;
        if (i.type != "smelter") continue;

        var type = (i.inventory["Raw Iron"] && (i.inventory["Raw Iron"] > 1)) ? "Raw Iron" : ((i.inventory["Raw Copper"] && (i.inventory["Raw Copper"] > 1)) ? "Raw Copper" : null);

        console.log("type", type);
        console.log(Object.entries(i.inventory));
        
        if (i.inventory["Coal"] && (i.inventory["Coal"] > 1)) {
          if (!type) continue;
        
          i.inventory[type]--;
          i.inventory["Coal"]--;
        
          i.inventory[smelterRecipies[type]] = (i.inventory[smelterRecipies[type]] || 0) + 1;
        }
      }
    }
  }

  if (conveyerCount == 0) {
    var snapshot = data.map(col => col.map(tile => ({
      inventory: tile.inventory ? { ...tile.inventory } : undefined
    })));

    for (var x = 0; x < data.length; x++) {
      for (var y = 0; y < data[x].length; y++) {
        var i = data[x][y];

        if (!i.type) continue;

        if (i.type == "seller") {
          while (getSize(i.inventory) > 0) {
            var entry = Object.entries(i.inventory).filter(e => e[1] > 0)[0];
            var key = entry[0]; // item name, e.g. "Raw Iron"

            console.log(key);
        
            i.inventory[key]--;
            money += sellPrices[key] || 0;
        
            updateMoney();
          }
          continue;
        }
        
        if (i.type != "conveyer" && i.type != "filteredEjector") continue;

        var iSnap = snapshot[x][y];

        if (i.rotation == 0) {
          var bx = x, by = y + 1;
          var ix = x, iy = y - 1;

          var behind = (by < 8) ? data[bx][by] : undefined;
          var behindSnap = (by < 8) ? snapshot[bx][by] : undefined;
          var infront = (iy >= 0) ? data[ix][iy] : undefined;
          var infrontSnap = (iy >= 0) ? snapshot[ix][iy] : undefined;

        } else if (i.rotation == 1) {
          var bx = x - 1, by = y;
          var ix = x + 1, iy = y;

          var behind = (bx >= 0) ? data[bx][by] : undefined;
          var behindSnap = (bx >= 0) ? snapshot[bx][by] : undefined;
          var infront = (ix < 10) ? data[ix][iy] : undefined;
          var infrontSnap = (ix < 10) ? snapshot[ix][iy] : undefined;

        } else if (i.rotation == 2) {
          var bx = x, by = y - 1;
          var ix = x, iy = y + 1;

          var behind = (by >= 0) ? data[bx][by] : undefined;
          var behindSnap = (by >= 0) ? snapshot[bx][by] : undefined;
          var infront = (iy < 8) ? data[ix][iy] : undefined;
          var infrontSnap = (iy < 8) ? snapshot[ix][iy] : undefined;

        } else if (i.rotation == 3) {
          var bx = x + 1, by = y;
          var ix = x - 1, iy = y;

          var behind = (bx < 10) ? data[bx][by] : undefined;
          var behindSnap = (bx < 10) ? snapshot[bx][by] : undefined;
          var infront = (ix >= 0) ? data[ix][iy] : undefined;
          var infrontSnap = (ix >= 0) ? snapshot[ix][iy] : undefined;
        }

        if (i.type == "conveyer") {
          // conveyers only pull from non-conveyer neighbors, any item type
          if (behind && behind.type && behind.type != "conveyer") {
            var taken = 0;
            var canTake = Math.max(INVENTORY_SIZES.conveyer - getSize(iSnap.inventory), 0);
        
            while (taken < canTake && getSize(behindSnap.inventory) > 0) {
              for (var j of Object.keys(behindSnap.inventory)) {
                if (behindSnap.inventory[j] <= 0) continue;
        
                behindSnap.inventory[j]--;
                behind.inventory[j]--;
        
                if (!i.inventory[j]) i.inventory[j] = 0;
                i.inventory[j]++;
        
                if (!iSnap.inventory[j]) iSnap.inventory[j] = 0;
                iSnap.inventory[j]++;
        
                taken++;
                break;
              }
            }
          }
        } else if (i.type == "filteredEjector") {
          // filtered ejectors pull from ANYTHING behind them (including conveyers/
          // other ejectors), but only ever take Iron Ingot / Copper Ingot
          if (behind && behind.type && behindSnap.inventory) {
            var taken = 0;
            var canTake = Math.max(INVENTORY_SIZES.filteredEjector - getSize(iSnap.inventory), 0);
        
            while (taken < canTake) {
              var got = false;
        
              for (var j of ["Iron Ingot", "Copper Ingot"]) {
                if (!behindSnap.inventory[j] || behindSnap.inventory[j] <= 0) continue;
        
                behindSnap.inventory[j]--;
                behind.inventory[j]--;
        
                if (!i.inventory[j]) i.inventory[j] = 0;
                i.inventory[j]++;
        
                if (!iSnap.inventory[j]) iSnap.inventory[j] = 0;
                iSnap.inventory[j]++;
        
                taken++;
                got = true;
                break;
              }
        
              if (!got) break;
            }
          }
        }

        var hadItemsThisTick = getSize(i.inventory) > 0;
        
        if (infront && infront.type) {
          var pushed = 0;
          var canPush = Math.max(INVENTORY_SIZES[infront.type] - getSize(infrontSnap.inventory), 0);

          while (pushed < canPush && getSize(iSnap.inventory) > 0) {
            for (var j of Object.keys(iSnap.inventory)) {
              if (iSnap.inventory[j] <= 0) continue;

              iSnap.inventory[j]--;
              i.inventory[j]--;

              if (!infront.inventory[j]) infront.inventory[j] = 0;
              infront.inventory[j]++;

              if (!infrontSnap.inventory[j]) infrontSnap.inventory[j] = 0;
              infrontSnap.inventory[j]++;

              pushed++;
              break;
            }
          }
        }

        if (i.type == "conveyer" || i.type == "filteredEjector") {
          if (!hadItemsThisTick) {
            for (var sprite of getTile(x, y)) {
              if ([rawIronItem, rawCopperItem, coalItem, copperIngotItem, ironIngotItem].includes(sprite.type)) sprite.remove();
            }
          } else {
            var item = Object.keys(i.inventory)[0];
            var itemType = itemLookup[item];
            addSprite(x, y, itemType);
          }
        }

      }
    }
  }

  minesCount = (minesCount + 1) % (minesTime / updateTime);
  smeltCount = (smeltCount + 1) % (smeltTime / updateTime);
  conveyerCount = (conveyerCount + 1) % (conveyerTime / updateTime);
}, updateTime);

afterInput(() => {
  if (titleScreen) {
    removeTitle();
  }
  if (pricingDisplayed === true) {
    removePricing();
  } else if (pricingDisplayed === 1) {
    pricingDisplayed = true;
  }
})
