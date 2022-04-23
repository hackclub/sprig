const e = createEngine(gameCanvas, 300, 300);

// idiomatic would be not to name objects

// events behaviors vs loop conditionals

e.add({
  sprite: background,
  scale: 10,
})

const addBullet = (x, y) => e.add({
  sprite: bullet,
  x,
  y,
  vy: 1,
  scale: 5,
})

const playah = e.add({
  sprite: player,
  scale: 4, 
  x: 40,
  collides: (me, them) => { // all behaviors in definition, doesn't support mix-ins
    if (them.hasTag("laser")) { // these checks motivate conditionals
      e.remove(me)
    }
  },
  onInit: [ // supports copying behavior better because copied code can be seperate
    addLaserInteraction,
    obj => {
      e.onKeyPress("w", () => {
        obj.y += 30;
      })
    },
    obj => obj.onCollide("tiny-house", them => {
      them.scale *= .5
    })
  ] 
  // could do mixin like this, 
  // perhaps has best exentensibility and incremental generalization
})

function laserInteraction(obj) {
  obj.onCollision("laser", (laser) => {
    e.remove(obj);
  })
}

///////

e.onUpdate(() => { // frame?

   if (e.heldKey("ArrowLeft")) playah.x -= 1;
   if (e.heldKey("ArrowRight")) playah.x += 1;
  
   if (e.pressedKey("ArrowDown")) {
     addBullet(playah.x+playah.width/2, playah.y + 28)
   }

})

/////////////////

// this is more clear that it's event driven

// but what if i want to move aliens on key hold
e.onKeyHold("ArrowLeft", () => {
  playah.x -= 1;

  e.get("alien").forEach(alien => {
    alien.x -= 1;
  })
})

e.onKeyHold("ArrowRight", () => {
  playah.x += 1;
})

e.onKeyPress("ArrowDown", () => {
  addBullet(playah.x+playah.width/2, playah.y + 28)
})

e.onMouseDown((x, y) => {
  
})

e.onMouseMove((x, y) => {
  if (playah.boundingBoxContains(x, y)) {
    // do something
  }
})

e.onMouseUp((x, y) => {
  
})

// click, hover?


//////////////////

// what if both are tags? have to check tags on every object during collision
// will that get expensive?
e.onCollision(playah, "bullet", (obj1, obj2) => {
  
})

// does away with behavior localization
e.onCollision("player", "bullet", (obj1, obj2) => {
  
})

//////////////////

// should be in definition?
// breaking it up allows programer to incrementally have correct things
// less chance of breaking correct code
// don't need to have conditionals for different types of collisions
// knows which object to attach collision to

// but can't add collision for bunch of tags

// onCollision, onCollides
playah.onCollide("bullet", (obj) => {
  e.remove(obj);
  // playah.remove();
})

// this may not be needed on each object
// onUpdate is triggered at same time for all of them
playah.onUpdate(() => {
  
})

/////////////////

function addControls(obj) {
  // this
  // this can be more efficient, onUpdate only check keys with events once
  e.onKeyPress("ArrowUp", () => {
    obj.y -= 1;
  })

  e.onKeyPress("ArrowDown", () => {
    obj.y += 1;
  })

  // or this
  // will always run even if keys aren't pressed
  e.onUpdate(() => {
    if (e.keyPressed("ArrowLeft")) {
      obj.x -= 1;
    }

    if (e.keyPressed("ArrowRight")) {
      obj.x += 1;
    }
  })
}

addControls(playah);

/////////////////

e.start();



/////////////////////////////////////////

/*
Welcome to Game Lab!
Try out the challenges above to get started in Game Lab.

If you need some reference documentation click
the question mark in the toolbar.

Click the "get share link" button above to get a shareable
link to share your game with others!
*/

const e = createEngine(gameCanvas, 518, 409);

function spawnBullet(playerX, playerY, mouseX, mouseY) {

  // getting direction from 2 points
  const mag = Math.sqrt((mouseX - playerX)**2 + (mouseY - playerY)**2);
  const bulletSpeed = 3;
  
  e.add({
    sprite: bullet,
    origin: "center",
    vx: (mouseX-playerX)/mag * bulletSpeed,
    vy: (mouseY-playerY)/mag * bulletSpeed,
    x: playerX,
    y: playerY,
    update(me) {
      // offscreen
      if (me.x < 0) {
        e.remove(me);
      }

      if (me.x > e.width) {
        e.remove(me);
      }

      if (me.y < 0) {
        e.remove(me);
      }

      if (me.y > e.height) {
        e.remove(me);
      }
    }
  })
}

function addControls(obj) {
  if (e.heldKey("ArrowUp")) obj.y -= 2;
  if (e.heldKey("ArrowDown")) obj.y += 2;
  if (e.heldKey("ArrowRight")) obj.x += 2;
  if (e.heldKey("ArrowLeft")) obj.x -= 2;
}

function boundToWindow(obj) {
  if (obj.y < 0) obj.y = 0;
  if (obj.y > e.height) obj.y = e.height;
  if (obj.x < 0) obj.x = 0;
  if (obj.x > e.width) obj.x = e.width;
}

function addGun(obj) {
  if (e.pressedKey(" ")) {
    spawnBullet(obj.x, obj.y, e.mouseX, e.mouseY);
  }
}

function playerUpdate(me) {
  addControls(me);
  addGun(me);
  boundToWindow(me);
}

// const playerUpdate = {
//   init: something(),
//   frame: something,
//   collides: something,
// }

function playerCollides(me, them) {
  
}

const player = {
  sprite: player,
  scale: 7,
  origin: "center",
  collides: playerCollides,
  update: playerUpdate
}

e.add(player);

e.start();

/////////////////////////////////////////////////////////////////////////////

/*
Welcome to Game Lab!
Try out the challenges above to get started in Game Lab.

If you need some reference documentation click
the question mark in the toolbar.

Click the "get share link" button above to get a shareable
link to share your game with others!
*/

const e = createEngine(gameCanvas, 518, 409);

function spawnBullet(playerX, playerY, mouseX, mouseY) {

  // getting direction from 2 points
  const mag = Math.sqrt((mouseX - playerX)**2 + (mouseY - playerY)**2);
  const bulletSpeed = 3;
  
  e.add({
    sprite: bullet,
    origin: "center",
    vx: (mouseX-playerX)/mag * bulletSpeed,
    vy: (mouseY-playerY)/mag * bulletSpeed,
    x: playerX,
    y: playerY,
    update(me) {
      // offscreen
      if (me.x < 0) {
        e.remove(me);
      }

      if (me.x > e.width) {
        e.remove(me);
      }

      if (me.y < 0) {
        e.remove(me);
      }

      if (me.y > e.height) {
        e.remove(me);
      }
    }
  })
}

function addControls(obj) {
  if (e.heldKey("ArrowUp")) obj.y -= 2;
  if (e.heldKey("ArrowDown")) obj.y += 2;
  if (e.heldKey("ArrowRight")) obj.x += 2;
  if (e.heldKey("ArrowLeft")) obj.x -= 2;
}

function boundToWindow(obj) {
  if (obj.y < 0) obj.y = 0;
  if (obj.y > e.height) obj.y = e.height;
  if (obj.x < 0) obj.x = 0;
  if (obj.x > e.width) obj.x = e.width;
}

const addGun = (obj) => {
  if (e.pressedKey(" ")) {
    spawnBullet(obj.x, obj.y, e.mouseX, e.mouseY);
  }
}

const playerObj = {
  sprite: player,
  scale: 7,
  origin: "center",

  update: (me) => {
    addControls(me);
    addGun(me);
    boundToWindow(me);
  },

  key_ArrowRight(me) {

  },

  pressedKeyMap: {
    "d": (me) => {
      
    },
    " ": (me) => {
      
    }
  },

  collisionMap: {
    
  }
}

// event passing and polling are mixed


e.add(playerObj)

e.start();

////////////////////////////////////////////////////////////

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

const e = createEngine(gameCanvas, 300, 300);

const playerHeldKeys = {
  "w": me => me.y -= 2,
  "s": me => me.y += 2,
  "a": me => me.x -= 2,
  "d": me => me.x += 2,
}

const playerCollisions = {
  "floor": (me, them) => {
    me.y -= 10
  }
}

const player = {
  sprite: player_sprite,
  x: 10,
  y: 20,
  scale: 2,
  collides: (me, them) => {
    collidesMap(me, them, playerCollisions)
  },
  update: me => {
    heldKeyMap(me, playerHeldKeys)
  }
}

e.add(player);

const floor = {
  tags: ["floor"],
  sprite: sprite_floor,
  scale: [18, 2],
  y: 221
}

e.add(floor);

e.start();

////////////////////////////////

// initialize engine
// const e = setScreenSize(300, 300);

// fix screen size? fixed aspect ratio
// units are 0 - 100

// default origin is center?
// remove rotate? keep flip?
let beaker = add({
  sprite: sprite_beaker, // assign sprite here
  solid: true, // collides with other solid objects
  x: 130, // set initial x position
  y: 91, // set initial y position
  scale: 2,
})

add({
  sprite: sprite_floor,
  tags: ["floor"], // can be used to reference object
  solid: true,
  x: 102,
  y: 242,
  scale: 3
})

createTimer( _ => {
  getTagged("floor").forEach( sprite => {
    sprite.y += 3;
  })
}, 1/30)

let timer = createTimer(time => {
  console.log("every second");
  if (time > 10) cancelTimer(timer);
}, 1)

onCollision("tag1", "tag2", (tag0, tag1) => {
  
})

onCollision(beaker, "tag2", (tag0, tag1) => {
  
})

onInput("keyheld", (data) => {
  if (data === "3") {
    getTagged("floor").forEach(floor => {
      floor.y = 300;
    })
  }
})

// onInput("keypress:3", () => { })
// onInput("keyheld:space", () => { })

// onKeyPress("a", () => { })
// onKeyHeld("a", () => { })
// onKeyHeld("a", () => { })

// won't need this with timer
onUpdate(() => {
  getTagged("floor").forEach(sprite => {
    sprite.x += 3;
    sprite.y += 3;
  })

  // forTagged("floor", floor => { })
})

// start the game
start();


//////////////////////////////

const obj = add({
  sprite,
  tags: [],
  scale: [1, 1],
  x, 
  y,
  vx,
  vy,
  solid: true,
  origin: [0.5, 0.5],
  zIndex: 1,
  props: {},
  // bounce: 1,
  // rotate: 0
});

obj.teleport(x, y);
obj.distanceTo(otherObj);
obj.addTag("something");
obj.removeTag("something");
obj.width;
obj.height;


// center is x, y
let sampleText = addText("text", x, y, { size, color, rotate });
sampleText.text = "text"; 
// or sampleText.setText("text")
// or just remove and re-add

remove(tag | sprite | text);

getTagged(tagName);

let timer0 = createTimer(time => {
  if (keyheld("k")) {
    console.log("key k held");
  }

  if (keypressed("k")) { // when is this triggered?
    console.log("key k pressed");
  }
}, 1/30);
cancelTimer(timer0); // or timer0.cancel(); or remove(timer0)

// should i be able to remove these?
// when will keyheld be triggered?
onInput("keypress", data => { // "keyhold" | "mousemove" | "mousedown" | "mouseup"
  if (data === "k") {
    console.log("k");
  }
})

onCollision(tag0 | obj, tag1, (tagged0, tagged1) => { // on collide

})

start();
end();

playTune(tune_asset_name);
const tuneToStop = loopTune(tune_asset_name);
tuneToStop.end(); // or endTune(tuneToStop) or remove(tuneToStop)