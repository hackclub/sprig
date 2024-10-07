/*
@title: Cup_Game
@author: Dante Squires
@tags: []
@addedOn: 2024-01-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

/*
-----------------------
How To Play!
-----------------------
-Press 'j' to start the game
-Follow the cup that the ball is under as the cups mix themselves up
-Once the cups are done mixing, use the 'a' and 'd' keys to change the selected cup
-Use the 'j' key to select the cup that you think the ball is under
-Try to get a high score!
-----------------------
*/


//Defining each sprite used in the game
const ball = "b"
const cup1 = "1"
const cup2 = "2"
const cup3 = "3"
const selCup = "s"


//Defining variables so we can move around each cup
let leftCup = cup1
let middleCup = cup2
let rightCup = cup3

let cupSpeed = 400;
let totalRounds = 7;
let guessingTime = false;
let mixingTime = false;
let totalGuesses = 0;
let score = 0;

//The order that each sprite will appear on screen front to back (and what each sprite looks like)
setLegend(
  
  [ cup1, bitmap`
................
................
....CCCC3333....
....C3C33123....
....CC333123....
...CC3C331233...
...C3C3331233...
...CC33331233...
...C3C3331233...
..CCC333312333..
..CC3C33312333..
..C3C333312333..
..CC3333312333..
..C3C333312333..
..CC3333312333..
..C3C333333333..` ],
  [ cup2, bitmap`
................
................
....CCCC3333....
....C3C33123....
....CC333123....
...CC3C331233...
...C3C3331233...
...CC33331233...
...C3C3331233...
..CCC333312333..
..CC3C33312333..
..C3C333312333..
..CC3333312333..
..C3C333312333..
..CC3333312333..
..C3C333333333..` ],
  [ cup3, bitmap`
................
................
....CCCC3333....
....C3C33123....
....CC333123....
...CC3C331233...
...C3C3331233...
...CC33331233...
...C3C3331233...
..CCC333312333..
..CC3C33312333..
..C3C333312333..
..CC3333312333..
..C3C333312333..
..CC3333312333..
..C3C333333333..` ],
  [ selCup, bitmap`
................
...6666666666...
...6666666666...
...6666666666...
..666666666666..
..666666666666..
..666666666666..
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.`],
  [ ball, bitmap`
................
................
................
................
................
................
................
................
................
......99999.....
.....9999999....
.....9999999....
.....9999999....
.....9999999....
.....9999999....
......99999.....` ]
)


//Defining our sounds
const startingSound = tune`
157.48031496062993,
78.74015748031496: E4^78.74015748031496 + F4-78.74015748031496 + D4/78.74015748031496,
78.74015748031496: E4^78.74015748031496 + F4-78.74015748031496,
78.74015748031496: E4^78.74015748031496 + F4-78.74015748031496 + D4/78.74015748031496,
78.74015748031496,
78.74015748031496: G4^78.74015748031496 + A4-78.74015748031496 + F4/78.74015748031496,
78.74015748031496: G4^78.74015748031496 + A4-78.74015748031496,
78.74015748031496: G4^78.74015748031496 + A4-78.74015748031496 + F4/78.74015748031496,
78.74015748031496,
78.74015748031496: B4^78.74015748031496 + C5-78.74015748031496 + A4/78.74015748031496,
78.74015748031496: B4^78.74015748031496 + C5-78.74015748031496,
78.74015748031496: B4^78.74015748031496 + C5-78.74015748031496 + A4/78.74015748031496,
1496.0629921259842`;
const movingSound = tune`
300,
300: F5~300 + F4~300,
9000`;
const youLose = tune`
154.24164524421593,
77.12082262210797: F5-77.12082262210797 + G5/77.12082262210797 + E5^77.12082262210797 + F4-77.12082262210797,
77.12082262210797: F5-77.12082262210797 + G5/77.12082262210797 + F4-77.12082262210797,
77.12082262210797: G5/77.12082262210797 + F5-77.12082262210797 + E5^77.12082262210797 + F4-77.12082262210797,
77.12082262210797,
77.12082262210797: D5-77.12082262210797 + E5/77.12082262210797 + C5^77.12082262210797 + D4-77.12082262210797,
77.12082262210797: D5-77.12082262210797 + E5/77.12082262210797 + D4-77.12082262210797,
77.12082262210797: D5-77.12082262210797 + E5/77.12082262210797 + C5^77.12082262210797 + D4-77.12082262210797,
77.12082262210797,
77.12082262210797: B4-77.12082262210797 + C5/77.12082262210797 + A4^77.12082262210797 + C4-77.12082262210797,
77.12082262210797: B4-77.12082262210797 + C5/77.12082262210797 + C4-77.12082262210797,
77.12082262210797: B4-77.12082262210797 + C5/77.12082262210797 + A4^77.12082262210797 + C4-77.12082262210797,
154.24164524421593,
77.12082262210797: C5-77.12082262210797 + D5/77.12082262210797 + B4^77.12082262210797,
77.12082262210797: C5-77.12082262210797,
77.12082262210797: D5/77.12082262210797,
1079.6915167095115`;
const youWin = tune`
200,
100: G4/100 + A4-100 + F4^100,
100: G4/100 + A4-100 + E5~100,
100: G4/100 + A4-100 + F4^100,
200,
100: C5/100 + D5-100 + B4^100,
100: C5/100 + D5-100 + A5~100,
100: C5/100 + D5-100 + B4^100,
200,
100: G5/100 + A5-100 + F5^100,
100: G5/100 + A5-100 + B5~100,
100: G5/100 + A5-100 + F5^100,
1700`;


//Defining what each level will look like
let level = 0
const levels = [
  map`
.....
1.2.3
..b..`
]
//creating our starting text
addText("Press 'J' To Start!", {
  x: 1,
  y:3,
  color: `9`
})
//Randomizer to decide if the middle cup will swap right or not
function swapRight(){
  let r = Math.round(Math.random(2))
  let right
  if(r%2>0){
    right = true
  } else {
    right = false
  }
  return right
}

//the function to mix everything up
function mix(){
  if(swapRight()){
    //move middle cup up and over the cup it goes over
    setTimeout(() => {getFirst(middleCup).y -= 1; getFirst(middleCup).x += 1}, cupSpeed)
    setTimeout(() => {getFirst(middleCup).y += 1; getFirst(middleCup).x += 1}, cupSpeed*2)
    
    setTimeout(() => {getFirst(rightCup).x -= 1}, cupSpeed)
    setTimeout(() => {getFirst(rightCup).x -= 1}, cupSpeed*2)

    setTimeout(() => {playTune(movingSound)}, cupSpeed)
    setTimeout(() => {playTune(movingSound)}, 2*cupSpeed)
    
  } else {
    setTimeout(() => {getFirst(middleCup).y -= 1; getFirst(middleCup).x -= 1}, cupSpeed)
    setTimeout(() => {getFirst(middleCup).y += 1; getFirst(middleCup).x -= 1}, cupSpeed*2)

    setTimeout(() => {getFirst(leftCup).x += 1}, cupSpeed)
    setTimeout(() => {getFirst(leftCup).x += 1}, cupSpeed*2)

    setTimeout(() => {playTune(movingSound)}, cupSpeed)
    setTimeout(() => {playTune(movingSound)}, 2*cupSpeed)
    
  }
  if(getFirst(cup1).x === 0) {leftCup = cup1}
  else if(getFirst(cup1).x === 2) {middleCup = cup1}
  else if(getFirst(cup1).x === 4) {rightCup = cup1}

  if(getFirst(cup2).x === 0) {leftCup = cup2}
  else if(getFirst(cup2).x === 2) {middleCup = cup2}
  else if(getFirst(cup2).x === 4) {rightCup = cup2}

  if(getFirst(cup3).x === 0) {leftCup = cup3}
  else if(getFirst(cup3).x === 2) {middleCup = cup3}
  else if(getFirst(cup3).x === 4) {rightCup = cup3}

  
  
}
//Begin guessing
function guessCup(){ 
  guessingTime = true
  addText("Use 'A' and 'D' to \nchange selected cup \nUse 'J' to guess!", {
    x: 1,
    y:5,
    color: `9`
  })
  addSprite(2,2,selCup)
  
}

function selectCup(){}

//function to activate the cup mix
function runMix(){
  for(let i = 0; i < totalRounds; i++){
    setTimeout(mix, i*2.5*cupSpeed)
  }
  setTimeout(guessCup, totalRounds*2.5*cupSpeed + 500)
}

//function to reset everything so you can play multiple times
function restart(){
  clearText();
  addText("Press 'J' To Start!", {
  x: 1,
  y:3,
  color: `9`
})
  
  guessingTime = false;
  mixingTime = false;
  totalGuesses = 0;
  
  getFirst(cup1).x = 0;
  getFirst(cup1).y = 1;
  getFirst(cup2).x = 2;
  getFirst(cup2).y = 1;
  getFirst(cup3).x = 4;
  getFirst(cup3).y = 1;

  getFirst(ball).x = 2;
  getFirst(ball).y = 3;


  //making it harder as your score goes up, but also putting a cap on how hard it gets
  if(score<20){
    cupSpeed = 400 - (10*score);
    totalRounds = score + 7;
  }else{
    cupSpeed = 200;
    totalRounds = 35;
  }
}
setMap(levels[level])


onInput("j", () => {
  if(mixingTime === false){
    if(guessingTime === false){
      mixingTime = true;
      playTune(startingSound)
      clearText()

      addText("Score: " + score, {
            x: 1,
            y: 3,
            color: `9`
          })
      
      clearTile(2,2);
      getFirst(cup1).y += 1
      getFirst(cup2).y += 1
      getFirst(cup3).y += 1
      setTimeout(runMix, 2000)
    }
  } 
  if(guessingTime === true){
    if(totalGuesses === 0){
      
      clearText()
      if(getFirst(selCup).x === getFirst(cup1).x){
        totalGuesses += 1;
        setTimeout(() => {getFirst(cup1).y -= 1}, 100)
        setTimeout(() => {playTune(youLose)}, 100)
        setTimeout(() => {addText("You Lose!", {
            x: 6,
            y:3,
            color: `9`
          })}, 100)
        setTimeout(() => {getFirst(cup2).y -= 1}, 1000)
        setTimeout(() => {score = 0}, 5000)
      }
      if(getFirst(selCup).x === getFirst(cup2).x){
        totalGuesses += 1;
        setTimeout(() => {getFirst(cup2).y -= 1}, 100)
        setTimeout(() => {playTune(youWin)}, 100)
        setTimeout(() => {addText("You Win!", {
            x: 6,
            y:3,
            color: `9`
          })}, 100)
        setTimeout(() => {score += 1}, 100)
      }
      if(getFirst(selCup).x === getFirst(cup3).x){
        totalGuesses += 1;
        setTimeout(() => {getFirst(cup3).y -= 1}, 100)
        setTimeout(() => {playTune(youLose)}, 100)
        setTimeout(() => {addText("You Lose!", {
            x: 6,
            y:3,
            color: `9`
          })}, 100)
        setTimeout(() => {getFirst(cup2).y -= 1}, 1000)
        setTimeout(() => {score = 0}, 5000)
      }
      setTimeout(() => {clearTile(getFirst(selCup).x,getFirst(selCup).y)}, 100)
      setTimeout(() => {addSprite(getFirst(cup2).x,2,ball)}, 100)
      setTimeout(() => {addText("Restarting...", {
            x: 4,
            y:3,
            color: `9`
          })}, 2000)
      setTimeout(restart, 5000)
    }
  }
})

onInput("a", () => {
if(guessingTime === true){
  if(getFirst(selCup).x === 0){
    getFirst(selCup).x = 4
  }else{
    getFirst(selCup).x -= 2;
  }
}
});

onInput("d", () => {
if(guessingTime === true){
  if(getFirst(selCup).x === 4){
    getFirst(selCup).x = 0
  }else{
    getFirst(selCup).x += 2;
  }
}
});
