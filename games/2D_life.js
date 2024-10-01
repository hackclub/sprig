/*
@title: 2D Life
@author: Leonard (Omay)
@tags: ['sandbox','simulation','retro']
@addedOn: 2022-09-25

Use "WASD" to move the selector.
Use "I" to toggle the cell that the selector is at.
Use "J" to start or stop the simulation.
Use "K" to step the simulation.
Use "L" to clear the board.

Change the const "outcomes" for new rules.
It works like this:
The part before the "/" is what qualifies a cell to be born (prefixed by a "B")
The numbers between the "B" and "/" are how many neighbors it takes to be born.
The part after the "/" is what qualifies a cell to survive (prefixed by a "S")
The numbers between the "S" and "/" are how many neighbors it takes for a cell to survive.

For instance, highlife would be "B36/S23"
*/

const outcomes = "B3/S23";
const fps = 10;

const sel = "s";
const living = "l";
const dead = "d";

setLegend(
  [sel, bitmap`
2222222222222222
2000000000000002
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
2000000000000002
2222222222222222`],
  [living, bitmap`
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
  [dead, bitmap`
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
);

setSolids([]);

const maparr = map`
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd`.trim().split('');
setMap(maparr.join(''));
addSprite(0, 0, sel);

/* plus one for newline. NOTE: does funky shit when OOB */
const maparr_get = (x, y)    => maparr[y*(width()+1) + x];
const maparr_set = (x, y, c) => maparr[y*(width()+1) + x] = c;
const maparr_render = () => {
  /* we'll add this back at the end */
  const { x: cx, y: cy } = getFirst(sel);

  setMap(maparr.join(''));

  /* add back the cursor */
  addSprite(cx, cy, sel);
}

/* precompute outcomes */
const deadOutcomes = [0,0,0,0,0,0,0,0,0];
const livingOutcomes = [0,0,0,0,0,0,0,0,0];
{
  const dO = outcomes.split("/")[0].substring(1, outcomes.split("/")[0].length);
  const lO = outcomes.split("/")[1].substring(1, outcomes.split("/")[1].length);
  for (let i = 0; i < dO.length; i++) {
    deadOutcomes[parseInt(dO.charAt(i))] = 1;
  }
  for (let i = 0; i < lO.length; i++) {
    livingOutcomes[parseInt(lO.charAt(i))] = 1;
  }
}

function step() {
  const livingNeighborMap = new Uint8Array(width() * height());
  const index = (x, y) => y*width() + x;
  const livingNeighborMapAdd = (x, y) => {
    if (x < 0) return;
    if (y < 0) return;
    if (x >= width() ) return;
    if (y >= height()) return;
    livingNeighborMap[index(x, y)] += 1;
  }
  /* go to each tile on the map,
   * increasing the tile's neighbors' living count
   * (if the tile is living) */
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (maparr_get(x, y) == living) {
        livingNeighborMapAdd(x+1, y-1); // top left
        livingNeighborMapAdd(x+1, y-0); // top center
        livingNeighborMapAdd(x+1, y+1); // top right
        livingNeighborMapAdd(x+0, y-1); // center left
        livingNeighborMapAdd(x+0, y+1); // center right
        livingNeighborMapAdd(x-1, y-1); // bottom left
        livingNeighborMapAdd(x-1, y-0); // bottom center
        livingNeighborMapAdd(x-1, y+1); // bottom right
      }
    }
  }

  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const livingNeighbors = livingNeighborMap[index(x, y)];      
      const type = maparr_get(x, y);
      
      if      ((type == living) && (livingOutcomes[livingNeighbors] == 0))
        maparr_set(x, y, dead);
      else if ((type ==   dead) && (  deadOutcomes[livingNeighbors] == 1))
        maparr_set(x, y, living);
    }
  }

  maparr_render();
}
var interval;
var running = false;
onInput("w", () => {
  getFirst(sel).y -= 1;
});
onInput("a", () => {
  getFirst(sel).x -= 1;
});
onInput("s", () => {
  getFirst(sel).y += 1;
});
onInput("d", () => {
  getFirst(sel).x += 1;
});
onInput("i", () => {
  const { x, y } = getFirst(sel);
  maparr_set(x, y, (maparr_get(x, y) == living) ? dead : living);
  maparr_render();
});
onInput("j", () => {
  if(running){
    clearInterval(interval);
  }else{
    interval = setInterval(step, 1000/fps);
  }
  running = !running;
});
onInput("k", () => {
  step();
});
onInput("l", () => {
  addSprite(0, 0, sel);
});
