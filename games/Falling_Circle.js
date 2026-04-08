/*
@title: Falling Circle
@author: A
@tags: []
@addedOn: 2026-02-11
*/

const player = "p"
var combo = 0
var time_on_bottom = 0

setLegend(
  [ player, bitmap`
................
.......000......
.......0.0......
......0...0.....
......0...0.....
.......0.0......
.......000......
................` ]
)

setSolids([])

let level = `
p.
..`

setMap(level)

addText(combo.toString(), {x: 4, y: 4, color: color`5`});

addText(time_on_bottom.toString(), {x: 15, y: 4, color: color`3`});

addText("Controls: J + K", {x: 2, y: 1, color:color`0`})

setPushables({
  [ player ]: []
})

onInput("j", () => {
  if (getFirst(player).y == 1 && getFirst(player).x == 0) {
    playTune(tune`500: c4~500;`);
    combo += 1
    getFirst(player).remove();
    addSprite(Math.floor(Math.random() * 2), 0, player);
    time_on_bottom = 0
  } else {
    playTune(tune`300: c3-300;
300: a2-300;`)
    combo = 0
    time_on_bottom = 0
  }
})

onInput("k", () => {
  if (getFirst(player).y == 1 && getFirst(player).x == 1) {
    playTune(tune`500: c4~500;`);
    combo += 1
    getFirst(player).remove();
    addSprite(Math.floor(Math.random() * 2), 0, player);
    time_on_bottom = 0
  } else {
    playTune(tune`300: c3-300;
300: a2-300;`)
    combo = 0
    time_on_bottom = 0
  }
})

afterInput(() => {
  clearText();
  
  if (combo >= 15) {
    addText(combo.toString(), {x: 4, y: 4, color: color`3`});
  } else {
    addText(combo.toString(), {x: 4, y: 4, color: color`5`});
  }

  addText(time_on_bottom.toString(), {x: 15, y: 4, color: color`3`});
})

setInterval(() => {
  const p = getFirst(player);
  p.y += 1

  if (p.y == 1) {
    time_on_bottom += 1
    addText((4 - time_on_bottom).toString(), {x: 15, y: 4, color: color`3`});

    if (time_on_bottom > 3) {
      combo = 0
      time_on_bottom = 0
      addText(time_on_bottom.toString(), {x: 15, y: 4, color: color`3`});
      if (combo >= 15) {
        addText(combo.toString(), {x: 4, y: 4, color: color`3`});
      } else {
        addText(combo.toString(), {x: 4, y: 4, color: color`5`});
      }
    }
  } else {
    time_on_bottom = 0
    addText(time_on_bottom.toString(), {x: 15, y: 4, color: color`3`});
  }
}, 1000);
