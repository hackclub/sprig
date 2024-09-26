/*
@title: Don't Touch the Cat
@author: Adeline Greene
@tags: []
@addedOn: 2024-09-16
*/

/*
@instructions: use WASD to move
@              use K to capture a colored tile and gain points
@              the game ends if you touch the cat or if the cat touches you
@              the cat's speed will increase as the game progresses
*/

const player = "p"
const white = "w"
const red = "r"
const yellow = "y"
const green = "g"
const blue = "b"
const white_cat = "W"
const red_cat = "R"
const yellow_cat = "Y"
const green_cat = "G"
const blue_cat = "B"
const black = "k"

setLegend(
  [ player, bitmap`
..222222222222..
.22..........22.
22............22
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
22............22
.22..........22.
..222222222222..` ],
  [ white, bitmap`
0000000000000000
000LLLLLLLLLL000
00LLLLLLLL22LL00
0LLLLLLLLLLL2LL0
0LLLLLLLLLLLL2L0
0LLLLLLLLLLLL2L0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0L1LLLLLLLLLLLL0
0LL1LLLLLLLLLLL0
0LLL1LLLLLLLLLL0
00LLL111LLLLLL00
000LLLLLLLLLL000
0000000000000000` ],
  [ red, bitmap`
0000000000000000
0003333333333000
0033333333223300
0333333333332330
0333333333333230
0333333333333230
0333333333333330
0333333333333330
0333333333333330
0383333333333330
0383333333333330
0338333333333330
0333833333333330
0033388833333300
0003333333333000
0000000000000000` ],
  [ yellow, bitmap`
0000000000000000
000FFFFFFFFFF000
00FFFFFFFF22FF00
0FFFFFFFFFFF2FF0
0FFFFFFFFFFFF2F0
0FFFFFFFFFFFF2F0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0F6FFFFFFFFFFFF0
0F6FFFFFFFFFFFF0
0FF6FFFFFFFFFFF0
0FFF6FFFFFFFFFF0
00FFF666FFFFFF00
000FFFFFFFFFF000
0000000000000000` ],
  [ green, bitmap`
0000000000000000
000DDDDDDDDDD000
00DDDDDDDD22DD00
0DDDDDDDDDDD2DD0
0DDDDDDDDDDDD2D0
0DDDDDDDDDDDD2D0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0D4DDDDDDDDDDDD0
0D4DDDDDDDDDDDD0
0DD4DDDDDDDDDDD0
0DDD4DDDDDDDDDD0
00DDD444DDDDDD00
000DDDDDDDDDD000
0000000000000000` ],
  [ blue, bitmap`
0000000000000000
0005555555555000
0055555555225500
0555555555552550
0555555555555250
0555555555555250
0555555555555550
0555555555555550
0555555555555550
0575555555555550
0575555555555550
0557555555555550
0555755555555550
0055577755555500
0005555555555000
0000000000000000` ],
  [ white_cat, bitmap`
0000000000000000
000LLLLLLLLLL000
00LLLLLLLL22LL00
0LLLLLLLLLLL2LL0
0LLL00LLL00LL2L0
0LLL0L000L0LL2L0
0LLL0LLLLL0LLLL0
0LL00L0L0L00LLL0
0LLL0L0L0L0LL000
0L100LLLLL000LL0
0L1LL0LLL0LL0L00
0LL1L0LLLL00L0L0
0LLL10LLLLL0L0L0
00LLL111LLL00L00
000LL0L0LLL00000
0000000000000000` ],
  [ red_cat, bitmap`
0000000000000000
0003333333333000
0033333333223300
0333333333332330
0333003330033230
0333030003033230
0333033333033330
0330030303003330
0333030303033000
0380033333000330
0383303330330300
0338303333003030
0333803333303030
00333L8L33300300
0003303033300000
0000000000000000` ],
  [ yellow_cat, bitmap`
0000000000000000
000FFFFFFFFFF000
00FFFFFFFF22FF00
0FFFFFFFFFFF2FF0
0FFF00FFF00FF2F0
0FFF0F000F0FF2F0
0FFF0FFFFF0FFFF0
0FF00F0F0F00FFF0
0FFF0F0F0F0FF000
0F600FFFFF000FF0
0F6FF0FFF0FF0F00
0FF6F0FFFF00F0F0
0FFF60FFFFF0F0F0
00FFFL6LFFF00F00
000FF0F0FFF00000
0000000000000000` ],
  [ green_cat, bitmap`
0000000000000000
000DDDDDDDDDD000
00DDDDDDDD22DD00
0DDDDDDDDDDD2DD0
0DDD00DDD00DD2D0
0DDD0D000D0DD2D0
0DDD0DDDDD0DDDD0
0DD00D0D0D00DDD0
0DDD0D0D0D0DD000
0D400DDDDD000DD0
0D4DD0DDD0DD0D00
0DD4D0DDDD00D0D0
0DDD40DDDDD0D0D0
00DDDL4LDDD00D00
000DD0D0DDD00000
0000000000000000` ],
  [ blue_cat, bitmap`
0000000000000000
0005555555555000
0055555555225500
0555555555552550
0555005550055250
0555050005055250
0555055555055550
0550050505005550
0555050505055000
0570055555000550
0575505550550500
0557505555005050
0555705555505050
00555L7L55500500
0005505055500000
0000000000000000` ],
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
0000000000000000` ],
)

setSolids([])

let level = 0;
let score = 0;
let high_score = 0;
let onStart = true;
let lose = false;
let lose_seen = false;
let spawn_count = 3;
let speed = 100;
let speeds = [75, 60, 50, 42, 35, 25, 20, 18, 18, 15, 12, 12, 10, 8, 8, 8, 5, 5, 5, 5, 5, 5, 5, 3, 2, 1];
let speed_index = 0;
let time_elapsed_rotation = 1;
let time_elapsed = 1;
let cat_place = 0;
let cat_x = 5;
let cat_y = 3;
const colors = [white, red, yellow, green, blue];
const cats = [white_cat, red_cat, yellow_cat, green_cat, blue_cat];
const freq = [blue, green, green, yellow, yellow, yellow, red, red, red, red, red, red];
const freq_cat = [blue_cat, green_cat, green_cat, yellow_cat, yellow_cat, yellow_cat, red_cat, red_cat, red_cat, red_cat, red_cat, red_cat];
const despawn_rate = 10;
let grid = [ [ -1, -1, -1, -1 ],
             [ -1, -1, -1, -1 ],
             [ -1, -1, -1, -1 ],
             [ -1, -1, -1, -1 ] ];
let grid_color = [ [ 0, 0, 0, 0 ],
                   [ 0, 0, 0, 0 ],
                   [ 0, 0, 0, 0 ],
                   [ 0, 0, 0, 0 ] ];

const levels = [
  map`
kkkkkk
kkkkkk
kRygbk
kkkkkk`,
  map`
pkwwww
kkwwww
kkwwww
kkwwwW`,
  map`
kkkkk
kkkkk
kkWkk
kkkkk`,
]

setMap(levels[level])

setPushables({
})

onInput("w", () => {
  if (!onStart && !lose) {
    getFirst(player).y -= 1
  }
})
onInput("s", () => {
  if (!onStart && !lose) {
    getFirst(player).y += 1
  }
})
onInput("a", () => {
  if (!onStart && !lose && getFirst(player).x != 2) {
    getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (!onStart && !lose) {
    getFirst(player).x += 1
  }
})

onInput("k", () => {
  if (!onStart && !lose) {
    for (let i = 0; i < cats.length; i++) {
      if (tilesWith(player, cats[i]).length > 0) {
        lose = true;
        break;
      }
    }
    if (tilesWith(player, red).length > 0) {
      score += 1;
    } else if (tilesWith(player, yellow).length > 0) {
      score += 2;
    } else if (tilesWith(player, green).length > 0) {
      score += 5;
    } else if (tilesWith(player, blue).length > 0) {
      score += 10;
    }
    
    let player_x = getFirst(player).x;
    let player_y = getFirst(player).y;
    clearTile(player_x, player_y);
    addSprite(player_x, player_y, white);
    addSprite(player_x, player_y, player);
    grid[player_x-2][player_y] = -1;
    
    clearText()
    addText("Score:", {
      x: 1,
      y: 7,
        color: color`2`
    })
    addText("" + score, {
      x: 1,
      y: 8,
      color: color`2`
    })
  }
})

onInput("l", () => {
  if (lose) {
    looseSeen = true;
  }
})

afterInput(() => {
  if (onStart) {
    onStart = false
    setMap(levels[1])
    clearTile(0, 0)
    addSprite(0, 0, black)
    addSprite(2, 0, player)
    clearText()
    addText("Score:", {
      x: 1,
      y: 7,
        color: color`2`
    })
    addText("" + score, {
      x: 1,
      y: 8,
      color: color`2`
    })
  } else if (lose && looseSeen) {
    lose = false
    onStart = true
    setMap(levels[0])
    clearText()
    cat_place = 0
    time_elapsed_rotation = 1
    time_elapsed = 1
    looseSeen = false
    cat_x = 5
    cat_y = 3
    speed = 100
    speed_index = 0
    score = 0
  }
})

function spawnColors() {
  let rand_x = Math.floor(Math.random() * 4) + 2;
  let rand_y = Math.floor(Math.random() * 4);
  let player_x = getFirst(player).x;
  let player_y = getFirst(player).y;
  let rand_sprite = Math.floor(Math.random() * freq.length);
  clearTile(rand_x, rand_y)
  if (rand_x != cat_x || rand_y != cat_y) {
    addSprite(rand_x, rand_y, freq[rand_sprite]);
  } else {
    addSprite(rand_x, rand_y, freq_cat[rand_sprite]);
  }
  
  if (rand_sprite > 5) {
    grid[rand_x-2][rand_y] = despawn_rate * 7;
    grid_color[rand_x-2][rand_y] = 1;
  } else if (rand_sprite > 2) {
    grid[rand_x-2][rand_y] = despawn_rate * 4;
    grid_color[rand_x-2][rand_y] = 2;
  } else if (rand_sprite > 0) {
    grid[rand_x-2][rand_y] = despawn_rate * 2;
    grid_color[rand_x-2][rand_y] = 3;
  } else {
    grid[rand_x-2][rand_y] = despawn_rate * 1;
    grid_color[rand_x-2][rand_y] = 4;
  } 
  
  if ((rand_x == player_x) && (rand_y == player_y)) {
    addSprite(player_x, player_y, player);
  }
}

function despawnColors() {
  let player_x = getFirst(player).x;
  let player_y = getFirst(player).y;
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        clearTile(i+2, j);
        
        if (i+2 == cat_x && j == cat_y) {
          addSprite(i+2, j, white_cat);
        } else {
          addSprite(i+2, j, white);
        }
        
        if ((i+2 == player_x) && (j == player_y)) {
          addSprite(player_x, player_y, player);
        }
      }
      if (grid[i][j] >= 0) {
        grid[i][j] -= 1;
      }
    }
  }
}

function moveCat() {
  let player_x = getFirst(player).x;
  let player_y = getFirst(player).y;
  clearTile(cat_x, cat_y)
  addSprite(cat_x, cat_y, colors[grid_color[cat_x-2][cat_y]])
  if (cat_x > player_x) {
    cat_x -= 1;
  } else if (cat_x < player_x) {
    cat_x += 1;
  } else if (cat_y > player_y) {
    cat_y -= 1;
  } else if (cat_y < player_y) {
    cat_y += 1;
  }
  clearTile(cat_x, cat_y)
  addSprite(cat_x, cat_y, cats[grid_color[cat_x-2][cat_y]])
  if ((cat_x == player_x) && (cat_y == player_y)) {
    addSprite(player_x, player_y, player);
    lose = true;
  }
}

function rotateCat() {
  clearTile(cat_place+1, 2)
  addSprite(cat_place+1, 2, colors[cat_place+1])
  if (cat_place == 3) {
    cat_place = -1;
  }
  cat_place += 1;
  clearTile(cat_place+1, 2)
  addSprite(cat_place+1, 2, cats[cat_place+1])
}

let gameLoop = setInterval(() => {
  if (!onStart && !lose) {
    if (spawn_count == 5) {
      spawnColors()
      spawn_count = -1;
    }
    if (speed > 1 && time_elapsed % 10 == 0) {
      speed_index += 1;
      speed = speeds[speed_index];
    }
    if (time_elapsed % speed == 0) {
      moveCat()
    }
    let player_x = getFirst(player).x;
    let player_y = getFirst(player).y;
    if ((cat_x == player_x) && (cat_y == player_y)) {
      lose = true;
    }
    despawnColors()
    spawn_count += 1;
    time_elapsed += 1;
  } else if (lose) {
    clearText()
    setMap(levels[2])
    if (score >= high_score) {
      high_score = score;
      addText("NEW High Score!", {
        x: 3,
        y: 5,
        color: color`4`
      })
    }
    addText("Uh, oh...", {
      x: 6,
      y: 1,
      color: color`2`
    })
    addText("You touched the cat!", {
      x: 0,
      y: 2,
      color: color`2`
    })
    addText("Score: " + score, {
      x: 5,
      y: 6,
      color: color`2`
    })
    
    addText("Press L to restart", {
      x: 1,
      y: 13,
      color: color`3`
    })
  } else if (onStart) {
    if (time_elapsed_rotation % 8 == 0) {
      rotateCat()
    }
    addText("Don't Touch the Cat!", {
      x: 0,
      y: 1,
      color: color`2`
    })
    addText("High Score: ", {
      x: 4,
      y: 4,
      color: color`2`
    })
    addText("" + high_score, {
      x: 4,
      y: 5,
      color: color`2`
    })
    addText("Pts:", {
      x: 0,
      y: 10,
      color: color`2`
    })
    addText("1", {
      x: 4,
      y: 10,
      color: color`2`
    })
    addText("2", {
      x: 8,
      y: 10,
      color: color`2`
    })
    addText("5", {
      x: 11,
      y: 10,
      color: color`2`
    })
    addText("10", {
      x: 14,
      y: 10,
      color: color`2`
    })
    addText("Press an input", {
      x: 3,
      y: 12,
      color: color`3`
    })
    addText("to start", {
      x: 6,
      y: 13,
      color: color`3`
    })
    time_elapsed_rotation += 1;
  }
}, 100);
