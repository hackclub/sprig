import { init } from "./engine/gamelab_functions.js";

const canvas = document.querySelector("canvas");

const gf = init(canvas);

window.setScreenSize = setScreenSize;
window.setLegend = setLegend; 
window.addLayer = addLayer; 
window.setTile = setTile; 
window.getTile = getTile; 
window.addTile = addTile; 
window.clearTile = clearTile; 
window.everyTile = everyTile; 
window.tileContains = tileContains; 
window.addRule = addRule; 
window.onTileCollision = onTileCollision; 
window.onTileInput = onTileInput; 
window.makeSolid = makeSolid; 
window.makePushable = makePushable; 
window.replace = replace; 
window.afterInput = afterInput; 
window.getTileGrid = getTileGrid; 
window.getTileAll = getTileAll; 
window.clear = clear; 
window.setZOrder = setZOrder;