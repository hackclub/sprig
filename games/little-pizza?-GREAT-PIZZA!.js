/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: little pizza? GREAT PIZZA!
@author: nickyisonline
@tags: ['pizza','endless']
@addedOn: 2025-02-23

This is my first time writing code using javascript syntax so it was a bit confusing for me, i could've definetely done
something more elegant but the game works and it's about the coolest thing in the world: pizza.
First of many ideas i have!!
*/

const pizza = "1"
const pizzaTom = "2"
const pizzaChe = "3"
const pizzaTomChe = "4"
const pizzaM = "5"
const pizzaTomM = "6"
const pizzaCheM = "7"
const pizzaTomCheM = "8"
const tomatoes = "t"
const cheese = "c"
const mushrooms = "m"
const sel = "s"
const yes = "y"
const no = "n"


setLegend(
  [ pizza, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaM, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0CCLLCCCCCCLLCC0
0CCLLCCCCCCLLCC0
0CCCCCCCCCCCCCC0
0CCCCCCLLCCCCCC0
0CCCCCCLLCCLLCC0
0CCCCCCCCCCLLCC0
0CCCCCCLLLCLLCC0
0CCLLCCLLLCCCCC0
0CCLLCCCCCCCCCC0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaTom, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0C333333333333C0
0C333333333333C0
0C333333333333C0
0C333333333333C0
0C333333333333C0
0C333333333333C0
0C333333333333C0
0C333333333333C0
0C333333333333C0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaTomM, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0C333333333333C0
0C3333333LL333C0
0C3LL3333LL333C0
0C3LL333333333C0
0C333333333333C0
0C3333LL333LL3C0
0C3333LL333LL3C0
0C333333333333C0
0C333333333333C0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaChe, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0C66C66CCCCCCCC0
0CCCC66CC666CCC0
0CCCCCCCCCCCCCC0
0CCC666CC66CCCC0
0CCCCCCCCCCCCCC0
0CCCCCC666C66CC0
0CCC66C666C66CC0
0CCC66CCCCCCCCC0
0CCCCCCCCCCCCCC0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaCheM, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0C66C66CCCCCCCC0
0CCCC66CC666CCC0
0CCCCCCLLLCCCCC0
0CLL666LLL6CLLC0
0CLLCCCCCCCCLLC0
0CCCCCC6LLC66CC0
0CCC66C6LLC66CC0
0CCC66CCCCCLLCC0
0CCCCCCCCCCLLCC0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaTomChe, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0C663663333333C0
0C333663366633C0
0C333333333333C0
0C336663366333C0
0C333333333333C0
0C333336663663C0
0C336636663663C0
0C336633333333C0
0C333333333333C0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ pizzaTomCheM, bitmap`
................
..000000000000..
.0CCCCCCCCCCCC0.
0C663663333333C0
0C3336633LL633C0
0C3333333LL333C0
0C3LL663366333C0
0C3LL333333333C0
0C333336663663C0
0C33663LL63663C0
0C33663LL33333C0
0C333333333333C0
.0CCCCCCCCCCCC0.
..000000000000..
................
................` ],
  [ tomatoes, bitmap`
................
..000000........
.03333330.......
.03333330.......
.03333330.......
.033333300000...
.0333333033330..
..0000003333330.
......033333330.
...000033333330.
..0333033333330.
..0333033333330.
..033300333330..
...000..00000...
................
................` ],
  [ cheese, bitmap`
................
.00000..0000000.
.06660..0666660.
.00000000666660.
..0666660000000.
..0006660000....
....00000660....
......066660....
...000000000000.
...06660.066660.
..006660.066660.
..0660000000000.
..0660006666660.
..0660066666660.
..0000000000000.
................` ],
  [ mushrooms, bitmap`
................
.22.........22..
.22.........LL..
.LL...22....LL..
.LL...LL........
......LL..22....
..........LL....
..........LL....
..22............
..LL...22.......
..LL...LL.......
.......LL...22..
............LL..
............LL..
................
................` ],
  [ yes, bitmap`
................
................
............DDD.
...........DDD..
...........DD...
..........DDD...
.........DDD....
........DDD.....
.DDD...DDD......
..DDD..DD.......
...DD.DDD.......
....DDDD........
....DDD.........
.....D..........
................
................` ],
  [ no, bitmap`
................
.3..........333.
.33........333..
..33.......33...
..333....3333...
...333..3333....
....333.333.....
.....33333......
......333.......
......33333.....
....33333333....
...3333..3333...
...3333....33...
.3333.......33..
.33..........33.
................` ],
  [ sel, bitmap`
4444444444444444
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4444444444444444` ]
)

setSolids([])

let level = 0
const levels = [
  map`
tcmy
....
....
....`
]
let wins = 0;
let looses = 0;
onInput("a", () => {
  getFirst(sel).x -= 1
})
onInput("d", () => {
  getFirst(sel).x += 1
})
onInput("l", () => {
  if(getFirst(sel).x == 0){
    pizzaContains[0] = !pizzaContains[0]
    drawPizza();
  }
    if(getFirst(sel).x == 1){
    pizzaContains[1] = !pizzaContains[1]
    drawPizza();
  }
    if(getFirst(sel).x == 2){
    pizzaContains[2] = !pizzaContains[2]
    drawPizza();
  }
      if(getFirst(sel).x == 3){
    checkPizza();
  }
})


setPushables({
//  [ player ]: []
})

pizzaContains = [false,false,false]; //TOMATOES CHEESE MUSHROOMS
pizzaMustContain = [false,false,false];

function newPizzaOrder(){
   clearText();
  var randomBoolean;
  for(let i = 0; i < 3; i++){
    randomBoolean = Math.random() < 0.5
    pizzaMustContain[i] = randomBoolean;
    pizzaContains[i] = false;
  }
  var order = "NEW ORDER\n";
  if(pizzaMustContain[0] == false){
    order = order + "NO TOMATOES\n";}
  else{
    order = order + "WITH TOMATOES\n";
  }
  if(pizzaMustContain[1] == false){
    order = order + "NO CHEESE\n";}
  else{
    order = order + "WITH CHEESE\n";
  }
  if(pizzaMustContain[2] == false){
    order = order + "NO OLIVES\n";}
  else{
    order = order + "WITH OLIVES\n";
  }
  addText(order, { x: 2,y: 4, color: color`0`})
  addText("GOOD " + wins + " BAD " + looses, { x: 2,y: 15, color: color`0`})
}

function checkPizza(){
  
  let w = true;
   for(let i = 0; i < 3; i++){
    if(pizzaMustContain[i] != pizzaContains[i]){
      w = false;
    } 
  }
  if(w== true){
    console.log("w")
    wins = wins + 1;
  }
  else{
    console.log("L")
    looses = looses + 1;
  }

 
  newPizzaOrder();
  drawPizza();
}
function drawPizza(){
  clearTile(1,2);
  if(pizzaContains[0] == false && pizzaContains[1] == false && pizzaContains[2] == false){
    addSprite(1,2,'1')
  }
  if(pizzaContains[0] == true && pizzaContains[1] == false && pizzaContains[2] == false){
    addSprite(1,2,'2')
  }
  if(pizzaContains[0] == false && pizzaContains[1] == true && pizzaContains[2] == false){
    addSprite(1,2,'3')
  }
  if(pizzaContains[0] == true && pizzaContains[1] == true && pizzaContains[2] == false){
    addSprite(1,2,'4')
  }
  if(pizzaContains[0] == false && pizzaContains[1] == false && pizzaContains[2] == true){
    addSprite(1,2,'5')
  }
  if(pizzaContains[0] == true && pizzaContains[1] == false && pizzaContains[2] == true){
    addSprite(1,2,'6')
  }
  if(pizzaContains[0] == false && pizzaContains[1] == true && pizzaContains[2] == true){
    addSprite(1,2,'7')
  }
  if(pizzaContains[0] == true && pizzaContains[1] == true && pizzaContains[2] == true){
    addSprite(1,2,'8')
  }
}



newPizzaOrder();
setMap(levels[0])
addSprite(0,0,'s')
drawPizza();