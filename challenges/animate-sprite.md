# animate sprite

## Link

https://gamelab.hackclub.com/?id=b19577800e2b5995664c8ff247af6ad1

## Problem

```
const e = createEngine(gameCanvas, 300, 300);

/* make a space called "frame" and put 0 in it */
let frame = 0;

/* every 250 milliseconds (four times a second) increment frame */
setInterval(() => frame++, 250);

/* BEGIN PLAYER */
e.add({
  x: 150,
  y: 150,
  scale: 5,
  /* put the center of the player at that X and Y */
  origin: [0.5, 0.5],
  update(player) {
         if (frame == 0) player.sprite = player_run_0;
    else if (frame == 1) player.sprite = player_run_1;
    else if (frame == 2) player.sprite = player_run_2;
    /* we don't have any more frames, so restart animation next update */
    else frame = 0;
  }
})
/* END PLAYER */

e.start();
```

## One Answer

```
const e = createEngine(gameCanvas, 300, 300);

/* make a space called "frame" and put 0 in it */
let frame = 0;

/* every 250 milliseconds (four times a second) increment frame */
setInterval(() => frame++, 250);

/* BEGIN PLAYER */
e.add({
  x: 150,
  y: 150,
  scale: 5,
  /* put the center of the player at that X and Y */
  origin: [0.5, 0.5],
  update(player) {
         if (frame == 0) player.sprite = player_run_0;
    else if (frame == 1) player.sprite = player_run_1;
    else if (frame == 2) player.sprite = player_run_2;
    else if (frame == 3) player.sprite = player_run_3;
    /* we don't have any more frames, so restart animation next update */
    else frame = 0;
  }
})
/* END PLAYER */

e.start();
```
