const toggleRef = () => {
  const ref = document.querySelector(".ref");
  ref.classList.toggle("hide-ref");
};

const renderRef = (state) => html`
  <style>
    .ref {
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

    .hide-ref {
      right: -60%;
    }

    .close-ref {
      position: fixed;
      right: 10px;
      top: 10px;
    }

    .hide-ref .close-ref {
      display: none;
    }

    .ref pre,
    .ref code {
      background: lightgrey;
      border-radius: 3px;
      padding: 5px;
      overflow: scroll;
    }
  </style>
  <div class="ref hide-ref">
    <b>Create Engine</b>
    <pre>const engine = createEngine(gameCanvas, width, height);</pre>
    Example:
    <pre>const engine = createEngine(gameCanvas, 300, 300);</pre>
    <code>gameCanvas</code> is automatically injected into your game script.
    <br /><br />

    <b>Start Engine</b>
    <pre>engine.start()</pre>

    <b>End Engine</b>
    <pre>engine.end()</pre>

    <b>Engine Properties</b>
    <pre>
engine.width
engine.height
</pre
    >

    <b>Add Object</b>
    <pre>
engine.add({
  tags: ["name"],
  x: number, // the x position
  y: number, // the y position
  vx: number, // the x velocity
  vy: number, // the y velocity
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
engine.addText(
    "string",  
    x, 
    y, 
    { // optional parameters
      color: "string", 
      size: number,
      rotate: number,
    }
)</pre
    >
    Example of adding text:
    <pre>const greetingText = e.addText("hello world", 150, 150);</pre>
    Example of updating text:
    <pre>greetingText.text = "new greeting";</pre>

    <b>Remove Object</b>
    <pre>engine.remove(obj)</pre>
    or
    <pre>engine.remove("tag-name")</pre>

    <b>Key Inputs</b>
    <pre>engine.pressedKey(keyCode)</pre>
    <pre>engine.heldKey(keyCode)</pre>

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
obj.hasTag("tag-name")
</pre
    >

    <b>Playing Tunes</b>
    <br /><br />
    To play a tune once:
    <pre>
playTune(tune_asset_name);

// or play multiple toons

playTune(tune_0, tune_1, tune_2);
</pre
    >
    To play a tune on repeat:
    <pre>
loopTune(tune_asset_name);

// or loop multiple toons

loopTune(tune_0, tune_1, tune_2);
</pre
    >
    To stop a tune on repeat:
    <pre>
const tuneToStop = loopTune(tune_asset_name);
tuneToStop.end();
</pre
    >

    <button class="close-ref" @click=${toggleRef}>close</button>
  </div>
`;