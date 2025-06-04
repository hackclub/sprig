/*

@title: spleef
@author: henwy
@tags: [spleef, 2 players]
@addedOn: 2025-05-23
*/

const player1 = "1"
const player2 = "2"
const pit = "p"

setLegend(
  [player1, bitmap`
5555555555555555
5..............5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5.555555555555.5
5..............5
5555555555555555`],
  [player2, bitmap`
3333333333333333
3..............3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3.333333333333.3
3..............3
3333333333333333`],
  [pit, bitmap`
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
)

setSolids([player1, player2, ])

let level = 0
const levels = [
  map`
..........
.1........
..........
..........
..........
..........
..........
..........
........2.
..........`
]

setMap(levels[level])

player1pos = [1, 1]
player2pos = [9, 9]

var time = 0
var timer = 3000
function clock() {
  setInterval(() => {
    time++
  }, timer)
} 

function movePlayer(player, translate){
  let currentPlayer = (player === 1 ? getFirst(player1) : getFirst(player2));

    if (currentPlayer) {
        let newX = currentPlayer.x + translate[0];
        let newY = currentPlayer.y + translate[1];

        if (newX >= 0 && newX < width() && newY >= 0 && newY < height()) {

            addSprite(currentPlayer.x, currentPlayer.y, pit);

            currentPlayer.x = newX;
            currentPlayer.y = newY;

            if (player === 1) {
                player1pos = [newX, newY];
            } else {
                player2pos = [newX, newY];
            }
        }
    }
}

function checkValid(player, translate){
  if (player == 1) {
  x = translate[0] + getFirst(player1).x;
  y = translate[1] + getFirst(player1).y;
  } else {
  x = translate[0] + getFirst(player2).x;
  y = translate[1] + getFirst(player2).y;
  } 
  if (x > 10 || x < 0 || y > 10 || y < 0) {
    return false
  }
  return true
}


function checkKill(player) {
    const tiles = getTile(getPos(player, 0), getPos(player, 1));
    const hasPit = tiles.some(sprite => sprite.type === pit);
    
    if (hasPit) {
        addText("GAME OVER", {
          x: 6,
          y: 4,
          color: color`3`
        })

        for (i=0;i<10;i++) {
          for (k=0;k<10;k++) {
              clearTile(i, k);
          }
        }

      setTimeout(() => {
          player1pos = [1, 1];
          player2pos = [9, 9];
          setMap(levels[level]);
          clearText();
        }, 3000);

    }
}

function getPos(player, value) {
    if (player == player1) {
      return player1pos[value];
    } else {
      return player2pos[value];
    }
}

  onInput("w", () => {
    movePlayer(1, [0, -1])
    checkKill(player1);
  })
  onInput("a", () => {
    movePlayer(1, [-1, 0])
    checkKill(player1);
  })
  onInput("s", () => {
    movePlayer(1, [0, 1])
    checkKill(player1);
  })
  onInput("d", () => {
    movePlayer(1, [1, 0])
    checkKill(player1);
  })
  onInput("i", () => {
    movePlayer(2, [0, -1])
    checkKill(player2);
  })
  onInput("j", () => {
    movePlayer(2, [-1, 0])
    checkKill(player2);
  })
  onInput("k", () => {
    movePlayer(2, [0, 1])
  })
  onInput("l", () => {
    movePlayer(2, [1, 0])
    checkKill(player2);
  })