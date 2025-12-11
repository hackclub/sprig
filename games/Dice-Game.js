/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dice Game
@author: Malakai Wicker
@tags: []
@addedOn: 2025-00-00

GOAL: Make it to 10,000

Code is very messy. I didn't get a good grasp of Javascript until there was too little time left and I still had stuff to add
to make the game more forgiving and fun. Tried to make the game as forgiving as possible without making it something that could be easily cheesed through.


Game Rules & How It Works: 
PURPOSE; Player must bet on the value of the blue die and red die individually. The game will check if the guesses match.
If both of their guesses are correct, they receive 3x the amount they're betting.
If not both, but one of their guesses are correct, they receive an amount equal to the betting amount.
If the total value of their guess matches the total value of the dice rolled, they receive an amount that's half of what they bet.
If neither guess is correct, but the value of the red die matches the guess for blue and/or the value of the blue die matches the guess for red then they
get something called a "pity loss" in which the amount deducted is reduced so -
if neither guess is correct, but both dies match the value of the guess for the other then the amount deducted is reduced by 5 times, but
if only one of the dies matches the value guessed for the other then the amount lost is halved. They can also receive something called a "pity gain"
if they have 3+ losses in row then the next correct guess, they'll receive twice the amount they're betting.

TIERS; Player will reach different tiers as they continue racking up money, each tier increases the betting amount and gives them a tier bonus.
Obviously if they manage to lose enough money and go below the amount required for a tier then their tier becomes a lower tier.


*/




// Sprites
const player = "p"
const bDiceOne = "b"
const bDiceTwo = "t"
const bDiceThree = "h"
const bDiceFour = "f"
const bDiceFive = "i"
const bDiceSix = "s"
const rDiceOne = "r"
const rDiceTwo = "w"
const rDiceThree = "e"
const rDiceFour = "o"
const rDiceFive = "v"
const rDiceSix = "x"
const bDiceRaise = "u"
const bDiceLower = "d"
const rDiceRaise = "a"
const rDiceLower = "l"
const bBet1 = "1"
const bBet2 = "2"
const bBet3 = "3"
const bBet4 = "4"
const bBet5 = "5"
const bBet6 = "6"
const rBet1 = "7"
const rBet2 = "8"
const rBet3 = "9"
const rBet4 = "0"
const rBet5 = "!"
const rBet6 = "#"
const roll = "n"

const line1 = "*"
const boot = "&"
const burningMoney = "^"
const line = "%"

// Variables
let bVal = 1;
let rVal = 1;
let newDVal = 0;
let previousBlueV = 1;
let previousRedV = 1;
let isGameRunning = true;
let betAmnt = 50;
let money = 150;
let lossCounter = 0;
let gainCounter = 0;
let isWildcard = false;
let wildRule = 0;
let wcRando = 0;
let roundsWithoutWC = 0;

// Music stuff
const loss = tune`
211.26760563380282: F4~211.26760563380282 + G4^211.26760563380282,
211.26760563380282: F4~211.26760563380282 + G4^211.26760563380282,
211.26760563380282: E4~211.26760563380282 + F4^211.26760563380282,
211.26760563380282: E4~211.26760563380282 + F4^211.26760563380282,
211.26760563380282: D4~211.26760563380282 + E4^211.26760563380282,
211.26760563380282: D4~211.26760563380282 + E4^211.26760563380282 + C4~211.26760563380282,
211.26760563380282: C4/211.26760563380282,
5281.69014084507`;
const gain = tune`
188.67924528301887: A4~188.67924528301887,
188.67924528301887: A4~188.67924528301887,
188.67924528301887: A4^188.67924528301887,
188.67924528301887: B4^188.67924528301887,
188.67924528301887: C5^188.67924528301887,
188.67924528301887: E5^188.67924528301887,
188.67924528301887: E5^188.67924528301887,
4716.981132075472`;
const wildGain = tune`
245.9016393442623: B4~245.9016393442623,
245.9016393442623: B4~245.9016393442623 + C5~245.9016393442623,
245.9016393442623: C5~245.9016393442623 + D5~245.9016393442623,
245.9016393442623: E5~245.9016393442623,
245.9016393442623: A5^245.9016393442623,
245.9016393442623: B5^245.9016393442623,
6393.44262295082`;
const smallGain = tune`
200: G4~200,
200: A4^200,
200: C5~200,
200: C5^200,
200: E5~200,
5400`;
const jackpot = tune `
179.64071856287424: A4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: B4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: A4~179.64071856287424,
179.64071856287424: D5~179.64071856287424,
179.64071856287424: B4^179.64071856287424,
179.64071856287424: C5^179.64071856287424,
179.64071856287424: D5~179.64071856287424,
179.64071856287424: E5~179.64071856287424,
179.64071856287424: D5~179.64071856287424,
179.64071856287424: D5^179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: F5~179.64071856287424,
179.64071856287424: A5~179.64071856287424,
2694.6107784431138`;
const gameover = tune`
500: F5~500,
500: E5~500,
500: D5~500,
500: C5^500,
500: D5/500,
500: B4/500,
500: G4/500,
500: F4^500,
500: E4^500,
500: D4^500,
500: G4~500,
500: F4~500,
500: F4~500,
500: E4~500,
500: D4/500,
500: D4/500,
500: C4/500,
500: C4/500,
7000`;
const victory = tune`
258.62068965517244: C4~258.62068965517244,
258.62068965517244: C4~258.62068965517244,
258.62068965517244: C4^258.62068965517244,
258.62068965517244: C4^258.62068965517244,
258.62068965517244: C4^258.62068965517244,
258.62068965517244: C4~258.62068965517244,
258.62068965517244: C4~258.62068965517244,
258.62068965517244: C4~258.62068965517244,
258.62068965517244: D4^258.62068965517244,
258.62068965517244: D4^258.62068965517244,
258.62068965517244: D4^258.62068965517244,
258.62068965517244: E4~258.62068965517244,
258.62068965517244: E4~258.62068965517244,
258.62068965517244: E4~258.62068965517244,
258.62068965517244: F4^258.62068965517244,
258.62068965517244: F4^258.62068965517244,
258.62068965517244: F4^258.62068965517244,
258.62068965517244: A4~258.62068965517244,
258.62068965517244: G4~258.62068965517244,
258.62068965517244: C5~258.62068965517244,
258.62068965517244: A4~258.62068965517244,
258.62068965517244: C5~258.62068965517244,
258.62068965517244: D5~258.62068965517244,
258.62068965517244: E5^258.62068965517244,
258.62068965517244: D5^258.62068965517244,
258.62068965517244: E5^258.62068965517244,
258.62068965517244: D5^258.62068965517244,
258.62068965517244: F5^258.62068965517244,
258.62068965517244: G5^258.62068965517244,
258.62068965517244: F5^258.62068965517244,
258.62068965517244: G5^258.62068965517244,
258.62068965517244: A5^258.62068965517244`;

setLegend(
  [ bDiceOne, bitmap`
................
................
....00000000....
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022227722220..
..022227722220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....00000000....
................
................`],
  [ bDiceTwo, bitmap`
................
................
....00000000....
...0222222220...
..022222222220..
..022222277220..
..022222277220..
..022222222220..
..022222222220..
..022772222220..
..022772222220..
..022222222220..
...0222222220...
....00000000....
................
................`],
  [ bDiceThree, bitmap`
................
................
....00000000....
...0222222220...
..022222227720..
..022222227720..
..022222222220..
..022227722220..
..022227722220..
..022222222220..
..027722222220..
..027722222220..
...0222222220...
....00000000....
................
................`],
  [ bDiceFour, bitmap`
................
................
....00000000....
...0222222220...
..027722227720..
..027722227720..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..027722227720..
..027722227720..
...0222222220...
....00000000....
................
................`],
  [ bDiceFive, bitmap`
................
................
....00000000....
...0222222220...
..027722227720..
..027722227720..
..022222222220..
..022227722220..
..022227722220..
..022222222220..
..027722227720..
..027722227720..
...0222222220...
....00000000....
................
................`],
  [ bDiceSix, bitmap`
................
................
....00000000....
...0222222220...
..027722227720..
..027722227720..
..022222222220..
..027722227720..
..027722227720..
..022222222220..
..027722227720..
..027722227720..
...0222222220...
....00000000....
................
................`],
  [ rDiceOne, bitmap`
................
................
....00000000....
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022223322220..
..022223322220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....00000000....
................
................`],
  [ rDiceTwo, bitmap`
................
................
....00000000....
...0222222220...
..022222222220..
..022222233220..
..022222233220..
..022222222220..
..022222222220..
..022332222220..
..022332222220..
..022222222220..
...0222222220...
....00000000....
................
................`],
  [ rDiceThree, bitmap`
................
................
....00000000....
...0222222220...
..022222223320..
..022222223320..
..022222222220..
..022223322220..
..022223322220..
..022222222220..
..023322222220..
..023322222220..
...0222222220...
....00000000....
................
................`],
  [ rDiceFour, bitmap`
................
................
....00000000....
...0222222220...
..023322223320..
..023322223320..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..023322223320..
..023322223320..
...0222222220...
....00000000....
................
................`],
  [ rDiceFive, bitmap`
................
................
....00000000....
...0222222220...
..023322223320..
..023322223320..
..022222222220..
..022223322220..
..022223322220..
..022222222220..
..023322223320..
..023322223320..
...0222222220...
....00000000....
................
................`],
  [ rDiceSix, bitmap`
................
................
....00000000....
...0222222220...
..023322223320..
..023322223320..
..022222222220..
..023322223320..
..023322223320..
..022222222220..
..023322223320..
..023322223320..
...0222222220...
....00000000....
................
................`],
  [ bDiceRaise, bitmap`
.......55.......
......5775......
.....577775.....
....57777775....
...5007777005...
..570070070075..
.57700700700775.
5777007007007775
5777007007007775
5777000000007775
.55555555555555.
................
................
................
................
................`],
  [ bDiceLower, bitmap`
................
................
................
................
................
.55555555555555.
5777777007777775
5777770770777775
5777770777777775
.57777700777775.
..577777707775..
...5777770775...
....57077075....
.....570075.....
......5775......
.......55.......`],
  [ rDiceRaise, bitmap`
................
.......33.......
......3993......
.....399993.....
....39000093....
...3999009993...
..399990099993..
.39999900999993.
3999999009999993
3999990000999993
.33333333333333.
................
................
................
................
................`],
  [ rDiceLower, bitmap`
................
................
................
................
................
.33333333333333.
3999990990999993
3999990990999993
3999990909999993
.39999009999993.
..399909099993..
...3990990993...
....39099093....
.....309903.....
......3993......
.......33.......`],
  [ roll, bitmap`
................
....33333333....
...3777777773...
..377755577773..
.37777555577773.
.37777575577773.
.37777577577773.
.37777577577773.
.37777577577773.
.37777577577773.
.37777575577773.
.37777555577773.
..377755577773..
...3777777773...
....33333333....
................`],
  [ bBet1, bitmap`
................
................
..000000000000..
..077777777770..
..077777077770..
..077770077770..
..077777077770..
..077777077770..
..077777077770..
..077777077770..
..077777077770..
..077770007770..
..077777777770..
..000000000000..
................
................`],
  [ bBet2, bitmap`
................
................
..000000000000..
..077777777770..
..077000000770..
..070077770770..
..070777700770..
..077777007770..
..077770077770..
..077000777770..
..070077777770..
..070000000070..
..077777777770..
..000000000000..
................
................`],
  [ bBet3, bitmap`
................
................
..000000000000..
..077777777770..
..077770007770..
..077707770770..
..077777770770..
..077777770770..
..077777007770..
..077777770770..
..077777770770..
..077707770770..
..077770007770..
..000000000000..
................
................`],
  [ bBet4, bitmap`
................
................
..000000000000..
..077777007770..
..077770707770..
..077707707770..
..077077707770..
..070777707770..
..077000007770..
..077777707770..
..077777707770..
..077777707770..
..077777707770..
..000000000000..
................
................`],
  [ bBet5, bitmap`
................
................
..000000000000..
..077777777770..
..077000000770..
..077077777770..
..077077777770..
..077077777770..
..077000000770..
..077777770770..
..077777770770..
..070777770770..
..077000007770..
..000000000000..
................
................`],
  [ bBet6, bitmap`
................
................
..000000000000..
..077777777770..
..077770007770..
..077707770770..
..077077777770..
..077077777770..
..077000007770..
..077077770770..
..077077770770..
..077700007770..
..077777777770..
..000000000000..
................
................`],
  [ rBet1, bitmap`
................
................
..000000000000..
..033333333330..
..033333033330..
..033330033330..
..033333033330..
..033333033330..
..033333033330..
..033333033330..
..033333033330..
..033330003330..
..033333333330..
..000000000000..
................
................`],
  [ rBet2, bitmap`
................
................
..000000000000..
..033333333330..
..033000000330..
..030033330330..
..030333300330..
..033333003330..
..033330033330..
..033000333330..
..030033333330..
..030000000030..
..033333333330..
..000000000000..
................
................`],
  [ rBet3, bitmap`
................
................
..000000000000..
..033333333330..
..033330003330..
..033303330330..
..033333330330..
..033333330330..
..033333003330..
..033333330330..
..033333330330..
..033303330330..
..033330003330..
..000000000000..
................
................`],
  [ rBet4, bitmap`
................
................
..000000000000..
..033333003330..
..033330303330..
..033303303330..
..033033303330..
..030333303330..
..033000003330..
..033333303330..
..033333303330..
..033333303330..
..033333303330..
..000000000000..
................
................`],
  [ rBet5, bitmap`
................
................
..000000000000..
..033333333330..
..033000000330..
..033033333330..
..033033333330..
..033033333330..
..033000000330..
..033333330330..
..033333330330..
..030333330330..
..033000003330..
..000000000000..
................
................`],
  [ rBet6, bitmap`
................
................
..000000000000..
..033333333330..
..033330003330..
..033303330330..
..033033333330..
..033033333330..
..033000003330..
..033033330330..
..033033330330..
..033300003330..
..033333333330..
..000000000000..
................
................`], 
  [ player, bitmap`
.0.....LLL......
..0....LLL......
....7...LL......
....77..7.......
.....7777.......
.......777......
.....777.77.....
C...77....7.....
C...7....77.....
C.......77......
........7.......
0......111......
0......1.1......
.....C11.1......
..0..C.C11......
.0.....C........`],
  [ boot, bitmap`
C..C............
CC.CC...........
CCCCCC..........
CCCCCC..........
.CCCCC..........
.CCCCCC.......00
..CCCCC.0...00..
0.CCCCC..000..CC
0..CCCCC....CCCC
...CCCCC.CCCCCCC
.0.CCCCCCCCCCCCC
00.CCCCCCCCCCCC.
0..CCCCCCCCCC..0
..0.CCCCCCC..000
.00.CCCC....00..
00........000...`],
  [ burningMoney, bitmap`
......3......3..
.....393....393.
....39693..39693
...3966693396693
...3966669966693
...396666666693.
FFF396666666693F
FF39696666666693
F443939996666693
F444343339696693
F44444D443939693
F444444DD434393F
F44444444D44434F
F44444D44D44444F
FF44444DD44444FF
FFFFFFFFFFFFFFFF`],
  [ line, bitmap`
.......0000.....
....0000........
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
................
................`],
  [line1, bitmap`
................
................
................
................
................
................
................
................
...............0
..............00
................
................
...............0
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map `
..........
..........
..........
..........
..........
..........
..........
..........`,
  map`
.......
.......
u.b.r.a
1..n..7
d.....l
.......`,
  map`
..........
..........
^........^
..^.^..^..
..........
..........
..........
..........`,
  map`
.....
.....
*&p..
.%...`
]

setMap(levels[level])

//returns to menu
function menu() {
  level = 0;
  setMap(levels[level]);
  clearText();
  //addText("Money: " + money.toString() + "\nBet Amount: " + betAmnt.toString(), { x: 1, y: 0, color: color`F` });
  addText("Guess the value of \nthe red & blue die\n prior to rolling \nthem. Guessing one \nof them correctly \ngives an amount \nequal" + 
          "to your bet. \nGuessing both gives \n3x the amount.\nCORRECT guesses\nadd to multiplier. " +
          "\nIf guess's total\nmatch dice total, \nyou get 1/2 of bet.\nTher", { x: 1, y : 0, color: color`5`});
  addText("Press L to start \nor return to menu", { x: 1, y: 14});
};
menu();

function resetValues()
{
  previousBlueV = 1;
  previousRedV = 1;
  betAmnt = 50;
  money = 150;
  lossCounter = 0;
  gainCounter = 0;
  bVal = 1;
  rVal = 1;
  isWildcard = false;
  roundsWithoutWC = 0;
}

function victoryScreen(){
  playTune(victory)
  isGameRunning = false;
  
  level = 3;
  setMap(levels[level]);

  clearText();
  addText("You won!", { x: 6, y : 0, color: color`4`});
  addText("You managed to win " + "\n" + money.toString() + " bucks!", {x: 1, y:2, color: color`L`});
  addText("...and got kicked \nout of the casino.", {x: 1, y:5, color: color`L`});
  
  setTimeout(() => addText("Press A to restart \nL to return to menu", { x: 1, y: 13}), 9000);
  setTimeout(() => isGameRunning = true, 9000);
}


function gameOver()
{
  isGameRunning = false;
  level = 2;
  setMap(levels[level]);
  clearText();
  addText("Money: " + money.toString() + "\nBet Amount: " + betAmnt.toString(), { x: 1, y: 0, color: color`F` });
  
  addText("You're broke!", { x: 4, y : 5, color: color`0`});
  setTimeout(() => addText("Press A to restart \nL to return to menu", { x: 1, y: 13}), 9000);
  setTimeout(() => isGameRunning = true, 9000);
}

function displayMnyAndBAmnt()
{
  clearText();
  // Displays money, bet amount, and tier
  addText("Money: " + money.toString() + "\nBet Amount: " + betAmnt.toString(), { x: 2, y: 0, color: color`F` });
  
  // Checks value of money and displays tier
    if(money < 500)
    {
      addText("Bronze Tier", { x: 4, y: 15, color: color`C` });
    }
    else if(money < 2000)
    {
      addText("Silver Tier", { x: 4, y: 15, color: color`1` });
    }
    else if(money < 3500)
    {
      addText("Gold Tier", { x: 4, y: 15, color: color`6` });
    }
    else if(money < 5000)
    {
      addText("Platinum Tier", { x: 4, y: 15, color: color`7` });
    }
    else if(money < 10000)
    {
      addText("Emerald Tier", { x: 4, y: 15, color: color`4` });
    }

  
}
// Okay NOTE to self - this function should only roll one value at a time and return it as this accomplishes multiple things
// We'd get a value for comparison to the value that user bet on plus you can only return one value so it would only randomly generate one value at a time
// returns it to what called it and then we do whatever with that value there (Display the rolled dice and compare it to user's bet.)
function rollDice() {
  let max = 6 + 1;
  let min = 1;
  
  if(isWildcard == true)
  {
    if (wildRule == 3)
    {
      max = wcRando + 1;
    }
    else if(wildRule == 5)
    {
      min = wcRando + 1; // NOTE added 1 so that it will only be greater than what its supposed to be higher than, remove if needed
    }
  }
  
  return Math.floor(Math.random() * (max - min) + min);
  //return Math.floor(Math.random() * max + 1);
}

function decreaseBVal() {
  if (bVal > 1)
    {
      bVal = bVal - 1;

      if(bVal == 2)
      {
        const bB = getFirst(bBet3)
        bB.type = bBet2
      }
      else if(bVal == 3)
      {
        const bB = getFirst(bBet4)
        bB.type = bBet3
      }
      else if(bVal == 4)
      {
        const bB = getFirst(bBet5)
        bB.type = bBet4
      }
      else if(bVal == 5)
      {
        const bB = getFirst(bBet6)
        bB.type = bBet5
      }
      else if(bVal == 1)
      {
        const bB = getFirst(bBet2)
        bB.type = bBet1
      }
    }
}
function increaseBVal() {
  if (bVal < 6)
    {
      bVal = bVal + 1;

      if(bVal == 2)
      {
        const bB = getFirst(bBet1)
        bB.type = bBet2
      }
      else if(bVal == 3)
      {
        const bB = getFirst(bBet2)
        bB.type = bBet3
      }
      else if(bVal == 4)
      {
        const bB = getFirst(bBet3)
        bB.type = bBet4
      }
      else if(bVal == 5)
      {
        const bB = getFirst(bBet4)
        bB.type = bBet5
      }
      else if(bVal == 6)
      {
        const bB = getFirst(bBet5)
        bB.type = bBet6
      }
    }
}

function decreaseRVal() {
  if (rVal > 1)
    {
      rVal = rVal - 1;

      if(rVal == 2)
      {
        const rB = getFirst(rBet3)
        rB.type = rBet2
      }
      else if(rVal == 3)
      {
        const rB = getFirst(rBet4)
        rB.type = rBet3
      }
      else if(rVal == 4)
      {
        const rB = getFirst(rBet5)
        rB.type = rBet4
      }
      else if(rVal == 5)
      {
        const rB = getFirst(rBet6)
        rB.type = rBet5
      }
      else if(rVal == 1)
      {
        const rB = getFirst(rBet2)
        rB.type = rBet1
      }
    }
}
function increaseRVal() {
  if (rVal < 6)
    {
      rVal = rVal + 1;

      if(rVal == 2)
      {
        const rB = getFirst(rBet1)
        rB.type = rBet2
      }
      else if(rVal == 3)
      {
        const rB = getFirst(rBet2)
        rB.type = rBet3
      }
      else if(rVal == 4)
      {
        const rB = getFirst(rBet3)
        rB.type = rBet4
      }
      else if(rVal == 5)
      {
        const rB = getFirst(rBet4)
        rB.type = rBet5
      }
      else if(rVal == 6)
      {
        const rB = getFirst(rBet5)
        rB.type = rBet6
      }
    }
}


function bet(){
  // Checks if user won anything

  // Declares variables
  let gains = 0;
  let amntGained = 0;
  let tierBonus = 0;
  let additionalAmnt = 0;
  let rando = 0;
  
  // Checks if both dice match user's guess
  if(previousBlueV == bVal && previousRedV == rVal)
  {
    amntGained = 3 * betAmnt;
    gains = 2;
  } // Checks if either dice match user's guess
  else if(previousBlueV == bVal || previousRedV == rVal)
  {
    amntGained += betAmnt;
    gains = 1;
  }
  else if((previousBlueV + previousRedV) == (bVal + rVal)) // Checks if total value of dice matches total value of user's guess
  {
    amntGained += betAmnt / 2;
    gains = 4;
  }

  if(isWildcard == true)
  {
    switch (wildRule)
      {
        case 1:
          if(gains >= 1)
          {
            amntGained *= 2;
            gains = 3;
          }
          break;
        case 2:
          // The only additional amount allowed regarding this rule is if both die are the same values. (Because it will go through 3x profit and then this wild rule)

          // This is just to ensure that there isn't an additional amount being added regarding total matching total - it's fine if they manage to get the 3x profit
          if((previousBlueV == rVal && previousRedV == bVal) && gains == 4)
          {
            amntGained = 0;
          }
          
          if (previousBlueV == rVal)
          {
            amntGained += betAmnt;
            gains = 3;
          }
          if (previousRedV == bVal)
          {
            amntGained += betAmnt;
            gains = 3;
          }
          break;
        case 3:
          wcRando = 0;
          break;
        case 4:
          wcRando = 0;
          break;
        case 5:
          wcRando = 0;
          break;
      }
      wildRule = 0;
      isWildcard = false;
      roundsWithoutWC = -1;
  }

  // Checks if user's gains is 0
  if(gains == 0)
  {
    gainCounter = 0;
    lossCounter += 1;
    // Checks if user's bet matched the value of another die that wasn't the one being bet on - they'll get a pity loss if so
    if(previousBlueV == rVal || previousRedV == bVal)
    {
      amntGained = -1 * (betAmnt / 2);
    }
    else
    {
      amntGained = -1 * betAmnt;
    }
    
  }
  else if(gains < 4)
  {
    // gainCounter will only be incremented when user guesses one or both of the die correctly (wild rules apply)
    gainCounter += 1;
  }

  // Checks value of money and adjusts bet amount & tier bonus
  if(money < 500)
  {
    betAmnt = 50;
    tierBonus = 0;

    additionalAmnt = gainCounter * (betAmnt * 0.1);
  }
  else if(money < 2000)
  {
    betAmnt = 100;
    tierBonus = 10;

    additionalAmnt = gainCounter * (betAmnt * 0.2);
  }
  else if(money < 3500)
  {
    betAmnt = 200;
    tierBonus = 20;

    additionalAmnt = gainCounter * (betAmnt * 0.3);
  }
  else if(money < 5000)
  {
    betAmnt = 500;
    tierBonus = 50;

    additionalAmnt = gainCounter * (betAmnt * 0.4);
  }
  else if(money < 10000)
  {
    betAmnt = 750;
    tierBonus = 100;

    additionalAmnt = gainCounter * (betAmnt * 0.42);
  }
  
  amntGained += tierBonus;

  // Checks if player has 3+ losses in a row & applies a pity gain (gives twice the amount they're recieving)
  if(gains >= 1)
  {
    if(lossCounter >= 3)
    {
      amntGained = amntGained * 2;
    }
    lossCounter = 0;

    // Removes potential decimal part - ensures number is whole
    let remainder = additionalAmnt % 1;
    additionalAmnt -= remainder;
      
    amntGained += additionalAmnt;
  }

  // Adds amount gained to money
  money += amntGained;

  // Checks if user lost all money
  if(money < betAmnt)
  {
    playTune(gameover);
    gameOver();
  }
  else if(money >= 10000) // Checks if user has reached 10,000
  {
    victoryScreen();
  }
  else
  {
    // Checks value of gains to determine what tune to play
    switch (gains)
    {
          case 0:
            playTune(loss);
            break;
          case 1:
            playTune(gain);
            break;
          case 2:
            playTune(jackpot);
            break;
          case 3:
            playTune(wildGain);
            break;
          case 4:
            playTune(smallGain);
            break;
    }

    displayMnyAndBAmnt();
    addText("Amount Gained: " + amntGained.toString(), { x: 1, y: 2, color: color`D` });
    addText("Tier Bonus: " + tierBonus.toString(), { x: 3, y: 14, color: color`9` });
    addText(gainCounter.toString() + "x", { x: 4, y: 13, color: color`5` });
    addText("+" + additionalAmnt, { x: 13, y: 13, color: color`5` });
    
    if(isWildcard == false)
    {
      rando = Math.floor(Math.random() * (9 - roundsWithoutWC) + 1);
      
      if(roundsWithoutWC < 8)
      {
        roundsWithoutWC += 1;
      }

      if(rando == 1)
      {
        isWildcard = true;
        roundsWithoutWC = 0;
        wildRule = Math.floor(Math.random() * 5 + 1);
        switch (wildRule)
          {
            case 1:
              addText("Next roll:\n2x profit", { x: 1, y: 3, color: color`3` });
              break;
            case 2:
              addText("Next roll:Guess\ncan match any die", { x: 1, y: 3, color: color`3` });
              break;
            case 3:
              wcRando = Math.floor(Math.random() * 5 + 1);
              if(wcRando == 1)
                wcRando += 1;
              addText("Next roll:Max die \nis " + wcRando.toString(), { x: 1, y: 3, color: color`3` });
              break;
            case 4:
              wcRando = Math.floor(Math.random() * 6 + 1);
              addText("Next roll:One die \nwill be " + wcRando.toString() , { x: 1, y: 3, color: color`3` });
              break;
            case 5:
              wcRando = Math.floor(Math.random() * 4 + 1);
              addText("Next roll:Die will \nbe higher than " + wcRando.toString() , { x: 1, y: 3, color: color`3` });
              break;
          }
      }
    }
    
  }

}
  

setPushables({
  [ player ]: []
})

onInput("s", () => {
	if(level == 1 && isGameRunning)
    {
      decreaseBVal();
    }
});

onInput("w", () => {
	if(level == 1 && isGameRunning)
    {
      increaseBVal();
    }
});

onInput("d", () => {
  if(level == 1 && isGameRunning){
    let bD
    let rD
  
    // Gets the sprite so that it can be referred through bD and rD
    if(previousBlueV == 1)
    {
      bD = getFirst(bDiceOne)
    }
    else if(previousBlueV == 2)
    {
      bD = getFirst(bDiceTwo)
    }
    else if(previousBlueV == 3)
    {
      bD = getFirst(bDiceThree)
    }
    else if(previousBlueV == 4)
    {
      bD = getFirst(bDiceFour)
    }
    else if(previousBlueV == 5)
    {
      bD = getFirst(bDiceFive)
    }
    else if(previousBlueV == 6)
    {
      bD = getFirst(bDiceSix)
    }
    if(previousRedV == 1)
    {
      rD = getFirst(rDiceOne)
    }
    else if(previousRedV == 2)
    {
      rD = getFirst(rDiceTwo)
    }
    else if(previousRedV == 3)
    {
      rD = getFirst(rDiceThree)
    }
    else if(previousRedV == 4)
    {
      rD = getFirst(rDiceFour)
    }
    else if(previousRedV == 5)
    {
      rD = getFirst(rDiceFive)
    }
    else if(previousRedV == 6)
    {
      rD = getFirst(rDiceSix)
    }


    if(isWildcard == true && wildRule == 4)
    {
      let randomDice = Math.floor(Math.random() * 2 + 1);
      if(randomDice == 1)
        newDVal = wcRando;
      else
        wildRule = -4;
    }
    else
    {
      // Gets a random value (1 - 6) and changes the sprite of the blue die to reflect new value
      newDVal = rollDice();
    }
    
    if (newDVal == 1)
    {
      bD.type = bDiceOne;
    }
    else if (newDVal == 2)
    {
      bD.type = bDiceTwo;
    }
    else if (newDVal == 3)
    {
      bD.type = bDiceThree;
    }
    else if (newDVal == 4)
    {
      bD.type = bDiceFour;
    }
    else if (newDVal == 5)
    {
      bD.type = bDiceFive;
    }
    else if (newDVal == 6)
    {
      bD.type = bDiceSix;
    }

    // Stores the new value for blue die
    previousBlueV = newDVal

    if(wildRule == -4)
    {
      newDVal = wcRando;
      wildRule = 4;
    }
    else
    {
      // Gets a random value (1 - 6) and changes sprite of red die to reflect new value
      newDVal = rollDice();
    }
    
    if (newDVal == 1)
    {
      rD.type = rDiceOne;
    }
    else if (newDVal == 2)
    {
      rD.type = rDiceTwo;
    }
    else if (newDVal == 3)
    {
      rD.type = rDiceThree;
    }
    else if (newDVal == 4)
    {
      rD.type = rDiceFour;
    }
    else if (newDVal == 5)
    {
      rD.type = rDiceFive;
    }
    else if (newDVal == 6)
    {
      rD.type = rDiceSix;
    }

    previousRedV = newDVal

    // Calls function regarding betting (Checks if user's bet matches)
    bet();
  }
});

onInput("i", () => {
	if(level == 1 && isGameRunning)
    {
      increaseRVal();
    }
});

onInput("k", () => {
	if(level == 1 && isGameRunning)
    {
      decreaseRVal();
    }
});

onInput("l", () => {
  if(isGameRunning) {
	if(level === 1 || level === 2 || level === 3) {
      menu();
      resetValues();
    }
    else {
      resetValues();
      clearText();
      level = 1;
      setMap(levels[level]);
      displayMnyAndBAmnt();
    }
  }
});

onInput("a", () => {
    if(isGameRunning)
    {
      if(level == 2 || level == 3){
        resetValues();
        clearText();
        level = 1
        setMap(levels[level]);
        displayMnyAndBAmnt();
      }
    }
});

afterInput(() => {
  
})