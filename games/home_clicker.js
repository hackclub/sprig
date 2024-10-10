/*
@title: cookie_clicker
@tags: ['endless']
@addedOn: 2024-09-18
@author: kunevi
  _    _  ______          __  _______ ____    _____  _           __     __
 | |  | |/ __ \ \        / / |__   __/ __ \  |  __ \| |        /\\ \   / /
 | |__| | |  | \ \  /\  / /     | | | |  | | | |__) | |       /  \\ \_/ / 
 |  __  | |  | |\ \/  \/ /      | | | |  | | |  ___/| |      / /\ \\   /  
 | |  | | |__| | \  /\  /       | | | |__| | | |    | |____ / ____ \| |   
 |_|  |_|\____/   \/  \/        |_|  \____/  |_|    |______/_/    \_\_|   

   CONTROLS: 
   i - PURCHASE CLICKS / COOKIES PER SECOND UPGRADE 
   k - PURCHASE CLICKS / COOKIES PER CLICK UPGRADE
   j - CLICK THE COOKIE


    PRICE FOR EACH UPGRADE IS CALCULATED USING THE FOLLOWING FORMULA:
    PRICE = 1.15^(F-M) 
    WHERE F IS THE AMOUNT OF UPGRADES OF THAT TYPE THAT THE USER HAS
    AND M IS THE AMOUNT OF UPGRADES YOU GET ON START 
    (KEEP IN MIND FLOATING POINTS ARE REMOVED: 115.75 -> 115)

    THE GAME IS EASILY HACKABLE: MODIFY THE VARIABLES UNDER THE "GAME VARIABLES" SECTION;
    let money = START MONEY
    let moneyIncrease = AMOUNT OF MONEY BOOST PER CPC UPGRADE PER CLICK ( money += 1.15*(moneyIncrease * cpcOwned) )
    let moneyPerSecond = AMOUNT OF MONEY BOOST PER CPS UPGRADE PER SECOND ( money += 1.15*(moneyPerSecond * cpsOwned) )
    let cpsOwned = AMOUNT OF CPS UPGRADES OWNED
    let cpcOwned = AMOUNT OF CPC UPGRADES OWNED
    let cpsStart = AMOUNT OF CPS UPGRADES GAVEN TO THE PLAYER AT THE START OF THE GAME
    let cpcStart = AMOUNT OF CPC UPGRADES GAVEN TO THE PLAYER AT THE START OF THE GAME
    let char = VARIABLE USED FOR SPRITE CHANGING MECHANISM, char = "c" MEANING THE SPRITE IS A SMALL COOKIE
    char = "b" MEANING THE SPRITE IS A BIG COOKIE
    const playback = MAIN MELODY OF THE GAME PLAYING INFINITELY (CHANGE UNDER const game AT LINE 249)
    const goldReq = MONEY REQUIREMENT TO UNLOCK GOLDEN COOKIE
    const diamondReq = MONEY REQUIREMENT TO UNLOCK DIAMOND COOKIE
    const emeraldReq = MONEY REQUIREMENT TO UNLOCK EMERALD COOKIE

HAVE FUN PLAYING
AND HACKING THE GAME!
*/

const cookie = "c"
const bigcookie = "b"
const shop = "s"
const cpcShop = "z"
const cursor = "m"
const goldCookie ="g"
const bGoldCookie = "r"
const diamondCookie = "d"
const bDiamondCookie = "t"
const emeraldCookie = "e"
const bEmeraldCookie = "q"

setLegend(
  [ cookie, bitmap`
........33......
........33......
...333333333....
..33CCCCCC3333..
.33CCCCCCCCC333.
33CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCC111CCCCC..
..CCCC110CCCCC..
..CCCC111CCCCC..
................
................` ],
  [ shop, bitmap`
.000..0000..000.
.0....0..0.0....
.0....0000..000.
.000..0........0
............000.
................
0000..0..0.0...0
0..0..0..0..0.0.
0000..0..0...0..
0...0.0..0...0..
00000.0000...0..
................
.......0........
................
.......0........
.......0........`],
  [ bigcookie, bitmap`
.......333......
......33C33.....
.....33CCC333...
...33CCCCCCC33..
..3CCCCCCCCCC33.
33CCCCCCCCCCCC33
3CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCC1111CCCCCC
CCCCCC1111CCCCCC
CCCCCC1111CCCCCC`],
  [ cpcShop, bitmap`
.0000.0000.0000.
.0....0..0.0....
.0....0000.0....
.0000.0....0000.
................
0000..0..0.0...0
0..0..0..0..0.0.
00000.0..0...0..
0...0.0..0...0..
00000..00....0..
................
......0..0......
......0.0.......
......00........
......0.0.......
......0..0......`],
  [ cursor, bitmap`
.............0..
............00..
...........020..
..........0220..
.........02220..
........022220..
.......0222220..
......02222220..
.....022222220..
....0222222220..
.....002222220..
.......022220...
...0....0220....
...0....0220....
.0.0.....00.....
.000............`],
  [ goldCookie, bitmap`
..........33....
..........33....
......333333....
....3336666333..
....36666666633.
..3336666666663.
.3366666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666611116666..
..666611106666..
..666611116666..
................
................`],
  [ bGoldCookie, bitmap`
................
................
................
................
......333.......
.....333333.....
....33333333....
...3366666633...
...3.6666666....
.....6666666....
.....6666666....
.....6666666....
.....6666666....
.....6666666....
.....6611666....
.....6610666....`],

)

const buy = tune`
241.93548387096774,
241.93548387096774: b5/241.93548387096774 + g5/241.93548387096774 + e5/241.93548387096774,
241.93548387096774: b5/241.93548387096774 + g5/241.93548387096774 + e5/241.93548387096774,
7016.129032258064`
const game = tune`
162.16216216216216: a4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: g4-162.16216216216216,
162.16216216216216: f4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: f4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: a4-162.16216216216216 + d4^162.16216216216216,
162.16216216216216: c5-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: d5-162.16216216216216 + d4^162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: a5-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: d4^162.16216216216216,
162.16216216216216: d5-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: b4-162.16216216216216 + d4^162.16216216216216,
162.16216216216216: a4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: a4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: b4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: b4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: d5-162.16216216216216 + d4^162.16216216216216,
162.16216216216216: f5-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: c5-162.16216216216216 + d4^162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: b4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: b4-162.16216216216216 + d4^162.16216216216216,
162.16216216216216: c4~162.16216216216216,
162.16216216216216: g4-162.16216216216216 + c4~162.16216216216216,
162.16216216216216: d4^162.16216216216216,
162.16216216216216: c4~162.16216216216216 + e4-162.16216216216216,
162.16216216216216: d4^162.16216216216216 + f4-162.16216216216216`

let level = 0;
const levels = [
  map`
.....
.....
s.c.z
..m..
.....`,
];

// ----- GAME VARIABLES ----- //
let money = 0;
let moneyIncrease = 10;
let moneyPerSecond = 10;
let cpsOwned = 1;
let cpcOwned = 1;
let cpsStart = 1;
let cpcStart = 1;
let char = "c";
const goldReq = 10000; 
const diamondReq = 50000;
const emeraldReq = 100000;
const playback = playTune(game, Infinity)

// ----- GAME FUNCTIONS ----- //
function renderText() {
  clearText();
  addText("Cash: " + money.toFixed(0).toString(), {y: 2, color: `3`})
  addText(cpsOwned.toString(), {x: 3, y: 5, color: `1`});
  addText(calculatePrice(cpsOwned,2).toFixed(0).toString(), {x: 3, y: 10, color: `1`});
  addText(cpcOwned.toString(), {x: 16, y: 5, color: `1`});
  addText(calculatePrice(cpcOwned,1).toFixed(0).toString(), {x: 13, y: 10, color: `1`});
}

function addMoneyLoop() {
  if(cpsOwned > 1) {
    money += 1.15*(cpsOwned*moneyPerSecond);
  } else {
    money += (cpsOwned*moneyPerSecond);
  }
  renderText();
  setTimeout(addMoneyLoop, 1000);
}

function addMoneyOnce() {
  if(cpcOwned > 1) {
    money += 1.15*(cpcOwned*moneyIncrease);
  } else {
    money += (cpcOwned*moneyIncrease);
  }
  renderText();
}

function makeSmallCookie() {
  if(money > emeraldReq) {
        getFirst(char).type = "e"
        char = "e"
  } else if(money > diamondReq) {
        getFirst(char).type = "d"
        char = "d"
  } else if(money > goldReq) {
        getFirst(char).type = "g"
        char = "g"
  } else {
      getFirst(char).type = "c"
      char = "c"
  }
}

function makeBigCookie() {
  if(char === "c" || char === "g" || char === "e" || char === "d") {
    let c = getFirst(char).type
    if(c != undefined) {
        if(money > emeraldReq) {
            getFirst(char).type = "q"
            char = "q"
        } else if(money > diamondReq) {
            getFirst(char).type = "t"
            char = "t"
        } else if(money > goldReq) {
            getFirst(char).type = "r"
            char = "r"
        } else {
            getFirst(char).type = "b"
            char = "b"
        }
    }
    setTimeout(makeSmallCookie, 100);
  }
}

function calculatePrice(owned, type) {
  // we always have only 1 free
  if(type = 1) {
    return 100 * Math.pow(1.15,(owned-cpcStart))
  } else if(type = 2) {
    return 100 * Math.pow(1.15,(owned-cpsStart))
  }
}

// START THE CPS LOOP
addMoneyLoop();

const currentLevel = levels[level];
setMap(currentLevel);

// SETUP: SET cpsOwned and cpcOwned to cpsStart and cpcStart, respectively

onInput("i", () => {
  let price = calculatePrice(cpsOwned + 1,2)
  if(money >= price) {
    cpsOwned += 1;
    // console.log(price);
    money -= price;
    playTune(buy);
  }
})

onInput("k", () => {
  let price = calculatePrice(cpcOwned + 1,1)
  if(money >= price) {
    cpcOwned += 1;
    // console.log(price);
    money -= price;
    playTune(buy);
  }
})

onInput("j", () => {
  // CLICK MECHANISM
    makeBigCookie();
    addMoneyOnce();
})
