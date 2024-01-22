/*
@title: Snowman_Escape
@author: Michael Q
@tags: ['puzzle']
@img: ""
@addedOn: 2024-01-18

Instructions:
Rocks are pushable.
If there are any blue circles, a rock must cover them for the goal to work.
Move with "WASD", reset the level using "J"

You are a snowman, you have just escaped the confines of somebody's garden.
For some reason, there are obstacles (including strangely placed deadly lasers).
*/

const player = "p";
const rock = "r";
const machine = "m";
const laser = "l";
const wallOne = "1";
const wallTwo = "2";
const wallThree = "3";
const background = "b";
const goal = "g"
const toggle = "t"

setLegend(
  [player, bitmap`
.....LLLLLL.....
....L222222L....
....L200200L....
....L200200L....
...HL222222L....
...HLL2222L.....
...HHHLLLHHH..C.
..CLHHHHHH2LCC..
.C.L2HH0222L.C..
...L22H2222L....
...L22H2022L....
....L222222L....
....L222022L....
....LL2222LL....
.....LLLLLL.....
......L..L......`],
  [rock, bitmap`
................
................
................
......55555.....
.....5575755....
...55577577555..
..5577757557775.
.557775777777755
.577777777777775
5577777777777775
5777577777757775
5777757757775575
5577775577777755
.577757777777755
.557777777777555
..555555555555..`],
  [machine, bitmap`
...3.099990.....
....3.09900.....
.....30990......
.....009900.....
...0003993000...
..030339933030..
.00303999930300.
0030339999330300
0300399999930030
0303399999933030
0303999999993030
0303999999993030
0303399999933030
0030339999330300
.00003333330000.
...0000000000...`],
  [laser, bitmap`
...3.099990.....
...3.099990.....
....3099990.....
.....099990.....
.....099990.....
.....099990.....
.....0999903....
.....099990.3...
.....099990.3...
.....099990.3...
.....0999903....
.....099933.....
.....093390.....
.....339990.....
....3099990.....
...3.099990.....`],
  [wallOne, bitmap`
..55555555555555
..57777777777775
.557777777777775
5575777777777775
5777577777777775
5775757777777775
5757777777777775
5777777777777555
5777777777755775
5777777775577775
5777777777777775
5777777777777775
5777777777777775
5777577777777775
5755777777777555
55555555555555..`],
  [wallTwo, bitmap`
5555555555555555
5777777777777775
5777777777777555
57755777777755..
555777777775755.
5757777777577755
5775777777777775
5777777577777775
5777777757777775
5777555577777775
5775777777757775
5757777777757775
5775777757577775
5577777775777775
.577777777557775
.555555555555555`],
  [wallThree, bitmap`
555555555555555.
5777777777777555
5777777777757575
5777777777775775
5577777777757775
5755777777757775
5777557777777775
5777777777777775
5777777777777775
5777777777777775
5777777775577775
5777777777755775
5777777777577555
5777777775777775
5777777775777555
55555555555555..`],
  [background, bitmap`
2222222222222222
2222222222221222
2222222222222122
2211222222222222
2212222212222222
2222222222222222
2222222222222222
2222222222222212
2222222222222222
2222122222222222
2222212221122222
2222222222122222
2222222222222222
2122222222222212
2222222122222122
2222221122222222`],
  [goal, bitmap`
.....DDDDDD.....
...DDDDDDDDDD...
..DDDDDDDDDDDD..
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDD..
...DDDDDDDDDD...
.....DDDDDD.....`],
  [toggle, bitmap`
.....555555.....
...5577777755...
..577777777775..
.57777777777775.
.57777777777775.
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
.57777777777775.
.57777777777775.
..577777777775..
...5577777755...
.....555555.....`],
)

setSolids([player,rock,machine,wallOne,wallTwo,wallThree])

let level = 0;


const levels = [
  map`
3233121
213...g
p.r..23
1231m12`,
  map`
231221231
1p.g.r.t2
321231322`,
  map`
3213112
2.g..t3
1.pr..1
1332m.2
2212..2
3121211`,
  map`
333333311
3......g1
3.r.....1
333.....1
3pm...1m1
333333311`,
  map`
23333333331
2.........1
2.pr......3
2.....mmm.2
22231.....3
t...rg....1
2231m222222`,
  map`
211211
2p..g3
1....2
11r.t2
3...31
3.mm.3
1....1
223122`,
  map`
231312211133
2..........1
3..........2
1.pr....m..1
1......m.m.1
231122..m..3
t....rg....1
23213m311322`,
  map`
..........
..........
...m..m...
..........
.12331122.
.1......1.
..3....1..
...1123...
..........
2312113331
1p......g2
1211332211`,
];

setMap(levels[level])

setBackground(background)

setPushables({
  [player]: [rock, machine],
  [rock]: [rock, machine],
  [machine]: [machine, rock],
});


onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => { 
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    addLasers()
  }
});

function addLasers() {
  let machines = getAll(machine);

  for (let object = 0; object < machines.length; object++) {
    for (let i = 0; i < machines[object].y; i++) {
      const x = machines[object].x
      const y = machines[object].y - (1 + i)

      const tile = getTile(x, y)
      const playerb = getFirst(player)
      const goalb = getFirst(goal)

      if (tile.length == 0) {
        addSprite(x, y, laser)
      }
        
      /*There is definitely a better way to do this, */
      /*but all things I tried didn't work because JS scares me*/
        
      else if (playerb.x == x && playerb.y == y && goalb.x == x && goalb.y == y) {
        addSprite(x, y, laser)
      }
      else if (playerb.x == x && playerb.y == y && goalb.x == x && goalb.y == y) {
        addSprite(x, y, laser)
      }
      else if (playerb.x == x && playerb.y == y && tile.length < 2) {
        addSprite(x, y, laser)
      }
      else if (goalb.x == x && goalb.y == y && tile.length < 2) {
        addSprite(x, y, laser)
      }
      else {
        break
      }
    }
  }
}

function clearLasers() {
  let lasers = getAll(laser)
  for (let i = 0; i < lasers.length; i++) {
    lasers[i].remove()
  }
}

addLasers()

afterInput(() => {
  clearLasers()
  addLasers()
  
  if (tilesWith(player, laser).length > 0) {
    const currentLevel = levels[level]; // get the original map of the level
  
    // make sure the level exists before we load it
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
      addLasers()
    }
      return
  }

  const toggles = getAll(toggle)

  if (tilesWith(player, goal).length > 0 && tilesWith(toggle, rock).length === toggles.length) {
    level += 1
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      addLasers()
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})
