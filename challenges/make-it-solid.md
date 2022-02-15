# Make it Solid

## Link

https://gamelab.hackclub.com/?id=140c3988464c7ea2e8981c73398348d8

## Problem

```
const e = createEngine(gameCanvas, 296, 248);

e.add({
  sprite: player,
  scale: 3,
  x: 88,
  update: (me, them) => {
    me.vy += 3;
  }
})

e.add({
  sprite: floor,
  scale: 3,
  x: 69, 
  y: 202
})



e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 296, 248);

e.add({
  sprite: player,
  solid: true,
  scale: 3,
  x: 88,
  update: (me, them) => {
    me.vy += 3;
  }
})

e.add({
  sprite: floor,
  solid: true,
  scale: 3,
  x: 69, 
  y: 202
})



e.start();
```