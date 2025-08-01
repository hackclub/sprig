/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Mining Game
@author: Uiop3385
@tags: ['endless', 'simulation']
@addedOn: 2025-05-18
@description: A game about mining. Mine blocks, earn gold, purchase upgrades, repeat. t = Dirt, r = Rock, o = Ore, g = Gold, d = Diamond and w = Rainbowite. Once your coin counter maxes out, you will earn 1 blue gold. Unlike normal gold, blue gold keeps going up after the counter hits 99999. You can check your balance in the shop. Blue gold can be used to purchase upgrades costing normal gold, you will receive the difference in normal gold back.
*/

const player = "p"

const dirt = "t"
const rock = "r"
const ore = "o"
const gold = "g"
const diamond = "d"
const rainbowite = "w"

const ui_coin_yellow = "c"
const ui_coin_blue = "b"
const ui_1 = "1"
const ui_2 = "2"
const ui_3 = "3"
const ui_4 = "4"
const ui_5 = "5"
const ui_6 = "6"
const ui_7 = "7"
const ui_8 = "8"
const ui_9 = "9"
const ui_0 = "0"
const ui_shop = "s"
const ui_mine = "m"
const ui_separator = "-"
const ui_upgrade = "^"
const ui_upgrade_max = "x"
const ui_selection_box = ">"
const ui_back = "<"
const ui_upgrade_info = "?"

setLegend(
  [ player, bitmap`
................
................
....000.........
...0...0........
...0...0........
...0...0........
....000.........
.....0...996L...
....000..9.61L1.
...0.0.009.6L1L1
...0.0...9.61L1.
.....0...996L...
....000.........
...0...0........
...0...0........
...0...0........` ],
  [ dirt, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [ rock, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ ore, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111LLL111LLLL0
0LL11LLLLL111LL0
0LLLLLLLLLLLLLL0
0LLLLLL11LLLLLL0
0L11LL11LLL111L0
0LL1LLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LL1111LL111LLL0
0LLL1LLLLL111LL0
0LLLLLLLLLL1LLL0
0L11LLLLL1LLLLL0
0LL1111LL1LL11L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ gold, bitmap `
0000000000000000
0LLLLLLLLLLLLLL0
0L666LLL666LLLL0
0LL66LLLLL666LL0
0LLLLLLLLLLLLLL0
0LLLLLL66LLLLLL0
0L66LL66LLL666L0
0LL6LLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LL6666LL666LLL0
0LLL6LLLLL666LL0
0LLLLLLLLLL6LLL0
0L66LLLLL6LLLLL0
0LL6666LL6LL66L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ diamond, bitmap `
0000000000000000
0LLLLLLLLLLLLLL0
0L777LLL777LLLL0
0LL77LLLLL777LL0
0LLLLLLLLLLLLLL0
0LLLLLL77LLLLLL0
0L77LL77LLL777L0
0LL7LLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LL7777LL777LLL0
0LLL7LLLLL777LL0
0LLLLLLLLLL7LLL0
0L77LLLLL7LLLLL0
0LL7777LL7LL77L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ rainbowite, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L396LLL45HLLLL0
0LL39LLLLL645LL0
0LLLLLLLLLLLLLL0
0LLLLLLH3LLLLLL0
0L96LL45LLLH39L0
0LL6LLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LL645HLL396LLL0
0LLL4LLLLL5H3LL0
0LLLLLLLLLL9LLL0
0L64LLLLL5LLLLL0
0LLH396LL4LL5HL0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ ui_coin_yellow, bitmap `
................
.....666666.....
....66666666....
....66FFFF66....
...66FFFFFF66...
...66FF666F66...
...66F6FFFF66...
...66F6FFFF66...
...66F6FFFF66...
...66F6FFFF66...
...66FF666F66...
...66FFFFFF66...
....66FFFF66....
....66666666....
.....666666.....
................` ],
  [ ui_coin_blue, bitmap`
................
.....777777.....
....77777777....
....77555577....
...7755555577...
...7755777577...
...7757555577...
...7757555577...
...7757555577...
...7757555577...
...7755777577...
...7755555577...
....77555577....
....77777777....
.....777777.....
................` ],
  [ ui_1, bitmap `
................
................
........00......
.......000......
......0000......
.....00000......
....000.00......
....00..00......
........00......
........00......
........00......
........00......
....00000000....
....00000000....
................
................` ],
  [ ui_2, bitmap`
................
................
......00000.....
.....0000000....
....000..000....
....00....00....
.........000....
........000.....
.......000......
......000.......
.....000........
....000.........
....00000000....
....00000000....
................
................` ],
  [ ui_3, bitmap`
................
................
......00000.....
.....0000000....
....000..000....
....00....00....
.........000....
........000.....
........000.....
.........000....
....00....00....
....000..000....
.....0000000....
......00000.....
................
................` ],
  [ ui_4, bitmap`
................
................
........000.....
.......0000.....
......00000.....
.....000.00.....
....000..00.....
....00...00.....
....00000000....
....00000000....
.........00.....
.........00.....
.........00.....
.........00.....
................
................` ],
  [ ui_5, bitmap`
................
................
....00000000....
....00000000....
....00..........
....000.........
....0000000.....
.....0000000....
.........000....
..........00....
....00....00....
....000..000....
.....0000000....
......00000.....
................
................` ],
  [ ui_6, bitmap`
................
................
......00000.....
.....0000000....
....000...00....
....00..........
....00..........
....000000......
....0000000.....
....000..000....
....00....00....
....000..000....
....0000000.....
.....00000......
................
................` ],
  [ ui_7, bitmap`
................
................
....0000000.....
....00000000....
..........00....
.........000....
........000.....
.......000......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................
................` ],
  [ ui_8, bitmap`
................
................
......0000......
.....000000.....
....000..000....
....00....00....
....000..000....
.....000000.....
.....000000.....
....000..000....
....00....00....
....000..000....
.....000000.....
......0000......
................
................` ],
  [ ui_9, bitmap`
................
................
......00000.....
.....0000000....
....000..000....
....00....00....
....000..000....
.....0000000....
......000000....
..........00....
..........00....
....00...000....
....0000000.....
.....00000......
................
................` ],
  [ ui_0, bitmap`
................
................
.....000000.....
....00000000....
....000..000....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....000..000....
....00000000....
.....000000.....
................
................` ],
  [ ui_shop, bitmap`
LLLLLLLLLLLLLLLL
0000000000000000
0..............0
0..............0
0...0...323232.0
0.......323232.0
0...0...323232.0
0...0...CCCCCC.0
0...0...C....C.0
0...0...C....C.0
0...0...CCCCCC.0
0...0...CCCCCC.0
0..............0
0..............0
0000000000000000
LLLLLLLLLLLLLLLL` ],
  [ ui_mine, bitmap`
LLLLLLLLLLLLLLLL
0000000000000000
0..............0
0..........0...0
0.0.........0..0
0.0.....000000.0
0.0.........0..0
0.0........0...0
0.0......L.....0
0.0......1L1...0
0.0......L1L1..0
0.00000..1L1...0
0........L.....0
0..............0
0000000000000000
LLLLLLLLLLLLLLLL` ],
  [ ui_separator, bitmap`
LLLLLLLLLLLLLLLL
0000000000000000
................
................
................
................
................
................
................
................
................
................
................
................
0000000000000000
LLLLLLLLLLLLLLLL` ],
  [ ui_upgrade, bitmap`
................
.00000000000000.
.0............0.
.0....6666....0.
.0...664D66...0.
.0..6644DD66..0.
.0..6444DDD6..0.
.0..6664D666..0.
.0....64D6....0.
.0....64D6....0.
.0....64D6....0.
.0....64D6....0.
.0....6666....0.
.0............0.
.00000000000000.
................` ],
  [ ui_upgrade_max, bitmap`
................
.00000000000000.
.0............0.
.0.3..1111..3.0.
.0..311L0113..0.
.0..13LL0031..0.
.0..1L3L0301..0.
.0..111L3111..0.
.0....1301....0.
.0....3L03....0.
.0...31L013...0.
.0..3.1L01.3..0.
.0.3..1111..3.0.
.0............0.
.00000000000000.
................` ],
  [ ui_selection_box, bitmap`
.77777777777777.
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
.77777777777777.` ],
  [ ui_back, bitmap`
LLLLLLLLLLLLLLLL
0000000000000000
0..............0
0..............0
0....3.....0...0
0...3..........0
0..33333...0...0
0...3...3..0...0
0....3..3..0...0
0.......3..0...0
0..33333...0...0
0..........0...0
0..............0
0..............0
0000000000000000
LLLLLLLLLLLLLLLL` ],
  [ ui_upgrade_info, bitmap`
LLLLLLLLLLLLLLLL
0000000000000000
0..............0
0.0..0..6666...0
0.0..0.664D66..0
0.0.0.6644DD66.0
0.0.0.6444DDD6.0
0.00..6664D666.0
0.00....64D6...0
0.0.0...64D6...0
0.0.0...64D6...0
0.0..0..64D6...0
0.0..0..6666...0
0..............0
0000000000000000
LLLLLLLLLLLLLLLL` ]
)

const mining_bg_song = tune`
300: F5-300 + B4^300 + D5~300 + E5/300,
300,
300: D5~300 + G5-300 + A4^300,
300,
300: C5~300 + A5-300 + B4^300 + D5/300,
300,
300: C5~300 + G5-300 + A4^300,
300: E5/300,
300: D5~300 + A5-300 + B4^300,
300,
300: D5~300 + F5-300 + A4^300 + E5/300,
300,
300: C5~300 + G5-300 + B4^300,
300,
300: C5~300 + A5-300 + A4^300 + E5/300,
300,
300: D5~300 + F5-300 + B4^300 + E5/300,
300,
300: D5~300 + G5-300 + A4^300,
300,
300: C5~300 + A5-300 + B4^300 + D5/300,
300,
300: C5~300 + G5-300 + A4^300,
300: E5/300,
300: D5~300 + A5-300 + B4^300,
300,
300: D5~300 + F5-300 + A4^300 + E5/300,
300,
300: C5~300 + G5-300 + B4^300,
300,
300: C5~300 + A5-300 + A4^300 + E5/300,
300`
const shop_bg_song = tune`
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333 + A4^333.3333333333333 + F5/333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: G5/333.3333333333333,
333.3333333333333: E5~333.3333333333333 + A5-333.3333333333333 + G4^333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G5-333.3333333333333 + A4^333.3333333333333 + F5/333.3333333333333,
333.3333333333333,
333.3333333333333: E5~333.3333333333333 + F5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: G5/333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G5-333.3333333333333 + G4^333.3333333333333,
333.3333333333333,
333.3333333333333: E5~333.3333333333333 + A5-333.3333333333333 + A4^333.3333333333333 + F5/333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: G5/333.3333333333333,
333.3333333333333: E5~333.3333333333333 + G5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5-333.3333333333333 + G4^333.3333333333333 + G5/333.3333333333333,
333.3333333333333,
333.3333333333333: E5~333.3333333333333 + A5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: F5/333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333,
333.3333333333333: E5~333.3333333333333 + F5-333.3333333333333 + G4^333.3333333333333 + G5/333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: F5/333.3333333333333,
333.3333333333333: E5~333.3333333333333 + A5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G5-333.3333333333333 + G4^333.3333333333333 + F5/333.3333333333333,
333.3333333333333`

const drilling_sfx = tune`
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250,
250: E5/250 + A4^250,
250: D5/250 + G4^250`
const sell_sfx = tune`
187.5: A5-187.5,
187.5: B5-187.5,
187.5: G5-187.5,
187.5: F5~187.5,
5250`
const upgrade_sfx = tune`
250: E5~250,
250: F5~250,
250: G5~250 + A4^250,
250: A5-250,
250: G4^250,
6750`
const failed_upgrade_sfx = tune`
250: D4/250 + D5-250,
250: C4/250 + C5-250,
250: C4-250,
500,
250: B5-250,
6500`

let polyphony = 0

let mining_playback = playTune(mining_bg_song, Infinity)
let shop_playback = playTune(shop_bg_song, 0)
let drilling_playback = playTune(drilling_sfx, 0)
let selling_playback = playTune(sell_sfx, 0)
let upgrade_playback = playTune(upgrade_sfx, 0)
let failed_upgrade_playback = playTune(failed_upgrade_sfx, 0)

setSolids([])

let level = 0
const levels = [
  map`
p.....
s----m
c00000
b00000`,
  map`
<-------?
.........
.........
.^..^..^.
.........
.........`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let coin_amount = 0
let blue_coin_amount = 0
const oreValues = {
  t: 1,    // Dirt
  r: 5,    // Rock
  o: 25,   // Ore
  g: 150,  // Gold
  d: 1000, // Diamond
  w: 5000, // Rainbowite
};

const initial_drilling_time = 5
let isDrilling = false;

let income_level = 0
let max_income_level = Infinity
let luck_level = 0
let max_luck_level = 100
let drilling_level = 0
let max_drilling_level = 40
let income_mult
let luck
let drilling_time
updateValues()

const luck_base_price = 25
const luck_offset = 1
const luck_growth = 2.25

const drill_base_price = 35
const drill_offset = 1
const drill_growth = 3

const income_base_price = 50
const income_offset = 1
const income_growth = 2

let luck_price = calculatePrice(luck_base_price, luck_level, luck_offset, luck_growth)
let drill_price = calculatePrice(drill_base_price, drilling_level, drill_offset, drill_growth)
let income_price = calculatePrice(income_base_price, income_level, income_offset, income_growth)

const nop = () => {};

let saved_blocks = [];

let selectionBoxX = 1;

function initMap() {
  addText("Ready!", {x: 4, y: 6, color: color`0`});
  addText("L to drill!", {x: 5, y: 15, color: color`2`});

  if (saved_blocks.length === 0) {
    for (let i=1; i<width(); i++) {
      addSprite(i, 0, getNextBlock(luck));
    }
  } else {
    saved_blocks.forEach(tile => {
      tile.forEach(sprite => {
        addSprite(sprite.x, 0, sprite.type);
      });
    });
    saved_blocks = [];
  }

  updateCoinArea();
}

function getBlocks() {
  let blocks = [];
  for (let i = 1; i < width(); i++) {
    blocks.push(getTile(i, 0));
  }
  return blocks;
}

function startDrilling() {
  if (isDrilling) return;

  isDrilling = true;
  const duration = drilling_time * 1000; // convert to ms
  const startTime = Date.now();

  if (drilling_time > 0) {
    mining_playback.end();
    drilling_playback = playTune(drilling_sfx, Infinity)
  }

  function showCountdown() {
    if (!isDrilling) return;
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, (duration - elapsed) / 1000);

    clearText();
    addText(`Drilling ${remaining.toFixed(1)}s`, { x: 4, y: 6, color: color`0` });

    if (elapsed >= duration) {
      clearText();
      dig();
      isDrilling = false;
    } else {
      setTimeout(showCountdown, 100); // check every 100ms
    }
  }

  showCountdown();
}

function dig() {
  drilling_playback.end();
  selling_playback = playTune(sell_sfx, 1)
  
  const localplayer = getFirst("p");
  const playerX = localplayer.x;
  blocks = getBlocks();
  
  blocks.forEach(tileSprites => {
    tileSprites.forEach(sprite => {
      sprite.x -= 1;
    });
  });

  const firstTile = getTile(playerX, 0);
  
  firstTile.forEach(sprite => {
    if (sprite.type !== "p") {
      const minedValue = oreValues[sprite.type];
      const earnings = minedValue * income_mult;
      coin_amount += earnings;
      clearText();
      addText(`Mined ${sprite.type}, got ${addPrefix(earnings)}G`, {x: 0, y: 0, color: color`2`});
      clearTile(sprite.x, sprite.y);
      addSprite(0, 0, player);
      const newOre = addSprite(playerX + width() - 1, 0, getNextBlock(luck));
    }
  });
  addText("Ready!", {x: 4, y: 6, color: color`0`});
  addText("I for upgrades!", {x: 3, y: 15, color: color`2`});
  updateCoinArea()
  setTimeout(() => {
    drilling_time > 0 && !isDrilling && level === 0 ? mining_playback = playTune(mining_bg_song, Infinity) : nop
  }, 600)
}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

function roundTo(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function addPrefix(number) {
  const suffixes = ["", "K", "M", "B", "T", "q", "Q"];
  if (number < 1000) {
    return String(number);
  }
  const index = Math.floor(String(number).length / 3);
  const newValue = parseFloat(number / Math.pow(1000, index));
  return newValue.toFixed(1).replace(/\.0$/, '') + suffixes[index];
}

function updateCoinArea() {
  updateCoins();
  const coinStr = String(coin_amount).padStart(5, '0');
  const blueCoinStr = String(clamp(blue_coin_amount, 0, 99999)).padStart(5, '0');

  const coinCounterStart = { x: 1, y: 2 };
  const blueCounterStart = { x: 1, y: 3 };

  for (let i = 0; i < 5; i++) {
    const tileX = coinCounterStart.x + i;
    const tileY = coinCounterStart.y;

    clearTile(tileX, tileY);
    addSprite(tileX, tileY, coinStr[i]);
  }

  for (let i = 0; i < 5; i++) {
    const tileX = blueCounterStart.x + i;
    const tileY = blueCounterStart.y;

    clearTile(tileX, tileY);
    addSprite(tileX, tileY, blueCoinStr[i]);
  }
}

function getNextBlock(luckFactor) {
  if (luckFactor >= 100) {
    return "w"
  }
  const rand = Math.random() * 100;

  const baseWeights = {
    t: 40, // Dirt
    r: 30, // Rock
    o: 20, // Ore
    g: 6,  // Gold
    d: 3,  // Diamond
    w: 1,  // Rainbowite
  };

  const adjustedWeights = {
    t: baseWeights.t * Math.max(0, 1 - 0.01 * luckFactor),
    r: baseWeights.r * Math.max(0, 1 - 0.008 * luckFactor),
    o: baseWeights.o * (1 + 0.01 * luckFactor),
    g: baseWeights.g  * (1 + 0.015 * luckFactor),
    d: baseWeights.d  * (1 + 0.02 * luckFactor),
    w: baseWeights.w  * Math.pow(1.07, luckFactor),
  };

  const totalWeight = Object.values(adjustedWeights).reduce((sum, val) => sum + val, 0);
  const probabilities = {};
  for (const block in adjustedWeights) {
    probabilities[block] = (adjustedWeights[block] / totalWeight) * 100;
  }

  let cumulativeProbability = 0;
  for (const block in probabilities) {
    cumulativeProbability += probabilities[block];
    if (rand <= cumulativeProbability) {
      return block;
    }
  }
}


function saveBlocks() {
  saved_blocks = getBlocks();
}

function updateCoins() {
  while (coin_amount >= 100000) {
    blue_coin_amount += 1;
    coin_amount -= 100000;
  }
  coin_amount = clamp(coin_amount, 0, 99999);
}

function shopMethod() {
  mining_playback.end();
  drilling_playback.end();
  shop_playback = playTune(shop_bg_song, Infinity);
  updateShopText();
  updateUpgradeIcons();
  updateSelectionBox();
}

function updateShopText() {
  updateValues()
  clearText()
  
  luck_price = calculatePrice(luck_base_price, luck_level, luck_offset, luck_growth)
  drill_price = calculatePrice(drill_base_price, drilling_level, drill_offset, drill_growth)
  income_price = calculatePrice(income_base_price, income_level, income_offset, income_growth)
  
  addText("The shop!", {x: 6, y: 2, color: color`0`});
  addText("Luck", {x: 1, y: 6, color: color`0`});
  addText("Speed", {x: 7, y: 6, color: color`0`});
  addText("Income", {x: 14, y: 6, color: color`0`});
  
  addText(`${addPrefix(coin_amount)} Gld`, {x: 0, y: 4, color: color`6`});
  addText(`${addPrefix(blue_coin_amount)} BGld`, {x: 10, y: 4, color: color`5`});
  
  addText(`L${luck_level}`, {x: countDigits(luck_level) >= 3 ? 1 : 2, y: 11, color: color`0`});
  addText(`L${drilling_level}`, {x: countDigits(drilling_level) >= 3 ? 8 : 9, y: 11, color: color`0`});
  addText(`L${income_level}`, {x: countDigits(income_level) >= 3 ? 15 : 16, y: 11, color: color`0`});
  
  addText(`+${luck}`, {x: countDigits(luck) >= 3 ? 1 : 2, y: 12, color: color`0`});
  addText(`${drilling_time.toFixed(1)}s`, {x: countDigits(drilling_time) >= 3 ? 8 : 9, y: 12, color: color`0`});
  addText(`${income_mult}x`, {x: countDigits(income_mult) >= 3 ? 15 : 16, y: 12, color: color`0`});
  
  addText(`${addPrefix(luck_price.amount)}${luck_price.currency}`, {x: countDigits(luck_price.amount) >= 3 ? 1 : 2, y: 13, color: luck_price.currency === "G" ? color `6` : color`5`});
  addText(`${addPrefix(drill_price.amount)}${drill_price.currency}`, {x: countDigits(drill_price.amount) >= 3 ? 7 : 9, y: 13, color: drill_price.currency === "G" ? color `6` : color`5`});
  addText(`${addPrefix(income_price.amount)}${income_price.currency}`, {x: countDigits(income_price.amount) >= 3 ? 14 : 16, y: 13, color: income_price.currency === "G" ? color `6` : color`5`});
}

function calculatePrice(basePrice, level, offset = 5, growthPower = 2) {
    let rawPrice = basePrice * Math.pow(level + offset, growthPower);

    if (rawPrice >= 100000) {
        let blueCoinsPrice = Math.floor(rawPrice / 100000);
        return { currency: 'BG', amount: blueCoinsPrice };
    } else {
        let normalCoinsPrice = Math.round(rawPrice / 5) * 5;
        return { currency: 'G', amount: normalCoinsPrice };
    }
}


function calculateLuck(level) {
    return clamp(level, 0, 164);
}

function calculateIncome(level) {
    return 1 + level;
}

function calculateSpeedReduction(level) {
    if (level === 0) return 0;
    let reduction = 0;
    if (level >= 1) reduction += 0.5;
    if (level >= 2) reduction += 0.4;
    if (level >= 3) reduction += 0.3;
    if (level >= 4) reduction += 0.2;
    if (level >= 5) reduction += (level - 4) * 0.1;
    return roundTo(reduction, 2);
}

function updateValues() {
  luck = calculateLuck(luck_level)
  drilling_time = initial_drilling_time - calculateSpeedReduction(drilling_level)
  income_mult = calculateIncome(income_level)
}

function countDigits(num) {
  const str = num.toString().replace(/^-/, '').replace(/e[+-]?\d+/, '');
  return str.length;
}

function updateSelectionBox() {
  addSprite(selectionBoxX, 3, ui_selection_box);
}

function clearSelectionBox() {
  clearTile(selectionBoxX, 3);
  
  let spriteToShow = ui_upgrade;
  if (
    (selectionBoxX === 1 && luck_level >= max_luck_level) ||
    (selectionBoxX === 4 && drilling_level >= max_drilling_level) ||
    (selectionBoxX === 7 && income_level >= max_income_level)
  ) {
    spriteToShow = ui_upgrade_max;
  }

  addSprite(selectionBoxX, 3, spriteToShow);
}

function moveSelectionBoxLeft() {
  clearSelectionBox()
  selectionBoxX -= 3
  if (selectionBoxX < 1) {
    selectionBoxX = width() - 2
  }
  updateSelectionBox();
}

function moveSelectionBoxRight() {
  clearSelectionBox()
  selectionBoxX += 3
  if (selectionBoxX > width() - 1) {
    selectionBoxX = 1
  }
  updateSelectionBox();
}

function tryUpgrade({price, level, maxLevel, onSuccess}) {
  let balance = price.currency === "G" ? coin_amount : blue_coin_amount;
  if (balance >= price.amount && level < maxLevel) {
    if (price.currency === "G") {
      coin_amount -= price.amount;
    } else {
      blue_coin_amount -= price.amount;
    }

    onSuccess();
    upgrade_playback = playTune(upgrade_sfx, 1);
    updateShopText();
    updateUpgradeIcons();
  } else if (price.currency === "G" && blue_coin_amount >= 1) {
    blue_coin_amount--;
    let temp_coin_amount = coin_amount + 100000
    temp_coin_amount -= price.amount
    coin_amount += temp_coin_amount
    clamp(coin_amount, 0, 99999)
    
    onSuccess()
    upgrade_playback = playTune(upgrade_sfx, 1);
    updateShopText();
    updateUpgradeIcons();
  } else {
    failed_upgrade_playback = playTune(failed_upgrade_sfx, 1);
  }
  polyphony++;
}

function selectOption() {
  shop_playback.end();

  switch (selectionBoxX) {
    case 1:
      tryUpgrade({
        price: luck_price,
        level: luck_level,
        maxLevel: max_luck_level,
        onSuccess: () => luck_level++
      });
      break;
    case 4:
      tryUpgrade({
        price: drill_price,
        level: drilling_level,
        maxLevel: max_drilling_level,
        onSuccess: () => drilling_level++
      });
      break;
    case 7:
      tryUpgrade({
        price: income_price,
        level: income_level,
        maxLevel: max_income_level,
        onSuccess: () => income_level++
      });
      break;
  }

  setTimeout(() => {
    if (level === 1 && polyphony <= 1) {
      shop_playback = playTune(shop_bg_song, Infinity);
    }
    polyphony--;
  }, 1600);
}

function updateUpgradeIcons() {
  const upgrades = [
    { x: 1, level: luck_level, max: max_luck_level },
    { x: 4, level: drilling_level, max: max_drilling_level },
    { x: 7, level: income_level, max: max_income_level }
  ];

  for (const {x, level, max} of upgrades) {
    clearTile(x, 3);
    const icon = level >= max ? ui_upgrade_max : ui_upgrade;
    addSprite(x, 3, icon);
    if (x === selectionBoxX) {addSprite(x, 3, ui_selection_box)};
  }
}

initMap();

onInput("l", () => {
  if (isDrilling || level === 1) return;
  startDrilling();
})

onInput("i", () => {
  isDrilling = false;
  clearText();
  level === 0 ? saveBlocks() : nop;
  level = level === 0 ? 1 : 0;
  setMap(levels[level]);
  if (level === 1) {
    shopMethod()
  } else {
    shop_playback.end();
    mining_playback = playTune(mining_bg_song, Infinity)
  }
  level === 0 ? initMap() : nop;
})

onInput("a", () => {
  if (level === 1) {
    moveSelectionBoxLeft()
  }
});

onInput("d", () => {
  if (level === 1) {
    moveSelectionBoxRight()
  }
});

onInput("k", () => {
  if (level === 1) {
    selectOption()
  }
});

afterInput(() => {
})