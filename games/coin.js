/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: coin
@author: 
@tags: []
@addedOn: 2024-00-00
*/


//CHANGE ME FOR MULTIPLIER 
let multiplier = 0.04











const player = "p"
const background = "b"
const coin1 = "z", coin2 = "x", coin3 = "c", tnt = "t"
const coin_eat = tune`
500: B4~500 + D5~500 + E5^500 + G5^500,
15500`
const tnt_eat = tune`
500: G4~500 + E4^500 + E5-500,
15500`
let score = 0

setLegend(
  [ player, bitmap`
................
................
..33333333333...
...6.......6....
...6..666..6....
...6.6...6.6....
...6.6...6.6....
...6.6...6.6....
...6..666..6....
...6...6...6....
...666666666....
.......6........
....6666666.....
....6.....6.....
....6.....6.....
....6.....6.....` ],
  [ background, bitmap`
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
1111111111111111
1111111LLLLLLLLL
1111111LLLLLLLLL
1111111LLLLLLLLL
1111111LLLLLLLLL
1111111111111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11LLLLLL
LLLLLLLL11LLLLLL
1111111111LLLLLL
1111111111LLLLLL` ],
  [background, bitmap`
1101111111111011
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
0000000000000000
1111101111111101
LLLLL0LLLLLLLL0L
LLLLL0LLLLLLLL0L
0000000000000000
1011111111011111
L0LLLLLLLL0LLLLL
L0LLLLLLLL0LLLLL
0000000000000000
1111011111111101
LLLL0LLLLLLLLL0L
LLLL0LLLLLLLLL0L
0000000000000000`],
  [ coin1, bitmap`
................
................
.....777777.....
...7777777777...
...7777777777...
..7777....7777..
..777......777..
..777......777..
..777......777..
..777......777..
..7777....7777..
...7777777777...
...7777777777...
.....777777.....
................
................` ],
  [ coin2, bitmap`
................
................
.....999999.....
...9999999999...
...9999999999...
..9999....9999..
..999......999..
..999......999..
..999......999..
..999......999..
..9999....9999..
...9999999999...
...9999999999...
.....999999.....
................
................` ],
  [ coin3, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..3333....3333..
..333......333..
..333......333..
..333......333..
..333......333..
..3333....3333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
  [ tnt, bitmap`
........0006....
.......00.......
.....330033.....
...3333333333...
...3333333333...
..666363363666..
..363366363363..
..363363663363..
..363363363363..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
)
setBackground(background)
setSolids([player])

let level = 0
const levels = [
  map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
......p......`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
//Input Logic
onInput("d", () => {
  getFirst(player).x += 1//Moving right
})
onInput("a",() => {
  getFirst(player).x -= 1
})
//Coin1 Gravity
function coin_drop1(){
  addText(score.toString(), {y: 1, color: "2" });
  getAll(coin1).forEach(sprite => {
    sprite.y += 1;
    if (sprite.y == 9){
      const catch_coin1 = tilesWith(player, coin1).length;
      if(catch_coin1 == 1){
        score += 1
        playTune(coin_eat)

        console.log(score)
      }
      sprite.remove();
    }
  });
}
//Coin2 Gravity
function coin_drop2(){
  addText(score.toString(), {y: 1, color: "2" });
  getAll(coin2).forEach(sprite => {
    sprite.y += 1;
    if (sprite.y == 9){
      const catch_coin2 = tilesWith(player, coin2).length;
      if(catch_coin2 == 1){
        score += 2
        playTune(coin_eat)
        console.log(score)
      }
    sprite.remove();
    }
    
  });
}
//Coin3 Gravity
function coin_drop3(){
  addText(score.toString(), {y: 1, color: "2" });
  getAll(coin3).forEach(sprite => {
    sprite.y += 1;
    if (sprite.y == 9){
      const catch_coin3 = tilesWith(player, coin3).length;
      if(catch_coin3 == 1){
        score += 3
        playTune(coin_eat)
        console.log(score)
      }
              sprite.remove();
    }
  });
}
//tnt Gravity
function tnt_drop(){
  addText(score.toString(), {y: 1, color: "2" });
  getAll(tnt).forEach(sprite => {
    sprite.y += 1;
    if (sprite.y == 9){
      const catch_tnt = tilesWith(player, tnt).length;
      if(catch_tnt == 1){
        score -= 5
        playTune(tnt_eat)

        console.log(score)
      }
      sprite.remove();
    }
  });
}



function getRandomElement(arr) { //Used to choose a random coin
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function spawn_coins(){//Spawn the coins innn!
  
  var random0_9 = (Math.floor(Math.random() * 13));
  let coins = ["z","x","c","t"];
  let chose_coin = getRandomElement(coins)  

  if (score > 1/multiplier){
    amplifer = score * multiplier
  }
  else{
    amplifer = 1
  }
  console.log("amplifer: ",amplifer)
  if (chose_coin == "z"){
    addSprite(random0_9, 0, coin1)
  }
  else if (chose_coin == "x"){
    addSprite(random0_9, 0, coin2)
  }
  else if (chose_coin == "c"){
    addSprite(random0_9, 0, coin3)
  }
  else if (chose_coin == "t"){
    addSprite(random0_9, 0, tnt)
  }
  console.log(chose_coin)
  
}
let amplfier = 1;

spawn_coins()
setInterval(spawn_coins,1200)
setInterval(coin_drop1, 400 / amplifer)//gravity
setInterval(coin_drop2, 200 / amplifer)//gravity
setInterval(coin_drop3, 100 / amplifer)//gravity
setInterval(tnt_drop, 200 / amplifer)//gravity
afterInput(() => {
  
})

addText(score.toString(), {y: 1, color: "2" });
