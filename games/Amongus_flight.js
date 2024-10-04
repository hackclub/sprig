/*
@title: Amongus flight
@author: Yashas
@tags: ['endless']
@addedOn: 2023-01-04
*/

const amongus = "p";
const blocker = "w";
const tiles = "b";

setLegend(
  [ amongus, bitmap`
................
................
.....33333......
....3333333.....
....3333333333..
....3333322223..
.3333333322223..
.3333333333333..
.3333333333.....
.3333333333.....
.3333333333.....
....3333333.....
....3333333.....
....3333333.....
....33..333.....
................`],
  [ tiles, bitmap`
2222222222222222
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2222222222222222`],
  [ blocker, bitmap`
555555333DDD4442
5555C53333DD4442
L555533332DD4402
6L55673332DD0042
6L5565733D204445
66L556C3302D4452
666L563C0C266572
6665L30066C27772
6666L06C1D5C7772
666535115512C772
666551L6C1124C72
666115LC61112472
611555CL61112447
166555CCC1112442
666555CCC1114242
666555CCC1114242` ]
);

setMap( map`
www.wwww
........
........
........
........
........
.p......
........` );
setBackground(tiles);

var opening = 3;
var mph = 350;
var points = 0;
var death = false;

setPushables({
  [ amongus ]: [],
});

onInput("d", () => {
  if (!death) {
    getFirst(amongus).x += 1
  }
});

onInput("a", () => {
  if (!death) {
    getFirst(amongus).x -= 1
  }
});

function genblocker() {
  opening = Math.floor(Math.random() * 8);
  for (let x=0; x < 8; x++) {
    if (x != opening) {
      addSprite(x, 0, blocker);
    }
  }

  points++;
}

function gameLoop() {
  addText(`points: ${points}`, {x: 9, y: 14,color: color`0`})
    
getAll(blocker).forEach((w) => {
    if (w.y == 7) {
      w.remove();
    } else {
      w.y += 1;
    };
  });

  if (getAll(blocker).length == 0) {
    genblocker();
  }

  if (getFirst(blocker).y == getFirst(amongus).y && getFirst(amongus).x != opening) {
      lost();
  } 
  mph -= 2;
  if (!death) {
    setTimeout(gameLoop, mph);
  }
}



function lost() {
  death = true;
  // console.log("You lost");
  setMap(map`
........
........
........
........
........
........
........
........`);
  clearText();
  addText("Fatality", {x: 5, y: 6, color: color`0`})
  addText(`Points: ${points}`, {x: 5, y: 9, color: color`0`})
}

gameLoop();
