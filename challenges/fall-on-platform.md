# fall on platform

## Link

https://gamelab.hackclub.com/?id=ee9668ca099c7ec8c7087d9c5253e04a

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
