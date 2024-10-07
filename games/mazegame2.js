/*
@title: Maze
@author: Darshan Choudhary
@tags: []
@addedOn: 2024-00-00
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/hackclub/sprig@1.1.0/dist/sprig.min.js';
document.head.appendChild(script);

const player = "p"
const border = "b"
const coin = "c"
const exit = "e"
const bg = "f"
const grass = "g"
const water = "w"
const white = "h"
const desert = "d"

setLegend(
  [player, bitmap`
................
................
.......000......
.......020......
......0220......
......02220.0...
....0003230.0...
....0.0222000...
....0.05550.....
......02220.....
.....022220.....
.....02220......
......000.......
......0.0.......
.....00.00......
................`],
  [border, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [coin, bitmap`
................
....66666666....
...6666666666...
..666CCCCCC666..
.666CCCCCCCC666.
.66CCCCCCCCCC66.
.66CCC6666CCC66.
.66CCC6CCCCCC66.
.66CCC6CCCCCC66.
.66CCC6666CCC66.
.66CCCCCCCCCC66.
.666CCCCCCCC666.
..666CCCCCC666..
...6666666666...
....66666666....
................`],
  [exit, bitmap`
................
................
................
................
................
................
................
................
................
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [bg, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [grass, bitmap`
DD44DDDDDDDDD4DD
D44D4DD44DDDDD4D
D44DD44DD4DD4D4D
D444DDD444444D4D
D444DD444DDD4D4D
44D4DDDD44D44D44
4DD4DD4D44D4D444
4D4DDD4D44D4D44D
DD4DDD4D4DD4D44D
DD4D4D4D4D44D44D
DD4D4DDD4D44D44D
D4DD4DD44D4444D4
DDDDDD4D4D4D44D4
4DDDDDD4D4DDD444
4DD4444444D444D4
DDDDDDDDD44DDDDD`],
  [water, bitmap`
5555555555555555
5222555777555555
5577555552257775
5555775552255555
5555755775577555
5755755555555555
5555555557555755
5555552257757555
5577555555555222
5552225777755555
5555555555557755
7775575755557755
5755575757775555
5577775555555555
5555777775777755
5555555555555555`],
  [desert, bitmap`
F66F9999999FF6FF
FFF6FFF9FFF996FF
FF996FFFFF9969FF
F999FF66999FCC9F
F99FF9FFFCCC6F99
9FFF9FFC6FFFF99F
9FF9FFF999999F66
99FFC9F9699966FF
FF9C66999F66CFFF
99C9999F66FCF9F6
FCC99FF99FFFFFFF
F99CCFFF6996FFFF
FFFFFF9FFFF999FF
F9FFFFF9CCFF99FF
F9FFF6CCFFFFFF9F
F699999999999999`],
  [white , bitmap`
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

let n_enough_coins = map`
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff
fffffffffffff`
let success_buy = map`
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff
fffffffffffffffff`
let shop_map = map`
fffffffffffffffffff
fffffffffffffffffff
ffffffffffffffcffff
fffffffffffffffffff
fffffffffffffffffff
fggffffffffffffffff
fggffffffffffcfffff
fffffffffffffffffff
fwwffffffffffcfffff
fwwffffffffffffffff
fffffffffffffffffff
fddffffffffffcfffff
fddffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff`
setSolids([player, border])

let level = 0
let current_map = level;
const levels = [
  map`
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff`,
  map`
hhhhhhhhhhhhhh
hhhhhhhhhhhhhh
bbbbbbbbbbbbbb
b......b.....b
b.c....b.bbbbb
b..bbb.b.b...b
b....b.b.b.b.b
bbbb.b.b.b.b.b
.....b.b...b.b
p....b.b.c.b.b
bbbbbb.bbb.b.b
b......b...b.b
b.bbbbbb.bbbcb
b.b......b...b
b.b..c...b.b.b
b.bbbbb..b.b.b
b...c....b.b.b
bbbbbbbbbb.bbb
hhhhhhhhhhhhhh
hhhhhhhhhhhhhh`,
  map`
hhhhhhhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhhhhhhh
bp.bbbbbbbbbbbbbbbbbb
b...cb.....b.......cb
b.bb.b.....b........b
b.b..b.bbb...bbbbb..b
b.b.cb..cb...bcb....b
b.bbbbbb.bbb.b.b.bbbb
b......b...b...b.bc.b
bbbb...b...bbbbb.bb.b
bc...bbb.b...b......b
b..bbb...b..cb......b
b.bb...b.bbbbb..bbbbb
b......b...b....c...b
b..cb..bc..b....b...b
bbbbbbbbbbbbbbbbbb..b
hhhhhhhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhhhhhhh`,
  map`
hhhhhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhhhhh
bpbbbbbbbbbbbbbbbbb
b.b...c.b...cb...cb
b.b.bbb.bbbb.b.bb.b
b.c.bc..b....b.b..b
b.bbb.bbbb.bbb.bcbb
b.b...b...c....b..b
bbb.bbb.bbbbbbbbb.b
bc..b.bcb...c.....b
b.bbb.b.bb.b.b.bb.b
b.b.....b..b.bbbbbb
b.b.bbbbb..b.....cb
b.b.bcb....bbbbbb.b
b.bcb.bbbb.b..b...b
b...b...c..b.c...cb
bbbbbbbbbbbbbbbbb.b
hhhhhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhhhhh`,
  map`
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffcfff
fffffffffffffff
fffffffffffffff
fffffffffffffff`
]

setMap(levels[level])
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  if (current_map == "shop") {
    level = 0;
    console.log(level);
    clearText();
    setMap(levels[level]);
    new_game();
  } else {
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("k", () => {
  if (level == 0) {
    clearText()
    next_level()
  } else {
    handlePurchase(16, "Water");
  }
});
onInput("l", () => { handlePurchase(25, "Desert") });

/*code to reset the current level*/

onInput("j", () => {
  if (current_map == "shop") {
    handlePurchase(10, "Grass")
  } else {
    current_map = level;
    setMap(levels[level]);
  }

})





function new_game() {
  if (level == 0) {
    addText("Maze Game", {
      x: 6,
      y: 2,
      size: 1,
      color: color`6`
    })
    addText("Goal is to come out\n of maze and also \nearn COINS in this\n      journey", {
      x: 1,
      y: 5,
      size: 0.5,
      color: color`2`
    })
    addText("\nPress 'k' to start", {
      x: 1,
      y: 10,
      size: 0.5,
      color: color`4`
    })
    addText("-Darshan", {
      x: 12,
      y: 15,
      size: 0.5,
      color: color`2`
    })

  }
}
new_game();

let buy = 1

function success(background) {
  clearText();
  current_map = "success_buy";
  setMap(success_buy);
  addText("SUCCESSFULLY bought\n       background", {
    x: 1,
    y: 4,
    size: 1,
    color: color`2`
  })
  addText("Current background=\n", {
    x: 0,
    y: 8,
    size: 1,
    color: color`2`
  })

  if (background == "Grass") {
    setBackground(grass);
    addText(background, {
      x: 2,
      y: 5,
      size: 1,
      color: color`D`
    })
    addText(background, {
      x: 6,
      y: 9,
      size: 1,
      color: color`D`
    })
  } else if (background == "Water") {
    setBackground(water);
    addText(background, {
      x: 2,
      y: 5,
      size: 1,
      color: color`7`
    })
    addText(background, {
      x: 6,
      y: 9,
      size: 1,
      color: color`7`
    })
  } else if (background == "Desert") {
    setBackground(desert);
    addText(background, {
      x: 2,
      y: 5,
      size: 1,
      color: color`9`
    })
    addText(background, {
      x: 6,
      y: 9,
      size: 1,
      color: color`9`
    })
  }
}

function shop() {
  // onInput("i", () => {
  current_map = "shop";
  clearText();
  setMap(shop_map);
  addText("SHOP    " + totalCoins, {
    x: 8,
    y: 2,
    size: 1,
    color: color`6`
  });
  addText("Backgrounds   Price", {
    x: 0,
    y: 4,
    size: 1,
    color: color`2`
  });
  addText("Grass", {
    x: 4,
    y: 6,
    size: 1,
    color: color`2`
  });
  addText("10(j)", {
    x: 15,
    y: 6,
    size: 1,
    color: color`2`
  });
  addText("Water", {
    x: 4,
    y: 9,
    size: 1,
    color: color`2`
  });
  addText("16(k)", {
    x: 15,
    y: 9,
    size: 1,
    color: color`2`
  });
  addText("Desert", {
    x: 4,
    y: 12,
    size: 1,
    color: color`2`
  });
  addText("25(l)", {
    x: 15,
    y: 12,
    size: 1,
    color: color`2`
  });
  addText("press 'w' to play", {
    x: 1,
    y: 15,
    size: 1,
    color: color`6`
  });
}

function handlePurchase(price, background) {
  // return () => {
  //   if (totalCoins >= price) {
  //     buy += 1;
  //     totalCoins = totalCoins - price;
  //     console.log("here:", totalCoins);
  //     success();
  //     setTimeout(shop, 2000)
  //     // shop();
  //   } else if(totalCoins<price) {
  //     // if (buy > 1) {
  //      //  if (totalCoins >= price) {
  //      //    totalCoins = totalCoins - price;
  //      //    console.log("not here:", totalCoins);
  //      //    success();
  //      //    setTimeout(shop, 2000)
  //      //  }
  //      // else {
  //       clearText();
  //       setMap(n_enough_coins);
  //       console.log("else", totalCoins);
  //       addText("not enough Coins", {
  //         x: 2,
  //         y: 7,
  //         size: 1,
  //         color: color`2`
  //       });
  //       // addText("press 'i' to\n  go back", {
  //       //   x: 4,
  //       //   y: 9,
  //       //   size: 1,
  //       //   color: color`6`
  //       // });
  //       setTimeout(shop, 2000)
  //       // shop();
  //     // }
  //   }
  // };
  if (totalCoins >= price) {
    success(background);
    totalCoins -= price;
    setTimeout(shop, 2000)
  } else {
    clearText();
    current_map = n_enough_coins;
    setMap(n_enough_coins);
    console.log("else", totalCoins);
    addText("not enough Coins", {
      x: 2,
      y: 7,
      size: 1,
      color: color`2`
    });
    setTimeout(shop, 2000)
  }

}



//funct to set new level
function next_level() {
  if (level != 0) {
    playback.end()
    playTune(win, 1)
    playTune(bgm, Infinity)
  }
  clearText()
  totalCoins += coins_earned
  coins_earned = 0
  level += 1
  current_map = level;
  setMap(levels[level])
  if (level == 1) {
    addText("LEVEL=" + level, {
      x: 8,
      y: 15,
      size: 0.5,
      color: color`0`
    })
  } else if (level == 2) {
    addText("LEVEL=" + level, {
      x: 10,
      y: 15,
      size: 0.5,
      color: color`0`
    })
  } else if (level == 3) {
    addText("LEVEL=" + level, {
      x: 10,
      y: 15,
      size: 0.5,
      color: color`0`
    })
  } else if (level == 4) {
    addText("Congratulations!! \n\nYou  successfully \ncame out of maze.", {
      x: 1,
      y: 5,
      size: 1,
      color: color`2`
    })
    addText("Total Coins =   " + totalCoins, {
      x: 1,
      y: 11,
      size: 1,
      color: color`6`
    })
    addText(" press 'i' to\n  open shop", {
      x: 3,
      y: 13,
      size: 1,
      color: color`4`
    })
    onInput("i", () => {
      shop()
    })
  }
}

//music for different events
const bgm = tune`
82.41758241758242: D5-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242 + D5-82.41758241758242,
82.41758241758242: undefined/82.41758241758242 + C5-82.41758241758242,
82.41758241758242,
82.41758241758242: C5-82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: B4-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: G4-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: A4-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242 + A4-82.41758241758242,
164.83516483516485,
82.41758241758242: undefined/82.41758241758242 + B4-82.41758241758242,
82.41758241758242: C5-82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242,
82.41758241758242: D5-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: D4-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: D4-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: D4-82.41758241758242 + undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: undefined/82.41758241758242,
82.41758241758242: G4-82.41758241758242,
82.41758241758242: G4-82.41758241758242`;

const win = tune`
208.33333333333334: C4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: D4-208.33333333333334,
208.33333333333334: E4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: F4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: G4-208.33333333333334,
208.33333333333334: A4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: G4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: C5-208.33333333333334,
208.33333333333334: B4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: C5-208.33333333333334 + undefined/208.33333333333334,
4583.333333333334`;

const coin_music = tune`
164.83516483516485: E5-164.83516483516485,
164.83516483516485: A5-164.83516483516485,
4945.054945054945`;

const playback = playTune(bgm, Infinity)


let totalCoins = 0
let coins_earned = 0

afterInput(() => {

  if (level == 1) {
    addText("Coins : " + coins_earned, {
      x: 6,
      y: 0,
      size: 0.1,
      color: color`0`
    })
  } else if (level == 2) {
    addText("Coins : " + coins_earned, {
      x: 8,
      y: 0,
      size: 0.1,
      color: color`0`
    })
  } else if (level == 3) {
    addText("Coins : " + coins_earned, {
      x: 8,
      y: 0,
      size: 0.1,
      color: color`0`
    })
  }


  let playerSprite = getFirst(player);
  if (playerSprite) {
    let player_tile_x = playerSprite.x;
    let player_tile_y = playerSprite.y;
    console.log(player_tile_x, player_tile_y);

    let items = getTile(player_tile_x, player_tile_y);
    console.log(items);
    if (items.length > 1) {
      if (items[1].type == coin) {
        playTune(coin_music, 1);
        items[1].remove();
        coins_earned += 1;
      }
    }
    //checking if the player reached end - level 1
    if (level == 1) {
      if (player_tile_x == 10 && player_tile_y == 17) {
        let winning_msg = addText("You Won!!!", {
          x: 5,
          y: 7,
          size: 5,
          color: color`0`
        })
        setTimeout(next_level, 2000)

      }
    } else if (level == 2) {
      if ([player_tile_x, player_tile_y].toString() == [18, 15].toString() || [player_tile_x, player_tile_y].toString() == [19, 15].toString()) {
        let winning_msg = addText("You Won!!", {
          x: 6,
          y: 7,
          size: 5,
          color: color`0`
        })
        setTimeout(next_level, 2000)
      }
    } else if (level == 3) {
      if (player_tile_x == 17 && player_tile_y == 16) {
        let winning_msg = addText("You Won!!!", {
          x: 5,
          y: 7,
          size: 5,
          color: color`0`
        })
        setTimeout(next_level, 2000)
        current_map = "shop";
      }
    }
  }
})
