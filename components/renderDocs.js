import { html } from "../uhtml.js";

const toggleDocs = () => {
  const docs = document.querySelector(".docs");
  docs.classList.toggle("hide-docs");
};

export const renderDocs = (state) => html`
  <style>
    .docs {
      position: absolute;
      box-sizing: border-box;
      height: 100%;
      width: 60%;
      right: 0px;
      top: 0px;
      background: white;
      z-index: 10;
      padding: 10px;
      overflow: scroll;
      transition: right 1s ease-in-out;
    }

    .hide-docs {
      right: -60%;
    }

    .close-docs {
      position: fixed;
      right: 10px;
      top: 10px;
    }

    .hide-docs .close-docs {
      display: none;
    }

    .docs pre,
    .docs code {
      background: lightgrey;
      border-radius: 3px;
      padding: 5px;
      overflow: scroll;
    }

    .notification-container {
      border: 1px solid black;
      padding: 10px;
      border-radius: 1em;
      max-height: 30%;
      overflow-y: scroll;
    }

    .shared-modal {
      color: var(--text-color);
      background: var(--background-2);
      margin-bottom: 5px;
      padding: 10px;
      border: 2px solid black;
      border-radius: 5px;
    }
  </style>
  <div class="docs hide-docs">
    <h3>Notifications:</h3>
    <div class="notification-container">
      ${Object.values(state.notifications).map(
        (x) => html` <div class="shared-modal">${x}</div> `
      )}
    </div>
    <h3>Documentation</h3>
    <b>Create Engine</b>
    <pre>const e = createEngine(gameCanvas, width, height);</pre>
    Example:
    <pre>const e = createEngine(gameCanvas, 300, 300);</pre>
    <code>gameCanvas</code> is automatically injected into your game script.
    <br /><br />

    <b>Start Engine</b>
    <pre>e.start()</pre>

    <b>End Engine</b>
    <pre>e.end()</pre>

    <b>Add Object</b>
    <pre>
e.add({
  tags: ["name"],
  x: number, // the x position
  y: number, // the y position
  vx: number, // the x velocity
  vy: number, // the y velocity
  solid: false, // or true, makes the object collide with other solid objects
  sprite: sprite_name,
  scale: number,
  rotate: number,
  bounce: number, // how much velocity is lost on collisions
  origin: [0, 0], // 0 - 1
  collides: (me, them) => {

  },
  update: (me) => { // runs every frame

  }
})</pre
    >

    <b>Add Text</b>
    <pre>
e.addText(
  "string",  
  x, 
  y, 
  { // optional parameters
    color: "string", 
    size: number,
    rotate: number,
  }
)
  </pre>
    Example of adding text:
    <pre>const greetingText = e.addText("hello world", 150, 150);</pre>
    Example of updating text:
    <pre>greetingText.text = "new greeting";</pre>
    Example of removing text:
    <pre>greetingText.remove();</pre>

    <b>Remove Object</b>
    <pre>e.remove(obj)</pre>
    or
    <pre>e.remove("tag-name")</pre>

    <b>Key Inputs</b>
    <pre>e.pressedKey(keyCode)</pre>
    <pre>e.heldKey(keyCode)</pre>

    <b>Object Properties</b>
    <br /><br />
    On each object you can access:
    <pre>
obj.x
obj.y
obj.vx
obj.vy
obj.width
obj.height
obj.scale
obj.secondsBetweenUpdates
obj.hasTag("tag-name")
    </pre>

    <b>object.props</b>
    <br /><br />
    Object.props is a handy place to store things you need for your game.
    Gamelab doesn't do anything to it aside from keep track of it for you.
    <br /><br />

    <b>object.scale</b>
    <br /><br />
    obj.sprite specifies how much bigger to make the sprite.
    <pre>
// make the sprite twice as large
sprite.scale = 2;

// make the sprite twice as tall, but the same width
sprite.scale = [1, 2];

// mirror the sprite over the X axis
sprite.scale = [-1, 1];
    </pre>

    <b>object.secondsBetweenUpdates</b>
    <br /><br />
    Specifies how often your object's update function should be called.
    <br /><br />

    <b>object.distanceTo(otherObject)</b>
    <br /><br />
    Returns the Euclidean distance between each object.
    <br /><br />

    <b>object.zIndex</b>
    <br /><br />
    Objects with higher zIndexes are rendered on top of objects with lower zIndexes.
    <br /><br />

    <b>object.teleport</b>
    <pre>
obj.x = 100
obj.y = 100
/* vs */
obj.teleport(100, 100)
    </pre>
    If you simply assign to x and y, collision detection
    will still be triggered which might stop them from getting there
    if something is in the way.
    <br /><br />

    Instead, you can use obj.teleport. This will move them to the
    specified location without triggering collision detection,
    so that they are guaranteed to get there.
    <br /><br />

    <b>Playing Tunes</b>
    <br /><br />
    To play a tune once:
    <pre>
playTune(tune_asset_name);

// or play multiple tunes

playTune(tune_0, tune_1, tune_2);
    </pre>
    To play a tune on repeat:
<pre>
loopTune(tune_asset_name);

// or loop multiple tunes

loopTune(tune_0, tune_1, tune_2);
    </pre>
    To stop a tune on repeat:
<pre>
const tuneToStop = loopTune(tune_asset_name);
tuneToStop.end();
    </pre>

    <b>Idioms</b>
    <br><br>
    <div>
      One useful pattern is using maps to functions.
    </div>
    <pre>
// create our engine
const e = createEngine(gameCanvas, 300, 300);

// here are the behavior maps
const playerHeldKeys = {
  "w": me => me.y -= 2,
  "s": me => me.y += 2,
  "a": me => me.x -= 2,
  "d": me => me.x += 2,
}

const playerPressedKeys = {
  " ": me => {
    console.log("pressed space");
  },
}

const playerCollisions = {
  "floor": (me, them) => {
    console.log("collided with floor");
  }
}

// define the player object
const player = {
  sprite: sprite_player,
  x: 10,
  y: 20,
  scale: 2,
  collides: (me, them) => {
    collidesMap(me, them, playerCollisions)
  },
  update: me => {
    heldKeyMap(me, playerHeldKeys)
    pressedKeyMap(me, playerPressedKeys)
  }
}

// use the player object
e.add(player);

// define the floor object
const floor = {
  tags: ["floor"],
  sprite: sprite_floor,
  scale: [18, 2],
  y: 221
}

// use the floor object
e.add(floor);

// start the engine
e.start();

// here are some helper functions to map inputs to events
function pressedKeyMap(me, map) {
  for (let k in map) {
    if (e.pressedKey(k)) map[k](me);
  }
}

function heldKeyMap(me, map) {
  for (let k in map) {
    if (e.heldKey(k)) map[k](me);
  }
}

function collidesMap(me, them, map) {
  for (let k in map) {
    if (them.hasTag(k)) map[k](me, them);
  }
}
    </pre>

    <b>Examples</b>
    <br /><br />
    <div>
      Examples can be found in the
      <a href="https://github.com/hackclub/gamelab#readme" target="_blank"
        >GitHub repository README</a
      >, check out the "Tiny Games".
    </div>

    <button class="close-docs" @click=${toggleDocs}>close</button>
  </div>
`;
