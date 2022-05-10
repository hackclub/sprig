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

  canvas.setAttribute("tabindex", "1");

  let animationId;

  function gameloop() {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTiles();

    animationId = window.requestAnimationFrame(gameloop);
  }

  function end() {
    window.cancelAnimationFrame(animationId);
  }

  window.requestAnimationFrame(gameloop);

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
  let solids = [];
  let pushable = {};
  let zOrder = [];
  let maxTileDim = 0;

  let background = new ImageData(new Uint8ClampedArray(16*16*4).fill(0), 16);
  const bgCanvas = document.createElement("canvas");
  bgCanvas.width = background.width;
  bgCanvas.height = background.height;

  bgCanvas.getContext("2d").putImageData(
    background, 
    0,
    0,
  );

  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    const VALID_INPUTS = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "];

    if (!VALID_INPUTS.includes(key)) return;

    if (key === "w" || key === "ArrowUp") tileInputs["up"].forEach(fn => fn());
    if (key === "a" || key === "ArrowLeft") tileInputs["left"].forEach(fn => fn());
    if (key === "s" || key === "ArrowDown") tileInputs["down"].forEach(fn => fn());
    if (key === "d" || key === "ArrowRight") tileInputs["right"].forEach(fn => fn());
    if (key === "Enter" || key === " ") tileInputs["action0"].forEach(fn => fn());

    afterInputs.forEach(f => f());

    // clear deltas here?
    currentLevel.forEach(tile => {
      tile.dx = 0;
      tile.dy = 0;
    });

    e.preventDefault();
  });

  const canMoveToPush = (tile, dx, dy) => {
    const grid = getGrid();
    const { x, y, type } = tile;
    const cellKey = `${x+dx},${y+dy}`;

    const notSolid = !solids.includes(type);
    const noMovement = dx === 0 && dy === 0;
    const movingToEmpty = !grid[cellKey];

    if (notSolid || noMovement || movingToEmpty) {
      tile._x += dx;
      tile._y += dy;
      return true;
    }

    let canMove = true;

    grid[cellKey].forEach(cell => {

      const isSolid = solids.includes(cell.type);
      const isPushable = (type in pushable) && pushable[type].includes(cell.type);

      if (isSolid && !isPushable)
        canMove = false;

      if (isSolid && isPushable) {
        canMove = canMove && canMoveToPush(cell, dx, dy);
      }
    })

    if (canMove) {
      tile._x += dx;
      tile._y += dy;
    }

    return canMove;

  }

  class Tile {
    constructor(x, y, type) {
      this._type = null;
      this.type = type;
      this._x = x;
      this._y = y;
      this.dx = 0;
      this.dy = 0;
    }

    set type(t) {
      if (t === ".") t.remove(); // hmm

      this._type = t;
      const defaultSprite = new ImageData(new Uint8ClampedArray(16*16*4).fill(0), 16)
      const sprite = (t in legend) ? legend[t] : defaultSprite;
      this.canvas = document.createElement("canvas");
      this.canvas.width = sprite.width;
      this.canvas.height = sprite.height;

      this.canvas.getContext("2d").putImageData(
        sprite, 
        0,
        0,
      );
    }

    get type() {
      return this._type;
    }

    set x(newX) {
      const dx = newX - this.x;
      if (canMoveToPush(this, dx, 0)) this.dx = dx;
      return this;
    }

    get x() {
      return this._x;
    }

    set y(newY) {
      const dy = newY - this.y;
      if (canMoveToPush(this, 0, dy)) this.dy = dy;
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

  function setMap(string) { // could have background and sprites
    // check that level is rectangle

    clear();

    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) console.error("Level must be rect.");
    const w = rows[0].length;
    const h = rows.length;
    width = w;
    height = h;

    // scale the ctx based on aspect ratio of level
    // tiles should always be square
    // find max tile width to fit

    maxTileDim = Math.min(canvas.width/w, canvas.height/h);
    
    // should this adjust screen size?
    setScreenSize(w*maxTileDim, h*maxTileDim);

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
    // if (type === ".") 

    const tile = new Tile(x, y, type);
    currentLevel.push(tile);

    return tile;
  }

  function clearTile(x, y) {
    currentLevel = currentLevel.filter(tile => tile.x !== x || tile.y !== y);
  }

  function getCell(x, y) { // 
    return currentLevel.filter(tile => tile.x === x && tile.y === y);
  }

  function setSolids(arr) {
    solids = arr;
  }

  function setPushables(map) {
    pushable = map;
  }

  function onInput(type, fn) {
    if (!(type in tileInputs)) console.error("unknown input type:", type)
    tileInputs[type].push(fn);
  }

  function getGrid() {
    const overlaps = {};
    const tiles = currentLevel.map(tile => [ `${tile.x},${tile.y}`, tile ]);
    tiles.forEach( tile => {
      const [ key, data ] = tile;
      if (key in overlaps) overlaps[key].push(data);
      else overlaps[key] = [data];
    })

    return overlaps;
  }


  function drawTiles() {

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        ctx.drawImage(
          bgCanvas, 
          x*maxTileDim, 
          y*maxTileDim,
          maxTileDim,
          maxTileDim
        );
      }
    }

    currentLevel
      .sort((a, b) => zOrder.indexOf(b.type) - zOrder.indexOf(a.type))
      .forEach(tile => {

        ctx.drawImage(
          tile.canvas, 
          tile.x*maxTileDim, 
          tile.y*maxTileDim,
          maxTileDim,
          maxTileDim
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

  function matchPattern(patternData, testMap = {}) {

    const { width: w, height: h, pattern } = patternData;

    const grid = getGrid();

    // if no cell with key then cell empty
    for (let i = 0; i < width*height; i++) {
      const x = i%width; 
      const y = Math.floor(i/width); 
      const key = `${x},${y}`;

      if (!grid[key]) grid[key] = [{ x, y, type: "." }];
    }

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
        
        let testFn;
        if (type in testMap) {
          const val = testMap[type];
          if (Array.isArray(val)) testFn = t => val.includes(t.type);
          if (typeof val === "function") testFn = val
        }

        let matchValue = (testFn)
            ? grid[key]?.find(testFn) // could take whole tile or tile type
            : grid[key]?.find(t => t.type === type)

        match = match && matchValue !== undefined;

        matches.push(matchValue);
      }

      if (match) {
        // if match doesn't have overlap with existing matches
        const overlap = matches.some(t => allMatches.flat().includes(t));
        if (!overlap) allMatches.push(matches);
      }
    }

    return allMatches;
  }

  function match(pattern, testMap = {}) {
    const p = parsePattern(pattern);
    const matches = matchPattern(p, testMap);
    return matches;
  }

  function replace(pattern, newPattern, testMap = {}) { 
    // ? should be able to pass result of matches
    // maybe passing testMap is okay

    const p = parsePattern(pattern);
    const matches = matchPattern(p, testMap);

    const pNew = parsePattern(newPattern);

    if (p.width !== pNew.width || p.height !== pNew.height) 
      console.error("Pattern dimensions must match.");

    matches.forEach(match => {
      match.forEach( (t, i) => {
        const { x, y, type } = t;
        const newType = pNew.pattern[i];
        if (type !== ".") t.remove(); 
        if (newType !== ".") addTile(x, y, newType); 
      })
    })

    return matches.length > 0
  }

  function clear() { currentLevel = []; } // ***


  function swap(arr, newTypes) { // swap could do multiple
    if (typeof arr === "string") arr = [ arr ];
    if (typeof newTypes === "string") newTypes = [ newTypes ];

    const grid = getGrid();

    let matched = false;
    let length = 0;

    Object.keys(grid).forEach(k => {
      const cell = grid[k];
      const typesInCell = cell.map(tile => tile.type);

      const matches = [];

      arr.forEach(t => {
        const index = typesInCell.indexOf(t);
        if (index !== -1 && !matches.includes(index)) {
          matches.push(index);
        } 
      })

      if (matches.length === arr.length) {
        matches.forEach(i => cell[i].remove());
        const [ x, y ] = k.split(",").map(Number);

        newTypes.forEach(t => addTile(x, y, t));

        matched = true;
        length++;
      }
    })

    return length;
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
    setScreenSize,
    // tile functions
    setLegend, // ***
    setMap, // ***
    getCell, // *
    addTile, // **
    clearTile, // *
    onInput, // ***
    setSolids, // ***, could use collision layers
    setPushables, // ***
    replace, // **
    afterInput, // ***
    getGrid, // **
    sprite,
    swap,
    match,
    getAll: (type) => currentLevel.filter(t => t.type === type), // **
    clear,
    setZOrder: (order) => { zOrder = order; }, // **, could use order of collision layers
    setBackground: (type) => { 
      background = type in legend ? legend[type] : background; // else should be default
      bgCanvas.width = background.width;
      bgCanvas.height = background.height;

      bgCanvas.getContext("2d").putImageData(
        background, 
        0,
        0,
      );
    }
  }
}
