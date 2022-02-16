# touch to collect

## Link

https://gamelab.hackclub.com/?id=971f2e635d6f5ebb8197c170ca01dc17

## Problem

```
const e = createEngine(gameCanvas, 300, 300);

e.addText("press space to jump over spike", 150, 90)
e.addText("can you make the coin collectable?", 150, 106);

/* BEGIN PLAYER */
e.add({
  x: 0,
  y: 180,
  scale: 5,
  sprite: knight,
  update(player) {
    // GRAVITY
    if (player.y < 180) {
      player.vy += 0.4;
    } else {
      player.vy = 0;
    }
    
    // WALKING
    if (e.heldKey('ArrowRight')) {
      player.x += 3;
    }

    // JUMPING
    if (e.pressedKey(' ')) {
      player.vy -= 12;
    }
  }
});
/* END PLAYER */

/* BEGIN SPIKE */
e.add({
  x: 135,
  y: 243,
  scale: 2,
  sprite: spike,
  collides(me, player) {
    e.remove(player);
  }
})
/* END SPIKE */

/* BEGIN COIN */
e.add({
  x: 231,
  y: 235,
  scale: 4,
  sprite: coin,
});
/* END COIN */

e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 300, 300);

e.addText("press space to jump over spike", 150, 90)
e.addText("can you make the coin collectable?", 150, 106);

/* BEGIN PLAYER */
e.add({
  x: 0,
  y: 180,
  scale: 5,
  sprite: knight,
  update(player) {
    // GRAVITY
    if (player.y < 180) {
      player.vy += 0.4;
    } else {
      player.vy = 0;
    }
    
    // WALKING
    if (e.heldKey('ArrowRight')) {
      player.x += 3;
    }

    // JUMPING
    if (e.pressedKey(' ')) {
      player.vy -= 12;
    }
  }
});
/* END PLAYER */

/* BEGIN SPIKE */
e.add({
  x: 135,
  y: 243,
  scale: 2,
  sprite: spike,
  collides(me, player) {
    e.remove(player);
  }
})
/* END SPIKE */

/* BEGIN COIN */
e.add({
  x: 231,
  y: 235,
  scale: 4,
  sprite: coin,
  collides(me, player) {
    e.remove(me);
  }
});
/* END COIN */

e.start();
```
