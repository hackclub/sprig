# sticky paddles

## Link

https://gamelab.hackclub.com/?id=b5fe336ec5a35442a64fdb373dfe535e

## Problem

```
const e = createEngine(gameCanvas, 300, 300);

e.add({
  sprite: paddle,
  solid: true,
  scale: 4,
  x: 11,
  update: (me) => {

  }
})

e.add({
  sprite: paddle,
  solid: true,
  scale: 4,
  x: 268,
  update: (me) => {

  }
})

e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 334, 270);

const wallSpacing = 10;

e.add({
  sprite: paddle,
  solid: true,
  scale: 4,
  x: wallSpacing,
})

e.add({
  sprite: paddle,
  solid: true,
  scale: 4,
  origin: [1, 0],
  x: e.width - wallSpacing,
})

e.start();
```
