import { spriteTextToImageData } from "./sprite.js";
import { dispatch } from "../dispatch.js";
import { textToTune } from './playTune.js';

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
  let grid = [];
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
    if (key === "i") tileInputs["i"].forEach(fn => fn());
    if (key === "j") tileInputs["j"].forEach(fn => fn());
    if (key === "k") tileInputs["k"].forEach(fn => fn());
    if (key === "l") tileInputs["l"].forEach(fn => fn());

    afterInputs.forEach(f => f());

    e.preventDefault();
  });

  const checkBounds = (x, y) => {
    if (x > width || x < 0 || y < 0 || y > height) throw `Sprite out of bounds.`;
  }

  const checkLegend = type => {
    if (!(type in legend)) throw `Unknown sprite type: ${type}`;
  }

  const addSprite = (x, y, type) => {
    checkBounds(x, y);
    checkLegend(type);

    const i = x+(y*w);

    const isCombo = legend[type].type !== undefined;

    if (isCombo) {
      const comboType = legend[type].type;
      if (comboType === "and") {
        grid[i].push(...legend[type].list);
      }

      if (comboType === "or") throw `"anyOf" combinations are read only.`
    }

    if (type === "*") throw `"*" combinations are read only.`
    else if (type === ".") clearTile(x, y);
    else grid[i].push(type);
  }



  const anyOf = (...args) => ({ type: "or", list: args });
  const allOf = (...args) => ({ type: "and", list: args });

  function setLegend(objectMap) {
    legend = objectMap;
    dispatch("SET_SPRITES", { sprites: objectMap });
  }


  function setMap(string, spriteComboMap = {}) { // could have background and sprites
    // check that level is rectangle



    const rows = string.trim().split("\n").map(x => x.trim());
    const rowLengths = rows.map(x => x.length);
    const isRect = allEqual(rowLengths)
    if (!isRect) console.error("Level must be rect.");
    const w = rows[0].length;
    const h = rows.length;
    width = w;
    height = h;

    grid = new Array(w*h).fill([]);

    // scale the ctx based on aspect ratio of level
    // tiles should always be square
    // find max tile width to fit

    maxTileDim = Math.min(canvas.width/w, canvas.height/h);
    
    // should this adjust screen size?
    setScreenSize(w*maxTileDim, h*maxTileDim);

    for (let i = 0; i < w*h; i++) {
      const type = string.split("").filter(x => x.match(/\S/))[i];

      if (type === ".") continue;

      const types = type in spriteComboMap
        ? spriteComboMap[type]
        : [ type ];

      const x = i%w; 
      const y = Math.floor(i/w);

      types.forEach(t => addSprite(x, y, t)); 
    }

    return grid;
  }

  function clearTile(x, y) {
    checkBounds(x, y);
    const i = w*y+x;
    grid[i] = [];
  }

  function getTile(x, y) { 
    checkBounds(x, y);
    return grid[w*y+x];
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
            : grid[key]?.find(t => t.type === type || type === "*")

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

  // should this return [], number, or boolean
  function replace(pattern, newPattern, testMap = {}) { 
    // ? should be able to pass result of matches
    // maybe passing testMap is okay

    if (newPattern.includes("*")) throw "Replacement can't contain '*'.";

    const p = parsePattern(pattern);
    const matches = matchPattern(p, testMap);

    const pNew = parsePattern(newPattern);

    if (p.width !== pNew.width || p.height !== pNew.height) 
      console.error("Pattern dimensions must match.");

    matches.forEach(match => {
      match.forEach( (t, i) => {
        const { x, y, type } = t;
        const newType = pNew.pattern[i];
        if (type !== "." && newType !== "*") t.remove(); 
        else if (newType === "*") { /* do nothing */ } 
        else addTile(x, y, newType);
      })
    })

    return matches.length > 0
  }

  function clear() { currentLevel = []; } // ***


  // should this return [], number, or boolean
  function swap(arr, newTypes) { // swap could do multiple
    if (typeof arr === "string") arr = [ arr ];
    if (typeof newTypes === "string") newTypes = [ newTypes ];

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
    afterInput, // ***
    map: makeTag(text => text), // No-op for now, here for editor support
    tune: makeTag(text => textToTune(text)),
    sprite: makeTag(text => ({text, imageData: spriteTextToImageData(text)})),
    match: match,
    replace: replace, // **
    getFirst: (type) => currentLevel.find(t => t.type === type), // **
    getAll: (type) => type ? currentLevel.filter(t => t.type === type) : currentLevel, // **
    clear,
    anyOf,
    allOf,
    setZOrder: (order) => { zOrder = order; }, // **, could use order of collision layers
    setBackground: (type) => { 
      background = type in legend ? legend[type].imageData : background; // else should be default
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
