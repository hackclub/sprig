/*
@title: Pizza Party
@author: Ethan
@tags: []
@addedOn: 2025-03-20

A Pizza-Catching made demo by Ethan Canterbury for Hack Somerset!

Inspired by Mouse Cheese Chase
*/

const player = "p"
const floor = "f";
const Pizza = "m";
const backgroundTune = tune`
483.8709677419355: C4^483.8709677419355 + E4/483.8709677419355,
483.8709677419355: D4^483.8709677419355 + G4/483.8709677419355,
483.8709677419355: C4^483.8709677419355 + A4/483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355 + A4/483.8709677419355,
483.8709677419355: D4^483.8709677419355 + G4/483.8709677419355,
483.8709677419355: C4^483.8709677419355 + E4/483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355 + E4-483.8709677419355,
483.8709677419355: D4^483.8709677419355 + F4-483.8709677419355,
483.8709677419355: C4^483.8709677419355 + G4-483.8709677419355,
483.8709677419355: D4^483.8709677419355 + F4-483.8709677419355,
483.8709677419355: C4^483.8709677419355 + E4-483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355 + D4/483.8709677419355,
483.8709677419355: D4^483.8709677419355 + C4/483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355 + G4/483.8709677419355,
483.8709677419355: C4^483.8709677419355 + C5/483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355,
483.8709677419355: C4^483.8709677419355,
483.8709677419355: D4^483.8709677419355`;
const PizzaSound = tune`
196.07843137254903: G4^196.07843137254903,
196.07843137254903: A4^196.07843137254903,
196.07843137254903,
196.07843137254903: F4^196.07843137254903,
196.07843137254903,
196.07843137254903: B4^196.07843137254903,
196.07843137254903: C5^196.07843137254903,
4901.9607843137255`;
const playBackgroundTune = playTune(backgroundTune, Infinity);

setLegend(
  [ player, bitmap`
.......0........
......020.......
.....02220......
....0202020.....
...022222220....
....0200020.....
.....02220......
......020.......
...00..0..00....
....00.0.00.....
.....00000......
.......0........
.......0........
.....00000......
.....0...0......
.....0...0......`],
  [ floor, bitmap`
333C3333333C3333
333C3333333C3333
333C3333333C3333
CCCCCCCCCCCCCCCC
3333333C3333333C
3333333C3333333C
3333333C3333333C
CCCCCCCCCCCCCCCC
333C3333333C3333
333C3333333C3333
333C3333333C3333
CCCCCCCCCCCCCCCC
3333333C3333333C
3333333C3333333C
3333333C3333333C
CCCCCCCCCCCCCCCC` ],
  [ Pizza, bitmap`
................
....99999999....
...9333333339...
..933666666339..
.93366666666339.
.93666066666339.
.93666666606639.
.93666666666639.
.93066666066639.
.93666666666639.
.93666066660639.
.93366666666339.
..933666666339..
...9333333339...
....99999999....
................` ]
)

setSolids([player])

let level = 0
const levels = [
  map`
p......
.......
....m..
.......
.......
.......
.......`
]

setMap(levels[level])

setBackground(floor)

setPushables({
  [ player ]: []
})

onInput("w", () => {
  console.log(getFirst(player).y);
  getFirst(player).y -= 1
})

onInput("s", () => {
  console.log(getFirst(player).y);
  getFirst(player).y += 1
})

onInput("d", () => {
  console.log(getFirst(player).x);
  getFirst(player).x += 1
})

onInput("a", () => {
  console.log(getFirst(player).x);
  getFirst(player).x -= 1
})

let score = 0;
addText(`Score: ${score}`, {x: 10, y: 0, color:color`2`});

const PizzaSprite = getFirst(Pizza);

function randomizeCoordinatesPizza() {
  PizzaSprite.x = Math.floor(Math.random() * 7);
  PizzaSprite.y = Math.floor(Math.random() * 7);
  addText(`Score: ${score}`, {x: 10, y: 0, color:color`2`});
}

let seconds = 60;
addText(`Time: ${seconds}`, {x: 10, y: 1, color:color`2`});

function countdown() {
  const timer = setInterval(() => {
    seconds--;
    addText(`Time: ${seconds}`, {x: 10, y: 1, color:color`2`});
    
    if (seconds == 0) {
      clearInterval(timer);
      clearText();
      addText(`Time's up!`, {x: 6, y: 7, color:color`2`});
      addText(`You caught`, {x: 6, y: 8, color:color`2`});
      addText(`${score} Pizzas!`, {x: 7, y: 9, color:color`2`});
      playBackgroundTune.end();
    }
  }, 1000)
}

randomizeCoordinatesPizza();
countdown();

afterInput(() => {
  if(tilesWith(Pizza, player).length >= 1) {
    score++;
    playTune(PizzaSound);
    randomizeCoordinatesPizza();
  };
  
})
