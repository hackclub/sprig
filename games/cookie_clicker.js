/*
@title: cookie_clicker
@author: kunevi
@tags: ['endless']
@addedOn: 2022-12-16
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
................
................
.....CCCCCC.....
...CCCC0C9CCC...
...CC0CC0CCCC...
..CCCCCCCC9C9C..
..CC0CC00C90CC..
..CCC9CCC0CCCC..
..C09C0C0C09CC..
..C0CCC0CCCCCC..
..CCC0CC90CCCC..
...CC9CC0CC9C...
...CCCC9C9CCC...
.....CCCCCC.....
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
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
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
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..`],
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
................
................
.....FFFFFFF....
...FF6660960F...
...F606660660F..
..F6666066969F..
..F6066966906F..
..F6696660666F..
..F0960606096F..
..F0666066666F..
..F6606690666F..
...F69660669FF..
...FF6696966F...
....FFFFFFFF....
................
................`],
  [ bGoldCookie, bitmap`
..FFFFFFFFFFFF..
.FFFFFFFFFFFFFF.
FFFF66660666FFFF
FFF6666606666FFF
FF669666696666FF
FF660696669666FF
FF666606960096FF
FF696060006006FF
FF600669960966FF
FF660609669666FF
FF660090966666FF
FF666666669666FF
FFF6966090666FFF
FFFF66666666FFFF
.FFFFFFFFFFFFFF.
..FFFFFFFFFFFF..`],
  [ diamondCookie, bitmap`
................
................
.....5555555....
...5577709705...
...57077707705..
..577770779795..
..570779779075..
..577977707775..
..509707070975..
..507770777775..
..577077907775..
...57977077955..
...5577979775...
....55555555....
................
................`],
  [ bDiamondCookie, bitmap`
..555555555555..
.55555555555555.
5555777707775555
5557777707777555
5577977779777755
5577079777977755
5577770797009755
5579707000700755
5570077997097755
5577070977977755
5577009097777755
5577777777977755
5557977090777555
5555777777775555
.55555555555555.
..555555555555..`],
  [ emeraldCookie, bitmap`
................
................
....DDDDDDDDD...
...DD4440940DD..
...D404440440D..
..D4444044949D..
..D4044944904D..
..D4494440444D..
..D0940404094D..
..D0444044444D..
..D4404490444D..
..DD49440449DD..
...DD4494944D...
....DDDDDDDD....
................
................`],
  [ bEmeraldCookie, bitmap`
..DDDDDDDDDDDD..
.DDDDDDDDDDDDDD.
DDDD44440444DDDD
DDD4444404444DDD
DD449444494444DD
DD440494449444DD
DD444404940094DD
DD494040004004DD
DD400449940944DD
DD440409449444DD
DD440090944444DD
DD444444449444DD
DDD4944090444DDD
DDDD44444444DDDD
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDD..`]
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
