/*
@title: Coin Clash
@author: PhyoTP
@tags: ['multiplayer', 'turn-based', 'strategy']
@addedOn: 2024-10-04
*/

const playerOne = "1";
const playerTwo = "2";
const wall = "w";
const star = "s";
const target = "t";
const up = "u";
const left = "l";
const down = "d";
const right = "r";
let countOne = 0;
let countTwo = 0;
let oneTurn = true;
let clicked = [];
const directions = [up, left, down, right];
setLegend(
  [ up, bitmap`
................
.......33.......
......3333......
....33333333....
...333.33.333...
..33...33...33..
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................`],
  [ left, bitmap`
................
................
.....3..........
....33..........
...33...........
...33...........
..33............
.33333333333333.
.33333333333333.
..33............
...33...........
...33...........
....33..........
.....3..........
................
................`],
  [ down, bitmap`
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
..33...33...33..
...333.33.333...
....33333333....
......3333......
.......33.......
................`],
  [ right, bitmap`
................
................
..........3.....
..........33....
...........33...
...........33...
............33..
.33333333333333.
.33333333333333.
............33..
...........33...
...........33...
..........33....
..........3.....
................
................`],
  [ playerOne, bitmap`
.....FFFFFF.....
...FFF6666FFF...
..FF6666F666FF..
.FF6666FF6666FF.
.F6666F6F66666F.
FF666F66F66666FF
F6666666F666666F
F6666666F666666F
F6666666F666666F
F6666666F666666F
FF666666F66666FF
.F666FFFFFFF66F.
.FF6666666666FF.
..FF66666666FF..
...FFF6666FFF...
.....FFFFFF.....` ],
  [ playerTwo, bitmap`
.....LLLLLL.....
...LLL1111LLL...
..LL11111111LL..
.LL1111111111LL.
.L11111LLL1111L.
LL1111L11LL111LL
L111111111L1111L
L111111111L1111L
L11111111L11111L
L1111111L111111L
LL11111L111111LL
.L1111LLLLL111L.
.LL1111111111LL.
..LL11111111LL..
...LLL1111LLL...
.....LLLLLL.....` ],
  [ target, bitmap`
....33333333....
...3222222223...
..322222222223..
.32223333332223.
3222333333332223
3223333333333223
3223333333333223
3223333333333223
3223333333333223
3223333333333223
3223333333333223
3222333333332223
.32223333332223.
..322222222223..
...3222222223...
....33333333....`],
  [ wall, bitmap`
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
  [ star, bitmap`
.......66.......
.......66.......
......6666......
.....666666.....
.....666666.....
.66666666666666.
6666666666666666
6666666666666666
..666666666666..
...6666666666...
..666666666666..
..66666..66666..
..6666....6666..
.6666......6666.
.666........666.
.66..........66.`],
)

setSolids([playerOne, playerTwo]);

let level = 0;
const levels = [
  map`
............
............
..wwwwwwww..
..w1.....w..
..w......w..
..w......w..
..w......w..
..w......w..
..w.....2w..
..wwwwwwww..
............
............`,
  map`..`,
  map`.`
]

setMap(levels[level]);
addSprite(0,0,star)
setPushables({
  [ playerOne ]: [ playerTwo ],
  [ playerTwo ]: [ playerOne ]
})
function move(bool, button1, button2, pos, isX){
  let player = getFirst(bool ? playerOne : playerTwo);
  if (oneTurn == bool){
    if (clicked.at(-1) == button2){
      let i = 0;
      let go = setInterval(()=>{
        if (clicked[i]){
          switch (clicked[i]){
            case "w":
              getFirst(playerOne).y -= 1;
              break;
            case "i":
              getFirst(playerTwo).y -= 1;
              break;
            case "a":
              getFirst(playerOne).x -= 1;
              break;
            case "j":
              getFirst(playerTwo).x -= 1;
              break;
            case "s":
              getFirst(playerOne).y += 1;
              break;
            case "k":
              getFirst(playerTwo).y += 1;
              break;
            case "d":
              getFirst(playerOne).x += 1;
              break;
            case "l":
              getFirst(playerTwo).x += 1;
          }
        }else{
          oneTurn = !bool;
          clicked = [];
          if (bool){
            clearTile(0,0);
            addSprite(11,0,star);
          }else{
            clearTile(11,0);
            addSprite(0,0,star);
          }
          clear(i);
        }
        if (((getFirst(playerOne).x < 2 || getFirst(playerOne).x > 9)&&(getFirst(playerTwo).x < 2 || getFirst(playerTwo).x > 9))||((getFirst(playerOne).y < 2 || getFirst(playerOne).y > 9)&&(getFirst(playerTwo).x < 2 || getFirst(playerTwo).x > 9))){
          addText("Tie");
          oneTurn = null;
          clear(i);
        }else if ((getFirst(playerOne).x < 2 || getFirst(playerOne).x > 9)||(getFirst(playerOne).y < 2 || getFirst(playerOne).y > 9)){
          addSprite(4,0,"2");
          addText("Wins", {x: 9,y: 0});
          oneTurn = null;
          clear(i);
        }else if ((getFirst(playerTwo).x < 2 || getFirst(playerTwo).x > 9)||(getFirst(playerTwo).y < 2 || getFirst(playerTwo).y > 9)){
          addSprite(4,0,"1");
          addText("Wins", {x: 9, y: 0});
          oneTurn = null;
          clear(i);
        }
        i++;
      },50)
      let clear = (i) => {
        getFirst(target).remove();
        for (i of directions) if (getFirst(i)) getFirst(i).remove();
        clearInterval(go);
      }
    
    }else{
      if (clicked.length < 7){
        clicked.push(button1);
        if (getFirst(target)){
          for (i of directions) if (getFirst(i)) getFirst(i).remove();
          switch (button1){
            case "w":
            case "i":
              addSprite(player.x,player.y+pos,up);
              getFirst(target).y+=pos;
              break;
            case "a":
            case "j":
              addSprite(player.x-pos,player.y,left);
              getFirst(target).x-=pos;
              break;
            case "s":
            case "k":
              addSprite(player.x,player.y+pos,down);
              getFirst(target).y+=pos;
              break;
            case "d":
            case "l":
              addSprite(player.x-pos,player.y,right);
              getFirst(target).x-=pos;
          }
        }else{
          isX ? addSprite(player.x-pos,player.y,target) : addSprite(player.x,player.y+pos,target);
        }
      }
    }
  }
}
onInput("s", () => {
  move(true, "s", "w", 1, false);
})
onInput("w", () => {
  move(true, "w", "s", -1, false);
})
onInput("a", () => {
  move(true, "a", "d", 1, true);
})
onInput("d", () => {
  move(true, "d", "a", -1, true);
})
onInput("k", () => {
  move(false, "k", "i", 1, false);
})
onInput("i", () => {
  move(false, "i", "k", -1, false);
})
onInput("j", () => {
  move(false, "j", "l", 1, true);
})
onInput("l", () => {
  move(false, "l", "j", -1, true);
})
afterInput(() => {
  
})
