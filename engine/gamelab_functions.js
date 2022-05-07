import { TimeKeeper } from "./TimeKeeper.js";
import { resolveObjs } from "./resolveObjs.js";
import { GameObject } from "./GameObject.js";

export function init(canvas) {

  // remove event listeners
  let newCanvas = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(newCanvas, canvas);
  canvas = newCanvas;

  const ctx = canvas.getContext("2d");

  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  let gameObjects = [];
  const texts = new Set();
  let tunes = new Set();
  const timeKeeper = new TimeKeeper();
  let inputEvents = {
    keypress: new Set(),
    keyhold: new Set()
  };
  let collisionEvents = []; // collisions should be on gameObjects
  let gameloopId = null;

  let lastTime = 0;
  const heldKeys = new Set();

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

    drawTiles();

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
    tunes.clear();

    gameloopId = null;
    collisionEvents = [];
    inputEvents.keypress.clear();
    inputEvents.keyhold.clear();
    texts.clear();
  }

  function setScreenSize(w, h) {
    canvas.width = w;
    canvas.height = h;

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }

  // tile gamelab
  let legend = {};
  let width = 0;
  let height = 0;
  let currentLevel = [];
  let tileInputs = {
    up: [],
    down: [],
    left: [],
    right: [],
    action0: [],
    action1: [],
    reset: [],
    undo: [],
  };
  let afterInputs = [];
  let tileCollisions = [];
  let solids = [];
  let pushable = {};
  let zOrder = [];
  let layers = [];

  function runCollisions() {
    const setTileDeltas = () => currentLevel.forEach(tile => {
      tile.dx = tile.x - tile.lastX;
      tile.lastX = tile.x;

      tile.dy = tile.y - tile.lastY;
      tile.lastY = tile.y;
    })

    const getDeltas = (tiles) => tiles.map(t => [t.dx, t.dy]).flat();
    const anyMoved = () => getDeltas(currentLevel).some(d => d !== 0);

    setTileDeltas();
    // should repeat this until nothing moves
    while (anyMoved()) {
      checkTileCollisions();
      setTileDeltas();
    }
  }

  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    const VALID_INPUTS = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "];

    if (!VALID_INPUTS.includes(key)) return;

    if (key === "w" || key === "ArrowUp") tileInputs["up"].forEach(fn => fn());
    if (key === "a" || key === "ArrowLeft") tileInputs["left"].forEach(fn => fn());
    if (key === "s" || key === "ArrowDown") tileInputs["down"].forEach(fn => fn());
    if (key === "d" || key === "ArrowRight") tileInputs["right"].forEach(fn => fn());
    if (key === "Enter" || key === " ") tileInputs["action0"].forEach(fn => fn());

    // runCollisions();

    // currentLevel.forEach(canMoveToPush);

    afterInputs.forEach(f => f());

    // clear deltas here?
    currentLevel.forEach(tile => {
      tile.dx = 0;
      tile.dy = 0;
    });

    e.preventDefault();
  });

  const canMoveTo = (x, y, tile) => {
    return getTile(x, y).every(t => !solids.includes(t.type));
  }

  const canMoveToPush = (tile, dx, dy) => {
    const grid = getTileGrid();
    const { x, y, type } = tile;
    const cellKey = `${x+dx},${y+dy}`;

    const notSolid = !solids.includes(type);
    const noMovement = dx === 0 && dy === 0;
    const movingToEmpty = !grid[cellKey];

    if (notSolid || noMovement || movingToEmpty) {
      tile._x += dx;
      tile._y += dy;
      return;
    }

    let canMove = true;

    // console.log(cellKey, grid[cellKey]);

    grid[cellKey].forEach(cell => {
      // if (tile === cell) return;

      const isSolid = solids.includes(cell.type);
      const isPushable = (type in pushable) && pushable[type].includes(cell.type);

      if (isSolid && !isPushable)
        canMove = false;

      if (isSolid && isPushable) {
        cell.dx += dx;
        cell.dy += dy;
        canMoveToPush(cell, cell.dx, cell.dy);
        // if (cell.x+cell.dx === x && cell.y+cell.dy === y) canMove = false;
        if (cell.dx === 0 && cell.dy === 0) canMove = false;
      }
    })

    if (!canMove) {
      tile.dx = 0;
      tile.dy = 0;
    }

    tile._x += tile.dx;
    tile._y += tile.dy;
  }

  class Tile {
    constructor(x, y, type) {
      this.type = type;
      this._x = x;
      this._y = y;
      this.dx = 0;
      this.dy = 0;

      const sprite = legend[type];
      if (!sprite) console.error("unknown tile type");
      this.canvas = document.createElement("canvas");
      this.canvas.width = sprite.width;
      this.canvas.height = sprite.height;

      this.canvas.getContext("2d").putImageData(
        sprite, 
        0,
        0,
      );
    }

    set x(newX) {
      this.dx = newX - this.x;
      canMoveToPush(this, this.dx, 0);
      return this;
    }

    get x() {
      return this._x;
    }

    set y(newY) {
      this.dy = newY - this.y;
      canMoveToPush(this, 0, this.dy);
      return this;
    }

    get y() {
      return this._y;
    }

    remove() {
      currentLevel = currentLevel.filter(t => t !== this);

      return this;
    }

  }

  function setLegend(objectMap) {
    legend = objectMap;
  }

  const allEqual = arr => arr.every(val => val === arr[0]);

  function addLayer(string) { // could have background and sprites
    // check that level is rectangle

    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) console.error("Level must be rect.");
    const w = rows[0].length;
    const h = rows.length;
    width = w;
    height = h;

    for (let i = 0; i < w*h; i++) {
      const type = string.split("").filter(x => x.match(/\S/))[i];

      if (type === ".") continue;

      const x = i%w; 
      const y = Math.floor(i/w); 
      const newTile = new Tile(x, y, type);
      currentLevel.push(newTile)
    }

    return currentLevel;
  }

  function addTile(x, y, type) { // could take array
    const tile = new Tile(x, y, type);
    currentLevel.push(tile);

    return tile;
  }

  function setTile(x, y, type = ".") { // could take array
    currentLevel = currentLevel.filter(tile => tile.x !== x || tile.y !== y);

    if (type === ".") return;

    const tile = new Tile(x, y, type);
    currentLevel.push(tile);

    return tile;
  }

  function clearTile(x, y) {
    currentLevel = currentLevel.filter(tile => tile.x !== x || tile.y !== y);
  }

  function getTile(x, y) { // 
    return currentLevel.filter(tile => tile.x === x && tile.y === y);
  }

  function tileContains(x, y, type) {
    return currentLevel
      .filter(tile => tile.x === x && tile.y === y)
      .map(tile => tile.type)
      .includes(type)
  }

  function tilesWith(type) {
    const grid = getTileGrid();

    // return getGrid
  }

  function everyTile(type, fn) {
    const tiles = [];
    currentLevel.forEach( tile => {
      if (tile.type === type) tiles.push(fn(tile));
    })

    return tiles;
  }

  function addRule(pattern, fn) {
    // if pattern matches grid then call fn

  }

  function makeSolid(arr) {
    solids = arr;
  }

  function makePushable(map) {
    pushable = map;
  }

  // type
  // type + 3
  // type.x + 3
  // type.y + 3 || type.y - 3
  // -3 < type.x < +3 && -3 < type.y < +3
  function onTileCollision(area0, area1, fn) {
    // if area0 overlaps area1 call fn

    // group by all overlaps
    if (typeof area0 === "string") area0 = [area0];
    if (typeof area1 === "string") area1 = [area1];

    area0.forEach(t0 => {
      area1.forEach(t1 => {
        tileCollisions.push([ t0, t1, fn ]);
      })
    })

  }

  function onTileInput(type, fn) {
    if (!(type in tileInputs)) console.error("unknown input type:", type)
    tileInputs[type].push(fn);
  }

  function getTileGrid() {
    const overlaps = {};
    const tiles = currentLevel.map(tile => [ `${tile.x},${tile.y}`, tile ]);
    tiles.forEach( tile => {
      const [ key, data ] = tile;
      if (key in overlaps) overlaps[key].push(data);
      else overlaps[key] = [data];
    })

    return overlaps;
  }

  function checkTileCollisions() {
    // check collisions
    const overlaps = getTileGrid();

    Object.values(overlaps).forEach(tiles => {
      if (tiles.length > 1) {
        // console.log(tiles);
        // if those tiles contain every tile in a 
        const types = tiles.map(x => x.type);
        tileCollisions.forEach(collision => {
          const [ type0, type1, fn ] = collision;

          if (types.includes(type0) && types.includes(type1)) {
            const tile0 = tiles[types.indexOf(type0)];
            const tile1 = tiles[types.indexOf(type1)];
            fn(tile0, tile1);
          }
        })
      }
    })
  }


  function drawTiles() {
    const w = canvas.width/width;
    const h = canvas.height/height;

    currentLevel
      .sort((a, b) => zOrder.indexOf(b.type) - zOrder.indexOf(a.type))
      .forEach(tile => {

        ctx.drawImage(
          tile.canvas, 
          tile.x*canvas.width/width, 
          tile.y*canvas.height/height,
          w,
          h
        );
      });
   
  }

  function parsePattern(string) {
    const parsedPattern = [];
    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) console.error("pattern must be rectangle");
    const w = rows[0].length;
    const h = rows.length;

    for (let i = 0; i < w*h; i++) {
      const type = string.split("").filter(x => x.match(/\S/))[i];
      parsedPattern.push(type)
    }

    const result = { width: w, height: h, pattern: parsedPattern };

    return result;
  }

  function matchPattern(patternData) {

    const { width: w, height: h, pattern } = patternData;

    const grid = getTileGrid();
    let allMatches = [];

    for (let i = 0; i < width*height; i++) {
      const x = i%width; 
      const y = Math.floor(i/width); 

      if (x + w > width || y + h > height) continue;
      
      let match = true;
      let matches = [];
      for (let j = 0; j < w*h; j++) {
        const dx = j%w; 
        const dy = Math.floor(j/w);
        const type = pattern[j];
        const key = `${x+dx},${y+dy}`;
        match = match && 
          (grid[key]?.map(t => t.type).includes(type) 
           || type === "." // anything
           || (type === "_" && grid[key] === undefined) // empty
          );

        if (grid[key] && type !== ".") {
          const options = grid[key].filter(t => t.type === type)
          if (options.length > 0) matches.push(options[0]); // take the first match

        } // else if (grid[key] && type === ".") matches.push(grid[key][0]);
        else matches.push({ x: x+dx, y:y+dy, type });
      }

      // all matches are in some layer together
      const matchTypes = matches
          .map(t => t.type)
          .filter(t => ![".", "_"].includes(t));

      const layerBuddies = layers
        .some(layer => matchTypes.every(type => layer.includes(type)))
        || matchTypes.length === 1;

      if (match) console.log(layers, matchTypes, matches, layerBuddies);

      if (match && layerBuddies) {
        allMatches.push(matches);
      }
    }

    return allMatches;
  }

  function replace(pattern, newPattern = "") {
    const p = parsePattern(pattern);
    const matches = matchPattern(p);

    if (newPattern === "") return matches.length > 0;

    const pNew = parsePattern(newPattern);

    if (p.width !== pNew.width || p.height !== pNew.height) 
      console.error("Pattern dimensions must match.");

    matches.forEach(match => {
      match.forEach( (t, i) => {
        const { x, y, type } = t;

        const newType = pNew.pattern[i];
         if (t.type in legend && (newType in legend || newType === "_")) 
           t.remove(); 

        if (newType in legend) addTile(x, y, newType); 
        else if (newType !== "." && newType !== "_") 
          console.error("can't replace with unknown tile:", newType);
      })
    })

    return matches.length > 0
  }

  function setLayers(l) {
    layers = l;
  }

  function afterInput(fn) {
    afterInputs.push(fn);
  }

  function sprite(string) { // returns image data
    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) console.error("Level must be rect.");
    const width = rows[0].length;
    const height = rows.length;
    const data = new Uint8ClampedArray(width*height*4);

    const colors = {
      "0": [0, 0, 0, 255],
      "1": [255, 255, 255, 255],
      "r": [255, 0, 0, 255],
      "g": [0, 255, 0, 255],
      "b": [0, 0, 255, 255],
      ".": [0, 0, 0, 0],
    }

    for (let i = 0; i < width*height; i++) {
      const type = string.split("").filter(x => x.match(/\S/))[i];

      if (!(type in colors)) console.error("unknown color:", type);

      const [ r, g, b, a ] = colors[type];
      data[i*4] = r;
      data[i*4 + 1] = g;
      data[i*4 + 2] = b;
      data[i*4 + 3] = a;
    }

    const result = new ImageData(data, width, height);

    return result;
  }

  // how to add timed things, like bird flying and ball kicks

  return {
    add,
    addText,
    addTimer,
    remove,
    getTagged,
    onInput,
    onCollision,
    start,
    end,
    every: (tag, fn) => getTagged(tag).forEach(fn),
    setScreenSize,
    // tile functions
    setLegend, // ***
    addLayer, // ***
    setTile, // *
    getTile, // *
    addTile, // **
    clearTile, // *
    everyTile, // *
    tileContains, // *
    addRule, // ?
    onTileCollision, // *
    onTileInput, // ***
    makeSolid, // ***, could use collision layers
    makePushable, // ***
    replace, // **
    afterInput, // ***
    getTileGrid, // **
    getTileAll: (type) => currentLevel.filter(t => t.type === type), // **
    clear: () => { currentLevel = []; }, // ***
    setZOrder: (order) => { zOrder = order; }, // **, could use order of collision layers
    sprite,
    setLayers
  }
}
