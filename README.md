# 👾 **[Hack Club Game Lab →](https://gamelab.hackclub.com/)**

The best way to learn is by making things you care about and sharing them with others.  
**That's what Game Lab is all about**.

Have you ever wanted to...

- Make Pong in 30 lines of code?
- Create the Chrome dino game in 50?
- Or... even better... make a delightful game that doesn't exist yet?

Then get started making games with Game Lab!

You should be able to get started in Game Lab with very little experience programming. Even if you're an expert, you should still be able to have fun with it. We hope you enjoy it, and we can't wait to see what you make!

### ⮑ _**[Click here to launch Game Lab](https://gamelab.hackclub.com/)**_ ⮐
_(and scroll down for a brief tutorial to get started)_
!

## Tutorial / How To Get Started Building Games

Learning from functional examples is the best way to get started building games with Game Lab.

Below we have created a series of short examples that grow from creating a character on the screen to creating a more complicated game.

Initialize the game engine (this may already be written for you when you open the editor):

```js
const engine = createEngine(gameCanvas, 300, 300);
```

---

Make a character:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149362983-6f82a61c-c3d5-40b7-920f-f673c3ff2646.png">

```js
const engine = createEngine(gameCanvas, 300, 300);

engine.add({
  x: 188,
  y: 69,
  sprite: player, // you'll need to create a sprite named "player" in the editor
                  // (you can name it anything, just change the name here too)
  scale: 4, // this makes the sprite larger than its default 32 x 32 pixel size
            // try changing this number to see what happens
})

engine.start();
```

---

Add a floor with gravity:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149363706-453a45e8-d0d4-44a3-acc3-09e4bb577392.gif">

```js
const engine = createEngine(gameCanvas, 300, 300);

engine.add({
  solid: true, // the solid property makes this object collideable
  x: 135,
  y: 114,
  sprite: player,
  scale: 4,
  update: (me) => { // update runs every frame
    me.vy += 50; // adding velocity every frame is acceleration
  }
})

engine.add({
  solid: true, // the solid property makes this object collideable
  x: -6,
  y: 283,
  sprite: floor, // you will need to create a new sprite called "floor"
  scale: 11,
})

engine.start();
```

---

Add movement:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149365452-7b042996-2beb-40a8-866e-f5748b5631da.gif">

```js
const engine = createEngine(gameCanvas, 300, 300);

engine.add({
  solid: true,
  x: 135,
  y: 114,
  sprite: player,
  scale: 4,
  update: (me) => {
    me.vy += 50;

    // we can add key inputs by checking the keys in the update loop
    if (engine.heldKey("ArrowLeft")) me.x -= 3;
    if (engine.heldKey("ArrowRight")) me.x += 3; 
  }
})

engine.add({
  solid: true,
  x: -6,
  y: 283,
  sprite: floor,
  scale: 11,
})

engine.start();
```

---

Add jump:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149366181-588ae196-03dd-4268-9907-9477caa8a834.gif">

```js
const engine = createEngine(gameCanvas, 300, 300);

engine.add({
  tags: ["player"], // we can add tags so we can reference objects
  solid: true,
  x: 135,
  y: 114,
  sprite: player,
  scale: 4,
  collides: (me, them) => { // this runs when we collide with another object
    if (engine.pressedKey(" ")) {
      // here we are checking if we are standing on the floor
      if (them.hasTag("floor")) me.vy -= 80;
    }
  },
  update: (me) => {
    me.vy += 50;

    if (engine.heldKey("ArrowLeft")) me.x -= 3;
    if (engine.heldKey("ArrowRight")) me.x += 3;
  }
})

engine.add({
  tags: ["floor"], // we can add tags so we can reference objects
  solid: true,
  x: -6,
  y: 283,
  sprite: floor,
  scale: 11,
})

engine.start();
```

---

Add platforms:

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149367516-7edb2780-edbd-4977-9a07-dcfbf47fcf93.gif">

```js
const engine = createEngine(gameCanvas, 300, 300);

engine.add({
  tags: ["player"],
  sprite: player,
  scale: 3,
  solid: true,
  x: 50,
  y: 16,
  collides: (me, them) => {
    if (them.hasTag("platform")) me.vx = them.vx;
    
    if (engine.pressedKey(" ")) {
      if (them.hasTag("platform")) me.vy -= 50;
    }
  },
  update: (me) => {
      me.vy += 0.4;
  
      if (engine.heldKey("ArrowLeft")) me.x -= 3;
      if (engine.heldKey("ArrowRight")) me.x += 3;
  },
})

// we can use a function to make multiple instances of an object
const addPlatform = (x, y) => engine.add({
  tags: ["platform"],
  sprite: floor,
  scale: 3,
  solid: true,
  x: x,
  y: y,
  vx: -40,
  bounce: -1, // bounce determines how much velocity changes when we collide with something
  update: (me) => {
      if (me.x < 0) me.vx = 40;
      if (me.x + me.width > engine.width) me.vx = -40
  },
})

addPlatform(50, 200);
addPlatform(20, 100);

engine.start();
```

---

Removing objects:

<img width="333" alt="Screen Shot 2022-01-13 at 11 21 43 AM" src="https://user-images.githubusercontent.com/27078897/149369879-7d384b3a-2f15-4816-a59e-76b56bb9a944.gif">

```js
const engine = createEngine(gameCanvas, 300, 300);

engine.add({
  tags: ["player"],
  sprite: test_sprite,
  scale: 2,
  x: 150,
  y: 50,
  update: (me) => {
    if (engine.heldKey("ArrowUp")) me.y -= 3;
    if (engine.heldKey("ArrowDown")) me.y += 3;
  },
})

engine.add({
  tags: ["target"],
  sprite: floor,
  scale: 3,
  x: 112,
  y: 232,
  collides: (me, them) => {
    if (them.hasTag("player")) {
      engine.remove("target"); // we can remove objects by their tag name
    }
  }
})

engine.start();
```

---

Add a background:

<img width="333" alt="Screen Shot 2022-01-13 at 11 21 43 AM" src="https://user-images.githubusercontent.com/27078897/149368356-c343a214-0d31-4d5f-a2d4-d0575b18047b.png">

```js
const e = createEngine(gameCanvas, 300, 300);

engine.add({
  update: () => { // we can also draw on the game canvas
    engine.ctx.fillStyle = "pink";
    engine.ctx.fillRect(0, 0, e.width, e.height);
  }
})

engine.start();
```

---

__Adding Tunes__

To add tunes, background music, beeps and boops to your game first make a tune asset in the asset editor. You can then play the asset as such:

```js
// To play a tune once
playTune(tune_asset_name);

// or play multiple toons
playTune(tune_0, tune_1, tune_2);


// To play a tune on repeat:
loopTune(tune_asset_name);

// or loop multiple toons
loopTune(tune_0, tune_1, tune_2);
```

To stop a tune on repeat:

```js
const tuneToStop = loopTune(tune_asset_name);
tuneToStop.end();
```
___

__All Object Properties__

Refer to the following example for all the available object properties:

```js
engine.add({
  tags: ["tag-name"], // assign tags to later reference object
  solid: true, // add solid property to make object bump into other solids
  x: 178, // x position
  y: 126, // y position
  vx: 40, // x velocity
  vy: 100, // y velocity
  sprite: ball,
  scale: 2,
  rotate: 90, // rotate by some degrees
  bounce: 1, // how much velocity is lost on collisions
  origin: [0, 0], // this moves the origin of the object
  collides: (me, them) => { // function run on collision
    if (them.hasTag("tag-name")) {} // check tag names to figure out what you've collided with
  },
  update: (me) => {
    if (engine.heldKey("ArrowDown")) me.y += 3; // add key inputs
    if (engine.pressedKey("ArrowUp")) me.y -= 3; // add key inputs

    if (me.x < 0) {
      engine.end(); // end the game
      engine.addText("Game Over", engine.width/2, engine.height/2, { color: "blue", size: 32 }) // add text
    }
  },
})
```

## Tiny Games

[Pong-ish](https://gamelab.hackclub.com/?id=8da8700aeb32e508ad0b31836c5cc093)

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149371012-faf3e45f-9d3a-47d4-831b-566d9171d2bd.gif">

---

[Crappy Birds](https://gamelab.hackclub.com/?id=c47297ab3703f57d85d115b7cca8f34e)

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/149380918-a1855ab3-cc2d-4a9a-adc0-d5316d6f17ba.gif">

---

[Brick Broken](https://gamelab.hackclub.com/?id=60638924dda1114388e1c23b431232da)

<img width="345" alt="Screen Shot 2022-01-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/27078897/150606449-5b73d7fe-f2d3-432f-9cc5-346c20919ec8.gif">

## My game used to work but now it doesn't?

This could be because you made your game in an old version of Game Lab.

Game Lab is in active development. We want to make sure you can play the games you make even if they aren't compatible with the newest version of the editor. If you made a game and need to run it on an old version of Game Lab you can use this site: 

`https://gamelab-versions.hackclub.dev/[SEMANTIC_VERSION]/index.html`

For example the first release of Game Lab is available here: 

https://gamelab-versions.hackclub.dev/0.1.0/index.html


## Philosophy

As we have said previously, people learn best when they make things that they care about, which they can then share with others. This type of learning philosophy is called [constructionism](https://en.wikipedia.org/wiki/Constructionism_(learning_theory)), and Game Lab is a type of microworld. A microworld is an environment where you can discover programming by using it to express yourself.

Game Lab could also be considered a minimalist [fantasy console](https://en.wikipedia.org/wiki/Fantasy_video_game_console#:~:text=A%20fantasy%20video%20game%20console,their%20fictional%20hardware%20will%20have.) sort of like [Pico-8](https://www.lexaloffle.com/pico-8.php).

## Development

Join `#gamelab-dev` on the [Hack Club Slack](https://hackclub.com/slack/) to join the development discussion

The Hack Club Game Lab requires a local HTTP server to run in development. Here's how to get it running on your own machine.

Clone repo:

    $ git clone https://github.com/hackclub/gamelab

Start a local HTTP server inside the repo:

    $ cd gamelab/
    $ python3 -m http.server 3000

And then go to http://localhost:3000 in your web browser...

    $ open http://localhost:3000/

...and it should work!

## License

The Hack Club Game Lab is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.
