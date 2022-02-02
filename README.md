# 👾 **[Hack Club Game Lab →](https://game-lab.hackclub.dev/)**

The best way to learn is by making things you care about and sharing them with others. **That's what Game Lab is all about**.

Have you ever wanted to...

- Make Pong in 30 lines of code?
- Create the Chrome dino game in 50?
- Or... even better... make a delightful game that doesn't exist yet?

Then get building with Game Lab!

You should be able to get started in Game Lab with very little experience programming but you should still be able to have fun with it even if you're an expert. Enjoy and we'd love to see what you make!

<img width="500" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149387903-eec65489-6a8d-4779-adde-2b6e35c7273a.gif">

### ⮑ _**[Click here to launch Game Lab](https://game-lab.hackclub.dev/)**_ ⮐
_(and scroll down for a brief tutorial to get started)_
!

## Tutorial / How To Get Started Building Games

Learning from functional examples is the best way to get started building games with Game Lab.

Below we have created a series of short examples with code that works, that grow from creating a character on the screen to creating a more complicated game.

Initialize the game engine (this should already be written for you when you open the editor)

```js
const e = createEngine(gameCanvas, 300, 300);
```

---

Make a character:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149362983-6f82a61c-c3d5-40b7-920f-f673c3ff2646.png">

```js
const e = createEngine(gameCanvas, 300, 300);

e.add({
  tags: ["test"],
  x: 188,
  y: 69,
  sprite: test_sprite,
  scale: 4,
})

e.start();
```

---

Add a floor with gravity:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149363706-453a45e8-d0d4-44a3-acc3-09e4bb577392.gif">

```js
const e = createEngine(gameCanvas, 300, 300);

e.add({
  tags: ["test"],
  solid: true,
  x: 135,
  y: 114,
  sprite: test_sprite,
  scale: 4,
  update(obj) {
    obj.vy += 2;
  }
})

e.add({
  tags: ["floor"],
  solid: true,
  x: -6,
  y: 283,
  sprite: floor,
  scale: 11,
})

e.start();
```

---

Add movement:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149365452-7b042996-2beb-40a8-866e-f5748b5631da.gif">

```js
const e = createEngine(gameCanvas, 300, 300);

e.add({
  tags: ["test"],
  solid: true,
  x: 135,
  y: 114,
  sprite: test_sprite,
  scale: 4,
  update(obj) {
    obj.vy += 2;
  }
})

e.add({
  tags: ["floor"],
  solid: true,
  x: -6,
  y: 283,
  sprite: floor,
  scale: 11,
})

e.start();
```

---

Add jump:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149366181-588ae196-03dd-4268-9907-9477caa8a834.gif">

```js
const e = createEngine(gameCanvas, 300, 300);

e.add({
  tags: ["test"],
  solid: true,
  x: 135,
  y: 114,
  sprite: test_sprite,
  scale: 4,
  collides(me, them) {
    if (e.pressedKey(" ")) {
      if (them.hasTag("floor")) me.vy -= 19;
    }
  },
  update(obj) {
    obj.vy += 2;

    if (e.heldKey("ArrowLeft")) obj.x -= 3;
    if (e.heldKey("ArrowRight")) obj.x += 3;
  }
})

e.add({
  tags: ["floor"],
  solid: true,
  x: -6,
  y: 283,
  sprite: floor,
  scale: 11,
})

e.start();
```

---

Add platforms:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149367516-7edb2780-edbd-4977-9a07-dcfbf47fcf93.gif">

```js
const e = createEngine(gameCanvas, 300, 300);
const ctx = e.ctx;

e.add({
  tags: ["player"],
  sprite: test_sprite,
  scale: 3,
  solid: true,
  x: 50,
  y: 16,
  collides(me, them) {
    if (them.hasTag("platform")) me.vx = them.vx;
    
    if (e.pressedKey(" ")) {
      if (them.hasTag("platform")) me.vy -= 11;
    }
  },
  update: (obj) => {
      obj.ay = 0.4;
  
      if (e.heldKey("ArrowLeft")) obj.x -= 3;
      if (e.heldKey("ArrowRight")) obj.x += 3;
  },
})

const addPlatform = (x, y) => e.add({
  tags: ["platform"],
  sprite: floor,
  scale: 3,
  solid: true,
  x: x,
  y: y,
  vx: -1,
  bounce: -1,
  update: (obj) => {
      if (obj.x < 0) obj.vx = 1;
      if (obj.x + obj.width > e.width) obj.vx = -1
  },
})

addPlatform(50, 200);
addPlatform(20, 100);

e.start();
```

---

Add a background:

<img width="333" alt="Screen Shot 2022-01-13 at 11 21 43 AM" src="https://user-images.githubusercontent.com/27078897/149368356-c343a214-0d31-4d5f-a2d4-d0575b18047b.png">

```js
const e = createEngine(gameCanvas, 300, 300);

e.add({
  update() {
    e.ctx.fillStyle = "pink";
    e.ctx.fillRect(0, 0, e.width, e.height);
  }
})

e.start();
```

---

Add collisions:

<img width="333" alt="Screen Shot 2022-01-13 at 11 21 43 AM" src="https://user-images.githubusercontent.com/27078897/149369879-7d384b3a-2f15-4816-a59e-76b56bb9a944.gif">

```js
const e = createEngine(gameCanvas, 300, 300);
const ctx = e.ctx;

e.add({
  tags: ["player"],
  sprite: test_sprite,
  scale: 2,
  x: 150,
  y: 50,
  update: (obj) => {
    if (e.heldKey("ArrowUp")) obj.y -= 3;
    if (e.heldKey("ArrowDown")) obj.y += 3;
  },
})

e.add({
  tags: ["target"],
  sprite: floor,
  scale: 3,
  x: 112,
  y: 232,
  collides(me, them) {
    if (them.hasTag("player")) e.remove("target");
  }
})

e.start();
```

---

Refer to the following example for all the available object properties:

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
  origin: [0, 0], // x: 0 - 1, y: 0 - 1, "left|center|right top|center|bottom", "center"
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

## Tiny Games

__WARNING!!! These examples are made in an older version of Game Lab. See if you can fix them to work with the new version. See below if you want to run an older version of Game Lab__

[Pong-ish](https://game-lab.hackclub.dev/?file=recZMaBjgnNXgZsUK)

[Pong-ish in Old Game Lab](https://game-lab-server-1.maxwofford.repl.co/0.1.0/?file=recZMaBjgnNXgZsUK)

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149371012-faf3e45f-9d3a-47d4-831b-566d9171d2bd.gif">

---

[Crappy Birds](https://game-lab.hackclub.dev/?file=recJX7dAboz7v1OFG)

[Crappy Birds in Old Game Lab](https://game-lab-server-1.maxwofford.repl.co/0.1.0/?file=recJX7dAboz7v1OFG)

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149380918-a1855ab3-cc2d-4a9a-adc0-d5316d6f17ba.gif">

---

[Brick Broken](https://game-lab.hackclub.dev/?file=rec6bdF7IS7vY7xzl)

[Brick Broken in Old Game Lab](https://game-lab-server-1.maxwofford.repl.co/0.1.0/?file=rec6bdF7IS7vY7xzl)

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/150606449-5b73d7fe-f2d3-432f-9cc5-346c20919ec8.gif">

## HELP: My game used to work but now it doesn't?

This could be because you made your game in an old version of Game Lab.

Game Lab is in active development. We want to make sure you can play the games you make even if they aren't compatible with the newest version of the editor. If you made a game and need to run it on an old version of Game Lab you can use this site: https://game-lab-server-1.maxwofford.repl.co/[SEMANTIC_VERSION]/index.html

For example the first release of Game Lab is available here: https://game-lab-server-1.maxwofford.repl.co/0.1.0/index.html

## Philosophy

As we said before people learn best when they make things that they care about which they can share with others. This learning philosophy is called [constuctionism](https://en.wikipedia.org/wiki/Constructionism_(learning_theory)) and Game Lab is a type of microworld. It's an environment where you can discover programming by using it to express yourself. 

Game Lab could also be considered a minimalist [fantasy console](https://en.wikipedia.org/wiki/Fantasy_video_game_console#:~:text=A%20fantasy%20video%20game%20console,their%20fictional%20hardware%20will%20have.) sort of like [Pico-8](https://www.lexaloffle.com/pico-8.php).

## Development

Join `#gamelab-dev` on the [Hack Club Slack](https://hackclub.com/slack/) to join the development discussion

The Hack Club Game Lab requires a local HTTP server to run in development. Here's how to get it running on your own machine.

Clone repo:

    $ git clone https://github.com/hackclub/game-lab

Start a local HTTP server inside the repo:

    $ cd game-lab/
    $ python3 -m http.server 3000

And then go to http://localhost:3000 in your web browser, and it should work!

## License

The Hack Club Game Lab is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.
