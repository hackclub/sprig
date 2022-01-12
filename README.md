## Hack Club Game Lab

sort of like a fantasy console, really just js

### Minimal Examples

initialize engine
```js
const canvas = document.querySelector(".game-canvas");
const e = createEngine(canvas, 300, 300);
```

add background
```js
e.add({
  update() {
    e.ctx.fillStyle = "pink";
    e.ctx.fillRect(0, 0, e.width, e.height);
  }
})
```

add character
```js
e.add({
  sprite: sprite_name
})
```

example using most features
```js
e.add({
  tags: ["tag-name"],
  solid: true,
  x: 178,
  y: 126,
  vx: 1,
  vy: 3,
  ax: 0,
  ay: 0,
  sprite: ball,
  scale: 2,
  bounce: 1,
  collides(me, them) {
    if (them.hasTag("tag-name")) {
      me.vx *= 1.3;
      me.vy *= 1.3;
    }
  },
  update: (obj) => {
    if (e.heldKey("ArrowDown")) obj.y += 3;
    if (e.pressedKey("ArrowUp")) obj.y -= 3;

    if (obj.y < 0) obj.vy *= -1;
    if (obj.y > e.height - obj.height) obj.vy *= -1;
    if (obj.x < 0) {
      e.end();
      e.addText("Blue Wins", e.width/2, e.height/2, { color: "blue", size: 32 })
    }

    if (obj.x > e.width - obj.width) {
      e.end();
      e.addText("Red Wins", e.width/2, e.height/2, { color: "red", size: 32 })
    }
  },
})
```