/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Coffee Game
@author: Joanne Park
@description: Complete as many orders as you can! Combine the different ingredients into the cup to
complete an order and send it in! Here is the drink recipes:
Latte: Milk + Espresso
Ice Latte: Milk + Espresso + Ice
Espresso: Espresso
Ice Americano: Ice + Water + Espresso
Americano: Water + Espresso
Click D to send. Click W to empty the cup. Click J for milk. Click I for ice. 
Click L for water. Click K for espresso.
@addedOn: 2026-01-06
*/

const player = "p"
const background = "b"
const play = "c"
const cup = "e"
const i = "i"
const w = "w"
const m = "m"
const e = "s"
const c = "o"
const g = "g"


setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`], 
  [ play, bitmap`
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
  [ cup, bitmap`
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
  [ i, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ w, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ e, bitmap`
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
  [ m, bitmap`
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
2222222222222222`],
  [ c, bitmap`
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
  [g, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
)
setBackground(w)
let counter = 0
let o = []
const order = ["Latte", "Espresso", "Americano", "Ice Latte", "Ice Americano"]
let item = setOrder()
const levels = [
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`,
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....eeee............
...ebbbbe...........
...ebbbbeeee........
...eebbee..e........
bbbeeeeeeeeebbbbbbbb
bbbbeeeebbbbbbbbbbbb`,
  map`
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`
]

setMap(levels[0])
addText("Coffee Game", {x: 2, y: 4, color: color`C` });
addText("Use the buttons \nto add espresso,\nmilk, water, or \nice to make\ndrinks!!", { x: 2, y: 5, color: color`2` });
addText("Press S to start", {x: 2, y: 11, color: color`3` });

onInput("s", () => {
  setMap(levels[1])
  setBackground(play)
  clearText()
  let timeLeft = 60;
  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearText()
      clearInterval(timer);
      setMap(levels[2])
      addText("Time's up!", { x: 5, y: 6, color: color`2` });
      addText("Your score is\n    " + counter, { x: 4, y: 7, color: color`3` });
      return;
    }
    clearText()
    addText("Score: "+ counter, {
      x: 1,
      y: 2,
      color: color`3`
    });
    let text = "You have " + timeLeft + "secs"
    addText(text, {
      x: 2,
      y: 1,
      color: color`2`
    });
    addText("Order:" + item, {x: 1, y: 3, color: color`6`});
    addText("  w\nempty", {x: 3, y: 4, color: color`D`});
    addText("  d\nsend", {x: 3, y: 7, color: color`6`});
    addText(" i\nice", {x: 13, y: 5, color: color`5`});
    addText("  l\nwater", {x: 15, y: 7, color: color`7`});
    addText("   k\nespresso", {x: 11, y: 9, color: color`0`});
    addText(" j\nmilk", {x: 10, y: 7, color: color`2`});

    timeLeft--;
  }, 1000)
})

function setOrder(){
  let orderNum = Math.floor(Math.random()*5);
  let orders = order[orderNum];
  return orders
}
onInput("i", () => {
    o.push("ice")
    if (o.includes("ice") && o.includes("milk") && o.includes("ess")){
      iceLatte()
    }else if (o.includes("ice") && o.includes("milk") && o.includes("water")){
      eww()
    }else if (o.includes("ice") && o.includes("water") && o.includes("ess")){
      iceAmer()
    }else if (o.includes("ice") && o.includes("water")){
      iceWater()
    }else if (o.includes("ice") && o.includes("ess")){
      iceEss()
    }else if (o.includes("ice") && o.includes("milk")){
      iceMilk()
    }else if(o.includes("ice")){
      ice()
    }else{
      eww()
    }      
})
onInput("j", () => {
    o.push("milk")
    if (o.includes("ice") && o.includes("milk") && o.includes("ess")){
      iceLatte()
    }else if (o.includes("ice") && o.includes("milk") && o.includes("water")){
      eww()
    }else if (o.includes("milk") && o.includes("water")){
      eww()
    }else if (o.includes("milk") && o.includes("ess")){
      latte()
    }else if (o.includes("ice") && o.includes("milk")){
      iceMilk()
    }else if(o.includes("milk")){
      milk()
    }else{
      eww()
    }
})
onInput("l", () => {
    o.push("water")
    if (o.includes("water") && o.includes("ess") && o.includes("ice")){
      iceAmer()
    }else if (o.includes("milk") && o.includes("water")){
      eww()
    }else if (o.includes("water") && o.includes("ess")){
      amer()
    }else if (o.includes("ice") && o.includes("water")){
      iceWater()
    }else if(o.includes("water")){
      water()
    }else{
      eww()
    }
})
onInput("k", () => {
    o.push("ess")
    if (o.includes("ice") && o.includes("milk") && o.includes("ess")){
      iceLatte()
    }else if (o.includes("water") && o.includes("ess") && o.includes("ice")){
      iceAmer()
    }else if (o.includes("milk") && o.includes("ess")){
      latte()
    }else if (o.includes("ess") && o.includes("water")){
      amer()
    }else if (o.includes("ice") && o.includes("ess")){
      iceEss()
    }else if(o.includes("ess")){
      ess()
    }else{
      eww()
    }
})

onInput("w", () => {
    o = []
    empty()
  })

onInput("d", () => {
    for (let i = 0; i < item.length; i++) {
      console.log(i)
      console.log(o[i]);
    }
    counter++;
    let tf = checkOrder(o,item)
    if (tf){
      item = setOrder()
    }
    o = []
    empty()
})
function ice(){
  clearTile(4,11)
  clearTile(5,12)
  clearTile(5,10)
  clearTile(6,11)
  clearTile(6,12)
  clearTile(7,11)
  addSprite(4,11,i);
  addSprite(5,12,i);
  addSprite(5,10,i);
  addSprite(6,11,i);
  addSprite(6,12,i);
  addSprite(7,11,i);
}
function water(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,w)
  addSprite(5,10,w)
  addSprite(6,10,w)
  addSprite(7,10,w)
  addSprite(4,11,w)
  addSprite(5,11,w)
  addSprite(6,11,w)
  addSprite(7,11,w)
  addSprite(5,12,w)
  addSprite(6,12,w)
}
function milk(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,m)
  addSprite(5,10,m)
  addSprite(6,10,m)
  addSprite(7,10,m)
  addSprite(4,11,m)
  addSprite(5,11,m)
  addSprite(6,11,m)
  addSprite(7,11,m)
  addSprite(5,12,m)
  addSprite(6,12,m)
  
}
function ess(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,e)
  addSprite(5,10,e)
  addSprite(6,10,e)
  addSprite(7,10,e)
  addSprite(4,11,e)
  addSprite(5,11,e)
  addSprite(6,11,e)
  addSprite(7,11,e)
  addSprite(5,12,e)
  addSprite(6,12,e)
}
function iceMilk(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,m)
  addSprite(5,10,m)
  addSprite(6,10,m)
  addSprite(7,10,m)
  addSprite(4,11,m)
  addSprite(5,11,m)
  addSprite(6,11,m)
  addSprite(7,11,m)
  addSprite(5,12,m)
  addSprite(6,12,m)
  clearTile(4,11)
  clearTile(5,12)
  clearTile(5,10)
  clearTile(6,11)
  clearTile(7,11)
  addSprite(4,11,i);
  addSprite(5,12,i);
  addSprite(5,10,i);
  addSprite(6,11,i);
  addSprite(7,11,i);
}
function iceLatte(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,c)
  addSprite(5,10,c)
  addSprite(6,10,c)
  addSprite(7,10,c)
  addSprite(4,11,i)
  addSprite(5,11,c)
  addSprite(6,11,c)
  addSprite(7,11,i)
  addSprite(5,12,c)
  addSprite(6,12,c)
  clearTile(5,10)
  clearTile(6,11)
  addSprite(5,10,m);
  addSprite(6,11,m);
  
}
function iceWater(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,w)
  addSprite(5,10,w)
  addSprite(6,10,w)
  addSprite(7,10,w)
  addSprite(4,11,w)
  addSprite(5,11,w)
  addSprite(6,11,w)
  addSprite(7,11,w)
  addSprite(5,12,w)
  addSprite(6,12,w)
  clearTile(4,11)
  clearTile(5,12)
  clearTile(5,10)
  clearTile(6,11)
  clearTile(7,11)
  addSprite(4,11,i);
  addSprite(5,12,i);
  addSprite(5,10,i);
  addSprite(6,11,i);
  addSprite(7,11,i);
}
function iceEss(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,e)
  addSprite(5,10,e)
  addSprite(6,10,e)
  addSprite(7,10,e)
  addSprite(4,11,e)
  addSprite(5,11,e)
  addSprite(6,11,e)
  addSprite(7,11,e)
  addSprite(5,12,e)
  addSprite(6,12,e)
  clearTile(4,11)
  clearTile(5,12)
  clearTile(5,10)
  clearTile(6,11)
  clearTile(7,11)
  addSprite(4,11,i);
  addSprite(5,12,i);
  addSprite(5,10,i);
  addSprite(6,11,i);
  addSprite(7,11,i);
}
function iceAmer(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,c)
  addSprite(5,10,c)
  addSprite(6,10,c)
  addSprite(7,10,c)
  addSprite(4,11,c)
  addSprite(5,11,c)
  addSprite(6,11,c)
  addSprite(7,11,c)
  addSprite(5,12,c)
  addSprite(6,12,c)
  clearTile(4,11)
  clearTile(5,12)
  clearTile(5,10)
  clearTile(7,11)
  addSprite(4,11,i);
  addSprite(5,12,i);
  addSprite(5,10,i);
  addSprite(7,11,i);
}
function latte(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,c)
  addSprite(5,10,c)
  addSprite(6,10,c)
  addSprite(7,10,c)
  addSprite(4,11,c)
  addSprite(5,11,c)
  addSprite(6,11,c)
  addSprite(7,11,c)
  addSprite(5,12,c)
  addSprite(6,12,c)
  clearTile(5,10)
  clearTile(6,11)
  addSprite(5,10,m);
  addSprite(6,11,m);
}
function amer(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,c)
  addSprite(5,10,c)
  addSprite(6,10,c)
  addSprite(7,10,c)
  addSprite(4,11,c)
  addSprite(5,11,c)
  addSprite(6,11,c)
  addSprite(7,11,c)
  addSprite(5,12,c)
  addSprite(6,12,c)
}
function eww(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,g)
  addSprite(5,10,g)
  addSprite(6,10,g)
  addSprite(7,10,g)
  addSprite(4,11,g)
  addSprite(5,11,g)
  addSprite(6,11,g)
  addSprite(7,11,g)
  addSprite(5,12,g)
  addSprite(6,12,g)
}

function icewater(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,w)
  addSprite(5,10,w)
  addSprite(6,10,w)
  addSprite(7,10,w)
  addSprite(4,11,w)
  addSprite(5,11,w)
  addSprite(6,11,w)
  addSprite(7,11,w)
  addSprite(5,12,w)
  addSprite(6,12,w)
  clearTile(4,11)
  clearTile(5,12)
  clearTile(5,10)
  clearTile(6,11)
  clearTile(7,11)
  addSprite(4,11,i);
  addSprite(5,12,i);
  addSprite(5,10,i);
  addSprite(6,11,i);
  addSprite(7,11,i);
}
function empty(){
  clearTile(4,10)
  clearTile(5,10)
  clearTile(6,10)
  clearTile(7,10)
  clearTile(4,11)
  clearTile(5,11)
  clearTile(6,11)
  clearTile(7,11)
  clearTile(5,12)
  clearTile(6,12)
  addSprite(4,10,background)
  addSprite(5,10,background)
  addSprite(6,10,background)
  addSprite(7,10,background)
  addSprite(4,11,background)
  addSprite(5,11,background)
  addSprite(6,11,background)
  addSprite(7,11,background)
  addSprite(5,12,background)
  addSprite(6,12,background)
}
function checkOrder(o,item){
  let list = o;
  let itemm = item;
  if (itemm == "Latte"){
    if (list.includes("milk") && list.includes("ess") && list.length == 2){
      addText("Yum!", { x: 3, y: 13, color: color`4` });
      return true
    }else{
      addText("Ewww!", { x: 3, y: 13, color: color`3` });
      return false
    }
  }else if (itemm == "Espresso"){
    if (list.includes("ess") && list.length == 1){
      addText("Yum!", { x: 3, y: 13, color: color`4` });
      return true
    }else{
      addText("Ewww!", { x: 3, y: 13, color: color`3` });
      return false
    }
  }if (itemm == "Americano"){
    if (list.includes("water") && list.includes("ess") && list.length == 2){
      addText("Yum!", { x: 3, y: 13, color: color`4` });
      return true
    }else{
      addText("Ewww!", { x: 3, y: 13, color: color`3` });
      return false
    }
  }else if (itemm == "Ice Latte"){
    if (list.includes("milk") && list.includes("ess") && list.includes("ice") && list.length == 3){
      addText("Yum!", { x: 3, y: 13, color: color`4` });
      return true
    }else{
      addText("Ewww!", { x: 3, y: 13, color: color`3` });
      return false
    }
  }else if (itemm == "Ice Americano"){
    if (list.includes("water") && list.includes("ess") && list.includes("ice") && list.length == 3){
      addText("Yum!", { x: 3, y: 13, color: color`4` });
      return true
    }else{
      addText("Ewww!", { x: 3, y: 13, color: color`3` });
      return false
    }
  }
  
}