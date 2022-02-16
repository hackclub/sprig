# only one jump

## Link

https://gamelab.hackclub.com/?id=a653579c8ae71b41c8d72a1683c37bc0

## Problem

```
const e = createEngine(gameCanvas, 320, 300);

e.addText("spam space to hit your head on the spike", 168, 78)
e.addText("can you make it so you can't jump midair", 169, 101);
e.addText("and impale yourself?", 169, 115);

let jumps = 0;

/* BEGIN PLAYER */
e.add({
  sprite: knight,
  scale: 4,
  x: 125, 
  y: 112,
  solid: true,
  update: (me, them) => {
    me.vy += 0.3;
    if (e.pressedKey(" ")) {
      me.vy -= 5.3;
      jumps--;
    } 
  },
  collides(me, thing) {
    jumps = 1;
  }
});
/* END PLAYER */

/* BEGIN TILE */
e.add({
  sprite: tile,
  scale: 3, 
  x: 110,
  y: 203,
  solid: true,
});
/* END TILE */

/* BEGIN SPIKE */
e.add({
  sprite: spike,
  scale: 3,
  x: 128,
  y: -6,
  collides(me, player) { /* ouch! */
    e.remove(player);
  }
});
/* END SPIKE */

e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 320, 300);

e.addText("spam space to hit your head on the spike", 168, 78)
e.addText("can you make it so you can't jump midair", 169, 101);
e.addText("and impale yourself?", 169, 115);

let jumps = 0;

/* BEGIN PLAYER */
e.add({
  sprite: knight,
  scale: 4,
  x: 125, 
  y: 112,
  solid: true,
  update: (me, them) => {
    me.vy += 0.3;
    if (jumps > 0 && e.pressedKey(" ")) {
      me.vy -= 5.3;
      jumps--;
    } 
  },
  collides(me, thing) {
    jumps = 1;
  }
});
/* END PLAYER */

/* BEGIN TILE */
e.add({
  sprite: tile,
  scale: 3, 
  x: 110,
  y: 203,
  solid: true,
});
/* END TILE */

/* BEGIN SPIKE */
e.add({
  sprite: spike,
  scale: 3,
  x: 128,
  y: -6,
  collides(me, player) { /* ouch! */
    e.remove(player);
  }
});
/* END SPIKE */

e.start();
```
