import { TimeKeeper } from "./TimeKeeper.js";
import { resolveObjs } from "./resolveObjs.js";
import { playTune, loopTune } from "./tunePlayers.js";
import { GameObject } from "./GameObject.js";

export function init(canvas) {
  let gameObjects = [];
  const texts = new Set();
  let tunes = new Set();
  const timeKeeper = new TimeKeeper();
  const inputEvents = {
    keypress: new Set(),
    keyhold: new Set()
  };
  const collisionEvents = []; // collisions should be on gameObjects
  let gameloopId = null;

  let lastTime = 0;
  const heldKeys = new Set();

  const ctx = canvas.getContext("2d");

  timeKeeper.addTimer(_ => {
    heldKeys.forEach(key => {
      inputEvents["keyhold"].forEach(fn => fn(key));
    })
  }, 1/30);

  canvas.setAttribute("tabindex", "1");

  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    if (heldKeys.has(key)) return;

    heldKeys.add(key);

    inputEvents["keypress"].forEach(fn => fn(key));

    resolveObjs(gameObjects);
    
    e.preventDefault();
  });

  canvas.addEventListener("keyup", (e) => {
    const key = e.key;
    heldKeys.delete(key);

    e.preventDefault();
  });

  const generateId = (prefix = "") => 
    (prefix !== "" ? prefix + "_" : "") + 
    Math.random().toString(36).slice(2);

  function gameloop(time) {
    const elapsedMs = performance.now() - lastTime;
    lastTime = time;

    gameObjects.forEach(obj => {
      obj.lastX = obj.x;
      obj.lastY = obj.y;

      obj.x += obj.vx * elapsedMs;
      obj.y += obj.vy * elapsedMs;
    });

    timeKeeper.update(elapsedMs);

    resolveObjs(gameObjects);

    // draw gameObjects and texts
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach(obj => obj.draw(canvas.width/100, canvas.height/100, ctx));
    texts.forEach(text => drawText(text, ctx));

    const id = window.requestAnimationFrame(gameloop);

    gameloopId = id;
  }

  // ----------------------------------------

  function add(obj) {

    const gameObject = new GameObject(obj);

    gameObjects.push(gameObject);

    // add collisions if it matches first param of collisionEvent

    gameObjects = gameObjects.sort((a, b) => a.zIndex - b.zIndex);

    gameObject.remove = () => {
      gameObjects = gameObjects.filter((x) => x.id !== gameObject.id);
    }

    collisionEvents.forEach(([tag1, tag2, fn]) => {
      if (typeof tag1 === "string") {
        gameObject.collisionFns.push([tag2, fn]);
      } else { // is game object

      }
    })

    return gameObject;
  }

  function addText(text, x, y, ops) {
    const obj = { text, x, y, ...ops };
    texts.add(obj);

    return {
      remove: () => texts.delete(obj)
    }
  }

  function addTimer(fn, time) {
    return timeKeeper.addTimer(fn, time);
  }

  function getTagged(tag) {
    return tag === "" ? gameObjects : gameObjects.filter((x) => x.tags.includes(tag));
  }

 function playTune() {
    const tune = playTuneHelper(...arguments);
    tunes.add(tune);
    tune.remove = () => {
      tune.end();
      tunes.remove(tune);
    }

    return tune;
  }

  function loopTune() {
    const tune = loopTuneHelper(...arguments);
    tunes.add(tune);
    tune.remove = () => {
      tune.end();
      tunes.remove(tune);
    }

    return tune;
  }

  function remove(thing) {
    // sprite
    // tag
    // tune
    // text
    // collision event
    // input event
    // timer

    if (typeof thing === "string") {
      gameObjects = gameObjects.filter((x) => !x.tags.includes(thing))
    } else {
      thing.remove();
    }
    
  }

  function onInput(type, fn) {

    if (type in inputEvents) {
      inputEvents[type].add(fn);
    } else {
      console.log("unknown event");
    }

    return {
      remove: () => inputEvents[type].delete(fn)
    }
  }

  function onCollision(id0, id1, fn) { // could be gameObject or tag
    collisionEvents.push([id0, id1, fn]);

    if (typeof id0 === "string") {
      getTagged(id0).forEach(x => {
        // add collision
        x.collisionFns.push([id1, fn]);
      })
    } else { // is game object

    }

    // should this be removable?
  }

  function start() {
    if (gameloopId) end();

    lastTime = performance.now();

    gameloopId = window.requestAnimationFrame(gameloop);
  }

  function end() {
    window.cancelAnimationFrame(gameloopId);

    timeKeeper.clear();

    tunes.forEach(tune => tune.remove());
    tunes = new Set();

    gameloopId = null;
  }

  return {
    add,
    addText,
    addTimer,
    remove,
    getTagged,
    playTune,
    loopTune,
    onInput,
    onCollision,
    start,
    end,
    every: (tag, fn) => getTagged(tag).forEach(fn)
  }
}
