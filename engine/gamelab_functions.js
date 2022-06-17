import { bitmapTextToImageData } from "./bitmap.js";
import { dispatch } from "../dispatch.js";
import { textToTune } from './playTune.js';

export function init(canvas) {

  // Remove event listeners
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

  let legend = {};
  let width = 0;
  let height = 0;
  let currentLevel = [];
  let onInputs = {
    up: [],
    down: [],
    left: [],
    right: [],
    i: [],
    j: [],
    k: [],
    l: [],
  };
  let afterInputs = [];
  let solids = [];
  let pushable = {};
  let zOrder = [];
  let maxCellDim = 0;

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

    // Clear deltas before.
    currentLevel.forEach(sprites => {
      sprites.dx = 0;
      sprites.dy = 0;
    });

    if (key === "w" || key === "ArrowUp") onInputs["up"].forEach(fn => fn());
    if (key === "a" || key === "ArrowLeft") onInputs["left"].forEach(fn => fn());
    if (key === "s" || key === "ArrowDown") onInputs["down"].forEach(fn => fn());
    if (key === "d" || key === "ArrowRight") onInputs["right"].forEach(fn => fn());
    if (key === "i") onInputs["i"].forEach(fn => fn());
    if (key === "j") onInputs["j"].forEach(fn => fn());
    if (key === "k") onInputs["k"].forEach(fn => fn());
    if (key === "l") onInputs["l"].forEach(fn => fn());

    afterInputs.forEach(f => f());

    // Clear deltas again after.
    currentLevel.forEach(sprite => {
      sprite.dx = 0;
      sprite.dy = 0;
    });

    e.preventDefault();
  });

  const canMoveToPush = (sprite, dx, dy) => {
    const grid = _getGrid();
    const { x, y, bitmapKey } = sprite;
    const cellKey = `${x+dx},${y+dy}`;

    const notSolid = !solids.includes(bitmapKey);
    const noMovement = dx === 0 && dy === 0;
    const movingToEmpty = !grid[cellKey];

    if (notSolid || noMovement || movingToEmpty) {
      sprite._x += dx;
      sprite._y += dy;
      return true;
    }

    let canMove = true;

    grid[cellKey].forEach(sprite => {
      const isSolid = solids.includes(sprite.bitmapKey);
      const isPushable = (bitmapKey in pushable) && pushable[bitmapKey].includes(sprite.bitmapKey);

      if (isSolid && !isPushable)
        canMove = false;

      if (isSolid && isPushable) {
        canMove = canMove && canMoveToPush(sprite, dx, dy);
      }
    })

    if (canMove) {
      sprite._x += dx;
      sprite._y += dy;
    }

    return canMove;

  }

  class Sprite {
    constructor(x, y, bitmapKey) {
      this._bitmapKey = null;
      this.bitmapKey = bitmapKey;
      this._x = x;
      this._y = y;
      this.dx = 0;
      this.dy = 0;
    }

    set bitmapKey(k) {
      if (k === ".") this.remove(); // hmm

      if (k !== "." && !(k in legend)) throw `"${k}" not in legend.`

      this._bitmapKey = k;
      const defaultSprite = new ImageData(new Uint8ClampedArray(16*16*4).fill(0), 16)
      const sprite = (k in legend) ? legend[k].imageData : defaultSprite;
      this.canvas = document.createElement("canvas");
      this.canvas.width = sprite.width;
      this.canvas.height = sprite.height;

      this.canvas.getContext("2d").putImageData(
        sprite, 
        0,
        0,
      );
    }

    get bitmapKey() {
      return this._bitmapKey;
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
      currentLevel = currentLevel.filter(s => s !== this);
      return this;
    }
  }

  const anyOf = (...args) => ({ type: "or", list: args });
  const allOf = (...args) => ({ type: "and", list: args });

  function _checkBitmapKey(bitmapKey) {
    if (typeof bitmapKey !== "string")
      throw new Error(`Bitmap key isn't a string! Remember, you can't pass a bitmap directly, you must use setLegend`)
    if (!(bitmapKey in legend))
      throw new Error(`Bitmap key "${bitmapKey}" isn't in the legend so I don't know what it is!`)
  }

  function setLegend(bitmaps) {
    for (const key of Object.keys(bitmaps)) {
      if ([".", "*"].includes(key)) {
        console.warn(`Legend key "${key}" has a special meaning in some case, you should avoid it`);
        delete bitmaps[key];
      } else if (key.length > 1) {
        console.warn(`Legend key "${key}" is too long, you should only use single-character keys`);
        delete bitmaps[key];
      }
    }
    legend = bitmaps;
    dispatch("SET_BITMAPS", { bitmaps });
  }

  const allEqual = arr => arr.every(val => val === arr[0]);

  function setMap(level) {
    const spriteComboMap = {}; // TODO: Consider this and maybe add it back?
    
    // Check that the level is an even rectangle.
    const rows = level.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) throw new Error("Invalid map! Some of the rows have uneven lengths");
    width = rows[0].length;
    height = rows.length;
    clear();
    
    // scale the ctx based on aspect ratio of level
    // cells should always be square
    // find max cell width to fit

    maxCellDim = Math.min(canvas.width/width, canvas.height/height);
    
    // should this adjust screen size?
    setScreenSize(width*maxCellDim, height*maxCellDim);

    for (let i = 0; i < width*height; i++) {
      const bitmapKey = level.split("").filter(x => x.match(/\S/))[i];

      if (bitmapKey === ".") continue;

      const bitmapKeys = bitmapKey in spriteComboMap
        ? Array.isArray(spriteComboMap[bitmapKey])
          ? spriteComboMap[bitmapKey]
          : [ spriteComboMap[bitmapKey] ]
        : [ bitmapKey ];

      const x = i%width;
      const y = Math.floor(i/width);
      bitmapKeys.forEach(() => {
        const newCell = new Sprite(x, y, bitmapKey);
        currentLevel.push(newCell);
      }) 
    }

    return currentLevel;
  }

  function addSprite(x, y, bitmapKey) {
    _checkBitmapKey(bitmapKey);
    const cell = new Sprite(x, y, bitmapKey);
    currentLevel.push(cell);
    return cell;
  }

  function clearCell(x, y) {
    currentLevel = currentLevel.filter(cell => cell.x !== x || cell.y !== y);
  }

  function getCell(x, y) {
    return currentLevel.filter(cell => cell.x === x && cell.y === y);
  }

  function setSolids(bitmapKeys) {
    solids = bitmapKeys;
  }

  function setPushables(pushMap) {
    pushable = pushMap;
  }

  function onInput(type, callback) {
    if (!(type in onInputs)) return console.warn("Unknown input type:", type);
    onInputs[type].push(callback);
  }

  function _getGrid() {
    const overlaps = {};
    const sprites = currentLevel.map(sprite => [ `${sprite.x},${sprite.y}`, sprite ]);
    sprites.forEach(sprite => {
      const [ key, data ] = sprite;
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
          x*maxCellDim, 
          y*maxCellDim,
          maxCellDim,
          maxCellDim
        );
      }
    }

    currentLevel
      .sort((a, b) => zOrder.indexOf(b.bitmapKey) - zOrder.indexOf(a.bitmapKey))
      .forEach(sprite => {
        ctx.drawImage(
          sprite.canvas, 
          sprite.x*maxCellDim, 
          sprite.y*maxCellDim,
          maxCellDim,
          maxCellDim
        );
      });
   
  }

  function _parsePattern(string) {
    const parsedPattern = [];
    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) throw new Error("Pattern must be a rectangle");
    const w = rows[0].length;
    const h = rows.length;

    for (let i = 0; i < w*h; i++) {
      const bitmapKey = string.split("").filter(x => x.match(/\S/))[i];
      parsedPattern.push(bitmapKey)
    }

    const result = { width: w, height: h, pattern: parsedPattern };

    return result;
  }

  function _matchPattern(patternData, patternMap = {}) {
    const { width: w, height: h, pattern } = patternData;

    const grid = _getGrid();

    // if no cell with key then cell empty
    for (let i = 0; i < width*height; i++) {
      const x = i%width; 
      const y = Math.floor(i/width); 
      const key = `${x},${y}`;

      if (!grid[key]) grid[key] = [{ x, y, bitmapKey: "." }];
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
        const bitmapKey = pattern[j];
        const key = `${x+dx},${y+dy}`;
        
        let testFn;
        if (bitmapKey in patternMap) {
          const val = patternMap[bitmapKey];
          if (Array.isArray(val)) testFn = t => val.includes(t.bitmapKey);
          if (typeof val === "function") testFn = val
        }

        let matchValue = (testFn)
          ? grid[key]?.find(testFn) // could take whole sprite or sprite type
          : grid[key]?.find(t => t.bitmapKey === bitmapKey)


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

  function matchPattern(pattern, patternMap = {}) {
    const patternData = _parsePattern(pattern);
    const matches = _matchPattern(patternData, patternMap);
    return matches;
  }

  // Should this return [], number, or boolean?
  function replacePattern(lookFor, replaceWith, patternMap = {}) { 
    // ? should be able to pass result of matches


    const patternData = _parsePattern(lookFor);
    const matches = _matchPattern(patternData, patternMap);
    const pNew = _parsePattern(replaceWith);

    if (patternData.width !== pNew.width || patternData.height !== pNew.height) 
      throw new Error("Patterns passed to replacePattern must be the same size");

    matches.forEach((match) => {
      match.forEach((sprite, i) => {
        const { x, y, bitmapKey } = sprite;
        const newBitmapKey = pNew.pattern[i];
        if (bitmapKey !== ".") sprite.remove(); 
        if (newBitmapKey !== ".") addSprite(x, y, newBitmapKey); 
      })
    })

    return matches.length > 0
  }

  function clear() { currentLevel = []; } // ***

  // should this return [], number, or boolean
  function swap(lookFor, replaceWith) { // swap could do multiple
    if (typeof lookFor === "string") lookFor = [ lookFor ];
    if (typeof replaceWith === "string") replaceWith = [ replaceWith ];

    const grid = _getGrid();

    let matched = false;
    let length = 0;

    Object.keys(grid).forEach(k => {
      const cell = grid[k];
      const keysInCell = cell.map(sprite => sprite.bitmapKey);

      const matches = [];

      lookFor.forEach(k => {
        const index = keysInCell.indexOf(k);
        if (index !== -1 && !matches.includes(index)) {
          matches.push(index);
        } 
      })

      if (matches.length === lookFor.length) {
        matches.forEach(i => cell[i].remove());
        const [ x, y ] = k.split(",").map(Number);

        replaceWith.forEach(k => addSprite(x, y, k));

        matched = true;
        length++;
      }
    })

    return length;
  }

  function afterInput(callback) {
    afterInputs.push(callback);
  }

  // how to add timed things, like bird flying and ball kicks
  
  // Tagged tempalate literal factory go brrr
  function makeTag(cb) {
    return (strings, ...interps) => {
      if (typeof strings === "string") {
        throw new Error("Tagged template literal must be used like name`text`, instead of name(`text`)");
      }
      const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '');
      return cb(string);
    }
  }

  return {
    // TODO: Remove
    setScreenSize,

    // Level Design
    setLegend, // ***
    setBackground: (bitmapKey) => { 
      if (!legend[bitmapKey]) {
        throw new Error(`Can't set background to bitmap key "${bitmapKey}", it's not in the legend`)
      }
      background = legend[bitmapKey].imageData;

      bgCanvas.width = background.width;
      bgCanvas.height = background.height;
      bgCanvas.getContext("2d").putImageData(
        background, 
        0,
        0,
      );
    },
    setMap, // ***
    setSolids, // ***, could use collision layers
    setPushables, // ***
    setZOrder: (bitmapKeys) => { zOrder = bitmapKeys; }, // **, could use order of collision layers

    // User Input
    onInput, // ***
    afterInput, // ***

    // Sprites and Cells
    getCell, // *
    addSprite, // **
    clearCell, // *
    clear,
    
    // Pattern Matching
    getAll: (bitmapKey) => bitmapKey
      ? currentLevel.filter(s => s.bitmapKey === bitmapKey)
      : currentLevel, // **
    getFirst: (bitmapKey) => getAll(bitmapKey)[0], // **
    swap,
    matchPattern,
    replacePattern, // **

    // Music and Sound Effects
    // TODO: playTune

    // Tags
    map: makeTag(text => text), // No-op for editor support
    tune: makeTag(text => textToTune(text)),
    bitmap: makeTag(text => ({
      text,
      imageData: bitmapTextToImageData(text)
    })),
  }
}
