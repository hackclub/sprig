/*
@title: Advanced Clicking Simulator
@author: Lun Ivanov
@tags: []
@addedOn: 2024-11-26
*/

const player = "p";
const upgrade = "u";
const downgrade = "d";
const wall = "w";

setLegend(
  [ player, bitmap`
......444.......
......4.4.......
......444.......
.....LLLLL......
....LLLLLLL.....
....L.LLL.L.....
....L.LLL.L.....
....L.LLL.L.....
....4.LLL.4.....
......111.......
......111.......
......1.1.......
......1.1.......
......1.1.......
......3.3.......
................` ],
  [ upgrade, bitmap`
................
......4444......
......4224......
......4224......
......4444......
......4444......
.44444444444444.
.42244422444224.
.42244422444224.
.44444444444444.
......4444......
......4444......
......4224......
......4224......
......4444......
................` ],
  [ downgrade, bitmap`
................
................
................
................
................
................
.33333333333333.
.30033300333003.
.30033300333003.
.33333333333333.
................
................
................
................
................
................` ],
  [ wall, bitmap`
00LLLLL00LLLLL00
0LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL0000LLLLLL
LLLLL000000LLLLL
0LLLL000000LLLL0
0LLLL000000LLLL0
LLLLL000000LLLLL
LLLLLL0000LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
0LLLLLLLLLLLLLL0
00LLLLL00LLLLL00` ]
);

setSolids([ player, wall ]);

const levels = [
  map`
.......
.......
.......
.......
.......
p......`
];
setMap(levels[0]);


let currency = 0;
let clickValue = 1;
let upgradeCost = 5;
let downgradePenalty = 1;

updateDisplay();

setInterval(spawnItem, 3000);
setInterval(spawnWalls, 5000);


onInput("w", () => { getFirst(player).y -= 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("d", () => { getFirst(player).x += 1; });

onInput("i", () => {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y);
  playerTile.forEach(sprite => {
    if (sprite.type === upgrade && currency >= upgradeCost) {
      clickValue += 1;
      currency -= upgradeCost;
      upgradeCost += 15;
      
      sprite.remove();
      addText("Upgrade Collected!", { x: 1, y: 2, color: color`2` });
      setTimeout(() => clearText(), 1000);
    }
    else if (sprite.type === downgrade) {
      clickValue = Math.max(1, clickValue - downgradePenalty); // prevent softlock (hopefully?)
      
      sprite.remove();
      addText("Downgrade Hit!", { x: 1, y: 2, color: color`4` });
      setTimeout(() => clearText(), 1000);
    }
  });
  updateDisplay();
});


onInput("j", () => {
  currency += clickValue;
  updateDisplay();
});


function updateDisplay() {
  clearText();
  addText(`Currency: ${currency}`, { x: 1, y: 1, color: color`3` });
  addText(`Click Value: ${clickValue}`, { x: 1, y: 2, color: color`3` });
  addText(`Upgrade Cost: ${upgradeCost}`, { x: 1, y: 3, color: color`6` });
  if (clickValue >= 15) {
    addText('you won, congrats!', { x: 1, y: 4, color: color`D` });
  }
}

function spawnItem() {
  const x = Math.floor(Math.random() * width());
  const y = Math.floor(Math.random() * height());

  const itemType = Math.random() < 0.7 ? upgrade : downgrade;

  if (getTile(x, y).length === 0) {
    addSprite(x, y, itemType);

    setTimeout(() => {
      if (getTile(x, y).some(sprite => sprite.type === itemType)) {
        clearTile(x, y);
      }
    }, 5000);
    
  }
}


function spawnWalls() {
  const wallCount = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < wallCount; i++) {
    const x = Math.floor(Math.random() * width());
    const y = Math.floor(Math.random() * height());

    if (getTile(x, y).length === 0) {
      addSprite(x, y, wall);

      setTimeout(() => {
        if (getTile(x, y).some(sprite => sprite.type === wall)) {
          clearTile(x, y);
        }
      }, 8000);
      
    }
  }
}


afterInput(() => {
  clickValue = Math.max(1, clickValue);
});
