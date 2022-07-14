import { bitmapTextToImageData } from "./bitmap.js";

// Tagged tempalate literal factory go brrr
export function _makeTag(cb) {
  return (strings, ...interps) => {
    if (typeof strings === "string") {
      throw new Error("Tagged template literal must be used like name`text`, instead of name(`text`)");
    }
    const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '');
    return cb(string);
  }
}

export function init({ palette, setBitmaps, setScreenSize }) {
  // tile gamelab

  const state = {
    legend: [],
    dimensions: {
      width: 0,
      height: 0,
    },
    sprites: [],
    solids: [],
    pushable: {},
  };

  class Sprite {
    constructor(type, x, y) {
      this._type = type;
      this._x = x;
      this._y = y;
      this.dx = 0;
      this.dy = 0;
    }

    set type(k) {
      const legendDict = Object.fromEntries(state.legend);
      if (!(k in legendDict)) throw new Error(`"${k}" not in legend.`);

      this.remove();
      addSprite(this._x, this._y, k);
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
      state.sprites = state.sprites.filter(s => s !== this);
      return this;
    }
  }

  const _canMoveToPush = (sprite, dx, dy) => {
    const { x, y, type } = sprite;
    const { width, height } = state.dimensions;
    const i = (x+dx)+(y+dy)*width;

    const inBounds = (x+dx < width && x+dx >= 0 && y+dy < height && y+dy >= 0);
    if (!inBounds) return false;

    const grid = getGrid();

    const notSolid = !state.solids.includes(type);
    const noMovement = dx === 0 && dy === 0;
    const movingToEmpty = i < grid.length && grid[i].length === 0;

    if (notSolid || noMovement || movingToEmpty) {
      sprite._x += dx;
      sprite._y += dy;
      return true;
    }

    let canMove = true;

    const { pushable }  = state;

    grid[i].forEach(sprite => {
      const isSolid = state.solids.includes(sprite.type);
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

  const getGrid = () => {
    const { width, height } = state.dimensions;

    const grid = new Array(width*height).fill(0).map(x => []);
    state.sprites.forEach(s => {
      const i = s.x+s.y*width;
      grid[i].push(s);
    })

    return grid;
  }

  const _checkBounds = (x, y) => {
    const { width, height } = state.dimensions;

    if (x > width || x < 0 || y < 0 || y > height) throw new Error(`Sprite out of bounds.`);
  }

  const _checkLegend = type => {
    if (!(type in Object.fromEntries(state.legend)))
      throw new Error(`Unknown sprite type: ${type}`);
  }

  const addSprite = (x, y, type) => {
    if (type === ".") return;

    _checkBounds(x, y);
    _checkLegend(type);

    const s = new Sprite(type, x, y);
    state.sprites.push(s);
  }

  function setLegend(...bitmaps) {
    state.legend = bitmaps;
    setBitmaps(bitmaps);
  }
  
  const _allEqual = arr => arr.every(val => val === arr[0]);

  function setMap(string) { 
    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = _allEqual(rowLengths)
    if (!isRect) throw new Error("Level must be rect.");
    const w = rows[0].length;
    const h = rows.length;
    state.dimensions.width = w;
    state.dimensions.height = h;

    state.sprites = [];

    setScreenSize(w*16, h*16);

    for (let i = 0; i < w*h; i++) {
      const char = string.split("").filter(x => x.match(/\S/))[i];
      if (char === ".") continue;
      // the index will be the ascii char for the number of the index
      const type = char;

      const x = i%w; 
      const y = Math.floor(i/w);


      addSprite(x, y, type);
    }
  }

  function clearTile(x, y) {
    state.sprites = state.sprites.filter(s => s.x !== x || s.y !== y);
  }

  function getTile(x, y) { 
    return getGrid()[state.dimensions.width*y+x] || [];
  }

  function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  function tilesWith(...matchingTypes) {
    const { width, height } = state.dimensions;
    const tiles = [];
    const grid = getGrid();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = grid[width*y+x] || [];
        const matchIndices = matchingTypes.map(type => {
          return tile.map(s => s.type).indexOf(type);
        })


        if (!hasDuplicates(matchIndices) && !matchIndices.includes(-1)) tiles.push(tile);
      }
    }

    return tiles;
  }

  function setSolids(arr) {
    state.solids = arr;
  }

  function setPushables(map) {
    state.pushable = map;
  }

  const api = {
    setLegend, 
    setMap, 
    addSprite,
    getGrid,
    getTile,
    tilesWith,
    clearTile, 
    setSolids, 
    setPushables, 
    map: _makeTag(text => text), // No-op for now, here for editor support
    bitmap: _makeTag(text => ({
      text,
      imageData: bitmapTextToImageData(text, palette)
    })),
    getFirst: (type) => state.sprites.find(t => t.type === type), // **
    getAll: (type) => type ? state.sprites.filter(t => t.type === type) : state.sprites, // **
    width: () => state.dimensions.width,
    height: () => state.dimensions.height,
    setBackground: (type) => { 
      _checkLegend(type);
      background = type;
    }
  };

  return { api, state };
}
