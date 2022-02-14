# fall on platform

## Link

https://gamelab.hackclub.com/?id=402f1ed5054a8b4a790d306be0621142

## Problem

```
const e = createEngine(gameCanvas, 300, 300);

e.add({
  sprite: player,
  solid: true,
  scale: 4,
  update: (me) => {
    me.vy += 3;
  }
})

e.add({
  sprite: floor,
  solid: true,
  scale: 9,
  y: 236,
  x: 219
})

e.start();
```

## One Answer

```
const e = createEngine(gameCanvas, 300, 300);

e.add({
  sprite: player,
  solid: true,
  scale: 4,
  update: (me) => {
    me.vy += 3;
  }
})

e.add({
  sprite: floor,
  solid: true,
  scale: 9,
  y: 236,
  x: 10
})

e.start();
```
