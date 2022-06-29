import { bitmapTextToImageData } from "./bitmap.js";
import { dispatch } from "../dispatch.js";
import { textToTune } from '../textTuneConverters.js';
import { global_state } from "../global_state.js";


let cur = null;

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


  function gameloop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTiles();

    animationId = window.requestAnimationFrame(gameloop);
  }

  function end() {
    window.cancelAnimationFrame(animationId);
  }

  if (cur) cur();
  cur = end;


   let animationId = window.requestAnimationFrame(gameloop);

  function setScreenSize(w, h) {
    canvas.width = w;
    canvas.height = h;

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }

  // tile gamelab
  let legend = {};
  let dimensions = {
    width: 0,
    height: 0,
    maxTileDim: 0,
  }
  let sprites = [];
  let tileInputs = {
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
  let maxTileDim = 0;

  let background = "";
  const tempCanvas = document.createElement("canvas");
  // tempCanvas.width = 16;
  // tempCanvas.height = 16;

  class Sprite {
    constructor(type, x, y) {
      this._type = type;
      this._x = x;
      this._y = y;
      this.dx = 0;
      this.dy = 0;
    }

    set type(k) {

      if (!(k in legend)) throw new Error(`"${k}" not in legend.`);

      this.remove();
      addSprite(k, this._x, this._y);
    }

    get type() {
      return this._type;
    }

    set x(newX) {
      const dx = newX - this.x;
      if (_canMoveToPush(this, dx, 0)) this.dx = dx;
      return this;
    }

    get x() {
      return this._x;
    }

    set y(newY) {
      const dy = newY - this.y;
      if (_canMoveToPush(this, 0, dy)) this.dy = dy;
      return this;
    }

    get y() {
      return this._y;
    }

    remove() {
      sprites = sprites.filter(s => s !== this);
      return this;
    }
  }


  const _canMoveToPush = (sprite, dx, dy) => {
    const { x, y, type } = sprite;
    const { width, height } = dimensions;
    const i = (x+dx)+(y+dy)*width;

    const inBounds = (x+dx < width && x+dx >= 0 && y+dy < height && y+dy >= 0);
    if (!inBounds) return false;

    const grid = getGrid();

    const notSolid = !solids.includes(type);
    const noMovement = dx === 0 && dy === 0;
    const movingToEmpty = i < grid.length && grid[i].length === 0;

    if (notSolid || noMovement || movingToEmpty) {
      sprite._x += dx;
      sprite._y += dy;
      return true;
    }

    let canMove = true;

    grid[i].forEach(sprite => {
      const isSolid = solids.includes(sprite.type);
      const isPushable = (type in pushable) && pushable[type].includes(sprite.type);

      if (isSolid && !isPushable)
        canMove = false;

      if (isSolid && isPushable) {
        canMove = canMove && _canMoveToPush(sprite, dx, dy);
      }
    })

    if (canMove) {
      sprite._x += dx;
      sprite._y += dy;
    }

    return canMove;
  }

  canvas.addEventListener("keydown", (e) => {
    const key = e.key;

    const VALID_INPUTS = ["w", "a", "s", "d", "i", "j", "k", "l"];

    if (!VALID_INPUTS.includes(key)) return;

    if (key === "w") tileInputs["up"].forEach(fn => fn());
    if (key === "a") tileInputs["left"].forEach(fn => fn());
    if (key === "s") tileInputs["down"].forEach(fn => fn());
    if (key === "d") tileInputs["right"].forEach(fn => fn());
    if (key === "i") tileInputs["i"].forEach(fn => fn());
    if (key === "j") tileInputs["j"].forEach(fn => fn());
    if (key === "k") tileInputs["k"].forEach(fn => fn());
    if (key === "l") tileInputs["l"].forEach(fn => fn());

    afterInputs.forEach(f => f());

    sprites.forEach(s => {
      s.dx = 0;
      s.dy = 0;
    })

    e.preventDefault();
  });

  const getGrid = () => {
    const { width, height } = dimensions;

    const grid = new Array(width*height).fill(0).map(x => []);
    sprites.forEach(s => {
      const i = s.x+s.y*width;
      grid[i].push(s);
    })

    return grid;
  }

  const _checkBounds = (x, y) => {
    const { width, height } = dimensions;

    if (x > width || x < 0 || y < 0 || y > height) throw new Error(`Sprite out of bounds.`);
  }

  const _checkLegend = type => {
    if (!(type in legend)) throw new Error(`Unknown sprite type: ${type}`);
  }

  const addSprite = (type, x, y) => {
    if (type === ".") return;
    if (type === "*") throw new Error(`* wildcards are read-only.`);

    _checkBounds(x, y);
    _checkLegend(type);

    const { width, height } = dimensions;

    const i = x+(y*width);

    const isCombo = legend[type].type !== undefined;

    if (isCombo) {
      const comboType = legend[type].type;
      if (comboType === "and") {

        legend[type].list.forEach(t => {
          // this sprite can't be a combo
          const s = new Sprite(t, x, y);
          sprites.push(s);
        });
      }

      if (comboType === "or") throw new Error(`"anyOf" combinations are read only.`);
    } else {
      // create sprite
      const s = new Sprite(type, x, y);
      sprites.push(s);
    };
  }

  const anyOf = (...args) => ({ type: "or", list: args });
  const allOf = (...args) => ({ type: "and", list: args });

  let cachedTileImages = {};

  function setLegend(bitmaps) {
    for (const key of Object.keys(bitmaps)) {
      if ([".", "*"].includes(key)) {
        console.warn(`Legend key "${key}" has a special meaning in some case, you should avoid it`);
        delete bitmaps[key];
      } else if (key.length > 1) {
        console.warn(`Legend key "${key}" is too long, you should only use single-character keys`);
        delete bitmaps[key];
      }
      const val = bitmaps[key];
      if (Array.isArray(val)) bitmaps[key] = allOf(...val);
    }
    legend = bitmaps;
    cachedTileImages = {};
    dispatch("SET_BITMAPS", { bitmaps });
  }

  
  function _getTileImage(type) {
    if (!(type in legend)) throw new Error(`Type not in legend: ${type}`);

    const val = legend[type];
    const isCombo = val.type !== undefined;

    if (isCombo) throw new Error(`Can not draw combination sprites.`);

    if (!(type in cachedTileImages)) {
      const c = document.createElement("canvas");
      c.width = val.imageData.width;
      c.height = val.imageData.height;

      const ctx = c.getContext("2d");

      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      ctx.putImageData(
        val.imageData, 
        0,
        0,
      );

      cachedTileImages[type] = c;
    }

    
    return cachedTileImages[type];
  }

  const _allEqual = arr => arr.every(val => val === arr[0]);

  function setMap(string) { // could have background and sprites
    // check that level is rectangle

    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = _allEqual(rowLengths)
    if (!isRect) console.error("Level must be rect.");
    const w = rows[0].length;
    const h = rows.length;
    dimensions.width = w;
    dimensions.height = h;

    // const grid = new Array(w*h).fill(0).map(x => []);

    sprites = [];

    // scale the ctx based on aspect ratio of level
    // tiles should always be square
    // find max tile width to fit

    const maxTileDim = Math.min(canvas.width/w, canvas.height/h);
    dimensions.maxTileDim = maxTileDim;
    // should this adjust screen size?
    setScreenSize(w*maxTileDim, h*maxTileDim);

    for (let i = 0; i < w*h; i++) {
      const type = string.split("").filter(x => x.match(/\S/))[i];

      const x = i%w; 
      const y = Math.floor(i/w);

      addSprite(type, x, y);

      // grid[i].push(addSprite(type, x, y)); 
    }

    // return grid;
  }

  function clearTile(x, y) {
    sprites = sprites.filter(s => s.x !== x || s.y !== y);
  }

  function getTile(x, y) { 
    return getGrid()[dimensions.width*y+x] || [];
  }

  function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  function tilesWith(matchingTypes) {
    const tiles = [];
    const grid = getGrid();
    for (let x = 0; x < dimensions.width; x++) {
      for (let y = 0; y < dimensions.height; y++) {
        const tile = grid[dimensions.width*y+x] || [];
        const matchIndices = matchingTypes.map(type => {
          return tile.map(s => s.type).indexOf(type);
        })


        if (!hasDuplicates(matchIndices) && !matchIndices.includes(-1)) tiles.push(tile);
      }
    }

    return tiles;
  }

  function setSolids(arr) {
    solids = arr;
  }

  function setPushables(map) {
    pushable = map;
  }

  function onInput(type, fn) {
    if (!(type in tileInputs)) console.error("Unknown input type:", type)
    tileInputs[type].push(fn);
  }

  function drawTiles() {
    const grid = getGrid();
    const { width, maxTileDim } = dimensions;
    for (let i = 0; i < grid.length; i++) {
      const x = i%width; 
      const y = Math.floor(i/width); 
      const sprites = grid[i];

      if (background !== "") {
        const c = _getTileImage(background);
        ctx.drawImage(
          c, 
          x*maxTileDim, 
          y*maxTileDim,
          maxTileDim,
          maxTileDim
        );
      }

      sprites
        .sort((a, b) => zOrder.indexOf(b.type) - zOrder.indexOf(a.type))
        .forEach( ({ type }) => {
          const c = _getTileImage(type);
          ctx.drawImage(
            c, 
            x*maxTileDim, 
            y*maxTileDim,
            maxTileDim,
            maxTileDim
          );
        })
    }
   
  }

  function _parsePattern(string) {
    const parsedPattern = [];
    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = _allEqual(rowLengths)
    if (!isRect) throw new Error("Pattern must be rectangle.");
    const w = rows[0].length;
    const h = rows.length;

    for (let i = 0; i < w*h; i++) {
      const type = string.split("").filter(x => x.match(/\S/))[i];
      parsedPattern.push(type)
    }

    const result = { width: w, height: h, pattern: parsedPattern };

    return result;
  }

  function _matchPattern(patternData) {
    const { width, height } = dimensions;
    const { width: w, height: h, pattern } = patternData;

    let allMatches = [];
    const grid = getGrid();
    for (let i = 0; i < grid.length; i++) {
      const x = i%width; 
      const y = Math.floor(i/width); 

      if (x + w > width || y + h > height) continue;
      
      let match = true;
      let matches = [];
      for (let j = 0; j < w*h; j++) {
        const dx = j%w; 
        const dy = Math.floor(j/w);
        const type = pattern[j];

        const offsetIndex = (dx+x)+(dy+y)*width; 
        let cur = grid[offsetIndex];
        
        let matchValue = undefined;

        if (legend[type]?.type === "and") {
          const targets = legend[type].list;
          const localMatches = [];
          cur.forEach(s => {
            if (targets.includes(s.type) && !localMatches.includes(s))
              localMatches.push(s);
          })
          if (localMatches.length === targets.length) matchValue = localMatches;
        } else if (legend[type]?.type === "or") {
          matchValue = cur.find(x => legend[type].list.includes(x.type));
          if (matchValue !== undefined) matchValue = [ matchValue ];
          else match = false;
        } else if (type === "*") {
          matchValue = cur.find(x => x.type);
          if (matchValue === undefined) matchValue = [];
          else matchValue = [matchValue];
        } else if (type === "." && cur.length === 0) {
          matchValue = [];
        } else if (type in legend && legend[type]?.type === undefined) {
          matchValue = cur.find(x => x.type === type);
          if (matchValue !== undefined) matchValue = [matchValue];
          else match = false;
        }

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

  function match(pattern) {
    const p = _parsePattern(pattern);
    const matches = _matchPattern(p);
    return matches;
  }

  // should this return [], number, or boolean
  function replace(pattern, newPattern) { 
    const p = _parsePattern(pattern);
    const matches = _matchPattern(p);

    const pNew = _parsePattern(newPattern);

    if (p.width !== pNew.width || p.height !== pNew.height) 
      throw new Error("Patterns passed to replacePattern must be the same size");


    matches.forEach(match => {
      match.forEach( (t, i) => {
        const newType = pNew.pattern[i];

        // remove old
        // add new
        if (Array.isArray(t)) {
          t.forEach((x, i) => {
            x.remove()
            if (i === 0) addSprite(newType, x.x, x.y);
          }); 
        } else {
          t.remove();
          addSprite(newType, t.x, t.y);
        }
      })
    })

    return matches.length > 0
  }

  function afterInput(fn) {
    afterInputs.push(fn);
  }

  // how to add timed things, like bird flying and ball kicks
  
  // Tagged tempalate literal factory go brrr
  function _makeTag(cb) {
    return (strings, ...interps) => {
      if (typeof strings === "string") {
        throw new Error("Tagged template literal must be used like name`text`, instead of name(`text`)");
      }
      const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '');
      return cb(string);
    }
  }

  return {
    setScreenSize,
    setLegend, 
    setMap, 
    addSprite,
    getGrid,
    getTile,
    tilesWith,
    clearTile, 
    onInput, 
    setSolids, 
    setPushables, 
    afterInput, 
    map: _makeTag(text => text), // No-op for now, here for editor support
    tune: _makeTag(text => textToTune(text)),
    bitmap: _makeTag(text => ({text, imageData: bitmapTextToImageData(text, global_state.palette)})),
    match,
    replace,
    getFirst: (type) => sprites.find(t => t.type === type), // **
    getAll: (type) => type ? sprites.filter(t => t.type === type) : sprites, // **
    anyOf,
    allOf,
    setZOrder: (order) => { zOrder = order; }, // **, could use order of collision layers
    setBackground: (type) => { 
      _checkLegend(type);
      background = type;
    }
  }
}
